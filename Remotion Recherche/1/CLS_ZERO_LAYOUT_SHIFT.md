# CUMULATIVE LAYOUT SHIFT (CLS): Zero Layout Shift Guide für Viron

**Status:** Learning Document | **Zielgruppe:** Frontend Developers | **Kritikalität:** 🔴 BLOCKING (Lighthouse Penalty)

---

## WAS IST CLS? (Die unmissverständliche Version)

### Das Problem in 30 Sekunden:
Du besuchst eine Website. Die Seite beginnt zu laden. Du siehst einen Text und willst auf einen Link klicken. **Im exakten Moment, wenn du draufklickst, wird der Link 200px nach unten verschoben**, weil oben ein Bild lazy-loaded wird.

**Das ist schlechtes CLS.**

Das wird gemessen. Und es **bestraft dich hart** in Google Suche (Ranking-Factor seit 2021).

---

## DIE METRIK

**CLS Score: 0 bis ∞ (theoretisch unbegrenzt, praktisch 0-10)**

### Interpretation:
- **0 = Perfekt** (Gar keine Shifts)
- **< 0.1 = Gut** (Google's grüner Bereich, Lighthouse 90+)
- **0.1 - 0.25 = Meh** (Orange, Needs Work)
- **> 0.25 = Schlecht** (Rot, SEO-Penalty)

### Wie wird CLS berechnet?

```
CLS = Σ (impact fraction × distance fraction) für alle unerwarteten Shifts

impact fraction = Anteil des Viewports, der sich verschoben hat
distance fraction = Wie weit (in % des Viewports) sich der Shift bewegt hat

Beispiel:
- Element nimmt 75% der Viewport-Höhe ein
- Shift um 10% des Viewports (nach unten)
- CLS-Beitrag = 0.75 × 0.1 = 0.075
```

---

## DIE HÄUFIGSTEN VERURSACHER

### 1️⃣ IMAGES / VIDEOS OHNE EXPLIZITE DIMENSIONEN (THE KILLER)

**❌ FALSCH:**
```jsx
<img src="/hero.jpg" alt="Hero" />
```
Browser weiß nicht, wie groß das Bild wird. Erst wenn es geladen ist, wird der Raum "reserviert". **Alles darunter springt nach unten.**

CLS-Impact: **0.3 - 0.5** ⚠️

**✅ RICHTIG:**
```jsx
// Option 1: Next.js Image (Auto aspect-ratio)
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={630}
  // Next.js berechnet automatisch aspect-ratio
  // CSS: aspect-ratio: 1200 / 630
/>

// Option 2: Manuelles aspect-ratio
<img 
  src="/hero.jpg" 
  alt="Hero"
  style={{ aspectRatio: '16 / 9' }} // oder className
/>

// Option 3: CSS-basiert (Best für Responsive)
<div className="aspect-video">
  <img src="/hero.jpg" alt="Hero" />
</div>
```

**Tailwind 4.1 Shorthand:**
```html
<div class="aspect-video">
  <img src="/hero.jpg" alt="Hero" />
</div>
```

CLS-Impact nach Fix: **0 (keine Shifts!)**

---

### 2️⃣ WEB FONTS LADEN SPÄTER ALS TEXT

**Das Problem:** Browser zeigt Text in Fallback-Font (System-Font). Headline ist 40px groß. Dann kommt dein echtes Webfont. Die Headline wird jetzt 36px. **Text springt um 4px.**

Wäre für ein Element egal. Aber **multipliziert über 100 Elemente** → CLS von 0.15-0.3.

**❌ FALSCH:**
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: auto; /* Default: Wait bis Font lädt */
}

h1 { font-family: 'Inter', sans-serif; }
```

Browser-Verhalten: `[1-3 Sekunden warten] → Text in Fallback → Font kommt → Text springt`

CLS-Impact: **0.2 - 0.4**

**✅ RICHTIG:**
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap; /* WICHTIG! */
  /* Zeige sofort Fallback, ersetze wenn Font kommt */
}

h1 { font-family: 'Inter', sans-serif; }
```

Alternative (noch besser): **Preload das Font im HTML:**
```html
<link 
  rel="preload" 
  href="/fonts/inter.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
/>
```

CLS-Impact nach Fix: **0.01 - 0.05** ✅

---

### 3️⃣ LAZY-LOADED CONTENT OHNE RESERVED SPACE

**Das Problem:** Advertising, Embeds (YouTube), oder dynamische Module laden nach dem Viewport.

**❌ FALSCH:**
```jsx
function AdBanner() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 2000);
  }, []);
  
  return isVisible ? <div className="ad-container">...</div> : null;
}
```

