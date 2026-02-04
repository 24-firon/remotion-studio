# Layout Patterns 02 – View Transitions in Remotion (Shared Element Transitions)

## Konzept (ASCII Diagram)

```
OLD (2024): Scene Wechsel hart
  Scene A     Scene B
    ↓           ↓
  [Fade]  →  [Fade]
  
  Result: User merkt nicht, dass es die gleiche Element ist

NEW (2026): View Transitions API Level 2
  Scene A          Scene B
    ↓                ↓
  [Element] -morph→ [Element]
  [Button]  -move→  [Button]
  
  Result: Flüssig, intuitiv, "wauw" Effekt
```

## Was ist das?

**View Transitions API** (Level 2, jetzt 2026 stabil):
- Automatische morphing zwischen Elementen über Szene-Grenzen hinweg
- Ohne JavaScript-Libraries wie Framer Motion
- **Perfekt für Remotion:** Szenen-Wechsel sehen kino-Like aus

---

## Variante 1: Shared Element Transition (CSS/React)

### Setup
- Element mit `view-transition-name: unique-id;`
- Trigger Transition beim State-Change
- Browser berechnet Morph automatisch

### Code (React Blueprint)

```tsx
// components/VideoPlayer.tsx
import { useState } from "react";
import styles from "./VideoPlayer.module.css";

export const VideoPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    // Trigger View Transition
    if (!document.startViewTransition) {
      // Fallback für alte Browser
      setIsExpanded(true);
      return;
    }

    document.startViewTransition(() => {
      setIsExpanded(true);
    });
  };

  return (
    <div className={styles.container}>
      {isExpanded ? (
        // Fullscreen Player
        <div className={styles.playerFullscreen}>
          <video
            src="/video.mp4"
            autoPlay
            controls
            className={styles.videoExpanded}
            style={{
              viewTransitionName: "video-element", // ← CRITICAL
            }}
          />
          <button onClick={() => setIsExpanded(false)}>Close</button>
        </div>
      ) : (
        // Thumbnail Player
        <div className={styles.playerThumbnail}>
          <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            className={styles.videoThumb}
            style={{
              viewTransitionName: "video-element", // ← SAME ID
            }}
          />
          <button onClick={handleExpand}>Expand</button>
        </div>
      )}
    </div>
  );
};
```

```css
/* VideoPlayer.module.css */

/* Thumbnail State */
.playerThumbnail {
  width: 300px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.videoThumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Fullscreen State */
.playerFullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.videoExpanded {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* View Transition Animation (automatic, aber wir können customisieren) */
::view-transition-old(video-element) {
  animation: fade-out 0.4s ease-out;
}

::view-transition-new(video-element) {
  animation: fade-in 0.4s ease-in;
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.1);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Performance-Charakteristik
- **Browser Support:** 75%+ (Chrome 111+, Edge, Opera; Safari 17.2+)
- **Fallback:** Smooth (ohne Transition, sofort wechsel)
- **FPS:** 60 fps (GPU-accelerated)

---

## Variante 2: Multi-Element Transition (Complex Layouts)

### Setup
- Mehrere Elemente mit unterschiedlichen `view-transition-name` IDs
- Jedes Element morph unabhängig
- Koordiniert sieht es aber aus wie eine Choreographie

### Code (React + Remotion-Style Scene Switching)

```tsx
// components/SceneTransition.tsx
import { useState } from "react";

interface Scene {
  id: string;
  title: string;
  description: string;
  color: string;
}

const scenes: Scene[] = [
  { id: "scene-1", title: "Hero", description: "Main intro", color: "#A6FF00" },
  { id: "scene-2", title: "Features", description: "What we offer", color: "#0099FF" },
  { id: "scene-3", title: "CTA", description: "Call to action", color: "#FF6B6B" },
];

