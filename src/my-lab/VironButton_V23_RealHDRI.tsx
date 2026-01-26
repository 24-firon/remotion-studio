import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V23 (REAL HDRI)
 * - NO MORE CUSTOM LIGHTFORMERS. They were positioned wrong.
 * - USE DREI'S BUILT-IN HDRI PRESETS. These are real studio photos.
 * - Presets: "sunset", "dawn", "night", "warehouse", "forest", "apartment", 
 *            "studio", "city", "park", "lobby".
 * - "studio" is a bright white photography studio.
 */
export const VironButton_V23_RealHDRI: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // Rotating the environment for the glint animation
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#e8e8e8",         // Slightly off-white for natural silver
        metalness: 1.0,
        roughness: 0.15,          // A bit rough for soft reflections, not mirror
        envMapIntensity: 1.5,
        clearcoat: 0.5,
    }), []);

    return (
        <group scale={scale}>
            {/* 
                THE FIX: Use a REAL HDRI preset.
                "apartment" is actually a bright, neutral interior with windows.
                "studio" is a photography studio.
                We rotate it for the animation.
            */}
            <Environment 
                preset="apartment" 
                background={false}
                environmentRotation={[0, envRotationY, 0]}
            />

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};

// V23b: "studio" preset (brighter, more contrast)
export const VironButton_V23b_Studio: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio" 
                background={false}
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.08}
                    envMapIntensity={2.0}
                    clearcoat={1.0}
                />
            </mesh>
        </group>
    );
};

// V23c: "city" preset (outdoor, bright sky)
export const VironButton_V23c_City: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment 
                preset="city" 
                background={false}
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#f0f0f0"
                    metalness={1.0}
                    roughness={0.1}
                    envMapIntensity={1.8}
                    clearcoat={0.8}
                />
            </mesh>
        </group>
    );
};

// V23d: "lobby" preset (indoor, neutral)
export const VironButton_V23d_Lobby: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment 
                preset="lobby" 
                background={false}
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#e0e0e0"
                    metalness={1.0}
                    roughness={0.12}
                    envMapIntensity={1.5}
                    clearcoat={0.6}
                />
            </mesh>
        </group>
    );
};
