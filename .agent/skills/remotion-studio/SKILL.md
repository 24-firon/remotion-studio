---
name: remotion-studio

description: The Universal Creative Engine. High-end video generation, shared web/video architecture, and bare-metal infrastructure. This skill EXTENDS the official remotion-best-practices skill.

metadata:
  priority: 1000
  tags: viron, production, 3d, physics, monorepo
---

# Viron Creative Engine (Universal)

> **⚠️ SKILL HIERARCHY WARNING**
>
> This skill is an EXTENSION of `../remotion-best-practices/`.
> The base skill is the **OFFICIAL Remotion skill** and must NEVER be modified.
> All project-specific rules belong HERE in `remotion-studio/`.

---

## 📚 SKILL ROUTER: What to Load and When

This section documents BOTH skills and when to load each file.

### Base Skill: `remotion-best-practices/` (OFFICIAL - DO NOT TOUCH)

The official Remotion skill contains 33 rule files. Here's when to load each:

| Category           | Rule File                 | Load When...                                   |
| ------------------ | ------------------------- | ---------------------------------------------- |
| **Core Animation** | `animations.md`           | Any animation work - MUST read first           |
| **Core Animation** | `timing.md`               | Using spring(), interpolate(), or easing       |
| **Core Animation** | `trimming.md`             | Cutting beginning/end of animations            |
| **3D Content**     | `3d.md`                   | Using Three.js, React Three Fiber, ThreeCanvas |
| **Sequencing**     | `sequencing.md`           | Using Sequence, Series, timing layout          |
| **Sequencing**     | `transitions.md`          | Scene transitions (fade, slide, wipe)          |
| **Sequencing**     | `compositions.md`         | Defining Composition, Still, Folder            |
| **Media**          | `assets.md`               | Importing images, videos, audio, fonts         |
| **Media**          | `audio.md`                | Audio trimming, volume, speed, pitch           |
| **Media**          | `videos.md`               | Video embedding, trimming, looping             |
| **Media**          | `images.md`               | Using Img component                            |
| **Media**          | `gifs.md`                 | Displaying GIFs synchronized to timeline       |
| **Media**          | `fonts.md`                | Loading Google Fonts or local fonts            |
| **Effects**        | `light-leaks.md`          | Using @remotion/light-leaks overlays           |
| **Effects**        | `transparent-videos.md`   | Rendering with transparency                    |
| **Text**           | `text-animations.md`      | Typewriter, word highlighting                  |
| **Text**           | `measuring-text.md`       | Fitting text to containers                     |
| **Data**           | `charts.md`               | Bar charts, pie charts, data viz               |
| **Data**           | `parameters.md`           | Zod schema, parametrizable videos              |
| **Data**           | `calculate-metadata.md`   | Dynamic duration/dimensions                    |
| **Captions**       | `subtitles.md`            | General caption routing                        |
| **Captions**       | `display-captions.md`     | TikTok-style pages, word highlighting          |
| **Captions**       | `import-srt-captions.md`  | Importing .srt files                           |
| **Captions**       | `transcribe-captions.md`  | Generating captions from audio                 |
| **Utilities**      | `measuring-dom-nodes.md`  | Measuring DOM elements                         |
| **Utilities**      | `lottie.md`               | Embedding Lottie animations                    |
| **Utilities**      | `maps.md`                 | Mapbox maps with animation                     |
| **Platform**       | `tailwind.md`             | TailwindCSS setup (⚠️ NOT for video content)   |
| **Media Queries**  | `can-decode.md`           | Check video decode support                     |
| **Media Queries**  | `extract-frames.md`       | Extract frames at timestamps                   |
| **Media Queries**  | `get-audio-duration.md`   | Get audio length                               |
| **Media Queries**  | `get-video-duration.md`   | Get video length                               |
| **Media Queries**  | `get-video-dimensions.md` | Get video width/height                         |

---

### Extension Skill: `remotion-studio/` (VIRON ENTERPRISE)

This skill adds Viron-specific patterns and overrides. Load these for production work:

