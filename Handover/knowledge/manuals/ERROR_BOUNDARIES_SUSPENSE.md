# ERROR BOUNDARIES & SUSPENSE: Die Self-Healing-Architektur

**Status:** Resilience Blueprint | **Version:** 2.0 | **Gültig ab:** 13. Januar 2026  
**Abhängigkeiten:** Next.js 16.1 App Router / React 19 / TypeScript 5.7  
**Synergien:** Server Components, PPR, Streaming, Server Actions

---

## 🎯 KERNKONZEPT: Isolation statt Totalausfall

Im Mastery Tier 2026 folgt jede Komponente dem **Bulkhead Pattern**: Ein Fehler in Komponente A bricht Komponente B nicht, sondern wird lokal abgefangen und gezeigt.

### Der Fehler-Propagation-Flow

```
User Action
  ↓
Server Component (async) throws Error
  ↓
Nächste Error Boundary fängt ab
  ↓
Error UI wird gerendert (statt White Screen)
  ↓
Rest der Seite funktioniert normal
```

---

## 🛠️ ERROR.TSX: Das Next.js 16.1 Pattern

In Next.js 16.1 wird Fehlerbehandlung nicht via Komponenten, sondern via **File-System Konvention** implementiert.

### Hierarchie (ähnlich wie `layout.tsx`)

```
app/
├── layout.tsx              (Global Layout)
├── error.tsx               (Global Error Boundary)
│
├── dashboard/
│   ├── layout.tsx          (Dashboard Layout)
│   ├── error.tsx           (Dashboard-Level Error) ← Fängt nur Dashboard-Fehler
│   ├── page.tsx
│   │
│   └── analytics/
│       ├── error.tsx       (Analytics-Specific Error)
│       └── page.tsx
```

**Effekt:** Fehler in `/dashboard/analytics` wird von `analytics/error.tsx` behandelt. Wenn die fehlschlägt, propagiert zu `dashboard/error.tsx`. Dann zu `app/error.tsx`.

### Implementierung einer Error Boundary Datei

```typescript
// app/dashboard/error.tsx
'use client'
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string }; // Eindeutige Error-ID
  reset: () => void; // Button zum Retry
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log Error zu externem Service (z.B. Sentry)
    console.error('Dashboard Error:', error);
    
    // Sentry Integration:
    if (typeof window !== 'undefined') {
      // Sentry.captureException(error, {
      //   tags: { area: 'dashboard' },
      // });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Icon */}
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          
          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            We encountered an issue loading your dashboard. Our team has been notified.
          </p>

          {/* Error Details (Dev Only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left mb-6 p-4 bg-gray-100 rounded text-sm text-gray-700">
              <summary className="font-bold cursor-pointer mb-2">Error Details</summary>
              <code className="block overflow-auto">{error.message}</code>
              {error.digest && (
                <p className="mt-2 text-xs text-gray-500">Error ID: {error.digest}</p>
              )}
            </details>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Try Again
            </button>
            <a
              href="/support"
              className="block w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🌊 SUSPENSE: Streaming & Progressive Rendering

Suspense ist das **Gegenteil von Error Boundaries**: Statt Fehler zu behandeln, behandelt es **Ladezeiten**.

### Das Boundary-Pattern

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/skeleton';
import { UserStats } from '@/components/dashboard/user-stats';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  return (
    <main className="space-y-8">
      {/* Section 1: User Stats mit eigenem Loading-State */}
      <Suspense fallback={<SkeletonCard className="h-40" />}>
        <UserStats /> {/* Kann async sein → Server Component */}
      </Suspense>

      {/* Section 2: Activity Feed mit eigenem Loading-State */}
      <Suspense fallback={<SkeletonCard className="h-96" />}>
        <RecentActivity /> {/* Kann länger dauern, blockiert nicht UserStats */}
      </Suspense>
    </main>
  );
}
```

**Der Trick:** Jede Suspense-Boundary rendert **unabhängig**. Wenn UserStats 200ms braucht und RecentActivity 2s, zeigen wir:
- T=0ms: Beide Skeletons
- T=200ms: UserStats angezeigt, RecentActivity Skeleton bleibt
- T=2s: RecentActivity angezeigt

