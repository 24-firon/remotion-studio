# ANALYSE: Activation Prompts Badge 6 & 7 vs V6.1

## Aktueller Zustand

### Badge 6 Activation Prompt (V2.2 Forensic)
**Ort:** `.knowledge/mission/SUBAGENT_ACTIVATION_PROMPT_BADGE_6.md`

**Struktur:**
1. System-Aktivierung (Headline)
2. Mission Statement
3. Gatekeeper-Pflicht (4 Dateien als Pfad)
4. Command File (Deep Read)
5. Forensic Questions A-D (sehr detailliert)

**Stärken:**
- ✅ Sehr spezifische Forensic Questions (FFT, EMA, LCP, Codec)
- ✅ Kopier-fertiger Block
- ✅ Explizite Pflicht-Dateien

**Schwächen:**
- ❌ Kein Kredo am Anfang
- ❌ Keine Structure Requirements
- ❌ Keine Executive Summary
- ❌ Pfade statt Hyperlinks (`c:/...` statt `[...](...)`)
- ❌ Keine Kontext-Labels
- ❌ Keine Thresholds/Metriken

---

### Badge 7 Activation Prompt (V3.0)
**Ort:** `.agent/handover/SUBAGENT_ACTIVATION_PROMPT_BADGE_7.md`

**Struktur:**
1. Role Activation
2. Context (gelesene Dateien)
3. Task
4. Interrogation Protocol (Q1-Q4)
5. Execute Now

**Stärken:**
- ✅ THE X Nomenklatur (THE ARCHITECTURE, THE CLOUD PIPELINE)
- ✅ Quellenangaben bei Fragen
- ✅ Non-Redundancy Prüfung explizit

**Schwächen:**
- ❌ Kein Kredo
- ❌ Keine Structure Requirements
- ❌ Keine Executive Summary/Metriken
- ❌ Keine Hyperlinks
- ❌ Keine Kontext-Labels
- ❌ "Execute Now" zu kurz

---

## V6.1 Standard für Activation Prompts

Basierend auf dem V6.1 Template sollte ein Activation Prompt enthalten:

### 1. KREDO (Neu)
```markdown
**KREDO:** Ausführlichkeit bedingt Unmissverständlichkeit.
```

### 2. EXECUTIVE BRIEFING (Neu)
```markdown
## 📊 EXECUTIVE BRIEFING

| Metrik | Ziel | Threshold |
|:-------|:-----|:----------|
| Files to Verify | [N] | < 100% = FAIL |
| Questions Answered | [N] | < 100% = FAIL |
| Sources Cited | [N] | ≥ [N] |
| Non-Redundancy Proofs | [N] | ≥ [N] |
```

### 3. STRUCTURE REQUIREMENTS (Neu)
```markdown
## 🎯 STRUCTURE REQUIREMENTS (V6.1 Diamond Standard)

**MANDATORY in Antwort:**

| Element | Format | Beispiel |
|:--------|:-------|:---------|
| **Answers** | `Q[N]: [Answer]` | `Q1: The 7 Departments...` |
| **Sources** | `[file.md:XX-YY]` | `[workflow.md:45-67]` |
| **Non-Redundancy** | `Skill-Check: [file] = [JA/NEIN]` | `Skill-Check: sequencing.md = NEIN` |
| **Evidence** | Code Block | Exakter Ausschnitt |
```

### 4. AKTIVIERUNGSBLOCK (Verbessert)
```markdown
## 🛑 SYSTEM-AKTIVIERUNG

```text
**⚠️ SYSTEM-AKTIVIERUNG: BADGE [N] ([NAME]) - FORENSIC AUDIT**

**KREDO:** Ausführlichkeit bedingt Unmissverständlichkeit.

**DEINE MISSION:**
[Spezifische Mission]

**0. GATEKEEPER-PFLICHT (CONTEXT KIT):**
Bevor du antwortest, MUSST du diese Basis-Dateien verinnerlicht haben:
1. [`viron-core/vision.md`](../../viron-core/vision.md) - Das "Video as Code" Paradigma
2. [`00-master-workflow...`](../../Remotion%20Recherche/00-master-workflow-2026-integration.md) - Entscheidungs-Logik
3. [`00-overview-index...`](../../Remotion%20Recherche/00-overview-index-v2-1-complete.md) - Wissens-Landkarte
4. [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md) - Redundanz-Check

**Bestätige:** "Ich habe die 4 Gatekeeper-Dateien gelesen und verstanden."

**1. COMMAND FILE:**
Lies: [`SUBAGENT_BRIEFING_BADGE_[N].md`](../../.knowledge/mission/SUBAGENT_BRIEFING_BADGE_[N].md)

**2. FORENSIC QUESTIONS:**
Antworte auf alle Fragen unter Nennung von:
- Quelle (Datei + Zeilen)
- Skill-Check (Warum ist das Viron-spezifisch?)
- Evidence (Code-Ausschnitt)

**START:** Bestätige den Erhalt und beantworte die Fragen.
```
```

---

## Konkrete Verbesserungen

### Für Badge 6 Activation:

**Aktuell:**
```markdown
**0. GATEKEEPER-PFLICHT:**
1. c:/Workspace/Repos/remotion-studio/viron-core/vision.md
2. C:/Viron/90_VAULT/NEW SUFF/Remotion/00-master-workflow-2026-integration.md
```

