# 🎯 ORCHESTRATOR PROMPT: Badge Re-Audit (V4 Final - Ultra Clear)

**Version:** 4.0 Final Edition  
**Mission:** Alle 8 Badges auf V6.1 Standard bringen  
**Ziel-Repo:** `C:\Workspace\Repos\Viron Studio`  
**Credo:** *"Ausführlichkeit bedingt Unmissverständlichkeit"*  
**Approach:** 3-Phasen Workflow mit absolut klaren Pfaden & Deliverables

---

## 🛑 ABSOLUTER START (MANDATORY - KEINE AUSNAHME)

**Bevor du irgendetwas tust, lies diese 3 Dateien:**

| Reihenfolge | Datei | Pfad (Relativ zu Repo-Root) | Warum? |
|:------------|:------|:----------------------------|:-------|
| **1** | System Entry | `specs/viron-system-entry.md` | Verstehe das SYSTEM |
| **2** | Vision | `viron-core/vision.md` | Verstehe die PHILOSOPHIE |
| **3** | Master Workflow | `knowledge/index/master-workflow.md` | Verstehe die STRUKTUR |

**Nach dem Lesen musst du beantworten:**
- Wo liegen Templates? 
- Wo liegen Gold-Standard Reports?
- Wie ist `knowledge/` strukturiert?
- Was ist der Unterschied zwischen `specs/`, `guides/` und `patterns/`?

**Wenn du das nicht beantworten kannst:** STOP. Lese nochmal. Frage nach.

---

## 📁 REPO-STRUKTUR (Kritisch für Navigation)

```
Viron Studio/
│
├── 📄 specs/                      ← BADGE 1, 5 (System Specs)
│   ├── viron-system-entry.md      ← START HERE (Immer!)
│   ├── camera.md
│   ├── audio.md
│   └── website.md
│
├── 📄 viron-core/                 ← BADGE 1, 7 (Core Architektur)
│   ├── vision.md                  ← Philosophie
│   ├── workflow.md                ← Prozesse
│   ├── theme.md                   ← Design System
│   ├── pipeline.md                ← Render Pipeline
│   └── physics.md                 ← Physics Engine
│
├── 📄 knowledge/                  ← ALLE BADGES (Content)
│   ├── index/
│   │   └── master-workflow.md     ← Central Index
│   ├── learnings/                 ← BADGE 4 (Patterns)
│   └── research/                  ← BADGE 2,3,5,6 (Domains)
│       ├── 3d/                    ← Badge 2
│       ├── audio/                 ← Badge 6
│       ├── fx/                    ← Badge 3
│       ├── cloud/                 ← Badge 5
│       └── system/                ← Badge 7
│
├── 📄 guides/                     ← BADGE 1, 6 (Operationell)
│   ├── compositions.md
│   ├── sequencing.md
│   └── viron-button-guide.md
│
├── 📄 patterns/                   ← BADGE 4 (Reusable)
│   ├── BarChart.md
│   ├── Typewriter.md
│   └── WordHighlight.md
│
├── 📁 .agent/handover/            ← TEMPLATES
│   └── SUBAGENT_BRIEFING_TEMPLATE_V6.1.md
│
└── 📁 .knowledge/badge-reports/   ← OUTPUT (Gold-Standard)
    └── EXTRACTION_REPORT_BADGE_8.md
```

---

## 🕸️ BADGE-ABHÄNGIGKEITEN (Kritisch für Batches)

### Die 4 Batches (In dieser Reihenfolge!)

```
BATCH 1 (Parallel - Foundation):
├── Badge 1: Core (specs/, viron-core/, guides/)
└── Badge 4: Design (patterns/, knowledge/learnings/)
    ↓ (beide müssen fertig sein)
    
BATCH 2 (Parallel - Technisch):
├── Badge 2: 3D (knowledge/research/3d/)
├── Badge 3: FX (knowledge/research/fx/)
└── Badge 6: Audio (knowledge/research/audio/, guides/)
    ↓ (alle 3 müssen fertig sein)
    
BATCH 3 (Parallel - Integration):
├── Badge 5: Web (specs/website.md, knowledge/research/cloud/)
└── Badge 7: System (knowledge/research/system/, viron-core/pipeline.md)
    ↓ (beide müssen fertig sein)
    
BATCH 4 (Final - Capstone):
└── Badge 8: AI (Sythesis aller anderen)
```

### Abhängigkeits-Matrix

| Badge | Braucht Input von | Gibt Input an | Pfad-Mapping |
|:------|:------------------|:--------------|:-------------|
| **1 Core** | - | ALL | `specs/`, `viron-core/`, `guides/` |
| **2 3D** | 1 (Time) | 3, 7 | `knowledge/research/3d/` |
| **3 FX** | 1, 2 | 4, 7 | `knowledge/research/fx/` |
| **4 Design** | 1, 3 | 5, 8 | `patterns/`, `knowledge/learnings/` |
| **5 Web** | 1, 4 | 7 | `specs/website.md`, `knowledge/research/cloud/` |
| **6 Audio** | 1 | 7 | `knowledge/research/audio/` |
| **7 System** | 2, 3, 5, 6 | 8 | `knowledge/research/system/`, `viron-core/pipeline.md` |
| **8 AI** | 4, 7 | - | Synthese aller Reports |

