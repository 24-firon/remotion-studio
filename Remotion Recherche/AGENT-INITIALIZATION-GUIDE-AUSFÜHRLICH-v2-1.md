# Agent Initialization Guide v2.1 – Ausführliche Fütterungsanleitung (29. Jan 2026)

## Einleitung: Warum diese Anleitung existiert

Du hast 30 Markdown-Dateien. Ein Agent kann nicht alle auf einmal verarbeiten – sein Kontext-Fenster würde überlaufen, und er würde dumm anfangen, anstatt fokussiert zu arbeiten.

Diese Anleitung sagt dir **genau**, in welcher Reihenfolge, unter welchen Bedingungen und **warum** du jede einzelne Datei einem Agenten geben sollst.

Das ist **nicht** wie die vorigen Übersichten gruppiert. Das ist **pro Datei einzeln** erklärt, mit ausführlicher Begründung.

---

## PHASE 1: KERN-INITIALISIERUNG (Immer diese 3 zuerst, egal was kommt)

### Datei 1: `00-master-workflow-2026-integration.md`

**Wann:** Allererstes Mal, bevor der Agent eine einzige Frage vom User beantwortet.

**Warum diese Datei existiert:**
Der Agent braucht eine "Logik-Engine". Ohne sie rät er nur. Diese Datei enthält Entscheidungsbäume: "Wenn der User fragt, wie man 3D-Modelle lädt, dann nutze Datei X. Wenn der User Performance will, nutze Datei Y." Sie ist das **Gehirn** des ganzen Systems.

**Was drin ist:**
- Flowcharts: "Wann brauche ich welche Technologie?"
- Decision Trees: "Container Queries oder Media Queries?"
- Strategische Übersichten: "Cloud-Rendering oder lokal?"
- Integration zwischen Remotion, React, Web-APIs

**Was der Agent damit tun soll:**
Diese Datei nicht als "Code" interpretieren, sondern als "Navigationssystem". Jedes Mal, wenn der User eine Anfrage macht, soll der Agent erst diesen Workflow durchgehen: "Was fragt der User? Welcher Entscheidungsbaum passt?"

**Konkretes Beispiel:**
- User fragt: "Ich möchte ein Video mit Musik-Reaktion"
- Agent liest `00-master-workflow`: "Audio-Reaktion → Nutze `40-audio-reaktiv-00`"
- Agent lädt diese Datei (Schritt 19)

**Kritikalität:** 🔴 **ABSOLUT NOTWENDIG** – Der Agent funktioniert ohne diese nicht strukturiert.

---

### Datei 2: `10-remotion-basics-01-timeline-und-frames.md`

**Wann:** Unmittelbar nach Datei 1.

**Warum diese Datei existiert:**
Das ist die "Grammatik" von Remotion. Ohne sie schreibt der Agent zwar Code, aber fehlerhaften. Diese Datei erklärt:
- Wie `useCurrentFrame` funktioniert
- Wie `interpolate` Zeit verwaltet
- Wie Komposition-Struktur aussieht
- Was `width`, `height`, `durationInFrames` bedeuten

**Was drin ist:**
- Detaillierte Erklärungen von Timeline-Konzepten
- `useCurrentFrame()` Hooks
- `interpolate()` für sanfte Animationen
- Komposition-Struktur (Parent, Children, Props)
- Frame-Rates und Timing

**Was der Agent damit tun soll:**
Diese Datei nutzen, um jeden Remotion-Code zu validieren. Bevor der Agent Code schreibt, soll er denken: "Passt das zu dem, was in Datei 2 steht?"

**Konkretes Beispiel:**
- Agent schreibt: `const frame = useCurrentFrame();`
- Das ist richtig, weil es in Datei 2 steht
- Agent schreibt: `animate(0, 100, duration)` (falsch)
- Agent prüft Datei 2 und findet: `interpolate(frame, [0, duration], [0, 100])`
- Agent korrigiert

**Kritikalität:** 🔴 **ABSOLUT NOTWENDIG** – Syntax-Referenz für alles was folgt.

---

### Datei 3: `QUICK-START-komplettbeispiel.md`

**Wann:** Gleich nach Datei 2.

**Warum diese Datei existiert:**
Der Agent braucht ein "funktionierendes Skelett". Diese Datei zeigt:
- Eine komplette, lauffähige Remotion-Komposition
- Wie Dateien strukturiert sind
- Wo imports gehen
- Wie styles funktionieren
- Ein "Template", das kopiert werden kann

**Was drin ist:**
- 300–500 Zeilen produktiver Code
- React Component, CSS, Remotion hooks – alles zusammen
- Kommentare auf Deutsch
- "Du kannst ab hier starten"

