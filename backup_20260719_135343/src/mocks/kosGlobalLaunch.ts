// ============================================================
// KOS GLOBAL LAUNCH SYSTEM™ — Lancement Global de Tous les Blocs
// 7 blocs KOS : Agents, Corrections, SEO/AEO, Content AI,
// Qualité, Sécurité, Web Ops
// Bouton unique "LANCER TOUT" + lancement par bloc
// ============================================================

export interface globalBlock {
  id: string;
  name: string;
  icon: string;
  color: string;
  route: string;
  description: string;
  domain: 'execution' | 'correction' | 'seo' | 'content' | 'quality' | 'security' | 'ops';
  stats: {
    total_tasks: number;
    critical: number;
    urgent: number;
    planned: number;
    completed: number;
    in_progress: number;
    estimated_minutes: number;
    agents_count: number;
    success_rate: number;
  };
  tasks: globalTask[];
}

export interface globalTask {
  id: string;
  title: string;
  priority: 'critical' | 'urgent' | 'planned';
  status: 'pending' | 'in_progress' | 'completed';
  agent_name: string;
  estimated_minutes: number;
  impact: string;
  auto_fix: boolean;
}

export interface globalLaunchStats {
  total_blocks: number;
  total_tasks: number;
  total_critical: number;
  total_urgent: number;
  total_planned: number;
  total_completed: number;
  total_in_progress: number;
  total_estimated_minutes: number;
  total_agents: number;
  avg_success_rate: number;
  blocks_ready: number;
  blocks_active: number;
}

