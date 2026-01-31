# Synergy 03 – WebGPU Compute & Physics (Procedural × Web Performance × GPU)

## Konzept (ASCII Diagram)

```
CPU (JavaScript Logik)
  ├─ Input: Maus, Audio, Parameter
  └─ Decision: Spawn Particles, Forces, Update Uniforms
    ↓
WEBGPU COMPUTE SHADER (WGSL, auf GPU)
  ├─ 1 Million Partikel in Parallel
  ├─ Positionen, Velocitäten, Beschleunigung
  └─ Pro Frame (60 fps): < 1 ms total
    ↓
GPU BUFFERS (Shared Memory)
  ├─ Output: Updated Positions
  └─ Ready for Render Pass
    ↓
RENDER PASS (WebGPU oder Three.js)
  ├─ Canvas/WebGL
  └─ 60–120 FPS Echtzeit-Visualisierung
    ↓
WEBSITE (Interaktiv, Responsive, "Eye Candy")
```

## Ziel

Echte GPU-Simulationen im Browser:
- **Millionen Partikel** statt Tausende
- **Physik-Effekte:** Fluid-ähnliche Bewegung, Gravitation, Kollisionen
- **Audio-reaktiv:** Frequenzbänder steuern Particle-Spawn
- **Echtzeit-Interaktivität:** Maus-Hover, Scroll-Sync
- **Perfekt für:** Hero-Sections, interaktive Demos, Generative Art

---

## Variante 1: WebGPU Compute + Canvas Render (Minimal, Schnellste)

### Setup
- WebGPU initialisieren (GPU Adapter anfordern)
- Storage Buffers für Partikel-Position/Velocity
- Compute Shader pro Frame aktualisieren
- Render: einfach Punkte/Quads auf Canvas zeichnen

**Ideal für:** Maximum Control, minimaler Overhead, Custom Look

### Performance-Charakteristik
- **FPS:** 60–120 fps
- **Partikelanzahl:** 100k – 10 Million
- **Latency:** <2 ms Compute + <1 ms Render = <3 ms total
- **Browser Support:** 70%+ (Chrome, Edge, Safari 17.4+)

---

## Variante 2: WebGPU Compute + Three.js Render (Developer Friendly)

### Setup
- Compute in WebGPU (eigenes Shader-Program)
- Render in Three.js (Scene Graph, Lighting, Materials)
- WebGPU + Three.js teilen Buffers via GPU Interop

**Ideal für:** Schnelle Prototypen, nutze Three.js Ecosystem

### Performance-Charakteristik
- **FPS:** 50–100 fps (etwas weniger wegen Three.js Overhead)
- **Partikelanzahl:** 50k – 5 Million
- **DX:** ⭐⭐⭐⭐⭐ (Three.js ist angenehm)
- **Browser Support:** 60% (Three.js fallbacks via WebGL)

---

## Variante 3: Progressive Enhancement (Graceful Degradation)

### Setup
- Wenn WebGPU: Full GPU Compute + Millions Particles
- Wenn nur WebGL: WebGL Shader für Compute (weniger Particles)
- Wenn nur Canvas: CPU Compute (tausend Particles, 30 fps)
- Wenn Mobile/Low-End: Stark reduziert oder disabled

**Ideal für:** Production Websites, wo Kompatibilität kritisch ist

### Performance-Charakteristik
- **Browser Support:** 100% (ein Fallback für jeden)
- **Mobile:** Graceful (sieht gut aus, aber begrenzt)
- **Desktop:** Volles Potential nutzen

---

## Praktische Implementierung (End-to-End Minimal)

### Schritt 1: WGSL Compute Shader (Physik-Simulation)

