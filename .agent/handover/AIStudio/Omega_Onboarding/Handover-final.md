📋 SUBAGENT\_BRIEFING\_BADGE\_4\_INTERNAL.md

Status: DRAFT FOR APPROVAL

Target: Badge 4 (Design System \& UI)

Basis: Viron Omega Decree V1.0 + Badge 7 Codex V11 + Badge 1 Codex V8.5

Analyst: Viron Omega Orchestrator

1\. EXECUTIVE STRATEGY: THE VISUAL LAW

1.1 Die Mission

Wir bauen kein "Theme". Wir bauen ein physikalisches Regelwerk für Licht und Materie.

Badge 4 definiert nicht, wie Dinge aussehen, sondern wie sie sind.

Unsere Ästhetik ist der "Industrial Monolith": Schwer, präzise, metallisch.

1.2 Die Kaskaden-Position (The Why)

Du operierst im Zentrum der Macht.

Nach unten (Inheritance): Du erbst die RAM-Grenzen von Badge 7 (2GB/Thread). Dein Design darf diese nicht sprengen. Du erbst die Zeit-Gesetze von Badge 1. Dein Design muss spring()-animierbar sein.

Nach oben (Dependency): Badge 2 (3D) kann keine Materialien bauen, bevor du die Legierungen definierst. Badge 3 (FX) kann nichts zum Leuchten bringen, bevor du die Emissions-Werte festlegst.

2\. THE FORENSIC INVENTORY (Smoking Guns)

Ich habe die Quelldaten seziert. Dies sind die unverrückbaren Fakten, die in den Codex müssen:

2.1 The Metallic DNA (80% Grey Rule)

Quelle: src/PROJECT\_RULES\_LIGHTING.md / V43\_MASTER\_PLAN.md

Wir malen nicht mit Farben. Wir malen mit Lichtwerten.

Darkest Point: #202020 (Niemals #000000 - Black Holes sind verboten).

Mid Point: #808080 (True Grey).

Highlight: #E0E0E0 (Silver).

Backstop: #404040 Cylinder hinter ALLEM, um "Black Gaps" zu töten.

2.2 The Button Architecture (4-Layer-Stack)

Quelle: guides/viron-button-guide.md

Ein Button ist kein Rechteck. Er ist ein komplexes optisches System.

Layer 1 (Backdrop): AI-generierter Loop (Luma/Runway) als VideoTexture.

Layer 2 (Glass): MeshTransmissionMaterial (Refraction, IOR 1.5).

Layer 3 (Effects): Caustics (Liquid Light) + Lightformers (Neon Accents).

Layer 4 (Post-Processing): Bloom (Threshold 1.0) + Glitch + Grain.

2.3 The "No-CSS" Implementation

Quelle: RULES\_CORE.md / Badge 1 Codex

Verbot: className="hover:scale-110 transition-all" (Tailwind Animationen).

Gebot: const scale = spring({ frame, config: snappy }).

Konsequenz: Deine Komponenten müssen Props für scale, opacity, rotation akzeptieren und an den Style/Mesh weiterreichen.

2.4 Hardware-Sync (The CRF 28 Problem)

Quelle: V43\_STRATEGY.md / Badge 7 Codex

Problem: Badge 7 definiert "Draft Tier" mit CRF 28. Das zerstört subtile Farbverläufe (Banding).

Lösung: Texture Mapping ("Nano-Banana"). Wir berechnen Verläufe nicht im Code (mix()), sondern nutzen High-Res Texturen mit Dithering/Noise, die die Kompression überleben.

3\. CONFLICT RESOLUTION LOG

⚠️ CRITICAL: The Lamina Death

Fundort: guides/viron-button-guide.md

Status: ARCHIVED (June 2025).

Konflikt: Alte Snippets könnten noch lamina importieren.

Resolution: Striktes Verbot von lamina. Zwingender Einsatz von three-custom-shader-material (CSM).

Aktion: Der Codex muss ein explizites "Migration Pattern" enthalten (Lamina Code -> CSM Code).

4\. THE CODEX STRUCTURE PLAN (Badge 4)

Ich werde den Codex in 3 massiven Segmenten schreiben:

TEIL 1: THE VISUAL PHYSICS (System Architecture)

The 80% Grey Rule (Mathematisch definiert).

The Material System (PBR Values: Roughness, Metalness, Transmission).

The 4-Layer Button Stack (Architektur-Diagramm).

TEIL 2: THE COMPONENT FACTORY (Implementation)

The "No-CSS" Component Pattern (React Props Interface).

The V43 "Silver Armada" Variations (Stripes, Turbines, Noise).

The CSM Shader Recipes (Iridescent Glass Code).

TEIL 3: THE INTEGRATION BRIDGE (Cross-Badge)

Hardware-Sync: Optimierung für Badge 7 RAM-Limits.

