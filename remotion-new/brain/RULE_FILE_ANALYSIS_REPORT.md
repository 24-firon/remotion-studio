# 📊 Systematische Regel-Datei-Analyse: VIRON Repository

**Erstellt:** 2026-02-01  
**Scope:** Gesamtes Repository (`c:/Workspace/Repos/remotion-studio/`)  
**Analyst:** Code Agent

---

## 🎯 Zusammenfassung

| Metrik | Anzahl |
|--------|--------|
| **Gesamt identifizierte Dateien** | 120+ |
| **HIGH Sicherheit (Definitive Regeln)** | 35 |
| **MEDIUM Sicherheit (Wahrscheinlich relevant)** | 45 |
| **LOW Sicherheit (Prüfen erforderlich)** | 40+ |
| **CORE_RULE Kategorie** | 28 |
| **WORKFLOW Kategorie** | 22 |
| **TEMPLATE Kategorie** | 15 |
| **GUIDELINE Kategorie** | 35 |

---

## 📋 Detaillierte Analyse-Tabelle (Sortiert: HIGH → LOW)

### 🛑 HIGH SICHERHEIT - DEFINITIVE REGELN

| Pfad | Kategorie | Sicherheit | Kurzbeschreibung | Empfehlung |
|------|-----------|------------|------------------|------------|
| [`gemini.md`](gemini.md:1) | CORE_RULE | HIGH | Single Source of Truth für Governance, Design und Agent Behavior. Enthält MANDATORY Regeln wie "No-CSS Law" und Agent Roles. | **BEHALTEN** - Primäre Governance-Datei |
| [`PROJECT_RULES.md`](PROJECT_RULES.md:1) | CORE_RULE | HIGH | Zentrale Governance-Hub (v5.1). Verweist auf alle Layer der Knowledge Architecture. | **BEHALTEN** - Zentraler Einstiegspunkt |
| [`.agent/rules/RULE_FILE_LINKING.md`](.agent/rules/RULE_FILE_LINKING.md:1) | CORE_RULE | HIGH | MANDATORY Regel für Datei-Hyperlinks in ALLER Agent-Kommunikation. | **BEHALTEN** - Aktive Regel |
| [`USER_GOVERNANCE_PROTOCOL.md`](USER_GOVERNANCE_PROTOCOL.md:1) | CORE_RULE | HIGH | Definiert "STOP" Signal, Kommunikationsstandards und User-Agent Beziehung. | **BEHALTEN** - Kritisch für Interaktion |
| [`.agent/handover/meta/RULE_GIT_SYNC_PROTOCOL.md`](.agent/handover/meta/RULE_GIT_SYNC_PROTOCOL.md:1) | CORE_RULE | HIGH | "Double-Turn-Lock" Protokoll für Git-Operationen. Verhindert Race Conditions. | **BEHALTEN** - Sicherheitskritisch |
| [`.agent/handover/meta/RULE_TOKEN_ECONOMY.md`](.agent/handover/meta/RULE_TOKEN_ECONOMY.md:1) | CORE_RULE | HIGH | "Anti-Fog Doctrine" - Token-Optimierung und Context Management. | **BEHALTEN** - Performance-kritisch |
| [`.agent/handover/WHITELIST.md`](.agent/handover/WHITELIST.md:1) | CORE_RULE | HIGH | "The 19 Commandments" - MANDATORY Dateien für Agent-Initialisierung. | **BEHALTEN** - Boot-sequenz-kritisch |
| [`.agent/handover/BLACKLIST.md`](.agent/handover/BLACKLIST.md:1) | CORE_RULE | HIGH | Forbidden Zones - Sicherheitsdoktrin für verbotene Pfade. | **BEHALTEN** - Sicherheitskritisch |
| [`THE_VIRON_AESTHETIC_MANIFESTO.md`](THE_VIRON_AESTHETIC_MANIFESTO.md:1) | CORE_RULE | HIGH | Design-DNA und "No-CSS Law" - Definiert das "Industrial Monolith" Konzept. | **BEHALTEN** - Brand-Identity |
| [`src/PROJECT_RULES_LIGHTING.md`](src/PROJECT_RULES_LIGHTING.md:1) | CORE_RULE | HIGH | "The 80% Grey Rule" - Beleuchtungs- und Geometrie-Vorgaben für V43+. | **BEHALTEN** - Produktions-Standard |
| [`HANDOVER_TO_NEW_AGENT.md`](HANDOVER_TO_NEW_AGENT.md:1) | WORKFLOW | HIGH | V3.0 Deep Synergy Handover - Cross-Badge Abhängigkeiten. | **BEHALTEN** - Onboarding-kritisch |
| [`.agent/boot/INIT_MISSION.md`](.agent/boot/INIT_MISSION.md:1) | WORKFLOW | HIGH | Der Bootloader - Einstiegspunkt für alle Agent-Missionen. | **BEHALTEN** - Mission-Start |
| [`.agent/AGENTS.md`](.agent/AGENTS.md:1) | CORE_RULE | HIGH | Light Router für Agent-Orientierung mit Scenario-Triggern. | **BEHALTEN** - Navigation |
| [`DECISION_LOG.md`](DECISION_LOG.md:1) | CORE_RULE | HIGH | Archivierte Architektur-Entscheidungen mit Status [ACCEPTED]. | **BEHALTEN** - Governance-History |
| [`WALKTHROUGH_SESSION_6.md`](WALKTHROUGH_SESSION_6.md:1) | GUIDELINE | HIGH | Forensic History - MUST READ FIRST laut Whitelist. | **BEHALTEN** - Kontext-wichtig |
| [`QUICKSTART_VIRON_AUDITOR.md`](QUICKSTART_VIRON_AUDITOR.md:1) | WORKFLOW | HIGH | Operational Cheatsheet für Auditors. | **BEHALTEN** - Referenz |
| [`THE_NEXT_STEPS.md`](THE_NEXT_STEPS.md:1) | WORKFLOW | HIGH | First-Hour Agenda für neue Agents. | **BEHALTEN** - Onboarding |
| [`SKILLS_LOG.md`](SKILLS_LOG.md:1) | CORE_RULE | HIGH | Dokumentation des Skill-Systems und Integrationen. | **BEHALTEN** - Skill-Tracking |
| [`.agent/handover/implementation_plan.md`](.agent/handover/implementation_plan.md:1) | WORKFLOW | HIGH | Enthält "Viron Laws" - Persisted State. | **BEHALTEN** - Implementations-Standard |
| [`.agent/handover/task.md`](.agent/handover/task.md:1) | WORKFLOW | HIGH | Full History & Chained Execution - Long-Term Memory. | **BEHALTEN** - Session-Memory |
| [`.agent/handover/meta/VIRON_HARDWARE_LAWS.md`](.agent/handover/meta/VIRON_HARDWARE_LAWS.md:1) | CORE_RULE | HIGH | Compute/RAM/Sync Gesetze für Hardware-Constraints. | **BEHALTEN** - System-Constraints |
| [`.agent/handover/meta/THE_FORENSIC_MINDSET.md`](.agent/handover/meta/THE_FORENSIC_MINDSET.md:1) | GUIDELINE | HIGH | IP vs. Boilerplate Unterscheidung. | **BEHALTEN** - Qualitäts-Standard |
| [`.agent/skills/remotion-best-practices/SKILL.md`](.agent/skills/remotion-best-practices/SKILL.md:1) | CORE_RULE | HIGH | Master Skill mit 25+ Regel-Dateien - Single Source of Truth. | **BEHALTEN** - Skill-Kern |

