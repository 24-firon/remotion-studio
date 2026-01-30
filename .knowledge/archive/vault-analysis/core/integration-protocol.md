# Integration Protocol: Skill Merging & Protection

**Source Vault File:** `26_INTEGRATION_PROTOCOL_Skill_Merge.md`
**Type:** System Architecture / Governance
**Purpose:** Defines the rules for integrating new knowledge into the immutable Remotion Core Skill.

---

## 🛡️ The Golden Core Rule (Immutable)

The existing Remotion Global Skill (`remotion-best-practices`) is **UNTOUCHABLE**.

- **Topics:** Basics, Core Hooks, Animation Principles, Rendering Pipeline.
- **Rule:** If incoming file touches these topics -> **COMPARE**.
  - If identical/worse -> **REJECT** (Duplicate).
  - If better -> **FLAG** for Human Review.
  - **NEVER** overwrite automatically.

---

## 🔬 The Audit Matrix (Decision Logic)

For every incoming file, apply this logic:

| Pattern             | Check            | Action                  | Target                 |
| ------------------- | ---------------- | ----------------------- | ---------------------- |
| `remotion-basics-*` | Core Coverage?   | If covered -> REJECT    | `_duplicates`          |
| `layout-patterns-*` | New patterns?    | If unique -> ACCEPT     | `extensions/layouts`   |
| `shaders-*`         | New Shaders?     | EXTRACT Snippet         | `extensions/shaders`   |
| `synergy-*`         | Valid Combo?     | Validate -> ACCEPT      | `extensions/synergies` |
| `web-patterns-*`    | Web Integration? | Likely new -> ACCEPT    | `extensions/web`       |
| `migration-core-*`  | Processed?       | Already done -> ARCHIVE | `_archive`             |

---

## 🔧 Snippet Extraction (Optimization)

Do not import giant files. Extract only the **unique value**:

1. Scan for Code Blocks.
2. Compare block against Core.
3. If new: Extract to micro-file (e.g., `chromatic-aberration.md`).
4. Discard boilerplate text.

---

## 🏗️ Extension Architecture (Progressive Disclosure)

Files land in `extensions/` subfolders, organized by topic:

- `extensions/shaders/`
- `extensions/audio/`
- `extensions/web/`
- `extensions/synergies/`

A **Discovery Manifest** (`_INDEX.md`) tracks all available extensions.

---

## 🚨 External Skills Check

Before "inventing" a solution, check Official Remotion Skills:

- `remotion-dev/three`
- `remotion-dev/audio`
- `remotion-dev/zod`

**Rule:** If Official Skill exists -> **REJECT** our custom implementation and recommend installing the official one.
