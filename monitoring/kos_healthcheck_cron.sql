-- KOS Health Check Cron - Run every 5 minutes
-- Insert into audit_logs for Big Four trail

INSERT INTO audit_logs (action, status, details, created_at)
SELECT
  'healthcheck',
  'success',
  jsonb_build_object(
    'timestamp', now(),
    'edge_count', (SELECT count(*) FROM supabase_functions),
    'active_subs', (SELECT count(*) FROM subscriptions WHERE status='active'),
    'mrr', (SELECT sum(amount) FROM payments WHERE status='paid' AND created_at > now() - interval '30 days')
  ),
  now();

-- Alert if payment failed in last hour
DO $$
BEGIN
  IF EXISTS(
    SELECT 1 FROM payments
    WHERE status='failed'
    AND created_at > now() - interval '1 hour'
  ) THEN
    INSERT INTO audit_logs (action, status, details)
    VALUES ('alert', 'critical', '{"type":"payment_failed","window":"1h"}');
  END IF;
END$$;

