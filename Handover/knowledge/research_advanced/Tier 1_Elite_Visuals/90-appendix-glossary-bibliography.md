# Glossary – Begriffe erklärt

## A

### Ambient Occlusion (AO)
Shader-Technik, die Schatten in Vertiefungen und Ecken rendern. **Baked** (vorberechnete Texturen) sind schneller für Remotion.

### Animation Primitiv
Basis-Animationskomponente wie `interpolate()`, `spring()`, `Sequence`. Siehe auch: Easing.

### Anisotropic Blur
Richtungsabhängige Blur-Streuung. Nutze für realistisches Glas/Epoxy mit Richtungseffekten.

## B

### Bezier-Kurve
Kubische Kurve (definiert durch 4 Punkte) für smooth Motion Design. Format in Remotion: `Easing.bezier(x1, y1, x2, y2)`.

### Baking
Vorberechnete Texturen statt Realtime-Rendering. Strategie: Komplexe Effekte in 512x512 Texturen backen, dann in High-Res composite nutzen.

### BlendFunction
Wie werden zwei Schichten gemischt? Z.B. `ADDITION` (additive blending), `MULTIPLY` (multiplikativ).

### Bokeh
Ästhetische Qualität der unscharfen Bereiche bei Depth of Field. Größere `bokehScale` = größere, künstlerischere Bokeh-Kreise.

### Bloom
Post-Processing-Effekt: helle Objekte strahlen. "Selective" = nur oberhalb `luminanceThreshold`.

## C

### Canvas
React-Three-Fiber `<Canvas>` – der 3D-Rendering-Container. **Wichtig:** Post-Processing muss INNERHALB Canvas sein.

### Caustics
Lichtmuster, entstehen wenn Lichtstrahlen durch gekrümmte Flächen (Wasser, Glas) gebündelt werden. **WebGL-Pipeline:** FBO-Rendering → Refraktions-Mapping → Projektion.

### Chromatic Aberration
Regenbogen-Effekt an Bildkanten. Simuliert optische Linseneigenschaften.

### CRT-Shader
Cathode Ray Tube Effekt: Scanlines, Krümmung, Farbsaum für Terminal/Retro-Look.

### CSS Transitions
❌ **NICHT in Remotion verwenden** – brechen Determinismus.

## D

### Determinismus
**Kernprinzip von Remotion:** Bei Frame `N` wird IMMER das identische Ergebnis erzeugt. Ermöglicht Cloud-Rendering (AWS Lambda).

### Depth of Field (DoF)
Post-Processing: Objekte außerhalb eines Fokuspunkts verschwimmen. Parameter: `focusDistance`, `focalLength`, `bokehScale`.

### Displacement Mapping
Vertex-Shader verschieben Oberfläche basierend auf Textur. Z.B. für "liquid surfaces" oder Wellen.

### Downsampling
Performance-Trick: Effect-Rendering bei reduzierter Auflösung. Z.B. `downsampling={2}` = halb-Auflösung, 4x schneller.

## E

### EffectComposer
React-Three-Fiber Komponente für Post-Processing-Pipeline. Reihung: Bloom → DoF → ChromAbbr → FilmGrain.

### Easing Function
Mathematische Kurve, um Zeit zu interpolieren. Z.B. `Easing.bezier()` für smooth motion, `spring()` für physikalische Trgheit.

### Emissive Material
Material, das Licht ausstrahlt (nicht Lichtquellen-abhängig). Wichtig für Bloom-Effekte: `emissive="white"`, `emissiveIntensity={2}`.

## F

### FFT (Fast Fourier Transform)
Algorithmus, der Audio in Frequenzkomponenten zerlegt. Remotion's `visualizeAudio()` nutzt FFT.

### Film Grain
Post-Processing: subtiles Rauschen für analog-Effekt. Parameter: `grain` (Intensität), `animate` (neu bei jedem Frame?).

### FBO (Frame Buffer Object)
WebGL-Technik: Rendern in Texture statt direkt auf Canvas. Basis für Caustics und advanced Post-Processing.

