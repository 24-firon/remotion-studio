# 📖 RULES_MIGRATION_GUIDE.md – Konsolidierungs-Dokumentation

**Version:** 1.0  
**Erstellt:** 2026-02-01  
**Zweck:** Dokumentation der Regel-Konsolidierung für den Orchestrator

---

## 🎯 Zusammenfassung der Konsolidierung

### Ausgangslage
- **120+ Regel-Dateien** im gesamten Repository
- Verteilt über: Root, `.agent/`, `Remotion Recherche/`, `src/learnings/`, etc.
- **Problem:** Kein klarer Einstiegspunkt für neue Agents
- **Lösung:** 5 konsolidierte Router-Dateien als hierarchisches System

### Ergebnis
| Neue Datei | Inhalt | Quellen |
|------------|--------|---------|
| [`AGENTS.md`](AGENTS.md) | Master Router mit Scenario-Triggern | AGENTS.md (v1), INITIALIZATION_PROMPT.md |
| [`RULES_CORE.md`](RULES_CORE.md) | Unverrückbare Regeln (TIER 1-3) | gemini.md, USER_GOVERNANCE_PROTOCOL.md, RULE_FILE_LINKING.md |
| [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md) | Prozess-Regeln | RULE_GIT_SYNC_PROTOCOL.md, INITIALIZATION_PROMPT.md, Workflows |
| [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) | Technische Regeln | THE_VIRON_AESTHETIC_MANIFESTO.md, PROJECT_RULES_LIGHTING.md, VIRON_HARDWARE_LAWS.md |
| [`RULES_MIGRATION_GUIDE.md`](RULES_MIGRATION_GUIDE.md) | Diese Dokumentation | - |

---

## 📂 Was wurde konsolidiert?

### TIER 1: MANDATORY Regeln (Kern)

| Regel | Alte Quelle | Neue Position |
|-------|-------------|---------------|
| No-CSS Law | gemini.md + Manifesto | RULES_CORE.md §1.2 |
| Agent Roles & Scope-Lock | gemini.md | RULES_CORE.md §1.1 |
| STOP Signal | USER_GOVERNANCE_PROTOCOL.md | RULES_CORE.md §1.3 |
| Hyperlink-Pflicht | RULE_FILE_LINKING.md | RULES_CORE.md §1.4 |
| Proof-of-Reading | gemini.md | RULES_CORE.md §1.5 |
| No-Overwrite Law | gemini.md | RULES_CORE.md §1.6 |
| Double-Turn-Lock | RULE_GIT_SYNC_PROTOCOL.md | RULES_WORKFLOW.md §1 |
| Token Safety (Anti-Fog) | RULE_TOKEN_ECONOMY.md | RULES_CORE.md §2.1 |
| Actionism Guard | gemini.md | RULES_CORE.md §2.2 |
| WHITELIST/BLACKLIST | WHITELIST.md / BLACKLIST.md | RULES_CORE.md §2.4-2.5 |

### TIER 2: HIGH PRIORITY Regeln

| Regel | Alte Quelle | Neue Position |
|-------|-------------|---------------|
| Communication Standards | USER_GOVERNANCE_PROTOCOL.md | RULES_CORE.md §1.7 |
| Mandatory Integrity | gemini.md | RULES_CORE.md §2.3 |
| Web-Safe Architecture | gemini.md | RULES_CORE.md §3.1 |
| Agent Protocol & Workflow | gemini.md | RULES_CORE.md §3.2 |
| Styling & Theming | gemini.md | RULES_CORE.md §3.3 |

### TIER 3: WORKFLOW Regeln

