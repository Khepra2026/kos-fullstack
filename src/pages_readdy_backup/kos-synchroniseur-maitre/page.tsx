import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSMasterSynchronizer } from '@/hooks/useKOSMasterSynchronizer';
import type { familySync, kPODimension, gapAnalysis, deploymentPlan } from '@/hooks/useKOSMasterSynchronizer';

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

function timeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

const DOMAIN_INFO: Record<string, { label: string; color: string; bg: string }> = {
  'front-office': { label: 'Front Office', color: '#5B8C2A', bg: '#5B8C2A15' },
  'croissance': { label: 'Croissance', color: '#EA580C', bg: '#EA580C15' },
  'production': { label: 'Production', color: '#BE123C', bg: '#BE123C15' },
  'qualite': { label: 'Qualité', color: '#6366F1', bg: '#6366F115' },
  'technique': { label: 'Technique', color: '#14B8A6', bg: '#14B8A615' },
  'intelligence': { label: 'Intelligence', color: '#F59E0B', bg: '#F59E0B15' },
  'creation': { label: 'Création', color: '#0EA5E9', bg: '#0EA5E915' },
};

const SYNC_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  'synced': { label: 'Synchronisé', color: '#86BC25', bg: '#86BC2515', icon: 'ri-check-double-line' },
  'syncing': { label: 'En cours', color: '#F59E0B', bg: '#F59E0B15', icon: 'ri-refresh-line' },
  'partial': { label: 'Partiel', color: '#EA580C', bg: '#EA580C15', icon: 'ri-time-line' },
  'stale': { label: 'Désynchronisé', color: '#DC2626', bg: '#DC262615', icon: 'ri-error-warning-line' },
  'error': { label: 'Erreur', color: '#DC2626', bg: '#DC262615', icon: 'ri-close-circle-line' },
};

const SEVERITY_CONFIG: Record<string, { label: string; color: string }> = {
  'high': { label: 'Critique', color: '#DC2626' },
  'medium': { label: 'Modéré', color: '#EA580C' },
  'low': { label: 'Mineur', color: '#F59E0B' },
};

