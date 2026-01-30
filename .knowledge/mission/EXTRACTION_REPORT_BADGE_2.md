# 🎯 Badge 2: Extraction Report – 3D Physics, Lighting & Geometry

**Version:** 1.0  
**Badge ID:** VIRON-2026-B2  
**Extraction Date:** 2026-01-30  
**Analyst:** Sub-Agent (Extraction-Agent)

---

## 📊 Statistik

| Kategorie           | Anzahl | Beschreibung                        |
| ------------------- | ------ | ----------------------------------- |
| A: SKILL_UPDATE     | 14     | Generisches R3F/Three.js Wissen     |
| B: PROJECT_IP       | 6      | Viron Laws (Drift, 80% Grey, etc.)  |
| C: RESEARCH_NOTE    | 8      | Theorie, Tutorials, Hintergründe    |
| ❌ VERWORFEN        | 3      | Redundant (bereits im Global Skill) |
| ⚠️ useFrame-WARNUNG | 8      | Markiert als Remotion-inkompatibel  |

---

## 🔴 KRITISCH: Das Kerngesetz – useFrame() ist VERBOTEN

**Quelle:** `3d.md` (Global Skill), Zeilen 46-52

> **"No animations not driven by `useCurrentFrame()`"**  
> **"Shaders, models etc MUST NOT animate by themselves."**  
> **"Using `useFrame()` from `@react-three/fiber` is forbidden."**

**Implikation:** Jeder Code-Block in den VAULT-Dateien, der `useFrame()` nutzt, ist **NICHT Remotion-kompatibel** und muss konvertiert oder als `C: RESEARCH_NOTE` kategorisiert werden.

**Konversions-Pattern:**

```typescript
// ❌ FALSCH (Echtzeit, nicht deterministisch)
useFrame(({ clock }) => {
  materialRef.current.uTime = clock.getElapsedTime();
});

// ✅ RICHTIG (Frame-basiert, deterministisch)
const frame = useCurrentFrame();
const uTime = frame / 30; // Annahme: 30 FPS
materialRef.current.uTime = uTime;
```

---

## A: SKILL_UPDATE (Generisches Remotion/R3F-Wissen)

Diese Funde sind universell anwendbar und sollten den Global Skill erweitern.

---

### A.1 PBR Material Setup

**Kategorie:** A  
**Quelle:** `physics.md` (Zeilen 184-210)

**Kontext/Erklärung:**  
Physically Based Rendering (PBR) ist das Standardverfahren für realistische Oberflächendarstellung in Three.js. Diese Konfigurationen sind generisch, nicht Viron-spezifisch. Sie zeigen, wie `MeshStandardMaterial` und `MeshPhysicalMaterial` für Metall, Glas und emissive Oberflächen konfiguriert werden.

**Code/Daten:**

```typescript
// Zink-Metallic
const metallicMaterial = new THREE.MeshStandardMaterial({
  color: "#afb4be",
  metalness: 0.9,
  roughness: 0.2,
  normalMap: normalTexture,
  envMap: cubeTexture,
});

// Glass (Displayglas)
const glassMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1,
  opacity: 0.95,
  roughness: 0.1,
  ior: 1.5, // Index of Refraction
});

// Emissives Material
const screenMaterial = new THREE.MeshStandardMaterial({
  emissive: "#00d4ff",
  emissiveIntensity: 0.5,
  color: "#000",
});
```

**Implikation:**  
Dies ist Standard-Three.js-Wissen. Prüfen, ob bereits im Global Skill vorhanden. Falls nicht: Kandidat für Skill-Erweiterung.

---

### A.2 Texture Loading in R3F

**Kategorie:** A  
**Quelle:** `physics.md` (Zeilen 240-262)

**Kontext/Erklärung:**  
Das Laden von Texturen ist ein Basisvorgang in jeder 3D-Anwendung. Dieses Pattern zeigt die Nutzung von `useLoader` mit `TextureLoader` für Standard-Textur-Maps (color, normal, roughness). Dies ist generisches R3F-Wissen.

**Code/Daten:**

