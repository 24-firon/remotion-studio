# 4. WEBSITE-SIMULATION & BROWSER-RENDERING in Remotion

**Dokumentversion:** 1.0 | Januar 2026

## Das Kernproblem: HTML auf 3D-Oberflächen

Traditionelle Videoproduktion kann HTML/CSS nicht nativ rendern. Remotion löst dies durch:

1. **HTML zu Canvas konvertieren** (via Chrome Headless)
2. **Canvas als Textur in WebGL nutzen** (Three.js Material)
3. **SyncrOn mit Frame-Timeline** (determinstisch)

## Architektur: Website → Video-Textur → 3D-Surface

```
┌─────────────────────────────────────┐
│  React Component (Tailwind CSS v4)  │
│  (z.B. Dashboard, Marketing Site)  │
└──────────────┬──────────────────────┘
               │
        ┌──────▼─────────┐
        │ Chrome Headless│
        │  Browser       │
        │  (Screenshot)  │
        └──────┬─────────┘
               │
        ┌──────▼──────────┐
        │ Canvas/Texture  │
        └──────┬──────────┘
               │
        ┌──────▼──────────────────┐
        │ Three.js Material.map   │
        │ (MeshStandardMaterial)  │
        └──────┬──────────────────┘
               │
        ┌──────▼────────────────┐
        │ Rendered Frame        │
        │ @ 60 FPS deterministic│
        └───────────────────────┘
```

## Methode 1: React Komponente direkt in Remotion rendern

Das einfachste Szenario: HTML-Komponente wird direkt gerendert (keine 3D-Textur).

```typescript
// src/components/SimpleDashboard.tsx
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const SimpleDashboard = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 30], [0.8, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      className="w-full h-full bg-gradient-to-br from-slate-900 to-black flex items-center justify-center"
      style={{
        opacity,
        transform: `scale(${scale})`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Dashboard Analytics</h1>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Revenue', value: '$124.5K' },
            { label: 'Users', value: '24,842' },
            { label: 'Conversion', value: '3.24%' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800 p-6 rounded-lg">
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className="text-white text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

Dies wird direkt als Video gerendert (keine 3D-Komplexität).

## Methode 2: Website auf 3D-Oberfläche mappen

Dies ist die **advanced Variante** für echte Virtual Production.

### Schritt 1: Website als separate Remotion-Composition

```typescript
// src/compositions/WebsiteContent.tsx
import React from 'react';
import { Composition } from 'remotion';
import { SimpleDashboard } from '../components/SimpleDashboard';

export const WebsiteComposition = () => {
  return (
    <Composition
      id="website-content"
      component={SimpleDashboard}
      durationInFrames={300}
      fps={60}
      width={1920}
      height={1080}
    />
  );
};
```

### Schritt 2: Website als Video-Textur in 3D-Szene

```typescript
// src/components/3D/MacBookDisplay.tsx
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useVideoTexture } from '@react-three/drei';

