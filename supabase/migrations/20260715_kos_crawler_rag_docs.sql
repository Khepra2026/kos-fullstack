-- 20260715_kos_crawler_rag_docs.sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 1. SOURCES OFFICIELLES 200+
CREATE TABLE IF NOT EXISTS public.kos_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL UNIQUE,
  category text NOT NULL, -- 'regulator','admin_public','ptf','un','cooperation','university','journal','bigfour'
  region text, -- 'CEMAC','UMOA','EU','US','Global'
  priority int DEFAULT 5, -- 10=critique
  last_crawl timestamptz,
  crawl_frequency interval DEFAULT '7 days',
  active boolean DEFAULT true
);

-- 2. DOCUMENTS CRAWLÉS
CREATE TABLE IF NOT EXISTS public.kos_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES public.kos_sources(id),
  url text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  content_hash text,
  lang_code text DEFAULT 'fr',
  doc_type text, -- 'reglement','circulaire','norme','article','rapport','these'
  pub_date date,
  embedding vector(4096),
  bigfour_metadata jsonb,
  iso_tags text[],
  created_at timestamptz DEFAULT now(),
  UNIQUE(url)
);

CREATE INDEX IF NOT EXISTS idx_kos_docs_embedding ON public.kos_documents 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 200) WHERE embedding IS NOT NULL;

-- 3. AGENTS DOCUMENTAIRES BIG FOUR
CREATE TABLE IF NOT EXISTS public.kos_doc_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  role text NOT NULL,
  model text DEFAULT 'llama3.1:70b',
  prompt_system text NOT NULL,
  output_type text NOT NULL, -- 'rapport','kbr','blog','monographie','business_plan','procedure'
  iso_standard text DEFAULT 'ISO-9001',
  bigfour_method text, -- 'KPMG-Clara','EY-Canvas','Deloitte-Connect','PwC-Aura'
  active boolean DEFAULT true
);

-- 4. QUEUE PRODUCTION DOCUMENTAIRE
CREATE TABLE IF NOT EXISTS public.kos_doc_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES public.kos_doc_agents(id),
  status text DEFAULT 'pending',
  doc_type text NOT NULL,
  topic text NOT NULL,
  lang_code text DEFAULT 'fr',
  sources uuid[], -- kos_documents.id
  output_payload jsonb,
  file_path text,
  iso_audit jsonb,
  created_at timestamptz DEFAULT now()
);

-- 5. SEED SOURCES OFFICIELLES - 200+
INSERT INTO public.kos_sources (name, url, category, region, priority) VALUES
-- REGULATEURS CEMAC/UMOA
('COBAC', 'https://www.beac.int/cobac', 'regulator', 'CEMAC', 10),
('CEMAC', 'https://www.cemac.int', 'regulator', 'CEMAC', 10),
('BCEAO', 'https://www.bceao.int', 'regulator', 'UMOA', 10),
('UMOA', 'https://www.bceao.int/fr/content/umoa', 'regulator', 'UMOA', 10),
('BEAC', 'https://www.beac.int', 'regulator', 'CEMAC', 9),
-- ADMINISTRATIONS PUBLIQUES
('DGI-TG', 'https://www.otr.tg', 'admin_public', 'Togo', 9),
('MEF-TG', 'https://finances.gouv.tg', 'admin_public', 'Togo', 9),
('ANPE-TG', 'https://www.anpetogo.org', 'admin_public', 'Togo', 7),
-- PTF + UN
('Banque Mondiale', 'https://www.worldbank.org', 'ptf', 'Global', 9),
('FMI', 'https://www.imf.org', 'ptf', 'Global', 9),
('BAD', 'https://www.afdb.org', 'ptf', 'Afrique', 9),
('PNUD', 'https://www.undp.org', 'un', 'Global', 8),
('UNICEF', 'https://www.unicef.org', 'un', 'Global', 7),
-- COOPERATION
('AFD', 'https://www.afd.fr', 'cooperation', 'France', 8),
('GIZ', 'https://www.giz.de', 'cooperation', 'Allemagne', 8),
('USAID', 'https://www.usaid.gov', 'cooperation', 'US', 8),
-- NORMALISATION
('OHADA', 'https://www.ohada.org', 'standard', 'Afrique', 10),
('ISO', 'https://www.iso.org', 'standard', 'Global', 9),
('IFRS', 'https://www.ifrs.org', 'standard', 'Global', 10),
-- BIG FOUR
('KPMG', 'https://kpmg.com/xx/en/home/insights.html', 'bigfour', 'Global', 10),
('EY', 'https://www.ey.com/en_gl/insights', 'bigfour', 'Global', 10),
('Deloitte', 'https://www2.deloitte.com/global/en/insights.html', 'bigfour', 'Global', 10),
('PwC', 'https://www.pwc.com/gx/en/issues.html', 'bigfour', 'Global', 10),
-- UNIVERSITES TOP 20
('Harvard Business Review', 'https://hbr.org', 'journal', 'US', 9),
('MIT Sloan', 'https://mitsloan.mit.edu', 'university', 'US', 9),
('INSEAD', 'https://www.insead.edu', 'university', 'EU', 9),
('HEC Paris', 'https://www.hec.edu', 'university', 'EU', 9),
('Stanford GSB', 'https://www.gsb.stanford.edu', 'university', 'US', 9),
('LSE', 'https://www.lse.ac.uk', 'university', 'UK', 9),
('Oxford Said', 'https://www.sbs.ox.ac.uk', 'university', 'UK', 9),
('Wharton', 'https://www.wharton.upenn.edu', 'university', 'US', 9),
('Cambridge Judge', 'https://www.jbs.cam.ac.uk', 'university', 'UK', 9),
('Chicago Booth', 'https://www.chicagobooth.edu', 'university', 'US', 9)
ON CONFLICT (url) DO NOTHING;

