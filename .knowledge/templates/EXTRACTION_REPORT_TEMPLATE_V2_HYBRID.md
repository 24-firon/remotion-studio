# EXTRACTION_REPORT_BADGE_[N].md Template (V2.0 - Hybrid)

**Version:** 2.0 (Hybrid - V3 Structure + V5 Depth)  
**Status:** Template - Copy and fill for each Badge  
**Based on:** Badge 7 Learnings (V3+V5 synthesis)

---

## 🎯 FRONT MATTER (Auto-Generated)

```markdown
# 🎯 EXTRACTION_REPORT_BADGE_[N]: [BADGE_NAME]

**Badge:** [N] - [Name]  
**Version:** [N].0 (Platinum Fusion)  
**Basis:** [Vorgänger-Versionen, z.B. "V2 Data + V1 Context"]  
**Status:** [IN_PROGRESS / COMPLETED / REVISED]  
**Auditor:** [Agent Name]  
**Date:** [YYYY-MM-DD]

---

## 📊 EXECUTIVE SUMMARY (Die Essenz in 3 Sätzen)

[Drei prägnante Sätze, die die wichtigste Erkenntnis zusammenfassen. Beispiel: 
"Viron operiert auf drei Ebenen: Physik (RAM-bounded), Governance (strict Git-Flow), 
Ökonomie (Cloud-Tiering). 12 System-Bausteine extrahiert, 9 Redundanzen verworfen."]

| Metrik | Ergebnis | Delta zu V1 |
|:-------|:---------|:------------|
| **Files Audited** | [N] | +[X] |
| **Core Findings** | [N] | +[X] |
| **Redundancies Dropped** | [N] | - |
| **Forensic Accuracy** | [High/Medium] | [+/-] |

---

> **🚀 Quick Start for Readers:**
> 1. Read 🔴 CRITICAL FINDINGS first (5 min)
> 2. Skim 🟡 SUPPORTING for context (10 min)
> 3. Check 🗑️ VERWORFEN for audit quality
> 4. Review ⚠️ EDGE CASES for gotchas
```

---

## 🔴 CRITICAL FINDINGS (Must Know)

> **Definition:** System-IP that is NOT in Global Skill. Hard facts only.

### THE [SYSTEM_COMPONENT_NAME]

**Quelle:** [`filename.md`](path/to/filename.md) (Lines X-Y)  
**Typ:** [SYSTEM_ARCH / WORKFLOW / PIPELINE / STANDARD]

**Kontext (V1):** [1-2 sentences explaining WHY this matters intuitively]

**Das Problem:** [Was geht schief / Was ist die Intuition?]

**Die Viron-Lösung:** [Wie lösen wir es?]

**Die Zahl:** 🔑 **[Key Metric: Wert]** (Hard Fact)

**Beweis (Code/Table):**
```typescript
// Exact extraction from source
// Tables preferred over prose
// Example: // Hard Limit: 16. RAM Divisor: 2.
```

---

### THE [SECOND_COMPONENT]

**Quelle:** [`filename.md`](path/to/filename.md)  
**Typ:** [CATEGORY]

**Kontext (V1):** [Intuition]

**Beweis:**
```markdown
| Param | Value | Meaning |
|:------|:------|:--------|
| ...   | ...   | ...     |
```

---

## 🟡 SUPPORTING FINDINGS (Should Know)

> **Definition:** Important context, edge cases, or implementation details.

### THE [COMPONENT]

**Quelle:** [`filename.md`](path/to/filename.md)  
**Typ:** [CATEGORY]

**Kontext (V1):** [Why this supports the critical findings]

**Beweis:**
```typescript
[Code or table]
```

---

## 🗑️ VERWORFEN (Redundant to Global Skill)

> **MANDATORY:** Prove surgical precision. List everything you checked and rejected.

