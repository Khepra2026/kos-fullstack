import { useState, useMemo } from 'react';
import {
  bigFourActionPlan,
  actionPlanSummary,
  BigFourActionItem,
  comexKpis,
  comexPillarProgress,
  comexOwnerLoads,
} from '@/mocks/kos150BigFourActionPlan';
import ScrollReveal from '@/components/feature/ScrollReveal';

const typeOptions = ['Tous', 'Majeure', 'Corrective', 'Upgrade'] as const;
const priorityOptions = ['Toutes', 'P0', 'P1', 'P2', 'P3'] as const;
const statutOptions = ['Tous', 'À faire', 'Planifié', 'Recherche', 'En cours', 'Terminé'] as const;

const typeBadgeClasses: Record<string, string> = {
  Majeure: 'bg-accent-500 text-white',
  Corrective: 'bg-secondary-500 text-white',
  Upgrade: 'bg-primary-500 text-white',
};

const priorityBadgeClasses: Record<string, string> = {
  P0: 'bg-accent-200/70 text-accent-900 border-accent-400/60',
  P1: 'bg-accent-100 text-accent-700 border-accent-200',
  P2: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  P3: 'bg-primary-100 text-primary-700 border-primary-200',
};

const statutBadgeClasses: Record<string, string> = {
  'À faire': 'bg-accent-50 text-accent-800 border-accent-300/60',
  'Planifié': 'bg-accent-50 text-accent-700 border-accent-200',
  'Recherche': 'bg-primary-50 text-primary-700 border-primary-200',
  'En cours': 'bg-secondary-50 text-secondary-700 border-secondary-200',
  'Terminé': 'bg-primary-100 text-primary-700 border-primary-300/60',
};

const risqueBadgeClasses: Record<string, string> = {
  Vert: 'bg-primary-100 text-primary-700 border-primary-300/60',
  Orange: 'bg-accent-100 text-accent-700 border-accent-300/60',
  Rouge: 'bg-secondary-100 text-secondary-700 border-secondary-300/60',
};

const risqueDotClasses: Record<string, string> = {
  Vert: 'bg-primary-500',
  Orange: 'bg-accent-500',
  Rouge: 'bg-secondary-500',
};

