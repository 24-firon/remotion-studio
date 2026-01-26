import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import { random } from 'remotion';

// --- THE V40 GRADIENT SHADER (REUSED) ---
const GradientMaterial = shaderMaterial(
  {
    colorStart: new THREE.Color('#000000'),
    colorMid: new THREE.Color('#808080'),
    colorEnd: new THREE.Color('#ffffff'),
    angle: 0,
    noiseScale: 0.0, // Added Noise Factor for "Marbling"
  },
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform vec3 colorStart;
    uniform vec3 colorMid;
    uniform vec3 colorEnd;
    uniform float angle;
    uniform float noiseScale;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Simple Pseudo-Random Noise
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      // Rotation
      float cosAngle = cos(angle);
      float sinAngle = sin(angle);
      vec2 center = vec2(0.5, 0.5);
      vec2 rotatedUv = vec2(
        cosAngle * (vUv.x - center.x) - sinAngle * (vUv.y - center.y) + center.x,
        sinAngle * (vUv.x - center.x) + cosAngle * (vUv.y - center.y) + center.y
      );

      float t = rotatedUv.y;
      
      // Add Noise/Marbling if requested
      if (noiseScale > 0.0) {
          float n = rand(vUv * 10.0 + vPosition.xy) * noiseScale;
          t += (n - noiseScale * 0.5); // Shift t slightly by noise
      }

      vec3 color;
      if (t < 0.5) {
        color = mix(colorStart, colorMid, t * 2.0);
      } else {
        color = mix(colorMid, colorEnd, (t - 0.5) * 2.0);
      }

      gl_FragColor = vec4(color, 1.0);
    }
  `
);
extend({ GradientMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientMaterial: any;
    }
  }
}

// --- SHARED WALL COMPONENT ---
interface WallProps {
  shape: 'circle' | 'rect' | 'triangle' | 'star';
  scale: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  colors: [string, string, string];
  angle?: number;
  noise?: number;
}
const Wall: React.FC<WallProps> = ({ shape, scale, position, rotation, colors, angle=0, noise=0 }) => {
    const geometry = useMemo(() => {
        if (shape === 'circle') return new THREE.CircleGeometry(1, 64);
        if (shape === 'triangle') return new THREE.CircleGeometry(1, 3);
        if (shape === 'rect') return new THREE.PlaneGeometry(2, 2);
        if (shape === 'star') {
            const shape = new THREE.Shape();
            const outer = 1, inner = 0.4;
            for(let i=0; i<10; i++) {
                const r = i%2===0?outer:inner; 
                const a=i/10*Math.PI*2; 
                if(i===0) shape.moveTo(Math.cos(a)*r, Math.sin(a)*r);
                else shape.lineTo(Math.cos(a)*r, Math.sin(a)*r);
            }
            return new THREE.ShapeGeometry(shape);
        }
        return new THREE.PlaneGeometry(1,1);
    }, [shape]);

    return (
        <mesh geometry={geometry} scale={scale} position={position} rotation={rotation}>
            <gradientMaterial 
                attach="material"
                colorStart={new THREE.Color(colors[0])}
                colorMid={new THREE.Color(colors[1])}
                colorEnd={new THREE.Color(colors[2])}
                angle={angle}
                noiseScale={noise}
                toneMapped={false}
            />
        </mesh>
    );
};

// --- BASE SCENE SETUP ---
const BaseButton: React.FC = () => (
    <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
        <meshPhysicalMaterial color="#ffffff" metalness={1.0} roughness={0.10} envMapIntensity={1.5} clearcoat={1.0} />
    </mesh>
);

// --- VARIATION 1: ARENA OVAL (Safe, Smooth, Connected) ---
export const V41a_ArenaOval: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI / 4]); // Slow drift
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[THREE.MathUtils.degToRad(15), envRotationY, THREE.MathUtils.degToRad(5)]}>
                    {/* 3 Large Ovals forming an arena */}
                    <Wall shape="circle" scale={[40, 30, 1]} position={[-35, 0, 10]} rotation={[0, Math.PI/3, 0]} colors={['#101010', '#606060', '#e0e0e0']} angle={Math.PI/2} />
                    <Wall shape="circle" scale={[40, 30, 1]} position={[35, 0, 10]} rotation={[0, -Math.PI/3, 0]} colors={['#e0e0e0', '#606060', '#101010']} angle={Math.PI/2} />
                    <Wall shape="circle" scale={[40, 30, 1]} position={[0, 0, -30]} rotation={[0, 0, 0]} colors={['#202020', '#505050', '#202020']} angle={0} />
                    {/* Ceiling/Floor */}
                    <Wall shape="rect" scale={[60, 60, 1]} position={[0, 40, 0]} rotation={[Math.PI/2, 0, 0]} colors={['#ffffff', '#a0a0a0', '#202020']} />
                    <Wall shape="rect" scale={[60, 60, 1]} position={[0, -40, 0]} rotation={[-Math.PI/2, 0, 0]} colors={['#000000', '#303030', '#000000']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};

// --- VARIATION 2: SHARP STAR (Aggressive, Gold, Tilted) ---
export const V41b_SharpStar: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[THREE.MathUtils.degToRad(35), envRotationY, THREE.MathUtils.degToRad(35)]}>
                    {/* Sharp distinct stars */}
                    <Wall shape="star" scale={[25, 25, 1]} position={[-30, 20, 20]} rotation={[0, Math.PI/4, 0]} colors={['#805000', '#ffffff', '#805000']} angle={0} />
                    <Wall shape="triangle" scale={[30, 30, 1]} position={[30, -10, 20]} rotation={[0, -Math.PI/4, Math.PI]} colors={['#002040', '#80a0ff', '#002040']} angle={Math.PI/2} />
                    <Wall shape="rect" scale={[5, 60, 1]} position={[0, 0, -20]} rotation={[0, 0, Math.PI/4]} colors={['#ffffff', '#ffffff', '#ffffff']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};

// --- VARIATION 3: MARBLED HEX (Complex Texture, Noise) ---
export const V41c_MarbledHex: React.FC<{ debug?: boolean }> = ({ debug }) => {
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group>
                    {/* Hexagon Layout with NOISE enabled */}
                    {[0,60,120,180,240,300].map((deg, i) => (
                        <Wall 
                            key={i}
                            shape="rect" 
                            scale={[45, 60, 1]} 
                            position={[Math.sin(deg*Math.PI/180)*40, 0, Math.cos(deg*Math.PI/180)*40]} 
                            rotation={[0, (deg+180)*Math.PI/180, 0]} 
                            colors={i%2===0 ? ['#202020', '#606060', '#202020'] : ['#404040', '#808080', '#404040']}
                            angle={Math.PI/2}
                            noise={0.2} // MARBLING
                        />
                    ))}
                    <Wall shape="circle" scale={[50,50,1]} position={[0,40,0]} rotation={[Math.PI/2,0,0]} colors={['#ffffff','#a0a0a0','#000000']} noise={0.1} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};

// --- VARIATION 4: TILTED RINGS (Tech, Blue, Diagonal) ---
export const V41d_TiltedRings: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[THREE.MathUtils.degToRad(45), envRotationY, 0]}>
                    {/* Horizontal Rings (Approximated by wide Rects) */}
                    <Wall shape="rect" scale={[100, 5, 1]} position={[0, 20, 20]} rotation={[Math.PI/4, 0, 0]} colors={['#000000', '#a0c0ff', '#000000']} angle={0} />
                    <Wall shape="rect" scale={[100, 5, 1]} position={[0, 0, 20]} rotation={[Math.PI/4, 0, 0]} colors={['#000000', '#ffffff', '#000000']} angle={0} />
                    <Wall shape="rect" scale={[100, 5, 1]} position={[0, -20, 20]} rotation={[Math.PI/4, 0, 0]} colors={['#000000', '#a0c0ff', '#000000']} angle={0} />
                    
                    {/* Background filler */}
                    <Wall shape="circle" scale={[100,100,1]} position={[0,0,-50]} rotation={[0,0,0]} colors={['#101020','#000000','#101020']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};

// --- VARIATION 5: DEEP SPACE (Sparse, Dark, Mood) ---
export const V41e_DeepSpace: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI*2]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[0, envRotationY, 0]}>
                   {/* Just one massive soft light + Darkness */}
                   <Wall shape="circle" scale={[80, 80, 1]} position={[-40, 40, 0]} rotation={[0, Math.PI/2, 0]} colors={['#000000', '#202020', '#606060']} angle={Math.PI/2} />
                   
                   {/* Tiny sharp rim light */}
                   <Wall shape="rect" scale={[2, 40, 1]} position={[40, 0, 20]} rotation={[0, -Math.PI/4, 0]} colors={['#000000', '#ffffff', '#000000']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};
