# 🎯 SUB-AGENT BRIEFING: BADGE 2 – 3D PHYSICS, LIGHTING & GEOMETRY

**Version:** 1.0  
**Badge ID:** VIRON-2026-B2  
**Created:** 2026-01-30  
**Status:** Ready for Sub-Agent Activation

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für Badge 2: 3D Physics, Lighting & Geometry.
Lies: C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_2.md
Erstelle: EXTRACTION_REPORT_BADGE_2.md

REGLER AUF: 100% Tiefe, 0% Reduktion.
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

---

## 1. MISSION PHILOSOPHY (Das Fundament)

### 1.1 Warum wir das tun

Dieser Report ist kein Dokument für das Archiv. Er ist der **Lehrer für die nächste Generation von Agents**. Wenn du hier schlampst, lernen alle Nachfolger falsch.

Badge 2 behandelt die **räumliche Dimension** von Viron: Wie simulieren wir physikalisch korrekte 3D-Szenen, wie beleuchten wir sie, und wie optimieren wir sie für Video-Rendering?

### 1.2 Das Credo (Nicht verhandelbar)

Lies das Quality Credo in `gemini.md`. Deine Arbeit wird daran gemessen:

- **Ausführlichkeit:** Lieber 3 Sätze zu viel als 1 Wort zu wenig.
- **Kontext:** Kein Code-Block existiert im Vakuum. Erkläre das WARUM.
- **Unmissverständlichkeit:** Schreibe so, dass ein Junior-Dev es versteht.

> **Mantra:** "Ich bin kein Kopierer, ich bin ein Kurator."

---

## 2. PFLICHTLEKTÜRE (Dein Input)

### 2.1 Context Kit (Standard)

Diese Dateien MÜSSEN gelesen werden, um Viron zu verstehen:

| Datei      | Pfad                                                                         | Zweck                         |
| ---------- | ---------------------------------------------------------------------------- | ----------------------------- |
| **Vision** | `C:\Workspace\Repos\remotion-studio\viron-core\vision.md`                    | Das "Video as Code" Paradigma |
| **Logic**  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-master-workflow-2026-integration.md` | Die Entscheidungs-Logik       |
| **Index**  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-overview-index-v2-1-complete.md`     | Die Landkarte des Wissens     |
| **Skill**  | `C:\Workspace\Repos\remotion-studio\.agent\skills\remotion-core\SKILL.md`    | Der Redundanz-Check           |

### 2.2 Badge-Spezifische Quellen (Deine Mission)

Lies diese Dateien Zeile für Zeile (Deep Read):

| Kategorie | Datei                           | Pfad                                                                                     | Erwarteter Inhalt                                                   |
| --------- | ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **REPO**  | `physics.md`                    | `C:\Workspace\Repos\remotion-studio\viron-core\physics.md`                               | R3F Grundlagen, PBR Materials, Texture Loading (423 Zeilen)         |
| **REPO**  | `vision.md`                     | `C:\Workspace\Repos\remotion-studio\viron-core\vision.md`                                | 5 Säulen, 3D-Blueprint, Tech-Stack (182 Zeilen, Cross-Ref)          |
| **REPO**  | `camera.md`                     | `C:\Workspace\Repos\remotion-studio\specs\camera.md`                                     | Kamera-Bewegungstypen, Spring-Config, **Drift-Pflicht** (53 Zeilen) |
| **REPO**  | `PATTERN_LIGHTING_GRADIENTS.md` | `C:\Workspace\Repos\remotion-studio\src\learnings\PATTERN_LIGHTING_GRADIENTS.md`         | **80% Grey Rule**, Bewegungspflicht, ShaderMaterial (30 Zeilen)     |
| **VAULT** | `40-advanced-lighting-00-...`   | `C:\Viron\90_VAULT\NEW SUFF\Remotion\40-advanced-lighting-00-caustics-volumetric.md`     | Caustics GLSL, GodRays, Volumetric, Fresnel (407 Zeilen)            |
| **VAULT** | `40-gltf-models-00-...`         | `C:\Viron\90_VAULT\NEW SUFF\Remotion\40-gltf-models-00-loading-optimization.md`          | Draco Compression, LOD, Instancing, useGLTF (342 Zeilen)            |
| **VAULT** | `40-procedural-patterns-00-...` | `C:\Viron\90_VAULT\NEW SUFF\Remotion\40-procedural-patterns-00-noise-voronoi-terrain.md` | Perlin Noise, Voronoi, FBM, Terrain Generation (404 Zeilen)         |
| **SKILL** | `3d.md`                         | `~/.gemini/antigravity/global_skills/remotion-best-practices/rules/3d.md`                | ThreeCanvas, useCurrentFrame Law (86 Zeilen)                        |
| **SKILL** | `maps.md`                       | `~/.gemini/antigravity/global_skills/remotion-best-practices/rules/maps.md`              | Mapbox Integration (404 Zeilen)                                     |
| **SKILL** | `lottie.md`                     | `~/.gemini/antigravity/global_skills/remotion-best-practices/rules/lottie.md`            | Lottie Animation Loading (69 Zeilen)                                |

