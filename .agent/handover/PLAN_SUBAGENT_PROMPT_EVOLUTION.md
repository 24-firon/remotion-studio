# 📋 PLAN: Subagent Prompt Evolution (Linked Index Router)

**Stand:** 2026-02-01  
**Ziel:** Entwicklung eines intelligenten Routers aus [source-master-index.md](.knowledge/source-master-index.md)

---

## 🎯 AKTUELLER PROMPT (V1.0 - Baseline)

**Datei:** [SUBAGENT_PROMPT_CREATE_LINKED_INDEX.md](.agent/handover/SUBAGENT_PROMPT_CREATE_LINKED_INDEX.md)

**Funktion:**
- Transformation statischer Dateilisten → Hyperlinks
- Keine Entscheidungen, keine Analyse
- Nur: `filename.md` → [`filename.md`](path/to/filename.md)

**Output:** `source-master-index-LINKED.md` (rein strukturell)

---

## 🚀 ENTWICKLUNGSOPTIONEN

### Option A: Smart Router mit Kategorisierung

**Zusätzliche Logik:**
```markdown
Subagent analysiert jede Datei (erste 30 Zeilen + Pfad):
- Enthält "ARCHIVE" im Namen? → Tag [ARCHIVE]
- Enthält "DEPRECATED"/"LEGACY"? → Tag [DEPRECATED]
- Ist in viron-core/ oder specs/? → Tag [CORE-IP]
- Ist im Vault (Remotion Recherche/)? → Tag [VAULT]
```

**Output-Format:**
```markdown
### [CORE-IP] Critical System Files
- [`vision.md`](viron-core/vision.md) - Architectural Blueprint

### [VAULT] Research & Patterns  
- [`60-cloud-rendering...`](Remotion%20Recherche/60-cloud-rendering...md)

### [ARCHIVE] Legacy (Read-Only)
- [`16_ARCHIVE_Standard_Audio...`](Remotion%20Recherche/16_ARCHIVE...)
```

**Vorteil:** Sofort erkennbar, welche Dateien relevant sind

---

### Option B: Priorisierte Leseliste ⭐ (USER SELECTION)

**Zusätzliche Logik:**
```markdown
Subagent bewertet nach Prioritätsmatrix:

🔴 MUST READ (Start here)
- vision.md, workflow.md, implementation_plan.md
- Aktive Specs (nicht ARCHIVE/DEPRECATED)

🟡 SHOULD READ (Context building)
- Badge Reports (EXTRACTION_REPORT_BADGE_*.md)
- Technical Foundations (20-*.md, 30-*.md)

🟢 OPTIONAL (Deep dives)
- Research papers (40-*.md, 90-*.md)
- Pattern implementations

⚫ LEGACY (Historical context only)
- ARCHIVE_* Dateien
- Deprecation Reports
```

**Output-Struktur:**
```markdown
# 🔴 MUST READ (Core Understanding)
| File | Why Critical | Estimated Time |
|------|-------------|----------------|
| [vision.md](...) | Brand foundation | 5 min |

# 🟡 SHOULD READ (Implementation)
...

# ⚫ LEGACY (Do Not Use)
...
```

**Vorteil:** Neue Agents wissen sofort, wo sie anfangen sollen

---

### Option C: Badge-Basierter Cross-Reference Router

**Zusätzliche Logik:**
```markdown
Subagent gruppiert alle Dateien nach Badge-Zugehörigkeit:

Badge 1 (Core/Time): 10-remotion-basics..., 20-layout-patterns...
Badge 5 (Web/Cloud): 50-web-patterns..., 60-cloud-rendering...
Badge 7 (System): 22_SYSTEM_PLAN..., 23_ROUTING..., workflow.md
```

**Output-Struktur:**
```markdown
## 🏅 Badge 1: Core Architecture
**Primary Files:**
- [`10-remotion-basics...`](...)

**Related (Cross-Refs):**
- → See Badge 5: [`50-web-patterns...`](...) (Web integration)
- → See Badge 7: [`workflow.md`](...) (Naming conventions)

## 🏅 Badge 5: Web & Cloud
...
```

**Vorteil:** Navigation entlang der Arbeitsbereiche (Badges)

---

## 🔮 EMPFEHLUNG: Kombination B + C

**Optimaler Router wäre:**

1. **Priorisierung (Option B)** als Hauptstruktur
   - MUST READ zuerst
   - Dann Badge-Gruppen

2. **Cross-Links (Option C)** innerhalb jeder Sektion
   - "Verwandte Dateien in Badge X"

3. **Kategorisierung (Option A)** als Tags
   - [CORE], [VAULT], [ARCHIVE] neben jedem Link

---

## 📁 NÄCHSTE SCHRITTE

Wenn Entscheidung gefallen:

1. **Prompt V2.0** schreiben mit gewählter Option
2. **Test-Run** mit 10 Dateien (nicht alle 115+)
3. **Review** Output-Qualität
4. **Full Run** mit allen Dateien

---

**Offene Fragen:**
- Soll der Subagent Datei-Inhalte lesen (langsamer, genauer) oder nur Pfade (schneller)?
- Sollen Legacy-Dateien komplett ausgeblendet oder nur markiert werden?
- Brauchen wir eine "Zuletzt geändert" Spalte aus Git?
