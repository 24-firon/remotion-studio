# AGENT-OUTPUT-VALIDATION v1.0 (29. Jan 2026)

## Wie du überprüfst, dass der Agent nicht halluziniert

Der Orchestrator-Agent kann "mit fester Stimme Bullshit reden". Hier ist, wie du das merkst.

---

## 🚨 Häufige Agent-Fehler

| Fehler | Merkmale | Wie du es siehst |
|---|---|---|
| **Halluzination (APIs)** | Agent erfindet nicht-existente API-Parameter | Code hat `remot ion.setGlowRadius()` (nicht real) |
| **Skill Halluzination** | Agent sagt "ist im Skill", aber ist es nicht | Agent zitiert Regel die nicht existiert |
| **Token Overflow** | Agent wird lahm, unvollständig | Antwort endet mitten im Code |
| **Design Inconsistency** | Agent ignoriert viron-button-design | Button im Video != Button im Web |
| **Version Confusion** | Agent nutzt alte API | Code nutzt `useFrame()` statt `useCurrentFrame()` |

---

## ✅ Validation Workflow

### Schritt 1: Spot-Check (Nach jedem Sub-Agent Output)

```
Agent Output (z.B. Remotion Component):

import { useCurrentFrame } from 'remotion';
export const MyComp = () => {
  const frame = useCurrentFrame();
  return <div>{frame}</div>;
};

VALIDATION CHECKLIST:
☐ API existiert wirklich? (Check: remotion docs)
☐ Imports sind korrekt? (Check: package.json)
☐ Syntax ist valide? (Check: TypeScript compiler)
☐ Passt zu Skill rules? (Check: remotion-dev/skills/rules/sequences.md)
```

### Schritt 2: Design Consistency Check (Wenn UI beteiligt)

```
Agent Output: GlowingButton component

VALIDATION:
☐ Nutzt design-tokens.ts? (Check: Import statement)
☐ glowBlur = 12px (wie in tokens)? (Check: value)
☐ glowColor = rgba(255,0,255,0.6)? (Check: value)
☐ Matching zwischen video + web version? (Check: both files)

If any ☐ unchecked → FAIL, send back to agent
```

### Schritt 3: Token Audit (Nach mehreren Requests)

```bash
# Track cumulative tokens
ORCHESTRATOR_SESSION_TOKENS = 0

After Request 1:
  Orchestrator: 3k tokens
  Sub-Agents: 25k tokens
  Total: 28k
  ORCHESTRATOR_SESSION_TOKENS += 28k ← 28k used

After Request 2:
  Orchestrator: 2k tokens
  Sub-Agents: 18k tokens
  Total: 20k
  ORCHESTRATOR_SESSION_TOKENS += 20k ← 48k used

After Request 10:
  ORCHESTRATOR_SESSION_TOKENS = 480k

THRESHOLD:
  If ORCHESTRATOR_SESSION_TOKENS > 850k:
    WARNING: "Only 150k token buffer left. Clear old context?"
  If > 950k:
    ERROR: "Token limit approaching. Archive context."
```

---

## 🔍 Konkrete Validation Tests

### Test 1: API Existence Check

**Setup:**
```bash
# Create a validation script
cat > validate-api.js << 'EOF'
const remotion = require('remotion');
const methods = Object.keys(remotion);

const agentUsed = [
  'useCurrentFrame',
  'Composition',
  'Player',
  // ... all APIs agent used
];

agentUsed.forEach(method => {
  if (!methods.includes(method)) {
    console.error(`❌ API not found: ${method}`);
  } else {
    console.log(`✅ API exists: ${method}`);
  }
});
EOF

node validate-api.js
```

### Test 2: Skill Rule Adherence

**Setup:**
```bash
# Extract rules from skill
grep -r "^##" remotion-dev/skills/rules/ > /tmp/rules.txt

# Check if agent cited them
agent_output="Your Composition should use..."

while read rule; do
  if grep -q "$rule" agent_output; then
    echo "✅ Agent cited: $rule"
  fi
done < /tmp/rules.txt
```

### Test 3: Design Token Consistency

**Setup:**
```bash
# Extract tokens used in video component
grep -o "glowBlur: '[^']*'" components/GlowingButton.remotion.tsx

# Extract tokens from web component
grep -o "glowBlur: '[^']*'" components/GlowingButton.web.tsx

# They should match!
if [video_blur] === [web_blur]; then
  echo "✅ Design tokens consistent"
else
  echo "❌ MISMATCH: video != web"
fi
```

### Test 4: TypeScript Compilation

```bash
# Agent code must compile
npx tsc --noEmit agent-output.tsx

# If there are errors, flag the agent
# (Agent should have caught this)
```

---

## 📊 Validation Report Template

```markdown
# Agent Output Validation Report

**Request:** [USER QUERY]
**Sub-Agent:** [WHICH AGENT]
**Timestamp:** [DATE/TIME]
**Status:** [PASS/FAIL/WARNING]

## API Existence
- [ ] useCurrentFrame ✅
- [ ] Composition ✅
- [ ] Custom API ❌ NOT FOUND

## Skill Adherence
- [ ] Followed remotion-dev/skills/rules/sequencing.md ✅
- [ ] Followed vercel-labs@react/rules/hooks.md ✅
- [ ] Violated design-guidelines ❌

## Design Consistency
- [ ] Design tokens matched ✅
- [ ] glowBlur consistent ✅
- [ ] Colors consistent ✅

## Code Quality
- [ ] TypeScript compiles ✅
- [ ] No console errors ✅
- [ ] Performance OK ✅

## Token Usage
- Tokens used: 18,000 / 1,000,000
- Buffer remaining: 982,000
- Status: ✅ SAFE

## Issues Found
1. [If any ❌, list them here]

## Recommendation
[APPROVE / SEND BACK TO AGENT]

## Follow-up
If issues: [What to ask agent to fix]
```

---

## 🚀 Automation (Optional)

```typescript
// validators/validate-agent-output.ts

export async function validateAgentOutput(output: string, context: {
  requestType: 'video' | 'web' | 'design' | 'all',
  skillsUsed: string[],
  agentName: string,
}) {
  const results = {
    apiExistence: await checkAPIs(output),
    skillAdherence: await checkSkillRules(output, context.skillsUsed),
    designConsistency: await checkDesignTokens(output),
    tsCompilation: await checkTypeScript(output),
    tokenUsage: calculateTokens(output),
  };

  const score = Object.values(results)
    .filter(r => r.status !== 'PASS')
    .length === 0
    ? 'PASS'
    : 'FAIL';

  return {
    status: score,
    details: results,
    report: generateReport(results),
  };
}
```

---

**Version:** v1.0 (29. Jan 2026)