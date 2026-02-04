# Synergy 02 – Video-RAG Agent (Knowledge Base × LLM × TTS × Remotion)

## Konzept (ASCII Diagram)

```
USER QUESTION ("How do I optimize web vitals?")
  ↓
RAG RETRIEVAL (Vector DB: Embeddings + Top-K Chunks)
  ↓
LLM SCRIPT GENERATOR (structure: scenes, durations, on-screen text)
  ↓
TTS SYNTHESIS (ElevenLabs / OpenAI / Google)
  ↓
AUDIO ANALYSIS (FFmpeg: duration, waveform peaks)
  ↓
REMOTION RENDER (visuals synced to narration timing)
  ↓
DELIVERY (mp4 + transcript + chapters + search)
```

## Ziel

Ein User stellt eine Frage auf deiner Seite. Innerhalb 10 Sekunden sieht er ein präzises, visuell ansprechendes Video:
- Automatisch aus deinem Knowledge Base generiert
- Kapitelstruktur mit Navigation
- On-screen Text Highlights
- Audio (TTS) perfekt synchronisiert mit Visuals
- Transcript zum Durchsuchen
- Perfect für Support, Education, Internal Training

---

## Variante 1: Offline/Batch Rendering (Stabil, Production-Ready)

### Setup
- User stellt Frage
- System antwortet sofort mit Text-Summary
- Video wird **asynchron** in Queue gerendert
- Nach 1–5 Minuten: Link zum fertigen MP4

**Ideal für:** Häufig gestellte Fragen, Knowledge Base, Support Videos

### Performance-Charakteristik
- **User-Wartezeit:** ~2 Sekunden (nur Text-Response)
- **Video-Ready:** ~3–5 Minuten
- **Zuverlässigkeit:** ⭐⭐⭐⭐⭐ (keine Browser-Timeouts)
- **Skalierbarkeit:** Unbegrenzt (asynchrone Queue)

---

## Variante 2: Streaming Preview + Parallel Final Render (UX Optimized)

### Setup
- Sofort: animierter Text-Preview (nur Shapes + Text, 0.5 MB, schnell)
- Parallel: Final Render im Hintergrund (VFX, hochwertig, langsamer)
- User sieht in <2s etwas, und wartet dann auf das finale Video

**Ideal für:** Premium UX, wo User gerne "wartet" wenn sie sofort Feedback sehen

### Performance-Charakteristik
- **Perceived Speed:** ⭐⭐⭐⭐⭐ (instant feedback)
- **Implementation Complexity:** ⭐⭐⭐⭐ (zwei Render-Pfade)
- **Cost:** ~2x (aber besseres UX)

---

## Variante 3: Interactive Web Experience (Not Just MP4)

### Setup
- Output ist nicht nur MP4
- Sondern eine interaktive Web-Experience mit:
  - Chapter Navigation (Jump to Minute 2:34)
  - Transcript Search (Ctrl+F durch die Words)
  - Code Snippets daneben (für Tutorials)
  - Related Videos
  - Quiz/Interaktive Elemente

**Ideal für:** Enterprise Training, Product Documentation, Online Courses

### Performance-Charakteristik
- **Content Value:** ⭐⭐⭐⭐⭐ (höchstens Engagement)
- **Implementation:** ⭐⭐⭐⭐ (Frontend + Backend komplex)
- **SEO:** ⭐⭐⭐⭐⭐ (Transcript ist indexierbar)

---

## Praktische Implementierung (End-to-End Minimal)

### Schritt 1: Knowledge Base Chunking & Vector Embedding

