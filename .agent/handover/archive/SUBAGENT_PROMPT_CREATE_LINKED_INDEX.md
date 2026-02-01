# 🎯 SUB-AGENT BRIEFING: Create Linked Router from Source Master Index

**Mission:** Transform the static Source Master Index into a hyperlinked navigation router  
**Input:** [source-master-index.md](.knowledge/source-master-index.md)  
**Output:** Linked index with all files as clickable hyperlinks

---

## 📥 INPUT FILE

Read: [`.knowledge/source-master-index.md`](.knowledge/source-master-index.md)

This file contains:
- 115+ file references organized by category
- Sections: Legacy IP Sources, Vault Sources, Badge Reports
- File paths in plain text format (not linked)

---

## 📤 OUTPUT FILE

Create: [`.knowledge/source-master-index-LINKED.md`](.knowledge/source-master-index-LINKED.md)

---

## 🔧 TRANSFORMATION RULES

### 1. EVERY Filename Becomes a Hyperlink

**BEFORE (Input):**
```markdown
- `vision.md` -> Architectural Blueprint; Virtual Production Studio concepts.
```

**AFTER (Output):**
```markdown
- [`vision.md`](viron-core/vision.md) -> Architectural Blueprint; Virtual Production Studio concepts.
```

### 2. Path Resolution

Use relative paths from project root:
- `viron-core/*.md` → [`filename.md`](viron-core/filename.md)
- `src/learnings/*.md` → [`filename.md`](src/learnings/filename.md)
- `docs/*.md` → [`filename.md`](docs/filename.md)
- `Remotion Recherche/*.md` → [`filename.md`](Remotion%20Recherche/filename.md)
- `.knowledge/mission/*.md` → [`filename.md`](.knowledge/mission/filename.md)
- `.agent/handover/*.md` → [`filename.md`](.agent/handover/filename.md)

### 3. Preserve Structure

- Keep all sections intact
- Keep all descriptions/comments
- Keep all badges/status indicators
- ONLY transform filenames to hyperlinks

### 4. Special Characters

- URL-encode spaces: `Remotion Recherche` → `Remotion%20Recherche`
- Keep special characters in display text

---

## ✅ COMPLETION CHECKLIST

Before finishing, verify:
- [ ] Every bullet point with a filename has a hyperlink
- [ ] All paths are relative to project root
- [ ] Original structure is preserved
- [ ] File is saved as `source-master-index-LINKED.md`

---

## 🚫 DO NOT

- Do NOT change file content/descriptions
- Do NOT reorganize sections
- Do NOT add new information
- Do NOT remove existing entries

---

**Start transformation now.**
