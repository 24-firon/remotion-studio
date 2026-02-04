# Timeline & Frames – Das Herzstück von Remotion

## Was ist `useCurrentFrame`?

`useCurrentFrame` ist der primäre Hook in Remotion. Er gibt dir bei jedem Render-Pass die aktuelle Frame-Nummer als **Integer** zurück. Dies ist deine einzige Zeit-Quelle.

```typescript
import { useCurrentFrame } from 'remotion';

const MyComponent = () => {
  const frame = useCurrentFrame(); // z.B. 0, 1, 2, ..., 299
  return <div>{`Frame: ${frame}`}</div>;
};
```

### Warum nicht `useEffect` oder `requestAnimationFrame`?

| Ansatz | Problem in Remotion |
|--------|-------------------|
| `CSS Transitions` | Werden nicht deterministisch berechnet; können in Headless-Browser flackern |
| `window.requestAnimationFrame` | Läuft zu Echtzeitrahmen; beim Render in AWS Lambda unpredictable |
| `setInterval` | Asynchron; bricht Determinismus |
| `useEffect` | Side Effect; keine Garantie auf Frame-Synchronität |
| **`useCurrentFrame`** | ✅ Synchron, deterministisch, parallel-renderbar |

## Der Determinismus-Imperativ

**Determinismus** bedeutet: Bei jedem Aufruf von Frame `N` wird **exakt das gleiche Ergebnis** erzeugt.

```typescript
// ✅ RICHTIG – deterministische Animation
const RotatingBox = () => {
  const frame = useCurrentFrame();
  const rotation = (frame / 100) * 360; // 0° → 360° über 100 Frames
  
  return (
    <div style={{
      transform: `rotateZ(${rotation}deg)`,
      width: 100,
      height: 100,
      backgroundColor: 'blue'
    }} />
  );
};

// ❌ FALSCH – nicht-deterministische Animation
const RotatingBoxBroken = () => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => r + 3.6); // Nicht an Frames gebunden!
    }, 16);
    return () => clearInterval(interval);
  }, []);
  
  return <div style={{ transform: `rotateZ(${rotation}deg)` }} />;
};
```

## FPS und Frame-Arithmetik

### Standard-Einstellung

```typescript
// In deiner Remotion-Konfiguration (remotion.config.ts)
export const VIDEO_CONFIG: VideoConfig = {
  fps: 30, // oder 24, 60
  width: 1920,
  height: 1080,
  durationInFrames: 300, // 10 Sekunden bei 30 FPS
};

// 1 Sekunde = 30 Frames
// Gesamtdauer = durationInFrames / fps = 300 / 30 = 10 Sekunden
```

### Timing-Berechnung

```typescript
import { useCurrentFrame, useVideoConfig } from 'remotion';

const TimingDemo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const secondsElapsed = frame / fps; // z.B. 42 / 30 = 1.4 Sekunden
  const millisElapsed = (frame / fps) * 1000; // z.B. 1400 ms
  
  return (
    <div>
      <p>Frame: {frame}</p>
      <p>Seconds: {secondsElapsed.toFixed(2)}</p>
      <p>Milliseconds: {millisElapsed.toFixed(0)}</p>
    </div>
  );
};
```

## Praktische Patterns

### Pattern 1: Lineare Animation (Einfach)

```typescript
const LinearAnimation = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const duration = 2; // 2 Sekunden
  const totalFrames = duration * fps; // 60 Frames
  
  // Wert von 0 bis 1 über 2 Sekunden
  const progress = Math.min(frame / totalFrames, 1);
  
  return (
    <div style={{
      opacity: progress, // 0 → 1
      transform: `translateX(${progress * 200}px)`, // 0 → 200px
    }}>
      Animation lädt...
    </div>
  );
};
```

### Pattern 2: Zyklische Animation (Loop)

```typescript
const LoopingAnimation = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const loopDuration = 60; // 2-Sekunden-Loop
  
  // Modulo-Operation: 0 → 60 → 0 → 60 ...
  const frameInLoop = frame % loopDuration;
  const cycleProgress = frameInLoop / loopDuration;
  
  return (
    <div style={{
      transform: `rotate(${cycleProgress * 360}deg)`, // 360° Loop
    }}>
      ⭕ Ewig rotierend
    </div>
  );
};
```

### Pattern 3: Verzögerter Start (Delay)

```typescript
const DelayedAnimation = ({ delayInSeconds = 1 }) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const delayInFrames = delayInSeconds * fps;
  
  // Animation startet erst nach der Verzögerung
  if (frame < delayInFrames) {
    return <div>Warte...</div>;
  }
  
  const animationFrame = frame - delayInFrames;
  const progress = animationFrame / 60;
  
  return (
    <div style={{ opacity: Math.min(progress, 1) }}>
      Ich bin sichtbar!
    </div>
  );
};
```

## Fortgeschrittene: Easing & Interpolation

