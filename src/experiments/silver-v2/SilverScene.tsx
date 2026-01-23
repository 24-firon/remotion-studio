import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';
import { THEME } from '../../theme/Theme';
import { SilverMonolith } from './SilverMonolith';

export const SilverScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: THEME.colors.neutral.gray900 }}>
            {/* Background Layer: Radial Gradient for Depth */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at center, ${THEME.colors.metallic.stop7} 0%, ${THEME.colors.neutral.gray900} 80%)`,
                zIndex: 0
            }} />

            {/* 3D Scene Layer */}
            <AbsoluteFill style={{ zIndex: 10 }}>
                <ThreeCanvas
                    width={1920}
                    height={1080}
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    gl={{ toneMappingExposure: 1.0 }} // Neutral tone mapping
                >
                    {/* HDRI Environment - The only light source */}
                    {/* 'studio' preset provides good sharp reflections for metal */}
                    {/* 'city' is also good but might add color noise. Studio is cleaner for Viron. */}
                    <Environment preset="studio" />

                    {/* NO MANUAL LIGHTS (ambient/directional) explicitly omitted per plan */}

                    <SilverMonolith />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
