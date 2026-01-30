# 🎯 Badge 4: Extraction Report – DESIGN SYSTEM & UI

**Version:** 1.0  
**Analyst:** Sub-Agent (Badge 4)  
**Date:** 2026-01-31

---

## 📊 Statistik

| Kategorie        | Anzahl | Beschreibung                                  |
| ---------------- | ------ | --------------------------------------------- |
| A: SKILL_UPDATE  | 8      | Generisches Remotion-Wissen (übertragbar)     |
| B: PROJECT_IP    | 12     | Viron-spezifische Configs/Secrets             |
| C: RESEARCH_NOTE | 6      | Kontext, Tutorials, Begründungen              |
| ❌ VERWORFEN     | 2      | Redundant (bereits in remotion-core/SKILL.md) |

---

## 🔴 KRITISCHE VERBOTE (Sektion 3.3 D)

> [!CAUTION]
> Diese Verbote sind NICHT VERHANDELBAR. Verstöße verursachen Flickering im Rendering.

### Verbot 1: Tailwind CSS Animation Classes

**Quelle:** `tailwind.md` (Global Skill)

**Kontext/Erklärung:**  
In Remotion sind alle CSS-basierten Animationen verboten, weil sie nicht deterministisch sind. CSS Transitions (`transition-*`) und Animations (`animate-*`) laufen in Echtzeit und werden nicht frame-synchron gerendert. Das führt zu Flickering und inkonsistenten Ergebnissen bei jedem Render.

**VERBOTEN:**

```css
/* ❌ Diese Tailwind-Klassen NIEMALS verwenden */
transition-all
transition-colors
transition-opacity
animate-spin
animate-pulse
animate-bounce
```

**ERLAUBT:**

```tsx
// ✅ Alle Animationen müssen frame-driven sein
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1]);
```

**Implikation:**  
Jedes Tailwind-Projekt muss geprüft werden: Sind irgendwo `transition-*` oder `animate-*` Klassen im Code? → Entfernen und durch `useCurrentFrame()` ersetzen.

---

### Verbot 2: Third-Party Chart Animations

**Quelle:** `charts.md` (Global Skill)

**Kontext/Erklärung:**  
Libraries wie D3.js, Chart.js, Recharts etc. haben eingebaute Animationen. Diese sind nicht frame-synchron und müssen deaktiviert werden. Stattdessen: Manuelle Animation mit `spring()` und `useCurrentFrame()`.

**VERBOTEN:**

```tsx
// ❌ D3.js mit eigener Animation
d3.select("rect").transition().duration(1000).attr("height", 200);
```

**ERLAUBT:**

```tsx
// ✅ Manuelle spring()-Animation
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const height = spring({
  frame,
  fps,
  delay: index * 5, // Stagger
  config: { damping: 200 },
});

<rect height={height * barValue} />;
```

**Implikation:**  
Bei Datenvisualisierungen: Immer prüfen, ob die Library Animationen hat → Deaktivieren oder komplett manuell implementieren.

---

### Verbot 3: Opacity-basierter Typewriter

**Quelle:** `text-animations.md` (Global Skill)

**Kontext/Erklärung:**  
Typewriter-Effekte dürfen NICHT per-character opacity nutzen (alle Buchstaben da, nur sichtbar gemacht). Stattdessen: String Slicing. Der Grund: Opacity-Methode zeigt Artefakte bei bestimmten Fonts.

**VERBOTEN:**

```tsx
// ❌ Per-Character Opacity (FALSCH!)
{
  text
    .split("")
    .map((char, i) => (
      <span style={{ opacity: i < visibleIndex ? 1 : 0 }}>{char}</span>
    ));
}
```

**ERLAUBT:**

```tsx
// ✅ String Slicing (RICHTIG!)
const frame = useCurrentFrame();
const charIndex = Math.floor(frame / 2);
const visibleText = text.slice(0, charIndex);

<span>{visibleText}</span>;
```

**Implikation:**  
Bei Text-Animationen immer String Slicing verwenden. Keine React-Fragmente mit opacity pro Buchstabe.

---

## 🎨 B: PROJECT_IP (Viron-Spezifische Designs)

### IP-1: Metallic Palette (7-Stop Gradient)

**Quelle:** `theme.md` (Zeilen 22-32)