```typescript
// lib/vectorize.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.Index("knowledge-base-2026");

export async function embedAndStore(documents: string[]) {
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
  });

  for (const doc of documents) {
    // Chunk: max 500 tokens
    const chunks = chunkText(doc, 500);

    for (const chunk of chunks) {
      const embedding = await embeddings.embedQuery(chunk);

      await index.upsert([
        {
          id: crypto.randomUUID(),
          values: embedding,
          metadata: {
            text: chunk,
            source: doc,
            timestamp: Date.now(),
          },
        },
      ]);
    }
  }
}

function chunkText(text: string, maxTokens: number): string[] {
  // Naive chunking: split by sentence, recombine
  const sentences = text.split(". ");
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > maxTokens * 4) {
      if (current) chunks.push(current);
      current = sentence;
    } else {
      current += (current ? ". " : "") + sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}
```

### Schritt 2: RAG Retrieval + LLM Script Generation

```typescript
// lib/rag.ts
import { OpenAI } from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.Index("knowledge-base-2026");
const embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY });

export interface VideoScript {
  title: string;
  summary: string;
  language: string;
  scenes: Array<{
    id: string;
    durationSec: number;
    onScreen: string; // Text der am Bildschirm steht
    narration: string; // Was die TTS spricht
    type: "intro" | "main" | "example" | "outro";
    bullets?: string[];
  }>;
}

export async function generateVideoScript(
  userQuestion: string,
  locale: string = "en"
): Promise<VideoScript> {
  // 1) RAG: Retrieve Top-K chunks
  const queryEmbedding = await embeddings.embedQuery(userQuestion);

  const results = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  const context = results.matches
    .map((match: any) => match.metadata?.text || "")
    .join("\n\n");

  // 2) LLM: Generate Script
  const systemPrompt = `Du bist ein professioneller Video-Skript-Autor für technische Tutorials.
Deine Aufgabe: Erstelle ein strukturiertes JSON-Skript für ein kurzes Erklärvideo (2-3 Minuten).

Rules:
- Nutze NUR Information aus dem Context (kein Halluzinieren!)
- Wenn etwas nicht belegt ist, schreib: "Information nicht verfügbar"
- Jede Scene hat exakte durationSec (wird später für TTS-Sync genutzt)
- onScreen = Text der am Bildschirm steht (max 150 Zeichen)
- narration = Was die TTS spricht (ausformuliert, ~30 Wörter pro 10 Sekunden)
- Struktur: intro (5s) → main (60s) → outro (10s)

Output: Valid JSON nur, kein Markdown.`;

  const userPrompt = `Question: ${userQuestion}

Context (aus Knowledge Base):
${context}

Generate a VideoScript JSON mit den Feldern:
{
  "title": "...",
  "summary": "...",
  "language": "${locale}",
  "scenes": [...]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3, // Low temperature für Konsistenz
  });

  // 3) Parse JSON
  const scriptText = response.choices[0].message.content || "";
  const script: VideoScript = JSON.parse(scriptText);

  return script;
}
```

### Schritt 3: TTS Synthesis (Audio Generation)

```typescript
// lib/tts.ts
import * as fs from "fs";
import * as https from "https";

export interface TTSResult {
  audioPath: string;
  durationSec: number;
}

export async function synthesizeAudio(
  narration: string,
  locale: string
): Promise<TTSResult> {
  // Option A: ElevenLabs (beste Qualität für viele Sprachen)
  const voiceId = locale === "de" ? "9BWtsMINT_swWv67EgWQ" : "21m00Tcm4_FsDqWAiS82"; // DE/EN Voice IDs
  
  const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: narration,
      model_id: "eleven_monolingual_v1",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!response.ok) throw new Error("TTS failed: " + (await response.text()));

  const audioBuffer = await response.arrayBuffer();
  const audioPath = `/tmp/audio_${Date.now()}.mp3`;
  fs.writeFileSync(audioPath, Buffer.from(audioBuffer));

  // Duration berechnen (1 Word ≈ 0.5 Sekunden)
  const durationSec = (narration.split(" ").length * 0.5);

  return { audioPath, durationSec };
}
```

### Schritt 4: Remotion Composition mit Script

```typescript
// compositions/VideoFromScript.tsx
import React from "react";
import { Audio, Sequence, useCurrentFrame, interpolate } from "remotion";

