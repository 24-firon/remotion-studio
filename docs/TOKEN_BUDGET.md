# 🪙 TOKEN ECONOMICS & CONTEXT STRATEGY (v1.0)

**Governance Class:** ARCHITECTURAL LAW
**Hard Limit:** 200,000 Tokens (System Context)
**Agent Target:** ~50,000 Tokens (Operational Sweet Spot)

---

## 1. THE PHILOSOPHY: "CONTEXT IS CURRENCY"

We do not optimize for "smallest context". We optimize for **"Highest Understanding per Token"**.

- **Don't Starve the Brain:** Complex topics (3D, Audio, Physics) _require_ extensive explanation. Cutting them short leads to hallucinations.
- **Don't Feed the Junk:** Boilerplate, generic React patterns, and redundant logs are waste.

## 2. ACCOUNTING STANDARDS

### The "Supervisor" (You)

- **Max Cap:** 200,000 Tokens.
- **Danger Zone:** > 180,000 Tokens (Performance degrades, "Lazy" behavior starts).
- **Strategy:** If you approach the limit, you MUST unload Phase 4 (Lazy Load) modules.

### The "Task Agent" (Sub-Process)

- **Target:** 50,000 Tokens.
- **Why?** Faster inference, higher focus, lower cost.
- **Strategy:** When generating a `TASK_PROMPT.md` for a sub-agent, only include the _specific_ slices of knowledge they need (e.g., only `specs/audio.md` + `guides/sequencing.md`, not the whole repo).

## 3. CONTENT SIZING TIERS (Investment Strategy)

When writing or consolidating documentation, apply these tiers:

| Tier       | Type            | Token Budget         | Examples                              | Strategy                                                                                                                                            |
| :--------- | :-------------- | :------------------- | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TIER 1** | **CORE DOMAIN** | **High** (10k - 20k) | `physics.md`, `specs/audio.md`        | **MAXIMUM DETAIL.** Do not summarize. Explain the "Why" and "How". These are the high-risk/high-reward areas. Only deep context prevents bugs here. |
| **TIER 2** | **GUIDES**      | **Medium** (2k - 5k) | `guides/sequencing.md`, `theme.md`    | **OPERATIONAL.** Show patterns and approved implementations. Use examples.                                                                          |
| **TIER 3** | **REFERENCE**   | **Low** (< 1k)       | `specs/website.md`, `specs/camera.md` | **FACTUAL.** Just the numbers/specs. No prose.                                                                                                      |
| **TIER 4** | **LOGS/LISTS**  | **Micro** (< 500)    | `HISTORY.md`, `manifests`             | **POINTERS.** Lists of links. Never embedded content.                                                                                               |

## 4. INCOMING DATA PROTOCOL

**Scenario:** User provides "New Research Data" (e.g., extensive shader studies).

1.  **Triaging:** Does this belong in Tier 1 (Core) or Tier 2?
2.  **Integration:**
    - **IF** it enhances a Tier 1 topic (e.g., Audio): **MERGE IT FULLY.** We _want_ that 15k token file if it makes the agent a master of Audio.
    - **IF** it is niche: **SUMMARIZE** into a Tier 2 guide.
    - **IF** it is redundant: **DISCARD**.

## 5. THE "LAZY LOADING" RULE

Even if we have perfectly sized files, we **NEVER** load everything at once.

- **Bad:** Reading `src/learnings/` recursively at boot.
- **Good:** Reading `documentation_manifest.md` at boot, and loading `src/learnings/PATTERN_Advanced_Shaders.md` _only_ when the user asks for a shader.

---

**Summary:**
Spend your 200k budget on what matters (3D & Audio). Save on everything else.
