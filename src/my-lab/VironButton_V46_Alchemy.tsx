import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material';

// --- SHADER LOGIC ---

const alchemyVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vViewDir = normalize(cameraPosition - vWorldPosition);
  }
`;

const alchemyFragmentShader = `
  uniform float uTime;
  uniform float uDistortion;
  uniform float uIridescence;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPosition;

  // Simple Noise Function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    // 1. FRESNEL & IRIDESCENCE
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.0);
    
    // Create shifting hues based on angle and time
    float hueShift = sin(dot(vNormal, vec3(1.0, 0.5, 0.2)) * 3.0 + uTime * 0.5) * 0.5 + 0.5;
    vec3 iridColor = mix(uColorA, uColorB, hueShift);
    
    // 2. ALCHEMY DISTORTION (Logic for UV warping)
    // We add noise to the normal before it hits the reflection calculation
    float n = noise(vNormal.xy * 2.0 + uTime * 0.1) * uDistortion;
    vec3 distortedNormal = normalize(vNormal + vec3(n));

    // Combine Fresnel glow with base color
    vec3 finalGlow = mix(iridColor, vec3(1.0), fresnel * 0.5);
    
    // Apply to CSM outputs
    csm_DiffuseColor = vec4(finalGlow, 1.0);
    csm_Roughness = mix(0.1, 0.4, n); // Noise affects roughness for "oil" look
  }
`;

const AlchemyMaterial: React.FC<{ distortion?: number; iridescence?: number }> = ({ 
  distortion = 0.5, 
  iridescence = 0.8 
}) => {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDistortion: { value: distortion },
    uIridescence: { value: iridescence },
    uColorA: { value: new THREE.Color("#44ffcc") }, // Cyan-ish
    uColorB: { value: new THREE.Color("#ff44aa") }, // Pink-ish
  }), [distortion, iridescence]);

  return (
    <CustomShaderMaterial
      ref={materialRef}
      baseMaterial={THREE.MeshPhysicalMaterial}
      vertexShader={alchemyVertexShader}
      fragmentShader={alchemyFragmentShader}
      uniforms={uniforms}
      silent // Suppress CSM warnings
      transmission={1}
      thickness={1.5}
      ior={1.6}
      roughness={0.15}
      metalness={0.8}
      envMapIntensity={2.5}
      clearcoat={1}
    />
  );
};

// --- COMPONENT ---

const BaseButtonV46: React.FC<{ distortion: number }> = ({ distortion }) => (
  <mesh rotation={[0, 0, Math.PI / 2]}>
    <capsuleGeometry args={[0.92, 4.0, 64, 128]} />
    <AlchemyMaterial distortion={distortion} />
  </mesh>
);

export const VironButton_V46_Alchemy: React.FC<{ 
  templateUrl?: string;
  distortion?: number;
}> = ({ 
  templateUrl = "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/shanghai_bund_4k.hdr",
  distortion = 0.8 // High distortion to turn buildings into light
}) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <BaseButtonV46 distortion={distortion} />
    </Float>
  );
};
