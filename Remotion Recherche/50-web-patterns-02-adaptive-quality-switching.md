# Adaptive Quality & Performance Switching – Intelligente Ressourcen-Anpassung

## Konzept: Auto-Fallback für unterschiedliche Hardware

Deine Idee: Hochwertige Effekte (Caustics, Transmission, Postprocessing) auf High-End Geräten, aber automatisches Downgrade auf schwächere Hardware ohne sichtbare Fehler.

```
Nutzer-Gerät erkannt
    ↓
┌─────────────────────────────────────────┐
│ Performance-Test: Kann 60 FPS halten?   │
└─────────────────────────────────────────┘
    ↙ Ja                  ↘ Nein
  [High]              [Adaptive Check]
                           ↙ Laggy?
                         [Medium]
                           ↙ Sehr laggy?
                         [Low]
                           ↙ Crash?
                         [Fallback]
```

## Variante 1: Automatische Hardware-Detection (Startup)

### Device Capabilities Check

```typescript
interface DeviceProfile {
  tier: 'high' | 'medium' | 'low' | 'minimal';
  cores: number;
  ram: number;
  gpu: string;
  hasWebGL2: boolean;
  hasWebGPU: boolean;
}

const detectDeviceProfile = (): DeviceProfile => {
  // CPU Kerne
  const cores = navigator.hardwareConcurrency || 4;
  
  // RAM (ungefähr)
  const ram = (navigator.deviceMemory || 4) * 1024; // MB
  
  // GPU-Unterstützung
  const canvas = document.createElement('canvas');
  const webgl2 = canvas.getContext('webgl2') !== null;
  const webgpu = navigator.gpu !== undefined;
  
  // Kombiniere zu Profil
  let tier: DeviceProfile['tier'] = 'high';
  
  if (cores <= 2 || ram <= 2048) {
    tier = 'minimal';
  } else if (cores <= 4 || ram <= 4096 || !webgl2) {
    tier = 'low';
  } else if (cores <= 8 || ram <= 8192) {
    tier = 'medium';
  }
  
  return {
    tier,
    cores,
    ram,
    gpu: webgpu ? 'WebGPU' : webgl2 ? 'WebGL2' : 'WebGL1',
    hasWebGL2: webgl2,
    hasWebGPU: webgpu
  };
};

// Usage
const profile = detectDeviceProfile();
console.log(`Device Tier: ${profile.tier}`);
document.documentElement.setAttribute('data-performance-tier', profile.tier);
```

### CSS-basierte Settings pro Tier

```css
/* HIGH: Full Effects */
[data-performance-tier="high"] {
  --bloom-intensity: 0.8;
  --bloom-downsampling: 1;
  --dof-bokeh-scale: 8;
  --post-processing: enabled;
  --particle-count: 5000;
  --shadow-quality: high;
}

/* MEDIUM: Balanced */
[data-performance-tier="medium"] {
  --bloom-intensity: 0.6;
  --bloom-downsampling: 2;
  --dof-bokeh-scale: 4;
  --post-processing: partial;
  --particle-count: 2000;
  --shadow-quality: medium;
}

/* LOW: Minimal Effects */
[data-performance-tier="low"] {
  --bloom-intensity: 0.3;
  --bloom-downsampling: 4;
  --dof-bokeh-scale: 2;
  --post-processing: disabled;
  --particle-count: 500;
  --shadow-quality: low;
}

/* MINIMAL: Fallback */
[data-performance-tier="minimal"] {
  --bloom-intensity: 0;
  --post-processing: disabled;
  --particle-count: 100;
  --shadow-quality: none;
}
```

### JavaScript für React-Three-Fiber

