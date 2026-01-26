import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V33: THE COLOR GRADIENT MASTER
 * - Requirement: "Not Black & White. Show me the room."
 * - Strategy: 
 *   1. Massive colored gradients (Blue-Grey base, Beige highlight).
 *   2. Debug view available (see V33_Debug).
 */
export const VironButton_V33_ColorGradient: React.FC<{ debug?: boolean }> = ({ debug = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            {/* 
                ENVIRONMENT
                resolution={1024} for smooth gradients
                background={debug} -> SHOWS THE ROOM IF TRUE
            */}
            <Environment resolution={1024} background={debug}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* 
                        1. THE ATMOSPHERE (Base Color)
                        A huge ring of Cool Blue-Grey. 
                        This tints the dark parts of the metal blueish, instead of black.
                    */}
                    <Lightformer 
                        form="ring" 
                        intensity={1.5} 
                        color="#c0d0e0" // Cool Blue Grey
                        scale={[100, 100, 1]} 
                        position={[0, 0, -10]} 
                        target={[0, 0, 0]}
                    />

                    {/* 
                        2. THE "SUN" (Warm Highlight)
                        Soft Warm Beige from top-left.
                        Creates the gold/champagne shimmer on the top edge.
                    */}
                    <Lightformer 
                        form="circle" 
                        intensity={3.0} 
                        color="#fff0d0" // Warm Beige
                        scale={[30, 30, 1]} 
                        position={[-20, 30, 20]} 
                        target={[0, 0, 0]}
                    />
                    
                    {/* 
                         3. THE FLOOR (Grounding)
                         Neutral Dark Grey to anchor the bottom, but lifted slightly so it's not pitch black.
                    */}
                    <Lightformer 
                        form="rect" 
                        intensity={0.5} 
                        color="#808090" // Dark Blue Grey
                        scale={[50, 50, 1]} 
                        position={[0, -30, 0]} 
                        rotation={[-Math.PI / 2, 0, 0]}
                    />

                    {/* 
                        4. THE FILL (Softness)
                        Massive soft white fill from the right to smooth transitions.
                    */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.0} 
                        color="#e0e0e0" 
                        scale={[40, 40, 1]} 
                        position={[30, 0, 20]} 
                        target={[0, 0, 0]}
                    />
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
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};
