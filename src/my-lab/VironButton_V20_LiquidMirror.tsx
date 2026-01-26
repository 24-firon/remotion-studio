import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V20 (LIQUID MIRROR)
 * - Strategy: "The Pixel Fix".
 * - Roughness: 0 (No matte noise).
 * - Resolution: 4k Environment.
 * - Look: Like mercury.
 */
export const VironButton_V20_LiquidMirror: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.02, // Just enough to look real, not CG.
        envMapIntensity: 2.0,
        clearcoat: 1.0,
    }), []);

    return (
        <group scale={scale}>
            <Environment resolution={4096}>
                {/* Classic Studio - Top/Bottom/Rim */}
                <Lightformer form="ring" intensity={5} scale={10} position={[0,0,-5]} target={[0,0,0]} />
            </Environment>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 256]} /> {/* EXTREME GEOMETRY */}
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
