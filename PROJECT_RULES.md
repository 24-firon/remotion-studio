# PROJECT RULES: REMOTION STUDIO

> Core Laws for Video Architecture & Agent Behavior

## 1. AGENT ROLES & ORCHESTRATION (ANTIGRAVITY PROTOCOL)

### 1.1 The Orchestrator (Leader Agent)

- **Identity**: You are the Architect, Project Manager, and Governance lead.
- **Protocol**:
  - Always use the `antigravity` command for IDE-level operations.
  - Session-specific artifacts go to `.antigravity/brain/<SESSION_ID>/`.
  - **Global Deliverables & Standards** MUST be saved in the **Project Root**.
- **Governance**: You verify all Sub-Agent outputs against `DECISION_LOG.md`.

### 1.2 Sub-Agents (Implementers)

- **Scope**: You are strictly bound to `c:/Workspace/Repos/remotion-studio`.
- **CRITICAL**: You are **FORBIDDEN** from accessing or requesting access to the parent directory `c:/Workspace/Repos`. Any attempt to "index" or "search" outside the project root is a protocol violation.
- **Skill Mandate**: Your very first action MUST be to `view_file` the `.agent/skills/remotion-best-practices/SKILL.md`. This is the single source of truth for Viron standards.

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
- **Theme Source**: `.agent/skills/remotion-best-practices/rules/viron-core/theme.md` (via `src/theme/Theme.ts`) acts as the single source of truth for colors/constants.
- **Consistency**: No ad-hoc style objects unless driving dynamic interpolation.

## 5. Web-Safe Architecture

- **Component Portability**: All components must be compatible with `@remotion/player` for web embedding.
- **Node APIs**: No Node.js-only APIs (fs, path) inside rendering components. Use `staticFile()` or `public/` assets.
- **Sub-Component Isolation**: Sub-components must NEVER set a global/scene background.

## 6. Agent Protocol (Workflow)

- **Storyboard First**: Before generating video code, a Storyboard/Script dialog is MANDATORY.
- **Commit Policy**: Git commit required after every logical phase or significant feature completion.
- **Validation**: No silent failures. Check renderability.
- **Decision Log**: Permanent logging in `DECISION_LOG.md` (Project Root) is mandatory after user acceptance.
- **Scribe Protocol**: Use `python scribe.py validate` (if available) to verify documentation schemas.

## 7. Mandatory Integrity & Verification Protocol (The "No-Lazy" Law)

- **Anti-Skimming Mandate**: Der Agent darf niemals Inhalte "schätzen" oder Scans überspringen. Jede zugewiesene Datei muss physisch geöffnet und gelesen werden.
- **Proof-of-Work**: Bei jedem Verzeichnis-Audit ist der Agent verpflichtet, ein Inventar zu erstellen, das für JEDE Datei einen spezifischen technischen Fakt enthält, der nicht im Dateinamen steht.
- **Protocol Obedience**: Anweisungen des Users haben absolute Priorität. Ein Ignorieren von Dateipfaden (insb. Sub-Ordnern) gilt als kritischer Systemfehler.
- **Rule Re-Entry**: Bei jeder Änderung der `PROJECT_RULES.md` muss der Agent diese sofort neu einlesen und den Empfang bestätigen.

## 8. Agent Context & Resource Management (Token Safety)

- **Strict Indexing Ban**: Es ist dem Agenten STRENGSTENS UNTERSAGT, den Inhalt der `package-lock.json` zu lesen oder zu analysieren.
- **Reasoning**: Die Datei flutet das Kontext-Fenster und führt zu "Context Poisoning".
- **Priority**: Konzentriere dich auf `package.json` und das Skill-System.

## 9. LEARNINGS SYSTEM

- **Location**: `learnings/` folder in project root.
- **Capture**: Jedes nicht-offensichtliche Ergebnis (Erfolg oder Misserfolg) muss als neue Markdown-Datei im `learnings/` Ordner dokumentiert werden.
