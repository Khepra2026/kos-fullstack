import { useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { usePhase1Consolidation } from '@/hooks/usePhase1Consolidation';

type TabId = 'cockpit' | 'urgences' | 'timeline' | 'budget' | 'log';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { id: 'urgences', label: 'Urgences P0', icon: 'ri-error-warning-line' },
  { id: 'timeline', label: 'Timeline', icon: 'ri-timeline-view' },
  { id: 'budget', label: 'Budget', icon: 'ri-money-dollar-circle-line' },
  { id: 'log', label: 'Log d\'Exécution', icon: 'ri-file-list-3-line' },
];

function getUrgencyStatusColor(status: string) {
  switch (status) {
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'TERMINÉ' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'EN COURS' };
    case 'blocked': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'BLOQUÉ' };
    case 'open': return { bg: 'bg-secondary-50', border: 'border-secondary-200', text: 'text-secondary-600', dot: 'bg-secondary-400', label: 'OUVERT' };
    default: return { bg: 'bg-background-50', border: 'border-background-200', text: 'text-foreground-500', dot: 'bg-foreground-400', label: status.toUpperCase() };
  }
}

function StatusBadge({ status }: { status: string }) {
  const c = getUrgencyStatusColor(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${c.bg} ${c.border} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === 'in_progress' ? 'animate-pulse' : ''}`} />
      {c.label}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-red-50 text-red-600 border-red-100',
    medium: 'bg-amber-50 text-amber-700 border-amber-100',
    low: 'bg-secondary-50 text-secondary-600 border-secondary-100',
  };
  return (
    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase whitespace-nowrap ${map[severity] || ''}`}>
      {severity}
    </span>
  );
}

