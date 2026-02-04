# COMPARE-AGENT-PROMPT-TEMPLATE v1.0 (29. Jan 2026)

## Der Copy-Paste-Prompt für den Vergleichs-Agent

Dieser Prompt lädt einen Agenten (Gemini 3 Pro) mit der Aufgabe, deine lokalen Dateien mit den installierten Skills zu vergleichen. Das Ergebnis ist ein **GAP-Report**, der zeigt, was in Skills existiert und was in deine Viron-Erweiterung muss.

---

## 🤖 Der Prompt (Copy-Paste direkt in AntiGravity)

```
ROLE: Skill Architecture Analyzer

TASK: Compare local knowledge base with installed skills. Identify gaps.

INPUTS:
1. Installed Skills (paths):
   - ./skills/remotion-dev--skills/SKILL.md (+ rules/*.md)
   - ./skills/vercel-labs--agent-skills--react/SKILL.md (+ rules/*.md)
   - ./skills/vercel-labs--next-skills--next/SKILL.md (+ rules/*.md)
   - ./skills/vercel-labs--agent-skills--design/SKILL.md (+ rules/*.md)

2. Local Knowledge Base:
   - ./_knowledge/00-*.md (meine generierten Dateien)
   - ./_knowledge/10-*.md
   - ./_knowledge/20-*.md
   - ... alle bis 90-*.md

3. Viron-Specific Files:
   - ./viron-knowledge/*.md (alle vom User hochgeladenen Dateien)

INSTRUCTION:
For each local knowledge file:
  1. Extract main topics/concepts (e.g., "Container Queries", "View Transitions", "Audio Reactivity")
  2. Search ALL installed skills for matching rules
  3. Calculate overlap percentage:
     - 100% = Entire content exists in skills → ARCHIVE
     - 50-99% = Mostly covered, some nuances missing → EXTRACT DELTA
     - <50% = Unique/specialized content → KEEP FOR VIRON-SKILL

OUTPUT FORMAT (Markdown Table):

| Local File | Main Topics | Coverage % | Skill Match | Action | Notes |
|---|---|---|---|---|---|
| 00-master-workflow-2026.md | Orchestration, Decision Trees | 0% | None | KEEP for viron-system/rules/workflow.md | Unique biz logic |
| 10-remotion-basics-01.md | Timeline, Frames, useCurrentFrame | 95% | remotion-dev/rules/sequencing.md | ARCHIVE | Minor tweaks in remotion skill cover this |
| 20-layout-patterns-01.md | Container Queries, Subgrid | 70% | vercel-labs/rules/css-layout.md | EXTRACT DELTA | 2026-specific patterns not fully covered |
| 30-post-processing-01.md | Bloom, Glow, Selektives Rendering | 60% | remotion-dev/rules/effects.md | EXTRACT DELTA | Viron-specific bloom strength strategies |
| ... | ... | ... | ... | ... | ... |

ADDITIONAL OUTPUT:
After the table, create a JSON file content for the new skill:

```json
{
  "delta_extracts": {
    "viron-system/rules/workflow.md": {
      "source_file": "00-master-workflow-2026.md",
      "reason": "0% skill match - unique orchestration logic",
      "content_summary": "..."
    },
    "viron-system/rules/layout-2026.md": {
      "source_file": "20-layout-patterns-01.md",
      "reason": "70% skill match - gap: Container Query timing, debug tips",
      "content_summary": "..."
    }
  },
  "files_to_archive": [
    "10-remotion-basics-01.md (95% match, remotion skill sufficient)"
  ]
}
```

CONSTRAINTS:
- Do NOT delete anything. Only recommend moves.
- Be precise: if a rule exists 99% but misses one code pattern, that's a gap.
- Check across ALL 4 skills, not just one.
- If unsure, default to EXTRACT DELTA (keep for Viron).

START ANALYSIS:
```

---

## 📊 Was passiert mit diesem Prompt?

Der Agent wird:

