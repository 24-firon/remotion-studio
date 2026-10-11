# GPU Guard & GSAP: Die Performance-Architektur der Transform-Only Animation

**Status:** Production Blueprint | **Version:** 2.0 | **Gültig ab:** 13. Januar 2026  
**Abhängigkeiten:** Next.js 16.1 / React 19 / Tailwind 4.1 / GSAP 3.12  
**Synergien:** CLS-Prevention, LCP-Optimization, Mobile-First, Error Boundaries

---

## 🎯 KERNKONZEPT: Der Compositor Layer als die einzige Wahrheit

GPU Guard ist **nicht** nur eine Regel, sondern eine architektonische Entscheidung, die direkt auf die **Browser Rendering Pipeline** abbildet.

### Die 4-Phasen Rendering Pipeline (Chrome/Safari/Firefox 2026)

Jeder Frame durchläuft diese Sequenz:

```
1. STYLE COMPUTATION (Main Thread)
   └─ CSS berechnen, Spezifität auflösen
   
2. LAYOUT CALCULATION (Main Thread, TEUER)
   └─ Position & Größe aller Boxen: top, left, width, height, margin, padding
   └─ Kinder-Elemente neu-berechnen (Reflow-Kaskade)
   └─ **KOSTET:** 10-100ms pro Frame bei größeren DOMs
   
3. PAINT (Main Thread, TEUER)
   └─ Pixels für jede Box zeichnen
   └─ background-color, border-color, box-shadow, text-shadow
   └─ **KOSTET:** 5-50ms pro Frame
   
4. COMPOSITE (GPU Thread, BILLIG)
   └─ Layers auf dem Screen zusammensetzen
   └─ transform, opacity, filter (Hardware-Accelerated)
   └─ **KOSTET:** 0.5-2ms pro Frame
```

**GPU Guard = Alles muss in Phase 4 laufen.**

---

## 🔴 ABSOLUTES VERBOT (Layout-Triggering)

Diese Properties verursachen **Reflow + Repaint + Composite** (phases 2-4):

```javascript
// ❌ ABSOLUT VERBOTEN in Animationen
gsap.to(".element", {
  top: "20px",           // Layout-Change → Reflow
  left: "30px",          // Layout-Change → Reflow
  width: "200px",        // Layout-Change → Reflow
  height: "100px",       // Layout-Change → Reflow
  margin: "16px",        // Layout-Change → Reflow
  padding: "20px",       // Layout-Change → Reflow
  fontSize: "24px",      // Layout-Change → Reflow (Text!)
  lineHeight: "1.5",     // Layout-Change → Reflow
  border: "2px solid",   // Layout-Change → Reflow
  display: "flex",       // Layout-Change → Reflow
  position: "absolute",  // Layout-Change → Reflow
  backgroundColor: "#f0f0f0", // Paint-only (besser, aber nicht ideal)
});
```

**Symptome bei Verletzung:**
- DevTools Performance-Tab zeigt **lange gelbe "Layout" Balken**
- FPS-Meter fällt von 60fps auf 15-30fps
- Mobile-Geräte sperren aus (CPU-Thermal throttling)
- Jitter/Stutter in der Animation sichtbar

---

## ✅ GPU Guard konforme Properties (Phase 4 Only)

### Transform (Das Powerhaus)

```javascript
gsap.to(".element", {
  // Translate (verschiebt ohne Layout-Change)
  x: 100,              // transform: translateX(100px)
  y: 50,               // transform: translateY(50px)
  xPercent: -50,       // transform: translateX(-50%)
  yPercent: 0,
  
  // Scale (vergrößert ohne Layout-Change)
  scale: 1.2,          // transform: scale(1.2)
  scaleX: 0.8,
  scaleY: 1.1,
  
  // Rotate (dreht ohne Layout-Change)
  rotation: 45,        // transform: rotate(45deg)
  rotationX: 90,       // Perspective-3D
  rotationY: 45,       // Perspective-3D
  
  // Skew (verzerrt ohne Layout-Change)
  skewX: 10,           // transform: skewX(10deg)
  skewY: -5,
});
```

**Warum es so schnell ist:**
- GSAP berechnet alle Transform-Werte als **separate Composite Layer**
- Browser kann diese Layers als GPU-Textur cacen
- Jede neue Frame: nur Transform-Matrix multiplizieren (GPU-Operation)
- Keine DOM-Recalculation nötig

