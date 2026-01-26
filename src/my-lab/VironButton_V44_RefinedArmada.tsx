import { interpolate, useCurrentFrame } from 'remotion';
import React, { useMemo } from 'react';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

// --- SHADER (Identical to V43 but Noise Tuned) ---
const GradientMaterial = shaderMaterial(
  {
    colorStart: new THREE.Color('#303030'),
    colorMid: new THREE.Color('#808080'),
    colorEnd: new THREE.Color('#e0e0e0'),
    angle: 0,
    noiseScale: 0.15, 
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientMaterial: any;
    }
  }
}

// --- HIGH POLY BUTTON ---
const BaseButtonHighPoly: React.FC = () => (
    <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.92, 4.0, 64, 256]} />
        <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={1.0} 
            roughness={0.12} 
            envMapIntensity={1.5} 
            clearcoat={1.0} 
        />
    </mesh>
);

// --- BRIGHTER BACKSTOP ---
const BackstopCylinder: React.FC = () => (
    <mesh scale={[100, 100, 100]}>
        <cylinderGeometry args={[1, 1, 1, 64]} />
        {/* LIGHTER GREY to prevent black voids */}
        <meshBasicMaterial color="#505050" side={THREE.BackSide} toneMapped={false} />
    </mesh>
);

// --- STRIP GRADIENT WALL ---
const StripGradientWall: React.FC<{
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number]; 
    colors: [string, string]; 
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
                        // Overlap 1.1x to kill gaps
                        scale={[scale[0], stripHeight * 1.1, 1]} 
                    >
                        <planeGeometry />
                        <meshBasicMaterial color={color} toneMapped={false} />
                    </mesh>
                );
            })}
        </group>
    );
};

// ########## V44: REFINED ARMADA (NO GAPS, 360 COVERAGE) ##########

// 1. HORIZONTAL STRIPS (Now a Box)
export const V44_01_Stripes_Horizontal: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0, 300], [0, Math.PI/2]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <BackstopCylinder />
                <group rotation={[Math.PI/4, rot, Math.PI/6]}>
                    <StripGradientWall position={[0,0,40]} rotation={[0,0,0]} scale={[80, 80, 1]} colors={['#303030', '#e0e0e0']} count={40} />
                    <StripGradientWall position={[0,0,-40]} rotation={[0,Math.PI,0]} scale={[80, 80, 1]} colors={['#303030', '#e0e0e0']} count={40} />
                    
                    <StripGradientWall position={[40,0,0]} rotation={[0,-Math.PI/2,0]} scale={[80, 80, 1]} colors={['#404040', '#ffffff']} count={40} />
                    <StripGradientWall position={[-40,0,0]} rotation={[0,Math.PI/2,0]} scale={[80, 80, 1]} colors={['#101010', '#a0a0a0']} count={40} />
                    
                    {/* Ceiling/Floor */}
                    <StripGradientWall position={[0,40,0]} rotation={[Math.PI/2,0,0]} scale={[80, 80, 1]} colors={['#ffffff', '#808080']} count={40} />
                    <StripGradientWall position={[0,-40,0]} rotation={[-Math.PI/2,0,0]} scale={[80, 80, 1]} colors={['#606060', '#303030']} count={40} />
                </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
    );
};

// 2. VERTICAL STRIPS (Now 360 Cylinder + Caps)
export const V44_02_Stripes_Vertical: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0, 600], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <BackstopCylinder />
                <group rotation={[0.2, rot, 0.2]}>
                     {/* Wall Ring - 12 segments (30deg) to close gap */}
                     {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
                         <StripGradientWall 
                             key={i}
                             position={[Math.sin(deg*Math.PI/180)*35, 0, Math.cos(deg*Math.PI/180)*35]}
                             rotation={[0, (deg+180)*Math.PI/180, Math.PI/2]} 
                             scale={[60, 20, 1]} // Tall Height 60
                             colors={i%2===0 ? ['#404040', '#b0b0b0'] : ['#b0b0b0', '#404040']} 
                             count={20}
                         />
                     ))}
                     {/* Ceiling Cap */}
                     <mesh position={[0,30,0]} rotation={[Math.PI/2,0,0]}><circleGeometry args={[40, 64]} /><meshBasicMaterial color="#d0d0d0" toneMapped={false} /></mesh>
                     {/* Floor Cap */}
                     <mesh position={[0,-30,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[40, 64]} /><meshBasicMaterial color="#505050" toneMapped={false} /></mesh>
                </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
    );
};