Time-Sync: Mapping auf Badge 1 Spring-Presets.

Web-Sync: Export von Design-Tokens für Badge 5.



---
---
---



📋 SUBAGENT\_BRIEFING\_BADGE\_1\_UPGRADE.md

Status: ACTIVE

Target: Badge 1 (Core Engine \& Time Physics)

Current Version: V8.5 (Legacy)

Target Version: V11.0 (ULTIMATE CANON)

Analyst: Viron Omega Orchestrator

1\. EXECUTIVE STRATEGY: THE PHYSICS ENGINE

1.1 Das Problem mit V8.5

Die alte Version sagt: "Nutze keine CSS-Animationen."

Die V11 Version muss sagen: "CSS-Animationen sind in einem deterministischen Render-System technisch illegal, da sie vom OS-Scheduler abhängen und nicht vom Frame-Cursor. Sie führen zu Audio-Desync und Render-Artefakten."

Wir müssen von "Best Practice" zu "System Architecture" wechseln.

1.2 Die Kaskaden-Position (Neu bewertet)

Erbt von Badge 7: Die Berechnung eines Frames darf nicht länger dauern als das Timeout-Limit. Komplexe spring()-Ketten müssen effizient sein.

Diktiert für Badge 4: Design-Elemente müssen "Masse" haben. Badge 1 liefert die Formeln (mass, stiffness, damping), die Badge 4 nutzt.

2\. THE FORENSIC INVENTORY (Smoking Guns to Extract)

Ich werde folgende Kernelemente aus den Quellen (10-remotion-basics..., Manifesto, rules/timing.md) extrahieren und härten:

2.1 The Determinism Dogma (The "Pure Function" Law)

Quelle: 10-remotion-basics-01-timeline-und-frames.md

Gesetz: UI = f(frame). Das ist die einzige Wahrheit.

Verbot: Date.now(), Math.random() (ohne Seed), useEffect (für Timing), setInterval.

Beweis: Ein Frame muss auf Lambda Instanz A exakt so aussehen wie auf Instanz B. Zufall ist ein Bug.

2.2 The Industrial Physics (Spring Presets V11)

Quelle: THE\_VIRON\_AESTHETIC\_MANIFESTO.md / Badge 4 Codex

Wir definieren die "Viron-Physik". Wir nutzen keine Standard-Springs.

Heavy Machinery: Hohe Masse, hohe Dämpfung. Nichts "wobbelt".

Hydraulic: Langsames Anfahren, präzises Stoppen.

Code: Ich werde die exakten Config-Objekte für heavy, smooth und snappy definieren, die im ganzen System Pflicht sind.

2.3 The Frame Economy (Performance Budget)

Quelle: Badge 7 Codex (Cross-Reference)

Cost per Frame: Wie viele interpolate() Aufrufe sind "gratis"? Ab wann wird es teuer?

Pre-Calculation: Schwere Berechnungen (z.B. Pfad-Generierung für Maps) müssen außerhalb der Render-Loop passieren oder memoisiert werden.

2.4 The Sequencing Logic (Absolute vs. Relative)

Quelle: rules/sequencing.md (Skill) vs. 10-remotion-basics... (Viron)

Viron-Delta: Wir nutzen <Sequence> nicht nur zum Timen, sondern zum Isolieren von Render-Kontexten (z.B. für 3D-Szenen, die ihren eigenen ThreeCanvas brauchen).

Freeze-Frame: Wie man freeze() nutzt, um teure Re-Renders zu verhindern.

3\. CONFLICT RESOLUTION PLAN

⚠️ The "FPS Trap"

Fundort: 10-remotion-basics...

Konflikt: Alte Tutorials nutzen oft frame / 30.

V11 Lösung: Hardcoding von FPS ist verboten. Nutzung von useVideoConfig() ist Pflicht. Der Codex muss das korrekte Pattern als Gesetz festschreiben.

⚠️ The "Randomness" Paradox

Konflikt: Wir wollen "Noise" (V43 Design), aber wir brauchen Determinismus.

V11 Lösung: Einführung der random(seed) Pflicht. Jede Zufälligkeit muss seed-basiert sein (z.B. seed = frame + objectId).

4\. THE CODEX STRUCTURE (V11 Standard)

TEIL 1: THE LAWS OF TIME (Physics)

The Determinism Imperative (Warum useEffect tödlich ist).

The Frame-Loop (Wie Remotion wirklich tickt).

TEIL 2: THE MOTION SYSTEM (Implementation)

Viron Spring Physics (Die 4 heiligen Presets).

Interpolation Mathematics (Clamp, Extrapolate).

TEIL 3: THE ARCHITECTURAL PATTERNS (Best Practices)

Composition Architecture (Root -> Scene -> Atom).

The "Freeze" Pattern (Performance).



