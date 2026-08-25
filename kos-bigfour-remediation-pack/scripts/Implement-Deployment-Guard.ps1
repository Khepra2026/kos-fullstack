
param([string]$RepoPath=".")
Write-Host "[DEPLOY-GUARD] Anti-drift"

$guardPy = @'
import os, hashlib, json, subprocess, sys

def git_sha():
    return subprocess.check_output(["git","rev-parse","HEAD"]).decode().strip()

def build_hash():
    # hash of Dockerfile + backend + frontend
    return hashlib.sha256(open("Dockerfile","rb").read()).hexdigest()[:12]

def check_drift():
    sha = git_sha()
    env_sha = os.getenv("GIT_SHA","")
    if env_sha and env_sha != sha:
        print(f"DRIFT: GIT_SHA env {env_sha} != HEAD {sha}")
        sys.exit(1)
    print(f"NO DRIFT: {sha}")
    return sha

if __name__ == "__main__":
    check_drift()
'@

Set-Content -Path (Join-Path $RepoPath "scripts/check_drift.py") -Value $guardPy

$dockerfile = @'
FROM python:3.11-slim AS base
ARG GIT_SHA=unknown
ARG BUILD_TIME=unknown
ENV GIT_SHA=$GIT_SHA BUILD_TIME=$BUILD_TIME PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend ./backend
COPY kos-frontend/dist ./frontend
COPY scripts/validate_env.py ./scripts/
RUN python scripts/validate_env.py
EXPOSE 8000
HEALTHCHECK --interval=10s --timeout=2s --start-period=30s --retries=3 CMD python -c "import requests; requests.get('http://localhost:8000/api/ready', timeout=1.5).raise_for_status()"
CMD ["uvicorn","backend.ai.main:app","--host","0.0.0.0","--port","8000","--workers","2"]
'@

Set-Content -Path (Join-Path $RepoPath "Dockerfile.hardened") -Value $dockerfile

Write-Host "[DEPLOY-GUARD] OK" -ForegroundColor Green
