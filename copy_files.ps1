$root = "C:\Workspace\Repos\remotion-studio"
$dest_pflicht = "$root\.agent\handover\AIStudio\Pflichtlektüre"
$dest_badge7 = "$root\.agent\handover\AIStudio\Badge - (7)"

# Create directories
New-Item -ItemType Directory -Force -Path $dest_pflicht | Out-Null
New-Item -ItemType Directory -Force -Path $dest_badge7 | Out-Null

$file_operations = @(
    # Pflichtlektüre
    @{ Src = ".agent/AGENTS.md"; Dest = "$dest_pflicht" }
    @{ Src = ".agent/RULES_CORE.md"; Dest = "$dest_pflicht" }
    @{ Src = ".agent/RULES_WORKFLOW.md"; Dest = "$dest_pflicht" }
    @{ Src = ".agent/RULES_TECHNICAL.md"; Dest = "$dest_pflicht" }
    @{ Src = ".agent/RULES_MIGRATION_GUIDE.md"; Dest = "$dest_pflicht" }
    @{ Src = "viron-core/vision.md"; Dest = "$dest_pflicht" }
    @{ Src = "THE_VIRON_AESTHETIC_MANIFESTO.md"; Dest = "$dest_pflicht" }
    @{ Src = "src/PROJECT_RULES_LIGHTING.md"; Dest = "$dest_pflicht" }
    @{ Src = ".agent/handover/task.md"; Dest = "$dest_pflicht" }
    @{ Src = ".agent/handover/implementation_plan.md"; Dest = "$dest_pflicht" }
    @{ Src = "VIRON_STUDIO_INDEX.md"; Dest = "$dest_pflicht" }
    @{ Src = ".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md"; Dest = "$dest_pflicht\SUBAGENT_BRIEFING_TEMPLATE_V8.0.md" }
    @{ Src = ".agent/workflows/orchestrator-self-audit.md"; Dest = "$dest_pflicht\ORCHESTRATOR_SELF_AUDIT_PROTOCOL.md" }
    @{ Src = ".agent/skills/remotion-core-skill-source/SKILL.md"; Dest = "$dest_pflicht" }
    @{ Src = "Remotion Recherche/00-master-workflow-2026-integration.md"; Dest = "$dest_pflicht" }

    # Badge 7
    @{ Src = ".agent/RULES_TECHNICAL.md"; Dest = "$dest_badge7\RULES_TECHNICAL.md" }
    @{ Src = ".agent/RULES_WORKFLOW.md"; Dest = "$dest_badge7\RULES_WORKFLOW.md" }
    @{ Src = ".agent/workflows/release.md"; Dest = "$dest_badge7\RELEASE_PROTOCOL.md" }
    @{ Src = ".agent/workflows/session-close.md"; Dest = "$dest_badge7\SESSION_CLOSE_WORKFLOW.md" }
    @{ Src = "viron-core/pipeline.md"; Dest = "$dest_badge7" }
    @{ Src = "viron-core/troubleshooting.md"; Dest = "$dest_badge7" }
    @{ Src = "Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md"; Dest = "$dest_badge7" }
    @{ Src = "Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md"; Dest = "$dest_badge7" }
    @{ Src = "Remotion Recherche/23_ROUTING_MATRIX_Inputs.md"; Dest = "$dest_badge7" }
    @{ Src = "Remotion Recherche/24_ROUTING_MATRIX_Outputs.md"; Dest = "$dest_badge7" }
    @{ Src = "Remotion Recherche/20_ARCHIVE_Standard_Dynamic_Data_Supabase.md"; Dest = "$dest_badge7" }
    @{ Src = "src/V43_MASTER_PLAN.md"; Dest = "$dest_badge7" }
    @{ Src = "src/V43_STRATEGY.md"; Dest = "$dest_badge7" }
    @{ Src = "Remotion Recherche/ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md"; Dest = "$dest_badge7" }
    @{ Src = "Remotion Recherche/ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB-v1-0.md"; Dest = "$dest_badge7" }
    @{ Src = "Remotion Recherche/ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION-v1-0.md"; Dest = "$dest_badge7" }
)

foreach ($op in $file_operations) {
    $srcPath = Join-Path $root $op.Src
    $destPath = $op.Dest
    
    if (Test-Path $srcPath) {
        Write-Output "Copying $srcPath to $destPath"
        Copy-Item -Path $srcPath -Destination $destPath -Force
    }
    else {
        Write-Output "ERROR: Source file not found: $srcPath"
    }
}

Write-Output "Copy operation complete."
