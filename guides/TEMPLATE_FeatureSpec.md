# 📄 TEMPLATE: [Feature Name] Specification

> **AI Instruction:** This document defines the source of truth for [Feature].
> Read this entirely before proposing changes to related files.

## 📋 Meta-Information

- **Status:** [DRAFT | VERIFIED | ACTIVE]
- **Version:** [X.Y]
- **Tags:** #domain #technology #status (e.g. #audio #r3f #v46-alchemy)
- **Rationale:** Why does this exist? What problem does it solve in the Viron Ecosystem?

---

## 🧠 Historical Learnings & Experiments

Capture non-obvious results from previous versions.

- **[Tag: Performance]**: e.g., "M2 MacBook throttles at samples > 32."
- **[Tag: Visual]**: e.g., "Metallic look requires at least 3 lightformers."

## 🏗️ Architecture & Logic

Explain the "How" and the "Why" behind the technical implementation.

### Core Principles

- [Principle 1]: e.g., "Deterministic frame-sync."
- [Principle 2]: e.g., "PBR Materials only."

### Technical Stack

- **Library:** [e.g., @react-three/drei]
- **Target:** [e.g., WebGL2]
- **Critical Components:** [List main classes/functions]

---

## 🛠️ Implementation Patterns

Provide concise, copy-pasteable best practice examples.

```tsx
// [Code Example Name]
[Code];
```

---

## ⚠️ Constraints & Guardrails (The "Surrounding")

What an Agent MUST know to avoid breaking things.

- **Dependency Matrix:** Does this rely on other specs? (e.g., "Requires specs/audio.md for sync").
- **Performance Budget:** (e.g., "Max 16 samples for Transmission").
- **Known Pitfalls:** What has failed in the past?
- **Forbidden Actions:** (e.g., "Never use Lamina here").

---

## 🔄 Interaction & Context

How does this feature interact with the rest of the repo?

- **Entry Points:** Where is this registered?
- **Related Assets:** Where are the textures/videos located?

---

_Created by Viron Intelligence System_
