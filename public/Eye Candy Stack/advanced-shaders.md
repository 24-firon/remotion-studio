# Viron Button: Advanced Shader Recipes
## Custom Material Deep Dives (three-custom-shader-material)

---

## Recipe 1: Iridescent Glass (Replacing Lamina)

**What it does:** Creates a shimmering iridescent effect that changes color with viewing angle.

**Why:** Perfect for premium UI buttons that need that "alive" feeling.

```tsx
// materials/IridescentGlass.tsx
import { extend } from '@react-three/fiber'
import CustomShaderMaterial from 'three-custom-shader-material/dist/CustomShaderMaterial.js'
import * as THREE from 'three'

extend({ CustomShaderMaterial })

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
  })
}
```

**React Component:**

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { createIridescentMaterial } from './materials/IridescentGlass'

export const IridescentButton = (props) => {
  const meshRef = useRef()
  const matRef = useRef(createIridescentMaterial())

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  return (
    <mesh {...props} ref={meshRef} material={matRef.current}>
      <boxGeometry args={[2, 1, 0.2, 32, 16, 16]} />
    </mesh>
  )
}
```

---

## Recipe 2: Animated Displacement (Liquid Surface)

**What it does:** Makes the surface ripple like liquid being disturbed.

```tsx
export const createLiquidSurfaceMaterial = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,

    uniforms: {
      uTime: { value: 0 },
      uDisplacementScale: { value: 0.1 },
      uWaveAmplitude: { value: 0.05 },
      uWaveFrequency: { value: 5.0 },
    },

    // Vertex shader displaces geometry
    vertexShader: `
      uniform float uTime;
      uniform float uDisplacementScale;
      uniform float uWaveAmplitude;
      uniform float uWaveFrequency;

      varying vec3 vNormal;

      void main() {
        vec3 pos = position;

        // Create ripples using sine waves
        float wave1 = sin(position.x * uWaveFrequency + uTime) * uWaveAmplitude;
        float wave2 = cos(position.y * uWaveFrequency + uTime * 0.7) * uWaveAmplitude;
        
        pos.z += (wave1 + wave2) * uDisplacementScale;

        // Recompute normal for lighting
        vNormal = normalize(normalMatrix * normal);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,

    fragmentShader: `
      varying vec3 vNormal;

      void main() {
        // Use computed normal for shading
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
        float diffuse = max(dot(vNormal, lightDir), 0.0);
        
        csm_DiffuseColor = vec4(vec3(0.2, 0.6, 1.0) * (0.5 + diffuse), 1.0);
      }
    `,

    metalness: 0.8,
    roughness: 0.2,
  })
}
```

---

## Recipe 3: Glitch Shader (Matrix Style)

**What it does:** RGB color separation + digital distortion on demand.

```tsx
export const createGlitchMaterial = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,

    uniforms: {
      uGlitchAmount: { value: 0.0 }, // 0-1
      uTime: { value: 0 },
    },

    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,

    fragmentShader: `
      uniform float uGlitchAmount;
      uniform float uTime;
      varying vec3 vNormal;

      void main() {
        // RGB offset based on glitch amount
        vec2 glitchOffset = vec2(
          sin(uTime * 20.0) * uGlitchAmount * 0.05,
          cos(uTime * 15.0) * uGlitchAmount * 0.05
        );

        // Separate RGB channels
        float r = sin(vNormal.x * 10.0 + glitchOffset.x) * 0.5 + 0.5;
        float g = cos(vNormal.y * 10.0) * 0.5 + 0.5;
        float b = sin(vNormal.z * 10.0 + glitchOffset.y) * 0.5 + 0.5;

        vec3 glitchColor = mix(
          vec3(r, g, b),
          vec3(0.0, 1.0, 0.5), // Cyan
          uGlitchAmount * 0.5
        );

        csm_DiffuseColor = vec4(glitchColor, 1.0);
      }
    `,

    metalness: 1.0,
    roughness: 0.0,
  })
}
```

**Usage (trigger on hover):**

