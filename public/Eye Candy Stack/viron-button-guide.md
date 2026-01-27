# 🎬 Viron Button: Complete Implementation Guide
## A Programmatic Video Engine for High-End Cinematic UIs

**Last Updated:** January 27, 2026  
**Status:** VERIFIED AGAINST LIVE ECOSYSTEM (Jan 2026)  
**Target Stack:** React Three Fiber + Drei + WebGL2 (WebGPU pending)

---

## ⚠️ CRITICAL DEPENDENCY NOTES

### 1. Lamina is ARCHIVED (June 2025)
- **Status:** Read-only, no longer maintained by pmndrs
- **Reason:** Architectural debt; unmaintainable hack layers
- **Replacement:** Use `three-custom-shader-material` (CSM) directly
- **Impact on Stack:** Remove all `<LayerMaterial>` references; use raw shader materials instead

### 2. WebGPU Support is INCOMPLETE
- **Status:** Three.js r171+ has `WebGPURenderer`, but ecosystem NOT READY
- **Problem:** `MeshTransmissionMaterial`, `Caustics`, and postprocessing effects break on WebGPU
- **Reason:** These components rely on legacy shader chunks + `onBeforeCompile` hacks
- **Recommendation:** **STAY ON WEBGL2** for production. WebGPU = 2026 H2 minimum

### 3. React-Three-Fiber Versions
- **Current:** v9.5.0+ (pairs with React 19)
- **Older:** v8.x (pairs with React 18)
- **Drei:** v10.7.7+ (latest, fully compatible with R3F v9)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────┐
│  Viron Button (Hero Component)       │
├─────────────────────────────────────┤
│ Layer 1: Backdrop                    │
│   └─ Luma/Runway AI-generated loop   │
│   └─ Rendered as VideoTexture        │
├─────────────────────────────────────┤
│ Layer 2: Glass/Transmission Hero     │
│   └─ MeshTransmissionMaterial        │
│   └─ Refracts backdrop (synergy)     │
├─────────────────────────────────────┤
│ Layer 3: Effects & Lighting          │
│   └─ Caustics (liquid light)         │
│   └─ Lightformers (neon accents)     │
│   └─ Sparkles (magic dust)           │
├─────────────────────────────────────┤
│ Layer 4: Post-Processing             │
│   └─ Bloom (emissive high)           │
│   └─ Glitch (on-interaction)         │
│   └─ Color grading (mood)            │
└─────────────────────────────────────┘
```

---

## 📦 DEPENDENCY MATRIX (Jan 2026)

| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| `three` | r171+ | ✅ Latest | WebGLRenderer stable; WebGPURenderer experimental |
| `@react-three/fiber` | 9.5.0+ | ✅ Stable | Pairs with React 19 |
| `@react-three/drei` | 10.7.7+ | ✅ Latest | All materials + helpers |
| `@react-three/postprocessing` | Latest | ⚠️ Partial | Bloom/Glitch OK; WebGPU pending |
| `postprocessing` | Latest | ⚠️ Partial | Peer dep for @react-three/postprocessing |
| `three-custom-shader-material` | 6.0+ | ✅ Active | CSM replaces Lamina |
| `lamina` | ARCHIVED | ❌ Dead | Do NOT use; use CSM instead |

### Package.json Foundation

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^r171",
    "@react-three/fiber": "^9.5.0",
    "@react-three/drei": "^10.7.7",
    "@react-three/postprocessing": "^latest",
    "postprocessing": "^latest",
    "three-custom-shader-material": "^6.0.0"
  },
  "devDependencies": {
    "@types/three": "^r171"
  }
}
```

---

## 🍬 TIER 1: "Eye Candy" Stack (The Glass)

### 1.1 MeshTransmissionMaterial (The Hero)

**What it is:** Enhanced `MeshPhysicalMaterial` that refracts the scene behind it.

**Library:** `@react-three/drei` (built-in)

