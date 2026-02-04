$root = "C:\Workspace\Repos\remotion-studio"
$dest_architect = "$root\.agent\handover\AIStudio\Omega_Onboarding\Architect"
$skill_rules_path = "$root\.agent\skills\remotion-best-practices\rules"
$pflicht_cache = "$root\.agent\handover\AIStudio\Pflichtlektüre"
$brain_data_cache = "$root\.agent\handover\AIStudio\brain\Data"
$omega_cache = "$root\.agent\handover\AIStudio\Omega_Onboarding\Stage_2_Blueprint"

# Create destination directory
New-Item -ItemType Directory -Force -Path $dest_architect | Out-Null

function Copy-Smart {
    param($relativePath, $dest, $renameTo)
    $smartPath = $null
    $filename = Split-Path $relativePath -Leaf
    
    # 1. Exact path
    $p1 = Join-Path $root $relativePath
    if (Test-Path $p1) { $smartPath = $p1 }

    # 2. Handover caches
    if (-not $smartPath) {
        $cache1 = "$root\.agent\handover\AIStudio\Pflichtlektüre"
        if (Test-Path "$cache1\$filename") { $smartPath = "$cache1\$filename" }
    }
    
    # 3. Brain Data Cache
    if (-not $smartPath) {
        if (Test-Path "$brain_data_cache\$filename") { $smartPath = "$brain_data_cache\$filename" }
    }
    
    # 4. Omega Cache (Stage 2 specifically has V7 Codex)
    if (-not $smartPath) {
        if (Test-Path "$omega_cache\$filename") { $smartPath = "$omega_cache\$filename" }
    }

    # 5. Fallback for guides/rules
    if (-not $smartPath -and ($relativePath -like "guides/*" -or $relativePath -like "rules/*")) {
        $ruleName = Split-Path $relativePath -Leaf
        $p = Join-Path $skill_rules_path $ruleName
        if (Test-Path $p) { $smartPath = $p }
    }

    if ($smartPath) {
        if ($renameTo) {
            $finalDest = Join-Path $dest $renameTo
            Copy-Item -Path $smartPath -Destination $finalDest -Force
            Write-Output "  [OK] $relativePath -> $renameTo (Renamed)"
        }
        else {
            Copy-Item -Path $smartPath -Destination $dest -Force
            Write-Output "  [OK] $relativePath"
        }
    }
    else {
        Write-Output "  [MISSING] $relativePath"
    }
}

Write-Output "Starting Omega Architect Compilation..."

# 1. Handle Special Logic Files (Renaming/Promoting)
# VIRON_KNOWLEDGE_BRIDGE_V3.2.md -> Recover from System\VIRON_KNOWLEDGE_BRIDGE.md
$bridgePath = "$root\.agent\handover\AIStudio\System\VIRON_KNOWLEDGE_BRIDGE.md"
if (Test-Path $bridgePath) {
    Copy-Item -Path $bridgePath -Destination "$dest_architect\VIRON_KNOWLEDGE_BRIDGE_V3.2.md" -Force
    Write-Output "  [CREATED] VIRON_KNOWLEDGE_BRIDGE_V3.2.md"
}
else { Write-Output "  [MISSING] VIRON_KNOWLEDGE_BRIDGE_V3.2.md (Source not found)" }

# EXTRACTION_REPORT_BADGE_7_CODEX_V8.5.md -> Recover from V7_FINAL (Stage 2)
$v7Path = "$root\.agent\handover\AIStudio\Omega_Onboarding\Stage_2_Blueprint\EXTRACTION_REPORT_BADGE_7_CODEX_V7_FINAL.md"
if (Test-Path $v7Path) {
    Copy-Item -Path $v7Path -Destination "$dest_architect\EXTRACTION_REPORT_BADGE_7_CODEX_V8.5.md" -Force
    Write-Output "  [PROMOTED] EXTRACTION_REPORT_BADGE_7_CODEX_V8.5.md (from V7_FINAL)"
}
else { Write-Output "  [MISSING] EXTRACTION_REPORT_BADGE_7_CODEX_V8.5.md (Source not found)" }

