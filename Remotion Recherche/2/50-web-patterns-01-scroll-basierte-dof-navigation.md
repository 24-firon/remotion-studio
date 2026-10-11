# Scroll-basierte DoF Navigation – Fokus-Lenkung beim Scrollen

## Konzept: Scroll-gesteuerte Schärfe-Navigation

Der Nutzer scrollt durch eine Landingpage, und der **Fokuspunkt des Depth-of-Field-Effekts** wandert automatisch zu den wichtigen Content-Abschnitten. Der Rest der Seite verschwimmt sanft, während die aktuelle Section scharf und prominent bleibt – eine subtile, aber wirkungsvolle Blicklenkung.

```
┌─────────────────────────────────┐
│   HERO (Fokus hier)             │ ← Scharf, 100% opacity
│   - Blur: 0px                   │
│   - Scale: 100%                 │
└─────────────────────────────────┘
         ↓ User scrollt
┌─────────────────────────────────┐
│   HERO (Unscharfer Hintergrund) │ ← Blur: 8px, 70% opacity
│   - Blur: 8px                   │
│   - Scale: 98%                  │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│   FEATURE 1 (Fokus hier)        │ ← Scharf, 100% opacity
│   - Blur: 0px                   │
│   - Scale: 100%                 │
└─────────────────────────────────┘
```

## Variante 1: CSS `filter: blur()` + Einfaches Scroll-Listener (Leichtgewicht)

### Setup

```html
<!-- HTML -->
<main>
  <section class="section hero-section">
    <h1>Hero Headline</h1>
    <p>Wichtigste Nachricht</p>
  </section>
  
  <section class="section feature-section">
    <h2>Feature 1</h2>
    <p>Detaillierte Erklärung</p>
  </section>
  
  <section class="section feature-section">
    <h2>Feature 2</h2>
    <p>Weitere Features</p>
  </section>
</main>
```

### CSS

```css
.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* GPU-Beschleunigung für Blur-Animation */
  will-change: filter, opacity, transform;
  transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Default: Out-of-focus */
.section {
  filter: blur(8px);
  opacity: 0.7;
  transform: scale(0.98);
}

/* In-focus: Scharf */
.section.in-focus {
  filter: blur(0px);
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

/* Optional: Brightness-Gradient für noch mehr Tiefe */
.section:not(.in-focus) {
  filter: blur(8px) brightness(0.85);
}

.section.in-focus {
  filter: blur(0px) brightness(1);
}
```

### JavaScript

```javascript
// Konfiguration
const FOCUS_THRESHOLD = window.innerHeight * 0.4; // Fokus-Zone = mittlere 20%

// Intersection Observer (performanter als Scroll-Listener)
const observerOptions = {
  threshold: [0, 0.25, 0.5, 0.75, 1],
  rootMargin: `-${FOCUS_THRESHOLD}px 0px -${FOCUS_THRESHOLD}px 0px`
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Section ist im Fokus-Bereich, wenn intersectionRatio > 0.5
    if (entry.intersectionRatio > 0.5) {
      entry.target.classList.add('in-focus');
    } else {
      entry.target.classList.remove('in-focus');
    }
  });
}, observerOptions);

// Alle Sections observieren
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});
```

**Performance:** ⚡⚡⚡ (sehr günstig)  
**Browser-Support:** ✅ Alle modernen Browser  
**Look:** ⭐⭐ (uniform blur, aber effektiv)

---

## Variante 2: Radial-Gradient Blur-Mask (Hybrid CSS)

Diese Variante erzeugt einen **radialen Fokuspunkt** – die Mitte ist scharf, die Kanten blur sich gradually.

### CSS mit `mask-image`

```css
.section {
  position: relative;
  will-change: filter, mask-image;
  transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Out-of-focus: Radiale Blur-Maske */
.section:not(.in-focus) {
  opacity: 0.75;
  filter: blur(12px);
}

/* Radiale Maske: Mitte transparent (zeigt sharp), Kanten schwarz (blur) */
.section:not(.in-focus)::before {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(12px);
  mask-image: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    transparent 20%,
    rgba(0, 0, 0, 0.3) 50%,
    black 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* In-focus: Keine Maske */
.section.in-focus::before {
  display: none;
}

.section.in-focus {
  filter: blur(0px);
  opacity: 1;
  transform: scale(1);
}
```

**Visueller Effekt:**
```
        Focus Point (scharf)
               ▼
        ┌──────○──────┐
        │  CLEAR    │
        │ ╱────────╲  │
        │╱  Gradient ╲ │
        │╲ zu Blur  ╱ │ ← Blur nimmt von innen nach außen zu
        │ ╲────────╱  │
        │  BLURRY   │
        └───────────┘
```

