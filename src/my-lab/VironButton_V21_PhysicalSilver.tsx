import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V21 (PHYSICAL SILVER)
 * - Strategy: "Color Science".
 * - Base Color: #e0e0e0 (Light Grey) instead of White.
 * - Reflection: Pure white lights.
 * - Result: Physical silver appearance.
 */
export const VironButton_V21_PhysicalSilver: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const materialProps = useMemo(() => ({
        color: "#e0e0e0", // PHYSICAL GREY BASE
        metalness: 1.0,
        roughness: 0.1,
        envMapIntensity: 2.5,
        clearcoat: 1.0,
    }), []);

    return (
        <group scale={scale}>
            <Environment resolution={2048}>
                <Lightformer form="rect" intensity={5} color="white" scale={30} target={[0,0,0]} position={[0,0,-10]}/>
                <Lightformer form="rect" intensity={2} color="#a0aec0" scale={30} target={[0,0,0]} position={[5,0,10]}/>
            </Environment>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
