# META-DATEIEN - Was muss ins neue Repo?

**Datum:** 2026-02-01
**Fokus:** Indexe, Prompts, Regeln, Router (NICHT Vault/Core/Research)

---

## 🔴 ROUTER & REGELN (Phase 6.0 - MUSS)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 1 | `.agent/AGENTS.md` | `.agent/AGENTS.md` | 7 Scenario-Trigger für Sub-Agenten |
| 2 | `.agent/RULES_CORE.md` | `.agent/RULES_CORE.md` | TIER 1 MANDATORY Regeln |
| 3 | `.agent/RULES_WORKFLOW.md` | `.agent/RULES_WORKFLOW.md` | Double-Turn-Lock, Badge Cycle |
| 4 | `.agent/RULES_TECHNICAL.md` | `.agent/RULES_TECHNICAL.md` | Design-DNA, 80% Grey Rule |
| 5 | `.agent/RULES_MIGRATION_GUIDE.md` | `.agent/RULES_MIGRATION_GUIDE.md` | Dokumentation Konsolidierung |

---

## 🟡 INDEXE & NAVIGATION (Wichtig)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 6 | `.knowledge/source-master-index.md` | `.knowledge/index/source-master-index.md` | Alle 115+ Dateien dokumentiert |
| 7 | `.agent/handover/INDEX_HYPERLINKS.md` | `.knowledge/index/index-hyperlinks.md` | Navigation zu allen Reports |
| 8 | `.agent/handover/implementation_plan.md` | `.knowledge/index/implementation-plan.md` | Gesamt-Workflow |
| 9 | `Remotion Recherche/00-overview-index-v2-1-complete.md` | `.knowledge/index/overview-index-v2.1.md` | Knowledge Map v2.1 |
| 10 | `Remotion Recherche/MASTER-INDEX-ALLE-13-DATEIEN-v1-0.md` | `.knowledge/index/master-index-13-dateien.md` | Master-Index |

---

## 🟢 TEMPLATES (Aktuell - wichtig!)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 11 | `.agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md` | `.agent/templates/briefing-template-v6.1.md` | Aktuelles Template (Kredo-konform) |
| 12 | `.knowledge/templates/EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md` | `.agent/templates/extraction-report-template-v2.md` | Report-Template |
| 13 | `.agent/handover/PROMPT_SUBAGENT_1_SKILL_BADGE_MAPPING_V2.md` | `.agent/templates/prompt-skill-badge-mapping-v2.md` | Agent 1 Prompt (aktualisiert) |
| 14 | `.agent/handover/PROMPT_SUBAGENT_2_REPO_INFRASTRUCTURE_V2.md` | `.agent/templates/prompt-repo-infrastructure-v2.md` | Agent 2 Prompt (aktualisiert) |
| 15 | `.agent/handover/PROMPT_SUBAGENT_V6.1_SELF_BRIEFING.md` | `.agent/templates/prompt-self-briefing-v6.1.md` | Self-Briefing Prompt |

---

## 🟡 LEARNINGS & BEST PRACTICES

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 16 | `.knowledge/project-learnings/LEARNING_V3_REPORT_STRUCTURE.md` | `.knowledge/learnings/v3-report-structure.md` | V3 Best Practices |
| 17 | `.agent/handover/ANALYSIS_V3_VS_MY_WORK_LEARNINGS.md` | `.knowledge/learnings/v3-vs-my-work.md` | Learnings aus Vergleich |
| 18 | `.knowledge/mission/COMPARISON_BADGE_7_ALL_VERSIONS.md` | `.knowledge/learnings/badge-7-comparison-v1-v5.md` | V1-V5 Vergleich |
| 19 | `.knowledge/mission/EVOLUTION_V1_TO_V5_DIFF.md` | `.knowledge/learnings/evolution-v1-to-v5.md` | Evolution Badge 7 |

---

## 🔵 REPORTS (Badge Reports - nur finale Versionen!)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 20 | `.knowledge/mission/EXTRACTION_REPORT_BADGE_7_V5_ULTIMATE.md` | `.knowledge/reports/badge-7-v5-ultimate.md` | Gold Standard Report |
| 21 | `.knowledge/mission/EXTRACTION_REPORT_BADGE_8.md` | `.knowledge/reports/badge-8.md` | Badge 8 (V3 Struktur) |
| 22 | `.knowledge/mission/EXTRACTION_REPORT_BADGE_6.md` | `.knowledge/reports/badge-6.md` | Badge 6 |

