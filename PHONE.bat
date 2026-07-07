@echo off
title Chronex Phone Tunnel
color 0B

echo.
echo  ==========================================
echo   CHRONEX - Phone Access Tunnel
echo  ==========================================
echo.
echo  Make sure START.bat is already running!
echo  This gives you a link to open on your phone.
echo.
echo  Starting tunnel... (takes 5-10 seconds)
echo.

npx localtunnel --port 5173

pause
