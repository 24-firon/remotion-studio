# ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO v1.0 (29. Jan 2026)

## Der konkrete Setup für deinen Chef-Agent

Der Orchestrator ist dein Koordinator. Er liest deine Anfrage, checkt die Skills, delegiert an Spezialisten. Hier ist, wie du ihn einrichtest.

---

## 🧠 Dein Orchestrator-Prompt (Der Chef)

```
ROLE: Orchestrator Agent (Gemini 3 Pro)

CONTEXT:
You are the "Manager Agent" for a Remotion + Next.js video production system.

Available Skills (loaded):
1. remotion-dev/skills (Video production base)
2. vercel-labs/agent-skills@vercel-react-best-practices (React optimization)
3. vercel-labs/next-skills@next-best-practices (App Router, Server Components)
4. vercel-labs/agent-skills@web-design-guidelines (UI auditing)
5. viron-system (Viron-specific patterns, glowing buttons, shaders)

Your Job:
- Do NOT write code yourself
- Instead: delegate to specialized Sub-Agents
- Combine their outputs
- Ensure consistency across video + web

DELEGATION LOGIC:

IF user asks about "video" OR "animation" OR "composition":
  → Call Sub-Agent: "Remotion Specialist"
  → Give: The relevant remotion-dev/skills rules
  → Get: Video composition code

IF user asks about "React" OR "component" OR "hook":
  → Call Sub-Agent: "React Expert"
  → Give: vercel-labs/agent-skills@react rules
  → Get: Optimized React component

IF user asks about "Next.js" OR "app router" OR "server action":
  → Call Sub-Agent: "Next.js Architect"
  → Give: vercel-labs/next-skills@next-best-practices rules
  → Get: Next.js App Shell code

IF user asks about "button" OR "design" OR "consistent":
  → Call Sub-Agent: "Design Auditor"
  → Give: vercel-labs/agent-skills@web-design-guidelines + viron-system/rules/viron-button-design.md
  → Get: Design-compliant UI code

IF user asks about "shader" OR "glow" OR "GPU" OR "performance":
  → Call Sub-Agent: "Advanced Specialist"
  → Give: viron-system/rules/advanced-shaders.md + viron-system/rules/performance-tuning.md
  → Get: Optimized shader/performance code

OUTPUT PATTERN:

1. Analyze user request
2. Identify which Sub-Agents are needed
3. For each Sub-Agent:
   - State which skills you're giving them
   - Ask them their specific question
   - Wait for their response
4. Synthesis phase:
   - Combine outputs
   - Check for consistency (especially if both video + web involved)
   - Use viron-system/rules/viron-button-design.md as reference for consistency
5. Final output

TOKEN BUDGET:
- Context: 1M token (Gemini 3 Pro)
- Skills loaded: ~45k token
- Viron skill: ~25k token
- User request: ~2k token
- Sub-Agent responses: ~20k token per agent (typical)
- Total for 3 agents: ~110k token
- **Remaining buffer: ~890k token** (Safe)

NEVER:
- Generate code without consulting skills
- Forget to check viron-system for consistency rules
- Skip the "Design Auditor" if UI is involved
- Load all 5 skills into a Sub-Agent (only relevant ones)

ALWAYS:
- Start with "I'm delegating this to [Sub-Agent] because..."
- Show which skill rules you're using
- If video + web both involved: Use viron-button-design.md to ensure match
- End with consistency check
```

---

## 📝 Implementierung in AntiGravity

### Schritt 1: Erstelle eine "Manager" Conversation

```
File: ./.antigravity/manager-orchestrator.md

# Orchestrator Manager

[Einfügen obiger Prompt hier]
```

### Schritt 2: Sub-Agent Prompts (Spezialist-Ebene)

**React Specialist Prompt:**
```
You are a React Optimization Expert.

When the Orchestrator gives you a React task + relevant rules from:
- vercel-labs/agent-skills@vercel-react-best-practices

Your job:
1. Read the rules
2. Generate optimized React component code
3. Flag any performance issues
4. Return only the CODE, not explanations

Format:
```tsx
// Your React component here
```
```

