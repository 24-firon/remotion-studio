import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo, useRef } from 'react';
import { RoundedBox, Environment, Lightformer, Float } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * VIRON BUTTON V12 (THE "LIGHT TENT" FIX)
 * - Problem: Presets like 'studio' have dark floors/corners that reflect on the bevel as a "Frame".
 * - Solution: Build a CUSTOM ENVIRONMENT using Lightformers.
 * - Setup: A pure white "Light Tent" that surrounds the object.
 */
export const VironButton_V12_LightTent: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 40, stiffness: 90, mass: 2.0 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // Glint Animation: We rotate the Lightformer group
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            // Rotate the environment light to create the moving glint
            const rotation = interpolate(frame, [0, 300], [0, Math.PI * 2]);
            groupRef.current.rotation.y = rotation;
        }
    });

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.15, 
        envMapIntensity: 1.0, 
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            {/* 
                THE LIGHT TENT ENVIRONMENT 
                No preset. Just pure light shapes.
            */}
            <Environment resolution={1024}>
                <group ref={groupRef}>
                    {/* 1. The "Base Light" - A massive surrounding cylinder of soft light 
                           This ensures the EDGES (Bevels) always hit white. 
                    */}
                    <Lightformer 
                        form="ring" 
                        intensity={2} 
                        color="white" 
                        scale={[20, 10, 1]} 
                        target={[0, 0, 0]} 
                    />

                    {/* 2. The "Ceiling" - Prevents top edge darkness */}
                    <Lightformer 
                        form="rect" 
                        intensity={5} 
                        color="white" 
                        scale={[10, 10, 1]} 
                        position={[0, 5, 0]} 
                        rotation={[Math.PI / 2, 0, 0]} 
                        target={[0, 0, 0]}
                    />

                    {/* 3. The "Glint" - A brighter strip for the animation */}
                    <Lightformer 
                        form="rect" 
                        intensity={10} // Super bright Highlight
                        color="#ffffff" 
                        scale={[5, 10, 1]} 
                        position={[5, 2, 5]} 
                        target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            <RoundedBox 
                args={[5.8, 1.8, 0.25]} 
                radius={0.9} // The Shape User Wants (Full Round)
                smoothness={64}
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
