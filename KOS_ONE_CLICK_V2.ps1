Write-Host "=== KOS DEPLOY FIX V2 - 52.37.165.222 ===" -ForegroundColor Yellow
Set-Location $HOME
if (-not (Test-Path "$HOME\Downloads")) { New-Item -ItemType Directory -Path "$HOME\Downloads" | Out-Null }
Set-Location "$HOME\Downloads"
Write-Host "Dossier: $(Get-Location)" -ForegroundColor Cyan

# Vérifie SSH
try { ssh -V } catch { Write-Host "OpenSSH non trouvé - Installe: Paramètres > Applications > Fonctionnalités facultatives > OpenSSH Client" -ForegroundColor Red; return }
try { scp 2>&1 | Out-Null } catch {}

# Crée le script SH directement ici (sans téléchargement)
$shContent = @'
#!/bin/bash
set -e
echo "=== DIAG KOS $(date) ==="
echo "[SYS]"; uptime; df -h / | tail -1; free -h; node -v; npm -v; pm2 -v 2>&1; nginx -v 2>&1; docker -v 2>&1
echo "[PORTS]"; sudo ss -tulpn | grep -E ':80|:443|:3000|:3001|:5000' || sudo netstat -tulpn | grep -E ':80|:443|:3000' || true
echo "[PM2]"; pm2 list; pm2 info api-khepra 2>&1 | head -50 || true
echo "[DOCKER]"; docker ps -a || true
echo "[NGINX TEST]"; sudo nginx -t
echo "[NGINX CONF]"; cat /etc/nginx/sites-enabled/api.khepraexperts.com 2>/dev/null || cat /etc/nginx/sites-available/api.khepraexperts.com 2>/dev/null || cat /etc/nginx/conf.d/default.conf 2>/dev/null | head -150
echo "[NGINX ERROR LOG]"; sudo tail -n 100 /var/log/nginx/error.log
echo "[FIND API]"; find /var/www /home /opt -maxdepth 5 -name "package.json" 2>/dev/null | head -10
API_DIR=$(find /var/www /home -maxdepth 5 -name "package.json" 2>/dev/null | xargs -I{} dirname {} | grep -i -E "api|khepra" | head -1); if [ -z "$API_DIR" ]; then API_DIR=$(find /home/ubuntu /var/www -maxdepth 4 -type f -name "package.json" 2>/dev/null | head -1 | xargs dirname); fi; echo "API_DIR=$API_DIR"; ls -la $API_DIR 2>/dev/null | head -50; echo "[PACKAGE]"; cat $API_DIR/package.json 2>/dev/null | head -80
echo "[ENV]"; cat $API_DIR/.env 2>/dev/null | grep -v -E "KEY|SECRET|PASSWORD|TOKEN" | head -20 || cat $API_DIR/.env.example 2>/dev/null | head -20 || true
echo "[FIX NGINX]"; sudo tee /etc/nginx/sites-available/api.khepraexperts.com >/dev/null <<'NGINX'
server { listen 80; server_name api.khepraexperts.com; location /.well-known/acme-challenge/ { root /var/www/html; } location / { return 301 https://$host$request_uri; } }
server {
 listen 443 ssl http2; server_name api.khepraexperts.com;
 ssl_certificate /etc/letsencrypt/live/api.khepraexperts.com/fullchain.pem;
 ssl_certificate_key /etc/letsencrypt/live/api.khepraexperts.com/privkey.pem;
 ssl_protocols TLSv1.2 TLSv1.3;
 add_header Strict-Transport-Security "max-age=31536000" always;
 location / {
  proxy_pass http://127.0.0.1:3000; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; proxy_read_timeout 90s;
  add_header Access-Control-Allow-Origin "https://khepraexperts.com" always;
  add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
  add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;
 }
 location /health { proxy_pass http://127.0.0.1:3000/health; access_log off; }
}
NGINX
sudo ln -sf /etc/nginx/sites-available/api.khepraexperts.com /etc/nginx/sites-enabled/; sudo nginx -t && sudo systemctl reload nginx && echo "NGINX RELOAD OK"
echo "[NPM FIX]"; cd $API_DIR 2>/dev/null && npm install 2>&1 | tail -20; npm run build 2>&1 | tail -20 || true
echo "[PM2 RESTART]"; cd $API_DIR; pm2 delete api-khepra 2>/dev/null || true; if [ -f ecosystem.config.js ]; then pm2 start ecosystem.config.js --env production; else pm2 start npm --name "api-khepra" -- start || pm2 start index.js --name "api-khepra" || pm2 start server.js --name "api-khepra" || pm2 start app.js --name "api-khepra" || pm2 start dist/main.js --name "api-khepra"; fi; pm2 save; sleep 3; pm2 list; pm2 logs --lines 80 --nostream || true
echo "[CURL TEST]"; curl -s -i http://127.0.0.1:3000/health | head -20; curl -s -i http://127.0.0.1:3000/ | head -20; curl -k -s -i https://api.khepraexperts.com/health | head -30; curl -k -s -i https://api.khepraexperts.com/ | head -30
echo "=== FIN DIAG ==="
'@

$shContent | Out-File -Encoding utf8 -NoNewline -FilePath "$HOME\Downloads\KOS_AUTO_FIX.sh"
Write-Host "Fichier créé: $HOME\Downloads\KOS_AUTO_FIX.sh" -ForegroundColor Green

# Demande infos SSH
$ip = "52.37.165.222"
$user = Read-Host "User SSH ? [ubuntu]"
if ([string]::IsNullOrWhiteSpace($user)) { $user = "ubuntu" }
$pem = Read-Host "Chemin vers clé .pem (Entrée si pas de clé / password auth)"
Write-Host "Envoi vers $user@$ip ..." -ForegroundColor Cyan

if (-not [string]::IsNullOrWhiteSpace($pem) -and (Test-Path $pem)) {
  scp -i "$pem" -o StrictHostKeyChecking=no "$HOME\Downloads\KOS_AUTO_FIX.sh" "${user}@${ip}:/tmp/KOS_AUTO_FIX.sh"
  ssh -i "$pem" -o StrictHostKeyChecking=no "${user}@${ip}" "chmod +x /tmp/KOS_AUTO_FIX.sh && sudo bash /tmp/KOS_AUTO_FIX.sh 2>&1 | tee /tmp/kos-report.log; echo '---REPORT---'; cat /tmp/kos-report.log"
} else {
  scp -o StrictHostKeyChecking=no "$HOME\Downloads\KOS_AUTO_FIX.sh" "${user}@${ip}:/tmp/KOS_AUTO_FIX.sh"
  ssh -o StrictHostKeyChecking=no "${user}@${ip}" "chmod +x /tmp/KOS_AUTO_FIX.sh && sudo bash /tmp/KOS_AUTO_FIX.sh 2>&1 | tee /tmp/kos-report.log; echo '---REPORT---'; cat /tmp/kos-report.log"
}

Write-Host "`nRecupération du rapport..." -ForegroundColor Yellow
if (-not [string]::IsNullOrWhiteSpace($pem) -and (Test-Path $pem)) {
  scp -i "$pem" -o StrictHostKeyChecking=no "${user}@${ip}:/tmp/kos-report.log" "$HOME\Downloads\kos-report.log"
} else {
  scp -o StrictHostKeyChecking=no "${user}@${ip}:/tmp/kos-report.log" "$HOME\Downloads\kos-report.log"
}
Write-Host "✅ Rapport sauvegardé: $HOME\Downloads\kos-report.log - Envoie le ici !" -ForegroundColor Green
