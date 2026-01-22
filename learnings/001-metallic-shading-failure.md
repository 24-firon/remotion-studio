# LEARNING: 3D Lighting & Shading

**Date:** 2026-01-22
**Context:** Attempted to create a "Silver Industrial" metallic look using manual SpotLights and PointLights to fake reflections.
**Outcome:** FAILURE
**Details:** The result looked "forced", "cheap", and had unnatural "hard cuts" (white vs gray). The user rejected the "Rumprobieren" (trial and error) approach.
**Takeaway:**

1.  **NEVER** use manual lights for metal shading.
2.  **ALWAYS** use HDRI Environment Maps (`<Environment preset="studio" />` or custom HDR) with `metalness: 1` and `roughness: 0.1-0.2`.
3.  Authentic metal relies on _reflection_, not _illumination_.
