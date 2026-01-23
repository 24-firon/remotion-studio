# LEARNING: HDRI Shading Success (Silver V2)

**Date:** 2026-01-22 (Post-Refinement)
**Context:** Replaced manual Point/Spot Lights with `<Environment preset="studio" />` and correct PBR materials (`metalness: 1`, `roughness: 0.15`).
**Outcome:** SUCCESS
**Details:**

- The render (Frame 50) shows authentic, heavy metallic reflections.
- The "cut" between white and gray is gone, replaced by a smooth gradient of reflection.
- The "Strich-Fehler" (Line Glitch) remains solved via `RoundedBox`.
  **Takeaway:**
  For Viron Industrial Look:

1.  **Always** use HDRI (Studio Preset).
2.  **Never** use manual lights for the hero object.
3.  **Geometry**: `RoundedBox` is mandatory for UI elements.
