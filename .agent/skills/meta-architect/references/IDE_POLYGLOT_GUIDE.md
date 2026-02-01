# IDE Polyglot Conversion Guide v3.0 (Comprehensive Edition)

This document serves as the authoritative reference for converting Agent Skills between all major AI IDE ecosystems (Google Antigravity, GitHub Copilot, Claude Code, Cursor AI, OpenAI Codex). It addresses file structures, execution models, concurrency safety, and semantic routing differences.

## 1. Ecosystem Deep Dive

### A. Google Antigravity & GitHub Copilot (The "Standard")

**Synergy Level:** 100% Compatible.
Both ecosystems have converged on the exact same directory-based structure.

- **Root:** `.agent/skills/<name>/` (AG) or `.github/skills/<name>/` (Copilot).
- **Core:** `SKILL.md` containing YAML Frontmatter + Markdown Body.
- **Routing:** `match_patterns` (AG) vs Implicit Semantic Matching (Copilot).
- **Tooling:** Both support `scripts/` execution via native terminals.
- **Context:** Multi-threaded, highly parallel execution environment.
- **Compatibility:** 100%. Copy folder as-is. Only change: rename folder to kebab-case if needed.

### B. Claude Code (The "XML Variant")

**Synergy Level:** High (with structural translation).

- **Root:** `~/.claude/skills/<name>/` or Project-local `.claude/skills/`.
- **Core:** `CLAUDE.md`.
- **Syntax:** Often uses XML (`<trigger>`, `<description>`) mixed with Markdown, or YAML.
- **Critical Difference:** Claude Code is a CLI-based, single-threaded loop. Antigravity is a multi-agent IDE.
- **Risk Level:** HIGH. Scripts in Claude skills often assume they are the ONLY process running (e.g., `git checkout branch`). In Antigravity, this causes race conditions.
- **Compatibility:** 70%. Requires frontmatter transpilation and parallel-safety audit.

### C. Cursor AI (The "Flat Context")

**Synergy Level:** Low (requires architectural reconstruction).

- **Root:** `.cursor/rules/` or root `.cursorrules`.
- **Core:** `.mdc` files or single text blocks.
- **Syntax:** Zero-Structure (Pure Text) or Glob-Pattern headers.
- **Deficit:** No native concept of "Tools" (executable scripts) or "References" (lazy-loaded docs). Everything is eager-loaded into context.
- **Context Cost:** Massive. A 1000-line Cursor rule wastes tokens every time.
- **Compatibility:** 30%. Requires "De-Flattening" (architectural reconstruction).

### D. OpenAI Codex (The "Emerging Standard")

**Synergy Level:** High (identical to Antigravity).

- **Root:** `~/.codex/skills/` or Project-local `.codex/skills/`.
- **Core:** `SKILL.md` (YAML Frontmatter).
- **Routing:** Metadata-driven (similar to `match_patterns`).
- **Compatibility:** 90%. Near-identical to Antigravity. Requires only folder path renaming.

### E. Gemini CLI (The "Agent-Decisive")

**Synergy Level:** Medium.

- **Root:** `.gemini/skills/` or `~/.gemini/skills/`.
- **Core:** `SKILL.md` (YAML Frontmatter).
- **Routing:** Agent decides when to use skill based on semantic understanding (no explicit triggers).
- **Compatibility:** 80%. File format identical, but routing semantics differ. Skills may not activate as expected.

---

## 2. Detailed Conversion Logic (Step-by-Step)

### Scenario A: GitHub Copilot → Antigravity

**Strategy:** Direct Port (Minimal Intervention).
**Risk Level:** None.

**Steps:**

1. **Source Identification:** Folder contains `SKILL.md` with YAML.
2. **Action 1 (Copy):** Copy entire folder `.github/skills/<name>/` to `.agent/skills/<name>/`.
3. **Action 2 (Validation):** Check if `match_patterns` key exists in YAML. If Copilot used a different key (like `triggers` or semantic inference), rename it to `match_patterns`.
4. **Action 3 (Tooling):** Verify `scripts/` have executable permissions (`chmod +x`).
5. **Completion:** No further modifications needed.

**Testing:** Reload window. Skill should activate on first keyword match.

---

### Scenario B: Claude Code → Antigravity

**Strategy:** XML Sanitization, Rename, Parallel Safety Audit.
**Risk Level:** High (State Modification).

**Steps:**

