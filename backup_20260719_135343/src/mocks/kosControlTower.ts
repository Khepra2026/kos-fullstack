export interface ControlTowerSEOMetric {
  name: string;
  value: string;
  unit: string;
  target: string;
  trend: 'up' | 'down' | 'stable';
  status: 'ok' | 'warning' | 'critical';
}

export interface ControlTowerKeyword {
  keyword: string;
  position: number;
  change: number;
  volume: number;
  difficulty: string;
  url: string;
}

export interface ControlTowerLead {
  id: string;
  company: string;
  contact: string;
  email: string;
  score: number;
  source: string;
  status: 'hot' | 'warm' | 'cold' | 'won' | 'lost';
  value_fcfa: number;
  last_activity: string;
  bu: string;
}

export interface ControlTowerRevenueStream {
  month: string;
  revenue_fcfa: number;
  target_fcfa: number;
  growth_pct: number;
  bu_breakdown: { bu: string; amount: number }[];
}

export interface ControlTowerPipelineDeal {
  id: string;
  client: string;
  service: string;
  value_fcfa: number;
  stage: 'prospection' | 'qualification' | 'proposition' | 'negociation' | 'closing' | 'won' | 'lost';
  probability_pct: number;
  expected_close: string;
  owner: string;
  bu: string;
}

export interface ControlTowerMission {
  id: string;
  client: string;
  mission_name: string;
  bu: string;
  start_date: string;
  end_date: string;
  status: 'on_track' | 'at_risk' | 'delayed' | 'completed';
  quality_score: number;
  budget_fcfa: number;
  consumed_pct: number;
  team_size: number;
}

export interface ControlTowerRisk {
  id: string;
  risk_name: string;
  category: string;
  probability: number;
  impact: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'monitored' | 'mitigated' | 'closed';
  mitigation: string;
  owner: string;
}

export interface ControlTowerComplianceCheck {
  id: string;
  regulation: string;
  authority: string;
  deadline: string;
  status: 'compliant' | 'in_progress' | 'non_compliant' | 'not_applicable';
  completion_pct: number;
  last_audit: string;
  next_audit: string;
  owner: string;
}

export interface ControlTowerAIProductivity {
  agent_name: string;
  category: string;
  tasks_completed: number;
  time_saved_hours: number;
  accuracy_pct: number;
  cost_avoidance_fcfa: number;
  status: 'running' | 'idle' | 'error';
  efficiency_trend: 'up' | 'down' | 'stable';
}

export interface controlTowerBloc5 {
  bloc_id: string;
  bloc_name: string;
  version: string;
  target_maturity: number;
  current_maturity: number;
  executive_summary: string;
  last_updated: string;
  overall_health_score: number;
  alerts: { count: number; critical: number; warning: number };
  seo: {
    overall_score: number;
    keywords_tracked: number;
    avg_position: number;
    traffic_30d: number;
    backlinks_total: number;
    cwv_score: number;
    metrics: ControlTowerSEOMetric[];
    top_keywords: ControlTowerKeyword[];
  };
  leads: {
    total_leads: number;
    hot_leads: number;
    conversion_rate: number;
    avg_score: number;
    pipeline_value_fcfa: number;
    leads: ControlTowerLead[];
  };
  revenue: {
    mtd_fcfa: number;
    ytd_fcfa: number;
    growth_yoy_pct: number;
    target_achievement_pct: number;
    avg_margin_pct: number;
    monthly_streams: ControlTowerRevenueStream[];
  };
  pipeline: {
    total_value_fcfa: number;
    weighted_value_fcfa: number;
    deals_count: number;
    avg_cycle_days: number;
    win_rate_pct: number;
    deals: ControlTowerPipelineDeal[];
  };
  missions: {
    active_count: number;
    completed_count: number;
    avg_quality_score: number;
    on_track_pct: number;
    total_budget_fcfa: number;
    missions: ControlTowerMission[];
  };
  risks: {
    total_risks: number;
    critical_count: number;
    high_count: number;
    mitigated_pct: number;
    risk_heatmap_score: number;
    risks: ControlTowerRisk[];
  };
  compliance: {
    overall_compliance_pct: number;
    checks_total: number;
    compliant_count: number;
    non_compliant_count: number;
    upcoming_deadlines: number;
    checks: ControlTowerComplianceCheck[];
  };
  ai_productivity: {
    total_tasks: number;
    total_time_saved_hours: number;
    total_cost_avoidance_fcfa: number;
    avg_accuracy_pct: number;
    agents_active: number;
    agents: ControlTowerAIProductivity[];
  };
}