| Regel | Alte Quelle | Neue Position |
|-------|-------------|---------------|
| Git Sync Protocol | RULE_GIT_SYNC_PROTOCOL.md | RULES_WORKFLOW.md §1 |
| Badge Cycle Orchestration | orchestrate-badge-cycle.md | RULES_WORKFLOW.md §2 |
| Subagent Delegation | SUB-AGENT-DELEGATION-MATRIX | RULES_WORKFLOW.md §2.3 |
| Mission Deployment | deploy-subagent-mission.md | RULES_WORKFLOW.md §3 |
| Initialization Flow | INITIALIZATION_PROMPT.md | RULES_WORKFLOW.md §4 |
| Release Protocol | release.md | RULES_WORKFLOW.md §5 |
| Session Closure | session-close.md | RULES_WORKFLOW.md §6 |
| Orchestrator Self-Audit | orchestrator-self-audit.md | RULES_WORKFLOW.md §7 |

### TIER 4: TECHNICAL Regeln

| Regel | Alte Quelle | Neue Position |
|-------|-------------|---------------|
| Design-DNA (Manifesto) | THE_VIRON_AESTHETIC_MANIFESTO.md | RULES_TECHNICAL.md §1 |
| 80% Grey Rule | PROJECT_RULES_LIGHTING.md | RULES_TECHNICAL.md §2 |
| Geometry Rules | PROJECT_RULES_LIGHTING.md | RULES_TECHNICAL.md §2.1 |
| Composition Rules | PROJECT_RULES_LIGHTING.md | RULES_TECHNICAL.md §2.3 |
| Hardware Laws | VIRON_HARDWARE_LAWS.md | RULES_TECHNICAL.md §3 |
| Environment & Infra | gemini.md | RULES_TECHNICAL.md §4 |
| Remotion Standards | Global Skill | RULES_TECHNICAL.md §5 |
| Viron Patterns | src/learnings/ | RULES_TECHNICAL.md §6 |

---

## 🗺️ Wo finde ich jetzt welche Regel?

### Für neue Agents (Initialisierung)
```
Start → AGENTS.md
  → Lies: RULES_CORE.md (TIER 1)
  → Lies: WHITELIST.md
  → Folge: Scenario-Trigger für deinen Task
```

### Für Coding-Tasks
```
AGENTS.md → Scenario: Coding
  → RULES_TECHNICAL.md
  → THE_VIRON_AESTHETIC_MANIFESTO.md
  → PROJECT_RULES_LIGHTING.md
  → Skill: remotion-best-practices/SKILL.md
```

### Für Git-Operationen
```
AGENTS.md → Scenario: Git Operations
  → RULES_WORKFLOW.md §1
  → RULE_GIT_SYNC_PROTOCOL.md (Original für Details)
```

### Für Orchestration
```
AGENTS.md → Scenario: Orchestration
  → RULES_WORKFLOW.md §2-3
  → implementation_plan.md (für Viron Laws)
```

---

## 📊 Hierarchie der neuen Struktur

```
┌─────────────────────────────────────────────────────────────┐
│                    EINSTIEGSPUNKT                           │
│                    AGENTS.md                                │
│         (Master Router mit Scenario-Triggern)              │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ RULES_CORE.md │    │RULES_WORKFLOW.│    │RULES_TECHNICAL│
│               │    │    md         │    │    .md        │
│ Unverrückbare │    │  Prozesse     │    │  Technische   │
│    Regeln     │    │               │    │    Regeln     │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
   TIER 1-3              Git, Badge          Design, Hardware
   MANDATORY             Orchestration         Lighting
```

---

## ✅ Warum diese Struktur?

### 1. Klare Hierarchie
- **Global → Project → Skill**
- Keine redundanten Regeln auf verschiedenen Ebenen

### 2. Scenario-basierter Zugang
- Agents finden relevante Regeln basierend auf ihrem Task
- Kein "überall suchen" mehr nötig

### 3. Reduzierte Komplexität
- Von 120+ Dateien auf 5 zentrale Router
- Alte Dateien bleiben erhalten (kein Datenverlust)

### 4. Zukunftssicherheit
- Neue Regeln können an zentraler Stelle hinzugefügt werden
- Bestehende Regeln sind versioniert und referenziert

---

## 📋 Verifizierung: Abdeckung & Redundanzen

### Abdeckung ✅

