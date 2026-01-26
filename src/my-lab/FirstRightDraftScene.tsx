import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';
import { THEME } from '../theme/Theme';
import { SilverButton_1_0_Original } from './SilverButton_1_0_Original';
import { Terminal_Original } from './Terminal_Original';

/**
 * THE FIRST RIGHT DRAFT SCENE
 * Restored from Turn 2.
 */
export const FirstRightDraftScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: THEME.colors.neutral.gray900 }}>
            {/* Layer 0: Background */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at center, ${THEME.colors.metallic.stop7} 0%, ${THEME.colors.neutral.gray900} 70%)`,
                opacity: 0.5
            }} />

            {/* Layer 1: The Large Terminal */}
            <AbsoluteFill style={{ zIndex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Terminal_Original />
            </AbsoluteFill>

            {/* Layer 2: The Original 3D Button */}
            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas camera={{ position: [0, 0, 10], fov: 45 }} width={1920} height={1080}>
                    <Environment preset="studio" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={1} />
                    <SilverButton_1_0_Original />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
