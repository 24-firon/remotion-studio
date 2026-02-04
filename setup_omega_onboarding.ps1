$root = "C:\Workspace\Repos\remotion-studio"
$onboarding_root = "$root\.agent\handover\AIStudio\Omega_Onboarding"
$trash_path = "$onboarding_root\_TRASH"
$stage1_path = "$onboarding_root\Stage_1_Constitution"
$stage2_path = "$onboarding_root\Stage_2_Blueprint"
$stage3_path = "$onboarding_root\Stage_3_Library"
$stage4_path = "$onboarding_root\Stage_4_Raw_Gold"

# 1. Create Directories
$dirs = @($trash_path, $stage1_path, $stage2_path, $stage3_path, $stage4_path)
foreach ($d in $dirs) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
}

# 2. Define Prompts Content
$prompt1 = @"
# 🚀 ONBOARDING STUFE 1: DIE VERFASSUNG

Du bist der Viron Omega Orchestrator. Deine erste Aufgabe ist die Ingestierung der System-Gesetze.

**DEIN AUFTRAG:**
1. Lies die 7 hochgeladenen "Verfassungs-Dateien".
2. Erstelle eine **Zusammenfassung der 5 wichtigsten Gesetze** des Viron-Systems (z.B. "No-CSS Law", "RAM/2 Formel", "Double-Turn-Lock").
3. Bestätige: "Ich habe die Verfassung verinnerlicht. Ich bin bereit für Stufe 2."

🛑 **STOPPE DANACH.**
"@

$prompt2 = @"
# 🚀 ONBOARDING STUFE 2: DER BAUPLAN

Stufe 1 ist abgeschlossen. Lade jetzt diese 5 Architektur-Dokumente.

**DEIN AUFTRAG:**
1. Lies die 5 "Bauplan-Dateien".
2. Erkläre mir in deinen Worten die **Abhängigkeits-Kaskade**: Warum muss Badge 7 vor Badge 1 gemacht werden? Warum kommt Badge 8 zum Schluss?
3. Analysiere den Badge 7 Codex: Was macht ihn zum "Gold-Standard"? (Nenne 3 konkrete Punkte: z.B. Code-Integrität).
4. Bestätige: "Ich habe den Bauplan verstanden. Ich bin bereit für Stufe 3."

🛑 **STOPPE DANACH.**
"@

$prompt3 = @"
# 🚀 ONBOARDING STUFE 3: DIE BIBLIOTHEK

Lade jetzt die Skill-Bibliothek.

**DEIN AUFTRAG:**
1. Lies alle hochgeladenen Skill-Dateien.
2. Erstelle eine **"Delta-Tabelle"**:
   - Nenne 5 Beispiele für Viron-spezifisches Wissen (aus Stufe 1&2), das NICHT in diesen Skills steht.
   - Nenne 5 Beispiele für Standard-Wissen, das in diesen Skills steht.
3. Bestätige: "Ich kann jetzt zwischen Viron-IP und Standard-Wissen unterscheiden. Ich bin bereit für Stufe 4."

🛑 **STOPPE DANACH.**
"@

$prompt4 = @"
# 🚀 ONBOARDING STUFE 4: DAS ROH-GOLD & AKTIVIERUNG

Die Vorbereitung ist abgeschlossen. Du hast die Gesetze, den Plan und die Werkzeuge.

**DEIN AUFTRAG:**
1. Nimm dein gesamtes Wissen aus Stufe 1, 2 und 3.
2. Beginne mit der **Badge Extraction Campaign**.
3. Starte mit **Badge 1 (Core Engine)**. Nutze die 2-Phasen-Prompts (Ingestion/Briefing -> Codex).
4. Wende die "Delta-Logik" aus Stufe 3 an, um nur Viron-IP zu extrahieren.

**Beginne jetzt mit der Arbeit an Badge 1.**
"@

# 3. Create Prompt Files
$prompt1 | Out-File -Encoding UTF8 -FilePath "$stage1_path\PROMPT_STAGE_1.md"
$prompt2 | Out-File -Encoding UTF8 -FilePath "$stage2_path\PROMPT_STAGE_2.md"
$prompt3 | Out-File -Encoding UTF8 -FilePath "$stage3_path\PROMPT_STAGE_3.md"
$prompt4 | Out-File -Encoding UTF8 -FilePath "$stage4_path\PROMPT_STAGE_4.md"

