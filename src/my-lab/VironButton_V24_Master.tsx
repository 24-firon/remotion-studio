import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V24 (THE MASTER RECIPE)
 * - Based on all learnings from V1-V23.
 * - Geometry: CapsuleGeometry (no frame).
 * - Environment: preset="studio" (neutral white, no objects).
 * - Animation: Rotating environment for glint.
 * - Material: Standard polished silver.
 */
export const VironButton_V24_Master: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    const entrance = spring({ 
        frame: frame - CONSTANTS.IMPACT_FRAME, 
        fps, 
        config: { damping: 40, stiffness: 90, mass: 2.0 } 
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    // Glint Animation: Rotate the studio environment
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.12,          // Polished silver, not mirror
        envMapIntensity: 1.5,     // Bright but natural
        clearcoat: 0.8,
        clearcoatRoughness: 0.0,
    }), []);

    return (
        <group scale={scale}>
            <Environment 
                preset="studio"           // Neutral white - no object reflections
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
