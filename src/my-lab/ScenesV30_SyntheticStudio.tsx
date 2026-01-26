import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V30a_RebuiltStudio, VironButton_V30b_HighKey } from './VironButton_V30_SyntheticStudio';
import { VironTerminal_Master } from './VironTerminal_Master';

const HighResScene: React.FC<{ children: React.ReactNode, exposure?: number }> = ({ children, exposure = 1.0 }) => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 0, 10], fov: 32 }}
                width={1920} height={1080}
                dpr={[1.5, 3]}
                gl={{ toneMappingExposure: exposure, antialias: true }}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

export const SceneV30a_Rebuilt: React.FC = () => <HighResScene exposure={1.2}><VironButton_V30a_RebuiltStudio /></HighResScene>;
export const SceneV30b_HighKey: React.FC = () => <HighResScene exposure={1.3}><VironButton_V30b_HighKey /></HighResScene>;
