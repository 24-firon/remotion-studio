import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V24a_Clean, VironButton_V24b_SubtleColor, VironButton_V24c_PureMirror } from './VironButton_V24_Variants';
import { VironTerminal_Master } from './VironTerminal_Master';

const HighResScene: React.FC<{ children: React.ReactNode, exposure?: number }> = ({ children, exposure = 1.2 }) => (
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

export const SceneV24a_Clean: React.FC = () => <HighResScene exposure={1.3}><VironButton_V24a_Clean /></HighResScene>;
export const SceneV24b_SubtleColor: React.FC = () => <HighResScene exposure={1.4}><VironButton_V24b_SubtleColor /></HighResScene>;
export const SceneV24c_PureMirror: React.FC = () => <HighResScene exposure={1.2}><VironButton_V24c_PureMirror /></HighResScene>;