### Opacity (Die Durchsichtigkeit)

```javascript
gsap.to(".element", {
  opacity: 0,    // 0 = vollständig transparent
  opacity: 1,    // 1 = vollständig sichtbar
  opacity: 0.5,  // Alle Zwischenwerte erlaubt
});
```

**Warum es schnell ist:**
- Ändert nur die Alpha-Channel der bereits gerasterisierten Texture
- Kein Reflow, kein Repaint nötig
- Pure GPU-Operation

### Filter (Vorsicht: CPU-intensive Varianten)

```javascript
// ⚠️ Begrenzt, nur einfache Filter:
gsap.to(".element", {
  filter: "blur(5px)",       // Bedingt OK (GPU-accelerated auf WebKit)
  filter: "brightness(1.1)", // OK (GPU)
  filter: "contrast(1.2)",   // OK (GPU)
  filter: "saturate(1.5)",   // OK (GPU)
  // Kombinierte Filter können teuer werden
  filter: "blur(10px) brightness(1.2) saturate(2)", // ⚠️ Nur für nicht-critical paths
});
```

---

## 🏗️ DAS VIRON PATTERN: ScrollTrigger + GPU Guard

### Szenario: Hero-Section mit staggered Reveal (Muster 3)

```tsx
// components/HeroSection.tsx
'use client'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // GPU Guard: gsap.context isoliert die Instanz (Cleanup!)
    const ctx = gsap.context(() => {
      // Baseline: Alle Elemente starten unsichtbar & nach oben verschoben
      gsap.set(".hero-item", {
        opacity: 0,
        y: 50,
      });

      // Animation: Scrolltrigger startet wenn Top 80% des Viewports erreicht
      gsap.to(".hero-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          once: false, // Kann mehrfach triggern
        },
        opacity: 1,      // ✅ Phase 4 (Composite)
        y: 0,            // ✅ Phase 4 (Transform)
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,   // Sequentiell mit 150ms Abstand
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup: Entfernt alle GSAP-Listener
  }, []);

  return (
    <div ref={containerRef} className="hero-section">
      <h1 className="hero-item text-4xl">Viron Mastery</h1>
      <p className="hero-item text-lg">Build for the future</p>
      <button className="hero-item btn-primary">Start Now</button>
    </div>
  );
}
```

**CSS Baseline (MUSS da sein!):**
```css
.hero-item {
  /* Startzustand vor Animation */
  opacity: 0;
  transform: translateY(50px);
  /* will-change Hint für Browser */
  will-change: transform, opacity;
}

/* Für mobile: deaktiviere schwere ScrollTrigger */
@media (max-width: 768px) {
  .hero-item {
    will-change: auto; /* Spart RAM auf Mobile */
  }
}
```

---

## 🚨 HÄUFIGE FEHLER & LÖSUNGEN

### Fehler 1: Position via `top`/`left` statt `transform`

```javascript
// ❌ FALSCH (Jank-Horror)
gsap.to(".card", {
  top: "100px",
  left: "50px",
  duration: 1,
});
// Ergebnis: Jedes Frame muss Layout neu berechnet werden

// ✅ RICHTIG
gsap.to(".card", {
  x: 100,  // translateX
  y: 50,   // translateY
  duration: 1,
});
// Ergebnis: 60fps, keine Jank
```

### Fehler 2: Width/Height animieren statt Scale

```javascript
// ❌ FALSCH
gsap.to(".box", {
  width: "200px",
  height: "100px",
  duration: 0.5,
});
// Layout Shift möglich + CLS-Risiko

// ✅ RICHTIG
gsap.to(".box", {
  scale: 1.5,
  duration: 0.5,
  transformOrigin: "center center",
});
// Zero Layout Shift, pure GPU
```

### Fehler 3: `will-change` überall verwenden

```javascript
// ❌ FALSCH (Memory Leak)
gsap.set(".element", { willChange: "transform, opacity" });
// ... viel später, kein Cleanup
// Browser behält Layer im VRAM, bis die Seite neulädt

// ✅ RICHTIG (mit Context)
const ctx = gsap.context(() => {
  gsap.set(".element", { willChange: "transform, opacity" });
  // ... Animation ...
}, containerRef);

return () => ctx.revert(); // Cleanup entfernt willChange automatisch
```

---

