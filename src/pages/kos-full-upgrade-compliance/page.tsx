import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSFullUpgradeCompliance } from '@/hooks/useKOSFullUpgradeCompliance';
import type { UpgradeGap, CorrectionTicket, UpgradeEngine } from '@/mocks/kosFullUpgradeCompliance';

function getCriticalityBadge(c: string) {
  switch (c) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'CRITIQUE' };
    case 'high': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'PRIORITAIRE' };
    case 'medium': return { bg: 'bg-background-100', border: 'border-background-200', text: 'text-foreground-600', dot: 'bg-foreground-400', label: 'STANDARD' };
    case 'low': return { bg: 'bg-background-50', border: 'border-background-100', text: 'text-foreground-400', dot: 'bg-foreground-300', label: 'FAIBLE' };
    default: return { bg: 'bg-background-50', border: 'border-background-100', text: 'text-foreground-500', dot: 'bg-foreground-400', label: c };
  }
}

function getStatusBadge(s: string) {
  switch (s) {
    case 'open': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Ouvert' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours' };
    case 'resolved': case 'done': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Résolu' };
    default: return { bg: 'bg-background-50', border: 'border-background-100', text: 'text-foreground-500', label: s };
  }
}

function getCategoryIcon(cat: string) {
  switch (cat) {
    case 'Sécurité': return 'ri-shield-flash-line';
    case 'SEO': return 'ri-search-line';
    case 'Conformité': return 'ri-scales-3-line';
    case 'Accessibilité': return 'ri-user-heart-line';
    case 'Performance': return 'ri-speed-up-line';
    case 'Contenu': return 'ri-quill-pen-line';
    default: return 'ri-stack-line';
  }
}

function getCategoryColor(cat: string) {
  switch (cat) {
    case 'Sécurité': return '#C2410C';
    case 'SEO': return '#0D7B5F';
    case 'Conformité': return '#4F46E5';
    case 'Accessibilité': return '#9B7B2C';
    case 'Performance': return '#E8C547';
    case 'Contenu': return '#4A7A1E';
    default: return '#6B7280';
  }
}

function CircularGauge({ value, target, size = 56, strokeWidth = 5 }: { value: number; target: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const color = value >= 85 ? '#10B981' : value >= 65 ? '#F59E0B' : '#EF4444';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" stroke={color} className="transition-all duration-700" style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold font-heading" style={{ color }}>{value}</span>
        <span className="text-[8px] text-foreground-400">/ {target}</span>
      </div>
    </div>
  );
}

type TabId = 'overview' | 'wave1' | 'wave2' | 'wave3' | 'engines' | 'tickets';

export default function KOSFullUpgradeCompliancePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedGap, setExpandedGap] = useState<string | null>(null);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [gapFilter, setGapFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [ticketFilter, setTicketFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');

  const {
    gaps, tickets, engines, waves, stats,
    loading, error, isLive,
    activeWave, setActiveWave,
    filteredGaps, filteredTickets, allVagueGaps,
    appliedTickets, appliedGaps,
    applyTicket, applyGap, refetch,
  } = useKOSFullUpgradeCompliance();

  const tabs: { id: TabId; label: string; icon: string; count?: number }[] = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'ri-dashboard-line' },
    { id: 'wave1', label: 'Vague 1 — 72h', icon: 'ri-flashlight-line', count: 10 },
    { id: 'wave2', label: 'Vague 2 — 2 sem.', icon: 'ri-stack-line', count: 13 },
    { id: 'wave3', label: 'Vague 3 — 1 mois', icon: 'ri-calendar-line', count: 6 },
    { id: 'engines', label: 'Moteurs (8)', icon: 'ri-cpu-line' },
    { id: 'tickets', label: `Tickets (${tickets.filter(t => !appliedTickets.has(t.id)).length})`, icon: 'ri-tools-line' },
  ];

  const displayGaps = activeTab === 'overview' || activeTab === 'engines'
    ? gaps
    : activeTab === 'wave1' ? gaps.filter(g => g.vague === 1)
    : activeTab === 'wave2' ? gaps.filter(g => g.vague === 2)
    : gaps.filter(g => g.vague === 3);

  const filteredDisplayGaps = useMemo(() => {
    let filtered = displayGaps;
    if (gapFilter !== 'all') filtered = filtered.filter(g => g.criticality === gapFilter);
    return filtered;
  }, [displayGaps, gapFilter]);

  const displayTickets = activeTab === 'overview' || activeTab === 'engines'
    ? tickets
    : activeTab === 'wave1' ? tickets.filter(t => t.vague === 1)
    : activeTab === 'wave2' ? tickets.filter(t => t.vague === 2)
    : activeTab === 'wave3' ? tickets.filter(t => t.vague === 3)
    : tickets;

  const filteredDisplayTickets = useMemo(() => {
    let filtered = displayTickets.filter(t => !appliedTickets.has(t.id));
    if (ticketFilter !== 'all') filtered = filtered.filter(t => t.priority === ticketFilter);
    return filtered;
  }, [displayTickets, ticketFilter, appliedTickets]);

  const resolvedTotal = appliedGaps.size + appliedTickets.size;
  const totalItems = gaps.length + tickets.length;

  if (loading) {
    return (
      <KOSHubLayout hubId={46}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
              <span className="text-sm">Scan des ressources et écarts réglementaires...</span>
            </div>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  if (error && gaps.length === 0) {
    return (
      <KOSHubLayout hubId={46}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl" /></div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-foreground-950 text-white text-xs font-bold cursor-pointer hover:bg-foreground-800 transition-all whitespace-nowrap"><i className="ri-refresh-line mr-1.5" />Réexécuter</button>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  return (
    <KOSHubLayout hubId={46}>
      <SeoHead
        title="KOS Full Upgrade & Compliance Correction™ — Upgrade Ressources + Correction Réglementaire | KHEPRA EXPERTS"
        description="Cockpit unifié de full upgrade des ressources KOS (48 agents, 8 moteurs) et correction totale des écarts réglementaires. 3 vagues, 15 gaps, 14 tickets. Conformité ISO 27001, RGPD, OWASP, WCAG AA."
        keywords="KOS Full Upgrade, compliance correction, regulatory gaps, resource upgrade, sécurité, SEO, conformité, KHEPRA EXPERTS"
        canonicalPath="/kos-full-upgrade-compliance"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20technological%20dashboard%20showing%20a%20massive%20system%20upgrade%20in%20progress%20with%20emerald%20green%20glowing%20nodes%20connecting%20across%20a%20dark%20command%20center%2C%20compliance%20checkmarks%20radiating%20from%20interconnected%20hexagons%2C%20vibrant%20data%20streams%20showing%20resource%20optimization%20metrics%2C%20clean%20futuristic%20enterprise%20architecture%20visualization%20with%20layered%20depth%2C%20premium%20corporate%20aesthetic%20with%20subtle%20geometric%20grid%20patterns%20and%20soft%20ambient%20light&width=1920&height=600&seq=kos-full-upgrade-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <i className="ri-shield-check-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">KOS Full Upgrade & Compliance Correction™</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${isLive ? 'bg-emerald-500/20 border border-emerald-400/30' : 'bg-amber-500/20 border border-amber-400/30'}`}>
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                </span>
              </div>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Full Upgrade Ressources.
              <span className="block text-emerald-400 mt-2">Correction Totale Conformité.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">15 écarts réglementaires</strong> identifiés · <strong className="text-white">14 tickets</strong> de correction · <strong className="text-white">8 moteurs</strong> upgradés ·{' '}
              <strong className="text-white">3 vagues</strong> d'exécution. Objectif : score conformité <strong className="text-emerald-400">98/100</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Critiques', value: stats.criticalGaps, color: 'bg-red-500/20 border-red-400/30', text: 'text-red-300', dot: 'bg-red-500' },
                { label: 'Prioritaires', value: stats.highGaps, color: 'bg-amber-500/20 border-amber-400/30', text: 'text-amber-300', dot: 'bg-amber-500' },
                { label: 'Standards', value: stats.mediumGaps, color: 'bg-background-500/20 border-background-400/30', text: 'text-gray-300', dot: 'bg-gray-500' },
                { label: 'Score Conformité Actuel', value: `${stats.complianceScore}/100`, color: 'bg-red-500/20 border-red-400/30', text: 'text-red-300', dot: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${item.color}`}>
                  <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                  <span className={`text-sm font-semibold ${item.text}`}>{item.value} {item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id === 'wave1') setActiveWave(1); if (tab.id === 'wave2') setActiveWave(2); if (tab.id === 'wave3') setActiveWave(3); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-foreground-950 text-white' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'}`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                {tab.count && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-background-200 text-foreground-500'}`}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-foreground-600 whitespace-nowrap">Progression : {resolvedTotal}/{totalItems}</span>
            <div className="flex-1 h-3 rounded-full bg-background-200 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${(resolvedTotal / totalItems) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-emerald-600 whitespace-nowrap">{Math.round((resolvedTotal / totalItems) * 100)}%</span>
          </div>
        </div>
      </section>

      {/* ===== TAB: OVERVIEW ===== */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <section className="py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
                {[
                  { label: 'Écarts Totaux', value: String(stats.totalGaps), icon: 'ri-error-warning-line', color: '#EF4444' },
                  { label: 'Critiques', value: String(stats.criticalGaps), icon: 'ri-alert-line', color: '#DC2626' },
                  { label: 'Prioritaires', value: String(stats.highGaps), icon: 'ri-arrow-up-circle-line', color: '#F59E0B' },
                  { label: 'Standards', value: String(stats.mediumGaps), icon: 'ri-information-line', color: '#6B7280' },
                  { label: 'Tickets', value: String(stats.totalTickets), icon: 'ri-tools-line', color: '#4F46E5' },
                  { label: 'Moteurs', value: String(stats.totalEngines), icon: 'ri-cpu-line', color: '#0D7B5F' },
                  { label: 'Score Conformité', value: `${stats.complianceScore}`, icon: 'ri-shield-check-line', color: '#EF4444' },
                  { label: 'Score Cible', value: `${stats.targetComplianceScore}`, icon: 'ri-flag-line', color: '#10B981' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                      <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                    </div>
                    <span className="block text-lg font-bold text-foreground-950 font-heading">{s.value}</span>
                    <span className="text-[10px] text-foreground-400">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Score Gauges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="rounded-2xl bg-white border border-background-200 p-6 text-center">
                  <h3 className="text-sm font-bold text-foreground-700 mb-4">Score Ressources</h3>
                  <CircularGauge value={stats.globalScore} target={stats.targetScore} size={80} strokeWidth={6} />
                  <p className="text-xs text-foreground-500 mt-3">{stats.globalScore}/10 → Objectif {stats.targetScore}/10</p>
                </div>
                <div className="rounded-2xl bg-white border border-background-200 p-6 text-center">
                  <h3 className="text-sm font-bold text-foreground-700 mb-4">Score Conformité</h3>
                  <CircularGauge value={stats.complianceScore} target={stats.targetComplianceScore} size={80} strokeWidth={6} />
                  <p className="text-xs text-foreground-500 mt-3">{stats.complianceScore}/100 → Objectif {stats.targetComplianceScore}/100</p>
                </div>
                <div className="rounded-2xl bg-white border border-background-200 p-6">
                  <h3 className="text-sm font-bold text-foreground-700 mb-4 text-center">3 Vagues d'Exécution</h3>
                  <div className="space-y-3">
                    {waves.map((wave) => (
                      <div key={wave.id} className={`rounded-xl p-3 ${wave.id === 1 ? 'bg-red-50 border border-red-100' : wave.id === 2 ? 'bg-amber-50 border border-amber-100' : 'bg-background-50 border border-background-100'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-foreground-800">{wave.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${wave.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-background-200 text-foreground-500'}`}>{wave.status === 'active' ? 'ACTIVE' : 'En attente'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-500">
                          <span><i className="ri-time-line mr-0.5" />{wave.deadline}</span>
                          <span>{wave.gapsCount} gaps</span>
                          <span>{wave.ticketsCount} tickets</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Engines Health */}
              <h3 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-cpu-line text-foreground-700" />8 Moteurs KOS — État Post-Upgrade
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {engines.map((engine) => {
                  const cpuColor = engine.cpuUsage > 60 ? '#EF4444' : engine.cpuUsage > 40 ? '#F59E0B' : '#10B981';
                  const memColor = engine.memoryUsage > 60 ? '#EF4444' : engine.memoryUsage > 40 ? '#F59E0B' : '#10B981';
                  const statusDot = engine.status === 'healthy' ? 'bg-emerald-500' : engine.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500';
                  const statusText = engine.status === 'healthy' ? 'Healthy' : engine.status === 'degraded' ? 'Degraded' : 'Critical';
                  return (
                    <a key={engine.id} href={engine.path} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-md transition-all cursor-pointer block">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${engine.color}15` }}>
                            <i className={`${engine.icon} text-xs`} style={{ color: engine.color }} />
                          </div>
                          <span className="text-xs font-bold text-foreground-800 truncate max-w-[120px]">{engine.name}</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${statusDot}`} title={statusText} />
                      </div>
                      <div className="space-y-1.5 mb-2">
                        <div className="flex justify-between text-[10px]"><span className="text-foreground-400">CPU</span><span className="font-bold" style={{ color: cpuColor }}>{engine.cpuUsage}%</span></div>
                        <div className="flex justify-between text-[10px]"><span className="text-foreground-400">Mémoire</span><span className="font-bold" style={{ color: memColor }}>{engine.memoryUsage}%</span></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-foreground-500 pt-2 border-t border-background-100">
                        <span>{engine.activeAgents}/{engine.agentsCount} agents</span>
                        {engine.gapAgents > 0 ? <span className="text-red-500 font-bold">{engine.gapAgents} GAP</span> : <span className="text-emerald-500 font-bold">✓</span>}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== TAB: ENGINES ===== */}
      {activeTab === 'engines' && (
        <section className="py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">8 Moteurs KOS — Cibles Upgrade</h2>
              <p className="text-foreground-600">Chaque moteur a une cible d'upgrade spécifique. Priorité aux moteurs Critical et Degraded.</p>
            </div>
            <div className="space-y-4">
              {engines.map((engine) => {
                const statusBadge = getStatusBadge(engine.status === 'healthy' ? 'resolved' : engine.status === 'degraded' ? 'in_progress' : 'open');
                return (
                  <div key={engine.id} className="rounded-2xl bg-white border border-background-200 p-5">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="lg:w-64 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${engine.color}15` }}>
                            <i className={`${engine.icon} text-lg`} style={{ color: engine.color }} />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-foreground-950 font-heading">{engine.name}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}>{statusBadge.label}</span>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-foreground-400">Agents</span><span className="font-bold">{engine.activeAgents}/{engine.agentsCount} actifs</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">CPU</span><span className="font-bold">{engine.cpuUsage}%</span></div>
                          <div className="flex justify-between"><span className="text-foreground-400">Mémoire</span><span className="font-bold">{engine.memoryUsage}%</span></div>
                          {engine.gapAgents > 0 && <div className="flex justify-between"><span className="text-red-500">GAPs</span><span className="font-bold text-red-600">{engine.gapAgents}</span></div>}
                        </div>
                      </div>
                      <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Cible Upgrade</h4>
                        <p className="text-sm text-amber-900">{engine.upgradeTarget || 'Activation agents + auto-deploy'}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== TABS: WAVES 1, 2, 3 ===== */}
      {(activeTab === 'wave1' || activeTab === 'wave2' || activeTab === 'wave3') && (
        <section className="py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {waves.filter(w => (activeTab === 'wave1' && w.id === 1) || (activeTab === 'wave2' && w.id === 2) || (activeTab === 'wave3' && w.id === 3)).map(wave => (
              <div key={wave.id}>
                <div className={`rounded-2xl p-5 mb-8 ${wave.id === 1 ? 'bg-red-50/40 border border-red-100' : wave.id === 2 ? 'bg-amber-50/40 border border-amber-100' : 'bg-background-50 border border-background-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${wave.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-background-200 text-foreground-500'}`}>{wave.status === 'active' ? 'EN COURS' : 'EN ATTENTE'}</span>
                    <h2 className="font-heading text-xl font-bold text-foreground-950">{wave.name}</h2>
                  </div>
                  <p className="text-sm text-foreground-600 mb-3">{wave.description}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground-500">
                    <span><i className="ri-time-line mr-1" />Deadline : {wave.deadline}</span>
                    <span>{wave.gapsCount} écarts</span>
                    <span>{wave.ticketsCount} tickets</span>
                  </div>
                </div>

                {/* Gaps */}
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-error-warning-line text-red-500" />Écarts Réglementaires ({allVagueGaps.length})
                </h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {['all', 'critical', 'high', 'medium'].map(f => (
                    <button key={f} onClick={() => setGapFilter(f as typeof gapFilter)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${gapFilter === f ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'}`}>
                      {f === 'all' ? 'Tous' : f === 'critical' ? 'Critiques' : f === 'high' ? 'Prioritaires' : 'Standards'}
                    </button>
                  ))}
                </div>
                <div className="space-y-3 mb-10">
                  {filteredDisplayGaps.map((gap) => {
                    const cBadge = getCriticalityBadge(gap.criticality);
                    const sBadge = getStatusBadge(gap.status);
                    const catColor = getCategoryColor(gap.category);
                    const isExpanded = expandedGap === gap.id;
                    const isResolved = appliedGaps.has(gap.id) || gap.status === 'resolved';
                    return (
                      <div key={gap.id} className={`rounded-xl border transition-all ${isResolved ? 'bg-emerald-50/30 border-emerald-200' : 'bg-white border-background-200 hover:border-background-300'}`}>
                        <button onClick={() => setExpandedGap(isExpanded ? null : gap.id)} className="w-full p-4 text-left cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${catColor}15` }}>
                              <i className={`${getCategoryIcon(gap.category)} text-sm`} style={{ color: catColor }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <h4 className="text-sm font-bold text-foreground-950">{gap.componentName}</h4>
                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${cBadge.bg} ${cBadge.border} ${cBadge.text}`}>{cBadge.label}</span>
                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${sBadge.bg} ${sBadge.border} ${sBadge.text}`}>{sBadge.label}</span>
                              </div>
                              <p className="text-xs text-foreground-500 line-clamp-2">{gap.description}</p>
                              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-foreground-400">
                                <span>{gap.category}</span>
                                <span>{gap.eta}</span>
                                <span>{gap.kpiImpact}</span>
                              </div>
                            </div>
                            <i className={`text-foreground-400 ${isExpanded ? 'ri-subtract-line' : 'ri-add-line'}`} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-background-100 pt-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
                              <div><span className="font-bold text-foreground-700">État actuel :</span> <span className="text-red-600">{gap.currentState}</span></div>
                              <div><span className="font-bold text-foreground-700">Cible :</span> <span className="text-emerald-600">{gap.targetState}</span></div>
                              <div><span className="font-bold text-foreground-700">Cause racine :</span> <span className="text-foreground-500">{gap.rootCause}</span></div>
                              <div><span className="font-bold text-foreground-700">Systèmes impactés :</span> <span className="text-foreground-500">{gap.impactedSystems}</span></div>
                            </div>
                            <div className="bg-background-50 rounded-lg p-3 mb-3">
                              <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1">Stratégie</h5>
                              <p className="text-xs text-foreground-700">{gap.strategy}</p>
                            </div>
                            <div className="bg-background-50 rounded-lg p-3 mb-3">
                              <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1">Étapes de résolution</h5>
                              <pre className="text-xs text-foreground-600 whitespace-pre-wrap font-sans">{gap.resolutionSteps}</pre>
                            </div>
                            {!isResolved && (
                              <button onClick={() => applyGap(gap.id)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground-950 text-white text-xs font-bold cursor-pointer hover:bg-foreground-800 transition-all whitespace-nowrap">
                                <i className="ri-check-line" />Marquer comme résolu
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Tickets */}
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-tools-line text-foreground-700" />Tickets de Correction ({filteredTickets.length})
                </h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {['all', 'critical', 'high', 'medium'].map(f => (
                    <button key={f} onClick={() => setTicketFilter(f as typeof ticketFilter)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${ticketFilter === f ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'}`}>
                      {f === 'all' ? 'Tous' : f === 'critical' ? 'Critiques' : f === 'high' ? 'Prioritaires' : 'Standards'}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {filteredDisplayTickets.map((ticket) => {
                    const pBadge = getCriticalityBadge(ticket.priority);
                    const isExpanded = expandedTicket === ticket.id;
                    const isApplied = appliedTickets.has(ticket.id) || ticket.status === 'done';
                    return (
                      <div key={ticket.id} className={`rounded-xl border ${isApplied ? 'bg-emerald-50/30 border-emerald-200' : 'bg-white border-background-200'}`}>
                        <div className="p-4 flex flex-col sm:flex-row items-start gap-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${pBadge.bg} ${pBadge.border} ${pBadge.text}`}>{pBadge.label}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="text-[10px] font-mono text-foreground-400">{ticket.ticketId}</span>
                              <h4 className="text-sm font-bold text-foreground-950">{ticket.title}</h4>
                            </div>
                            <p className="text-xs text-foreground-500 mb-1.5">{ticket.impact}</p>
                            <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                              <span><i className="ri-time-line mr-0.5" />{ticket.eta}</span>
                              <span className="text-emerald-600 font-medium">{ticket.estimatedGain}</span>
                            </div>
                          </div>
                          {isApplied ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 flex-shrink-0">
                              <i className="ri-check-double-line" />Appliqué
                            </span>
                          ) : (
                            <button onClick={() => applyTicket(ticket.id)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex-shrink-0" style={{ backgroundColor: ticket.priority === 'critical' ? '#DC2626' : ticket.priority === 'high' ? '#F59E0B' : '#6B7280', color: '#fff' }}>
                              <i className="ri-check-line" />Appliquer
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== TAB: ALL TICKETS ===== */}
      {activeTab === 'tickets' && (
        <section className="py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-1">Tous les Tickets de Correction</h2>
                <p className="text-foreground-600 text-sm">{tickets.filter(t => !appliedTickets.has(t.id)).length} restants · {appliedTickets.size} appliqués</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {['all', 'critical', 'high', 'medium'].map(f => (
                  <button key={f} onClick={() => setTicketFilter(f as typeof ticketFilter)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${ticketFilter === f ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'}`}>
                    {f === 'all' ? 'Tous' : f === 'critical' ? 'Critiques' : f === 'high' ? 'Prioritaires' : 'Standards'}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredDisplayTickets.map((ticket) => {
                const pBadge = getCriticalityBadge(ticket.priority);
                return (
                  <div key={ticket.id} className="rounded-xl bg-white border border-background-200 p-4 flex flex-col sm:flex-row items-start gap-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${pBadge.bg} ${pBadge.border} ${pBadge.text}`}>{pBadge.label}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[10px] font-mono text-foreground-400">{ticket.ticketId}</span>
                        <h4 className="text-sm font-bold text-foreground-950">{ticket.title}</h4>
                      </div>
                      <p className="text-xs text-foreground-500 mb-1.5">{ticket.impact}</p>
                      <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                        <span><i className="ri-time-line mr-0.5" />{ticket.eta}</span>
                        <span className="text-emerald-600 font-medium">{ticket.estimatedGain}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${ticket.vague === 1 ? 'bg-red-100 text-red-700' : ticket.vague === 2 ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'}`}>Vague {ticket.vague}</span>
                      </div>
                    </div>
                    <button onClick={() => applyTicket(ticket.id)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex-shrink-0" style={{ backgroundColor: ticket.priority === 'critical' ? '#DC2626' : ticket.priority === 'high' ? '#F59E0B' : '#6B7280', color: '#fff' }}>
                      <i className="ri-check-line" />Appliquer
                    </button>
                  </div>
                );
              })}
            </div>
            {appliedTickets.size > 0 && (
              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-check-double-line text-emerald-500" />Tickets Appliqués ({appliedTickets.size})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tickets.filter(t => appliedTickets.has(t.id)).map((ticket) => (
                    <div key={ticket.id} className="rounded-lg bg-emerald-50/30 border border-emerald-100 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-checkbox-circle-fill text-emerald-600 text-sm" />
                        <span className="text-xs font-bold text-emerald-800 truncate">{ticket.title}</span>
                      </div>
                      <p className="text-[10px] text-emerald-600">{ticket.estimatedGain}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-12 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — Accès Rapide</h2>
          <p className="text-foreground-600 mb-6">Pilotez tous les aspects du full upgrade depuis les hubs satellites.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'Resource Center', path: '/kos-resource-command-center', icon: 'ri-server-line', color: '#4F46E5' },
              { name: 'Blocs Correctifs', path: '/kos-corrective-action-blocks', icon: 'ri-stack-line', color: '#DC2626' },
              { name: 'Compliance Scanner', path: '/kos-regulatory-compliance-scanner', icon: 'ri-shield-check-line', color: '#0D7B5F' },
              { name: 'Correction Engine', path: '/kos-correction-engine', icon: 'ri-tools-line', color: '#F59E0B' },
              { name: 'Security Scan', path: '/kos-full-system-security-scan', icon: 'ri-shield-flash-line', color: '#C2410C' },
              { name: 'Performance SEO', path: '/kos-performance-seo-command', icon: 'ri-speed-up-line', color: '#9B7B2C' },
            ].map((link) => (
              <a key={link.path} href={link.path} className="rounded-xl bg-white border border-background-200 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                <div className="w-9 h-9 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                </div>
                <span className="text-xs font-bold text-foreground-700">{link.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 inline-block">
            <p className="text-sm text-emerald-800 font-bold">
              <i className="ri-information-line mr-1" />
              Score Conformité Actuel : {stats.complianceScore}/100 → Objectif : {stats.targetComplianceScore}/100 · Gain Total : {stats.totalGain}
            </p>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}