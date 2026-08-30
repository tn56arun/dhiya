@echo off
title Arun & Dhiya - Auto Update Round Icons
echo ========================================================
echo Updating all round Favicons and PWA App Icons...
echo ========================================================
powershell -ExecutionPolicy Bypass -Command "& { & '%~dp0update-icons.ps1' }"
echo.
echo ========================================================
echo All icons updated! You can now commit and push to GitHub.
echo ========================================================
pause
