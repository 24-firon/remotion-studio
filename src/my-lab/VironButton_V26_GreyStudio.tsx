import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V26: GREY STUDIO (Realistic Silver Tones)
 * - The key insight: Real studios have GREY WALLS, not just white lights.
 * - Silver reflects grey tones, not just pure white/black.
 * - We use grey-colored Lightformers to simulate studio walls.
 */
export const VironButton_V26_GreyStudio: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={512}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* 
                        GREY WALLS - The main "silver" tone source
                        Not pure white, but various greys for soft gradients
                    */}
                    
                    {/* BACK WALL: Light grey - main fill */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.5} 
                        color="#c0c0c0"  // Silver grey
                        scale={[60, 40, 1]} 
                        position={[0, 0, 25]}
                    />

                    {/* LEFT WALL: Medium grey */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.2} 
                        color="#b0b0b0"
                        scale={[30, 40, 1]} 
                        position={[-25, 0, 0]}
                        rotation={[0, Math.PI / 2, 0]}
                    />

                    {/* RIGHT WALL: Medium grey */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.2} 
                        color="#b0b0b0"
                        scale={[30, 40, 1]} 
                        position={[25, 0, 0]}
                        rotation={[0, -Math.PI / 2, 0]}
                    />

                    {/* FLOOR: Darker grey */}
                    <Lightformer 
                        form="rect" 
                        intensity={0.8} 
                        color="#909090"
                        scale={[50, 30, 1]} 
                        position={[0, -20, 10]}
                        rotation={[Math.PI / 2, 0, 0]}
                    />

                    {/* CEILING: Lighter grey with soft light */}
                    <Lightformer 
                        form="rect" 
                        intensity={2.0} 
                        color="#e0e0e0"
                        scale={[50, 30, 1]} 
                        position={[0, 20, 10]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />

                    {/* HIGHLIGHT STRIP: The "glint" accent - brighter white */}
                    <Lightformer 
                        form="rect" 
                        intensity={4} 
                        color="#ffffff"
                        scale={[3, 15, 1]} 
                        position={[12, 5, 20]}
                    />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.12}
                    envMapIntensity={1.8}
                    clearcoat={0.6}
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};
