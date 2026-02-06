$root = "C:\Workspace\Repos\remotion-studio"
$dest = "$root\.agent\handover\AIStudio\remotion-new"

# Create destination directory
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$files_to_copy = @(
    # 1. Intelligent Architecture & Prompts
    "INITIALPROMPT_ORCHESTRATOR_ACTIVATION.md",
    "PLAN_PROMPT_TEMPLATE_EVOLUTION.md",
    "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V3.md",
    "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V4_FINAL.md",
    "HANDOVER_TO_NEW_AGENT.md",
    "NEXT_ORCHESTRATOR_PROMPT.md",

    # 2. Technical Patterns & Reports
    "RULE_FILE_ANALYSIS_REPORT.md",
    "HANDOVER_RemotionStudio_IDE_Behaviors.md",
    "audit_results.txt",
    "content_diff_report.txt",

    # 3. Governance & Protocols
    "USER_GOVERNANCE_PROTOCOL.md",
    "gemini.md",
    "HANDOVER_SilverV2.md"
)

Write-Output "Copying Potential Files to 'remotion-new'..."

foreach ($f in $files_to_copy) {
    if (Test-Path "$root\$f") {
        Copy-Item -Path "$root\$f" -Destination "$dest\$f" -Force
        Write-Output "  [OK] $f"
    }
    else {
        # Check in .agent/handover if not in root
        if (Test-Path "$root\.agent\handover\$f") {
            Copy-Item -Path "$root\.agent\handover\$f" -Destination "$dest\$f" -Force
            Write-Output "  [OK] $f (from handover)"
        }
        else {
            Write-Output "  [MISSING] $f"
        }
    }
}

Write-Output "Operation Complete."
