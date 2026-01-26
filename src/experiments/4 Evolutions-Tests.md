\*\*4 Evolutions-Tests\*\*, jeweils mit einem \*\*Dossier für den Orchestrator\*\* und einem \*\*Marschbefehl für den Executor\*\*.



---



\### 🧪 Test #1: Metallic UI (PBR \& Hydraulik-Physik)

\*\*Ziel:\*\* Eliminierung des 2D-Border-Artefakts durch echte 3D-Geometrie und physikalische Kopplung.



\#### \*\*A. Prompt für den Orchestrator (Strategie \& Abnahme)\*\*

> „Agiere als Lead Architect. Dein Ziel ist die Planung von \*\*Test #1: PBR Metallic UI\*\*.

> 1. \*\*Planungs-Auftrag:\*\* Entwirf ein Storyboard, in dem ein 3D-Silber-Button (Three.js) bei Frame 20 einschlägt und ab Frame 90 ein 2D-Terminal hydraulisch ausfährt. 

> 2. \*\*Spezifikation:\*\* Erzwinge die Nutzung der Metallic-Tokens (Stop 1-7) aus Research 07. Das Material muss `MeshStandardMaterial` sein.

> 3. \*\*Bewertungskriterien:\*\* Nach der Umsetzung musst du prüfen:

>    - Ist der 'Strich-Fehler' (CSS-Artefakt) physikalisch eliminiert?

>    - Ist die Hydraulik-Animation des Terminals mathematisch exakt an die Feder-Energie des Buttons gekoppelt?

>    - Bleibt die Framerate bei 60FPS stabil ohne Jitter?“



\#### \*\*B. Prompt für den Executor (Technische Vollstreckung)\*\*

> „Agiere als Senior Developer. Implementiere Test #1 in `src/my-lab/`.

> 1. \*\*SilverButton.tsx:\*\* Erstelle ein Three.js Mesh mit `RoundedBoxGeometry`. Nutze `MeshStandardMaterial` mit `metalness: 0.9` und `roughness: 0.1`. Infiltriere die Hex-Werte aus `src/theme/Theme.ts`.

> 2. \*\*Terminal.tsx:\*\* Baue ein Tailwind v4 Fenster. Die Position (`translateY`) muss als Prop übergeben werden.

> 3. \*\*MainScene.tsx:\*\* Erstelle den Hybrid-Stack. Nutze `spring()` für den Button-Impact und `interpolate()`, um diese Bewegung auf das Terminal zu übertragen.

> 4. \*\*Regel:\*\* 0% CSS-Transitions. Nutze nur `useCurrentFrame()`.“



---



\### 🧪 Test #2: SVG Data Waves (Dynamische Vektoren)

\*\*Ziel:\*\* Validierung der frame-genauen Steuerung komplexer SVG-Pfade und Filter.



\#### \*\*A. Prompt für den Orchestrator (Strategie \& Abnahme)\*\*

> „Agiere als Lead Architect. Dein Ziel ist \*\*Test #2: SVG Data Waves\*\*.

> 1. \*\*Konzept:\*\* Wir testen die Visualisierung von Datenströmen. Ein Graph muss sich organisch von links nach rechts aufbauen.

> 2. \*\*Spezifikation:\*\* Der Graph muss einen Neon-Glow-Effekt haben. Die Linienführung muss absolut deterministisch sein.

> 3. \*\*Abnahme-Protokoll:\*\* Prüfe nach Fertigstellung:

>    - Wird `stroke-dashoffset` für die Animation genutzt?

>    - Reagieren die `lucide-react` Icons exakt synchron zum Erreichen der Datenpunkte?

>    - Sind die CSS-Filter (`drop-shadow`) performant implementiert?“



\#### \*\*B. Prompt für den Executor (Technische Vollstreckung)\*\*

> „Agiere als Senior Developer. Implementiere Test #2.

> 1. \*\*DataWave.tsx:\*\* Erstelle eine SVG-Komponente. Zeichne einen Pfad basierend auf einem Array von Werten aus der Research.

> 2. \*\*Animation:\*\* Nutze `interpolate`, um den `stroke-dasharray` und `offset` über 120 Frames von 0 auf 100% zu animieren.

> 3. \*\*Vibe:\*\* Nutze Tailwind v4 für den Container, aber SVG-Attribute für die Linie. Füge eine pulsierende Animation für die Datenpunkte hinzu, die nur `spring()` nutzt.

