import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V11 (THE "HORIZON FIX" - SEAMLESS PILL)
 * - Problem: The "Frame" was the dark studio floor reflecting on the bevel.
 * - Solution: We rotate the environment 90 degrees on X.
 * - Result: The bevel now reflects the bright studio ceiling. No dark rim.
 */
export const VironButton_V11_Seamless: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 40, stiffness: 90, mass: 2.0 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // THE MAGIC: ANIMATING Y ROTATION AS BEFORE
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.12,          // Smooth but robust
        envMapIntensity: 2.0,     // Bright for liquid look
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            {/* 
               THE HORIZON FIX:
               environmentRotation={[Math.PI / 2, envRotationY, 0]}
               
               By tilting the world 90 degrees (PI/2), the "Dark Floor" is now hidden,
               and the "Bright Ceiling" wraps around the Top AND Bottom edges.
               This allows the "Liquid" to go all the way to the edge.
            */}
            <Environment 
                preset="studio" 
                background={false} 
                blur={0.8}
                environmentRotation={[Math.PI / 2.5, envRotationY, 0]} // Tilted slightly to catch light on rim
            />

            <RoundedBox 
                args={[5.8, 1.8, 0.25]} 
                radius={0.9} // MAX ROUNDNESS (Pill)
                smoothness={64}
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