1. **Source Identification:** File is named `CLAUDE.md` OR located in `.claude/skills/`.
2. **Action 1 (Rename):** Rename `CLAUDE.md` to `SKILL.md`.
3. **Action 2 (Frontmatter Transpilation):**
   - **IF Frontmatter is XML:**
     - Parse `<name>Val</name>` → YAML `name: Val`
     - Parse `<description>Val</description>` → YAML `description: Val`
     - Parse `<triggers><item>A</item><item>B</item></triggers>` → YAML `match_patterns: ["A", "B"]`
     - **CRITICAL:** Remove ALL XML tags from the file to prevent parser confusion.
   - **IF Frontmatter is YAML:**
     - Keep `name:` and `description:` unchanged.
     - Rename `triggers:` to `match_patterns:`.
4. **Action 3 (Parallel Safety Audit):**
   - Scan body for dangerous keywords: `git checkout`, `git reset`, `git switch`, `npm install`, `yarn install`, `rm`, `mv`, `cp -r`, `chmod 777`, `sudo`.
   - IF found: Inject a warning block at the top of Markdown body:
     ```
     > ⚠️ **CONCURRENCY WARNING**: This skill modifies global state (checked-out branch, installed dependencies, etc.). In Antigravity's multi-threaded environment, running this skill in parallel with other agents may cause race conditions or data loss. **Recommendation:** Wrap execution in a mutex lock or disable parallel execution for this skill.
     ```
   - Document the risk in the `description` field as well.
5. **Completion:** Test in single-agent mode first before enabling parallel execution.

---

### Scenario C: Cursor (.mdc) → Antigravity

**Strategy:** The "De-Flattener" (Architectural Upgrade).
**Risk Level:** Medium (Loss of Context during refactoring).

**Steps:**

1. **Source Identification:** File ends in `.mdc` or is `.cursorrules`.
2. **Action 1 (Metadata Extraction):**
   - Read the first 100 lines. Look for natural language description of purpose.
   - Infer a `name` (kebab-case). Example: "Next.js Expert" → `nextjs-expert`.
   - Infer a `description` (one sentence). Example: "Provides best practices and patterns for Next.js 16 development."
   - Identify file glob patterns (if present): `globs: *.tsx, *.ts` → Convert to `match_patterns: ["typescript file", "react component", ".tsx"]`.
3. **Action 2 (Structural Explosion - The De-Flattening):**
   - **Concept:** Cursor rules are often 500-2000 lines of mixed knowledge. This is bad for Antigravity (wastes tokens, confuses routing).
   - **Heuristic:** Look for H2 Headers (`##`) or clear topic boundaries.
   - **Categories to Extract:**
     - `## Tech Stack` or `## Best Practices` → `references/best_practices.md`
     - `## Security` → `references/security.md`
     - `## Examples` → `examples/patterns.md`
     - `## Tools / Commands` → `scripts/helpers.sh` (create placeholder for user to implement)
   - **Linking:** In `SKILL.md`, replace extracted text with links:
     ```
     For detailed tech stack guidance, see `references/best_practices.md`.
     For security considerations, see `references/security.md`.
     ```
4. **Action 3 (Tool Reconstruction):**
   - If text mentions "Always run the formatter" or "Execute linter", CREATE a placeholder script in `scripts/format.sh` or `scripts/lint.sh`.
   - Instruct user: "Implement this script to automate the workflow described above."
5. **Action 4 (Validation):**
   - Verify that main `SKILL.md` is now < 200 lines.
   - Verify all referenced files in `references/` exist.
6. **Completion:** Result should be modular, not monolithic.

---

### Scenario D: OpenAI Codex → Antigravity

**Strategy:** Direct Port (Folder Renaming Only).
**Risk Level:** None.

**Steps:**

1. **Source Identification:** Folder contains `SKILL.md` with YAML in `~/.codex/skills/`.
2. **Action 1 (Copy & Rename):** Copy folder from `~/.codex/skills/<name>/` to `.agent/skills/<name>/`.
3. **Action 2 (Validation):** Verify YAML keys match Antigravity spec (`name`, `description`, `match_patterns`).
4. **Completion:** No further modifications needed.

---

### Scenario E: Gemini CLI → Antigravity

**Strategy:** Format Copy + Routing Documentation.
**Risk Level:** Low (Routing mismatch possible).

**Steps:**

