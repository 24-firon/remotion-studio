import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V27: THE HYBRID MASTER
 * - Geometry: Capsule (NO FRAME ARTIFACTS).
 * - Environment: Studio Preset (THE GOOD REFLECTIONS).
 * - Fix: Blur = 0.6.
 * 
 * WHY THIS WORKS:
 * 1. The "Studio" preset has high dynamic range (HDR) light => Realism.
 * 2. The "Blur" hides the ugly stands/triods but KEEPS the light information.
 * 3. The "Capsule" ensures there's no black rim around the edge.
 */
export const VironButton_V27_HybridMaster: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.12,          // The "classic" polish
        envMapIntensity: 1.5,
        clearcoat: 0.8,
        clearcoatRoughness: 0.0,
    }), []);

    return (
        <group scale={scale}>
            {/* 
                THE CLASSIC "STUDIO" PRESET 
                + BLUR (0.6) -> Hides objects, keeps light 
                + ROTATION -> Transitions the glint
            */}
            <Environment 
                preset="studio" 
                background={false}
                blur={0.6}
                environmentRotation={[0, envRotationY, 0]}
            />
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
