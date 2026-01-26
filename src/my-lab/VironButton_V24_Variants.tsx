import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V24a: CLEAN (Studio + Blur)
 * - No visible light stands or objects.
 * - Pure gradient reflections.
 */
export const VironButton_V24a_Clean: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio"
                background={false}
                blur={0.5}  // THE KEY: Softens the equipment reflections
                environmentRotation={[0, envRotationY, 0]}
            />
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

/**
 * V24b: SUBTLE COLOR (Studio + Blur + Warm Tint)
 * - Same as V24a but with a subtle warm tone for realism.
 */
export const VironButton_V24b_SubtleColor: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio"
                background={false}
                blur={0.4}  // Slightly less blur to keep some character
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#fff8f0"  // Very subtle warm tint
                    metalness={1.0}
                    roughness={0.10}
                    envMapIntensity={1.8}
                    clearcoat={1.0}
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};

/**
 * V24c: PURE MIRROR (Zero Blur, Zero Color)
 * - The absolute cleanest, but may show some equipment.
 */
export const VironButton_V24c_PureMirror: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio"
                background={false}
                blur={0.0}  // No blur - raw studio
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.05}  // Mirror-sharp
                    envMapIntensity={2.0}
                    clearcoat={1.0}
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};
