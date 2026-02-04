# CSS Animationen vs. Remotion – Wann nutze ich was?

## Überblick: Entscheidungsmatrix

| Kontext | CSS | Remotion | JavaScript |
|---------|-----|----------|-----------|
| **Micro-Interactions** (Hover, Focus) | ✅ Ideal | ❌ Overkill | ⚠️ Möglich |
| **Scroll-Effekte** | ✅ Einfach | ❌ Falsch | ✅ Besser |
| **Video-Export** | ❌ Nein | ✅ Ideal | ❌ Nein |
| **Echtzeit 3D Animation** | ❌ Nein | ⚠️ Möglich | ✅ Besser |
| **Deterministische Frames** | ❌ Nein | ✅ Ja | ❌ Nein |
| **Performance-kritisch** | ✅ GPU | ⚠️ CPU/GPU | ❌ JS-Thread |

---

## CSS Animationen – Wann JA

### Use Case 1: UI-Feedback (Hover, Focus, Press)

**Optimal:** Kleine, schnelle Transitions auf Buttons, Links, Inputs.

```css
.button {
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: scale(1);
  opacity: 1;
}

.button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.button:active {
  transform: scale(0.95);
}
```

**Warum CSS:** GPU-beschleunigt, 60 FPS garantiert, minimal JS overhead.

### Use Case 2: Reveal-Animationen (beim Load)

```css
.hero-title {
  animation: slideInDown 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  opacity: 0;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Warum CSS:** Einfach deklarativ, skaliert zu tausenden Elementen.

### Use Case 3: Loading-Spinner / Laufende Animationen

```css
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Warum CSS:** Läuft ewig, kein JS overhead.

### Use Case 4: Scroll-basierte Animationen (einfach)

```css
.fade-in-on-scroll {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.fade-in-on-scroll.visible {
  opacity: 1;
}
```

```javascript
// JS nur für die Sichtbarkeitserkennung
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
  observer.observe(el);
});
```

**Warum CSS:** `transform` und `opacity` sind GPU-freundlich.

---

## CSS Animationen – Wann NEIN

### ❌ Problem 1: Layout-treibende Properties

**Zu vermeiden:**
```css
.sidebar {
  animation: slideIn 1s;
}

@keyframes slideIn {
  from { width: 0; }          /* ❌ Layout-Thrashing! */
  to { width: 250px; }
}
```

**Besser mit transform:**
```css
.sidebar {
  animation: slideIn 1s;
  transform-origin: left;
}

@keyframes slideIn {
  from { transform: scaleX(0); }  /* ✅ GPU-freundlich */
  to { transform: scaleX(1); }
}
```

### ❌ Problem 2: Komplexe, zustandsabhängige Motion

```css
/* ❌ CSS kann nicht reagieren auf Nutzer-Input mitten in der Animation */
.complex-animation {
  animation: complex-motion 5s;
}

/* Was wenn User klickt während Animation läuft?
   CSS kann nicht einfach "unterbrechen" oder "reverse" */
```

**Besser mit JavaScript (Framer Motion / GSAP):**
```javascript
const controls = useAnimation();

const handleClick = async () => {
  // Interruptible Animation
  await controls.start({ y: 100, transition: { duration: 0.3 } });
};
```

### ❌ Problem 3: Kalibrierte Physik-Animationen

```css
/* ❌ CSS Spring-Animationen sind approximativ, nicht physikalisch genau */
@keyframes bounce {
  0% { transform: translateY(0); }
  25% { transform: translateY(-50px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}
```

**Besser mit React Spring / Remotion spring():**
```typescript
import { spring } from 'remotion';

const bounceY = spring({
  fps: 30,
  config: { damping: 0.8, mass: 1, stiffness: 100 },
  delay: 0,
});
// Echte, kontrollierbare Federphysik
```

### ❌ Problem 4: Video-Export / Deterministische Frames

```css
/* ❌ CSS-Animationen sind browser-basiert, nicht exportierbar */
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Du kannst das nicht als MP4 exportieren.**

**Besser mit Remotion:**
```typescript
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 60], [0, 1]);

return <div style={{ opacity }} />;
```

---

## Remotion – Wann JA

### Use Case 1: Video-Content

**Optimal:** Wenn du ein Video (MP4/WebM) exportieren musst.

```typescript
import { Composition, useCurrentFrame, interpolate } from 'remotion';