export interface VideoFromScriptProps {
  script: {
    title: string;
    scenes: Array<{
      id: string;
      durationSec: number;
      onScreen: string;
      type: string;
    }>;
  };
  audioPath: string;
}

export const VideoFromScript: React.FC<VideoFromScriptProps> = ({ script, audioPath }) => {
  let frameCursor = 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0B0B0F, #1a1a2e)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 72,
        fontWeight: "bold",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Audio src={audioPath} />

      {script.scenes.map((scene, i) => {
        const durationFrames = Math.round(scene.durationSec * 60); // 60 fps
        const from = frameCursor;
        frameCursor += durationFrames;

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationFrames}>
            <SceneCard
              title={script.title}
              onScreen={scene.onScreen}
              type={scene.type}
            />
          </Sequence>
        );
      })}
    </div>
  );
};

const SceneCard: React.FC<{
  title: string;
  onScreen: string;
  type: string;
}> = ({ title, onScreen, type }) => {
  const frame = useCurrentFrame();

  // Einfache Fade-In Animation
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgColor =
    type === "intro"
      ? "#A6FF00"
      : type === "main"
        ? "#0099FF"
        : type === "outro"
          ? "#FF6B6B"
          : "#666666";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, ${bgColor}20, #1a1a2e)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        padding: 96,
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0, marginBottom: 40, fontSize: 56 }}>{title}</h1>
      <p
        style={{
          margin: 0,
          fontSize: 48,
          color: bgColor,
          fontWeight: "300",
          lineHeight: 1.4,
        }}
      >
        {onScreen}
      </p>
    </div>
  );
};
```

### Schritt 5: End-to-End Orchestrierung (API Route)

```typescript
// app/api/generate-video/route.ts
import { NextResponse } from "next/server";
import { generateVideoScript } from "@/lib/rag";
import { synthesizeAudio } from "@/lib/tts";
import { renderMedia } from "@remotion/renderer";

export async function POST(req: Request) {
  const { question, locale = "en" } = await req.json();
  const jobId = crypto.randomUUID();

  // 1) Sofort: Text-Response an User
  const script = await generateVideoScript(question, locale);
  const summary = script.summary;

  // 2) Asynchron: Video in Queue
  queueVideoRender(jobId, script, locale);

  return NextResponse.json({
    jobId,
    status: "accepted",
    summary,
    message: "Video wird generiert... Fertig in ~5 Minuten.",
    pollUrl: `/api/video-status/${jobId}`,
  });
}

