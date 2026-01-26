import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo, useRef } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * VIRON BUTTON V15 (THE "BRIGHT MASTER")
 * - Based on V14 Hyper-Liquid.
 * - Change: SIGNIFICANTLY HIGHER LIGHT INTENSITY.
 * - Goal: Make it pop! "Zu dunkel" fixed.
 */
export const VironButton_V15_Bright: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 40, stiffness: 90, mass: 2.0 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            const rotation = interpolate(frame, [0, 300], [0, Math.PI * 2]);
            groupRef.current.rotation.y = rotation;
        }
    });

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.1,          
        envMapIntensity: 2.0,    // Boosted from 1.2 -> 2.0 for brighter reflections
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            <Environment resolution={1024}>
                <group ref={groupRef}>
                    {/* BASE ILLUMINATION (The "Ambient" White) */}
                    <Lightformer 
                        form="ring" 
                        intensity={5} // Boosted from 3
                        color="white" 
                        scale={[30, 10, 1]} 
                        target={[0, 0, 0]} 
                    />
                    
                    {/* CEILING FILL */}
                    <Lightformer 
                        form="rect" 
                        intensity={4} // Boosted from 2
                        color="white" 
                        scale={[10, 10, 1]} 
                        position={[0, 10, 0]} 
                        rotation={[Math.PI / 2, 0, 0]} 
                        target={[0, 0, 0]}
                    />

                    {/* THE "BLINDING" GLINTS */}
                    <Lightformer 
                        form="rect" 
                        intensity={25} // Boosted from 15
                        color="white" 
                        scale={[2, 10, 1]} 
                        position={[10, 0, -10]} 
                        target={[0, 0, 0]}
                    />
                    <Lightformer 
                        form="rect" 
                        intensity={20} // Boosted from 10
                        color="white" 
                        scale={[5, 10, 1]} 
                        position={[-10, 2, 5]} 
                        target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 64]} /> {/* Slightly fatter (0.92) for extra dominance */}
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
