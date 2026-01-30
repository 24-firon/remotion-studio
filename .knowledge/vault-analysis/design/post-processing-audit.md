# Audit Report: Post-Processing Stack

**Category:** Design / VFX
**Source Files Analyzed:**

- `30-post-processing-01-bloom-selective.md`
- `30-post-processing-02-depth-of-field.md`
- `30-post-processing-03-04-chromatic-und-grain.md`

**Core Comparison Base:** `remotion-best-practices`

---

## 1. Selective Bloom (`30-01`)

**Content:** `luminanceThreshold`, `emissiveIntensity`, `downsampling`.
**Core Check:** Core mentions "use Three.js" generally but provides no shader logic.
**Redundancy:** 0%
**Verdict:** ✅ **ACCEPT FULLY**
**Optimization:** The file suggests `downsampling={2}` for performance. This is a crucial "Best Practice" that should be elevated to a rule.

## 2. Depth of Field (`30-02`)

**Content:** `focusDistance`, `focalLength`, dynamic tracking with `interpolate()`.
**Core Check:** None.
**Redundancy:** 0%
**Verdict:** ✅ **ACCEPT FULLY**

## 3. Chromatic Aberration & Grain (`30-03`)

**Content:** RGB Shift effects, procedural noise.
**Core Check:** None.
**Redundancy:** 0%
**Verdict:** ✅ **ACCEPT FULLY**
**Quality Check:** The `animate={true}` recommended for video vs `false` for stills is a valuable specialized instruction.

## 4. Pipeline Integration

**Content:** Combining all effects in one `EffectComposer`.
**Conflict Check:** High GPU load warning.
**Verdict:** ✅ **ACCEPT** as "High-End Recipe".

---

## Delta Analysis

The entire Post-Processing folder is **additive**. The Core Skill provides the engine (Remotion + Three Fiber), but this Vault content provides the **lenses and film stock**.

**Proposed Consolidation:**
Do not keep 3 separate files. Merge into one `extensions/shaders/post-processing-stack.md`.
**Structure:**

1. Setup (`EffectComposer`)
2. The "Big 4" Effects (Bloom, DoF, Chromatic, Grain)
3. Presets (Cinematic, Glitch, Clean)
4. Performance Rule (`downsampling={2}`)
