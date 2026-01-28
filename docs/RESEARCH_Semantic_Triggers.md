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

## 4. Concrete Implementation Patterns (The "How-To")

### Pattern A: The "Tech Guard" (`TECH_STACK.md`)

- **Purpose:** Prevent dependency chaos and "resume-driven development".
- **Mechanism:** define a "Kill List" and "Approved List".
- **Trigger:** When Agent wants to run `npm install`.
- **Example Rule:**
  ```markdown
  | Library | Status       | Reason           |
  | ------- | ------------ | ---------------- |
  | axios   | ❌ Forbidden | Use native fetch |
  | moment  | ❌ Forbidden | Use date-fns     |
  ```

### Pattern B: The "Domain Logic Stack" (`TAG_STACK.md`)

- **Purpose:** Enforce business logic naming conventions that are too complex for a prompt.
- **Mechanism:** Detailed file explaining hierarchical strings (e.g., `Category:Sub:Value`).
- **Trigger:** When Agent modifies `schema.prisma` or data seeding.
- **Example:** "Tags must be kebab-case. `Tech:AI` is wrong, `tech:ai` is right."

### Pattern C: The "Scenario Trigger" (`.cursorrules`)

- **Purpose:** Dynamic Context Loading based on User Intent.
- **Mechanism:** If-This-Then-Read-That logic in the System Prompt.
- **Example:**

  ```
  ### Scenario: "Add a new package"
  → READ: TECH_STACK.md
  → CHECK: Allowed list

  ### Scenario: "Modify UI"
  → READ: DESIGN.md
  → ENFORCE: Tailwind v4
  ```

## 5. Next Steps for Implementation

1.  **Adopt the Files:** Copy the structure (`TECH_STACK.md`, `TAG_STACK.md`) to project root or `.agent/specs/`.
2.  **Update Router:** Make `AGENTS.md` (or `gemini.md`) the router that conditionally points to these files using the "Scenario Trigger" pattern.

---

_Extracted by Antigravity v1.0_
