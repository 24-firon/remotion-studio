# ⚙️ VIRON HARDWARE LAWS (V1.0)

**Scope:** The intersection of Code, Physics, and Silicon.
**Bridge:** Connects `Badge 2 (3D)` with `Badge 7 (System)`.

---

## 🛑 1. THE CONCURRENCY/COMPLEXITY RATIO

We do not just use `os.cpus()`. We scale concurrency based on **Scene Weight**.

| Scene Type      | Complexity                 | RAM Factor   | Concurrency Formula |
| :-------------- | :------------------------- | :----------- | :------------------ |
| **Standard 2D** | Low (Text, Images)         | 2GB / Thread | `ramGB / 2`         |
| **Heavy 3D**    | High (Three.js, PBR)       | 4GB / Thread | `ramGB / 4`         |
| **Volumetric**  | Critical (Caustics, Smoke) | 8GB / Thread | `ramGB / 8`         |

**The Law:** Before rendering, check the `Composition` metadata. If `type === '3D'`, apply the **Heavy 3D** limiter.

---

## ⚡ 2. THE WEBGPU MANDATE

Viron explicitly enables WebGPU output where possible.

- **Browser:** Chrome/Edge (Chromium) is the only target.
- **Flag:** `--enable-unsafe-webgpu` is often required for dev-preview features.
- **Fallback:** If WebGPU fails, we fall back to WebGL2. We NEVER fall back to Canvas2D for 3D scenes.

---

## 🧠 3. SHADER COMPILATION COSTS

- **Rule:** Pre-warm shaders.
- **Why:** Putting a heavy shader on Frame 0 causes a "stutter" (long first frame render).
- **Fix:** Off-screen rendering of key materials at `frame={-1}` during initialization.

---

**Signed:**
_The Hardware Architect_
