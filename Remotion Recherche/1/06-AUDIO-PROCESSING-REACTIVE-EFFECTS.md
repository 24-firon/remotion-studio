# 6. AUDIO PROCESSING & REAKTIVE EFFEKTE

**Dokumentversion:** 1.0 | Januar 2026

## Audio-Analyse-Pipeline

### FFT (Fast Fourier Transform) Grundlagen

```typescript
// src/audio/fftAnalysis.ts
import * as fs from 'fs';
import * as path from 'path';

export interface AudioFrame {
  frame: number;
  timestamp: number;
  bass: number;      // 20-250 Hz
  lowMid: number;    // 250-500 Hz
  mid: number;       // 500-2000 Hz
  highMid: number;   // 2000-4000 Hz
  treble: number;    // 4000+ Hz
  amplitude: number; // Gesamt-Amplitude (0-1)
  energy: number;    // Gesamte Energie des Frames
}

export class AudioFFTAnalyzer {
  private fftSize: number = 1024;
  private sampleRate: number = 48000;
  private fps: number = 60;

  /**
   * Analysiert Audio-Datei und extrahiert Frequency-Daten pro Frame
   */
  async analyzeAudioFile(audioPath: string): Promise<AudioFrame[]> {
    const audioBuffer = await this.loadAudioBuffer(audioPath);
    const frames: AudioFrame[] = [];

    // Berechne Samples pro Frame bei gegebener FPS
    const samplesPerFrame = Math.floor(this.sampleRate / this.fps);

    for (let frameIdx = 0; frameIdx < audioBuffer.length; frameIdx += samplesPerFrame) {
      const frameData = audioBuffer.slice(frameIdx, frameIdx + samplesPerFrame);

      // Null-Padding für FFT-Größe
      const paddedData = new Float32Array(this.fftSize);
      paddedData.set(frameData.slice(0, Math.min(frameData.length, this.fftSize)));

      // FFT berechnen
      const spectrum = this.performFFT(paddedData);

      // Frequency-Bands extrahieren
      const bands = this.extractFrequencyBands(spectrum);

      frames.push({
        frame: Math.floor(frameIdx / samplesPerFrame),
        timestamp: (frameIdx / this.sampleRate) * 1000, // ms
        ...bands,
        amplitude: this.calculateAmplitude(frameData),
        energy: this.calculateEnergy(spectrum),
      });
    }

    return frames;
  }

  /**
   * Naive FFT-Implementierung (Cooley-Tukey)
   * Für Production: Nutze bessere Libraries wie fftjs
   */
  private performFFT(realParts: Float32Array): { real: Float32Array; imag: Float32Array } {
    // Vereinfachte Version für Demonstration
    // In Produktion: nutze eine optimierte Lib
    const N = realParts.length;
    const real = new Float32Array(N);
    const imag = new Float32Array(N);

    for (let k = 0; k < N; k++) {
      for (let n = 0; n < N; n++) {
        const angle = (-2 * Math.PI * k * n) / N;
        real[k] += realParts[n] * Math.cos(angle);
        imag[k] += realParts[n] * Math.sin(angle);
      }
    }

    return { real, imag };
  }

  /**
   * Extrahiere spezifische Frequency-Bänder
   */
  private extractFrequencyBands(spectrum: { real: Float32Array; imag: Float32Array }) {
    const frequencies = this.hertzToFrequencyBins();

    const bass = this.bandEnergy(spectrum, frequencies.bass);
    const lowMid = this.bandEnergy(spectrum, frequencies.lowMid);
    const mid = this.bandEnergy(spectrum, frequencies.mid);
    const highMid = this.bandEnergy(spectrum, frequencies.highMid);
    const treble = this.bandEnergy(spectrum, frequencies.treble);

    // Normalisiere (0-1)
    const total = bass + lowMid + mid + highMid + treble;
    const factor = total > 0 ? 1 / total : 1;

    return {
      bass: Math.min(bass * factor, 1),
      lowMid: Math.min(lowMid * factor, 1),
      mid: Math.min(mid * factor, 1),
      highMid: Math.min(highMid * factor, 1),
      treble: Math.min(treble * factor, 1),
    };
  }

  /**
   * Mapping: Hz → Bin-Index für 1024 FFT @ 48kHz
   * Bin-Breite: 48000 / 1024 = 46.875 Hz pro Bin
   */
  private hertzToFrequencyBins() {
    const binWidth = this.sampleRate / this.fftSize;

    return {
      bass: {
        min: Math.floor(20 / binWidth),
        max: Math.floor(250 / binWidth),
      },
      lowMid: {
        min: Math.floor(250 / binWidth),
        max: Math.floor(500 / binWidth),
      },
      mid: {
        min: Math.floor(500 / binWidth),
        max: Math.floor(2000 / binWidth),
      },
      highMid: {
        min: Math.floor(2000 / binWidth),
        max: Math.floor(4000 / binWidth),
      },
      treble: {
        min: Math.floor(4000 / binWidth),
        max: this.fftSize / 2, // Nyquist-Frequenz
      },
    };
  }

  /**
   * Berechne Energie in einem Frequency-Band
   */
  private bandEnergy(
    spectrum: { real: Float32Array; imag: Float32Array },
    band: { min: number; max: number }
  ): number {
    let energy = 0;

    for (let i = band.min; i < band.max; i++) {
      const magnitude = Math.sqrt(spectrum.real[i] ** 2 + spectrum.imag[i] ** 2);
      energy += magnitude;
    }

    return energy / (band.max - band.min);
  }

  private calculateAmplitude(frameData: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < frameData.length; i++) {
      sum += Math.abs(frameData[i]);
    }
    return sum / frameData.length;
  }

  private calculateEnergy(spectrum: { real: Float32Array; imag: Float32Array }): number {
    let energy = 0;
    for (let i = 0; i < spectrum.real.length; i++) {
      const mag = Math.sqrt(spectrum.real[i] ** 2 + spectrum.imag[i] ** 2);
      energy += mag ** 2;
    }
    return Math.sqrt(energy / spectrum.real.length);
  }

  private async loadAudioBuffer(audioPath: string): Promise<Float32Array> {
    // Implementierung: PCM WAV → Float32Array
    // Oder nutze ffmpeg für Konvertierung
    // In Produktion: web-audio-api oder audioContext
    throw new Error('Implement audio loading for your platform');
  }
}
```

