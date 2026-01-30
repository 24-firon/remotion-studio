---
description: The Meta-Workflow for the Orchestrator to manage a Badge Audit Cycle (Discovery -> Briefing -> Review).
---

# 🛸 WORKFLOW: Orchestrator Badge Cycle

**Purpose:**
Defines the step-by-step protocol for the Orchestrator to manage a specific "Viron Badge Audit". Ensures no file is missed, paths are valid, and the Sub-Agent is correctly instrumented.

**Trigger:**
Start of a new Badge in `task.md`.

---

## 1. SCOPE & DISCOVERY (The "Radar")

1.  **Read Master Task:**
    - Open `task.md`.
    - Identify the current Badge Section (e.g., `### 📦 BADGE 4`).
    - Extract the list of **Source Files** (REPO, VAULT, SKILL).

2.  **Path Verification (Crucial):**
    - **Action:** Run a `Test-Path` (or equivalent) loop on ALL extracted file paths.
    - **Logic:**
      - If Path exists -> ✅ Green.
      - If Path missing -> 🔴 Find the correct path (Search) and update `task.md` BEFORE Briefing.
    - **Goal:** Never send a Sub-Agent to a dead URL.

3.  **Context Scan (The "Pre-Read"):**
    - **Action:** Open `theme.md` (or core repo files) for 10 seconds.
    - **Extraction:** Identify 1-2 key keywords/constraints (e.g., "Tailwind Only", "PBR Standard").
    - **Purpose:** Add specific hints to Sektion 3 ("Spezial-Hinweise") of the Briefing. You cannot direct what you haven't seen.

---

## 2. BRIEFING CONSTRUCTION (The "Contract")

_Reference: `.agent/workflows/deploy-subagent-mission.md`_

1.  **Load Learnings:**
    - Check the _previous_ Badge's `EXTRACTION_REPORT`.
    - Extract the `## Learnings` table.

2.  **Create Briefing File:**
    - Source: `SUBAGENT_BRIEFING_TEMPLATE.md`.
    - Target: `.knowledge/mission/SUBAGENT_BRIEFING_BADGE_[N].md`.
3.  **Injector Protocol (Manual Override):**
    - **Inject Gatekeeper:** Add the "I have read" checklist to Sektion 2.1.
    - **Inject Absolute Paths:** Hardcode the output path in Sektion 5.
    - **Inject Pre-Flight Warnings:** Paste the Learnings from Step 2.1 into header.

---

## 3. LAUNCH

1.  **Notify User:**
    - Present the "Schnell-Steuerung" block.
    - Ask for "Go".

---

## 4. VERIFICATION & ABNAHME (The "Review")

1.  **Artifact Check:**
    - Does `EXTRACTION_REPORT_BADGE_[N].md` exist in `.knowledge/mission/`?
    - **No?** -> Reject. (Reference Badge 3 Incident).

2.  **Content Audit:**
    - **Compliance:** Check mandatory extraction (Gatekeeper items).
    - **Deep-Read:** Compare 1-2 random facts in the Report against the Source File.
    - **Learnings:** Did the Agent include the `## Learnings` section?

3.  **Consolidation:**
    - Mark items in `task.md` as `[x]`.
    - Offer Commit.

---

// turbo
