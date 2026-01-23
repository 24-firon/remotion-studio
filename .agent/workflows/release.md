---
description: "Total War Release Protocol: Zero-Tolerance Integrity, Full Synergetic Validation, and Automated Rollback."
---

# 🚀 Viron Semantic Release Protocol (Type: TOTAL WAR)

// turbo-all

**Trigger:** `/release`
**Scope:** Global Repository
**Authority:** High-Governance (Actionism Guard: BYPASSED by Executive Privilege)

## 🌌 Phase 0: Synergistic Environment Scan

Before we touch the codebase, we validate the machine itself to ensure no "It works on my machine" failures.

1.  **Node Environment Check**
    - `node --version`
    - **Regel:** Muss `v22.17.0` (Viron Standard) sein.
    - **Fail:** "Critical Environment Mismatch. Abort."

2.  **Clean State Assurance**
    - `run_command("git clean -fdn")`
    - **Audit:** List potentially dangerous untracked files that might contaminate the build.
    - **Regel:** Wenn Output nicht leer -> **User-Audit** anfordern.

## 🛑 Phase 1: Pre-Flight Integrity Check (The Gatekeeper)

1.  **Git Status Forensic**
    - `run_command("git status --porcelain")`
    - **Regel:** MUSS leer sein. Wir releasen keine Dirty States.

2.  **Branch validation**
    - `run_command("git branch --show-current")`
    - **Regel:** `main` (Production) oder `develop` (Integration).
    - **Fail:** Feature-Branches dürfen nicht releast werden.

3.  **Dependency Integrity**
    - `run_command("npm ci --dry-run")`
    - **Zweck:** Sicherstellen, dass `package-lock.json` synchron mit `package.json` ist.
4.  **Test Suite (Full Stress)**
    - `run_command("npm run test -- --passWithNoTests")`
    - **Regel:** Green Light Required.

## 📝 Phase 2: Documentation (The Intellectual Core)

<!-- Manual Gate: Orchestrator Intelligence Required -->

1.  **Changelog Parsing (Synergetic)**
    - Lese `git log` seit letztem Tag.
    - **Analyze:** Suche nach Cross-Effects (z.B. hat ein Update in `theme` Auswirkungen auf `components`?).
    - **Draft:** Erstelle Changelog-Block im Memory.

2.  **Version Strategy (SemVer)**
    - **Breaking:** API-Änderungen, Löschen von Komponenten. -> Major.
    - **Feature:** Neue `HANDOVER_` Files, neue Komponenten. -> Minor.
    - **Fix:** Refactoring, `PROJECT_RULES` Updates. -> Patch.
    - **Decision:** Lege Version fest (z.B. `1.1.0`) und warte auf "Go".

3.  **Artifact Alignment**
    - `package.json` -> Update version.
    - `PROJECT_RULES.md` -> Update version header (Sync).
    - `sonar-project.properties` -> Update version key.

## 🔒 Phase 3: Finalization (The Seal)

1.  **Build Verification (Production)**
    - `run_command("npm run build")`
    - **Audit:** Prüfe Build-Log auf Warnings (nicht nur Errors!).

2.  **Commit & Tag (Atomic)**
    - `git add .`
    - `git commit -S -m "chore(release): vX.Y.Z"` (Signed if possible)
    - `git tag -a vX.Y.Z -m "Release vX.Y.Z - [Dependencies Validated]"`

3.  **Push Operations**
    - `git push origin main --follow-tags`

## 🔙 Phase 4: Rollback Strategy (The Safety Net)

Wenn Phase 3 fehlschlägt (z.B. Git Reject):

1.  **Undo Tag:** `git tag -d vX.Y.Z`
2.  **Reset Commit:** `git reset --soft HEAD~1` (Behalte Änderungen staged für Fixes).
3.  **Report:** "Release Aborted. State reset to pre-commit."
