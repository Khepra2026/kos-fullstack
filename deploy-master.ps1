Write-Host "=== KHEPRA V7 ===" -F Cyan
$root = "C:\Users\essoc\khepra-work\kos-fullstack"
$api = Get-ChildItem -Path $root -Filter package.json -Recurse -Depth 3 -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*frontend*" } | Select-Object -First 1
if (!$api) { Write-Host "Toujours pas trouve, liste:" -F Red; Get-ChildItem $root -Directory | Format-Table Name; exit }
Write-Host "API TROUVEE: " -F Green
Set-Location $api.DirectoryName
npm ci
cloudflared tunnel create khepra-api-prod 2>$null
$tid = (Get-ChildItem "$env:USERPROFILE\.cloudflared\*.json" | Sort LastWriteTime -Desc | Select -First 1).BaseName
@"
tunnel: 
credentials-file: C:\Users\essoc\.cloudflared\.json
ingress:
    - hostname: api.khepraexperts.com
    service: http://localhost:3000
    - service: http_status:404