export const KOS_GLOBAL_BLOCKS: globalBlock[] = [
  // ============================================================
  // BLOC 1 : Déploiement Agents & Automates
  // ============================================================
  {
    id: 'block-agents',
    name: 'Déploiement Agents',
    icon: 'ri-robot-line',
    color: '#BE123C',
    route: '/kos-block-execution',
    description: 'Déploiement massif des 333 agents sur 13 familles. Pipeline CI/CD, auto-enablement, validation KPO Big Four. 99 gaps restants à combler.',
    domain: 'execution',
    stats: {
      total_tasks: 100,
      critical: 14,
      urgent: 23,
      planned: 63,
      completed: 100,
      in_progress: 0,
      estimated_minutes: 274,
      agents_count: 333,
      success_rate: 100,
    },
    tasks: [
      { id: 'ag-001', title: 'Stabiliser pipeline CI/CD — 5 agents Fullstack Dev bloqués', priority: 'critical', status: 'completed', agent_name: 'Osiris', estimated_minutes: 42, impact: 'Débloque 5 agents, +8% KPO', auto_fix: true },
      { id: 'ag-002', title: 'Fine-tuning GPT-5 — 4 agents Experts LLM en attente', priority: 'critical', status: 'completed', agent_name: 'Thot', estimated_minutes: 36, impact: 'Débloque 4 agents, +5% KPO', auto_fix: false },
      { id: 'ag-003', title: 'Dashboard UEMOA — 2 agents BI non finalisés', priority: 'critical', status: 'completed', agent_name: 'Apis', estimated_minutes: 28, impact: 'Débloque 2 agents, dashboard exécutif live', auto_fix: true },
      { id: 'ag-004', title: 'Modèle stress-test BCEAO validation', priority: 'critical', status: 'completed', agent_name: 'Apis', estimated_minutes: 32, impact: 'Validation réglementaire BCEAO', auto_fix: false },
      { id: 'ag-005', title: 'Cache sémantique Experts LLM — optimisation coûts tokens', priority: 'urgent', status: 'completed', agent_name: 'Thot', estimated_minutes: 16, impact: 'Réduction 40% coûts tokens', auto_fix: true },
      { id: 'ag-006', title: 'Documentation API — 3 agents Fullstack Dev', priority: 'urgent', status: 'completed', agent_name: 'Ptah', estimated_minutes: 14, impact: 'Accélération onboarding agents', auto_fix: true },
      { id: 'ag-007', title: 'Intégration CRM — 2 agents Commercial & Marketing', priority: 'urgent', status: 'completed', agent_name: 'Sekhmet', estimated_minutes: 12, impact: 'Pipeline commercial unifié', auto_fix: true },
      { id: 'ag-008', title: 'Campagnes Q3 — Community Manager validation', priority: 'urgent', status: 'completed', agent_name: 'Bastet', estimated_minutes: 8, impact: 'Calendrier Q3 activé', auto_fix: false },
      { id: 'ag-009', title: 'Templates corporate Designer Infographe', priority: 'urgent', status: 'completed', agent_name: 'Ptah', estimated_minutes: 10, impact: 'Identité visuelle cohérente', auto_fix: true },
      { id: 'ag-010', title: 'Intégration Figma API — 2 agents Designer', priority: 'urgent', status: 'completed', agent_name: 'Ptah', estimated_minutes: 6, impact: 'Workflow design automatisé', auto_fix: true },
      { id: 'ag-011', title: 'Intégration TikTok API — Community Manager', priority: 'planned', status: 'completed', agent_name: 'Bastet', estimated_minutes: 4, impact: 'Couverture réseau social +1', auto_fix: true },
      { id: 'ag-012', title: 'CDN multi-région — Web Ops upgrade', priority: 'planned', status: 'completed', agent_name: 'Anubis', estimated_minutes: 8, impact: 'Performance globale +15%', auto_fix: true },
      { id: 'ag-013', title: 'DNS failover configuration', priority: 'planned', status: 'completed', agent_name: 'Anubis', estimated_minutes: 6, impact: 'Haute disponibilité 99.99%', auto_fix: true },
      { id: 'ag-014', title: 'Mise à jour ISO 9001:2026 — Organisation & Qualité', priority: 'planned', status: 'completed', agent_name: 'Maat', estimated_minutes: 8, impact: 'Certification ISO maintenue', auto_fix: false },
    ],
  },

  // ============================================================
  // BLOC 2 : Correction Engine — Performance, SEO, Assets
  // ============================================================
  {
    id: 'block-correction',
    name: 'Correction Engine',
    icon: 'ri-tools-line',
    color: '#EA580C',
    route: '/kos-correction-engine',
    description: 'Corrections autonomes : Core Web Vitals, SEO technique, compression assets, accessibilité WCAG 2.2, sécurité OWASP. Boucle fermée Scan→Fix→Verify→Optimize.',
    domain: 'correction',
    stats: {
      total_tasks: 49,
      critical: 2,
      urgent: 12,
      planned: 35,
      completed: 49,
      in_progress: 0,
      estimated_minutes: 86,
      agents_count: 9,
      success_rate: 100,
    },
    tasks: [
      { id: 'co-001', title: 'LCP > 3s sur /services — Hero JPEG 520 Ko + PNG 680 Ko', priority: 'critical', status: 'completed', agent_name: 'KOS Performance Agent', estimated_minutes: 12, impact: 'LCP -1.1s, Lighthouse +12 pts mobile', auto_fix: true },
      { id: 'co-002', title: 'LCP /case-studies — Banner PNG→AVIF + preload', priority: 'critical', status: 'completed', agent_name: 'KOS Assets Agent', estimated_minutes: 8, impact: 'LCP -0.8s', auto_fix: true },
      { id: 'co-003', title: '5 PNG convertis en WebP sur /blog — 1.28 Mo → 320 Ko', priority: 'urgent', status: 'completed', agent_name: 'KOS Assets Agent', estimated_minutes: 6, impact: 'Page weight -960 Ko', auto_fix: true },
      { id: 'co-004', title: 'Conversion AVIF sur 8 images services — 1.86 Mo → 520 Ko', priority: 'urgent', status: 'completed', agent_name: 'KOS Assets Agent', estimated_minutes: 10, impact: 'Page weight -1.34 Mo', auto_fix: true },
      { id: 'co-005', title: 'Tree shaking sur vendor-react.chunk.js — 185 Ko → 95 Ko', priority: 'urgent', status: 'completed', agent_name: 'KOS Performance Agent', estimated_minutes: 8, impact: 'JS -90 Ko, TBT -25ms', auto_fix: true },
      { id: 'co-006', title: 'Defer scripts non critiques sur 15 pages — TBT 180ms → 98ms', priority: 'urgent', status: 'completed', agent_name: 'KOS Performance Agent', estimated_minutes: 6, impact: 'TBT -82ms sur 15 pages', auto_fix: true },
      { id: 'co-007', title: 'Preload LCP hero image homepage — LCP 2.4s → 1.9s', priority: 'urgent', status: 'completed', agent_name: 'KOS Performance Agent', estimated_minutes: 4, impact: 'LCP -0.5s homepage', auto_fix: true },
      { id: 'co-008', title: 'Schema.org FAQPage sur 12 articles blog', priority: 'urgent', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 6, impact: '12 pages éligibles FAQ rich results, CTR +8%', auto_fix: true },
      { id: 'co-009', title: '3 Soft 404 corrigés — redirections 301', priority: 'urgent', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 4, impact: '+120 visites/mois estimé', auto_fix: true },
      { id: 'co-010', title: 'Contraste corrigé sur 8 éléments — Ratio 3.8:1 → 5.2:1', priority: 'urgent', status: 'completed', agent_name: 'KOS Accessibility Agent', estimated_minutes: 5, impact: 'Accessibilité +6 points', auto_fix: true },
      { id: 'co-011', title: 'Trusted Types activé en mode report-only', priority: 'planned', status: 'completed', agent_name: 'KOS Security Agent', estimated_minutes: 4, impact: 'Sécurité Content Security Policy renforcée', auto_fix: true },
      { id: 'co-012', title: 'Méta-descriptions manquantes sur 5 pages piliers', priority: 'planned', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 5, impact: 'CTR SERP +3% estimé', auto_fix: true },
      { id: 'co-013', title: 'Hn hierarchy fix sur 3 pages — H2 manquants', priority: 'planned', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 4, impact: 'Structure sémantique corrigée', auto_fix: true },
      { id: 'co-014', title: 'Alt texts manquants sur 22 images', priority: 'planned', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 4, impact: 'Accessibilité + SEO images', auto_fix: true },
    ],
  },

  // ============================================================
  // BLOC 3 : SEO / GEO / AEO Command
  // ============================================================
  {
    id: 'block-seo',
    name: 'SEO / GEO / AEO',
    icon: 'ri-search-line',
    color: '#0D7B5F',
    route: '/kos-performance-seo-command',
    description: 'Optimisation visibilité Google + moteurs IA. SEO technique, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization). 6 plateformes IA ciblées.',
    domain: 'seo',
    stats: {
      total_tasks: 38,
      critical: 3,
      urgent: 8,
      planned: 27,
      completed: 38,
      in_progress: 0,
      estimated_minutes: 72,
      agents_count: 6,
      success_rate: 100,
    },
    tasks: [
      { id: 'se-001', title: 'Core Web Vitals — LCP > 4s sur mobile /resources', priority: 'critical', status: 'completed', agent_name: 'SEO Performance Agent', estimated_minutes: 14, impact: 'LCP mobile -1.8s', auto_fix: true },
      { id: 'se-002', title: 'GSC — 18 pages indexées mais non crawlées depuis 30j', priority: 'critical', status: 'completed', agent_name: 'KOS GSC Agent', estimated_minutes: 8, impact: 'Recrawl 18 pages prioritaires', auto_fix: true },
      { id: 'se-003', title: 'GEO — 0 mention dans ChatGPT/Perplexity pour "conformité BCEAO"', priority: 'critical', status: 'completed', agent_name: 'KOS AEO Agent', estimated_minutes: 12, impact: 'Visibilité IA ×6 plateformes', auto_fix: false },
      { id: 'se-004', title: 'AEO — FAQ markup manquant sur 12 pages services', priority: 'urgent', status: 'completed', agent_name: 'KOS AEO Agent', estimated_minutes: 8, impact: 'Éligibilité featured snippets', auto_fix: true },
      { id: 'se-005', title: 'Sitemap XML — 28 URLs orphelines détectées', priority: 'urgent', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 6, impact: 'Couverture indexation +28 URLs', auto_fix: true },
      { id: 'se-006', title: 'Backlinks — 12 opportunités high-DA non exploitées', priority: 'urgent', status: 'completed', agent_name: 'KOS Backlink Agent', estimated_minutes: 6, impact: 'Domain Authority +5 points', auto_fix: false },
      { id: 'se-007', title: 'Internal linking — 45 pages sans lien interne entrant', priority: 'urgent', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 5, impact: 'Crawl budget optimisé', auto_fix: true },
      { id: 'se-008', title: 'hreflang — 8 pages EN sans balise hreflang réciproque', priority: 'urgent', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 4, impact: 'SEO international corrigé', auto_fix: true },
      { id: 'se-009', title: 'Speed Index > 5s sur mobile /blog — lazy loading images', priority: 'planned', status: 'completed', agent_name: 'SEO Performance Agent', estimated_minutes: 3, impact: 'Speed Index -2s', auto_fix: true },
      { id: 'se-010', title: 'Structured data — 6 types Schema manquants (Article, FAQ, Breadcrumb)', priority: 'planned', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 4, impact: 'Rich results eligibility +6', auto_fix: true },
      { id: 'se-011', title: 'XML sitemap — lastmod non mis à jour sur 92 URLs', priority: 'planned', status: 'completed', agent_name: 'KOS SEO Agent', estimated_minutes: 2, impact: 'Fraîcheur crawl améliorée', auto_fix: true },
    ],
  },

  // ============================================================
  // BLOC 4 : Content AI Factory
  // ============================================================
  {
    id: 'block-content',
    name: 'Content AI Factory',
    icon: 'ri-quill-pen-line',
    color: '#4A7A1E',
    route: '/kos-content-factory-command',
    description: 'Production automatisée de contenu : articles blog, white papers, LinkedIn posts, newsletters. Stratégie éditoriale, SEO content, conversion. Ton Big Four.',
    domain: 'content',
    stats: {
      total_tasks: 24,
      critical: 0,
      urgent: 6,
      planned: 18,
      completed: 24,
      in_progress: 0,
      estimated_minutes: 48,
      agents_count: 24,
      success_rate: 100,
    },
    tasks: [
      { id: 'ct-001', title: '12 articles blog Q3 — planning éditorial à produire', priority: 'urgent', status: 'completed', agent_name: 'Blog Writing Agent #4', estimated_minutes: 8, impact: 'Calendrier Q3 complet', auto_fix: false },
      { id: 'ct-002', title: 'LinkedIn — 18 posts programmés non publiés (file\'attente)', priority: 'urgent', status: 'completed', agent_name: 'Social Content Agent #2', estimated_minutes: 5, impact: 'Présence LinkedIn continue', auto_fix: true },
      { id: 'ct-003', title: 'Newsletter hebdomadaire — template Q3 à finaliser', priority: 'urgent', status: 'completed', agent_name: 'Email Content Agent', estimated_minutes: 4, impact: 'Séquence nurturing activée', auto_fix: false },
      { id: 'ct-004', title: 'White paper "Conformité BCEAO 2027" — brouillon à 60%', priority: 'urgent', status: 'completed', agent_name: 'Think Tank Agent #3', estimated_minutes: 6, impact: 'Lead magnet premium', auto_fix: false },
      { id: 'ct-005', title: 'Étude de cas "Due Diligence PME Afrique" — validation client', priority: 'urgent', status: 'completed', agent_name: 'Case Study Agent', estimated_minutes: 4, impact: 'Preuve sociale renforcée', auto_fix: false },
      { id: 'ct-006', title: 'Méta-descriptions SEO — 34 articles sans meta description optimisée', priority: 'urgent', status: 'completed', agent_name: 'SEO Content Agent', estimated_minutes: 6, impact: 'CTR SERP +5% estimé', auto_fix: true },
      { id: 'ct-007', title: 'Traduction EN — 8 articles FR non traduits', priority: 'planned', status: 'completed', agent_name: 'Translation Agent', estimated_minutes: 5, impact: 'Couverture bilingue complète', auto_fix: true },
      { id: 'ct-008', title: 'Internal linking — cross-links entre 22 articles piliers', priority: 'planned', status: 'completed', agent_name: 'SEO Content Agent', estimated_minutes: 4, impact: 'Maillage interne renforcé', auto_fix: true },
      { id: 'ct-009', title: 'Rich snippets — how-to schema sur 5 articles techniques', priority: 'planned', status: 'completed', agent_name: 'SEO Content Agent', estimated_minutes: 3, impact: 'Featured snippets éligibles', auto_fix: true },
      { id: 'ct-010', title: 'Glossaire KHEPRA — 42 termes à enrichir', priority: 'planned', status: 'completed', agent_name: 'Knowledge Agent', estimated_minutes: 3, impact: 'Autorité sémantique renforcée', auto_fix: true },
    ],
  },

  // ============================================================
  // BLOC 5 : Qualité & Conformité — UPGRADE MAX (18 → 24 tâches)
  // ============================================================
  {
    id: 'block-quality',
    name: 'Compliance & Quality MAX',
    icon: 'ri-shield-check-line',
    color: '#6366F1',
    route: '/kos-compliance-quality-max',
    description: 'Système unifié Conformité & Qualité MAX : 48 automates (24 réglementaires + 24 qualité). BCEAO, COBAC, OHADA, GAFI, ISO 9001, TQM, audits, certifications, contrôles Big Four, quality gates automatiques. Score GCI 91/100.',
    domain: 'quality',
    stats: {
      total_tasks: 24,
      critical: 4,
      urgent: 10,
      planned: 10,
      completed: 24,
      in_progress: 0,
      estimated_minutes: 62,
      agents_count: 48,
      success_rate: 100,
    },
    tasks: [
      { id: 'cq-001', title: 'Mise à jour corpus réglementaire — nouvelle circulaire BCEAO 06/2026 + COBAC 04/2026', priority: 'critical', status: 'completed', agent_name: 'BCEAO Regulatory Monitor', estimated_minutes: 12, impact: 'Conformité BCEAO/COBAC à jour, +2% GCI', auto_fix: false },
      { id: 'cq-002', title: '4 automates Partiels réglementaires à upgrader → Déployés (Reform Readiness, ESG Reporter, Incident Manager, Early Dispute)', priority: 'critical', status: 'completed', agent_name: 'Multi-Jurisdiction Watch', estimated_minutes: 14, impact: '+4 déploiements, succès +4.2%', auto_fix: true },
      { id: 'cq-003', title: '8 automates Partiels qualité à upgrader → Déployés (Seshat, Nephthys, Osiris, Hathor, Set, Selket, Rê, Tefnout)', priority: 'critical', status: 'completed', agent_name: 'Maat — Architecte Processus', estimated_minutes: 16, impact: '+8 déploiements, score qualité +5.8 pts', auto_fix: true },
      { id: 'cq-004', title: 'GAFI — mise à jour liste noire/grises + Recommendation 24 Juin 2026', priority: 'critical', status: 'completed', agent_name: 'LCB-FT/AML Report Automator', estimated_minutes: 6, impact: 'Conformité LCB/FT actualisée, GCI +3', auto_fix: true },
      { id: 'cq-005', title: 'Audit qualité — 6 articles avec score < 7.5/10 à corriger', priority: 'urgent', status: 'completed', agent_name: 'Sekhmet — Inspectrice Qualité', estimated_minutes: 8, impact: 'Score qualité global +0.8 pts', auto_fix: true },
      { id: 'cq-006', title: 'Validation COBAC — 3 procédures à certifier + documentation conforme', priority: 'urgent', status: 'completed', agent_name: 'Continuous Compliance Auditor', estimated_minutes: 7, impact: 'Certification COBAC validée', auto_fix: false },
      { id: 'cq-007', title: 'ISO 9001:2026 — documentation processus et preuves à mettre à jour', priority: 'urgent', status: 'completed', agent_name: 'Apis — Préparateur Certification ISO', estimated_minutes: 6, impact: 'Certification ISO 9001 maintenue', auto_fix: false },
      { id: 'cq-008', title: 'OHADA — 3 Actes Uniformes révisés à intégrer dans la base', priority: 'urgent', status: 'completed', agent_name: 'OHADA Uniform Act Tracker', estimated_minutes: 5, impact: 'Base OHADA actualisée 17 États', auto_fix: true },
      { id: 'cq-009', title: 'Quality gates — 4 portes qualité à reconfigurer (Big Four standards)', priority: 'urgent', status: 'completed', agent_name: 'Bastet — Auditrice Qualité Totale', estimated_minutes: 5, impact: 'Validation automatique renforcée', auto_fix: true },
      { id: 'cq-010', title: 'SURFI/ERM reports — calibration des ratios prudentiels Q2 2026', priority: 'urgent', status: 'completed', agent_name: 'SURFI/ERM Report Generator', estimated_minutes: 6, impact: 'Reporting BCEAO conforme', auto_fix: true },
      { id: 'cq-011', title: 'Formation conformité — 8 modules LCB/FT à mettre à jour', priority: 'urgent', status: 'completed', agent_name: 'Compliance Training Factory', estimated_minutes: 5, impact: 'Formation réglementaire à jour', auto_fix: true },
      { id: 'cq-012', title: 'Contrôle livrables — vérification croisée 12 documents clients', priority: 'urgent', status: 'completed', agent_name: 'Neith — Vérificatrice Livrables', estimated_minutes: 4, impact: 'Zéro défaut livrable', auto_fix: true },
      { id: 'cq-013', title: 'CAPA backlog — 48 actions correctives en attente à traiter', priority: 'urgent', status: 'completed', agent_name: 'Selket — Gestionnaire CAPA', estimated_minutes: 5, impact: 'Backlog CAPA réduit', auto_fix: true },
      { id: 'cq-014', title: 'Jurisprudence CCJA — 14 nouvelles décisions à analyser', priority: 'urgent', status: 'completed', agent_name: 'Regulatory Case Law Analyzer', estimated_minutes: 4, impact: 'Veille jurisprudentielle à jour', auto_fix: true },
      { id: 'cq-015', title: 'Scorecard qualité — mise à jour Balanced Scorecard Q2 2026', priority: 'planned', status: 'completed', agent_name: 'Rê — Scorecard Qualité', estimated_minutes: 3, impact: 'Tableau de bord exécutif actualisé', auto_fix: true },
      { id: 'cq-016', title: 'Certification ISO 37001 — gap analysis anti-corruption', priority: 'planned', status: 'completed', agent_name: 'Apis — Préparateur Certification', estimated_minutes: 4, impact: 'Préparation certification ISO 37001', auto_fix: false },
      { id: 'cq-017', title: 'Audit interne trimestriel — planification Q3 2026', priority: 'planned', status: 'completed', agent_name: 'Thot — Auditeur Qualité ISO 9001', estimated_minutes: 3, impact: 'Calendrier audit Q3 planifié', auto_fix: true },
      { id: 'cq-018', title: 'Rapport qualité mensuel — Juin 2026 + tendances YTD', priority: 'planned', status: 'completed', agent_name: 'Hâpi — Analyste KPIs Qualité', estimated_minutes: 3, impact: 'Reporting exécutif généré', auto_fix: true },
      { id: 'cq-019', title: 'Veille multi-juridiction — scanning 14 juridictions hebdo', priority: 'planned', status: 'completed', agent_name: 'Multi-Jurisdiction Watch Engine', estimated_minutes: 2, impact: 'Veille continue activée', auto_fix: true },
      { id: 'cq-020', title: 'Contrôle cohérence — 8 missions cross-document review', priority: 'planned', status: 'completed', agent_name: 'Sobek — Contrôleur Cohérence', estimated_minutes: 2, impact: 'Cohérence documentaire garantie', auto_fix: true },
      { id: 'cq-021', title: 'Kaizen Q3 — planification 12 événements amélioration continue', priority: 'planned', status: 'completed', agent_name: 'Geb — Pilote Kaizen', estimated_minutes: 2, impact: 'Cycle Kaizen Q3 lancé', auto_fix: true },
      { id: 'cq-022', title: 'Risk cartography — mise à jour heatmap risques conformité', priority: 'planned', status: 'completed', agent_name: 'Compliance Risk Cartographer', estimated_minutes: 2, impact: 'Cartographie risques actualisée', auto_fix: true },
      { id: 'cq-023', title: 'Accréditations — veille évolution standards ISO + sectoriels', priority: 'planned', status: 'completed', agent_name: 'Imhotep — Gestionnaire Accréditation', estimated_minutes: 2, impact: 'Standards à jour', auto_fix: true },
      { id: 'cq-024', title: 'Pre-inspection BCEAO simulation — calibration grille officielle', priority: 'planned', status: 'completed', agent_name: 'Pre-Inspection Simulator BCEAO/COBAC', estimated_minutes: 2, impact: 'Préparation inspection optimale', auto_fix: true },
    ],
  },

  // ============================================================
  // BLOC 6 : Sécurité & Cyber
  // ============================================================
  {
    id: 'block-security',
    name: 'Sécurité & Cyber',
    icon: 'ri-shield-keyhole-line',
    color: '#DC2626',
    route: '/kos-security-command',
    description: 'Sécurité automatisée : OWASP Top 10 2026, pentesting, IDS/IPS, vulnérabilités, Content Security Policy, headers sécurité, SOC 24/7, MFA enforcement.',
    domain: 'security',
    stats: {
      total_tasks: 14,
      critical: 0,
      urgent: 3,
      planned: 11,
      completed: 14,
      in_progress: 0,
      estimated_minutes: 22,
      agents_count: 24,
      success_rate: 100,
    },
    tasks: [
      { id: 'sy-001', title: 'MFA non obligatoire — comptes admin non protégés', priority: 'urgent', status: 'completed', agent_name: 'KOS Security Agent #2', estimated_minutes: 5, impact: 'Protection comptes admin renforcée', auto_fix: true },
      { id: 'sy-002', title: 'OWASP Top 10 2026 — signatures à mettre à jour', priority: 'urgent', status: 'completed', agent_name: 'KOS Pentest Agent', estimated_minutes: 4, impact: 'Détection vulnérabilités actualisée', auto_fix: true },
      { id: 'sy-003', title: 'CSP headers — 3 directives manquantes (frame-ancestors, form-action)', priority: 'urgent', status: 'completed', agent_name: 'KOS Security Agent #1', estimated_minutes: 3, impact: 'Score sécurité A→A+', auto_fix: true },
      { id: 'sy-004', title: 'Certificats SSL — 2 wildcards à renouveler (expiration 07/2026)', priority: 'planned', status: 'completed', agent_name: 'KOS Ops Agent', estimated_minutes: 3, impact: 'HTTPS sans interruption', auto_fix: true },
      { id: 'sy-005', title: 'Rate limiting — API endpoints non protégés (5 endpoints)', priority: 'planned', status: 'completed', agent_name: 'KOS Security Agent #3', estimated_minutes: 3, impact: 'Protection DDoS renforcée', auto_fix: true },
      { id: 'sy-006', title: 'Logs sécurité — rétention à 90 jours (actuellement 30)', priority: 'planned', status: 'completed', agent_name: 'KOS SOC Agent', estimated_minutes: 2, impact: 'Conformité audit trail', auto_fix: true },
      { id: 'sy-007', title: 'Pentest trimestriel — Q2 2026 à lancer', priority: 'planned', status: 'completed', agent_name: 'KOS Pentest Agent', estimated_minutes: 2, impact: 'Rapport pentest trimestriel', auto_fix: true },
    ],
  },

  // ============================================================
  // BLOC 7 : Web Operations
  // ============================================================
  {
    id: 'block-ops',
    name: 'Web Operations',
    icon: 'ri-global-line',
    color: '#14B8A6',
    route: '/kos-web-operations-deployment',
    description: 'Ops automatisées : CDN multi-région, caching stratégique, monitoring 24/7, DNS failover, certificats SSL, performance optimization, déploiement continu.',
    domain: 'ops',
    stats: {
      total_tasks: 10,
      critical: 0,
      urgent: 2,
      planned: 8,
      completed: 10,
      in_progress: 0,
      estimated_minutes: 16,
      agents_count: 12,
      success_rate: 100,
    },
    tasks: [
      { id: 'op-001', title: 'Cache invalidation — 3 routes critiques non cachées', priority: 'urgent', status: 'completed', agent_name: 'KOS CDN Agent', estimated_minutes: 3, impact: 'Temps réponse -40% sur routes critiques', auto_fix: true },
      { id: 'op-002', title: 'Monitoring — alerting non configuré sur 2 endpoints API', priority: 'urgent', status: 'completed', agent_name: 'KOS Monitor Agent', estimated_minutes: 2, impact: 'Détection panne en < 30s', auto_fix: true },
      { id: 'op-003', title: 'Build cache — node_modules cache à optimiser', priority: 'planned', status: 'completed', agent_name: 'KOS CI/CD Agent', estimated_minutes: 2, impact: 'Build time -35%', auto_fix: true },
      { id: 'op-004', title: 'Edge Functions — cold start optimization sur 4 fonctions', priority: 'planned', status: 'completed', agent_name: 'KOS Edge Agent', estimated_minutes: 3, impact: 'Cold start -60%', auto_fix: true },
      { id: 'op-005', title: 'Database — vacuum analyze sur 12 tables', priority: 'planned', status: 'completed', agent_name: 'KOS DB Agent', estimated_minutes: 2, impact: 'Performance requêtes +20%', auto_fix: true },
      { id: 'op-006', title: 'Logs rotation — politique de rétention à configurer', priority: 'planned', status: 'completed', agent_name: 'KOS Ops Agent', estimated_minutes: 2, impact: 'Optimisation stockage logs', auto_fix: true },
      { id: 'op-007', title: 'Healthcheck endpoints — 2 services sans healthcheck', priority: 'planned', status: 'completed', agent_name: 'KOS Monitor Agent', estimated_minutes: 2, impact: 'Monitoring couverture 100%', auto_fix: true },
    ],
  },
];

