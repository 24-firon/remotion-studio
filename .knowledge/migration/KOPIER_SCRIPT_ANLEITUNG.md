# Kopier-Script für Viron Studio

## Anleitung

1. **Neue Datei erstellen:** `kopiere_zu_viron_studio.ps1`
2. **Den Code unten kopieren und einfügen**
3. **Rechtsklick → "Mit PowerShell ausführen"**

---

## Der PowerShell-Code

```powershell
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
    Kopiere-Datei $datei $datei "Router/Regel"
}

# ==========================================
# 4. TEMPLATES (Aktuell)
# ==========================================
Write-Host ""
Write-Host "4. Kopiere Templates..." -ForegroundColor Magenta

Kopiere-Datei ".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md" ".agent/templates/briefing-template-v6.1.md" "Template"
Kopiere-Datei ".knowledge/templates/EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md" ".agent/templates/extraction-report-template-v2.md" "Template"
Kopiere-Datei ".agent/handover/PROMPT_SUBAGENT_1_SKILL_BADGE_MAPPING_V2.md" ".agent/templates/prompt-skill-badge-mapping-v2.md" "Template"
Kopiere-Datei ".agent/handover/PROMPT_SUBAGENT_2_REPO_INFRASTRUCTURE_V2.md" ".agent/templates/prompt-repo-infrastructure-v2.md" "Template"
Kopiere-Datei ".agent/handover/PROMPT_SUBAGENT_V6.1_SELF_BRIEFING.md" ".agent/templates/prompt-self-briefing-v6.1.md" "Template"

# ==========================================
# 5. INDEXE & NAVIGATION
# ==========================================
Write-Host ""
Write-Host "5. Kopiere Indexe..." -ForegroundColor Magenta

Kopiere-Datei ".knowledge/source-master-index.md" ".knowledge/index/source-master-index.md" "Index"
Kopiere-Datei ".agent/handover/INDEX_HYPERLINKS.md" ".knowledge/index/index-hyperlinks.md" "Index"
Kopiere-Datei ".agent/handover/implementation_plan.md" ".knowledge/index/implementation-plan.md" "Index"
Kopiere-Datei "Remotion Recherche/00-overview-index-v2-1-complete.md" ".knowledge/index/overview-index-v2.1.md" "Index"
Kopiere-Datei "Remotion Recherche/MASTER-INDEX-ALLE-13-DATEIEN-v1-0.md" ".knowledge/index/master-index-13-dateien.md" "Index"

# ==========================================
# 6. LEARNINGS
# ==========================================
Write-Host ""
Write-Host "6. Kopiere Learnings..." -ForegroundColor Magenta

Kopiere-Datei ".knowledge/project-learnings/LEARNING_V3_REPORT_STRUCTURE.md" ".knowledge/learnings/v3-report-structure.md" "Learning"
Kopiere-Datei ".agent/handover/ANALYSIS_V3_VS_MY_WORK_LEARNINGS.md" ".knowledge/learnings/v3-vs-my-work.md" "Learning"
Kopiere-Datei ".knowledge/mission/COMPARISON_BADGE_7_ALL_VERSIONS.md" ".knowledge/learnings/badge-7-comparison-v1-v5.md" "Learning"
Kopiere-Datei ".knowledge/mission/EVOLUTION_V1_TO_V5_DIFF.md" ".knowledge/learnings/evolution-v1-to-v5.md" "Learning"

# ==========================================
# 7. REPORTS (Nur finale Versionen!)
# ==========================================
Write-Host ""
Write-Host "7. Kopiere Reports (finale Versionen)..." -ForegroundColor Magenta

Kopiere-Datei ".knowledge/mission/EXTRACTION_REPORT_BADGE_7_V5_ULTIMATE.md" ".knowledge/reports/badge-7-v5-ultimate.md" "Report"
Kopiere-Datei ".knowledge/mission/EXTRACTION_REPORT_BADGE_8.md" ".knowledge/reports/badge-8.md" "Report"
Kopiere-Datei ".knowledge/mission/EXTRACTION_REPORT_BADGE_6.md" ".knowledge/reports/badge-6.md" "Report"

# ==========================================
# 8. SPECS
# ==========================================
Write-Host ""
Write-Host "8. Kopiere Specs..." -ForegroundColor Magenta

Kopiere-Datei "specs/audio.md" "specs/audio.md" "Spec"
Kopiere-Datei "specs/camera.md" "specs/camera.md" "Spec"
Kopiere-Datei "specs/website.md" "specs/website.md" "Spec"
Kopiere-Datei "specs/VIRON_SYSTEM_ENTRY.md" "specs/viron-system-entry.md" "Spec"

# ==========================================
# 9. DOCS
# ==========================================
Write-Host ""
Write-Host "9. Kopiere Docs..." -ForegroundColor Magenta

Kopiere-Datei "docs/REPOSITORY_MANIFESTO.md" "docs/repository-manifesto.md" "Doc"
Kopiere-Datei "docs/HUMAN_OPERATOR_GUIDE.md" "docs/human-operator-guide.md" "Doc"
Kopiere-Datei "docs/TOKEN_BUDGET.md" "docs/token-budget.md" "Doc"

# ==========================================
# 10. GUIDES
# ==========================================
Write-Host ""
Write-Host "10. Kopiere Guides..." -ForegroundColor Magenta

Kopiere-Datei "guides/compositions.md" "guides/compositions.md" "Guide"
Kopiere-Datei "guides/sequencing.md" "guides/sequencing.md" "Guide"
Kopiere-Datei "guides/viron-button-guide.md" "guides/viron-button-guide.md" "Guide"

# ==========================================
# 11. PATTERNS
# ==========================================
Write-Host ""
Write-Host "11. Kopiere Patterns..." -ForegroundColor Magenta

Kopiere-Datei "patterns/BarChart.md" "patterns/BarChart.md" "Pattern"
Kopiere-Datei "patterns/Typewriter.md" "patterns/Typewriter.md" "Pattern"
Kopiere-Datei "patterns/WordHighlight.md" "patterns/WordHighlight.md" "Pattern"

# ==========================================
# 12. WICHTIGE RECHERCHE-DATEIEN
# ==========================================
Write-Host ""
Write-Host "12. Kopiere wichtige Recherche-Dateien..." -ForegroundColor Magenta

# System
Kopiere-Datei "Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md" "knowledge/research/system/folder-structure.md" "Recherche"
Kopiere-Datei "Remotion Recherche/23_ROUTING_MATRIX_Inputs.md" "knowledge/research/system/routing-inputs.md" "Recherche"
Kopiere-Datei "Remotion Recherche/24_ROUTING_MATRIX_Outputs.md" "knowledge/research/system/routing-outputs.md" "Recherche"
Kopiere-Datei "Remotion Recherche/00-master-workflow-2026-integration.md" "knowledge/index/master-workflow.md" "Recherche"

# Audio
Kopiere-Datei "Remotion Recherche/40-audio-reaktiv-00-fft-frequenzspektren.md" "knowledge/research/audio/fft-frequenzspektren.md" "Recherche"

# Cloud
Kopiere-Datei "Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md" "knowledge/research/cloud/aws-lambda-renderfarming.md" "Recherche"

# FX
Kopiere-Datei "Remotion Recherche/30-post-processing-00-overview-postprocessing-stack.md" "knowledge/research/fx/postprocessing-overview.md" "Recherche"
Kopiere-Datei "Remotion Recherche/30-post-processing-01-bloom-selective.md" "knowledge/research/fx/bloom-selective.md" "Recherche"
Kopiere-Datei "Remotion Recherche/30-post-processing-02-depth-of-field.md" "knowledge/research/fx/depth-of-field.md" "Recherche"
Kopiere-Datei "Remotion Recherche/30-post-processing-03-04-chromatic-und-grain.md" "knowledge/research/fx/chromatic-grain.md" "Recherche"

# 3D
Kopiere-Datei "Remotion Recherche/40-advanced-lighting-00-caustics-volumetric.md" "knowledge/research/3d/lighting-caustics-volumetric.md" "Recherche"
Kopiere-Datei "Remotion Recherche/40-gltf-models-00-loading-optimization.md" "knowledge/research/3d/gltf-loading-optimization.md" "Recherche"

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
```

---

## Was das Script macht

1. **Erstellt Ordnerstruktur** automatisch
2. **Kopiert ~60 Dateien** in die richtigen Unterordner
3. **Erstellt ein Log** mit allen Aktionen
4. **Zeigt Fehler** an falls Dateien fehlen
5. **NUR KOPIEREN** - löscht nichts!

---

## Nach dem Kopieren

Prüfe die Log-Datei im Ziel-Ordner:
```
C:\Workspace\Repos\Viron Studio\migration_log_YYYYMMDD_HHMMSS.txt
```

Dort steht drin:
- Welche Dateien erfolgreich kopiert wurden
- Welche Dateien nicht gefunden wurden (falls vorhanden)

---

**WICHTIG:** Das Script ist auf Nummer sicher - es löscht im Quell-Repo NICHTS!
