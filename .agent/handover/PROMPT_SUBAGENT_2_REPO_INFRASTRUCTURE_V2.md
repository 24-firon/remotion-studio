# 🎯 SUB-AGENT PROMPT 2: REPO INFRASTRUCTURE ANALYST

**Version:** 2.0 (Kredo-konform)
**Kredo:** Ausführlichkeit bedingt Unmissverständlichkeit

---

## ⚠️ WICHTIGE EINSCHRÄNKUNG (Lesen im Alten, Schreiben im Neuen)

> **DU DARFST DATEIEN IM ALTEN REPO NICHT VERÄNDERN, LÖSCHEN ODER VERSCHIEBEN.**
> **DU SCHREIBST REPORTS INS NEUE REPO.**

**Arbeitsweise:**
- **ALT** (`remotion-studio/`): Nur **LESEN** und analysieren
- **NEU** (`Viron Studio/`): Reports ablegen

| ❌ VERBOTEN (Altes Repo) | ✅ ERLAUBT (Neues Repo) |
|:-------------------------|:------------------------|
| Meta-Dateien modifizieren | Reports erstellen in `knowledge/reports/` |
| Router-Dateien überschreiben | Repo-Struktur analysieren |
| Ordnerstruktur ändern | `REPO_INFRASTRUCTURE_REPORT.md` erstellen |

**Deine Output-Datei:**
- `C:\Workspace\Repos\Viron Studio\knowledge\reports\REPO_INFRASTRUCTURE_REPORT.md`

**Alles im alten Repo ist LESEN-ONLY.**

---

## 🛑 DAS KREDO (Leitprinzip dieser Mission)

> **"Ausführlichkeit bedingt Unmissverständlichkeit"**

**Was das für DICH bedeutet:**

Ein oberflächliches "Diese Datei ist wichtig" hilft niemandem. Du musst EXPLIZIT machen:
- WAS ist in der Datei? (Konkrete Inhalte)
- WIE hängt sie mit anderen zusammen? (Konkrete Verweise)
- WARUM ist sie P0/P1/P2? (Begründung)

| ❌ Oberflächlich (Wertlos) | ✅ Ausführlich (Unmissverständlich) |
|:---------------------------|:-------------------------------------|
| "AGENTS.md ist wichtig" | "AGENTS.md Zeilen 23-45: Definiert 7 Scenario-Trigger für Sub-Agenten" |
| "Viele Verknüpfungen" | "source-master-index.md verweist auf 115 Dateien, wird von 8 Reports referenziert" |
| "Ist ein Entry Point" | "P0 Entry: Jeder Sub-Agent muss zuerst AGENTS.md lesen (Zeile 12: Scenario-Bestimmung)" |

---

## 📊 MISSIONSBESCHREIBUNG (Executive Briefing)

### 🎯 Das EIGENTLICHE ZIEL (Kernaufgabe)

**Erstelle eine NAVIGATIONS-LANDKARTE für alle zukünftigen Agenten.**

Ein neuer Agent soll deinen Report lesen können und in 10 Minuten verstehen:
1. Wo fange ich an? (Entry Points)
2. Was muss ich lesen? (P0/P1/P2)
3. Wo finde ich X? (Verknüpfungs-Graph)
4. Was ist veraltet? (Widersprüche)

**Arbeitsablauf (Strikt einhalten):**

```
PHASE 1: Meta-Dateien-Inventar (ZUERST!)
├── Lies ALLE 20 Meta-Dateien (siehe Liste unten)
├── Dokumentiere pro Datei: Inhalt, Verweise, Priorität
└── Erstelle Kurz-Inventar

PHASE 2: Verknüpfungs-Analyse (DANN!)
├── Erstelle Verweis-Graphen (welche Datei verweist auf welche?)
├── Identifiziere: Zentrale Knoten, Entry Points, Orphaned Dateien
└── Dokumentiere Zyklen und Dead Ends

PHASE 3: Einstiegs-Workflow definieren
├── Definiere: Wo fängt ein neuer Agent an?
├── Reihenfolge: Was in welcher Reihenfolge lesen?
└── Begründung: Warum diese Reihenfolge?

PHASE 4: Widerspruchs-Analyse
├── Finde widersprüchliche Informationen
├── Identifiziere veraltete Inhalte
└── Dokumentiere Lösungsvorschläge

PHASE 5: Report erstellen
└── Schreibe REPO_INFRASTRUCTURE_REPORT.md als Navigations-Guide
```

### Metriken

| Metrik | Ziel | Warum wichtig |
|:-------|:-----|:--------------|
| Meta-Dateien analysiert | 20/20 | Vollständigkeit der Navigation |
| Verknüpfungen dokumentiert | ≥ 30 | Agenten finden alles |
| Abhängigkeiten geklärt | ≥ 20 | Reihenfolge klar |
| Entry Points definiert | ≥ 3 | Verschiedene Szenarien |
| Widersprüche identifiziert | ≥ 0 | Konsistenz sicherstellen |

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