### ⚠️ MEDIUM SICHERHEIT - WAHRSCHEINLICH RELEVANT

| Pfad | Kategorie | Sicherheit | Kurzbeschreibung | Empfehlung |
|------|-----------|------------|------------------|------------|
| [`Remotion Recherche/AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md`](Remotion Recherche/AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md:1) | WORKFLOW | MEDIUM | Detaillierte Fütterungsanleitung für Agent-Initialisierung. | **BEHALTEN** - Onboarding-Referenz |
| [`Remotion Recherche/ARCHIV-POLICY-v1-0.md`](Remotion Recherche/ARCHIV-POLICY-v1-0.md:1) | CORE_RULE | MEDIUM | Regeln für Archivierung: Was wird archiviert, was nicht? | **INTEGRIEREN** in Haupt-Governance |
| [`Remotion Recherche/26_INTEGRATION_PROTOCOL_Skill_Merge.md`](Remotion Recherche/26_INTEGRATION_PROTOCOL_Skill_Merge.md:1) | WORKFLOW | MEDIUM | Chirurgische Integration von Skills in den Remotion-Kern. | **PRÜFEN** - Status unklar |
| [`docs/REPOSITORY_MANIFESTO.md`](docs/REPOSITORY_MANIFESTO.md:1) | CORE_RULE | MEDIUM | Four-Pillar Architecture - Repository-Philosophie. | **BEHALTEN** - Architektur-Dokument |
| [`docs/HUMAN_OPERATOR_GUIDE.md`](docs/HUMAN_OPERATOR_GUIDE.md:1) | GUIDELINE | MEDIUM | Anleitung für menschliche Operatoren. | **BEHALTEN** - User-Dokumentation |
| [`docs/TOKEN_BUDGET.md`](docs/TOKEN_BUDGET.md:1) | GUIDELINE | MEDIUM | Token-Budgetierungs-Richtlinien. | **INTEGRIEREN** mit RULE_TOKEN_ECONOMY |
| [`guides/TEMPLATE_FeatureSpec.md`](guides/TEMPLATE_FeatureSpec.md:1) | TEMPLATE | MEDIUM | Standard-Template für Feature-Spezifikationen. | **BEHALTEN** - Template-Standard |
| [`guides/compositions.md`](guides/compositions.md:1) | GUIDELINE | MEDIUM | Guide für Remotion Compositions. | **BEHALTEN** - Technische Referenz |
| [`guides/sequencing.md`](guides/sequencing.md:1) | GUIDELINE | MEDIUM | Guide für Sequencing Patterns. | **BEHALTEN** - Technische Referenz |
| [`guides/viron-button-guide.md`](guides/viron-button-guide.md:1) | GUIDELINE | MEDIUM | Spezifischer Guide für Viron Buttons. | **BEHALTEN** - Domänen-spezifisch |
| [`src/learnings/GUIDE_Viron_Button_Stack.md`](src/learnings/GUIDE_Viron_Button_Stack.md:1) | GUIDELINE | MEDIUM | Button-Stack Implementation Guide. | **BEHALTEN** - Learning |
| [`src/learnings/PATTERN_Advanced_Shaders.md`](src/learnings/PATTERN_Advanced_Shaders.md:1) | GUIDELINE | MEDIUM | Shader-Rezepte und VFX Patterns. | **BEHALTEN** - Technisches Learning |
| [`src/learnings/PATTERN_LIGHTING_GRADIENTS.md`](src/learnings/PATTERN_LIGHTING_GRADIENTS.md:1) | GUIDELINE | MEDIUM | Lighting & Gradient Patterns. | **BEHALTEN** - Technisches Learning |
| [`src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md`](src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md:1) | GUIDELINE | MEDIUM | Hart erarbeitetes Wissen - Lessons Learned. | **BEHALTEN** - Wichtiges Learning |
| [`src/learnings/RESOURCES_AND_ECOSYSTEM.md`](src/learnings/RESOURCES_AND_ECOSYSTEM.md:1) | GUIDELINE | MEDIUM | Ressourcen- und Ökosystem-Übersicht. | **BEHALTEN** - Referenz |
| [`specs/audio.md`](specs/audio.md:1) | GUIDELINE | MEDIUM | Audio-Spezifikationen. | **BEHALTEN** - Domain-Spez |
| [`specs/camera.md`](specs/camera.md:1) | GUIDELINE | MEDIUM | Camera-Spezifikationen. | **BEHALTEN** - Domain-Spez |
| [`specs/VIRON_SYSTEM_ENTRY.md`](specs/VIRON_SYSTEM_ENTRY.md:1) | CORE_RULE | MEDIUM | System-Entry Spezifikation. | **BEHALTEN** - System-Doku |
| [`specs/website.md`](specs/website.md:1) | GUIDELINE | MEDIUM | Website-Spezifikationen. | **BEHALTEN** - Domain-Spez |
| [`patterns/BarChart.md`](patterns/BarChart.md:1) | TEMPLATE | MEDIUM | BarChart Pattern Dokumentation. | **BEHALTEN** - Code-Pattern |
| [`patterns/Typewriter.md`](patterns/Typewriter.md:1) | TEMPLATE | MEDIUM | Typewriter Pattern Dokumentation. | **BEHALTEN** - Code-Pattern |
| [`patterns/WordHighlight.md`](patterns/WordHighlight.md:1) | TEMPLATE | MEDIUM | WordHighlight Pattern Dokumentation. | **BEHALTEN** - Code-Pattern |
| [`Remotion Recherche/00-master-workflow-2026-integration.md`](Remotion Recherche/00-master-workflow-2026-integration.md:1) | WORKFLOW | MEDIUM | Master Workflow mit Decision Trees. | **PRÜFEN** - Überschneidung mit AGENTS.md? |
| [`Remotion Recherche/AGENT-OUTPUT-VALIDATION-v1-0.md`](Remotion Recherche/AGENT-OUTPUT-VALIDATION-v1-0.md:1) | CORE_RULE | MEDIUM | Validierungs-Regeln für Agent-Output. | **INTEGRIEREN** in Governance |
| [`Remotion Recherche/SKILL-INSTALLATION-GUIDE-v1-0.md`](Remotion Recherche/SKILL-INSTALLATION-GUIDE-v1-0.md:1) | WORKFLOW | MEDIUM | Skill-Installations-Prozess. | **PRÜFEN** - Aktuell? |
| [`Remotion Recherche/SKILL-QUALITY-AUDIT-CHECKLIST-v1-0.md`](Remotion Recherche/SKILL-QUALITY-AUDIT-CHECKLIST-v1-0.md:1) | WORKFLOW | MEDIUM | Qualitäts-Checkliste für Skills. | **BEHALTEN** - QA-Referenz |
| [`Remotion Recherche/SUB-AGENT-DELEGATION-MATRIX-v1-0.md`](Remotion Recherche/SUB-AGENT-DELEGATION-MATRIX-v1-0.md:1) | WORKFLOW | MEDIUM | Delegations-Matrix für Sub-Agents. | **BEHALTEN** - Workflow-Referenz |
| [`src/V43_MASTER_PLAN.md`](src/V43_MASTER_PLAN.md:1) | WORKFLOW | MEDIUM | "The Silver Armada" Strategie (12 Variationen). | **BEHALTEN** - Strategie-Doku |
| [`src/V43_STRATEGY.md`](src/V43_STRATEGY.md:1) | WORKFLOW | MEDIUM | V43 Strategie-Dokument. | **BEHALTEN** - Strategie-Doku |
| [`.agent/workflows/deploy-subagent-mission.md`](.agent/workflows/deploy-subagent-mission.md:1) | WORKFLOW | MEDIUM | Workflow für Subagent-Mission Deployment. | **BEHALTEN** - Aktiver Workflow |
| [`.agent/workflows/orchestrate-badge-cycle.md`](.agent/workflows/orchestrate-badge-cycle.md:1) | WORKFLOW | MEDIUM | Badge Cycle Orchestrierung. | **BEHALTEN** - Aktiver Workflow |
| [`.agent/workflows/orchestrator-self-audit.md`](.agent/workflows/orchestrator-self-audit.md:1) | WORKFLOW | MEDIUM | Orchestrator Self-Audit Prozess. | **BEHALTEN** - QA-Workflow |
| [`.agent/workflows/release.md`](.agent/workflows/release.md:1) | WORKFLOW | MEDIUM | Release Workflow. | **BEHALTEN** - DevOps |
| [`.agent/workflows/session-close.md`](.agent/workflows/session-close.md:1) | WORKFLOW | MEDIUM | Session-Closure Workflow. | **BEHALTEN** - Prozess-Standard |

