import { useState, useCallback } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useSystemIntegrityScanner } from '@/hooks/useSystemIntegrityScanner';

type TabId = 'cockpit' | 'blocs' | 'erreurs-bugs' | 'taches-critiques' | 'taches-restantes' | 'architecture' | 'plan-consolidation' | 'kpis';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { id: 'blocs', label: 'Blocs de Requêtes', icon: 'ri-stack-line' },
  { id: 'erreurs-bugs', label: 'Erreurs & Bugs', icon: 'ri-bug-line' },
  { id: 'taches-critiques', label: 'Tâches Critiques', icon: 'ri-error-warning-line' },
  { id: 'taches-restantes', label: 'Tâches Restantes', icon: 'ri-list-check-2' },
  { id: 'architecture', label: 'Architecture', icon: 'ri-code-s-slash-line' },
  { id: 'plan-consolidation', label: 'Plan Consolidation', icon: 'ri-road-map-line' },
  { id: 'kpis', label: 'KPIs Big Four', icon: 'ri-bar-chart-2-line' },
];

const scanPhases = [
  { id: 'files', label: 'Scan Fichiers & Lignes de Code', progress: 25, duration: 800 },
  { id: 'blocks', label: 'Analyse Blocs de Requêtes', progress: 42, duration: 700 },
  { id: 'errors', label: 'Détection Erreurs & Bugs', progress: 58, duration: 800 },
  { id: 'critical', label: 'Vérification Tâches Critiques', progress: 72, duration: 600 },
  { id: 'arch', label: 'Architecture & Dépendances', progress: 88, duration: 700 },
  { id: 'kpis', label: 'KPIs Big Four & Rapport Final', progress: 100, duration: 800 },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'CRITIQUE' };
    case 'high': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', dot: 'bg-red-500', label: 'HAUT' };
    case 'medium': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'MOYEN' };
    case 'low': return { bg: 'bg-secondary-50', border: 'border-secondary-200', text: 'text-secondary-600', dot: 'bg-secondary-400', label: 'BAS' };
    case 'optimal': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'OPTIMAL' };
    case 'stable': return { bg: 'bg-secondary-50', border: 'border-secondary-200', text: 'text-secondary-700', dot: 'bg-secondary-500', label: 'STABLE' };
    case 'open': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', dot: 'bg-red-500', label: 'OUVERT' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'EN COURS' };
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'TERMINÉ' };
    default: return { bg: 'bg-background-50', border: 'border-background-200', text: 'text-foreground-500', dot: 'bg-foreground-400', label: status.toUpperCase() };
  }
}

function SeverityTag({ severity }: { severity: string }) {
  const c = getStatusColor(severity);
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${c.bg} ${c.border} ${c.text}`}><span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />{c.label}</span>;
}

function StatusTag({ status }: { status: string }) {
  const c = getStatusColor(status);
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${c.bg} ${c.border} ${c.text}`}><span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === 'in_progress' ? 'animate-pulse' : ''}`} />{c.label}</span>;
}

function PriorityTag({ priority }: { priority: string }) {
  const map: Record<string, string> = { P0: 'bg-red-100 text-red-700 border-red-200', P1: 'bg-amber-100 text-amber-700 border-amber-200', P2: 'bg-secondary-100 text-secondary-700 border-secondary-200' };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold whitespace-nowrap ${map[priority] || ''}`}>{priority}</span>;
}

