# Layout Patterns 01 – Container Queries & Modern Grids (2026)

## Konzept (ASCII Diagram)

```
OLD PARADIGM (2024)
  ├─ Global Breakpoints: @media (min-width: 768px)
  ├─ Problem: Component hat keine "Ahnung" vom Context
  └─ Resultat: Fragile, repeat code

NEW PARADIGM (2026 Standard)
  ├─ Container Queries: @container (min-width: 400px)
  ├─ Vorteil: Component ist self-contained
  ├─ + CSS Subgrid: Nested Layouts aligned mit Parent
  └─ Resultat: Robust, DRY, Responsive überall
```

## Was ist das?

**Container Queries** sind das "Responsiveness Rebooted" für 2026:
- Komponente fragt sich selbst: "Wie breit bin ich?" (nicht "Wie breit ist der Viewport?")
- **Subgrid:** Nested Grids erben Grid-Lines vom Parent (Game Changer für Layouts)
- **Perfekt für:** Wiederverwendbare Components, Video-Overlays, Dashboard-Layouts

---

## Variante 1: Container Queries – Self-Contained Components

### Setup
- Container definieren (z.B. `.card { container-type: inline-size; }`)
- Styles basieren auf Container-Größe (z.B. `@container (min-width: 300px)`)
- Component funktioniert überall, egal ob 300px oder 900px breit

### Code (React + CSS)

```tsx
// components/VideoCard.tsx
import styles from "./VideoCard.module.css";

export const VideoCard = ({ title, duration, thumbnail }: any) => {
  return (
    <div className={styles.card}>
      <img src={thumbnail} alt={title} className={styles.thumbnail} />
      <div className={styles.content}>
        <h3>{title}</h3>
        <p className={styles.duration}>{duration} min</p>
      </div>
    </div>
  );
};
```

```css
/* VideoCard.module.css */

/* Container Query Setup */
.card {
  container-type: inline-size;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-surface);
}

/* Default: Mobile Layout (stacked) */
.thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 16px;
}

.content h3 {
  font-size: 16px;
  margin: 0;
}

.duration {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin: 8px 0 0 0;
}

/* Container Query: When card is wide enough (400px+) */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 12px;
  }

  .thumbnail {
    height: 100%;
    min-height: 200px;
  }

  .content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content h3 {
    font-size: 18px;
  }

  .duration {
    font-size: 14px;
  }
}

/* When card is even wider (600px+) */
@container (min-width: 600px) {
  .content h3 {
    font-size: 20px;
    font-weight: bold;
  }

  .content p {
    line-height: 1.6;
  }
}
```

### Wo du es nutzt
```tsx
// Page mit verschiedenen Breiten
export default function Dashboard() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: 16 }}>
      <VideoCard title="Hero Video" duration="5" thumbnail="/1.jpg" /> {/* 400px+ */}
      <VideoCard title="Tutorial" duration="10" thumbnail="/2.jpg" />
      <VideoCard title="Short" duration="1" thumbnail="/3.jpg" /> {/* 300px! */}
    </div>
  );
}
// Alle VideoCard Components responsiv, ohne @media!
```

### Performance-Charakteristik
- **Browser Support:** 70%+ (Chrome 105+, Safari 16+, Edge, Firefox experimental)
- **Fallback:** Graceful (older browser zeigt mobile layout)
- **FPS Impact:** 0 (CSS-only, GPU-accelerated)

---

## Variante 2: CSS Subgrid (Nested Layouts Aligned)

### Setup
- Parent Grid definiert Spalten (z.B. 3 Spalten für Header/Body/Sidebar)
- Child Elements nutzen `grid: subgrid / subgrid;` → erben Grid-Lines vom Parent
- Vorteil: Alle Kinder aligned mit Parent-Columns, keine zusätzliche Kalkulation

### Code (Grid + Subgrid Blueprint)

```tsx
// Dashboard Layout mit Subgrid
export const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header: 3 Spalten */}
      <header className="header">
        <h1>My Videos</h1>
        <nav></nav>
        <button>Settings</button>
      </header>

      {/* Hero Section: Nutzt gleiche Spalten */}
      <section className="hero">
        <video src="/hero.mp4" />
        <div className="hero-text">
          <h2>Welcome</h2>
        </div>
        <aside className="cta">
          <button>Watch Now</button>
        </aside>
      </section>

      {/* Video Grid: Jedes Item aligned mit Parent Columns */}
      <div className="video-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="video-item">
            <img src={`/video-${i}.jpg`} alt="" />
            <h3>Video {i}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
```

