import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';

/**
 * V37: OVAL WALLS (ORGANIC REFLECTIONS)
 * - Base: V36 (Tilted Room).
 * - Change: Replace Rectangular Walls with OVALS.
 * - Goal: "Keine geraden Striche". Curved, organic reflections.
 */
const OvalWalls: React.FC = () => {
    const wallColor = "#a0a0a0";
    const width = 50; 
    const height = 30; // Shorter but wider ovals? Or tall ovals?
    // User said "Große graue Ovale". Let's maximize them.
    
    return (
        <group>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <Lightformer 
                    key={i}
                    form="circle" // CIRCLE scaled -> OVAL
                    intensity={1.0}
                    color={wallColor}
                    scale={[width, height, 1]} // Oval shape
                    position={[
                        Math.sin(deg * Math.PI / 180) * 40,
                        0,
                        Math.cos(deg * Math.PI / 180) * 40
                    ]}
                    rotation={[0, (deg + 180) * Math.PI / 180, 0]}
                />
            ))}
        </group>
    );
};

export const VironButton_V37_OvalWalls: React.FC<{ debug?: boolean }> = ({ debug = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024} background={debug}>
                {/* 
                   KEEP THE TILT (User liked it in V36)
                   25deg X, 15deg Z
                */}
                <group rotation={[
                    THREE.MathUtils.degToRad(25), 
                    envRotationY, 
                    THREE.MathUtils.degToRad(15)
                ]}>
                    <OvalWalls />
                    
                    {/* Ceiling: Also Oval? */}
                    <Lightformer 
                        form="circle" intensity={1.0} color="#e0e0e0" scale={[50, 30, 1]} 
                        position={[0, 35, 0]} rotation={[Math.PI / 2, 0, 0]}
                    />

                    {/* Floor: Also Oval? */}
                    <Lightformer 
                        form="circle" intensity={0.5} color="#808080" scale={[50, 30, 1]} 
                        position={[0, -35, 0]} rotation={[-Math.PI / 2, 0, 0]}
                    />

                    {/* Highlight: Oval Spot */}
                    <Lightformer 
                        form="circle" intensity={3} color="white" scale={[20, 10, 1]} 
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
