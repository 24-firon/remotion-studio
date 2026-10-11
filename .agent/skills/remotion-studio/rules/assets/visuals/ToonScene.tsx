
import { ThreeCanvas } from '@remotion/three';

import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

import { Outlines } from '@react-three/drei';

import * as THREE from 'three';

import { useMemo } from 'react';



// Helper: Create Gradient Texture for Toon Steps

function createGradientTexture(steps: number = 3): THREE.DataTexture {

  const colors = new Uint8Array(steps);

  for (let i = 0; i < steps; i++) {

    colors[i] = Math.floor((i / (steps - 1)) * 255);

  }

  const texture = new THREE.DataTexture(colors, steps, 1, THREE.RedFormat, THREE.UnsignedByteType);

  texture.minFilter = THREE.NearestFilter; // Hard edges

  texture.magFilter = THREE.NearestFilter;

  texture.needsUpdate = true;

  return texture;

}



export const ToonScene: React.FC = () => {

  const { width, height, fps, durationInFrames } = useVideoConfig();

  const frame = useCurrentFrame();

  

  // 3-Step Gradient (Dark, Mid, Light)

  const gradientMap = useMemo(() => createGradientTexture(3), []);

  

  // Hue Rotation Animation

  const hue = interpolate(frame, [0, durationInFrames], [0, 360]);

  const color = useMemo(() => new THREE.Color().setHSL(hue / 360, 0.7, 0.5), [hue]);



  return (

    <ThreeCanvas

      width={width}

      height={height}

      camera={{ position: [0, 2, 8], fov: 50 }}

      style={{ backgroundColor: '#f0f0f0' }} // Anime-style bright BG

    >

      <ambientLight intensity={0.4} />

      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />

      

      {/* Toon Hero */}

      <mesh rotation-y={(frame / fps) * 2}>

        <torusKnotGeometry args={[1, 0.3, 128, 16]} />

        <meshToonMaterial

          color={color}

          gradientMap={gradientMap}

        />

        {/* Inverted Hull Outlines */}

        <Outlines thickness={0.05} color="black" />

      </mesh>

    </ThreeCanvas>

  );

};

