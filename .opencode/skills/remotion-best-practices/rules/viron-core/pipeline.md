# 5. REMOTION RENDERING PIPELINE & DEPLOYMENT

**Dokumentversion:** 1.0 | Januar 2026

## Die Rendering-Pipeline Architektur

```
Source Code (Git)
    ↓
Build Stage (npm run build)
    ↓
Composition Definition
    ↓
Frame Generation (Chrome Headless)
    ├─ Render Worker 1 → Frames 0-50
    ├─ Render Worker 2 → Frames 50-100
    ├─ Render Worker N → Frames N-M
    ↓
Frame Encoding (ffmpeg)
    ├─ H.264 (MP4)
    ├─ VP9 (WebM)
    └─ ProRes (MOV)
    ↓
Output Artifact
    ├─ Video File (5-10GB)
    ├─ Metadata (JSON)
    └─ Thumbnail (PNG)
```

## Rendering-Modi in Remotion

### 1. Local Development Rendering

```bash
# Schnelle Vorschau
npx remotion preview src/Video.tsx

# Test-Render (10 Frames)
npx remotion render src/Video.tsx my-composition \
  --frames 0-10 \
  output.mp4

# Full Local Render
npx remotion render src/Video.tsx my-composition \
  output.mp4 \
  --codec h264 \
  --audio-codec aac \
  --concurrency 4
```

### 2. Lambda Rendering (Serverless / Production)

```typescript
// src/renderVideo.ts
import { renderMediaOnLambda } from '@remotion/lambda';

export const renderVideoOnLambda = async () => {
  const { renderId } = await renderMediaOnLambda({
    region: 'eu-central-1',
    composition: 'my-composition',
    framesPerLambda: 4, // Frames pro Lambda-Instanz
    concurrencyPerLambda: 3,
    codec: 'h264',
    outputLocation: 's3://my-bucket/videos/output.mp4',
    inputProps: {
      // Props für Composition
    },
  });

  console.log('Render ID:', renderId);
};
```

### 3. Renderer API (Programmatic)

```typescript
// @remotion/renderer - Node.js API
import { renderMedia } from '@remotion/renderer';

async function renderVideo() {
  const outputPath = './output.mp4';

  const { frameCount } = await renderMedia({
    composition: {
      id: 'main-video',
      component: MyVideoComponent,
      durationInFrames: 300,
      fps: 60,
      width: 1920,
      height: 1080,
      defaultProps: {
        /* Props */
      },
    },
    outputLocation: outputPath,
    codec: 'h264',
    audioCodec: 'aac',
    videoBitrate: '8000k',
    audioBitrate: '192k',
    pixelFormat: 'yuv420p',
    concurrency: 8,
    onProgress: (progress) => {
      console.log(`Progress: ${progress.renderedFrames}/${frameCount}`);
    },
  });

  console.log(`Rendering complete! ${frameCount} frames rendered`);
}
```

## Codec & Format Spezifikationen

### H.264 (MP4) - Standard Web

```typescript
{
  codec: 'h264',
  videoBitrate: '8000k',    // 8Mbps für 1920x1080@60fps
  audioCodec: 'aac',
  audioBitrate: '192k',
  pixelFormat: 'yuv420p',   // Colorspace für Compatibility
}
```

**Wann:** Web, YouTube, Social Media, universelle Kompatibilität

### VP9 (WebM) - Modern/Streaming

```typescript
{
  codec: 'vp9',
  videoBitrate: '5000k',    // Bessere Kompression
  audioCodec: 'opus',       // Moderner Audio-Codec
  pixelFormat: 'yuv420p',
}
```

**Wann:** Modern browsers, Netflix-like streaming

### ProRes (MOV) - Professional

```typescript
{
  codec: 'prores',
  proresProfile: 'hq',      // HQ = Higher Quality
  audioCodec: 'pcm',        // Unkomprimiertes Audio
  pixelFormat: 'yuv422p10le', // 10-bit für Color Grading
}
```

**Wann:** Color Grading, Professional Workflows, Archive

## Rendering-Optimierungen

### 1. Concurrency Berechnung

```typescript
import os from 'os';

const availableCPUs = os.cpus().length;
const ramGB = os.totalmem() / (1024 ** 3);

// Faustregel: 1-2 Prozesse pro CPU
const optimalConcurrency = Math.floor(availableCPUs * 1.5);

// Aber limitiert durch RAM (pro Prozess ~500MB)
const ramLimit = Math.floor(ramGB / 2); // Halbes RAM für Rendering

const recommendedConcurrency = Math.min(optimalConcurrency, ramLimit, 16);
console.log(`Recommended: ${recommendedConcurrency} processes`);
```

