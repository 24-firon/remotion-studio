# Learning: Lighting & Materials

## The "80% Grey" Rule (The Golden Mean)

**Constraint**: Avoid stark Black (`#000000`) and blown-out White (`#FFFFFF`).
**Goal**: A sophisticated, "marmoriert" (marbled) look with deep 3D complexity.

### Rules:

1.  **Base Tone**: The scene must feel like it is **80% Mid-Grey**.
2.  **Gradient Limits**:
    - Darkest Point: `#202020` (Dark Grey) - NEVER Black.
    - Mid Point: `#808080` (True Grey).
    - Highlight: `#E0E0E0` (Silver).
    - _Exception_: Tiny specular highlights can be White.
3.  **Coverage**: The environment must wrap the object. Gaps (black voids) are failures.

## Movement (Alive Scenes)

**Constraint**: Static scenes look like dead photos.
**Requirement**:

- **Environment Rotation**: The room must slowly spin (`interpolate(frame, [0, 300], [0, Math.PI/2])`).
- **Element Float**: Individual walls/lights should gently float or drift.

## True Gradients

**Technique**: Use GLSL ShaderMaterials on Meshes inside Environment, NOT stacked Lightformers.
**Why**: Creates mathematically perfect smooth transitions without banding.
