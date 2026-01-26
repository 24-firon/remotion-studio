import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V36a_Tilted, VironButton_V36b_ExtremeTilt } from './VironButton_V36_Asymmetric';
import { VironTerminal_Master } from './VironTerminal_Master';

const StandardScene: React.FC<{ children: React.ReactNode, exposure?: number }> = ({ children, exposure = 1.0 }) => (
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

const DebugScene: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 0, 40], fov: 60 }} // Zoom out to see tilt
                width={1920} height={1080}
                dpr={[1.5, 3]}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

export const SceneV36a_Tilted: React.FC = () => <StandardScene><VironButton_V36a_Tilted debug={false} /></StandardScene>;
export const SceneV36a_Tilted_Debug: React.FC = () => <DebugScene><VironButton_V36a_Tilted debug={true} /></DebugScene>;

export const SceneV36b_Extreme: React.FC = () => <StandardScene><VironButton_V36b_ExtremeTilt debug={false} /></StandardScene>;
export const SceneV36b_Extreme_Debug: React.FC = () => <DebugScene><VironButton_V36b_ExtremeTilt debug={true} /></DebugScene>;
