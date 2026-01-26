import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { VironButton_V35_RoomShapes } from './VironButton_V35_RoomShapes';
import { VironTerminal_Master } from './VironTerminal_Master';

const StandardScene: React.FC<{ children: React.ReactNode, exposure?: number }> = ({ children, exposure = 1.0 }) => (
    <AbsoluteFill style={{ background: '#000000' }}>
        <AbsoluteFill style={{ background: '#000000' }} />
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
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
        <AbsoluteFill style={{ zIndex: 10 }}><VironTerminal_Master /></AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 20 }}>
            <ThreeCanvas 
                camera={{ position: [0, 50, 0], fov: 60 }} // Top-Down View to see Room Shape
                width={1920} height={1080}
                dpr={[1.5, 3]}
            >
                {children}
            </ThreeCanvas>
        </AbsoluteFill>
    </AbsoluteFill>
);

// COMBINING STANDARD + DEBUG WRAPPERS
// We will export Pairs: SceneV35a_Hexagon AND SceneV35a_Hexagon_Debug

// HEXAGON
export const SceneV35a_Hexagon: React.FC = () => <StandardScene><VironButton_V35_RoomShapes shape="hexagon" debug={false}/></StandardScene>;
export const SceneV35a_Hexagon_Debug: React.FC = () => <DebugScene><VironButton_V35_RoomShapes shape="hexagon" debug={true}/></DebugScene>;

// TRIANGLE
export const SceneV35b_Triangle: React.FC = () => <StandardScene><VironButton_V35_RoomShapes shape="triangle" debug={false}/></StandardScene>;
export const SceneV35b_Triangle_Debug: React.FC = () => <DebugScene><VironButton_V35_RoomShapes shape="triangle" debug={true}/></DebugScene>;

// SQUARE
export const SceneV35c_Square: React.FC = () => <StandardScene><VironButton_V35_RoomShapes shape="square" debug={false}/></StandardScene>;
export const SceneV35c_Square_Debug: React.FC = () => <DebugScene><VironButton_V35_RoomShapes shape="square" debug={true}/></DebugScene>;

// STAR
export const SceneV35d_Star: React.FC = () => <StandardScene><VironButton_V35_RoomShapes shape="star" debug={false}/></StandardScene>;
export const SceneV35d_Star_Debug: React.FC = () => <DebugScene><VironButton_V35_RoomShapes shape="star" debug={true}/></DebugScene>;
