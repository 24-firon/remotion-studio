---
name: remotion-core
description: Local pointer to the Global Remotion Skill. Contains Core Laws summary and delegates to ~/.gemini/antigravity/global_skills/remotion-best-practices/.
match_patterns:
  - remotion
  - video composition
  - frame animation
  - useCurrentFrame
---

# Remotion Core (Local Pointer Skill)

> **Source:** This is a summary. Full rules are in:
> `~/.gemini/antigravity/global_skills/remotion-best-practices/`

---

## ⚠️ CORE LAWS (Non-Negotiable)

These rules apply to EVERY Remotion project. Violations cause flickering or broken renders.

1.  **Frame-Driven Only:** ALL animations MUST use `useCurrentFrame()`.
    - ❌ `useFrame()` from R3F
    - ❌ CSS `transition-*`, `animate-*`
    - ❌ Tailwind animation classes
    - ❌ `Date.now()`, `setTimeout`, `requestAnimationFrame`

2.  **Remotion Media Components:** Use Remotion's components, not native HTML.
    - ✅ `<Img>` from `remotion` → ❌ `<img>`
    - ✅ `<Video>` from `@remotion/media` → ❌ `<video>`
    - ✅ `<Audio>` from `@remotion/media` → ❌ `<audio>`

3.  **Static Assets:** Use `staticFile()` for `public/` folder assets.

4.  **3D in Remotion:** Use `<ThreeCanvas>` from `@remotion/three`, not `<Canvas>` from R3F.
    - Sequences inside ThreeCanvas need `layout="none"`.

---

## 📚 SKILL CATEGORIES (Delegate to Global)

When a task matches a category, load the corresponding rule from the global skill.

| Category                   | Global Rule File                                             | Key Topics                                  |
| :------------------------- | :----------------------------------------------------------- | :------------------------------------------ |
| **Animation Basics**       | `rules/animations.md`                                        | `useCurrentFrame()`, forbidden patterns     |
| **Timing & Easing**        | `rules/timing.md`                                            | `interpolate()`, `spring()`, `Easing.*`     |
| **Sequencing**             | `rules/sequencing.md`                                        | `<Sequence>`, `<Series>`, `premountFor`     |
| **Transitions**            | `rules/transitions.md`                                       | `<TransitionSeries>`, fade, slide, wipe     |
| **Trimming**               | `rules/trimming.md`                                          | Negative `from`, `durationInFrames`         |
| **3D/R3F**                 | `rules/3d.md`                                                | ThreeCanvas, no `useFrame()`                |
| **Audio**                  | `rules/audio.md`                                             | trimBefore/After, volume callback, pitch    |
| **Video**                  | `rules/videos.md`                                            | Same as audio, plus looping                 |
| **Images**                 | `rules/images.md`                                            | `<Img>`, `getImageDimensions()`             |
| **GIFs**                   | `rules/gifs.md`                                              | `<AnimatedImage>`, `<Gif>`                  |
| **Fonts**                  | `rules/fonts.md`                                             | `@remotion/google-fonts`, `@remotion/fonts` |
| **Text Measuring**         | `rules/measuring-text.md`                                    | `fitText()`, `fillTextBox()`                |
| **Text Animations**        | `rules/text-animations.md`                                   | Typewriter (slice, not opacity)             |
| **Captions (Display)**     | `rules/display-captions.md`                                  | TikTok-style, word highlighting             |
| **Captions (Import)**      | `rules/import-srt-captions.md`                               | `parseSrt()`                                |
| **Captions (Transcribe)**  | `rules/transcribe-captions.md`                               | Whisper (local/web/API)                     |
| **Compositions**           | `rules/compositions.md`                                      | Root.tsx, `<Folder>`, `<Still>`             |
| **Calculate Metadata**     | `rules/calculate-metadata.md`                                | Dynamic duration/dimensions                 |
| **Parameters**             | `rules/parameters.md`                                        | Zod schema, `zColor()`                      |
| **Lottie**                 | `rules/lottie.md`                                            | `<Lottie>`, `delayRender`                   |
| **Charts**                 | `rules/charts.md`                                            | Bar/Pie patterns, staggered animation       |
| **Maps**                   | `rules/maps.md`                                              | Mapbox, turf.js, camera animation           |
| **Assets**                 | `rules/assets.md`                                            | `staticFile()`, public folder               |
| **Mediabunny: Duration**   | `rules/get-video-duration.md`, `rules/get-audio-duration.md` | `computeDuration()`                         |
| **Mediabunny: Dimensions** | `rules/get-video-dimensions.md`                              | `displayWidth/Height`                       |
| **Mediabunny: Frames**     | `rules/extract-frames.md`                                    | `extractFrames()`, filmstrip                |
| **Mediabunny: Decode**     | `rules/can-decode.md`                                        | `canDecode()` validation                    |

---

## 🚀 LOCAL EXTENSIONS (Project-Specific)

These are advanced capabilities integrated directly into this project.

| Category              | Extension File                                         | Purpose                                          |
| :-------------------- | :----------------------------------------------------- | :----------------------------------------------- |
| **Production Audio**  | `extensions/production/audio-auphonic-broadcast.md`    | Broadcast usage (-16 LUFS), Auphonic integration |
| **Auto-Editing**      | `extensions/production/whisper-autoedit.md`            | Whisper transcription + Bad take removal         |
| **Caption Engine**    | `extensions/production/caption-engine-neon.md`         | Kinetic Typography, Neon styling                 |
| **Design Extraction** | `extensions/production/design-extraction-firecrawl.md` | Website to Design Tokens (Firecrawl)             |
| **Dynamic Data**      | `extensions/production/dynamic-data-supabase.md`       | Supabase + MCP real-time rendering               |
| **Agent Execution**   | `extensions/production/agent-execution-philosophy.md`  | Zero-Touch automation rules                      |
| **Synergy: Data**     | `extensions/synergies/data-driven-personalization.md`  | Data-driven video personalization                |
| **Synergy: RAG**      | `extensions/synergies/realtime-video-rag.md`           | Video-RAG Agents (Docs → Video)                  |
| **Synergy: Physics**  | `extensions/synergies/webgpu-compute-physics.md`       | WebGPU Compute Shaders + Physics                 |
| **Web: Streaming**    | `extensions/web/real-time-ai-streaming.md`             | Real-time AI Video Streaming                     |
| **Accessibility**     | `extensions/accessibility/wcag-2026-compliance.md`     | WCAG 2026 Accessibility Patterns                 |
| **AI Workflows**      | `extensions/ai/hybrid-agent-workflows.md`              | Hybrid Code+AI Workflows                         |

---

## 🔗 HOW TO USE

1.  **Identify the task domain** (e.g., "I need to add audio").
2.  **Load the specific rule** from the global skill:
    ```
    view_file ~/.gemini/antigravity/global_skills/remotion-best-practices/rules/audio.md
    ```
3.  **Apply the patterns** from that rule.

---

_Local Pointer v1.0 | Points to Global Skill | 2026-01-30_
