import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

type EnvPreset = 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';

interface VironEnvProps {
    preset: EnvPreset;
    blur?: number;
    intensity?: number;
    color?: string;
}

/**
 * GENERIC V29 COMPONENT
 * Allows easy switching of environments to showcase different moods.
 */
const VironButton_V29_Generic: React.FC<VironEnvProps> = ({ 
    preset, 
    blur = 1.0, 
    intensity = 1.5,
    color = "#ffffff" 
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: color,
        metalness: 1.0,
        roughness: 0.12,
        envMapIntensity: intensity,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
    }), [color, intensity]);

    return (
        <group scale={scale}>
            <Environment 
                preset={preset} 
                background={false}
                blur={blur}
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};

// --- THE VARIANTS ---

export const VironButton_V29a_Sunset: React.FC = () => (
    <VironButton_V29_Generic preset="sunset" blur={1.0} intensity={1.8} />
);

export const VironButton_V29b_Night: React.FC = () => (
    <VironButton_V29_Generic preset="night" blur={0.8} intensity={2.0} />
);

export const VironButton_V29c_Warehouse: React.FC = () => (
    <VironButton_V29_Generic preset="warehouse" blur={1.0} intensity={1.5} />
);

export const VironButton_V29d_Forest: React.FC = () => (
    <VironButton_V29_Generic preset="forest" blur={1.0} intensity={1.5} />
);
