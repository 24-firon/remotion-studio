# 🔄 Badge 2: Revision Report – SKILL-ABGLEICH

**Version:** 1.0  
**Badge ID:** VIRON-2026-B2-REV  
**Revision Date:** 2026-01-31  
**Analyst:** Revision-Agent

---

## 📊 Revision Statistik

| Entscheidung         | Anzahl | Details                                                                   |
| :------------------- | :----- | :------------------------------------------------------------------------ |
| ✅ MITNEHMEN         | 21     | Viron-IP, 2026-Updates, nicht im Skill                                    |
| ❌ NICHT DUPLIZIEREN | 7      | Bereits explizit in `rules/3d.md`, `rules/maps.md` oder `rules/lottie.md` |

---

## 🔍 Skill-Referenz (Filter-Baseline)

**Datei:** `rules/3d.md` (86 Zeilen)

**EXPLIZIT dokumentiert im Skill:**

1. `@remotion/three` Installation (Zeilen 15-23)
2. ThreeCanvas mit width/height Props (Zeilen 27-43)
3. `useFrame()` Verbot (Zeilen 46-52)
4. `useCurrentFrame()` Animation (Zeilen 54-66)
5. `Sequence layout="none"` in ThreeCanvas (Zeilen 68-86)

**NICHT im Skill (→ MITNEHMEN-Kandidaten):**

- PBR Material Konfigurationen
- Texture Loading Patterns
- Draco Compression
- LOD Patterns
- Instancing
- GLTF Animation mit Remotion
- Alle Viron-spezifischen Laws (B-Kategorie)
- Alle Research Notes (C-Kategorie)

---

## A: SKILL_UPDATE – Skill-Check

### A.1 PBR Material Setup

- **Skill-Check:** ❌ NICHT im Skill dokumentiert
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/extracted-ip/materials/`
- **Nutzungsart:** Referenz-Material für 3D-Szenen
- **Warum wertvoll:** Konkrete Material-Configs (Zink, Glas, Emissive) sind Vault-Recherchen 2026

---

### A.2 Texture Loading in R3F

- **Skill-Check:** ❌ NICHT im Skill dokumentiert
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** Skill-Update `rules/3d.md`
- **Nutzungsart:** Erweitern des Skill um Texture-Loading-Pattern
- **Warum wertvoll:** Basis-Pattern fehlt im Skill

---

### A.3 Draco Compression Workflow

- **Skill-Check:** ❌ NICHT im Skill dokumentiert
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** Neues Skill-Rule `rules/gltf-optimization.md`
- **Nutzungsart:** Neues Modul
- **Warum wertvoll:** 80% Kompression, essentiell für Performance. 2026-Workflow-Update.

---

### A.4 LOD Pattern (Level of Detail)

- **Skill-Check:** ❌ NICHT im Skill dokumentiert
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** Skill-Update `rules/gltf-optimization.md`
- **Nutzungsart:** Einarbeiten in neues Modul
- **Warum wertvoll:** GPU-Tier-Detection ist 2026-Pattern

---

### A.5 Instancing für Performance

- **Skill-Check:** ❌ NICHT im Skill dokumentiert
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** Skill-Update `rules/3d.md` oder neues `rules/performance.md`
- **Nutzungsart:** Neues Performance-Pattern
- **Warum wertvoll:** Seeded Random Lösung (Mulberry32) ist kritisch für Remotion-Determinismus

---

### A.6 Streaming & Progressive Loading

- **Skill-Check:** ❌ NICHT im Skill dokumentiert
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/extracted-ip/loading/`
- **Nutzungsart:** Referenz (mit Hinweis auf delayRender in Remotion)
- **Warum wertvoll:** UX-Pattern für große Assets

---

### A.7 delayRender Pattern für externe Assets

- **Skill-Check:** ⚠️ TEILWEISE im Skill (lottie.md hat es, 3d.md nicht)
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** Skill-Update `rules/3d.md`
- **Nutzungsart:** Erweitern um delayRender für GLTF/Textures
- **Warum wertvoll:** Anwendung auf 3D fehlt explizit

---

### A.8 ThreeCanvas Requirements

