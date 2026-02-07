$root = "C:\Workspace\Repos\remotion-studio"
$dest = "$root\.agent\handover\AIStudio\remotion-new"

# 1. DELETE OLD FILE (The faulty "masterpiece_candidate/SilverButton")
if (Test-Path "$dest\code\SilverButton.tsx") {
    Remove-Item -Path "$dest\code\SilverButton.tsx" -Force
    Write-Output "  [REMOVED] Old SilverButton.tsx (Dec 17)"
}

# 2. COPY THE TRUE MASTER (V24 - Jan 22)
$masterSrc = "$root\src\my-lab\VironButton_V24_Master.tsx"
$masterDst = "$dest\code\SilverButton.tsx"

if (Test-Path $masterSrc) {
    Copy-Item -Path $masterSrc -Destination $masterDst -Force
    Write-Output "  [OK] SilverButton.tsx updated to V24 Master (Jan 22)"
}
else {
    Write-Output "  [CRITICAL ERROR] V24 Master not found at $masterSrc"
}

Write-Output "Gold Code Swap Complete."