```wgsl
// compute.wgsl
// Definiere Particle Struktur
struct Particle {
  pos: vec2f,      // x, y position
  vel: vec2f,      // x, y velocity
  age: f32,        // Lifecycle
  life: f32,       // Max lifetime
};

// Uniforms: Zeit, Kräfte, Kontraint
struct Uniforms {
  uTime: f32,
  uDeltaTime: f32,
  uForceX: f32,
  uForceY: f32,
  uDamping: f32,
};

// Storage Buffers (Read-Write)
@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> uniforms: Uniforms;

// Compute Kernel: Processing 256 Threads in Parallel
@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (i >= arrayLength(&particles)) { return; }

  var p = particles[i];

  // === PHYSICS ===

  // 1) Apply Forces (Wind, Gravity, Audio-Modulation)
  p.vel.x += uniforms.uForceX * uniforms.uDeltaTime;
  p.vel.y += uniforms.uForceY * uniforms.uDeltaTime;

  // 2) Damping (Air Resistance)
  p.vel = p.vel * uniforms.uDamping;

  // 3) Position Update
  p.pos = p.pos + p.vel * uniforms.uDeltaTime;

  // 4) Curl Noise (optional: für organische Bewegung)
  let angle = sin(uniforms.uTime * 0.001 + f32(i) * 0.0001) * 3.14159;
  let curlForce = vec2f(cos(angle), sin(angle)) * 0.01;
  p.vel = p.vel + curlForce;

  // === BOUNDARIES ===
  // Wrap around: wenn Particle rechts rausgeht, kommt von links wieder rein
  if (p.pos.x > 2.0) { p.pos.x = -2.0; }
  if (p.pos.x < -2.0) { p.pos.x = 2.0; }
  if (p.pos.y > 2.0) { p.pos.y = -2.0; }
  if (p.pos.y < -2.0) { p.pos.y = 2.0; }

  // === LIFECYCLE ===
  p.age += uniforms.uDeltaTime;
  if (p.age > p.life) {
    // Particle "sterben" = zurück in Pool (Reset)
    p.pos = vec2f(0.0, 0.0);
    p.vel = vec2f(0.0, 0.0);
    p.age = 0.0;
  }

  // Write back
  particles[i] = p;
}
```

### Schritt 2: WebGPU Setup (TypeScript)

```typescript
// lib/webgpu-compute.ts
interface Particle {
  pos: [number, number];
  vel: [number, number];
  age: number;
  life: number;
}

interface Uniforms {
  uTime: number;
  uDeltaTime: number;
  uForceX: number;
  uForceY: number;
  uDamping: number;
}

export class ParticleSimulation {
  private device!: GPUDevice;
  private computePipeline!: GPUComputePipeline;
  private particleBuffer!: GPUBuffer;
  private uniformBuffer!: GPUBuffer;
  private canvas: HTMLCanvasElement;
  private context: GPUCanvasContext;
  private particleCount = 100_000;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("webgpu") as GPUCanvasContext;
  }

  async init() {
    // 1) Request GPU Adapter
    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) throw new Error("WebGPU not supported");

    // 2) Request Device
    this.device = await adapter.requestDevice();

    // 3) Configure Canvas
    const canvasFormat = navigator.gpu!.getPreferredCanvasFormat();
    this.context.configure({
      device: this.device,
      format: canvasFormat,
    });

    // 4) Load & Compile Compute Shader
    const computeShaderCode = await fetch("/shaders/compute.wgsl").then(r =>
      r.text()
    );
    const computeModule = this.device.createShaderModule({
      code: computeShaderCode,
    });

    // 5) Create Compute Pipeline
    this.computePipeline = this.device.createComputePipeline({
      layout: "auto",
      compute: { module: computeModule, entryPoint: "main" },
    });

    // 6) Create Particle Buffer
    const particleData = new Float32Array(
      this.particleCount * 6 // pos(2) + vel(2) + age(1) + life(1)
    );
    for (let i = 0; i < this.particleCount; i++) {
      const offset = i * 6;
      particleData[offset] = Math.random() * 2 - 1; // pos.x
      particleData[offset + 1] = Math.random() * 2 - 1; // pos.y
      particleData[offset + 2] = 0; // vel.x
      particleData[offset + 3] = 0; // vel.y
      particleData[offset + 4] = 0; // age
      particleData[offset + 5] = 5; // life = 5 seconds
    }

    this.particleBuffer = this.device.createBuffer({
      label: "Particle Buffer",
      size: particleData.byteLength,
      mappedAtCreation: true,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    new Float32Array(this.particleBuffer.getMappedRange()).set(particleData);
    this.particleBuffer.unmap();

    // 7) Create Uniform Buffer
    this.uniformBuffer = this.device.createBuffer({
      label: "Uniforms",
      size: 20, // 5 floats = 20 bytes
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    console.log("✅ WebGPU initialized");
  }

  update(elapsed: number, deltaTime: number, forces: { x: number; y: number }) {
    // 1) Update Uniform Buffer
    const uniformData = new Float32Array([
      elapsed,
      deltaTime,
      forces.x,
      forces.y,
      0.98, // damping
    ]);
    this.device.queue.writeBuffer(this.uniformBuffer, 0, uniformData);

    // 2) Create Bind Group
    const bindGroup = this.device.createBindGroup({
      layout: this.computePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.particleBuffer } },
        { binding: 1, resource: { buffer: this.uniformBuffer } },
      ],
    });

    // 3) Run Compute Shader
    const commandEncoder = this.device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(this.computePipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(
      Math.ceil(this.particleCount / 256) // Workgroups für alle Particles
    );
    passEncoder.end();

    this.device.queue.submit([commandEncoder.finish()]);
  }

  render() {
    // Read particle data (optional, teuer!)
    // Normalerweise: direkt von GPU rendern (next step)
  }
}
```

