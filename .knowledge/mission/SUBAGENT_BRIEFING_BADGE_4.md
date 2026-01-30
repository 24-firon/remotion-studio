# 🎯 SUB-AGENT BRIEFING: BADGE 4 (DESIGN SYSTEM & UI)

**Purpose:** Extraktion der Design-Regeln, UI-Komponenten und Typografie-Standards.
**Location:** `.knowledge/mission/SUBAGENT_BRIEFING_BADGE_4.md`

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für Badge 4: DESIGN SYSTEM & UI.
Lies: C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_4.md
Erstelle: EXTRACTION_REPORT_BADGE_4.md

REGLER AUF: 100% Tiefe, 0% Reduktion.
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

---

## 0.1 PRE-FLIGHT WARNINGS (Badge 3 Learnings)

> [!WARNING]
> **LERNE AUS DEN FEHLERN DEINES VORGÄNGERS:**
>
> 1. **Context Ignorance:** Du darfst Sektion 2.1 NICHT überspringen. Es ist ein Gesetz.
> 2. **Path Guessing:** Rate niemals Pfade. Nutze exakt die absoluten Pfade unten.
> 3. **Skill Blindness:** `remotion-core/SKILL.md` enthält Gesetze (z.B. ThreeCanvas), die Vault-Wissen überschreiben.

---

## 1. MISSION PHILOSOPHY (Das Fundament)

### 1.1 Warum wir das tun

Dieser Report ist kein Dokument für das Archiv. Er ist der **Lehrer für die nächste Generation von Agents**. Wenn du hier schlampst, lernen alle Nachfolger falsch.

### 1.2 Das Credo (Nicht verhandelbar)

Lies das Quality Credo in `gemini.md`. Deine Arbeit wird daran gemessen:

- **Ausführlichkeit:** Lieber 3 Sätze zu viel als 1 Wort zu wenig.
- **Kontext:** Kein Code-Block existiert im Vakuum. Erkläre das WARUM.
- **Unmissverständlichkeit:** Schreibe so, dass ein Junior-Dev es versteht.

> **Mantra:** "Ich bin kein Kopierer, ich bin ein Kurator."

---

## 2. PFLICHTLEKTÜRE (Dein Input)

### 2.1 Context Kit (Standard) – GATEKEEPER

Diese Dateien MÜSSEN gelesen werden, um Viron zu verstehen:

**Bevor du eine Zeile Code analysierst, bestätige:**

- [ ] Ich habe `viron-core/vision.md` gelesen (Virtual Production Paradigma).
- [ ] Ich habe `00-master-workflow-2026-integration.md` gelesen (Entscheidungs-Logik).
- [ ] Ich habe `00-overview-index-v2-1-complete.md` gelesen (Wissens-Landkarte).
- [ ] Ich habe `remotion-core/SKILL.md` gelesen (Frame-Driven Law, Redundanz-Check).

| Datei      | Pfad                                                                         | Zweck                         |
| ---------- | ---------------------------------------------------------------------------- | ----------------------------- |
| **Vision** | `C:\Workspace\Repos\remotion-studio\viron-core\vision.md`                    | Das "Video as Code" Paradigma |
| **Logic**  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-master-workflow-2026-integration.md` | Die Entscheidungs-Logik       |
| **Index**  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-overview-index-v2-1-complete.md`     | Die Landkarte des Wissens     |
| **Skill**  | `C:\Workspace\Repos\remotion-studio\.agent\skills\remotion-core\SKILL.md`    | Der Redundanz-Check           |

### 2.2 Badge-Spezifische Quellen (Deine Mission)

Lies diese Dateien Zeile für Zeile (Deep Read):

**REPO-DATEIEN:**

