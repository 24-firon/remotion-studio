import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { CONSTANTS } from '../constants';
import { random } from 'remotion';

// --- SHADER (For Noise/Marbling) ---
const GradientMaterial = shaderMaterial(
  {
    colorStart: new THREE.Color('#303030'),
    colorMid: new THREE.Color('#808080'),
    colorEnd: new THREE.Color('#e0e0e0'),
    angle: 0,
    noiseScale: 0.2, // Default Noise
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
      float t = vUv.y;
      
      // Noise
      if (noiseScale > 0.0) {
          float n = rand(vUv * 20.0 + vPosition.xy) * noiseScale;
          t += (n - noiseScale * 0.5);
      }
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

// --- HIGH POLY BUTTON (FIXED) ---
const BaseButtonHighPoly: React.FC = () => (
    <mesh rotation={[0, 0, Math.PI / 2]}>
        {/* INCREASED SEGMENTS: 64 cap, 256 radial -> Vector Smooth */}
        <capsuleGeometry args={[0.92, 4.0, 64, 256]} />
        <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={1.0} 
            roughness={0.10} 
            envMapIntensity={1.2} 
            clearcoat={1.0} 
        />
    </mesh>
);

// --- GLOBAL BACKSTOP (NO BLACK HOLES) ---
const BackstopCylinder: React.FC = () => (
    <mesh scale={[100, 100, 100]}>
        <cylinderGeometry args={[1, 1, 1, 64]} />
        <meshBasicMaterial color="#303030" side={THREE.BackSide} toneMapped={false} />
    </mesh>
);

// --- COMPONENT: STRIP GRADIENT (PHYSICAL GRADIENTS) ---
// Generates 'count' strips to create a gradient physically
const StripGradientWall: React.FC<{
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number]; // width, height, total_depth ignored
    colors: [string, string]; // Start, End
    count?: number;
}> = ({ position, rotation, scale, colors, count = 30 }) => {
    const startColor = new THREE.Color(colors[0]);
    const endColor = new THREE.Color(colors[1]);
    const stripHeight = scale[1] / count;

    return (
        <group position={position} rotation={rotation}>
            {Array.from({ length: count }).map((_, i) => {
                const t = i / (count - 1);
                const color = startColor.clone().lerp(endColor, t);
                const yPos = (i - (count - 1) / 2) * stripHeight;
                
                return (
                    <mesh 
                        key={i} 
                        position={[0, yPos, 0]} 
                        scale={[scale[0], stripHeight * 1.05, 1]} // 1.05 overlap to prevent background bleed
                    >
                        <planeGeometry />
                        <meshBasicMaterial color={color} toneMapped={false} />
                    </mesh>
                );
            })}
        </group>
    );
};

// --- THE V43 ARMADA VARIATIONS ---

// 1. HORIZONTAL STRIPS (Tilted 45)
export const V43_01_Stripes_Horizontal: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0, 300], [0, Math.PI/2]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <BackstopCylinder />
                <group rotation={[Math.PI/4, rot, Math.PI/6]}>
                    <StripGradientWall position={[0,0,40]} rotation={[0,0,0]} scale={[80, 80, 1]} colors={['#202020', '#e0e0e0']} count={40} />
                    <StripGradientWall position={[40,0,0]} rotation={[0,-Math.PI/2,0]} scale={[80, 80, 1]} colors={['#404040', '#ffffff']} count={40} />
                    <StripGradientWall position={[-40,0,0]} rotation={[0,Math.PI/2,0]} scale={[80, 80, 1]} colors={['#101010', '#a0a0a0']} count={40} />
                </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
    );
};

// 2. VERTICAL STRIPS (Rings)
export const V43_02_Stripes_Vertical: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0, 600], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <BackstopCylinder />
                <group rotation={[0.2, rot, 0.2]}>
                     {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                         <StripGradientWall 
                             key={i}
                             position={[Math.sin(deg*Math.PI/180)*30, 0, Math.cos(deg*Math.PI/180)*30]}
                             rotation={[0, (deg+180)*Math.PI/180, Math.PI/2]} // Rotated 90 for vertical gradients on walls
                             scale={[60, 20, 1]}
                             colors={i%2===0 ? ['#303030', '#a0a0a0'] : ['#a0a0a0', '#303030']} 
                             count={20}
                         />
                     ))}
                </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
    );
};

