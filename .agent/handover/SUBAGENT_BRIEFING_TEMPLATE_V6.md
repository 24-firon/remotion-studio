# 🎯 SUB-AGENT BRIEFING: BADGE [N] ([DOMAIN_NAME])

**Version:** 6.0 (Diamond Standard - Ultimate Fusion)
**Status:** ACTIVE
**Analyst Role:** [ARCHITECT|COMPONENT|SECURITY|PERFORMANCE|AUDITOR]
**Mission:** Extrahiere Viron-spezifische System-IP, keine Core-Remotion-Duplikate

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für Badge [N]: [DOMAIN_NAME].
Lies: C:\Workspace\Repos\remotion-studio\.agent\handover\SUBAGENT_BRIEFING_BADGE_[N].md
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_[N].md

REGLER AUF: 100% Tiefe, 0% Reduktion.
MODUS: [MODE].
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

---

## 📊 EXECUTIVE BRIEFING

| Metrik | Ziel | Threshold |
|:-------|:-----|:----------|
| Files to Audit | [N] | < 50% = FAIL |
| Core Patterns | [N] | > 0 |
| Key Tables | [N] | ≥ 3 |
| Redundancies Dropped | [N] | MUST document |
| Context Budget | [%] | < 80% |

**Scope:** [2-3 Sätze prägnante Zusammenfassung des Badge-Scopes]

---

## 🎯 STRUCTURE REQUIREMENTS (V6 Diamond Standard)

**MANDATORY in Report - Keine Ausnahmen:**

| Element | Format | Example | Why |
|:--------|:-------|:--------|:----|
| **Sections** | `THE [SYSTEM]` | THE CLOUD PIPELINE | Memorable, scanbar |
| **Hard Facts** | 🔑 **Key: Value** | 🔑 **CRF: 20** | Sofortiger Wert |
| **Context Labels** | `[V1/V2/V3/V4/new]` | `[V3]` | Historische Spur |
| **Tables** | Markdown Tables | See below | Forensische Qualität |
| **Evidence** | Code Blocks + Lines | `Line 45-67` | Beweispflicht |
| **Source Links** | `[text](../../path)` | `[vision.md](../../viron-core/vision.md)` | Navigation |

---

## 1. MISSION PHILOSOPHY (Das Fundament)

### 1.1 Deine Wahre Rolle

Du bist ein **FORENSISCHER ARCHITEKT**. Dein Job ist nicht "Zusammenfassen", sondern **Delta-Extraktion**:
- Was ist Viron-spezifisch?
- Was steht NICHT im Global Skill?
- Welche Architektur-Entscheidungen wurden getroffen?

### 1.2 Das Viron-Credo (Non-Negotiable)

1. **🔴 Skill First:** Prüfe JEDES Detail gegen [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md)
   - Steht es im Skill? → NICHT extrahieren (nur referenzieren)
   - Ist es Viron-spezifisch? → MITNEHMEN mit Beweis

2. **🔴 Negative Beweispflicht:** Wenn du etwas verwirfst, MUSST du beweisen warum:
   ```markdown
   ## 🗑️ Verworfen
   | Fund | Quelle | Skill-Konflikt | Entscheidung |
   |:-----|:-------|:---------------|:-------------|
   | Basic Sequence | pipeline.md | remotion-core/sequencing.md | ❌ DROP |
   ```

3. **🔴 Smoking Guns:** Exakte Werte, keine Prosa:
   - ❌ "Viron nutzt gute Bitrates"
   - ✅ "Viron nutzt 8000k Bitrate für 1080p (siehe pipeline.md:45)"

4. **🔴 Structure over Syntax:** Uns interessiert die **Logik**, nicht der Code:
   - Routing-Regeln > Component-Props
   - Governance > Implementation
   - Ökonomie > Technologie

---

## 2. PFLICHTLEKTÜRE (Dein Input)

