// KOS Enterprise Control Tower & Automation Factory™
// Centre de commandement ultime — Surveillance temps réel 12 KPI critiques

export interface ControlTowerKPI {
  id: string;
  category: 'Finances' | 'Opérations' | 'Qualité' | 'Pipeline' | 'Ressources Humaines' | 'Sécurité' | 'Satisfaction' | 'Croissance';
  name: string;
  value: number;
  unit: string;
  status: 'ok' | 'warning' | 'critical';
  warningThreshold: number;
  criticalThreshold: number;
  direction: 'higher_better' | 'lower_better';
  alerts: number;
  lastScan: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
}

export const CONTROL_TOWER_KPIS: ControlTowerKPI[] = [
  {
    id: 'ca-mensuel',
    category: 'Finances',
    name: 'Chiffre d\'Affaires Mensuel',
    value: 780000000,
    unit: 'FCFA',
    status: 'ok',
    warningThreshold: 700000000,
    criticalThreshold: 550000000,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 4.2,
  },
  {
    id: 'marge-operationnelle',
    category: 'Finances',
    name: 'Marge Opérationnelle',
    value: 38.5,
    unit: '%',
    status: 'ok',
    warningThreshold: 30,
    criticalThreshold: 20,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 1.8,
  },
  {
    id: 'taux-utilisation',
    category: 'Opérations',
    name: 'Taux d\'Utilisation Consultants',
    value: 72,
    unit: '%',
    status: 'warning',
    warningThreshold: 75,
    criticalThreshold: 60,
    direction: 'higher_better',
    alerts: 3,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'down',
    trendPercent: -3.5,
  },
  {
    id: 'score-qualite',
    category: 'Qualité',
    name: 'Score Qualité Livrables (Big Four Framework)',
    value: 9.4,
    unit: '/10',
    status: 'ok',
    warningThreshold: 8.0,
    criticalThreshold: 6.5,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 0.3,
  },
  {
    id: 'taux-conversion',
    category: 'Pipeline',
    name: 'Taux de Conversion Propositions',
    value: 48,
    unit: '%',
    status: 'ok',
    warningThreshold: 40,
    criticalThreshold: 30,
    direction: 'higher_better',
    alerts: 1,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 2.1,
  },
  {
    id: 'delai-livraison',
    category: 'Opérations',
    name: 'Délai Moyen de Livraison',
    value: 34,
    unit: 'jours',
    status: 'warning',
    warningThreshold: 30,
    criticalThreshold: 45,
    direction: 'lower_better',
    alerts: 2,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 5.3,
  },
  {
    id: 'retention-talents',
    category: 'Ressources Humaines',
    name: 'Taux de Rétention Talents Clés',
    value: 91,
    unit: '%',
    status: 'ok',
    warningThreshold: 85,
    criticalThreshold: 75,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'stable',
    trendPercent: 0,
  },
  {
    id: 'score-cyber',
    category: 'Sécurité',
    name: 'Score Cyber Sécurité KOS',
    value: 94,
    unit: '/100',
    status: 'ok',
    warningThreshold: 85,
    criticalThreshold: 70,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 1.5,
  },
  {
    id: 'nps-client',
    category: 'Satisfaction',
    name: 'NPS Client Global',
    value: 82,
    unit: '/100',
    status: 'ok',
    warningThreshold: 60,
    criticalThreshold: 40,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 3.0,
  },
  {
    id: 'tresorerie',
    category: 'Finances',
    name: 'Trésorerie (jours de runway)',
    value: 185,
    unit: 'jours',
    status: 'ok',
    warningThreshold: 90,
    criticalThreshold: 45,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 8.2,
  },
  {
    id: 'croissance-pipeline',
    category: 'Croissance',
    name: 'Croissance Pipeline QoQ',
    value: 18,
    unit: '%',
    status: 'ok',
    warningThreshold: 10,
    criticalThreshold: 0,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 18,
  },
  {
    id: 'taux-automatisation',
    category: 'Opérations',
    name: 'Taux d\'Automatisation KOS',
    value: 87,
    unit: '%',
    status: 'ok',
    warningThreshold: 75,
    criticalThreshold: 60,
    direction: 'higher_better',
    alerts: 0,
    lastScan: '2026-06-13T08:00:00Z',
    trend: 'up',
    trendPercent: 4.7,
  },
];

export interface AutomationFactoryDomain {
  id: string;
  name: string;
  icon: string;
  color: string;
  automates: number;
  description: string;
}