export function computeGlobalStats(blocks: globalBlock[]): globalLaunchStats {
  return {
    total_blocks: blocks.length,
    total_tasks: blocks.reduce((s, b) => s + b.stats.total_tasks, 0),
    total_critical: blocks.reduce((s, b) => s + b.stats.critical, 0),
    total_urgent: blocks.reduce((s, b) => s + b.stats.urgent, 0),
    total_planned: blocks.reduce((s, b) => s + b.stats.planned, 0),
    total_completed: blocks.reduce((s, b) => s + b.stats.completed, 0),
    total_in_progress: blocks.reduce((s, b) => s + b.stats.in_progress, 0),
    total_estimated_minutes: blocks.reduce((s, b) => s + b.stats.estimated_minutes, 0),
    total_agents: blocks.reduce((s, b) => s + b.stats.agents_count, 0),
    avg_success_rate: Math.round(blocks.reduce((s, b) => s + b.stats.success_rate, 0) / blocks.length),
    blocks_ready: blocks.filter(b => b.stats.total_tasks > 0).length,
    blocks_active: blocks.filter(b => b.stats.in_progress > 0).length,
  };
}

export interface globalLaunchLog {
  id: string;
  timestamp: string;
  block_name: string;
  task_title: string;
  agent_name: string;
  status: 'completed' | 'in_progress' | 'failed' | 'queued';
  detail: string;
  duration_ms: number;
}

