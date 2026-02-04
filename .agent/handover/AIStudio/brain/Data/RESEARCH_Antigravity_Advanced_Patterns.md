# 🧠 RESEARCH: Antigravity Advanced Patterns (v1.0)

**Source:** Internal Research (Session 68970c17)
**Status:** VALIDATED PATTERNS
**Tags:** [GOVERNANCE] [META-SKILL]

---

## 1. THE CONTEXT MYTH vs. REALITY

**Myth:** "I can just increase the chat history setting to 100 messages."
**Reality:** There is NO user-configurable setting for this. Antigravity uses dynamic context management.
**The Fix:** **"Context File Workflow"**

- Instead of relying on chat history (which degrades), we must rely on **Artifacts** as the "External Hard Drive."
- **Protocol:** Every major decision or context must be written to a file (`DECISION_LOG.md`, `specs/`).

## 2. REASONING-INFUSED ARTIFACTS ("The Trigger Protocol")

Why does the agent forget _why_ it decided something?
Because standard artifacts are "Action-Only":

> `[ ] Update theme.md` (Context-Poor)

**The Solution:**
We must write **Reasoning-Rich Artifacts**. When the agent reads the artifact later, the phrasing must _trigger_ the logic retrieval.

**Bad Pattern (Action-Only):**

```markdown
- [ ] Refactor Audio Component
```

**Good Pattern (Reasoning-Rich):**

```markdown
- [ ] **Refactor Audio Component**
  - **Reasoning:** Current implementation causes hydration mismatch because `AudioContext` initializes before DOM.
  - **Goal:** Move init to `useEffect` to ensure client-side execution.
```

**Rule:** Every Task/Plan item must have a `Reasoning:` sub-bullet if the "Why" is not obvious.

## 3. AGENT-TO-SUBAGENT FLOW

- Sub-agents (Terminal/Browser) communicate via **Artifacts** (Logs, Screenshots).
- **Instruction:** Do not just "look" at the screenshot. **Describe** what you see in the artifact to "commit" it to the text context.

---

## 4. ACTIONABLE DIRECTIVES FOR AGENTS

1.  **Never Assume History:** If it's not in a file, it didn't happen.
2.  **Write to Trigger:** Write plans that explain _why_, not just _what_.
3.  **Context Loading:** Use the `documentation_manifest.md` to surgically load context, rather than "scrolling up" in chat.