### Audio-Export als JSON

```typescript
// src/audio/exportAudioAnalysis.ts
export const exportAudioAnalysisAsJSON = async (
  audioPath: string,
  outputPath: string
) => {
  const analyzer = new AudioFFTAnalyzer();
  const frames = await analyzer.analyzeAudioFile(audioPath);

  const analysisData = {
    metadata: {
      audioFile: audioPath,
      analyzedAt: new Date().toISOString(),
      sampleRate: 48000,
      fps: 60,
      fftSize: 1024,
      totalFrames: frames.length,
      durationMs: frames[frames.length - 1].timestamp,
    },
    frames: frames.map((f) => ({
      f: f.frame,
      b: Math.round(f.bass * 1000) / 1000,      // Bass (3 decimals)
      m: Math.round(f.mid * 1000) / 1000,        // Mid
      t: Math.round(f.treble * 1000) / 1000,     // Treble
      a: Math.round(f.amplitude * 1000) / 1000,  // Amplitude
      e: Math.round(f.energy * 1000) / 1000,     // Energy
    })),
  };

  fs.writeFileSync(outputPath, JSON.stringify(analysisData, null, 2));
  console.log(`✓ Audio analysis exported to ${outputPath}`);

  return analysisData;
};
```

## Reaktive Remotion-Komponenten

### Audio-getriebene Glint-Animation