**Was der Agent damit tun soll:**
Wenn der Agent einen **neuen** Code-Entwurf schreiben muss, soll er die Struktur dieses Templates nachahmen. Nicht eins-zu-eins kopieren, aber die Struktur.

**Konkretes Beispiel:**
- User fragt: "Erstelle ein einfaches Video"
- Agent nimmt Struktur aus Datei 3
- Agent ersetzt nur die inhaltliche Logik, behält aber Struktur
- Result: Lauffähiger Code beim ersten Versuch

**Kritikalität:** 🟡 **SEHR WICHTIG** – Verhindert "Halluzinations-Code", der nicht laufen würde.

---

### Datei 4: `FEHLERLOSUNG-haeufige-probleme.md`

**Wann:** Sobald der Agent anfängt, Code zu schreiben (oder Fehler zu sehen).

**Warum diese Datei existiert:**
Der Agent wird Fehler machen. Diese Datei sagt ihm, wie er sie *selbst* corrigiert, ohne dich zu fragen:
- "Hydration Error" → Das ist Datei X im Problem, Lösung ist Y
- "Video rendert nicht" → Prüfpunkte: Dimensions, Duration, Codec
- "useCurrentFrame() undefined" → Du hast den Hook nicht importiert

**Was drin ist:**
- 80+ häufige Fehler
- Problem → Ursache → Lösung
- Code-Beispiele für Fixes
- Debugging-Strategien

**Was der Agent damit tun soll:**
Jedes Mal, wenn ein Error auftaucht:
1. Agent liest den Error-Text
2. Agent sucht in Datei 4 nach Match
3. Agent wendet Lösung an
4. Wenn das nicht reicht, fragt der Agent den User mit konkreter Info

**Konkretes Beispiel:**
- User berichtet: "Video lädt nicht"
- Agent sucht in Datei 4: "Video lädt nicht"
- Findet: "Ursachen: Format falsch, Pfad falsch, Browser-Cors"
- Agent fragt User konkret: "Ist die Datei .mp4 oder .webm? Liegt sie im `/public` Ordner?"

**Kritikalität:** 🟡 **SEHR WICHTIG** – Spart euch beide Zeit und Frustration.

---

## PHASE 2: QUALITÄTS-SICHERUNG (Nach erstem Draft – je nachdem was der User will)

**Kontext:** Der Agent hat jetzt Dateien 1–4. Der User fragt etwas. Der Agent schreibt Code. Jetzt braucht der Agent optionale "Quality Boosters" je nach dem, was der User will.

### Datei 5: `50-web-patterns-08-performance-web-vitals-mastery.md`

**Wann:** Wenn der User ein Wort sagt wie: "schnell", "optimieren", "Mobile", "Laden", "Handy", "Performance", "langsam".

**Warum diese Datei existiert:**
Ein Video kann schön sein, aber wenn es den Browser crasht oder 10 Sekunden zum Laden braucht, ist es wertlos. Diese Datei erklärt:
- Web Vitals: LCP, INP, CLS (Google-Ranking-Faktoren)
- Memory Leaks vermeiden
- Video-Dateigröße optimieren
- Lazy Loading
- Performance-Metriken

**Was drin ist:**
- Konkrete Performance-Targets (z.B. LCP < 2.5s)
- Code-Patterns für Memory-sichere Animation
- Wie groß darf eine Video-Datei sein?
- Monitoring und Debugging

**Was der Agent damit tun soll:**
Bevor der Agent Code schreibt:
- Fragt sich: "Ist das Performance-kritisch?"
- Wenn ja: Nutzt Patterns aus Datei 5
- Wenn es Code wird: "Ist dieser Code Memory-safe? Rendert er 60 FPS oder ruckelt?"

**Konkretes Beispiel:**
- User: "Ich möchte ein Video auf meiner Homepage"
- Agent schreibt Code mit `useEffect` + `state` + Animation
- Aber Agent prüft Datei 5: "Hast du useCallback vergessen? Könnte Memory-Leak sein?"
- Agent korrigiert Code präventiv

**Kritikalität:** 🟡 **WICHTIG für Production** – Ohne das siehst du Handy-User, die abspringen.

---

### Datei 6: `70-web-accessibility-wcag-2026-compliance.md`

**Wann:** Wenn der User ein Wort sagt wie: "öffentliche Website", "barrierefrei", "User mit Sehbehinderung", "Screenreader", oder wenn es eine **öffentliche (nicht interne) Website** ist.

**Warum diese Datei existiert:**
Das ist nicht optional. Wenn deine Website für die Öffentlichkeit zugänglich ist, musst du WCAG 2.1 AA erfüllen. Diese Datei erklärt:
- Farb-Kontrast: 4.5:1 für normalen Text
- Screenreader-kompatibilität
- Keyboard Navigation
- Video-Captions
- Alternative Text

