# 🎯 SUB-AGENT BRIEFING TEMPLATE (V1.0)

**Purpose:** Master-Vorlage für alle zukünftigen Badge-Briefings. Basiert auf Learnings aus Badge 1.
**Location:** `.knowledge/mission/SUBAGENT_BRIEFING_TEMPLATE.md`
**Usage:** Kopiere diese Vorlage und ersetze die `[PLACEHOLDER]`-Felder für jeden neuen Badge.

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für die chirurgische IP-Extraktion von [BADGE_NAME].
Dein Marschbefehl liegt hier:
C:\Workspace\Repos\remotion-studio\.knowledge\mission\subagent-briefing-badge-[N].md

REGLER AUF: 100% Tiefe, 0% Reduktion.
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
Erstelle den EXTRACTION_REPORT_BADGE_[N].md nach Abschluss.
```

---

## 1. MISSION KONTEXT

### 1.1 Das Viron Paradigma

Viron behandelt **Video als Code**. Statt Export → Premiere → Render folgen wir dem Workflow **Code → Commit → Render**. Videos sind deterministisch, versionierbar und skalierbar.

### 1.2 Warum diese Extraktion?

- **Deine Trainingsdaten sind veraltet** – Die Vault-Recherchen bringen 2026er Standards.
- **Der Global Skill ist ein Industrie-Baseline** – Wir suchen das Viron-spezifische DARÜBER HINAUS.
- **Qualität > Geschwindigkeit** – Lieber einmal richtig als dreimal nacharbeiten.

---

## 2. PFLICHTLEKTÜRE (Lies diese Dateien ZUERST)

### 2.1 Orientierungs-Dateien (Projekt-Kontext)

| Datei                      | Absoluter Pfad                                                                 | Zweck                                                                     |
| :------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Local SKILL.md**         | `C:\Workspace\Repos\remotion-studio\.agent\skills\remotion-core\SKILL.md`      | Überblick Global Skill Kategorien, wann welche Datei geladen werden muss. |
| **Documentation Manifest** | `C:\Workspace\Repos\remotion-studio\viron-core\documentation_manifest.md`      | Wissens-Router für Viron-spezifische Module.                              |
| **Source Master Index**    | `C:\Workspace\Repos\remotion-studio\.knowledge\mission\source-master-index.md` | Vollständiger Index aller 125+ Quelldateien mit Deep-Descriptions.        |

### 2.2 Badge-Spezifische Quelldateien

| Kategorie                       | Datei                   | Absoluter Pfad           |
| :------------------------------ | :---------------------- | :----------------------- |
| [PLACEHOLDER: REPO/VAULT/SKILL] | [PLACEHOLDER: filename] | [PLACEHOLDER: full path] |

---

## 3. TECHNOLOGIE-STACK (Referenz)

| Layer         | Technology        | Viron-Nutzung               |
| :------------ | :---------------- | :-------------------------- |
| Simulation    | React Three Fiber | 3D-Modelle, PBR-Materialien |
| Rendering     | Tailwind CSS v4   | UI auf 3D-Surfaces          |
| Orchestration | Remotion 4.0      | Timing, Sequencing          |
| Camera        | Drei Controls     | Spline-Paths                |
| Export        | Remotion Renderer | H.264, Lambda               |

---

## 4. DEIN WORKFLOW (Schritt für Schritt)

### Schritt 1: Deep-Read

Lies jede Quelldatei vollständig. Keine Sprünge, keine Zusammenfassungen.

### Schritt 2: Kategorisierung

Für JEDEN wertvollen Block, entscheide:

| Kategorie            | Definition                                                                         | Beispiel                                         |
| :------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------- |
| **A: SKILL_UPDATE**  | Remotion-Wissen, das für JEDES Projekt gilt. Aktualisiert meine Trainingsdaten.    | Neue API, bessere Pattern, Performance-Tipps     |
| **B: PROJECT_IP**    | Viron-spezifische Workflows, Configs, Templates. NICHT generisch wiederverwendbar. | Lambda-Config mit eu-central-1, Theme.ts Pattern |
| **C: RESEARCH_NOTE** | Kontext, Entscheidungen, Tutorials. Archiv-würdig aber nicht operativ.             | "Warum H.264 statt WebM", Lernpfade              |

### Schritt 3: Redundanz-Check

Vergleiche mit dem Global Skill (SKILL.md Sektion 4).

- **Bereits dokumentiert?** → Verwerfen (mit Begründung)
- **Noch nicht dokumentiert?** → Behalten (mit Zeilenreferenz)

### Schritt 4: Konflikt-Erkennung

Wenn Repo und Vault unterschiedliche Werte nennen → **KONFLIKT melden**, nicht ignorieren.

### Schritt 5: Report erstellen

Erstelle `EXTRACTION_REPORT_BADGE_[N].md` im Format von Sektion 6.

---

## 5. VERHALTENSREGELN (Kritisch)

### 5.1 Qualität > Geschwindigkeit

> [!IMPORTANT]
> **Lieber 1x richtig als 3x nacharbeiten.**
> Wenn du unsicher bist, STOPPE und FRAGE den Orchestrator.

### 5.2 Keine Limits, aber Guidance

- **Es gibt KEINE Maximalgröße.** Schreibe so viel wie nötig.
- **Es gibt eine MINDESTTIEFE:** Jeder IP-Punkt braucht:
  - Zeilenreferenz zur Quelle
  - 1-3 Sätze Erklärung
  - Code-Beispiel (wenn vorhanden)

### 5.3 Referenz-Stil statt Copy-Paste

❌ **Falsch:** Vollständigen 50-Zeilen-Codeblock kopieren
✅ **Richtig:** `pipeline.md:90-110 → Lambda Config mit Viron-optimierten Werten:`

```typescript
// Nur die 5 kritischen Zeilen, nicht den ganzen Block
region: "eu-central-1",
framesPerLambda: 4,
memorySizeInMb: 3009
```

### 5.4 Tutorial-Inhalte

Tutorial-Style Dokumentation ist **nicht automatisch wertlos**.

- Wenn es einzigartige Viron-Prozesse beschreibt → **RESEARCH_NOTE**
- Wenn es generisches "Hello World" ist → **Verwerfen**

### 5.5 Rückfragen sind erwünscht

> [!TIP]
> Du darfst jederzeit fragen:
>
> - "Ist dieser Block Viron-spezifisch oder generisch?"
> - "Soll ich diese 50 Zeilen ausführlich zitieren oder nur referenzieren?"
> - "Dieses Konzept verstehe ich nicht – bitte erklären."

---

## 6. OUTPUT FORMAT

Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_[N].md`

