// KOS Regulatory Health Dashboard — Mock Data
// Dernière mise à jour : 27 Juin 2026

export interface RegulatoryHealthKPI {
  label: string;
  value: string | number;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendLabel: string;
  colorClass: string;
}

export interface TextSousReserve {
  id: string;
  autorite: string;
  reference: string;
  titre: string;
  date: string;
  statut: string;
  derniereVerification: string;
  fiabilite: number;
}

export interface ValidatorRun {
  date: string;
  action: string;
  agent: string;
  resultat: string;
  score: number;
}

export interface QAArticleTest {
  article: string;
  slug: string;
  juridiction: string;
  score: number;
  citations: number;
  actions_correctives: number;
  date_test: string;
}

export const regulatoryHealthKPIs: RegulatoryHealthKPI[] = [
  {
    label: 'Indice Global KOS',
    value: '82/100',
    icon: 'ri-shield-check-line',
    trend: 'up',
    trendLabel: '+30 pts depuis 25 Juin',
    colorClass: 'bg-secondary-100 text-secondary-700',
  },
  {
    label: 'Textes sous réserve',
    value: 10,
    icon: 'ri-timer-line',
    trend: 'stable',
    trendLabel: 'BEAC 5 · COBAC 4 · BCEAO 1',
    colorClass: 'bg-amber-100 text-amber-700',
  },
  {
    label: 'Fiabilité moyenne BD',
    value: '89/100',
    icon: 'ri-bar-chart-line',
    trend: 'up',
    trendLabel: '136 textes · Min 80',
    colorClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Dernier scan complet',
    value: 'Il y a 2h',
    icon: 'ri-radar-line',
    trend: 'stable',
    trendLabel: 'Scout v3 · 136 textes',
    colorClass: 'bg-primary-100 text-primary-700',
  },
  {
    label: 'Textes Excellent (≥95)',
    value: 14,
    icon: 'ri-star-line',
    trend: 'up',
    trendLabel: '+5 depuis 25 Juin',
    colorClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'QA Engine — Dernier test',
    value: '92/100',
    icon: 'ri-sparkling-line',
    trend: 'up',
    trendLabel: 'Pipeline Zero-Defect OK',
    colorClass: 'bg-primary-100 text-primary-700',
  },
];

export const textesSousReserve: TextSousReserve[] = [
  {
    id: 'BEAC-DIR-04',
    autorite: 'BEAC',
    reference: 'DIR-04/2025',
    titre: 'Directive relative aux normes de gestion des risques opérationnels',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 65,
  },
  {
    id: 'BEAC-DIR-08',
    autorite: 'BEAC',
    reference: 'DIR-08/2025',
    titre: 'Directive relative à la transparence financière',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 60,
  },
  {
    id: 'BEAC-CIR-13',
    autorite: 'BEAC',
    reference: 'CIR-13/2025',
    titre: 'Circulaire relative à la gestion actif-passif (ALM)',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 62,
  },
  {
    id: 'BEAC-REG-15',
    autorite: 'BEAC',
    reference: 'REG-15/2025',
    titre: 'Règlement sur la classification des créances',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 58,
  },
  {
    id: 'BEAC-INS-02',
    autorite: 'BEAC',
    reference: 'INS-02/2025',
    titre: 'Instruction sur le reporting prudentiel renforcé',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 63,
  },
  {
    id: 'COBAC-INS-03',
    autorite: 'COBAC',
    reference: 'INS-03/2025',
    titre: 'Instruction relative au contrôle interne renforcé',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 61,
  },
  {
    id: 'COBAC-INS-05',
    autorite: 'COBAC',
    reference: 'INS-05/2025',
    titre: 'Instruction sur la gouvernance des risques IT',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 59,
  },
  {
    id: 'COBAC-DI-2025',
    autorite: 'COBAC',
    reference: 'DI/2025-03',
    titre: 'Décision relative aux obligations de reporting ESG',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 55,
  },
  {
    id: 'COBAC-CIR-15',
    autorite: 'COBAC',
    reference: 'CIR-15/2025',
    titre: 'Circulaire relative à la gestion des risques de marché',
    date: '2025',
    statut: '⚠️ Non publié officiellement — sous réserve',
    derniereVerification: '2026-06-27',
    fiabilite: 57,
  },
  {
    id: 'BCEAO-003-2025',
    autorite: 'BCEAO',
    reference: '003-03-2025',
    titre: 'Instruction relative au refinancement des SFD',
    date: '2025',
    statut: '⚠️ NON VÉRIFIÉ — aucune publication officielle trouvée sur bceao.int au 27/06/2026',
    derniereVerification: '2026-06-27',
    fiabilite: 50,
  },
];

