import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V9_ZeroFrame } from './VironButton_V9_ZeroFrame';
import { VironTerminal_Master } from './VironTerminal_Master';

export const SceneV9: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000000' }}>
            <AbsoluteFill style={{ background: '#000000', opacity: 1 }} />
            
            <AbsoluteFill style={{ zIndex: 10 }}>
                {/* 
                   TERMINAL FIX: Passing a prop (conceptually) or just trusting alignment.
                   VironTerminal_Master is 1200px wide. V9 Button is wide enough to cover visual gaps.
                */}
                <VironTerminal_Master />
            </AbsoluteFill>

            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas 
                    camera={{ position: [0, 0, 10], fov: 32 }}
                    width={1920} 
                    height={1080}
                    dpr={[1, 2]}
                >
                    <VironButton_V9_ZeroFrame />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