### 2. Framing Strategy

```typescript
// Render große Videos in ChunksRendere große Videos in Chunks
export const renderLargeVideo = async () => {
  const TOTAL_FRAMES = 7200; // 2 Minuten @ 60fps
  const FRAMES_PER_CHUNK = 600; // 10 Sekunden
  const chunks = Math.ceil(TOTAL_FRAMES / FRAMES_PER_CHUNK);

  for (let i = 0; i < chunks; i++) {
    const from = i * FRAMES_PER_CHUNK;
    const to = Math.min((i + 1) * FRAMES_PER_CHUNK, TOTAL_FRAMES);

    const output = `./chunks/part-${i}.mov`;

    await renderMedia({
      composition: { /* ... */ },
      outputLocation: output,
      codec: 'prores',
      frameRange: [from, to],
    });

    console.log(`Chunk ${i + 1}/${chunks} complete`);
  }

  // Kombiniere Chunks mit ffmpeg
  await combineChunks('./chunks/part-*.mov', './output-final.mov');
};

async function combineChunks(inputPattern: string, output: string) {
  // ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mov
  // ...
}
```

### 3. GPU-Beschleunigung

```typescript
// remotion.config.ts
import { Config } from '@remotion/cli/config';

// Chrome for Testing (GPU-Support auf Linux)
Config.setChromeMode('chrome-for-testing');

// OpenGL Renderer verwenden
Config.setChromiumOpenGlRenderer('angle'); // oder 'egl'

// Höhere Pixel-Ratio für schnelleres Rendering
Config.setPixelFormat('yuv420p');
```

## Rendering Monitoring & Logging

```typescript
// src/renderMonitor.ts
import { renderMedia } from '@remotion/renderer';
import fs from 'fs';

interface RenderMetrics {
  startTime: number;
  totalFrames: number;
  renderedFrames: number;
  droppedFrames: number;
  fps: number;
  estimatedComplete: Date;
}

export const renderWithMonitoring = async (
  composition: any,
  outputPath: string
) => {
  const startTime = Date.now();
  const metrics: RenderMetrics = {
    startTime,
    totalFrames: composition.durationInFrames,
    renderedFrames: 0,
    droppedFrames: 0,
    fps: 0,
    estimatedComplete: new Date(),
  };

  const { frameCount } = await renderMedia({
    composition,
    outputLocation: outputPath,
    concurrency: 8,
    onProgress: (progress) => {
      const elapsed = (Date.now() - startTime) / 1000;
      const fps = progress.renderedFrames / elapsed;
      const remaining = metrics.totalFrames - progress.renderedFrames;
      const secondsLeft = remaining / fps;

      metrics.renderedFrames = progress.renderedFrames;
      metrics.fps = fps;
      metrics.estimatedComplete = new Date(Date.now() + secondsLeft * 1000);

      console.log(`
        ╭─ Rendering Progress
        ├─ Frames: ${progress.renderedFrames}/${metrics.totalFrames}
        ├─ FPS: ${fps.toFixed(2)}
        ├─ Elapsed: ${(elapsed / 60).toFixed(1)} min
        ├─ ETA: ${metrics.estimatedComplete.toLocaleTimeString()}
        ╰─ Status: ${progress.isStill ? 'STILL' : 'RENDERING'}
      `);
    },
    onError: (error) => {
      console.error('Rendering Error:', error);
      metrics.droppedFrames++;
    },
  });

  const totalTime = (Date.now() - startTime) / 1000;
  console.log(`✓ Complete in ${(totalTime / 60).toFixed(1)} minutes`);
  console.log(`  Frame Rate: ${(frameCount / totalTime).toFixed(2)} FPS average`);

  return metrics;
};
```

## Docker-basiertes Rendering

```dockerfile
# Dockerfile - Remote Production Rendering
FROM node:20-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
  chromium \
  ffmpeg \
  ca-certificates

# Copy project
COPY package*.json ./
RUN npm ci

COPY . .

# Build
RUN npm run build

# Render command
CMD ["npm", "run", "render"]
```

```bash
# docker build -t video-renderer .
# docker run -v $(pwd)/output:/app/output video-renderer
```

## CI/CD Integration (GitHub Actions)

```yaml
# .github/workflows/render-video.yml
name: Render Video

on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'remotion.config.ts'

jobs:
  render:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Render video
        run: npm run render

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: rendered-videos
          path: output/

      - name: Upload to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp output/ s3://my-bucket/videos/ --recursive
```

## Lambda Deployment

