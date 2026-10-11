---
name: remotion-core
description: Local router for Remotion Best Practices Skill. Points to local rules in .agent/skills/remotion-best-practices/
match_patterns:
  - remotion
  - video composition
  - frame animation
  - useCurrentFrame
---

# Remotion Core (Local Router)

> **Source:** Local skill rules available at:
> `.agent/skills/remotion-best-practices/rules/`

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

## 📚 SKILL CATEGORIES (Local Rules)

When a task matches a category, load the corresponding rule from the local skill.

| Category                   | Local Rule File                                                              | Key Topics                                  |
| :------------------------- | :--------------------------------------------------------------------------- | :------------------------------------------ |
| **Animation Basics**       | `.agent/skills/remotion-best-practices/rules/animations.md`                  | `useCurrentFrame()`, forbidden patterns     |
| **Timing & Easing**        | `.agent/skills/remotion-best-practices/rules/timing.md`                      | `interpolate()`, `spring()`, `Easing.*`     |
| **Sequencing**             | `.agent/skills/remotion-best-practices/rules/sequencing.md`                  | `<Sequence>`, `<Series>`, `premountFor`     |
| **Transitions**            | `.agent/skills/remotion-best-practices/rules/transitions.md`                 | `<TransitionSeries>`, fade, slide, wipe     |
| **Trimming**               | `.agent/skills/remotion-best-practices/rules/trimming.md`                    | Negative `from`, `durationInFrames`         |
| **3D/R3F**                 | `.agent/skills/remotion-best-practices/rules/3d.md`                          | ThreeCanvas, no `useFrame()`                |
| **Audio**                  | `.agent/skills/remotion-best-practices/rules/audio.md`                       | trimBefore/After, volume callback, pitch    |
| **Video**                  | `.agent/skills/remotion-best-practices/rules/videos.md`                      | Same as audio, plus looping                 |
| **Images**                 | `.agent/skills/remotion-best-practices/rules/images.md`                      | `<Img>`, `getImageDimensions()`             |
| **GIFs**                   | `.agent/skills/remotion-best-practices/rules/gifs.md`                        | `<AnimatedImage>`, `<Gif>`                  |
| **Fonts**                  | `.agent/skills/remotion-best-practices/rules/fonts.md`                       | `@remotion/google-fonts`, `@remotion/fonts` |
| **Text Measuring**         | `.agent/skills/remotion-best-practices/rules/measuring-text.md`              | `fitText()`, `fillTextBox()`                |
| **Text Animations**        | `.agent/skills/remotion-best-practices/rules/text-animations.md`             | Typewriter (slice, not opacity)             |
| **Captions (Display)**     | `.agent/skills/remotion-best-practices/rules/display-captions.md`            | TikTok-style, word highlighting             |
| **Captions (Import)**      | `.agent/skills/remotion-best-practices/rules/import-srt-captions.md`         | `parseSrt()`                                |
| **Captions (Transcribe)**  | `.agent/skills/remotion-best-practices/rules/transcribe-captions.md`         | Whisper (local/web/API)                     |
| **Compositions**           | `.agent/skills/remotion-best-practices/rules/compositions.md`                | Root.tsx, `<Folder>`, `<Still>`             |
| **Calculate Metadata**     | `.agent/skills/remotion-best-practices/rules/calculate-metadata.md`          | Dynamic duration/dimensions                 |
| **Parameters**             | `.agent/skills/remotion-best-practices/rules/parameters.md`                  | Zod schema, `zColor()`                      |
| **Lottie**                 | `.agent/skills/remotion-best-practices/rules/lottie.md`                      | `<Lottie>`, `delayRender`                   |
| **Charts**                 | `.agent/skills/remotion-best-practices/rules/charts.md`                      | Bar/Pie patterns, staggered animation       |
| **Maps**                   | `.agent/skills/remotion-best-practices/rules/maps.md`                        | Mapbox, turf.js, camera animation           |
| **Assets**                 | `.agent/skills/remotion-best-practices/rules/assets.md`                      | `staticFile()`, public folder               |
| **Mediabunny: Duration**   | `.agent/skills/remotion-best-practices/rules/get-video-duration.md`          | `computeDuration()`                         |
| **Mediabunny: Duration**   | `.agent/skills/remotion-best-practices/rules/get-audio-duration.md`          | `computeDuration()`                         |
| **Mediabunny: Dimensions** | `.agent/skills/remotion-best-practices/rules/get-video-dimensions.md`        | `displayWidth/Height`                       |
| **Mediabunny: Frames**     | `.agent/skills/remotion-best-practices/rules/extract-frames.md`              | `extractFrames()`, filmstrip                |
| **Mediabunny: Decode**     | `.agent/skills/remotion-best-practices/rules/can-decode.md`                  | `canDecode()` validation                    |

---

## 🔗 HOW TO USE

1.  **Identify the task domain** (e.g., "I need to add audio").
2.  **Load the specific rule** from the local skill at `.agent/skills/remotion-best-practices/rules/`.
3.  **Follow the pattern** in that rule file.

---

## 🎯 QUICK REFERENCE

| If you need...        | Load this rule...                                                                            |
| :-------------------- | :------------------------------------------------------------------------------------------- |
| Basic animation       | `.agent/skills/remotion-best-practices/rules/animations.md`                                  |
| Spring/smooth motion  | `.agent/skills/remotion-best-practices/rules/timing.md`                                      |
| Video with audio      | `.agent/skills/remotion-best-practices/rules/videos.md` + `.agent/skills/remotion-best-practices/rules/audio.md` |
| 3D/Three.js           | `.agent/skills/remotion-best-practices/rules/3d.md`                                          |
| Captions/Subtitles    | `.agent/skills/remotion-best-practices/rules/display-captions.md`                            |
| Data visualization    | `.agent/skills/remotion-best-practices/rules/charts.md`                                      |
| Google Fonts          | `.agent/skills/remotion-best-practices/rules/fonts.md`                                       |
| Trim/cut content      | `.agent/skills/remotion-best-practices/rules/trimming.md`                                    |
