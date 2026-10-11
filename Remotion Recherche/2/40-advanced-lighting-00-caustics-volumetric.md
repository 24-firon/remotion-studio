# Caustics & Advanced Lighting – Wasser-Licht-Effekte, Ray-Tracing Simulation

## Konzept: Realistische Lichter-Brechung durch flüssige Oberflächen

```
Sunlight
    ↓
   ≈≈≈ Water Surface (bricht Licht)
    ↓
Caustics-Muster auf Oberfläche
(beweglich, organisch, realistisch)
```

---

## Variante 1: Caustics-Shader (GLSL)

### Precomputed Caustics Texture

```glsl
// Caustics-Muster generieren mit Perlin Noise

precision highp float;

uniform float uTime;
uniform float uScale;
varying vec2 vUv;

// Simplifizierter Perlin Noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float perlin(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f); // Smooth interpolation
  
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  
  float ab = mix(a, b, f.x);
  float cd = mix(c, d, f.x);
  return mix(ab, cd, f.y);
}

// Caustics-Pattern
float caustics(vec2 p, float time) {
  // Layer mehrere Noise-Oktaven
  float result = 0.0;
  
  // 1. Layer - schnell
  result += perlin(p * 3.0 + time * 0.3) * 0.5;
  
  // 2. Layer - mittel
  result += perlin(p * 6.0 - time * 0.2) * 0.3;
  
  // 3. Layer - langsam
  result += perlin(p * 12.0 + time * 0.1) * 0.2;
  
  return result;
}

void main() {
  vec2 uv = vUv * uScale;
  
  // Berechne Caustics
  float causticsPattern = caustics(uv, uTime);
  
  // Verstärke Kontrast
  causticsPattern = pow(causticsPattern, 2.0);
  
  // Zu Farbe: cyanblau (wie Unterwasser)
  vec3 causticsColor = vec3(0.0, 0.8, 1.0) * causticsPattern;
  
  // Optional: Animierter Glanz
  float gloss = sin(uv.x * 10.0 + uTime) * 0.3 + 0.7;
  causticsColor *= gloss;
  
  gl_FragColor = vec4(causticsColor, causticsPattern);
}
```

### React-Three-Fiber Implementation

```typescript
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CausticsMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uScale: 3.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (siehe oben)
  causticsFragmentShader
);

const CausticsPlane = () => {
  const materialRef = useRef();
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <causticsMaterial ref={materialRef} />
    </mesh>
  );
};

export const CausticsScene = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <CausticsPlane />
  </Canvas>
);
```

---

## Variante 2: Precomputed Caustics Texture-Atlas

Für bessere Performance: Caustics vorrendern und als Texture-Atlas laden.

```typescript
// generiere-caustics-atlas.ts (Node.js)

import sharp from 'sharp';
import { createCanvas } from 'canvas';

const generateCausticsFrame = (width: number, height: number, time: number) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Perlin Noise simulieren mit Canvas
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  
  // Einfacher: nutze Noise-Library
  // Komplexer: Canvas-basierte Generierung
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random(); // Placeholder
    const brightness = Math.sin(noise + time) * 127 + 127;
    
    data[i] = brightness;     // R
    data[i + 1] = brightness; // G
    data[i + 2] = brightness; // B
    data[i + 3] = 255;        // A
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas.toBuffer('image/png');
};

// Generiere 60 Frames (2 Sekunden @ 30 FPS)
const atlas = [];
for (let frame = 0; frame < 60; frame++) {
  const frameBuffer = generateCausticsFrame(512, 512, frame / 30);
  atlas.push(frameBuffer);
}

// Speichere als Sprite Sheet
// ...
```

Dann im Browser:

```typescript
const CausticsFromAtlas = () => {
  const materialRef = useRef();
  const [frame, setFrame] = useState(0);
  
  useFrame(() => {
    setFrame(prev => (prev + 1) % 60);
  });
  
  return (
    <mesh>
      <planeGeometry />
      <meshBasicMaterial
        map={atlasTexture}
        // UV-Offset basierend auf Frame
        onBeforeCompile={(shader) => {
          shader.uniforms.uFrame = { value: frame };
        }}
      />
    </mesh>
  );
};
```

