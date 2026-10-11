# ROUTING_MATRIX_OUTPUTS.md
## Output-Klassifikation & Spezifikationen

**Status:** REFERENCE ROUTING | OUTPUT SPECS  
**Erstellt:** 2026-01-29  
**Für:** IDE-Agent Output-Planning  
**Kategorie:** Agent Logic | Output Classification  

---

## 🎯 Mission

Diese Datei definiert: **Wenn der Agent einen Output-Typ sieht → welche Specs gelten?**

Output-Typen bestimmen nicht nur das Format, sondern auch die **Rendering-Strategy** und welche optionalen Departments geladen werden müssen.

---

## 1️⃣ Output-Typen & Specs

### OUTPUT_TYPE: SHORT (9:16, Vertikal, < 60s)
**Use-Case:** TikTok, Instagram Reels, YouTube Shorts.

**Spezifikationen:**
| Aspekt | Wert |
|---|---|
| **Resolution** | 1080×1920 (9:16) |
| **Codec** | h264 (max compat) |
| **Bitrate** | 3-5 Mbps (mobile-optimiert) |
| **FPS** | 30fps |
| **Duration** | < 60s (typisch 15-45s) |
| **Audio** | -16 LUFS (mobile standard) |
| **Colorspace** | rec709 |
| **Format** | MP4 (.mp4) |

**Departments (loading):**
1. DEPT_VIDEO (Komposition, Mobile Layout)
2. DEPT_RENDER (Mobile Codec Settings)
3. DEPT_AUDIO (normalization, -16 LUFS)
4. DEPT_OPS (Quality Checklist)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md

Departments:
  - VIDEO/remotion-core/documentation_manifest.md (Module 02)
  - RENDER/pipeline/documentation_manifest.md (Module 05, Mobile Rendering Section)
  - AUDIO/processing/16_ARCHIVE_Standard_Audio_Auphonic.md (für -16 LUFS)
  - OPS/recovery/21_ARCHIVE_Standard_Agent_Execution.md (Zero-Touch Quality)

Optional:
  - VIDEO/captions/18_ARCHIVE_Standard_Caption_Engine.md (Neon Captions)
  - AUDIO/processing/17_ARCHIVE_Standard_AutoEdit_Whisper.md (Auto-Cut)
```

**Rendering Command (Template):**
```bash
npx remotion render \
  --codec h264 \
  --concurrency 4 \
  --width 1080 \
  --height 1920 \
  --fps 30 \
  --quality 85 \
  output.mp4
```

**Context Budget:** 40–50% (Medium Load).

---

### OUTPUT_TYPE: SHOWCASE (15–16s, Horizontal, Branding)
**Use-Case:** Website Hero, Design System Showcase, Brand Reveal.

**Spezifikationen:**
| Aspekt | Wert |
|---|---|
| **Resolution** | 1920×1080 (16:9) oder 1440×1080 (4:3) |
| **Codec** | h264 oder ProRes422 (High Quality) |
| **Bitrate** | 8-15 Mbps (broadcast-grade) |
| **FPS** | 30fps oder 60fps |
| **Duration** | 15–16s (fest) |
| **Audio** | -14 LUFS (broadcast standard) |
| **Colorspace** | rec709 oder DCI P3 |
| **Format** | MP4 oder MOV (.mp4 / .mov) |

**Departments (loading):**
1. DEPT_ENGINE (Theme/Tokens, Visual Identity)
2. DEPT_VIDEO (Showcase Composition)
3. DEPT_RENDER (Broadcast Codecs)
4. DEPT_OPS (Delivery QA)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md (Theme Principles)
  - documentation_manifest.md
  - Remotion-Setup.md.txt (Workflow 2: Website → Showcase)

Departments:
  - ENGINE/core/theme.md (Token System)
  - ENGINE/core/PATTERN_Advanced_Shaders.md (optional, für Eye Candy)
  - VIDEO/remotion-core/documentation_manifest.md (Module 02)
  - RENDER/pipeline/documentation_manifest.md (Module 05, Broadcast Section)
  - OPS/recovery/21_ARCHIVE_Standard_Agent_Execution.md

Optional:
  - WEB/extraction/19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md (wenn Website-Basis)
  - AUDIO/reactive/documentation_manifest.md (Module 06, optional Audio Reactive)
```

