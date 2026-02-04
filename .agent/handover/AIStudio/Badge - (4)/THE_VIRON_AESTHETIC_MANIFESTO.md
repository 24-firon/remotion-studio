# 🎨 THE VIRON AESTHETIC MANIFESTO (V1.0)

**Philosophy:** We do not build "videos". We build **UI in Motion**.
**Core Metaphor:** The "Industrial Monolith". Heavy, precise, machined.

---

## 🏗️ 1. THE LAWS OF PHYSICS (NO CSS)

> **"If it moves, it has mass."**

1.  **CSS Keyframes are Forbidden:**
    - Do not use `@keyframes run { ... }`.
    - Use Remotion `spring()`. Every motion must be a result of tension, friction, and mass.
2.  **Hydraulic Coupling:**
    - Elements do not just "appear". They slide out, push others aside, or unfold.
    - Reference: `SilverButton.tsx` (State change triggers geometric recoil).

---

## 💎 2. THE MATERIAL SYSTEM (THE SILVERT)

Viron is defined by **Materials**, not Colors.

1.  **Silver Standard:**
    - We do not use flat grey (`#ccc`).
    - We use **Metallic Shaders** (Three.js `MeshStandardMaterial`) with Environment Mapping (HDRI).
    - In 2D (CSS), we simulate this with complex HSL gradients and subtle borders/shadows (neumorphism evolved).
2.  **Glass (The Lens):**
    - UI Overlays are glass panes (`backdrop-filter: blur`).
    - They have thickness (border-light-source) and refraction.

---

## 📐 3. GEOMETRY & TYPOGRAPHY

1.  **Rounded Authenticity:**
    - `RoundedBoxGeometry` (Three.js) fits `border-radius: lg` (Tailwind).
    - Curves are continuous (G2 Continuity implies "premium").
2.  **Kinetic Type:**
    - Text is a physical object. It enters letter-by-letter (staggered spring).
    - Font: Inter or Geist Mono. Industrial, readable code-like.

---

**Sanity Check for Agents:**
Before creating a component, ask: _"Does this look like a SaaS dashboard or a cartoon?"_
If cartoon -> **DELETE.**
If SaaS -> **SHIP.**