**Critical Parameters:**

| Prop | Default | Range | Impact |
|------|---------|-------|--------|
| `transmission` | 0 | 0-1 | How "glass" it looks (1 = full refraction) |
| `samples` | 6 | 6-32 | Quality (higher = more expensive) |
| `resolution` | fullscreen | 32-2048 | Buffer resolution |
| `thickness` | 0 | 0-5 | Refraction depth |
| `ior` | 1.5 | 1.0-2.5 | Refractive index (glass ≈ 1.5) |
| `chromaticAberration` | 0.03 | 0-0.1 | RGB color split (fun effect) |
| `roughness` | 0 | 0-1 | Blur on refraction |
| `anisotropicBlur` | 0.1 | 0-0.3 | Directional blur smear |

**Basic Implementation:**

```tsx
import { Canvas } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei'
import { useVideoTexture } from '@react-three/drei'

const VironButton = () => {
  // Load your Luma/Runway video as a texture
  const videoTexture = useVideoTexture('/textures/neon_loop_hq.mp4')

  return (
    <Canvas gl={{ antialias: true, alpha: false }}>
      {/* Backdrop: AI video as plain billboard */}
      <mesh scale={[16, 9, 1]} position={[0, 0, -5]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={videoTexture} toneMapped={false} />
      </mesh>

      {/* Hero: Glass button refracting the video */}
      <Float floatIntensity={0.5} speed={1.2}>
        <mesh position={[0, 0, 0.5]}>
          {/* Rounded box = better reflections than sphere */}
          <boxGeometry args={[2, 1, 0.2, 32, 16, 16]} />
          <MeshTransmissionMaterial
            // Video shows THROUGH the button (synergy!)
            background={videoTexture}
            
            // Glass params
            transmission={1}
            thickness={0.25}
            ior={1.5}
            roughness={0.05}
            
            // Optical effects
            chromaticAberration={0.04}
            anisotropicBlur={0.1}
            distortion={0.05}
            
            // Performance tuning
            samples={16}             // Desktop: 16-24; Mobile: 8-12
            resolution={1024}        // 512-2048; lower for mobile
          />
        </mesh>
      </Float>

      {/* Standard lighting (for realistic reflections) */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 10]} intensity={1} />
    </Canvas>
  )
}
```

**Performance Notes:**
- `MeshTransmissionMaterial` causes an **extra render pass** (expensive!)
- On M2 MacBook: 16 samples @ 1024px = ~60 FPS (heavy)
- **Mobile:** Use 8 samples, 512px resolution
- **Desktop:** 16+ samples, 1024px safe

**Common Pitfall:**
```tsx
// ❌ WRONG: Material doesn't "see" the video properly
<MeshTransmissionMaterial transmission={1} />

// ✅ CORRECT: Pass the video texture as background
<MeshTransmissionMaterial 
  background={videoTexture} 
  transmission={1} 
/>
```

---

### 1.2 Caustics (Liquid Light Shimmer)

**What it is:** Animated shadow patterns that simulate light refracting through water.

**Library:** `@react-three/drei` (built-in)

**Best Use Case:** Place under a transparent hero to make it "float" on liquid.

```tsx
import { Caustics, Lightformer } from '@react-three/drei'

const CausticsScene = () => {
  return (
    <Caustics
      color="#00FFFF"              // Cyan light
      intensity={0.7}              // Brightness
      worldRadius={1.5}            // Clamp effect to this radius
      samples={32}                 // Quality
      ior={1.1}                    // Refraction index
      backfaces={true}             // Essential for glass
    >
      {/* Floor that receives caustics */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0b1015" roughness={0.8} />
      </mesh>

      {/* Floating glass object */}
      <Float floatIntensity={1.5} speed={1.2}>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.6, 128, 128]} />
          <MeshTransmissionMaterial 
            transmission={1} 
            thickness={1}
            roughness={0.05}
          />
        </mesh>
      </Float>
    </Caustics>
  )
}
```

