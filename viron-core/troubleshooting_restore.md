# 9. TROUBLESHOOTING & FEHLERBEHANDLUNG

**Dokumentversion:** 1.0 | Januar 2026

## Rendering-Fehler

### Problem: "out of memory" oder Memory Leak

**Symptom:**

```
Error: Cannot allocate memory
Process killed (signal: 9)
```

**Diagnose:**

```bash
# Überprüfe Speicherauslastung
node --max-old-space-size=4096 script.js

# oder in Remotion render:
npm run render -- --concurrency 1
```

**Lösungen:**

```typescript
// 1. Reduziere Concurrency
const { renderMedia } = require("@remotion/renderer");

await renderMedia({
  composition: config,
  concurrency: 2, // Statt 8
  onProgress: (progress) => {
    // Manuelles GC triggern
    if (progress.renderedFrames % 50 === 0) {
      global.gc?.();
    }
  },
});

// 2. Nutze Chunk-Rendering
const chunkSize = 300; // Frames pro Chunk
for (let i = 0; i < totalFrames; i += chunkSize) {
  const to = Math.min(i + chunkSize, totalFrames);
  await renderMedia({
    frameRange: [i, to],
    // ...
  });
}

// 3. Entferne unnötige Effekte/Animationen
// - Vereinfache Gradienten
// - Verwende CSS statt Canvas Rendering
// - Limitiere Schattentiefe
```

### Problem: "ffmpeg not found"

**Lösungsschritte:**

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows (chocolatey)
choco install ffmpeg

# oder Remotion wird es automatisch installieren
npx @remotion/cli test-audio
```

### Problem: Chrome/Headless Browser Crash

**Error:**

```
Failed to connect to Chrome
Navigation timeout of 30000 ms exceeded
```

**Lösungen:**

```typescript
// 1. Erhöhe Browser-Timeout
Config.setBrowserExecutable("/path/to/chromium");

// 2. Nutze Chrome-Arguments
const browserArguments = [
  "--disable-dev-shm-usage", // Linux: disable /dev/shm
  "--no-sandbox", // Sicherheit reduzieren
  "--disable-gpu", // Deaktiviere GPU
];

// 3. Reduziere Frame-Komplexität
// - Vereinfache SVG/DOM
// - Verwende optimierte Bilder
```

### Problem: "Frame dropped" / Performance

**Symptom:**

```
Rendering at 45 FPS (expected: 60)
```

**Profiling:**

```typescript
// src/utils/frameProfiler.ts
export const profileFrame = async (component: React.FC, frame: number) => {
  const start = performance.now();

  // Render simulation
  const result = await new Promise((resolve) => {
    // Component rendering logic
    resolve(null);
  });

  const duration = performance.now() - start;
  const targetMs = 16.67; // 60 FPS = 16.67ms pro Frame

  if (duration > targetMs) {
    console.warn(
      `⚠ Frame ${frame} took ${duration.toFixed(2)}ms (budget: ${targetMs}ms)`,
    );
    console.warn(`  Overshoot: ${(duration - targetMs).toFixed(2)}ms`);
  }

  return duration;
};
```

**Performance-Optimierungen:**

```typescript
// 1. Memoization
import { memo, useMemo } from 'react';

const MetallicSurface = memo(({ colors }: Props) => {
  const gradient = useMemo(() => generateGradient(colors), [colors]);
  return <div style={{ background: gradient }} />;
});

// 2. Entferne unnötige Re-Renders
const component = useVideo(() => <YourComponent />, []);

