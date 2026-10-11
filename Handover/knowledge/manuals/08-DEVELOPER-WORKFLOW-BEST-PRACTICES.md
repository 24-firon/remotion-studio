# 8. ENTWICKLER-WORKFLOW & BEST PRACTICES

**Dokumentversion:** 1.0 | Januar 2026

## IDE Setup & Development Environment

### VS Code Konfiguration

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.rulers": [80, 120],
  "files.exclude": {
    "**/.remotion-cache": true,
    "**/node_modules": true,
    "**/.next": true
  }
}
```

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "unifiedjs.vscode-mdx",
    "eamodio.gitlens",
    "ms-vscode.makefile-tools",
    "ms-vscode.remote-explorer"
  ]
}
```

### Prettier Konfiguration

```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
};
```

### ESLint Setup

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@next/next/no-img-element': 'warn',
  },
  overrides: [
    {
      files: ['src/**/*.tsx'],
      rules: {
        'react/display-name': 'off',
      },
    },
  ],
};
```

## Git Workflow & Commits

### Branching Strategy (Git Flow)

```
main (Production)
  ↑
  ├─ release/v1.0.0 (Release Candidate)
  │
develop (Integration)
  ↑
  ├─ feature/video-glints (Feature Branch)
  ├─ feature/audio-sync (Feature Branch)
  ├─ bugfix/rendering-crash (Bugfix)
  └─ chore/dependencies (Maintenance)
```

### Commit Message Konvention

```
Typ: Titel (Imperative, max 50 chars)

Detaillierte Beschreibung (wenn nötig)
- Punkt 1
- Punkt 2

Closes #123
Related to #456
```

**Gültige Typen:**
- `feat`: Neue Funktion
- `fix`: Bug fix
- `docs`: Dokumentations-Änderung
- `style`: Formatierung (kein Code-Change)
- `refactor`: Code-Umstrukturierung
- `perf`: Performance-Optimierung
- `test`: Test-Änderungen
- `chore`: Dependencies, Config, etc.

**Beispiele:**

```
feat: add bass-reactive glint animation

Implement frequency-band driven glint scaling
for metallic surface effects. Uses audio FFT
analysis to drive opacity and rotation.

Closes #89
```

```
fix: prevent memory leak in audio analyzer

AudioFFTAnalyzer was holding reference to
previous frame data. Now properly cleans up
memory after each analysis cycle.

Related to #124
```

## Development Checklist

### Bevor du einen Feature startest:

```
□ Erstelle Feature-Branch: git checkout -b feature/your-feature
□ Aktualisiere dependencies: npm install
□ Starte dev-Server: npm run dev
□ Öffne Remotion preview (falls Video-Änderungen)
□ Aktiviere ESLint in VS Code
```

### Während der Entwicklung:

```
□ Schreibe TypeScript (strikte Typisierung)
□ Nutze THEME für alle Design-Werte
□ Teste im Preview (nicht nur Code-Editor)
□ Regelmäßig committen (logische Units)
□ Tests schreiben für neue Funktionen
□ Performance-Auswirkungen prüfen
```

### Vor dem Commit:

```
□ npm run format (Auto-Format mit Prettier)
□ npm run lint (ESLint überprüfen)
□ npm run type-check (TypeScript)
□ npm run test (Unit-Tests)
□ Code Review durchlesen
```

## Performance-Monitoring

### Frame Rate Überprüfung (Remotion)

```typescript
// src/utils/performanceMonitor.ts

export const setupPerformanceMonitor = (
  videoComponent: React.FC,
  logInterval: number = 10
) => {
  let frameCount = 0;
  let lastLogTime = Date.now();

  return {
    logFrameMetrics: (frame: number) => {
      frameCount++;
      const now = Date.now();
      const elapsed = now - lastLogTime;

      if (elapsed >= logInterval * 1000) {
        const fps = frameCount / (elapsed / 1000);
        console.log(`FPS: ${fps.toFixed(2)}`);

        if (fps < 55) {
          console.warn('⚠ Performance degradation detected (FPS < 55)');
        }

        frameCount = 0;
        lastLogTime = now;
      }
    },
  };
};
```

### Memory Profiling

```typescript
// npm install clinic
// npm run clinic:doctor -- npm run render

// oder in Node.js
if (typeof global !== 'undefined' && global.gc) {
  global.gc(); // Manuelles Garbage Collection triggern
  console.log('Heap:', process.memoryUsage());
}
```

### Rendering Time Tracking

```typescript
// src/utils/renderTimer.ts

export const measureRenderTime = async <T>(
  fn: () => Promise<T>,
  label: string
): Promise<T> => {
  const start = performance.now();

  const result = await fn();

  const duration = performance.now() - start;
  const seconds = duration / 1000;

  console.log(`✓ ${label}: ${seconds.toFixed(2)}s`);

  // Warne wenn zu lange
  if (seconds > 120) {
    console.warn(`⚠ ${label} took longer than 2 minutes`);
  }

  return result;
};

// Nutzung:
await measureRenderTime(
  () => renderMedia(config),
  'Full video render'
);
```

## Debugging-Strategien

### Remotion-spezifisches Debugging

```typescript
// Aktiviere Debug-Logging
const { enableDebug } = require('@remotion/cli/config');
enableDebug(true);

// Nutze Console-Output
console.log('Frame:', frame);
console.log('Audio Data:', audioData[frame]);

// Browser DevTools für Preview
// F12 im Remotion Player → Console
```

### Audio-Analyse Debuggen

```typescript
// src/audio/debugAudioAnalysis.ts

