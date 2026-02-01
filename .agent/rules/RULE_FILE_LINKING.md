# 📎 RULE: File Hyperlink Standard

**Status:** ACTIVE  
**Scope:** ALL Agent Communication  
**Priority:** MANDATORY

---

## 🎯 Regulation

**EVERY filename MUST be presented as a clickable hyperlink.**

### ✅ Correct Format

```markdown
Open the [source-master-index.md](.knowledge/source-master-index.md) file.
Check [SUBAGENT_BRIEFING_BADGE_7.md](.agent/handover/SUBAGENT_BRIEFING_BADGE_7.md) for details.
```

### ❌ Incorrect Format

```markdown
Open the source-master-index.md file.
Check SUBAGENT_BRIEFING_BADGE_7.md for details.
```

---

## 📋 Implementation

1. **Inline References:** Always use `[filename.md](path/to/filename.md)`
2. **Multiple Files:** Each file gets its own hyperlink
3. **Code Blocks:** Inside code blocks, plain text is acceptable
4. **Headings:** File references in headings should also be linked

---

## 🧪 Examples

| Context | Correct |
|---------|---------|
| Single file | Read [`vision.md`](viron-core/vision.md) first |
| Multiple files | Check [`workflow.md`](viron-core/workflow.md) and [`pipeline.md`](viron-core/pipeline.md) |
| With description | The [`source-master-index.md`](.knowledge/source-master-index.md) contains the inventory |

---

**Enforcement:** This rule is checked in all code reviews and agent outputs.