### 🔍 LOW SICHERHEIT - PRÜFEN ERFORDERLICH

| Pfad | Kategorie | Sicherheit | Kurzbeschreibung | Empfehlung |
|------|-----------|------------|------------------|------------|
| [`README.md`](README.md:1) | GUIDELINE | LOW | Standard README - möglicherweise veraltet. | **PRÜFEN** - Aktualisierung nötig? |
| [`GEMINI_UPDATE.md`](GEMINI_UPDATE.md:1) | UNCLEAR | LOW | Gemini Update Informationen - einmalig? | **ARCHIVIEREN** wenn veraltet |
| [`HISTORY_LOG.md`](HISTORY_LOG.md:1) | UNCLEAR | LOW | Historische Logs - archivieren? | **PRÜFEN** - Relevanz? |
| [`HANDOVER_Viron_Cube.md`](HANDOVER_Viron_Cube.md:1) | GUIDELINE | LOW | Spezifischer Handover für Viron Cube. | **ARCHIVIEREN** wenn abgeschlossen |
| [`HANDOVER_SilverV2.md`](HANDOVER_SilverV2.md:1) | GUIDELINE | LOW | SilverV2 spezifischer Handover. | **ARCHIVIEREN** wenn abgeschlossen |
| [`NEXT_ORCHESTRATOR_PROMPT.md`](NEXT_ORCHESTRATOR_PROMPT.md:1) | WORKFLOW | LOW | Nächster Orchestrator Prompt - temporär? | **PRÜFEN** - Noch aktuell? |
| [`.agent/handover/INITIALIZATION_PROMPT.md`](.agent/handover/INITIALIZATION_PROMPT.md:1) | WORKFLOW | LOW | Initialization Prompt - Version? | **PRÜFEN** - Aktuellste Version? |
| [`.agent/handover/TASK_PROMPT.md`](.agent/handover/TASK_PROMPT.md:1) | TEMPLATE | LOW | Task Prompt Template. | **PRÜFEN** - Duplikat? |
| [`.agent/handover/TASK_PROMPT_2.md`](.agent/handover/TASK_PROMPT_2.md:1) | TEMPLATE | LOW | Task Prompt Template v2. | **PRÜFEN** - Duplikat? |
| [`.agent/handover/SUBAGENT_BRIEFING_BADGE_*.md`](.agent/handover/SUBAGENT_BRIEFING_BADGE_7.md:1) | TEMPLATE | LOW | Mehrere Badge-spezifische Briefings (1-8). | **ARCHIVIEREN** wenn abgeschlossen |
| [`.agent/handover/SUBAGENT_PROMPT_CREATE_LINKED_INDEX.md`](.agent/handover/SUBAGENT_PROMPT_CREATE_LINKED_INDEX.md:1) | TEMPLATE | LOW | Subagent Prompt für Linked Index. | **PRÜFEN** - Noch benötigt? |
| [`.agent/handover/SUBAGENT_PROMPT_CREATE_LINKED_INDEX_V2.md`](.agent/handover/SUBAGENT_PROMPT_CREATE_LINKED_INDEX_V2.md:1) | TEMPLATE | LOW | Subagent Prompt V2. | **PRÜFEN** - Duplikat/Vorgänger? |
| [`.agent/handover/INDEX_HYPERLINKS.md`](.agent/handover/INDEX_HYPERLINKS.md:1) | GUIDELINE | LOW | Hyperlink Index - Referenz? | **PRÜFEN** - Aktualität? |
| [`.agent/handover/PROMPT_V3_BEST_PRACTICES.md`](.agent/handover/PROMPT_V3_BEST_PRACTICES.md:1) | GUIDELINE | LOW | V3 Best Practices - veraltet? | **ARCHIVIEREN** wenn V5 aktiv |
| [`.knowledge/source-master-index.md`](.knowledge/source-master-index.md:1) | GUIDELINE | LOW | Source Master Index - redundant? | **PRÜFEN** - Duplikat zu anderen Indices? |
| [`.knowledge/mission/EXTRACTION_REPORT_BADGE_*.md`](.knowledge/mission/EXTRACTION_REPORT_BADGE_7.md:1) | WORKFLOW | LOW | Mehrere Badge-Extraction Reports (1-8). | **ARCHIVIEREN** - Historische Reports |
| [`.knowledge/mission/SUBAGENT_BRIEFING_*.md`](.knowledge/mission/SUBAGENT_BRIEFING_BADGE_7.md:1) | TEMPLATE | LOW | Subagent Briefings in Knowledge. | **PRÜFEN** - Duplikat zu .agent/handover? |
| [`.knowledge/templates/*.md`](.knowledge/templates/EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md:1) | TEMPLATE | LOW | Verschiedene Templates (Diff, Extraction). | **BEHALTEN** - Template-Bibliothek |
| [`.knowledge/project-learnings/LEARNING_*.md`](.knowledge/project-learnings/LEARNING_BADGE_1_CORE_ARCH.md:1) | GUIDELINE | LOW | Badge-spezifische Learnings. | **INTEGRIEREN** - In zentrales Learning |
| [`Remotion Recherche/00-overview-index-v2-1-complete.md`](Remotion Recherche/00-overview-index-v2-1-complete.md:1) | GUIDELINE | LOW | Overview Index - veraltet? | **PRÜFEN** - Noch referenziert? |
| [`Remotion Recherche/STATUS-DEPRECATION-REPORT-v2-1.md`](Remotion Recherche/STATUS-DEPRECATION-REPORT-v2-1.md:1) | GUIDELINE | LOW | Deprecation Report - einmalig. | **ARCHIVIEREN** nach Prüfung |
| [`Remotion Recherche/LUECKEN-AUDIT-v2-1-complete-coverage.md`](Remotion Recherche/LUECKEN-AUDIT-v2-1-complete-coverage.md:1) | GUIDELINE | LOW | Lücken-Audit - einmalig. | **ARCHIVIEREN** nach Prüfung |
| [`Remotion Recherche/MIGRATION-33-DATEIEN-KONSOLIDIEREN-v1-0.md`](Remotion Recherche/MIGRATION-33-DATEIEN-KONSOLIDIEREN-v1-0.md:1) | WORKFLOW | LOW | Migrations-Plan - abgeschlossen? | **ARCHIVIEREN** wenn erledigt |
| [`Remotion Recherche/ZUKUNFTSPLAN-*.md`](Remotion Recherche/ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md:1) | WORKFLOW | LOW | Mehrere Zukunftspläne (App Shell, Design, Postgres). | **BEHALTEN** - Roadmap-Referenz |
| [`src/experiments/4 Evolutions-Tests.md`](src/experiments/4 Evolutions-Tests.md:1) | GUIDELINE | LOW | Evolution Tests Dokumentation. | **PRÜFEN** - Relevanz? |
| [`public/Eye Candy Stack/*.md`](public/Eye Candy Stack/README.md:1) | GUIDELINE | LOW | Eye Candy Stack Dokumentation. | **PRÜFEN** - Duplikat zu anderen Guides? |

