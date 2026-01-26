import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';

/**
 * THE FIRST RIGHT DRAFT (V1.0 ORIGINAL)
 * Recovered from Turn 2 history.
 * 3D RoundedBox, No Logo, Authentic Snappy Animation.
 */
export const SilverButton_1_0_Original: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const meshRef = useRef<THREE.Mesh>(null);

    // Physics 1: Impact Scale (Tresor-Bolzen)
    const scaleVal = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: THEME.physics.snappy,
    });
    const scale = interpolate(scaleVal, [0, 1], [0, 1]);

    // Physics 2: Glint / Reflection Movement
    const glintPos = interpolate(frame, [40, 90], [-2, 2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    return (
        <group scale={scale}>
            {/* Dynamic Glint Light */}
            <spotLight
                position={[glintPos, 1, 3]}
                angle={0.3}
                penumbra={0.5}
                intensity={2}
                castShadow
            />

            {/* Main Button Body - PBR Silver */}
            <RoundedBox args={[3.5, 1.2, 0.2]} radius={0.1} smoothness={4} ref={meshRef}>
                 <meshStandardMaterial
                    color={THEME.colors.metallic.stop2}
                    metalness={THEME.pbr.metalness}
                    roughness={THEME.pbr.roughness}
                    envMapIntensity={THEME.pbr.envMapIntensity}
                />
            </RoundedBox>
            
            {/* CLEAN SURFACE - NO LOGO */}
        </group>
    );
};
