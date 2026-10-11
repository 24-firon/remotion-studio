# Viron Button: Advanced Shader Recipes

## Custom Material Deep Dives (three-custom-shader-material)

---

## Recipe 1: Iridescent Glass (Replacing Lamina)

**What it does:** Creates a shimmering iridescent effect that changes color with viewing angle.

**Why:** Perfect for premium UI buttons that need that "alive" feeling.

```tsx
// materials/IridescentGlass.tsx
import { extend } from "@react-three/fiber";
import CustomShaderMaterial from "three-custom-shader-material/dist/CustomShaderMaterial.js";
import * as THREE from "three";

extend({ CustomShaderMaterial });

export const createIridescentMaterial = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,

    // Uniforms (reactive)
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0.1, 0.5, 1.0) },
      uIridescenceStrength: { value: 0.8 },
      uFresnelPower: { value: 2.5 },
    },

    // Vertex Shader
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        vViewDir = normalize(cameraPosition - vPosition);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,

    // Fragment Shader
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uIridescenceStrength;
      uniform float uFresnelPower;

      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPosition;

      // Simplex noise (from three.js)
      float hash(vec3 p) {
        return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
      }

      void main() {
        // Fresnel (rim light)
        float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), uFresnelPower);

        // Iridescence: shift hue based on normal + time
        float iridescence = sin(
          dot(vNormal, vec3(1.0, 0.5, 0.2)) * 5.0 + uTime * 0.5
        ) * 0.5 + 0.5;

        // Blend colors
        vec3 iridColor = mix(
          uColor,
          vec3(sin(uTime + 1.0) * 0.5 + 0.5, 0.5, cos(uTime) * 0.5 + 0.5),
          iridescence * uIridescenceStrength
        );

        // Apply fresnel glow
        csm_DiffuseColor = vec4(mix(iridColor, vec3(1.0), fresnel * 0.3), 1.0);
      }
    `,

    // Base material props
    metalness: 0.8,
    roughness: 0.1,
    transmission: 0.5,
    ior: 1.5,
  });
};
```

**React Component:**

```tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { createIridescentMaterial } from "./materials/IridescentGlass";

export const IridescentButton = (props) => {
  const meshRef = useRef();
  const matRef = useRef(createIridescentMaterial());

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh {...props} ref={meshRef} material={matRef.current}>
      <boxGeometry args={[2, 1, 0.2, 32, 16, 16]} />
    </mesh>
  );
};
```

---

## Performance: CSM vs Lamina

| Metric      | Lamina (Archived)      | CSM (Current)        |
| ----------- | ---------------------- | -------------------- |
| Maintenance | ❌ None                | ✅ Active            |
| Complexity  | High (magic)           | Moderate (explicit)  |
| Performance | Slower (transpilation) | Faster (direct GLSL) |

**Bottom Line:** CSM ist der Zukunftsstandard ab 2026.
