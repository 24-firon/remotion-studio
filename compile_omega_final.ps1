$root = "C:\Workspace\Repos\remotion-studio"
$dest_final = "$root\.agent\handover\AIStudio\Omega_Onboarding\FINAL_ROUND"
$omega_root = "$root\.agent\handover\AIStudio\Omega_Onboarding"
$architect_path = "$omega_root\Architect"
$mission_path = "$root\.knowledge\mission"
$ai_studio_path = "$root\.agent\handover\AIStudio"

# Create destination directory
New-Item -ItemType Directory -Force -Path $dest_final | Out-Null

function Copy-Smart {
    param($fileName, $dest, $srcOverride)
    $smartPath = $null
    
    # 1. Source Override (if provided)
    if ($srcOverride -and (Test-Path $srcOverride)) { 
        $smartPath = $srcOverride 
    }

    # 2. Architect Folder (High priority for reports/manifestos)
    if (-not $smartPath) {
        if (Test-Path "$architect_path\$fileName") { $smartPath = "$architect_path\$fileName" }
    }

    # 3. Omega Stages (1-4)
    if (-not $smartPath) {
        $stages = @("Stage_1_Constitution", "Stage_2_Blueprint", "Stage_3_Library", "Stage_4_Raw_Gold")
        foreach ($s in $stages) {
            if (Test-Path "$omega_root\$s\$fileName") { 
                $smartPath = "$omega_root\$s\$fileName"
                break 
            }
        }
    }
    
    # 4. AIStudio Root
    if (-not $smartPath) {
        if (Test-Path "$ai_studio_path\$fileName") { $smartPath = "$ai_studio_path\$fileName" }
    }

    # 5. Root Fallback (Slow search)
    if (-not $smartPath) {
        # Generic recursive search in specific reliable folders
        $searchDirs = @(".agent", "viron-core", "src", "Remotion Recherche", "specs", "patterns", "guides")
        foreach ($dir in $searchDirs) {
            $p = Join-Path $root $dir
            if (Test-Path $p) {
                $found = Get-ChildItem -Path $p -Filter $fileName -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
                if ($found) { 
                    $smartPath = $found.FullName 
                    break
                }
            }
        }
    }

    if ($smartPath) {
        Copy-Item -Path $smartPath -Destination "$dest\$fileName" -Force
        Write-Output "  [OK] $fileName"
    }
    else {
        Write-Output "  [MISSING] $fileName"
    }
}

Write-Output "Starting Omega Final Round Compilation..."

# A. SPECIAL HANDLING (Renaming / Promoting) --------------------------

# 1. SKILL.md versions
# v1 -> core
$skill_v1_src = "$root\.agent\skills\remotion-core-skill-source\SKILL.md"
if (Test-Path $skill_v1_src) {
    Copy-Item -Path $skill_v1_src -Destination "$dest_final\SKILL_v1_Master.md" -Force
    Write-Output "  [CREATED] SKILL_v1_Master.md"
}
# v2 -> best-practices
$skill_v2_src = "$root\.agent\skills\remotion-best-practices\SKILL.md"
if (Test-Path $skill_v2_src) {
    Copy-Item -Path $skill_v2_src -Destination "$dest_final\SKILL_v2_Conflict_Master.md" -Force
    Write-Output "  [CREATED] SKILL_v2_Conflict_Master.md"
}

# 2. Ultimate Reports (Promoting Revisions)
# Badge 1 Core Engine V11 Ultimate -> From Badge 1 Revision
$b1_rev = "$mission_path\EXTRACTION_REPORT_BADGE_1_REVISION.md"
if (Test-Path $b1_rev) {
    Copy-Item -Path $b1_rev -Destination "$dest_final\EXTRACTION_REPORT_BADGE_1_CORE_ENGINE_V11_ULTIMATE.md" -Force
    Write-Output "  [PROMOTED] EXTRACTION_REPORT_BADGE_1_CORE_ENGINE_V11_ULTIMATE.md"
}
else { Write-Output "  [MISSING] Badge 1 Core Engine Source" }

# Badge 4 Design System V1 Ultimate -> From Badge 4 Revision
$b4_rev = "$mission_path\EXTRACTION_REPORT_BADGE_4_REVISION.md"
if (Test-Path $b4_rev) {
    Copy-Item -Path $b4_rev -Destination "$dest_final\EXTRACTION_REPORT_BADGE_4_DESIGN_SYSTEM_V1_ULTIMATE.md" -Force
    Write-Output "  [PROMOTED] EXTRACTION_REPORT_BADGE_4_DESIGN_SYSTEM_V1_ULTIMATE.md"
}
else { Write-Output "  [MISSING] Badge 4 Design System Source" }


