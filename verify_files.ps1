$root = "C:\Workspace\Repos\remotion-studio"
$missing = @()

$files_list1 = @(
    ".agent/AGENTS.md",
    ".agent/RULES_CORE.md",
    ".agent/RULES_WORKFLOW.md",
    ".agent/RULES_TECHNICAL.md",
    ".agent/RULES_MIGRATION_GUIDE.md",
    "viron-core/vision.md",
    "THE_VIRON_AESTHETIC_MANIFESTO.md",
    "src/PROJECT_RULES_LIGHTING.md",
    ".agent/handover/task.md",
    ".agent/handover/implementation_plan.md",
    "VIRON_STUDIO_INDEX.md",
    ".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V8.0.md",
    "ORCHESTRATOR_SELF_AUDIT_PROTOCOL.md",
    "remotion-core/SKILL.md",
    "Remotion Recherche/00-master-workflow-2026-integration.md"
)

$files_list2 = @(
    "RULES_TECHNICAL.md",
    "RULES_WORKFLOW.md",
    "RELEASE_PROTOCOL.md",
    "SESSION_CLOSE_WORKFLOW.md",
    "viron-core/pipeline.md",
    "viron-core/troubleshooting.md",
    "Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md",
    "Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md",
    "Remotion Recherche/23_ROUTING_MATRIX_Inputs.md",
    "Remotion Recherche/24_ROUTING_MATRIX_Outputs.md",
    "Remotion Recherche/20_ARCHIVE_Standard_Dynamic_Data_Supabase.md",
    "src/V43_MASTER_PLAN.md",
    "src/V43_STRATEGY.md",
    "Remotion Recherche/ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md",
    "Remotion Recherche/ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB-v1-0.md",
    "Remotion Recherche/ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION-v1-0.md"
)

Write-Output "Checking List 1 (Destination: Pflichtlektüre)..."
foreach ($file in $files_list1) {
    if (-not (Test-Path "$root\$file")) {
        Write-Output "MISSING: $file"
        $missing += $file
    }
    else {
        Write-Output "OK: $file"
    }
}

Write-Output "`nChecking List 2 (Destination: Badge 7)..."
foreach ($file in $files_list2) {
    if (-not (Test-Path "$root\$file")) {
        Write-Output "MISSING: $file"
        $missing += $file
    }
    else {
        Write-Output "OK: $file"
    }
}

if ($missing.Count -eq 0) {
    Write-Output "`nAll files found."
}
else {
    Write-Output "`nFound $($missing.Count) missing files."
}
