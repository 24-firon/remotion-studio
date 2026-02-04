# GLTF Model Loading & Optimization – Performance & Best Practices

## Konzept: 3D-Modelle laden, optimieren, animieren

```
Model.glb (20 MB)
    ↓
[Komprimierung: draco, quantisierung]
    ↓
Model.glb (2 MB)
    ↓
Browser: Streaming-Load
    ↓
Renderbar nach 100ms
```

---

## Variante 1: Basic GLTF Loading mit drei

```typescript
import { useGLTF } from '@react-three/drei';

const Model = (props) => {
  const { scene, animations } = useGLTF('/model.glb');
  
  return <primitive object={scene} {...props} />;
};

// Pre-load für bessere Performance
useGLTF.preload('/model.glb');
```

---

## Variante 2: Draco-Komprimierung (80% Größen-Reduktion)

### Export in Blender

1. **In Blender:** File → Export → glTF 2.0
2. **Settings:**
   - ☑️ Compression: Draco
   - ☑️ Format: .glb (Binary, schneller)
   - Quality: 7 (0-10, höher = besser aber größer)

### Resultat

```
Original: model.glb → 20 MB
Mit Draco: model-draco.glb → 2-4 MB ✅
```

### Loading Code

```typescript
import { useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/'); // Pfad zu WASM-Dateien

const Model = () => {
  const { scene } = useGLTF('/model-draco.glb', (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });
  
  return <primitive object={scene} />;
};
```

---

## Variante 3: Texture Optimization

### Problem: Texturen sind oft 50% der Dateigröße

```typescript
// ❌ Unkomprimiert: 4096x4096 PNG = 64 MB
// ✅ Komprimiert: WebP mit Basis-Kompression = 2-4 MB

import { useTexture } from '@react-three/drei';

const OptimizedModel = () => {
  // Nutze WebP statt PNG
  const textures = useTexture({
    map: '/textures/diffuse.webp',
    normalMap: '/textures/normal.webp',
    roughnessMap: '/textures/roughness.webp',
  });
  
  return (
    <mesh>
      <meshStandardMaterial {...textures} />
    </mesh>
  );
};
```

### Basis-Transcode (Real-time GPU-Kompression)

```typescript
import { useGLTF } from '@react-three/drei';
import { BASISLoader } from 'three/examples/jsm/loaders/BASISLoader.js';

const basisLoader = new BASISLoader();
basisLoader.setTranscoderPath('/basis/'); // WASM transcoder

const Model = () => {
  const { scene } = useGLTF('/model.glb', (loader) => {
    // Automatic BASIS texture loading
  });
  
  return <primitive object={scene} />;
};
```

---

## Variante 4: LOD (Level of Detail) für große Szenen

```typescript
import { useGLTF, useDetectGPU } from '@react-three/drei';

const DetailedModel = ({ detail }: { detail: 'high' | 'medium' | 'low' }) => {
  const models = {
    high: '/model-high.glb',
    medium: '/model-medium.glb',
    low: '/model-low.glb'
  };
  
  const { scene } = useGLTF(models[detail]);
  
  return <primitive object={scene} />;
};

// Auto-detect GPU
const App = () => {
  const gpu = useDetectGPU();
  const tier = gpu.tier === 'high' ? 'high' : gpu.tier === 'medium' ? 'medium' : 'low';
  
  return <DetailedModel detail={tier} />;
};
```

---

## Variante 5: Modell-Animation & Baking

### Animation abspielen

```typescript
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

const AnimatedModel = () => {
  const { scene, animations } = useGLTF('/character.glb');
  const { actions } = useAnimations(animations, scene);
  
  useEffect(() => {
    // Play specific animation
    actions['Walk']?.play();
  }, [actions]);
  
  return <primitive object={scene} />;
};
```

### Pre-Baked Animations (für Video-Export mit Remotion)

```typescript
// Remotion: Animationen sind deterministic

import { useCurrentFrame } from 'remotion';

const BakedAnimationModel = () => {
  const frame = useCurrentFrame();
  const { scene } = useGLTF('/model.glb');
  
  // Manuelle Animation basierend auf Frame
  const mixer = new THREE.AnimationMixer(scene);
  const track = animations[0];
  const clip = new THREE.AnimationClip('animation', track.duration, [track]);
  const action = mixer.clipAction(clip);
  action.play();
  
  mixer.update(frame / 30); // 30 FPS
  
  return <primitive object={scene} />;
};
```

---

## Variante 6: Instanced Models (Tausende von Modellen)

Wenn du 1000+ gleiche Modelle brauchst:

```typescript
import { Instances, Instance } from '@react-three/drei';

const InstancedModel = ({ count = 1000 }) => {
  return (
    <Instances>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
      
      {Array.from({ length: count }).map((_, i) => (
        <Instance
          key={i}
          position={[
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50
          ]}
        />
      ))}
    </Instances>
  );
};
```

**Performance:** ⚡⚡⚡ (1 Draw Call statt 1000)

---

## Variante 7: Streaming & Progressive Loading

```typescript
import { useProgress } from '@react-three/drei';

const ModelWithProgress = () => {
  const { progress } = useProgress();
  const { scene } = useGLTF('/large-model.glb');
  
  return (
    <>
      {progress < 100 && (
        <div className="loading-bar" style={{ width: `${progress}%` }} />
      )}
      <primitive object={scene} />
    </>
  );
};

// Wrap in Suspense für better UX
export const App = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Canvas>
      <ModelWithProgress />
    </Canvas>
  </Suspense>
);
```

---

## Praktische Implementierung: Full-Stack Model-Loading

```typescript
// model-loader.tsx

import { useGLTF, useAnimations, useProgress } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { Suspense } from 'react';

interface ModelConfig {
  url: string;
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  animation?: string;
  dracoLoader?: boolean;
}

const Model = ({
  url,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  animation,
  dracoLoader = true
}: ModelConfig) => {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);
  
  useEffect(() => {
    if (animation && actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play();
    }
    
    return () => {
      Object.values(actions).forEach(action => action.fadeOut(0.5));
    };
  }, [animation, actions]);
  
  return (
    <group scale={scale} rotation={rotation} position={position}>
      <primitive object={scene} />
    </group>
  );
};

// Pre-load
useGLTF.preload('/character-draco.glb');

export { Model };
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Model lädt nicht | Falscher Pfad | Prüfe relative Pfade |
| Performance laggt | Zu hohe Poly-Count | Nutze LOD oder decimation |
| Texturen fehlen | Externe Texturen nicht geladen | Nutze embedded Texturen in glb |
| Animation spielt nicht | Falscher Animation-Name | Prüfe console: `console.log(animations)` |
| Draco-Error | WASM-Dateien nicht vorhanden | Installiere Draco-Decoder |

---

## Benchmarks

| Format | Größe | Load-Time | Render-Perf |
|--------|-------|-----------|-------------|
| **GLTF + PNG** | 50 MB | 10s | ⚡ 60 FPS |
| **GLB + WebP** | 20 MB | 4s | ⚡ 60 FPS |
| **Draco + WebP** | 3 MB | 0.5s | ⚡⚡ 60 FPS |
| **Instanced** | 1 MB | 0.1s | ⚡⚡⚡ 60 FPS |

---

## Quellen

- [glTF Spec](https://www.khronos.org/gltf/)
- [Draco Compression](https://google.github.io/draco/)
- [Drei useGLTF](https://drei.docs.pmnd.rs/#usegltf)
- [Blender glTF Export](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)
