import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V32: THE GREY GRADIENT MASTER
 * - Requirement: "80% Grey Gradient, little bit bright, little bit dark."
 * - Anti-Pattern: Stark Black/White contrast (Comic look).
 * - Solution: A massive "Cloud" of grey light that wraps the object.
 */
export const VironButton_V32_GreyGradient: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* 
                        1. THE "80% GREY" BASE
                        A massive sphere/ring of neutral grey light. 
                        Ensures there is NO black hole in the reflection.
                    */}
                    <Lightformer 
                        form="ring" 
                        intensity={1.0} 
                        color="#a0a0a0" // Mid-Grey Base
                        scale={[100, 100, 1]} 
                        position={[0, 0, -10]} 
                        target={[0, 0, 0]}
                    />
                    
                    {/* 
                         2. THE GRADIENT BUILDER (Top-Down)
                         Soft Light Grey from above -> Fades into the Mid-Grey
                    */}
                    <Lightformer 
                        form="rect" 
                        intensity={2.0} 
                        color="#d0d0d0" // Light Silver
                        scale={[50, 50, 1]} 
                        position={[0, 40, 0]} 
                        rotation={[Math.PI / 2, 0, 0]}
                    />

                    {/* 
                        3. THE "LITTLE BIT DARK" (Bottom)
                        We naturally have less light at the bottom, creating the dark anchor.
                        We accentuate it with a subtle dark strip (actually just lack of light, 
                        but we can guide it).
                    */}

                    {/* 
                        4. THE "LITTLE BIT BRIGHT" (Highlight)
                        A soft main key light for definition, but NOT harsh.
                    */}
                    <Lightformer 
                        form="circle" 
                        intensity={3.0} 
                        color="#ffffff" 
                        scale={[15, 15, 1]} 
                        position={[-20, 20, 20]} 
                        target={[0, 0, 0]}
                    />

                    {/* 
                        5. SOFT FILL (Right)
                        Just to break the symmetry slightly.
                    */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.5} 
                        color="#c0c0c0" 
                        scale={[20, 40, 1]} 
                        position={[20, 0, 20]} 
                        target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.14} // Slightly rougher spread the grey gradient
                    envMapIntensity={1.2} // Lower intensity to keep greys distinct (not blown out)
                    clearcoat={1.0}
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};
