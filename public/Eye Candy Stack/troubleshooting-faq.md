# Viron Button: Troubleshooting & FAQ
## Common Issues, Root Causes, Solutions (Jan 2026)

---

## 🔴 CRITICAL ISSUES

### 1. "MeshTransmissionMaterial looks completely black"

**Symptoms:**
- Glass material renders as solid black
- No refraction visible
- Looks like hole in scene

**Root Cause:**
Missing or incorrect `background` prop. The material needs a texture/color to refract.

**Solutions:**

```tsx
// ❌ WRONG
<MeshTransmissionMaterial transmission={1} />

// ✅ CORRECT (Option A: Video backdrop)
const videoTex = useVideoTexture('/video/loop.mp4')
<MeshTransmissionMaterial 
  background={videoTex}
  transmission={1}
/>

// ✅ CORRECT (Option B: HDRI + environment)
<Environment files="/hdri/studio_small_09_2k.exr" />
<MeshTransmissionMaterial 
  transmission={1}
  ior={1.5}
/>

// ✅ CORRECT (Option C: Scene render target)
const fbo = useFBO()
<MeshTransmissionMaterial 
  buffer={fbo.texture}
  transmission={1}
/>
```

**Diagnostic:**
1. Check if `background` is a valid THREE.Texture
2. Verify video is loaded: `console.log(videoTex)` should show Texture object
3. Test with Environment HDRI first (simplest case)

---

### 2. "WebGPU breaks all materials"

**Symptoms:**
- App works fine with WebGLRenderer
- Switch to WebGPURenderer → black scene / errors
- "Shader chunk not found" errors

**Root Cause:**
`MeshTransmissionMaterial`, `Caustics`, and postprocessing use legacy shader chunks (`onBeforeCompile`) incompatible with WebGPU's TSL (Three Shader Language).

**Solution:**
**Do NOT use WebGPURenderer yet.** Stay on WebGL2.

```tsx
// ✅ CORRECT (Jan 2026)
<Canvas gl={{ antialias: true }}>
  {/* Uses WebGLRenderer by default */}
</Canvas>

// ❌ WRONG (Will break)
<Canvas gl={{ 
  WebGPURenderer: true  // ← Don't do this
}}>
```

**Timeline:**
- ✅ WebGL2: Stable, use NOW
- ⏳ WebGPU: Expected production-ready Q3 2026
- 🔮 TSL migration: When `drei` + `postprocessing` rewrite their materials

---

### 3. "Lamina imports don't work"

**Error:**
```
Module not found: lamina/vanilla
Cannot find module '@react-three/lamina'
```

**Root Cause:**
Lamina was archived June 2025. The library is read-only on GitHub.

**Solution:**
Replace with `three-custom-shader-material`:

```tsx
// ❌ OLD (broken)
import { LayerMaterial, Depth, Fresnel } from 'lamina'

<LayerMaterial>
  <Depth colorA="blue" colorB="red" />
  <Fresnel color="white" />
</LayerMaterial>

// ✅ NEW (working)
import CustomShaderMaterial from 'three-custom-shader-material/dist/CustomShaderMaterial.js'

const material = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader: `...`,
  fragmentShader: `...`,
  uniforms: { /* ... */ }
})
```

**Migration Path:**
1. Remove `lamina` from package.json
2. Add `three-custom-shader-material`
3. Convert `<LayerMaterial>` to raw shader (see advanced-shaders.md)

---

### 4. "Bloom flickers with MeshTransmissionMaterial"

**Symptoms:**
- Bloom effect works fine separately
- Enable Bloom + MeshTransmissionMaterial together → flickering/strobing
- Only happens with `mipmapBlur={true}`

**Root Cause:**
Known conflict between Bloom's `mipmapBlur` and Transmission's extra render pass. Both modify framebuffer state incompletely.

**Solution:**
Disable `mipmapBlur`:

```tsx
// ❌ WRONG (flickers)
<Bloom mipmapBlur luminanceThreshold={0.6} />
<MeshTransmissionMaterial transmission={1} />

// ✅ CORRECT (no flicker)
<Bloom 
  mipmapBlur={false}           // ← Set to false
  luminanceThreshold={0.6}
  luminanceSmoothing={0.2}     // Instead, use smoothing
  intensity={1.5}
/>
```

**Alternative:**
Use selective bloom with render targets (advanced):

```tsx
// Exclude transmission material from bloom
<mesh layers={1}>
  <MeshTransmissionMaterial transmission={1} />
</mesh>

<Bloom layers={0} />  // Only render layer 0
```

