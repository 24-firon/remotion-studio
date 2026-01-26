import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V30: THE SYNTHETIC REBUILD
 * - Goal: Recreate the look of the "Studio" preset (V7) but without the visible tripods.
 * - Method: Using Lightformers to mimic the specific "Umbrella" and "Strip" lights of a real studio.
 */
export const VironButton_V30a_RebuiltStudio: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.12, 
        envMapIntensity: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
    }), []);

    return (
        <group scale={scale}>
            <Environment resolution={1024}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* 1. THE MAIN SOFTBOX (Top Left) 
                        Mimics the big white umbrella from the preset.
                        Soft, bright, creates the main highlight.
                    */}
                    <Lightformer 
                        form="circle" // Circular softbox
                        intensity={4} 
                        color="white" 
                        scale={[20, 20, 1]} 
                        position={[-10, 10, 10]} 
                        target={[0, 0, 0]}
                    />

                    {/* 2. THE FILL LIGHT (Right) 
                        A strip light to catch the edge.
                    */}
                    <Lightformer 
                        form="rect" 
                        intensity={2} 
                        color="white" 
                        scale={[10, 30, 1]} 
                        position={[20, 0, 10]} 
                        target={[0, 0, 0]}
                    />

                    {/* 3. THE CEILING (Global Ambiance) 
                        Provides the base "Silver" tone so it's not black.
                    */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.0} 
                        color="#e0e0e0" 
                        scale={[50, 50, 1]} 
                        position={[0, 20, 0]} 
                        rotation={[Math.PI / 2, 0, 0]}
                    />

                    {/* 4. THE HORIZON (Grey Wall)
                        Wraps around to prevent "black void" edges.
                    */}
                    <Lightformer 
                        form="ring" 
                        intensity={0.5} 
                        color="#808080" 
                        scale={[50, 10, 1]} 
                        position={[0, 0, 0]} 
                        target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};

/**
 * V30b: HIGH KEY (Brighter Ceiling)
 * As requested: "Ein bisschen hellere Decke".
 */
export const VironButton_V30b_HighKey: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* HUGE CEILING LIGHT */}
                    <Lightformer 
                        form="rect" 
                        intensity={3} 
                        color="white" 
                        scale={[60, 60, 1]} 
                        position={[0, 30, 0]} 
                        rotation={[Math.PI / 2, 0, 0]}
                    />
                    
                    {/* Front Fill to prevent dark metal */}
                    <Lightformer 
                        form="rect" 
                        intensity={1} 
                        color="#d0d0d0" 
                        scale={[40, 40, 1]} 
                        position={[0, 0, 20]} 
                        target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.08} // Sharper reflections
                    envMapIntensity={1.5}
                    clearcoat={1.0} 
                />
            </mesh>
        </group>
    );
};
