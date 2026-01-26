import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { 
    V42a_LiquidGrey, 
    V42b_KineticStars, 
    V42c_SoftArena, 
    V42d_DriftingRings, 
    V42e_BrightTech 
} from './VironButton_V42_GoldenMean';

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
            <ThreeCanvas 
                camera={{ position: [30, 40, 40], fov: 60 }} 
                width={1920} height={1080}
                dpr={[1.5, 3]}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

export const SceneV42a_LiquidGrey = () => <StandardScene><V42a_LiquidGrey /></StandardScene>;
export const SceneV42a_LiquidGrey_Debug = () => <DebugScene><V42a_LiquidGrey debug={true} /></DebugScene>;

export const SceneV42b_KineticStars = () => <StandardScene><V42b_KineticStars /></StandardScene>;
export const SceneV42b_KineticStars_Debug = () => <DebugScene><V42b_KineticStars debug={true} /></DebugScene>;

export const SceneV42c_SoftArena = () => <StandardScene><V42c_SoftArena /></StandardScene>;
export const SceneV42c_SoftArena_Debug = () => <DebugScene><V42c_SoftArena debug={true} /></DebugScene>;

export const SceneV42d_DriftingRings = () => <StandardScene><V42d_DriftingRings /></StandardScene>;
export const SceneV42d_DriftingRings_Debug = () => <DebugScene><V42d_DriftingRings debug={true} /></DebugScene>;

export const SceneV42e_BrightTech = () => <StandardScene><V42e_BrightTech /></StandardScene>;
export const SceneV42e_BrightTech_Debug = () => <DebugScene><V42e_BrightTech debug={true} /></DebugScene>;
