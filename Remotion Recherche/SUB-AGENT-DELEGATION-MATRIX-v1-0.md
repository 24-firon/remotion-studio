# SUB-AGENT-DELEGATION-MATRIX v1.0 (29. Jan 2026)

## Die Routing-Tabelle für den Orchestrator

Diese Tabelle zeigt dem Orchestrator genau: "Wenn User X fragt → Load Skill Y → Frag Sub-Agent Z".

---

## 📊 Die Master-Tabelle

| User Request | Detect Keywords | Route To | Skill(s) | Sub-Agent | Output Type |
|---|---|---|---|---|---|
| "Create intro video" | video, animation, composition | Remotion Path | remotion-dev/skills | Remotion Specialist | tsx (Composition) |
| "Build React component" | React, component, hook, state | React Path | vercel-labs@react | React Expert | tsx (Component) |
| "Setup Next.js app" | Next.js, app router, layout, server action | NextJS Path | vercel-labs@next | NextJS Architect | tsx (App structure) |
| "Design consistent button" | button, design, consistent, UI | Design Path | vercel-labs@design + viron-button-design | Design Auditor | tsx + CSS + tokens |
| "Optimize video rendering" | optimize, performance, render, fps | Performance Path | viron-system/performance-tuning | Performance Specialist | config + tips |
| "Create shader effect" | shader, GPU, glow, WGSL, WebGPU | GPU Path | viron-system/advanced-shaders | GPU Specialist | wgsl code |
| "Audio-reactive animation" | audio, reactive, frequency, spectrum | Audio Path | remotion-dev + viron-system/audio | Audio Specialist | tsx + shader |
| "Particle system" | particle, physics, simulation, GPU | Physics Path | viron-system/physics-simulation | Physics Specialist | wgsl + tsx |
| "Integrate video into website" | video, web, player, integration | Integration Path | remotion-dev + vercel-labs@next | Integration Specialist | tsx (full setup) |
| "Landing page with player" | landing, player, homepage, UI | Landing Path | vercel-labs@next + vercel-labs@design | Landing Architect | tsx (pages + components) |

---

## 🎯 Fallback-Regeln (Wenn nichts passt)

```
IF keywords don't match any row:
  → Default: Load ALL 5 skills + viron-system
  → Ask: "I'm not sure. Let me check all patterns..."
  → Sub-Agent: "General Assistant"
  → Output: Best-effort answer
  → Note: Higher token cost (~50k)

IF multiple paths match (ambiguous):
  Priority order (first match wins):
  1. Design request (always check viron-button-design)
  2. Performance request
  3. Video request
  4. Web request
  5. Generic request
```

---

## 🚀 Konkrete Beispiele

### Beispiel 1: Glowing Button (Design-Konsistenz)

```
USER: "Ich brauche einen Button, der im Video genauso aussieht wie auf der Website."

ORCHESTRATOR:
  Keywords detected: button, design, consistent
  → Route: Design Path
  → Skills: vercel-labs@design + viron-system/rules/viron-button-design.md
  → Sub-Agents: 
     - Design Auditor (checks UI guidelines)
     - Remotion Specialist (video version)
     - React Expert (web version)
  → Output: 3 code files + shared design-tokens.js
```

### Beispiel 2: Audio-Reactive Video

```
USER: "Erstelle eine Animation, die auf die Musik reagiert."

ORCHESTRATOR:
  Keywords: animation, audio, reactive
  → Route: Audio Path
  → Skills: remotion-dev/skills + viron-system/rules/audio.md
  → Sub-Agent: Audio Specialist
  → Output: tsx Composition mit FFT-Analyse
```

### Beispiel 3: Landing Page mit Remotion Player

```
USER: "Baue eine Landing Page, auf der der Video-Player eingebettet ist."

ORCHESTRATOR:
  Keywords: landing, page, player, website
  → Route: Integration Path
  → Skills: vercel-labs@next + remotion-dev/skills
  → Sub-Agents: 
     - NextJS Architect (App structure)
     - Design Auditor (UI consistency)
     - Remotion Specialist (player integration)
  → Output: Complete Next.js App Router structure + Player component
```

---

## 🔄 Context Management

Nach jedem Sub-Agent Call:
```
Sub-Agent Response
  ↓
Check against viron-button-design.md (if design involved)
  ↓
Check token usage
  ↓
Cache result if reusable
  ↓
Return to User
```

---

**Version:** v1.0 (29. Jan 2026)