```typescript
// src/deployToLambda.ts
import { deployFunction, deployComposition } from '@remotion/lambda';

export const deployToLambda = async () => {
  const { functionName } = await deployFunction({
    region: 'eu-central-1',
    timeoutSeconds: 900,
    memorySizeInMb: 3009,
    diskSizeInMb: 10240,
    // Optional: Custom env variables
    environment: {
      MY_API_KEY: process.env.MY_API_KEY,
    },
  });

  console.log(`Lambda function deployed: ${functionName}`);

  // Deploy composition
  const { serveUrl } = await deployComposition({
    region: 'eu-central-1',
    entryPoint: 'src/Video.tsx',
    functionName,
    compositeName: 'my-composition',
  });

  console.log(`Serve URL: ${serveUrl}`);
};
```

## Fehlerbehandlung & Retry-Logik

```typescript
export const renderWithRetry = async (
  composition: any,
  outputPath: string,
  maxRetries = 3
) => {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const result = await renderMedia({
        composition,
        outputLocation: outputPath,
        concurrency: 8,
      });

      console.log(`✓ Rendering succeeded on attempt ${attempt + 1}`);
      return result;
    } catch (error) {
      attempt++;

      if (attempt >= maxRetries) {
        throw new Error(`Rendering failed after ${maxRetries} attempts: ${error}`);
      }

      const backoffMs = Math.pow(2, attempt) * 1000; // Exponential backoff
      console.warn(
        `⚠ Rendering failed (attempt ${attempt}), retrying in ${backoffMs}ms...`
      );

      await new Promise((resolve) => setTimeout(resolve, backoffMs));
    }
  }
};
```

## Quality Assurance im Rendering

```typescript
// src/validateRender.ts
import { getCompositions } from 'remotion';
import { promises as fs } from 'fs';

export const validateRenderedVideo = async (videoPath: string) => {
  const stats = await fs.stat(videoPath);
  const fileSizeGB = stats.size / (1024 ** 3);

  console.log(`Video size: ${fileSizeGB.toFixed(2)} GB`);

  // Erwartete Größe für 1920x1080@60fps H.264 ~10min video
  // Formula: width * height * fps * seconds * bitrate / 8
  // 1920 * 1080 * 60 * 600 * 8000 / 8 ≈ 62GB
  // Mit Komression (H.264) ca. 5-8GB

  if (fileSizeGB < 1) {
    console.warn('⚠ Video file seems too small (may be corrupted)');
    return false;
  }

  if (fileSizeGB > 20) {
    console.warn('⚠ Video file seems too large (may have encoding issue)');
    return false;
  }

  console.log('✓ Video file size OK');
  return true;
};
```

## Performance Benchmarking

```typescript
// src/benchmark.ts
import { renderMedia } from '@remotion/renderer';
import * as os from 'os';

export async function benchmarkRendering() {
  const compositions = [
    { name: 'simple', frames: 60 },
    { name: 'complex-3d', frames: 60 },
    { name: 'heavy-effects', frames: 60 },
  ];

  console.log(`System: ${os.cpus().length} CPUs, ${os.totalmem() / (1024 ** 3)}GB RAM`);
  console.log('─'.repeat(60));

  for (const comp of compositions) {
    const start = Date.now();

    await renderMedia({
      composition: {
        id: comp.name,
        /* ... */
      },
      outputLocation: `/tmp/benchmark-${comp.name}.mp4`,
      concurrency: os.cpus().length,
    });

    const duration = (Date.now() - start) / 1000;
    const fps = comp.frames / duration;

    console.log(`${comp.name.padEnd(20)} │ ${fps.toFixed(2)} FPS │ ${duration.toFixed(1)}s`);
  }
}
```

## Output Validation & Archiving

```typescript
// src/postRender.ts
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

export const archiveAndValidate = async (videoPath: string, s3Bucket: string) => {
  // Verifiziere mit ffprobe
  const metadata = await probeVideo(videoPath);

  if (!metadata.valid) {
    throw new Error('Video validation failed');
  }

  // Erstelle Thumbnail
  await generateThumbnail(videoPath, `${videoPath}.thumbnail.png`);

  // Upload zu S3
  const s3Key = `videos/${path.basename(videoPath)}`;
  await uploadToS3(videoPath, s3Bucket, s3Key);

  // Erstelle Manifest
  const manifest = {
    filename: path.basename(videoPath),
    s3Key,
    metadata,
    uploadedAt: new Date().toISOString(),
  };

  await fs.writeFile(
    `${videoPath}.manifest.json`,
    JSON.stringify(manifest, null, 2)
  );

  console.log('✓ Archiving complete');
  return manifest;
};
```

Dies ist deine Produktionsreife Rendering-Pipeline!
