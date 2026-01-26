import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * VIRON BUTTON V18 (GREY STUDIO)
 * - Strategy: "Realistic Silver".
 * - Environment: Grey panels instead of pure white/black.
 * - Result: A rich, mid-tone silver look (like a MacBook Pro).
 */
export const VironButton_V18_GreyStudio: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.12, 
        envMapIntensity: 1.5,
        clearcoat: 1.0,
    }), []);

    return (
        <group scale={scale}>
            <Environment resolution={2048}>
                 {/* Grey / Cool White Fill */}
                <Lightformer form="rect" intensity={2} color="#cccccc" scale={40} position={[0,0,-10]} target={[0,0,0]} />
                <Lightformer form="rect" intensity={4} color="white" scale={10} position={[10,10,10]} target={[0,0,0]} />
            </Environment>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </group>
    );
};