**Kontext/Erklärung:**  
Die Metallic Palette ist das Core Branding von Viron. 7 Stufen von Hellsilber bis Tiefgrau, die einen realistischen Zink-Silber-Gradient simulieren. Diese Werte sind exakt definiert und dürfen nicht approximiert werden.

**Code/Daten:**

```typescript
colors: {
  metallic: {
    // Zink-Silber-Gradient (oben → unten)
    stop1: "#e8e8e8", // Hellstes Silber (Highlights)
    stop2: "#d0d0d0", // Silber
    stop3: "#b8b8b8", // Mittleres Silber
    stop4: "#a0a0a0", // Basis-Silber
    stop5: "#888888", // Dunkleres Silber
    stop6: "#707070", // Zink-Ton
    stop7: "#505050", // Dunkelste (Schatten)
  },
}
```

**Implikation:**  
Alle neuen Komponenten MÜSSEN diese Palette nutzen. Keine Hex-Werte hardcoden – immer `THEME.colors.metallic.stop*` referenzieren.

---

### IP-2: Gradient Definitionen

**Quelle:** `theme.md` (Zeilen 227-245)

**Kontext/Erklärung:**  
Zwei vordefinierte Gradienten für den Viron-Look. `metallic135` für Buttons/Cards (diagonaler Verlauf), `metallicRadial` für Hero-Elemente (radialer Verlauf mit Highlight oben links).

**Code/Daten:**

```typescript
gradients: {
  metallic135: `linear-gradient(135deg,
    ${THEME.colors.metallic.stop1} 0%,
    ${THEME.colors.metallic.stop2} 16.67%,
    ${THEME.colors.metallic.stop3} 33.33%,
    ${THEME.colors.metallic.stop4} 50%,
    ${THEME.colors.metallic.stop5} 66.67%,
    ${THEME.colors.metallic.stop6} 83.33%,
    ${THEME.colors.metallic.stop7} 100%)`,

  metallicRadial: `radial-gradient(ellipse at 30% 30%,
    ${THEME.colors.metallic.stop1},
    ${THEME.colors.metallic.stop4},
    ${THEME.colors.metallic.stop7})`,

  accentCyan: `linear-gradient(90deg,
    transparent,
    ${THEME.colors.accent.primary})`,
}
```

**Implikation:**  
Gradienten nicht manuell schreiben – immer `THEME.gradients.*` nutzen für Konsistenz.

---

### IP-3: Typography Stack

**Quelle:** `theme.md` (Zeilen 68-73)

**Kontext/Erklärung:**  
Viron verwendet drei spezifische Fonts: Syne für Headlines (bold, futuristisch), Inter für Body (lesbar, neutral), IBM Plex Mono für Code/Terminal (technisch, monospaced).

**Code/Daten:**

```typescript
typography: {
  fontFamily: {
    display: '"Syne", sans-serif',      // Bold Headlines
    mono: '"IBM Plex Mono", monospace', // Code/Terminal
    sans: '"Inter", sans-serif',        // Body Text
  },
}
```

**Implikation:**  
Für Remotion: Fonts mit `@remotion/google-fonts` laden:

```tsx
import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadIBMPlexMono } from "@remotion/google-fonts/IBMPlexMono";
```

---

### IP-4: 4-Layer Button Architecture

**Quelle:** `GUIDE_Viron_Button_Stack.md` (Zeilen 16-37)

**Kontext/Erklärung:**  
Der Viron Button ist kein simpler Button – er ist eine 4-Layer 3D-Komposition mit einem AI-generierten Video als Backdrop, Glasrefraktion, Effekten und Post-Processing.

**Code/Daten:**

```
┌─────────────────────────────────────┐
│  Viron Button (Hero Component)       │
├─────────────────────────────────────┤
│ Layer 1: Backdrop                    │
│   └─ Luma/Runway AI-generated loop   │
│   └─ Rendered as VideoTexture        │
├─────────────────────────────────────┤
│ Layer 2: Glass/Transmission Hero     │
│   └─ MeshTransmissionMaterial        │
│   └─ Refracts backdrop (synergy)     │
├─────────────────────────────────────┤
│ Layer 3: Effects & Lighting          │
│   └─ Caustics (liquid light)         │
│   └─ Lightformers (neon accents)     │
│   └─ Sparkles (magic dust)           │
├─────────────────────────────────────┤
│ Layer 4: Post-Processing             │
│   └─ Bloom (emissive high)           │
│   └─ Glitch (on-interaction)         │
│   └─ Color grading (mood)            │
└─────────────────────────────────────┘
```

