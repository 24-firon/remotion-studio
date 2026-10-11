# Cloud Rendering – AWS Lambda, Hochwertige Video-Produktion at Scale

## Konzept: Render-Jobs in der Cloud ausführen

```
Local Machine
    ↓
[High-End Remotion Project]
    ↓
Amazon Lambda (GPU-Instanz)
    ↓
[Parallel Rendering: 16 Frames/Worker]
    ↓
S3 Storage
    ↓
Video.mp4 (4K, 60 FPS)
```

---

## Variante 1: AWS Lambda Setup (Node.js + Remotion)

### Lambda Function Structure

```typescript
// handler.ts

import { renderStill, renderMedia } from '@remotion/lambda';
import { Composition } from './composition';

export const handler = async (event) => {
  const {
    fps = 30,
    width = 1920,
    height = 1080,
    durationInFrames,
    quality = 'high'
  } = event;
  
  try {
    const output = await renderMedia({
      composition: Composition,
      serveUrl: 'https://remotion-assets.s3.amazonaws.com',
      codec: 'h264',
      crf: quality === 'high' ? 10 : 16,
      fps,
      width,
      height,
      durationInFrames,
      concurrency: 8, // Parallel encoding
      logLevel: 'verbose'
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        videoUrl: output,
        duration: durationInFrames / fps,
        resolution: `${width}x${height}`,
        quality
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### Lambda Deployment

```bash
# serverless.yml
service: remotion-render

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  timeout: 900 # 15 Minuten Max
  memorySize: 3008 # 3GB RAM (max)
  
  environment:
    BUCKET_NAME: ${self:service}-${aws:accountId}

functions:
  render:
    handler: handler.handler
    layers:
      - arn:aws:lambda:us-east-1:XXXX:layer:remotion
    events:
      - http:
          path: render
          method: post
          cors: true

resources:
  Resources:
    RenderBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: ${self:service}-${aws:accountId}

# Deploy: serverless deploy
```

---

## Variante 2: Distributed Parallel Rendering

Teile Video in Chunks, render parallel:

```typescript
// orchestrator.ts

import { renderFrames } from '@remotion/lambda';

interface RenderChunk {
  frameStart: number;
  frameEnd: number;
  workerId: string;
}

const splitIntoChunks = (totalFrames: number, workersCount: number): RenderChunk[] => {
  const framesPerWorker = Math.ceil(totalFrames / workersCount);
  const chunks: RenderChunk[] = [];
  
  for (let i = 0; i < workersCount; i++) {
    chunks.push({
      frameStart: i * framesPerWorker,
      frameEnd: Math.min((i + 1) * framesPerWorker, totalFrames),
      workerId: `worker-${i}`
    });
  }
  
  return chunks;
};

const renderInParallel = async (
  composition,
  totalFrames: number,
  workersCount: number = 16
) => {
  const chunks = splitIntoChunks(totalFrames, workersCount);
  
  // Invoke Lambda functions in parallel
  const promises = chunks.map(chunk =>
    invokeRemotionLambda({
      functionName: 'remotion-render',
      payload: {
        frameStart: chunk.frameStart,
        frameEnd: chunk.frameEnd,
        composition
      }
    })
  );
  
  const results = await Promise.all(promises);
  
  // Combine results
  return combineVideoChunks(results);
};

// Usage
const finalVideo = await renderInParallel(MyComposition, 7200); // 4 Minuten @ 30FPS
```

---

## Variante 3: Cost Optimization

```typescript
// Intelligentes Tiering basierend auf Anforderungen

interface RenderConfig {
  quality: 'draft' | 'standard' | 'high' | 'ultra';
  workers: number;
  estimatedCost: string;
}

const getRenderConfig = (duration: number, quality: 'draft' | 'standard' | 'high' | 'ultra'): RenderConfig => {
  const configs = {
    draft: {
      crf: 28,
      workers: 4,
      estimatedCost: '$0.10'
    },
    standard: {
      crf: 20,
      workers: 8,
      estimatedCost: '$0.50'
    },
    high: {
      crf: 16,
      workers: 16,
      estimatedCost: '$1.20'
    },
    ultra: {
      crf: 10,
      workers: 32,
      estimatedCost: '$2.80'
    }
  };
  
  return configs[quality];
};

// AWS Cost Calculator
// 1 Minute @ 30 FPS:
// - Draft (CRF 28): $0.10 (1 Lambda, 1 Worker)
// - Standard (CRF 20): $0.50 (4 Lambdas, 8 Workers)
// - High (CRF 16): $1.20 (8 Lambdas, 16 Workers)
// - Ultra (CRF 10): $2.80 (16 Lambdas, 32 Workers)
```

---

## Variante 4: Job Monitoring & Webhooks

```typescript
// webhook-handler.ts

import { EventBridge } from 'aws-sdk';

