# 🧪 EXTRACTION REPORT: BADGE 3 (VISUAL FX)

| **Meta-Data**    | **Value**          |
| :--------------- | :----------------- |
| **Agent**        | Sub-Agent Badge 3  |
| **Source Files** | 10 Deep-Read Files |
| **Date**         | 2026-01-30         |
| **Status**       | ✅ SUCCESS         |

## 📊 Extraction Statistics

| Metric                  | Count |
| :---------------------- | :---- |
| **Shaders Extrahiert**  | 4     |
| **Post-FX Modules**     | 4     |
| **Verworfene Patterns** | 0     |
| **Extrahiert via CSM**  | 4     |
| **useFrame Warnings**   | 4     |

---

# 1. SHADER RECIPES (CSM & DETERMINISTIC)

### Recipe 1: Iridescent Glass (Viron Standard)

**Quelle:** `advanced-shaders.md` (Repo)

**Kontext/Erklärung:**
Wir ersetzen die veraltete `Lamina`-Library durch `three-custom-shader-material` (CSM). Dies ist notwendig, um volle GLSL-Kontrolle zu haben und Maintenance-Probleme zu vermeiden. Das Original nutzte `useFrame` mit `clock.elapsedTime`, was für Video-Rendering nicht deterministisch ist. Wir haben dies auf `useCurrentFrame` konvertiert.

**Visuelles Ergebnis:**
Ein schimmerndes, glasartiges Material, dessen Farbe sich je nach Blickwinkel ändert (Fresnel) und das subtil perlin-noise-artig pulsiert.

**Code/Daten:**

```typescript
// materials/IridescentGlass.tsx
import { extend } from "@react-three/fiber";
import CustomShaderMaterial from "three-custom-shader-material/dist/CustomShaderMaterial.js";
import * as THREE from "three";
import { useRef } from "react";
import { useCurrentFrame } from "remotion";

extend({ CustomShaderMaterial });

export const createIridescentMaterial = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0.1, 0.5, 1.0) },
      uIridescenceStrength: { value: 0.8 },
      uFresnelPower: { value: 2.5 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        vViewDir = normalize(cameraPosition - vPosition);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uIridescenceStrength;
      uniform float uFresnelPower;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), uFresnelPower);
        float iridescence = sin(dot(vNormal, vec3(1.0, 0.5, 0.2)) * 5.0 + uTime * 0.5) * 0.5 + 0.5;
        vec3 iridColor = mix(uColor, vec3(sin(uTime + 1.0) * 0.5 + 0.5, 0.5, cos(uTime) * 0.5 + 0.5), iridescence * uIridescenceStrength);
        csm_DiffuseColor = vec4(mix(iridColor, vec3(1.0), fresnel * 0.3), 1.0);
      }
    `,
    metalness: 0.8,
    roughness: 0.1,
    transmission: 0.5,
    ior: 1.5,
  });
};

// React Component Wrapper
export const IridescentButton = (props: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef(createIridescentMaterial());
  const frame = useCurrentFrame();

  // ⚠️ CONVERSION: useFrame removed. Direct uniform update via frame.
  if (matRef.current) {
      matRef.current.uniforms.uTime.value = frame / 30; // 30 FPS Standard
  }

  return (
    <mesh {...props} ref={meshRef} material={matRef.current}>
      <boxGeometry args={[2, 1, 0.2, 32, 16, 16]} />
    </mesh>
  );
};
```

**Implikation:**
Erfordert Installation von `three-custom-shader-material`.

---

### Recipe 2: Animated Displacement (Liquid Surface)

**Quelle:** `advanced-shaders.md` (Repo)

**Kontext/Erklärung:**
Dieser Shader displacet die Vertices der Geometrie basierend auf einer Sinus-Welle, um einen flüssigen Effekt zu erzeugen. Auch hier wurde die Zeit-Logik für Remotion determiniert. Es nutzt `MeshStandardMaterial` als Basis.

**Visuelles Ergebnis:**
Eine Oberfläche, die wie Wasser kräuselt und Wellen schlägt, mit korrekten Lichtreflexionen dank neu berechneter Normalen.

**Code/Daten:**

```typescript
// materials/LiquidSurface.tsx
// ... imports refer to Recipe 1

