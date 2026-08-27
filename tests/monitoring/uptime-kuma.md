# Uptime Kuma - KOS RegTech AI Monitoring

## Targets

- Frontend: https://kos.khepraexperts.com (HTTP 200, keyword check minimal content)
- API Health: https://api.khepraexperts.com/health (HTTP 200, JSON)
- API Ready: https://api.khepraexperts.com/ready
- API Version: https://api.khepraexperts.com/version

## Configuration

1. Install Uptime Kuma (open source):
```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
```

2. Create monitors:
- Type: HTTP(s)
- Interval: 60s
- Retries: 2
- Method: GET
- Expected Status: 200
- For TLS: enable Certificate Expiry notification (notify 14,7,3,1 days before)

3. Notifications:
- Configure email/Slack/Teams webhook
- Alert on: downtime, timeout >5s, cert expiry <14d, status change

4. Dashboard:
- Group: KOS Production
- Tags: frontend, api, tls

## SLO

- Uptime >= 99.5% monthly
- p95 latency < 1000ms
- TLS cert >30 days validity

## Runbook

If downtime:
1. Check DNS (Resolve-DnsName)
2. Check TLS (test-tls.ps1)
3. Check Fly.io deployment status
4. Check Supabase status
5. Run full audit: ./tests/run-full-audit.ps1 -Environment production
