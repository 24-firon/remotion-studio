# 🎯 SUB-AGENT BRIEFING: BADGE 7 (SYSTEM ARCHITECTURE & GOVERNANCE)

**Version:** 3.0 (Gold Standard)
**Status:** FORENSIC AUDIT MODE
**Analyst Role:** Auditor & IP-Miner

---

## 🛑 PHASE 0: CONTEXT-KIT (PFLICHT-LEKTÜRE)

Bevor du irgendeine Quelldatei anfasst, **MUSST** du diese 4 Kontext-Dateien verinnerlichen, um die "Viron-Brille" aufzusetzen. Ohne dieses Wissen ist deine Analyse wertlos.

| Datei            | Pfad                                                             | Warum lesen?                                  |
| :--------------- | :--------------------------------------------------------------- | :-------------------------------------------- |
| **Vision**       | `viron-core/vision.md`                                           | Verstehe das "Why" hinter der Architektur.    |
| **Integration**  | `.knowledge/archive/vault-analysis/core/integration-protocol.md` | Verstehe die Merge-Logik.                     |
| **Index**        | `.knowledge/source-master-index.md`                              | Kenne die Pfade.                              |
| **Global Skill** | `remotion-core/SKILL.md`                                         | Kenne den Standard, um Redundanz zu erkennen. |

---

## 🕵️ PHASE 1: SKILL INTERNALIZATION (DEAD ZONES)

Du musst wissen, was bereits "Global Standard" ist, um es **NICHT** zu extrahieren.

| Skill        | Pfad (via Global Pointer) | Was steht da schon drin? (NICHT EXTRAHIEREN!)        |
| :----------- | :------------------------ | :--------------------------------------------------- |
| `trimming`   | `rules/trimming.md`       | Alles über `startFrom`, `endAt`, `durationInFrames`. |
| `parameters` | `rules/parameters.md`     | Alles über `getInputProps()`.                        |

**Regel:** Wenn du erklärst, wie man `durationInFrames` setzt -> **FAIL**.
**Ausnahme:** Wenn du eine Formel für _Conrurrency Limits_ findest (nicht Standard-Remotion, sondern System-Limit) -> **WIN**.

---

## ⛏️ PHASE 2: SOURCE EXTRACTION (Das Gold)

Du analysierst jetzt die System-Spezifikationen. Extrahiere NUR Viron-spezifische Architektur-Patterns (Smoking Guns).

| Kategorie    | Datei                     | Pfad                            | Extraktions-Ziel (Viron-IP)                                         |
| :----------- | :------------------------ | :------------------------------ | :------------------------------------------------------------------ |
| **Core**     | `pipeline.md`             | `viron-core/pipeline.md`        | Concurrency Formel (`min(...)`), RAM-Teiler, Codec-Profile (8000k). |
| **Workflow** | `workflow.md`             | `viron-core/workflow.md`        | Git Flow (`release/`), Commit-Types, TS-Config Rules.               |
| **Trouble**  | `troubleshooting.md`      | `viron-core/troubleshooting.md` | Sync-Validator Logic (`> 2 Frames`), Memory Guards.                 |
| **Gov.**     | `integration-protocol.md` | _(siehe Phase 0 Pfad)_          | Die "Snippet Extraction" Regel (Z. 36) und "Golden Core Rule".      |

---

## ⚡ PHASE 3: THE "SMOKING GUN" HUNT (Beweislast)

Ich akzeptiere keine Behauptungen ohne Zeilennummer. Ich suche:

1.  **Concurrency:** Welcher mathematische Teiler (Faktor) wird für RAM genutzt?
2.  **Flow:** Wie heißen die 4 Branch-Typen im Viron Git-Flow?
3.  **Governance:** Was ist die "Golden Core Rule" beim Skill Merge? (Accept vs Reject).

---

## 4. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_7.md`

### 4.1 "MITNEHMEN" Format

```markdown
### [Titel der IP]

**Quelle:** [Dateipfad] (Zeilen X-Y)
**Typ:** PROJECT_IP
**Skill-Check:** [x] Explizit im Skill dokumentiert: NEIN (Geprüft gegen `trimming.md`)

**Kontext:**
[Warum ist das Viron-Spezifisch? Was ist das Delta zum Standard?]

**Code/Daten:**
[Exakter Code Snippet]
```

### 4.2 "VERWORFEN" Format (MANDATORY)

```markdown
## 🗑️ Verworfen (Skill-Redundanzen)

| Fund                 | Quelle      | Steht bereits in Skill | Entscheidung |
| :------------------- | :---------- | :--------------------- | :----------- |
| Basic Trimming Props | trimming.md | trimming.md            | ❌ DROP      |
```

---

**MISSION:** Extrahiere das "Betriebssystem" von Viron.
