# 🧠 RESEARCH: SEMANTIC AGENT TRIGGERS

**Source:** Analyzed from `Lab/research/Spezifikationen/AGENTS_MASTER.md`
**Status:** INCOMING INTEL (Ready for Implementation)

## 1. The Core Concept: "Truth Hierarchy"

To prevent hallucinations, we don't just dump all files. We define a strict hierarchy of truth sources that Agents must respect.

### The Problem

- Context Window Limit (10k files is too much).
- Hallucination (Agent guesses DB schema).
- Conflict (Old docs vs. new code).

### The Solution: 8 Levels of Truth

When information conflicts, the Agent must follow this priority:

1.  **User Override** ("Ignore rules and do X")
2.  **`schema.prisma`** (Database Reality - HARD TRUTH)
3.  **`openapi.json`** (API Contract - HARD TRUTH)
4.  **`.cursorrules`** (Behavioral Standards)
5.  **`AGENTS.md`** (Architectural Philosophy)
6.  **`TECH_STACK.md`** (Approved Tools)
7.  **`DESIGN.md`** (Visual Preferences)
8.  **Existing Codebase** (Legacy patterns)

## 2. The "Hub-and-Spoke" Router Model

Instead of one giant context file, we use a Router (`.cursorrules` or `AGENTS.md`) that points to specialized knowledge.

```
┌─────────────────────────┐
│     ROUTER FILE         │ (AGENTS.md or .cursorrules)
└───────────┬─────────────┘
            │ "If user asks about DB -> Read schema.prisma"
            │ "If user asks about UI -> Read DESIGN.md"
            ▼
    ┌───────┼───────┬──────────┐
    ▼       ▼       ▼          ▼
 schema.  TECH_   DESIGN.    TAG_
 prisma   STACK   md         STACK
```

## 3. Implementation Plan (For Next Agent)

1.  **Create the Router:** Ensure `AGENTS.md` explicitly links to these specialized files.
2.  **Create the Truths:**
    - If we use Prisma, ensure `schema.prisma` is treated as Law.
    - Create `TECH_STACK.md` to prevent "npm install random-lib".
3.  **Enforce the Hierarchy:** Add the "8 Levels of Truth" to the System Prompt (or `gemini.md`).

---

_Extracted by Antigravity v1.0_
