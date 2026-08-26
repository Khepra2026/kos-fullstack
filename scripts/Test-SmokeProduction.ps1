param([string]$RepoPath)
Write-Host "=== PRODUCTION SMOKE §27 + §13 ==="
$targets = @(
  "https://kos-khepraexperts.fly.dev/health",
  "https://kos.khepraexperts.com/health",
  "https://app.khepraexperts.com/health",
  "https://khepraexperts.com/health"
)

foreach($url in $targets){
  try {
    $res = Invoke-WebRequest -Uri $url -TimeoutSec 15 -ErrorAction Stop
    if($res.StatusCode -eq 200){
      Write-Host "PASS: $url -> $($res.StatusCode)" -ForegroundColor Green
      $res.Content | Select-Object -First 200 | Write-Host
    } else { Write-Host "FAIL: $url -> $($res.StatusCode)" -ForegroundColor Red }
  } catch {
    Write-Host "FAIL: $url unreachable - $($_.Exception.Message)" -ForegroundColor Red
  }
}

# Check version endpoint
try {
  $ver = Invoke-RestMethod -Uri "https://kos.khepraexperts.com/api/version" -TimeoutSec 10 -ErrorAction SilentlyContinue
  Write-Host "Production version: $($ver | ConvertTo-Json -Depth 2)"
} catch { Write-Host "Version endpoint not available (UNKNOWN)" -ForegroundColor Yellow }

Write-Host "SMOKE DONE"
