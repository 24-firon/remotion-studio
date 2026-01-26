import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';

type RoomShape = 'cylinder' | 'hexagon' | 'triangle' | 'star' | 'square';

const RoomWalls: React.FC<{ shape: RoomShape }> = ({ shape }) => {
    // Common Wall Props: Mid-Grey for that "80% Grey" look
    const wallColor = "#a0a0a0";
    const wallIntensity = 1.0;
    const height = 60;
    const distance = 40;

    if (shape === 'cylinder') {
        // A seamless ring (Cylinder)
        return (
            <Lightformer 
                form="ring" 
                intensity={wallIntensity} 
                color={wallColor} 
                scale={[100, 100, 1]} 
                position={[0, 0, 0]} 
                target={[0, 0, 0]} 
            />
        );
    }

    if (shape === 'square') {
        return (
            <group>
                {[0, 90, 180, 270].map((deg, i) => (
                    <Lightformer 
                        key={i}
                        form="rect"
                        intensity={wallIntensity}
                        color={wallColor}
                        scale={[distance * 2, height, 1]}
                        position={[
                            Math.sin(deg * Math.PI / 180) * distance,
                            0,
                            Math.cos(deg * Math.PI / 180) * distance
                        ]}
                        rotation={[0, deg * Math.PI / 180, 0]}
                    />
                ))}
            </group>
        );
    }

    if (shape === 'triangle') {
        return (
            <group>
                {[0, 120, 240].map((deg, i) => (
                    <Lightformer 
                        key={i}
                        form="rect"
                        intensity={wallIntensity}
                        color={wallColor}
                        scale={[distance * 3, height, 1]} // Wider walls for triangle
                        position={[
                            Math.sin(deg * Math.PI / 180) * distance,
                            0,
                            Math.cos(deg * Math.PI / 180) * distance
                        ]}
                        rotation={[0, (deg + 180) * Math.PI / 180, 0]} // Facing inward
                    />
                ))}
            </group>
        );
    }

    if (shape === 'hexagon') {
        return (
            <group>
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <Lightformer 
                        key={i}
                        form="rect"
                        intensity={wallIntensity}
                        color={wallColor}
                        scale={[distance, height, 1]}
                        position={[
                            Math.sin(deg * Math.PI / 180) * distance,
                            0,
                            Math.cos(deg * Math.PI / 180) * distance
                        ]}
                        rotation={[0, (deg + 180) * Math.PI / 180, 0]}
                    />
                ))}
            </group>
        );
    }

    if (shape === 'star') {
        // Star is tricky: We need inward facing V-walls
        // Simplifying to 5 points (Pentagram style)
        const outerDist = 40;
        const innerDist = 20;
        // This is a complex shape to approximate with planes, 
        // using 10 small walls
        return (
             <group>
                {Array.from({ length: 10 }).map((_, i) => {
                    const angle = (i * 36) * Math.PI / 180;
                    const isOuter = i % 2 === 0;
                    const r = isOuter ? outerDist : innerDist;
                    return (
                        <Lightformer 
                            key={i}
                            form="rect"
                            intensity={wallIntensity}
                            color={wallColor}
                            scale={[15, height, 1]}
                            position={[Math.sin(angle) * r, 0, Math.cos(angle) * r]}
                            lookAt={new THREE.Vector3(0,0,0)} // Always face center
                        />
                    );
                })}
             </group>
        );
    }

    return null;
};

export const VironButton_V35_RoomShapes: React.FC<{ shape: RoomShape; debug?: boolean }> = ({ shape, debug = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024} background={debug}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* 1. THE WALLS (The Room Shape) */}
                    <RoomWalls shape={shape} />

                    {/* 2. THE CEILING (Soft Top Light) */}
                    <Lightformer 
                        form="rect" 
                        intensity={1.0} 
                        color="#e0e0e0" 
                        scale={[50, 50, 1]} 
                        position={[0, 35, 0]} 
                        rotation={[Math.PI / 2, 0, 0]}
                    />

                    {/* 3. THE FLOOR (Grounding) */}
                    <Lightformer 
                        form="rect" 
                        intensity={0.5} 
                        color="#808080" 
                        scale={[50, 50, 1]} 
                        position={[0, -35, 0]} 
                        rotation={[-Math.PI / 2, 0, 0]}
                    />

                    {/* 4. THE HIGHLIGHT (A simple Softbox) */}
                    <Lightformer 
                        form="circle" 
                        intensity={3} 
                        color="white" 
                        scale={[15, 15, 1]} 
                        position={[-20, 20, 20]} 
                        target={[0, 0, 0]}
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
