# Procedural Patterns – Noise, Voronoi, Terrains, Generative Designs

## Konzept: Mathematisch erzeugte Texturen & Formen

Statt vorgefertigter Assets: **generative, unendlich variable Muster** aus Math-Funktionen.

```
Seed (123) → Perlin Noise → Texture
    ↓
    ├─ Seamless Tileable
    ├─ Animierbar über Zeit
    └─ GPU-accelerated
```

---

## Variante 1: Perlin Noise (Smoothed Randomness)

### Shader-Implementierung (GLSL)

```glsl
// Perlin Noise GLSL Implementation
// Basiert auf Simplex Noise Algorithmus

precision highp float;

uniform float uTime;
uniform float uScale;
varying vec2 vUv;

// Pseudo-random
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Interpolation
float interpolate(float a, float b, float t) {
  float ft = t * 3.14159;
  float f = (1.0 - cos(ft)) * 0.5;
  return a * (1.0 - f) + b * f;
}

// 2D Perlin Noise
float perlin(vec2 p) {
  vec2 pi = floor(p);
  vec2 pf = fract(p);
  
  // Four corners
  float n00 = random(pi + vec2(0.0, 0.0));
  float n10 = random(pi + vec2(1.0, 0.0));
  float n01 = random(pi + vec2(0.0, 1.0));
  float n11 = random(pi + vec2(1.0, 1.0));
  
  // Interpolate
  float nx0 = interpolate(n00, n10, pf.x);
  float nx1 = interpolate(n01, n11, pf.x);
  
  return interpolate(nx0, nx1, pf.y);
}

// Fractional Brownian Motion (FBM) – mehrschichtige Noise
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for (int i = 0; i < 6; i++) {
    value += amplitude * perlin(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  
  return value;
}

void main() {
  // Zeit-animierte Noise
  vec2 uv = vUv * uScale;
  float noise = fbm(uv + uTime * 0.5);
  
  // Zu Farbe konvertieren
  vec3 color = mix(
    vec3(0.1, 0.2, 0.4),  // Dunkelblau
    vec3(0.8, 0.9, 1.0),  // Hellblau
    noise
  );
  
  gl_FragColor = vec4(color, 1.0);
}
```

### React-Three-Fiber Usage

```typescript
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PerlinNoiseMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uScale: 5.0,
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
  fragmentShader
);

const PerlinNoiseTexture = () => {
  const materialRef = useRef();
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });
  
  return (
    <mesh>
      <planeGeometry args={[10, 10, 64, 64]} />
      <perlinNoiseMaterial ref={materialRef} />
    </mesh>
  );
};

export const PerlinNoiseScene = () => (
  <Canvas>
    <PerlinNoiseTexture />
  </Canvas>
);
```

**Output:** Smooth, cloud-like animated texture
**Performance:** ⚡⚡⚡ GPU-basiert, 60 FPS auf allen Devices

---

## Variante 2: Voronoi Patterns (Cell-Noise)

### Voronoi Shader

```glsl
// Voronoi Noise – Zellmuster

precision highp float;

uniform float uTime;
uniform float uScale;
varying vec2 vUv;

vec2 random2(vec2 st) {
  st = vec2(dot(st, vec2(127.1, 311.7)),
            dot(st, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

float voronoi(vec2 p) {
  vec2 pi = floor(p);
  vec2 pf = fract(p);
  
  float minDist = 1.0;
  
  // Prüfe 3x3 Grid um aktuelle Zelle
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = random2(pi + neighbor);
      
      // Berechne Distanz
      float dist = distance(pf - neighbor, point);
      minDist = min(minDist, dist);
    }
  }
  
  return minDist;
}

void main() {
  vec2 uv = vUv * uScale + uTime * 0.2;
  
  float vor = voronoi(uv);
  
  // Zellen mit Kanten
  float edges = smoothstep(0.1, 0.0, vor);
  vec3 color = mix(
    vec3(0.2),           // Zellfarbe
    vec3(1.0),           // Kantenfarbe
    edges
  );
  
  gl_FragColor = vec4(color, 1.0);
}
```

