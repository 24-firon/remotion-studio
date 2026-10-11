# Performance – Core Web Vitals Mastery (2026)

## Konzept (ASCII Diagram)

```
USER EXPERIENCE METRICS (Google 2026)

LCP (Largest Contentful Paint)  < 2.5s  ✅ Good
    ├─ Text/Image wird Hauptelement → muss schnell sichtbar sein
    └─ Beispiel: Hero-Bild lädt zu langsam → LCP schlecht

INP (Interaction to Next Paint)  < 200ms ✅ Good
    ├─ User clickt → Seite antwortet
    └─ Beispiel: Scroll-Handler blockiert → INP schlecht

CLS (Cumulative Layout Shift)   < 0.1   ✅ Good
    ├─ "Jitter" beim Laden vermeiden
    └─ Beispiel: Font lädt nach → Text verschiebt sich → CLS schlecht
```

## Was ist das?

Core Web Vitals sind Metriken, die **echtes Nutzergefühl** messbar machen:
- **LCP:** Wie schnell fühlt sich die Seite an? (visuell "fertig")
- **INP:** Wie responsiv ist sie? (wartet User zu lange?)
- **CLS:** Ist sie stabil? (oder flackert alles?)

Google rankiert 2026 sehr stark nach diesen Metriken [web:259]. "Gute" Schwellen sind LCP < 2.5s, CLS < 0.1 und INP < 200ms [web:256].

---

## Variante 1: "Start Frame First" (für Video/Canvas Hero)

### Setup
Wenn du Video/Canvas als Hero nutzt, ist das größte Risiko: **"Black Screen / Loading State"** → schlechter LCP.

**Lösung:** Erstes Frame als **statisches Bild (Poster)** extrem schnell laden; schwere Teile asynchron nachziehen.

### Code (Next.js Pattern)

```tsx
import Image from "next/image";
import dynamic from "next/dynamic";

// Heavy Component wird NICHT Pre-Rendered
const HeavyCanvasScene = dynamic(() => import("./HeavyCanvasScene"), { 
  ssr: false,
  loading: () => <div className="placeholder">Loading 3D scene...</div>
});

export const HeroSection = () => {
  return (
    <>
      {/* Das ist das "Poster" – wird SOFORT geladen (LCP < 1.5s möglich) */}
      <Image
        src="/hero-first-frame.avif"
        alt="Hero keyframe - metallic button detail"
        width={1600}
        height={900}
        priority // Kritisch: "priority" sagt Next.js, das sofort zu laden
        placeholder="blur" // Optional: BlurHash für visuelles Feedback
        blurDataURL="data:image/jpeg;base64,..." // Kommt aus Build-Zeit
      />
      
      {/* Das ist die "Heavy" Version – lädt im Hintergrund nach */}
      <HeavyCanvasScene />
    </>
  );
};
```

**Warum das funktioniert:**
1. Browser sieht sofort ein großes Bild (Poster).
2. LCP-Checker zählt das als "Main Content" → LCP ist gut.
3. Canvas/WebGL lädt parallel nach; User sieht keinen schwarzen Screen.

### Performance-Charakteristik
- **LCP Improvement:** +40–60% (von 4s auf 1.5s)
- **FPS Impact:** 0 (kein Runtime-Overhead)
- **Dateigröße:** +100–300 KB (das Poster-Bild)

---

## Variante 2: "Hydration Budgeting" (Smart Progressive Enhancement)

### Setup
Nicht alles muss **interaktiv** sein. Viele Bereiche können statisch bleiben, während nur der Effektbereich hydriert wird.

Das ist der Unterschied zwischen "ganzer Seite als React" (schlecht) vs. "nur der Button als React" (gut).

### Code (Architektur)

