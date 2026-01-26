import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_Master_V4 } from './VironButton_Master_V4';
import { VironTerminal_Master } from './VironTerminal_Master';

export const VironMaster_V4_Scene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#000000' }}>
            {/* Deep Cinematic Background - Static (Does not spin) */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at 50% 50%, #1c1917 0%, #000000 100%)`, // Warm-Zinc dark
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
                    gl={{ toneMappingExposure: 0.9 }}
                >
                    <VironButton_Master_V4 />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
