# Viron Component: Bar Chart (Gold Price)

- **Source**: .agents/skills/remotion-best-practices/rules/generic/assets/charts-bar-chart.tsx
- **Status**: New Component (Local Only)
- **Rationale**: Direct reference for reactive bar charts with Viron styling.

---

```tsx
import { loadFont } from "@remotion/google-fonts/Inter";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily } = loadFont();

const COLOR_BAR = "#D4AF37";
const COLOR_TEXT = "#ffffff";
const COLOR_MUTED = "#888888";
const COLOR_BG = "#0a0a0a";
const COLOR_AXIS = "#333333";

// ... [Full Code from Original Component]
```
