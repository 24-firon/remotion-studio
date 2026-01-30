# 🎯 SUB-AGENT BRIEFING: BADGE 1 REPAIR (V3 – Final)

**Mission:** Veredle den `EXTRACTION_REPORT_BADGE_1.md` zu einem **Self-Contained Knowledge Container**.
**Grundlage:** Dein V1 Report war inhaltlich gut (23 Punkte extrahiert), aber formal unvollständig.

---

## 1. DAS PROBLEM MIT V1 (Was du falsch gemacht hast)

| Fehler                 | Beispiel                       | Auswirkung                                  |
| ---------------------- | ------------------------------ | ------------------------------------------- |
| **Nackte Code-Blöcke** | Lambda Config ohne Erklärung   | Leser versteht nicht, _warum_ 3009MB        |
| **Keine Kategorien**   | Alles in einer Liste           | Unklar, was Skill-Update vs. Projekt-IP ist |
| **Fehlender Kontext**  | Decision Trees ohne Begründung | Die _Logik_ hinter den Entscheidungen fehlt |

**Dein neues Mantra:**

> "Ich bin kein Kopierer, ich bin ein Kurator. Jeder Code-Block braucht seine Erklärung."

---

## 2. DEIN WORKFLOW (Schritt für Schritt)

### Schritt 1: Re-Read (Deep)

Lies die Quelldateien der Punkte, die du extrahiert hast, **ERNEUT**.

- Nicht nur den Code-Block, sondern das **ganze Kapitel**.
- Verstehe die Argumentation, die Warnung, die Metrik.

**Quelldateien (die du bereits kennst):**
| Kategorie | Dateien |
|-----------|---------|
| Legacy Repo | `vision.md`, `documentation_manifest.md`, `pipeline.md` |
| Vault 2026 | `00-master-workflow...`, `00-overview-index...`, `10-remotion-basics...`, `Remotion Setup.md` |
| Global Skill | `animations.md`, `timing.md`, `sequencing.md`, `compositions.md` |

### Schritt 2: Context-Injection (Prosa hinzufügen)

Wenn du einen Code-Block in den Report kopierst, **MUSST** du:

1.  Die umgebende Prosa im Original lesen.
2.  Die Begründung ("Warum 3009MB?") als Einleitung schreiben.
3.  Warnungen ("Tu das nicht weil...") mitnehmen.
4.  Metriken ("Spart 50%") zitieren.

**Regel:** Kein Code-Block ohne begleitenden Kontext-Absatz.

### Schritt 3: Kategorisierung (A/B/C)

Sortiere jeden Punkt in **genau eine** dieser Kategorien:

| Kategorie             | Was gehört rein?                                        | Ziel-Ort                                       |
| --------------------- | ------------------------------------------------------- | ---------------------------------------------- |
| **A: SKILL_UPDATES**  | Generisches Remotion-Wissen, das im Global Skill fehlt. | `~/.gemini/.../remotion-best-practices/rules/` |
| **B: PROJECT_IP**     | Viron-spezifische Prozesse, Configs, Regeln.            | `remotion-studio/viron-core/`                  |
| **C: RESEARCH_NOTES** | Kontext, Tutorials, Entscheidungs-Begründungen.         | `remotion-studio/.knowledge/research/`         |

**Beispiele zur Orientierung:**

| Punkt aus V1           | Richtige Kategorie | Warum                                        |
| ---------------------- | ------------------ | -------------------------------------------- |
| Lambda Config (3009MB) | **A**              | Generisches Remotion/AWS Wissen              |
| Die 5 Säulen           | **B**              | Viron-Architektur, nicht generisch           |
| ROI-Metriken           | **C**              | Kontext für Business-Cases, nicht operativ   |
| Anti-Pattern Tabelle   | **A**              | Universelle Remotion-Regel (CSS verboten)    |
| Zero-Touch Pipeline    | **B**              | Viron-spezifischer Whisper+Auphonic Workflow |

### Schritt 4: Self-Contained schreiben

Der Report muss **ohne externe Dateien** verständlich sein.

- **Copy-Paste ist erlaubt und erwünscht.**
- Aber jeder Copy-Paste braucht seinen Kontext.

---

## 3. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_1_V2.md`

**Format für jeden Punkt:**

````markdown
### [Titel des Wissens-Blocks]

**Quelle:** `datei.md` (Zeilen X-Y)

**Kontext/Erklärung:**
[Hier kommt deine Prosa. Erkläre, warum das wichtig ist. Zitiere die Begründung aus dem Original-File. Nimm Warnungen mit. Nimm Metriken mit.]

**Code/Daten:**

```typescript
[Hier der vollständige Code-Block. Kürze ihn NICHT.]
```
````

**Implikation:**
[Optional: Was bedeutet das für die Praxis? Welche Entscheidung folgt daraus?]

````

---

## 4. HEADER DES NEUEN REPORTS

```markdown
# 🎯 Badge 1: Extraction Report – Time & Sequencing (V2)

**Version:** 2.0 (Context-Enriched)
**Badge ID:** VIRON-2026-B1
**Extraction Date:** 2026-01-30
**Analyst:** Sub-Agent

---

## 📊 Statistik

| Kategorie | Anzahl Punkte | Beschreibung |
|-----------|---------------|--------------|
| A: SKILL_UPDATES | [N] | Generisches Remotion-Wissen |
| B: PROJECT_IP | [N] | Viron-spezifische Secrets |
| C: RESEARCH_NOTES | [N] | Kontext und Tutorials |
| ❌ VERWORFEN | 14 | Bereits im Global Skill |
````

---

## 5. VERHALTENSREGELN (Nicht verhandelbar)

> [!IMPORTANT]
> **Qualität > Geschwindigkeit.** Lieber 1x richtig als 3x nacharbeiten.

> [!TIP]
> **Bei Unsicherheit: STOPPE und FRAGE.** Nicht raten!

> [!WARNING]
> **Keine "nackten" Code-Blöcke.** Jeder braucht seinen Kontext.

---

## 6. CHECKLISTE VOR ABGABE

- [ ] Alle 23 Punkte aus V1 sind in V2 enthalten
- [ ] Jeder Punkt hat eine Kategorie (A/B/C)
- [ ] Jeder Code-Block hat einen Kontext-Absatz
- [ ] Die Redundanz-Tabelle (14 Punkte) ist übernommen
- [ ] Das Format entspricht Sektion 3

---

**AN DIE ARBEIT. Lies die Quellen. Verstehe den Kontext. Baue V2.**
