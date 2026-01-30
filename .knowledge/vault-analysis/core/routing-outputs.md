# Routing Matrix: Outputs Specifications

**Source Vault File:** `24_ROUTING_MATRIX_Outputs.md`
**Type:** Core Agent Logic
**Purpose:** Defines technical specifications and context requirements for different output targets.

---

## 🎯 Output Type Definitions & Specs

Identify target output to determine Codecs, Resolutions, and QA Checks.

### 1. OUTPUT_TYPE: SHORT (Vertical, <60s)

- **Use Case:** TikTok, Shorts, Reels
- **Spec:** 1080x1920 | 30fps | h264 | 3-5 Mbps
- **Audio:** -16 LUFS
- **Target Context:** Mobile Layouts, Captions required.

### 2. OUTPUT_TYPE: SHOWCASE (Horizontal, 15-16s)

- **Use Case:** Web Hero, Brand Reveal
- **Spec:** 1920x1080 | 30/60fps | High Bitrate (8-15 Mbps)
- **Audio:** -14 LUFS (Broadcast standard)
- **Target Context:** Design Tokens, High-End Shaders.

### 3. OUTPUT_TYPE: EXPLAINER (Horizontal, 3-5min)

- **Use Case:** Tutorials, Documentation
- **Spec:** 1920x1080 | h264 | Clear Voice
- **Audio:** -16 LUFS
- **Target Context:** Sync Strategies, Sequencing patterns.

### 4. OUTPUT_TYPE: PRODUCTION_RENDER (4K/Archival)

- **Use Case:** Broadcast, Master Backup
- **Spec:** 3840x2160 | ProRes422HQ or HEVC | Lossless-like
- **Audio:** -14 LUFS
- **Target Context:** Render Pipeline (Module 05), Strict QA.

### 5. OUTPUT_TYPE: AD_COMMERCIAL (Punchy, 15/30s)

- **Use Case:** Paid Social, Pre-roll
- **Spec:** Strict duration (exact frames) | Punchy Audio
- **Target Context:** VFX, Motion Graphics (High Impact).

---

## 🌳 Logic Tree: Output Detection

1. **Explicit Flag?** (`--output showcase`) -> Use defined type.
2. **Heuristics?**
   - If Duration < 60s AND Vertical -> Assume `SHORT`.
   - If Duration 3-5min -> Assume `EXPLAINER`.
   - If `--broadcast` -> Assume `PRODUCTION`.
3. **Default:** `SHORT` (Safest fallback for unclassified inputs).

---

## 📋 Context Budget per Output

- **Shorts:** 40% (Focus on Speed)
- **Showcase:** 50% (Focus on Design)
- **Explainer:** 65% (Focus on Structure/Sequence)
- **Production:** 50% (Focus on Codec/Quality correctness)