const VideoComposition = () => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 300], [0, Math.PI * 2]);
  
  return <div style={{ transform: `rotate(${rotation}rad)` }} />;
};

export const Root = () => (
  <Composition
    id="MyVideo"
    component={VideoComposition}
    durationInFrames={300}
    fps={30}
    width={1920}
    height={1080}
  />
);
```

**Ergebnis:** Deterministische, Frame-perfekte Animation, exportierbar zu H.264.

### Use Case 2: Hochwertige Effekte (3D, Post-Processing)

```typescript
const HighEndScene = () => (
  <Canvas>
    <mesh>
      <boxGeometry />
      <meshTransmissionMaterial />  {/* Glas + Refraktion */}
    </mesh>
    
    <EffectComposer>
      <Bloom intensity={0.8} />
      <DepthOfField focusDistance={0.5} />
    </EffectComposer>
  </Canvas>
);
```

**Warum Remotion:** Cloud-Rendering auf AWS Lambda ist praktisch unmöglich mit Browser-Animationen.

### Use Case 3: Animationen, die Millionen Frames brauchen

```typescript
// 10 Minuten Video @ 30 FPS = 18.000 Frames
// Das in CSS zu definieren = unmöglich
// Mit Remotion: interpolate(frame, [0, 18000], [...])
```

### Use Case 4: Deterministische Motion Design (Motion Graphics)

```typescript
const MotionGraphics = () => {
  const frame = useCurrentFrame();
  
  // Jeder Frame ist EXAKT reproduzierbar
  const position = interpolate(frame, [0, 300], [-100, 100]);
  const scale = spring({ frame, config: { damping: 0.8 } });
  
  return (
    <div style={{
      transform: `translateX(${position}px) scale(${scale})`
    }} />
  );
};
```

---

## JavaScript-Animationen (Framer Motion, GSAP) – Wann?

### Use Case 1: Interaktive, zustandsabhängige Motion

```typescript
import { motion } from 'framer-motion';

const InteractiveButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  return (
    <motion.button
      animate={{
        scale: isClicked ? 1.2 : 1,
        rotate: isClicked ? 360 : 0
      }}
      transition={{ type: 'spring', stiffness: 100 }}
      onClick={() => setIsClicked(!isClicked)}
    >
      Click Me
    </motion.button>
  );
};
```

**Warum JS:** Kann auf User-Interaction reagieren, Animationen unterbrechen/reversal.

### Use Case 2: Scroll-getriebene komplexe Animationen

```typescript
import { useScroll, useTransform, motion } from 'framer-motion';

const ScrollParallax = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -500]);
  
  return <motion.div style={{ y }} />;
};
```

**Warum JS:** Echtzeit-Reaktion auf Scroll-Position, nicht möglich mit CSS allein.

### Use Case 3: Chained Sequencing (mehrere Animationen nacheinander)

```typescript
import { motion } from 'framer-motion';

const Sequence = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ staggerChildren: 0.1 }}
  >
    {[1, 2, 3].map((i) => (
      <motion.div key={i} initial={{ y: 20 }} animate={{ y: 0 }} />
    ))}
  </motion.div>
);
```

---

## Praktische Entscheidungsbaum

```
Start: "Ich will eine Animation"
  │
  ├─ "Ist es für einen Video-Export?"
  │  ├─ JA → Nutze Remotion
  │  └─ NEIN → Weiter
  │
  ├─ "Braucht sie Echtzeit-Nutzer-Interaktion?"
  │  ├─ JA (Hover, Klick, Scroll) → Nutze JS/Framer Motion
  │  └─ NEIN → Weiter
  │
  ├─ "Läuft sie nur auf Page-Load?"
  │  ├─ JA, einfache Fade/Slide → Nutze CSS
  │  └─ NEIN → Weiter
  │
  ├─ "Braucht sie komplexe Physik oder Timing?"
  │  ├─ JA → Nutze JavaScript (GSAP/Remotion)
  │  └─ NEIN → Nutze CSS
  │
  └─ "Betrifft sie nur transform/opacity?"
     ├─ JA → CSS ist performant
     └─ NEIN (width, height, etc.) → JS oder Remotion
