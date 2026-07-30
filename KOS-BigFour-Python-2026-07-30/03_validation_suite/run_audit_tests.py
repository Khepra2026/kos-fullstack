#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, subprocess
from pathlib import Path
import datetime, os

CURRENT = Path(__file__).parent
ROOT = CURRENT.parent
REPORT_DIR = ROOT / "07_reports"
REPORT_DIR.mkdir(parents=True, exist_ok=True)
HTML_REPORT = REPORT_DIR / f"audit_test_report_{datetime.date.today().isoformat()}.html"

def main():
    print("=== KOS BIG FOUR - GLOBAL TEST RUNNER v2 ===")
    print(f"Root: {ROOT}")
    print("[1/2] Install pytest + pytest-html...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "pytest", "pytest-html"], check=False)

    print(f"[2/2] Execution tests -> {HTML_REPORT}")
    cmd = [
        sys.executable, "-m", "pytest",
        str(CURRENT),
        "-v",
        f"--html={HTML_REPORT}",
        "--self-contained-html"
    ]
    result = subprocess.run(cmd)
    
    print(f"\n[OK] Rapport genere: {HTML_REPORT}")
    print(f"Status: {'PASSED' if result.returncode==0 else 'FAILED'} - Code {result.returncode}")
    try:
        os.startfile(str(HTML_REPORT))
    except:
        pass
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()
