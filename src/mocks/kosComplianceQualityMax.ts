// ============================================================
// KOS COMPLIANCE & QUALITY MAX™ — Cockpit Unifié
// 48 automates : 24 Réglementaires + 24 Qualité Totale
// Données agrégées des deux systèmes KOS
// Version 2026.06.18 — LIVE
// ============================================================

export interface ComplianceQualityUnifiedAutomate {
  id: string;
  name: string;
  system: 'regulatory' | 'quality';
  category: string;
  category_name: string;
  tech_stack: string[];
  status: 'deployed' | 'partial' | 'mock';
  version: string;
  description: string;
  capabilities: string[];
  success_rate: number;
  tasks_completed: number;
  auto_enabled: boolean;
  icon: string;
  color: string;
  last_execution: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  kpis: { label: string; current: string; target: string; icon: string }[];
  // Qualité-specific
  audits_completed?: number;
  non_conformities_detected?: number;
  quality_score?: number;
  certifications_maintained?: number;
  processes_managed?: number;
}

export interface ComplianceQualityCategoryOverview {
  id: string;
  name: string;
  icon: string;
  color: string;
  system: 'regulatory' | 'quality';
  description: string;
  agents_count: number;
  deployed: number;
  partial: number;
  critical: number;
  avg_success_rate: number;
}

export interface ComplianceQualityMaxKPIs {
  // Global
  total_automates: number;
  total_deployed: number;
  total_partial: number;
  total_critical: number;
  total_high: number;
  total_auto: number;

  // Par système
  regulatory_total: number;
  regulatory_deployed: number;
  regulatory_partial: number;
  regulatory_tasks: number;
  regulatory_success_rate: number;

  quality_total: number;
  quality_deployed: number;
  quality_partial: number;
  quality_tasks: number;
  quality_success_rate: number;

  // Qualité spécifique
  total_audits: number;
  total_non_conformities: number;
  overall_quality_score: number;
  total_certifications: number;
  total_processes_managed: number;

  // Conformité spécifique
  jurisdictions_covered: number;
  obligations_tracked: number;
  reports_generated: number;

  // Score global
  global_compliance_index: number;
}

export function computeComplianceQualityMaxKPIs(automates: ComplianceQualityUnifiedAutomate[]): ComplianceQualityMaxKPIs {
  const reg = automates.filter(a => a.system === 'regulatory');
  const qual = automates.filter(a => a.system === 'quality');

  const regDeployed = reg.filter(a => a.status === 'deployed').length;
  const qualDeployed = qual.filter(a => a.status === 'deployed').length;

  const regSuccessRate = reg.length > 0 ? Math.round(reg.reduce((s, a) => s + a.success_rate, 0) / reg.length * 10) / 10 : 0;
  const qualSuccessRate = qual.length > 0 ? Math.round(qual.reduce((s, a) => s + a.success_rate, 0) / qual.length * 10) / 10 : 0;

  const totalAudits = qual.reduce((s, a) => s + (a.audits_completed || 0), 0);
  const totalNC = qual.reduce((s, a) => s + (a.non_conformities_detected || 0), 0);
  const overallScore = qual.length > 0 ? Math.round(qual.reduce((s, a) => s + (a.quality_score || 0), 0) / qual.length * 10) / 10 : 0;

  const globalIndex = Math.round((regSuccessRate * 0.4 + qualSuccessRate * 0.3 + (overallScore || 85) * 0.3));

  return {
    total_automates: automates.length,
    total_deployed: regDeployed + qualDeployed,
    total_partial: automates.filter(a => a.status === 'partial').length,
    total_critical: automates.filter(a => a.priority === 'critical').length,
    total_high: automates.filter(a => a.priority === 'high').length,
    total_auto: automates.filter(a => a.auto_enabled).length,

    regulatory_total: reg.length,
    regulatory_deployed: regDeployed,
    regulatory_partial: reg.filter(a => a.status === 'partial').length,
    regulatory_tasks: reg.reduce((s, a) => s + a.tasks_completed, 0),
    regulatory_success_rate: regSuccessRate,

    quality_total: qual.length,
    quality_deployed: qualDeployed,
    quality_partial: qual.filter(a => a.status === 'partial').length,
    quality_tasks: qual.reduce((s, a) => s + a.tasks_completed, 0),
    quality_success_rate: qualSuccessRate,

    total_audits: totalAudits,
    total_non_conformities: totalNC,
    overall_quality_score: overallScore,
    total_certifications: qual.reduce((s, a) => s + (a.certifications_maintained || 0), 0),
    total_processes_managed: qual.reduce((s, a) => s + (a.processes_managed || 0), 0),

    jurisdictions_covered: 14,
    obligations_tracked: reg.filter(a => a.category === 'compliance-documentaire').reduce((s, a) => s + a.tasks_completed, 0),
    reports_generated: reg.filter(a => a.category === 'reporting-reglementaire' || a.category === 'audit-inspection').reduce((s, a) => s + a.tasks_completed, 0),

    global_compliance_index: globalIndex,
  };
}

