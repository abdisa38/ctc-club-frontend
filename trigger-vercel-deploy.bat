@echo off
echo ========================================
echo  Triggering Fresh Vercel Deploy
echo ========================================
echo.

echo This will push a small change to GitHub to trigger Vercel redeploy...
echo.

cd CTC-Club1

echo [1/3] Adding a timestamp to trigger deploy...
echo. >> .vercel-deploy-trigger
echo Deploy triggered at %date% %time% >> .vercel-deploy-trigger

echo [2/3] Committing changes...
git add .
git commit -m "Trigger fresh Vercel deploy - clear cache"

echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo  Done! Vercel will now rebuild your site
echo  Check your Vercel dashboard in 2-3 minutes
echo ========================================
echo.

pause