**Output:** Biologische Zellmuster, organisch aussehend
**Anwendung:** Bio-Design, Kristalle, Netzwerke

---

## Variante 3: Terrain Generation (Höhen-Maps)

### Procedurales Terrain mit Noise

```typescript
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simplex Noise für Terrain
function generateTerrainGeometry(width, height, scale, detail) {
  const geometry = new THREE.PlaneGeometry(width, height, width * detail, height * detail);
  const positions = geometry.attributes.position;
  
  // Perlin Noise per Vertex
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    
    // Vereinfachtes Noise (in Production nutze library)
    const noise = Math.sin(x * scale) * Math.cos(y * scale);
    const z = noise * 5;
    
    positions.setZ(i, z);
  }
  
  geometry.computeVertexNormals();
  geometry.setAttribute('position', positions);
  
  return geometry;
}

const ProceduralTerrain = () => {
  const meshRef = useRef();
  
  const geometry = generateTerrainGeometry(100, 100, 0.1, 2);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Animiere Terrain
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.1 + clock.getElapsedTime()) * 
                  Math.cos(y * 0.1 + clock.getElapsedTime()) * 5;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial
        color={0x00aa00}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
```

**Output:** Animiertes Terrain, ständig wechselnd
**Performance:** ⚡ CPU-getrieben, besser mit GPU-Compute-Shader

---

## Variante 4: Generative Designs (Algorithmen)

### Lissajous-Kurven

```typescript
const LissajousPattern = ({ a = 3, b = 2, t = 0 }) => {
  const points = [];
  
  for (let i = 0; i < 1000; i++) {
    const angle = (i / 1000) * Math.PI * 2;
    const x = Math.sin(a * angle + t);
    const y = Math.sin(b * angle);
    points.push([x * 50, y * 50, 0]);
  }
  
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={0xff00ff} />
    </line>
  );
};
```

### Recursive Tree Generation

```typescript
const generateTree = (
  x,
  y,
  angle,
  depth,
  lines
) => {
  if (depth === 0) return;
  
  const length = 10 * depth;
  const x2 = x + Math.cos(angle) * length;
  const y2 = y + Math.sin(angle) * length;
  
  // Linie zeichnen
  lines.push({ x, y, x2, y2 });
  
  // Rekursiv
  generateTree(x2, y2, angle - 0.3, depth - 1, lines);
  generateTree(x2, y2, angle + 0.3, depth - 1, lines);
};

const RecursiveTree = () => {
  const lines = [];
  generateTree(0, 0, Math.PI / 2, 8, lines);
  
  return (
    <group>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line.x, line.y, 0,
                line.x2, line.y2, 0
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={0x00ff00} />
        </line>
      ))}
    </group>
  );
};
```

---

## Praktische Implementierung: Blendable Procedural Textures

```typescript
// Kombiniere mehrere Noise-Typen

const mixedNoise = (uv, time) => {
  const perlin1 = fbm(uv * 3 + time * 0.1);
  const perlin2 = fbm(uv * 7 + time * 0.05);
  const voronoi = voronoi(uv * 5 + time * 0.02);
  
  // Blend
  return mix(
    perlin1,
    mix(perlin2, voronoi, 0.5),
    sin(time) * 0.5 + 0.5
  );
};
```

---

## Performance-Tipps

```typescript
// Caching: Generiere Noise einmal, nutze mehrfach
const cachedNoise = useMemo(() => {
  return generatePerlinNoise(1024, 1024, seed);
}, [seed]);

// Downsampling: Bei vielen Vertices
const lodGeometry = new THREE.PlaneGeometry(100, 100, 32, 32); // Nicht 256x256
```

---

## Quellen

- [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise)
- [Simplex Noise by Ken Perlin](https://cseweb.ucsd.edu/~viscomp/resources/papers/ImprovedPerlin.pdf)
- [Voronoi Diagrams](https://en.wikipedia.org/wiki/Voronoi_diagram)
- [Procedural Generation Book](https://www.amazon.com/Procedural-Generation-Games-Nystrom/dp/0134788994)
- [Shader Toy – Glsl Examples](https://www.shadertoy.com/)
