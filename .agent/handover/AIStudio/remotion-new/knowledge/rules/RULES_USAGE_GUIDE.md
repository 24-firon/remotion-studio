# 📘 RULES_USAGE_GUIDE.md

**Version:** 1.0  
**Erstellt:** 2026-02-01  
**Zielgruppe:** Alle Agents (Orchestrator & Sub-Agents)  
**Purpose:** Praktische Anleitung für die Nutzung des neuen Regel-Systems

---

## 🚀 Quick Start: Was muss ich ALS ERSTES lesen?

> **Für neue Agents:** Starte IMMER hier

### Die 3-Minuten-Regel

| Priorität | Datei | Zeit | Warum? |
|-----------|-------|------|--------|
| 1 | [`AGENTS.md`](AGENTS.md) | 2 Min | Master Router - zeigt dir den Weg |
| 2 | [`RULES_CORE.md`](RULES_CORE.md) §1 (TIER 1) | 5 Min | Unverrückbare Regeln - Verstoß = Fehler |
| 3 | [`WHITELIST.md`](handover/WHITELIST.md) | 3 Min | Die 19 Gebote - MANDATORY Lektüre |

**→ Danach:** Folge dem Scenario-Trigger für deinen spezifischen Task (siehe unten)

---

## 🎯 Scenario-Guide: In welchem Scenario welche Datei?

### Szenario-Flowchart

```
┌─────────────────────────────────────────────────────────────┐
│  Bist du neu hier?                                          │
│  → JA: Lies AGENTS.md → RULES_CORE.md §1 → WHITELIST.md    │
│  → NEIN: Welcher Task?                                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │  CODING │          │   GIT   │          │  DOCS   │
   └────┬────┘          └────┬────┘          └────┬────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│RULES_TECHNICAL│    │RULES_WORKFLOW │    │ RULES_CORE.md │
│   .md §1-4    │    │   .md §1      │    │    §1.4     │
└───────┬───────┘    └───────┬───────┘    └───────┬───────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Manifesto +   │    │ RULE_GIT_SYNC │    │RULE_TOKEN_ECO │
│   Skill       │    │  _PROTOCOL.md │    │   .md §3      │
└───────────────┘    └───────────────┘    └───────────────┘
```

### Scenario 1: 💻 Coding / Implementation

**Trigger:** Du sollst Code schreiben, Komponenten erstellen, Features implementieren

**Lesereihenfolge:**
1. [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) §1-4 (Design-DNA, Lighting, Hardware)
2. [`THE_VIRON_AESTHETIC_MANIFESTO.md`](../THE_VIRON_AESTHETIC_MANIFESTO.md) (Design-Details)
3. [`src/PROJECT_RULES_LIGHTING.md`](../src/PROJECT_RULES_LIGHTING.md) (80% Grey Rule)
4. Skill: [`.agent/skills/remotion-best-practices/SKILL.md`](skills/remotion-best-practices/SKILL.md)

**VOR dem Coden prüfen:**
```markdown
- [ ] No-CSS Law beachtet? (keine `@keyframes`)
- [ ] 80% Grey Rule? (kein #000, kein #FFF)
- [ ] High Poly Geometry? (CapSegments >= 64)
- [ ] Mandatory Movement? (keine static scenes)
- [ ] No Parallel Lines? (Tilt auf X, Y, Z)
```

---

### Scenario 2: 🔄 Git Operations

**Trigger:** Du musst committen, pushen, Branches verwalten

**Lesereihenfolge:**
1. [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md) §1 (Double-Turn-Lock)
2. [`handover/meta/RULE_GIT_SYNC_PROTOCOL.md`](handover/meta/RULE_GIT_SYNC_PROTOCOL.md) (Details)

**WICHTIG:**
> **NEVER combine `write_to_file` and `git commit` in the same turn!**

**Der Double-Turn-Lock:**
```
Turn 1: "Ich habe task.md editiert. Ich schlage einen Commit vor."
        → write_to_file
        → STOP. Warte auf User.

Turn 2: User sagt: "Go."
        → git add . && git commit
```

---

### Scenario 3: 📝 Dokumentation / Reports