### Schritt 3: Render Pass (Canvas + WebGPU)

```typescript
// lib/webgpu-render.ts
export class ParticleRenderer {
  private renderPipeline!: GPURenderPipeline;
  private vertexBuffer!: GPUBuffer;

  async initRender(device: GPUDevice) {
    // 1) Load Render Shader
    const renderShaderCode = await fetch("/shaders/render.wgsl").then(r =>
      r.text()
    );
    const renderModule = device.createShaderModule({
      code: renderShaderCode,
    });

    // 2) Create Render Pipeline
    const canvasFormat = navigator.gpu!.getPreferredCanvasFormat();
    this.renderPipeline = device.createRenderPipeline({
      layout: "auto",
      vertex: { module: renderModule, entryPoint: "vs" },
      fragment: { module: renderModule, entryPoint: "fs", targets: [{ format: canvasFormat }] },
    });

    console.log("✅ Render pipeline created");
  }

  render(device: GPUDevice, context: GPUCanvasContext, particleBuffer: GPUBuffer) {
    const commandEncoder = device.createCommandEncoder();

    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.01, g: 0.01, b: 0.02, a: 1 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    });

    renderPass.setPipeline(this.renderPipeline);
    renderPass.setBindGroup(0, /* bind group with particle buffer */);
    renderPass.draw(100_000); // Draw all particles

    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
  }
}
```

### Schritt 4: Animation Loop (Browser RequestAnimationFrame)

```typescript
// app/page.tsx (React)
"use client";

import { useEffect, useRef } from "react";
import { ParticleSimulation } from "@/lib/webgpu-compute";
import { ParticleRenderer } from "@/lib/webgpu-render";

export default function ParticleDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let simulation: ParticleSimulation;
    let renderer: ParticleRenderer;
    let lastTime = 0;
    let isRunning = true;

    async function initAndRun() {
      simulation = new ParticleSimulation(canvasRef.current!);
      await simulation.init();

      renderer = new ParticleRenderer();
      await renderer.initRender(simulation["device"]);

      const animate = (currentTime: number) => {
        if (!isRunning) return;

        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        // Maus-Position als Force
        const forces = {
          x: Math.sin(currentTime * 0.001) * 0.5,
          y: Math.cos(currentTime * 0.001) * 0.5,
        };

        simulation.update(currentTime / 1000, deltaTime, forces);
        renderer.render(
          simulation["device"],
          simulation["context"],
          simulation["particleBuffer"]
        );

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }

    initAndRun().catch(console.error);

    return () => {
      isRunning = false;
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
```

### Schritt 5: Audio-Reaktivität (Optional, Synergie mit 40-audio-reaktiv)