export const createLiquidSurfaceMaterial = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    uniforms: {
      uTime: { value: 0 },
      uDisplacementScale: { value: 0.1 },
      uWaveAmplitude: { value: 0.05 },
      uWaveFrequency: { value: 5.0 },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uDisplacementScale;
      uniform float uWaveAmplitude;
      uniform float uWaveFrequency;
      varying vec3 vNormal;
      void main() {
        vec3 pos = position;
        float wave1 = sin(position.x * uWaveFrequency + uTime) * uWaveAmplitude;
        float wave2 = cos(position.y * uWaveFrequency + uTime * 0.7) * uWaveAmplitude;
        pos.z += (wave1 + wave2) * uDisplacementScale;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
        float diffuse = max(dot(vNormal, lightDir), 0.0);
        csm_DiffuseColor = vec4(vec3(0.2, 0.6, 1.0) * (0.5 + diffuse), 1.0);
      }
    `,
    metalness: 0.8,
    roughness: 0.2,
  });
};

// Usage Example
export const LiquidPlane = () => {
    const matRef = useRef(createLiquidSurfaceMaterial());
    const frame = useCurrentFrame();

    if (matRef.current) {
        matRef.current.uniforms.uTime.value = frame / 30;
    }

    return (
        <mesh material={matRef.current} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10, 128, 128]} />
        </mesh>
    );
}
```

---

### Recipe 3: Glitch Shader (Matrix Style)

**Quelle:** `advanced-shaders.md` (Repo)

**Kontext/Erklärung:**
Ein "Digital Distortion" Effekt, der RGB-Kanäle trennt und das Mesh verzerrt. Das Originalskript nutzte `Math.random` (implizit in manchen Glitch-Logiken) oder Hover-States. Für Video muss der Glitch kontrollierbar sein (z.B. per Frame-Trigger).

**Visuelles Ergebnis:**
Das Objekt zuckt digital, Farben spalten sich kurzzeitig in Rot/Grün/Blau auf (Chromatic Aberration auf Surface-Level).

**Code/Daten:**

```typescript
// materials/GlitchMaterial.tsx
// ... imports

export const createGlitchMaterial = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    uniforms: {
      uGlitchAmount: { value: 0.0 },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uGlitchAmount;
      uniform float uTime;
      varying vec3 vNormal;
      void main() {
        vec2 glitchOffset = vec2(sin(uTime * 20.0) * uGlitchAmount * 0.05, cos(uTime * 15.0) * uGlitchAmount * 0.05);
        float r = sin(vNormal.x * 10.0 + glitchOffset.x) * 0.5 + 0.5;
        float g = cos(vNormal.y * 10.0) * 0.5 + 0.5;
        float b = sin(vNormal.z * 10.0 + glitchOffset.y) * 0.5 + 0.5;
        vec3 glitchColor = mix(vec3(r, g, b), vec3(0.0, 1.0, 0.5), uGlitchAmount * 0.5);
        csm_DiffuseColor = vec4(glitchColor, 1.0);
      }
    `,
    metalness: 1.0,
    roughness: 0.0,
  });
};