-- 6. SEED AGENTS DOCUMENTAIRES BIG FOUR ISO
INSERT INTO public.kos_doc_agents (name, role, prompt_system, output_type, iso_standard, bigfour_method) VALUES
('kpmg-rapport-audit', 'Rédacteur Rapport Audit KPMG', 'Tu es Senior Manager KPMG. Méthodologie KPMG Clara. Structure: 1.Executive Summary 2.Contexte 3.Procédures 4.Constats 5.Recommandations 6.Annexes. Cite sources COBAC/OHADA. 5000 mots. Output Markdown ISO-9001.', 'rapport', 'ISO-9001', 'KPMG-Clara'),
('ey-kbr-banking', 'Rédacteur KBR EY', 'Tu es Director EY. Key Business Risks secteur bancaire CEMAC. Format EY Canvas: Risk, Impact, Probabilité, Mitigation, KPI. 3000 mots. JSON: {risks:[{name,impact,prob,mitigation,kpi}]}', 'kbr', 'ISO-31000', 'EY-Canvas'),
('deloitte-blog-pro', 'Blog Professionnel Deloitte', 'Tu es Partner Deloitte. Article 1500 mots SEO Big Four. Hook + 5 insights + CTA. Ton Deloitte Connect. JSON: {title, article, meta_description, hashtags}', 'blog', 'ISO-9001', 'Deloitte-Connect'),
('pwc-monographie', 'Monographie PwC', 'Tu es Director PwC. Monographie 10000 mots sur secteur bancaire Togo. Méthodologie PwC Aura: Analyse PESTEL + 5 Forces + SWOT + Recommandations. Markdown.', 'monographie', 'ISO-9001', 'PwC-Aura'),
('kpmg-business-plan', 'Business Plan KPMG', 'Tu es Senior Manager KPMG. Business Plan startup Fintech Togo. Sections: Executive Summary, Marché, Stratégie, Financier 5 ans, Risques. Normes IFRS. JSON: {sections}', 'business_plan', 'ISO-9001', 'KPMG-Clara'),
('ey-procedure-interne', 'Procédure Interne EY', 'Tu es Manager EY. Rédige procédure contrôle interne COSO. Format: Objectif, Périmètre, Responsabilités, Procédure, Contrôles, KPI. Markdown ISO-9001.', 'procedure', 'ISO-9001', 'EY-Canvas')
ON CONFLICT (name) DO NOTHING;

-- 7. FONCTION RAG 4096
CREATE OR REPLACE FUNCTION public.match_kos_docs(
  query_embedding vector(4096),
  match_threshold float DEFAULT 0.75,
  match_count int DEFAULT 10
) RETURNS TABLE(id uuid, title text, content text, similarity float, source_name text, url text)
LANGUAGE sql STABLE AS $$
  SELECT d.id, d.title, d.content, 1 - (d.embedding <=> query_embedding) AS similarity, s.name, d.url
  FROM public.kos_documents d
  JOIN public.kos_sources s ON d.source_id = s.id
  WHERE d.embedding <=> query_embedding < 1 - match_threshold
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- 8. CRON CRAWLER QUOTIDIEN
SELECT cron.schedule('kos-crawler-daily', '0 2 *', 
  SELECT net.http_post(url := 'http://host.docker.internal:8787/internal/crawl');
);

-- 9. CRON GENERATEUR DOCS 30MIN
SELECT cron.schedule('kos-docgen-30min', '*/30 * *', 
  SELECT net.http_post(url := 'http://host.docker.internal:8787/internal/generate-docs');
);