export const MacBookDisplay = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Lade gerendertes Website-Video als Textur
  const texture = useVideoTexture('/videos/website-content.mp4');

  return (
    <group>
      {/* MacBook Bezel */}
      <mesh>
        <boxGeometry args={[1, 0.625, 0.05]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Display (mit Website-Video als Textur) */}
      <mesh ref={meshRef} position={[0, 0, 0.03]}>
        <planeGeometry args={[0.95, 0.595]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ffffff"
          emissiveIntensity={0.1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};
```

**Problem:** Das Website-Video ist bereits gerendert. Für **echte Determinismus** brauchst du einen anderen Approach.

### Schritt 3: Offscreen-Rendering (React zur Laufzeit)

Diese Lösung rendert React-Komponenten **offscreen** als Canvas und nutzt diese als Textur:

```typescript
// src/utils/offscreenRenderer.ts
import { renderToString } from 'react-dom/server';
import { createCanvas } from 'canvas';
import React from 'react';

/**
 * Rendert React-Komponente zu Canvas-Textur
 * Wichtig: Nur für Remotion-Rendering nutzbar!
 */
export const renderReactToTexture = async (
  Component: React.ComponentType,
  width: number = 1920,
  height: number = 1080
): Promise<HTMLCanvasElement> => {
  // Node.js Canvas (nicht Browser Canvas!)
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Rendere HTML-String
  const html = renderToString(<Component />);

  // Nutze Playwright/Puppeteer um HTML zu rendern
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.setContent(html);
  const screenshot = await page.screenshot();

  return canvas;
};
```

**Besser: Nutze `@remotion/renderer` mit `renderMedia()`**

```typescript
// Rendere Remotion Composition zu Video/Canvas
import { renderMedia } from '@remotion/renderer';

const renderWebsiteContent = async () => {
  const videoPath = 'website-content.mp4';

  await renderMedia({
    composition: {
      id: 'website-content',
      component: SimpleDashboard,
      durationInFrames: 300,
      fps: 60,
      width: 1920,
      height: 1080,
    },
    outputLocation: videoPath,
    codec: 'h264',
  });

  return videoPath;
};
```

## Methode 3: Live-Rendering während Video-Produktion

Dies ist die **flexibelste Lösung** (aber auch komplexeste):

```typescript
// src/scenes/LiveWebsiteScene.tsx
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useCurrentFrame } from 'remotion';

export const LiveWebsiteScene = () => {
  const { scene, camera, renderer } = useThree();
  const frame = useCurrentFrame();
  const [canvasTexture, setCanvasTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    // Erstelle HTML-Canvas für Website-Rendering
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Rendere HTML-Inhalt auf Canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1920, 1080);

    // Text rendern
    ctx.fillStyle = '#ffffff';
    ctx.font = '48px Arial';
    ctx.fillText(`Frame: ${frame}`, 50, 100);

    // Erstelle Three.js Textur aus Canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    setCanvasTexture(texture);
  }, [frame]);

  useFrame(() => {
    if (canvasTexture) {
      canvasTexture.needsUpdate = true;
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[1.6, 0.9]} />
      <meshStandardMaterial map={canvasTexture} />
    </mesh>
  );
};
```

## Website-Scroll Simulieren

Für realistische Mockups musst du Scroll-Animationen simulieren:

```typescript
// src/components/ScrollingWebsite.tsx
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const ScrollingWebsite = ({ totalHeight = 5000 }: { totalHeight?: number }) => {
  const frame = useCurrentFrame();

  // Simuliere Scroll (0 bis totalHeight über 300 Frames)
  const scrollY = interpolate(frame, [0, 300], [0, totalHeight], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className="w-full h-screen bg-gradient-to-br from-slate-900 to-black overflow-hidden"
      style={{
        transform: `translateY(-${scrollY}px)`,
      }}
    >
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <h1 className="text-5xl font-bold text-white">Welcome</h1>
      </section>

      {/* Features Section */}
      <section className="h-screen bg-slate-800 flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-bold text-white mb-8">Features</h2>
        <div className="grid grid-cols-3 gap-8">
          {['Speed', 'Reliability', 'Scale'].map((feature) => (
            <div key={feature} className="bg-slate-700 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-white">{feature}</h3>
              <p className="text-slate-300 mt-2">Lorem ipsum dolor sit amet</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Pricing</h2>
          <p className="text-slate-300">Flexible plans for every business</p>
        </div>
      </section>
    </div>
  );
};
```

## Browser-UI Simulation (Chrome/Safari Frame)

```typescript
// src/components/BrowserFrame.tsx
import React from 'react';

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  browserType?: 'chrome' | 'safari';
}

export const BrowserFrame = ({
  children,
  url = 'https://example.com',
  browserType = 'chrome',
}: BrowserFrameProps) => {
  return (
    <div className="bg-gray-300 rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/10' }}>
      {/* Browser Header */}
      <div className="bg-gray-200 px-4 py-2 flex items-center gap-2 border-b border-gray-300">
        {/* Traffic Lights (macOS Style) */}
        {browserType === 'chrome' && (
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        )}

        {/* Address Bar */}
        <div className="flex-1 ml-4 bg-white rounded px-3 py-1 text-xs text-gray-600">
          {url}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>
    </div>
  );
};
```

## Integration: Website im Device-Mockup

```typescript
// src/scenes/WebsiteMockupScene.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollingWebsite } from '../components/ScrollingWebsite';
import { BrowserFrame } from '../components/BrowserFrame';
import { MacBookDisplay } from '../components/3D/MacBookDisplay';
import { CinematicCamera } from '../components/3D/VirtualCamera';

export const WebsiteMockupScene = () => {
  return (
    <>
      {/* 3D-Scene mit MacBook */}
      <Canvas style={{ width: '100%', height: '100%' }}>
        <CinematicCamera />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <MacBookDisplay />
      </Canvas>

      {/* Website-Inhalt (renderiert als Textur) */}
      <div style={{ display: 'none' }}>
        <BrowserFrame>
          <ScrollingWebsite totalHeight={5000} />
        </BrowserFrame>
      </div>
    </>
  );
};
```

## Performance & Determinismus

### Probleme bei Website-Rendering

1. **Async Fonts:** Custom Fonts können nicht vollständig geladen sein
   - **Lösung:** Web Fonts preload, oder system fonts verwenden

2. **Image Loading:** Bilder laden asynchron
   - **Lösung:** Inline SVG/Data URLs statt externe Images

3. **Animation/JavaScript:** CSS Animations sind nicht-determinstisch
   - **Lösung:** Deaktiviere alle CSS `animation` und nutze `transform` mit `useCurrentFrame`

### Best Practices

```typescript
// ❌ FALSCH: Non-deterministic
export const BadDashboard = () => {
  return (
    <div className="animate-spin">
      {/* CSS Animation ist nicht frame-gebunden */}
    </div>
  );
};

// ✓ RICHTIG: Determinstisch
export const GoodDashboard = () => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 300], [0, Math.PI * 2]);

  return (
    <div style={{ transform: `rotate(${rotation}rad)` }}>
      {/* Frame-gebundene Rotation */}
    </div>
  );
};
```

## Chrome Headless Shell Optimierungen

```typescript
// remotion.config.ts
import { Config } from '@remotion/cli/config';