# EXTRACTION_REPORT_BADGE_1_CODEX_V8.5.md -> Recover from Badge 1 Revision
$b1Path = "$root\.knowledge\mission\EXTRACTION_REPORT_BADGE_1_REVISION.md"
if (Test-Path $b1Path) {
    Copy-Item -Path $b1Path -Destination "$dest_architect\EXTRACTION_REPORT_BADGE_1_CODEX_V8.5.md" -Force
    Write-Output "  [PROMOTED] EXTRACTION_REPORT_BADGE_1_CODEX_V8.5.md (from Badge 1 Revision)"
}
else { Write-Output "  [MISSING] EXTRACTION_REPORT_BADGE_1_CODEX_V8.5.md (Source not found)" }

# VIRON_OMEGA_MANIFESTO.md -> Check if exists, else report missing (User likely wanted us to find it if it was there)
Copy-Smart "VIRON_OMEGA_MANIFESTO.md" $dest_architect

# 2. Process Standard Files
$standard_files = @(
    ".agent/AGENTS.md",
    ".agent/RULES_CORE.md",
    ".agent/RULES_TECHNICAL.md",
    ".agent/RULES_WORKFLOW.md",
    "viron-core/vision.md",
    "VIRON_STUDIO_INDEX.md",
    ".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V8.0.md",
    "ORCHESTRATOR_SELF_AUDIT_PROTOCOL.md",
    "Remotion Recherche/16_ARCHIVE_Standard_Audio_Auphonic.md",
    "Remotion Recherche/17_ARCHIVE_Standard_AutoEdit_Whisper.md",
    "Remotion Recherche/18_ARCHIVE_Standard_Caption_Engine.md",
    "Remotion Recherche/19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md",
    "Remotion Recherche/20_ARCHIVE_Standard_Dynamic_Data_Supabase.md",
    "Remotion Recherche/21_ARCHIVE_Standard_Agent_Execution.md",
    "Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md",
    "Remotion Recherche/23_ROUTING_MATRIX_Inputs.md",
    "Remotion Recherche/24_ROUTING_MATRIX_Outputs.md",
    "Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md",
    "Remotion Recherche/ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md",
    "Remotion Recherche/ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB-v1-0.md",
    "Remotion Recherche/ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION-v1-0.md",
    "src/V43_MASTER_PLAN.md",
    "src/V43_STRATEGY.md",
    "Remotion Recherche/30-post-processing-00-overview-postprocessing-stack.md",
    "Remotion Recherche/30-post-processing-01-bloom-selective.md",
    "Remotion Recherche/30-post-processing-02-depth-of-field.md",
    "Remotion Recherche/30-post-processing-03-04-chromatic-und-grain.md",
    "Remotion Recherche/40-advanced-lighting-00-caustics-volumetric.md",
    "Remotion Recherche/40-audio-reaktiv-00-fft-frequenzspektren.md",
    "Remotion Recherche/40-gltf-models-00-loading-optimization.md",
    "src/learnings/PATTERN_Advanced_Shaders.md",
    "src/PROJECT_RULES_LIGHTING.md",
    "Remotion Recherche/50-web-patterns-01-scroll-basierte-dof-navigation.md",
    "Remotion Recherche/50-web-patterns-08-performance-web-vitals-mastery.md",
    "Remotion Recherche/50-web-patterns-09-kinetic-typography-text-animation.md",
    "Remotion Recherche/70-web-accessibility-wcag-2026.md", # Trying generic name as fallback for compliance
    "specs/audio.md",
    "specs/camera.md",
    "specs/website.md",
    "guides/viron-button-guide.md",
    "src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md",
    "src/learnings/GUIDE_Viron_Button_Stack.md",
    "src/learnings/PATTERN_LIGHTING_GRADIENTS.md",
    "Remotion Recherche/80-ai-hybrid-workflows-v1-0-code-plus-ai.md",
    "Remotion Recherche/90-synergy-01-data-driven-personalization.md",
    "Remotion Recherche/90-synergy-02-realtime-video-rag-agents.md",
    "Remotion Recherche/90-synergy-03-webgpu-compute-physics.md"
)

foreach ($f in $standard_files) {
    Copy-Smart $f $dest_architect
}

Write-Output "Omega Architect Compilation Complete."