**Trigger:** Du sollst Reports, Dokumentation oder Analysen erstellen

**Lesereihenfolge:**
1. [`RULES_CORE.md`](RULES_CORE.md) §1.4 (Hyperlink-Pflicht)
2. [`RULES_CORE.md`](RULES_CORE.md) §2.1 (Anti-Fog Doctrine)
3. [`handover/meta/RULE_TOKEN_ECONOMY.md`](handover/meta/RULE_TOKEN_ECONOMY.md) (Details)

**Density-Optimized schreiben:**
```markdown
❌ FALSCH:
"Die Datei enthält mehrere wichtige Informationen über das Projekt."

✅ RICHTIG:
| Datei | Inhalt |
|-------|--------|
| gemini.md | Governance |
| PROJECT_RULES.md | Knowledge Architecture |
```

---

### Scenario 4: 🧪 3D / Three.js / R3F

**Trigger:** Du arbeitest mit 3D-Elementen, Shadern oder Three.js

**Lesereihenfolge:**
1. [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) §3 (Hardware Laws)
2. [`handover/meta/VIRON_HARDWARE_LAWS.md`](handover/meta/VIRON_HARDWARE_LAWS.md) (Details)
3. [`src/learnings/PATTERN_Advanced_Shaders.md`](../src/learnings/PATTERN_Advanced_Shaders.md)
4. [`src/PROJECT_RULES_LIGHTING.md`](../src/PROJECT_RULES_LIGHTING.md) (80% Grey Rule)

**Hardware-Constraints beachten:**
| Scene Type | RAM Factor | Concurrency |
|------------|------------|-------------|
| Standard 2D | 2GB/Thread | ramGB / 2 |
| Heavy 3D | 4GB/Thread | ramGB / 4 |
| Volumetric | 8GB/Thread | ramGB / 8 |

---

### Scenario 5: 🎬 Rendering / Pipeline

**Trigger:** Du arbeitest mit Rendering, Lambda oder der Pipeline

**Lesereihenfolge:**
1. [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) §3 (Hardware Laws)
2. [`handover/meta/VIRON_HARDWARE_LAWS.md`](handover/meta/VIRON_HARDWARE_LAWS.md)
3. [`handover/meta/PATTERN_REMOTION_LAMBDA_HYBRID.md`](handover/meta/PATTERN_REMOTION_LAMBDA_HYBRID.md)

---

### Scenario 6: 🏛️ Orchestration / Badge Management

**Trigger:** Du bist Orchestrator und managst Badges/Subagents

**Lesereihenfolge:**
1. [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md) §2-3 (Badge Cycle, Delegation)
2. [`workflows/orchestrate-badge-cycle.md`](workflows/orchestrate-badge-cycle.md)
3. [`workflows/deploy-subagent-mission.md`](workflows/deploy-subagent-mission.md)
4. [`handover/implementation_plan.md`](handover/implementation_plan.md) (Viron Laws)

---

## 🏗️ Hierarchie: Wie sind die Regeln strukturiert?

### Die 3-Ebenen-Struktur

```
┌─────────────────────────────────────────────────────────────┐
│  EBENE 1: ENTRY POINT                                       │
│  ├── AGENTS.md (Master Router)                             │
│  └── Zeigt dir den Weg basierend auf deinem Scenario       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  EBENE 2: REGELN                                            │
│  ├── RULES_CORE.md       (TIER 1-3: MANDATORY → Guidelines)│
│  ├── RULES_WORKFLOW.md   (Git, Badge Cycle, Releases)      │
│  └── RULES_TECHNICAL.md  (Design, Lighting, Hardware)      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  EBENE 3: REFERENZEN                                        │
│  ├── WHITELIST.md / BLACKLIST.md (Security)                │
│  ├── Original-Quellen (gemini.md, Manifesto)               │
│  ├── Skills (remotion-best-practices/SKILL.md)             │
│  └── Specs, Patterns, Learnings                            │
└─────────────────────────────────────────────────────────────┘
```

### TIER-System in RULES_CORE.md

