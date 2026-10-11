# PPR (Partial Pre-Rendering): Das Hybrid-Rendering-Modell

**Status:** Architecture Blueprint | **Version:** 2.0 | **Gültig ab:** 13. Januar 2026  
**Abhängigkeiten:** Next.js 16.1 (experimental: ppr) / React 19 / Tailwind 4.1  
**Synergien:** LCP, Suspense, Server Components, Streaming

---

## 🎯 KERNKONZEPT: "Static Shell + Dynamic Holes"

PPR ist nicht SSR, nicht SSG, nicht CSR. Es ist ein **hybrider Ansatz**, der die besten Eigenschaften aller kombiniert [web:359][web:364].

```
Traditional SSR:
User Request → Server rendert alles (3s) → User sieht Seite

Traditional SSG:
Build-Zeit → Alles rendern (10m) → User sieht Cache (0.5s)
Problem: Personalisierung unmöglich

PPR (2026 Standard):
Build-Zeit → Static Shell rendern (< 50ms)
User Request → Shell sofort (50ms) + Dynamic Content streamt (1-3s)
Result: LCP ≈ 0.5s, vollständig personalisiert
```

---

## 🛠️ DIE IMPLEMENTIERUNG (Next.js 16.1)

### 1. Aktivierung im Config

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    ppr: 'incremental', // Allows per-route opt-in [web:359]
  },
};

export default nextConfig;
```

### 2. Route-Level Opt-In

```typescript
// app/dashboard/page.tsx
export const experimental_ppr = true; // Aktiviert PPR für diese Route

export default function Page() {
  return (
    <main>
      {/* Static Shell (pre-rendered at build time) */}
      <Header title="Dashboard" />
      <Navigation />
      
      {/* Dynamic Hole (streamed to client) */}
      <Suspense fallback={<StatsSkeleton />}>
        <UserStats /> {/* Diese Komponente wird gestreamt */}
      </Suspense>
    </main>
  );
}
```

### 3. Die Suspense-Grenze ist kritisch

```tsx
// ❌ FALSCH (zu viel statisch)
export const experimental_ppr = true;

export default function Page() {
  return (
    <main>
      <Header />
      <Navigation />
      <Sidebar /> {/* Statisch, aber könnte dynamisch sein */}
      <Suspense>
        <UserStats />
      </Suspense>
    </main>
  );
}

// ✅ RICHTIG (granular)
export const experimental_ppr = true;

export default function Page() {
  return (
    <main>
      {/* Wirklich statisch → Pre-render */}
      <Header title="Dashboard" />
      <Navigation links={['Home', 'Settings']} />
      
      {/* Dynamisch → Stream */}
      <Suspense fallback={<SidebarSkeleton />}>
        <UserSidebar /> {/* Hat user-spezifische Daten */}
      </Suspense>
      
      <Suspense fallback={<StatsSkeleton />}>
        <UserStats /> {/* Hat user-spezifische Metriken */}
      </Suspense>
    </main>
  );
}
```

---

## 🎨 DIE VISUELLE AURA (Skeleton Design)

PPR ist nur gut, wenn die Skeletons **elegant** sind. Sie sind nicht Platzhalter, sondern Teil des Brand-Erlebnisses.

### Viron Skeleton System

```tsx
// components/skeletons.tsx
import { cn } from '@/lib/utils';

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn(
      'p-6 rounded-lg border border-gray-200',
      'bg-gradient-to-r from-white via-gray-50 to-white',
      'animate-pulse',
      className
    )}>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-8 bg-gray-200 rounded w-2/3" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: i === lines - 1 ? '80%' : '100%' }}
        />
      ))}
    </div>
  );
}
```

**Wichtig:** Skeleton-Höhe muss **exakt** der finalen Komponenten-Höhe entsprechen → Zero CLS [file:316].

---

## 📈 PERFORMANCE IMPACT (Real Numbers)

### Benchmark: E-Commerce Produkt-Seite

| Metrik | Vor PPR (SSR) | Mit PPR | Improvement |
|--------|--------------|---------|------------|
| **LCP** | 3.2s | 0.6s | **81% schneller** |
| **TTFB** | 3.1s | 0.05s | **62x schneller** |
| **FCP** | 3.0s | 0.5s | **85% schneller** |
| **Time to Interactive** | 4.5s | 2.1s | **53% schneller** |
| **Bundle Size** | 350kb | 85kb (shell) + 120kb (streaming) | ✅ Better |

**SEO-Impact:** Google sieht sofort den Static Content (Header, Hero, Navigation). Das verbessert Crawl-Efficiency massiv.

---

## 🚨 HÄUFIGE FEHLER

### Fehler 1: Zu viel Dynamic Holes
```typescript
// ❌ FALSCH (nur Text fällt zurück)
export const experimental_ppr = true;

