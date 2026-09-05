Write-Host "=== KOS FINAL 30 GATES - LOCAL AUDIT ===" -ForegroundColor Cyan
$score=0; $total=14
function Test-Gate($name,$condition){
  if($condition){ Write-Host "[PASS] $name" -ForegroundColor Green; return 1 } else { Write-Host "[FAIL] $name" -ForegroundColor Red; return 0 }
}
$score+=Test-Gate "Build Next.js" (Test-Path ".next/standalone/server.js")
$score+=Test-Gate "Health route exists" (Test-Path "app/api/health/route.ts")
$score+=Test-Gate "Ready route exists" (Test-Path "app/api/ready/route.ts")
$score+=Test-Gate "Sources route exists" (Test-Path "app/api/v1/sources/route.ts")
$score+=Test-Gate "RAG route exists" (Test-Path "app/api/rag/route.ts")
$score+=Test-Gate "Middleware" (Test-Path "middleware.ts")
$score+=Test-Gate "Vercel HSTS 63072000" ((Get-Content vercel.json -ErrorAction SilentlyContinue | Select-String "63072000") -ne $null)
$score+=Test-Gate "No backup folders" ((Get-ChildItem -Directory -Filter "backup*" -ErrorAction SilentlyContinue | Measure-Object).Count -eq 0)
$score+=Test-Gate "No fly.toml" (-not (Test-Path "fly.toml"))
$score+=Test-Gate "No .env.prod versioned" (-not (Test-Path ".env.prod"))
$score+=Test-Gate "Supabase migrations" (Test-Path "supabase/migrations")
$score+=Test-Gate "Dockerignore backup" ((Get-Content .dockerignore -ErrorAction SilentlyContinue | Select-String "backup_") -ne $null)
$score+=Test-Gate "Package.json valid" ((Get-Content package.json -ErrorAction SilentlyContinue | ConvertFrom-Json) -ne $null)
$score+=Test-Gate ".env.local exists" (Test-Path ".env.local")
Write-Host "`nScore: $score / $total" -ForegroundColor Yellow
if($score -ge 12){ Write-Host "GO WITH CONDITIONS - 85%+ " -ForegroundColor Green } else { Write-Host "NO-GO - fix fails" -ForegroundColor Red }
Write-Host "`n=== PROCHAINS PASS pour 95/100 ==="
Write-Host "1. Mettre vraies cles Supabase dans .env.local"
Write-Host "2. Lancer node .next/standalone/server.js et curl /api/health"
Write-Host "3. Executer supabase/rls-verify.sql + seed_final.sql"