## 🔧 PHASEN (Detaillierte Anleitung)

### Phase 1: Meta-Dateien-Inventar

**Schritt 1.1:** Lies ALLE 20 Meta-Dateien oben

**Schritt 1.2:** Extrahiere pro Datei:

```markdown
### DATEI: [Name]
**Pfad:** `[relativer-pfad]`
**Typ:** [INDEX | ROUTER | RULE | TEMPLATE | VISION | LEARNING]

**Zweck in 1 Satz:**
[Was macht diese Datei?]

**Enthält (konkret):**
- [Thema 1 mit Zeilennummer]
- [Thema 2 mit Zeilennummer]
- [Thema 3 mit Zeilennummer]

**Wird referenziert von:**
- [Datei A] (Zeile X: "siehe [dieses Dokument]")
- [Datei B] (Zeile Y: Link)

**Referenziert selbst:**
- [Datei X] (Zeile Z)
- [Datei Y] (Zeile W)

**Für Sub-Agenten relevant?** [ja/nein + warum]

**Einstiegs-Priorität:** [P0/P1/P2]
- P0 = Muss als erstes gelesen werden (Entry Point)
- P1 = Sollte gelesen werden (wichtiger Kontext)
- P2 = Kann gelesen werden (Spezialwissen)

**Begründung für Priorität:**
[Warum P0/P1/P2? Konkret!]
```

**Qualitäts-Check Phase 1:**
- [ ] Sind alle 20 Dateien erfasst?
- [ ] Hat jede Datei eine klare Typ-Zuordnung?
- [ ] Sind konkrete Zeilennummern angegeben?
- [ ] Sind Ein- und Aus-Referenzen dokumentiert?
- [ ] Hat jede Datei eine begründete P0/P1/P2-Zuordnung?

---

### Phase 2: Verknüpfungs-Analyse

**Schritt 2.1:** Erstelle einen Verweis-Graphen:
- Welche Datei verweist auf welche?
- Wo sind Zyklen? (A → B → C → A)
- Wo sind Dead Ends? (Dateien ohne eingehende Links)

**Schritt 2.2:** Identifiziere:
1. **Zentrale Knoten** (Dateien mit vielen Verweisen)
2. **Entry Points** (Wo fängt ein neuer Agent an?)
3. **Spezialisierte Zweige** (Badge-spezifische Dateien)
4. **Orphaned Dateien** (Nicht verlinkte Dateien)

**Format:**

```markdown
## VERKNÜPFUNGS-GRAPH

### Zentrale Knoten (Wichtig für Navigation)

| Datei | Eingehend | Ausgehend | Zentralität | Begründung |
|:------|:----------|:----------|:------------|:-----------|
| [source-master-index.md] | [N] | [N] | 🔴 Hoch | Verweist auf 115 Dateien |
| [AGENTS.md] | [N] | [N] | 🟡 Mittel | 7 Scenarios definiert |

### Entry Points für Sub-Agenten (P0)

| Szenario | Erste Datei | Zweite Datei | Dritte Datei | Begründung |
|:---------|:------------|:-------------|:-------------|:-----------|
| Badge X starten | [Welche?] | [Welche?] | [Welche?] | [Warum?] |
| Skill prüfen | [Welche?] | [Welche?] | [Welche?] | [Warum?] |
| Regel finden | [Welche?] | [Welche?] | [Welche?] | [Warum?] |
| Navigation verstehen | [Welche?] | [Welche?] | [Welche?] | [Warum?] |

### Orphaned Dateien (Nicht verlinkt)

| Datei | Sollte verlinkt sein von | Status | Aktion |
|:------|:-------------------------|:-------|:-------|
| [Datei] | [Von wo?] | ⚠️ Orphaned | [Vorschlag] |

### Zyklen (A → B → C → A)

| Zyklus | Beteiligte Dateien | Problem | Lösungsvorschlag |
|:-------|:-------------------|:--------|:-----------------|
| [Zyklus 1] | [A] → [B] → [C] → [A] | [Was ist das Problem?] | [Wie lösen?] |
```

**Qualitäts-Check Phase 2:**
- [ ] Mindestens 3 Entry Points definiert?
- [ ] Zentrale Knoten identifiziert (mit Begründung)?
- [ ] Orphaned Dateien gefunden und Lösung vorgeschlagen?
- [ ] Zyklen identifiziert (falls vorhanden)?

---

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

**Alternative Workflows:**

| Szenario | Abweichung | Begründung |
|:---------|:-----------|:-----------|
| [Szenario X] | [Andere Reihenfolge] | [Warum?] |
```

**Qualitäts-Check Phase 3:**
- [ ] Workflow ist in ≤10 Minuten machbar?
- [ ] Jede Phase hat eine klare Begründung?
- [ ] Alternative Szenarien berücksichtigt?

---

### Phase 4: Widerspruchs-Analyse

**Finde Widersprüche zwischen den Dateien:**

```markdown
## WIDERSPRÜCHE

