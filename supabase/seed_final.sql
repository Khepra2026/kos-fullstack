CREATE TABLE IF NOT EXISTS kos_regulatory_sources (
  id SERIAL PRIMARY KEY,
  authority TEXT NOT NULL,
  official_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'kos_regulatory_sources_authority_unique') THEN
    ALTER TABLE kos_regulatory_sources ADD CONSTRAINT kos_regulatory_sources_authority_unique UNIQUE (authority);
  END IF;
END $$;
INSERT INTO kos_regulatory_sources (authority, official_url, is_active, updated_at)
VALUES
  ('BCEAO','https://www.bceao.int',true,NOW()),
  ('COBAC','https://www.beac.int',true,NOW()),
  ('OHADA','https://www.ohada.org',true,NOW()),
  ('GAFI','https://www.fatf-gafi.org',true,NOW()),
  ('ISSB','https://www.ifrs.org',true,NOW())
ON CONFLICT (authority) DO UPDATE SET official_url=EXCLUDED.official_url, is_active=true, updated_at=NOW();
SELECT * FROM kos_regulatory_sources;
