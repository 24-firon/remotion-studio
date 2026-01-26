import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V28: V7 RESTORED (THE "PERFECT" SILVER)
 * - Reference: User liked V7 reflections ("Ultra Sharp").
 * - Geometry: Capsule (No Ring).
 * - Environment: "studio" preset (The source of V7's look).
 * - Fix: blur={1.0} -> Removes the triangular light stands completely.
 * 
 * This effectively IS Version 7, but applied to the perfect geometry
 * and sanitized of visible equipment.
 */
export const VironButton_V28_V7_Restored: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.12,          // The magic number from V7 era
        envMapIntensity: 1.5,
        clearcoat: 1.0,           // Maximum polish
        clearcoatRoughness: 0.0,
    }), []);

    return (
        <group scale={scale}>
            {/* 
                THE V7 SOURCE CODE (Studio Preset)
                + BLUR 1.0 (Sanitization)
                + ROTATION (Animation)
            */}
            <Environment 
                preset="studio" 
                background={false}
                blur={1.0}  // High enough to kill the tripod legs
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
