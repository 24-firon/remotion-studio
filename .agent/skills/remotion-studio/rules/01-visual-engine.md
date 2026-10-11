# Viron Visual Engine Standards

## 1. THE RENDER ENGINE

Use `@remotion/three` and `<ThreeCanvas>`.

- **Hybrid Strategy:** Prefer `gl={{ renderer: 'webgpu' }}` for local RTX previews. Fallback to `webgl` for headless/CI if unstable.
- **Layout:** `layout="none"` for sequences inside canvas.

## 2. REALISTIC LIGHTING (The Physics Standard)

We do not fake lighting with grey colors. We use physical values.

### The HDRI Standard

Use `<Environment>` from `@react-three/drei` ONLY with custom procedural HDRIs.

> **⚠️ ALL REAL-IMAGE ENVIRONMENT PRESETS ARE FORBIDDEN**

- **BANNED:** `preset="city"`, `preset="studio"`, `preset="apartment"`, `preset="forest"`, `preset="warehouse"`, `preset="park"`, `preset="lobby"`, `preset="dawn"`, `preset="night"`, `preset="sunset"`
- **REASON:** Real images reflect in chrome/glass materials and break the abstract aesthetic. Users will see rooms, buildings, trees in their shiny objects.
- **ALLOWED:** Only manual lighting (ambient + directional + spot) or custom abstract HDRIs.

**Correct Lighting Pattern (NO Environment preset):**

```tsx
// Abstract lighting without real-world reflections
<ambientLight intensity={0.5} />
<SpotLight position={[10, 10, 10]} intensity={500} castShadow />
<directionalLight position={[-5, 5, 5]} intensity={0.5} />
```

- **Background:** Always set explicitly with `<color attach="background" args={['#09090b']} />`

### Tone Mapping (AgX Mandate)

The "80% Grey Rule" was a workaround for bad tone mapping.

- **Standard 2026:** Use `AgXToneMapping`. It handles bright highlights without washing out colors (unlike ACES).
- **Code:**
  ```tsx
  <ThreeCanvas gl={{ toneMapping: THREE.AgXToneMapping, toneMappingExposure: 1.0 }}>
  ```

## 3. STYLIZED RENDERING (NPR / Toon)

For non-photoreal looks, abandon PBR logic.

- **Material:** Use `MeshToonMaterial` with a `gradientMap` (Texture) for hard stepping.
- **Outlines:** Use the `<Outlines>` component from Drei.
- **Tone Mapping:** Disable or set to `LinearToneMapping` to preserve pure colors.

## 4. ASSET PIPELINE (Meshopt > Draco)

For high-end automation, loading speed > bandwidth.

- **Compression:** Use **Meshopt**. It decodes significantly faster than Draco, preventing frame drops during rapid scene loading.
- **Memory Safety:** Explicitly clear Three.js cache between renders if running in a long-lived process.
  ```typescript
  THREE.Cache.clear(); // Call this when unmounting a heavy scene
  ```