### Focal Length
DoF-Parameter: wie schnell fade ich weg vom Fokuspunkt? Kleiner = steil (Portrait), Größer = flach (Landschaft).

### Focus Distance
DoF-Parameter: WO liegt der Fokuspunkt? Range: 0.0 (nah) bis 1.0 (weit).

### Frame
Eine einzelne "Bildnummer" in der Animation. `useCurrentFrame()` gibt die aktuelle Frame-Nummer zurück (Integer).

### FPS (Frames Per Second)
30 FPS Standard für Video. 1 Sekunde = 30 Frames. Beeinflussen alle Timing-Berechnungen.

## G

### Glossiness
Material-Eigenschaft: wie glänzend ist die Oberfläche? **Inverse von Roughness**.

### GLSL (OpenGL Shading Language)
Sprache für GPU-Shader. Remotion nutzt GLSL indirekt über drei für Custom Shaders.

### Global Illumination (GI)
Realistisches Licht, das überall reflektiert wird. **Teuer**, daher oft gebacken statt Realtime.

## H

### Headless Browser
Browser ohne GUI. Remotion rendert in Headless Chrome (Puppeteer) für Video-Export.

### High-End Eye Candy
Professionelle visuelle Effekte: Caustics, Transmission, Post-Processing kombiniert.

## I

### Interpolate
Remotion-Hook: `interpolate(frame, [inputStart, inputEnd], [outputStart, outputEnd], options)` – Wertebereichs-Mapping mit Easing.

### IOR (Index of Refraction)
Material-Eigenschaft für `MeshTransmissionMaterial`. IOR=1.5 → Glas, IOR=2.42 → Diamant.

## L

### Luminance
Helligkeit eines Pixels. `luminanceThreshold` in Bloom: ab welcher Helligkeit glüht es?

## M

### MeshDistortMaterial
Material für prozedurale Verformung: Fluids, Jelly-Effekte. Parameter: `distort`, `speed`, `amplitude`.

### MeshTransmissionMaterial
Material für physikalisch korrekte Transparenz: Glas, Epoxy. Nutzt Refraktion und Roughness-Blur.

### Motion Blur
Post-Processing: Bewegung wird unschärfer. **Nicht in Standard-Stack**, aber möglich.

## N

### Normal Map
Textur, die Oberflächenrichtungen speichert (statt tatsächliche Geometrie zu deformen). Basis für Caustics FBO-Pipeline.

### Noise
Procedurales Rauschen: Simplex, Perlin, Voronoi. Remotion bietet `@remotion/noise` mit `noise2D/3D/4D`.

## O

### Octave (in Noise)
Mehrfach-Schichtung von Noise mit unterschiedlichen Frequenzen. Mehr Oktaven = feiner Details.

## P

### Post-Processing
Bildverarbeitung NACH 3D-Rendering. Standard-Stack: Bloom → DoF → ChromAbbr → FilmGrain.

### Projection Matrix
Mathematik, um 3D → 2D-Projektionen zu konvertieren. Basis für Kamera-Aufzeichnung.

## R

### React Three Fiber (R3F)
Declarative React Wrapper für drei.js. Syntax: `<Canvas>`, `<mesh>`, `<boxGeometry>` statt Imperativer drei-Code.

### Remotion
Framework für **programmatische Videoerstellung** in React. Deterministische Animationen für Cloud-Rendering.

### Refraction
Licht-Brechung durch transparente Materialien. Basis für `MeshTransmissionMaterial`.

### Roughness
Material-Eigenschaft: wie diffus/rauh ist die Oberfläche? 0=glänzend, 1=matt.

## S

### Sequence
Remotion-Komponente: lokale Zeitverschiebung für Szenen-Orchestrierung. Jede `<Sequence>` hat eigene interne Frame-Zählung.

### Shader
GPU-Programm für Pixel-/Vertex-Verarbeitung. Remotion nutzt GLSL-Shaders über drei/postprocessing.

### Simplex Noise
Noise-Algorithmus besser als Perlin (schneller, weniger Artefakte). `@remotion/noise` nutzt Simplex.

