import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { 
    V44_01_Stripes_Horizontal,
    V44_02_Stripes_Vertical,
    V44_05_Turbine_Ovals,
    V44_09_Bright_Soft,
    V44_11_Noise_Heavy,
    V44_03_Stripes_Spiral
} from './VironButton_V44_RefinedArmada';

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
            <ThreeCanvas camera={{ position: [30, 40, 40], fov: 60 }} width={1920} height={1080} dpr={[1.5, 3]}>
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

// EXPORTS
export const SceneV44_01 = () => <StandardScene><V44_01_Stripes_Horizontal /></StandardScene>;
export const SceneV44_01_Debug = () => <DebugScene><V44_01_Stripes_Horizontal debug={true} /></DebugScene>;

export const SceneV44_02 = () => <StandardScene><V44_02_Stripes_Vertical /></StandardScene>;
export const SceneV44_02_Debug = () => <DebugScene><V44_02_Stripes_Vertical debug={true} /></DebugScene>;

export const SceneV44_03 = () => <StandardScene><V44_03_Stripes_Spiral /></StandardScene>;
export const SceneV44_03_Debug = () => <DebugScene><V44_03_Stripes_Spiral debug={true} /></DebugScene>;

export const SceneV44_05 = () => <StandardScene><V44_05_Turbine_Ovals /></StandardScene>;
export const SceneV44_05_Debug = () => <DebugScene><V44_05_Turbine_Ovals debug={true} /></DebugScene>;

export const SceneV44_09 = () => <StandardScene><V44_09_Bright_Soft /></StandardScene>;
export const SceneV44_09_Debug = () => <DebugScene><V44_09_Bright_Soft debug={true} /></DebugScene>;

export const SceneV44_11 = () => <StandardScene><V44_11_Noise_Heavy /></StandardScene>;
export const SceneV44_11_Debug = () => <DebugScene><V44_11_Noise_Heavy debug={true} /></DebugScene>;
