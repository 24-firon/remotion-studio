import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';

/**
 * VIRON BUTTON MASTER (FINAL REDESIGN)
 * - Naming: VIRON (Not Viro)
 * - Philosophy: Physically Correct Environment Rotation (No Fake Lights)
 * - Geometry: Massively Rounded Pill (Radius 0.75)
 * - Animation: Slowed down, "Heavy Metal" feel.
 */
export const VironButton_Master: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Heavy, Damped Entrance (No "Pop", just "Arrival")
    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: {
            damping: 40,
            stiffness: 90,
            mass: 2.0,
        },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // 2. THE TRUE GLINT (Environment Rotation)
    // Instead of moving a fake light, we rotate the entire world reflection
    // around the object. This is how real product cinematography works.
    const envRotationY = interpolate(frame, [40, 150], [0, Math.PI], {
        easing: (t) => t, // Linear rotation for smooth sweep
    });

    const materialProps = useMemo(() => ({
        color: "#ffffff",         // Pure Chrome
        metalness: 1.0,           // 100% Metal
        roughness: 0.12,          // Slightly softer to avoid jagged edges
        envMapIntensity: 1.5,     // Bright, but not blown out
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            {/* 
                THE ENVIRONMENT = THE LIGHT
                We rotate the studio environment to make the reflections 'travel' 
                naturally across the rounded surface.
            */}
            <Environment 
                preset="studio" 
                environmentRotation={[0, envRotationY, 0]} 
            />

            {/* The Hero Body: Exact Pill Shape (Filling the placeholder) */}
            <RoundedBox 
                args={[4.8, 1.6, 0.25]} // Increased form factor to "Fill the hole"
                radius={0.8}           // Perfectly pill-shaped (1.6 / 2 = 0.8)
                smoothness={32}         // Ultra-smooth geometry
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
