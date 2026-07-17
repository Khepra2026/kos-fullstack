-- MIGRATION: KOS AI Autonome - Seeding Claude + LLM API + Fallback
-- Corrige AI-001, AI-003 : monitoring prompts + registre risques
-- Deployed: 2026-07-06

-- 1. Table providers LLM
CREATE TABLE IF NOT EXISTS public.ai_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL CHECK (provider IN ('anthropic','openai','mistral','local','kos-automaton')),
  model text NOT NULL,
  api_key_secret_name text,
  base_url text,
  priority int NOT NULL DEFAULT 100,
  enabled boolean DEFAULT true,
  max_tokens int DEFAULT 4096,
  temperature numeric(3,2) DEFAULT 0.3,
  daily_quota int,
  used_today int DEFAULT 0,
  last_reset date DEFAULT CURRENT_DATE,
  risk_level text DEFAULT 'medium' CHECK (risk_level IN ('low','medium','high')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.ai_providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_providers_read" ON public.ai_providers FOR SELECT TO authenticated USING (enabled = true);
CREATE POLICY "ai_providers_write" ON public.ai_providers FOR ALL TO service_role USING (true);

-- 2. Table prompts versionnes + monitoring AI-001
CREATE TABLE IF NOT EXISTS public.ai_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  version int NOT NULL DEFAULT 1,
  prompt text NOT NULL,
  variables jsonb DEFAULT '[]'::jsonb,
  provider text DEFAULT 'anthropic',
  model text DEFAULT 'claude-3-5-sonnet-20241022',
  eval_score numeric(5,2),
  last_eval_at timestamptz,
  risk_flags jsonb DEFAULT '[]'::jsonb,
  active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.ai_prompts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_prompts_read" ON public.ai_prompts FOR SELECT TO authenticated USING (active = true);
CREATE POLICY "ai_prompts_write" ON public.ai_prompts FOR ALL TO service_role USING (true);

-- 3. Logs inference OBS-001 + SOC2 + ISO 42001
CREATE TABLE IF NOT EXISTS public.ai_inference_logs (
  id bigserial PRIMARY KEY,
  provider text NOT NULL,
  model text NOT NULL,
  prompt_id uuid REFERENCES public.ai_prompts(id),
  input_tokens int,
  output_tokens int,
  latency_ms int,
  cost_usd numeric(10,6),
  status text NOT NULL,
  error_message text,
  user_id uuid REFERENCES auth.users(id),
  session_id text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_inference_logs_created ON public.ai_inference_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_inference_logs_provider_status ON public.ai_inference_logs (provider, status);
ALTER TABLE public.ai_inference_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_logs_service" ON public.ai_inference_logs FOR ALL TO service_role USING (true);

-- 4. SEEDING providers
INSERT INTO public.ai_providers (provider, model, api_key_secret_name, base_url, priority, daily_quota, risk_level)
SELECT * FROM (VALUES
  ('anthropic', 'claude-3-5-sonnet-20241022', 'ANTHROPIC_API_KEY', 'https://api.anthropic.com/v1', 1, 1000000, 'low'),
  ('anthropic', 'claude-3-haiku-20240307', 'ANTHROPIC_API_KEY', 'https://api.anthropic.com/v1', 2, 5000000, 'low'),
  ('openai', 'gpt-4o', 'OPENAI_API_KEY', 'https://api.openai.com/v1', 3, 500000, 'medium'),
  ('mistral', 'mistral-large-latest', 'MISTRAL_API_KEY', 'https://api.mistral.ai/v1', 4, 1000000, 'medium'),
  ('kos-automaton', 'local-rag-v1', NULL, NULL, 99, NULL, 'low')
) AS t(provider, model, api_key_secret_name, base_url, priority, daily_quota, risk_level)
WHERE NOT EXISTS (SELECT 1 FROM public.ai_providers WHERE provider = t.provider AND model = t.model);

-- 5. SEEDING prompts de base
INSERT INTO public.ai_prompts (name, prompt, variables, provider, model)
SELECT * FROM (VALUES
  ('kos_system_router',
   'Tu es KOS, Knowledge Operating System. Reponds en {{language}}. Contexte: {{context}}. Regles: 1) Jamais d''hallucination. 2) Cite sources si RAG. 3) Format markdown. Question: {{question}}',
   '["language","context","question"]'::jsonb, 'anthropic', 'claude-3-5-sonnet-20241022'),
  ('kos_summarize_audit',
   'Synthetise ce rapport Big Four en 5 bullets executifs. Donnees: {{report_json}}. Focus: risques, gains, actions.',
   '["report_json"]'::jsonb, 'anthropic', 'claude-3-5-sonnet-20241022'),
  ('kos_automaton_fallback',
   'Mode degrade: reponds avec la base RAG locale. Question: {{question}}. Si inconnu, dis "Donnee non disponible dans KOS local".',
   '["question"]'::jsonb, 'kos-automaton', 'local-rag-v1')
) AS t(name, prompt, variables, provider, model)
WHERE NOT EXISTS (SELECT 1 FROM public.ai_prompts WHERE name = t.name);