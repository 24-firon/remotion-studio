import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V10_LiquidPill } from './VironButton_V10_LiquidPill';
import { VironTerminal_Master } from './VironTerminal_Master';

export const SceneV10: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000000' }}>
            {/* PURE BLACK VOID */}
            <AbsoluteFill style={{ background: '#000000', opacity: 1 }} />
            
            <AbsoluteFill style={{ zIndex: 10 }}>
                <VironTerminal_Master />
            </AbsoluteFill>

            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas 
                    camera={{ position: [0, 0, 10], fov: 32 }}
                    width={1920} 
                    height={1080}
                    dpr={[1, 2]} // High Res
                >
                    <VironButton_V10_LiquidPill />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