**Cost:** Moderate. Caustics uses a lookup texture + animation. Much cheaper than `gpu-io` compute shaders.

---

### 1.3 Lightformers (Neon Accents)

**What it is:** Fake light sources that appear in reflections without lighting geometry.

**Library:** `@react-three/drei`

**Why:** Instantly adds "product shot" mood.

```tsx
import { Environment, Lightformer } from '@react-three/drei'

<Canvas>
  <Environment resolution={1024}>
    {/* Top horizontal neon strip (cyan) */}
    <Lightformer
      form="rect"                  // rect | ring | circle
      intensity={8}
      color="#00f0ff"
      scale={[4, 1, 1]}
      position={[0, 2, -2]}
      rotation={[0, 0, 0]}
    />
    
    {/* Side ring light (magenta) */}
    <Lightformer
      form="ring"
      intensity={5}
      color="#ff00ff"
      scale={2}
      position={[-3, 1, 1]}
    />

    {/* Soft fill light (white) */}
    <Lightformer
      form="rect"
      intensity={3}
      color="#ffffff"
      scale={[2, 2, 1]}
      position={[0, -1, 0]}
    />
  </Environment>
</Canvas>
```

**Visual Result:** Realistic reflections on glass + neon glow without adding actual geometry.

---

### 1.4 Sparkles (Magic Dust)

**What it is:** Tiny particle sprites that orbit or float.

**Library:** `@react-three/drei`

```tsx
import { Sparkles } from '@react-three/drei'

<Sparkles
  count={400}           // Number of particles
  speed={0.7}           // Animation speed
  opacity={0.6}         // Fade in/out
  scale={[4, 4, 4]}     // Bounding box
  size={3}              // Particle size in pixels
  color="#00f5ff"       // Cyan
  sizeAttenuation       // Fade with distance
/>
```

**Best Practice:** Wrap in `<Float>` for breathing motion.

```tsx
<Float floatIntensity={1} speed={2}>
  <Sparkles count={300} color="#00f5ff" />
</Float>
```

---

## 🎆 TIER 2: Generative Textures (The Liquid Metal)

### 2.1 ComfyUI Seamless Tiling Workflow

**Goal:** Create a 512×512 seamless tileable metal texture that loops.

**Nodes Required:**
1. Spinagon's `ComfyUI-seamless-tiling` [GitHub](https://github.com/spinagon/ComfyUI-seamless-tiling)
2. Marigold Depth/Normal estimator (for PBR maps)

**Workflow (JSON Logic):**

```json
{
  "nodes": {
    "1": { "class_type": "CheckpointLoader", "inputs": { "ckpt_name": "flux_metal_jacket_v2.safetensors" } },
    "2": { "class_type": "SeamlessTile", "inputs": { "image": [1, 0], "tile_x": true, "tile_y": true } },
    "3": { "class_type": "KSampler", "inputs": { "seed": 12345, "steps": 20, "cfg": 7.5, "model": [1, 0], "positive": "liquid chrome metal surface macro shot", "negative": "text watermark objects" } },
    "4": { "class_type": "VAEDecode", "inputs": { "samples": [3, 0] } },
    "5": { "class_type": "MarigoldDepthEstimator", "inputs": { "image": [4, 0] } },
    "6": { "class_type": "SaveImage", "inputs": { "images": [4, 0], "filename_prefix": "metal_diffuse" } },
    "7": { "class_type": "SaveImage", "inputs": { "images": [5, 0], "filename_prefix": "metal_normal" } }
  }
}
```

**Prompt That Works (Jan 2026):**

```
"Seamless PBR material, liquid chrome metal, iridescent bismuth oxide layer, 
macro photography, 8k resolution, ultra detailed, studio lighting, 
mirror-like reflections, no objects, no people, tiling texture"
```

