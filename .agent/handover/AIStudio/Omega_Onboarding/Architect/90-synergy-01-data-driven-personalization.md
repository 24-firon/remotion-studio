# Synergy 01 – Data-driven Personalization (Rendering × Daten × Distribution)

## Konzept (ASCII Diagram)

```
USER REQUEST
  ↓
EDGE / WEB APP (Next.js Route / API)
  ↓
JOB QUEUE (SQS / Redis / BullMQ)
  ↓
RENDER SERVICE (Remotion local or Lambda)
  ↓
ASSET STORE (S3 / R2 / Cloudinary)
  ↓
DELIVERY (CDN) → Personalized video for each user
```

## Ziel

Aus „ein Video für alle" wird „ein Video pro User": 
- Name, KPI, Produktpaket, Region, Sprache, Brand-Theme
- Sogar personalisierte Szenen pro Segment
- Skaliert von 10 bis 1 Million Videos/Tag

**Beispiel:** User schaut sein "Jahresrückblick"-Video – mit ihrem Namen, ihrer CO₂-Bilanz, ihrem Avatar.

---

## Variante 1: On-demand Render (Schnell startbar, Low Volume)

### Setup
- Request triggert Render (HTTP → Render → Return Link).
- Gut für geringe Last, Demos, Prototyping.
- **Ideal für:** 1–50 Renders/Tag

### Code (Next.js API Route – Job Start)

```typescript
// app/api/render/route.ts
import { NextResponse } from "next/server";
import { Remotion } from "@remotion/client";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const payload = await req.json();
  // { userId, locale, kpis, theme, templateId }

  const jobId = crypto.randomUUID();

  // Option A: Direkt rendern (für kleine Clips ok)
  try {
    const buffer = await Remotion.renderMedia({
      composition: "ProductLaunch",
      serveUrl: "http://localhost:3000",
      codec: "h264",
      outputLocation: `/tmp/${jobId}.mp4`,
      inputProps: payload,
    });

    // Upload to S3
    const s3Url = await uploadToS3(buffer, jobId);

    // DB speichern
    await prisma.video.create({
      data: {
        jobId,
        userId: payload.userId,
        templateId: payload.templateId,
        status: "complete",
        downloadUrl: s3Url,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      jobId,
      status: "complete",
      downloadUrl: s3Url,
      message: "Video sofort bereit!",
    });
  } catch (error) {
    console.error("Render failed:", error);
    return NextResponse.json(
      { error: "Render failed" },
      { status: 500 }
    );
  }
}
```

### Performance-Charakteristik
- **Response Time:** 30 sec – 2 min (je nach Szenenkomplexität)
- **Parallel Renders:** 1–3 (depends auf Server-CPU)
- **Skalierbarkeit:** ⭐⭐ (nicht für große Volumina)
- **Kostensicherheit:** Niedrig (Render-Server muss laufen)

---

## Variante 2: Queue-based Batch Rendering (Production Scale)

### Setup
- Web schreibt Job in Queue (SQS/Redis/BullMQ).
- N Worker rendern asynchron parallel.
- User bekommt Status via Polling/Webhook.
- **Ideal für:** 100–100,000 Renders/Tag

### Job Payload (Beispiel)

```json
{
  "jobId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "templateId": "product-launch-2026",
  "priority": "normal",
  "user": {
    "id": "u123",
    "name": "Jan Mueller",
    "email": "jan@example.com",
    "locale": "de-DE"
  },
  "kpis": {
    "savedCO2Kg": 31.4,
    "minutesSaved": 482,
    "friendsInvited": 12,
    "purchasesCount": 5
  },
  "brand": {
    "primary": "#A6FF00",
    "secondary": "#0B0B0F",
    "font": "Inter",
    "logoUrl": "https://cdn.example.com/logo.png"
  },
  "output": {
    "format": "mp4",
    "width": 1920,
    "height": 1080,
    "fps": 60,
    "quality": "high"
  },
  "webhookUrl": "https://example.com/api/render-complete"
}
```

### Code (Redis Queue + Worker Blueprint)

