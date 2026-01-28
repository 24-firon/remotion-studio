# 🧠 Viron Unified Skill System: Master Map

This document acts as the technical entry point for the Viron Remotion ecosystem. It bridges the gap between high-level brand rules and low-level code patterns.

---

## 🛑 Viron Core: The Immutable Physics

> [!CAUTION]
> These rules define the fundamental behavior of our digital world. Deviations cause visual inconsistency and "uncanny valley" effects.

- **Theme & Design Tokens:** Defined in `guides/viron-button-guide.md` via the **Eye Candy Stack**.
- **Physics & 3D Laws:** We strictly use PBR materials and high-precision spring physics.
- **The Tech Stack:** Standardized on R3F v9 + Drei + CSM (Lamina is forbidden).

---

## 🧩 Technical Feature Specs

For detailed implementation logic, consult the dedicated modules:

| Module     | Purpose                         | Key Spec                                                                  |
| :--------- | :------------------------------ | :------------------------------------------------------------------------ |
| **Audio**  | FFT Analysis & Reactive Effects | [audio.md](file:///c:/Workspace/Repos/remotion-studio/specs/audio.md)     |
| **Camera** | Virtual Cinematography          | [camera.md](file:///c:/Workspace/Repos/remotion-studio/specs/camera.md)   |
| **Web**    | Headless Chrome Simulations     | [website.md](file:///c:/Workspace/Repos/remotion-studio/specs/website.md) |

---

## 📘 Optimized Standards (Guides)

Standards for how we build Remotion scenes to ensure performance and reliability.

- **[Composition Management](file:///c:/Workspace/Repos/remotion-studio/guides/compositions.md)**: Dynamic metadata and folder structures.
- **[Sequencing & Timing](file:///c:/Workspace/Repos/remotion-studio/guides/sequencing.md)**: Mandatory premounting and frame-sync patterns.

---

## 🛠️ Quick Start for Developers

- **Task: New 3D Material?** -> Check `guides/viron-button-guide.md`.
- **Task: Audio Sync?** -> Deep dive into `specs/audio.md`.
- **Task: Layouting?** -> Consult `guides/compositions.md`.

---

_Viron Infrastructure | specifications/v2.1_
