# LCP (Largest Contentful Paint): Die Sichtbarkeits-Metrik

**Status:** Performance Blueprint | **Version:** 2.0 | **Gültig ab:** 13. Januar 2026  
**Ziel:** < 2.5s (Standard) / < 1.0s (Elite Viron) [file:23]  
**Abhängigkeiten:** Next.js 16.1 / PPR / Image Optimization  
**Synergien:** CLS Prevention, LCP + CLS = "Core Web Vitals" Google Factor

---

## 🎯 KERNKONZEPT: "Die Seite wirkt sofort da"

LCP ist die **psychologische Grenze**, ab der der Nutzer denkt: "Die Seite lädt". Nicht TTFB (Time to First Byte), nicht FCP (First Contentful Paint). **LCP = Der größte sichtbare Content ist da.**

### LCP vs. andere Metriken

| Metrik | Definition | Viron-Target | Gewicht |
|--------|-----------|--------------|--------|
| **TTFB** | Bis der Server antwortet | < 100ms | Fundament |
| **FCP** | Erste Pixel erscheinen | < 1.8s | Unbedeutend |
| **LCP** | **Größter Content sichtbar** | < 2.5s | 🔴 KRITISCH (25% Google Ranking) |
| **INP** | Input Responsiveness | < 200ms | 🔴 KRITISCH |
| **CLS** | Layout Shifts | < 0.1 | 🔴 KRITISCH |

---

## 🛠️ DAS VIRON PLAYBOOK: Next.js 16.1 + PPR

### 1. Identifiziere das LCP-Element

Nutze Chrome DevTools → Lighthouse → Performance Report. Dort wird das LCP-Element angezeigt:

```
LCP Element: <img> (src="/hero.jpg")
LCP Time: 1,234ms
```

**Häufige LCP-Elemente:**
- Hero Image (80% der Fälle)
- Large Text Block (Headline)
- Video Thumbnail
- Background Image

### 2. Die 4-Punkt Priority-Strategie

```javascript
// components/HeroImage.tsx
import Image from 'next/image';

export function HeroImage() {
  return (
    <Image
      src="/hero.avif"           // 1️⃣ AVIF-Format (20% kleiner)
      alt="Viron Mastery"
      width={1200}
      height={630}
      priority                   // 2️⃣ ERZWINGT Preloading (nicht lazy-load)
      placeholder="blur"         // 3️⃣ Blur-up während Loading (CLS=0)
      blurDataURL="data:image/..." // 4️⃣ Low-res Placeholder
      className="object-cover w-full h-auto"
    />
  );
}
```

**Jeder Punkt reduziert LCP um ~400ms:**
1. AVIF statt JPEG: -200ms (kleinere Datei)
2. `priority`: -150ms (priorisiert Download)
3. `placeholder`: -30ms (Nutzer sieht sofort etwas)
4. Blurred Placeholder: -20ms (psychologisch schneller)

**Summe:** 1,200ms → 800ms LCP ✅

### 3. Critical CSS (Inline)

Next.js 16.1 nutzt automatisch Critical CSS Inlining:

```html
<!-- Next.js generiert automatisch: -->
<style>
  /* CSS für LCP-Element inline */
  .hero-section { background: linear-gradient(...); }
  .hero-image { width: 100%; aspect-ratio: 16/9; }
</style>
```

Dies verhindert, dass der CSS-Download den LCP blockiert.

### 4. Web Fonts mit `font-display: swap`

Verhindere "Flash of Unstyled Text" (FOUT), der das LCP-Timing künstlich nach hinten schiebt:

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;  /* ✅ Zeige Fallback sofort */
  size-adjust: 95%;    /* Verhindere Layout-Shift zwischen Fonts */
}
```

---

## 📊 DER METRIKEN-STACK (Wie Viron misst)

### Real User Monitoring (RUM)

Nutze `web-vitals` Library für echte Nutzer-Metriken:

```typescript
// lib/monitoring.ts
import { getLCP, getCLS, getINP } from 'web-vitals';