```typescript
// lib/queue.ts
import Bull from "bull";

export const renderQueue = new Bull("video-render", {
  redis: { host: "127.0.0.1", port: 6379 },
});

// app/api/render-queue/route.ts (Producer)
export async function POST(req: Request) {
  const payload = await req.json();
  const jobId = crypto.randomUUID();

  const job = await renderQueue.add(
    {
      ...payload,
      jobId,
    },
    {
      jobId,
      priority: payload.priority === "high" ? 1 : 5,
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
      removeOnComplete: true,
    }
  );

  // Sofort DB updaten
  await prisma.video.create({
    data: {
      jobId,
      userId: payload.user.id,
      templateId: payload.templateId,
      status: "queued",
      position: job.id,
      createdAt: new Date(),
    },
  });

  return NextResponse.json({
    jobId,
    status: "queued",
    estimatedWaitTime: "~2 minutes",
  });
}
```

```typescript
// worker/render-worker.ts (Consumer)
import { Remotion } from "@remotion/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-central-1" });

renderQueue.process(async (job) => {
  const { jobId, templateId, user, kpis, brand, webhookUrl } = job.data;

  console.log(`[Worker] Processing ${jobId}...`);

  try {
    // Update status: rendering
    await prisma.video.update({
      where: { jobId },
      data: { status: "rendering" },
    });

    // 1) Render mit Remotion
    console.log(`[Remotion] Starting render for ${user.name}...`);
    const buffer = await Remotion.renderMedia({
      composition: templateId,
      serveUrl: process.env.REMOTION_SERVE_URL,
      codec: "h264",
      inputProps: { user, kpis, brand },
      crf: 18, // Quality (18 = high, 28 = low)
    });

    // 2) Upload to S3
    const s3Key = `videos/${user.id}/${jobId}.mp4`;
    const putCommand = new PutObjectCommand({
      Bucket: "video-renders",
      Key: s3Key,
      Body: buffer,
      ContentType: "video/mp4",
      CacheControl: "public, max-age=31536000", // 1 year
    });

    await s3.send(putCommand);
    const s3Url = `https://videos.example.com/${s3Key}`;

    // 3) DB: Status = done
    await prisma.video.update({
      where: { jobId },
      data: {
        status: "complete",
        downloadUrl: s3Url,
        completedAt: new Date(),
      },
    });

    // 4) Webhook notifizieren
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          status: "complete",
          downloadUrl: s3Url,
          user: user.email,
        }),
      });
    }

    console.log(`[Done] ${jobId} → ${s3Url}`);
    return { success: true, downloadUrl: s3Url };
  } catch (error) {
    console.error(`[Error] ${jobId}:`, error);

    // Retry logic handled by Bull
    await prisma.video.update({
      where: { jobId },
      data: { status: "failed", errorMessage: String(error) },
    });

    throw error; // Bull will retry
  }
});
```

### Performance-Charakteristik
- **Response Time:** Sofort (Job wird akzeptiert)
- **Render Time:** ~30 sec – 3 min pro Video (abhängig von Scene)
- **Parallel Renders:** 5–50+ (je nach Anzahl Worker)
- **Skalierbarkeit:** ⭐⭐⭐⭐⭐ (horizontal unbegrenzt)
- **Cost per Video:** $0.01–$0.05 (Lambda/EC2 time)

---

## Variante 3: Pre-rendered Variants + Smart Assembly (Hybrid – ROI Champion)

### Setup
- Teure Szenen werden **einmal** vorgerendert (Background, VFX, 3D Models).
- Personalisierung passiert nur in leichten **Overlay-Layern** (Text, Logo, KPI-Zahlen).
- Assembly: FFmpeg oder Remotion kombiniert die Teile.
- **Ideal für:** 10,000–1,000,000 Videos/Tag mit niedrigen Kosten

### Pattern

```
PRERENDERED (kostspielig, aber einmal):
  ├─ bg_scene_v1.mp4 (10 sec, 4K, Caustics+Volumetrics)
  └─ logo_animation.mp4 (1 sec, Loop-Ready)

PERSONALIZED (leicht, n-fach):
  ├─ text_overlay.png (Name + KPI)
  ├─ color_grade.lut (Brand-Farben)
  └─ cta_button.png (Call-to-Action)

ASSEMBLY (sekunden):
  Input: bg + logo + overlays
  Output: final.mp4 (personalisiert, 1.5 MB)
