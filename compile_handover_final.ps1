$root = "C:\Workspace\Repos\remotion-studio"
$dest = "$root\.agent\handover\AIStudio\remotion-new"

# 1. Ensure destination exists
New-Item -ItemType Directory -Force -Path $dest | Out-Null
New-Item -ItemType Directory -Force -Path "$dest\assets" | Out-Null
New-Item -ItemType Directory -Force -Path "$dest\code" | Out-Null
New-Item -ItemType Directory -Force -Path "$dest\knowledge" | Out-Null
New-Item -ItemType Directory -Force -Path "$dest\brain" | Out-Null

Write-Output "Starting Final Handover Compilation..."

# 2. DEFINITIVE FILE LIST
$manifest = @(
    # --- CODE (The Solution) ---
    @{ Src = "masterpiece_candidate.tsx"; Dst = "code\SilverButton.tsx" },
    @{ Src = "src\masterpiece_candidate.tsx"; Dst = "code\SilverButton_Backup.tsx" }, # Try source location too just in case

    # --- ASSETS (Dependencies) ---
    @{ Src = "public\assets\logo.png"; Dst = "assets\logo.png" },

    # --- KNOWLEDGE (The "Why") ---
    @{ Src = "src\learnings\GUIDE_Viron_Button_Stack.md"; Dst = "knowledge\GUIDE_Viron_Button_Stack.md" },
    @{ Src = "src\learnings\PATTERN_Advanced_Shaders.md"; Dst = "knowledge\PATTERN_Advanced_Shader_Recipes.md" },
    @{ Src = "src\learnings\PATTERN_Viron_Hard_Won_Knowledge.md"; Dst = "knowledge\PATTERN_Viron_Hard_Won_Knowledge.md" },
    
    # --- BRAIN (The "How to Agent") ---
    @{ Src = "INITIALPROMPT_ORCHESTRATOR_ACTIVATION.md"; Dst = "brain\INITIALPROMPT_ORCHESTRATOR_ACTIVATION.md" },
    @{ Src = "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V3.md"; Dst = "brain\PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V3.md" },
    @{ Src = "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V4_FINAL.md"; Dst = "brain\PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V4_FINAL.md" },
    @{ Src = "PLAN_PROMPT_TEMPLATE_EVOLUTION.md"; Dst = "brain\PLAN_PROMPT_TEMPLATE_EVOLUTION.md" },
    @{ Src = "USER_GOVERNANCE_PROTOCOL.md"; Dst = "brain\USER_GOVERNANCE_PROTOCOL.md" },
    @{ Src = "gemini.md"; Dst = "brain\gemini.md" },
    @{ Src = "RULE_FILE_ANALYSIS_REPORT.md"; Dst = "brain\RULE_FILE_ANALYSIS_REPORT.md" },
    @{ Src = "HANDOVER_TO_NEW_AGENT.md"; Dst = "brain\HANDOVER_TO_NEW_AGENT.md" }
)

# 3. EXECUTE COPY
foreach ($item in $manifest) {
    # Check Root first
    $srcPath = "$root\$($item.Src)"
    
    if (-not (Test-Path $srcPath)) {
        # Check .agent/handover fallback
        $srcPath = "$root\.agent\handover\$($item.Src)"
    }
    
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination "$dest\$($item.Dst)" -Force
        Write-Output "  [OK] $($item.Dst)"
    }
    else {
        Write-Output "  [MISSING] $($item.Src)"
    }
}

Write-Output "Final Handover Compilation Complete."
