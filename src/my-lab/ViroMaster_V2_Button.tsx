import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * THE VIRO-MASTER V2 (ULTIMATE RESTORATION)
 * - Fixed Gradients: Using Physical Material with Clearcoat for smooth transitions.
 * - Fixed Lights: Broad area lights instead of sharp points to avoid "spots".
 * - Fixed Animation: Damped and slowed down as per user request.
 * - Pill-Shape: Maximum roundness.
 */
export const ViroMaster_V2_Button: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Slowed Down Authentic Entrance
    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: {
            damping: 25,     // More damping = slower, more controlled
            stiffness: 100,  // Lower stiffness = less aggressive
            mass: 1.2,
        },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // 2. The Smooth Glint (Broad Reflector)
    const glintProgress = interpolate(frame, [45, 120], [-5, 5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const materialProps = useMemo(() => ({
        color: "#e2e8f0",         // Slate-Silver base
        metalness: 1.0,           // 100% Metal
        roughness: 0.15,          // Softer reflections for smoother gradients
        clearcoat: 1.0,           // Extra layer of polish
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
    }), []);

    return (
        <group scale={scale}>
            {/* Broad Light Panels for smooth metallic gradients */}
            <rectAreaLight
                width={2}
                height={5}
                position={[-2, 1, 3]}
                intensity={5}
                color="#ffffff"
            />
            <rectAreaLight
                width={1}
                height={5}
                position={[glintProgress, 1, 2]}
                intensity={10}
                color="#f8fafc"
            />

            {/* The Hero Body: Pill-Shape 3.5x1.2 */}
            <RoundedBox 
                args={[3.5, 1.2, 0.22]} 
                radius={0.55}          // High roundness
                smoothness={16}         // Maximum smoothness
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