export const KOS_GLOBAL_LAUNCH_LOGS: globalLaunchLog[] = [
  { id: 'gl-1', timestamp: '2026-06-22T06:00:00Z', block_name: 'Déploiement Agents', task_title: 'LANCEMENT GLOBAL — 14 tâches critiques exécutées', agent_name: 'KOS Master Orchestrator', status: 'completed', detail: 'Bloc 1/7 — 14 tâches critiques, 23 urgentes, 63 planifiées — TOUTES COMPLÉTÉES. 333 agents déployés.', duration_ms: 4200 },
  { id: 'gl-2', timestamp: '2026-06-22T06:00:05Z', block_name: 'Correction Engine', task_title: 'LANCEMENT GLOBAL — 14 tâches exécutées', agent_name: 'KOS Master Orchestrator', status: 'completed', detail: 'Bloc 2/7 — 2 critiques, 12 urgentes, 35 planifiées — TOUTES COMPLÉTÉES. LCP corrigé, images optimisées, SEO fixé.', duration_ms: 3800 },
  { id: 'gl-3', timestamp: '2026-06-22T06:00:10Z', block_name: 'SEO / GEO / AEO', task_title: 'LANCEMENT GLOBAL — 11 tâches exécutées', agent_name: 'KOS Master Orchestrator', status: 'completed', detail: 'Bloc 3/7 — 3 critiques, 8 urgentes, 27 planifiées — TOUTES COMPLÉTÉES. GEO activé, AEO déployé, featured snippets en ligne.', duration_ms: 3500 },
  { id: 'gl-4', timestamp: '2026-06-22T06:00:15Z', block_name: 'Content AI Factory', task_title: 'LANCEMENT GLOBAL — 10 tâches exécutées', agent_name: 'KOS Master Orchestrator', status: 'completed', detail: 'Bloc 4/7 — 6 urgentes, 18 planifiées — TOUTES COMPLÉTÉES. Calendrier Q3, white papers, newsletters activés.', duration_ms: 2800 },
  { id: 'gl-5', timestamp: '2026-06-22T06:00:20Z', block_name: 'Compliance & Quality MAX', task_title: 'LANCEMENT GLOBAL — 24 tâches exécutées', agent_name: 'KOS Master Orchestrator', status: 'completed', detail: 'Bloc 5/7 — 4 critiques, 10 urgentes, 10 planifiées — TOUTES COMPLÉTÉES. BCEAO/COBAC à jour, ISO certifié, CAPA traité.', duration_ms: 6200 },
  { id: 'gl-6', timestamp: '2026-06-22T06:00:25Z', block_name: 'Sécurité & Cyber', task_title: 'LANCEMENT GLOBAL — 7 tâches exécutées', agent_name: 'KOS Master Orchestrator', status: 'completed', detail: 'Bloc 6/7 — 3 urgentes, 11 planifiées — TOUTES COMPLÉTÉES. MFA activé, OWASP à jour, CSP A+.', duration_ms: 2200 },
  { id: 'gl-7', timestamp: '2026-06-22T06:00:30Z', block_name: 'Web Operations', task_title: 'LANCEMENT GLOBAL — 7 tâches exécutées', agent_name: 'KOS Master Orchestrator', status: 'completed', detail: 'Bloc 7/7 — 2 urgentes, 8 planifiées — TOUTES COMPLÉTÉES. CDN optimisé, monitoring 100%, cache optimisé.', duration_ms: 1600 },
  { id: 'gl-8', timestamp: '2026-06-22T06:00:35Z', block_name: 'TOUS LES BLOCS', task_title: 'LANCEMENT GLOBAL TERMINÉ — 269/269 TÂCHES EXÉCUTÉES', agent_name: 'KOS Master Orchestrator', status: 'completed', detail: '🎯 SYSTÈME KOS 100% OPÉRATIONNEL — 7 blocs, 269 tâches, 0 en attente. Score global 10.0/10. Tous les agents déployés. Tous les dashboards synchronisés. KOS EN PRODUCTION TOTALE — 22 JUIN 2026.', duration_ms: 35000 },
];



