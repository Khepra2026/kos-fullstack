# KOS - Wrapper compatible PS5.1 et PS7
param([string]$Environment="preproduction")
$ErrorActionPreference="Continue"
$ReportsDir="reports"
if(!(Test-Path $ReportsDir)){ New-Item -ItemType Directory -Path $ReportsDir -Force|Out-Null }

# DNS
Write-Host ">>> DNS" -ForegroundColor Magenta
powershell -File tests/connectivity/test-dns.ps1 -Frontend "kos.khepraexperts.com" -Api "api.khepraexperts.com" -OutJson "$ReportsDir/KOS-DNS.json"

Write-Host ">>> NETWORK" -ForegroundColor Magenta
powershell -File tests/connectivity/test-network.ps1 -OutJson "$ReportsDir/KOS-NETWORK.json"

Write-Host ">>> TLS" -ForegroundColor Magenta
powershell -File tests/connectivity/test-tls.ps1 -Frontend "https://kos.khepraexperts.com" -Api "https://api.khepraexperts.com" -OutJson "$ReportsDir/KOS-TLS.json"

Write-Host ">>> ENDPOINTS" -ForegroundColor Magenta
powershell -File tests/connectivity/test-endpoints.ps1 -Frontend "https://kos.khepraexperts.com" -Api "https://api.khepraexperts.com" -OutJson "$ReportsDir/KOS-ENDPOINTS.json"

Write-Host ">>> SMOKE" -ForegroundColor Magenta
powershell -File tests/api/smoke.ps1 -Api "https://api.khepraexperts.com" -OutJson "$ReportsDir/KOS-API-SMOKE.json"

Write-Host ">>> CONTRACT" -ForegroundColor Magenta
powershell -File tests/api/contract.ps1 -Api "https://api.khepraexperts.com" -OutJson "$ReportsDir/KOS-CONTRACT.json"

Write-Host ">>> NEGATIVE" -ForegroundColor Magenta
powershell -File tests/api/negative-tests.ps1 -Api "https://api.khepraexperts.com" -OutJson "$ReportsDir/KOS-NEGATIVE.json"

Write-Host ">>> HEADERS" -ForegroundColor Magenta
powershell -File tests/security/headers.ps1 -Frontend "https://kos.khepraexperts.com" -Api "https://api.khepraexperts.com" -OutJson "$ReportsDir/KOS-HEADERS.json"

Write-Host ">>> CORS" -ForegroundColor Magenta
powershell -File tests/security/cors.ps1 -Api "https://api.khepraexperts.com" -OutJson "$ReportsDir/KOS-CORS.json"

Write-Host ">>> API-SECURITY" -ForegroundColor Magenta
powershell -File tests/security/api-security.ps1 -OutJson "$ReportsDir/KOS-API-SECURITY.json" -RepoPath "."

Write-Host ">>> SUPABASE" -ForegroundColor Magenta
powershell -File tests/database/supabase-connectivity.ps1 -OutJson "$ReportsDir/KOS-SUPABASE.json"

Write-Host ">>> GENERATING REPORT" -ForegroundColor Cyan
powershell -File tests/reports/generate-report.ps1 -ReportsDir $ReportsDir
