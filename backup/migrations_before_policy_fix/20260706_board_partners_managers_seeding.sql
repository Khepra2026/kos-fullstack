-- Fichier: supabase/migrations/20260706_board_partners_managers_seeding.sql
-- KOS AI Autonome — Seeding Gouvernance Exécutive
-- Couvre: ISO 42001 A.5 Leadership, A.6 Planning, SOC2 CC1.1 Governance
-- Idempotent + RLS 100%

BEGIN;

-- 1. SCHEMA GOUVERNANCE
CREATE TABLE IF NOT EXISTS kos_governance_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  level text NOT NULL CHECK (level IN ('board','partner','manager','orchestrator','integrator')),
  domain text NOT NULL, -- regtech, bigfour, ai, security, legal, finance
  responsibility text NOT NULL,
  iso42001_mapping text, -- Ex: A.5.1 Leadership commitment
  soc2_mapping text, -- Ex: CC1.1 Integrity and Ethical Values
  risk_appetite text DEFAULT 'medium' CHECK (risk_appetite IN ('low','medium','high')),
  escalation_path text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kos_governance_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_slug text REFERENCES kos_governance_roles(slug),
  agent_slug text REFERENCES ai_experts(slug), -- lien avec experts existants
  human_approver_email text, -- ISO 42001 A.8.3 Human oversight
  assigned_at timestamptz DEFAULT now(),
  last_review_at timestamptz,
  review_frequency text DEFAULT 'quarterly', -- AI-003
  status text DEFAULT 'active' CHECK (status IN ('active','suspended','review'))
);

CREATE TABLE IF NOT EXISTS kos_decision_logs (
  id bigserial PRIMARY KEY,
  role_slug text NOT NULL,
  decision_type text NOT NULL, -- go_nogo, risk_acceptance, budget, compliance
  decision text NOT NULL,
  rationale text NOT NULL,
  impact_level text NOT NULL CHECK (impact_level IN ('low','medium','high','critical')),
  decided_by text NOT NULL, -- agent_slug ou email humain
  decided_at timestamptz DEFAULT now(),
  evidence_links jsonb DEFAULT '[]'::jsonb,
  iso42001_ref text
);

-- 2. RLS 100% — FIX-006
ALTER TABLE kos_governance_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kos_governance_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE kos_decision_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "board_read_all" ON kos_governance_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "board_write_service" ON kos_governance_roles FOR ALL TO service_role USING (true);
CREATE POLICY "assignments_read_all" ON kos_governance_assignments FOR SELECT TO authenticated USING (true);
CREATE POLICY "assignments_write_service" ON kos_governance_assignments FOR ALL TO service_role USING (true);
CREATE POLICY "decisions_read_all" ON kos_decision_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "decisions_write_service" ON kos_decision_logs FOR ALL TO service_role USING (true);

-- 3. SEEDING IA BOARD — ISO 42001 A.5
INSERT INTO kos_governance_roles (slug, title, level, domain, responsibility, iso42001_mapping, soc2_mapping, risk_appetite, escalation_path) VALUES
('ai-board-chair', 'Chair — AI Governance Board', 'board', 'ai', 'Approbation stratégie IA, registre risques, budget. Veto sur déploiement.', 'A.5.1', 'CC1.1', 'low', 'external_auditor'),
('ai-board-ethics', 'AI Ethics Officer', 'board', 'legal', 'Conformité RGPD, OHADA, biais. DPIA obligatoire.', 'A.5.3', 'CC2.2', 'low', 'ai-board-chair'),
('ai-board-security', 'AI Security Officer', 'board', 'security', 'SEC-001 à SEC-006. Pen test annuel. Incident response.', 'A.5.2', 'CC6.1', 'low', 'ai-board-chair')
ON CONFLICT (slug) DO UPDATE SET responsibility = EXCLUDED.responsibility;