```

---

## Real-World Scenario: Hero-Animation

### Szenario: Hochwertige Hero-Section mit Effekten

**Anforderungen:**
- Hochwertige Visuals (Glas, Refraktion, Post-Processing)
- Scroll-Effekte (Focus wandert)
- Video-Export für Social Media
- Echtzeit-Web-Version (mit Fallback auf Mobile)

**Lösung: Hybrid-Ansatz**

```
┌─────────────────────────────────┐
│ REMOTION (Offline)              │
├─────────────────────────────────┤
│ • Caustics + Transmission       │
│ • Full Post-Processing          │
│ • 4K @ 60 FPS                   │
│ • Export: hero-4k.mp4           │
└─────────────────────────────────┘
           ↓
      [Cloud Render]
      AWS Lambda
      ~2 Stunden Renderzeit
           ↓
┌─────────────────────────────────┐
│ WEB (Echtzeit)                  │
├─────────────────────────────────┤
│ High-End: HTML5 Video + CSS DoF │
│ Medium: Pre-rendered MP4 + Scroll JS
│ Low: Static Image + CSS Fade    │
└─────────────────────────────────┘
```

**Code-Beispiel:**

```typescript
// Remotion: hero-video.tsx
export const HeroVideoComposition = () => {
  const frame = useCurrentFrame();
  
  return (
    <Canvas>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshTransmissionMaterial
          ior={1.5}
          thickness={1}
          roughness={0.1}
        />
      </mesh>
      
      <EffectComposer>
        <Bloom intensity={1.2} />
        <DepthOfField focusDistance={0.5} />
        <FilmGrain grain={0.1} animate={true} />
      </EffectComposer>
    </Canvas>
  );
};

// Web: HeroSection.tsx
const HeroSection = () => {
  const [tier, setTier] = useState('high');
  
  return (
    <section className="hero" data-performance-tier={tier}>
      {tier === 'high' && (
        <video src="/hero-4k.mp4" autoPlay muted loop playsInline />
      )}
      {tier === 'medium' && (
        <video src="/hero-1080p.mp4" autoPlay muted loop playsInline />
      )}
      {tier === 'low' && (
        <img src="/hero-static.jpg" alt="Hero" />
      )}
      
      {/* CSS-Animationen für Overlay-Effekte */}
      <div className="scroll-dof-effect" />
    </section>
  );
};
```

---

## Performance-Vergleich

| Methode | Setup-Zeit | Renderzeit | Dateigröße | Browser-Perf |
|---------|-----------|-----------|-----------|-------------|
| **CSS Only** | 5 min | N/A | 0 KB | ⚡⚡⚡ 60 FPS |
| **JS (Framer)** | 30 min | N/A | ~50 KB | ⚡⚡ 45 FPS |
| **Remotion Export** | 1-2 Tage | 2-10 Std | 20-100 MB | ⚡⚡⚡ (Video playback) |
| **WebGL Realtime** | 2-3 Tage | N/A | ~200 KB JS | ⚡ 30-45 FPS |

---

## Checkliste: Wann welche Technologie?

### CSS Animationen
- [ ] Nur für UI-Feedback/Hover/Press?
- [ ] Nur `transform` und `opacity`?
- [ ] Lädt nicht länger als 5 Sekunden?
- [ ] Soll nicht interruptible sein?
- [ ] Keine externen Daten-Abhängigkeiten?

→ **Ja zu allen?** → CSS ist perfekt.

### JavaScript (Framer Motion / GSAP)
- [ ] Braucht Nutzer-Interaktion?
- [ ] Komplexe Sequenzen?
- [ ] Scroll-getrieben?
- [ ] Nicht für Video-Export?

→ **Ja zu mehreren?** → JavaScript-Animation library.

### Remotion
- [ ] Video-Export erforderlich?
- [ ] Hochwertige 3D-Effekte?
- [ ] Frame-genaue Kontrolle?
- [ ] Cloud-Rendering nötig?
- [ ] Motion Graphics / Motion Design?

→ **Ja zu mehreren?** → Remotion!

---

## Quellen

- [MDN: CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Docs](https://gsap.com/)
- [Remotion Docs](https://www.remotion.dev/docs)
- [WebGL Performance](https://www.khronos.org/webgl/wiki/Main_Page)