export const AUTOMATION_FACTORY_DOMAINS: AutomationFactoryDomain[] = [
  {
    id: 'control-tower',
    name: 'Control Tower',
    icon: 'ri-radar-line',
    color: '#4F46E5',
    automates: 2,
    description: 'Surveillance temps réel, alertes, dashboard exécutif',
  },
  {
    id: 'optimisation-automatisation',
    name: 'Optimisation Automatisation',
    icon: 'ri-settings-3-line',
    color: '#0D7B5F',
    automates: 4,
    description: 'Optimisation workflows, RPA, correction automatique',
  },
  {
    id: 'allocation-ressources',
    name: 'Allocation Ressources',
    icon: 'ri-user-settings-line',
    color: '#86BC25',
    automates: 2,
    description: 'Assignation intelligente, load balancing équipes',
  },
  {
    id: 'planification-capacite',
    name: 'Planification Capacité',
    icon: 'ri-bar-chart-grouped-line',
    color: '#E8943A',
    automates: 2,
    description: 'Prévision charge, dimensionnement équipes',
  },
  {
    id: 'moteur-previsions',
    name: 'Moteur de Prévisions',
    icon: 'ri-line-chart-line',
    color: '#C2410C',
    automates: 3,
    description: 'Forecasting financier, projections pipeline, ML prédictif',
  },
  {
    id: 'simulateur-scenarios',
    name: 'Simulateur Scénarios',
    icon: 'ri-git-branch-line',
    color: '#8B3040',
    automates: 1,
    description: 'Simulation Monte Carlo, stress tests, what-if analysis',
  },
];

export interface ControlTowerSummary {
  totalMetrics: number;
  metricsOk: number;
  metricsWarning: number;
  metricsCritical: number;
  totalAlerts: number;
  efficiencyAvg: number;
  efficiencyGainPotential: number;
  overloadedTeams: number;
  totalTeams: number;
  occupationRate: number;
  forecastConfidence: number;
  totalForecasts: number;
  activeScenarios: number;
  totalScenarios: number;
  probableScenarios: number;
}

export const CONTROL_TOWER_SUMMARY: ControlTowerSummary = {
  totalMetrics: 12,
  metricsOk: 10,
  metricsWarning: 2,
  metricsCritical: 0,
  totalAlerts: 6,
  efficiencyAvg: 70,
  efficiencyGainPotential: 173,
  overloadedTeams: 2,
  totalTeams: 8,
  occupationRate: 81,
  forecastConfidence: 81,
  totalForecasts: 8,
  activeScenarios: 1,
  totalScenarios: 8,
  probableScenarios: 4,
};

export interface ControlTowerAlert {
  id: string;
  kpiId: string;
  severity: 'warning' | 'critical';
  message: string;
  detectedAt: string;
}

export const CONTROL_TOWER_ALERTS: ControlTowerAlert[] = [
  {
    id: 'alert-1',
    kpiId: 'taux-utilisation',
    severity: 'warning',
    message: 'Taux d\'utilisation consultants à 72% — sous le seuil de 75%. 3 consultants en sous-charge.',
    detectedAt: '2026-06-12T14:30:00Z',
  },
  {
    id: 'alert-2',
    kpiId: 'taux-utilisation',
    severity: 'warning',
    message: 'Équipe Audit Bancaire : 2 consultants disponibles, 0 mission assignée cette semaine.',
    detectedAt: '2026-06-11T09:15:00Z',
  },
  {
    id: 'alert-3',
    kpiId: 'taux-utilisation',
    severity: 'warning',
    message: 'Pipeline projets Q3 insuffisant pour maintenir taux > 75%. Besoin de +3 mandats.',
    detectedAt: '2026-06-10T16:45:00Z',
  },
  {
    id: 'alert-4',
    kpiId: 'delai-livraison',
    severity: 'warning',
    message: 'Délai moyen livraison 34 jours — au-dessus du seuil de 30 jours. Goulot : relecture qualité.',
    detectedAt: '2026-06-13T08:00:00Z',
  },
  {
    id: 'alert-5',
    kpiId: 'delai-livraison',
    severity: 'warning',
    message: 'Mission Due Diligence Groupe Ecobank : +8 jours retard. Action corrective requise.',
    detectedAt: '2026-06-12T11:20:00Z',
  },
  {
    id: 'alert-6',
    kpiId: 'taux-conversion',
    severity: 'warning',
    message: 'Proposition #KHEPRA-2026-089 non relancée depuis 12 jours. Risque de perte.',
    detectedAt: '2026-06-11T07:30:00Z',
  },
];





