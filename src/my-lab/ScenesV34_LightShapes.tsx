import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V34_LightShapes } from './VironButton_V34_LightShapes';
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

export const SceneV34a_Oval: React.FC = () => <HighResScene><VironButton_V34_LightShapes shape="oval" /></HighResScene>;
export const SceneV34b_Triangle: React.FC = () => <HighResScene><VironButton_V34_LightShapes shape="triangle" /></HighResScene>;
export const SceneV34c_Hexagon: React.FC = () => <HighResScene><VironButton_V34_LightShapes shape="hexagon" /></HighResScene>;
export const SceneV34d_Star: React.FC = () => <HighResScene><VironButton_V34_LightShapes shape="star" /></HighResScene>;
