import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { 
    VironButton_V29a_Sunset, 
    VironButton_V29b_Night, 
    VironButton_V29c_Warehouse, 
    VironButton_V29d_Forest 
} from './VironButton_V29_Thematic';
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

export const SceneV29a_Sunset: React.FC = () => <HighResScene exposure={1.2}><VironButton_V29a_Sunset /></HighResScene>;
export const SceneV29b_Night: React.FC = () => <HighResScene exposure={1.5}><VironButton_V29b_Night /></HighResScene>;
export const SceneV29c_Warehouse: React.FC = () => <HighResScene exposure={1.2}><VironButton_V29c_Warehouse /></HighResScene>;
export const SceneV29d_Forest: React.FC = () => <HighResScene exposure={1.2}><VironButton_V29d_Forest /></HighResScene>;
