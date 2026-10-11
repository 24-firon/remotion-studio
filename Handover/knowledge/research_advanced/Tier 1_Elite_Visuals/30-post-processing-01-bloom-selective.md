# Bloom – Selective Light Glow

## Was ist Selective Bloom?

Bloom erzeugt einen **sanften Strahlenkranz** um helle Objekte. "Selective" bedeutet, dass nur Pixel oberhalb eines `luminanceThreshold` glühen – nicht das ganze Bild.

```
Ohne Bloom:        Mit Bloom:
[White Box]        [White Box with glow ✨]
(scharfe Kanten)   (weiches Halo)
```

### Fotografischer Hintergrund

In realen Kameras passiert das, wenn starke Lichter durch die Linse scheinen:
- Das Licht "überstrahlt" den Sensor
- Es erzeugt einen hellen Halo um die Lichtquelle
- Der Effekt ist besonders bei modernen Handy-Kameras sichtbar

Bloom **simuliert diese Optik** digital.

## API-Referenz

```typescript
import { Bloom } from '@react-three/postprocessing';

<Bloom
  // Wie hell ist das Glow insgesamt?
  intensity={1.0}          // Range: 0.0 - 5.0 (Default: 1.0)
  
  // Ab welcher Helligkeit fängt das Glow an?
  luminanceThreshold={1.0} // Range: 0.0 - 2.0 (Default: 0.9)
  
  // Wie sanft ist der Übergang zum Glow?
  luminanceSmoothing={0.9} // Range: 0.0 - 1.0 (Default: 0.9)
  
  // Downsampling für Performance
  downsampling={1}         // 1 = Full Res (teuer)
                           // 2 = Halb-Res (schneller)
  
  // Blur-Radius des Halos
  kernelSize={15}          // Range: 1 - 32 (Default: 15)
  
  // Optionale Blend-Funktion
  blendFunction={BlendFunction.ADDITION} // Wie werden Farben gemischt?
/>
```

## Praktische Presets

### Preset 1: Subtil (Standard Websites)

```typescript
<Bloom
  intensity={0.5}
  luminanceThreshold={1.2}
  luminanceSmoothing={0.95}
  kernelSize={10}
/>
```

**Wann nutzen:**
- Web-3D-Szenen
- Produktvisualisierungen
- Helle UI-Elemente

**Ergebnis:** Kaum sichtbar, aber professionell.

### Preset 2: Cinematic (Filmtrailer)

```typescript
<Bloom
  intensity={0.8}
  luminanceThreshold={1.0}
  luminanceSmoothing={0.9}
  kernelSize={15}
/>
```

**Wann nutzen:**
- Produkttrailer (Apple Style)
- Musicvideos
- Trailer und Intros

**Ergebnis:** Sichtbar, aber nicht übertrieben.

### Preset 3: Intense (HDR-Look)

```typescript
<Bloom
  intensity={1.5}
  luminanceThreshold={0.8}
  luminanceSmoothing={0.85}
  kernelSize={20}
/>
```

**Wann nutzen:**
- Futuristische Szenen
- Sci-Fi Visuals
- Künstlerische Interpretationen

**Ergebnis:** Deutlich sichtbar, dramatisch.

## Bloom + emissiveMaterial kombinieren

Damit Bloom wirkt, brauchst du **emissive Materials**, die Licht ausstrahlen:

```typescript
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Bloom } from '@react-three/postprocessing';

const GlowingCube = () => {
  const meshRef = useRef();
  const frame = useCurrentFrame();
  
  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="white"
          // 🔑 Diese Eigenschaften machen Bloom sichtbar:
          emissive="white"           // Farbe des Glow
          emissiveIntensity={2}      // Helligkeit des Glow (0-10)
          emissiveMap={texture}      // Optional: Textur für Glow-Pattern
          roughness={0.5}
          metalness={0}
        />
      </mesh>
      
      {/* Post-Processing */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={1.0}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
};
```

### emissiveIntensity vs. luminanceThreshold

| Parameter | Effekt |
|-----------|--------|
| **emissiveIntensity ↑** | Objekt strahlt heller → Bloom stärker |
| **luminanceThreshold ↓** | Weniger helle Pixel triggern Bloom → Mehr glüht |
| **luminanceThreshold ↑** | Nur sehr helle Pixel glühen → Weniger glüht |

**Beispiel:**
```typescript
// ❌ Bloom unsichtbar
<meshStandardMaterial emissiveIntensity={0.1} />
<Bloom luminanceThreshold={2.0} />  // Zu hoher Threshold!

// ✅ Bloom sichtbar
<meshStandardMaterial emissiveIntensity={2.0} />
<Bloom luminanceThreshold={1.0} />
```

## Dynamischer Bloom mit Remotion

Bloom-Intensität kann über die Zeit animiert werden:

```typescript
import { useCurrentFrame, interpolate } from 'remotion';
import { Bloom } from '@react-three/postprocessing';

const AnimatedBloom = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  
  // Bloom pulsiert: 0.3 → 1.0 → 0.3
  const bloomIntensity = interpolate(
    frame,
    [0, 30, 60],                    // Keyframes (0, 1s, 2s)
    [0.3, 1.0, 0.3],                // Intensität-Werte
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.9}
      />
    </EffectComposer>
  );
};
```

## Performance-Tipps

| Tipp | Effekt |
|------|--------|
| `downsampling={2}` | ⚡ Schneller 4x, minimal sichtbar |
| `kernelSize={10}` statt `15` | ⚡ Schneller 15%, weniger Blur |
| `luminanceThreshold={1.5}` | ⚡ Weniger Bloom-Area → schneller |
| Nur auf key frames | ⚡ Render-Zeit halbiert |

**Benchmark:** Bloom mit `downsampling={2}` kostet nur ~0.1s/Frame extra.

## Häufige Fehler

### Fehler 1: Bloom ist unsichtbar

**Problem:**
```typescript
// ❌ Objekt strahlt nicht, daher kein Bloom
<mesh>
  <boxGeometry />
  <meshStandardMaterial
    color="white"
    emissiveIntensity={0}  // 🔴 Keine Emission!
  />
</mesh>

<Bloom
  luminanceThreshold={0.5}  // 🔴 Zu niedriger Threshold
/>
```

**Lösung:**
```typescript
// ✅ Emission + richtiger Threshold
<meshStandardMaterial
  emissive="white"
  emissiveIntensity={2}  // 🟢 Muss > 1 sein
/>

<Bloom
  luminanceThreshold={1.0}  // 🟢 Standard-Wert
/>
```

### Fehler 2: Bloom überstrahlt alles

**Problem:**
```typescript
// ❌ Zu aggressiv
<Bloom
  intensity={5.0}              // Viel zu hoch
  luminanceThreshold={0.1}     // Alles glüht
  kernelSize={32}              // Huge blur
/>
```

**Lösung:**
```typescript
// ✅ Subtiler und selektiver
<Bloom
  intensity={0.8}              // 0.5 - 1.0 ist Standard
  luminanceThreshold={1.0}     // Nur wirklich helle Pixel
  kernelSize={15}              // Normal
/>
```

### Fehler 3: Bloom Performance-killer

**Problem:**
```typescript
// ❌ Teuer für lange Videos
<Bloom
  downsampling={1}             // Full resolution!
  kernelSize={32}              // Max blur!
/> // → 2-3 Sekunden extra pro Frame!
```

**Lösung:**
```typescript
// ✅ Optimiert für Remotion
<Bloom
  intensity={0.8}
  luminanceThreshold={1.0}
  kernelSize={15}
  downsampling={2}             // Halb-Resolution
/> // → 0.1-0.2 Sekunden extra pro Frame
```

## Bloom + andere Effects kombinieren

```typescript
import { EffectComposer, Bloom, DepthOfField, FilmGrain } from '@react-three/postprocessing';

const FullCinematicStack = () => (
  <EffectComposer>
    {/* 1. Bloom muss zuerst sein */}
    <Bloom
      intensity={0.8}
      luminanceThreshold={1.0}
    />
    
    {/* 2. DoF blur kann Bloom beeinflussen */}
    <DepthOfField
      focusDistance={0.5}
      bokehScale={6}
    />
    
    {/* 3. Film Grain nimmt dem Bloom die Perfektion */}
    <FilmGrain
      grain={0.15}
      animate={true}
    />
  </EffectComposer>
);
```

## Troubleshooting

| Problem | Grund | Lösung |
|---------|-------|--------|
| Bloom völlig unsichtbar | `emissiveIntensity={0}` | ↑ auf 1-2 |
| Bloom ist weiße Masse | `luminanceThreshold` zu niedrig | ↑ auf 1.0-1.5 |
| Bloom zu verwaschen | `kernelSize` zu groß | ↓ auf 10-15 |
| Performance collapse | Downsampling nicht aktiv | `downsampling={2}` |
| Bloom nur auf Kanten sichtbar | Threshold zu hoch | ↓ auf 0.8-1.0 |

---

## Zusammenfassung

| Aspekt | Best Practice |
|--------|---------------|
| **Default Setup** | `intensity={0.8}, luminanceThreshold={1.0}` |
| **Material** | `emissive="white", emissiveIntensity={2}` |
| **Performance** | `downsampling={2}, kernelSize={15}` |
| **Animation** | `interpolate()` für pulsierendes Glow |
| **Reihenfolge** | Bloom zuerst in EffectComposer |

---

## Quellen

- [React-Postprocessing: Bloom Docs](https://react-postprocessing.docs.pmnd.rs/effects/bloom)
- [drei: Bloom Source Code](https://github.com/pmndrs/postprocessing/blob/main/src/effects/BloomEffect.js)
- [High-End Visuelle Effekte für Remotion (PDF)](file:56) – Kap. 5.1: Selective Bloom
- [Apple Design System: Glow Effects](https://developer.apple.com/design/resources/)