**Rendering Command (Template):**
```bash
npx remotion render \
  --codec h264 \
  --concurrency 8 \
  --width 1920 \
  --height 1080 \
  --fps 30 \
  --quality 95 \
  --duration-in-frames 480 \
  output.mp4
```

**Context Budget:** 50–60% (Medium-Heavy Load).

---

### OUTPUT_TYPE: EXPLAINER (3–5 Minuten, Horizontal, Educational)
**Use-Case:** Tutorial, How-To, Erklärvideo.

**Spezifikationen:**
| Aspekt | Wert |
|---|---|
| **Resolution** | 1920×1080 (16:9) |
| **Codec** | h264 |
| **Bitrate** | 5-8 Mbps |
| **FPS** | 30fps |
| **Duration** | 3–5 min (180–300s) |
| **Audio** | -16 LUFS (clear voice) |
| **Colorspace** | rec709 |
| **Format** | MP4 (.mp4) |

**Departments (loading):**
1. DEPT_VIDEO (Sequencing, Structure)
2. DEPT_AUDIO (Voice Sync, Reactive)
3. DEPT_OPS (Workflow, Chunking für lange Videos)
4. DEPT_RENDER (Performance Optimization)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md

Departments:
  - VIDEO/remotion-core/documentation_manifest.md (Module 02)
  - VIDEO/sequencing/sync-strategies.md (für lange Videos)
  - AUDIO/specs/audio.md
  - AUDIO/specs/camera.md (Cinematography, Pacing)
  - AUDIO/processing/16_ARCHIVE_Standard_Audio_Auphonic.md
  - AUDIO/reactive/documentation_manifest.md (Module 06)
  - RENDER/pipeline/documentation_manifest.md (Module 05)
  - OPS/recovery/21_ARCHIVE_Standard_Agent_Execution.md (Chunk Rendering)

Optional:
  - ENGINE/core/theme.md (Consistent Branding)
```

**Rendering Command (Template):**
```bash
# Chunk Rendering für lange Videos
npx remotion render \
  --codec h264 \
  --concurrency 2 \
  --chunk-size 100 \
  --width 1920 \
  --height 1080 \
  --fps 30 \
  output.mp4
```

**Context Budget:** 60–70% (Heavy Load).

---

### OUTPUT_TYPE: DATA_DASHBOARD_VIDEO (Variabel, Daten-Driven)
**Use-Case:** KPI-Report, Metrics Visualization, Live Data Showcase.

**Spezifikationen:**
| Aspekt | Wert |
|---|---|
| **Resolution** | 1920×1080 oder 1280×720 (data-optimiert) |
| **Codec** | h264 |
| **Bitrate** | 4-6 Mbps |
| **FPS** | 30fps |
| **Duration** | 30s–2 min (Variabel) |
| **Audio** | -16 LUFS oder Stille |
| **Colorspace** | rec709 |
| **Format** | MP4 (.mp4) |

**Departments (loading):**
1. DEPT_VIDEO (Chart/Data Rendering)
2. DEPT_RENDER (Performance für Data)
3. DEPT_OPS (Real-Time Data Handling)
4. DEPT_AUTOMATION (Supabase/DB Integration)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md (Module 01: Architektur)

Departments:
  - VIDEO/remotion-core/documentation_manifest.md (Module 02)
  - RENDER/pipeline/documentation_manifest.md (Module 05)
  - OPS/workflow/HUMAN_OPERATOR_GUIDE.md (Data Handling)
  - OPS/recovery/21_ARCHIVE_Standard_Agent_Execution.md

Required (nur für Data-Driven):
  - AUTOMATION/data-driven/20_ARCHIVE_Standard_Dynamic_Data_Supabase.md (MCP, Live Query)

Optional:
  - AUDIO/reactive/documentation_manifest.md (if animated sync to data)
```

