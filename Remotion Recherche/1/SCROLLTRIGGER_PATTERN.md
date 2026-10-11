# ScrollTrigger Pattern: Narrative Flow & Precision Animation

**Status:** Interaction Blueprint | **Version:** 2.0 | **Gültig ab:** 13. Januar 2026  
**Abhängigkeiten:** GSAP 3.12 + ScrollTrigger Plugin / Next.js 16.1 / React 19  
**Synergien:** GPU Guard, Mobile-First, Performance Monitoring

---

## 🎯 KERNKONZEPT: "Scroll erzählt die Geschichte"

ScrollTrigger ist nicht nur Animation. Es ist ein **narratives Werkzeug**, das dem Nutzer das Gefühl gibt, dass die Seite auf seinen Scroll reagiert [web:299][web:302].

### Der Psychologische Effekt

```
Nutzer scrollt ↓
  ↓
Sichtbarkeit eines Elements ändert sich
  ↓
GSAP ScrollTrigger erkennt es (< 16ms)
  ↓
Animation startet synchron zum Scroll
  ↓
"Buttery smooth" 60fps
  ↓
Nutzer sieht Seite als "reaktiv" und "lebendig"
```

---

## 🛠️ DIE VOLLSTÄNDIGE ARCHITEKTUR

### 1. Das React 19 Lifecycle-Pattern

```tsx
// components/ScrollReveal.tsx
'use client'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // ✅ gsap.context() isoliert Instanzen
    const ctx = gsap.context(() => {
      // Baseline: Startzustand
      gsap.set(".reveal-item", {
        opacity: 0,
        y: 50,
        // will-change wird automatisch hinzugefügt
      });

      // Animation: Triggered beim Scrollen
      gsap.to(".reveal-item", {
        scrollTrigger: {
          trigger: containerRef.current,      // Das Element, das triggert
          start: "top 80%",                   // Animiert wenn Top 80% des Viewports erreicht
          end: "top 20%",                     // Animation endet wenn Top 20% erreichtt
          scrub: false,                       // Nicht scrub-basiert (= nicht synchron zum Scroll)
          toggleActions: "play none none reverse", // Replay bei Scroll up
          once: false,                        // Can trigger multiple times
          markers: false,                     // Debug-Marker (dev only)
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,                       // Sequentiell: 150ms Abstand
      });

    }, containerRef);

    // ✅ CLEANUP ist kritisch (verhindert Memory Leaks)
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-16">
      <div className="reveal-item">
        <h2 className="text-3xl">USP 1</h2>
      </div>
      <div className="reveal-item">
        <h2 className="text-3xl">USP 2</h2>
      </div>
      <div className="reveal-item">
        <h2 className="text-3xl">USP 3</h2>
      </div>
    </div>
  );
}
```

### 2. Das Scrub-Pattern (Synchrone Scroll-Animation)

```tsx
// components/Parallax.tsx - Muster 3
export function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,                  // 1 = 1 Sekunde Nachlauf (smoothing)
          onUpdate: (self) => {
            // Callback: Wird bei jedem Scroll aufgerufen
            console.log('Scroll Progress:', self.progress);
          },
        },
        y: 200,                       // 200px nach unten während Scrollen
        opacity: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div ref={imageRef} className="w-full h-screen object-cover">
        {/* Diese Div scrollt langsamer als der Rest (Parallax) */}
      </div>
    </div>
  );
}

// Effekt: "Parallax" Feeling → User scrolled, Image bewegt sich langsamer
```

### 3. Das Batching-Pattern (Performance für viele Elemente)

```typescript
// ❌ FALSCH (100 einzelne ScrollTrigger = CPU-Last)
gsap.to(".card", {
  scrollTrigger: {
    trigger: ".card", // Separate Trigger für jede Card!
  },
  // ... 100x!
});

// ✅ RICHTIG (Batched = 1 ScrollTrigger für alle)
gsap.utils.toArray<HTMLElement>(".card").forEach((card) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
    },
  });
});

// ✅ OPTIMAL (ScrollTrigger.batch())
ScrollTrigger.batch(".card", {
  onEnter: (batch) => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
    });
  },
  onLeave: (batch) => {
    gsap.set(batch, { opacity: 0, y: 50 }); // Reset
  },
});
```

