# Web Patterns 10 – Real-Time AI Video Streaming (Experimental)

## Konzept (ASCII Diagram)

```
REAL-TIME AI VIDEO PIPELINE (2026)

[USER INPUT: Prompt/Control]
  ↓
[DIFFUSION MODEL: LTX-2 / SVD]
  ↓
[FRAME BUFFER: WebSocket Stream]
  ↓
[USER BROWSER: Canvas/Video Display]
  ↓
[REAL-TIME FEEDBACK: 30-60 FPS]

⚠️ Warning: Experimental. Requires GPU cloud (Firebase ML, Replicate, fal.ai).
```

## Was ist das?

Statt traditionelles Pre-Rendering (10+ Minuten), generierst du Video **im Stream**:
- User macht Input (z.B. Prompt ändern)
- KI generiert nächste 5–10 Frames
- Browser rendert direkt
- Resultat: **Live Video Generation** mit User-Interaktivität

Das ist das "Zukunft von Content Creation".

⚠️ **Disclaimer:** Das ist experimentell (Jan 2026). Stabilität variiert je nach Anbieter.

---

## Variante 1: Replicate + React (Easiest Start)

### Setup
- Replicate hostet KI-Modelle (LTX-2, SVD, Dynamicrafter)
- Streaming-API für echte Real-Time Output
- Kostenlos für erste 1h Compute, dann ~$0.001/s

### Code (React Streaming)

```bash
npm install replicate
```

```tsx
import React, { useState, useRef } from "react";

export const ReplicateStreamingVideo = () => {
  const [prompt, setPrompt] = useState(
    "cinematic metallic button with reflections"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frames, setFrames] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setFrames([]);

    try {
      // Replicate API aufruf mit Streaming
      const response = await fetch(
        "https://api.replicate.com/v1/predictions",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${process.env.REACT_APP_REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            version:
              "8daec0aae28efc90d12d37e86e6ce646e67c6430a9998649f4ab371f78f27a7e", // LTX-2
            input: {
              prompt: prompt,
              num_frames: 60, // 1 Sekunde @ 60fps
              width: 1280,
              height: 720,
            },
            stream: true, // Kritisch: Streaming aktivieren
          }),
        }
      );

      if (!response.body) throw new Error("No response body");

      // StreamReader für echtes Streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value);
        const lines = buffer.split("\n");

        // Verarbeite alle vollständigen Lines
        for (let i = 0; i < lines.length - 1; i++) {
          try {
            const data = JSON.parse(lines[i]);

            // Wenn ein neues Frame kommt, direkt in Video-Buffer schreiben
            if (data.output?.frames?.[0]) {
              setFrames((prev) => [...prev, data.output.frames[0]]);

              // Aktualisiere Video-Canvas live
              if (videoRef.current) {
                const canvas = document.createElement("canvas");
                const img = new Image();
                img.onload = () => {
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.drawImage(img, 0, 0);
                  }
                };
                img.src = data.output.frames[0];
              }
            }

            // Progress Updates
            if (data.status === "processing") {
              console.log(`Progress: ${data.progress * 100}%`);
            }
          } catch (e) {
            // JSON parse failed, accumulate
          }
        }

        // Behalte letzten unvollständigen Line
        buffer = lines[lines.length - 1];
      }
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Real-Time AI Video Generation</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "100%",
          height: "100px",
          marginBottom: "1rem",
          padding: "0.5rem",
        }}
        placeholder="Enter your video prompt..."
      />

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          cursor: isGenerating ? "not-allowed" : "pointer",
          opacity: isGenerating ? 0.5 : 1,
        }}
      >
        {isGenerating ? "Generating..." : "Generate Video"}
      </button>

      {frames.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Generated Frames: {frames.length}/60</h2>
          <video
            ref={videoRef}
            width={1280}
            height={720}
            controls
            style={{ borderRadius: "8px", marginTop: "1rem" }}
          >
            {/* Frames werden als Blob zusammengefügt */}
          </video>
        </div>
      )}
    </div>
  );
};
```

### Performance-Charakteristik
- **Latency:** 30–60 Sekunden bis erstes Frame (Model Loading)
- **Frame Rate:** 2–5 FPS (AI-Inferenz ist slow)
- **Cost:** $0.02–$0.05 pro 60-Frame-Clip
- **Quality:** 1080p möglich (etwas rauschig)

---

## Variante 2: FAL.ai + Canvas Streaming (Better Performance)

### Setup
- FAL.ai hat bessere GPU-Cluster (schneller Inference)
- Optimiert für Streaming
- Kostenlos: erste $0.50/Tag

### Code (FAL Streaming)

```bash
npm install @fal-ai/client
```

```tsx
import React, { useState, useRef, useEffect } from "react";
import * as fal from "@fal-ai/client";

export const FALStreamingVideo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("idle");
  const frameBufferRef = useRef<ImageData[]>([]);

  const handleStream = async (prompt: string) => {
    setStatus("generating");

    try {
      const result = await fal.subscribe(
        "fal-ai/ltx-2", // Model
        {
          input: {
            prompt: prompt,
            num_frames: 120, // 2 Sekunden @ 60fps
            fps: 60,
            guidance_scale: 7.5,
          },
          // Streaming callback für jedes Frame
          onUpdate: (update) => {
            if (update.status === "processing") {
              setStatus(`Processing: ${update.progress}%`);

              // Live Frame Render
              if (update.current_video_frame && canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                // FAL gibt base64 zurück
                const img = new Image();
                img.onload = () => {
                  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = update.current_video_frame;
              }

              // Buffer Frame für späteren Export
              if (update.current_frame_index) {
                console.log(`Frame ${update.current_frame_index}/120`);
              }
            }
          },
        }
      );

      // Finale Video-URL
      setStatus("complete");
      console.log("Final video:", result.video);

      // Speichern oder Anzeigen
      if (result.video) {
        const a = document.createElement("a");
        a.href = result.video;
        a.download = "generated-video.mp4";
        a.click();
      }
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>FAL Real-Time Video Streaming</h1>

      <button onClick={() => handleStream("beautiful landscape with mountains")}>
        Generate Video
      </button>

      <p>Status: {status}</p>

      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        style={{
          border: "2px solid #ccc",
          borderRadius: "8px",
          marginTop: "1rem",
        }}
      />
    </div>
  );
};
```

