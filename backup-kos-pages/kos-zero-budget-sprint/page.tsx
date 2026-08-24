import { useState } from 'react';
import { useKOSZeroBudgetSprint } from '@/hooks/useKOSZeroBudgetSprint';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';
import { ZeroBudgetAction } from '@/mocks/zeroBudgetSprint';

const BUDGET_STATUS_COLORS: Record<string, string> = {
  zero_cost: 'bg-accent-100 text-accent-900',
  internal_effort: 'bg-secondary-100 text-secondary-900',
  blocked_budget: 'bg-red-100 text-red-900',
  creative_workaround: 'bg-amber-100 text-amber-900',
};

const BUDGET_STATUS_LABELS: Record<string, string> = {
  zero_cost: '0 FCFA',
  internal_effort: 'Effort Interne',
  blocked_budget: 'Bloqué Budget',
  creative_workaround: 'Contournement',
};

const EXECUTION_STATUS_COLORS: Record<string, string> = {
  executed: 'bg-accent-100 text-accent-900',
  in_progress: 'bg-secondary-100 text-secondary-900',
  pending: 'bg-background-200 text-foreground-700',
  blocked: 'bg-red-100 text-red-900',
};

const EXECUTION_STATUS_LABELS: Record<string, string> = {
  executed: 'Exécuté',
  in_progress: 'En Cours',
  pending: 'En Attente',
  blocked: 'Bloqué',
};

const CATEGORY_ICONS: Record<string, string> = {
  security: 'ri-shield-flash-line',
  compliance: 'ri-scales-3-line',
  performance: 'ri-speed-line',
  data: 'ri-bar-chart-box-line',
  growth: 'ri-rocket-line',
  quality: 'ri-verified-badge-line',
  code: 'ri-code-s-slash-line',
  infrastructure: 'ri-cpu-line',
};

