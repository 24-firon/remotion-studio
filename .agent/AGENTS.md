# 🧭 AGENTS.md – The Master Router

**Version:** 2.0 (Consolidated)  
**Status:** PRIMARY ENTRY POINT for ALL Agents  
**Purpose:** Central router with scenario-based triggers for the Viron Remotion Studio

> [!IMPORTANT]
> **THIS IS YOUR ENTRY POINT.** Read this file first, then follow the scenario trigger for your specific task.

---

## 🎯 Scenario-Based Entry Points

### Scenario: 🚀 Initialisierung (First Entry)
**Trigger:** You are a new agent entering the project for the first time.

**Pflichtlektüre (In dieser Reihenfolge):**
1. [`AGENTS.md`](AGENTS.md) ← Du bist hier
2. [`RULES_CORE.md`](RULES_CORE.md) – Unverrückbare Regeln
3. [`WHITELIST.md`](handover/WHITELIST.md) – Die 19 Gebote
4. [`BLACKLIST.md`](handover/BLACKLIST.md) – Forbidden Zones
5. [`gemini.md`](../gemini.md) – Governance & Agent Behavior
6. [`PROJECT_RULES.md`](../PROJECT_RULES.md) – Knowledge Architecture

**Danach:** Folge dem Scenario-Trigger für deinen spezifischen Task.

---

### Scenario: 💻 Coding / Implementation
**Trigger:** Du sollst Code schreiben, Komponenten erstellen oder Features implementieren.

**LIES (In dieser Reihenfolge):**
1. [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) – Technische Regeln
2. [`THE_VIRON_AESTHETIC_MANIFESTO.md`](../THE_VIRON_AESTHETIC_MANIFESTO.md) – Design-DNA
3. [`src/PROJECT_RULES_LIGHTING.md`](../src/PROJECT_RULES_LIGHTING.md) – 80% Grey Rule
4. Skill: [`.agent/skills/remotion-best-practices/SKILL.md`](skills/remotion-best-practices/SKILL.md) – Remotion Standards

**DANN:**
- Prüfe relevante [`specs/`](../specs/) für deine Domain
- Prüfe [`patterns/`](../patterns/) für Code-Patterns

---

### Scenario: 🔄 Git Operations
**Trigger:** Du musst committen, pushen oder Branches verwalten.

**LIES:**
1. [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md) – Prozess-Regeln
2. [`handover/meta/RULE_GIT_SYNC_PROTOCOL.md`](handover/meta/RULE_GIT_SYNC_PROTOCOL.md) – Double-Turn-Lock

**ACHTUNG:**
> **NEVER combine `write` and `git commit` in the same turn.**

---

### Scenario: 📝 Dokumentation / Reports
**Trigger:** Du sollst Reports, Dokumentation oder Analysen erstellen.

**LIES:**
1. [`RULES_CORE.md`](RULES_CORE.md) – Hyperlink-Pflicht (TIER 1)
2. [`handover/meta/RULE_TOKEN_ECONOMY.md`](handover/meta/RULE_TOKEN_ECONOMY.md) – Anti-Fog Doctrine

**BEACHTE:**
- Tabellen statt Prosa
- Jede Datei als `[filename.md](path)` verlinken
- Density-Optimized schreiben

---

### Scenario: 🧪 3D / Three.js / R3F
**Trigger:** Du arbeitest mit 3D-Elementen, Shadern oder Three.js.

**LIES:**
1. [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) – Technische Regeln
2. [`handover/meta/VIRON_HARDWARE_LAWS.md`](handover/meta/VIRON_HARDWARE_LAWS.md) – RAM/Concurrency
3. [`src/learnings/PATTERN_Advanced_Shaders.md`](../src/learnings/PATTERN_Advanced_Shaders.md) – Shader-Rezepte
4. [`src/PROJECT_RULES_LIGHTING.md`](../src/PROJECT_RULES_LIGHTING.md) – 80% Grey Rule

---

### Scenario: 🎬 Rendering / Pipeline
**Trigger:** Du arbeitest mit Rendering, Lambda oder der Pipeline.

**LIES:**
1. [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md) – Technische Regeln
2. [`handover/meta/VIRON_HARDWARE_LAWS.md`](handover/meta/VIRON_HARDWARE_LAWS.md) – Hardware-Constraints
3. Skill: `rules/pipeline.md` (im Skill-System)

---

### Scenario: 🏛️ Orchestration / Badge Management
**Trigger:** Du bist Orchestrator und managst Badges/Subagents.

**LIES:**
1. [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md) – Prozess-Regeln
2. [`handover/implementation_plan.md`](handover/implementation_plan.md) – Viron Laws
3. [`workflows/orchestrate-badge-cycle.md`](workflows/orchestrate-badge-cycle.md) – Badge Cycle Protocol
4. [`workflows/deploy-subagent-mission.md`](workflows/deploy-subagent-mission.md) – Deployment

---

## 📚 Knowledge Architecture (Hierarchie)

```
┌─────────────────────────────────────────────────────────────┐
│  TIER 1: GLOBAL (Gilt für ALLE Remotion-Projekte)          │
│  ~/.gemini/antigravity/global_skills/remotion-best-practices/│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  TIER 2: PROJECT (Viron-spezifisch)                        │
│  .agent/AGENTS.md ← Einstiegspunkt                         │
│  gemini.md, PROJECT_RULES.md, viron-core/*.md              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  TIER 3: SKILL (Domänen-spezifisch)                        │
│  .agent/skills/*/SKILL.md                                  │
└─────────────────────────────────────────────────────────────┘
```

**Regel:** Lade immer von oben nach unten. Global → Project → Skill.

---

## 🗺️ Schnell-Navigation

| Was du suchst          | Wo du es findest                                          |
| ---------------------- | --------------------------------------------------------- |
| **Einstiegspunkt**     | [`AGENTS.md`](AGENTS.md) ← Hier                           |
| **Unverrückbare Regeln** | [`RULES_CORE.md`](RULES_CORE.md)                        |
| **Prozess-Regeln**     | [`RULES_WORKFLOW.md`](RULES_WORKFLOW.md)                  |
| **Technische Regeln**  | [`RULES_TECHNICAL.md`](RULES_TECHNICAL.md)                |
| **Migrations-Guide**   | [`RULES_MIGRATION_GUIDE.md`](RULES_MIGRATION_GUIDE.md)    |
