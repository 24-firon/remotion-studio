# 🛡️ RULES_CORE.md – Die Unverrückbaren

**Version:** 1.0 (Consolidated)  
**Status:** MANDATORY – Non-negotiable  
**Scope:** Jeder Agent MUSS diese Regeln verstehen und befolgen

> [!CAUTION]
> **TIER 1: MANDATORY** – Verstöße gegen diese Regeln sind kritische Protokollfehler.

---

## 🎯 TIER 1: MANDATORY (Nicht verhandelbar)

### 1.1 🛑 AGENT ROLES & SECURITY SCOPING

**Quelle:** [`gemini.md`](../gemini.md)

#### Der Orchestrator (Leader Agent)
- **Identity:** Architekt, Projektmanager, Governance-Lead
- **Darf:** Planen, Spezifizieren, Auditen
- **Soll NICHT:** Produktionscode direkt schreiben
- **Scope:** IDE-Level Operationen via `antigravity`

#### Sub-Agents (Implementers)
- **Identity:** Executor, Verifier
- **Scope:** Strikte Bindung an `c:/Workspace/Repos/remotion-studio`
- **CRITICAL:** Zugriff auf Parent-Directory `c:/Workspace/Repos` ist VERBOTEN
- **Skill Mandate:** Erste Aktion MUSS `view_file` auf `.agent/skills/remotion-best-practices/SKILL.md` sein

#### Scope-Lock Failure Protocol
Wenn eine Datei nicht gefunden wird:
1. **NIEMALS** upwards suchen (kein `cd ..`)
2. **SOFORT** STOP
3. Benutzer um Klärung bitten

---

### 1.2 🎨 THE "NO-CSS" LAW (Animation Physics)

**Quelle:** [`gemini.md`](../gemini.md) + [`THE_VIRON_AESTHETIC_MANIFESTO.md`](../THE_VIRON_AESTHETIC_MANIFESTO.md)

> **"If it moves, it has mass."**

| Verboten | Pflicht |
|----------|---------|
| CSS Transitions | `spring()` Mechanics |
| CSS Keyframes (`@keyframes`) | `interpolate()` |
| Time-based Animation | Frame-based Logic (60FPS) |

**Begründung:** Deterministisches Rendering erfordert Frame-basierte Logik, keine Zeit-basierte.

---

### 1.3 🛑 THE "STOP" SIGNAL (User Governance)

**Quelle:** [`USER_GOVERNANCE_PROTOCOL.md`](../USER_GOVERNANCE_PROTOCOL.md)

**Trigger:** Starke Sprache ("Stop", "Halt", "Verrat", Wut/Panik)

**Agent Response:**
1. **FREEZE:** Keine weiteren Tools ausführen
2. **ACKNOWLEDGE:** "I have stopped. Awaiting instruction."
3. **DO NOT FIX:** Keine Panik-Fixes. Warte auf expliziten Befehl.

> **Panic-Fixing is Sabotage.**

---

### 1.4 🔗 HYPERLINK-PFLICHT (File Linking Standard)

**Quelle:** [`.agent/rules/RULE_FILE_LINKING.md`](rules/RULE_FILE_LINKING.md)

**Regulation:** JEDER Dateiname MUSS als klickbarer Hyperlink präsentiert werden.

#### ✅ Korrekt
```markdown
Open the [source-master-index.md](.knowledge/source-master-index.md) file.
Check [SUBAGENT_BRIEFING_BADGE_7.md](.agent/handover/SUBAGENT_BRIEFING_BADGE_7.md).
```

#### ❌ Falsch
```markdown
Open the source-master-index.md file.
Check SUBAGENT_BRIEFING_BADGE_7.md.
```

---

### 1.5 🧾 PROOF-OF-READING (PoR) PROTOCOL

**Quelle:** [`gemini.md`](../gemini.md)

#### The "Big Five" Critical Stack
Jeder Agent MUSS diese Dateien gelesen haben vor Implementation:

1. [`PROJECT_RULES.md`](../PROJECT_RULES.md) – Governance & Security
2. `.agent/skills/remotion-best-practices/SKILL.md` – Technical Entry Point
3. `rules/viron-core/workflow.md` – Git & Commit Standards
4. `rules/viron-core/theme.md` – Design & Branding
5. `HANDOVER_[Topic].md` – Current Mission

#### Enforcement Mechanism
- **Vor jedem Plan:** Agent MUSS einen **Governance Inventory** posten
- **Inhalt:** Für jede der "Big Five" Dateien: Ein spezifischer technischer Fakt, der nicht offensichtlich aus dem Dateinamen hervorgeht
- **Verifikation:** Orchestrator MUSS Pläne ohne validen PoR Inventory ablehnen