---

## 🟡 PERFORMANCE ISSUES

### 5. "FPS drops to 20 with MeshTransmissionMaterial"

**Symptoms:**
- Scene runs 60 FPS without transmission
- Add MeshTransmissionMaterial → 20-30 FPS
- Especially bad on M2 Mac, Intel integrated GPU

**Root Cause:**
Transmission causes an **extra render pass** of the entire scene. At 1024px resolution with 16 samples = expensive.

**Performance Profile:**
- WebGL default: ~60 FPS (no cost)
- + Transmission (1024px, 16 samples): -40 FPS → ~20 FPS
- + Caustics: -10 FPS → ~10 FPS
- + Postprocessing Bloom: -5 FPS → ~5 FPS

**Solutions (Priority Order):**

**Option A: Lower resolution (Fastest)**
```tsx
<MeshTransmissionMaterial
  samples={8}           // 16 → 8 (50% faster)
  resolution={512}      // 1024 → 512 (75% faster)
  transmission={1}
/>
// Result: ~40 FPS (acceptable)
```

**Option B: Use transmissionSampler (Fast)**
```tsx
<MeshTransmissionMaterial
  transmissionSampler={true}  // Reuse THREE's internal buffer
  samples={6}
  transmission={1}
/>
// Result: ~45 FPS (faster, but lower quality)
```

**Option C: Reduce scene complexity**
- Lower poly geometry (use LODs)
- Fewer lights
- Simpler postprocessing

**Option D: Platform-specific rendering**
```tsx
const isMobile = /iPhone|iPad|Android/.test(navigator.userAgent)

<MeshTransmissionMaterial
  samples={isMobile ? 6 : 16}
  resolution={isMobile ? 256 : 1024}
  transmission={1}
/>
```

---

### 6. "Video texture is black / not loading"

**Symptoms:**
- Video file exists in public/
- VideoTexture doesn't show
- Backdrop is black

**Root Cause:**
Browser autoplay policy blocks video, or CORS issue, or video not found.

**Solutions:**

```tsx
import { useVideoTexture } from '@react-three/drei'

// ✅ CORRECT
const BackdropVideo = () => {
  const tex = useVideoTexture(
    '/video/loop.webm',
    {
      muted: true,           // ← Critical for autoplay
      loop: true,
      playsInline: true,     // iOS requirement
    }
  )

  return (
    <mesh scale={[16, 9, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  )
}

// ❌ WRONG (video won't load)
<useVideoTexture('/video/loop.mp4') />  // ← Not a hook, no config
```

**Debug Checklist:**
1. Open DevTools → Network → search for `.webm` or `.mp4`
   - ✅ Status 200 = file found
   - ❌ Status 404 = wrong path
   - ❌ Status 206 = partial (CORS issue)

2. Check video properties:
```tsx
const tex = useVideoTexture('/video/loop.webm')
console.log(tex)  // Should log Texture object
console.log(tex.image)  // Should log HTMLVideoElement
console.log(tex.image.currentTime)  // Should show playback time
```

3. Verify format support:
```tsx
// WebM: Modern browsers (Chrome, Firefox, Edge)
// MP4: All browsers (larger file)
// Use WebM when possible (better codec)

// For wider compatibility:
<source src="/video/loop.webm" type="video/webm" />
<source src="/video/loop.mp4" type="video/mp4" />
```

---

### 7. "HDRI environment is too sharp / reflections look wrong"

**Symptoms:**
- Metal reflections look pixelated
- HDRI has visible compression artifacts
- Lighting looks flat

**Root Cause:**
HDRI resolution too low, or blur not applied.

**Solution:**

```tsx
// ❌ WRONG
<Environment files="/hdri/studio.hdr" resolution={512} />

// ✅ CORRECT
<Environment 
  files="/hdri/studio_small_09_2k.exr"  // Use .exr (lossless)
  resolution={1024}                     // Minimum for production
  blur={0.8}                            // Blur for softness
/>
```

**HDRI Quality Ladder:**
| Quality | File | Size | Blur | Use Case |
|---------|------|------|------|----------|
| Low | .hdr @ 1k | 2MB | 0.9 | Testing |
| Medium | .exr @ 2k | 10MB | 0.8 | Production mobile |
| High | .exr @ 4k | 40MB | 0.5 | Desktop hero |

**Tip:**
Download HDRIs from Poly Haven in `.exr` format (lossless). Don't use `.jpg` HDRIs.

---

## 🟢 MINOR ISSUES

### 8. "Sparkles don't animate"

