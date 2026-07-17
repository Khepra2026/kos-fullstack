import { useState } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';
import { useKOSZeroDefect } from '@/hooks/useKOSZeroDefect';

const TABS = [
  { key: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
  { key: 'performance', label: 'Performance Live', icon: 'ri-speed-up-line' },
  { key: 'techdebt', label: 'Dette Technique', icon: 'ri-bug-line' },
  { key: 'urls', label: 'Santé URLs', icon: 'ri-link-unlink' },
  { key: 'seeding', label: 'Seeding Agents', icon: 'ri-seedling-line' },
  { key: 'target', label: 'Objectif Zéro', icon: 'ri-focus-3-line' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function KOSZeroDefectCommandPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const engine = useKOSZeroDefect();

  const statusBadge = engine.dataSource === 'supabase'
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-amber-100 text-amber-700';

  if (engine.loading) {
    return (
      <>
        <SeoHead title="KOS Zero-Defect Command Center — KHEPRA EXPERTS" description="Cockpit de pilotage zéro-défaut — Performance, Dette Technique, URLs, Seeding Agents, Conformité ISO. Monitoring temps réel, auto-correction, objectif 100%." canonicalPath="/kos-zero-defect-command" noIndex={true} />
        <KOSHubLayout hubId={130} activeTab="Zero-Defect" tabLabel="Zero-Defect Command">
          <div className="bg-background-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-foreground-500 font-body">Chargement du Command Center...</p>
            </div>
          </div>
        </KOSHubLayout>
      </>
    );
  }

  if (engine.error) {
    return (
      <>
        <SeoHead title="KOS Zero-Defect Command Center — KHEPRA EXPERTS" description="Cockpit de pilotage zéro-défaut" canonicalPath="/kos-zero-defect-command" noIndex={true} />
        <KOSHubLayout hubId={130} activeTab="Zero-Defect" tabLabel="Zero-Defect Command">
          <div className="bg-background-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 text-red-600">
                <i className="ri-error-warning-line text-2xl"></i>
              </div>
              <p className="text-sm text-foreground-700 font-body">{engine.error}</p>
              <button type="button" onClick={engine.refresh} className="px-4 py-2 rounded-lg bg-accent-500 text-background-50 text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-refresh-line mr-1.5"></i>Réessayer
              </button>
            </div>
          </div>
        </KOSHubLayout>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title="KOS Zero-Defect Command Center — KHEPRA EXPERTS"
        description="Cockpit de pilotage zéro-défaut — Performance, Dette Technique, URLs, Seeding Agents, Conformité ISO. Monitoring temps réel, auto-correction, objectif 100%. 0 défaut technique, 0 URL défectueuse, 100% conformité."
        canonicalPath="/kos-zero-defect-command"
        noIndex={true}
      />
      <KOSHubLayout hubId={130} activeTab="Zero-Defect" tabLabel="Zero-Defect Command">
        <div className="bg-background-50 min-h-screen">
          {/* Hero Header */}
          <section className="bg-background-100 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700 shrink-0">
                    <i className="ri-focus-3-line text-2xl"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-body tracking-wide ${statusBadge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${engine.dataSource === 'supabase' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        {engine.dataSource === 'supabase' ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 font-body tracking-wide">
                        {engine.criticalAlertsCount} ALERTES CRITIQUES
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-100 text-accent-700 font-body tracking-wide">
                        AUTO-FIX {engine.cwv.autoFixEnabled ? 'ACTIVÉ' : 'DÉSACTIVÉ'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 font-body tracking-wide">
                        SCORE GLOBAL {engine.zeroDefect.currentScore}/100
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">
                      KOS Zero-Defect Command Center™
                    </h1>
                    <p className="text-sm text-foreground-600 mt-1.5 max-w-2xl font-body">
                      Cockpit unifié de pilotage vers l&apos;excellence technique absolue. Monitoring continu FCP/LCP/TBT/CLS,
                      détection automatique de la dette technique, correction autonome des URLs défectueuses,
                      seeding des agents KOS, et trajectoire vers l&apos;état cible : <strong className="text-red-600">0 défaut · 0 dette · 0 URL cassée · 100% conformité</strong>.
                    </p>
                  </div>
                </div>
                {/* Global Score Gauge */}
                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-center">
                    <div className="relative w-20 h-20">
                      <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="oklch(var(--background-200))" strokeWidth="5" />
                        <circle cx="40" cy="40" r="34" fill="none" stroke={engine.zeroDefect.currentScore >= 95 ? '#059669' : engine.zeroDefect.currentScore >= 85 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="5" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 34}`}
                          strokeDashoffset={2 * Math.PI * 34 * (1 - engine.zeroDefect.currentScore / 100)}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold font-heading text-foreground-950">
                        {engine.zeroDefect.currentScore}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-foreground-500 font-body">Score Global</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { label: 'Critiques', value: engine.criticalAlertsCount, color: 'bg-red-500' },
                      { label: 'Haute', value: engine.highAlertsCount, color: 'bg-amber-500' },
                      { label: 'Total', value: engine.totalAlertsCount, color: 'bg-accent-500' },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-1.5 text-xs">
                        <span className={`w-2 h-2 rounded-full ${s.color}`}></span>
                        <span className="text-foreground-600 font-body">{s.label} <strong className="text-foreground-950">{s.value}</strong></span>
                      </div>
                    ))}
                    <button type="button" onClick={engine.refresh} className="mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer bg-primary-500 text-background-50 dark:text-foreground-950 hover:bg-primary-600 transition-colors whitespace-nowrap">
                      <i className="ri-refresh-line text-xs"></i>Rafraîchir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Alert Banner */}
          {engine.criticalAlertsCount > 0 && (
            <div className="bg-red-50 border-b border-red-200">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-error-warning-line text-red-600 animate-pulse"></i>
                  <span className="font-semibold text-red-700 font-body">{engine.criticalAlertsCount} alertes critiques</span>
                  <span className="text-red-500 font-body">— {engine.alerts.filter(a => a.severity === 'critical' && !a.acknowledged).slice(0, 2).map(a => a.message).join(' · ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Switcher */}
          <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'bg-foreground-950 text-background-50'
                        : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                    }`}
                    type="button"
                  >
                    <i className={`${tab.icon} text-sm`}></i>
                    {tab.label}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-2 text-[10px] text-foreground-400">
                  <span className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${engine.autoRefresh ? 'bg-emerald-500 animate-pulse' : 'bg-foreground-300'}`}></span>
                    Auto-refresh {engine.autoRefresh ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            {activeTab === 'overview' && <OverviewTab engine={engine} />}
            {activeTab === 'performance' && <PerformanceTab engine={engine} />}
            {activeTab === 'techdebt' && <TechDebtTab engine={engine} />}
            {activeTab === 'urls' && <UrlHealthTab engine={engine} />}
            {activeTab === 'seeding' && <SeedingTab engine={engine} />}
            {activeTab === 'target' && <TargetTab engine={engine} />}
          </div>

          {/* Footer Info Bar */}
          <footer className="border-t border-background-200/70 bg-background-100 mt-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-[10px] text-foreground-500 font-body">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Dernier scan : {engine.cwv.lastScan ? new Date(engine.cwv.lastScan).toLocaleString('fr-FR') : 'N/A'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Progression zéro-défaut : {engine.overallZeroDefectProgress}%
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400 font-body">
                  <Link to="/kos-correction-engine" className="hover:text-foreground-600 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-tools-line mr-1"></i>Correction Engine
                  </Link>
                  <Link to="/kos-performance-seo-command" className="hover:text-foreground-600 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-rocket-2-line mr-1"></i>Perf & SEO Command
                  </Link>
                  <Link to="/kos-auto-learning-agentic" className="hover:text-foreground-600 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-brain-line mr-1"></i>Auto-Learning
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </KOSHubLayout>
    </>
  );
}

// ═══════════════════════════════════════════
// TAB 1: VUE D'ENSEMBLE
// ═══════════════════════════════════════════
function OverviewTab({ engine }: { engine: ReturnType<typeof useKOSZeroDefect> }) {
  const kpis = Object.entries(engine.kpiSnapshot);

  return (
    <div className="space-y-8">
      {/* KPIs Grid */}
      <ScrollReveal>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {kpis.map(([key, kpi]) => {
            const ratio = kpi.target > 0 ? Math.min((kpi.value as number) / (kpi.target as number) * 100, 100) : 100;
            const barColor = ratio >= 95 ? 'bg-emerald-500' : ratio >= 80 ? 'bg-amber-500' : 'bg-red-500';
            return (
              <div key={key} className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
                <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-background-100 flex items-center justify-center">
                  <i className={`${kpi.icon} text-foreground-600 text-sm`}></i>
                </div>
                <p className="text-xl font-bold text-foreground-950 font-heading">{kpi.value}{kpi.unit}</p>
                <div className="w-full h-1.5 bg-background-200 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${ratio}%` }}></div>
                </div>
                <p className="text-[10px] text-foreground-400 mt-1">{kpi.label}</p>
                <p className="text-[10px] font-medium flex items-center justify-center gap-0.5 mt-0.5">
                  {typeof kpi.trend === 'string' && kpi.trend.startsWith('+') ? (
                    <span className="text-emerald-600"><i className="ri-arrow-up-line"></i>{kpi.trend}</span>
                  ) : typeof kpi.trend === 'string' && kpi.trend.startsWith('-') ? (
                    <span className="text-red-500"><i className="ri-arrow-down-line"></i>{kpi.trend}</span>
                  ) : (
                    <span className="text-foreground-400">{kpi.trend}</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Alerts Live */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
          <div className="bg-red-50/50 border-b border-red-100 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="ri-notification-3-line text-red-600"></i>
              <h3 className="text-sm font-bold text-red-800">Alertes Temps Réel — {engine.totalAlertsCount} non acquittées</h3>
            </div>
            <Link to="/kos-correction-engine" className="text-[10px] font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap">
              <i className="ri-arrow-right-line"></i>Correction Engine
            </Link>
          </div>
          <div className="divide-y divide-background-100 max-h-[400px] overflow-y-auto">
            {engine.alerts.filter(a => !a.acknowledged).slice(0, 10).map(alert => {
              const severityColors: Record<string, string> = {
                critical: 'border-red-200 bg-red-50/30',
                high: 'border-amber-200 bg-amber-50/30',
                medium: 'border-accent-200 bg-accent-50/30',
                low: 'border-background-200 bg-background-50',
              };
              const dotColors: Record<string, string> = {
                critical: 'bg-red-500',
                high: 'bg-amber-500',
                medium: 'bg-accent-500',
                low: 'bg-foreground-400',
              };
              return (
                <div key={alert.id} className={`px-5 py-3 ${severityColors[alert.severity]}`}>
                  <div className="flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full ${dotColors[alert.severity]} mt-1.5 shrink-0`}></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase ${alert.severity === 'critical' ? 'text-red-700' : alert.severity === 'high' ? 'text-amber-700' : 'text-foreground-600'}`}>{alert.severity}</span>
                        <span className="text-[10px] text-foreground-400 bg-background-100 px-1.5 py-0.5 rounded">{alert.source}</span>
                        <span className="text-[9px] text-foreground-400">{new Date(alert.timestamp).toLocaleString('fr-FR')}</span>
                      </div>
                      <p className="text-sm text-foreground-800">{alert.message}</p>
                      <p className="text-xs text-primary-600 mt-1 flex items-center gap-1">
                        <i className="ri-tools-line"></i>{alert.action}
                      </p>
                    </div>
                    <button type="button" onClick={() => engine.acknowledgeAlert(alert.id)} className="text-[10px] text-foreground-400 hover:text-emerald-600 cursor-pointer px-2 py-1 rounded hover:bg-background-100 whitespace-nowrap">
                      <i className="ri-check-line mr-0.5"></i>Acquitter
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <Link to="/kos-correction-engine" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-50 border border-background-200/70 text-xs text-foreground-700 hover:border-accent-300 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-tools-line text-accent-500"></i>Correction Engine
        </Link>
        <Link to="/kos-performance-seo-command" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-50 border border-background-200/70 text-xs text-foreground-700 hover:border-accent-300 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-rocket-2-line text-primary-500"></i>Perf & SEO
        </Link>
        <Link to="/kos-auto-learning-agentic" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-50 border border-background-200/70 text-xs text-foreground-700 hover:border-accent-300 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-brain-line text-secondary-500"></i>Auto-Learning
        </Link>
        <Link to="/kos-url-auto-pointage" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-50 border border-background-200/70 text-xs text-foreground-700 hover:border-accent-300 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-link-unlink text-emerald-500"></i>URL Pointage
        </Link>
        <Link to="/kos-security-command" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-50 border border-background-200/70 text-xs text-foreground-700 hover:border-accent-300 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-shield-check-line text-red-500"></i>Sécurité
        </Link>
        <Link to="/kos-ultimate-cockpit" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-50 border border-background-200/70 text-xs text-foreground-700 hover:border-accent-300 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-radar-line text-foreground-950"></i>Cockpit Ultime
        </Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 2: PERFORMANCE LIVE
// ═══════════════════════════════════════════
function PerformanceTab({ engine }: { engine: ReturnType<typeof useKOSZeroDefect> }) {
  const cwv = engine.cwv;
  const statusColors: Record<string, string> = {
    optimal: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    ok: 'bg-background-100 text-foreground-600 border-background-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    critical: 'bg-red-100 text-red-700 border-red-200',
  };
  const statusDots: Record<string, string> = {
    optimal: 'bg-emerald-500',
    ok: 'bg-accent-500',
    warning: 'bg-amber-500',
    critical: 'bg-red-500',
  };

  return (
    <div className="space-y-8">
      {/* Global Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'LCP Moyen', value: `${cwv.global.lcpAvg}s`, target: '2.0s', icon: 'ri-timer-line', ratio: (2.0 / cwv.global.lcpAvg) * 100 },
            { label: 'FCP Moyen', value: `${cwv.global.fcpAvg}s`, target: '1.2s', icon: 'ri-speed-up-line', ratio: (1.2 / cwv.global.fcpAvg) * 100 },
            { label: 'CLS Moyen', value: cwv.global.clsAvg.toFixed(2), target: '0.05', icon: 'ri-layout-line', ratio: (0.05 / cwv.global.clsAvg) * 100 },
            { label: 'TBT Moyen', value: `${cwv.global.tbtAvg}ms`, target: '50ms', icon: 'ri-hourglass-line', ratio: (50 / cwv.global.tbtAvg) * 100 },
            { label: 'Pass Mobile', value: `${cwv.global.passRateMobile}%`, target: '98%', icon: 'ri-smartphone-line', ratio: cwv.global.passRateMobile },
            { label: 'Pass Desktop', value: `${cwv.global.passRateDesktop}%`, target: '100%', icon: 'ri-computer-line', ratio: cwv.global.passRateDesktop },
          ].map(s => {
            const color = s.ratio >= 95 ? 'text-emerald-600' : s.ratio >= 80 ? 'text-amber-600' : 'text-red-600';
            return (
              <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
                <i className={`${s.icon} text-foreground-400 text-lg mb-1`}></i>
                <p className={`text-xl font-bold font-heading ${color}`}>{s.value}</p>
                <p className="text-[10px] text-foreground-500">{s.label}</p>
                <p className="text-[9px] text-foreground-400">Cible {s.target}</p>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Grade Distribution */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <h3 className="text-sm font-bold text-foreground-950 mb-3">Distribution des Grades — {cwv.pages.length} pages</h3>
          <div className="flex items-center gap-3">
            {Object.entries(cwv.global.gradeDistribution).map(([grade, count]) => {
              const gradeColors: Record<string, string> = { A: 'bg-emerald-500', B: 'bg-accent-500', C: 'bg-amber-500', D: 'bg-red-500', F: 'bg-red-700' };
              return (
                <div key={grade} className="flex-1 text-center">
                  <span className={`inline-block w-8 h-8 rounded-full ${gradeColors[grade]} text-white flex items-center justify-center text-xs font-bold mb-1`}>{grade}</span>
                  <p className="text-xs font-bold text-foreground-950">{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Page-level CWV */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2 mb-3">
          <i className="ri-file-list-3-line text-primary-500"></i>Détail par Page
        </h3>
        {cwv.pages.map(page => (
          <div key={page.page} className={`bg-background-50 border rounded-lg p-3 flex items-center gap-4 ${statusDots[page.status] === 'bg-red-500' ? 'border-red-200 bg-red-50/20' : 'border-background-200/70'}`}>
            <span className={`w-2 h-2 rounded-full ${statusDots[page.status]} shrink-0`}></span>
            <span className="text-sm font-medium text-foreground-800 w-32 shrink-0 truncate">{page.page}</span>
            <div className="flex-1 grid grid-cols-4 gap-3 text-xs">
              <span className="text-foreground-500">LCP <strong className="text-foreground-950">{page.lcp}s</strong></span>
              <span className="text-foreground-500">FCP <strong className="text-foreground-950">{page.fcp}s</strong></span>
              <span className="text-foreground-500">CLS <strong className="text-foreground-950">{page.cls}</strong></span>
              <span className="text-foreground-500">TBT <strong className="text-foreground-950">{page.tbt}ms</strong></span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[page.status]}`}>{page.grade}</span>
            <span className="text-[10px] text-foreground-400 w-16 text-right">{page.weightKB} Ko</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 3: DETTE TECHNIQUE
// ═══════════════════════════════════════════
function TechDebtTab({ engine }: { engine: ReturnType<typeof useKOSZeroDefect> }) {
  const debt = engine.techDebt;
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Debt Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Dette Totale', value: debt.totalDebt, color: 'text-red-600', icon: 'ri-bug-line', bg: 'bg-red-50' },
            { label: 'Critique', value: debt.criticalDebt, color: 'text-red-700', icon: 'ri-error-warning-line', bg: 'bg-red-100' },
            { label: 'Réduite ce mois', value: debt.reducedThisMonth, color: 'text-emerald-600', icon: 'ri-arrow-down-line', bg: 'bg-emerald-50' },
            { label: 'Tendance', value: debt.trend, color: debt.trend < 0 ? 'text-emerald-600' : 'text-red-600', icon: debt.trend < 0 ? 'ri-arrow-down-line' : 'ri-arrow-up-line', bg: debt.trend < 0 ? 'bg-emerald-50' : 'bg-red-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border border-background-200/70 rounded-xl p-4 text-center`}>
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className={`text-xl font-bold font-heading ${s.color}`}>{typeof s.value === 'number' && s.value < 0 ? s.value : s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Debt Trend */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <h3 className="text-sm font-bold text-foreground-950 mb-3">Évolution Dette Technique — Juin 2026</h3>
          <div className="flex items-end gap-2 h-32">
            {debt.history.map(h => {
              const pct = (h.debt / 100) * 100;
              return (
                <div key={h.date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-foreground-700">{h.debt}</span>
                  <div className="w-full bg-red-400 rounded-t" style={{ height: `${pct}%` }}></div>
                  <span className="text-[8px] text-foreground-400">{h.date.slice(8)}</span>
                </div>
              );
            })}
            <div className="flex flex-col items-center gap-1 ml-2">
              <span className="text-[10px] font-bold text-emerald-600">0</span>
              <div className="w-6 border-t-2 border-dashed border-emerald-400" style={{ marginBottom: '2rem' }}></div>
              <span className="text-[8px] text-emerald-600">Cible</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Debt Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
          <i className="ri-stack-line text-primary-500"></i>Par Catégorie
        </h3>
        {debt.categories.map(cat => (
          <div key={cat.id} className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-100 transition-colors"
              onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                  <i className={`${cat.icon} text-lg`} style={{ color: cat.color }}></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground-950">{cat.name}</h4>
                  <span className="text-xs text-foreground-500">{cat.debt} items · {cat.fixed} corrigés</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-background-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${((cat.debt - cat.fixed) / cat.debt) * 100}%`, backgroundColor: cat.color }}></div>
                </div>
                <i className={`${expandedCat === cat.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-400`}></i>
              </div>
            </div>
            {expandedCat === cat.id && (
              <div className="border-t border-background-100 divide-y divide-background-100">
                {cat.items.map(item => (
                  <div key={item.id} className="px-4 py-3 flex items-start gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${item.severity === 'critical' ? 'bg-red-500' : item.severity === 'high' ? 'bg-amber-500' : item.severity === 'medium' ? 'bg-accent-500' : 'bg-foreground-400'}`}></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground-800">{item.title}</p>
                      <p className="text-[10px] text-foreground-500 mt-0.5">{item.fix}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        item.status === 'in_progress' ? 'bg-accent-100 text-accent-700' :
                        item.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-background-100 text-foreground-500'
                      }`}>{item.status === 'in_progress' ? 'En cours' : item.status === 'resolved' ? 'Résolu' : 'Ouvert'}</span>
                      <p className="text-[9px] text-emerald-600 mt-0.5">{item.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 4: SANTÉ URLs
// ═══════════════════════════════════════════
function UrlHealthTab({ engine }: { engine: ReturnType<typeof useKOSZeroDefect> }) {
  const health = engine.urlHealth;

  return (
    <div className="space-y-8">
      {/* URL Health Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Total URLs', value: health.totalUrls, icon: 'ri-link', color: 'text-foreground-950' },
            { label: 'Saines', value: health.healthy, icon: 'ri-check-line', color: 'text-emerald-600' },
            { label: 'Cassées', value: health.broken, icon: 'ri-close-line', color: 'text-red-600' },
            { label: 'Redirections', value: health.redirects, icon: 'ri-arrow-right-line', color: 'text-amber-600' },
            { label: '404', value: health.notFound, icon: 'ri-forbid-line', color: 'text-red-700' },
            { label: 'Santé', value: `${health.healthPercent}%`, icon: 'ri-heart-pulse-line', color: health.healthPercent >= 98 ? 'text-emerald-600' : 'text-amber-600' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
              <i className={`${s.icon} ${s.color} text-lg mb-1`}></i>
              <p className="text-xl font-bold text-foreground-950 font-heading">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Robots.txt & Sitemap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h3 className="text-sm font-bold text-foreground-950 mb-2 flex items-center gap-2">
              <i className="ri-robot-2-line text-primary-500"></i>robots.txt
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${health.robotsTxt.status === 'ok' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {health.robotsTxt.status === 'ok' ? 'OK' : 'ISSUES'}
            </span>
            <p className="text-xs text-foreground-500 mt-2">Dernière modification : {new Date(health.robotsTxt.lastModified).toLocaleString('fr-FR')}</p>
            <div className="mt-2 text-[10px] text-foreground-400 space-y-0.5">
              <p>Chemins désactivés : {health.robotsTxt.disallowedPaths.join(', ')}</p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h3 className="text-sm font-bold text-foreground-950 mb-2 flex items-center gap-2">
              <i className="ri-file-list-3-line text-primary-500"></i>Sitemap
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${health.sitemap.status === 'ok' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {health.sitemap.status === 'ok' ? 'OK' : 'ISSUES'}
            </span>
            <p className="text-xs text-foreground-500 mt-2">{health.sitemap.urls} URLs · Généré le {new Date(health.sitemap.lastGenerated).toLocaleString('fr-FR')}</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Critical URLs */}
      <div>
        <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <i className="ri-error-warning-line text-red-600"></i>URLs Critiques — {health.criticalUrls.filter(u => u.autoFixStatus === 'open').length} en attente
        </h3>
        <div className="space-y-2">
          {health.criticalUrls.map(url => (
            <div key={url.url} className={`bg-background-50 border rounded-lg p-4 ${url.priority === 'critical' ? 'border-red-200 bg-red-50/10' : 'border-amber-200 bg-amber-50/10'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${url.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{url.priority.toUpperCase()}</span>
                    <span className="text-sm font-medium text-foreground-800 truncate">{url.url}</span>
                    <span className="text-xs text-red-600 font-bold">HTTP {url.statusCode}</span>
                  </div>
                  <p className="text-xs text-foreground-500">{url.issue}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      url.autoFixStatus === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                      url.autoFixStatus === 'in_progress' ? 'bg-accent-100 text-accent-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {url.autoFixStatus === 'resolved' ? '✓ Auto-fixé' : url.autoFixStatus === 'in_progress' ? '⟳ Auto-fix en cours' : '✗ En attente'}
                    </span>
                    <span className="text-[10px] text-foreground-400">Détecté {new Date(url.detectedAt).toLocaleString('fr-FR')}</span>
                  </div>
                </div>
              </div>
              {url.autoFixStrategy && (
                <div className="mt-2 pt-2 border-t border-background-100 text-[10px] text-primary-600">
                  <i className="ri-tools-line mr-1"></i>{url.autoFixStrategy}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Noindex Audit */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <h3 className="text-sm font-bold text-foreground-950 mb-2">Audit Noindex</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-foreground-500">Pages avec noindex : <strong className="text-foreground-950">{health.noindexAudit.pagesWithNoindex}</strong></span>
            <span className="text-emerald-600">Légitimes : <strong>{health.noindexAudit.legitimateNoindex}</strong></span>
            <span className={health.noindexAudit.erroneousNoindex > 0 ? 'text-red-600' : 'text-emerald-600'}>
              Erronés : <strong>{health.noindexAudit.erroneousNoindex}</strong>
            </span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 5: SEEDING AGENTS
// ═══════════════════════════════════════════
function SeedingTab({ engine }: { engine: ReturnType<typeof useKOSZeroDefect> }) {
  const seeding = engine.agentSeeding;
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Seeding Overview */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Agents Seedés', value: `${seeding.agentsSeeded}/${seeding.totalAgents}`, icon: 'ri-robot-2-line', color: 'text-primary-600' },
            { label: 'Domaines', value: seeding.seedingDomains.length, icon: 'ri-stack-line', color: 'text-accent-600' },
            { label: 'En Cours', value: seeding.agentsInProgress, icon: 'ri-loader-4-line', color: 'text-amber-600' },
            { label: 'Complétion', value: `${Math.round((seeding.agentsSeeded / seeding.totalAgents) * 100)}%`, icon: 'ri-check-double-line', color: 'text-emerald-600' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
              <i className={`${s.icon} ${s.color} text-lg mb-1`}></i>
              <p className="text-xl font-bold text-foreground-950 font-heading">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Domains */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
          <i className="ri-seedling-line text-emerald-500"></i>Domaines de Seeding
        </h3>
        {seeding.seedingDomains.map(domain => (
          <div key={domain.id} className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-100 transition-colors"
              onClick={() => setExpandedDomain(expandedDomain === domain.id ? null : domain.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${domain.color}15` }}>
                  <i className={`${domain.icon} text-lg`} style={{ color: domain.color }}></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground-950">{domain.name}</h4>
                  <span className="text-xs text-foreground-500">{domain.agentsSeeded}/{domain.agentsTarget} agents</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-background-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(domain.agentsSeeded / domain.agentsTarget) * 100}%`, backgroundColor: domain.color }}></div>
                </div>
                <span className="text-xs font-bold text-foreground-700">{Math.round((domain.agentsSeeded / domain.agentsTarget) * 100)}%</span>
                <i className={`${expandedDomain === domain.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-400`}></i>
              </div>
            </div>
            {expandedDomain === domain.id && (
              <div className="border-t border-background-100 divide-y divide-background-100">
                {domain.skills.map(skill => (
                  <div key={skill.skill} className="px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground-800">{skill.skill}</p>
                      <p className="text-[10px] text-foreground-400">{skill.agents} agents · Mis à jour le {skill.lastUpdated}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${skill.mastery >= 90 ? 'bg-emerald-500' : skill.mastery >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${skill.mastery}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-foreground-700 w-8 text-right">{skill.mastery}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Seeding Log */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <h3 className="text-sm font-bold text-foreground-950 mb-3">Journal de Seeding Récent</h3>
          <div className="space-y-2">
            {seeding.recentSeedingLog.map((log, i) => (
              <div key={i} className="flex items-center gap-3 text-xs p-2 rounded-lg bg-background-100">
                <span className="text-[10px] text-foreground-400 w-24 shrink-0">{new Date(log.date).toLocaleString('fr-FR')}</span>
                <span className="text-foreground-600">{log.domain}</span>
                <i className="ri-arrow-right-line text-foreground-300"></i>
                <span className="text-foreground-800 font-medium">{log.skill}</span>
                <span className="text-emerald-600 ml-auto">+{log.agentsUpdated} agents → {log.newMastery}%</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 6: OBJECTIF ZÉRO-DÉFAUT
// ═══════════════════════════════════════════
function TargetTab({ engine }: { engine: ReturnType<typeof useKOSZeroDefect> }) {
  const target = engine.zeroDefect;

  return (
    <div className="space-y-8">
      {/* Target Progress */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-foreground-950">Trajectoire Zéro-Défaut</h3>
              <p className="text-xs text-foreground-500 mt-1">Progression globale vers l&apos;état cible — 0 défaut, 0 dette, 0 URL cassée, 100% conformité</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-foreground-950 font-heading">{engine.overallZeroDefectProgress}%</p>
              <p className="text-[10px] text-foreground-500">Complétion estimée {target.estimatedCompletion}</p>
            </div>
          </div>
          <div className="w-full h-4 bg-background-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${engine.overallZeroDefectProgress}%` }}></div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-foreground-400">
            <span>Score actuel : {target.currentScore}/100</span>
            <span>{target.remainingCorrections} corrections restantes</span>
            <span>{target.dailyCorrections} corrections/jour</span>
            <span>Cible : 100/100</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Dimensions */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
          <i className="ri-focus-3-line text-accent-500"></i>8 Dimensions vers le Zéro-Défaut
        </h3>
        {target.dimensions.map(dim => {
          const hexColor = dim.current >= 95 ? '#059669' : dim.current >= 85 ? '#f59e0b' : dim.current >= 70 ? '#d97706' : '#ef4444';
          return (
            <div key={dim.id} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${hexColor}15` }}>
                    <i className={`${dim.icon} text-lg`} style={{ color: hexColor }}></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground-950">{dim.name}</h4>
                    <p className="text-[10px] text-foreground-500">{dim.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-heading" style={{ color: hexColor }}>
                    {dim.inverse ? dim.current : dim.current}{dim.inverse ? '' : dim.current >= 95 ? '/100' : '/100'}
                  </span>
                  <p className="text-[9px] text-foreground-400">Poids {dim.weight}%</p>
                </div>
              </div>
              <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${dim.inverse ? (dim.current > 0 ? Math.max(5, (1 - dim.current / 60) * 100) : 100) : dim.current}%`,
                    backgroundColor: hexColor,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone History */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <h3 className="text-sm font-bold text-foreground-950 mb-3">Historique de Progression</h3>
          <div className="flex items-end gap-3 h-24">
            {target.milestoneHistory.map(m => (
              <div key={m.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-foreground-700">{m.score}</span>
                <div className="w-full rounded-t" style={{ height: `${m.score}%`, backgroundColor: m.score >= 90 ? '#059669' : m.score >= 80 ? '#f59e0b' : '#ef4444', minHeight: '20px' }}></div>
                <span className="text-[8px] text-foreground-400">{m.date.slice(8)}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Target CTA */}
      <div className="bg-foreground-950 rounded-xl p-6 text-center">
        <p className="text-white text-lg font-bold mb-2 font-heading">🏆 État Cible : Zéro-Défaut — Septembre 2026</p>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mb-4">
          0 défaut technique · 0 dette technique · 0 URL défectueuse · 100% URLs indexées et valides · 100% conformité Big Four & ISO · 100% qualité technique totale KOS
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/kos-correction-engine" className="px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-bold hover:bg-accent-600 cursor-pointer whitespace-nowrap">
            <i className="ri-tools-line mr-1.5"></i>Activer Corrections
          </Link>
          <Link to="/kos-performance-seo-command" className="px-4 py-2 rounded-lg bg-primary-500 text-background-50 dark:text-foreground-950 text-sm font-bold hover:bg-primary-600 cursor-pointer whitespace-nowrap">
            <i className="ri-rocket-2-line mr-1.5"></i>Optimiser Performance
          </Link>
        </div>
      </div>
    </div>
  );
}