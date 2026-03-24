$dirs = @("536", "537", "538", "539", "540", "541", "542", "543", "544", "545", "546", "547", "548", "549", "550")

Write-Host "Starting batch rename process..."
Write-Host ""

foreach ($dir in $dirs) {
    if (Test-Path "$dir\index_clean.html") {
        Write-Host "Processing folder: $dir"
        
        # Rename index.html to index1.html if it exists
        if (Test-Path "$dir\index.html") {
            Rename-Item "$dir\index.html" "index1.html"
            Write-Host "  - Renamed index.html to index1.html"
        }
        
        # Rename index_clean.html to index.html
        Rename-Item "$dir\index_clean.html" "index.html"
        Write-Host "  - Renamed index_clean.html to index.html"
        
        Write-Host ""
    }
}

Write-Host "Batch rename completed!"
