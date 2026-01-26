import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';

/**
 * VIRON BUTTON V10 (THE "LIQUID PILL")
 * - Shape: RESTORED 3D Roundness (Radius 0.9 for perfect Pill).
 * - Fix for "Frame": We use a "Liquid Metal" material setup.
 *   High Clearcoat + Seamless Studio Environment eliminates the visual "Edge Line".
 */
export const VironButton_V10_LiquidPill: React.FC = () => {
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
        roughness: 0.15,          // Liquid smoothness
        envMapIntensity: 2.2,     // High brightness to wash out seams
        clearcoat: 1.0,           // The key to "frameless" roundness
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio" 
                background={false} 
                blur={0.8} // Smooths the reflection to wrap around the curve
                environmentRotation={[0, envRotationY, 0]} 
            />

            {/* 
               PERFECT PILL GEOMETRY 
               Height 1.8 / 2 = 0.9 Radius.
               This creates a perfect semi-circle end cap (Capsule/Pill).
            */}
            <RoundedBox 
                args={[5.8, 1.8, 0.25]} 
                radius={0.9} // MAX ROUNDNESS (The User's "3D Rund")
                smoothness={64}
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
