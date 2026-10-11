# PROMPT: Template Evolution (Phase 6.1) - KORRIGIERT

## KRITISCHE KORREKTUR: V5 ist NICHT final

**Status:** Badge 7 V5 existiert, aber ist noch nicht auf dem richtigen Niveau.
**Aufgabe:** V5 muss durch Synthese von V2 + V3 + V4 finalisiert werden.

---

## Phase 0: VORGESCHICHTE VERSTEHEN (Vor jedem Badge!)

### 0.1 Die Evolution-Linie (MUST READ)

| Version | Autor | Stärken | Schwächen | Status |
|:--------|:------|:--------|:------------|:-------|
| **V1** | Du | Kontext, Tiefe | Unstrukturiert, zu lang | ✓ Referenz |
| **V2** | Du | System-Map, Department-Struktur | Fehlende Metriken | ✓ Referenz |
| **V3** | Anderer Agent | **THE X Nomenklatur**, Statistik-Tabelle, Scanbarkeit | Weniger Kontext | ✓ **GOLD STANDARD** |
| **V4** | Du | Rules-Integration, Output-Struktur | Noch nicht V3-Niveau | ✓ Basis für V5 |
| **V5** | Du | Tiefgehend, Hybrid-Ansatz | **FEHLT NOCH: V3-Scanbarkeit** | ⚠️ **IN BEARBEITUNG** |

### 0.2 V3 GOLD STANDARD (Aus `LEARNING_V3_REPORT_STRUCTURE.md`)

**Die 6 wichtigsten V3-Learnings:**

1. **"THE X" Nomenklatur** (Memorable, scanbar)
   - ❌ Schlecht: "### 1. Concurrency Formula"
   - ✅ Gut: "### THE CLOUD PIPELINE"

2. **Statistik-Tabelle ganz oben** (Wertnachweis in 5 Sekunden)
   ```markdown
   | Metrik | Ergebnis | Delta zu V1 |
   |:-------|:---------|:------------|
   | Extrahierte Bausteine | 12 | +8 |
   | Forensic Accuracy | High | - |
   ```

3. **"Kontext (V1)" als Sidebar-Label** (Historische Spur)
   - Jeder Block bekommt ein Label: `[V1]`, `[V2]`, `[V3]`, `[V4]`
   - Zeigt Herkunft der Information

4. **Vergleichs-Tabelle "V1 vs V3"** (Forensische Qualität)
   - Was wurde verbessert?
   - Warum ist es besser?

5. **Einheits-Template für alle Extraktionen**
   - Gleiche Struktur = Vorhersehbarkeit

6. **Sprungmarken mit Keywords** (Nicht nur Nummern)
   - ❌ Schlecht: "### 4. Die Calculator-Logik"
   - ✅ Gut: "### CALCULATOR: Die Kostenschätzung"

### 0.3 V5 FINALISIERUNG (Was noch fehlt)

**V5 muss kombinieren:**
- ✅ Tiefe von V1/V2 (Kontext, Hintergrund)
- ✅ Struktur von V3 (THE X, Statistik, Scanbarkeit)
- ✅ Rules-Integration von V4 (Router-Dateien)
- ✅ Output-Strenge von V4 (MITNEHMEN/VERWORFEN)

**Was zu tun ist:**
1. V5 durchgehen und THE X Überschriften einfügen
2. Statistik-Tabelle ganz nach oben
3. Kontext-Labels [V1], [V2], [V3], [V4] hinzufügen
4. Vergleich V4 vs V5 am Ende

---

## Phase 1: V5 FINALISIERUNG (Badge 7)

**VOR** der Template-Evolution für Badge 1-6:

1. **Lies:** `LEARNING_V3_REPORT_STRUCTURE.md` (V3 Learnings)
2. **Lies:** Aktuelles Badge 7 V5 Briefing
3. **Erstelle:** `SUBAGENT_BRIEFING_BADGE_7_V5_FINAL.md` mit:
   - THE X Nomenklatur für alle Abschnitte
   - Statistik-Tabelle nach Front Matter
   - Kontext-Labels [V1], [V2], [V3], [V4]
   - Vergleichstabelle V4 vs V5_FINAL

---

## Phase 2: TEMPLATE EVOLUTION (Badge 1-6)

**Jetzt erst:** Badge 1-6 auf V5_FINAL-Niveau evolvieren.

### 2.1 Analyse-Phase pro Badge

Lies:
- Original-Briefing V1: `.agent/handover/SUBAGENT_BRIEFING_BADGE_X.md`
- Existierender Report (falls vorhanden): `.knowledge/mission/EXTRACTION_REPORT_BADGE_X.md`
- **V5_FINAL als Referenz:** `SUBAGENT_BRIEFING_BADGE_7_V5_FINAL.md`
- Die 5 Rule-Router aus `.agent/skills/remotion-best-practices/rules/`

### 2.2 Transformations-Regeln

**Jedes neue V2.0 Briefing MUSS enthalten:**

```markdown
# 🎯 SUB-AGENT BRIEFING: BADGE X [THEMA]
**Version:** 2.0 (V5_FINAL Structure)
**Status:** ACTIVE
**Basis:** Synthese aus V1 Kontext + V3 Struktur + V4 Rules

---

# 🛑 0. SCHNELL-STEUERUNG

```text
Ich aktiviere dich für Badge X: [THEMA].
Lies: [Pfad zum V2.0 Briefing]
Erstelle: .knowledge/mission/EXTRACTION_REPORT_BADGE_X.md

