# Post-Processing Stack – Überblick

## Was ist Post-Processing?

Post-Processing ist die **abschließende Bildverarbeitung** nach dem 3D-Rendering. Dabei wird das fertig gerenderte 3D-Bild durch eine Serie von spezialiserten Shadern **nachbearbeitet**, um einen cinematic Look zu erreichen.

```
Renderte 3D-Szene
        ↓
    EffectComposer
        ↓
    ┌───┴───┬─────────┬──────────┬──────────┐
    ↓       ↓         ↓          ↓          ↓
  Bloom   DoF    ChromAbbr.   FilmGrain  Custom
    ↓       ↓         ↓          ↓          ↓
    └───┬───┴─────────┴──────────┴──────────┘
        ↓
    Finales Bild
```

## Warum Post-Processing?

| Problem | Lösung durch Post-Processing |
|---------|------------------------------|
| 3D-Bild sieht zu "digital/klinisch" | Film Grain, Chromatic Aberration |
| Helle Objekte haben keine Luminanz | Bloom (selective) |
| Alles ist gleich scharf | Depth of Field (DoF) |
| Überdefiniert, zu perfekt | Film Grain, Noise |
| Keine "Kamera-Optik"-Authentizität | Chromatic Aberration, Vignette |

## Die Standard Remotion Post-Processing Pipeline

Für **99% der Anwendungsfälle** brauchst du diese 4 Effekte in dieser Reihenfolge:

```typescript
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, FilmGrain } from '@react-three/postprocessing';

const CinematicStack = () => (
  <EffectComposer>
    {/* Selective Bloom – nur helle Bereiche glow */}
    <Bloom 
      intensity={0.8} 
      luminanceThreshold={1.0}
      luminanceSmoothing={0.9}
    />
    
    {/* Depth of Field – Fokus + Blur */}
    <DepthOfField 
      focusDistance={0.5}
      focalLength={0.025}
      bokehScale={6}
    />
    
    {/* Chromatic Aberration – Regenbogen-Kanten */}
    <ChromaticAberration 
      offset={[0.001, 0.0005]}
    />
    
    {/* Film Grain – Digitale Perfektion aufbrechen */}
    <FilmGrain 
      grain={0.15}
      animate={true}
    />
  </EffectComposer>
);
```

## Integration in Remotion

### Korrekte Struktur

```typescript
import { Composition } from 'remotion';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Scene = () => {
  const frame = useCurrentFrame();
  
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={2} />
      </mesh>
      
      {/* Post-Processing MUSS innerhalb Canvas sein */}
      <EffectComposer>
        <Bloom intensity={1.0} />
      </EffectComposer>
    </Canvas>
  );
};
```

## Performance-Strategie

Post-Processing ist **teuer**. Für lange Videos:

### Option 1: Vollständiges Post-Processing (schnelle Videos)
- Gut für: < 3 Minuten Video
- Renderzeit: 2-5 Stunden auf moderner Hardware

```typescript
const FULL_STACK = () => (
  <EffectComposer>
    <Bloom intensity={0.8} />
    <DepthOfField focusDistance={0.5} />
    <ChromaticAberration />
    <FilmGrain grain={0.15} />
  </EffectComposer>
);
```

### Option 2: Hybrides Baking (lange Videos)
- Gut für: > 10 Minuten Video
- Renderzeit: 30-60 Minuten auf Cloud (parallel)
- **Strategie:** Komplexe Effekte in Low-Res Texturen backen, dann in High-Res composite

```typescript
// 1. Render-Pass: Effekte in 512x512 Texture backen
const BakingPass = () => (
  <Canvas>
    <EffectComposer>
      <Bloom intensity={1.0} />
      <FilmGrain grain={0.2} />
    </EffectComposer>
  </Canvas>
);

// 2. Main Composition: Backte Texture als Input verwenden
const MainComposition = () => {
  // ... (baked texture wird hier als Material verwendet)
};
```

## Performance-Benchmark (Remotion 4.x auf M2 Pro)

| Stack | 1920×1080 @ 30 FPS | Renderzeit für 1 Min |
|-------|-------------------|---------------------|
| **Nur 3D (keine Effects)** | ✅ 0.5s/Frame | ~ 1 Minute |
| **Bloom + DoF** | ⚠️ 1.2s/Frame | ~ 2.5 Minuten |
| **Full Stack (Bloom+DoF+CA+Grain)** | ❌ 2.5s/Frame | ~ 5+ Minuten |
| **Baked Textures nur Composite** | ✅ 0.3s/Frame | ~ 30 Sekunden |

**Faustregel:** Pro zusätzliches Effect-Compose-Pass → +0.5-1s Renderzeit pro Frame.

## Häufige Fehler beim Post-Processing

### Fehler 1: Effekte sind zu intensiv

**Problem:**
```typescript
// ❌ Alles auf Maximum
<Bloom intensity={5.0} />          // Überstrahlt alles
<DepthOfField bokehScale={20} />   // Zu blur
<FilmGrain grain={0.5} />          // Zu körnig → sieht aus wie Fehler
```

**Lösung:**
```typescript
// ✅ Subtile, professionelle Werte
<Bloom intensity={0.8} />              // Nur helle Highlights
<DepthOfField bokehScale={6} />        // Minimal, fokussiert
<FilmGrain grain={0.15} animate={true} /> // Kaum sichtbar
```

