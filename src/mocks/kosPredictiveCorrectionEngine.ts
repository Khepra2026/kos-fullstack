export interface PredictiveScan {
  id: string;
  component: string;
  category: 'performance' | 'seo' | 'security' | 'accessibility' | 'url_health' | 'content_quality';
  current_health: number;
  degradation_rate: number;
  predicted_failure_at: string;
  confidence: number;
  risk_level: 'critical' | 'high' | 'medium' | 'low';
  signals: string[];
  trend: 'deteriorating' | 'stable' | 'improving';
}

export interface RiskForecast {
  id: string;
  defect_type: string;
  category: string;
  predicted_impact: string;
  probability: number;
  time_to_failure_hours: number;
  affected_components: string[];
  root_cause_pattern: string;
  recommended_preemption: string;
  auto_fix_deployed: boolean;
  severity_if_occurs: 'critical' | 'high' | 'medium' | 'low';
}

export interface PreemptiveFix {
  id: string;
  description: string;
  category: string;
  applied_at: string;
  defect_prevented: string;
  impact_avoided: string;
  method: 'auto' | 'semi_auto' | 'manual_review';
  success_verified: boolean;
  related_forecast_id: string;
  time_saved_hours: number;
}

export interface LearnedPattern {
  id: string;
  pattern_name: string;
  category: string;
  occurrences: number;
  first_seen: string;
  last_seen: string;
  typical_triggers: string[];
  preemptive_strategy: string;
  success_rate: number;
  false_positive_rate: number;
  maturity: 'proven' | 'validating' | 'emerging';
}

export interface PreventionKPI {
  category: string;
  reactive_fixes: number;
  preemptive_fixes: number;
  prevention_rate: number;
  target_rate: number;
  defects_avoided: number;
  hours_saved: number;
  trend: 'improving' | 'stable' | 'declining';
}

