-- Migration 20260708 : Tables COBAC + OHADA + AO/AMI multilatérales + Abonnements alertes
-- Pipeline Big Four : sourcing réglementaire CEMAC/OHADA + veille opportunités bailleurs

-- 1. COBAC : règlements CEMAC
CREATE TABLE IF NOT EXISTS public.cobac_reglements (
  id SERIAL PRIMARY KEY,
  numero TEXT UNIQUE NOT NULL, -- 'R-2016/01', 'COBAC-DEC-2024-05'
  titre TEXT NOT NULL,
  date_pub DATE NOT NULL,
  url_pdf TEXT NOT NULL,
  themes TEXT[], -- {'agrements','fonds_propres','LBC/FT','Bale_III'}
  pays TEXT[] DEFAULT ARRAY['CM','CF','TD','CG','GQ','GA'], -- CEMAC
  bigfour_impact INT DEFAULT 95,
  crawled BOOLEAN DEFAULT false,
  last_hash TEXT
);

-- 2. OHADA : actes uniformes + jurisprudence
CREATE TABLE IF NOT EXISTS public.ohada_actes (
  id SERIAL PRIMARY KEY,
  type TEXT CHECK (type IN ('AU','Reglement','Avis','Jurisprudence')),
  numero TEXT UNIQUE NOT NULL, -- 'AUDCIF-2017', 'CCJA-Arrêt-2025-12'
  titre TEXT NOT NULL,
  date_pub DATE NOT NULL,
  url_pdf TEXT NOT NULL,
  pays TEXT[] DEFAULT ARRAY['BJ','BF','CM','CF','KM','CG','CI','GA','GN','GW','GQ','ML','NE','CD','SN','TD','TG'], -- 17 états
  themes TEXT[], -- {'comptable','societes','suretes','arbitrage'}
  crawled BOOLEAN DEFAULT false,
  last_hash TEXT
);

-- 3. AO/AMI Banque Mondiale + BAD + UE + USAID
CREATE TABLE IF NOT EXISTS public.ao_ami (
  id BIGSERIAL PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('WB','AfDB','EU','USAID','BOAD','BIDC')),
  project_id TEXT, -- 'P179456'
  titre TEXT NOT NULL,
  pays TEXT NOT NULL, -- ISO2
  montant_usd BIGINT, -- Budget
  devise TEXT DEFAULT 'USD',
  deadline TIMESTAMPTZ NOT NULL,
  url TEXT UNIQUE NOT NULL,
  secteurs TEXT[], -- {'Finance','Gouvernance','Digital','ESG'}
  type TEXT CHECK (type IN ('AO','AMI','DP','QCBS')),
  eligibility TEXT[], -- {'PME','Cabinets','BigFour'}
  crawled_at TIMESTAMPTZ DEFAULT now(),
  content_hash TEXT UNIQUE,
  notified BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS ao_pays_idx ON public.ao_ami (pays, deadline);
CREATE INDEX IF NOT EXISTS ao_budget_idx ON public.ao_ami (montant_usd) WHERE montant_usd > 1000000;
CREATE INDEX IF NOT EXISTS ao_secteur_idx ON public.ao_ami USING GIN (secteurs);

-- 4. Abonnements alertes par pays/budget pour clients Big Four
CREATE TABLE IF NOT EXISTS public.ao_alert_subs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  pays TEXT[], -- {'SN','CI','TG'} null = tous
  budget_min BIGINT DEFAULT 0,
  budget_max BIGINT DEFAULT 999999999999,
  secteurs TEXT[], -- {'Gouvernance'} null = tous
  networks TEXT[] DEFAULT ARRAY['slack','email'], -- où envoyer
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. RLS Big Four
ALTER TABLE public.ao_ami ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ao_public' AND tablename = 'ao_ami') THEN
    CREATE POLICY "ao_public" ON public.ao_ami FOR SELECT USING (true);
  END IF;
END $$;

ALTER TABLE public.ao_alert_subs ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'subs_own' AND tablename = 'ao_alert_subs') THEN
    CREATE POLICY "subs_own" ON public.ao_alert_subs FOR ALL USING (auth.jwt() ->> 'email' = user_email);
  END IF;
END $$;