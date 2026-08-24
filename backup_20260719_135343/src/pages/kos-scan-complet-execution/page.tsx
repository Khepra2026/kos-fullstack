import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useKOSScanCompletExecution } from '@/hooks/useKOSScanCompletExecution';
import type { ScanDomain, ScanRemainingTask, ScanExecutionBlock, ScanGlobalStats } from '@/mocks/scanCompletExecution';

function getScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  if (score >= 55) return 'text-orange-600';
  return 'text-red-600';
}

function getScoreBg(score: number): string {
  if (score >= 85) return 'bg-emerald-500';
  if (score >= 70) return 'bg-amber-500';
  if (score >= 55) return 'bg-orange-500';
  return 'bg-red-500';
}

function getDomainStatusBadge(status: ScanDomain['status']) {
  switch (status) {
    case 'optimal': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Optimal', dot: 'bg-emerald-500' };
    case 'stable': return { bg: 'bg-accent-50', border: 'border-accent-200', text: 'text-accent-700', label: 'Stable', dot: 'bg-accent-500' };
    case 'degraded': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Dégradé', dot: 'bg-amber-500' };
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique', dot: 'bg-red-500' };
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'P0': return 'bg-red-100 text-red-700 border-red-200';
    case 'P1': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'P2': return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    default: return 'bg-background-100 text-foreground-500 border-background-200';
  }
}

function getTaskStatusBadge(status: string) {
  switch (status) {
    case 'non_demarre': return { bg: 'bg-background-100', text: 'text-foreground-500', label: 'À faire' };
    case 'en_cours': return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En cours' };
    case 'termine': return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Terminé' };
    case 'bloque': return { bg: 'bg-red-100', text: 'text-red-700', label: 'Bloqué' };
    default: return { bg: 'bg-background-100', text: 'text-foreground-500', label: status };
  }
}

function getBlockStatusBadge(status: string) {
  switch (status) {
    case 'pending': return { bg: 'bg-background-100', border: 'border-background-200', text: 'text-foreground-500', label: 'En attente', dot: 'bg-foreground-400' };
    case 'executing': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours', dot: 'bg-amber-500' };
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Terminé', dot: 'bg-emerald-500' };
    case 'failed': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Échoué', dot: 'bg-red-500' };
    default: return { bg: 'bg-background-100', border: 'border-background-200', text: 'text-foreground-500', label: status, dot: 'bg-foreground-400' };
  }
}

type TabId = 'dashboard' | 'tasks' | 'blocks';

