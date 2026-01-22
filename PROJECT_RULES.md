# PROJECT RULES: REMOTION STUDIO

> Core Laws for Video Architecture & Agent Behavior

## 1. Environment & Infrastructure

- **OS**: Windows 11
- **Node**: v22.17.0 (Strict Version Lock)
- **Engine**: Remotion + FFmpeg 6.0+

## 2. Animation Physics (The "No-CSS" Law)

- **Global Ban**: CSS Transitions/Keyframes are FORBIDDEN for motion.
- **Mandate**: 100% usage of `spring()` mechanics and `interpolate()`.
- **Reasoning**: Deterministic rendering at 60FPS requires frame-based logic, not time-based logic.

## 3. Styling & Theming

- **Primary**: TailwindCSS (Utility-first).
- **Theme Source**: `src/my-lab/Theme.ts` acts as the single source of truth for colors/constants if not in Tailwind config.
- **Consistency**: No ad-hoc style objects unless driving dynamic interpolation.

## 4. Web-Safe Architecture

- **Component Portability**: All components must be compatible with `@remotion/player` for web embedding.
- **Node APIs**: No Node.js-only APIs (fs, path) inside rendering components. Use `staticFile()` or `public/` assets.
- **Sub-Component Isolation**: Sub-components must NEVER set a global/scene background. They must be transparent/compact to avoid occlusion issues.

## 5. Agent Protocol

- **Storyboard First**: Before generating video code, a Storyboard/Script dialog is MANDATORY.
- **Commit Policy**: Git commit required after every logical phase or significant feature completion.
- **Validation**: No silent failures. Check renderability.