export default function KosPhase1ConsolidationPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');
  const [expandedUrgence, setExpandedUrgence] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const data = usePhase1Consolidation();

  const handleLaunchExecution = () => {
    setToast('Phase 1 lancée — 8 urgences P0 en cours d\'exécution. Objectif : score d\'intégrité 76→85 avant le 3 Juillet 2026.');
    setTimeout(() => setToast(null), 5000);
  };

  const budgetRows = [
    { label: 'Total Phase 1', value: data.phase1Budget.total, color: 'text-foreground-950', bold: true },
    { label: 'Dépensé', value: data.phase1Budget.spent, color: 'text-amber-600' },
    { label: 'Restant', value: data.phase1Budget.remaining, color: 'text-emerald-600' },
  ];

  return (
    <KOSHubLayout hubId={100}>
      <SeoHead
        title="KOS Phase 1 Consolidation Execution™ — Correction 8 Urgences P0 | KHEPRA EXPERTS"
        description="Phase 1 du Plan Consolidation : correction des 8 urgences P0 — OWASP, COBAC R-2024/01, KYC PPE, LinkedIn MDP, goulot Revue Associé, Baromètre Inclusion Financière, cartographie CEMAC, formation COBAC. Objectif : score 76→85. Consortium PwC·Deloitte·EY·KPMG."
        keywords="KOS Phase 1 Consolidation, urgences P0, OWASP, COBAC R-2024/01, KYC PPE, LinkedIn MDP, Revue Associé, Baromètre Inclusion Financière, KHEPRA EXPERTS, Big Four"
        canonicalPath="/kos-phase1-consolidation"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="absolute inset-0 opacity-[0.05]">
          <img src="https://readdy.ai/api/search-image?query=dark%20intense%20action%20oriented%20abstract%20background%20with%20converging%20geometric%20shapes%20and%20dynamic%20diagonal%20motion%20lines%20in%20deep%20red%20and%20emerald%20tones%20representing%20urgent%20execution%20and%20critical%20mission%20operations%20corporate%20command%20center%20aesthetic%20with%20subtle%20grid%20patterns%20and%20focused%20energy%20beams%20high%20contrast%20dramatic%20atmosphere%20no%20text&width=1920&height=600&seq=kos-phase1-hero&orientation=landscape" alt="" className="w-full h-full object-cover object-center" width="1920" height="600" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/80 via-foreground-950/90 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18 relative z-10">
          <ScrollReveal>
            <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'KOS System Integrity Scanner', href: '/kos-system-integrity-scanner' }, { label: 'Phase 1 Consolidation', href: '/kos-phase1-consolidation' }]} />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 border border-red-500">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-xs font-bold text-white">PHASE 1 ACTIVE — 8 URGENCES P0</span>
                  </span>
                  <span className="text-xs text-foreground-400">{data.daysRemaining} jours restants · Deadline 3 Juillet</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Phase 1 Consolidation Execution
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                  Exécution immédiate des <strong className="text-white">8 urgences P0</strong> identifiées par le scan intégral. Correction des vulnérabilités critiques, mise en conformité réglementaire, déblocage des processus bloquants.
                </p>
                <p className="mt-2 text-sm text-gray-400">Objectif : Score d'intégrité système <strong className="text-red-400">76 → 85</strong> d'ici le 3 Juillet 2026</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {[
                  { label: 'Progression', value: `${data.globalProgress}%`, icon: 'ri-timer-line', color: 'text-amber-400' },
                  { label: 'En Cours', value: `${data.inProgressUrgences}`, icon: 'ri-loader-4-line', color: 'text-amber-400' },
                  { label: 'Ouvertes', value: `${data.openUrgences}`, icon: 'ri-error-warning-line', color: 'text-red-400' },
                  { label: 'Actions', value: `${data.completedActions}/${data.totalActions}`, icon: 'ri-check-double-line', color: 'text-emerald-400' },
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
              <button onClick={handleLaunchExecution} className="flex items-center gap-2 px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-play-circle-line" />
                Lancer l'Exécution Phase 1
              </button>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 text-sm text-red-300 font-bold whitespace-nowrap">
                {data.criticalPathBlockers} Bloqueurs Chemin Critique
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-sm text-amber-300 whitespace-nowrap">
                Budget : {data.phase1Budget.total}
              </span>
            </div>
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
        {activeTab === 'urgences' && <UrgencesTab data={data} expandedUrgence={expandedUrgence} setExpandedUrgence={setExpandedUrgence} />}
        {activeTab === 'timeline' && <TimelineTab data={data} />}
        {activeTab === 'budget' && <BudgetTab data={data} />}
        {activeTab === 'log' && <ExecutionLogTab data={data} />}
      </div>

      {/* Commander's Intent Footer */}
      <section className="bg-red-950 border-t border-red-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
              <i className="ri-flag-line text-white text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-red-300 font-semibold uppercase tracking-wider">Commander's Intent — Phase 1</p>
              <p className="text-sm text-red-100 mt-0.5">{data.phase1Stats.commander_intent}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-lg font-bold text-white">{data.globalProgress}%</p>
              <p className="text-[10px] text-red-300">Progression Globale</p>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <i className="ri-checkbox-circle-line text-lg" />
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
    </KOSHubLayout>
  );
}

