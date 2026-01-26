import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V6 (THE "MASSIVE FILL" EDITION)
 * - Strategy: Brute Force Size.
 * - Width: 6.0 (was 5.5)
 * - Camera: Zoomed in via Scene (FOV 30)
 * - Goal: Eliminate the "Frame/Placeholder" gap by simply being bigger.
 */
export const VironButton_V6_Massive: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 30, stiffness: 100, mass: 1.5 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]); // NO extra scaling, geometry does the work.

    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.15, 
        envMapIntensity: 2.0,
        clearcoat: 1.0,
    }), []);

    return (
        <group scale={scale}>
            {/* Same Soft Studio Lighting */}
            <Environment 
                preset="studio" 
                background={false} 
                blur={0.6} 
                environmentRotation={[0, envRotationY, 0]} 
            />

            {/* MASSIVE GEOMETRY */}
            <RoundedBox 
                args={[6.0, 2.0, 0.3]} // Significantly larger
                radius={0.8}          // Proportional roundness
                smoothness={64}
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
