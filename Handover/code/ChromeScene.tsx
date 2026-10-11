import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';
import { THEME } from '../../theme/Theme';
import { ChromeButton_3_0_HighPBR } from './ChromeButton_3_0_HighPBR';

export const ChromeSceneV3: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: THEME.colors.neutral.gray900 }}>
            <AbsoluteFill style={{
                background: `radial-gradient(circle at center, ${THEME.colors.metallic.stop7} 0%, ${THEME.colors.neutral.black} 100%)`,
                zIndex: 0
            }} />

            <AbsoluteFill style={{ zIndex: 10 }}>
                <ThreeCanvas
                    width={1920}
                    height={1080}
                    camera={{ position: [0, 0, 8], fov: 40 }}
                >
                    <Environment preset="studio" />
                    
                    {/* Additional rim light for industrial depth */}
                    <pointLight position={[-10, 10, -10]} intensity={0.5} />
                    
                    <ChromeButton_3_0_HighPBR />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