### Async Server Component Example

```typescript
// components/dashboard/user-stats.tsx
async function UserStats() {
  // Diese Funktion ist async → Suspense wird triggert bis Daten da sind
  const stats = await db.user.getStats();
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Revenue" value={stats.revenue} />
      <StatCard label="Users" value={stats.userCount} />
      <StatCard label="Churn" value={stats.churnRate} />
    </div>
  );
}

export default UserStats;
```

---

## 🎭 DIE KOMBINATION: Error Boundary + Suspense

Das Ideal: **Fehler UND Ladetimes parallel handhaben**

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <ErrorBoundary fallback={<GlobalErrorUI />}>
      <main className="space-y-8">
        {/* Protected Section mit Error Isolation */}
        <ErrorBoundary fallback={<SectionErrorUI section="stats" />}>
          <Suspense fallback={<Skeleton />}>
            <UserStats />
          </Suspense>
        </ErrorBoundary>

        {/* Wenn UserStats fehlschlägt → SectionErrorUI zeigen */}
        {/* Aber RecentActivity lädt weiter normal */}

        <ErrorBoundary fallback={<SectionErrorUI section="activity" />}>
          <Suspense fallback={<Skeleton />}>
            <RecentActivity />
          </Suspense>
        </ErrorBoundary>
      </main>
    </ErrorBoundary>
  );
}
```

---

## 🚨 HÄUFIGE FEHLER

### Fehler 1: Error Boundary für Async Problems
```typescript
// ❌ FALSCH (Error Boundary fängt async Fehler nicht!)
<ErrorBoundary>
  {/* Diese Komponente ist async und wirft einen Error */}
  <AsyncComponent /> 
</ErrorBoundary>

// ✅ RICHTIG (Suspense + Error Boundary)
<ErrorBoundary>
  <Suspense fallback={<Skeleton />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>
```

### Fehler 2: Loading State in zu viele Ebenen teilen
```typescript
// ❌ FALSCH (Wenn eine Section langsam ist, wartet alles)
<Suspense fallback={<AllSkeleton />}>
  <UserStats />
  <RecentActivity />
  <DetailedAnalytics /> {/* Könnte 5s dauern! */}
</Suspense>

// ✅ RICHTIG (Granulare Boundaries)
<Suspense fallback={<UserStatsSkeleton />}>
  <UserStats />
</Suspense>
<Suspense fallback={<ActivitySkeleton />}>
  <RecentActivity />
</Suspense>
<Suspense fallback={<AnalyticsSkeleton />}>
  <DetailedAnalytics />
</Suspense>
```

---

## 🔗 SYNERGIEN MIT ANDEREN LEARNINGS

### 1. **Server Actions** (file:319)
Server Actions werfen Exceptions → Error Boundaries fangen sie auf → Nutzer sieht Error UI (nicht Code-Fehler).

### 2. **PPR (Partial Pre-Rendering)** (file:320)
Static Shell wird sofort ausgeliefert. Dynamic Holes nutzen Suspense → Streaming. Falls ein Hole fehlschlägt → Error Boundary.

### 3. **LCP Optimization** (file:323)
Durch Suspense-Granularität kann der **LCP klein bleiben** (nur Static Shell), während Dynamic Content im Hintergrund streamt.

---

## ✅ VIRON CHECKLIST

- [ ] Jede `async` Component ist in eine `<Suspense>` gewrapped
- [ ] Jede kritische Section hat eine `<ErrorBoundary>`
- [ ] Error UIs zeigen **hilfreiche Meldungen**, keine Code-Fehler
- [ ] `reset()` Button ist implementiert für Retry-Logik
- [ ] Sentry/Error-Service ist integriert
- [ ] Skeleton-States haben exakt gleiche Höhe wie finale Components (CLS!)
- [ ] Mobile: Fehlermeldungen sind lesbar ohne Scroll

---

**Dokument Version:** 2.0 | **Erstellt:** 13. Januar 2026 | **Status:** Production Validated
