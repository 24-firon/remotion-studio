# 📦 VIRON REMOTION-STUDIO SKILL - COMPLETE EXPORT

**Source:** `C:\Workspace\Repos\remotion-studio\.agent\skills\remotion-studio`
**Generated:** 2026-02-08

This file contains ALL files from the `remotion-studio` skill concatenated into a single markdown document for archival/handover purposes.

---

## 📁 FILE STRUCTURE

```
.agent/skills/remotion-studio/
├── SKILL.md
└── rules/
    ├── 01-visual-engine.md
    ├── 02-infrastructure.md
    ├── 03-shared-architecture.md
    ├── 04-audio-intelligence.md
    ├── 05-advanced-materials.md
    ├── 05-dynamic-content.md
    └── assets/
        ├── DEPLOYMENT-GUIDE.md
        ├── architecture/
        │   └── remotion-index.ts
        ├── audio/
        │   └── transcribe_whisperx.ts
        ├── infrastructure/
        │   └── sync-assets.ts
        ├── ui/
        │   └── HolographicCard.tsx
        └── visuals/
            ├── AgXScene.tsx
            └── ToonScene.tsx
```

---

# ═══════════════════════════════════════════════════════════════════════════

# FILE: SKILL.md

# ═══════════════════════════════════════════════════════════════════════════

````markdown
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
````

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

````

---

# ═══════════════════════════════════════════════════════════════════════════
# FILE: rules/01-visual-engine.md
# ═══════════════════════════════════════════════════════════════════════════

```markdown
# Viron Visual Engine Standards

## 1. THE RENDER ENGINE

Use `@remotion/three` and `<ThreeCanvas>`.

- **Hybrid Strategy:** Prefer `gl={{ renderer: 'webgpu' }}` for local RTX previews. Fallback to `webgl` for headless/CI if unstable.
- **Layout:** `layout="none"` for sequences inside canvas.

## 2. REALISTIC LIGHTING (The Physics Standard)

We do not fake lighting with grey colors. We use physical values.

### The HDRI Standard

Use `<Environment>` from `@react-three/drei` ONLY with custom procedural HDRIs.

> **⚠️ ALL REAL-IMAGE ENVIRONMENT PRESETS ARE FORBIDDEN**

- **BANNED:** `preset="city"`, `preset="studio"`, `preset="apartment"`, `preset="forest"`, `preset="warehouse"`, `preset="park"`, `preset="lobby"`, `preset="dawn"`, `preset="night"`, `preset="sunset"`
- **REASON:** Real images reflect in chrome/glass materials and break the abstract aesthetic. Users will see rooms, buildings, trees in their shiny objects.
- **ALLOWED:** Only manual lighting (ambient + directional + spot) or custom abstract HDRIs.

**Correct Lighting Pattern (NO Environment preset):**

```tsx
// Abstract lighting without real-world reflections
<ambientLight intensity={0.5} />
<SpotLight position={[10, 10, 10]} intensity={500} castShadow />
<directionalLight position={[-5, 5, 5]} intensity={0.5} />
````

- **Background:** Always set explicitly with `<color attach="background" args={['#09090b']} />`

### Tone Mapping (AgX Mandate)

The "80% Grey Rule" was a workaround for bad tone mapping.

- **Standard 2026:** Use `AgXToneMapping`. It handles bright highlights without washing out colors (unlike ACES).
- **Code:**
  ```tsx
  <ThreeCanvas gl={{ toneMapping: THREE.AgXToneMapping, toneMappingExposure: 1.0 }}>
  ```

## 3. STYLIZED RENDERING (NPR / Toon)

For non-photoreal looks, abandon PBR logic.

- **Material:** Use `MeshToonMaterial` with a `gradientMap` (Texture) for hard stepping.
- **Outlines:** Use the `<Outlines>` component from Drei.
- **Tone Mapping:** Disable or set to `LinearToneMapping` to preserve pure colors.

## 4. ASSET PIPELINE (Meshopt > Draco)

For high-end automation, loading speed > bandwidth.

