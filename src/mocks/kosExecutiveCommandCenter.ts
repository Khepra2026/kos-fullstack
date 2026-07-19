// KOS Executive Command Center™ — Mock Data Big Four
// Dashboard Temps Réel · 10 Dimensions · 3 Statuts (🟢 🟠 🔴)

export interface CommandDimension {
  id: string;
  name: string;
  icon: string;
  status: 'conforme' | 'surveillance' | 'action';
  statusLabel: string;
  score: number;
  scoreUnit: string;
  target: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  lastUpdate: string;
  description: string;
  metrics: CommandMetric[];
  alerts: CommandAlert[];
}

export interface CommandMetric {
  key: string;
  label: string;
  value: number | string;
  format: 'number' | 'percentage' | 'currency' | 'text';
  status: 'conforme' | 'surveillance' | 'action';
}

export interface CommandAlert {
  id: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  dim: string;
  action: string;
}

// ============================================================
// SEO — Search Engine Optimization
// ============================================================
const dimensionSEO: CommandDimension = {
  id: 'seo',
  name: 'SEO',
  icon: 'ri-search-eye-line',
  status: 'conforme',
  statusLabel: 'Conforme',
  score: 94,
  scoreUnit: '/100',
  target: 97,
  trend: 'up',
  trendValue: '+4 pts',
  lastUpdate: '2026-06-19T06:00:00Z',
  description: 'Référencement naturel et visibilité organique — 312 pages indexées, 89 mots-clés Top 10',
  metrics: [
    { key: 'pages_indexed', label: 'Pages Indexées', value: 312, format: 'number', status: 'conforme' },
    { key: 'top10_keywords', label: 'Mots-clés Top 10', value: 89, format: 'number', status: 'conforme' },
    { key: 'organic_traffic', label: 'Trafic Organique/mois', value: '28 500', format: 'text', status: 'conforme' },
    { key: 'avg_position', label: 'Position Moyenne', value: 5.1, format: 'number', status: 'conforme' },
    { key: 'domain_authority', label: 'Domain Authority', value: 58, format: 'number', status: 'surveillance' },
    { key: 'ctr_organic', label: 'CTR Organique', value: 4.2, format: 'percentage', status: 'surveillance' },
  ],
  alerts: [
    { id: 'seo-a1', message: 'DA 58 — en progression mais cible 65 non atteinte', severity: 'medium', timestamp: '2026-06-19T06:00:00Z', dim: 'SEO', action: 'Poursuivre campagne backlinks institutionnels' },
    { id: 'seo-a2', message: '3 pages orphelines détectées — correction automatique en cours', severity: 'low', timestamp: '2026-06-18T22:00:00Z', dim: 'SEO', action: 'KOS Auto-Correction Engine activé' },
  ],
};

// ============================================================
// GEO — Generative Engine Optimization
// ============================================================
const dimensionGEO: CommandDimension = {
  id: 'geo',
  name: 'GEO',
  icon: 'ri-radar-line',
  status: 'conforme',
  statusLabel: 'Conforme',
  score: 92,
  scoreUnit: '/100',
  target: 95,
  trend: 'up',
  trendValue: '+3 pts',
  lastUpdate: '2026-06-19T05:30:00Z',
  description: 'Visibilité IA générative — 52 featured snippets, présence ChatGPT/Perplexity/Gemini',
  metrics: [
    { key: 'featured_snippets', label: 'Featured Snippets', value: 52, format: 'number', status: 'conforme' },
    { key: 'chatgpt_mentions', label: 'Mentions ChatGPT', value: 18, format: 'number', status: 'conforme' },
    { key: 'perplexity_citations', label: 'Citations Perplexity', value: 24, format: 'number', status: 'conforme' },
    { key: 'gemini_sources', label: 'Sources Gemini', value: 15, format: 'number', status: 'surveillance' },
    { key: 'geo_clusters', label: 'Clusters GEO', value: 8, format: 'number', status: 'conforme' },
    { key: 'aeo_readiness', label: 'AEO Readiness', value: 88, format: 'percentage', status: 'surveillance' },
  ],
  alerts: [
    { id: 'geo-a1', message: 'Gemini citations en retard vs ChatGPT — écart de 3 mentions', severity: 'medium', timestamp: '2026-06-19T05:30:00Z', dim: 'GEO', action: 'Optimiser content pour format Gemini (structured data)' },
  ],
};

