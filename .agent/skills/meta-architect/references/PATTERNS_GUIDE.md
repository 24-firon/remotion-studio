# Agent Skill Patterns Guide

This guide defines the standard architectures for Antigravity Skills. Choose the pattern that best fits the problem complexity.

## 1. The Router Pattern (Simple)
**Use when:** The task is purely textual logic, reasoning, or simple code modification.
**Structure:**
- `SKILL.md` (Self-contained instructions)
**Example:** A skill that checks spelling in comments.

## 2. The Reference Pattern (Knowledge-Heavy)
**Use when:** The agent needs to follow a large static guide (Styleguide, API Docs, SQL Conventions) that would clutter the main prompt.
**Structure:**
- `SKILL.md` (The instructions)
- `references/styleguide.md` (The static knowledge)
- `references/api_docs.md`
**Mechanism:** The `SKILL.md` explicitly tells the agent: "Read `references/styleguide.md` before writing code."

## 3. The Few-Shot Pattern (Strict Formatting)
**Use when:** The output must follow a strict format (JSON, YAML, specific Code Style) and the agent tends to hallucinate.
**Structure:**
- `SKILL.md`
- `examples/input_output_pairs.md`
**Mechanism:** The `SKILL.md` contains a rule: "Follow the patterns in `examples/input_output_pairs.md` exactly."

## 4. The Tool-Use Pattern (Deterministic)
**Use when:** The task requires math, file counting, system operations, or logic that LLMs are bad at.
**Structure:**
- `SKILL.md`
- `scripts/task_runner.py` (or .sh, .js)
**Mechanism:** The agent is instructed to *execute* the script rather than trying to solve the problem with text generation.

## 5. The All-In-One Pattern (Complex Frameworks)
**Use when:** Building meta-skills or complex workflows (like this Meta-Architect).
**Structure:**
- `SKILL.md`
- `references/`
- `examples/`
- `scripts/`
