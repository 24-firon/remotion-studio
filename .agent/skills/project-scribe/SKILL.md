# Skill: Project-Scribe (The Inter-Session Bridge)

## 🎯 Goal

Automating documentation based on "Gold Standard" principles to prevent "AI Amnesia" and ensure seamless transitions between chat sessions.

## 🔑 Critical Commands

- `/generate-handover [Topic]`: Generates a `HANDOVER_[ProjectName]_[Topic].md` in the project root and copies it to `.agent/workflows/handover.md`.
- `/log-decision [Decision]`: (Tier 2) Logs a Project-Local decision in `[Project]/DECISION_LOG.md`.
- `/log-global [Decision]`: (Tier 3) Logs a System-Wide rule in `~/.gemini/DECISION_LOG.md`.
- `/update-state`: Synchronizes the `.agent/PROJECT_STATE.md` with the latest task progress.

## 🛠️ Tiered Autonomy Logic

- **Tier 0 (Autonomous)**: Documentation of simple, non-breaking edits (no approval needed).
- **Tier 1 (Supervised)**: New files or tool changes. Logged as `Proposed` in `ACTION_LOG.json`.
- **Tier 2 (Gated)**: Architectural changes (ADRs), rule updates (`gemini.md`). **Requires explicit user "Accept" before writing to permanent logs.**

## 📜 Behavior Rules

1. **Commit-on-Approval**: Permanent entries in `DECISION_LOG.md` or `gemini.md` are ONLY written after a `notify_user` call returns `Status: DONE`.
2. **Discovery First**: Read `.agent/roadmap/SCALING_STRATEGY.md` during major project transitions to determine if high-complexity tools (MCP) are needed.
3. **Zero Redundancy**: If a task is already in `task.md`, focus the log on the _Decision_ and _Rationale_.

## 📂 Managed File Structure

- `📂 Strategy: DECISION_LOG.md` (Project Root)
- `📂 Technical: .agent/ACTION_LOG.json`
- `📂 State: .agent/PROJECT_STATE.md`