- **Compression:** Use **Meshopt**. It decodes significantly faster than Draco, preventing frame drops during rapid scene loading.
- **Memory Safety:** Explicitly clear Three.js cache between renders if running in a long-lived process.
  ```typescript
  THREE.Cache.clear(); // Call this when unmounting a heavy scene
  ```

````

---

# ═══════════════════════════════════════════════════════════════════════════
# FILE: rules/02-infrastructure.md
# ═══════════════════════════════════════════════════════════════════════════

```markdown
# Viron Infrastructure Guide

## 1. LOCAL RENDERING (RTX Workstation)

Use your GPU power directly.

- **Runtime:** Node.js (Bare Metal).
- **GPU Flag:** `Config.setChromiumOpenGlRenderer('angle');` (Best stability on Windows).
- **Workflow:** `npm run render` directly. No containers.

## 2. SERVER RENDERING (Hetzner GPU)

For a single dedicated server, Docker adds complexity without benefit.

### The "Bare Metal" Standard

1. **OS:** Ubuntu 24.04 LTS.
2. **Drivers:** Install proprietary NVIDIA drivers (`sudo ubuntu-drivers autoinstall`).
3. **Runtime:** Install Node.js via `fnm` (Fast Node Manager).
4. **Headless Config:**
   - Install `xvfb` (Virtual Framebuffer) to trick Chrome into seeing a display.
   - Command: `xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx remotion render ...`
   - Flags: `--gl=angle --chromium-flags="--use-gl=egl --enable-gpu-rasterization"`

### Why not Docker?

- Docker requires the NVIDIA Container Toolkit (`nvidia-ctk`), which is fragile during driver updates.
- Direct access allows easier debugging via `htop` / `nvtop`.

## 3. INPUT CONFIGURATION

Keep it simple.

- **Level 1 (Config File):** Edit `input-props.json`.
- **Level 2 (CLI):** `npm run render -- --props='{"text": "Hello"}'`.
- **Level 3 (Local UI):** A simple Next.js page on the server (see Shared Architecture) that triggers the CLI command.
````

---

# ═══════════════════════════════════════════════════════════════════════════

# FILE: rules/03-shared-architecture.md

# ═══════════════════════════════════════════════════════════════════════════

````markdown
# Viron Shared Architecture (Monorepo)

## 1. THE STRUCTURE (Turbo + pnpm)

Organize code to share components between Next.js (Web) and Remotion (Video).

```text
/
├── package.json (Workspaces defined)
├── pnpm-workspace.yaml
├── apps/
│   ├── web/        (Next.js App Router)
│   └── video/      (Remotion Root)
└── packages/
    ├── ui/         (Shared Components: Buttons, Cards)
    ├── config/     (Tailwind, TypeScript, ESLint)
    └── assets/     (3D Models, Fonts - Copied via build script)
```
````

## 2. THE COMPONENT CONTRACT

Components must work in two worlds: Interactive (Web) and Timeline (Video).

### The "Driver" Pattern

Decouple the animation logic from the component.

- **Component:** Accepts `progress` (0.0 to 1.0) prop.
- **Web Consumer:** Feeds `scrollYProgress` (Framer Motion).
- **Video Consumer:** Feeds `interpolate(frame)` (Remotion).

```tsx
// packages/ui/HeroButton.tsx
export const HeroButton = ({ progress, label }) => {
  const rotation = progress * Math.PI * 2;
  return <mesh rotation-y={rotation}>...</mesh>;
};
```

## 3. TAILWIND SYNC

Do not duplicate `tailwind.config.js`.

- Create `packages/config/tailwind-preset.js`.
- Import this preset in both `apps/web` and `apps/video`.
- Define colors/fonts ONCE in the preset.

````

---

# ═══════════════════════════════════════════════════════════════════════════
# FILE: rules/04-audio-intelligence.md
# ═══════════════════════════════════════════════════════════════════════════

```markdown
# Viron Audio Intelligence

## 1. AUDIO SYNC (The Native Way)

We do not use Python scripts for sync anymore.

