# Layout Patterns 03 – Modern CSS Masking & Compositing (2026)

## Konzept (ASCII Diagram)

```
OLD (2024): Canvas für komplexes Masking
  ├─ WebGL Shader schreiben
  ├─ Performance: Mittelmäßig
  └─ Code: Komplex & teuer

NEW (2026): CSS Masking & Blending
  ├─ Pure CSS (GPU-accelerated)
  ├─ Performance: Exzellent
  └─ Code: 10 Zeilen Masking-Magie
```

## Was ist das?

**CSS Masking & Compositing** (2026 Standard):
- Video/Bild in Text maskieren (z.B. Hero Text mit Video gefüllt)
- Blend-Modes für "Kino-Look" (multiply, overlay, screen)
- Vignette-Effekte, Gradients-Masking
- **Keine Canvas / WebGL nötig** – pure CSS, super schnell

---

## Variante 1: Video-Text Masking (Video in Text)

### Setup
- Video in `<div>` packen
- CSS `mask-image` mit Gradient/Shape/Text
- Text wird "Fenster" durch das Video

### Code (React + CSS)

```tsx
// components/TextVideoMask.tsx
export const TextVideoMask = () => {
  return (
    <div className="hero-section">
      <div className="text-video-mask">
        <video
          src="/background-video.mp4"
          autoPlay
          muted
          loop
          className="video"
        />
        <h1 className="masked-text">
          CREATE
          <br />
          VISUAL
          <br />
          MAGIC
        </h1>
      </div>
    </div>
  );
};
```

```css
/* TextVideoMask.css */

.hero-section {
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-video-mask {
  position: relative;
  width: 100%;
  height: 100%;
}

.text-video-mask .video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  /* KRITICAL: Maskiere mit Text-Shape */
  /* Erzeugt SVG-Mask basierend auf Text */
  -webkit-mask-image: url(#text-mask); /* Safari */
  mask-image: url(#text-mask);
  -webkit-mask-size: 100%;
  mask-size: 100%;
}

.masked-text {
  position: relative;
  z-index: 1;
  font-size: 120px;
  font-weight: bold;
  color: transparent;
  margin: 0;
  text-align: center;
  line-height: 1;

  /* Gradient Text als Fallback für Browser ohne SVG-Mask */
  background: linear-gradient(135deg, #00ff00, #0099ff);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Alternative: Grad Mask (einfacher, aber weniger präzise) */
.text-video-mask-alt .video {
  mask-image: radial-gradient(circle, transparent 30%, black 100%);
  mask-position: center;
  mask-size: 100%;
}
```

### Mit SVG-Mask (Präzise Text-Maske)

```html
<!-- SVG Mask Definition (invisible) -->
<svg width="0" height="0">
  <defs>
    <mask id="text-mask">
      <!-- Schwarzer Hintergrund -->
      <rect width="100%" height="100%" fill="black" />
      <!-- Weißer Text = "Fenster" durchs Video -->
      <text
        x="50%"
        y="50%"
        font-size="120"
        font-weight="bold"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="white"
      >
        CREATE
      </text>
    </mask>
  </defs>
</svg>
```

### Performance-Charakteristik
- **FPS:** 60 fps (GPU-accelerated)
- **Browser Support:** 85%+ (Chrome, Edge, Safari, Firefox)
- **Code Complexity:** Sehr einfach (vs. Canvas/WebGL)

---

## Variante 2: Blend-Modes für Kino-Look

### Setup
- `mix-blend-mode` auf Layer
- Verschiedene Modi erzeugen verschiedene "Kino-Effekte"
- Stapel mehrere Layers für komplexe Looks

### Code (React + CSS)

```tsx
// components/CinematicLayers.tsx
export const CinematicLayers = () => {
  return (
    <div className="cinematic-hero">
      {/* Base Layer: Video */}
      <video
        src="/base-video.mp4"
        autoPlay
        muted
        loop
        className="layer base"
      />

      {/* Multiply Layer: Dunkelheit */}
      <div className="layer darken" style={{ mixBlendMode: "multiply" }} />

      {/* Screen Layer: Highlight */}
      <div className="layer highlight" style={{ mixBlendMode: "screen" }} />

      {/* Overlay Layer: Drama */}
      <div className="layer overlay" style={{ mixBlendMode: "overlay" }} />

      {/* Color Dodge: Intensität */}
      <div className="layer intensity" style={{ mixBlendMode: "color-dodge" }} />

      {/* Content on Top */}
      <div className="content">
        <h1>Premium Visual Experience</h1>
        <p>Blended with cinematic techniques</p>
      </div>
    </div>
  );
};
```

