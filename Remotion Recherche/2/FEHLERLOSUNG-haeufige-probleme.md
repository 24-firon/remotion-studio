# Häufige Fehler & Lösungen

## Top 10 Anfängerfehler in Remotion + Post-Processing

---

## Fehler 1: Post-Processing wirkt nicht

### Problem
```typescript
// ❌ FALSCH
return (
  <div>
    <Canvas>{/* 3D Szene */}</Canvas>
    <EffectComposer>
      <Bloom intensity={1.0} />
    </EffectComposer>
  </div>
);
```

**Symptom:** Bloom, DoF, etc. werden ignoriert – Video sieht unverarbeitet aus.

### Ursache
Post-Processing muss **INNERHALB** des Canvas sein, nicht außerhalb.

### Lösung
```typescript
// ✅ RICHTIG
return (
  <Canvas>
    {/* 3D Szene */}
    <mesh>...</mesh>
    
    {/* Post-Processing INNERHALB Canvas */}
    <EffectComposer>
      <Bloom intensity={1.0} />
    </EffectComposer>
  </Canvas>
);
```

---

## Fehler 2: Bloom ist vollständig unsichtbar

### Problem
```typescript
<mesh>
  <boxGeometry />
  <meshStandardMaterial color="white" /> {/* ❌ Kein Glow! */}
</mesh>

<Bloom intensity={5.0} /> {/* Warum funktioniert das nicht? */}
```

**Symptom:** Egal wie hoch `intensity` – kein Bloom.

### Ursache
Material hat keine `emissive`-Eigenschaft. Bloom braucht **Licht-ausstrahlende Materialien**.

### Lösung
```typescript
// ✅ RICHTIG
<meshStandardMaterial
  color="white"
  emissive="white"           // 🔑 MUSS vorhanden sein
  emissiveIntensity={2}      // 🔑 MUSS > 1 sein
  roughness={0.5}
  metalness={0}
/>

// PLUS: Bloom-Threshold richtig setzen
<Bloom
  intensity={0.8}
  luminanceThreshold={1.0}   // Standard-Wert
/>
```

---

## Fehler 3: Animationen flackern/jittern

### Problem
```typescript
const frame = useCurrentFrame();

// ❌ Winzige, nicht-deterministische Werte
const position = Math.sin(frame * 0.1) * 10;
```

**Symptom:** Animation flackert, sieht glitchy aus.

### Ursache
Math-Funktionen können zu drastischen Sprüngen führen.

### Lösung
```typescript
// ✅ RICHTIG: Nutze interpolate() mit Easing
import { interpolate, Easing } from 'remotion';

const position = interpolate(
  frame,
  [0, 150],
  [-5, 5],  // Von -5 zu +5
  {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateRight: 'clamp'
  }
);
```

---

## Fehler 4: `useFrame` von React-Three-Fiber nutzen

### Problem
```typescript
import { useFrame } from '@react-three/fiber';

const MyComponent = () => {
  useFrame(({ clock }) => {
    // ❌ FALSCH – läuft außerhalb von Remotion's Frame-Scheduler!
    meshRef.current.rotation.x += 0.01;
  });
};
```

**Symptom:** Animation ist zeitlich unkonsistent, Rendering bricht ab.

### Ursache
`useFrame` ist für Echtzeit-Rendering. Remotion braucht deterministische Frames!

### Lösung
```typescript
// ✅ RICHTIG: Nutze useCurrentFrame
import { useCurrentFrame } from 'remotion';

const MyComponent = () => {
  const frame = useCurrentFrame();
  
  return (
    <mesh
      rotation={[
        (frame / 100) * Math.PI * 2,
        0,
        0
      ]}
    >
      {/* ... */}
    </mesh>
  );
};
```

---

## Fehler 5: Depth of Field Fokuspunkt stimmt nicht

### Problem
```typescript
<DepthOfField
  focusDistance={0.1}  // ❌ Fokus in Luft
  focalLength={0.1}    // ❌ Zu flach
  bokehScale={2}       // ❌ Zu klein
/>
// Ergebnis: Alles sieht glatt aus, keine DoF-Effekt
```

**Symptom:** DoF hat keine sichtbaren Auswirkungen.

### Ursache
Parameter sind nicht an 3D-Szene ausgerichtet.

### Lösung
```typescript
// ✅ RICHTIG: Werte experimentell an Szene anpassen
<DepthOfField
  focusDistance={0.5}  // Mittige Tiefe (wo wichtige Objekte sind)
  focalLength={0.015}  // Steil genug um Effekt zu sehen
  bokehScale={6}       // Sichtbare Bokeh-Größe
/>

// TIP: Langsam testen: 0.2, 0.4, 0.6, 0.8 durchprobieren
```

---

## Fehler 6: FPS-abhängige Berechnungen (nicht-portabel)

### Problem
```typescript
const seconds = frame / 30;  // ❌ Hardcoded auf 30 FPS!

// Funktioniert nur bei 30 FPS, bricht bei 24 oder 60 FPS ab
```

**Symptom:** Video läuft bei unterschiedlichen FPS-Einstellungen unterschiedlich schnell.

### Lösung
```typescript
// ✅ RICHTIG: Nutze useVideoConfig
import { useVideoConfig } from 'remotion';

const MyComponent = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  
  const seconds = frame / fps;  // Funktioniert bei beliebigem FPS
  
  return <div>{seconds.toFixed(2)}s</div>;
};
```