---
---
---




📋 SUBAGENT\_BRIEFING\_BADGE\_2\_INTERNAL.md

Status: DRAFT FOR APPROVAL

Target: Badge 2 (3D Physics \& Lighting)

Basis: Viron Omega Decree V1.0 + Badge 7 V11 + Badge 1 V11 + Badge 4 V1

Analyst: Viron Omega Orchestrator

1\. EXECUTIVE STRATEGY: THE PHYSICAL WORLD

1.1 Die Mission

Badge 2 ist der Maschinenraum. Hier wird aus Code Geometrie.

Wir definieren nicht, wie es aussieht (das war Badge 4), sondern wie es existiert.

Wie wird Licht berechnet? (Raytracing-Simulation via HDRI).

Wie werden Modelle geladen? (Draco-Kompression für RAM-Effizienz).

Wie bewegt sich die Kamera? (Deterministische Pfade).

1.2 Die Kaskaden-Position

Erbt von Badge 7: 3D ist teuer. Wir haben 4GB RAM pro Thread. Modelle müssen komprimiert sein (Draco).

Erbt von Badge 1: useFrame ist gefährlich. Wir nutzen useCurrentFrame für alles. <ThreeCanvas> ist Pflicht.

Erbt von Badge 4: Wir nutzen die PBR-Werte (Metalness 1.0) und die Farb-Palette (#202020).

Liefert an Badge 3: Wir bauen die Geometrie, auf die Badge 3 später die Shader (Glow, Glitch) legt.

2\. THE FORENSIC INVENTORY (Smoking Guns)

Ich werde folgende Kernelemente aus den Quellen extrahieren und härten:

2.1 The R3F Integration Law

Quelle: 3d.md (Skill) / Badge 1 Codex

Gesetz: Nutze <ThreeCanvas> aus @remotion/three.

Verbot: Standard <Canvas> von react-three-fiber (führt zu Context-Verlust).

Layout: <Sequence layout="none"> innerhalb von Canvas ist Pflicht.

2.2 The Lighting Engine (HDRI First)

Quelle: PATTERN\_LIGHTING\_GRADIENTS.md / PATTERN\_Viron\_Hard\_Won\_Knowledge.md

Gesetz: Keine "Taschenlampen" (DirectionalLights) als Hauptlicht.

Pflicht: HDRI Environment Mapping ist die primäre Lichtquelle.

Backstop: Der #404040 Zylinder (aus Badge 4) muss physisch implementiert werden.

360° Rule: Die Szene muss geschlossen sein. Keine schwarzen Löcher in Reflexionen.

2.3 The Model Pipeline (Draco \& Instancing)

Quelle: 40-gltf-models-00-loading-optimization.md

Problem: Ein 20MB GLB sprengt bei 16 Threads den RAM (320MB + Overhead).

Lösung: Draco Compression ist Pflicht für alle Assets > 1MB.

Instancing: Für Partikel/Wiederholungen nutzen wir <Instances>, nicht .map().

2.4 The Volumetric Stack (Caustics)

Quelle: 40-advanced-lighting-00-caustics-volumetric.md / viron-button-guide.md

Technik: Caustics werden nicht berechnet (zu teuer), sondern als Lightformer oder Shader-Textur gefaked oder via <Caustics> (Drei) effizient gerendert.

Limit: Volumetrics treiben den RAM-Bedarf auf 8GB (Badge 7). Wir müssen hier extrem vorsichtig sein (Low-Res Buffer).

3\. CONFLICT RESOLUTION PLAN

⚠️ The WebGPU Gap

Konflikt: Badge 7 fordert WebGPU. Viele R3F-Beispiele nutzen noch WebGL2.

Lösung: Wir definieren WebGL2 als stabilen Fallback, aber optimieren Shader für WebGPU-Kompatibilität (keine veralteten GLSL-Syntaxen).

⚠️ The "useFrame" Trap

Konflikt: R3F-Tutorials nutzen useFrame((state, delta) => ...) für Animationen.

Lösung: In Remotion ist delta nicht deterministisch. Wir müssen useCurrentFrame() in useFrame injizieren oder Animationen rein deklarativ über Props steuern.

4\. THE CODEX STRUCTURE (Badge 2)

TEIL 1: THE 3D FOUNDATION (Setup)

The <ThreeCanvas> Mandate.

The Scene Graph Hierarchy (Root -> Environment -> Stage -> Hero).

TEIL 2: THE LIGHTING SYSTEM (Illumination)

HDRI Strategy (Abstract Studio).

The Backstop Implementation.

Caustics \& Volumetrics (Performance-Optimized).

TEIL 3: THE ASSET PIPELINE (Geometry)

Draco Compression Workflow.

Instancing Patterns.

High-Poly Mandate (aus Badge 4) vs. Performance.