### Spring
Remotion-Hook: `spring(frame, initialValue, { config, from, to })` – Physik-basierte Animation mit Trgheit.

## T

### Thickness (in MeshTransmissionMaterial)
Wie dick ist das transparente Material? Beeinflusst Refraktions-Stärke und Farb-Verlauf.

### Three.js (drei)
WebGL Library für 3D-Grafiken. React-Three-Fiber ist ein React-Wrapper dafür.

### Timeline
Remotion-Konzept: `useCurrentFrame()` ist die Zeitachse. Alles ist Funktion dieser Frame-Zahl.

### Typewriter Effect
Text-Animation: Buchstabe für Buchstabe. Remotion-Variante: stochastische Verzögerungen für menschliches Tipp-Feeling.

## U

### useCurrentFrame
Primärer Remotion-Hook: gibt aktuelle Frame-Nummer zurück. **NICHT `useFrame` von R3F verwenden!**

### useVideoConfig
Remotion-Hook: gibt `{ fps, width, height, durationInFrames }` zurück. Wichtig für FPS-unabhängige Timing.

## V

### Vertex Shader
GPU-Programm, das Geometry deformiert. Z.B. für Wellen, Liquid-Effekte.

### Voronoi
Procedurales Pattern: zerlegt Fläche in Zellen. Nutze für organische Bruchstellen, Zellstrukturen.

### Vignette
Post-Processing: dunkle Kanten für Drama. Optional, nicht in Standard-Stack.

## W

### WebGL
JavaScript-API für GPU-Rendering. Basis für drei.js und Remotion.

## Z

### Z-Fighting
Grafik-Artefakt: zwei Oberflächen auf gleicher Tiefe. Lösung: Geometrie leicht verschieben.

---

# Bibliography – Quellen

## Offizielle Dokumentationen

