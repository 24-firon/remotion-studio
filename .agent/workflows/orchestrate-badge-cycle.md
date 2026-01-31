---
description: The Meta-Workflow for the Orchestrator to manage a Badge Audit Cycle (Discovery -> Briefing -> Review).
---

# ♾️ ORCHESTRATE BADGE CYCLE (V2.2 - TASK GOVERNANCE)

**Trigger:** Start of a new Badge Audit Task (e.g., Badge 7, Badge 8).
**Role:** Orchestrator (You)

---

## 🧭 PHASE 0: ORIENTATION (CONTEXT MODE)

**Constraint:** 🧠 GET YOUR BEARINGS.
**Action:**

1. **Read `task.md`:** Find the current Badge section. Understand the scope.
2. **Read Plans:** If an `IMPLEMENTATION_PLAN.md` exists, read it NOW to understand specific constraints.
3. **Verify Git:** Run `git status` to ensure a clean slate.
   **Forbidden:** Starting work without knowing the active Task ID.

---

## 🛑 PHASE 1: THE ARCHITECT'S DEEP DIVE (INPUT MODE)

**Constraint:** 🚫 WRITE NOTHING (except Task Update). READ ONLY.
**Action:**

1. **Mark In-Progress:** Update `task.md` -> Mark the Badge items as `[/]` (In Progress).
2. **Execute Reads:**
   - Read ALL Repo files listed in the task.
   - Read ALL Vault files listed in the task.
   - Read ALL Skill files listed in the task.
   - Read `SUBAGENT_BRIEFING_TEMPLATE.md` (to know the baseline).
3. **Analyze for Smoke:** Find 3-5 specific technical values (Hz, ms, Hex-Codes) that prove deep knowledge.
   **Forbidden:** Skipping ANY file listed in `task.md`.

---

## 📝 PHASE 2: ASSET CREATION (OUTPUT MODE)

**Constraint:** ✍️ WRITE ONLY TO `.knowledge/mission/`
**Action:**

1. **Draft Briefing:** Create `SUBAGENT_BRIEFING_BADGE_X.md` based on V3.0 Template.
   - Inject the specific file paths from Phase 1.
2. **Draft Prompt:** Create `SUBAGENT_ACTIVATION_PROMPT_BADGE_X.md` based on V2.2 Template.
   - Inject the "Forensic Questions" derived from your Phase 1 "Smoke Analysis".
     **Forbidden:** Activating the agent in this phase.

---

## 🔒 PHASE 3: THE SAFETY LOCK (GIT MODE)

**Constraint:** 🛑 STOP AND COMMIT.
**Action:**

1. Run `git status` to verify new files.
2. Offer COMMIT: `feat(mission): prepare Badge X assets`.
3. **WAIT** for user approval.
   **Forbidden:** Proceeding without a clean `git status` output.

---

## 🚀 PHASE 4: ACTIVATION & INTERROGATION (CHAT MODE)

**Constraint:** 💬 CHAT ONLY. NO FILE WRITING.
**Action:**

1. Paste the Activation Prompt into the chat (User View).
2. **Simulate/Wait** for the Sub-Agent's response.
3. **Verify Answers:**
   - Did they quote the exact lines?
   - Did they find the "Smoking Guns" you found in Phase 1?
   - **FAIL:** "Answers too vague. REJECTED. Read X again."
   - **PASS:** "Access Granted. Proceed to Report."
     **Forbidden:** Creating the Report file yourself. The "Agent" does this in the next step.

---

## 🔍 PHASE 5: THE REPORT AUDIT (CHECKLIST MODE)

**Constraint:** 🕵️ READ OUTPUT. DON'T TRUST.
**Action:**

1. **Open:** `.agent/workflows/orchestrator-self-audit.md`.
2. **Execute:** Run the table-based check.
   - "Did they read file A?" -> Check Output -> [x]
   - "Did they read file B?" -> Check Output -> [x]
3. **Result:**
   - One [ ] missing? -> **AUDIT BLOCKADE**. Send error message.
   - All [x]? -> Proceed to Phase 6.

---

## 🛡️ PHASE 6: THE REFLECTION DEFENSE (INTERROGATION MODE)

**Constraint:** 💬 CHAT ONLY.
**Action:**
Ask the "Decision Logic" questions:

1. "Why is this Viron IP?" (Must cite Pre-Calc/Architecture)
2. "Why is that Redundant?" (Must cite Global Skill line)
   **Output:** Agent must answer in chat.
   **Forbidden:** Skipping this step because "it looks good".

---

## 💎 PHASE 7: CONSOLIDATION & CLOSURE (FINAL MODE)

**Constraint:** ✍️ FINAL ARTIFACTS ONLY.
**Action:**

1. **Create Learning:** Write `.knowledge/project-learnings/LEARNING_BADGE_X.md`.
2. **Update Task:** `task.md` -> Mark items as `[x]` (Done).
3. **Final Commit:** `feat(mission): complete Badge X with forensic audit`.

---

_Orchestrate Badge Cycle v2.2 | 2026-01-31_