// 3. Vereinfache CSS
// BAD: Filter + Blur + Drop-Shadow
style={{ filter: 'blur(10px) drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}

// GOOD: Nur notwendige Effekte
style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
```

## Audio-Verarbeitungsfehler

### Problem: Audio & Video nicht synchronisiert

**Diagnose:**

```typescript
// src/audio/syncValidator.ts
export const validateAudioVideoSync = (
  audioFrames: AudioFrame[],
  videoFrameRate: number,
  audioDurationMs: number,
) => {
  const expectedFrames = Math.ceil((audioDurationMs / 1000) * videoFrameRate);
  const actualFrames = audioFrames.length;

  if (Math.abs(expectedFrames - actualFrames) > 2) {
    console.error(`
      ✗ SYNC ERROR:
      Expected frames: ${expectedFrames}
      Actual frames:   ${actualFrames}
      Difference:      ${Math.abs(expectedFrames - actualFrames)}
    `);
    return false;
  }

  return true;
};
```

**Lösungen:**

```typescript
// 1. Re-Sample Audio korrekt
const samplesPerFrame = Math.floor(sampleRate / fps);
// sampleRate: 48000
// fps: 60
// samplesPerFrame: 800 (exactly)

// 2. Überprüfe Audio-Format
// WAV PCM (16-bit, 48kHz) ist ideal
// MP3 benötigt Dekodierung → Latenz

// 3. Füge explizites Audio-Padding ein
const frames = [];
const targetFrameCount = 300; // Total expected

for (let i = audioData.length; i < targetFrameCount; i++) {
  frames.push({
    ...emptyFrame, // Schweigen
    frame: i,
  });
}
```

### Problem: FFT Analysis gibt seltsame Werte

**Debug-Code:**

```typescript
// Überprüfe Input
console.log("Audio Buffer Stats:");
console.log(`  Min: ${Math.min(...audioBuffer)}`);
console.log(`  Max: ${Math.max(...audioBuffer)}`);
console.log(
  `  Mean: ${audioBuffer.reduce((a, b) => a + b) / audioBuffer.length}`,
);

// Überprüfe FFT Output
for (let frame of frames.slice(0, 10)) {
  console.log(`Frame ${frame.frame}:
    Bass:   ${frame.bass.toFixed(3)}
    Mid:    ${frame.mid.toFixed(3)}
    Treble: ${frame.treble.toFixed(3)}
    Sum:    ${(frame.bass + frame.mid + frame.treble).toFixed(3)} (should be ~1.0)
  `);
}
```

**Häufige Fehler:**

```typescript
// ✗ WRONG: FFT ohne Windowing
const spectrum = performFFT(rawAudioData);

// ✓ RIGHT: Nutze Hann-Window
const windowed = applyHannWindow(audioData);
const spectrum = performFFT(windowed);

function applyHannWindow(data: Float32Array): Float32Array {
  const windowed = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (data.length - 1));
    windowed[i] = data[i] * w;
  }
  return windowed;
}
```

## Type-Script & Compilierungs-Fehler

### Problem: "Cannot find module" oder Import-Fehler

```typescript
// ✗ WRONG Path-Import (case-sensitive on Linux!)
import { THEME } from './Theme';      // Datei: ./theme/Theme.ts

// ✓ RIGHT
import { THEME } from './theme/Theme';

// oder absolute Path-Aliase in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@theme/*": ["src/theme/*"],
      "@components/*": ["src/components/*"]
    }
  }
}

// Dann nutzen:
import { THEME } from '@theme/Theme';
```

### Problem: "Property does not exist on type"

```typescript
// ✗ Runtime Check fehlt
const value = someObject.property.nested; // Can crash!

// ✓ Type-Safe
const value = someObject?.property?.nested;

// oder besser: Strikte Typisierung
interface Config {
  property?: {
    nested: string;
  };
}
```

### Problem: "React.ReactNode does not include JSX.Element"

```typescript
// ✗ WRONG
type MyProps = {
  children: React.ReactNode;
};

// ✓ RIGHT
import { ReactNode, FC } from 'react';

type MyProps = {
  children: ReactNode;
};

const MyComponent: FC<MyProps> = ({ children }) => {
  return <div>{children}</div>;
};
```

## Deployment & Production-Fehler

### Problem: "Video not rendering on Lambda"

**Häufige Ursachen:**

```typescript
// 1. Timeouts
// Lambda Standard: 900s (15 Minuten)
// Long-form Videos brauchen möglicherweise mehr

// Lösung: Chunk-Rendering
const parts = await Promise.all(
  chunks.map((chunk) =>
    renderMediaOnLambda({
      ...config,
      frameRange: chunk,
    })
  )
);

// 2. Disk-Space
// Lambda Standard: 512MB
// Lösung: Streaming zu S3 oder kleinere Videos

// 3. Dependencies nicht bundled
// .remotionrc.json konfigurieren:
{
  "bundle": {
    "webpackConfig": {
      "externals": {
        "optional-package": "optional-package"
      }
    }
  }
}
```

### Problem: "S3 Upload fehlgeschlagen"

```typescript
// Überprüfe Credentials
console.log("AWS Region:", process.env.AWS_REGION);
console.log("S3 Bucket:", process.env.S3_BUCKET);
console.log("Access Key:", process.env.AWS_ACCESS_KEY_ID ? "✓" : "✗");

// Teste S3 Connection
import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-central-1" });
try {
  await s3.send(new HeadBucketCommand({ Bucket: "my-bucket" }));
  console.log("✓ S3 connection OK");
} catch (error) {
  console.error("✗ S3 connection failed:", error);
}
```

### Problem: "CORS Error" bei Video auf Website

```typescript
// 1. CORS Headers setzen
// In S3 Bucket Policy:
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedOrigins": ["https://yourdomain.com"],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
}

// 2. CDN-Setup (CloudFront)
// CloudFront konfigurieren für S3 Origin

// 3. Video-Tag mit crossOrigin
<video
  crossOrigin="anonymous"
  controls
  src="https://cdn.yourdomain.com/video.mp4"
