@echo off
title Harar Ras Hotel - Menu Server
cd /d "%~dp0"

echo.
echo   Harar Ras Hotel - digital menu
echo   ------------------------------------------
echo   Menu    http://localhost:3000
echo   Admin   http://localhost:3000/admin   (password: admin123)
echo   Phones  http://192.168.10.53:3000
echo.
echo   Keep this window OPEN while using the menu.
echo   Press Ctrl+C then Y to stop the server.
echo.

start "" "http://localhost:3000/admin"

npm run dev

echo.
echo   The server has stopped. Double-click this file to start it again.
pause