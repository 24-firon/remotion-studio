# Pattern: Realistic Silver Metal in React Three Fiber

**Goal:** A polished, liquid silver 3D button with smooth glint animation, no artifacts, no visible object reflections.

---

## 1. GEOMETRY: Use CapsuleGeometry, NOT RoundedBox

**Problem:** `RoundedBox` creates a visible "Frame" at high radii due to its beveled edge geometry.

**Solution:** `CapsuleGeometry` – mathematically a cylinder with hemispheres. No distinct edge.

```tsx
<mesh rotation={[0, 0, Math.PI / 2]}> {/* Horizontal */}
    <capsuleGeometry args={[radius, length, capSegments, radialSegments]} />
    <meshPhysicalMaterial ... />
</mesh>
```

**Typical Values:** `args={[0.9, 4.0, 8, 128]}` (128 segments for smoothness).

---

## 2. ENVIRONMENT: Use HDRI Presets, NOT Custom Lightformers

**Problem:** Custom Lightformer setups often have incorrect positioning (Z-axis confusion). Metal reflects what's in FRONT of it, but Lightformers were placed BEHIND/AROUND it.

**Solution:** Use drei's built-in HDRI presets. They are 360° photos, guaranteed to work.

### Preset Comparison:

| Preset      | Look                        | Use Case                         |
| ----------- | --------------------------- | -------------------------------- |
| `studio`    | Neutral white photography   | **BEST FOR SILVER** (no objects) |
| `apartment` | Warm interior, furniture    | Visible object reflections       |
| `city`      | Outdoor, buildings, sky     | Visible urban reflections        |
| `lobby`     | Neutral indoor, some detail | Subtle reflections               |

**The Rule:** For "clean silver" without visible objects, use `preset="studio"`.

---

## 3. ANIMATION: Rotate the Environment, NOT the Object

**Goal:** A "glint" that travels across the surface.

**Method:** Animate `environmentRotation` of the `<Environment>` component.

```tsx
const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

<Environment
  preset="studio"
  background={false}
  environmentRotation={[0, envRotationY, 0]} // Y-axis rotation
/>;
```

**Why:** Rotating the object breaks scene composition. Rotating the environment keeps the object stable while the "light source" appears to move.

---

## 4. MATERIAL: MeshPhysicalMaterial Settings

**Standard Silver Recipe:**

```tsx
<meshPhysicalMaterial
    color="#ffffff"           // White base for pure silver
    metalness={1.0}           // Fully metallic
    roughness={0.08 to 0.15}  // Low = mirror, Higher = satin
    envMapIntensity={1.5}     // Boost reflection brightness
    clearcoat={0.5 to 1.0}    // "Wet" layer for extra shine
    clearcoatRoughness={0.0}  // Smooth clearcoat
/>
```

**Notes:**

- `roughness: 0.0` = Perfect mirror (may look CG).
- `roughness: 0.1-0.15` = Polished silver (more realistic).
- `envMapIntensity` controls how bright the reflections are.

---

## 5. RENDERER SETTINGS: Eliminate Pixels

**Problem:** Low DPI rendering creates visible pixels/grain.

**Solution:** Force high DPI in `ThreeCanvas`:

```tsx
<ThreeCanvas
    dpr={[1.5, 3]}  // Force Retina rendering
    gl={{
        toneMappingExposure: 1.2,  // Brightness adjustment
        antialias: true            // Smooth edges
    }}
>
```

---

## COMPLETE RECIPE (V24 Standard):

```tsx
import { Environment } from '@react-three/drei';

// In component:
const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

<Environment
    preset="studio"
    background={false}
    environmentRotation={[0, envRotationY, 0]}
/>

<mesh rotation={[0, 0, Math.PI / 2]}>
    <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
    <meshPhysicalMaterial
        color="#ffffff"
        metalness={1.0}
        roughness={0.12}
        envMapIntensity={1.5}
        clearcoat={0.8}
        clearcoatRoughness={0.0}
    />
</mesh>
```

**Result:** Clean, bright silver with smooth glint animation. No frames, no object reflections, no pixels.