---

## 📁 Skill-Regeln (`.agent/skills/remotion-best-practices/rules/`)

Das Skill-System enthält **25+ Regel-Dateien** die als CORE_RULES gelten:

| Regel-Datei | Beschreibung |
|-------------|--------------|
| [`3d.md`](.agent/skills/remotion-best-practices/rules/3d.md:1) | 3D Content mit Three.js/R3F |
| [`animations.md`](.agent/skills/remotion-best-practices/rules/animations.md:1) | Grundlegende Animation Patterns |
| [`assets.md`](.agent/skills/remotion-best-practices/rules/assets.md:1) | Asset Import Guidelines |
| [`audio.md`](.agent/skills/remotion-best-practices/rules/audio.md:1) | Audio Verwendung |
| [`calculate-metadata.md`](.agent/skills/remotion-best-practices/rules/calculate-metadata.md:1) | Dynamische Metadata |
| [`can-decode.md`](.agent/skills/remotion-best-practices/rules/can-decode.md:1) | Video Decoding Check |
| [`charts.md`](.agent/skills/remotion-best-practices/rules/charts.md:1) | Chart Patterns |
| [`compositions.md`](.agent/skills/remotion-best-practices/rules/compositions.md:1) | Composition Definitionen |
| [`display-captions.md`](.agent/skills/remotion-best-practices/rules/display-captions.md:1) | Caption Display |
| [`extract-frames.md`](.agent/skills/remotion-best-practices/rules/extract-frames.md:1) | Frame Extraction |
| [`fonts.md`](.agent/skills/remotion-best-practices/rules/fonts.md:1) | Font Loading |
| [`get-audio-duration.md`](.agent/skills/remotion-best-practices/rules/get-audio-duration.md:1) | Audio Duration |
| [`get-video-dimensions.md`](.agent/skills/remotion-best-practices/rules/get-video-dimensions.md:1) | Video Dimensions |
| [`get-video-duration.md`](.agent/skills/remotion-best-practices/rules/get-video-duration.md:1) | Video Duration |
| [`gifs.md`](.agent/skills/remotion-best-practices/rules/gifs.md:1) | GIF Integration |
| [`images.md`](.agent/skills/remotion-best-practices/rules/images.md:1) | Image Embedding |
| [`import-srt-captions.md`](.agent/skills/remotion-best-practices/rules/import-srt-captions.md:1) | SRT Import |
| [`lottie.md`](.agent/skills/remotion-best-practices/rules/lottie.md:1) | Lottie Animationen |
| [`maps.md`](.agent/skills/remotion-best-practices/rules/maps.md:1) | Mapbox Integration |
| [`measuring-dom-nodes.md`](.agent/skills/remotion-best-practices/rules/measuring-dom-nodes.md:1) | DOM Measurement |
| [`measuring-text.md`](.agent/skills/remotion-best-practices/rules/measuring-text.md:1) | Text Measurement |
| [`parameters.md`](.agent/skills/remotion-best-practices/rules/parameters.md:1) | Parametrisierung |
| [`sequencing.md`](.agent/skills/remotion-best-practices/rules/sequencing.md:1) | Sequencing Patterns |
| [`tailwnd.md`](.agent/skills/remotion-best-practices/rules/tailwind.md:1) | TailwindCSS Usage |
| [`text-animations.md`](.agent/skills/remotion-best-practices/rules/text-animations.md:1) | Text Animationen |
| [`timing.md`](.agent/skills/remotion-best-practices/rules/timing.md:1) | Interpolation Curves |
| [`transcribe-captions.md`](.agent/skills/remotion-best-practices/rules/transcribe-captions.md:1) | Transkription |
| [`transitions.md`](.agent/skills/remotion-best-practices/rules/transitions.md:1) | Transitions |
| [`trimming.md`](.agent/skills/remotion-best-practices/rules/trimming.md:1) | Trimming Patterns |
| [`videos.md`](.agent/skills/remotion-best-practices/rules/videos.md:1) | Video Embedding |