**Was drin ist:**
- WCAG 2026 Standard (nicht veraltet!)
- Prüfpunkte: Welche Farben sind zu dunkel?
- `aria-*` Attribute
- Testing-Strategien
- Legale Implikationen (ADA, AODA, EN 301 549)

**Was der Agent damit tun soll:**
Wenn es eine öffentliche Website ist:
- Agent prüft ALLE Farben gegen Kontrast-Richtlinien
- Agent fügt `alt text` zu Bildern ein
- Agent prüft: Kann man die Site nur mit Tastatur navigieren?

**Konkretes Beispiel:**
- User: "Ich mache ein Portfolio mit Videos"
- Agent schreibt Button: `<button style={{color: '#88FF00', background: '#8800FF'}}>Play</button>`
- Agent prüft Datei 6: "Kontrast-Ratio = 1.5:1, braucht 4.5:1!"
- Agent ändert: `<button style={{color: '#FFFFFF', background: '#0000AA'}}>Play</button>` (9:1)

**Kritikalität:** 🟠 **WICHTIG für Legal** – Ohne das könnten dich User oder Behörden verklagen.

---

### Datei 7: `20-layout-patterns-01-container-queries-und-grids.md`

**Wann:** Wenn der User fragt: "responsive Design", "Mobile-View", "Grids", "Verschiedene Bildschirmgrößen", oder der Agent merkt, dass Layout-Code nötig ist.

**Warum diese Datei existiert:**
Das ist die **Moderne** CSS/Layout-Referenz für 2026. Diese Datei erklärt NICHT alte Media Queries, sondern:
- Container Queries (CSS 2025 Standard): "Wie breit bin *ich*, nicht der Viewport?"
- CSS Subgrid: Nested Grids, die sich vom Parent-Grid erben
- Bento-Layouts: Asymmetrische, moderne Grid-Layouts

**Was drin ist:**
- Container Queries Syntax + Beispiele
- `grid: subgrid` wie das geht
- Responsive ohne globale Breakpoints
- Code-Beispiele für alle 3 Patterns

**Was der Agent damit tun soll:**
Wenn Layout-Code nötig ist:
- Agent nutzt Container Queries statt Media Queries
- Agent nutzt Subgrid statt nested Grid-Definition
- Agent denkt: "Self-contained Components"

**Konkretes Beispiel:**
- User: "Ich brauche eine Video-Card, die auf Handy klein und auf Desktop groß aussieht"
- Agent (ohne Datei 7): Schreibt `@media (min-width: 768px) { ... }`
- Agent (mit Datei 7): Schreibt `container-type: inline-size` und `@container (min-width: 400px) { ... }`
- Result: Card funktioniert überall, nicht nur bei globalen Breakpoints

**Kritikalität:** 🟡 **WICHTIG für 2026** – Alte Media Queries sind jetzt "legacy". Diese Datei ist der moderne Standard.

---

### Datei 8: `20-layout-patterns-02-view-transitions-in-remotion.md`

**Wann:** Wenn der User fragt: "flüssige Übergänge", "Scene-Wechsel", "Morphing", "weiches Überblenden zwischen Elementen", oder wenn mehrere Szenen hintereinander kommen.

**Warum diese Datei existiert:**
Szenen-Wechsel sehen oft "hart" aus: Fade-In, Fade-Out, fertig. Diese Datei erklärt, wie man **Shared Element Transitions** nutzt:
- Element morpht sanft zwischen zwei States
- Browser macht das automatisch
- Kino-Look ohne komplexe Animationen

**Was drin ist:**
- `view-transition-name` CSS Property
- `document.startViewTransition()` API
- Shared Element Morphing
- Cross-Page Transitions
- Browser-Support + Fallbacks

**Was der Agent damit tun soll:**
Wenn Szenen-Wechsel vorkommen:
- Agent nutzt `view-transition-name` für Elemente, die morphen
- Agent nutzt `document.startViewTransition()` um Übergänge zu triggern
- Agent denkt: "Welche Elemente bleiben erhalten zwischen Szenen?"

**Konkretes Beispiel:**
- User: "Ich habe Scene A mit einem Button. In Scene B ist der Button woanders. Wie mache ich's flüssig?"
- Agent schreibt: `<button style={{ viewTransitionName: 'main-btn' }}>Click</button>`
- Button morpht sanft von Position A zu Position B

**Kritikalität:** 🟡 **WICHTIG für UX** – Mit dieser Datei sieht alles "poliert" aus.

---

### Datei 9: `20-layout-patterns-03-modern-css-masking-compositing.md`

**Wann:** Wenn der User fragt: "Video in Text", "Vignette", "Kino-Look", "Überlagerung", "Blend-Modes", oder wenn es um komplexe visuelle Effekte geht (die aber nicht WebGL-schwer sind).

