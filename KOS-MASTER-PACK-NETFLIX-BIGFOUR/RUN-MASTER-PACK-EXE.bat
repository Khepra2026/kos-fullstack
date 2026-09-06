@echo off
REM KOS MASTER PACK - Double-click EXE style (cd pwsh)
REM Netflix + Big Four 100% - Build local puis deploy unique Vercel/Netlify
cd /d C:\KOS_LOCAL\repo
pwsh -ExecutionPolicy Bypass -File .\KOS-MASTER-PACK-NETFLIX-BIGFOUR\MASTER-KOS-NETFLIX-BIGFOUR-GO.ps1
pause
