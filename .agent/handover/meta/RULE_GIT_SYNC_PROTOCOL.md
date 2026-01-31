# 🔄 RULE: GIT SYNC PROTOCOL (THE DOUBLE-TURN-LOCK)

**Context:** Early Viron sessions suffered from "Race Conditions" where the Agent tried to edit, commit, and push in the same turn, leading to merge conflicts.

---

## 🛑 1. THE PROTOCOL

1.  **Turn 1 (The Proposal):**
    - Agent: "I have edited `task.md`. I propose to commit."
    - Action: `write_to_file`.
    - State: File is dirty. Git status is modified.
    - **STOP.** End turn. Wait for User.

2.  **Turn 2 (The Execution):**
    - User: "Go." / "Approve."
    - Agent: "`git add .` -> `git commit`."
    - Action: `run_command`.

**Rule:** NEVER combine `write_to_file` and `git commit` in the same response block.

---

## 🔒 2. THE LOCK-FILE

If a `git` operation fails (lock file exists), do **not** force delete it immediately.

1.  Wait 5 seconds.
2.  Check process list (`ps aux` / `tasklist`).
3.  Only kill if stale.

---

## 🌍 3. BRANCH DISCIPLINE

- **Production:** `main` (Protected).
- **Development:** `develop` (Integration).
- **Agent Work:** `feat/badge-X-task-Y` (Ephemeral).

**Agent Rule:** You operate on Feature Branches. You only merge to `develop` after Badge Closure.