| Fund | Quelle | Skill-Konflikt | Entscheidung |
|:-----|:-------|:---------------|:-------------|
| [`Basic Sequence`](skill.md#sequence) | [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md) | Sequencing covered in Skill | ❌ DROP |
| ... | ... | ... | ... |

---

## 🔗 CROSS-REFERENCES

> **Links to other Badges/Files that relate to this work**

| Badge | File | Relationship |
|:------|:-----|:-------------|
| Badge 1 | [`10-remotion-basics...`](../../Remotion%20Recherche/10-remotion-basics...) | Timeline determinism |
| Badge 5 | [`50-web-patterns...`](../../Remotion%20Recherche/50-web-patterns...) | Web integration |

---

## ⚠️ EDGE CASES & WARNINGS

> **Hard-won knowledge that bit you during extraction**

| Problem | Source | Solution |
|:--------|:-------|:---------|
| [Gotcha] | [File] | [How you solved it] |

---

## 📝 RECOMMENDATIONS

1. **[PRIORITY]** [Action item based on findings]
2. **[MAINTENANCE]** [Documentation update needed]
3. **[FUTURE]** [Consideration for next iteration]

---

## ✅ AUDIT CHECKLIST (Before Submitting)

- [ ] Every filename is a clickable hyperlink
- [ ] All 🔴 findings have Skill-Check (NOT in Global Skill)
- [ ] 🗑️ table has at least 3 entries (proves you checked)
- [ ] Kontext (V1) sections are max 2 sentences
- [ ] Tables used instead of prose for data
- [ ] Cross-references to other Badges included

---

## 🎨 FORMATTING RULES (V3 Best Practices)

### 1. Headers: "THE X" Nomenklatur
- Use `### THE [NAME]` for each finding (scannable)
- Never go deeper than `####`
- **Examples:** `THE CLOUD PIPELINE`, `THE SYSTEM MAP`, `THE ROUTING BRAIN`

### 2. Information Density > Prosatext
- **ALWAYS** prefer tables over bullet lists for structured data
- **ALWAYS** prefer bullet lists over prose paragraphs
- **Hard facts** in `code` or **bold**
- Left-align text, right-align numbers in tables

### 3. Emphasis Hierarchy
- 🔑 **Die Zahl:** Hard limit/magic number
- 🔥 **Kritisch:** Must know
- ⚠️ **Warnung:** Edge case / Gotcha
- **Bold:** Important terms
- `Code:` Values, paths, parameters

### 4. Kontext (V1) Pattern
```markdown
**Kontext (V1):** [The intuition - max 2 sentences]
```

### 5. Problem/Lösung Pattern (V4 Addition)
```markdown
**Das Problem:** [Was geht schief?]
**Die Viron-Lösung:** [Wie lösen wir es?]
**Die Zahl:** 🔑 **[Key: Value]**
```

### 6. Delta-Metriken
Jede Sektion sollte implizit antworten:
- "Was ist neu?"
- "Was wurde verbessert?"
- "Warum ist das relevant?"

---

## 📋 USAGE INSTRUCTIONS

1. **Copy** this template to `.knowledge/mission/EXTRACTION_REPORT_BADGE_[N].md`
2. **Fill** FRONT MATTER with metadata
3. **Audit** files following the Mission Briefing
4. **Extract** to CRITICAL or SUPPORTING based on Global Skill check
5. **List** rejected items in VERWORFEN
6. **Check** the AUDIT CHECKLIST before finishing

---

**Template Version:** 2.1 (V3 Fusion + V4 Context)  
**Last Updated:** 2026-02-01  
**Based on:** Badge 7 Learnings

**Referenzen:**
- [`LEARNING_V3_REPORT_STRUCTURE.md`](../project-learnings/LEARNING_V3_REPORT_STRUCTURE.md) - V3 Best Practices
- [`PROMPT_V3_BEST_PRACTICES.md`](../handover/PROMPT_V3_BEST_PRACTICES.md) - Prompt-Version
- [`COMPARISON_BADGE_7_ALL_VERSIONS.md`](../mission/COMPARISON_BADGE_7_ALL_VERSIONS.md) - Vollständiger Vergleich

**Key Insight:** V3 liefert die beste Struktur (THE X, Statistik, Kontext-Label), V4 liefert das beste Verständnis (Problem/Lösung/Die Zahl). Dieses Template kombiniert beides.