- **Skill-Check:** ✅ Vollständig in `rules/3d.md` Zeilen 27-43
- **Entscheidung:** ❌ NICHT DUPLIZIEREN
- **Grund:** Bereits vollständig dokumentiert

---

### A.9 Sequence in ThreeCanvas

- **Skill-Check:** ✅ Vollständig in `rules/3d.md` Zeilen 68-86
- **Entscheidung:** ❌ NICHT DUPLIZIEREN
- **Grund:** Bereits vollständig dokumentiert

---

### A.10 Mapbox delayRender Integration

- **Skill-Check:** ✅ Dokumentiert in `rules/maps.md`
- **Entscheidung:** ❌ NICHT DUPLIZIEREN
- **Grund:** Bereits im Maps-Skill dokumentiert

---

### A.11 GLTF Animation mit Remotion

- **Skill-Check:** ❌ NICHT im Skill dokumentiert
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** Skill-Update `rules/3d.md`
- **Nutzungsart:** Neue Sektion "GLTF Animations"
- **Warum wertvoll:** AnimationMixer mit Frame-Sync fehlt komplett im Skill

---

### A.12 Material-Animation in Remotion

- **Skill-Check:** ⚠️ TEILWEISE (useCurrentFrame ist da, aber kein Material-Beispiel)
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** Skill-Update `rules/3d.md`
- **Nutzungsart:** Erweiterung der Animation-Beispiele
- **Warum wertvoll:** Konkretes interpolate-Pattern für Materials

---

### A.13 Texture Optimization (WebP/BASIS)

- **Skill-Check:** ❌ NICHT im Skill dokumentiert
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** Neues Skill-Rule `rules/gltf-optimization.md`
- **Nutzungsart:** Eigenständige Sektion
- **Warum wertvoll:** 50-80% Größenreduktion, Benchmarks sind 2026-Daten

---

### A.14 Lottie Integration

- **Skill-Check:** ✅ Dokumentiert in `rules/lottie.md`
- **Entscheidung:** ❌ NICHT DUPLIZIEREN
- **Grund:** Bereits vollständig im Lottie-Skill dokumentiert

---

## B: PROJECT_IP – Alle MITNEHMEN

### B.1 Drift-Pflicht (Viron Law)

- **Skill-Check:** ❌ NICHT im Skill (Viron-spezifisch)
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/viron-laws/drift-pflicht.md`
- **Nutzungsart:** Viron Law Dokumentation
- **Warum wertvoll:** Unterscheidet Viron fundamental von generischem Content

---

### B.2 Die 80% Grey Rule

- **Skill-Check:** ❌ NICHT im Skill (Viron-spezifisch)
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/viron-laws/80-grey-rule.md`
- **Nutzungsart:** Design-Konstanten
- **Warum wertvoll:** Einzigartiges Viron-Farbschema, Secret Sauce

---

### B.3 Environment-Rotation

- **Skill-Check:** ❌ NICHT im Skill (Viron-spezifisch)
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/viron-laws/environment-rotation.md`
- **Nutzungsart:** Standard-Setup-Code
- **Warum wertvoll:** Erzeugt dynamische Reflektionen, Viron-Look

---

### B.4 ShaderMaterial statt Lightformers

- **Skill-Check:** ❌ NICHT im Skill (Viron-spezifisch)
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/viron-laws/lighting-gradients.md`
- **Nutzungsart:** Technik-Dokumentation
- **Warum wertvoll:** Anti-Banding-Technik, Viron-spezifisch

---

### B.5 Kamera-Bewegungstypen (Viron Vocabulary)

- **Skill-Check:** ❌ NICHT im Skill (Viron-spezifisch)
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/viron-laws/camera-vocabulary.md`
- **Nutzungsart:** Team-Glossar
- **Warum wertvoll:** Standardisierte Kommunikation

---

### B.6 Spring-basierte Kamera (Viron Defaults)

- **Skill-Check:** ❌ NICHT im Skill (Viron-spezifisch)
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/viron-laws/spring-defaults.md`
- **Nutzungsart:** Konstanten-Definition
- **Warum wertvoll:** damping: 200, stiffness: 50 = Viron-Look

---

## C: RESEARCH_NOTE – Alle MITNEHMEN

### C.1 Perlin Noise Theorie

