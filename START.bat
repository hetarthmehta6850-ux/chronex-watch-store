@echo off
title Chronex Dev Server
color 0A

echo.
echo  ==========================================
echo   CHRONEX - Starting Development Server
echo  ==========================================
echo.

:: Kill any old running servers
echo  [1/3] Stopping old servers...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 >nul

:: Start backend server in background
echo  [2/3] Starting backend server...
start /min cmd /c "node backend/server.js"
timeout /t 2 >nul

:: Start frontend and open browser automatically
echo  [3/3] Starting frontend with HTTPS...
echo.
echo  ==========================================
echo   PC:    https://localhost:5173
echo   Phone: https://192.168.31.113:5173
echo  ==========================================
echo.
echo  Opening browser automatically...
timeout /t 3 >nul
start "" "https://localhost:5173"

:: Start vite (keeps window open so you can see logs)
npx vite