**Implikation:**  
Jeder neue Hero-Button muss diese Architektur befolgen. Keine Shortcuts – alle 4 Layer müssen implementiert sein für den Viron-Look.

---

### IP-5: MeshTransmissionMaterial Settings

**Quelle:** `viron-button-guide.md` (Zeilen 114-206)

**Kontext/Erklärung:**  
Die Glass-Refraktion ist das Herzstück des Viron-Looks. `MeshTransmissionMaterial` aus @react-three/drei erzeugt realistisches Glas. KRITISCH: Das Video muss als `background` Prop übergeben werden, nicht nur als Scene-Element.

**Code/Daten:**

```tsx
<MeshTransmissionMaterial
  // Video shows THROUGH the button (synergy!)
  background={videoTexture}
  // Glass params
  transmission={1}
  thickness={0.25}
  ior={1.5}
  roughness={0.05}
  // Optical effects
  chromaticAberration={0.04}
  anisotropicBlur={0.1}
  distortion={0.05}
  // Performance tuning
  samples={16} // Desktop: 16-24; Mobile: 8-12
  resolution={1024} // 512-2048; lower for mobile
/>
```

**Implikation:**  
Performance beachten: MeshTransmissionMaterial verursacht einen Extra-Render-Pass. Mobile: 8 samples, 512px. Desktop: 16+ samples, 1024px.

---

### IP-6: Caustics Configuration

**Quelle:** `viron-button-guide.md` (Zeilen 210-254)

