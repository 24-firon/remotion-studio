# AI Hybrid Workflow – Code + KI ohne Kontrollverlust

## Konzept (ASCII Diagram)

```
PRODUCTION PIPELINE (Dein Workflow v1.0)

[IDEE] 
  ↓
[REMOTION CODE] ─→ Playblast (Grau, perfektes Timing)
  ↓
[KI-STYLIZER]  ─→ Image-to-Video / Video-to-Video
  ↓
[COMPOSITE]    ─→ Logo/Text Layer drüber (Schutz)
  ↓
[DLSS 4.5]     ─→ Upscale + Glätten
  ↓
[WEB-ASSET]    ─→ Deployment (Scroll-Scrubbing oder Streaming)
```

## Was ist das?

Du willst **"Kino-Look"** (KI) UND **100% deterministische Elemente** (Logo, Layout, Timing) gleichzeitig.

Das Problem: Wenn du der KI alles gibst, halluziniert sie dein Logo.  
Die Lösung: **Layering** – Code rendert das, was niemals "driften" darf; KI rendert Look/Atmosphäre darüber.

---

## Variante 1: Code-only (Maximum Kontrolle, Maximum Zuverlässigkeit)

### Setup
- **Remotion/React/Shader:** Timing, Kamera, Fokus, Lichtmodell deterministisch.
- **Output:** Web-Asset (live) oder Video (prerendered).
- **Vorteil:** Logo und Fokus sind 100% garantiert gleich.
- **Nachteil:** "Kino-Look" kommt vom Code, ist mathematisch limitiert.

### Code (Remotion Blueprint)

```tsx
// composition.tsx
import { Composition } from "remotion";
import { MetallicButtonScene } from "./scenes/MetallicButtonScene";

export const MyComposition = () => {
  return (
    <Composition
      id="prod-video"
      component={MetallicButtonScene}
      durationInFrames={300}
      fps={60}
      width={1920}
      height={1080}
      defaultProps={{
        lightX: 0.5,
        lightY: 0.2,
      }}
    />
  );
};

// scenes/MetallicButtonScene.tsx
import { useCurrentFrame, interpolate } from "remotion";

export const MetallicButtonScene = ({ lightX, lightY }) => {
  const frame = useCurrentFrame();

  // Timing ist EXAKT vorherbestimmt
  const focusShift = interpolate(frame, [0, 150, 300], [0, 1, 0]);
  const metalShine = interpolate(frame, [50, 150, 250], [0, 0.8, 0]);

  return (
    <div style={{ background: "#1a1a1a", width: "100%", height: "100%" }}>
      <canvas
        id="metal-button"
        width={1920}
        height={1080}
        ref={(canvas) => {
          if (!canvas) return;
          const ctx = canvas.getContext("2d");

          // Shader-Code für Metall (deterministisch)
          ctx.fillStyle = `rgba(200, 200, 200, ${metalShine})`;
          ctx.fillRect(800, 400, 300, 200); // Button

          // Logo (GESCHÜTZT, wird niemals von KI verändert)
          ctx.fillStyle = "#fff";
          ctx.font = "bold 40px Arial";
          ctx.fillText("MY BRAND", 850, 480);
        }}
      />
    </div>
  );
};
```

### Performance-Charakteristik
- **Render-Speed:** 2–5 Min für 10 Sekunden Video (lokal)
- **Konsistenz:** 100%
- **File-Size:** 50–200 MB (abhängig von Quality)

---

## Variante 2: Code-Skeleton → KI-Render ("Look drüber")

### Setup
1. **Remotion "Playblast":** Graue Shapes, sauberes Timing, saubere Motion.  
2. **KI:** Image-to-Video / Video-to-Video nur als "Stylizer" – NICHT als Generator.  
3. **Re-Composite:** Logo/Text als Top-Layer aus Remotion darüberlegen.

**Warum das funktioniert:** Die KI darf nur die "Haut" verändern, nicht die "Geometrie".

### Code (Complete Workflow)

**Schritt 1: Remotion Draft rendern**
```tsx
// Exportiere Remotion als MP4 (Draft-Qualität, schnell)
npx remotion render production prod-video output.mp4 \
  --codec=h264 \
  --quality=25 \
  --height=1080
```

**Schritt 2: KI Stylization (via ComfyUI oder API)**
```python
# Python: Input-Video → LTX-2 / AnimateDiff (Image-to-Video)
from fal_ai import submit

result = submit(
    "fal-ai/ltx-2",
    arguments={
        "input_image": "first_frame.jpg",  # Erstes Frame als Referenz
        "prompt": "cinematic metallic button with photorealistic lighting, "
                  "soft reflections, product photography style",
        "negative_prompt": "blurry, distorted, text artifacts",
        "num_frames": 300,
        "fps": 60,
    }
)

# Speichere Output
open("stylized.mp4", "wb").write(result["video"])
```

**Schritt 3: Composite (Logo + Text schützen)**
```bash
# FFmpeg: Stylized-Video + Logo-Layer kombinieren
ffmpeg -i stylized.mp4 \
       -i logo-layer.png \
       -filter_complex "[0][1]overlay=x=800:y=400" \
       final.mp4
```

