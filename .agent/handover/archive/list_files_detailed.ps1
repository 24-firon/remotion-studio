# PowerShell-Skript: Detaillierte Dateiübersicht für .agent/handover/
# Zeigt: Name, Größe (KB), Erstellungsdatum, Änderungsdatum, Pfad

Write-Host "`n=== DATEI-INVENTAR: .agent/handover/ ===`n" -ForegroundColor Cyan

$files = Get-ChildItem -Path ".agent\handover" -File | Sort-Object LastWriteTime -Descending

$results = $files | ForEach-Object {
    [PSCustomObject]@{
        Name = $_.Name
        SizeKB = [math]::Round($_.Length / 1KB, 2)
        Created = $_.CreationTime.ToString("yyyy-MM-dd HH:mm")
        Modified = $_.LastWriteTime.ToString("yyyy-MM-dd HH:mm")
        Path = $_.FullName.Replace($PWD.Path, ".")
    }
}

$results | Format-Table -AutoSize

Write-Host "`nGesamtanzahl Dateien: $($files.Count)" -ForegroundColor Green
Write-Host "`n=== ARCHIV-ORDNER (.agent/handover/archive/) ===`n" -ForegroundColor Yellow

$archiveFiles = Get-ChildItem -Path ".agent\handover\archive" -File -ErrorAction SilentlyContinue
if ($archiveFiles) {
    $archiveFiles | ForEach-Object {
        [PSCustomObject]@{
            Name = $_.Name
            SizeKB = [math]::Round($_.Length / 1KB, 2)
            Created = $_.CreationTime.ToString("yyyy-MM-dd HH:mm")
            Modified = $_.LastWriteTime.ToString("yyyy-MM-dd HH:mm")
        }
    } | Format-Table -AutoSize
} else {
    Write-Host "(Archiv-Ordner ist leer)" -ForegroundColor Gray
}

Write-Host "`n=== PRÜFSUMMEN (MD5) ===`n" -ForegroundColor Magenta
$files | ForEach-Object {
    $hash = Get-FileHash -Path $_.FullName -Algorithm MD5 -ErrorAction SilentlyContinue
    if ($hash) {
        [PSCustomObject]@{
            Datei = $_.Name
            MD5 = $hash.Hash.Substring(0, 16) + "..."
        }
    }
} | Format-Table -AutoSize

Write-Host "`nFertig." -ForegroundColor Green
