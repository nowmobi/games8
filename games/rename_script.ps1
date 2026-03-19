# Batch rename script
$basePath = "e:\object\games8\games"

Get-ChildItem -Path $basePath -Directory | ForEach-Object {
    $indexClean = Join-Path $_.FullName 'index_clean.html'
    $indexHtml = Join-Path $_.FullName 'index.html'
    
    if (Test-Path $indexClean) {
        Write-Host "Processing: $($_.FullName)"
        
        if (Test-Path $indexHtml) {
            Rename-Item -Path $indexHtml -NewName 'index1.html' -Force
            Write-Host "  Renamed index.html to index1.html"
        }
        
        Rename-Item -Path $indexClean -NewName 'index.html' -Force
        Write-Host "  Renamed index_clean.html to index.html"
    }
}

Write-Host "Done!"