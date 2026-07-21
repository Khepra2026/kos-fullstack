import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSSeniorComplianceAuditor } from '@/hooks/useKOSSeniorComplianceAuditor';
import type { ComplianceAudit } from '@/mocks/seniorComplianceAuditor';

type OutputTab = 'summary' | 'gaps' | 'findings' | 'references' | 'remediation' | 'readiness';

const SEVERITY_STYLES: Record<string, string> = {
  Critique: 'bg-red-50 text-red-700 border-red-200',
  Élevé: 'bg-amber-50 text-amber-700 border-amber-200',
  Modéré: 'bg-sky-50 text-sky-700 border-sky-200',
  Faible: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const CONFORMITY_STYLES: Record<string, { bg: string; text: string; icon: string; label: string }> = {
  conforme: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', icon: 'ri-check-double-line', label: 'Conforme' },
  partiellement_conforme: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: 'ri-error-warning-line', label: 'Partiellement Conforme' },
  non_conforme: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', icon: 'ri-close-circle-line', label: 'Non Conforme' },
  non_applicable: { bg: 'bg-background-100 border-background-200', text: 'text-foreground-500', icon: 'ri-subtract-line', label: 'N/A' },
};

const PRIORITY_STYLES: Record<string, string> = {
  P0: 'bg-red-500 text-white',
  P1: 'bg-amber-500 text-white',
  P2: 'bg-sky-500 text-white',
  P3: 'bg-emerald-500 text-white',
};