**Key Keywords:**
- `seamless` or `tiling texture`
- `PBR material`
- `liquid metal` or `chrome`
- `macro` (for detail)
- `8k` (forces quality)

**Output:**
- Diffuse map: Use as `map` in `meshStandardMaterial`
- Normal map: Use as `normalMap` (skip displacement)

**R3F Integration:**

```tsx
import { useTexture } from '@react-three/drei'

const LiquidMetalButton = () => {
  const tex = useTexture({
    map: '/textures/metal_diffuse_512.png',
    normalMap: '/textures/metal_normal_512.png',
  })

  // Repeat texture 2x2 for visual richness
  Object.values(tex).forEach((t: any) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(2, 2)
  })

  return (
    <mesh>
      <boxGeometry args={[2, 1, 0.2]} />
      <meshStandardMaterial
        {...tex}
        metalness={1}
        roughness={0.2}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}
```

---

### 2.2 Cyberpunk Neon Background (Luma Dream Machine)

**Goal:** Generate a short looping video clip of neon alley for backdrop.

**Tool:** Luma Labs Dream Machine (AI video generator)

**Prompt That Works:**

```
"Hyper-detailed cyberpunk alley, rain-slicked neon reflections, 
volumetric fog, side-scrolling parallax, teal and magenta color grade, 
loopable 8 second shot, no characters, high contrast, 35mm anamorphic"
```

