# 3. KAMERA-SYSTEME: Virtuelle Kameraführung & Cinematography

**Dokumentversion:** 1.0 | Januar 2026

## Die Rolle der Kamera in Virtual Production

Die Kamera ist nicht einfach eine "View-Matrix", sondern:

1. **Der Erzähler:** Sie lenkt Aufmerksamkeit auf UI-Details
2. **Der Regisseur:** Sie orchestriert die Szenenkomposition
3. **Der Cinematographer:** Sie erzeugt emotionale Tiefe durch Bewegung
4. **Der Editor:** Sie "schneidet" zwischen Szenen durch Übergänge

## Kamera-Typen in Three.js

### 1. PerspectiveCamera (Standard)

```typescript
// Standard für alle realistischen Szenen
<PerspectiveCamera
  position={[0, 0, 5]}
  fov={75}                    // Field of View (Grad)
  aspect={1920 / 1080}        // Bildseitenverhältnis
  near={0.1}                  // Near clipping plane
  far={1000}                  // Far clipping plane
/>
```

**Parameter:**
- **fov (35-120):** Kleinere Werte = Telephoto (gezoomt), große = Wide-Angle
- **near (0.01-1):** Objekte näher als `near` werden nicht gerendert
- **far (100-10000):** Objekte weiter als `far` werden nicht gerendert

### 2. OrthographicCamera (Für UI & 2D-Elemente)

```typescript
// Keine Perspektive-Verzerrung (parallele Projektion)
<OrthographicCamera
  position={[0, 0, 5]}
  left={-1}
  right={1}
  top={1}
  bottom={-1}
  near={0.1}
  far={1000}
/>
```

**Use Cases:**
- Website-Mockups (kein Verzerrungs-Effekt)
- Industrielle Diagramme
- Top-Down Perspektiven

## Kamera-Bewegung & Animation

### Grundkonzept: Frame-basierte Kamera-Position

```typescript
import { useCurrentFrame, interpolate } from 'remotion';

export const CinematicCamera = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  const durationFrames = 300;

  // Phase 1: Orbit um Objekt (Frame 0-100)
  const orbitT = interpolate(frame, [0, 100], [0, 1], { extrapolateRight: 'clamp' });
  const orbitAngle = orbitT * Math.PI * 2; // Volle Rotation
  const orbitRadius = 5;

  // Phase 2: Zoom in (Frame 100-200)
  const zoomT = interpolate(frame, [100, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zoomDistance = 5 - zoomT * 3; // Von 5 bis 2

  // Phase 3: Hold (Frame 200-300)
  const finalT = interpolate(frame, [200, 300], [0, 1], {
    extrapolateLeft: 'clamp',
  });

  const cameraX = Math.cos(orbitAngle) * orbitRadius * (1 - zoomT);
  const cameraY = 2 + zoomT * 2;
  const cameraZ = Math.sin(orbitAngle) * orbitRadius * (1 - zoomT);

  return (
    <PerspectiveCamera
      position={[cameraX, cameraY, cameraZ]}
      fov={50 + zoomT * 30} // FOV ändert sich mit Zoom
      lookAt={[0, 0, 0]} // Ziel: Center der Szene
    />
  );
};
```

## Spline-Interpolation für flüssige Kamera-Pfade

### Problem: Lineare Interpolation ist mechanisch

```typescript
// ❌ FALSCH: Lineare Interpolation springt zwischen Keyframes
const x = interpolate(frame, [0, 100], [0, 10]);
```

### Lösung: Catmull-Rom Spline

```typescript
import * as THREE from 'three';
import { interpolate } from 'remotion';

export const SplineCamera = () => {
  const frame = useCurrentFrame();

  // Definiere 4 Kontrollpunkte für Spline
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 10),      // Start
    new THREE.Vector3(5, 2, 5),       // Waypoint 1
    new THREE.Vector3(-5, 4, -5),     // Waypoint 2
    new THREE.Vector3(0, 0, 0),       // End
  ]);

  // Normalisierte Position auf Kurve (0-1)
  const t = frame / 300;

  // Berechne Position auf Spline
  const point = curve.getPoint(t);
  const tangent = curve.getTangent(t).normalize();
  const up = new THREE.Vector3(0, 1, 0);

  return (
    <PerspectiveCamera
      position={[point.x, point.y, point.z]}
      quaternion={new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.atan2(tangent.x, tangent.z)
      )}
    />
  );
};
```

