# Audio-Reaktive Visualisierungen – FFT, Frequenzspektren, Sound-Triggered Motion

## Konzept: Visuals folgen der Musik in Echtzeit

```
Audio Stream (MP3, Mic)
    ↓
[FFT Analyzer]
    ├─ Low (0-250 Hz) → Bass-Kick
    ├─ Mid (250-2kHz) → Vocals/Drums
    └─ High (2-20kHz) → Cymbals/Shimmer
    ↓
Visualisierung animiert sich
```

---

## Variante 1: Web Audio API + FFT

### Basic Setup

```typescript
import { useEffect, useRef, useState } from 'react';

const AudioAnalyzer = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [frequencies, setFrequencies] = useState<Uint8Array>(new Uint8Array(256));
  
  useEffect(() => {
    // Audio Context erstellen
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;
    
    // Analyser Node
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // 128, 256, 512, 1024, 2048...
    analyserRef.current = analyser;
    
    // Verbinde Quelle mit Analyser
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const source = audioContext.createMediaStreamAudioSource(stream);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      // Animation Loop
      const analyzeAudio = () => {
        const frequencies = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencies);
        setFrequencies(frequencies);
        requestAnimationFrame(analyzeAudio);
      };
      
      analyzeAudio();
    });
  }, []);
  
  return (
    <div>
      {/* Visuals hier */}
    </div>
  );
};
```

### Frequenz-Bands extrahieren

```typescript
interface FrequencyBands {
  bass: number;        // 0-250 Hz
  lowMid: number;      // 250-500 Hz
  mid: number;         // 500-2000 Hz
  highMid: number;     // 2000-8000 Hz
  treble: number;      // 8000-20000 Hz
}

const extractBands = (frequencies: Uint8Array): FrequencyBands => {
  const binCount = frequencies.length;
  
  // Nyquist frequenz ≈ 22050 Hz (half of 44.1 kHz sample rate)
  const hzPerBin = 22050 / binCount;
  
  // Band-Grenzen in Bins
  const bassBins = Math.floor(250 / hzPerBin);
  const lowMidBins = Math.floor(500 / hzPerBin);
  const midBins = Math.floor(2000 / hzPerBin);
  const highMidBins = Math.floor(8000 / hzPerBin);
  
  // Durchschnitt berechnen
  const avg = (start: number, end: number) => {
    let sum = 0;
    for (let i = start; i < end; i++) {
      sum += frequencies[i];
    }
    return sum / (end - start) / 255; // Normalisiert zu 0-1
  };
  
  return {
    bass: avg(0, bassBins),
    lowMid: avg(bassBins, lowMidBins),
    mid: avg(lowMidBins, midBins),
    highMid: avg(midBins, highMidBins),
    treble: avg(highMidBins, binCount)
  };
};
```

---

## Variante 2: Audio mit Remotion exportieren

```typescript
import { Audio, useAudioData, visualizeAudio } from 'remotion';

const AudioReactiveComposition = () => {
  const audioData = useAudioData('audio.mp3');
  
  if (!audioData) {
    return <div>Loading audio...</div>;
  }
  
  const frame = useCurrentFrame();
  
  // Amplitude an aktuellem Frame
  const amplitude = visualizeAudio({
    audioData,
    frame,
    numberOfSamples: 16 // Wie viele Samples pro Frame
  });
  
  // amplitude ist array: [0.1, 0.2, 0.3, ..., 0.15]
  const averageAmplitude = amplitude.reduce((a, b) => a + b) / amplitude.length;
  
  const scale = 1 + averageAmplitude * 0.5; // 1.0 - 1.5
  
  return (
    <div style={{
      transform: `scale(${scale})`,
      transition: 'transform 0.05s'
    }}>
      {/* Content pulst mit Musik */}
    </div>
  );
};
```

**Vorteil:** Deterministische, exportierbar, synchron mit Audio

---

## Variante 3: Visualisierung mit WebGL (Real-time)

### Bar-Visualizer (Bars jump mit Bass)

```typescript
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const AudioBars = ({ frequencies }: { frequencies: Uint8Array }) => {
  const groupRef = useRef();
  const barMeshes = useRef([]);
  
  useFrame(() => {
    // Update bar heights
    barMeshes.current.forEach((mesh, i) => {
      const frequency = frequencies[i] / 255;
      mesh.scale.y = 0.1 + frequency * 2; // 0.1 to 2.1
    });
  });
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: 32 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => barMeshes.current[i] = el}
          position={[(i - 16) * 0.5, 0, 0]}
          scale={[0.4, 1, 0.4]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial
            color={new THREE.Color().setHSL(i / 32, 1, 0.5)}
          />
        </mesh>
      ))}
    </group>
  );
};

const AudioVisualizerScene = () => {
  const [frequencies, setFrequencies] = useState(new Uint8Array(256));
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  useEffect(() => {
    // Setup Audio API
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    
    // Load audio file
    fetch('music.mp3')
      .then(r => r.arrayBuffer())
      .then(buf => audioContext.decodeAudioData(buf))
      .then(audioBuffer => {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        source.start(0);
        
        // Update loop
        const updateFrequencies = () => {
          const data = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(data);
          setFrequencies(data);
          requestAnimationFrame(updateFrequencies);
        };
        updateFrequencies();
      });
  }, []);
  
  return (
    <Canvas>
      <AudioBars frequencies={frequencies} />
    </Canvas>
  );
};
```

