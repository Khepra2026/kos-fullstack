import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  systemHealthOverview,
  qualityGaps,
  autoHealingEngine,
  autoExpansionEngine,
  accelerationMetrics,
  systemScanResults,
  autoHealLiveMetrics,
  globalKpiSnapshot,
  type QualityGap,
} from '@/mocks/kosTotalQualityReview';
import ScrollReveal from '@/components/feature/ScrollReveal';

type TabId = 'overview' | 'scan' | 'healing' | 'expansion' | 'acceleration';

const TABS: { id: TabId; label: string; icon: string; count: string }[] = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: '8' },
  { id: 'scan', label: 'Scan Qualité', icon: 'ri-radar-line', count: '9' },
  { id: 'healing', label: 'Auto-Healing', icon: 'ri-heart-pulse-line', count: '8' },
  { id: 'expansion', label: 'Auto-Expansion', icon: 'ri-rocket-2-line', count: '8' },
  { id: 'acceleration', label: 'Accélération', icon: 'ri-speed-up-line', count: '5' },
];

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    major: 'bg-amber-100 text-amber-700 border-amber-200',
    minor: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${map[severity] || map.minor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${severity === 'critical' ? 'bg-red-500' : severity === 'major' ? 'bg-amber-500' : 'bg-slate-400'}`} />
      {severity === 'critical' ? 'CRITIQUE' : severity === 'major' ? 'MAJEUR' : 'MINEUR'}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    enabled: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    partial: 'bg-amber-100 text-amber-700 border-amber-200',
    inactive: 'bg-slate-100 text-slate-600 border-slate-200',
    open: 'bg-red-100 text-red-700 border-red-200',
    in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
    fixed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    accepted: 'bg-slate-100 text-slate-600 border-slate-200',
    absorbed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    in_pipeline: 'bg-primary-100 text-primary-700 border-primary-200',
    activated: 'bg-accent-100 text-accent-700 border-accent-200',
  };
  const labels: Record<string, string> = {
    active: 'Actif', enabled: 'Activé', partial: 'Partiel', inactive: 'Inactif',
    open: 'Ouvert', in_progress: 'En cours', fixed: 'Corrigé', accepted: 'Accepté',
    absorbed: 'Absorbé', in_pipeline: 'Pipeline', activated: 'Activé',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${map[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {labels[status] || status}
    </span>
  );
}

function CircularGauge({ score, maxScore, size, color }: { score: number; maxScore: number; size: number; color: string }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(score / maxScore, 1);
  const dashOffset = circumference * (1 - ratio);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" className="text-background-200" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" style={{ color }} strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-sm font-bold text-foreground-950 font-heading">{score.toFixed(1)}</span>
    </div>
  );
}

export default function KOSTotalQualityReviewPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [gapFilter, setGapFilter] = useState<'all' | 'critical' | 'major' | 'minor'>('all');
  const [expandedRecovery, setExpandedRecovery] = useState<string | null>(null);

  const filteredGaps = useMemo(() => {
    if (gapFilter === 'all') return qualityGaps;
    return qualityGaps.filter(g => g.severity === gapFilter);
  }, [gapFilter]);

  const health = systemHealthOverview;
  const comps = health.componentsByCategory;

  return (
    <KOSHubLayout hubId={121} activeTab="Qualité Totale" tabLabel="Total Quality Review & Auto-Healing Auto-Expansion">
      <SeoHead
        title="KOS Total Quality Review & Auto-Healing Auto-Expansion Command™ — Cockpit Qualité Système | KHEPRA EXPERTS"
        description="Revue qualité totale du système KOS : 120 hubs, 335 tables, 101 Edge Functions, 75 agents. Auto-Healing 94% auto-résolution, Auto-Expansion 5 domaines absorbés, Accélération 365x. Certification AAAA Big Four Supreme."
        keywords="KOS Total Quality Review, auto-healing, auto-expansion, qualité système, KHEPRA EXPERTS, Big Four Supreme"
        canonicalPath="/kos-total-quality-review"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* ── HERO ── */}
      <section className="relative bg-background-100 border-b border-background-200/70 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20futuristic%20quality%20control%20command%20center%20with%20interconnected%20diagnostic%20panels%20glowing%20emerald%20green%20amber%20and%20warm%20gold%20holographic%20quality%20metrics%20floating%20hexagonal%20network%20of%20health%20indicators%20precise%20geometric%20data%20visualization%20layers%20sophisticated%20dark%20corporate%20monitoring%20atmosphere%20with%20clean%20structured%20surveillance%20grid%20patterns%20no%20text%20no%20humans%20premium%20technology%20aesthetic&width=1920&height=550&seq=kos-total-quality-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="550"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/85 to-foreground-950" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-18">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6 flex-wrap justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                KOS TOTAL QUALITY REVIEW COMMAND™
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-300 text-sm font-semibold">
                <i className="ri-heart-pulse-line" />
                AUTO-HEALING ACTIF — 94%
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Revue Qualité Totale
              <span className="block text-emerald-400 mt-2">Auto-Healing & Auto-Expansion</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">683 composants scannés</strong> · 120 hubs · 335 tables · 101 Edge Functions · 75 agents.
              Détection, guérison et expansion automatiques en continu.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                <span className="text-emerald-300 font-bold text-sm">Score 9.2/10</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30">
                <span className="text-accent-300 font-bold text-sm">94% Auto-GUÉRISON</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-400/30">
                <span className="text-primary-300 font-bold text-sm">Compression ×365</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-4 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Score Santé', value: `${globalKpiSnapshot.scoreSante}/10`, icon: 'ri-heart-pulse-line', color: '#0D7B5F' },
              { label: 'Hubs Optimaux', value: `${globalKpiSnapshot.hubsOptimal}/120`, icon: 'ri-stack-line', color: '#4F46E5' },
              { label: 'Agents Supra', value: `${globalKpiSnapshot.agentsSupraOptimal}/75`, icon: 'ri-robot-2-line', color: '#86BC25' },
              { label: 'Hooks Hybrides', value: `${globalKpiSnapshot.hookHybridRate}%`, icon: 'ri-git-branch-line', color: '#9B7B2C' },
              { label: 'Citations', value: String(globalKpiSnapshot.citationCount), icon: 'ri-scales-3-line', color: '#C2410C' },
              { label: 'Auto-Résolution', value: `${autoHealLiveMetrics.selfHealingRate}%`, icon: 'ri-shield-check-line', color: '#0891B2' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-3 text-center">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                </div>
                <span className="block text-base font-bold text-foreground-950 font-heading">{stat.value}</span>
                <span className="text-[10px] text-foreground-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-foreground-950 text-white' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'}`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════ TAB: OVERVIEW ═══════════════════════════════ */}
      {activeTab === 'overview' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Health Gauge */}
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="rounded-2xl bg-white border border-background-200 p-6 text-center lg:col-span-1">
                  <CircularGauge score={health.overallHealthScore} maxScore={10} size={120} color="#0D7B5F" />
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mt-3">Score Santé Global</h3>
                  <p className="text-xs text-foreground-500">Cible : {health.targetScore}/10</p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-emerald-700">BIG FOUR SUPREME</span>
                  </div>
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Hubs', total: comps.hubs.total, optimal: comps.hubs.optimal, color: '#4F46E5' },
                    { label: 'Tables', total: comps.tables.total, optimal: comps.tables.live, color: '#86BC25' },
                    { label: 'Edge Functions', total: comps.edgeFunctions.total, optimal: comps.edgeFunctions.active, color: '#9B7B2C' },
                    { label: 'Agents', total: comps.agents.total, optimal: comps.agents.supraOptimal, color: '#C2410C' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                        <span className="text-lg font-bold font-heading" style={{ color: item.color }}>{item.optimal}</span>
                      </div>
                      <span className="block text-xs font-bold text-foreground-950">{item.label}</span>
                      <span className="text-[10px] text-foreground-400">/ {item.total} — {Math.round((item.optimal / item.total) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Certifications */}
            <ScrollReveal>
              <h3 className="font-heading text-xl font-bold text-foreground-950 mb-4">Certifications & Standards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {health.certifications.map((cert, i) => (
                  <div key={i} className="rounded-xl bg-white border border-background-200 p-4">
                    <h4 className="text-sm font-bold text-foreground-950 mb-2">{cert.name}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold font-heading" style={{ color: cert.score >= 95 ? '#86BC25' : cert.score >= 85 ? '#e8c547' : '#c2410c' }}>{cert.score}</span>
                      <span className="text-xs text-foreground-400">/ {cert.target}</span>
                    </div>
                    <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(cert.score / cert.target) * 100}%`, backgroundColor: cert.score >= 95 ? '#86BC25' : cert.score >= 85 ? '#e8c547' : '#c2410c' }} />
                    </div>
                    <p className="text-[10px] text-foreground-500">{cert.status}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Auto-Healing + Auto-Expansion quick view */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollReveal>
                <div className="rounded-2xl bg-white border border-background-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-heart-pulse-line text-emerald-500 text-xl" />
                    <h3 className="font-heading text-lg font-bold text-foreground-950">Auto-Healing — En Direct</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-emerald-50 rounded-xl">
                      <span className="block text-xl font-bold text-emerald-700">{autoHealLiveMetrics.healedLast24h}</span>
                      <span className="text-[10px] text-emerald-600">Guérisons 24h</span>
                    </div>
                    <div className="text-center p-3 bg-accent-50 rounded-xl">
                      <span className="block text-xl font-bold text-accent-700">{autoHealLiveMetrics.preventedIncidents}</span>
                      <span className="text-[10px] text-accent-600">Incidents Évités</span>
                    </div>
                    <div className="text-center p-3 bg-primary-50 rounded-xl">
                      <span className="block text-xl font-bold text-primary-700">{autoHealingEngine.mttrMinutes}min</span>
                      <span className="text-[10px] text-primary-600">MTTR</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {autoHealingEngine.healingCapabilities.slice(0, 4).map((cap, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-foreground-700">{cap.name}</span>
                        <span className="font-bold text-emerald-600">{cap.autoFixRate}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="rounded-2xl bg-white border border-background-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-rocket-2-line text-primary-500 text-xl" />
                    <h3 className="font-heading text-lg font-bold text-foreground-950">Auto-Expansion — Pipeline</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-primary-50 rounded-xl">
                      <span className="block text-xl font-bold text-primary-700">{autoExpansionEngine.totalDomains}</span>
                      <span className="text-[10px] text-primary-600">Domaines</span>
                    </div>
                    <div className="text-center p-3 bg-accent-50 rounded-xl">
                      <span className="block text-xl font-bold text-accent-700">{autoExpansionEngine.autoLearnedDomains}</span>
                      <span className="text-[10px] text-accent-600">Auto-Appris</span>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-xl">
                      <span className="block text-xl font-bold text-emerald-700">{autoExpansionEngine.academyStats.learners}</span>
                      <span className="text-[10px] text-emerald-600">Apprenants</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {autoExpansionEngine.newDomains.filter(d => d.status === 'in_pipeline').slice(0, 3).map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <i className="ri-time-line text-amber-500" />
                        <span className="text-foreground-700">{d.name}</span>
                        <StatusBadge status="in_pipeline" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Critical Gaps Quick View */}
            <ScrollReveal>
              <div className="rounded-2xl border border-red-200 bg-red-50/30 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <i className="ri-error-warning-line text-red-500 text-xl" />
                  <h3 className="font-heading text-lg font-bold text-foreground-950">Écarts Critiques — {qualityGaps.filter(g => g.severity === 'critical').length}</h3>
                </div>
                <div className="space-y-2">
                  {qualityGaps.filter(g => g.severity === 'critical').map(gap => (
                    <div key={gap.id} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-red-100">
                      <SeverityBadge severity={gap.severity} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground-950">{gap.description}</p>
                        <p className="text-xs text-foreground-500 mt-0.5">{gap.component} · {gap.estimatedEffort}</p>
                      </div>
                      <StatusBadge status={gap.status} />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════ TAB: SCAN ═══════════════════════════════ */}
      {activeTab === 'scan' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Scan Header */}
            <div className="rounded-2xl bg-foreground-950 p-6 text-white text-center">
              <i className="ri-radar-line text-emerald-400 text-3xl mb-2 block" />
              <h3 className="font-heading text-xl font-bold mb-1">Scan #{systemScanResults.scanId}</h3>
              <p className="text-gray-300 text-sm">Exécuté le {new Date(systemScanResults.scannedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })} · Durée : {systemScanResults.duration} · {systemScanResults.totalAssets} assets</p>
            </div>

            {/* Hubs Scan */}
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Hubs — {systemScanResults.results.hubs.total} scannés</h3>
              <div className="flex gap-2 mb-4 flex-wrap">
                {systemScanResults.results.hubs.details.map((d, i) => (
                  <span key={i} className={`text-xs px-3 py-1.5 rounded-full font-bold ${d.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' : d.status === 'stable' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {d.status === 'optimal' ? 'Optimaux' : d.status === 'stable' ? 'Stables' : 'Dégradés'} : {d.count} ({d.percentage}%)
                  </span>
                ))}
              </div>
              <div className="bg-white border border-background-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-red-600 mb-2">Hubs Dégradés</h4>
                {systemScanResults.results.hubs.degradedList.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground-600 py-1">
                    <i className="ri-error-warning-line text-amber-500" />
                    {h}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tables Scan */}
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Tables Supabase — {systemScanResults.results.tables.total}</h3>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {[
                  { label: 'Live', value: systemScanResults.results.tables.live, color: '#86BC25' },
                  { label: 'Vides', value: systemScanResults.results.tables.empty, color: '#c2410c' },
                  { label: 'Business Ready', value: systemScanResults.results.tables.businessReady, color: '#0D7B5F' },
                  { label: 'Total', value: systemScanResults.results.tables.total, color: '#4F46E5' },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-3 text-center">
                    <span className="block text-xl font-bold font-heading" style={{ color: item.color }}>{item.value}</span>
                    <span className="text-[10px] text-foreground-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Quality Gaps */}
            <ScrollReveal>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-foreground-950">Écarts Qualité — {qualityGaps.length} détectés</h3>
                <div className="flex gap-1">
                  {(['all', 'critical', 'major', 'minor'] as const).map(filter => (
                    <button
                      key={filter}
                      onClick={() => setGapFilter(filter)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${gapFilter === filter ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'}`}
                    >
                      {filter === 'all' ? 'Tous' : filter === 'critical' ? 'Critiques' : filter === 'major' ? 'Majeurs' : 'Mineurs'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {filteredGaps.map(gap => (
                  <div key={gap.id} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-3">
                      <SeverityBadge severity={gap.severity} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-semibold text-foreground-950">{gap.description}</span>
                          <StatusBadge status={gap.status} />
                        </div>
                        <p className="text-xs text-foreground-500 mb-1">{gap.component} · {gap.impact}</p>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                          <span><i className="ri-user-line mr-0.5" />{gap.assignedTo}</span>
                          <span><i className="ri-time-line mr-0.5" />{gap.estimatedEffort}</span>
                          {gap.autoFixable && <span className="text-emerald-600 font-bold"><i className="ri-robot-2-line mr-0.5" />Auto-Fixable</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════ TAB: HEALING ═══════════════════════════════ */}
      {activeTab === 'healing' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Healing Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Événements Totaux', value: autoHealingEngine.totalEvents, icon: 'ri-pulse-line', color: '#0D7B5F' },
                { label: 'Auto-Résolus', value: autoHealingEngine.autoResolved, icon: 'ri-check-double-line', color: '#86BC25' },
                { label: 'Manuels Requis', value: autoHealingEngine.manualRequired, icon: 'ri-user-line', color: '#c2410c' },
                { label: 'MTTR', value: `${autoHealingEngine.mttrMinutes} min`, icon: 'ri-timer-line', color: '#4F46E5' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-2xl font-bold text-foreground-950 font-heading">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Auto-Resolution Rate */}
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
              <CircularGauge score={autoHealLiveMetrics.selfHealingRate} maxScore={100} size={100} color="#0D7B5F" />
              <h3 className="font-heading text-lg font-bold text-foreground-950 mt-3">Taux d'Auto-Résolution</h3>
              <p className="text-sm text-emerald-700 font-semibold">{autoHealLiveMetrics.selfHealingRate}% des incidents guéris automatiquement</p>
              <p className="text-xs text-emerald-600 mt-1">MTTR amélioré de {autoHealLiveMetrics.mttrImprovement} · Uptime gagné {autoHealLiveMetrics.uptimeImpact}</p>
            </div>

            {/* Circuit Breakers + Retry + DLQ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white border border-background-200 p-5">
                <h4 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-shield-flash-line text-amber-500" />Circuit Breakers
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-foreground-600">Total</span><span className="font-bold">{autoHealingEngine.circuitBreakers.total}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-600">Fermés</span><span className="font-bold text-emerald-600">{autoHealingEngine.circuitBreakers.closed}</span></div>
                  <div className="flex justify-between"><span className="text-amber-600">Semi-Ouverts</span><span className="font-bold text-amber-600">{autoHealingEngine.circuitBreakers.halfOpen}</span></div>
                  <div className="flex justify-between"><span className="text-red-600">Ouverts</span><span className="font-bold text-red-600">{autoHealingEngine.circuitBreakers.open}</span></div>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-background-200 p-5">
                <h4 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-refresh-line text-primary-500" />Retry Exponentiel
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-foreground-600">Total Retries</span><span className="font-bold">{autoHealingEngine.retryStats.totalRetries.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-600">Réussis</span><span className="font-bold text-emerald-600">{autoHealingEngine.retryStats.successfulRetries.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-red-600">Échoués</span><span className="font-bold text-red-600">{autoHealingEngine.retryStats.failedRetries}</span></div>
                  <div className="flex justify-between"><span className="text-foreground-600">Délai moyen</span><span className="font-bold">{autoHealingEngine.retryStats.avgRetryDelayMs}ms</span></div>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-background-200 p-5">
                <h4 className="font-heading text-base font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-mail-close-line text-red-500" />Dead Letter Queue
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-foreground-600">Total DLQ</span><span className="font-bold">{autoHealingEngine.deadLetterQueue.total}</span></div>
                  <div className="flex justify-between"><span className="text-red-600">Critiques</span><span className="font-bold text-red-600">{autoHealingEngine.deadLetterQueue.critical}</span></div>
                  <div className="flex justify-between"><span className="text-amber-600">Haute</span><span className="font-bold text-amber-600">{autoHealingEngine.deadLetterQueue.high}</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Moyenne</span><span className="font-bold">{autoHealingEngine.deadLetterQueue.medium}</span></div>
                </div>
              </div>
            </div>

            {/* Healing Capabilities */}
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Capacités d'Auto-Guérison</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {autoHealingEngine.healingCapabilities.map(cap => (
                  <div key={cap.name} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <StatusBadge status={cap.status} />
                      <span className="text-lg font-bold text-emerald-600">{cap.autoFixRate}%</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground-950 mb-1">{cap.name}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{cap.description}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Recent Recoveries */}
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Récupérations Récentes</h3>
              <div className="space-y-2">
                {autoHealingEngine.recentRecoveries.map(rec => (
                  <button
                    key={rec.id}
                    onClick={() => setExpandedRecovery(expandedRecovery === rec.id ? null : rec.id)}
                    className="w-full text-left rounded-xl bg-white border border-background-200 p-4 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <i className="ri-check-double-line text-emerald-500 text-lg" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-sm font-semibold text-foreground-950">{rec.component}</span>
                          <span className="text-xs text-emerald-600 font-bold">{rec.durationMs / 1000}s</span>
                        </div>
                        <p className="text-xs text-foreground-500 truncate">{rec.issue}</p>
                      </div>
                      <i className={`ri-${expandedRecovery === rec.id ? 'subtract' : 'add'}-line text-foreground-400`} />
                    </div>
                    {expandedRecovery === rec.id && (
                      <div className="mt-3 pt-3 border-t border-background-200 grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-foreground-400">Détecté</span><p className="font-semibold">{new Date(rec.detectedAt).toLocaleString('fr-FR')}</p></div>
                        <div><span className="text-foreground-400">Récupéré</span><p className="font-semibold">{new Date(rec.recoveredAt).toLocaleString('fr-FR')}</p></div>
                        <div className="col-span-2"><span className="text-foreground-400">Méthode</span><p className="font-semibold text-emerald-600">{rec.method}</p></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════ TAB: EXPANSION ═══════════════════════════════ */}
      {activeTab === 'expansion' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Expansion Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Domaines', value: `${autoExpansionEngine.totalDomains}`, sub: `${autoExpansionEngine.autoLearnedDomains} auto-appris`, icon: 'ri-global-line', color: '#4F46E5' },
                { label: 'Academy', value: `${autoExpansionEngine.academyStats.learners}`, sub: `${autoExpansionEngine.academyStats.modules} modules`, icon: 'ri-book-open-line', color: '#86BC25' },
                { label: 'Certifications', value: autoExpansionEngine.academyStats.certifications.toLocaleString(), sub: `${autoExpansionEngine.academyStats.completionRate}% complétion`, icon: 'ri-award-line', color: '#9B7B2C' },
                { label: 'Articles', value: autoExpansionEngine.contentPipeline.articles.toLocaleString(), sub: `${autoExpansionEngine.expansionVelocity.articlesPerWeek}/semaine`, icon: 'ri-quill-pen-line', color: '#C2410C' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-2xl font-bold text-foreground-950 font-heading">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.sub}</span>
                </div>
              ))}
            </div>

            {/* New Domains */}
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Domaines Auto-Appris</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {autoExpansionEngine.newDomains.map(domain => (
                  <div key={domain.name} className={`rounded-xl border p-4 ${domain.status === 'absorbed' ? 'bg-emerald-50/30 border-emerald-200' : 'bg-amber-50/30 border-amber-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <StatusBadge status={domain.status} />
                      {domain.score > 0 && <span className="text-lg font-bold text-emerald-600">{domain.score}</span>}
                    </div>
                    <h4 className="text-sm font-bold text-foreground-950 mb-1">{domain.name}</h4>
                    <p className="text-xs text-foreground-500">{domain.source}</p>
                    {domain.absorbedAt && <p className="text-[10px] text-emerald-600 mt-2">Absorbé le {new Date(domain.absorbedAt).toLocaleDateString('fr-FR')}</p>}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Expansion Roadmap */}
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Roadmap d'Expansion</h3>
              <div className="space-y-3">
                {autoExpansionEngine.expansionRoadmap.map((item, i) => (
                  <div key={i} className="rounded-xl bg-white border border-background-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-100 text-primary-700">{item.phase}</span>
                      <span className="text-xs text-foreground-500">Deadline : {new Date(item.deadline).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground-950 mb-1">{item.milestone}</h4>
                    <p className="text-xs text-foreground-500 mb-2">Cible : {item.target}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className="text-xs font-bold text-foreground-950">{item.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════ TAB: ACCELERATION ═══════════════════════════════ */}
      {activeTab === 'acceleration' && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Velocity Gauge */}
            <div className="rounded-2xl bg-foreground-950 p-8 text-white text-center">
              <i className="ri-speed-up-line text-accent-400 text-4xl mb-3 block" />
              <h2 className="font-heading text-3xl font-bold mb-2">Vélocité Système</h2>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="text-center">
                  <span className="block text-4xl font-bold text-accent-400">{accelerationMetrics.currentVelocity}</span>
                  <span className="text-sm text-gray-300">pts/mois actuels</span>
                </div>
                <i className="ri-arrow-right-line text-2xl text-gray-400" />
                <div className="text-center">
                  <span className="block text-4xl font-bold text-emerald-400">{accelerationMetrics.targetVelocity}</span>
                  <span className="text-sm text-gray-300">pts/mois cible</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-3">Compression temporelle : ×{accelerationMetrics.compressionFactor}</p>
            </div>

            {/* Active Boosts */}
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Boosts Actifs — {accelerationMetrics.activeBoosts.length}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accelerationMetrics.activeBoosts.map(boost => (
                  <div key={boost.name} className="rounded-xl bg-white border border-background-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <StatusBadge status={boost.status} />
                      <span className="text-xs font-bold text-accent-600">{boost.impact}</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground-950 mb-1">{boost.name}</h4>
                    <p className="text-xs text-foreground-500">{boost.description}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Bottlenecks */}
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Goulets d'Étranglement — {accelerationMetrics.bottlenecks.length}</h3>
              <div className="space-y-3">
                {accelerationMetrics.bottlenecks.map(bn => (
                  <div key={bn.id} className="rounded-xl bg-white border border-background-200 p-4">
                    <div className="flex items-start gap-3">
                      <SeverityBadge severity={bn.severity} />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-foreground-950 mb-1">{bn.description}</h4>
                        <p className="text-xs text-foreground-500 mb-2">{bn.location}</p>
                        <div className="bg-emerald-50 rounded-lg p-3">
                          <p className="text-xs text-emerald-700 font-semibold"><i className="ri-lightbulb-line mr-1" />Résolution : {bn.resolution}</p>
                        </div>
                        <p className="text-[10px] text-accent-600 mt-1 font-bold">Gain estimé : {bn.estimatedGain}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Timeline Compression */}
            <ScrollReveal>
              <div className="rounded-2xl bg-gradient-to-r from-accent-50 to-primary-50 border border-accent-200 p-6 text-center">
                <i className="ri-timer-flash-line text-accent-500 text-3xl mb-2 block" />
                <h3 className="font-heading text-xl font-bold text-foreground-950 mb-2">Compression Temporelle</h3>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <div className="bg-white rounded-xl px-5 py-3 border border-background-200">
                    <span className="block text-sm text-foreground-500">Avant</span>
                    <span className="font-bold text-red-600">{accelerationMetrics.timelineCompression.from}</span>
                  </div>
                  <i className="ri-arrow-right-line text-xl text-accent-500" />
                  <div className="bg-white rounded-xl px-5 py-3 border border-background-200">
                    <span className="block text-sm text-foreground-500">Après</span>
                    <span className="font-bold text-emerald-600">{accelerationMetrics.timelineCompression.to}</span>
                  </div>
                </div>
                <p className="text-sm text-accent-700 font-semibold mt-3">×{accelerationMetrics.timelineCompression.factor} — {accelerationMetrics.timelineCompression.tasksCompressed} tâches compressées en 1 session</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── CROSS-LINKS ── */}
      <section className="py-12 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Écosystème Qualité KOS</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Quality Excellence', path: '/kos-quality-excellence-command', icon: 'ri-shield-check-line', color: '#0D7B5F' },
              { label: 'Autonomous Quality', path: '/kos-autonomous-quality-system', icon: 'ri-radar-line', color: '#4F46E5' },
              { label: 'Global Agent Scan', path: '/kos-global-agent-performance', icon: 'ri-search-eye-line', color: '#86BC25' },
              { label: 'Auto-Expansion Academy', path: '/kos-auto-expansion-academy', icon: 'ri-book-open-line', color: '#9B7B2C' },
              { label: 'Correction Engine', path: '/kos-correction-engine', icon: 'ri-tools-line', color: '#C2410C' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#0891B2' },
            ].map(link => (
              <a
                key={link.path}
                href={link.path}
                className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-xs font-bold text-foreground-800">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}