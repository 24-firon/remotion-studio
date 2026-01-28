# 🤖 AGENT ORCHESTRATION

This file provides a directory map for AI Agents to quickly navigate the project's knowledge base.

## 🗺️ Knowledge Map

### Authority (Root Level)

- **Rules**: [PROJECT_RULES.md](file:///c:/Workspace/Repos/remotion-studio/PROJECT_RULES.md)
- **Technical Specs**: [/specs/](file:///c:/Workspace/Repos/remotion-studio/specs/) (The "What" & "Why")
- **Implementation Patterns**: [/patterns/](file:///c:/Workspace/Repos/remotion-studio/patterns/) (The "How" - Code Examples)
- **Manuals & Research**: [/guides/](file:///c:/Workspace/Repos/remotion-studio/guides/) (The "Context" - Stacks & Guides)

### Standardization

- **Templates**: Always follow [guides/TEMPLATE_FeatureSpec.md](file:///c:/Workspace/Repos/remotion-studio/guides/TEMPLATE_FeatureSpec.md) when creating new specs.

## 🛑 Agent Protocol

1. **READ** `PROJECT_RULES.md` first.
2. **LOAD** required specs from `/specs/` based on task domain.
3. **GIT MANDATE:** Propose or perform a `git commit` after completing every logical feature/step.
4. **TAGGING:** Use `#tags` in documentation to link historical learnings (e.g., #performance, #visual-audit).
5. **LEAN DOCS:** Update existing specs incrementally instead of over-writing. Use the "Historical Learnings" section.
6. **NO HALLUCINATION:** Check the "Dependency Matrix" in the relevant Guide or Spec.
