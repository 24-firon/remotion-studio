import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { 
    V41a_ArenaOval, 
    V41b_SharpStar, 
    V41c_MarbledHex, 
    V41d_TiltedRings, 
    V41e_DeepSpace 
} from './VironButton_V41_Variations';

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
                camera={{ position: [30, 40, 40], fov: 60 }} // High ISO View
                width={1920} height={1080}
                dpr={[1.5, 3]}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

// EXPORTS
export const SceneV41a_ArenaOval = () => <StandardScene><V41a_ArenaOval /></StandardScene>;
export const SceneV41a_ArenaOval_Debug = () => <DebugScene><V41a_ArenaOval debug={true} /></DebugScene>;

export const SceneV41b_SharpStar = () => <StandardScene><V41b_SharpStar /></StandardScene>;
export const SceneV41b_SharpStar_Debug = () => <DebugScene><V41b_SharpStar debug={true} /></DebugScene>;

export const SceneV41c_MarbledHex = () => <StandardScene><V41c_MarbledHex /></StandardScene>;
export const SceneV41c_MarbledHex_Debug = () => <DebugScene><V41c_MarbledHex debug={true} /></DebugScene>;

export const SceneV41d_TiltedRings = () => <StandardScene><V41d_TiltedRings /></StandardScene>;
export const SceneV41d_TiltedRings_Debug = () => <DebugScene><V41d_TiltedRings debug={true} /></DebugScene>;

export const SceneV41e_DeepSpace = () => <StandardScene><V41e_DeepSpace /></StandardScene>;
export const SceneV41e_DeepSpace_Debug = () => <DebugScene><V41e_DeepSpace debug={true} /></DebugScene>;
