import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import { random } from 'remotion';

// --- V42 GRADIENT SHADER (With Noise) ---
const GradientMaterial = shaderMaterial(
  {
    colorStart: new THREE.Color('#303030'), // Default: Dark Grey (Not Black)
    colorMid: new THREE.Color('#808080'),   // Default: Mid Grey
    colorEnd: new THREE.Color('#e0e0e0'),   // Default: Silver
    angle: 0,
    noiseScale: 0.1, // Default Noise for Marbling
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

    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      float cosAngle = cos(angle);
      float sinAngle = sin(angle);
      vec2 center = vec2(0.5, 0.5);
      vec2 rotatedUv = vec2(
        cosAngle * (vUv.x - center.x) - sinAngle * (vUv.y - center.y) + center.x,
        sinAngle * (vUv.x - center.x) + cosAngle * (vUv.y - center.y) + center.y
      );

      float t = rotatedUv.y;
      
      // Add Noise/Marbling
      if (noiseScale > 0.0) {
          float n = rand(vUv * 15.0 + vPosition.xy * 0.5) * noiseScale;
          t += (n - noiseScale * 0.5);
      }
      
      // Clamp t to stay within gradient bounds
      t = clamp(t, 0.0, 1.0);

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

// --- WALL COMPONENT ---
interface WallProps {
  shape: 'circle' | 'rect' | 'triangle' | 'star' | 'ring';
  scale: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  colors: [string, string, string];
  angle?: number;
  noise?: number;
  float?: boolean; // Enable floating animation?
}

const Wall: React.FC<WallProps> = ({ shape, scale, position, rotation, colors, angle=0, noise=0.15, float=false }) => {
    const geometry = useMemo(() => {
        if (shape === 'circle') return new THREE.CircleGeometry(1, 64);
        if (shape === 'triangle') return new THREE.CircleGeometry(1, 3);
        if (shape === 'rect') return new THREE.PlaneGeometry(2, 2);
        if (shape === 'ring') return new THREE.RingGeometry(0.6, 1, 64);
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

    const content = (
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

    if (float) {
        return <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>{content}</Float>;
    }
    return content;
};

// --- BASE BUTTON ---
const BaseButton: React.FC = () => (
    <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
        <meshPhysicalMaterial color="#ffffff" metalness={1.0} roughness={0.10} envMapIntensity={1.5} clearcoat={1.0} />
    </mesh>
);

// ########## THE 5 VARIATIONS (GOLDEN MEAN COMPLIANT) ##########

// 1. LIQUID GREY (Flowing Ovals, No Black)
export const V42a_LiquidGrey: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rotateY = interpolate(frame, [0, 300], [0, Math.PI]); 
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[0, rotateY, 0]}>
                    <Wall shape="circle" scale={[40, 40, 1]} position={[-30, 0, 10]} rotation={[0, Math.PI/3, 0]} colors={['#404040', '#909090', '#d0d0d0']} angle={Math.PI/2} float />
                    <Wall shape="circle" scale={[40, 40, 1]} position={[30, 10, 10]} rotation={[0, -Math.PI/3, 0]} colors={['#505050', '#a0a0a0', '#e0e0e0']} angle={Math.PI/2} float />
                    {/* Background Cladding - Not Black! */}
                    <Wall shape="rect" scale={[60, 60, 1]} position={[0,0,-40]} rotation={[0,0,0]} colors={['#303030','#505050','#303030']} />
                    {/* Ceiling/Floor */}
                    <Wall shape="circle" scale={[50,50,1]} position={[0,40,0]} rotation={[Math.PI/2,0,0]} colors={['#ffffff','#b0b0b0','#606060']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};

// 2. KINETIC STARS (Aggressive Shapes but GREY tones, Moving)
export const V42b_KineticStars: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rotateY = interpolate(frame, [0, 300], [0, -Math.PI]); // Counter-rotate
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[0.2, rotateY, 0.2]}>
                    <Wall shape="star" scale={[25, 25, 1]} position={[-25, 20, 20]} rotation={[0, Math.PI/4, 0]} colors={['#706050', '#e0d0c0', '#ffffff']} float />
                    <Wall shape="triangle" scale={[30, 30, 1]} position={[25, -20, 20]} rotation={[0, -Math.PI/4, Math.PI]} colors={['#304050', '#8090a0', '#d0e0ff']} float />
                    <Wall shape="rect" scale={[80, 80, 1]} position={[0,0,-30]} rotation={[0,0,0]} colors={['#404040','#606060','#404040']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};

// 3. SOFT ARENA (Curved, Extremely Low Contrast, Slow Drift)
export const V42c_SoftArena: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rotateY = interpolate(frame, [0, 600], [0, Math.PI]); // Very Slow
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[0, rotateY, 0]}>
                    {/* A complete ring of greys */}
                    <Wall shape="rect" scale={[100, 30, 1]} position={[0, 0, 0]} rotation={[0, 0, 0]} colors={['#606060', '#909090', '#606060']} /> 
                    {/* Note: In Environment, walls are usually placed around. Let's make 4 huge walls to enclose */}
                    <Wall shape="rect" scale={[50, 40, 1]} position={[-30, 0, 20]} rotation={[0, Math.PI/4, 0]} colors={['#505050', '#808080', '#b0b0b0']} angle={Math.PI/2} />
                    <Wall shape="rect" scale={[50, 40, 1]} position={[30, 0, 20]} rotation={[0, -Math.PI/4, 0]} colors={['#505050', '#808080', '#b0b0b0']} angle={Math.PI/2} />
                    <Wall shape="circle" scale={[60, 60, 1]} position={[0, 50, 0]} rotation={[Math.PI/2, 0, 0]} colors={['#ffffff', '#d0d0d0', '#808080']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};

// 4. DRIFTING RINGS (Horizontal Flow, Mid-Key)
export const V42d_DriftingRings: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rotateZ = interpolate(frame, [0, 300], [0, Math.PI/4]); 
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[0, 0, rotateZ]}>
                    <Wall shape="rect" scale={[80, 5, 1]} position={[0, 15, 20]} rotation={[0.5, 0, 0]} colors={['#404040', '#a0a0a0', '#404040']} angle={0} float />
                    <Wall shape="rect" scale={[80, 5, 1]} position={[0, 0, 20]} rotation={[0.5, 0, 0]} colors={['#505050', '#ffffff', '#505050']} angle={0} float />
                    <Wall shape="rect" scale={[80, 5, 1]} position={[0, -15, 20]} rotation={[0.5, 0, 0]} colors={['#404040', '#a0a0a0', '#404040']} angle={0} float />
                    {/* Background to prevent black void */}
                    <Wall shape="circle" scale={[100,100,1]} position={[0,0,-20]} rotation={[0,0,0]} colors={['#202020', '#404040', '#202020']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};

// 5. BRIGHT TECH (High Key Grey, Hexagons, No Dark Spots)
export const V42e_BrightTech: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rotateY = interpolate(frame, [0, 300], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <group rotation={[0.3, rotateY, 0]}>
                   {/* Hexagonal Arrangement of BRIGHT PANELS */}
                   {[0, 120, 240].map((deg, i) => (
                       <Wall 
                           key={i}
                           shape="rect" scale={[40, 40, 1]} 
                           position={[Math.sin(deg*Math.PI/180)*35, 0, Math.cos(deg*Math.PI/180)*35]} 
                           rotation={[0, (deg+180)*Math.PI/180, 0]}
                           colors={['#808080', '#c0c0c0', '#ffffff']}
                           noise={0.1}
                       />
                   ))}
                   {/* Floor is Mid Grey */}
                   <Wall shape="circle" scale={[60, 60, 1]} position={[0,-35,0]} rotation={[-Math.PI/2,0,0]} colors={['#606060','#909090','#606060']} />
                </group>
            </Environment>
            <BaseButton />
        </group>
    );
};