**Kontext/Erklärung:**  
Caustics simulieren Lichtmuster, die durch Wasser/Glas gebrochen werden. In Viron: Cyan-farbig (#00FFFF), platziert unter dem Glas-Button für den "floating on liquid" Effekt.

**Code/Daten:**

```tsx
<Caustics
  color="#00FFFF" // Cyan light
  intensity={0.7} // Brightness
  worldRadius={1.5} // Clamp effect to this radius
  samples={32} // Quality
  ior={1.1} // Refraction index
  backfaces={true} // Essential for glass
>
  {/* Floor that receives caustics */}
  <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <planeGeometry args={[10, 10]} />
    <meshStandardMaterial color="#0b1015" roughness={0.8} />
  </mesh>
</Caustics>
```

**Implikation:**  
`backfaces={true}` ist KRITISCH für Glas. Floor-Color sollte dunkel sein (#0b1015) für maximalen Kontrast.

---

### IP-7: Lightformers (Neon Accents)

**Quelle:** `viron-button-guide.md` (Zeilen 257-302)

**Kontext/Erklärung:**  
Lightformers sind "fake" Lichtquellen, die nur in Reflektionen erscheinen. Sie werden im `<Environment>` platziert und erzeugen den "Product Shot" Look ohne echte Geometrie.

**Code/Daten:**

```tsx
<Environment resolution={1024}>
  {/* Top horizontal neon strip (cyan) */}
  <Lightformer
    form="rect"
    intensity={8}
    color="#00f0ff"
    scale={[4, 1, 1]}
    position={[0, 2, -2]}
  />

  {/* Side ring light (magenta) */}
  <Lightformer
    form="ring"
    intensity={5}
    color="#ff00ff"
    scale={2}
    position={[-3, 1, 1]}
  />

  {/* Soft fill light (white) */}
  <Lightformer
    form="rect"
    intensity={3}
    color="#ffffff"
    scale={[2, 2, 1]}
    position={[0, -1, 0]}
  />
</Environment>
```

**Implikation:**  
Viron verwendet immer mindestens 3 Lightformers: Top (Cyan), Side (Magenta), Fill (White).

---

### IP-8: Sparkles Configuration

**Quelle:** `viron-button-guide.md` (Zeilen 305-331)

**Kontext/Erklärung:**  
Sparkles sind winzige Partikel-Sprites für den "magic dust" Effekt. In Viron: Cyan-farbig (#00f5ff), mit Float-Wrapper für sanfte Bewegung.

**Code/Daten:**

```tsx
<Float floatIntensity={1} speed={2}>
  <Sparkles
    count={400} // Number of particles
    speed={0.7} // Animation speed
    opacity={0.6} // Fade in/out
    scale={[4, 4, 4]} // Bounding box
    size={3} // Particle size in pixels
    color="#00f5ff" // Cyan
    sizeAttenuation // Fade with distance
  />
</Float>
```

**Implikation:**  
Sparkles immer in `<Float>` wrappen. Count an Performance anpassen (400 für Desktop, 200 für Mobile).

---

### IP-9: Post-Processing Stack "Matrix Look"

**Quelle:** `viron-button-guide.md` (Zeilen 488-559)

**Kontext/Erklärung:**  
Der "Matrix" Look kombiniert Bloom, Glitch, Noise und ColorCorrection für einen High-Contrast, Digital-Glitch Stil.

**Code/Daten:**

```tsx
<EffectComposer disableNormalPass>
  {/* 1. Bloom: Only the brightest pixels glow */}
  <Bloom
    intensity={1.5}
    luminanceThreshold={0.6}
    luminanceSmoothing={0.2}
    mipmapBlur
  />

  {/* 2. Glitch: Digital artifacts on interaction */}
  <Glitch
    delay={[1.5, 3.5]}
    duration={[0.2, 0.6]}
    strength={[0.3, 0.7]}
    mode={active ? GlitchMode.CONSTANT_WILD : GlitchMode.SPORADIC}
  />

  {/* 3. Film Grain */}
  <Noise premultiply opacity={0.08} />

  {/* 4. Green Color Grade */}
  <ColorCorrection
    saturation={0.8}
    brightness={0.0}
    contrast={1.1}
    hue={-0.2}
  />

  {/* 5. Vignette: Dark edges */}
  <Vignette eskil={false} offset={0.4} darkness={0.9} />
</EffectComposer>
```

**Implikation:**  
Für Bloom: Emissive Materials müssen HELL sein (`emissiveIntensity={3}+`).

---

### IP-10: Dependency Matrix (Jan 2026)

**Quelle:** `viron-button-guide.md` (Zeilen 68-98)

**Kontext/Erklärung:**  
Exakte Versionen für den Viron Tech Stack. KRITISCH: Lamina ist ARCHIVIERT (seit Juni 2025) – stattdessen `three-custom-shader-material` verwenden.

**Code/Daten:**

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^r171",
    "@react-three/fiber": "^9.5.0",
    "@react-three/drei": "^10.7.7",
    "@react-three/postprocessing": "latest",
    "postprocessing": "latest",
    "three-custom-shader-material": "^6.0.0"
  }
}
```

> [!WARNING]
> **Lamina ist ARCHIVIERT** – Nicht mehr verwenden!  
> **WebGPU Support ist INCOMPLETE** – STAY ON WEBGL2 für Production.

**Implikation:**  
Alle `<LayerMaterial>` Referenzen müssen durch CSM (Custom Shader Material) ersetzt werden.

---

### IP-11: Tailwind Integration mit THEME

**Quelle:** `theme.md` (Zeilen 283-324)

**Kontext/Erklärung:**  
Das THEME-Objekt speist die Tailwind-Config. Dadurch sind alle Design-Tokens konsistent zwischen Remotion und Next.js.

**Code/Daten:**

```typescript
// tailwind.config.ts
import { THEME } from "./src/theme/Theme";

const config: Config = {
  theme: {
    extend: {
      colors: {
        metallic: {
          1: THEME.colors.metallic.stop1,
          // ... stop2-7
        },
        accent: {
          primary: THEME.colors.accent.primary,
          secondary: THEME.colors.accent.secondary,
        },
      },
      spacing: THEME.spacing,
      borderRadius: THEME.borderRadius,
      boxShadow: THEME.shadows,
      fontFamily: THEME.typography.fontFamily,
    },
  },
};
```

**Implikation:**  
Niemals Hex-Werte direkt in Tailwind verwenden – immer `metallic-1`, `accent-primary` etc.

---

### IP-12: Shadow Tokens

**Quelle:** `theme.md` (Zeilen 145-157)

**Kontext/Erklärung:**  
Vordefinierte Shadow-Tokens für konsistente Tiefeneffekte. Besonders wichtig: `metallic` für den gebürsteten Metall-Look.

**Code/Daten:**

```typescript
shadows: {
  none: "none",
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  metallic: "inset -2px -2px 5px rgba(0,0,0,0.3), inset 2px 2px 5px rgba(255,255,255,0.5)",
}
```

**Implikation:**  
`shadow-metallic` für gebürstete Metall-Buttons verwenden.

---

## 🔵 A: SKILL_UPDATE (Generisches Remotion-Wissen)

### Skill-1: Container Queries (2026 Standard)

**Quelle:** `20-layout-patterns-01-container-queries-und-grids.md` (Zeilen 1-70)

**Kontext/Erklärung:**  
Container Queries ersetzen globale Media Queries. Eine Komponente fragt sich selbst: "Wie breit bin ICH?" statt "Wie breit ist der Viewport?". Das ermöglicht wiederverwendbare, self-contained Components.

**Code/Daten:**

```css
/* Container Query Setup */
.card {
  container-type: inline-size;
}

/* Default: Mobile Layout */
.thumbnail {
  width: 100%;
}

/* When card is 400px+ */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
  }
}
```

**Implikation:**  
Für alle neuen UI-Komponenten: Container Queries statt `@media`. Browser Support: 70%+ mit graceful fallback.

---

### Skill-2: CSS Subgrid

**Quelle:** `20-layout-patterns-01-container-queries-und-grids.md` (Zeilen 450-293)

**Kontext/Erklärung:**  
Subgrid ermöglicht verschachtelte Grids, die die Spalten/Zeilen des Parent-Grids erben. Kein manuelles Alignment mehr nötig.

**Code/Daten:**

```css
.dashboard {
  display: grid;
  grid-template-columns: 1fr 2fr 300px;
}

