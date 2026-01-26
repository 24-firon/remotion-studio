import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo, useRef } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * VIRON BUTTON V14 (THE "HYPER-LIQUID" CAPSULE)
 * - Goal: Restore the "3D Metal Effect" (Rich Reflections) while keeping the "Seamless" look.
 * - Solution: Combine CAPSULE GEOMETRY (V13) with ROTATING LIGHT TENT (V12).
 *   - The Capsule ensures no beveled edges.
 *   - The Rotating Light Tent creates the "Liquid Metal" flow without dark floor reflections.
 */
export const VironButton_V14_HyperLiquid: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 40, stiffness: 90, mass: 2.0 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // ANIMATION: We restore the Rotating Environment!
    // But we rotate a CUSTOM WHITE ENVIRONMENT, so no "dark floor" spins around.
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
        roughness: 0.1,          // High polish for maximum glint
        envMapIntensity: 1.2,    // Balanced brightness
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            {/* 
                THE ENV: A Full Surround Light Tent that SPINS.
                This creates the "Moving Metal" effect.
            */}
            <Environment resolution={1024}>
                <group ref={groupRef}>
                    {/* Main "Horizon" Light - Continuous Band */}
                    <Lightformer 
                        form="ring" 
                        intensity={3} 
                        color="white" 
                        scale={[30, 10, 1]} 
                        target={[0, 0, 0]} 
                    />
                    
                    {/* Top Softbox - General fill */}
                    <Lightformer 
                        form="rect" 
                        intensity={2} 
                        color="white" 
                        scale={[10, 10, 1]} 
                        position={[0, 10, 0]} 
                        rotation={[Math.PI / 2, 0, 0]} 
                        target={[0, 0, 0]}
                    />

                    {/* THE HERO GLINTS - These create the specific "swish" reflections */}
                    <Lightformer 
                        form="rect" 
                        intensity={15} // Hotspot 1
                        color="white" 
                        scale={[2, 10, 1]} 
                        position={[10, 0, -10]} 
                        target={[0, 0, 0]}
                    />
                    <Lightformer 
                        form="rect" 
                        intensity={10} // Hotspot 2 (Opposite)
                        color="white" 
                        scale={[5, 10, 1]} 
                        position={[-10, 2, 5]} 
                        target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            {/* GEOMETRY: The Seamless Capsule */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.9, 4.0, 8, 64]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
