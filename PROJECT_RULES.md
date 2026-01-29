# 💎 Viron Remotion Studio: Governance Hub (v5.1)

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

### Layer 2: Projekt-Dokumentation (Viron Core)

**Pfad:** `viron-core/` (~77KB total)

| Datei                       | Inhalt                                    |
| --------------------------- | ----------------------------------------- |
| `documentation_manifest.md` | **DER ROUTER** – Index + Scenario-Trigger |
| `physics.md`                | R3F/Three.js für Video-Production         |
| `pipeline.md`               | Rendering (Local, Lambda, CI/CD)          |
| `theme.md`                  | Design Tokens & Tailwind                  |
| `troubleshooting.md`        | Debugging-Handbuch                        |
| `vision.md`                 | High-Level Architektur (Kurzfassung)      |
| `workflow.md`               | Entwickler-Workflow                       |

### Layer 2.5: The Viron Vision (Deep Dive)

**Pfad:** `public/remotion.md` (~30KB)

> **"The Viron Button Ecosystem Report 2026"**  
> Die "Bibel" des Projekts. Beschreibt die Hybrid-Pipeline (React + AI), Sora 2 Integration und die architektonische Vision.  
> **Wann lesen:** Nur bei fundamentalen Architektur-Entscheidungen.

### Layer 3: Strategien & Hard Rules

| Datei               | Pfad                                                                                                        | Inhalt                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **V43 Master Plan** | [`src/V43_MASTER_PLAN.md`](file:///c:/Workspace/Repos/remotion-studio/src/V43_MASTER_PLAN.md)               | "The Silver Armada" Strategie (12 Variationen) |
| **Lighting Rules**  | [`src/PROJECT_RULES_LIGHTING.md`](file:///c:/Workspace/Repos/remotion-studio/src/PROJECT_RULES_LIGHTING.md) | "The 80% Grey Rule", Drift-Pflicht             |
| **Learnings**       | `src/learnings/*.md`                                                                                        | Shader-Rezepte, Viron-Gesetze                  |

### Layer 4: Implementation Pillars (On-Demand)

| Pillar       | Pfad         | Inhalt                                |
| ------------ | ------------ | ------------------------------------- |
| **Specs**    | `/specs/`    | Audio, Camera, Website Specifications |
| **Patterns** | `/patterns/` | BarChart, Typewriter, etc.            |
| **Guides**   | `/guides/`   | Compositions, Sequencing              |
| **Vault**    | `/vault/`    | Experiments, Benchmarks, Ideas        |
| **Docs**     | `/docs/`     | Repository Manifesto, Human Guide     |

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
| **4: On-Demand** | Alles andere (Vision, V43 Plan, Specs) | ~50K verfügbar |

---

## 🎬 Available Workflows

- **`/release`** → [Semantic Release Protocol](file:///c:/Workspace/Repos/remotion-studio/.agent/workflows/release.md)
- **`/session-close`** → [Auto-Archive Session Logs](file:///c:/Workspace/Repos/remotion-studio/.agent/workflows/session-close.md)
- **`/audit`** → [Visual Audit](file:///c:/Workspace/Repos/remotion-studio/.agent/workflows/audit.md)

---

_Viron Intelligence System | v5.1 (Integrated "Hidden Gems") | 2026-01-29_
