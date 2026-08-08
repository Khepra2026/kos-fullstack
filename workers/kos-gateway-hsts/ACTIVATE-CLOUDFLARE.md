# Guide activation Cloudflare - 5 min
# 1. Allez sur https://dash.cloudflare.com > Add Site > khepraexperts.com
# 2. Cloudflare scan vos DNS actuels (gardez 52.37.165.222)
# 3. Changez nameservers chez Orderbox vers ceux de Cloudflare
# 4. Attendez 5 min
# 5. Lancez:
# cd workers/kos-gateway-hsts; npx wrangler deploy --env production
# 6. Vérifiez: curl -I https://khepraexperts.com -> HSTS OK