export const debugAudioFrame = (frame: AudioFrame) => {
  console.group(`Frame ${frame.frame}`);
  console.log(`Timestamp: ${frame.timestamp.toFixed(2)}ms`);
  console.log(`Bass: ${frame.bass.toFixed(3)}`);
  console.log(`Mid: ${frame.mid.toFixed(3)}`);
  console.log(`Treble: ${frame.treble.toFixed(3)}`);
  console.log(`Energy: ${frame.energy.toFixed(3)}`);
  console.log(`Amplitude: ${frame.amplitude.toFixed(3)}`);
  console.groupEnd();
};

// Exportiere zu CSV für Analyse
export const exportAudioDebugCSV = (frames: AudioFrame[]) => {
  const csv = [
    ['Frame', 'Timestamp', 'Bass', 'Mid', 'Treble', 'Energy'],
    ...frames.map((f) => [
      f.frame,
      f.timestamp.toFixed(2),
      f.bass.toFixed(3),
      f.mid.toFixed(3),
      f.treble.toFixed(3),
      f.energy.toFixed(3),
    ]),
  ]
    .map((row) => row.join(','))
    .join('\n');

  require('fs').writeFileSync('./audio-debug.csv', csv);
};
```

### Next.js DevTools

```bash
# React DevTools Extension
# Redux DevTools (falls Redux genutzt)
# Lighthouse in Chrome DevTools
# Network Tab für API-Calls
```

## Dokumentation Best Practices

### Inline Code-Kommentare

```typescript
// ✗ NICHT: zu obvious
const x = 1; // increment x

// ✓ RICHTIG: erkläre WHY nicht WHAT
const fps = 60;
// We render at 60fps to match most displays
// and stay within performance budgets
```

### JSDoc für öffentliche Funktionen

```typescript
/**
 * Analysiere Audio-Datei und extrahiere Frequency-Bands
 *
 * @param audioPath - Pfad zur WAV/MP3 Datei
 * @param options - Konfiguration für FFT
 * @returns Promise mit Array von AudioFrame-Objekten
 *
 * @example
 * const frames = await analyzer.analyzeAudioFile('track.wav', {
 *   fps: 60,
 *   fftSize: 1024,
 * });
 *
 * @throws Error wenn Datei nicht lesbar
 *
 * @see {@link AudioFFTAnalyzer} für weitere Details
 */
export async function analyzeAudioFile(
  audioPath: string,
  options?: AnalysisOptions
): Promise<AudioFrame[]> {
  // Implementation
}
```

### Modul-Level Dokumentation

```typescript
/**
 * # Audio Processing Pipeline
 *
 * Handles FFT analysis of audio files and exports
 * frequency data for use in reactive Remotion videos.
 *
 * ## Usage
 *
 * ```typescript
 * const analyzer = new AudioFFTAnalyzer();
 * const frames = await analyzer.analyzeAudioFile('song.wav');
 * exportAudioAnalysisAsJSON(frames, 'output.json');
 * ```
 *
 * ## Performance
 *
 * - FFT Size: 1024 bins
 * - Sample Rate: 48kHz
 * - Processing: ~1 minute per minute of audio
 *
 * @module audio/fftAnalysis
 */
```

## Testing-Strategie

### Unit Tests (Vitest)

```typescript
// src/__tests__/theme.test.ts
import { describe, it, expect } from 'vitest';
import { getContrastRatio, validateContrast } from '../theme/themeUtils';

describe('Theme Utilities', () => {
  it('should calculate correct contrast ratio', () => {
    const ratio = getContrastRatio('#ffffff', '#000000');
    expect(ratio).toBe(21);
  });

  it('should validate WCAG AA compliance', () => {
    const result = validateContrast('#ffffff', '#000000');
    expect(result.wcagAA).toBe(true);
    expect(result.wcagAAA).toBe(true);
  });

  it('should detect low contrast', () => {
    const result = validateContrast('#ffffff', '#f0f0f0');
    expect(result.wcagAA).toBe(false);
  });
});
```

### Integration Tests (Rendering)

```bash
# Test-Render mit kleinem Frame-Range
npm run render:test

# Überprüfe Output
ls -lh output-test.mp4
```

### Visual Regression Testing

```typescript
// Nutze Playwright für Screenshot-Tests
import { test, expect } from '@playwright/test';

test('metallic surface should render correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('[data-testid="metallic-surface"]')).toHaveScreenshot();
});
```

## Deployment Checklist

### Pre-Deployment

```
□ npm run build (Next.js Build)
□ npm run lint (Code-Qualität)
□ npm run test (Alle Tests)
□ npm run render:test (Rendering-Test)
□ Überprüfe Bundle-Größe: npm run analyze
□ Git: git log --oneline (letzte Commits)
```

### Deployment Steps

```bash
# 1. Version aktualisieren
npm version minor

# 2. Änderungen commiten
git add package.json package-lock.json
git commit -m "chore: bump version to 1.2.0"

# 3. Tag erstellen
git tag v1.2.0

# 4. Zu Repository pushen
git push origin main --tags

# 5. Build erstellen
npm run build

# 6. Zu Produktions-Host deployen
npm run deploy
```

### Post-Deployment

```
□ Überprüfe Live-Website
□ Prüfe Rendering-APIs
□ Monitore Fehlerrate (Sentry/LogRocket)
□ Überprüfe Performance (Lighthouse)
□ Kommuniziere Update zu Team
```

Diese Dokumentation deckt den gesamten Entwickler-Workflow ab!
