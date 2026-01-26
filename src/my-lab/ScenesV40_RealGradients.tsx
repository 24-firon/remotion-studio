import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V40_RealGradients } from './VironButton_V40_RealGradients';
import { VironTerminal_Master } from './VironTerminal_Master';

const StandardScene: React.FC<{ children: React.ReactNode, exposure?: number }> = ({ children, exposure = 1.0 }) => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        {/* NO TERMINAL IN STANDARD SCENE AS REQUESTED */}
        {/* <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill> */}
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
        {/* Debug Scene might still want terminal? Let's hide it to be safe, user hates it. */}
        {/* <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill> */}
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [20, 30, 30], fov: 60 }}
                width={1920} height={1080}
                dpr={[1.5, 3]}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

export const SceneV40_RealGradients: React.FC = () => <StandardScene><VironButton_V40_RealGradients debug={false} /></StandardScene>;
export const SceneV40_RealGradients_Debug: React.FC = () => <DebugScene><VironButton_V40_RealGradients debug={true} /></DebugScene>;
