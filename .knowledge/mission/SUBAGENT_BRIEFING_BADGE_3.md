# 🎯 SUB-AGENT BRIEFING: BADGE 3 – VISUAL FX, SHADERS & MATERIALS

**Version:** 1.0  
**Badge ID:** VIRON-2026-B3  
**Created:** 2026-01-30  
**Status:** Ready for Sub-Agent Activation

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für Badge 3: Visual FX, Shaders & Materials.
Lies: C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_3.md
Erstelle: EXTRACTION_REPORT_BADGE_3.md

REGLER AUF: 100% Tiefe, 0% Reduktion.
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

---

## 1. MISSION PHILOSOPHY (Das Fundament)

### 1.1 Warum wir das tun

Badge 3 definiert die **visuelle Identität** von Viron. Wir extrahieren hier den "Industrial Silver Look" und die Post-Processing Pipeline. Dies ist der "Eye Candy" Stack, der Viron von generischen Videos abhebt.

### 1.2 Das Credo (Nicht verhandelbar)

Lies das Quality Credo in `gemini.md`. Deine Arbeit wird daran gemessen:

- **Ausführlichkeit:** Extrahiere die Shader-Recipes VOLLSTÄNDIG.
- **Kontext:** Erkläre, warum wir CSM (CustomShaderMaterial) gegenüber Lamina bevorzugen.
- **Unmissverständlichkeit:** Markiere Inkompatibilitäten (useFrame) sofort.

---

## 2. PFLICHTLEKTÜRE (Dein Input)

### 2.1 Context Kit (Standard)

Diese Dateien MÜSSEN gelesen werden, um Viron zu verstehen:

| Datei      | Pfad                                                                         | Zweck                         |
| ---------- | ---------------------------------------------------------------------------- | ----------------------------- |
| **Vision** | `C:\Workspace\Repos\remotion-studio\viron-core\vision.md`                    | Das "Video as Code" Paradigma |
| **Logic**  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-master-workflow-2026-integration.md` | Die Entscheidungs-Logik       |
| **Index**  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-overview-index-v2-1-complete.md`     | Die Wissens-Landkarte         |
| **Skill**  | `C:\Workspace\Repos\remotion-studio\.agent\skills\remotion-core\SKILL.md`    | Der Redundanz-Check           |

### 2.2 Badge-Spezifische Quellen (Deine Mission)

Lies diese Dateien Zeile für Zeile (Deep Read):

| Kategorie | Datei                                   | Pfad                                                                                           |
| --------- | --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **REPO**  | `PATTERN_Advanced_Shaders.md`           | `C:\Workspace\Repos\remotion-studio\src\learnings\PATTERN_Advanced_Shaders.md`                 |
| **REPO**  | `advanced-shaders.md` (Eye Candy)       | `C:\Workspace\Repos\remotion-studio\public\Eye Candy Stack\advanced-shaders.md`                |
| **REPO**  | `physics.md`                            | `C:\Workspace\Repos\remotion-studio\viron-core\physics.md` (Material-Sektion)                  |
| **VAULT** | `30-post-processing-00-...-stack.md`    | `C:\Viron\90_VAULT\NEW SUFF\Remotion\30-post-processing-00-overview-postprocessing-stack.md`   |
| **VAULT** | `30-post-processing-01-...-bloom.md`    | `C:\Viron\90_VAULT\NEW SUFF\Remotion\30-post-processing-01-bloom-selective.md`                 |
| **VAULT** | `30-post-processing-02-...-dof.md`      | `C:\Viron\90_VAULT\NEW SUFF\Remotion\30-post-processing-02-depth-of-field.md`                  |
| **VAULT** | `30-post-processing-03-04-...-grain.md` | `C:\Viron\90_VAULT\NEW SUFF\Remotion\30-post-processing-03-04-chromatic-und-grain.md`          |
| **SKILL** | `images.md`                             | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules\images.md`     |
| **SKILL** | `videos.md`                             | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules\videos.md`     |
| **SKILL** | `can-decode.md`                         | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules\can-decode.md` |

---

## 3. BADGE-SPEZIFISCHE HINWEISE (Vom Orchestrator)

### 3.1 Das CSM-Gesetz (Kategorie B: PROJECT_IP)

Viron nutzt ab 2026 **NUR NOCH** `three-custom-shader-material` (CSM) für Shader.

- Lamina ist veraltet (Archived).
- Wenn du im "Eye Candy Stack" Rezepte findest: Extrahiere sie als CSM-Standard.

### 3.2 Die useFrame-Falle (Extraktions-Pflicht!)

In den Quellen wirst du oft `useFrame()` sehen (z.B. Iridescent Glass, Glitch).

- **Regel:** `useFrame()` ist in Remotion verboten.
- **Deine Aufgabe:** Markiere jeden dieser Blöcke als inkompatibel und füge das **Konversions-Pattern** hinzu:

```typescript
// ❌ Quelle sagt (Echtzeit):
useFrame(({ clock }) => {
  material.uTime = clock.elapsedTime;
});

// ✅ Viron Standard (Deterministisch):
const frame = useCurrentFrame();
material.uTime = frame / 30; // 30 FPS Arithmetik
```

### 3.3 Post-Processing Order

Achte darauf, dass die Reihenfolge im Report korrekt dokumentiert ist:

1. **Luminanz** (Bloom)
2. **Fokus** (DoF)
3. **Optik** (Chromatic Aberration)
4. **Korrektur** (Film Grain)

---

## 4. DEIN WORKFLOW

1. **Deep Read:** Scanne nicht. Lies die shader-spezifischen Mathe-Teile (Frsenel, Noise).
2. **Kategorisierung:**
   - **A: SKILL_UPDATE** (Generisches @react-three/postprocessing Wissen)
   - **B: PROJECT_IP** (Viron Shader Recipes: Iridescent, Liquid, Glitch, 80% Grey Rule)
   - **C: RESEARCH_NOTE** (Math-Hintergründe zu Fresnel, Glitch-Algorithmen)
3. **Problem-Lösungs-Gebot:** Wenn ein Shader-Recipe `Math.random` nutzt, dokumentiere das Problem (nicht deterministisch) und suche in `physics.md` nach der Seed-Lösung.

---

## 5. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `EXTRACTION_REPORT_BADGE_3.md`

**Wichtig für Shader:** Füge das Feld `**Visuelles Ergebnis:**` ein. Beschreibe mit 1 Satz, was man auf dem Bildschirm sieht (z.B. "Metallisches Schimmern mit Regenbogen-Kanten").

---

## 6. STATISTIK & HEADER

Statistik-Tabelle wie im Template, aber füge hinzu:

- **Extrahiert via CSM:** [Anzahl]
- **useFrame Warnings:** [Anzahl]

---

**AN DIE ARBEIT. Baue den Eye-Candy Stack für Viron.**