---

## 📱 MOBILE OPTIMIZATION

ScrollTrigger auf Mobile ist gefährlich (CPU-intensive). Viron-Standard:

```typescript
// components/SmartScrollTrigger.tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    if (isMobile) {
      // Mobile: Einfache Fade-In ohne ScrollTrigger
      gsap.to(".reveal-item", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      });
    } else {
      // Desktop: Full ScrollTrigger Experience
      gsap.to(".reveal-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
      });
    }
  }, containerRef);

  return () => ctx.revert();
}, []);
```

---

## 🎨 ADVANCED: Custom Easing Functions

```typescript
// components/EasingPlayground.tsx
import { Power1, Back, Elastic } from 'gsap';

gsap.to(".element", {
  scrollTrigger: { trigger: ".element", start: "top 80%" },
  y: 0,
  opacity: 1,
  duration: 1,
  
  // Verschiedene Easing-Funktionen:
  ease: "power1.out",     // Linear → schnell deceleration
  ease: "power3.inOut",   // Smooth S-curve
  ease: "back.out",       // Overshoots dann returns (playful)
  ease: "elastic.out",    // Spring-like (modern web feel)
  ease: "circ.inOut",     // Circular (engineering feel)
});
```

---

## 🚨 HÄUFIGE FEHLER

### Fehler 1: ScrollTrigger ohne Cleanup
```typescript
// ❌ FALSCH (Memory Leak)
useEffect(() => {
  gsap.to(".element", {
    scrollTrigger: { trigger: ".element" },
    // ...
  });
  // ctx.revert() fehlt!
}, []);

// ✅ RICHTIG
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".element", {
      scrollTrigger: { trigger: ".element" },
    });
  }, containerRef);
  
  return () => ctx.revert(); // Cleanup!
}, []);
```

### Fehler 2: Zu viele ScrollTriggers
```typescript
// ❌ FALSCH (jeder Scroll-Event kann teuer sein)
gsap.to(".item", {
  scrollTrigger: { trigger: ".item" },
  // Applied to 500 items = 500 ScrollTrigger instances!
});

// ✅ RICHTIG
ScrollTrigger.batch(".item", {
  onEnter: (batch) => gsap.to(batch, { /* ... */ }),
  batchSize: 10, // Optimiert für Browser
});
```

---

## 🔗 SYNERGIEN MIT ANDEREN LEARNINGS

### 1. **GPU Guard** (file:314)
ScrollTrigger darf nur `opacity` + `transform` animieren. Alles andere = Jank.

```typescript
// ✅ RICHTIG (GPU-safe)
gsap.to(".element", {
  scrollTrigger: { /* ... */ },
  opacity: 1,  // OK
  y: 100,      // OK (transform)
  scale: 1.1,  // OK (transform)
});

// ❌ FALSCH
gsap.to(".element", {
  scrollTrigger: { /* ... */ },
  height: 200, // Reflow!
  top: "100px", // Layout shift!
});
```

### 2. **Mobile-First** (file:13)
ScrollTrigger auf Mobile deaktivieren, einfache Animations nutzen.

### 3. **LCP Optimization** (file:323)
ScrollTrigger startet erst beim Scrollen → blockiert nicht die LCP-Phase.

---

## ✅ VIRON CHECKLIST

- [ ] Alle ScrollTrigger nutzen `gsap.context()` mit Cleanup
- [ ] Nur `opacity` + `transform` werden animiert (kein Layout!)
- [ ] Mobile-Geräte nutzen Fallback (keine ScrollTrigger)
- [ ] `ScrollTrigger.batch()` für 5+ Elemente
- [ ] Chrome DevTools: Nur grüne "Composite" Bars beim Scroll
- [ ] k6 Test: 60fps während ScrollTrigger-Animationen (p95)
- [ ] Lighthouse Performance: >= 90

---

**Dokument Version:** 2.0 | **Erstellt:** 13. Januar 2026 | **Status:** Production Ready  
**Nächste Review:** Q2 2026 (GSAP 3.13 mit neuen ScrollTrigger Features)
