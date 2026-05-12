@echo off
echo ========================================
echo  DIAGNOSTIC REPORT
echo ========================================
echo.

echo [1] Checking if CourseList.tsx has the new grid layout...
findstr /C:"grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" "src\app\pages\CourseList.tsx" >nul
if %errorlevel%==0 (
    echo [OK] Grid layout code FOUND in CourseList.tsx
) else (
    echo [ERROR] Grid layout code NOT FOUND in CourseList.tsx
)

echo.
echo [2] Checking if Footer.tsx has 3-column layout...
findstr /C:"md:grid-cols-3" "src\app\components\Footer.tsx" >nul
if %errorlevel%==0 (
    echo [OK] 3-column layout FOUND in Footer.tsx
) else (
    echo [ERROR] 3-column layout NOT FOUND in Footer.tsx
)

echo.
echo [3] Checking if hover effects exist...
findstr /C:"hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2" "src\app\pages\CourseList.tsx" >nul
if %errorlevel%==0 (
    echo [OK] Hover effects FOUND in CourseList.tsx
) else (
    echo [ERROR] Hover effects NOT FOUND in CourseList.tsx
)

echo.
echo [4] Checking git status...
git status --short

echo.
echo [5] Checking last commit...
git log --oneline -1

echo.
echo [6] Checking if node_modules exists...
if exist "node_modules" (
    echo [OK] node_modules folder EXISTS
) else (
    echo [ERROR] node_modules folder MISSING - run: npm install
)

echo.
echo [7] Checking if .vite cache exists...
if exist ".vite" (
    echo [WARNING] .vite cache folder EXISTS - should be deleted
) else (
    echo [OK] .vite cache folder does not exist
)

echo.
echo [8] Checking package.json dev script...
findstr /C:"\"dev\"" "package.json"

echo.
echo ========================================
echo  DIAGNOSTIC COMPLETE
echo ========================================
echo.
echo Please share this output with me!
echo.
pause