# B. BULK COPY (Standard Files) ---------------------------------------
$files = @(
    "AGENTS.md",
    "RULES_CORE.md",
    "RULES_TECHNICAL.md",
    "RULES_WORKFLOW.md",
    "VIRON_KNOWLEDGE_BRIDGE_V3.2.md",
    "VIRON_STUDIO_INDEX.md",
    "vision.md",
    "ORCHESTRATOR_SELF_AUDIT_PROTOCOL.md",
    "SUBAGENT_BRIEFING_TEMPLATE_V8.0.md",
    "22_SYSTEM_PLAN_Folder_Structure.md",
    "23_ROUTING_MATRIX_Inputs.md",
    "24_ROUTING_MATRIX_Outputs.md",
    "ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md",
    "ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB-v1-0.md",
    "ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION-v1-0.md",
    "Architektur-Kaskade.md",
    "V43_MASTER_PLAN.md",
    "V43_STRATEGY.md",
    "viron-button-guide.md",
    "GUIDE_Viron_Button_Stack.md",
    "PATTERN_Advanced_Shaders.md",
    "PATTERN_LIGHTING_GRADIENTS.md",
    "PATTERN_Viron_Hard_Won_Knowledge.md",
    "PROJECT_RULES_LIGHTING.md",
    "camera.md",
    "website.md",
    "3d.md",
    "animations.md",
    "assets.md",
    "audio.md",
    "calculate-metadata.md",
    "can-decode.md",
    "charts.md",
    "charts-bar-chart.tsx.md",
    "compositions.md",
    "display-captions.md",
    "extract-frames.md",
    "fonts.md",
    "get-audio-duration.md",
    "get-video-dimensions.md",
    "get-video-duration.md",
    "gifs.md",
    "images.md",
    "import-srt-captions.md",
    "light-leaks.md",
    "lottie.md",
    "maps.md",
    "measuring-dom-nodes.md",
    "measuring-text.md",
    "parameters.md",
    "sequencing.md",
    "subtitles.md",
    "tailwind.md",
    "text-animations.md",
    "text-animations-typewriter.tsx.md",
    "text-animations-word-highlight.tsx.md",
    "timing.md",
    "transcribe-captions.md",
    "transitions.md",
    "transparent-videos.md",
    "trimming.md",
    "videos.md",
    "16_ARCHIVE_Standard_Audio_Auphonic.md",
    "17_ARCHIVE_Standard_AutoEdit_Whisper.md",
    "18_ARCHIVE_Standard_Caption_Engine.md",
    "19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md",
    "20_ARCHIVE_Standard_Dynamic_Data_Supabase.md",
    "21_ARCHIVE_Standard_Agent_Execution.md",
    "30-post-processing-00-overview-postprocessing-stack.md",
    "30-post-processing-01-bloom-selective.md",
    "30-post-processing-02-depth-of-field.md",
    "30-post-processing-03-04-chromatic-und-grain.md",
    "40-advanced-lighting-00-caustics-volumetric.md",
    "40-audio-reaktiv-00-fft-frequenzspektren.md",
    "40-gltf-models-00-loading-optimization.md",
    "50-web-patterns-01-scroll-basierte-dof-navigation.md",
    "50-web-patterns-08-performance-web-vitals-mastery.md",
    "50-web-patterns-09-kinetic-typography-text-animation.md",
    "60-cloud-rendering-00-aws-lambda-renderfarming.md",
    "70-web-accessibility-wcag-2026.md",
    "80-ai-hybrid-workflows-v1-0-code-plus-ai.md",
    "90-synergy-01-data-driven-personalization.md",
    "90-synergy-02-realtime-video-rag-agents.md",
    "90-synergy-03-webgpu-compute-physics.md",
    "EXTRACTION_REPORT_BADGE_1_CODEX_V8.5.md",
    "EXTRACTION_REPORT_BADGE_7_CODEX_V8.5.md",
    "EXTRACTION_REPORT_BADGE_7_CODEX_V11.md",
    "EXTRACTION_REPORT_BADGE_1_SYSTEM_ARCHITECTURE_CLOUD_V11_ULTIMATE.md",
    "EXTRACTION_REPORT_BADGE_4_SYSTEM_ARCHITECTURE_CLOUD_V11_ULTIMATE.md",
    "EXTRACTION_REPORT_BADGE_7_SYSTEM_ARCHITECTURE_CLOUD_V11_ULTIMATE.md",
    "Handover-final.md",
    "Dateiliste.md"
)

foreach ($f in $files) {
    Copy-Smart $f $dest_final
}

Write-Output "Omega Final Round Compilation Complete."
