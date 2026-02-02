# 📚 VIRON STUDIO - Repository Index

**Erstellt:** 2026-02-02  
**Source:** Migration aus `remotion-studio`  
**Status:** Phase 6.2 Badge Re-Audit vorbereitet

---

## 🗺️ Ordnerstruktur

```
Viron Studio/
├── .agent/                    # Router-Dateien + Agent Templates
│   ├── AGENTS.md
│   ├── RULES_{SPECIFIC|GLOBAL|PROJECT|AGENT|VOICE}.md
│   └── templates/
│       ├── EXTRACTION_REPORT_TEMPLATE_V6.1.md
│       └── SUB_AGENT_PROMPT_TEMPLATE_V2.0.md
├── .knowledge/               # Knowledge-Base
│   ├── mission/              # Mission Reports (Badge 0-8)
│   ├── extracted-ip/         # Extrahiertes IP
│   ├── consolidated/         # Konsolidierte Skills
│   ├── research/             # Recherche-Dateien
│   └── learnings/            # Critical Learnings (Nachlieferung 2026-02-02)
│       ├── PATTERN_Viron_Hard_Won_Knowledge.md
│       ├── GUIDE_Viron_Button_Stack.md
│       ├── PATTERN_Advanced_Shaders.md
│       └── PATTERN_LIGHTING_GRADIENTS.md
│       ├── 00-overview-index-v2-1-complete.md
│       ├── 22_SYSTEM_PLAN_Folder_Structure.md
│       ├── 23_ROUTING_MATRIX_Inputs.md
│       ├── 24_ROUTING_MATRIX_Outputs.md
│       ├── 60-cloud-rendering-00-aws-lambda-renderfarming.md
│       ├── 40-advanced-lighting-00-caustics-volumetric.md
│       ├── 40-audio-reaktiv-00-fft-frequenzspektren.md
│       ├── 30-post-processing-00-overview-postprocessing-stack.md
│       └── 40-gltf-models-00-loading-optimization.md
├── viron-core/               # Viron System Core
│   ├── vision.md
│   ├── pipeline.md
│   ├── workflow.md
│   └── agent-orchestration.md
├── guides/                   # Implementation Guides
│   ├── compositions.md
│   ├── sequencing.md
│   ├── viron-button-guide.md
│   └── TEMPLATE_FeatureSpec.md
├── patterns/                 # Wiederverwendbare Patterns
│   ├── BarChart.md
│   ├── Typewriter.md
│   └── WordHighlight.md
├── specs/                    # Spezifikationen
│   ├── audio.md
│   ├── camera.md
│   ├── website.md
│   └── VIRON_SYSTEM_ENTRY.md
└── docs/                     # Dokumentation
    ├── REPOSITORY_MANIFESTO.md
    ├── HUMAN_OPERATOR_GUIDE.md
    ├── TOKEN_BUDGET.md
    └── config_hack.md
```

---

## 🎯 Badge-System Übersicht

| Badge | Name | Status | Report |
|-------|------|--------|--------|
| 0 | Master Triage | ✅ | In `.knowledge/mission/` |
| 1 | Core Architecture | ✅ | EXTRACTION_REPORT_BADGE_1.md |
| 2 | 3D Physics & Lighting | 🔄 | Pending - enthält `src/learnings/` |
| 3 | Visual FX | ✅ | EXTRACTION_REPORT_BADGE_3.md |
| 4 | Design System | ✅ | EXTRACTION_REPORT_BADGE_4.md |
| 5 | Web Patterns | ✅ | EXTRACTION_REPORT_BADGE_5.md |
| 6 | Media & Audio | ✅ | EXTRACTION_REPORT_BADGE_6.md |
| 7 | System Architecture | ✅ | EXTRACTION_REPORT_BADGE_7_V5_ULTIMATE.md |
| 8 | Agent Governance | ✅ | EXTRACTION_REPORT_BADGE_8.md |

---

## ⚠️ Kritische Lücken (Nachlieferung ausstehend)

### `knowledge/learnings/` (Badge 2) ✅ KOPIERT
Diese Dateien wurden am 2026-02-02 nachkopiert:

| Datei | Inhalt | Badge-Zuordnung | Status |
|-------|--------|-----------------|--------|
| `PATTERN_Viron_Hard_Won_Knowledge.md` | 360° Rule, Produktions-Standards | Badge 2 | ✅ |
| `GUIDE_Viron_Button_Stack.md` | Complete Button Implementation | Badge 2 | ✅ |
| `PATTERN_Advanced_Shaders.md` | Shader Recipes, Iridescent Glass | Badge 2/3 | ✅ |
| `PATTERN_LIGHTING_GRADIENTS.md` | 80% Grey Rule (Golden Mean) | Badge 2 | ✅ |

### Nicht migrierte Ordner (Absichtlich ausgeschlossen)

| Ordner | Grund | Inhalt |
|--------|-------|--------|
| `src/` (root) | Source Code | .tsx, .css, .ts Dateien |
| `build/` | Build Artefakte | Bundle files, .js.map |
| `src/experiments/` | Experimente | Chrome Button, Cube, Silver |
| `src/my-lab/` | Lab-Dateien | Scene Iterationen V23-V45 |
| `vault/` | Sync-Strategien | Nicht relevant für Skill |

---

## 🔄 Workflow Dokumente

| Dokument | Zweck |
|----------|-------|
| `VIRON_CONTEXT_PACKAGES.md` | 5 modulare Kontext-Pakete für Agenten |
| `PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V3.md` | 3-Phasen Detail-Prozess |
| `INITIALPROMPT_ORCHESTRATOR_ACTIVATION.md` | Orchestrator Aktivierung |
| `pruefe_migration.ps1` | Migration-Validierung Script |

---

## 📊 Migration Statistik

- **Kopierte Dateien:** ~55
- **Quell-Repo:** `C:\Workspace\Repos\remotion-studio`
- **Ziel-Repo:** `C:\Workspace\Repos\Viron Studio`
- **Migrationsdatum:** 2026-02-02
- **Migration Logs:** 4 Dateien in `remotion-studio/`

---

## 🎓 Skills

| Skill | Ort | Status |
|-------|-----|--------|
| `remotion-core` | Global Skills | ✅ Vorab kopiert |
| `remotion-best-practices` | Global Skills | ✅ Vorab kopiert |
| `viron-expert` | Global Skills | ✅ Vorab kopiert |

---

## 🚀 Nächste Schritte

1. **Phase 6.2:** Badge Re-Audit durchführen (Agent T starten)
2. **Phase 6.3:** Global Skill Assembly (alle 8 Badges mergen)
3. **Nachlieferung:** `src/learnings/` Dateien kopieren
4. **Phase 7:** System Merge & Greenfield Launch

---

*Letzte Aktualisierung: 2026-02-02*  
*Maintained by: Viron Digital Architect*