// Usage Example
export const GlitchBox = () => {
  const matRef = useRef(createGlitchMaterial());
  const frame = useCurrentFrame();

  if (matRef.current) {
    matRef.current.uniforms.uTime.value = frame / 30;
    // Deterministic Glitch Trigger every 60 frames
    const isGlitchFrame = frame % 60 < 10;
    matRef.current.uniforms.uGlitchAmount.value = isGlitchFrame ? 1.0 : 0.0;
  }

  // ... mesh return
};
```

---

### Recipe 4: Holographic Projection

**Quelle:** `advanced-shaders.md` (Repo)

**Kontext/Erklärung:**
Erzeugt Scanlines und Transparenz, um ein Hologramm zu simulieren. Nutzt `transparent: true`.

**Visuelles Ergebnis:**
Ein geisterhaftes, cyan-farbenes Objekt durchzogen von wandernden Scanlines, das leicht flackert.

**Code/Daten:**

```typescript
// materials/HologramMaterial.tsx
export const createHologramMaterial = () => {
  return new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    uniforms: {
      uTime: { value: 0 },
      uEmissiveIntensity: { value: 2.0 },
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uEmissiveIntensity;
      varying vec3 vPosition;
      void main() {
        float scanline = sin(vPosition.y * 50.0 - uTime * 5.0) * 0.5 + 0.5;
        scanline = pow(scanline, 3.0);
        float flicker = sin(uTime * 8.0) * 0.3 + 0.7;
        vec3 holoColor = vec3(0.0, 1.0, 0.8) * flicker * scanline;
        float alpha = mix(0.3, 1.0, scanline) * flicker;
        csm_DiffuseColor = vec4(holoColor, alpha);
        csm_Emissive = vec3(holoColor) * uEmissiveIntensity * flicker;
      }
    `,
    transmission: 0.7,
    transparent: true,
    metalness: 0.3,
    roughness: 0.1,
  });
};
```

---

# 2. POST-PROCESSING PIPELINE

### Full Cinematic Stack (Order of Operations)

**Quelle:** `30-post-processing-00-overview-postprocessing-stack.md` (Vault)

**Kontext/Erklärung:**
Die Reihenfolge ist kritisch für das Endergebnis. Bloom muss VOR Grain kommen, damit das Grain nicht leuchtet. DoF muss VOR Grain kommen, damit das Grain scharf bleibt (Film Grain ist auf dem "Film", nicht in der Szene).

**Visuelles Ergebnis:**
Der "High End Film Look" – Leuchtende Highlights, kinematischer Fokus, subtile Linsenfehler und Filmkörnung.

**Code/Daten:**

```typescript
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, FilmGrain } from '@react-three/postprocessing';
import { useCurrentFrame, interpolate } from 'remotion';

export const VironPostProcessing = () => {
    const frame = useCurrentFrame();

    return (
        <EffectComposer>
            {/* 1. Bloom (Luminance) */}
            <Bloom
                intensity={0.8}
                luminanceThreshold={1.0}
                luminanceSmoothing={0.9}
                downsampling={2} // Performance Optimization
            />

            {/* 2. Depth of Field (Focus) */}
            <DepthOfField
                focusDistance={0.5}
                focalLength={0.015}
                bokehScale={6}
            />

            {/* 3. Chromatic Aberration (Optics) */}
            <ChromaticAberration
                offset={[0.001, 0.0005]}
            />

            {/* 4. Film Grain (Correction/Texture) */}
            <FilmGrain
                grain={0.15}
                animate={true}
            />
        </EffectComposer>
    );
};
```

**Implikation:**
Dieser Stack kostet ca. 1.0s pro Frame Renderzeit extra.

---

## 3. ADDITIONAL FINDINGS

### A. Physics Determinism

**Quelle:** `physics.md`
Remotion verlangt, dass Animationen frame-basiert sind. `Math.random()` ist verboten.
**Lösung:** Nutze `remotion.random(seed)` wenn Zufall nötig ist, oder statische Noise-Texturen im Shader.

### B. Bloom Requirements

**Quelle:** `30-post-processing-01-bloom-selective.md`
Bloom funktioniert nur, wenn das Material `emissive` Properties hat UND der `emissiveIntensity` Wert > 1.0 ist, oder der interne Farbwert (HDR) > 1.0 ist (z.B. `uColor * 2.0`).

### C. Compliance & Context

**Quelle:** `vision.md` & `remotion-core/SKILL.md`

- **Vision:** Bestätigt PBR-Standard (Zinc, Glass) als visuelle Identität.
- **Skill:** Warnt vor `Canvas` (R3F) und empfiehlt `<ThreeCanvas>` (Remotion Three) für besseres Resource-Management in Compositions.

---

## 📋 Empfehlungen für Orchestrator

| Priorität  | Aktion                    | Begründung                                                                                                                                     |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔴 HOCH    | **CSM Installieren**      | `npm install three-custom-shader-material` fehlt im Project Root. Ohne das crasht jeder Shader.                                                |
| 🔴 HOCH    | **useFrame Audit**        | Sicherstellen, dass KEIN `useFrame` mehr im Code existiert, das `clock` nutzt.                                                                 |
| 🟡 MITTEL  | **ThreeCanvas Migration** | Shader-Beispiele nutzen generisch `<Canvas>`. Für Production sollte auf `<ThreeCanvas>` migriert werden (`@remotion/three`), gemäß Core-Skill. |
| 🟡 MITTEL  | **Post-Pro Performance**  | Prüfen, ob wir `downsampling={2}` für 4K Renders nutzen können (Qualitätsverlust vs Speed).                                                    |
| 🟢 NIEDRIG | **Glitch Trigger**        | Definieren, wann genau Glitch-Effekte auftreten sollen (Musik-Beat? Szenen-Wechsel?).                                                          |

---

## 📝 Badge 3 Learnings

| Was                          | Warum                                                                                                                | Empfehlung                                                                                             |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| ✅ **CSM-Konversion**        | Briefing-Sektion 4.1 machte das Gesetz explizit ("NUR NOCH CSM"). Klare Anweisung = klare Umsetzung.                 | Behalte explizite "Gesetze" in Sektion 4 für kritische Regeln.                                         |
| ✅ **useFrame-Fix**          | Briefing-Sektion 4.2 lieferte das exakte Konversions-Pattern. Copy-Paste-ready Code eliminiert Interpretation.       | Immer Vorher/Nachher-Code-Blöcke in Sektionen mit kritischen Fixes.                                    |
| ❌ **Context Kit ignoriert** | Agent priorisierte "spezifische" (2.2) über "generische" (2.1) Files, weil 2.1 als "Hintergrund" wahrgenommen wurde. | Warnung in Briefing: "Sektion 2.1 ist NICHT optional. Report wird abgelehnt ohne Erkenntnisse daraus." |
| ❌ **Output-Pfad falsch**    | Briefing Sektion 5 enthielt keinen expliziten Pfad. Agent riet Project Root.                                         | Immer vollständigen Pfad in Sektion 5 angeben: `.knowledge/mission/EXTRACTION_REPORT_BADGE_X.md`       |
| ❌ **ThreeCanvas übersehen** | Ohne erzwungenen Read von `remotion-core/SKILL.md` hätte Agent R3F `<Canvas>` 1:1 kopiert.                           | Skills in Sektion 2.1 als Pflicht-Read mit Checkbox markieren, nicht als "Referenz".                   |

---
