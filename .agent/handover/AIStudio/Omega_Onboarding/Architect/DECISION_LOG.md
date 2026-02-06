# DECISION LOG: VIRON REMOTION STUDIO

## 2026-01-22: Unified Skill System Migration

- **Status**: [ACCEPTED]
- **Decision**: Move the legacy `research/` folder into the `.agent/skills/remotion-best-practices/` hierarchy.
- **Reasoning**: To enable the Agent to use the research data as live "Skills".
- **Impact**: Cleanup of root folder, establishment of `viron-core` authority.

## 2026-01-22: Professional Shading Standard (HDRI vs. Hacks)

- **Status**: [ACCEPTED]
- **Decision**: Enforce "No Manual Lighting" for metallic materials.
- **Requirement**: Always use `<Environment preset="studio" />` and PBR values (`metalness: 1`, `roughness: 0.15`).
- **Reasoning**: Unrealistic shading split (white/gray) was rejected by user.