.header {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid; /* KRITISCH */
}
```

**Implikation:**  
`display: grid` + `grid-template-columns: subgrid` auf Child-Elemente. Browser Support: 90%+.

---

### Skill-3: Bento Grid Layout

**Quelle:** `20-layout-patterns-01-container-queries-und-grids.md` (Zeilen 296-379)

**Kontext/Erklärung:**  
Bento Grid ist ein asymmetrisches Grid mit variablen Item-Größen (1x1, 2x2, 3x1). Modern, organisch, perfekt für Video-Portfolios und Dashboards.

**Code/Daten:**

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Hero: 2x2 */
.item.hero {
  grid-column: span 2;
  grid-row: span 2;
}

/* Wide: 3x1 */
.item.wide {
  grid-column: span 3;
}
```

**Implikation:**  
Für Dashboards und Portfolio-Seiten verwenden. Graceful degradation auf Mobile: alle Items werden 1x1.

---

### Skill-4: View Transitions API (Level 2)

**Quelle:** `20-layout-patterns-02-view-transitions-in-remotion.md` (Zeilen 1-100)

**Kontext/Erklärung:**  
View Transitions ermöglichen automatisches Morphing von Elementen zwischen Zuständen/Seiten. Elemente mit gleichem `viewTransitionName` werden automatisch animiert transformiert.

**Code/Daten:**

```tsx
const handleExpand = () => {
  if (!document.startViewTransition) {
    setIsExpanded(true);
    return;
  }

  document.startViewTransition(() => {
    setIsExpanded(true);
  });
};

// Beide States haben den gleichen viewTransitionName
<video style={{ viewTransitionName: "video-element" }} />;
```

**Implikation:**  
Für Szenen-Wechsel in Web-Projekten (nicht Remotion Video-Export!). Browser Support: 75%+ mit graceful fallback.

---

### Skill-5: Font Loading (Remotion)

**Quelle:** `fonts.md` (Global Skill)

**Kontext/Erklärung:**  
Fonts in Remotion MÜSSEN mit `@remotion/google-fonts` oder `@remotion/fonts` geladen werden. Das garantiert, dass Fonts fertig geladen sind, bevor ein Frame gerendert wird.

**Code/Daten:**

```tsx
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily, waitUntilDone } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Optional: Explizit warten
await waitUntilDone();
```

**Implikation:**  
Niemals `@import` oder `<link>` für Fonts in Remotion. Immer `@remotion/google-fonts`.

---

### Skill-6: Animated Images (GIF/APNG/WebP)

**Quelle:** `gifs.md` (Global Skill)

**Kontext/Erklärung:**  
`<AnimatedImage>` synchronisiert animierte Bilder mit der Remotion-Timeline. Unterstützt GIF, APNG, AVIF, WebP.

**Code/Daten:**

```tsx
import { AnimatedImage, staticFile } from "remotion";

<AnimatedImage
  src={staticFile("animation.gif")}
  width={500}
  height={500}
  playbackRate={2} // Speed
  loopBehavior="loop" // oder "pause-after-finish"
/>;
```

