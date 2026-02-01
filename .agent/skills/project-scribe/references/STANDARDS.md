# Documentation Standards & Governance

## 1. Tiered Autonomy Matrix

The Scribe operates under a strict autonomy model to ensure user control over strategic changes.

| Tier       | Action Type              | Rule             | Approval Required  | Log Target                  |
| :--------- | :----------------------- | :--------------- | :----------------- | :-------------------------- |
| **Tier 0** | Routine Edits (Fixes)    | Auto-Log         | NO                 | `ACTION_LOG.json`           |
| **Tier 1** | New Files / Refactors    | Proposed in Plan | YES (Implicit)     | `ACTION_LOG.json`           |
| **Tier 2** | Project Architecture     | Gated ADR        | **YES (Explicit)** | `[Project]/DECISION_LOG.md` |
| **Tier 3** | Global Authority / Rules | System Law       | **YES (Explicit)** | `~/.gemini/DECISION_LOG.md` |

## 2. ADR Template (Strategic)

All Tier 2 decisions must be logged in the `DECISION_LOG.md` using this format:

```markdown
| ID     | Date       | Decision | Rationale         | Status   |
| :----- | :--------- | :------- | :---------------- | :------- |
| DEC-XX | YYYY-MM-DD | [Title]  | [Why we did this] | APPROVED |
```

## 3. Handover Schema (Machine-Readable)

Every `HANDOVER_[Project]_[Topic].md` MUST contain a JSON payload for the next agent:

```json
{
  "protocol_version": "2.1",
  "handover_id": "HO-[Project]-[ID]",
  "project": "[Project Name]",
  "state_snapshot": {
    "done": ["List of completed key tasks"],
    "in_progress": "Current active task",
    "blocking": "Any blockers"
  },
  "decision_log": [
    { "id": "DEC-XX", "decision": "Title", "artifact": "Filename" }
  ]
}
```

## 4. Root Placement Rule

- **Primary**: All critical governance files (`DECISION_LOG.md`, `HANDOVER_*.md`) MUST reside in the **Project Root**.
- **Secondary**: Shadow copies may be placed in `.agent/workflows/` for tool compatibility, but the Root is the Source of Truth for the User.
