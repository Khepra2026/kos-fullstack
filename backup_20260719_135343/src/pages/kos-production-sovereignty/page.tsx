import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSProductionSovereignty, type PSVueActive } from '@/hooks/useKOSProductionSovereignty';
import type { ProductionWorkstream, SovereigntyAction, SovereigntyMilestone } from '@/mocks/productionSovereignty';
import { PRODUCTION_SOVEREIGNTY_META, PRODUCTION_TIMELINE, PRODUCTION_WORKSTREAMS, PRODUCTION_EXECUTIVE_SUMMARY } from '@/mocks/productionSovereignty';

// ===== CIRCULAR GAUGE =====
function CircularGauge({ value, size = 40, strokeWidth = 3, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const strokeMap: Record<string, string> = {
    primary: 'stroke-primary-500', accent: 'stroke-accent-500', secondary: 'stroke-secondary-500',
    emerald: 'stroke-emerald-500', amber: 'stroke-amber-500', red: 'stroke-red-500',
  };
  const textMap: Record<string, string> = {
    primary: 'text-primary-700', accent: 'text-accent-700', secondary: 'text-secondary-700',
    emerald: 'text-emerald-700', amber: 'text-amber-700', red: 'text-red-700',
  };
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${strokeMap[color] || 'stroke-primary-500'} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className={`absolute text-[10px] font-bold ${textMap[color] || 'text-primary-700'}`}>{value}</span>
    </div>
  );
}

