// KOS Bloc 04 — SEO Big Four™
// Master Plan Big Four 2026-2028 — Phase 2 Acquisition

export interface SEOCluster {
  id: string;
  nom: string;
  mots_cles_top_10: number;
  mots_cles_top_3: number;
  trafic_mensuel: number;
  pages_indexees: number;
  score_seo: number;
  tendance: number;
  icon: string;
}

export interface SEOAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  kw_positionnes: number;
  score_optimisation: number;
  icon: string;
  clusters_geres: string[];
}

export interface SEOData {
  clusters: SEOCluster[];
  agents: SEOAgent[];
  globalMetrics: {
    total_mots_cles_top10: number;
    total_mots_cles_top3: number;
    domain_rating: number;
    trafic_organique_mensuel: number;
    pages_indexees: number;
    backlinks_actifs: number;
    score_seo_global: number;
    core_web_vitals_score: number;
    clusters_actifs: number;
    articles_publies_mois: number;
    certification: string;
  };
}

export const SEO_CLUSTERS: SEOCluster[] = [
  { id: 'cluster-001', nom: 'BCEAO — Régulation Bancaire', mots_cles_top_10: 245, mots_cles_top_3: 78, trafic_mensuel: 32500, pages_indexees: 132, score_seo: 97, tendance: 18, icon: 'ri-bank-line' },
  { id: 'cluster-002', nom: 'UEMOA — Intégration Économique', mots_cles_top_10: 198, mots_cles_top_3: 65, trafic_mensuel: 24800, pages_indexees: 115, score_seo: 95, tendance: 14, icon: 'ri-global-line' },
  { id: 'cluster-003', nom: 'OHADA — Droit des Affaires', mots_cles_top_10: 178, mots_cles_top_3: 58, trafic_mensuel: 21200, pages_indexees: 105, score_seo: 94, tendance: 22, icon: 'ri-scales-3-line' },
  { id: 'cluster-004', nom: 'Microfinance — SFD UEMOA', mots_cles_top_10: 158, mots_cles_top_3: 52, trafic_mensuel: 18200, pages_indexees: 92, score_seo: 93, tendance: 16, icon: 'ri-money-dollar-circle-line' },
  { id: 'cluster-005', nom: 'Banque & Finance', mots_cles_top_10: 172, mots_cles_top_3: 56, trafic_mensuel: 21500, pages_indexees: 98, score_seo: 93, tendance: 12, icon: 'ri-funds-line' },
  { id: 'cluster-006', nom: 'ESG & Durabilité', mots_cles_top_10: 148, mots_cles_top_3: 48, trafic_mensuel: 16800, pages_indexees: 82, score_seo: 92, tendance: 32, icon: 'ri-leaf-line' },
  { id: 'cluster-007', nom: 'Fiscalité Internationale', mots_cles_top_10: 125, mots_cles_top_3: 40, trafic_mensuel: 13200, pages_indexees: 72, score_seo: 90, tendance: 15, icon: 'ri-file-text-line' },
  { id: 'cluster-008', nom: 'Gouvernance d\'Entreprise', mots_cles_top_10: 138, mots_cles_top_3: 45, trafic_mensuel: 15400, pages_indexees: 85, score_seo: 92, tendance: 17, icon: 'ri-building-4-line' },
  { id: 'cluster-009', nom: 'Contrôle Interne Bancaire', mots_cles_top_10: 102, mots_cles_top_3: 32, trafic_mensuel: 10200, pages_indexees: 62, score_seo: 89, tendance: 12, icon: 'ri-shield-check-line' },
  { id: 'cluster-010', nom: 'LCB-FT & Conformité', mots_cles_top_10: 98, mots_cles_top_3: 30, trafic_mensuel: 9500, pages_indexees: 55, score_seo: 88, tendance: 24, icon: 'ri-fingerprint-line' },
  { id: 'cluster-011', nom: 'Sénégal — Hub Financier UEMOA', mots_cles_top_10: 85, mots_cles_top_3: 28, trafic_mensuel: 11200, pages_indexees: 58, score_seo: 91, tendance: 28, icon: 'ri-map-pin-line' },
  { id: 'cluster-012', nom: 'Côte d\'Ivoire — Place Économique', mots_cles_top_10: 92, mots_cles_top_3: 30, trafic_mensuel: 12800, pages_indexees: 65, score_seo: 90, tendance: 25, icon: 'ri-map-pin-line' },
];

export const SEO_AGENTS: SEOAgent[] = [
  {
    id: 'agent-seo-01',
    nom: 'SEO Autopilot 2.0™',
    mission: 'Pilotage automatique SEO : crawl technique, optimisation on-page, suivi positions, Core Web Vitals, internal linking automatisé. Boucle continue scan → fix → verify.',
    statut: 'Actif',
    kw_positionnes: 620,
    score_optimisation: 92,
    icon: 'ri-search-line',
    clusters_geres: ['BCEAO', 'UEMOA', 'OHADA', 'Banque', 'Microfinance'],
  },
  {
    id: 'agent-seo-02',
    nom: 'SEO Content Strategy™',
    mission: 'Stratégie de contenu SEO : planification éditoriale, recherche mots-clés, optimisation sémantique, silo thématique, content gap analysis.',
    statut: 'Actif',
    kw_positionnes: 420,
    score_optimisation: 91,
    icon: 'ri-pencil-ruler-line',
    clusters_geres: ['ESG', 'Fiscalité', 'Gouvernance', 'LCB-FT'],
  },
  {
    id: 'agent-seo-03',
    nom: 'SEO Technical Auditor™',
    mission: 'Audit technique SEO : crawl budget, indexation, structure Hn, maillage interne, vitesse, Core Web Vitals, Schema.org, mobile-first.',
    statut: 'Actif',
    kw_positionnes: 310,
    score_optimisation: 88,
    icon: 'ri-tools-line',
    clusters_geres: ['Contrôle Interne', 'Gouvernance', 'LCB-FT', 'Fiscalité'],
  },
];

export const SEO_GLOBAL_METRICS = {
  total_mots_cles_top10: 1800,
  total_mots_cles_top3: 612,
  domain_rating: 85,
  trafic_organique_mensuel: 280000,
  pages_indexees: 920,
  backlinks_actifs: 2850,
  score_seo_global: 97,
  core_web_vitals_score: 100,
  clusters_actifs: 14,
  articles_publies_mois: 92,
  certification: 'AAAA — Big Four Supreme 100% — SEO Big Four Enterprise — LEADER SEO AFRIQUE FRANCOPHONE — DR 85',
};