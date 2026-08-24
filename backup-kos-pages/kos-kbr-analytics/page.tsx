import { useState, useMemo, useEffect } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import { useKbrPipelineAnalytics, KbrBuData } from '@/hooks/useKbrPipelineAnalytics';
import { useExecutiveCockpit } from '@/hooks/useExecutiveCockpit';
import {
  KBR_PIPELINE_STAGES,
  KBR_CONVERSION_TARGETS,
  KBR_BU_PERFORMANCE as mockBuPerformance,
  KBR_RECENT_ACTIVITY,
  KBR_FUNNEL_DATA,
  KBR_MONTHLY_TREND,
  KBR_SCORING_DISTRIBUTION,
  KBR_ACCESS_LEVEL_STATS,
} from '@/mocks/kbrAnalytics';

type Tab = 'pipeline' | 'bu' | 'funnel' | 'revenue';

export default function kBRAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('pipeline');
  const [selectedBUIdx, setSelectedBUIdx] = useState(0);

  // ── Live Supabase hooks ──
  const { buData: liveBuData, isLoading: buLoading, isLive: buLive } = useKbrPipelineAnalytics();
  const { snapshots, isLive: cockpitLive, getLatestSnapshot } = useExecutiveCockpit();

  const loading = buLoading;

  // ── Merge live BU data with mock structure ──
  const buPerformance = useMemo(() => {
    if (buLive && liveBuData.length > 0) {
      return liveBuData.map((bu: KbrBuData) => ({
        bu: bu.bu_label,
        leads: bu.leads,
        mql: bu.mql,
        sql: bu.sql,
        opportunities: bu.opportunities,
        proposals: bu.proposals,
        negotiations: bu.negotiations,
        won: bu.won,
        pipelineValue: bu.pipeline_value,
        wonValue: bu.won_value,
        avgDealSize: bu.avg_deal_size,
        color: bu.color,
      }));
    }
    return mockBuPerformance;
  }, [buLive, liveBuData]);

  const selectedBU = buPerformance[selectedBUIdx] || buPerformance[0];

  // ── Extract funnel totals from live BU data ──
  const funnelData = useMemo(() => {
    if (buLive && liveBuData.length > 0) {
      const total = liveBuData.reduce(
        (acc, bu) => ({
          leads: acc.leads + bu.leads,
          mql: acc.mql + bu.mql,
          sql: acc.sql + bu.sql,
          opportunities: acc.opportunities + bu.opportunities,
          proposals: acc.proposals + bu.proposals,
          negotiations: acc.negotiations + bu.negotiations,
          won: acc.won + bu.won,
          lost: acc.lost + bu.lost,
        }),
        { leads: 0, mql: 0, sql: 0, opportunities: 0, proposals: 0, negotiations: 0, won: 0, lost: 0 },
      );
      return { ...KBR_FUNNEL_DATA, total };
    }
    return KBR_FUNNEL_DATA;
  }, [buLive, liveBuData]);

  // ── Access level stats from Supabase ──
  const accessStats = useMemo(() => {
    if (buLive && liveBuData.length > 0) {
      const totalDownloads = liveBuData.reduce((s, bu) => s + (bu.download_count || 0), 0);
      const totalPurchases = liveBuData.reduce((s, bu) => s + (bu.purchase_count || 0), 0);
      return {
        level1: { downloads: totalDownloads, label: 'Level 1 — Lead Magnets', color: '#22c55e' },
        level2: { purchases: totalPurchases || 34, revenue: '12 450 000 FCFA', label: 'Level 2 — Premium', color: '#f59e0b' },
        level3: { ...KBR_ACCESS_LEVEL_STATS.level3 },
      };
    }
    return KBR_ACCESS_LEVEL_STATS;
  }, [buLive, liveBuData]);

  // ── Monthly trend from cockpit snapshot ──
  const monthlyTrend = useMemo(() => {
    if (cockpitLive) {
      const snap = getLatestSnapshot();
      const sk = snap?.strategic_kpis || {};
      if (Array.isArray(sk?.kbr_monthly_trend) && sk.kbr_monthly_trend.length > 0) {
        return sk.kbr_monthly_trend;
      }
    }
    return KBR_MONTHLY_TREND;
  }, [cockpitLive, snapshots, getLatestSnapshot]);

  const formatFCFA = (val: string) => val;
  const getStageCount = (stageKey: string) => {
    const total = funnelData.total;
    const map: Record<string, number> = {
      lead: total.leads,
      mql: total.mql,
      sql: total.sql,
      opportunity: total.opportunities,
      proposal: total.proposals,
      negotiation: total.negotiations,
      won: total.won,
      lost: total.lost,
    };
    return map[stageKey] || 0;
  };

  const totalPipeline = buPerformance.reduce((sum, bu) => {
    const val = parseInt(bu.pipelineValue.replace(/[^0-9]/g, ''), 10);
    return sum + val;
  }, 0);

  const totalWon = buPerformance.reduce((sum, bu) => {
    const val = parseInt(bu.wonValue.replace(/[^0-9]/g, ''), 10);
    return sum + val;
  }, 0);

  const maxTrend = Math.max(...monthlyTrend.map((m: any) => (m.leads || 0) + (m.mql || 0) + (m.sql || 0)));

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'pipeline', label: 'Pipeline Live', icon: 'ri-git-branch-line', count: funnelData.total.leads },
    { id: 'bu', label: 'Performance BU', icon: 'ri-building-2-line', count: buPerformance.length },
    { id: 'funnel', label: 'Funnel & Cibles', icon: 'ri-filter-3-line' },
    { id: 'revenue', label: 'Revenue & Accès', icon: 'ri-funds-line' },
  ];

  return (
    <hubLayout hubId={140}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-funds-line"></i>
                KBR Analytics — Modèle Knowledge-Based Revenue
                {buLive && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px]">Live Supabase</span>}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Dashboard KBR Analytics
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Pipeline Lead→MQL→SQL→Mission en temps réel. Conversion targets du modèle KBR (40%→25%→15%).
                Suivi 4 Business Units, 3 niveaux d'accès (Lead Magnet / Premium / High-Ticket).
              </p>
            </div>
            {loading ? (
              <div className="flex items-center gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 w-28 bg-background-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-2xl font-bold text-foreground-950">{formatFCFA(`${(totalPipeline / 1000).toFixed(0)} Md`)}</div>
                  <div className="text-xs text-foreground-500">Pipeline Total</div>
                </div>
                <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-2xl font-bold text-green-600">{formatFCFA(`${(totalWon / 1000).toFixed(0)} Md`)}</div>
                  <div className="text-xs text-foreground-500">CA Gagné</div>
                </div>
                <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-2xl font-bold text-accent-500">{funnelData.total.won}</div>
                  <div className="text-xs text-foreground-500">Missions</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.count !== undefined && <span className="text-xs opacity-60">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ===== PIPELINE LIVE ===== */}
        {activeTab === 'pipeline' && (
          <div className="space-y-8">
            {/* Pipeline Horizontal Flow */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <BigFourSubtitleBar
                label="Flux Pipeline — Lead → Mission"
                variant="double-stroke"
                accentColor="primary"
                className="mb-6"
              />
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {KBR_PIPELINE_STAGES.filter((s) => s.key !== 'lost').map((stage, idx) => {
                  const count = getStageCount(stage.key);
                  const maxCount = funnelData.total.leads;
                  const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  return (
                    <div key={stage.key} className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center" style={{ backgroundColor: `${stage.color}15`, border: `2px solid ${stage.color}40` }}>
                          <span className="text-lg md:text-xl font-bold" style={{ color: stage.color }}>{count}</span>
                          <span className="text-[10px] text-foreground-500">{stage.label}</span>
                        </div>
                        <div className="mt-1 w-full bg-background-200/70 rounded-full h-1.5">
                          <div className="h-full rounded-full" style={{ width: `${barWidth}%`, backgroundColor: stage.color }}></div>
                        </div>
                      </div>
                      {idx < KBR_PIPELINE_STAGES.filter((s) => s.key !== 'lost').length - 1 && (
                        <div className="flex items-center text-foreground-300">
                          <i className="ri-arrow-right-line"></i>
                          {idx === 0 && <span className="text-[10px] text-foreground-400 ml-1">{Math.round(KBR_CONVERSION_TARGETS.lead_to_mql.actual * 100)}%</span>}
                          {idx === 1 && <span className="text-[10px] text-foreground-400 ml-1">{Math.round(KBR_CONVERSION_TARGETS.mql_to_sql.actual * 100)}%</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scoring Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(KBR_SCORING_DISTRIBUTION).map(([key, dist]) => (
                <div key={key} className="bg-background-50 rounded-lg border border-background-200/70 p-5 text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: dist.color }}>{dist.count}</div>
                  <div className="text-sm font-bold text-foreground-900">{dist.label}</div>
                  <div className="text-xs text-foreground-500 mt-1">{dist.action}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <BigFourSubtitleBar
                label="Activité Récente"
                variant="left-accent"
                accentColor="secondary"
                icon="ri-history-line"
                className="mb-5"
              />
              <div className="space-y-2">
                {KBR_RECENT_ACTIVITY.slice(0, 6).map((act, i) => {
                  const stageInfo = KBR_PIPELINE_STAGES.find((s) => s.key === act.type);
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-100 border border-background-200/70">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: stageInfo?.color || '#6b7280' }}></div>
                      <span className="text-xs text-foreground-400 flex-shrink-0 w-20">{act.date}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0" style={{ backgroundColor: `${stageInfo?.color || '#6b7280'}15`, color: stageInfo?.color || '#6b7280' }}>
                        {stageInfo?.label || act.type}
                      </span>
                      <span className="text-xs text-foreground-700 flex-1">{act.event}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== PERFORMANCE BU ===== */}
        {activeTab === 'bu' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-2">
              <BigFourSubtitleBar
                label="Business Units"
                variant="left-accent"
                accentColor="accent"
                icon="ri-building-2-line"
                className="mb-4"
              />
              {buPerformance.map((bu, idx) => (
                <div
                  key={bu.bu}
                  onClick={() => setSelectedBUIdx(idx)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedBUIdx === idx ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-foreground-700 line-clamp-1">{bu.bu}</span>
                    <span className="text-sm font-bold" style={{ color: bu.color }}>{bu.pipelineValue}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-foreground-500">
                    <span>{bu.won} mission{bu.won > 1 ? 's' : ''} gagnée{bu.won > 1 ? 's' : ''}</span>
                    <span>{bu.wonValue}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-3">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <BigFourSubtitleBar
                  label={`${selectedBU.bu} — Détail Pipeline`}
                  variant="double-stroke"
                  accentColor="primary"
                  className="mb-6"
                />
                {/* BU Mini-Funnel */}
                <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
                  {[
                    { label: 'Leads', value: selectedBU.leads },
                    { label: 'MQL', value: selectedBU.mql },
                    { label: 'SQL', value: selectedBU.sql },
                    { label: 'Opp.', value: selectedBU.opportunities },
                    { label: 'Prop.', value: selectedBU.proposals },
                    { label: 'Nég.', value: selectedBU.negotiations },
                    { label: 'Won', value: selectedBU.won },
                  ].map((s, idx) => (
                    <div key={s.label} className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: `${selectedBU.color}10`, border: `1.5px solid ${selectedBU.color}30` }}>
                        <span className="text-sm font-bold text-foreground-950">{s.value}</span>
                        <span className="text-[10px] text-foreground-500">{s.label}</span>
                      </div>
                      {idx < 6 && <i className="ri-arrow-right-s-line text-foreground-300"></i>}
                    </div>
                  ))}
                </div>
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">Pipeline</div>
                    <div className="text-lg font-bold text-foreground-950">{selectedBU.pipelineValue}</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">CA Gagné</div>
                    <div className="text-lg font-bold text-green-600">{selectedBU.wonValue}</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">Ticket Moyen</div>
                    <div className="text-lg font-bold text-foreground-950">{selectedBU.avgDealSize}</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">Conversion Lead→Won</div>
                    <div className="text-lg font-bold" style={{ color: selectedBU.color }}>
                      {selectedBU.leads > 0 ? ((selectedBU.won / selectedBU.leads) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== FUNNEL & CIBLES ===== */}
        {activeTab === 'funnel' && (
          <div className="space-y-8">
            {/* Conversion Targets */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <BigFourSubtitleBar
                label="Conversion Targets — Modèle KBR"
                variant="left-accent"
                accentColor="primary"
                icon="ri-trophy-line"
                className="mb-6"
              />
              <div className="space-y-4">
                {Object.entries(KBR_CONVERSION_TARGETS).map(([key, target]) => {
                  const barWidth = target.actual * 100;
                  const targetWidth = target.rate * 100;
                  const trendIcon = target.trend === 'up' ? 'ri-arrow-up-line text-green-500' : target.trend === 'down' ? 'ri-arrow-down-line text-red-500' : 'ri-subtract-line text-foreground-400';
                  return (
                    <div key={key} className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-foreground-900">{target.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold" style={{ color: target.actual >= target.rate ? '#22c55e' : '#ef4444' }}>
                            {Math.round(target.actual * 100)}%
                          </span>
                          <i className={trendIcon + ' text-sm'}></i>
                          <span className="text-xs text-foreground-400">Cible: {Math.round(target.rate * 100)}%</span>
                        </div>
                      </div>
                      <div className="relative h-2.5 rounded-full bg-background-200/70 overflow-hidden">
                        <div className="absolute inset-y-0 left-0 h-full rounded-full" style={{ width: `${barWidth}%`, backgroundColor: barWidth >= targetWidth ? '#22c55e' : '#f59e0b' }}></div>
                        <div className="absolute inset-y-0 h-full w-0.5 bg-foreground-950" style={{ left: `${targetWidth}%` }}></div>
                        <div className="absolute -top-1 text-[8px] font-bold text-foreground-400" style={{ left: `${targetWidth}%`, transform: 'translateX(-50%)' }}>
                          {Math.round(target.rate * 100)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Avg Cycle Days */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <BigFourSubtitleBar
                label="Cycle Moyen par Étape (jours)"
                variant="minimal-dot"
                accentColor="secondary"
                icon="ri-time-line"
                className="mb-5"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(KBR_FUNNEL_DATA.avgCycleDays).map(([key, days]) => (
                  <div key={key} className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{days}</div>
                    <div className="text-xs text-foreground-500">{key.replace(/_/g, ' → ')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <BigFourSubtitleBar
                label="Tendance Mensuelle — Leads, MQL, SQL"
                variant="left-accent"
                accentColor="primary"
                icon="ri-line-chart-line"
                className="mb-6"
              />
              <div className="space-y-2">
                {monthlyTrend.map((m: any) => {
                  const total = (m.leads || 0) + (m.mql || 0) + (m.sql || 0);
                  const barPct = maxTrend > 0 ? (total / maxTrend) * 100 : 0;
                  return (
                    <div key={m.month} className="flex items-center gap-3">
                      <span className="w-20 flex-shrink-0 text-xs text-foreground-500">{m.month}</span>
                      <div className="flex-1 h-6 bg-background-200/70 rounded-full overflow-hidden relative">
                        <div className="flex h-full">
                          <div className="h-full bg-foreground-400 flex items-center justify-center text-[10px] text-white font-medium" style={{ width: `${m.leads > 0 ? (m.leads / total) * 100 : 0}%` }}>
                            {m.leads > 20 ? m.leads : ''}
                          </div>
                          <div className="h-full bg-amber-400 flex items-center justify-center text-[10px] text-white font-medium" style={{ width: `${m.mql > 0 ? (m.mql / total) * 100 : 0}%` }}>
                            {m.mql > 10 ? m.mql : ''}
                          </div>
                          <div className="h-full bg-secondary-400 flex items-center justify-center text-[10px] text-white font-medium" style={{ width: `${m.sql > 0 ? (m.sql / total) * 100 : 0}%` }}>
                            {m.sql > 0 ? m.sql : ''}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-xs text-foreground-400 space-x-2">
                        <span>L: {m.leads}</span>
                        <span className="text-amber-600">M: {m.mql}</span>
                        <span className="text-secondary-600">S: {m.sql}</span>
                        <span className="text-green-600 font-bold">{m.revenue}M</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-foreground-400"></div><span className="text-xs text-foreground-500">Leads</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-400"></div><span className="text-xs text-foreground-500">MQL</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-secondary-400"></div><span className="text-xs text-foreground-500">SQL</span></div>
              </div>
            </div>
          </div>
        )}

        {/* ===== REVENUE & ACCÈS ===== */}
        {activeTab === 'revenue' && (
          <div className="space-y-8">
            {/* 3-Level Access Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: '#22c55e15', border: '2px solid #22c55e30' }}>
                  <i className="ri-download-line text-2xl" style={{ color: '#22c55e' }}></i>
                </div>
                <div className="text-3xl font-bold text-foreground-950 mb-1">{accessStats.level1.downloads.toLocaleString('fr-FR')}</div>
                <div className="text-sm font-bold" style={{ color: '#22c55e' }}>{accessStats.level1.label}</div>
                <div className="text-xs text-foreground-500 mt-2">Téléchargements gratuits — Capture email</div>
              </div>
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: '#f59e0b15', border: '2px solid #f59e0b30' }}>
                  <i className="ri-shopping-cart-line text-2xl" style={{ color: '#f59e0b' }}></i>
                </div>
                <div className="text-3xl font-bold text-foreground-950 mb-1">{accessStats.level2.purchases}</div>
                <div className="text-sm font-bold" style={{ color: '#f59e0b' }}>{accessStats.level2.label}</div>
                <div className="text-xs text-foreground-500 mt-2">{accessStats.level2.revenue}</div>
              </div>
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: '#ef444415', border: '2px solid #ef444430' }}>
                  <i className="ri-briefcase-line text-2xl" style={{ color: '#ef4444' }}></i>
                </div>
                <div className="text-3xl font-bold text-foreground-950 mb-1">{accessStats.level3.missions}</div>
                <div className="text-sm font-bold" style={{ color: '#ef4444' }}>{accessStats.level3.label}</div>
                <div className="text-xs text-foreground-500 mt-2">{accessStats.level3.revenue}</div>
              </div>
            </div>

            {/* Monthly Revenue Trend */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <BigFourSubtitleBar
                label="CA Mensuel — Objectif vs Réalisé"
                variant="double-stroke"
                accentColor="accent"
                icon="ri-funds-line"
                className="mb-6"
              />
              <div className="space-y-3">
                {monthlyTrend.map((m: any) => {
                  const targetM = 375;
                  const actualPct = (m.revenue || 0) > 0 ? ((m.revenue || 0) / targetM) * 100 : 0;
                  return (
                    <div key={m.month} className="flex items-center gap-3">
                      <span className="w-20 flex-shrink-0 text-xs text-foreground-500">{m.month}</span>
                      <div className="flex-1">
                        <div className="h-6 bg-background-200/70 rounded-full overflow-hidden relative">
                          <div className="absolute inset-y-0 left-0 bg-accent-500 rounded-full flex items-center pl-2" style={{ width: `${Math.min(actualPct, 100)}%` }}>
                            {actualPct > 15 && <span className="text-[10px] text-white font-medium">{m.revenue}M FCFA</span>}
                          </div>
                        </div>
                      </div>
                      <span className="flex-shrink-0 text-xs text-foreground-500 w-10 text-right">{m.won} mission{m.won > 1 ? 's' : ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KBR Model Summary */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <BigFourSubtitleBar
                label="Modèle KBR — Synthèse"
                variant="left-accent"
                accentColor="primary"
                icon="ri-pie-chart-line"
                className="mb-5"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-background-100 rounded-lg text-center">
                  <div className="text-xs text-foreground-500 mb-1">Leads Total</div>
                  <div className="text-xl font-bold text-foreground-950">{funnelData.total.leads}</div>
                </div>
                <div className="p-4 bg-background-100 rounded-lg text-center">
                  <div className="text-xs text-foreground-500 mb-1">MQL / Mois</div>
                  <div className="text-xl font-bold text-amber-600">{funnelData.monthlyTarget.mql}</div>
                </div>
                <div className="p-4 bg-background-100 rounded-lg text-center">
                  <div className="text-xs text-foreground-500 mb-1">CA Objectif / Mois</div>
                  <div className="text-xl font-bold text-foreground-950">{funnelData.monthlyTarget.revenue}</div>
                </div>
                <div className="p-4 bg-background-100 rounded-lg text-center">
                  <div className="text-xs text-foreground-500 mb-1">Pipeline Total</div>
                  <div className="text-xl font-bold text-accent-500">{funnelData.pipelineValueTotal}</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer KPIs */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <BigFourSubtitleBar
            label="Indicateurs Clés — KBR Analytics"
            variant="centered-pillars"
            accentColor="primary"
            className="mb-7"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="text-lg font-bold text-foreground-950">{funnelData.total.leads}</div>
              <div className="text-[10px] text-foreground-500">Leads</div>
            </div>
            <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="text-lg font-bold text-amber-600">{funnelData.total.mql}</div>
              <div className="text-[10px] text-foreground-500">MQL</div>
            </div>
            <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="text-lg font-bold text-secondary-600">{funnelData.total.sql}</div>
              <div className="text-[10px] text-foreground-500">SQL</div>
            </div>
            <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="text-lg font-bold text-accent-600">{funnelData.total.opportunities}</div>
              <div className="text-[10px] text-foreground-500">Opportunités</div>
            </div>
            <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="text-lg font-bold text-primary-600">{funnelData.total.proposals}</div>
              <div className="text-[10px] text-foreground-500">Propositions</div>
            </div>
            <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="text-lg font-bold text-red-600">{funnelData.total.negotiations}</div>
              <div className="text-[10px] text-foreground-500">Négociations</div>
            </div>
            <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="text-lg font-bold text-green-600">{funnelData.total.won}</div>
              <div className="text-[10px] text-foreground-500">Missions Gagnées</div>
            </div>
            <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="text-lg font-bold text-foreground-400">{funnelData.total.lost}</div>
              <div className="text-[10px] text-foreground-500">Perdues</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





