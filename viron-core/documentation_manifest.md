# 📚 VIRON CORE DOCUMENTATION MANIFEST (v2.0)

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

### 🔵 Global Skills (Baseline)

| Module       | Location                                                               | Relation                                                 |
| :----------- | :--------------------------------------------------------------------- | :------------------------------------------------------- |
| **Remotion** | `~/.gemini/antigravity/global_skills/remotion-best-practices/SKILL.md` | **BASELINE.** Read first for general Remotion questions. |

---

## 🔗 RELATION TO GLOBAL SKILLS (Duplicate Check)

| Global Skill Module   | Viron Core Module | Relation                                                             |
| :-------------------- | :---------------- | :------------------------------------------------------------------- |
| `3d.md` (Basics)      | `physics.md`      | **Extension:** Viron adds PBR, Lighting Rules, and Material Systems. |
| `audio.md` (API)      | `specs/audio.md`  | **Extension:** Viron adds FFT-JSON-Pipeline and Reactivity.          |
| `tailwind.md` (Setup) | `theme.md`        | **Extension:** Viron adds Design Tokens, Theme.ts, and Config.       |

**Verdict:** No redundancy. Viron Core builds ON TOP of Global Skills.

---

## 🎯 SCENARIO ROUTING

**Scenario 1: "Fix a rendering crash"**
-> Load `troubleshooting.md` AND `pipeline.md`.

**Scenario 2: "Change the primary color"**
-> Load `theme.md`.
-> **DO NOT** load `tailwind.md` (Global), as Viron overrides it.

**Scenario 3: "Add a MacBook 3D model"**
-> Load `physics.md`.
-> **DO NOT** use generic Three.js primitives. Use `createMacBookGeometry()` from `physics.md`.

**Scenario 4: "Commit my changes"**
-> Load `workflow.md` to check Commit Convention.

---

## ⚠️ CRITICAL RULES

1.  **Read Manifest First:** Always check this table before loading files.
2.  **Lazy Load:** Only load the specific file needed for the task.
3.  **Viron > Global:** If `theme.md` says X and Global Skill says Y, **X wins.**

_Router v2.0 | Optimized for Agentic Workflow_
