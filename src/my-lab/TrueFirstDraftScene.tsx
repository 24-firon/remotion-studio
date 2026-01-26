import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';
import { THEME } from '../theme/Theme';
import { SilverButton_v0_1_PerfectHybrid } from './SilverButton_v0_1_PerfectHybrid';
import { Terminal_Original } from './Terminal_Original';

/**
 * THE TRUE FIRST DRAFT SCENE
 * Verified Restoration: 1000px Terminal + Logo-less 3D Rounded Button.
 */
export const TrueFirstDraftScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#09090b' }}>
            {/* Layer 0: Background Atmosphere */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at center, #27272a 0%, #09090b 100%)`,
                opacity: 0.8
            }} />

            {/* Layer 1: The REAL Large Terminal (maxWidth 1000px) */}
            <AbsoluteFill style={{ zIndex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Terminal_Original />
            </AbsoluteFill>

            {/* Layer 2: The Perfect 3D Button Layer */}
            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas camera={{ position: [0, 0, 10], fov: 40 }} width={1920} height={1080}>
                    <Environment preset="studio" />
                    <SilverButton_v0_1_PerfectHybrid />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
