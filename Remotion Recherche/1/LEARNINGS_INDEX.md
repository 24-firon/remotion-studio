# VIRON LEARNINGS INDEX

**Status:** Meta-Guideline | **Version:** 1.0 | **Gültig ab:** 13. Januar 2026  
**Zielgruppe:** Alle Agents | **Zweck:** Entscheiden, *welches* Learning wann geladen werden muss

---

## Wie dieser Index benutzt wird

- Lies **nicht** alle Learnings auf einmal.
- Entscheide zuerst: **Welcher Task-Typ?** (z.B. „Formular bauen", „Scroll-Animation", „Performance-Fix").
- Nutze die Tabelle unten: **Task-Typ → Relevante Learnings → Pflicht / Optional**.

---

## Übersichtstabelle der Learnings

| Datei | Thema | Wann lesen? | Pflicht? | Kurzbeschreibung |
|-------|-------|-------------|----------|------------------|
| `CLS_ZERO_LAYOUT_SHIFT.md` | Cumulative Layout Shift (Zero Layout Shift) | Immer, wenn Layout springt, neue Sektionen gebaut werden oder Animations/Images angefasst werden | 🔴 Ja für UI/Frontend | Erklärt, was CLS ist, typische Ursachen (Bilder, Fonts, Lazy Content, Forms, Animationen) und konkrete Fix-Patterns für „Zero Layout Shift". |
| `GPU_GUARD_DEEP_DIVE.md` | GPU-sichere Animationen mit GSAP | Vor jeder Implementierung/Änderung von Animationen (GSAP, Framer, CSS-Animations) | 🔴 Ja für Animations-Tasks | Erklärt Browser-Rendering-Pipeline und welche Properties animiert werden dürfen (`transform`, `opacity`) und welche **verboten** sind (`top`, `height`, `margin`), inkl. ScrollTrigger-Beispielen. |
| `SERVER_ACTIONS_PATTERN.md` | Server Actions + React 19 Hooks | Bei allen Formularen, Mutationen, Datenänderungen (Create/Update/Delete) | 🔴 Ja für Backend/Forms | Definiert das Standard-Muster mit `'use server'`, `useActionState`, `useFormStatus`, `useTransition` und Zod-Validierung für sichere, type-sichere Mutationen. |
| `ERROR_BOUNDARIES_SUSPENSE.md` | Fehlerbehandlung & Streaming | Bei komplexen Seiten mit async Server Components, Streaming oder kritischen Modulen | 🔴 Ja für Seiten-Architektur | Zeigt, wie `error.tsx` und `Suspense` kombiniert werden, um Self-Healing UIs zu bauen, die bei Fehlern nicht die ganze Seite abschießen. |
| `LCP_LARGEST_CONTENTFUL_PAINT.md` | Largest Contentful Paint | Wenn Performance, SEO oder Landingpage-Qualität optimiert werden soll | 🔴 Ja für Performance-Tasks | Erklärt LCP-Metrik, typische LCP-Killer (Hero-Image lazy, Fonts, JS-Bloat) und wie Hero-Section + Fonts + Critical CSS auf < 1–2,5s gebracht werden. |
| `PPR_PARTIAL_PRERENDERING.md` | Partial Pre-Rendering (PPR) | Beim Aufsetzen/Refactoring von Seiten mit Misch aus statisch + personalisiert (Dashboard, SaaS, E-Commerce) | 🟠 Mittel (Architektur) | Beschreibt das „Static Shell + Dynamic Holes"-Modell mit `experimental_ppr`, Suspense-Grenzen und Skeleton-Design für schnelle, personalisierte Seiten. |
| `TAILWIND_41_OXIDE_THEME.md` | Tailwind 4.1 Oxide & @theme | Beim Styling-System, Tokens, Theming oder Tailwind-Upgrades | 🟠 Mittel (Design System) | Definiert, wie Farben, Typografie, Spacing etc. in `@theme` gepflegt werden und wie das Design-System CSS-first (ohne `tailwind.config.js`) funktioniert. |
| `ZOD_FORM_VALIDATION.md` | Zod-basierte Formular-Validierung | Bei allen Formularen, User-Input, API/DB-Schnittstellen | 🔴 Ja für jede Input-Verarbeitung | Standardisiert, wie Schemas in `lib/schemas.ts` definiert, in Server Actions verwendet und als TypeScript-Typen wiederverwendet werden. |
| `NEXTJS_IMAGE_OPTIMIZATION.md` | Next.js Image-Optimierung | Immer, wenn Bilder/Heroes/Galerien gebaut oder geändert werden | 🔴 Ja für jede Bildarbeit | Erläutert `next/image`, `priority`, `sizes`, AVIF/WebP, Remote-Config und wie Bild-Strategie direkt LCP & CLS beeinflusst. |
| `SCROLLTRIGGER_PATTERN.md` | GSAP ScrollTrigger Muster | Bei Scroll-basierten Effekten (Reveal, Parallax, Storytelling) | 🟠 Mittel, 🔴 wenn Scroll-Effekte gewünscht | Liefert Lifecycle-Pattern mit `useLayoutEffect` + `gsap.context`, Scrub- und Batch-Patterns und Mobile-Fallback-Strategien. |
| `K6_LOAD_TESTING.md` | k6 Load Testing | Vor Release, bei Performance-/Robustness-Anforderungen, CI/CD-Setup | 🟠 Mittel (DevOps/Infra) | Definiert das Standard-k6-Skript, Schwellenwerte (p95 < 500ms), GitHub-Actions-Integration und Auswertung der Lasttests. |

---

## Entscheidungs-Logik für den Agent

### 1. Task-Typ erkennen

Der Agent soll zu Beginn eines Tasks folgende Fragen beantworten:

- Geht es um **Layout/Visuelle Struktur**?
- Geht es um **User-Input / Formulare / Mutationen**?
- Geht es um **Performance / SEO / Core Web Vitals**?
- Geht es um **Animation / Scroll / GSAP**?
- Geht es um **Build-/Infra-/Release-Robustheit**?

Anhand der Antworten werden Learnings geladen.

---

## Welche Learnings bei welchem Task?

### UI & Layout Tasks

**Wenn:**
- Neue Sektion / Komponente wird gebaut
- Layout springt / wackelt / „zuckt"
- Bilder, Cards, Grids, Forms im Viewport

**Dann lesen:**

1. `CLS_ZERO_LAYOUT_SHIFT.md` (Pflicht: Layout-Stabilität)
2. `NEXTJS_IMAGE_OPTIMIZATION.md` (Pflicht: Bilder im Spiel)
3. Optional: `TAILWIND_41_OXIDE_THEME.md` (wenn Tokens/Stylesystem angepasst werden)

---

### Forms, Mutationen & User Input

**Wenn:**
- Kontaktformular, Sign-up, Login, Settings-Form
- Server Actions (`'use server'`) im Einsatz
- Daten in DB/API geschrieben werden

**Dann lesen:**

1. `SERVER_ACTIONS_PATTERN.md` (Pflicht: Architektur von Mutationen)
2. `ZOD_FORM_VALIDATION.md` (Pflicht: Validierung & Security)
3. `ERROR_BOUNDARIES_SUSPENSE.md` (empfohlen: Fehler abfangen & UX)

---

### Performance & Core Web Vitals

**Wenn:**
- Lighthouse/Analytics-Werte verbessern
- Landingpage-Kampagne, Ads-Traffic, SEO-Fokus
- Beschwerden über „Langsamkeit"

**Dann lesen:**

1. `LCP_LARGEST_CONTENTFUL_PAINT.md` (Pflicht: Sichtbarkeits-Metrik)
2. `CLS_ZERO_LAYOUT_SHIFT.md` (Pflicht: Layout-Stabilität)
3. `NEXTJS_IMAGE_OPTIMIZATION.md` (Pflicht: meist größter Hebel)
4. Optional: `PPR_PARTIAL_PRERENDERING.md` (wenn viel Dynamic/Personalized Content)

---

### Animation & Scroll Experience

**Wenn:**
- Neue Animation (Hero, Cards, Text-Reveal) gebaut wird
- Scroll-basierte Effekte (Parallax, Storytelling)
- Jank / Ruckler / FPS-Drops gemeldet werden

**Dann lesen:**

1. `GPU_GUARD_DEEP_DIVE.md` (Pflicht: Property-Auswahl & Rendering-Pipeline)
2. `SCROLLTRIGGER_PATTERN.md` (Pflicht bei ScrollTrigger-Nutzung)
3. `CLS_ZERO_LAYOUT_SHIFT.md` (nur Abschnitt zu Animations & CLS-Impact)

---

### Architektur, Streaming & Daten-Schwere Seiten

**Wenn:**
- Dashboard / SaaS / personalisierte Seite
- Viele async Server Components, Streaming, PPR
- Es gibt komplexe Module, die oft fehlschlagen

**Dann lesen:**

1. `PPR_PARTIAL_PRERENDERING.md` (Architektur von Static Shell + Dynamic Holes)
2. `ERROR_BOUNDARIES_SUSPENSE.md` (Self-Healing bei Fehlern)
3. `SERVER_ACTIONS_PATTERN.md` (wenn Mutationen Teil des Flows sind)

---

### Robustness, CI/CD, Lastverhalten

**Wenn:**
- Release-Pipeline eingerichtet/angepasst wird
- Es um „hält das unter 50–100 gleichzeitigen Nutzern?" geht
- Pre-Launch, große Kampagne, Peak Traffic

**Dann lesen:**

1. `K6_LOAD_TESTING.md` (Lasttest-Setup, Schwellenwerte, CI-Integration)
2. `LCP_LARGEST_CONTENTFUL_PAINT.md` (um zu verstehen, welche Metriken zu messen sind)

---

## Minimal-Set für einen neuen Agent

Ein neuer Agent, der Viron-Projekte bearbeiten soll, **muss** mindestens folgende Learnings kennen:

1. **`CLS_ZERO_LAYOUT_SHIFT.md`** – damit kein neues UI CLS produziert
2. **`GPU_GUARD_DEEP_DIVE.md`** – damit alle Animationen GPU-sicher sind
3. **`SERVER_ACTIONS_PATTERN.md`** – damit Mutationen modern & sicher gebaut werden
4. **`ZOD_FORM_VALIDATION.md`** – damit Input/DB-Daten valide und typ-sicher bleiben
5. **`LCP_LARGEST_CONTENTFUL_PAINT.md`** – damit Landingpages schnell und SEO-fähig sind

Alle anderen Learnings sind **situationsabhängige Vertiefungen**, werden aber über diesen Index gezielt und sparsam geladen.

---

## Integration in AGENTS.md

Aktualisiere `AGENTS.md`, um folgende Sektion ganz oben einzufügen:

```markdown
## 📚 Learnings laden (nicht alle auf einmal!)

Vor jedem Feature/Task:
1. Lese `LEARNINGS_INDEX.md` (diese Datei) – nicht `SPEC.md`, nicht `CORE_RULES.md` zuerst
2. Erkenne den Task-Typ (UI? Forms? Performance? Animation?)
3. Lade **nur** die relevanten Learnings aus der Tabelle
4. Schreibe am Task-Anfang einen Kommentar: "Learnings geladen: X, Y, Z"

**Minimal-Pflicht:** CLS, GPU Guard, Server Actions, Zod, LCP
```

---

## Versionierung & Updates

- **Version 1.0:** Januar 13, 2026 – 10 Core Learnings + Entscheidungsbaum
- **Nächste Review:** Q2 2026 – Falls neue Learnings hinzukommen (z.B. „Database Query Optimization", „Authentication Patterns")

---

**Dokument Version:** 1.0 | **Erstellt:** 13. Januar 2026 | **Status:** Production Ready
