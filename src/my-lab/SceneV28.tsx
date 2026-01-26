import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V28_V7_Restored } from './VironButton_V28_V7_Restored';
import { VironTerminal_Master } from './VironTerminal_Master';

export const SceneV28: React.FC = () => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            {/* Using the same high-res settings as V27 */}
            <ThreeCanvas 
                camera={{ position: [0, 0, 10], fov: 32 }}
                width={1920} height={1080}
                dpr={[1.5, 3]}
                gl={{ toneMappingExposure: 1.3, antialias: true }}
            >
                <VironButton_V28_V7_Restored />
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);
