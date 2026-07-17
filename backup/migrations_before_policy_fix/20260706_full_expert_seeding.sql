-- Fichier: supabase/migrations/20260706_full_expert_seeding.sql
-- Corrige AI-001 AI-002 AI-003 : monitoring, validation, registre risques
-- Périmètre: Web, RegTech, Claude Routine, Rédacteurs HBR, Sectoriel, Régulation, Crawling, Big Four, OpenAI, Moteurs sémantiques, Droit technique

-- 1. SCHEMA EXPERTS
CREATE TABLE IF NOT EXISTS ai_experts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  domain text NOT NULL,
  model_provider text NOT NULL,
  model_name text NOT NULL,
  system_prompt text NOT NULL,
  risk_level text NOT NULL DEFAULT 'medium',
  source_validation_cycle text NOT NULL DEFAULT 'quarterly',
  kpi_eval_frequency text NOT NULL DEFAULT 'weekly',
  active boolean DEFAULT true,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_expert_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id uuid REFERENCES ai_experts(id) ON DELETE CASCADE,
  source_type text NOT NULL,
  source_url text,
  source_hash text,
  last_validated_at timestamptz,
  validation_status text DEFAULT 'pending',
  metadata jsonb
);

CREATE TABLE IF NOT EXISTS ai_expert_evals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id uuid REFERENCES ai_experts(id) ON DELETE CASCADE,
  eval_date date DEFAULT current_date,
  hallucination_rate numeric(5,2),
  latency_p95_ms integer,
  accuracy_score numeric(5,2),
  compliance_score numeric(5,2),
  notes text
);

CREATE TABLE IF NOT EXISTS ai_risk_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_slug text NOT NULL,
  review_date timestamptz DEFAULT now(),
  risk_level text NOT NULL,
  metrics jsonb,
  status text DEFAULT 'pending_review',
  reviewer_notes text,
  created_at timestamptz DEFAULT now()
);

-- 2. RLS: 100% coverage pour FIX-006
ALTER TABLE ai_experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_expert_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_expert_evals ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_risk_registry ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'service_role_all' AND tablename = 'ai_experts') THEN
    CREATE POLICY "service_role_all" ON ai_experts FOR ALL USING (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_read' AND tablename = 'ai_experts') THEN
    CREATE POLICY "authenticated_read" ON ai_experts FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'service_role_all' AND tablename = 'ai_expert_sources') THEN
    CREATE POLICY "service_role_all" ON ai_expert_sources FOR ALL USING (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'service_role_all' AND tablename = 'ai_expert_evals') THEN
    CREATE POLICY "service_role_all" ON ai_expert_evals FOR ALL USING (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'service_role_all' AND tablename = 'ai_risk_registry') THEN
    CREATE POLICY "service_role_all" ON ai_risk_registry FOR ALL USING (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'authenticated_read' AND tablename = 'ai_risk_registry') THEN
    CREATE POLICY "authenticated_read" ON ai_risk_registry FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- 3. SEEDING COMPLET : 11 FAMILLES D'EXPERTS
INSERT INTO ai_experts (slug, name, domain, model_provider, model_name, system_prompt, risk_level, metadata) VALUES
('web-researcher-claude', 'Claude Web Researcher', 'web', 'claude', 'claude-3-5-sonnet-20241022', 'Tu es un expert recherche web. Cite tes sources. Aucune hallucination. Si incertain, dis "Je ne sais pas".', 'low', '{"tools":["browser.search","crawler"]}'),
('regtech-bceao-cobac', 'Expert BCEAO/COBAC', 'regtech', 'kos-automaton', 'kos-regtech-1.0', 'Tu maîtrises BCEAO, COBAC, UMOA. Réponds avec articles de loi exacts. Mapping COMP-003.', 'high', '{"jurisdictions":["SN","CI","TG"],"sources":["bceao.int","cobac.org"]}'),
('claude-routine-daily', 'Claude Daily Automaton', 'routine', 'claude', 'claude-3-5-sonnet-20241022', 'Routine quotidienne : veille, résumé, alertes. Format JSON strict.', 'low', '{"cron":"0 7 * * *","outputs":["briefing","alerts"]}'),
('hbr-strategy-writer', 'HBR Strategy Writer', 'hbr', 'openai', 'gpt-4o', 'Tu écris dans le style HBR : data-driven, frameworks, cas concrets. Ton 8/10 académique.', 'medium', '{"style_guide":"hbr","citations":"apa"}'),
('sector-banking-africa', 'Analyste Bancaire Afrique', 'sectorial', 'kos-automaton', 'kos-sector-1.0', 'Tu analyses le secteur bancaire UEMOA. Données jusqu''à T2 2026. Cite rapports BCEAO.', 'medium', '{"sectors":["banking"],"geo":["UEMOA"]}'),
('legal-rgpd-ohada', 'Expert RGPD + OHADA', 'law', 'claude', 'claude-3-5-sonnet-20241022', 'Tu es juriste RGPD + OHADA. Tu ne donnes pas de conseil personnalisé. Tu cites les textes.', 'critical', '{"law_refs":["RGPD Art.5","OHADA AUDCIF"]}'),
('crawler-bigfour-reports', 'Crawler Big Four', 'crawling', 'kos-automaton', 'kos-crawler-1.0', 'Tu crawles Deloitte, EY, KPMG, PwC. Tu extrais insights audit, risk, compliance. Respecte robots.txt.', 'high', '{"targets":["deloitte.com","ey.com","kpmg.com","pwc.com"]}'),
('openai-gpt4o-turbo', 'OpenAI Analyst', 'openai', 'openai', 'gpt-4o', 'Tu es analyste généraliste. Tu délègues à Claude si question régulation. Tu traces tes tokens.', 'medium', '{"fallback":"claude-routine-daily"}'),
('semantic-rag-controller', 'Semantic RAG Orchestrator', 'semantic', 'kos-automaton', 'kos-rag-2.0', 'Tu orchestres le RAG : embedding, rerank, citation. Zéro OpenAI. 100% Supabase pgvector.', 'medium', '{"vector_dims":1536,"chunk_size":512}'),
('tech-law-api-licensing', 'Expert Droit Tech & API', 'law-tech', 'claude', 'claude-3-5-sonnet-20241022', 'Tu maîtrises droit des API, licences OSS, DORA, NIS2. Tu alertes sur risques contractuels.', 'high', '{"regs":["DORA","NIS2","RGPD"]}'),
('kos-automaton-master', 'KOS Automaton Master', 'orchestration', 'kos-automaton', 'kos-master-1.0', 'Tu es le chef d''orchestre. Tu routes vers l''expert compétent. Tu loggues tout dans audit_logs. Tu respectes ISO 42001.', 'critical', '{"routing":"auto","audit":true,"human_escalation":"risk_level >= high"}')
ON CONFLICT (slug) DO UPDATE SET
  system_prompt = EXCLUDED.system_prompt,
  updated_at = now();

-- 4. INDEX pour PERF-003
CREATE INDEX IF NOT EXISTS idx_ai_experts_domain ON ai_experts(domain);
CREATE INDEX IF NOT EXISTS idx_ai_experts_active ON ai_experts(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_ai_expert_evals_date ON ai_expert_evals(eval_date DESC);
CREATE INDEX IF NOT EXISTS idx_ai_risk_registry_slug ON ai_risk_registry(expert_slug);