# ⚙️ RULES_TECHNICAL.md – Technische Regeln

**Version:** 1.0 (Consolidated)  
**Status:** MANDATORY for all technical implementation  
**Scope:** Design-DNA, Lighting, Hardware Constraints, Viron-Specific Technical Standards

---

## 🎯 Overview

Diese Datei konsolidiert alle technischen Regeln aus dem VIRON Repository:
- The Viron Aesthetic Manifesto (Design-DNA)
- Lighting & Geometry Rules (80% Grey Rule)
- Hardware Laws (RAM/Concurrency)
- Environment & Infrastructure Standards

---

## 🎨 1. THE VIRON AESTHETIC MANIFESTO (Design-DNA)

**Quelle:** [`THE_VIRON_AESTHETIC_MANIFESTO.md`](../THE_VIRON_AESTHETIC_MANIFESTO.md)

### 1.1 Philosophy

> **"We do not build 'videos'. We build UI in Motion."**

**Core Metaphor:** The "Industrial Monolith" – Heavy, precise, machined.

### 1.2 The Laws of Physics (No-CSS Law)

> **"If it moves, it has mass."**

| Law | Beschreibung | Implementation |
|-----|--------------|----------------|
| **No CSS Keyframes** | `@keyframes` sind STRENGSTENS VERBOTEN | Nutze `spring()` Mechanics |
| **Hydraulic Coupling** | Elemente erscheinen nicht einfach | Slide out, push aside, unfold |
| **Mass-based Motion** | Jede Bewegung hat Spannung, Reibung, Masse | `spring({mass, tension, friction})` |

**Reference:** `SilverButton.tsx` – State change triggers geometric recoil.

### 1.3 The Material System (The Silver Standard)

Viron is defined by **Materials**, not Colors.

#### Silver Standard
- **Nie:** Flat grey (`#ccc`)
- **Immer:** Metallic Shaders (Three.js `MeshStandardMaterial`) mit Environment Mapping (HDRI)
- **2D Simulation:** Complex HSL gradients, subtle borders/shadows (neumorphism evolved)

#### Glass (The Lens)
- UI Overlays = Glass panes (`backdrop-filter: blur`)
- Thickness (border-light-source) und Refraction

### 1.4 Geometry & Typography

| Element | Standard |
|---------|----------|
| **Rounded Authenticity** | `RoundedBoxGeometry` passt zu `border-radius: lg` (Tailwind) |
| **Curves** | G2 Continuity = "premium" |
| **Kinetic Type** | Text = physisches Objekt, enters letter-by-letter (staggered spring) |
| **Fonts** | Inter oder Geist Mono – Industrial, readable, code-like |

### 1.5 Sanity Check

> Before creating a component, ask: **"Does this look like a SaaS dashboard or a cartoon?"**
>
> If cartoon → **DELETE.**
> If SaaS → **SHIP.**

---

## 💡 2. PROJECT LIGHTING & GEOMETRY RULES

**Quelle:** [`src/PROJECT_RULES_LIGHTING.md`](../src/PROJECT_RULES_LIGHTING.md)  
**Established:** V43 – Do not violate.

### 2.1 Geometry Rules

| Element | Spezifikation |
|---------|---------------|
| **HIGH POLY BUTTON** | Main button capsule = "Vector Smooth" |
| **Capsule Specs** | `capsuleGeometry args={[0.92, 4.0, 64, 256]}` |
| | CapSegments: 64, Radial: 256 |
| **Reason** | User complaint: "low poly" / "straight lines" on zoom |

### 2.2 The 80% Grey Rule (Lighting & Color)

| Verboten | Pflicht | Alternative |
|----------|---------|-------------|
| **NO PURE BLACK** | `#000000` ist verboten | `#202020` oder `#303030` |
| **NO PURE WHITE** | `#FFFFFF` avoiden | Max highlight `#F0F0F0` |
| **NO FLAT COLORS** | Constant flat colors banned | Noise/Texture/Stripes |