---

## 3. BADGE-SPEZIFISCHE HINWEISE (Vom Orchestrator für dich)

> [!IMPORTANT]
> Diese Hinweise basieren auf meinem Deep-Read aller Quellen. Beachte sie besonders.

### 3.1 Das Kerngesetz: useCurrentFrame()

In `3d.md` (Global Skill) steht die **absolute Regel** für 3D in Remotion:

> **"No animations not driven by `useCurrentFrame()`"**
> **"Using `useFrame()` from `@react-three/fiber` is forbidden."**

**Prüfe:** Jeder Code-Block in den VAULT-Dateien (Caustics, Terrain etc.) nutzt `useFrame()` für Echtzeit-Animation. Das ist **NICHT** Remotion-kompatibel! Diese Blöcke brauchen entweder:

- Eine Kontext-Warnung ("Für Remotion: ersetze `useFrame` durch `useCurrentFrame`")
- Oder eine Kategorisierung als `C: RESEARCH_NOTE` (nur als Referenz, nicht produktionsreif)

### 3.2 Die Viron-Spezifika (Kandidaten für B: PROJECT_IP)

1. **Drift-Pflicht** (`camera.md`, Zeile 39-48): Jede Viron-Szene MUSS subtile Eigenbewegung haben. Standbild = Fehler. Das ist **Viron-Law**, nicht generisches Remotion.
2. **80% Grey Rule** (`PATTERN_LIGHTING_GRADIENTS.md`): Keine Black-Voids, keine Blown-Out Whites. Mid-Grey dominiert. Dieses Farbschema ist **Viron-spezifisch**.
3. **Environment-Rotation** (`PATTERN_LIGHTING_GRADIENTS.md`, Zeile 23): Das Zimmer dreht sich langsam. Das ist ein **Viron-Stilmittel**.
4. **ShaderMaterial statt Lightformers** (`PATTERN_LIGHTING_GRADIENTS.md`, Zeile 28-29): Glatte Gradienten via GLSL, nicht via stacked Lights. Das ist eine **Viron-Technik**.

### 3.3 Die generischen Muster (Kandidaten für A: SKILL_UPDATE)

1. **PBR Material Setup** (`physics.md`, Zeile 184-210): Standard Three.js/R3F, bereits im Global Skill? Prüfen.
2. **Draco Compression Workflow** (`40-gltf-models-00-...`): Universell anwendbar, nicht Viron-spezifisch.
3. **Caustics GLSL** (`40-advanced-lighting-00-...`): Generisches Shader-Wissen, aber `useFrame()`-Warnung nötig!
4. **LOD Pattern** (`40-gltf-models-00-...`, Zeile 119-143): Standard-Technik, aber nützlich für Skill-Erweiterung.
5. **Instancing für Performance** (`40-gltf-models-00-...`, Zeile 194-224): Generisches R3F-Wissen.

### 3.4 Die Tutorial-Inhalte (Kandidaten für C: RESEARCH_NOTE)

