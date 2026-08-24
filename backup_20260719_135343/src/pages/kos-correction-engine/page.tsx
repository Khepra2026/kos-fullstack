import { useState } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { useCorrectionEngine } from '@/hooks/useCorrectionEngine';
import CorrectionCockpit from '';
import PerformanceFixPanel from '';
import SEOFixPanel from '';
import AssetsFixPanel from '';
import SecurityFixPanel from '';
import AccessibilityFixPanel from '';
import ReportsPanel from '';

const TABS = [
  { key: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { key: 'performance', label: 'Performance', icon: 'ri-speed-up-line' },
  { key: 'seo', label: 'SEO', icon: 'ri-search-eye-line' },
  { key: 'assets', label: 'Assets', icon: 'ri-stack-line' },
  { key: 'security', label: 'Sécurité', icon: 'ri-shield-check-line' },
  { key: 'accessibility', label: 'Accessibilité', icon: 'ri-wheelchair-line' },
  { key: 'reports', label: 'Rapports', icon: 'ri-file-chart-line' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function correctionEnginePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('cockpit');
  const {
    manifest,
    loopStatus,
    tickets,
    fixHistory,
    beforeAfter,
    scanResults,
    compressionAudit,
    seoQueue,
    jsOptimization,
    imageQueue,
    securityPlan,
    accessibilityQueue,
    executiveReport,
    loopLog,
    dataSource,
    loading,
    error,
    refresh,
  } = useCorrectionEngine();

  const p0Count = tickets.filter(p => p.priority === 'P0').length;
  const totalPending = loopStatus?.totalIssuesPending ?? 0;
  const totalFixed = loopStatus?.totalIssuesFixed ?? 0;
  const totalTotal = totalFixed + totalPending || 1;
  const completionPercent = Math.round((totalFixed / totalTotal) * 100);

  if (loading) {
    return (
      <>
        <SeoHead
          title="KOS Correction Engine — KHEPRA EXPERTS"
          description="Moteur de correction autonome — Scan → Fix → Verify → Optimize → Monitor → Repeat. 9 modules, boucle fermée, priorisation P0/P1/P2, standards Big Four sur khepraexperts.com"
          canonicalPath="/kos-correction-engine"
          noIndex={true}
        />
        <hubLayout hubId={58} activeTab="Correction Engine" tabLabel="Correction Engine">
          <div className="bg-background-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-foreground-500 font-body">Chargement du Correction Engine...</p>
            </div>
          </div>
        </hubLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SeoHead
          title="KOS Correction Engine — KHEPRA EXPERTS"
          description="Moteur de correction autonome — Scan → Fix → Verify → Optimize → Monitor → Repeat. 9 modules, boucle fermée, priorisation P0/P1/P2, standards Big Four sur khepraexperts.com"
          canonicalPath="/kos-correction-engine"
          noIndex={true}
        />
        <hubLayout hubId={58} activeTab="Correction Engine" tabLabel="Correction Engine">
          <div className="bg-background-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 text-red-600">
                <i className="ri-error-warning-line text-2xl"></i>
              </div>
              <p className="text-sm text-foreground-700 font-body">{error}</p>
              <button
                type="button"
                onClick={refresh}
                className="px-4 py-2 rounded-lg bg-accent-500 text-background-50 text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line mr-1.5"></i>Réessayer
              </button>
            </div>
          </div>
        </hubLayout>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title="KOS Correction Engine — KHEPRA EXPERTS"
        description="Moteur de correction autonome — Scan → Fix → Verify → Optimize → Monitor → Repeat. 9 modules, boucle fermée, priorisation P0/P1/P2, standards Big Four sur khepraexperts.com"
        canonicalPath="/kos-correction-engine"
        noIndex={true}
      />
      <hubLayout hubId={58} activeTab="Correction Engine" tabLabel="Correction Engine">
        <div className="bg-background-50 min-h-screen">
          {/* Hero Header */}
          <section className="bg-background-100 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700 shrink-0">
                    <i className="ri-tools-line text-2xl"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      {/* Badge Live Supabase */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-body tracking-wide ${
                        dataSource === 'supabase'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          dataSource === 'supabase' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                        }`}></span>
                        {dataSource === 'supabase' ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-100 text-accent-700 font-body tracking-wide">
                        KOS AUTONOMOUS
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                        9 MODULES
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 font-body tracking-wide">
                        BOUCLE FERMÉE
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">
                      KOS Correction Engine
                    </h1>
                    <p className="text-sm text-foreground-600 mt-1.5 max-w-2xl font-body">
                      Système autonome d&apos;ingénierie corrective — Performance Web, SEO technique, Sécurité,
                      Accessibilité WCAG 2.2, Optimisation frontend. Fonctionnement en boucle fermée
                      Scan → Fix → Verify → Optimize → Monitor → Repeat. Standards Big Four Enterprise Grade.
                    </p>
                  </div>
                </div>
                {/* Stats Card */}
                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-red-600 font-heading">{p0Count}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">P0 Critiques</span>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-amber-600 font-heading">{totalPending}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">En attente</span>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-emerald-600 font-heading">{totalFixed}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">Corrigés</span>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <div className="relative w-16 h-16">
                      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="oklch(var(--background-200))" strokeWidth="4" />
                        <circle
                          cx="32" cy="32" r="28" fill="none" stroke="oklch(var(--accent-500))"
                          strokeWidth="4" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - (completionPercent / 100))}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground-950 font-heading">
                        {completionPercent}%
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">Complétion</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Alert Banner */}
          {p0Count > 0 && (
            <div className="bg-red-50 border-b border-red-200">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-error-warning-line text-red-600 animate-pulse"></i>
                  <span className="font-semibold text-red-700 font-body">
                    {p0Count} corrections critiques en attente
                  </span>
                  <span className="text-red-500 font-body">
                    — {tickets.filter(p => p.priority === 'P0').map(p => p.title).join(' · ')}
                  </span>
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
                        ? 'bg-accent-500 text-background-50'
                        : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                    }`}
                    type="button"
                  >
                    <i className={`${tab.icon} text-sm`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            {activeTab === 'cockpit' && (
              <CorrectionCockpit manifest={manifest} loopStatus={loopStatus!} tickets={tickets} loopLog={loopLog} />
            )}
            {activeTab === 'performance' && (
              <PerformanceFixPanel tickets={tickets} compressionAudit={compressionAudit} scanResults={scanResults} />
            )}
            {activeTab === 'seo' && <SEOFixPanel seoQueue={seoQueue} />}
            {activeTab === 'assets' && (
              <AssetsFixPanel jsOptimization={jsOptimization} imageQueue={imageQueue} />
            )}
            {activeTab === 'security' && <SecurityFixPanel securityPlan={securityPlan} />}
            {activeTab === 'accessibility' && <AccessibilityFixPanel accessibilityQueue={accessibilityQueue} />}
            {activeTab === 'reports' && (
              <ReportsPanel beforeAfter={beforeAfter} fixHistory={fixHistory} executiveReport={executiveReport!} />
            )}
          </div>

          {/* Footer Info Bar */}
          <footer className="border-t border-background-200/70 bg-background-100 mt-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-[10px] text-foreground-500 font-body">
                  <span className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${loopStatus?.autoFixEnabled ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    Auto-fix : {loopStatus?.autoFixEnabled ? 'Activé' : 'Désactivé'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Intervalle : {loopStatus?.loopIntervalMinutes} min
                  </span>
                  {loopStatus?.nextScheduledScan && (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Prochain scan : {new Date(loopStatus.nextScheduledScan).toLocaleString('fr-FR')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-foreground-400 font-body">
                  {dataSource === 'supabase' ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Données Live — Supabase
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      Données Mock — Démo
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <i className="ri-loop-left-line"></i>
                    Scan → Fix → Verify → Optimize → Monitor → Repeat
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </hubLayout>
    </>
  );
}