- **Component:** Use `<Audio />` from `@remotion/media`.
- **Mechanism:** Remotion extracts audio and muxes it via FFmpeg. This guarantees frame-perfect sync, even if the browser preview drifts.
- **Config:** Set `disallowInsecureAudio: true` to prevent accidental `<audio>` tag usage.

## 2. AUTO-CUT (Silence Detection)

Use FFmpeg directly for speed.

- **Command:** `ffmpeg -i input.wav -af silencedetect=n=-40dB:d=0.5 -f null -`
- **Workflow:**
  1. Run command via Node.js `child_process`.
  2. Parse `stderr` to get start/end times of silence.
  3. Generate a Remotion `cutList` JSON.
  4. Feed JSON to `<Sequence>` to skip silent parts.

## 3. TRANSCRIPTION (WhisperX)

For word-level animations ("Karaoke").

- **Tool:** `insanely-fast-whisper` (Python CLI).
- **Hardware:** Runs on your RTX card or Hetzner GPU.
- **Speed:** Transcribes 1 hour in < 30 seconds.
- **Output:** JSON with precise start/end timestamps per word.
````

---

# ═══════════════════════════════════════════════════════════════════════════

# FILE: rules/05-advanced-materials.md

# ═══════════════════════════════════════════════════════════════════════════

````markdown
# Viron Advanced Materials (The Jewel Pattern)

2:
3: ## 1. THE PHILOSOPHY
4:
5: High-End Viron objects are complex composites, not single meshes.
6: They consist of a **Container (Glass)** and a **Core (Metal)**.
7:
8: ## 2. THE RECIPE
9:
10: ### A. The Glass Container (Outer Layer)
11:
12: Use `MeshTransmissionMaterial` to simulate heavy, refractive crystal.
13:
14: `tsx
15: <MeshTransmissionMaterial 
16:     backside
17:     backsideThickness={0.5}
18:     thickness={0.5}          // Volume
19:     roughness={0.05}         // Perfect Polish
20:     transmission={1}         // 100% Clear
21:     ior={1.5}                // Refractive Index (Glass)
22:     chromaticAberration={0.04} // Premium Lens Flaw
23:     anisotropicBlur={0.1}
24:     color="#ffffff"
25: />
26: `
27:
28: ### B. The Chrome Core (Inner Layer)
29:
30: Use `MeshPhysicalMaterial` for the opaque, metallic heart.
31:
32: `tsx
33: <meshPhysicalMaterial 
34:     color="#ffffff"
35:     metalness={1.0}         // 100% Metal
36:     roughness={0.1}         // Polished but realistic
37:     clearcoat={1.0}         // Lacquer Finish
38:     emissive="#000000"
39: />
40: `
41:
42: ## 3. LIGHTING REQUIREMENT

> ⚠️ **NO HDRI PRESETS** (See `01-visual-engine.md`)
> Real-image environment presets are **FORBIDDEN** because they reflect
> in chrome/glass materials and break the abstract aesthetic.

**Correct Lighting Pattern (Manual):**

```tsx
// Abstract lighting without real-world reflections
<ambientLight intensity={0.5} />
<SpotLight position={[10, 10, 10]} intensity={500} castShadow />
<directionalLight position={[-5, 5, 5]} intensity={0.5} />
```
````

- **ToneMapping:** `AgXToneMapping` (Exposure 1.0-1.2).
- **Shadows:** `ContactShadows` for grounding.
- **Background:** Always set explicitly with `<color attach="background" args={['#09090b']} />`

````

---

# ═══════════════════════════════════════════════════════════════════════════
# FILE: rules/05-dynamic-content.md
# ═══════════════════════════════════════════════════════════════════════════

```markdown
# Viron Dynamic Content Rules

## 1. LIQUID LAYOUTS (The "FitText" Law)

Content length is variable. A fixed font size is a bug.

- **Problem:** "Hello" fits. "Guten Tag zusammen" breaks the layout.
- **Solution:** Use `@remotion/layout-utils`.
- **Code:**

  ```tsx
  import { fitText } from "@remotion/layout-utils";

  const { fontSize } = fitText({
    text: props.title,
    withinWidth: 800,
    fontFamily: "Inter",
    minFontSize: 20,
    maxFontSize: 100,
  });

  return <h1 style={{ fontSize }}>{props.title}</h1>;
