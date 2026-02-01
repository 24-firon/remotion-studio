# 📦 ARCHIVE_RECOMMENDATIONS.md

**Version:** 1.0  
**Erstellt:** 2026-02-01  
**Basierend auf:** RULE_FILE_ANALYSIS_REPORT.md + RULES_VALIDATION_REPORT.md  
**Scope:** Empfehlungen für Archivierung nach Regel-Konsolidierung

---

## 🎯 Zusammenfassung

Nach der Konsolidierung von 120+ Regel-Dateien in 5 zentrale Router-Dateien können folgende Dateien archiviert werden:

| Kategorie | Anzahl | Status |
|-----------|--------|--------|
| **Vollständig integriert** | 12 | ✅ Archivierbar |
| **Teilweise integriert** | 8 | ⚠️ Review erforderlich |
| **Legacy/Veraltet** | 15 | ✅ Archivierbar |
| **Beibehalten** | 85+ | 🛡️ Aktiv |

---

## 1. Vollständig Integrierte Dateien (Archivierbar)

Diese Dateien sind vollständig in die neuen 5 Router-Dateien übernommen worden:

| Datei | Grund | Archiv-Pfad | Priorität |
|-------|-------|-------------|-----------|
| `.agent/rules/RULE_FILE_LINKING.md` | Vollständig in RULES_CORE.md §1.4 integriert | `.agent/_archive/rules/` | 🔴 Hoch |
| `.agent/handover/meta/RULE_GIT_SYNC_PROTOCOL.md` | Vollständig in RULES_WORKFLOW.md §1 integriert | `.agent/_archive/meta/` | 🔴 Hoch |
| `.agent/handover/meta/RULE_TOKEN_ECONOMY.md` | Vollständig in RULES_CORE.md §2.1 integriert | `.agent/_archive/meta/` | 🔴 Hoch |
| `USER_GOVERNANCE_PROTOCOL.md` (Root) | STOP-Signal + Communication Standards in RULES_CORE.md übernommen | `_archive/governance/` | 🟡 Mittel |
| `src/PROJECT_RULES_LIGHTING.md` | Vollständig in RULES_TECHNICAL.md §2 integriert | `src/_archive/` | 🟡 Mittel |
| `.agent/handover/meta/VIRON_HARDWARE_LAWS.md` | Vollständig in RULES_TECHNICAL.md §3 integriert | `.agent/_archive/meta/` | 🟡 Mittel |

**Hinweis:** Die Original-Dateien sollten im Archiv mit `ARCHIVED_` Präfix versehen werden, z.B.:
- `ARCHIVED_RULE_FILE_LINKING.md`
- `ARCHIVED_RULE_GIT_SYNC_PROTOCOL.md`

---

## 2. Teilweise Integrierte Dateien (Review Erforderlich)

Diese Dateien sind teilweise übernommen, enthalten aber zusätzliche Details:

| Datei | Status | Empfohlene Aktion |
|-------|--------|-------------------|
| `gemini.md` (Root) | 80% in RULES_CORE.md integriert | 🟡 **REFERENZ BEIBEHALTEN** - Master Source of Truth |
| `THE_VIRON_AESTHETIC_MANIFESTO.md` | Design-DNA in RULES_TECHNICAL.md §1 integriert | 🟢 **BEIBEHALTEN** - Detaillierte Design-Philosophie |
| `WHITELIST.md` | In RULES_CORE.md §2.4 integriert | 🟡 **BEIBEHALTEN** - Wird von Agents als Checkliste genutzt |
| `BLACKLIST.md` | In RULES_CORE.md §2.5 integriert | 🟡 **BEIBEHALTEN** - Sicherheits-relevant |
| `PROJECT_RULES.md` (Root) | Referenziert in AGENTS.md | 🟢 **BEIBEHALTEN** - Knowledge Architecture Hub |
| `DECISION_LOG.md` | Referenziert in RULES_WORKFLOW.md | 🟢 **BEIBEHALTEN** - Governance History |

**Empfehlung:** Diese Dateien sollten NICHT archiviert werden, sondern als Referenzdokumente beibehalten werden. Sie enthalten zusätzliche Kontext-Informationen, die für tieferes Verständnis notwendig sind.

---

## 3. Legacy / Veraltete Dateien (Archivierbar)

Diese Dateien sind veraltet oder durch neuere Versionen ersetzt:

