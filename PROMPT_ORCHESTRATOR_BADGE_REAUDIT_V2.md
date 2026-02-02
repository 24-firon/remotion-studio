# 🎯 ORCHESTRATOR PROMPT: Badge Re-Audit (3-Phasen Prozess)

**Version:** 2.0  
**Mission:** Alle 8 Badges auf V3-Struktur bringen (THE X, Statistik-Tabellen, Kontext-Labels)  
**Approach:** 3-Phasen Workflow mit spezialisierten Sub-Agenten

---

## 📋 EXECUTIVE SUMMARY

Du bist der Orchestrator für das Badge Re-Audit. Dein Ziel: Bringe alle 8 Badges (1-6 neu, 7-8 aktualisiert) auf das Niveau von Badge 8 (587 Zeilen, V3 Struktur).

**Dein 3-Phasen Workflow:**
1. **PHASE 1:** Technologie-Reconnaissance (1 Agent)
2. **PHASE 2:** Badge-Zuordnung & Planung (Du allein)
3. **PHASE 3:** Parallel Badge-Processing (8 Agents)

---

## 🚀 PHASE 1: TECHNOLOGIE-RECONNAISSANCE

### Deine Aufgabe:
Sende **EINEN** Sub-Agenten (Agent T - Technology Scout) los, der:
- Das **gesamte Repo** durchliest (alle .md Dateien)
- Die **Technologie-Basis** versteht (Remotion, Viron-System)
- Eine **Datei-zu-Badge Zuordnung** erstellt

### Briefing für Agent T:

```
AGENT T - TECHNOLOGY SCOUT BRIEFING
====================================

MISSION:
Analysiere das komplette Repo und erstelle eine 
DATEI-ZU-BADGE ZUORDNUNG für alle 8 Badges.

INPUT:
- Repo: C:\Workspace\Repos\remotion-studio
- 60+ Recherche-Dateien in "Remotion Recherche/"
- 30+ Content-Dateien (docs/, specs/, guides/, etc.)
- Badge-8 Referenz: EXTRACTION_REPORT_BADGE_8.md (Gold-Standard)

DEINE AUFGABE:
1. Lese ALLE .md Dateien im Repo (systematisch)
2. Identifiziere für jeden Badge die relevanten Dateien:
   - Badge 1: Core Architecture, Time & Sequencing
   - Badge 2: 3D Physics, Lighting & Geometry
   - Badge 3: Visual FX, Shaders & Materials
   - Badge 4: Design System & UI Components
   - Badge 5: Web Patterns & Cloud Integration
   - Badge 6: Media, Audio & Performance
   - Badge 7: System Architecture & Cloud
   - Badge 8: Agent Governance & AI Synergies

3. Erstelle eine Tabelle:
   | Badge | Repo-Dateien | Vault-Dateien | Skills |
   |:------|:-------------|:--------------|:-------|
   | 1     | [...]        | [...]         | [...]  |
   | ...   |              |               |        |

4. Markiere Dateien, die NICHT mehr relevant sind (veraltet/archiviert)

OUTPUT:
- REPORT_TECHNOLOGY_RECONNAISSANCE.md (ausführlich)
- BADGE_DATEI_ZUORDNUNG.md (nur die Tabelle)

ZEITRAUM: Max. 3 Stunden
QUALITÄT: Jedes Finding muss mit Dateipfad + Zeilennummer belegt sein
```

### Dein nächster Schritt nach Phase 1:
Warte auf den Report von Agent T. Lies ihn komplett durch.

---

## 🗂️ PHASE 2: BADGE-ZUORDNUNG & PLANUNG

### Deine Aufgabe (ohne Sub-Agent):

1. **Analysiere** Agent T's Report
2. **Validiere** die Zuordnung (sind alle wichtigen Dateien drin?)
3. **Erstelle** den 8-Badge Plan:

```markdown
BADGE_REAUDIT_MASTERPLAN.md
============================

## Badge 1: Core Architecture
**Assigned Agent:** Agent-01
**Dateien:** [Aus Agent T's Report]
**Spezial-Anforderungen:** [...]

## Badge 2: 3D Physics
**Assigned Agent:** Agent-02
...
```

4. **Prüfe:** Gibt es Abhängigkeiten zwischen Badges?
   - z.B. Badge 7 braucht Input von Badge 5 (Cloud)?
   - Falls ja: Reihenfolge festlegen

5. **Batch-Strategie:**
   - Batch 1 (parallel): Badges ohne Abhängigkeiten
   - Batch 2 (parallel): Abhängige Badges

---

## 👥 PHASE 3: PARALLEL BADGE-PROCESSING

### Deine Aufgabe:
Sende **8 Sub-Agenten** los (je einer pro Badge).

