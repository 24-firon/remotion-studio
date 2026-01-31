---
description: The Meta-Workflow for the Orchestrator to manage a Badge Audit Cycle (Discovery -> Briefing -> Review).
---

# ♾️ ORCHESTRATE BADGE CYCLE (V2.0 - BATTLE TESTED)

**Trigger:** Start of a new Badge Audit Task (e.g., Badge 7, Badge 8).
**Role:** Orchestrator (You)

---

## 🛑 PHASE 1: THE ARCHITECT'S DEEP DIVE (Reading)

**Goal:** You cannot brief an agent if you don't know the truth.
**Action:**

1. Read ALL files listed in `task.md` for this Badge.
2. Read the GLOBAL SKILLS relevant to this Badge (Redundancy Check).
3. Identify 3-5 "Smoking Guns" (Exakte Werte, Interfaces, Codecs).
   **Output:** A list of "Forensic Traps" in your scratchpad.
   **FORBIDDEN:** Creating Briefing/Prompt before reading sources.

---

## 📝 PHASE 2: ASSET CREATION (Writing)

**Goal:** Equip the Sub-Agent with strict instructions.
**Action:**

1. Create `SUBAGENT_BRIEFING_BADGE_X.md` (Use V3.0 Gold Template).
   - Must include Context Kit Phase 0.
   - Must include specific Source List Phase 2.
2. Create `SUBAGENT_ACTIVATION_PROMPT_BADGE_X.md` (Use V2.2 Forensic).
   - Must include your "Forensic Questions" from Phase 1.
     **Output:** Two Markdown files in `.knowledge/mission/`.

---

## 🔒 PHASE 3: THE SAFETY LOCK (Commit)

**Trigger:** Assets are created.
**Action:**

1. Run `git status`.
2. Offer COMMIT: `feat(mission): prepare Badge X assets`.
   **FORBIDDEN:** Activating the agent before committing assets.

---

## 🚀 PHASE 4: ACTIVATION & INTERROGATION (Simulation)

**Goal:** Verify the agent read the files.
**Action:**

1. Send the Activation Prompt.
2. **WAIT** for the agent to answer the Forensic Questions A-D.
3. Check answers against your Deep Dive knowledge.
   - **FAIL:** If answers are vague -> REJECT.
   - **PASS:** If answers cite line numbers -> GRANT WRITE PERMISSION.

---

## 🔍 PHASE 5: THE REPORT AUDIT (Self-Check)

**Trigger:** Agent submits `EXTRACTION_REPORT_BADGE_X.md`.
**Action:**

1. Open `.agent/workflows/orchestrator-self-audit.md`.
2. Execute the Checklist (Did he read all files? Is negative proof there?).
3. **Verdict:**
   - ❌ **BLOCK:** If 1 file is missing -> "AUDIT-BLOCKADE".
   - ✅ **PASS:** Proceed to Phase 6.

---

## 🛡️ PHASE 6: THE REFLECTION DEFENSE (Meta-Check)

**Goal:** Force the agent to defend their logic.
**Action:**
Ask 3 "Why" questions:

1. "Why is X not a Global Skill?"
2. "Why did you drop Y?"
3. "Explain the Context of Z."
   **Output:** Agent must answer in chat. Only accept if logic is sound.

---

## 💎 PHASE 7: CONSOLIDATION & CLOSURE (The Seal)

**Trigger:** Defense passed.
**Action:**

1. **Create Learnings:** Write `.knowledge/project-learnings/LEARNING_BADGE_X_...md` (Summary of IP).
2. **Update Task:** Mark items in `task.md` as `[x]`.
3. **Final Commit:** `feat(mission): complete Badge X with forensic audit`.
   **FORBIDDEN:** Skipping the Learning Artifact.

---

_Orchestrate Badge Cycle v2.0 | 2026-01-31_