### Performance-Charakteristik
- **Total-Time:** 15–20 Min (Remotion 2 Min + KI 10 Min + Composite 1 Min)
- **Konsistenz:** 95% (KI-Rauschen minimal durch Single-Pass)
- **Qualität:** Kino-Level

---

## Variante 3: KI-Scenes + Code-UI (Web-Experience)

### Setup
- **KI liefert:** Background/Atmosphäre (loop / scrubbing clip).
- **Code liefert:** UI, Fokus, Scroll-Logik und Interaktivität.
- **Vorteil:** Maximale Flexibilität, beide arbeiten unabhängig.
- **Nachteil:** Risiko der "Desynchronisation" (KI-Video und Code-Timing passen nicht zusammen).

### Code (React + Scroll-Integration)

```tsx
import React, { useRef } from "react";

export const HybridWebExperience = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollFraction, setScrollFraction] = React.useState(0);

  const handleScroll = () => {
    const scrollFraction =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    setScrollFraction(scrollFraction);

    // Synchro: Video an Scroll binden
    if (videoRef.current) {
      videoRef.current.currentTime =
        scrollFraction * videoRef.current.duration;
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ minHeight: "300vh" }}>
      {/* KI-generiertes Background-Video */}
      <video
        ref={videoRef}
        src="/ai-atmosphere.webm"
        muted
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
          objectFit: "cover",
        }}
      />

      {/* Code-gesteuertes UI darüber */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "100vh",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "4rem",
            opacity: scrollFraction > 0.2 ? 1 : 0,
            transition: "opacity 500ms ease",
          }}
        >
          {scrollFraction > 0.5 ? "Your Brand" : "Welcome"}
        </h1>

        {/* Interaktiver Button (Code-basiert) */}
        <button
          onClick={() => alert("Clicked!")}
          style={{
            marginTop: "2rem",
            padding: "1rem 2rem",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          Explore More
        </button>
      </div>
    </div>
  );
};
```

### Performance-Charakteristik
- **Render-Zeit:** Nur 1x KI-Video (5–10 Min)
- **Web-Performance:** Sehr gut (Code ist leicht, Video streamt)
- **Konsistenz:** Abhängig von KI-Stabilität

---

## Praktische Entscheidungs-Matrix

| Wenn du willst… | Nimm |  Grund |
|---|---|---|
| Logo 100% identisch in allen Frames | **Variante 1** | Logo ist Code, nicht KI-generiert |
| Maximum Look, aber noch predictable | **Variante 2** | KI nur als "Polish", Basis von Code |
| Web-Experience mit scrollbarem Video | **Variante 3** | Beste Web-Performance |
| Surreale Kunst (Deep Dream 2.0) | **Variante 2** mit high chaos | LTX-2 mit sehr viel Randomness |

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| KI verändert Text/Logo | KI darf Kernasset anfassen | Logo/Text als separater Top-Layer (Composite-Pass) |
| "Flicker" zwischen Frames | Temporale Instabilität | Mehr Samples bei KI-Generation, oder "Temporal Guidance" aktivieren |
| Video-Timing passt nicht mit UI-Animationen | Synchronisierungs-Problem | `useCurrentFrame()` in Remotion nutzen; in Web: `currentTime` an Scroll binden |
| KI-Video ist zu klein (z.B. 720p) | Budget-Limit bei Cloud-KI | Lokal mit LTX-2 rendern (RTX 4080 schafft 1080p) oder zu AVIF upscalen via DLSS |
| Composite macht Video zu groß | Zu viele Overlay-Passes | Pre-multiply Logo in Remotion statt FFmpeg Composite |

---

## Workflow-Checkliste (Für Produktives Arbeiten)

- [ ] **Idee → Storyboard** (Text/Sketch)
- [ ] **Remotion Draft rendern** (5–10 Min, schnelle Iteration)
- [ ] **Timing überprüfen** (Ist Fokus an richtiger Stelle?)
- [ ] **KI-Prompt schreiben** (Was soll es aussehen wie?)
- [ ] **KI-Pass starten** (15–30 Min, Cloud oder Lokal)
- [ ] **Logo-Layer vorbereiten** (PNG mit Transparenz)
- [ ] **Composite** (FFmpeg oder DaVinci)
- [ ] **DLSS Upscale + Denoising** (2–5 Min, deine RTX 4080)
- [ ] **QA-Check** (Logo korrekt? Timing stimmt? Flimmer?)
- [ ] **Export** (Web-ready WebM/MP4)

---

## Quellen

- Remotion Docs: https://www.remotion.dev/docs/the-fundamentals
- LTX-2 Integration: https://github.com/lumalabs/llm-examples
- FFmpeg Compositing: https://ffmpeg.org/documentation.html

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Advanced  
**Setup-Time:** 2–4 Stunden (um Workflow zu etablieren)  
**ROI:** Sehr Hoch (Kino-Qualität + Kontrolle)