Nach 2 Sekunden erscheint der Ad-Container. **Alles darunter springt nach unten.**

CLS-Impact: **0.15 - 0.3**

**✅ RICHTIG:**
```jsx
function AdBanner() {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    setTimeout(() => setContent(<Ad />), 2000);
  }, []);
  
  return (
    // WICHTIG: Reservierte Höhe, egal ob geladen oder nicht
    <div className="ad-container min-h-[250px]">
      {content}
    </div>
  );
}
```

**Oder mit `aspect-ratio`:**
```jsx
<div className="w-full aspect-video">
  {/* Video lädt hier hinein, aber Raum ist bereits reserviert */}
  {videoReady && <iframe src="..." />}
</div>
```

CLS-Impact nach Fix: **0 (Raum war immer reserviert!)**

---

### 4️⃣ ANIMATIONS MIT `top`, `height`, `width` (DIE SÜNDE)

**Das Problem:** Du animierst mit GSAP:
```javascript
// ❌ SÜNDE
gsap.to(".element", {
  top: "-10px",      // Verändert Layout-Position!
  height: "0",       // Verändert Höhe!
  duration: 0.5,
});
```

Jede Frame verursacht **Layout-Recalculation** (Reflow). Das ist nicht nur CLS-gefährlich, es ist **super langsam** (Jank).

CLS-Impact: **0.05 - 0.2 pro Animation**

**✅ RICHTIG (GPU-Accelerated):**
```javascript
// Nur transform + opacity (GPU-Safe)
gsap.to(".element", {
  opacity: 0,        // GPU ✅
  y: -10,            // Transform: translateY() ✅
  scale: 0.95,       // Transform: scale() ✅
  duration: 0.5,
});
```

**Das ist der "GPU Guard" aus CORE_RULES.md.**

CLS-Impact: **0 (keine Layout-Änderungen!)**

---

### 5️⃣ DYNAMISCHE FORM-FELDER (Progressive Disclosure Problem)

**Das Problem:** Du zeigst progressiv Form-Felder an (Muster 1 aus Elite Patterns). Aber du berechnest die Höhe nicht vorab.

**❌ FALSCH:**
```jsx
function Form() {
  const [stage, setStage] = useState(0);
  
  return (
    <div>
      {stage >= 0 && <EmailField />}
      {stage >= 1 && <CompanyField />}  {/* Plötzlich da! Shift! */}
      {stage >= 2 && <UseCaseField />}
    </div>
  );
}
```

Jedes neue Feld macht den Form "taller". **Alles darunter springt**.

CLS-Impact: **0.2 - 0.4 (pro neuem Feld)**

**✅ RICHTIG (Reserve Space):**
```jsx
function Form() {
  const [stage, setStage] = useState(0);
  
  return (
    <div>
      {/* Email - immer sichtbar */}
      <div className="min-h-[60px]">
        <EmailField />
      </div>
      
      {/* Company - reservierter Raum */}
      <div className="min-h-[60px] overflow-hidden">
        {stage >= 1 && <CompanyField />}
      </div>
      
      {/* UseCase - reservierter Raum */}
      <div className="min-h-[60px] overflow-hidden">
        {stage >= 2 && <UseCaseField />}
      </div>
    </div>
  );
}
```

Oder mit Tailwind 4.1 Slots:

```jsx
<div className="space-y-4">
  <div data-slot="email" className="min-h-[60px]">
    <EmailField />
  </div>
  <div data-slot="company" className="min-h-[60px]">
    {stage >= 1 && <CompanyField />}
  </div>
  <div data-slot="usecase" className="min-h-[60px]">
    {stage >= 2 && <UseCaseField />}
  </div>
</div>
```

CLS-Impact nach Fix: **0 (Raum war immer da!)**

---

## 🛠️ DEBUGGING: Wie findest du CLS-Probleme?

### 1. Chrome DevTools (Real-Time Detection)

```
1. DevTools öffnen (F12)
2. Performance Tab → Record
3. Seite "normal" laden + scrollen
4. Stop Recording
5. Unten nach "Layout Shifts" suchen → GELBE Balken = CLS
```

**Screenshot:** Der gelbe Balken zeigt genau wo + wann der Shift passiert ist.

### 2. Lighthouse Audit (Automatisiert)

```bash
# Im Terminal
pnpm lighthouse

# Oder: DevTools → Lighthouse → Run Audit
```

Output:
```
Layout Shifts
Potential CLS-causing elements:
- <Image /> at line 45 (width not specified)
- <iframe /> at line 89 (no aspect-ratio)
```

### 3. web-vitals Library (Monitoring in Production)