**Rendering Command (Template):**
```bash
# Data-Driven: Daten beim Render-Start laden
npx remotion render \
  --codec h264 \
  --concurrency 4 \
  --width 1920 \
  --height 1080 \
  --fps 30 \
  --props '{"dataSource":"supabase","query":"SELECT ..."}' \
  output.mp4
```

**Context Budget:** 40–50% (Medium Load, aber mit External Dependencies).

---

### OUTPUT_TYPE: PRODUCTION_RENDER (Full Quality, Archival)
**Use-Case:** Broadcasting, Archival, High-End Distribution.

**Spezifikationen:**
| Aspekt | Wert |
|---|---|
| **Resolution** | 3840×2160 (4K) oder 1920×1080 (2K) |
| **Codec** | ProRes422HQ oder H.265 (HEVC) |
| **Bitrate** | 50-100 Mbps (lossless-like) |
| **FPS** | 24fps oder 30fps |
| **Duration** | Beliebig |
| **Audio** | -14 LUFS (broadcast) oder -18 LUFS (archival) |
| **Colorspace** | DCI P3 oder rec2020 |
| **Format** | MOV (.mov) oder MXF (.mxf) |

**Departments (loading):**
1. DEPT_RENDER (Broadcast Codecs, High Concurrency)
2. DEPT_OPS (QA Checklist, Delivery)
3. DEPT_AUDIO (Broadcast Audio, Metering)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md

Departments:
  - RENDER/pipeline/documentation_manifest.md (Module 05, Broadcast/Archive Section)
  - RENDER/troubleshooting/troubleshooting.md (Module 09, for edge cases)
  - OPS/workflow/documentation_manifest.md (Module 08)
  - OPS/recovery/21_ARCHIVE_Standard_Agent_Execution.md
  - AUDIO/specs/audio.md (Audio Metering)
```

**Rendering Command (Template):**
```bash
# Full Quality, High Concurrency
npx remotion render \
  --codec prores \
  --prores-profile hq \
  --concurrency 8 \
  --width 3840 \
  --height 2160 \
  --fps 30 \
  --quality 100 \
  output.mov
```

**Context Budget:** 50% (Focused Load, production-only).

---

### OUTPUT_TYPE: AD_COMMERCIAL (30s–60s, Attention-Grabbing)
**Use-Case:** Social Media Ad, YouTube Pre-roll, Sponsored Content.

**Spezifikationen:**
| Aspekt | Wert |
|---|---|
| **Resolution** | 1080×1920 (Vertikal) oder 1920×1080 (Horizontal) |
| **Codec** | h264 |
| **Bitrate** | 5-8 Mbps |
| **FPS** | 30fps |
| **Duration** | 30s, 15s, oder 6s (strict) |
| **Audio** | -14 LUFS (punchy) oder -16 LUFS (normalized) |
| **Colorspace** | rec709 (sRGB safe) |
| **Format** | MP4 (.mp4) |

**Departments (loading):**
1. DEPT_ENGINE (Visual Impact, Eye Candy)
2. DEPT_VIDEO (Composition, Motion)
3. DEPT_AUDIO (Punch, Energy)
4. DEPT_RENDER (Ad-Spec Codecs)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md (Visual Identity)
  - documentation_manifest.md

Departments:
  - ENGINE/core/theme.md (Brand Colors)
  - ENGINE/core/PATTERN_Advanced_Shaders.md (Visual Effects)
  - VIDEO/remotion-core/documentation_manifest.md (Module 02)
  - AUDIO/reactive/documentation_manifest.md (Module 06, Audio-driven Visuals)
  - RENDER/pipeline/documentation_manifest.md (Module 05)
  - OPS/recovery/21_ARCHIVE_Standard_Agent_Execution.md

Recommended:
  - High-End Visuelle Effekte für Remotion.pdf (Eye Candy Reference)
```