export const predictiveScans: PredictiveScan[] = [
  {
    id: 'SCAN-001',
    component: 'Core Web Vitals — LCP Homepage',
    category: 'performance',
    current_health: 78,
    degradation_rate: 2.3,
    predicted_failure_at: '2026-07-08T14:00:00Z',
    confidence: 91,
    risk_level: 'high',
    signals: ['Image payload +15% en 7 jours', 'Cache hit rate -8%', 'Render-blocking JS +120ms'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-002',
    component: 'Core Web Vitals — CLS Blog Articles',
    category: 'performance',
    current_health: 85,
    degradation_rate: 1.8,
    predicted_failure_at: '2026-07-12T09:00:00Z',
    confidence: 87,
    risk_level: 'medium',
    signals: ['Ads iframe dimensions non réservées', 'Dynamic content injection 3 nouveaux widgets', 'Font swap delay +0.05s'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-003',
    component: 'Indexation — Sitemap Coverage',
    category: 'seo',
    current_health: 96,
    degradation_rate: 0.8,
    predicted_failure_at: '2026-07-25T00:00:00Z',
    confidence: 76,
    risk_level: 'low',
    signals: ['12 nouvelles URLs non crawlées', 'Crawl budget consommé 78%', '2 soft 404s détectés hier'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-004',
    component: 'SEO — Meta Descriptions Manquantes',
    category: 'seo',
    current_health: 72,
    degradation_rate: 4.1,
    predicted_failure_at: '2026-07-04T18:00:00Z',
    confidence: 94,
    risk_level: 'critical',
    signals: ['8 nouveaux articles sans meta description', 'Template par défaut activé sur 3 landing pages', 'Duplicate meta sur 5 pages'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-005',
    component: 'Sécurité — Headers CSP',
    category: 'security',
    current_health: 88,
    degradation_rate: 1.2,
    predicted_failure_at: '2026-07-18T12:00:00Z',
    confidence: 82,
    risk_level: 'medium',
    signals: ['Nouveau script tiers ajouté (analytics)', 'CSP non mis à jour depuis 14 jours', '1 violation CSP reportée'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-006',
    component: 'Accessibilité — Contraste Liens',
    category: 'accessibility',
    current_health: 91,
    degradation_rate: 0.5,
    predicted_failure_at: '2026-08-02T00:00:00Z',
    confidence: 68,
    risk_level: 'low',
    signals: ['Nouveau design system avec 3 teintes modifiées', 'Ratio contraste en baisse 0.3:1 sur liens footer'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-007',
    component: 'URLs — Liens Internes Cassés',
    category: 'url_health',
    current_health: 65,
    degradation_rate: 3.5,
    predicted_failure_at: '2026-07-03T08:00:00Z',
    confidence: 96,
    risk_level: 'critical',
    signals: ['5 slugs modifiés sans redirection', 'Migration de 3 articles sans mise à jour liens', '2 anchors orphelins'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-008',
    component: 'Contenu — Score Qualité Articles',
    category: 'content_quality',
    current_health: 82,
    degradation_rate: 1.5,
    predicted_failure_at: '2026-07-15T00:00:00Z',
    confidence: 79,
    risk_level: 'medium',
    signals: ['Longueur moyenne en baisse (-12%)', 'Citations réglementaires non vérifiées sur 4 articles', 'Taux rebond +5%'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-009',
    component: 'Performance — TBT Page Services',
    category: 'performance',
    current_health: 93,
    degradation_rate: 0.2,
    predicted_failure_at: '2026-08-15T00:00:00Z',
    confidence: 55,
    risk_level: 'low',
    signals: ['Bundle JS +8 Ko en 14 jours', 'Third-party scripts stable'],
    trend: 'stable',
  },
  {
    id: 'SCAN-010',
    component: 'Performance — FCP Page Contact',
    category: 'performance',
    current_health: 95,
    degradation_rate: -0.5,
    predicted_failure_at: null,
    confidence: 98,
    risk_level: 'low',
    signals: ['Optimisation images déployée hier', 'Cache amélioré'],
    trend: 'improving',
  },
  {
    id: 'SCAN-011',
    component: 'SEO — Structured Data Validation',
    category: 'seo',
    current_health: 74,
    degradation_rate: 2.8,
    predicted_failure_at: '2026-07-06T12:00:00Z',
    confidence: 89,
    risk_level: 'high',
    signals: ['3 types Schema.org avec warnings Google', 'New FAQ markup non testé', 'BreadcrumbList cassé sur 2 pages'],
    trend: 'deteriorating',
  },
  {
    id: 'SCAN-012',
    component: 'Sécurité — Certificat SSL Expiration',
    category: 'security',
    current_health: 99,
    degradation_rate: 0.05,
    predicted_failure_at: '2026-09-15T00:00:00Z',
    confidence: 100,
    risk_level: 'low',
    signals: ['Expiration dans 77 jours', 'Auto-renew configuré'],
    trend: 'stable',
  },
];

export const riskForecasts: RiskForecast[] = [
  {
    id: 'FCST-001',
    defect_type: 'LCP > 2.5s sur Homepage',
    category: 'performance',
    predicted_impact: 'Perte ranking Google -3 positions, trafic -12%',
    probability: 91,
    time_to_failure_hours: 192,
    affected_components: ['Image hero', 'Lazy loading', 'CDN cache'],
    root_cause_pattern: 'Augmentation payload images + baisse cache hit rate = convergence LCP critique',
    recommended_preemption: 'Compresser images hero WebP < 80KB + précharger critical CSS + cache TTL 30j',
    auto_fix_deployed: true,
    severity_if_occurs: 'high',
  },
  {
    id: 'FCST-002',
    defect_type: 'Meta descriptions manquantes sur 8+ pages',
    category: 'seo',
    predicted_impact: 'CTR Google -40% sur pages affectées, featured snippets perdus',
    probability: 94,
    time_to_failure_hours: 96,
    affected_components: ['Blog articles', 'Landing pages', 'Tools pages'],
    root_cause_pattern: 'Publication rapide sans validation SEO → template fallback → duplicate metas',
    recommended_preemption: 'Générer meta descriptions via AI + validation humaine avant publication',
    auto_fix_deployed: true,
    severity_if_occurs: 'critical',
  },
  {
    id: 'FCST-003',
    defect_type: '5+ Liens internes cassés (404)',
    category: 'url_health',
    predicted_impact: 'Crawl budget gaspillé, PageRank dilué, expérience utilisateur dégradée',
    probability: 96,
    time_to_failure_hours: 72,
    affected_components: ['Navigation', 'Blog cross-links', 'Footer'],
    root_cause_pattern: 'Migration de slugs sans redirections 301 → liens orphelins en cascade',
    recommended_preemption: 'Exécuter link checker avant publication + auto-redirect 301 sur slugs modifiés',
    auto_fix_deployed: true,
    severity_if_occurs: 'critical',
  },
  {
    id: 'FCST-004',
    defect_type: 'Schema.org invalide sur 3+ types',
    category: 'seo',
    predicted_impact: 'Perte rich results Google, CTR -25%, featured snippets disparus',
    probability: 89,
    time_to_failure_hours: 144,
    affected_components: ['FAQ schema', 'BreadcrumbList', 'Article schema'],
    root_cause_pattern: 'Nouveaux champs Schema.org ajoutés sans validation → errors Google Search Console',
    recommended_preemption: 'Valider Schema.org via Rich Results Test avant chaque déploiement',
    auto_fix_deployed: false,
    severity_if_occurs: 'high',
  },
  {
    id: 'FCST-005',
    defect_type: 'CSP headers non conformes OWASP',
    category: 'security',
    predicted_impact: 'Score sécurité A → B, vulnérabilité XSS potentielle',
    probability: 82,
    time_to_failure_hours: 360,
    affected_components: ['Content-Security-Policy', 'Script-src', 'Frame-ancestors'],
    root_cause_pattern: 'Ajout de services tiers sans mise à jour CSP → directive manquante → faille potentielle',
    recommended_preemption: 'Audit CSP mensuel automatique + update headers si nouveau script détecté',
    auto_fix_deployed: false,
    severity_if_occurs: 'medium',
  },
  {
    id: 'FCST-006',
    defect_type: 'TBT > 300ms sur mobile (pages outils)',
    category: 'performance',
    predicted_impact: 'Core Web Vitals FAIL, impact ranking mobile, INP dégradé',
    probability: 78,
    time_to_failure_hours: 240,
    affected_components: ['JavaScript bundles', 'Third-party widgets', 'Web Workers absents'],
    root_cause_pattern: 'Accumulation progressive de JS non optimisé + absence de code splitting',
    recommended_preemption: 'Tree-shaking automatique + lazy-loading widgets non-critiques + Web Worker pour calculs lourds',
    auto_fix_deployed: false,
    severity_if_occurs: 'high',
  },
  {
    id: 'FCST-007',
    defect_type: 'Articles sans citations réglementaires vérifiées',
    category: 'content_quality',
    predicted_impact: 'Score crédibilité réglementaire -15%, risque réputationnel',
    probability: 79,
    time_to_failure_hours: 336,
    affected_components: ['4 articles blog', 'Observatoires sectoriels'],
    root_cause_pattern: 'Cadence publication > capacité validation → articles publiés sans triple vérification',
    recommended_preemption: 'Publication Gate automatique : bloquer si score conformité < 95',
    auto_fix_deployed: true,
    severity_if_occurs: 'medium',
  },
  {
    id: 'FCST-008',
    defect_type: 'Baisse progressive score qualité contenu',
    category: 'content_quality',
    predicted_impact: 'Engagement -20%, taux rebond +15%, SEO ranking -5 positions',
    probability: 75,
    time_to_failure_hours: 480,
    affected_components: ['Blog content', 'Service pages', 'Landing pages'],
    root_cause_pattern: 'Volume > Qualité : 3 articles/jour vs 1.5 → standards éditoriaux dilués',
    recommended_preemption: 'Quality gate à 8.5/10 minimum avant publication + revue éditoriale hebdomadaire',
    auto_fix_deployed: false,
    severity_if_occurs: 'medium',
  },
];

export const preemptiveFixes: PreemptiveFix[] = [
  {
    id: 'PREF-001',
    description: 'Compression automatique images hero homepage → WebP 75KB + préchargement critical CSS',
    category: 'performance',
    applied_at: '2026-06-29T06:15:00Z',
    defect_prevented: 'LCP dégradation homepage (prédit à 2.8s le 08/07)',
    impact_avoided: '-3 positions Google, -12% trafic organique',
    method: 'auto',
    success_verified: true,
    related_forecast_id: 'FCST-001',
    time_saved_hours: 24,
  },
  {
    id: 'PREF-002',
    description: 'Redirections 301 automatiques sur 5 slugs modifiés + vérification liens internes',
    category: 'url_health',
    applied_at: '2026-06-29T04:30:00Z',
    defect_prevented: '5 liens internes cassés (404) prédits pour le 03/07',
    impact_avoided: 'Crawl budget gaspillé, PageRank dilué',
    method: 'auto',
    success_verified: true,
    related_forecast_id: 'FCST-003',
    time_saved_hours: 8,
  },
  {
    id: 'PREF-003',
    description: 'Génération AI + validation humaine des meta descriptions pour 8 nouveaux articles',
    category: 'seo',
    applied_at: '2026-06-29T08:00:00Z',
    defect_prevented: 'Meta descriptions manquantes/dupliquées sur 8 pages (prédit 04/07)',
    impact_avoided: 'CTR Google -40%, perte featured snippets',
    method: 'semi_auto',
    success_verified: true,
    related_forecast_id: 'FCST-002',
    time_saved_hours: 6,
  },
  {
    id: 'PREF-004',
    description: 'Publication Gate activée : blocage articles avec score conformité réglementaire < 95',
    category: 'content_quality',
    applied_at: '2026-06-28T18:00:00Z',
    defect_prevented: 'Articles sans citations vérifiées (prédit 11/07)',
    impact_avoided: 'Risque réputationnel, perte crédibilité réglementaire',
    method: 'auto',
    success_verified: true,
    related_forecast_id: 'FCST-007',
    time_saved_hours: 32,
  },
  {
    id: 'PREF-005',
    description: 'Optimisation bundle JS avec tree-shaking automatique + lazy-loading widgets',
    category: 'performance',
    applied_at: '2026-06-29T10:00:00Z',
    defect_prevented: 'TBT > 300ms sur mobile pages outils (prédit 10/07)',
    impact_avoided: 'Core Web Vitals FAIL, impact ranking mobile',
    method: 'auto',
    success_verified: true,
    related_forecast_id: 'FCST-006',
    time_saved_hours: 16,
  },
  {
    id: 'PREF-006',
    description: 'Mise à jour automatique des headers CSP avec nouveaux domaines tiers autorisés',
    category: 'security',
    applied_at: '2026-06-28T22:00:00Z',
    defect_prevented: 'CSP non conforme (prédit 18/07)',
    impact_avoided: 'Score sécurité A→B, vulnérabilité XSS potentielle',
    method: 'auto',
    success_verified: true,
    related_forecast_id: 'FCST-005',
    time_saved_hours: 4,
  },
];

export const learnedPatterns: LearnedPattern[] = [
  {
    id: 'PTRN-001',
    pattern_name: 'Dégradation LCP post-déploiement images',
    category: 'performance',
    occurrences: 14,
    first_seen: '2026-01-15',
    last_seen: '2026-06-28',
    typical_triggers: ['Nouvelles images non optimisées (>200KB)', 'Cache TTL < 7 jours', 'Absence de srcset responsive'],
    preemptive_strategy: 'Compression auto WebP + lazy-loading natif + CDN cache 30j',
    success_rate: 94,
    false_positive_rate: 3,
    maturity: 'proven',
  },
  {
    id: 'PTRN-002',
    pattern_name: 'Liens internes cassés post-migration slugs',
    category: 'url_health',
    occurrences: 22,
    first_seen: '2026-02-03',
    last_seen: '2026-06-29',
    typical_triggers: ['Modification slug article/blog', 'Migration contenu sans redirect map', 'Renommage catégories'],
    preemptive_strategy: 'Auto-redirect 301 à chaque modification de slug + scan liens avant publication',
    success_rate: 97,
    false_positive_rate: 1,
    maturity: 'proven',
  },
  {
    id: 'PTRN-003',
    pattern_name: 'Meta descriptions absentes sur contenu rapide',
    category: 'seo',
    occurrences: 18,
    first_seen: '2026-03-10',
    last_seen: '2026-06-27',
    typical_triggers: ['Publication >2 articles/jour', 'Auteurs sans checklist SEO', 'Template par défaut insuffisant'],
    preemptive_strategy: 'AI meta generator + validation gate avant publication',
    success_rate: 88,
    false_positive_rate: 7,
    maturity: 'validating',
  },
  {
    id: 'PTRN-004',
    pattern_name: 'Schema.org invalide après ajout champs',
    category: 'seo',
    occurrences: 9,
    first_seen: '2026-04-02',
    last_seen: '2026-06-25',
    typical_triggers: ['Ajout nouveau type Schema.org', 'Modification template sans test Rich Results', 'Mise à jour Google guidelines'],
    preemptive_strategy: 'Validation Rich Results Test automatique avant chaque déploiement',
    success_rate: 82,
    false_positive_rate: 12,
    maturity: 'validating',
  },
  {
    id: 'PTRN-005',
    pattern_name: 'Accumulation JS sans code splitting',
    category: 'performance',
    occurrences: 11,
    first_seen: '2026-02-20',
    last_seen: '2026-06-28',
    typical_triggers: ['Nouveaux widgets interactifs', 'Bibliothèques tierces ajoutées sans audit', 'Absence de budget performance'],
    preemptive_strategy: 'Tree-shaking automatique + chunk splitting + lazy-loading',
    success_rate: 85,
    false_positive_rate: 5,
    maturity: 'validating',
  },
  {
    id: 'PTRN-006',
    pattern_name: 'Articles sans triple validation réglementaire',
    category: 'content_quality',
    occurrences: 7,
    first_seen: '2026-05-15',
    last_seen: '2026-06-26',
    typical_triggers: ['Pression calendrier éditorial', 'Auteurs non formés KOS Regulatory Protocol', 'Absence de checklist conformité'],
    preemptive_strategy: 'Publication Gate bloquante si score conformité < 95/100',
    success_rate: 95,
    false_positive_rate: 2,
    maturity: 'emerging',
  },
];

export const preventionKPIs: PreventionKPI[] = [
  {
    category: 'Performance',
    reactive_fixes: 47,
    preemptive_fixes: 23,
    prevention_rate: 33,
    target_rate: 60,
    defects_avoided: 12,
    hours_saved: 96,
    trend: 'improving',
  },
  {
    category: 'SEO',
    reactive_fixes: 89,
    preemptive_fixes: 31,
    prevention_rate: 26,
    target_rate: 55,
    defects_avoided: 18,
    hours_saved: 72,
    trend: 'improving',
  },
  {
    category: 'Sécurité',
    reactive_fixes: 12,
    preemptive_fixes: 18,
    prevention_rate: 60,
    target_rate: 75,
    defects_avoided: 5,
    hours_saved: 48,
    trend: 'stable',
  },
  {
    category: 'URL Health',
    reactive_fixes: 34,
    preemptive_fixes: 28,
    prevention_rate: 45,
    target_rate: 70,
    defects_avoided: 15,
    hours_saved: 40,
    trend: 'improving',
  },
  {
    category: 'Accessibilité',
    reactive_fixes: 8,
    preemptive_fixes: 5,
    prevention_rate: 38,
    target_rate: 50,
    defects_avoided: 3,
    hours_saved: 12,
    trend: 'stable',
  },
  {
    category: 'Content Quality',
    reactive_fixes: 21,
    preemptive_fixes: 14,
    prevention_rate: 40,
    target_rate: 65,
    defects_avoided: 7,
    hours_saved: 56,
    trend: 'improving',
  },
];

export const predictiveEngineStats = {
  total_scans_active: 12,
  forecasts_generated: 8,
  preemptive_fixes_applied: 6,
  preemptive_fixes_pending: 2,
  defects_prevented_total: 60,
  hours_saved_total: 328,
  prevention_rate_global: 36,
  target_prevention_rate: 65,
  patterns_learned: 6,
  patterns_proven: 2,
  patterns_validating: 3,
  patterns_emerging: 1,
  accuracy_mean: 87.5,
  false_positive_mean: 5.0,
  avg_prediction_horizon_hours: 240,
  next_scan_at: '2026-06-30T08:00:00Z',
  engine_version: 'v1.0-predictive',
  mode: 'ACTIVE — Continuous Scanning',
  last_complete_scan: '2026-06-30T05:00:00Z',
};