// ===== BADGE =====
function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    critique: 'bg-red-100 text-red-700 border-red-200',
    en_cours: 'bg-amber-100 text-amber-700 border-amber-200',
    progresse: 'bg-accent-100 text-accent-700 border-accent-200',
    maitrise: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    non_demarre: 'bg-background-200 text-foreground-500 border-background-200',
    termine: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bloque: 'bg-red-100 text-red-700 border-red-200',
    a_venir: 'bg-background-200 text-foreground-500 border-background-200',
    atteint: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    retard: 'bg-red-100 text-red-700 border-red-200',
    'WS-1': 'bg-primary-100 text-primary-700 border-primary-200',
    'WS-2': 'bg-accent-100 text-accent-700 border-accent-200',
    'WS-3': 'bg-secondary-100 text-secondary-700 border-secondary-200',
    'WS-4': 'bg-accent-100 text-accent-700 border-accent-200',
    'WS-5': 'bg-primary-100 text-primary-700 border-primary-200',
    'WS-6': 'bg-secondary-100 text-secondary-700 border-secondary-200',
    'WS-7': 'bg-accent-100 text-accent-700 border-accent-200',
    default: 'bg-background-200 text-foreground-600 border-background-200',
  };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap font-medium ${bgMap[variant] || bgMap.default}`}>{label}</span>;
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'emerald';
  if (score >= 65) return 'accent';
  if (score >= 40) return 'amber';
  return 'red';
}

export default function productionSovereigntyPage() {
  const {
    workstreams, kpis, allActions, allJalons, actionsFiltrees, wsActuel,
    vueActive, setVueActive, wsSelectionne, selectWs,
    filters, setFilter, resetFilters, searchQuery, setSearchQuery,
    dependanceGraph,
  } = useKOSProductionSovereignty();

  return (
    <hubLayout hubId={200} activeTab="dashboard" tabLabel="Production Sovereignty">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
              ULTIME CAPSTONE
            </span>
            <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full font-medium">{kpis.workstreams_total} Workstreams</span>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">{kpis.actions_total} Actions</span>
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium font-mono">{PRODUCTION_SOVEREIGNTY_META.budgetTotal}</span>
            <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full">{PRODUCTION_SOVEREIGNTY_META.horizon}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">
            Production Sovereignty — Mise en Production 100% Big Four + ISO
          </h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            KOS passe de <strong>« cockpit de simulation »</strong> à <strong className="text-emerald-700">« infrastructure de production souveraine »</strong>. 
            <strong className="text-primary-700"> 7 workstreams</strong> — 
            <strong className="text-accent-700"> {kpis.actions_total} actions</strong> — 
            <strong className="text-secondary-700"> {kpis.jalons_total} jalons</strong>. 
            Infrastructure réelle certifiée ISO, réduction 50%+ Supabase, mémoire interne Big Four, autonomie API, site web calibré marché, ultra lead magnets innovants, ressources documentaires exhaustives. 
            <strong className="text-red-600"> Budget : {PRODUCTION_SOVEREIGNTY_META.budgetTotal}.</strong>
          </p>
        </div>

        {/* ===== TOP KPIs ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-foreground-950">{kpis.workstreams_total}</span>
            <p className="text-[10px] text-foreground-500">Workstreams</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-foreground-950">{kpis.actions_total}</span>
            <p className="text-[10px] text-foreground-500">Actions</p>
          </div>
          <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-amber-600">{kpis.score_moyen_actuel}</span>
            <p className="text-[10px] text-foreground-500">Score Actuel/100</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-emerald-600">100</span>
            <p className="text-[10px] text-foreground-500">Cible</p>
          </div>
          <div className="bg-red-50 border border-red-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-2xl font-bold text-red-600">{kpis.progression_globale}%</span>
            <p className="text-[10px] text-foreground-500">Progression</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-lg font-bold text-foreground-950">{kpis.wss_critiques}/{kpis.workstreams_total}</span>
            <p className="text-[10px] text-foreground-500">Critiques</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-lg font-bold text-emerald-600">{kpis.jalons_atteints}/{kpis.jalons_total}</span>
            <p className="text-[10px] text-foreground-500">Jalons OK</p>
          </div>
          <div className="bg-accent-50 border border-accent-200/40 rounded-lg p-3 text-center flex flex-col justify-center">
            <span className="text-sm font-bold text-accent-700">12-18 mois</span>
            <p className="text-[10px] text-foreground-500">Horizon</p>
          </div>
        </div>

        {/* ===== ALERTE DÉPENDANCE CENTRALE ===== */}
        <div className="bg-red-50 border border-red-200/50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600"><i className="ri-alert-line text-sm"></i></div>
          <div>
            <p className="text-sm font-semibold text-red-800">Dépendance Critique Identifiée</p>
            <p className="text-xs text-red-700">{kpis.dependance_centrale}</p>
          </div>
        </div>

        {/* ===== VUE DASHBOARD ===== */}
        {vueActive === 'dashboard' && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
                  <i className="ri-stack-line"></i>7 Workstreams — Production Sovereignty
                </h3>
              </div>
              <div className="space-y-3">
                {workstreams.map(ws => (
                  <WorkstreamCard key={ws.id} ws={ws} onClick={() => selectWs(ws.id)} />
                ))}
              </div>
            </div>

            {/* Message Clé */}
            <div className="p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-lightbulb-line text-accent-700 text-lg"></i>
                <span className="text-sm font-semibold text-accent-900">Message Clé</span>
              </div>
              <p className="text-xs text-accent-800/80 leading-relaxed">{PRODUCTION_SOVEREIGNTY_META.messageCle}</p>
            </div>
          </>
        )}

        {/* ===== VUE WORKSTREAM ===== */}
        {vueActive === 'workstream' && wsActuel && (
          <div className="space-y-6">
            <button onClick={() => { setVueActive('dashboard'); selectWs(null); }} className="flex items-center gap-1.5 text-xs text-foreground-500 hover:text-foreground-800 cursor-pointer mb-2 whitespace-nowrap">
              <i className="ri-arrow-left-line"></i>Retour Dashboard
            </button>

            {/* WS Header */}
            <div className="rounded-lg p-6 border border-background-200/60 bg-background-50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-primary-100 text-primary-700">
                  <span className="text-lg font-bold font-mono">{wsActuel.numero}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-foreground-950">{wsActuel.nom}</h2>
                  <p className="text-sm text-foreground-600">{wsActuel.acronyme} · {wsActuel.responsable}</p>
                </div>
              </div>
              <p className="text-xs text-foreground-600 mb-4">{wsActuel.description}</p>
              <div className="flex items-center gap-4 mb-3 flex-wrap">
                <CircularGauge value={wsActuel.scoreActuel} size={48} strokeWidth={4} color={getScoreColor(wsActuel.scoreActuel)} />
                <span className="text-[10px] text-foreground-500">Actuel</span>
                <span className="text-foreground-300 text-lg">→</span>
                <CircularGauge value={wsActuel.scoreCible} size={48} strokeWidth={4} color="emerald" />
                <span className="text-[10px] text-foreground-500">Cible</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="rounded-lg p-2 bg-background-100"><span className="text-lg font-bold text-foreground-950">{wsActuel.actions.length}</span><p className="text-[9px] text-foreground-500">Actions</p></div>
                <div className="rounded-lg p-2 bg-background-100"><span className="text-lg font-bold text-foreground-950">{wsActuel.jalons.length}</span><p className="text-[9px] text-foreground-500">Jalons</p></div>
                <div className="rounded-lg p-2 bg-background-100"><span className="text-base font-bold text-primary-700">{wsActuel.budgetTotal}</span><p className="text-[9px] text-foreground-500">Budget</p></div>
                <div className="rounded-lg p-2 bg-background-100"><span className="text-base font-bold text-foreground-950">{wsActuel.progressionGlobale}%</span><p className="text-[9px] text-foreground-500">Progression</p></div>
                <div className="rounded-lg p-2 bg-background-100"><Badge label={wsActuel.statutGlobal === 'critique' ? 'CRITIQUE' : wsActuel.statutGlobal === 'en_cours' ? 'EN COURS' : wsActuel.statutGlobal === 'progresse' ? 'PROGRESSE' : 'MAÎTRISE'} variant={wsActuel.statutGlobal} /><p className="text-[9px] text-foreground-500">Statut</p></div>
              </div>
            </div>

            {/* Jalon Final */}
            <div className="bg-emerald-100/50 border border-emerald-200/40 rounded-lg p-4">
              <p className="text-sm font-semibold text-emerald-900 mb-1 flex items-center gap-2"><i className="ri-flag-line"></i>Jalon Final</p>
              <p className="text-sm text-emerald-800/80">{wsActuel.jalonFinal}</p>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-tools-line"></i>Actions — {wsActuel.actions.length}</h3>
              <div className="space-y-2">
                {wsActuel.actions.map(act => (
                  <ActionCard key={act.id} action={act} />
                ))}
              </div>
            </div>

            {/* Jalons */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-calendar-check-line"></i>Jalons — {wsActuel.jalons.length}</h3>
              <div className="space-y-2">
                {wsActuel.jalons.map(j => (
                  <JalonCard key={j.id} jalon={j} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== VUE ACTIONS ===== */}
        {vueActive === 'actions' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
                <i className="ri-tools-line"></i>{actionsFiltrees.length} Actions
              </h3>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text" placeholder="Rechercher..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 w-40 focus:outline-none focus:border-primary-300 text-sm"
                />
                <select value={filters.statut || 'all'} onChange={(e) => setFilter('statut', e.target.value === 'all' ? null : e.target.value)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer text-sm">
                  <option value="all">Tous</option>
                  <option value="non_demarre">À faire</option><option value="en_cours">En cours</option><option value="termine">Terminé</option><option value="bloque">Bloqué</option>
                </select>
                <button onClick={resetFilters} className="text-xs px-2.5 py-1.5 rounded-full bg-background-100 text-foreground-700 hover:bg-background-200 cursor-pointer whitespace-nowrap">
                  <i className="ri-refresh-line mr-1"></i>Reset
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {actionsFiltrees.map(act => (
                <ActionCard key={act.id} action={act} showWs />
              ))}
            </div>
          </div>
        )}

        {/* ===== VUE TIMELINE ===== */}
        {vueActive === 'timeline' && (
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-calendar-line"></i>Timeline d'Exécution — 4 Phases
            </h3>
            <div className="space-y-4">
              {PRODUCTION_TIMELINE.map((phase, i) => (
                <div key={i} className="bg-background-50 border border-background-200/60 rounded-lg p-5 relative">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 font-bold text-sm">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-sm font-bold text-foreground-950">{phase.nom}</h4>
                        <span className="text-[10px] text-foreground-500 bg-background-100 px-2 py-0.5 rounded-full">{phase.periode}</span>
                      </div>
                      <p className="text-xs text-foreground-600 mb-2">
                        <strong>Budget :</strong> {phase.budget} &nbsp;·&nbsp;
                        <strong>Workstreams :</strong> {phase.workstreams.map(wid => PRODUCTION_WORKSTREAMS.find(w => w.id === wid)?.numero || wid).join(', ')}
                      </p>
                      <div className="bg-accent-100/40 border border-accent-200/40 rounded p-2">
                        <p className="text-xs text-accent-800 flex items-center gap-1.5">
                          <i className="ri-flag-line text-accent-600"></i><strong>Jalon :</strong> {phase.jalon}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== VUE JALONS ===== */}
        {vueActive === 'jalons' && (
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-calendar-check-line"></i>{allJalons.length} Jalons
            </h3>
            <div className="space-y-2">
              {allJalons.sort((a, b) => a.date.localeCompare(b.date)).map(j => (
                <div key={j.id} className="bg-background-50 border border-background-200/60 rounded-lg p-3 flex items-center gap-3 flex-wrap">
                  <Badge label={j.statut === 'atteint' ? 'OK' : j.statut === 'retard' ? 'RETARD' : 'À VENIR'} variant={j.statut} />
                  <Badge label={j.ws.numero} variant={j.ws.id} />
                  <span className="text-xs font-bold text-foreground-950">{j.nom}</span>
                  <div className="flex-1 hidden sm:block"></div>
                  <span className="text-[10px] text-foreground-500">{j.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== VUE DÉPENDANCES ===== */}
        {vueActive === 'dependances' && (
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-git-branch-line"></i>Graphe de Dépendances
            </h3>
            <div className="bg-red-50 border border-red-200/50 rounded-lg p-4 mb-6">
              <p className="text-xs text-red-800 font-semibold mb-1">Dépendance Centrale</p>
              <p className="text-xs text-red-700">{kpis.dependance_centrale}</p>
            </div>
            <div className="space-y-3">
              {dependanceGraph.map(node => (
                <div key={node.ws.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge label={node.ws.numero} variant={node.ws.id} />
                    <span className="text-sm font-bold text-foreground-950">{node.ws.nom}</span>
                    <Badge label={node.ws.statutGlobal === 'critique' ? 'CRITIQUE' : 'EN COURS'} variant={node.ws.statutGlobal} />
                  </div>
                  {node.bloquePar.length > 0 && (
                    <div className="mb-2">
                      <p className="text-[10px] text-foreground-500 mb-1">Bloqué par :</p>
                      <div className="flex gap-1 flex-wrap">
                        {node.bloquePar.map(depId => {
                          const depAction = allActions.find(a => a.id === depId);
                          const depWsId = depAction?.ws.id;
                          const depWs = workstreams.find(w => w.id === depWsId);
                          return (
                            <span key={depId} className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap">
                              {depWs?.numero} {depAction?.id}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {node.bloque.length > 0 && (
                    <div>
                      <p className="text-[10px] text-foreground-500 mb-1">Bloque :</p>
                      <div className="flex gap-1 flex-wrap">
                        {node.bloque.map(blockedId => {
                          const blockedWs = workstreams.find(w => w.id === blockedId);
                          return (
                            <span key={blockedId} className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 whitespace-nowrap">
                              {blockedWs?.numero}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {node.bloquePar.length === 0 && node.bloque.length === 0 && (
                    <p className="text-[10px] text-foreground-400">Aucune dépendance</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== BOTTOM NAV ===== */}
        <div className="mt-10 pt-6 border-t border-background-200/50">
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1 flex-wrap">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
              { key: 'actions', label: 'Actions', icon: 'ri-tools-line' },
              { key: 'jalons', label: 'Jalons', icon: 'ri-calendar-check-line' },
              { key: 'timeline', label: 'Timeline', icon: 'ri-calendar-line' },
              { key: 'dependances', label: 'Dépendances', icon: 'ri-git-branch-line' },
            ].map(tab => (
              <button key={tab.key} onClick={() => setVueActive(tab.key as PSVueActive)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${vueActive === tab.key ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i><span>{tab.label}</span>
              </button>
            ))}
            <span className="text-xs text-foreground-400 flex items-center px-2">|</span>
            {workstreams.map(ws => (
              <button key={ws.id} onClick={() => selectWs(ws.id)} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${wsSelectionne === ws.id ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                <span className="text-[9px] font-mono font-bold">{ws.numero}</span><span>{ws.acronyme}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </hubLayout>
  );
}

// ===== WORKSTREAM CARD =====
function WorkstreamCard({ ws, onClick }: { ws: ProductionWorkstream; onClick: () => void }) {
  const sc = getScoreColor(ws.scoreActuel);
  return (
    <div className="bg-background-50 border border-background-200/60 rounded-xl p-4 hover:border-background-300/80 transition-all cursor-pointer group" onClick={onClick}>
      <div className="flex items-start gap-4 flex-col sm:flex-row">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-100 text-primary-700">
            <span className="text-lg font-bold font-mono">{ws.numero}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-sm font-bold text-foreground-950">{ws.nom}</h3>
            <Badge label={ws.statutGlobal === 'critique' ? 'CRITIQUE' : 'EN COURS'} variant={ws.statutGlobal} />
          </div>
          <p className="text-xs text-foreground-500 mb-2">{ws.acronyme} · {ws.responsable}</p>
          <div className="flex items-center gap-3 flex-wrap text-[10px] text-foreground-500 mb-2">
            <span><i className="ri-tools-line mr-0.5"></i>{ws.actions.length} actions</span>
            <span><i className="ri-calendar-check-line mr-0.5"></i>{ws.jalons.length} jalons</span>
            <span><i className="ri-money-dollar-circle-line mr-0.5"></i>{ws.budgetTotal}</span>
          </div>
          <p className="text-[10px] text-foreground-400 line-clamp-2">{ws.description}</p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <CircularGauge value={ws.scoreActuel} size={40} strokeWidth={3} color={sc} />
          <i className="ri-arrow-right-line text-xs text-foreground-400 group-hover:text-foreground-700 transition-colors"></i>
        </div>
      </div>
    </div>
  );
}

// ===== ACTION CARD =====
function ActionCard({ action, showWs = false }: { action: SovereigntyAction & { ws?: ProductionWorkstream }; showWs?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 cursor-pointer hover:border-background-300/80 transition-colors" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <Badge label={action.statut === 'non_demarre' ? 'À faire' : action.statut === 'en_cours' ? 'En cours' : action.statut === 'termine' ? 'Terminé' : 'Bloqué'} variant={action.statut} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="text-[10px] font-mono text-foreground-400">{action.id}</span>
            {showWs && action.ws && (
              <Badge label={action.ws.numero} variant={action.ws.id} />
            )}
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700 whitespace-nowrap">{action.standardVise}</span>
          </div>
          <h4 className="text-sm font-semibold text-foreground-950 mb-1">{action.action}</h4>
          <div className="flex items-center gap-3 text-[10px] text-foreground-500 flex-wrap">
            <span><i className="ri-money-dollar-circle-line mr-0.5"></i>{action.budget}</span>
            <span><i className="ri-time-line mr-0.5"></i>{action.effort}</span>
            <span><i className="ri-user-line mr-0.5"></i>{action.responsable}</span>
            <span><i className="ri-calendar-line mr-0.5"></i>{action.deadline}</span>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden hidden sm:block">
            <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: `${action.progression}%` }}></div>
          </div>
          <span className="text-[10px] font-bold text-foreground-500">{action.progression}%</span>
          {expanded ? <i className="ri-arrow-up-s-line text-xs text-foreground-400"></i> : <i className="ri-arrow-down-s-line text-xs text-foreground-400"></i>}
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-background-200/40 space-y-2">
          <p className="text-xs text-foreground-600 leading-relaxed">{action.description}</p>
          <div className="bg-red-50 border border-red-100 rounded p-2">
            <p className="text-[10px] text-red-700 leading-relaxed"><strong>Pourquoi :</strong> {action.pourquoiAction}</p>
          </div>
          <div className="flex items-center gap-3 text-[10px] flex-wrap">
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full"><i className="ri-flag-line mr-0.5"></i>KPI : {action.kpi}</span>
            <span className="bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full"><i className="ri-file-list-3-line mr-0.5"></i>Livrable : {action.livrable}</span>
          </div>
          {action.dependances.length > 0 && (
            <div className="flex items-center gap-1 text-[9px]">
              <span className="text-foreground-500">Dépendances :</span>
              {action.dependances.map(d => (
                <span key={d} className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-mono">{d}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== JALON CARD =====
function JalonCard({ jalon }: { jalon: SovereigntyMilestone & { ws?: ProductionWorkstream } }) {
  const iconMap: Record<string, string> = {
    atteint: 'ri-checkbox-circle-fill text-emerald-500',
    retard: 'ri-error-warning-fill text-red-500',
    a_venir: 'ri-time-line text-foreground-400',
  };
  return (
    <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 flex items-center gap-3">
      <i className={`${iconMap[jalon.statut] || 'ri-time-line text-foreground-400'} text-lg`}></i>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground-950">{jalon.nom}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <Badge label={jalon.statut === 'atteint' ? 'OK' : jalon.statut === 'retard' ? 'RETARD' : 'À VENIR'} variant={jalon.statut} />
          <span className="text-[10px] text-foreground-500">{jalon.date}</span>
        </div>
      </div>
      {jalon.ws && <Badge label={jalon.ws.numero} variant={jalon.ws.id} />}
    </div>
  );
}



