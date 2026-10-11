# 📘 KNOWLEDGE: THE VIRON DEEP DIVE

> **Context:** This document explains the _philosophy_ and _mechanics_ behind the Viron Industrial Look. It contains the "Why" and "How" of our decisions, stripped of bureaucratic constraints.

---

## 🎨 1. THE AESTHETIC MANIFESTO

### 1.1 Philosophy: The Industrial Monolith

- **Core Metaphor:** We are not building "web pages". We are simulating heavy, machined industrial objects.
- **The Look:** Precise, heavy, cold, expensive. Like a server rack or a CNC machine.
- **The Sanity Check:** Before shipping, ask: _"Does this look like a SaaS dashboard or a cartoon?"_
  - If Cartoon → **DELETE.**
  - If SaaS → **SHIP.**

### 1.2 The "Hydraulic Coupling" Concept

- **Observation:** In the physical world, things don't just "fade in". They displace space.
- **Implementation:** Elements should slide out, push others aside, or unfold.
- **Rule of Mass:** If it moves, it has mass. Use `spring({ mass: 2.0 })` to simulate weight. A heavy door closes differently than a paper card.

### 1.3 The "Silver Standard" (High PBR)

- **Material:** We prioritize **Materials** over Colors.
- **The Error:** Using flat grey (`#ccc`) looks cheap.
- **The Fix:** Use `MeshStandardMaterial` with `metalness: 1.0` and `roughness: 0.1` (Chrome).
- **The Secret:** Metal looks like nothing without an Environment. You _must_ use an HDRI (`Environment preset="studio"`) for the metal to have something to reflect.

---

## ⚙️ 2. HARDWARE & PERFORMANCE LAWS

### 2.1 The Concurrency Ratio

Three.js rendering is heavy. We cannot just use all CPU cores. We scale based on RAM per Thread.

| Scene Type      | Complexity | RAM Formula |
| :-------------- | :--------- | :---------- |
| **Standard 2D** | Low (Text) | `ramGB / 2` |
| **Heavy 3D**    | High (PBR) | `ramGB / 4` |
| **Volumetric**  | Critical   | `ramGB / 8` |

**Takeaway:** If you run out of memory, reduce concurrency, not visual quality.

### 2.2 Shader Compilation Costs

- **Problem:** The first frame often stutters because the GPU has to compile complex shaders.
- **Solution:** Render critical materials off-screen at `frame={-1}`. This forces the GPU to compile the shader before the animation starts.

---

## 📐 3. COMPOSITION SECRETS

### 3.1 "No Parallel Lines"

- **Concept:** Perfect alignment (0°, 90°) looks like computer graphics.
- **Fix:** Subtle tilts. Rotate objects by 2-5° on the X or Z axis. Imperfection creates realism. (The "Glint Snap").

### 3.2 "Mandatory Drift"

- **Concept:** A static 3D scene looks like a 2D image.
- **Fix:** Always add a subtle `sin(time)` drift to the camera or object. It makes the world feel "alive" and breathing.

### 3.3 The "Strip Gradient" Technique

- **Problem:** Large flat walls look boring.
- **Solution:** Instead of one big wall, generate 20 thin vertical strips side-by-side.
- **Result:** The edges of the strips catch light differently, creating a "physical gradient" and adding detail to reflections.

---

_Authenticity Source: `THE_VIRON_AESTHETIC_MANIFESTO.md` & `RULES_TECHNICAL.md`_