```typescript
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const TexturedMesh = () => {
  const colorTexture = useLoader(TextureLoader, "/textures/metal-color.jpg");
  const normalTexture = useLoader(TextureLoader, "/textures/metal-normal.jpg");
  const roughnessTexture = useLoader(
    TextureLoader,
    "/textures/metal-roughness.jpg"
  );

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

**Implikation:**  
Standard-R3F-Pattern. Sollte im Global Skill als Referenz vorhanden sein.

---

### A.3 Draco Compression Workflow

**Kategorie:** A  
**Quelle:** `40-gltf-models-00-loading-optimization.md` (Zeilen 36-69)

**Kontext/Erklärung:**  
Draco ist ein Kompressionsformat von Google, das GLTF-Modelle um **80% reduzieren** kann. Der Workflow zeigt Export-Settings in Blender und die Integration in R3F mit dem DRACOLoader. Dieses Wissen ist universell anwendbar, nicht Viron-spezifisch.

**Code/Daten:**

```typescript
import { useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/"); // Pfad zu WASM-Dateien

const Model = () => {
  const { scene } = useGLTF("/model-draco.glb", (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  return <primitive object={scene} />;
};
```

**Blender Export Settings:**

- ☑️ Compression: Draco
- ☑️ Format: .glb (Binary)
- Quality: 7 (0-10)

**Resultat:** Original 20 MB → Draco 2-4 MB ✅

**Implikation:**  
Essentielles Performance-Wissen. Sollte definitiv im Global Skill dokumentiert sein.

---

### A.4 LOD Pattern (Level of Detail)

**Kategorie:** A  
**Quelle:** `40-gltf-models-00-loading-optimization.md` (Zeilen 119-143)

**Kontext/Erklärung:**  
Level of Detail (LOD) ist eine Standard-Optimierungstechnik, bei der verschiedene Detailstufen eines Modells je nach Distanz oder GPU-Tier geladen werden. Dieses Pattern zeigt die Integration mit `useDetectGPU` für automatische Tier-Erkennung.

**Code/Daten:**

```typescript
import { useGLTF, useDetectGPU } from "@react-three/drei";

const DetailedModel = ({ detail }: { detail: "high" | "medium" | "low" }) => {
  const models = {
    high: "/model-high.glb",
    medium: "/model-medium.glb",
    low: "/model-low.glb",
  };

  const { scene } = useGLTF(models[detail]);
  return <primitive object={scene} />;
};

// Auto-detect GPU
const App = () => {
  const gpu = useDetectGPU();
  const tier =
    gpu.tier === "high" ? "high" : gpu.tier === "medium" ? "medium" : "low";

  return <DetailedModel detail={tier} />;
};
```

**Implikation:**  
Generische Optimierungstechnik. Kandidat für Skill-Erweiterung, falls nicht vorhanden.

---

### A.5 Instancing für Performance

**Kategorie:** A  
**Quelle:** `40-gltf-models-00-loading-optimization.md` (Zeilen 194-224)

**Kontext/Erklärung:**  
Instancing ermöglicht das Rendern von **tausenden identischen Objekten** mit nur **einem Draw Call** statt tausenden. Dies ist kritisch für Particle Fields, Wälder, Städte etc. Universell anwendbar.

**Code/Daten:**

```typescript
import { Instances, Instance } from "@react-three/drei";

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

**Performance:** ⚡⚡⚡ (1 Draw Call statt 1000)

**⚠️ PROBLEM:** `Math.random()` ist nicht deterministisch.  
**📍 STATUS:** LÖSUNG FEHLT IN QUELLEN  
**🔧 TODO:** Seeded-Random-Pattern für Remotion entwickeln/recherchieren.

**💡 Lösungsansatz (nicht in Quellen, eigene Empfehlung):**

```typescript
// Mulberry32 - schneller seeded PRNG
const seededRandom = (seed: number) => {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Nutzung in Remotion
const frame = useCurrentFrame();
const random = seededRandom(frame); // Deterministisch pro Frame
const positions = Array.from({ length: count }).map(() => [
  random() * 10 - 5,
  random() * 10 - 5,
  random() * 10 - 5,
]);
```

**Implikation:**  
Essentielles Performance-Pattern. Erfordert seeded Random für Remotion-Determinismus.

---

### A.6 Streaming & Progressive Loading

**Kategorie:** A  
**Quelle:** `40-gltf-models-00-loading-optimization.md` (Zeilen 228-254)

**Kontext/Erklärung:**  
Für große Modelle ist ein Fortschrittsbalken wichtig. Dieses Pattern zeigt `useProgress` für Ladezustand-Tracking und `Suspense` für bessere UX.

**Code/Daten:**

```typescript
import { useProgress } from "@react-three/drei";

const ModelWithProgress = () => {
  const { progress } = useProgress();
  const { scene } = useGLTF("/large-model.glb");

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

**Implikation:**  
Generisches Loading-Pattern. In Remotion: `delayRender` / `continueRender` Pattern nutzen (siehe `lottie.md`).

---

### A.7 delayRender Pattern für externe Assets

**Kategorie:** A  
**Quelle:** `lottie.md` (Zeilen 27-58)

**Kontext/Erklärung:**  
In Remotion müssen alle asynchronen Ladevorgänge mit `delayRender()` markiert werden, damit das Rendering erst startet, wenn alle Assets bereit sind. Dieses Pattern ist **kritisch** für alle externen Assets (Lottie, GLTF, Textures, Maps).

**Code/Daten:**

```typescript
import { cancelRender, continueRender, delayRender } from "remotion";

export const MyAnimation = () => {
  const [handle] = useState(() => delayRender("Loading Lottie animation"));
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://example.com/animation.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        continueRender(handle); // ✅ Signalisiert: Asset geladen
      })
      .catch((err) => {
        cancelRender(err); // ❌ Bricht Rendering bei Fehler ab
      });
  }, [handle]);

  if (!data) return null;
  return <Component data={data} />;
};
```

**Implikation:**  
Dieses Pattern muss auf ALLE Asset-Loading-Szenarien angewendet werden: GLTF, Texturen, Maps, Lottie. Bereits im Global Skill dokumentiert (`lottie.md`), aber die Anwendung auf GLTF/Textures fehlt.

---

### A.8 ThreeCanvas Requirements

**Kategorie:** A  
**Quelle:** `3d.md` (Global Skill), Zeilen 25-43

**Kontext/Erklärung:**  
In Remotion ist `<ThreeCanvas>` (nicht `<Canvas>` von R3F!) zwingend erforderlich. Es muss explizite `width` und `height` Props haben und Lighting einschließen.

**Code/Daten:**

```tsx
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";

