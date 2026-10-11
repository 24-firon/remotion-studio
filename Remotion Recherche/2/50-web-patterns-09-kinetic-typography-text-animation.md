# Web Patterns 09 – Kinetic Typography & Text Animation Mastery

## Konzept (ASCII Diagram)

```
TEXT ANIMATION SPECTRUM (2026)

Static (0ms) → CSS Transitions (300ms) → JS Animations (800ms) → Remotion (Frames)
    ↓              ↓                        ↓                        ↓
Boring         Smooth         Ultra-Smooth + Sync     Kino-Ready Video
```

## Was ist das?

Kinetic Typography = **Text, das lebt und atmet**.

Das ist mehr als Fade-in/Slide-in. Das ist:
- **Letter-by-letter** sequencing
- **Glyphs morphing** zwischen Formen
- **Rhythm synced** zu Audio
- **Perspective 3D** Rotationen
- **Tracking & Kerning** Animationen

Perfekt für: Hero Headlines, Musik-Videos, Branding, Storytelling.

---

## Variante 1: CSS-only (Schnell, aber begrenzt)

### Setup
- Pure CSS + `animation-delay` für Staggering
- Optimal für einfache "Letter-by-Letter" Effekte
- Performance: ✅ 60 FPS (GPU-accelerated)

### Code (React + CSS)

```tsx
import React from "react";

const LetterStaggerCSS = ({ text = "HELLO" }) => {
  return (
    <div className="letter-stagger">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{
            "--char-index": i,
          } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default LetterStaggerCSS;
```

```css
.letter-stagger {
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  display: flex;
  gap: 0.2em;
}

.letter {
  display: inline-block;
  animation: fadeInScale 600ms ease-out forwards;
  /* Delay = Index * 100ms */
  animation-delay: calc(var(--char-index, 0) * 100ms);
  transform-origin: center;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.3) rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .letter {
    animation: fadeIn 300ms ease-out forwards;
    animation-delay: 0;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
}
```

### Performance-Charakteristik
- **Setup:** 5 Min
- **FPS:** 60 (GPU-accelerated)
- **File Size:** ~2 KB CSS
- **Browser Support:** 95%+

---

## Variante 2: GSAP (Production-Grade Animation Library)

### Setup
- GSAP ist der **Industry-Standard** für Text-Animation
- Timeline-basiert (wie in After Effects)
- Vollständige Kontrolle über Timing + Easing

### Code (React + GSAP)

```bash
npm install gsap
```

```tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const GSAPKineticText = ({ text = "KINETIC" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Timeline erstellen
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Anfangszustand: Alle Buchstaben versteckt
    gsap.set(charsRef.current, {
      opacity: 0,
      y: 20,
      rotationX: -90,
    });

    // Letter-by-Letter animation mit Stagger
    tl.to(
      charsRef.current,
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.4, // Total 400ms für alle Letters
          from: "start", // Start from beginning
        },
      },
      0 // Start at timeline position 0
    );

    // Halt auf letztem Buchstaben
    tl.to(
      charsRef.current[charsRef.current.length - 1],
      {
        scale: 1.2,
        duration: 0.3,
        ease: "elastic.out(1.2)",
      },
      "-=0.2" // Überlappen mit vorherigem
    );

    // Pulse-Effekt für den ganzen Text
    tl.to(
      charsRef.current,
      {
        textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
        duration: 0.5,
      },
      "-=0.3"
    );

    return () => tl.kill(); // Cleanup
  }, []);

  return (
    <div ref={containerRef} style={{ fontSize: "4rem", fontWeight: "bold" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) charsRef.current[i] = el;
          }}
          style={{ display: "inline-block", perspective: "1000px" }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};
```

### Performance-Charakteristik
- **Setup:** 15 Min (Timeline erstellen)
- **FPS:** 60 (GPU-accelerated, wenn 3D transforms)
- **File Size:** +30 KB (GSAP Library)
- **Kreativität:** 95/100

---

## Variante 3: Shader-basierte Text (Ultra-Advanced)

### Setup
- Custom WebGL Shader für Glyph-Morphing
- Pixel-perfect, extreme Performance
- Für Pro-Level Kino-Looks

### Code (Three.js + Custom Shader)

```glsl
// vertex.glsl
uniform float uTime;
uniform sampler2D uGlyphTexture;

varying vec2 vUv;
varying float vDistortion;

void main() {
  vUv = uv;
  
  // Glyph ID encoded in vertex color
  float glyphId = color.r * 255.0;
  
  // Distortion wave basierend auf Glyph-Position
  vDistortion = sin(glyphId * 0.1 + uTime * 2.0) * 0.3;
  
  // Position mit Distortion
  vec3 pos = position;
  pos.y += vDistortion;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

```glsl
// fragment.glsl
uniform sampler2D uGlyphTexture;
uniform vec3 uColor;