---

## Fehler 7: Rendering dauert ewig

### Problem
```typescript
<EffectComposer>
  <Bloom
    intensity={2.0}
    downsampling={1}      // ❌ FULL RESOLUTION!
    kernelSize={32}       // ❌ MAX BLUR!
  />
  <DepthOfField
    bokehScale={20}       // ❌ Zu groß
  />
</EffectComposer>
// Ergebnis: 3+ Sekunden per Frame!
```

**Symptom:** Rendering dauert 10+ Stunden für 1 Minute Video.

### Lösung
```typescript
// ✅ RICHTIG: Optimieren
<EffectComposer>
  <Bloom
    intensity={0.8}
    downsampling={2}      // Halb-Auflösung = 4x schneller
    kernelSize={15}       // Standard
  />
  <DepthOfField
    bokehScale={6}        // Moderat
  />
  {/* FilmGrain kostet fast nichts */}
  <FilmGrain grain={0.15} animate={true} />
</EffectComposer>

// Performance-Checkliste:
// ✅ downsampling={2} für Bloom
// ✅ kernelSize={15} statt 32
// ✅ bokehScale={6} statt 12+
// ✅ Test: npm run dev (sollte < 100ms/Frame sein)
```

---

## Fehler 8: Sequence-Timing ist off

### Problem
```typescript
import { Sequence } from 'remotion';

<Sequence from={0} durationInFrames={100}>
  <ComponentA />
</Sequence>

<Sequence from={100} durationInFrames={100}>
  <ComponentB />
</Sequence>

// ❌ Komponenten rendern gleichzeitig, nicht nacheinander!
```

**Symptom:** Beide Komponenten sichtbar zur gleichen Zeit.

### Ursache
`durationInFrames` limitiert die SICHTBARKEIT, nicht die Rendering-Dauer.

### Lösung
```typescript
// ✅ RICHTIG: Sequenzen zeitlich trennen
<Sequence from={0} durationInFrames={100}>
  {/* Frames 0-99: ComponentA sichtbar */}
  <ComponentA />
</Sequence>

<Sequence from={100} durationInFrames={100}>
  {/* Frames 100-199: ComponentB sichtbar */}
  <ComponentB />
</Sequence>

// Result: ComponentA → dann ComponentB (nicht parallel)
```

---

## Fehler 9: Chromatic Aberration-Werte viel zu groß

### Problem
```typescript
<ChromaticAberration
  offset={[0.1, 0.05]}  // ❌ VIEL zu groß!
/>
// Ergebnis: Regenbogen-Monster statt subtiler Effekt
```

**Symptom:** Extreme Regenbogenkanten, sieht aus wie Fehler.

### Lösung
```typescript
// ✅ RICHTIG: Subtile Werte
<ChromaticAberration
  offset={[0.001, 0.0005]}  // Standard
/>

// Wert-Leitfaden:
// [0.0001, 0.00005]  = Unsichtbar
// [0.0005, 0.0003]   = Subtil
// [0.001, 0.0005]    = Standard ✅
// [0.005, 0.003]     = Dramatisch
// [0.01, 0.005]      = Kunsteffekt
```

---

## Fehler 10: Film Grain spielt nicht (animate={false})

### Problem
```typescript
<FilmGrain
  grain={0.2}
  animate={false}       // ❌ Statisches Muster sieht falsch aus
/>
// Ergebnis: Gleiches Rausch-Muster wiederholt sich – sieht unnatürlich aus
```

**Symptom:** Film Grain flackert oder wirkt nicht animiert.

### Lösung
```typescript
// ✅ RICHTIG: animate={true} für Videos
<FilmGrain
  grain={0.15}
  animate={true}        // Neues Rauschen bei jedem Frame
/>

// animate={false} nur für Standbilder/Pausen
```

---

## Bonus: Performance Profiling Anleitung

```bash
# 1. Dev-Server mit Profiling starten
npm run dev

# 2. Chrome DevTools öffnen (F12)

# 3. Performance Tab → Recording starten

# 4. Ein Frame rendern lassen

# 5. Recording stoppen

# Zielwerte:
# ✅ < 100ms Rendering = OK für Echtzeit-Preview
# ✅ < 1s pro Frame = OK für Cloud-Rendering
# ❌ > 3s pro Frame = Zu langsam
```

---

## Schnell-Checkliste vor dem Export

- [ ] **Bloom aktiviert?** `intensity > 0`
- [ ] **emissiveIntensity > 1?** (sonst kein Bloom)
- [ ] **useCurrentFrame() statt useFrame()?**
- [ ] **useVideoConfig() für FPS?**
- [ ] **downsampling={2} für Bloom?**
- [ ] **animate={true} für FilmGrain?**
- [ ] **focusDistance an 3D-Szene angepasst?**
- [ ] **Renderzeit getestet?** (< 1s/Frame gut)
- [ ] **Audio/Musik geplant?**

---

## Hilfreiche Links zum Debuggen

- **Remotion Debugging:** https://www.remotion.dev/docs/troubleshooting
- **React-Three-Fiber Issues:** https://github.com/pmndrs/react-three-fiber/issues
- **Postprocessing Issues:** https://github.com/pmndrs/postprocessing/issues
- **Discord Help:** https://discord.gg/poimandres

---

**Wenn nichts hilft:** Kopiere dein Code-Snippet ins Discord-Channel #remotion → Community antwortet innerhalb von Stunden! 🚀