// ============================================================
// Publications — Thought Leadership
// ============================================================
const dimensionPublications: CommandDimension = {
  id: 'publications',
  name: 'Publications',
  icon: 'ri-book-open-line',
  status: 'conforme',
  statusLabel: 'Conforme',
  score: 90,
  scoreUnit: '/100',
  target: 95,
  trend: 'up',
  trendValue: '+5 pts',
  lastUpdate: '2026-06-19T04:00:00Z',
  description: 'Production éditoriale — 14 livres blancs/an, 28 études sectorielles, 487 citations académiques',
  metrics: [
    { key: 'livres_blancs_ytd', label: 'Livres Blancs YTD', value: 8, format: 'number', status: 'conforme' },
    { key: 'etudes_sectorielles_ytd', label: 'Études Sectorielles YTD', value: 16, format: 'number', status: 'conforme' },
    { key: 'citations_academiques', label: 'Citations Académiques', value: 487, format: 'number', status: 'conforme' },
    { key: 'articles_blog_mois', label: 'Articles Blog / mois', value: 42, format: 'number', status: 'conforme' },
    { key: 'telechargements_cumul', label: 'Téléchargements Cumulés', value: '28 500', format: 'text', status: 'conforme' },
    { key: 'score_qualite_moyen', label: 'Score Qualité Moyen', value: 9.2, format: 'number', status: 'conforme' },
  ],
  alerts: [
    { id: 'pub-a1', message: 'Retard Guide Prix de Transfert 2026 — deadline 30/06', severity: 'medium', timestamp: '2026-06-18T18:00:00Z', dim: 'Publications', action: 'Accélérer relecture — prévoir 2 reviewers supplémentaires' },
  ],
};

// ============================================================
// Conformité — Regulatory Compliance
// ============================================================
const dimensionConformite: CommandDimension = {
  id: 'conformite',
  name: 'Conformité',
  icon: 'ri-shield-check-line',
  status: 'conforme',
  statusLabel: 'Conforme',
  score: 96,
  scoreUnit: '/100',
  target: 98,
  trend: 'up',
  trendValue: '+2 pts',
  lastUpdate: '2026-06-19T06:15:00Z',
  description: 'Conformité réglementaire — 52 textes couverts (BCEAO, COBAC, OHADA, GAFI), 0 non-conformité critique',
  metrics: [
    { key: 'textes_couverts', label: 'Textes Réglementaires Couverts', value: 52, format: 'number', status: 'conforme' },
    { key: 'veille_active', label: 'Sources Veille Active', value: 18, format: 'number', status: 'conforme' },
    { key: 'alertes_reglementaires', label: 'Alertes Réglementaires/mois', value: 127, format: 'number', status: 'conforme' },
    { key: 'conformite_bceao', label: 'Conformité BCEAO', value: 98, format: 'percentage', status: 'conforme' },
    { key: 'conformite_cobac', label: 'Conformité COBAC', value: 94, format: 'percentage', status: 'surveillance' },
    { key: 'non_conformites', label: 'Non-Conformités Actives', value: 0, format: 'number', status: 'conforme' },
  ],
  alerts: [
    { id: 'cf-a1', message: 'Circulaire BCEAO 03-2026 LBC/FT — mise à jour en cours, 85% complété', severity: 'low', timestamp: '2026-06-19T06:15:00Z', dim: 'Conformité', action: 'Finaliser analyse article 14-22 sous 48h' },
  ],
};

// ============================================================
// Risques — Enterprise Risk Management
// ============================================================
const dimensionRisques: CommandDimension = {
  id: 'risques',
  name: 'Risques',
  icon: 'ri-alert-line',
  status: 'surveillance',
  statusLabel: 'Surveillance',
  score: 82,
  scoreUnit: '/100',
  target: 90,
  trend: 'stable',
  trendValue: '=',
  lastUpdate: '2026-06-19T05:45:00Z',
  description: 'Gestion globale des risques — 18 risques identifiés, 3 sous surveillance renforcée, 0 critique',
  metrics: [
    { key: 'risques_identifies', label: 'Risques Identifiés', value: 18, format: 'number', status: 'conforme' },
    { key: 'risques_critiques', label: 'Risques Critiques', value: 0, format: 'number', status: 'conforme' },
    { key: 'risques_surveillance', label: 'Sous Surveillance', value: 3, format: 'number', status: 'surveillance' },
    { key: 'couverture_controles', label: 'Couverture Contrôles', value: 88, format: 'percentage', status: 'surveillance' },
    { key: 'incidents_30j', label: 'Incidents (30j)', value: 1, format: 'number', status: 'conforme' },
    { key: 'plans_mitigation', label: 'Plans Mitigation Actifs', value: 5, format: 'number', status: 'conforme' },
  ],
  alerts: [
    { id: 'rk-a1', message: 'Risque concentration client — 2 clients > 15% CA chacun', severity: 'high', timestamp: '2026-06-19T05:45:00Z', dim: 'Risques', action: 'Diversifier portefeuille — cible 5 clients additionnels T3' },
    { id: 'rk-a2', message: 'Risque réglementaire CEMAC — couverture COBAC à 94% (cible 98%)', severity: 'medium', timestamp: '2026-06-18T15:00:00Z', dim: 'Risques', action: 'Recruter Senior Advisor CEMAC d\'ici T4' },
    { id: 'rk-a3', message: 'Risque cyber — audit de sécurité planifié 24/06', severity: 'low', timestamp: '2026-06-19T00:00:00Z', dim: 'Risques', action: 'KOS Security Scan programmé' },
  ],
};

