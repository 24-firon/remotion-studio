# Universal Knowledge Extraction Guide (Type D) - "The Gold Standard"

This guide defines the procedure for turning raw documentation, tutorials, database schemas, or messy code into structured Antigravity Skills.

## 1. Intelligence Gathering (Discovery)

When facing raw content, the agent must not copy-paste. It must **distill**.

- **Goal Extraction**: What is the single most important "Done" state this knowledge describes?
- **Entity Mapping**: Identify keywords, file types, and tech stacks involved.
- **Rule Mining**: Search for phrases like "Always", "Never", "Best practice", "Ensure", "Crucial".

## 2. Structural De-Flattening (Architectural Step)

Raw docs are monolithic. Skills must be modular.

- **The Brain (SKILL.md)**: Only contains the _Routing Logic_ and _Step-by-Step Procedure_.
- **The Library (references/)**: Any content > 10 lines that purely describes "How thing X works" (e.g., a DB Schema or a Tutorial's theory part) goes here.
- **The Dojo (examples/ patterns.md)**: Any "Before/After" code from a tutorial or specific CLI input/output examples go here.

## 3. Trigger Inferenz (The Surface)

A skill is only useful if it's found.

- **Pattern Derivation**:
  - If it's a tutorial for "Next.js Authentication", patterns must include: `["auth setup", "next-auth config", "protect routes"]`.
  - **Rule**: Avoid generic terms. Use high-intent phrases that a user would actually Type.

## 4. Distillation Workflow (Step-by-Step)

1. **Sanitize**: Remove noise (marketing text, intro/outros, "Hello world" fluff).
2. **Standardize**: Convert instructions into numbered lists (`1, 2, 3...`) regardless of source format.
3. **Guardrail**: Every "Never do X" from the source becomes a checkmark in the `Rules` section of `SKILL.md`.
4. **Refactor**: If the source has multiple sub-topics, suggest creating a "Skill Folder" with multiple sub-skills if a single one becomes > 300 lines.

## 5. Quality Filter

- [ ] Is the resulting `SKILL.md` under 200 lines?
- [ ] Is the "Core Directive" clear at first glance?
- [ ] Are all external dependencies (scripts) identified or stubbed?
