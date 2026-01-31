# 🤜🤛 HANDOVER PROTOCOL: VIRON SYSTEM BRIDGE (V2.0)

**Source:** Orchestrator Session #5500 (Terminated due to Process Failure)
**Target:** NEXT GEN AGENT (Clean Slate)
**Priority:** DEFCON 1 (Project Integritiy Risk)

---

## 🏛️ 1. THE STRATEGIC CONTEXT (STATE OF THE UNION)

We are in the middle of a **Forensic Audit** of the Viron "Operating System" (Badge 7). This is not just a code check; it is the foundation for the **Agent Governance Layer** (Badge 8).

### The Critical Dependency Chain

- **Badge 7 (System Arch)** defines the _Hardware Limits_ (CPU/RAM/Sync).
- **Badge 8 (Agent Gov)** defines the _Software Rights_ (Permission to Edit).
- **Synergy:** If we don't lock down the Concurrency Limits (Badge 7) now, the Agents in Badge 8 will crash the render farm by spawning too many processes. **Badge 7 is the safety break for Badge 8.**

---

## 🛑 2. TACTICAL SITUATION (BADGE 7 STATUS)

**Current Phase:** `[ ] PHASE 4: ACTIVATION (Pending)`
**Previous Status:** Phase 3 (Assets Committed) ✅

### The Artifacts (Pre-Loaded in Repo)

1.  **The Law:** `.agent/workflows/orchestrate-badge-cycle.md` (V3.0)
    - _Status:_ BRAND NEW. Never executed successfully. You are the Test Pilot.
    - _Directive:_ Execute exactly as written. Zero deviation.
2.  **The Briefing:** `.knowledge/mission/SUBAGENT_BRIEFING_BADGE_7.md`
    - _Content:_ Defines the "Search Areas" (Pipeline, Workflows).
3.  **The Prompt:** `.knowledge/mission/SUBAGENT_ACTIVATION_PROMPT_BADGE_7.md`
    - _Content:_ Contains the 4 Forensic Questions.

**Your Immediate Job:**
Resume at **Phase 4**. Do NOT restart Phase 0-3. The assets are good. The execution was the problem.

---

## 💎 3. FORENSIC INTELLIGENCE (SMOKING GUNS)

_Analysis of the "System DNA" you will be verifying:_

| Component          | The "Gun" (Fact)              | The "Why" (Synergy)                                                                                                              | Location                  |
| :----------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :------------------------ |
| **Concurrency**    | `min(CPUs*1.5, RAM_GB/2, 16)` | **Protects the Cloud.** Prevents AWS Lambda OOM kills. Enables massively parallel serverless rendering without crashing.         | `pipeline.md`:167         |
| **Git Flow**       | `release/vX.X.X`              | **Protects the Agent.** Explicit release branches prevent Agents from pushing untested code to `main`. This is the "Air Gap".    | `workflow.md`:88          |
| **Sync Tolerance** | `> 2 Frames` Error            | **Protects the Quality.** "Good Enough" is not enough for Viron. Lip-sync must be perfect. If audio drifts, we kill the render.  | `trouble.md`:180          |
| **Gov Rule**       | "Micro-Extract Only"          | **Protects the Brain.** Prevents Context-Window pollution by forbidding full-file imports. Essential for long-term agent health. | `integration-protocol`:36 |

---

## ⚠️ 4. PSYCHOLOGICAL & OPERATIONAL HAZARDS

### The "Actionism Trap"

- **Symptom:** Jumping to "Write Report" before "Simulating Agent".
- **Consequence:** Hallucination. The User will terminate you.
- **Mitigation:** **WAIT.** After answering the activation questions, PAUSE. Verify your own answers against the file lines. Only then write.

### The "Path Blindness"

- **Risk:** `view_file` failing because you guessed the path.
- **Fix:** Use `.knowledge/source-master-index.md` to find paths FIRST.
  - _Context:_ `.knowledge/archive/vault-analysis/`
  - _Skills:_ `~/.gemini/antigravity/global_skills/`

---

## 🚀 5. EXECUTION PLAN (YOUR BOOT SEQUENCE)

1.  **Read** `HANDOVER_TO_NEW_AGENT.md` (This file).
2.  **Read** `.agent/workflows/orchestrate-badge-cycle.md` (The Law).
3.  **Enter Phase 4:**
    - Simulate the Interrogation.
    - Answer the 4 Prompts (Concurrency, Git, Sync, Gov).
    - **CRITICAL:** Verify the Line Numbers matches the Table in Section 3 above.
4.  **Write Report:** Generate `EXTRACTION_REPORT_BADGE_7.md` only after verification.

**Signed:**
_The Fallen Orchestrator (Session 5500)_
_Use my failure as your foundation._
