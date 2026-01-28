# 💎 VIRON REPOSITORY MANIFESTO

**Status:** Living Document
**Purpose:** The definitive source of truth for the repository's architecture, philosophy, and agent-interaction model.

---

## 🏛️ PART 1: THE FOUR-PILLAR ARCHITECTURE

We do not dump files randomly. We classify knowledge semantically to optimize for AI Context Windows and Human Readability.

### 1. The Laws (Global & Local Governance)

- **Location:** `~/.gemini/gemini.md` (Global) + `PROJECT_RULES.md` (Local).
- **Philosophy:** These are non-negotiable constraints. They define "Who we are" and "How we behave".
- **Agent Rule:** Must be loaded first (Boot Phase 1).

### 2. The Engine (`viron-core`)

- **Location:** `viron-core/`
- **Philosophy:** The technological foundation. Physics, PBR pipelines, Rendering logic.
- **Agent Rule:** Must be loaded second (Boot Phase 2). The agent cannot build Viron-Standard UIs without this.

### 3. The Specialized Knowledge (`/specs`, `/guides`, `/patterns`)

- **Location:** Root folders.
- **Philosophy:**
  - **Specs:** The "What" and "Why" (Deterministic logic).
  - **Patterns:** The "Code Snippets" (Copy-Paste ready).
  - **Guides:** The "Context" (Long-form explanations).
- **Agent Rule:** "On-Demand" only (Boot Phase 3). Do NOT load all specs at once.

### 4. The Vault (`/vault`)

- **Location:** `vault/`
- **Philosophy:** The "Chaos Lab". Ideas, drafts, research, and future plans (`vault/plans/`).
- **Rule:** Nothing in the vault is production-ready code. It is a workspace.

---

## 🧠 PART 2: THE "TURN-SEPARATION" DOCTRINE

### The Problem

AI Agents in IDEs suffer from "Race Conditions" when they try to edit files and run git commands in the same turn. The file system often locks or hasn't flushed changes to disk.

### The Solution: "Physical Gating"

1.  **Turn A (Write):** Agent edits files. Returns control to user.
2.  **Turn B (verify):** User/Agent verifies (compile, test).
3.  **Turn C (Commit):** Agent runs `git commit`.

**Golden Rule:** NEVER mix `replace_file_content` and `git commit` in the same tool-call batch.

---

## 🤖 PART 3: AGENT MEMORY & CONTINUITY

### The "Truncation" Reality

- **Fact:** The AI has a limited context window (e.g., 1M tokens).
- **Consequence:** Older messages (start of chat) eventually become invisible to the agent, even if they are still "in the chat history".
- **Mitigation:** We do NOT rely on Chat Memory for critical decisions. We rely on **File Permanence**.
  - _If you decided it, write it to a file._

### The "Bootloader" (`.agent/boot/INIT_MISSION.md`)

- **Purpose:** A single file that re-initializes a fresh agent with all necessary context, regardless of chat history.
- **Usage:** "Start System. Read `.agent/boot/INIT_MISSION.md`."

---

## 🔮 PART 4: FUTURE CONCEPTS (Planned)

### Strategic Logging (`SESSION_LOG.md`)

- **Idea:** Since chat history fades, agents should append key milestones to a persistent log file.
- **Frequency:** Every 30-50 turns or at major Task Boundaries.
- **Status:** Concept Phase.

---

_Viron Intelligence System | v1.0 | Authored by Antigravity (Jan 2026)_