**NICHT kopieren:** Badge Reports V1-V4 (veraltet)

---

## 🟠 PROMPTS/TEMPLATES (Aus Recherche - veraltet?)

| # | Quelle | Ziel | Anmerkung |
|:--|:-------|:-----|:----------|
| 23 | `Remotion Recherche/ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1-0.md` | `.agent/templates/orchestrator-setup-gemini-v1.md` | Orchestrator Setup |
| 24 | `Remotion Recherche/SKILL-QUALITY-AUDIT-CHECKLIST-v1-0.md` | `.agent/templates/skill-quality-audit-checklist.md` | Quality Audit |

**Frage:** Sollten die alten AGENT-INITIALIZATION-* Prompts kopiert werden oder sind sie durch V6.1 ersetzt?

---

## 🟡 SPECS (Spezifikationen)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 25 | `specs/audio.md` | `specs/audio.md` | Audio-Spezifikation |
| 26 | `specs/camera.md` | `specs/camera.md` | Camera-Spezifikation |
| 27 | `specs/website.md` | `specs/website.md` | Website-Spezifikation |
| 28 | `specs/VIRON_SYSTEM_ENTRY.md` | `specs/viron-system-entry.md` | System Entry |

---

## 🔵 DOCS (Dokumentation)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 29 | `docs/REPOSITORY_MANIFESTO.md` | `docs/repository-manifesto.md` | Manifest |
| 30 | `docs/HUMAN_OPERATOR_GUIDE.md` | `docs/human-operator-guide.md` | Operator Guide |
| 31 | `docs/TOKEN_BUDGET.md` | `docs/token-budget.md` | Token Management |

---

## ❌ NICHT KOPIEREN (Meine Einschätzung)

| Kategorie | Beispiele | Begründung |
|:----------|:----------|:-----------|
| **Alte Prompts** | `AGENT-INITIALIZATION-CHECKLISTE-SCHNELL-v2-1.md` | Durch V6.1 ersetzt? |
| **Alte Prompts** | `AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md` | Durch V6.1 ersetzt? |
| **Alte Prompts** | `COMPARE-AGENT-PROMPT-TEMPLATE-v1-0.md` | Veraltet? |
| **Temporäre** | `task_recovery*.txt`, `final_skill_comparison.txt` | Temporär |
| **Handover (extern)** | `HANDOVER_TO_NEW_AGENT.md` | Einmal-Handover |
| **Reports (alt)** | Badge Reports V1-V4 | Durch V5/V6/V7 ersetzt |
| **Vergleiche (alt)** | `ANALYSIS_BADGE_6_7_VS_V6.1_IMPROVEMENTS.md` | Analyse erledigt |

---

## 📊 Zusammenfassung Meta-Dateien

| Kategorie | Anzahl | Priorität |
|:----------|:-------|:----------|
| 🔴 Router & Regeln | 5 | MUSS |
| 🟡 Indexe & Navigation | 5 | WICHTIG |
| 🟢 Templates (aktuell) | 5 | SEHR WICHTIG |
| 🟡 Learnings | 4 | WICHTIG |
| 🔵 Reports (final) | 3 | SEHR WICHTIG |
| 🟠 Prompts (Recherche) | 2 | OPTIONAL |
| 🟡 Specs | 4 | WICHTIG |
| 🔵 Docs | 3 | WICHTIG |
| **Gesamt** | **~31 Dateien** | - |

---

## ⚠️ Entscheidungsfragen

1. **Alte AGENT-INITIALIZATION-* Prompts:** Kopieren oder weglassen (durch V6.1 ersetzt)?
2. **Badge Reports V1-V4:** Definitiv weglassen?
3. **Analyse-Dateien (ANALYSIS_*):** Kopieren oder weglassen (Analyse erledigt)?
4. **Task/Implementation:** Kopieren oder neu erstellen im neuen Repo?

---

**Soll ich jetzt beide Agenten deployen, um die Listen zu validieren?**
