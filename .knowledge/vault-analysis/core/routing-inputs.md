# Routing Matrix: Inputs Classification

**Source Vault File:** `23_ROUTING_MATRIX_Inputs.md`
**Type:** Core Agent Logic
**Purpose:** Defines how the Agent classifies incoming user inputs and selects which "Departments" (Knowledge Clusters) to load.

---

## 🎯 Input Classification & Context Loading

Determine the intent based on file type or string pattern, then load the minimum necessary context.

### 1. VIDEO_FILE (`.mp4`, `.mov`, `.webm`)

- **Primary Department:** `DEPT_VIDEO` (Composition, Rendering)
- **Secondary:** `DEPT_RENDER`, `DEPT_OPS`
- **Context to Load:**
  - `VIRON_SYSTEM_ENTRY.md` (System Basics)
  - `VIDEO/remotion-core/*` (Core Remotion Rules)
  - `RENDER/pipeline/*` (Output Settings)

### 2. AUDIO_FILE (`.wav`, `.mp3`)

- **Primary Department:** `DEPT_AUDIO` (Processing, Sync)
- **Secondary:** `DEPT_VIDEO` (Reactive Components)
- **Context to Load:**
  - `AUDIO/specs/audio.md`
  - `VIDEO/remotion-core/*`
  - `AUDIO/processing/normalize.md` (if needed)

### 3. TRANSCRIPT_JSON (`.json`)

- **Pattern:** `{ segments: [{ words: [...] }] }`
- **Primary:** `DEPT_VIDEO` (Captions)
- **Context to Load:**
  - `VIDEO/captions/caption-engine`
  - `ENGINE/core/typography`

### 4. WEBSITE_URL (`http://...`)

- **Primary:** `DEPT_WEB` (Extraction)
- **Secondary:** `DEPT_ENGINE` (Theme Generation)
- **Context to Load:**
  - `WEB/extraction/firecrawl`
  - `ENGINE/core/theme` (Tokens)

### 5. DESIGN_TOKENS (`.json`)

- **Pattern:** Keys like `colors`, `typography`, `spacing`.
- **Primary:** `DEPT_ENGINE` (Theme)
- **Context to Load:**
  - `ENGINE/core/theme`
  - `VIDEO/remotion-core/composition`

---

## 🤖 Combination Logic (Multi-Input)

When multiple inputs exist (e.g. Video + Audio), form a **UNION** of departments.

**Example: Video + Audio**

- Load `DEPT_VIDEO` + `DEPT_AUDIO` + `DEPT_RENDER`
- Sync Protocol: Audio drives Video constraints (length).

**Example: Website + Output Flag**

- Load `DEPT_WEB` + `DEPT_ENGINE` + `DEPT_VIDEO` (Showcase)

---

## 🚫 Context Budget Rules (Optimization)

1. **Lazy Loading:** Never load `DEPT_AUTOMATION` (DBs) unless explicit flag `--enable-db` or connection string is present.
2. **Cap:** Max 50% context budget for "Reference" materials. Reserve rest for "Active Work".
