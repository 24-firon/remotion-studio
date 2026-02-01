# 🎯 SUB-AGENT BRIEFING: BADGE [N] ([DOMAIN_NAME])

**Version:** 6.1 (Diamond Standard - Ausführlichkeit für Unmissverständlichkeit)
**Status:** ACTIVE
**Analyst Role:** [ARCHITECT|COMPONENT|SECURITY|PERFORMANCE|AUDITOR]
**Kredo:** Ausführlichkeit bedingt Unmissverständlichkeit

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

| Metrik | Ziel | Threshold | Warum wichtig |
|:-------|:-----|:----------|:--------------|
| Files to Audit | [N] | < 50% = FAIL | Grundlage für Delta |
| Core Patterns | [N] | > 0 | Viron-IP identifizieren |
| Key Tables | [N] | ≥ 3 | Forensische Qualität |
| Redundancies Dropped | [N] | Dokumentiert | Beweispflicht |
| Context Budget | [%] | < 80% | Fokus erhalten |

**Scope in 3 Sätzen:**
1. [Was ist der Untersuchungsgegenstand?]
2. [Was ist das Viron-spezifische Delta?]
3. [Was ist das erwartete Ergebnis?]

---

## 🎯 STRUCTURE REQUIREMENTS (V6.1 Diamond Standard)

**MANDATORY in Report - Keine Ausnahmen. Nicht optional. Nicht "nice to have".**

| Element | Format | Beispiel | Warum obligatorisch |
|:--------|:-------|:---------|:--------------------|
| **Sections** | `THE [SYSTEM]` | THE CLOUD PIPELINE | Mentale Landkarte. Der Leser weiß sofort, welches System gemeint ist. |
| **Hard Facts** | 🔑 **Key: Value** | 🔑 **CRF: 20** | Sofortiger Wert. Keine Interpretation nötig. |
| **Context Labels** | `[V1/V2/V3/V4/new]` | `[V3]` | Historische Spur. Woher kommt diese Information? |
| **Tables** | Markdown Tables | Siehe unten | Tabellen sind unmissverständlich. Prosa ist interpretationsabhängig. |
| **Evidence** | Code Blocks + Lines | `Line 45-67` | Beweispflicht. Ohne Quellenangabe ist es Spekulation. |
| **Source Links** | `[text](../../path)` | `[vision.md](../../...)` | Navigation. Jede Quelle muss erreichbar sein. |

**Warum diese Strenge?** 
Weil Ausführlichkeit in der Vorgabe Unmissverständlichkeit im Ergebnis bedingt. 
Wenn das Template ausführlich erklärt, was zu tun ist, kann das Ergebnis nicht missverstanden werden.

---

## 1. MISSION PHILOSOPHY (Das Fundament)

### 1.1 Deine Wahre Rolle

Du bist ein **FORENSISCHER ARCHITEKT**. Das bedeutet:

- **Nicht** "Zusammenfasser" (das wäre KI-Standard)
- **Nicht** "Übersetzer" (das wäre zu oberflächlich)  
- **Sondern:** **Delta-Extraktor**

Deine Aufgabe ist es, die Differenz zu finden zwischen:
- Was **generisch** ist (Remotion-Core, Global Skills)
- Was **Viron-spezifisch** ist (unsere Architektur, unsere Entscheidungen)

**Das Viron-spezifische Delta ist das Einzige, was in den Report gehört.**

### 1.2 Das Viron-Credo (Non-Negotiable)

Diese 4 Prinzipien sind nicht verhandelbar. Sie sind die Bedingung für die Unmissverständlichkeit unserer Dokumentation.

#### Prinzip 1: 🔴 Skill First

**Was bedeutet das?**

Bevor du irgendein Detail extrahierst, PRÜFE ob es bereits dokumentiert ist.

| Wo suchen | Pfad | Was ist dort |
|:----------|:-----|:-------------|
| Master Skill | [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md) | Die Basis-Wahrheit über Remotion |
| Rules Core | [`RULES_CORE.md`](../../.agent/RULES_CORE.md) | Viron-Architektur-Regeln |
| Best Practices | [`remotion-best-practices/rules/`](../../.agent/skills/remotion-best-practices/rules/) | Komponenten-Patterns |

