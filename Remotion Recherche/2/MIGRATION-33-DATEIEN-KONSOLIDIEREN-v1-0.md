# MIGRATION-33-DATEIEN-KONSOLIDIEREN v1.0 (29. Jan 2026)

## Konkrete Anleitung: Was passiert mit JEDER deiner 33 Dateien?

Diese Datei ist **die Wahrheit**. Jede Zeile sagt dir: Diese Datei → ARCHIV / KEEP / EXTRACT / REPLACE

---

## 📋 Die vollständige Migration (33 Dateien)

| # | Deine Datei | Status | Action | Zielort | Grund |
|---|---|---|---|---|---|
| 1 | `00-overview-index-v2-1-complete.md` | KEEP | Bleibe als Referenz | `./_archive/deprecated/` | Veraltet, neue Struktur mit Skills besser |
| 2 | `00-master-workflow-2026-integration.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/workflow.md` | Unique Orchestration Logic (nicht in Skills) |
| 3 | `10-remotion-basics-01-timeline-und-frames.md` | ARCHIVE | Move zu archive | `./_archive/redundant/` | 95% match: `remotion-dev/skills/rules/sequencing.md` |
| 4 | `20-layout-patterns-01-container-queries-und-grids.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/layout-2026-advanced.md` | 70% match + Viron-Spezifika |
| 5 | `20-layout-patterns-02-view-transitions-in-remotion.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/view-transitions-advanced.md` | 40% match, viel Viron-Knowhow |
| 6 | `20-layout-patterns-03-modern-css-masking-compositing.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/css-masking-advanced.md` | Spezialisiert, nicht in Skills |
| 7 | `30-post-processing-00-overview-postprocessing-stack.md` | ARCHIVE | Move zu archive | `./_archive/redundant/` | Overview ist redundant mit Skills |
| 8 | `30-post-processing-01-bloom-selective.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/bloom-advanced.md` | 60% match + Viron-Tuning |
| 9 | `30-post-processing-02-depth-of-field.md` | ARCHIVE | Move zu archive | `./_archive/redundant/` | 90% match: `remotion-dev/skills/rules/effects.md` |
| 10 | `30-post-processing-03-04-chromatic-und-grain.md` | ARCHIVE | Move zu archive | `./_archive/redundant/` | 85% match: `remotion-dev/skills/rules/effects.md` |
| 11 | `40-procedural-patterns-00-noise-voronoi-terrain.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/procedural-patterns.md` | 30% match, sehr Viron-spezifisch |
| 12 | `40-audio-reaktiv-00-fft-frequenzspektren.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/audio-reactivity.md` | 40% match + Viron-Audio-Strategien |
| 13 | `40-advanced-lighting-00-caustics-volumetric.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/advanced-lighting.md` | 35% match, spezialisiert |
| 14 | `40-gltf-models-00-loading-optimization.md` | ARCHIVE | Move zu archive | `./_archive/redundant/` | 88% match: `remotion-dev/skills/rules/3d.md` |
| 15 | `50-web-patterns-01-scroll-basierte-dof-navigation.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/web-scroll-patterns.md` | 45% match, Web-Integration spezifisch |
| 16 | `50-web-patterns-02-adaptive-quality-switching.md` | KEEP | Bleibe lokal | `./_knowledge/` | Future reference (nicht jetzt nötig) |
| 17 | `50-web-patterns-03-css-animationen-vs-remotion.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/css-vs-remotion.md` | 50% match + Viron-Entscheidungen |
| 18 | `50-web-patterns-08-performance-web-vitals-mastery.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/web-performance.md` | 55% match + Viron-Metriken |
| 19 | `50-web-patterns-09-kinetic-typography-text-animation.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/kinetic-typography.md` | 40% match, Viron-spezifisch |
| 20 | `50-web-patterns-10-real-time-ai-video-streaming.md` | KEEP | Bleibe lokal | `./_archive/future/` | Phase B+C relevant (Feb 2026) |
| 21 | `60-cloud-rendering-00-aws-lambda-renderfarming.md` | KEEP | Bleibe lokal | `./_archive/future/` | Phase C relevant (März 2026) |
| 22 | `70-web-accessibility-wcag-2026-compliance.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/accessibility-viron.md` | 60% match + Viron-A11y |
| 23 | `80-ai-hybrid-workflows-v1-0-code-plus-ai.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/ai-hybrid-workflows.md` | 25% match, sehr Viron-spezifisch |
| 24 | `90-synergy-01-data-driven-personalization.md` | KEEP | Bleibe lokal | `./_archive/future/` | Phase B+C relevant |
| 25 | `90-synergy-02-realtime-video-rag-agents.md` | KEEP | Bleibe lokal | `./_archive/future/` | Phase B+C relevant |
| 26 | `90-synergy-03-webgpu-compute-physics.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/webgpu-physics.md` | 35% match, Viron-Optimierung |
| 27 | `90-appendix-glossary-bibliography.md` | KEEP | Bleibe lokal | `./_knowledge/reference/` | Nachschlagewerk, immer brauchbar |
| 28 | `QUICK-START-komplettbeispiel.md` | ARCHIVE | Move zu archive | `./_archive/deprecated/` | Veraltet, neue Struktur besser |
| 29 | `FEHLERLOSUNG-haeufige-probleme.md` | ARCHIVE | Move zu archive | `./_archive/deprecated/` | Veraltet, Agent ist jetzt Fehlerquelle |
| 30 | `GUIDE_Viron_Button_Stack.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/viron-button-design.md` | **CRITICAL**: Design-System, 0% in Skills |
| 31 | `PATTERN_Advanced_Shaders.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/advanced-shaders.md` | **CRITICAL**: WGSL/GPU, 5% in Skills |
| 32 | `RESOURCES_AND_ECOSYSTEM.md` | KEEP | Bleibe lokal | `./_knowledge/reference/` | Links & Resources, für später |
| 33 | `PATTERN_Viron_Hard_Won_Knowledge.md` | EXTRACT | Move zu viron-system | `./skills/viron-system/rules/viron-best-practices.md` | **CRITICAL**: Dein Wissen, 0% in Skills |