1. **Alle deine lokalen Dateien lesen** (00er bis 90er Serie)
2. **Alle installierten Skill-Rules durchsuchen** (mit Stichwort-Matching)
3. **Eine Tabelle erstellen**, die zeigt:
   - Welche Datei kann archiviert werden? (100% in Skills)
   - Welche sollte zu Viron Skill? (< 50% in Skills)
   - Welche sind Grenzfälle? (50-99% Coverage)

4. **Ein JSON-Extrakt ausgeben**, das du direkt in die neue `viron-system` übernehmen kannst.

---

## 🎯 Beispiel-Output (Wie es aussehen könnte)

```markdown
# Skill Comparison Report (29. Jan 2026)

## Summary
- Total Local Files Analyzed: 33
- Average Coverage: 62%
- Candidates for Archive: 8 files
- Candidates for Viron Skill: 12 files
- Unclear/Hybrid: 13 files

## Detailed Comparison Table

| Local File | Main Topics | Coverage % | Skill Match | Action |
|---|---|---|---|---|
| 00-master-workflow-2026.md | Orchestration, Gemini 3 Pro Setup | 0% | None | KEEP → viron-system/rules/workflow.md |
| 10-remotion-basics-01.md | Timeline, Frames, useCurrentFrame | 98% | remotion-dev/rules/sequencing.md | ARCHIVE |
| 20-layout-patterns-01.md | Container Queries, Subgrid | 70% | vercel-labs/rules/css-modern.md | EXTRACT DELTA → viron-system/rules/layout-2026.md |
| 20-layout-patterns-02.md | View Transitions, Morphing | 40% | vercel-labs/rules/transitions.md | EXTRACT DELTA → viron-system/rules/view-transitions-advanced.md |
| 30-post-processing-01.md | Bloom, Glow Effects | 50% | remotion-dev/rules/effects.md | EXTRACT DELTA → viron-system/rules/bloom-advanced.md |
| PATTERN_Advanced_Shaders.md | WGSL, GPU Compute, Shader Optimization | 5% | None | KEEP → viron-system/rules/advanced-shaders.md |
| GUIDE_Viron_Button_Stack.md | UI System, Button Consistency | 0% | vercel-labs/rules/components.md | KEEP → viron-system/rules/viron-button-design.md |
| ... | ... | ... | ... | ... |

## Files to Archive (No Skill Gap)
- 10-remotion-basics-01.md (98% match)
- 40-audio-reaktiv-00.md (92% match)
- 50-web-patterns-03.md (88% match)

## Viron Delta Skill Content (JSON)
[Extrakte mit Source-Angaben]
```

---

## 🚀 Wie nutzt du diesen Output?

1. **Archive-Dateien verschieben:**
   ```bash
   mkdir -p ./_archive/redundant/
   mv 10-remotion-basics-01.md ./_archive/redundant/
   # Notiz: "Siehe remotion-dev/rules/sequencing.md stattdessen"
   ```

2. **Viron Skill bauen:**
   ```bash
   mkdir -p ./skills/viron-system/rules
   # Kopiere die Inhalte der "KEEP" Dateien → hier rein
   ```

3. **Orchestrator laden:**
   Der Agent bekommt jetzt nur noch:
   - Die 4 Basis-Skills
   - Den neuen `viron-system` Skill
   - (Kein Ballast mehr!)

---

## ⚠️ Wichtige Hinweise

**Der Agent wird halluzinieren, wenn:**
- Skills nicht vollständig geladen sind (= Lade-Fehler)
- Ordnerpfade falsch sind
- Der Prompt zu vage ist ("analyse alles!")

**Daher:**
- Stelle sicher, dass alle 4 Skills via `npx skills add` installiert sind
- Gib konkrete Pfade an (nicht "überall suchen")
- Starte mit 1-2 Dateien als Test, bevor du alle auf einmal läufst

---

**Version:** v1.0 (29. Jan 2026)  
**Nächste Datei:** `VIRON-DELTA-SKILL-STRUCTURE-v1.md`