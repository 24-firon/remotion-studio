# 🔄 RULES_WORKFLOW.md – Prozess-Regeln

**Version:** 1.0 (Consolidated)  
**Status:** MANDATORY for all workflow operations  
**Scope:** Git, Releases, Orchestration, Session Management

---

## 🎯 Overview

Diese Datei konsolidiert alle Workflow-bezogenen Regeln aus dem VIRON Repository:
- Double-Turn-Lock für Git
- Badge Cycle Orchestration
- Session Management
- Initialization Flow
- Release Protocols

---

## 🔄 1. GIT SYNC PROTOCOL (THE DOUBLE-TURN-LOCK)

**Quelle:** [`handover/meta/RULE_GIT_SYNC_PROTOCOL.md`](handover/meta/RULE_GIT_SYNC_PROTOCOL.md)  
**Kontext:** Frühe Viron-Sessions hatten "Race Conditions" bei Edit + Commit + Push im selben Turn.

### 1.1 The Protocol

| Turn | Action | Agent | State |
|------|--------|-------|-------|
| **1** | **The Proposal** | "I have edited `task.md`. I propose to commit." | File is dirty. Git status: modified. |
| | Action: `write_to_file` | | |
| | **STOP.** End turn. Wait for User. | | |
| **2** | **The Execution** | User: "Go." / "Approve." | Changes committed |
| | Action: `run_command` → `git add .` → `git commit` | | |

> **Rule:** NEVER combine `write_to_file` and `git commit` in the same response block.

### 1.2 The Lock-File Protocol

Wenn ein `git` Operation fehlschlägt (lock file exists):
1. **Warte 5 Sekunden**
2. Prüfe Prozess-Liste (`ps aux` / `tasklist`)
3. Nur killen wenn stale (veraltet)

### 1.3 Branch Discipline

| Branch | Zweck | Agent Zugriff |
|--------|-------|---------------|
| `main` | Production | Protected – Kein direkter Push |
| `develop` | Integration | Protected – Nur via PR |
| `feat/badge-X-task-Y` | Feature Work | Agent operiert hier |

**Agent Rule:** Du operierst auf Feature Branches. Merge zu `develop` erst nach Badge Closure.

---

## 🏛️ 2. BADGE CYCLE ORCHESTRATION

**Quelle:** [`workflows/orchestrate-badge-cycle.md`](workflows/orchestrate-badge-cycle.md)

### 2.1 Badge Lifecycle

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  INIT    │ → │  ACTIVE  │ → │  REVIEW  │ → │  CLOSED  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
    │                │                │                │
    ▼                ▼                ▼                ▼
Setup Task    Subagent Work    Quality Gate     Archive &
Define Scope  Execute          Validation       Handover
```

### 2.2 Orchestrator Responsibilities

- **Task Definition:** Klare Scope-Grenzen
- **Subagent Delegation:** Via `deploy-subagent-mission.md`
- **Quality Gates:** PoR (Proof-of-Reading) Check
- **Badge Closure:** Archive + Handover

### 2.3 Subagent Delegation Matrix

**Quelle:** [`Remotion Recherche/SUB-AGENT-DELEGATION-MATRIX-v1-0.md`](../Remotion%20Recherche/SUB-AGENT-DELEGATION-MATRIX-v1-0.md)

| Task Typ | Delegiert an | Übergabe-Format |
|----------|--------------|-----------------|
| 3D/Three.js | 3D Specialist | `SUBAGENT_BRIEFING_3D.md` |
| Audio/Sound | Audio Engineer | `SUBAGENT_BRIEFING_AUDIO.md` |
| UI/Components | Frontend Dev | `SUBAGENT_BRIEFING_UI.md` |
| System/Infra | DevOps | `SUBAGENT_BRIEFING_SYS.md` |
| Audit/QA | Auditor | `SUBAGENT_BRIEFING_QA.md` |

---

## 🚀 3. DEPLOY SUBAGENT MISSION

**Quelle:** [`workflows/deploy-subagent-mission.md`](workflows/deploy-subagent-mission.md)

### 3.1 Mission Deployment Flow

1. **Pre-Flight Check**
   - `task.md` aktuell?
   - Scope klar definiert?
   - Abhängigkeiten identifiziert?

2. **Briefing Erstellung**
   - Template: `SUBAGENT_BRIEFING_BADGE_X.md`
   - Enthält: Context, Acceptance Criteria, Constraints

3. **Handover Execution**
   - Subagent erhält: Briefing + Relevante Specs
   - Orchestrator: Überwacht via Checkpoints

4. **Integration**
   - Subagent Output Review
   - Merge in `develop`
   - Update `task.md`

---

## 📋 4. INITIALIZATION FLOW (BOOT SEQUENCE)

**Quelle:** [`handover/INITIALIZATION_PROMPT.md`](handover/INITIALIZATION_PROMPT.md)

### 4.1 Forensic Reboot Sequence (MANDATORY)

```
┌─────────────────────────────────────────────────────────────┐
│  SYSTEM HALT: Execute Reboot Sequence to ingest Viron DNA   │
│  Status: 🧊 FROZEN until complete                           │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Boot Phases