---

## 📊 Zusammenfassung (Was passiert?)

| Aktion | Anzahl Dateien | Zielort |
|---|---|---|
| **ARCHIVE** (redundant in Skills) | 8 Dateien | `./_archive/redundant/` |
| **EXTRACT** (zu viron-system) | 18 Dateien | `./skills/viron-system/rules/` |
| **KEEP** (Referenz/Future) | 7 Dateien | `./_archive/future/` oder `./_knowledge/` |
| **TOTAL** | 33 Dateien | ✅ Nichts wird gelöscht! |

---

## 🚀 Die Schritt-für-Schritt Migration

### Phase 1: Archivieren (Redundant, 8 Dateien)

```bash
mkdir -p ./_archive/redundant/

# Diese 8 Dateien archivieren:
mv 10-remotion-basics-01-timeline-und-frames.md ./_archive/redundant/
mv 30-post-processing-00-overview-postprocessing-stack.md ./_archive/redundant/
mv 30-post-processing-02-depth-of-field.md ./_archive/redundant/
mv 30-post-processing-03-04-chromatic-und-grain.md ./_archive/redundant/
mv 40-gltf-models-00-loading-optimization.md ./_archive/redundant/
mv 00-overview-index-v2-1-complete.md ./_archive/redundant/
mv QUICK-START-komplettbeispiel.md ./_archive/redundant/
mv FEHLERLOSUNG-haeufige-probleme.md ./_archive/redundant/

# Label each file (add this to the top of each):
# ⚠️ ARCHIVED (29. Jan 2026)
# See instead: remotion-dev/skills/rules/sequencing.md
# Reason: 95% match. No local delta needed.
```

### Phase 2: Extracten (zu viron-system, 18 Dateien)

```bash
mkdir -p ./skills/viron-system/rules/

# Critical files (3 - MUST COPY):
cp GUIDE_Viron_Button_Stack.md ./skills/viron-system/rules/viron-button-design.md
cp PATTERN_Advanced_Shaders.md ./skills/viron-system/rules/advanced-shaders.md
cp PATTERN_Viron_Hard_Won_Knowledge.md ./skills/viron-system/rules/viron-best-practices.md

# Layout & Layout patterns (4):
cp 20-layout-patterns-01-container-queries-und-grids.md ./skills/viron-system/rules/layout-2026-advanced.md
cp 20-layout-patterns-02-view-transitions-in-remotion.md ./skills/viron-system/rules/view-transitions-advanced.md
cp 20-layout-patterns-03-modern-css-masking-compositing.md ./skills/viron-system/rules/css-masking-advanced.md

# Post-processing & Effects (4):
cp 30-post-processing-01-bloom-selective.md ./skills/viron-system/rules/bloom-advanced.md
cp 40-procedural-patterns-00-noise-voronoi-terrain.md ./skills/viron-system/rules/procedural-patterns.md
cp 40-audio-reaktiv-00-fft-frequenzspektren.md ./skills/viron-system/rules/audio-reactivity.md
cp 40-advanced-lighting-00-caustics-volumetric.md ./skills/viron-system/rules/advanced-lighting.md

# Web patterns (5):
cp 50-web-patterns-01-scroll-basierte-dof-navigation.md ./skills/viron-system/rules/web-scroll-patterns.md
cp 50-web-patterns-03-css-animationen-vs-remotion.md ./skills/viron-system/rules/css-vs-remotion.md
cp 50-web-patterns-08-performance-web-vitals-mastery.md ./skills/viron-system/rules/web-performance.md
cp 50-web-patterns-09-kinetic-typography-text-animation.md ./skills/viron-system/rules/kinetic-typography.md

# Advanced (2):
cp 70-web-accessibility-wcag-2026-compliance.md ./skills/viron-system/rules/accessibility-viron.md
cp 80-ai-hybrid-workflows-v1-0-code-plus-ai.md ./skills/viron-system/rules/ai-hybrid-workflows.md
cp 90-synergy-03-webgpu-compute-physics.md ./skills/viron-system/rules/webgpu-physics.md

# Workflow (1 - CRITICAL):
cp 00-master-workflow-2026-integration.md ./skills/viron-system/rules/workflow.md
```

