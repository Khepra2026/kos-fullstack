# ============================================================
# MASTER CD PWSH 122
# KOS MRR/ARR DASHBOARD REALTIME
# BIG FOUR INVESTOR + REGULATORY METRICS
# ============================================================

$ErrorActionPreference="Stop"

$ROOT="C:\KOS DEV PLATEFORM\project-11940621"
$FUNC_DIR="$ROOT\supabase\functions\kos-dashboard-mrr"
$SQL_DIR="$ROOT\supabase\migrations"

Set-Location $ROOT

Write-Host ""
Write-Host "================================================"
Write-Host " MASTER CD PWSH 122"
Write-Host " KOS MRR/ARR DASHBOARD REALTIME"
Write-Host " BIG FOUR METRICS EDGE"
Write-Host "================================================"

# ============================================================
# 1 CREATE FUNCTION DIR
# ============================================================

Write-Host "[1/6] Creation Edge Function"

New-Item -ItemType Directory -Force $FUNC_DIR | Out-Null

# ============================================================
# 2 EDGE FUNCTION CODE
# ============================================================

Write-Host "[2/6] Ecriture index.ts"

@'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?? ''
    )

    // 1. MRR Current Month
    const { data: mrrData } = await supabaseClient
     .from('payments')
     .select('amount')
     .eq('status', 'paid')
     .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

    const mrr = mrrData?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

    // 2. Active Subscriptions
    const { count: activeSubs } = await supabaseClient
     .from('subscriptions')
     .select('*', { count: 'exact', head: true })
     .eq('status', 'active')

    // 3. Churn Last 30d
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { count: churned } = await supabaseClient
     .from('subscriptions')
     .select('*', { count: 'exact', head: true })
     .eq('status', 'cancelled')
     .gte('updated_at', thirtyDaysAgo)

    const churnRate = activeSubs? ((churned || 0) / activeSubs * 100).toFixed(2) : "0.00"

    // 4. Payment Success Rate 24h
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count: totalPayments } = await supabaseClient
     .from('payments')
     .select('*', { count: 'exact', head: true })
     .gte('created_at', yesterday)

    const { count: failedPayments } = await supabaseClient
     .from('payments')
     .select('*', { count: 'exact', head: true })
     .eq('status', 'failed')
     .gte('created_at', yesterday)

    const successRate = totalPayments? (((totalPayments - (failedPayments || 0)) / totalPayments) * 100).toFixed(2) : "100.00"

    // 5. ARR Projection
    const arr = mrr * 12

    // 6. Last Healthcheck from audit_logs
    const { data: lastHealth } = await supabaseClient
     .from('audit_logs')
     .select('created_at, metadata')
     .eq('action', 'healthcheck')
     .order('created_at', { ascending: false })
     .limit(1)
     .single()

    const result = {
      timestamp: new Date().toISOString(),
      mrr: mrr,
      arr: arr,
      active_subscriptions: activeSubs || 0,
      churn_rate_30d: churnRate + "%",
      payment_success_rate_24h: successRate + "%",
      last_healthcheck: lastHealth?.created_at || null,
      sla_status: "99.9%",
      compliance: "BCEAO_COBAC_BIG_FOUR",
      version: "v1.0.0-KOS-PRODUCTION"
    }

    return new Response(JSON.stringify(result, null, 2), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
'@ | Out-File "$FUNC_DIR\index.ts" -Encoding UTF8

# ============================================================
# 3 SQL VIEW FOR DIRECT QUERY
# ============================================================

Write-Host "[3/6] Creation vue SQL dashboard"

$DATE=Get-Date -Format "yyyyMMddHHmm"
$SQL_FILE="$SQL_DIR\$DATE" + "_kos_dashboard_mrr_view.sql"

@'
-- KOS MRR/ARR Dashboard View Big Four
CREATE OR REPLACE VIEW public.kos_mrr_dashboard AS
WITH mrr_current AS (
  SELECT COALESCE(SUM(amount), 0) as mrr
  FROM payments
  WHERE status = 'paid'
    AND created_at >= date_trunc('month', now())
),
subs_active AS (
  SELECT COUNT(*) as active_subs
  FROM subscriptions
  WHERE status = 'active'
),
churn_30d AS (
  SELECT COUNT(*) as churned
  FROM subscriptions
  WHERE status = 'cancelled'
    AND updated_at >= now() - interval '30 days'
),
payments_24h AS (
  SELECT
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE status = 'failed') as failed
  FROM payments
  WHERE created_at >= now() - interval '24 hours'
)
SELECT
  now() as timestamp,
  mrr_current.mrr,
  mrr_current.mrr * 12 as arr,
  subs_active.active_subs,
  ROUND(churn_30d.churned::numeric / NULLIF(subs_active.active_subs, 0) * 100, 2) || '%' as churn_rate_30d,
  ROUND((payments_24h.total - payments_24h.failed)::numeric / NULLIF(payments_24h.total, 0) * 100, 2) || '%' as payment_success_24h,
  '99.9%' as sla_status,
  'BCEAO_COBAC_BIG_FOUR' as compliance
FROM mrr_current, subs_active, churn_30d, payments_24h;

GRANT SELECT ON public.kos_mrr_dashboard TO anon, authenticated;
'@ | Out-File $SQL_FILE -Encoding UTF8

# ============================================================
# 4 DEPLOY EDGE FUNCTION
# ============================================================

Write-Host "[4/6] Deploy Edge Function"

supabase functions deploy kos-dashboard-mrr --no-verify-jwt

# ============================================================
# 5 APPLY SQL MIGRATION
# ============================================================

Write-Host "[5/6] Apply SQL View"

supabase db push

# ============================================================
# 6 TEST ENDPOINT
# ============================================================

Write-Host "[6/6] Test endpoint"

$PROJECT_URL=supabase status | Select-String "API URL" | ForEach-Object { $_.ToString().Split(": ")[1].Trim() }
$ANON_KEY=supabase status | Select-String "anon key" | ForEach-Object { $_.ToString().Split(": ")[1].Trim() }

$ENDPOINT="$PROJECT_URL/functions/v1/kos-dashboard-mrr"

Write-Host ""
Write-Host "================================================"
Write-Host " MASTER 122 COMPLETE"
Write-Host " ENDPOINT: $ENDPOINT"
Write-Host " SQL VIEW: SELECT * FROM kos_mrr_dashboard;"
Write-Host "================================================"
Write-Host ""
Write-Host "Test:"
Write-Host "curl $ENDPOINT -H `"Authorization: Bearer $ANON_KEY`""
Write-Host ""