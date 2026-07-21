import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useComplianceQualityMax } from '@/hooks/useComplianceQualityMax';
import type { ComplianceQualityUnifiedAutomate } from '@/hooks/useComplianceQualityMax';

function getStatusBadge(status: string) {
  switch (status) {
    case 'deployed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'DÉPLOYÉ', dot: 'bg-emerald-500' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'PARTIEL', dot: 'bg-amber-500' };
    case 'mock': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'MOCK', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

type TabId = 'overview' | 'regulatory' | 'quality' | 'all-automates';

export default function complianceQualityMaxPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const {
    automates, regAutomates, qualAutomates, categoryOverviews, kpis,
    isLive, loading, error, refetch,
    deployedAutomates, partialAutomates, criticalAutomates,
  } = useComplianceQualityMax();

  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [systemFilter, setSystemFilter] = useState<'all' | 'regulatory' | 'quality'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'deployed' | 'partial'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAutomates = useMemo(() => {
    let list = automates;
    if (systemFilter !== 'all') list = list.filter(a => a.system === systemFilter);
    if (statusFilter !== 'all') list = list.filter(a => a.status === statusFilter);
    return list;
  }, [automates, systemFilter, statusFilter]);

  const regCategories = useMemo(() => categoryOverviews.filter(c => c.system === 'regulatory'), [categoryOverviews]);
  const qualCategories = useMemo(() => categoryOverviews.filter(c => c.system === 'quality'), [categoryOverviews]);

  const gciColor = kpis.global_compliance_index >= 90 ? '#86BC25' : kpis.global_compliance_index >= 80 ? '#E8C547' : '#DC2626';
  const gciLabel = kpis.global_compliance_index >= 90 ? 'EXCELLENCE' : kpis.global_compliance_index >= 80 ? 'CONFORME' : 'RENFORCEMENT';

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: '48' },
    { id: 'regulatory', label: 'Conformité (24)', icon: 'ri-shield-check-line', count: '24' },
    { id: 'quality', label: 'Qualité Totale (24)', icon: 'ri-medal-line', count: '24' },
    { id: 'all-automates', label: 'Tous (48)', icon: 'ri-stack-line', count: '48' },
  ];

  return (
    <hubLayout hubId={300}>
      <SeoHead
        title="KOS Compliance & Quality MAX™ — 48 Automates Conformité & Excellence | KHEPRA EXPERTS"
        description="Cockpit unifié des 48 automates Conformité Réglementaire & Qualité Totale KOS : BCEAO, COBAC, OHADA, GAFI, ISO 9001, TQM, audits, certifications. Score global de conformité. 256K+ tâches, 16 domaines."
        keywords="KOS Compliance Quality MAX, conformité réglementaire, qualité totale, ISO 9001, BCEAO COBAC, TQM, KHEPRA EXPERTS"
        canonicalPath="/kos-compliance-quality-max"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Epic%20cinematic%20dual%20hemisphere%20visualization%20with%20emerald%20and%20indigo%20glowing%20interconnected%20compliance%20and%20quality%20nodes%20forming%20a%20unified%20shield%20pattern%2C%20left%20hemisphere%20representing%20regulatory%20compliance%20with%20scales%20and%20shields%20motifs%2C%20right%20hemisphere%20representing%20total%20quality%20with%20PDCA%20cycles%20and%20certification%20badges%2C%20dramatic%20volumetric%20lighting%20with%20golden%20rays%20piercing%20through%20dark%20atmosphere%2C%20sophisticated%20corporate%20governance%20aesthetic%20with%20precise%20geometric%20patterns%20and%20data%20streams%20cascading%20between%20both%20hemispheres%2C%20abstract%20high%20tech%20command%20center%20with%20pulsating%20energy%20nodes%20symbolizing%20maximum%20compliance%20and%20quality%2C%20no%20text%20no%20human%20figures%2C%20hyper%20realistic%208K%20render%20with%20deep%20shadows%20and%20intense%20contrast&width=1920&height=700&seq=kos-compqual-max-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/30 border border-emerald-500/40 backdrop-blur-sm">
                  <i className="ri-shield-check-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                    KOS Compliance & Quality MAX™
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                  isLive ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-amber-500/20 border-amber-400/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Compliance & Quality.
                <span className="block text-emerald-400 mt-2">48 automates. Un seul cockpit.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                <strong className="text-white">{kpis.total_automates} automates</strong> unifiés :{' '}
                <strong className="text-emerald-400">{kpis.regulatory_total} veille réglementaire & conformité</strong> +{' '}
                <strong className="text-indigo-400">{kpis.quality_total} organisation & qualité totale</strong>.{' '}
                <strong className="text-white">{formatNumber(kpis.regulatory_tasks + kpis.quality_tasks)}+ tâches</strong> complétées sur{' '}
                <strong className="text-white">16 domaines</strong>. Score global :{' '}
                <strong className="text-emerald-400">{kpis.global_compliance_index}/100</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {kpis.total_deployed} Déployés
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs text-amber-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {kpis.total_partial} Partiels
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-xs text-red-300 font-bold">
                  <i className="ri-error-warning-line text-xs" />
                  {kpis.total_critical} Critiques
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-xs text-teal-300 font-bold">
                  <i className="ri-refresh-line text-xs" />
                  {kpis.total_auto} Auto
                </span>
              </div>
            </div>

            {/* GCI Score Card */}
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Global Compliance Index</span>
              <div className="relative inline-flex mt-3 mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={gciColor} strokeWidth="5"
                    strokeDasharray={`${(kpis.global_compliance_index / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white font-heading">{kpis.global_compliance_index}</span>
                  <span className="text-[9px] text-gray-400">/100</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${gciColor}20`, color: gciColor, border: `1px solid ${gciColor}40` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: gciColor }} />
                {gciLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {[
              { label: 'Total', value: '48', icon: 'ri-stack-line', color: '#86BC25' },
              { label: 'Déployés', value: String(kpis.total_deployed), icon: 'ri-checkbox-circle-line', color: '#059669' },
              { label: 'Partiels', value: String(kpis.total_partial), icon: 'ri-time-line', color: '#E8C547' },
              { label: 'Critiques', value: String(kpis.total_critical), icon: 'ri-error-warning-line', color: '#DC2626' },
              { label: 'Auto', value: String(kpis.total_auto), icon: 'ri-refresh-line', color: '#0EA5E9' },
              { label: 'Tâches', value: formatNumber(kpis.regulatory_tasks + kpis.quality_tasks), icon: 'ri-task-line', color: '#BE123C' },
              { label: 'Audits', value: formatNumber(kpis.total_audits), icon: 'ri-search-eye-line', color: '#8B5CF6' },
              { label: 'Juridictions', value: String(kpis.jurisdictions_covered), icon: 'ri-global-line', color: '#EA580C' },
              { label: 'Score Qualité', value: kpis.overall_quality_score + '/100', icon: 'ri-medal-line', color: '#6366F1' },
              { label: 'GCI', value: String(kpis.global_compliance_index), icon: 'ri-shield-check-line', color: gciColor },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-[10px] mb-0.5 block`} style={{ color: stat.color }} />
                <span className="block text-sm font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[9px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LOADING / ERROR ============ */}
      {loading && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-background-200 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-sm text-foreground-500">Chargement des 48 automates Compliance & Quality MAX...</p>
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
              <i className="ri-error-warning-line text-red-600 text-2xl" />
            </div>
            <p className="text-sm text-foreground-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500 max-w-md text-center">{error}</p>
            <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-2" />Réessayer
            </button>
          </div>
        </section>
      )}

      {/* ============ TAB NAVIGATION ============ */}
      {!loading && !error && (
        <>
          <section className="sticky top-20 z-30 bg-white border-b border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-1 py-2 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-foreground-950 text-white'
                        : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                    }`}
                  >
                    <i className={`${tab.icon} text-xs`} />
                    {tab.label}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ============ TAB: OVERVIEW ============ */}
          {activeTab === 'overview' && (
            <>
              {/* Dual System Comparison */}
              <section className="py-10 sm:py-14 bg-background-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-8">
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                      Deux Systèmes. Une Excellence.
                    </h2>
                    <p className="text-foreground-600">Conformité Réglementaire × Qualité Totale : 48 automates orchestrés pour une excellence sans compromis.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Regulatory Side */}
                    <div className="rounded-2xl bg-white border border-emerald-200 p-6 sm:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-100">
                          <i className="ri-shield-check-line text-2xl text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-foreground-950">Conformité Réglementaire</h3>
                          <p className="text-sm text-emerald-600 font-bold">{kpis.regulatory_total} automates · 8 domaines</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        {[
                          { label: 'Déployés', value: String(kpis.regulatory_deployed), color: '#059669' },
                          { label: 'Partiels', value: String(kpis.regulatory_partial), color: '#E8C547' },
                          { label: 'Succès', value: kpis.regulatory_success_rate + '%', color: '#86BC25' },
                          { label: 'Tâches', value: formatNumber(kpis.regulatory_tasks), color: '#EA580C' },
                        ].map(s => (
                          <div key={s.label} className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-3 text-center">
                            <span className="block text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                            <span className="text-[10px] text-foreground-500">{s.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {regCategories.map(cat => {
                          const deployPct = cat.agents_count > 0 ? Math.round((cat.deployed / cat.agents_count) * 100) : 0;
                          return (
                            <div key={cat.id} className="flex items-center gap-3 p-2 rounded-lg bg-background-50 border border-background-100">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                                <i className={`${cat.icon} text-sm`} style={{ color: cat.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[11px] font-bold text-foreground-800 block">{cat.name}</span>
                                <div className="flex items-center gap-2 text-[10px]">
                                  <span className="text-emerald-600 font-bold">{cat.deployed}/{cat.agents_count} déployés</span>
                                  {cat.partial > 0 && <span className="text-amber-600">{cat.partial} partiels</span>}
                                </div>
                              </div>
                              <div className="w-16 h-1.5 rounded-full bg-background-200 overflow-hidden">
                                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${deployPct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quality Side */}
                    <div className="rounded-2xl bg-white border border-indigo-200 p-6 sm:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-indigo-100">
                          <i className="ri-medal-line text-2xl text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-foreground-950">Qualité Totale</h3>
                          <p className="text-sm text-indigo-600 font-bold">{kpis.quality_total} automates · 8 domaines</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        {[
                          { label: 'Déployés', value: String(kpis.quality_deployed), color: '#6366F1' },
                          { label: 'Partiels', value: String(kpis.quality_partial), color: '#F59E0B' },
                          { label: 'Succès', value: kpis.quality_success_rate + '%', color: '#10B981' },
                          { label: 'Tâches', value: formatNumber(kpis.quality_tasks), color: '#EC4899' },
                        ].map(s => (
                          <div key={s.label} className="rounded-xl bg-indigo-50/50 border border-indigo-100 p-3 text-center">
                            <span className="block text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                            <span className="text-[10px] text-foreground-500">{s.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {qualCategories.map(cat => {
                          const deployPct = cat.agents_count > 0 ? Math.round((cat.deployed / cat.agents_count) * 100) : 0;
                          return (
                            <div key={cat.id} className="flex items-center gap-3 p-2 rounded-lg bg-background-50 border border-background-100">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                                <i className={`${cat.icon} text-sm`} style={{ color: cat.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[11px] font-bold text-foreground-800 block">{cat.name}</span>
                                <div className="flex items-center gap-2 text-[10px]">
                                  <span className="text-emerald-600 font-bold">{cat.deployed}/{cat.agents_count} déployés</span>
                                  {cat.partial > 0 && <span className="text-amber-600">{cat.partial} partiels</span>}
                                </div>
                              </div>
                              <div className="w-16 h-1.5 rounded-full bg-background-200 overflow-hidden">
                                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${deployPct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Critical Automates Alert */}
              {criticalAutomates.length > 0 && (
                <section className="py-6 sm:py-8 bg-red-50/30 border-y border-red-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                          <i className="ri-error-warning-line text-red-600 text-lg" />
                        </div>
                        <div>
                          <h3 className="font-heading text-base font-bold text-red-800">{kpis.total_critical} Automates Critiques</h3>
                          <p className="text-xs text-red-600">Nécessitent une action immédiate pour atteindre le niveau MAX de conformité.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {criticalAutomates.map(a => (
                        <span key={a.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 border border-red-200 text-xs font-bold text-red-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          {a.name}
                          <span className="text-[9px] text-red-400 ml-1">{a.system === 'regulatory' ? 'RÉG' : 'QUAL'}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Cross-domain stats */}
              <section className="py-8 sm:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Juridictions Couvertes', value: String(kpis.jurisdictions_covered), sub: 'BCEAO · COBAC · OHADA · GAFI · CEMAC · UE · AMF', icon: 'ri-global-line', color: '#EA580C' },
                      { label: 'Obligations Suivies', value: formatNumber(kpis.obligations_tracked), sub: 'Registre des obligations réglementaires', icon: 'ri-list-check', color: '#059669' },
                      { label: 'Audits Qualité Complétés', value: formatNumber(kpis.total_audits), sub: 'ISO 9001 + audits internes + contrôles', icon: 'ri-search-eye-line', color: '#8B5CF6' },
                      { label: 'Certifications Maintenues', value: String(kpis.total_certifications), sub: 'ISO 9001 · ISO 27001 · ISO 37001 · Sectorielles', icon: 'ri-award-line', color: '#EC4899' },
                    ].map(stat => (
                      <div key={stat.label} className="rounded-2xl bg-white border border-background-200 p-5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${stat.color}15` }}>
                          <i className={`${stat.icon} text-lg`} style={{ color: stat.color }} />
                        </div>
                        <span className="block text-2xl font-bold text-foreground-950 font-heading">{stat.value}</span>
                        <span className="text-sm font-bold text-foreground-800 block mt-0.5">{stat.label}</span>
                        <p className="text-[10px] text-foreground-400 mt-1">{stat.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ============ TAB: REGULATORY ============ */}
          {activeTab === 'regulatory' && (
            <section className="py-8 sm:py-10 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                    {kpis.regulatory_total} Automates — Conformité Réglementaire
                  </h2>
                  <p className="text-foreground-600">8 domaines : veille, analyse d'impact, conformité documentaire, audit, reporting, risques, formation, architecture juridique.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {regCategories.map(cat => {
                    const deployPct = cat.agents_count > 0 ? Math.round((cat.deployed / cat.agents_count) * 100) : 0;
                    return (
                      <div key={cat.id} className="rounded-2xl bg-white border border-background-200 p-4 text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                          <i className={`${cat.icon} text-lg`} style={{ color: cat.color }} />
                        </div>
                        <h4 className="text-xs font-bold text-foreground-950 mb-1">{cat.name}</h4>
                        <div className="flex items-center justify-center gap-1.5 text-[10px]">
                          <span className="text-emerald-600 font-bold">{cat.deployed}/{cat.agents_count}</span>
                          <span className="text-foreground-400">déployés</span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-background-100 mt-2 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${deployPct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  {regAutomates.map(a => {
                    const badge = getStatusBadge(a.status);
                    const isExpanded = expandedId === a.id;
                    return (
                      <div key={a.id} className={`rounded-xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                        <button onClick={() => setExpandedId(isExpanded ? null : a.id)} className="w-full p-4 text-left flex items-center gap-3 cursor-pointer">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${a.color}15` }}>
                            <i className={`${a.icon} text-sm`} style={{ color: a.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-sm font-bold text-foreground-850">{a.name}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                                {badge.label}
                              </span>
                              {a.priority === 'critical' && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold">CRITIQUE</span>
                              )}
                            </div>
                            <p className="text-[11px] text-foreground-500 line-clamp-1">{a.description}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs flex-shrink-0">
                            <span className={`font-bold font-heading ${a.success_rate >= 90 ? 'text-emerald-600' : a.success_rate >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                              {a.success_rate}%
                            </span>
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-background-100 pt-3">
                            <p className="text-xs text-foreground-600 mb-3">{a.description}</p>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {a.capabilities.slice(0, 6).map(cap => (
                                <span key={cap} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{cap}</span>
                              ))}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                              <span><i className="ri-git-branch-line mr-0.5" />{a.version}</span>
                              <span>{a.tasks_completed.toLocaleString()} tâches</span>
                              {a.auto_enabled && <span className="text-emerald-600"><i className="ri-refresh-line mr-0.5" />Auto</span>}
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

          {/* ============ TAB: QUALITY ============ */}
          {activeTab === 'quality' && (
            <section className="py-8 sm:py-10 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                    {kpis.quality_total} Automates — Qualité Totale
                  </h2>
                  <p className="text-foreground-600">8 domaines : organisation, TQM, audit qualité, contrôle livrables, amélioration continue, traçabilité, métriques, certification.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {qualCategories.map(cat => {
                    const deployPct = cat.agents_count > 0 ? Math.round((cat.deployed / cat.agents_count) * 100) : 0;
                    return (
                      <div key={cat.id} className="rounded-2xl bg-white border border-background-200 p-4 text-center">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                          <i className={`${cat.icon} text-lg`} style={{ color: cat.color }} />
                        </div>
                        <h4 className="text-xs font-bold text-foreground-950 mb-1">{cat.name}</h4>
                        <div className="flex items-center justify-center gap-1.5 text-[10px]">
                          <span className="text-emerald-600 font-bold">{cat.deployed}/{cat.agents_count}</span>
                          <span className="text-foreground-400">déployés</span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-background-100 mt-2 overflow-hidden">
                          <div className="h-full rounded-full bg-indigo-500" style={{ width: `${deployPct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  {qualAutomates.map(a => {
                    const badge = getStatusBadge(a.status);
                    const isExpanded = expandedId === a.id;
                    return (
                      <div key={a.id} className={`rounded-xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                        <button onClick={() => setExpandedId(isExpanded ? null : a.id)} className="w-full p-4 text-left flex items-center gap-3 cursor-pointer">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${a.color}15` }}>
                            <i className={`${a.icon} text-sm`} style={{ color: a.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-sm font-bold text-foreground-850">{a.name}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                                {badge.label}
                              </span>
                              {a.priority === 'critical' && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold">CRITIQUE</span>
                              )}
                            </div>
                            <p className="text-[11px] text-foreground-500 line-clamp-1">{a.description}</p>
                          </div>
                          <div className="flex items-center gap-3 text-xs flex-shrink-0">
                            {(a.quality_score || 0) > 0 && (
                              <span className="font-bold text-indigo-600 font-heading">{a.quality_score}/100</span>
                            )}
                            <span className={`font-bold font-heading ${a.success_rate >= 90 ? 'text-emerald-600' : a.success_rate >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                              {a.success_rate}%
                            </span>
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-background-100 pt-3">
                            <p className="text-xs text-foreground-600 mb-3">{a.description}</p>
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              {(a.audits_completed || 0) > 0 && (
                                <div className="rounded-lg bg-background-50 border border-background-100 p-2 text-center">
                                  <span className="block text-sm font-bold text-foreground-950">{formatNumber(a.audits_completed!)}</span>
                                  <span className="text-[9px] text-foreground-400">Audits</span>
                                </div>
                              )}
                              {(a.non_conformities_detected || 0) > 0 && (
                                <div className="rounded-lg bg-background-50 border border-background-100 p-2 text-center">
                                  <span className="block text-sm font-bold text-red-600">{formatNumber(a.non_conformities_detected!)}</span>
                                  <span className="text-[9px] text-foreground-400">NC</span>
                                </div>
                              )}
                              {(a.processes_managed || 0) > 0 && (
                                <div className="rounded-lg bg-background-50 border border-background-100 p-2 text-center">
                                  <span className="block text-sm font-bold text-indigo-600">{formatNumber(a.processes_managed!)}</span>
                                  <span className="text-[9px] text-foreground-400">Processus</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {a.capabilities.slice(0, 6).map(cap => (
                                <span key={cap} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{cap}</span>
                              ))}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                              <span><i className="ri-git-branch-line mr-0.5" />{a.version}</span>
                              <span>{a.tasks_completed.toLocaleString()} tâches</span>
                              {a.auto_enabled && <span className="text-emerald-600"><i className="ri-refresh-line mr-0.5" />Auto</span>}
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

          {/* ============ TAB: ALL AUTOMATES ============ */}
          {activeTab === 'all-automates' && (
            <section className="py-8 sm:py-10 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground-950">
                      {filteredAutomates.length} Automate{filteredAutomates.length > 1 ? 's' : ''}
                    </h2>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setSystemFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${systemFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>
                      Tous (48)
                    </button>
                    <button onClick={() => setSystemFilter('regulatory')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${systemFilter === 'regulatory' ? 'bg-emerald-600 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>
                      Réglementaires ({kpis.regulatory_total})
                    </button>
                    <button onClick={() => setSystemFilter('quality')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${systemFilter === 'quality' ? 'bg-indigo-600 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>
                      Qualité ({kpis.quality_total})
                    </button>
                    <span className="text-foreground-300 self-center">|</span>
                    <button onClick={() => setStatusFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>
                      Tous
                    </button>
                    <button onClick={() => setStatusFilter('deployed')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'deployed' ? 'bg-emerald-600 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>
                      Déployés ({kpis.total_deployed})
                    </button>
                    <button onClick={() => setStatusFilter('partial')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'partial' ? 'bg-amber-600 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>
                      Partiels ({kpis.total_partial})
                    </button>
                  </div>
                </div>

                {filteredAutomates.length === 0 ? (
                  <div className="text-center py-16">
                    <i className="ri-inbox-line text-5xl text-foreground-200 mb-4 block" />
                    <p className="text-foreground-400">Aucun automate ne correspond aux filtres.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {filteredAutomates.map(a => {
                      const badge = getStatusBadge(a.status);
                      const scoreColor = a.success_rate >= 90 ? '#86BC25' : a.success_rate >= 80 ? '#E8C547' : '#DC2626';
                      return (
                        <div key={`${a.system}-${a.id}`} className="rounded-xl bg-white border border-background-200 p-4 hover:border-foreground-200 hover:shadow-sm transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${a.color}15` }}>
                              <i className={`${a.icon} text-xs`} style={{ color: a.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-bold text-foreground-850 block truncate">{a.name}</span>
                            </div>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${a.system === 'regulatory' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                              {a.system === 'regulatory' ? 'RÉG' : 'QUAL'}
                            </span>
                          </div>
                          <p className="text-[11px] text-foreground-500 line-clamp-2 mb-2">{a.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                                {badge.label}
                              </span>
                              {a.priority === 'critical' && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold">P0</span>
                              )}
                            </div>
                            <span className="text-xs font-bold font-heading" style={{ color: scoreColor }}>{a.success_rate}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}

      {/* ============ CROSS-LINKS ============ */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème Compliance & Qualité
            </h2>
            <p className="text-foreground-600">Accès direct aux pages détaillées de chaque système et aux modules connexes.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Compliance & Quality MAX', path: '/kos-compliance-quality-max', icon: 'ri-shield-check-line', color: '#86BC25', current: true },
              { label: 'Regulatory Automates', path: '/kos-regulatory-compliance-automates', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Organisation & Qualité', path: '/kos-organisation-qualite-automates', icon: 'ri-medal-line', color: '#6366F1' },
              { label: 'Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-star-line', color: '#8B5CF6' },
              { label: 'Quality Excellence', path: '/kos-quality-excellence-command', icon: 'ri-star-line', color: '#F59E0B' },
              { label: 'Correction Engine', path: '/kos-correction-engine', icon: 'ri-tools-line', color: '#BE123C' },
              { label: 'AI Governance', path: '/kos-ai-governance-ethics', icon: 'ri-scales-line', color: '#8B3040' },
              { label: 'Enterprise Governance', path: '/kos-enterprise-governance-command', icon: 'ri-building-2-line', color: '#9B7B2C' },
              { label: 'Risk & Diligence', path: '/kos-risk-diligence-command', icon: 'ri-alert-line', color: '#DC2626' },
              { label: 'Global Launch System', path: '/kos-global-launch', icon: 'ri-rocket-2-line', color: '#BE123C' },
              { label: 'Performance SEO', path: '/kos-performance-seo-command', icon: 'ri-speed-up-line', color: '#0D7B5F' },
              { label: 'Managing Partner', path: '/kos-managing-partner-office', icon: 'ri-user-star-line', color: '#EC4899' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-3 text-center hover:shadow-md transition-all cursor-pointer block ${
                link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
              }`}>
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{link.label}</span>
                {link.current && <span className="block text-[8px] text-emerald-700 font-bold mt-0.5">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