### Performance-Charakteristik
- **Latency:** 10–30 Sekunden (besser als Replicate)
- **Frame Rate:** 3–8 FPS real-time
- **Cost:** $0.01–$0.03 pro 120-Frame-Clip
- **Quality:** 1080p, cleaner output

---

## Variante 3: Self-Hosted (Maximum Control, Requires GPU)

### Setup
- Lokal oder auf deinem Server
- Modell: Stable Video Diffusion (SVD) oder LTX-2
- Hardware: RTX 4080 minimum (RTX 4090 für 60 FPS)

### Code (LocalComfyUI + WebSocket)

```typescript
// Backend: Node.js + WebSocket
import WebSocket from "ws";
import { spawn } from "child_process";

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", async (msg) => {
    const { prompt, frames } = JSON.parse(msg);

    // ComfyUI API aufrufen (Video Generation)
    const pythonProcess = spawn("python", [
      "./generate_video.py",
      `--prompt="${prompt}"`,
      `--frames=${frames}`,
    ]);

    let frameCount = 0;

    pythonProcess.stdout.on("data", (data) => {
      // Jedes Frame streamen
      const frameBase64 = data.toString();
      frameCount++;

      ws.send(
        JSON.stringify({
          type: "frame",
          data: frameBase64,
          frameIndex: frameCount,
        })
      );
    });

    pythonProcess.on("close", () => {
      ws.send(JSON.stringify({ type: "complete" }));
    });
  });
});
```

```tsx
// Frontend: React + WebSocket
export const SelfHostedStreaming = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8080");

    wsRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "frame") {
        // Render Frame
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = new Image();
        img.onload = () => {
          ctx?.drawImage(img, 0, 0, canvas!.width, canvas!.height);
        };
        img.src = `data:image/png;base64,${msg.data}`;
      }
    };

    return () => wsRef.current?.close();
  }, []);

  const handleGenerate = (prompt: string) => {
    wsRef.current?.send(
      JSON.stringify({
        prompt,
        frames: 120,
      })
    );
  };

  return (
    <div>
      <button onClick={() => handleGenerate("blue metallic sphere")}>
        Generate
      </button>
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        style={{ border: "1px solid black", marginTop: "1rem" }}
      />
    </div>
  );
};
```

### Performance-Charakteristik
- **Latency:** 5–15 Sekunden (sehr schnell!)
- **Frame Rate:** 10–30 FPS real-time
- **Cost:** $0 (dein GPU)
- **Quality:** 4K möglich
- **Constraint:** GPU muss immer an sein

---

## Praktische Presets & Tipps

### Preset 1: "Fast Prototyping" (Replicate)
```
- Modell: LTX-2 (fast inference)
- Frames: 30–60 (kurze Clips)
- Resolution: 720p
- Cost: ~$0.01 pro Clip
```

### Preset 2: "High Quality" (FAL.ai)
```
- Modell: LTX-2 mit Upscaling
- Frames: 120 (2 Sekunden)
- Resolution: 1080p
- Cost: ~$0.03 pro Clip
```

### Preset 3: "Batch Production" (Self-Hosted)
```
- Modell: SVD 1.1 (optimiert für Batch)
- Queue: 10–50 Jobs
- Auto-Retry: On Failure
- Cost: $0 (dein Hardware)
```

---

## Häufige Fehler & Lösungen

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Frame-Stream stoppt mitten | Timeout bei großen Models | Höheres Timeout setzen; kleinere Frames probieren |
| Video "laggy" | WebSocket-Buffer zu klein | `bufferSize` erhöhen; Frames komprimieren |
| OOM Error | GPU-Speicher reicht nicht | Kleinere Batch-Größe; oder 4090 nutzen |
| Prompt wird ignoriert | Falsche Model-Version | LTX-2 nutzen (aktuell best); nicht SVD 1.0 |
| Qualität ist noisy | Inference-Steps zu gering | guidance_scale erhöhen; more num_inference_steps |

---

## Zukunftsausblick (2026+)

```
H1 2026:
  └─ LTX-3 Release (noch schneller, bessere Quality)
     
H2 2026:
  └─ Streaming bis 120 FPS möglich
  └─ Real-Time Prompt-Änderung (nicht nur am Start)
     
2027+:
  └─ Neural Rendering (pixel-perfect control)
  └─ Volumetric Video (6 DOF)
```

---

## Quellen

- Replicate API: https://replicate.com/api/streaming
- FAL.ai LTX-2: https://www.fal.ai/models/ltx-2
- ComfyUI LocalSetup: https://github.com/comfyanonymous/ComfyUI
- WebSocket Streaming Patterns: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

---

**Version:** v0.9 (Experimental – Jan 2026)  
**Difficulty:** Advanced  
**Setup-Time:** 30 Min (Cloud) – 4h (Self-Hosted)  
**ROI:** Sehr Hoch (Future-Proof, aber noch unstabil)