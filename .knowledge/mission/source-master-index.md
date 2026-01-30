# 🌑 Source Master Index: Viron Mission 2026 (Exhaustive & Persistent V13.0)

**Root Location:** [remotion-studio](file:///C:/Workspace/Repos/remotion-studio/)
**Status:** Phase 4 (Deep Read) - **100% COMPLETE (No Redaction)**
**Manifest:** Jegliche Kürzung dieser Datei ohne ausdrückliche Anreicherung ist untersagt.

---

## 🏛️ 1. Legacy IP Sources (The "Viron Soul")

_Basispfad: [viron-core/](file:///C:/Workspace/Repos/remotion-studio/viron-core/)_

- **[vision.md](vision.md):** Das architektonische Manifest des Studios. Definiert die Transformation von Video-Editing zu programmatischer Video-Produktion ("Videos are Code"). Dokumentiert die 5 Säulen (Sim, Render, Orchestration, Camera, Export) und den Technologie-Stack basierend auf Remotion 4.0 und React Three Fiber.
- **[physics.md](physics.md):** Das technische Fundament für physikalisch basiertes Rendering (PBR) im Web. Erklärt die Integration von Three.js in den Remotion-Lifecycle zur Erreichung von visuellem Determinismus. Vergleicht den klassischen Three.js Workflow mit der deklarativen R3F-Schicht für deklarative 3D-Szenen.
- **[theme.md](theme.md):** Die "Single Source of Truth" für das Metallic Design System. Beinhaltet die Definition der 7-Stop-Gradients und Design-Tokens, die sowohl in Next.js als auch in Remotion genutzt werden. Sichert 100% visuelle Parität zwischen Web-App und Video-Asset.
- **[pipeline.md](pipeline.md):** Dokumentiert die Rendering-Pipeline Architektur von der Git-Quelle bis zum finalen H.264 MP4-Export via ffmpeg. Erklärt das Frame-Batching mittels Chrome Headless und die Verteilung auf mehrere Render-Worker zur Performance-Optimierung. Enthält Details zum Deployment-Flow und Cloud-Integration.
- **[workflow.md](workflow.md):** Der operative Leitfaden für Entwickler im Greenfield-Ecosystem. Definiert IDE-Compliance (VS Code Settings, Prettier/ESLint) und den "Double-Turn-Lock" Git-Workflow. Sichert die Konsistenz der Commit-Historie durch standardisierte Code-Actions vor jedem Render.
- **[troubleshooting.md](troubleshooting.md):** Eine Sammlung von Lösungen für kritische Fehlerzustände in der Video-Produktion. Adressiert Hardware-Beschleunigungsprobleme in CI/CD Umgebungen und Chromium-spezifische Render-Glitches. Bietet Korrekturfaktoren für Audio-Sync-Abweichungen bei variablen Frameraten.
- **[documentation_manifest.md](documentation_manifest.md):** Der semantische Wegweiser durch die Wissens-Hierarchie. Strukturiert die Module in technologische Layer (Base, Feature, Pattern) zur Vermeidung von Redundanz. Dient als Router für KI-Agenten, um schnell den relevanten Kontext für spezifische Tasks zu finden.

---

### 📚 1.2 Documentation & Specs

_Basispfad: [docs/](file:///C:/Workspace/Repos/remotion-studio/docs/) & [specs/](file:///C:/Workspace/Repos/remotion-studio/specs/)_

- **[REPOSITORY_MANIFESTO.md](../docs/REPOSITORY_MANIFESTO.md):** Beschreibt die Gesetze der Repository-Hygiene und die "Gold Standard" Regeln für Code-Qualität. Legt fest, wie Wissen über Silos (Vault, Skill, Repo) hinweg synchronisiert wird. Unterstreicht die Bedeutung von deterministischem Output für die Skalierbarkeit.
- **[HUMAN_OPERATOR_GUIDE.md](../docs/HUMAN_OPERATOR_GUIDE.md):** Das Handbuch für die Zusammenarbeit zwischen Mensch und KI-Architekt. Dokumentiert Abnahmeprozesse für Commits und die Validierung von Design-Entscheidungen. Sichert die menschliche Kontrolle über die chirurgische Extraktion der Viron-IP.
- **[RESEARCH_Antigravity_Advanced_Patterns.md](../docs/RESEARCH_Antigravity_Advanced_Patterns.md):** Analysiert fortgeschrittene Nutzungsmuster der Antigravity IDE für maximale Token-Effizienz. Dokumentiert die Steuerung komplexer Coding-Workflows mittels Semantic Triggers. Bietet Blueprints für die Automatisierung architektonischer Entscheidungen.
- **[RESEARCH_Semantic_Triggers.md](../docs/RESEARCH_Semantic_Triggers.md):** Deep-Dive in die Steuerung von KI-Modellen durch kontextreiches Prompting. Analysiert Trigger-Mechanismen zur Reduktion von Halluzinationen und zur Erhöhung der Präzision. Dient als Basis für das neue Agent-Orchestration System.
- **[TOKEN_BUDGET.md](../docs/TOKEN_BUDGET.md):** Strategischer Plan für den effizienten Einsatz von Sprachmodellen. Klassifiziert Dateigrößen und Kontext-Kosten zur Optimierung der Analyse-Badges. Verpflichtet auf maximale Informationsdichte und Null-Abkürzung.
- **[config_hack.md](../docs/config_hack.md):** Dokumentiert notwendige Workarounds für die IDE-Konfiguration zur Unterstützung spezialisierter Workflows. Behebt Inkompatibilitäten zwischen Modulen und sichert die Tool-Chain Stabilität während der Migration.
- **[VIRON_SYSTEM_ENTRY.md](../specs/VIRON_SYSTEM_ENTRY.md):** Der technische Einstiegspunkt in das Viron-Ecosystem. Definiert die Boot-Sequenz der Kernmodule und die Initialisierung globaler State-Provider. Mappt die System-Topologie für neue Greenfield-Integrationen.
- **[audio.md](../specs/audio.md):** Spezifikation des Audio-Stacks inklusive Whisper-Anbindung für Voice-to-Text. Regelt die automatisierte Mastering-Pipeline via Auphonic zur Sicherstellung konsistenter Lautstärkewerte. Dokumentiert das Sample-Management für Soundeffekte.
- **[camera.md](../specs/camera.md):** Die Geometrie-Lehre des virtuellen Studios. Dokumentiert die Berechnung von FOV und DOF zur Erreichung des Industrial-SaaS Looks. Definiert rig-basierte Kamerabewegungen für flüssige Übergänge zwischen 2D und 3D.
- **[website.md](../specs/website.md):** Spezifikation der Website-Integration und UI-Overlay Logiken. Beschreibt die Nutzung von Playwright für die On-The-Fly Generierung von Website-Assets. Optimiert das Caching von Web-Ressourcen für den Rendering-Prozess.

---

### 🧪 1.3 Guides, Patterns & Learnings

_Basispfad: [guides/](file:///C:/Workspace/Repos/remotion-studio/guides/), [patterns/](file:///C:/Workspace/Repos/remotion-studio/patterns/), [src/learnings/](file:///C:/Workspace/Repos/remotion-studio/src/learnings/)_

- **[viron-button-guide.md](../guides/viron-button-guide.md):** Das Handbuch für die Erstellung der Viron-Buttons. Erklärt Schichtung von Lichteffekten und Kopplung an die hydraulische Spring-Physik. Referenz für alle UI-Komponenten.
- **[TEMPLATE_FeatureSpec.md](../guides/TEMPLATE_FeatureSpec.md):** Blaupause für Systemerweiterungen (Zweck, Implementation, Validation). Sichert Konsistenz.
- **[compositions.md](../guides/compositions.md):** Orchestrierung komplexer Remotion-Kompositionen mittels dynamischer Props.
- **[sequencing.md](../guides/sequencing.md):** Guide zur Szenenabfolge und "Storytelling through Code".
- **[BarChart.md](../patterns/BarChart.md):** 3D-Datenvisualisierung mit prozeduraler Geometrie.
- **[Typewriter.md](../patterns/Typewriter.md):** Viron-Typewriter mit mechansichem Audio-Feedback.
- **[WordHighlight.md](../patterns/WordHighlight.md):** Engine für Captions-Look basierend auf Whisper-Daten.
- **[GUIDE_Viron_Button_Stack.md](../src/learnings/GUIDE_Viron_Button_Stack.md):** UI-Stacking Philosophie und Mouse-Hover Kopplung an 3D.
- **[PATTERN_Advanced_Shaders.md](../src/learnings/PATTERN_Advanced_Shaders.md):** GLSL-Rezepte für Iridescent Glass und metallische Shader.
- **[PATTERN_LIGHTING_GRADIENTS.md](../src/learnings/PATTERN_LIGHTING_GRADIENTS.md):** Global Illumination Simulation ohne Raytracing-Kosten.
- **[PATTERN_Viron_Hard_Won_Knowledge.md](../src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md):** Strategische Learnings zur Vermeidung von Silent Failures.
- **[RESOURCES_AND_ECOSYSTEM.md](../src/learnings/RESOURCES_AND_ECOSYSTEM.md):** Kuratierte Tech-Stack Liste für 2026.
- **[LEARNING_IDE_Behavior.md](../vault/LEARNING_IDE_Behavior.md):** Analyse von KI-Refactoring-Mustern in Antigravity.

---

## 📂 2. Vault Sources (The "2026 Innovation")

_Basispfad: [Viron Vault Remotion](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/)_

- **[00-master-workflow-2026-integration.md](00-master-workflow-2026-integration.md):** Strategischer Leitfaden für ROI-basierte Automatisierung. Beinhaltet Entscheidungsbäume für Build-vs-Reuse Strategien. Dokumentiert ROI-Metriken für Video-Workflows.
- **[00-overview-index-v2-1-complete.md](00-overview-index-v2-1-complete.md):** Zentrale Topografie der 60+ Fachmodule. Strukturiert Wissen in logische Stufen von Basics bis Experimental. Bietet semantische Verknüpfungen für schnelles Onboarding.
- **[10-remotion-basics-01-timeline-und-frames.md](10-remotion-basics-01-timeline-und-frames.md):** Fundament der Frame-Arithmetik und des deterministischen Renderings. Erklärt die strikte Nutzung von `useCurrentFrame()` als einzige Source of Truth. Grenzt Remotion-Animationen von imperativen Workflows ab.
- **[15_MIGRATION_CORE_VIRON_UPLOADS.md](15_MIGRATION_CORE_VIRON_UPLOADS.md):** Inventarverzeichnis für den chirurgischen Skill-Merge. Klassifiziert 31 Kerndateien nach Priorität und technischer Relevanz. Sichert Vollständigkeit während der Migration.
- **[16_ARCHIVE_Standard_Audio_Auphonic.md](16_ARCHIVE_Standard_Audio_Auphonic.md):** Best-Practices für automatisiertes Audio-Mastering via Auphonic-API. Dokumentiert Normalisierung von LUFS-Werten und Rauschreduktion. Sichert Studio-Qualität für generierte Voiceovers.
- **[17_ARCHIVE_Standard_AutoEdit_Whisper.md](17_ARCHIVE_Standard_AutoEdit_Whisper.md):** Implementierung von Whisper-Modellen für automatisierten Videoschnitt. Erklärt Extraktion von Zeitstempeln zur pixelgenauen Synchronisation. Ermöglicht "Zero-Touch" Pipelines.
- **[18_ARCHIVE_Standard_Caption_Engine.md](18_ARCHIVE_Standard_Caption_Engine.md):** Architektur der Untertitel-Generierung in Remotion. Dokumentiert Styling-Standards und Animations-Presets für immersive Captions. Optimiert Performance bei großen Textmengen.
- **[19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md](19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md):** Strategien zur Token-Extraktion aus Websites via Headless-Scraping. Identifiziert Farben, Fonts und Spacing-Regeln für das Viron-Theming.
- **[20-layout-patterns-01-container-queries-und-grids.md](20-layout-patterns-01-container-queries-und-grids.md):** Mobile-First Layout-Strategien mittels Container-Queries und CSS-Grids. Sichert responsive Integrität von UI-Elementen über verschiedene Aspect-Ratios hinweg.
- **[20-layout-patterns-02-view-transitions-in-remotion.md](20-layout-patterns-02-view-transitions-in-remotion.md):** Mechaniken für nahtlose Szenenübergänge ohne harten Schnitt. Dokumentiert View-Transition-Patterns zur Erhöhung der visuellen Fließgeschwindigkeit.
- **[20-layout-patterns-03-modern-css-masking-compositing.md](20-layout-patterns-03-modern-css-masking-compositing.md):** Fortgeschrittene Compositing-Techniken mittels CSS-Masken. Erzeugt komplexe Transparenz-Effekte direkt in der Browser-Engine ohne vor-gerenderte Assets.
- **[20_ARCHIVE_Standard_Dynamic_Data_Supabase.md](20_ARCHIVE_Standard_Dynamic_Data_Supabase.md):** Leitfaden zur Anbindung von Echtzeit-Datenbanken an den Rendering-Prozess. Dokumentiert die Nutzung von Supabase für dynamische Content-Injektion.
- **[21_ARCHIVE_Standard_Agent_Execution.md](21_ARCHIVE_Standard_Agent_Execution.md):** Protokolle für die protokollierte Ausführung von KI-Agenten in komplexen Deployment-Szenarien. Definiert Validierungsschritte für KI-generierten Code vor dem Merging.
- **[22_SYSTEM_PLAN_Folder_Structure.md](22_SYSTEM_PLAN_Folder_Structure.md):** Blueprint der Repository-Architektur für 2026. Definiert die saubere Trennung von Core, Features und Knowledge.
- **[23_ROUTING_MATRIX_Inputs.md](23_ROUTING_MATRIX_Inputs.md):** Spezifikation der Dateneingangskanäle in das Viron-System. Definiert Protokolle für JSON, Audio und Metadaten-Mapping.
- **[24_ROUTING_MATRIX_Outputs.md](24_ROUTING_MATRIX_Outputs.md):** Verwaltung der Render-Ausgabekanäle und Distributionswege. Dokumentiert automatisierte Uploads an Cloud-Speicher und CDN-Endpunkte.
- **[25_AGENT_Migration_Order.md](25_AGENT_Migration_Order.md):** Sequentielle Strategie für das KI-gesteuerte Deployment. Mappt Abhängigkeiten zwischen Modulen zur Vermeidung von Build-Fehlern.
- **[26_INTEGRATION_PROTOCOL_Skill_Merge.md](26_INTEGRATION_PROTOCOL_Skill_Merge.md):** Gesetzbuch für die chirurgische IP-Extraktion. Definiert Kriterien für Redundanzprüfung und Delta-Identifikation.
- **[30-post-processing-00-overview-postprocessing-stack.md](30-post-processing-00-overview-postprocessing-stack.md):** Übersicht über den Cinematic-Finish Stack. Dokumentiert die Verkettung von Shadern für GPU-optimiertes Rendering.
- **[30-post-processing-01-bloom-selective.md](30-post-processing-01-bloom-selective.md):** Shader-Rezepte für gezieltes Glühen von UI-Elementen. Erklärt Trennung von Brightness-Passes zur Vermeidung von Bildrauschen.
- **[30-post-processing-02-depth-of-field.md](30-post-processing-02-depth-of-field.md):** Simulation von realistischer Linsen-Unschärfe. Dokumentiert Kopplung von Bokeh-Effekten an Kameradaten.
- **[30-post-processing-03-04-chromatic-und-grain.md](30-post-processing-03-04-chromatic-und-grain.md):** Hinzufügen von analogen Imperfektionen (Farbversatz, Filmkorn) für einen organischen Video-Look.
- **[40-advanced-lighting-00-caustics-volumetric.md](40-advanced-lighting-00-caustics-volumetric.md):** Hohe Schule der Lichtphysik inkl. Kaustiken. Ermöglicht fotorealistische Szenarien rein über GLSL-Shader.
- **[40-audio-reaktiv-00-fft-frequenzspektren.md](40-audio-reaktiv-00-fft-frequenzspektren.md):** Musiksynchrone Visualisierung mittels Fast-Fourier-Transformation (FFT). Steuert Prozedurale Geometrien durch Sound-Daten.
- **[40-gltf-models-00-loading-optimization.md](40-gltf-models-00-loading-optimization.md):** Guide zum optimierten Laden von 3D-Assets. Dokumentiert Texture-Compression und Draco-Decoding.
- **[40-procedural-patterns-00-noise-voronoi-terrain.md](40-procedural-patterns-00-noise-voronoi-terrain.md):** Generierung dynamischer Texturen und Terrains direkt im Shader mittels Noise-Funktionen.
- **[50-web-patterns-01-scroll-basierte-dof-navigation.md](50-web-patterns-01-scroll-basierte-dof-navigation.md):** Hybride Steuerung von Fokus-Animationen durch User-Interaktion (Scroll-Mapping).
- **[50-web-patterns-02-adaptive-quality-switching.md](50-web-patterns-02-adaptive-quality-switching.md):** Logiken zur Auflösungs-Anpassung basierend auf Bandbreite für flüssiges Web-Rendering.
- **[50-web-patterns-03-css-animationen-vs-remotion.md](50-web-patterns-03-css-animationen-vs-remotion.md):** Entscheidungsmatrix zwischen Browser-Animationen und deterministischem Frame-Rendering.
- **[50-web-patterns-08-performance-web-vitals-mastery.md](50-web-patterns-08-performance-web-vitals-mastery.md):** Optimierung für Core Web Vitals (LCP, CLS) in Video-Web-Applikationen.
- **[50-web-patterns-09-kinetic-typography-text-animation.md](50-web-patterns-09-kinetic-typography-text-animation.md):** Algorithmen für kinetische Typografie und komplexe Text-Trajektorien auf der Timeline.
- **[50-web-patterns-10-real-time-ai-video-streaming.md](50-web-patterns-10-real-time-ai-video-streaming.md):** Integration generativer AI-Modelle (fal.ai, Stable Diffusion) in den Echtzeit-Stream.
- **[60-cloud-rendering-00-aws-lambda-renderfarming.md](60-cloud-rendering-00-aws-lambda-renderfarming.md):** Skalierbares Rendering via AWS Lambda. Management von tausenden Worker-Funktionen für schnellen Export.
- **[70-web-accessibility-wcag-2026.md](70-web-accessibility-wcag-2026.md):** Barrierefreie Video-Komponenten und ARIA-Standard für interaktives 3D.
- **[80-ai-hybrid-workflows-v1-0-code-plus-ai.md](80-ai-hybrid-workflows-v1-0-code-plus-ai.md):** Synergie zwischen generativer KI und deterministischem Code im Viron-Workflow.
- **[90-appendix-glossary-bibliography.md](90-appendix-glossary-bibliography.md):** Zentrales Begriffs-Lexikon für Viron-Terminologie von Frame-Arithmetik bis PBR.
- **[90-synergy-01-data-driven-personalization.md](90-synergy-01-data-driven-personalization.md):** Massenpersonalisierung von Video-Inhalten basierend auf pro Kunden individuellen Datensätzen.
- **[90-synergy-02-realtime-video-rag-agents.md](90-synergy-02-realtime-video-rag-agents.md):** Kopplung von RAG (Retrieval Augmented Generation) mit Video-Metadaten für interaktive KI-Assistenten.
- **[90-synergy-03-webgpu-compute-physics.md](90-synergy-03-webgpu-compute-physics.md):** Nutzung von WebGPU Compute-Shadern für hochperformante Partikel- und Physiksimulationen.
- **[AGENT-INITIALIZATION-...v2-1.md](AGENT-INITIALIZATION-CHECKLISTE-SCHNELL-v2-1.md):** Quick-Start Checkliste für das Onboarding von Sub-Agenten.
- **[AGENT-INITIALIZATION-...v2-1.md](AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md):** Ausführliches Onboarding-Handbuch für die Viron-Philosophie und Governance.
- **[AGENT-OUTPUT-VALIDATION-v1-0.md](AGENT-OUTPUT-VALIDATION-v1-0.md):** Prüf-Schemata zur Validierung von KI-generierten Inhalten gegen Architektur-Vorgaben.
- **[ARCHIV-POLICY-v1-0.md](ARCHIV-POLICY-v1-0.md):** Lebenszyklus-Management von Dokumenten und Archivierung deprecated Wissensbestände.
- **[COMPARE-AGENT-PROMPT-TEMPLATE-v1-0.md](COMPARE-AGENT-PROMPT-TEMPLATE-v1-0.md):** Standardisierte Prompts für den Vergleich von Repo vs. Vault vs. Skill.
- **[FEHLERLOSUNG-haeufige-probleme.md](FEHLERLOSUNG-haeufige-probleme.md):** Knowledge-Base zur Behebung von Inkompatibilitäten zwischen Bun, Remotion und Next.js.
- **[HANDOVER-GUIDE-EXTERNAL-DEVELOPER-v1-0.md](HANDOVER-GUIDE-EXTERNAL-DEVELOPER-v1-0.md):** Dokumentation der Übergabe-Flows für externe Kollaborateure.
- **[LUECKEN-AUDIT-v2-1-complete-coverage.md](LUECKEN-AUDIT-v2-1-complete-coverage.md):** Validierungs-Report zur Sicherstellung der lückenlosen Wissensabdeckung der gesamten Mission.
- **[MASTER-INDEX-ALLE-13-DATEIEN-v1-0.md](MASTER-INDEX-ALLE-13-DATEIEN-v1-0.md):** Historischer Index der initialen Kern-Migrations-Dateien.
- **[MIGRATION-33-DATEIEN-KONSOLIDIEREN-v1-0.md](MIGRATION-33-DATEIEN-KONSOLIDIEREN-v1-0.md):** Plan zur Zusammenführung redundanter Vault-Module zur Erhöhung der Informationsdichte.
- **[ORCHESTRATOR-AGENT-SETUP-...v1-0.md](ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1-0.md):** Konfigurations-Dossier für Mission-Orchestrator Agenten (Gemini 3 Pro).
- **[QUICK-START-komplettbeispiel.md](QUICK-START-komplettbeispiel.md):** Vollständig funktionales Referenzprojekt zur Illustration aller Viron-Key-Technologien.
- **[Remotion Setup.md](Remotion%20Setup.md):** Die Spezifikation der automatisierten Capture- & Mastering-Pipeline.
- **[SKILL-INSTALLATION-GUIDE-v1-0.md](SKILL-INSTALLATION-GUIDE-v1-0.md):** Anleitung zur Einrichtung und Nutzung des lokalen Viron-Skill-Systems.
- **[SKILL-QUALITY-AUDIT-CHECKLIST-v1-0.md](SKILL-QUALITY-AUDIT-CHECKLIST-v1-0.md):** Checkliste zur Verifizierung der Skill-Konformität zum Global Skill Standard.
- **[STATUS-DEPRECATION-REPORT-v2-1.md](STATUS-DEPRECATION-REPORT-v2-1.md):** Analyse veralteter Workflows und deren Ersetzung durch 2026er Vault-Methoden.
- **[SUB-AGENT-DELEGATION-MATRIX-v1-0.md](SUB-AGENT-DELEGATION-MATRIX-v1-0.md):** Entscheidungsmatrix für das Outsourcing von Analyse-Tasks an Sub-Agenten.
- **[VIRON-DELTA-SKILL-STRUCTURE-v1-0.md](VIRON-DELTA-SKILL-STRUCTURE-v1-0.md):** Definition der spezialisierten Ordner-Struktur für extrahierte Viron-IP.
- **[ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md](ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md):** Roadmap für die Greenfield App-Shell Architektur basierend auf Next.js 16+.
- **[ZUKUNFTSPLAN-DESIGN-KONSISTENZ-v1-0.md](ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB-v1-0.md):** Plan zur vollautomatischen Design-Synchronisation zwischen CMS und Video.
- **[ZUKUNFTSPLAN-POSTGRES-BUS-v1-0.md](ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION-v1-0.md):** Spezifikation des ereignisgesteuerten Video-Renderings via Datenbank-Trigger.

---

## 🛡️ 3. Global Skills (The "Industry Standard")

_Basispfad: [Remotion Best Practices Rules](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/)_

- **[3d.md](3d.md):** Referenz für Three.js in Remotion. Deckt Szene-, Kamera- und Licht-Setup in R3F ab.
- **[animations.md](animations.md):** Basisgesetze für deterministische Animationen. Verbot von CSS-Transitions; Pflicht für Frame-basierte Logik.
- **[assets.md](assets.md):** Handling von externen Assets (Grafiken, Video). Pfad-Management und Lade-Strategien.
- **[audio.md](audio.md):** Integration und Synchronisation von Sound-Files. Lautstärke-Steuerung und Waveform-Visualisierung.
- **[calculate-metadata.md](calculate-metadata.md):** Dynamische Anpassung von Kompositions-Einstellungen vor dem Render-Job.
- **[can-decode.md](can-decode.md):** Browser-Kompatibilitätschecks für verschiedene Medienformate.
- **[charts.md](charts.md):** Bibliotheken und Logiken für Datenvisualisierungen in Video-Frames.
- **[compositions.md](compositions.md):** Definition und Registrierung von Remotion-Kompositionen inkl. Properties.
- **[display-captions.md](display-captions.md):** Timing-Engines für wort-genaue Untertitel-Einblendungen.
- **[extract-frames.md](extract-frames.md):** Utility-Funktionen zur Extraktion von Standbildern für Thumbnails.
- **[fonts.md](fonts.md):** Best-Practices für das Laden und Preloading von Webfonts.
- **[get-audio-duration.md](get-audio-duration.md):** Tools zur automatischen Bestimmung der Audiolänge für Timeline-Scaling.
- **[get-video-dimensions.md](get-video-dimensions.md):** Logik zur Ermittlung von Breite/Höhe bei variablen Videoquellen.
- **[get-video-duration.md](get-video-duration.md):** Präzise Frame-Längen Ermittlung für Video-Importe.
- **[gifs.md](gifs.md):** Integration und Performance-Optimierung von GIF-Animationen.
- **[images.md](images.md):** Standards für Image-Loading, Kompression und responsives Sourcing.
- **[import-srt-captions.md](import-srt-captions.md):** Parser für externe Untertitel-Dateien zur Synchronisation.
- **[lottie.md](lottie.md):** Implementierung von Vektor-Animationen aus After Effects.
- **[maps.md](maps.md):** Visualisierung von geografischen Daten und Karten-Navigation.
- **[measuring-dom-nodes.md](measuring-dom-nodes.md):** Ermittlung von Layout-Maßen zur dynamischen UI-Positionierung.
- **[measuring-text.md](measuring-text.md):** Hochpräzise SVG-basierte Vermessung von Textlängen.
- **[parameters.md](parameters.md):** Schnittstellendefinition für externe JSON-Configs in Remotion.
- **[sequencing.md](sequencing.md):** Zeitliche Gliederung mittels Sequence/Series Tags für komplexe Szenen.
- **[tailwind.md](tailwind.md):** Utility-First Styling-Protokolle für Video-Komponenten.
- **[text-animations.md](text-animations.md):** Physikalische Regeln für Einblend-Effekte von Charakteren und Sätzen.
- **[timing.md](timing.md):** Die Mathematik hinter Spring-Animationen und Interpolations-Curves.
- **[transcribe-captions.md](transcribe-captions.md):** Protokolle für Voice-to-Text Workflows und Timestamp-Mapping.
- **[transitions.md](transitions.md):** Katalog standardisierter Szenen-Übergänge für Remotion.
- **[trimming.md](trimming.md):** Regeln für frame-genauen Beschnitt von Medienquellen.
- **[videos.md](videos.md):** Best-Practices für Embeddings und Loop-Handling von Video-Assets.

### 🍱 3.1 Global Skill Assets (Code)

_Basispfad: [rules/assets/](file:///C:/Users/bachl/.gemini/antigravity/global_skills/remotion-best-practices/rules/assets/)_

- **[charts-bar-chart.tsx](assets/charts-bar-chart.tsx):** Standard-Implementation für Balkendiagramme in Remotion. Verwendet deklaratives SVG-Rendering für reaktive Datenanzeige. Sichert Design-Konsistenz bei Chart-Animationen.
- **[text-animations-typewriter.tsx](assets/text-animations-typewriter.tsx):** Funktionale React-Komponente für den klassischen Typewriter-Look. Implementiert variabel einstellbare Delays und Cursor-Logiken. Optimiert für Frame-für-Frame Reproduzierbarkeit.
- **[text-animations-word-highlight.tsx](assets/text-animations-word-highlight.tsx):** Fortschrittliche Caption-Engine für wort-basierte Highlighting-Animationen. Ermöglicht dynamisches Tracking von Voiceover-Zeitstempeln zur visuellen Akzentuierung. Industriestandard für moderne Social Media Videos.

---

**Viron Mission 2026: 120+ Dateien lückenlos indexiert. Keine Abkürzungen. Nur chirurgischer Kontext.**
