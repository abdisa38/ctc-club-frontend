@echo off
echo ========================================
echo  COMPLETE FIX - Clear Everything
echo ========================================
echo.

echo This will:
echo 1. Stop all Node processes
echo 2. Clear ALL cache folders
echo 3. Reinstall dependencies (fresh)
echo 4. Start dev server
echo.
pause

echo [Step 1/6] Stopping all Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo Done!

echo [Step 2/6] Clearing Vite cache...
if exist .vite (
    rmdir /s /q .vite
    echo .vite folder deleted
)
if exist node_modules\.vite (
    rmdir /s /q node_modules\.vite
    echo node_modules\.vite folder deleted
)
if exist dist (
    rmdir /s /q dist
    echo dist folder deleted
)
echo Cache cleared!

echo [Step 3/6] Clearing npm cache...
call npm cache clean --force
echo npm cache cleared!

echo [Step 4/6] Deleting node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo node_modules deleted
)

echo [Step 5/6] Reinstalling dependencies (this may take 2-3 minutes)...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo Dependencies installed!

echo [Step 6/6] Starting dev server...
echo.
echo ========================================
echo  IMPORTANT INSTRUCTIONS:
echo ========================================
echo.
echo 1. Wait for the server to start
echo 2. You'll see a URL like: http://localhost:5173
echo 3. Open that URL in your browser
echo 4. Press Ctrl+Shift+R to hard refresh
echo 5. You should now see all the changes!
echo.
echo Press Ctrl+C to stop the server when done
echo ========================================
echo.

call npm run dev

pause