**Implikation:**  
Für sequenzielle Animationen in Videos verwenden. Alternative: `<Gif>` aus `@remotion/gif`.

---

### Skill-7: Spring Animation für Charts

**Quelle:** `charts.md` (Global Skill) + `BarChart.md`

**Kontext/Erklärung:**  
Charts in Remotion animieren mit `spring()` und Stagger-Delay für gestaffelte Bar-Animationen.

**Code/Daten:**

```tsx
const STAGGER_DELAY = 5;
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const bars = data.map((item, i) => {
  const delay = i * STAGGER_DELAY;
  const height = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });
  return <div style={{ height: height * item.value }} />;
});
```

**Implikation:**  
Stagger-Delay von 5 Frames pro Bar ist ein guter Startwert. Damping an gewünschte Geschwindigkeit anpassen.

---

### Skill-8: Word Highlighting

**Quelle:** `WordHighlight.md` + `text-animations.md` (Global Skill)

**Kontext/Erklärung:**  
Word Highlighting animiert einen Highlighter-Strich unter/über Wörtern synchron zum Voiceover. Nutzt `spring()` für smooth Animation.

**Code/Daten:**

```tsx
// Referenz: text-animations-word-highlight.tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

// Highlighter-Strich-Breite animieren
const progress = spring({
  frame,
  fps,
  delay: wordStartFrame,
  config: { damping: 15 },
});

<span
  style={{
    background: `linear-gradient(to right, yellow ${progress * 100}%, transparent ${progress * 100}%)`,
  }}
>
  {word}
</span>;
```

**Implikation:**  
Für TikTok-Style Captions und Marketing-Videos. Synchron mit Transkriptions-Zeitstempeln.

---

## 📗 C: RESEARCH_NOTE (Kontext & Hintergründe)

### Note-1: Virtual Production Paradigma

**Quelle:** `vision.md` (Context Kit)

**Kontext:**  
Viron ist ein "Virtual Production Studio" – softwarebasiert, das 3D-Objekte aus verschiedenen Perspektiven "abfilmt" und Websites als Texturen mapped. Deterministische Video-Ausgabe: identisches Rendering bei gleichen Eingaben.

**Implikation:**  
Viron ist NICHT traditionelles Video-Editing. Es ist "Video as Code" mit vollständiger Git-Versionierung.

---

### Note-2: Lamina Deprecation

**Quelle:** `viron-button-guide.md` (Zeilen 17-24)

**Kontext:**  
Lamina wurde im Juni 2025 archiviert und ist nicht mehr wartbar. Der Grund: "Architectural debt; unmaintainable hack layers". Ersatz: `three-custom-shader-material` (CSM).

**Implikation:**  
Alle Legacy-Code mit `<LayerMaterial>` muss migriert werden.

---

### Note-3: WebGPU Status (2026)

**Quelle:** `viron-button-guide.md` (Zeilen 26-30)

**Kontext:**  
WebGPU existiert in Three.js r171+, aber das Ecosystem ist NICHT READY. MeshTransmissionMaterial, Caustics und Postprocessing brechen auf WebGPU. Grund: Legacy shader chunks + `onBeforeCompile` Hacks.

**Implikation:**  
STAY ON WEBGL2 für Production. WebGPU frühestens H2 2026.

---

### Note-4: HDRI für Reflektionen

**Quelle:** `viron-button-guide.md` (Zeilen 622-649)

**Kontext:**  
Poly Haven Studio HDRIs empfohlen für Viron-Reflektionen. `blur={0.8}` verwenden, um scharfe Artefakte zu vermeiden.

**Empfohlen:**

- `studio_small_09_2k.exr` – Dark, clean reflections
- `studio_soft_01_2k.exr` – Diffuse softbox lighting
- `studio_tent_02_2k.exr` – Minimalist pure white

---

### Note-5: AI-Generierte Texturen (ComfyUI)

**Quelle:** `viron-button-guide.md` (Zeilen 335-437)

**Kontext:**  
ComfyUI Workflow für nahtlose, tileable Metall-Texturen. Verwendet Spinagon's `seamless-tiling` Node + Marigold für PBR-Maps.

**Prompt That Works:**

```
"Seamless PBR material, liquid chrome metal, iridescent bismuth oxide layer,
macro photography, 8k resolution, ultra detailed, studio lighting,
mirror-like reflections, no objects, no people, tiling texture"
```

---