- **Skill-Check:** ❌ NICHT im Skill
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/research/procedural-textures.md`
- **Nutzungsart:** Referenz mit useFrame-Warnung
- **Warum wertvoll:** GLSL-Implementierung, Vault-Recherche 2026

---

### C.2 Voronoi Algorithmus

- **Skill-Check:** ❌ NICHT im Skill
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/research/procedural-textures.md`
- **Nutzungsart:** Referenz
- **Warum wertvoll:** Bio-Design-Patterns, Vault-Recherche 2026

---

### C.3 Terrain Generation

- **Skill-Check:** ❌ NICHT im Skill
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/research/terrain.md`
- **Nutzungsart:** Referenz mit Konversions-Hinweis
- **Warum wertvoll:** Noise-basierte Höhenmap, Vault-Recherche 2026

---

### C.4 Caustics GLSL Shader

- **Skill-Check:** ❌ NICHT im Skill
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/research/advanced-lighting.md`
- **Nutzungsart:** Referenz mit Konversions-Pattern
- **Warum wertvoll:** Unterwasser-Effekte, Vault-Recherche 2026

---

### C.5 Fresnel & Snell's Law

- **Skill-Check:** ❌ NICHT im Skill
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/research/physics-theory.md`
- **Nutzungsart:** Theorie-Referenz
- **Warum wertvoll:** Erklärt PBR-Verhalten, Bildungsmaterial

---

### C.6 God Rays / Volumetric Lighting

- **Skill-Check:** ❌ NICHT im Skill
- **Entscheidung:** ✅ MITNEHMEN
- **Ziel-Location:** `.knowledge/research/advanced-lighting.md`
- **Nutzungsart:** Referenz mit Remotion-Kompatibilitäts-Hinweis
- **Warum wertvoll:** Post-Processing-Pattern, dramatische Effekte

---

### C.7 Mapbox 3D Buildings

- **Skill-Check:** ✅ Vollständig in `rules/maps.md` Zeilen 387-395 (exakt gleicher Code)
- **Entscheidung:** ❌ NICHT DUPLIZIEREN
- **Grund:** `show3dObjects`, `show3dLandmarks`, `show3dBuildings` identisch dokumentiert

---

### C.8 Mapbox Camera-Animation Pattern

- **Skill-Check:** ✅ Vollständig in `rules/maps.md` Zeilen 206-253 (turf.along, getFreeCameraOptions, delayRender)
- **Entscheidung:** ❌ NICHT DUPLIZIEREN
- **Grund:** Identisches Pattern mit gleichen Funktionen und Code-Struktur

---

## 📋 Migrations-Zusammenfassung

### Skill-Updates (Neue Rules/Erweiterungen)

| Skill-Datei                  | Zu ergänzen                                                      |
| :--------------------------- | :--------------------------------------------------------------- |
| `rules/3d.md`                | Texture Loading, delayRender, GLTF Animation, Material-Animation |
| `rules/gltf-optimization.md` | **NEU:** Draco, LOD, WebP/BASIS                                  |
| `rules/performance.md`       | **NEU:** Instancing, Seeded Random                               |

### Viron-Laws (Projekt-IP)

| Law                     | Ziel-Location                                   |
| :---------------------- | :---------------------------------------------- |
| Drift-Pflicht           | `.knowledge/viron-laws/drift-pflicht.md`        |
| 80% Grey Rule           | `.knowledge/viron-laws/80-grey-rule.md`         |
| Environment-Rotation    | `.knowledge/viron-laws/environment-rotation.md` |
| ShaderMaterial Lighting | `.knowledge/viron-laws/lighting-gradients.md`   |
| Camera Vocabulary       | `.knowledge/viron-laws/camera-vocabulary.md`    |
| Spring Defaults         | `.knowledge/viron-laws/spring-defaults.md`      |

### Research Notes (Referenzmaterial)

| Thema                       | Ziel-Location                                |
| :-------------------------- | :------------------------------------------- |
| Perlin Noise, Voronoi       | `.knowledge/research/procedural-textures.md` |
| Terrain Generation          | `.knowledge/research/terrain.md`             |
| Caustics, God Rays, Fresnel | `.knowledge/research/advanced-lighting.md`   |

---

_Badge 2 Revision Complete. 21 Items MITNEHMEN, 7 Items bereits im Skill._
