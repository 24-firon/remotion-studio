# VIRON-DELTA-SKILL-STRUCTURE v1.0 (29. Jan 2026)

## Der Blueprint für deinen eigenen Custom Skill

Nachdem der Compare-Agent dir die Gaps aufgezeigt hat, bauen wir den `viron-system` Skill. Das ist wo dein Wissen lebt, das die Big 4 Skills nicht abdecken.

---

## 📁 Ordner-Struktur (Der genaue Aufbau)

```
./skills/viron-system/
├── SKILL.md                          (Einstiegspunkt, Manifest)
├── rules/
│   ├── workflow.md                   (Orchestrierung, Deine Business-Logik)
│   ├── advanced-shaders.md           (GPU, WGSL, Advanced Effects)
│   ├── viron-button-design.md        (Design-System: Button Konsistenz Video/Web)
│   ├── theme.md                      (Branding, Farben, Typography)
│   ├── layout-2026-advanced.md       (Container Queries + Viron-spezifisches)
│   ├── performance-tuning.md         (Deine Custom Optimierungen)
│   └── physics-simulation.md         (WebGPU Particle Physics)
├── examples/
│   ├── glowing-button-video.tsx      (Beispiel: Button in Remotion)
│   └── glowing-button-web.tsx        (Beispiel: Button in React/Next)
└── README.md                         (Dokumentation des Skills)
```

---

## 1️⃣ Die SKILL.md (Manifest & Entry Point)

**Datei:** `./skills/viron-system/SKILL.md`

```markdown
# Viron System Skill

> Advanced patterns for Remotion video production + Next.js Web integration.
> Extends: remotion-dev/skills, vercel-labs/agent-skills

## Purpose

This skill contains Viron-specific knowledge that extends the base skills:
- Advanced GPU shaders (WebGPU, WGSL)
- Design system consistency (Button, Typography, Theme)
- Performance tuning strategies
- Orchestration workflows

## When to use

- When building videos with custom shader effects
- When designing UI elements that must match across video + web
- When optimizing for Viron's specific branding
- When implementing real-time physics simulations

## Rules

### Core Rules
- [workflow.md](./rules/workflow.md) – Orchestration, Gemini 3 Pro delegation
- [viron-button-design.md](./rules/viron-button-design.md) – Button system
- [theme.md](./rules/theme.md) – Colors, typography, branding

### Advanced Rules
- [advanced-shaders.md](./rules/advanced-shaders.md) – GPU compute, WGSL
- [layout-2026-advanced.md](./rules/layout-2026-advanced.md) – CSS 2026 patterns
- [physics-simulation.md](./rules/physics-simulation.md) – Particle systems

### Optimization
- [performance-tuning.md](./rules/performance-tuning.md) – Custom optimizations

## Examples

- [glowing-button-video.tsx](./examples/glowing-button-video.tsx) – Remotion component
- [glowing-button-web.tsx](./examples/glowing-button-web.tsx) – React component

## Installation

```bash
npx skills add your-username/viron-system
```

Or locally (for development):

```bash
# Already in ./skills/viron-system/
# AntiGravity auto-discovers it.
```

## Version

v1.0 (29. Jan 2026)

## Maintained By

Your Team
```

---

## 2️⃣ Die Rules (Das Fleisch)

Jede Rule-Datei ist **ein spezifisches Konzept**, das die Big 4 Skills nicht oder nur teilweise abdecken.

### Rule: `workflow.md` (Orchestrierung)

```markdown
# Workflow & Orchestration with Gemini 3 Pro

## Your Orchestrator Pattern

The Orchestrator Agent (Gemini 3 Pro) is the "manager" that:
1. Reads your user request
2. Checks against installed skills + this Viron skill
3. Delegates to specialized Sub-Agents
4. Combines results into final output

### Main Routing Logic

| Request Type | Route To | Skill Used |
|---|---|---|
| "Create video with animations" | Remotion Agent | remotion-dev/skills |
| "Build React component" | React Agent | vercel-labs/agent-skills@react |
| "Design glowing button" | Design Agent | vercel-labs/agent-skills@design + viron-system/rules/viron-button-design.md |
| "Optimize rendering" | Performance Agent | viron-system/rules/performance-tuning.md |

### Token Budget

Gemini 3 Pro: 1M token context
- Base Skills: ~45k token
- This Viron Skill: ~25k token
- User Request: ~2k token
- Buffer: ~928k token

Total Usage: ~72k token. **Safe margin.**

### Implementation

[Detailed orchestration patterns...]
```

### Rule: `viron-button-design.md` (Design Konsistenz)

