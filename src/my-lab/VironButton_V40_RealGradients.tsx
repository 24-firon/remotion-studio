import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V40: REAL GRADIENTS (THE SHADER REVOLUTION)
 * - User Requirement: "Keine Flächen mehr stapeln. Echte Farbverläufe."
 * - Solution: Custom GLSL Shader Material applied to meshes inside Environment.
 * - Shapes: Star, Oval, Triangle (Chaos Mix from V39).
 * - Clean Slate: NO TERMINAL.
 */

// 1. Define the Gradient Shader Material
const GradientMaterial = shaderMaterial(
  {
    colorStart: new THREE.Color('#000000'),
    colorMid: new THREE.Color('#808080'),
    colorEnd: new THREE.Color('#ffffff'),
    angle: 0, // Rotation of gradient in radians
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (The Magic: 3-Stop Gradient)
  `
    uniform vec3 colorStart;
    uniform vec3 colorMid;
    uniform vec3 colorEnd;
    uniform float angle;
    varying vec2 vUv;

    void main() {
      // Rotate UVs based on angle
      float cosAngle = cos(angle);
      float sinAngle = sin(angle);
      vec2 center = vec2(0.5, 0.5);
      vec2 rotatedUv = vec2(
        cosAngle * (vUv.x - center.x) - sinAngle * (vUv.y - center.y) + center.x,
        sinAngle * (vUv.x - center.x) + cosAngle * (vUv.y - center.y) + center.y
      );

      // Gradient Logic: Start -> Mid -> End
      // We use the Y axis of the rotated UV for vertical gradient feeling
      float t = rotatedUv.y; 
      
      vec3 color;
      if (t < 0.5) {
        // Mix Start to Mid
        color = mix(colorStart, colorMid, t * 2.0);
      } else {
        // Mix Mid to End
        color = mix(colorMid, colorEnd, (t - 0.5) * 2.0);
      }

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ GradientMaterial });

// Type definitions for TS
declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientMaterial: any;
    }
  }
}

// 2. The Gradient Wall Component
interface GradientWallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
  shape: 'circle' | 'rect' | 'triangle' | 'star';
  colors: [string, string, string]; // Start, Mid, End
  angle?: number;
}

const GradientWall: React.FC<GradientWallProps> = ({ 
  position, rotation = [0,0,0], scale, shape, colors, angle = 0 
}) => {
  const geometry = useMemo(() => {
    if (shape === 'circle') return new THREE.CircleGeometry(1, 64);
    if (shape === 'triangle') return new THREE.CircleGeometry(1, 3);
    if (shape === 'rect') return new THREE.PlaneGeometry(2, 2);
    if (shape === 'star') {
        const starShape = new THREE.Shape();
        const outerRadius = 1;
        const innerRadius = 0.5;
        const numPoints = 6;
        for(let i = 0; i < numPoints * 2; i++){
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const a = (i / (numPoints * 2)) * Math.PI * 2;
            if(i===0) starShape.moveTo(Math.cos(a)*r, Math.sin(a)*r);
            else starShape.lineTo(Math.cos(a)*r, Math.sin(a)*r);
        }
        return new THREE.ShapeGeometry(starShape);
    }
    return new THREE.PlaneGeometry(1, 1);
  }, [shape]);

  return (
    <mesh position={position} rotation={rotation} scale={scale} geometry={geometry}>
      {/* Apply our Custom Shader */}
      <gradientMaterial 
        attach="material" 
        colorStart={new THREE.Color(colors[0])}
        colorMid={new THREE.Color(colors[1])}
        colorEnd={new THREE.Color(colors[2])}
        angle={angle}
        toneMapped={false} // HDR ready
      />
    </mesh>
  );
};

export const VironButton_V40_RealGradients: React.FC<{ debug?: boolean }> = ({ debug = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame: frame - CONSTANTS.IMPACT_FRAME, fps, config: { damping: 40, stiffness: 90, mass: 2.0 } });
    const scale = interpolate(entrance, [0, 1], [0, 1]);
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group scale={scale}>
            <Environment resolution={1024} background={debug}>
                {/* 
                   CHAOS MIX with REAL GRADIENTS
                   Rotation: Tilted (User liked V36/39)
                */}
                <group rotation={[
                    THREE.MathUtils.degToRad(15), 
                    envRotationY, 
                    THREE.MathUtils.degToRad(10)
                ]}>

                    {/* 1. SOFT OVAL (Left) 
                        Gradient: Black -> Dark Grey -> White
                        Creates: Deep contrast on the side
                    */}
                    <GradientWall 
                        shape="circle"
                        scale={[50, 30, 1]}
                        position={[-40, 0, 10]}
                        rotation={[0, Math.PI / 4, 0]}
                        colors={['#000000', '#404040', '#ffffff']}
                        angle={Math.PI / 2} // Vertical Gradient
                    />

                    {/* 2. SHARP STAR (Right)
                        Gradient: Warm Gold -> White -> Warm Gold
                        Creates: Shimmering gold highlight
                    */}
                    <GradientWall 
                        shape="star"
                        scale={[20, 20, 1]}
                        position={[40, 20, 10]}
                        rotation={[0, -Math.PI / 4, 0]}
                        colors={['#806040', '#ffffff', '#806040']}
                        angle={0}
                    />

                    {/* 3. TRIANGLE CUT (Bottom)
                        Gradient: Dark Blue -> Mid Grey -> Black
                        Creates: Cold tech reflection at bottom
                    */}
                    <GradientWall 
                        shape="triangle"
                        scale={[30, 30, 1]}
                        position={[0, -30, 20]}
                        rotation={[-Math.PI / 6, 0, 0]}
                        colors={['#001020', '#405060', '#000000']}
                        angle={Math.PI}
                    />

                    {/* 4. CEILING (Top)
                        Gradient: Soft Grey Fade
                    */}
                     <GradientWall 
                        shape="rect"
                        scale={[60, 60, 1]}
                        position={[0, 40, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                        colors={['#ffffff', '#a0a0a0', '#404040']}
                        angle={0}
                    />

                    {/* 5. TEXTURE WALL (Placeholder for Image - Gradient for now) */}
                    <GradientWall
                         shape="rect"
                         scale={[40, 20, 1]}
                         position={[0, 0, -40]} // Behind
                         colors={['#101010', '#303030', '#101010']}
                         angle={Math.PI / 4}
                    />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.10} 
                    envMapIntensity={1.5}
                    clearcoat={1.0}
                />
            </mesh>
        </group>
    );
};
