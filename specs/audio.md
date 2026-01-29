# Viron Specification: Audio Analysis & Reactivity

- **Source**: `~/.gemini/antigravity/global_skills/remotion-best-practices/rules/audio.md`
- **Status**: Viron-Extension (erweitert den globalen Skill)
- **Relation**: Baut auf dem globalen `audio.md` auf mit professioneller FFT-Pipeline.

---

## Viron-Spezifische Erweiterungen

Die folgenden Konzepte gehen ÜBER den globalen Skill hinaus:

### 1. Deterministisches Audio-Framework

Viron verwendet ein **pre-analysiertes JSON-Format** für Audio-Daten, damit jeder Frame reproduzierbar ist:

```typescript
interface AudioFrame {
  frame: number;
  timestamp: number;
  bass: number; // 20-250 Hz
  mid: number; // 250-2000 Hz
  treble: number; // 2000-20000 Hz
  energy: number; // Gesamt-Energie
  amplitude: number; // Peak-Amplitude
}
```

### 2. FFT-zu-Remotion Pipeline

```
Audio-Datei (.wav)
    ↓
FFT Analysis (Node.js, vor Rendering)
    ↓
JSON Export (audio-frames.json)
    ↓
Remotion Component (liest JSON per Frame)
    ↓
Reaktive Animation (Bass → Scale, Treble → Glow)
```

### 3. Frequency-Band Mapping

| Band   | Frequenz    | Typische Reaktion    |
| ------ | ----------- | -------------------- |
| Bass   | 20-250 Hz   | Scale, Shake, Punch  |
| Mid    | 250-2000 Hz | Rotation, Morph      |
| Treble | 2000+ Hz    | Sparkle, Glint, Glow |

---

## Referenz zum Globalen Skill

Für die Basis-Konzepte (useAudioData, Audio-Komponenten, Lautstärke):
→ Lies: `~/.gemini/antigravity/global_skills/remotion-best-practices/rules/audio.md`

---

_Viron Audio Specification v2.0 | 2026-01-29_
