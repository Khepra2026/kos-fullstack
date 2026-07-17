import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSCommandementOperationnel } from '@/hooks/useKOSCommandementOperationnel';
import type { KOSAutomateFamily, KOSUnifiedGlobalKPIs } from '@/hooks/useKOSCommandementOperationnel';

function formatCurrency(value: number) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + ' M€';
  if (value >= 1000) return (value / 1000).toFixed(1) + ' K€';
  return value + ' €';
}

function formatNumber(value: number) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
  return String(value);
}

const DOMAIN_LABELS: Record<string, { label: string; color: string }> = {
  'front-office': { label: 'Front Office', color: '#5B8C2A' },
  'croissance': { label: 'Croissance', color: '#EA580C' },
  'production': { label: 'Production', color: '#BE123C' },
  'qualite': { label: 'Qualité', color: '#6366F1' },
  'technique': { label: 'Technique', color: '#14B8A6' },
};

const DOMAIN_FILTER: Record<string, string> = {
  'front-office': 'Front Office',
  'croissance': 'Croissance',
  'production': 'Production',
  'qualite': 'Qualité & Conformité',
  'technique': 'Infrastructure',
};

export default function KOSCommandementOperationnelUnifiePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const { families, globalKPIs, operationalChain, benchmarks, isLive, loading, error, refetch } = useKOSCommandementOperationnel();
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const filteredFamilies = useMemo(() => {
    if (domainFilter === 'all') return families;
    return families.filter(f => f.domain === domainFilter);
  }, [families, domainFilter]);

  const domainFamilies = useMemo(() => {
    const map: Record<string, KOSAutomateFamily[]> = {};
    families.forEach(f => {
      if (!map[f.domain]) map[f.domain] = [];
      map[f.domain].push(f);
    });
    return map;
  }, [families]);

  const totalRevenue = families.reduce((s, f) => s + f.revenue_influenced, 0);

  return (
    <KOSHubLayout hubId={99}>
      <SeoHead
        title="KOS Commandement Opérationnel Unifié™ — Cockpit Big Four | KHEPRA EXPERTS"
        description="Centre de commandement opérationnel unifié KOS : 11 familles d'automates, 261+ agents, 69.5M€ de revenu influencé. KPIs niveau Big Four, cadre opérationnel complet, déploiement en temps réel."
        keywords="KOS Commandement Opérationnel, cockpit KOS, automates KOS, Big Four, KHEPRA EXPERTS, déploiement automates"
        canonicalPath="/kos-commandement-operationnel-unifie"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* ============ HERO ============ */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20unified%20command%20center%20atmosphere%20with%20warm%20gold%20and%20emerald%20tones%2C%20elegant%20geometric%20patterns%20suggesting%20interconnected%20operational%20nodes%20and%20automated%20workflows%2C%20sophisticated%20Big%20Four%20consulting%20operational%20headquarters%20aesthetic%20with%20concentric%20circles%20and%20network%20topology%20motifs%2C%20premium%20executive%20dashboard%20ambiance%20with%20data%20flow%20visualization%2C%20no%20text%20no%20human%20figures%2C%20modern%20consulting%20command%20center%20aesthetic%20with%20glowing%20interconnected%20nodes&width=1920&height=700&seq=kos-unified-cockpit-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/75 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-government-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Commandement Opérationnel Unifié™
                </span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                isLive ? 'bg-emerald-500/20 border border-emerald-400/30' : 'bg-amber-500/20 border border-amber-400/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                </span>
              </div>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              261 automates. 11 familles.
              <span className="block text-amber-400 mt-2">Un seul cockpit. Niveau Big Four.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Le <strong className="text-white">KOS Commandement Opérationnel Unifié</strong> fédère l&apos;intégralité des forces automatisées Khepra.{' '}
              <strong className="text-white">{globalKPIs.total_agents} agents</strong> répartis sur{' '}
              <strong className="text-white">{globalKPIs.total_families} familles</strong>,{' '}
              <strong className="text-white">{formatNumber(globalKPIs.total_tasks)}+ tâches</strong> exécutées pour{' '}
              <strong className="text-white">{formatCurrency(totalRevenue)}</strong> de revenu influencé.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-300 font-semibold">{globalKPIs.deployed} Déployés</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs text-amber-300 font-semibold">{globalKPIs.partial} Partiels</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-xs text-emerald-300 font-semibold">{globalKPIs.avg_success_rate}% succès</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                <i className="ri-error-warning-line text-red-400 text-xs" />
                <span className="text-xs text-red-300 font-semibold">{globalKPIs.critical} Critiques</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="text-xs text-amber-300 font-semibold">Uptime {globalKPIs.avg_uptime}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GLOBAL KPIs BAR ============ */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {[
              { label: 'Familles', value: String(globalKPIs.total_families), icon: 'ri-stack-line', color: '#F59E0B' },
              { label: 'Agents', value: String(globalKPIs.total_agents), icon: 'ri-robot-line', color: '#5B8C2A' },
              { label: 'Déployés', value: String(globalKPIs.deployed), icon: 'ri-checkbox-circle-line', color: '#86BC25' },
              { label: 'Partiels', value: String(globalKPIs.partial), icon: 'ri-time-line', color: '#E8C547' },
              { label: 'Auto', value: String(globalKPIs.auto_enabled), icon: 'ri-refresh-line', color: '#EA580C' },
              { label: 'Tâches', value: formatNumber(globalKPIs.total_tasks), icon: 'ri-stack-line', color: '#0D7B5F' },
              { label: 'Succès', value: globalKPIs.avg_success_rate + '%', icon: 'ri-line-chart-line', color: '#86BC25' },
              { label: 'Revenue', value: formatCurrency(totalRevenue), icon: 'ri-funds-line', color: '#BE123C' },
              { label: 'Critiques', value: String(globalKPIs.critical), icon: 'ri-error-warning-line', color: '#DC2626' },
              { label: 'Uptime', value: globalKPIs.avg_uptime + '%', icon: 'ri-cloud-line', color: '#14B8A6' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-xs mb-0.5 block`} style={{ color: stat.color }} />
                <span className="block text-base font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[9px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CADRE OPÉRATIONNEL ============ */}
      <section className="py-10 sm:py-14 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-4">
              <i className="ri-government-line text-amber-600 text-sm" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Cadre Opérationnel Big Four</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Les 5 Phases du Cycle Opérationnel KOS
            </h2>
            <p className="text-foreground-600">De l&apos;acquisition client à la sécurité infrastructure, chaque phase mobilise des familles d&apos;automates coordonnées.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-background-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {operationalChain.map((phase, idx) => {
                const phaseFamilies = families.filter(f => phase.families.includes(f.id));
                const deployedSum = phaseFamilies.reduce((s, f) => s + f.deployed, 0);
                const totalSum = phaseFamilies.reduce((s, f) => s + f.agents_total, 0);
                const isExpanded = expandedPhase === phase.id;

                return (
                  <div key={phase.id}>
                    <button
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                      className="relative rounded-xl bg-white border border-background-200 p-4 text-left w-full hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: phase.color }}>
                        {idx + 1}
                      </div>
                      <div className="w-10 h-10 mx-auto mb-2 mt-1 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${phase.color}15` }}>
                        <i className={`${phase.icon} text-lg`} style={{ color: phase.color }} />
                      </div>
                      <h3 className="text-xs font-bold text-foreground-950 mb-1 text-center">{phase.name}</h3>
                      <p className="text-[10px] text-foreground-500 line-clamp-2 mb-2">{phase.description}</p>
                      <div className="flex items-center justify-center gap-2 text-[10px]">
                        <span style={{ color: '#86BC25' }} className="font-bold">{deployedSum}/{totalSum}</span>
                        <span className="text-foreground-400">{phaseFamilies.length} familles</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-background-100 mt-2 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${totalSum > 0 ? Math.round((deployedSum / totalSum) * 100) : 0}%`, backgroundColor: '#86BC25' }} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="mt-2 px-3 py-2 rounded-lg bg-white border border-background-200">
                        <div className="flex flex-wrap gap-1.5">
                          {phaseFamilies.map(f => (
                            <a
                              key={f.id}
                              href={f.route || '#'}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border cursor-pointer hover:shadow-sm transition-all whitespace-nowrap ${
                                f.route ? 'bg-background-50 border-background-200 text-foreground-700 hover:border-foreground-300' : 'bg-background-50 border-dashed border-background-200 text-foreground-400'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: f.color }} />
                              {f.name}
                              {!f.route && <span className="text-foreground-300 ml-0.5">(soon)</span>}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOMAIN FILTER ============ */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">Domaine</span>
            <button onClick={() => setDomainFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${domainFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'}`}>
              Tout ({families.length})
            </button>
            {Object.entries(DOMAIN_FILTER).map(([key, label]) => (
              <button key={key} onClick={() => setDomainFilter(key)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${domainFilter === key ? 'text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'}`} style={domainFilter === key ? { backgroundColor: DOMAIN_LABELS[key]?.color || '#5B8C2A' } : {}}>
                {label} ({families.filter(f => f.domain === key).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAMILY GRID ============ */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-background-200 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-sm text-foreground-500">Agrégation des {globalKPIs.total_families} familles d&apos;automates KOS...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
                <i className="ri-error-warning-line text-red-600 text-2xl" />
              </div>
              <p className="text-sm text-foreground-700 font-medium">Erreur d&apos;agrégation</p>
              <p className="text-xs text-foreground-500 max-w-md text-center">{error}</p>
              <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-refresh-line mr-2" />Réessayer
              </button>
              <p className="text-xs text-foreground-400 mt-2">Affichage des données mock en secours</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground-950">
                  {filteredFamilies.length} Famille{filteredFamilies.length > 1 ? 's' : ''} d&apos;Automates
                  {domainFilter !== 'all' && <span className="text-foreground-400 font-normal"> — {DOMAIN_FILTER[domainFilter]}</span>}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground-400">{formatNumber(globalKPIs.total_tasks)} tâches cumulées</span>
                  <span className="w-1 h-1 rounded-full bg-background-300" />
                  <span className="text-xs text-foreground-400">{globalKPIs.active_families}/{globalKPIs.total_families} familles actives</span>
                </div>
              </div>

              {filteredFamilies.length === 0 ? (
                <div className="text-center py-16">
                  <i className="ri-inbox-line text-5xl text-foreground-200 mb-4 block" />
                  <p className="text-foreground-400">Aucune famille ne correspond au filtre.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredFamilies.map((family: KOSAutomateFamily) => {
                    const deployPct = family.agents_total > 0 ? Math.round((family.deployed / family.agents_total) * 100) : 0;
                    const benchmark = benchmarks.family_readiness.find(b => b.family === family.id);
                    const domainInfo = DOMAIN_LABELS[family.domain] || { label: family.domain, color: '#5B8C2A' };
                    const successColor = family.success_rate >= 90 ? '#86BC25' : family.success_rate >= 80 ? '#E8C547' : '#DC2626';

                    return (
                      <div key={family.id} className="rounded-2xl border border-background-200 bg-white hover:shadow-md transition-all overflow-hidden">
                        {/* Header */}
                        <div className="p-5">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${family.color}15` }}>
                              <i className={`${family.icon} text-xl`} style={{ color: family.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-sm font-bold text-foreground-950">{family.name}</h3>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${domainInfo.color}15`, color: domainInfo.color, borderColor: `${domainInfo.color}40`, borderWidth: 1 }}>
                                  {domainInfo.label}
                                </span>
                              </div>
                              <p className="text-xs text-foreground-500 line-clamp-2">{family.description}</p>
                            </div>
                          </div>

                          {/* Deployment bar */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[10px] mb-1">
                              <span className="text-foreground-400">Déploiement</span>
                              <span className="font-bold" style={{ color: deployPct >= 67 ? '#86BC25' : deployPct >= 50 ? '#E8C547' : '#DC2626' }}>{deployPct}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${deployPct}%`, backgroundColor: deployPct >= 67 ? '#86BC25' : deployPct >= 50 ? '#E8C547' : '#DC2626' }} />
                            </div>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className="text-foreground-400">{family.deployed} déployés / {family.agents_total} agents</span>
                              <span className="text-foreground-400">{family.partial} partiels</span>
                            </div>
                          </div>

                          {/* KPIs */}
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            <div className="text-center p-2 rounded-lg bg-background-50">
                              <span className="block text-xs font-bold font-heading" style={{ color: successColor }}>{family.success_rate}%</span>
                              <span className="text-[9px] text-foreground-400">Succès</span>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-background-50">
                              <span className="block text-xs font-bold font-heading text-foreground-950">{formatNumber(family.tasks_completed)}</span>
                              <span className="text-[9px] text-foreground-400">Tâches</span>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-background-50">
                              <span className="block text-xs font-bold font-heading text-foreground-950">{family.critical}</span>
                              <span className="text-[9px] text-foreground-400">Critiques</span>
                            </div>
                          </div>

                          {/* Family-specific KPIs */}
                          {family.kpis.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {family.kpis.map((kpi, j) => (
                                <span key={j} className="inline-flex items-center gap-1 text-[9px] px-2 py-1 rounded-full bg-background-100 text-foreground-600">
                                  <i className={`${kpi.icon} text-[9px]`} style={{ color: family.color }} />
                                  {kpi.label}: <strong className="text-foreground-800">{kpi.value}</strong>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Revenue */}
                          {family.revenue_influenced > 0 && (
                            <div className="mt-3 flex items-center gap-1.5 text-xs">
                              <i className="ri-funds-line" style={{ color: '#86BC25' }} />
                              <span className="text-emerald-700 font-bold">{formatCurrency(family.revenue_influenced)}</span>
                              <span className="text-foreground-400">revenu influencé</span>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-2.5 border-t border-background-100 flex items-center justify-between bg-background-50">
                          <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                            <span className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${family.auto_enabled > family.agents_total * 0.5 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              {family.auto_enabled}/{family.agents_total} auto
                            </span>
                            {benchmark && (
                              <span className="flex items-center gap-1">
                                <i className={`text-[9px] ${benchmark.readiness >= 67 ? 'ri-checkbox-circle-line text-emerald-500' : 'ri-time-line text-amber-500'}`} />
                                {benchmark.label}
                              </span>
                            )}
                          </div>
                          {family.route ? (
                            <a href={family.route} className="flex items-center gap-1 text-[10px] font-bold cursor-pointer whitespace-nowrap hover:underline" style={{ color: family.color }}>
                              Détail <i className="ri-arrow-right-line" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-foreground-300 whitespace-nowrap">Page à venir</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ============ BIG FOUR READINESS ============ */}
      <section className="py-10 sm:py-14 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-4">
              <i className="ri-medal-line text-amber-600 text-sm" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Indicateurs KOI — Niveau Big Four</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Readiness Opérationnelle par Famille
            </h2>
            <p className="text-foreground-600">Le KOI (Key Operational Indicator) mesure la maturité de déploiement et d&apos;automatisation de chaque famille d&apos;automates.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {families.map(family => {
              const bm = benchmarks.family_readiness.find(b => b.family === family.id);
              if (!bm) return null;
              const barColor = bm.readiness >= 80 ? '#86BC25' : bm.readiness >= 60 ? '#E8C547' : bm.readiness >= 33 ? '#EA580C' : '#DC2626';
              return (
                <div key={family.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-background-200">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${family.color}15` }}>
                    <i className={`${family.icon} text-sm`} style={{ color: family.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-foreground-800">{family.name}</span>
                      <span className="text-xs font-bold" style={{ color: barColor }}>{bm.readiness}% — {bm.label}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${bm.readiness}%`, backgroundColor: barColor }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Big Four KPI Benchmarks */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Revenu par agent', value: formatCurrency(266000), target: '>300 K€', icon: 'ri-funds-line', color: '#86BC25', desc: 'Revenue influencé moyen par agent déployé' },
              { label: 'Taux de déploiement', value: Math.round((globalKPIs.deployed / globalKPIs.total_agents) * 100) + '%', target: '100%', icon: 'ri-rocket-line', color: '#EA580C', desc: 'Pourcentage d\'agents en statut déployé' },
              { label: 'Score qualité global', value: globalKPIs.total_quality_score + '/100', target: '>95/100', icon: 'ri-medal-line', color: '#6366F1', desc: 'Score qualité agrégé toutes familles' },
              { label: 'Taux succès moyen', value: globalKPIs.avg_success_rate + '%', target: '>95%', icon: 'ri-line-chart-line', color: '#0D7B5F', desc: 'Taux de succès moyen pondéré' },
            ].map((kpi, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                    <i className={`${kpi.icon} text-sm`} style={{ color: kpi.color }} />
                  </div>
                  <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">{kpi.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground-950 font-heading">{kpi.value}</span>
                  <span className="text-xs text-foreground-400">cible: {kpi.target}</span>
                </div>
                <p className="text-[10px] text-foreground-500 mt-1">{kpi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CROSS-LINKS ============ */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Navigation Rapide
            </h2>
            <p className="text-foreground-600">Accès direct à chaque famille d&apos;automates et aux hubs de commandement KOS.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {families.map(family => (
              <a
                key={family.id}
                href={family.route || '#'}
                className={`rounded-xl border p-3 text-center transition-all block ${
                  family.route
                    ? 'bg-background-50 border-background-200 hover:shadow-md hover:border-foreground-200 cursor-pointer'
                    : 'bg-background-50 border-dashed border-background-200 opacity-60 cursor-default'
                }`}
              >
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${family.color}15` }}>
                  <i className={`${family.icon} text-sm`} style={{ color: family.color }} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{family.name}</span>
                {!family.route && (
                  <span className="block text-[8px] text-foreground-300 mt-0.5">Bientôt</span>
                )}
              </a>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Ultimate Cockpit', path: '/kos-ultimate-cockpit', icon: 'ri-dashboard-3-line', color: '#5B8C2A' },
              { label: 'Bloc Compliance', path: '/kos-bloc-total-compliance', icon: 'ri-radar-line', color: '#F59E0B' },
              { label: 'Control Tower', path: '/kos-control-tower-automation', icon: 'ri-building-line', color: '#BE123C' },
              { label: 'KPI Tower', path: '/kos-ultimate-cockpit', icon: 'ri-bar-chart-2-line', color: '#EA580C' },
              { label: 'Big Four Evidence', path: '/kos-ultimate-cockpit', icon: 'ri-file-search-line', color: '#8B5CF6' },
              { label: 'Dashboard Central', path: '/kos-dashboard', icon: 'ri-stack-line', color: '#86BC25' },
            ].map(link => (
              <a key={link.path} href={link.path} className="rounded-xl border border-background-200 bg-background-50 p-3 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
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