// ============================================================
// IA — Intelligence Artificielle & Agents
// ============================================================
const dimensionIA: CommandDimension = {
  id: 'ia',
  name: 'IA',
  icon: 'ri-cpu-line',
  status: 'conforme',
  statusLabel: 'Conforme',
  score: 95,
  scoreUnit: '/100',
  target: 97,
  trend: 'up',
  trendValue: '+3 pts',
  lastUpdate: '2026-06-19T06:30:00Z',
  description: 'Gouvernance IA — 68 agents actifs, 12 modèles enregistrés, alignement ISO 42001 / NIST AI RMF / OCDE IA',
  metrics: [
    { key: 'agents_actifs', label: 'Agents IA Actifs', value: 68, format: 'number', status: 'conforme' },
    { key: 'modeles_enregistres', label: 'Modèles Enregistrés', value: 12, format: 'number', status: 'conforme' },
    { key: 'alignement_iso', label: 'Alignement ISO 42001', value: 8.8, format: 'number', status: 'conforme' },
    { key: 'taux_hallucination', label: 'Taux Hallucination', value: 1.2, format: 'percentage', status: 'conforme' },
    { key: 'biais_score', label: 'Score Biais Moyen', value: 3.0, format: 'number', status: 'conforme' },
    { key: 'khepra_internal', label: 'Modèles KHEPRA Internal', value: 10, format: 'number', status: 'conforme' },
  ],
  alerts: [
    { id: 'ia-a1', message: 'Digital Twin biais 6.8/10 — plan remédiation en cours', severity: 'medium', timestamp: '2026-06-19T06:30:00Z', dim: 'IA', action: 'Recalibration modèle Digital Twin — échéance 15/07' },
  ],
};

// ============================================================
// Leads — Génération & Qualification
// ============================================================
const dimensionLeads: CommandDimension = {
  id: 'leads',
  name: 'Leads',
  icon: 'ri-user-add-line',
  status: 'surveillance',
  statusLabel: 'Surveillance',
  score: 80,
  scoreUnit: '/100',
  target: 88,
  trend: 'up',
  trendValue: '+6 pts',
  lastUpdate: '2026-06-19T06:00:00Z',
  description: 'Génération et qualification — 72 leads/mois, taux conversion MQL→SQL 38%, pipeline 680M FCFA',
  metrics: [
    { key: 'leads_mensuels', label: 'Leads Mensuels', value: 72, format: 'number', status: 'surveillance' },
    { key: 'mql_to_sql', label: 'Conversion MQL→SQL', value: 38, format: 'percentage', status: 'conforme' },
    { key: 'pipeline_value', label: 'Valeur Pipeline', value: '680M FCFA', format: 'text', status: 'conforme' },
    { key: 'lead_scoring_moyen', label: 'Lead Scoring Moyen', value: 72, format: 'number', status: 'surveillance' },
    { key: 'temps_qualification', label: 'Temps Qualification', value: '4.2h', format: 'text', status: 'conforme' },
    { key: 'taux_rebond', label: 'Taux Rebond Landing Pages', value: 38, format: 'percentage', status: 'surveillance' },
  ],
  alerts: [
    { id: 'ld-a1', message: '72 leads/mois — sous objectif de 90. Renforcer SEO + LinkedIn', severity: 'high', timestamp: '2026-06-19T06:00:00Z', dim: 'Leads', action: 'Activer campagne LinkedIn Ads Q3 + programme referral' },
    { id: 'ld-a2', message: 'Taux rebond 38% — au-dessus du seuil 30%', severity: 'medium', timestamp: '2026-06-18T12:00:00Z', dim: 'Leads', action: 'Optimiser landing pages — KOS Correction Engine actif' },
  ],
};