```tsx
export const GlitchButton = () => {
  const matRef = useRef(createGlitchMaterial())
  const [isHovered, setIsHovered] = useState(false)

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime
      // Ramp glitch amount on hover
      matRef.current.uniforms.uGlitchAmount.value = isHovered
        ? Math.min(1.0, (matRef.current.uniforms.uGlitchAmount.value || 0) + 0.05)
        : Math.max(0.0, (matRef.current.uniforms.uGlitchAmount.value || 0) - 0.05)
    }
  })

  return (
    <mesh
      ref={meshRef}
      material={matRef.current}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <boxGeometry args={[2, 1, 0.2]} />
    </mesh>
  )
}
```

---

## Recipe 4: Holographic Projection

**What it does:** Creates a flickering hologram effect with transparency bands.

```tsx
export const createHologramMaterial = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,

    uniforms: {
      uTime: { value: 0 },
      uEmissiveIntensity: { value: 2.0 },
    },

    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,

    fragmentShader: `
      uniform float uTime;
      uniform float uEmissiveIntensity;

      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        // Horizontal scanning lines (hologram effect)
        float scanline = sin(vPosition.y * 50.0 - uTime * 5.0) * 0.5 + 0.5;
        scanline = pow(scanline, 3.0); // Make lines thinner

        // Flicker
        float flicker = sin(uTime * 8.0) * 0.3 + 0.7;

        // Hologram cyan color
        vec3 holoColor = vec3(0.0, 1.0, 0.8) * flicker * scanline;

        // Transparency based on scanline
        float alpha = mix(0.3, 1.0, scanline) * flicker;

        csm_DiffuseColor = vec4(holoColor, alpha);
        csm_Emissive = vec3(holoColor) * uEmissiveIntensity * flicker;
      }
    `,

    transmission: 0.7,
    transparent: true,
    metalness: 0.3,
    roughness: 0.1,
  })
}
```

---

## Performance: CSM vs Lamina

| Metric | Lamina (Archived) | CSM (Current) |
|--------|------------------|-------|
| Maintenance | ❌ None | ✅ Active |
| Complexity | High (magic) | Moderate (explicit) |
| Performance | Slower (transpilation) | Faster (direct GLSL) |
| Learning Curve | Low | Medium |
| Flexibility | Limited layers | Full shader control |
| Bundle Size | Large | Small |

**Bottom Line:** CSM is more verbose than Lamina BUT:
1. ✅ Actively maintained
2. ✅ More performant
3. ✅ Full GLSL control when needed
4. ✅ Smaller bundle

---

## Debugging CSM Shaders

**Common Error: Black material**
- **Cause:** Missing `csm_DiffuseColor` or `gl_FragColor`
- **Fix:** Always set `csm_DiffuseColor = vec4(...)`

**Common Error: Shader doesn't update**
- **Cause:** Uniform not passed correctly
- **Fix:** Use `ref.current.uniforms.uName.value = newValue`

**Common Error: Material clips through objects**
- **Cause:** Depth test disabled
- **Fix:** Add `depthTest: true` to CSM constructor

---

## Advanced: Combining CSM with MeshTransmissionMaterial

```tsx
// Use CSM as overlay on top of transmission
const matRef = useRef(createGlitchMaterial())

return (
  <mesh>
    <boxGeometry args={[2, 1, 0.2]} />
    {/* Layer 1: Transmission (glass) */}
    <MeshTransmissionMaterial slot="material" transmission={1} thickness={0.25} />
    {/* Layer 2: CSM overlay (glitch effect) */}
    <meshShaderMaterial ref={matRef} {...glitchUniforms} />
  </mesh>
)
```

Actually, Three.js materials don't layer. Instead, use CSM as the base and embed transmission logic:

```tsx
export const createTransmissionGlitch = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    
    uniforms: {
      uGlitchAmount: { value: 0 },
      uTime: { value: 0 },
      uTransmissionTexture: { value: null }, // FBO from refraction pass
    },

    // ... same as before but read uTransmissionTexture for refraction
  })
}
```

(This requires manual FBO setup; stick to Transmission + postprocessing Glitch for simplicity.)