| TIER | Name | Konsequenz bei Verstoß |
|------|------|------------------------|
| **TIER 1** | MANDATORY | Kritischer Fehler, Protokoll-Verletzung |
| **TIER 2** | HIGH PRIORITY | Qualitätsmangel, Review erforderlich |
| **TIER 3** | GUIDELINES | Best Practice, empfohlen |

**Merke:** TIER 1 Regeln sind unverrückbar. Keine Ausnahmen.

---

## 📋 Beispiele: Konkrete Anwendungsfälle

### Beispiel 1: Neuer Agent betritt das Projekt

```markdown
User: "Du bist ein neuer Agent. Implementiere eine Silver Button Komponente."

Agent-Aktionen:
1. → Lies AGENTS.md (2 Min)
2. → Lies RULES_CORE.md §1 (TIER 1 MANDATORY) (5 Min)
3. → Lies WHITELIST.md (3 Min)
4. → AGENTS.md → Scenario: Coding
5. → Lies RULES_TECHNICAL.md §1-2 (Design-DNA, Lighting)
6. → Lies THE_VIRON_AESTHETIC_MANIFESTO.md
7. → Lies Skill: remotion-best-practices/SKILL.md
8. → Erstelle Implementation Plan
9. → Warte auf User-Approval ("Go")
10. → Implementiere
```

### Beispiel 2: Git Commit durchführen

```markdown
User: "Commite die Änderungen."

Agent-Aktionen:
1. → Lies RULES_WORKFLOW.md §1 (Double-Turn-Lock)
2. → Turn 1: "Ich habe folgende Änderungen: [Liste]. 
              Ich schlage vor zu committen."
3. → STOP. Warte auf User.
4. → User: "Go."
5. → Turn 2: git add . && git commit -m "message"
```

### Beispiel 3: Report erstellen

```markdown
User: "Erstelle einen Report über den aktuellen Stand."

Agent-Aktionen:
1. → Lies RULES_CORE.md §1.4 (Hyperlink-Pflicht)
2. → Lies RULES_CORE.md §2.1 (Anti-Fog Doctrine)
3. → Density-Optimized schreiben:
    - Tabellen statt Prosa
    - Alle Dateien als [file](path) verlinken
    - Konkrete Line Numbers zitieren
4. → Output: "Report complete. [Link zu Datei]"
```

### Beispiel 4: STOP-Signal reagieren

```markdown
User: "STOP! Das ist komplett falsch!"

Agent-Aktionen:
1. → FREEZE: Keine weiteren Tools ausführen
2. → ACKNOWLEDGE: "I have stopped. Awaiting instruction."
3. → DO NOT FIX: Keine Panik-Fixes
4. → Warte auf expliziten Befehl
```

---

## ❓ FAQ: Häufige Fragen und Antworten

### Q1: Was ist der Einstiegspunkt für ALLES?
**A:** [`AGENTS.md`](AGENTS.md) - Der Master Router. Starte immer hier.

### Q2: Was passiert, wenn ich eine TIER 1 Regel breche?
**A:** Das ist ein kritischer Protokollfehler. Der Orchestrator muss eingreifen. Mögliche Konsequenzen: Session Restart, erneutes Lesen aller Regeln.

### Q3: Muss ich ALLE Dateien in der WHITELIST lesen?
**A:** Ja. Die 19 Dateien sind MANDATORY für die Initialisierung. Das sind ca. 11.000 Tokens - notwendig für Viron-Level Präzision.

### Q4: Was ist der Unterschied zwischen RULES_CORE.md und gemini.md?
**A:** RULES_CORE.md ist die konsolidierte, strukturierte Version. gemini.md bleibt als Master Source of Truth erhalten. Bei Konflikten: gemini.md hat Vorrang.

### Q5: Wo finde ich die Git-Regeln?
**A:** In [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md) §1 (Double-Turn-Lock). Details in [`handover/meta/RULE_GIT_SYNC_PROTOCOL.md`](handover/meta/RULE_GIT_SYNC_PROTOCOL.md).

### Q6: Was bedeutet "No-CSS Law"?
**A:** Verbot von CSS Transitions und `@keyframes`. Stattdessen: `spring()` und `interpolate()` für frame-basierte Animationen.