**Entscheidungsbaum:**
```
Ist das Detail im Skill dokumentiert?
├── JA → NICHT extrahieren (nur referenzieren)
├── NEIN → Extrahieren mit Beweis
└── UNSICHER → STOP & ASK (nicht raten!)
```

**Warum das wichtig ist:**
Duplikation führt zu Divergenz. Divergenz führt zu Inkonsistenz. Inkonsistenz führt zu Fehlern.

#### Prinzip 2: 🔴 Negative Beweispflicht

**Was bedeutet das?**

Wenn du entscheidest, etwas NICHT in den Report aufzunehmen, MUSST du begründen warum.

**Format:**
```markdown
## 🗑️ Verworfen
| Fund | Quelle | Skill-Konflikt | Entscheidung | Begründung |
|:-----|:-------|:---------------|:-------------|:-----------|
| Basic Sequence | pipeline.md:45 | remotion-core/sequencing.md | ❌ DROP | Standard-Remotion, nicht Viron-spezifisch |
| useVideoConfig | code.tsx:23 | remotion-core/hooks.md | ❌ DROP | Core-API, keine Delta-Information |
```

**Warum das wichtig ist:**
Ohne Beweispflicht bleibt die Entscheidung undokumentiert. Undokumentierte Entscheidungen können nicht überprüft werden.

#### Prinzip 3: 🔴 Smoking Guns

**Was bedeutet das?**

Wir extrahieren exakte Werte, keine Beschreibungen.

| ❌ Falsch (Prosa) | ✅ Richtig (Smoking Gun) |
|:------------------|:-------------------------|
| "Viron nutzt gute Bitrates" | "Viron nutzt 8000k Bitrate für 1080p (pipeline.md:67)" |
| "Lambda ist schnell" | "Lambda: 20s für 30s Video bei CRF 20 (cloud.md:89)" |
| "Wir haben ein Budget" | "Context Budget: 80% für Core, 20% für Edge (rules.md:34)" |

**Warum das wichtig ist:**
Prosa ist interpretationsabhängig. Exakte Werte sind unmissverständlich.

#### Prinzip 4: 🔴 Structure over Syntax

**Was bedeutet das?**

Uns interessiert die **Logik** hinter dem Code, nicht der Code selbst.

| Syntax (Code) | Struktur (Logik) |
|:--------------|:-----------------|
| `<Sequence from={0} durationInFrames={30} />` | "Sequences werden durch absolute Frame-Positionen getrimmt" |
| `useAudioData({ fps, sampleRate })` | "Audio-Analyse erfordert konstante Sample-Rate" |
| `const { width, height } = useVideoConfig()` | "Composition-Props werden zur Laufzeit injected" |

**Warum das wichtig ist:**
Code ändert sich. Logik bleibt. Dokumentation muss stabil sein.

---

## 2. PFLICHTLEKTÜRE (Dein Input)

### PHASE 0: CONTEXT KIT (GATEKEEPER - MANDATORY)

**Diese Dateien MÜSSEN gelesen werden.**

Ohne dieses Fundament ist jede Analyse wertlos. Du würdest versuchen, ein Haus zu bauen, ohne den Boden zu kennen.

| Datei | Pfad | Zweck | Was du lernst |
|:------|:-----|:------|:--------------|
| **Vision** | [`viron-core/vision.md`](../../viron-core/vision.md) | "Video as Code" Paradigma | Warum wir tun, was wir tun |
| **Workflow** | [`00-master-workflow-2026-integration.md`](../../Remotion%20Recherche/00-master-workflow-2026-integration.md) | Entscheidungs-Logik | Wie Entscheidungen getroffen werden |
| **Knowledge Map** | [`00-overview-index-v2-1-complete.md`](../../Remotion%20Recherche/00-overview-index-v2-1-complete.md) | Landkarte des Wissens | Wo Informationen zu finden sind |
| **Rules Core** | [`RULES_CORE.md`](../../.agent/RULES_CORE.md) | Architektur-Regeln | Die Regeln des Systems |
| **Rules Workflow** | [`RULES_WORKFLOW.md`](../../.agent/RULES_WORKFLOW.md) | Prozess-Regeln | Wie wir arbeiten |