export const validatorRuns: ValidatorRun[] = [
  {
    date: '2026-06-27T16:30:00Z',
    action: 'QA_ENGINE_BLOG_TEST_3_ARTICLES',
    agent: 'KOS Regulatory Quality Assurance Engine™',
    resultat: 'Test étendu à 3 articles : COBAC (conformite-cobac-cemac), GAFI (lbcft-gafi-2026), OHADA (bceao-ohada-conformite). Toutes les juridictions couvertes. Résultats en attente.',
    score: 90,
  },
  {
    date: '2026-06-27T16:00:00Z',
    action: 'QA_ENGINE_BLOG_TEST',
    agent: 'KOS Regulatory Quality Assurance Engine™',
    resultat: 'Test sur article "Finance Islamique SFD — BCEAO 005-05-2018". 5 citations vérifiées. Score 92/100.',
    score: 92,
  },
  {
    date: '2026-06-27T15:45:00Z',
    action: 'BEAC_COBAC_VALIDATOR_V2_TRIGGERED',
    agent: 'KOS BEAC/COBAC Official Feed Validator v2™',
    resultat: 'Validation complète déclenchée manuellement. 10 textes sous réserve en cours d\'analyse sur beac.int, sgcobac.org, bceao.int. Scraping HTML avec parsing de contenu.',
    score: 85,
  },
  {
    date: '2026-06-27T15:00:00Z',
    action: 'RELIABILITY_ENRICHMENT',
    agent: 'KOS Manual Verification',
    resultat: '5 textes vérifiés et enrichis. 0 texte sous 80/100. Moyenne 89/100.',
    score: 89,
  },
  {
    date: '2026-06-27T14:00:00Z',
    action: 'SCOUT_V3_FULL_SCAN',
    agent: 'KOS Regulatory Scout v3™',
    resultat: 'Scan 136 textes + 128 obligations. 0 référence fictive. Cron trimestriel programmé.',
    score: 84,
  },
  {
    date: '2026-06-27T13:30:00Z',
    action: 'REGULATORY_BLOC_CORRECTION',
    agent: 'KOS Regulatory Citation Validator™',
    resultat: '45 fichiers modifiés. 4 textes seedés. R-2024/03, R-2026/01, 001-2025 BCEAO éradiqués.',
    score: 76,
  },
  {
    date: '2026-06-25T17:30:00Z',
    action: 'VERIFICATION_P0_COMPLETE',
    agent: 'KOS Regulatory Scout™',
    resultat: '8 écarts CRITIQUES vérifiés sur sites officiels. 4 références inexistantes identifiées.',
    score: 52,
  },
];

export const qaArticleTests: QAArticleTest[] = [
  {
    article: 'Finance Islamique SFD — BCEAO 005-05-2018',
    slug: 'finance-islamique-sfd-instruction-bceao-005-05-2018',
    juridiction: 'BCEAO',
    score: 92,
    citations: 5,
    actions_correctives: 2,
    date_test: '2026-06-27',
  },
  {
    article: 'Conformité COBAC / CEMAC',
    slug: 'conformite-cobac-cemac',
    juridiction: 'COBAC',
    score: 0,
    citations: 4,
    actions_correctives: 0,
    date_test: '2026-06-27',
  },
  {
    article: 'LBC/FT — Nouvelles Exigences GAFI 2026',
    slug: 'lbcft-nouvelles-exigences-gafi-2026',
    juridiction: 'GAFI',
    score: 0,
    citations: 4,
    actions_correctives: 0,
    date_test: '2026-06-27',
  },
  {
    article: 'Conformité BCEAO / OHADA',
    slug: 'bceao-ohada-conformite',
    juridiction: 'OHADA',
    score: 0,
    citations: 6,
    actions_correctives: 0,
    date_test: '2026-06-27',
  },
];

export const reliabilityDistribution = {
  excellent: { count: 14, min: 95, max: 100, color: 'bg-emerald-500' },
  bon: { count: 122, min: 80, max: 94, color: 'bg-emerald-400' },
  moyen: { count: 0, min: 70, max: 79, color: 'bg-amber-400' },
  faible: { count: 0, min: 0, max: 69, color: 'bg-red-400' },
  total: 136,
  moyenne: 89,
  minimum: 80,
};

export const cronJobs = [
  { id: 25, nom: 'regulatory-intelligence-scan', frequence: 'Quotidien 06h00 UTC', prochaine: '2026-06-28T06:00:00Z', statut: 'Actif' },
  { id: 32, nom: 'kos-regulatory-quarterly-audit', frequence: '1er jour / 3 mois 03h00 UTC', prochaine: '2026-10-01T03:00:00Z', statut: 'Actif' },
  { id: 33, nom: 'kos-beac-cobac-weekly-validation', frequence: 'Lundi 05h00 UTC', prochaine: '2026-06-29T05:00:00Z', statut: 'Actif' },
];

export const edgeFunctions = [
  { nom: 'kos-regulatory-scout', version: 'v3', description: 'Scan complet 136 textes + cross-reference', statut: 'Déployé' },
  { nom: 'kos-beac-cobac-feed-validator', version: 'v2', description: 'HTML Scraping — Validation 10 textes sous réserve', statut: 'Déployé' },
  { nom: 'kos-regulatory-quality-assurance', version: 'v1', description: 'QA 10 principes — Pipeline Zero-Defect', statut: 'Déployé' },
  { nom: 'kos-content-publication-gate', version: 'v1', description: 'Blocage publication si référence non vérifiée', statut: 'Déployé' },
];





