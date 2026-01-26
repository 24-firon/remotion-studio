import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';

/**
 * THE TRUE FIRST DRAFT (V0.1 - THE PERFECT HYBRID)
 * Combines the sharp, stylized look of 0.5 with R3F 3D Depth.
 * No Logo. Much rounder. No "PBR Spots".
 */
export const SilverButton_v0_1_PerfectHybrid: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Authentic Snappy Entrance
    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: THEME.physics.snappy,
    });
    const scale = interpolate(entrance, [0, 1], [0, 1.2]); // Slightly larger to feel "super"

    // 2. The High-Contrast Glint (Recovered from 0.5 logic)
    // We map a linear sweep across the 3D surface
    const glintProgress = interpolate(frame, [40, 100], [-3, 3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <group scale={scale}>
            {/* The "Super Glint" - Using a very sharp, high-intensity moving light 
                to mimic the CSS linear-gradient snap on a 3D surface.
            */}
            <pointLight
                position={[glintProgress, 0.5, 2]}
                intensity={15}
                distance={5}
                color="white"
            />

            {/* Main Button Body - Styled 3D */}
            <RoundedBox 
                args={[3.5, 1.2, 0.25]} // Slightly thicker for that 3D "DING" look
                radius={0.25}          // MUCH ROUNDER borders as requested
                smoothness={10}         // High poly for beautiful curves
            >
                 <meshStandardMaterial
                    color="#d4d4d8" // Clean, uniform zinc/silver (no "PBR spots")
                    metalness={0.8}
                    roughness={0.1} // High gloss shine
                />
            </RoundedBox>

            {/* Subtle Inner Glow to enhance the 3D depth without adding noise */}
            <mesh position={[0, 0, 0.13]}>
                <planeGeometry args={[3.3, 1.0]} />
                <meshBasicMaterial 
                    color="white" 
                    transparent 
                    opacity={0.05} 
                />
            </mesh>
        </group>
    );
};