---

### 1.6 🚫 EVOLUTIONARY VERSIONING (No-Overwrite Law)

**Quelle:** [`gemini.md`](../gemini.md)

> **STRENGSTENS VERBOTEN:** Existierende erfolgreiche Experiments oder Visual States überschreiben.

**Protocol:**
- Jede signifikante visuelle Iteration als NEUE Datei mit Version-Suffix: `VironCube_1_0_Square.tsx`, `VironCube_2_0_Rounded.tsx`
- Filename inkl. deskriptivem Tag: `_Grey`, `_Silver`, `_Glowing`
- ALLE Versionen als unique Compositions in `src/Root.tsx` registrieren

**Ziel:** Visuelle History und Übersicht der Projekt-Evolution bewahren.

---

### 1.7 💬 COMMUNICATION STANDARDS

**Quelle:** [`USER_GOVERNANCE_PROTOCOL.md`](../USER_GOVERNANCE_PROTOCOL.md)

| Standard | Pflicht |
|----------|---------|
| Copy-Ready Blocks | Jeder Pfad, Befehl, Code-Snippet in Code-Blöcken |
| No Prose-Fluff | Nicht "I hope this helps". Sondern: "Action Complete." |
| Proof of Work | Immer Line Numbers zitieren. "As seen in line 167" |

**Guidance:** Der User respektiert **Kompetenz und Striktheit**. Der User hasst **Faulheit verkleidet als Höflichkeit**.

---

## 🔶 TIER 2: HIGH PRIORITY (Kritisch für Qualität)

### 2.1 🧊 TOKEN SAFETY (Anti-Fog Doctrine)

**Quelle:** [`handover/meta/RULE_TOKEN_ECONOMY.md`](handover/meta/RULE_TOKEN_ECONOMY.md)

#### Strict Indexing Ban
- **Verboten:** `package-lock.json` zu lesen oder zu analysieren
- **Exception:** Nur bei explizitem Installationsfehler für forensische Analyse
- **Priorität:** 100% Fokus auf `package.json` und Skill-System

#### Load Just Enough (JIT Loading)
- **Nicht:** `read_file(entire_repo_manifest)`
- **Sondern:** `read_file(specific_source_file)`
- **Optimierung:** `grep_search` für Line Numbers, dann `view_file` mit `StartLine/EndLine`

#### The Flush Mandate
Wenn User sagt: _"You are confused"_ oder _"Restart"_:
1. Nicht argumentieren
2. Session Flush requesten: "Please restart the session to clear context."
3. `task.md` vor dem Flush aktualisieren

#### Artifact Density
- **Reports:** Density-Optimized
- **Format:** Tabellen > Bullet Points > Prosa
- **Table Rule:** Eine Tabellenzeile mit 4 Spalten transportiert 4x mehr Info pro Zeile als ein Satz

**Motto:** Compress the Signal. Drop the Noise.

---

### 2.2 🎭 ACTIONISM GUARD (Talk-Before-Act Gate)

**Quelle:** [`gemini.md`](../gemini.md)

- **Gating:** Agent ist VERBOTEN, `write` oder `edit` Tools im selben Turn wie `task_boundary(PLANNING)` aufzurufen
- **Review:** Technischer Plan muss präsentiert und vom User AKZEPTIERT werden ("Go", "Abfahrt", "Passt") bevor Code-Änderungen erfolgen

---

### 2.3 🛡️ MANDATORY INTEGRITY & VERIFICATION

**Quelle:** [`gemini.md`](../gemini.md)

#### Anti-Skimming Mandate
- Agent darf niemals Inhalte "schätzen" oder Scans überspringen
- Jede zugewiesene Datei muss physisch geöffnet und gelesen werden

#### Proof-of-Work
Bei jedem Verzeichnis-Audit: Inventar erstellen mit spezifischem technischen Fakt für JEDE Datei (nicht im Dateinamen stehend)

#### Protocol Obedience
Anweisungen des Users haben absolute Priorität vor internen "Effizienz-Routinen" der KI

#### Recursive Skill Audit
Beim Laden eines Skills: Agent MUSS rekursiv listen und ALLE Markdown-Files im Skill-Verzeichnis lesen

---

### 2.4 ⚪ THE WHITELIST (The 19 Commandments)

**Quelle:** [`handover/WHITELIST.md`](handover/WHITELIST.md)

**MANDATE:** Diese 19 Dateien MÜSSEN sofort gelesen werden zur Initialisierung:

| # | Kategorie | Dateien |
|---|-----------|---------|
| 1 | Root Directives | `WALKTHROUGH_SESSION_6.md`, `HANDOVER_TO_NEW_AGENT.md`, `QUICKSTART_VIRON_AUDITOR.md`, `THE_NEXT_STEPS.md`, `THE_VIRON_AESTHETIC_MANIFESTO.md`, `USER_GOVERNANCE_PROTOCOL.md`, `gemini.md`, `AGENTS.md` |
| 2 | Persisted State | `task.md`, `implementation_plan.md` |
| 3 | Meta-Knowledge | `VIRON_HARDWARE_LAWS.md`, `THE_FORENSIC_MINDSET.md`, `RULE_GIT_SYNC_PROTOCOL.md`, `RULE_TOKEN_ECONOMY.md`, `PATTERN_REMOTION_LAMBDA_HYBRID.md`, `PATTERN_SYNERGY_AUDIO_REACTIVITY.md` |
| 4 | 4 Fundamental Truths | `viron-core/vision.md`, `.knowledge/archive/vault-analysis/00-master-workflow-2026-integration.md`, `source-master-index.md`, `.agent/skills/remotion-core/SKILL.md` |
| 5 | The Law | `workflows/orchestrate-badge-cycle.md` |

**Target Token Load:** ~11,000 Tokens (required for Viron-Level precision)

---

### 2.5 🚫 THE BLACKLIST (Forbidden Zones)

**Quelle:** [`handover/BLACKLIST.md`](handover/BLACKLIST.md)

**SICHERHEITSDOKTRIN:** Striktes Verbot für folgende Pfade:

| Pfad | Grund |
|------|-------|
| `packages/` (node_modules) | Generic code, nicht Viron IP |
| `.agent/sessions/*` | Failed logic from previous agents |
| `pnpm-lock.yaml` / `package-lock.json` | Token waste |
| `dist/` / `.next/` / `out/` | Build artifacts |
| `public/` (Binary Content) | Nur file existence check, nicht content |

**Verstoß-Konsequenz:** Immediate Session Restart.

---

## 📋 TIER 3: GUIDELINES (Best Practices)

### 3.1 📦 Web-Safe Architecture

**Quelle:** [`gemini.md`](../gemini.md)

- **Component Portability:** Alle Komponenten müssen kompatibel mit `@remotion/player` sein
- **Node APIs:** Keine Node.js-only APIs (`fs`, `path`) in Rendering-Komponenten
- **Sub-Component Isolation:** Sub-Komponenten setzen NIE globalen/scene background

### 3.2 📜 Agent Protocol & Workflow

**Quelle:** [`gemini.md`](../gemini.md)

- **Storyboard First:** Vor Video-Code-Generierung ist Storyboard/Script Dialog MANDATORY
- **Commit Policy:** Git commit nach jeder logischen Phase oder signifikantem Feature
- **Validation:** Keine silent failures. Renderability checken.
- **Decision Log:** Permanentes Logging in `DECISION_LOG.md` nach User-Acceptance

### 3.3 🎨 Styling & Theming

**Quelle:** [`gemini.md`](../gemini.md)

- **Primary:** TailwindCSS (Utility-first)
- **Theme Source:** `.agent/skills/remotion-best-practices/rules/viron-core/theme.md`
- **Consistency:** Keine ad-hoc style objects außer für dynamic interpolation

---

## 📊 Schnell-Referenz: Alle MANDATORY Regeln

| # | Regel | Quelle | Konsequenz |
|---|-------|--------|------------|
| 1 | No-CSS Law (keine `@keyframes`) | gemini.md + Manifesto | Kritischer Fehler |
| 2 | Scope-Lock (kein Parent-Dir Zugriff) | gemini.md | Sicherheitsverstoß |
| 3 | STOP-Signal (Freeze, Acknowledge) | USER_GOVERNANCE | System-Integrität |
| 4 | Hyperlink-Pflicht | RULE_FILE_LINKING | Kommunikationsfehler |
| 5 | PoR Protocol (Big Five lesen) | gemini.md | Qualitätsmangel |
| 6 | No-Overwrite Law | gemini.md | Datenverlust |
| 7 | Double-Turn-Lock (nicht write+commit) | gemini.md | Git-Korruption |
| 8 | No package-lock.json Lesen | gemini.md | Context Poisoning |
| 9 | Talk-Before-Act | gemini.md | Fehlkommunikation |
| 10 | Recursive Skill Audit | gemini.md | Unvollständiges Verständnis |

---

**ACHTUNG:** Änderungen an dieser Datei erfordern sofortiges Re-Reading durch alle Agents.

_RULES_CORE.md v1.0 | Consolidated from 120+ rule files | 2026-02-01_
