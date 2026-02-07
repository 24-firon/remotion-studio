$root = "C:\Workspace\Repos\learnings"
$dest = "C:\Workspace\Repos\remotion-studio\.agent\handover\AIStudio\remotion-new\knowledge"

# Ensure destination exists
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$learnings_files = @(
    "PATTERN_REALISTIC_SILVER_METAL.md",
    "002-hdri-shading-success.md"
)

Write-Output "Copying Latest Knowledge from 'learnings'..."

foreach ($f in $learnings_files) {
    if (Test-Path "$root\$f") {
        Copy-Item -Path "$root\$f" -Destination "$dest\$f" -Force
        Write-Output "  [OK] $f (NEWER: Jan 22)"
    }
    else {
        Write-Output "  [MISSING] $f"
    }
}

Write-Output "Learnings Integration Complete."