### Note-6: Luma Dream Machine (Backdrops)

**Quelle:** `viron-button-guide.md` (Zeilen 441-485)

**Kontext:**  
Luma Labs Dream Machine für AI-generierte looping Video-Backdrops. 5-8 Sekunden Clips, dann FFmpeg zu WebM konvertieren.

**Prompt That Works:**

```
"Hyper-detailed cyberpunk alley, rain-slicked neon reflections,
volumetric fog, side-scrolling parallax, teal and magenta color grade,
loopable 8 second shot, no characters, high contrast, 35mm anamorphic"
```

---

## ❌ VERWORFEN (Redundant)

| Inhalt                        | Quelle   | Grund für Verwurf                             |
| ----------------------------- | -------- | --------------------------------------------- |
| `useCurrentFrame()` Basics    | Multiple | Bereits in `remotion-core/SKILL.md` Core Laws |
| `<ThreeCanvas>` vs `<Canvas>` | Multiple | Bereits in `remotion-core/SKILL.md` Core Laws |

---

## ⚠️ KONFLIKTE (Zur Prüfung)

| Quelle A                                                                     | Quelle B                                           | Widerspruch                | Empfehlung                                                                 |
| ---------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------- |
| `theme.md` Zeile 189 (Easing: `spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"`) | `remotion-core/SKILL.md` (`spring()` von Remotion) | CSS easing vs. JS spring() | **CSS easing nur für Web (Next.js), Remotion verwendet IMMER `spring()`.** |

---

## ❓ OFFENE FRAGEN

1. **Viron Theme auf 3D-Materialien:** Wie wird `THEME.colors.metallic` auf `MeshStandardMaterial` Properties gemapped? (roughness, metalness Werte fehlen im Theme)
2. **Mobile Performance Targets:** Sind Mobile-spezifische Settings für MeshTransmissionMaterial (8 samples, 512px) ausreichend oder brauchen wir ein Fallback ohne Refraktion?

---

## 📋 Empfehlungen für Orchestrator

| Priorität  | Aktion                                          | Begründung                                                                                                                  |
| ---------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 🔴 HOCH    | VERBOTE in `remotion-core/SKILL.md` integrieren | Die 3 Verbote (Tailwind Animations, Third-Party Charts, Opacity Typewriter) sollten als eigene Sektion in den Global Skill. |
| 🔴 HOCH    | Lamina-Migration prüfen                         | Falls Legacy-Code mit `<LayerMaterial>` existiert → CSM-Migration einplanen.                                                |
| 🟡 MITTEL  | Theme-Extension für 3D-Materials                | `THEME` um metallische PBR-Properties erweitern (roughness, metalness Default-Werte).                                       |
| 🟡 MITTEL  | Mobile Fallback für Transmission                | Dokumentierte Fallback-Strategie für Low-End Geräte (z.B. `MeshPhysicalMaterial` ohne Transmission).                        |
| 🟢 NIEDRIG | ComfyUI Workflow exportieren                    | Den JSON-Workflow aus viron-button-guide.md als separates Asset speichern.                                                  |

---

## 📝 Badge 4 Learnings

| Was                                                   | Warum                                                                               | Empfehlung                                                                      |
| :---------------------------------------------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| ✅ GATEKEEPER-Pflicht funktioniert                    | Context Kit gab mir das nötige Grundverständnis für Viron-Architektur.              | Beibehalten. Checkliste am Anfang des Reports ist wertvoll.                     |
| ✅ Verbote-Sektion prominent platziert                | Die 3 kritischen Verbote waren im Briefing klar markiert und leicht zu extrahieren. | Format beibehalten. VERBOTE immer zuerst dokumentieren.                         |
| ✅ Code-Blöcke mit Kontext                            | Jeder Code-Block hat Prosa-Erklärung und Implikation.                               | Qualitätsstandard für alle Reports.                                             |
| ❌ Vault-Dateien weniger relevant                     | Container Queries/View Transitions sind eher für Web als für Remotion-Video.        | Badge-Spezifizität im Briefing präzisieren: "Remotion-relevant" vs. "Web-only". |
| ❌ Pattern-Dateien (BarChart/WordHighlight) sehr kurz | Nur Referenz-Links, kaum eigener Content.                                           | Entweder vollständigen Code einbetten oder als "Pointer" markieren.             |

---

_Extraction Report v1.0 | Badge 4: Design System & UI | 2026-01-31_