**Performance:** ⚡⚡ (etwas teurer wegen `backdrop-filter` + `mask-image`)  
**Look:** ⭐⭐⭐ (echter Tiefeneffekt, ähnlich Kamera-DoF)

---

## Variante 3: WebGL Echtes DoF mit React-Three-Fiber (High-End)

Wenn du ein **echtes 3D-DoF-Rendering** brauchst (z.B. mit tatsächlichen Bokeh-Kreisen).

### React Component

```typescript
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { Html } from '@react-three/drei';

const ScrollDoFScene = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef([]);
  
  // Berechne, welche Section im Fokus ist
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      const focusThreshold = window.innerHeight * 0.4;
      
      sections.forEach((section, idx) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < focusThreshold && rect.bottom > focusThreshold) {
          // Section ist im Fokus
          const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
          setScrollProgress(Math.min(progress, 1));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <EffectComposer>
          <DepthOfField
            focusDistance={0.3 + scrollProgress * 0.4}  // Animiert von 0.3 zu 0.7
            focalLength={0.015}
            bokehScale={8}
          />
        </EffectComposer>
      </Canvas>
      
      {/* Content über WebGL-Layer */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Sections */}
      </div>
    </>
  );
};
```

**Performance:** ⚡ (expensive, 0.5-1.5s/Frame je nach Hardware)  
**Look:** ⭐⭐⭐⭐⭐ (echtes fotografisches DoF)

---

## Variante 4: Hybrid-Smart (Empfohlen für Production)

Kombiniert alle drei: Startet mit CSS, fällt bei Bedarf zurück.

```javascript
// Feature Detection
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)');
const supportsMaskImage = CSS.supports('mask-image', 'radial-gradient(circle, black, white)');
const isHighPerf = navigator.hardwareConcurrency >= 8;

let mode = 'simple'; // Default

if (supportsMaskImage && !isHighPerf) {
  mode = 'radial'; // Variante 2: Gut aussehend, aber nicht zu teuer
} else if (isHighPerf) {
  mode = 'webgl'; // Variante 3: Full Power
}

// Apply mode
document.documentElement.setAttribute('data-dof-mode', mode);
```

```css
/* CSS nach Mode */
[data-dof-mode="simple"] .section:not(.in-focus) {
  filter: blur(8px);
}

[data-dof-mode="radial"] .section:not(.in-focus)::before {
  backdrop-filter: blur(12px);
  mask-image: radial-gradient(...);
}

[data-dof-mode="webgl"] .section {
  /* WebGL übernimmt das Rendering */
}
```

---

## Praktische Implementierung mit Navigation

```javascript
// Scroll-Spy Navigation mit DoF-Fokus
const navItems = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.scroll-section');

navItems.forEach((item, idx) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = sections[idx];
    
    // Sanft zum Fokuspunkt scrollen
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'center' // Section in der Mitte des Viewports
    });
  });
});

// Update Navigation State
const updateNav = () => {
  const scrollPos = window.scrollY + (window.innerHeight * 0.4);
  
  sections.forEach((section, idx) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      navItems.forEach(n => n.classList.remove('active'));
      navItems[idx].classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateNav);
updateNav(); // Initial call
```

---

## Accessibility & Reduced Motion

```javascript
// Respektiere Nutzer-Präferenzen
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  document.documentElement.setAttribute('data-dof-mode', 'none');
}
```

```css
/* Kein Blur bei reduced motion, nur Opacity */
@media (prefers-reduced-motion: reduce) {
  .section {
    filter: none;
    transition: opacity 0.3s ease;
  }
  
  .section:not(.in-focus) {
    opacity: 0.8;
  }
}
```

---

## Performance-Optimierung

```javascript
// Lazy-Disable DoF bei Battery Saver / Low Power
if (navigator.getBattery) {
  navigator.getBattery().then(battery => {
    if (battery.level < 0.2 || !battery.charging) {
      document.body.classList.add('battery-saver-mode');
    }
  });
}
```

```css
.battery-saver-mode .section {
  /* Kein Blur, nur einfache Opacity */
  filter: none !important;
}
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Blur laggt beim Scrollen | `will-change` fehlt | Füge `will-change: filter, transform` hinzu |
| Fokus wechselt zu oft | Threshold zu niedrig | Erhöhe `FOCUS_THRESHOLD` auf `window.innerHeight * 0.5` |
| Radial-Maske sieht falsch aus | `backdrop-filter` Support fehlt | Nutze Fallback zu Variante 1 |
| WebGL bricht ab | GPU nicht genug Memory | Nutze Adaptive Quality (siehe nächstes Modul) |

---

## Quellen

- [CSS filter Property](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)
- [Prefers Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