-- 4. SEEDING PARTNERS — Big Four + RegTech
INSERT INTO kos_governance_roles (slug, title, level, domain, responsibility, iso42001_mapping, soc2_mapping, risk_appetite) VALUES
('partner-deloitte-audit', 'Partner Deloitte Audit', 'partner', 'bigfour', 'Audit externe ISO 27001/42001. SoA validation.', 'A.9.2', 'CC4.1', 'low'),
('partner-ey-risk', 'Partner EY Risk Advisory', 'partner', 'bigfour', 'Cartographie risques. PRA/PCA validation.', 'A.6.1', 'CC3.2', 'low'),
('partner-kpmg-regtech', 'Partner KPMG RegTech', 'partner', 'regtech', 'Veille BCEAO/COBAC. Mapping COMP-003.', 'A.5.4', 'CC3.1', 'medium'),
('partner-pwc-ai', 'Partner PwC AI Assurance', 'partner', 'bigfour', 'Audit algorithmes. AI-003 revue trimestrielle.', 'A.8.2', 'CC7.1', 'low')
ON CONFLICT (slug) DO UPDATE SET responsibility = EXCLUDED.responsibility;

-- 5. SEEDING MANAGERS — Opérationnel RegTech + Big Four
INSERT INTO kos_governance_roles (slug, title, level, domain, responsibility, iso42001_mapping, soc2_mapping, risk_appetite) VALUES
('manager-regtech-compliance', 'Manager RegTech Compliance', 'manager', 'regtech', 'COMP-003: Matrice BCEAO→contrôle. Reporting mensuel.', 'A.6.1', 'CC3.3', 'medium'),
('manager-bigfour-soc2', 'Manager SOC2 Control', 'manager', 'bigfour', 'Collecte evidence SOC2. DLQ=0. RTO<5min.', 'A.8.1', 'CC4.2', 'medium'),
('manager-bigfour-iso', 'Manager ISO 27001 ISMS', 'manager', 'bigfour', 'Maintien ISMS. REV-001 test PRA/PCA.', 'A.9.1', 'CC5.1', 'medium'),
('manager-ai-ops', 'Manager AI Operations', 'manager', 'ai', 'AI-001: Eval prompts hebdo. AI-002: Validation RAG.', 'A.8.2', 'CC7.2', 'high')
ON CONFLICT (slug) DO UPDATE SET responsibility = EXCLUDED.responsibility;

-- 6. SEEDING AI ORCHESTRATEURS + INTÉGRATEURS SYSTÈMES
INSERT INTO kos_governance_roles (slug, title, level, domain, responsibility, iso42001_mapping, risk_appetite) VALUES
('orchestrator-hermes-master', 'Hermes Master Orchestrator', 'orchestrator', 'ai', 'Route vers 11 experts. Log ISO 42001. Human override si risk=critical.', 'A.7.2', 'high'),
('integrator-supabase-docker', 'Intégrateur Supabase/Docker', 'integrator', 'infra', 'INFRA-002: Réplication. DEVOPS-001: CI/CD. PRA/PCA auto.', 'A.8.1', 'high'),
('integrator-n8n-grafana', 'Intégrateur n8n/Grafana', 'integrator', 'observability', 'OBS-001: Dashboard. OBS-004: Alerting. FIX-003 DLQ.', 'A.8.1', 'high')
ON CONFLICT (slug) DO UPDATE SET responsibility = EXCLUDED.responsibility;

-- 7. INDEXES PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_governance_roles_level ON kos_governance_roles(level, active);
CREATE INDEX IF NOT EXISTS idx_governance_roles_domain ON kos_governance_roles(domain);
CREATE INDEX IF NOT EXISTS idx_decision_logs_role ON kos_decision_logs(role_slug, decided_at DESC);
CREATE INDEX IF NOT EXISTS idx_decision_logs_type ON kos_decision_logs(decision_type, decided_at DESC);
CREATE INDEX IF NOT EXISTS idx_assignments_role ON kos_governance_assignments(role_slug);
CREATE INDEX IF NOT EXISTS idx_assignments_agent ON kos_governance_assignments(agent_slug);

COMMIT;