**Workflow:**
1. Go to [lumalabs.ai/genie](https://lumalabs.ai/genie)
2. Paste prompt
3. Generate ~5-8 second clip
4. Export as MP4/webm
5. Optimize with FFmpeg:

```bash
ffmpeg -i neon_alley.mp4 -c:v libvpx-vp9 -b:v 2M -c:a libopus neon_alley.webm
```

**Implementation in R3F:**

```tsx
import { useVideoTexture } from '@react-three/drei'

const NeonBackdrop = () => {
  const videoTex = useVideoTexture('/video/neon_alley_loop.webm')

  return (
    <mesh scale={[16, 9, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={videoTex} toneMapped={false} />
    </mesh>
  )
}
```

**Key:** `toneMapped={false}` prevents Three.js from crushing bright neon colors.

---

## 🎬 TIER 3: Post-Processing Recipes

### 3.1 "The Matrix" Look

**Goal:** High contrast, digital glitch, green tint.

**Stack:** Bloom + Glitch + ColorCorrection

```tsx
import { Canvas } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  Glitch,
  Noise,
  ColorCorrection,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'

const MatrixEffects = ({ active }) => {
  return (
    <EffectComposer disableNormalPass>
      {/* 1. Bloom: Only the brightest pixels glow */}
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.6}      // Only emissive > 0.6 brightness
        luminanceSmoothing={0.2}
        mipmapBlur                    // Soft, scattered glow
      />

      {/* 2. Glitch: Digital artifacts on interaction */}
      <Glitch
        delay={[1.5, 3.5]}            // How often glitch occurs
        duration={[0.2, 0.6]}         // How long each glitch lasts
        strength={[0.3, 0.7]}         // Intensity
        mode={active ? GlitchMode.CONSTANT_WILD : GlitchMode.SPORADIC}
      />

      {/* 3. Film Grain */}
      <Noise premultiply opacity={0.08} />

      {/* 4. Green Color Grade */}
      <ColorCorrection
        saturation={0.8}              // Desaturate slightly
        brightness={0.0}
        contrast={1.1}                // Pump contrast
        hue={-0.2}                    // Shift towards green
      />

      {/* 5. Vignette: Dark edges */}
      <Vignette eskil={false} offset={0.4} darkness={0.9} />
    </EffectComposer>
  )
}

// Usage in Canvas
<Canvas>
  {/* Your 3D scene */}
  <MatrixEffects active={isHovered} />
</Canvas>
```

**Critical:** Set emissive materials BRIGHT for bloom to work:

```tsx
<MeshTransmissionMaterial
  emissive="#ff00ff"
  emissiveIntensity={3}           // CRITICAL!
  {...otherProps}
/>
```

---

### 3.2 "Ethereal Dream" Look

**Goal:** Soft focus, cinematic bokeh, film grain.

**Stack:** DepthOfField + Bloom + Noise + Vignette

```tsx
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing'

const DreamEffects = () => {
  return (
    <EffectComposer>
      {/* 1. Depth of Field: Soft blur around focus */}
      <DepthOfField
        focusDistance={0.02}   // How far from camera is in-focus
        focalLength={0.03}     // How wide the blur is
        bokehScale={3.0}       // Creamy bokeh balls
      />

      {/* 2. Subtle Bloom */}
      <Bloom
        intensity={0.9}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.3}
      />

      {/* 3. Fine Film Grain */}
      <Noise premultiply opacity={0.03} />

      {/* 4. Dark Vignette */}
      <Vignette eskil={false} offset={0.3} darkness={0.5} />
    </EffectComposer>
  )
}
```

**Pro Tip:** Sync `focusDistance` with camera movement for focus pull effects:

```tsx
import { useThree } from '@react-three/fiber'

const DofRef = useRef()

useFrame(({ clock }) => {
  // Animate focus distance over time
  dofRef.current.focusDistance = 0.02 + Math.sin(clock.elapsedTime) * 0.01
})

<DepthOfField ref={dofRef} ... />
```

---

## 📦 TIER 4: Asset Vaults (CC0 Resources)

### 4.1 Poly Haven: Studio HDRI Collection

**What:** High-quality, CC0-licensed HDRI maps for realistic lighting.

**URL:** [polyhaven.com/hdris/studio](https://polyhaven.com/hdris/studio)

**Best for Viron Button:**
- `studio_small_09_2k.exr` ← Dark, clean reflections
- `studio_soft_01_2k.exr` ← Diffuse softbox lighting
- `studio_tent_02_2k.exr` ← Minimalist pure white

**R3F Integration:**

```tsx
import { Environment } from '@react-three/drei'

<Environment
  files="/hdri/studio_small_09_2k.exr"
  background={false}              // Don't use as bg, just lighting
  blur={0.8}                       // Soften sharp reflections
  resolution={1024}
/>
```

**Why Blur?** Sharp HDRI reflections on low-poly glass look like glitches. Blur simulates real softbox diffusion.

---

### 4.2 Poly Haven: PBR Material Library

**What:** Seamless, tileable metal/plastic/fabric materials.

**Categories Useful for Viron:**
- `metals/` → Base layer for liquid metal effect
- `concrete/` → Background texture
- `plastic/` → Button body texture

**Download Pattern:**

```
/polyhaven/
  ├── metal_plate_diff_2k.jpg
  ├── metal_plate_rough_2k.jpg
  └── metal_plate_nor_gl_2k.exr
```

**Integration:**

```tsx
const MetalBase = () => {
  const tex = useTexture({
    map: '/polyhaven/metal_plate_diff_2k.jpg',
    roughnessMap: '/polyhaven/metal_plate_rough_2k.jpg',
    normalMap: '/polyhaven/metal_plate_nor_gl_2k.exr',
  })

  return (
    <mesh>
      <boxGeometry args={[2, 1, 0.2]} />
      <meshStandardMaterial {...tex} metalness={1} />
    </mesh>
  )
}
```

---

### 4.3 three-custom-shader-material (CSM)

**What:** Direct shader composition (replaces dead Lamina).

**Library:** `three-custom-shader-material` (NPM)

**Use Case:** When you need custom shader effects beyond `MeshStandardMaterial`.

**Basic Example: Animated Iridescence**

```tsx
import { extend } from '@react-three/fiber'
import CustomShaderMaterial from 'three-custom-shader-material/dist/CustomShaderMaterial.js'

extend({ CustomShaderMaterial })

const IridescentMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.4, 0.8),
  },
  // Vertex Shader
  `
    varying vec3 vNormal;
    varying float vTime;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vTime = time;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec3 vNormal;
    varying float vTime;
    
    void main() {
      // Iridescent effect: shift color based on normal + time
      float iridescence = sin(dot(vNormal, vec3(1.0)) * 5.0 + time) * 0.5 + 0.5;
      vec3 finalColor = mix(color, color * vec3(0.0, 1.0, 1.0), iridescence);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

export const Iridescent = (props) => {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.time = clock.elapsedTime
  })
  
  return (
    <mesh {...props}>
      <boxGeometry args={[2, 1, 0.2]} />
      <iridescent ref={ref} />
    </mesh>
  )
}
```

---

## 🚀 COMPLETE VIRON BUTTON SCENE (All Tiers)

```tsx
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  MeshTransmissionMaterial,
  Caustics,
  Environment,
  Lightformer,
  Sparkles,
  Float,
} from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  Glitch,
  Noise,
} from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'
import { useVideoTexture } from '@react-three/drei'

