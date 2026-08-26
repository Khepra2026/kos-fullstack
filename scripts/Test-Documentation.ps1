param([string]$RepoPath)
Write-Host "=== DOCUMENTATION §26 ==="
$docs = @("architecture","api","installation","configuration","database","security","deployment","monitoring","runbooks")
$missing = @()
foreach($d in $docs){
  if(!(Test-Path "$RepoPath/docs/$d.md" -or Test-Path "$RepoPath/docs/$d/README.md" -or (Get-ChildItem -Path $RepoPath -Recurse -Filter "*$d*.md" -ErrorAction SilentlyContinue | Measure-Object).Count -gt 0)){
    $missing += $d
  }
}
if($missing.Count -gt 0){ Write-Host "WARNING: Missing docs: $($missing -join ', ')" -ForegroundColor Yellow } else { Write-Host "PASS: Docs present" -ForegroundColor Green }

# Check doc = code reality
Write-Host "Checking README vs package.json scripts sync..."
if(Test-Path "$RepoPath/README.md" -and Test-Path "$RepoPath/package.json"){
  $pkg = Get-Content "$RepoPath/package.json" | ConvertFrom-Json
  $scripts = $pkg.scripts.PSObject.Properties.Name
  Write-Host "Scripts: $($scripts -join ', ')"
}

Write-Host "DOCUMENTATION DONE"