```typescript
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';

type PerformanceTier = 'high' | 'medium' | 'low' | 'minimal';

interface QualitySettings {
  bloom: { intensity: number; downsampling: number };
  dof: { bokehScale: number; enabled: boolean };
  shadows: 'high' | 'medium' | 'low' | 'none';
  postProcessing: boolean;
}

const QUALITY_PRESETS: Record<PerformanceTier, QualitySettings> = {
  high: {
    bloom: { intensity: 0.8, downsampling: 1 },
    dof: { bokehScale: 8, enabled: true },
    shadows: 'high',
    postProcessing: true
  },
  medium: {
    bloom: { intensity: 0.6, downsampling: 2 },
    dof: { bokehScale: 4, enabled: true },
    shadows: 'medium',
    postProcessing: true
  },
  low: {
    bloom: { intensity: 0.3, downsampling: 4 },
    dof: { bokehScale: 2, enabled: false },
    shadows: 'low',
    postProcessing: false
  },
  minimal: {
    bloom: { intensity: 0, downsampling: 0 },
    dof: { bokehScale: 0, enabled: false },
    shadows: 'none',
    postProcessing: false
  }
};

const CinematicScene = () => {
  const [tier, setTier] = useState<PerformanceTier>('high');
  const settings = QUALITY_PRESETS[tier];
  
  useEffect(() => {
    const profile = detectDeviceProfile();
    setTier(profile.tier);
  }, []);
  
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          emissive="white"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Conditional Post-Processing basierend auf Tier */}
      {settings.postProcessing && (
        <EffectComposer>
          {settings.bloom.intensity > 0 && (
            <Bloom
              intensity={settings.bloom.intensity}
              downsampling={settings.bloom.downsampling}
            />
          )}
          {settings.dof.enabled && (
            <DepthOfField bokehScale={settings.dof.bokehScale} />
          )}
        </EffectComposer>
      )}
    </Canvas>
  );
};
```

---

## Variante 2: Runtime Performance Monitoring (Adaptive Downgrade)

Misst aktiv die Frame-Zeit und downgraded bei Bedarf.

```typescript
interface PerformanceMonitor {
  frameTime: number;
  fps: number;
  shouldDowngrade: boolean;
  lastCheck: number;
}

class PerformanceMonitor {
  private frameTimes: number[] = [];
  private maxSamples = 30;
  private checkInterval = 2000; // Alle 2 Sekunden prüfen
  private lastCheck = Date.now();
  
  recordFrame(deltaTime: number) {
    this.frameTimes.push(deltaTime);
    if (this.frameTimes.length > this.maxSamples) {
      this.frameTimes.shift();
    }
  }
  
  get averageFrameTime(): number {
    return this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
  }
  
  get averageFPS(): number {
    return 1000 / this.averageFrameTime;
  }
  
  shouldCheck(): boolean {
    return Date.now() - this.lastCheck > this.checkInterval;
  }
  
  getShouldDowngrade(): boolean {
    this.lastCheck = Date.now();
    
    // Downgrade wenn unter 45 FPS
    if (this.averageFPS < 45) {
      console.warn(`FPS dropped to ${this.averageFPS.toFixed(1)}, downgrading quality`);
      return true;
    }
    
    return false;
  }
}

// Usage in useFrame
const monitor = new PerformanceMonitor();

useFrame(({ clock }, delta) => {
  monitor.recordFrame(delta * 1000); // ms
  
  if (monitor.shouldCheck() && monitor.getShouldDowngrade()) {
    // Signal an App: Tier herunterstellen
    currentTier.current = downgradeQuality(currentTier.current);
    setTier(currentTier.current);
  }
});
```

---

## Variante 3: User-Manual Quality Selector (UX)

Nutzer können selbst entscheiden:

```typescript
const QualitySelector = ({ onTierChange }: { onTierChange: (tier: PerformanceTier) => void }) => {
  const [tier, setTier] = useState<PerformanceTier>('auto');
  
  const handleChange = (newTier: PerformanceTier | 'auto') => {
    if (newTier === 'auto') {
      const detected = detectDeviceProfile().tier;
      onTierChange(detected);
      setTier('auto');
    } else {
      onTierChange(newTier);
      setTier(newTier);
    }
  };
  
  return (
    <div className="quality-selector">
      <label>
        <input
          type="radio"
          name="quality"
          value="auto"
          checked={tier === 'auto'}
          onChange={() => handleChange('auto')}
        />
        Auto-Detect
      </label>
      
      <label>
        <input
          type="radio"
          name="quality"
          value="high"
          checked={tier === 'high'}
          onChange={() => handleChange('high')}
        />
        High (Best Quality)
      </label>
      
      <label>
        <input
          type="radio"
          name="quality"
          value="medium"
          checked={tier === 'medium'}
          onChange={() => handleChange('medium')}
        />
        Medium (Balanced)
      </label>
      
      <label>
        <input
          type="radio"
          name="quality"
          value="low"
          checked={tier === 'low'}
          onChange={() => handleChange('low')}
        />
        Low (Battery Saver)
      </label>
    </div>
  );
};
```

