import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V9 (THE "ZERO FRAME" EDITION)
 * - CRITICAL FIX: The "Frame" the user sees is the Bevel/Radius.
 * - Solution: Radius -> 0.1 (Almost zero).
 * - Result: The "Inner Button" (Face) fills 98% of the geometry. No thick rim.
 */
export const VironButton_V9_ZeroFrame: React.FC = () => {
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
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.1, 
        envMapIntensity: 2.0, 
        clearcoat: 1.0, 
    }), []);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio" 
                background={false} 
                blur={0.8} // Smooth gradients
                environmentRotation={[0, envRotationY, 0]} 
            />

            <RoundedBox 
                args={[5.8, 1.8, 0.25]} 
                radius={0.05} // <--- THE KEY. Minimal radius = No "Frame".
                smoothness={16}
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
