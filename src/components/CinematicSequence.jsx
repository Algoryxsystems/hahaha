import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import gsap from 'gsap';

const PARTICLE_COUNT = 150000;

// Utility to sample the logo image for particle targets
const sampleLogo = (img, count) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, img.width, img.height).data;
    const pixels = [];

    // Analyze Bounding Box (Phase 1)
    // We assume the symbol is in the top 80% and text at bottom
    let minX = img.width, maxX = 0, minY = img.height, maxY = 0;
    const textThreshold = img.height * 0.82;

    for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a > 30) {
            const x = (i / 4) % img.width;
            const y = Math.floor((i / 4) / img.width);
            if (y < textThreshold) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
    }

    const width = maxX - minX;
    const height = maxY - minY;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Collect valid symbol pixels (Phase 2)
    for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a > 30) {
            const x = (i / 4) % img.width;
            const y = Math.floor((i / 4) / img.width);
            if (y < textThreshold) {
                pixels.push({
                    x: ((x - centerX) / img.width) * 15,
                    y: ((centerY - y) / img.height) * 15,
                    z: (Math.random() - 0.5) * 0.1
                });
            }
        }
    }

    if (pixels.length === 0) return new Float32Array(count * 3);

    const result = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const p = pixels[Math.floor(Math.random() * pixels.length)];
        result[i * 3] = p.x;
        result[i * 3 + 1] = p.y;
        result[i * 3 + 2] = p.z;
    }
    return result;
};

const CinematicParticles = ({ targetPositions }) => {
    const pointsRef = useRef();
    const materialRef = useRef();
    const { camera, gl } = useThree();

    // Optimize renderer
    useEffect(() => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }, [gl]);

    const [chaosPositions, seeds] = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        const s = new Float32Array(PARTICLE_COUNT);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
            s[i] = Math.random();
        }
        return [pos, s];
    }, []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // progressObj is attached to scene.userData
            if (state.scene.userData.val !== undefined) {
                materialRef.current.uniforms.uProgress.value = state.scene.userData.val;
            }
            if (state.scene.userData.shift !== undefined) {
                materialRef.current.uniforms.uShift.value = state.scene.userData.shift;
            }
        }

        // Camera: Extremely slow push
        const t = state.clock.elapsedTime;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 25 - Math.min(t * 0.05, 2), 0.05);
        camera.lookAt(0, 0, 0);
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={chaosPositions} itemSize={3} />
                <bufferAttribute attach="attributes-chaosPosition" count={PARTICLE_COUNT} array={chaosPositions} itemSize={3} />
                <bufferAttribute attach="attributes-targetPosition" count={PARTICLE_COUNT} array={targetPositions} itemSize={3} />
                <bufferAttribute attach="attributes-seed" count={PARTICLE_COUNT} array={seeds} itemSize={1} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                uniforms={{
                    uTime: { value: 0 },
                    uProgress: { value: 0 },
                    uShift: { value: 0 }
                }}
                vertexShader={`
                    uniform float uTime;
                    uniform float uProgress;
                    uniform float uShift;
                    attribute vec3 chaosPosition;
                    attribute vec3 targetPosition;
                    attribute float seed;
                    varying float vOpacity;
                    varying vec3 vPos;
                    varying float vFinal;

                    void main() {
                        float p = uProgress;
                        vec3 pos;
                        
                        // RIGHT SHIFT: Pushed further right for maximum breathing room
                        vec3 shiftedTarget = targetPosition;
                        shiftedTarget.x += 7.2;

                        if (p <= 1.0) {
                            // PHASE 1: Chaos -> Logo (Assembling)
                            float t = p;
                            vec3 noise = vec3(
                                sin(uTime * 0.3 + seed * 15.0),
                                cos(uTime * 0.4 + seed * 10.0),
                                sin(uTime * 0.5 + seed * 12.0)
                            ) * (1.0 - t) * 3.0;

                            vec3 dir = shiftedTarget - chaosPosition;
                            vec3 curve = cross(normalize(dir + 0.0001), vec3(0.0, 1.0, 0.0)) * sin(t * 3.1415) * 4.0 * (1.0 - t);
                            
                            pos = mix(chaosPosition + noise, shiftedTarget, smoothstep(0.0, 1.0, t)) + curve;
                            vOpacity = mix(0.03, 0.2, t);
                            vFinal = 0.0;
                        } else if (p <= 2.0) {
                            // PHASE 2: Solid State (Emblem Locked)
                            float t = smoothstep(1.0, 2.0, p);
                            pos = shiftedTarget;
                            vOpacity = mix(0.2, 0.25, t);
                            vFinal = t;
                        } else {
                            // PHASE 3: TRUE MIRRORED REVERSE (Logo -> Chaos)
                            // Exactly mirroring Phase 1 path but backwards
                            float t = smoothstep(2.0, 3.0, p);
                            
                            vec3 noise = vec3(
                                sin(uTime * 0.3 + seed * 15.0),
                                cos(uTime * 0.4 + seed * 10.0),
                                sin(uTime * 0.5 + seed * 12.0)
                            ) * t * 3.0;

                            vec3 dir = shiftedTarget - chaosPosition;
                            // Mirror the curve for perfect bi-directional fidelity
                            vec3 curve = cross(normalize(dir + 0.0001), vec3(0.0, 1.0, 0.0)) * sin(t * 3.1415) * 4.0 * t;

                            pos = mix(shiftedTarget, chaosPosition + noise, t) + curve;
                            vOpacity = mix(0.25, 0.0, t);
                            vFinal = 1.0 - t;
                        }

                        vPos = pos;
                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        
                        // Diminutive particle size for 'fine dust' look
                        float pSizeBase;
                        if (p <= 2.0) {
                            pSizeBase = mix(0.8, 2.0, smoothstep(1.0, 2.0, p));
                        } else {
                            pSizeBase = mix(2.0, 0.6, smoothstep(2.0, 3.0, p));
                        }
                        
                        gl_PointSize = pSizeBase * (30.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `}
                fragmentShader={`
                    varying float vOpacity;
                    
                    void main() {
                        float d = distance(gl_PointCoord, vec2(0.5));
                        if (d > 0.5) discard;
                        
                        // Simple and Clean: Diminished Opacity
                        float alpha = smoothstep(0.5, 0.45, d);
                        gl_FragColor = vec4(vec3(1.0), vOpacity * alpha * 0.4);
                    }
                `}
            />
        </points>
    );
};