**Nach dem Lesen musst du beantworten können:**
1. Was ist das "Video as Code" Paradigma?
2. Welche 7 Departments gibt es?
3. Was ist ein "Canon Pack"?
4. Wie funktioniert unser Routing?

Wenn du das nicht beantworten kannst, HAST DU NICHT GRÜNDLICH GENUG GELESEN.

### PHASE 1: SKILL REFERENCE (The Filter)

Lies diese Skills, um zu wissen was **Standard** ist.

| Skill-Datei | Pfad | Zweck | Was du prüfst |
|:------------|:-----|:------|:--------------|
| **Master Skill** | [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md) | Basis-Wahrheit | Ist das Core-Remotion? |
| **Compositions** | [`rules/compositions.md`](../../.agent/skills/remotion-best-practices/rules/compositions.md) | Comp Props | Standard-Composition-Struktur |
| **Audio** | [`rules/audio.md`](../../.agent/skills/remotion-best-practices/rules/audio.md) | Audio-Patterns | Standard-Audio-Handling |
| **Sequencing** | [`rules/sequencing.md`](../../.agent/skills/remotion-best-practices/rules/sequencing.md) | Timing | Standard-Sequencing-Logik |

**Nach dem Lesen musst du unterscheiden können:**
- Was ist Standard-Remotion? (NICHT extrahieren)
- Was ist Viron-spezifisch? (EXTRAHIEREN)

### PHASE 2: HIGH-VALUE TARGETS (The Gold)

Hier liegen die Viron-Secrets. Untersuche auf Abweichungen vom Standard.

#### A. THE [SYSTEM_NAME_1]

**Was ist das für ein System?**
[2-3 Sätze Erklärung des Systems, seiner Funktion und seiner Bedeutung für Viron]

**Ziel-Dateien:**
- [`file.md`](../../path/file.md) - [Was enthält diese Datei? Warum ist sie wichtig?]
- [`file2.md`](../../path/file2.md) - [Was enthält diese Datei? Warum ist sie wichtig?]

**Muss extrahieren (Mindestens 3 Punkte):**
- 🔑 **Key Table 1:** [Beschreibung der Tabelle und ihrer Bedeutung]
  - Wo finde ich das? [Datei + Zeilen]
  - Warum ist das Viron-spezifisch?
  
- 🔑 **Key Logic 2:** [Beschreibung der Logik]
  - Wo finde ich das? [Datei + Zeilen]
  - Was wäre die Alternative?
  
- 🔑 **Key Threshold 3:** [Beschreibung des Thresholds]
  - Wo finde ich das? [Datei + Zeilen]
  - Was passiert bei Überschreitung?

#### B. THE [SYSTEM_NAME_2]

**Was ist das für ein System?**
[2-3 Sätze Erklärung]

**Ziel-Dateien:**
- ...

**Muss extrahieren:**
- ...

#### C. THE [SYSTEM_NAME_3]

**Was ist das für ein System?**
[2-3 Sätze Erklärung]

**Ziel-Dateien:**
- ...

**Muss extrahieren:**
- ...

---

## 3. DEIN WORKFLOW (The Forensic Loop)

Für jeden gefundenen System-Baustein:

### Schritt 1: SCAN

**Was tust du?**
Lies die Logik und identifiziere das Konzept.

**Beispiel:**
"In der Datei steht: 'Lambda braucht CRF 20 für Standard-Quality'"

**Output:**
Ein potenzielles Finding.

### Schritt 2: CHECK

**Was tust du?**
Frage: "Steht das im Skill?"

| Prüfung | Aktion |
|:--------|:-------|
| Öffne [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md) | Suche nach dem Konzept |
| Öffne relevante Rule-Dateien | Suche nach ähnlichen Patterns |
| Vergleiche mit Standard-Remotion | Ist das spezifisch oder generisch? |

**Entscheidung:**

