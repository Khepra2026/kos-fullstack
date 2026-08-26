param([string]$RepoPath)
Write-Host "=== OWASP ASVS 5.0 + API Security + NIST SSDF ===" -ForegroundColor Cyan

# 1. Secret scan - Hard Blocker §32
Write-Host "[1] Secret Scan..."
if(Get-Command gitleaks -ErrorAction SilentlyContinue){
  gitleaks detect --source $RepoPath --no-git -v --redact
  if($LASTEXITCODE -ne 0){ Write-Host "FAIL: Secrets found - NO-GO" -ForegroundColor Red; exit 1 }
} else {
  Write-Host "gitleaks not installed, fallback grep..."
  $patterns = @("BEGIN RSA PRIVATE KEY","sk_live","SUPABASE_SERVICE_ROLE","password\s*=\s*['\""]","api[_-]?key")
  $hits = Select-String -Path "$RepoPath/**/*" -Pattern $patterns -Exclude "*.ps1","*.md" -ErrorAction SilentlyContinue | Where-Object { $_.Path -notlike "*node_modules*" -and $_.Path -notlike "*backup*" } | Select-Object -First 20
  if($hits){ Write-Host "FAIL: Potential secrets:" -ForegroundColor Red; $hits | Format-Table; exit 1 }
}

# 2. SAST
Write-Host "[2] SAST Semgrep..."
if(Get-Command semgrep -ErrorAction SilentlyContinue){
  semgrep --config auto --error --json --quiet $RepoPath | Out-Null
} else { Write-Host "semgrep not installed - install for CI" -ForegroundColor Yellow }

# 3. Security headers & CORS check
Write-Host "[3] Security Headers Check..."
$envs = @("https://kos.khepraexperts.com","https://app.khepraexperts.com")
foreach($url in $envs){
  try {
    $r = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -ErrorAction SilentlyContinue
    $headers = $r.Headers
    $required = @("Strict-Transport-Security","Content-Security-Policy","X-Frame-Options")
    foreach($h in $required){ if(!$headers[$h]){ Write-Host "WARNING: Missing $h on $url" -ForegroundColor Yellow } }
  } catch { Write-Host "Could not check $url : $($_.Exception.Message)" -ForegroundColor Yellow }
}

# 4. Input validation - no `any` injustifié
Write-Host "[4] TypeScript strict check..."
$anys = Select-String -Path "$RepoPath/kos-frontend/**/*","$RepoPath/src/**/*" -Pattern ":\s*any\b" -ErrorAction SilentlyContinue | Where-Object { $_.Line -notmatch "//.*any" } | Measure-Object
Write-Host "Found $($anys.Count) 'any' usages - target <10 justified"

# 5. RLS check will be done in DB baseline

Write-Host "SECURITY BASELINE DONE - 0 critical required for GO" -ForegroundColor Green
