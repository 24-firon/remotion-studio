import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V17 (WHITE ROOM)
 * - Strategy: "No Black Allowed".
 * - Environment: A complete wrap-around of light.
 * - Result: The metal reflects 100% light. zero dark spots.
 */
export const VironButton_V17_WhiteRoom: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.05, // Sharp
        envMapIntensity: 2.0,
        clearcoat: 1.0,
    }), []);

    return (
        <group scale={scale}>
            <Environment resolution={2048}>
                {/* A Sphere of Light - No "Gaps" */}
                <Lightformer form="ring" intensity={5} color="white" scale={50} target={[0,0,0]} />
                <Lightformer form="rect" intensity={5} color="white" scale={50} target={[0,0,0]} position={[0,0,-20]} />
                <Lightformer form="rect" intensity={5} color="white" scale={50} target={[0,0,0]} position={[0,0,20]} />
            </Environment>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} /> {/* 128 segments for ULTRA RES */}
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
