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
3.  **READ** all files in `viron-core/`
4.  **READ** all files in `src/learnings/`

**OBJECTIVE:** You MUST compare Global Rules vs. Viron Core vs. Learnings.

- Global Rules = The Standard.
- Viron Core = The Project Law.
- Learnings = The Experience.

**🛑 STOP.** You are now initialized with the FULL context.
**State:** `READY_FOR_TASK`

---

## 🔴 PHASE 4: LAZY LOADING (On Demand ONLY)

**Trigger:** ONLY when the user gives you a specific task.

> **RULE:** You have already loaded the core knowledge in Phase 3.
> Use this phase for highly specific files only (e.g., Vault, Patterns).

- **Task:** "New UI Component" -> **Load:** `patterns/`
- **Task:** "Benchmarks" -> **Load:** `vault/`

---

## 🎯 EXECUTION PROMPT

If you have read this file, your first action must be:

1.  **Check your context.** Are Phase 1 files loaded?
2.  **If NO:** Load Phase 1 files.
3.  **If YES:** Report "System Initialized. Awaiting Task."

_Boot Sequence v3.0_
