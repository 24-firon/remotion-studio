import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * THE VIRO-MASTER V3 (THE ULTIMATE MASTERPIECE)
 * - Exact Pill Shape: 4.2 x 1.5 with radius 0.75
 * - Slate-Mirror Finish: Inspired by the user screenshot (Deep metallic depth)
 * - Dynamic Glint Sweep: Broad and soft, clearly moving between frame 40-120.
 * - Slower Animation: Authentic weight and presence.
 */
export const ViroMaster_V3_Button: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Heavy Cinematic Entrance
    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: {
            damping: 30, // Much more damped for heavy metal feel
            stiffness: 80,
            mass: 1.5,
        },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // 2. The Master Glint Movement
    // Ensures the glint TRAVELS across the button visibly.
    const glintProgress = interpolate(frame, [45, 130], [-6, 6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const materialProps = useMemo(() => ({
        color: "#1e293b",         // Deep slate blue-silver (from screenshot)
        metalness: 1.0,           
        roughness: 0.08,          // Mirror finish
        clearcoat: 1.0,           
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 2.0,     // Pop against the studio environment
    }), []);

    return (
        <group scale={scale}>
            {/* Broad Area Reflector - Simulates the '0.5' glint style in 3D */}
            <rectAreaLight
                width={1.5}      // Wide for soft gradients
                height={6}
                position={[glintProgress, 1, 2]}
                intensity={12}
                color="#f8fafc"
                rotation={[0, 0, Math.PI / 6]} // Tilted for diagonal glint
            />

            {/* Fill Light for subtle edge definition */}
            <pointLight position={[-5, 2, 5]} intensity={0.5} color="#cbd5e1" />

            {/* The Hero Body: Perfect Pill Shape */}
            <RoundedBox 
                args={[4.2, 1.5, 0.25]} // Larger to fill the placeholder
                radius={0.75}          // Pill Shape (Height/2)
                smoothness={16}
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
