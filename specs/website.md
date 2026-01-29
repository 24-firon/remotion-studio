# Viron Specification: Website Simulation

- **Source**: Viron-Only (kein Äquivalent im globalen Skill)
- **Status**: Lokale Erweiterung
- **Relation**: HTML-Texturing für 3D-Mockups

---

## Website-zu-Textur Pipeline

Rendere Websites als Texturen auf 3D-Objekten (MacBook, iPhone, etc.).

### 1. Architektur

```
Next.js/HTML Website
    ↓
Chrome Headless Screenshot/Video
    ↓
Texture (PNG/MP4)
    ↓
Three.js PlaneGeometry + MeshStandardMaterial
    ↓
Auf 3D-Device gemappt
```

### 2. Determinismus-Anforderung

- Keine `Date.now()` oder Live-Daten
- Alle Inhalte müssen statisch oder vorberechnet sein
- Frame-Perfekte Reproduzierbarkeit

### 3. Texture-Mapping

```typescript
import { useVideoTexture } from '@react-three/drei';

const WebsiteOnDevice = () => {
  const texture = useVideoTexture('/rendered-website.mp4');

  return (
    <mesh>
      <planeGeometry args={[1.6, 0.9]} /> {/* 16:9 */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
```

---

_Viron Website Simulation v1.0 | 2026-01-29_