| Kategorie | Abgedeckt | Quelle |
|-----------|-----------|--------|
| Agent Roles | ✅ | gemini.md |
| No-CSS Law | ✅ | gemini.md + Manifesto |
| STOP Signal | ✅ | USER_GOVERNANCE_PROTOCOL.md |
| Hyperlink-Pflicht | ✅ | RULE_FILE_LINKING.md |
| Double-Turn-Lock | ✅ | RULE_GIT_SYNC_PROTOCOL.md |
| Anti-Fog Doctrine | ✅ | RULE_TOKEN_ECONOMY.md |
| PoR Protocol | ✅ | gemini.md |
| No-Overwrite Law | ✅ | gemini.md |
| Design-DNA | ✅ | THE_VIRON_AESTHETIC_MANIFESTO.md |
| 80% Grey Rule | ✅ | PROJECT_RULES_LIGHTING.md |
| Hardware Laws | ✅ | VIRON_HARDWARE_LAWS.md |
| WHITELIST | ✅ | WHITELIST.md |
| BLACKLIST | ✅ | BLACKLIST.md |

### Redundanzen identifiziert

| Redundanz | Lösung |
|-----------|--------|
| No-CSS Law in gemini.md UND Manifesto | In RULES_CORE.md vereinigt, beide Quellen referenziert |
| Git-Regeln in mehreren Workflows | In RULES_WORKFLOW.md §1 konsolidiert |
| Token-Optimierung an mehreren Stellen | In RULES_CORE.md §2.1 vereinigt |

---

## 🔄 Nächste Schritte (für Orchestrator)

### Phase 1: Adoption (Jetzt)
- [x] Neue Router-Dateien erstellen
- [ ] Team über neue Struktur informieren
- [ ] Alte Dateien als "legacy" markieren (optional)

### Phase 2: Template Evolution (Phase 6)
- [ ] Template V3 auf neue Struktur aktualisieren
- [ ] Badge Re-Audit mit neuem Router durchführen

### Phase 3: Langfristig
- [ ] Alte Dateien archivieren wenn stabil
- [ ] Neue Regeln nur noch in konsolidierte Dateien
- [ ] Skill-System auf neue Struktur abstimmen

---

## 📚 Vollständige Referenz-Index

### Neue Dateien (Primary)
| Datei | Zweck | Lesen wenn... |
|-------|-------|---------------|
| [`AGENTS.md`](AGENTS.md) | Master Router | Immer zuerst |
| [`RULES_CORE.md`](RULES_CORE.md) | MANDATORY Regeln | Jeder Task |
| [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md) | Prozesse | Git, Orchestration |
| [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) | Technik | Coding, 3D |

### Legacy-Dateien (Secondary - noch gültig)
| Datei | Zweck | Status |
|-------|-------|--------|
| gemini.md | Governance | Referenz |
| PROJECT_RULES.md | Knowledge Architecture | Referenz |
| THE_VIRON_AESTHETIC_MANIFESTO.md | Design-DNA | Detailliert |
| src/PROJECT_RULES_LIGHTING.md | Lighting Rules | Detailliert |
| USER_GOVERNANCE_PROTOCOL.md | STOP Signal | Detailliert |
| WHITELIST.md | Die 19 Gebote | Pflichtlektüre |
| BLACKLIST.md | Forbidden Zones | Pflichtlektüre |

---

## 🎓 Empfohlener Lernpfad

### Für neue Orchestratoren
1. Diese Datei lesen (RULES_MIGRATION_GUIDE.md)
2. AGENTS.md lesen
3. RULES_CORE.md lesen (TIER 1 nur)
4. Szenario für deinen Task identifizieren
5. Relevante Workflow/Technical Regeln lesen

### Für neue Sub-Agents
1. AGENTS.md lesen
2. Scenario: Initialisierung folgen
3. Scenario für Task folgen
4. Relevante Regeln lesen

---

_RULES_MIGRATION_GUIDE.md v1.0 | Konsolidierungs-Dokumentation | 2026-02-01_