# 4. Define File Mappings
# Helper function to find file
function Copy-Smart {
    param($relativePath, $dest)
    $smartPath = $null
    
    # Try logic from previous scripts
    # 1. Exact path
    $p1 = Join-Path $root $relativePath
    if (Test-Path $p1) { $smartPath = $p1 }
    
    # 2. Handover caches (Pflichtlektüre/Badge 8)
    if (-not $smartPath) {
        $cache1 = "$root\.agent\handover\AIStudio\Pflichtlektüre"
        $cache2 = "$root\.agent\handover\AIStudio\Badge - (8)"
        $fname = Split-Path $relativePath -Leaf
        if (Test-Path "$cache1\$fname") { $smartPath = "$cache1\$fname" }
        elseif (Test-Path "$cache2\$fname") { $smartPath = "$cache2\$fname" }
    }
    
    # 3. System Cache
    if (-not $smartPath -and $fname -eq "VIRON_KNOWLEDGE_BRIDGE.md") {
        $p = "$root\.agent\handover\AIStudio\System\VIRON_KNOWLEDGE_BRIDGE.md"
        if (Test-Path $p) { $smartPath = $p }
    }
    
    # 4. Brain Data Cache (where we compiled everything just now!)
    if (-not $smartPath) {
        $brainPath = "$root\.agent\handover\AIStudio\brain\Data"
        if (Test-Path "$brainPath\$fname") { $smartPath = "$brainPath\$fname" }
    }


    if ($smartPath) {
        Copy-Item -Path $smartPath -Destination $dest -Force
        Write-Output "  [OK] $relativePath"
    }
    else {
        Write-Output "  [MISSING] $relativePath"
    }
}

Write-Output "Processing Trash Batch..."
$trash_files = @(
    "Remotion Recherche/MIGRATION-33-DATEIEN-KONSOLIDIEREN-v1-0.md",
    "Remotion Recherche/25_AGENT_Migration_Order.md",
    "FINAL_CORRECTION_REPORT.md",
    "RULE_PATH_CORRECTIONS_REPORT.md",
    "Remotion Recherche/LUECKEN-AUDIT-v2-1-complete-coverage.md",
    "Remotion Recherche/STATUS-DEPRECATION-REPORT-v2-1.md",
    "Remotion Recherche/MASTER-INDEX-ALLE-13-DATEIEN-v1-0.md",
    "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V3.md",
    "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V1.md",
    "PROMPT_ORCHESTRATOR_BADGE_REAUDIT_V2.md",
    ".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V6.1.md",
    "Remotion Recherche/COMPARE-AGENT-PROMPT-TEMPLATE-v1-0.md"
)
foreach ($f in $trash_files) { Copy-Smart $f $trash_path }

Write-Output "`nProcessing Stage 1..."
$stage1_files = @(
    ".agent/AGENTS.md",
    ".agent/RULES_CORE.md",
    ".agent/RULES_WORKFLOW.md",
    ".agent/RULES_TECHNICAL.md",
    "THE_VIRON_AESTHETIC_MANIFESTO.md",
    "VIRON_KNOWLEDGE_BRIDGE.md",
    ".agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V8.0.md"
)
foreach ($f in $stage1_files) { Copy-Smart $f $stage1_path }

Write-Output "`nProcessing Stage 2..."
$stage2_files = @(
    "viron-core/vision.md",
    ".agent/handover/implementation_plan.md",
    "VIRON_STUDIO_INDEX.md",
    "Remotion Recherche/00-master-workflow-2026-integration.md",
    "EXTRACTION_REPORT_BADGE_7_CODEX_V7_FINAL.md"
)
foreach ($f in $stage2_files) { Copy-Smart $f $stage2_path }

Write-Output "`nProcessing Stage 3..."
# Special handling for skills to flatten folder structure if needed or just copy files
Copy-Smart ".agent/skills/remotion-core-skill-source/SKILL.md" $stage3_path
# Copy all rule files from best-practices
$bp_rules = "$root\.agent\skills\remotion-best-practices\rules"
Get-ChildItem -Path $bp_rules -Filter "*.md" | Copy-Item -Destination $stage3_path -Force
Write-Output "  [OK] Copied all Best Practice Rules"

Write-Output "`nProcessing Stage 4..."
# Special handling for Stage 4: "All Remotion Recherche", "specs", "guides", "patterns"
# We exclude files already in Stage 1/2/Trash to stay clean, or mostly clean.
$s4_dirs = @("Remotion Recherche", "specs", "guides", "patterns", "src/learnings")
foreach ($dir in $s4_dirs) {
    if ($dir -eq "src/learnings") {
        # src/learnings handling
        Get-ChildItem -Path "$root\src\learnings" -Filter "*.md" | Copy-Item -Destination $stage4_path -Force
    }
    else {
        $fullDirPath = Join-Path $root $dir
        if (Test-Path $fullDirPath) {
            Get-ChildItem -Path $fullDirPath -Filter "*.md" -Recurse | Copy-Item -Destination $stage4_path -Force
        }
    }
}
# V43 files
Copy-Smart "src/V43_MASTER_PLAN.md" $stage4_path
Copy-Smart "src/V43_STRATEGY.md" $stage4_path

Write-Output "`nOmega Onboarding Setup Complete."
