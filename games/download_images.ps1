param(
    [string]$jsonFile = "1.json",
    [string]$outputFolder = "icons"
)

if (-not (Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder | Out-Null
} else {
    # 清空文件夹
    Get-ChildItem -Path $outputFolder | Remove-Item -Force
}

Write-Host "正在读取 JSON 文件..." -ForegroundColor Cyan
$json = Get-Content $jsonFile -Raw | ConvertFrom-Json

$quality = 85
$width = 320
$height = 320
$dpi = 96

Add-Type -AssemblyName System.Drawing

$totalCount = $json.Count
$successCount = 0
$failCount = 0

Write-Host "找到 $($totalCount) 个图片需要下载和处理" -ForegroundColor Green
Write-Host ""

foreach ($item in $json) {
    try {
        $imageUrl = $item.image
        $id = $item.id
        
        # 使用 id 作为文件名
        $fileName = "$id.jpg"
        
        Write-Host "正在处理 ID: $id" -ForegroundColor Yellow
        
        $webClient = New-Object System.Net.WebClient
        $tempFile = [System.IO.Path]::GetTempFileName()
        $webClient.DownloadFile($imageUrl, $tempFile)
        
        $originalImage = [System.Drawing.Image]::FromFile($tempFile)
        $newImage = New-Object System.Drawing.Bitmap($width, $height)
        
        $graphics = [System.Drawing.Graphics]::FromImage($newImage)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        $graphics.DrawImage($originalImage, 0, 0, $width, $height)
        $newImage.SetResolution($dpi, $dpi)
        
        $outputPath = Join-Path $outputFolder $fileName
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
        
        $newImage.Save($outputPath, $jpegCodec, $encoderParams)
        
        $fileSize = (Get-Item $outputPath).Length / 1KB
        
        if ($fileSize -gt 25) {
            $adjustedQuality = [Math]::Max(50, ($quality * 20 / $fileSize))
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int]$adjustedQuality)
            $newImage.Save($outputPath, $jpegCodec, $encoderParams)
            $fileSize = (Get-Item $outputPath).Length / 1KB
        }
        
        $graphics.Dispose()
        $newImage.Dispose()
        $originalImage.Dispose()
        $webClient.Dispose()
        Remove-Item $tempFile -Force
        
        Write-Host "  ✓ 完成 - 大小：$([math]::Round($fileSize, 2)) KB" -ForegroundColor Green
        $successCount++
        
    } catch {
        Write-Host "  ✗ 失败：$_" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "处理完成！" -ForegroundColor Cyan
Write-Host "成功：$successCount 张" -ForegroundColor Green
Write-Host "失败：$failCount 张" -ForegroundColor Red
