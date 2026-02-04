$root = "C:\Workspace\Repos\remotion-studio"
$dest_brain = "$root\.agent\handover\AIStudio\brain\Data"
$skill_rules_path = "$root\.agent\skills\remotion-best-practices\rules"
$pflicht_cache = "$root\.agent\handover\AIStudio\Pflichtlektüre"

# Create destination directory
New-Item -ItemType Directory -Force -Path $dest_brain | Out-Null

function Get-SmartPath {
    param($relativePath)
    
    # 1. Try exact path
    $p1 = Join-Path $root $relativePath
    if (Test-Path $p1) { return $p1 }

    # 2. Handle "rules/" mapping to best practices skill
    if ($relativePath -like "rules/*") {
        $basename = Split-Path $relativePath -Leaf
        $p2 = Join-Path $skill_rules_path $basename
        if (Test-Path $p2) { return $p2 }
    }

    # 3. Handle "guides/" mapping falback to skill rules
    if ($relativePath -like "guides/*") {
        $basename = Split-Path $relativePath -Leaf
        $p3 = Join-Path $skill_rules_path $basename
        if (Test-Path $p3) { return $p3 }
    }
    
    # 4. Try finding in Pflichtlektüre Cache (useful for templates/protocols moved there)
    $basename = Split-Path $relativePath -Leaf
    $p4 = Join-Path $pflicht_cache $basename
    if (Test-Path $p4) { return $p4 }

    # 5. Generic Recursive Search for filename (Last Resort, expensive but necessary for "zusammensuchen")
    # Limiting search to .agent, viron-core, src, Remotion Recherche, docs to avoid node_modules deep dive
    $searchDirs = @(".agent", "viron-core", "src", "Remotion Recherche", "docs", ".knowledge")
    foreach ($dir in $searchDirs) {
        $searchRoot = Join-Path $root $dir
        if (Test-Path $searchRoot) {
            $found = Get-ChildItem -Path $searchRoot -Filter $basename -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
            if ($found) { return $found.FullName }
        }
    }

    return $null
}