**Warum diese Datei existiert:**
Das ist die "Geheimwaffe" für visuell interessante Effekte, ohne langsame Canvas/WebGL zu brauchen. Diese Datei erklärt:
- CSS `mask-image` (Video wird durch Text-Shape angezeigt)
- `mix-blend-mode` (multiply, screen, overlay, etc.)
- Vignette-Effekte (Kanten dunkeln)
- Alles rein CSS, GPU-accelerated

**Was drin ist:**
- SVG Masks
- Blend-Mode Referenz
- Gradient-basierte Masking
- Vignette-Code (Copy-Paste)

**Was der Agent damit tun soll:**
Wenn es um "kino-Look" oder visuell interessante Effekte geht:
- Agent schlägt Masking/Blending vor, statt Canvas
- Agent nutzt `mix-blend-mode: multiply` statt teurer Shader
- Agent denkt: "Kann ich das mit CSS machen?"

**Konkretes Beispiel:**
- User: "Ich will mein Logo so animieren, dass es wie Wasser aussieht"
- Agent (ohne Datei 9): Schreibt komplexen WebGL Shader (teuer, kompliziert)
- Agent (mit Datei 9): Nutzt `mix-blend-mode: overlay` + Gradient-Mask (einfach, schnell)

**Kritikalität:** 🟡 **WICHTIG für Visuals** – Macht große Performance-Unterschiede.

---

## PHASE 3: EFFEKTE & VISUELLE POLISH (Wenn das Grundgerüst steht und es "schöner" werden soll)

**Kontext:** Der Agent hat bis hier 1–9. Der Code funktioniert, ist performant, responsive, accessible. Aber es sieht "unvollkommen" aus. Jetzt kommen die Effekt-Module.

### Datei 10: `30-post-processing-00-overview-postprocessing-stack.md`

**Wann:** Sobald der User das Wort "Effekt", "Filter", "Unschärfe", "Glow", "Vintage" etc. sagt, ODER wenn der Agent merkt, dass das Video visuell langweilig aussieht.

**Warum diese Datei existiert:**
Effekte sind nicht "einfach drauf werfen". Diese Datei erklärt **Architektur** von Effekt-Stacks:
- Wie lagert man Effekte übereinander?
- Welche Effekte sind "teuer"? (Performance)
- Wie kombiniert man Effekte, ohne zu übertreiben?
- Fallback für alte Browser?

**Was drin ist:**
- Überblick über alle verfügbaren Effekte (30-01 bis 30-04)
- Performance-Charakteristiken jedes Effekts
- "Wann nutze ich welchen Effekt?"
- Best Practices: Nicht zu viele Effekte kombinieren

**Was der Agent damit tun soll:**
Bevor der Agent Effekte einbaut:
1. Agent liest Datei 10: "Was sind die Optionen?"
2. Agent entscheidet: "Welche Effekte passen zur Tonalität?"
3. Agent lädt spezifische Effekt-Dateien (11–14)

**Konkretes Beispiel:**
- User: "Mach das Video altmodisch / Vintage"
- Agent liest Datei 10: "Für Vintage brauche ich wahrscheinlich Grain + evtl. Chromatic Aberration"
- Agent lädt Datei 14 (Chromatic + Grain)

**Kritikalität:** 🟢 **WICHTIG** – Verhindert Chaos-Effekt-Stack.

---

### Datei 11: `30-post-processing-01-bloom-selective.md`

**Wann:** User sagt: "Leuchten", "Neon", "Glow", "Cyberpunk", "Sci-Fi", "Hell ausstrahlen".

**Warum diese Datei existiert:**
Bloom-Effekt lässt Dinge "leuchten" und "atmen". Diese Datei erklärt:
- Wie Bloom technisch funktioniert
- Selektives Blooming (nur bestimmte Farben leuchten)
- Performance-Tipps (kann teuer sein)
- Parameter: Strength, Radius, Threshold

**Was drin ist:**
- Bloom Shader Code
- Parameter-Guide
- Wann ist Bloom zu viel?
- Code-Beispiele

