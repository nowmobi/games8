# PowerShell script to delete specified folders
# 注意：此脚本将永久删除文件夹及其所有内容

$foldersToDelete = @(
    "377", "378", "379", "380", "381", "382", "383", "384", "385", "386", 
    "387", "388", "392", "393", "414", "415", "418", "424", "428", "429", 
    "430", "431", "434", "437", "438", "442", "443", "445", "446", "453", 
    "454", "463", "475", "470", "468", "490", "493", "492", "494", "495", 
    "496", "497", "498", "499", "500", "501", "503", "504", "505", "507", 
    "511", "513", "517", "524", "522", "530", "521", "533", "537", "538", 
    "543", "546", "548", "549", "389", "390", "394", "395", "397", "398", 
    "399", "402", "409", "413", "423", "426", "427", "436", "448", "461", 
    "472", "478", "480", "486", "510", "514", "518", "528", "532", "536", 
    "539", "540", "545", "410", "411", "416", "425", "433", "435", "440", 
    "450", "451", "452", "462", "467", "483", "484", "488", "489", "508", 
    "509", "515", "516", "525"
)

$basePath = $PSScriptRoot

Write-Host "准备删除以下文件夹:" -ForegroundColor Yellow
foreach ($folder in $foldersToDelete) {
    $folderPath = Join-Path $basePath $folder
    if (Test-Path $folderPath) {
        Write-Host "  - $folder" -ForegroundColor Red
    } else {
        Write-Host "  - $folder (不存在)" -ForegroundColor Gray
    }
}

Write-Host "`n共 $($foldersToDelete.Count) 个文件夹" -ForegroundColor Yellow
Write-Host "`n警告：此操作将永久删除这些文件夹及其所有内容!" -ForegroundColor Red
Write-Host "按 Y 键继续，按其他键取消..." -ForegroundColor Yellow

$response = Read-Host
if ($response -eq 'Y' -or $response -eq 'y') {
    $successCount = 0
    $failCount = 0
    
    foreach ($folder in $foldersToDelete) {
        $folderPath = Join-Path $basePath $folder
        if (Test-Path $folderPath) {
            try {
                Remove-Item -Path $folderPath -Recurse -Force
                Write-Host "已删除：$folder" -ForegroundColor Green
                $successCount++
            } catch {
                Write-Host "删除失败 $folder`: $($_.Exception.Message)" -ForegroundColor Red
                $failCount++
            }
        } else {
            Write-Host "跳过 (不存在): $folder" -ForegroundColor Gray
        }
    }
    
    Write-Host "`n删除完成!" -ForegroundColor Green
    Write-Host "成功：$successCount, 失败：$failCount" -ForegroundColor Cyan
} else {
    Write-Host "操作已取消" -ForegroundColor Yellow
}

Write-Host "`n按任意键关闭..."
Read-Host