export const KOS_CONTROL_TOWER_DATA: controlTowerBloc5 = {
  bloc_id: 'BLOC-005',
  bloc_name: 'KOS Control Tower™',
  version: 'v1.0',
  target_maturity: 95,
  current_maturity: 95,
  executive_summary: 'Cockpit exécutif unifié offrant une visibilité temps réel sur les 8 piliers stratégiques de KHEPRA : SEO & Visibilité, Leads & Croissance, Revenus & Rentabilité, Pipeline Commercial, Missions & Livraison, Risques & Résilience, Conformité Réglementaire et Productivité IA. Chaque pilier est monitoré avec KPIs, alertes et recommandations actionnables.',
  last_updated: '2026-06-16T08:00:00Z',
  overall_health_score: 97,
  alerts: { count: 0, critical: 0, warning: 0 },

  seo: {
    overall_score: 88,
    keywords_tracked: 1247,
    avg_position: 8.4,
    traffic_30d: 142580,
    backlinks_total: 3840,
    cwv_score: 94,
    metrics: [
      { name: 'Impressions GSC', value: '1 247 000', unit: 'impressions', target: '> 1M', trend: 'up', status: 'ok' },
      { name: 'Clics GSC', value: '142 580', unit: 'clics', target: '> 120K', trend: 'up', status: 'ok' },
      { name: 'CTR moyen', value: '11.4', unit: '%', target: '> 10%', trend: 'up', status: 'ok' },
      { name: 'Position moyenne', value: '8.4', unit: 'pos', target: '< 10', trend: 'up', status: 'ok' },
      { name: 'Pages indexées', value: '2 847', unit: 'pages', target: '> 2 500', trend: 'up', status: 'ok' },
      { name: 'Backlinks', value: '3 840', unit: 'liens', target: '> 3 500', trend: 'up', status: 'ok' },
      { name: 'Core Web Vitals', value: '94', unit: 'pts', target: '> 90', trend: 'stable', status: 'ok' },
      { name: 'Taux rebond', value: '24.7', unit: '%', target: '< 30%', trend: 'down', status: 'ok' },
    ],
    top_keywords: [
      { keyword: 'conformité BCEAO audit', position: 2, change: 1, volume: 2400, difficulty: 'Haute', url: '/services/audit-pre-inspection-bceao' },
      { keyword: 'due diligence Afrique', position: 3, change: 0, volume: 5400, difficulty: 'Haute', url: '/services/due-diligence-acquisition' },
      { keyword: 'prix de transfert UEMOA', position: 1, change: 2, volume: 1800, difficulty: 'Moyenne', url: '/services/defense-fiscale-prix-transfert' },
      { keyword: 'gouvernance entreprise Afrique', position: 4, change: -1, volume: 3600, difficulty: 'Haute', url: '/pillar/gouvernance-entreprise-afrique' },
      { keyword: 'agrément SFD BCEAO', position: 5, change: 3, volume: 1200, difficulty: 'Moyenne', url: '/services/agrement-fintech-etablissement-paiement' },
      { keyword: 'conformité COBAC CEMAC', position: 2, change: 1, volume: 2100, difficulty: 'Haute', url: '/conformite-cemac' },
      { keyword: 'ESG Afrique reporting', position: 7, change: -2, volume: 4200, difficulty: 'Moyenne', url: '/guide-esg-afrique' },
      { keyword: 'stress test portefeuille BCEAO', position: 1, change: 0, volume: 980, difficulty: 'Basse', url: '/tools/stress-test-financier' },
      { keyword: 'levée de fonds Afrique', position: 8, change: 5, volume: 6800, difficulty: 'Haute', url: '/services/levee-de-fonds' },
      { keyword: 'LBC FT conformité UEMOA', position: 3, change: 2, volume: 1500, difficulty: 'Moyenne', url: '/services/controle-interne-bancaire' },
    ],
  },

  leads: {
    total_leads: 247,
    hot_leads: 18,
    conversion_rate: 48.3,
    avg_score: 72,
    pipeline_value_fcfa: 2100000000,
    leads: [
      { id: 'LD-001', company: 'Banque Atlantique', contact: 'Amadou Diallo', email: 'a.diallo@banqueatlantique.sn', score: 94, source: 'Référence client', status: 'hot', value_fcfa: 450000000, last_activity: '2026-06-15T14:30:00Z', bu: 'BU1' },
      { id: 'LD-002', company: 'Coris Bank International', contact: 'Fatou Koné', email: 'f.kone@corisbank.bf', score: 91, source: 'SEO — BCEAO', status: 'hot', value_fcfa: 380000000, last_activity: '2026-06-14T09:15:00Z', bu: 'BU1' },
      { id: 'LD-003', company: 'Cimenterie du Sahel', contact: 'Ibrahima Sow', email: 'i.sow@cimsahel.sn', score: 88, source: 'LinkedIn', status: 'hot', value_fcfa: 280000000, last_activity: '2026-06-13T16:45:00Z', bu: 'BU2' },
      { id: 'LD-004', company: 'Banque Mondiale — SFD Projet', contact: 'Marie Nguema', email: 'm.nguema@worldbank.org', score: 85, source: 'Appel d\'offres', status: 'hot', value_fcfa: 520000000, last_activity: '2026-06-12T11:00:00Z', bu: 'BU4' },
      { id: 'LD-005', company: 'Ecobank Transnational', contact: 'Koffi Mensah', email: 'k.mensah@ecobank.com', score: 82, source: 'Salon — Africa CEO Forum', status: 'hot', value_fcfa: 610000000, last_activity: '2026-06-11T08:30:00Z', bu: 'BU1' },
      { id: 'LD-006', company: 'SONATEL — Audit Social', contact: 'Aminata Ba', email: 'a.ba@sonatel.sn', score: 78, source: 'Référence Partenaire', status: 'warm', value_fcfa: 180000000, last_activity: '2026-06-10T15:20:00Z', bu: 'BU3' },
      { id: 'LD-007', company: 'NSIA Banque Côte d\'Ivoire', contact: 'Jean-Marc Yapo', email: 'jm.yapo@nsiabanque.ci', score: 76, source: 'SEO — COBAC', status: 'warm', value_fcfa: 340000000, last_activity: '2026-06-09T10:00:00Z', bu: 'BU1' },
      { id: 'LD-008', company: 'Orange Finances Mobiles', contact: 'Serge Ekambi', email: 's.ekambi@orange.com', score: 74, source: 'LinkedIn', status: 'warm', value_fcfa: 250000000, last_activity: '2026-06-08T14:00:00Z', bu: 'BU2' },
      { id: 'LD-009', company: 'Ministère Finances Sénégal', contact: 'Cheikh Ndiaye', email: 'c.ndiaye@minfinances.sn', score: 71, source: 'Appel d\'offres', status: 'warm', value_fcfa: 420000000, last_activity: '2026-06-07T09:45:00Z', bu: 'BU4' },
      { id: 'LD-010', company: 'BOA — Bank of Africa', contact: 'Moussa Traoré', email: 'm.traore@boa.ml', score: 65, source: 'SEO — UEMOA', status: 'warm', value_fcfa: 290000000, last_activity: '2026-06-06T11:30:00Z', bu: 'BU1' },
    ],
  },

  revenue: {
    mtd_fcfa: 385000000,
    ytd_fcfa: 2470000000,
    growth_yoy_pct: 22.4,
    target_achievement_pct: 87.5,
    avg_margin_pct: 38.5,
    monthly_streams: [
      { month: 'Janvier', revenue_fcfa: 340000000, target_fcfa: 350000000, growth_pct: 18.2, bu_breakdown: [{ bu: 'BU1', amount: 180000000 }, { bu: 'BU2', amount: 85000000 }, { bu: 'BU3', amount: 50000000 }, { bu: 'BU4', amount: 25000000 }] },
      { month: 'Février', revenue_fcfa: 365000000, target_fcfa: 370000000, growth_pct: 20.5, bu_breakdown: [{ bu: 'BU1', amount: 195000000 }, { bu: 'BU2', amount: 90000000 }, { bu: 'BU3', amount: 55000000 }, { bu: 'BU4', amount: 25000000 }] },
      { month: 'Mars', revenue_fcfa: 410000000, target_fcfa: 400000000, growth_pct: 24.1, bu_breakdown: [{ bu: 'BU1', amount: 220000000 }, { bu: 'BU2', amount: 95000000 }, { bu: 'BU3', amount: 60000000 }, { bu: 'BU4', amount: 35000000 }] },
      { month: 'Avril', revenue_fcfa: 395000000, target_fcfa: 420000000, growth_pct: 19.8, bu_breakdown: [{ bu: 'BU1', amount: 200000000 }, { bu: 'BU2', amount: 105000000 }, { bu: 'BU3', amount: 55000000 }, { bu: 'BU4', amount: 35000000 }] },
      { month: 'Mai', revenue_fcfa: 425000000, target_fcfa: 440000000, growth_pct: 21.3, bu_breakdown: [{ bu: 'BU1', amount: 230000000 }, { bu: 'BU2', amount: 100000000 }, { bu: 'BU3', amount: 60000000 }, { bu: 'BU4', amount: 35000000 }] },
      { month: 'Juin', revenue_fcfa: 385000000, target_fcfa: 450000000, growth_pct: 22.4, bu_breakdown: [{ bu: 'BU1', amount: 200000000 }, { bu: 'BU2', amount: 95000000 }, { bu: 'BU3', amount: 55000000 }, { bu: 'BU4', amount: 35000000 }] },
    ],
  },

  pipeline: {
    total_value_fcfa: 2100000000,
    weighted_value_fcfa: 1014300000,
    deals_count: 34,
    avg_cycle_days: 68,
    win_rate_pct: 48.3,
    deals: [
      { id: 'DL-001', client: 'Banque Atlantique', service: 'Audit Pré-Inspection BCEAO', value_fcfa: 450000000, stage: 'negociation', probability_pct: 80, expected_close: '2026-07-15', owner: 'Director BU1', bu: 'BU1' },
      { id: 'DL-002', client: 'Coris Bank International', service: 'Mise en Conformité COBAC', value_fcfa: 380000000, stage: 'proposition', probability_pct: 65, expected_close: '2026-07-30', owner: 'Senior Partner', bu: 'BU1' },
      { id: 'DL-003', client: 'Ecobank Transnational', service: 'Gouvernance Board Advisory', value_fcfa: 610000000, stage: 'qualification', probability_pct: 40, expected_close: '2026-08-15', owner: 'Managing Partner', bu: 'BU1' },
      { id: 'DL-004', client: 'Banque Mondiale', service: 'Modernisation SFD UEMOA', value_fcfa: 520000000, stage: 'proposition', probability_pct: 55, expected_close: '2026-07-20', owner: 'Director BU4', bu: 'BU4' },
      { id: 'DL-005', client: 'Cimenterie du Sahel', service: 'Documentation Prix Transfert', value_fcfa: 280000000, stage: 'proposition', probability_pct: 70, expected_close: '2026-07-10', owner: 'Director BU2', bu: 'BU2' },
      { id: 'DL-006', client: 'SONATEL', service: 'Audit Social Stratégique', value_fcfa: 180000000, stage: 'qualification', probability_pct: 50, expected_close: '2026-08-01', owner: 'Manager BU3', bu: 'BU3' },
      { id: 'DL-007', client: 'NSIA Banque CI', service: 'Dispositif LBC/FT', value_fcfa: 340000000, stage: 'prospection', probability_pct: 25, expected_close: '2026-09-15', owner: 'Senior Consultant', bu: 'BU1' },
      { id: 'DL-008', client: 'Orange Finances Mobiles', service: 'Due Diligence Réglementaire', value_fcfa: 250000000, stage: 'qualification', probability_pct: 45, expected_close: '2026-08-20', owner: 'Director BU2', bu: 'BU2' },
      { id: 'DL-009', client: 'Ministère Finances Sénégal', service: 'Modernisation Fiscale', value_fcfa: 420000000, stage: 'prospection', probability_pct: 20, expected_close: '2026-10-01', owner: 'Manager BU4', bu: 'BU4' },
      { id: 'DL-010', client: 'BOA Mali', service: 'Stress Test Portefeuille', value_fcfa: 290000000, stage: 'proposition', probability_pct: 60, expected_close: '2026-07-25', owner: 'Director BU1', bu: 'BU1' },
    ],
  },

  missions: {
    active_count: 14,
    completed_count: 47,
    avg_quality_score: 9.4,
    on_track_pct: 78.6,
    total_budget_fcfa: 1850000000,
    missions: [
      { id: 'MS-001', client: 'Banque Sahel', mission_name: 'Pré-Inspection BCEAO 2026', bu: 'BU1', start_date: '2026-03-01', end_date: '2026-08-31', status: 'on_track', quality_score: 9.6, budget_fcfa: 420000000, consumed_pct: 68, team_size: 6 },
      { id: 'MS-002', client: 'Multinationale Agro', mission_name: 'Documentation BEPS Prix Transfert', bu: 'BU2', start_date: '2026-02-15', end_date: '2026-07-31', status: 'on_track', quality_score: 9.4, budget_fcfa: 280000000, consumed_pct: 72, team_size: 4 },
      { id: 'MS-003', client: 'FinTech Paiement Mobile', mission_name: 'Agrément Établissement Paiement', bu: 'BU1', start_date: '2026-04-01', end_date: '2026-10-31', status: 'on_track', quality_score: 9.2, budget_fcfa: 350000000, consumed_pct: 45, team_size: 5 },
      { id: 'MS-004', client: 'Banque CEMAC', mission_name: 'Dispositif LBC/FT Complet', bu: 'BU1', start_date: '2026-05-01', end_date: '2026-11-30', status: 'at_risk', quality_score: 8.9, budget_fcfa: 310000000, consumed_pct: 38, team_size: 4 },
      { id: 'MS-005', client: 'Cimenterie Sahel', mission_name: 'Évaluation ESG & Climat', bu: 'BU3', start_date: '2026-05-15', end_date: '2026-09-30', status: 'on_track', quality_score: 9.5, budget_fcfa: 180000000, consumed_pct: 35, team_size: 3 },
      { id: 'MS-006', client: 'Fonds d\'Investissement', mission_name: 'Due Diligence Acquisition Banque', bu: 'BU3', start_date: '2026-06-01', end_date: '2026-08-15', status: 'on_track', quality_score: 9.7, budget_fcfa: 220000000, consumed_pct: 25, team_size: 5 },
      { id: 'MS-007', client: 'Gouvernement Sénégal', mission_name: 'Modernisation Fiscale Nationale', bu: 'BU4', start_date: '2026-04-15', end_date: '2026-12-31', status: 'delayed', quality_score: 9.0, budget_fcfa: 480000000, consumed_pct: 40, team_size: 5 },
      { id: 'MS-008', client: 'Microfinance Régionale', mission_name: 'Plan Stratégique 2027-2030', bu: 'BU4', start_date: '2026-06-10', end_date: '2026-10-15', status: 'on_track', quality_score: 9.3, budget_fcfa: 150000000, consumed_pct: 10, team_size: 3 },
    ],
  },

  risks: {
    total_risks: 28,
    critical_count: 3,
    high_count: 7,
    mitigated_pct: 65,
    risk_heatmap_score: 72,
    risks: [
      { id: 'RK-001', risk_name: 'Retard inspection BCEAO — Pénalité client', category: 'Opérationnel', probability: 35, impact: 90, severity: 'critical', status: 'active', mitigation: 'Renfort équipe SWAT + KOS Auto-Task Orchestrator', owner: 'Director BU1' },
      { id: 'RK-002', risk_name: 'Départ Director BU1 — Perte capital intellectuel', category: 'RH', probability: 25, impact: 85, severity: 'critical', status: 'monitored', mitigation: 'Plan rétention + documentation Strategic Memory', owner: 'Managing Partner' },
      { id: 'RK-003', risk_name: 'Contentieux fiscal Prix Transfert — Exposition 1.2 Md', category: 'Juridique', probability: 20, impact: 95, severity: 'critical', status: 'monitored', mitigation: 'Assurance RC Pro + Conseil fiscal externe', owner: 'Director BU2' },
      { id: 'RK-004', risk_name: 'Surcharge équipe BU1 — Risque burnout', category: 'RH', probability: 60, impact: 70, severity: 'high', status: 'active', mitigation: 'Recrutement accéléré + renfort BU4', owner: 'Director BU1' },
      { id: 'RK-005', risk_name: 'Retard déploiement KOS SaaS — Fenêtre marché', category: 'Stratégique', probability: 40, impact: 75, severity: 'high', status: 'monitored', mitigation: 'Équipe dédiée + priorisation MVP', owner: 'Data Science Lead' },
      { id: 'RK-006', risk_name: 'Non-conformité RGPD — Données clients', category: 'Conformité', probability: 15, impact: 80, severity: 'high', status: 'mitigated', mitigation: 'Audit externe + DPO + chiffrement', owner: 'DPO' },
      { id: 'RK-007', risk_name: 'Concentration client — Top 3 = 45% CA', category: 'Financier', probability: 45, impact: 65, severity: 'high', status: 'monitored', mitigation: 'Diversification pipeline + nouveaux BU', owner: 'Managing Partner' },
    ],
  },

  compliance: {
    overall_compliance_pct: 88,
    checks_total: 24,
    compliant_count: 18,
    non_compliant_count: 2,
    upcoming_deadlines: 5,
    checks: [
      { id: 'CC-001', regulation: 'Circulaire BCEAO 01-2017 — Gouvernance', authority: 'BCEAO', deadline: '2026-06-30', status: 'compliant', completion_pct: 100, last_audit: '2026-05-15', next_audit: '2026-11-15', owner: 'Director BU1' },
      { id: 'CC-002', regulation: 'Circulaire BCEAO 03-2017 — 3 Lignes Défense', authority: 'BCEAO', deadline: '2026-06-30', status: 'compliant', completion_pct: 100, last_audit: '2026-05-20', next_audit: '2026-11-20', owner: 'Director BU1' },
      { id: 'CC-003', regulation: 'Règlement COBAC R-2016/01 — Gouvernance SFD', authority: 'COBAC', deadline: '2026-09-30', status: 'in_progress', completion_pct: 75, last_audit: '2026-04-10', next_audit: '2026-10-10', owner: 'Senior Consultant' },
      { id: 'CC-004', regulation: 'GAFI Recommandation 10 — CDD Renforcé', authority: 'GAFI', deadline: '2026-08-15', status: 'in_progress', completion_pct: 85, last_audit: '2026-05-01', next_audit: '2026-11-01', owner: 'Director BU1' },
      { id: 'CC-005', regulation: 'RGPD — Registre Traitements', authority: 'CNIL/CDP', deadline: '2026-07-31', status: 'in_progress', completion_pct: 60, last_audit: '2026-03-15', next_audit: '2026-09-15', owner: 'DPO' },
      { id: 'CC-006', regulation: 'ISO 27001 — SMSI Certification', authority: 'ISO', deadline: '2026-12-31', status: 'in_progress', completion_pct: 45, last_audit: '2026-02-28', next_audit: '2026-08-31', owner: 'Security Officer' },
      { id: 'CC-007', regulation: 'OHADA — Acte Uniforme Sociétés Commerciales', authority: 'OHADA', deadline: '2026-06-30', status: 'compliant', completion_pct: 100, last_audit: '2026-06-01', next_audit: '2026-12-01', owner: 'Director BU2' },
      { id: 'CC-008', regulation: 'Circulaire 001-2020 — Plans Préventifs', authority: 'BCEAO', deadline: '2026-09-30', status: 'non_compliant', completion_pct: 35, last_audit: '2026-02-01', next_audit: '2026-08-01', owner: 'Director BU1' },
    ],
  },

  ai_productivity: {
    total_tasks: 42840,
    total_time_saved_hours: 6840,
    total_cost_avoidance_fcfa: 342000000,
    avg_accuracy_pct: 96.8,
    agents_active: 68,
    agents: [
      { agent_name: 'SEO Autopilot', category: 'SEO', tasks_completed: 8420, time_saved_hours: 1240, accuracy_pct: 97.2, cost_avoidance_fcfa: 62000000, status: 'running', efficiency_trend: 'up' },
      { agent_name: 'Proposal Generator', category: 'Commercial', tasks_completed: 2840, time_saved_hours: 960, accuracy_pct: 95.8, cost_avoidance_fcfa: 48000000, status: 'running', efficiency_trend: 'up' },
      { agent_name: 'Quality Controller', category: 'Qualité', tasks_completed: 12400, time_saved_hours: 1840, accuracy_pct: 98.1, cost_avoidance_fcfa: 92000000, status: 'running', efficiency_trend: 'up' },
      { agent_name: 'Due Diligence Engine', category: 'Conseil', tasks_completed: 1240, time_saved_hours: 520, accuracy_pct: 94.5, cost_avoidance_fcfa: 26000000, status: 'running', efficiency_trend: 'stable' },
      { agent_name: 'Regulatory Intelligence', category: 'Conformité', tasks_completed: 6840, time_saved_hours: 780, accuracy_pct: 98.4, cost_avoidance_fcfa: 39000000, status: 'running', efficiency_trend: 'up' },
      { agent_name: 'Lead Scoring Engine', category: 'Commercial', tasks_completed: 5240, time_saved_hours: 320, accuracy_pct: 96.5, cost_avoidance_fcfa: 16000000, status: 'running', efficiency_trend: 'up' },
      { agent_name: 'Knowledge Graph', category: 'Knowledge', tasks_completed: 2840, time_saved_hours: 640, accuracy_pct: 95.2, cost_avoidance_fcfa: 32000000, status: 'running', efficiency_trend: 'stable' },
      { agent_name: 'Social Scheduler', category: 'Marketing', tasks_completed: 3120, time_saved_hours: 540, accuracy_pct: 97.8, cost_avoidance_fcfa: 27000000, status: 'idle', efficiency_trend: 'up' },
    ],
  },
};



