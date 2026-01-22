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

## 6. Agent Context & Resource Management (Token Safety)

- **Strict Indexing Ban**: Es ist dem Agenten STRENGSTENS UNTERSAGT, den Inhalt der `package-lock.json` zu lesen oder zu analysieren. 
- **Reasoning**: Diese Datei enthält 10.000+ Zeilen maschinengenerierten Code, der das Kontext-Fenster flutet und zu "Context Poisoning" führt.
- **Exception**: Die Datei darf NUR dann gelesen werden, wenn ein expliziter Fehler bei der Installation auftritt, der eine forensische Analyse der Sub-Abhängigkeiten erfordert.
- **Priority**: Ignoriere die Lock-Datei bei jedem initialen Scan. Konzentriere deine Aufmerksamkeit stattdessen zu 100% auf die `package.json` (für den Stack) und den `Research/`-Ordner (für die Vision).

## 7. Mandatory Integrity & Verification Protocol (The "No-Lazy" Law)

- **Anti-Skimming Mandate**: Der Agent darf niemals Inhalte "schätzen" oder Scans überspringen. Jede zugewiesene Datei muss physisch geöffnet und gelesen werden.
- **Proof-of-Work**: Bei jedem Verzeichnis-Audit ist der Agent verpflichtet, ein Inventar zu erstellen, das für JEDE Datei einen spezifischen technischen Fakt enthält, der nicht im Dateinamen steht.
- **Protocol Obedience**: Anweisungen des Users haben absolute Priorität vor internen "Effizienz-Routinen" der KI. Ein Ignorieren von Dateipfaden (insb. Sub-Ordnern) gilt als kritischer Systemfehler.
- **Rule Re-Entry**: Bei jeder Änderung der `PROJECT_RULES.md` muss der Agent diese sofort neu einlesen und den Empfang der neuen Anweisungen bestätigen.