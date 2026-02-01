# Quality Gates for New Skills

Before marking a skill as "Created", verify these points:

1.  **Naming Convention:**
    - Folder name is strictly `kebab-case` (e.g., `git-helper`, not `GitHelper`).
    - YAML `name` matches folder name.

2.  **Routing Integrity:**
    - `match_patterns` contains at least 3 distinct triggers (mix of specific keywords and natural language intent).
    - `description` is precise enough for the semantic router to pick it up.

3.  **Atomic Design:**
    - The skill does ONE thing well. (Don't build a "DoEverything" skill).

4.  **Reference Integrity:**
    - If the skill uses the Reference Pattern, are the files in `references/` created and linked in `SKILL.md`?

5.  **Hallucination Check:**
    - Did I remove all `{{placeholders}}` from the template?
    - Are the "Examples" relevant to THIS specific skill?

6.  **Polyglot & Hub Integrity (Type B/D):**
    - **Target Match:** Does the file format (XML/YAML/MDC) match the requested Target IDE?
    - **Pathing:** Is the skill placed in the correct `hub/` subfolder (e.g., `hub/cursor/`)?
    - **Portability:** For non-Antigravity targets, have we confirmed the absolute system path in the documentation?
