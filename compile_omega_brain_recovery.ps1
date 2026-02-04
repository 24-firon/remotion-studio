$root = "C:\Workspace\Repos\remotion-studio"
$dest_brain = "$root\.agent\handover\AIStudio\brain\Data"

$recovery_map = @(
    @{ 
        DestName = "THE_ORCHESTRATORS_BADGE_CYCLE.md"; 
        SrcPath  = ".agent/workflows/orchestrate-badge-cycle.md" 
    },
    @{ 
        DestName = "WORKFLOW_SUBAGENT_DEPLOYMENT.md"; 
        SrcPath  = ".agent/workflows/deploy-subagent-mission.md" 
    },
    @{ 
        DestName = "SUBAGENT_PROMPT_1_SKILL_BADGE_MAPPING.md"; 
        SrcPath  = ".agent/handover/AIStudio/PROMPT_SUBAGENT_1_SKILL_BADGE_MAPPING.md" 
    },
    @{ 
        DestName = "SUBAGENT_PROMPT_2_REPO_INFRASTRUCTURE.md"; 
        SrcPath  = ".agent/handover/AIStudio/PROMPT_SUBAGENT_2_REPO_INFRASTRUCTURE.md" 
    },
    @{ 
        DestName = "EXTRACTION_REPORT_BADGE_7_CODEX_V7_FINAL.md"; 
        SrcPath  = ".knowledge/mission/EXTRACTION_REPORT_BADGE_7_V5_ULTIMATE.md" 
    },
    @{ 
        DestName = "70-web-accessibility-wcag-2026-compliance.md"; 
        SrcPath  = "Remotion Recherche/70-web-accessibility-wcag-2026.md" 
    },
    @{ 
        DestName = "SKILL-INSTALLATION-GUIDE-v1.md"; 
        SrcPath  = "Remotion Recherche/SKILL-INSTALLATION-GUIDE-v1-0.md" 
    },
    @{ 
        DestName = "VIRON-DELTA-SKILL-STRUCTURE-v1.md"; 
        SrcPath  = "Remotion Recherche/VIRON-DELTA-SKILL-STRUCTURE-v1-0.md" 
    },
    @{ 
        DestName = "COMPARE-AGENT-PROMPT-TEMPLATE-v1.md"; 
        SrcPath  = "Remotion Recherche/COMPARE-AGENT-PROMPT-TEMPLATE-v1-0.md" 
    }
)

Write-Output "Starting Recovery Compilation..."

foreach ($item in $recovery_map) {
    $fullSrc = Join-Path $root $item.SrcPath
    $fullDest = Join-Path $dest_brain $item.DestName
    
    if (Test-Path $fullSrc) {
        Copy-Item -Path $fullSrc -Destination $fullDest -Force
        Write-Output "  [RECOVERED] $($item.DestName) (from $($item.SrcPath))"
    }
    else {
        Write-Output "  [FAILED] Could not recover $($item.DestName) at $fullSrc"
    }
}