1. **Source Identification:** Folder contains `SKILL.md` in `.gemini/skills/`.
2. **Action 1 (Copy):** Copy folder to `.agent/skills/<name>/`.
3. **Action 2 (Document Routing Difference):** Add note in `description`:
   ```
   Note: Originally designed for Gemini CLI (agent-decides routing). In Antigravity, activation depends on explicit `match_patterns` match. Adjust patterns if skill doesn't activate as expected.
   ```
4. **Completion:** Test and adjust `match_patterns` if needed.

---

## 3. Universal Folder Structure (Target Standard)

No matter the source, the output MUST strictly adhere to this Antigravity Standard:

```text
.agent/skills/<kebab-name>/
├── SKILL.md                  # The brain (YAML Frontmatter + Instructions)
├── references/               # Static Knowledge (Lazy loaded by agent)
│   ├── best_practices.md
│   ├── security.md
│   ├── api_guide.md
│   └── tech_stack.md
├── examples/                 # Few-Shot Learning (Strict Format Examples)
│   ├── good_code.md
│   ├── input_output_pairs.md
│   └── common_patterns.md
└── scripts/                  # Executable Tools (Sandboxed, Auto-discoverable)
    ├── helper.py
    ├── validator.sh
    └── formatter.js
```

**Key Principles:**

- **SKILL.md MUST exist.** It's the only file Antigravity indexes at startup.
- **SKILL.md MUST be < 300 lines.** Anything larger should be split into references.
- **All relative paths** (e.g., `references/api.md`) must be exact matches of actual filenames.
- **Scripts must be executable.** Antigravity checks `+x` bit before execution.

---

## 4. Quality Assurance Checklist (The "Gatekeeper")

Before finalizing ANY conversion, the Agent MUST verify:

1. **Filename Integrity:**
   - Main file is named `SKILL.md`? (CRITICAL. Antigravity ignores everything else).
   - All supporting files exist and are referenced?

2. **YAML Validity:**
   - Frontmatter parses without errors?
   - No unescaped colons in values?
   - Proper indentation (2 spaces, not tabs)?

3. **Router Configuration:**
   - Does `match_patterns` exist in YAML?
   - Does it contain at least 2 distinct phrases (e.g., `["create skill", "scaffold skill"]`)?
   - Are patterns specific enough (not generic like "help")?

4. **Reference Links:**
   - Do links to `references/` match actual filenames?
   - Are paths relative (e.g., `references/api.md`, not `/references/api.md` or `~/.agent/...`)?

5. **Atomic Principle:**
   - For Cursor imports: Did we break down the monolith into at least 1 main file + 2 reference files?
   - Is no single file > 300 lines?

6. **Safety Flag:**
   - Did we audit for `git checkout` / `rm -rf` / race condition risks?
   - If found, is a concurrency warning present?

7. **Relative Path Verification:**
   - If body contains `Read references/security.md`, does `references/security.md` exist?
   - If body contains `Execute scripts/helper.py`, does `scripts/helper.py` exist?

8. **Test Execution:**
   - Is YAML syntax valid? (Run YAML parser).
   - Does Antigravity recognize the skill? (Reload window, check match_patterns).

**Failure Mode:** If any check fails, RETURN to the conversion phase and FIX immediately. Do not ask for user permission.

---

## 5. Error Scenarios & Solutions

### Scenario A: Skill references `~/.claude/skills/other-skill`

**Problem:** Path is Claude-specific and absolute. Antigravity won't find it.
**Solution:** Change to relative path: `.agent/skills/other-skill`. Or better: extract the shared knowledge into `references/` instead of cross-referencing skills.

### Scenario B: Skill uses `<trigger>` XML tags in Frontmatter

**Problem:** Antigravity parses only YAML. XML tags cause silent failures (skill ignored).
**Solution:** Strip XML, convert to YAML `match_patterns`. Example:

```
<trigger>format code</trigger>
→
match_patterns: ["format code"]
```

### Scenario C: Skill description says "This skill is single-threaded"

**Problem:** Antigravity runs multiple skills in parallel by default. State-modifying operations conflict.
**Solution:** Add concurrency warning to description and body. Recommend user to set execution policy to "Sequential" if needed.

### Scenario D: Cursor rule is 1500 lines, mostly documentation

**Problem:** Antigravity loads entire skill into context on every match, wasting tokens.
**Solution:** De-flatten aggressively. Move 1000 lines of doc to `references/`, keep only 300 lines in `SKILL.md` with links to references.

### Scenario E: Imported skill activates on every prompt (too broad match_patterns)