````

## 2. RUNTIME THEME INJECTION

Do not hardcode colors in `theme.ts` if you need Multi-Tenancy.

- **Pattern:** Inject the theme via `inputProps`.
- **Validation:** Use Zod to ensure the theme is complete.

```tsx
// src/Root.tsx
const ThemeSchema = z.object({
  primary: zColor(),
  secondary: zColor(),
  logoUrl: z.string().url(),
});

export const RemotionRoot = () => {
  return (
    <Composition
      // ...
      schema={z.object({ theme: ThemeSchema })}
      defaultProps={{
        theme: { primary: "#BFF549", secondary: "#000000", logoUrl: "..." },
      }}
    />
  );
};
```

## 3. INTERNATIONALIZATION (i18n)

- **RTL Support:** If `props.language` is 'ar' or 'he', set `dir="rtl"` on the container.
- **Font Fallbacks:** Define a font stack that covers CJK (Chinese/Japanese/Korean) characters if needed (e.g., Noto Sans).

````

---

# ═══════════════════════════════════════════════════════════════════════════
# FILE: rules/assets/DEPLOYMENT-GUIDE.md
# ═══════════════════════════════════════════════════════════════════════════

```markdown
# Viron Deployment Guide

## 1. Initial Setup

Run these commands to bootstrap the monorepo with the Viron Architecture.

```bash
# 1. Install Dependencies
pnpm install

# 2. Sync Assets (Crucial step!)
# Copies 3D models from packages/assets to apps/*/public
pnpm sync-assets

# 3. Start Development
pnpm dev:video  # Starts Remotion Studio
# OR
pnpm dev:web    # Starts Next.js
````

## 2. Environment Variables (.env)

Create a `.env` file in the root:

```env
# Optional: Path to python tools if not in global PATH
WHISPER_EXEC_PATH=/root/.local/bin/insanely-fast-whisper

# Rendering
REMOTION_AWS_ACCESS_KEY_ID=... (Only if using Lambda fallback)
```

## 3. Production Build

```bash
pnpm build
# Then run the render script
pnpm render
```

````

---

# ═══════════════════════════════════════════════════════════════════════════
# FILE: rules/assets/ui/HolographicCard.tsx
# ═══════════════════════════════════════════════════════════════════════════

