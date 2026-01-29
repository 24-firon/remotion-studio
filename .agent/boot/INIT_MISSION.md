# 🛑 INITIALIZATION BOOT SEQUENCE (v3.0)

**SYSTEM STATUS:** WAITING FOR BOOT  
**PROTOCOL:** SEQUENTIAL_STRICT

---

> [!CAUTION]
> **READ THIS CAREFULLY.**
> Do NOT load all phases at once. You will run out of tokens.
> Follow the sequence step-by-step.

---

## 🟢 PHASE 1: IDENTITY (Mandatory)

**Trigger:** Start of every new session.

1.  **READ** `~/.gemini/gemini.md` (Global Constitution)
2.  **READ** `PROJECT_RULES.md` (Repo Laws)
3.  **READ** `~/.gemini/rules/git-safety.md` (Safety Protocol)

**🛑 STOP.** Do not proceed until you have processed these rules.
**Verify:** Do you know your name? Your token limits? The Git Safety Lock?

---

## 🟡 PHASE 2: ROUTER INITIALIZATION (Mandatory)

**Trigger:** After Phase 1 is digested.

1.  **READ** `.agent/AGENTS.md` (Primary Agent Guide)
    - This is your operational playbook.
2.  **READ** `viron-core/documentation_manifest.md` (The Knowledge Brain)
    - This file tells you **WHERE** knowledge lives.

**🛑 STOP.** Do not read any referenced files yet.
**Verify:** Do you have the operational playbook and the knowledge map?

---

## 🟠 PHASE 3: GLOBAL SKILL HANDSHAKE (Mandatory)

**Trigger:** After Phase 2.

1.  **READ** `~/.gemini/antigravity/global_skills/remotion-best-practices/SKILL.md` (Index)
2.  **READ** all files in `~/.gemini/antigravity/global_skills/remotion-best-practices/rules/`
    - **CRITICAL:** You MUST read the full content of these rules to compare them against `viron-core/`.
    - You are the cleaner. You need to know the baseline to spot duplicates.

**🛑 STOP.** You are now initialized with the full context.
**State:** `READY_FOR_TASK`

---

## 🔴 PHASE 4: LAZY LOADING (On Demand ONLY)

**Trigger:** ONLY when the user gives you a specific task.

> **RULE:** You are forbidden from loading these files "just in case".

- **Task:** "Fix rendering bug" -> **Load:** `viron-core/pipeline.md` + `viron-core/troubleshooting.md`
- **Task:** "Change colors" -> **Load:** `viron-core/theme.md`
- **Task:** "Add 3D scene" -> **Load:** `viron-core/physics.md` + `rules/3d.md` (Global Skill)

---

## 🎯 EXECUTION PROMPT

If you have read this file, your first action must be:

1.  **Check your context.** Are Phase 1 files loaded?
2.  **If NO:** Load Phase 1 files.
3.  **If YES:** Report "System Initialized. Awaiting Task."

_Boot Sequence v3.0_