export const SceneTransition = () => {
  const [currentScene, setCurrentScene] = useState(0);

  const handleSceneChange = (nextIndex: number) => {
    if (!document.startViewTransition) {
      setCurrentScene(nextIndex);
      return;
    }

    document.startViewTransition(() => {
      setCurrentScene(nextIndex);
    });
  };

  const scene = scenes[currentScene];

  return (
    <div style={{ height: "100vh", background: scene.color }}>
      {/* Title morphs between scenes */}
      <h1
        style={{
          viewTransitionName: "scene-title", // ← Gemeinsamer Name
          padding: 40,
          margin: 0,
          fontSize: 64,
        }}
      >
        {scene.title}
      </h1>

      {/* Description morphs */}
      <p
        style={{
          viewTransitionName: "scene-description",
          padding: "0 40px",
          fontSize: 20,
        }}
      >
        {scene.description}
      </p>

      {/* Buttons morphen auch */}
      <div
        style={{
          display: "flex",
          gap: 20,
          padding: 40,
          viewTransitionName: "scene-controls",
        }}
      >
        <button onClick={() => handleSceneChange((currentScene - 1 + scenes.length) % scenes.length)}>
          ← Prev
        </button>
        <button onClick={() => handleSceneChange((currentScene + 1) % scenes.length)}>
          Next →
        </button>
      </div>
    </div>
  );
};
```

### Performance-Charakteristik
- **Koordination:** ⭐⭐⭐⭐⭐ (Alle Elemente sync morphen)
- **CPU Load:** Minimal (GPU macht die Arbeit)
- **Smoothness:** 60 fps guaranteed (wenn Browser unterstützt)

---

## Variante 3: Cross-Document View Transitions (Navigation)

### Setup
- Zwischen unterschiedlichen Seiten/Routes
- Browser merkt: "Dieses Element auf Seite A = dieses auf Seite B"
- Automatically morph beim Navigate

### Code (Next.js Navigation Blueprint)

```tsx
// app/layout.tsx
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          <Link href="/home" style={{ viewTransitionName: "page-content" }}>
            Home
          </Link>
          <Link href="/portfolio" style={{ viewTransitionName: "page-content" }}>
            Portfolio
          </Link>
          <Link href="/contact" style={{ viewTransitionName: "page-content" }}>
            Contact
          </Link>
        </nav>

        <main style={{ viewTransitionName: "page-content" }}>
          {children}
        </main>
      </body>
    </html>
  );
}

// app/home/page.tsx
export default function HomePage() {
  return (
    <div style={{ viewTransitionName: "hero" }}>
      <h1>Welcome to Home</h1>
      <p>This page transitions smoothly from other routes</p>
    </div>
  );
}

// app/portfolio/page.tsx
export default function PortfolioPage() {
  return (
    <div style={{ viewTransitionName: "hero" }}>
      <h1>Portfolio</h1>
      <p>Projects and case studies</p>
    </div>
  );
}
```

### Performance-Charakteristik
- **Navigation Speed:** Keine Verzögerung (Transition läuft parallel)
- **Network Friendly:** Keine extra Payload
- **Browser Support:** 70%+ (mit graceful degradation)

---

## Performance-Tipps

### Tipp 1: Transition Duration kontrollieren
```css
/* Schneller Transition (300ms) */
::view-transition-old(*) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(*) {
  animation: fade-in 0.3s ease-in;
}

/* Für Einzelnes Element langsamer */
::view-transition-old(hero) {
  animation: fade-out 0.6s ease-out;
}
```

### Tipp 2: Nur bestimmte Elemente transitionen
```typescript
// ✅ RICHTIG: Nur wichtige Elemente
style={{ viewTransitionName: "hero-video" }}

// ❌ FALSCH: Alles transitionen = Performance Hit
{/* Nicht auf jedem Element! */}
```

### Tipp 3: Reduced Motion Support
```typescript
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced) {
  // Skip Transition, nur instant wechsel
  setCurrentScene(nextIndex);
} else {
  // Mit Transition
  document.startViewTransition(() => {
    setCurrentScene(nextIndex);
  });
}
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Transition funktioniert nicht | `viewTransitionName` IDs stimmen nicht überein | Exakt gleiche ID auf beide Elements |
| Transition ruckelt | Zu viele Elemente haben `viewTransitionName` | Nur auf wichtigen Elementen nutzen |
| Browser zeigt nix | Browser unterstützt nicht | Graceful Fallback: instant wechsel |
| Animation zu schnell/langsam | Timing nicht optimiert | `duration` in CSS keyframes anpassen |

---

## Quellen

- View Transitions API (MDN): https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
- Shared Element Transitions (Web.dev): https://web.dev/shared-element-transitions/
- Browser Support: https://caniuse.com/view-transitions

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Intermediate  
**Browser Support:** 80%+ (graceful fallback)  
**ROI:** Sehr Hoch (Ultra-smooth Navigation, wow factor)