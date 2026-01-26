import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V19 (CHROME BRIGHT)
 * - Strategy: "Overexposed Chrome".
 * - Environment: High intensity white strips.
 * - Material: Zero Roughness.
 */
export const VironButton_V19_ChromeBright: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.0, // MIRROR
        envMapIntensity: 3.0,
        clearcoat: 1.0,
    }), []);

    return (
        <group scale={scale}>
            <Environment resolution={4096} blur={0.5}> {/* High Res Blur for "Glow" */}
                {/* Horizontal Strips */}
                <Lightformer form="rect" intensity={5} color="white" scale={[20, 1, 1]} position={[0,5,-5]} target={[0,0,0]} />
                <Lightformer form="rect" intensity={5} color="white" scale={[20, 1, 1]} position={[0,-5,-5]} target={[0,0,0]} />
                <Lightformer form="rect" intensity={2} color="#eeeeee" scale={[30, 30, 1]} position={[0,0,-20]} target={[0,0,0]} />
            </Environment>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