#### Backstop Cylinder
- **Farbe:** `#303030`
- **Zweck:** Hinter allen Scenes um black voids zu verhindern

#### Inter-Reflection
- Objects should be close enough to reflect in each other ("Abfärben")

### 2.3 Composition Rules

| Rule | Beschreibung | Action |
|------|--------------|--------|
| **NO PARALLEL LINES** | Vermeide 0°, 90°, 180° alignments | Tilt auf X, Y, Z Achsen |
| **MANDATORY MOVEMENT** | Static scenes = broken scenes | `rotateY` environment oder `float` elements |
| **COMPLEX SHAPES** | Keine single big rectangles | Arrays (Stripes, Scales), Curved Forms, Asymmetry |

### 2.4 The "Strip Gradient" Technique

Statt 1 flat wall:
- Generiere **50 tiny strips** side-by-side
- Shifting colors pro Strip
- **Ergebnis:** Physical, "real" gradients + geometry detail in reflections

---

## ⚙️ 3. VIRON HARDWARE LAWS

**Quelle:** [`handover/meta/VIRON_HARDWARE_LAWS.md`](handover/meta/VIRON_HARDWARE_LAWS.md)

**Scope:** The intersection of Code, Physics, and Silicon.  
**Bridge:** Connects `Badge 2 (3D)` with `Badge 7 (System)`.

### 3.1 The Concurrency/Complexity Ratio

Wir nutzen nicht einfach `os.cpus()`. Wir skalieren Concurrency basierend auf **Scene Weight**.

| Scene Type | Complexity | RAM Factor | Concurrency Formula |
|:-----------|:-----------|:-----------|:--------------------|
| **Standard 2D** | Low (Text, Images) | 2GB / Thread | `ramGB / 2` |
| **Heavy 3D** | High (Three.js, PBR) | 4GB / Thread | `ramGB / 4` |
| **Volumetric** | Critical (Caustics, Smoke) | 8GB / Thread | `ramGB / 8` |

**The Law:** Vor Rendering, prüfe `Composition` metadata. Wenn `type === '3D'`, wende **Heavy 3D** limiter an.

### 3.2 The WebGPU Mandate

- **Browser:** Chrome/Edge (Chromium) only target
- **Flag:** `--enable-unsafe-webgpu` oft required für dev-preview features
- **Fallback:** WebGL2. **NEVER** Canvas2D für 3D scenes.

### 3.3 Shader Compilation Costs

- **Rule:** Pre-warm shaders
- **Why:** Heavy shader auf Frame 0 verursacht "stutter" (long first frame render)
- **Fix:** Off-screen rendering von key materials bei `frame={-1}` während initialization

---

## 🏗️ 4. ENVIRONMENT & INFRASTRUCTURE

**Quelle:** [`gemini.md`](../gemini.md)

### 4.1 System Specs

| Component | Spec |
|-----------|------|
| **OS** | Windows 11 |
| **Node** | v22.17.0 (Strict Version Lock) |
| **Engine** | Remotion + FFmpeg 6.0+ |
| **Rendering** | Deterministic 60FPS |

### 4.2 Web-Safe Architecture

| Requirement | Rule |
|-------------|------|
| **Component Portability** | Alle Komponenten müssen kompatibel mit `@remotion/player` sein |
| **Node APIs** | Keine Node.js-only APIs (`fs`, `path`) in Rendering-Komponenten |
| **Assets** | Nutze `staticFile()` oder `public/` assets |
| **Sub-Component Isolation** | Sub-Komponenten setzen NIE globalen/scene background |

### 4.3 Styling & Theming

| Aspekt | Standard |
|--------|----------|
| **Primary** | TailwindCSS (Utility-first) |
| **Theme Source** | `.agent/skills/remotion-best-practices/rules/viron-core/theme.md` |
| **Consistency** | Keine ad-hoc style objects außer für dynamic interpolation |

