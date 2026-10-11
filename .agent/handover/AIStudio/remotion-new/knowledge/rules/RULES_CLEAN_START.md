# ⚔️ RULES: CLEAN START

**Philosophy:** Technical Excellence > Bureaucracy.

## 1. 🎨 VISUAL PHYSICS (The "High-PBR" Law)

- **Tone Mapping:** `AgX` (or equivalent High-Contrast mapping) is mandatory. No "Standard" washout.
- **Lights:** Use `Environment` (HDRI) as the primary light source. Manual lights only for Rim/Accent.
- **Materials:**
  - `metalness: 1.0` (Native Metal)
  - `roughness: 0.1 - 0.15` (Polished)
  - `CapsuleGeometry` over `RoundedBox` (No artifacts).

## 2. ⚡ ANIMATION (The "Frame" Law)

- **Forbidden:** CSS Animations, Keyframes, Transitions.
- **Mandatory:** Frame-based logic (`useCurrentFrame`).
- **Physics:** Use `spring()` for impact. Objects have mass.

## 3. 🛡️ CODE QUALITY

- **Files:** One explicit file per variation (`V1`, `V2`). No overwriting.
- **Props:** Typesafety first.
- **Verification:** Never guess. Run the render.

---

_Created for the New Era. No Viron Legacy Constraints._
