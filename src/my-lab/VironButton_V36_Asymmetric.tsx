import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';

/**
 * V36: ASYMMETRIC & TILTED HEXAGON ROOM
 * - Base: V35a (Hexagon) - User approved this "Silver Look".
 * - Fix: "Too Symmetrical" -> We tilt the room on X/Z axes.
 */
const HexagonWalls: React.FC = () => {
    const wallColor = "#a0a0a0";
    const height = 60;
    const distance = 40;
    
    return (
        <group>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <Lightformer 
                    key={i}
                    form="rect"
                    intensity={1.0}
                    color={wallColor}
                    scale={[distance, height, 1]}
                    position={[
                        Math.sin(deg * Math.PI / 180) * distance,
                        0,
                        Math.cos(deg * Math.PI / 180) * distance
                    ]}
                    rotation={[0, (deg + 180) * Math.PI / 180, 0]}
                    // Force the lookAt to keep them properly oriented even when group tilts
                />
            ))}
        </group>
    );
};

export const VironButton_V36a_Tilted: React.FC<{ debug?: boolean }> = ({ debug = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    
    // Animation: Still rotate Y (spin), but the room itself is TILTED
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024} background={debug}>
                {/* 
                   THE TILT MAGIC:
                   Rotation X = 25 degrees (Tips room forward)
                   Rotation Z = 15 degrees (Tips room sideways)
                   This makes the "horizon" line diagonal across the button.
                */}
                <group rotation={[
                    THREE.MathUtils.degToRad(25), 
                    envRotationY, 
                    THREE.MathUtils.degToRad(15)
                ]}>
                    <HexagonWalls />
                    
                    {/* Ceiling needs to move with the room */}
                    <Lightformer 
                        form="rect" intensity={1.0} color="#e0e0e0" scale={[50, 50, 1]} 
                        position={[0, 35, 0]} rotation={[Math.PI / 2, 0, 0]}
                    />

                    {/* Floor needs to move with the room */}
                    <Lightformer 
                        form="rect" intensity={0.5} color="#808080" scale={[50, 50, 1]} 
                        position={[0, -35, 0]} rotation={[-Math.PI / 2, 0, 0]}
                    />

                    {/* Highlight needs to move with the room (or stay fixed? moving with room keeps it consistent) */}
                    <Lightformer 
                        form="circle" intensity={3} color="white" scale={[15, 15, 1]} 
                        position={[-20, 20, 20]} target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.12}
                    envMapIntensity={1.5}
                    clearcoat={1.0}
                />
            </mesh>
        </group>
    );
};

export const VironButton_V36b_ExtremeTilt: React.FC<{ debug?: boolean }> = ({ debug = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024} background={debug}>
                {/* 
                   EXTREME DIAGONAL: 45 degrees
                */}
                <group rotation={[
                    THREE.MathUtils.degToRad(45), 
                    envRotationY, 
                    THREE.MathUtils.degToRad(45)
                ]}>
                    <HexagonWalls />
                    <Lightformer form="rect" intensity={1.0} color="#e0e0e0" scale={[50, 50, 1]} position={[0, 35, 0]} rotation={[Math.PI / 2, 0, 0]} />
                    <Lightformer form="rect" intensity={0.5} color="#808080" scale={[50, 50, 1]} position={[0, -35, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <Lightformer form="circle" intensity={3} color="white" scale={[15, 15, 1]} position={[-20, 20, 20]} target={[0, 0, 0]} />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.12}
                    envMapIntensity={1.5}
                    clearcoat={1.0}
                />
            </mesh>
        </group>
    );
};
