---
description: Automatically closes the session by archiving the walkthrough/log into the project repository.
---

# 🏁 Session-Close Workflow

Use this workflow to ensure that all knowledge, learnings, and task statuses are permanently stored in the project repository before ending a session.

## Steps

1. **Summarize Session:**
   - Review all task results and the `walkthrough.md` from the agent brain.
   - Condense findings into a clean Markdown log format.

2. **File Archival:**
   - Create a new log file in `.agent/sessions/`.
   - Naming convention: `LOG_YYYY-MM-DD_[Short_Session_Topic].md`.
   - Ensure the directory exists: `mkdir -p .agent/sessions`.

3. **Inconsistency Check:**
   - Run `git status` to ensure all relevant files (Docs, Research, Code) are staged or committed.

// turbo 4. **Permanent Sync:**

- Commit the session log and all pending documentation changes.
- Command: `git add .agent/sessions/; git commit -m "chore: archive session log [Topic]"; git push`

5. **Final Notification:**
   - Inform the user that the session is safely archived and the system is ready for a restart.

## Why this is mandatory

Agents have limited context windows. Without this archival step, established decisions or research results might be lost when a new session starts. This file serves as the "Long-Term Memory" of the project.
