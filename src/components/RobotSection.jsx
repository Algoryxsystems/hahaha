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

export const ImageMatchedRobot = ({
    trackCursor = true,
    sensitivity = 1.2,
    idleAnimation = true,
    exportRef
}) => {
    const group = useRef();
    const head = useRef();
    const { mouse, viewport } = useThree();

    React.useEffect(() => {
        if (group.current) {
            group.current.name = "robot_root";
            if (exportRef) {
                exportRef.current = group.current;
            }

            // Build AnimationClip for GLB export
            const duration = 6;
            const fps = 10;
            const numFrames = duration * fps + 1;
            const times = [];
            for (let f = 0; f < numFrames; f++) {
                times.push(f * (duration / (numFrames - 1)));
            }

            const rootPositionValues = [];
            const headQuaternionValues = [];
            const leftArmQuaternionValues = [];
            const rightArmQuaternionValues = [];
            const leftLegQuaternionValues = [];
            const rightLegQuaternionValues = [];

            times.forEach((t) => {
                // 1. Root Position (breathing)
                const idleGroupY = Math.sin(t * 1.5) * 0.1;
                rootPositionValues.push(0, idleGroupY, 0);

                // 2. Head Rotation (idle breathing + simulated mouse interaction)
                const headX = Math.sin(t * 1.0) * 0.03 + Math.sin(t * 0.5) * 0.08;
                const headY = Math.cos(t * 0.7) * 0.15;
                const headZ = Math.sin(t * 0.5) * 0.03;
                const headQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(headX, headY, headZ));
                headQuaternionValues.push(headQ.x, headQ.y, headQ.z, headQ.w);

                // 3. Left Arm Rotation (swaying)
                const leftArmX = Math.sin(t * 2 + 1) * 0.05;
                const leftArmQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(leftArmX, 0, 0.4));
                leftArmQuaternionValues.push(leftArmQ.x, leftArmQ.y, leftArmQ.z, leftArmQ.w);

                // 4. Right Arm Rotation (swaying)
                const rightArmX = Math.sin(t * 2 + 2) * 0.05;
                const rightArmQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(rightArmX, 0, -0.4));
                rightArmQuaternionValues.push(rightArmQ.x, rightArmQ.y, rightArmQ.z, rightArmQ.w);

                // 5. Left Leg Rotation (swaying)
                const leftLegX = Math.sin(t * 2 + 3) * 0.05;
                const leftLegQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(leftLegX, 0, 0));
                leftLegQuaternionValues.push(leftLegQ.x, leftLegQ.y, leftLegQ.z, leftLegQ.w);

                // 6. Right Leg Rotation (swaying)
                const rightLegX = Math.sin(t * 2 + 4) * 0.05;
                const rightLegQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(rightLegX, 0, 0));
                rightLegQuaternionValues.push(rightLegQ.x, rightLegQ.y, rightLegQ.z, rightLegQ.w);
            });

            const tracks = [
                new THREE.VectorKeyframeTrack('robot_root.position', times, rootPositionValues),
                new THREE.QuaternionKeyframeTrack('robot_head.quaternion', times, headQuaternionValues),
                new THREE.QuaternionKeyframeTrack('robot_left_arm.quaternion', times, leftArmQuaternionValues),
                new THREE.QuaternionKeyframeTrack('robot_right_arm.quaternion', times, rightArmQuaternionValues),
                new THREE.QuaternionKeyframeTrack('robot_left_leg.quaternion', times, leftLegQuaternionValues),
                new THREE.QuaternionKeyframeTrack('robot_right_leg.quaternion', times, rightLegQuaternionValues),
            ];

            const clip = new THREE.AnimationClip('RobotBehaviorAnim', duration, tracks);
            group.current.animations = [clip];
        }
    }, [exportRef]);

    useFrame((state) => {
        if (group.current && head.current) {
            const t = state.clock.getElapsedTime();

            // Calculate target rotations
            let targetRotationX = 0;
            let targetRotationY = 0;
            let targetGroupRotZ = 0;

            if (trackCursor) {
                targetRotationX = (mouse.y * viewport.height) / 5 * sensitivity;
                targetRotationY = (mouse.x * viewport.width) / 5 * sensitivity;
                targetGroupRotZ = -mouse.x * 0.2;
            }

            // Add idle breathing wave motion if enabled
            let idleX = 0;
            let idleY = 0;
            let idleGroupY = Math.sin(t * 1.5) * 0.1;

            if (idleAnimation) {
                if (!trackCursor) {
                    idleX = Math.sin(t * 0.5) * 0.12;
                    idleY = Math.cos(t * 0.7) * 0.2;
                } else {
                    idleX = Math.sin(t * 1.0) * 0.03;
                }
            }

            head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -targetRotationX + idleX, 0.15);
            head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, targetRotationY + idleY, 0.15);
            group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetGroupRotZ, 0.1);
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, idleGroupY, 0.1);

            group.current.traverse((child) => {
                if (child.userData && child.userData.offset !== undefined) {
                    const offset = child.userData.offset || 0;
                    child.rotation.x += Math.sin(t * 2 + offset) * 0.005;
                }
            });
        }
    });

    return (
        <group ref={group}>
            <mesh position={[0, -0.45, 0]} material={matteBlack} name="robot_neck">
                <sphereGeometry args={[0.3, 32, 32]} />
            </mesh>
            <group position={[-0.35, -0.3, 0]} rotation={[0, 0, 0.4]} name="robot_left_arm" userData={{ offset: 1 }}>
                <mesh material={matteBlack}><capsuleGeometry args={[0.08, 0.15, 10, 16]} /></mesh>
                <mesh position={[0, -0.25, 0]} material={matteBlack}><capsuleGeometry args={[0.08, 0.2, 10, 16]} /></mesh>
            </group>
            <group position={[0.35, -0.3, 0]} rotation={[0, 0, -0.4]} name="robot_right_arm" userData={{ offset: 2 }}>
                <mesh material={matteBlack}><capsuleGeometry args={[0.08, 0.15, 10, 16]} /></mesh>
                <mesh position={[0, -0.25, 0]} material={matteBlack}><capsuleGeometry args={[0.08, 0.2, 10, 16]} /></mesh>
            </group>
            <group position={[-0.18, -0.75, 0]} name="robot_left_leg" userData={{ offset: 3 }}>
                <mesh material={matteBlack}><capsuleGeometry args={[0.1, 0.12, 10, 16]} /></mesh>
                <mesh position={[0, -0.22, 0]} material={matteBlack}><capsuleGeometry args={[0.1, 0.15, 10, 16]} /></mesh>
            </group>
            <group position={[0.18, -0.75, 0]} name="robot_right_leg" userData={{ offset: 4 }}>
                <mesh material={matteBlack}><capsuleGeometry args={[0.1, 0.12, 10, 16]} /></mesh>
                <mesh position={[0, -0.22, 0]} material={matteBlack}><capsuleGeometry args={[0.1, 0.15, 10, 16]} /></mesh>
            </group>
            <group ref={head} position={[0, 0.25, 0]} name="robot_head">
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

const RobotSection = ({ isSiteReady }) => {
    return (
        <section id="visuals" style={{
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
                    {isSiteReady && (
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
                    )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px', padding: '0 20px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h3 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                            GRAPHICS PLAYGROUND
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '550px', fontSize: 'clamp(1rem, 3vw, 1.25rem)', lineHeight: 1.6, fontWeight: 300, margin: '0 auto' }}>
                            This head is rendered in real-time WebGL. It tracks your mouse, uses spring physics for dampening, and has a breathing cycle. Click and drag on the objects page to play with the settings.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RobotSection;