async function queueVideoRender(jobId: string, script: any, locale: string) {
  try {
    // 1) TTS für jede Scene
    const audioPath = `/tmp/${jobId}-audio.mp3`;
    let currentTime = 0;

    for (const scene of script.scenes) {
      const { audioPath: sceneAudio, durationSec } = await synthesizeAudio(
        scene.narration,
        locale
      );

      // Combine all scene audios (pseudo)
      // In practice: use FFmpeg concat
      scene.actualDurationSec = durationSec;
      currentTime += durationSec;
    }

    // 2) Render
    const buffer = await renderMedia({
      composition: "VideoFromScript",
      serveUrl: "http://localhost:3000",
      inputProps: { script, audioPath },
      codec: "h264",
      crf: 18,
    });

    // 3) Upload
    const s3Url = await uploadToS3(buffer, `videos/${jobId}.mp4`);

    // 4) DB Update
    await prisma.generatedVideo.create({
      data: {
        jobId,
        question,
        status: "complete",
        downloadUrl: s3Url,
        transcript: script.scenes.map((s: any) => s.narration).join("\n"),
      },
    });
  } catch (error) {
    console.error(`Video generation failed for ${jobId}:`, error);
    // DB: mark as failed
  }
}
```

### Schritt 6: Status Polling

```typescript
// app/api/video-status/[jobId]/route.ts
export async function GET(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  const video = await prisma.generatedVideo.findUnique({
    where: { jobId: params.jobId },
  });

  if (!video) {
    return NextResponse.json({ status: "not found" }, { status: 404 });
  }

  return NextResponse.json({
    jobId: video.jobId,
    status: video.status, // queued, rendering, complete, failed
    downloadUrl: video.downloadUrl,
    transcript: video.transcript,
  });
}
```

---

## Performance-Tipps

### Tipp 1: Script-Struktur streng definieren
```typescript
// ✅ RICHTIG: Validierung
const scriptSchema = z.object({
  title: z.string().max(100),
  scenes: z.array(z.object({
    durationSec: z.number().positive(),
    onScreen: z.string().max(150),
    narration: z.string().max(500),
  })),
});
```

### Tipp 2: TTS Duration kalibrieren
```typescript
// Durchschnittlich: 1 Wort = 0.5 Sekunden
// Aber: TTS gibt dir echte Duration zurück
const actualDuration = getTTSDuration(audioBuffer);
// Nutze actualDuration, nicht Schätzung
```

### Tipp 3: Scenes synchronisieren (Audio + Video)
```typescript
// ❌ FALSCH: Video 5s, Audio 6s
// ✅ RICHTIG: Video Duration = Total Audio Duration

const totalDurationSec = script.scenes.reduce(
  (sum, s) => sum + s.actualDurationSec, 
  0
);
```

### Tipp 4: Fact Guardrails
```typescript
// Bei jedem LLM-Output: "Cite Source oder Mark as Unknown"
if (!context.includes(claim)) {
  scene.narration = "Dieser Punkt ist in unserer Wissensbasis nicht dokumentiert.";
}
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Video sagt falsche Fakten | RAG liefert falschen Kontext / LLM halluziniert | Top-K erhöhen; Reranking; "Unknown" als sicherer Default |
| Audio läuft länger als Video | TTS Duration = 6s, aber Remotion Duration = 5s | Immer TTS first machen, dann Scene-Duration danach anpassen |
| Text überlappt / zu klein | Zu lange OnScreen Text für verfügbaren Platz | Max 100–120 Zeichen; Auto-Wrap; Test auf Mobile |
| Render super langsam | Zu viele Szenen / Effekte | Preview-Mode (Text-only) für schnelle Iteration |
| QA: Video hört plötzlich auf | Audio-Concatenation fehlgeschlagen | FFmpeg concat mit `demuxer concat` testen |

---

## Verwendungsbeispiele

### Beispiel 1: Support Chatbot
```
User: "Wie optimiere ich LCP?"
System: 
  1) Text-Response sofort
  2) Video "LCP Optimization Guide" in 5 min ready
  3) Transcript + Timestamps durchsuchbar
```

### Beispiel 2: Internal Knowledge Base
```
New Employee: "Was ist unsere Tech Stack?"
System:
  1) Automatisch generiertes Video aus Company Docs
  2) Mit aktuellem Stand (nicht outdated)
  3) Mit Transcript zum Download
```

### Beispiel 3: Product Documentation
```
Dev: "Wie nutze ich Feature X?"
System:
  1) Kurz-Video (2 min)
  2) Mit Code-Snippets daneben
  3) Related Links + Further Reading
```

---

## Quellen

- Remotion: https://www.remotion.dev/docs
- Pinecone Vector DB: https://docs.pinecone.io/
- ElevenLabs TTS: https://elevenlabs.io/docs/api-reference/text-to-speech
- LangChain RAG: https://python.langchain.com/docs/modules/data_connection/
- OpenAI API: https://platform.openai.com/docs/api-reference

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Advanced  
**Setup-Time:** 6–8 Stunden (integrating all pieces)  
**ROI:** Extrem Hoch (Skalierbare Knowledge Videos, Automatisiert, Always Fresh)