## 📊 DEBUGGING: Chrome DevTools Rendering Tab

### Step-by-Step Performance-Validierung

```
1. DevTools öffnen (F12)
2. Performance Tab → Click "Record"
3. Seite scrolle / Animationen triggern
4. Stop Recording
5. Schaue auf "Rendering" Diagramm:
   - GRÜN = Composite (GPU)
   - GELB = Paint (CPU)
   - ROT = Layout (CPU, teuer!)
```

**Viron-Standard:**
- Deine Animationen sollen **nur Grün** zeigen
- Wenn Gelb/Rot auftauchen → Refactor notwendig

### Mobile-Spezifischer Check

```javascript
// In DevTools Console:
// Drosselung simulieren (CPU 4x langsamer wie billiges Telefon)
// DevTools → Performance Tab → Settings → CPU Throttling → 4x slowdown

// Dann k6 Load Test mit scrollenden Clients laufen:
// "Wenn unter CPU-Drosselung immer 60fps → Production-ready"
```

---

## 🔗 SYNERGIEN MIT ANDEREN LEARNINGS

### 1. **CLS Prevention** (file:316)
GPU Guard Animations können **niemals** CLS verursachen, da keine Layout-Changes möglich sind.
- `transform` ändert die **Render-Box**, nicht die **Layout-Box**
- Dadurch sind Viron-Seiten sicher bei CLS < 0.05 (ultra-elite)

### 2. **LCP Optimization** (file:323)
Während der LCP-Phase (erste 2.5s) sind **keine ScrollTrigger-Animationen aktiv**:
- ScrollTrigger startet erst, wenn User scrollt
- Hero-Animations starten bei `start: "top 80%"`
- Kritischer Pfad wird nicht blockiert

### 3. **Server Actions** (file:319)
Wenn eine Server Action fehlschlägt (error.tsx), können wir das **mit GPU-Guard animieren**:
```javascript
gsap.to(".error-banner", {
  opacity: 1,  // ✅ GPU-safe
  y: 0,        // ✅ GPU-safe
  // Nutzer sieht sofort Fehlermeldung, 60fps smooth
});
```

### 4. **Mobile-First Architecture** (file:13)
Auf Mobile deaktivieren wir **automatisch** ScrollTrigger bei `< 768px`:
```javascript
// In ScrollTrigger Konfiguration:
if (window.innerWidth < 768) {
  gsap.to(".element", {
    opacity: 1,
    y: 0,
    duration: 0.4, // Schnellere, einfachere Animation
    // Kein ScrollTrigger, kein scrub, keine Komplexität
  });
}
```

---

## 🎓 MASTERCLASS: Transform-Matrix Verstehen

GSAP kompiliert alle `transform` Werte in eine **4x4 Matrix**:

```
transform: translateX(100px) scale(1.2) rotate(45deg)
↓ Wird kompiliert zu:
[1.2, 0, 0, 0]
[0, 1.2, 0, 0]
[0, 0, 1, 0]
[100, 0, 0, 1]
```

**Der Browser lädt diese Matrix auf die GPU**, und in jedem Frame wird **nur diese Matrix neu berechnet** (Millisekunden).

**Warum `top` so teuer ist:**
```
top: 100px
↓ Browser muss:
1. Alle Child-Elemente des Parents neu-berechnen
2. Ihre Größe könnte sich ändern (kaskadierender Reflow)
3. Alle nachfolgenden Elemente neu-positionieren
4. Neu-rendern
= **100-1000ms Latenz möglich**
```

---

## ✅ VIRON CHECKLIST: Vor jedem Deploy

- [ ] DevTools Rendering-Tab: **Nur Grün** bei Scroll-Animationen
- [ ] ScrollTrigger nutzt `top 80%`, nicht `top center`
- [ ] `gsap.context()` mit Cleanup in `return () => ctx.revert()`
- [ ] Mobile: `will-change` nur auf Geräten > 768px
- [ ] Keine `width`/`height`/`margin` in GSAP-Animationen
- [ ] k6 Load Test: p95 < 500ms auch während Scroll-Animationen
- [ ] Lighthouse Performance: >= 95, CLS < 0.05

---

**Dokument Version:** 2.0 | **Erstellt:** 13. Januar 2026 | **Status:** Production Validated  
**Nächste Review:** Q2 2026 (GSAP 3.13 Release)
