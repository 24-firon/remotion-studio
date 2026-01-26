import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V6_Massive } from './VironButton_V6_Massive';
import { VironButton_V7_Sharp } from './VironButton_V7_Sharp';
import { VironButton_V8_City } from './VironButton_V8_City';
import { VironTerminal_Master } from './VironTerminal_Master';

const BaseScene: React.FC<{ children: React.ReactNode, glProps?: any }> = ({ children, glProps }) => (
    <AbsoluteFill style={{ background: '#000000' }}>
         {/* ABSOLUTE BLACK BACKGROUND */}
        <AbsoluteFill style={{ background: '#000000', opacity: 1 }} />
        
        <AbsoluteFill style={{ zIndex: 10 }}>
            <VironTerminal_Master />
        </AbsoluteFill>

        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 0, 10], fov: 32 }} // Slightly zoomed in base camera
                width={1920} 
                height={1080}
                dpr={[1, 2]} // FORCE HIGH DPI RENDERING
                {...glProps}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

export const SceneV6: React.FC = () => <BaseScene><VironButton_V6_Massive /></BaseScene>;
export const SceneV7: React.FC = () => <BaseScene glProps={{ toneMappingExposure: 1.2 }}><VironButton_V7_Sharp /></BaseScene>;
export const SceneV8: React.FC = () => <BaseScene><VironButton_V8_City /></BaseScene>;
