-- Migration billing KOS - Conforme COBAC 10 ans - IDEMPOTENT
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('STARTER','BUSINESS','ENTERPRISE')),
  status TEXT DEFAULT 'pending',
  quota INTEGER,
  agents_allowed INTEGER,
  started_at TIMESTAMPTZ,
  paydunya_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usage_meter (
  id BIGSERIAL PRIMARY KEY,
  org_id TEXT NOT NULL,
  calls INTEGER NOT NULL,
  amount_xaf INTEGER NOT NULL,
  billed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS billing_audit (
  id BIGSERIAL PRIMARY KEY,
  org_id TEXT NOT NULL,
  plan TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'XAF',
  provider TEXT DEFAULT 'paydunya',
  event TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_org ON subscriptions(org_id);
CREATE INDEX IF NOT EXISTS idx_usage_org ON usage_meter(org_id, billed_at);
