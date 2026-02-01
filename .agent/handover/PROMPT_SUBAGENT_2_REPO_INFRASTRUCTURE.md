# 🎯 SUB-AGENT PROMPT 2: REPO INFRASTRUCTURE ANALYST

**Mission:** Analysiere alle Einstiegs-, Router- und Meta-Dateien des Repos
**Output:** `REPO_INFRASTRUCTURE_REPORT.md`

---

## 🛑 SYSTEM-AKTIVIERUNG

```text
Du bist der Repo Infrastructure Analyst.
Deine Mission: Erkläre, was welche Meta-Datei im Repo bedeutet und wie sie zusammenhängt.
Dies ist der Einstieg für alle zukünftigen Sub-Agenten.
```

---

## 📊 EXECUTIVE BRIEFING

| Metrik | Ziel |
|:-------|:-----|
| Meta-Dateien analysiert | 100% |
| Verknüpfungen dokumentiert | ≥ 30 |
| Abhängigkeiten geklärt | ≥ 20 |
| Einstiegs-Workflow definiert | 1 klarer Pfad |

---

## 📚 DEINE INPUT-QUELLEN (Meta-Dateien)

### A. Einstieg & Navigation

| # | Datei | Pfad | Zweck |
|:--|:------|:-----|:------|
| 1 | **source-master-index.md** | `.knowledge/source-master-index.md` | Alle 115+ Dateien dokumentiert |
| 2 | **INDEX_HYPERLINKS.md** | `.agent/handover/INDEX_HYPERLINKS.md` | Navigation zu allen Reports |
| 3 | **implementation_plan.md** | `.agent/handover/implementation_plan.md` | Gesamt-Workflow der Mission |
| 4 | **task.md** | `.agent/handover/task.md` | Aktuelle Aufgaben-Status |

### B. Router & Regeln (Phase 6.0)

| # | Datei | Pfad | Zweck |
|:--|:------|:-----|:------|
| 5 | **AGENTS.md** | `.agent/AGENTS.md` | 7 Scenario-Trigger für Agenten |
| 6 | **RULES_CORE.md** | `.agent/RULES_CORE.md` | TIER 1 MANDATORY Regeln |
| 7 | **RULES_WORKFLOW.md** | `.agent/RULES_WORKFLOW.md` | Double-Turn-Lock, Badge Cycle |
| 8 | **RULES_TECHNICAL.md** | `.agent/RULES_TECHNICAL.md` | Design-DNA, 80% Grey Rule |
| 9 | **RULES_MIGRATION_GUIDE.md** | `.agent/RULES_MIGRATION_GUIDE.md` | Dokumentation der Konsolidierung |

### C. Vision & Grundlagen

| # | Datei | Pfad | Zweck |
|:--|:------|:-----|:------|
| 10 | **vision.md** | `viron-core/vision.md` | "Video as Code" Paradigma |
| 11 | **00-master-workflow** | `Remotion Recherche/00-master-workflow-2026-integration.md` | Entscheidungs-Logik |
| 12 | **00-overview-index** | `Remotion Recherche/00-overview-index-v2-1-complete.md` | Knowledge Map v2.1 |
| 13 | **LEARNING_V3_REPORT_STRUCTURE.md** | `.knowledge/project-learnings/LEARNING_V3_REPORT_STRUCTURE.md` | V3 Best Practices |

### D. Templates & Vorlagen

| # | Datei | Pfad | Zweck |
|:--|:------|:-----|:------|
| 14 | **SUBAGENT_BRIEFING_TEMPLATE_V6.1.md** | `.agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md` | Aktuelles Briefing-Template |
| 15 | **EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md** | `.knowledge/templates/EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md` | Report-Template |
| 16 | **SUBAGENT_BRIEFING_BADGE_7.md** | `.agent/handover/SUBAGENT_BRIEFING_BADGE_7.md` | Beispiel-Briefing (V4.1) |
| 17 | **EXTRACTION_REPORT_BADGE_7_V5_ULTIMATE.md** | `.knowledge/mission/EXTRACTION_REPORT_BADGE_7_V5_ULTIMATE.md` | Beispiel-Report (Gold) |

