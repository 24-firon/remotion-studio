# Viron Advanced Materials (The Jewel Pattern)

2:
3: ## 1. THE PHILOSOPHY
4:
5: High-End Viron objects are complex composites, not single meshes.
6: They consist of a **Container (Glass)** and a **Core (Metal)**.
7:
8: ## 2. THE RECIPE
9:
10: ### A. The Glass Container (Outer Layer)
11:
12: Use `MeshTransmissionMaterial` to simulate heavy, refractive crystal.
13:
14: `tsx
15: <MeshTransmissionMaterial 
16:     backside
17:     backsideThickness={0.5}
18:     thickness={0.5}          // Volume
19:     roughness={0.05}         // Perfect Polish
20:     transmission={1}         // 100% Clear
21:     ior={1.5}                // Refractive Index (Glass)
22:     chromaticAberration={0.04} // Premium Lens Flaw
23:     anisotropicBlur={0.1}
24:     color="#ffffff"
25: />
26: `
27:
28: ### B. The Chrome Core (Inner Layer)
29:
30: Use `MeshPhysicalMaterial` for the opaque, metallic heart.
31:
32: `tsx
33: <meshPhysicalMaterial 
34:     color="#ffffff"
35:     metalness={1.0}         // 100% Metal
36:     roughness={0.1}         // Polished but realistic
37:     clearcoat={1.0}         // Lacquer Finish
38:     emissive="#000000"
39: />
40: `
41:
42: ## 3. LIGHTING REQUIREMENT

> ⚠️ **NO HDRI PRESETS** (See `01-visual-engine.md`)
> Real-image environment presets are **FORBIDDEN** because they reflect
> in chrome/glass materials and break the abstract aesthetic.

**Correct Lighting Pattern (Manual):**

```tsx
// Abstract lighting without real-world reflections
<ambientLight intensity={0.5} />
<SpotLight position={[10, 10, 10]} intensity={500} castShadow />
<directionalLight position={[-5, 5, 5]} intensity={0.5} />
```

- **ToneMapping:** `AgXToneMapping` (Exposure 1.0-1.2).
- **Shadows:** `ContactShadows` for grounding.
- **Background:** Always set explicitly with `<color attach="background" args={['#09090b']} />`
