# 🧬 EXTRACTION REPORT: BADGE 2 (3D PHYSICS & LIGHTING) – V1 ULTIMATE



**Badge:** 2 (3D Physics & Lighting)

**Version:** 1.0 (ULTIMATE CANON)

**Status:** CODIFIED / IMMUTABLE

**Philosophy:** "Reality is a calculation." (Licht ist Geometrie.)

**Basis:** Viron Omega Decree V1.0 + Badge 7 V11 + Badge 1 V11 + Badge 4 V1

**Date:** 2026-02-04



---



## 📊 EXECUTIVE BRIEFING



| Dimension | Status | Metrik |

| :--- | :--- | :--- |

| **3D Foundation** | ✅ Extracted | `<ThreeCanvas>` + Isolation Mandate |

| **Lighting Engine** | ✅ Extracted | HDRI Abstract Studio + Backstop-Cylinder |

| **PBR Standards** | ✅ Extracted | Metalness 1.0, 80% Grey Rule Compliance |

| **Asset Pipeline** | ✅ Extracted | Draco-Pflicht (>1MB) + High-Poly Hero |

| **Performance** | ✅ Extracted | 4GB/Thread Limit Sync (Badge 7) |



---



# TEIL 1: THE 3D FOUNDATION (Setup & Structure)



## 1.1 THE THREECANVAS MANDATE



**Typ:** SYSTEM ARCHITECTURE

**Quelle:** `3d.md` / `Badge 1 V11 Codex`



### 🧠 The Logic (Das "Warum")

Standard React-Three-Fiber (R3F) nutzt die `<Canvas>` Komponente. In Remotion führt dies zu Desynchronisation, da `<Canvas>` einen eigenen internen `requestAnimationFrame`-Loop startet.

Remotion muss die volle Kontrolle über den Render-Cursor haben, um Frames auf Lambda-Instanzen deterministisch zu "steppen".

Das Gesetz erzwingt die Nutzung von `@remotion/three`, um die Bridge zwischen React-State und Remotion-Frame-Clock zu schlagen.



### ⚖️ The Rules (Die Gesetze)



1\.  **No R3F-Canvas:** Die Nutzung von `<Canvas>` aus `@react-three/fiber` ist **verboten**.

2\.  **Mandatory ThreeCanvas:** Nutze ausschließlich `<ThreeCanvas>` aus `@remotion/three`.

3\.  **Layout-Isolation:** Innerhalb von `<ThreeCanvas>` genutzte `<Sequence>`-Komponenten MÜSSEN `layout="none"` besitzen, um DOM-Interferenzen zu vermeiden.

4\.  **Static Resolution:** `width` und `height` des Canvas müssen fix aus `useVideoConfig()` kommen.



### 💻 Executable Assets (The Setup)



```tsx

// ✅ CORRECT VIRON 3D SETUP

import { ThreeCanvas } from "@remotion/three";

import { useVideoConfig, Sequence } from "remotion";



export const VironScene = () => {

  const { width, height } = useVideoConfig();



  return (

    <ThreeCanvas width={width} height={height}>

      {/* Rules from Badge 1: Scene isolation */}

      <Sequence layout="none">

        <Stage />

      </Sequence>

    </ThreeCanvas>

  );

};

```



---



## 1.2 THE SCENE GRAPH HIERARCHY (Viron Standard)



**Typ:** STRUCTURAL PATTERN

**Quelle:** `viron-button-guide.md` / `22_SYSTEM_PLAN_Folder_Structure.md`



### 🧠 The Logic (Das "Warum")

Um RAM-Effizienz (Badge 7) und visuelle Konsistenz (Badge 4) zu wahren, folgt jede Viron 3D-Szene einer strikten 4-Stufen-Hierarchie. Dies erlaubt das "Freeze-Pattern" (Badge 1) auf verschiedenen Ebenen anzuwenden.



### 🏗️ The Hierarchy



