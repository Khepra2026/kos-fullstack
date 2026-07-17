import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import {
  executiveSummary,
  kpiCards,
  obligationsNonCouvertes,
  matriceRisques,
  planActions,
  timelineInspections,
  statsSupplementaires,
} from '@/mocks/kosRegulatoryObligationsDashboard';

type Tab = 'overview' | 'risques' | 'obligations' | 'actions';

function RiskGauge({ score, maxScore }: { score: number; maxScore: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const percentage = (score / maxScore) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (pct: number) => {
    if (pct <= 40) return '#16a34a';
    if (pct <= 60) return '#ca8a04';
    if (pct <= 80) return '#ea580c';
    return '#dc2626';
  };

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="oklch(var(--background-200))" strokeWidth="10" />
        <circle
          cx="72" cy="72" r={radius} fill="none" stroke={getColor(percentage)}
          strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground-950 font-heading">{score}</span>
        <span className="text-xs text-foreground-500 font-body">/ {maxScore}</span>
      </div>
    </div>
  );
}

function KPICard({ kpi }: { kpi: typeof kpiCards[0] }) {
  return (
    <div className="p-5 bg-background-50 rounded-xl border border-background-200/70 hover:border-accent-300/60 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${kpi.colorClass}`}>
          <i className={`${kpi.icon} text-lg`}></i>
        </div>
        {kpi.trend === 'up' ? (
          <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600"><i className="ri-arrow-up-line text-xs"></i></span>
        ) : kpi.trend === 'down' ? (
          <span className="flex items-center gap-0.5 text-xs font-semibold text-red-600"><i className="ri-arrow-down-line text-xs"></i></span>
        ) : (
          <span className="flex items-center gap-0.5 text-xs font-semibold text-foreground-500"><i className="ri-subtract-line text-xs"></i></span>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground-950 font-heading mb-1">{kpi.value}</div>
      <p className="text-sm font-semibold text-foreground-700 font-body mb-1">{kpi.label}</p>
      <p className="text-xs text-foreground-500 font-body">{kpi.trendLabel}</p>
    </div>
  );
}

function ObligationCard({ obligation }: { obligation: typeof obligationsNonCouvertes[0] }) {
  const getGraviteStyles = (g: string) => {
    if (g === 'CRITIQUE') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-amber-100 text-amber-700 border-amber-200';
  };

  return (
    <div className="p-5 bg-background-50 rounded-xl border border-background-200/70">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${getGraviteStyles(obligation.gravite)}`}>
            {obligation.gravite}
          </span>
          <span className="text-xs font-bold text-foreground-950 font-mono">{obligation.reference}</span>
        </div>
        <span className="text-xs text-foreground-400">Échéance : {new Date(obligation.echeance).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>
      <h3 className="text-base font-bold text-foreground-950 font-heading mb-2">{obligation.titre}</h3>
      <p className="text-sm text-foreground-600 mb-3 leading-relaxed">{obligation.description}</p>
      <div className="flex items-center gap-4 text-xs text-foreground-500 mb-3">
        <span><i className="ri-user-line mr-1"></i><strong>{obligation.responsable}</strong></span>
        <span className="text-red-600 font-semibold">Amende : {obligation.amendeEncourue}</span>
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-foreground-500">Progression</span>
          <span className="text-xs font-bold text-foreground-950">{obligation.progression}%</span>
        </div>
        <div className="h-2 bg-background-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${obligation.progression >= 60 ? 'bg-emerald-500' : obligation.progression >= 30 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${obligation.progression}%` }}></div>
        </div>
      </div>
      <div className="space-y-1.5">
        {obligation.actions.map((action: string, i: number) => (
          <div key={i} className="flex items-start gap-2 text-xs text-foreground-600">
            <i className={`ri-checkbox-blank-circle-line mt-0.5 ${i === 0 ? 'text-accent-500' : 'text-foreground-400'}`}></i>
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskRow({ risque }: { risque: typeof matriceRisques[0] }) {
  const getCriticiteBadge = (c: string) => {
    if (c === 'CRITIQUE') return 'bg-red-100 text-red-700';
    if (c === 'HAUTE') return 'bg-orange-100 text-orange-700';
    if (c === 'MOYENNE') return 'bg-amber-100 text-amber-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  const getStatutBadge = (s: string) => {
    if (s === 'En cours') return 'bg-accent-100 text-accent-700';
    if (s === 'Planifié') return 'bg-secondary-100 text-secondary-700';
    return 'bg-emerald-100 text-emerald-700';
  };

  return (
    <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 hover:border-background-300/60 transition-colors">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getCriticiteBadge(risque.criticite)}`}>
          {risque.criticite}
        </span>
        <span className="text-xs font-semibold text-secondary-700 bg-secondary-100 px-2 py-0.5 rounded-full">{risque.categorie}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatutBadge(risque.statut)}`}>{risque.statut}</span>
        <span className="text-xs text-foreground-400 ml-auto">Resp: {risque.responsable}</span>
      </div>
      <h4 className="text-sm font-bold text-foreground-950 mb-3">{risque.risque}</h4>
      <div className="grid grid-cols-5 gap-3 mb-3">
        <div className="text-center p-2 bg-background-100 rounded-lg">
          <div className="text-lg font-bold text-foreground-950">{risque.probabilite}</div>
          <div className="text-[10px] text-foreground-500">Probabilité (L)</div>
        </div>
        <div className="text-center p-2 bg-background-100 rounded-lg">
          <div className="text-lg font-bold text-foreground-950">{risque.impact}</div>
          <div className="text-[10px] text-foreground-500">Impact (I)</div>
        </div>
        <div className="text-center p-2 bg-red-50 rounded-lg">
          <div className="text-lg font-bold text-red-700">{risque.brut}</div>
          <div className="text-[10px] text-red-500">Risque Brut</div>
        </div>
        <div className="text-center p-2 bg-amber-50 rounded-lg">
          <div className="text-lg font-bold text-amber-700">{risque.net}</div>
          <div className="text-[10px] text-amber-500">Risque Net</div>
        </div>
        <div className="flex items-center justify-center p-2 bg-background-100 rounded-lg">
          <div className={`w-3 h-3 rounded-full ${risque.net >= 14 ? 'bg-red-500' : risque.net >= 9 ? 'bg-orange-500' : risque.net >= 6 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
        </div>
      </div>
      <div className="text-xs text-foreground-600 mb-2">
        <span className="font-semibold">Contrôles :</span> {risque.controles}
      </div>
      <div className="flex items-start gap-2 text-xs">
        <span className="font-semibold text-accent-600 whitespace-nowrap">Action :</span>
        <span className="text-foreground-600">{risque.action}</span>
      </div>
      <div className="mt-2 text-[10px] text-foreground-400">Échéance : {new Date(risque.echeance).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    </div>
  );
}

function ActionCard({ action }: { action: typeof planActions[0] }) {
  const getPrioriteColor = (p: string) => {
    if (p.startsWith('P0')) return 'bg-red-100 text-red-700 border-red-200';
    if (p.startsWith('P1')) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-amber-100 text-amber-700 border-amber-200';
  };

  return (
    <div className="p-5 bg-background-50 rounded-xl border border-background-200/70">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${getPrioriteColor(action.priorite)}`}>
              {action.priorite}
            </span>
            <span className="text-xs text-foreground-500 font-mono">{action.risqueLie}</span>
          </div>
          <h3 className="text-base font-bold text-foreground-950 font-heading mb-1">{action.action}</h3>
        </div>
        <div className="text-right ml-4 flex-shrink-0">
          <div className="text-2xl font-bold text-foreground-950">{action.progression}%</div>
          <div className="text-xs text-foreground-500">Complété</div>
        </div>
      </div>
      <div className="w-full bg-background-100 rounded-full h-2.5 mb-3">
        <div className={`h-2.5 rounded-full ${action.progression >= 50 ? 'bg-emerald-500' : action.progression >= 25 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${action.progression}%` }}></div>
      </div>
      <div className="space-y-1.5 mb-3">
        {action.etapes.map((etape: string, i: number) => (
          <div key={i} className="flex items-start gap-2 text-xs text-foreground-600">
            <i className={`mt-0.5 ${action.progression > i * 25 ? 'ri-checkbox-circle-line text-emerald-500' : 'ri-checkbox-blank-circle-line text-foreground-400'}`}></i>
            {etape}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-500">
        <span><i className="ri-user-line mr-1"></i>{action.responsable}</span>
        <span><i className="ri-money-euro-circle-line mr-1"></i>{action.budget}</span>
        <span><i className="ri-calendar-line mr-1"></i>{new Date(action.echeance).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>
      <div className="mt-2 pt-2 border-t border-background-100">
        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
          <i className="ri-bar-chart-line"></i>
          KPI : {action.indicateur}
        </span>
      </div>
    </div>
  );
}

export default function KosRegulatoryObligationsDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [filterCriticite, setFilterCriticite] = useState<string>('all');
  const [filterPriorite, setFilterPriorite] = useState<string>('all');

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
    { id: 'risques', label: 'Matrice de Risques', icon: 'ri-shield-flash-line', count: matriceRisques.length },
    { id: 'obligations', label: 'Obligations BCEAO', icon: 'ri-scales-line', count: obligationsNonCouvertes.length },
    { id: 'actions', label: 'Plan d\'Actions', icon: 'ri-tools-line', count: planActions.length },
  ];

  const filteredRisques = filterCriticite === 'all' ? matriceRisques : matriceRisques.filter(r => r.criticite === filterCriticite);
  const filteredActions = filterPriorite === 'all' ? planActions : planActions.filter(a => a.priorite.includes(filterPriorite));

  return (
    <KOSHubLayout hubId="regulatory-obligations">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-red-50/50 to-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-red-700 text-xs font-semibold mb-4">
                <i className="ri-alert-line"></i>
                Risque Net : {executiveSummary.riskLevel} — Score {executiveSummary.riskScore}/100
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Suivi des Obligations Réglementaires
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Dashboard de pilotage des obligations BCEAO, matrice de risques LBC/FT, plans d'actions correctives.
                {executiveSummary.obligationsBCEAO.nonCouvertes} obligations non couvertes sur {executiveSummary.obligationsBCEAO.total} — impact estimé {executiveSummary.impactFinancier}.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <RiskGauge score={executiveSummary.riskScore} maxScore={executiveSummary.maxScore} />
              <div className="text-center px-4 py-3 bg-red-50 rounded-xl border border-red-200">
                <div className="text-xl font-bold text-red-700">{executiveSummary.obligationsBCEAO.nonCouvertes}</div>
                <div className="text-xs text-red-600">obligations</div>
                <div className="text-xs text-red-600">non couvertes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky tabs */}
      <div className="sticky top-0 z-30 bg-background-50/95 backdrop-blur-sm border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50 shadow-sm' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.count !== undefined && <span className="text-xs opacity-60">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* ===== TAB 1 — VUE D'ENSEMBLE ===== */}
        {activeTab === 'overview' && (
          <>
            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kpiCards.map((kpi) => (
                <KPICard key={kpi.id} kpi={kpi} />
              ))}
            </div>

            {/* Timeline + Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Timeline inspections */}
              <div className="lg:col-span-2 p-6 bg-background-50 rounded-xl border border-background-200/70">
                <h2 className="text-lg font-bold text-foreground-950 font-heading mb-5 flex items-center gap-2">
                  <i className="ri-timeline-view text-accent-500"></i>
                  Calendrier — Inspections & Deadlines
                </h2>
                <div className="space-y-0">
                  {timelineInspections.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full mt-1.5 ${item.criticite === 'CRITIQUE' ? 'bg-red-500' : item.criticite === 'HAUTE' ? 'bg-orange-500' : 'bg-amber-500'}`}></div>
                        {i < timelineInspections.length - 1 && <div className="w-0.5 flex-1 bg-background-200 my-1"></div>}
                      </div>
                      <div className="flex-1 min-w-0 pb-5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.criticite === 'CRITIQUE' ? 'bg-red-100 text-red-700' : item.criticite === 'HAUTE' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>
                            {item.type === 'inspection' ? 'INSPECTION' : item.type === 'deadline' ? 'DEADLINE' : 'ÉCHÉANCE'}
                          </span>
                          <span className="text-xs font-semibold text-foreground-950">{item.evenement}</span>
                        </div>
                        <span className="text-xs text-foreground-400">{new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary panel */}
              <div className="space-y-4">
                <div className="p-5 bg-red-50 rounded-xl border border-red-200">
                  <h3 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
                    <i className="ri-error-warning-line"></i>
                    Impact Financier
                  </h3>
                  <div className="text-2xl font-bold text-red-800 mb-1">{executiveSummary.impactFinancier}</div>
                  <p className="text-xs text-red-600 leading-relaxed">{executiveSummary.impactOperationnel}</p>
                </div>
                <div className="p-5 bg-background-50 rounded-xl border border-background-200/70">
                  <h3 className="text-sm font-bold text-foreground-950 mb-3">Contrôles par Catégorie</h3>
                  <div className="space-y-3">
                    {statsSupplementaires.controlesParCategorie.map((cat) => (
                      <div key={cat.categorie}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground-600">{cat.categorie}</span>
                          <span className="text-xs font-bold text-foreground-950">{cat.conformes}/{cat.total}</span>
                        </div>
                        <div className="h-2 bg-background-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${cat.conformes === cat.total ? 'bg-emerald-500' : cat.conformes >= cat.total * 0.7 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${(cat.conformes / cat.total) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Evolution Risque Net */}
            <div className="p-6 bg-background-50 rounded-xl border border-background-200/70">
              <h2 className="text-lg font-bold text-foreground-950 font-heading mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-red-500"></i>
                Évolution du Risque Net — 7 derniers mois
              </h2>
              <div className="flex items-end gap-2 h-28">
                {statsSupplementaires.evolutionRisqueNet.map((point) => (
                  <div key={point.mois} className="flex-1 flex flex-col items-center">
                    <span className={`text-xs font-bold mb-1 ${point.score >= 70 ? 'text-red-600' : point.score >= 60 ? 'text-amber-600' : 'text-emerald-600'}`}>{point.score}</span>
                    <div className="w-full rounded-t-md" style={{ height: `${(point.score / 100) * 100}%`, minHeight: '4px', background: point.score >= 70 ? '#dc2626' : point.score >= 60 ? '#ea580c' : point.score >= 50 ? '#ca8a04' : '#16a34a' }}></div>
                    <span className="text-[10px] text-foreground-400 mt-1">{point.mois}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-foreground-500">
                <span>Janvier : 58/100</span>
                <span className="text-red-600 font-semibold">→ Juillet : 72/100 (+14 pts)</span>
                <span className="text-red-500">Tendance : DÉGRADATION</span>
              </div>
            </div>
          </>
        )}

        {/* ===== TAB 2 — MATRICE DE RISQUES ===== */}
        {activeTab === 'risques' && (
          <>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-semibold text-foreground-500 mr-2">Filtrer :</span>
              {['all', 'CRITIQUE', 'HAUTE', 'MOYENNE'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterCriticite(f)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    filterCriticite === f
                      ? 'bg-foreground-950 text-background-50'
                      : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}
                >
                  {f === 'all' ? 'Tous' : f}
                </button>
              ))}
              <span className="text-xs text-foreground-400 ml-auto">{filteredRisques.length} risque{filteredRisques.length > 1 ? 's' : ''}</span>
            </div>

            {/* Stats summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-red-600">{matriceRisques.filter(r => r.criticite === 'CRITIQUE').length}</div>
                <div className="text-xs text-foreground-500">Critiques</div>
              </div>
              <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-orange-600">{matriceRisques.filter(r => r.criticite === 'HAUTE').length}</div>
                <div className="text-xs text-foreground-500">Élevés</div>
              </div>
              <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-amber-600">{matriceRisques.filter(r => r.criticite === 'MOYENNE').length}</div>
                <div className="text-xs text-foreground-500">Moyens</div>
              </div>
              <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-emerald-600">{matriceRisques.filter(r => r.statut === 'Surveillé').length}</div>
                <div className="text-xs text-foreground-500">Sous contrôle</div>
              </div>
            </div>

            {/* Risk cards */}
            <div className="space-y-4">
              {filteredRisques.map((risque) => (
                <RiskRow key={risque.id} risque={risque} />
              ))}
            </div>
          </>
        )}

        {/* ===== TAB 3 — OBLIGATIONS BCEAO ===== */}
        {activeTab === 'obligations' && (
          <div className="space-y-6">
            <div className="p-5 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-alert-fill text-red-600 text-lg"></i>
                <h2 className="text-lg font-bold text-red-800 font-heading">
                  {executiveSummary.obligationsBCEAO.nonCouvertes} obligations BCEAO non couvertes sur {executiveSummary.obligationsBCEAO.total}
                </h2>
              </div>
              <p className="text-sm text-red-700">
                Impact : {executiveSummary.impactFinancier} d'amende + {executiveSummary.impactOperationnel}. Dernière mise à jour : {new Date(executiveSummary.derniereMiseAJour).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.
              </p>
            </div>

            <div className="space-y-4">
              {obligationsNonCouvertes.map((obl) => (
                <ObligationCard key={obl.id} obligation={obl} />
              ))}
            </div>

            {/* Covered obligations stats */}
            <div className="p-6 bg-emerald-50/60 rounded-xl border border-emerald-200">
              <h2 className="text-lg font-bold text-emerald-800 font-heading mb-4 flex items-center gap-2">
                <i className="ri-check-double-line"></i>
                {executiveSummary.obligationsBCEAO.couvertes} obligations couvertes
              </h2>
              <div className="w-full bg-emerald-100 rounded-full h-4 mb-2">
                <div className="h-4 bg-emerald-500 rounded-full" style={{ width: `${(executiveSummary.obligationsBCEAO.couvertes / executiveSummary.obligationsBCEAO.total) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                <span>{Math.round((executiveSummary.obligationsBCEAO.couvertes / executiveSummary.obligationsBCEAO.total) * 100)}% de couverture</span>
                <span>Cible : 100% avant inspection T1 2027</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB 4 — PLAN D'ACTIONS ===== */}
        {activeTab === 'actions' && (
          <>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-semibold text-foreground-500 mr-2">Priorité :</span>
              {['all', 'P0', 'P1', 'P2'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterPriorite(f)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    filterPriorite === f
                      ? 'bg-foreground-950 text-background-50'
                      : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}
                >
                  {f === 'all' ? 'Toutes' : f}
                </button>
              ))}
              <span className="text-xs text-foreground-400 ml-auto">{filteredActions.length} action{filteredActions.length > 1 ? 's' : ''}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-center">
                <div className="text-2xl font-bold text-red-700">{planActions.filter(a => a.priorite.startsWith('P0')).length}</div>
                <div className="text-xs text-red-600">P0 — Critiques</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-center">
                <div className="text-2xl font-bold text-orange-700">{planActions.filter(a => a.priorite.startsWith('P1')).length}</div>
                <div className="text-xs text-orange-600">P1 — Hautes</div>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <div className="text-2xl font-bold text-amber-700">{planActions.filter(a => a.priorite.startsWith('P2')).length}</div>
                <div className="text-xs text-amber-600">P2 — Moyennes</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <div className="text-2xl font-bold text-emerald-700">{planActions.reduce((s, a) => s + a.budget ? 1 : 0, 0)}</div>
                <div className="text-xs text-emerald-600">Budget total : {planActions.reduce((s, a) => {
                  const num = parseInt(a.budget.replace(/[^0-9]/g, ''));
                  return s + num;
                }, 0).toLocaleString('fr-FR')} FCFA</div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredActions.map((action) => (
                <ActionCard key={action.id} action={action} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom KPI bar */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Résumé Exécutif KOS — Conformité Réglementaire BCEAO</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-xl border border-background-200/70">
              <span className="text-xs text-foreground-500">Risque Net Global</span>
              <div className="text-foreground-950 font-bold text-lg">{executiveSummary.riskScore}/100 — {executiveSummary.riskLevel}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-xl border border-background-200/70">
              <span className="text-xs text-foreground-500">Propriétaire</span>
              <div className="text-foreground-950 font-bold text-sm">{executiveSummary.proprietaire}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-xl border border-background-200/70">
              <span className="text-xs text-foreground-500">Prochaine échéance</span>
              <div className="text-foreground-950 font-bold text-lg">{new Date(executiveSummary.prochaineEcheance).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-xl border border-background-200/70">
              <span className="text-xs text-foreground-500">Prochaine inspection</span>
              <div className="text-red-600 font-bold text-lg">T1 2027 — CENTIF</div>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}