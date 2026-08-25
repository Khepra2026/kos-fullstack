
param([string]$RepoPath=".")
Write-Host "[ROLLBACK] Implementing zero-downtime rollback"

$rollbackSh = @'
#!/bin/bash
set -e
echo "=== KOS ROLLBACK N -> N-1 ==="
PREV_IMAGE=$(fly releases --json | jq -r '.[1].ImageRef')
echo "Rolling back to $PREV_IMAGE"
fly deploy --image $PREV_IMAGE --strategy immediate
# DB rollback - down migration must be idempotent
# supabase db reset --linked --version previous
# supabase migration down --last 1
echo "Health check after rollback"
for i in {1..10}; do
  if curl -sf https://kos-khepraexperts.fly.dev/api/ready | grep -q '"status":"ready"'; then
    echo "READY OK"
    exit 0
  fi
  sleep 3
done
echo "ROLLBACK HEALTH FAILED"
exit 1
'@

Set-Content -Path (Join-Path $RepoPath "scripts/rollback.sh") -Value $rollbackSh

$rollbackPs1 = @'
param([string]$PrevVersion="")
Write-Host "=== KOS ROLLBACK POWERSHELL ==="
flyctl releases --json | ConvertFrom-Json | Select-Object -First 5 | Format-Table
if(-not $PrevVersion){
  $releases = flyctl releases --json | ConvertFrom-Json
  $PrevVersion = $releases[1].ImageRef
}
Write-Host "Rollback to $PrevVersion"
flyctl deploy --image $PrevVersion --strategy immediate
1..10 | ForEach-Object {
  try{
    $r = Invoke-RestMethod -Uri "https://kos-khepraexperts.fly.dev/api/ready" -TimeoutSec 5
    if($r.status -eq "ready"){ Write-Host "READY OK" -ForegroundColor Green; exit 0 }
  } catch {}
  Start-Sleep 3
}
Write-Host "ROLLBACK FAILED" -ForegroundColor Red
exit 1
'@

Set-Content -Path (Join-Path $RepoPath "scripts/Rollback.ps1") -Value $rollbackPs1

Write-Host "[ROLLBACK] OK" -ForegroundColor Green