## Focus-Tracking (Kamera folgt UI-Element)

```typescript
import { useCurrentFrame, interpolate } from 'remotion';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface FocusTarget {
  position: THREE.Vector3;
  importance: number; // 0-1
}

export const FocusTrackingCamera = ({ targets }: { targets: FocusTarget[] }) => {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  // Berechne Focus-Punkt basierend auf Targets
  const focusPoint = new THREE.Vector3();
  let totalWeight = 0;

  targets.forEach((target) => {
    const weight = target.importance;
    focusPoint.addScaledVector(target.position, weight);
    totalWeight += weight;
  });

  if (totalWeight > 0) {
    focusPoint.divideScalar(totalWeight);
  }

  // Sanfte Kamera-Anpassung (LERP)
  const lerpFactor = 0.05; // Smoothing-Faktor
  camera.position.lerp(focusPoint.clone().multiplyScalar(2), lerpFactor);
  camera.lookAt(focusPoint);

  return null; // Nur State-Update, kein visueller Output
};
```

## Drei - Camera Controls (Erweiterte Kontrolle)

Drei bietet vorgefertigte Camera-Control-Komponenten, die perfekt für Video-Production sind:

### OrbitControls (Kamera kreist um Punkt)

```typescript
import { OrbitControls } from '@react-three/drei';
import { useCurrentFrame, interpolate } from 'remotion';

export const OrbitCamera = () => {
  const frame = useCurrentFrame();
  const controlsRef = useRef();

  // Kontrolliere OrbitControls über Frame
  useFrame(() => {
    if (controlsRef.current) {
      // Rotation um Z-Achse
      controlsRef.current.autoRotate = false;
      const angle = interpolate(frame, [0, 300], [0, Math.PI * 2]);
      controlsRef.current.setAzimuthalAngle(angle);
    }
  });

  return <OrbitControls ref={controlsRef} autoRotateSpeed={0} />;
};
```

### CameraControls (Maximale Kontrolle)

```typescript
import CameraControls from 'camera-controls';
import { useThree, useFrame } from '@react-three/fiber';

export const AdvancedCameraControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<CameraControls>(null);
  const frame = useCurrentFrame();

  useFrame(() => {
    if (controlsRef.current) {
      // Animiere zu bestimmter Position über Zeit
      const progress = frame / 300;

      // dolly() - Zoom in/out
      // truck() - Links/Rechts
      // pedestal() - Hoch/Runter
      // rotate() - Rotation um Target
      // pan() - Seitliche Verschiebung

      controlsRef.current.dolly(interpolate(frame, [0, 100], [0, 3]), true);
    }
  });

  return (
    <CameraControls
      ref={controlsRef}
      camera={camera}
      gl={gl}
      // ... weitere Props
    />
  );
};
```

## Kamera-Übergänge & Cuts

### Hard-Cut (Sofortiger Wechsel)

```typescript
const HardCut = ({ cameras }: { cameras: THREE.PerspectiveCamera[] }) => {
  const frame = useCurrentFrame();

  // Berechne, welche Kamera aktiv sein sollte
  let activeCamera = cameras[0];
  if (frame > 100) activeCamera = cameras[1];
  if (frame > 200) activeCamera = cameras[2];

  return <primitive object={activeCamera} />;
};
```

### Weicher Übergang (Dissolve)

```typescript
export const DissolveTransition = ({
  fromCamera,
  toCamera,
  transitionStart = 100,
  transitionDuration = 30,
}: {
  fromCamera: THREE.PerspectiveCamera;
  toCamera: THREE.PerspectiveCamera;
  transitionStart: number;
  transitionDuration: number;
}) => {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  const transitionProgress = Math.max(
    0,
    Math.min(1, (frame - transitionStart) / transitionDuration)
  );

  // Interpoliere Position
  camera.position.lerpVectors(fromCamera.position, toCamera.position, transitionProgress);

  // Interpoliere Rotation (LERP für Quaternionen)
  const fromQuat = new THREE.Quaternion();
  fromCamera.getWorldQuaternion(fromQuat);
  const toQuat = new THREE.Quaternion();
  toCamera.getWorldQuaternion(toQuat);

  const interpolatedQuat = new THREE.Quaternion();
  THREE.Quaternion.slerp(fromQuat, toQuat, interpolatedQuat, transitionProgress);
  camera.quaternion.copy(interpolatedQuat);

  return null;
};
```

