import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const GRID_X = 50;
const GRID_Z = 30;
const SPACING = 1.6;

const InstancedNeuralGrid = () => {
    const meshRef = useRef();
    const interactionPlaneRef = useRef();
    const { raycaster, camera, mouse } = useThree();

    const count = GRID_X * GRID_Z;
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

        if (interactionPlaneRef.current) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(interactionPlaneRef.current);
            if (intersects.length > 0) {
                const localPoint = meshRef.current.worldToLocal(intersects[0].point.clone());
                mousePos.current.copy(localPoint);
            } else {
                mousePos.current.set(1000, 0, 1000);
            }
        }

        if (meshRef.current) {
            let i = 0;
            const offsetX = (GRID_X * SPACING) / 2;
            const offsetZ = (GRID_Z * SPACING) / 2;
            const mX = mousePos.current.x;
            const mZ = mousePos.current.z;

            for (let x = 0; x < GRID_X; x++) {
                const posX = x * SPACING - offsetX;
                for (let z = 0; z < GRID_Z; z++) {
                    const posZ = z * SPACING - offsetZ;

                    const dx = posX - mX;
                    const dz = posZ - mZ;
                    const distSq = dx * dx + dz * dz;

                    // Faster falloff and simpler check
                    const influence = distSq > 64 ? 0 : Math.exp(-distSq * 0.9);
                    const waveHeight = Math.sin(t * 3.5 + posX * 0.5) * 0.3 + Math.cos(t * 2.5 + posZ * 0.5) * 0.2;

                    const targetY = (influence * 1.5) + waveHeight;
                    const s = 1.0 + (influence * 0.6) + (waveHeight * 0.15);

                    tempObject.position.set(posX, targetY, posZ);
                    tempObject.scale.set(1.0, Math.max(0.1, s), 1.0);
                    tempObject.updateMatrix();
                    meshRef.current.setMatrixAt(i, tempObject.matrix);

                    if (influence > 0.01) {
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
        <group rotation={[Math.PI / 12, 0, 0]}>
            <mesh
                ref={interactionPlaneRef}
                visible={true}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
            >
                <planeGeometry args={[500, 500]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

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

const RisingBlocks3D = () => {
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
                        The Algoryx Advantage
                    </span>
                    <h2 style={{ fontSize: 'clamp(4rem, 10vw, 7.5rem)', fontWeight: 900, lineHeight: 1, marginBottom: '30px', color: '#ffffff', letterSpacing: '-2px' }}>
                        OUR APPROACH
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.3rem', lineHeight: 1.6, marginBottom: '40px', fontWeight: 300, maxWidth: '750px', margin: '0 auto 40px' }}>
                        Algoryx engineers technology frameworks that transform time from an expense into a strategic advantage.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', textAlign: 'left', pointerEvents: 'auto' }}>
                        {["Minimize process latency", "Automate repetitive workflows", "Optimize system response cycles", "Streamline data movement", "Reduce operational bottlenecks"].map((point, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 20px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', borderRadius: '0 8px 8px 0' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                                {point}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                <Canvas camera={{ position: [0, 12, 30], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
                    <ambientLight intensity={1} />
                    <InstancedNeuralGrid />
                </Canvas>
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, transparent 35%, #000000 120%)', zIndex: 2, pointerEvents: 'none' }} />
        </section>
    );
};

export default RisingBlocks3D;
