$root = "C:\Workspace\Repos\remotion-studio"
$dest_root = "$root\.agent\handover\AIStudio"

$skill_rules_path = "$root\.agent\skills\remotion-best-practices\rules"
$local_guides_path = "$root\guides"

function Get-SourcePath {
    param($path)
    
    # Check 1: Exact path from root
    $p1 = Join-Path $root $path
    if (Test-Path $p1) { return $p1 }
    
    # Check 2: If path starts with 'guides/', check in skill rules
    if ($path -like "guides/*") {
        $basename = Split-Path $path -Leaf
        $p2 = Join-Path $skill_rules_path $basename
        if (Test-Path $p2) { return $p2 }
    }
    
    # Check 3: Check directly in skill rules (for plain filenames)
    $p3 = Join-Path $skill_rules_path $path
    if (Test-Path $p3) { return $p3 }
    
    # Check 4: Check if it's the remotion-core skill folder alias
    if ($path -eq "remotion-core") {
        $p4 = "$root\.agent\skills\remotion-core-skill-source"
        if (Test-Path $p4) { return $p4 }
    }
    
    return $null
}

$batches = @(
    @{
        Name       = "Badge - (1)"
        Files      = @(
            ".agent/RULES_CORE.md",
            "remotion-core",
            "viron-core/vision.md",
            "viron-core/documentation_manifest.md",
            "Remotion Recherche/10-remotion-basics-01-timeline-und-frames.md",
            "Remotion Recherche/50-web-patterns-03-css-animationen-vs-remotion.md",
            "guides/compositions.md",
            "guides/sequencing.md",
            "guides/trimming.md",
            "guides/parameters.md",
            "guides/calculate-metadata.md",
            "guides/get-video-duration.md",
            "guides/get-video-dimensions.md",
            "guides/extract-frames.md",
            "guides/transitions.md",
            "guides/animations.md",
            "guides/timing.md"
        )
        SkillFiles = @(
            "animations.md", "timing.md", "sequencing.md", "compositions.md", "trimming.md", "transitions.md"
        )
    },
    @{
        Name       = "Badge - (2)"
        Files      = @(
            "viron-core/physics.md",
            "src/PROJECT_RULES_LIGHTING.md",
            "Remotion Recherche/40-advanced-lighting-00-caustics-volumetric.md",
            "Remotion Recherche/40-gltf-models-00-loading-optimization.md",
            "Remotion Recherche/40-procedural-patterns-00-noise-voronoi-terrain.md",
            "Remotion Recherche/90-synergy-03-webgpu-compute-physics.md",
            "guides/3d.md"
        )
        SkillFiles = @("3d.md")
    },
    @{
        Name       = "Badge - (3)"
        Files      = @(
            "src/learnings/PATTERN_Advanced_Shaders.md",
            "Remotion Recherche/30-post-processing-00-overview-postprocessing-stack.md",
            "Remotion Recherche/30-post-processing-01-bloom-selective.md",
            "Remotion Recherche/30-post-processing-02-depth-of-field.md",
            "Remotion Recherche/30-post-processing-03-04-chromatic-und-grain.md"
        )
        SkillFiles = @("3d.md")
    },
    @{
        Name       = "Badge - (4)"
        Files      = @(
            "viron-core/theme.md",
            "THE_VIRON_AESTHETIC_MANIFESTO.md",
            "guides/viron-button-guide.md",
            "src/learnings/GUIDE_Viron_Button_Stack.md",
            "src/learnings/PATTERN_LIGHTING_GRADIENTS.md",
            "src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md",
            "Remotion Recherche/20-layout-patterns-01-container-queries-und-grids.md",
            "Remotion Recherche/20-layout-patterns-02-view-transitions-in-remotion.md",
            "Remotion Recherche/20-layout-patterns-03-modern-css-masking-compositing.md",
            "Remotion Recherche/ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB-v1-0.md",
            "patterns/BarChart.md",
            "patterns/Typewriter.md",
            "patterns/WordHighlight.md",
            "guides/tailwind.md",
            "guides/fonts.md",
            "guides/text-animations.md"
        )
        SkillFiles = @(
            "tailwind.md", "fonts.md", "images.md", "gifs.md", "lottie.md", "charts.md", "text-animations.md", "measuring-text.md"
        )
    },
    @{
        Name       = "Badge - (5)"
        Files      = @(
            "specs/website.md",
            "Remotion Recherche/50-web-patterns-01-scroll-basierte-dof-navigation.md",
            "Remotion Recherche/50-web-patterns-02-adaptive-quality-switching.md",
            "Remotion Recherche/50-web-patterns-08-performance-web-vitals-mastery.md",
            "Remotion Recherche/50-web-patterns-09-kinetic-typography-text-animation.md",
            "Remotion Recherche/50-web-patterns-10-real-time-ai-video-streaming.md",
            "Remotion Recherche/70-web-accessibility-wcag-2026.md" # User said "compliance.md" but likely generic filename
        )
        SkillFiles = @("measuring-dom-nodes.md", "videos.md")
    },
    @{
        Name       = "Badge - (6)"
        Files      = @(
            "specs/audio.md",
            "specs/camera.md",
            "Remotion Recherche/40-audio-reaktiv-00-fft-frequenzspektren.md",
            "Remotion Recherche/16_ARCHIVE_Standard_Audio_Auphonic.md",
            "Remotion Recherche/17_ARCHIVE_Standard_AutoEdit_Whisper.md",
            "Remotion Recherche/18_ARCHIVE_Standard_Caption_Engine.md",
            "Remotion Recherche/19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md",
            "Remotion Recherche/80-ai-hybrid-workflows-v1-0-code-plus-ai.md",
            "guides/audio.md",
            "guides/videos.md",
            "guides/display-captions.md",
            "guides/import-srt-captions.md",
            "guides/transcribe-captions.md"
        )
        SkillFiles = @(
            "audio.md", "get-audio-duration.md", "display-captions.md", "import-srt-captions.md", "transcribe-captions.md"
        )
    },
    @{
        Name       = "Badge - (7)"
        Files      = @() # Already handled previously, but adding Skill Files!
        SkillFiles = @(
            "parameters.md", "calculate-metadata.md", "can-decode.md", "get-video-duration.md", "get-video-dimensions.md", "extract-frames.md"
        )
    },
    @{
        Name       = "Badge - (8)"
        Files      = @(
            ".agent/AGENTS.md",
            ".agent/RULES_CORE.md",
            ".agent/RULES_WORKFLOW.md",
            ".agent/RULES_TECHNICAL.md",
            ".agent/RULES_MIGRATION_GUIDE.md",
            "Remotion Recherche/21_ARCHIVE_Standard_Agent_Execution.md",
            "Remotion Recherche/90-synergy-01-data-driven-personalization.md",
            "Remotion Recherche/90-synergy-02-realtime-video-rag-agents.md",
            "Remotion Recherche/SUB-AGENT-DELEGATION-MATRIX-v1-0.md",
            "Remotion Recherche/AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md",
            "Remotion Recherche/AGENT-OUTPUT-VALIDATION-v1-0.md",
            "Remotion Recherche/SKILL-INSTALLATION-GUIDE-v1-0.md", # .md vs v1.md
            "Remotion Recherche/ARCHIV-POLICY-v1-0.md",
            "docs/TOKEN_BUDGET.md",
            "docs/RESEARCH_Semantic_Triggers.md",
            ".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V8.0.md", # Previously copied/renamed
            "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V3.md",
            "ORCHESTRATOR_SELF_AUDIT_PROTOCOL.md"
        )
        SkillFiles = @(
            ".agent/skills/remotion-core-skill-source/SKILL.md"
        )
    }
)