---

## Variante 3: Caustics + Light Scattering (Volumetric)

Kombiniere Caustics mit God Rays für atmosphärische Effekte.

```typescript
import { EffectComposer, GodRays } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';

const VolumetricCausticsScene = () => {
  const lightRef = useRef();
  
  return (
    <Canvas>
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={2}
        castShadow
      />
      
      {/* Caustics-Plane */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <causticsMaterial />
      </mesh>
      
      {/* Post-Processing: God Rays */}
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
      </EffectComposer>
    </Canvas>
  );
};
```

---

## Variante 4: Physically-Based Caustics (Advanced)

Mit echtem Raycasting für perfekte Refraktion.

```glsl
// Refraction-basierter Caustics-Shader

precision highp float;

uniform sampler2D uNormalMap;
uniform float uTime;
uniform float uRefractiveIndex;

varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vNormal;

void main() {
  // Normal aus Map
  vec3 normal = texture2D(uNormalMap, vUv + uTime * 0.1).rgb;
  normal = normalize(normal * 2.0 - 1.0);
  
  // Viewing Direction
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  
  // Snell's Law: refraction
  float cosI = abs(dot(viewDir, normal));
  float sinT = uRefractiveIndex * sqrt(1.0 - cosI * cosI);
  
  // TIR (Total Internal Reflection)
  if (sinT >= 1.0) {
    // Full reflection
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    float cosT = sqrt(1.0 - sinT * sinT);
    vec3 refracted = refract(viewDir, normal, uRefractiveIndex);
    
    // Fresnel effect
    float f0 = 0.02;
    float fresnel = f0 + (1.0 - f0) * pow(1.0 - cosI, 5.0);
    
    gl_FragColor = vec4(mix(
      refracted,
      reflect(viewDir, normal),
      fresnel
    ), 1.0);
  }
}
```

---

## Praktische Implementierung: Full Scene mit Caustics

```typescript
// CinematicUnderwater.tsx

const UnderseaScene = () => {
  const sceneRef = useRef();
  
  return (
    <Canvas ref={sceneRef} style={{ height: '100vh' }}>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Caustics auf Meeresgrund */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <causticsMaterial uScale={5} />
      </mesh>
      
      {/* 3D Objekte mit Caustics beleuchtet */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          metalness={0.1}
          roughness={0.8}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Post-Processing */}
      <EffectComposer>
        <Bloom intensity={0.8} />
        <DepthOfField focusDistance={5} />
      </EffectComposer>
      
      {/* Fog */}
      <fog attach="fog" args={['#000033', 10, 100]} />
    </Canvas>
  );
};
```

---

## Performance-Optimization

```typescript
// Level of Detail (LOD)
const CausticsOptimized = ({ quality }: { quality: 'high' | 'medium' | 'low' }) => {
  const configs = {
    high: { scale: 12, octaves: 6, speed: 1.0 },
    medium: { scale: 6, octaves: 3, speed: 0.5 },
    low: { scale: 3, octaves: 1, speed: 0.2 }
  };
  
  const config = configs[quality];
  
  return (
    <mesh>
      <planeGeometry args={[20, 20, config.octaves * 16, config.octaves * 16]} />
      <causticsMaterial
        uScale={config.scale}
        uAnimSpeed={config.speed}
      />
    </mesh>
  );
};
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Caustics sieht blocky aus | Zu wenige Octaves | Erhöhe `octaves` zu 6+ |
| Animation laggt | Zu komplexer Shader | Nutze Precomputed Atlas |
| Kontrast zu schwach | Noise nicht verstärkt | Nutze `pow(noise, 2.0)` |
| Kein Refraction-Effect | Normal-Map fehlt | Erstellle oder lade Normal-Texture |

---

## Quellen

- [Caustics Shader Tutorial](https://www.shadertoy.com/) (search "caustics")
- [Physically-Based Rendering](https://www.pbrt.org/)
- [Fresnel Equations](https://en.wikipedia.org/wiki/Fresnel_equations)
- [Snell's Law](https://en.wikipedia.org/wiki/Snell%27s_law)
- [WebGL Water Simulation](https://github.com/jbouny/ocean)
