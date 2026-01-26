import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_Master_V5 } from './VironButton_Master_V5';
import { VironTerminal_Master } from './VironTerminal_Master';

export const VironMaster_V5_Scene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000000' }}>
            {/* PURE BLACK - NO GRADIENT (As per "Hintergrund weg" request) */}
            <AbsoluteFill style={{
                background: '#000000',
                opacity: 1
            }} />

            <AbsoluteFill style={{ zIndex: 10 }}>
                <VironTerminal_Master />
            </AbsoluteFill>

            {/* VIRON 3D LAYER */}
            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas 
                    camera={{ position: [0, 0, 10], fov: 35 }} 
                    width={1920} 
                    height={1080}
                    gl={{ toneMappingExposure: 1.0 }}
                >
                    <VironButton_Master_V5 />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
