import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V33_ColorGradient } from './VironButton_V33_ColorGradient';
import { VironTerminal_Master } from './VironTerminal_Master';

// STANDARD VIEW (Product Shot)
export const SceneV33: React.FC = () => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 0, 10], fov: 32 }}
                width={1920} height={1080}
                dpr={[1.5, 3]}
                gl={{ toneMappingExposure: 1.2, antialias: true }}
            >
                <VironButton_V33_ColorGradient debug={false} />
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

// DEBUG VIEW (See the Room)
export const SceneV33_Debug: React.FC = () => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 0, 25], fov: 50 }} // Zoomed out to see the environment
                width={1920} height={1080}
                dpr={[1.5, 3]}
                gl={{ toneMappingExposure: 1.0, antialias: true }}
            >
                {/* Visualizing the "Cloud" */}
                <VironButton_V33_ColorGradient debug={true} />
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);