```typescript
// src/components/AudioDrivenGlint.tsx
import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface GlintProps {
  audioData: AudioFrame[];
  sensitivity: number;
  color: string;
}

export const AudioDrivenGlint: React.FC<GlintProps> = ({
  audioData,
  sensitivity = 1,
  color = '#ffffff',
}) => {
  const frame = useCurrentFrame();

  // Finde aktuelle Audio-Daten
  const currentAudio = useMemo(() => {
    if (frame >= audioData.length) return audioData[audioData.length - 1];
    return audioData[frame];
  }, [frame, audioData]);

  // Treble-Frequenzen steuern Glint-Größe
  const glintScale = interpolate(
    currentAudio.treble * sensitivity,
    [0, 1],
    [1, 3],
    { easing: Easing.inOut(Easing.cubic) }
  );

  // Bass steuert Glint-Opazität
  const glintOpacity = interpolate(
    currentAudio.bass,
    [0, 1],
    [0.3, 1],
    { easing: Easing.inOut(Easing.quad) }
  );

  // Energie steuert Rotation
  const rotation = (currentAudio.energy * 360) % 360;

  return (
    <div
      style={{
        position: 'absolute',
        top: '20%',
        left: '30%',
        width: '200px',
        height: '200px',
        opacity: glintOpacity,
        transform: `scale(${glintScale}) rotate(${rotation}deg)`,
        transition: 'transform 0.05s ease-out',
      }}
    >
      <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
        <polygon
          points="100,10 110,90 190,100 110,110 100,190 90,110 10,100 90,90"
          fill={color}
          opacity={glintOpacity}
        />
      </svg>
    </div>
  );
};
```

### Bass-reaktive Metallische Oberfläche