---

## 🚀 PHASE 1: TECHNOLOGY RECONNAISSANCE (Agent T)

### 1.1 Mission

Sende **EINEN** Agenten (Agent T) los. Keine 8 Agenten parallel. Nur **EINER**.

### 1.2 Pflichtlektüre für Agent T (IN DIESER REIHENFOLGE!)

| Schicht | Datei | Pfad | Was zu tun? |
|:--------|:------|:-----|:------------|
| **S1** | System Entry | `specs/viron-system-entry.md` | Extrahiere: System-Beschreibung |
| **S1** | Vision | `viron-core/vision.md` | Extrahiere: Architektur-Prinzipien |
| **S1** | Master Workflow | `knowledge/index/master-workflow.md` | Extrahiere: Decision Trees |
| **S2** | Template | `.agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md` | Verstehe: V6.1 Struktur |
| **S2** | Gold-Standard | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_8.md` | Analysiere: 587 Zeilen Referenz |
| **S3** | Alle Specs | `specs/*.md` | Mappe zu Badge |
| **S3** | Alle Guides | `guides/*.md` | Mappe zu Badge |
| **S3** | Alle Patterns | `patterns/*.md` | Mappe zu Badge |
| **S3** | Core Files | `viron-core/*.md` | Mappe zu Badge |
| **S3** | Research | `knowledge/research/**/*.md` | Mappe zu Badge |

### 1.3 Badge-Zuordnungs-Tabelle (MANDATORY Output)

Erstelle diese Tabelle für **JEDE** .md Datei:

```markdown
| Badge | Badge-Name | Quell-Typ | Datei-Pfad | Relevanz | Status |
|:------|:-----------|:----------|:-----------|:---------|:-------|
| 1 | Core | SPECS | specs/viron-system-entry.md | KRITISCH | AKTIV |
| 1 | Core | CORE | viron-core/vision.md | KRITISCH | AKTIV |
| 2 | 3D | RESEARCH | knowledge/research/3d/gltf-loading-optimization.md | HOCH | AKTIV |
| ... | ... | ... | ... | ... | ... |
```

**Relevanz-Stufen:**
- **KRITISCH**: Ohne diese Datei ist der Badge unvollständig
- **HOCH**: Wichtige Unterstützung
- **MITTEL**: Kontext, aber nicht essentiell
- **NIEDRIG**: Randnotiz
- **ARCHIV**: Veraltet

**Quell-Typen:**
- SPECS, CORE, GUIDES, PATTERNS, RESEARCH, LEARNINGS

### 1.4 Agent T Deliverables (4 Dateien MANDATORY)

| Datei | Pfad | Inhalt |
|:------|:-----|:-------|
| **Reconnaissance Report** | `REPORT_TECHNOLOGY_RECONNAISSANCE.md` | Executive Summary, Methodik, Findings |
| **Badge-Zuordnung** | `BADGE_DATEI_ZUORDNUNG.md` | Tabelle (siehe oben) |
| **Cross-Reference Map** | `CROSS_REFERENCE_MAP.md` | Welche Dateien verbinden Badges? |
| **Gaps & Recommendations** | `GAPS_AND_RECOMMENDATIONS.md` | Was fehlt? Was ist redundant? |

---

## 🗂️ PHASE 2: MASTERPLANUNG (Orchestrator allein)

### 2.1 Validierung von Agent T's Ergebnissen

Prüfe:
- [ ] Alle 8 Badges haben mindestens 5 Dateien zugeordnet?
- [ ] Badge 1 hat die meisten Dependencies (Foundation)?
- [ ] Keine Datei ist doppelt zugeordnet (außer beabsichtigt)?

### 2.2 Erstelle BADGE_REAUDIT_MASTERPLAN.md

Struktur:
```markdown
# BADGE RE-AUDIT MASTERPLAN

## Überblick
| Phase | Badges | Abhängigkeiten | Status |
|:------|:-------|:---------------|:-------|
| 1 | 1, 4 | - | PENDING |
| 2 | 2, 3, 6 | Warte auf 1 | PENDING |
| 3 | 5, 7 | Warte auf 1,2,3,6 | PENDING |
| 4 | 8 | Warte auf ALLE | PENDING |