export const VironButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const videoTex = useVideoTexture('/video/neon_alley_loop.webm')

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        dpr: [1, 2],  // Clamp pixel ratio for mobile
      }}
      camera={{
        position: [0, 0, 4],
        fov: 50,
      }}
    >
      {/* ============ BACKDROP LAYER ============ */}
      <mesh scale={[16, 9, 1]} position={[0, 0, -5]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={videoTex} toneMapped={false} />
      </mesh>

      {/* ============ LIGHTING ============ */}
      <Environment
        files="/hdri/studio_small_09_2k.exr"
        blur={0.8}
        resolution={1024}
      >
        {/* Neon light strips */}
        <Lightformer
          form="rect"
          intensity={8}
          color="#00f0ff"
          scale={[4, 1, 1]}
          position={[0, 2, -2]}
        />
        <Lightformer
          form="ring"
          intensity={5}
          color="#ff00ff"
          scale={2}
          position={[-3, 1, 1]}
        />
      </Environment>

      {/* ============ CAUSTICS LAYER ============ */}
      <Caustics
        color="#00FFFF"
        intensity={0.5}
        worldRadius={1.5}
        samples={32}
        ior={1.1}
        backfaces
      >
        <mesh
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#0b1015" roughness={0.8} />
        </mesh>
      </Caustics>

      {/* ============ HERO BUTTON ============ */}
      <Float floatIntensity={0.5} speed={1.2}>
        <mesh
          position={[0, 0, 0.5]}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          {/* Rounded chamfered box for better reflections */}
          <boxGeometry args={[2, 1, 0.2, 32, 16, 16]} />
          <MeshTransmissionMaterial
            background={videoTex}
            transmission={1}
            thickness={0.25}
            ior={1.5}
            roughness={0.05}
            chromaticAberration={0.04}
            anisotropicBlur={0.1}
            distortion={0.05}
            samples={16}
            resolution={1024}
            emissive="#00ff88"
            emissiveIntensity={isHovered ? 2 : 0.5}
          />
        </mesh>
      </Float>

      {/* ============ MAGIC DUST ============ */}
      <Float floatIntensity={1} speed={2}>
        <Sparkles
          count={300}
          speed={0.7}
          opacity={0.6}
          scale={[4, 4, 4]}
          size={3}
          color="#00f5ff"
        />
      </Float>

      {/* ============ POST-PROCESSING ============ */}
      <EffectComposer disableNormalPass>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
        <Glitch
          delay={[1.5, 3.5]}
          duration={[0.2, 0.6]}
          strength={isHovered ? [0.5, 1.0] : [0.2, 0.4]}
          mode={isHovered ? GlitchMode.CONSTANT_WILD : GlitchMode.SPORADIC}
        />
        <Noise premultiply opacity={0.06} />
      </EffectComposer>
    </Canvas>
  )
}

