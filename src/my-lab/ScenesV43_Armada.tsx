import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { 
    V43_01_Stripes_Horizontal,
    V43_02_Stripes_Vertical,
    V43_05_Turbine_Ovals,
    V43_09_Bright_Soft,
    V43_11_Noise_Heavy,
    V43_03_Stripes_Spiral
} from './VironButton_V43_Armada';

const StandardScene: React.FC<{ children: React.ReactNode, exposure?: number }> = ({ children, exposure = 1.0 }) => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 0, 10], fov: 32 }}
                width={1920} height={1080}
                dpr={[1.5, 3]}
                gl={{ toneMappingExposure: exposure, antialias: true }}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

const DebugScene: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 20 }}>
            {/* High ISO Top-Down View */}
            <ThreeCanvas camera={{ position: [30, 40, 40], fov: 60 }} width={1920} height={1080} dpr={[1.5, 3]}>
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

// EXPORTS
export const SceneV43_01 = () => <StandardScene><V43_01_Stripes_Horizontal /></StandardScene>;
export const SceneV43_01_Debug = () => <DebugScene><V43_01_Stripes_Horizontal debug={true} /></DebugScene>;

export const SceneV43_02 = () => <StandardScene><V43_02_Stripes_Vertical /></StandardScene>;
export const SceneV43_02_Debug = () => <DebugScene><V43_02_Stripes_Vertical debug={true} /></DebugScene>;

export const SceneV43_03 = () => <StandardScene><V43_03_Stripes_Spiral /></StandardScene>;
export const SceneV43_03_Debug = () => <DebugScene><V43_03_Stripes_Spiral debug={true} /></DebugScene>;

export const SceneV43_05 = () => <StandardScene><V43_05_Turbine_Ovals /></StandardScene>;
export const SceneV43_05_Debug = () => <DebugScene><V43_05_Turbine_Ovals debug={true} /></DebugScene>;

export const SceneV43_09 = () => <StandardScene><V43_09_Bright_Soft /></StandardScene>;
export const SceneV43_09_Debug = () => <DebugScene><V43_09_Bright_Soft debug={true} /></DebugScene>;

export const SceneV43_11 = () => <StandardScene><V43_11_Noise_Heavy /></StandardScene>;
export const SceneV43_11_Debug = () => <DebugScene><V43_11_Noise_Heavy debug={true} /></DebugScene>;