### E. Vergleichs- & Learnings-Dateien

| # | Datei | Pfad | Zweck |
|:--|:------|:-----|:------|
| 18 | **COMPARISON_BADGE_7_ALL_VERSIONS.md** | `.knowledge/mission/COMPARISON_BADGE_7_ALL_VERSIONS.md` | V1-V5 Vergleich |
| 19 | **ANALYSIS_V3_VS_MY_WORK_LEARNINGS.md** | `.agent/handover/ANALYSIS_V3_VS_MY_WORK_LEARNINGS.md` | V3 Learnings Analyse |
| 20 | **EVOLUTION_V1_TO_V5_DIFF.md** | `.knowledge/mission/EVOLUTION_V1_TO_V5_DIFF.md` | Evolution Badge 7 |

---

## 🔧 DEIN WORKFLOW

### Phase 1: Inventarisierung

**Schritt 1.1:** Lies ALLE 20 Meta-Dateien oben
**Schritt 1.2:** Extrahiere pro Datei:

```markdown
### DATEI: [Name]
**Pfad:** `[relativer-pfad]`
**Typ:** [INDEX | ROUTER | RULE | TEMPLATE | VISION | LEARNING]

**Zweck in 1 Satz:**
[Was macht diese Datei?]

**Enthält:**
- [Thema 1]
- [Thema 2]
- [Thema 3]

**Wird referenziert von:**
- [Datei A]
- [Datei B]

**Referenziert selbst:**
- [Datei X]
- [Datei Y]

**Für Sub-Agenten relevant?** [ja/nein + warum]

**Einstiegs-Priorität:** [P0/P1/P2]
- P0 = Muss als erstes gelesen werden
- P1 = Sollte gelesen werden
- P2 = Kann gelesen werden
```

### Phase 2: Verknüpfungs-Analyse

**Schritt 2.1:** Erstelle einen Verweis-Graphen:
- Welche Datei verweist auf welche?
- Wo sind Zyklen? (A → B → C → A)
- Wo sind Dead Ends? (Dateien ohne eingehende Links)

**Schritt 2.2:** Identifiziere:
1. **Zentrale Knoten** (Dateien mit vielen Verweisen)
2. **Entry Points** (Wo fängt ein neuer Agent an?)
3. **Spezialisierte Zweige** (Badge-spezifische Dateien)
4. **Ophaned Dateien** (Nicht verlinkte Dateien)

**Format:**
```markdown
## VERKNÜPFUNGS-GRAPH

### Zentrale Knoten

| Datei | Eingehend | Ausgehend | Zentralität |
|:------|:----------|:----------|:------------|
| [source-master-index.md] | [N] | [N] | 🔴 Hoch |
| [AGENTS.md] | [N] | [N] | 🟡 Mittel |

### Entry Points für Sub-Agenten

| Szenario | Erste Datei | Zweite Datei | Dritte Datei |
|:---------|:------------|:-------------|:-------------|
| Badge X starten | [Welche?] | [Welche?] | [Welche?] |
| Skill prüfen | [Welche?] | [Welche?] | [Welche?] |
| Regel finden | [Welche?] | [Welche?] | [Welche?] |

### Orphaned Dateien

| Datei | Sollte verlinkt sein von | Status |
|:------|:-------------------------|:-------|
| [Datei] | [Von wo?] | ⚠️ Orphaned |
```

### Phase 3: Einstiegs-Workflow definieren

**Definiere den perfekten Einstieg für einen neuen Sub-Agenten:**

