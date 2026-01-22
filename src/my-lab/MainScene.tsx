import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { SilverButton } from './SilverButton';
import { Terminal } from './Terminal';
import { THEME } from '../theme/Theme';
import { Environment } from '@react-three/drei';

export const MainScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: THEME.colors.neutral.gray900 }}>
            {/* Layer 0: Vignette / Background Atmosphere */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at center, ${THEME.colors.metallic.stop7} 0%, ${THEME.colors.neutral.gray900} 70%)`,
                opacity: 0.5
            }} />

            {/* Layer 1: HTML/UI Layer - Terminal (Bottom Z-Index relative to button for start) */}
            {/* Note: We put Terminal visually "behind" the button using layout, but in Hybrid, 
                absolute positioning dictates order. 
             */}
            <AbsoluteFill style={{ zIndex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Terminal />
            </AbsoluteFill>

            {/* Layer 2: 3D Scene - Silver Button (Top Z-Index to "float" above/center) */}
            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas 
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    width={1920}
                    height={1080}
                >
                    {/* Lighting Environment (Studio) */}
                    <Environment preset="studio" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={1} />

                    {/* The Hero Object */}
                    <SilverButton />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
