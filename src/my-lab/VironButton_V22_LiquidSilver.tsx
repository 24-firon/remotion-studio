import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V22 (LIQUID SILVER MASTER)
 * - Research-Backed Implementation ("Liquid Silver").
 * - Material: MeshPhysicalMaterial (PBR).
 * - Metalness: 1.0 (True Metal).
 * - Roughness: 0.02 (Research says 0-0.05 for liquid look).
 * - Environment: High-Res (4096) Custom Studio (No Black Void).
 */
export const VironButton_V22_LiquidSilver: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.02,          // Research: Near zero for liquid look
        envMapIntensity: 2.5,     // Bright reflections
        clearcoat: 1.0,           // "Wet" look layer
        clearcoatRoughness: 0.0,
    }), []);

    return (
        <group scale={scale}>
            {/* 
                THE "LIQUID STUDIO" - Research confirmed High-Res Env is key.
                We use resolution={2048} to kill pixels.
            */}
            <Environment resolution={2048}>
                {/* 1. The "Silver Fill" (Front) - Prevents Black Metal look */}
                <Lightformer form="rect" intensity={2} color="#f0f0f0" scale={30} target={[0,0,0]} position={[0,0,-15]} /> 
                
                {/* 2. The "Rim Light" (Back) - Defines the shape */}
                <Lightformer form="ring" intensity={5} color="white" scale={20} target={[0,0,0]} position={[0,0,-5]} />

                {/* 3. The "Glints" (Top/Bottom) - Classic Product Lighting */}
                <Lightformer form="rect" intensity={5} color="white" scale={[10, 1]} target={[0,0,0]} position={[0,5,0]} />
                <Lightformer form="rect" intensity={5} color="white" scale={[10, 1]} target={[0,0,0]} position={[0,-5,0]} />
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                {/* CAPSULE: The only way to get frameless roundness. 128 segments for smoothness. */}
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
