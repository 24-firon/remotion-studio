# Learning: True Gradients in Three.js Environments

## The Problem

Standard `@react-three/drei` components like `<Lightformer>` are restricted to single `color` and `intensity` inputs.
When a user asks for "Gradients" or "Farbverläufe", the common workaround is to stack multiple Lightformers of decreasing size (concentric stacking).
**User Feedback:** "Das sind nur Flächen, kein echter Verlauf." (User sees the banding/steps).

## The Solution: Custom Shader Meshes

Instead of using `<Lightformer>`, use a standard `<mesh>` inside the `<Environment>` component.
The `<Environment>` component simply renders whatever children it contains into a CubeCamera.

### Technique

1.  **Geometry**: Use `PlaneGeometry` or `CircleGeometry` (or custom shapes).
2.  **Material**: Use `shaderMaterial` to mathematically generate gradients.

```javascript
// Example 3-Stop Gradient Shader
const GradientMaterial = shaderMaterial(
  { colorStart, colorMid, colorEnd },
  // vertex shader...
  // fragment shader using mix() based on UVs...
);
```

### Benefits

1.  **Infinite Smoothness**: GLSL interpolates colors per pixel. No banding.
2.  **Performance**: One mesh vs. 10+ stacked Lightformers.
3.  **Flexibility**: Can add Noise, Distortion, or Image Textures easily.

## Image Projection

If the user wants to project an image:

1.  Load texture (`useLoader(TextureLoader, url)`).
2.  Apply to `MeshBasicMaterial` on a plane inside `<Environment>`.
3.  Set `toneMapped={false}` to allow HDRI-like intensity control.
