# V43 Strategy: The "Nano-Banana" Texture Approach

## 1. Analysis of Failures (V41-V42)

### The "Parallel Lines" Problem

- **Diagnosis**: Even when I rotated objects (`rotation={[0, rotY, 0]}`), the _geometry_ (Rectangles/Ovals) was often aligned to the world grid (0, 90, 180 degrees).
- **Result**: The reflection lines on the button ran straight up/down or left/right.
- **Fix**: **Chaotic Tilt**.
  - Every single wall must have a random `x` and `z` rotation (e.g., `x: 15deg, z: -10deg`).
  - Never use `0` or `90` degrees.

### The "Banding / 3 Tones" Problem

- **Diagnosis**: My shader (`mix(ColorA, ColorB, uv.y)`) mathematically only creates a linear ramp. It looks "clean" but "fake" (plastic).
- **User Request**: "30 different grey tones", "Marmorierung" (Marbling).
- **Fix**: **Texture Mapping (The "Nano-Banana" Path)**.
  - Instead of calculating color in code, we generate **Complex High-Res Textures** (Images).
  - These images will contain the "30 shades of grey", smoke, clouds, and soft noise naturally.
  - We map these images onto the walls.

### The "Darkness" Problem

- **Diagnosis**: I placed walls with gaps between them. The gaps reflect as pure Black `#000000`.
- **Fix**: **360° Overlap**.
  - The walls must overlap slightly or be backed by a large cylinder so there is _never_ a gap.

---

## 2. The Plan (V43)

### Step 1: Generate Textures (Visuals)

I will use the image generator to create 3 source textures:

1.  `TEXTURE_SOFT_CLOUDS.png`: High-end studio smoke, 80% grey, soft white highlights.
2.  `TEXTURE_LIQUID_MARBLE.png`: Flowing grey patterns, liquid metal look.
3.  **No Code Generation** for patterns anymore. We use visual assets.

### Step 2: The "Chaos Orbit" Geometry

- A ring of 6-8 large surfaces.
- **Constraint**: NO surface is perfectly vertical. All are tilted inwards/outwards/sideways.
- **Motion**: The entire ring rotates slowly + individual plates "breathe" (drift).

### Step 3: Confirmation

I will not proceed to Step 1 until you say "Yes, generates images".
