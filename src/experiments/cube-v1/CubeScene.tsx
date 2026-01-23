import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';
import { THEME } from '../../theme/Theme';
import { VironCube } from './VironCube';

export const CubeScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: THEME.colors.neutral.gray900 }}>
            {/* Background Gradient */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at center, ${THEME.colors.metallic.stop6} 0%, ${THEME.colors.neutral.black} 100%)`,
                zIndex: 0
            }} />

            {/* 3D Scene */}
            <AbsoluteFill style={{ zIndex: 10 }}>
                <ThreeCanvas
                    width={1920}
                    height={1080}
                    camera={{ position: [0, 0, 8], fov: 45 }}
                >
                    <Environment preset="studio" />
                    
                    {/* No Manual Lights - purely Image Based Lighting (IBL) */}
                    
                    <VironCube />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
