$ClientId = "776gq4ut86irkl"
$secret = Read-Host "Colle CLIENT_SECRET (WPL_AP1...)"
$redirect = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master/callback"

# 1. Génère PKCE
$verifier = -join ((48..57)+(65..90)+(97..122) | Get-Random -Count 80 | % {[char]$_})
$sha = [System.Security.Cryptography.SHA256]::Create()
$hash = $sha.ComputeHash([Text.Encoding]::ASCII.GetBytes($verifier))
$challenge = [Convert]::ToBase64String($hash).Replace('+','-').Replace('/','_').TrimEnd('=')

Write-Host "Verifier: $verifier" -ForegroundColor DarkGray

# 2. Ouvre auth
$scope = "openid profile w_member_social email"
$authUrl = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=$ClientId&redirect_uri=$([uri]::EscapeDataString($redirect))&scope=$([uri]::EscapeDataString($scope))&state=KOS_BC47B669&code_challenge=$challenge&code_challenge_method=S256"
Start-Process $authUrl

# 3. Code frais
$code = Read-Host "COLLE CODE FRAIS IMMEDIATEMENT"
if ($code -match '(AQ[A-Za-z0-9_\-]{100,})') { $code = $Matches[1] }
Write-Host "Code recu: $($code.Substring(0,20))..." -ForegroundColor Cyan

# 4. Essaie 3 méthodes d'auth
$methods = @(
  @{ name="Body + Secret"; headers=@{}; body=@{ grant_type="authorization_code"; code=$code; client_id=$ClientId; client_secret=$secret; redirect_uri=$redirect; code_verifier=$verifier } },
  @{ name="Basic Auth"; headers=@{ Authorization = "Basic " + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${ClientId}:$secret")) }; body=@{ grant_type="authorization_code"; code=$code; redirect_uri=$redirect; code_verifier=$verifier } },
  @{ name="No Secret (Public)"; headers=@{}; body=@{ grant_type="authorization_code"; code=$code; client_id=$ClientId; redirect_uri=$redirect; code_verifier=$verifier } }
)

foreach ($m in $methods) {
  Write-Host "`n--- Test: $($m.name) ---" -ForegroundColor Yellow
  try {
    $resp = Invoke-RestMethod -Uri "https://www.linkedin.com/oauth/v2/accessToken" -Method Post -Headers $m.headers -Body $m.body -ContentType "application/x-www-form-urlencoded"
    Write-Host "✅ SUCCESS AVEC $($m.name)" -ForegroundColor Green
    $resp | ConvertTo-Json -Depth 10
    $resp | ConvertTo-Json | Set-Content "scripts\linkedin\token_auto.json" -Encoding utf8
    break
  } catch {
    Write-Host "❌ $($_.ErrorDetails.Message)" -ForegroundColor Red
  }
}