export const monitorRenderJob = async (jobId: string) => {
  const eventBridge = new EventBridge();
  
  // Check Lambda execution status
  const params = {
    FunctionName: 'remotion-render',
    Qualifier: jobId
  };
  
  const pollStatus = setInterval(async () => {
    const response = await lambdaClient.getFunction(params);
    
    // Webhook callback
    await fetch('https://your-app.com/render-update', {
      method: 'POST',
      body: JSON.stringify({
        jobId,
        status: response.status,
        progress: response.progress,
        eta: response.estimatedTime
      })
    });
    
    if (response.status === 'completed') {
      clearInterval(pollStatus);
    }
  }, 5000); // Poll every 5 seconds
};
```

### Frontend Polling

```typescript
const RenderProgressComponent = ({ jobId }: { jobId: string }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'pending' | 'rendering' | 'complete' | 'error'>('pending');
  
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const response = await fetch(`/api/render-status/${jobId}`);
      const data = await response.json();
      
      setProgress(data.progress);
      setStatus(data.status);
      
      if (data.status === 'complete') {
        clearInterval(pollInterval);
        window.location.href = data.videoUrl;
      }
    }, 2000);
    
    return () => clearInterval(pollInterval);
  }, [jobId]);
  
  return (
    <div className="render-progress">
      <h3>Rendering Video...</h3>
      <progress value={progress} max={100} />
      <p>{progress}% Complete</p>
      <p>Estimated Time: {Math.round((100 - progress) / 2)} seconds</p>
    </div>
  );
};
```

---

## Variante 5: Self-Hosted Rendering (Render Farm)

Alternative zu Lambda: Eigener Server für mehr Kontrolle

```bash
# docker-compose.yml

version: '3.9'

services:
  remotion-worker:
    image: node:18-alpine
    entrypoint: /app/worker.js
    environment:
      - WORKER_ID=worker-${WORKER_NUMBER}
      - REDIS_URL=redis://queue:6379
      - OUTPUT_BUCKET=s3://renders
    volumes:
      - ./app:/app
      - /tmp/renders:/renders
    depends_on:
      - queue
      - storage

  queue:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis-data:/data

  storage:
    image: minio/minio
    ports:
      - '9000:9000'
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    volumes:
      - minio-data:/data

volumes:
  redis-data:
  minio-data:
```

**Vorteile:** Unbegrenzte Parallelität, GPU-Zugang, 24/7 verfügbar
**Nachteile:** Wartung, Infrastruktur-Kosten

---

## Variante 6: Hybrid Approach (Best of Both)

```typescript
// smart-render-orchestrator.ts

enum RenderMode {
  LOCAL = 'local',
  LAMBDA = 'lambda',
  RENDER_FARM = 'render-farm'
}

const selectRenderMode = async (
  durationSeconds: number,
  quality: string
): Promise<RenderMode> => {
  // Local: Schnelle Previews (<30 Sekunden)
  if (durationSeconds < 30 && quality === 'draft') {
    return RenderMode.LOCAL;
  }
  
  // Lambda: Standard Production (<10 Minuten, High Quality)
  if (durationSeconds < 600 && quality !== 'ultra') {
    const cost = estimateLambdaCost(durationSeconds, quality);
    if (cost < 5) {
      return RenderMode.LAMBDA;
    }
  }
  
  // Render Farm: Massive Jobs, Ultra Quality
  return RenderMode.RENDER_FARM;
};

const renderWithMode = async (
  composition,
  mode: RenderMode,
  options
) => {
  switch (mode) {
    case RenderMode.LOCAL:
      return renderLocally(composition, options);
    case RenderMode.LAMBDA:
      return renderOnLambda(composition, options);
    case RenderMode.RENDER_FARM:
      return submitToRenderFarm(composition, options);
  }
};
```

---

## Performance Benchmarks

| Setup | 1 Min Video | 10 Min Video | Cost/Hour |
|-------|-----------|-------------|----------|
| **Local (M1 Mac)** | 30s | 5 min | $0 |
| **1x Lambda** | 15s | 2.5 min | $2.40 |
| **8x Lambda (parallel)** | 2s | 20s | $1.50 |
| **Render Farm (16 GPU)** | 1s | 8s | $4.00 |

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Lambda Timeout | Video zu lang | Teile in Chunks oder erhöhe timeout zu 900s |
| Memory insufficient | Große Assets | Nutze S3 Streaming-Sources |
| Expensive Bills | Zu viele Workers | Auto-Scale: max 16 Lambdas |
| Corrupt Output | Chunk-Merge-Fehler | Validiere Framezahlen pro Worker |

---

## Best Practices

```typescript
// ✅ DO's

// 1. Asset Caching
const cachedAssets = new Map();
const fetchAsset = async (url: string) => {
  if (!cachedAssets.has(url)) {
    cachedAssets.set(url, await fetch(url).then(r => r.blob()));
  }
  return cachedAssets.get(url);
};

// 2. Graceful Degradation
try {
  return await renderOnLambda(...);
} catch (e) {
  if (e.timeout) {
    return await renderOnRenderFarm(...);
  }
  throw e;
}

// 3. Cost Monitoring
const estimateRenderCost = (duration, quality) => {
  // Berechne vorher, nicht hinterher
};

// ❌ DON'Ts

// 1. Nicht: Jeden Frame einzeln rendern
// ✅ Stattdessen: Batch multiple frames

// 2. Nicht: Alle Workers maximal auslasten
// ✅ Stattdessen: Headroom für andere jobs lassen

// 3. Nicht: Ohne Cost-Limit rendern
// ✅ Stattdessen: Budget setzen und monitoren
```

---

## Quellen

- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
- [Remotion Lambda Docs](https://www.remotion.dev/docs/lambda)
- [Rendering at Scale – AWS Blog](https://aws.amazon.com/blogs/media/)
- [FFmpeg Encoding](https://ffmpeg.org/ffmpeg-codecs.html)