```

### Code (FFmpeg Composition)

```bash
#!/bin/bash
# compose-video.sh
# Input: template video + overlays, Output: final video

TEMPLATE=$1
NAME=$2
KPI=$3
OUTPUT=$4

ffmpeg -i "$TEMPLATE" \
  -vf "drawtext=text='$NAME':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=72:x=(w-text_w)/2:y=100:fontcolor=white" \
  -vf "drawtext=text='$KPI':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=48:x=(w-text_w)/2:y=250:fontcolor=#A6FF00" \
  -codec:v libx264 -crf 20 \
  "$OUTPUT"
```

### Performance-Charakteristik
- **Pre-render:** 5–30 min (einmalig per Template)
- **Per-Video Assembly:** 5–15 sec
- **Parallel Assembly:** 100+
- **Cost per Video:** $0.001–$0.01 (extrem günstig)
- **Skalierbarkeit:** ⭐⭐⭐⭐⭐ (beste ROI)

### Wann passt das?

```
✅ Gut für:
  - 90% der Frames sind gleich (Background, Effekte)
  - Nur Namen/KPI/Farben ändern
  - Massive Volume (10k+ Videos/Tag)
  - Budget-sensitive

❌ Nicht ideal für:
  - Jedes Video braucht komplett andere Szene
  - Sehr dynamische Personalisierung
  - Seltene, high-quality Videos
```

---

## Praktische Implementierung (End-to-End Minimal)

### Schritt 1: Template parametrisierbar machen

```typescript
// templates/ProductLaunch.tsx (Remotion Component)
import { Composition } from "remotion";

type ProductLaunchProps = {
  name: string;
  savedCO2Kg: number;
  minutesSaved: number;
  brandColor: string;
  locale: string;
};

export const ProductLaunch = ({
  name,
  savedCO2Kg,
  minutesSaved,
  brandColor,
  locale,
}: ProductLaunchProps) => {
  const formattedCO2 = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
  }).format(savedCO2Kg);

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
        padding: "4rem",
      }}
    >
      <h1 style={{ fontSize: 96, marginBottom: 40, textAlign: "center" }}>
        Hi {name}
      </h1>

      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color: brandColor,
          marginBottom: 40,
        }}
      >
        {formattedCO2} kg CO₂ gespart
      </div>

      <p style={{ fontSize: 48, marginBottom: 20 }}>
        {minutesSaved} Minuten Zeit gewonnen
      </p>

      <button
        style={{
          padding: "1rem 2rem",
          fontSize: 32,
          background: brandColor,
          color: "#0B0B0F",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Zur Seite
      </button>
    </div>
  );
};
```

### Schritt 2: Remotion Server starten

```bash
npm install remotion @remotion/cli

# Starte Remotion in watch mode für lokal Rendering
npx remotion preview
```

### Schritt 3: Render-Aufruf (CLI oder Programmatic)

```bash
# CLI: einzelnes Video
npx remotion render \
  src/index.ts \
  product-launch \
  out/u123.mp4 \
  --props='{"name":"Jan","savedCO2Kg":31.4,"minutesSaved":482,"brandColor":"#A6FF00","locale":"de-DE"}'
```

```typescript
// oder Programmatic (für Queue Worker)
import { renderMedia } from "@remotion/renderer";

const buffer = await renderMedia({
  composition: "ProductLaunch",
  serveUrl: "http://localhost:3000",
  codec: "h264",
  crf: 18,
  inputProps: {
    name: "Jan",
    savedCO2Kg: 31.4,
    minutesSaved: 482,
    brandColor: "#A6FF00",
    locale: "de-DE",
  },
});

fs.writeFileSync("out/video.mp4", buffer);
```

### Schritt 4: Upload + CDN

```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

async function uploadToS3(buffer: Buffer, userId: string, jobId: string) {
  const s3 = new S3Client({ region: "eu-central-1" });
  const key = `videos/${userId}/${jobId}.mp4`;

  await s3.send(
    new PutObjectCommand({
      Bucket: "my-videos",
      Key: key,
      Body: buffer,
      ContentType: "video/mp4",
      CacheControl: "public, max-age=31536000", // 1 year
    })
  );

  return `https://videos.cdn.example.com/${key}`;
}
```

### Schritt 5: Datenbank-Schema

```typescript
// prisma/schema.prisma
model Video {
  id        String   @id @default(cuid())
  jobId     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  templateId String
  status    String   @default("queued") // queued, rendering, complete, failed
  
  downloadUrl String?
  errorMessage String?
  
  createdAt DateTime @default(now())
  completedAt DateTime?
  
  @@index([userId])
  @@index([status])
}

