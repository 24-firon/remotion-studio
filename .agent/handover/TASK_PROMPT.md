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
### Für jedes Badge (1-7):

**PHASE A: Analyse (Du)**
```
1. Lies bestehenden EXTRACTION_REPORT_BADGE_X.md
2. Vergleiche mit Badge-8-Standard
3. Identifiziere Qualitätslücken
4. Erstelle SUBAGENT_BRIEFING_BADGE_X_V2.md
```

**PHASE B: Delegation**
```
5. Sende Briefing an Sub-Agent
6. Deadline: 2-3 Stunden
7. Anforderung: V5-Qualität (nicht V3, nicht V4 - V5)
```

**PHASE C: Qualitätskontrolle**
```
8. Empfange Report
9. Prüfe gegen Checkliste:
   - [ ] Zeilenanzahl: 500+ (Badge 8: 587)
   - [ ] "THE X" Nomenklatur
   - [ ] 🔑 Die Zahl (min. 10 harte Limits)
   - [ ] Statistiken-Tabelle oben
   - [ ] Kontext (V1) Labels
   - [ ] Tabellen statt Prosa
   - [ ] Verwerfen-Tabelle
10. Bei Mängeln: Feedback-Schleife
```

**PHASE D: Finalisierung**
```
11. Report als FINAL markieren
12. In INDEX_HYPERLINKS.md aktualisieren
13. Nächstes Badge
```

---

## 4. QUALITÄTSKRITERIEN (V5)

| Kriterium | Badge 8 Referenz | Minimum |
|-----------|------------------|---------|
| **Zeilen** | 587 | 500+ |
| **THE X Sections** | 8 | 6+ |
| **🔑 Die Zahl** | 15 | 10+ |
| **Statistiken-Tabelle** | Ja | Erforderlich |
| **Kontext (V1) Labels** | 100% | 80%+ |
| **Tabellen** | 8 | 5+ |
| **Verwerfen-Tabelle** | Ja | Erforderlich |

---

## 5. PARALLELISIERUNG

**Batch 1 (Parallel):** Badge 1, 2, 3 (unabhängig)
**Batch 2 (Parallel):** Badge 4, 5, 6 (unabhängig)
**Batch 3:** Badge 7 (nach Batch 1, baut auf System auf)

**Max. 3 Sub-Agenten gleichzeitig**

---

## 6. OUTPUT

Am Ende:
- 8 finale Reports (Badge 1-8)
- Einheitliche V5-Qualität
- Fertig für Global Skill Assembly

---

## ✅ DEIN ERSTER SCHRITT

1. Lies die 5 Evolution-Dateien (Schritt 1)
2. Dokumentiere: Was ist V5-Qualität wirklich?
3. Validiere das Template
4. Starte mit Badge 1

**Nichts delegieren bevor du die Analyse nicht selbst gemacht hast.**
