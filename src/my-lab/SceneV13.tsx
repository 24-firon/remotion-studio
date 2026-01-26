import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V13_Capsule } from './VironButton_V13_Capsule';
import { VironTerminal_Master } from './VironTerminal_Master';

export const SceneV13: React.FC = () => {
    return (
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
                    dpr={[1, 2]}
                >
                    {/* Enable Shadows for the moving light */}
                    <VironButton_V13_Capsule />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