Der Report muss folgende Struktur haben:

### Header

```markdown
# 🎯 Badge [N]: Extraction Report – [BADGE_TITLE]

**Version:** 1.0
**Badge ID:** VIRON-2026-B[N]
**Extraction Date:** [YYYY-MM-DD]
**Analyst:** Sub-Agent
```

### Statistik-Sektion

```markdown
## 📊 Statistik

| Kategorie | Dateien | Analysiert  |
| --------- | ------- | ----------- |
| A: Repo   | [N]     | [filenames] |
| B: Vault  | [N]     | [filenames] |
| C: Skill  | [N]     | [filenames] |
| **TOTAL** | **[N]** | [status]    |
```

### Sektion A: SKILL_UPDATES

```markdown
## ✅ A: SKILL_UPDATES (Global Skill Anreicherung)

### Aus [filename](file:///path/to/file)

**Zeilen X-Y:** [Kurzbeschreibung]
// Nur die kritischen Zeilen, nicht den ganzen Block
```

### Sektion B: PROJECT_IP

```markdown
## ✅ B: PROJECT_IP (Viron-Spezifisch)

### Aus [filename](file:///path/to/file)

**Zeilen X-Y:** [Kurzbeschreibung]
[Erklärung warum Viron-spezifisch]
```

### Sektion C: RESEARCH_NOTES

```markdown
## 📚 C: RESEARCH_NOTES (Archiv)

### Aus [filename](file:///path/to/file)

**Zeilen X-Y:** [Was es enthält, warum archivwürdig]
```

### Verworfene Punkte

```markdown
## ❌ VERWORFENE PUNKTE (Redundanz-Check)

| Quelle | Inhalt  | Warum verworfen?                  |
| ------ | ------- | --------------------------------- |
| [file] | [topic] | Bereits in Global Skill [rule.md] |
```

### Konflikte

```markdown
## ⚠️ KONFLIKTE (Zur Prüfung)

| Quelle A    | Quelle B    | Widerspruch   | Empfehlung       |
| ----------- | ----------- | ------------- | ---------------- |
| [file:line] | [file:line] | [description] | [recommendation] |
```

### Offene Fragen

```markdown
## ❓ OFFENE FRAGEN (Falls vorhanden)

1. [Frage an Orchestrator]
2. [Unsicherheit zu Thema X]
```

```

---

## 7. DEFINITION OF DONE

- [ ] Alle Quelldateien vollständig gelesen (keine Sprünge)
- [ ] Jeder IP-Punkt kategorisiert (A/B/C)
- [ ] Redundanzen gegen Global Skill geprüft
- [ ] Konflikte dokumentiert (auch wenn 0)
- [ ] Offene Fragen formuliert (wenn vorhanden)
- [ ] Report in `.knowledge/mission/` abgelegt

---

**Viron Mission 2026: [BADGE_NAME] – Template V1.0**
```
