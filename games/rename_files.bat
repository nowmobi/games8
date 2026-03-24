@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo Starting batch rename process...
echo.

set "dirs=511 512 513 514 515 516 517 518 519 520 521 522 523 524 525 526 527 528 529 530 531 532 533 534 535"

for %%d in (%dirs%) do (
    if exist "%%d\index_clean.html" (
        echo Processing folder: %%d
        
        rem Rename index.html to index1.html if it exists
        if exist "%%d\index.html" (
            ren "%%d\index.html" "index1.html"
            echo   - Renamed index.html to index1.html
        )
        
        rem Rename index_clean.html to index.html
        ren "%%d\index_clean.html" "index.html"
        echo   - Renamed index_clean.html to index.html
        
        echo.
    )
)

echo Batch rename completed!
pause