```tsx
import { useMemo, CSSProperties } from 'react';

interface HolographicCardProps {
  title: string;
  subtitle?: string;
  progress: number; // 0.0 to 1.0 (Driven by Scroll or Frame)
  className?: string;
}

export const HolographicCard = ({
  title,
  subtitle,
  progress,
  className = ''
}: HolographicCardProps) => {

  // Animations based purely on progress prop
  const rotation = useMemo(() => progress * Math.PI * 0.1, [progress]);
  const opacity = useMemo(() => Math.min(progress * 2, 1), [progress]);
  const scale = useMemo(() => 0.8 + progress * 0.2, [progress]);

  const cardStyle: CSSProperties = {
    transform: `perspective(1000px) rotateY(${rotation}rad) scale(${scale})`,
    opacity: opacity,
    // Critical for performance: No CSS transitions here!
    // We let the driver (Remotion/Framer) handle the update loop.
    transition: 'none',
  };

  return (
    <div
      className={`
        relative bg-black/50 border border-brand-500 backdrop-blur-md
        p-8 rounded-xl shadow-2xl ${className}
      `}
      style={cardStyle}
    >
      <div className="relative z-10 text-center">
        <h2 className="text-white text-4xl font-bold mb-2 font-display">{title}</h2>
        {subtitle && <p className="text-brand-300 text-xl font-mono">{subtitle}</p>}
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-500" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-500" />
    </div>
  );
};
````

---

# ═══════════════════════════════════════════════════════════════════════════

# FILE: rules/assets/visuals/AgXScene.tsx

# ═══════════════════════════════════════════════════════════════════════════

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  Float,
  SpotLight,
} from "@react-three/drei";
import * as THREE from "three";
import { HolographicCard } from "../ui/HolographicCard";

interface SceneProps {
  title: string;
  subtitle: string;
}

export const AgXScene = ({ title, subtitle }: SceneProps) => {
  const frame = useCurrentFrame();

  // Smooth intro animation
  const introProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
    easing: (t) => t * (2 - t), // Ease-out
  });

  // Continuous rotation
  const rotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

  return (
    <AbsoluteFill className="bg-slate-950">
      <Canvas
        gl={{
          antialias: true,
          // ⚠️ THE NEW STANDARD: AgX Tone Mapping
          // Handles high dynamic range without washing out colors
          toneMapping: THREE.AgXToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        shadows
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        {/* PBR Lighting Setup */}
        <ambientLight intensity={0.5} />
        <SpotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={500} // High intensity works because of AgX
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* HDRI Environment */}
        <Environment preset="city" background={false} />

        {/* Floating Hero Object */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh rotation-y={rotationY} castShadow receiveShadow>
            <boxGeometry args={[2, 2, 2]} />
            {/* PBR Material: Real glass/metal properties */}
            <meshPhysicalMaterial
              color="#ff4d4d"
              roughness={0.2}
              metalness={0.8}
              clearcoat={1}
              emissive="#ff0000"
              // Dynamic emissive pulse
              emissiveIntensity={interpolate(frame, [0, 30], [0, 2], {
                extrapolateRight: "clamp",
              })}
            />
          </mesh>
        </Float>

        {/* Floor */}
        <mesh rotation-x={-Math.PI / 2} position-y={-2} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </Canvas>

      {/* Shared UI Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <HolographicCard
          title={title}
          subtitle={subtitle}
          progress={introProgress}
        />
      </div>
    </AbsoluteFill>
  );
};
```

---

# ═══════════════════════════════════════════════════════════════════════════

# FILE: rules/assets/visuals/ToonScene.tsx

# ═══════════════════════════════════════════════════════════════════════════

```tsx
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Outlines } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

// Helper: Create Gradient Texture for Toon Steps
function createGradientTexture(steps: number = 3): THREE.DataTexture {
  const colors = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) {
    colors[i] = Math.floor((i / (steps - 1)) * 255);
  }
  const texture = new THREE.DataTexture(
    colors,
    steps,
    1,
    THREE.RedFormat,
    THREE.UnsignedByteType,
  );
  texture.minFilter = THREE.NearestFilter; // Hard edges
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

export const ToonScene: React.FC = () => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // 3-Step Gradient (Dark, Mid, Light)
  const gradientMap = useMemo(() => createGradientTexture(3), []);

  // Hue Rotation Animation
  const hue = interpolate(frame, [0, durationInFrames], [0, 360]);
  const color = useMemo(
    () => new THREE.Color().setHSL(hue / 360, 0.7, 0.5),
    [hue],
  );

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ position: [0, 2, 8], fov: 50 }}
      style={{ backgroundColor: "#f0f0f0" }} // Anime-style bright BG
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />

      {/* Toon Hero */}
      <mesh rotation-y={(frame / fps) * 2}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshToonMaterial color={color} gradientMap={gradientMap} />
        {/* Inverted Hull Outlines */}
        <Outlines thickness={0.05} color="black" />
      </mesh>
    </ThreeCanvas>
  );
};
```

---

# ═══════════════════════════════════════════════════════════════════════════

# FILE: rules/assets/architecture/remotion-index.ts

# ═══════════════════════════════════════════════════════════════════════════

```typescript
/**
 * index.ts
 * Entry Point for Remotion - registers all compositions
 */

import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import { AgXScene } from './scenes/AgXScene';
import { ToonScene } from './scenes/ToonScene';
import './style.css'; // Tailwind import

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AgX"
        component={AgXScene}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
            title: "Viron Creative Engine",
            subtitle: "Photorealism Standard"
        }}
      />
      <Composition
        id="Toon"
        component={ToonScene}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
            title: "Viron Stylized",
            subtitle: "NPR Rendering"
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
```

