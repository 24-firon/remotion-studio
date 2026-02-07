$root = "C:\Workspace\Repos\remotion-studio"
$dest = "$root\.agent\handover\AIStudio\remotion-new\HANDSHAKE_ARTIFACTS"

# Create destination directory
New-Item -ItemType Directory -Force -Path $dest | Out-Null
New-Item -ItemType Directory -Force -Path "$dest\assets" | Out-Null

$handshake_files = @(
    # 1. The CODE that works (The "SilverButton")
    @{ Src = "src/masterpiece_candidate.tsx"; Dst = "SilverButton.tsx" },
    
    # 2. The KNOWLEDGE (Why it works)
    @{ Src = "src/learnings/GUIDE_Viron_Button_Stack.md"; Dst = "GUIDE_Viron_Button_Stack.md" },
    @{ Src = "src/learnings/PATTERN_Advanced_Shaders.md"; Dst = "PATTERN_Advanced_Shader_Recipes.md" },
    @{ Src = "src/learnings/PATTERN_Viron_Hard_Won_Knowledge.md"; Dst = "PATTERN_Viron_Hard_Won_Knowledge.md" },
    
    # 3. The ASSETS (Required for it to work)
    @{ Src = "public/assets/logo.png"; Dst = "assets/logo.png" }
)

Write-Output "Packaging Handshake Artifacts (Gold Only)..."

foreach ($file in $handshake_files) {
    $srcPath = "$root\$($file.Src)"
    $dstPath = "$dest\$($file.Dst)"
    
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Output "  [PACKED] $($file.Dst)"
    }
    else {
        Write-Output "  [ERROR] Source missing: $($file.Src)"
    }
}

Write-Output "Handshake Package Complete."
