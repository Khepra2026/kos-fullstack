import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSPhase2P0P1, type P2VueActive } from '@/hooks/useKOSPhase2P0P1';
import type { action } from '@/hooks/useKOSPhase1P0Immediate';

function Gauge({ value, size = 36, color = 'primary' }: { value: number; size?: number; color?: string }) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const strokeC: Record<string, string> = { primary: 'stroke-primary-500', accent: 'stroke-accent-500', secondary: 'stroke-secondary-500', emerald: 'stroke-emerald-500', amber: 'stroke-amber-500', red: 'stroke-red-500' };
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${strokeC[color] || 'stroke-primary-500'} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-[9px] font-bold text-foreground-950">{value}%</span>
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const m: Record<string, string> = {
    a_faire: 'bg-background-200 text-foreground-500 border-background-200',
    en_cours: 'bg-amber-100 text-amber-700 border-amber-200',
    termine: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bloque: 'bg-red-100 text-red-700 border-red-200',
    a_venir: 'bg-background-200 text-foreground-500 border-background-200',
    P0: 'bg-red-100 text-red-700 border-red-200',
    P1: 'bg-amber-100 text-amber-700 border-amber-200',
    pending: 'bg-background-200 text-foreground-400 border-background-200',
    active: 'bg-amber-100 text-amber-700 border-amber-200',
    done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    default: 'bg-background-200 text-foreground-600 border-background-200',
  };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap font-medium ${m[variant] || m.default}`}>{label}</span>;
}

function axeColor(axeId: string): string {
  if (axeId === 'axe-marche') return 'primary';
  if (axeId === 'axe-seo-geo') return 'accent';
  if (axeId === 'axe-maturite') return 'secondary';
  return 'primary';
}

function axeIcon(axeId: string): string {
  if (axeId === 'axe-marche') return 'ri-pie-chart-line';
  if (axeId === 'axe-seo-geo') return 'ri-search-eye-line';
  if (axeId === 'axe-maturite') return 'ri-cpu-line';
  if (axeId === 'axe-uiux') return 'ri-layout-5-line';
  return 'ri-stack-line';
}

function ActionCardCompact({ action, onStatusChange, onProgressionChange }: { action: action; onStatusChange: (id: string, statut: action['statut']) => void; onProgressionChange: (id: string, p: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [progLocal, setProgLocal] = useState(action.progression);
  const ac = axeColor(action.axeId);

  const handleStatusClick = (e: React.MouseEvent, statut: action['statut']) => {
    e.stopPropagation();
    onStatusChange(action.id, statut);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setProgLocal(parseInt(e.target.value));
  };

  const handleSliderCommit = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onProgressionChange(action.id, progLocal);
  };

  return (
    <div className="bg-background-50 border border-background-200/60 rounded-lg cursor-pointer hover:border-background-300/80 transition-colors" onClick={() => setExpanded(!expanded)}>
      <div className="p-3">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-${ac}-100 text-${ac}-700`}>
            <i className={`${axeIcon(action.axeId)} text-sm`}></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
              <span className="text-[9px] font-mono text-foreground-400">{action.id}</span>
              <Badge label={action.priorite} variant={action.priorite} />
              <Badge label={`Sprint ${action.sprint}`} variant={action.statut === 'en_cours' ? 'active' : 'a_venir'} />
              <Badge label={action.statut === 'a_faire' ? 'À faire' : action.statut === 'en_cours' ? 'En cours' : action.statut === 'termine' ? 'Terminé' : 'Bloqué'} variant={action.statut} />
            </div>
            <h4 className="text-xs font-semibold text-foreground-950 leading-snug mb-1">{action.action}</h4>
            <div className="flex items-center gap-3 text-[9px] text-foreground-500 flex-wrap">
              <span><i className="ri-money-dollar-circle-line mr-0.5"></i>{action.budget}</span>
              <span><i className="ri-time-line mr-0.5"></i>{action.effort}</span>
              <span><i className="ri-calendar-line mr-0.5"></i>{action.deadline}</span>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {action.statut !== 'en_cours' && action.statut !== 'termine' && (
              <button onClick={(e) => handleStatusClick(e, 'en_cours')} className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap" title="Démarrer">
                <i className="ri-play-fill text-xs"></i>
              </button>
            )}
            {action.statut === 'en_cours' && (
              <button onClick={(e) => handleStatusClick(e, 'termine')} className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap" title="Terminer">
                <i className="ri-check-fill text-xs"></i>
              </button>
            )}
            {action.statut !== 'bloque' && action.statut !== 'termine' && (
              <button onClick={(e) => handleStatusClick(e, 'bloque')} className="w-6 h-6 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap" title="Bloquer">
                <i className="ri-forbid-line text-[10px]"></i>
              </button>
            )}
            {(action.statut === 'bloque' || action.statut === 'termine') && (
              <button onClick={(e) => handleStatusClick(e, 'a_faire')} className="w-6 h-6 rounded-full bg-background-200 text-foreground-400 hover:bg-background-300 flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap" title="Réinitialiser">
                <i className="ri-arrow-go-back-line text-[10px]"></i>
              </button>
            )}
            <Gauge value={action.progression} size={36} color={ac} />
          </div>
        </div>
        {expanded && (
          <div className="mt-3 pt-3 border-t border-background-200/40">
            <p className="text-[10px] text-foreground-600 leading-relaxed mb-3">{action.description}</p>
            <div className="bg-red-50 border border-red-100 rounded p-2 mb-3">
              <p className="text-[9px] text-red-700 leading-relaxed"><strong>Pourquoi :</strong> {action.pourquoiAction}</p>
            </div>
            <div className="flex items-center gap-2 text-[9px] flex-wrap mb-3">
              <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full"><strong>KPI :</strong> {action.kpi}</span>
              <span className="bg-background-100 text-foreground-600 px-1.5 py-0.5 rounded-full"><strong>Livrable :</strong> {action.livrable}</span>
            </div>
            {action.dependances.length > 0 && (
              <div className="flex items-center gap-1 mb-3 flex-wrap text-[9px]">
                <span className="text-foreground-500">Dépendances :</span>
                {action.dependances.map(d => (
                  <span key={d} className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-mono">{d}</span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <span className="text-[9px] text-foreground-500 w-8">Prog.</span>
              <input type="range" min="0" max="100" value={progLocal} onChange={handleSliderChange} onMouseUp={handleSliderCommit} onTouchEnd={handleSliderCommit} className="flex-1 h-1 accent-accent-500 cursor-pointer" />
              <span className="text-[10px] font-bold text-foreground-800 w-8 text-right">{progLocal}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function phase2P0P1Page() {
  const {
    actions, sprints, meta, kpis, actionsFiltrees,
    vueActive, setVueActive,
    filtreSprint, setFiltreSprint,
    filtreAxe, setFiltreAxe,
    filtreStatut, setFiltreStatut,
    filtrePriorite, setFiltrePriorite,
    resetFilters, searchQuery, setSearchQuery,
    getSprintActions, dependancesBloquantes,
    actionsSansDependance, actionsAvecDependance,
    toast, showToast,
    loading, error, fetchData,
    updateActionStatus, updateActionProgression,
  } = useKOSPhase2P0P1();

  const axeCounts = {
    marche: actions.filter(a => a.axeId === 'axe-marche').length,
    seo: actions.filter(a => a.axeId === 'axe-seo-geo').length,
    sys: actions.filter(a => a.axeId === 'axe-maturite').length,
    ux: actions.filter(a => a.axeId === 'axe-uiux').length,
  };

  const handleLaunch = () => {
    showToast('Phase 2 P0-P1 activée — 13 actions, 4 sprints, 120 jours. Objectif : les 2 P0 restantes + les 11 P1 avant le 28 Janvier 2027.');
  };
  const handleMassStart = () => {
    const aFaire = actions.filter(a => a.statut === 'a_faire');
    aFaire.forEach(a => updateActionStatus(a.id, 'en_cours'));
    showToast(`${aFaire.length} actions lancées en bloc !`);
  };
  const handleMassComplete = () => {
    const enCours = actions.filter(a => a.statut === 'en_cours');
    enCours.forEach(a => { updateActionStatus(a.id, 'termine'); updateActionProgression(a.id, 100); });
    showToast(`${enCours.length} actions terminées en bloc !`);
  };
  const handleMassReset = () => {
    const notPending = actions.filter(a => a.statut !== 'a_faire');
    notPending.forEach(a => { updateActionStatus(a.id, 'a_faire'); updateActionProgression(a.id, 0); });
    showToast(`${notPending.length} actions réinitialisées`);
  };

  if (loading) {
    return (
      <hubLayout hubId={212} activeTab="dashboard" tabLabel="Phase 2 P0-P1">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-foreground-600">Chargement des actions depuis Supabase...</p>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error) {
    return (
      <hubLayout hubId={212} activeTab="dashboard" tabLabel="Phase 2 P0-P1">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <i className="ri-error-warning-line text-red-500 text-xl" />
            </div>
            <p className="text-sm text-red-700 mb-2">Erreur de chargement</p>
            <p className="text-xs text-foreground-500 mb-3 max-w-md">{error}</p>
            <button onClick={fetchData} className="px-4 py-2 bg-accent-500 text-white rounded-full text-xs cursor-pointer hover:bg-accent-600 whitespace-nowrap">
              <i className="ri-refresh-line mr-1" />Réessayer
            </button>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={212} activeTab="dashboard" tabLabel="Phase 2 P0-P1">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase bg-accent-600 text-white px-3 py-1 rounded-full font-bold">PHASE 2 P0-P1</span>
            <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full font-medium">{meta.actionsTotal} Actions</span>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">2 P0 restantes</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">11 P1</span>
            <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full">{meta.horizon}</span>
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium font-mono">{meta.budgetTotal}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">
            Phase 2 P0-P1 — Suite Logique de la Phase 1
          </h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Suite directe de la <strong>Phase 1 P0 Immediate.</strong> Les <strong className="text-red-600">2 P0 restantes</strong> (Edge Functions streaming, Lead Magnet interactif) + les <strong className="text-amber-600">11 actions P1</strong> de l'Audit Final. 
            <strong className="text-accent-700"> 4 sprints</strong> — 
            <strong className="text-accent-700"> 120 jours</strong> — 
            <strong className="text-red-600"> 87.5M FCFA.</strong>
          </p>
        </div>

        {/* ===== PANNEAU EXÉCUTION EN BLOC ===== */}
        <div className="bg-accent-50/60 border border-accent-200/60 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className="ri-rocket-2-line"></i></div>
              <div>
                <p className="text-xs font-bold text-accent-800">Exécution en Bloc — Phase 2</p>
                <p className="text-[9px] text-accent-600">{kpis.a_faire} à faire · {kpis.en_cours} en cours · {kpis.termine} terminées · {kpis.bloque} bloquées</p>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button onClick={handleMassStart} disabled={kpis.a_faire === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] font-bold cursor-pointer whitespace-nowrap transition-colors">
                <i className="ri-play-circle-line text-xs"></i>Tout Lancer ({kpis.a_faire})
              </button>
              <button onClick={handleMassComplete} disabled={kpis.en_cours === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] font-bold cursor-pointer whitespace-nowrap transition-colors">
                <i className="ri-check-double-line text-xs"></i>Tout Terminer ({kpis.en_cours})
              </button>
              <button onClick={handleMassReset} disabled={kpis.termine === 0 && kpis.bloque === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-background-200 hover:bg-background-300 text-foreground-600 text-[10px] font-medium cursor-pointer whitespace-nowrap transition-colors">
                <i className="ri-refresh-line text-xs"></i>Reset
              </button>
            </div>
          </div>
        </div>

        {/* ===== TOP KPIs ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-foreground-950">{kpis.actions_total}</span>
            <p className="text-[10px] text-foreground-500">Actions</p>
          </div>
          <div className="bg-accent-50 border border-accent-200/40 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-accent-600">{kpis.progression_globale}%</span>
            <p className="text-[10px] text-foreground-500">Progression</p>
          </div>
          <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-amber-600">{kpis.a_faire}</span>
            <p className="text-[10px] text-foreground-500">À faire</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200/40 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-emerald-600">{kpis.termine}</span>
            <p className="text-[10px] text-foreground-500">Terminées</p>
          </div>
          <div className="bg-red-50 border border-red-200/40 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-red-600">{kpis.p0_restantes}</span>
            <p className="text-[10px] text-foreground-500">P0 restantes</p>
          </div>
          <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-amber-600">{kpis.p1_restantes}</span>
            <p className="text-[10px] text-foreground-500">P1 restantes</p>
          </div>
          <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
            <span className="text-lg font-bold text-accent-700 font-mono">{meta.budgetTotal}</span>
            <p className="text-[10px] text-foreground-500">Budget</p>
          </div>
        </div>

        {/* ===== ALERTE GOUVERNANCE ===== */}
        <div className="bg-accent-50 border border-accent-200/50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center shrink-0 text-accent-600"><i className="ri-alert-line text-sm"></i></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-accent-800">Risque Principal — Dépendance Critique</p>
            <p className="text-xs text-accent-700 mt-1 leading-relaxed">{meta.risquePrincipal}</p>
            <p className="text-xs text-accent-700 mt-1"><strong>Gouvernance :</strong> {meta.gouvernance}</p>
            <p className="text-xs text-accent-700 mt-1"><strong>Jalon Final :</strong> {meta.jalonFinal}</p>
          </div>
          <button onClick={handleLaunch} className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-600 hover:bg-accent-700 text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-play-circle-line text-sm"></i>Lancer Phase 2
          </button>
        </div>

        {/* ===== VUE DASHBOARD ===== */}
        {vueActive === 'dashboard' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-primary-50/40 border border-primary-200/30 rounded-lg p-3 text-center">
                <i className="ri-pie-chart-line text-primary-600 text-xl mb-1"></i>
                <p className="text-lg font-bold text-primary-700">{axeCounts.marche}</p>
                <p className="text-[10px] text-primary-600">Marché & Positionnement</p>
              </div>
              <div className="bg-accent-50/40 border border-accent-200/30 rounded-lg p-3 text-center">
                <i className="ri-search-eye-line text-accent-600 text-xl mb-1"></i>
                <p className="text-lg font-bold text-accent-700">{axeCounts.seo}</p>
                <p className="text-[10px] text-accent-600">SEO/GEO</p>
              </div>
              <div className="bg-secondary-50/40 border border-secondary-200/30 rounded-lg p-3 text-center">
                <i className="ri-cpu-line text-secondary-600 text-xl mb-1"></i>
                <p className="text-lg font-bold text-secondary-700">{axeCounts.sys}</p>
                <p className="text-[10px] text-secondary-600">Maturité KOS</p>
              </div>
              <div className="bg-primary-50/40 border border-primary-200/30 rounded-lg p-3 text-center">
                <i className="ri-layout-5-line text-primary-600 text-xl mb-1"></i>
                <p className="text-lg font-bold text-primary-700">{axeCounts.ux}</p>
                <p className="text-[10px] text-primary-600">UI/UX</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-flashlight-line text-amber-500"></i>Sprint Actuel — {kpis.sprint_actuel.nom}
                <Badge label={kpis.sprint_actuel.statut === 'en_cours' ? 'EN COURS' : 'À VENIR'} variant={kpis.sprint_actuel.statut === 'en_cours' ? 'en_cours' : 'a_venir'} />
              </h3>
              <div className="bg-amber-50/40 border border-amber-200/40 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-xs text-foreground-700"><strong>{kpis.sprint_actuel.periode}</strong> · {kpis.sprint_actuel.jours} jours</p>
                  <span className="text-xs text-amber-700 font-medium">{kpis.sprint_actuel.objectif}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {kpis.sprint_actuel.actions.map(id => {
                    const act = actions.find(a => a.id === id);
                    return act ? (
                      <span key={id} className={`text-[9px] px-2 py-1 rounded-full font-mono whitespace-nowrap ${act.priorite === 'P0' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
                        {act.id} {act.priorite} — {act.action.substring(0, 22)}...
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
              <i className="ri-tools-line"></i>13 Actions P0-P1
            </h3>
            <div className="space-y-2">
              {actions.map(act => (
                <ActionCardCompact key={act.id} action={act} onStatusChange={updateActionStatus} onProgressionChange={updateActionProgression} />
              ))}
            </div>

            <div className="mt-8 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-lightbulb-line text-accent-700 text-lg"></i>
                <span className="text-sm font-semibold text-accent-900">Message Clé — Phase 2 P0-P1</span>
              </div>
              <p className="text-xs text-accent-800/80 leading-relaxed">{meta.messageCle}</p>
            </div>
          </>
        )}

        {/* ===== VUE KANBAN ===== */}
        {vueActive === 'kanban' && (
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-list-check-3"></i>Tableau Kanban — 13 Actions</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground-600 flex items-center gap-1"><i className="ri-checkbox-blank-circle-line text-foreground-400"></i>À FAIRE</span>
                  <span className="text-[10px] bg-background-200 px-2 py-0.5 rounded-full">{actions.filter(a => a.statut === 'a_faire').length}</span>
                </div>
                <div className="space-y-2">
                  {actions.filter(a => a.statut === 'a_faire').map(act => (
                    <div key={act.id} className="bg-background-50 border border-background-200/60 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[9px] font-mono text-foreground-400">{act.id}</span>
                        <Badge label={act.priorite} variant={act.priorite} />
                        <span className={`text-[9px] px-1 py-0 rounded-full bg-${axeColor(act.axeId)}-100 text-${axeColor(act.axeId)}-700`}>{act.axeNom}</span>
                        <span className="text-[9px] text-foreground-400">Sprint {act.sprint}</span>
                      </div>
                      <p className="text-[11px] font-medium text-foreground-800 leading-snug">{act.action}</p>
                      <div className="flex items-center gap-2 mt-1 text-[9px] text-foreground-500 flex-wrap">
                        <span>{act.budget}</span><span>{act.effort}</span>
                      </div>
                      <div className="flex gap-1 mt-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => updateActionStatus(act.id, 'en_cours')} className="text-[8px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 cursor-pointer whitespace-nowrap">Démarrer</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-600 flex items-center gap-1"><i className="ri-play-circle-line"></i>EN COURS</span>
                  <span className="text-[10px] bg-amber-100 px-2 py-0.5 rounded-full text-amber-700">{actions.filter(a => a.statut === 'en_cours').length}</span>
                </div>
                <div className="space-y-2">
                  {actions.filter(a => a.statut === 'en_cours').map(act => (
                    <div key={act.id} className="bg-amber-50/40 border border-amber-200/40 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[9px] font-mono text-foreground-400">{act.id}</span>
                        <Badge label={act.priorite} variant={act.priorite} />
                      </div>
                      <p className="text-[11px] font-medium text-foreground-800 leading-snug">{act.action}</p>
                      <div className="w-full h-1 bg-amber-200 rounded-full mt-2 overflow-hidden">
                        <div className="h-1 bg-amber-500 rounded-full" style={{ width: `${act.progression}%` }}></div>
                      </div>
                      <div className="flex gap-1 mt-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => updateActionStatus(act.id, 'termine')} className="text-[8px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer whitespace-nowrap">Terminer</button>
                        <button onClick={() => updateActionStatus(act.id, 'bloque')} className="text-[8px] px-2 py-0.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer whitespace-nowrap">Bloquer</button>
                      </div>
                    </div>
                  ))}
                  {actions.filter(a => a.statut === 'en_cours').length === 0 && (
                    <p className="text-[10px] text-foreground-400 italic p-3 text-center">Aucune action en cours — lancez le Sprint 1 !</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><i className="ri-check-double-line"></i>TERMINÉ</span>
                  <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full text-emerald-700">{actions.filter(a => a.statut === 'termine').length}</span>
                </div>
                <div className="space-y-2">
                  {actions.filter(a => a.statut === 'termine').map(act => (
                    <div key={act.id} className="bg-emerald-50/40 border border-emerald-200/40 rounded-lg p-3">
                      <p className="text-[11px] font-medium text-foreground-800 leading-snug line-through">{act.action}</p>
                      <div className="flex gap-1 mt-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => updateActionStatus(act.id, 'a_faire')} className="text-[8px] px-2 py-0.5 rounded-full bg-background-200 text-foreground-500 hover:bg-background-300 cursor-pointer whitespace-nowrap">Rouvrir</button>
                      </div>
                    </div>
                  ))}
                  {actions.filter(a => a.statut === 'termine').length === 0 && (
                    <p className="text-[10px] text-foreground-400 italic p-3 text-center">Aucune action terminée — au travail !</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== VUE SPRINTS ===== */}
        {vueActive === 'sprints' && (
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-run-line"></i>4 Sprints · {meta.horizon}
            </h3>
            <div className="space-y-4">
              {sprints.map((sprint) => {
                const sprintActs = getSprintActions(sprint.numero);
                return (
                  <div key={sprint.numero} className="bg-background-50 border border-background-200/60 rounded-xl p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-lg ${sprint.statut === 'en_cours' ? 'bg-amber-100 text-amber-700' : sprint.statut === 'termine' ? 'bg-emerald-100 text-emerald-700' : 'bg-background-200 text-foreground-500'}`}>
                        {sprint.numero}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-foreground-950">{sprint.nom}</h4>
                          <Badge label={sprint.statut === 'en_cours' ? 'EN COURS' : sprint.statut === 'termine' ? 'TERMINÉ' : 'À VENIR'} variant={sprint.statut} />
                        </div>
                        <p className="text-[10px] text-foreground-500">{sprint.periode} · {sprint.jours} jours</p>
                        <p className="text-xs text-foreground-700 mt-1">{sprint.objectif}</p>
                      </div>
                    </div>
                    {sprintActs.length > 0 && (
                      <div className="ml-14 space-y-1.5">
                        {sprintActs.map(a => (
                          <div key={a.id} className="flex items-center gap-2 text-[10px]">
                            <span className={`font-mono w-16 ${a.priorite === 'P0' ? 'text-red-600 font-bold' : 'text-amber-600'}`}>{a.id}</span>
                            <span className="text-foreground-700 flex-1">{a.action}</span>
                            <span className="text-foreground-400">{a.budget}</span>
                            <Badge label={a.priorite} variant={a.priorite} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="bg-emerald-50/50 border border-emerald-200/30 rounded-lg p-4">
                <p className="text-xs text-emerald-800 flex items-center gap-1.5">
                  <i className="ri-flag-line text-emerald-600"></i>
                  <strong>Jalon Final :</strong> {meta.jalonFinal}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== VUE ACTIONS FILTRABLES ===== */}
        {vueActive === 'actions' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className="text-sm font-semibold text-foreground-950 flex items-center gap-2">
                <i className="ri-tools-line"></i>{actionsFiltrees.length} Actions
              </h3>
              <div className="flex gap-2 flex-wrap">
                <input type="text" placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 w-40 focus:outline-none focus:border-primary-300 text-sm" />
                <select value={filtreSprint ?? 'all'} onChange={(e) => setFiltreSprint(e.target.value === 'all' ? null : parseInt(e.target.value))} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer text-sm">
                  <option value="all">Tous sprints</option>
                  <option value="1">Sprint 1</option><option value="2">Sprint 2</option><option value="3">Sprint 3</option><option value="4">Sprint 4</option>
                </select>
                <select value={filtrePriorite || 'all'} onChange={(e) => setFiltrePriorite(e.target.value === 'all' ? null : e.target.value)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer text-sm">
                  <option value="all">Toutes priorités</option>
                  <option value="P0">P0</option><option value="P1">P1</option>
                </select>
                <select value={filtreAxe || 'all'} onChange={(e) => setFiltreAxe(e.target.value === 'all' ? null : e.target.value)} className="text-xs rounded-full px-3 py-1.5 bg-background-50 border border-background-200 text-foreground-700 cursor-pointer text-sm">
                  <option value="all">Tous axes</option>
                  <option value="axe-marche">Marché</option>
                  <option value="axe-seo-geo">SEO/GEO</option>
                  <option value="axe-maturite">Maturité KOS</option>
                  <option value="axe-uiux">UI/UX</option>
                </select>
                <button onClick={resetFilters} className="text-xs px-2.5 py-1.5 rounded-full bg-background-100 text-foreground-700 hover:bg-background-200 cursor-pointer whitespace-nowrap">
                  <i className="ri-refresh-line mr-1"></i>Reset
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {actionsFiltrees.map(act => (
                <ActionCardCompact key={act.id} action={act} onStatusChange={updateActionStatus} onProgressionChange={updateActionProgression} />
              ))}
            </div>
          </div>
        )}

        {/* ===== VUE DÉPENDANCES ===== */}
        {vueActive === 'dependances' && (
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-git-branch-line"></i>Graphe de Dépendances — 13 Actions</h3>
            <p className="text-xs text-foreground-600 mb-1">La dépendance critique : <strong className="text-red-600">SYS-A02 (Edge Functions streaming)</strong> bloque 4 autres actions.</p>
            <p className="text-xs text-foreground-500 mb-6">Flèche A → B signifie que B dépend de A.</p>
            <div className="space-y-3">
              <div className="bg-emerald-50/40 border border-emerald-200/30 rounded-lg p-4">
                <p className="text-xs font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
                  <i className="ri-play-circle-line"></i>Démarrables immédiatement — {actionsSansDependance.length} actions
                </p>
                <div className="flex gap-2 flex-wrap">
                  {actionsSansDependance.map(a => (
                    <span key={a.id} className={`text-[10px] px-2 py-1 rounded-full font-mono ${a.priorite === 'P0' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {a.id} {a.priorite}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50/40 border border-amber-200/30 rounded-lg p-4">
                <p className="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
                  <i className="ri-link"></i>Dépendances actives — {actionsAvecDependance.length} actions
                </p>
                <div className="space-y-2">
                  {actionsAvecDependance.map(a => (
                    <div key={a.id} className="flex items-center gap-2 text-[10px] flex-wrap">
                      <span className={`font-mono font-bold ${a.priorite === 'P0' ? 'text-red-700' : 'text-amber-700'}`}>{a.id}</span>
                      <span className="text-foreground-500">{a.action.substring(0, 35)}...</span>
                      <i className="ri-arrow-right-line text-foreground-400"></i>
                      <span className="text-foreground-600">nécessite</span>
                      {a.dependances.map(d => (
                        <span key={d} className="font-mono bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{d}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50/40 border border-red-200/30 rounded-lg p-4">
                <p className="text-xs font-semibold text-red-800 mb-2 flex items-center gap-1.5">
                  <i className="ri-alert-line"></i>Blocker Critique — SYS-A02 débloque 4 actions
                </p>
                <div className="flex items-center gap-2 text-[10px] flex-wrap">
                  <span className="font-mono bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold">SYS-A02</span>
                  <i className="ri-arrow-right-line text-red-400"></i>
                  <span className="text-red-700">Edge Functions streaming</span>
                  <span className="text-foreground-400">→ débloque</span>
                  <span className="font-mono bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">SYS-A03</span>
                  <span className="font-mono bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">SYS-A04</span>
                  <span className="font-mono bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">SYS-A05</span>
                  <span className="text-foreground-400">(+ UX-A04 indirectement)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== BOTTOM NAV ===== */}
        <div className="mt-10 pt-6 border-t border-background-200/50">
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1 flex-wrap">
            {([
              { key: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
              { key: 'kanban', label: 'Kanban', icon: 'ri-list-check-3' },
              { key: 'sprints', label: 'Sprints', icon: 'ri-run-line' },
              { key: 'actions', label: 'Actions', icon: 'ri-tools-line' },
              { key: 'dependances', label: 'Dépendances', icon: 'ri-git-branch-line' },
            ] as { key: P2VueActive; label: string; icon: string }[]).map(tab => (
              <button key={tab.key} onClick={() => setVueActive(tab.key)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${vueActive === tab.key ? 'bg-accent-500 text-background-50 border-accent-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i><span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===== TOAST ===== */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-accent-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
              <i className="ri-checkbox-circle-line text-lg" />
              <span className="text-sm font-medium">{toast}</span>
            </div>
          </div>
        )}
      </div>
    </hubLayout>
  );
}





