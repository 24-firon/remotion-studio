import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Lightformer, Float } from '@react-three/drei';
import * as THREE from 'three';
import { CONSTANTS } from '../constants';
import { random } from 'remotion';

/**
 * V39: CHAOS THEORY (MIX & MATCH)
 * - Goal: "Realism through Imperfection".
 * - Method: 
 *   1. Mix Shapes (Oval, Star, Triangle) in one room.
 *   2. Asymmetric placement.
 *   3. READY FOR IMAGES: Prepared 'TextureWall' prop.
 */

// A Wall that can display a Custom Image (if provided)
// User asked: "Wenn ich dir ein Bild gebe..." -> YES.
// Usage: <TextureWall image="/path/to/image.png" position={[...]} />
const TextureWall: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0,0,0] }) => {
    // Placeholder logic for now since we don't have the image file yet.
    // In THREE.js environment, we'd load a texture map here.
    // For now, we simulate a "Complex Gradient Image" using a clustered group.
    return (
        <group position={position} rotation={rotation}>
             {/* Simulating a complex image projection with random colored patches */}
             <Lightformer form="rect" intensity={1} color="#505050" scale={[30, 20, 1]} />
             <Lightformer form="circle" intensity={2} color="#808080" scale={[10, 10, 1]} position={[-5, 5, 1]} />
             <Lightformer form="ring" intensity={3} color="#ffffff" scale={[5, 15, 1]} position={[8, -2, 1]} />
        </group>
    );
};

// SHAPE 1: THE SOFT OVAL (Base Reflection)
const SoftOvalInfo: React.FC = () => (
    <group position={[-30, 0, 30]} rotation={[0, Math.PI / 4, 0]}>
        <Lightformer form="circle" intensity={1} color="#a0a0a0" scale={[50, 30, 1]} />
        <Lightformer form="circle" intensity={2} color="#d0d0d0" scale={[20, 10, 1]} position={[0,0,1]} />
    </group>
);

// SHAPE 2: THE SHARP STAR (Sparkle/Glint)
const SharpStarHighlight: React.FC = () => (
    <group position={[20, 15, 20]} lookAt={new THREE.Vector3(0,0,0)}>
         {/* Constructing a Star */}
         <Lightformer form="rect" intensity={4} color="#fff0d0" scale={[25, 2, 1]} />
         <Lightformer form="rect" intensity={4} color="#fff0d0" scale={[2, 25, 1]} />
         <Lightformer form="rect" intensity={2} color="#fff0d0" scale={[15, 2, 1]} rotation={[0,0,Math.PI/4]} />
         <Lightformer form="rect" intensity={2} color="#fff0d0" scale={[2, 15, 1]} rotation={[0,0,Math.PI/4]} />
    </group>
);

// SHAPE 3: THE TRIANGLE (Aggressive Cut)
const TriangleCut: React.FC = () => (
    <group position={[0, -20, 40]} rotation={[-Math.PI / 6, 0, 0]}>
        {/* A Triangle made of 3 rects */}
        <Lightformer form="rect" intensity={0.8} color="#606060" scale={[40, 5, 1]} position={[0, -10, 0]} />
        <Lightformer form="rect" intensity={0.8} color="#606060" scale={[30, 5, 1]} rotation={[0,0,Math.PI/3]} position={[-10, 5, 0]} />
        <Lightformer form="rect" intensity={0.8} color="#606060" scale={[30, 5, 1]} rotation={[0,0,-Math.PI/3]} position={[10, 5, 0]} />
    </group>
);

export const VironButton_V39_Chaos: React.FC<{ debug?: boolean }> = ({ debug = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024} background={debug}>
                {/* 
                    CHAOS MIX
                    We rotate the whole room slightly (Tilt) but keep the individual 
                    elements asymmetric.
                */}
                <group rotation={[
                    THREE.MathUtils.degToRad(10), 
                    envRotationY, 
                    THREE.MathUtils.degToRad(5)
                ]}>
                    <SoftOvalInfo />
                    <SharpStarHighlight />
                    <TriangleCut />
                    
                    {/* "Texture Wall" Placeholder - ready for an image */}
                    <TextureWall position={[40, 0, -10]} rotation={[0, -Math.PI/2, 0]} />

                    {/* Ceiling Gradient */}
                    <Lightformer form="circle" intensity={1.5} color="#e0e0e0" scale={[50, 50, 1]} position={[0, 40, 0]} rotation={[Math.PI/2, 0, 0]} />
                    
                    {/* Floor Gradient */}
                    <Lightformer form="ring" intensity={0.5} color="#505050" scale={[60, 60, 1]} position={[0, -30, 0]} rotation={[-Math.PI/2, 0, 0]} />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.10} // Sharper to see the shapes
                    envMapIntensity={1.3}
                    clearcoat={1.0}
                />
            </mesh>
        </group>
    );
};
