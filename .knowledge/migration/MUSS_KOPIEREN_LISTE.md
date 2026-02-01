# MUSS KOPIEREN - Liste (Basierend auf Analyse)

**Datum:** 2026-02-01
**Quelle:** remotion-studio → Ziel: Viron Studio
**Prinzip:** KOPIEREN (nicht verschieben)

---

## 🔴 SYSTEM-KRITISCH (Muss auf jeden Fall)

### Viron-Core (System-Paradigma)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 1 | `viron-core/vision.md` | `viron-core/vision.md` | "Video as Code" Paradigma, Herzstück |
| 2 | `viron-core/pipeline.md` | `viron-core/pipeline.md` | Render-Pipeline, Codec-Profile, Lambda |
| 3 | `viron-core/workflow.md` | `viron-core/workflow.md` | Git-Flow, Commit-Convention, FPS-Monitoring |
| 4 | `viron-core/physics.md` | `viron-core/physics.md` | 7 Departments, Canon Packs, PBR |
| 5 | `viron-core/theme.md` | `viron-core/theme.md` | Design Tokens, Metallic Palette |

### System-Architektur (Recherche)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 6 | `Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md` | `knowledge/research/system/folder-structure.md` | 7 Departments, Ordner-Logik |
| 7 | `Remotion Recherche/23_ROUTING_MATRIX_Inputs.md` | `knowledge/research/system/routing-inputs.md` | Input Detection, Context Budgets |
| 8 | `Remotion Recherche/24_ROUTING_MATRIX_Outputs.md` | `knowledge/research/system/routing-outputs.md` | Output Specs, Codecs, LUFS |
| 9 | `Remotion Recherche/00-master-workflow-2026-integration.md` | `knowledge/index/master-workflow.md` | Gesamt-Workflow, Entscheidungslogik |

---

## 🟡 TECHNOLOGIE-KRITISCH (Wichtige Recherche)

### Audio (Badge 6)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 10 | `Remotion Recherche/40-audio-reaktiv-00-fft-frequenzspektren.md` | `knowledge/research/audio/fft-frequenzspektren.md` | FFT-Bänder, Audio-Reaktivität |

### Cloud (Badge 7)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 11 | `Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md` | `knowledge/research/cloud/aws-lambda-renderfarming.md` | Cloud Tiers, CRF-Werte, Cost Calculator |

### FX/Post-Processing (Badge 3)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 12 | `Remotion Recherche/30-post-processing-00-overview-postprocessing-stack.md` | `knowledge/research/fx/postprocessing-overview.md` | FX Stack Übersicht |
| 13 | `Remotion Recherche/30-post-processing-01-bloom-selective.md` | `knowledge/research/fx/bloom-selective.md` | Bloom-Effekt |
| 14 | `Remotion Recherche/30-post-processing-02-depth-of-field.md` | `knowledge/research/fx/depth-of-field.md` | DoF |
| 15 | `Remotion Recherche/30-post-processing-03-04-chromatic-und-grain.md` | `knowledge/research/fx/chromatic-grain.md` | Chromatic Aberration, Film Grain |

### 3D/Advanced (Badge 2)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 16 | `Remotion Recherche/40-advanced-lighting-00-caustics-volumetric.md` | `knowledge/research/3d/lighting-caustics-volumetric.md` | Caustics, Volumetric |
| 17 | `Remotion Recherche/40-gltf-models-00-loading-optimization.md` | `knowledge/research/3d/gltf-loading-optimization.md` | GLTF, 3D-Modelle |

---

## 🟢 PATTERNS & GUIDES (Wiederverwendbar)

### Patterns

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 18 | `patterns/BarChart.md` | `patterns/BarChart.md` | Wiederverwendbares Pattern |
| 19 | `patterns/Typewriter.md` | `patterns/Typewriter.md` | Wiederverwendbares Pattern |
| 20 | `patterns/WordHighlight.md` | `patterns/WordHighlight.md` | Wiederverwendbares Pattern |

### Guides

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 21 | `guides/compositions.md` | `guides/compositions.md` | Composition-Best Practices |
| 22 | `guides/sequencing.md` | `guides/sequencing.md` | Sequencing-Guide |
| 23 | `guides/viron-button-guide.md` | `guides/viron-button-guide.md` | Button-System Guide |

### Templates (Aktuell)

| # | Quelle | Ziel | Begründung |
|:--|:-------|:-----|:-----------|
| 24 | `.agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md` | `.agent/templates/briefing-template-v6.1.md` | Aktuelles Template (Gold Standard) |
| 25 | `.knowledge/templates/EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md` | `.agent/templates/extraction-report-template-v2.md` | Report-Vorlage |

---

## 🔵 OPTIONALE ERWEITERUNGEN (Kann man kopieren)

### Web Patterns

| # | Quelle | Ziel | Anmerkung |
|:--|:-------|:-----|:----------|
| 26 | `Remotion Recherche/50-web-patterns-02-adaptive-quality-switching.md` | `knowledge/research/web/adaptive-quality.md` | Quality Switching |
| 27 | `Remotion Recherche/50-web-patterns-08-performance-web-vitals-mastery.md` | `knowledge/research/web/web-vitals.md` | Web Vitals |

### Weitere Themen

| # | Quelle | Ziel | Anmerkung |
|:--|:-------|:-----|:----------|
| 28 | `Remotion Recherche/40-procedural-patterns-00-noise-voronoi-terrain.md` | `knowledge/research/procedural/noise-voronoi.md` | Procedural Patterns |
| 29 | `Remotion Recherche/80-ai-hybrid-workflows-v1-0-code-plus-ai.md` | `knowledge/research/ai/hybrid-workflows.md` | AI Workflows |
| 30 | `Remotion Recherche/70-web-accessibility-wcag-2026.md` | `knowledge/research/accessibility/wcag-2026.md` | Accessibility |

---

## ❌ NICHT KOPIEREN (Meine Einschätzung)

| Kategorie | Beispiele | Begründung |
|:----------|:----------|:-----------|
| **Archive** | `16_ARCHIVE_*` bis `21_ARCHIVE_*` | Explizit als Archiv markiert |
| **Alte Agent-Prompts** | `AGENT-INITIALIZATION-*` | Veraltet, neuere Versionen existieren |
| **Alte Reports** | Badge Reports V1-V4 | Nur V5/V6/V7 Ultimate behalten |
| **Build/Temp** | `build/`, `node_modules/` | Generiert |
| **Troubleshooting** | `FEHLERLOSUNG-*` | Kann neu geschrieben werden |
| **Externe Guides** | `HANDOVER-GUIDE-EXTERNAL-*` | Externer Fokus |

---

## 📊 Zusammenfassung

| Kategorie | Anzahl | Priorität |
|:----------|:-------|:----------|
| 🔴 System-kritisch | 9 | MUSS |
| 🟡 Technologie-kritisch | 8 | SEHR WICHTIG |
| 🟢 Patterns & Guides | 8 | WICHTIG |
| 🔵 Optional | 5 | KANN |
| **Gesamt** | **~30 Dateien** | - |

---

## ⚠️ Hinweis

Diese Liste basiert auf **Dateinamen und Kontext** aus den letzten Stunden. Für finale Entscheidung sollten die Agenten laufen:

1. **Agent 1** filtert Vault/Core-Dateien gegen Skills
2. **Agent 2** analysiert Repo-Infrastruktur
3. Dann: Finale Kopier-Liste erstellen

---

**Nächster Schritt:** Agenten deployen oder diese Liste direkt verwenden?
