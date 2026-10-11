# Graph Report - remotion-studio  (2026-07-06)

## Corpus Check
- Large corpus: 1057 files · ~777.748 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 689 nodes · 1439 edges · 43 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: imports: 339 · contains: 338 · imports_from: 233 · ON_BRANCH: 200 · PARENT_OF: 199 · MODIFIES: 115 · rationale_for: 9 · re_exports: 4 · calls: 2


## Input Scope
- Requested: auto
- Resolved: committed (source: cli)
- Included files: 1057 · Candidates: 1220
- Excluded: 208 untracked · 23959 ignored · 4 sensitive · 90 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `085297d`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `CONSTANTS` - 57 edges
2. `VironTerminal_Master()` - 35 edges
3. `THEME` - 27 edges
4. `validate_handover_schema()` - 3 edges
5. `create_handover()` - 3 edges
6. `ChromeButton_3_0_HighPBR()` - 3 edges
7. `Terminal_Original()` - 3 edges
8. `ViroMaster_V1_Button()` - 3 edges
9. `summarize_csv()` - 2 edges
10. `append_to_decision_log()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `00a0295 feat: add extraction report for 3D physics, lighting, and geometry, detailing Remotion compatibility and Viron-specific design rules.` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 25 → community 5_
- `01a3ecf feat: Update initialization prompt with first steps, important rules, and help resources` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 34 → community 5_
- `02598c7 feat: implement V17-V21 Silver Spectrum - 5 variants for brightness, resolution and material feel` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 13 → community 5_
- `02598c7 feat: implement V17-V21 Silver Spectrum - 5 variants for brightness, resolution and material feel` --PARENT_OF--> `5391d6e feat: implement V22 Liquid Silver Master - research based PBR and high-res pipeline`  [EXTRACTED]
  git → git  _Bridges community 13 → community 38_
- `0436f6e feat: Archive and restore prompt for fixing rule file paths` --ON_BRANCH--> `master`  [EXTRACTED]
  git → git  _Bridges community 26 → community 5_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (22): ChromeButton_3_0_HighPBR(), ChromeSceneV3(), 085297d feat: create comprehensive AI agent handover package with consolidated knowledge, code, and governance., CubeScene(), VironCube_2_0_Rounded(), VironCube(), MainScene(), SilverButton_0_2_SuperGlint_LogoLess() (+14 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (22): {fontFamily}, getTypedText(), MyAnimation(), {fontFamily}, e02694c Add Remotion best practices documentation and core skill summary, Comprehensively analyzes a CSV file and generates multiple visualizations., summarize_csv(), append_to_action_log() (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (15): 1203a10 feat: V39 Chaos Theory - Implemented asymmetric mix of wall shapes (Soft Oval, Sharp Star, Triangle Cut) and added infrastructure for custom image projection, 2bf728d feat: V40 Real Gradients - Replaced Lightformers with custom GLSL ShaderMaterials to generate true smooth gradients, removed Terminal overlay, and refined Chaos layout, a4a3dc5 feat: V38 Marbled Gradient Master - Introduced layered lightformers (concentric gradients) and noise clusters to create complex surface textures and tonal transitions, SceneV38_Marbled(), SceneV38_Marbled_Debug(), SceneV39_Chaos(), SceneV39_Chaos_Debug(), SceneV40_RealGradients() (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (21): b432653 feat: V29 Thematic Showcase - Sunset, Night, Warehouse, Forest presets with high blur, ce67b5c feat: V30 Synthetic Studio - manually reconstructed the V7 Studio lighting using Lightformers to eliminate all visible objects, f6d1cd9 feat: V31 Color Tuned Studio - Warm and Cool lighting variants to fix the 'Black & White' complaint without adding objects, SceneV29a_Sunset(), SceneV29b_Night(), SceneV29c_Warehouse(), SceneV29d_Forest(), SceneV30a_Rebuilt() (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (21): SceneV35a_Hexagon(), SceneV35a_Hexagon_Debug(), SceneV35b_Triangle(), SceneV35b_Triangle_Debug(), SceneV35c_Square(), SceneV35c_Square_Debug(), SceneV35d_Star(), SceneV35d_Star_Debug() (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (28): master, 4a6c055 feat: add session-close workflow, 5316f0d chore: remove redundant safe-sync workflow (now global rule), 546e727 docs: finalize knowledge-audit protocol and sync all documentation - v4.2 final, 58f3013 chore: archive final session log with bootloader fix, 598cee6 docs: add redundancy audit result to manifest, 5a6d62f backup: add *_restore.md files before fix, 5b582b5 fix: complete init cascade with learnigs and core files (+20 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (19): SceneV43_01(), SceneV43_01_Debug(), SceneV43_02(), SceneV43_02_Debug(), SceneV43_03(), SceneV43_03_Debug(), SceneV43_05(), SceneV43_05_Debug() (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (18): SceneV41a_ArenaOval(), SceneV41a_ArenaOval_Debug(), SceneV41b_SharpStar(), SceneV41b_SharpStar_Debug(), SceneV41c_MarbledHex(), SceneV41c_MarbledHex_Debug(), SceneV41d_TiltedRings(), SceneV41d_TiltedRings_Debug() (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (18): SceneV42a_LiquidGrey(), SceneV42a_LiquidGrey_Debug(), SceneV42b_KineticStars(), SceneV42b_KineticStars_Debug(), SceneV42c_SoftArena(), SceneV42c_SoftArena_Debug(), SceneV42d_DriftingRings(), SceneV42d_DriftingRings_Debug() (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (12): 1045e34 feat: V37 Oval Walls - Replaced rectangular walls with Oval lightformers to create organic, curved reflections instead of straight lines, 6fb34e2 feat: V35 Room Shapes - Procedural generation of Hexagon, Triangle, Square, and Star room geometries with Grey Walls and automatic Debug Views for each, fe4115d feat: V36 Asymmetric/Tilted Geometry - Rotated the Hexagon room on X/Z axes to create diagonal reflection lines as requested, SceneV36a_Tilted(), SceneV36a_Tilted_Debug(), SceneV36b_Extreme(), SceneV36b_Extreme_Debug(), SceneV37_Ovals() (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (14): 31a3e10 feat: V34 Light Shapes - implemented Ovals, Triangles, Hexagons, and Stars (with ball tips) as custom reflection geometry, 8621115 feat: V32 Grey Gradient Master - implementing the '80% Grey Gradient' requirement with massive soft lightformers, 94c11fa feat: V33 Color Gradient Master - massive colored lightformers (Blue/Beige) to avoid B/W look, plus Debug View to inspect the environment, SceneV34a_Oval(), SceneV34b_Triangle(), SceneV34c_Hexagon(), SceneV34d_Star(), SceneV32() (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (14): 3734c61 feat: V26 Grey Studio - uses grey-colored Lightformers for realistic silver tones, 71e7f4e feat: V25 Pure Lightformer Studio - no HDRI preset, only abstract light shapes, d977a1e feat: V24 variants (Clean/SubtleColor/PureMirror) + topic-based learning files, e081ba5 fix: V24 variants - higher blur (1.0) and outdoor presets (sunset/dawn) to remove equipment visibility, SceneV24a_Clean(), SceneV24b_SubtleColor(), SceneV24c_PureMirror(), SceneV25() (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.12
Nodes (12): e2fab12 chore: state recovery and pre-skill-sync snapshot (V46 Alchemy), V45_Template_BlueStudio(), V45_Template_GoldenHour(), V45_Template_Moonless(), V45_Template_NeonCity(), V45_Template_SoftStudio(), V46_Alchemy_Moonless(), V46_Alchemy_Shanghai() (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.19
Nodes (12): 02598c7 feat: implement V17-V21 Silver Spectrum - 5 variants for brightness, resolution and material feel, VironButton_V17_WhiteRoom(), VironButton_V18_GreyStudio(), VironButton_V19_ChromeBright(), VironButton_V20_LiquidMirror(), VironButton_V21_PhysicalSilver(), SceneV17(), SceneV18() (+4 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (10): Arc(), arcLength, Atom(), Logo(), myCompSchema2, codeStyle, subtitle, title (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.16
Nodes (9): SceneV9(), VironButton_Master_V4(), VironButton_Master_V5(), VironButton_Master(), VironButton_V9_ZeroFrame(), VironMaster_Scene(), VironMaster_V4_Scene(), VironMaster_V5_Scene() (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.13
Nodes (15): 04edb33 feat: establish new auditor quickstart, aesthetic manifesto, and user governance protocols, and update agent handover to mandate a full Badge 7 re-audit., 2bb97e9 feat: establish comprehensive handover protocol for Viron Mission 2026, detailing master tasks and implementation plan., 2c5e7fc feat: add orchestrator self-audit protocol for verifying sub-agent outputs before approval, 5386844 chore: archive session log Badge 7 System Fix, 66eb896 feat: update handover protocol to V3.0 and add new implementation plan and master task list for Viron Mission 2026 knowledge migration., 7ffbb72 feat: add Viron Mission 2026 master task list and governance manifesto for project handover., 8572cda feat: introduce new agent operational guidelines covering Git synchronization, token economy, forensic analysis, and hardware interaction., 871ce7c chore(governance): upgrade badge workflow to v3.0 zero-tolerance protocol (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (13): 0cca133 feat: add Viron Mission 2026 implementation plan for knowledge ecosystem and skill tree migration., 3207c9c feat: introduce agent boot prompt, whitelist, and implementation plan to establish a rigorous operational protocol for Viron Mission 2026., 599ee1d debug: create `history_debug.txt` to record mission task file history., 752713e feat: Establish a comprehensive handover protocol for the next agent, including a boot prompt, whitelist, blacklist, and an updated chained task execution for system architecture and agent governance., 92bf461 feat: add Viron Mission 2026 master task and recovery candidate files., a0e2d9c feat: create master task list for Viron Mission 2026, detailing project phases, badges, and their current status., ae904ca feat: add agent boot prompt detailing critical intervention, system audit, and boot sequence for the Viron Digital Architect., aea5f4e feat: Add MASTER TASK: VIRON MISSION 2026 document outlining project phases and strict governance. (+5 more)

### Community 18 - "Community 18"
Cohesion: 0.19
Nodes (5): ViroMaster_V1_Button(), ViroMaster_V2_Button(), RoomShape, VironButton_V35_RoomShapes(), ViroTerminal_Pro()

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (12): 363321e feat(mission): finalize Badge 6 forensic briefing and templates, 3f2984d feat: add knowledge revision prompts and extraction reports for badges 1-3 based on skill-check analysis., 6ac08dc feat: Generate revised knowledge extraction reports for badges 1, 3, and 4, detailing Viron-specific IP and 2026 standards based on new revision prompts., 8b42cc7 feat: add Badge 5 extraction report for WEB & CLOUD, detailing Viron IP, project learnings, and recommendations., 966a172 feat: Add sub-agent briefing for Badge 5 and a general briefing template for knowledge extraction., 969572f feat: Introduce subagent mission framework with templates, activation prompts, and briefings for Badge 5 and 6 knowledge extraction, including an initial Badge 5 report., ba48d09 feat: add Badge 5 extraction report detailing Viron IP, skill redundancies, and architectural insights for web and cloud., c4bf895 feat: add revision prompts for badge reports to guide repository migration based on global skills (+4 more)

### Community 20 - "Community 20"
Cohesion: 0.24
Nodes (9): 6fbbd37 feat: V23 - switch to REAL HDRI presets (apartment, studio, city, lobby) instead of broken Lightformers, SceneV23_Apartment(), SceneV23b_Studio(), SceneV23c_City(), SceneV23d_Lobby(), VironButton_V23_RealHDRI(), VironButton_V23b_Studio(), VironButton_V23c_City() (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.17
Nodes (8): GradientMaterial, IntrinsicElements, V44_01_Stripes_Horizontal(), V44_02_Stripes_Vertical(), V44_03_Stripes_Spiral(), V44_05_Turbine_Ovals(), V44_09_Bright_Soft(), V44_11_Noise_Heavy()

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (11): 062a3af feat(knowledge): finalize source master index for Phase 0, 3067031 docs(mission): final synchronization of all project artifacts and master index v11.0, 373138a chore: save state before task restoration, 4e12913 chore: align all core governance files to v5.0 stable baseline, 537e39e docs(index): final 100% verified source master index, 7a9e1ca docs(plan): corrected logical flow v3.0 and .knowledge cleanup, 84354de feat: establish Token Budget governance and sizing strategy (v1.0), 84f50d5 chore(task): final governance audit and encoding fix (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (11): 12b5eb4 feat: Add filter guide and checklist for Badge improvement and consolidation, 1685619 feat: Add Viron Studio migration script for copying files and logging, 32288d7 feat: Add documentation for non-copied files in migration process, 337c9fb feat: Add migration documentation for new repo structure and file requirements, 3f9056c feat: Enhance implementation plan and master task documentation with detailed navigation and phase descriptions, 5a187e0 feat: Add detailed filter guide and workflow for SKILL-BADGE mapping analysis, 833dd02 feat: Add analysis of Activation Prompts for Badge 6 & 7 compared to V6.1 standard, acec5ce feat: Add sub-agent prompts for Repo Infrastructure Analyst and V6.1 Self-Briefing (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.24
Nodes (6): VironButton_V6_Massive(), VironButton_V7_Sharp(), VironButton_V8_City(), SceneV6(), SceneV7(), SceneV8()

### Community 25 - "Community 25"
Cohesion: 0.20
Nodes (10): 00a0295 feat: add extraction report for 3D physics, lighting, and geometry, detailing Remotion compatibility and Viron-specific design rules., 11f05e4 refine(badge2): Add useFrame example, fix paths, cross-badge hints, 192b3ee feat: add a detailed extraction report for 3D physics, lighting, and geometry, and a sub-agent briefing template., 2ccffc9 feat: add sub-agent briefing for Badge 2 on 3D physics, lighting, and geometry, 5d74dd0 feat: create extraction report for 3D physics, lighting, and geometry, detailing Remotion compatibility and Viron-specific rules., 77a346c docs(mission): Stage all pending changes - Template updates, Index modifications, b2d5978 docs(mission): Update Sub-Agent Briefing Template to V2.0 (Philosophy, Context-First), bcbeabd docs(mission): Add Mission Philosophy to V3 - Credo, Template reference, Why we repair (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.20
Nodes (10): 0436f6e feat: Archive and restore prompt for fixing rule file paths, 0b2499a feat: Add comprehensive analysis and improvement recommendations for Badge 6 & 7 compared to V6.1 template, 2ba3dd1 feat: Add detailed reports for content analysis, correction, and path validation of rule files, 3c874d5 feat: Add comprehensive validation report and workflow rules, 5ce2adb feat: Remove final doubled content analysis, correction, and path correction reports, 77f81d0 feat: Add V6 briefing template and comparison analysis for Badge 6, 7, and 8, 893e014 feat: Add step for understanding repository rules; outline critical rules and consolidation proposal, bc4a669 feat: Archive previous subagent plans and create new linked index router documentation (+2 more)

### Community 27 - "Community 27"
Cohesion: 0.29
Nodes (6): 0c6db69 feat: V27 Hybrid Master - combines 'studio' preset (good reflections) with CapsuleGeometry (no frame) and blur=0.6, 9675a73 feat: V26 Debug View - visualizes the studio environment walls for user inspection, SceneV26_Debug(), SceneV27(), VironButton_V26_GreyStudio_Debug(), VironButton_V27_HybridMaster()

### Community 28 - "Community 28"
Cohesion: 0.20
Nodes (10): 0e7e381 docs(mission): TOTAL RESTORATION v15.0 - Phase 5-8 details recovered and hardened, 28c45c8 docs(mission): BADGE 1 COMPLETE - 23 IP points extracted, 0 conflicts, 28d974e docs(mission): Add Badge 1 Repair Briefing (V2) with strict context-awareness rules, 4aca292 docs(mission): finalized Deep Precision Index v12.0 and hardened mission state, 4f4530a docs(mission): finalized non-redacted Master Index v13.0 and persistent task history, 583b402 docs(skill): Enhance local SKILL.md with detailed Global Skill descriptions (v2.0), 6491643 docs(mission): 100% exhaustive High-Context Master Index (120 files) and Phase 4 completion, b073f66 docs(mission): Add Sub-Agent Briefing Template V1.0 with Badge 1 learnings (fixed syntax) (+2 more)

### Community 29 - "Community 29"
Cohesion: 0.20
Nodes (10): 128f741 feat: Add sub-agent briefing and generated extraction report for Badge 7 system architecture and cloud., 39ae2c2 docs: add Badge 7 extraction report detailing Viron's system architecture, cloud pipeline, routing, workflow, and error protocols., 5218970 feat: add sub-agent briefing and extraction report for Badge 7, and update mission task progress to reflect its pending status., 84ffad7 feat: add initial version of extraction report comparison for Badge 7, 892b3e0 feat: create extraction reports documenting Viron's unique system architecture and cloud logic, distinguishing it from global Remotion standards., 9bf0706 feat: Add Extraction Report for Badge 7 and Self-Analysis Prompt, ab46c40 feat: create Viron Mission 2026 master task list with detailed phases and strict governance., b49a00b feat: add Viron-specific system architecture and cloud knowledge extraction report (Badge 7 V1) (+2 more)

### Community 30 - "Community 30"
Cohesion: 0.29
Nodes (6): 16a956b feat: implement V12 Light Tent - custom environment to eliminate dark bevel reflections, b9aae1c feat: implement V11 Horizon Fix - environment rotation to remove dark rim, SceneV11(), SceneV12(), VironButton_V11_Seamless(), VironButton_V12_LightTent()

### Community 31 - "Community 31"
Cohesion: 0.29
Nodes (6): 2957e73 feat: implement V14 Hyper-Liquid - combined capsule geometry with rotating custom light tent, 4c6faf7 feat: implement V13 Capsule Fix - replace RoundBox w/ CapsuleGeometry and stop env rotation, SceneV13(), SceneV14(), VironButton_V13_Capsule(), VironButton_V14_HyperLiquid()

### Community 32 - "Community 32"
Cohesion: 0.29
Nodes (6): 37f62f6 feat: implement V15 Bright Master - high intensity lightformers for final polish, 7b2489a feat: implement V16 Silver Sun - added front fill lightformer to brighten black reflections, SceneV15(), SceneV16(), VironButton_V15_Bright(), VironButton_V16_Silver()

### Community 33 - "Community 33"
Cohesion: 0.22
Nodes (8): 2391097 feat: delete file, 4f13bb4 feat: establish comprehensive AI agent knowledge base and operational guidelines across various Remotion, system, and design domains., 67ee28b feat: add PowerShell script to verify project files and generate a verification output report., 6d53994 feat: establish comprehensive AI Studio Omega Onboarding knowledge base including standards, reports, and plans, 94111ac docs: Add comprehensive architectural and Remotion best practice documentation for AI Studio Omega Onboarding., a3b6866 feat: initialize Viron Omega AI Studio onboarding with comprehensive knowledge base, architectural guidelines, and automation scripts., b1636d1 docs: introduce comprehensive plans and protocols for video rendering, design consistency, and scalable system architecture., cbc1313 feat: establish AI Studio operational framework with detailed input routing, system plans, and agent rules.

### Community 34 - "Community 34"
Cohesion: 0.22
Nodes (9): 01a3ecf feat: Update initialization prompt with first steps, important rules, and help resources, 0d590a0 Refactor EXTRACTION_REPORT_BADGE_8: Update title, versioning, and structure; enhance clarity in governance and AI synergy findings; introduce new metrics and critical findings; improve formatting for better readability., 4131585 feat: Revise TASK_PROMPT for Phase 6: Knowledge Consolidation; enhance clarity on mission, preparation steps, and quality criteria for badge reports, 4d706d5 feat: Update implementation plan and task documentation for VIRON MISSION 2026; enhance clarity on phase completions and template evolution process, 6255147 feat: Add detailed comparison of V4 and Template V2 concurrency formulas, b46b9a8 feat: Enhance implementation plan and extraction report templates for Badge 8, ce110f3 feat: Add onboarding and initialization prompts, including hyperlink index and task guidelines, d3f0d31 feat: Add TASK_PROMPT_2 for Template Optimization; outline evolution steps and validation process for Badge 8 (+1 more)

### Community 35 - "Community 35"
Cohesion: 0.22
Nodes (9): 1858555 feat: Add new workflows to standardize sub-agent mission briefings and orchestrate badge audit cycles., 2124a99 feat: document visual effects, including four shader recipes and a post-processing pipeline, adapted for deterministic Remotion rendering using `three-custom-shader-material` and `useCurrentFrame`., 275bc69 refactor: replace a specific extraction report with a standardized sub-agent briefing template., 2a03966 feat: add sub-agent briefing for Badge 3 focusing on visual effects, shaders, and materials., 2aa02cd feat: Add extraction report for Badge 3 visual effects, detailing deterministic Remotion shaders and post-processing pipeline with recommendations., 8fa4f95 docs(mission): finalize badge 3 audit (extraction report v1.0), 96b4618 feat: add Badge 3 extraction report detailing deterministic Remotion visual effects, CSM shaders, and post-processing stack., 9a7cf27 feat(mission): finalize badge 2 report & prepare badge 3 briefing with template v2.0 rules (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (9): 27397a2 feat: Add orchestrator prompt for Badge Re-Audit with detailed phases and agent instructions, 4dcffcc feat: Update task documentation for Template Evolution and Repo Migration; mark phases as completed and adjust status for Badge Re-Audit, 551015e feat: Add Orchestrator Prompt for Badge Re-Audit V4 Final with detailed guidelines and structure, 8599cf1 feat(migration): add migration check and viron studio copy scripts, a01d846 feat: Update task documentation to reflect the completion of the forensic reboot and its historical context; add new orchestrator prompt for Badge Re-Audit with detailed phases and dependencies; introduce modular context packages for improved navigation and task execution., be91604 feat: Add migration validation script and update task documentation with critical knowledge and orientation steps, c3f74e7 feat: Add Todo/Task Synchronization Protocol and update implementation plan with detailed change log, d687d08 feat: Add initial prompt for Orchestrator Agent activation with detailed instructions and mission outline (+1 more)

### Community 37 - "Community 37"
Cohesion: 0.47
Nodes (3): ViroMaster_V3_Button(), ViroMaster_V3_Scene(), ViroTerminal_Ultra()

### Community 38 - "Community 38"
Cohesion: 0.60
Nodes (3): 5391d6e feat: implement V22 Liquid Silver Master - research based PBR and high-res pipeline, SceneV22(), VironButton_V22_LiquidSilver()

### Community 39 - "Community 39"
Cohesion: 0.60
Nodes (3): 8d380a3 feat: V28 V7 Restored - Studio preset (V7 reflection) + Capsule (V13 geometry) + Blur 1.0 (Hidden Objects), SceneV28(), VironButton_V28_V7_Restored()

### Community 40 - "Community 40"
Cohesion: 0.60
Nodes (3): 9b65b05 feat: V24 Master Recipe + comprehensive PATTERN_REALISTIC_SILVER_METAL.md learning, SceneV24(), VironButton_V24_Master()

### Community 41 - "Community 41"
Cohesion: 0.50
Nodes (4): 076a71c feat: V41 Combinatorial Matrix - Created 5 distinct scene variations (ArenaOval, SharpStar, MarbledHex, TiltedRings, DeepSpace) mixing shaders, geometries, and room tilts, 341eac7 feat: V43 The Armada - Implemented 6 distinct variations with high-poly button geometry, physical strip gradients, strict strict non-black rules, and backstop cylinders to prevent void artifacts, 468d91a feat: V42 Golden Mean - Implemented 5 strict 80% Grey variations with mandatory motion, eliminated pure blacks, and documented strict lighting rules in LEARNINGS, 7ee38d5 feat: V44 Refined Armada - Rebuilt all 6 variations with gap-free geometry, 360-degree coverage (closed loops, ceilings, floors), and brighter #505050 backdrops to eliminate black artifacts

### Community 42 - "Community 42"
Cohesion: 0.67
Nodes (2): SceneV10(), VironButton_V10_LiquidPill()

## Knowledge Gaps
- **36 isolated node(s):** `CONSTANTS`, `Comprehensively analyzes a CSV file and generates multiple visualizations.`, `Validates that the content is valid JSON and strictly follows the Viron Handover`, `Surgically appends a new decision to DECISION_LOG.md without re-writing the whol`, `Appends a decision to the GLOBAL .gemini/DECISION_LOG.md (Tier 3).` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 42`** (2 nodes): `SceneV10()`, `VironButton_V10_LiquidPill()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CONSTANTS` connect `Community 13` to `Community 0`, `Community 18`, `Community 37`, `Community 15`, `Community 42`, `Community 30`, `Community 31`, `Community 32`, `Community 38`, `Community 20`, `Community 40`, `Community 11`, `Community 27`, `Community 39`, `Community 3`, `Community 10`, `Community 9`, `Community 2`, `Community 7`, `Community 8`, `Community 6`, `Community 24`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `THEME` connect `Community 0` to `Community 15`, `Community 18`, `Community 37`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `VironTerminal_Master()` connect `Community 15` to `Community 20`, `Community 11`, `Community 3`, `Community 10`, `Community 4`, `Community 9`, `Community 2`, `Community 42`, `Community 30`, `Community 31`, `Community 32`, `Community 38`, `Community 40`, `Community 27`, `Community 39`, `Community 13`, `Community 24`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `CONSTANTS`, `Comprehensively analyzes a CSV file and generates multiple visualizations.`, `Validates that the content is valid JSON and strictly follows the Viron Handover` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06363636363636363 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06050420168067227 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06722689075630252 - nodes in this community are weakly interconnected._