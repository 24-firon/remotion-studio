# 🎯 PHASE 6: KNOWLEDGE CONSOLIDATION - ORCHESTRATOR PROMPT

## 1. MISSION

**Ziel:** Briefing Template auf Top-Level bringen durch Validierung gegen reale Ergebnisse (Badge 7 & 8).

**Problem:** V5 wurde nicht richtig erstellt → potenzieller Drift zwischen Template und tatsächlicher Qualität.

---

## 2. WORKFLOW (Einfach)

### SCHRITT 1: Basis scannen (wie INITIALIZATION_PROMPT)
Lies diese Dateien für Kontext:

1. [`INITIALIZATION_PROMPT.md`](../../.agent/handover/INITIALIZATION_PROMPT.md:1) - Workflow-Grundlage
2. [`EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md`](../../.knowledge/templates/EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md:1) - Aktuellstes Template
3. [`LEARNING_V3_REPORT_STRUCTURE.md`](../../.knowledge/project-learnings/LEARNING_V3_REPORT_STRUCTURE.md:1) - V3 Learnings

### SCHRITT 2: Badge 8 validieren (Qualitätscheck)
```
Vergleiche: EXTRACTION_REPORT_BADGE_8.md vs TEMPLATE_V2_HYBRID.md

Prüfe:
- [ ] Alle Template-Sektionen vorhanden?
- [ ] "THE X" Nomenklatur korrekt umgesetzt?
- [ ] 🔑 Die Zahl vorhanden (harte Limits)?
- [ ] Statistiken-Tabelle oben?
- [ ] Verwerfen-Tabelle vorhanden?
- [ ] Badge 8 hat 587 Zeilen - passt das zur Template-Erwartung?
```

**Ergebnis dokumentieren:**
- Was fehlt im Template, was Badge 8 richtig macht?
- Was ist im Template überflüssig?

### SCHRITT 3: Badge 7 überprüfen
```
Lies: EXTRACTION_REPORT_BADGE_7_V4.md (beste Version)
Vergleiche mit: Badge 8

Fragen:
- Welche Qualitätslücke besteht?
- Was fehlt für V5-Niveau?
```

### SCHRITT 4: Template optimieren
```
Basierend auf Schritt 2 + 3:
1. Erstelle: EXTRACTION_REPORT_TEMPLATE_V3.md
2. Integriere Verbesserungen aus Badge 8
3. Entferne redundante/over-engineered Teile
4. Klare Checkliste für Sub-Agenten
```

---

## 3. QUALITÄTSKRITERIEN (Badge 8 als Referenz)

| Element | Badge 8 | Template V3 Ziel |
|---------|---------|------------------|
| **THE X Sections** | 8 | 6-8 (klare Auswahl) |
| **🔑 Die Zahl** | 15 | 10+ |
| **Statistiken** | Ja | Erforderlich |
| **Verwerfen-Tabelle** | Ja | Erforderlich |
| **Kontext (V1)** | 100% | 80%+ |

---

## 4. OUTPUT

**Dateien zu erstellen:**
1. `EXTRACTION_REPORT_TEMPLATE_V3.md` - Optimiertes Template
2. `BADGE8_TEMPLATE_ANALYSIS.md` - Vergleichsreport (was passt/nicht passt)
3. `BADGE7_GAP_ANALYSIS.md` - Was fehlt für V5

---

## 5. NÄCHSTE SCHRITTE (nach Template-V3)

Mit optimiertem Template:
- Badge 1-6 auf V5-Niveau bringen
- Alle 8 Badges finalisieren
- Global Skill Assembly

---

## ✅ DEIN ERSTER SCHRITT

1. Lies INITIALIZATION_PROMPT.md
2. Lies EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md
3. Vergleiche mit EXTRACTION_REPORT_BADGE_8.md
4. Dokumentiere: Wo ist der Drift? Was fehlt?

**Fokus:** Template verbessern, nicht 100 Reports erstellen.