---

# ═══════════════════════════════════════════════════════════════════════════

# FILE: rules/assets/audio/transcribe_whisperx.ts

# ═══════════════════════════════════════════════════════════════════════════

```typescript
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  score?: number;
}

interface TranscribeOptions {
  model?: "tiny" | "base" | "small" | "medium" | "large-v3";
  language?: string;
  batchSize?: number;
  useFlashAttention?: boolean;
}

/**
 * Transcribes audio using insanely-fast-whisper (GPU accelerated).
 * Requires: pipx install insanely-fast-whisper
 */
export async function transcribeAudio(
  inputPath: string,
  options: TranscribeOptions = {},
): Promise<WordTimestamp[]> {
  const {
    model = "large-v3",
    language = "en",
    batchSize = 24,
    useFlashAttention = true,
  } = options;

  const absInputPath = path.resolve(inputPath);
  const outputPath = absInputPath.replace(/\.\w+$/, ".json");

  // Build CLI command
  // Note: --flash-attn requires NVIDIA Ampere or newer
  const flashAttnFlag = useFlashAttention ? "--flash-attn" : "";
  const langFlag = language ? `--language ${language}` : "";

  const command = `insanely-fast-whisper \\
    --file-name "${absInputPath}" \\
    --model-name "openai/whisper-${model}" \\
    --batch-size ${batchSize} \\
    ${flashAttnFlag} \\
    ${langFlag} \\
    --transcript-path "${outputPath}"`;

  console.log("🎙️ Starting Transcription:", command);

  try {
    const { stdout, stderr } = await execAsync(command);
    console.log(stdout);
    if (stderr) console.error(stderr);

    // Read and parse the result
    const rawData = await fs.readFile(outputPath, "utf-8");
    const json = JSON.parse(rawData);

    // Normalize output to Remotion-friendly format
    // insanely-fast-whisper usually outputs 'chunks', we flatten to words if available
    // Fallback logic depends on specific version output, assuming standard HF format here
    const words: WordTimestamp[] = [];

    if (json.chunks) {
      for (const chunk of json.chunks) {
        // If chunk has word timestamps
        if (chunk.timestamp && Array.isArray(chunk.timestamp)) {
          // Logic to extract words if detailed timestamps exist
          // For now, mapping chunks as fallback if words missing
          words.push({
            word: chunk.text,
            start: chunk.timestamp[0],
            end: chunk.timestamp[1],
          });
        }
      }
    }

    return words;
  } catch (error) {
    console.error("❌ Transcription failed:", error);
    throw error;
  }
}
```

---

# ═══════════════════════════════════════════════════════════════════════════

# FILE: rules/assets/infrastructure/sync-assets.ts

# ═══════════════════════════════════════════════════════════════════════════

```typescript
import fs from "fs-extra";
import path from "path";

// THE ASSET BRIDGE
// Copies shared assets (models, fonts) to web and video public folders.
// Run this before dev or build.

const ASSETS_SOURCE = path.join(process.cwd(), "packages/assets/public");
const TARGETS = [
  path.join(process.cwd(), "apps/web/public/shared"),
  path.join(process.cwd(), "apps/video/public/shared"),
];

async function sync() {
  console.log("🔄 Syncing Shared Assets...");

  if (!fs.existsSync(ASSETS_SOURCE)) {
    console.warn("⚠️ No shared assets folder found at packages/assets/public");
    return;
  }

  for (const target of TARGETS) {
    await fs.ensureDir(target);
    await fs.copy(ASSETS_SOURCE, target, { overwrite: true });
    console.log(`✅ Synced to: ${target}`);
  }
}

sync().catch(console.error);
```

---

# ═══════════════════════════════════════════════════════════════════════════

# END OF EXPORT

# ═══════════════════════════════════════════════════════════════════════════

**Total Files:** 14
**Total Size:** ~25 KB

_Generated by Viron Intelligence System_