| Datei | Grund | Archiv-Pfad |
|-------|-------|-------------|
| `.agent/handover/PROMPT_V3_BEST_PRACTICES.md` | V5 aktiv, V3 veraltet | `.agent/_archive/legacy/` |
| `Remotion Recherche/15_MIGRATION_CORE_VIRON_UPLOADS.md` | Migration abgeschlossen | `Remotion Recherche/_archive/` |
| `Remotion Recherche/16_ARCHIVE_Standard_Audio_Auphonic.md` | Archiviertes Standard-Verfahren | `Remotion Recherche/_archive/` |
| `Remotion Recherche/17_ARCHIVE_Standard_AutoEdit_Whisper.md` | Archiviertes Standard-Verfahren | `Remotion Recherche/_archive/` |
| `Remotion Recherche/18_ARCHIVE_Standard_Caption_Engine.md` | Archiviertes Standard-Verfahren | `Remotion Recherche/_archive/` |
| `Remotion Recherche/19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md` | Archiviertes Standard-Verfahren | `Remotion Recherche/_archive/` |
| `Remotion Recherche/20_ARCHIVE_Standard_Dynamic_Data_Supabase.md` | Archiviertes Standard-Verfahren | `Remotion Recherche/_archive/` |
| `Remotion Recherche/21_ARCHIVE_Standard_Agent_Execution.md` | Archiviertes Standard-Verfahren | `Remotion Recherche/_archive/` |
| `GEMINI_UPDATE.md` | Einmaliges Update, veraltet | `_archive/` |
| `HISTORY_LOG.md` | Historische Logs | `_archive/` |
| `HANDOVER_Viron_Cube.md` | Spezifischer Handover, abgeschlossen | `_archive/handovers/` |
| `HANDOVER_SilverV2.md` | Spezifischer Handover, abgeschlossen | `_archive/handovers/` |
| `task_recovery.txt` | Einmalige Recovery-Datei | `_archive/recovery/` |
| `task_recovery_bdc75d9.txt` | Einmalige Recovery-Datei | `_archive/recovery/` |

---

## 4. Dateien die BEIBEHALTEN werden müssen

Diese Dateien sind NICHT archivierbar und müssen aktiv bleiben:

### 4.1 Kritische Workflow-Dateien

| Datei | Grund |
|-------|-------|
| `.agent/handover/task.md` | Aktive Session-Memory |
| `.agent/handover/implementation_plan.md` | Aktive Implementierungs-Planung |
| `.agent/workflows/orchestrate-badge-cycle.md` | Aktiver Workflow |
| `.agent/workflows/deploy-subagent-mission.md` | Aktiver Workflow |
| `.agent/workflows/release.md` | Aktiver Workflow |
| `.agent/workflows/session-close.md` | Aktiver Workflow |
| `.agent/workflows/orchestrator-self-audit.md` | Aktiver Workflow |

### 4.2 Handover und Meta-Dateien

| Datei | Grund |
|-------|-------|
| `HANDOVER_TO_NEW_AGENT.md` | Aktives Onboarding-Dokument |
| `WALKTHROUGH_SESSION_6.md` | Referenz für historische Entscheidungen |
| `THE_NEXT_STEPS.md` | Aktive Agenda |
| `QUICKSTART_VIRON_AUDITOR.md` | Aktive Referenz |
| `.agent/handover/meta/THE_FORENSIC_MINDSET.md` | IP vs. Boilerplate Unterscheidung |
| `.agent/handover/meta/PATTERN_REMOTION_LAMBDA_HYBRID.md` | Aktive Architektur-Patterns |
| `.agent/handover/meta/PATTERN_SYNERGY_AUDIO_REACTIVITY.md` | Aktive Architektur-Patterns |

### 4.3 Skills

| Datei | Grund |
|-------|-------|
| `.agent/skills/remotion-best-practices/SKILL.md` | Master Skill - Single Source of Truth |
| `.agent/skills/remotion-core-skill-source/SKILL.md` | Skill-Referenz |
| `.agent/skills/*/SKILL.md` | Alle aktiven Skills |

### 4.4 Spezifikationen und Patterns

| Datei | Grund |
|-------|-------|
| `specs/audio.md` | Aktive Spezifikation |
| `specs/camera.md` | Aktive Spezifikation |
| `specs/website.md` | Aktive Spezifikation |
| `specs/VIRON_SYSTEM_ENTRY.md` | Aktive Spezifikation |
| `patterns/BarChart.md` | Aktives Code-Pattern |
| `patterns/Typewriter.md` | Aktives Code-Pattern |
| `patterns/WordHighlight.md` | Aktives Code-Pattern |
| `src/learnings/*.md` | Alle Learning-Dokumente |

### 4.5 Remotion Recherche (Aktiv)

| Datei | Grund |
|-------|-------|
| `Remotion Recherche/00-master-workflow-2026-integration.md` | Master Workflow |
| `Remotion Recherche/00-overview-index-v2-1-complete.md` | Workflow Übersicht |
| `Remotion Recherche/AGENT-INITIALIZATION-*.md` | Aktive Initialisierungs-Guides |
| `Remotion Recherche/*-workflow-*.md` | Aktive Workflow-Dokumente |
| `Remotion Recherche/SUB-AGENT-DELEGATION-MATRIX-v1-0.md` | Aktive Delegations-Matrix |

---

## 5. Archiv-Struktur Empfehlung

