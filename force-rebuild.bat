@echo off
echo ========================================
echo FORCE CLEAN REBUILD
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo Done!
echo.

echo [2/5] Clearing Vite cache...
if exist .vite rmdir /s /q .vite
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo Done!
echo.

echo [3/5] Clearing browser cache instructions:
echo - Press Ctrl+Shift+Delete in your browser
echo - Select "All time"
echo - Check "Cached images and files"
echo - Click "Clear data"
echo.
pause

echo [4/5] Starting fresh dev server...
echo.
start cmd /k "npm run dev"
echo.

echo [5/5] Waiting for server to start...
timeout /t 5 /nobreak >nul
echo.

echo ========================================
echo DONE! Now do this:
echo ========================================
echo 1. Wait for dev server to fully start
echo 2. Go to: http://localhost:5173
echo 3. Press Ctrl+Shift+R (hard refresh)
echo 4. Check the footer at the bottom
echo ========================================
echo.
pause
