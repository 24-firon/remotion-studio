$root = "C:\Workspace\Repos\remotion-studio"
$dest = "$root\.agent\handover\AIStudio\remotion-new"

# 1. DELETE OLD FILE (Again, to be sure)
if (Test-Path "$dest\code\SilverButton.tsx") {
    Remove-Item -Path "$dest\code\SilverButton.tsx" -Force
}

# 2. COPY THE TRUE "HIGH PBR" MASTER (Jan 26)
$srcBtn = "$root\src\experiments\chrome-v3\ChromeButton_3_0_HighPBR.tsx"
$srcScene = "$root\src\experiments\chrome-v3\ChromeScene.tsx"

$dstBtn = "$dest\code\ChromeButton_HighPBR.tsx"
$dstScene = "$dest\code\ChromeScene.tsx"

if (Test-Path $srcBtn) {
    Copy-Item -Path $srcBtn -Destination $dstBtn -Force
    Write-Output "  [OK] ChromeButton_HighPBR.tsx (Jan 26 - The Real One)"
}
else {
    Write-Output "  [CRITICAL] ChromeButton source missing!"
}

if (Test-Path $srcScene) {
    Copy-Item -Path $srcScene -Destination $dstScene -Force
    Write-Output "  [OK] ChromeScene.tsx (Context)"
}

Write-Output "Final Gold Code Update Complete."
