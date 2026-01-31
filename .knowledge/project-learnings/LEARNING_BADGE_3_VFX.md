# 📝 PROJECT LEARNING: Badge 3 (Visual FX, Shaders & Materials)

**Date:** 2026-01-31 (V3.0 Auditor Edition)
**Badge:** 3
**Report Baseline:** `EXTRACTION_REPORT_BADGE_3_REVISION.md`

## 🎯 Strategische Erkenntnisse

- **CSM Architecture:** Das Learning "Lamina ist tot" (Deprecation) wurde als essentielle IP extrahiert. Die Ablösung durch `three-custom-shader-material` ist der neue Standard für 2026.
- **Cinematic Post-Pro:** Die exakte Reihenfolge des Stacks (Bloom -> DoF -> Grain) ist kein technisches Muss, sondern die "Secret Sauce" der Viron-Ästhetik.

## 🛠️ Prozess-Upgrades (Auditor V3.0)

- **Asset vs. Code:** Wir haben gelernt, dass wir auch Asset-Workflows (PolyHaven/AI-Texture Prompts) extrahieren müssen, nicht nur den TS-Code. Ohne die 2k/4k Texture-Regeln ist der Code wertlos.
- **Performance-Gate:** Die Entdeckung von `downsampling={2}` im Post-Processing Stack verhinderte Render-Time Timeouts auf AWS Lambda.

## 📊 Extraktions-Effizienz

- **MITNEHMEN:** 8 Items (Shader Recipes, CSM Logik, AI workflows).
- **DROP:** 2 Items (useFrame-Verbot - bereits im Skill).