// 3. TURBINE OVALS ("Flower")
export const V43_05_Turbine_Ovals: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0, 300], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <BackstopCylinder />
                <group rotation={[0.3, rot, 0.1]}>
                    {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i / 8) * Math.PI * 2;
                        return (
                           <mesh 
                               key={i}
                               position={[Math.sin(angle)*20, Math.sin(angle*3)*10, Math.cos(angle)*20]} 
                               rotation={[Math.PI/6, angle + Math.PI/2, 0]}
                               scale={[30, 20, 1]}
                           >
                               <circleGeometry args={[1, 64]} />
                               <gradientMaterial attach="material" colorStart={new THREE.Color('#303030')} colorMid={new THREE.Color('#909090')} colorEnd={new THREE.Color('#ffffff')} angle={Math.PI/2} noiseScale={0.1} toneMapped={false} />
                           </mesh>
                        )
                    })}
                </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
    );
};

// 4. BRIGHT SOFT (Light Box)
export const V43_09_Bright_Soft: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0, 400], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <mesh scale={[100,100,100]}><cylinderGeometry /><meshBasicMaterial color="#a0a0a0" side={THREE.BackSide} /></mesh>
                <group rotation={[0.1, rot, 0.1]}>
                    {/* Just massive soft white planes */}
                    <mesh position={[0,50,0]} rotation={[Math.PI/2,0,0]} scale={[100,100,1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} />
                    </mesh>
                    <mesh position={[0,-50,0]} rotation={[-Math.PI/2,0,0]} scale={[100,100,1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="#c0c0c0" toneMapped={false} />
                    </mesh>
                     <mesh position={[0,0,50]} rotation={[0,Math.PI,0]} scale={[100,20,1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} />
                    </mesh>
                </group>
            </Environment>
             <BaseButtonHighPoly />
        </group>
    );
};

// 5. NOISE HEAVY (Marbled Texture focus)
export const V43_11_Noise_Heavy: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    // Rotate slowly
    const rot = interpolate(frame, [0,600], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                 <BackstopCylinder />
                 <group rotation={[Math.PI/8, rot, Math.PI/12]}>
                     {[0, 120, 240].map((deg, i) => (
                         <mesh key={i} position={[Math.sin(deg*Math.PI/180)*30, 0, Math.cos(deg*Math.PI/180)*30]} rotation={[0, (deg+180)*Math.PI/180, 0]} scale={[50, 50, 1]}>
                             <planeGeometry />
                             {/* HIGH NOISE SCALE = MARBLE */}
                             <gradientMaterial attach="material" colorStart={new THREE.Color('#202020')} colorMid={new THREE.Color('#606060')} colorEnd={new THREE.Color('#d0d0d0')} angle={0} noiseScale={0.5} toneMapped={false} />
                         </mesh>
                     ))}
                 </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
    );
};

// 6. STRIP SPRIAL (Complex Turbine)
export const V43_03_Stripes_Spiral: React.FC<{ debug?: boolean }> = ({ debug }) => {
     const frame = useCurrentFrame();
     const rot = interpolate(frame, [0,300], [0, Math.PI]);
     
     return (
        <group>
            <Environment resolution={1024} background={debug}>
                 <BackstopCylinder />
                 <group rotation={[0.2, rot, 0]}>
                     {Array.from({ length: 16 }).map((_, i) => {
                         const angle = (i/16)*Math.PI*2;
                         // Spiral placement
                         return (
                             <StripGradientWall 
                                 key={i}
                                 position={[Math.sin(angle)*30, (i-8)*3, Math.cos(angle)*30]}
                                 rotation={[0, angle + Math.PI/2, Math.PI/12]} // Tilted strips
                                 scale={[20, 5, 1]}
                                 colors={['#303030', '#b0b0b0']}
                                 count={10}
                             />
                         )
                     })}
                 </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
     );
};