export default function zeroBudgetSprintPage() {
  const {
    meta, kpis, filteredActions,
    budgetFilter, setBudgetFilter,
    statusFilter, setStatusFilter,
    categoryFilter, setCategoryFilter,
  } = useKOSZeroBudgetSprint();

  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'executed') return 'bg-accent-500';
    if (status === 'blocked') return 'bg-red-500';
    if (progress >= 70) return 'bg-secondary-500';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-foreground-400';
  };

  const getStatusDot = (status: string) => {
    if (status === 'executed') return 'bg-accent-500';
    if (status === 'in_progress') return 'bg-secondary-500 animate-pulse';
    if (status === 'blocked') return 'bg-red-500';
    return 'bg-foreground-400';
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-background-100 to-background-50 border-b border-background-200/70">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center">
                <i className="ri-flashlight-line text-2xl text-background-50"></i>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground-950">
                  Sprint Zéro Budget — Exécution Immédiate
                </h1>
                <p className="text-sm text-foreground-600">
                  {meta.mandate} · {meta.philosophy.split('.')[0]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-accent-50 rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-bold text-accent-500">
                  {meta.totalBudgetAvoided}
                </div>
                <div className="text-xs text-foreground-600">Budget Évité</div>
              </div>
              <div className="bg-primary-50 rounded-xl px-4 py-3 text-center">
                <div className="text-xl font-bold text-primary-500">
                  {meta.totalValueCreated.split('(')[0].trim()}
                </div>
                <div className="text-xs text-foreground-600">Valeur Créée (estimée)</div>
              </div>
            </div>
          </div>

          {/* KPIs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mt-6">
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-2xl font-bold text-foreground-950">{kpis.totalActions}</div>
              <div className="text-xs text-foreground-600 mt-1">Actions</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-2xl font-bold text-accent-500">{kpis.executed}</div>
              <div className="text-xs text-foreground-600 mt-1">Exécutées</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-2xl font-bold text-secondary-500">{kpis.inProgress}</div>
              <div className="text-xs text-foreground-600 mt-1">En Cours</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{kpis.actionsBlockedBudget}</div>
              <div className="text-xs text-foreground-600 mt-1">Bloquées Budget</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{kpis.actionsCreativeWorkaround}</div>
              <div className="text-xs text-foreground-600 mt-1">Contournées</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-2xl font-bold text-accent-500">{kpis.actionsZeroCost}</div>
              <div className="text-xs text-foreground-600 mt-1">0 FCFA Natif</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-2xl font-bold text-foreground-950">
                <AnimatedCounter value={kpis.globalImpactScore} />
              </div>
              <div className="text-xs text-foreground-600 mt-1">Impact Global /100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-background-200/70 bg-background-50 sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Status Filter */}
            <div className="flex gap-1 flex-wrap">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'executed', label: 'Exécutés' },
                { id: 'in_progress', label: 'En Cours' },
                { id: 'blocked', label: 'Bloqués' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id as typeof statusFilter)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    statusFilter === f.id
                      ? 'bg-primary-500 text-background-50'
                      : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {/* Budget Filter */}
            <div className="flex gap-1 flex-wrap">
              {[
                { id: 'all', label: 'Tout Budget' },
                { id: 'zero_cost', label: '0 FCFA' },
                { id: 'internal_effort', label: 'Effort Interne' },
                { id: 'creative_workaround', label: 'Contournement' },
                { id: 'blocked_budget', label: 'Bloqué Budget' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setBudgetFilter(f.id as typeof budgetFilter)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    budgetFilter === f.id
                      ? 'bg-accent-500 text-background-50'
                      : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions Timeline */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
        {/* Sprint Progress Bar */}
        <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground-950">Progression Globale du Sprint</h3>
            <span className="text-sm font-bold text-accent-500">
              {kpis.executed}/{kpis.totalActions} exécutées · {kpis.totalTimeSpent}/{kpis.totalTimeEstimated}
            </span>
          </div>
          <div className="h-3 bg-background-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-secondary-500 transition-all"
              style={{ width: `${Math.round((kpis.executed / kpis.totalActions) * 100 + (kpis.inProgress / kpis.totalActions) * 50)}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-3 text-xs text-foreground-600">
            <span>Début: 23 Juin 06:00</span>
            <span className="text-secondary-500 font-medium">{kpis.actionsCreativeWorkaround} contournements créatifs</span>
            <span>Cible: 27 Juin 18:00</span>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-4">
          {filteredActions.map((action, idx) => (
            <div
              key={action.id}
              className="bg-background-50 rounded-2xl border border-background-200/70 overflow-hidden hover:border-background-300/60 transition-all"
            >
              <button
                onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-background-100/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Number */}
                  <div className="w-10 h-10 rounded-xl bg-background-100 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-foreground-700">#{idx + 1}</span>
                  </div>

                  {/* Category Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: action.category === 'security' ? '#fef2f2' : action.category === 'compliance' ? '#fefce8' : action.category === 'growth' ? '#f0fdf4' : '#f8fafc' }}>
                    <i className={`${CATEGORY_ICONS[action.category] || 'ri-settings-3-line'} text-lg text-foreground-700`}></i>
                  </div>

                  {/* Title + Meta */}
                  <div className="text-left min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground-950">{action.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${BUDGET_STATUS_COLORS[action.budgetStatus]}`}>
                        {BUDGET_STATUS_LABELS[action.budgetStatus]}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${EXECUTION_STATUS_COLORS[action.executionStatus]}`}>
                        {EXECUTION_STATUS_LABELS[action.executionStatus]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-foreground-600 flex-wrap">
                      <span>{action.block}</span>
                      <span>·</span>
                      <span>Budget initial: {action.originalBudget}</span>
                      <span>·</span>
                      <span>{action.timeSpent} / {action.timeEstimate}</span>
                    </div>
                  </div>
                </div>

                {/* Progress + Status Dot */}
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-24 h-2 bg-background-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getProgressColor(action.progress, action.executionStatus)}`}
                        style={{ width: `${action.progress}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-bold ${action.executionStatus === 'executed' ? 'text-accent-500' : action.executionStatus === 'blocked' ? 'text-red-600' : 'text-foreground-950'}`}>
                      {action.progress}%
                    </span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusDot(action.executionStatus)}`}></div>
                  <i className={`ri-${expandedAction === action.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-600`}></i>
                </div>
              </button>

              {/* Expanded Detail */}
              {expandedAction === action.id && (
                <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                  {/* Budget Strategy */}
                  <div className="bg-background-100/50 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center shrink-0 mt-0.5">
                        <i className="ri-lightbulb-line text-accent-500"></i>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground-950 mb-1">Stratégie Zéro Budget</div>
                        <div className="text-sm text-foreground-700">{action.workaround}</div>
                      </div>
                    </div>
                  </div>

                  {/* Breakthrough */}
                  {action.breakthrough && (
                    <div className="bg-accent-50 rounded-xl p-4 mb-4 border border-accent-200/50">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center shrink-0 mt-0.5">
                          <i className="ri-star-line text-background-50"></i>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-accent-500 mb-1">Percée</div>
                          <div className="text-sm text-foreground-700">{action.breakthrough}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* KPIs Before/After/Actual */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-background-100/50 rounded-xl p-3">
                      <div className="text-xs text-foreground-600 mb-1">Avant</div>
                      <div className="text-sm font-medium text-red-600">{action.kpiBefore}</div>
                    </div>
                    <div className="bg-background-100/50 rounded-xl p-3">
                      <div className="text-xs text-foreground-600 mb-1">Cible</div>
                      <div className="text-sm font-medium text-accent-500">{action.kpiAfter}</div>
                    </div>
                    <div className="bg-background-100/50 rounded-xl p-3">
                      <div className="text-xs text-foreground-600 mb-1">Actuel</div>
                      <div className="text-sm font-medium text-foreground-950">{action.actualKpi}</div>
                    </div>
                  </div>

                  {/* Constraints */}
                  {action.constraints.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-foreground-950 mb-2">Contraintes</div>
                      <div className="flex flex-wrap gap-2">
                        {action.constraints.map((c, i) => (
                          <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200/50">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meta Footer */}
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-foreground-600 pt-2 border-t border-background-200/70">
                    <span>Assigné: <span className="font-medium text-foreground-950">{action.assigned}</span></span>
                    <span>Démarré: <span className="font-medium text-foreground-950">{new Date(action.startedAt).toLocaleString('fr-FR')}</span></span>
                    <span>Complétion estimée: <span className="font-medium text-foreground-950">{new Date(action.estimatedCompletion).toLocaleString('fr-FR')}</span></span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredActions.length === 0 && (
          <div className="text-center py-20">
            <i className="ri-inbox-line text-5xl text-foreground-400"></i>
            <p className="text-foreground-600 mt-4">Aucune action ne correspond aux filtres</p>
          </div>
        )}

        {/* Summary Footer */}
        <div className="mt-12 pt-6 border-t border-background-200/70">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-accent-50 rounded-xl p-4">
              <div className="text-xs text-foreground-600 mb-1">Budget Total Évité</div>
              <div className="text-xl font-bold text-accent-500">{meta.totalBudgetAvoided}</div>
            </div>
            <div className="bg-primary-50 rounded-xl p-4">
              <div className="text-xs text-foreground-600 mb-1">Valeur Créée Estimée</div>
              <div className="text-xl font-bold text-primary-500">{meta.totalValueCreated}</div>
            </div>
            <div className="bg-secondary-50 rounded-xl p-4">
              <div className="text-xs text-foreground-600 mb-1">Temps Total Investi</div>
              <div className="text-xl font-bold text-foreground-950">{kpis.totalTimeSpent}</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-xs text-foreground-600 mb-1">Mandat</div>
              <div className="text-sm font-bold text-foreground-950">{kpis.mandateRef}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





