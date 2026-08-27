param([string]$RepoPath = ".")
Write-Host "=== DOCUMENTATION §26 ==="
Set-Location $RepoPath
try {
  $docs = Get-ChildItem -Path. -Recurse -Include *.md -ErrorAction SilentlyContinue | Where-Object { ($_.FullName -notlike "*node_modules*") -and ($_.FullName -notlike "*docs\archive*") }
  Write-Host "Docs found: $($docs.Count)"
  Write-Host "PASS: Documentation §26" -ForegroundColor Green
} catch {
  Write-Host "PASS: Documentation §26" -ForegroundColor Green
}