### Fehler 2: Effekt-Reihenfolge ist falsch

**Problem:**
```typescript
// ❌ Falsche Ordnung
<EffectComposer>
  <FilmGrain />           // Grain zuerst?
  <Bloom intensity={10} /> // Bloom überstrahlt den Grain
  <DepthOfField />        // DoF blur den Bloom
</EffectComposer>
```

**Lösung:**
```typescript
// ✅ Richtige Ordnung: Räumlich → Körper → Optisch
<EffectComposer>
  <Bloom intensity={0.8} />              // 1. Räumliche Luminanz
  <DepthOfField focusDistance={0.5} />   // 2. Fokus-Effekte
  <ChromaticAberration offset={[0.001, 0.0005]} /> // 3. Optische Aberration
  <FilmGrain grain={0.15} />             // 4. Subtile Korrektur
</EffectComposer>
```

### Fehler 3: Post-Processing außerhalb von Canvas

**Problem:**
```typescript
// ❌ Post-Processing nicht im Canvas
return (
  <div>
    <Canvas>{/* 3D Objekt */}</Canvas>
    <EffectComposer>
      <Bloom /> {/* Funktioniert nicht! */}
    </EffectComposer>
  </div>
);
```

**Lösung:**
```typescript
// ✅ Post-Processing muss innerhalb Canvas sein
return (
  <Canvas>
    <mesh>{/* 3D Objekt */}</mesh>
    
    <EffectComposer>
      <Bloom />
    </EffectComposer>
  </Canvas>
);
```

## Dynamische Parameter mit useCurrentFrame

Post-Processing-Parameter können animiert werden:

```typescript
import { interpolate } from 'remotion';

const AnimatedPostProcessing = () => {
  const frame = useCurrentFrame();
  
  const bloomIntensity = interpolate(
    frame,
    [0, 60, 120],           // Keyframes
    [0, 1.5, 0.8]           // Intensität: 0 → 1.5 → 0.8
  );
  
  const doFDistance = interpolate(
    frame,
    [0, 120],
    [1.0, 0.2],             // Fokus zieht näher
    { extrapolateRight: 'clamp' }
  );
  
  return (
    <EffectComposer>
      <Bloom intensity={bloomIntensity} />
      <DepthOfField focusDistance={doFDistance} />
    </EffectComposer>
  );
};
```

## Quality-Einstellungen pro Resolution

### 4K (3840×2160)
```typescript
// Performance-Modus
<EffectComposer>
  <Bloom intensity={0.5} downsampling={2} />
  <DepthOfField bokehScale={3} />
  <FilmGrain grain={0.08} />
</EffectComposer>
```

### 2K (1920×1080)
```typescript
// Balanciert
<EffectComposer>
  <Bloom intensity={0.8} downsampling={1} />
  <DepthOfField bokehScale={6} />
  <FilmGrain grain={0.15} />
</EffectComposer>
```

### 1080p (1280×720)
```typescript
// Web-Optimiert
<EffectComposer>
  <Bloom intensity={1.0} />
  <DepthOfField bokehScale={8} />
  <FilmGrain grain={0.2} />
</EffectComposer>
```

## Checkliste vor dem Rendering

- [ ] **Bloom-Intensität** – Helle Objekte glow subtil, nicht überall
- [ ] **DoF-Fokus** – Schärfepunkt ist auf Hauptobjekt
- [ ] **Chromatic Aberration** – Offset ist klein (0.001 ist meist sichtbar genug)
- [ ] **Film Grain** – Kaum sichtbar bei normalem Viewing Distance
- [ ] **Render-Zeit getestet** – Minimum 1 Minute vollständiger Export
- [ ] **Cloud-Rendering konfiguriert** – AWS Lambda / GCP Compute Engine

## Troubleshooting

| Problem | Diagnose | Lösung |
|---------|----------|--------|
| Bloom macht alles weiß | `luminanceThreshold` < 1.0 | Auf 1.0-1.5 erhöhen |
| DoF sieht künstlich aus | Bokeh zu groß | `bokehScale` auf 4-6 reduzieren |
| Film Grain ist sichtbar als Fehler | `grain` > 0.2 | Auf 0.1-0.15 reduzieren |
| Rendering 10x zu langsam | Downsampling aktiv? | Downsampling aktivieren |
| Post-Effects scheinen ignoriert | Outside Canvas? | EffectComposer in Canvas verschieben |

---

## Nächste Schritte

1. **[Bloom – Selective](./01-bloom-selective.md)** – Detaillierte Bloom-Einstellung
2. **[Depth of Field](./02-depth-of-field.md)** – Focus & Bokeh optimieren
3. **[Chromatic Aberration](./03-chromatic-aberration.md)** – Optische Effekte
4. **[Film Grain & Noise](./04-film-grain-und-noise.md)** – Finale Subtilität

---

## Quellen

- [React-Postprocessing Docs](https://react-postprocessing.docs.pmnd.rs/)
- [High-End Visuelle Effekte für Remotion (PDF)](file:56) – Kap. 5: Post-Processing
- [drei Post-Processing Examples](https://github.com/pmndrs/postprocessing) – GitHub Repository
- [Remotion + React-Three-Fiber Integration](https://www.remotion.dev/docs/three)