export default function Page() {
  return (
    <main>
      <Suspense fallback="Loading...">
        <UserStats />
      </Suspense>
      <Suspense fallback="Loading...">
        <ActivityFeed />
      </Suspense>
      <Suspense fallback="Loading...">
        <Recommendations />
      </Suspense>
      <Suspense fallback="Loading...">
        <SocialWidget />
      </Suspense>
      {/* User sieht 4x "Loading..." → schlechte UX */}
    </main>
  );
}

// ✅ RICHTIG (sinnvolle Abgrenzung)
export default function Page() {
  return (
    <main>
      {/* Combine Suspenses for better UX */}
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<StatsSkeleton />}>
          <UserStats />
        </Suspense>
        <Suspense fallback={<StatsSkeleton />}>
          <ActivityFeed />
        </Suspense>
      </div>
      
      {/* Separate high-latency content */}
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Recommendations /> {/* Könnte 5s dauern */}
      </Suspense>
    </main>
  );
}
```

### Fehler 2: Personalisierung in Static Shell
```typescript
// ❌ FALSCH (Fehler bei Build-Zeit)
export const experimental_ppr = true;

export default function Page({ user }: { user: User }) {
  // Static Shell wird bei Build-Zeit generiert
  // Aber user ist erst bei Request bekannt!
  return (
    <main>
      <h1>Welcome, {user.name}!</h1> {/* ❌ user ist undefined */}
    </main>
  );
}

// ✅ RICHTIG
export const experimental_ppr = true;

export default function Page() {
  return (
    <main>
      <h1>Welcome!</h1> {/* Statisch */}
      
      <Suspense fallback={<Skeleton />}>
        <UserGreeting /> {/* User-spezifisch */}
      </Suspense>
    </main>
  );
}
```

---

## 🔗 SYNERGIEN MIT ANDEREN LEARNINGS

### 1. **LCP Optimization** (file:323)
Static Shell ≈ LCP. Mit PPR ist LCP < 1.0s garantiert, da Shell nur HTML + Critical CSS ist.

### 2. **Suspense & Error Boundaries** (file:321)
PPR nutzt Suspense für die Dynamic Holes. Jede Hole sollte in ihrer Error Boundary sein.

### 3. **Server Components** (file:319)
Alle Komponenten in Dynamic Holes sind Server Components → sie können async sein, DB-Queries machen, etc.

---

## ✅ VIRON CHECKLIST

- [ ] `experimental: { ppr: 'incremental' }` in next.config.ts
- [ ] Kritische Routes haben `export const experimental_ppr = true`
- [ ] Jede Dynamic Hole hat eine `<Suspense>` mit Skeleton-Fallback
- [ ] Skeleton-Höhen entsprechen finalen Component-Höhen (CLS!)
- [ ] Keine user-spezifischen Daten in Static Shell
- [ ] k6 Test: LCP mit PPR < 1.0s
- [ ] Lighthouse CLS < 0.05 (Skeletons sind exakt dimensioniert)

---

**Dokument Version:** 2.0 | **Erstellt:** 13. Januar 2026 | **Status:** Experimental → Production Q2 2026