1\.  **ROOT:** Der Container für `<ThreeCanvas>`. Handhabt globale Props.

2\.  **ENVIRONMENT:** Enthält HDRIs, Lightformers und den **Backstop-Cylinder**. Ist meist statisch oder rotiert langsam.

3\.  **STAGE:** Enthält Hilfs-Geometrie (Böden, Reflektoren) und Caustics-Ebenen.

4\.  **HERO:** Das Hauptobjekt (z.B. der Viron-Button). Hier liegt die höchste Poly-Dichte und die komplexesten Shader (Badge 4).



---



# TEIL 2: THE LIGHTING SYSTEM (Illumination)



## 2.1 THE HDRI-FIRST STRATEGY (Raytracing Simulation)



**Typ:** LIGHTING LAW

**Quelle:** `PATTERN_LIGHTING_GRADIENTS.md` / `PATTERN_Viron_Hard_Won_Knowledge.md`



### 🧠 The Logic (Das "Warum")

Manuelle Lichter (`DirectionalLight`, `PointLight`) wirken oft künstlich ("computig"). Ein HDRI liefert tausende Lichtquellen aus einer 360°-Textur und erzeugt natürliche, komplexe Spiegelungen im Metall (Badge 4).

Viron nutzt keine realen Landschaften (Vermeidung von Uncanny Valley), sondern **Abstract Studio HDRIs**.



### ⚖️ The Rules (Die Gesetze)



1\.  **No Solo Lights:** Ein `DirectionalLight` darf niemals die einzige Lichtquelle sein.

2\.  **Abstract Studio Only:** Nutze HDRIs mit Softboxen, Lichtstreifen und Verläufen. Keine Bäume, keine Städte.

3\.  **Intensity Guard:** `envMapIntensity` sollte auf metallischen Oberflächen bei **1.0 bis 1.5** liegen, um die 80% Grey Rule zu erfüllen.

4\.  **Blur Policy:** HDRIs für Reflexionen sollten leicht unscharf sein (`blur={0.8}`), um Aliasing-Artefakte in der Kompression (CRF 28) zu verhindern.



### 💻 Executable Assets (The Environment)



```tsx

import { Environment, Lightformer } from "@react-three/drei";



export const VironEnvironment = () => {

  return (

    <Environment 

      files={staticFile("hdr/studio_soft_01.exr")} 

      blur={0.8}

    >

      {/* Adding manual accents as Lightformers for controlled glints */}

      <Lightformer

        form="rect"

        intensity={2}

        position={[2, 5, -5]}

        scale={[10, 1, 1]}

      />

    </Environment>

  );

};

```



---



## 2.2 THE BACKSTOP & 360° RULE (Anti-Void Protection)



**Typ:** GEOMETRY LAW

**Quelle:** `V43_MASTER_PLAN.md` / `PATTERN_Viron_Hard_Won_Knowledge.md`



### 🧠 The Logic (Das "Warum")

In einer Welt voller Spiegelungen ist eine Lücke in der Geometrie fatal. Der User sieht ein schwarzes Loch im Button, wenn hinter der Kamera nichts ist.

Wir erzwingen eine geschlossene Welt.



### ⚖️ The Rules (Die Gesetze)



1\.  **The Cylinder Hack:** Jede Szene enthält einen umhüllenden Zylinder (`doubleSide`).

2\.  **The Color Anchor:** Farbe des Zylinders ist strikt **`#404040`** (Badge 4 Standard).

3\.  **Overlapping Shingles:** Wände müssen sich überlappen. Keine 1-Pixel-Gaps.



### 💻 Executable Assets (The Backstop)



```tsx

export const Backstop = () => (

  <mesh scale={100}>

    <cylinderGeometry args={[1, 1, 1, 32]} />

    <meshBasicMaterial 

      color="#404040" 

      side={THREE.BackSide} // Visible from inside

    />

  </mesh>

);

```


---


# TEIL 3: THE ASSET PIPELINE (Geometry & Volumetrics)



