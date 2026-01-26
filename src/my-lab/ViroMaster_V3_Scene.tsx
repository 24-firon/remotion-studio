import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';
import { ViroMaster_V3_Button } from './ViroMaster_V3_Button';
import { ViroTerminal_Ultra } from './ViroTerminal_Ultra';

export const ViroMaster_V3_Scene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#020617' }}>
            <AbsoluteFill style={{
                background: `radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)`,
                opacity: 1
            }} />

            <AbsoluteFill style={{ zIndex: 10 }}>
                <ViroTerminal_Ultra />
            </AbsoluteFill>

            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas camera={{ position: [0, 0, 10], fov: 30 }} width={1920} height={1080}>
                    <Environment preset="studio" />
                    <ViroMaster_V3_Button />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
