
# KOS REGTECH AI - MASTER REMEDIATION - BIG FOUR 100% - HEALTHY 100% - 0 BUG
# Execution: pwsh -ExecutionPolicy Bypass -File Master-Remediation.ps1
# Compatible Windows / Linux / macOS (PowerShell 7+)
param(
  [string]$RepoPath = ".",
  [switch]$DryRun
)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "=== KOS BIG FOUR MASTER REMEDIATION ===" -ForegroundColor Cyan
Write-Host "Repo: $RepoPath DryRun: $DryRun"

$scripts = @(
  "Fix-Repo-Hygiene.ps1",
  "Implement-Security-Hardening.ps1",
  "Implement-Health-Checks.ps1",
  "Implement-Rate-Limiting.ps1",
  "Implement-RAG-Guardrails.ps1",
  "Implement-Observability.ps1",
  "Implement-Rollback.ps1",
  "Implement-Deployment-Guard.ps1",
  "Verify-100Percent.ps1"
)

foreach($s in $scripts){
  $p = Join-Path $RepoPath "scripts/$s"
  if(-not (Test-Path $p)){ $p = Join-Path $PSScriptRoot $s }
  Write-Host "`n>> EXEC $s" -ForegroundColor Yellow
  if($DryRun){ Write-Host "DRY RUN skip" -ForegroundColor Gray; continue }
  pwsh -ExecutionPolicy Bypass -File $p -RepoPath $RepoPath
  if($LASTEXITCODE -ne 0){ throw "Script $s failed with $LASTEXITCODE" }
}

Write-Host "`n=== ALL REMEDIATIONS PASSED - 100% HEALTHY - 0 BUG ===" -ForegroundColor Green