```
_agent/
├── _archive/
│   ├── README.md                    # Erklärung der Archivierung
│   ├── rules/
│   │   ├── ARCHIVED_RULE_FILE_LINKING.md
│   │   └── ARCHIVED_RULE_FILE_LINKING.meta  # Metadata: Wann, Warum
│   ├── meta/
│   │   ├── ARCHIVED_RULE_GIT_SYNC_PROTOCOL.md
│   │   ├── ARCHIVED_RULE_TOKEN_ECONOMY.md
│   │   └── ARCHIVED_VIRON_HARDWARE_LAWS.md
│   └── legacy/
│       └── ARCHIVED_PROMPT_V3_BEST_PRACTICES.md

Remotion Recherche/
├── _archive/
│   ├── 15_MIGRATION_CORE_VIRON_UPLOADS.md
│   ├── 16_ARCHIVE_Standard_Audio_Auphonic.md
│   ├── 17_ARCHIVE_Standard_AutoEdit_Whisper.md
│   ├── 18_ARCHIVE_Standard_Caption_Engine.md
│   ├── 19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md
│   ├── 20_ARCHIVE_Standard_Dynamic_Data_Supabase.md
│   └── 21_ARCHIVE_Standard_Agent_Execution.md

_archive/                           # Root-Level Archiv
├── governance/
│   └── ARCHIVED_USER_GOVERNANCE_PROTOCOL.md
├── handovers/
│   ├── ARCHIVED_HANDOVER_Viron_Cube.md
│   └── ARCHIVED_HANDOVER_SilverV2.md
└── recovery/
    ├── ARCHIVED_task_recovery.txt
    └── ARCHIVED_task_recovery_bdc75d9.txt
```

---

## 6. Archiv-Metadata Format

Für jede archivierte Datei sollte eine `.meta` Datei erstellt werden:

```json
{
  "original_path": ".agent/rules/RULE_FILE_LINKING.md",
  "archived_date": "2026-02-01",
  "archived_by": "Code Agent",
  "reason": "Vollständig in RULES_CORE.md §1.4 integriert",
  "new_reference": ".agent/RULES_CORE.md",
  "content_integrated": true,
  "retention_years": 2,
  "delete_after": "2028-02-01"
}
```

---

## 7. Archivierungs-Prozess

### Schritt 1: Vorbereitung
- [ ] Backup des gesamten Repository erstellen
- [ ] Liste aller zu archivierenden Dateien finalisieren

### Schritt 2: Archiv-Ordner erstellen
- [ ] `_archive/` Ordnerstruktur erstellen
- [ ] `.meta` Template erstellen

### Schritt 3: Dateien verschieben
- [ ] Dateien in entsprechende Archiv-Ordner verschieben
- [ ] `ARCHIVED_` Präfix hinzufügen
- [ ] `.meta` Dateien für jede Datei erstellen

### Schritt 4: Links aktualisieren
- [ ] Alle Referenzen in aktiven Dateien auf neue Pfade aktualisieren
- [ ] Redirect-Hinweise in Archiv-Dateien hinzufügen

### Schritt 5: Dokumentation
- [ ] `ARCHIVE_INDEX.md` mit vollständiger Liste erstellen
- [ ] TEAM über Archivierung informieren

---

## 8. Archiv-Policy

### 8.1 Aufbewahrungsfristen

| Typ | Aufbewahrungsfrist |
|-----|-------------------|
| Vollständig integrierte Regeln | 2 Jahre |
| Legacy/Veraltene Standards | 1 Jahr |
| Einmalige Audit-Reports | 6 Monate |
| Recovery-Dateien | 3 Monate |

### 8.2 Lösch-Kriterien

- Nach Ablauf der Aufbewahrungsfrist
- Wenn keine Referenzen mehr in aktiven Dateien existieren
- Nach expliziter Genehmigung durch Orchestrator

### 8.3 Keine Archivierung

- Dateien mit `MANDATORY` Status
- Aktive Workflow-Dateien
- Skill-Dateien
- Aktive Spezifikationen

---

## 9. Zusammenfassung der Empfehlungen

| Aktion | Anzahl | Priorität |
|--------|--------|-----------|
| **Sofort archivieren** | 12 Dateien | 🔴 Hoch |
| **Nach Review archivieren** | 8 Dateien | 🟡 Mittel |
| **Beibehalten** | 85+ Dateien | 🛡️ Kritisch |
| **Löschen nach Frist** | 15 Dateien | 🟢 Niedrig |

**Wichtig:** Die Archivierung sollte schrittweise erfolgen und nach jeder Phase validiert werden, um sicherzustellen, dass keine kritischen Informationen verloren gehen.

---

**Ende der Archiv-Empfehlungen**

_Erstellt von: Code Agent_  
_Datum: 2026-02-01_  
_Basiert auf: RULE_FILE_ANALYSIS_REPORT.md, RULES_VALIDATION_REPORT.md_
