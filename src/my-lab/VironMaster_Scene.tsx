import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_Master } from './VironButton_Master';
import { VironTerminal_Master } from './VironTerminal_Master';

export const VironMaster_Scene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000000' }}>
            <AbsoluteFill style={{
                background: `radial-gradient(circle at 50% 50%, #18181b 0%, #000000 100%)`,
                opacity: 1
            }} />

            <AbsoluteFill style={{ zIndex: 10 }}>
                <VironTerminal_Master />
            </AbsoluteFill>

            {/* 
                VIRON 3D LAYER
                - FOV 35 for cinematic compression
                - ToneMapping: ACESFilmic for realistic metal falloff
            */}
            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas 
                    camera={{ position: [0, 0, 10], fov: 35 }} 
                    width={1920} 
                    height={1080}
                    gl={{ toneMappingExposure: 0.9 }}
                >
                    <VironButton_Master />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