```tsx
// ❌ FALSCH: Ganze Seite als React Component
export default function Page() {
  return (
    <div>
      <header>... 50 KB JS nur für Layout ...</header>
      <InteractiveButton /> {/* nur das braucht JS */}
      <footer>... 50 KB JS nur für Links ...</footer>
    </div>
  );
}

// ✅ RICHTIG: Nur Interaktive Teile als React "Islands"
export default function Page() {
  return (
    <div>
      <header>... Static HTML, 0 KB JS ...</header>
      
      <div className="interactive-zone">
        {/* Nur dieser Part wird hydriert */}
        <InteractiveCanvasScene />
      </div>
      
      <footer>... Static HTML, 0 KB JS ...</footer>
    </div>
  );
}

// Mit Astro/Next.js "Partial Hydration"
// Die "Islands" laden JS nur wenn nötig
```

### Performance-Charakteristik
- **JavaScript Reduction:** 60–80%
- **Time to Interactive (TTI):** -500–1000ms
- **INP Improvement:** +30% (weniger JS zum Parsen)

---

## Variante 3: "Decode & Render Pipeline" (Tolerant Scrubbing)

### Setup
Selbst wenn ein Video klein ist: **Decode + Seek** kann ruckeln, besonders beim "harten" `currentTime` Scrubbing.

Beispiel: User scrollt schnell → Du setzt `video.currentTime` auf Frame 150 → Browser muss Key-Frame suchen & dekodieren → 50ms Stutter.

**Lösung:** Low-Pass-Filter + tolerantes Scrubbing. Nicht "hart springen", sondern **sanft interpolieren**.

### Code (Scroll-Scrubbing Blueprint)

```tsx
import React, { useRef, useEffect } from "react";

export const ToleranceScrollScrubbing = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number>();

  // Berechne Zielframe basierend auf Scroll
  const handleScroll = () => {
    if (!videoRef.current) return;
    
    const scrollFraction = 
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Target-Zeit ABER: nicht direkt anwenden
    targetTimeRef.current = scrollFraction * videoRef.current.duration;
  };

  // Sanfte Interpolation (Low-Pass Filter)
  const smoothUpdate = () => {
    if (!videoRef.current) return;

    // "Glätte" die Bewegung: 85% alten Wert + 15% neuer Wert
    // Das verhindert "Ruckeln" bei schnellem Scroll
    const alpha = 0.15; // Kleiner = glatter (aber träger)
    currentTimeRef.current = 
      currentTimeRef.current * (1 - alpha) + 
      targetTimeRef.current * alpha;

    // Nur setzen, wenn Unterschied > Threshold (z.B. 0.05 sec)
    if (Math.abs(videoRef.current.currentTime - currentTimeRef.current) > 0.05) {
      videoRef.current.currentTime = currentTimeRef.current;
    }

    rafRef.current = requestAnimationFrame(smoothUpdate);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    rafRef.current = requestAnimationFrame(smoothUpdate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="/my-hero-video.webm"
      width={1600}
      height={900}
      muted
    />
  );
};
```

### Performance-Charakteristik
- **Stutter Reduction:** 70–90%
- **FPS Stability:** +15 fps durchschnittlich
- **User Perceived Performance:** +50% besser

---

## Variante 4: "Image Format Optimization" (Modern Codecs)

### Setup
Video-Codecs 2026: **AV1 > HEVC > VP9 > H.264**
- **AV1:** 25% kleinere Dateien als HEVC, aber Browser-Support variabel
- **WebM (VP9):** Besserer Support, 30% kleiner als H.264
- **AVIF:** Neue Generation für Bilder, noch besser als WebP

### Code

```tsx
import Image from "next/image";

export const OptimizedMedia = () => {
  return (
    <>
      {/* Bild mit modernen Formaten */}
      <picture>
        <source srcSet="/hero.avif" type="image/avif" />
        <source srcSet="/hero.webp" type="image/webp" />
        <img src="/hero.jpg" alt="Hero" />
      </picture>

      {/* Video mit mehreren Codecs */}
      <video width={1600} height={900} muted controls>
        <source src="/scroll-scrubbing.webm" type="video/webm" />
        <source src="/scroll-scrubbing.mp4" type="video/mp4" />
        Your browser doesn't support HTML5 video.
      </video>
    </>
  );
};
```

