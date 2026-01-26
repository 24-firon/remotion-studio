import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V31: THE COLOR-TUNED SYNTHETIC STUDIO
 * - Problem: V30 was "Just Black & White" (Boring).
 * - Solution: Add Color Temperature to the Lightformers.
 * - Still ZERO objects. Just colored light.
 */
export const VironButton_V31a_WarmLuxury: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* WARM MAIN LIGHT (Simulating Sun/Gold) */}
                    <Lightformer 
                        form="circle" 
                        intensity={4} 
                        color="#ffebd0" // Warm Gold-White
                        scale={[20, 20, 1]} 
                        position={[-10, 10, 10]} 
                        target={[0, 0, 0]}
                    />

                    {/* COOL FILL LIGHT (Contrast) */}
                    <Lightformer 
                        form="rect" 
                        intensity={2} 
                        color="#d0e0ff" // Cool Blue-White
                        scale={[10, 30, 1]} 
                        position={[20, 0, 10]} 
                        target={[0, 0, 0]}
                    />

                    {/* WARM AMBIENT CEILING */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.0} 
                        color="#fff5e0" // Very subtle warm
                        scale={[50, 50, 1]} 
                        position={[0, 20, 0]} 
                        rotation={[Math.PI / 2, 0, 0]}
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
                />
            </mesh>
        </group>
    );
};

export const VironButton_V31b_CoolTech: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* COOL MAIN LIGHT (Simulating Skyline) */}
                    <Lightformer 
                        form="circle" 
                        intensity={4} 
                        color="#e0f0ff" // Cool Blue
                        scale={[20, 20, 1]} 
                        position={[-10, 10, 10]} 
                        target={[0, 0, 0]}
                    />

                    {/* NEUTRAL FILL */}
                    <Lightformer 
                        form="rect" 
                        intensity={2} 
                        color="#ffffff"
                        scale={[10, 30, 1]} 
                        position={[20, 0, 10]} 
                        target={[0, 0, 0]}
                    />

                    {/* AMBIENT CEILING */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.0} 
                        color="#f0f8ff" 
                        scale={[50, 50, 1]} 
                        position={[0, 20, 0]} 
                        rotation={[Math.PI / 2, 0, 0]}
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
                />
            </mesh>
        </group>
    );
};
