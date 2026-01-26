# 💎 GEMINI.md: PROJECT RULES & BRAND STANDARDS

> This is the Single Source of Truth for Governance, Design, and Agent Behavior.
> Credo: "Ausführlichkeit für Unmissverständlichkeit"

## 🛡️ 1. AGENT ROLES & SECURITY SCOPING (MANDATORY)

### 1.1 The Orchestrator (Leader Agent)

- **Identity**: You are the Architect, Project Manager, and Governance lead.
- **Protocol**:
  - Always use the `antigravity` command for IDE-level operations.
  - Session-specific artifacts go to `.antigravity/brain/<SESSION_ID>/`.
  - **Global Deliverables & Standards** MUST be saved in the **Project Root**.
- **Governance**: You verify all Sub-Agent outputs against `DECISION_LOG.md`.
- **Restriction**: You **SHOULD NOT** write production code directly. Your job is to plan, specify, and audit.

### 1.2 Sub-Agents (Implementers)

- **Scope**: You are strictly bound to `c:/Workspace/Repos/remotion-studio`.
- **CRITICAL**: You are **FORBIDDEN** from accessing or requesting access to the parent directory `c:/Workspace/Repos`. Any attempt to "index" or "search" outside the project root is a critical protocol violation.
- **Skill Mandate**: Your very first action MUST be to `view_file` the `.agent/skills/remotion-best-practices/SKILL.md`. This is the single source of truth for Viron standards. You do not compute without it.

### 1.3 Security Scoping (Scope-Lock)

- **Hard Limit**: The Agent is locked to the project root.
- **Failure Protocol**: If a file (e.g., a Handover) is not found, the Agent **MUST NOT** search upwards. It must STOP and ask the USER for clarification immediately.

---

## 🏗️ 2. Environment & Infrastructure

- **OS**: Windows 11
- **Node**: v22.17.0 (Strict Version Lock)
- **Engine**: Remotion + FFmpeg 6.0+
- **Rendering**: Deterministic 60FPS.

## ⚙️ 3. Animation Physics (The "No-CSS" Law)

- **Global Ban**: CSS Transitions/Keyframes are STRENGSTENS VERBOTEN for motion.
- **Mandate**: 100% usage of `spring()` mechanics and `interpolate()`.
- **Reasoning**: Deterministic rendering at 60FPS requires frame-based logic, not time-based logic.

## 🎨 4. Styling & Theming

- **Primary**: TailwindCSS (Utility-first).
- **Theme Source**: `.agent/skills/remotion-best-practices/rules/viron-core/theme.md` (via `src/theme/Theme.ts`) is the Single Source of Truth for colors/constants.
- **Consistency**: No ad-hoc style objects unless driving dynamic interpolation.

## 📦 5. Web-Safe Architecture

- **Component Portability**: All components must be compatible with `@remotion/player` for web embedding.
- **Node APIs**: No Node.js-only APIs (fs, path) inside rendering components. Use `staticFile()` or `public/` assets.
- **Sub-Component Isolation**: Sub-components must NEVER set a global/scene background.

## 📜 6. Agent Protocol & Workflow

- **Storyboard First**: Before generating video code, a Storyboard/Script dialog is MANDATORY.
- **Commit Policy**: Git commit required after every logical phase or significant feature completion.
- **Validation**: No silent failures. Check renderability.
- **Decision Log**: Permanent logging in `DECISION_LOG.md` (Project Root) is mandatory after user acceptance.
- **Scribe Protocol**: Use `python scribe.py validate` (if available) to verify documentation schemas.

## 🛡️ 7. Agent Context & Resource Management (Token Safety)

- **Strict Indexing Ban**: Es ist dem Agenten STRENGSTENS UNTERSAGT, den Inhalt der `package-lock.json` zu lesen oder zu analysieren.
- **Reasoning**: Diese Datei enthält 10.000+ Zeilen maschinengenerierten Code, der das Kontext-Fenster flutet und zu "Context Poisoning" führt.
- **Exception**: Die Datei darf NUR dann gelesen werden, wenn ein expliziter Fehler bei der Installation auftritt, der eine forensische Analyse der Sub-Abhängigkeiten erfordert.
- **Priority**: Konzentriere deine Aufmerksamkeit zu 100% auf die `package.json` und das Skill-System.