```typescript
// app/layout.tsx
import { getCLS } from 'web-vitals';

export function reportWebVitals() {
  getCLS((metric) => {
    console.log('CLS:', metric.value);
    
    if (metric.value > 0.1) {
      // Send to monitoring service
      fetch('/api/metrics', {
        method: 'POST',
        body: JSON.stringify({
          metric: 'CLS',
          value: metric.value,
          entries: metric.entries, // Zeigt welche Elemente
        }),
      });
    }
  });
}
```

### 4. Chrome DevTools → "Show Layout Shift Regions"

```
DevTools → Rendering Tab → Check "Show Layout Shift Regions"
→ Laden Seite neu
→ Shifts werden rot highlights
```

---

## VIRON-SPEZIFISCHES CLS-CHECKLIST

Vor jedem Deploy:

- [ ] **Alle Images:** `<Image />` oder `width + height` attribut
- [ ] **Alle Iframes:** `aspect-ratio` CSS oder Tailwind `aspect-video`
- [ ] **Alle Web Fonts:** `font-display: swap` in @font-face
- [ ] **Dynamische Module:** `min-height` oder `aspect-ratio` reserviert
- [ ] **Animations:** Nur `opacity` + `transform` (GSAP GPU Guard)
- [ ] **Ad-Container:** Mindestens `min-h-[250px]` reserviert
- [ ] **Progressive Forms:** Alle möglichen Felder pre-allocated

### Test vor Deploy:
```bash
# Lighthouse CI
pnpm lighthouse
# CLS Target: < 0.1 (Green)

# Web Vitals in DevTools
# Performance → Record → Check for yellow "Layout Shift" bars
```

---

## REAL-WORLD BEISPIEL: Progressive Disclosure Form (Aus Muster 1)

### Das richtige Setup:

```tsx
// components/ProgressiveForm.tsx
'use client'

import { useState, useTransition } from 'react';
import { submitForm } from '@/app/actions/form-actions';

export function ProgressiveForm() {
  const [stage, setPending] = useState(0);
  const [isPending, startTransition] = useTransition();
  
  const handleNext = () => {
    startTransition(() => {
      setPending(stage + 1);
    });
  };
  
  return (
    <form className="space-y-6 max-w-md">
      {/* Stage 1: Email (immer sichtbar) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="your@email.com"
          required
        />
      </div>
      
      {/* Stage 2: Company (reservierter Space) */}
      <div className="space-y-2 min-h-[72px]">
        {stage >= 1 && (
          <>
            <label className="block text-sm font-medium">Company</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Acme Inc."
              required
            />
          </>
        )}
      </div>
      
      {/* Stage 3: UseCase (reservierter Space) */}
      <div className="space-y-2 min-h-[72px]">
        {stage >= 2 && (
          <>
            <label className="block text-sm font-medium">Use Case</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>Recruiting</option>
              <option>Sales</option>
              <option>Support</option>
            </select>
          </>
        )}
      </div>
      
      {/* CTA Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={isPending || stage >= 2}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {stage >= 2 ? 'Submit' : 'Next'}
      </button>
    </form>
  );
}
```

**Warum das CLS-safe ist:**
1. ✅ Jedes Feld hat `min-h-[72px]` (reserviert)
2. ✅ Der Button bleibt an derselben Position
3. ✅ Neue Felder erscheinen **im reservierten Raum**
4. ✅ **CLS = 0** (kein Shift möglich)

---

## ZUSAMMENFASSUNG: DIE 5-PUNKT-REGEL FÜR ZERO CLS

| # | Regel | Beispiel |
|---|-------|---------|
| 1 | **Images:** Immer width + height | `<Image width={1200} height={630} />` |
| 2 | **Fonts:** `font-display: swap` | `@font-face { font-display: swap; }` |
| 3 | **Lazy Content:** Reserviere Raum | `<div class="min-h-[250px]">...</div>` |
| 4 | **Animations:** Nur transform + opacity | `gsap.to(el, { opacity: 0, y: -10 })` |
| 5 | **Dynamic Content:** Pre-allocate | `<div class="min-h-[60px]">{content}</div>` |

**One Rule to Rule Them All:**
> Wenn Inhalte laden, springt nichts. Punkt. CLS = 0.

---

## RESOURCES FÜR TIEFER GRABEN

- **Google CLS Guide:** https://web.dev/cls/
- **MDN Web Vitals:** https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift
- **Chrome DevTools CLS Debugging:** DevTools → Performance → Record → Look for yellow bars

---

**Dokument Version:** 1.0 | **Gültig ab:** Januar 13, 2026 | **Status:** Production Ready