### PHASE 0: CONTEXT KIT (GATEKEEPER - MANDATORY)

Diese Dateien MÜSSEN gelesen werden. Ohne dieses Fundament ist jede Analyse wertlos.

| Datei | Pfad | Zweck | Kontext-Label |
|:------|:-----|:------|:--------------|
| **Vision** | [`viron-core/vision.md`](../../viron-core/vision.md) | "Video as Code" Paradigma | [CORE] |
| **Workflow** | [`00-master-workflow-2026-integration.md`](../../Remotion%20Recherche/00-master-workflow-2026-integration.md) | Entscheidungs-Logik | [CORE] |
| **Knowledge Map** | [`00-overview-index-v2-1-complete.md`](../../Remotion%20Recherche/00-overview-index-v2-1-complete.md) | Landkarte des Wissens | [CORE] |
| **Rules Core** | [`RULES_CORE.md`](../../.agent/RULES_CORE.md) | Architektur-Regeln | [RULES] |
| **Rules Workflow** | [`RULES_WORKFLOW.md`](../../.agent/RULES_WORKFLOW.md) | Prozess-Regeln | [RULES] |

### PHASE 1: SKILL REFERENCE (The Filter)

Lies diese Skills, um zu wissen was **Standard** ist (und somit NICHT in den Report gehört):

| Skill-Datei | Pfad | Zweck |
|:------------|:-----|:------|
| **Master Skill** | [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md) | Basis-Wahrheit |
| **Compositions** | [`rules/compositions.md`](../../.agent/skills/remotion-best-practices/rules/compositions.md) | Comp Props Structure |
| **Audio** | [`rules/audio.md`](../../.agent/skills/remotion-best-practices/rules/audio.md) | Standard Audio |
| **Sequencing** | [`rules/sequencing.md`](../../.agent/skills/remotion-best-practices/rules/sequencing.md) | Timing Logic |

### PHASE 2: HIGH-VALUE TARGETS (The Gold)

Hier liegen die Viron-Secrets. Untersuche auf Abweichungen vom Standard.

#### A. THE [SYSTEM_NAME_1]

**Ziel-Dateien:**
- [`file.md`](../../path/file.md) - [Beschreibung]
- [`file2.md`](../../path/file2.md) - [Beschreibung]

**Muss extrahieren:**
- 🔑 **Key Table 1:** Beschreibung
- 🔑 **Key Logic 2:** Beschreibung
- 🔑 **Key Threshold 3:** Beschreibung

#### B. THE [SYSTEM_NAME_2]

**Ziel-Dateien:**
- ...

**Muss extrahieren:**
- ...

#### C. THE [SYSTEM_NAME_3]

**Ziel-Dateien:**
- ...

**Muss extrahieren:**
- ...

---

## 3. DEIN WORKFLOW (The Forensic Loop)

Für jeden gefundenen System-Baustein:

### Schritt 1: SCAN
Lies die Logik (z.B. "Lambda braucht CRF 20 für Standard").

### Schritt 2: CHECK
Frage: "Steht das im Skill [`remotion-best-practices`](../../.agent/skills/remotion-best-practices/SKILL.md)?"

| Antwort | Aktion |
|:--------|:-------|
| **JA** (Standard-Remotion) | → Verwerfen |
| **NEIN** (Viron-spezifisch) | → Extrahieren |
| **UNSIcher** | → **STOP & ASK** |

### Schritt 3: AUDIT

**Wenn JA (Redundant):**
```markdown
## 🗑️ Verworfen
| Fund | Quelle | Skill-Konflikt | Entscheidung |
|:-----|:-------|:---------------|:-------------|
```

**Wenn NEIN (Delta):**
```markdown
### THE [SYSTEM_NAME] [new]
**Quelle:** `[file.md](../../path/file.md)` (Zeilen X-Y)
**Typ:** [SYSTEM_ARCH|COMPONENT|PATTERN|GOVERNANCE]
**Skill-Check:** [ ] Im Skill? **NEIN** (Viron-spezifisch)

**Kontext (V1):**
[Warum wurde diese Entscheidung getroffen? Was war die Alternative?]

**Beweis:**
```[Exakter Code-Ausschnitt oder Tabelle]```
```