// ================================================================
// TAB 1 : COCKPIT
// ================================================================
function CockpitTab({ data }: { data: ReturnType<typeof usePhase1Consolidation> }) {
  return (
    <div className="space-y-10">
      {/* Commander's Intent + Progress */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-6">
            <h3 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-4">Progression Globale</h3>
            <div className="flex items-center gap-5">
              <div className="relative w-28 h-28 flex-shrink-0">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="var(--background-200)" strokeWidth="10" />
                  <circle cx="56" cy="56" r="48" fill="none" stroke="var(--red-500)" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(data.globalProgress / 100) * 301} 301`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-foreground-950">{data.globalProgress}%</span>
                  <span className="text-[10px] text-foreground-400">complété</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-foreground-500">Score actuel</span>
                  <span className="font-bold text-red-600">{data.phase1Stats.current_score}/100</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground-500">Score cible</span>
                  <span className="font-bold text-emerald-600">{data.phase1Stats.target_score_after}/100</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground-500">Jours restants</span>
                  <span className="font-bold text-amber-600">{data.daysRemaining} jours</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground-500">Budget engagé</span>
                  <span className="font-bold text-foreground-800">{data.budgetUtilizationPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
            <h3 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-4">Statut des 8 Urgences</h3>
            <div className="space-y-2.5">
              {data.phase1Urgences.map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${u.color}15` }}>
                    <i className={`${u.icon} text-sm`} style={{ color: u.color }} />
                  </div>
                  <span className="text-xs font-medium text-foreground-700 truncate flex-1">{u.urgency}</span>
                  <div className="w-24 h-2 bg-background-200 rounded-full overflow-hidden flex-shrink-0">
                    <div className={`h-full rounded-full transition-all duration-500 ${u.progress >= 50 ? 'bg-emerald-500' : u.progress >= 25 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${u.progress}%` }} />
                  </div>
                  <span className="text-[10px] font-bold w-8 text-right text-foreground-500">{u.progress}%</span>
                  <StatusBadge status={u.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Urgences Ouvertes', value: `${data.openUrgences}/8`, icon: 'ri-error-warning-line', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
            { label: 'En Cours', value: `${data.inProgressUrgences}/8`, icon: 'ri-loader-4-line', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Actions Complétées', value: `${data.completedActions}/${data.totalActions}`, icon: 'ri-check-double-line', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
            { label: 'Actions En Cours', value: `${data.inProgressActions}`, icon: 'ri-play-circle-line', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Bloqueurs Critiques', value: `${data.criticalPathBlockers}`, icon: 'ri-alert-line', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
            { label: 'Budget Restant', value: data.phase1Budget.remaining, icon: 'ri-money-dollar-circle-line', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-white/50">
                <i className={`${s.icon} ${s.color} text-sm`} />
              </div>
              <p className="text-xl font-bold text-foreground-950">{s.value}</p>
              <p className="text-[10px] text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Commander's Intent */}
      <ScrollReveal>
        <div className="bg-red-50/30 border border-red-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-red-800 mb-3 flex items-center gap-2">
            <i className="ri-flag-line" /> Commander's Intent — Phase 1
          </h3>
          <p className="text-sm text-red-700 leading-relaxed">{data.phase1Stats.commander_intent}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 2 : URGENCES P0
// ================================================================
function UrgencesTab({ data, expandedUrgence, setExpandedUrgence }: {
  data: ReturnType<typeof usePhase1Consolidation>;
  expandedUrgence: string | null;
  setExpandedUrgence: (id: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">8 Urgences P0 — Détail par Action</h2>
        <p className="text-sm text-foreground-500">{data.completedActions}/{data.totalActions} actions complétées · {data.inProgressUrgences} urgences en cours</p>
      </ScrollReveal>

      {data.phase1Urgences.map((urgence) => {
        const isExpanded = expandedUrgence === urgence.id;
        const completedActions = urgence.actions.filter(a => a.status === 'completed').length;

        return (
          <ScrollReveal key={urgence.id}>
            <div className={`rounded-2xl border-2 transition-all ${urgence.severity === 'critical' ? 'border-red-200 bg-red-50/10' : 'border-amber-200 bg-amber-50/10'}`}>
              {/* Header */}
              <button onClick={() => setExpandedUrgence(isExpanded ? null : urgence.id)}
                className="w-full flex items-start gap-4 p-5 text-left cursor-pointer">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${urgence.color}15` }}>
                  <i className={`${urgence.icon} text-xl`} style={{ color: urgence.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[9px] font-mono text-foreground-400">{urgence.id}</span>
                    <SeverityBadge severity={urgence.severity} />
                    <StatusBadge status={urgence.status} />
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">P0</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">{urgence.urgency}</h3>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{urgence.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] flex-wrap">
                    <span className="text-foreground-400"><i className="ri-user-line mr-1" />{urgence.responsible}</span>
                    <span className="text-foreground-400"><i className="ri-calendar-line mr-1" />{urgence.deadline}</span>
                    <span className="text-foreground-400"><i className="ri-time-line mr-1" />{urgence.effort}</span>
                    <span className="text-foreground-400"><i className="ri-money-dollar-circle-line mr-1" />{urgence.budget}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className={`text-2xl font-bold ${urgence.progress >= 50 ? 'text-emerald-600' : urgence.progress >= 25 ? 'text-amber-600' : 'text-red-600'}`}>
                    {urgence.progress}%
                  </div>
                  <div className="text-[10px] text-foreground-400">{completedActions}/{urgence.actions.length} actions</div>
                  <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm mt-1 block`} />
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-background-200">
                  {/* KPI + Bloque */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 mb-4">
                    <div className="p-3 rounded-xl bg-accent-50 border border-accent-200">
                      <p className="text-[10px] text-accent-500 font-semibold uppercase">KPI de Succès</p>
                      <p className="text-xs font-bold text-accent-800 mt-0.5">{urgence.kpi}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                      <p className="text-[10px] text-red-500 font-semibold uppercase">Bloque</p>
                      <p className="text-xs font-bold text-red-800 mt-0.5">{urgence.bloque}</p>
                    </div>
                  </div>

                  {/* Dépendances */}
                  {urgence.dependencies.length > 0 && (
                    <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-[10px] text-amber-600 font-semibold uppercase">Dépendances</p>
                      <p className="text-xs text-amber-800 mt-0.5">{urgence.dependencies.join(' → ')}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">
                    Plan d'Actions ({urgence.actions.length} étapes)
                  </h4>
                  <div className="space-y-2">
                    {urgence.actions.map((action, idx) => (
                      <div key={action.id} className={`p-3 rounded-xl border flex items-center gap-3 ${action.status === 'completed' ? 'bg-emerald-50/30 border-emerald-200' : action.status === 'in_progress' ? 'bg-amber-50/30 border-amber-200' : 'bg-background-100 border-background-200'}`}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${action.status === 'completed' ? 'bg-emerald-500 text-white' : action.status === 'in_progress' ? 'bg-amber-500 text-white' : 'bg-background-200 text-foreground-400'}`}>
                          {action.status === 'completed' ? <i className="ri-check-line text-xs" /> : idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium ${action.status === 'completed' ? 'text-emerald-800 line-through' : 'text-foreground-800'}`}>
                            {action.action}
                          </p>
                          <p className="text-[9px] text-foreground-400 mt-0.5">{action.owner} · {action.effort}</p>
                        </div>
                        <StatusBadge status={action.status} />
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
// TAB 3 : TIMELINE
// ================================================================
function TimelineTab({ data }: { data: ReturnType<typeof usePhase1Consolidation> }) {
  const tl = data.phase1Timeline;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Timeline — 2 Semaines d'Exécution</h2>
        <p className="text-sm text-foreground-500">{tl.start} → {tl.end} · {data.daysRemaining} jours restants</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tl.weeks.map((week, wi) => (
          <ScrollReveal key={wi}>
            <div className={`rounded-xl border-2 p-6 ${wi === 0 ? 'border-red-200 bg-red-50/10' : 'border-amber-200 bg-amber-50/10'}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${wi === 0 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {wi + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground-950">{week.label}</h3>
                  <p className="text-xs text-foreground-400">{week.start} → {week.end}</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {week.milestones.map((ms, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-foreground-700">
                    <i className="ri-checkbox-blank-circle-line text-foreground-300 flex-shrink-0" />
                    {ms}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* All urgencies deadlines */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Deadlines par Urgence</h3>
          <div className="space-y-3">
            {data.phase1Urgences.map((u) => {
              const deadlineDate = new Date(u.deadline);
              const now = new Date('2026-06-19');
              const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              const isUrgent = daysLeft <= 14;
              return (
                <div key={u.id} className="flex items-center gap-3 p-3 rounded-lg bg-background-100">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${u.color}15` }}>
                    <i className={`${u.icon} text-sm`} style={{ color: u.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground-800 truncate">{u.urgency}</p>
                    <p className="text-[9px] text-foreground-400">{u.responsible}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-xs font-bold ${isUrgent ? 'text-red-600' : 'text-foreground-600'}`}>{u.deadline}</p>
                    <p className={`text-[9px] ${isUrgent ? 'text-red-400' : 'text-foreground-400'}`}>{daysLeft} jours restants</p>
                  </div>
                  <StatusBadge status={u.status} />
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 4 : BUDGET
// ================================================================
function BudgetTab({ data }: { data: ReturnType<typeof usePhase1Consolidation> }) {
  const b = data.phase1Budget;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Budget Phase 1 — Allocation par Urgence</h2>
        <p className="text-sm text-foreground-500">Budget total : {b.total} · Dépensé : {b.spent} · Restant : {b.remaining}</p>
      </ScrollReveal>

      {/* Budget overview cards */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5 text-center">
            <p className="text-[10px] text-foreground-400 uppercase tracking-wider mb-2">Budget Total Phase 1</p>
            <p className="text-2xl font-bold text-foreground-950">{b.total}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
            <p className="text-[10px] text-amber-500 uppercase tracking-wider mb-2">Déjà Engagé</p>
            <p className="text-2xl font-bold text-amber-700">{b.spent}</p>
            <div className="mt-2 w-full h-2 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${data.budgetUtilizationPercent}%` }} />
            </div>
            <p className="text-[9px] text-amber-500 mt-1">{data.budgetUtilizationPercent}% utilisé</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
            <p className="text-[10px] text-emerald-500 uppercase tracking-wider mb-2">Budget Restant</p>
            <p className="text-2xl font-bold text-emerald-700">{b.remaining}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Breakdown table */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6 overflow-x-auto">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Ventilation par Urgence</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200">
                <th className="text-left py-2 text-foreground-500 font-semibold">Poste Budgétaire</th>
                <th className="text-right py-2 text-foreground-500 font-semibold w-36">Montant</th>
                <th className="text-center py-2 text-foreground-500 font-semibold w-24">Statut</th>
              </tr>
            </thead>
            <tbody>
              {b.breakdown.map((item, i) => (
                <tr key={i} className="border-b border-background-100">
                  <td className="py-2.5 text-foreground-700">{item.item}</td>
                  <td className="py-2.5 text-right font-bold text-foreground-800">{item.amount}</td>
                  <td className="py-2.5 text-center">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${item.status === 'allocated' ? 'bg-amber-100 text-amber-700' : 'bg-secondary-100 text-secondary-600'}`}>
                      {item.status === 'allocated' ? 'ALLOCATED' : 'RESERVED'}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-foreground-200">
                <td className="py-2.5 font-bold text-foreground-950">TOTAL</td>
                <td className="py-2.5 text-right font-bold text-foreground-950">{b.total}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 5 : LOG D'EXÉCUTION
// ================================================================
function ExecutionLogTab({ data }: { data: ReturnType<typeof usePhase1Consolidation> }) {
  const typeStyles: Record<string, string> = {
    milestone: 'bg-accent-100 text-accent-700 border-accent-200',
    action: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    budget: 'bg-amber-100 text-amber-700 border-amber-200',
    notification: 'bg-foreground-100 text-foreground-600 border-foreground-200',
  };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Journal d'Exécution — Phase 1</h2>
        <p className="text-sm text-foreground-500">Lancé le {data.phase1Stats.launched_at.split('T')[0]} à {data.phase1Stats.launched_at.split('T')[1].slice(0, 5)}</p>
      </ScrollReveal>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-background-200" />
        <div className="space-y-4">
          {data.phase1ExecutionLog.map((entry, i) => {
            const typeStyle = typeStyles[entry.type] || typeStyles.notification;
            return (
              <ScrollReveal key={i}>
                <div className="relative flex items-start gap-4 pl-2">
                  <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${typeStyle}`}>
                    <i className={`${entry.icon} text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-2">
                    <p className="text-xs text-foreground-400">
                      {entry.timestamp.split('T')[1].slice(0, 5)} — <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase ${typeStyle}`}>{entry.type}</span>
                    </p>
                    <p className="text-sm font-medium text-foreground-800 mt-0.5">{entry.event}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Pending actions summary */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6 mt-8">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Prochaines Actions au Log</h3>
          <div className="space-y-2">
            {data.phase1Urgences
              .flatMap(u => u.actions.filter(a => a.status !== 'completed').map(a => ({ ...a, urgenceName: u.urgency, urgenceColor: u.color })))
              .slice(0, 8)
              .map((action, i) => (
                <div key={action.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-100">
                  <span className="text-[10px] text-foreground-400 w-5 text-right">{i + 1}.</span>
                  <i className="ri-time-line text-foreground-300 text-xs" />
                  <span className="text-xs text-foreground-700 flex-1">{action.action}</span>
                  <span className="text-[9px] text-foreground-400 whitespace-nowrap">{action.effort}</span>
                </div>
              ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}