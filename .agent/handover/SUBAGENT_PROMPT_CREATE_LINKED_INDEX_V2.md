# 🎯 SUB-AGENT BRIEFING: Create Prioritized Linked Router (V2.0)

**Mission:** Transform the static Source Master Index into a prioritized, hyperlinked navigation system  
**Input:** [source-master-index.md](.knowledge/source-master-index.md)  
**Output:** Prioritized linked index with reading recommendations

---

## 📥 INPUT FILE

Read: [`.knowledge/source-master-index.md`](.knowledge/source-master-index.md)

---

## 📤 OUTPUT FILE

Create: [`.knowledge/source-master-index-ROUTER.md`](.knowledge/source-master-index-ROUTER.md)

---

## 🔧 TRANSFORMATION RULES

### 1. Priority Classification

For EACH file in the source index, assign EXACTLY ONE priority level:

| Priority | Icon | Criteria | Action |
|----------|------|----------|--------|
| **🔴 MUST READ** | Critical | Core system files, active specs, master workflow | Read immediately |
| **🟡 SHOULD READ** | Important | Badge reports, technical foundations, patterns | Read for context |
| **🟢 OPTIONAL** | Supplemental | Research papers, deep dives, future plans | Read as needed |
| **⚫ LEGACY** | Historical | ARCHIVE files, deprecated content, old standards | Read-only reference |

**Classification Logic:**
```
🔴 MUST READ if:
- Path contains: viron-core/vision.md, viron-core/workflow.md
- Path contains: implementation_plan.md, task.md
- Path contains: specs/ (active specs, not deprecated)
- Filename starts with: 00- (master documents)

🟡 SHOULD READ if:
- Path contains: EXTRACTION_REPORT_BADGE_*.md
- Path contains: mission/ or project-learnings/
- Filename starts with: 10-, 20-, 30-, 50- (technical foundations)
- Active patterns in patterns/ or src/learnings/

🟢 OPTIONAL if:
- Filename contains: RESEARCH_, ZUKUNFTSPLAN_, synergy
- Filename starts with: 40-, 70-, 80-, 90-
- Path contains: docs/ (guides, not critical)

⚫ LEGACY if:
- Filename contains: ARCHIVE_, DEPRECATED_, deprecated
- Path contains: archive/
- Status indicates "archived", "legacy", "historical"
```

### 2. Hyperlink Format

Transform every filename to clickable link:

**BEFORE:**
```markdown
- `vision.md` -> Architectural Blueprint
```

**AFTER:**
```markdown
- [`vision.md`](viron-core/vision.md) -> Architectural Blueprint
```

### 3. Output Structure

```markdown
# 🎯 Viron Knowledge Router (Prioritized)

> **Quick Start:** Begin with 🔴 MUST READ, then follow your Badge assignment.

---

## 🔴 MUST READ (Core Foundation)

### System Architecture
| File | Description | Why Critical |
|------|-------------|--------------|
| [`vision.md`](viron-core/vision.md) | Architectural Blueprint | Brand foundation |
| [`workflow.md`](viron-core/workflow.md) | Developer Experience | How we work |

### Project Management
| File | Description | Why Critical |
|------|-------------|--------------|
| [`implementation_plan.md`](.agent/handover/implementation_plan.md) | Master plan | Current phase & status |
| [`task.md`](.agent/handover/task.md) | Task tracking | What's pending |

---

## 🟡 SHOULD READ (By Badge)

### Badge 1: Core Architecture
| File | Description | Time |
|------|-------------|------|
| [`EXTRACTION_REPORT_BADGE_1.md`](.knowledge/mission/...) | Audit findings | 10 min |

### Badge 7: System & Cloud (Current)
| File | Description | Time |
|------|-------------|------|
| [`EXTRACTION_REPORT_BADGE_7_V2.md`](.knowledge/mission/...) | Audit findings | 10 min |

---

## 🟢 OPTIONAL (Deep Dives)

### Research & Future
| File | Description | When Needed |
|------|-------------|-------------|
| [`RESEARCH_Antigravity...`](docs/RESEARCH_Antigravity...) | AI Governance | Building AI features |

---

## ⚫ LEGACY (Do Not Use)

### Archived Standards
| File | Description | Status |
|------|-------------|--------|
| [`16_ARCHIVE_Standard_Audio...`](Remotion%20Recherche/16_ARCHIVE...) | Old audio pipeline | Replaced by new spec |
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Every file from source index is classified (🔴🟡🟢⚫)
- [ ] Every filename is a clickable hyperlink
- [ ] MUST READ section has "Why Critical" column
- [ ] SHOULD READ is organized by Badge
- [ ] LEGACY files are clearly marked "Do Not Use"
- [ ] Table format is consistent throughout

---

## 🚫 DO NOT

- Do NOT change file content descriptions from source
- Do NOT reorganize files into different badges than source indicates
- Do NOT omit any files (even LEGACY must be listed)
- Do NOT add personal opinions about file quality

---

**Start creating the prioritized router now.**
