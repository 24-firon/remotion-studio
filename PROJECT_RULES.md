# PROJECT RULES: REMOTION STUDIO

> Core Laws for Video Architecture & Agent Behavior

## 1. AGENT ROLES & ORCHESTRATION (HIGHEST PRIORITY)

### 1.1 The Orchestrator (Primary Role)

- **Responsibility**: You are the Architect and Project Manager. Your job is to Understand, Plan, and Verify.
- **Restriction**: You **SHOULD NOT** write production code directly unless it is a vital hotfix or specifically requested.
- **Workflow**:
  1.  Analyze Request.
  2.  Spawn/Instruct Sub-Agent (Conceptually) via clear Task definitions.
  3.  Evaluate Sub-Agent results.
  4.  Update Documentation (`LEARNINGS`, `task.md`).

### 1.2 Sub-Agent Context (Mental Model)

- Treat implementation phases as "delegated tasks". Even if you execute them, assume the "mindset" of a specialized worker (e.g., "The Renderer", "The 3D Artist").

---

## 2. Environment & Infrastructure

- **OS**: Windows 11
- **Node**: v22.17.0 (Strict Version Lock)
- **Engine**: Remotion + FFmpeg 6.0+

## 3. Animation Physics (The "No-CSS" Law)

- **Global Ban**: CSS Transitions/Keyframes are FORBIDDEN for motion.
- **Mandate**: 100% usage of `spring()` mechanics and `interpolate()`.
- **Reasoning**: Deterministic rendering at 60FPS requires frame-based logic, not time-based logic.

## 4. Styling & Theming

- **Primary**: TailwindCSS (Utility-first).
- **Theme Source**: `.agent/skills/remotion-best-practices/rules/viron-core/theme.md` (via `src/theme/Theme.ts`) acts as the single source of truth.
- **Consistency**: No ad-hoc style objects unless driving dynamic interpolation.

## 5. Web-Safe Architecture

- **Component Portability**: All components must be compatible with `@remotion/player` for web embedding.
- **Node APIs**: No Node.js-only APIs (fs, path) inside rendering components. Use `staticFile()` or `public/` assets.
- **Sub-Component Isolation**: Sub-components must NEVER set a global/scene background. They must be transparent/compact to avoid occlusion issues.

## 6. Agent Protocol

- **Storyboard First**: Before generating video code, a Storyboard/Script dialog is MANDATORY.
- **Commit Policy**: Git commit required after every logical phase or significant feature completion.
- **Validation**: No silent failures. Check renderability.

## 7. Agent Context & Resource Management (Token Safety)

- **Strict Indexing Ban**: Es ist dem Agenten STRENGSTENS UNTERSAGT, den Inhalt der `package-lock.json` zu lesen oder zu analysieren.
- **Reasoning**: Diese Datei enthält 10.000+ Zeilen maschinengenerierten Code, der das Kontext-Fenster flutet und zu "Context Poisoning" führt.
- **Exception**: Die Datei darf NUR dann gelesen werden, wenn ein expliziter Fehler bei der Installation auftritt, der eine forensische Analyse der Sub-Abhängigkeiten erfordert.
- **Priority**: Ignoriere die Lock-Datei bei jedem initialen Scan. Konzentriere deine Aufmerksamkeit stattdessen zu 100% auf die `package.json` (für den Stack) und das Skill-System.

## 8. Mandatory Integrity & Verification Protocol (The "No-Lazy" Law)

- **Anti-Skimming Mandate**: Der Agent darf niemals Inhalte "schätzen" oder Scans überspringen. Jede zugewiesene Datei muss physisch geöffnet und gelesen werden.
- **Proof-of-Work**: Bei jedem Verzeichnis-Audit ist der Agent verpflichtet, ein Inventar zu erstellen, das für JEDE Datei einen spezifischen technischen Fakt enthält, der nicht im Dateinamen steht.
- **Protocol Obedience**: Anweisungen des Users haben absolute Priorität vor internen "Effizienz-Routinen" der KI. Ein Ignorieren von Dateipfaden (insb. Sub-Ordnern) gilt als kritischer Systemfehler.
- **Rule Re-Entry**: Bei jeder Änderung der `PROJECT_RULES.md` muss der Agent diese sofort neu einlesen und den Empfang der neuen Anweisungen bestätigen.

## 9. LEARNINGS SYSTEM & CONTINUOUS IMPROVEMENT

### 9.1 The Learnings Folder

- A folder named `learnings/` MUST exist in the project root.
- **Atomicity**: Each learning gets its own markdown file (e.g., `learnings/001-metallic-shading.md`).
- **Grouping**: Files should be loosely grouped by topic prefix (e.g., `3d-`, `workflow-`, `render-`).

### 9.2 Entry Format

```markdown
# LEARNING: [Topic Name]

**Date:** YYYY-MM-DD
**Context:** What we tried to achieve.
**Outcome:** SUCCESS | FAILURE | PARTIAL
**Details:** What happened technically.
**Takeaway:** The rule or insight derived from this.
```

### 9.3 Mandatory Logging

- When an Agent (including Orchestrator) observes a **non-obvious result** (e.g., a visual artifact, an unexpected error, a surprisingly good outcome), it MUST log this to the `learnings/` folder before closing the task.
