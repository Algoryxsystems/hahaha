import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const GRID_X = 50;
const GRID_Z = 30;
const SPACING = 1.6;

export const InstancedNeuralGrid = ({
    interactive = true,
    rippleStrength = 1.5,
    gridSize = { x: GRID_X, z: GRID_Z },
    autoRotate = false,
    exportRef
}) => {
    const meshRef = useRef();
    const interactionPlaneRef = useRef();
    const groupRef = useRef();
    const { raycaster, camera, mouse } = useThree();

    React.useEffect(() => {
        if (exportRef && meshRef.current) {
            exportRef.current = meshRef.current;
        }
    }, [exportRef]);

    const gX = gridSize?.x ?? GRID_X;
    const gZ = gridSize?.z ?? GRID_Z;
    const count = gX * gZ;
    const tempObject = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);
    const finalColorTemp = useMemo(() => new THREE.Color(), []);
    const mousePos = useRef(new THREE.Vector3(1000, 0, 1000));

    // Colors: Start with Black, transition to Neon
    const baseBlack = useMemo(() => new THREE.Color('#000000'), []);
    const purpleNeon = useMemo(() => new THREE.Color('#bc13fe'), []);
    const pinkNeon = useMemo(() => new THREE.Color('#ff00bd'), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (groupRef.current && autoRotate) {
            groupRef.current.rotation.y = t * 0.1;
        }

        if (interactive && interactionPlaneRef.current) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(interactionPlaneRef.current);
            if (intersects.length > 0) {
                const localPoint = meshRef.current.worldToLocal(intersects[0].point.clone());
                mousePos.current.copy(localPoint);
            } else {
                mousePos.current.set(1000, 0, 1000);
            }
        } else {
            mousePos.current.set(1000, 0, 1000);
        }

        if (meshRef.current) {
            let i = 0;
            const offsetX = (gX * SPACING) / 2;
            const offsetZ = (gZ * SPACING) / 2;
            const mX = mousePos.current.x;
            const mZ = mousePos.current.z;

            for (let x = 0; x < gX; x++) {
                const posX = x * SPACING - offsetX;
                for (let z = 0; z < gZ; z++) {
                    const posZ = z * SPACING - offsetZ;

                    const dx = posX - mX;
                    const dz = posZ - mZ;
                    const distSq = dx * dx + dz * dz;

                    // Faster falloff and simpler check
                    const influence = distSq > 64 ? 0 : Math.exp(-distSq * 0.9);
                    const waveHeight = Math.sin(t * 3.5 + posX * 0.5) * 0.3 + Math.cos(t * 2.5 + posZ * 0.5) * 0.2;

                    const targetY = (interactive ? influence * rippleStrength : 0) + waveHeight;
                    const s = 1.0 + (interactive ? influence * (rippleStrength * 0.4) : 0) + (waveHeight * 0.15);

                    tempObject.position.set(posX, targetY, posZ);
                    tempObject.scale.set(1.0, Math.max(0.1, s), 1.0);
                    tempObject.updateMatrix();
                    meshRef.current.setMatrixAt(i, tempObject.matrix);

                    if (influence > 0.01 && interactive) {
                        const neonBlend = Math.sin(t * 3.0 + (posX + posZ) * 0.1) * 0.5 + 0.5;
                        const targetColor = tempColor.copy(purpleNeon).lerp(pinkNeon, neonBlend);
                        const finalColor = finalColorTemp.copy(baseBlack).lerp(targetColor, influence * 1.8);
                        meshRef.current.setColorAt(i, finalColor);
                    } else {
                        meshRef.current.setColorAt(i, baseBlack);
                    }
                    i++;
                }
            }
            meshRef.current.instanceMatrix.needsUpdate = true;
            if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
        }
    });

    return (
        <group ref={groupRef} rotation={[Math.PI / 12, 0, 0]}>
            {interactive && (
                <mesh
                    ref={interactionPlaneRef}
                    visible={true}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                >
                    <planeGeometry args={[500, 500]} />
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>
            )}

            <instancedMesh
                ref={meshRef}
                args={[null, null, count]}
                position={[0, -5, 0]}
            >
                <boxGeometry args={[0.7, 10, 0.7]} />
                <meshBasicMaterial toneMapped={false} />
            </instancedMesh>
        </group>
    );
};

const RisingBlocks3D = ({ isSiteReady }) => {
    return (
        <section id="approach" style={{
            padding: 0,
            height: '140vh',
            background: 'transparent',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                position: 'relative',
                zIndex: 10,
                pointerEvents: 'none',
                textAlign: 'center',
                maxWidth: '900px',
                padding: '0 20px'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.9rem', display: 'block', marginBottom: '1.5rem' }}>
                        HOW WE WORK
                    </span>
                    <h2 style={{ fontSize: 'clamp(4rem, 10vw, 7.5rem)', fontWeight: 900, lineHeight: 1, marginBottom: '30px', color: '#ffffff', letterSpacing: '-2px' }}>
                        OUR APPROACH
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.3rem', lineHeight: 1.6, marginBottom: '40px', fontWeight: 300, maxWidth: '750px', margin: '0 auto 40px' }}>
                        We don't build from scratch. We write solid core libraries, automate the boring stuff, and focus on the details that make software a pleasure to use.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', textAlign: 'left', pointerEvents: 'auto' }}>
                        {["AI Research", "Developer Tooling", "Real-Time Graphics", "SaaS Platforms", "Open Source"].map((point, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 20px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', borderRadius: '0 8px 8px 0' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                                {point}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                {isSiteReady && (
                    <Canvas camera={{ position: [0, 12, 30], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
                        <ambientLight intensity={1} />
                        <InstancedNeuralGrid />
                    </Canvas>
                )}
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, transparent 35%, #000000 120%)', zIndex: 2, pointerEvents: 'none' }} />
        </section>
    );
};

export default RisingBlocks3D;
