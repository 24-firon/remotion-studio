# 🔄 REVISION REPORT: BADGE 3 (VISUAL FX)

| **Meta-Data**       | **Value**                      |
| :------------------ | :----------------------------- |
| **Revision-Agent**  | Sub-Agent Badge 3              |
| **Original Report** | `EXTRACTION_REPORT_BADGE_3.md` |
| **Date**            | 2026-01-31                     |
| **Status**          | ✅ REVISION COMPLETE           |

---

## 📊 Revision Statistics

| Entscheidung          | Anzahl | Details                                             |
| --------------------- | ------ | --------------------------------------------------- |
| **MITNEHMEN**         | 8      | CSM-Logik, 4 Shader Recipes, Post-Pro Stack, Assets |
| **NICHT DUPLIZIEREN** | 2      | useFrame-Verbot, ThreeCanvas-Mandat                 |

---

# FUND-BY-FUND ANALYSIS

---

## 1. CSM (Custom Shader Material) Architecture

**Quelle:** `PATTERN_Advanced_Shaders.md` (Zeilen 121-129), `viron-button-guide.md` (Zeilen 18-23)

**Typ:** Architektur-Entscheidung / Deprecation Notice

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - `rules/3d.md` erwähnt CSM nicht. Es warnt vor `useFrame`, aber nicht vor `Lamina`.
  - Skill zeigt nur Standard-Three.js.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/shaders/CSM_ARCHITECTURE.md`
**Nutzungsart:** Als Core-Design-Rule ("Lamina ist tot, nutze CSM")
**Warum wertvoll:** 2026-Vault-Update. Lamina-Deprecation ist kritische WIP-Info, die nicht im generischen Skill steht.

---

## 2. Advanced Shader Recipes (Iridescent, Liquid, Glitch, Hologram)

**Quelle:** `PATTERN_Advanced_Shaders.md` (ganzes File), `viron-button-guide.md` (Zeilen 701-754)

**Typ:** Code-Recipes

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - `rules/3d.md` zeigt nur `meshStandardMaterial` ohne Custom Shaders.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/shaders/recipes/`
**Nutzungsart:** 1:1 Kopie als `.tsx` Komponenten
**Warum wertvoll:** Fertige, getestete Visuals. Viron-spezifische Ästhetik (Glitch, Glass).

---

## 3. Post-Processing Stack (Bloom, DoF, Grain, CA)

**Quelle:** `30-post-processing-*.md` (Vault), `viron-button-guide.md` (Tier 3)

**Typ:** Konfiguration / Pipeline

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - `rules/3d.md` enthält KEIN Post-Processing.
  - Die spezifische Reihenfolge (Bloom -> DoF -> CA -> Grain) ist kritisches Vault-Wissen.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/postprocessing/FULL_STACK.tsx`
**Nutzungsart:** Als Standard-Komponente `<VironEffects />`
**Warum wertvoll:** Performance-Optimierte Settings (`downsampling={2}`), die durch Benchmarks validiert wurden.

---

## 4. `useFrame` Verbot & Konversion

**Quelle:** `PATTERN_Advanced_Shaders.md` (div. Stellen)

**Typ:** Coding-Rule

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **JA**
  - `rules/3d.md`, Zeile 48-52: "Using `useFrame()` from `@react-three/fiber` is forbidden."
  - `rules/animations.md`: Mandatiert `useCurrentFrame`.

**Entscheidung:** ❌ **NICHT DUPLIZIEREN**

**Grund:** Vollständig redundant. Der Skill deckt das Verbot und die Alternative ab.

---

## 5. ThreeCanvas Mandat

**Quelle:** `viron-button-guide.md` (Implizit in Beispielen)

**Typ:** Framework-Rule

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **JA**
  - `rules/3d.md`, Zeile 27: "You MUST wrap 3D content in `<ThreeCanvas>`"

**Entscheidung:** ❌ **NICHT DUPLIZIEREN**

**Grund:** Skill ist hier die definitive Quelle.

---

## 6. Material Assets & PolyHaven Workflow

**Quelle:** `viron-button-guide.md` (Tier 4)

**Typ:** Resource-Guide

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Skill ist Code-fokussiert, nicht Asset-fokussiert.
  - PolyHaven-Links und Texture-Mapping-Logik fehlen.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/assets/TEXTURE_GUIDE.md`
**Nutzungsart:** Referenz für Texture-Loading
**Warum wertvoll:** Spart Suchzeit, definiert Standard-Quality (2k).

---

## 7. Performance Benchmarks (Samples/Resolution)

**Quelle:** `viron-button-guide.md` (Zeilen 188-193), `30-post-processing-00-overview.md` (Benchmark-Tabelle)

**Typ:** Tuning-Daten

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Skill gibt keine Frames-per-Second Benchmarks für M2 Chips.
  - Tuning-Werte (samples: 16 vs 8) sind Viron-spezifisch.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/performance/R3F_BENCHMARKS.md`
**Nutzungsart:** Als Referenz für "Mobile vs Desktop" Settings
**Warum wertvoll:** Empirische Daten aus 2026-Tests.

---

## 8. Generative Textures Workflow (ComfyUI / Luma)

**Quelle:** `viron-button-guide.md` (Tier 2)

**Typ:** Workflow / External Tooling

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Skill behandelt nur Remotion/Three.js Code.
  - Keine AI-Generation-Workflows.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/workflows/AI_TEXTURE_GEN.md`
**Nutzungsart:** Guide für Texture-Erstellung
**Warum wertvoll:** "Secret Sauce" für den Viron-Look (nicht-statische Texturen).

---

# ZUSAMMENFASSUNG

## Was wir BEHALTEN (Viron-IP)

Der Wert von Badge 3 liegt nicht in den Basistechnologien (die deckt der Skill ab), sondern in den **spezifischen Konfigurationen und High-End-Rezepten**:

1.  **CSM-Architektur:** "Lamina ist tot" ist eine wichtige interne Richtlinie.
2.  **Shader Library:** 4 konkrete, frame-driven Shader für Viron-UI.
3.  **Cinematic Post-Pro:** Der exakte Stack für den "Film-Look" (nicht zufällig zusammengewürfelt).
4.  **AI-Workflows:** Integration von Luma/ComfyUI in 3D.
5.  **Performance-Daten:** Werte für `samples`, `resolution`, `downsampling`.

## Was wir VERWERFEN (Redundanz)

- Generische R3F-Regeln (`Canvas` vs `ThreeCanvas`).
- Basis-Animations-Regeln (`useFrame` Verbot).
- Standard-Three.js Boilerplate.

---

_Revision V3 | Skill-Audit Complete | 2026-01-31_