export function computeCategoryOverviews(automates: ComplianceQualityUnifiedAutomate[]): ComplianceQualityCategoryOverview[] {
  const categoryMap = new Map<string, ComplianceQualityUnifiedAutomate[]>();
  automates.forEach(a => {
    const key = `${a.system}:${a.category}`;
    if (!categoryMap.has(key)) categoryMap.set(key, []);
    categoryMap.get(key)!.push(a);
  });

  return Array.from(categoryMap.entries()).map(([key, agents]) => {
    const [system, catId] = key.split(':');
    const first = agents[0];
    const catNames: Record<string, string> = {
      'veille-reglementaire': 'Veille Réglementaire',
      'impact-analysis': "Analyse d'Impact",
      'compliance-documentaire': 'Conformité Documentaire',
      'audit-inspection': 'Audit & Inspection',
      'reporting-reglementaire': 'Reporting Réglementaire',
      'risque-conformite': 'Risques Conformité',
      'formation-conformite': 'Formation Conformité',
      'juridique-contentieux': 'Architecture Juridique',
      'organisation-processus': 'Organisation & Processus',
      'revue-qualite-totale-tqm': 'TQM',
      'audit-qualite-interne': 'Audit Qualité Interne',
      'controle-qualite-livrables': 'Contrôle Livrables',
      'amelioration-continue': 'Amélioration Continue',
      'gestion-documentaire-tracabilite': 'Traçabilité Documentaire',
      'metriques-qualite-dashboards': 'Métriques Qualité',
      'certification-accreditation': 'Certification & Accréditation',
    };

    const regIcons: Record<string, string> = {
      'veille-reglementaire': 'ri-radar-line',
      'impact-analysis': 'ri-scales-3-line',
      'compliance-documentaire': 'ri-file-shield-2-line',
      'audit-inspection': 'ri-search-eye-line',
      'reporting-reglementaire': 'ri-file-chart-line',
      'risque-conformite': 'ri-alert-line',
      'formation-conformite': 'ri-graduation-cap-line',
      'juridique-contentieux': 'ri-scales-line',
    };

    const qualIcons: Record<string, string> = {
      'organisation-processus': 'ri-organization-chart',
      'revue-qualite-totale-tqm': 'ri-shield-check-line',
      'audit-qualite-interne': 'ri-search-eye-line',
      'controle-qualite-livrables': 'ri-file-check-line',
      'amelioration-continue': 'ri-arrow-up-circle-line',
      'gestion-documentaire-tracabilite': 'ri-folder-history-line',
      'metriques-qualite-dashboards': 'ri-dashboard-3-line',
      'certification-accreditation': 'ri-award-line',
    };

    return {
      id: `${system}-${catId}`,
      name: catNames[catId] || catId,
      icon: system === 'regulatory' ? (regIcons[catId] || 'ri-shield-check-line') : (qualIcons[catId] || 'ri-medal-line'),
      color: first.color,
      system: system as 'regulatory' | 'quality',
      description: system === 'regulatory'
        ? 'Conformité réglementaire BCEAO · COBAC · OHADA · GAFI'
        : 'Excellence opérationnelle & qualité totale ISO',
      agents_count: agents.length,
      deployed: agents.filter(a => a.status === 'deployed').length,
      partial: agents.filter(a => a.status === 'partial').length,
      critical: agents.filter(a => a.priority === 'critical').length,
      avg_success_rate: Math.round(agents.reduce((s, a) => s + a.success_rate, 0) / agents.length * 10) / 10,
    };
  });
}

// Mock KPIs pour fallback
export const COMPLIANCE_QUALITY_MAX_MOCK_KPIS: ComplianceQualityMaxKPIs = {
  total_automates: 48,
  total_deployed: 36,
  total_partial: 12,
  total_critical: 17,
  total_high: 24,
  total_auto: 36,

  regulatory_total: 24,
  regulatory_deployed: 20,
  regulatory_partial: 4,
  regulatory_tasks: 98420,
  regulatory_success_rate: 89.2,

  quality_total: 24,
  quality_deployed: 16,
  quality_partial: 8,
  quality_tasks: 157890,
  quality_success_rate: 89.8,

  total_audits: 40942,
  total_non_conformities: 15880,
  overall_quality_score: 93.2,
  total_certifications: 9,
  total_processes_managed: 25366,

  jurisdictions_covered: 14,
  obligations_tracked: 6120,
  reports_generated: 14570,

  global_compliance_index: 91,
};





