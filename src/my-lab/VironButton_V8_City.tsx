import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V8 (THE "CITY" EDITION)
 * - Strategy: Different Reflection Source.
 * - Preset: 'city' (More complex highlights than studio)
 * - Look: More "Real World" metal, less "Perfect Studio".
 */
export const VironButton_V8_City: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 25, stiffness: 120, mass: 1 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.1,
        envMapIntensity: 1.0, 
        clearcoat: 1.0,
    }), []);

    return (
        <group scale={scale}>
            {/* CITY ENVIRONMENT - Complex Reflections */}
            <Environment 
                preset="city" 
                background={false} 
                blur={0.5} 
                environmentRotation={[0, envRotationY, 0]} 
            />

            <RoundedBox 
                args={[5.5, 1.8, 0.25]} 
                radius={0.6}
                smoothness={64}
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
