# 🔄 REVISION REPORT: BADGE 3 (VISUAL FX)

| **Meta-Data**       | **Value**                      |
| :------------------ | :----------------------------- |
| **Revision-Agent**  | Sub-Agent Badge 3              |
| **Original Report** | `EXTRACTION_REPORT_BADGE_3.md` |
| **Date**            | 2026-01-31                     |
| **Status**          | ✅ REVISION COMPLETE           |

---

## 📊 Revision Statistics

| Entscheidung          | Anzahl | Details                                               |
| --------------------- | ------ | ----------------------------------------------------- |
| **MITNEHMEN**         | 9      | CSM-Gesetz, 4 Shader Recipes, Post-Pro Stack, Configs |
| **NICHT DUPLIZIEREN** | 2      | useFrame-Prohibition, useCurrentFrame-Mandat          |

---

# FUND-BY-FUND ANALYSIS

---

## 1. CSM-Gesetz (Custom Shader Material Law)

**Quelle:** Original Report, Zeilen 28-29, 107

**Typ:** Extrahierte Regel

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - `3d.md` erwähnt keine Shader-Libraries, kein Lamina, kein CSM.
  - Es wird nur generisch `meshStandardMaterial` gezeigt.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/shaders/CSM_LAW.md`  
**Nutzungsart:** Als Viron-Regel dokumentieren ("NUR CSM, kein Lamina")  
**Warum wertvoll:** 2026-spezifische Entscheidung, Lamina-Deprecation ist Projekt-IP

---

## 2. Shader Recipe: Iridescent Glass

**Quelle:** Original Report, Zeilen 24-103

**Typ:** Vollständiges Code-Recipe

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - `3d.md` zeigt nur `meshStandardMaterial` mit einfacher Farbe.
  - Keine Custom-Shader, keine GLSL, keine Fresnel-Effekte.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/shaders/IridescentGlass.tsx`  
**Nutzungsart:** Direkt übernehmen als Production-ready Material  
**Warum wertvoll:** Viron-spezifisches Visual (PBR + Fresnel + Iridescence), nicht in Trainingsdaten

---

## 3. Shader Recipe: Liquid Surface

**Quelle:** Original Report, Zeilen 111-178

**Typ:** Vollständiges Code-Recipe

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Kein Vertex-Displacement im Skill.
  - Keine Wave-Parameter (Amplitude, Frequency).

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/shaders/LiquidSurface.tsx`  
**Nutzungsart:** Direkt übernehmen  
**Warum wertvoll:** Viron-spezifisches Visual (Wasser-Effekt), GLSL ist 2026-Vault-Recherche

---

## 4. Shader Recipe: Glitch Shader

**Quelle:** Original Report, Zeilen 183-244

**Typ:** Vollständiges Code-Recipe

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Keine Glitch-Effekte im Skill.
  - Keine RGB-Channel-Separation.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/shaders/GlitchMaterial.tsx`  
**Nutzungsart:** Direkt übernehmen  
**Warum wertvoll:** Viron-spezifisches Visual (Matrix-Style), deterministische Trigger-Logik

---

## 5. Shader Recipe: Holographic Projection

**Quelle:** Original Report, Zeilen 249-296

**Typ:** Vollständiges Code-Recipe

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Keine Scanlines, keine Emissive-Manipulation im Skill.
  - Keine Transparency-Handling.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/shaders/HologramMaterial.tsx`  
**Nutzungsart:** Direkt übernehmen  
**Warum wertvoll:** Viron-spezifisches Visual (Sci-Fi Aesthetic), csm_Emissive ist fortgeschritten

---

## 6. useFrame-Konversion zu useCurrentFrame

**Quelle:** Original Report, Zeilen 29, 93-95

**Typ:** Regel + Konversions-Pattern

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **JA**
  - `3d.md`, Zeile 48-52: "Shaders, models etc MUST NOT animate by themselves. No animations are allowed unless they are driven by `useCurrentFrame()`. Using `useFrame()` from `@react-three/fiber` is forbidden."
  - `3d.md`, Zeile 54-65: Code-Beispiel für `useCurrentFrame()` in 3D.

**Entscheidung:** ❌ **NICHT DUPLIZIEREN**

**Grund:** Bereits vollständig in `rules/3d.md` (Zeilen 46-65) dokumentiert. Die Regel und das Pattern sind identisch.

---

## 7. Post-Processing Pipeline (Order of Operations)

**Quelle:** Original Report, Zeilen 301-355

**Typ:** Vollständiges Code-Recipe + Konfiguration

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Kein `EffectComposer` im Skill.
  - Kein Bloom, DoF, Chromatic Aberration, Film Grain.
  - Keine Reihenfolge-Regel (Luminance → Focus → Optics → Correction).

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/postprocessing/VironPostProcessing.tsx`  
**Nutzungsart:** Direkt übernehmen als Standard-Pipeline  
**Warum wertvoll:** 2026-Vault-Recherche (Post-Processing Reihenfolge ist kritisch), Viron-spezifische Parameter

---

