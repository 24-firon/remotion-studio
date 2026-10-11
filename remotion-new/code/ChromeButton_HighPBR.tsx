import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox, useTexture } from '@react-three/drei';
import { staticFile } from 'remotion';
import { THEME } from '../../theme/Theme';
import { CONSTANTS } from '../../constants';

/**
 * CHROME BUTTON V3.0 - THE HIGH-FIDELITY EXPERIMENT
 * Aligned with "Test #1: Metallic UI"
 * Features: Roughness 0.1, Metalness 1.0, and the restored 112deg glint snap.
 */
export const ChromeButton_3_0_HighPBR: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Assets
    const logoTexture = useTexture(staticFile('assets/logo.png'));

    // 2. Physics: Impact Spring
    const scale = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: THEME.physics.snappy,
    });

    // 3. Glint Timing (Recovered 112deg Snap Logic)
    // We use a high-intensity spotLight to simulate the sharp CSS gradient sweep.
    const glintProgress = interpolate(frame, [45, 85], [-4, 4], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 4. Materials (High-Fidelity Mandate)
    const materialProps = useMemo(() => ({
        color: THEME.colors.metallic.stop2,
        metalness: 1.0,      // Chrome mandate
        roughness: 0.1,      // High-gloss mandate
        envMapIntensity: 2.0, // Double intensity for the "Pop"
    }), []);

    return (
        <group scale={scale}>
            {/* The Glint "Sweep" - Using a focused SpotLight for physical reflection */}
            <spotLight
                position={[glintProgress, 2, 5]}
                angle={0.15}
                penumbra={1}
                intensity={15}
                color="white"
                castShadow
            />

            {/* Main Body */}
            <RoundedBox args={[3.5, 1.2, 0.2]} radius={0.12} smoothness={8}>
                <meshStandardMaterial {...materialProps} />
            </RoundedBox>

            {/* Logo Overlay */}
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[0.8, 0.8]} />
                <meshBasicMaterial 
                    map={logoTexture} 
                    transparent 
                    opacity={0.95}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
};
