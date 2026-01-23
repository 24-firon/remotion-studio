# LEARNING: 3D Camera Control & Interaction vs. Rendering

**Date:** 2026-01-23
**Context:** User requested "Free Movement" (Orbit) while recording/filming the 3D Cube.
**Challenge:** Remotion is **deterministic** (Frame-by-Frame). Mouse movements during a `render` command are ignored because the render happens faster/slower than real-time and often headless.

## Solution 1: Development/Preview Mode (Interactive)

Use `OrbitControls` from `@react-three/drei`.

- **Effect:** You can drag/zoom with the mouse in the Browser Preview.
- **Limit:** When you render (`npx remotion render`), the camera stays static or jumpy, because no one is moving the mouse.

```typescript
// Good for Dev, Bad for Video
<ThreeCanvas>
  <OrbitControls enableZoom={true} />
  <Cube />
</ThreeCanvas>
```

## Solution 2: Production Mode (Cinematic Path)

Use `useCurrentFrame()` to calculate exact camera coordinates.

- **Effect:** Smooth, reproducible camera flights strings attached.
- **Benefit:** Looks professional ("Dolly Shot").

```typescript
const frame = useCurrentFrame();
const camX = interpolate(frame, [0, 100], [0, 10]); // Move camera
```

## Advanced Solution: "Ghost Recording" (The Bridge)

To have "Live Director" control in a rendered video:

1.  **Capture Phase:** Build a component that logs `camera.position` every frame to a JSON file while you play the preview in real-time.
2.  **Replay Phase:** The Renderer reads the JSON and sets the camera position for each frame exactly as you recorded it.

**Takeaway:**

- **OrbitControls** = Inspector / Debugging Tool.
- **Interpolation** = Professional Video Movement.
- **Ghost System** = Specialized Tool for customized flows.
