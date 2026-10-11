# System Specification: Camera Systems

Standards for virtual filmmaking in Remotion 3D scenes.

### 1. Camera Movement Types

| Type      | Description                 | Use Case         |
| --------- | --------------------------- | ---------------- |
| **Orbit** | Circular move around object | Product Showcase |
| **Dolly** | Forward/Backward            | Detail Zoom      |
| **Truck** | Sideways move               | Parallax         |
| **Crane** | Vertical move               | Dramatic Reveal  |
| **Drift** | Subtle floating             | "Alive" Scene    |

### 2. Spring-based Camera

```typescript
import { spring, useCurrentFrame } from "remotion";

const cameraPosition = spring({
  frame,
  fps: 60,
  config: {
    damping: 200, // Smooth, no bounce
    stiffness: 50, // Slow
    mass: 1,
  },
});
```

### 3. Drift Mandate

> Every scene MUST have subtle self-movement.
> A static frame looks like an error.

```typescript
// Minimal drift for "life"
const drift = Math.sin(frame * 0.01) * 0.02;
camera.position.x += drift;
```
