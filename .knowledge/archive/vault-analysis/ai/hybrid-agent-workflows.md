# AI Workflows: Hybrid Code + AI Execution

> **Source:** [80-ai-hybrid-workflows-v1-0-code-plus-ai.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/80-ai-hybrid-workflows-v1-0-code-plus-ai.md) (9.2 KB)

---

## Concept

Combine deterministic code (reliable, testable) with AI capabilities (creative, adaptive) in a controlled workflow.

---

## The Hybrid Model

```
Deterministic Code (80%) + AI Augmentation (20%) = Best of Both Worlds
```

| Layer      | Type          | Example                           |
| ---------- | ------------- | --------------------------------- |
| Structure  | Deterministic | Scene layout, timing, transitions |
| Content    | AI-Assisted   | Script writing, image generation  |
| Validation | Deterministic | Quality checks, compliance        |
| Delivery   | Deterministic | Rendering, encoding, upload       |

---

## Workflow Patterns

### Pattern 1: AI Draft → Human Edit → Code Execute

```typescript
// 1. AI generates script draft
const draft = await ai.generateScript(prompt);

// 2. Human reviews and approves
const approved = await humanReview(draft);

// 3. Deterministic code renders
await remotion.render(approved);
```

### Pattern 2: Code Structure → AI Fill

```typescript
// 1. Define deterministic structure
const template = {
  intro: { duration: 5, type: "title" },
  body: { duration: 30, type: "content" }, // AI fills this
  outro: { duration: 5, type: "cta" },
};

// 2. AI generates only the 'content' section
template.body.content = await ai.generateContent(topic);
```

---

## Safety Rules

- ✅ AI output ALWAYS goes through validation
- ✅ Human approval for public content
- ✅ Deterministic fallbacks for AI failures
- ❌ NEVER let AI control destructive operations
- ❌ NEVER skip validation "to save time"