## Agenten-Assignments (pro Badge)
| Badge | Input-Dateien | Output-Dateien | Parent-Badges | Child-Badges |
|:------|:--------------|:---------------|:--------------|:-------------|
| 1 | specs/*, viron-core/*, guides/* | EXTRACTION_REPORT_BADGE_1.md | - | 2,3,4,5,6,7,8 |
| ... | ... | ... | ... | ... |

## Quality Gates
### Gate 1 (vor Batch 2):
- [ ] Badge 1 hat 500+ Zeilen
- [ ] Badge 1 hat Time-System dokumentiert
- [ ] Badge 4 hat Theme-System dokumentiert
```

---

## 👥 PHASE 3: PARALLEL BADGE-PROCESSING (8 Agents)

### 3.1 Universelles Briefing pro Agent

**Jeder Agent bekommt exakt dieses Briefing:**

```markdown
═══════════════════════════════════════════════════════════════════
BADGE AGENT BRIEFING - BADGE [X]: [NAME]
═══════════════════════════════════════════════════════════════════

## DEINE PFLICHTLEKTÜRE (IN DIESER REIHENFOLGE!)

1. .agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md
   → Template-Struktur

2. .knowledge/badge-reports/EXTRACTION_REPORT_BADGE_8.md
   → Gold-Standard Referenz

3. [Liste aus MASTERPLAN - deine Input-Dateien]

## DEINE SCHREIB-AUFGABE

Erstelle:
1. .knowledge/badge-briefings/SUBAGENT_BRIEFING_BADGE_[X]_V6.1.md
2. .knowledge/badge-reports/EXTRACTION_REPORT_BADGE_[X]_FINAL.md

## QUALITÄTS-STANDARDS (MANDATORY)

- [ ] 500+ Zeilen
- [ ] 6-8 "THE X" Sections
- [ ] 10+ 🔑 Die Zahl
- [ ] Statistik-Tabelle ganz oben
- [ ] Verwerfen-Tabelle mit ≥3 Einträgen
- [ ] Alle Dateien als Hyperlinks [text](../../path)
- [ ] Kontext-Labels [V1/V2/V3/V4/new]
- [ ] Cross-References zu Parent-Badges

## DEADLINE: [Zeitstempel + 2h]

Bei Verzug oder Unklarheit: SOFORT melden!
═══════════════════════════════════════════════════════════════════
```

### 3.2 Badge-Spezifische Eingänge (aus MASTERPLAN)

| Badge | Input-Pfade (aus Repo-Struktur) | Output-Pfade |
|:------|:--------------------------------|:-------------|
| **1 Core** | `specs/viron-system-entry.md`, `viron-core/vision.md`, `guides/compositions.md`, `guides/sequencing.md` | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_1.md` |
| **2 3D** | `knowledge/research/3d/gltf-loading-optimization.md`, `knowledge/research/3d/lighting-caustics-volumetric.md` | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_2.md` |
| **3 FX** | `knowledge/research/fx/bloom-selective.md`, `knowledge/research/fx/depth-of-field.md`, `knowledge/research/fx/chromatic-grain.md`, `knowledge/research/fx/postprocessing-overview.md` | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_3.md` |
| **4 Design** | `patterns/*.md`, `knowledge/learnings/*.md`, `viron-core/theme.md` | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_4.md` |
| **5 Web** | `specs/website.md`, `knowledge/research/cloud/aws-lambda-renderfarming.md` | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_5.md` |
| **6 Audio** | `guides/viron-button-guide.md`, `knowledge/research/audio/fft-frequenzspektren.md` | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_6.md` |
| **7 System** | `knowledge/research/system/*.md`, `viron-core/pipeline.md`, `viron-core/workflow.md` | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_7.md` |
| **8 AI** | Alle vorherigen Reports + Synergy-Analyse | `.knowledge/badge-reports/EXTRACTION_REPORT_BADGE_8_FINAL.md` |

---

## ✅ SUCCESS METRICS

### Quantitativ:
- [ ] 8 Reports erstellt (je 500+ Zeilen)
- [ ] 80+ 🔑 Die Zahl gesamt
- [ ] Alle Pfade korrekt (keine Broken Links)

### Qualitativ:
- [ ] Badge 1 definiert Time-System für alle
- [ ] Badge 4 definiert Theme-System
- [ ] Cross-References zwischen verbundenen Badges
- [ ] Keine Redundanzen
- [ ] V6.1 Struktur durchgängig (THE X, Kontext-Labels, 🔑)

---

## 📞 RÜCKMELDUNGS-PROTOKOLL

### Nach jeder Phase melden:

**Phase 1:**
```
PHASE 1 COMPLETE
Agent T hat [X] Dateien analysiert
Erstellt: REPORT_TECHNOLOGY_RECONNAISSANCE.md
Erstellt: BADGE_DATEI_ZUORDNUNG.md
Bereit für Phase 2.
```

**Phase 2:**
```
PHASE 2 COMPLETE
Masterplan erstellt: BADGE_REAUDIT_MASTERPLAN.md
4 Batches geplant
Bereit für Phase 3.
```

**Pro Batch:**
```
BATCH [X] COMPLETE
Badge [A]: [Zeilen] Zeilen, [Y] 🔑 Die Zahl ✅
Badge [B]: [Zeilen] Zeilen, [Z] 🔑 Die Zahl ✅
Quality Gate: [X]/9 erfüllt
Bereit für nächsten Batch.
```

### Bei Blockern:
```
[BATCH/PHASE] BLOCKED: [Genauer Grund]
Benötige Entscheidung: [Option A] oder [Option B]
```

---

**END OF PROMPT**

**WICHTIG:** Dieser Prompt funktioniert IM NEUEN REPO. Alle Pfade sind explizit angegeben. Keine Rätsel mehr. Keine Suche nach Dateien. Starte mit `specs/viron-system-entry.md` und folge dem Plan.
