# 🎯 PHASE 6A: TEMPLATE OPTIMIERUNG (Evolution V3→V4→V5→Badge 8)

## 1. MISSION

**Ziel:** Briefing Template auf Top-Level bringen durch Verständnis der Evolution.

**Ansatz:** Nicht mit fertigen Dateien vergleichen, sondern die Entwicklung verstehen:
- Was war an V4 besser als V3?
- Was von V3 war nützlich für V4?
- Wie sollte V5 beides vereinen?
- Erst dann: Badge 8 validieren

---

## 2. WORKFLOW (Korrekte Reihenfolge)

### SCHRITT 1: V3 → V4 Evolution verstehen
```
Lies:
1. LEARNING_V3_REPORT_STRUCTURE.md
   - Was wurde aus V3 gelernt?
   - Was fehlte in V3?

2. DIFF_V4_VS_TEMPLATE_V2.md
   - Was macht V4 besser?
   - Was wurde übernommen?
```

**Fragen zu beantworten:**
- Was war das Killer-Feature von V4, das V3 nicht hatte?
- Was von V3 war trotzdem wertvoll?

### SCHRITT 2: V5 verstehen (die Vereinigung)
```
Lies:
3. COMPARISON_BADGE_7_ALL_VERSIONS.md
4. EVOLUTION_V1_TO_V5_DIFF.md
```

**Fragen zu beantworten:**
- Was sollte V5 leisten (V3 + V4 vereinen)?
- Was wurde bei V5 falsch gemacht?
- Was ist das "Ideal" aus V3+V4+V5?

### SCHRITT 3: Template analysieren
```
Lies:
5. EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md
```

**Fragen zu beantworten:**
- Unterstützt das Template die V4/V5-Features?
- Wo ist das Template over-engineered?
- Was fehlt für das Ideal aus Schritt 2?

### SCHRITT 4: Badge 8 validieren (ERST JETZT!)
```
Lies:
6. EXTRACTION_REPORT_BADGE_8.md

Vergleiche mit: Ideal aus Schritt 2 + Template aus Schritt 3
```

**Fragen zu beantworten:**
- Wie nah kommt Badge 8 dem Ideal?
- Was zeigt Badge 8, was das Template nicht vorsieht?
- Was fehlt Badge 8 vom Ideal?

### SCHRITT 5: Template V3 erstellen
```
Basierend auf:
- V4-Verbesserungen (Schritt 1)
- V5-Ideal (Schritt 2)
- Badge 8 Realität (Schritt 4)

Erstelle: EXTRACTION_REPORT_TEMPLATE_V3.md
```

### SCHRITT 6: Repository Rules verstehen (NEU!)
```
Damit der Orchestrator-Agent das Repo wirklich versteht, muss er die Regeln kennen.

Lies:
1. RULE_FILE_ANALYSIS_REPORT.md (Übersicht aller 120+ Regel-Dateien)
2. Die 10 wichtigsten CORE_RULE Dateien:
   - gemini.md (Single Source of Truth)
   - PROJECT_RULES.md (Governance Hub)
   - USER_GOVERNANCE_PROTOCOL.md (STOP-Signal, Kommunikation)
   - .agent/handover/WHITELIST.md (19 Commandments)
   - .agent/handover/BLACKLIST.md (Forbidden Zones)
   - .agent/handover/meta/RULE_GIT_SYNC_PROTOCOL.md (Double-Turn-Lock)
   - .agent/handover/meta/RULE_TOKEN_ECONOMY.md (Anti-Fog Doctrine)
   - THE_VIRON_AESTHETIC_MANIFESTO.md (No-CSS Law, Design-DNA)
   - src/PROJECT_RULES_LIGHTING.md (80% Grey Rule)
   - .agent/rules/RULE_FILE_LINKING.md (Hyperlink-Pflicht)

Fragen zu beantworten:
- Was sind die absoluten "Unverrückbaren" (MANDATORY, STRENGSTENS VERBOTEN)?
- Was ist die hierarchische Struktur der Regeln (Global → Project → Skill)?
- Welche Regeln sind veraltet oder redundant?
- Was fehlt für ein konsolidiertes Regelwerk?
```

**Output:**
- `REPOSITORY_RULES_UNDERSTANDING.md` - Zusammenfassung der kritischen Regeln
- `RULE_CONSOLIDATION_PROPOSAL.md` - Vorschlag für bereinigtes Regelwerk

---

## 3. INPUT-DATEIEN (Reihenfolge beachten!)

| Reihenfolge | Datei | Zweck |
|-------------|-------|-------|
| 1 | `LEARNING_V3_REPORT_STRUCTURE.md` | V3 Lessons |
| 2 | `DIFF_V4_VS_TEMPLATE_V2.md` | V4 Delta |
| 3 | `COMPARISON_BADGE_7_ALL_VERSIONS.md` | Alle Versionen |
| 4 | `EVOLUTION_V1_TO_V5_DIFF.md` | Evolution |
| 5 | `EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md` | Aktuelles Template |
| 6 | `EXTRACTION_REPORT_BADGE_8.md` | Gold-Standard |

---

## 4. OUTPUT

**Zu erstellen:**
1. `EVOLUTION_ANALYSIS.md` - Was war besser an V4? Was sollte V5 sein?
2. `BADGE8_IDEAL_GAP.md` - Badge 8 vs Ideal (nicht vs Template!)
3. `EXTRACTION_REPORT_TEMPLATE_V3.md` - Optimiertes Template

---

## 5. DANACH

Mit Template V3: Badge 1-6 auf V5-Niveau bringen → siehe TASK_PROMPT.md