$omega_list = @(
    ".agent/AGENTS.md",
    ".agent/RULES_CORE.md",
    ".agent/RULES_WORKFLOW.md",
    ".agent/RULES_TECHNICAL.md",
    ".agent/RULES_MIGRATION_GUIDE.md",
    ".agent/handover/task.md",
    ".agent/handover/implementation_plan.md",
    ".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V8.0.md",
    "VIRON_STUDIO_INDEX.md",
    "VIRON_KNOWLEDGE_BRIDGE.md",
    "THE_VIRON_AESTHETIC_MANIFESTO.md",
    "src/PROJECT_RULES_LIGHTING.md",
    "viron-core/vision.md",
    "docs/REPOSITORY_MANIFESTO.md",
    "docs/TOKEN_BUDGET.md",
    "docs/RESEARCH_Semantic_Triggers.md",
    "docs/RESEARCH_Antigravity_Advanced_Patterns.md",
    "docs/HUMAN_OPERATOR_GUIDE.md",
    "docs/config_hack.md",
    "ORCHESTRATOR_SELF_AUDIT_PROTOCOL.md",
    "RELEASE_PROTOCOL.md",
    "SESSION_CLOSE_WORKFLOW.md",
    "THE_ORCHESTRATORS_BADGE_CYCLE.md",
    "WORKFLOW_SUBAGENT_DEPLOYMENT.md",
    "SUBAGENT_PROMPT_1_SKILL_BADGE_MAPPING.md",
    "SUBAGENT_PROMPT_2_REPO_INFRASTRUCTURE.md",
    "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V3.md",
    "INITIALPROMPT_ORCHESTRATOR_ACTIVATION.md",
    "HISTORY_LOG.md",
    "SKILLS_LOG.md",
    "DECISION_LOG.md",
    "WALKTHROUGH_SESSION_6.md",
    "EXTRACTION_REPORT_BADGE_7_CODEX_V7_FINAL.md",
    ".agent/skills/remotion-core/SKILL.md",
    "rules/animations.md",
    "rules/timing.md",
    "rules/sequencing.md",
    "rules/compositions.md",
    "rules/trimming.md",
    "rules/transitions.md",
    "rules/3d.md",
    "rules/audio.md",
    "rules/videos.md",
    "rules/images.md",
    "rules/gifs.md",
    "rules/fonts.md",
    "rules/tailwind.md",
    "rules/charts.md",
    "rules/lottie.md",
    "rules/maps.md",
    "rules/text-animations.md",
    "rules/measuring-text.md",
    "rules/measuring-dom-nodes.md",
    "rules/parameters.md",
    "rules/calculate-metadata.md",
    "rules/extract-frames.md",
    "rules/can-decode.md",
    "rules/get-video-duration.md",
    "rules/get-video-dimensions.md",
    "rules/get-audio-duration.md",
    "rules/display-captions.md",
    "rules/import-srt-captions.md",
    "rules/transcribe-captions.md",
    "10-remotion-basics-01-timeline-und-frames.md",
    "viron-core/physics.md",
    "viron-core/pipeline.md",
    "viron-core/troubleshooting.md",
    "specs/audio.md",
    "specs/camera.md",
    "specs/website.md",
    "patterns/BarChart.md",
    "patterns/Typewriter.md",
    "patterns/WordHighlight.md",
    "guides/compositions.md",
    "guides/sequencing.md",
    "guides/trimming.md",
    "guides/parameters.md",
    "guides/calculate-metadata.md",
    "guides/get-video-duration.md",
    "guides/get-video-dimensions.md",
    "guides/get-audio-duration.md",
    "guides/extract-frames.md",
    "guides/can-decode.md",
    "guides/transitions.md",
    "guides/animations.md",
    "guides/timing.md",
    "guides/measuring-text.md",
    "guides/measuring-dom-nodes.md",
    "guides/tailwind.md",
    "guides/fonts.md",
    "guides/images.md",
    "guides/gifs.md",
    "guides/lottie.md",
    "guides/charts.md",
    "guides/text-animations.md",
    "guides/viron-button-guide.md",
    "src/learnings/PATTERN_Advanced_Shaders.md",
    "src/learnings/PATTERN_LIGHTING_GRADIENTS.md",
    "src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md",
    "src/learnings/GUIDE_Viron_Button_Stack.md",
    "src/V43_MASTER_PLAN.md",
    "src/V43_STRATEGY.md",
    "Remotion Recherche/00-master-workflow-2026-integration.md",
    "Remotion Recherche/00-overview-index-v2-1-complete.md",
    "Remotion Recherche/16_ARCHIVE_Standard_Audio_Auphonic.md",
    "Remotion Recherche/17_ARCHIVE_Standard_AutoEdit_Whisper.md",
    "Remotion Recherche/18_ARCHIVE_Standard_Caption_Engine.md",
    "Remotion Recherche/19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md",
    "Remotion Recherche/20_ARCHIVE_Standard_Dynamic_Data_Supabase.md",
    "Remotion Recherche/21_ARCHIVE_Standard_Agent_Execution.md",
    "Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md",
    "Remotion Recherche/23_ROUTING_MATRIX_Inputs.md",
    "Remotion Recherche/24_ROUTING_MATRIX_Outputs.md",
    "Remotion Recherche/25_AGENT_Migration_Order.md",
    "Remotion Recherche/26_INTEGRATION_PROTOCOL_Skill_Merge.md",
    "Remotion Recherche/30-post-processing-00-overview-postprocessing-stack.md",
    "Remotion Recherche/30-post-processing-01-bloom-selective.md",
    "Remotion Recherche/30-post-processing-02-depth-of-field.md",
    "Remotion Recherche/30-post-processing-03-04-chromatic-und-grain.md",
    "Remotion Recherche/40-audio-reaktiv-00-fft-frequenzspektren.md",
    "Remotion Recherche/40-advanced-lighting-00-caustics-volumetric.md",
    "Remotion Recherche/40-gltf-models-00-loading-optimization.md",
    "Remotion Recherche/40-procedural-patterns-00-noise-voronoi-terrain.md",
    "Remotion Recherche/50-web-patterns-01-scroll-basierte-dof-navigation.md",
    "Remotion Recherche/50-web-patterns-02-adaptive-quality-switching.md",
    "Remotion Recherche/50-web-patterns-03-css-animationen-vs-remotion.md",
    "Remotion Recherche/50-web-patterns-08-performance-web-vitals-mastery.md",
    "Remotion Recherche/50-web-patterns-09-kinetic-typography-text-animation.md",
    "Remotion Recherche/50-web-patterns-10-real-time-ai-video-streaming.md",
    "Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md",
    "Remotion Recherche/70-web-accessibility-wcag-2026-compliance.md",
    "Remotion Recherche/80-ai-hybrid-workflows-v1-0-code-plus-ai.md",
    "Remotion Recherche/90-synergy-01-data-driven-personalization.md",
    "Remotion Recherche/90-synergy-02-realtime-video-rag-agents.md",
    "Remotion Recherche/90-synergy-03-webgpu-compute-physics.md",
    "Remotion Recherche/ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md",
    "Remotion Recherche/ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB-v1-0.md",
    "Remotion Recherche/ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION-v1-0.md",
    "Remotion Recherche/AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md",
    "Remotion Recherche/AGENT-OUTPUT-VALIDATION-v1-0.md",
    "Remotion Recherche/SKILL-QUALITY-AUDIT-CHECKLIST-v1-0.md",
    "Remotion Recherche/SKILL-INSTALLATION-GUIDE-v1.md",
    "Remotion Recherche/VIRON-DELTA-SKILL-STRUCTURE-v1.md",
    "Remotion Recherche/COMPARE-AGENT-PROMPT-TEMPLATE-v1.md",
    "Remotion Recherche/ARCHIV-POLICY-v1-0.md",
    "Remotion Recherche/LUECKEN-AUDIT-v2-1-complete-coverage.md",
    "Remotion Recherche/STATUS-DEPRECATION-REPORT-v2-1.md",
    "Remotion Recherche/MIGRATION-33-DATEIEN-KONSOLIDIEREN-v1-0.md",
    "Remotion Recherche/MASTER-INDEX-ALLE-13-DATEIEN-v1-0.md",
    "Remotion Recherche/HANDOVER-GUIDE-EXTERNAL-DEVELOPER-v1-0.md",
    "Remotion Recherche/SUB-AGENT-DELEGATION-MATRIX-v1-0.md",
    "Remotion Recherche/ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1-0.md"
)

Write-Output "Starting Omega Brain Compilation..."
$missing = @()

foreach ($file in $omega_list) {
    $foundPath = Get-SmartPath $file
    
    if ($foundPath) {
        Write-Output "  [OK] $file -> $foundPath"
        Copy-Item -Path $foundPath -Destination "$dest_brain" -Force
    }
    else {
        Write-Output "  [FAIL] $file NOT FOUND"
        $missing += $file
    }
}

Write-Output "`nCompilation Complete."
if ($missing.Count -gt 0) {
    Write-Output "Missing Files ($($missing.Count)):"
    $missing | ForEach-Object { Write-Output " - $_" }
}