### Schritt 4: LABEL
Markiere jeden Block mit seinem Ursprung:
- `[V1]` = Aus ursprünglichem Briefing
- `[V2]` = Aus vorherigem Report
- `[V3]` = Aus V3-Struktur-Learning
- `[V4]` = Aus Rules-Integration
- `[new]` = Neue Extraktion

---

## 4. OUTPUT FORMAT (Strikt - Keine Abweichungen!)

Erstelle: `EXTRACTION_REPORT_BADGE_[N].md`

### 4.1 FRONT MATTER

```markdown
# 🎯 EXTRACTION_REPORT_BADGE_[N]: [NAME]

**Badge:** [N] - [Name]
**Version:** 1.0 (V6 Diamond)
**Basis:** V1 Kontext + V3 Struktur + V4 Rules
**Status:** IN_PROGRESS
**Auditor:** [Agent Name]
**Date:** [YYYY-MM-DD]

---

## 📊 EXECUTIVE SUMMARY

[3 prägnante Sätze mit wichtigster Erkenntnis]

| Metrik | Ergebnis | Delta zu V1 |
|:-------|:---------|:------------|
| Files Audited | [N] | +[X] |
| Core Findings | [N] | +[X] |
| Redundancies Dropped | [N] | - |
| Forensic Accuracy | [High/Medium/Low] | [+/-] |
```

### 4.2 CRITICAL FINDINGS (🔴 Must Know)

Nur Viron-spezifische System-IP. Hard Facts only.

```markdown
### THE [SYSTEM_NAME] [V1/V2/V3/V4/new]

**Quelle:** `[file.md](...)` (Zeilen X-Y)
**Typ:** [Kategorie]

**Kontext (V1):** [Historische Einordnung]

🔑 **Key: Value**
🔑 **Key: Value**

**Evidence:**
```code```
```

### 4.3 SUPPORTING EVIDENCE (🟡 Context)

Zusätzlicher Kontext, nicht kritisch aber hilfreich.

### 4.4 VERWORFEN (🗑️ Audit Trail)

| Fund | Quelle | Skill-Konflikt | Entscheidung |
|:-----|:-------|:---------------|:-------------|

### 4.5 COMPARISON (📊 V1 vs V6)

| Aspekt | V1 (Legacy) | V6 (Diese Version) | Delta |
|:-------|:------------|:-------------------|:------|
| Struktur | Flach | THE X Hierarchie | +Scanbarkeit |
| Metriken | Später | Sofort sichtbar | +Transparenz |
| Kontext | Unstrukturiert | Gekennzeichnet | +Klarheit |

---

## 5. QUALITÄTSKRITERIEN (Checkliste vor Abgabe)

- [ ] Alle P0-Dateien aus Phase 0 gelesen?
- [ ] Skill-Check für jedes Finding durchgeführt?
- [ ] Mindestens 3 Tabellen extrahiert?
- [ ] Keine Core-Remotion-Duplikate?
- [ ] Jede Quelle mit Zeilennummern?
- [ ] THE X Nomenklatur verwendet?
- [ ] Statistik-Tabelle ganz oben?
- [ ] Kontext-Labels [V1/V2/V3/V4/new] gesetzt?
- [ ] Verworfen-Tabelle dokumentiert?
- [ ] Hyperlinks funktionieren?

---

## 6. EMPFEHLUNGEN

[Liste architektonische Lücken oder Legacy-Dateien, die aktualisiert werden müssen]

---

**END OF BRIEFING**

**Remember:** Ausführlichkeit bedingt Missverständlichkeit. Sei präzise, nicht nur ausführlich.
