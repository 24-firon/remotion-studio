---
name: {{skill-name-kebab-case}}
description: {{precise-description-for-router}}
match_patterns: ["{{pattern1}}", "{{pattern2}}", "{{pattern3}}"]
---

# {{Skill Name}} Protocol

## 1. Goal
{{One clear sentence describing the successful outcome.}}

## 2. Context & Triggers
- **When to use:** {{Describe the user intent}}
- **Input:** {{What does the agent need? Selected text? Specific files?}}

## 3. Rules (Guardrails)
- [ ] **Output Format:** {{e.g., Only JSON, No Markdown wrappers}}
- [ ] **Safety:** {{e.g., Never delete files without asking}}
- [ ] **Scope:** {{e.g., Only modify the current file}}

## 4. Procedure (Step-by-Step)
1.  **Analyze:** Understand the user's request in the context of {{Topic}}.
2.  **Retrieve:** {{Read reference files if needed}}.
3.  **Execute:** {{The core action}}.
4.  **Verify:** Check if the output matches the Rules.

## 5. Examples (Few-Shot)
> **User:** {{Example Input}}
> **Agent:** {{Example Output}}
