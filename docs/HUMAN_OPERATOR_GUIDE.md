# 🧑‍✈️ HUMAN OPERATOR GUIDE (HOG)

**Role:** You are the Pilot. The AI is the Engine.
**Goal:** Maximum efficiency, minimum friction.

---

## 🚦 1. THE "SYNC" RITUAL

### When to Sync?

The AI often forgets to push after committing (due to context switches).

- **Check:** Look at the Status Bar (Bottom Left).
- **Indicator:** If you see numbers (e.g., `0↓ 2↑`), you have local commits pending.
- **Action:** Click the "Sync" (Cycle Arrows) button.

### Handling "Git-Blocks"

If the Agent hangs or shows a loading bar during a Git operation:

1.  **Check Tabs:** Is `COMMIT_EDITMSG` open?
2.  **Action:** Close that tab immediately. (It's Git waiting for a signature).

---

## 🗣️ 2. CONTROLLING THE AGENT

### The "Recall" Limit

- **Reality:** The Agent forgets step #1 after about ~1000 steps (depending on token limits).
- **Strategy:** Don't say "As we discussed 3 days ago".
- **Better:** "As documented in `docs/REPOSITORY_MANIFESTO.md`..." (Reference Files, not Chat).

### The "Boot" Command

To start a fresh session perfectly:

> "System Start. Read `.agent/boot/INIT_MISSION.md`. Execute Phase 1-3."

---

## 🛡️ 3. SECURITY & COMPLIANCE

- **Logs:** We do not trust the Chat History for DSGVO/Compliance.
- **Rule:** Major decisions MUST be logged in `DECISION_LOG.md` or `HISTORY_LOG.md`.
- **Verify:** Demand specific log entries for critical changes.

---

_Viron Operator Manual | v1.0_