1. **Perlin Noise Theorie** (`40-procedural-patterns-00-...`): Erklärungen zu FBM, Octaves, etc.
2. **Voronoi Algorithmus** (`40-procedural-patterns-00-...`): Mathematischer Hintergrund.
3. **Snell's Law / Fresnel** (`40-advanced-lighting-00-...`, Zeile 284-306): Physik-Theorie.
4. **Mapbox/Lottie** (`maps.md`, `lottie.md`): Wenig Relevanz für Badge 2 (3D Physics), prüfe ob Cross-Ref nötig.

---

## 4. DEIN WORKFLOW

1. **Deep Read:** Lies alle Quellen vollständig. Scanne nicht.
2. **Context Injection:** Wenn du einen Code-Block findest, lies den Absatz davor/danach. Warum ist das so?
3. **useFrame-Check:** Identifiziere alle `useFrame()`-Nutzungen und markiere sie als Remotion-inkompatibel.
4. **Kategorisierung:** Sortiere jeden Fund in A, B oder C:
   - **A: SKILL_UPDATE** (Generisches Remotion/R3F-Wissen)
   - **B: PROJECT_IP** (Viron-spezifische Rules: Drift-Pflicht, 80% Grey, etc.)
   - **C: RESEARCH_NOTE** (Kontext, Tutorials, mathematische Hintergründe)
5. **Schreiben:** Erstelle den Report im Format von Sektion 5.

---

## 5. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_2.md`

**Format für JEDEN Punkt:**

````markdown
### [Titel des Punktes]

**Kategorie:** A | B | C
**Quelle:** `[datei.md]` (Zeilen X-Y)

**Kontext/Erklärung:**
[Hier MUSS Prosa stehen. Erkläre das WARUM. Zitiere Warnungen. Markiere useFrame()-Inkompatibilität.]

**Code/Daten:**

```typescript
[Hier der Code-Block]
```

**Implikation:**
[Optional: Was bedeutet das für Viron? Welche Entscheidung folgt daraus?]
````

---

## 6. STATISTIK & HEADER

```markdown
# 🎯 Badge 2: Extraction Report – 3D Physics, Lighting & Geometry

**Version:** 1.0
**Badge ID:** VIRON-2026-B2
**Extraction Date:** 2026-01-30
**Analyst:** Sub-Agent

---

## 📊 Statistik

| Kategorie           | Anzahl | Beschreibung                        |
| ------------------- | ------ | ----------------------------------- |
| A: SKILL_UPDATE     | [N]    | Generisches R3F/Three.js Wissen     |
| B: PROJECT_IP       | [N]    | Viron Laws (Drift, 80% Grey, etc.)  |
| C: RESEARCH_NOTE    | [N]    | Theorie, Tutorials, Hintergründe    |
| ❌ VERWORFEN        | [N]    | Redundant (bereits im Global Skill) |
| ⚠️ useFrame-WARNUNG | [N]    | Markiert als Remotion-inkompatibel  |
```

---

## 7. CHECKLISTE VOR ABGABE

- [ ] Alle 10 Quellen vollständig gelesen?
- [ ] Jeden Code-Block mit Kontext-Prosa angereichert?
- [ ] A/B/C Kategorien sauber getrennt?
- [ ] `useFrame()`-Nutzungen identifiziert und gewarnt?
- [ ] Redundanzen gegen Global Skill (`3d.md`) verworfen & dokumentiert?
- [ ] Format strikt eingehalten?

---

## 8. VERHALTENSREGELN (Nicht verhandelbar)

> [!IMPORTANT]
> **Qualität > Geschwindigkeit.** Lieber 1x richtig als 3x nacharbeiten.

> [!TIP]
> **Bei Unsicherheit: STOPPE und FRAGE.** Nicht raten!

> [!WARNING]
> **Keine "nackten" Code-Blöcke.** Jeder braucht seinen Kontext.

> [!CAUTION]
> **useFrame() = Remotion-Verboten.** Markiere jeden Fund!

---

**AN DIE ARBEIT. Lies die Quellen. Verstehe den Kontext. Baue Badge 2.**