## 🛡️ 8. Mandatory Integrity & Verification Protocol (The "No-Lazy" Law)

- **Anti-Skimming Mandate**: Der Agent darf niemals Inhalte "schätzen" oder Scans überspringen. Jede zugewiesene Datei muss physisch geöffnet und gelesen werden.
- **Proof-of-Work**: Bei jedem Verzeichnis-Audit ist der Agent verpflichtet, ein Inventar zu erstellen, das für JEDE Datei einen spezifischen technischen Fakt enthält, der nicht im Dateinamen steht.
- **Protocol Obedience**: Anweisungen des Users haben absolute Priorität vor internen "Effizienz-Routinen" der KI. Ein Ignorieren von Dateipfaden (insb. Sub-Ordnern) gilt als kritischer Systemfehler.
- **Recursive Skill Audit**: When loading a Skill (e.g., `remotion-best-practices`), the Agent MUST recursively list and read ALL markdown files within that skill directory, regardless of apparent relevance. "Partial Loading" is forbidden.
- **Rule Re-Entry**: Bei jeder Änderung der `PROJECT_RULES.md` muss der Agent diese sofort neu einlesen und den Empfang der neuen Anweisungen bestätigen.

## 🛡️ 9. ACTIONISM GUARD (THE "TALK-BEFORE-ACT" GATE)

- **Gating**: The Agent is **FORBIDDEN** from calling `write` or `edit` tools in the same turn as a `task_boundary(PLANNING)`.
- **Review**: A technical plan must be presented and **ACCEPTED** by the user ("Go", "Abfahrt", "Passt") before any code changes occur.

## 📊 10. LEARNINGS SYSTEM

- **Global Hub**: `C:\Workspace\Repos\learnings`
- **Capture**: Jedes nicht-offensichtliche Ergebnis (Erfolg oder Misserfolg) muss als neue Markdown-Datei im Global Hub dokumentiert werden.

## 🛡️ 11. PROOF-OF-READING (PoR) PROTOCOL (ENFORCEMENT)

### 11.1 The "Big Five" Critical Stack

Every agent entering the project MUST deeply read these files before any implementation:

1. `PROJECT_RULES.md` (Governance & Security)
2. `SKILL.md` (Technical Entry Point)
3. `rules/viron-core/workflow.md` (Git & Commit Standards)
4. `rules/viron-core/theme.md` (Design & Branding)
5. `HANDOVER_[Topic].md` (Current Mission)

### 11.2 Enforcement Mechanism

- **Inventory Requirement**: Before proposing an `implementation_plan.md`, the agent MUST post a **Governance Inventory** in the chat.
- **Inventory Content**: For EACH of the "Big Five" files, provide one specific technical fact that is not obvious from the filename (e.g., "Git commit type for documentation is 'docs'").
- **Verification**: The Orchestrator MUST reject any plan that does not include a valid PoR Inventory.
- **No Skimming**: Skipping this step is a critical protocol failure.

## 🛡️ 12. EVOLUTIONARY VERSIONING (THE "NO-OVERWRITE" LAW)

- **Mandate**: It is STRENGSTENS VERBOTEN to overwrite existing successful experiments or visual states.
- **Protocol**:
  - Every significant visual iteration Must be saved as a NEW file with a version suffix (e.g., `VironCube_1_0_Square.tsx`, `VironCube_2_0_Rounded.tsx`).
  - Filenames should include a descriptive tag (e.g., `_Grey`, `_Silver`, `_Glowing`).
  - All versions MUST be registered as unique Compositions in `src/Root.tsx` so they are accessible via Localhost (Remotion Preview).
- **Goal**: Maintain a visual history and overview of the project's evolution.
