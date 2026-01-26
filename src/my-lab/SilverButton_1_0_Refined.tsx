import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import React, { useRef } from 'react';
import { RoundedBox, useTexture } from '@react-three/drei';
import { staticFile } from 'remotion';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';

/**
 * REFINED VERSION (V1.0)
 * Uses PBR parameters from Theme and the Hydraulic coupling.
 */
export const SilverButton_1_0_Refined: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const meshRef = useRef<THREE.Mesh>(null);

    // Load Logo Texture
    const logoTexture = useTexture(staticFile('assets/logo.png'));

    // Physics 1: Impact Scale
    const scaleConfig = THEME.physics.snappy;
    const scaleVal = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: scaleConfig,
    });
    
    const scale = interpolate(scaleVal, [0, 1], [0, 1]);

    // Physics 2: Glint Movement
    const glintPos = interpolate(frame, [40, 90], [-2, 2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    return (
        <group scale={scale}>
            <spotLight
                position={[glintPos, 1, 3]}
                angle={0.3}
                penumbra={0.5}
                intensity={THEME.colors.accent.glint ? 2 : 1} 
                castShadow
            />

            <RoundedBox args={[3.5, 1.2, 0.2]} radius={0.1} smoothness={4} ref={meshRef}>
                 <meshStandardMaterial
                    color={THEME.colors.metallic.stop2}
                    metalness={THEME.pbr.metalness}
                    roughness={THEME.pbr.roughness}
                    envMapIntensity={THEME.pbr.envMapIntensity}
                />
            </RoundedBox>

            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial 
                    map={logoTexture} 
                    transparent 
                    opacity={0.9}
                />
            </mesh>
        </group>
    );
};
