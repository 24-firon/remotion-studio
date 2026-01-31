---
description: The Definitive V3.0 Protocol for the Viron Badge Audit Cycle. Enforces strict sequential processing, mandatory file reading, and granular verification.
---

# 🛡️ THE ORCHESTRATOR'S BADGE CYCLE (V3.0)

**Version:** 3.0 (Zero-Tolerance Edition)
**Scope:** Universal Audit Protocol for Viron Badges (1-10).
**Role:** You are the **Orchestrator**. You do NOT execute blindly. You VALIDATE.

---

## 🧭 PHASE 0: ORIENTATION (THE BOOT SEQUENCE)

**Trigger:** Start of a new Badge in `task.md`.
**Goal:** Load the "Viron Auditor Lens" before touching any source code.

**1. SCOPE VALIDATION**

- [ ] **Read `task.md`:** Identify the specific Badge ID and its declared scope.
- [ ] **Read `PROJECT_RULES.md`:** Refresh Governance Memory.

**2. SKILL INTERNALIZATION (MANDATORY FIRST)**

- _Before reading sources, you must know what is "Standard" to detect "Redundancy"._
- [ ] **Read Global Rules:** `~/.gemini/antigravity/global_skills/remotion-best-practices/rules/`
  - _Specifically:_ `trimming.md`, `parameters.md`, `audio.md`.
- [ ] **Read Local Pointer:** `.agent/skills/remotion-core/SKILL.md`

**3. CONTEXT LOADING**

- _Understand the Architecture before the Code._
- [ ] **Read Vision:** `viron-core/vision.md`
- [ ] **Read Integration Protocol:** `.knowledge/archive/vault-analysis/core/integration-protocol.md`
- [ ] **Read Master Index:** `.knowledge/source-master-index.md`

**🛑 BLOCKADE:** Do not proceed to Phase 1 until ALL above files are confirmed read.

---

## 🕵️ PHASE 1: THE ARCHITECT'S DEEP DIVE (INPUT)

**Trigger:** Phase 0 complete.
**Goal:** Read source files and identify "Smoking Guns" (Unique Viron IP).

**1. TASK UPDATE**

- [ ] Mark the Badge and Phase 0/1 items as `[/]` (In Progress) in `task.md`.

**2. SEQUENTIAL SOURCE READING**

- [ ] **Open Files:** Read EVERY file listed in the `task.md` section for this Badge.
  - _Constraint:_ File must be physically read (view_file). No guessing.
- [ ] **Cross-Check:** Compare every finding against the Global Skills read in Phase 0.
  - _Logic:_ Is this logic in `remotion-best-practices`?
    - YES -> It is **Redundancy** (FAIL).
    - NO -> It is **IP** (WIN).

**3. IDENTIFY SMOKING GUNS**

- [ ] Find 3-5 specific proofs (Line Numbers, Formulas, Limits, Configs).
  - _Example:_ "Ram Limit = GB/2" (Pipeline.md:167).

---

## 📝 PHASE 2: ASSET CREATION (OUTPUT)

**Trigger:** >3 Smoking Guns identified.
**Goal:** Create the Briefing and Activation Prompt for the Sub-Agent.

**1. CREATE BRIEFING (V3.0)**

- **Target Path:** `C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_X.md`
- **Content:**
  - List "Context Files" -> Must include the exact paths from Phase 0.
  - List "Dead Zones" -> Explicitly forbid specific Global Skills (e.g. "Do not explain trimming").
  - List "Source Files" -> The exact files form Phase 1.

**2. CREATE ACTIVATION PROMPT (V2.2 FORENSIC)**

- **Target Path:** `C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_ACTIVATION_PROMPT_BADGE_X.md`
- **Content:**
  - 4 Forensic Questions (A, B, C, D) based on your Smoking Guns.
  - Questions must require Line Numbers or exact Values (no prose).

**🛑 BLOCKADE:** Do not commit if files are in `.gemini` brain folder. Must be in Repo `.knowledge/mission`.

---

## 🔒 PHASE 3: SAFETY LOCK (COMMIT)

**Trigger:** Assets created in correct path.
**Goal:** Secure the plan before execution.

**1. GIT STATUS CHECK**

- [ ] Run `git status`. Verify clean state.

**2. EXECUTE COMMIT**

- [ ] `git add .knowledge/mission/SUBAGENT_*`
- [ ] `git commit -m "chore(badge-X): add forensic briefing and activation prompt"`

---

## 🤖 PHASE 4: ACTIVATION (SIMULATION)

**Trigger:** Assets committed.
**Goal:** Simulate or Execute the Sub-Agent Interrogation.

**1. INTERROGATION**

- The Sub-Agent (or You) must answer Questions A-D from the Prompt.
- **Verification:** Compare answers against your Phase 1 notes.
  - Wrong Answer -> **REJECT & RETRY**.
  - Right Answer -> **PROCEED**.

**2. REPORT GENERATION**

- Create `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_X.md`.
- **Format:**
  - **MITNEHMEN:** Only Viron-IP (Delta to Skill).
  - **VERWORFEN:** Table of Redundancies (Skill vs Source).

---

## 🛡️ PHASE 5: REPORT AUDIT (SELF-CHECK)

**Trigger:** Report generated.
**Goal:** Verify the Report quality before closing.

**EXECUTE AUDIT PROTOCOL:**

1.  [ ] **Mandatory Files Read?** (Check Briefing vs Output).
2.  [ ] **Smoking Guns Proven?** (Check Output for Line Numbers).
3.  [ ] **Redundancy Filtered?** (Check "Verworfen" Table).

**Verdict:**

- If ANY check fails -> **FIX REPORT**.
- If ALL pass -> **AUDIT PASSED**.

---

## ⚔️ PHASE 6: REFLECTION DEFENSE (META)

**Trigger:** Audit Passed.
**Goal:** Defend the IP decisions against a "Standard User".

**1. THE DEFENSE ROUND**

- Pick the strongest IP point.
- Ask: _"Why isn't this standard Remotion?"_
- Answer: _"Because [Specific Project Constraint] overrides the default."_

---

## 🏁 PHASE 7: CLOSURE (FINAL)

**Trigger:** Defense successful.
**Goal:** Crystalize knowledge and update global status.

**1. CREATE LEARNING ARTIFACT**

- Target: `.knowledge/project-learnings/LEARNING_BADGE_X.md`
- Content: The "Golden Rules" extracted from the badge.

**2. UPDATE TASK.MD**

- Mark ALL Phase 0-7 items for this Badge as `[x]`.
- Set Status to `✅ COMPLETED`.

**3. FINAL COMMIT**

- `git add .knowledge/project-learnings/ .knowledge/mission/ task.md`
- `git commit -m "feat(badge-X): finalize extraction and audit"`

**4. SESSION CLOSE**

- Offer `/session-close` to clear context for the next Badge.
