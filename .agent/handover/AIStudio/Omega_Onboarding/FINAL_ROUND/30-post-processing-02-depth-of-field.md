# Depth of Field – Fokus & Blur-Realismus

## Was ist Depth of Field?

Depth of Field (DoF) simuliert die **optische Unschärfe einer realen Kamera**. Objekte außerhalb des Fokuspunkts werden weich verschwommen, was dem Auge hilft, sich auf die wichtigen Elemente zu konzentrieren.

```
Ohne DoF:           Mit DoF:
[Alles scharf]      [Fokus scharf]
                    [Rest blur ↓]
```

### Fotografischer Hintergrund

- **Brennweite zu**: Nur sehr kleine Bereiche sind scharf
- **Blende offen** (f/1.8): Tiefer Bokeh-Blur
- **Blende zu** (f/16): Fast alles scharf

DoF ist ein **Tiefenmarker**: Das Auge assoziiert DoF mit "professionelle Fotografie".

## API-Referenz

```typescript
import { DepthOfField } from '@react-three/postprocessing';

<DepthOfField
  // Entfernung zum Fokuspunkt (0.0 = nah, 1.0 = weit)
  focusDistance={0.5}      // Range: 0.0 - 1.0 (Default: 0.0)
  
  // Wie schnell fade ich aus dem Fokus?
  focalLength={0.025}      // Range: 0.0 - 1.0 (Default: 0.025)
                           // Kleinere Werte = tieferes DoF
  
  // Größe der Bokeh-Kreise
  bokehScale={6}           // Range: 0.1 - 50.0 (Default: 6.0)
  
  // Blur-Radius bei maximaler Distanz
  width={Resizer.AUTO_SIZE} // Canvas-Breite (Auto)
  height={Resizer.AUTO_SIZE} // Canvas-Höhe (Auto)
/>
```

## Praktische Presets

### Preset 1: Fotografisch (Portrait-Modus)

```typescript
<DepthOfField
  focusDistance={0.5}      // Mittlere Tiefe
  focalLength={0.015}      // Steilerer Gradient
  bokehScale={8}           // Größere Bokeh-Kreise
/>
```

**Wann nutzen:**
- Close-up Shots
- Product Photography
- Portrait-Fokus

**Ergebnis:** Hintergrund komplett unscharf, fokussierter Bereich sehr klein.

### Preset 2: Filmisch (wider angle)

```typescript
<DepthOfField
  focusDistance={0.4}
  focalLength={0.025}      // Moderater Gradient
  bokehScale={6}           // Subtilere Bokeh
/>
```

**Wann nutzen:**
- Szenen-Shots
- Establishing Shots
- Allgemeine Komposition

**Ergebnis:** Breiter Fokusbereich, sanfter Blur.

### Preset 3: Dramatisch (macro)

```typescript
<DepthOfField
  focusDistance={0.7}      // Sehr nah
  focalLength={0.008}      // Extrem steil
  bokehScale={12}          // Große Bokeh
/>
```

**Wann nutzen:**
- Makro-Effekte
- Dramatische Tiefe
- Kleine Objekte isolieren

**Ergebnis:** Nur winziger Bereich scharf, fast alles unscharf.

## focusDistance vs. focalLength verstehen

| Parameter | Effekt | Faustregel |
|-----------|--------|-----------|
| **focusDistance** | WO liegt der scharfe Bereich? | 0.0 = nah, 0.5 = mittig, 1.0 = weit |
| **focalLength** | WIE SCHNELL fade ich weg? | Kleiner = steil (Portrait), Größer = flach (Landschaft) |

```typescript
// ❌ Verwirrt: Wo ist der Fokus?
<DepthOfField focusDistance={0.3} focalLength={0.5} />

// ✅ Klar: Fokus mittig, steiler Übergang
<DepthOfField focusDistance={0.5} focalLength={0.015} />
```

## DoF mit Remotion kombinieren

```typescript
import { useCurrentFrame, interpolate } from 'remotion';
import { DepthOfField } from '@react-three/postprocessing';

const DynamicFocus = () => {
  const frame = useCurrentFrame();
  
  // Fokus wandert: nah → weit → nah
  const focusDistance = interpolate(
    frame,
    [0, 60, 120],           // Über 4 Sekunden
    [0.2, 0.8, 0.2]         // Fokuspunkt bewegt sich
  );
  
  // Bokeh-Größe pulsiert
  const bokehScale = interpolate(
    frame,
    [0, 30, 60],
    [4, 10, 4]
  );
  
  return (
    <DepthOfField
      focusDistance={focusDistance}
      focalLength={0.015}
      bokehScale={bokehScale}
    />
  );
};
```

## Fokus an Objekt-Position binden

Dynamischer Fokus, der einem Objekt folgt:

```typescript
import { useThree } from '@react-three/fiber';
import { DepthOfField } from '@react-three/postprocessing';

const TrackingFocus = ({ targetMesh }) => {
  const { camera } = useThree();
  const [focusDistance, setFocusDistance] = useState(0.5);
  
  // useFrame würde hier normalerweise nicht funktionieren in Remotion!
  // Lösung: Nutze Remotion's Frame + useCurrentFrame
  
  const frame = useCurrentFrame();
  
  // Berechne Fokus basierend auf Objekt-Position
  const calculatedDistance = 0.5; // Vereinfacht
  
  return (
    <DepthOfField
      focusDistance={calculatedDistance}
      focalLength={0.015}
      bokehScale={6}
    />
  );
};
```

## Performance & Bokeh-Qualität

| Einstellung | Performance | Qualität | Nutze für |
|-------------|-------------|----------|----------|
| `bokehScale={2}` | ⚡⚡⚡ | ⭐ (pixelig) | Web-Preview |
| `bokehScale={6}` | ⚡⚡ | ⭐⭐⭐ | Standard |
| `bokehScale={12}` | ⚡ | ⭐⭐⭐⭐ | Final Render |

**Tip:** Bei Renderzeit-Druck: `bokehScale={4}` statt `6`.

## Häufige Fehler

### Fehler 1: DoF ist unsichtbar

**Problem:**
```typescript
// ❌ Fokuspunkt stimmt nicht mit Szene überein
<DepthOfField
  focusDistance={0.1}  // Fokus zu nah (außerhalb 3D-Szene)
  focalLength={0.1}    // Zu flach
  bokehScale={2}       // Zu klein
/>
```

**Lösung:**
```typescript
// ✅ DoF-Parameter an 3D-Szene anpassen
<DepthOfField
  focusDistance={0.5}  // Mittig (wo die Action ist)
  focalLength={0.015}  // Steil genug um Effekt zu sehen
  bokehScale={6}       // Sichtbare Bokeh-Größe
/>
```

### Fehler 2: Fokuspunkt in falscher Position

**Problem:**
```typescript
// ❌ Fokus-Punkt ist irgendwo im Nirvana
<DepthOfField focusDistance={0.9} /> 
// Alles sieht unscharf aus, nichts ist fokussiert
```

**Lösung:**
```typescript
// ✅ Testen: Stelle focusDistance so, dass
// die wichtigsten Objekte SCHARF sind
<DepthOfField focusDistance={0.4} />
```

### Fehler 3: Blending-Artefakte

**Problem:**
```typescript
// ❌ Übergänge zwischen scharf/unscharf sind hart
<DepthOfField
  focusDistance={0.5}
  focalLength={0.1}    // Zu flach!
/>
```

**Lösung:**
```typescript
// ✅ Größerer Gradient für sanfte Übergänge
<DepthOfField
  focusDistance={0.5}
  focalLength={0.015}  // Steil genug
  bokehScale={6}       // Glatter Blur
/>
```

## DoF + Bloom kombinieren

```typescript
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';

const CinematicCombo = () => (
  <EffectComposer>
    {/* Bloom macht helle Objekte leuchten */}
    <Bloom intensity={0.8} />
    
    {/* DoF unschärft den Hintergrund */}
    <DepthOfField
      focusDistance={0.5}
      bokehScale={6}
    />
  </EffectComposer>
);
```

## Troubleshooting

| Problem | Diagnose | Lösung |
|---------|----------|--------|
| Alles unscharf | `focusDistance` zu klein/groß | Testen mit 0.3, 0.5, 0.7 |
| DoF zu subtil | `focalLength` zu groß | ↓ auf 0.01-0.015 |
| Bokeh-Artefakte | `bokehScale` zu klein | ↑ auf 8-12 |
| Rendering mega-langsam | DoF bei voller Auflösung | DoF nicht für lange Videos |
| Fokus-Übergang hart | Gradient zu steil | `focalLength` ↑ |

---

## Best Practices

1. **Testen mit Preview** – nutze `npm run serve` um Parameter zu tweaken
2. **focusDistance zuerst setzen** – wo soll der Fokus SEIN?
3. **focalLength dann einstellen** – wie abrupt soll die Unschärfe sein?
4. **bokehScale last** – wie sichtbar soll die Bokeh sein?

---

## Nächste Effekte

- **[Chromatic Aberration](./03-chromatic-aberration.md)** – Optische Regenbogen-Kanten
- **[Film Grain](./04-film-grain-und-noise.md)** – Digitale Perfektion aufbrechen

---

## Quellen

- [React-Postprocessing: Depth of Field](https://react-postprocessing.docs.pmnd.rs/effects/depth-of-field)
- [drei: DepthOfFieldEffect](https://github.com/pmndrs/postprocessing/blob/main/src/effects/DepthOfFieldEffect.js)
- [High-End Visuelle Effekte für Remotion (PDF)](file:56) – Kap. 5.2: DoF & Bokeh