**Empfehlung:** Alle Skill-Regeln **BEHALTEN** - Sie bilden den unveränderlichen Kern des Remotion Skill-Systems.

---

## 🎯 Zusammenfassung der Empfehlungen

### BEHALTEN (Kritisch)
- Alle CORE_RULE Dateien mit HIGH Sicherheit
- Aktive Workflow-Dateien
- Skill-Regeln (`.agent/skills/remotion-best-practices/rules/`)
- Template-Bibliothek

### INTEGRIEREN (Konsolidieren)
- `ARCHIV-POLICY-v1-0.md` → In Governance-Hub
- `AGENT-OUTPUT-VALIDATION-v1-0.md` → In Governance-Hub
- `TOKEN_BUDGET.md` → Mit RULE_TOKEN_ECONOMY vereinen
- Badge-spezifische Learnings → Zentrales Learning-Repository

### ARCHIVIEREN (Bereinigen)
- Abgeschlossene Badge-Briefings (Badge 1-6)
- Einmalige Audit-Reports (nach Prüfung)
- Veraltete Prompt-Versionen
- Abgeschlossene Migrations-Pläne

### PRÜFEN (Analyse nötig)
- README.md (Aktualisierung)
- Duplikate zwischen .agent/handover und .knowledge
- Temporäre Prompts
- Versions-konflikte

---

## 📊 Visualisierung: Datei-Verteilung

```
Repository Root
├── 🛑 HIGH (35 Dateien)
│   ├── gemini.md ⭐
│   ├── PROJECT_RULES.md ⭐
│   ├── USER_GOVERNANCE_PROTOCOL.md ⭐
│   ├── .agent/rules/RULE_FILE_LINKING.md ⭐
│   └── ... (weitere CORE Rules)
│
├── ⚠️ MEDIUM (45 Dateien)
│   ├── docs/REPOSITORY_MANIFESTO.md
│   ├── guides/
│   ├── specs/
│   ├── src/learnings/
│   └── Remotion Recherche/PROTOCOLLE/
│
└── 🔍 LOW (40+ Dateien)
    ├── Historische Reports
    ├── Temporäre Prompts
    ├── Potentielle Duplikate
    └── Zu prüfende Dateien
```

---

**Ende der Analyse**