function ActionCard({ action }: { action: BigFourActionItem }) {
  const urgent = action.joursRestants <= 30 && action.priorite === 'P0';
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 hover:border-accent-300/60 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-foreground-500 bg-background-100 px-2 py-1 rounded">{action.code}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeBadgeClasses[action.type]}`}>{action.type}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${priorityBadgeClasses[action.priorite]}`}>{action.priorite}</span>
      </div>
      <div className="text-sm font-bold text-foreground-950 mb-1">{action.pilier}</div>
      <div className="text-xs text-foreground-600 mb-3">{action.action}</div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-background-100 rounded-lg p-2">
          <div className="text-[10px] text-foreground-500 uppercase">Baseline</div>
          <div className="text-xs font-semibold text-foreground-700 truncate">{action.baselineKos}</div>
        </div>
        <div className="bg-accent-50 rounded-lg p-2">
          <div className="text-[10px] text-accent-600 uppercase">Cible J+365</div>
          <div className="text-xs font-semibold text-accent-700 truncate">{action.cibleJ365}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center gap-1 text-foreground-500">
          <i className="ri-calendar-line"></i>
          <span>{action.deadline}</span>
        </div>
        <div className="flex items-center gap-1 text-foreground-500">
          <i className="ri-user-line"></i>
          <span>{action.owner}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs mb-2">
        <div className={`flex items-center gap-1 ${urgent ? 'text-secondary-700 font-bold' : 'text-foreground-500'}`}>
          <i className={`ri-time-line ${urgent ? 'animate-pulse' : ''}`}></i>
          <span>{action.joursRestants}j restants</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${risqueDotClasses[action.risque]}`}></span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${risqueBadgeClasses[action.risque]}`}>{action.risque}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statutBadgeClasses[action.statut]}`}>{action.statut}</span>
        <span className="text-xs font-bold text-foreground-700">{action.budgetKeur} kEUR</span>
      </div>
    </div>
  );
}

function MasterCodesTab() {
  const [activeType, setActiveType] = useState<string>('Tous');
  const [activePriority, setActivePriority] = useState<string>('Toutes');
  const [activeStatut, setActiveStatut] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredActions = useMemo(() => {
    return bigFourActionPlan.filter(action => {
      const matchType = activeType === 'Tous' || action.type === activeType;
      const matchPriority = activePriority === 'Toutes' || action.priorite === activePriority;
      const matchStatut = activeStatut === 'Tous' || action.statut === activeStatut;
      const matchSearch = searchQuery === '' ||
        action.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.pilier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.gapBigFour.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchPriority && matchStatut && matchSearch;
    });
  }, [activeType, activePriority, activeStatut, searchQuery]);

  const budgetFiltered = useMemo(() => filteredActions.reduce((sum, a) => sum + a.budgetKeur, 0), [filteredActions]);
  const p0Filtered = useMemo(() => filteredActions.filter(a => a.priorite === 'P0').length, [filteredActions]);
  const urgentCount = useMemo(() => filteredActions.filter(a => a.joursRestants <= 30 && a.priorite === 'P0').length, [filteredActions]);

  return (
    <>
      {/* ── FILTERS ── */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
            <div className="flex items-center gap-2 bg-background-100 rounded-lg px-3 py-2 flex-1 min-w-0">
              <i className="ri-search-line text-foreground-400 text-sm"></i>
              <input
                type="text"
                placeholder="Rechercher code, pilier, action, owner, gap..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-foreground-950 outline-none w-full placeholder:text-foreground-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={activeType}
                onChange={e => setActiveType(e.target.value)}
                className="text-sm bg-background-100 border border-background-200 rounded-lg px-3 py-2 text-foreground-950 outline-none cursor-pointer"
              >
                {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select
                value={activePriority}
                onChange={e => setActivePriority(e.target.value)}
                className="text-sm bg-background-100 border border-background-200 rounded-lg px-3 py-2 text-foreground-950 outline-none cursor-pointer"
              >
                {priorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select
                value={activeStatut}
                onChange={e => setActiveStatut(e.target.value)}
                className="text-sm bg-background-100 border border-background-200 rounded-lg px-3 py-2 text-foreground-950 outline-none cursor-pointer"
              >
                {statutOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="flex items-center gap-1 bg-background-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${viewMode === 'table' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-500'}`}
                >
                  <i className="ri-table-line mr-1"></i>Tableau
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${viewMode === 'cards' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-500'}`}
                >
                  <i className="ri-layout-grid-line mr-1"></i>Cards
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 text-xs text-foreground-500 flex-wrap">
            <span><strong className="text-foreground-950">{filteredActions.length}</strong> actions affichées</span>
            <span>|</span>
            <span>Budget filtré : <strong className="text-accent-600">{budgetFiltered} kEUR</strong></span>
            <span>|</span>
            <span>P0 : <strong className="text-accent-700">{p0Filtered}</strong></span>
            <span>|</span>
            <span className="text-secondary-700 font-semibold">Urgentes ≤30j : <strong>{urgentCount}</strong></span>
          </div>
        </div>
      </ScrollReveal>

      {/* ── TABLE VIEW ── */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto bg-background-50 border border-background-200/70 rounded-xl">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-background-200 bg-background-100">
                <th className="text-left p-3 text-foreground-600 font-semibold whitespace-nowrap">Code</th>
                <th className="text-left p-3 text-foreground-600 font-semibold whitespace-nowrap">Pilier</th>
                <th className="text-left p-3 text-foreground-600 font-semibold min-w-[200px]">Action</th>
                <th className="text-center p-3 text-foreground-600 font-semibold">Type</th>
                <th className="text-center p-3 text-foreground-600 font-semibold">Priorité</th>
                <th className="text-left p-3 text-foreground-600 font-semibold">Gap Big Four</th>
                <th className="text-left p-3 text-foreground-600 font-semibold">Baseline</th>
                <th className="text-left p-3 text-foreground-600 font-semibold">Cible J+365</th>
                <th className="text-center p-3 text-foreground-600 font-semibold">Owner</th>
                <th className="text-center p-3 text-foreground-600 font-semibold">Deadline</th>
                <th className="text-center p-3 text-foreground-600 font-semibold">Jours</th>
                <th className="text-center p-3 text-foreground-600 font-semibold">Risque</th>
                <th className="text-center p-3 text-foreground-600 font-semibold">Statut</th>
                <th className="text-left p-3 text-foreground-600 font-semibold">KPI</th>
                <th className="text-center p-3 text-foreground-600 font-semibold">Budget</th>
              </tr>
            </thead>
            <tbody>
              {filteredActions.map((action, i) => {
                const urgent = action.joursRestants <= 30 && action.priorite === 'P0';
                return (
                  <tr key={action.code} className={`border-b border-background-100 hover:bg-accent-50/30 transition-colors ${i % 2 === 0 ? 'bg-background-50' : 'bg-background-50/50'}`}>
                    <td className="p-3 font-bold text-foreground-900 whitespace-nowrap">{action.code}</td>
                    <td className="p-3 font-semibold text-foreground-800 whitespace-nowrap">{action.pilier}</td>
                    <td className="p-3 text-foreground-700 min-w-[200px]">{action.action}</td>
                    <td className="p-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeBadgeClasses[action.type]}`}>{action.type}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityBadgeClasses[action.priorite]}`}>{action.priorite}</span>
                    </td>
                    <td className="p-3 text-foreground-600">{action.gapBigFour}</td>
                    <td className="p-3 text-foreground-600">{action.baselineKos}</td>
                    <td className="p-3 font-semibold text-accent-700">{action.cibleJ365}</td>
                    <td className="p-3 text-center text-foreground-600 whitespace-nowrap">{action.owner}</td>
                    <td className="p-3 text-center text-foreground-600 whitespace-nowrap">{action.deadline}</td>
                    <td className={`p-3 text-center font-bold whitespace-nowrap ${urgent ? 'text-secondary-700' : 'text-foreground-600'}`}>
                      {urgent && <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-500 mr-1 animate-pulse"></span>}
                      {action.joursRestants}j
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${risqueDotClasses[action.risque]}`}></span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${risqueBadgeClasses[action.risque]}`}>{action.risque}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statutBadgeClasses[action.statut]}`}>{action.statut}</span>
                    </td>
                    <td className="p-3 text-foreground-600">{action.kpiSucces}</td>
                    <td className="p-3 text-center font-bold text-foreground-900 whitespace-nowrap">{action.budgetKeur}k</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredActions.length === 0 && (
            <div className="p-8 text-center text-foreground-500">
              <i className="ri-filter-off-line text-2xl mb-2 block"></i>
              Aucune action ne correspond aux filtres sélectionnés.
            </div>
          )}
        </div>
      )}

      {/* ── CARDS VIEW ── */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredActions.map(action => (
            <ActionCard key={action.code} action={action} />
          ))}
          {filteredActions.length === 0 && (
            <div className="col-span-full p-8 text-center text-foreground-500">
              <i className="ri-filter-off-line text-2xl mb-2 block"></i>
              Aucune action ne correspond aux filtres sélectionnés.
            </div>
          )}
        </div>
      )}

      {/* ── FOOTER SUMMARY ── */}
      <ScrollReveal>
        <div className="mt-8 bg-gradient-to-r from-accent-500/8 via-background-50 to-background-50 border border-accent-300/40 rounded-xl p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-1">Résumé Exécutif — Plan d'Action 150%</h3>
              <p className="text-xs text-foreground-600 max-w-2xl">
                8 actions P0 critiques à traiter en priorité (budget 410k EUR). 14 actions P1 pour consolider la domination Big Four.
                2 actions P3 en recherche (Blockchain + Crypto). Deadline la plus proche : <strong className="text-secondary-700">{actionPlanSummary.earliestDeadline}</strong>.
                Horizon final : <strong>{actionPlanSummary.latestDeadline}</strong>.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <div className="text-xs text-foreground-500">Budget P0</div>
                <div className="text-lg font-bold text-accent-700">410k</div>
              </div>
              <div className="w-px h-8 bg-background-300"></div>
              <div className="text-right">
                <div className="text-xs text-foreground-500">Budget P1</div>
                <div className="text-lg font-bold text-accent-600">1.09M</div>
              </div>
              <div className="w-px h-8 bg-background-300"></div>
              <div className="text-right">
                <div className="text-xs text-foreground-500">Total</div>
                <div className="text-lg font-bold text-foreground-950">2.66M</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}

function ComexTab() {
  return (
    <div className="space-y-6">
      {/* ── COMEX KPIs ── */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {comexKpis.map((kpi, i) => (
            <div key={kpi.indicator} className="bg-background-50 border border-background-200/70 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-foreground-500 uppercase font-medium">{kpi.indicator}</span>
                <span className={`w-2 h-2 rounded-full ${risqueDotClasses[kpi.status]}`}></span>
              </div>
              <div className="text-lg font-bold text-foreground-950">{kpi.value}</div>
              <div className="text-[10px] text-foreground-500">Cible : {kpi.target}</div>
              <div className="mt-1 flex items-center gap-1">
                {kpi.trend === 'up' && (
                  <>
                    <i className="ri-arrow-up-line text-[10px] text-primary-600"></i>
                    <span className="text-[10px] font-medium text-primary-600">Progression</span>
                  </>
                )}
                {kpi.trend === 'down' && (
                  <>
                    <i className="ri-arrow-down-line text-[10px] text-secondary-600"></i>
                    <span className="text-[10px] font-medium text-secondary-600">Régression</span>
                  </>
                )}
                {kpi.trend === 'stable' && (
                  <>
                    <i className="ri-arrow-right-line text-[10px] text-foreground-400"></i>
                    <span className="text-[10px] font-medium text-foreground-400">Stable</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── PILLAR PROGRESS ── */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-4">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Avancement par Pilier — TDB COMEX</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-background-200 bg-background-100">
                  <th className="text-left p-2 text-foreground-600 font-semibold">Pilier</th>
                  <th className="text-center p-2 text-foreground-600 font-semibold">Actions</th>
                  <th className="text-center p-2 text-foreground-600 font-semibold">Complétées</th>
                  <th className="text-center p-2 text-foreground-600 font-semibold">Budget Alloué</th>
                  <th className="text-center p-2 text-foreground-600 font-semibold">Budget Consommé</th>
                  <th className="text-left p-2 text-foreground-600 font-semibold">Progression</th>
                  <th className="text-center p-2 text-foreground-600 font-semibold">Risque</th>
                </tr>
              </thead>
              <tbody>
                {comexPillarProgress.map((p, i) => (
                  <tr key={p.pillar} className={`border-b border-background-100 hover:bg-accent-50/30 transition-colors ${i % 2 === 0 ? 'bg-background-50' : 'bg-background-50/50'}`}>
                    <td className="p-2 font-semibold text-foreground-800">{p.pillar}</td>
                    <td className="p-2 text-center text-foreground-600">{p.actions}</td>
                    <td className="p-2 text-center text-foreground-600">{p.completed}</td>
                    <td className="p-2 text-center font-semibold text-foreground-700">{p.budgetAllocated}k</td>
                    <td className="p-2 text-center text-foreground-600">{p.budgetConsumed}k</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                          <div className="h-full bg-accent-500 rounded-full" style={{ width: `${p.progressPct}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-foreground-600 w-8 text-right">{p.progressPct}%</span>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${risqueDotClasses[p.risque]}`}></span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${risqueBadgeClasses[p.risque]}`}>{p.risque}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* ── OWNER WORKLOAD ── */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-4">
          <h3 className="text-sm font-bold text-foreground-950 mb-4">Charge par Owner — COMEX</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {comexOwnerLoads.map(owner => (
              <div key={owner.owner} className={`border rounded-lg p-3 ${owner.overload ? 'border-secondary-300/60 bg-secondary-50/30' : 'border-background-200/70 bg-background-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground-800">{owner.owner}</span>
                  {owner.overload && <span className="text-[10px] font-bold text-secondary-700 bg-secondary-100 px-1.5 py-0.5 rounded-full">SURCHARGE</span>}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-background-100 rounded p-1.5">
                    <div className="text-foreground-500">Actions</div>
                    <div className="font-bold text-foreground-700">{owner.actionsCount}</div>
                  </div>
                  <div className={`rounded p-1.5 ${owner.p0Count > 0 ? 'bg-accent-50' : 'bg-background-100'}`}>
                    <div className="text-foreground-500">P0</div>
                    <div className={`font-bold ${owner.p0Count > 0 ? 'text-accent-700' : 'text-foreground-700'}`}>{owner.p0Count}</div>
                  </div>
                  <div className="bg-background-100 rounded p-1.5">
                    <div className="text-foreground-500">Budget</div>
                    <div className="font-bold text-foreground-700">{owner.budgetK}k</div>
                  </div>
                  <div className="bg-background-100 rounded p-1.5">
                    <div className="text-foreground-500">Prochaine</div>
                    <div className="font-bold text-foreground-700">{owner.nextDeadline}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function KOS150BigFourActionPlanPage() {
  const [activeTab, setActiveTab] = useState<'master' | 'comex'>('master');

  return (
    <div className="min-h-screen bg-background-50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        {/* ── HEADER ── */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg">
                <i className="ri-road-map-line text-white text-xl"></i>
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-accent-600 bg-accent-100 px-3 py-1.5 rounded-full">KOS CAPSTONE — PLAN D'ACTION 150%</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500"></span>
                  </span>
                  <span className="text-xs text-accent-600 font-semibold">J+365 ROADMAP — 05 Juillet 2026</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-950 mb-3 leading-tight">
              KOS <span className="text-accent-500">150%</span> Big Four Action Plan
              <span className="text-accent-500 text-xl align-top ml-1">™</span>
            </h1>
            <p className="text-foreground-600 text-base max-w-4xl leading-relaxed">
              <strong className="text-accent-600">32 actions structurées</strong> pour transcender les standards Big Four — 5 actions majeures, 15 correctives, 12 upgrades. Budget total <strong className="text-foreground-900">2.66M EUR</strong>. Baseline actuelle <strong>92/100</strong> → Cible <strong className="text-accent-600">150/100</strong>. Gap à combler : <strong className="text-accent-700">58 points</strong>.
            </p>
          </div>
        </ScrollReveal>

        {/* ── STATS CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          {[
            { label: 'Actions Total', value: `${actionPlanSummary.totalActions}`, icon: 'ri-list-check', color: 'bg-accent-500' },
            { label: 'Majeures', value: `${actionPlanSummary.majeures}`, icon: 'ri-vip-crown-line', color: 'bg-accent-500' },
            { label: 'Correctives', value: `${actionPlanSummary.correctives}`, icon: 'ri-tools-line', color: 'bg-secondary-500' },
            { label: 'Upgrades', value: `${actionPlanSummary.upgrades}`, icon: 'ri-rocket-line', color: 'bg-primary-500' },
            { label: 'Budget Total', value: `${actionPlanSummary.totalBudgetKeur}k`, icon: 'ri-funds-line', color: 'bg-accent-500' },
            { label: 'Actions P0', value: `${actionPlanSummary.p0Count}`, icon: 'ri-fire-line', color: 'bg-accent-500' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 60}>
              <div className="bg-background-50 border border-background-200/70 rounded-xl p-3 text-center">
                <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                  <i className={`${stat.icon} text-white text-sm`}></i>
                </div>
                <div className="text-xl font-bold text-foreground-950">{stat.value}</div>
                <div className="text-[10px] text-foreground-500 font-medium">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── PROGRESS BAR ── */}
        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-bold text-foreground-950">Progression vers 150% — Baseline {actionPlanSummary.baselineScore} → Cible {actionPlanSummary.targetScore}</div>
              <div className="text-sm font-bold text-accent-600">{actionPlanSummary.baselineScore}/150</div>
            </div>
            <div className="h-3 bg-background-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full transition-all"
                style={{ width: `${(actionPlanSummary.baselineScore / 150) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-foreground-500 mt-1">
              <span>Baseline 92</span>
              <span className="text-secondary-700 font-bold">Gap {actionPlanSummary.gapToClose} pts</span>
              <span>Cible 150</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ── TABS ── */}
        <ScrollReveal>
          <div className="flex items-center gap-1 bg-background-100 rounded-xl p-1 mb-6 w-fit">
            <button
              onClick={() => setActiveTab('master')}
              className={`px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all whitespace-nowrap ${activeTab === 'master' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}
            >
              <i className="ri-table-line mr-1.5"></i>Master_Codes
            </button>
            <button
              onClick={() => setActiveTab('comex')}
              className={`px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all whitespace-nowrap ${activeTab === 'comex' ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}
            >
              <i className="ri-dashboard-3-line mr-1.5"></i>TDB_COMEX
            </button>
          </div>
        </ScrollReveal>

        {/* ── TAB CONTENT ── */}
        {activeTab === 'master' && <MasterCodesTab />}
        {activeTab === 'comex' && <ComexTab />}
      </div>
    </div>
  );
}