// ============================================================
// Opportunités — Business Development
// ============================================================
const dimensionOpportunites: CommandDimension = {
  id: 'opportunites',
  name: 'Opportunités',
  icon: 'ri-lightbulb-line',
  status: 'conforme',
  statusLabel: 'Conforme',
  score: 88,
  scoreUnit: '/100',
  target: 92,
  trend: 'up',
  trendValue: '+5 pts',
  lastUpdate: '2026-06-19T05:00:00Z',
  description: 'Détection et suivi — 547 opportunités/an, 51 AO détectés, 16 projets sous surveillance, win rate 42%',
  metrics: [
    { key: 'opportunites_detectees', label: 'Opportunités Détectées/an', value: 547, format: 'number', status: 'conforme' },
    { key: 'ao_actifs', label: 'AO Actifs', value: 51, format: 'number', status: 'conforme' },
    { key: 'projets_surveillance', label: 'Projets Sous Surveillance', value: 16, format: 'number', status: 'conforme' },
    { key: 'win_rate', label: 'Win Rate', value: 42, format: 'percentage', status: 'conforme' },
    { key: 'pipeline_montant', label: 'Pipeline Montant', value: '18.2 Md FCFA', format: 'text', status: 'conforme' },
    { key: 'delai_reponse', label: 'Délai Réponse Moyen', value: '3.2j', format: 'text', status: 'surveillance' },
  ],
  alerts: [
    { id: 'op-a1', message: 'Délai réponse AO 3.2j — cible 2j pour maintenir avantage compétitif', severity: 'medium', timestamp: '2026-06-19T05:00:00Z', dim: 'Opportunités', action: 'Activer KOS Tender Auto-Response pour préparation accélérée' },
  ],
};

// ============================================================
// Revenus — Financial Performance
// ============================================================
const dimensionRevenus: CommandDimension = {
  id: 'revenus',
  name: 'Revenus',
  icon: 'ri-funds-line',
  status: 'conforme',
  statusLabel: 'Conforme',
  score: 91,
  scoreUnit: '/100',
  target: 95,
  trend: 'up',
  trendValue: '+8 pts',
  lastUpdate: '2026-06-19T06:00:00Z',
  description: 'Performance financière — CA YTD 425M FCFA, objectif 1.2B, marge brute 68%, EBITDA 42%',
  metrics: [
    { key: 'ca_ytd', label: 'CA YTD', value: '425M FCFA', format: 'text', status: 'conforme' },
    { key: 'ca_objectif', label: 'Objectif Annuel', value: '1.2B FCFA', format: 'text', status: 'conforme' },
    { key: 'marge_brute', label: 'Marge Brute', value: 68, format: 'percentage', status: 'conforme' },
    { key: 'ebitda', label: 'EBITDA', value: 42, format: 'percentage', status: 'conforme' },
    { key: 'croissance_yoy', label: 'Croissance YoY', value: 42, format: 'percentage', status: 'conforme' },
    { key: 'cash_position', label: 'Position Cash', value: '420M FCFA', format: 'text', status: 'conforme' },
  ],
  alerts: [
    { id: 'rv-a1', message: 'DSO 32 jours — acceptable mais surveiller. Objectif < 30j', severity: 'low', timestamp: '2026-06-19T06:00:00Z', dim: 'Revenus', action: 'Relancer 2 factures > 45j — montant total 18M FCFA' },
  ],
};

// ============================================================
// Alertes — Système Global d'Alertes
// ============================================================
const dimensionAlertes: CommandDimension = {
  id: 'alertes',
  name: 'Alertes',
  icon: 'ri-notification-3-line',
  status: 'action',
  statusLabel: 'Action Immédiate',
  score: 75,
  scoreUnit: '/100',
  target: 90,
  trend: 'down',
  trendValue: '-3 pts',
  lastUpdate: '2026-06-19T06:45:00Z',
  description: 'Centre d\'alertes global — 12 alertes actives dont 5 critiques nécessitant action immédiate',
  metrics: [
    { key: 'alertes_totales', label: 'Alertes Totales', value: 12, format: 'number', status: 'conforme' },
    { key: 'alertes_critiques', label: 'Alertes Critiques', value: 5, format: 'number', status: 'action' },
    { key: 'alertes_haute', label: 'Alertes Haute Priorité', value: 4, format: 'number', status: 'surveillance' },
    { key: 'alertes_resolues_24h', label: 'Résolues < 24h', value: 8, format: 'number', status: 'conforme' },
    { key: 'temps_resolution', label: 'Temps Résolution Moyen', value: '6.2h', format: 'text', status: 'conforme' },
    { key: 'escalades', label: 'Escalades Actives', value: 2, format: 'number', status: 'surveillance' },
  ],
  alerts: [
    { id: 'al-a1', message: '5 alertes critiques en attente — seuil acceptable dépassé', severity: 'critical', timestamp: '2026-06-19T06:45:00Z', dim: 'Alertes', action: 'Mobiliser task force — résolution sous 4h' },
    { id: 'al-a2', message: '2 escalades N3 (Director) actives — délai dépassé', severity: 'high', timestamp: '2026-06-19T06:00:00Z', dim: 'Alertes', action: 'Escalade N4 COMEX si non résolu sous 2h' },
  ],
};

