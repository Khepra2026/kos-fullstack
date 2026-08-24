import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useEnterpriseTransformationAssessment360 } from '@/hooks/useEnterpriseTransformationAssessment360';
import { ROADMAP_12M, ROADMAP_24M, ROADMAP_36M } from '@/mocks/enterpriseTransformationAssessment360';
import type { AuditAxe, AuditRiskItem, SWOTItem, PESTELItem } from '@/mocks/enterpriseTransformationAssessment360';

const MATURITE_LABELS: Record<number, string> = {
  0: 'Inexistant',
  1: 'Initial / Ad hoc',
  2: 'Répétable',
  3: 'Standardisé',
  4: 'Maîtrisé et piloté',
  5: 'Optimisé — Leader mondial',
};

const MATURITE_COLORS: Record<number, string> = {
  0: 'bg-red-100 text-red-700 border-red-200',
  1: 'bg-red-100 text-red-700 border-red-200',
  2: 'bg-amber-100 text-amber-700 border-amber-200',
  3: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  4: 'bg-accent-100 text-accent-700 border-accent-200',
  5: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const PRIORITY_COLORS: Record<string, string> = {
  P0: 'bg-red-100 text-red-700 border-red-200',
  P1: 'bg-amber-100 text-amber-700 border-amber-200',
  P2: 'bg-secondary-100 text-secondary-700 border-secondary-200',
};

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

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    critique: 'bg-red-100 text-red-700 border-red-200',
    eleve: 'bg-amber-100 text-amber-700 border-amber-200',
    modere: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    faible: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    actif: 'bg-red-100 text-red-700 border-red-200',
    mitige: 'bg-amber-100 text-amber-700 border-amber-200',
    resolu: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    P0: 'bg-red-100 text-red-700 border-red-200',
    P1: 'bg-amber-100 text-amber-700 border-amber-200',
    P2: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    default: 'bg-background-200 text-foreground-600 border-background-200',
  };
  const classes = bgMap[variant] || bgMap.default;
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap font-medium ${classes}`}>{label}</span>;
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'emerald';
  if (score >= 80) return 'accent';
  if (score >= 70) return 'amber';
  return 'red';
}

function getMaturiteColor(mat: number): string {
  if (mat >= 4) return 'emerald';
  if (mat >= 3) return 'accent';
  if (mat >= 2) return 'amber';
  return 'red';
}

export default function enterpriseTransformationAssessmentPage() {
  const {
    axes, filteredRisks, swot, pestel,
    currentRoadmap, report, kpis, meta,
    activeTab, setActiveTab, navigateToAxe, activeAxe,
    loading, error, refetch,
    roadmapPeriod, setRoadmapPeriod,
    expandedAxe, setExpandedAxe,
    expandedRisk, setExpandedRisk,
    riskFilter, setRiskFilter,
  } = useEnterpriseTransformationAssessment360();

  const [swotTab, setSwotTab] = useState<'forces' | 'faiblesses' | 'opportunites' | 'menaces'>('forces');
  const swotData: Record<string, SWOTItem[]> = {
    forces: swot.forces,
    faiblesses: swot.faiblesses,
    opportunites: swot.opportunites,
    menaces: swot.menaces,
  };

  if (loading) {
    return (
      <hubLayout hubId={83} activeTab="dashboard" tabLabel="ETA 360°">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Exécution de l'Audit Intégral 360°...</span>
            </div>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && axes.length === 0) {
    return (
      <hubLayout hubId={83} activeTab="dashboard" tabLabel="ETA 360°">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div>
            <p className="text-sm text-red-700 font-medium">Erreur d'exécution</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réexécuter</button>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={83} activeTab={activeTab === 'axe' ? 'axe' : activeTab} tabLabel="ETA 360°">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">
              {meta.auditId}
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>EXÉCUTÉ — {meta.auditDate}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">
            Enterprise Transformation Assessment 360°
          </h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Audit intégral KHEPRA EXPERTS &amp; KOS — <strong>20 axes</strong>, <strong>{kpis.criteres_total} critères</strong>, <strong>{kpis.actions_totales} actions</strong>, <strong>{kpis.risques_total} risques</strong>. Score global <strong className="text-foreground-950">{kpis.score_global}/100</strong> — cible <strong className="text-emerald-700">{kpis.score_cible}/100</strong>. Référentiels : ISO 9001, ISO 27001, ISO 31000, COSO ERM, COBIT, ITIL, NIST CSF, TOGAF, PMBOK, BABOK, OWASP ASVS, OHADA, BCEAO, COBAC, CIMA, IFC PS, ISSB, GRI.
          </p>
        </div>

        {/* ===== DASHBOARD ===== */}
        {activeTab === 'dashboard' && (
          <>
            {/* Global Score */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col items-center gap-2">
                <CircularGauge value={kpis.score_global} size={72} strokeWidth={6} color={getScoreColor(kpis.score_global)} />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Global</p><p className="text-sm font-bold text-foreground-950">{kpis.score_global}/100</p></div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col items-center gap-2">
                <CircularGauge value={kpis.score_cible} size={72} strokeWidth={6} color="emerald" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Cible</p><p className="text-sm font-bold text-foreground-950">{kpis.score_cible}/100</p></div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-2xl font-bold text-foreground-950">{kpis.axes_total}</span>
                <p className="text-[10px] text-foreground-500">Axes d'audit</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-2xl font-bold text-foreground-950">{kpis.maturite_moyenne}</span>
                <p className="text-[10px] text-foreground-500">Maturité moyenne /5</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2"><span className="text-lg font-bold text-red-600">{kpis.risques_critiques}</span><span className="text-[10px] text-foreground-500">risques critiques</span></div>
                <div className="flex items-center gap-2 mt-1"><span className="text-lg font-bold text-amber-600">{kpis.axes_action}</span><span className="text-[10px] text-foreground-500">axes en action</span></div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-2xl font-bold text-foreground-950">{kpis.actions_totales}</span>
                <p className="text-[10px] text-foreground-500">Actions correctives</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-2xl font-bold text-primary-500">{kpis.actions_p0}</span>
                <p className="text-[10px] text-foreground-500">Actions P0</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col justify-center">
                <span className="text-lg font-bold text-foreground-950">{kpis.budget_total_12m}</span>
                <p className="text-[10px] text-foreground-500">Budget 12 mois</p>
              </div>
            </div>

            {/* Distribution */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              <div className="bg-emerald-50 border border-emerald-200/40 rounded-lg p-3 text-center"><span className="text-xl font-bold text-emerald-700">{kpis.axes_excellence}</span><p className="text-[9px] text-foreground-500">Excellence (≥90)</p></div>
              <div className="bg-accent-50 border border-accent-200/40 rounded-lg p-3 text-center"><span className="text-xl font-bold text-accent-700">{kpis.axes_maitrise}</span><p className="text-[9px] text-foreground-500">Maîtrise (80-89)</p></div>
              <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-3 text-center"><span className="text-xl font-bold text-amber-700">{kpis.axes_surveillance}</span><p className="text-[9px] text-foreground-500">Surveillance (70-79)</p></div>
              <div className="bg-red-50 border border-red-200/40 rounded-lg p-3 text-center"><span className="text-xl font-bold text-red-600">{kpis.axes_action}</span><p className="text-[9px] text-foreground-500">Action (60-69)</p></div>
              <div className="bg-red-100 border border-red-300/40 rounded-lg p-3 text-center"><span className="text-xl font-bold text-red-700">{kpis.axes_critique}</span><p className="text-[9px] text-foreground-500">Critique (&lt;60)</p></div>
            </div>

            {/* 20 Axes Grid */}
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-layout-grid-line"></i>20 Axes d'Évaluation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {axes.map(a => {
                const sc = getScoreColor(a.score_actuel);
                const mc = getMaturiteColor(a.maturite);
                return (
                  <div key={a.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors cursor-pointer group" onClick={() => navigateToAxe(a.id)}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : a.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                        <i className={`${a.icon} text-lg`}></i>
                      </div>
                      <CircularGauge value={a.score_actuel} size={36} strokeWidth={3} color={sc} />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-foreground-400">Axe {a.numero}</span>
                      <Badge label={MATURITE_LABELS[a.maturite].split(' — ')[0]} variant={mc === 'emerald' ? 'resolu' : mc === 'accent' ? 'P2' : mc === 'amber' ? 'P1' : 'P0'} />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1">{a.acronyme}</h4>
                    <p className="text-[11px] text-foreground-600 line-clamp-2 mb-2">{a.nom}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-foreground-500">Écart {a.ecart} pts</span>
                      <span className="text-[10px] text-foreground-500">{a.actions.length} actions</span>
                      <i className="ri-arrow-right-line text-xs text-foreground-400 group-hover:text-foreground-700 transition-colors"></i>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Score Rankings */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Classement par Score</h3>
              <div className="space-y-2">
                {[...axes].sort((a, b) => b.score_actuel - a.score_actuel).map(a => (
                  <div key={a.id} className="flex items-center gap-3 cursor-pointer hover:bg-background-100/50 rounded-lg px-3 py-2 transition-colors" onClick={() => navigateToAxe(a.id)}>
                    <CircularGauge value={a.score_actuel} size={32} strokeWidth={3} color={getScoreColor(a.score_actuel)} />
                    <span className="text-xs font-medium text-foreground-800 w-28 whitespace-nowrap">{a.acronyme}</span>
                    <span className="text-[10px] text-foreground-500 w-48 truncate hidden sm:block">{a.nom}</span>
                    <div className="flex-1">
                      <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${a.score_actuel >= 90 ? 'bg-emerald-500' : a.score_actuel >= 80 ? 'bg-accent-500' : a.score_actuel >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${a.score_actuel}%` }}></div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-foreground-950 w-8 text-right">{a.score_actuel}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ===== AXE DETAIL ===== */}
        {activeTab === 'axe' && activeAxe && (
          <div className="space-y-6">
            <div className={`rounded-lg p-5 border ${activeAxe.couleur === 'accent' ? 'bg-accent-50/30 border-accent-200/40' : activeAxe.couleur === 'secondary' ? 'bg-secondary-50/30 border-secondary-200/40' : 'bg-primary-50/30 border-primary-200/40'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${activeAxe.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : activeAxe.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                  <i className={`${activeAxe.icon} text-xl`}></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground-950">Axe {activeAxe.numero} — {activeAxe.nom}</h2>
                  <p className="text-xs text-foreground-500">{activeAxe.acronyme} — Référentiel : {activeAxe.standard_reference.split('·')[0].trim()}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-600 leading-relaxed">{activeAxe.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                <div className="rounded-lg p-3 text-center bg-background-50">
                  <CircularGauge value={activeAxe.score_actuel} size={48} strokeWidth={4} color={getScoreColor(activeAxe.score_actuel)} />
                  <p className="text-[10px] text-foreground-500 mt-1">Score Actuel</p>
                </div>
                <div className="rounded-lg p-3 text-center bg-background-50">
                  <CircularGauge value={activeAxe.score_cible} size={48} strokeWidth={4} color="emerald" />
                  <p className="text-[10px] text-foreground-500 mt-1">Score Cible</p>
                </div>
                <div className="rounded-lg p-3 text-center bg-background-50 flex flex-col justify-center">
                  <span className="text-2xl font-bold text-foreground-950">{activeAxe.ecart}</span>
                  <p className="text-[10px] text-foreground-500 mt-1">Écart (pts)</p>
                </div>
                <div className="rounded-lg p-3 text-center bg-background-50 flex flex-col justify-center">
                  <span className={`text-2xl font-bold ${getMaturiteColor(activeAxe.maturite) === 'emerald' ? 'text-emerald-700' : getMaturiteColor(activeAxe.maturite) === 'accent' ? 'text-accent-700' : getMaturiteColor(activeAxe.maturite) === 'amber' ? 'text-amber-700' : 'text-red-700'}`}>{activeAxe.maturite}/5</span>
                  <p className="text-[10px] text-foreground-500 mt-1">Maturité</p>
                </div>
                <div className="rounded-lg p-3 text-center bg-background-50 flex flex-col justify-center">
                  <span className="text-lg font-bold text-foreground-950">{activeAxe.actions.length} actions</span>
                  <p className="text-[10px] text-foreground-500 mt-1">{activeAxe.criteres.length} critères</p>
                </div>
              </div>
            </div>

            {/* Gap Analysis */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-search-eye-line"></i>Analyse des Écarts</h3>
              <p className="text-sm text-foreground-600 leading-relaxed">{activeAxe.gap_analysis}</p>
            </div>

            {/* Critères */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-list-check-3"></i>Critères d'Évaluation — {activeAxe.criteres.length}</h3>
              <div className="space-y-2">
                {activeAxe.criteres.map(c => (
                  <div key={c.id} className="bg-background-50 border border-background-200/60 rounded-lg p-3 flex items-center gap-3">
                    <CircularGauge value={c.score} size={36} strokeWidth={3} color={getScoreColor(c.score)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-foreground-400">{c.id}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${MATURITE_COLORS[c.maturite]}`}>Niv.{c.maturite}</span>
                      </div>
                      <p className="text-xs font-medium text-foreground-950">{c.critere}</p>
                      <p className="text-[10px] text-foreground-500 mt-0.5">{c.observation}</p>
                    </div>
                    <span className="text-[10px] text-accent-600 hidden sm:block">{c.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Correctives */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-tools-line"></i>Actions Correctives — {activeAxe.actions.length}</h3>
              <div className="space-y-3">
                {activeAxe.actions.map(action => (
                  <div key={action.id} className={`bg-background-50 border rounded-lg p-4 ${action.priorite === 'P0' ? 'border-red-200/60 bg-red-50/5' : action.priorite === 'P1' ? 'border-amber-200/60 bg-amber-50/5' : 'border-background-200/60'}`}>
                    <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-foreground-400 bg-background-100 px-2 py-0.5 rounded">{action.id}</span>
                        <Badge label={action.priorite} variant={action.priorite} />
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1.5">{action.action}</h4>
                    <p className="text-xs text-foreground-600 leading-relaxed mb-3">{action.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-foreground-500">
                      <span><i className="ri-money-dollar-circle-line mr-1 text-foreground-400"></i><strong className="text-foreground-700">{action.budget}</strong></span>
                      <span><i className="ri-calendar-line mr-1 text-foreground-400"></i>{action.effort}</span>
                      <span><i className="ri-user-line mr-1 text-foreground-400"></i>{action.responsable}</span>
                      <span><i className="ri-bar-chart-line mr-1 text-foreground-400"></i>{action.kpi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-bar-chart-2-line"></i>KPIs</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeAxe.kpis.map(kpi => (
                  <div key={kpi.nom} className="text-center">
                    <div className="flex justify-center mb-1">
                      <CircularGauge value={kpi.cible > 0 ? Math.round((kpi.valeur / kpi.cible) * 100) : kpi.valeur} size={44} strokeWidth={4} color={kpi.cible > 0 && kpi.valeur >= kpi.cible * 0.9 ? 'emerald' : kpi.valeur >= kpi.cible * 0.7 ? 'amber' : 'red'} />
                    </div>
                    <p className="text-[10px] text-foreground-500 leading-tight">{kpi.nom}</p>
                    <p className="text-[9px] text-foreground-400">{kpi.valeur}{kpi.unite} / {kpi.cible}{kpi.unite}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== SWOT ===== */}
        {activeTab === 'swot' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-foreground-950 flex items-center gap-2"><i className="ri-focus-2-line"></i>Analyse SWOT</h2>
            <div className="flex gap-2 flex-wrap mb-4">
              {(['forces', 'faiblesses', 'opportunites', 'menaces'] as const).map(tab => (
                <button key={tab} onClick={() => setSwotTab(tab)} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  swotTab === tab ? (tab === 'forces' ? 'bg-emerald-500 text-background-50' : tab === 'faiblesses' ? 'bg-red-500 text-background-50' : tab === 'opportunites' ? 'bg-accent-500 text-background-50' : 'bg-amber-500 text-background-50') : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                }`}>
                  {tab === 'forces' ? '💪 Forces' : tab === 'faiblesses' ? '⚠️ Faiblesses' : tab === 'opportunites' ? '🚀 Opportunités' : '⚡ Menaces'}
                  <span className="ml-1 opacity-70">({swotData[tab].length})</span>
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {swotData[swotTab].map(item => (
                <div key={item.id} className={`bg-background-50 border rounded-lg p-4 ${swotTab === 'forces' ? 'border-emerald-200/60' : swotTab === 'faiblesses' ? 'border-red-200/60' : swotTab === 'opportunites' ? 'border-accent-200/60' : 'border-amber-200/60'}`}>
                  <div className="flex items-start gap-3">
                    <CircularGauge value={item.impact} size={40} strokeWidth={3} color={swotTab === 'forces' ? 'emerald' : swotTab === 'faiblesses' ? 'red' : swotTab === 'opportunites' ? 'accent' : 'amber'} />
                    <p className="text-sm text-foreground-800 leading-relaxed">{item.contenu}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== PESTEL ===== */}
        {activeTab === 'pestel' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-foreground-950 flex items-center gap-2"><i className="ri-global-line"></i>Analyse PESTEL</h2>
            <p className="text-sm text-foreground-600">Analyse des facteurs Politiques, Économiques, Sociaux, Technologiques, Environnementaux et Légaux.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pestel.map(item => (
                <div key={item.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      item.facteur === 'Politique' ? 'bg-red-100 text-red-700' :
                      item.facteur === 'Économique' ? 'bg-accent-100 text-accent-700' :
                      item.facteur === 'Social' ? 'bg-secondary-100 text-secondary-700' :
                      item.facteur === 'Technologique' ? 'bg-primary-100 text-primary-700' :
                      item.facteur === 'Environnemental' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{item.facteur}</span>
                    <span className="text-[9px] text-foreground-500">{item.horizon}</span>
                  </div>
                  <p className="text-xs text-foreground-700 leading-relaxed">{item.contenu}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[9px] text-foreground-500">Impact :</span>
                    <CircularGauge value={item.impact} size={28} strokeWidth={3} color={item.impact >= 85 ? 'red' : item.impact >= 75 ? 'amber' : 'accent'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== RISQUES ===== */}
        {activeTab === 'risques' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-foreground-950 flex items-center gap-2"><i className="ri-alert-line"></i>Matrice des Risques</h2>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'Tous' },
                  { id: 'critique', label: 'Critiques' },
                  { id: 'eleve', label: 'Élevés' },
                  { id: 'actif', label: 'Actifs' },
                  { id: 'mitige', label: 'Mitigés' },
                ].map(f => (
                  <button key={f.id} onClick={() => setRiskFilter(f.id as typeof riskFilter)} className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    riskFilter === f.id ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                  }`}>{f.label}</button>
                ))}
              </div>
            </div>

            {/* Risk Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background-50 rounded-lg p-3 text-center border border-background-200/60"><span className="text-xl font-bold text-foreground-950">{kpis.risques_total}</span><p className="text-[9px] text-foreground-500">Risques</p></div>
              <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200/40"><span className="text-xl font-bold text-red-600">{kpis.risques_critiques}</span><p className="text-[9px] text-foreground-500">Critiques</p></div>
              <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200/40"><span className="text-xl font-bold text-red-600">{kpis.risques_actifs}</span><p className="text-[9px] text-foreground-500">Actifs</p></div>
              <div className="bg-background-50 rounded-lg p-3 text-center border border-background-200/60"><span className="text-xl font-bold text-amber-600">{kpis.risque_moyen}</span><p className="text-[9px] text-foreground-500">Score Moyen</p></div>
            </div>

            {/* Heatmap */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Matrice de Criticité — Probabilité × Impact</h3>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-[60px_repeat(5,1fr)] min-w-[500px]">
                  <div className=""></div>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="text-center text-[9px] text-foreground-500 py-1">{['Très Faible', 'Faible', 'Modéré', 'Élevé', 'Très Élevé'][i - 1]}</div>
                  ))}
                  {[5, 4, 3, 2, 1].map(prob => (
                    <div key={`row-${prob}`} className="contents">
                      <div className="text-[9px] text-foreground-500 py-2 flex items-center">{['Très Prob.', 'Probable', 'Possible', 'Peu Prob.', 'Rare'][5 - prob]}</div>
                      {[1, 2, 3, 4, 5].map(imp => {
                        const cellScore = prob * imp;
                        const cellRisks = filteredRisks.filter(r => Math.round(r.probabilite / 20) === prob && Math.round(r.impact / 20) === imp);
                        const bg = cellScore >= 15 ? 'bg-red-100/70 border-red-300/50' : cellScore >= 8 ? 'bg-amber-100/70 border-amber-300/50' : 'bg-emerald-100/50 border-emerald-300/30';
                        return (
                          <div key={`${prob}-${imp}`} className={`border rounded p-1 min-h-[40px] ${bg}`}>
                            {cellRisks.map(r => (
                              <div key={r.id} className="text-[8px] font-bold text-foreground-950 bg-background-50/80 rounded px-1 py-0.5 mb-0.5 truncate" title={`${r.axe}: ${r.risque} (Score: ${r.score})`}>
                                {r.id} — {r.score.toFixed(1)}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk List */}
            <div className="space-y-2">
              {filteredRisks.map(r => (
                <div key={r.id} className={`bg-background-50 border rounded-lg p-4 ${r.statut === 'actif' ? 'border-red-200/60' : r.statut === 'mitige' ? 'border-amber-200/60' : 'border-emerald-200/60'}`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-foreground-400">{r.id}</span>
                        <Badge label={r.axe} variant="default" />
                        <Badge label={r.statut} variant={r.statut} />
                        <Badge label={r.criticite} variant={r.criticite} />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950">{r.risque}</h4>
                      <p className="text-xs text-foreground-600 mt-1">{r.mitigation}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-3">
                      <div className="text-center">
                        <CircularGauge value={r.probabilite} size={36} strokeWidth={3} color="amber" />
                        <p className="text-[8px] text-foreground-500 mt-0.5">Prob.</p>
                      </div>
                      <div className="text-center">
                        <CircularGauge value={r.impact} size={36} strokeWidth={3} color="red" />
                        <p className="text-[8px] text-foreground-500 mt-0.5">Impact</p>
                      </div>
                      <div className={`text-center px-2 py-1 rounded ${r.score >= 50 ? 'bg-red-100' : r.score >= 30 ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                        <span className="text-sm font-bold text-foreground-950">{r.score.toFixed(1)}</span>
                        <p className="text-[8px] text-foreground-500">Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ROADMAP ===== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-foreground-950 flex items-center gap-2"><i className="ri-road-map-line"></i>Feuille de Route Stratégique</h2>
              <div className="flex items-center gap-2">
                {(['12', '24', '36'] as const).map(p => (
                  <button key={p} onClick={() => setRoadmapPeriod(p)} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    roadmapPeriod === p ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}>{p} Mois</button>
                ))}
              </div>
            </div>

            {currentRoadmap.map((phase, idx) => (
              <div key={idx} className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">{idx + 1}</div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{phase.phase}</h3>
                    <p className="text-[10px] text-foreground-500">{phase.periode}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground-950">Score projeté</span>
                    <CircularGauge value={phase.score_projete} size={40} strokeWidth={4} color={phase.score_projete >= 95 ? 'emerald' : phase.score_projete >= 88 ? 'accent' : 'amber'} />
                  </div>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-4">{phase.description}</p>
                <div className="space-y-2">
                  {phase.actions.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs bg-background-100 rounded-lg p-2.5">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0 text-primary-700 text-[10px] font-bold">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground-950">{a.action}</p>
                        <p className="text-[10px] text-foreground-500">{a.axe} — KPI : {a.kpi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Trajectory Bar */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Trajectoire vers le Score Cible 95/100</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground-500 w-28">Actuel</span>
                  <div className="flex-1 h-4 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full flex items-center justify-end pr-2" style={{ width: `${kpis.score_global}%` }}>
                      <span className="text-[9px] font-bold text-background-50">{kpis.score_global}</span>
                    </div>
                  </div>
                </div>
                {[...ROADMAP_12M.map((p: any) => ({ ...p })), ...ROADMAP_24M.map((p: any) => ({ ...p })), ...ROADMAP_36M.map((p: any) => ({ ...p }))].map((ph, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-foreground-500 w-28">{ph.periode.split('—')[0].trim()}</span>
                    <div className="flex-1 h-4 bg-background-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full flex items-center justify-end pr-2 ${ph.score_projete >= 95 ? 'bg-emerald-500' : ph.score_projete >= 88 ? 'bg-accent-500' : 'bg-amber-500'}`} style={{ width: `${ph.score_projete}%` }}>
                        <span className="text-[9px] font-bold text-background-50">{ph.score_projete}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Summary */}
            <div className="bg-accent-100/50 border border-accent-200/40 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-accent-900 mb-3 flex items-center gap-2"><i className="ri-money-dollar-circle-line"></i>Budget & ROI</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div><span className="text-accent-700">Budget 12 mois :</span> <span className="font-bold text-accent-900">{kpis.budget_total_12m}</span></div>
                <div><span className="text-accent-700">Budget 24 mois :</span> <span className="font-bold text-accent-900">{kpis.budget_total_24m}</span></div>
                <div><span className="text-accent-700">Budget 36 mois :</span> <span className="font-bold text-accent-900">{kpis.budget_total_36m}</span></div>
                <div className="sm:col-span-3"><span className="text-accent-700">ROI Projeté :</span> <span className="font-bold text-emerald-700">{report.roi_projete}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* ===== RAPPORT ===== */}
        {activeTab === 'rapport' && (
          <div className="space-y-6">
            {/* Report Header */}
            <div className="bg-foreground-950 text-background-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-background-50/60">{meta.auditDate} — {meta.assessor}</p>
                  <h2 className="text-xl md:text-2xl font-bold">Rapport Exécutif — Enterprise Transformation Assessment 360°</h2>
                  <p className="text-sm text-background-50/70 mt-1">Audit intégral selon 20 référentiels internationaux — 20 axes · {kpis.criteres_total} critères · {kpis.actions_totales} actions</p>
                </div>
                <div className="text-center">
                  <CircularGauge value={report.score_global} size={80} strokeWidth={6} color="accent" />
                  <p className="text-[10px] text-background-50/70 mt-1">Score Global</p>
                </div>
              </div>
            </div>

            {/* Certification Status */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-medal-line"></i>Statut de Certification</h3>
              <p className="text-sm text-foreground-600 leading-relaxed">{report.certification}</p>
            </div>

            {/* Axes Scores */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Score par Axe</h3>
              <div className="space-y-2">
                {[...axes].sort((a, b) => b.score_actuel - a.score_actuel).map(a => (
                  <div key={a.id} className="flex items-center gap-3 cursor-pointer hover:bg-background-100/50 rounded px-2 py-1.5 transition-colors" onClick={() => navigateToAxe(a.id)}>
                    <CircularGauge value={a.score_actuel} size={32} strokeWidth={3} color={getScoreColor(a.score_actuel)} />
                    <span className="text-xs font-medium text-foreground-800 w-36 whitespace-nowrap">{a.acronyme} — {a.nom}</span>
                    <div className="flex-1">
                      <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${a.score_actuel >= 90 ? 'bg-emerald-500' : a.score_actuel >= 80 ? 'bg-accent-500' : a.score_actuel >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${a.score_actuel}%` }}></div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-foreground-950 w-8 text-right">{a.score_actuel}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-lightbulb-line"></i>Recommandations Stratégiques</h3>
              <div className="space-y-2">
                {report.recommandations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 ${i === 0 ? 'bg-red-100 text-red-700' : i <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-primary-100 text-primary-700'}`}>{i + 1}</div>
                    <p className="text-foreground-700 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trajectory + Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-accent-100/50 border border-accent-200/40 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-accent-900 mb-2 flex items-center gap-2"><i className="ri-rocket-line"></i>Trajectoire</h3>
                <p className="text-sm text-accent-800/80 leading-relaxed">{report.trajectoire}</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-money-dollar-circle-line"></i>Budget & ROI</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-foreground-600">Budget total</span><span className="font-bold text-foreground-950">{report.budget_total}</span></div>
                  <div className="flex justify-between"><span className="text-foreground-600">ROI projeté</span><span className="font-bold text-emerald-600">{report.roi_projete}</span></div>
                  <div className="flex justify-between"><span className="text-foreground-600">Durée</span><span className="font-bold text-foreground-950">{report.duree_transformation}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== BOTTOM TAB SWITCHER ===== */}
        <div className="mt-10 pt-6 border-t border-background-200/50">
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1 flex-wrap">
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'dashboard' ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-dashboard-line text-sm"></i><span>Dashboard</span>
            </button>
            {axes.map(a => (
              <button key={a.id} onClick={() => navigateToAxe(a.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'axe' && activeAxe?.id === a.id ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
                <i className={`${a.icon} text-sm`}></i><span>{a.acronyme}</span>
              </button>
            ))}
            <button onClick={() => setActiveTab('swot')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'swot' ? 'bg-accent-500 text-background-50 border-accent-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-focus-2-line text-sm"></i><span>SWOT</span>
            </button>
            <button onClick={() => setActiveTab('pestel')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'pestel' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-global-line text-sm"></i><span>PESTEL</span>
            </button>
            <button onClick={() => setActiveTab('risques')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'risques' ? 'bg-amber-500 text-background-50 border-amber-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-alert-line text-sm"></i><span>Risques</span>
            </button>
            <button onClick={() => setActiveTab('roadmap')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'roadmap' ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-road-map-line text-sm"></i><span>Roadmap</span>
            </button>
            <button onClick={() => setActiveTab('rapport')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === 'rapport' ? 'bg-accent-500 text-background-50 border-accent-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className="ri-file-text-line text-sm"></i><span>Rapport</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-medal-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Enterprise Transformation Assessment 360° — 20 Axes · 20 Référentiels Internationaux</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-accent-800/70">
            <span><strong>{kpis.score_global}</strong> score global</span>
            <span><strong>{kpis.actions_totales}</strong> actions</span>
            <span><strong>{kpis.budget_total_12m}</strong> budget 12m</span>
            <span><strong>{kpis.axes_excellence + kpis.axes_maitrise} axes</strong> maîtrisés</span>
            <span><strong>{kpis.risques_total}</strong> risques</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