```typescript
// lib/audio-to-forces.ts
export class AudioReactiveForces {
  private analyser!: AnalyserNode;
  private dataArray!: Uint8Array;

  init(audioContext: AudioContext, source: AudioNode) {
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    source.connect(this.analyser);

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }

  getForces(): { x: number; y: number } {
    this.analyser.getByteFrequencyData(this.dataArray);

    // Teile Frequenzen in Bänder auf
    const low = this.dataArray.slice(0, 10).reduce((a, b) => a + b) / 10 / 255; // Bass
    const mid = this.dataArray.slice(10, 50).reduce((a, b) => a + b) / 40 / 255; // Mids
    const high = this.dataArray.slice(50, 128).reduce((a, b) => a + b) / 78 / 255; // Treble

    return {
      x: (mid - 0.5) * 2, // ±1.0
      y: (low - 0.5) * 2, // ±1.0
    };
  }
}
```

---

## Performance-Tipps

### Tipp 1: Particle Count dynamisch anpassen
```typescript
// Detektiere Device-Tier
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 10_000 : 100_000;
```

### Tipp 2: Compute Steps & Substeps
```typescript
// Für stabile Physik: mehrere kleine Steps statt 1 großer
for (let i = 0; i < 4; i++) {
  simulation.update(deltaTime / 4, forces);
}
```

### Tipp 3: Workgroup Size Optimization
```wgsl
// 256 ist typisch; teste 64, 128, 256, 512
@compute @workgroup_size(256)
```

### Tipp 4: Texture Feedback (Advanced)
```typescript
// Statt Particle Buffer: rendere in Texture
// Dann Compute liest von Texture + schreibt zu neuer Texture
// Schneller für sehr große Mengen
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| WebGPU 404 (nicht unterstützt) | Browser zu alt oder deaktiviert | Fallback zu WebGL2 mit reduzierter Particle-Count |
| Render-Stutter | Zu viel Compute pro Frame | Substeps reduzieren; Particle-Count senken |
| Particles "explodieren" | Instabile Physik (Delta-Time zu groß) | Clampen der Velocity oder Fixed TimeStep |
| Mobile wird heiß | GPU läuft 100% | Adaptive Mode: Particle-Count basierend auf Temp |
| Memory Leak | Buffer nicht freigegeben | `destroy()` in Cleanup; check Chrome DevTools |

---

## Integrationen (Synergie mit anderen Modulen)

### Mit 40-audio-reaktiv
```typescript
// FFT → Frequenzbänder → Particle Spawn Rate
const spawnRate = bassFreq * 1000; // Höhere Bass = mehr Particles
```

### Mit 50-web-patterns-08 (Performance)
```typescript
// Core Web Vitals: WebGPU sollte 0 FCP Impact haben (async loading)
// INP: <200ms = Compute <1ms + Render <5ms ✅
```

### Mit 70-web-accessibility
```typescript
// Reduced Motion Support
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Particles bewegen sich nicht, oder sehr langsam
  simulationSpeed = 0.1;
}
```

---

## Fallback Pattern (Production Ready)

```typescript
// Detect Tier & Fallback
async function initParticles() {
  try {
    // Tier 1: WebGPU
    const gpu = await navigator.gpu?.requestAdapter();
    if (gpu) return new WebGPUParticles(canvas);
  } catch (e) {
    console.warn("WebGPU not available");
  }

  try {
    // Tier 2: WebGL2 Compute
    return new WebGL2Particles(canvas);
  } catch (e) {
    console.warn("WebGL2 not available");
  }

  // Tier 3: Canvas Simple
  return new CanvasParticles(canvas); // MillerAustin 10k particles, 30 fps
}
```

---

## Quellen

- WebGPU Spec: https://gpuweb.github.io/gpuweb/
- MDN WebGPU: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
- WGSL Lang: https://www.w3.org/TR/WGSL/
- Three.js WebGPU: https://threejs.org/docs/#api/en/renderers/WebGPURenderer
- Compute Shaders (Tutorial): https://learnopengl.com/Guest-Articles/2022/Compute-Shaders/Introduction

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Advanced–Expert  
**Setup-Time:** 8–12 Stunden (Shader Writing + GPU Debugging)  
**ROI:** Extrem Hoch (Visueller Wow-Factor, 60–120 FPS, Skalierbar auf Millionen Partikel)