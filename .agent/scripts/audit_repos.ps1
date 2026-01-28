$rootFolder = 'C:\Workspace\Repos'
$results = @()
Write-Host 'Starting Global Repo Audit...' -ForegroundColor Cyan
$repoFolders = Get-ChildItem -Path $rootFolder -Directory | Where-Object { Test-Path (Join-Path $_.FullName '.git') }
foreach ($repo in $repoFolders) {
    $repoName = $repo.Name
    $repoPath = $repo.FullName
    Write-Host "Checking $repoName... " -NoNewline
    Push-Location $repoPath
    try {
        $deletedFiles = git ls-files --deleted
        if ($deletedFiles) {
            Write-Host 'GHOST FILES FOUND' -ForegroundColor Yellow
            $status = 'Inconsistent'
            $files = ($deletedFiles -join ', ')
        }
        else {
            Write-Host 'CLEAN' -ForegroundColor Green
            $status = 'Clean'
            $files = '-'
        }
        $results += [PSCustomObject]@{
            Project    = $repoName
            Status     = $status
            GhostFiles = $files
        }
    }
    catch {
        Write-Host 'ERROR' -ForegroundColor Red
        $results += [PSCustomObject]@{
            Project    = $repoName
            Status     = 'Error'
            GhostFiles = $_.Exception.Message
        }
    }
    finally {
        Pop-Location
    }
}
Write-Host '--- FINAL REPORT ---' -ForegroundColor Cyan
$results | Format-Table -AutoSize
