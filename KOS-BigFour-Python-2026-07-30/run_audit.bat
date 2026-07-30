@echo off
REM KOS Big Four - Lancement audit complet
cd /d C:\Users\essoc\Downloads\KOS-BigFour-Python-2026-07-30\03_validation_suite
echo === KOS AUDIT RUNNER ===
python ..\02_audit_helpers\audit_event.py 2>nul
pip install -q pytest pytest-html pytest-json-report
python run_audit_tests.py
pause
