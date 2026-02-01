# 🎯 SUB-AGENT BRIEFING: BADGE 7 (SYSTEM ARCHITECTURE & CLOUD)

**Version:** 4.0 (Platinum Standard)
**Status:** FORENSIC AUDIT MODE
**Analyst Role:** Viron Systems Architect

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für Badge 7: SYSTEM ARCHITECTURE & CLOUD.
Lies: C:\Workspace\Repos\remotion-studio\.agent\handover\SUBAGENT_BRIEFING_BADGE_7.md
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_7.md

REGLER AUF: 100% Tiefe, 0% Reduktion.
MODUS: ARCHITECT (System-Level, nicht Component-Level).
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

---

## 1. MISSION PHILOSOPHY (Das Fundament)

### 1.1 Deine Wahre Rolle

Du bist der **ARCHITEKT** dieses Systems. Wir besitzen bereits generisches Wissen über Remotion-Components (`remotion-core/SKILL.md`). Dein Job ist es, das **Betriebssystem** zu extrahieren: Wie fließen Daten? Wie rendern wir in der Cloud? Wie ist die Ordnerstruktur?

### 1.2 Das Viron-Credo (Forensik)

1.  **Skill First:** Was im Global Skill (`remotion-best-practices`) steht, ist _verboten_. Dupliziere keine `<Sequence>`-Erklärungen.
2.  **Structure over Syntax:** Uns interessiert hier nicht der Code einer Komponente, sondern die **Logik** dahinter (Routing, Tiers, Access Control).
3.  **Smoking Guns:** Extrahiere exakte Tabellen (Cloud Tiers, Routing Budgets). Keine Prosa.

---

## 2. PFLICHTLEKTÜRE (Dein Input)

### PHASE 0: CONTEXT KIT (Standard)

_Bestätige das Lesen dieser Dateien:_

- `viron-core/vision.md` (Vision)
- `00-master-workflow-2026-integration.md` (Workflow Logic)
- `00-overview-index-v2-1-complete.md` (Knowledge Map)
- `.agent/skills/remotion-core/SKILL.md` (Redundanz-Check)

### PHASE 1: ORCHESTRATOR HINTS (High-Value Targets)

_Ich habe die Dateien gescannt. Dies sind die **PFLICHT-EXTRAKTIONEN**, die du finden MUSST:_

#### A. THE CLOUD PIPELINE (`60-cloud-rendering...`)

- **The Tiers:** Extrahiere die Tabelle mit "Draft", "Standard", "High", "Ultra" (CRF-Werte, Worker-Counts, Cost).
- **The Calculator:** Die Logik zur Kostenschätzung.
- **Hybrid Mode:** Die Entscheidungskriterien für "Local vs. Lambda vs. Render Farm".

#### B. THE SYSTEM MAP (`22_SYSTEM_PLAN...`)

- **The 7 Departments:** Extrahiere die genaue Responsibilities und Access-Control-Regeln der 7 Departments (`DEPT_CORE_ENGINE`, `DEPT_VIDEO`, etc.).
- **Canon Packs:** Was sind "Canon Packs" und wann werden sie geladen?

#### C. THE ROUTING BRAIN (`23_ROUTING_...` & `24_ROUTING_...`)

- **Input Detection:** Wie unterscheidet der Agent `VIDEO_FILE` von `TRANSCRIPT_JSON`?
- **Output Specs:** Die exakten Bitrates/Codecs/LUFS für `SHORT` vs. `SHOWCASE` vs. `PRODUCTION`.
- **Context Budgets:** Wieviel % darf jeder Job an Kontext laden?

#### D. THE WORKFLOW LAWS (`viron-core/workflow.md`)

- **Commit Convention:** Das strikte Format (`feat:`, `fix:`, `docs:`).
- **Performance Monitor:** Die FPS-Grenzwerte (< 55 FPS Warning).

---

## 3. DEIN WORKFLOW (The Architect Loop)

Für jeden gefundenen System-Baustein:

1.  **Scan:** Lies die Logik (z.B. "Lambda braucht CRF 20 für Standard").
2.  **Check:** "Steht das im Skill `remotion-best-practices`?" (Nein, Lambda ist Viron-Spezifikum).
3.  **Audit:**
    - **JA (Redundant):** Ab in die **🗑️ Verworfen**-Tabelle.
    - **NEIN (Delta):** Extrahiere als **✅ MITNEHMEN** mit Beweis.

---

## 4. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `.knowledge/mission/EXTRACTION_REPORT_BADGE_7.md`

### 4.1 "MITNEHMEN" Format

````markdown
### [System-Komponente]

**Quelle:** `[datei.md]` (Zeilen X-Y)
**Typ:** SYSTEM_ARCH

**Skill-Check:**

- [ ] In Global Skill gefunden? **NEIN** (Lambda/Cloud ist nicht Core-Remotion)

**Kontext:**
[Erklärung der Architektur-Entscheidung]

**Beweis (Code/Table):**

```typescript
[Relevanter Ausschnitt / Tabelle]
```
````

### 4.2 "VERWORFEN" Format (MANDATORY)

```markdown
## 🗑️ Verworfen (Skill-Redundanzen)

| Fund                  | Quelle      | Skill-Konflikt              | Entscheidung |
| :-------------------- | :---------- | :-------------------------- | :----------- |
| Basic Sequence Syntax | pipeline.md | remotion-core/sequencing.md | ❌ DROP      |
```

---

## 5. EMPFEHLUNGEN

Liste auf, wo die Architektur Lücken hat oder wo "Legacy"-Dateien aktualisiert werden müssen.

**START ARCHITECTURE AUDIT.**
