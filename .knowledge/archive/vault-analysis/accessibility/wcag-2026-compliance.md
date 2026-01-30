# Accessibility: WCAG 2026 Compliance for Video

> **Source:** [70-web-accessibility-wcag-2026.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/70-web-accessibility-wcag-2026.md) (11.2 KB)

---

## Mission

All Viron video content MUST meet WCAG 2.2 AA standards, with AAA as stretch goal.

---

## Core Patterns

### 1. Semantic First

```typescript
// Provide text alternative for all video content
<Video>
  <track kind="captions" src={captionsUrl} />
  <track kind="descriptions" src={audioDescUrl} />
</Video>
```

### 2. Motion Safety

```typescript
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const animationConfig = prefersReducedMotion
  ? { duration: 0 } // Instant transitions
  : { duration: 500, easing: "ease-out" };
```

### 3. Canvas Accessibility

```typescript
// Provide accessible name for canvas-based video
<canvas
  role="img"
  aria-label="Product demonstration video showing feature X"
/>
```

---

## Checklist

| Requirement                 | WCAG  | Status   |
| --------------------------- | ----- | -------- |
| Captions for all audio      | 1.2.2 | Required |
| Audio descriptions          | 1.2.5 | Required |
| No seizure-inducing flashes | 2.3.1 | Required |
| Pause/Stop controls         | 2.2.2 | Required |
| Text contrast 4.5:1         | 1.4.3 | Required |
| Focus indicators            | 2.4.7 | Required |

---

## Rules

- ✅ ALWAYS provide captions
- ✅ ALWAYS test with screen reader
- ✅ ALWAYS check flash frequency < 3Hz
- ❌ NEVER autoplay with sound