varying vec2 vUv;
varying float vDistortion;

void main() {
  vec4 tex = texture2D(uGlyphTexture, vUv);
  
  // Smooth transition basierend auf Distortion
  float alpha = smoothstep(0.0, 0.5, vDistortion);
  
  vec3 finalColor = uColor * (1.0 + vDistortion * 0.5);
  
  gl_FragColor = vec4(finalColor, tex.a * alpha);
}
```

### Performance-Charakteristik
- **Setup:** 2–3 Stunden
- **FPS:** 60–120 (WebGL optimized)
- **File Size:** +500 KB (Three.js)
- **Browser Support:** 90%+ (WebGL 2.0)

---

## Variante 4: Remotion (Video Export)

### Setup
- **Beste für:** Video-Export mit perfektem Timing
- **Synchronisierung:** mit Audio, anderen Elementen

### Code (Remotion)

```tsx
import { Composition } from "remotion";
import { KineticTextComposition } from "./KineticText";

export const KineticTextVideo = () => {
  return (
    <Composition
      id="kinetic-text"
      component={KineticTextComposition}
      durationInFrames={300} // 5 Sekunden @ 60fps
      fps={60}
      width={1920}
      height={1080}
      defaultProps={{
        text: "KINETIC TYPOGRAPHY",
        audioFile: "/audio.mp3",
      }}
    />
  );
};

// scenes/KineticText.tsx
import { useCurrentFrame, interpolate } from "remotion";

export const KineticTextComposition = ({ text, audioFile }) => {
  const frame = useCurrentFrame();

  // Nutze Remotion's Frame-basierte Animation
  const startFrame = 0;
  const endFrame = 150; // 2.5 Sekunden

  // Jeder Buchstabe mit eigenem Delay
  const letters = text.split("").map((char, i) => {
    const charStartFrame = startFrame + i * 8; // Jeder Buchstabe 8 frames später
    const charEndFrame = charStartFrame + 40;

    const opacity = interpolate(
      frame,
      [charStartFrame, charEndFrame],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const scale = interpolate(
      frame,
      [charStartFrame, charEndFrame],
      [0.3, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const rotation = interpolate(
      frame,
      [charStartFrame, charEndFrame],
      [90, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity,
          transform: `scale(${scale}) rotateY(${rotation}deg)`,
          transition: "none",
        }}
      >
        {char}
      </span>
    );
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "5rem",
        fontWeight: "bold",
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        color: "white",
        perspective: "1000px",
      }}
    >
      {letters}
    </div>
  );
};
```

### Performance-Charakteristik
- **Setup:** 30 Min
- **Export:** 1–5 Min (je nach Länge)
- **Qualität:** 4K möglich
- **Perfect Sync:** 100%

---

## Praktische Presets

### Preset 1: "Hero-Title Stagger"
```tsx
// Alle 4 Varianten mit diesem Preset:
- Start: 0 (sofort)
- Dauer: 600ms (schnell und dynamisch)
- Easing: "back.out" (bounce-effect)
- Stagger-Verzögerung: 80ms pro Buchstabe
- Reduced Motion: → CSS-only Fade
```

### Preset 2: "Audio-Sync (Musik-Video)"
```tsx
// Nur Remotion oder GSAP-Sync zu Beat:
- BPM detecten (z.B. 120 BPM = 500ms per Beat)
- Letter-Animation an Beat-Timing ausrichten
- Pulse-Effekte sync zu "kick" Samples
```

### Preset 3: "3D Perspective"
```css
/* Alle Letters in 3D-Raum */
perspective: 1000px;
transform: rotateX(45deg) rotateY(-30deg);
```

---

## Häufige Fehler & Lösungen

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Text flickert | Animation-Verzögerung unregelmäßig | `--char-index * exactDelay` nutzen |
| Keine Reduced Motion | `prefers-reduced-motion` ignoriert | `@media (prefers-reduced-motion: reduce)` immer definieren |
| "Holprig" wirkend | Easing-Kurve nicht gut gewählt | "back.out" oder "elastic.out" probieren (nicht "linear") |
| 3D Transform ruckelt | GPU-Rendering nicht aktiv | `will-change: transform` oder `transform: translateZ(0)` |
| Audio nicht sync | Frame-Offset berechnet falsch | Audio-Frame genau berechnen: `sample / sampleRate * fps` |

---

## Quellen

- GSAP Docs: https://greensock.com/docs/
- WebGL Text Rendering: https://threejs.org/examples/webgl_canvas_texture
- Remotion Animation API: https://www.remotion.dev/docs/use-current-frame

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Intermediate  
**Setup-Time:** 30–60 Min  
**ROI:** Sehr Hoch (visuelle Impact)