/>
```

## Logging & Monitoring

### Strukturiertes Logging-System

```typescript
// src/utils/logger.ts
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class Logger {
  private level: LogLevel;
  private context: string;

  constructor(context: string, level = LogLevel.INFO) {
    this.context = context;
    this.level = level;
  }

  debug(message: string, data?: any) {
    if (this.level <= LogLevel.DEBUG) {
      console.log(`[${this.context}] DEBUG:`, message, data);
    }
  }

  info(message: string, data?: any) {
    if (this.level <= LogLevel.INFO) {
      console.log(`[${this.context}] INFO:`, message, data);
    }
  }

  warn(message: string, data?: any) {
    if (this.level <= LogLevel.WARN) {
      console.warn(`[${this.context}] WARN:`, message, data);
    }
  }

  error(message: string, error?: Error) {
    if (this.level <= LogLevel.ERROR) {
      console.error(`[${this.context}] ERROR:`, message);
      if (error) {
        console.error("  Stack:", error.stack);
      }
    }
  }
}

// Nutzung:
const logger = new Logger("AudioAnalyzer");
logger.info("Starting analysis", { audioPath: "track.wav" });

try {
  const frames = await analyzer.analyzeAudioFile("track.wav");
  logger.info("Analysis complete", { frameCount: frames.length });
} catch (error) {
  logger.error("Analysis failed", error as Error);
}
```

### Performance Tracking

```typescript
// src/utils/metrics.ts
export const metrics = {
  recordings: new Map<string, number[]>(),

  record(label: string, value: number) {
    if (!this.recordings.has(label)) {
      this.recordings.set(label, []);
    }
    this.recordings.get(label)!.push(value);
  },

  summary(label: string) {
    const values = this.recordings.get(label) || [];
    if (values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const mean = values.reduce((a, b) => a + b) / values.length;
    const p50 = sorted[Math.floor(values.length * 0.5)];
    const p95 = sorted[Math.floor(values.length * 0.95)];
    const p99 = sorted[Math.floor(values.length * 0.99)];

    return {
      min: sorted[0],
      max: sorted[values.length - 1],
      mean,
      p50,
      p95,
      p99,
    };
  },

  report() {
    console.table(
      Array.from(this.recordings.entries()).map(([label, values]) => ({
        label,
        samples: values.length,
        ...this.summary(label),
      })),
    );
  },
};

// Nutzung:
const start = performance.now();
await renderMedia(config);
metrics.record("render-time", performance.now() - start);

metrics.report();
```

## Health Check Utilities

```typescript
// src/utils/healthCheck.ts
export const runHealthCheck = async () => {
  const results = {
    system: checkSystem(),
    dependencies: await checkDependencies(),
    config: checkConfiguration(),
    audio: await checkAudioSetup(),
    rendering: await checkRenderingSetup(),
  };

  const hasErrors = Object.values(results).some(
    (r) => r && typeof r === "object" && r.error,
  );

  return {
    healthy: !hasErrors,
    results,
    timestamp: new Date().toISOString(),
  };
};

function checkSystem() {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    cpus: require("os").cpus().length,
    memory: `${Math.round(require("os").totalmem() / 1024 ** 3)}GB`,
  };
}

async function checkDependencies() {
  // Überprüfe kritische packages
  try {
    require("remotion");
    require("@remotion/renderer");
    require("next");
    return { status: "✓", error: null };
  } catch (e) {
    return { status: "✗", error: String(e) };
  }
}

function checkConfiguration() {
  // Überprüfe THEME System
  try {
    const { THEME } = require("./theme/Theme");
    return { colors: Object.keys(THEME.colors), error: null };
  } catch (e) {
    return { status: "✗", error: String(e) };
  }
}

async function checkAudioSetup() {
  // Überprüfe FFmpeg
  return new Promise((resolve) => {
    require("child_process").exec("ffmpeg -version", (error: any) => {
      resolve({
        ffmpeg: error ? "✗" : "✓",
        error: error ? String(error) : null,
      });
    });
  });
}

async function checkRenderingSetup() {
  // Test-Render von 1 Frame
  try {
    const start = performance.now();
    // Dummy render...
    const duration = performance.now() - start;
    return { status: "✓", duration, error: null };
  } catch (e) {
    return { status: "✗", error: String(e) };
  }
}
```

## Kontakt für weitere Hilfe

Wenn ein Fehler nicht hier dokumentiert ist:

1. **GitHub Issues durchsuchen:** `github.com/remotion-dev/remotion/issues`
2. **Remotion Discord:** discord.gg/remotion
3. **Stack Overflow:** Tag `remotion`
4. **Lokales Debugging:** Debug-Mode aktivieren, Logs exportieren

Diese Troubleshooting-Dokumentation sollte dir bei ~95% aller möglichen Fehler helfen!