| Datei A sagt (Zeile) | Datei B sagt (Zeile) | Widerspruch | Lösungsvorschlag |
|:---------------------|:---------------------|:------------|:-----------------|
| [Aussage A] | [Aussage B] | [Wie widersprechen sie sich?] | [Vorschlag] |

## VERALTETE INFORMATIONEN

| Datei | Veralteter Inhalt | Ersetzt durch | Aktion |
|:------|:------------------|:--------------|:-------|
| [Datei] | [Was ist alt?] (Zeile X) | [Was ist neu?] | [Update/Archiv] |
```

**Qualitäts-Check Phase 4:**
- [ ] Alle Widersprüche dokumentiert (falls vorhanden)?
- [ ] Veraltete Informationen identifiziert?
- [ ] Lösungsvorschläge konkret?

---

### Phase 5: Verbesserungs-Empfehlungen

**Empfehlungen für Repo-Struktur:**

```markdown
## EMPFEHLUNGEN

### Kurzfristig (SOFORT)
1. [Kritische Änderung] - Warum: [Begründung]
2. [Kritische Änderung] - Warum: [Begründung]

### Mittelfristig (Diese Woche)
1. [Wichtige Änderung] - Warum: [Begründung]
2. [Wichtige Änderung] - Warum: [Begründung]

### Langfristig (Next Phase)
1. [Optionale Verbesserung] - Warum: [Begründung]
2. [Optionale Verbesserung] - Warum: [Begründung]
```

**Qualitäts-Check Phase 5:**
- [ ] Empfehlungen sind konkret (nicht "besser organisieren")?
- [ ] Jede Empfehlung hat eine Begründung?
- [ ] Priorisierung (SOFORT/Diese Woche/Next Phase) klar?

---

## 📊 OUTPUT FORMAT

Erstelle: `.knowledge/mission/REPO_INFRASTRUCTURE_REPORT.md`

```markdown
# REPO INFRASTRUCTURE REPORT

**Version:** 1.0
**Datum:** [YYYY-MM-DD]
**Analyst:** [Agent Name]
**Kredo:** Ausführlichkeit bedingt Unmissverständlichkeit

---

## EXECUTIVE SUMMARY

| Metrik | Wert | Bewertung |
|:-------|:-----|:----------|
| Meta-Dateien analysiert | 20/20 | ✅ 100% |
| Zentrale Knoten identifiziert | [N] | ✅ |
| Entry Points definiert | [N] | ✅ |
| Orphaned Dateien gefunden | [N] | ⚠️ |
| Widersprüche identifiziert | [N] | 🔴 |

**Top 3 Empfehlungen:**
1. [Empfehlung 1]
2. [Empfehlung 2]
3. [Empfehlung 3]

---

## 1. DATEI-INVENTAR (Alle 20 Meta-Dateien)

[Kopiere aus Phase 1 - ausführlich mit Zeilennummern]

---

## 2. VERKNÜPFUNGS-GRAPH

[Kopiere aus Phase 2 - mit Zentralität, Entry Points, Orphaned]

---

## 3. EINSTIEGS-WORKFLOW

[Kopiere aus Phase 3 - 10-Minuten-Workflow für neue Agenten]

---

## 4. WIDERSPRÜCHE & VERALTETES

[Kopiere aus Phase 4 - falls vorhanden]

---

## 5. EMPFEHLUNGEN

[Kopiere aus Phase 5 - priorisiert]

---

## 6. NAVIGATIONS-GUIDE (Quick Reference)

**Wenn ein Agent sucht nach...** → **Lies diese Datei**

| Suche nach... | Datei | Zeilen | Warum? |
|:--------------|:------|:-------|:-------|
| Entry Point | [Datei] | [X-Y] | [Begründung] |
| Badge X | [Datei] | [X-Y] | [Begründung] |
| Rules | [Datei] | [X-Y] | [Begründung] |
| Vision | [Datei] | [X-Y] | [Begründung] |
```

---

## ✅ FINAL CHECKLIST

Vor Abgabe prüfe:

- [ ] Alle 20 Meta-Dateien analysiert?
- [ ] Konkrete Zeilennummern angegeben?
- [ ] Verknüpfungs-Graph vollständig?
- [ ] Mindestens 3 Entry Points definiert?
- [ ] Einstiegs-Workflow ≤10 Minuten?
- [ ] Widersprüche dokumentiert (oder "Keine gefunden")?
- [ ] Empfehlungen konkret und priorisiert?
- [ ] Keine Dateien verändert (nur Report erstellt)?

**Speichere unter:** `.knowledge/mission/REPO_INFRASTRUCTURE_REPORT.md`