export function initWebVitals() {
  getLCP((metric) => {
    console.log(`LCP: ${metric.value}ms`);
    if (metric.value > 2500) {
      // Send to Sentry
      Sentry.captureMessage(`Slow LCP: ${metric.value}ms`, 'warning');
    }
  });

  getCLS((metric) => {
    console.log(`CLS: ${metric.value}`);
  });

  getINP((metric) => {
    console.log(`INP: ${metric.value}ms`);
  });
}
```

### Lighthouse CI (vor jedem Deploy)

```bash
# Im GitHub Actions Workflow
pnpm lighthouse
# Output:
# Performance: 94 ✅
# LCP: 1.2s ✅
# CLS: 0.05 ✅
```

---

## 🎨 DIE VISUELLE AURA (Perceived Performance)

**Wahrnehmung ≠ Realität.** Ein Blur-Up Placeholder fühlt sich schneller an als nichts, obwohl die gleiche Zeit vergeht.

### Skeleton-Strategy

```tsx
// components/HeroSkeleton.tsx
export function HeroSkeleton() {
  return (
    <div className="w-full aspect-video bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg">
      {/* Das ist der "Wahrnehmungsbeweis" dass etwas lädt */}
    </div>
  );
}
```

Nutzer sieht sofort: "Ah, Seite lädt etwas Großes."

---

## 🚨 HÄUFIGE LCP-KILLER

### LCP-Killer 1: Lazy-Loading des Hero-Images
```javascript
// ❌ FALSCH
<Image src="/hero.jpg" loading="lazy" /> // Default in Next.js 12

// ✅ RICHTIG
<Image src="/hero.jpg" priority /> // Next.js 13+
```

**Impact:** +800ms LCP

### LCP-Killer 2: Web Fonts ohne `font-display`
```css
/* ❌ FALSCH (blockiert 2-3 Sekunden) */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2');
  /* font-display fehlt → blockiert Text-Rendering */
}

/* ✅ RICHTIG */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2');
  font-display: swap;
}
```

**Impact:** +1500ms LCP

### LCP-Killer 3: Große JavaScript-Bundles
Wenn dein Bundle 500kb ist, blockiert das den Main Thread während Parse:
```bash
# Check Bundle-Größe
pnpm build
# Dist size: 450kb → LCP blockiert
```

**Solution:** Code-Splitting per Route + Tree-Shaking via Turbopack

### LCP-Killer 4: Render-Blocking CSS/JS
```html
<!-- ❌ FALSCH (blockiert Rendering) -->
<link rel="stylesheet" href="/global.css"> {/* Rendering wartet */}
<script src="/app.js"></script> {/* Rendering wartet */}

<!-- ✅ RICHTIG (async/defer) -->
<link rel="preload" href="/critical.css" as="style">
<link rel="stylesheet" href="/critical.css"> {/* Nur kritisch */}
<script defer src="/app.js"></script> {/* Renderiert zuerst */}
```

---

## 🔗 SYNERGIEN MIT ANDEREN LEARNINGS

### 1. **PPR (Partial Pre-Rendering)** (file:320)
Die **Static Shell** wird sofort ausgeliefert (< 50ms), was als "LCP" wahrgenommen wird. Dynamic Holes streamen danach.

### 2. **Image Optimization** (file:324)
Optimierte Images sind der direkteste Weg zu schnellerem LCP. AVIF-Format ist Voraussetzung.

### 3. **Next.js 16.1 Changes** (web:176)
Neue `async` Params-Handling kann LCP beeinflussen, wenn nicht korrekt implementiert.

---

## ✅ VIRON CHECKLIST

- [ ] LCP-Element identifiziert (Lighthouse)
- [ ] Hero Image hat `priority` Flag
- [ ] Image im AVIF-Format (nicht JPEG)
- [ ] Web Fonts haben `font-display: swap`
- [ ] Critical CSS wird inline injiziert
- [ ] Keine Render-Blocking JavaScript in `<head>`
- [ ] k6 Test: LCP-Zeit unter Last (p95 < 3.0s)
- [ ] Lighthouse Score: Performance >= 90

---

**Dokument Version:** 2.0 | **Erstellt:** 13. Januar 2026 | **Status:** Production Validated