Config.setChromeMode('headless-shell'); // Schneller für CPU-bound Tasks
// oder
Config.setChromeMode('chrome-for-testing'); // Schneller für GPU-bound Tasks (Linux)

Config.setChromiumHeadlessMode(true); // Headless (kein UI)
Config.setConcurrency(8); // Parallele Prozesse
```

## Praktisches Beispiel: SaaS Dashboard Video

```typescript
// src/scenes/SaasDashboardVideo.tsx
import React from 'react';
import { Sequence, useCurrentFrame, interpolate } from 'remotion';

const Dashboard = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const slideUp = interpolate(frame, [30, 60], [50, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      className="w-full h-full bg-slate-900 text-white p-8"
      style={{
        opacity: fadeIn,
        transform: `translateY(${slideUp}px)`,
      }}
    >
      <h1 className="text-4xl font-bold mb-8">Your Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: 'Revenue', value: '$124.5K', change: '+12.5%' },
          { title: 'Users', value: '24,842', change: '+8.3%' },
          { title: 'Conversion', value: '3.24%', change: '+0.2%' },
          { title: 'AOV', value: '$156.23', change: '+4.1%' },
        ].map((metric, idx) => {
          const itemDelay = 60 + idx * 15;
          const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 30], [0, 1], {
            extrapolateLeft: 'clamp',
          });

          return (
            <div
              key={metric.title}
              className="bg-slate-800 p-6 rounded-lg"
              style={{ opacity: itemOpacity }}
            >
              <p className="text-slate-400 text-sm">{metric.title}</p>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className="text-green-400 text-sm mt-2">{metric.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SaaSDashboardVideo = () => {
  return <Dashboard />;
};
```

Dies ist die Grundlage für professionelle SaaS-Produkt-Demos!
