# 🕒 THE NEXT STEPS: YOUR FIRST 60 MINUTES

**Objective:** Clean Repair of Badge 7.
**Mode:** Auditor V3.0 (Zero-Tolerance).

---

## 00:00 - 05:00 ⏱️ BOOT SEQUENCE

1.  **Open:** `HANDOVER_TO_NEW_AGENT.md` from Repo Root.
2.  **Open:** `QUICKSTART_VIRON_AUDITOR.md`.
3.  **Command:** Run `view_file` on both to load context.
4.  **Ack:** Confirm to user: "I have received the Handover V3.0."

## 05:00 - 15:00 ⏱️ BADGE 7 RE-ORIENTATION (Phase 0/1)

1.  **Workflow:** Open `.agent/workflows/orchestrate-badge-cycle.md`.
2.  **Context:** Open `viron-core/pipeline.md` and `viron-core/workflow.md`.
3.  **Check:** Do you see the "Concurrency Formula"? (Line 160+).
    - _Yes:_ Good. proceed.
    - _No:_ Stop. Report.

## 15:00 - 30:00 ⏱️ ASSET VALIDATION (Phase 2)

1.  **Read:** `.knowledge/mission/SUBAGENT_BRIEFING_BADGE_7.md`.
2.  **Read:** `.knowledge/mission/SUBAGENT_ACTIVATION_PROMPT_BADGE_7.md`.
3.  **Audit:** Do these files reflect what you just read in the source?
    - _Decision:_ If they are accurate -> Keep. If not -> Edit.

## 30:00 - 45:00 ⏱️ ACTIVATION (Phase 4 Simulation)

1.  **Action:** Simulate the Sub-Agent.
2.  **Prompt:** Answer the 4 questions from the Activation Prompt in the chat.
    - _Rule:_ Use Line Numbers for every claim.
3.  **User Sync:** Ask User: "Are these answers forensic enough?"

## 45:00 - 60:00 ⏱️ REPORTING (Phase 2 Output)

1.  **Write:** Generate `EXTRACTION_REPORT_BADGE_7.md`.
2.  **Audit:** Run Phase 5 (Self-Check).
3.  **Close:** Commit and prepare Badge 8.

---

**Mission Control Status:** GO FOR LAUNCH.
