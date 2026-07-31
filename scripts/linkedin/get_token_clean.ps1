param([string]$ClientId = "776gq4ut86irkl")
Write-Host "=== KOS LINKEDIN PKCE - CLEAN FLOW ===" -ForegroundColor Green
$secret = Read-Host "Colle ton CLIENT_SECRET"
if (-not $secret) { exit }
$verifier = -join ((48..57)+(65..90)+(97..122) | Get-Random -Count 80 | % {[char]$_})
$sha = [System.Security.Cryptography.SHA256]::Create()
$hash = $sha.ComputeHash([System.Text.Encoding]::ASCII.GetBytes($verifier))
$challenge = [Convert]::ToBase64String($hash).Replace('+','-').Replace('/','_').TrimEnd('=')
Set-Content "scripts\linkedin\pkce_verifier.txt" $verifier -NoNewline
Write-Host "Verifier: $verifier" -ForegroundColor Yellow
$redirect = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master/callback"
$scope = "openid profile w_member_social email"
$authUrl = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=$ClientId&redirect_uri=$([uri]::EscapeDataString($redirect))&scope=$([uri]::EscapeDataString($scope))&state=KOS_BC47B669&code_challenge=$challenge&code_challenge_method=S256"
Start-Process $authUrl
Write-Host "NAVIGATEUR OUVERT - Clique COPIER LE CODE dans le cadre vert" -ForegroundColor Magenta
$code = Read-Host "COLLE CODE ICI (AQ...)"
if ($code -match '(AQ[A-Za-z0-9_\-]{100,})') { $code = $Matches[1] }
Write-Host "Code: $($code.Substring(0,30))..." -ForegroundColor Cyan
$body = @{ grant_type="authorization_code"; code=$code; client_id=$ClientId; client_secret=$secret; redirect_uri=$redirect; code_verifier=$verifier }
try {
  $resp = Invoke-RestMethod -Uri "https://www.linkedin.com/oauth/v2/accessToken" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
  Write-Host "✅ TOKEN OK" -ForegroundColor Green
  $resp | ConvertTo-Json -Depth 10
  $resp | ConvertTo-Json | Set-Content "scripts\linkedin\token_auto.json" -Encoding utf8
  $me = Invoke-RestMethod -Uri "https://api.linkedin.com/v2/userinfo" -Headers @{ Authorization = "Bearer $($resp.access_token)" }
  Write-Host "Connecte: $($me.name) - $($me.email)" -ForegroundColor Cyan
} catch { Write-Host "ERREUR: $($_.ErrorDetails.Message)" -ForegroundColor Red }