## 8. Physics Determinism Rule (remotion.random)

**Quelle:** Original Report, Zeilen 361-365

**Typ:** Extrahierte Regel

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - `3d.md` erwähnt `Math.random()` nicht.
  - Kein Hinweis auf `remotion.random(seed)`.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** Skill-Update: `rules/3d.md` (Vorschlag)  
**Nutzungsart:** Als Regel-Ergänzung dokumentieren  
**Warum wertvoll:** Kritische Remotion-Regel, nicht explizit im Skill

---

## 9. Bloom Requirements (Emissive > 1.0)

**Quelle:** Original Report, Zeilen 367-370

**Typ:** Extrahierte Regel + Konfiguration

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Kein Post-Processing im Skill.
  - Kein Emissive-Threshold-Wissen.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/postprocessing/BLOOM_REQUIREMENTS.md`  
**Nutzungsart:** Als Referenz für Bloom-Debugging  
**Warum wertvoll:** 2026-Vault-Recherche (spezifisches Bloom-Verhalten)

---

## 10. ThreeCanvas-Empfehlung (vs. Canvas)

**Quelle:** Original Report, Zeilen 377, 387

**Typ:** Extrahierte Empfehlung

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **JA**
  - `3d.md`, Zeile 25-28: "You MUST wrap 3D content in `<ThreeCanvas>`"
  - `3d.md`, Zeile 30-43: Vollständiges Code-Beispiel

**Entscheidung:** ❌ **NICHT DUPLIZIEREN**

**Grund:** Bereits vollständig in `rules/3d.md` (Zeilen 25-43) dokumentiert. Die Regel ist identisch.

---

## 11. Viron Visual Identity (PBR: Zinc, Glass)

**Quelle:** Original Report, Zeile 376

**Typ:** Design-Entscheidung

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN**
  - Der Skill ist generisch, keine Viron-Branding-Regeln.

**Entscheidung:** ✅ **MITNEHMEN**

**Ziel-Location:** `.knowledge/extracted-ip/design/VIRON_VISUAL_IDENTITY.md`  
**Nutzungsart:** Als Design-System-Referenz  
**Warum wertvoll:** Projekt-IP, Brand-Entscheidung

---

# ZUSAMMENFASSUNG

## Was wird MITGENOMMEN (9 Punkte)

| Titel                 | Ziel-Location                                                    | Typ                 |
| --------------------- | ---------------------------------------------------------------- | ------------------- |
| CSM-Gesetz            | `.knowledge/extracted-ip/shaders/CSM_LAW.md`                     | Regel               |
| Iridescent Glass      | `.knowledge/extracted-ip/shaders/IridescentGlass.tsx`            | Code-Recipe         |
| Liquid Surface        | `.knowledge/extracted-ip/shaders/LiquidSurface.tsx`              | Code-Recipe         |
| Glitch Shader         | `.knowledge/extracted-ip/shaders/GlitchMaterial.tsx`             | Code-Recipe         |
| Hologram Material     | `.knowledge/extracted-ip/shaders/HologramMaterial.tsx`           | Code-Recipe         |
| Post-Processing Stack | `.knowledge/extracted-ip/postprocessing/VironPostProcessing.tsx` | Code-Recipe         |
| Physics Determinism   | Skill-Update (Vorschlag)                                         | Regel               |
| Bloom Requirements    | `.knowledge/extracted-ip/postprocessing/BLOOM_REQUIREMENTS.md`   | Regel               |
| Viron Visual Identity | `.knowledge/extracted-ip/design/VIRON_VISUAL_IDENTITY.md`        | Design-Entscheidung |

## Was NICHT DUPLIZIERT wird (2 Punkte)

| Titel                  | Bereits in            | Warum                           |
| ---------------------- | --------------------- | ------------------------------- |
| useFrame-Prohibition   | `rules/3d.md` (46-65) | Regel + Pattern identisch       |
| ThreeCanvas-Empfehlung | `rules/3d.md` (25-43) | Regel + Code-Beispiel identisch |

---

## 📝 Revision Learnings

| Was                               | Warum                                                                                                   | Empfehlung                         |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------ | :--------------------------------- |
| ✅ **Shader Recipes = Viron-IP**  | Der Skill zeigt nur Basic-Materials, keine Custom-Shader. Alle GLSL-Recipes sind 2026-Vault-Recherchen. | Shader-Code immer mitnehmen.       |
| ✅ **Post-Processing = Viron-IP** | Kein Post-Processing im Skill. Die Reihenfolge und Parameter sind Vault-Wissen.                         | Post-Pro Stack komplett mitnehmen. |
| ❌ **useFrame-Regel = Redundant** | Der Skill dokumentiert das Verbot explizit (Zeile 52). Gleicher Inhalt.                                 | Nicht duplizieren, Skill hat es.   |
| ❌ **ThreeCanvas = Redundant**    | Der Skill hat das vollständige Pattern (Zeilen 25-43).                                                  | Nicht duplizieren, Skill hat es.   |

---

_Revision erstellt: 2026-01-31_