```css
/* Dashboard Layout mit Subgrid */

.dashboard {
  /* Parent Grid: 3 Hauptspalten */
  display: grid;
  grid-template-columns: 1fr 2fr 300px;
  gap: 20px;
  padding: 20px;
}

/* Header nutzt gleiche Spalten wie Parent */
.header {
  display: grid;
  grid-column: 1 / -1; /* Span alle Spalten */
  grid-template-columns: subgrid; /* KRITISCH: erbe Parent Columns */
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: var(--color-surface);
}

.header h1 {
  grid-column: 1; /* Erste Spalte */
}

.header nav {
  grid-column: 2; /* Zweite Spalte (groß) */
}

.header button {
  grid-column: 3; /* Dritte Spalte (Sidebar) */
}

/* Hero Section: auch subgrid */
.hero {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  gap: 20px;
  align-items: center;
}

.hero video {
  grid-column: 1;
  width: 100%;
  border-radius: 8px;
}

.hero-text {
  grid-column: 2;
}

.hero .cta {
  grid-column: 3;
}

/* Video Grid: 2 Columns auf 100% */
.video-grid {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.video-item {
  background: var(--color-surface);
  border-radius: 8px;
  overflow: hidden;
}

.video-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Mobile: Reduziere Spalten */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .header {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero {
    grid-template-columns: 1fr;
  }
}
```

### Performance-Charakteristik
- **Browser Support:** 90%+ (sehr stabil)
- **Layout Stability:** ⭐⭐⭐⭐⭐ (keine Layout Shifts)
- **Code DRY-ness:** Massiv reduziert (keine Grid-Neudef notig)

---

## Variante 3: Bento Grid (TikTok-Style Layout)

### Setup
- Asymmetrische Grid-Items (manche 1x1, manche 2x2, manche 3x1)
- Moderne, organische Layouts
- Perfekt für Video-Portfolios, Dashboard-Widgets

### Code

```tsx
export const BentoGrid = () => {
  return (
    <div className="bento-grid">
      {/* 2x2 Hero */}
      <div className="item hero">
        <video src="/hero-video.mp4" autoPlay muted loop />
        <h2>Feature Video</h2>
      </div>

      {/* 1x1 Items */}
      <div className="item small">
        <img src="/1.jpg" alt="" />
        <p>Video 1</p>
      </div>
      <div className="item small">
        <img src="/2.jpg" alt="" />
        <p>Video 2</p>
      </div>

      {/* 3x1 Wide */}
      <div className="item wide">
        <img src="/wide-banner.jpg" alt="" />
        <p>Campaign Banner</p>
      </div>

      {/* More 1x1s */}
      <div className="item small">
        <img src="/3.jpg" alt="" />
      </div>
    </div>
  );
};
```

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto, 200px);
  gap: 16px;
  padding: 20px;
}

/* Hero: 2x2 */
.item.hero {
  grid-column: span 2;
  grid-row: span 2;
}

/* Small: 1x1 (default) */
.item.small {
  grid-column: span 1;
  grid-row: span 1;
}

/* Wide: 3x1 */
.item.wide {
  grid-column: span 3;
  grid-row: span 1;
}

/* Mobile: alle 1x1 */
@container (max-width: 600px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }

  .item {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
}
```

---

## Performance-Tipps

### Tipp 1: Container Query Naming Convention
```css
/* Gut: Aussagekräftig */
.card { container-type: inline-size; }
@container (min-width: 400px) { /* Clear intent */ }

/* Suboptimal: Zu generisch */
.box { container-type: inline-size; }
@container (min-width: 300px) { }
```

### Tipp 2: Fallback für alte Browser
```css
/* Container Query mit Fallback */
@supports (container-type: inline-size) {
  /* Modern Code */
}

/* Fallback: Media Query */
@media (min-width: 768px) {
  /* Old School */
}
```

### Tipp 3: Subgrid richtig nutzen
```css
/* ✅ RICHTIG: `subgrid` on both axes */
.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}

/* ❌ FALSCH: nur `subgrid` ohne display grid */
.child {
  grid-template-columns: subgrid; /* Ineffektiv! */
}
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Container Query funktioniert nicht | Browser zu alt | Use @supports für graceful fallback |
| Subgrid Kinder nicht aligned | `grid-template-columns: subgrid` vergessen | Explizit auf Child definieren |
| Video-Overlay streckt sich falsch | Grid Gap nicht beachtet | `gap` konsistent setzen |
| Mobile sieht komisch aus | Container Query Breakpoints falsch | Test mit DevTools: Elements → Layout Panel |

---

## Quellen

- Container Queries (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/container-query
- CSS Subgrid (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid
- Responsive Components: https://web.dev/cq-stable/

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Intermediate  
**Browser Support:** 85%+ (with fallbacks 100%)  
**ROI:** Sehr Hoch (DRY, Reusable, Future-Proof)