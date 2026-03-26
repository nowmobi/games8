$rootPath = "e:\object\games9\games"

# Get all subfolders
$folders = Get-ChildItem -Path $rootPath -Directory

foreach ($folder in $folders) {
    $indexPath = Join-Path $folder.FullName "index.html"
    $cleanPath = Join-Path $folder.FullName "index_clean.html"
    
    # Check if index_clean.html exists
    if (Test-Path $cleanPath) {
        # If index.html exists, rename it to index1.html
        if (Test-Path $indexPath) {
            Rename-Item -Path $indexPath -NewName "index1.html" -Force
            Write-Host "Processed: $($folder.Name) - index.html -> index1.html"
        }
        
        # Rename index_clean.html to index.html
        Rename-Item -Path $cleanPath -NewName "index.html" -Force
        Write-Host "Processed: $($folder.Name) - index_clean.html -> index.html"
    }
}