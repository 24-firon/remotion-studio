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

## 3. DEIN WORKFLOW

1. **Deep Read:** Lies alle Quellen vollständig. Scanne nicht.
2. **Context Injection:** Wenn du einen Code-Block findest, lies den Absatz davor/danach. Warum ist das so?
3. **Kategorisierung:** Sortiere jeden Fund in A, B oder C:
   - **A: SKILL_UPDATE** (Generisches @react-three/postprocessing Wissen)
   - **B: PROJECT_IP** (Viron Shader Recipes: Iridescent, Liquid, Glitch, 80% Grey Rule)
   - **C: RESEARCH_NOTE** (Math-Hintergründe zu Fresnel, Glitch-Algorithmen)
4. **Schreiben:** Erstelle den Report im Format von Sektion 5.

### 3.1 EXTRAKTIONS-PFLICHT (Kritisch!)

Wenn im Badge-Hinweis-Block **konkrete Zeilen-Ranges** genannt werden:

- Diese sind **PFLICHT-Extraktionen**, nicht "prüfen ob nötig"
- Lies die genannten Zeilen
- Extrahiere sie VOLLSTÄNDIG
- Wenn du sie verwirfst: Dokumentiere WARUM (Redundanz? Bereits im Skill?)

### 3.2 PROBLEM-LÖSUNGS-GEBOT

Wenn du ein Problem identifizierst (z.B. "Math.random() ist nicht deterministisch"):

1. Suche in den Quellen nach einer Lösung
2. Wenn gefunden: Dokumentiere Problem UND Lösung
3. Wenn nicht gefunden: Markiere als `TODO: Lösung fehlt in Quellen`

**Bei Badge 3 besonders wichtig:** Wenn ein Shader `useFrame({ clock })` nutzt, MUSST du die deterministische Lösung (`useCurrentFrame`) anbieten.

**Anti-Pattern:** "Das ist ein Problem" ohne Lösung oder TODO

---

## 4. BADGE-SPEZIFISCHE HINWEISE (Vom Orchestrator)

### 4.1 Das CSM-Gesetz (Kategorie B: PROJECT_IP)

Viron nutzt ab 2026 **NUR NOCH** `three-custom-shader-material` (CSM) für Shader.

- Lamina ist veraltet (Archived).
- Wenn du im "Eye Candy Stack" Rezepte findest: Extrahiere sie als CSM-Standard.

### 4.2 Die useFrame-Falle (Extraktions-Pflicht!)

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

### 4.3 Post-Processing Order

Achte darauf, dass die Reihenfolge im Report korrekt dokumentiert ist:

1. **Luminanz** (Bloom)
2. **Fokus** (DoF)
3. **Optik** (Chromatic Aberration)
4. **Korrektur** (Film Grain)

---

## 5. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `EXTRACTION_REPORT_BADGE_3.md`

**Format für JEDEN Punkt:**

````markdown
### [Titel des Punktes]

**Quelle:** `[datei.md]` (Zeilen X-Y)

**Kontext/Erklärung:**
[Hier MUSS Prosa stehen. Erkläre das WARUM. Zitiere Warnungen.]

**Visuelles Ergebnis:**
[Beschreibe mit 1 Satz, was man auf dem Bildschirm sieht (z.B. "Metallisches Schimmern mit Regenbogen-Kanten").]

**Code/Daten:**

```typescript
[Hier der Code-Block]
```

**Implikation:**
[Optional: Was bedeutet das für uns?]
````

---

## 6. STATISTIK & HEADER

Statistik-Tabelle wie im Template, aber füge hinzu:

- **Extrahiert via CSM:** [Anzahl]
- **useFrame Warnings:** [Anzahl]

---

## 7. EMPFEHLUNGEN FÜR ORCHESTRATOR (Pflichtsektion!)

Jeder Report MUSS mit priorisierten Empfehlungen enden:

```markdown
## 📋 Empfehlungen für Orchestrator

| Priorität  | Aktion            | Begründung        |
| ---------- | ----------------- | ----------------- |
| 🔴 HOCH    | [Konkrete Aktion] | [Warum kritisch?] |
| 🟡 MITTEL  | [Konkrete Aktion] | [Warum wichtig?]  |
| 🟢 NIEDRIG | [Konkrete Aktion] | [Nice-to-have]    |
```

---

## 8. CHECKLISTE VOR ABGABE

- [ ] Alle Quellen vollständig gelesen?
- [ ] Jeden Code-Block mit Kontext-Prosa angereichert?
- [ ] A/B/C Kategorien sauber getrennt?
- [ ] useFrame-Blöcke konvertiert oder gewarnt?
- [ ] CSM-Standard eingehalten?
- [ ] Format strikt eingehalten?

**AN DIE ARBEIT. Baue den Eye-Candy Stack für Viron.**