### Remotion
- **[Remotion Docs](https://www.remotion.dev/docs)** – Offizielles Framework-Dokumentation
- **Highlights:**
  - [`useCurrentFrame`](https://www.remotion.dev/docs/use-current-frame)
  - [`interpolate`](https://www.remotion.dev/docs/interpolate)
  - [`spring`](https://www.remotion.dev/docs/spring)
  - [`Sequence`](https://www.remotion.dev/docs/sequence)
  - [`useVideoConfig`](https://www.remotion.dev/docs/use-video-config)

### React Three Fiber (R3F)
- **[R3F Docs](https://docs.pmnd.rs/react-three-fiber/)** – React-Wrapper für three.js
- **Highlights:**
  - Canvas & Rendering Loop
  - Hooks (`useThree`, `useFrame` – ❌ nicht in Remotion!)
  - Geometries & Materials

### drei.js
- **[drei Docs](https://drei.docs.pmnd.rs/)** – Utility Components für R3F
- **Highlights:**
  - `MeshTransmissionMaterial`
  - `useGLTF`, `useTexture`
  - Math Helpers

### React-Postprocessing
- **[React-Postprocessing Docs](https://react-postprocessing.docs.pmnd.rs/)** – Post-Processing in R3F
- **Effects:**
  - [Bloom](https://react-postprocessing.docs.pmnd.rs/effects/bloom)
  - [Depth of Field](https://react-postprocessing.docs.pmnd.rs/effects/depth-of-field)
  - [Chromatic Aberration](https://react-postprocessing.docs.pmnd.rs/effects/chromatic-aberration)
  - [Film Grain](https://react-postprocessing.docs.pmnd.rs/effects/film-grain)

### Remotion Noise
- **[Remotion Noise Docs](https://www.remotion.dev/docs/noise)** – Procedurales Rauschen
- **Functions:**
  - `noise2D(x, y)`
  - `noise3D(x, y, z)`
  - `noise4D(x, y, z, w)`

## Projektspezifische Quellen

### High-End Visuelle Effekte für Remotion (PDF)
**[file:56]** – Technologischer Context-Katalog für prozedurale visuelle Logik in Remotion

**Kapitel:**
- Kap. 1-2: Timeline-Architektur, Determinismus
- Kap. 3: Interpolation & Easing
- Kap. 4: React Three Fiber Integration
- Kap. 5: Post-Processing Stack (Bloom, DoF, CA, Grain)
- Kap. 6: Procedural Patterns (Noise, Voronoi)
- Kap. 7: OS/UI Simulationen
- Kap. 8: Audio-Synchronisation (FFT, visualizeAudio)

## GitHub Repositories

### Postprocessing
- **[pmndrs/postprocessing](https://github.com/pmndrs/postprocessing)** – Source Code der Effekte
- **Useful for:**
  - GLSL Shader-Implementierungen
  - Parameter Deep-Dives
  - Custom Effect Development

### React-Three-Fiber
- **[pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber)** – R3F Source
- **Useful for:**
  - Hooks Implementation
  - Canvas Architecture

### drei
- **[pmndrs/drei](https://github.com/pmndrs/drei)** – Utility Library
- **Useful for:**
  - Material Source Code
  - Loader Implementations

## Community Resources

### Reddit
- **[r/LocalLLaMA](https://reddit.com/r/LocalLLaMA)** – LLM-Prompting für Remotion/drei
- **[r/threeJS](https://reddit.com/r/threejs)** – three.js Community
- **[r/learnprogramming](https://reddit.com/r/learnprogramming)** – General Help

### Discord Communities
- **[Poimandres Discord](https://discord.gg/poimandres)** – pmndrs community (R3F, drei, postprocessing)
- **[Remotion Discussions](https://github.com/remotion-dev/remotion/discussions)** – GitHub Discussions

### Blog Posts & Articles
- **Maxime Heckel** – "Study of Shaders" & React Three Fiber deep-dives
- **Vercel Blog** – Remotion case studies
- **Dev.to** – Motion design + React tutorials

## Learning Resources

### Video Tutorials
- **[Three.js Journey](https://threejs-journey.com/)** – Comprehensive three.js course (paid)
- **YouTube – Wawa Sensei** – Remotion + R3F tutorials (free)
- **YouTube – Three.js Tutorials** – Basic to advanced (free)

### Interactive Playgrounds
- **[Codesandbox: Remotion Template](https://codesandbox.io/s/remotion-template)** – Quick start
- **[Glitch: React Three Fiber](https://glitch.com/create)** – Live experiments
- **[Shadertoy](https://www.shadertoy.com/)** – Shader inspiration & learning

## Academic/Technical Papers

### Computer Graphics
- **"Real-Time Rendering" by Akenine-Möller et al.** – Graphics fundamentals
- **"GPU Gems"** – Advanced rendering techniques
- **arXiv: Graphics Papers** – Latest research

### Procedural Generation
- **"The Nature of Code" by Daniel Shiffman** – Procedural & physics (free online)
- **Perlin Noise Papers** – Academic references for noise algorithms

## Tools & Resources

### Development
- **VS Code** – Recommended IDE
- **Remotion CLI** – `npm run dev`, `npm run build`
- **Chrome DevTools** – Frame profiling
- **WebGL Inspector** – Shader debugging

### Testing & Profiling
- **Lighthouse** – Performance analysis
- **Chrome Profiler** – Frame timing
- **AWS Lambda** – Cloud rendering setup

## Citation Format

Wenn du diese Datenbank zitierst:

```
High-End Visuelle Effekte für Remotion – Wissensdatenbank v1.0
Zusammengestellt aus: Remotion Docs, React-Postprocessing, PDF [file:56]
Januar 2026
```

## Weitere Ressourcen

### Kostenlos verfügbar
- ✅ Alle Remotion, R3F, drei Docs (OpenSource)
- ✅ Reddit + Discord Communities
- ✅ GitHub Issues & Discussions
- ✅ Dev.to & Hashnode Posts
- ✅ Shadertoy & CodePen Beispiele

### Paid Ressourcen
- 💰 Three.js Journey Course (~60€)
- 💰 Advanced Motion Design Courses
- 💰 Professional Support (Poimandres, Remotion)

---

**Letzte Aktualisierung:** Januar 2026
**Nächste Überprüfung:** Mai 2026 (auf Remotion 5.0+ Kompatibilität)
