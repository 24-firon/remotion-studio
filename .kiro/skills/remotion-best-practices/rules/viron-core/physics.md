# 2. 3D-FOUNDATION: Three.js & React Three Fiber für Video-Production

**Dokumentversion:** 1.0 | Januar 2026

## Warum Three.js für Video-Produktion?

Three.js ist die Standard-3D-Bibliothek für Web-basierte Videoproduktion, weil:

1. **Determinismus:** GPU-Rendering ist reproducible bei identischen Settings
2. **Headless Support:** Chrome Headless kann WebGL rendern (kein Display nötig)
3. **Material System:** PBR (Physically Based Rendering) für realistische Oberflächen
4. **Performance:** Optimiert für Echtzeit & Batch-Rendering
5. **Ecosystem:** React Three Fiber bietet React-Integration nahtlos

## React Three Fiber (R3F): Die React-Schicht

R3F ist eine **Renderer** für Three.js, die React-Komponenten in 3D-Szenen verwandelt:

```typescript
// Traditional Three.js
const scene = new THREE.Scene();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// React Three Fiber
<Canvas>
  <mesh geometry={geometry} material={material} />
</Canvas>
```

### Kernkonzepte

| Konzept | Erklärung | Use Case |
|---------|-----------|----------|
| **Canvas** | Root-Element für 3D-Rendering | Muss vorhanden sein |
| **mesh** | 3D-Objekt (Geometry + Material) | Sichtbare Objekte |
| **camera** | Viewpoint in die Szene | Perspektive steuern |
| **light** | Beleuchtung (Ambient, Directional, Spot) | Realistisches Shading |
| **useThree()** | Hook für Scene, Camera, Renderer Access | Imperative Kontrolle |
| **useFrame()** | Per-Frame-Callback (Animation) | Echtzeitanimationen |

## Basis-Szenen-Setup in R3F

```typescript
// src/scenes/BasicScene.tsx
import React, { useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const BasicScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Szenario 1: Klassische Echtzeit-Animation (NICHT für Video)
      // meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, pixelRatio: 2 }}
    >
      {/* Beleuchtung */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* 3D-Objekt */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ff0000"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
    </Canvas>
  );
};
```

**WICHTIG für Video:** Nutze `useFrame()` NICHT für Animationen! Statt dessen:

```typescript
// ✓ RICHTIG für Remotion
import { useCurrentFrame, interpolate } from 'remotion';

export const AnimatedScene = () => {
  const frame = useCurrentFrame();

  // Berechne Rotation basierend auf Frame (determinstisch)
  const rotationX = interpolate(frame, [0, 300], [0, Math.PI * 2]);
  const rotationY = interpolate(frame, [0, 300], [0, Math.PI * 4]);

  return (
    <mesh rotation={[rotationX, rotationY, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  );
};
```

## Geometrien (Built-in & Custom)

### Standard-Geometrien

```typescript
// BoxGeometry (Würfel)
<boxGeometry args={[width, height, depth, widthSegments, heightSegments, depthSegments]} />

// SphereGeometry (Kugel)
<sphereGeometry args={[radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength]} />

// PlaneGeometry (Ebene - für UI-Texturen)
<planeGeometry args={[width, height, widthSegments, heightSegments]} />

// CylinderGeometry
<cylinderGeometry args={[radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded]} />

// ConeGeometry
<coneGeometry args={[radius, height, radialSegments, heightSegments, openEnded]} />

// TorusGeometry (Donut)
<torusGeometry args={[radius, tube, radialSegments, tubularSegments, arc]} />
```

### Custom Geometrien (für Device-Mockups)

```typescript
// src/components/3D/DeviceGeometry.ts
import * as THREE from 'three';

export const createMacBookGeometry = (screenRatio = 16 / 10) => {
  const group = new THREE.Group();

  // Bezel (schwarzer Rahmen)
  const bezelGeometry = new THREE.BoxGeometry(1, screenRatio, 0.05);
  const bezel = new THREE.Mesh(bezelGeometry, new THREE.MeshStandardMaterial({ color: '#000' }));
  group.add(bezel);

  // Screen (wo Website gerendert wird)
  const screenGeometry = new THREE.PlaneGeometry(0.95, screenRatio * 0.95);
  const screenMaterial = new THREE.MeshStandardMaterial({
    map: undefined, // Wird später mit Texture gefüllt
    emissive: '#ffffff',
    emissiveIntensity: 0.1,
    roughness: 0.1,
    metalness: 0,
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.z = 0.03;
  group.add(screen);

  // Keyboard (vereinfacht)
  const keyboardGeometry = new THREE.BoxGeometry(1, screenRatio * 0.6, 0.02);
  const keyboard = new THREE.Mesh(keyboardGeometry, new THREE.MeshStandardMaterial({ color: '#555' }));
  keyboard.position.y = -screenRatio * 0.6;
  keyboard.position.z = -0.05;
  group.add(keyboard);

  return group;
};
```

## Materialien in Three.js

### Material-Typen

| Typ | Einsatz | Eigenschaften |
|-----|---------|--------------|
| **MeshBasicMaterial** | UI-Elemente, kein Shading | Keine Beleuchtung |
| **MeshStandardMaterial** | Realistische Oberflächen (PBR) | Metalness, Roughness |
| **MeshPhysicalMaterial** | Hochglanz, Glas, Diamanten | Clearcoat, Transmission |
| **MeshToonMaterial** | Cartoon-Stil | Vereinfachtes Shading |

### PBR Material Setup (Physically Based Rendering)

