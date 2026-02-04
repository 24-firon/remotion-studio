# 🌍 Video Tech Ecosystem & Resources (2026 Edition)

**Purpose**: The definitive guide to "How we create videos today". A synthesis of the best tools, frameworks, and sources for the Viron/Remotion stack.

---

## 1. The Core Engine: React Three Fiber (R3F)

The foundation of our 3D pipeline. It is not just a renderer; it is an ecosystem.

### The "Holy Trinity"

1.  **React Three Fiber (`@react-three/fiber`)**: The orchestrator. Declarative 3D.
2.  **Drei (`@react-three/drei`)**: The massive utility belt. If you need it, it's probably here.
    - _Key Components_: `<Environment>`, `<Float>`, `<CameraShake>`, `<Sparkles>`, `<Gltf>`.
3.  **Lamina (`lamina`)**: Layer-based shader materials.
    - _Concept_: Build materials like Photoshop layers (Noise + Gradient + Texture).

### Advanced Visuals (VFX)

- **React Postprocessing (`@react-three/postprocessing`)**: The "After Effects" layer.
  - _Essential Effects_: `Bloom` (Glow), `Noise` (Film Grain), `Vignette`, `ChromaticAberration`.
- **Meshline (`meshline`)**: High-performance 3D vector lines.
- **Maath (`maath`)**: Math helpers for smooth animation and color interpolation.

---

## 2. The AI Generation Layer (The "New Ways")

Moving beyond procedural generation to "Prompt-to-Reality".

### 🎥 Generative Video APIs

- **Luma Dream Machine API**:
  - _Capability_: Text-to-Video, Image-to-Video. High coherence.
  - _Use Case_: Generating dynamic backgrounds or transitions that are impossible to code.
  - _Integration_: Async job queue (Submit -> Poll Status -> Download URL).
- **Runway (Gen-3 Alpha / Gen-2)**:
  - _Capability_: Stylization ("Video-to-Video").
  - _Use Case_: Taking a simple Remotion render and "restyling" it as claymation or anime.
- **OpenAI Sora**: (Preview) The heavy hitter for photorealism.

### 🧩 Asset Generation (Textures & Models)

- **Replicate API**: The hub for accessing open-source models (Stable Diffusion, Flux).
  - _Workflow_: Remotion `prefetch()` triggers Replicate -> Replicate returns Image URL -> Remotion renders `<Img />`.
  - _Models_: `flux-pro` (High fidelity textures), `shap-e` (Text-to-3D).
- **CSM / Meshy**: Fast Image-to-3D model generation.

---

## 3. Trusted Asset Sources (The "Human Base")

Where we get high-quality human-made assets (CC0 / Public Domain).

### 🌐 Environments (HDRIs) & Textures

- **[Poly Haven](https://polyhaven.com/)**: **The Gold Standard**.
  - _Content_: Unclipped 16k HDRIs, scan-based PBR textures.
  - _License_: CC0 (Public Domain).
- **[AmbientCG](https://ambientcg.com/)**: Top-tier PBR materials (Floor tiles, Metals, Wood).
- **[Bower's HDRI](https://bwrs.net/)**: Specialized artistic studio setups.

### 🧊 3D Models

- **[PMNDRS Market](https://market.pmnd.rs/)**: Curated assets optimized specifically for React Three Fiber.
- **[Sketchfab](https://sketchfab.com/)**: The massive search engine. Filter by "CC0" for free commercial use.
- **[Kenney Assets](https://kenney.nl/)**: The legendary "Game Dev" library. Low-poly, clean, public domain.

## 4. Remotion Integration Architecture

How to combine "Static/Code" with "Dynamic/AI".

### Pattern A: The "Pre-Baked" Asset (V45 Strategy)

1.  **Source**: Download HDRI/Texture from Poly Haven.
2.  **Storage**: Place in `public/` folder.
3.  **Usage**: Direct synchronous load. Zero latency.
4.  **Pros**: Reliable, fast, works offline (once downloaded).

### Pattern B: The "Just-in-Time" AI Generator

1.  **Source**: Replicate/Luma API.
2.  **Trigger**: `calculateMetadata()` or a pre-build script.
3.  **Process**:
    - Script checks if asset exists.
    - If not, calls API.
    - Waits for generation.
    - Downloads asset to local cache.
4.  **Usage**: Remotion renders the cached file.
5.  **Pros**: Infinite variety. **Cons**: Cost, Latency, Non-deterministic.

---

## 5. Research Protocol

**"How to research?"**

1.  **Identfiy the Domain**: (e.g., "Liquid Physics").
2.  **Search the "Trinity"**: Search React Three Fiber Discord, PMNDRS GitHub, and Twitter.
3.  **Check for "Vanilla" JS**: Often a generic Three.js example exists that can be ported to React.
4.  **Verify License**: CC0 is best. MIT is good. Proprietary is a blocker.
5.  **Test Integration**: Can it run inside a `<Canvas>`?
