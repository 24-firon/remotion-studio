# 🎬 Viron Button: Complete Implementation Guide

## A Programmatic Video Engine for High-End Cinematic UIs

**Verified Against (Jan 27, 2026):**

- Three.js r171
- React 19.0.0
- @react-three/fiber v9.5.0
- @react-three/drei v10.7.7

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

## 🍬 TIER 1: "Eye Candy" Stack (The Glass)

### 1.1 MeshTransmissionMaterial (The Hero)

**What it is:** Enhanced `MeshPhysicalMaterial` that refracts the scene behind it.
**Library:** `@react-three/drei` (built-in)

**Performance Notes:**

- `MeshTransmissionMaterial` causes an **extra render pass** (expensive!)
- **Mobile:** Use 8 samples, 512px resolution
- **Desktop:** 16+ samples, 1024px safe

---

## 🚀 Implementation Checklist

### Phase 1: Setup

- [ ] Bootstrap Vite + React 19 + TypeScript
- [ ] Install dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `three-custom-shader-material`

### Phase 2: Core

- [ ] Implement Iridescent Glass (Recipe from PATTERN_Advanced_Shaders.md)
- [ ] Use Abstract Studio HDRIs for reflections (NO real-world objects)
- [ ] Connect video texture to backdrop
