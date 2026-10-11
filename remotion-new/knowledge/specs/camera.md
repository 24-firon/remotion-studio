# Viron Specification: Camera Systems

- **Source**: Viron-Only (kein Äquivalent im globalen Skill)
- **Status**: Lokale Erweiterung
- **Relation**: Cinematic Virtual Production

---

## Viron Camera System

Standards für virtuelle Kameraführung in Remotion 3D-Szenen.

### 1. Kamera-Bewegungstypen

| Typ       | Beschreibung             | Use Case            |
| --------- | ------------------------ | ------------------- |
| **Orbit** | Kreisbewegung um Objekt  | Produkt-Showcase    |
| **Dolly** | Vor/Zurück-Bewegung      | Zoom-In auf Detail  |
| **Truck** | Seitliche Bewegung       | Parallax-Effekt     |
| **Crane** | Vertikale Bewegung       | Dramatischer Reveal |
| **Drift** | Subtile Schwebe-Bewegung | "Lebendige" Szene   |

### 2. Spring-basierte Kamera

```typescript
import { spring, useCurrentFrame } from "remotion";

const cameraPosition = spring({
  frame,
  fps: 60,
  config: {
    damping: 200, // Smooth, kein Bounce
    stiffness: 50, // Langsam
    mass: 1,
  },
});
```

### 3. Drift-Pflicht (Viron Law)

> Jede Viron-Szene MUSS eine subtile Eigenbewegung haben.
> Ein Standbild wirkt wie ein Fehler.

```typescript
// Minimaler Drift für "Leben"
const drift = Math.sin(frame * 0.01) * 0.02;
camera.position.x += drift;
```

---

_Viron Camera Specification v1.0 | 2026-01-29_
