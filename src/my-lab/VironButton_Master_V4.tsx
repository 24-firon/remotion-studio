import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import * as THREE from 'three';

/**
 * VIRON BUTTON MASTER V4 (THE "BIG FACE" EDITION)
 * - Technique: Environment Rotation (Physically Correct Glint)
 * - Fix 1: Flattened Curve (Radius 0.45) -> Maximizes the "Inner Button" face area.
 * - Fix 2: Hidden Background -> Only the reflection spins, not the world.
 */
export const VironButton_Master_V4: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Entrance
    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: { damping: 40, stiffness: 90, mass: 2.0 },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // 2. THE SECRET SAUCE: ROTATING THE UNIVERSE
    // How it works: We spin the HDRI environment around the button 360 degrees.
    // This creates natural light reflections that travel across the surface.
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2], {
        easing: (t) => t, 
    });

    const materialProps = useMemo(() => ({
        color: "#ffffff",         
        metalness: 1.0,           
        roughness: 0.1,           // Sharp, clear reflections
        envMapIntensity: 1.5,     
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    }), []);

    return (
        <group scale={scale}>
            {/* 
                THE MAGIC TRICK:
                background={false} -> The user doesn't SEE the room spinning.
                environmentRotation -> The button FEELS the room spinning (Reflections move).
            */}
            <Environment 
                preset="studio" 
                background={false} 
                environmentRotation={[0, envRotationY, 0]} 
            />

            {/* 
                THE GEOMETRY FIX:
                Width: 5.2 (Wider to fill "Placeholder")
                Radius: 0.45 (Reduced from 0.8) -> This "flattens" the button, 
                making the dark "inner" face larger and the white "edge" frame smaller.
            */}
            <RoundedBox 
                args={[5.2, 1.8, 0.25]} 
                radius={0.45}           
                smoothness={32}         
            >
                 <meshPhysicalMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