export default function scanCompletExecutionPage() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const hook = useKOSScanCompletExecution();

  const filteredTasks = useMemo(() => {
    let result = hook.tasks;
    if (selectedDomain !== 'all') result = result.filter((t) => t.domainId === selectedDomain);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.action.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.responsable.toLowerCase().includes(q) ||
          t.standardVise.toLowerCase().includes(q),
      );
    }
    return result;
  }, [hook.tasks, selectedDomain, searchQuery]);

  const domainTasksCount = useMemo(() => {
    const map: Record<string, number> = { all: hook.tasks.length };
    hook.domains.forEach((d) => {
      map[d.id] = hook.tasks.filter((t) => t.domainId === d.id).length;
    });
    return map;
  }, [hook.tasks, hook.domains]);

  const pendingBlocks = hook.blocks.filter((b) => b.status === 'pending');
  const completedBlocks = hook.blocks.filter((b) => b.status === 'completed');

  const tabs = [
    { id: 'dashboard' as TabId, label: 'Dashboard', icon: 'ri-dashboard-line', count: String(hook.domains.length) },
    { id: 'tasks' as TabId, label: 'Tâches Restantes', icon: 'ri-tools-line', count: String(hook.tasks.length) },
    { id: 'blocks' as TabId, label: 'Blocs d\'Exécution', icon: 'ri-stack-line', count: `${completedBlocks.length}/${hook.blocks.length}` },
  ];

  return (
    <hubLayout hubId={999} activeTab="dashboard" tabLabel="Scan Complet + Exécution">
      <SeoHead
        title="KOS Scan Complet + Exécution en Bloc — Cockpit de Commandement Unifié | KHEPRA EXPERTS"
        description="Scan intégral KOS : 8 domaines, intégrité système, agents IA, sécurité, conformité, SEO, contenu, business. Exécution en bloc de toutes les tâches restantes. Score cible : 100/100 Big Four."
        keywords="KOS Scan Complet, exécution en bloc, tâches restantes KOS, cockpit commandement, Big Four 100%, KHEPRA EXPERTS"
        canonicalPath="/kos-scan-complet-execution"
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="absolute inset-0 opacity-[0.04]">
          <img
            src="https://readdy.ai/api/search-image?query=dark%20sophisticated%20command%20center%20dashboard%20with%20interconnected%20glowing%20nodes%20forming%20a%20global%20scanning%20grid%20with%20pulsating%20red%20amber%20and%20emerald%20status%20indicators%20representing%20system%20integrity%20diagnostic%20scanning%20across%20multiple%20technological%20layers%20deep%20space%20background%20with%20subtle%20particle%20effects%20and%20geometric%20data%20streams%20converging%20to%20a%20central%20command%20node%20corporate%20enterprise%20command%20control%20aesthetic%20no%20human%20figures%20no%20text&width=1920&height=600&seq=kos-scan-complet-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/75 via-foreground-950/90 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                    hook.scanCompleted
                      ? 'bg-emerald-500/20 border-emerald-400/30'
                      : 'bg-red-100 border-red-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${hook.scanCompleted ? 'bg-emerald-400' : 'bg-red-500 animate-pulse'}`} />
                    <span className={`text-xs font-semibold ${hook.scanCompleted ? 'text-emerald-300' : 'text-red-700'}`}>
                      {hook.scanCompleted
                        ? `SCAN TERMINÉ — ${hook.globalStats.totalTasks} TÂCHES RESTANTES`
                        : 'SCAN COMPLET RECOMMANDÉ'
                      }
                    </span>
                  </span>
                  {hook.isLive && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-semibold text-emerald-300">LIVE DB</span>
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-heading">
                  KOS Scan Complet + Exécution
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl">
                  Scan intégral de <strong className="text-white">{hook.globalStats.totalDomains} domaines</strong> KOS —{' '}
                  <strong className="text-white">{hook.globalStats.totalTasks} tâches restantes</strong> identifiées,{' '}
                  <strong className="text-red-300">{hook.globalStats.totalCritical} critiques P0</strong>.{' '}
                  Exécution en bloc pour tout corriger d'un seul clic. Score cible : <strong className="text-emerald-300">100/100 Big Four</strong>.
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Budget total estimé : <strong className="text-white">{hook.globalStats.totalEstimatedBudget}</strong> ·{' '}
                  Effort : <strong className="text-white">{hook.globalStats.totalEstimatedEffort}</strong>
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {[
                  { label: 'Domaines', value: `${hook.globalStats.domainsOptimal}/${hook.globalStats.totalDomains}`, icon: 'ri-stack-line', color: 'text-emerald-400' },
                  { label: 'Critiques', value: `${hook.globalStats.totalCritical}`, icon: 'ri-error-warning-line', color: 'text-red-400' },
                  { label: 'Auto-Fix', value: `${hook.globalStats.totalAutoFixable}`, icon: 'ri-flashlight-line', color: 'text-amber-400' },
                  { label: 'Blocs', value: `${pendingBlocks.length}`, icon: 'ri-play-circle-line', color: 'text-accent-400' },
                ].map((s) => (
                  <div key={s.label} className="bg-foreground-950/50 border border-foreground-800/50 rounded-xl p-3 text-center min-w-[90px] backdrop-blur-sm">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-foreground-900/50">
                      <i className={`${s.icon} ${s.color} text-sm`} />
                    </div>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-gray-400 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={hook.startFullScan}
                disabled={hook.scanRunning}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap ${
                  hook.scanRunning
                    ? 'bg-background-200 text-foreground-400'
                    : hook.scanCompleted
                      ? 'bg-foreground-950/50 border border-foreground-800/50 text-white hover:bg-foreground-950/70'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
                type="button"
              >
                <i className={`${hook.scanRunning ? 'ri-loader-4-line animate-spin' : 'ri-scan-line'}`} />
                {hook.scanRunning ? 'Scan en cours...' : hook.scanCompleted ? 'Relancer Scan Complet' : 'Lancer Scan Complet'}
              </button>

              {hook.scanCompleted && pendingBlocks.length > 0 && (
                <button
                  onClick={hook.executeAllBlocks}
                  disabled={hook.executingAll}
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  type="button"
                >
                  <i className={`${hook.executingAll ? 'ri-loader-4-line animate-spin' : 'ri-flashlight-line'}`} />
                  {hook.executingAll ? 'Exécution Globale...' : `Exécuter TOUT en Bloc (${pendingBlocks.length})`}
                </button>
              )}

              {completedBlocks.length === hook.blocks.length && hook.blocks.length > 0 && (
                <span className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-sm text-emerald-300 font-bold whitespace-nowrap">
                  <i className="ri-check-double-line" />
                  TOUT EST CORRIGÉ — Score 100%
                </span>
              )}
            </div>

            {/* Scan Progress Bar */}
            {hook.scanRunning && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <i className="ri-loader-4-line animate-spin text-amber-400" />
                    {hook.scanPhase}
                  </span>
                  <span className="text-sm font-bold text-amber-400">{hook.scanProgress}%</span>
                </div>
                <div className="h-2.5 bg-foreground-800/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${hook.scanProgress}%` }}
                  />
                </div>
              </div>
            )}

            {hook.scanCompleted && !hook.scanRunning && (
              <div className="mt-3 px-4 py-2.5 rounded-lg text-xs font-medium bg-emerald-500/10 border border-emerald-400/30 text-emerald-300">
                <div className="flex items-center gap-2">
                  <i className="ri-check-double-line text-sm" />
                  Scan complété — {hook.globalStats.totalTasks} tâches restantes · {hook.globalStats.totalCritical} P0 · Score moyen {hook.globalStats.avgHealthScore}/100 · {pendingBlocks.length} blocs prêts.
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ TAB NAVIGATION ═══════════ */}
      <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-background-50 dark:text-foreground-950'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ CONTENT ═══════════ */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {activeTab === 'dashboard' && (
          <DashboardTab
            hook={hook}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            domainTasksCount={domainTasksCount}
          />
        )}
        {activeTab === 'tasks' && (
          <TasksTab
            hook={hook}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            domainTasksCount={domainTasksCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredTasks={filteredTasks}
          />
        )}
        {activeTab === 'blocks' && <BlocksTab hook={hook} />}
      </div>

      {/* ═══════════ TOAST ═══════════ */}
      {hook.toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-foreground-950 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-lg">
            <i className={`${hook.toastMessage.includes('✅') || hook.toastMessage.includes('🎉') ? 'ri-check-double-line text-emerald-400' : hook.toastMessage.includes('🔥') ? 'ri-flashlight-line text-amber-400' : 'ri-loader-4-line animate-spin text-amber-400'}`} />
            <span className="text-sm font-medium">{hook.toastMessage}</span>
            <button onClick={hook.dismissToast} className="ml-2 text-gray-400 hover:text-white cursor-pointer">
              <i className="ri-close-line" />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════ FOOTER CROSSLINKS ═══════════ */}
      <section className="py-12 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-foreground-950 font-heading mb-2">Écosystème KOS — Tous les Scanners</h2>
            <p className="text-sm text-foreground-500">Accès direct à chaque scanner individuel pour des analyses approfondies.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Intégrité', path: '/kos-system-integrity-scanner', icon: 'ri-shield-check-line', color: '#C2410C' },
              { label: 'Agents', path: '/kos-global-agent-performance', icon: 'ri-robot-line', color: '#4F46E5' },
              { label: 'Sécurité', path: '/kos-full-system-security-scan', icon: 'ri-lock-line', color: '#E8943A' },
              { label: 'Tâches 100%', path: '/kos-tasks-restantes-100', icon: 'ri-medal-line', color: '#9B7B2C' },
              { label: 'Bloc Compliance', path: '/kos-bloc-total-compliance', icon: 'ri-scales-line', color: '#0D7B5F' },
              { label: 'SEO/AEO', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#4A7A1E' },
              { label: 'Content Factory', path: '/kos-content-factory-command', icon: 'ri-quill-pen-line', color: '#0891B2' },
              { label: 'Business Dev', path: '/kos-business-development-engine', icon: 'ri-funds-box-line', color: '#D4A82A' },
              { label: 'Ultimate Cockpit', path: '/kos-ultimate-cockpit', icon: 'ri-dashboard-3-line', color: '#9B7B2C' },
              { label: 'Unified Autopilot', path: '/kos-unified-autopilot', icon: 'ri-cpu-line', color: '#4A7A1E' },
              { label: 'Control Tower', path: '/kos-control-tower-automation', icon: 'ri-building-line', color: '#C2410C' },
              { label: 'Commandement', path: '/kos-commandement-operationnel-unifie', icon: 'ri-government-line', color: '#4F46E5' },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="rounded-xl border border-background-200 bg-white hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block p-3 text-center"
              >
                <div className="w-9 h-9 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                </div>
                <span className="text-xs font-bold text-foreground-800">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 1: DASHBOARD
// ═══════════════════════════════════════════════════════════════
function DashboardTab({
  hook,
  selectedDomain,
  setSelectedDomain,
  domainTasksCount,
}: {
  hook: ReturnType<typeof useKOSScanCompletExecution>;
  selectedDomain: string;
  setSelectedDomain: (d: string) => void;
  domainTasksCount: Record<string, number>;
}) {
  return (
    <div className="space-y-10">
      {/* Global Score */}
      {hook.scanCompleted && (
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
              <h2 className="text-lg font-semibold text-foreground-950 mb-4 font-heading">Score Global KOS</h2>
              <div className="relative w-44 h-44 mx-auto mb-4">
                <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 176 176">
                  <circle cx="88" cy="88" r="76" fill="none" stroke="var(--background-200)" strokeWidth="14" />
                  <circle
                    cx="88" cy="88" r="76" fill="none"
                    stroke={hook.globalStats.avgHealthScore >= 85 ? '#059669' : hook.globalStats.avgHealthScore >= 70 ? '#d97706' : '#dc2626'}
                    strokeWidth="14" strokeLinecap="round"
                    strokeDasharray={`${(hook.globalStats.avgHealthScore / 100) * 477} 477`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-5xl font-bold text-foreground-950 font-heading">{hook.globalStats.avgHealthScore}</span>
                  <span className="text-xs text-foreground-400">/100</span>
                </div>
              </div>
              <p className="text-sm text-foreground-500">Cible : <strong className="text-emerald-600">100/100</strong></p>
              <p className="text-xs text-foreground-400 mt-1">{hook.globalStats.totalTasks} tâches restantes</p>
            </div>
            <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground-950 mb-5 font-heading">
                {hook.globalStats.totalDomains} Domaines — Scores
              </h2>
              <div className="space-y-3">
                {hook.domains.map((domain) => {
                  const sc = getScoreBg(domain.score);
                  return (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(selectedDomain === domain.id ? 'all' : domain.id)}
                      className="w-full flex items-center gap-3 text-left cursor-pointer hover:bg-background-100/50 rounded-lg p-1 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${domain.color}15` }}>
                        <i className={`${domain.icon} text-sm`} style={{ color: domain.color }} />
                      </div>
                      <span className="text-xs font-medium text-foreground-700 w-36 truncate">{domain.label}</span>
                      <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                        <div className={`h-full ${sc} rounded-full transition-all duration-700`} style={{ width: `${domain.score}%` }} />
                      </div>
                      <span className="text-xs font-bold w-8 text-right text-foreground-950">{domain.score}</span>
                      <span className={`${getDomainStatusBadge(domain.status).bg} ${getDomainStatusBadge(domain.status).text} text-[9px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap`}>
                        {getDomainStatusBadge(domain.status).label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Stats Grid */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {[
            { label: 'Domaines', value: `${hook.globalStats.domainsOptimal}/${hook.globalStats.totalDomains}`, icon: 'ri-stack-line', color: 'text-emerald-600' },
            { label: 'P0 Critiques', value: `${hook.globalStats.totalCritical}`, icon: 'ri-error-warning-line', color: 'text-red-600' },
            { label: 'P1 Majeures', value: `${hook.globalStats.totalMajor}`, icon: 'ri-alert-line', color: 'text-amber-600' },
            { label: 'Auto-Fixables', value: `${hook.globalStats.totalAutoFixable}`, icon: 'ri-flashlight-line', color: 'text-accent-600' },
            { label: 'Blocs Prêts', value: `${hook.globalStats.executionBlocksPending}`, icon: 'ri-play-circle-line', color: 'text-foreground-700' },
            { label: 'Effort Total', value: hook.globalStats.totalEstimatedEffort, icon: 'ri-timer-line', color: 'text-foreground-700' },
            { label: 'Budget', value: hook.globalStats.totalEstimatedBudget, icon: 'ri-money-dollar-circle-line', color: 'text-foreground-700' },
          ].map((s) => (
            <div key={s.label} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100">
                <i className={`${s.icon} ${s.color} text-sm`} />
              </div>
              <p className="text-lg font-bold text-foreground-950 font-heading">{s.value}</p>
              <p className="text-[10px] text-foreground-400">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Domain Cards Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground-950 mb-4 font-heading flex items-center gap-2">
          <i className="ri-radar-line text-primary-500" />
          Détail par Domaine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {hook.domains.map((domain) => {
            const ds = getDomainStatusBadge(domain.status);
            const tasksForDomain = domainTasksCount[domain.id] || 0;
            return (
              <a
                key={domain.id}
                href={domain.hubPath}
                className="rounded-xl bg-background-50 border border-background-200 p-5 hover:shadow-md hover:border-foreground-300 transition-all cursor-pointer block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${domain.color}15` }}>
                    <i className={`${domain.icon} text-lg`} style={{ color: domain.color }} />
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${ds.bg} ${ds.border} ${ds.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ds.dot}`} />
                    {ds.label}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground-950 mb-1">{domain.label}</h3>
                <p className="text-xs text-foreground-500 line-clamp-2 mb-3">{domain.description}</p>
                <div className="grid grid-cols-3 gap-1 text-[10px] text-foreground-400">
                  <span><strong className="text-red-600">{domain.criticalItems}</strong> critiques</span>
                  <span><strong className="text-amber-600">{domain.majorItems}</strong> majeurs</span>
                  <span><strong className="text-accent-600">{domain.autoFixable}</strong> auto</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-foreground-400">
                  <span>{tasksForDomain} tâches restantes</span>
                  <span>·</span>
                  <span>{domain.estimatedEffort}</span>
                </div>
                <div className="mt-3 h-1.5 bg-background-200 rounded-full overflow-hidden">
                  <div className={`h-full ${getScoreBg(domain.score)} rounded-full`} style={{ width: `${domain.score}%` }} />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Execution Blocks Summary */}
      {hook.scanCompleted && (
        <ScrollReveal>
          <div className="bg-background-50 border border-background-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground-950 font-heading flex items-center gap-2">
                <i className="ri-stack-line text-accent-500" />
                {hook.blocks.length} Blocs d'Exécution
              </h2>
              {hook.blocks.filter(b => b.status === 'pending').length > 0 && (
                <button
                  onClick={hook.executeAllBlocks}
                  disabled={hook.executingAll}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  <i className={`${hook.executingAll ? 'ri-loader-4-line animate-spin' : 'ri-flashlight-line'}`} />
                  {hook.executingAll ? 'Exécution...' : 'Tout exécuter'}
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {hook.blocks.map((block) => {
                const bs = getBlockStatusBadge(block.status);
                return (
                  <div key={block.id} className={`rounded-lg border p-4 ${block.status === 'completed' ? 'bg-emerald-50/20 border-emerald-200' : 'bg-background-50 border-background-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2 h-2 rounded-full ${bs.dot} ${block.status === 'executing' ? 'animate-pulse' : ''}`} />
                      <span className="text-xs font-bold text-foreground-950">{block.label}</span>
                    </div>
                    <p className="text-[10px] text-foreground-500 mb-2 line-clamp-2">{block.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                      <span>{block.tasksCount} tâches</span>
                      <span>·</span>
                      <span className="text-red-600">{block.criticalCount} critiques</span>
                      <span>·</span>
                      <span>{block.estimatedEffort}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Empty state */}
      {!hook.scanCompleted && (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-background-100 flex items-center justify-center">
            <i className="ri-scan-line text-3xl text-foreground-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground-950 font-heading mb-2">Aucun scan effectué</h3>
          <p className="text-sm text-foreground-500 max-w-md mx-auto">
            Lancez un scan complet pour analyser tous les domaines KOS et identifier les tâches restantes.
          </p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 2: TÂCHES
// ═══════════════════════════════════════════════════════════════
function TasksTab({
  hook,
  selectedDomain,
  setSelectedDomain,
  domainTasksCount,
  searchQuery,
  setSearchQuery,
  filteredTasks,
}: {
  hook: ReturnType<typeof useKOSScanCompletExecution>;
  selectedDomain: string;
  setSelectedDomain: (d: string) => void;
  domainTasksCount: Record<string, number>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredTasks: ScanRemainingTask[];
}) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setSelectedDomain('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
            selectedDomain === 'all' ? 'bg-primary-500 text-background-50' : 'bg-background-50 border border-background-200 text-foreground-600 hover:bg-background-100'
          }`}
        >
          Tous ({domainTasksCount.all})
        </button>
        {hook.domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => setSelectedDomain(selectedDomain === domain.id ? 'all' : domain.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
              selectedDomain === domain.id
                ? 'text-white'
                : 'bg-background-50 border border-background-200 text-foreground-600 hover:bg-background-100'
            }`}
            style={selectedDomain === domain.id ? { backgroundColor: domain.color } : {}}
          >
            {domain.label} ({domainTasksCount[domain.id] || 0})
          </button>
        ))}
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-auto text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 w-48 focus:outline-none focus:border-primary-300"
        />
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {filteredTasks.map((task) => {
          const isExpanded = expandedTask === task.id;
          const ps = getPriorityBadge(task.priority);
          const ts = getTaskStatusBadge(task.status);
          const domain = hook.domains.find((d) => d.id === task.domainId);

          return (
            <div
              key={task.id}
              className={`bg-background-50 border rounded-lg transition-all ${
                isExpanded ? 'border-foreground-300' : 'border-background-200 hover:border-background-300'
              }`}
            >
              <button
                onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                className="w-full text-left p-4 flex items-start gap-3 cursor-pointer"
              >
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap border ${ps}`}>
                  {task.priority}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-[10px] font-mono text-foreground-400">{task.id}</span>
                    {domain && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full border whitespace-nowrap" style={{ backgroundColor: `${domain.color}15`, color: domain.color, borderColor: `${domain.color}40` }}>
                        {domain.label}
                      </span>
                    )}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap ${ts.bg} ${ts.text}`}>{ts.label}</span>
                    {task.autoFixable && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-50 border border-accent-200 text-accent-700 whitespace-nowrap">Auto-Fix</span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-950">{task.action}</h3>
                  <div className="flex items-center gap-3 text-[10px] text-foreground-400 mt-1">
                    <span><i className="ri-money-dollar-circle-line mr-0.5" />{task.budget}</span>
                    <span><i className="ri-time-line mr-0.5" />{task.effort}</span>
                    <span><i className="ri-user-line mr-0.5" />{task.responsable}</span>
                    <span><i className="ri-calendar-line mr-0.5" />{task.deadline}</span>
                  </div>
                </div>
                <i className={`text-foreground-400 text-sm ${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-background-200 pt-3 space-y-2">
                  <p className="text-xs text-foreground-600 leading-relaxed">{task.description}</p>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full"><i className="ri-flag-line mr-0.5" />KPI : {task.kpi100}</span>
                    <span className="bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full"><i className="ri-file-list-3-line mr-0.5" />{task.livrable}</span>
                    <span className="bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full"><i className="ri-medal-line mr-0.5" />{task.standardVise}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="ri-check-double-line text-2xl text-emerald-500" />
            </div>
            <p className="text-foreground-700 font-bold">Aucune tâche restante</p>
            <p className="text-xs text-foreground-400 mt-1">Tous les domaines sont à 100%.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 3: BLOCS D'EXÉCUTION
// ═══════════════════════════════════════════════════════════════
function BlocksTab({ hook }: { hook: ReturnType<typeof useKOSScanCompletExecution> }) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground-950 font-heading mb-1">
          {hook.blocks.length} Blocs d'Exécution
        </h2>
        <p className="text-sm text-foreground-500">
          {hook.blocks.filter(b => b.status === 'pending').length} en attente ·{' '}
          {hook.blocks.filter(b => b.status === 'completed').length} terminés
        </p>
      </div>

      {hook.blocks.map((block) => {
        const bs = getBlockStatusBadge(block.status);
        return (
          <div
            key={block.id}
            className={`rounded-xl border-2 p-6 transition-all ${
              block.status === 'completed'
                ? 'border-emerald-200 bg-emerald-50/10'
                : block.status === 'executing'
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-background-200 bg-background-50'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${block.color}15` }}>
                <i className={`${block.icon} text-xl`} style={{ color: block.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-lg font-bold text-foreground-950 font-heading">{block.label}</h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${bs.bg} ${bs.border} ${bs.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${bs.dot} ${block.status === 'executing' ? 'animate-pulse' : ''}`} />
                    {bs.label}
                  </span>
                </div>
                <p className="text-sm text-foreground-600">{block.description}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                  <span className="text-red-600 font-bold">{block.criticalCount} critiques</span>
                  <span className="text-amber-600 font-bold">{block.majorCount} majeures</span>
                  <span className="text-accent-600 font-bold">{block.autoFixableCount} auto-fixables</span>
                  <span className="text-foreground-400">{block.tasksCount} tâches</span>
                  <span className="text-foreground-400">{block.estimatedEffort}</span>
                  <span className="text-foreground-400">{block.estimatedBudget}</span>
                </div>
                <p className="text-xs text-emerald-600 font-medium mt-2">{block.globalImpact}</p>

                {/* Domain chips */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {block.targetDomains.map((did) => {
                    const domain = hook.domains.find((d) => d.id === did);
                    if (!domain) return null;
                    return (
                      <span
                        key={did}
                        className="text-[9px] px-2 py-0.5 rounded-full border whitespace-nowrap"
                        style={{ backgroundColor: `${domain.color}10`, color: domain.color, borderColor: `${domain.color}30` }}
                      >
                        {domain.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => hook.executeBlock(block.id)}
                disabled={block.status === 'completed' || hook.executingBlock === block.id}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  block.status === 'completed'
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                } disabled:opacity-50`}
              >
                <i className={`${hook.executingBlock === block.id ? 'ri-loader-4-line animate-spin' : block.status === 'completed' ? 'ri-check-line' : 'ri-play-line'}`} />
                {block.status === 'completed' ? 'Terminé' : hook.executingBlock === block.id ? 'Exécution...' : 'Exécuter'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}