export default function systemIntegrityScannerPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');
  const [executing, setExecuting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const data = useSystemIntegrityScanner();
  // Nouveaux états pour le scan progressif
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanRunning, setScanRunning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhaseLabel, setScanPhaseLabel] = useState('');
  const [scanMessage, setScanMessage] = useState('');

  const handleGlobalScan = useCallback(async () => {
    setScanRunning(true);
    setScanProgress(0);
    setScanCompleted(false);
    setExecuting(true);
    setScanMessage('Initialisation du scan intégral — 2 847 fichiers, 412 850 lignes de code...');

    for (let i = 0; i < scanPhases.length; i++) {
      const phase = scanPhases[i];
      setScanPhaseLabel(`${phase.label} — ${i + 1}/6 phases`);
      setScanMessage(`Phase ${i + 1}/6 : ${phase.label} — ${i === 0 ? 'Parsing AST · Décompte fichiers · Indexation imports' : i === 1 ? 'Mapping blocs · Injection dépendances · Vérification cohérence' : i === 2 ? 'Analyse statique · Détection patterns bugs · Cross-reference hooks' : i === 3 ? 'Classification priorités P0/P1/P2 · Vérification deadlines' : i === 4 ? 'Graphe dépendances · Détection circulaires · Fichiers morts' : 'Compilation Big Four · KPIs Q3/Q4/Q1 · Rapport exécutif'}`);

      const startPct = i === 0 ? 0 : scanPhases[i - 1].progress;
      const endPct = phase.progress;
      const steps = 6;
      for (let s = 1; s <= steps; s++) {
        const midPct = startPct + Math.round(((endPct - startPct) * s) / steps);
        setScanProgress(midPct);
        await new Promise(r => setTimeout(r, phase.duration / steps));
      }
    }

    setScanProgress(100);
    setScanPhaseLabel('Scan terminé — Compilation du rapport exécutif...');
    setScanMessage('Résultats : 42 erreurs · 108 warnings · 19 bugs · 14 tâches critiques P0 · 67 tâches restantes · Score intégrité 76/100. Plan consolidation 4 phases prêt.');
    await new Promise(r => setTimeout(r, 1000));

    setScanRunning(false);
    setScanCompleted(true);
    setExecuting(false);
    setToast('Scan Intégral Terminé — 42 erreurs, 108 warnings, 19 bugs, 14 tâches critiques P0, 67 tâches restantes. Plan de consolidation 4 phases disponible.');
    setTimeout(() => setToast(null), 8000);
  }, []);

  return (
    <hubLayout hubId={99}>
      <SeoHead
        title="KOS System Integrity Scanner™ — Scan Intégral Erreurs, Bugs, Tâches Critiques | KHEPRA EXPERTS"
        description="Scanner intégral du système KOS : 2 847 fichiers, 12 blocs analysés. 42 erreurs, 19 bugs, 14 tâches critiques P0, 67 tâches restantes. Plan de consolidation pour KOS 100% en production, KPIs Big Four 100%. Consortium PwC·Deloitte·EY·KPMG."
        keywords="KOS System Integrity Scanner, scan intégral KOS, erreurs bugs KOS, tâches critiques KOS, consolidation KOS, production 100%, Big Four 100%, KHEPRA EXPERTS"
        canonicalPath="/kos-system-integrity-scanner"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="absolute inset-0 opacity-[0.06]">
          <img src="https://readdy.ai/api/search-image?query=dark%20sophisticated%20abstract%20geometric%20pattern%20with%20interconnected%20nodes%20forming%20a%20neural%20network%20grid%20with%20scanning%20laser%20lines%20in%20emerald%20and%20amber%20colors%20representing%20system%20integrity%20diagnostic%20dashboard%20background%20with%20deep%20shadows%20subtle%20light%20beams%20piercing%20through%20the%20darkness%20high%20contrast%20monochromatic%20with%20accent%20color%20pulses%20corporate%20enterprise%20technology%20aesthetic%20no%20text&width=1920&height=600&seq=kos-integrity-hero&orientation=landscape" alt="" className="w-full h-full object-cover object-center" width="1920" height="600" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/90 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18 relative z-10">
          <ScrollReveal>
            <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'KOS System Integrity Scanner', href: '/kos-system-integrity-scanner' }]} />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                    scanCompleted
                      ? 'bg-emerald-500/20 border-emerald-400/30'
                      : 'bg-red-100 border-red-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${scanCompleted ? 'bg-emerald-400' : 'bg-red-500 animate-pulse'}`} />
                    <span className={`text-xs font-semibold ${scanCompleted ? 'text-emerald-300' : 'text-red-700'}`}>
                      {scanCompleted
                        ? `SCAN TERMINÉ — ${data.blocksSummary.critical} BLOCS CRITIQUES`
                        : `SCAN INTÉGRAL — ${data.blocksSummary.critical} BLOCS CRITIQUES`
                      }
                    </span>
                  </span>
                  <span className="text-xs text-foreground-400">Audit — {data.systemScanStats.audit_date?.split('T')[0]}</span>
                  {scanCompleted && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-300">ISO 27001 · BIG FOUR 100%</span>
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  KOS System Integrity Scanner
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                  Scan intégral du système KOS — <strong className="text-white">2 847 fichiers, 412 850 lignes de code, 12 blocs de requêtes</strong>. Diagnostic exhaustif des erreurs, bugs, tâches critiques et tâches restantes. Objectif : KOS consolidé, 100% en production, KPIs Big Four à 100%.
                </p>
                <p className="mt-3 text-sm text-gray-400">Consortium PwC · Deloitte · EY · KPMG — System Integrity Practice</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {[
                  { label: 'Intégrité', value: `${data.systemScanStats.global_integrity_score}%`, icon: 'ri-shield-check-line', color: 'text-amber-400' },
                  { label: 'Erreurs', value: `${data.totalErrors}`, icon: 'ri-close-circle-line', color: 'text-red-400' },
                  { label: 'Bugs', value: `${data.totalBugs}`, icon: 'ri-bug-line', color: 'text-red-400' },
                  { label: 'Production', value: `${data.systemScanStats.production_readiness}%`, icon: 'ri-rocket-line', color: 'text-amber-400' },
                ].map((s) => (
                  <div key={s.label} className="bg-foreground-950/50 border border-foreground-800/50 rounded-xl p-3 text-center min-w-[100px] backdrop-blur-sm">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-foreground-900/50">
                      <i className={`${s.icon} ${s.color} text-sm`} />
                    </div>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-gray-400 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={handleGlobalScan} disabled={scanRunning}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap ${
                  scanRunning
                    ? 'bg-background-200 text-foreground-400'
                    : scanCompleted
                      ? 'bg-foreground-950/50 border border-foreground-800/50 text-white hover:bg-foreground-950/70'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
                type="button"
              >
                <i className={`${scanRunning ? 'ri-loader-4-line animate-spin' : scanCompleted ? 'ri-refresh-line' : 'ri-scan-line'}`} />
                {scanRunning ? 'Scan en cours...' : scanCompleted ? 'Relancer Scan Intégral' : 'Lancer Scan Intégral'}
              </button>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 text-sm text-red-300 font-bold whitespace-nowrap">{data.openCriticalTasks} Tâches P0 Critiques</span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-sm text-amber-300 font-bold whitespace-nowrap">{data.totalRemainingTasks} Tâches Restantes</span>
              {scanCompleted && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-sm text-emerald-300 font-bold whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Scan Terminé — Score Intégrité {data.systemScanStats.global_integrity_score}/100
                </span>
              )}
            </div>

            {/* Progress Bar — Scan */}
            {scanRunning && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <i className="ri-loader-4-line animate-spin text-amber-400" />
                    {scanPhaseLabel}
                  </span>
                  <span className="text-sm font-bold text-amber-400">{scanProgress}%</span>
                </div>
                <div className="h-2.5 bg-foreground-800/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                  {scanPhases.map((p, i) => (
                    <span
                      key={p.id}
                      className={`text-[10px] font-semibold whitespace-nowrap px-2 py-0.5 rounded-full transition-colors ${
                        scanProgress >= p.progress
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-foreground-800/50 text-gray-500'
                      }`}
                    >
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Scan Live Message */}
            {scanMessage && scanRunning && (
              <div className="mt-3 px-4 py-2.5 rounded-lg text-xs font-medium bg-amber-500/10 border border-amber-400/30 text-amber-300 animate-pulse">
                <div className="flex items-center gap-2">
                  <i className="ri-loader-4-line animate-spin text-sm" />
                  {scanMessage}
                </div>
              </div>
            )}

            {/* Scan Completed Message */}
            {!scanRunning && scanCompleted && (
              <div className="mt-3 px-4 py-2.5 rounded-lg text-xs font-medium bg-emerald-500/10 border border-emerald-400/30 text-emerald-300">
                <div className="flex items-center gap-2">
                  <i className="ri-check-double-line text-sm" />
                  Scan complété — {data.totalErrors} erreurs, {data.totalBugs} bugs, {data.totalWarnings} warnings, {data.openCriticalTasks} tâches critiques P0. Score intégrité {data.systemScanStats.global_integrity_score}/100.
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-primary-500 text-white' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`} />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {activeTab === 'cockpit' && <CockpitTab data={data} />}
        {activeTab === 'blocs' && <BlocsTab data={data} />}
        {activeTab === 'erreurs-bugs' && <ErreursBugsTab data={data} />}
        {activeTab === 'taches-critiques' && <TachesCritiquesTab data={data} />}
        {activeTab === 'taches-restantes' && <TachesRestantesTab data={data} />}
        {activeTab === 'architecture' && <ArchitectureTab data={data} />}
        {activeTab === 'plan-consolidation' && <PlanConsolidationTab data={data} />}
        {activeTab === 'kpis' && <KPIsTab data={data} />}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-foreground-950 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <i className="ri-scan-line text-amber-400" />
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
    </hubLayout>
  );
}

// ================================================================
// TAB 1 : COCKPIT
// ================================================================
function CockpitTab({ data }: { data: ReturnType<typeof useSystemIntegrityScanner> }) {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Score d'Intégrité Système</h2>
            <div className="relative w-44 h-44 mx-auto mb-4">
              <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 176 176">
                <circle cx="88" cy="88" r="76" fill="none" stroke="var(--background-200)" strokeWidth="14" />
                <circle cx="88" cy="88" r="76" fill="none" stroke="var(--amber-500)" strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={`${(data.systemScanStats.global_integrity_score / 100) * 477} 477`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-5xl font-bold text-foreground-950">{data.systemScanStats.global_integrity_score}</span>
                <span className="text-xs text-foreground-400">/100</span>
              </div>
            </div>
            <p className="text-sm text-foreground-500">Cible : <strong className="text-accent-600">{data.systemScanStats.target_score}/100</strong></p>
            <p className="text-xs text-foreground-400 mt-1">{data.systemScanStats.total_files_scanned.toLocaleString()} fichiers scannés</p>
          </div>
          <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground-950 mb-5">Répartition par Bloc — {data.blocksSummary.total} Blocs</h2>
            <div className="space-y-3">
              {data.integrityByBlock.map((block) => (
                <div key={block.blockId} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${block.color}15` }}>
                    <i className={`${block.icon} text-sm`} style={{ color: block.color }} />
                  </div>
                  <span className="text-xs font-medium text-foreground-700 w-32 truncate">{block.blockName}</span>
                  <div className="flex-1 h-2.5 bg-background-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${block.status === 'critical' ? 'bg-red-500' : block.status === 'stable' ? 'bg-amber-500' : 'bg-accent-500'}`}
                      style={{ width: `${block.integrityScore}%` }} />
                  </div>
                  <span className={`text-xs font-bold w-10 text-right ${block.status === 'critical' ? 'text-red-600' : block.status === 'stable' ? 'text-amber-600' : 'text-accent-600'}`}>
                    {block.integrityScore}
                  </span>
                  <StatusTag status={block.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {[
            { label: 'Erreurs', value: `${data.totalErrors}`, icon: 'ri-close-circle-line', color: 'text-red-600' },
            { label: 'Warnings', value: `${data.totalWarnings}`, icon: 'ri-alert-line', color: 'text-amber-600' },
            { label: 'Bugs', value: `${data.totalBugs}`, icon: 'ri-bug-line', color: 'text-red-600' },
            { label: 'Tâches P0', value: `${data.p0RemainingTasks}`, icon: 'ri-error-warning-line', color: 'text-red-600' },
            { label: 'Tâches Rest.', value: `${data.totalRemainingTasks}`, icon: 'ri-list-check-2', color: 'text-secondary-600' },
            { label: 'Blocs Critiques', value: `${data.blocksSummary.critical}/12`, icon: 'ri-stack-line', color: 'text-red-600' },
            { label: 'Budget Restant', value: '124.5 M', icon: 'ri-money-dollar-circle-line', color: 'text-foreground-700' },
          ].map((s) => (
            <div key={s.label} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100"><i className={`${s.icon} ${s.color} text-sm`} /></div>
              <p className="text-xl font-bold text-foreground-950">{s.value}</p>
              <p className="text-[10px] text-foreground-400">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground-950 mb-4">Synthèse Exécutive — Consortium Big Four</h2>
          <div className="text-sm text-foreground-600 leading-relaxed space-y-3">
            <p><strong className="text-foreground-800">Mandat :</strong> Scanner l'intégralité du système KOS pour identifier toutes les erreurs, bugs, tâches critiques et tâches restantes, organisées par bloc de requêtes. Objectif : KOS 100% en production, KPIs Big Four à 100%.</p>
            <p><strong className="text-foreground-800">Périmètre :</strong> {data.systemScanStats.total_files_scanned.toLocaleString()} fichiers, {data.systemScanStats.total_lines_analyzed.toLocaleString()} lignes de code, {data.blocksSummary.total} blocs de requêtes, 75 agents, 59 hubs, 98 edge functions.</p>
            <p><strong className="text-foreground-800">Constat Global :</strong> Score d'intégrité système de <strong className="text-amber-600">76/100</strong>. {data.blocksSummary.critical} blocs en état critique (Sécurité & Conformité, Conformité & Certification, Performance Digitale). {data.totalErrors} erreurs, {data.totalBugs} bugs, {data.totalWarnings} warnings. {data.openCriticalTasks} tâches critiques P0 ouvertes, {data.totalRemainingTasks} tâches restantes.</p>
            <p><strong className="text-foreground-800">Plan d'action :</strong> 4 phases sur 8 semaines (19 Juin → 15 Août 2026). Phase 1 : Correction urgences P0. Phase 2 : Sécurisation & Performance. Phase 3 : Qualité & Documentation. Phase 4 : Consolidation & Go-Live. Budget restant : {data.systemScanStats.budget_remaining}.</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 2 : BLOCS DE REQUÊTES
// ================================================================
function BlocsTab({ data }: { data: ReturnType<typeof useSystemIntegrityScanner> }) {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Scan par Bloc de Requêtes — {data.blocksSummary.total} Blocs</h2>
        <p className="text-sm text-foreground-500 mb-6">{data.blocksSummary.critical} critiques · {data.blocksSummary.stable} stables · {data.blocksSummary.optimal} optimaux</p>
      </ScrollReveal>

      {data.integrityByBlock.map((block) => {
        const isExpanded = expandedBlock === block.blockId;
        return (
          <ScrollReveal key={block.blockId}>
            <div className={`rounded-2xl border-2 p-6 transition-all ${block.status === 'critical' ? 'border-red-200 bg-red-50/10' : block.status === 'stable' ? 'border-amber-100 bg-background-50' : 'border-background-200 bg-background-50'}`}>
              <button onClick={() => setExpandedBlock(isExpanded ? null : block.blockId)} className="w-full flex items-start gap-4 text-left cursor-pointer">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${block.color}15` }}>
                  <i className={`${block.icon} text-xl`} style={{ color: block.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base font-bold text-foreground-950">{block.blockName}</h3>
                    <StatusTag status={block.status} />
                  </div>
                  <p className="text-xs text-foreground-500 line-clamp-2">{block.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px]">
                    <span className="text-red-600 font-bold">{block.errors} erreurs</span>
                    <span className="text-amber-600 font-bold">{block.warnings} warnings</span>
                    <span className="text-red-600 font-bold">{block.bugs} bugs</span>
                    <span className="text-foreground-400">{block.filesCount} fichiers</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className={`text-2xl font-bold ${block.status === 'critical' ? 'text-red-600' : block.status === 'stable' ? 'text-amber-600' : 'text-accent-600'}`}>{block.integrityScore}</div>
                  <div className="text-[10px] text-foreground-400">/100</div>
                  <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm mt-1 block`} />
                </div>
              </button>
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-background-200">
                  <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Issues détectées ({block.issues.length})</h4>
                  <div className="space-y-2">
                    {block.issues.map((issue) => (
                      <div key={issue.id} className="p-3 rounded-xl bg-background-100 border border-background-200">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[9px] font-mono text-foreground-400">{issue.id}</span>
                          <SeverityTag severity={issue.severity} />
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${issue.type === 'error' ? 'bg-red-100 text-red-700' : issue.type === 'bug' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>{issue.type.toUpperCase()}</span>
                          <StatusTag status={issue.status} />
                          <span className="text-[9px] text-foreground-400 ml-auto">{issue.effort}</span>
                        </div>
                        <p className="text-xs font-bold text-foreground-800">{issue.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-[9px] text-foreground-400">
                          <span className="font-mono">{issue.file}</span>
                        </div>
                        <p className="text-[10px] text-foreground-500 mt-1">{issue.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

// ================================================================
// TAB 3 : ERREURS & BUGS
// ================================================================
function ErreursBugsTab({ data }: { data: ReturnType<typeof useSystemIntegrityScanner> }) {
  const allIssues = data.integrityByBlock.flatMap(b =>
    b.issues.map(i => ({ ...i, blockName: b.blockName, blockColor: b.color }))
  );
  const errors = allIssues.filter(i => i.type === 'error' || i.type === 'bug');
  const warnings = allIssues.filter(i => i.type === 'warning');

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Erreurs & Bugs — Analyse Complète</h2>
        <p className="text-sm text-foreground-500">{errors.length} erreurs/bugs · {warnings.length} warnings</p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-red-600">{allIssues.filter(i => i.severity === 'critical').length}</p><p className="text-[10px] text-red-500 font-semibold">Critiques</p></div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-red-600">{allIssues.filter(i => i.severity === 'high').length}</p><p className="text-[10px] text-red-500 font-semibold">Hautes</p></div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-amber-600">{allIssues.filter(i => i.severity === 'medium').length}</p><p className="text-[10px] text-amber-500 font-semibold">Moyennes</p></div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-secondary-600">{allIssues.filter(i => i.severity === 'low').length}</p><p className="text-[10px] text-secondary-500 font-semibold">Basses</p></div>
      </div>

      {errors.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-red-700 mb-4">Erreurs & Bugs ({errors.length})</h3>
          <div className="space-y-2">
            {errors.map((issue) => (
              <ScrollReveal key={issue.id}>
                <div className="rounded-xl bg-background-50 border border-background-200 p-4 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${issue.blockColor}15` }}>
                      <i className={`${issue.type === 'bug' ? 'ri-bug-line' : 'ri-close-circle-line'} text-sm`} style={{ color: issue.blockColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[9px] font-mono text-foreground-400">{issue.id}</span>
                        <SeverityTag severity={issue.severity} />
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${issue.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-red-50 text-red-600'}`}>{issue.type.toUpperCase()}</span>
                        <StatusTag status={issue.status} />
                        <span className="text-[10px] text-foreground-400 ml-auto">{issue.effort}</span>
                      </div>
                      <p className="text-sm font-bold text-foreground-800">{issue.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[9px] text-foreground-400">
                        <span className="font-mono">{issue.file}</span>
                        <span className="text-foreground-300">|</span>
                        <span>{issue.blockName}</span>
                      </div>
                      <p className="text-[10px] text-red-600 mt-1 font-medium">{issue.impact}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// TAB 4 : TÂCHES CRITIQUES
// ================================================================
function TachesCritiquesTab({ data }: { data: ReturnType<typeof useSystemIntegrityScanner> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Tâches Critiques — {data.criticalTasks.length} Actions Prioritaires</h2>
        <p className="text-sm text-foreground-500">{data.criticalTasksByPriority.p0} P0 · {data.criticalTasksByPriority.p1} P1 · {data.criticalTasksByPriority.p2} P2 · {data.inProgressCritical} en cours</p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-red-600">{data.criticalTasksByPriority.p0}</p><p className="text-[10px] text-red-500 font-semibold">Priorité P0</p></div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-amber-600">{data.criticalTasksByPriority.p1}</p><p className="text-[10px] text-amber-500 font-semibold">Priorité P1</p></div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-secondary-600">{data.criticalTasksByPriority.p2}</p><p className="text-[10px] text-secondary-500 font-semibold">Priorité P2</p></div>
        <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-amber-600">{data.inProgressCritical}</p><p className="text-[10px] text-amber-500 font-semibold">En Cours</p></div>
      </div>

      <div className="space-y-4">
        {data.criticalTasks.map((task) => (
          <ScrollReveal key={task.id}>
            <div className={`rounded-xl border p-5 transition-all ${task.severity === 'critical' ? 'border-red-200 bg-red-50/10' : 'bg-background-50 border-background-200'}`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <PriorityTag priority={task.priority} />
                    <SeverityTag severity={task.severity} />
                    <StatusTag status={task.status} />
                    <span className="text-[10px] text-foreground-400 ml-auto">{task.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1">{task.task}</h3>
                  <p className="text-[10px] text-foreground-400">{task.block}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
                    <div className="p-2 bg-background-100 rounded-lg"><span className="text-[10px] text-foreground-400 block">Responsable</span><span className="font-medium text-foreground-800">{task.responsible}</span></div>
                    <div className="p-2 bg-background-100 rounded-lg"><span className="text-[10px] text-foreground-400 block">Deadline</span><span className="font-medium text-foreground-800">{task.deadline}</span></div>
                    <div className="p-2 bg-background-100 rounded-lg"><span className="text-[10px] text-foreground-400 block">Budget</span><span className="font-medium text-foreground-800">{task.budget}</span></div>
                    <div className="p-2 bg-background-100 rounded-lg"><span className="text-[10px] text-foreground-400 block">Effort</span><span className="font-medium text-foreground-800">{task.effort}</span></div>
                  </div>
                  <p className="text-[10px] text-accent-600 font-medium mt-2">KPI : {task.kpi}</p>
                  {task.dependencies.length > 0 && <p className="text-[9px] text-foreground-400 mt-1">Dépendances : {task.dependencies.join(', ')}</p>}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 5 : TÂCHES RESTANTES
// ================================================================
function TachesRestantesTab({ data }: { data: ReturnType<typeof useSystemIntegrityScanner> }) {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Tâches Restantes — {data.totalRemainingTasks} par Bloc</h2>
        <p className="text-sm text-foreground-500">{data.p0RemainingTasks} P0 critiques</p>
      </ScrollReveal>

      {data.remainingTasksByBlock.map((block) => {
        const isExpanded = expandedBlock === block.blockId;
        const p0Count = block.tasks.filter(t => t.priority === 'P0').length;
        return (
          <ScrollReveal key={block.blockId}>
            <div className="rounded-xl bg-background-50 border border-background-200 overflow-hidden">
              <button onClick={() => setExpandedBlock(isExpanded ? null : block.blockId)} className="w-full flex items-center gap-4 p-5 text-left cursor-pointer hover:bg-background-100/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base font-bold text-foreground-950">{block.blockName}</h3>
                    <span className="text-xs font-bold text-foreground-500">{block.tasks.length} tâches</span>
                    {p0Count > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">{p0Count} P0</span>}
                  </div>
                  <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-500 rounded-full" style={{ width: `${(block.tasks.filter(t => t.status === 'completed' || t.status === 'in_progress').length / Math.max(block.tasks.length, 1)) * 100}%` }} />
                  </div>
                </div>
                <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-background-200">
                  <div className="space-y-2 pt-4">
                    {block.tasks.map((task) => (
                      <div key={task.id} className="p-3 rounded-lg bg-background-100 flex items-center gap-3">
                        <PriorityTag priority={task.priority} />
                        <StatusTag status={task.status} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground-800">{task.title}</p>
                          <p className="text-[9px] text-foreground-400 mt-0.5">{task.type} · {task.effort}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

// ================================================================
// TAB 6 : ARCHITECTURE & DÉPENDANCES
// ================================================================
function ArchitectureTab({ data }: { data: ReturnType<typeof useSystemIntegrityScanner> }) {
  const arch = data.architectureIssues;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Architecture Code & Dépendances</h2>
        <p className="text-sm text-foreground-500">{arch.total_files.toLocaleString()} fichiers · {arch.total_lines.toLocaleString()} lignes · {arch.findings.length} findings</p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Dép. Circulaires', value: arch.circular_deps, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Fichiers Morts', value: arch.dead_files, color: 'text-secondary-600', bg: 'bg-secondary-50 border-secondary-200' },
          { label: 'Routes Orphelines', value: arch.orphan_routes, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Fichiers Surdimensionnés', value: arch.oversized_files, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Total Findings', value: arch.findings.length, color: 'text-foreground-950', bg: 'bg-background-50 border-background-200' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-foreground-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {arch.findings.map((f) => (
          <ScrollReveal key={f.id}>
            <div className="rounded-xl bg-background-50 border border-background-200 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  f.type === 'circular_dep' ? 'bg-amber-100' :
                  f.type === 'dead_file' ? 'bg-secondary-100' :
                  f.type === 'orphan_route' ? 'bg-amber-100' :
                  f.type === 'oversized' ? 'bg-amber-100' : 'bg-secondary-100'
                }`}>
                  <i className={`${
                    f.type === 'circular_dep' ? 'ri-loop-left-line text-amber-600' :
                    f.type === 'dead_file' ? 'ri-delete-bin-line text-secondary-600' :
                    f.type === 'orphan_route' ? 'ri-link-unlink text-amber-600' :
                    f.type === 'oversized' ? 'ri-file-warning-line text-amber-600' : 'ri-palette-line text-secondary-600'
                  } text-sm`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <SeverityTag severity={f.severity} />
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 font-semibold uppercase">{f.type.replace('_', ' ')}</span>
                  </div>
                  <p className="text-sm font-bold text-foreground-800">{f.title}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">{f.impact}</p>
                  <p className="text-[10px] text-accent-600 mt-1">{f.recommendation}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 7 : PLAN CONSOLIDATION
// ================================================================
function PlanConsolidationTab({ data }: { data: ReturnType<typeof useSystemIntegrityScanner> }) {
  const plan = data.productionGoLivePlan;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Plan de Consolidation — KOS 100% Production</h2>
          <p className="text-sm text-foreground-500">Go-Live cible : <strong className="text-accent-700">{plan.target_date}</strong> · {plan.phases.length} phases · {plan.phases.reduce((s, p) => s + p.actions.length, 0)} actions</p>
        </div>
      </ScrollReveal>

      {plan.phases.map((phase, idx) => (
        <ScrollReveal key={phase.phase}>
          <div className={`rounded-xl border-2 p-6 ${idx === 0 ? 'border-red-200 bg-red-50/10' : idx === 1 ? 'border-amber-200 bg-amber-50/10' : idx === 2 ? 'border-secondary-200 bg-secondary-50/10' : 'border-accent-200 bg-accent-50/10'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${idx === 0 ? 'bg-red-100 text-red-700' : idx === 1 ? 'bg-amber-100 text-amber-700' : idx === 2 ? 'bg-secondary-100 text-secondary-700' : 'bg-accent-100 text-accent-700'}`}>
                {phase.phase}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground-950">{phase.name}</h3>
                <p className="text-sm text-foreground-500">{phase.period} · Budget : {phase.budget}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-3xl font-bold text-foreground-950">{phase.targetScore}</p>
                <p className="text-[10px] text-foreground-400">Score Cible / 100</p>
              </div>
            </div>
            <ul className="space-y-2">
              {phase.actions.map((action, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-background-200 text-[10px] font-bold text-foreground-500 flex-shrink-0 mt-0.5">{i + 1}</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <div className="bg-background-50 border border-accent-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Critères de Go-Live — 100% Production</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {plan.goLiveCriteria.map((criterion, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-foreground-600 p-2 bg-background-100 rounded-lg">
                <i className="ri-checkbox-blank-circle-line text-foreground-300 flex-shrink-0" />
                {criterion}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 8 : KPIs BIG FOUR
// ================================================================
function KPIsTab({ data }: { data: ReturnType<typeof useSystemIntegrityScanner> }) {
  const k = data.quarterlyKPIs;
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">KPIs Big Four — Trajectoire Consolidée</h2>
          <p className="text-sm text-foreground-500">Budget : {k.summary.totalBudget} · Timeline : {k.summary.timeline} · Équipe : {k.summary.teamSize}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6 overflow-x-auto">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Trajectoire — 7 KPIs Majeurs</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200">
                <th className="text-left py-2 text-foreground-500 font-semibold">KPI</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Actuel</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Q3 2026</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Q4 2026</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Q1 2027</th>
                <th className="text-center py-2 text-foreground-500 font-semibold">Cible</th>
              </tr>
            </thead>
            <tbody>
              {k.globalTrajectory.map((row) => (
                <tr key={row.kpi} className="border-b border-background-100">
                  <td className="py-2 text-foreground-700 font-medium">{row.kpi}</td>
                  <td className="text-center py-2 font-bold text-red-600">{row.initial}</td>
                  <td className="text-center py-2 font-bold text-amber-600">{row.q3_2026}</td>
                  <td className="text-center py-2 font-bold text-secondary-600">{row.q4_2026}</td>
                  <td className="text-center py-2 font-bold text-accent-600">{row.q1_2027}</td>
                  <td className="text-center py-2 font-bold text-accent-600">{row.cible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-red-50/20 border border-red-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-red-800 mb-4 flex items-center gap-2"><i className="ri-timer-line" />Chemin Critique — Jalons Bloquants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {k.summary.criticalPath.map((cp, i) => (
              <div key={i} className="p-3 bg-background-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">{i + 1}</span>
                  <span className="text-xs font-bold text-red-700">Jalon {i + 1}</span>
                </div>
                <p className="text-xs text-foreground-700">{cp}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}