```markdown
# Viron Button Design System

## The Challenge
You need ONE button design that works identically in:
- Remotion (video/animation context)
- Next.js Web (interactive/DOM context)

Both must look/feel the same. Both must have Viron glow.

## The Solution: Shared Design Tokens

### 1. Define Tokens (Shared Constants)
```javascript
// design-tokens.js (Imported by both video + web)
export const VIRON_THEME = {
  colors: {
    primary: '#FF00FF',
    glow: 'rgba(255, 0, 255, 0.6)',
  },
  button: {
    radius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    glowBlur: '12px',
  },
};
```

### 2. Remotion Component (Video)
```tsx
// Button.remotion.tsx
import { VIRON_THEME } from '../design-tokens';

export const GlowingButton = () => (
  <div style={{
    background: VIRON_THEME.colors.primary,
    borderRadius: VIRON_THEME.button.radius,
    boxShadow: `0 0 ${VIRON_THEME.button.glowBlur} ${VIRON_THEME.colors.glow}`,
    padding: VIRON_THEME.button.padding,
    fontSize: VIRON_THEME.button.fontSize,
  }}>
    Click Me
  </div>
);
```

### 3. Web Component (React/Next)
```tsx
// Button.web.tsx
import { VIRON_THEME } from '../design-tokens';

export const GlowingButton = () => (
  <button style={{
    background: VIRON_THEME.colors.primary,
    borderRadius: VIRON_THEME.button.radius,
    boxShadow: `0 0 ${VIRON_THEME.button.glowBlur} ${VIRON_THEME.colors.glow}`,
    padding: VIRON_THEME.button.padding,
    fontSize: VIRON_THEME.button.fontSize,
    border: 'none',
    cursor: 'pointer',
  }}>
    Click Me
  </button>
);
```

## Result
- **No duplication:** Tokens defined once
- **Consistency:** Both render identically
- **Maintainability:** Change token = both update

[More patterns...]
```

### Rule: `advanced-shaders.md` (GPU/WGSL)

```markdown
# Advanced Shaders & WebGPU

## When You Need This
- Custom bloom with Viron glow aesthetics
- Real-time particle systems (100k+ particles)
- Procedural textures
- GPU-accelerated physics

## WGSL Shader Example: Viron Glow Bloom

@compute @workgroup_size(256)
fn viron_bloom_compute(...) {
  // Your specific bloom logic
  // Viron-tuned glow strength, color falloff
}

[Full shader code...]
```

---

## 3️⃣ Examples (Copy-Paste-fertige Komponenten)

**Datei:** `./skills/viron-system/examples/glowing-button-video.tsx`

```tsx
import { VIRON_THEME } from '../design-tokens';

export const GlowingButton = () => {
  return (
    <div style={{
      background: VIRON_THEME.colors.primary,
      borderRadius: VIRON_THEME.button.radius,
      padding: VIRON_THEME.button.padding,
      fontSize: VIRON_THEME.button.fontSize,
      boxShadow: `0 0 ${VIRON_THEME.button.glowBlur} ${VIRON_THEME.colors.glow}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
    }}>
      Render Me
    </div>
  );
};
```

---

## 🚀 Wie du den Skill maintainst

### Workflow: Änderung machen

1. **Edit a Rule:** `./skills/viron-system/rules/advanced-shaders.md`
2. **Test:** Load skill in AntiGravity, ask agent a question
3. **Commit:** `git add skills/viron-system/rules/advanced-shaders.md && git commit`
4. **Reload:** `npx skills refresh` in AntiGravity

### Workflow: Neuen Rule hinzufügen

1. **Create:** `./skills/viron-system/rules/new-topic.md`
2. **Add to SKILL.md:** Update the Rules section
3. **Test & Commit**

### Workflow: Mit Base Skills synchronisieren

Falls remotion-dev/skills ein Update hat:

```bash
# 1. Update base skill
npx skills add remotion-dev/skills

# 2. Run Compare-Agent
# → Check if any Viron Rules werden redundant

# 3. Archive redundant rules
mkdir -p ./_archive/viron-delta-obsolete/
mv ./skills/viron-system/rules/old-topic.md ./_archive/viron-delta-obsolete/

# 4. Commit
```

---

## 📝 Dateiformat-Standards (Pro Rule)

Jede Rule sollte haben:

```markdown
# [Topic Title]

## Overview
One paragraph. What is this about?

## When to Use
- Bullet points
- Use cases

## Implementation
Code examples + explanation

## Performance Notes
- Tokens:  ~Xk
- Latency: ~Yms
- Browser Support: ...

## Links
- Related Skill rules
- External references
```

---

**Version:** v1.0 (29. Jan 2026)  
**Nächste Datei:** `ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1.md`