**Was der Agent damit tun soll:**
Wenn der User "leuchten" will:
- Agent nutzt Bloom mit `threshold` um nur helle Pixel zu beeinflussen
- Agent nutzt moderat (nicht zu stark, sonst sieht's billig aus)

**Konkretes Beispiel:**
- User: "Ich möchte einen Text-Title der leuchtet wie in einem Sci-Fi-Film"
- Agent nutzt: `<Bloom threshold={0.8} strength={1.5} />`

**Kritikalität:** 🟢 **Nice-to-have** – Macht große visuelle Unterschiede.

---

### Datei 12: `30-post-processing-02-depth-of-field.md`

**Wann:** User sagt: "Kamera-Fokus", "Unschärfe", "Bokeh", "Film-Look", oder wenn es um "Cinematic" geht.

**Warum diese Datei existiert:**
Depth-of-Field macht Videos "kino-Like": Vordergrund scharf, Hintergrund unscharf. Diese Datei erklärt:
- Wie DoF funktioniert
- Focus-Punkt: Welche Ebene ist scharf?
- Blur-Stärke: Wie sehr soll der Hintergrund verschwimmen?
- Performance-Tipps

**Was drin ist:**
- DoF Shader-Code
- Parameter: focusDistance, focalLength, bokehScale
- Wann nutzt man DoF?
- Fallbacks für Low-End Devices

**Was der Agent damit tun soll:**
Wenn der User "Film-Look" will:
- Agent nutzt DoF mit moderatem focusDistance
- Agent denkt: "Was soll der Zuschauer sehen?" und macht das scharf
- Agent macht Hintergrund subtil unscharf

**Konkretes Beispiel:**
- User: "Mein Video soll aussehen wie ein Spielfilm"
- Agent nutzt: `<DepthOfField focusDistance={5} focalLength={0.1} />`

**Kritikalität:** 🟢 **Nice-to-have** – Sehr "Cinema Feel".

---

### Datei 13: `30-post-processing-03-04-chromatic-und-grain.md`

**Wann:** User sagt: "Retro", "Vintage", "VHS", "Glitch", "Film Grain", "80er-Jahre".

**Warum diese Datei existiert:**
Diese Datei kombiniert zwei Effekte:
- **Chromatic Aberration:** RGB-Kanäle sind leicht verschoben (Glitch-Look)
- **Film Grain:** Rauschen wie echtem Foto-Film

**Was drin ist:**
- Chromatic Aberration Code
- Film Grain Code
- Wann kombiniert man beide?
- Intensity-Parameter

**Was der Agent damit tun soll:**
Wenn der User "alt" oder "beschädigt" aussehen möchte:
- Agent nutzt Film Grain für "echten Film-Look"
- Agent nutzt Chromatic Aberration für "Glitch" oder "Fehler"

**Konkretes Beispiel:**
- User: "Ich möchte ein retro 80er-Video"
- Agent nutzt: `<FilmGrain intensity={0.3} />` + `<ChromaticAberration amount={0.01} />`

**Kritikalität:** 🟢 **Spezial** – Nur wenn User es explizit will.

---

## PHASE 4: WEB-INTEGRATION (Das Video muss auf einer echten Website funktionieren)

**Kontext:** Der Agent hat das Video funktionsfähig und visuell interessant. Jetzt muss es auf einer Website eingebettet werden, ohne die Seite zu ruinieren.

### Datei 14: `50-web-patterns-01-scroll-basierte-dof-navigation.md`

**Wann:** User sagt: "Scroll-Animation", "Apple-Style Website", "Scrollytelling", "Das Video soll sich beim Scrollen abspielen", oder wenn der Agent merkt, dass Video + Website zusammen arbeiten müssen.

**Warum diese Datei existiert:**
Das ist die "Königsdisziplin" der Web-Video-Integration. Diese Datei erklärt, wie man:
- Video-Playback an Scrollbalken bindet
- Scroll-Position = Frame-Position
- IntersectionObserver für Performance
- Parallax + Video kombinieren

**Was drin ist:**
- Scroll-Event Handling
- IntersectionObserver API
- Scroll-Position zu Frame-Mapping
- Performance-optimiert

**Was der Agent damit tun soll:**
Wenn es "Scroll-Integration" ist:
- Agent nutzt IntersectionObserver statt ständigen Scroll-Listener
- Agent denkt: "Soll das Video bei Scroll schneller/langsamer werden?"
- Agent denkt: "Andere Elemente sollen parallax sein?"

**Konkretes Beispiel:**
- User: "Ich möchte eine Landingpage wie auf Apple.com, wo das Video beim Scrollen abspielt"
- Agent nutzt IntersectionObserver + scroll-to-frame Mapping
- Resultat: Smoothes Scrolling, kein Ruckeln

**Kritikalität:** 🟡 **WICHTIG für UX** – Wenn es Web-Integration ist, ist das quasi Pflicht.

---

### Datei 15: `50-web-patterns-02-adaptive-quality-switching.md`

**Wann:** User sagt: "Handy-Optimierung", "Lädt zu langsam", "Für schlechte Verbindung", oder wenn es um Mobile geht.

**Warum diese Datei existiert:**
Videos auf dem Handy mit schlechtem WiFi? Abstürz. Diese Datei erklärt:
- Device-Tier-Detection: "Ist das High-End oder Low-End?"
- Quality Switching: "Bei Low-End: kleinere Video, weniger Effekte"
- Bandwidth-Detection: "Wie schnell ist die Internet-Verbindung?"
- Progressive Enhancement

**Was drin ist:**
- Code für Device-Tier Erkennung
- Conditional Effect-Loading
- Video-Filesize Strategy
- Fallbacks für alte Geräte

**Was der Agent damit tun soll:**
Bei Mobile-Targeting:
- Agent detektiert Device-Typ
- Agent schaltet Effekte bedingt ein/aus
- Agent nutzt kleinere Video-Dateien auf Mobile

**Konkretes Beispiel:**
- User: "Meine Handy-User sagen, das Video ruckelt"
- Agent liest Datei 15
- Agent implementiert: Auf Mobile: Keine Bloom-Effekte, kleinere Video-Auflösung
- Resultat: Smooth auch auf iPhone SE

**Kritikalität:** 🟡 **WICHTIG für Mobile** – Ohne das springen 30%+ User ab.

---

### Datei 16: `50-web-patterns-03-css-animationen-vs-remotion.md`

**Wann:** User fragt: "Soll ich das mit CSS animieren oder mit Remotion rendern?", oder Agent merkt, dass nicht alles eine Remotion-Komposition sein braucht.

**Warum diese Datei existiert:**
Du brauchst nicht *alles* als Video zu rendern. Manchmal ist CSS schneller und einfacher. Diese Datei erklärt:
- Wann nutze ich CSS? (Einfache Animationen, Überblendungen, Transitions)
- Wann nutze ich Remotion? (Komplexe Timeline, Sync mit Audio, viele Keyframes)
- Performance-Vergleich

**Was drin ist:**
- Decision Tree: "CSS oder Remotion?"
- Performance-Metriken
- Code-Beispiele für beide
- Hybrid-Ansätze

**Was der Agent damit tun soll:**
Bevor der Agent alles als Remotion rendert:
- Agent liest Datei 16: "Ist das wirklich notwendig?"
- Agent nutzt CSS für einfache Stuff
- Agent nutzt Remotion nur für komplexe Stuff

**Konkretes Beispiel:**
- User: "Ich möchte einen Text-Button, der beim Hover leuchtet"
- Agent (ohne Datei 16): Rendert das mit Remotion + Bloom-Effekt
- Agent (mit Datei 16): Nutzt CSS `box-shadow: 0 0 20px #FF00FF` auf `:hover`
- Result: Sofort sichtbar, 0 Rendering-Overhead

**Kritikalität:** 🟡 **WICHTIG für Effizienz** – Spart dir Rendering-Zeit.

---

### Datei 17: `50-web-patterns-09-kinetic-typography-text-animation.md`

**Wann:** User sagt: "Text-Animation", "Laufschrift", "Wort für Wort animiert", oder wenn viel Text im Video vorkommt.

**Warum diese Datei existiert:**
Text ist tricky. Mit falschen Einstellungen ist es lesbar aber langweilig, oder es wippt und sieht "unprofessionell" aus. Diese Datei erklärt:
- Wann nutze ich `<AbsoluteFill>` vs. `<Spring>`?
- Wie animiert man Buchstaben einzeln?
- Timing: Wie schnell sollte Text fliegen?
- Fallback für alte Browser

**Was drin ist:**
- Kinetic Typography Patterns
- Letter-by-Letter Animation
- Word-by-Word Animation
- Performance für viel Text

**Was der Agent damit tun soll:**
Wenn Text animiert sein soll:
- Agent nutzt `<Spring>` für organische Bewegung
- Agent denkt: "Soll jeder Buchstabe einzeln animiert sein oder nur das Wort?"
- Agent denkt: "Ist die Geschwindigkeit lesbar?"

**Konkretes Beispiel:**
- User: "Ich möchte einen Title-Text, der schön einzieht"
- Agent nutzt: `<Spring from={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} />`

**Kritikalität:** 🟢 **Nice-to-have** – Macht große Unterschiede bei Text-Heavy Videos.

---

### Datei 18: `50-web-patterns-10-real-time-ai-video-streaming.md`

**Wann:** User sagt: "Live-Streaming", "Echtzeit", "Sehr geringe Latenz", "Video wird im Browser generiert", oder wenn Video nicht im Voraus gerendert wird.

**Warum diese Datei existiert:**
Das ist ein Spezialfall: Statt ein fertiges Video zu haben, wird es *live* im Browser erzeugt und gestreamt. Diese Datei erklärt:
- Canvas-Streaming
- MediaRecorder API
- WebSocket für Live-Delivery
- Latenz-Optimierung

**Was drin ist:**
- Live-Rendering Code
- Streaming-Setup
- Latency-Minimierung
- Quality Adaptation bei Network Changes

**Was der Agent damit tun soll:**
Nur wenn es um Live-Streaming geht:
- Agent nutzt Canvas-Capture statt "render to file"
- Agent sendet Frames als Stream an Server
- Agent denkt: "Wie halte ich Latenz unter 2 Sekunden?"

**Konkretes Beispiel:**
- User: "Ich möchte ein Browser-Game, das in Echtzeit als Video zu Zuschauern streamt"
- Agent nutzt Datei 18: MediaRecorder + WebSocket
- Zuschauer sehen Live-Feed mit <500ms Latenz

**Kritikalität:** 🔴 **KRITISCH – falls nötig** – Aber nur wenn User das explizit braucht. Sonst ignorieren.

---

## PHASE 5: SPEZIAL-FUNKTIONEN (On-Demand, nur wenn User explizit fragt)

**Kontext:** Der Agent hat Basis 1–9, dann Quality 5–6, dann Design 7–9, dann Effekte 10–14, dann Web 15–18. Jetzt wird es spezial. Diese Module laden Sie **nur**, wenn der User explizit danach fragt.

### Datei 19: `40-audio-reaktiv-00-fft-frequenzspektren.md`

**Wann:** User sagt: **"Musik"**, "Audio", "Beat", "Visualizer", "Das Video soll zum Sound reagieren".

**Warum diese Datei existiert:**
Audio-Reaktivität ist komplex. Du brauchst FFT (Fast Fourier Transform) um die Frequenzen zu extrahieren, dann mappst du sie auf Animation. Diese Datei erklärt das alles.

**Was drin ist:**
- Web Audio API
- FFT Analyse
- Frequenzbänder: Bass, Mid, Treble
- Mapping zu Animation

**Kritikalität:** 🟢 **Spezial** – Nur wenn User explizit danach fragt.

---

### Datei 20: `40-procedural-patterns-00-noise-voronoi-terrain.md`

**Wann:** User sagt: **"Hintergrund generieren"**, "Muster", "Zufällig", "Noise", "Landschaft", "Organisch".

**Warum diese Datei existiert:**
Nicht alles ist ein Photo. Manchmal brauchst du generative Hintergründe. Diese Datei erklärt Perlin-Noise, Voronoi, etc.

**Kritikalität:** 🟢 **Spezial** – On-Demand.

---

### Datei 21: `40-advanced-lighting-00-caustics-volumetric.md`

**Wann:** User sagt: **"Wasser"**, "Lichtstrahlen", "Realistisch", "Glas", "Volumetric", "Caustics", "3D-Look".

**Warum diese Datei existiert:**
Für fortgeschrittene Beleuchtungs-Effekte. WebGL-Shader für komplexe Lichtsimulation.

**Kritikalität:** 🟠 **Advanced** – Nur sehr spezialisierten Use Cases.

---

### Datei 22: `40-gltf-models-00-loading-optimization.md`

**Wann:** User sagt: **"3D-Modell"**, "Blender", "glTF", ".glb Datei", "Produkt-Ansicht".

**Warum diese Datei existiert:**
3D-Modelle in Remotion nutzen. Import, Optimization, Skinning.

**Kritikalität:** 🟠 **Advanced** – Nur wenn 3D-Modelle involved sind.

---

## PHASE 6: ENTERPRISE & SCALING (Nur für größere Projekte)

**Kontext:** Bis hierher kann der Agent fast alles bauen. Aber für große Projekte (1M+ Videos, Cloud, KI) braucht es andere Module.

### Datei 23: `60-cloud-rendering-00-aws-lambda-renderfarming.md`

**Wann:** User sagt: **"Rendern"**, "MP4 erstellen", "Datei speichern", "AWS", "Lambda", "Rendering Farm", oder wenn das Video > 5 Min ist.

**Warum diese Datei existiert:**
Browser können nicht unendlich lange Videos rendern. Auf dem Server (AWS Lambda) geht's. Diese Datei erklärt die Infrastruktur.

**Kritikalität:** 🟡 **WICHTIG bei Production** – Wenn es um echte Rendering-Ausgabe geht.

---

### Datei 24: `80-ai-hybrid-workflows-v1-0-code-plus-ai.md`

**Wann:** User sagt: **"KI nutzen"**, "Stable Diffusion", "OpenAI", "Automatisch generieren", "LLM", "GPT für Content".

**Warum diese Datei existiert:**
Wie man KI in den Video-Produktions-Prozess einbaut. Prompt Engineering, Bild-Generierung, etc.

**Kritikalität:** 🟡 **WICHTIG für Automation** – Wenn es um KI-Integration geht.

---

### Datei 25: `90-synergy-01-data-driven-personalization.md`

**Wann:** User sagt: **"Personalisierung"**, "Viele Videos", "User-Daten", "Pro-User Variationen", "1000 Videos".

**Warum diese Datei existiert:**
Architektur für Massen-Personalisierung. Nicht 1 Video rendern, sondern 10,000 pro Tag.

**Kritikalität:** 🟡 **WICHTIG für Scale** – Nur wenn Personalisierung needed ist.

---

### Datei 26: `90-synergy-02-realtime-video-rag-agents.md`

**Wann:** User sagt: **"Chatbot"**, "Support", "Erklärvideo", "Knowledge Base", "RAG", "Automatische Antworten".

**Warum diese Datei existiert:**
Ein Bot, der basierend auf User-Fragen automatisch Erklärvideos generiert.

**Kritikalität:** 🟠 **Advanced Enterprise** – Nur sehr spezialisierte Projekte.

---

### Datei 27: `90-synergy-03-webgpu-compute-physics.md`

**Wann:** User sagt: **"Partikel"**, "Physik", "Millionen", "GPU", "Simulation", "Real-time Effects".

**Warum diese Datei existiert:**
Extreme Performance für Physik-Simulationen. WebGPU Compute Shader statt CPU.

**Kritikalität:** 🔴 **KRITISCH – falls nötig** – Aber nur für GPU-intensive Szenarien.

---

## PHASE 7: REFERENCE (Ablage, nicht für Code-Schreiben)

### Datei 28: `00-navigation-index-v2-1-complete.md`

**Wann:** Wenn *du* (nicht der Agent) wissen willst, wo was steht. Inhaltsverzeichnis.

**Kritikalität:** 🟢 **Für dich** – Agent braucht das nicht.

---

### Datei 29: `90-appendix-glossary-bibliography.md`

**Wann:** Wenn Begriffe erklärt werden müssen oder Quellen nötig sind.

**Kritikalität:** 🟢 **Nachschlagebuch** – Agent nutzt das selten.

---

### Datei 30: `LUECKEN-AUDIT-v2-1-complete-coverage.md`

**Wann:** Administrativ – um zu verifizieren, dass das System komplett ist.

**Kritikalität:** 🟢 **Meta** – Agent braucht das nicht.

---

## Zusammenfassung: Die Fütterungs-Strategie

### Initialisierung (Immer)
```
1. 00-master-workflow-2026-integration.md
2. 10-remotion-basics-01-timeline-und-frames.md
3. QUICK-START-komplettbeispiel.md
4. FEHLERLOSUNG-haeufige-probleme.md

→ Agent kann jetzt Basis-Code schreiben
```

### Nach erstem Draft (Je nachdem)
```
+ 50-web-patterns-08 (wenn "schnell" gewünscht)
+ 70-web-accessibility (wenn öffentliche Website)
+ 20-layout-patterns-01/02/03 (wenn Layout/Responsive nötig)

→ Agent kann jetzt professionelle Qualität liefern
```

### Für Effekte (Optional)
```
+ 30-post-processing-00 (Überblick)
+ 30-post-processing-01/02/03 (Spezifische Effekte)

→ Agent kann visuell poliert code schreiben
```

### Für Web-Integration (Optional)
```
+ 50-web-patterns-01 (Scroll-Integration)
+ 50-web-patterns-02 (Mobile Optimization)
+ 50-web-patterns-03 (CSS vs. Remotion Decision)
+ 50-web-patterns-09 (Text Animation)

→ Agent kann Website + Video kombinieren
```

### Spezial (Nur bei expliziter Anfrage)
```
+ 40-audio-reaktiv (wenn "Musik")
+ 40-procedural-patterns (wenn "Generativ")
+ 40-advanced-lighting (wenn "Realismus")
+ 40-gltf-models (wenn "3D-Modelle")

→ Agent kann Spezial-Features bauen
```

### Enterprise (Bei großen Projekten)
```
+ 60-cloud-rendering (wenn "Rendern")
+ 80-ai-hybrid (wenn "KI")
+ 90-synergy-01 (wenn "Personalisierung")
+ 90-synergy-02 (wenn "Chatbot")
+ 90-synergy-03 (wenn "Partikel/GPU")

→ Agent kann skalieren
```

---

## Finale Prüfpunkte

Bevor du eine Datei einem Agenten gibst, frag dich:

1. **Hat der Agent die Voraussetzung gelesen?** (z.B. Datei 7 braucht vorher Dateien 1–4)
2. **Wird die Datei gerade relevant?** (z.B. "Performance" nur wenn User "schnell" sagt)
3. **Könnte die Datei den Agent verwirren?** (z.B. alle 40er auf einmal = Information Overload)

---

**Version:** v2.1 (29. Jan 2026)  
**Satus:** Prodiktionsreif  
**Nächste Update:** v2.2 (Apr 2026)