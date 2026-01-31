# ARCHIVE: Kinetic Typography "Neon Caption Engine" Standard
## [Jack Roberts / AntiGravity Setup Analysis]

**Status:** REFERENCE ARCHIVE | DESIGN STANDARD  
**Erstellt:** 2026-01-29  
**Quelle:** `Remotion-Setup.md.txt` (Jack Roberts) + Remotion Typography Docs  
**Kategorie:** Motion Graphics | Captions | Viral Design  
**Relevanz für Viron:** ⭐⭐⭐⭐⭐ CRITICAL

---

## 🎯 Mission Statement

Captions sind nicht einfach nur "Text am Unterteil". Captions sind **das erste, was Zuschauer bemerken**. Sie sind das **Engagement-Tool**, das entscheidet: "Scrolle ich weiter oder schaue ich dieses Video?"

Die "Neon Caption Engine" ist eine **visuelle Spezifikation**, die Videos sofort erkennbar und **viral** macht:

- **Farbe:** Neon Lime (#BFF549)
- **Glow:** Nicht statisch, sondern **animiert**
- **Chunk-System:** Nicht Wort-für-Wort, sondern intelligente **3-4 Wort-Chunks**
- **Timing:** Synchronisiert mit Audio (Whisper Timestamps)

Dies ist der **"Money Style"** der Top-Creators. TikTok, YouTube Shorts, Instagram Reels – alle nutzen diese Spezifikation (oder Varianten davon).

---

## 1️⃣ Die Visuelle Spezifikation (Die Non-Negotiables)

### Color & Styling

| Parameter | Wert | RGB | Grund |
|-----------|------|-----|-------|
| **Active (Current)** | `#BFF549` | 191, 245, 73 | Neon Lime. "Pops" auf dunklen Hintergründen. Virale Energie |
| **Inactive (Past)** | `#FFFFFF` | 255, 255, 255 | Weiß. Neutral, nicht ablenkend |
| **Dim (Future)** | `rgba(255,255,255,0.5)` | 255, 255, 255, 50% | Weiß mit 50% Opacity. Subtil, read-ahead |
| **Text Shadow** | `0px 4px 20px rgba(0,0,0,0.8)` | - | Heavy drop shadow. Lesesicherheit auch auf hellen Backgrounds |
| **Glow (Active)** | `drop-shadow(0 0 15px rgba(191,245,73,0.8))` | - | GPU-accelerated SVG Filter. Leuchtet! |

### Typography

| Aspekt | Wert | Grund |
|--------|------|-------|
| **Font Family** | `Inter` (via `@remotion/google-fonts`) | Modern, clean, skaliert gut |
| **Font Weight** | `800` (Extra Bold) | Maximale Lesbarkeit auf Mobile |
| **Font Size** | `72px` (auf 1080p) | Scale proportional: Höhe / 15 ≈ Größe |
| **Letter Spacing** | `0.02em` | Micro-tracking. Eleganz ohne Klumpigkeit |
| **Word Gap** | `24px` | Spacing zwischen Wörtern in Chunks |
| **Line Height** | `1.2` | Tight. Multi-line Text muss passen |

### Position & Layout

| Parameter | Wert | Grund |
|-----------|------|-------|
| **Position** | Bottom, `120px` from bottom | Safe-Zone. Nicht über Kontrollen/UI |
| **Width** | `100%` minus `40px` (Padding) | Responsive. Nutzt volle Breite |
| **Alignment** | Center | Blick-Fokus Mitte Screen |
| **Gradient Overlay** | Height: `40%`, Fade: transparent → `rgba(0,0,0,0.85)` | Lesbarkeit ohne weitere Texturen |

### Animation (Das "Wow")

| Moment | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| **Word Enters** | Scale: 1.0 → 1.1 + Opacity: 0 → 1 | 150ms | Spring (elastic) |
| **Word Active** | Glow pulse (optional) | Loop | Sine (subtle) |
| **Word Exits** | Scale: 1.1 → 1.0 + Opacity: 1 → 0 | 150ms | Spring (elastic) |

---

## 2️⃣ Das "Chunk-System" (Die Intelligenz)

### Warum Chunks statt Wörter?

**Problem:** Wort-für-Wort Captions sind:
- Zu schnell zu lesen
- Visuell chaotisch (zu viele Farbwechsel)
- Schwer zu folgen auf Mobile

**Lösung:** **3-4 Wort Chunks**

**Beispiel:**

```
Text: "Hallo zusammen, ich freue mich sehr, 
       euch dieses Tutorial zu zeigen."

Chunks:
[1] "Hallo zusammen, ich"
[2] "freue mich sehr,"
[3] "euch dieses Tutorial"
[4] "zu zeigen."
```

### Die Chunk-Logik (Algorithmus)

```typescript
interface Word {
  word: string;
  start: number;
  end: number;
}

interface Chunk {
  words: Word[];
  startTime: number;
  endTime: number;
  text: string;
}

function generateChunks(words: Word[], chunkSize: number = 4): Chunk[] {
  const chunks: Chunk[] = [];
  
  for (let i = 0; i < words.length; i += chunkSize) {
    const chunkWords = words.slice(i, i + chunkSize);
    
    chunks.push({
      words: chunkWords,
      startTime: chunkWords[0].start,
      endTime: chunkWords[chunkWords.length - 1].end,
      text: chunkWords.map(w => w.word).join(" ")
    });
  }
  
  return chunks;
}
```

### Edge Cases (Wichtig!)

**Fall 1:** Sätze enden mit Satzzeichen
```
Text: "Hallo, das ist ein Test."
Words: ["Hallo", ",", "das", "ist", "ein", "Test", "."]

Chunk sollte sein: "Hallo, das ist" (nicht "Hallo,")
→ Satzzeichen mit dem vorangegangenen Wort "kleben"
```

**Fall 2:** Sehr kurze Videos (< 10 Wörter)
```
Statt 4-Word Chunks → 2-3 Word Chunks
Damit Captions nicht zu schnell wechseln
```

**Fall 3:** Sehr lange Videos (> 5 Minuten)
```
Optional: Nur jede N-te Sekunde Captions zeigen
Oder: Nur bei Dialog, nicht bei Musik
```

---

## 3️⃣ Die Remotion React Component

### Basis-Struktur

```tsx
import React from 'react';
import { 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate,
  Easing,
  spring 
} from 'remotion';

interface CaptionWord {
  word: string;
  start: number;
  end: number;
}

interface CaptionChunk {
  words: CaptionWord[];
  startTime: number;
  endTime: number;
  text: string;
}

interface KineticCaptionProps {
  chunks: CaptionChunk[];
  videoFPS?: number;
}

export const KineticCaption: React.FC<KineticCaptionProps> = ({ 
  chunks, 
  videoFPS = 30 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;  // Convert frames to seconds
  
  // Find current chunk
  const currentChunk = chunks.find(
    chunk => time >= chunk.startTime && time < chunk.endTime
  );
  
  if (!currentChunk) {
    return null; // No caption at this time
  }
  
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '120px',
        left: '0',
        right: '0',
        width: '100%',
        textAlign: 'center',
        fontSize: '72px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        letterSpacing: '0.02em',
        color: '#FFFFFF',
        textShadow: '0px 4px 20px rgba(0,0,0,0.8)',
        paddingLeft: '20px',
        paddingRight: '20px',
        zIndex: 10,
      }}
    >
      {/* Gradient Overlay Background */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      
      {/* Words in Chunk */}
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {currentChunk.words.map((word, idx) => (
          <Word
            key={idx}
            word={word}
            isActive={time >= word.start && time < word.end}
            currentTime={time}
          />
        ))}
      </span>
    </div>
  );
};

interface WordProps {
  word: CaptionWord;
  isActive: boolean;
  currentTime: number;
}

const Word: React.FC<WordProps> = ({ word, isActive, currentTime }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  
  // Calculate word progress (0 to 1)
  const wordDuration = word.end - word.start;
  const wordProgress = Math.max(
    0,
    Math.min(1, (currentTime - word.start) / wordDuration)
  );
  
  // Entrance animation (0-150ms = 0-4.5 frames at 30fps)
  const entranceProgress = Math.min(1, wordProgress / 0.15); // 150ms / 1000ms
  
  // Scale animation
  const scale = interpolate(
    entranceProgress,
    [0, 1],
    [1.0, 1.1],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Opacity animation
  const opacity = interpolate(
    entranceProgress,
    [0, 1],
    [0, 1],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Color: Green when active, White otherwise
  const color = isActive ? '#BFF549' : '#FFFFFF';
  
  // Glow: Only when active
  const glowFilter = isActive 
    ? 'drop-shadow(0 0 15px rgba(191, 245, 73, 0.8))'
    : 'none';
  
  return (
    <span
      style={{
        transform: `scale(${scale})`,
        opacity,
        color,
        filter: glowFilter,
        transition: 'none', // Remotion handles timing
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {word.word}
    </span>
  );
};
```

---

## 4️⃣ Integration in Remotion Composition

### Die Vollständige Setup

```tsx
import { Composition } from 'remotion';
import { KineticCaption, CaptionChunk } from './KineticCaption';

// Sample transcript chunks (from Whisper)
const sampleChunks: CaptionChunk[] = [
  {
    words: [
      { word: "Hallo", start: 0.0, end: 0.4 },
      { word: "zusammen", start: 0.4, end: 0.8 },
      { word: "ich", start: 0.8, end: 1.1 },
    ],
    startTime: 0.0,
    endTime: 1.1,
    text: "Hallo zusammen ich"
  },
  {
    words: [
      { word: "freue", start: 1.1, end: 1.5 },
      { word: "mich", start: 1.5, end: 1.8 },
      { word: "sehr", start: 1.8, end: 2.1 },
    ],
    startTime: 1.1,
    endTime: 2.1,
    text: "freue mich sehr"
  },
];

export const MyVideo: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Background Video or Image */}
      <img 
        src="background.jpg" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      
      {/* Captions */}
      <KineticCaption chunks={sampleChunks} />
    </div>
  );
};

// Register in Root
<Composition
  id="VideoWithCaptions"
  component={MyVideo}
  durationInFrames={3000}
  fps={30}
  width={1080}
  height={1920}  // Vertical (Mobile)
/>
```

---

## 5️⃣ Performance Optimizations

### GPU-Accelerated Filter

```tsx
// ✅ GOOD: filter: drop-shadow (GPU)
style={{
  filter: 'drop-shadow(0 0 15px rgba(191, 245, 73, 0.8))'
}}

// ❌ BAD: textShadow (CPU)
style={{
  textShadow: '0 0 15px rgba(191, 245, 73, 0.8)'
}}
```

**Warum?** `filter` nutzt SVG Rendering (GPU), `textShadow` nutzt CPU-Rasterization.

### Minimize Re-renders

```tsx
// Memoize individual words
const Word = React.memo(({ word, isActive }: WordProps) => {
  // Component logic
});

// Memoize chunks array (don't recreate on every frame)
const chunks = useMemo(() => generateChunks(transcript), [transcript]);
```

### Caching Frames

```tsx
// Don't calculate every frame if not needed
const [cachedChunks, setCachedChunks] = useState<CaptionChunk[]>([]);

useEffect(() => {
  if (transcript !== prevTranscript) {
    setCachedChunks(generateChunks(transcript));
  }
}, [transcript]);
```

---

## 6️⃣ Customization (Der Flex-Faktor)

### Dark Mode vs Light Mode

```tsx
interface KineticCaptionProps {
  chunks: CaptionChunk[];
  theme?: 'dark' | 'light';
}

const getThemeColors = (theme: 'dark' | 'light') => {
  if (theme === 'dark') {
    return {
      activeColor: '#BFF549',    // Neon Lime
      inactiveColor: '#FFFFFF',  // White
      backgroundColor: 'rgba(0,0,0,0.85)',
      glowColor: 'rgba(191, 245, 73, 0.8)'
    };
  } else {
    return {
      activeColor: '#FF006E',    // Hot Pink (für Light Backgrounds)
      inactiveColor: '#333333',  // Dark Gray
      backgroundColor: 'rgba(255,255,255,0.85)',
      glowColor: 'rgba(255, 0, 110, 0.8)'
    };
  }
};
```

### Brand-Specific Colors

```tsx
// Viron Brand
{
  activeColor: '#BFF549',    // Viron Neon
  inactiveColor: '#FFFFFF',
  glowColor: 'rgba(191, 245, 73, 0.8)'
}

// Alternative (Cool Blue)
{
  activeColor: '#00D4FF',    // Cyan
  inactiveColor: '#FFFFFF',
  glowColor: 'rgba(0, 212, 255, 0.8)'
}

// Alternative (Hot Pink)
{
  activeColor: '#FF006E',
  inactiveColor: '#FFFFFF',
  glowColor: 'rgba(255, 0, 110, 0.8)'
}
```

---

## 7️⃣ Quality Rules (Die Non-Negotiables)

### Text Rendering

```tsx
// ✅ DO: Always use @remotion/google-fonts
import { Inter } from '@remotion/google-fonts';

// ❌ DON'T: Fallback to system fonts
fontFamily: 'Arial, sans-serif'  // NO!
```

### Glow Performance

```tsx
// ✅ Multiple layers for depth
filter: 'drop-shadow(0 0 10px rgba(...,0.4)) drop-shadow(0 0 20px rgba(...,0.6))'

// ❌ Single huge glow (looks cheap)
filter: 'drop-shadow(0 0 50px rgba(...,1))'
```

### Animation Smoothness

```tsx
// ✅ Use Remotion's spring + interpolate
const scale = interpolate(progress, [0,1], [1.0, 1.1], {
  easing: Easing.inOut(Easing.ease)
});

// ❌ CSS transitions (unreliable timing)
style={{ transition: 'transform 150ms ease-out' }}
```

---

## 8️⃣ Integration in Viron System

**Diese Datei sollte zu:**
```
skills/viron-system/rules/caption-engine-neon.md
```

**Der Agent nutzt diese Regel wenn:**
1. User sagt "Add captions" oder "--captions"
2. Whisper-Transkription verfügbar ist
3. Automatische Caption-Generierung aktiv ist

**Abhängigkeiten:**
- ✅ Remotion (interpolate, useCurrentFrame, spring)
- ✅ @remotion/google-fonts (Inter)
- ✅ Whisper Transcripts mit Word-Level Timestamps

---

## 📚 Referenzen

1. **Remotion Easing:** https://www.remotion.dev/docs/easing
2. **Remotion Interpolate:** https://www.remotion.dev/docs/interpolate
3. **CSS Filter Drop-Shadow:** https://developer.mozilla.org/en-US/docs/Web/CSS/filter
4. **GPU-Accelerated Rendering:** https://web.dev/animations-guide/
5. **Typography Best Practices:** https://material.design/design-tokens/

---

**END OF DATEI 18**

Status: ✅ READY FOR DOWNLOAD | Nächste: Datei 19 (Firecrawl Design Extraction), 20 (Supabase MCP), 21 (Agent Execution)
