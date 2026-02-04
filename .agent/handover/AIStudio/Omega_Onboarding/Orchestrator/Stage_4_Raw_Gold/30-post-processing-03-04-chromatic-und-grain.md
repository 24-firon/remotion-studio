# Chromatic Aberration – Optische Linsen-Effekte

## Was ist Chromatic Aberration?

Chromatic Aberration (CA) ist der **Regenbogen-Effekt an Bildkanten**, den du bei billigen Kameraobjektiven siehst. Das Licht wird in seine farblichen Komponenten zerlegt:
- Rot → rechts verschoben
- Grün → mittig
- Blau → links verschoben

```
Ohne CA:        Mit CA:
[Sharp Edge]    [Red↗ / Blue↖]
                [Rainbow Fringe]
```

### Fotografischer Hintergrund

In echten Linsen tritt CA auf, weil:
- Unterschiedliche Wellenlängen (Farben) brechen unterschiedlich
- Besonders sichtbar bei extremen Weitwinkellinsen
- Teure Objektive minimieren CA durch speziale Glas-Konstruktionen

CA simuliert die **Authentizität einer echten Linse**.

## API-Referenz

```typescript
import { ChromaticAberration } from '@react-three/postprocessing';

<ChromaticAberration
  // Versatz-Stärke für Rot und Blau
  offset={[0.001, 0.0005]}  
  // offset[0] = horizontale Versatz (x)
  // offset[1] = vertikale Versatz (y)
  // Typisch: [0.0005 - 0.003, 0.0005 - 0.002]
  
  // Blend-Funktion (optional)
  blendFunction={BlendFunction.NORMAL}
/>
```

## Praktische Presets

### Preset 1: Subtil (kaum sichtbar)

```typescript
<ChromaticAberration
  offset={[0.0005, 0.0003]}
/>
```

**Wann nutzen:**
- Professionelle Videos
- Wenn CA nur subliminal wirken soll

**Ergebnis:** Kaum wahrnehmbar, aber "echt".

### Preset 2: Standard (sichtbar)

```typescript
<ChromaticAberration
  offset={[0.001, 0.0005]}
/>
```

**Wann nutzen:**
- Meiste Anwendungsfälle
- Cinematic Footage
- Trailer

**Ergebnis:** Deutlich sichtbar, nicht störend.

### Preset 3: Intensiv (Kunsteffekt)

```typescript
<ChromaticAberration
  offset={[0.005, 0.003]}
/>
```

**Wann nutzen:**
- Futuristische/Sci-Fi Szenen
- Glitch-Art-Effekte
- VHS-Nostalgie-Look

**Ergebnis:** Deutlich sichtbare Regenbogenkanten.

## CA Werte verstehen

| Offset | Visueller Effekt | Nutzefall |
|--------|-----------------|----------|
| `[0.0001, 0.00005]` | Unsichtbar | Nur Authentizität |
| `[0.0005, 0.0003]` | Kaum sichtbar | Professionell |
| `[0.001, 0.0005]` | Sichtbar | Standard |
| `[0.003, 0.0015]` | Deutlich | Dramatisch |
| `[0.01, 0.005]` | Extrem | Kunsteffekt |

## Animierte CA mit Remotion

CA-Intensität kann über Zeit pulsieren:

```typescript
import { useCurrentFrame, interpolate } from 'remotion';
import { ChromaticAberration } from '@react-three/postprocessing';

const PulsingCA = () => {
  const frame = useCurrentFrame();
  
  // CA pulsiert: subtil → intensiv → subtil
  const offsetStrength = interpolate(
    frame,
    [0, 60, 120],
    [0.0003, 0.005, 0.0003]
  );
  
  return (
    <ChromaticAberration
      offset={[offsetStrength, offsetStrength * 0.5]}
    />
  );
};
```

## Häufige Fehler

### Fehler 1: CA ist unsichtbar

**Problem:**
```typescript
// ❌ Offsets viel zu klein
<ChromaticAberration offset={[0.00001, 0.000005]} />
```

**Lösung:**
```typescript
// ✅ Standard-Werte verwenden
<ChromaticAberration offset={[0.001, 0.0005]} />
```

### Fehler 2: CA ist zu intensiv

**Problem:**
```typescript
// ❌ Regenbogen-Monster
<ChromaticAberration offset={[0.02, 0.01]} />
```

**Lösung:**
```typescript
// ✅ Subtiler bleiben
<ChromaticAberration offset={[0.001, 0.0005]} />
```

### Fehler 3: Asymmetrische CA sieht falsch aus

**Problem:**
```typescript
// ❌ Vertikale und horizontale Komponente sehr unterschiedlich
<ChromaticAberration offset={[0.01, 0.0001]} />
```

**Lösung:**
```typescript
// ✅ Verhältnis etwa 2:1 halten
<ChromaticAberration offset={[0.002, 0.001]} />
```

## CA + volle Post-Processing Pipeline

```typescript
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, FilmGrain } from '@react-three/postprocessing';

const FullPipeline = () => (
  <EffectComposer>
    <Bloom intensity={0.8} luminanceThreshold={1.0} />
    <DepthOfField focusDistance={0.5} bokehScale={6} />
    <ChromaticAberration offset={[0.001, 0.0005]} />
    <FilmGrain grain={0.15} />
  </EffectComposer>
);
```

---

# Film Grain & Noise – Subtile Perfektion aufbrechen

## Was ist Film Grain?

Film Grain ist ein **subtiles Rauschen**, das die digitale Perfektion aufbricht. Es simuliert die Körnigkeit von echtem Film.

```
Ohne Grain:     Mit Grain:
[Glatt]         [Körnig, organisch]
[Zu perfekt]    [Echt wirkendes Rauschen]
```