| Kategorie     | Datei                         | Pfad                                                                           | Extraktions-Ziel                                                                  |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Theme Core    | `theme.md`                    | `C:\Workspace\Repos\remotion-studio\viron-core\theme.md`                       | `export const THEME`, Metallic Palette (stop1-7), Tailwind Config (Zeile 284)     |
| UI Stack      | `GUIDE_Viron_Button_Stack.md` | `C:\Workspace\Repos\remotion-studio\src\learnings\GUIDE_Viron_Button_Stack.md` | 4-Layer Architecture (Backdrop, Glass, Effects, Post-Processing)                  |
| UI Blueprint  | `viron-button-guide.md`       | `C:\Workspace\Repos\remotion-studio\guides\viron-button-guide.md`              | Eye Candy Stack: MeshTransmissionMaterial, Caustics, Sparkles. Dependency Matrix. |
| Chart Pattern | `BarChart.md`                 | `C:\Workspace\Repos\remotion-studio\patterns\BarChart.md`                      | Gold Price Chart, `spring()` Animation Pattern                                    |
| Text Pattern  | `WordHighlight.md`            | `C:\Workspace\Repos\remotion-studio\patterns\WordHighlight.md`                 | Word Highlighting via Spring Animation                                            |

**VAULT-DATEIEN:**

| Kategorie        | Datei               | Pfad                                                                                        | Extraktions-Ziel                                                            |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Layout 2026      | `Container Queries` | `C:\Viron\90_VAULT\NEW SUFF\Remotion\20-layout-patterns-01-container-queries-und-grids.md`  | Container Queries (`@container`), CSS Subgrid, Bento Grid                   |
| View Transitions | `View Transitions`  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\20-layout-patterns-02-view-transitions-in-remotion.md` | View Transitions API Level 2, `viewTransitionName`, Shared Element Morphing |

**GLOBAL SKILL-DATEIEN:**

| Kategorie  | Datei                | Pfad                                                                                                | Extraktions-Ziel                                                  |
| ---------- | -------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| CSS        | `tailwind.md`        | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules\tailwind.md`        | **VERBOT:** `transition-*`, `animate-*`. Nur `useCurrentFrame()`. |
| Typography | `fonts.md`           | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules\fonts.md`           | `@remotion/google-fonts`, `loadFont()`, `waitUntilDone()`         |
| Animation  | `gifs.md`            | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules\gifs.md`            | `<AnimatedImage>`, `loopBehavior`, `playbackRate`                 |
| Data Viz   | `charts.md`          | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules\charts.md`          | **VERBOT:** Third-Party-Animationen. `spring()` nur.              |
| Text       | `text-animations.md` | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules\text-animations.md` | Typewriter = String Slicing, NICHT opacity                        |

---

## 3. DEIN WORKFLOW

1. **Deep Read:** Lies alle Quellen vollständig. Scanne nicht.
2. **Context Injection:** Wenn du einen Code-Block findest, lies den Absatz davor/danach. Warum ist das so?
3. **Kategorisierung:** Sortiere jeden Fund in A, B oder C:
   - **A: SKILL_UPDATE** (Generisches Remotion-Wissen)
   - **B: PROJECT_IP** (Viron-spezifische Configs/Secrets)
   - **C: RESEARCH_NOTE** (Kontext, Tutorials, Begründungen)
4. **Schreiben:** Erstelle den Report im Format von Sektion 4.

### 3.1 EXTRAKTIONS-PFLICHT (Kritisch!)

Wenn im Orchestrator-Hinweis-Block **konkrete Zeilen-Ranges** genannt werden:

- Diese sind **PFLICHT-Extraktionen**, nicht "prüfen ob nötig"
- Lies die genannten Zeilen
- Extrahiere sie VOLLSTÄNDIG
- Wenn du sie verwirfst: Dokumentiere WARUM (Redundanz? Bereits im Skill?)

### 3.2 PROBLEM-LÖSUNGS-GEBOT

Wenn du ein Problem identifizierst (z.B. "Math.random() ist nicht deterministisch"):

1. Suche in den Quellen nach einer Lösung
2. Wenn gefunden: Dokumentiere Problem UND Lösung
3. Wenn nicht gefunden: Markiere als `TODO: Lösung fehlt in Quellen`

**Anti-Pattern:** "Das ist ein Problem" ohne Lösung oder TODO

### 3.3 ORCHESTRATOR SPEZIAL-HINWEISE (Context Scan)

Diese Hinweise basieren auf meinem Vorab-Scan der Dateien. Sie helfen dir, die wichtigsten Inhalte zu finden:

#### A. THEME & CORE (theme.md, Zeile 18)

