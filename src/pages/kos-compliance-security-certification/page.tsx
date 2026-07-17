import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useComplianceSecurityCertification } from '@/hooks/useComplianceSecurityCertification';

type Tab = 'overview' | 'kyc-lcbf' | 'cemac-alignment' | 'iso-smsi' | 'iso-risk' | 'certification' | 'kpis';

export default function KOSComplianceSecurityCertificationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const {
    loading,
    kycCddProcedures,
    lcbfRiskMapping,
    cemacAdaptation,
    bceaoCobacOhadaAlignment,
    iso27001SmsiDocs,
    iso27001RiskAssessment,
    iso27001InternalAudit,
    certificationPlan,
    complianceSecurityStats,
    quarterlyMilestones,
    totalActions,
    completedActions,
    inProgressActions,
    plannedActions,
    progressPercent,
    kycDeployed,
    kycPartial,
    alignmentConforme,
    alignmentPartiel,
    smsiAdopted,
    smsiDraft,
    smsiMissing,
    auditNcResolved,
    auditNcTotal
  } = useComplianceSecurityCertification();

  const [expandedKyc, setExpandedKyc] = useState<string | null>(null);
  const [expandedCemac, setExpandedCemac] = useState<string | null>(null);
  const [expandedSmsi, setExpandedSmsi] = useState<string | null>(null);
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState<string>('q3-2026');
  const [lcbfJurisdiction, setLcbfJurisdiction] = useState<string>('all');
  const [alignmentFilter, setAlignmentFilter] = useState<string>('all');

  const selectedQuarterData = quarterlyMilestones.quarters.find(q => q.id === selectedQuarter);

  const getStatusBadge = (s: string) => {
    if (s.includes('Déployé') || s.includes('Conforme') || s.includes('Adopt')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (s.includes('Partiel') || s.includes('En cours') || s.includes('Brouillon')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (s.includes('Planifié') || s.includes('créer')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (s.includes('Non Conforme')) return 'bg-red-50 text-red-700 border-red-200';
    if (s.includes('Corrigé')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-foreground-100 text-foreground-600 border-foreground-200';
  };

  const getSeverityBadge = (s: string) => {
    if (s === 'Critique') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'Majeure') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (s === 'Mineure') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-foreground-100 text-foreground-600';
  };

  const getRiskBadge = (level: string) => {
    if (level === 'Critique' || level === 'Élevé' || level === 'Élevée') return 'bg-red-100 text-red-700 border-red-200';
    if (level === 'Moyen' || level === 'Moyenne') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  const filteredLcbfJurisdictions = lcbfJurisdiction === 'all'
    ? lcbfRiskMapping.jurisdictions
    : lcbfRiskMapping.jurisdictions.filter(j => j.id === lcbfJurisdiction);

  const filteredAlignment = alignmentFilter === 'all'
    ? bceaoCobacOhadaAlignment
    : bceaoCobacOhadaAlignment.filter(a => a.framework === alignmentFilter);

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
    { id: 'kyc-lcbf', label: 'KYC/CDD & LCB/FT', icon: 'ri-user-search-line', count: kycCddProcedures.length },
    { id: 'cemac-alignment', label: 'CEMAC & Alignement', icon: 'ri-global-line', count: cemacAdaptation.length + bceaoCobacOhadaAlignment.length },
    { id: 'iso-smsi', label: 'ISO 27001 — SMSI', icon: 'ri-file-shield-2-line', count: iso27001SmsiDocs.length },
    { id: 'iso-risk', label: 'ISO 27001 — Risques & Audit', icon: 'ri-alert-line', count: iso27001RiskAssessment.length },
    { id: 'certification', label: 'Plan Certification', icon: 'ri-award-line', count: certificationPlan.phases.length },
    { id: 'kpis', label: 'KPIs Trimestriels', icon: 'ri-bar-chart-2-line' }
  ];

  return (
    <KOSHubLayout hubId={73}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold mb-4">
                <i className="ri-shield-flash-line"></i>Consortium PwC · Deloitte · EY · KPMG
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                KOS Compliance & Security Certification Command™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Procédures KYC/CDD & Cartographie LCB/FT · Adaptation CEMAC & Alignement BCEAO/COBAC/OHADA ·
                Documentation SMSI ISO 27001 · Risk Assessment & Audit Interne · Plan de Certification avec Preuves & Livrables.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{complianceSecurityStats.global_score}</div>
                <div className="text-xs text-foreground-500">Score Actuel /100</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-emerald-600">{complianceSecurityStats.target_score}</div>
                <div className="text-xs text-foreground-500">Cible /100</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{completedActions}/{totalActions}</div>
                <div className="text-xs text-foreground-500">Actions Complétées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Tab Bar */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.count !== undefined && (
                  <span className="text-xs opacity-60">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading && (
          <div className="text-center py-20 text-foreground-500">Chargement du diagnostic Conformité & Sécurité...</div>
        )}

        {/* ============ TAB: VUE D'ENSEMBLE ============ */}
        {!loading && activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'KYC/CDD Déployés', val: `${kycDeployed}/${kycCddProcedures.length}`, icon: 'ri-user-search-line', color: 'bg-emerald-50 text-emerald-700' },
                { label: 'Juridictions LCB/FT', val: `${lcbfRiskMapping.jurisdictions.length}`, icon: 'ri-global-line', color: 'bg-accent-50 text-accent-700' },
                { label: 'Docs SMSI Adoptés', val: `${smsiAdopted}/${iso27001SmsiDocs.length}`, icon: 'ri-file-shield-2-line', color: 'bg-blue-50 text-blue-700' },
                { label: 'NC Audit Résolues', val: `${auditNcResolved}/${auditNcTotal}`, icon: 'ri-check-double-line', color: 'bg-emerald-50 text-emerald-700' },
              ].map((s) => (
                <div key={s.label} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                    <i className={`${s.icon} text-lg`}></i>
                  </div>
                  <div className="text-2xl font-bold text-foreground-950">{s.val}</div>
                  <div className="text-xs text-foreground-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Commander's Intent */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <i className="ri-shield-flash-line text-red-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Commander's Intent — Certification Conformité & Sécurité</h3>
                  <p className="text-xs text-gray-400">Mandat du Consortium Big Four — 19 Juin 2026</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Le diagnostic Conformité & Sécurité révèle un score initial de <strong className="text-white">52/100</strong>.
                Les procédures KYC/CDD sont à 33% de déploiement effectif, la cartographie LCB/FT couvre 3 juridictions
                mais reste à un score de <strong className="text-white">62/100</strong>. L'alignement CEMAC est quasi inexistant.
                La documentation SMSI ISO 27001 est à 67% avec 2 documents critiques manquants. Le plan de certification
                se déploie sur <strong className="text-white">4 phases — 42 actions — 12 mois</strong>.
                Budget total : <strong className="text-white">226,8 M FCFA</strong>. ROI projeté : <strong className="text-white">&gt; 28×</strong>.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Score Actuel', val: '52/100', color: 'text-red-400' },
                  { label: 'Score Cible', val: '95/100', color: 'text-emerald-400' },
                  { label: 'Budget Total', val: '226,8M FCFA', color: 'text-accent-400' },
                  { label: 'ROI Projeté', val: '> 28×', color: 'text-amber-400' },
                ].map((m) => (
                  <div key={m.label} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className={`text-2xl font-bold ${m.color}`}>{m.val}</div>
                    <div className="text-[10px] text-gray-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Progression globale</span>
                  <span className="font-bold text-white">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* 4 Phases Summary */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-stack-line text-accent-500"></i>Les 4 Phases du Plan de Certification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {certificationPlan.phases.map((p) => (
                  <div key={p.id} className="bg-background-50 rounded-lg border border-background-200/70 p-5 cursor-pointer hover:border-accent-300/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-foreground-700">{p.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">→ {p.score_cible}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mb-2">{p.period}</p>
                    <p className="text-[10px] text-foreground-400">{p.deliverables.length} livrables · {p.milestones.length} jalons</p>
                    <p className="text-[10px] font-medium text-foreground-600 mt-1">{p.budget}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trajectoire */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-accent-500"></i>Trajectoire vers 95/100 — Certification Big Four
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quarterlyMilestones.quarters.map((q) => (
                  <div key={q.id} className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">{q.label}</div>
                    <div className="text-2xl font-bold text-foreground-950">{q.target_score}</div>
                    <div className="text-[10px] text-foreground-400">Score cible</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: KYC/CDD & LCB/FT ============ */}
        {!loading && activeTab === 'kyc-lcbf' && (
          <div className="space-y-8">
            {/* KYC/CDD Procedures */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-user-search-line text-emerald-500"></i>Procédures KYC/CDD — {kycCddProcedures.length} procédures
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 bg-emerald-50 rounded-lg text-center">
                  <div className="text-xl font-bold text-emerald-700">{kycDeployed}</div>
                  <div className="text-[10px] text-emerald-600">Déployées</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <div className="text-xl font-bold text-amber-700">{kycPartial}</div>
                  <div className="text-[10px] text-amber-600">Partielles</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-xl font-bold text-blue-700">{complianceSecurityStats.kyc_cdd_planned}</div>
                  <div className="text-[10px] text-blue-600">Planifiées</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <div className="text-xl font-bold text-red-700">{kycCddProcedures.filter(p => p.risk_level === 'Critique' || p.risk_level === 'Élevé').length}</div>
                  <div className="text-[10px] text-red-600">Risque Élevé/Critique</div>
                </div>
              </div>

              <div className="space-y-3">
                {kycCddProcedures.map((p) => (
                  <div key={p.id} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                    <div
                      onClick={() => setExpandedKyc(expandedKyc === p.id ? null : p.id)}
                      className="p-4 cursor-pointer hover:bg-background-100/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getStatusBadge(p.status)}`}>{p.status.split('—')[0].trim()}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getRiskBadge(p.risk_level)}`}>{p.risk_level}</span>
                          </div>
                          <h4 className="text-sm font-bold text-foreground-950">{p.procedure}</h4>
                          <p className="text-xs text-foreground-400 mt-0.5">{p.reference}</p>
                        </div>
                        <i className={`ri-${expandedKyc === p.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 mt-2`}></i>
                      </div>
                    </div>
                    {expandedKyc === p.id && (
                      <div className="px-4 pb-4 border-t border-background-200/70 pt-4 space-y-3">
                        <p className="text-xs text-foreground-600">{p.scope}</p>
                        <div>
                          <span className="text-[10px] text-foreground-400 block mb-1.5">Preuves requises</span>
                          <div className="flex flex-wrap gap-1">
                            {p.evidence_required.map((e, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{e}</span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div><span className="text-foreground-400">Deadline</span><p className="font-medium text-foreground-700">{p.deadline}</p></div>
                          <div><span className="text-foreground-400">Owner</span><p className="font-medium text-foreground-700">{p.owner}</p></div>
                          <div><span className="text-foreground-400">KPI</span><p className="font-medium text-foreground-700">{p.kpi}</p></div>
                          <div><span className="text-foreground-400">Dernier Audit</span><p className="font-medium text-foreground-700">{p.last_audit} — {p.audit_result}</p></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* LCB/FT Risk Mapping */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-map-pin-line text-amber-500"></i>Cartographie des Risques LCB/FT — Score Global {lcbfRiskMapping.global_risk_score}/100
              </h3>

              {/* Jurisdiction Filter */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <button onClick={() => setLcbfJurisdiction('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${lcbfJurisdiction === 'all' ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500'}`}>
                  Tout ({lcbfRiskMapping.jurisdictions.length})
                </button>
                {lcbfRiskMapping.jurisdictions.map((j) => (
                  <button key={j.id} onClick={() => setLcbfJurisdiction(j.id)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${lcbfJurisdiction === j.id ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500'}`}>
                    {j.name} ({j.compliance_score})
                  </button>
                ))}
              </div>

              {/* Risk Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {lcbfRiskMapping.risk_categories.map((rc) => (
                  <div key={rc.name} className="bg-background-50 rounded-lg border border-background-200/70 p-4 text-center">
                    <div className="text-xs text-foreground-500 mb-1">{rc.name}</div>
                    <div className={`text-xl font-bold ${rc.score >= 70 ? 'text-emerald-600' : rc.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{rc.score}</div>
                    <div className="text-[10px] text-foreground-400">→ {rc.target} (poids {rc.weight})</div>
                  </div>
                ))}
              </div>

              {/* Jurisdiction Cards */}
              <div className="space-y-3">
                {filteredLcbfJurisdictions.map((j) => (
                  <div key={j.id} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-foreground-950">{j.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getRiskBadge(j.risk_level)}`}>{j.risk_level}</span>
                        </div>
                        <p className="text-xs text-foreground-500">{j.regulator} · {j.countries.join(', ')}</p>
                      </div>
                      <div className={`text-2xl font-bold ${j.compliance_score >= 80 ? 'text-emerald-600' : j.compliance_score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                        {j.compliance_score}/100
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-[10px] text-foreground-400 block mb-1">Risques Clés</span>
                      <div className="space-y-1">
                        {j.key_risks.map((r, i) => (
                          <div key={i} className="text-xs text-foreground-600 flex items-start gap-2">
                            <i className="ri-error-warning-line text-red-400 mt-0.5 flex-shrink-0"></i>
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-foreground-400">
                      <span><strong className="text-foreground-600">Gaps :</strong> {j.gaps_count}</span>
                      <span><strong className="text-foreground-600">Action :</strong> {j.actions_required}</span>
                      <span><strong className="text-foreground-600">Deadline :</strong> {j.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: CEMAC & ALIGNEMENT ============ */}
        {!loading && activeTab === 'cemac-alignment' && (
          <div className="space-y-8">
            {/* CEMAC Adaptation */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-flag-line text-amber-500"></i>Adaptation Procédures CEMAC — {cemacAdaptation.length} procédures
              </h3>
              <div className="space-y-3">
                {cemacAdaptation.map((c) => (
                  <div key={c.id} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                    <div
                      onClick={() => setExpandedCemac(expandedCemac === c.id ? null : c.id)}
                      className="p-4 cursor-pointer hover:bg-background-100/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getStatusBadge(c.status)}`}>{c.status}</span>
                            <span className="text-[10px] text-foreground-400 font-mono">{c.reference}</span>
                          </div>
                          <h4 className="text-sm font-bold text-foreground-950">{c.procedure}</h4>
                          <p className="text-xs text-foreground-500 mt-0.5 line-clamp-1">{c.gap}</p>
                        </div>
                        <i className={`ri-${expandedCemac === c.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 mt-2`}></i>
                      </div>
                    </div>
                    {expandedCemac === c.id && (
                      <div className="px-4 pb-4 border-t border-background-200/70 pt-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 bg-red-50 rounded-lg">
                            <span className="text-[10px] text-red-500 block mb-1">Gap Identifié</span>
                            <p className="text-xs text-red-700">{c.gap}</p>
                          </div>
                          <div className="p-3 bg-emerald-50 rounded-lg">
                            <span className="text-[10px] text-emerald-500 block mb-1">Adaptation</span>
                            <p className="text-xs text-emerald-700">{c.adaptation}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-foreground-400 block mb-1.5">Preuves</span>
                          <div className="flex flex-wrap gap-1">
                            {c.evidence.map((e, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{e}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-foreground-400">
                          <span>Deadline : <strong className="text-foreground-600">{c.deadline}</strong></span>
                          <span>Owner : <strong className="text-foreground-600">{c.owner}</strong></span>
                          <span>Budget : <strong className="text-foreground-600">{c.budget}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BCEAO/COBAC/OHADA Alignment */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-scales-3-line text-blue-500"></i>Alignement BCEAO / COBAC / OHADA — {bceaoCobacOhadaAlignment.length} exigences
              </h3>
              <div className="flex gap-2 mb-4 flex-wrap">
                <button onClick={() => setAlignmentFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${alignmentFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500'}`}>Tous ({bceaoCobacOhadaAlignment.length})</button>
                {['BCEAO', 'COBAC', 'OHADA', 'GAFI'].map((f) => (
                  <button key={f} onClick={() => setAlignmentFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${alignmentFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500'}`}>
                    {f} ({bceaoCobacOhadaAlignment.filter(a => a.framework === f).length})
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredAlignment.map((a) => (
                  <div key={a.id} className="bg-background-50 rounded-lg border border-background-200/70 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 font-semibold">{a.framework}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getStatusBadge(a.status)}`}>{a.status}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950">{a.requirement}</h4>
                        {a.gap !== 'N/A' && <p className="text-xs text-foreground-500 mt-1 line-clamp-1">{a.gap}</p>}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-xl font-bold ${a.score >= 85 ? 'text-emerald-600' : a.score >= 65 ? 'text-amber-600' : 'text-red-600'}`}>{a.score}/100</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-[10px] text-foreground-400">
                      <span>Action : <strong className="text-foreground-600">{a.action}</strong></span>
                      <span>Deadline : <strong className="text-foreground-600">{a.deadline}</strong></span>
                      <span>Owner : <strong className="text-foreground-600">{a.owner}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: ISO 27001 — SMSI ============ */}
        {!loading && activeTab === 'iso-smsi' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <i className="ri-file-shield-2-line text-blue-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Documentation SMSI — ISO/IEC 27001:2022</h3>
                  <p className="text-xs text-gray-400">{iso27001SmsiDocs.length} documents — {smsiAdopted} adoptés · {smsiDraft} brouillons · {smsiMissing} manquants</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{smsiAdopted}</div>
                  <div className="text-[10px] text-gray-400">Adoptés</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">{smsiDraft}</div>
                  <div className="text-[10px] text-gray-400">Brouillons</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-red-400">{smsiMissing}</div>
                  <div className="text-[10px] text-gray-400">À Créer</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-blue-400">{iso27001SmsiDocs.reduce((s, d) => s + d.pages, 0)}</div>
                  <div className="text-[10px] text-gray-400">Pages Cumulées</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {iso27001SmsiDocs.map((doc) => (
                <div key={doc.id} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                  <div
                    onClick={() => setExpandedSmsi(expandedSmsi === doc.id ? null : doc.id)}
                    className="p-4 cursor-pointer hover:bg-background-100/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getStatusBadge(doc.status)}`}>{doc.status}</span>
                          <span className="text-[10px] text-foreground-400 font-mono">{doc.reference}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{doc.level}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950">{doc.document}</h4>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-400 mt-1">
                          <span>{doc.pages}p</span>
                          <span>Owner : {doc.owner}</span>
                          <span>MAJ : {doc.last_update}</span>
                        </div>
                      </div>
                      <i className={`ri-${expandedSmsi === doc.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 mt-2`}></i>
                    </div>
                  </div>
                  {expandedSmsi === doc.id && (
                    <div className="px-4 pb-4 border-t border-background-200/70 pt-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700">Référence ISO : {doc.reference} — Niveau : {doc.level}</p>
                        <p className="text-xs text-blue-600 mt-1">Responsable : {doc.owner} · Dernière mise à jour : {doc.last_update} · {doc.pages} pages</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ TAB: ISO 27001 — RISQUES & AUDIT ============ */}
        {!loading && activeTab === 'iso-risk' && (
          <div className="space-y-8">
            {/* Risk Assessment */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-alert-line text-red-500"></i>Risk Assessment ISO 27001 — {iso27001RiskAssessment.length} risques évalués
              </h3>
              <div className="space-y-3">
                {iso27001RiskAssessment.map((r) => (
                  <div key={r.id} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                    <div
                      onClick={() => setExpandedRisk(expandedRisk === r.id ? null : r.id)}
                      className="p-4 cursor-pointer hover:bg-background-100/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{r.category}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getRiskBadge(r.likelihood)}`}>Prob: {r.likelihood}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getRiskBadge(r.impact)}`}>Impact: {r.impact}</span>
                          </div>
                          <h4 className="text-sm font-bold text-foreground-950">{r.risk}</h4>
                          <div className="flex items-center gap-4 mt-1.5 text-xs">
                            <span className="text-red-600 font-bold">Inhérent: {r.inherent_risk}</span>
                            <i className="ri-arrow-right-line text-foreground-300"></i>
                            <span className={`font-bold ${r.residual_risk <= 3 ? 'text-emerald-600' : r.residual_risk <= 6 ? 'text-amber-600' : 'text-red-600'}`}>Résiduel: {r.residual_risk}</span>
                            <span className="text-[10px] text-foreground-400">{r.treatment}</span>
                          </div>
                        </div>
                        <i className={`ri-${expandedRisk === r.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 mt-2`}></i>
                      </div>
                    </div>
                    {expandedRisk === r.id && (
                      <div className="px-4 pb-4 border-t border-background-200/70 pt-4 space-y-3">
                        <div>
                          <span className="text-[10px] text-foreground-400 block mb-1.5">Contrôles en place</span>
                          <div className="flex flex-wrap gap-1">
                            {r.controls.map((c, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{c}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-foreground-400">
                          <span>Risk Owner : <strong className="text-foreground-600">{r.risk_owner}</strong></span>
                          <span>Deadline : <strong className="text-foreground-600">{r.deadline}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Audit */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-search-eye-line text-blue-500"></i>Audit Interne ISO 27001 — Score {iso27001InternalAudit.overall_score}/100
              </h3>
              <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white mb-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                    <i className="ri-search-eye-line text-accent-400 text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold">Audit Interne — {iso27001InternalAudit.audit_date}</h4>
                    <p className="text-xs text-gray-400">Auditeur : {iso27001InternalAudit.auditor} · Prochain : {iso27001InternalAudit.next_audit}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className="text-2xl font-bold text-amber-400">{iso27001InternalAudit.overall_score}</div>
                    <div className="text-[10px] text-gray-400">Score Actuel /100</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className="text-2xl font-bold text-red-400">{iso27001InternalAudit.non_conformities.critiques}</div>
                    <div className="text-[10px] text-gray-400">NC Critiques</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className="text-2xl font-bold text-amber-400">{iso27001InternalAudit.non_conformities.majeures}</div>
                    <div className="text-[10px] text-gray-400">NC Majeures</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className="text-2xl font-bold text-emerald-400">{auditNcResolved}/{auditNcTotal}</div>
                    <div className="text-[10px] text-gray-400">NC Résolues</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {iso27001InternalAudit.findings.map((f) => (
                  <div key={f.id} className="bg-background-50 rounded-lg border border-background-200/70 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono">{f.domain}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getSeverityBadge(f.severity)}`}>{f.severity}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusBadge(f.status)}`}>{f.status}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950">{f.finding}</h4>
                      </div>
                      <span className="text-xs text-foreground-400 whitespace-nowrap">Correction : {f.correction_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: PLAN DE CERTIFICATION ============ */}
        {!loading && activeTab === 'certification' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <i className="ri-award-line text-emerald-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Plan de Certification — 4 Phases · 42 Actions · 12 Mois</h3>
                  <p className="text-xs text-gray-400">Budget : {certificationPlan.budget_total} · ROI : {certificationPlan.roi_projete}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{certificationPlan.phases.length}</div>
                  <div className="text-[10px] text-gray-400">Phases</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-accent-400">{totalActions}</div>
                  <div className="text-[10px] text-gray-400">Actions</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">{certificationPlan.phases.reduce((s, p) => s + p.deliverables.length, 0)}</div>
                  <div className="text-[10px] text-gray-400">Livrables</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-teal-400">{certificationPlan.phases.reduce((s, p) => s + p.evidence.length, 0)}</div>
                  <div className="text-[10px] text-gray-400">Preuves</div>
                </div>
              </div>
            </div>

            {certificationPlan.phases.map((phase) => (
              <div key={phase.id} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                <div
                  onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                  className="p-5 cursor-pointer hover:bg-background-100/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-bold text-foreground-950">{phase.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">Score cible : {phase.score_cible}</span>
                      </div>
                      <p className="text-xs text-foreground-500">{phase.period} · {phase.budget}</p>
                      <p className="text-xs text-foreground-400 mt-1">{phase.deliverables.length} livrables · {phase.milestones.length} jalons · {phase.evidence.length} preuves</p>
                    </div>
                    <i className={`ri-${expandedPhase === phase.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 mt-2`}></i>
                  </div>
                </div>

                {expandedPhase === phase.id && (
                  <div className="px-5 pb-5 border-t border-background-200/70 pt-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-foreground-700 mb-2">Livrables</h4>
                      <ul className="space-y-1.5">
                        {phase.deliverables.map((d, i) => (
                          <li key={i} className="text-sm text-foreground-600 flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5 flex-shrink-0 text-xs"></i>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground-700 mb-2">Preuves</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.evidence.map((e, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">{e}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground-700 mb-2">Jalons</h4>
                      <ul className="space-y-1">
                        {phase.milestones.map((m, i) => (
                          <li key={i} className="text-xs text-foreground-500 flex items-start gap-2">
                            <i className="ri-flag-line text-accent-400 mt-0.5 flex-shrink-0"></i>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ============ TAB: KPIs TRIMESTRIELS ============ */}
        {!loading && activeTab === 'kpis' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {quarterlyMilestones.quarters.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuarter(q.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    selectedQuarter === q.id
                      ? 'bg-foreground-950 text-background-50'
                      : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}
                >
                  {q.label} — Score cible {q.target_score}/100
                </button>
              ))}
            </div>

            {selectedQuarterData && (
              <>
                <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                      <i className="ri-focus-3-line text-accent-400 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">{selectedQuarterData.label}</h3>
                      <p className="text-xs text-gray-400">{selectedQuarterData.months} · Budget : {selectedQuarterData.budget} · Score cible : {selectedQuarterData.target_score}/100</p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-gray-300 mb-3">Jalons Clés</h4>
                    <ul className="space-y-2">
                      {selectedQuarterData.milestones.map((m, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <i className="ri-checkbox-circle-line text-emerald-400 mt-0.5 flex-shrink-0"></i>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-300 mb-3">KPIs Cibles</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedQuarterData.kpis.map((kpi, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/8 rounded-lg border border-white/10">
                          <div>
                            <span className="text-xs text-gray-300">{kpi.name}</span>
                            <span className="text-[10px] text-gray-500 ml-2">(Poids {kpi.weight})</span>
                          </div>
                          <span className="text-xs font-bold text-white">{kpi.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Summary Trajectory Table */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 overflow-x-auto">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-accent-500"></i>Trajectoire Consolidée — 7 KPIs Certification
              </h3>
              <table className="w-full text-sm">
                <thead className="bg-background-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">KPI</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Initial</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Q3 2026</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Q4 2026</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Q1 2027</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Q2 2027</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-foreground-500">Cible</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyMilestones.summary_trajectory.map((kpi) => (
                    <tr key={kpi.kpi} className="border-t border-background-100">
                      <td className="px-4 py-3 text-xs font-bold text-foreground-950">{kpi.kpi}</td>
                      <td className="px-3 py-3 text-center">
                        <span className="text-xs font-bold text-red-600">{kpi.initial}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`text-xs font-bold ${kpi.q3 >= kpi.cible ? 'text-emerald-600' : kpi.q3 >= 70 ? 'text-amber-600' : 'text-foreground-600'}`}>{kpi.q3}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`text-xs font-bold ${kpi.q4 >= kpi.cible ? 'text-emerald-600' : kpi.q4 >= 80 ? 'text-amber-600' : 'text-foreground-600'}`}>{kpi.q4}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`text-xs font-bold ${kpi.q1 >= kpi.cible ? 'text-emerald-600' : kpi.q1 >= 90 ? 'text-amber-600' : 'text-foreground-600'}`}>{kpi.q1}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`text-xs font-bold ${kpi.q2 >= kpi.cible ? 'text-emerald-600' : 'text-foreground-600'}`}>{kpi.q2}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{kpi.cible}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Footer Cross-Links */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Écosystème Conformité & Sécurité KOS</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Security Command', path: '/kos-security-command', icon: 'ri-shield-flash-line', color: '#DC2626' },
              { label: 'Governance Formalization', path: '/kos-governance-formalization', icon: 'ri-government-line', color: '#9B7B2C' },
              { label: 'Regulatory Automates', path: '/kos-regulatory-compliance-automates', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'AI Governance', path: '/kos-ai-governance-ethics', icon: 'ri-scales-line', color: '#8B3040' },
              { label: 'Risk & Diligence', path: '/kos-risk-diligence-command', icon: 'ri-alert-line', color: '#DC2626' },
              { label: 'Enterprise Governance', path: '/kos-enterprise-governance-command', icon: 'ri-building-2-line', color: '#9B7B2C' },
            ].map((link) => (
              <a key={link.path} href={link.path} className="rounded-xl border border-background-200/70 bg-background-50 p-3 text-center hover:shadow-md transition-all cursor-pointer block">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }}></i>
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}