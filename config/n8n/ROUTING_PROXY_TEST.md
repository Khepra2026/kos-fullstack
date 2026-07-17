# KOS Routing Proxy — Test Commands

## Test direct `rag-semantic-search` (Edge Function)
```bash
curl -X POST "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/rag-semantic-search" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query":"ratios prudentiels BCEAO 2026","top_k":3}'
```

## Test via le Routing Proxy (n8n primary → fallback Edge Function)
```bash
curl -X POST "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-routing-proxy" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"function_name":"rag-semantic-search","payload":{"query":"ratios prudentiels BCEAO 2026","top_k":3}}'
```

## Vérifier les KPIs routing temps réel
```sql
SELECT * FROM kos_routing_kpis_24h;
```

## Vérifier les logs de routing
```sql
SELECT 
  function_name,
  provider_used,
  latency_ms,
  status,
  is_failover,
  cost_eur,
  created_at
FROM kos_routing_log
ORDER BY created_at DESC
LIMIT 10;
```

## Headers de réponse du proxy
- `X-Routing-Latency` — Latence en ms
- `X-Routing-Provider` — Provider utilisé (`n8n`, `edge_function`, `fallback_n8n`, `fallback_edge_function`)
- `X-Routing-Primary` — Provider primary configuré
- `X-Routing-Failover` — `true` si failover utilisé

## Forcer un failover (test manuel)
```sql
-- Simuler un échec n8n → fallback auto sur Edge Function
UPDATE kos_function_routing
SET status = 'inactive'
WHERE function_name = 'rag-semantic-search';
```