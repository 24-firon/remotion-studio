---
name: remotion-best-practices
description: The Unified Knowledge Base for Viron Remotion Studio. Combines Project Specs and Generic Skills.
metadata:
  tags: remotion, viron, architecture, standards, theme
---

# 🧠 VIRON UNIFIED SKILL SYSTEM

> **CRITICAL PROTOCOL:**
> This file is the **Single Point of Entry**.
> You must strictly follow the **Priority Order** below.
> **VIRON CORE** rules always override **GENERIC** patterns.

---

## 🛑 VIRON CORE (MANDATORY AUTHORITY)

**Context:** These files define the _Immutable Physics_, _Design Laws_, and _Infrastructure_ of this specific project.
**Rule:** If you are coding, designing, or rendering, you **MUST** consult the relevant Core file first.

- **[rules/viron-core/theme.md](Theme & Design Tokens)** - **THE LAW.** Colors, Typography, Spacing. No magic numbers.
- **[rules/viron-core/physics.md](Physics & 3D Laws)** - R3F usage, PBR materials, `RoundedBox` geometry mandate.
- **[rules/viron-core/pipeline.md](Rendering Pipeline)** - Codec specs, Concurrency rules, folder structure.
- **[rules/viron-core/workflow.md](Workflow Standards)** - Git conventions, Linting, Testing.
- **[rules/viron-core/troubleshooting.md](Troubleshooting)** - Known issues and fixes.
- **[rules/viron-core/vision.md](Project Vision)** - The high-level concept.

---

## 🧩 FEATURE MODULES (ON-DEMAND)

**Context:** Specialized capabilities. Read only if the user request involves these specific domains.

- **[rules/modules/camera.md](Cinematography)** - Camera moves, OrbitControls, Focus tracking.
- **[rules/modules/website.md](Website Simulation)** - Headless Chrome, Browser Frames, Dashboards.
- **[rules/modules/audio.md](Audio Reactive)** - FFT Analysis, Sync, beat-matching.

---

## 📘 GENERIC REMOTION SKILLS (FALLBACK)

**Context:** General "How-To" for Remotion. Use these for syntax reference _unless_ Viron Core says otherwise.

- **Assets**: [rules/generic/assets.md](Importing images/video) | [rules/generic/images.md](Img component)
- **3D Basics**: [rules/generic/3d.md](Generic Three.js setup) _(Note: Check `viron-core/physics.md` first)_
- **Audio Basics**: [rules/generic/audio.md](Basic Audio playback)
- **Animation**: [rules/generic/animations.md](Interpolate/Spring basics)
- **Metadata**: [rules/generic/calculate-metadata.md](Dynamic sizing)
- **Text**: [rules/generic/measuring-text.md](Text layout)
- **Transitions**: [rules/generic/transitions.md](Scene transitions)

---

## 🛠️ QUICK ACTION INDEX

- **Adding Assets?** -> Read `rules/generic/assets.md` (Force `staticFile`)
- **New Component?** -> Check `rules/viron-core/theme.md` (Colors)
- **Rendering?** -> Check `rules/viron-core/pipeline.md` (Config)
- **Glitchy Lines?** -> Check `rules/viron-core/physics.md` (RoundedBox fix)
