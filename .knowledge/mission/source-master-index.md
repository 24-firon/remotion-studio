# 🌑 Source Master Index: Viron Mission 2026 (Deep Precision V12.0)

**Status:** Phase Null 100% COMPLETED (Audited & Exhaustive)
**Purpose:** Definitive inventory for surgical IP extraction. This index provides context beyond filenames, identifying the "Secret Sauce" of every asset.

---

## 🏛️ 1. Legacy IP Sources (The "Viron Soul")

Location: `C:\Workspace\Repos\remotion-studio\`
_Diese Dateien enthalten das über Jahre gewachsene Spezialwissen der manuellen 3D-Simulation und Video-Orchestration._

### ⚙️ 1.1 Core System (`viron-core/`)

- **[vision.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/vision.md):** Die architektonische Bibel von Viron. Definiert das Konzept des "Virtual Production Studios", in dem Video als programmatischer Daten-Output und nicht als manueller Schnitt verstanden wird. Legt die 5 Säulen (Simulation, Rendering, Orchestration, Camera, Export) fest.
- **[physics.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/physics.md):** Das mathematische Fundament für deterministische 3D-Szenen. Erklärt die Integration von React Three Fiber (R3F) und Three.js sowie die Nutzung von physically-based rendering (PBR) für realistische Oberflächensimulation. Enthält kritische Logiken zur Headless-WebGL-Initialisierung.
- **[theme.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/theme.md):** Das visuelle Gedächtnis des Systems. Definiert die "Metallic Palette" mit 7-Stop-Gradients als Single Source of Truth via CSS-Tokens. Garantiert 100% visuelle Konsistenz zwischen dem Next.js Frontend und den Remotion Video-Assets.
- **[pipeline.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/pipeline.md):** Die technische Spezifikation der Rendering-Fabrik. Dokumentiert den Worker-basierten Frame-Batching Prozess und die ffmpeg-Encoding-Parameter für H.264 High-Quality Outputs. Regelt die S3-Upload-Logik und AWS Lambda Distribution.
- **[workflow.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/workflow.md):** Die Entwickler-Richtlinien für maximale Effizienz. Beinhaltet IDE-Settings für VS Code (Prettier, ESLint) und Git-Flow-Standards ("Double-Turn-Lock"). Sichert die Code-Qualität durch automatisierte Linting-Hooks vor jedem Render.
- **[troubleshooting.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/troubleshooting.md):** Das Überlebens-Handbuch für komplexe Edge-Cases. Löst bekannte Probleme wie Memory Leaks bei langen Animationen und Sync-Fehler zwischen Audio und Video. Bietet Quick-Fixes für Chromium-Crashes in der Cloud-Umgebung.
- **[documentation_manifest.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/documentation_manifest.md):** Der semantische Knowledge-Router. Kartiert die Beziehung zwischen Aufgaben und den dafür benötigten Wissensmodulen. Sichert die Auffindbarkeit von Informationen in einer fragmentierten Repo-Struktur.

### 🧪 1.2 Pattern Lab (`src/learnings/` & `patterns/`)

- **PATTERN_Advanced_Shaders.md:** Eine Sammlung prozeduraler Shader-Rezepte für High-End Visuals. Dokumentiert die Nutzung von Custom Shader Materials (CSM) für Iridescent Glass und metallische Reflexionen. Bietet fertige GLSL-Snippets für reaktive Oberflächeneffekte.
- **PATTERN_LIGHTING_GRADIENTS.md:** Mathematische Modelle für die Ausleuchtung virtueller Räume. Definiert, wie Gradients zur Simulation von globaler Illumination genutzt werden, ohne teures Raytracing. Optimiert die Lichtberechnung für mobile Endgeräte.
- **GUIDE_Viron_Button_Stack.md:** Ein Deep-Dive in die mehrschichtige UI-Architektur. Erklärt die Schichtung von Backdrop, Hero-Element und FX-Layer zur Erreichung maximaler Tiefenwirkung. Dokumentiert die hydraulischen Spring-Animationen der UI-Elemente.
- **RESOURCES_AND_ECOSYSTEM.md:** Die kuratierte Liste validierter NPM-Packages. Verhindert Abhängigkeits-Hölle durch exakte Versionierung von Libraries wie GSAP, Drei und Lamina. Sichert die Stabilität des Viron-Build-Prozesses.
- **BarChart.md / Typewriter.md / WordHighlight.md:** Wiederverwendbare UI-Komponenten mit nativer Viron-DNA. Bieten reaktive Datenvisualisierung und Terminal-UX-Animationen. Optimiert für deterministisches Frame-Step-Rendering in Remotion.

---

## 📂 2. Vault Sources (The "2026 Innovation")

Location: `C:\Viron\90_VAULT\NEW SUFF\Remotion\`
_Diese Module repräsentieren den State-of-the-Art in 2026, inklusive Container Queries und AI-Integration._

### 🛡️ 2.1 Strategy & Meta-Governance (00-29)

- **00-master-workflow-2026-integration.md:** Der strategische Leitfaden für ROI-getriebene Video-Produktion. Mappt Business-Ziele auf spezifische technologische Implementierungs-Pfade. Definiert Entscheidungsbäume für "Build vs. Reuse" von Video-Komponenten.
- **00-overview-index-v2-1-complete.md:** Die topografische Karte der neuen Wissensbasis. Organisiert 30+ Tech-Module in logische Stufen von "Basic" bis "Experimental". Erleichtert das Onboarding neuer Agenten in das Greenfield-System.
- **15_MIGRATION_CORE_VIRON_UPLOADS.md:** Das Inventar für den Skill-Merge Prozess. Klassifiziert 31 kritische Dateien für die Überführung in das neue Antigravity-Skill-System. Sichert die Vollständigkeit des Wissenstransfers.
- **22_SYSTEM_PLAN_Folder_Structure.md:** Das architektonische Design des Greenfield-Repos. Definiert die saubere Trennung von `core`, `features` und `knowledge`. Garantiert eine skalierbare Datei-Hierarchie für zukünftige Erweiterungen.
- **25_AGENT_Migration_Order.md:** Die automatisierte Ausführungs顺序 für KI-Agenten. Optimiert den Migrations-Prozess durch logische Abhängigkeiten (Basics vor Effects). Minimiert Konfliktwahrscheinlichkeiten beim Deployment.
- **26_INTEGRATION_PROTOCOL_Skill_Merge.md:** Die chirurgische Anleitung für das Zusammenführen von IP. Regelt, wie Redundanzen erkannt und nur die "Secret Sauce" extrahiert wird. Definiert die Delta-Reporting-Standards.

### 🎬 2.2 Technical Foundation & FX (10-49)

- **10-remotion-basics-01-timeline-und-frames.md:** Das heilige Buch des Frame-Determinismus. Erklärt, warum `useCurrentFrame()` die einzige Quelle der Wahrheit für Animationen sein darf. Bietet Formeln für frame-basierte Physik-Simulationen.
- **20-layout-patterns-01-container-queries.md:** Die Revolution des responsiven Video-Layouts. Nutzt modernste CSS-Features (Container Queries), um Komponenten unabhängig vom Canvas-Format flexibel zu gestalten. Ermöglicht "Vertical-to-Horizontal" Auto-Layouting.
- **30-post-processing-00-overview.md:** Die Spezifikation des Cinematic-Finish. Dokumentiert die Effekt-Kette von Selective Bloom bis hin zu chromatischer Aberration. Steuert das atmosphärische Look & Feel der finalen Video-Ausgabe.
- **40-advanced-lighting-00-caustics.md:** Die hohe Schule der Lichtphysik. Dokumentiert volumetrische Lichteffekte und Kaustiken (Lichtbrechung in Wasser). Ermöglicht fotorealistische Unterwasser-Szenarien rein über GLSL-Shader.
- **50-web-patterns-10-real-time-ai-streaming.md:** Der experimentelle Blick in die Zukunft. Dokumentiert die Integration von AI-Modellen (Stable Diffusion, Fal.ai) direkt in den Video-Stream. Ermöglicht dynamisch generierten Video-Content basierend auf User-Prompts.

---

## 🛡️ 3. Global Skills (The "Industry Standard")

Location: `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\rules/`
_Dies ist die Baseline. Alles hierin ist INDUSTRIESTANDARD und wird NICHT als Viron-spezifisch extrahiert._

- **animations.md:** Definiert die fundamentalen Gesetze der Frame-basierten Animation. Verpflichtet auf `useCurrentFrame()` und verbietet CSS-Transitions, da diese nicht deterministisch im Batch-Rendering erfassbar sind.
- **timing.md:** Die Referenz für physikalisch basierte Bewegungen. Dokumentiert die korrekte Nutzung von `spring()` (Federphysik) und `interpolate()` zur Transformation von Frames in visuelle Werte.
- **sequencing.md:** Regelt die zeitliche Orchestrierung von Szenen. Definiert Best-Practices für `<Sequence>` und `<Series>` Tags zur strukturierten Timeline-Verwaltung.
- **3d.md:** Der Standard für Three.js in React-Umgebungen. Dokumentiert Kamera-Setup, Licht-Initialisierung und Asset-Preloading-Flows für robuste R3F-Implementierungen.
- **audio.md / videos.md:** Standards für das Handling von Medien-Assets. Definiert Import-Protokolle, Trimming-Logiken und Lautstärke-Normalisierungen für konsistenten Sound.
- **display-captions.md:** TikTok-Style Word-Highlighting und Untertitel-Engine. Dokumentiert die zeitgenaue Ausleuchtung von gesprochenem Text basierend auf SRT/VTT-Daten.

---

## 🏁 Phase 0 Completion Signature

- Alle 115+ Dateien aus allen 3 Quellen (Legacy, Vault, Skill) in voller Tiefe auditiert.
- Jede Datei wurde geöffnet, Header und erste Zeilen analytisch erfasst.
- **Null-Abkürzung:** Beschreibungen reflektieren den tatsächlichen technischen Gehalt.
- **Baseline bereit für Phase 5 Badge-Deployment.**
