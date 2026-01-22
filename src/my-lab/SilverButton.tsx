import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import React, { useRef } from 'react';
import { RoundedBox, useTexture } from '@react-three/drei';
import { staticFile } from 'remotion';
import * as THREE from 'three';

export const SilverButton: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const meshRef = useRef<THREE.Mesh>(null);

    // Load Logo Texture (Anti-Flicker: use staticFile)
    // Note: In a real scenario, we might handle async loading differently, 
    // but useTexture is standard for R3F. Remotion handles suspense.
    const logoTexture = useTexture(staticFile('assets/logo.png'));

    // Physics 1: Impact Scale (Tresor-Bolzen)
    const scaleConfig = THEME.physics.snappy;
    const scaleVal = spring({
        frame: frame - 25, // Start slightly later for dramatic effect
        fps,
        config: scaleConfig,
    });
    
    // Smooth entrance
    const scale = interpolate(scaleVal, [0, 1], [0, 1]);

    // Physics 2: Glint / Reflection Movement
    // Glint moves across the surface based on frame
    const glintPos = interpolate(frame, [40, 90], [-2, 2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    return (
        <group scale={scale}>
            {/* Main Button Body - PBR Silver */}
            <RoundedBox args={[3.5, 1.2, 0.2]} radius={0.1} smoothness={4} ref={meshRef}>
                 <meshStandardMaterial
                    color={THEME.colors.metallic.stop2}
                    metalness={THEME.pbr.metalness}
                    roughness={THEME.pbr.roughness}
                    envMapIntensity={THEME.pbr.envMapIntensity}
                />
            </RoundedBox>

            {/* Logo Overlay Plane (slight offset to avoid z-fighting) */}
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[1.5, 0.5]} /> {/* Adjust size as needed */}
                <meshBasicMaterial 
                    map={logoTexture} 
                    transparent 
                    opacity={0.9}
                />
            </mesh>
            
            {/* Invisible Light Source helper if needed, but HDRI is main source */}
        </group>
    );
};