## 3.1 THE DRACO COMPRESSION LAW (RAM Defense)



**Typ:** PERFORMANCE CONSTRAINT

**Quelle:** `40-gltf-models-00-loading-optimization.md` / `Badge 7 Codex`



### 🧠 The Logic (Das "Warum")

Badge 7 limitiert den RAM auf 4GB pro Thread für 3D-Szenen. Ein unkomprimiertes 4K-Modell kann beim Laden kurzzeitig 500MB+ belegen. Bei 16 Threads sind das 8GB -> **OOM Crash**.

Draco-Kompression reduziert die Geometrie-Größe um ~80-90%, was den RAM-Spike beim Parsing massiv senkt.



### ⚖️ The Rules (Die Gesetze)



1\.  **Threshold:** Jedes Asset > 1MB **MUSS** Draco-komprimiert sein.

2\.  **Loader:** Nutze `useGLTF` aus `@react-three/drei` mit konfiguriertem Draco-Decoder.

3\.  **Pathing:** Decoder-WASM-Files müssen im `public/` Ordner liegen und via `staticFile` referenziert werden.



### 💻 Executable Assets (The Loader Pattern)



```tsx

import { useGLTF } from "@react-three/drei";

import { staticFile } from "remotion";



// Preload is MANDATORY for deterministic rendering

useGLTF.preload(staticFile("models/hero_button_draco.glb"));



export const HeroModel = () => {

  const { scene } = useGLTF(staticFile("models/hero_button_draco.glb"), true); // true = useDraco

  return <primitive object={scene} />;

};

```



---



## 3.2 THE INSTANCING STRATEGY (CPU Defense)



**Typ:** OPTIMIZATION PATTERN

**Quelle:** `40-gltf-models-00-loading-optimization.md`



### 🧠 The Logic (Das "Warum")

Badge 4 verlangt "Complex Shapes" (Arrays, Particles). Wenn wir 1000 Schrauben einzeln rendern, erzeugen wir 1000 Draw Calls. Das drückt die FPS unter 55 (Badge 7 Warnung).

Instancing reduziert dies auf **1 Draw Call**.



### ⚖️ The Rules (Die Gesetze)



1\.  **Repetition Rule:** Sobald ein Mesh mehr als 5x vorkommt -> **`<Instances>`**.

2\.  **No Map:** Vermeide `items.map(() => <Mesh />)`.



### 💻 Executable Assets (The Instance Pattern)



```tsx

import { Instances, Instance } from "@react-three/drei";



export const ScrewArray = () => {

  return (

    <Instances range={50}>

      <cylinderGeometry args={[0.1, 0.1, 0.5]} />

      <meshStandardMaterial color="#202020" />



      {/* 50 Schrauben, 1 Draw Call */}

      {new Array(50).fill(0).map((_, i) => (

        <Instance 

          key={i} 

          position={[i * 0.5, 0, 0]} 

          rotation={[Math.PI / 2, 0, 0]}

        />

      ))}

    </Instances>

  );

};

```



---



## 3.3 VOLUMETRICS & CAUSTICS (The Heavyweights)



**Typ:** VISUAL FX

**Quelle:** `40-advanced-lighting-00-caustics-volumetric.md` / `viron-button-guide.md`



### 🧠 The Logic (Das "Warum")

Badge 4 definiert Glas und Flüssigkeiten als Teil der Ästhetik. Caustics (Lichtbrechung) sind essenziell für den "Premium Look". Aber sie sind extrem teuer (Badge 7: Volumetric Tier = 8GB RAM).



### ⚖️ The Rules (Die Gesetze)



1\.  **Resolution Cap:** Caustics-Buffer dürfen maximal `1024x1024` sein (nicht 4K!).

2\.  **Backfaces:** Für Glas-Objekte (Badge 4) muss `backfaces={true}` aktiviert sein, sonst wirkt das Glas massiv.