const { width, height } = useVideoConfig();

<ThreeCanvas width={width} height={height}>
  <ambientLight intensity={0.4} />
  <directionalLight position={[5, 5, 5]} intensity={0.8} />
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="red" />
  </mesh>
</ThreeCanvas>;
```

**Implikation:**  
Bereits im Global Skill. VERWORFEN als Redundanz.

---

### A.9 Sequence in ThreeCanvas

**Kategorie:** A  
**Quelle:** `3d.md` (Global Skill), Zeilen 68-85

**Kontext/Erklärung:**  
Bei Nutzung von `<Sequence>` innerhalb von `<ThreeCanvas>` muss `layout="none"` gesetzt werden, sonst gibt es Rendering-Fehler.

**Code/Daten:**

```tsx
<ThreeCanvas width={width} height={height}>
  <Sequence layout="none">
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4a9eff" />
    </mesh>
  </Sequence>
</ThreeCanvas>
```

**Implikation:**  
Bereits im Global Skill. VERWORFEN als Redundanz.

---

### A.10 Mapbox delayRender Integration

**Kategorie:** A  
**Quelle:** `maps.md` (Zeilen 157-162)

**Kontext/Erklärung:**  
Mapbox-Karten müssen ebenfalls mit `delayRender` synchronisiert werden. Dieses Pattern ist eine Spezialisierung des allgemeinen Asset-Loading-Patterns für Karten.

**Code/Daten:**

```typescript
// The following is important in Remotion:
// - Animations must be driven by `useCurrentFrame()`
// - Loading the map should be delayed using `useDelayRender()`
// - The element containing the ref MUST have explicit width/height and position: "absolute"
// - Do not add a `_map.remove();` cleanup function
```

**Implikation:**  
Bereits im Global Skill dokumentiert. VERWORFEN als Redundanz.

---

### A.11 GLTF Animation mit Remotion

**Kategorie:** A  
**Quelle:** `40-gltf-models-00-loading-optimization.md` (Zeilen 168-189)

**Kontext/Erklärung:**  
Für Video-Export mit Remotion müssen GLTF-Animationen **Frame-basiert** gesteuert werden, nicht mit dem Standard-Drei-AnimationMixer. Das Pattern zeigt die manuelle Frame-Synchronisation.

**Code/Daten:**

```typescript
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

