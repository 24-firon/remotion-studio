
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

import { Canvas } from '@react-three/fiber';

import { Environment, PerspectiveCamera, Float, SpotLight } from '@react-three/drei';

import * as THREE from 'three';

import { HolographicCard } from '../ui/HolographicCard';



interface SceneProps {

  title: string;

  subtitle: string;

}



export const AgXScene = ({ title, subtitle }: SceneProps) => {

  const frame = useCurrentFrame();

  

  // Smooth intro animation

  const introProgress = interpolate(frame, [0, 60], [0, 1], { 

    extrapolateRight: 'clamp',

    easing: (t) => t * (2 - t) // Ease-out

  });



  // Continuous rotation

  const rotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);



  return (

    <AbsoluteFill className="bg-slate-950">

      <Canvas

        gl={{ 

          antialias: true, 

          // ⚠️ THE NEW STANDARD: AgX Tone Mapping

          // Handles high dynamic range without washing out colors

          toneMapping: THREE.AgXToneMapping, 

          toneMappingExposure: 1.2,

          outputColorSpace: THREE.SRGBColorSpace,

        }}

        shadows

      >

        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        

        {/* PBR Lighting Setup */}

        <ambientLight intensity={0.5} />

        <SpotLight

          position={[10, 10, 10]}

          angle={0.15}

          penumbra={1}

          intensity={500} // High intensity works because of AgX

          castShadow

          shadow-mapSize-width={2048}

          shadow-mapSize-height={2048}

        />

        

        {/* HDRI Environment */}

        <Environment preset="city" background={false} />

        

        {/* Floating Hero Object */}

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

          <mesh rotation-y={rotationY} castShadow receiveShadow>

            <boxGeometry args={[2, 2, 2]} />

            {/* PBR Material: Real glass/metal properties */}

            <meshPhysicalMaterial 

              color="#ff4d4d" 

              roughness={0.2} 

              metalness={0.8}

              clearcoat={1}

              emissive="#ff0000"

              // Dynamic emissive pulse

              emissiveIntensity={interpolate(frame, [0, 30], [0, 2], { extrapolateRight: 'clamp' })}

            />

          </mesh>

        </Float>



        {/* Floor */}

        <mesh rotation-x={-Math.PI / 2} position-y={-2} receiveShadow>

          <planeGeometry args={[20, 20]} />

          <shadowMaterial opacity={0.3} />

        </mesh>

      </Canvas>



      {/* Shared UI Overlay */}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <HolographicCard 

          title={title}

          subtitle={subtitle}

          progress={introProgress}

        />

      </div>

    </AbsoluteFill>

  );

};