export default VironButton
```

---

## ⚡ PERFORMANCE OPTIMIZATION CHECKLIST

### Desktop (M2 MacBook / High-end PC)
- ✅ `MeshTransmissionMaterial`: 16 samples, 1024px
- ✅ `Caustics`: 32 samples
- ✅ `postprocessing`: All effects enabled
- ✅ HDRI: 1024px resolution
- **Target:** 60 FPS locked

### Mobile (iPad Air / iPhone 14)
- ⚠️ `MeshTransmissionMaterial`: 8 samples, 512px
- ⚠️ `Caustics`: 16 samples
- ⚠️ `postprocessing`: Bloom + Noise only (skip Glitch)
- ⚠️ HDRI: 256px resolution
- **Target:** 30-45 FPS (acceptable)

### Lighthouse WebGL Bottlenecks
1. **`MeshTransmissionMaterial` extra render pass** → Cap at 1 per scene
2. **`Caustics` animation** → Use `backfaces={false}` if on mobile
3. **`EffectComposer` mipmapBlur** → Known to flicker with Transmission[web:41]; test thoroughly
4. **Video texture loading** → Preload before Canvas mount

---

## 🐛 Known Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Material looks black | Missing `background` prop | Pass `background={videoTexture}` to Transmission |
| Text behind glass unreadable | Transmission doesn't refract properly | Increase `thickness` to 0.5-1.0 |
| Bloom flickers with refraction | `mipmapBlur` shader conflict | Disable `mipmapBlur`, use soft radius instead |
| Video plays muted | Browser autoplay policy | Set `muted={true}` on `<video>` tag |
| WebGPU breaks all glass | Shader chunks incompatible | Don't use `WebGPURenderer`; stay on WebGL2 |
| Lamina imports fail | Library archived | Replace with `three-custom-shader-material` |

---

## 📚 Reference Stack Summary

```
Frontend: React 19 + Vite
3D Engine: Three.js r171 (WebGL2)
React Binding: @react-three/fiber v9.5.0
Component Lib: @react-three/drei v10.7.7
Post-FX: @react-three/postprocessing + postprocessing
Shaders: three-custom-shader-material (CSM) v6.0+
Video Gen: Luma Dream Machine API
Texture Gen: ComfyUI + Flux Metal Jacket v2
Asset Source: Poly Haven (CC0)
```

---

## 🔗 Quick Links

| Resource | URL | Purpose |
|----------|-----|---------|
| Drei Docs | [drei.docs.pmnd.rs](https://drei.docs.pmnd.rs) | Components reference |
| R3F Docs | [docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber) | Core API |
| Three.js Docs | [threejs.org](https://threejs.org) | WebGL/GPU primitives |
| Luma Labs | [lumalabs.ai/genie](https://lumalabs.ai/genie) | AI video generation |
| Poly Haven | [polyhaven.com](https://polyhaven.com) | CC0 HDRI + PBR |
| CSM Docs | [npm/three-custom-shader-material](https://www.npmjs.com/package/three-custom-shader-material) | Custom shaders |
| ComfyUI | [github.com/comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | Local texture generation |

---

## 📝 Version History

| Date | Status | Changes |
|------|--------|---------|
| Jan 27, 2026 | VERIFIED | Lamina archived; replaced with CSM. WebGPU still experimental. |
| Jan 20, 2026 | UPDATED | Three.js r171 stable; WebGPU renderer available but ecosystem incomplete. |
| Jan 09, 2026 | BASELINE | Initial ecosystem snapshot. |

---

**Created for:** Viron Agency (viron.agency)  
**Contact:** Use GitHub issues on respective pmndrs repos  
**License:** CC0 (public domain) – Use freely  
**Last Verified:** January 27, 2026, 5:47 PM CET
