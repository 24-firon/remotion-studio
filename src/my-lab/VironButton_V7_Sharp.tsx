import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V7 (THE "ULTRA-SHARP" EDITION)
 * - Strategy: Maximum Resolution & Sharpness.
 * - Smoothness: 128 (Insane poly count)
 * - Roughness: 0.05 (Mirror sharp)
 * - Blur: 0 (No softening)
 */
export const VironButton_V7_Sharp: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 40, stiffness: 90, mass: 2.0 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#f8fafc",         
        metalness: 1.0,           
        roughness: 0.05,          // MIRROR SHARP
        envMapIntensity: 3.0,     // HIGH CONTRAST
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
    }), []);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio" 
                background={false} 
                blur={0} // NO BLUR - SHARP EDGES
                environmentRotation={[0, envRotationY, 0]} 
            />

            <RoundedBox 
                args={[5.2, 1.8, 0.25]} 
                radius={0.5} 
                smoothness={128} // MAXIMUM GEOMETRY RESOLUTION
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
