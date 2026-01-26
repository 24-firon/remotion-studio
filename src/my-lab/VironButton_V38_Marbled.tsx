import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { Environment, Lightformer, Float } from '@react-three/drei';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';
import { random } from 'remotion';

/**
 * V38: MARBLED GRADIENT OVALS
 * - Base: V37 (Oval + Tilt)
 * - Upgrade: "Complex Gradients & Marbling"
 * - Method: Layered Lightformers + Noise field
 */

const GradientOval: React.FC<{ 
    position: [number, number, number]; 
    rotation: [number, number, number]; 
    scale: [number, number, number];
}> = ({ position, rotation, scale }) => {
    // We create a "concentric gradient" by stacking different sized ovals
    // Darkest at back (largest), Brightest at front (smallest)
    return (
        <group position={position} rotation={rotation}>
            {/* L1: The "Dark Anchor" - Large, soft, dark grey */}
            <Lightformer 
                form="circle" 
                intensity={0.5} 
                color="#404040" 
                scale={[scale[0] * 1.2, scale[1] * 1.2, 1]} 
                position={[0, 0, -0.2]} // Slightly behind
            />
            
            {/* L2: The "Mid Tone" - The main body */}
            <Lightformer 
                form="circle" 
                intensity={1.0} 
                color="#808080" 
                scale={[scale[0], scale[1], 1]} 
                position={[0, 0, 0]}
            />

            {/* L3: The "Soft Highlight" - Inner core */}
            <Lightformer 
                form="circle" 
                intensity={1.5} 
                color="#c0c0c0" 
                scale={[scale[0] * 0.6, scale[1] * 0.6, 1]} 
                position={[0, 0, 0.1]}
            />
             
             {/* L4: The "Hotspot" - Tiny pop */}
             <Lightformer 
                form="circle" 
                intensity={2.0} 
                color="#ffffff" 
                scale={[scale[0] * 0.3, scale[1] * 0.3, 1]} 
                position={[0, 0, 0.2]}
            />
        </group>
    );
};

const MarblingNoise: React.FC = () => {
    // Generate random floating patches to simulate "Texture" in the room
    const count = 10;
    const seed = 38; // Constant seed for stability
    
    return (
        <group>
            {Array.from({ length: count }).map((_, i) => {
                const r1 = random(seed + i) * 2 - 1; // -1 to 1
                const r2 = random(seed + i * 2) * 2 - 1;
                const r3 = random(seed + i * 3) * 2 - 1;
                
                return (
                    <Float key={i} speed={1} rotationIntensity={1} floatIntensity={2}>
                        <Lightformer 
                            form="circle"
                            intensity={0.4} // Low intensity "Cloud"
                            color={i % 2 === 0 ? "#707070" : "#909090"} // Varying greys
                            scale={[10 + Math.abs(r1) * 20, 5 + Math.abs(r2) * 10, 1]}
                            position={[r1 * 40, r2 * 40, r3 * 30]}
                            target={[0, 0, 0]}
                        />
                    </Float>
                );
            })}
        </group>
    );
};

const ComplexWalls: React.FC = () => {
    return (
        <group>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <GradientOval 
                    key={i}
                    scale={[50, 30, 1]}
                    position={[
                        Math.sin(deg * Math.PI / 180) * 45, // Slightly wider radius
                        0,
                        Math.cos(deg * Math.PI / 180) * 45
                    ]}
                    rotation={[0, (deg + 180) * Math.PI / 180, 0]}
                />
            ))}
        </group>
    );
};

export const VironButton_V38_Marbled: React.FC<{ debug?: boolean }> = ({ debug = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024} background={debug}>
                {/* TILTED GROUP (V36 Logic) + MARBLING (V38 Logic) */}
                <group rotation={[
                    THREE.MathUtils.degToRad(25), 
                    envRotationY, 
                    THREE.MathUtils.degToRad(15)
                ]}>
                    <ComplexWalls />
                    <MarblingNoise />

                    {/* Gradient Ceiling */}
                    <GradientOval 
                        scale={[60, 40, 1]} 
                        position={[0, 40, 0]} 
                        rotation={[Math.PI / 2, 0, 0]} 
                    />

                    {/* Gradient Floor */}
                    <GradientOval 
                        scale={[60, 40, 1]} 
                        position={[0, -40, 0]} 
                        rotation={[-Math.PI / 2, 0, 0]} 
                    />
                    
                    {/* Extra Gradient Highlight */}
                    <GradientOval 
                         scale={[20, 20, 1]}
                         position={[-20, 20, 20]}
                         rotation={[0, 0, 0]} // Ideally lookAt center
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
