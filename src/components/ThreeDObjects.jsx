import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { InstancedNeuralGrid } from './RisingBlocks';
import { ImageMatchedRobot } from './RobotSection';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper to build a standard group of meshes with baked animations for Neural Grid GLB export
const buildExportGroup = (gridSizeVal) => {
    const group = new THREE.Group();
    group.name = "neural_grid_root";

    const SPACING = 1.6;
    const gX = Math.min(gridSizeVal, 30);
    const gZ = Math.floor(gX * 0.6);
    const offsetX = (gX * SPACING) / 2;
    const offsetZ = (gZ * SPACING) / 2;

    const meshes = [];
    const geom = new THREE.BoxGeometry(0.7, 10, 0.7);
    const mat = new THREE.MeshStandardMaterial({ 
        color: '#7000ff', 
        roughness: 0.2, 
        metalness: 0.8 
    });

    let i = 0;
    for (let x = 0; x < gX; x++) {
        const posX = x * SPACING - offsetX;
        for (let z = 0; z < gZ; z++) {
            const posZ = z * SPACING - offsetZ;
            const mesh = new THREE.Mesh(geom, mat);
            mesh.name = `block_${i}`;
            mesh.position.set(posX, -5, posZ);
            group.add(mesh);
            meshes.push({ mesh, posX, posZ });
            i++;
        }
    }

    // Generate animation tracks (4s loop, 5 frames/sec)
    const duration = 4;
    const fps = 5;
    const numFrames = duration * fps + 1;
    const times = [];
    for (let f = 0; f < numFrames; f++) {
        times.push(f * (duration / (numFrames - 1)));
    }

    const tracks = [];

    meshes.forEach((item) => {
        const { posX, posZ } = item;
        const name = item.mesh.name;

        const positionValues = [];
        const scaleValues = [];

        for (let f = 0; f < numFrames; f++) {
            const t = times[f];
            const waveHeight = Math.sin(t * 3.5 + posX * 0.5) * 0.3 + Math.cos(t * 2.5 + posZ * 0.5) * 0.2;
            const targetY = -5 + waveHeight;
            const s = 1.0 + (waveHeight * 0.15);

            positionValues.push(posX, targetY, posZ);
            scaleValues.push(1.0, Math.max(0.1, s), 1.0);
        }

        tracks.push(new THREE.VectorKeyframeTrack(`${name}.position`, times, positionValues));
        tracks.push(new THREE.VectorKeyframeTrack(`${name}.scale`, times, scaleValues));
    });

    const clip = new THREE.AnimationClip('NeuralGridWaveAnim', duration, tracks);
    group.animations = [clip];

    return group;
};

// Mock analytics hook
const trackInteraction = (action, cardId, duration = 0) => {
    console.log(`[Analytics] Action: ${action} | Card ID: ${cardId} | Duration: ${duration}s | Timestamp: ${new Date().toISOString()}`);
};

const OBJECTS_METADATA = [
    {
        id: "neural-grid",
        title: "Instanced Neural Grid",
        description: "A real-time, procedurally generated instanced mesh grid responding to mouse velocity and wave equations.",
        tags: ["Three.js", "Instanced Mesh", "Vector Physics"]
    },
    {
        id: "robot-intel",
        title: "Core Intelligence",
        description: "Interactive humanoid head demonstrating low-latency tracking, state damping, and automatic idle breathing animations.",
        tags: ["R3F", "Cursor Tracking", "Damped Rotations"]
    }
];

// Custom Hook to observe element intersection (visibility)
const useVisibility = (ref) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.05 });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isVisible;
};



