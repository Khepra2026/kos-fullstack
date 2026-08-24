import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useKOSBudgetUnleashedSprint } from '@/hooks/useKOSBudgetUnleashedSprint';
import type { BudgetUnleashedAction } from '@/mocks/budgetUnleashedSprint';
import { BUDGET_UNLEASHED_ACTIONS } from '@/mocks/budgetUnleashedSprint';

const categoryLabels: Record<string, string> = {
  security: 'Sécurité',
  compliance: 'Conformité',
  performance: 'Performance',
  quality: 'Qualité',
  infrastructure: 'Infrastructure',
  growth: 'Croissance',
  data: 'Data',
  code: 'Code',
};

const statusLabels: Record<string, string> = {
  executed: 'Exécutée',
  in_progress: 'En cours',
  pending: 'En attente',
  validating: 'En validation',
  blocked_budget: 'Budget bloqué',
  pending_approval: 'Approbation COMEX',
  waiting_comex: 'En attente COMEX',
};

const previousStatusLabels: Record<string, string> = {
  blocked_budget: 'Bloquée budget',
  pending_approval: 'Approbation en attente',
  waiting_comex: 'En attente COMEX',
};

function ActionCard({ action, isExpanded, onToggle, onDetail }: {
  action: BudgetUnleashedAction;
  isExpanded: boolean;
  onToggle: () => void;
  onDetail: () => void;
}) {
  const progressColor = action.executionStatus === 'executed'
    ? 'bg-emerald-500'
    : action.executionStatus === 'in_progress'
      ? 'bg-amber-500'
      : 'bg-slate-300';

  return (
    <div className="rounded-xl border border-background-200/70 bg-background-50 p-5 transition-all hover:border-background-300/60">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            action.executionStatus === 'executed' ? 'bg-emerald-100 text-emerald-700' :
            action.executionStatus === 'in_progress' ? 'bg-amber-100 text-amber-700' :
            'bg-slate-100 text-slate-500'
          }`}>
            <i className={`${action.icon} text-lg`}></i>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-semibold text-accent-500 bg-accent-100/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                {action.id}
              </span>
              <span className="text-xs text-foreground-600 bg-background-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                {categoryLabels[action.category] || action.category}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-foreground-950 leading-snug">{action.title}</h3>
            <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-foreground-600">
              <span className="flex items-center gap-1">
                <i className="ri-time-line"></i>
                {action.timeSpent} / {action.timeEstimate}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-funds-line"></i>
                {action.allocatedBudget}
              </span>
              <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-[11px] font-medium whitespace-nowrap">
                Était : {previousStatusLabels[action.previousStatus]}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
            action.executionStatus === 'executed' ? 'bg-emerald-100 text-emerald-700' :
            action.executionStatus === 'in_progress' ? 'bg-amber-100 text-amber-700' :
            'bg-slate-100 text-slate-600'
          }`}>
            {statusLabels[action.executionStatus]}
          </span>
          <span className="text-sm font-bold text-foreground-950 w-10 text-right">{action.progress}%</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
            style={{ width: `${action.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {action.automatesInvolved.slice(0, 3).map(automate => (
            <span key={automate} className="text-[10px] bg-secondary-100 text-secondary-900 px-1.5 py-0.5 rounded whitespace-nowrap">
              <i className="ri-cpu-line mr-0.5"></i>{automate.split('-').slice(2, 4).join(' ')}
            </span>
          ))}
          {action.automatesInvolved.length > 3 && (
            <span className="text-[10px] text-foreground-600">+{action.automatesInvolved.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggle}
            className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors px-2 py-1 rounded-md hover:bg-background-100 whitespace-nowrap"
          >
            {isExpanded ? <i className="ri-arrow-up-s-line mr-1"></i> : <i className="ri-arrow-down-s-line mr-1"></i>}
            {isExpanded ? 'Masquer' : 'Détails'}
          </button>
          <button
            onClick={onDetail}
            className="text-xs text-primary-500 hover:text-primary-700 transition-colors px-2 py-1 rounded-md hover:bg-primary-50 whitespace-nowrap"
          >
            <i className="ri-eye-line mr-1"></i>
            Zoom
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-background-200/70 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-foreground-600 uppercase tracking-wide mb-1">Déclencheur</p>
              <p className="text-xs text-foreground-950">{action.unlockTrigger}</p>
            </div>
            <div>
              <p className="text-[11px] text-foreground-600 uppercase tracking-wide mb-1">Impact</p>
              <p className="text-xs text-foreground-950">{action.impact}</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-foreground-600 uppercase tracking-wide mb-1.5">Jalons</p>
            <div className="space-y-2">
              {action.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${m.done ? 'bg-emerald-500' : 'bg-background-300/60'}`}></div>
                  <span className={`text-xs ${m.done ? 'text-foreground-950 font-medium' : 'text-foreground-600'}`}>
                    {m.label}
                  </span>
                  {m.done && (
                    <span className="text-[10px] text-emerald-600 ml-auto whitespace-nowrap">
                      {new Date(m.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                  {!m.done && (
                    <span className="text-[10px] text-foreground-500 ml-auto whitespace-nowrap">
                      ~{new Date(m.timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] text-foreground-600 uppercase tracking-wide mb-1.5">Équipe mobilisée</p>
            <div className="flex flex-wrap gap-1.5">
              {action.agentsInvolved.map(agent => (
                <span key={agent} className="text-[10px] bg-background-100 text-foreground-700 px-2 py-1 rounded-full whitespace-nowrap">
                  <i className="ri-user-line mr-1"></i>{agent}
                </span>
              ))}
              {action.externalPartners.map(partner => (
                <span key={partner} className="text-[10px] bg-accent-100/80 text-accent-900 px-2 py-1 rounded-full whitespace-nowrap">
                  <i className="ri-building-line mr-1"></i>{partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailModal({ action, onClose }: { action: BudgetUnleashedAction; onClose: () => void }) {
  if (!action) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-background-50 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              action.executionStatus === 'executed' ? 'bg-emerald-100 text-emerald-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              <i className={`${action.icon} text-lg`}></i>
            </div>
            <div>
              <span className="text-xs font-semibold text-accent-500">{action.id}</span>
              <h2 className="text-base font-bold text-foreground-950">{action.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 transition-colors">
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-background-100 rounded-xl p-3 text-center">
              <p className="text-[10px] text-foreground-600 uppercase">Progrès</p>
              <p className="text-2xl font-bold text-foreground-950">{action.progress}%</p>
            </div>
            <div className="bg-background-100 rounded-xl p-3 text-center">
              <p className="text-[10px] text-foreground-600 uppercase">Budget</p>
              <p className="text-sm font-bold text-foreground-950">{action.allocatedBudget}</p>
            </div>
            <div className="bg-background-100 rounded-xl p-3 text-center">
              <p className="text-[10px] text-foreground-600 uppercase">Temps passé</p>
              <p className="text-sm font-bold text-foreground-950">{action.timeSpent}</p>
            </div>
            <div className="bg-background-100 rounded-xl p-3 text-center">
              <p className="text-[10px] text-foreground-600 uppercase">Statut</p>
              <p className={`text-sm font-bold ${action.executionStatus === 'executed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {statusLabels[action.executionStatus]}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-2">KPI — Avant / Après</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-[10px] text-red-600 uppercase mb-0.5">Avant</p>
                <p className="text-xs text-red-800">{action.kpiBefore}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="text-[10px] text-emerald-600 uppercase mb-0.5">Cible</p>
                <p className="text-xs text-emerald-800">{action.kpiAfter}</p>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mt-2">
              <p className="text-[10px] text-amber-600 uppercase mb-0.5">Actuel</p>
              <p className="text-xs text-amber-800">{action.actualKpi}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-2">Jalons</h3>
            <div className="space-y-2">
              {action.milestones.map((m, i) => (
                <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg ${m.done ? 'bg-emerald-50' : 'bg-background-100'}`}>
                  <div className={`w-3 h-3 rounded-full shrink-0 ${m.done ? 'bg-emerald-500' : 'bg-background-300/60'}`}></div>
                  <span className={`text-sm flex-1 ${m.done ? 'text-foreground-950 font-medium' : 'text-foreground-600'}`}>
                    {m.label}
                  </span>
                  <span className="text-xs text-foreground-500">
                    {new Date(m.timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-2">Automates KOS déployés</h3>
              <div className="flex flex-wrap gap-1.5">
                {action.automatesInvolved.map(a => (
                  <span key={a} className="text-[10px] bg-secondary-100 text-secondary-900 px-2 py-1 rounded whitespace-nowrap">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-2">Agents & Partenaires</h3>
              <div className="flex flex-wrap gap-1.5">
                {action.agentsInvolved.map(a => (
                  <span key={a} className="text-[10px] bg-background-200/70 text-foreground-700 px-2 py-1 rounded-full whitespace-nowrap">
                    {a}
                  </span>
                ))}
                {action.externalPartners.map(p => (
                  <span key={p} className="text-[10px] bg-accent-100/80 text-accent-900 px-2 py-1 rounded-full whitespace-nowrap">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function budgetUnleashedSprintPage() {
  const {
    actions,
    kpis,
    meta,
    statusFilter,
    setStatusFilter,
    expandedActionId,
    toggleExpand,
    selectedAction,
    openDetail,
    closeDetail,
    statusCounts,
  } = useKOSBudgetUnleashedSprint();

  const [activeTab, setActiveTab] = useState<'cockpit' | 'timeline'>('cockpit');

  const filterTabs: { key: typeof statusFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Toutes', count: statusCounts.all },
    { key: 'in_progress', label: 'En cours', count: statusCounts.in_progress },
    { key: 'executed', label: 'Exécutées', count: statusCounts.executed },
    { key: 'validating', label: 'En validation', count: statusCounts.validating },
  ];

  return (
    <div className="min-h-screen bg-background-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=Dynamic%20abstract%20geometric%20pattern%20with%20flowing%20green%20and%20teal%20gradient%20waves%2C%20modern%20corporate%20technology%20background%2C%20smooth%20curves%2C%20luminous%20highlights%2C%20professional%20financial%20tech%20aesthetic%2C%20clean%20minimal%20design&width=1600&height=400&seq=kos-budget-unleashed-bg&orientation=landscape')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-14">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/kos-dashboard" className="text-white/70 hover:text-white text-xs transition-colors flex items-center gap-1">
              <i className="ri-arrow-left-line"></i> KOS Dashboard
            </Link>
            <span className="text-white/40">/</span>
            <Link to="/kos-zero-budget-sprint" className="text-white/70 hover:text-white text-xs transition-colors">
              Sprint 1
            </Link>
            <span className="text-white/40">/</span>
            <Link to="/kos-zero-budget-sprint-2" className="text-white/70 hover:text-white text-xs transition-colors">
              Sprint 2
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white text-xs font-semibold">Budget Unleashed</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">HUB 105</span>
                <span className="text-xs bg-emerald-400/30 text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">
                  <i className="ri-flashlight-line mr-1"></i>BUDGET DÉBLOQUÉ
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Sprint Budget Unleashed
              </h1>
              <p className="text-sm text-white/80 max-w-2xl">
                Toutes les actions précédemment bloquées par absence de budget sont maintenant exécutées.
                Décision COMEX extraordinaire du 23 Juin 2026 — 11h00.
              </p>
            </div>
            <div className="flex items-center gap-3 text-white/90 text-xs">
              <span className="bg-white/15 px-3 py-1.5 rounded-full whitespace-nowrap">
                <i className="ri-calendar-line mr-1"></i>23 Juin 2026
              </span>
              <span className="bg-white/15 px-3 py-1.5 rounded-full whitespace-nowrap">
                <i className="ri-file-text-line mr-1"></i>{meta.comexDecisionRef}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs Banner */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
            <p className="text-[10px] text-foreground-600 uppercase mb-0.5">Actions</p>
            <p className="text-2xl font-bold text-foreground-950">{kpis.totalActions}</p>
            <p className="text-[10px] text-foreground-500">débloquées</p>
          </div>
          <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
            <p className="text-[10px] text-foreground-600 uppercase mb-0.5">Budget</p>
            <p className="text-base font-bold text-foreground-950">{kpis.totalBudgetAllocated}</p>
            <p className="text-[10px] text-emerald-600">alloué</p>
          </div>
          <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
            <p className="text-[10px] text-foreground-600 uppercase mb-0.5">En cours</p>
            <p className="text-2xl font-bold text-amber-600">{kpis.inProgress}</p>
            <p className="text-[10px] text-foreground-500">actions</p>
          </div>
          <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
            <p className="text-[10px] text-foreground-600 uppercase mb-0.5">Automates</p>
            <p className="text-2xl font-bold text-foreground-950">{kpis.automatesDeployed}</p>
            <p className="text-[10px] text-foreground-500">déployés</p>
          </div>
          <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
            <p className="text-[10px] text-foreground-600 uppercase mb-0.5">Agents</p>
            <p className="text-2xl font-bold text-foreground-950">{kpis.agentsActivated}</p>
            <p className="text-[10px] text-foreground-500">activés</p>
          </div>
          <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
            <p className="text-[10px] text-foreground-600 uppercase mb-0.5">Partenaires</p>
            <p className="text-2xl font-bold text-accent-500">{kpis.externalPartnersEngaged}</p>
            <p className="text-[10px] text-foreground-500">externes</p>
          </div>
          <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
            <p className="text-[10px] text-foreground-600 uppercase mb-0.5">Impact</p>
            <p className="text-2xl font-bold text-emerald-600">{kpis.globalImpactScore}/100</p>
            <p className="text-[10px] text-foreground-500">score</p>
          </div>
          <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
            <p className="text-[10px] text-foreground-600 uppercase mb-0.5">Valeur créée</p>
            <p className="text-sm font-bold text-foreground-950">~985M FCFA</p>
            <p className="text-[10px] text-foreground-500">estimée</p>
          </div>
        </div>
      </div>

      {/* Bilan Sprint 1+2 vs Budget Unleashed */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="rounded-xl border border-background-200/70 bg-background-50 p-5">
          <h3 className="text-sm font-semibold text-foreground-950 mb-4">
            <i className="ri-scales-line mr-2 text-accent-500"></i>
            Bilan Combiné — Sprints Zéro Budget + Budget Unleashed
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] text-foreground-600 uppercase">Sprints Zéro Budget</p>
              <p className="text-2xl font-bold text-emerald-600">{meta.combinedSprint1And2BudgetAvoided}</p>
              <p className="text-[10px] text-emerald-600">budget ÉVITÉ (S1+S2)</p>
            </div>
            <div>
              <p className="text-[10px] text-foreground-600 uppercase">Budget Unleashed</p>
              <p className="text-2xl font-bold text-accent-500">{meta.budgetNowInvested}</p>
              <p className="text-[10px] text-accent-600">budget INVESTI</p>
            </div>
            <div>
              <p className="text-[10px] text-foreground-600 uppercase">Total Sprint 1+2</p>
              <p className="text-2xl font-bold text-foreground-950">~1 070M FCFA</p>
              <p className="text-[10px] text-foreground-500">valeur créée (0 FCFA)</p>
            </div>
            <div>
              <p className="text-[10px] text-foreground-600 uppercase">Total Unleashed</p>
              <p className="text-2xl font-bold text-foreground-950">~985M FCFA</p>
              <p className="text-[10px] text-foreground-500">valeur créée (38,5M investis)</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200/60">
            <p className="text-xs text-amber-800">
              <i className="ri-lightbulb-line mr-1"></i>
              <strong>ROI combiné :</strong> 79M FCFA évités + 38,5M investis = <strong>2 055M FCFA de valeur créée</strong>.
              Ratio valeur/budget = <strong>53x</strong>. Un euro investi génère 53 euros de valeur.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex items-center justify-between">
          <div className="inline-flex rounded-full bg-background-100 p-1">
            <button
              onClick={() => setActiveTab('cockpit')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'cockpit' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-950'
              }`}
            >
              <i className="ri-dashboard-line mr-1.5"></i>Cockpit
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'timeline' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-950'
              }`}
            >
              <i className="ri-timeline-view mr-1.5"></i>Timeline
            </button>
          </div>
          <span className="text-xs text-foreground-500">
            Dernière mise à jour : aujourd'hui, {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                statusFilter === tab.key
                  ? 'bg-foreground-950 text-background-50 font-semibold'
                  : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'
              }`}
            >
              {tab.label}
              <span className="ml-1 opacity-60">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions Grid or Timeline */}
      <div className="max-w-7xl mx-auto px-6 mt-5 pb-16">
        {activeTab === 'cockpit' ? (
          <div className="space-y-3">
            {actions.length === 0 ? (
              <div className="text-center py-16 text-foreground-500">
                <i className="ri-inbox-line text-4xl mb-3 block"></i>
                <p className="text-sm">Aucune action trouvée avec ces filtres</p>
              </div>
            ) : (
              actions.map(action => (
                <ActionCard
                  key={action.id}
                  action={action}
                  isExpanded={expandedActionId === action.id}
                  onToggle={() => toggleExpand(action.id)}
                  onDetail={() => openDetail(action)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-background-200/70"></div>
            <div className="space-y-8 ml-12">
              {/* Événement COMEX */}
              <div className="relative">
                <div className="absolute -left-[3.15rem] top-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center ring-4 ring-background-50">
                  <i className="ri-check-line text-white text-xs"></i>
                </div>
                <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-4">
                  <span className="text-[10px] text-emerald-600 font-semibold uppercase">11h00 — Décision COMEX</span>
                  <h4 className="text-sm font-bold text-emerald-900 mt-1">Déblocage immédiat de tous les budgets d'optimisation</h4>
                  <p className="text-xs text-emerald-700 mt-1">Réunion extraordinaire du COMEX. 38,5M FCFA alloués pour exécuter toutes les actions bloquées.</p>
                </div>
              </div>

              {BUDGET_UNLEASHED_ACTIONS.flatMap(action =>
                action.milestones.filter(m => m.done).map((m, i) => (
                  <div key={`${action.id}-${i}`} className="relative">
                    <div className="absolute -left-[3.15rem] top-1 w-6 h-6 rounded-full bg-foreground-950 flex items-center justify-center ring-4 ring-background-50">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <div className="bg-background-100 rounded-xl p-4">
                      <span className="text-[10px] text-foreground-500">
                        {new Date(m.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-[10px] text-accent-500 font-semibold ml-2">{action.id}</span>
                      <h4 className="text-sm font-semibold text-foreground-950 mt-1">{m.label}</h4>
                      <p className="text-xs text-foreground-600 mt-0.5 line-clamp-1">{action.title}</p>
                    </div>
                  </div>
                ))
              )}

              {/* Prochains jalons */}
              {BUDGET_UNLEASHED_ACTIONS.flatMap(action =>
                action.milestones.filter(m => !m.done).slice(0, 2).map((m, i) => (
                  <div key={`${action.id}-pending-${i}`} className="relative">
                    <div className="absolute -left-[3.15rem] top-1 w-6 h-6 rounded-full bg-background-300/60 flex items-center justify-center ring-4 ring-background-50">
                      <div className="w-2 h-2 rounded-full bg-background-500"></div>
                    </div>
                    <div className="bg-background-50 border border-dashed border-background-300/60 rounded-xl p-4">
                      <span className="text-[10px] text-foreground-500">
                        ~{new Date(m.timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className="text-[10px] text-accent-500 font-semibold ml-2">{action.id}</span>
                      <h4 className="text-sm font-medium text-foreground-700 mt-1">{m.label}</h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {selectedAction && (
        <DetailModal action={selectedAction} onClose={closeDetail} />
      )}
    </div>
  );
}



