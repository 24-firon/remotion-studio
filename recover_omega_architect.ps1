$root = "C:\Workspace\Repos\remotion-studio"
$dest_architect = "$root\.agent\handover\AIStudio\Omega_Onboarding\Architect"
$brain_data = "$root\.agent\handover\AIStudio\brain\Data"

# 1. Recover V8.5 from Brain Data (where V7 Final is stored)
$v7Path = "$brain_data\EXTRACTION_REPORT_BADGE_7_CODEX_V7_FINAL.md"
if (Test-Path $v7Path) {
    Copy-Item -Path $v7Path -Destination "$dest_architect\EXTRACTION_REPORT_BADGE_7_CODEX_V8.5.md" -Force
    Write-Output "  [RECOVERED] EXTRACTION_REPORT_BADGE_7_CODEX_V8.5.md (from Brain Data V7)"
}
else {
    Write-Output "  [FAILED] Could not find V7 Final in Brain Data to promote to V8.5"
}

# 2. Check for Manifesto in Brain Data or Root
$manifesto = "$dest_architect\VIRON_OMEGA_MANIFESTO.md"
if (-not (Test-Path $manifesto)) {
    # Try finding typical manifesto files
    $candidates = @(
        "$root\VIRON_OMEGA_MANIFESTO.md",
        "$brain_data\VIRON_OMEGA_MANIFESTO.md",
        "$root\THE_VIRON_AESTHETIC_MANIFESTO.md" # Fallback check, though likely distinct
    )
    foreach ($c in $candidates) {
        if (Test-Path $c) {
            # if valid candidate found and it's NOT the aesthetic manifesto (unless requested as synonym)
            # User list has BOTH VIRON_OMEGA_MANIFESTO and THE_VIRON_AESTHETIC_MANIFESTO.
            # So they are likely different. If Omega Manifesto is missing, we report it.
            if ($c -match "VIRON_OMEGA_MANIFESTO") {
                Copy-Item -Path $c -Destination $manifesto -Force
                Write-Output "  [RECOVERED] VIRON_OMEGA_MANIFESTO.md"
                break
            }
        }
    }
}
