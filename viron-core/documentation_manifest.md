# 📚 VIRON CORE DOCUMENTATION MANIFEST (v5.0)

**Status:** ACTIVE ROUTER
**Scope:** Viron Specific Implementation Details

---

## 🧭 KNOWLEDGE ROUTER

This manifest routes you to the correct knowledge source based on your task.

### 🔴 Core Modules (Viron Specifics)

| Module           | File                        | Size  | Trigger Context                                             |
| :--------------- | :-------------------------- | :---- | :---------------------------------------------------------- |
| **Router**       | `documentation_manifest.md` | ~1KB  | **ALWAYS** (You are here)                                   |
| **3D & Physics** | `physics.md`                | ~12KB | Task involves Three.js, R3F, PBR Materials, Device Geometry |
| **Pipeline**     | `pipeline.md`               | ~13KB | Task involves Rendering, CI/CD, Lambda, Codecs              |
| **Theme**        | `theme.md`                  | ~12KB | Task involves Colors, Typography, Tokens, Tailwind          |
| **Debug**        | `troubleshooting.md`        | ~14KB | Task involves Errors, Crashes, Memory Leaks                 |
| **Workflow**     | `workflow.md`               | ~10KB | Task involves Git, Commits, VS Code, Linting                |
| **Vision**       | `vision.md`                 | ~6KB  | Task involves Long-term Strategy, Ecosystem                 |

### 🟠 Extended Knowledge (Deep Levels)

| Level        | Directory        | Content Description                                         |
| :----------- | :--------------- | :---------------------------------------------------------- |
| **Specs**    | `specs/`         | System Entry, Audio Pipeline, Camera Specs, Website Meta    |
| **Guides**   | `guides/`        | Feature Implementation, Sequencing, Composition Guides      |
| **Registry** | `docs/`          | Manifests, Human Guide, Semantic Triggers, **Token Budget** |
| **Lessons**  | `src/learnings/` | Shader Patterns, Hard-won knowledge, Viron Button Stack     |
| **Assets**   | `vault/`         | Benchmarks, Large JSON files, Asset metadata                |
| **UI**       | `patterns/`      | Visual UI Patterns, Component variations                    |

### 🔵 Global Skills (Baseline)

| Module       | Location                                                               | Relation                                                 |
| :----------- | :--------------------------------------------------------------------- | :------------------------------------------------------- |
| **Remotion** | `~/.gemini/antigravity/global_skills/remotion-best-practices/SKILL.md` | **BASELINE.** Read first for general Remotion questions. |

---

## 🔗 RELATION TO GLOBAL SKILLS (Duplicate Check)

| Global Skill Module   | Project Knowledge | Relation                                                             |
| :-------------------- | :---------------- | :------------------------------------------------------------------- |
| `3d.md` (Basics)      | `physics.md`      | **Extension:** Viron adds PBR, Lighting Rules, and Material Systems. |
| `audio.md` (API)      | `specs/audio.md`  | **Extension:** Viron adds FFT-JSON-Pipeline and Reactivity.          |
| `tailwind.md` (Setup) | `theme.md`        | **Extension:** Viron adds Design Tokens, Theme.ts, and Config.       |

**Verdict:** No redundancy. Project Knowledge builds ON TOP of Global Skills.

---

## 🎯 SCENARIO ROUTING

**Scenario 1: "Configure Audio"**
-> Load `specs/audio.md` AND `src/learnings/RESOURCES_AND_ECOSYSTEM.md`.

**Scenario 2: "New UI Flow"**
-> Load `guides/sequencing.md` AND `patterns/`.

**Scenario 3: "Repository Governance"**
-> Load `docs/REPOSITORY_MANIFESTO.md`.

---

## ⚠️ CRITICAL RULES

1.  **Read Manifest First:** Always check this table before loading files.
2.  **Lazy Load:** Only load the specific file needed for the task.
3.  **Viron > Global:** If `theme.md` says X and Global Skill says Y, **X wins.**

_Router v5.0 | Optimized for Agentic Workflow_