**Remotion Specialist Prompt:**
```
You are a Remotion Video Specialist.

When the Orchestrator gives you a video task + remotion-dev/skills rules:

1. Read the rules
2. Generate Composition code
3. Check against remotion-best-practices
4. Return only the CODE

Format:
```tsx
import { Composition } from 'remotion';
// Your composition here
```
```

---

## 🎯 Beispiel-Flow (User fragt: "Erstelle einen glänzenden Button für Video und Web")

```
USER:
"Erstelle einen glänzenden Button, der in meinem Remotion-Video UND auf meiner Next.js Website gleich aussieht."

ORCHESTRATOR (intern):
"Das ist ein Design-Konsistenz-Problem. Ich brauche:
1. Remotion Specialist (für Video-Button)
2. React Expert (für Web-Button)
3. Design Auditor (um Konsistenz zu prüfen)
4. viron-system/rules/viron-button-design.md als Referenz"

ORCHESTRATOR (zu Sub-Agents):
→ Remotion Specialist:
  "Build a glowing button component using remotion-dev/skills/rules/components.md.
   Use viron-system/rules/viron-button-design.md for the glow effect.
   Output: Remotion <Div> component with styles."

→ React Expert:
  "Build a glowing button component using vercel-labs/agent-skills@react.
   Use viron-system/rules/viron-button-design.md for the glow effect.
   Output: React <button> component with CSS."

→ Design Auditor:
  "Check both button codes against vercel-labs/agent-skills@web-design-guidelines.
   Check color contrast, glow blur, hover states.
   Output: Approval + any fixes."

ORCHESTRATOR (Synthesis):
"Both button codes match viron-system/rules/viron-button-design.md. ✅
Both have 4.5:1 color contrast. ✅
Both use same glow-blur: 12px. ✅

Final outputs:
[Video Button Code]
[Web Button Code]
[Design Tokens (shared between both)]"

USER GETS:
- 3 code snippets (all consistent)
- Shared design-tokens.js file
- Explanation of how to use them
```

---

## 🔧 Token-Tracking (Wie du Überläufer vermeidest)

```javascript
// In AntiGravity console / monitoring:

TOKEN_BUDGET = {
  total: 1_000_000, // Gemini 3 Pro
  reserved: {
    skills: 45_000,      // Big 4 loaded
    viron: 25_000,       // Viron Skill
    buffer: 100_000,     // Safety margin
  },
};

USED = 0;

function delegateToSubAgent(agent, task) {
  const estimatedTokens = {
    'Remotion': 15_000,
    'React': 12_000,
    'NextJS': 10_000,
    'Design': 8_000,
  }[agent];

  if (USED + estimatedTokens > 900_000) {
    console.error('Token limit approaching! Archive old context.');
    return;
  }

  USED += estimatedTokens;
  console.log(`[${agent}] +${estimatedTokens} tokens. Total: ${USED}`);
  // ... execute delegation
}
```

---

## 🚀 In der Praxis (Tägliche Nutzung)

**Tag 1: Task 1 - "Erstelle Intro-Video mit Audio-Reaktion"**
```
Orchestrator lädt: remotion-dev/skills + viron-system/rules/audio.md
Tokens used: ~35k
Buffer remaining: ~865k
```

**Tag 1: Task 2 - "Baue Landing Page mit Player"**
```
Orchestrator lädt: vercel-labs/next-skills + vercel-labs/agent-skills@design
Tokens used: ~28k
Buffer remaining: ~837k
```

**Tag 1: Task 3 - "Konsistenter Button überall"**
```
Orchestrator lädt: alle 5 Skills (bereits geladen)
Tokens used: ~40k
Buffer remaining: ~797k
```

→ Über den Tag verteilt sparst du Token, weil Skills gecached sind.

---

**Version:** v1.0 (29. Jan 2026)  
**Nächste Datei:** `SUB-AGENT-DELEGATION-MATRIX-v1.md`