const CinematicSequence = () => {
    const [targetPositions, setTargetPositions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef();
    const progressObj = useRef({ val: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = '/assets/logo-shape.png';
        img.crossOrigin = "Anonymous";
        img.onerror = () => {
            img.src = 'ChatGPT Image Feb 10, 2026, 10_55_50 PM (1).png';
        };
        img.onload = () => {
            setTargetPositions(sampleLogo(img, PARTICLE_COUNT));
            setIsLoading(false);

            // MASTER CINEMATIC TIMELINE: Unified for perfect bi-directional sync
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    endTrigger: "#approach-spacer",
                    end: "bottom top",
                    scrub: true, // Absolute 1:1 link for zero lag in both directions
                }
            });

            // 1. ASSEMBLE: 0->1 exactly over the Hero section
            tl.to(progressObj.current, {
                val: 1,
                duration: 10,
                ease: "none"
            });

            // 2. SOLID STATE: Holds 1->1.2 over the TrustedBy section
            tl.to(progressObj.current, {
                val: 1.2,
                duration: 4,
                ease: "none"
            });

            // 3. REVERSE DISPERSAL: SHATTERS AS YOU ENTER THE INDUSTRY PROBLEM
            tl.to(progressObj.current, {
                val: 3.0,
                duration: 10,
                ease: "none"
            });

            // Stage 4: Master Canvas Fade-out over the Spacer
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 2,
                ease: "none"
            });
        };
    }, []);

    if (isLoading) return <div style={{ background: '#000', width: '100vw', height: '100vh', position: 'fixed', zIndex: -1 }} />;

    return (
        <div ref={containerRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#000000',
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            <Canvas
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
                camera={{ position: [0, 0, 25], fov: 40 }}
            >
                <primitive object={progressObj.current} attach="userData" />
                <CinematicParticles targetPositions={targetPositions} />
                <EffectComposer multisampling={0}>
                    <Bloom intensity={0.1} luminanceThreshold={0.9} />
                </EffectComposer>
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
};

export default CinematicSequence;
