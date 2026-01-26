import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, staticFile } from 'remotion';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { RoundedBox } from '@react-three/drei';
import { THEME } from '../../theme/Theme';

/**
 * ROUNDED VERSION (V2.0)
 * Implements Rule 12 and Physics mandates for high-fidelity edges.
 */
export const VironCube_2_0_Rounded: React.FC = () => {
    const frame = useCurrentFrame();

    // Load Texture
    const logoTexture = useLoader(TextureLoader, staticFile('assets/logo.png'));

    // Animation: Infinite Loop (300 frames)
    const rotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);
    const rotationX = Math.PI * 0.1;

    // Materials Setup
    const logoMaterialProps = useMemo(() => ({
        map: logoTexture,
        color: '#ffffff',
        metalness: THEME.pbr.metalness,
        roughness: 0.1, // High-gloss mandated
    }), [logoTexture]);

    const capMaterialProps = useMemo(() => ({
        color: THEME.colors.metallic.stop2,
        metalness: 1.0,
        roughness: 0.1,
    }), []);

    return (
        <group rotation={[rotationX, rotationY, 0]}>
            <RoundedBox args={[2.5, 2.5, 2.5]} radius={0.15} smoothness={4}>
                <meshStandardMaterial attach="material-0" {...logoMaterialProps} />
                <meshStandardMaterial attach="material-1" {...logoMaterialProps} />
                <meshStandardMaterial attach="material-2" {...capMaterialProps} />
                <meshStandardMaterial attach="material-3" {...capMaterialProps} />
                <meshStandardMaterial attach="material-4" {...logoMaterialProps} />
                <meshStandardMaterial attach="material-5" {...logoMaterialProps} />
            </RoundedBox>
        </group>
    );
};
