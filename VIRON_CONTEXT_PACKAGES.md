# 📦 VIRON CONTEXT PACKAGES (Modular Mandatory Reading)

> **Prinzip:** Nicht jede Aufgabe braucht alles. Wähle das passende Paket für deinen Kontext.

---

## 🎯 Schnellauswahl

| Wenn du... | Dann nutze... |
|:-----------|:--------------|
| Regeln optimieren/strukturieren | **Paket 1: Rules & Governance** |
| Ein neues Badge erstellen | **Paket 2: Badge Template** |
| Technische Architektur entscheiden | **Paket 3: Technical Deep Dive** |
| Repo-Migration durchführen | **Paket 4: Migration & Indexing** |
| Neu hier (komplettes Onboarding) | **Paket 5: Full Boot Sequence** |

---

## 📦 Paket 1: RULES & GOVERNANCE
**Für:** Regel-Optimierung, Konsolidierung, Workflow-Änderungen  
**Ohne Skill:** Nein, nur Repo-Dateien

### Core Rules (MUST)
1. `.agent/AGENTS.md` - Master Router & Scenario-Triggern
2. `.agent/RULES_CORE.md` - TIER 1 MANDATORY (No-CSS, STOP-Signal)
3. `.agent/RULES_WORKFLOW.md` - Double-Turn-Lock, Badge Cycle
4. `VIRON-Konservierungs-Manifest` (aus task.md Zeilen 13-22)

### Context (SHOULD)
5. `.agent/RULES_TECHNICAL.md` - Design-DNA, Hardware Laws
6. `ANALYSIS_BRIEFING_COMPARISON_6_7_8.md` - Template-Evolution Learnings
7. `DECISION_LOG.md` - Warum wurde was entschieden?

---

## 📦 Paket 2: BADGE TEMPLATE (Sub-Agent Briefing)
**Für:** Neues Badge erstellen, Template verbessern, Extraction Reports  
**Ohne Skill:** Ja, aber Skill-Check empfohlen

### Template Foundation (MUST)
1. `SUBAGENT_BRIEFING_TEMPLATE_V6.1.md` - Aktuelles Template mit Kredo
2. `EXTRACTION_REPORT_BADGE_8.md` - Gold-Standard Beispiel (587 Zeilen)
3. `LEARNING_V3_REPORT_STRUCTURE.md` - Was funktioniert?

### Process Context (SHOULD)
4. `PROMPT_SUBAGENT_1_SKILL_BADGE_MAPPING_V2.md` - Skill-Filter Prozess
5. `ANALYSIS_BADGE_6_7_VS_V6.1_IMPROVEMENTS.md` - Was wurde verbessert?

### Skill Reference (IF APPLICABLE)
6. `.agent/skills/remotion-core/SKILL.md` - Standard-Referenz
7. `remotion-best-practices/` (Global) - Nur für technische Badges

---

## 📦 Paket 3: TECHNICAL DEEP DIVE
**Für:** Architektur-Entscheidungen, Technische Implementierung  
**Ohne Skill:** Nein, Skill ist Pflicht

### Viron Architecture (MUST)
1. `viron-core/vision.md` - Architektur-Vision
2. `00-master-workflow-2026-integration.md` - Workflow-Wahrheit
3. `00-overview-index-v2-1-complete.md` - Master-Index

### Skill Foundation (MUST)
4. `.agent/skills/remotion-core/SKILL.md` - Lokaler Skill-Pointer
5. `remotion-best-practices/` (Global) - Kompletter Skill-Baum

### Implementation Context (SHOULD)
6. `specs/VIRON_SYSTEM_ENTRY.md` - System-Spezifikation
7. `RECHERCHE_DATEIEN_INDEX.md` - 60 Dateien kategorisiert

---

## 📦 Paket 4: MIGRATION & INDEXING
**Für:** Dateien verschieben, Repo-Struktur ändern, Archivierung  
**Ohne Skill:** Ja, kein Skill nötig

### Migration Tools (MUST)
1. `VIRON_STUDIO_REPO_MIGRATION_PLAN.md` - Strategie
2. `MUSS_KOPIEREN_LISTE.md` - 30 Content-Dateien
3. `META_DATEIEN_MUSS_KOPIEREN.md` - 31 Meta-Dateien
4. `kopiere_zu_viron_studio.ps1` - PowerShell-Script Referenz

### Indexing (SHOULD)
5. `RECHERCHE_DATEIEN_INDEX.md` - Alle Recherche-Dateien
6. `NICHT_KOPIERT_INDEX.md` - Was wurde nicht migriert?

---

## 📦 Paket 5: FULL BOOT SEQUENCE (Onboarding)
**Für:** Neue Agents, kompletter Einstieg  
**Ohne Skill:** Nein, alles wird benötigt

### Phase 1: Identity & Governance (MUST)
1. `HANDOVER_TO_NEW_AGENT.md` - Willkommen
2. `QUICKSTART_VIRON_AUDITOR.md` - Schnellstart
3. `THE_VIRON_AESTHETIC_MANIFESTO.md` - Design-Philosophie
4. `USER_GOVERNANCE_PROTOCOL.md` - Governance-Regeln

### Phase 2: Core Knowledge (MUST)
5. `viron-core/vision.md` - Vision
6. `00-master-workflow-2026-integration.md` - Workflow
7. `00-overview-index-v2-1-complete.md` - Index
8. `.agent/skills/remotion-core/SKILL.md` - Skill-Referenz

### Phase 3: Rules & Router (MUST)
9. `.agent/AGENTS.md` - Entry Point
10. `.agent/RULES_CORE.md` - Kern-Regeln
11. `.agent/RULES_WORKFLOW.md` - Prozess-Regeln

### Phase 4: Historical Context (SHOULD)
12. `WALKTHROUGH_SESSION_6.md` - Was passierte in Session 6?
13. `task.md` - Aktueller Stand (mit Inhaltsverzeichnis)
14. `implementation_plan.md` - Grobe Roadmap

---

## 🔄 Skill-Loading Strategie

### Wann brauche ich den Global Skill?
| Szenario | Lokaler Skill | Global Skill |
|:---------|:-------------|:-------------|
| Regeln optimieren | Nein | Nein |
| Badge erstellen (generisch) | Ja | Optional |
| Badge 7/8 (System/Cloud) | Ja | Ja |
| Technische Architektur | Ja | Ja |
| Neue Komponente erstellen | Ja | Ja |
| Dokumentation schreiben | Nein | Nein |

### Skill-Loading Befehl
```
Lade rekursiv: C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
```

---

## 📝 Proof-of-Reading (PoR) Format

Nach dem Lesen eines Pakets, dokumentiere:

```markdown
**Paket:** [Name]
**Agent:** [Dein Name]
**Zeit:** [Datum]
**Key Learnings:**
1. [Wichtigste Erkenntnis]
2. [Zweitwichtigste]
3. [Drittens]

**Offene Fragen:**
- [Falls vorhanden]
```

---

## 🗂️ Änderungshistorie

| Version | Datum | Änderung |
|:--------|:------|:---------|
| 1.0 | 2026-02-02 | Initiale Erstellung basierend auf Forensic Reboot Learnings |

---

**Hinweis:** Diese Pakete ersetzen den historischen "Forensic Reboot" (siehe task.md Zeile 270-307). 
Für historische Referenz: Der Reboot ist auf COMPLETED gesetzt, aber die Prinzipien leben hier weiter.