### Q7: Was ist die "80% Grey Rule"?
**A:** Kein reines Schwarz (`#000000`) oder Weiß (`#FFFFFF`). Verwende `#202020` bis `#F0F0F0` mit Texturen/Noise.

### Q8: Was ist der "Double-Turn-Lock"?
**A:** NIEMALS `write_to_file` und `git commit` im selben Turn. Turn 1: Vorschlagen. Turn 2: Ausführen (nach User-Approval).

### Q9: Was muss ich beim Schreiben von Dokumentation beachten?
**A:** Hyperlink-Pflicht (alle Dateien verlinken), Density-Optimized (Tabellen > Prosa), Line Numbers zitieren.

### Q10: Was ist ein "Governance Inventory"?
**A:** Vor jedem Plan musst du beweisen, dass du die "Big Five" gelesen hast. Für jede Datei: Ein technischer Fakt, der nicht im Dateinamen steht.

### Q11: Was passiert bei einem "Scope-Lock Failure"?
**A:** Wenn eine Datei nicht gefunden wird: STOP. Kein `cd ..`. Frage den User nach dem korrekten Pfad.

### Q12: Wo finde ich die Skill-Dateien?
**A:** [`.agent/skills/remotion-best-practices/SKILL.md`](skills/remotion-best-practices/SKILL.md) - Das ist der Einstiegspunkt für alle Skills.

---

## 🎓 Fortgeschrittene Themen

### Fehlerbehebung

| Problem | Lösung |
|---------|--------|
| "Datei nicht gefunden" | Scope-Lock Failure. STOP. User fragen. |
| "Regel-Widerspruch" | Original-Quelle (gemini.md) hat Vorrang. |
| "Unklarer Task" | AGENTS.md → Scenario suchen oder User fragen. |
| "Token-Limit erreicht" | Anti-Fog Doctrine: JIT Loading, nur nötige Zeilen lesen. |

### Best Practices

1. **Immer Hyperlinks verwenden:** `[datei.md](pfad)` statt `datei.md`
2. **Density-Optimized schreiben:** Tabellen statt Prosa
3. **Proof of Work:** Line Numbers zitieren
4. **Vor dem Coden:** Plan erstellen, User-Approval einholen
5. **Nach dem Coden:** DECISION_LOG.md aktualisieren

### Tools und Kommandos

| Befehl | Workflow | Datei |
|--------|----------|-------|
| `/release` | Semantic Release | `workflows/release.md` |
| `/session-close` | Session Archive | `workflows/session-close.md` |
| `/audit` | Visual Audit | `workflows/orchestrator-self-audit.md` |
| `/deploy` | Subagent Mission | `workflows/deploy-subagent-mission.md` |
| `/orchestrate` | Badge Cycle | `workflows/orchestrate-badge-cycle.md` |

---

## 📚 Schnell-Referenz: Alle 5 Dateien auf einen Blick

| Datei | Zweck | Wann lesen? | Lesezeit |
|-------|-------|-------------|----------|
| [`AGENTS.md`](AGENTS.md) | Master Router | IMMER zuerst | 2 Min |
| [`RULES_CORE.md`](RULES_CORE.md) | Unverrückbare Regeln | Bei Initialisierung | 10 Min |
| [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md) | Prozess-Regeln | Bei Git/Orchestration | 5 Min |
| [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) | Technische Regeln | Bei Coding/3D | 8 Min |
| [`RULES_MIGRATION_GUIDE.md`](RULES_MIGRATION_GUIDE.md) | Dokumentation | Bei Fragen zur Struktur | 5 Min |

---

## 🆘 Hilfe bekommen

1. **Unklar, welches Scenario?** → Lies [`AGENTS.md`](AGENTS.md)
2. **Unklar, welche Regel gilt?** → Lies [`RULES_CORE.md`](RULES_CORE.md)
3. **Technische Details nötig?** → Lies [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md)
4. **Workflow-Fragen?** → Lies [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md)
5. **Alles andere?** → Frage den User oder den Orchestrator

---

**Ende der Anleitung**

_Version 1.0 | Erstellt: 2026-02-01 | Für alle Agents im Viron Remotion Studio_
