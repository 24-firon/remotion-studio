import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo, useRef } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * VIRON BUTTON V16 (THE "SILVER SUN" - BRIGHTNESS FIX)
 * - Based on V15.
 * - Problem: "Too Dark" (Looks like Black Chrome).
 * - Cause: The metal was reflecting the black void between lights.
 * - Solution: Add a massive "Front/Fill" Lightformer to wash the surface in soft white.
 */
export const VironButton_V16_Silver: React.FC = () => {
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
        roughness: 0.15,          // Slightly rougher to catch the fill light better
        envMapIntensity: 2.5,     // High intensity
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            {/* THE SILVER STUDIO */}
            <Environment resolution={1024}>
                <group ref={groupRef}>
                    {/* 1. BRIGHT RIM (The Outline) */}
                    <Lightformer 
                        form="ring" 
                        intensity={4} 
                        color="white" 
                        scale={[30, 10, 1]} 
                        target={[0, 0, 0]} 
                    />
                    
                    {/* 2. TOP DOWN (Ceiling) */}
                    <Lightformer 
                        form="rect" 
                        intensity={3} 
                        color="white" 
                        scale={[10, 10, 1]} 
                        position={[0, 10, 0]} 
                        rotation={[Math.PI / 2, 0, 0]} 
                        target={[0, 0, 0]}
                    />

                    {/* 3. THE "SILVER MAKER" (Front Fill) 
                        This giant soft box sits in front/around to ensure the 
                        center of the button reflects white/grey, not black.
                    */}
                    <Lightformer 
                        form="rect" 
                        intensity={2}         // Soft fill
                        color="#eef2ff"       // Very slight cool silver tint
                        scale={[20, 20, 1]}   // Massive
                        position={[0, 0, -20]} // Behind camera (reflects in front)
                        target={[0, 0, 0]}
                    />

                    {/* 4. THE SHARP GLINTS (Detail) */}
                    <Lightformer 
                        form="rect" 
                        intensity={10} 
                        color="white" 
                        scale={[2, 10, 1]} 
                        position={[10, 0, -10]} 
                        target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 64]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
