import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { 
    VironButton_V23_RealHDRI, 
    VironButton_V23b_Studio, 
    VironButton_V23c_City, 
    VironButton_V23d_Lobby 
} from './VironButton_V23_RealHDRI';
import { VironTerminal_Master } from './VironTerminal_Master';

const HighResScene: React.FC<{ children: React.ReactNode, exposure?: number }> = ({ children, exposure = 1.0 }) => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000', opacity: 1 }} />
        <AbsoluteFill style={{ zIndex: 10 }}>
            <VironTerminal_Master />
        </AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 0, 10], fov: 32 }}
                width={1920} 
                height={1080}
                dpr={[1.5, 3]}
                gl={{ toneMappingExposure: exposure, antialias: true }}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

export const SceneV23_Apartment: React.FC = () => <HighResScene exposure={1.3}><VironButton_V23_RealHDRI /></HighResScene>;
export const SceneV23b_Studio: React.FC = () => <HighResScene exposure={1.5}><VironButton_V23b_Studio /></HighResScene>;
export const SceneV23c_City: React.FC = () => <HighResScene exposure={1.0}><VironButton_V23c_City /></HighResScene>;
export const SceneV23d_Lobby: React.FC = () => <HighResScene exposure={1.2}><VironButton_V23d_Lobby /></HighResScene>;
