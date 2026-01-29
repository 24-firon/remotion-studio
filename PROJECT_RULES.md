# 💎 Viron Remotion Studio: Governance Hub

Welcome to the central authority of **Viron Remotion Studio**. This project is a high-end programmatic video engine designed for cinematic UIs and industrial aesthetics.

> [!IMPORTANT]
> **Documentation Hierarchy:**
> Viron-specific intelligence (Root folders) takes absolute precedence over generic global skills. If a specification exists in `/specs/`, it is the final law.

---

## 🏛️ Knowledge Ecosystem

We use a semantic four-pillar system to organize our intelligence. This ensures that every developer and AI agent finds exactly what they need without context overflow.

### ⚙️ [Specifications](file:///c:/Workspace/Repos/remotion-studio/specs/)

_The technical "What" and "Why"._  
Contains deterministic logic, FFT analysis pipelines, and virtual production standards.  
👉 **Start here:** [VIRON_SYSTEM_ENTRY.md](file:///c:/Workspace/Repos/remotion-studio/specs/VIRON_SYSTEM_ENTRY.md)

### 🧩 [Patterns](file:///c:/Workspace/Repos/remotion-studio/patterns/)

_The technical "How"._  
Concise, reusable code snippets and component architectural models. No theoretical fluff, just battle-tested code.

### 📖 [Guides](file:///c:/Workspace/Repos/remotion-studio/guides/)

_The Architectural Context._  
Long-form documentation on Tech-Stacks and brand standards.  
🔥 **Hot:** [Viron Button: Eye Candy Stack](file:///c:/Workspace/Repos/remotion-studio/guides/viron-button-guide.md)

### 🏛️ [The Vault](file:///c:/Workspace/Repos/remotion-studio/vault/)

_Innovation & Research._  
Experimental blueprints, market benchmarks, and future project ideas.

**Vault Structure:**

- `audio-sync/` – Audio synchronization strategies
- `benchmarks/` – Market references
- `fx-lab/` – Visual effects experiments
- `projects/` – Future project drafts

### 📄 [Documentation](file:///c:/Workspace/Repos/remotion-studio/docs/)

_Repository Intelligence._  
Contains the Manifesto, Human Guide, and Research Archives. **Always read this before architectural changes.**

- [`REPOSITORY_MANIFESTO.md`](file:///c:/Workspace/Repos/remotion-studio/docs/REPOSITORY_MANIFESTO.md) – The 4-Pillar Architecture
- [`HUMAN_OPERATOR_GUIDE.md`](file:///c:/Workspace/Repos/remotion-studio/docs/HUMAN_OPERATOR_GUIDE.md) – User interaction best practices
- [`RESEARCH_Semantic_Triggers.md`](file:///c:/Workspace/Repos/remotion-studio/docs/RESEARCH_Semantic_Triggers.md) – Agent triggering patterns

---

## 🛠️ Global Development Protocol

### 1. 📂 Knowledge Management

- **Lean Documentation:** Avoid documentation bloat.
  - For **Incremental Changes**: Add a brief note in the "Sync Log" section of the existing Spec/Guide or use `HISTORY_LOG.md`.
  - For **New Systems**: Use [TEMPLATE_FeatureSpec.md](file:///c:/Workspace/Repos/remotion-studio/guides/TEMPLATE_FeatureSpec.md).
- **Spec First:** Before coding a core feature, read the relevant spec.

### 2. 🚀 Git & Release Protocol

- **Knowledge-Audit (MANDATORY):** Before any commit, verify if `PROJECT_RULES.md`, specs, or `HISTORY_LOG.md` need updates.
- **Turn-Separation (PHYSICAL GATE):** Agents are **FORBIDDEN** from sending file edits and `git` commands in the same turn. Edits must be confirmed and on disk before a commit is proposed in a **subsequent** turn. This prevents race conditions in the IDE.
- **Atomic Release:** Code and docs must be bundled into a single commit.
- **Release Guard:** No task is complete without a confirmed push and synchronized documentation.

> [!TIP]
> Use the [AGENTS.md](file:///c:/Workspace/Repos/remotion-studio/.agent/AGENTS.md) navigation map if you are an AI assistant to quickly synchronize your context.

## 🏛️ 3-Phase Context Boot (MANDATORY)

To maintain peak performance within the 60k token window, every agent must initialize in this order:

1.  **PHASE 1: Identity (Boot-Size: ~10 KB)**
    Laden: `gemini.md`, `agency.md`, `git-safety.md`, `PROJECT_RULES.md`, `AGENTS.md`.
    _Zweck: Wer bin ich? Welche Gesetze gelten?_

2.  **PHASE 2: Technology (Core-Size: ~75 KB)**
    Laden: `viron-core/*.md`.
    _Zweck: Beherrschung der Viron Video Engine (Physik, PBR, Pipeline)._

3.  **PHASE 3: Target (Knowledge-Size: On-Demand)**
    Laden: Spezifische Dateien aus `/specs`, `/guides`, `/vault` basierend auf dem Task.
    _Zweck: Domänenwissen nur bei Bedarf laden._

---

## 🎬 Available Workflows

Execute these via slash-commands (e.g., `/release`):

- **`/release`** → [Semantic Release Protocol](file:///c:/Workspace/Repos/remotion-studio/.agent/workflows/release.md)
- **`/session-close`** → [Auto-Archive Session Logs](file:///c:/Workspace/Repos/remotion-studio/.agent/workflows/session-close.md)

---

_Viron Intelligence System | v4.2 (Governance Hardening)_
