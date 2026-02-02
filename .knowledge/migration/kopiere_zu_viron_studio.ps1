# Viron Studio Migration Script
# Kopiert ausgewählte Dateien von remotion-studio nach Viron Studio
# Wichtig: NUR KOPIEREN - nichts wird gelöscht!

param(
    [string]$Quelle = "C:\Workspace\Repos\remotion-studio",
    [string]$Ziel = "C:\Workspace\Repos\Viron Studio"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Viron Studio Migration Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Quelle: $Quelle" -ForegroundColor Yellow
Write-Host "Ziel:   $Ziel" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Prüfe ob Ziel existiert, sonst erstelle es
if (!(Test-Path $Ziel)) {
    Write-Host "Erstelle Ziel-Ordner: $Ziel" -ForegroundColor Green
    New-Item -ItemType Directory -Path $Ziel -Force | Out-Null
}

# Log-Datei
$LogDatei = Join-Path $Ziel "migration_log_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt"
"Migration gestartet: $(Get-Date)" | Out-File $LogDatei
"Quelle: $Quelle" | Out-File $LogDatei -Append
"Ziel: $Ziel" | Out-File $LogDatei -Append
"==========================================" | Out-File $LogDatei -Append

# Funktion zum Kopieren mit Log
function Kopiere-Datei {
    param(
        [string]$Von,
        [string]$Nach,
        [string]$Beschreibung
    )
    
    $QuellPfad = Join-Path $Quelle $Von
    $ZielPfad = Join-Path $Ziel $Nach
    $ZielOrdner = Split-Path $ZielPfad -Parent
    
    if (Test-Path $QuellPfad) {
        # Erstelle Ziel-Ordner falls nicht existiert
        if (!(Test-Path $ZielOrdner)) {
            New-Item -ItemType Directory -Path $ZielOrdner -Force | Out-Null
            Write-Host "  [DIR] $ZielOrdner" -ForegroundColor DarkGray
        }
        
        # Kopiere Datei
        Copy-Item -Path $QuellPfad -Destination $ZielPfad -Force
        Write-Host "  [OK]  $Von -> $Nach" -ForegroundColor Green
        "[OK] $Von -> $Nach | $Beschreibung" | Out-File $LogDatei -Append
        return $true
    } else {
        Write-Host "  [FEHLT] $Von" -ForegroundColor Red
        "[FEHLT] $Von | $Beschreibung" | Out-File $LogDatei -Append
        return $false
    }
}

# ==========================================
# 1. SKILLS (unverändert kopieren)
# ==========================================
Write-Host ""
Write-Host "1. Kopiere Skills..." -ForegroundColor Magenta

Kopiere-Datei ".agent/skills/remotion-core/SKILL.md" ".agent/skills/remotion-core/SKILL.md" "Master Skill"
xcopy /E /I "$Quelle\.agent\skills\remotion-core" "$Ziel\.agent\skills\remotion-core" 2>$null
xcopy /E /I "$Quelle\.agent\skills\remotion-best-practices" "$Ziel\.agent\skills\remotion-best-practices" 2>$null
Write-Host "  [OK]  Skills kopiert" -ForegroundColor Green
"[OK] Alle Skills kopiert" | Out-File $LogDatei -Append

# ==========================================
# 2. VIRON-CORE (System-Dateien)
# ==========================================
Write-Host ""
Write-Host "2. Kopiere viron-core..." -ForegroundColor Magenta

$coreDateien = @(
    "vision.md",
    "pipeline.md",
    "workflow.md",
    "physics.md",
    "theme.md"
)

foreach ($datei in $coreDateien) {
    Kopiere-Datei "viron-core/$datei" "viron-core/$datei" "System: $datei"
}

# ==========================================
# 3. ROUTER & REGELN (Phase 6.0)
# ==========================================
Write-Host ""
Write-Host "3. Kopiere Router & Regeln..." -ForegroundColor Magenta

$routerDateien = @(
    ".agent/AGENTS.md",
    ".agent/RULES_CORE.md",
    ".agent/RULES_WORKFLOW.md",
    ".agent/RULES_TECHNICAL.md",
    ".agent/RULES_MIGRATION_GUIDE.md"
)

foreach ($datei in $routerDateien) {
    $zielName = $datei -replace ".agent/", ""
    Kopiere-Datei $datei $datei "Router/Regel: $zielName"
}

# ==========================================
# 4. TEMPLATES (Aktuell)
# ==========================================
Write-Host ""
Write-Host "4. Kopiere Templates..." -ForegroundColor Magenta

$templates = @(
    @(".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md", ".agent/templates/briefing-template-v6.1.md"),
    @(".knowledge/templates/EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md", ".agent/templates/extraction-report-template-v2.md"),
    @(".agent/handover/PROMPT_SUBAGENT_1_SKILL_BADGE_MAPPING_V2.md", ".agent/templates/prompt-skill-badge-mapping-v2.md"),
    @(".agent/handover/PROMPT_SUBAGENT_2_REPO_INFRASTRUCTURE_V2.md", ".agent/templates/prompt-repo-infrastructure-v2.md"),
    @(".agent/handover/PROMPT_SUBAGENT_V6.1_SELF_BRIEFING.md", ".agent/templates/prompt-self-briefing-v6.1.md")
)

foreach ($template in $templates) {
    Kopiere-Datei $template[0] $template[1] "Template"
}

# ==========================================
# 5. INDEXE & NAVIGATION
# ==========================================
Write-Host ""
Write-Host "5. Kopiere Indexe..." -ForegroundColor Magenta

$indexe = @(
    @(".knowledge/source-master-index.md", ".knowledge/index/source-master-index.md"),
    @(".agent/handover/INDEX_HYPERLINKS.md", ".knowledge/index/index-hyperlinks.md"),
    @(".agent/handover/implementation_plan.md", ".knowledge/index/implementation-plan.md"),
    @("Remotion Recherche/00-overview-index-v2-1-complete.md", ".knowledge/index/overview-index-v2.1.md"),
    @("Remotion Recherche/MASTER-INDEX-ALLE-13-DATEIEN-v1-0.md", ".knowledge/index/master-index-13-dateien.md")
)

foreach ($index in $indexe) {
    Kopiere-Datei $index[0] $index[1] "Index"
}

# ==========================================
# 6. LEARNINGS
# ==========================================
Write-Host ""
Write-Host "6. Kopiere Learnings..." -ForegroundColor Magenta

$learnings = @(
    @(".knowledge/project-learnings/LEARNING_V3_REPORT_STRUCTURE.md", ".knowledge/learnings/v3-report-structure.md"),
    @(".agent/handover/ANALYSIS_V3_VS_MY_WORK_LEARNINGS.md", ".knowledge/learnings/v3-vs-my-work.md"),
    @(".knowledge/mission/COMPARISON_BADGE_7_ALL_VERSIONS.md", ".knowledge/learnings/badge-7-comparison-v1-v5.md"),
    @(".knowledge/mission/EVOLUTION_V1_TO_V5_DIFF.md", ".knowledge/learnings/evolution-v1-to-v5.md")
)

foreach ($learning in $learnings) {
    Kopiere-Datei $learning[0] $learning[1] "Learning"
}

# ==========================================
# 7. REPORTS (Nur finale Versionen!)
# ==========================================
Write-Host ""
Write-Host "7. Kopiere Reports (finale Versionen)..." -ForegroundColor Magenta

$reports = @(
    @(".knowledge/mission/EXTRACTION_REPORT_BADGE_7_V5_ULTIMATE.md", ".knowledge/reports/badge-7-v5-ultimate.md"),
    @(".knowledge/mission/EXTRACTION_REPORT_BADGE_8.md", ".knowledge/reports/badge-8.md"),
    @(".knowledge/mission/EXTRACTION_REPORT_BADGE_6.md", ".knowledge/reports/badge-6.md")
)

foreach ($report in $reports) {
    Kopiere-Datei $report[0] $report[1] "Report"
}

# ==========================================
# 8. SPECS
# ==========================================
Write-Host ""
Write-Host "8. Kopiere Specs..." -ForegroundColor Magenta

$specs = @(
    "audio.md",
    "camera.md", 
    "website.md",
    "VIRON_SYSTEM_ENTRY.md"
)

foreach ($spec in $specs) {
    Kopiere-Datei "specs/$spec" "specs/$spec" "Spec: $spec"
}

# ==========================================
# 9. DOCS
# ==========================================
Write-Host ""
Write-Host "9. Kopiere Docs..." -ForegroundColor Magenta

$docs = @(
    @("docs/REPOSITORY_MANIFESTO.md", "docs/repository-manifesto.md"),
    @("docs/HUMAN_OPERATOR_GUIDE.md", "docs/human-operator-guide.md"),
    @("docs/TOKEN_BUDGET.md", "docs/token-budget.md")
)

foreach ($doc in $docs) {
    Kopiere-Datei $doc[0] $doc[1] "Doc"
}

# ==========================================
# 10. GUIDES
# ==========================================
Write-Host ""
Write-Host "10. Kopiere Guides..." -ForegroundColor Magenta

$guides = @(
    "compositions.md",
    "sequencing.md",
    "viron-button-guide.md"
)

foreach ($guide in $guides) {
    Kopiere-Datei "guides/$guide" "guides/$guide" "Guide: $guide"
}

# ==========================================
# 11. PATTERNS
# ==========================================
Write-Host ""
Write-Host "11. Kopiere Patterns..." -ForegroundColor Magenta

$patterns = @(
    "BarChart.md",
    "Typewriter.md",
    "WordHighlight.md"
)

foreach ($pattern in $patterns) {
    Kopiere-Datei "patterns/$pattern" "patterns/$pattern" "Pattern: $pattern"
}

# ==========================================
# 12. WICHTIGE RECHERCHE-DATEIEN
# ==========================================
Write-Host ""
Write-Host "12. Kopiere wichtige Recherche-Dateien..." -ForegroundColor Magenta

$recherche = @(
    # System
    @("Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md", "knowledge/research/system/folder-structure.md"),
    @("Remotion Recherche/23_ROUTING_MATRIX_Inputs.md", "knowledge/research/system/routing-inputs.md"),
    @("Remotion Recherche/24_ROUTING_MATRIX_Outputs.md", "knowledge/research/system/routing-outputs.md"),
    @("Remotion Recherche/00-master-workflow-2026-integration.md", "knowledge/index/master-workflow.md"),
    
    # Audio
    @("Remotion Recherche/40-audio-reaktiv-00-fft-frequenzspektren.md", "knowledge/research/audio/fft-frequenzspektren.md"),
    
    # Cloud
    @("Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md", "knowledge/research/cloud/aws-lambda-renderfarming.md"),
    
    # FX
    @("Remotion Recherche/30-post-processing-00-overview-postprocessing-stack.md", "knowledge/research/fx/postprocessing-overview.md"),
    @("Remotion Recherche/30-post-processing-01-bloom-selective.md", "knowledge/research/fx/bloom-selective.md"),
    @("Remotion Recherche/30-post-processing-02-depth-of-field.md", "knowledge/research/fx/depth-of-field.md"),
    @("Remotion Recherche/30-post-processing-03-04-chromatic-und-grain.md", "knowledge/research/fx/chromatic-grain.md"),
    
    # 3D
    @("Remotion Recherche/40-advanced-lighting-00-caustics-volumetric.md", "knowledge/research/3d/lighting-caustics-volumetric.md"),
    @("Remotion Recherche/40-gltf-models-00-loading-optimization.md", "knowledge/research/3d/gltf-loading-optimization.md")
)

foreach ($item in $recherche) {
    Kopiere-Datei $item[0] $item[1] "Recherche"
}

# ==========================================
# ZUSAMMENFASSUNG
# ==========================================
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Migration abgeschlossen!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Log-Datei: $LogDatei" -ForegroundColor Yellow
Write-Host ""
Write-Host "WICHTIG:" -ForegroundColor Red
Write-Host "- Es wurde nur KOPIERT, nichts gelöscht!" -ForegroundColor Red
Write-Host "- Das alte Repo ist unverändert!" -ForegroundColor Red
Write-Host "- Bitte prüfe das Log auf fehlende Dateien!" -ForegroundColor Yellow
Write-Host ""

"==========================================" | Out-File $LogDatei -Append
"Migration abgeschlossen: $(Get-Date)" | Out-File $LogDatei -Append
"==========================================" | Out-File $LogDatei -Append

Pause
