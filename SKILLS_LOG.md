# Remotion Skills Analysis

## 1. Physics Engine (Springs)

Remotion uses a spring physics model (`spring()`) instead of duration-based easing for natural motion.

- **Config**: Defined by `mass`, `stiffness`, and `damping`.
- **Default**: `mass: 1, damping: 10, stiffness: 100` (bouncy).
- **Smooth**: `damping: 200` (no bounce).
- **determinism**: Springs are calculated per frame, ensuring 100% reproducibility at any FPS.

## 2. Interpolation

`interpolate(frame, [in], [out])` is the core mapping function.

- **Logic**: Maps the current frame number (linear time) to property values (opacity, transform, etc.).
- **Extrapolation**: `clamp` prevents values from exceeding the output range.
- **Easing**: Can be applied to the interpolation curve (e.g., `Easing.bezier`).

## 3. Audio Reactivity

`useAudioData()` provides frequency data for synchronization.

- Allows driving animation properties (scale, color) based on audio amplitude or frequency bands.

## Check: Springs vs CSS Transitions

**Why Springs?**

1.  **Frame-Independence**: CSS transitions calculate steps based on the browser's refresh rate and `Date.now()`. Remotion requires every frame (e.g., Frame 42) to be mathematically identical every time it renders, regardless of render speed.
2.  **Continuity**: Springs preserve velocity. If an animation is interrupted or retargeted, springs flow naturally, whereas CSS/Keyframes can jerk.
3.  **Physicality**: Parameters like "damping" and "stiffness" model real-world weight, making UI elements feel tactile.
