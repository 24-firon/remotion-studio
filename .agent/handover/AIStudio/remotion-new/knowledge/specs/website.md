# System Specification: Website Simulation

Render websites as textures on 3D objects.

### 1. Architecture

```
Next.js/HTML Website
    ↓
Chrome Headless Screenshot/Video
    ↓
Texture (PNG/MP4)
    ↓
Three.js PlaneGeometry + MeshStandardMaterial
    ↓
Mapped onto 3D Device
```

### 2. Determinism Requirement

- No `Date.now()` or Live Data.
- All content must be static or pre-calculated.
- Frame-Perfect Reproducibility.

### 3. Texture-Mapping Pattern

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