**Rendering Command (Template):**
```bash
# Ad Specs: Exact Duration + Punchy Audio
npx remotion render \
  --codec h264 \
  --concurrency 6 \
  --width 1080 \
  --height 1920 \
  --fps 30 \
  --duration-in-frames 900 \
  --quality 90 \
  output.mp4
```

**Context Budget:** 55–65% (Heavy Load for VFX).

---

## 2️⃣ Output-Type Decision Tree

```
OUTPUT-FLAG oder Kontext erkannt
  ↓
Ist es --output <type>?
  ├─ JA → Bestimme OUTPUT_TYPE aus Flag
  └─ NEIN → Heuristische Erkennung aus Input-Duration/Resolution
      ├─ Duration < 60s + Vertical → SHORT
      ├─ Duration 15–16s + Horizontal → SHOWCASE
      ├─ Duration 3–5 min + Horizontal → EXPLAINER
      ├─ Data-driven Flag → DATA_DASHBOARD_VIDEO
      ├─ --broadcast flag → PRODUCTION_RENDER
      ├─ --is-ad flag → AD_COMMERCIAL
      └─ Default → SHORT (safest für unbekannte Inputs)
  
  ↓
Output-Type determiniert
  ↓
Load Output-Spezifikationen (Codec, FPS, Bitrate)
  ↓
Merge mit Input-Departments (Union)
  ↓
Final Load-Paket vorbereiten
```

---

## 3️⃣ Context Budget per Output-Type

Diese Limits verhindern "alles laden"-Bloat:

| Output-Type | Budget | Departments | Grund |
|---|---|---|---|
| SHORT | 40% | VIDEO, RENDER, AUDIO, OPS | Kleine, fokussierte Jobs |
| SHOWCASE | 50% | ENGINE, VIDEO, RENDER, OPS | Design-intensiv, aber kurz |
| EXPLAINER | 65% | VIDEO, AUDIO, OPS, RENDER | Long-Form = mehr Code |
| DATA_DASHBOARD | 50% | VIDEO, RENDER, OPS, (AUTOMATION) | External Deps zählen |
| PRODUCTION_RENDER | 50% | RENDER, OPS, AUDIO | Focused, Production-only |
| AD_COMMERCIAL | 60% | ENGINE, VIDEO, AUDIO, RENDER | VFX-Heavy |

---

## 4️⃣ Quality Checklist (pro Output-Type)

Diese Checklisten laden in OPS/recovery/21_ARCHIVE.

### SHORT Checklist
- [ ] Audio normalized to -16 LUFS
- [ ] Mobile-safe (9:16, 1080×1920)
- [ ] Captions present (if speech)
- [ ] Render time < 2 min (30fps)
- [ ] File size < 50 MB

### SHOWCASE Checklist
- [ ] Theme/Tokens loaded and applied
- [ ] 15–16s duration exact
- [ ] Broadcast-grade (h264, 8+ Mbps)
- [ ] Color profile correct (rec709)
- [ ] Audio present or clearly silent

### EXPLAINER Checklist
- [ ] Audio perfectly synced to script
- [ ] All cuts clean (no jump frames)
- [ ] Pacing consistent (3–5 min total)
- [ ] Chapter markers (optional but recommended)
- [ ] End-screen ready

### PRODUCTION_RENDER Checklist
- [ ] ProRes or H.265 codec confirmed
- [ ] 4K resolution confirmed
- [ ] Colorspace correct (DCI P3 or rec2020)
- [ ] Audio metering verified (-14 LUFS)
- [ ] Archival backup created

---

**END OF DATEI 24**

Status: ✅ READY FOR REVIEW | Finale: Datei 25 (Migration Order)
