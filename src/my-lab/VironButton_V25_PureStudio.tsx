import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V25: PURE LIGHTFORMER STUDIO
 * - NO HDRI PRESET. Zero external images.
 * - Only abstract light shapes that create the "studio" gradient.
 * - Camera is at Z=10, button at Z=0.
 * - Lightformers must be at POSITIVE Z (behind camera) to reflect on button face.
 */
export const VironButton_V25_PureStudio: React.FC = () => {
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
                        MAIN FILL: Huge soft rectangle behind camera
                        This is what reflects as the main "silver" on the button face
                    */}
                    <Lightformer 
                        form="rect" 
                        intensity={2} 
                        color="white" 
                        scale={[50, 50, 1]} 
                        position={[0, 0, 20]} // BEHIND camera (Z=10)
                    />

                    {/* TOP SOFTBOX: Creates the top highlight gradient */}
                    <Lightformer 
                        form="rect" 
                        intensity={3} 
                        color="white" 
                        scale={[30, 5, 1]} 
                        position={[0, 15, 10]}
                        rotation={[-Math.PI / 4, 0, 0]}
                    />

                    {/* BOTTOM FILL: Soft gradient at bottom */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.5} 
                        color="#f0f0f0" 
                        scale={[30, 5, 1]} 
                        position={[0, -15, 10]}
                        rotation={[Math.PI / 4, 0, 0]}
                    />

                    {/* RIM LIGHTS: For edge definition */}
                    <Lightformer 
                        form="rect" 
                        intensity={4} 
                        color="white" 
                        scale={[5, 20, 1]} 
                        position={[20, 0, 0]}
                        rotation={[0, Math.PI / 2, 0]}
                    />
                    <Lightformer 
                        form="rect" 
                        intensity={4} 
                        color="white" 
                        scale={[5, 20, 1]} 
                        position={[-20, 0, 0]}
                        rotation={[0, -Math.PI / 2, 0]}
                    />

                    {/* ACCENT: One bright strip for glint animation */}
                    <Lightformer 
                        form="rect" 
                        intensity={8} 
                        color="white" 
                        scale={[2, 15, 1]} 
                        position={[10, 5, 15]}
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
                    clearcoat={0.8}
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};