export default function masterSynchronizerPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const { families, globalKPIs, kpoDimensions, gapAnalysis, syncLogs, deploymentPlan, isLive, loading, error, refetch } = useKOSMasterSynchronizer();
  const [activeTab, setActiveTab] = useState<'overview' | 'gap' | 'plan' | 'log'>('overview');
  const [syncingFamilies, setSyncingFamilies] = useState<Set<string>>(new Set());
  const [masterSyncActive, setMasterSyncActive] = useState(false);

  const deployPct = globalKPIs.total_agents > 0 ? Math.round((globalKPIs.deployed / globalKPIs.total_agents) * 100) : 0;

  const startFamilySync = useCallback((familyId: string) => {
    setSyncingFamilies(prev => {
      const next = new Set(prev);
      next.add(familyId);
      return next;
    });
    setTimeout(() => {
      setSyncingFamilies(prev => {
        const next = new Set(prev);
        next.delete(familyId);
        return next;
      });
    }, 3000);
  }, []);

  const startMasterSync = useCallback(() => {
    setMasterSyncActive(true);
    const allIds = families.map(f => f.id);
    setSyncingFamilies(new Set(allIds));
    setTimeout(() => {
      setMasterSyncActive(false);
      setSyncingFamilies(new Set());
    }, 4000);
  }, [families]);

  const gapHoursTotal = gapAnalysis.reduce((s, g) => s + g.estimated_hours_to_100, 0);

  const deploymentPhases = useMemo(() => {
    return deploymentPlan.map(phase => ({
      ...phase,
      familyObjs: families.filter(f => phase.families.includes(f.id)),
    }));
  }, [deploymentPlan, families]);

  return (
    <hubLayout hubId={100}>
      <SeoHead
        title="KOS Synchroniseur Maître™ — 100% KPO Big Four | KHEPRA EXPERTS"
        description="Synchroniseur Maître KOS : 13 familles, 333 agents déployés en temps réel. Gap analysis, KPO Big Four, master deploy. Centre de synchronisation du Knowledge Operating System."
        keywords="KOS Synchroniseur Maître, déploiement KOS, KPO Big Four, synchronisation agents, KHEPRA EXPERTS, master sync KOS"
        canonicalPath="/kos-synchroniseur-maitre"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Ultra%20modern%20command%20center%20interior%20with%20holographic%20circular%20dashboard%20displaying%20interconnected%20glowing%20nodes%20and%20data%20streams%2C%20dark%20atmosphere%20with%20emerald%20green%20and%20warm%20amber%20accent%20lights%2C%20sophisticated%20network%20topology%20visualization%20with%20concentric%20orbital%20rings%2C%20premium%20sci-fi%20operations%20center%20aesthetic%20with%20floating%20data%20panels%2C%20abstract%20geometric%20patterns%20suggesting%20synchronized%20automated%20systems%2C%20no%20human%20figures%20no%20text%2C%20cinematic%20lighting%20with%20volumetric%20rays&width=1920&height=700&seq=kos-master-sync-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <i className="ri-refresh-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                    KOS Synchroniseur Maître™
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                  isLive ? 'bg-emerald-500/20 border border-emerald-400/30' : 'bg-amber-500/20 border border-amber-400/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {isLive ? 'LIVE — SUPABASE' : 'MOCK — DÉMO'}
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Synchronisation Totale.
                <span className="block text-emerald-400 mt-2">333 agents. 13 familles. 100% KPO.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                Le <strong className="text-white">Synchroniseur Maître KOS</strong> déploie, synchronise et monitorise chaque agent en temps réel.{' '}
                <strong className="text-white">{globalKPIs.deployed}/{globalKPIs.total_agents} agents déployés</strong>,{' '}
                <strong className="text-white">score KPO {globalKPIs.avg_kpo_score}/100</strong>,{' '}
                <strong className="text-white">{formatCurrency(globalKPIs.total_revenue_influenced)}</strong> de revenu influencé.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={startMasterSync}
                  disabled={masterSyncActive}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  {masterSyncActive ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      Synchronisation en cours...
                    </>
                  ) : (
                    <>
                      <i className="ri-refresh-line" />
                      SYNC MASTER — TOUT DÉPLOYER
                    </>
                  )}
                </button>
                <button
                  onClick={refetch}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm"
                >
                  <i className="ri-refresh-line" />
                  Rafraîchir
                </button>
              </div>
            </div>

            {/* Master KPO Card */}
            <div className="flex-shrink-0 w-full lg:w-72 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="text-center mb-4">
                <div className="relative inline-flex">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={deployPct >= 95 ? '#86BC25' : deployPct >= 80 ? '#F59E0B' : '#DC2626'}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - deployPct / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white font-heading">{deployPct}%</span>
                    <span className="text-[10px] text-gray-400">KPO Target</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Déployés</span>
                  <span className="text-emerald-400 font-bold">{globalKPIs.deployed}/{globalKPIs.total_agents}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${deployPct}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Partiels</span>
                  <span className="text-amber-400 font-bold">{globalKPIs.partial}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Critiques</span>
                  <span className="text-red-400 font-bold">{globalKPIs.critical}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Auto</span>
                  <span className="text-amber-400 font-bold">{globalKPIs.auto_enabled}/{globalKPIs.total_agents}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Score KPO</span>
                  <span className="text-emerald-400 font-bold text-sm">{globalKPIs.avg_kpo_score}/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GLOBAL KPI BAR ============ */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'Familles', value: String(globalKPIs.total_families), icon: 'ri-stack-line' },
              { label: 'Agents', value: String(globalKPIs.total_agents), icon: 'ri-robot-line' },
              { label: 'Déployés', value: `${globalKPIs.deployed}`, icon: 'ri-checkbox-circle-line' },
              { label: 'Tâches', value: formatNumber(globalKPIs.total_tasks), icon: 'ri-task-line' },
              { label: 'Succès', value: `${globalKPIs.avg_success_rate}%`, icon: 'ri-line-chart-line' },
              { label: 'Revenue', value: formatCurrency(globalKPIs.total_revenue_influenced), icon: 'ri-funds-line' },
              { label: 'Synced', value: `${globalKPIs.fully_synced_families}/${globalKPIs.total_families}`, icon: 'ri-link' },
              { label: 'Uptime', value: `${globalKPIs.avg_uptime}%`, icon: 'ri-cloud-line' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-xs mb-0.5 block text-gray-400`} />
                <span className="block text-base font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[9px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ KPO BIG FOUR FRAMEWORK ============ */}
      <section className="py-10 sm:py-14 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              <i className="ri-medal-line text-emerald-600 text-sm" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Cadre KPO Big Four</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Key Performance Objectives — Standard International
            </h2>
            <p className="text-foreground-600">6 dimensions KPO qui mesurent la maturité opérationnelle du KOS au niveau des cabinets Big Four.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpoDimensions.map(dim => {
              const isComplete = dim.gap === '0 agents' || dim.gap === '0 missions' || dim.gap.startsWith('0');
              const gapNum = parseFloat(dim.gap);
              const isCloseToTarget = !isNaN(gapNum) && gapNum <= 5;

              return (
                <div key={dim.id} className={`rounded-2xl border p-5 transition-all ${
                  isComplete ? 'border-emerald-200 bg-white' :
                  isCloseToTarget ? 'border-amber-200 bg-white' :
                  'border-background-200 bg-white'
                }`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${dim.color}15` }}>
                      <i className={`${dim.icon} text-lg`} style={{ color: dim.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-foreground-950">{dim.name}</h3>
                        {isComplete && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">OK</span>
                        )}
                      </div>
                      <p className="text-xs text-foreground-500 line-clamp-2">{dim.description}</p>
                    </div>
                  </div>
                  <div className="bg-background-50 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-foreground-400">Actuel</span>
                      <span className="font-bold text-foreground-800">{dim.current}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-foreground-400">Cible</span>
                      <span className="font-bold text-foreground-800">{dim.target}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-foreground-400">Écart</span>
                      <span className={`font-bold ${isComplete ? 'text-emerald-600' : isCloseToTarget ? 'text-amber-600' : 'text-red-600'}`}>
                        {dim.gap}
                      </span>
                    </div>
                  </div>
                  {dim.families_impacted.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {dim.families_impacted.map(fid => {
                        const fam = families.find(f => f.id === fid);
                        if (!fam) return null;
                        return (
                          <span key={fid} className="text-[9px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200">
                            {fam.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TAB NAVIGATION ============ */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: 'ri-dashboard-line' },
              { id: 'gap', label: 'Gap Analysis', icon: 'ri-error-warning-line' },
              { id: 'plan', label: 'Plan de Déploiement', icon: 'ri-road-map-line' },
              { id: 'log', label: 'Logs Live', icon: 'ri-history-line' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OVERVIEW TAB ============ */}
      {activeTab === 'overview' && (
        <section className="py-6 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-background-200 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-sm text-foreground-500">Synchronisation des 13 familles KOS...</p>
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
                  <i className="ri-error-warning-line text-red-600 text-2xl" />
                </div>
                <p className="text-sm text-foreground-700 font-medium">Erreur de synchronisation</p>
                <p className="text-xs text-foreground-500 max-w-md text-center">{error}</p>
                <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-refresh-line mr-2" />Réessayer
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground-950">
                    {families.length} Familles — {formatNumber(globalKPIs.total_tasks)} tâches cumulées
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-foreground-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {globalKPIs.fully_synced_families} synced
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-foreground-400">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      {globalKPIs.families_at_risk} à risque
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {families.map(family => {
                    const deployPctF = family.agents_total > 0 ? Math.round((family.deployed / family.agents_total) * 100) : 0;
                    const domain = DOMAIN_INFO[family.domain] || DOMAIN_INFO['technique'];
                    const syncCfg = SYNC_STATUS_CONFIG[family.sync_status] || SYNC_STATUS_CONFIG['stale'];
                    const isSyncing = syncingFamilies.has(family.id);
                    const gap = gapAnalysis.find(g => g.family_id === family.id);
                    const successColor = family.success_rate >= 92 ? '#86BC25' : family.success_rate >= 85 ? '#F59E0B' : '#DC2626';

                    return (
                      <div key={family.id} className="rounded-2xl border border-background-200 bg-white hover:shadow-md transition-all overflow-hidden">
                        <div className="p-5">
                          {/* Header */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${family.color}15` }}>
                              <i className={`${family.icon} text-lg`} style={{ color: family.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <h3 className="text-sm font-bold text-foreground-950 whitespace-nowrap">{family.name}</h3>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold border" style={{ color: domain.color, backgroundColor: domain.bg, borderColor: `${domain.color}40` }}>
                                  {domain.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-[10px]" style={{ color: syncCfg.color }}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${isSyncing ? 'animate-pulse' : ''}`} style={{ backgroundColor: syncCfg.color }} />
                                  {isSyncing ? 'Syncing...' : syncCfg.label}
                                </span>
                                <span className="text-[10px] text-foreground-400">{timeAgo(family.last_sync)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Deployment bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-[10px] mb-1">
                              <span className="text-foreground-400">Déploiement KPO</span>
                              <span className="font-bold" style={{ color: deployPctF >= 90 ? '#86BC25' : deployPctF >= 67 ? '#F59E0B' : '#DC2626' }}>
                                {deployPctF}% — {family.deployed}/{family.agents_total}
                              </span>
                            </div>
                            <div className="relative w-full h-2 rounded-full bg-background-100 overflow-hidden">
                              <div className="absolute inset-0 flex">
                                <div className="h-full transition-all rounded-l-full" style={{ width: `${deployPctF}%`, backgroundColor: deployPctF >= 90 ? '#86BC25' : deployPctF >= 67 ? '#F59E0B' : '#DC2626' }} />
                              </div>
                            </div>
                          </div>

                          {/* KPO Score */}
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="text-center p-2 rounded-lg bg-background-50">
                              <span className="block text-xs font-bold font-heading" style={{ color: family.kpo_score >= 90 ? '#86BC25' : '#F59E0B' }}>{family.kpo_score}</span>
                              <span className="text-[9px] text-foreground-400">KPO Score</span>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-background-50">
                              <span className="block text-xs font-bold font-heading" style={{ color: successColor }}>{family.success_rate}%</span>
                              <span className="text-[9px] text-foreground-400">Succès</span>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-background-50">
                              <span className="block text-xs font-bold font-heading text-foreground-950">{family.missions_active}/{family.missions_total}</span>
                              <span className="text-[9px] text-foreground-400">Missions</span>
                            </div>
                          </div>

                          {/* Gaps */}
                          {family.kpo_gaps.length > 0 && (
                            <div className="mb-3 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                              <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider">Gaps KPO</span>
                              <ul className="mt-1 space-y-0.5">
                                {family.kpo_gaps.map((g, j) => (
                                  <li key={j} className="flex items-start gap-1 text-[10px] text-amber-800">
                                    <span className="mt-0.5">-</span>
                                    <span>{g}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* KPIs tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {family.kpis.map((kpi, j) => (
                              <span key={j} className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">
                                <i className={`${kpi.icon} text-[9px]`} style={{ color: family.color }} />
                                {kpi.label}: <strong className="text-foreground-800">{kpi.value}</strong>
                              </span>
                            ))}
                          </div>

                          {family.revenue_influenced > 0 && (
                            <p className="text-[10px] text-emerald-700 font-medium mb-3">
                              <i className="ri-funds-line mr-1" /> {formatCurrency(family.revenue_influenced)} influencé
                            </p>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-2.5 border-t border-background-100 flex items-center justify-between bg-background-50">
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="text-foreground-400">{family.agents_total} agents</span>
                            <span className="w-1 h-1 rounded-full bg-background-300" />
                            <span className="text-foreground-400">{family.auto_enabled} auto</span>
                            {gap && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-background-300" />
                                <span style={{ color: '#DC2626' }}>{gap.blocker_count} blocages</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startFamilySync(family.id)}
                              disabled={isSyncing || family.sync_status === 'synced'}
                              className={`flex items-center gap-1 text-[10px] font-bold cursor-pointer whitespace-nowrap px-2 py-1 rounded-full transition-all ${
                                family.sync_status === 'synced'
                                  ? 'text-emerald-600 bg-emerald-50 cursor-default'
                                  : 'text-foreground-600 hover:text-foreground-800 hover:bg-background-100'
                              } disabled:opacity-50 disabled:cursor-wait`}
                            >
                              <i className={`text-[9px] ${isSyncing ? 'ri-loader-4-line animate-spin' : 'ri-refresh-line'}`} />
                              {family.sync_status === 'synced' ? 'OK' : 'Sync'}
                            </button>
                            {family.route && (
                              <a href={family.route} className="flex items-center gap-1 text-[10px] font-bold cursor-pointer whitespace-nowrap hover:underline" style={{ color: family.color }}>
                                Détail <i className="ri-arrow-right-line" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ============ GAP ANALYSIS TAB ============ */}
      {activeTab === 'gap' && (
        <section className="py-6 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 mb-4">
                <i className="ri-error-warning-line text-red-600 text-sm" />
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Gap Analysis — Road to 100%</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                {gapAnalysis.length} familles avec des blocages — {gapHoursTotal}h pour le 100%
              </h2>
              <p className="text-foreground-600">Analyse des écarts entre l'état actuel et le standard KPO 100% Big Four. Chaque blocage a sa solution chiffrée.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Familles concernées', value: String(gapAnalysis.length), color: '#DC2626', icon: 'ri-stack-line' },
                { label: 'Blocages totaux', value: String(gapAnalysis.reduce((s, g) => s + g.blocker_count, 0)), color: '#EA580C', icon: 'ri-error-warning-line' },
                { label: 'Heures estimées', value: `${gapHoursTotal}h`, color: '#F59E0B', icon: 'ri-timer-line' },
                { label: 'Date cible 100%', value: '19/06/2026', color: '#86BC25', icon: 'ri-calendar-check-line' },
              ].map((card, i) => (
                <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <i className={`${card.icon} text-xl mb-1.5 block`} style={{ color: card.color }} />
                  <span className="block text-2xl font-bold text-foreground-950 font-heading">{card.value}</span>
                  <span className="text-[10px] text-foreground-500">{card.label}</span>
                </div>
              ))}
            </div>

            {/* Gap Cards */}
            <div className="space-y-4">
              {gapAnalysis.map(gap => {
                const family = families.find(f => f.id === gap.family_id);
                const severityCounts = { high: gap.blockers.filter(b => b.severity === 'high').length, medium: gap.blockers.filter(b => b.severity === 'medium').length, low: gap.blockers.filter(b => b.severity === 'low').length };

                return (
                  <div key={gap.family_id} className="rounded-2xl border border-background-200 bg-white overflow-hidden">
                    <div className="p-5 border-b border-background-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {family && (
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${family.color}15` }}>
                            <i className={`${family.icon} text-lg`} style={{ color: family.color }} />
                          </div>
                        )}
                        <div>
                          <h3 className="text-sm font-bold text-foreground-950">{gap.family_name}</h3>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="text-foreground-400">{gap.blocker_count} blocages</span>
                            <span className="w-1 h-1 rounded-full bg-background-300" />
                            <span className="text-foreground-400">{gap.estimated_hours_to_100}h estimées</span>
                            {severityCounts.high > 0 && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-background-300" />
                                <span className="text-red-600 font-bold">{severityCounts.high} critiques</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold ${gap.estimated_hours_to_100 <= 3 ? 'text-emerald-600' : gap.estimated_hours_to_100 <= 8 ? 'text-amber-600' : 'text-red-600'}`}>
                          {gap.estimated_hours_to_100}h to 100%
                        </span>
                      </div>
                    </div>
                    <div className="divide-y divide-background-50">
                      {gap.blockers.map((blocker, j) => {
                        const sev = SEVERITY_CONFIG[blocker.severity];
                        return (
                          <div key={j} className="p-4 hover:bg-background-50 transition-colors">
                            <div className="flex items-start gap-3">
                              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold mt-0.5 whitespace-nowrap" style={{ color: sev.color, backgroundColor: `${sev.color}15` }}>
                                {sev.label}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-foreground-800 mb-1">{blocker.title}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                                  <div className="flex items-start gap-1">
                                    <i className="ri-alert-line text-red-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-red-700">{blocker.impact}</span>
                                  </div>
                                  <div className="flex items-start gap-1">
                                    <i className="ri-tools-line text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-emerald-700">{blocker.fix}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ DEPLOYMENT PLAN TAB ============ */}
      {activeTab === 'plan' && (
        <section className="py-6 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                <i className="ri-road-map-line text-emerald-600 text-sm" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Plan de Déploiement 100% KPO</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                5 Phases — Du 15 au 19 Juin 2026
              </h2>
              <p className="text-foreground-600">Roadmap de synchronisation et déploiement complet. Chaque phase libère des familles au standard Big Four.</p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-0.5 bg-background-200" />
              <div className="space-y-6">
                {deploymentPhases.reverse().map((phase, idx) => {
                  const phaseNum = deploymentPhases.length - idx;
                  const isComplete = phase.status === 'completed';
                  const isActive = phase.status === 'in_progress';
                  const totalDeploy = phase.familyObjs.reduce((s, f) => s + f.agents_total - f.deployed + f.partial, 0);

                  return (
                    <div key={phase.phase} className="relative pl-14">
                      <div className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-4 border-white z-10 ${
                        isComplete ? 'bg-emerald-500 text-white' : isActive ? 'bg-amber-500 text-white animate-pulse' : 'bg-background-100 text-foreground-400'
                      }`}>
                        {isComplete ? <i className="ri-check-line" /> : phaseNum}
                      </div>

                      <div className={`rounded-2xl border p-5 ${isActive ? 'border-amber-300 bg-amber-50/50' : 'border-background-200 bg-white'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                isComplete ? 'bg-emerald-100 text-emerald-700' : isActive ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                              }`}>
                                {isComplete ? 'Complété' : isActive ? 'En cours' : 'En attente'}
                              </span>
                              <span className="text-[9px] text-foreground-400">{phase.target_date}</span>
                            </div>
                            <h3 className="text-base font-bold text-foreground-950">{phase.label}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-foreground-500">{phase.families.length} famille{phase.families.length > 1 ? 's' : ''}</span>
                            {phase.agents_to_deploy > 0 && (
                              <span className="text-amber-700 font-bold">{phase.agents_to_deploy} agents à déployer</span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {phase.familyObjs.map(fam => (
                            <div key={fam.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background-50 border border-background-200">
                              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${fam.color}15` }}>
                                <i className={`${fam.icon} text-xs`} style={{ color: fam.color }} />
                              </div>
                              <div>
                                <span className="text-[11px] font-bold text-foreground-700">{fam.name}</span>
                                <span className="text-[9px] text-foreground-400 ml-1">
                                  {fam.deployed}/{fam.agents_total} déployés
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ LIVE LOGS TAB ============ */}
      {activeTab === 'log' && (
        <section className="py-6 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Live Activity Feed</span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground-950">Dernières synchronisations</h2>
              </div>
              <span className="text-xs text-foreground-400">Fréquence de sync : {globalKPIs.sync_frequency_seconds}s</span>
            </div>

            <div className="rounded-2xl border border-background-200 bg-white overflow-hidden">
              <div className="divide-y divide-background-100">
                {syncLogs.map(log => {
                  const family = families.find(f => f.name === log.family_name);
                  const statusConfig: Record<string, { icon: string; color: string; bg: string }> = {
                    success: { icon: 'ri-checkbox-circle-line', color: '#86BC25', bg: '#86BC2515' },
                    warning: { icon: 'ri-error-warning-line', color: '#EA580C', bg: '#EA580C15' },
                    error: { icon: 'ri-close-circle-line', color: '#DC2626', bg: '#DC262615' },
                    info: { icon: 'ri-information-line', color: '#0EA5E9', bg: '#0EA5E915' },
                  };
                  const sc = statusConfig[log.status] || statusConfig.info;

                  return (
                    <div key={log.id} className="flex items-start gap-3 p-4 hover:bg-background-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: sc.bg }}>
                        <i className={`${sc.icon} text-sm`} style={{ color: sc.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-xs font-bold text-foreground-800">{log.agent_name}</span>
                          {family && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ color: family.color, backgroundColor: `${family.color}10` }}>
                              {log.family_name}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-foreground-600 mb-0.5">{log.action}</p>
                        <p className="text-[10px] text-foreground-400">{log.detail}</p>
                      </div>
                      <span className="text-[10px] text-foreground-400 whitespace-nowrap flex-shrink-0">{timeAgo(log.timestamp)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ CROSS-LINKS ============ */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Tous les Hubs
            </h2>
            <p className="text-foreground-600">Accès direct à chaque famille d'automates et aux centres de commandement.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {families.map(family => (
              <a
                key={family.id}
                href={family.route || '#'}
                className={`rounded-xl border p-3 text-center transition-all block ${
                  family.route
                    ? 'bg-white border-background-200 hover:shadow-md hover:border-foreground-200 cursor-pointer'
                    : 'bg-white border-dashed border-background-200 opacity-50 cursor-default'
                }`}
              >
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${family.color}15` }}>
                  <i className={`${family.icon} text-sm`} style={{ color: family.color }} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{family.name}</span>
                {!family.route && (
                  <span className="block text-[8px] text-foreground-300 mt-0.5">Soon</span>
                )}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Commandement Unifié', path: '/kos-commandement-operationnel-unifie', icon: 'ri-government-line', color: '#F59E0B' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#5B8C2A' },
              { label: 'Enterprise Brain', path: '/kos-enterprise-brain-os', icon: 'ri-brain-line', color: '#8B5CF6' },
              { label: 'Control Tower', path: '/kos-control-tower-automation', icon: 'ri-radar-line', color: '#BE123C' },
              { label: 'Executive Command', path: '/kos-executive-command', icon: 'ri-building-line', color: '#EA580C' },
              { label: 'Performance 100%', path: '/kos-performance-100-challenge', icon: 'ri-line-chart-line', color: '#86BC25' },
            ].map(link => (
              <a key={link.path} href={link.path} className="rounded-xl border border-background-200 bg-white p-3 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