**Symptoms:**
- Sparkles render but don't move
- No floating/breathing effect

**Root Cause:**
Sparkles need to be wrapped in `<Float>` for animation.

```tsx
// ❌ WRONG (static)
<Sparkles count={300} color="#00f5ff" />

// ✅ CORRECT (animated)
<Float floatIntensity={1} speed={2}>
  <Sparkles count={300} color="#00f5ff" />
</Float>
```

---

### 9. "Caustics don't appear / too faint"

**Symptoms:**
- Caustics component renders but effect invisible
- Or too subtle to notice

**Root Cause:**
- Intensity too low
- Sample count too low
- Light source position wrong

**Solution:**

```tsx
// ✅ Good caustics setup
<Caustics
  color="#00FFFF"        // Bright color
  intensity={0.7}        // 0.3-1.0 range
  samples={32}           // Min 32 for visible effect
  ior={1.1}              // Water-like
  backfaces={true}       // Essential for glass
  lightSource={[5, 5, -10]}  // Position light source
>
  {/* Objects that receive caustics */}
</Caustics>
```

---

### 10. "useVideoTexture returns undefined"

**Symptoms:**
- `const tex = useVideoTexture(...)`
- `tex` is undefined
- Component crashes trying to use it

**Root Cause:**
`useVideoTexture` is async. Texture loads after initial render.

**Solution:**

```tsx
// ✅ CORRECT (handle loading state)
const BackdropVideo = () => {
  const tex = useVideoTexture('/video/loop.webm', {
    muted: true,
    loop: true,
  })

  // If tex is undefined during loading, return loading state
  if (!tex) return null

  return (
    <mesh scale={[16, 9, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  )
}
```

Or use Suspense:

```tsx
<Suspense fallback={<Loading />}>
  <BackdropVideo />
</Suspense>
```

---

## 🔧 DEBUGGING TOOLS

### Performance Profiling

```tsx
import { Stats } from '@react-three/drei'

<Canvas>
  <Stats />  {/* Shows FPS, memory, geometry */}
  {/* Your scene */}
</Canvas>
```

**Reading the stats:**
- **FPS:** Target 60 desktop, 30+ mobile
- **MB:** Total VRAM used (cap at 200MB for mobile)
- **Geometry:** Count of vertices (lower = faster)

### Shader Debugging

```tsx
// Check which shader code is running
material.onBeforeRender = (renderer, scene, camera) => {
  console.log('Program:', material.program)
  console.log('Uniforms:', material.uniforms)
}
```

### Texture Debugging

```tsx
// Inspect texture properties
const tex = useVideoTexture('/video/loop.webm')

console.log({
  width: tex.image?.videoWidth,
  height: tex.image?.videoHeight,
  isPowerOf2: (tex.image?.videoWidth & (tex.image?.videoWidth - 1)) === 0,
  currentTime: tex.image?.currentTime,
  isPlaying: !tex.image?.paused,
})
```

---

## 📋 CHECKLIST: Pre-Launch

Before deploying Viron Button to production:

- [ ] Test on Chrome, Firefox, Safari, Edge (desktop)
- [ ] Test on iPhone 12+ and iPad Air (iOS)
- [ ] Test on Pixel 6+ and Galaxy S22 (Android)
- [ ] FPS locked at 60 desktop, ≥30 mobile
- [ ] Bloom doesn't flicker with transmission
- [ ] Video loads without CORS errors
- [ ] No console errors or warnings
- [ ] HDRI properly reflects on glass
- [ ] Caustics visible and animated
- [ ] Sparkles float smoothly
- [ ] Post-processing effects are performant
- [ ] Bundle size < 600KB (minified + gzipped)

---

## 📞 WHEN ALL ELSE FAILS

1. **Check GitHub Issues:**
   - [pmndrs/drei](https://github.com/pmndrs/drei/issues)
   - [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber/issues)
   - [mrdoob/three.js](https://github.com/mrdoob/three.js/issues)

2. **Minimal Reproduction:**
   - Create a CodeSandbox with just the failing component
   - Share link in GitHub issue
   - Include: browser, OS, GPU model

3. **Community Resources:**
   - [Three.js Discourse](https://discourse.threejs.org)
   - [Poimandres Discord](https://discord.gg/poimandres)
   - [Stack Overflow #three.js](https://stackoverflow.com/questions/tagged/three.js)

---

**Last Updated:** January 27, 2026  
**Verified Against:** Three.js r171, @react-three/fiber v9.5.0, @react-three/drei v10.7.7
