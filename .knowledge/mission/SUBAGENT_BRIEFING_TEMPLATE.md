# 🎯 SUB-AGENT BRIEFING TEMPLATE (V2.0)

**Purpose:** Master-Vorlage für alle zukünftigen Badge-Briefings. Basierend auf V3-Standard.
**Location:** `.knowledge/mission/SUBAGENT_BRIEFING_TEMPLATE.md`
**Usage:** Kopiere diese Vorlage und ersetze die `[PLACEHOLDER]`-Felder.

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für Badge [N]: [THEMA].
Lies: C:\Workspace\Repos\remotion-studio\.knowledge\mission\subagent-briefing-badge-[N].md
Erstelle: EXTRACTION_REPORT_BADGE_[N].md

REGLER AUF: 100% Tiefe, 0% Reduktion.
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

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

| Kategorie     | Datei         | Pfad          |
| ------------- | ------------- | ------------- |
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] |

---

## 3. DEIN WORKFLOW

1. **Deep Read:** Lies alle Quellen vollständig. Scanne nicht.
2. **Context Injection:** Wenn du einen Code-Block findest, lies den Absatz davor/danach. Warum ist das so?
3. **Kategorisierung:** Sortiere jeden Fund in A, B oder C:
   - **A: SKILL_UPDATE** (Generisches Remotion-Wissen)
   - **B: PROJECT_IP** (Viron-spezifische Configs/Secrets)
   - **C: RESEARCH_NOTE** (Kontext, Tutorials, Begründungen)
4. **Schreiben:** Erstelle den Report im Format von Sektion 4.

---

## 4. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `EXTRACTION_REPORT_BADGE_[N].md`

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

````

---

## 5. STATISTIK & HEADER

```markdown
# 🎯 Badge [N]: Extraction Report – [THEMA]

**Version:** 1.0
**Analyst:** Sub-Agent

## 📊 Statistik
| Kategorie | Anzahl | Beschreibung |
|-----------|--------|--------------|
| A: SKILL_UPDATE | [N] | Generisches Wissen |
| B: PROJECT_IP | [N] | Viron Secrets |
| C: RESEARCH_NOTE | [N] | Kontext |
| ❌ VERWORFEN | [N] | Redundant |
````

---

## 6. CHECKLISTE VOR ABGABE

- [ ] Alle Quellen vollständig gelesen?
- [ ] Jeden Code-Block mit Kontext-Prosa angereichert?
- [ ] A/B/C Kategorien sauber getrennt?
- [ ] Redundanzen verworfen & dokumentiert?
- [ ] Format strikt eingehalten?

**AN DIE ARBEIT.**