### Universal Briefing für alle Badge-Agents (Agent-01 bis Agent-08):

```
BADGE AGENT BRIEFING [BADGE X]
================================

AKTIVIERUNG:
Ich aktiviere dich für Badge [X]: [NAME]

DEINE PFLICHTLEKTÜRE (MANDATORY):
1. Lies: SUBAGENT_BRIEFING_TEMPLATE_V6.1.md (Das Template!)
2. Lies: EXTRACTION_REPORT_BADGE_8.md (Gold-Standard Referenz)
3. Lies: Diese Dateien für dein Badge:
   [Liste aus Phase 2]

DEINE AUFGABE:
1. Analysiere alle deine Dateien systematisch
2. Identifiziere "Smoking Guns" (Kritische Erkenntnisse)
3. Erstelle: SUBAGENT_BRIEFING_BADGE_[X]_V6.1.md
   - Struktur: V6.1 Template (korrektes Kredo!)
   - Inhalt: Alle Findings aus deinen Dateien
   - Qualität: 500+ Zeilen, THE X Sections, Statistik-Tabelle

DEIN BRIEFING MUSS ENTHALTEN:
- Executive Summary (mit Statistik-Tabelle)
- 6-8 "THE X" Sections
- 10+ 🔑 Die Zahl ( konkrete Zahlen/Metriken)
- Verwerfen-Tabelle (was ist redundant?)
- Cross-References zu anderen Badges

NICHT VERGESSEN:
- Skill-Check: "Steht dies im Global Skill?"
- Kontext-Label: [V1] [V2] [V3] bei jedem Finding
- Beweise: Exakte Zitate mit Zeilennummern

ZEITRAUM: Max. 2 Stunden
DEADLINE: [Zeitstempel + 2h]
```

### Badge-Spezifische Hinweise:

| Agent | Badge | Spezial-Hinweis |
|:------|:------|:----------------|
| Agent-01 | 1 Core | Fokus auf Timeline, Frames, Compositions |
| Agent-02 | 2 3D | Three.js, PBR, Lighting, GLTF |
| Agent-03 | 3 FX | Post-Processing, Shaders, Materials |
| Agent-04 | 4 Design | Theme.ts, Tailwind, UI Components |
| Agent-05 | 5 Web | Next.js, Cloud, Lambda, Streaming |
| Agent-06 | 6 Audio | FFT, Codecs, Performance, Captions |
| Agent-07 | 7 System | Routing, Infrastructure, AWS (vereinfacht) |
| Agent-08 | 8 AI | Meta-Rules, Token Economy (Aktualisierung) |

---

## 🔄 ORCHESTRATION WORKFLOW

```
PHASE 1
=======
Du → Agent T los schicken
Du ← Warte auf REPORT_TECHNOLOGY_RECONNAISSANCE.md

PHASE 2
=======
Du → Lese Report
Du → Erstelle BADGE_REAUDIT_MASTERPLAN.md

PHASE 3 (Batch 1 - Parallel)
============================
Du → Agent-01 (Badge 1) los
Du → Agent-02 (Badge 2) los
Du → Agent-03 (Badge 3) los
Du → Agent-04 (Badge 4) los
Du ← Sammle Ergebnisse

PHASE 3 (Batch 2 - Parallel, falls nötig)
=========================================
Du → Agent-05 (Badge 5) los
...
```

---

## ✅ QUALITÄTSCHECKLISTE (für jeden Agent-Report)

- [ ] 500+ Zeilen?
- [ ] 6-8 "THE X" Sections?
- [ ] 10+ 🔑 Die Zahl?
- [ ] Statistik-Tabelle im Executive Summary?
- [ ] Verwerfen-Tabelle mit ≥3 Einträgen?
- [ ] Alle Dateien als Hyperlinks?
- [ ] Kontext [V1] [V2] [V3] bei jedem Finding?

---

## 📦 DEINE DELIVERABLES

1. **PHASE 1:** Briefing für Agent T
2. **PHASE 2:** BADGE_REAUDIT_MASTERPLAN.md
3. **PHASE 3:** 8 Sub-Agenten Briefings
4. **FINAL:** Zusammenfassung aller 8 Badge Reports

---

## 🚨 STOP-KRITERIEN

**Stoppe und frage nach, wenn:**
- Agent T meldet: "Das Repo ist zu groß für 3 Stunden"
- Ein Badge-Agent meldet: "Meine Dateien sind unvollständig"
- Du feststellst: "Badge X hat Abhängigkeiten zu Badge Y"

---

**Kredo:** *"Ausführlichkeit bedingt Unmissverständlichkeit"*

**Wichtig:** Dies ist ein 3-Phasen Prozess. Starte mit Phase 1 (Agent T) und warte auf dessen Report, bevor du zu Phase 2 übergehst.