| Boot | Datei(en) | Zweck |
|------|-----------|-------|
| **BOOT 0** | `BOOT_PROMPT.md`, `WALKTHROUGH_SESSION_6.md`, `WHITELIST.md`, `BLACKLIST.md` | Meta-Dateien verstehen |
| **BOOT 1** | `HANDOVER_TO_NEW_AGENT.md`, `QUICKSTART_VIRON_AUDITOR.md`, `THE_NEXT_STEPS.md`, `THE_VIRON_AESTHETIC_MANIFESTO.md`, `USER_GOVERNANCE_PROTOCOL.md` | Kontext & Governance |
| **BOOT 2** | `task.md`, `implementation_plan.md`, `docs/TOKEN_BUDGET.md` | Plan & Strategie |
| **BOOT 3** | `viron-core/vision.md`, `00-master-workflow-2026-integration.md`, `00-overview-index-v2-1-complete.md` | Vision & Workflow |
| **BOOT 4** | `.agent/skills/remotion-core-skill-source/SKILL.md` | Skill Reference |

### 4.3 Reboot Complete

Nach Abschluss: **"I am rebooted. Viron DNA ingested."**

Dann: Proceed zu `TASK_PROMPT.md` für spezifische Aufgabe.

---

## 🏁 5. RELEASE PROTOCOL

**Quelle:** [`workflows/release.md`](workflows/release.md)  
**Command:** `/release`

### 5.1 Semantic Release Protocol

| Schritt | Action | Verantwortlich |
|---------|--------|----------------|
| 1 | Version bump in `package.json` | Agent |
| 2 | Changelog update | Agent |
| 3 | `git add .` + `git commit` | Agent (Double-Turn-Lock) |
| 4 | Tag erstellen: `git tag -a vX.Y.Z -m "Release message"` | User/Orchestrator |
| 5 | Push: `git push origin develop --tags` | User/Orchestrator |

### 5.2 Knowledge-Audit

Vor jedem Commit prüfen:
- Brauchen Docs ein Update?
- Sind Learnings dokumentiert?
- Ist `DECISION_LOG.md` aktuell?

---

## 🚪 6. SESSION CLOSURE

**Quelle:** [`workflows/session-close.md`](workflows/session-close.md)  
**Command:** `/session-close`

### 6.1 Auto-Archive Session Logs

| Aktion | Zweck |
|--------|-------|
| Update `task.md` | Session-Zusammenfassung |
| Update `HANDOVER_[Topic].md` | Kontext für nächsten Agent |
| Archive Logs | `.agent/sessions/YYYY-MM-DD_HH-MM-SS.log` |
| Checkpoint | Letzter bekannter guter Zustand |

### 6.2 Handover Checklist

- [ ] `task.md` aktualisiert?
- [ ] Offene Punkte dokumentiert?
- [ ] Blocker identifiziert?
- [ ] Nächste Schritte klar?

---

## 🧪 7. ORCHESTRATOR SELF-AUDIT

**Quelle:** [`workflows/orchestrator-self-audit.md`](workflows/orchestrator-self-audit.md)

### 7.1 QA Workflow

| Check | Frage |
|-------|-------|
| **Scope** | Hat der Subagent den Scope verstanden? |
| **PoR** | Proof-of-Reading durchgeführt? |
| **Output** | Akzeptiert der Output die Kriterien? |
| **Integration** | Sind alle Abhängigkeiten berücksichtigt? |
| **Docs** | Sind Learnings dokumentiert? |

### 7.2 Red Flags

- Subagent ignoriert WHITELIST
- Kein Governance Inventory vor Plan
- Verstöße gegen No-CSS Law
- Fehlende Hyperlinks

---

## ⚠️ 8. WORKFLOW WARNUNGEN

### 8.1 Turn-Separation

> **Edits und `git` NIEMALS im selben Turn.**

### 8.2 Knowledge-First

> **Vor dem Coden, relevante Spec lesen.**

### 8.3 Baseline vs. Projekt

> **Wenn es im globalen Skill steht, steht es NICHT nochmal hier.**

---

## 📊 Workflow Schnell-Referenz

| Befehl | Workflow | Datei |
|--------|----------|-------|
| `/release` | Semantic Release | [`workflows/release.md`](workflows/release.md) |
| `/session-close` | Session Archive | [`workflows/session-close.md`](workflows/session-close.md) |
| `/audit` | Visual Audit | [`workflows/audit.md`](workflows/audit.md) |
| `/deploy` | Subagent Mission | [`workflows/deploy-subagent-mission.md`](workflows/deploy-subagent-mission.md) |
| `/orchestrate` | Badge Cycle | [`workflows/orchestrate-badge-cycle.md`](workflows/orchestrate-badge-cycle.md) |

---

_RULES_WORKFLOW.md v1.0 | Consolidated from 120+ rule files | 2026-02-01_
