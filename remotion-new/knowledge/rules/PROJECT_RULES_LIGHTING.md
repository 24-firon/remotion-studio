# PROJECT LIGHTING & GEOMETRY RULES

_Established V43 - Do not violate._

## 1. Geometry Rules

- **HIGH POLY BUTTON**: The main button capsule MUST be "Vector Smooth".
  - **Minimum Specs**: `capsuleGeometry args={[0.92, 4.0, 64, 256]}` (CapSegments: 64, Radial: 256).
  - **Reason**: User complained about "low poly" / "straight lines" on zoom.

## 2. Lighting & Color Rules ("The 80% Grey Rule")

- **NO PURE BLACK**: `#000000` is forbidden.
  - Darkest allowed tone: `#202020`.
  - Use a "Backstop Cylinder" (`color="#303030"`) behind all scenes to prevent black voids.
- **NO PURE WHITE**: Avoid blown-out `#FFFFFF`. Max highlight `#F0F0F0`.
- **MARBLED TEXTURE**: Constant flat colors are banned. Use Noise/Texture/Stripes to create internal variation.
- **INTER-REFLECTION**: Objects should be close enough to reflect in each other ("Abfärben").

## 3. Composition Rules

- **NO PARALLEL LINES**: Avoid 0°, 90°, 180° alignments.
  - **Action**: Tilt everything on multiple axes (X, Y, Z).
  - **Goal**: "Schräge Linien", diagonal flow.
- **MANDATORY MOVEMENT**: Static scenes are broken scenes.
  - **Action**: `rotateY` the environment or `float` the elements.
- **COMPLEX SHAPES**: No single big rectangles.
  - Use **Arrays** (Stripes, Scales).
  - Use **Curved Forms** (Ovals, Rings).
  - Use **Asymmetry** (Chaos).

## 4. The "Strip Gradient" Technique

Instead of 1 flat wall, generate **50 tiny strips** side-by-side with shifting colors.

- Creates physical, "real" gradients.
- Adds geometry detail to reflections.
