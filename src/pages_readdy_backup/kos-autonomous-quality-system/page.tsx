import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useQualitySystem } from '@/hooks/useQualitySystem';
import type { agent, detectedError, correctiveAction } from '@/mocks/qualitySystem';

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'CRITIQUE', dot: 'bg-red-500' };
    case 'major': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'MAJEUR', dot: 'bg-amber-500' };
    case 'minor': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'MINEUR', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'active': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Activé', dot: 'bg-emerald-500' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Partiel', dot: 'bg-amber-500' };
    case 'gap': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'GAP', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getErrorStatusBadge(status: string) {
  switch (status) {
    case 'open': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Ouvert', dot: 'bg-red-500' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours', dot: 'bg-amber-500' };
    case 'fixed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Corrigé', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getActionStatusBadge(status: string) {
  switch (status) {
    case 'pending': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'En attente', dot: 'bg-slate-400' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours', dot: 'bg-amber-500' };
    case 'done': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Terminé', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getPhaseStatusIcon(status: string) {
  switch (status) {
    case 'completed': return 'ri-checkbox-circle-fill text-emerald-500';
    case 'in_progress': return 'ri-loader-4-line text-amber-500 animate-spin';
    case 'pending': return 'ri-time-line text-slate-300';
    default: return 'ri-question-line text-slate-300';
  }
}

type TabId = 'dashboard' | 'scan' | 'errors' | 'corrections' | 'reports';

export default function autonomousQualitySystemPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [expandedAgent, setExpandedAgent] = useState<string | null>('url-integrity');
  const [errorFilter, setErrorFilter] = useState<'all' | 'critical' | 'major' | 'minor'>('all');

  const { globalReport, agents, scanPhases, reportSections, loading, error, dataSource, refresh } = useQualitySystem();

  const report = globalReport;

  const allErrors = useMemo(() => {
    const errors: (detectedError & { agentName: string; agentColor: string })[] = [];
    agents.forEach((agent) => {
      agent.errors.forEach((err) => {
        errors.push({ ...err, agentName: agent.name, agentColor: agent.color });
      });
    });
    return errors.sort((a, b) => {
      const severityOrder: Record<string, number> = { critical: 0, major: 1, minor: 2 };
      return (severityOrder[a.severity] || 0) - (severityOrder[b.severity] || 0);
    });
  }, [agents]);

  const filteredErrors = useMemo(() => {
    if (errorFilter === 'all') return allErrors;
    return allErrors.filter((e) => e.severity === errorFilter);
  }, [allErrors, errorFilter]);

  const allActions = useMemo(() => {
    const actions: (correctiveAction & { agentName: string; agentColor: string })[] = [];
    agents.forEach((agent) => {
      agent.actions.forEach((act) => {
        actions.push({ ...act, agentName: agent.name, agentColor: agent.color });
      });
    });
    return actions.sort((a, b) => {
      const priorityOrder: Record<string, number> = { critical: 0, major: 1, minor: 2 };
      return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
    });
  }, [agents]);

  const errorStats = useMemo(() => ({
    total: allErrors.length,
    critical: allErrors.filter((e) => e.severity === 'critical').length,
    major: allErrors.filter((e) => e.severity === 'major').length,
    minor: allErrors.filter((e) => e.severity === 'minor').length,
    fixed: allErrors.filter((e) => e.status === 'fixed').length,
  }), [allErrors]);

  const actionStats = useMemo(() => ({
    total: allActions.length,
    done: allActions.filter((a) => a.status === 'done').length,
    inProgress: allActions.filter((a) => a.status === 'in_progress').length,
    pending: allActions.filter((a) => a.status === 'pending').length,
    autoApplied: allActions.filter((a) => a.autoApplied).length,
  }), [allActions]);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: '6' },
    { id: 'scan', label: 'Scan Global', icon: 'ri-radar-line', count: '5' },
    { id: 'errors', label: 'Erreurs', icon: 'ri-error-warning-line', count: String(allErrors.length) },
    { id: 'corrections', label: 'Corrections', icon: 'ri-tools-line', count: String(allActions.length) },
    { id: 'reports', label: 'Rapports', icon: 'ri-file-chart-line', count: '6' },
  ];

  return (
    <hubLayout hubId={44}>
      <SeoHead
        title="KOS Autonomous Quality & Compliance System™ — Monitoring 6 Agents | KHEPRA EXPERTS"
        description="Système autonome de surveillance qualité : 6 agents IA (URL Integrity, SEO Indexing, Core Web Vitals, Content Quality, Legal Compliance, Reputation). Scan continu, détection erreurs, correction automatique, rapport KPI Big Four."
        keywords="KOS Autonomous Quality System, monitoring qualité, audit site web, SEO compliance, Core Web Vitals, content quality, legal compliance, KHEPRA EXPERTS"
        canonicalPath="/kos-autonomous-quality-system"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20sophisticated%20dark%20orchestration%20hub%20with%20six%20interconnected%20glowing%20nodes%20forming%20a%20hexagonal%20quality%20monitoring%20network%2C%20precise%20geometric%20quality%20control%20patterns%20radiating%20from%20center%2C%20emerald%20amber%20and%20warm%20gold%20accent%20lines%20representing%20different%20compliance%20dimensions%2C%20premium%20corporate%20technology%20atmosphere%20with%20structured%20surveillance%20dashboard%20aesthetic%2C%20no%20text%20no%20human%20figures%2C%20clean%20minimalist%20dark%20background%20with%20algorithmic%20precision%20and%20node%20interconnection%20patterns&width=1920&height=600&seq=kos-quality-hero-bg&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-18"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <i className="ri-shield-check-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                    KOS Autonomous Quality & Compliance System™
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border text-xs font-bold ${
                  dataSource === 'supabase'
                    ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                    : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${dataSource === 'supabase' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  {dataSource === 'supabase' ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                </div>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Surveillance Qualité
                <span className="block text-emerald-400 mt-2">Autonome & Continue</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                6 agents autonomes scannent, détectent et corrigent les erreurs techniques, SEO, UX et contenu.{' '}
                <strong className="text-white">Conformité éditoriale, juridique et réputationnelle garantie.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm text-red-300 font-semibold">{report.criticalErrors} Critiques</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-amber-300 font-semibold">{report.majorErrors} Majeures</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-300 font-semibold">Score {report.globalScore}/10</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading / Error States */}
        {loading && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <i className="ri-loader-4-line text-4xl text-emerald-500 animate-spin block mb-4" />
              <p className="text-foreground-600">Chargement du système qualité...</p>
            </div>
          </section>
        )}

        {error && !loading && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <i className="ri-error-warning-line text-4xl text-red-400 block mb-4" />
              <p className="text-red-600 font-medium mb-4">Erreur de chargement : {error}</p>
              <button
                onClick={refresh}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line" />
                Réessayer
              </button>
            </div>
          </section>
        )}

        {!loading && !error && (
          <>
        {/* Tab Navigation */}
        <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* === TAB: DASHBOARD === */}
        {activeTab === 'dashboard' && (
          <>
            {/* Global Score + Core Web Vitals */}
            <section className="py-10 sm:py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                  <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-7 text-center lg:col-span-1">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-background-100 flex items-center justify-center relative">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" className="text-background-200" strokeWidth="6" />
                        <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="6"
                          strokeDasharray={`${(report.globalScore / 10) * 2 * Math.PI * 34} ${2 * Math.PI * 34}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold text-foreground-950 font-heading">{report.globalScore.toFixed(1)}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1">Score Global KOS</h3>
                    <p className="text-sm text-foreground-500 mb-4">/10 — Standard Big Four</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xs font-bold text-amber-700">AMÉLIORATION REQUISE</span>
                    </div>
                    <p className="text-[10px] text-foreground-400 mt-2">Cible : {report.targetScore}/10</p>
                  </div>

                  <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-7 lg:col-span-2">
                    <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                      <i className="ri-speed-up-line text-amber-500" />
                      Core Web Vitals — Performance
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'LCP', value: report.coreWebVitals.lcp.value, target: report.coreWebVitals.lcp.target, status: report.coreWebVitals.lcp.status, desc: 'Largest Contentful Paint' },
                        { label: 'CLS', value: report.coreWebVitals.cls.value, target: report.coreWebVitals.cls.target, status: report.coreWebVitals.cls.status, desc: 'Cumulative Layout Shift' },
                        { label: 'INP', value: report.coreWebVitals.inp.value, target: report.coreWebVitals.inp.target, status: report.coreWebVitals.inp.status, desc: 'Interaction to Next Paint' },
                      ].map((cwv) => (
                        <div key={cwv.label} className="rounded-xl bg-background-50 border border-background-100 p-4 text-center">
                          <span className="text-[10px] text-foreground-400 uppercase tracking-wider font-bold">{cwv.label}</span>
                          <span className={`block text-2xl font-bold font-heading mt-1 ${
                            cwv.status === 'pass' ? 'text-emerald-600' : cwv.status === 'warn' ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {cwv.value}
                          </span>
                          <span className="text-[10px] text-foreground-400">Cible : &lt;{cwv.target}</span>
                          <p className="text-[10px] text-foreground-300 mt-1">{cwv.desc}</p>
                          <span className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            cwv.status === 'pass' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            cwv.status === 'warn' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              cwv.status === 'pass' ? 'bg-emerald-500' : cwv.status === 'warn' ? 'bg-amber-500' : 'bg-red-500'
                            }`} />
                            {cwv.status === 'pass' ? 'OK' : cwv.status === 'warn' ? 'À optimiser' : 'Critique'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
                  {[
                    { label: 'Liens scannés', value: report.linksScanned.toLocaleString(), icon: 'ri-link', color: '#0D7B5F' },
                    { label: 'Liens valides', value: `${report.linksValid.toLocaleString()} (${((report.linksValid / report.linksScanned) * 100).toFixed(1)}%)`, icon: 'ri-check-double-line', color: '#86BC25' },
                    { label: 'Liens cassés', value: String(report.linksBroken), icon: 'ri-link-unlink', color: '#c2410c' },
                    { label: 'Pages indexées', value: `${report.pagesIndexed}/${report.pagesTarget}`, icon: 'ri-global-line', color: '#9B7B2C' },
                    { label: 'Score contenu', value: `${report.contentQualityScore}/10`, icon: 'ri-quill-pen-line', color: '#6B4A3A' },
                    { label: 'Risques légaux', value: String(report.legalRisksDetected), icon: 'ri-scales-line', color: '#8B3040' },
                    { label: 'Liens sociaux', value: `${report.socialLinksValid}/${report.socialLinksTotal}`, icon: 'ri-share-circle-line', color: '#5B8C2A' },
                    { label: 'Erreurs corrigées', value: String(report.errorsFixed), icon: 'ri-check-line', color: '#2D7A3A' },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                        <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                      </div>
                      <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                      <span className="text-[10px] text-foreground-400">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* 6 Agents Grid */}
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-2">
                    Les 6 Agents Autonomes
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    Chaque agent opère en boucle continue : Scan → Détection → Correction → Validation → Reporting.
                  </p>
                </div>

                <div className="space-y-4">
                  {agents.map((agent) => {
                    const agentBadge = getStatusBadge(agent.status);
                    const isExpanded = expandedAgent === agent.id;
                    const scoreColor = agent.score >= 8 ? '#86BC25' : agent.score >= 6 ? '#e8c547' : '#c2410c';
                    return (
                      <div
                        key={agent.id}
                        className={`rounded-2xl border transition-all duration-300 ${
                          isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                          className="w-full p-5 sm:p-6 text-left flex items-start gap-4 cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${agent.color}15` }}>
                            <span className="text-lg font-bold font-heading" style={{ color: agent.color }}>{agent.number}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-base font-bold text-foreground-950">{agent.name}</h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${agentBadge.bg} ${agentBadge.border} ${agentBadge.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${agentBadge.dot}`} />
                                {agentBadge.label}
                              </span>
                            </div>
                            <p className="text-sm text-foreground-500 line-clamp-2">{agent.mission}</p>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs">
                              <span className="flex items-center gap-1">
                                <span className="font-bold font-heading text-base" style={{ color: scoreColor }}>{agent.score.toFixed(1)}</span>
                                <span className="text-foreground-400">/10</span>
                              </span>
                              <span className="text-foreground-400">
                                <i className="ri-time-line mr-1" />Scan : {new Date(agent.lastScan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span className="text-foreground-400">
                                <i className="ri-error-warning-line mr-1" />{agent.errors.length} erreurs
                              </span>
                              <span className="text-foreground-400">
                                <i className="ri-tools-line mr-1" />{agent.actions.length} actions
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 pt-2">
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-xl`} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-6 pb-6 border-t border-background-200 pt-5">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">KPIs</h5>
                                <div className="space-y-2">
                                  {agent.kpis.map((kpi, j) => (
                                    <div key={j} className="flex items-center justify-between p-2.5 rounded-lg bg-background-50 border border-background-100">
                                      <div className="flex items-center gap-2">
                                        <i className={`${kpi.icon} text-xs`} style={{ color: agent.color }} />
                                        <span className="text-xs text-foreground-600">{kpi.label}</span>
                                      </div>
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-bold text-foreground-950">{kpi.current}</span>
                                        <span className="text-[10px] text-foreground-400">/ {kpi.target} {kpi.unit}</span>
                                        <span className={`text-[10px] ${kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'}`}>
                                          <i className={`${kpi.trend === 'up' ? 'ri-arrow-up-line' : kpi.trend === 'down' ? 'ri-arrow-down-line' : 'ri-arrow-right-line'} text-xs`} />
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Erreurs Détectées</h5>
                                <div className="space-y-2">
                                  {agent.errors.map((err) => {
                                    const errBadge = getErrorStatusBadge(err.status);
                                    const sevBadge = getSeverityBadge(err.severity);
                                    return (
                                      <div key={err.id} className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                                        <div className="flex items-center gap-1.5 mb-1">
                                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${sevBadge.bg} ${sevBadge.border} ${sevBadge.text}`}>
                                            <span className={`w-1 h-1 rounded-full ${sevBadge.dot}`} />
                                            {sevBadge.label}
                                          </span>
                                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${errBadge.bg} ${errBadge.border} ${errBadge.text}`}>
                                            {errBadge.label}
                                          </span>
                                        </div>
                                        <p className="text-xs text-foreground-700 leading-relaxed">{err.description}</p>
                                        <span className="text-[10px] text-foreground-400 mt-1 block">{err.location}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Actions Correctives</h5>
                                <div className="space-y-2">
                                  {agent.actions.map((act) => {
                                    const actBadge = getActionStatusBadge(act.status);
                                    const priBadge = getSeverityBadge(act.priority);
                                    return (
                                      <div key={act.id} className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${priBadge.bg} ${priBadge.border} ${priBadge.text}`}>
                                            {priBadge.label}
                                          </span>
                                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${actBadge.bg} ${actBadge.border} ${actBadge.text}`}>
                                            {actBadge.label}
                                          </span>
                                          {act.autoApplied && (
                                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                                              <i className="ri-robot-line text-[9px]" />Auto
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-foreground-700 leading-relaxed">{act.description}</p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* === TAB: SCAN === */}
        {activeTab === 'scan' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Boucle de Fonctionnement — 5 Phases
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Scan complet du site → Détection d'erreurs → Correction automatique ou proposée → Validation → Reporting.
                </p>
              </div>

              <div className="space-y-4">
                {scanPhases.map((phase, i) => (
                  <div key={i} className="relative">
                    {i < scanPhases.length - 1 && (
                      <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-background-200 hidden md:block" />
                    )}
                    <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                      <div className="p-5 sm:p-6 flex flex-col md:flex-row items-start gap-5">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${phase.color}15` }}>
                            <i className={`${phase.icon} text-2xl`} style={{ color: phase.color }} />
                          </div>
                          <span className="text-3xl font-bold font-heading mt-2" style={{ color: phase.color }}>{phase.phase}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-heading text-lg font-bold text-foreground-950">{phase.name}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              phase.status === 'completed' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' :
                              phase.status === 'in_progress' ? 'bg-amber-50 border border-amber-200 text-amber-700' :
                              'bg-slate-50 border border-slate-200 text-slate-500'
                            }`}>
                              <i className={getPhaseStatusIcon(phase.status)} />
                              {phase.status === 'completed' ? 'Terminé' : phase.status === 'in_progress' ? 'En cours' : 'Planifié'}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed">{phase.description}</p>
                          <span className="inline-flex items-center gap-1 mt-3 text-xs text-foreground-400">
                            <i className="ri-time-line" />
                            Durée : {phase.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scan schedule info */}
              <div className="mt-10 rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-4">
                  <i className="ri-refresh-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Scan Automatique — Toutes les 24h</span>
                </div>
                <p className="text-gray-300 max-w-xl mx-auto text-sm">
                  Prochain scan complet programmé le {new Date(Date.now() + 86400000).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à 03:00 UTC. Durée estimée : 15 minutes.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* === TAB: ERRORS === */}
        {activeTab === 'errors' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Erreurs Détectées — {allErrors.length} au Total
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Classification : 🔴 Critique · 🟠 Majeure · 🟡 Mineure. {errorStats.fixed} déjà corrigées.
                </p>
              </div>

              {/* Filter + Stats */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setErrorFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      errorFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                    }`}
                  >
                    Tous ({errorStats.total})
                  </button>
                  <button
                    onClick={() => setErrorFilter('critical')}
                    className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      errorFilter === 'critical' ? 'bg-red-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-red-200'
                    }`}
                  >
                    Critiques ({errorStats.critical})
                  </button>
                  <button
                    onClick={() => setErrorFilter('major')}
                    className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      errorFilter === 'major' ? 'bg-amber-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-amber-200'
                    }`}
                  >
                    Majeures ({errorStats.major})
                  </button>
                  <button
                    onClick={() => setErrorFilter('minor')}
                    className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      errorFilter === 'minor' ? 'bg-slate-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-slate-300'
                    }`}
                  >
                    Mineures ({errorStats.minor})
                  </button>
                </div>
                <span className="text-sm text-foreground-500">
                  <i className="ri-check-line text-emerald-600 mr-1" />{errorStats.fixed} corrigées
                </span>
              </div>

              <div className="space-y-3">
                {filteredErrors.map((err) => {
                  const sevBadge = getSeverityBadge(err.severity);
                  const errBadge = getErrorStatusBadge(err.status);
                  return (
                    <div key={err.id} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-sm transition-all">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${err.agentColor}15` }}>
                          <i className="ri-shield-check-line text-sm" style={{ color: err.agentColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sevBadge.bg} ${sevBadge.border} ${sevBadge.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sevBadge.dot}`} />
                              {sevBadge.label}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${errBadge.bg} ${errBadge.border} ${errBadge.text}`}>
                              {errBadge.label}
                            </span>
                            <span className="text-[10px] text-foreground-400 ml-auto">
                              {new Date(err.detectedAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-800 font-medium">{err.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                            <span><i className="ri-folder-line mr-1" />{err.location}</span>
                            <span><i className="ri-user-line mr-1" />{err.agentName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredErrors.length === 0 && (
                  <div className="text-center py-12 text-foreground-400">
                    <i className="ri-check-double-line text-4xl mb-2 block text-emerald-400" />
                    <p className="text-sm">Aucune erreur dans cette catégorie.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* === TAB: CORRECTIONS === */}
        {activeTab === 'corrections' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Actions Correctives — {allActions.length} Planifiées
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  {actionStats.done} terminées · {actionStats.inProgress} en cours · {actionStats.pending} en attente · {actionStats.autoApplied} automatiques.
                </p>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Terminées', value: actionStats.done, color: '#86BC25', icon: 'ri-check-double-line' },
                  { label: 'En cours', value: actionStats.inProgress, color: '#e8c547', icon: 'ri-loader-4-line' },
                  { label: 'En attente', value: actionStats.pending, color: '#6B7280', icon: 'ri-time-line' },
                  { label: 'Auto-appliquées', value: actionStats.autoApplied, color: '#2D7A3A', icon: 'ri-robot-line' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                      <i className={`${stat.icon} text-lg`} style={{ color: stat.color }} />
                    </div>
                    <span className="block text-3xl font-bold text-foreground-950 font-heading">{stat.value}</span>
                    <span className="text-xs text-foreground-400">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {allActions.map((act) => {
                  const priBadge = getSeverityBadge(act.priority);
                  const actBadge = getActionStatusBadge(act.status);
                  return (
                    <div key={act.id} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-sm transition-all">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${act.agentColor}15` }}>
                          <i className="ri-tools-line text-sm" style={{ color: act.agentColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${priBadge.bg} ${priBadge.border} ${priBadge.text}`}>
                              {priBadge.label}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${actBadge.bg} ${actBadge.border} ${actBadge.text}`}>
                              {actBadge.label}
                            </span>
                            {act.autoApplied && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                                <i className="ri-robot-line text-[10px]" />Correction Auto
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-foreground-800 leading-relaxed">{act.description}</p>
                          <span className="text-[10px] text-foreground-400 mt-1 block">
                            <i className="ri-user-line mr-1" />{act.agentName}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* === TAB: REPORTS === */}
        {activeTab === 'reports' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Rapport Global — 6 Sections
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Généré le {new Date(report.generatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}.
                  Prochaine mise à jour automatique dans 24h.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reportSections.map((section) => (
                  <div key={section.id} className="rounded-2xl bg-white border border-background-200 p-5 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-foreground-950 flex items-center justify-center">
                        <i className={`${section.icon} text-white text-lg`} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-foreground-950">{section.title}</h3>
                    </div>
                    <p className="text-sm text-foreground-600 leading-relaxed">{section.description}</p>
                  </div>
                ))}
              </div>

              {/* Report Generation CTA */}
              <div className="mt-10 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-4">
                  <i className="ri-download-2-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Rapport Exécutif — Génération Automatique</span>
                </div>
                <p className="text-gray-300 max-w-xl mx-auto text-sm mb-6">
                  Le rapport complet (PDF 12 pages) est généré automatiquement après chaque scan et inclut tous les KPIs, erreurs, actions correctives et plans d'amélioration.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Rapport Global de Santé', 'Erreurs Critiques', 'Actions Correctives', 'Plan Technique', 'Plan SEO', 'Plan Conformité'].map((label) => (
                    <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs">
                      <i className="ri-check-line text-emerald-400" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cross-link to other KOS Engines */}
        <section className="py-12 sm:py-16 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Écosystème KOS Complet
              </h2>
              <p className="text-foreground-600">Les 6 moteurs autonomes interconnectés.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Unified Autopilot', path: '/kos-unified-autopilot', icon: 'ri-cpu-line', color: '#86BC25' },
                { label: 'Orchestrator Engine', path: '/kos-orchestrator-engine', icon: 'ri-git-branch-line', color: '#4F46E5' },

              ].map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                    <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                </a>
              ))}
              <a
                href="/kos-autonomous-quality-system"
                className="rounded-xl border-2 border-emerald-300 bg-emerald-50/30 p-4 text-center hover:shadow-md transition-all cursor-pointer block"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <i className="ri-shield-check-line text-emerald-600 text-lg" />
                </div>
                <span className="text-sm font-bold text-emerald-800">Quality System</span>
                <span className="block text-[10px] text-emerald-600 mt-1">← Vous êtes ici</span>
              </a>
            </div>
          </div>
        </section>

          </>
        )}

    </hubLayout>
  );
}



