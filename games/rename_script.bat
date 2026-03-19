@echo off
cd e:\object\games8\games

for /d %%i in (*) do (
    if exist "%%i\index_clean.html" (
        echo Processing: %%i
        if exist "%%i\index.html" (
            ren "%%i\index.html" "index1.html"
            echo   Renamed index.html to index1.html
        )
        ren "%%i\index_clean.html" "index.html"
        echo   Renamed index_clean.html to index.html
    )
)

echo.
echo Done!
pause