## API-Referenz

```typescript
import { FilmGrain } from '@react-three/postprocessing';

<FilmGrain
  // Körnigkeits-Intensität (0.0 = invisible, 1.0 = sehr stark)
  grain={0.15}        // Range: 0.0 - 1.0 (Typical: 0.1 - 0.3)
  
  // Animiertes Rauschen? (flackert bei jedem Frame)
  animate={true}      // true = neue Noise bei jedem Frame
                      // false = statisches Muster
  
  // Optionale Blend-Funktion
  blendFunction={BlendFunction.MULTIPLY}
/>
```

## Praktische Presets

### Preset 1: Subtil (kaum sichtbar)

```typescript
<FilmGrain
  grain={0.08}
  animate={true}
/>
```

**Wann nutzen:**
- High-End Visuals
- Wenn du subtilität willst

**Ergebnis:** Kaum sichtbar, aber Video fühlt sich weniger digital an.

### Preset 2: Standard (sichtbar)

```typescript
<FilmGrain
  grain={0.15}
  animate={true}
/>
```

**Wann nutzen:**
- Meiste Anwendungsfälle
- Cinematic Look
- Default-Setting

**Ergebnis:** Deutlich sichtbar, wirkt authentisch.

### Preset 3: Intensiv (analog)

```typescript
<FilmGrain
  grain={0.35}
  animate={true}
/>
```

**Wann nutzen:**
- Retro/Vintage Looks
- 70er/80er Aesthetic
- Kunsteffekte

**Ergebnis:** Deutlich körnig, analog-wirkendes Video.

## animate={true} vs animate={false}

| Setting | Effekt | Nutze für |
|---------|--------|----------|
| `animate={true}` | Neues Rauschen bei jedem Frame | Cinematic, dynamisch |
| `animate={false}` | Statisches Rausch-Muster | Stille Bilder, Performance |

```typescript
// ✅ RICHTIG für Videos
<FilmGrain grain={0.15} animate={true} />

// ✅ OK für Standbilder/Pausen
<FilmGrain grain={0.15} animate={false} />
```

## Häufige Fehler

### Fehler 1: Grain ist unsichtbar

**Problem:**
```typescript
// ❌ Zu subtil
<FilmGrain grain={0.02} animate={true} />
```

**Lösung:**
```typescript
// ✅ Mindestens 0.1-0.15
<FilmGrain grain={0.15} animate={true} />
```

### Fehler 2: Grain ist zu störend

**Problem:**
```typescript
// ❌ Sieht aus wie Fehler
<FilmGrain grain={0.5} animate={true} />
```

**Lösung:**
```typescript
// ✅ Subtil bleiben
<FilmGrain grain={0.15} animate={true} />
```

### Fehler 3: Grain flackert unnatürlich

**Problem:**
```typescript
// ❌ Flackert bei jedem Frame
<FilmGrain grain={0.3} animate={true} /> // Mit extremem Grain
```

**Lösung:**
```typescript
// ✅ Kombiniere mit Film Grain Smoothing
<FilmGrain grain={0.15} animate={true} />
// Der Renderer glättet das automatisch über mehrere Frames
```

## Grain + volle Post-Pipeline

```typescript
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, FilmGrain } from '@react-three/postprocessing';

const CompleteStack = () => (
  <EffectComposer>
    {/* 1. Räumliche Effekte */}
    <Bloom intensity={0.8} luminanceThreshold={1.0} />
    
    {/* 2. Fokus-Effekte */}
    <DepthOfField focusDistance={0.5} bokehScale={6} />
    
    {/* 3. Optische Aberration */}
    <ChromaticAberration offset={[0.001, 0.0005]} />
    
    {/* 4. Analog-Charakter */}
    <FilmGrain grain={0.15} animate={true} />
  </EffectComposer>
);
```

## Performance-Vergleich

| Effect | Kosten/Frame | Performance-Tip |
|--------|-------------|-----------------|
| Bloom | +0.1-0.2s | `downsampling={2}` |
| DoF | +0.3-0.5s | `bokehScale={6}` |
| ChromAbbr | +0.05s | Negligible |
| FilmGrain | +0.1s | `animate={false}` wenn Pause |
| **Full Stack** | +0.6-1.0s | Nutze für < 5 Min Videos |

## Zusammenfassung: Vollständige Pipeline

```typescript
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, FilmGrain } from '@react-three/postprocessing';
import { useCurrentFrame } from 'remotion';

const CinematicScene = () => {
  const frame = useCurrentFrame();
  
  return (
    <Canvas>
      {/* 3D Content */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Post-Processing Stack */}
      <EffectComposer>
        {/* 1. Selective Bloom */}
        <Bloom
          intensity={0.8}
          luminanceThreshold={1.0}
          luminanceSmoothing={0.9}
          downsampling={2}
        />
        
        {/* 2. Depth of Field */}
        <DepthOfField
          focusDistance={0.5}
          focalLength={0.015}
          bokehScale={6}
        />
        
        {/* 3. Chromatic Aberration */}
        <ChromaticAberration
          offset={[0.001, 0.0005]}
        />
        
        {/* 4. Film Grain */}
        <FilmGrain
          grain={0.15}
          animate={true}
        />
      </EffectComposer>
    </Canvas>
  );
};
```

---

## Quellen

- [React-Postprocessing: ChromaticAberration](https://react-postprocessing.docs.pmnd.rs/effects/chromatic-aberration)
- [React-Postprocessing: FilmGrain](https://react-postprocessing.docs.pmnd.rs/effects/film-grain)
- [High-End Visuelle Effekte für Remotion (PDF)](file:56) – Kap. 5.3-5.4