| Antwort | Bedeutung | Aktion |
|:--------|:----------|:-------|
| **JA** (im Skill) | Standard-Remotion | → Verwerfen |
| **NEIN** (nicht im Skill) | Viron-spezifisch | → Extrahieren |
| **UNSIcher** | Nicht eindeutig | → **STOP & ASK** |

### Schritt 3: AUDIT

**Wenn JA (Redundant - im Skill vorhanden):**

Dokumentiere die Verwerfung:
```markdown
## 🗑️ Verworfen
| Fund | Quelle | Skill-Konflikt | Entscheidung | Begründung |
|:-----|:-------|:---------------|:-------------|:-----------|
| Lambda CRF | cloud.md:45 | remotion-core/lambda.md | ❌ DROP | Standard-Remotion Lambda Config |
```

**Wenn NEIN (Delta - Viron-spezifisch):**

Extrahiere mit vollständigem Kontext:
```markdown
### THE [SYSTEM_NAME] [new]

**Quelle:** [`file.md`](../../path/file.md) (Zeilen 45-67)
**Typ:** [SYSTEM_ARCH|COMPONENT|PATTERN|GOVERNANCE]
**Skill-Check:** [x] Geprüft? **NEIN** (nicht in Skills gefunden)

**Kontext (V1):**
[Warum wurde diese Entscheidung getroffen?]
[Welche Alternativen gab es?]
[Wer hat diese Entscheidung getroffen?]

🔑 **Key: Value**
🔑 **Key: Value**

**Evidence:**
```typescript
// Exakter Code-Ausschnitt aus der Quelle
// Mit Zeilennummern-Kommentar
```
```

### Schritt 4: LABEL

Markiere jeden Block mit seinem Ursprung:

| Label | Bedeutung | Wann verwenden? |
|:------|:----------|:----------------|
| `[V1]` | Aus ursprünglichem Briefing | Wenn die Info aus dem ersten Briefing stammt |
| `[V2]` | Aus vorherigem Report | Wenn die Info aus einem Report stammt |
| `[V3]` | Aus V3-Struktur-Learning | Wenn die Info aus der V3-Analyse stammt |
| `[V4]` | Aus Rules-Integration | Wenn die Info aus den Rules stammt |
| `[new]` | Neue Extraktion | Wenn die Info neu gefunden wurde |

**Warum labeln?**
Damit wir wissen, woher Wissen kommt. Das ist essentiell für die Bewertung der Quellenqualität.

---

## 4. OUTPUT FORMAT (Strikt - Keine Abweichungen!)

Erstelle: `EXTRACTION_REPORT_BADGE_[N].md`

### 4.1 FRONT MATTER

```markdown
# 🎯 EXTRACTION_REPORT_BADGE_[N]: [NAME]

**Badge:** [N] - [Name]
**Version:** 1.0 (V6.1 Diamond)
**Basis:** V1 Kontext + V3 Struktur + V4 Rules
**Status:** IN_PROGRESS
**Auditor:** [Agent Name]
**Date:** [YYYY-MM-DD]

---

## 📊 EXECUTIVE SUMMARY

[Satz 1: Was war die wichtigste Erkenntnis?]
[Satz 2: Wie viele Bausteine wurden extrahiert?]
[Satz 3: Was ist das größte Risiko?]

| Metrik | Ergebnis | Delta zu V1 | Bewertung |
|:-------|:---------|:------------|:----------|
| Files Audited | [N] | +[X] | ✅/⚠️/❌ |
| Core Findings | [N] | +[X] | ✅/⚠️/❌ |
| Redundancies Dropped | [N] | - | ✅/⚠️/❌ |
| Forensic Accuracy | [High/Medium/Low] | [+/-] | ✅/⚠️/❌ |
```

### 4.2 CRITICAL FINDINGS (🔴 Must Know)

Nur Viron-spezifische System-IP. Hard Facts only.

**Für jedes Finding:**
```markdown
### THE [SYSTEM_NAME] [V1/V2/V3/V4/new]

**Quelle:** [`file.md`](../../path/file.md) (Zeilen X-Y)
**Typ:** [Kategorie]

**Kontext (V1):**
[Warum wurde das so gemacht?]

🔑 **Key: Value**
🔑 **Key: Value**

**Evidence:**
```code```

**Implikation:**
[Was bedeutet das für die Praxis?]
```

