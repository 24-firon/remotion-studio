import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';

type LightShape = 'oval' | 'triangle' | 'hexagon' | 'star';

const CustomLightShape: React.FC<{ type: LightShape; color: string; intensity: number }> = ({ type, color, intensity }) => {
    const material = new THREE.MeshBasicMaterial({ color, toneMapped: false });
    // Boost color by intensity for HDR effect
    material.color.multiplyScalar(intensity);

    if (type === 'oval') {
        return (
            <mesh material={material} scale={[20, 10, 1]}>
                <circleGeometry args={[1, 64]} />
            </mesh>
        );
    }
    if (type === 'triangle') {
        return (
            <mesh material={material} scale={[15, 15, 1]} rotation={[0, 0, Math.PI / 6]}>
                <circleGeometry args={[1, 3]} />
            </mesh>
        );
    }
    if (type === 'hexagon') {
        return (
            <mesh material={material} scale={[15, 15, 1]}>
                <circleGeometry args={[1, 6]} />
            </mesh>
        );
    }
    if (type === 'star') {
        // Constructing a Star with "Balls at tips"
        return (
            <group scale={[1,1,1]}>
                {/* Core Star */}
                <mesh material={material} scale={[15, 15, 1]}>
                    <dodecahedronGeometry args={[1, 0]} /> {/* Abstract star-ish shape or sticking to simple geometry */}
                </mesh>
                {/* 
                   Actually, let's make a real star shape using 2 triangles inverted 
                */}
                <mesh material={material} scale={[12, 12, 1]} rotation={[0,0,0]}>
                    <circleGeometry args={[1, 3]} />
                </mesh>
                <mesh material={material} scale={[12, 12, 1]} rotation={[0,0, Math.PI]}>
                    <circleGeometry args={[1, 3]} />
                </mesh>
                {/* Balls at tips (for the 6 points of the star) */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                     <mesh key={i} material={material} position={[
                         Math.cos(deg * Math.PI / 180) * 12,
                         Math.sin(deg * Math.PI / 180) * 12,
                         0
                     ]}>
                         <circleGeometry args={[2, 32]} />
                     </mesh>
                ))}
            </group>
        );
    }
    return null;
};

export const VironButton_V34_LightShapes: React.FC<{ shape: LightShape }> = ({ shape }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024}>
                <group rotation={[0, envRotationY, 0]}>
                    
                    {/* 1. MAIN LIGHT (The Shape) */}
                    <group position={[-20, 20, 20]} lookAt={new THREE.Vector3(0,0,0)}>
                         <CustomLightShape type={shape} color="#fff0d0" intensity={4} />
                    </group>

                    {/* 2. FILL LGHT (Another Shape, different color) */}
                    <group position={[20, -10, 20]} lookAt={new THREE.Vector3(0,0,0)}>
                         <CustomLightShape type={shape} color="#d0e0ff" intensity={2} />
                    </group>

                    {/* 3. AMBIENT RING (To prevent black edges) */}
                    <mesh position={[0,0,-10]} scale={[100, 100, 1]}>
                        <ringGeometry args={[0.9, 1, 64]} />
                        <meshBasicMaterial color="#404050" toneMapped={false} />
                    </mesh>

                    {/* 4. CEILING (Soft Top) */}
                    <mesh position={[0, 40, 0]} rotation={[Math.PI/2, 0, 0]} scale={[50, 50, 1]}>
                        <circleGeometry args={[1, 64]} />
                        <meshBasicMaterial color="#e0e0e0" toneMapped={false} />
                    </mesh>

                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.12}
                    envMapIntensity={1.5}
                    clearcoat={1.0}
                />
            </mesh>
        </group>
    );
};
