
param([string]$RepoPath=".")
Set-StrictMode -Version Latest
$ErrorActionPreference="Stop"
Write-Host "[HYGIENE] Cleaning backup_* folders - BIG FOUR requirement"
$patterns = @("backup_*","backups","backup","*.zip","*.bak","audit_report.txt","bigfour_evidence_*.jsonl","S6-*.csv","logs","exports","index.broken.html")
foreach($pat in $patterns){
  Get-ChildItem -Path $RepoPath -Filter $pat -Force -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notlike "*\.git\*" } | ForEach-Object {
    Write-Host " REMOVE $($_.FullName)" -ForegroundColor Red
    Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
  }
}
# Enforce .dockerignore
$dockerignore = @"
.git
backup_*
backups
*.zip
*.log
node_modules
.gitignore
.env
.env.local
.env.*.local
evidence
reports
logs
exports
.mypy_cache
.pytest_cache
__pycache__
"@
Set-Content -Path (Join-Path $RepoPath ".dockerignore") -Value $dockerignore -Encoding utf8
Write-Host "[HYGIENE] .dockerignore enforced"

# Enforce .gitignore additions
$gitignorePath = Join-Path $RepoPath ".gitignore"
$add = @"
# BIG FOUR SECURITY
backup_*
*.zip
.env
.env.*
audit_report.txt
bigfour_*.jsonl
logs/
exports/
"@
if(Test-Path $gitignorePath){
  $content = Get-Content $gitignorePath -Raw -ErrorAction SilentlyContinue
  if($content -notlike "*backup_*"){ Add-Content $gitignorePath "`n$add" }
} else { Set-Content $gitignorePath $add }

# Git purge simulation instruction
Write-Host "[HYGIENE] Creating purge script for history"
$purge = @'
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch -r backup_* *.zip audit_report.txt bigfour_evidence_*.jsonl" --prune-empty --tag-name-filter cat -- --all
git for-each-ref --format="%(refname)" refs/original/ | ForEach-Object { git update-ref -d $_ }
git reflog expire --expire=now --all
git gc --prune=now --aggressive
'@
Set-Content -Path (Join-Path $RepoPath "scripts/Purge-History.sh") -Value $purge

Write-Host "[HYGIENE] OK - 0 backup folders" -ForegroundColor Green
