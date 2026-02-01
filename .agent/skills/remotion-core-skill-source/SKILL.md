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

## 📖 4. DETAILED SKILL REFERENCE (Global Skill Deep Descriptions)

_Diese Sektion gibt Agenten ein tiefes Verständnis für jede Skill-Datei. Nutze sie als Orientierung, um die richtige Datei für deinen Task zu finden._

### Core Animation & Timing

| File                                                                                                                        | Deep Description                                                                                                                                                                                                            |
| :-------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[animations.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/animations.md)**   | Legt die fundamentalen Gesetze für deterministische Animationen fest. Verbietet zeitbasierte CSS-Transitions zugunsten von Frame-basierter Berechnungs-Logik. Dokumentiert Easing-Funktionen für flüssige Bewegungsabläufe. |
| **[timing.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/timing.md)**           | Der tiefe mathematische Kern hinter Bewegungsabläufen. Dokumentiert `spring()` für federbasierte Physik und `interpolate()` für lineare Transformationen. Garantiert industrial-smooth Look.                                |
| **[sequencing.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/sequencing.md)**   | Umfassender Leitfaden zu `<Sequence>` und `<Series>` Tags. Definiert Regeln für modulares Szenen-Clustering und das Zusammenspiel von Start-Offsets und Dauern.                                                             |
| **[transitions.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/transitions.md)** | Katalog standardisierter Szenen-Übergänge (Wipes, Blasts, 3D-Kamera). Basiert auf deterministischen Frame-Inkrementen. Sichert flüssiges Storytelling.                                                                      |
| **[trimming.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/trimming.md)**       | Frame-genaues Zuschneiden von Rohmaterial. Dokumentiert Offset-Berechnungen und Loop-Points für Video/Audio-Assets.                                                                                                         |

### Media Handling

| File                                                                                                              | Deep Description                                                                                                                                     |
| :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[audio.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/audio.md)**   | Tiefe Integration von Sound-Files. Pixelgenaue Platzierung von Audio-Events, Pegel-Normalisierung, Frequenz-Visualisierung für reaktive Musikvideos. |
| **[videos.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/videos.md)** | Embedding und Handling nativer Video-Komponenten. Performance-Aspekte wie Caching und Fehlerbehandlung bei fehlenden Quellmedien.                    |
| **[images.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/images.md)** | Laden, Komprimieren und Sourcing statischer Bilder. WebP/AVIF für Größenreduktion. Maximale Schärfe bei minimalen Ladezeiten.                        |
| **[gifs.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/gifs.md)**     | Einbindung und Optimierung von GIF-Animationen. Loop-Logiken und Transparenz-Handling. CPU-Last-Optimierung beim Dekodieren.                         |
| **[assets.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/assets.md)** | Handling externer Assets (Grafiken, Videos, Lottie). Pfad-Management für lokale und Cloud-Ressourcen. Effizientes Preloading.                        |

### Text & Captions

| File                                                                                                                                        | Deep Description                                                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[fonts.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/fonts.md)**                             | Typografie in Video-Frames. Vermeidung von Layout-Shifts durch Font-Preloading. Google Fonts und Custom WOFF2 Integration.                             |
| **[measuring-text.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/measuring-text.md)**           | Hochpräzise Text-Dimensionsberechnung via SVG-Pfade. Punktgenaue Zentrierung und Ausrichtung vor dem Malvorgang.                                       |
| **[text-animations.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/text-animations.md)**         | Physikalische Gesetze für Text-Animation (Charaktere, Wörter, Sätze). Easing-Kurven für realistische kinetische Typografie. Verbietet CSS-Animationen. |
| **[display-captions.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/display-captions.md)**       | Timing-Engines für wort-genaue Untertitel. Styling-Standards für barrierefreie Outputs. Word-Highlighting basierend auf Transkriptionsdaten.           |
| **[import-srt-captions.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/import-srt-captions.md)** | Parser für SRT/VTT-Dateien. Wandelt externe Zeitstempel in native Remotion-Sequenzen um.                                                               |
| **[transcribe-captions.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/transcribe-captions.md)** | Audio-Transkriptions-Standards. Mapping von Zeitstempeln auf Wortebene für hochsynchrone Captions.                                                     |