model User {
  id    String @id @default(cuid())
  name  String
  email String @unique
  videos Video[]
}
```

---

## Performance-Tipps & Optimierungen

### Tipp 1: Fonts richtig handhaben
```typescript
// ❌ FALSCH: Font remote laden
<div style={{ fontFamily: "https://fonts.googleapis.com/css2?family=Inter" }}>

// ✅ RICHTIG: Font lokal bundlen
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
```

### Tipp 2: Zahlen & Datum lokalisieren
```typescript
// ✅ RICHTIG: Intl API nutzen
const formattedNumber = new Intl.NumberFormat(locale, {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
}).format(31.4);

const formattedDate = new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date());
```

### Tipp 3: Asset-Größen fixen (verhindert Layout Shift)
```typescript
// ✅ RICHTIG: width + height immer definieren
<img src="/logo.png" alt="Logo" width={200} height={100} />
```

### Tipp 4: Rendering-Mode wählen
```typescript
// Development: schnell iterieren
npx remotion preview

// Production: max quality
npx remotion render src/index.ts my-comp out.mp4 --crf 18
```

### Tipp 5: Skalierung pro Device
```typescript
// ❌ Immer 4K rendern = teuer
// ✅ BESSER: Adaptive Auflösung
const quality = deviceTier === "mobile" ? "720p" : "1080p";
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Render dauert 10+ Minuten | Template zu komplex (zu viel 3D/Effekte) | Hybrid Variante 3: Background pre-rendern, nur Overlay personalisieren |
| Zahlen passen nicht (Locale-Fehler) | Dezimaltrennzeichen/Zahlformat nicht lokalisiert | `Intl.NumberFormat(locale)` verwenden; nie `.toFixed()` direkt |
| Fonts ändern Text-Layout | Font lädt nicht deterministisch | Fonts bundlen (`@fontsource`), nie von CDN laden im Render |
| CDN Link 404 | Upload-Race-Condition (DB Update vor S3 fertig) | Upload erst, dann DB aktualisieren |
| Worker crashed / OOM | Zu viele gleichzeitige Renders | Worker-Instanzen erhöhen oder Concurrency limit senken |
| Video-Qualität schlecht | CRF zu hoch (28 statt 18) | `crf: 18` für Production, höchstens 20 |

---

## Kostenkalkulation (AWS Lambda Example)

```
Szenario: 100 Videos/Tag

Variante 1 (On-Demand Render):
  - Compute: 100 × 1 min × $0.0000002083/s ≈ $0.01/Tag
  - S3 Storage: 100 × 50 MB = 5 GB/Tag → $0.12/Monat
  - Total: ~$0.50/Monat ✅

Variante 2 (Queue + Worker, EC2):
  - EC2 Instance (c5.2xlarge): $0.34/h = ~$240/Month
  - S3 + Egress: ~$50/Month
  - Total: ~$290/Monat (viel besser für >1000 Videos/Tag)

Variante 3 (Hybrid Prerender):
  - Prerender 1x: 30 min Lambda = $0.03
  - Assembly 100x: 100 × 15 sec = ~$0.08/Tag
  - Total: ~$2.50/Monat für 100k Videos/Monat! ⭐⭐⭐
```

---

## Quellen

- Remotion Docs: https://www.remotion.dev/docs/the-fundamentals
- AWS Lambda: https://docs.aws.amazon.com/lambda/
- BullMQ (Job Queue): https://docs.bullmq.io/
- Prisma ORM: https://www.prisma.io/docs/
- FFmpeg Filters: https://ffmpeg.org/ffmpeg-filters.html

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Advanced  
**Setup-Time:** 4–6 Stunden (Architecture + Implementation)  
**ROI:** Sehr Hoch (Massenkustomisierung, niedrige Kosten, hohe Impact)