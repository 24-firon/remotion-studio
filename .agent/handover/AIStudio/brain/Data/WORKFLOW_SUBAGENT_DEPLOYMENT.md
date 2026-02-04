---
description: Standardized protocol for generating Sub-Agent Briefings with enforced logic gates.
---

# 🚀 WORKFLOW: Sub-Agent Deployment (Mission 2026)

**Purpose:**
To generate error-proof briefings for Sub-Agents (Badges 4-8), ensuring that all learnings from previous badges (Context Blindness, Path Errors) are structurally impossible to repeat.

**Trigger:**
Start of a new Badge Audit (Phase 5 of Mission).

---

## 1. PREPARATION

1.  **Read the Template:**
    - Load `.knowledge/mission/SUBAGENT_BRIEFING_TEMPLATE.md`.
2.  **Load Learnings (The "Anti-Amnesia" Step):**
    - Read the _previous_ Badge's `EXTRACTION_REPORT` (Section "Learnings").
    - Extract the "Fix im Briefing" items.

---

## 2. CONSTRUCTION (The "Hardening")

Create `SUBAGENT_BRIEFING_BADGE_[N].md` by modifying the template:

### 2.1 Critical Path Injection

- **Rule:** NEVER use relative paths.
- **Action:** In Sektion 5 (Output), explicitly set:
  `Speicherort: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_[N].md`

### 2.2 The "Gatekeeper" (Context Enforcement)

- **Rule:** Passive tables are forbidden for critical context.
- **Action:** Convert Sektion 2.1 (Context Kit) into an **Active Checklist**:

  ```markdown
  ## 🛑 GATEKEEPER (PFLICHT)

  Bestätige VOR Start der Arbeit:

  - [ ] Ich habe `remotion-core/SKILL.md` gelesen (Canvas Verbot).
  - [ ] Ich habe `vision.md` gelesen (PBR Standard).
  - [ ] Ich habe `Logic` gelesen.

  ⚠️ Ohne diese Haken wird der Report abgelehnt.
  ```

### 2.3 Learnings Injection

- **Rule:** Errors must not be repeated.
- **Action:** Add a dynamic section `## 0. PRE-FLIGHT WARNINGS` at the very top.
- **Content:** Paste the "Learnings" from the previous Badge as direct warnings.
  _Example: "WARNUNG: Unterscheide streng zwischen R3F Canvas und Remotion ThreeCanvas!"_

---

## 3. DEPLOYMENT

1.  **Verify:** Check if all [PLACEHOLDER] fields are replaced.
2.  **Save:** `C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_[N].md`
3.  **Activate:** Post the "Schnell-Steuerung" block to the Chat.

---

## 4. POST-MORTEM (New Standard)

1.  **Debriefing:** After the Sub-Agent finishes, run the "Debriefing Protocol" (Why did you do X?).
2.  **Update:** Ensure the Agent adds a `## Learnings` section to their Report.

---

// turbo
