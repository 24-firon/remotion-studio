import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V32_GreyGradient } from './VironButton_V32_GreyGradient';
import { VironTerminal_Master } from './VironTerminal_Master';

export const SceneV32: React.FC = () => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 0, 10], fov: 32 }}
                width={1920} height={1080}
                dpr={[1.5, 3]}
                gl={{ toneMappingExposure: 1.0, antialias: true }}
            >
                <VironButton_V32_GreyGradient />
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);
