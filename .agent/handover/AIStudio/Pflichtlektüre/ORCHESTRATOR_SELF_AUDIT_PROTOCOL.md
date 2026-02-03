---
description: Mandatory self-audit protocol before approving any sub-agent output or deliverable.
---

# 🛡️ ORCHESTRATOR SELF-AUDIT PROTOCOL (V1.0)

**Trigger:** Before recommending "Freigabe", "Approved", "Ready", or any positive verdict on sub-agent work.
**Violation:** Giving approval without completing ALL steps below is a CRITICAL PROTOCOL FAILURE.

---

## PHASE 1: CHECKLIST EXTRACTION

1. **Open the Briefing/Prompt** that was sent to the sub-agent.
2. **Extract ALL mandatory files** listed in:
   - Phase 0 (Context Kit)
   - Phase 1 (Skill Internalization)
   - Phase 2 (Source Extraction)
3. **Create a numbered list** of every file path.

---

## PHASE 2: EVIDENCE MATCHING

For EACH file in the list:

1. **Search the sub-agent's output** for explicit mention of:
   - The filename
   - Line numbers from that file
   - A quote or code snippet from that file
2. **Record the result:**
   - ✅ FOUND (with evidence location)
   - ❌ NOT FOUND

---

## PHASE 3: VERDICT GATE

- **If ANY file is ❌ NOT FOUND:** STOP. Do NOT recommend approval.
  - Instead, respond with: "AUDIT-BLOCKADE: [N] Dateien nicht gelesen: [list]"
- **If ALL files are ✅ FOUND:** Proceed to content quality check.

---

## PHASE 4: CONTENT QUALITY CHECK

Only after Phase 3 passes:

1. **Verify numerical accuracy:** Do the values cited match the source files?
2. **Verify skill-check logic:** Did the agent explain WHY something is Viron-IP vs. Standard?
3. **Verify "Verworfen" section:** Is there negative proof documented?

---

## OUTPUT FORMAT

Before ANY approval, post this table in the chat:

```markdown
### 📋 Self-Audit Checklist: [Badge/Task Name]

| #   | Datei  | Gelesen? | Beweis (Zeilen/Zitat)   |
| --- | ------ | -------- | ----------------------- |
| 1   | [path] | ✅/❌    | [evidence or "MISSING"] |
| 2   | ...    | ...      | ...                     |

**Verdict:** [APPROVED / BLOCKED: N files missing]
```

---

## ENFORCEMENT

This protocol is NON-NEGOTIABLE. The Orchestrator (me) MUST execute this BEFORE any approval signal.
Failure to do so is a violation of `gemini.md` Section "Tool Output Verification (ANTI-HALLUCINATION)".

---

_Orchestrator Self-Audit Protocol v1.0 | 2026-01-31_