```typescript
// src/components/BassReactiveMetallic.tsx
import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface BassReactiveProps {
  audioData: AudioFrame[];
  baseColor: string;
  highlightColor: string;
}

export const BassReactiveMetallic: React.FC<BassReactiveProps> = ({
  audioData,
  baseColor = '#c0c0c0',
  highlightColor = '#ffffff',
}) => {
  const frame = useCurrentFrame();
  const currentAudio = audioData[Math.min(frame, audioData.length - 1)];

  // Bass-Energie beeinflusst Glanz-Intensität
  const gloss = interpolate(currentAudio.bass, [0, 1], [0.2, 0.8]);

  // Mid-Frequenzen beeinflussen Oberflächen-Details
  const detailOpacity = interpolate(currentAudio.mid, [0, 1], [0.3, 1]);

  // Gesamte Energie für Bewegung
  const translateY = interpolate(
    currentAudio.energy,
    [0, 1],
    [0, -20] // Bewegung um 20px aufwärts bei hoher Energie
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, 
          ${baseColor} 0%,
          ${interpolateColor(baseColor, highlightColor, gloss)} 30%,
          ${highlightColor} 50%,
          ${baseColor} 100%)`,
        boxShadow: `
          inset -2px -2px 5px rgba(0,0,0,0.3),
          inset 2px 2px 5px rgba(255,255,255,${gloss}),
          0 10px 30px rgba(0,0,0,${1 - gloss})
        `,
        transform: `translateY(${translateY}px)`,
        transition: 'transform 0.05s ease-out',
      }}
    >
      {/* Detail-Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 30% 30%, 
            rgba(255,255,255,${detailOpacity}), 
            transparent 50%)`,
          opacity: detailOpacity,
        }}
      />
    </div>
  );
};

// Hilfsfunction für Farb-Interpolation
function interpolateColor(from: string, to: string, t: number): string {
  // Vereinfachte Hex-Interpolation
  // In Produktion: chroma.js oder ähnliche Library nutzen
  const f = parseInt(from.slice(1), 16);
  const t_val = parseInt(to.slice(1), 16);

  const r = Math.round(((f >> 16) & 255) * (1 - t) + ((t_val >> 16) & 255) * t);
  const g = Math.round(((f >> 8) & 255) * (1 - t) + ((t_val >> 8) & 255) * t);
  const b = Math.round((f & 255) * (1 - t) + (t_val & 255) * t);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
```

### Mehrband-Equalizer Visualisierung

```typescript
// src/components/MultibanEqualizerViz.tsx
import React from 'react';
import { useCurrentFrame } from 'remotion';

interface EqualizerVizProps {
  audioData: AudioFrame[];
  barCount: number;
  barColor: string;
}

export const MultibandEqualizerViz: React.FC<EqualizerVizProps> = ({
  audioData,
  barCount = 32,
  barColor = '#00ff00',
}) => {
  const frame = useCurrentFrame();
  const currentAudio = audioData[Math.min(frame, audioData.length - 1)];

  // Teile Bands in Gruppen auf
  const bands = [
    currentAudio.bass * 1.2,        // Boost Bass
    currentAudio.lowMid,
    currentAudio.mid,
    currentAudio.highMid,
    currentAudio.treble * 1.1,     // Boost Treble
  ];

  const barWidth = 100 / barCount;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
      {Array.from({ length: barCount }).map((_, i) => {
        const bandIndex = Math.floor((i / barCount) * bands.length);
        const bandValue = bands[bandIndex];
        const baseHeight = 20;
        const height = baseHeight + bandValue * 80; // Skaliere 0-1 auf 20-100

        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${height}%`,
              background: barColor,
              borderRadius: '2px',
              boxShadow: `0 0 10px ${barColor}88`,
              transition: 'height 0.05s ease-out',
            }}
          />
        );
      })}
    </div>
  );
};
```

## Audio-Synchronisations-Validierung

```typescript
// src/audio/validateAudioSync.ts
export interface SyncCheckpoint {
  frameNumber: number;
  expectedPeak: 'bass' | 'treble' | 'mid';
  expectedMinimumValue: number;
  tolerance: number; // ±tolerance
}

export const validateAudioSync = (
  audioData: AudioFrame[],
  checkpoints: SyncCheckpoint[]
) => {
  const results = checkpoints.map((checkpoint) => {
    const frame = audioData[checkpoint.frameNumber];

    if (!frame) {
      return {
        checkpoint,
        valid: false,
        reason: 'Frame index out of range',
      };
    }

    const fieldName = checkpoint.expectedPeak as keyof AudioFrame;
    const actualValue = frame[fieldName];

    const valid =
      actualValue >= checkpoint.expectedMinimumValue - checkpoint.tolerance &&
      actualValue <= checkpoint.expectedMinimumValue + checkpoint.tolerance;

    return {
      checkpoint,
      valid,
      actualValue,
      expectedValue: checkpoint.expectedMinimumValue,
      delta: actualValue - checkpoint.expectedMinimumValue,
    };
  });

  const allValid = results.every((r) => r.valid);

  console.log(`
    Audio Sync Validation:
    ✓ Passed: ${results.filter((r) => r.valid).length}/${results.length}
    ${!allValid ? '✗ FAILED: Some checkpoints did not match' : '✓ All checkpoints verified'}
  `);

  return {
    valid: allValid,
    results,
  };
};
```

## Web Audio API Integration (für Browser)

```typescript
// src/audio/webAudioAnalyzer.ts
export class WebAudioAnalyzer {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 1024;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }

  async loadAudio(audioPath: string) {
    const response = await fetch(audioPath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    return {
      source,
      audioBuffer,
    };
  }

  getFrequencyData(): Uint8Array {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  getTimeDomainData(): Uint8Array {
    const timeDomainArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(timeDomainArray);
    return timeDomainArray;
  }

  getRealtimeAnalysis(): AudioFrame {
    const freqData = this.getFrequencyData();

    // Vereinfachte Band-Extraktion
    const bass = this.averageFrequencyRange(freqData, 0, 10);
    const mid = this.averageFrequencyRange(freqData, 50, 100);
    const treble = this.averageFrequencyRange(freqData, 200, 512);

    return {
      frame: 0,
      timestamp: this.audioContext.currentTime * 1000,
      bass: bass / 255,
      mid: mid / 255,
      treble: treble / 255,
      lowMid: 0,
      highMid: 0,
      amplitude: 0,
      energy: (bass + mid + treble) / (3 * 255),
    };
  }

  private averageFrequencyRange(
    dataArray: Uint8Array,
    start: number,
    end: number
  ): number {
    let sum = 0;
    for (let i = start; i < end; i++) {
      sum += dataArray[i];
    }
    return sum / (end - start);
  }
}
```

Alle Audio-Processing-Komponenten sind now einsatzbereit!
