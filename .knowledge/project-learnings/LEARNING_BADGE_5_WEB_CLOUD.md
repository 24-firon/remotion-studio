# 📝 PROJECT LEARNING: Badge 5 (Web Patterns & Cloud Integration)

**Date:** 2026-01-31 (V3.1 Auditor Edition)
**Badge:** 5
**Report Baseline:** `EXTRACTION_REPORT_BADGE_5.md`

## 🎯 Strategische Erkenntnisse

- **Performance-Dualismus:** Wir haben gelernt, dass LCP-Optimierung in Remotion-Web-Heros nur durch den "Start Frame First" Ansatz (AVIF Placeholder + Lazy Loading) möglich ist, um 100er Lighthouse-Scores zu erzielen.
- **Deterministic Cloud Rendering:** Die Aufteilung eines Videos in exakte Chunks für AWS Lambda (parallel rendering) ermöglicht eine Zeitersparnis von bis zu 85%.

## 🔬 Research Notes (Kategorie C)

### 1. Start Frame First (LCP Optimization)

Next.js-spezifisches Pattern für Video-Heros. Um den LCP unter 2.5s zu halten, wird das erste Frame des Videos als statisches `.avif` mit `priority`-Flag geladen, während die schwere 3D-Szene/das Video asynchron nachgeladen wird.

```tsx
<Image src="/hero-first-frame.avif" priority />;
const HeavyCanvasScene = dynamic(() => import("./HeavyCanvasScene"), {
  ssr: false,
});
```

### 2. Real-Time AI Streaming Architektur

Experimenteller Workflow (Jan 2026) zum Streamen von KI-generierten Frames (LTX-2) direkt in den Browser-Canvas via WebSockets/FAL.ai. Dies umgeht das 10-minütige Render-Waiting.

```tsx
onUpdate: (update) => {
  if (update.current_video_frame && canvasRef.current) {
    img.src = update.current_video_frame; // Base64 Stream
  }
};
```

## 📊 Extraktions-Effizienz

- **MITNEHMEN:** 6 Items (Focus Nav, Tier Detection, Scroll-Scrubbing, Lambda Logic).
- **DROP:** 12 Items (Redundanzen zu Skill & Standard Web).
