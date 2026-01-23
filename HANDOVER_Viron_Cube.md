# HANDOVER: VIRON LOGO CUBE (SUB-AGENT TASK)

**Status:** PENDING
**Project Scope:** `c:/Workspace/Repos/remotion-studio`
**Location:** `src/experiments/cube-v1/`

## 🎯 The Mission

Create a rotating 3D Cube that showcases the Viron Logo as a branding element.

## 🛑 MANDATORY RULES (The "Laws")

1.  **Read Skills First**: `view_file .agent/skills/remotion-best-practices/SKILL.md`
2.  **No Hacks**: Do not use manual lights. Use `<Environment preset="studio" />`.
3.  **Geometry**: Use `BoxGeometry` (Standard Three.js).
4.  **Files**: Create a new isolated folder `src/experiments/cube-v1`.

## 🛠️ The Specs

- **Object**: A perfect Cube.
- **Texture Mapping**:
  - **Sides (4x)**: The "Viron Logo" (from `public/assets/logo.png`).
  - **Top/Bottom**: BLANK (or pure metallic material). _Hint: Use an array of 6 materials._
- **Animation**:
  - Infinite rotation on Y-axis (or X/Y combo).
  - Use `useCurrentFrame` and `interpolate` (Loop duration: ~300 frames).
- **Background**: Transparent (alpha: true in Canvas).

## 🗣️ Communication Protocol

- Read the Skill System.
- Show me the Plan (Concept).
- Wait for "Go".