---

## Variante 4: Complex Reactive Shader

```glsl
// Shader, der auf Frequenzen reagiert

precision highp float;

uniform float uBassBand;
uniform float uMidBand;
uniform float uTrebleBand;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Distortion basierend auf Frequenzen
  float distortion = sin(uv.x * 10.0 + uBassBand * 5.0) * uMidBand;
  uv.y += distortion;
  
  // Zoom-Puls mit Bass
  uv *= mix(0.8, 1.2, uBassBand);
  
  // Farbige Rotation mit Treble
  float angle = uTrebleBand * 3.14159;
  float s = sin(angle);
  float c = cos(angle);
  uv = mat2(c, -s, s, c) * uv;
  
  // Pattern mit Mids
  float pattern = sin(uv.x * 20.0 + uTime) * cos(uv.y * 20.0 + uTime);
  float intensity = pattern * mix(0.5, 1.0, uMidBand);
  
  vec3 color = vec3(
    sin(intensity + uTrebleBand),
    sin(intensity + uBassBand + 2.0),
    sin(intensity + uMidBand + 4.0)
  );
  
  gl_FragColor = vec4(color, 1.0);
}
```

---

## Praktische Implementierung: Full-Stack Audio Visualization

```typescript
// App.tsx
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

type AudioVisMode = 'bars' | 'circle' | 'waveform' | 'shader';

const AudioVisualizationApp = () => {
  const [mode, setMode] = useState<AudioVisMode>('bars');
  const [frequencies, setFrequencies] = useState(new Uint8Array(256));
  const [bands, setBands] = useState({
    bass: 0,
    lowMid: 0,
    mid: 0,
    highMid: 0,
    treble: 0
  });
  
  useEffect(() => {
    const setupAudio = async () => {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      // Nutzer-Mikrofon OR Audio-Datei
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContext.createMediaStreamAudioSource(stream);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      const updateLoop = () => {
        const freqData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(freqData);
        setFrequencies(freqData);
        setBands(extractBands(freqData));
        requestAnimationFrame(updateLoop);
      };
      
      updateLoop();
    };
    
    setupAudio();
  }, []);
  
  return (
    <div className="audio-vis-app">
      <div className="controls">
        <button onClick={() => setMode('bars')}>Bars</button>
        <button onClick={() => setMode('circle')}>Circle</button>
        <button onClick={() => setMode('waveform')}>Waveform</button>
      </div>
      
      <Canvas>
        {mode === 'bars' && <AudioBars frequencies={frequencies} />}
        {mode === 'circle' && <AudioCircle bands={bands} />}
        {mode === 'waveform' && <AudioWaveform frequencies={frequencies} />}
      </Canvas>
      
      {/* Debug Info */}
      <div className="debug">
        <p>Bass: {bands.bass.toFixed(2)}</p>
        <p>Mid: {bands.mid.toFixed(2)}</p>
        <p>Treble: {bands.treble.toFixed(2)}</p>
      </div>
    </div>
  );
};
```

---

## Performance-Tipps

```typescript
// FFT Size Impact
analyser.fftSize = 256;   // Schnell, aber weniger Frequenz-Detail
analyser.fftSize = 512;   // Balanced
analyser.fftSize = 2048;  // Langsam, aber sehr detailliert

// Smoothing
analyser.smoothingTimeConstant = 0.85; // 0-1, höher = smoother but laggy

// Downsampling Frequenzen
const downsampled = [];
for (let i = 0; i < frequencies.length; i += 2) {
  downsampled.push(frequencies[i]);
}
// Reduziert von 256 auf 128 Werte → schneller zu verarbeiten
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Keine Audio-Daten | Mikrofon-Permission fehlt | Prüfe `navigator.permissions` |
| Jittery Visualization | FFT zu schnell | Erhöhe `smoothingTimeConstant` |
| Audio crackling | Analyser zu CPU-teuer | Nutze weniger Frequencies (32 statt 256) |
| WebGL Canvas laggt | Zu viele Meshes | Nutze Instances oder Shader-Visualization |

---

## Advanced: Frequency-Triggered Particles

```typescript
const FrequencyParticles = ({ bands }: { bands: FrequencyBands }) => {
  const particlesRef = useRef();
  const positions = useRef(new Float32Array(1000 * 3));
  
  useFrame(() => {
    // Spawn particles based on bass kick
    if (bands.bass > 0.7) {
      for (let i = 0; i < 10; i++) {
        const idx = (Math.random() * 1000) * 3;
        positions.current[idx] = (Math.random() - 0.5) * 10;
        positions.current[idx + 1] = (Math.random() - 0.5) * 10;
        positions.current[idx + 2] = (Math.random() - 0.5) * 10;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.current.length / 3}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} />
    </points>
  );
};
```

---

## Quellen

- [Web Audio API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [AnalyserNode Documentation](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)
- [FFT Explained](https://en.wikipedia.org/wiki/Fast_Fourier_transform)
- [Remotion Audio API](https://www.remotion.dev/docs/audio)
- [Tone.js Library](https://tonejs.org/) (Alternative Audio Framework)
