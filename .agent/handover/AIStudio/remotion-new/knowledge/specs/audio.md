# System Specification: Audio Analysis & Reactivity

Technical standard for Audio Visualization.

### 1. Deterministic Audio Framework

Use a pre-analyzed JSON format for Frame-Perfect reproduction:

```typescript
interface AudioFrame {
  frame: number;
  timestamp: number;
  bass: number; // 20-250 Hz
  mid: number; // 250-2000 Hz
  treble: number; // 2000-20000 Hz
  energy: number; // Total Energy
  amplitude: number; // Peak Amplitude
}
```

### 2. FFT-to-Remotion Pipeline

```
Audio File (.wav)
    ↓
FFT Analysis (Node.js, pre-render)
    ↓
JSON Export (audio-frames.json)
    ↓
Remotion Component (reads JSON per frame)
    ↓
Reactive Animation (Bass → Scale, Treble → Glow)
```

### 3. Frequency-Band Mapping

| Band   | Frequency   | Typical Reaction     |
| ------ | ----------- | -------------------- |
| Bass   | 20-250 Hz   | Scale, Shake, Punch  |
| Mid    | 250-2000 Hz | Rotation, Morph      |
| Treble | 2000+ Hz    | Sparkle, Glint, Glow |
