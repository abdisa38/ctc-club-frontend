@echo off
echo Stopping any running dev servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Starting fresh dev server...
cd /d "%~dp0"
npm run dev
