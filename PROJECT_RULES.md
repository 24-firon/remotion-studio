# 💎 Viron Remotion Studio: Governance Hub (v5.0)

Welcome to the central authority of **Viron Remotion Studio**. This project is a high-end programmatic video engine designed for cinematic UIs and industrial aesthetics.

> [!IMPORTANT]
> **Bootloader:** Starte bei [`.agent/boot/INIT_MISSION.md`](file:///c:/Workspace/Repos/remotion-studio/.agent/boot/INIT_MISSION.md)  
> **Baseline:** Globaler Skill [`remotion-best-practices`](file:///~/.gemini/antigravity/global_skills/remotion-best-practices/)  
> **Router:** [`viron-core/documentation_manifest.md`](file:///c:/Workspace/Repos/remotion-studio/viron-core/documentation_manifest.md)

---

## 🏛️ Unified Knowledge Architecture

### Layer 1: Globale Baseline (~26 Rules)

**Pfad:** `~/.gemini/antigravity/global_skills/remotion-best-practices/`

Die universelle Remotion-Wissensbasis. Gilt für ALLE Remotion-Projekte.

### Layer 2: Projekt-Dokumentation (~77KB)

**Pfad:** `viron-core/`

| Datei                       | Größe  | Inhalt                                    |
| --------------------------- | ------ | ----------------------------------------- |
| `documentation_manifest.md` | 10.7KB | **DER ROUTER** – Index + Scenario-Trigger |
| `physics.md`                | 11.5KB | R3F/Three.js für Video-Production         |
| `pipeline.md`               | 12.9KB | Rendering (Local, Lambda, CI/CD)          |
| `theme.md`                  | 12.1KB | Design Tokens & Tailwind                  |
| `troubleshooting.md`        | 13.5KB | Debugging-Handbuch                        |
| `vision.md`                 | 6.0KB  | High-Level Architektur                    |
| `workflow.md`               | 10.4KB | Entwickler-Workflow                       |

### Layer 3: Gelernte Patterns (~15KB)

**Pfad:** `src/learnings/`

| Datei                                 | Inhalt                                            |
| ------------------------------------- | ------------------------------------------------- |
| `GUIDE_Viron_Button_Stack.md`         | 4-Layer Architektur (Backdrop→Glass→Effects→Post) |
| `PATTERN_Advanced_Shaders.md`         | Iridescent Glass Shader (CSM/GLSL)                |
| `PATTERN_LIGHTING_GRADIENTS.md`       | 80% Grey Rule, Drift-Pflicht                      |
| `PATTERN_Viron_Hard_Won_Knowledge.md` | 7 Gesetze aus V1-V45                              |
| `RESOURCES_AND_ECOSYSTEM.md`          | R3F Holy Trinity, AI Tools, Asset Sources         |

### Layer 4: Knowledge Pillars (On-Demand)

| Pillar       | Pfad         | Inhalt                                |
| ------------ | ------------ | ------------------------------------- |
| **Specs**    | `/specs/`    | Audio, Camera, Website Specifications |
| **Patterns** | `/patterns/` | BarChart, Typewriter, etc.            |
| **Guides**   | `/guides/`   | Compositions, Sequencing              |
| **Vault**    | `/vault/`    | Experiments, Benchmarks, Ideas        |
| **Docs**     | `/docs/`     | Manifesto, Research, Human Guide      |

---

## 🛠️ Global Development Protocol

### 1. 📂 Knowledge Management

- **Baseline vs. Projekt:** Globaler Skill = universell, viron-core = Viron-spezifisch
- **Keine Duplikate:** Wenn es im globalen Skill steht, steht es NICHT nochmal hier
- **Spec First:** Vor dem Coden, relevante Spec lesen

### 2. 🚀 Git & Release Protocol

- **Turn-Separation:** Edits und `git` NIEMALS im selben Turn
- **Atomic Release:** Code und Docs in einem Commit
- **Knowledge-Audit:** Vor dem Commit prüfen, ob Docs Updates brauchen

> [!TIP]
> Nutze `/release` für den vollständigen Release-Workflow.

---

## 🏛️ 3-Phase Context Boot (MANDATORY)

Referenz: [`.agent/boot/INIT_MISSION.md`](file:///c:/Workspace/Repos/remotion-studio/.agent/boot/INIT_MISSION.md)

| Phase            | Was                                    | Token          |
| ---------------- | -------------------------------------- | -------------- |
| **1: Identität** | gemini.md, agency.md, PROJECT_RULES.md | ~3K            |
| **2: Baseline**  | Global Skill Index (SKILL.md)          | ~1K            |
| **3: Router**    | viron-core/documentation_manifest.md   | ~2.7K          |
| **4: On-Demand** | Alles andere nach Bedarf               | ~50K verfügbar |

---

## 🎬 Available Workflows

- **`/release`** → [Semantic Release Protocol](file:///c:/Workspace/Repos/remotion-studio/.agent/workflows/release.md)
- **`/session-close`** → [Auto-Archive Session Logs](file:///c:/Workspace/Repos/remotion-studio/.agent/workflows/session-close.md)
- **`/audit`** → [Visual Audit](file:///c:/Workspace/Repos/remotion-studio/.agent/workflows/audit.md)

---

_Viron Intelligence System | v5.0 (Unified Init Path) | 2026-01-29_