REGLER AUF: 100% Tiefe, 0% Reduktion.
MODUS: [ARCHITECT|COMPONENT|SECURITY|PERFORMANCE|...]
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

---

# 📊 1. ESKALATIONS-MATRIX

| Checkpoint | Threshold | Eskalation |
|:-----------|:----------|:-----------|
| Lines of Code | >500 | → Split required |
| Uncertainty | >3 "maybe" | → STOP & ASK |
| Skill Conflict | Any overlap | → Reference only |
| Context Budget | >80% | → Compress |

---

## 2. THE PHILOSOPHY (V3-Style)

### 2.1 Skill-First Prinzip [V3]
- Prüfe jede Extraktion gegen `.agent/skills/remotion-core/SKILL.md`
- Keine Duplikation von Core-Remotion-Wissen
- Nur Viron-Spezifika extrahieren (Delta-Extraktion)

### 2.2 Forensik-Modus [V3]
- Exakte Tabellen statt Prosa
- Code-Beispiele mit Zeilennummern
- Quellenangaben obligatorisch

### 2.3 Kontext-Erhalt [V1]
- Warum wurde diese Entscheidung getroffen?
- Was war die Alternative?
- Wer hat es entschieden?

---

## 3. PFLICHTLEKTÜRE (Phase 0)

| Priorität | Datei | Zweck | Kontext-Label |
|:----------|:------|:------|:--------------|
| P0 | `RULES_CORE.md` | Architektur-Regeln | [RULES] |
| P0 | `RULES_WORKFLOW.md` | Prozess-Regeln | [RULES] |
| P1 | `RULES_TECHNICAL.md` | Implementierungs-Details | [RULES] |
| P2 | `AGENTS.md` | Agenten-Definitionen | [RULES] |
| P2 | `RULES_MIGRATION_GUIDE.md` | Legacy-Referenzen | [RULES] |

---

## 4. DEIN WORKFLOW (The Audit Loop) [V3+V4]

1. **Scan**: Identifiziere System-Bausteine in der Zieldatei
2. **Check**: "Steht das im Global Skill?"
3. **Audit**:
   - **Redundant** → Verwerfen (mit Begründung)
   - **Delta** → Extrahieren (mit Quelle)
4. **Label**: Markiere mit [V1], [V2], [neu]

---

## 5. OUTPUT FORMAT (Strikt!) [V4]

### 5.1 MITNEHMEN-Format
```markdown
### THE [COMPONENT NAME] [V1/V2/V3/neu]
**Quelle:** `[datei]` (Zeilen X-Y)
**Typ:** [SYSTEM_ARCH|COMPONENT|PATTERN|...]
**Skill-Check:** [ ] Im Skill? **NEIN/JA**
**Kontext:** [Erklärung mit Historie]
**Beweis:**
```[Code/Table]```
```

### 5.2 VERWORFEN-Format
```markdown
## 🗑️ Verworfen
| Fund | Quelle | Skill-Konflikt | Entscheidung |
|:-----|:-------|:---------------|:-------------|
```

---

## 6. QUALITÄTSKRITERIEN [V3]

- [ ] Alle P0-Dateien gelesen
- [ ] Skill-Check durchgeführt
- [ ] Mind. 3 Tabellen extrahiert
- [ ] Keine Core-Remotion-Duplikate
- [ ] Quellen mit Zeilennummern
- [ ] THE X Nomenklatur verwendet
- [ ] Statistik-Tabelle vorhanden

---

## 7. VERGLEICH: V1 vs V2.0 [V3-Style]

| Aspekt | V1 (Legacy) | V2.0 (Diese Version) | Delta |
|:-------|:------------|:---------------------|:------|
| Struktur | Flach, nummeriert | THE X Hierarchie | +Scanbarkeit |
| Metriken | Nachgelagert | Sofort sichtbar | +Transparenz |
| Kontext | Viel, unstrukturiert | Gekennzeichnet [V1] | +Klarheit |
```

### 2.3 Badge-Spezifische Anpassungen

| Badge | Thema | Besonderheit | Kontext-Quelle |
|:------|:------|:-------------|:---------------|
| 1 | Project Setup | Focus: Ordnerstruktur, Tooling | [V1] |
| 2 | Core Components | Focus: Composition-Patterns | [V1] |
| 3 | Animation | Focus: Easing, Transitions | [V1] |
| 4 | Data/Audio | Focus: Schema, Transkript | [V1] |
| 5 | Visual Effects | Focus: Shaders, Post-Processing | [V1] |
| 6 | Performance | Focus: Bundle, Rendering | [V1] |

---

## Output

1. **Zuerst:** `SUBAGENT_BRIEFING_BADGE_7_V5_FINAL.md` (V5 auf V3-Niveau heben)
2. **Dann:** 6 Dateien `SUBAGENT_BRIEFING_BADGE_X_V2.0.md` (X=1-6)

**Speicherort:** `.agent/handover/`
**Regel:** Existierende V1-Dateien NICHT überschreiben

---

## Start-Befehle

**Phase 1 (V5 Finalisierung):**
"Badge 7 V5 Finalisierung starten: Lese aktuelles V5, integriere V3-Learnings (THE X, Statistik-Tabelle, Kontext-Labels), erstelle V5_FINAL."

**Phase 2 (Template Evolution pro Badge):**
"Badge X Template Evolution starten: Lese V1 Original, analysiere Struktur, erstelle V2.0 nach V5_FINAL-Muster mit THE X Nomenklatur und Statistik-Tabelle."
