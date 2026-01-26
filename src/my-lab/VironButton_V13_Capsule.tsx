import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo, useRef } from 'react';
import { Environment, Float } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';

/**
 * VIRON BUTTON V13 (THE "CAPSULE" FIX)
 * - CRITICAL GEOMETRY CHANGE: Switched from RoundedBox to CAPSULE.
 *   - RoundedBox has a "Bevel" which creates the "Frame" artifact.
 *   - Capsule is a Sphere expanded linearly -> Perfectly smooth, NO edges/frames.
 * - CRITICAL LIGHTING CHANGE: Stopped Environment Rotation.
 *   - User hates the "Spinning World".
 *   - We use a moving SpotLight for the glint instead.
 */
export const VironButton_V13_Capsule: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 40, stiffness: 90, mass: 2.0 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // ANIMATION: Moving Light Source (Not Spinning World)
    // Moves from Left (-8) to Right (+8)
    const lightX = interpolate(frame, [45, 120], [-10, 10], {
        extrapolateLeft: 'clamp', 
        extrapolateRight: 'clamp'
    });

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.15,          
        envMapIntensity: 1.0,     // Subtle base reflection
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            {/* STATIC ENVIRONMENT (No Rotation) */}
            <Environment preset="studio" background={false} blur={0.6} />

            {/* DYNAMIC LIGHT SOURCE (The Glint) */}
            {/* A bright SpotLight that physically moves across the capsule */}
            <spotLight
                position={[lightX, 2, 5]} // Moves X
                angle={0.5}
                penumbra={1}
                intensity={80} // Bright flash
                color="white"
                castShadow
            />

            {/* 
                GEOMETRY: CAPSULE
                args: [radius, length, capSegments, radialSegments]
                radius: 0.9 (Matches V11/V12 width)
                length: 4.0 (Inner length. Total width = length + 2*radius = 5.8)
            */}
            <mesh rotation={[0, 0, Math.PI / 2]}> {/* Rotate to lie horizontal */}
                <capsuleGeometry args={[0.9, 4.0, 8, 64]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