// ============================================================
// Commander's Intent — synthèse stratégique quotidienne
// ============================================================
export interface CommanderIntent {
  date: string;
  summary: string;
  priorityActions: string[];
  decisionsRequired: string[];
  horizon: string;
  author: string;
}

export const commanderIntent: CommanderIntent = {
  date: '2026-06-19',
  summary: 'Poursuite déploiement KOS Enterprise+ Phase 3. 8/10 dimensions en statut Conforme. Focus prioritaire : Leads (surveillance) et Alertes (action immédiate). Le pipeline est à 680M FCFA — solide. Les 5 alertes critiques concernent principalement la zone CEMAC et l\'acquisition de nouveaux clients. Décision du jour : arbitrage recrutement Senior Advisor CEMAC vs investissement SEO.',
  priorityActions: [
    'Résoudre les 5 alertes critiques sous 4h — task force activée',
    'Finaliser recrutement Directeur BU Prix de Transfert — 3 candidats shortlistés',
    'Soumettre manifestation d\'intérêt AMI Gouvernance BCEAO Phase III — deadline 15/07',
    'Lancer campagne LinkedIn Ads Q3 — budget 15M FCFA',
  ],
  decisionsRequired: [
    'Arbitrage Recrutement CEMAC (18M/an) vs Campagne SEO Internationale (12M/an)',
    'Validation budget Marketing Digital Q3 2026 — 45M FCFA proposé',
  ],
  horizon: 'Q3 2026 — T3 2026',
  author: 'KOS Executive Command Center™ — Automaton Engine v3.0',
};

// ============================================================
// Synthèse Quick Stats
// ============================================================
export interface QuickStat {
  key: string;
  label: string;
  value: string;
  icon: string;
  status: 'conforme' | 'surveillance' | 'action';
}

export const quickStats: QuickStat[] = [
  { key: 'ca_ytd', label: 'CA YTD', value: '425M', icon: 'ri-funds-line', status: 'conforme' },
  { key: 'pipeline', label: 'Pipeline', value: '680M', icon: 'ri-folder-chart-line', status: 'conforme' },
  { key: 'agents_ia', label: 'Agents IA', value: '68', icon: 'ri-cpu-line', status: 'conforme' },
  { key: 'missions', label: 'Missions Actives', value: '14', icon: 'ri-briefcase-line', status: 'conforme' },
  { key: 'win_rate', label: 'Win Rate', value: '42%', icon: 'ri-trophy-line', status: 'conforme' },
  { key: 'alertes', label: 'Alertes Actives', value: '12', icon: 'ri-notification-3-line', status: 'action' },
];

// ============================================================
// Export composé
// ============================================================
export const commandDimensions: CommandDimension[] = [
  dimensionSEO,
  dimensionGEO,
  dimensionPublications,
  dimensionConformite,
  dimensionRisques,
  dimensionIA,
  dimensionLeads,
  dimensionOpportunites,
  dimensionRevenus,
  dimensionAlertes,
];

export const statusConfig: Record<string, { color: string; bg: string; border: string; dot: string; icon: string; label: string }> = {
  conforme: {
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    icon: 'ri-checkbox-circle-fill',
    label: 'Conforme',
  },
  surveillance: {
    color: 'text-amber-700',
    bg: 'bg-amber-100',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    icon: 'ri-error-warning-fill',
    label: 'Surveillance',
  },
  action: {
    color: 'text-red-700',
    bg: 'bg-red-100',
    border: 'border-red-200',
    dot: 'bg-red-500',
    icon: 'ri-close-circle-fill',
    label: 'Action Immédiate',
  },
};