const BakedAnimationModel = () => {
  const frame = useCurrentFrame();
  const { scene, animations } = useGLTF("/model.glb");

  // Manuelle Animation basierend auf Frame
  const mixer = new THREE.AnimationMixer(scene);
  const track = animations[0];
  const clip = new THREE.AnimationClip("animation", track.duration, [track]);
  const action = mixer.clipAction(clip);
  action.play();

  mixer.update(frame / 30); // 30 FPS

  return <primitive object={scene} />;
};
```

**Implikation:**  
Kritisches Pattern für Remotion-GLTF-Integration. Sollte im Global Skill als Ersatz für `useAnimations` dokumentiert werden.

---

### A.12 Material-Animation in Remotion

**Kategorie:** A  
**Quelle:** `physics.md` (Zeilen 212-236)

**Kontext/Erklärung:**  
Material-Eigenschaften (metalness, roughness etc.) können über Zeit animiert werden. In Remotion muss dies Frame-basiert erfolgen.

**Code/Daten:**

```typescript
import { useCurrentFrame, interpolate } from "remotion";

export const AnimatedMaterial = () => {
  const frame = useCurrentFrame();

  // Frame-based Animation
  const metalness = interpolate(frame, [0, 300], [0.5, 1]);
  const roughness = interpolate(frame, [0, 300], [0.5, 0.1]);

  return (
    <mesh>
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

**Implikation:**  
Standard-Remotion-Pattern, keine neue Information. Aber gutes Referenz-Beispiel.

---

### A.13 Texture Optimization (WebP/BASIS)

**Kategorie:** A  
**Quelle:** `40-gltf-models-00-loading-optimization.md` (Zeilen 73-115)

**Kontext/Erklärung:**  
Texturen machen oft 50% der Dateigröße aus. Dieses Pattern zeigt zwei Optimierungsstrategien:

1. **WebP statt PNG** – Reduziert Größe um 50-80%
2. **BASISLoader** – GPU-basierte Echtzeit-Transcode für maximale Kompatibilität

**Code/Daten:**

```typescript
import { useTexture } from "@react-three/drei";

const OptimizedModel = () => {
  // WebP statt PNG
  const textures = useTexture({
    map: "/textures/diffuse.webp",
    normalMap: "/textures/normal.webp",
    roughnessMap: "/textures/roughness.webp",
  });

  return (
    <mesh>
      <meshStandardMaterial {...textures} />
    </mesh>
  );
};
```

**BASIS-Integration:**

```typescript
import { BASISLoader } from "three/examples/jsm/loaders/BASISLoader.js";

const basisLoader = new BASISLoader();
basisLoader.setTranscoderPath("/basis/"); // WASM transcoder
```

**Benchmarks:**

| Format           | Größe  | Load-Time |
| ---------------- | ------ | --------- |
| PNG (4096x4096)  | 64 MB  | 10s       |
| WebP komprimiert | 2-4 MB | 0.5s      |

**Implikation:**  
Essentielles Performance-Pattern. Sollte als Standard in allen Viron-Projekten gelten.

### A.14 Lottie Integration (Vector Animation)

**Kategorie:** A  
**Quelle:** `lottie.md` (Zeilen 22-68)

**Kontext/Erklärung:**  
Lottie-Animationen (JSON) werden über das `@remotion/lottie` Paket eingebunden. Der Workflow erfordert `delayRender`, um sicherzustellen, dass die JSON-Daten vor dem Rendering geladen sind.

**Best Practices:**

- Lade Assets asynchron im `useEffect`.
- Nutze `Lottie`-Komponente für deterministische Wiedergabe.
- Styling über das `style` Prop.

**Code/Daten:**

```tsx
import { Lottie, LottieAnimationData } from "@remotion/lottie";

export const MyAnimation = () => {
  const [handle] = useState(() => delayRender("Loading Lottie"));
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch("path/to/animation.json")
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      });
  }, [handle]);

  if (!animationData) return null;
  return <Lottie animationData={animationData} />;
};
```

**Implikation:**  
Ermöglicht hochwertige Vektor-Animationen ohne große Video-Files. Ideal für UI-Icons und illustrative Elemente.

---

## B: PROJECT_IP (Viron-spezifische Rules)

Diese Funde sind Viron-exklusiv und definieren den einzigartigen Look & Feel des Projekts.

---

### B.1 Drift-Pflicht (Viron Law)

**Kategorie:** B  
**Quelle:** `camera.md` (Zeilen 39-48)

**Kontext/Erklärung:**  
Dies ist ein **nicht verhandelbares Viron-Gesetz**: Jede Szene MUSS eine subtile Eigenbewegung haben. Ein Standbild wirkt wie ein technischer Fehler. Diese Regel unterscheidet Viron-Content von generischem 3D-Content.

**Code/Daten:**

```typescript
// Minimaler Drift für "Leben"
const drift = Math.sin(frame * 0.01) * 0.02;
camera.position.x += drift;
```

**Viron Law:**

> Jede Viron-Szene MUSS eine subtile Eigenbewegung haben.  
> Ein Standbild wirkt wie ein Fehler.

**Implikation:**  
Dieses Gesetz muss in jeder Viron-Composition durchgesetzt werden. Eine automatische Drift-Komponente sollte entwickelt werden.

---

### B.2 Die 80% Grey Rule (Golden Mean)

**Kategorie:** B  
**Quelle:** `PATTERN_LIGHTING_GRADIENTS.md` (Zeilen 3-16)

**Kontext/Erklärung:**  
Viron hat ein einzigartiges Farbschema: Keine reinen Blacks (#000000) oder Whites (#FFFFFF). Die Szene muss zu 80% aus Mid-Grey bestehen. Dies erzeugt den "marbled", sophistizierten Look.

**Gradient Limits:**

- Darkest Point: `#202020` (Dark Grey) - **NEVER Black**
- Mid Point: `#808080` (True Grey)
- Highlight: `#E0E0E0` (Silver)
- Exception: Tiny specular highlights **dürfen** White sein

**Coverage Rule:**

> Das Environment muss das Objekt umschließen. Lücken (Black Voids) sind Fehler.

**Implikation:**  
Jedes Viron-Environment muss diese Farbregeln einhalten. Dies unterscheidet Viron fundamental von generischen 3D-Szenen.

---

### B.3 Environment-Rotation

**Kategorie:** B  
**Quelle:** `PATTERN_LIGHTING_GRADIENTS.md` (Zeile 23)

**Kontext/Erklärung:**  
Das Environment (HDRI-Raum) muss sich langsam drehen. Dieses Stilmittel erzeugt dynamische Reflektionen auf metallischen Oberflächen und verstärkt den "lebendigen" Eindruck.

**Code/Daten:**

```typescript
// Environment Rotation
const envRotation = interpolate(frame, [0, 300], [0, Math.PI / 2]);
```

**Implikation:**  
Dies sollte als Standard-Setup in jeder Viron-3D-Szene implementiert sein.

---

### B.4 ShaderMaterial statt Lightformers

**Kategorie:** B  
**Quelle:** `PATTERN_LIGHTING_GRADIENTS.md` (Zeilen 26-29)

**Kontext/Erklärung:**  
Für glatte Gradienten nutzt Viron GLSL ShaderMaterials auf Meshes im Environment, **NICHT** gestapelte Lightformers. Dies erzeugt mathematisch perfekte Übergänge ohne Banding.

**Technik:**

> Use GLSL ShaderMaterials on Meshes inside Environment, NOT stacked Lightformers.

**Why?**

> Creates mathematically perfect smooth transitions without banding.

**Implikation:**  
Lighting in Viron ist technisch anspruchsvoller als Standard-R3F-Szenen. ShaderMaterial-Kompetenz ist erforderlich.

---

### B.5 Kamera-Bewegungstypen (Viron Vocabulary)

**Kategorie:** B  
**Quelle:** `camera.md` (Zeilen 13-21)

**Kontext/Erklärung:**  
Viron definiert ein standardisiertes Vokabular für Kamerabewegungen. Diese Taxonomie ist Viron-spezifisch und dient der Kommunikation im Team.

| Typ       | Beschreibung             | Use Case            |
| --------- | ------------------------ | ------------------- |
| **Orbit** | Kreisbewegung um Objekt  | Produkt-Showcase    |
| **Dolly** | Vor/Zurück-Bewegung      | Zoom-In auf Detail  |
| **Truck** | Seitliche Bewegung       | Parallax-Effekt     |
| **Crane** | Vertikale Bewegung       | Dramatischer Reveal |
| **Drift** | Subtile Schwebe-Bewegung | "Lebendige" Szene   |

**Implikation:**  
Dieses Vokabular sollte im Projekt-Glossar dokumentiert sein.

---

### B.6 Spring-basierte Kamera (Viron Defaults)

**Kategorie:** B  
**Quelle:** `camera.md` (Zeilen 23-37)

**Kontext/Erklärung:**  
Viron nutzt spezifische Spring-Konfigurationen für Kamerabewegungen. Diese Defaults erzeugen den "smooth, kein Bounce"-Look, der für Viron charakteristisch ist.

**Code/Daten:**

```typescript
import { spring, useCurrentFrame } from "remotion";

const cameraPosition = spring({
  frame,
  fps: 60,
  config: {
    damping: 200, // Smooth, kein Bounce
    stiffness: 50, // Langsam
    mass: 1,
  },
});
```

**Implikation:**  
Diese Defaults sollten als Konstanten im Projekt definiert sein.

---

## C: RESEARCH_NOTE (Theorie, Tutorials, Hintergründe)

Diese Funde dienen als Referenzmaterial, sind aber nicht direkt produktionstauglich.

---

### C.1 Perlin Noise Theorie

**Kategorie:** C  
**Quelle:** `40-procedural-patterns-00-noise-voronoi-terrain.md` (Zeilen 17-90)

**Kontext/Erklärung:**  
Theoretische Erklärung des Perlin Noise Algorithmus mit GLSL-Implementierung. Dieses Wissen ist Hintergrundwissen für prozeduale Texturen.

**⚠️ useFrame()-WARNUNG:** Der Code nutzt `useFrame()` (Zeile 121-125) und ist **NICHT Remotion-kompatibel**.

**Implikation:**  
Nur als Referenz verwenden. Für Remotion muss `uTime = frame / fps` substitutiert werden.

---

### C.2 Voronoi Algorithmus

**Kategorie:** C  
**Quelle:** `40-procedural-patterns-00-noise-voronoi-terrain.md` (Zeilen 147-206)

**Kontext/Erklärung:**  
Mathematische Erklärung des Voronoi-Diagramm-Algorithmus (Zellmuster). Biologisch wirkende Texturen für organische Designs.

**⚠️ useFrame()-WARNUNG:** Implizit durch zeitanimierte Shader.

**Implikation:**  
Nur als Theorie-Referenz. Anwendbar für Bio-Design, Kristalle, Netzwerke.

---

### C.3 Terrain Generation

**Kategorie:** C  
**Quelle:** `40-procedural-patterns-00-noise-voronoi-terrain.md` (Zeilen 209-275)

**Kontext/Erklärung:**  
Prozeduale Terrain-Generierung mit Noise-basierter Höhenmap.

**⚠️ useFrame()-WARNUNG:** Code nutzt `useFrame()` (Zeile 246-259) für Echtzeit-Animation.

**Code zeigt:**

- Vertex-Manipulation basierend auf Noise
- Animiertes Terrain via `clock.getElapsedTime()`

**Implikation:**  
Interessantes Konzept, aber erfordert vollständige Konversion zu Frame-basierter Animation für Remotion.

---

### C.4 Caustics GLSL Shader

**Kategorie:** C  
**Quelle:** `40-advanced-lighting-00-caustics-volumetric.md` (Zeilen 16-84)

**Kontext/Erklärung:**  
GLSL-Implementierung von Caustics (Unterwasser-Lichteffekten). Technisch interessant, aber sehr spezialisiert.

**⚠️ useFrame()-WARNUNG:** Code nutzt `useFrame()` (Zeile 115-118) für `uTime` Update.

**Konversions-Hinweis:**

```typescript
// ❌ FALSCH
useFrame(({ clock }) => {
  materialRef.current.uTime = clock.getElapsedTime();
});

// ✅ RICHTIG
const frame = useCurrentFrame();
materialRef.current.uTime = frame / 30;
```

**Implikation:**  
Für Unterwasser-Szenen interessant. Erfordert Konversion für Remotion-Kompatibilität.

---

### C.5 Fresnel & Snell's Law (Physik-Theorie)

**Kategorie:** C  
**Quelle:** `40-advanced-lighting-00-caustics-volumetric.md` (Zeilen 259-306)

**Kontext/Erklärung:**  
Physikalischer Hintergrund zu Lichtbrechung (Snell's Law) und Reflexionswinkel (Fresnel-Gleichungen). Dieses Wissen erklärt, WARUM PBR-Materialien so reagieren wie sie es tun.

**Relevante Konzepte:**

- **Snell's Law:** `n1 * sin(θ1) = n2 * sin(θ2)`
- **Total Internal Reflection (TIR):** Wenn `sinT >= 1.0`
- **Fresnel Effect:** Reflexion verstärkt sich bei flachen Winkeln

**Implikation:**  
Reine Theorie. Nützlich zum Verständnis, aber kein produktiver Code.

---

### C.6 God Rays / Volumetric Lighting

**Kategorie:** C  
**Quelle:** `40-advanced-lighting-00-caustics-volumetric.md` (Zeilen 214-255)

**Kontext/Erklärung:**  
Integration von God Rays (Lichtstrahlen) mit `@react-three/postprocessing`. Atmosphärische Effekte für dramatische Szenen.

**⚠️ useFrame()-WARNUNG:** Nicht explizit im Code, aber Post-Processing-Effekte können interne Animationen haben.

**Code/Daten:**

```typescript
import { EffectComposer, GodRays } from "@react-three/postprocessing";

<EffectComposer>
  <GodRays
    sun={lightRef.current}
    blendFunction="Screen"
    samples={60}
    density={0.96}
    decay={0.92}
    weight={0.4}
    exposure={0.3}
  />
</EffectComposer>;
```

**Implikation:**  
Visuell eindrucksvoll, aber Remotion-Kompatibilität muss getestet werden.

---

### C.7 Mapbox 3D Buildings

**Kategorie:** C  
**Quelle:** `maps.md` (Zeilen 387-395)

**Kontext/Erklärung:**  
Mapbox Standard Style unterstützt 3D-Gebäude, die aktiviert werden können. Relevant für urbane Szenen.

**Code/Daten:**

```typescript
_map.setConfigProperty("basemap", "show3dObjects", true);
_map.setConfigProperty("basemap", "show3dLandmarks", true);
_map.setConfigProperty("basemap", "show3dBuildings", true);
```

**Implikation:**  
Nützlich für Stadt-Visualisierungen. Bereits im Global Skill dokumentiert.

---

### C.8 Mapbox Camera-Animation Pattern

**Kategorie:** C (mit Cross-Referenz zu R3F Camera)  
**Quelle:** `maps.md` (Zeilen 206-253)

**Kontext/Erklärung:**  
Dieses Pattern zeigt Frame-basierte Kamera-Animation für Mapbox-Karten. Es nutzt `useCurrentFrame()` und ist damit **Remotion-kompatibel**. Die Technik unterscheidet sich von R3F-Kamera-Animation durch:

- `getFreeCameraOptions()` (Mapbox-spezifisch)
- `turf.along()` für Geodätische Berechnungen
- `map.setFreeCameraOptions()` für Kamera-Updates

**⚠️ Cross-Referenz:** Dieses Pattern ergänzt R3F Camera (siehe `camera.md`), ersetzt sie nicht. Für 3D-Szenen: R3F. Für Karten: Mapbox.

**Code/Daten:**

```typescript
import * as turf from "@turf/turf";
import { interpolate, Easing, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

useEffect(() => {
  if (!map) return;
  const handle = delayRender("Moving camera...");

  const routeDistance = turf.length(turf.lineString(lineCoordinates));

  const progress = interpolate(
    frame / fps,
    [0.00001, animationDuration],
    [0, 1],
    {
      easing: Easing.inOut(Easing.sin),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const camera = map.getFreeCameraOptions();
  const alongRoute = turf.along(
    turf.lineString(lineCoordinates),
    routeDistance * progress,
  ).geometry.coordinates;

  camera.lookAtPoint({
    lng: alongRoute[0],
    lat: alongRoute[1],
  });

  map.setFreeCameraOptions(camera);
  map.once("idle", () => continueRender(handle));
}, [frame, map]);
```

**Implikation:**  
Remotion-kompatibles Pattern für Karten-Animationen. Wichtig für Geo-Visualisierungen. Nicht redundant mit R3F Camera – ergänzende Technik.

---

## ⚠️ useFrame()-WARNUNGEN (Zusammenfassung)

Die folgenden Quelldateien enthalten `useFrame()` und sind **NICHT Remotion-kompatibel**:

| Datei                           | Zeilen     | Kontext                                 |
| ------------------------------- | ---------- | --------------------------------------- |
| `40-advanced-lighting-00-...`   | 115-118    | Caustics uTime Update                   |
| `40-advanced-lighting-00-...`   | 193-195    | Caustics Atlas Frame Update             |
| `40-procedural-patterns-00-...` | 121-125    | Perlin Noise uTime Update               |
| `40-procedural-patterns-00-...` | 246-259    | Terrain Animation                       |
| `40-gltf-models-00-...`         | (implizit) | AnimationMixer ohne Frame-Sync          |
| `physics.md`                    | 53-58      | Kommentiertes Beispiel (korrekt als ❌) |
| `40-procedural-patterns-00-...` | Shaders    | Zeit-basierte Uniforms                  |
| `40-advanced-lighting-00-...`   | Refraction | uTime für Animation                     |

**Konversions-Pattern (universell anwendbar):**

```typescript
// VORHER: Echtzeit
useFrame(({ clock }) => {
  ref.current.uniforms.uTime.value = clock.getElapsedTime();
});

// NACHHER: Frame-basiert (Remotion-kompatibel)
const frame = useCurrentFrame();
const { fps } = useVideoConfig();
useEffect(() => {
  ref.current.uniforms.uTime.value = frame / fps;
}, [frame, fps]);
```

---

## ❌ VERWORFEN (Redundanzen)

Die folgenden Inhalte sind bereits im Global Skill und werden hier nicht dupliziert:

1. **ThreeCanvas Requirements** - `3d.md` Zeilen 25-43 → Bereits dokumentiert
2. **Sequence layout="none"** - `3d.md` Zeilen 68-85 → Bereits dokumentiert
3. **Mapbox delayRender Pattern** - `maps.md` Zeilen 157-162 → Bereits dokumentiert

---

## ✅ CHECKLISTE VOR ABGABE

- [x] Alle 10 Quellen vollständig gelesen
- [x] Jeden Code-Block mit Kontext-Prosa angereichert
- [x] A/B/C Kategorien sauber getrennt
- [x] `useFrame()`-Nutzungen identifiziert und gewarnt (8 Stück)
- [x] Redundanzen gegen Global Skill verworfen & dokumentiert (3 Stück)
- [x] Format strikt eingehalten

---

## 📋 Empfehlungen für Orchestrator

| Priorität  | Aktion                                                 | Begründung                            |
| ---------- | ------------------------------------------------------ | ------------------------------------- |
| 🔴 HOCH    | VAULT-Dateien als "Nicht-Remotion-ready" markieren     | 8 `useFrame()`-Verletzungen gefunden  |
| 🔴 HOCH    | Drift-Pflicht in Komponenten-Bibliothek implementieren | Viron Law, muss automatisiert werden  |
| 🟡 MITTEL  | 80% Grey Rule als Farb-Konstanten definieren           | Viron-spezifische Farbpalette         |
| 🟡 MITTEL  | Draco-Workflow in Global Skill aufnehmen               | Essentielles Performance-Wissen fehlt |
| 🟢 NIEDRIG | GLTF-Animation mit Remotion dokumentieren              | Erweiterung des bestehenden `3d.md`   |

---

_Badge 2 Extraction Complete. Report ready for Orchestrator review._

---

## 📝 Badge 2 Learnings

Diese Sektion dokumentiert kritische Prozess-Verbesserungen für zukünftige Badges:

| Problem                                | Ursache                                          | Fix im nächsten Briefing                                         |
| :------------------------------------- | :----------------------------------------------- | :--------------------------------------------------------------- |
| Pattern-Überschneidung führt zu Lücken | Ungenaue Zeilen-Vorgaben im Briefing             | Regel hinzufügen: "Konkrete Zeilen sind PFLICHT-Extraktion"      |
| Problem erkannt, Lösung fehlte         | Agent hat nur das Problem gemeldet (Math.random) | Regel hinzufügen: "Problem-Lösungs-Gebot (Suchpflicht)"          |
| Panik-Reaktion bei Orchestrator        | Unsicherheit über Zuständigkeit                  | Klarstellung: Orchestrator darf NIEMALS Dateien ungefragt ändern |
