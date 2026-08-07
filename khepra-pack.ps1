# khepra-pack.ps1 - Pack PowerShell KOS Fullstack
# Usage: pwsh -File .\khepra-pack.ps1 [check|deploy-api|deploy-front|fix-all]

param([string]$Action = "check")

$API_URL = "https://api.khepraexperts.com"
$API_FALLBACK = "https://api-azure-two-15.vercel.app"
$FRONT_URL = "https://kos.khepraexperts.com"
$API_DIR = "C:\Users\essoc\Downloads\api"
$FRONT_DIR = "C:\Users\essoc\khepra-work\kos-fullstack\frontend"

function Write-Ok($msg){ Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Ko($msg){ Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Info($msg){ Write-Host "➡️ $msg" -ForegroundColor Cyan }

function Test-Endpoint($url){
    try {
        $res = curl.exe -s -w "`n%{http_code}" $url 2>$null
        $lines = $res -split "`n"
        $code = $lines[-1]
        $body = ($lines[0..($lines.Length-2)] -join "`n")
        if($code -eq "200"){
            Write-Ok "$url -> $code"
            $body | ConvertFrom-Json | Format-List | Out-String | Write-Host
            return $true
        } else {
            Write-Ko "$url -> $code"
            Write-Host $body
            return $false
        }
    } catch {
        Write-Ko "$url -> ERROR $_"
        return $false
    }
}

function Do-Check {
    Write-Info "=== KOS HEALTH CHECK ==="
    Test-Endpoint "$API_URL/health"
    Test-Endpoint "$API_URL/ready"
    Test-Endpoint "$API_FALLBACK/health"
    Write-Info "Front: $FRONT_URL"
    try {
        $front = curl.exe -s -I $FRONT_URL 2>$null | Select-String "HTTP"
        Write-Host $front
        if($front -match "200"){ Write-Ok "Front UP" } else { Write-Ko "Front DOWN" }
    } catch { Write-Ko "Front check failed" }
    Write-Info "Env FRONT .env.local"
    if(Test-Path "$FRONT_DIR\.env.local"){ Get-Content "$FRONT_DIR\.env.local" | Write-Host }
    Write-Info "vercel.json API"
    if(Test-Path "$API_DIR\vercel.json"){ Get-Content "$API_DIR\vercel.json" | Write-Host }
    Write-Info "vercel.json FRONT"
    if(Test-Path "$FRONT_DIR\vercel.json"){ Get-Content "$FRONT_DIR\vercel.json" | Write-Host }
}

function Do-Fix-All {
    Write-Info "=== FIX ALL ==="
    # Fix API vercel.json
    Set-Location $API_DIR
    @'
{
  "version": 2,
  "builds": [{ "src": "api/index.js", "use": "@vercel/node" }],
  "routes": [
    { "src": "/health", "dest": "/api/index.js" },
    { "src": "/ready", "dest": "/api/index.js" },
    { "src": "/api/(.*)", "dest": "/api/index.js" },
    { "src": "/(.*)", "dest": "/api/index.js" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
'@ | Set-Content vercel.json -Encoding UTF8
    Write-Ok "API vercel.json fixed"
    
    # Fix FRONT vercel.json
    Set-Location $FRONT_DIR
    Remove-Item vercel.json -Force -ErrorAction SilentlyContinue
    '{"framework":"nextjs"}' | Set-Content vercel.json -Encoding UTF8
    @"
NEXT_PUBLIC_API_URL=$API_URL
NEXT_PUBLIC_API_BASE_URL=$API_URL
"@ | Set-Content .env.local -Encoding UTF8
    Write-Ok "FRONT vercel.json + .env.local fixed"
}

function Do-Deploy-Api {
    Set-Location $API_DIR
    vercel --prod --yes
}

function Do-Deploy-Front {
    Set-Location $FRONT_DIR
    vercel --prod --yes
}

switch($Action){
    "check" { Do-Check }
    "fix-all" { Do-Fix-All; Do-Check }
    "deploy-api" { Do-Deploy-Api; Do-Check }
    "deploy-front" { Do-Deploy-Front; Do-Check }
    "deploy-all" { Do-Deploy-Api; Do-Deploy-Front; Do-Check }
    default { Do-Check }
}
