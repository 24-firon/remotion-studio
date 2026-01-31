# 🎯 SUB-AGENT BRIEFING TEMPLATE (V3.0 - GOLD STANDARD)

**Purpose:** Master-Vorlage für Badge 5+ Briefings. Enforce "Auditor Mode".
**Location:** `.knowledge/mission/SUBAGENT_BRIEFING_TEMPLATE.md`
**Usage:** Kopiere diese Vorlage und ersetze die `[PLACEHOLDER]`-Felder.

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für Badge [N]: [THEMA].
Lies: C:\Workspace\Repos\remotion-studio\.knowledge\mission\subagent-briefing-badge-[N].md
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_[N].md

REGLER AUF: 100% Tiefe, 0% Reduktion.
MODUS: AUDITOR (Nicht Summarizer).
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

---

## 1. MISSION PHILOSOPHY (Das Fundament)

### 1.1 Deine Wahre Rolle

Du bist kein "Zusammenfasser" und kein "Autor".
Du bist ein **AUDITOR** und **GATEKEEPER**.

Dein Job ist es nicht, möglichst viel zu schreiben.
Dein Job ist es, **Müll (Redundanz)** aus dem neuen Repo fernzuhalten.

### 1.2 Das Viron-Credo (Nicht verhandelbar)

1.  **Skill First:** Der Global Skill ist das Gesetz. Was dort steht, existiert bereits. Es darf NIEMALS dupliziert werden.
2.  **Negative Beweispflicht:** Du musst beweisen, dass du geprüft hast. Jeder Fund braucht einen Skill-Check.
3.  **Viron-IP Focus:** Wir suchen die "Secret Sauce" (Konkrete Werte, spezifische Workflows), nicht generisches "Wie geht Remotion?".

> **Mantra:** "Ich werde nicht dafür bezahlt, was ich schreibe, sondern dafür, was ich WEGWIRFST, weil es schon im Skill steht."

---

## 2. PFLICHTLEKTÜRE (Dein Input)

### PHASE 1: SKILL INTERNALIZATION (Die Brille)

Bevor du irgendeine Source-Datei liest, musst du den Filter kalibrieren.
Lies diese Dateien, um zu wissen, was **NICHT** extrahiert werden darf.

| Skill-Datei (Ref) | Pfad                                                                                | Zweck                    |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------------ |
| **MASTER RULE**   | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\SKILL.md` | Die Basis-Wahrheit       |
| [Skill X]         | [Pfad zu relevanter Rule]                                                           | [Konkreter Filter-Grund] |

### PHASE 2: SOURCE EXTRACTION (Das Gold)

Erst jetzt liest du die Quellen. Suche nach Deltas (Unterschiede zur Phase 1).

| Kategorie | Datei  | Pfad            | Extraktions-Ziel (Viron-IP) |
| --------- | ------ | --------------- | --------------------------- |
| [Type]    | [Name] | [Absolute Path] | [Was suchen wir hier?]      |

> [!IMPORTANT]
> **ORCHESTRATOR NOTE:** Alle Pfade MÜSSEN vor Erstellung mit `list_dir` empirisch validiert worden sein. Keine Geister-Dateien!

---

## 3. DEIN WORKFLOW (The Auditor Loop)

Für jeden Absatz in den Quellen:

1.  **Scan:** Lies den Inhalt.
2.  **Check:** "Steht das schon im Skill (Phase 1)?"
3.  **Audit:**
    - **JA (Redundant):** Ab in den Müll (und ins Protokoll "Verworfen").
    - **NEIN (Delta):** Das ist Gold. Extrahiere es als "MITNEHMEN".
4.  **Enrich:** Füge Kontext hinzu (Warum machen wir das so?).

### 3.1 Die "Verworfen"-Pflicht

Ein Report ohne verworfene Inhalte ist verdächtig und wird abgelehnt.
Du musst beweisen, dass du Redundanzen gefunden und eliminiert hast.

---

## 4. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_[N].md`

### 4.1 Für jeden Fund (Das "MITNEHMEN" Format)

````markdown
### [Titel des Punktes]

**Quelle:** `[datei.md]` (Zeilen X-Y)
**Typ:** [SKILL_UPDATE | PROJECT_IP | RESEARCH_NOTE]

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `[skill-file.md]`)

**Kontext/Erklärung:**
[Hier MUSS Prosa stehen. Erkläre das WARUM.]

**Code/Daten:**

```typescript
[Hier der Code-Block]
```
````

**Implikation:**
[Was bedeutet das für uns?]

````

---

## 5. STATISTIK & HEADER

```markdown
# 🎯 Badge [N]: Extraction Report – [THEMA]

**Version:** 1.0 (Auditor Mode)
**Analyst:** Sub-Agent
**Date:** [YYYY-MM-DD]

## 📊 Statistik & Audit-Log

| Entscheidung | Anzahl | Details |
| :--- | :--- | :--- |
| ✅ MITNEHMEN | [N] | Viron-IP, Updates |
| ❌ NICHT DUPLIZIEREN | [N] | Skill-Redundanzen |
````

---

## 6. REDUNDANZ-PROTOKOLL (Der Negative Beweis)

Hier listest du auf, was du **verworfen** hast.

```markdown
## 🗑️ Verworfen (Skill-Redundanzen)

| Fund    | Original-Quelle | Steht bereits in Skill (Datei) | Entscheidung |
| :------ | :-------------- | :----------------------------- | :----------- |
| [Thema] | [Datei]         | [Skill-Rule]                   | ❌ DROP      |
```

---

## 7. EMPFEHLUNGEN FÜR ORCHESTRATOR

```markdown
## 📋 Empfehlungen

| Priorität | Aktion | Begründung |
| :-------- | :----- | :--------- |
| 🔴 HOCH   | ...    | ...        |
```

---

## 8. CHECKLISTE VOR ABGABE

- [ ] Skill-Files ZUERST gelesen?
- [ ] Jeden Fund gegen Skill geprüft?
- [ ] "Skill-Check" Feld in jedem Item ausgefüllt?
- [ ] "Verworfen"-Tabelle befüllt?
- [ ] Pfade sind absolut und korrekt?

**AUDIT STARTEN.**