foreach ($batch in $batches) {
    if ($batch.Files.Count -eq 0 -and $batch.SkillFiles.Count -eq 0) { continue }

    Write-Output "Processing $($batch.Name)..."
    $batchPath = Join-Path $dest_root $batch.Name
    $skillPath = Join-Path $batchPath "Skill-Dateien"
    
    New-Item -ItemType Directory -Force -Path $batchPath | Out-Null
    New-Item -ItemType Directory -Force -Path $skillPath | Out-Null
    
    # Process Main Files
    foreach ($file in $batch.Files) {
        # Check if it was one of the renamed/moved files in handover
        if ($file -match "SUBAGENT_BRIEFING_TEMPLATE_V8.0.md") {
            # Special case: it might be in handover\AIStudio\Pflichtlektüre from previous step
            $source = "$root\.agent\handover\AIStudio\Pflichtlektüre\SUBAGENT_BRIEFING_TEMPLATE_V8.0.md"
            if (Test-Path $source) {
                Copy-Item -Path $source -Destination $batchPath -Force
                Write-Output "  [OK] $file (From Pflichtlektüre Cache)"
                continue
            }
        }
        
        $src = Get-SourcePath $file
        if ($src) {
            Copy-Item -Recurse -Path $src -Destination $batchPath -Force
            Write-Output "  [OK] $file"
        }
        else {
            Write-Output "  [MISSING] $file"
        }
    }
    
    # Process Skill Files
    foreach ($sFile in $batch.SkillFiles) {
        $src = Get-SourcePath $sFile
        if ($src) {
            Copy-Item -Recurse -Path $src -Destination $skillPath -Force
            Write-Output "  [OK] Skill: $sFile"
        }
        else {
            Write-Output "  [MISSING] Skill: $sFile"
        }
    }
}
Write-Output "Batch distribution complete."