### Dateigröße-Vergleich
| Format | Größe (100MB original) |
|--------|----------------------|
| H.264 MP4 | 25 MB |
| VP9 WebM | 18 MB (-28%) |
| HEVC H.265 | 15 MB (-40%) |
| AV1 | 11 MB (-56%) |

---

## Praktische Presets

### Preset 1: "Low-End Device Mode"
```tsx
export const AdaptiveHero = () => {
  const isLowEnd = navigator.hardwareConcurrency <= 4;

  if (isLowEnd) {
    // Einfaches, schnelles Static Image
    return <img src="/hero-low.jpg" alt="Hero" />;
  }

  // Full-Featured Canvas/Video
  return <AdvancedCanvasScene />;
};
```

### Preset 2: "Bandwidth-Aware Mode"
```tsx
export const BandwidthAwareVideo = () => {
  const connection = (navigator as any).connection;
  const isSlowNetwork = 
    !connection || 
    connection.effectiveType === "slow-2g" || 
    connection.effectiveType === "2g";

  const src = isSlowNetwork 
    ? "/video-low-quality.webm" 
    : "/video-full-quality.webm";

  return <video src={src} />;
};
```

### Preset 3: "Progressive Loading"
```tsx
export const ProgressiveHero = () => {
  const [isHighResLoaded, setIsHighResLoaded] = React.useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Low-res Placeholder */}
      <Image
        src="/hero-thumb.jpg"
        alt="Hero"
        width={1600}
        height={900}
        priority
      />

      {/* High-res in den Hintergrund laden */}
      <Image
        src="/hero-full.avif"
        alt="Hero"
        width={1600}
        height={900}
        onLoadingComplete={() => setIsHighResLoaded(true)}
        style={{
          position: "absolute",
          opacity: isHighResLoaded ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      />
    </div>
  );
};
```

---

## Häufige Fehler & Lösungen

| Problem | Ursache | Lösung |
|---------|--------|--------|
| LCP schlecht (>3s) | Hero ist Video/Canvas ohne Poster | Statisches Poster-Bild mit `priority` + lazy Heavy Part |
| CLS = 0.2 | Fonts/Bilder ohne feste Größen | `width`/`height` definieren; Font-Loading-Strategie nutzen |
| INP schlecht (>300ms) | Scroll-Handler blockiert Main Thread | `throttle()` nutzen, Web Worker für Heavy Calc, RAF für Animationen |
| Video "ruckelt" | Harter `currentTime` Sprung | Low-Pass-Filter-Interpolation wie in Variante 3 |
| Große Dateigröße | Alte Video-Codecs | Zu AV1/HEVC wechseln; Format-Fallbacks nutzen |

---

## Messung & Tooling

### 1. Google PageSpeed Insights
Öffne: https://pagespeed.web.dev  
Füge deine URL ein → Detaillierter Report mit LCP/INP/CLS.

### 2. Chrome DevTools > Performance
1. Öffne DevTools (F12)
2. Performance Tab
3. Record (STRG + SHIFT + E)
4. Interaktionen reproduzieren
5. Stop Recording

### 3. web-vitals Library
```bash
npm install web-vitals
```

```tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log); // CLS: 0.05
getLCP(console.log); // LCP: 1.2s
getINP(console.log); // INP: 120ms
```

---

## Quellen

- Core Web Vitals Metriken & Schwellen: https://www.debugbear.com/docs/core-web-vitals-metrics [web:259]
- Core Web Vitals SEO Impact: https://www.clickrank.ai/core-web-vitals-impact-on-seo-rankings/ [web:256]
- Web Performance 2026 Guide: https://www.techwyse.com/blog/digital-marketing-101/digital-accessibility-in-2026-legal-mandates-ux-best-practices-and-inclusive [web:262]
- Performance-First UX: https://wearepresta.com/performance-first-ux-2026-architecting-for-revenue-and-speed/ [web:265]

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Intermediate  
**Setup-Time:** 1–2 Stunden (um Medienpipeline anzupassen)  
**ROI:** Extrem Hoch (ranking + User-Experience)