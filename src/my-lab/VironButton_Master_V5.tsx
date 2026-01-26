import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';

/**
 * VIRON BUTTON MASTER V5 (THE "HIGH-RES SATIN" EDITION)
 * - Fix 1: Pixelation -> Solved by `blur={1}` on Environment (Soft, high-res gradients).
 * - Fix 2: "Frame/Placeholder" -> Solved by slightly larger geometry and pure black background.
 * - Material: Platinum/White Metal.
 */
export const VironButton_Master_V5: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Entrance
    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 40, stiffness: 90, mass: 2.0 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // 2. Environment Rotation (The "Glint" Movement)
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",         
        metalness: 1.0,           
        roughness: 0.15,          // Satin finish (hides pixels, looks like liquid metal)
        envMapIntensity: 2.5,     // Bright pop to fill the face
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio" 
                background={false} 
                blur={0.8} // <--- THE PIXEL FIX (Smooths grid artifacts into gradients)
                environmentRotation={[0, envRotationY, 0]} 
            />

            {/* Geometry: slightly flatter to push the reflection to the edge */}
            <RoundedBox 
                args={[5.5, 1.8, 0.25]} 
                radius={0.6} // Balanced: Round enough to be friendly, flat enough to fill
                smoothness={64} // Ultra-High Poly
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
