import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const matteBlack = new THREE.MeshStandardMaterial({
    color: '#151515',
    roughness: 0.4,
    metalness: 0.8
});

const blueGlow = new THREE.MeshStandardMaterial({
    color: '#00d0ff',
    emissive: '#00f2ff',
    emissiveIntensity: 10
});

const ImageMatchedRobot = () => {
    const group = useRef();
    const head = useRef();
    const { mouse, viewport } = useThree();

    useFrame((state) => {
        if (group.current && head.current) {
            const t = state.clock.getElapsedTime();
            const targetRotationX = (mouse.y * viewport.height) / 5;
            const targetRotationY = (mouse.x * viewport.width) / 5;

            head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -targetRotationX * 1.2, 0.25);
            head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, targetRotationY * 1.2, 0.25);
            group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -mouse.x * 0.2, 0.15);
            group.current.position.y = Math.sin(t * 1.5) * 0.1;

            group.current.traverse((child) => {
                if (child.name === 'limb_part') {
                    const offset = child.userData.offset || 0;
                    child.rotation.x += Math.sin(t * 2 + offset) * 0.005;
                }
            });
        }
    });

    return (
        <group ref={group}>
            <mesh position={[0, -0.45, 0]} material={matteBlack} name="limb_part">
                <sphereGeometry args={[0.3, 32, 32]} />
            </mesh>
            <group position={[-0.35, -0.3, 0]} rotation={[0, 0, 0.4]} name="limb_part" userData={{ offset: 1 }}>
                <mesh material={matteBlack}><capsuleGeometry args={[0.08, 0.15, 10, 16]} /></mesh>
                <mesh position={[0, -0.25, 0]} material={matteBlack}><capsuleGeometry args={[0.08, 0.2, 10, 16]} /></mesh>
            </group>
            <group position={[0.35, -0.3, 0]} rotation={[0, 0, -0.4]} name="limb_part" userData={{ offset: 2 }}>
                <mesh material={matteBlack}><capsuleGeometry args={[0.08, 0.15, 10, 16]} /></mesh>
                <mesh position={[0, -0.25, 0]} material={matteBlack}><capsuleGeometry args={[0.08, 0.2, 10, 16]} /></mesh>
            </group>
            <group position={[-0.18, -0.75, 0]} name="limb_part" userData={{ offset: 3 }}>
                <mesh material={matteBlack}><capsuleGeometry args={[0.1, 0.12, 10, 16]} /></mesh>
                <mesh position={[0, -0.22, 0]} material={matteBlack}><capsuleGeometry args={[0.1, 0.15, 10, 16]} /></mesh>
            </group>
            <group position={[0.18, -0.75, 0]} name="limb_part" userData={{ offset: 4 }}>
                <mesh material={matteBlack}><capsuleGeometry args={[0.1, 0.12, 10, 16]} /></mesh>
                <mesh position={[0, -0.22, 0]} material={matteBlack}><capsuleGeometry args={[0.1, 0.15, 10, 16]} /></mesh>
            </group>
            <group ref={head} position={[0, 0.25, 0]}>
                <mesh material={matteBlack}><sphereGeometry args={[0.58, 64, 64]} /></mesh>
                <mesh position={[0.55, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={matteBlack}><cylinderGeometry args={[0.16, 0.16, 0.12, 32]} /></mesh>
                <mesh position={[-0.55, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={matteBlack}><cylinderGeometry args={[0.16, 0.16, 0.12, 32]} /></mesh>
                <mesh position={[0, 0, 0.38]}>
                    <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                    <meshStandardMaterial color="#000000" roughness={0.05} metalness={1.0} />
                </mesh>
                <group position={[0, 0, 0.6]} scale={[0.18, 0.18, 0.18]}>
                    <group position={[-1.2, 0.6, 0]}><mesh material={blueGlow}><torusGeometry args={[0.5, 0.12, 16, 32, Math.PI]} /></mesh></group>
                    <group position={[1.2, 0.6, 0]}><mesh material={blueGlow}><torusGeometry args={[0.5, 0.12, 16, 32, Math.PI]} /></mesh></group>
                    <group position={[0, -0.6, 0]} rotation={[0, 0, Math.PI]}><mesh material={blueGlow}><torusGeometry args={[1.4, 0.15, 16, 32, Math.PI]} /></mesh></group>
                </group>
            </group>
        </group>
    );
};

const RobotSection = () => {
    return (
        <section id="ai-companion" style={{
            minHeight: 'auto',
            background: '#000000',
            position: 'relative',
            padding: '80px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            <div className="container" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 1
            }}>
                <div style={{ height: 'clamp(300px, 50vh, 550px)', width: '100%', maxWidth: '600px' }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
                        <ambientLight intensity={1.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} color="#ffffff" />
                        <pointLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
                        <pointLight position={[-5, 5, 5]} intensity={2} color="#7000ff" />
                        <pointLight position={[0, 0, 2]} intensity={2} color="#00d0ff" />
                        <ImageMatchedRobot />
                        <ContactShadows opacity={0.6} scale={12} blur={2.5} far={5} />
                        <Environment preset="night" />
                    </Canvas>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px', padding: '0 20px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h3 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                            CORE INTELLIGENCE
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '550px', fontSize: 'clamp(1rem, 3vw, 1.25rem)', lineHeight: 1.6, fontWeight: 300, margin: '0 auto' }}>
                            The interactive consciousness of <span className="gradient-text-pink">Algoryx</span>. Designed for precise operational control and high-performance system orchestration.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RobotSection;