### 4.3 SUPPORTING EVIDENCE (🟡 Context)

Zusätzlicher Kontext, nicht kritisch aber hilfreich.
[Same format as Critical Findings]

### 4.4 VERWORFEN (🗑️ Audit Trail)

| Fund | Quelle | Skill-Konflikt | Entscheidung | Begründung |
|:-----|:-------|:---------------|:-------------|:-----------|

### 4.5 COMPARISON (📊 V1 vs V6.1)

| Aspekt | V1 (Legacy) | V6.1 (Diese Version) | Delta | Warum besser? |
|:-------|:------------|:---------------------|:------|:--------------|
| Struktur | Flach, nummeriert | THE X Hierarchie | +Scanbarkeit | Mentale Landkarte |
| Metriken | Nachgelagert | Sofort sichtbar | +Transparenz | Sofortiger Wert |
| Kontext | Unstrukturiert | Gekennzeichnet [Vx] | +Klarheit | Historische Spur |
| Evidence | Selten | Pflicht | +Qualität | Beweispflicht |

---

## 5. QUALITÄTSKRITERIEN (Checkliste vor Abgabe)

**Jeder Punkt MUSS geprüft werden:**

- [ ] **Alle P0-Dateien** aus Phase 0 gelesen?
  - [ ] vision.md
  - [ ] 00-master-workflow...
  - [ ] 00-overview-index...
  - [ ] RULES_CORE.md
  - [ ] RULES_WORKFLOW.md
  
- [ ] **Skill-Check** für jedes Finding durchgeführt?
  - [ ] Gegen remotion-core/SKILL.md geprüft?
  - [ ] Gegen relevante Rules geprüft?
  
- [ ] **Mindestens 3 Tabellen** extrahiert?
  - [ ] Tabelle 1: _______________
  - [ ] Tabelle 2: _______________
  - [ ] Tabelle 3: _______________
  
- [ ] **Keine Core-Remotion-Duplikate**?
  - [ ] Verworfen-Tabelle ist dokumentiert?
  
- [ ] **Jede Quelle** mit Zeilennummern?
  - [ ] Format: `file.md:45-67`
  
- [ ] **THE X Nomenklatur** verwendet?
  - [ ] Alle Systeme haben THE X Namen?
  
- [ ] **Statistik-Tabelle** ganz oben?
  - [ ] Executive Summary vorhanden?
  
- [ ] **Kontext-Labels** [V1/V2/V3/V4/new] gesetzt?
  - [ ] Jedes Finding ist gelabelt?
  
- [ ] **Hyperlinks** funktionieren?
  - [ ] Alle `[text](../../path)` sind getestet?
  
- [ ] **Sprache** ist unmissverständlich?
  - [ ] Keine vagen Aussagen ("gut", "schnell", "oft")
  - [ ] Nur exakte Werte ("8000k", "20s", "3x")

**Wenn auch nur EIN Punkt nicht geprüft ist, ist der Report NICHT ABGABEBEREIT.**

---

## 6. EMPFEHLUNGEN

[Liste architektonische Lücken oder Legacy-Dateien, die aktualisiert werden müssen]

| Lücke | Ort | Risiko | Empfohlene Aktion |
|:------|:----|:-------|:------------------|
| | | | |

---

**END OF BRIEFING**

**Erinnerung:** 
> Ausführlichkeit bedingt Unmissverständlichkeit.
> 
> Je gründlicher du in der Analyse vorgehst, desto klarer wird das Ergebnis.
> Je ausführlicher du dokumentierst, desto weniger Raum für Missverständnisse.

**Frage dich vor Abgabe:**
- Könnte ein neuer Agent nur mit diesem Report arbeiten?
- Sind alle Entscheidungen nachvollziehbar?
- Gibt es interpretationsabhängige Aussagen?

Wenn auch nur eine Antwort "Nein" ist, ARBEITE WEITER.