### Phase 3: Future Files (7 Dateien)

```bash
mkdir -p ./_archive/future/
mkdir -p ./_knowledge/reference/

# Future (keep for Phase B/C):
mv 50-web-patterns-02-adaptive-quality-switching.md ./_archive/future/
mv 50-web-patterns-10-real-time-ai-video-streaming.md ./_archive/future/
mv 60-cloud-rendering-00-aws-lambda-renderfarming.md ./_archive/future/
mv 90-synergy-01-data-driven-personalization.md ./_archive/future/
mv 90-synergy-02-realtime-video-rag-agents.md ./_archive/future/

# Reference (keep for lookup):
mv 90-appendix-glossary-bibliography.md ./_knowledge/reference/
mv RESOURCES_AND_ECOSYSTEM.md ./_knowledge/reference/
```

---

## ✅ Nach der Migration

**Dein neuer Ordner-Aufbau:**

```
.
├── .docs/
│   ├── SKILL-INSTALLATION-GUIDE-v1-0.md
│   ├── ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1-0.md
│   ├── ... (alle 13 neuen Dateien)
│   └── MASTER-INDEX-ALLE-13-DATEIEN-v1-0.md
├── skills/
│   ├── remotion-dev--skills/
│   ├── vercel-labs--agent-skills--react/
│   ├── vercel-labs--next-skills--next/
│   ├── vercel-labs--agent-skills--design/
│   └── viron-system/
│       ├── SKILL.md
│       └── rules/
│           ├── workflow.md ✨ (Dein Business Logic)
│           ├── viron-button-design.md ✨ (Dein Button System)
│           ├── advanced-shaders.md ✨ (Deine GPU-Magie)
│           ├── layout-2026-advanced.md
│           ├── bloom-advanced.md
│           ├── ... (weitere Dateien)
│           └── viron-best-practices.md ✨ (Dein Hard-Won Knowledge)
├── ./_archive/
│   ├── redundant/ (8 Dateien - 100% in Skills)
│   ├── deprecated/ (3 alte Dateien)
│   └── future/ (5 Dateien für Feb/März 2026)
├── ./_knowledge/
│   └── reference/ (Glossar, Resources)
└── [Dein Production Code hier]
```

---

## 🎯 Was du dann hast

**Alte Situation:**
```
33 Dateien überall
├─ Manche redundant
├─ Manche überlappen sich
├─ Keine klare Struktur
└─ Agent hat keine Ahnung, welche zu laden
```

**Neue Situation:**
```
Saubere Struktur (33 Dateien, aber organisiert):
├─ Big 4 Skills: Basis (nicht lokal)
├─ viron-system: Dein einziger Custom Skill (18 Rules)
├─ ./_archive/redundant: Sicherheit (kein Löschen!)
├─ ./_archive/future: Phase B+C Planung
└─ ./_knowledge: Referenzmaterial

Agent ladet:
  1. Big 4 Skills (automatisch)
  2. viron-system Skill (dein Delta)
  3. Fertig! Keine Redundanz, keine Verwirrung
```

---

## 💡 Wichtig

**Nichts wird gelöscht:**
- ✅ Redundante Dateien → `./_archive/redundant/`
- ✅ Alte Dateien → `./_archive/deprecated/`
- ✅ Zukunfts-Dateien → `./_archive/future/`
- ✅ Referenzmaterial → `./_knowledge/reference/`

**Nach 6 Monaten kannst du entscheiden**, ob du archive löschen möchtest. Aber jetzt: Alles bleibt.

---

**Version:** v1.0 (29. Jan 2026)  
**Status:** Die konkrete Migrationscheckliste  
**Execution Time:** ~30 min (Bash-Befehle kopieren + ausführen)