**V6.1:**
```markdown
**0. GATEKEEPER-PFLICHT (CONTEXT KIT):**
Bevor du antwortest, MUSST du diese 4 Dateien verinnerlicht haben:

| Datei | Pfad | Was du lernst |
|:------|:-----|:--------------|
| **Vision** | [`viron-core/vision.md`](../../viron-core/vision.md) | "Video as Code" Paradigma |
| **Workflow** | [`00-master-workflow...`](../../Remotion%20Recherche/00-master-workflow-2026-integration.md) | Entscheidungs-Logik |
| **Index** | [`00-overview-index...`](../../Remotion%20Recherche/00-overview-index-v2-1-complete.md) | Wissens-Landkarte |
| **Skill** | [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md) | Redundanz-Check |

**Lernziel-Check:**
Nach dem Lesen musst du beantworten können:
1. Was ist das "Video as Code" Paradigma?
2. Welche 4 Audio-Frequenz-Bänder nutzt Viron?
3. Was ist der EMA-Scrubbing-Algorithmus?

**Bestätige:** "Ich habe die Gatekeeper-Dateien gelesen und die Lernziele verstanden."
```

**Aktuell:**
```markdown
*   **A. FFT-Determinismus:**
    Wie genau ist das pre-analysierte JSON-Format aufgebaut?
```

**V6.1:**
```markdown
### Q1: THE FFT DETERMINISM [V1]

**Frage:**
Wie genau (Interface/Struktur) ist das pre-analysierte JSON-Format aufgebaut? 
Warum nutzt Viron dieses Format statt `useAudioData()` direkt auf die MP3 anzuwenden? 
Wie werden die Frequenz-Bänder (Bass, Mid, Treble) exakt abgegrenzt?

**Source Target:** [`specs/audio.md`](../../specs/audio.md) & [`40-audio-reaktiv...`](../../Remotion%20Recherche/40-audio-reaktiv-00-fft-frequenzspektren.md)

**Erwartete Antwort-Struktur:**
```
Q1: [Deine Antwort]

**Quelle:** [file.md:XX-YY]
**Skill-Check:** [Skill-Datei geprüft? JA/NEIN]
**Non-Redundancy:** [Warum ist das Viron-spezifisch?]
**Evidence:**
```[Code-Ausschnitt]```
```
```

---

### Für Badge 7 Activation:

**Aktuell:**
```markdown
### Q1: THE ARCHITECTURE

Describe the "7 Department" Folder Structure...
_(Source target: `22_SYSTEM_PLAN_Folder_Structure.md`)_
```

**V6.1:**
```markdown
### Q1: THE ARCHITECTURE [V1]

**Frage:**
Beschreibe die "7 Department" Folder Structure. 
Warum ist diese spezifische Struktur kritisch für Viron's Agents? 
Wie unterscheidet sie sich von einer standard React Projektstruktur?

**Source Target:** [`22_SYSTEM_PLAN_Folder_Structure.md`](../../Remotion%20Recherche/22_SYSTEM_PLAN_Folder_Structure.md)

**Erwartete Antwort-Struktur:**
```
Q1: [Deine Antwort]

**Quelle:** [file.md:XX-YY]
**Skill-Check:** [Gegen SKILL.md geprüft?]
**Non-Redundancy:** [Warum ist das Viron-spezifisch und nicht Standard-React?]
**Evidence:**
```[Code-Ausschnitt oder Tabelle]```
```

**Metrik:** Mindestens 3 Departments mit Responsibilities benennen.
```

---

## Zusammenfassung: Was muss geändert werden?

### 🔴 Kritisch (Muss für V6.1):

| # | Änderung | Badge 6 | Badge 7 |
|:--|:---------|:--------|:--------|
| 1 | **Executive Briefing** hinzufügen | ❌ Fehlt | ❌ Fehlt |
| 2 | **Structure Requirements** definieren | ❌ Fehlt | ❌ Fehlt |
| 3 | **Kredo** am Anfang | ❌ Fehlt | ❌ Fehlt |
| 4 | **Hyperlinks** statt Pfade | ❌ Pfade | ❌ Pfade |

### 🟡 Hoch (Sollte für V6.1):

| # | Änderung | Badge 6 | Badge 7 |
|:--|:---------|:--------|:--------|
| 5 | **Lernziele** pro Gatekeeper-Datei | ❌ Fehlt | ❌ Fehlt |
| 6 | **Erwartete Antwort-Struktur** pro Frage | ❌ Fehlt | ❌ Fehlt |
| 7 | **Kontext-Labels** [V1] bei Fragen | ❌ Fehlt | ❌ Fehlt |
| 8 | **Metriken** pro Frage (was muss mindestens drin sein) | ❌ Fehlt | ❌ Fehlt |

### 🟢 Medium (Könnte für V6.1):

| # | Änderung | Badge 6 | Badge 7 |
|:--|:---------|:--------|:--------|
| 9 | **Bestätigungs-Checkboxen** für Gatekeeper | ❌ Fehlt | ❌ Fehlt |
| 10 | **Qualitäts-Checkliste** vor Abgabe | ❌ Fehlt | ❌ Fehlt |

---

## Empfohlene Vorgehensweise

1. **Badge 7 Activation zuerst** (wichtigeres Badge)
2. **Badge 6 Activation danach** (analog)
3. **Beide auf V6.1 heben** (einheitliches Niveau)
4. **Template für Badge 1-5 ableiten**

**Zeitschätzung:**
- Badge 7 Activation: 45 Minuten
- Badge 6 Activation: 30 Minuten (analog)
- Testing: 15 Minuten

**Alternative:** Nur 🔴 Kritische Punkte jetzt, 🟡 und 🟢 später.