Lineare Animationen sind statisch. Professionelle Animationen nutzen **Easing-Funktionen**:

```typescript
import { interpolate, Easing } from 'remotion';

const EasingExample = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const duration = 1; // 1 Sekunde
  
  // interpolate(frame, input_range, output_range, easing_config)
  const smoothScale = interpolate(
    frame,
    [0, duration * fps],           // Input: 0 → 30 Frames
    [1, 2],                        // Output: 1 → 2 (Skalierung)
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth ease-out
      extrapolateLeft: 'clamp',    // Nicht unter 1
      extrapolateRight: 'clamp',   // Nicht über 2
    }
  );
  
  return (
    <div style={{ transform: `scale(${smoothScale})` }}>
      Sanfte Skalierung
    </div>
  );
};
```

## Performance-Überlegungen

### Frame-Budget

| Operation | Impact |
|-----------|--------|
| Simple `useCurrentFrame` + Arithmetik | Negligible |
| SVG-Rendering mit `frame` | Low (< 1ms) |
| 3D-Szene mit `drei` | Medium (10-50ms) |
| Post-Processing (EffectComposer) | High (50-200ms) |
| Komplexes Raycasting | Very High (> 200ms) |

**Zielwert:** Ein Frame sollte in < 100ms renderable sein (für 30 FPS Realtime-Preview).

### Best Practices

1. **Verschiebe teure Operationen in Texturen** (Baking)
   ```typescript
   // ❌ TEUER: Berechne jeden Frame neu
   const expensiveValue = complexMath(frame);
   
   // ✅ BILLIG: Nutze vorberechnete Texture
   const texture = useTexture('./precomputed.exr');
   ```

2. **Nutze Memoization für teure Berechnungen**
   ```typescript
   import { useMemo } from 'react';
   
   const MemoizedCalculation = () => {
     const frame = useCurrentFrame();
     const result = useMemo(() => expensiveCalc(frame), [frame]);
     return <div>{result}</div>;
   };
   ```

3. **Lazy-Loading für große 3D-Assets**
   ```typescript
   import { Suspense } from 'react';
   import { useGLTF } from '@react-three/drei';
   
   const Scene = () => (
     <Suspense fallback={<PlaceholderMesh />}>
       <Model />
     </Suspense>
   );
   ```

## Häufige Fehler & Lösungen

### Fehler 1: Flackern bei Übergängen

**Problem:**
```typescript
// ❌ Frame springt von 0 auf 1 → sichtbar
if (frame >= 30) {
  return <NewComponent />;
}
return <OldComponent />;
```

**Lösung:**
```typescript
// ✅ Sanfter Übergang mit Opacity
const opacity = interpolate(
  frame,
  [25, 35], // Fade zwischen Frame 25-35
  [1, 0]
);
return <Component style={{ opacity }} />;
```

### Fehler 2: Zeitbasierte Berechnungen sind off

**Problem:**
```typescript
// ❌ Funktioniert nur bei 30 FPS!
const seconds = frame / 30; // Hardcoded!
```

**Lösung:**
```typescript
// ✅ Nutze dynamisches FPS
import { useVideoConfig } from 'remotion';

const TimedAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps; // Funktioniert bei 24, 30, 60 FPS
  return <div>{seconds.toFixed(1)}s elapsed</div>;
};
```

### Fehler 3: State in Loop wird nicht zurückgesetzt

**Problem:**
```typescript
// ❌ Loop bei Frame 100, aber Component merkt sich alte State
const [isOpen, setIsOpen] = useState(false);

const LoopingMenu = () => {
  const frame = useCurrentFrame();
  const loopStart = 100;
  
  if (frame % 200 === loopStart) {
    setIsOpen(true); // PROBLEM: State-Mutation außerhalb Render
  }
};
```

**Lösung:**
```typescript
// ✅ Nutze derived State aus Frame
const LoopingMenu = () => {
  const frame = useCurrentFrame();
  const cycleFrame = frame % 200;
  const isOpen = cycleFrame > 50 && cycleFrame < 150; // Deterministic
  
  return <Menu open={isOpen} />;
};
```

## Zusammenfassung

| Konzept | Merksatz |
|---------|----------|
| **useCurrentFrame** | Deine einzige Zeitquelle – alles andere muss synchron sein |
| **Determinismus** | Bei Frame N → immer identisches Ergebnis |
| **FPS-Arithmetik** | Zeiten = `frame / fps`, Delays = `frameInLoop % duration` |
| **Easing** | Nutze `interpolate()` + `Easing.bezier()` statt linear |
| **Performance** | Speichere teure Berechnungen in Texturen (Baking) |

---

## Quellen

- [Remotion Docs: useCurrentFrame](https://www.remotion.dev/docs/use-current-frame)
- [Remotion Docs: interpolate](https://www.remotion.dev/docs/interpolate)
- [High-End Visuelle Effekte für Remotion (PDF)](file:56) – Kap. 1-2: Timeline-Architektur