```typescript
// Zink-Metallic (für dein Theme)
const metallicMaterial = new THREE.MeshStandardMaterial({
  color: '#afb4be',           // Mid-tone aus Theme
  metalness: 0.9,             // 1 = vollständig metallisch
  roughness: 0.2,             // 0 = spiegelnd, 1 = matt
  normalMap: normalTexture,   // Optional: Detail-Struktur
  envMap: cubeTexture,        // Optional: Umgebungs-Reflektionen
});

// Glass (Displayglas)
const glassMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1,            // 1 = transparent, 0 = opak
  opacity: 0.95,              // Minimaler Porzellan-Effekt
  roughness: 0.1,
  ior: 1.5,                   // Index of Refraction (Brechungsindex)
});

// Emissives Material (Leuchtet von selbst)
const screenMaterial = new THREE.MeshStandardMaterial({
  emissive: '#00d4ff',
  emissiveIntensity: 0.5,     // 0-1
  color: '#000',
});
```

### Material-Animation in Remotion

```typescript
import { useCurrentFrame, interpolate } from 'remotion';

export const AnimatedMaterial = () => {
  const frame = useCurrentFrame();
  const meshRef = useRef<THREE.Mesh>(null);

  // Frame-based Animation
  const metalness = interpolate(frame, [0, 300], [0.5, 1]);
  const roughness = interpolate(frame, [0, 300], [0.5, 0.1]);

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial
        metalness={metalness}
        roughness={roughness}
        color="#afb4be"
      />
    </mesh>
  );
};
```

## Texturen und Maps

### Texture Loading (in Remotion)

```typescript
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const TexturedMesh = () => {
  // Texture wird einmalig geladen
  const colorTexture = useLoader(TextureLoader, '/textures/metal-color.jpg');
  const normalTexture = useLoader(TextureLoader, '/textures/metal-normal.jpg');
  const roughnessTexture = useLoader(TextureLoader, '/textures/metal-roughness.jpg');

  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial
        map={colorTexture}
        normalMap={normalTexture}
        roughnessMap={roughnessTexture}
      />
    </mesh>
  );
};
```

### Website als Textur (Kritisch für Website-Mockups)

```typescript
import { useVideoTexture } from '@react-three/drei';
import { useCurrentFrame } from 'remotion';

export const WebsiteTexture = ({ url }: { url: string }) => {
  const frame = useCurrentFrame();
  
  // Remotion Video wird als Textur verwendet
  const texture = useVideoTexture('/rendered-website.mp4');

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[1.6, 0.9]} /> {/* 16:9 Ratio */}
      <meshStandardMaterial map={texture} emissiveIntensity={0.1} />
    </mesh>
  );
};
```

## Szenen-Hierarchie & Groups

```typescript
// Organisiere 3D-Objekte hierarchisch
export const DeviceMockupScene = () => {
  return (
    <group>
      {/* MacBook Group */}
      <group position={[0, 0, 0]}>
        <mesh name="bezel">
          <boxGeometry args={[1, 0.625, 0.05]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh name="screen" position={[0, 0, 0.03]}>
          <planeGeometry args={[0.95, 0.595]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      </group>

      {/* iPhone Group */}
      <group position={[2, 0, 0]}>
        <mesh name="phone-body">
          <boxGeometry args={[0.4, 0.8, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </group>
  );
};
```

## Performance-Optimierung für Video-Rendering

### 1. LOD (Level of Detail)

```typescript
import { Merged } from '@react-three/fiber';

export const OptimizedScene = () => {
  return (
    <>
      {/* High-Detail Meshes nur bei Nahaufnahmen */}
      <LOD distances={[0, 100, 500]}>
        <HighDetailMesh />
        <MediumDetailMesh />
        <SimplifiedMesh />
      </LOD>
    </>
  );
};
```

### 2. Instancing (viele identische Objekte)

```typescript
import { Instances, Instance } from '@react-three/drei';

export const ParticleField = ({ count = 1000 }) => {
  return (
    <Instances limit={count}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial />
      {Array.from({ length: count }).map((_, i) => (
        <Instance
          key={i}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
          ]}
        />
      ))}
    </Instances>
  );
};
```

### 3. Render-Target-Skalierung

```typescript
<Canvas
  gl={{
    antialias: true,
    pixelRatio: 1, // Nicht 2 bei High-Res Rendering
  }}
/>
```

## Debugging 3D-Szenen

```typescript
// Showroom-Modus für Entwicklung
export const DebugScene = () => {
  return (
    <Canvas>
      {/* Achsen-Helper (X=rot, Y=grün, Z=blau) */}
      <axesHelper args={[5]} />

      {/* Grid-Helper für Perspektive */}
      <gridHelper args={[10, 10]} />

      {/* Kamera-Helper anzeigen */}
      <cameraHelper args={[camera]} />

      {/* Bounding Box visualisieren */}
      <BoundingBox>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </BoundingBox>
    </Canvas>
  );
};
```

## Best Practices für Video-Production

1. **Frame-Driven, nicht Time-Driven**
   - Verwende immer `useCurrentFrame()` von Remotion
   - NICHT `Date.now()` oder `useEffect` mit Delays

2. **Statische Positionen**
   - Objekt-Positionen sollten von `frame` abgeleitet sein
   - Keine `useFrame()` für Animationen

3. **Material Preloading**
   - Alle Texturen/Models VOR Rendering laden
   - Keine Async-Ops während Video-Rendering

4. **Determinismus**
   - Keine `Math.random()` in Szenen
   - Alle Transforms müssen reproducible sein

5. **Memory-Management**
   - Dispose Texturen nach Verwendung
   - Verwende Object Pooling für viele Instanzen
