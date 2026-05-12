@echo off
echo ========================================
echo  Clearing Vite Cache and Restarting
echo ========================================
echo.

echo [1/4] Stopping any running dev servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Clearing Vite cache folders...
if exist .vite rmdir /s /q .vite
if exist node_modules\.vite rmdir /s /q node_modules\.vite
if exist dist rmdir /s /q dist
echo Cache cleared successfully!

echo [3/4] Starting dev server...
echo.
echo ========================================
echo  Dev server is starting...
echo  Press Ctrl+C to stop the server
echo ========================================
echo.

npm run dev

pause