// 3. TURBINE OVALS (More Petals + Overlap)
export const V44_05_Turbine_Ovals: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0, 300], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <BackstopCylinder />
                <group rotation={[0.3, rot, 0.1]}>
                    {/* 12 Petals (was 8) + Larger Scale */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        return (
                           <mesh 
                               key={i}
                               position={[Math.sin(angle)*25, Math.sin(angle*3)*15, Math.cos(angle)*25]} 
                               rotation={[Math.PI/6, angle + Math.PI/2, 0]}
                               scale={[45, 30, 1]} // Bigger Ovals
                           >
                               <circleGeometry args={[1, 64]} />
                               <gradientMaterial attach="material" colorStart={new THREE.Color('#404040')} colorMid={new THREE.Color('#909090')} colorEnd={new THREE.Color('#ffffff')} angle={Math.PI/2} noiseScale={0.1} toneMapped={false} />
                           </mesh>
                        )
                    })}
                </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
    );
};

// 4. BRIGHT SOFT (Closed Box)
export const V44_09_Bright_Soft: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0, 400], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                <mesh scale={[110,110,110]}><cylinderGeometry /><meshBasicMaterial color="#d0d0d0" side={THREE.BackSide} toneMapped={false}/></mesh>
                <group rotation={[0.1, rot, 0.1]}>
                    {/* Full Cube Closure */}
                    <mesh position={[0,50,0]} rotation={[Math.PI/2,0,0]} scale={[100,100,1]}><planeGeometry /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
                    <mesh position={[0,-50,0]} rotation={[-Math.PI/2,0,0]} scale={[100,100,1]}><planeGeometry /><meshBasicMaterial color="#c0c0c0" toneMapped={false} /></mesh>
                    
                    <mesh position={[0,0,50]} rotation={[0,Math.PI,0]} scale={[100,100,1]}><planeGeometry /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
                    <mesh position={[0,0,-50]} rotation={[0,0,0]} scale={[100,100,1]}><planeGeometry /><meshBasicMaterial color="#e0e0e0" toneMapped={false} /></mesh>
                    
                    <mesh position={[50,0,0]} rotation={[0,-Math.PI/2,0]} scale={[100,100,1]}><planeGeometry /><meshBasicMaterial color="#f0f0f0" toneMapped={false} /></mesh>
                    <mesh position={[-50,0,0]} rotation={[0,Math.PI/2,0]} scale={[100,100,1]}><planeGeometry /><meshBasicMaterial color="#d0d0d0" toneMapped={false} /></mesh>
                </group>
            </Environment>
             <BaseButtonHighPoly />
        </group>
    );
};

// 5. NOISE HEAVY (Closed Octagon)
export const V44_11_Noise_Heavy: React.FC<{ debug?: boolean }> = ({ debug }) => {
    const frame = useCurrentFrame();
    const rot = interpolate(frame, [0,600], [0, Math.PI]);
    return (
        <group>
            <Environment resolution={1024} background={debug}>
                 <BackstopCylinder />
                 <group rotation={[Math.PI/8, rot, Math.PI/12]}>
                     {/* 8 Walls (Octagon) to close loop */}
                     {Array.from({length: 8}).map((_, i) => {
                         const   deg = i * 45;
                         return (
                         <mesh key={i} position={[Math.sin(deg*Math.PI/180)*35, 0, Math.cos(deg*Math.PI/180)*35]} rotation={[0, (deg+180)*Math.PI/180, 0]} scale={[40, 60, 1]}>
                             <planeGeometry />
                             <gradientMaterial attach="material" colorStart={new THREE.Color('#303030')} colorMid={new THREE.Color('#808080')} colorEnd={new THREE.Color('#e0e0e0')} angle={0} noiseScale={0.5} toneMapped={false} />
                         </mesh>
                     )})}
                     {/* Floor/Ceiling Caps */}
                     <mesh position={[0,35,0]} rotation={[Math.PI/2,0,0]}><circleGeometry args={[40,32]} /><meshBasicMaterial color="#d0d0d0" toneMapped={false}/></mesh>
                     <mesh position={[0,-35,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[40,32]} /><meshBasicMaterial color="#606060" toneMapped={false}/></mesh>
                 </group>
            </Environment>
            <BaseButtonHighPoly />
        </group>
    );
};

// 6. SPIRAL STRIPS (More density)
export const V44_03_Stripes_Spiral: React.FC<{ debug?: boolean }> = ({ debug }) => {
     const frame = useCurrentFrame();
     const rot = interpolate(frame, [0,300], [0, Math.PI]);
     return (
        <group>
            <Environment resolution={1024} background={debug}>
                 <BackstopCylinder />
                 <group rotation={[0.2, rot, 0]}>
                     {Array.from({ length: 24 }).map((_, i) => {
                         const angle = (i/24)*Math.PI*2;
                         return (
                             <StripGradientWall 
                                 key={i}
                                 position={[Math.sin(angle)*35, (i-12)*2.5, Math.cos(angle)*35]} // Tighter spiral
                                 rotation={[0, angle + Math.PI/2, Math.PI/8]} 
                                 scale={[25, 5, 1]}
                                 colors={['#404040', '#c0c0c0']}
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
