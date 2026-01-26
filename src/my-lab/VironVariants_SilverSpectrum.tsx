import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V17_WhiteRoom } from './VironButton_V17_WhiteRoom';
import { VironButton_V18_GreyStudio } from './VironButton_V18_GreyStudio';
import { VironButton_V19_ChromeBright } from './VironButton_V19_ChromeBright';
import { VironButton_V20_LiquidMirror } from './VironButton_V20_LiquidMirror';
import { VironButton_V21_PhysicalSilver } from './VironButton_V21_PhysicalSilver';
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
                dpr={[1.5, 3]} // FORCE ULTRA HIGH RES (Retina++)
                gl={{ 
                    toneMappingExposure: exposure,
                    antialias: true // Force MSAA
                }}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

export const SceneV17: React.FC = () => <HighResScene exposure={1.5}><VironButton_V17_WhiteRoom /></HighResScene>;
export const SceneV18: React.FC = () => <HighResScene exposure={1.2}><VironButton_V18_GreyStudio /></HighResScene>;
export const SceneV19: React.FC = () => <HighResScene exposure={2.0}><VironButton_V19_ChromeBright /></HighResScene>;
export const SceneV20: React.FC = () => <HighResScene exposure={1.0}><VironButton_V20_LiquidMirror /></HighResScene>;
export const SceneV21: React.FC = () => <HighResScene exposure={1.3}><VironButton_V21_PhysicalSilver /></HighResScene>;