### 3D & Advanced Rendering

| File                                                                                                              | Deep Description                                                                                                                                                                 |
| :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[3d.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/3d.md)**         | Definitive Referenz für Three.js in Remotion via R3F. Setup von Szenen, Kameras, Lichtern unter Frame-basiertem Lifecycle. Synchronität zwischen Physik-Simulation und Timeline. |
| **[lottie.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/lottie.md)** | Adobe After Effects Animationen via Lottie. Komplexe Vektor-Grafiken bei minimaler Dateigröße. Pixelgenaue deterministische Wiedergabe.                                          |
| **[charts.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/charts.md)** | Bibliotheken für Datenvisualisierung. Reaktive Diagramme synchron zur Timeline. SVG-Rendering für maximale Schärfe.                                                              |
| **[maps.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/maps.md)**     | Rendering von Kartenmaterial und Geodaten. Animation von Markern, Zoom-Effekten, Routenverläufen.                                                                                |

### Composition & Metadata

| File                                                                                                                                      | Deep Description                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **[compositions.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/compositions.md)**             | Definition und Registrierung von Kompositionen. Props-Schema für externe Injektion. Orchestrierung multipler Szenen.        |
| **[calculate-metadata.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/calculate-metadata.md)** | Asynchrone Anpassung von Kompositions-Einstellungen (Dauer, FPS, Metadaten) vor dem Render. Externe Datenquellen-Injektion. |
| **[parameters.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/parameters.md)**                 | Standard-Schnittstelle für JSON-Konfigurations-Injektion. Trennung von Design-Logik und Daten-Inhalt.                       |

### Media Analysis (Mediabunny)

| File                                                                                                                                          | Deep Description                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **[get-video-duration.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/get-video-duration.md)**     | Mathematisch präzise Bestimmung der Video-Länge in Frames. Berücksichtigt unterschiedliche FPS zur Vermeidung von Drift. |
| **[get-audio-duration.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/get-audio-duration.md)**     | Exakte Bestimmung der Audiolänge vor dem Komponieren. Automatische Skalierung der Video-Dauer basierend auf Voiceover.   |
| **[get-video-dimensions.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/get-video-dimensions.md)** | Dynamische Ermittlung von Breite/Höhe bei variablen Video-Quellen. Automatische Canvas-Format-Anpassung.                 |
| **[extract-frames.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/extract-frames.md)**             | Skalierbare Extraktion einzelner Frames. Automatisierte Thumbnail/Poster-Generierung.                                    |
| **[can-decode.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/can-decode.md)**                     | Prüfprotokoll für Browser-Decoder-Kompetenz. Verifiziert H.264, VP9, Opus Unterstützung.                                 |

### Styling & Layout

| File                                                                                                                                        | Deep Description                                                                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| **[tailwind.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/tailwind.md)**                       | Tailwind CSS in Remotion. Performance-Hacks wie Purging. Schnelle Entwicklung konsistenter UI-Komponenten. |
| **[measuring-dom-nodes.md](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/measuring-dom-nodes.md)** | Echtzeit-Vermessung von UI-Elementen. Dynamische Overlay-Platzierung basierend auf Render-Objekt-Größen.   |

---

## 🎁 5. CODE ASSETS (Ready-to-Use Components)

_Basispfad: [rules/assets/](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/assets/)_

| Component                                                                                                                                                                  | Purpose                                                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **[charts-bar-chart.tsx](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/assets/charts-bar-chart.tsx)**                             | Standard-Implementation für reaktive Balkendiagramme. Deklaratives SVG-Rendering für maximale Schärfe. |
| **[text-animations-typewriter.tsx](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/assets/text-animations-typewriter.tsx)**         | Highperformante Typewriter-Komponente mit variablen Delays, Cursor-Specs und Fehler-Simulationen.      |
| **[text-animations-word-highlight.tsx](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/assets/text-animations-word-highlight.tsx)** | Wort-basierte Highlighting-Animations ("Captions Engine"). Synchron zu Voiceover-Zeitstempeln.         |

---

_Local Pointer v2.0 | Enhanced for Agent Orientation | 2026-01-30_
