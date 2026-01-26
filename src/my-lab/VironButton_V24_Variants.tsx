import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V24a: CLEAN (High Blur to remove ALL visible elements)
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
                blur={1.0}  // MAXIMUM BLUR - no visible equipment
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.15}
                    envMapIntensity={2.0}
                    clearcoat={0.8}
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};

/**
 * V24b: SUBTLE COLOR (Using sunset preset with high blur for warm gradient)
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
                preset="sunset"  // Outdoor - no equipment, just sky colors
                background={false}
                blur={0.8}  // High blur for soft color gradient
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.12}
                    envMapIntensity={1.8}
                    clearcoat={1.0}
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};

/**
 * V24c: COLD/NEUTRAL (Using dawn preset with high blur for cool tones)
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
                preset="dawn"  // Outdoor - cool blue tones, no equipment
                background={false}
                blur={0.8}
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.08}
                    envMapIntensity={2.0}
                    clearcoat={1.0}
                    clearcoatRoughness={0.0}
                />
            </mesh>
        </group>
    );
};