3\.  **Static Bake:** Wenn sich das Licht nicht bewegt, **backe** die Caustics in eine Textur. Berechne sie nur realtime, wenn nötig.



### 💻 Executable Assets (The Caustics Setup)



```tsx

import { Caustics } from "@react-three/drei";



export const LiquidStage = ({ children }) => (

  <Caustics

    color="#E0E0E0"         // Silver (Badge 4)

    lightSource={[5, 5, 5]} // Match HDRI direction

    intensity={0.5}

    worldRadius={3}         // Limit calculation area

    ior={1.5}               // Glass (Badge 4)

    backfaces={true}        // Mandatory for glass

    frames={1}              // Infinity = realtime, 1 = baked static

    resolution={1024}       // RAM Safety Cap

  >

    {children}

  </Caustics>

);

```



---



# TEIL 4: CONFLICT RESOLUTION & AUDIT



## 4.1 CONFLICT LOG



| Konflikt | Status | Lösung |

| :--- | :--- | :--- |

| **R3F `useFrame` vs. Remotion** | 🔴 CRITICAL | Standard R3F `useFrame` nutzt `delta` (Systemzeit). Das ist nicht deterministisch. **Lösung:** Wir ignorieren `delta` und nutzen `useCurrentFrame()` innerhalb des Hooks oder berechnen State rein deklarativ. |

| **WebGPU vs. WebGL2** | 🟡 WARNING | Badge 7 fordert WebGPU. Viele Drei-Komponenten (z.B. Caustics) basieren noch auf WebGL-Shadern. **Lösung:** Wir nutzen WebGL2 als stabilen Standard für Badge 2, bereiten aber Shader auf WGSL-Migration vor (Synergy 03). |

| **High-Poly vs. RAM** | 🟡 WARNING | Badge 4 fordert "Vector Smooth" (64 Segments). Badge 7 fordert RAM-Sparsamkeit. **Lösung:** High-Poly NUR für Hero-Objekte. Alles andere (Schrauben, Deko) bleibt Low-Poly. |



## 4.2 QUALITY CHECKLIST (Definition of Done)



Bevor eine 3D-Szene als "Viron-Ready" gilt:



- [ ] **The Canvas Test:** Wird `<ThreeCanvas>` genutzt? (Kein `<Canvas>`).

- [ ] **The Light Test:** Ist ein HDRI die Hauptlichtquelle? (Keine Solo-DirectionalLights).

- [ ] **The Void Test:** Ist der Backstop-Cylinder (`#404040`) sichtbar, wenn man die Kamera dreht?

- [ ] **The Asset Test:** Sind Modelle > 1MB Draco-komprimiert?

- [ ] **The Poly Test:** Hat das Hero-Objekt > 64 Segmente?

- [ ] **The RAM Test:** Läuft die Szene mit `< 4GB` RAM? (Prüfung via Task Manager während Render).



---



# 🏁 ARCHIVE COMPLETENESS STATUS



## Was dieser Codex abdeckt

✅ **3D Foundation:** ThreeCanvas, Isolation, Scene Graph.

✅ **Lighting:** HDRI-First, Backstop, 80% Grey Compliance.

✅ **Assets:** Draco Pipeline, Instancing.

✅ **Volumetrics:** Caustics Config, RAM-Limits.



## Was der Agent jetzt kann

Ein neuer Agent mit diesem Dokument kann:

1\.  Eine 3D-Szene aufsetzen, die frame-genau mit Remotion synchronisiert.

2\.  Licht setzen, das "teuer" aussieht, aber billig rendert (HDRI).

3\.  Modelle laden, ohne den Speicher zu sprengen.

4\.  Den "Industrial Monolith" Look (Badge 4) physisch konstruieren.



---



**Version Control:** V1.0 ULTIMATE (Canon Build)

**Release Date:** 2026-02-06

**Codex Authority:** VIRON 3D PHYSICS & LIGHTING (Badge 2)

**License:** Internal Use Only – Viron Development Framework



---

