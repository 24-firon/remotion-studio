# Quick-Start Komplettbeispiel – Full Cinematic Stack

## Vollständiges, produktionsreifes Beispiel

Kopiere diesen Code direkt in dein Remotion-Projekt:

```typescript
// MyComposition.tsx
import { Composition, useCurrentFrame, interpolate } from 'remotion';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, FilmGrain } from '@react-three/postprocessing';
import { useState } from 'react';

// Komponenten-Definition
const CinematicScene = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  
  // Animation über 5 Sekunden (150 Frames)
  const rotation = interpolate(
    frame,
    [0, 150],
    [0, Math.PI * 2],
    { extrapolateRight: 'clamp' }
  );
  
  const scale = interpolate(
    frame,
    [0, 75, 150],
    [0.5, 1.5, 1],
    { easing: require('remotion').Easing.bezier(0.25, 0.1, 0.25, 1) }
  );
  
  const cameraZ = interpolate(
    frame,
    [0, 150],
    [3, 2],
    { extrapolateRight: 'clamp' }
  );
  
  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov: 50 }}
      gl={{ antialias: true }}
    >
      {/* Beleuchtung */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, 10, 5]} intensity={1} />
      
      {/* Zentrales animiertes Objekt */}
      <mesh rotation={[rotation, rotation * 0.5, rotation]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Umgebungs-Objekte */}
      <mesh position={[2, 0, -2]} scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[-2, 0, -2]} scale={0.5}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ff0088"
          emissive="#ff0088"
          emissiveIntensity={1.5}
          roughness={0.2}
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
          kernelSize={15}
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

// Komposition exportieren
export const MyComposition = () => (
  <Composition
    id="CinematicScene"
    component={CinematicScene}
    durationInFrames={150}
    fps={30}
    width={1920}
    height={1080}
  />
);
```

## Setup-Befehle

```bash
# 1. Neues Remotion-Projekt erstellen
npx create-remotion-app@latest my-project

# 2. In Projekt wechseln
cd my-project

# 3. Dependencies installieren
npm install @react-three/fiber @react-three/postprocessing postprocessing three

# 4. In Dev-Server starten
npm run dev

# 5. Zu voller Qualität exportieren (ca. 3-5 min für 5 Sekunden Video)
npm run build
```

## Parameter zum Experimentieren

```typescript
// Bloom-Intensität ändern
<Bloom intensity={0.5} />        // Subtil
<Bloom intensity={1.2} />        // Intensiv

// DoF-Fokus verschieben
<DepthOfField focusDistance={0.3} /> // Nah
<DepthOfField focusDistance={0.7} /> // Weit

// Film Grain stärker/schwächer
<FilmGrain grain={0.08} />      // Subtil
<FilmGrain grain={0.25} />      // Körnig

// Animation-Easing ändern
Easing.bezier(0.25, 0.1, 0.25, 1) // Smooth
Easing.bezier(0.34, 1.56, 0.64, 1) // Overshoot
```

## Performance Checkliste

Bevor du renderst:

- [ ] **Test bei 30 FPS:** `npm run dev` startet Preview
- [ ] **Frame-Rendering:** Sollte < 100ms sein bei voller 1920×1080
- [ ] **Post-Processing aktiv?** Addiere ~0.5-1.0s/Frame hinzu
- [ ] **Downsample gesetzt?** `downsampling={2}` für Bloom
- [ ] **Dauer geplant?** 1 min Video = ~5-10 min Renderzeit

## Häufige Fehler Quick-Fix

| Fehler | Symptom | Lösung |
|--------|---------|--------|
| Bloom unsichtbar | Weiße Box ohne Glow | ↑ `emissiveIntensity={2}` |
| Alles zu unscharf | DoF übertrieben | `focalLength={0.025}` (größer) |
| Rendering ewig | Zu viele Effects | `downsampling={2}` aktivieren |
| Keine Animation | Frame ändert sich nicht | Check `useCurrentFrame()` nutzen? |
| Komisches Flackern | Frame-zu-Frame Jitter | `extrapolateRight: 'clamp'` nutzen |

---

## Nächste Schritte

1. **Exportieren:** `npm run build` für MP4-Output
2. **Audio hinzufügen:** Siehe Remotion Audio-Docs
3. **Komplexere Geometrien:** GLTF-Models laden mit drei
4. **Custom Shaders:** GLSL-Code für spezialisierte Effekte

---

**Pro Tip:** Speichere diese Datei als Template für zukünftige Projekte!
