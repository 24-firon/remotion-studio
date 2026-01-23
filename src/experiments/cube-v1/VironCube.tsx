import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, staticFile } from 'remotion';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { THEME } from '../../theme/Theme';

export const VironCube: React.FC = () => {
    const frame = useCurrentFrame();

    // Load Texture
    const logoTexture = useLoader(TextureLoader, staticFile('assets/logo.png'));

    // Animation: Infinite Loop (300 frames)
    // Deterministic rotation based on frame
    const rotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);
    const rotationX = Math.PI * 0.1; // Slight tilt to show top face

    // Materials Setup
    const logoMaterialProps = useMemo(() => ({
        map: logoTexture,
        color: '#ffffff',
        metalness: 0.5,
        roughness: 0.2,
    }), [logoTexture]);

    const capMaterialProps = useMemo(() => ({
        color: THEME.colors.metallic.stop2, // Silver cap
        metalness: 1.0,
        roughness: 0.1,
    }), []);

    return (
        <group rotation={[rotationX, rotationY, 0]}>
            <mesh>
                <boxGeometry args={[2.5, 2.5, 2.5]} />
                {/* 
                    Material Array Mapping for BoxGeometry:
                    0: Right
                    1: Left
                    2: Top
                    3: Bottom
                    4: Front
                    5: Back
                */}
                <meshStandardMaterial attach="material-0" {...logoMaterialProps} />
                <meshStandardMaterial attach="material-1" {...logoMaterialProps} />
                <meshStandardMaterial attach="material-2" {...capMaterialProps} />
                <meshStandardMaterial attach="material-3" {...capMaterialProps} />
                <meshStandardMaterial attach="material-4" {...logoMaterialProps} />
                <meshStandardMaterial attach="material-5" {...logoMaterialProps} />
            </mesh>
        </group>
    );
};