## Dolly Zoom Effekt (Vertigo-Effekt)

```typescript
export const DollyZoom = () => {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  // Klassischer Dolly Zoom: Kamera bewegt sich, FOV ändert sich gegensätzlich
  const distance = interpolate(frame, [0, 300], [10, 3]); // Zoom in
  const fov = interpolate(frame, [0, 300], [50, 110]); // FOV erweitern

  camera.position.z = distance;
  (camera as THREE.PerspectiveCamera).fov = fov;
  camera.updateProjectionMatrix();

  return null;
};
```

## Virtuelle Kamera-Setups für verschiedene Szenarien

### Setup 1: Product Showcase (MacBook)

```typescript
export const ProductShowcaseCamera = () => {
  const frame = useCurrentFrame();

  // Phase 1: Wide shot (0-60)
  // Phase 2: Orbit (60-180)
  // Phase 3: Extreme Close-Up (180-240)
  // Phase 4: Hold (240-300)

  const phase = frame > 240 ? 3 : frame > 180 ? 2 : frame > 60 ? 1 : 0;

  switch (phase) {
    case 0:
      // Wide shot: Kamera weit weg, sieht ganzen MacBook
      return (
        <PerspectiveCamera position={[0, 0.5, 4]} fov={60} lookAt={[0, 0, 0]} />
      );

    case 1:
      // Orbit: Kamera kreist um Objekt
      const angle = interpolate(frame, [60, 180], [0, Math.PI * 2]);
      return (
        <PerspectiveCamera
          position={[Math.cos(angle) * 3, 1, Math.sin(angle) * 3]}
          fov={60}
        />
      );

    case 2:
      // Extreme Close-Up: Zoom in auf Display
      const progress = interpolate(frame, [180, 240], [0, 1]);
      return (
        <PerspectiveCamera
          position={[0, 0, 2 - progress * 1.8]}
          fov={50 + progress * 40}
        />
      );

    default:
      // Hold: Bleibe in Position
      return (
        <PerspectiveCamera position={[0, 0, 0.2]} fov={90} />
      );
  }
};
```

### Setup 2: Website Mockup (Multi-Display)

```typescript
export const WebsiteShowcaseCamera = () => {
  const frame = useCurrentFrame();

  // Fliege zwischen verschiedenen Displays
  if (frame < 100) {
    // MacBook Pro
    return <PerspectiveCamera position={[-2, 0, 2]} lookAt={[-1, 0, 0]} />;
  } else if (frame < 200) {
    // iPad
    return <PerspectiveCamera position={[0, 0, 3]} lookAt={[1, 0, 0]} />;
  } else {
    // iPhone
    return <PerspectiveCamera position={[2, 0, 1.5]} lookAt={[2.5, 0, 0]} />;
  }
};
```

### Setup 3: Data Visualization (Fly-Through)

```typescript
export const DataVisualizationCamera = () => {
  const frame = useCurrentFrame();
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 20),
    new THREE.Vector3(10, 5, 10),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(-10, 5, -10),
    new THREE.Vector3(0, 0, -20),
  ]);

  const t = frame / 300;
  const position = curve.getPoint(t);

  return (
    <PerspectiveCamera
      position={[position.x, position.y, position.z]}
      lookAt={[0, 0, 0]}
      fov={60}
    />
  );
};
```

## Best Practices für Kamera-Animation

1. **Nutze Easing-Funktionen** für sanfte Übergänge (Ease-In-Out)
2. **Vermeide zu schnelle Bewegungen** (führt zu Motion Sickness im Video)
3. **Plan Kamera-Moves mit Frame-Guides** (z.B. Spreadsheet mit Frame-Ranges)
4. **Teste mit verschiedenen Aspect-Ratios** (16:9, 9:16, 1:1)
5. **Nutze Depth-of-Field** sparingly (Performance-Kosten)
6. **Vermeide Gimbal-Lock** durch Quaternion-Interpolation (nicht Euler-Winkel)

## Performance-Tipps

- **Viewport-Culling:** Rendere nur Objekte, die sichtbar sind
- **Shader-Caching:** Kompiliere Shader einmalig, nicht per Frame
- **Camera Frustum:** Nutze korrekte near/far-Werte (Kosten: rendering.depth)
