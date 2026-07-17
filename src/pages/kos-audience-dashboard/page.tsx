import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { AUDIENCE_METRICS, AUDIENCE_DASHBOARD_KPIS, type AudienceMetric } from '@/mocks/kosAudienceDashboard';

function formatFCFA(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)} Md FCFA`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)} M FCFA`;
  return `${n.toLocaleString('fr-FR')} FCFA`;
}

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full h-1.5 rounded-full bg-background-200 overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function TrendBadge({ trend, value }: { trend: 'up' | 'down' | 'stable'; value: number }) {
  const cfg = {
    up: { bg: '#D1FAE5', text: '#065F46', icon: 'ri-arrow-up-s-line', sign: '+' },
    down: { bg: '#FEE2E2', text: '#991B1B', icon: 'ri-arrow-down-s-line', sign: '' },
    stable: { bg: '#FEF3C7', text: '#92400E', icon: 'ri-subtract-line', sign: '' },
  }[trend];
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ backgroundColor: cfg.bg, color: cfg.text }}>
      <i className={cfg.icon} />{cfg.sign}{Math.abs(value)}%
    </span>
  );
}

function AudienceCard({ metric, isSelected, onClick }: { metric: AudienceMetric; isSelected: boolean; onClick: () => void }) {
  const topVideoTypeLabel: Record<string, string> = {
    analyse: 'Analyse', formation: 'Formation', capsule: 'Capsule', interview: 'Interview', podcast: 'Podcast', reportage: 'Reportage',
  };
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border-2 p-4 cursor-pointer transition-all ${isSelected ? 'border-foreground-950 bg-background-50' : 'border-background-200/70 bg-background-50 hover:border-foreground-300'}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
          <i className={`${metric.icon} text-base`} style={{ color: metric.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-foreground-950 truncate">{metric.segmentLabel}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <TrendBadge trend={metric.trend} value={metric.trendValue} />
            <span className="text-[9px] text-foreground-400">30j</span>
          </div>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold font-heading" style={{ color: metric.audienceScore >= 90 ? '#059669' : metric.audienceScore >= 80 ? '#CA8A04' : '#DC2626' }}>
            {metric.audienceScore}
          </span>
          <span className="text-[9px] text-foreground-400">score</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-[9px] text-foreground-400 mb-0.5">Leads convertis</p>
          <p className="text-sm font-bold text-foreground-950">{metric.leadsConverted}/{metric.leadsGenerated}</p>
          <p className="text-[9px] text-emerald-600 font-bold">{metric.conversionRate}% conv.</p>
        </div>
        <div>
          <p className="text-[9px] text-foreground-400 mb-0.5">Valeur moy.</p>
          <p className="text-xs font-bold text-foreground-950">{formatFCFA(metric.avgDealValue)}</p>
          <p className="text-[9px] text-foreground-400">{metric.totalViews.toLocaleString('fr-FR')} vues</p>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-[9px] mb-0.5">
          <span className="text-foreground-400">Complétion vidéo</span>
          <span className="font-bold text-foreground-700">{metric.completionRate}%</span>
        </div>
        <ScoreBar value={metric.completionRate} color={metric.color} />
      </div>

      <div className="flex items-center justify-between text-[10px] mt-2">
        <span className="text-foreground-400">Top vidéo : <strong className="text-foreground-700">{topVideoTypeLabel[metric.topVideoType] || metric.topVideoType}</strong></span>
        <span className="text-foreground-400">Voix : <strong className="text-foreground-700">{metric.topVoice.split(' ')[0]}</strong></span>
      </div>
    </div>
  );
}

function AudienceDetail({ metric }: { metric: AudienceMetric }) {
  const videoTypeColors: Record<string, string> = {
    analyse: '#86BC25', formation: '#C2410C', capsule: '#CA8A04', interview: '#0A66C2', podcast: '#7C3AED', reportage: '#D97757',
  };
  const voiceColors: Record<string, string> = {
    'Dr. Célestin Koffi': '#86BC25',
    'Fatoumata Diallo': '#C2410C',
    'Aminata Sow': '#D97757',
  };

  const totalVideosByType = Object.values(metric.videosByType).reduce((a, b) => a + b, 0);
  const totalVoices = Object.values(metric.voiceDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-2xl border-2 p-5" style={{ borderColor: metric.color + '40', backgroundColor: metric.color + '08' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}20` }}>
            <i className={`${metric.icon} text-2xl`} style={{ color: metric.color }} />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground-950">{metric.segmentLabel}</h2>
            <div className="flex items-center gap-2 mt-1">
              <TrendBadge trend={metric.trend} value={metric.trendValue} />
              <span className="text-xs text-foreground-500">sur les 30 derniers jours</span>
            </div>
          </div>
          <div className="ml-auto text-center">
            <div className="w-16 h-16 rounded-2xl border-4 flex items-center justify-center mx-auto" style={{ borderColor: metric.audienceScore >= 90 ? '#059669' : metric.audienceScore >= 80 ? '#CA8A04' : '#DC2626' }}>
              <span className="text-xl font-bold text-foreground-950">{metric.audienceScore}</span>
            </div>
            <span className="text-[10px] text-foreground-400">Score global</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Leads générés', value: metric.leadsGenerated, icon: 'ri-user-line', color: '#86BC25' },
            { label: 'Leads convertis', value: metric.leadsConverted, icon: 'ri-check-double-line', color: '#059669' },
            { label: 'Taux conversion', value: `${metric.conversionRate}%`, icon: 'ri-arrow-right-up-line', color: '#CA8A04' },
            { label: 'Valeur moy.', value: formatFCFA(metric.avgDealValue), icon: 'ri-funds-line', color: '#0A66C2' },
          ].map((kpi, i) => (
            <div key={i} className="rounded-xl bg-background-50 p-3 text-center">
              <i className={`${kpi.icon} text-sm mb-1 block`} style={{ color: kpi.color }} />
              <p className="text-sm font-bold text-foreground-950">{kpi.value}</p>
              <p className="text-[9px] text-foreground-400">{kpi.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Vidéo */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
        <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Engagement Vidéo</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: 'Total Vues', value: metric.totalViews.toLocaleString('fr-FR'), icon: 'ri-eye-line', color: '#FF0000' },
            { label: 'Watch Time moy.', value: `${metric.avgWatchTime} min`, icon: 'ri-timer-line', color: '#86BC25' },
            { label: 'Taux de complétion', value: `${metric.completionRate}%`, icon: 'ri-play-list-2-line', color: '#CA8A04' },
            { label: 'Engagement rate', value: `${metric.engagementRate}%`, icon: 'ri-heart-line', color: '#C2410C' },
          ].map((kpi, i) => (
            <div key={i} className="rounded-xl bg-background-100 p-3 text-center">
              <i className={`${kpi.icon} text-sm mb-1 block`} style={{ color: kpi.color }} />
              <p className="text-sm font-bold text-foreground-950">{kpi.value}</p>
              <p className="text-[9px] text-foreground-400">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Complétion bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-foreground-500">Taux de complétion vidéo</span>
            <span className="font-bold" style={{ color: metric.color }}>{metric.completionRate}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-background-200 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${metric.completionRate}%`, backgroundColor: metric.color }} />
          </div>
        </div>
        <p className="text-[10px] text-foreground-400">
          Top vidéo : <strong className="text-foreground-700">{metric.topVideoType}</strong> avec <strong className="text-foreground-700">{metric.topVideoViews.toLocaleString('fr-FR')} vues</strong>
        </p>
      </div>

      {/* Distribution par Type de Vidéo */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
        <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Distribution par Type de Vidéo</h3>
        <div className="space-y-2.5">
          {Object.entries(metric.videosByType).map(([type, count]) => {
            const pct = Math.round((count / totalVideosByType) * 100);
            const color = videoTypeColors[type] || '#6B7280';
            return (
              <div key={type}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold capitalize text-foreground-800">{type}</span>
                  <span className="text-foreground-400">{count} vidéo{count > 1 ? 's' : ''} · {pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] text-foreground-400">
          Type le plus engageant : <strong className="text-foreground-700">{metric.topVideoType}</strong>
        </p>
      </div>

      {/* Distribution Voix KHEPRA */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
        <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Distribution Voix KHEPRA</h3>
        <div className="space-y-2.5">
          {Object.entries(metric.voiceDistribution).map(([voiceName, count]) => {
            const pct = Math.round((count / totalVoices) * 100);
            const color = voiceColors[voiceName] || '#6B7280';
            return (
              <div key={voiceName}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-foreground-800">{voiceName}</span>
                  <span className="text-foreground-400">{count} vidéo{count > 1 ? 's' : ''} · {pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] text-foreground-400">
          Voix la plus efficace : <strong className="text-foreground-700">{metric.topVoice}</strong>
        </p>
      </div>
    </div>
  );
}

type SortField = 'audienceScore' | 'conversionRate' | 'totalViews' | 'avgDealValue';

export default function KOSAudienceDashboardPage() {
  const [selectedSegment, setSelectedSegment] = useState<string>(AUDIENCE_METRICS[0].segment);
  const [sortField, setSortField] = useState<SortField>('audienceScore');
  const [activeView, setActiveView] = useState<'grid' | 'ranking'>('grid');
  const [activeTab, setActiveTab] = useState<'overview' | 'conversion' | 'engagement' | 'voix'>('overview');

  const sortedMetrics = useMemo(() => {
    return [...AUDIENCE_METRICS].sort((a, b) => b[sortField] - a[sortField]);
  }, [sortField]);

  const selectedMetric = useMemo(
    () => AUDIENCE_METRICS.find((m) => m.segment === selectedSegment) || AUDIENCE_METRICS[0],
    [selectedSegment],
  );

  const kpis = AUDIENCE_DASHBOARD_KPIS;

  return (
    <KOSHubLayout hubId={88}>
      <SeoHead
        title="KOS™ Gestion des Audiences — Dashboard Performance par Segment | KHEPRA EXPERTS"
        description="Dashboard de performance des audiences KHEPRA EXPERTS. Métriques de conversion et engagement par segment : DG Banque, Compliance Officer, Risk Manager, Investisseur, SFD."
        keywords="audience dashboard, performance segment, conversion vidéo, engagement YouTube, KHEPRA EXPERTS, KOS"
        canonicalPath="/kos-audience-dashboard"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 50%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-3 backdrop-blur-sm">
              <i className="ri-group-2-line" />KOS™ Gestion des Audiences — Dashboard Performance
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight">
              Performance par Segment d&apos;Audience
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-2 max-w-3xl">
              {kpis.totalSegments} segments · {kpis.totalLeadsGenerated} leads · {kpis.globalConversionRate}% conversion globale · {kpis.totalViews.toLocaleString('fr-FR')} vues totales. Quelle audience convertit le mieux ? Quel type de vidéo engage le plus par profil ?
            </p>
          </div>
        </div>
      </section>

      {/* KPI Strip */}
      <section className="bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'Segments', value: kpis.totalSegments, icon: 'ri-group-line', color: '#86BC25' },
              { label: 'Leads Générés', value: kpis.totalLeadsGenerated, icon: 'ri-user-line', color: '#0A66C2' },
              { label: 'Leads Convertis', value: kpis.totalLeadsConverted, icon: 'ri-check-double-line', color: '#059669' },
              { label: 'Conversion', value: `${kpis.globalConversionRate}%`, icon: 'ri-arrow-right-up-line', color: '#CA8A04' },
              { label: 'Total Vues', value: kpis.totalViews.toLocaleString('fr-FR'), icon: 'ri-eye-line', color: '#FF0000' },
              { label: 'Engagement', value: `${kpis.avgEngagementRate}%`, icon: 'ri-heart-line', color: '#C2410C' },
              { label: 'Top Segment', value: 'DG Banque', icon: 'ri-trophy-line', color: '#D4A853' },
              { label: 'Meilleure Voix', value: 'Célestin K.', icon: 'ri-mic-fill', color: '#86BC25' },
            ].map((k, i) => (
              <div key={i} className="rounded-lg bg-background-50 border border-background-200/70 p-2 text-center">
                <i className={`${k.icon} text-xs mb-1 block`} style={{ color: k.color }} />
                <span className="block text-xs font-bold text-foreground-950">{k.value}</span>
                <span className="text-[8px] text-foreground-400">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Nav */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2.5">
            {([
              { id: 'overview', label: 'Vue Globale', icon: 'ri-dashboard-line' },
              { id: 'conversion', label: 'Conversion', icon: 'ri-arrow-right-up-line' },
              { id: 'engagement', label: 'Engagement Vidéo', icon: 'ri-play-circle-line' },
              { id: 'voix', label: 'Performance Voix', icon: 'ri-mic-fill' },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VUE GLOBALE ═══ */}
      {activeTab === 'overview' && (
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Grid */}
              <div className="lg:w-2/5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-lg font-bold text-foreground-950">{kpis.totalSegments} Segments</h2>
                  <div className="flex items-center gap-2">
                    <select
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value as SortField)}
                      className="px-2 py-1.5 text-xs bg-background-100 border border-background-200 rounded-lg text-foreground-700 cursor-pointer focus:outline-none"
                    >
                      <option value="audienceScore">Score</option>
                      <option value="conversionRate">Conversion</option>
                      <option value="totalViews">Vues</option>
                      <option value="avgDealValue">Valeur moy.</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[700px] pr-1">
                  {sortedMetrics.map((metric) => (
                    <AudienceCard
                      key={metric.segment}
                      metric={metric}
                      isSelected={selectedSegment === metric.segment}
                      onClick={() => setSelectedSegment(metric.segment)}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Detail */}
              <div className="lg:w-3/5">
                <AudienceDetail metric={selectedMetric} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CONVERSION ═══ */}
      {activeTab === 'conversion' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Ranking Conversion — Quelle audience convertit le mieux ?</h2>
            <p className="text-sm text-foreground-500 mb-6">Classement des segments par taux de conversion et valeur moyenne des deals générés.</p>
            <div className="space-y-3">
              {[...AUDIENCE_METRICS].sort((a, b) => b.conversionRate - a.conversionRate).map((metric, rank) => (
                <div key={metric.segment} className="rounded-2xl bg-background-50 border border-background-200/70 p-4 flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-sm font-bold flex-shrink-0 ${rank === 0 ? 'bg-[#D4A853] text-white' : rank === 1 ? 'bg-background-200 text-foreground-600' : rank === 2 ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'}`}>
                    {rank + 1}
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${metric.color}15` }}>
                    <i className={`${metric.icon} text-sm`} style={{ color: metric.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground-950">{metric.segmentLabel}</h3>
                    <div className="flex items-center gap-3 text-[10px] text-foreground-400 mt-0.5">
                      <span>{metric.leadsGenerated} leads générés</span>
                      <span>·</span>
                      <span>{metric.leadsConverted} convertis</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0 text-center">
                    <div>
                      <p className="text-sm font-bold" style={{ color: metric.conversionRate >= 25 ? '#059669' : metric.conversionRate >= 20 ? '#CA8A04' : '#DC2626' }}>{metric.conversionRate}%</p>
                      <p className="text-[9px] text-foreground-400">conversion</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground-950">{formatFCFA(metric.avgDealValue)}</p>
                      <p className="text-[9px] text-foreground-400">valeur moy.</p>
                    </div>
                    <TrendBadge trend={metric.trend} value={metric.trendValue} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ENGAGEMENT VIDÉO ═══ */}
      {activeTab === 'engagement' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Engagement Vidéo — Quel type engage le plus par profil ?</h2>
            <p className="text-sm text-foreground-500 mb-6">Types de vidéos les plus engageants par segment, watch time et taux de complétion.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...AUDIENCE_METRICS].sort((a, b) => b.completionRate - a.completionRate).map((metric) => (
                <div key={metric.segment} className="rounded-2xl bg-background-50 border border-background-200/70 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                      <i className={`${metric.icon} text-sm`} style={{ color: metric.color }} />
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950">{metric.segmentLabel}</h3>
                    <TrendBadge trend={metric.trend} value={metric.trendValue} />
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div className="rounded-lg bg-background-100 p-2">
                      <p className="text-sm font-bold text-foreground-950">{metric.avgWatchTime}m</p>
                      <p className="text-[9px] text-foreground-400">Watch time</p>
                    </div>
                    <div className="rounded-lg bg-background-100 p-2">
                      <p className="text-sm font-bold" style={{ color: metric.completionRate >= 70 ? '#059669' : metric.completionRate >= 60 ? '#CA8A04' : '#DC2626' }}>{metric.completionRate}%</p>
                      <p className="text-[9px] text-foreground-400">Complétion</p>
                    </div>
                    <div className="rounded-lg bg-background-100 p-2">
                      <p className="text-sm font-bold text-foreground-950">{metric.engagementRate}%</p>
                      <p className="text-[9px] text-foreground-400">Engagement</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-foreground-500">Type le plus engageant : <strong className="text-foreground-800">{metric.topVideoType}</strong></span>
                    <span className="text-foreground-500">{metric.topVideoViews.toLocaleString('fr-FR')} vues</span>
                  </div>

                  <ScoreBar value={metric.completionRate} color={metric.color} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ PERFORMANCE VOIX ═══ */}
      {activeTab === 'voix' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Performance des Voix KHEPRA par Segment</h2>
            <p className="text-sm text-foreground-500 mb-6">Quelle voix KHEPRA génère le plus de conversion et d&apos;engagement par segment d&apos;audience ?</p>

            {/* Synthèse globale voix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  name: 'Dr. Célestin Koffi',
                  icon: 'ri-mic-fill',
                  color: '#86BC25',
                  segments: AUDIENCE_METRICS.filter((m) => m.topVoice === 'Dr. Célestin Koffi').map((m) => m.segmentLabel),
                  avgConversion: AUDIENCE_METRICS.filter((m) => m.topVoice === 'Dr. Célestin Koffi').reduce((s, m) => s + m.conversionRate, 0) / AUDIENCE_METRICS.filter((m) => m.topVoice === 'Dr. Célestin Koffi').length,
                  totalVideos: AUDIENCE_METRICS.flatMap((m) => Object.entries(m.voiceDistribution)).filter(([k]) => k === 'Dr. Célestin Koffi').reduce((s, [, v]) => s + v, 0),
                },
                {
                  name: 'Fatoumata Diallo',
                  icon: 'ri-mic-fill',
                  color: '#C2410C',
                  segments: AUDIENCE_METRICS.filter((m) => m.topVoice === 'Fatoumata Diallo').map((m) => m.segmentLabel),
                  avgConversion: AUDIENCE_METRICS.filter((m) => m.topVoice === 'Fatoumata Diallo').reduce((s, m) => s + m.conversionRate, 0) / AUDIENCE_METRICS.filter((m) => m.topVoice === 'Fatoumata Diallo').length,
                  totalVideos: AUDIENCE_METRICS.flatMap((m) => Object.entries(m.voiceDistribution)).filter(([k]) => k === 'Fatoumata Diallo').reduce((s, [, v]) => s + v, 0),
                },
                {
                  name: 'Aminata Sow',
                  icon: 'ri-mic-fill',
                  color: '#D97757',
                  segments: AUDIENCE_METRICS.filter((m) => m.topVoice === 'Aminata Sow').map((m) => m.segmentLabel),
                  avgConversion: AUDIENCE_METRICS.filter((m) => m.topVoice === 'Aminata Sow').reduce((s, m) => s + m.conversionRate, 0) / (AUDIENCE_METRICS.filter((m) => m.topVoice === 'Aminata Sow').length || 1),
                  totalVideos: AUDIENCE_METRICS.flatMap((m) => Object.entries(m.voiceDistribution)).filter(([k]) => k === 'Aminata Sow').reduce((s, [, v]) => s + v, 0),
                },
              ].map((voice) => (
                <div key={voice.name} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${voice.color}15` }}>
                      <i className={`${voice.icon} text-2xl`} style={{ color: voice.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{voice.name}</h3>
                      <p className="text-[10px] text-foreground-400">{voice.totalVideos} vidéos produites</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg bg-background-100 p-2 text-center">
                      <p className="text-sm font-bold text-foreground-950">{voice.avgConversion.toFixed(1)}%</p>
                      <p className="text-[9px] text-foreground-400">Conversion moy.</p>
                    </div>
                    <div className="rounded-lg bg-background-100 p-2 text-center">
                      <p className="text-sm font-bold text-foreground-950">{voice.segments.length}</p>
                      <p className="text-[9px] text-foreground-400">Segments top</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-400 mb-1.5">Segments primaires :</p>
                    <div className="flex flex-wrap gap-1">
                      {voice.segments.slice(0, 3).map((seg) => (
                        <span key={seg} className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${voice.color}15`, color: voice.color }}>{seg}</span>
                      ))}
                      {voice.segments.length > 3 && <span className="text-[9px] text-foreground-400">+{voice.segments.length - 3}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table de performance */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-background-100 border-b border-background-200">
                    <th className="text-left p-3 font-bold text-foreground-600">Segment</th>
                    <th className="text-center p-3 font-bold text-foreground-600">Voix Top</th>
                    <th className="text-center p-3 font-bold text-foreground-600">Conversion</th>
                    <th className="text-center p-3 font-bold text-foreground-600">Completion</th>
                    <th className="text-center p-3 font-bold text-foreground-600">Type Vidéo</th>
                    <th className="text-center p-3 font-bold text-foreground-600">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {AUDIENCE_METRICS.map((metric, i) => (
                    <tr key={metric.segment} className={`border-b border-background-200/50 ${i % 2 === 0 ? 'bg-background-50' : 'bg-background-100/50'}`}>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <i className={`${metric.icon} text-xs`} style={{ color: metric.color }} />
                          <span className="font-bold text-foreground-800">{metric.segmentLabel}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-[10px] font-bold text-foreground-700">{metric.topVoice.split(' ')[0]} {metric.topVoice.split(' ')[1]}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`font-bold ${metric.conversionRate >= 25 ? 'text-emerald-600' : metric.conversionRate >= 20 ? 'text-amber-600' : 'text-red-600'}`}>{metric.conversionRate}%</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`font-bold ${metric.completionRate >= 70 ? 'text-emerald-600' : metric.completionRate >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{metric.completionRate}%</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-600 font-bold">{metric.topVideoType}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-bold font-heading text-foreground-950">{metric.audienceScore}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-10 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            <div>
              <h2 className="font-heading text-xl font-bold text-white mb-2">KOS™ Audience Intelligence</h2>
              <p className="text-gray-400 text-sm">Big Four Factory → Audience Dashboard → Voice AI Studio. Optimisez chaque segment avec la voix et le type de contenu qui convertit.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/kos-youtube-download" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:opacity-90 cursor-pointer whitespace-nowrap">
                <i className="ri-git-branch-line" />Big Four Factory
              </Link>
              <Link to="/kos-voice-ai-studio" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#86BC25' }}>
                <i className="ri-mic-fill" />Voice AI Studio
              </Link>
              <Link to="/kos-video-podcast-publishing-pack" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-archive-line" />Publishing Pack
              </Link>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}