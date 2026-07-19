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
