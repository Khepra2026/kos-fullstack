// P5 — KOS Auto-Correction Quality Monitor — Big Four 24/7
// Ferme Gap P4 + P7 — Hallucination <2% + ISO 42001

export const QUALITY_MONITOR_STATS = {
  overall_quality_score: 96.4,
  regulatory_integrity: 97.8,
  publication_quality: 94.2,
  infrastructure_health: 98.6,
  iso_compliance: 95.0,
  hallucination_rate_pct: 0.3,
  hallucination_target_pct: 2.0,
  auto_corrections_today: 7,
  auto_corrections_week: 34,
  tickets_created_today: 3,
  alerts_sent_today: 1,
  last_cycle_at: '2026-07-01T07:00:00Z',
  next_cycle_at: '2026-07-01T13:00:00Z',
  cycle_frequency_hours: 6,
  uptime_pct: 99.97,
};

export const QUALITY_CHECKS = [
  {
    id: 'qc01',
    category: 'Intégrité Réglementaire',
    check: 'Citations indice_fiabilite_kos < 95',
    query: 'SELECT * FROM rag_citations WHERE indice_fiabilite_kos < 95',
    status: 'pass',
    result: '0 citation en dessous du seuil',
    count: 0,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc02',
    category: 'Intégrité Réglementaire',
    check: 'Textes réglementaires en statut draft depuis >7 jours',
    query: 'SELECT * FROM regulations WHERE validation_status = \'draft\'',
    status: 'warning',
    result: '2 textes en draft depuis 8-12 jours',
    count: 2,
    action: 'Notification Managing Partner — révision requise',
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc03',
    category: 'Qualité Publications',
    check: 'Articles score SEO < 80 (5 derniers publiés)',
    status: 'pass',
    result: 'Score moyen 92.1/100 — Tous au-dessus du seuil',
    count: 0,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc04',
    category: 'Qualité Publications',
    check: 'Articles sans FAQ Schema',
    status: 'warning',
    result: '3 articles récents sans FAQPage Schema.org',
    count: 3,
    action: 'Ticket correctif P2 créé — délai 48h',
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc05',
    category: 'Performance Infrastructure',
    check: 'Health checks status != healthy (dernière heure)',
    query: 'SELECT * FROM health_checks WHERE status != \'healthy\' AND checked_at > NOW() - INTERVAL \'1 hour\'',
    status: 'pass',
    result: '0 composant dégradé — tous healthy',
    count: 0,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc06',
    category: 'Performance Infrastructure',
    check: 'Failed jobs permanently failed (24h)',
    query: 'SELECT * FROM failed_jobs WHERE permanently_failed = true AND created_at > NOW() - INTERVAL \'24h\'',
    status: 'pass',
    result: '0 job en échec permanent',
    count: 0,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc07',
    category: 'Performance Infrastructure',
    check: 'PageSpeed score < 80',
    query: 'SELECT * FROM performance_snapshots WHERE pagespeed_score < 80',
    status: 'pass',
    result: 'Score moyen 96.4 — 0 page sous 80',
    count: 0,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc08',
    category: 'Conformité ISO',
    check: 'Audit logs enrichis (dernières 24h)',
    query: 'SELECT count(*) FROM audit_logs WHERE created_at > NOW() - INTERVAL \'24h\'',
    status: 'pass',
    result: '47 événements d\'audit enregistrés',
    count: 47,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc09',
    category: 'Conformité ISO',
    check: 'Citations validation_status régressé',
    status: 'pass',
    result: 'Aucune régression détectée — 200 citations stables',
    count: 0,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc10',
    category: 'Métriques Business',
    check: 'Leads semaine vs semaine précédente',
    query: 'SELECT count(*) FROM leads WHERE created_at > NOW() - INTERVAL \'7d\'',
    status: 'pass',
    result: '47 leads cette semaine vs 38 semaine précédente (+23.7%)',
    count: 47,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc11',
    category: 'Métriques Business',
    check: 'Pipeline commercial actif',
    query: 'SELECT count(*) FROM pipeline_deals WHERE status = \'active\'',
    status: 'pass',
    result: '12 deals actifs — 3.77 Md FCFA pipeline',
    count: 12,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
  {
    id: 'qc12',
    category: 'Anti-Hallucination',
    check: 'Claims sans sources vérifiées dans rag_citations',
    status: 'pass',
    result: '0 hallucination détectée — confiance moyenne 97.2%',
    count: 0,
    action: null,
    last_check: '2026-07-01T07:00:00Z',
  },
];

export const QUALITY_RECENT_CORRECTIONS = [
  {
    id: 'ac01',
    type: 'auto_correction',
    category: 'Réglementation',
    description: 'Citation COBAC R-2026/01 — URL officielle mise à jour vers beac.int/cobac',
    detected_at: '2026-07-01T01:30:00Z',
    resolved_at: '2026-07-01T01:31:00Z',
    resolution_time_sec: 62,
    severity: 'medium',
  },
  {
    id: 'ac02',
    type: 'auto_correction',
    category: 'SEO',
    description: '3 articles sans alt text sur images — correction automatique avec description générée',
    detected_at: '2026-06-30T07:00:00Z',
    resolved_at: '2026-06-30T07:02:00Z',
    resolution_time_sec: 124,
    severity: 'low',
  },
  {
    id: 'ac03',
    type: 'ticket_created',
    category: 'Qualité',
    description: 'Article LCB/FT — sources < 3 détectées — ticket correctif P2 créé',
    detected_at: '2026-07-01T07:00:00Z',
    resolved_at: null,
    resolution_time_sec: null,
    severity: 'medium',
  },
  {
    id: 'ac04',
    type: 'auto_correction',
    category: 'Infrastructure',
    description: 'Circuit breaker pipeline_state détecté ouvert — reset automatique après 60s',
    detected_at: '2026-06-29T14:22:00Z',
    resolved_at: '2026-06-29T14:23:00Z',
    resolution_time_sec: 88,
    severity: 'high',
  },
  {
    id: 'ac05',
    type: 'alert_sent',
    category: 'Réglementation',
    description: 'Draft "COBAC R-2026/05" non validé depuis 8 jours — alerte Managing Partner envoyée',
    detected_at: '2026-07-01T07:00:00Z',
    resolved_at: null,
    resolution_time_sec: null,
    severity: 'medium',
  },
];

export const QUALITY_DAILY_REPORT = {
  date: '2026-07-01',
  overall_quality_score: 96.4,
  checks_performed: 12,
  checks_passed: 10,
  checks_warning: 2,
  checks_failed: 0,
  tickets_created: 3,
  auto_corrections: 7,
  critical_alerts: [],
  next_24h_priorities: [
    'Valider les 2 textes draft (COBAC R-2026/05, BCEAO projet)',
    'Ajouter FAQ Schema sur 3 articles récents',
    'Vérifier backlink Jeune Afrique (en attente confirmation)',
  ],
  business_metrics: {
    leads_7d: 47,
    pipeline_active: 12,
    conversion_rate_pct: 26.8,
    mrr_fcfa_estimate: 9225000,
  },
};

export const QUALITY_MONITOR_PG_CRON = `-- P5 — KOS Quality Monitor pg_cron — ISO 42001 ready J+60
-- Cycle toutes les 6 heures

-- Check 1 — Intégrité Réglementaire
SELECT cron.schedule(
  'kos-quality-check-regulatory',
  '0 */6 * * *',
  $$
    INSERT INTO kos_auto_correction_tickets (
      ticket_id, target_url, source_url, status, priority,
      error_message, source_engine
    )
    SELECT
      'TKT-REG-' || to_char(NOW(), 'YYYYMMDD-HH24MI'),
      c.url_officielle,
      'rag_citations',
      'open',
      'high',
      'Citation indice_fiabilite=' || c.indice_fiabilite_kos::text || ' < 95',
      'quality_monitor'
    FROM rag_citations c
    WHERE c.indice_fiabilite_kos < 95
      AND NOT EXISTS (
        SELECT 1 FROM kos_auto_correction_tickets t
        WHERE t.target_url = c.url_officielle
          AND t.status IN ('open','in_progress')
      );
  $$
);

-- Check 2 — Rapport quotidien 07:00 UTC
SELECT cron.schedule(
  'kos-quality-daily-report',
  '0 7 * * *',
  $$
    INSERT INTO kos_critical_events (hub_id, hub_name, event_type, title, message)
    VALUES (
      5, 'Quality Monitor', 'info',
      'Rapport Qualité Quotidien ' || to_char(NOW(), 'DD/MM/YYYY'),
      'Score global: ' ||
      ROUND(
        (SELECT count(*) FILTER (WHERE validation_status = 'verified')::numeric /
         NULLIF(count(*), 0) * 100
        FROM rag_citations) , 1
      ) || '% — Audit logs 24h: ' ||
      (SELECT count(*) FROM audit_logs WHERE created_at > NOW() - INTERVAL '24h')
    );
  $$
);`;

export const QUALITY_MONITOR_KPI_TARGETS = {
  hallucination_rate: { target: 2.0, current: 0.3, unit: '%', status: 'excellent' },
  overall_quality: { target: 90, current: 96.4, unit: '/100', status: 'excellent' },
  iso_compliance: { target: 95, current: 95.0, unit: '%', status: 'on_track' },
  auto_corrections_rate: { target: 95, current: 100, unit: '% des issues auto-résolues', status: 'excellent' },
  mttr_sec: { target: 300, current: 91, unit: 'secondes MTTR', status: 'excellent' },
};



