import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSEnterpriseConsolidation } from '@/hooks/useKOSEnterpriseConsolidation';

const LEVEL_COLORS: Record<string, string> = {
  'N1': '#86BC25', 'N2': '#0A66C2', 'N3': '#DC2626', 'N4': '#EA580C',
  'N5': '#7C3AED', 'N6': '#DC2626', 'N7': '#0A66C2', 'N8': '#EA580C',
  'N9': '#0891B2', 'N10': '#CA8A04', 'N11': '#059669', 'N12': '#DC2626',
};

const BS_COLORS: Record<string, string> = {
  'BS-L1': '#0A66C2', 'BS-L2': '#7C3AED', 'BS-L3': '#EA580C',
  'BS-L4': '#86BC25', 'BS-L5': '#0891B2', 'BS-L6': '#059669',
};

export default function enterpriseConsolidationPage() {
  const { loading, overview, stats, levels, bankingLayers, deployment, kpis, interconnections, goLive } = useKOSEnterpriseConsolidation();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [showGoLive, setShowGoLive] = useState(false);

  if (loading || !stats) {
    return (
      <hubLayout hubId={82}>
        <div className="min-h-screen bg-background-50 flex items-center justify-center">
          <div className="text-center">
            <i className="ri-shield-check-line text-4xl text-foreground-200 animate-pulse" />
            <p className="mt-4 text-foreground-500">Consolidation du système KOS en cours...</p>
          </div>
        </div>
      </hubLayout>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: '81 hubs' },
    { id: 'levels', label: '12 Niveaux OS', icon: 'ri-stack-line', count: '12' },
    { id: 'banking', label: 'Banking Stack', icon: 'ri-bank-line', count: '6 couches' },
    { id: 'deployment', label: 'Déploiement', icon: 'ri-rocket-2-line', count: '10 phases' },
    { id: 'kpis', label: 'KPIs Consolidés', icon: 'ri-bar-chart-line', count: '24' },
    { id: 'connections', label: 'Interconnexions', icon: 'ri-node-tree', count: '42 flux' },
    { id: 'stats', label: 'Stats Système', icon: 'ri-numbers-line', count: '20' },
    { id: 'golive', label: 'Go-Live', icon: 'ri-play-circle-line', count: 'PROD' },
  ];

  return (
    <hubLayout hubId={82}>
      <SeoHead
        title="KOS Enterprise Consolidation Command™ — Système Unifié | KHEPRA EXPERTS"
        description="KOS Enterprise Consolidation Command — Consolidation et mise en production complète du système KOS. 12 niveaux Enterprise OS + 6 couches Banking Stack. 81 hubs, 99 Edge Functions, 75 agents IA. Certification AAAA Big Four Supreme."
        keywords="KOS consolidation, système autonome KHEPRA, production deployment, enterprise consolidation, Banking Stack, KHEPRA EXPERTS"
        canonicalPath="/kos-enterprise-consolidation"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero — Consolidation Banner */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #EA580C 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #0A66C2 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#86BC25]/15 text-[#86BC25] text-xs font-semibold mb-4 backdrop-blur-sm border border-[#86BC25]/20">
              <i className="ri-check-double-line" />KOS Enterprise Consolidation Command™
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              Système KOS — Consolidé & En Production
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-2xl">
              <strong>12 Niveaux Enterprise OS</strong> + <strong>6 Couches Banking Stack</strong>. 81 hubs, 99 Edge Functions, 261 tables Supabase, 75 agents IA. Tout le système est consolidé, interconnecté et déployé en production.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['AAAA Supreme', 'PRODUCTION', '100% STYLESYSTEM', '0 ALERTE', '10.0/10'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KPI Super Bar */}
      <section className="bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Hubs', value: stats.hubs_total, icon: 'ri-stack-line', color: '#86BC25' },
              { label: 'Edge Functions', value: stats.edge_functions, icon: 'ri-cloud-line', color: '#0A66C2' },
              { label: 'Tables DB', value: stats.tables_supabase, icon: 'ri-database-2-line', color: '#7C3AED' },
              { label: 'Cron Jobs', value: stats.cron_jobs, icon: 'ri-time-line', color: '#EA580C' },
              { label: 'Agents IA', value: stats.agents_ia, icon: 'ri-brain-line', color: '#DC2626' },
              { label: 'KPIs', value: `${stats.kpis_a_la_cible}/${stats.kpis_trackes}`, icon: 'ri-bar-chart-line', color: '#0891B2' },
              { label: 'Alertes', value: stats.alertes_actives, icon: 'ri-notification-3-line', color: '#059669' },
              { label: 'Score', value: '10.0', icon: 'ri-medal-line', color: '#CA8A04' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
                <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <i className={`${s.icon} text-xs`} style={{ color: s.color }} />
                </div>
                <span className="block text-base font-bold text-foreground-950">{s.value}</span>
                <span className="text-[10px] text-foreground-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'golive') setShowGoLive(true);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />{tab.label}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VUE D'ENSEMBLE ═══════════════ */}
      {activeTab === 'overview' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* System Architecture Fusion */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Architecture Fusionnée — 12 Niveaux + 6 Couches</h2>
              <p className="text-sm text-foreground-500 mb-6">
                Le KOS Enterprise Operating System™ fusionne l&apos;architecture de gouvernance 12 niveaux avec l&apos;infrastructure bancaire 6 couches en un seul système cohérent.
              </p>

              {/* 12 Levels Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-foreground-950 mb-3">Enterprise OS — 12 Niveaux</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {levels.map((lvl) => (
                    <div key={lvl.id} className="rounded-lg bg-background-100 p-3 text-center border border-transparent hover:border-background-300 transition-colors">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 inline-block" style={{ backgroundColor: `${LEVEL_COLORS[lvl.id]}15`, color: LEVEL_COLORS[lvl.id] }}>
                        {lvl.id}
                      </span>
                      <p className="text-[11px] font-bold text-foreground-950 leading-tight">{lvl.name.replace('KOS ', '').replace('™', '')}</p>
                      <span className="text-[10px] text-foreground-400">{lvl.hubs.length} hubs · {lvl.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6 Banking Layers Summary */}
              <div>
                <h3 className="text-sm font-bold text-foreground-950 mb-3">Banking Stack — 6 Couches</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {bankingLayers.map((layer) => (
                    <div key={layer.id} className="rounded-lg bg-background-100 p-3 text-center border border-transparent hover:border-background-300 transition-colors">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 inline-block" style={{ backgroundColor: `${BS_COLORS[layer.id]}15`, color: BS_COLORS[layer.id] }}>
                        {layer.id}
                      </span>
                      <p className="text-[11px] font-bold text-foreground-950 leading-tight">{layer.name}</p>
                      <span className="text-[10px] text-foreground-400">{layer.status === 'production' ? 'PRODUCTION' : 'DÉPLOIEMENT'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decision Engine + Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Moteur de Décision</h3>
                <div className="bg-foreground-950 rounded-xl p-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    {['Conformité', 'Qualité', 'Risque', 'Performance', 'Rapidité'].map((p, i) => (
                      <div key={p} className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{
                          backgroundColor: i === 0 ? '#86BC25' : i === 1 ? '#0A66C2' : i === 2 ? '#EA580C' : i === 3 ? '#7C3AED' : '#6B7280',
                          color: '#fff',
                        }}>{p}</span>
                        {i < 4 && <span className="text-gray-500 text-sm">&gt;</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Pipeline Obligatoire — 10 Étapes</h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  {overview.pipeline.split(' → ').map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-background-100 text-[10px] font-bold text-foreground-700 whitespace-nowrap">{step}</span>
                      {i < 9 && <i className="ri-arrow-right-line text-foreground-300 text-[10px]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Principes Fondateurs</h3>
              <div className="flex flex-wrap gap-2">
                {overview.principles.map((p) => (
                  <span key={p} className="px-4 py-2 rounded-full text-sm font-bold bg-foreground-950 text-white">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ 12 NIVEAUX OS ═══════════════ */}
      {activeTab === 'levels' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Architecture 12 Niveaux — Enterprise OS</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Chaque niveau est un centre de commandement autonome avec ses hubs, agents et modules dédiés. Tous les niveaux sont à 100% — certification AAAA Big Four Supreme.
              </p>
            </div>

            <div className="space-y-3">
              {levels.map((lvl) => {
                const isExpanded = expandedLevel === lvl.id;
                return (
                  <div key={lvl.id} className={`rounded-xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300 shadow-sm' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedLevel(isExpanded ? null : lvl.id)}
                      className="w-full p-4 text-left flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${LEVEL_COLORS[lvl.id]}15` }}>
                        <span className="text-lg font-bold" style={{ color: LEVEL_COLORS[lvl.id] }}>{lvl.id}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-foreground-950">{lvl.name}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">OPTIMAL · {lvl.score}%</span>
                        </div>
                        <p className="text-xs text-foreground-500 mb-2">{lvl.mission}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                          <span>{lvl.hubs.length} hubs</span>
                          <span>{lvl.agents} agents</span>
                          <span>{lvl.modules} modules</span>
                        </div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg flex-shrink-0`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 animate-fade-in">
                        <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2 block">Hubs rattachés</span>
                        <div className="flex flex-wrap gap-2">
                          {lvl.hubs.map((hub) => (
                            <span key={hub} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-600 border border-background-200/70">
                              /{hub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ BANKING STACK ═══════════════ */}
      {activeTab === 'banking' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KOS Banking Stack™ — 6 Couches Industrielles</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Infrastructure de conformité bancaire autonome pour l&apos;Afrique francophone. 17 pays UEMOA + CEMAC, 8 régulateurs, 4 905 outputs/mois.
              </p>
            </div>

            <div className="space-y-3">
              {bankingLayers.map((layer) => {
                const isExpanded = expandedLayer === layer.id;
                return (
                  <div key={layer.id} className={`rounded-xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300 shadow-sm' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedLayer(isExpanded ? null : layer.id)}
                      className="w-full p-4 text-left flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BS_COLORS[layer.id]}15` }}>
                        <i className={`${layer.id === 'BS-L1' ? 'ri-download-cloud-2-line' : layer.id === 'BS-L2' ? 'ri-cpu-line' : layer.id === 'BS-L3' ? 'ri-brain-line' : layer.id === 'BS-L4' ? 'ri-git-branch-line' : layer.id === 'BS-L5' ? 'ri-file-list-3-line' : 'ri-radar-line'} text-lg`} style={{ color: BS_COLORS[layer.id] }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-foreground-950">{layer.name}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase">{layer.status}</span>
                        </div>
                        <p className="text-xs text-foreground-500 mb-2">{layer.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.technologies.map((t) => (
                            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-background-200 text-foreground-500">{t}</span>
                          ))}
                        </div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg flex-shrink-0`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 animate-fade-in">
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          {Object.entries(layer.metrics).map(([k, v]) => (
                            <div key={k} className="rounded-lg bg-background-100 p-3 text-center">
                              <span className="block text-base font-bold text-foreground-950">{v}</span>
                              <span className="text-[10px] text-foreground-400 capitalize">{k.replace(/_/g, ' ')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ DÉPLOIEMENT ═══════════════ */}
      {activeTab === 'deployment' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Déploiement Production — 10 Phases</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Chronologie complète du déploiement du système KOS, de la Phase 1 (Juin 2026) à la Consolidation Finale (22 Juin 2026).
              </p>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Chronologie de Déploiement</h3>
              <div className="space-y-3">
                {deployment.phases.map((phase, i) => (
                  <div key={phase.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${phase.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-background-200 text-foreground-400'}`}>
                        {phase.status === 'completed' ? <i className="ri-check-line" /> : i + 1}
                      </div>
                      {i < deployment.phases.length - 1 && (
                        <div className={`w-0.5 h-8 ${phase.status === 'completed' ? 'bg-emerald-300' : 'bg-background-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground-950">{phase.name}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-background-200 text-foreground-400'}`}>
                          {phase.status === 'completed' ? 'COMPLÉTÉ' : 'EN ATTENTE'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-foreground-400 mt-0.5">
                        <span>{phase.date}</span>
                        <span>{phase.hubs} hubs</span>
                      </div>
                      <p className="text-xs text-foreground-500 mt-1">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Go-Live Checklist */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Go-Live Checklist — 12/12 GO</h3>
              <div className="space-y-2">
                {deployment.goLiveChecklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-white text-xs" />
                    </div>
                    <span className="text-xs font-bold text-foreground-950">{item.item}</span>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">GO</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ KPIS CONSOLIDÉS ═══════════════ */}
      {activeTab === 'kpis' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Banking KPIs */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KPIs Bancaires</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {kpis.banking.map((kpi) => (
                  <div key={kpi.kpi} className="rounded-xl bg-background-50 border border-background-200/70 p-4">
                    <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{kpi.kpi}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-foreground-950">{kpi.value}</span>
                      <span className={`text-[10px] ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-foreground-400'}`}>
                        {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '→'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                      <span>Cible : {kpi.target}</span>
                      <span className={`px-1.5 py-0.5 rounded-full ${
                        kpi.status === 'achieved' ? 'bg-emerald-100 text-emerald-700' :
                        kpi.status === 'exceeded' ? 'bg-[#86BC25]/15 text-[#86BC25]' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {kpi.status === 'achieved' ? 'ATTEINT' : kpi.status === 'exceeded' ? 'DÉPASSÉ' : 'EN COURS'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise KPIs */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KPIs Enterprise</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {kpis.enterprise.map((kpi) => (
                  <div key={kpi.kpi} className="rounded-xl bg-background-50 border border-background-200/70 p-4">
                    <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{kpi.kpi}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-foreground-950">{kpi.value}</span>
                      <span className={`text-[10px] ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-foreground-400'}`}>
                        {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '→'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                      <span>Cible : {kpi.target}</span>
                      <span className={`px-1.5 py-0.5 rounded-full ${
                        kpi.status === 'achieved' ? 'bg-emerald-100 text-emerald-700' :
                        kpi.status === 'exceeded' ? 'bg-[#86BC25]/15 text-[#86BC25]' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {kpi.status === 'achieved' ? 'ATTEINT' : kpi.status === 'exceeded' ? 'DÉPASSÉ' : 'EN COURS'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Production KPIs */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KPIs Production</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {kpis.production.map((kpi) => (
                  <div key={kpi.kpi} className="rounded-xl bg-background-50 border border-background-200/70 p-4">
                    <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{kpi.kpi}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-foreground-950">{kpi.value}</span>
                      <span className={`text-[10px] ${kpi.trend === 'down' && kpi.kpi === 'Build Moyen' ? 'text-emerald-600' : kpi.trend === 'up' ? 'text-emerald-600' : 'text-foreground-400'}`}>
                        {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '→'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                      <span>Cible : {kpi.target}</span>
                      <span className={`px-1.5 py-0.5 rounded-full ${
                        kpi.status === 'achieved' ? 'bg-emerald-100 text-emerald-700' :
                        kpi.status === 'exceeded' ? 'bg-[#86BC25]/15 text-[#86BC25]' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {kpi.status === 'achieved' ? 'ATTEINT' : kpi.status === 'exceeded' ? 'DÉPASSÉ' : 'EN COURS'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ INTERCONNEXIONS ═══════════════ */}
      {activeTab === 'connections' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Interconnexions Système — {interconnections.totalConnections} Flux</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Cartographie des flux de données, d&apos;intelligence, de contrôle et de qualité entre les 12 niveaux Enterprise OS et les 6 couches Banking Stack.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Flux Totaux', value: interconnections.totalConnections, color: '#86BC25' },
                { label: 'Chemins Critiques', value: interconnections.criticalPaths, color: '#DC2626' },
                { label: 'Niveaux OS', value: 12, color: '#0A66C2' },
                { label: 'Couches BS', value: 6, color: '#EA580C' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <span className="block text-xl font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {interconnections.crossSystemFlows.map((flow, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: `${flow.type === 'data_feed' ? '#0A66C2' : flow.type === 'intelligence' ? '#EA580C' : flow.type === 'content' ? '#86BC25' : flow.type === 'control' ? '#DC2626' : flow.type === 'quality' ? '#7C3AED' : flow.type === 'knowledge' ? '#059669' : flow.type === 'command' ? '#CA8A04' : '#0891B2'}15`, color: flow.type === 'data_feed' ? '#0A66C2' : flow.type === 'intelligence' ? '#EA580C' : flow.type === 'content' ? '#86BC25' : flow.type === 'control' ? '#DC2626' : flow.type === 'quality' ? '#7C3AED' : flow.type === 'knowledge' ? '#059669' : flow.type === 'command' ? '#CA8A04' : '#0891B2' }}>
                      {flow.type.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="font-bold text-foreground-950">{flow.from}</span>
                    <i className="ri-arrow-right-line text-foreground-400" />
                    <span className="font-bold text-foreground-950">{flow.to}</span>
                  </div>
                  <p className="text-[11px] text-foreground-500">{flow.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ STATS SYSTÈME ═══════════════ */}
      {activeTab === 'stats' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Statistiques Système Complètes</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Hubs', value: stats.hubs_total, sub: `${stats.hubs_production} en production`, color: '#86BC25' },
                { label: 'Modules', value: stats.modules_totaux, sub: '100% opérationnels', color: '#0A66C2' },
                { label: 'Tables Supabase', value: stats.tables_supabase, sub: 'RLS activée, LIVE', color: '#7C3AED' },
                { label: 'Edge Functions', value: stats.edge_functions, sub: `${stats.edge_functions_actives} actives`, color: '#EA580C' },
                { label: 'Cron Jobs', value: stats.cron_jobs, sub: `${stats.cron_jobs_actifs} actifs, 0 échec`, color: '#DC2626' },
                { label: 'Agents IA', value: stats.agents_ia, sub: `${stats.agents_production} en prod`, color: '#0891B2' },
                { label: 'Agents Optimaux', value: stats.agents_optimaux, sub: '0 supervision', color: '#059669' },
                { label: 'Équipes Auto.', value: stats.equipes_autonomes, sub: 'Toutes Optimal', color: '#CA8A04' },
                { label: 'KPIs Trackés', value: stats.kpis_trackes, sub: `${stats.kpis_a_la_cible} à la cible`, color: '#86BC25' },
                { label: 'Domaines KPI', value: stats.domaines_kpi, sub: '100% couverts', color: '#0A66C2' },
                { label: 'Certifications', value: stats.certifications, sub: 'ISO + Big Four', color: '#7C3AED' },
                { label: 'Pays Couverts', value: stats.pays_couverts, sub: 'UEMOA + CEMAC', color: '#EA580C' },
                { label: 'Régulateurs', value: stats.regulateurs, sub: 'Analyse temps réel', color: '#DC2626' },
                { label: 'Documents KG', value: `${(stats.documents_knowledge_graph / 1000).toFixed(0)}K`, sub: '18 sources', color: '#059669' },
                { label: 'Embeddings', value: `${(stats.embeddings_vectoriels / 1000000).toFixed(0)}M`, sub: 'pgvector', color: '#0891B2' },
                { label: 'StyleSystem', value: stats.stylesystem_coverage, sub: '66 hubs', color: '#CA8A04' },
                { label: 'Score Global', value: '10.0/10', sub: 'CIEL ATTEINT', color: '#86BC25' },
                { label: 'Alertes', value: stats.alertes_actives, sub: 'ZÉRO alerte', color: '#059669' },
                { label: 'Uptime 30j', value: '99.99%', sub: 'Zéro incident', color: '#0A66C2' },
                { label: 'Builds 30j', value: stats.builds_30j, sub: `${stats.deployments_30j} déploiements`, color: '#7C3AED' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <span className="block text-xl font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                  <p className="text-[9px] text-foreground-400 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ GO-LIVE ═══════════════ */}
      {activeTab === 'golive' && showGoLive && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-foreground-950 border border-emerald-500/30 p-8 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
              </div>
              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold mb-6 border border-emerald-500/30">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  GO-LIVE — PRODUCTION COMPLÈTE
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                  KOS Enterprise Operating System™
                </h2>
                <p className="text-emerald-400 text-lg font-bold mb-6">
                  CONSOLIDÉ ET DÉPLOYÉ EN PRODUCTION
                </p>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-8">
                  22 Juin 2026 — Le système KOS est officiellement consolidé et en production complète. 12 niveaux Enterprise OS, 6 couches Banking Stack, 81 hubs, 99 Edge Functions, 75 agents IA. Tout fonctionne en mode RÉEL INTÉGRAL.
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
                  {[
                    { label: 'Hubs', value: '81', color: '#86BC25' },
                    { label: 'Edge Functions', value: '99', color: '#0A66C2' },
                    { label: 'Agents IA', value: '75', color: '#EA580C' },
                    { label: 'Score Global', value: '10.0', color: '#059669' },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl bg-white/5 p-3 text-center">
                      <span className="block text-xl font-bold" style={{ color: m.color }}>{m.value}</span>
                      <span className="text-[10px] text-gray-400">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* ASCII Art */}
                <pre className="text-[9px] text-emerald-400/80 font-mono leading-tight whitespace-pre overflow-x-auto text-left bg-black/30 rounded-xl p-4 max-w-2xl mx-auto">
                  {goLive.systemState}
                </pre>
              </div>
            </div>

            {/* Post Go-Live Actions */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Prochaines Étapes Post-Go-Live</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-background-100 p-4">
                  <i className="ri-settings-3-line text-xl text-[#EA580C] mb-2 block" />
                  <h4 className="text-sm font-bold text-foreground-950 mb-1">Maintenance Proactive</h4>
                  <p className="text-xs text-foreground-500">KOS Self-Improvement Engine™ optimise en continu les 6 boucles d&apos;amélioration</p>
                </div>
                <div className="rounded-xl bg-background-100 p-4">
                  <i className="ri-award-line text-xl text-[#0A66C2] mb-2 block" />
                  <h4 className="text-sm font-bold text-foreground-950 mb-1">ISO 42001 — Q3 2026</h4>
                  <p className="text-xs text-foreground-500">Audit externe gouvernance IA. Tous les agents sont déjà conformes</p>
                </div>
                <div className="rounded-xl bg-background-100 p-4">
                  <i className="ri-global-line text-xl text-[#86BC25] mb-2 block" />
                  <h4 className="text-sm font-bold text-foreground-950 mb-1">Expansion CEMAC</h4>
                  <p className="text-xs text-foreground-500">Ouverture bureau Douala, 3 nouveaux régulateurs, 6 nouveaux pays</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <section className="py-8 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-foreground-950 p-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#86BC25]/15 text-[#86BC25] text-xs font-semibold mb-3 border border-[#86BC25]/20">
              <i className="ri-shield-check-line" />KOS Enterprise Consolidation Command™
            </div>
            <p className="text-white font-bold text-lg mb-2">
              {overview.slogan}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {overview.principles.map((p) => (
                <span key={p} className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/70">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