```markdown
## EINSTIEGS-WORKFLOW (Für Sub-Agenten)

### Phase 0: Kontext (5 Minuten)
Lesereihenfolge:
1. [Datei 1] - Warum: [Grund]
2. [Datei 2] - Warum: [Grund]
3. [Datei 3] - Warum: [Grund]

**Proof of Reading:**
Nach jeder Datei schreibe 1 Satz Zusammenfassung.

### Phase 1: Router (3 Minuten)
4. [Datei 4] - Findet den richtigen Einstieg

### Phase 2: Spezialisierung (2 Minuten)
5. [Badge-spezifische Datei] - Wo bin ich?

**Gesamtzeit Einstieg:** ~10 Minuten
```

### Phase 4: Widerspruchs-Analyse

**Finde Widersprüche zwischen den Dateien:**

```markdown
## WIDERSPRÜCHE

| Datei A sagt | Datei B sagt | Widerspruch | Lösung |
|:-------------|:-------------|:------------|:-------|
| [Aussage A] | [Aussage B] | [Beschreibung] | [Vorschlag] |

## VERALTETE INFORMATIONEN

| Datei | Veralteter Inhalt | Ersetzt durch | Aktion |
|:------|:------------------|:--------------|:-------|
| [Datei] | [Was ist alt?] | [Was ist neu?] | [Update/Archiv] |
```

### Phase 5: Verbesserungs-Empfehlungen

**Empfehlungen für Repo-Struktur:**

```markdown
## EMPFEHLUNGEN

### Kurzfristig (SOFORT)
1. [Kritische Änderung]
2. [Kritische Änderung]

### Mittelfristig (Diese Woche)
1. [Wichtige Änderung]
2. [Wichtige Änderung]

### Langfristig (Next Phase)
1. [Optionale Verbesserung]
2. [Optionale Verbesserung]
```

---

## 📊 OUTPUT FORMAT

Erstelle: `REPO_INFRASTRUCTURE_REPORT.md`

```markdown
# REPO INFRASTRUCTURE REPORT

**Version:** 1.0
**Datum:** [YYYY-MM-DD]
**Analyst:** [Agent Name]

---

## EXECUTIVE SUMMARY

| Metrik | Wert |
|:-------|:-----|
| Meta-Dateien analysiert | 20/20 |
| Zentrale Knoten identifiziert | [N] |
| Entry Points definiert | [N] |
| Orphaned Dateien gefunden | [N] |
| Widersprüche identifiziert | [N] |

---

## 1. DATEI-INVENTAR

[Kopiere aus Phase 1]

---

## 2. VERKNÜPFUNGS-GRAPH

[Kopiere aus Phase 2]

---

## 3. EINSTIEGS-WORKFLOW

[Kopiere aus Phase 3]

---

## 4. WIDERSPRÜCHE

[Kopiere aus Phase 4]

---

## 5. EMPFEHLUNGEN

[Kopiere aus Phase 5]

---

## 6. VERZEICHNIS FÜR SUB-AGENTEN

### Schnellnavigation:

| Will ich... | Dann lese... |
|:------------|:-------------|
| Verstehen, was Viron ist | [Datei] |
| Ein Badge starten | [Datei] → [Datei] |
| Regeln nachschlagen | [Datei] |
| Skills prüfen | [Datei] |
| Templates finden | [Datei] |
```

---

## ✅ QUALITÄTSKRITERIEN

- [ ] **Alle 20 Meta-Dateien** analysiert?
- [ ] **Verknüpfungs-Graph** ≥ 30 Verbindungen?
- [ ] **Einstiegs-Workflow** ≤ 10 Minuten?
- [ ] **Widersprüche** dokumentiert?
- [ ] **Orphaned Dateien** identifiziert?
- [ ] **Empfehlungen** konkret und umsetzbar?

**Wenn alle Checks OK → ABGEBEN**
**Wenn nicht → WEITERARBEITEN**

---

## 🚀 START BEFEHL

```
"Ich aktiviere mich als Repo Infrastructure Analyst.
Ich werde alle Meta-Dateien analysieren und den Infrastruktur-Report erstellen."
```