> 4. \*\*Integration:\*\* Registriere die Szene als 'DataProduction' in `Root.tsx`.“



---



\### 🧪 Test #3: Realistic Mockups (High-End Compositing)

\*\*Ziel:\*\* Fehlerfreie Integration externer Medien mittels `staticFile` und Maskierung.



\#### \*\*A. Prompt für den Orchestrator (Strategie \& Abnahme)\*\*

> „Agiere als Lead Architect. Dein Ziel ist \*\*Test #3: Asset Compositing\*\*.

> 1. \*\*Konzept:\*\* Einbetten der bisherigen Tests in ein realistisches Hardware-Mockup (Laptop/Smartphone).

> 2. \*\*Spezifikation:\*\* Absolute Priorität hat die Anti-Flicker-Strategie. Wir nutzen die Regeln aus `rules/assets.md`.

> 3. \*\*Abnahme-Check:\*\* 

>    - Wird `staticFile()` für alle Pfade in `public/assets/` genutzt?

>    - Ist die Maskierung des Displays pixelgenau (kein Überlappen an den Rändern)?

>    - Wurde eine Licht-Reflexion (Overlay) über das Display gelegt, um Realismus zu erzeugen?“



\#### \*\*B. Prompt für den Executor (Technische Vollstreckung)\*\*

> „Agiere als Senior Developer. Implementiere Test #3.

> 1. \*\*MockupScene.tsx:\*\* Lade ein Device-Image via `<Img />` und `staticFile()`.

> 2. \*\*Compositing:\*\* Erstelle einen Container, der die `MainScene.tsx` (aus Test 1) skaliert und mittels `CSS transform` (perspective/rotate) in das Display des Mockups einpasst.

> 3. \*\*Reflections:\*\* Lege ein halbtransparentes `div` mit einem weißen Gradienten über das Display, um Glas-Reflektionen zu simulieren.

> 4. \*\*Commit:\*\* Führe einen Git-Push unter `24-firon` aus, sobald der Render ohne Artefakte läuft.“



---



\### 🧪 Test #4: 3D Space (Complex Scene Graph)

\*\*Ziel:\*\* Volle Integration von Three.js Umgebungen und synchronisierter Kamera.



\#### \*\*A. Prompt für den Orchestrator (Strategie \& Abnahme)\*\*

> „Agiere als Lead Architect. Dein Ziel ist das finale \*\*Test #4: Cinematic 3D Space\*\*.

> 1. \*\*Konzept:\*\* Eine Kamerafahrt durch einen virtuellen Raum, in dem 3D-Objekte und UI-Elemente (Terminal) koexistieren.

> 2. \*\*Spezifikation:\*\* Strikte Durchsetzung der 'No useFrame'-Regel aus `rules/3d.md`. Die Kamera-Position muss eine reine Funktion des `frame`-Counters sein.

> 3. \*\*Qualitäts-Audit:\*\* 

>    - Gibt es Render-Flackern? (Falls ja: Root Cause Analyse der Shaders).

>    - Ist die Beleuchtung (`Environment`) konsistent zum 'SaaS-Industrial' Look?“



\#### \*\*B. Prompt für den Executor (Technische Vollstreckung)\*\*

> „Agiere als Senior Developer. Implementiere Test #4.

> 1. \*\*ThreeScene.tsx:\*\* Setze eine `<ThreeCanvas>` auf. Implementiere eine `FocusTrackingCamera`.

> 2. \*\*Geometry:\*\* Erstelle eine Gruppe von 3D-Objekten (Würfel/Sphären) mit dem Metallic-Theme.

> 3. \*\*Animation:\*\* Berechne die Rotation und Position aller Objekte direkt via `frame \* Geschwindigkeit`. Nutze KEIN `useFrame()`.

> 4. \*\*Hybrid:\*\* Integriere ein schwebendes HTML-Element (`<Html>` von `@react-three/drei`), das Text aus der Research anzeigt.“



---



\### Warum diese Prompts dein Credo erfüllen:

1\.  \*\*Unmissverständlichkeit:\*\* Jede Rolle weiß, was sie zu tun hat (Executor = Code, Orchestrator = Logik/Check).

2\.  \*\*Ausführlichkeit:\*\* Wir benennen die mathematischen Funktionen (`spring`, `interpolate`) und die spezifischen Materialwerte.

3\.  \*\*Governance:\*\* Wir binden die `Research/`-Dateien und die `PROJECT\_RULES.md` als unumstößliche Quellen ein.