**Problem:** `match_patterns: ["code"]` matches almost everything, causing unnecessary skill activation.
**Solution:** Tighten patterns to specific domain: `match_patterns: ["next.js", "react component", "typescript"]`.

---

## 6. The Centralized Skill Hub (Project Standards)

To manage multi-IDE skills within a single repository, use the following hub structure for staging:

```text
.agent/skills/meta-architect/hub/
├── antigravity/    # -> .agent/skills/             (Project) or ~/.gemini/antigravity/skills/ (Global)
├── claude/         # -> .claude/skills/             (Project) or ~/.claude/skills/             (Global)
├── cursor/         # -> .cursor/rules/              (Project) or ~/.cursor/rules/              (Global)
└── copilot/        # -> .github/skills/             (Project) or ~/.copilot/skills/             (Global)
```

### Destination Mapping Table

| IDE Target      | Project-Local Directory  | Global (System-Wide) Directory  | File Format          |
| :-------------- | :----------------------- | :------------------------------ | :------------------- |
| **Antigravity** | `.agent/skills/<name>/`  | `~/.gemini/antigravity/skills/` | `SKILL.md` (YAML)    |
| **Claude Code** | `.claude/skills/<name>/` | `~/.claude/skills/`             | `CLAUDE.md` (XML/MD) |
| **Cursor AI**   | `.cursor/rules/`         | `~/.cursor/rules/` (Legacy)     | `<name>.mdc`         |
| **Copilot**     | `.github/skills/<name>/` | `~/.copilot/skills/`            | `SKILL.md` (YAML)    |

---

## 7. Validation Command (For Agent)

After every conversion, run this validation checklist:

```
1. Is SKILL.md valid YAML?
   → Command: Try parsing the Frontmatter. If error, FIX.

2. Do all match_patterns exist?
   → Check: At least 2-3 triggers present? Too generic?

3. Are all relative paths correct?
   → Check: Does `references/` folder exist? Do all referenced files exist?

4. Is body content preserved?
   → Check: Compare source vs output. Content should be identical or intentionally refactored (de-flattened).

5. Is the file executable?
   → For scripts: `chmod +x scripts/*.sh` / `chmod +x scripts/*.py`.

6. Does skill activate?
   → Manual test: Reload window. Trigger a match_patterns keyword. Does skill appear?
```

**If all pass:** ✅ Conversion complete. Ready for deployment.
**If any fail:** 🔴 Return to conversion phase and fix. Re-run validation.

---

## 7. Advanced: Cross-IDE Interoperability Matrix

This table summarizes which conversions are safe and which require caution.

| From               | To          | Compatibility | Risk   | Time      | Notes                                                             |
| ------------------ | ----------- | ------------- | ------ | --------- | ----------------------------------------------------------------- |
| **GitHub Copilot** | Antigravity | 100%          | None   | < 1 min   | Direct copy. No changes needed.                                   |
| **Claude Code**    | Antigravity | 70%           | High   | 5-10 min  | Requires XML→YAML + parallel audit.                               |
| **Cursor**         | Antigravity | 30%           | High   | 15-30 min | Requires de-flattening + reconstruction.                          |
| **OpenAI Codex**   | Antigravity | 90%           | None   | < 1 min   | Folder rename only.                                               |
| **Gemini CLI**     | Antigravity | 80%           | Low    | < 1 min   | Copy + document routing differences.                              |
| **Antigravity**    | Claude Code | 70%           | Medium | 5-10 min  | Reverse: YAML→XML possible but rarely needed.                     |
| **Antigravity**    | Cursor      | 50%           | High   | 10-20 min | Requires flattening (opposite of de-flattening). Not recommended. |

---

## 8. End-to-End Workflow Example: Claude Code → Antigravity

**Input:** User has `.claude/skills/nextjs-expert/CLAUDE.md`

**Process:**

1. Identify: CLAUDE.md found. This is Claude Code format.
2. Frontmatter analysis: XML `<triggers>` tag present. Requires transpilation.
3. Body scan: "git checkout develop" found. Concurrency risk detected.
4. Rename: `CLAUDE.md` → `SKILL.md`.
5. Transpile: Extract `<triggers>["nextjs", "react"]</triggers>` → YAML `match_patterns: ["next.js", "react component"]`.
6. De-flatten: Extract 200 lines of "Best Practices" → `references/best_practices.md`.
7. Warn: Add concurrency warning to description.
8. Verify: YAML valid? Paths correct? match_patterns specific?
9. Result: `.agent/skills/nextjs-expert/` with modular structure and safety warnings.