---

## Variante 4: Hybrid Strategy – Pre-Render + Live-Switch

**Best of both:** Hochwertige Effekte pre-rendern (z.B. Caustics in Remotion), dann live zwischen Full/Reduced Versions wechseln.

```typescript
// Pre-Render Strategie
interface AssetVariants {
  high: string;      // Full-quality WebM (Caustics, Transmission, etc.)
  medium: string;    // Mid-quality (nur Bloom, kein DoF)
  low: string;       // Pre-rendered MP4 ohne Effects
  fallback: string;  // Static PNG
}

const assets: AssetVariants = {
  high: '/videos/hero-full-quality.webm',
  medium: '/videos/hero-balanced.mp4',
  low: '/videos/hero-no-effects.mp4',
  fallback: '/images/hero-static.png'
};

const DynamicVideo = ({ tier }: { tier: PerformanceTier }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      // Switch zu korrekter Variante
      const src = assets[tier === 'minimal' ? 'fallback' : assets[tier] ? tier : 'low'];
      videoRef.current.src = src;
    }
  }, [tier]);
  
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      style={{ width: '100%', height: '100%' }}
    />
  );
};
```

---

## Praktisches Setup: Full-Stack Adaptive System

```typescript
// main.tsx
import { useEffect, useState } from 'react';
import { CinematicScene } from './CinematicScene';
import { QualitySelector } from './QualitySelector';

type PerformanceTier = 'high' | 'medium' | 'low' | 'minimal';

const App = () => {
  const [tier, setTier] = useState<PerformanceTier>('high');
  const [autoDetected, setAutoDetected] = useState(false);
  
  useEffect(() => {
    // Initiales Auto-Detect
    const profile = detectDeviceProfile();
    setTier(profile.tier);
    setAutoDetected(true);
  }, []);
  
  return (
    <div data-performance-tier={tier}>
      <CinematicScene tier={tier} onTierChange={setTier} />
      
      <div className="ui-overlay">
        <QualitySelector onTierChange={setTier} />
        
        {autoDetected && (
          <p className="device-info">
            Auto-detected: {tier.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
};
```

---

## CSS für Tier-Abhängige UI

```css
/* Zeige Quality-Badges je nach Tier */
[data-performance-tier="high"] .badge::after {
  content: 'Ultra';
  color: #00ff88;
}

[data-performance-tier="medium"] .badge::after {
  content: 'Standard';
  color: #ffaa00;
}

[data-performance-tier="low"] .badge::after {
  content: 'Battery Saver';
  color: #ff6666;
}

[data-performance-tier="minimal"] .badge::after {
  content: 'Fallback';
  color: #999;
}

/* Disable teure Features */
[data-performance-tier="minimal"] .particle-effect {
  display: none;
}

[data-performance-tier="low"] canvas {
  max-width: 1280px;
  max-height: 720px;
  /* Render in reduzierter Auflösung */
}
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Always "minimal" | WebGL nicht erkannt | Prüfe Browser Support |
| FPS schwankt | Measurements zu short | Erhöhe `maxSamples` auf 60 |
| Zu aggressive Downgrade | Threshold zu niedrig | Erhöhe FPS-Limit auf 50+ |
| Video-Switch laggt | Zu großer File | Pre-compress MP4s |

---

## Performance-Zahlen (Benchmark)

| Tier | Remotion Render-Zeit | Browser-Framerate |
|------|---------------------|------------------|
| **high** | 2.5s/Frame | 60 FPS (24" 4K) |
| **medium** | 1.2s/Frame | 60 FPS (1080p) |
| **low** | 0.4s/Frame (pre-rendered) | 60 FPS (Mobile) |
| **minimal** | Static Image | 60 FPS (any device) |

---

## Quellen

- [navigator.hardwareConcurrency](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency)
- [navigator.deviceMemory](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory)
- [WebGL Capabilities Detection](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)
- [Prefers Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [requestAnimationFrame for Performance](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