| Category             | Rule File                   | Purpose                                 |
| -------------------- | --------------------------- | --------------------------------------- |
| **Visual Standards** | `01-visual-engine.md`       | AgXToneMapping, lighting, HDRI rules    |
| **Infrastructure**   | `02-infrastructure.md`      | Hetzner GPU, xvfb, bare-metal setup     |
| **Architecture**     | `03-shared-architecture.md` | Monorepo, Driver Pattern, Tailwind sync |
| **Audio**            | `04-audio-intelligence.md`  | Native audio sync, silence detection    |
| **Materials**        | `05-advanced-materials.md`  | **The Jewel Pattern** (Glass + Chrome)  |
| **Dynamic Content**  | `05-dynamic-content.md`     | fitText, runtime themes, i18n           |

---

## 🚨 CRITICAL VIRON RULES (Extensions/Overrides)

These rules EXTEND or OVERRIDE the base skill:

### 1. Environment Lighting (OVERRIDE)

> **⚠️ ALL REAL-IMAGE ENVIRONMENT PRESETS ARE FORBIDDEN**

The base skill says nothing about this. Viron rule:

- **FORBIDDEN:** `preset="city"`, `preset="studio"`, `preset="apartment"`, `preset="forest"`, `preset="warehouse"`, `preset="park"`, `preset="lobby"`
- **ALLOWED:** Only abstract lighting (directional + ambient + spot) or custom procedural HDRIs
- **REASON:** Real images reflect in chrome/glass materials and break the abstract aesthetic

**Correct Pattern:**

```tsx
// NO Environment preset - use lights only
<ambientLight intensity={0.5} />
<SpotLight position={[10, 10, 10]} intensity={500} />
<directionalLight position={[-5, 5, 5]} intensity={0.5} />
```

### 2. Styling in Video Content (OVERRIDE)

The base skill mentions TailwindCSS. Viron rule:

- **FORBIDDEN:** Tailwind classes in video-rendered components
- **REQUIRED:** Inline styles for ALL video content
- **REASON:** Tailwind may not process correctly in headless rendering

**Reference:** `./../../learnings/LEARNING_002_TailwindInRemotion.md`

### 3. The Jewel Pattern (EXTENSION)

High-end objects = Glass Container + Chrome Core.

**Required Reading:** `./rules/05-advanced-materials.md`

### 4. The Driver Pattern (EXTENSION)

Components must work in Web AND Video.

- Accept `progress` prop (0.0 to 1.0)
- Web: Feed `scrollYProgress` (Framer Motion)
- Video: Feed `interpolate(frame)` (Remotion)
- **NEVER** use CSS transitions

**Reference:** `./rules/03-shared-architecture.md`

---

## 🎨 VISUAL PRESETS & PHILOSOPHY

**REQUIRED READING:** `../../Handover/knowledge/THE_AESTHETIC_MANIFESTO.md`

### Style Router

| Style              | Asset                                 | Tech                                       | Use Case         |
| ------------------ | ------------------------------------- | ------------------------------------------ | ---------------- |
| **PHOTOREAL**      | `rules/assets/visuals/AgXScene.tsx`   | AgXToneMapping, HDRI, MeshPhysicalMaterial | Product shots    |
| **TOON/ANIME**     | `rules/assets/visuals/ToonScene.tsx`  | MeshToonMaterial, Gradient, Outlines       | Stylized content |
| **UI/HOLOGRAPHIC** | `rules/assets/ui/HolographicCard.tsx` | Driver Pattern                             | HUDs, Dashboards |

---

## 🧠 KNOWLEDGE ROUTING

### Setup Server → `rules/02-infrastructure.md`

### Setup Project → `rules/03-shared-architecture.md`

### Make it Look Good → `rules/01-visual-engine.md`

### Make it Sync → `rules/04-audio-intelligence.md`

---

## 📁 ASSET LIBRARY

### Static Assets (Public)

The official asset folder for Remotion is: `apps/video/public/`

- **Location:** `apps/video/public/`
- **Main Logo:** `staticFile('assets/logo.png')`
- **Rule:** Always use `staticFile()` from `remotion` to reference these.
- **Organization:** Keep root `public/` clean; use subfolders like `public/assets/`, `public/models/`, etc.

### Production Assets (Internal)

```
rules/assets/
├── architecture/     # Monorepo templates
├── audio/           # Audio processing scripts
├── infrastructure/  # Server setup scripts
├── ui/              # Shared UI components (HolographicCard)
└── visuals/         # Scene templates (AgXScene, ToonScene)
```