- **Metallic Palette:** `colors.metallic.stop1` bis `stop7` sind unser Core Branding.
- **7-Stop Gradient:** Dokumentiere `gradients.metallic135` und `metallicRadial`.
- **Fonts:** "Syne" (Display), "Inter" (Sans), "IBM Plex Mono" (Mono).
- **Tailwind Integration:** Zeile 284 zeigt, wie `THEME` die Config speist.

#### B. UI COMPONENTS (viron-button-guide.md)

- **Tier 1 (Eye Candy):** `MeshTransmissionMaterial` mit `background={videoTexture}`.
- **Caustics:** `<Caustics color="#00FFFF" intensity={0.7} />`.
- **Lightformers:** Neon Accents in `<Environment>`.
- **Sparkles:** `<Sparkles count={400} color="#00f5ff" />`.
- **Post-Processing:** Bloom + Glitch + Noise + ColorCorrection.
- **KRITISCH:** Lamina ist ARCHIVIERT. Nutze `three-custom-shader-material` (CSM).

#### C. LAYOUT (Vault 20er-Module)

- **Container Queries:** `container-type: inline-size;` + `@container (min-width: 400px)`.
- **CSS Subgrid:** `grid-template-columns: subgrid;` für verschachtelte Layouts.
- **Bento Grid:** Asymmetrische Items (1x1, 2x2, 3x1).
- **View Transitions:** `viewTransitionName: "hero"` + `document.startViewTransition()`.

#### D. VERBOTE (Global Skills)

- **Tailwind:** Keine `transition-*` oder `animate-*` Klassen.
- **Charts:** Keine Third-Party-Animationen (D3.js Animationen deaktivieren!).
- **Text:** Typewriter = `text.slice(0, charIndex)`, NICHT opacity-basiert.

---

## 4. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_4.md`

**Format für JEDEN Punkt:**

````markdown
### [Titel des Punktes]

**Quelle:** `[datei.md]` (Zeilen X-Y)

**Kontext/Erklärung:**
[Hier MUSS Prosa stehen. Erkläre das WARUM. Zitiere Warnungen.]

**Code/Daten:**

```typescript
[Hier der Code-Block]
```
````

**Implikation:**
[Optional: Was bedeutet das für uns?]

---

## 5. STATISTIK & HEADER

```markdown
# 🎯 Badge 4: Extraction Report – DESIGN SYSTEM & UI

**Version:** 1.0
**Analyst:** Sub-Agent

## 📊 Statistik

| Kategorie        | Anzahl | Beschreibung       |
| ---------------- | ------ | ------------------ |
| A: SKILL_UPDATE  | [N]    | Generisches Wissen |
| B: PROJECT_IP    | [N]    | Viron Secrets      |
| C: RESEARCH_NOTE | [N]    | Kontext            |
| ❌ VERWORFEN     | [N]    | Redundant          |
```

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

**Ziel:** Der Orchestrator soll nach dem Lesen sofort wissen, was zu tun ist.

---

## 8. LEARNINGS (Prozess-Gedächtnis)

Reflektiere deine Arbeit. Was lief gut? Was war unklar?

```markdown
## 📝 Badge 4 Learnings

| Was         | Warum                         | Empfehlung                 |
| :---------- | :---------------------------- | :------------------------- |
| ✅ [Erfolg] | [Grund, z.B. klare Regel]     | [Beibehalten/Verstärken]   |
| ❌ [Fehler] | [Grund, z.B. Missverständnis] | [Briefing-Fix vorschlagen] |
```

---

## 9. CHECKLISTE VOR ABGABE

- [ ] Alle 12 Badge-Quellen vollständig gelesen?
- [ ] Alle 4 Context-Kit-Dateien gelesen?
- [ ] Jeden Code-Block mit Kontext-Prosa angereichert?
- [ ] A/B/C Kategorien sauber getrennt?
- [ ] Metallic Palette dokumentiert?
- [ ] Eye Candy Stack (Tier 1-4) dokumentiert?
- [ ] CSS Verbote (Tailwind, Animationen) dokumentiert?
- [ ] Container Queries + View Transitions dokumentiert?
- [ ] Empfehlungs-Sektion ausgefüllt?
- [ ] Learnings Sektion ausgefüllt?
- [ ] Format strikt eingehalten?

**AN DIE ARBEIT.**

---

_Briefing v2.1 | Template-Konform | Context-Scan Complete | 2026-01-31_