export default function seniorComplianceAuditorPage() {
  const {
    institutions,
    agents,
    kpis,
    selectedAudit,
    processing,
    error,
    selectInstitution,
  } = useKOSSeniorComplianceAuditor();

  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>('summary');
  const [selectedInstId, setSelectedInstId] = useState<string>('');

  const handleSelect = (id: string) => {
    setSelectedInstId(id);
    selectInstitution(id);
    setActiveOutputTab('summary');
  };

  const outputTabs: { id: OutputTab; label: string; icon: string; count?: string }[] = [
    { id: 'summary', label: '1. Résumé Exécutif', icon: 'ri-file-warning-line' },
    { id: 'gaps', label: '2. Gap Analysis', icon: 'ri-contrast-2-line', count: selectedAudit ? String(selectedAudit.gap_analysis.length) : undefined },
    { id: 'findings', label: '3. Constats', icon: 'ri-alert-line', count: selectedAudit ? String(selectedAudit.findings.length) : undefined },
    { id: 'references', label: '4. Références', icon: 'ri-scales-3-line', count: selectedAudit ? String(selectedAudit.regulatory_references.length) : undefined },
    { id: 'remediation', label: '5. Remédiation', icon: 'ri-tools-line', count: selectedAudit ? String(selectedAudit.remediation_plan.length) : undefined },
    { id: 'readiness', label: '6. Score Inspection', icon: 'ri-survey-line' },
  ];

  const agentStats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.statut === 'active').length,
  }), [agents]);

  const getScoreColor = (score: number): string => {
    if (score >= 70) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number): string => {
    if (score >= 70) return 'bg-emerald-100';
    if (score >= 50) return 'bg-amber-100';
    return 'bg-red-100';
  };

  const getScoreBarColor = (score: number): string => {
    if (score >= 70) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getSeverityIcon = (sev: string): string => {
    if (sev === 'Critique') return 'ri-close-circle-fill text-red-600';
    if (sev === 'Élevé') return 'ri-error-warning-fill text-amber-600';
    if (sev === 'Modéré') return 'ri-information-fill text-sky-600';
    return 'ri-checkbox-circle-fill text-emerald-600';
  };

  const criticalCount = useMemo(() =>
    selectedAudit?.findings.filter(f => f.severite === 'Critique').length ?? 0,
    [selectedAudit]
  );

  return (
    <hubLayout hubId={111}>
      <SeoHead
        title="KOS Senior Compliance Auditor™ — Audit Conformité COBAC CEMAC | KHEPRA EXPERTS"
        description="Analyse de conformité approfondie COBAC pour institutions financières CEMAC. Résumé exécutif, gap analysis, classification sévérité, références réglementaires, plan de remédiation, score inspection readiness. Big Four grade."
        keywords="audit conformité COBAC, CEMAC compliance, inspection COBAC, gap analysis réglementaire, score inspection readiness, Big Four compliance auditor, KHEPRA EXPERTS"
        canonicalPath="/kos-senior-compliance-auditor"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20institutional%20compliance%20audit%20aesthetic%20with%20deep%20burgundy%20and%20warm%20bronze%20tones%2C%20structured%20regulatory%20frameworks%20flowing%20into%20organized%20audit%20findings%2C%20geometric%20audit%20trail%20patterns%20with%20institutional%20gravitas%2C%20boardroom%20atmosphere%20with%20elegant%20data%20visualization%2C%20no%20text%20no%20human%20figures%2C%20Big%20Four%20consulting%20grade%20visual%20identity%20with%20burgundy%20bronze%20gold%20gradients%2C%20serious%20authoritative%20tone&width=1920&height=520&seq=kos-ca-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-15"
            width={1920}
            height={520}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/65 via-foreground-950/82 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                <i className="ri-shield-check-line text-red-400 text-sm" />
                <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">Senior Compliance Auditor™ — Big Four Grade</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">{agentStats.active}/{agentStats.total} Auditeurs Actifs</span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Audit de Conformité COBAC — CEMAC.
              <span className="block text-red-400 mt-2">Deep Compliance Analysis — Big Four Standards</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Analyse de conformité approfondie pour institutions financières CEMAC : <strong className="text-white">6 livrables d'audit</strong> — résumé exécutif, gap analysis, classification de sévérité, mapping réglementaire, plan de remédiation, score inspection readiness.
              <strong className="text-red-400"> {kpis.audits_realises} audits</strong> complétés,
              <strong className="text-amber-400"> {kpis.constats_critiques} constats critiques</strong> identifiés.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Banner */}
      <section className="py-3 bg-red-50 border-b border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            {agents.map(agent => (
              <div key={agent.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-red-200 whitespace-nowrap flex-shrink-0">
                <i className={`${agent.icon} text-red-600 text-sm`} />
                <span className="text-xs font-bold text-foreground-800">{agent.nom}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" title="Actif" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institution Selector */}
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Sélectionnez l'établissement à auditer</h2>
            <p className="text-sm text-foreground-500">4 institutions CEMAC prêtes pour l'analyse approfondie de conformité COBAC</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {institutions.map(inst => (
              <button
                key={inst.id}
                onClick={() => handleSelect(inst.id)}
                disabled={processing}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${selectedInstId === inst.id && selectedAudit ? 'border-red-300 bg-red-50/60 ring-2 ring-red-200' : 'border-background-200 bg-white hover:border-red-200 hover:bg-red-50/30'} ${processing ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getScoreBg(inst.score_conformite_actuel)}`}>
                    <span className={`text-sm font-black ${getScoreColor(inst.score_conformite_actuel)}`}>{inst.score_conformite_actuel}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 whitespace-nowrap">
                        {inst.type === 'banque' ? 'Banque' : inst.type === 'emf' ? 'EMF' : 'FinTech'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{inst.zone}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 whitespace-nowrap">{inst.actif_total_milliards_fcfa} Md FCFA</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{inst.nom}</h3>
                    <p className="text-[11px] text-foreground-500 line-clamp-2">{inst.description}</p>
                  </div>
                  {processing && selectedInstId === inst.id ? (
                    <div className="w-6 h-6 border-2 border-red-300 border-t-red-600 rounded-full animate-spin flex-shrink-0 mt-2" />
                  ) : (
                    <i className="ri-arrow-right-line text-foreground-400 text-lg flex-shrink-0 mt-2" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <i className="ri-error-warning-line text-red-600 text-lg flex-shrink-0 mt-0.5" />
              <span className="text-sm font-bold text-red-700">{error}</span>
            </div>
          )}
        </div>
      </section>

      {/* Processing Indicator */}
      {processing && (
        <section className="py-8 bg-red-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-foreground-800">KOS Senior Compliance Auditor™ — Audit en cours...</p>
            <p className="text-xs text-foreground-500 mt-1">Analyse COBAC, gap analysis, classification sévérité, mapping réglementaire, plan de remédiation, scoring inspection readiness</p>
          </div>
        </section>
      )}

      {/* Output Section */}
      {selectedAudit && !processing && (
        <>
          {/* Output Tabs */}
          <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-1 overflow-x-auto py-3">
                {outputTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveOutputTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${activeOutputTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'}`}
                  >
                    <i className={`${tab.icon} text-base`} />
                    {tab.label}
                    {tab.count && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeOutputTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Metadata Bar */}
          <section className="py-4 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-foreground-600">
                  <i className="ri-user-star-line text-red-600" />
                  <span className="font-bold">{selectedAudit.metadata.auditeur}</span>
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-calendar-check-line" />
                  Audit du {new Date(selectedAudit.metadata.date_audit).toLocaleDateString('fr-FR')}
                </span>
                <span className="flex items-center gap-1.5 text-foreground-500">
                  <i className="ri-timer-line" />
                  Mission {selectedAudit.metadata.duree_mission_jours} jours
                </span>
                <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                  <i className="ri-calendar-event-line" />
                  Prochaine inspection : {selectedAudit.metadata.prochaine_inspection_estimee}
                </span>
              </div>
            </div>
          </section>

          {/* ═══════════ 1. EXECUTIVE RISK SUMMARY ═══════════ */}
          {activeOutputTab === 'summary' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <i className="ri-file-warning-line text-red-700 text-2xl" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-foreground-950">{selectedAudit.institution.nom}</h2>
                      <div className="flex items-center gap-2 mt-1 text-xs text-foreground-400">
                        <span className="font-bold text-red-700">{selectedAudit.institution.type === 'banque' ? 'Banque' : selectedAudit.institution.type === 'emf' ? 'EMF' : 'FinTech'}</span>
                        <span>·</span>
                        <span>{selectedAudit.institution.zone}</span>
                        <span>·</span>
                        <span>{selectedAudit.institution.actif_total_milliards_fcfa} Md FCFA</span>
                        <span>·</span>
                        <span>Score actuel : <strong className={getScoreColor(selectedAudit.institution.score_conformite_actuel)}>{selectedAudit.institution.score_conformite_actuel}/100</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-2">Note Globale de l'Auditeur</span>
                    <p className="text-sm text-red-800 leading-relaxed">{selectedAudit.executive_summary.note_globale}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Constatations Clés ({selectedAudit.executive_summary.constats_cles.length})</h3>
                    <ul className="space-y-2">
                      {selectedAudit.executive_summary.constats_cles.map((c, i) => (
                        <li key={i} className="text-xs text-foreground-700 flex items-start gap-2 p-2.5 rounded-lg bg-background-50 border border-background-100">
                          <i className="ri-arrow-right-s-line text-red-600 mt-0.5 flex-shrink-0" />{c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Top 3 Risques</h3>
                    <div className="space-y-3">
                      {selectedAudit.executive_summary.top_3_risques.map((r, i) => (
                        <div key={i} className="p-4 rounded-xl border border-background-200 bg-background-50">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">#{i + 1}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-sm font-bold text-foreground-950">{r.risque}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${SEVERITY_STYLES[r.criticite]}`}>{r.criticite}</span>
                              </div>
                              <p className="text-xs text-red-700 mt-1 font-bold">Exposition : {r.exposition}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">Recommandation Globale</span>
                    <p className="text-sm text-emerald-800 leading-relaxed">{selectedAudit.executive_summary.recommandation_globale}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 2. GAP ANALYSIS ═══════════ */}
          {activeOutputTab === 'gaps' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{selectedAudit.gap_analysis.length} Écarts Identifiés</h2>
                  <p className="text-sm text-foreground-500">Analyse État Actuel vs État Requis — avec preuves d'absence documentées</p>
                </div>
                <div className="space-y-4">
                  {selectedAudit.gap_analysis.map(gap => (
                    <div key={gap.id} className="rounded-2xl bg-white border border-background-200 p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                          <i className="ri-contrast-2-line text-red-700 text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{gap.id}</span>
                            <span className="text-sm font-bold text-foreground-950">{gap.domaine}</span>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-1">État Actuel</span>
                              <span className="text-xs text-foreground-700">{gap.etat_actuel}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">État Requis</span>
                              <span className="text-xs text-foreground-700">{gap.etat_requis}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                              <span className="text-[10px] font-bold text-amber-600 block mb-0.5">Écart</span>
                              <span className="text-xs text-amber-800">{gap.ecart}</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                              <span className="text-[10px] font-bold text-foreground-400 block mb-0.5">Impact</span>
                              <span className="text-xs text-foreground-700 font-bold">{gap.impact}</span>
                            </div>
                          </div>
                          <div className="mt-3 p-2.5 rounded-lg bg-background-50 border border-background-100 flex items-start gap-2">
                            <i className="ri-search-line text-foreground-400 text-xs mt-0.5 flex-shrink-0" />
                            <span className="text-[11px] text-foreground-500 italic">Preuve d'absence : {gap.preuve_absence}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 3. FINDINGS — SEVERITY CLASSIFICATION ═══════════ */}
          {activeOutputTab === 'findings' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{selectedAudit.findings.length} Constats d'Audit</h2>
                    <p className="text-sm text-foreground-500">Classification COBAC par sévérité — {criticalCount} critiques identifiés</p>
                  </div>
                  <div className="flex gap-2">
                    {(['Critique', 'Élevé', 'Modéré', 'Faible'] as const).map(sev => {
                      const count = selectedAudit.findings.filter(f => f.severite === sev).length;
                      if (count === 0) return null;
                      return (
                        <span key={sev} className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${SEVERITY_STYLES[sev]}`}>
                          {sev} ({count})
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-4">
                  {selectedAudit.findings.map(finding => (
                    <div key={finding.id} className="rounded-2xl bg-white border border-background-200 p-5">
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5">
                          <i className={`${getSeverityIcon(finding.severite)} text-xl`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{finding.id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${SEVERITY_STYLES[finding.severite]}`}>
                              {finding.severite.toUpperCase()}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground-100 text-foreground-600 border border-foreground-200 font-mono">{finding.reference_reglementaire}</span>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 mb-2">{finding.constat}</h3>
                          <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{finding.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded-lg bg-background-50 border border-background-100">
                              <span className="text-[10px] font-bold text-foreground-400 uppercase block mb-0.5">Articles Violés</span>
                              <span className="text-foreground-700 font-mono text-[10px]">{finding.articles_violes.join(', ')}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-background-50 border border-background-100">
                              <span className="text-[10px] font-bold text-foreground-400 uppercase block mb-0.5">Délai Correction</span>
                              <span className="text-foreground-700 font-bold">{finding.delai_correction}</span>
                            </div>
                          </div>
                          <div className="mt-2 p-2.5 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2">
                            <i className="ri-shield-flash-line text-red-500 text-xs mt-0.5 flex-shrink-0" />
                            <span className="text-[11px] text-red-700 font-bold">Risque Inspection : {finding.risque_inspection}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 4. REGULATORY REFERENCES ═══════════ */}
          {activeOutputTab === 'references' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">{selectedAudit.regulatory_references.length} Textes Réglementaires Applicables</h2>
                  <p className="text-sm text-foreground-500">Cartographie exhaustive avec statut de conformité par article</p>
                </div>
                <div className="space-y-4">
                  {selectedAudit.regulatory_references.map(ref => {
                    const statusStyle = CONFORMITY_STYLES[ref.statut_conformite];
                    return (
                      <div key={ref.id} className="rounded-2xl bg-white border border-background-200 p-5">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${statusStyle.bg}`}>
                            <i className={`${statusStyle.icon} text-lg ${statusStyle.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="text-sm font-bold text-foreground-950">{ref.texte}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground-100 text-foreground-600 font-bold">{ref.autorite}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${statusStyle.bg} ${statusStyle.text}`}>
                                {statusStyle.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {ref.articles_applicables.map(a => (
                                <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200 font-mono">{a}</span>
                              ))}
                            </div>
                            <div className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                              <span className="text-[10px] font-bold text-foreground-400 uppercase block mb-0.5">Exigence</span>
                              <span className="text-xs text-foreground-700">{ref.exigence}</span>
                            </div>
                            <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2">
                              <i className="ri-file-search-line text-amber-600 text-xs mt-0.5 flex-shrink-0" />
                              <span className="text-[11px] text-amber-800">Preuve de conformité : {ref.preuve_conformite}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 5. REMEDIATION PLAN ═══════════ */}
          {activeOutputTab === 'remediation' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Plan de Remédiation — {selectedAudit.remediation_plan.length} Étapes</h2>
                  <p className="text-sm text-foreground-500">Step-by-step avec priorisation P0-P3, responsables, délais, coûts et dépendances</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px] w-10">#</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Action</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Resp.</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Délai</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Coût</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px] w-12">Pri.</th>
                        <th className="text-left py-3 px-3 font-bold text-foreground-400 uppercase text-[10px]">Critère de Succès</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAudit.remediation_plan.map(step => (
                        <tr key={step.etape} className="border-b border-background-100 hover:bg-background-50/50">
                          <td className="py-3 px-3 font-bold text-foreground-800">{step.etape}</td>
                          <td className="py-3 px-3 text-foreground-700 max-w-[300px]">
                            <div className="text-foreground-700">{step.action}</div>
                            {step.dependances.length > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <i className="ri-link text-[10px] text-foreground-400" />
                                <span className="text-[10px] text-foreground-400 italic">Dépend de : {step.dependances.map(d => `Étape ${d.replace('Étape ', '')}`).join(', ')}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-foreground-700 font-bold whitespace-nowrap">{step.responsable}</td>
                          <td className="py-3 px-3 text-foreground-600 whitespace-nowrap font-mono text-[10px]">{step.delai}</td>
                          <td className="py-3 px-3 text-foreground-600 whitespace-nowrap font-mono text-[10px]">{step.cout_estime_fcfa} FCFA</td>
                          <td className="py-3 px-3">
                            <span className={`inline-flex items-center justify-center w-8 h-6 rounded-full text-[10px] font-black ${PRIORITY_STYLES[step.priorite]}`}>
                              {step.priorite}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-foreground-600 max-w-[250px] text-[10px]">{step.critere_succes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <i className="ri-information-line text-emerald-600 text-lg flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-emerald-800 block">Budget total estimé</span>
                    <span className="text-sm font-black text-emerald-700">
                      {selectedAudit.remediation_plan.reduce((sum, s) => {
                        const num = parseInt(s.cout_estime_fcfa.replace(/\s/g, '').replace('/an', ''), 10);
                        return sum + (isNaN(num) ? 0 : num);
                      }, 0).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════ 6. INSPECTION READINESS SCORE ═══════════ */}
          {activeOutputTab === 'readiness' && (
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getScoreBg(selectedAudit.inspection_readiness.score_global)}`}>
                      <span className={`text-3xl font-black ${getScoreColor(selectedAudit.inspection_readiness.score_global)}`}>
                        {selectedAudit.inspection_readiness.score_global}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-foreground-950">Inspection Readiness Score</h2>
                      <p className="text-sm text-foreground-500">Score global sur 100</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground-700 leading-relaxed mb-6 p-4 rounded-xl bg-background-50 border border-background-200">
                    {selectedAudit.inspection_readiness.interpretation}
                  </p>

                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-4">Breakdown par Pilier</h3>
                  <div className="space-y-3 mb-6">
                    {Object.entries(selectedAudit.inspection_readiness.breakdown).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-foreground-700 w-40 flex-shrink-0 text-right capitalize">{key.replace(/_/g, ' ')}</span>
                        <div className="flex-1 bg-background-100 rounded-full h-5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${getScoreBarColor(val)}`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                        <span className={`text-xs font-black w-8 ${getScoreColor(val)}`}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Benchmark Sectoriel</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {selectedAudit.inspection_readiness.benchmark.map((bm, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background-50 border border-background-100">
                        <span className="text-xs text-foreground-600">{bm.label}</span>
                        <span className={`text-sm font-black ${getScoreColor(bm.score)}`}>{bm.score}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <i className="ri-shield-flash-line" />Points Critiques à l'Inspection
                      </h3>
                      <ul className="space-y-2">
                        {selectedAudit.inspection_readiness.points_critiques_inspection.map((p, i) => (
                          <li key={i} className="text-[11px] text-red-700 flex items-start gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100">
                            <i className="ri-arrow-right-s-line text-red-500 mt-0.5 flex-shrink-0" />{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <i className="ri-lightbulb-line" />Recommandations Dernière Minute
                      </h3>
                      <ul className="space-y-2">
                        {selectedAudit.inspection_readiness.recommandations_derniere_minute.map((r, i) => (
                          <li key={i} className="text-[11px] text-emerald-800 flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                            <i className="ri-arrow-right-s-line text-emerald-500 mt-0.5 flex-shrink-0" />{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Empty State */}
      {!selectedAudit && !processing && !error && (
        <section className="py-20 text-center">
          <div className="max-w-md mx-auto px-4">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
              <i className="ri-shield-check-line text-red-500 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Prêt à auditer</h2>
            <p className="text-sm text-foreground-500">Sélectionnez un établissement financier CEMAC ci-dessus pour lancer l'analyse approfondie de conformité COBAC — Big Four Standards.</p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-5">
              {outputTabs.map(tab => (
                <span key={tab.id} className="text-[10px] px-2.5 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">
                  {tab.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ecosystem Cross-Links */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Compliance Auditor — Accès Rapide</h2>
            <p className="text-foreground-600">Navigation vers les modules connectés du KOS Compliance & Regulatory Intelligence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Senior Compliance Auditor', path: '/kos-senior-compliance-auditor', icon: 'ri-shield-check-line', color: '#DC2626', current: true },
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#D97757' },
              { label: 'Compliance Automates', path: '/kos-regulatory-compliance-automates', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Compliance Audit', path: '/kos-regulatory-compliance-audit', icon: 'ri-file-search-line', color: '#C2410C' },
              { label: 'Workflow Orchestrator', path: '/kos-workflow-orchestrator', icon: 'ri-flow-chart', color: '#0D9488' },
              { label: 'COBAC Dashboard', path: '/cobac', icon: 'ri-building-line', color: '#1A1A2E' },
              { label: 'GAFI Dashboard', path: '/gafi', icon: 'ri-global-line', color: '#8B3A4A' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#0D7B5F' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-red-300 bg-red-50/40 ring-2 ring-red-400' : 'border-background-200 bg-white hover:border-red-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-red-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