---

## 🎬 5. REMOTION-SPECIFIC RULES

**Quelle:** Global Skill [`remotion-best-practices`](../../../.gemini/antigravity/global_skills/remotion-best-practices/)

### 5.1 Animation Standards

| Statt... | Nutze... |
|----------|----------|
| CSS Transitions | `spring()` |
| CSS Keyframes | `interpolate()` |
| Random | `random()` mit seed |
| Time-based | Frame-based |

### 5.2 Composition Rules

- ALLE Versionen als unique Compositions in `src/Root.tsx` registrieren
- Parameter-Defaults in `calculateMetadata` definieren
- Reuse patterns aus `patterns/` Directory

### 5.3 Asset Handling

| Asset Type | Methode |
|------------|---------|
| **Images** | `staticFile()` oder `<Img>` |
| **Videos** | `<Video>` mit `staticFile()` |
| **Audio** | `<Audio>` oder `useAudioData()` |
| **Fonts** | `@import` in CSS oder `staticFile()` |

---

## 🧪 6. VIRON-SPECIFIC PATTERNS

### 6.1 Shaders & VFX

**Source:** [`src/learnings/PATTERN_Advanced_Shaders.md`](../src/learnings/PATTERN_Advanced_Shaders.md)

- Complex materials via Custom Shaders
- Post-Processing Stack (Bloom, DoF, Chromatic Aberration)
- Procedural Patterns (Noise, Voronoi)

### 6.2 Lighting Patterns

**Source:** [`src/learnings/PATTERN_LIGHTING_GRADIENTS.md`](../src/learnings/PATTERN_LIGHTING_GRADIENTS.md)

- HDRI Environment Mapping
- Multi-light Setups
- Reflection Probes

### 6.3 Hard-Won Knowledge

**Source:** [`src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md`](../src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md)

- Lessons learned aus V1-V42
- Common pitfalls und Lösungen

---

## 📋 7. TECHNICAL CHECKLIST

Vor Implementierung prüfen:

- [ ] No-CSS Law beachtet? (keine `@keyframes`)
- [ ] 80% Grey Rule beachtet? (kein `#000`, kein `#FFF`)
- [ ] High Poly Geometry? (CapSegments >= 64)
- [ ] Mandatory Movement? (keine static scenes)
- [ ] No Parallel Lines? (Tilt auf X, Y, Z)
- [ ] Complex Shapes? (Arrays, Curves, Asymmetry)
- [ ] Web-Safe Architecture? (keine Node APIs)
- [ ] Components in `src/Root.tsx` registriert?
- [ ] Hardware Laws beachtet? (Concurrency/Complexity)

---

## 🔗 Verwandte Dateien

| Thema | Datei |
|-------|-------|
| Design-DNA | [`THE_VIRON_AESTHETIC_MANIFESTO.md`](../THE_VIRON_AESTHETIC_MANIFESTO.md) |
| Lighting Rules | [`src/PROJECT_RULES_LIGHTING.md`](../src/PROJECT_RULES_LIGHTING.md) |
| Hardware Laws | [`handover/meta/VIRON_HARDWARE_LAWS.md`](handover/meta/VIRON_HARDWARE_LAWS.md) |
| Shader Patterns | [`src/learnings/PATTERN_Advanced_Shaders.md`](../src/learnings/PATTERN_Advanced_Shaders.md) |
| Lighting Patterns | [`src/learnings/PATTERN_LIGHTING_GRADIENTS.md`](../src/learnings/PATTERN_LIGHTING_GRADIENTS.md) |
| Hard-Won Knowledge | [`src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md`](../src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md) |
| Global Skill | `.agent/skills/remotion-best-practices/SKILL.md` |

---

_RULES_TECHNICAL.md v1.0 | Consolidated from 120+ rule files | 2026-02-01_