const ShowcaseCard = ({ obj, onOpenFullscreen, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStartTime = useRef(null);
    const cardRef = useRef();
    const isVisible = useVisibility(cardRef);

    const handleMouseEnter = () => {
        setIsHovered(true);
        hoverStartTime.current = Date.now();
        trackInteraction("hover_start", obj.id);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (hoverStartTime.current) {
            const duration = ((Date.now() - hoverStartTime.current) / 1000).toFixed(2);
            trackInteraction("hover_end", obj.id, duration);
        }
    };

    const handleClick = () => {
        trackInteraction("click_action", obj.id);
        onOpenFullscreen(obj.id);
    };

    return (
        <div
            ref={cardRef}
            className="glass-card showcase-card"
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, box-shadow 0.4s ease',
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 20px 40px rgba(112, 0, 255, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                outline: 'none',
                cursor: 'pointer'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            tabIndex={0}
            role="article"
            aria-label={`3D Object Showcase: ${obj.title}. Click to expand fullscreen.`}
        >
            {/* 3D Canvas Viewport */}
            <div style={{ height: '320px', width: '100%', position: 'relative', background: '#030303', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', pointerEvents: 'none' }}>
                {isVisible ? children(isHovered, isVisible) : <div style={{ width: '100%', height: '100%', background: '#030303' }} />}
            </div>

            {/* Info details */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                        {obj.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    background: tag.includes('Three') || tag.includes('R3F') || tag.includes('Shader') ? 'rgba(112, 0, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                                    color: tag.includes('Three') || tag.includes('R3F') || tag.includes('Shader') ? '#a855f7' : 'rgba(255, 255, 255, 0.6)',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.04)'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{obj.title}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '24px', fontWeight: 300 }}>
                        {obj.description}
                    </p>
                </div>

                <button
                    className="btn-primary"
                    style={{
                        width: '100%',
                        padding: '10px 20px',
                        fontSize: '0.85rem',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: 'none',
                        color: '#fff',
                        transition: 'all 0.3s ease',
                        pointerEvents: 'none'
                    }}
                    aria-label={`Explore details for ${obj.title}`}
                >
                    Expand Experience
                </button>
            </div>
        </div>
    );
};

const ThreeDObjects = ({ isSiteReady }) => {
    const [activeFullScreenId, setActiveFullScreenId] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);

    // Dynamic Parameter States
    const [gridRippleStrength, setGridRippleStrength] = useState(2.0);
    const [gridSizeVal, setGridSizeVal] = useState(40);
    const [gridAutoRotate, setGridAutoRotate] = useState(true);

    const [robotTrackCursor, setRobotTrackCursor] = useState(true);
    const [robotSensitivity, setRobotSensitivity] = useState(1.5);
    const [robotIdleAnim, setRobotIdleAnim] = useState(true);

    const exportRef = useRef();

    // Check device dimensions
    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 992);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Adapt to hardware capabilities for high-performance devices
    const isHighSpec = useMemo(() => {
        if (typeof window === 'undefined') return true;
        const cores = navigator.hardwareConcurrency || 4;
        const memory = navigator.deviceMemory || 4;
        return cores >= 6 && memory >= 6;
    }, []);

    useEffect(() => {
        ScrollTrigger.refresh();
    }, []);

    // Export scene to binary GLB directly in browser
    const handleDownloadGLB = () => {
        if (!exportRef.current && activeFullScreenId !== "neural-grid") {
            alert("Renderer scene is still loading. Please wait a moment.");
            return;
        }

        const exporter = new GLTFExporter();
        const activeName = OBJECTS_METADATA.find(o => o.id === activeFullScreenId)?.title || "algoryx-3d-model";

        let objectToExport = exportRef.current;
        let animationsToExport = [];

        if (activeFullScreenId === "neural-grid") {
            objectToExport = buildExportGroup(gridSizeVal);
            animationsToExport = objectToExport.animations || [];
        } else if (activeFullScreenId === "robot-intel") {
            animationsToExport = exportRef.current.animations || [];
        }

        exporter.parse(
            objectToExport,
            (gltf) => {
                const blob = new Blob([gltf], { type: 'application/octet-stream' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${activeFullScreenId || 'model'}.glb`;
                link.click();
                trackInteraction("glb_download", activeFullScreenId);
            },
            (error) => {
                console.error("GLB Export failed:", error);
                alert("An error occurred during GLB compilation. Some shaders may not export successfully.");
            },
            { 
                binary: true, 
                animations: animationsToExport
            }
        );
    };

    const activeObj = OBJECTS_METADATA.find(o => o.id === activeFullScreenId);

    return (
        <section
            id="objects"
            className="reveal-section"
            style={{
                minHeight: '100vh',
                background: '#000000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '120px 5%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '60px', zIndex: 5 }}>
                <span
                    style={{
                        color: 'var(--accent-purple)',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        display: 'block',
                        marginBottom: '15px'
                    }}
                >
                    Visual Engineering
                </span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>
                    Interactive 3D Systems
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 300 }}>
                    Explore the real-time visual technologies powering Algoryx experiences. Click any card to expand full screen controls.
                </p>
            </div>

            {/* Grid Container */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '30px',
                    maxWidth: '1200px',
                    width: '100%',
                    margin: '0 auto',
                    zIndex: 5
                }}
            >
                {/* CARD 1: Neural Grid */}
                <ShowcaseCard obj={OBJECTS_METADATA[0]} onOpenFullscreen={setActiveFullScreenId}>
                    {(isHovered, isVisible) => (
                        <Canvas
                            camera={{ position: [0, 12, 30], fov: 45 }}
                            frameloop={isSiteReady && isVisible ? "always" : "never"}
                            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                        >
                            <ambientLight intensity={1.5} />
                            <InstancedNeuralGrid interactive={isHovered} rippleStrength={2.0} autoRotate={!isHovered} />
                        </Canvas>
                    )}
                </ShowcaseCard>

                {/* CARD 2: Core Intel Robot */}
                <ShowcaseCard obj={OBJECTS_METADATA[1]} onOpenFullscreen={setActiveFullScreenId}>
                    {(isHovered, isVisible) => (
                        <Canvas
                            camera={{ position: [0, 0, 5], fov: 35 }}
                            frameloop={isSiteReady && isVisible ? "always" : "never"}
                            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                        >
                            <ambientLight intensity={1.5} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} color="#ffffff" />
                            <pointLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
                            <pointLight position={[-5, 5, 5]} intensity={2} color="#7000ff" />
                            <pointLight position={[0, 0, 2]} intensity={2} color="#00d0ff" />
                            <ImageMatchedRobot trackCursor={isHovered} sensitivity={1.5} idleAnimation={true} />
                            <ContactShadows opacity={0.6} scale={12} blur={2.5} far={5} />
                            <Environment preset="night" />
                        </Canvas>
                    )}
                </ShowcaseCard>


            </div>

            {/* FULLSCREEN OVERLAY MODAL */}
            {activeFullScreenId && activeObj && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: '#040404',
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: isMobileView ? 'column' : 'row',
                        color: '#fff',
                        fontFamily: 'var(--font-main)'
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Expanded controls for ${activeObj.title}`}
                >
                    {/* Viewport Canvas (Left / Top) */}
                    <div style={{ flexGrow: 1, position: 'relative', background: '#020202', height: isMobileView ? '60%' : '100%' }}>
                        
                        {/* Orbit control helper prompt overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: '24px',
                            left: '24px',
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(8px)',
                            padding: '10px 18px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.06)',
                            fontSize: '0.8rem',
                            color: 'rgba(255,255,255,0.6)',
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}>
                            🖱️ Left click + Drag to rotate | 📜 Scroll to zoom
                        </div>

                        {/* Rendering selected model canvas */}
                        {activeFullScreenId === "neural-grid" && (
                            <Canvas camera={{ position: [0, 15, 35], fov: 45 }} gl={{ antialias: true }}>
                                <ambientLight intensity={1.5} />
                                <OrbitControls makeDefault />
                                <InstancedNeuralGrid
                                    interactive={true}
                                    rippleStrength={gridRippleStrength}
                                    gridSize={{ x: gridSizeVal, z: Math.floor(gridSizeVal * 0.6) }}
                                    autoRotate={gridAutoRotate}
                                    exportRef={exportRef}
                                />
                            </Canvas>
                        )}

                        {activeFullScreenId === "robot-intel" && (
                            <Canvas camera={{ position: [0, 0, 5], fov: 35 }} gl={{ antialias: true }}>
                                <ambientLight intensity={1.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} color="#ffffff" />
                                <pointLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
                                <pointLight position={[-5, 5, 5]} intensity={2} color="#7000ff" />
                                <pointLight position={[0, 0, 2]} intensity={2} color="#00d0ff" />
                                <OrbitControls makeDefault enablePan={true} enableZoom={true} />
                                <ImageMatchedRobot 
                                    trackCursor={robotTrackCursor} 
                                    sensitivity={robotSensitivity} 
                                    idleAnimation={robotIdleAnim} 
                                    exportRef={exportRef}
                                />
                                <ContactShadows opacity={0.6} scale={12} blur={2.5} far={5} />
                                <Environment preset="night" />
                            </Canvas>
                        )}


                    </div>

                    {/* Controls Sidebar (Right / Bottom) */}
                    <div style={{
                        width: isMobileView ? '100%' : '380px',
                        height: isMobileView ? '40%' : '100%',
                        borderLeft: isMobileView ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        borderTop: isMobileView ? '1px solid rgba(255,255,255,0.08)' : 'none',
                        background: '#040404',
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflowY: 'auto',
                        zIndex: 20
                    }}>
                        <div>
                            {/* Card headers */}
                            <span style={{ color: 'var(--accent-purple)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Controller Panel
                            </span>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>{activeObj.title}</h2>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '30px', fontWeight: 300 }}>
                                {activeObj.description}
                            </p>

                            {/* Parameter Modifiers */}
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    System Adjustments
                                </h4>

                                {/* Neural Grid Configs */}
                                {activeFullScreenId === "neural-grid" && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                                                <span>Ripple Intensity</span>
                                                <span style={{ color: 'var(--accent-purple)' }}>{gridRippleStrength}x</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="4.0"
                                                step="0.1"
                                                value={gridRippleStrength}
                                                onChange={(e) => setGridRippleStrength(parseFloat(e.target.value))}
                                                style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
                                            />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                                                <span>Grid Density (Width)</span>
                                                <span style={{ color: 'var(--accent-purple)' }}>{gridSizeVal} units</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="20"
                                                max="65"
                                                step="5"
                                                value={gridSizeVal}
                                                onChange={(e) => setGridSizeVal(parseInt(e.target.value))}
                                                style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
                                            />
                                        </div>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={gridAutoRotate}
                                                onChange={(e) => setGridAutoRotate(e.target.checked)}
                                                style={{ accentColor: 'var(--accent-purple)', width: '16px', height: '16px' }}
                                            />
                                            Slow Auto-Rotation (Idle)
                                        </label>
                                    </div>
                                )}

                                {/* Robot configs */}
                                {activeFullScreenId === "robot-intel" && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={robotTrackCursor}
                                                onChange={(e) => setRobotTrackCursor(e.target.checked)}
                                                style={{ accentColor: 'var(--accent-purple)', width: '16px', height: '16px' }}
                                            />
                                            Cursor Tracking Enabled
                                        </label>
                                        {robotTrackCursor && (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                                                    <span>Tracking Sensitivity</span>
                                                    <span style={{ color: 'var(--accent-purple)' }}>{robotSensitivity}x</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0.5"
                                                    max="2.5"
                                                    step="0.1"
                                                    value={robotSensitivity}
                                                    onChange={(e) => setRobotSensitivity(parseFloat(e.target.value))}
                                                    style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
                                                />
                                            </div>
                                        )}
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={robotIdleAnim}
                                                onChange={(e) => setRobotIdleAnim(e.target.checked)}
                                                style={{ accentColor: 'var(--accent-purple)', width: '16px', height: '16px' }}
                                            />
                                            Breathing Idle Sway
                                        </label>
                                    </div>
                                )}


                            </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
                            <button
                                onClick={handleDownloadGLB}
                                className="btn-primary"
                                style={{ width: '100%', padding: '12px 20px', borderRadius: '12px', fontSize: '0.9rem' }}
                            >
                                📥 Download GLB Asset
                            </button>
                            <button
                                onClick={() => {
                                    setActiveFullScreenId(null);
                                    trackInteraction("exit_fullscreen", activeFullScreenId);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px 20px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                Exit Fullscreen
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Visual glow element behind cards */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(112, 0, 255, 0.05) 0%, transparent 70%)',
                zIndex: 1,
                pointerEvents: 'none'
            }} />
        </section>
    );
};

export default ThreeDObjects;
