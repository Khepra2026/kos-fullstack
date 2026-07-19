import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useCorrectiveActionBlocks } from '@/hooks/useCorrectiveActionBlocks';
import type { CorrectiveActionBlock, BlockAction, BlockKPI, BlockReference } from '@/mocks/correctiveActionBlocks';
import MassCorrectiveActions from '';

function CircularGauge({ value, size = 40, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const strokeClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : color === 'emerald' ? 'stroke-emerald-500' : color === 'amber' ? 'stroke-amber-500' : color === 'red' ? 'stroke-red-500' : 'stroke-primary-500';
  const textClass = color === 'accent' ? 'text-accent-700' : color === 'secondary' ? 'text-secondary-700' : color === 'emerald' ? 'text-emerald-700' : color === 'amber' ? 'text-amber-700' : color === 'red' ? 'text-red-700' : 'text-primary-700';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${strokeClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className={`absolute text-[10px] font-bold ${textClass}`}>{value}</span>
    </div>
  );
}

function ProgressBar({ value, color = 'primary', size = 'sm' }: { value: number; color?: string; size?: 'sm' | 'md' }) {
  const h = size === 'md' ? 'h-3' : 'h-2';
  const bgClass = color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : color === 'red' ? 'bg-red-500' : color === 'accent' ? 'bg-accent-500' : color === 'secondary' ? 'bg-secondary-500' : 'bg-primary-500';
  return (
    <div className={`w-full ${h} bg-background-200 rounded-full overflow-hidden`}>
      <div className={`${h} ${bgClass} rounded-full transition-all duration-500`} style={{ width: `${Math.min(value, 100)}%` }}></div>
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    P0: 'bg-red-100 text-red-700 border-red-200',
    P1: 'bg-amber-100 text-amber-700 border-amber-200',
    P2: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    critique: 'bg-red-100 text-red-700 border-red-200',
    en_cours: 'bg-amber-100 text-amber-700 border-amber-200',
    progresse: 'bg-accent-100 text-accent-700 border-accent-200',
    maitrise: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    en_attente: 'bg-background-200 text-foreground-500 border-background-200',
    termine: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Big Four': 'bg-primary-100 text-primary-700 border-primary-200',
    'ISO': 'bg-accent-100 text-accent-700 border-accent-200',
    'Think Tank': 'bg-secondary-100 text-secondary-700 border-secondary-200',
    'Observatoire': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'NIST': 'bg-amber-100 text-amber-700 border-amber-200',
    'GAFI': 'bg-red-100 text-red-700 border-red-200',
    'OWASP': 'bg-red-100 text-red-700 border-red-200',
    'COSO': 'bg-accent-100 text-accent-700 border-accent-200',
    default: 'bg-background-200 text-foreground-600 border-background-200',
  };
  const classes = bgMap[variant] || bgMap.default;
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap font-medium ${classes}`}>{label}</span>;
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'emerald';
  if (score >= 75) return 'accent';
  if (score >= 55) return 'amber';
  return 'red';
}

export default function correctiveActionBlocksPage() {
  const {
    filteredBlocs, allBlockActions, meta, kpis,
    activeTab, setActiveTab, activeBloc, setActiveBlocId, navigateToBloc,
    blocFilter, setBlocFilter, sortMode, setSortMode,
    expandedActions, toggleActionExpanded,
    loading, error, refetch,
  } = useCorrectiveActionBlocks();

  const [showOnlyP0, setShowOnlyP0] = useState(false);

  const displayedActions = showOnlyP0
    ? allBlockActions.filter(a => a.priorite === 'P0')
    : allBlockActions;

  if (loading) {
    return (
      <hubLayout hubId={84} activeTab="dashboard" tabLabel="Blocs Correctifs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Optimisation des blocs d'actions correctives...</span>
            </div>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && filteredBlocs.length === 0) {
    return (
      <hubLayout hubId={84} activeTab="dashboard" tabLabel="Blocs Correctifs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réexécuter</button>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={84} activeTab={activeTab === 'bloc' ? 'bloc' : activeTab} tabLabel="Blocs Correctifs">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">
              Issu de {meta.auditId}
            </span>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>EXÉCUTION IMMÉDIATE
            </span>
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium">{meta.totalBlocks} Blocs Optimisés</span>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">{meta.totalActions} Actions</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">
            Blocs d'Actions Correctives — Exécution Immédiate
          </h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            <strong>{meta.totalBlocks} blocs stratégiques</strong> optimisés issus de l'Enterprise Transformation Assessment 360°. Chaque bloc est calibré aux standards <strong>Big Four · ISO · Think Tank · Observatoires Internationaux</strong>. <strong>{kpis.actions_p0} actions P0</strong> critiques, <strong>{kpis.actions_p1} actions P1</strong> prioritaires, <strong>{kpis.actions_p2} actions P2</strong> stratégiques. Budget total : <strong className="text-primary-700">{meta.budgetTotal}</strong>.
          </p>
        </div>

        {/* ===== DASHBOARD ===== */}
        {activeTab === 'dashboard' && (
          <>
            {/* Global KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-2xl font-bold text-foreground-950">{kpis.blocs_total}</span>
                <p className="text-[10px] text-foreground-500">Blocs</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-2xl font-bold text-foreground-950">{kpis.actions_total}</span>
                <p className="text-[10px] text-foreground-500">Actions</p>
              </div>
              <div className="bg-red-50 border border-red-200/40 rounded-lg p-3 text-center">
                <span className="text-xl font-bold text-red-600">{kpis.actions_p0}</span>
                <p className="text-[9px] text-foreground-500">Actions P0</p>
                <p className="text-[9px] text-red-600 font-medium">Critique</p>
              </div>
              <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-3 text-center">
                <span className="text-xl font-bold text-amber-600">{kpis.actions_p1}</span>
                <p className="text-[9px] text-foreground-500">Actions P1</p>
                <p className="text-[9px] text-amber-600 font-medium">Prioritaire</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-xl font-bold text-foreground-950">{kpis.score_moyen_blocs}/100</span>
                <p className="text-[10px] text-foreground-500">Score moyen blocs</p>
              </div>
              <div className="bg-red-50 border border-red-200/40 rounded-lg p-3 text-center">
                <span className="text-xl font-bold text-red-600">{kpis.blocs_critiques}</span>
                <p className="text-[9px] text-foreground-500">Blocs critiques</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-sm font-bold text-foreground-950">{kpis.budget_12m}</span>
                <p className="text-[10px] text-foreground-500">Budget 12 mois</p>
              </div>
            </div>

            {/* Score Distribution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              <div className="bg-emerald-50 border border-emerald-200/40 rounded-lg p-4 text-center"><span className="text-3xl font-bold text-emerald-700">{kpis.blocs_maitrise}</span><p className="text-[10px] text-foreground-500 mt-1">Blocs Maîtrisés (≥90)</p></div>
              <div className="bg-accent-50 border border-accent-200/40 rounded-lg p-4 text-center"><span className="text-3xl font-bold text-accent-700">{kpis.blocs_progresse}</span><p className="text-[10px] text-foreground-500 mt-1">Blocs en Progrès (75-89)</p></div>
              <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-4 text-center"><span className="text-3xl font-bold text-amber-700">{kpis.blocs_en_cours}</span><p className="text-[10px] text-foreground-500 mt-1">Blocs en Cours (55-74)</p></div>
              <div className="bg-red-50 border border-red-200/40 rounded-lg p-4 text-center"><span className="text-3xl font-bold text-red-600">{kpis.blocs_critiques}</span><p className="text-[10px] text-foreground-500 mt-1">Blocs Critiques (&lt;55)</p></div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
                <i className="ri-stack-line"></i>{filteredBlocs.length} Blocs Stratégiques
              </h3>
              <div className="flex gap-2 flex-wrap">
                <select value={sortMode} onChange={(e) => setSortMode(e.target.value as typeof sortMode)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer">
                  <option value="priorite">Trier par Priorité</option>
                  <option value="score">Trier par Score</option>
                  <option value="budget">Trier par Budget</option>
                </select>
                {[
                  { id: 'all', label: 'Tous' },
                  { id: 'P0', label: 'P0' },
                  { id: 'P1', label: 'P1' },
                  { id: 'critique', label: 'Critiques' },
                ].map(f => (
                  <button key={f.id} onClick={() => setBlocFilter(f.id as typeof blocFilter)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    blocFilter === f.id ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                  }`}>{f.label}</button>
                ))}
              </div>
            </div>

            {/* Blocs Grid */}
            <div className="space-y-4 mb-8">
              {filteredBlocs.map(bloc => (
                <BlocCard key={bloc.id} bloc={bloc} onClick={() => navigateToBloc(bloc.id)} />
              ))}
            </div>

            {/* All Actions Quick View */}
            <div className="mt-8 pt-6 border-t border-background-200/50">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
                  <i className="ri-tools-line"></i>Toutes les Actions Correctives — {allBlockActions.length}
                </h3>
                <button
                  onClick={() => setShowOnlyP0(!showOnlyP0)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${showOnlyP0 ? 'bg-red-500 text-background-50' : 'bg-background-100 text-foreground-700 hover:bg-background-200'}`}
                >
                  {showOnlyP0 ? 'P0 Uniquement (20)' : 'Filtrer P0 uniquement'}
                </button>
              </div>
              <div className="space-y-2">
                {displayedActions.map(action => (
                  <div key={action.id} className="bg-background-50 border border-background-200/60 rounded-lg p-3 flex items-center gap-3">
                    <Badge label={action.priorite} variant={action.priorite} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[10px] font-mono text-foreground-400">{action.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${action.bloc_couleur === 'accent' ? 'bg-accent-100 text-accent-700' : action.bloc_couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>{action.bloc_nom}</span>
                      </div>
                      <p className="text-xs font-medium text-foreground-950 mb-0.5">{action.action}</p>
                      <div className="flex items-center gap-3 text-[10px] text-foreground-500">
                        <span><i className="ri-money-dollar-circle-line mr-0.5 text-foreground-400"></i>{action.budget}</span>
                        <span><i className="ri-user-line mr-0.5 text-foreground-400"></i>{action.responsable}</span>
                        <span><i className="ri-calendar-line mr-0.5 text-foreground-400"></i>{action.deadline}</span>
                      </div>
                    </div>
                    <Badge label={action.statut === 'en_attente' ? 'En attente' : action.statut === 'en_cours' ? 'En cours' : 'Terminé'} variant={action.statut} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'mass' && (
          <MassCorrectiveActions />
        )}

        {/* ===== BLOC DETAIL ===== */}
        {activeTab === 'bloc' && activeBloc && (
          <div className="space-y-6">
            {/* Bloc Header */}
            <div className={`rounded-lg p-6 border ${activeBloc.couleur === 'accent' ? 'bg-accent-50/30 border-accent-200/40' : activeBloc.couleur === 'secondary' ? 'bg-secondary-50/30 border-secondary-200/40' : 'bg-primary-50/30 border-primary-200/40'}`}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center shrink-0 ${activeBloc.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : activeBloc.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                  <span className="text-2xl font-bold font-mono">{activeBloc.numero}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-xl font-bold text-foreground-950">{activeBloc.nom}</h2>
                    <Badge label={activeBloc.priorite_globale} variant={activeBloc.priorite_globale} />
                    <Badge label={activeBloc.statut_global === 'critique' ? 'Urgence' : activeBloc.statut_global === 'en_cours' ? 'En cours' : activeBloc.statut_global === 'progresse' ? 'En progrès' : 'Maîtrisé'} variant={activeBloc.statut_global} />
                  </div>
                  <p className="text-sm text-foreground-600">{activeBloc.acronyme} — Horizon <strong>{activeBloc.horizon}</strong></p>
                </div>
              </div>
              <p className="text-sm text-foreground-700 leading-relaxed mb-4">{activeBloc.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="rounded-lg p-3 text-center bg-background-50">
                  <CircularGauge value={activeBloc.score_bloc_actuel} size={48} strokeWidth={4} color={getScoreColor(activeBloc.score_bloc_actuel)} />
                  <p className="text-[10px] text-foreground-500 mt-1">Score Actuel</p>
                </div>
                <div className="rounded-lg p-3 text-center bg-background-50">
                  <CircularGauge value={activeBloc.score_bloc_cible} size={48} strokeWidth={4} color="emerald" />
                  <p className="text-[10px] text-foreground-500 mt-1">Score Cible</p>
                </div>
                <div className="rounded-lg p-3 text-center bg-background-50 flex flex-col justify-center">
                  <span className="text-2xl font-bold text-foreground-950">{(activeBloc.actions || []).length}</span>
                  <p className="text-[10px] text-foreground-500 mt-1">Actions</p>
                </div>
                <div className="rounded-lg p-3 text-center bg-background-50 flex flex-col justify-center">
                  <span className="text-lg font-bold text-foreground-950">{activeBloc.responsable_principal}</span>
                  <p className="text-[10px] text-foreground-500 mt-1">Responsable</p>
                </div>
                <div className="rounded-lg p-3 text-center bg-background-50 flex flex-col justify-center">
                  <span className="text-lg font-bold text-primary-700">{activeBloc.budget_total}</span>
                  <p className="text-[10px] text-foreground-500 mt-1">Budget</p>
                </div>
              </div>
            </div>

            {/* Jalon Clé */}
            <div className="bg-accent-100/50 border border-accent-200/40 rounded-lg p-4">
              <p className="text-sm font-semibold text-accent-900 mb-1 flex items-center gap-2"><i className="ri-focus-3-line"></i>Jalon Clé</p>
              <p className="text-sm text-accent-800/80">{activeBloc.jalon_cle}</p>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-tools-line"></i>Actions Correctives — {(activeBloc.actions || []).length}</h3>
              <div className="space-y-3">
                {(activeBloc.actions || []).map(action => (
                  <ActionCard key={action.id} action={action} expanded={expandedActions.has(action.id)} onToggle={() => toggleActionExpanded(action.id)} />
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-bar-chart-2-line"></i>KPIs — Standards Internationaux</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeBloc.kpis.map(kpi => (
                  <KPICard key={kpi.nom} kpi={kpi} />
                ))}
              </div>
            </div>

            {/* Références Big Four / ISO / Think Tank */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-medal-line"></i>Benchmarks — Big Four · ISO · Think Tank · Observatoires</h3>
              <div className="space-y-2">
                {(activeBloc.references || []).map((ref, i) => (
                  <div key={i} className="bg-background-50 border border-background-200/60 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge label={ref.standard.split(' ')[0]} variant={ref.standard.includes('ISO') ? 'ISO' : ref.standard.includes('NIST') ? 'NIST' : ref.standard.includes('GAFI') ? 'GAFI' : ref.standard.includes('OWASP') ? 'OWASP' : ref.standard.includes('COSO') ? 'COSO' : 'Big Four'} />
                      <span className="text-xs font-mono text-foreground-500">{ref.standard}</span>
                    </div>
                    <p className="text-xs text-foreground-700"><strong>Niveau cible :</strong> {ref.niveau_cible}</p>
                    <p className="text-xs text-foreground-600"><strong>Benchmark :</strong> {ref.benchmark}</p>
                    <p className="text-xs text-red-600"><strong>Écart :</strong> {ref.ecart}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dépendances & Impacts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeBloc.dependances.length > 0 && (
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1.5"><i className="ri-git-branch-line"></i>Dépendances</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeBloc.dependances.map(dep => {
                      const depBloc = CORRECTIVE_ACTION_BLOCKS.find(b => b.id === dep);
                      return depBloc ? (
                        <button key={dep} onClick={() => navigateToBloc(dep)} className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-700 hover:bg-background-200 cursor-pointer whitespace-nowrap transition-colors">
                          {depBloc.numero} {depBloc.acronyme}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1.5"><i className="ri-links-line"></i>Axes Impactés</h4>
                <div className="flex flex-wrap gap-1">
                  {activeBloc.impacts_axes.map(axe => (
                    <span key={axe} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-700 whitespace-nowrap">{axe}</span>
                  ))}
                </div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1.5"><i className="ri-alert-line"></i>Risques Couverts</h4>
                <div className="flex flex-wrap gap-1">
                  {activeBloc.impact_risques.map(risk => (
                    <span key={risk} className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 whitespace-nowrap">{risk}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== BOTTOM TAB SWITCHER ===== */}
        <div className="mt-10 pt-6 border-t border-background-200/50">
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1 flex-wrap">
            <button onClick={() => { setActiveTab('dashboard'); setActiveBlocId(null); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'dashboard' ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-dashboard-line text-sm"></i><span>Dashboard</span>
            </button>
            {CORRECTIVE_ACTION_BLOCKS.map(bloc => (
              <button key={bloc.id} onClick={() => navigateToBloc(bloc.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'bloc' && activeBloc?.id === bloc.id ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                <span className="text-[9px] font-mono font-bold">{bloc.numero}</span><span>{bloc.acronyme}</span>
              </button>
            ))}
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'actions' ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-tools-line text-sm"></i><span>Actions</span>
            </button>
            <button onClick={() => { setActiveTab('mass'); setActiveBlocId(null); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'mass' ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-file-upload-line text-sm"></i><span>CAPA Masse</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-medal-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Corrective Action Blocks — {meta.totalBlocks} Blocs · {meta.totalActions} Actions · {meta.referenceStandards.split('·').length} Référentiels</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-accent-800/70">
            <span><strong>{kpis.actions_p0}</strong> actions P0</span>
            <span><strong>{kpis.budget_12m}</strong> budget 12m</span>
            <span><strong>{kpis.blocs_critiques}</strong> blocs critiques</span>
            <span><strong>{kpis.score_moyen_blocs}/100</strong> score moyen</span>
            <span><strong>97.5/100</strong> score cible</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}

// ==== SUB-COMPONENTS ====

function BlocCard({ bloc, onClick }: { bloc: CorrectiveActionBlock; onClick: () => void }) {
  const sc = getScoreColor(bloc.score_bloc_actuel);
  return (
    <div className="bg-background-50 border border-background-200/60 rounded-xl p-5 hover:border-background-300/80 transition-all cursor-pointer group" onClick={onClick}>
      <div className="flex items-start gap-4 flex-col sm:flex-row">
        <div className="flex items-center gap-3 shrink-0">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bloc.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : bloc.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
            <span className="text-xl font-bold font-mono">{bloc.numero}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-sm font-bold text-foreground-950">{bloc.nom}</h3>
            <Badge label={bloc.priorite_globale} variant={bloc.priorite_globale} />
            <Badge label={bloc.statut_global === 'critique' ? 'Urgence' : bloc.statut_global} variant={bloc.statut_global} />
          </div>
          <p className="text-xs text-foreground-600 mb-1">{bloc.acronyme} — Horizon {bloc.horizon} · {bloc.responsable_principal}</p>
          <p className="text-xs text-foreground-500 leading-relaxed line-clamp-2 mb-3">{bloc.description}</p>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {(bloc.references || []).slice(0, 3).map((ref, i) => (
              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-background-100 text-foreground-500 whitespace-nowrap">{ref.standard.split(' —')[0].replace(':2022', '').replace(':2021', '').replace(':2023', '')}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <CircularGauge value={bloc.score_bloc_actuel} size={36} strokeWidth={3} color={sc} />
              <div>
                <span className="text-[10px] text-foreground-500">Score</span>
                <p className="text-xs font-bold text-foreground-950">{bloc.score_bloc_actuel}→{bloc.score_bloc_cible}</p>
              </div>
            </div>
            <div className="h-6 w-px bg-background-200 hidden sm:block"></div>
            <div className="text-[10px]">
              <span className="text-foreground-500">{(bloc.actions || []).length} actions</span>
              <span className="text-foreground-400 mx-1">·</span>
              <span className="text-foreground-500">{bloc.budget_total}</span>
            </div>
            <div className="flex-1 hidden sm:block"></div>
            <i className="ri-arrow-right-line text-xs text-foreground-400 group-hover:text-foreground-700 transition-colors"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ action, expanded, onToggle }: { action: BlockAction; expanded: boolean; onToggle: () => void }) {
  return (
    <div className={`bg-background-50 border rounded-lg p-4 transition-colors cursor-pointer ${action.priorite === 'P0' ? 'border-red-200/60 hover:border-red-300/80 bg-red-50/5' : action.priorite === 'P1' ? 'border-amber-200/60 hover:border-amber-300/80 bg-amber-50/5' : 'border-background-200/60 hover:border-background-300/80'}`} onClick={onToggle}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <Badge label={action.priorite} variant={action.priorite} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground-950 mb-1">{action.action}</h4>
          <div className="flex items-center gap-3 text-[10px] text-foreground-500 flex-wrap">
            <span className="text-xs font-mono text-foreground-400">{action.id}</span>
            <span><i className="ri-money-dollar-circle-line mr-0.5 text-foreground-400"></i>{action.budget}</span>
            <span><i className="ri-time-line mr-0.5 text-foreground-400"></i>{action.effort}</span>
            <span><i className="ri-user-line mr-0.5 text-foreground-400"></i>{action.responsable}</span>
            <span><i className="ri-flag-line mr-0.5 text-foreground-400"></i>{action.deadline}</span>
          </div>
        </div>
        <div className="shrink-0">
          <Badge label={action.statut === 'en_attente' ? 'En attente' : action.statut === 'en_cours' ? 'En cours' : 'Terminé'} variant={action.statut} />
          {expanded ? <i className="ri-arrow-up-s-line text-xs text-foreground-400 ml-2"></i> : <i className="ri-arrow-down-s-line text-xs text-foreground-400 ml-2"></i>}
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-background-200/40">
          <p className="text-xs text-foreground-600 leading-relaxed mb-2">{action.description}</p>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"><i className="ri-bar-chart-line mr-0.5"></i>KPI : {action.kpi}</span>
            <span className="text-foreground-500"><i className="ri-stack-line mr-0.5"></i>Axe : {action.axe_origine}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({ kpi }: { kpi: BlockKPI }) {
  return (
    <div className="bg-background-50 border border-background-200/60 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <Badge label={kpi.standard} variant={kpi.standard} />
        <span className="text-[10px] text-foreground-500">{kpi.nom}</span>
      </div>
      <div className="flex items-end justify-between mb-1.5">
        <span className="text-xs font-bold text-foreground-950">{kpi.valeur_actuelle}</span>
        <span className="text-[10px] text-emerald-600 font-medium">{kpi.cible}</span>
      </div>
      <ProgressBar value={kpi.progression} color={kpi.progression >= 90 ? 'emerald' : kpi.progression >= 60 ? 'amber' : 'red'} />
      <p className="text-[9px] text-foreground-400 mt-1 text-right">{kpi.progression}% atteint</p>
    </div>
  );
}

// Need to import CORRECTIVE_ACTION_BLOCKS in the component for dependances lookup
import { CORRECTIVE_ACTION_BLOCKS } from '@/mocks/correctiveActionBlocks';