```css
/* CinematicLayers.css */

.cinematic-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Base Video Layer */
.layer.base {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

/* Darken Layer (multiply) */
.layer.darken {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.4), rgba(0, 0, 0, 0.6));
  z-index: 2;
}

/* Highlight Layer (screen) */
.layer.highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at 30% 30%, rgba(255, 255, 100, 0.2), transparent);
  z-index: 3;
}

/* Overlay Layer */
.layer.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(100, 200, 255, 0.1), rgba(255, 100, 100, 0.1));
  z-index: 4;
}

/* Color Dodge (Intensität) */
.layer.intensity {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 50%;
  background: radial-gradient(circle, rgba(255, 200, 0, 0.3), transparent);
  z-index: 5;
}

/* Content on Top */
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  color: white;
}

.content h1 {
  font-size: 64px;
  margin: 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.content p {
  font-size: 20px;
  margin: 20px 0 0 0;
  opacity: 0.9;
}
```

### Blend-Mode Referenz

| Mode | Effect | Use Case |
|------|--------|----------|
| `multiply` | Dunkelheit (×) | Overlay verdunkeln |
| `screen` | Highlight (+) | Glows, Lichter |
| `overlay` | Kontrast-Boost | Drama, Spannung |
| `color-dodge` | Intensität | Neon, Energie |
| `lighten` | Hellste Pixel | Schichten kombinieren |
| `darken` | Dunkelste Pixel | Opaque Overlays |
| `hard-light` | Harsh Kontrast | Film Grain Look |

---

## Variante 3: Vignette + Gradient Masking

### Setup
- Radial Gradient Mask für Vignette-Effekt
- Kanten dunkeln, Mitte hell
- Perfekt für Focus auf Element

### Code

```tsx
// components/VignettedVideo.tsx
export const VignettedVideo = () => {
  return (
    <div className="vignette-container">
      <video src="/video.mp4" autoPlay muted loop className="video" />
      <div className="vignette-overlay" />
    </div>
  );
};
```

```css
/* VignettedVideo.css */

.vignette-container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  border-radius: 12px;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vignette-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Radial Gradient: Helles Zentrum, dunkle Kanten */
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.6) 100%
  );

  /* Optional: Vignette animieren */
  animation: vignette-pulse 3s ease-in-out infinite;
}

@keyframes vignette-pulse {
  0%, 100% {
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 40%,
      rgba(0, 0, 0, 0.3) 70%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
  50% {
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 70%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
}
```

---

## Performance-Tipps

### Tipp 1: Will-change für Mask-Animationen
```css
.video {
  -webkit-mask-image: url(#animated-mask);
  mask-image: url(#animated-mask);
  will-change: mask-image;
}
```

### Tipp 2: Fallback für alte Browser
```css
.video {
  /* Modern (2026) */
  mask-image: radial-gradient(...);

  /* Fallback: einfach opacity */
  opacity: 0.9;
}
```

### Tipp 3: Blend-Mode Stacking
```typescript
// ✅ Gut: 2–3 Blend-Layers
<div mix-blend-mode="multiply" />
<div mix-blend-mode="screen" />

// ❌ Teuer: 10+ Layers = Performance Hit
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Mask funktioniert nicht | `mask-image` URL falsch oder SVG nicht im DOM | Verify SVG ID matches |
| Video unsichtbar | Mask komplett schwarz | `fill="white"` für Fenster |
| Performance-Hit | Zu viele Blend-Modes | Reduzieren auf 2–3 Layers |
| Safari zeigt nix | `-webkit-` Prefix vergessen | Immer mit Prefix versehen |
| Mask ruckelt | Animation auf mask-image | Nutze `will-change` |

---

## Quellen

- CSS Masking (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Masking
- Mix Blend Mode (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
- SVG Masks (W3C): https://www.w3.org/TR/SVG/masking.html

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Intermediate–Advanced  
**Browser Support:** 90%+ (with fallbacks 100%)  
**ROI:** Extrem Hoch (Kino-Look ohne WebGL, 60 FPS, super einfach)