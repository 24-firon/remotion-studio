import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V26_GreyStudio_Debug } from './VironButton_V26_GreyStudio_Debug';
import { VironTerminal_Master } from './VironTerminal_Master';

export const SceneV26_Debug: React.FC = () => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            {/* Camera zoomed out slightly to see more context */}
            <ThreeCanvas 
                camera={{ position: [0, 0, 15], fov: 50 }}
                width={1920} height={1080}
            >
                <VironButton_V26_GreyStudio_Debug />
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);
