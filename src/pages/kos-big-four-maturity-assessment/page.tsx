import { useState, useEffect } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useBigFourMaturity } from '@/hooks/useBigFourMaturity';
import type { DomainAssessment, RiskMatrixItem, RoadmapPhase, CorrectiveAction } from '@/mocks/kosBigFourMaturityAssessment';

type MaturityTab = 'dashboard' | 'gouvernance' | 'qualite' | 'ia' | 'conformite' | 'risques' | 'cybersecurite' | 'seo' | 'geo' | 'recherche' | 'dev_commercial' | 'matrice_risques' | 'roadmap' | 'readiness_report' | 'execution';

function CircularGauge({ value, size = 40, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  const bgClass = color === 'accent' ? 'text-accent-700' : color === 'secondary' ? 'text-secondary-700' : 'text-primary-700';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className={`absolute text-[10px] font-bold ${bgClass}`}>{value}</span>
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    critique: 'bg-red-100 text-red-700 border-red-200',
    haute: 'bg-amber-100 text-amber-700 border-amber-200',
    moyenne: 'bg-background-200 text-foreground-600 border-background-200',
    actif: 'bg-red-100 text-red-700 border-red-200',
    mitige: 'bg-amber-100 text-amber-700 border-amber-200',
    resolu: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Conforme: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Surveillance: 'bg-amber-100 text-amber-700 border-amber-200',
    'Action Immédiate': 'bg-red-100 text-red-700 border-red-200',
    'En cours': 'bg-accent-100 text-accent-700 border-accent-200',
    Planifié: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    Terminé: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  const classes = bgMap[variant] || 'bg-background-200 text-foreground-600 border-background-200';
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

// ===== ACTION CARD AVEC CONTRÔLES D'EXÉCUTION =====
function ActionCard({ action, onStatusChange, onProgressionChange }: { action: CorrectiveAction; onStatusChange: (id: string, statut: string) => void; onProgressionChange: (id: string, p: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [progLocal, setProgLocal] = useState(action.progression);

  useEffect(() => { setProgLocal(action.progression); }, [action.progression]);

  const handleStatusClick = (e: React.MouseEvent, statut: string) => {
    e.stopPropagation();
    onStatusChange(action.id, statut);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setProgLocal(parseInt(e.target.value));
  };

  const handleSliderCommit = () => {
    onProgressionChange(action.id, progLocal);
  };

  const prioriteBorder = action.priorite === 'critique' ? 'border-red-200/60 bg-red-50/5' : action.priorite === 'haute' ? 'border-amber-200/60 bg-amber-50/5' : 'border-background-200/60';

  return (
    <div className={`bg-background-50 border rounded-lg cursor-pointer hover:border-background-300/80 transition-colors ${prioriteBorder}`} onClick={() => setExpanded(!expanded)}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-foreground-400 bg-background-100 px-2 py-0.5 rounded">{action.id}</span>
            <Badge label={action.priorite} variant={action.priorite} />
            <Badge label={action.statut === 'a_faire' ? 'À faire' : action.statut === 'en_cours' ? 'En cours' : action.statut === 'termine' ? 'Terminé' : 'Bloqué'} variant={action.statut} />
          </div>
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
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
          </div>
        </div>
        <h4 className="text-sm font-semibold text-foreground-950 mb-1.5">{action.action}</h4>
        <p className="text-xs text-foreground-600 leading-relaxed mb-3">{action.description}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-foreground-500">
            <span><i className="ri-money-dollar-circle-line mr-1 text-foreground-400"></i><strong className="text-foreground-700">{action.budget}</strong></span>
            <span><i className="ri-calendar-line mr-1 text-foreground-400"></i>{action.planning}</span>
            <span><i className="ri-user-line mr-1 text-foreground-400"></i>{action.responsable}</span>
            <span><i className="ri-bar-chart-line mr-1 text-foreground-400"></i>{action.kpi}</span>
          </div>
          {/* Mini barre progression */}
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${action.progression >= 100 ? 'bg-emerald-500' : action.progression > 0 ? 'bg-amber-500' : 'bg-background-300'}`} style={{ width: `${action.progression}%` }}></div>
            </div>
            <span className="text-[10px] font-bold text-foreground-700 w-8 text-right">{action.progression}%</span>
          </div>
        </div>
        {expanded && (
          <div className="mt-3 pt-3 border-t border-background-200/40" onClick={(e) => e.stopPropagation()}>
            {/* Slider progression */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] text-foreground-500">Progression</span>
              <input type="range" min="0" max="100" value={progLocal} onChange={handleSliderChange} onMouseUp={handleSliderCommit} onTouchEnd={handleSliderCommit} className="flex-1 h-1 accent-primary-500 cursor-pointer" />
              <span className="text-[10px] font-bold text-foreground-800 w-8 text-right">{progLocal}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatFCFA(val: number): string {
  if (val >= 1000) return `${(val / 1000).toFixed(1)} Md`;
  if (val >= 1) return `${val.toFixed(0)} M`;
  return `${val.toFixed(0)}`;
}

function getStatusBadge(score: number): { label: string; variant: string } {
  if (score >= 95) return { label: 'Conforme', variant: 'Conforme' };
  if (score >= 85) return { label: 'Surveillance', variant: 'Surveillance' };
  return { label: 'Action Immédiate', variant: 'Action Immédiate' };
}

function getScoreColor(score: number): string {
  if (score >= 95) return 'emerald';
  if (score >= 85) return 'amber';
  return 'red';
}

export default function KOSBigFourMaturityAssessmentPage() {
  const { domains, allActions, risks, roadmap12, roadmap24, roadmap36, report, kpis, execKPIs, isLive, loading, error, toast, refetch, updateActionStatus, updateActionProgression, bulkStartAll, bulkCompleteAll, bulkResetAll } = useBigFourMaturity();

  const tabs: { id: MaturityTab; label: string; subtitle: string; icon: string; color: string }[] = [
    { id: 'dashboard', label: 'Dashboard', subtitle: 'Vue d\'ensemble', icon: 'ri-dashboard-line', color: 'primary' },
    ...domains.map(d => ({ id: d.id as MaturityTab, label: d.acronyme, subtitle: d.nom, icon: d.icon, color: d.couleur })),
    { id: 'matrice_risques', label: 'Risques', subtitle: 'Matrice 5×5', icon: 'ri-alert-line', color: 'secondary' },
    { id: 'roadmap', label: 'Roadmap', subtitle: '12·24·36 mois', icon: 'ri-road-map-line', color: 'primary' },
    { id: 'readiness_report', label: 'Rapport Final', subtitle: 'Readiness Report', icon: 'ri-file-text-line', color: 'accent' },
    { id: 'execution', label: 'Exécution', subtitle: 'Pilotage 30 Actions', icon: 'ri-rocket-2-line', color: 'primary' },
  ];

  const [activeTab, setActiveTab] = useState<MaturityTab>('dashboard');
  const [roadmapPeriod, setRoadmapPeriod] = useState<'12' | '24' | '36'>('12');
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const domainTabs = ['gouvernance', 'qualite', 'ia', 'conformite', 'risques', 'cybersecurite', 'seo', 'geo', 'recherche', 'dev_commercial'];
  const activeDomain = domainTabs.includes(activeTab) ? domains.find(d => d.id === activeTab) : undefined;

  if (loading) {
    return (
      <KOSHubLayout hubId={82} activeTab="dashboard" tabLabel="Maturity Assessment">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Chargement du Maturity Assessment...</span>
            </div>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  if (error && domains.length === 0) {
    return (
      <KOSHubLayout hubId={82} activeTab="dashboard" tabLabel="Maturity Assessment">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  const currentRoadmap = roadmapPeriod === '12' ? roadmap12 : roadmapPeriod === '24' ? roadmap24 : roadmap36;

  return (
    <KOSHubLayout hubId={82} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Master Prompt 10 — Big Four</span>
            {isLive ? (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>DONNÉES LIVE
              </span>
            ) : (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Mode MOCK — 10 Domaines · 30 Actions</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KOS Big Four Maturity Assessment&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Évaluation de maturité sur <strong>10 domaines</strong> selon les standards internationaux. Score global <strong className="text-foreground-950">{kpis.score_global}/100</strong> — cible <strong className="text-emerald-700">{kpis.score_cible_global}/100</strong>. <strong>{kpis.domaines_excellence} domaines</strong> en Excellence, <strong>{kpis.domaines_surveillance}</strong> sous Surveillance, <strong>{kpis.domaines_action}</strong> en Action Immédiate.
          </p>
        </div>

        {/* ============================================ */}
        {/* DASHBOARD */}
        {/* ============================================ */}
        {activeTab === 'dashboard' && (
          <>
            {/* Global Score Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col items-center gap-2">
                <CircularGauge value={kpis.score_global} size={72} strokeWidth={6} color="primary" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Global</p><p className="text-sm font-bold text-foreground-950">{kpis.score_global}/100</p></div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center flex flex-col items-center gap-2">
                <CircularGauge value={kpis.score_cible_global} size={72} strokeWidth={6} color="emerald" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Cible</p><p className="text-sm font-bold text-foreground-950">{kpis.score_cible_global}/100</p></div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center"><i className="ri-shield-check-line text-emerald-700 text-lg"></i></div>
                  <div><span className="text-xl font-bold text-emerald-700">{kpis.domaines_excellence}</span><p className="text-[9px] text-foreground-500">Domaines Excellence</p></div>
                </div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"><i className="ri-error-warning-line text-red-600 text-lg"></i></div>
                  <div><span className="text-xl font-bold text-red-600">{kpis.domaines_action}</span><p className="text-[9px] text-foreground-500">Actions Immédiates</p></div>
                </div>
              </div>
            </div>

            {/* 10 Domaines Cards */}
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-layout-grid-line"></i>10 Domaines d'Évaluation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {domains.map(d => {
                const status = getStatusBadge(d.score_actuel);
                return (
                  <div key={d.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors cursor-pointer group" onClick={() => setActiveTab(d.id as MaturityTab)}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${d.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : d.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                        <i className={`${d.icon} text-lg`}></i>
                      </div>
                      <Badge label={status.label} variant={status.variant} />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1">{d.acronyme}</h4>
                    <p className="text-[11px] text-foreground-600 line-clamp-2 mb-3">{d.nom}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-foreground-500">Actuel</span>
                      <span className="text-[10px] text-foreground-500">Cible {d.score_cible}</span>
                    </div>
                    <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full transition-all duration-500 ${d.score_actuel >= 95 ? 'bg-emerald-500' : d.score_actuel >= 85 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${d.score_actuel}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground-950">{d.score_actuel}</span>
                      <span className="text-[10px] text-foreground-500">Écart {d.ecart} pts</span>
                      <i className="ri-arrow-right-line text-xs text-foreground-400 group-hover:text-foreground-700 transition-colors"></i>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions & Budget Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-tools-line text-foreground-600"></i>Actions Correctives</h4>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center"><span className="text-lg font-bold text-red-600">{kpis.actions_critiques}</span><p className="text-[9px] text-foreground-500">Critiques</p></div>
                  <div className="text-center"><span className="text-lg font-bold text-amber-600">{kpis.actions_hautes}</span><p className="text-[9px] text-foreground-500">Hautes</p></div>
                  <div className="text-center"><span className="text-lg font-bold text-foreground-600">{kpis.actions_moyennes}</span><p className="text-[9px] text-foreground-500">Moyennes</p></div>
                </div>
                <div className="text-xs text-foreground-600"><strong>{kpis.actions_correctives_total} actions</strong> documentées — couvrant 100% des écarts identifiés</div>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-money-dollar-circle-line text-foreground-600"></i>Budget & ROI</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-foreground-500">Budget 12 mois</span><span className="font-bold text-foreground-950">{kpis.budget_total_12m}</span></div>
                  <div className="flex justify-between"><span className="text-foreground-500">Budget 24 mois</span><span className="font-bold text-foreground-950">{kpis.budget_total_24m}</span></div>
                  <div className="flex justify-between"><span className="text-foreground-500">Budget 36 mois</span><span className="font-bold text-foreground-950">{kpis.budget_total_36m}</span></div>
                  <div className="flex justify-between border-t border-background-200/50 pt-2"><span className="text-foreground-500">ROI Projeté 12 mois</span><span className="font-bold text-emerald-600">{kpis.roi_projete_12m}</span></div>
                </div>
              </div>
            </div>

            {/* ===== PANNEAU EXÉCUTION EN BLOC ===== */}
            <div className="bg-red-50/60 border border-red-200/60 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600"><i className="ri-rocket-2-line"></i></div>
                  <div>
                    <p className="text-xs font-bold text-red-800">Exécution en Bloc — 30 Actions Big Four</p>
                    <p className="text-[9px] text-red-600">{execKPIs.a_faire} à faire · {execKPIs.en_cours} en cours · {execKPIs.termine} terminées · {execKPIs.bloque} bloquées</p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <button onClick={bulkStartAll} disabled={execKPIs.a_faire === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] font-bold cursor-pointer whitespace-nowrap transition-colors">
                    <i className="ri-play-circle-line text-xs"></i>Tout Lancer ({execKPIs.a_faire})
                  </button>
                  <button onClick={bulkCompleteAll} disabled={execKPIs.en_cours === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] font-bold cursor-pointer whitespace-nowrap transition-colors">
                    <i className="ri-check-double-line text-xs"></i>Tout Terminer ({execKPIs.en_cours})
                  </button>
                  <button onClick={bulkResetAll} disabled={execKPIs.termine === 0 && execKPIs.bloque === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-background-200 hover:bg-background-300 text-foreground-600 text-[10px] font-medium cursor-pointer whitespace-nowrap transition-colors">
                    <i className="ri-refresh-line text-xs"></i>Reset
                  </button>
                </div>
              </div>
              {/* Barre de progression globale */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[9px] text-red-700 w-16">Progression</span>
                <div className="flex-1 h-1.5 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${execKPIs.progression_globale}%` }}></div>
                </div>
                <span className="text-[10px] font-bold text-red-800 w-8 text-right">{execKPIs.progression_globale}%</span>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h4 className="text-sm font-semibold text-foreground-950 mb-4">Scores par Domaine</h4>
              <div className="space-y-3">
                {domains.map(d => (
                  <div key={d.id} className="flex items-center gap-3">
                    <CircularGauge value={d.score_actuel} size={32} strokeWidth={3} color={d.couleur} />
                    <span className="text-xs font-medium text-foreground-800 w-28 whitespace-nowrap">{d.acronyme}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.score_actuel >= 95 ? 'bg-emerald-500' : d.score_actuel >= 85 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${d.score_actuel}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-foreground-950 w-8 text-right">{d.score_actuel}</span>
                    </div>
                    <Badge label={getStatusBadge(d.score_actuel).label} variant={getStatusBadge(d.score_actuel).variant} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ============================================ */}
        {/* DOMAIN DETAIL */}
        {/* ============================================ */}
        {activeDomain && (
          <div className="space-y-6">
            <div className={`rounded-lg p-5 border ${activeDomain.couleur === 'accent' ? 'bg-accent-50/30 border-accent-200/40' : activeDomain.couleur === 'secondary' ? 'bg-secondary-50/30 border-secondary-200/40' : 'bg-primary-50/30 border-primary-200/40'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${activeDomain.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : activeDomain.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                  <i className={`${activeDomain.icon} text-xl`}></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground-950">{activeDomain.nom}</h2>
                  <p className="text-xs text-foreground-500">{activeDomain.acronyme} — Standard : {activeDomain.standard_reference.split('·')[0].trim()}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-600 leading-relaxed">{activeDomain.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className={`rounded-lg p-3 text-center ${activeDomain.score_actuel >= 95 ? 'bg-emerald-100/50' : activeDomain.score_actuel >= 85 ? 'bg-amber-100/50' : 'bg-red-100/50'}`}>
                  <CircularGauge value={activeDomain.score_actuel} size={48} strokeWidth={4} color={activeDomain.score_actuel >= 95 ? 'emerald' : activeDomain.score_actuel >= 85 ? 'amber' : 'red'} />
                  <p className="text-[10px] text-foreground-500 mt-1">Score Actuel</p>
                </div>
                <div className="bg-background-50 rounded-lg p-3 text-center">
                  <CircularGauge value={activeDomain.score_cible} size={48} strokeWidth={4} color="primary" />
                  <p className="text-[10px] text-foreground-500 mt-1">Score Cible</p>
                </div>
                <div className="bg-background-50 rounded-lg p-3 text-center flex flex-col justify-center">
                  <span className="text-2xl font-bold text-foreground-950">{activeDomain.ecart}</span>
                  <p className="text-[10px] text-foreground-500 mt-1">Écart (pts)</p>
                </div>
                <div className="bg-background-50 rounded-lg p-3 text-center flex flex-col justify-center">
                  <span className="text-lg font-bold text-foreground-950">{activeDomain.actions_correctives.length}</span>
                  <p className="text-[10px] text-foreground-500 mt-1">Actions</p>
                </div>
              </div>
            </div>

            {/* Gap Analysis */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-search-eye-line"></i>Analyse des Écarts</h3>
              <p className="text-sm text-foreground-600 leading-relaxed">{activeDomain.gap_analysis}</p>
            </div>

            {/* Actions Correctives */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-tools-line"></i>Actions Correctives — {activeDomain.actions_correctives.length}</h3>
              <div className="space-y-3">
                {activeDomain.actions_correctives.map(action => (
                  <ActionCard key={action.id} action={action} onStatusChange={updateActionStatus} onProgressionChange={updateActionProgression} />
                ))}
              </div>
            </div>

            {/* Domain KPIs */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-bar-chart-2-line"></i>KPIs Domaine</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeDomain.kpis.map(kpi => (
                  <div key={kpi.nom} className="text-center">
                    <div className="flex justify-center mb-1">
                      <CircularGauge value={kpi.valeur} size={44} strokeWidth={4} color={kpi.valeur >= kpi.cible * 0.9 ? 'emerald' : kpi.valeur >= kpi.cible * 0.7 ? 'amber' : 'red'} />
                    </div>
                    <p className="text-[10px] text-foreground-500 leading-tight">{kpi.nom}</p>
                    <p className="text-[9px] text-foreground-400">{kpi.valeur} / {kpi.cible}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* MATRICE DES RISQUES */}
        {/* ============================================ */}
        {activeTab === 'matrice_risques' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-red-600">{risks.filter(r => r.statut === 'actif').length}</span><p className="text-[9px] text-foreground-500">Risques Actifs</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-amber-600">{risks.filter(r => r.statut === 'mitige').length}</span><p className="text-[9px] text-foreground-500">Risques Mitigés</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-emerald-600">{risks.filter(r => r.statut === 'resolu').length}</span><p className="text-[9px] text-foreground-500">Risques Résolus</p></div>
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{(risks.reduce((acc, r) => acc + r.score, 0) / risks.length).toFixed(1)}</span><p className="text-[9px] text-foreground-500">Score Moyen</p></div>
            </div>

            {/* Risk Heatmap 5×5 */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-grid-line"></i>Matrice de Criticité — Probabilité × Impact</h3>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-[60px_repeat(5,1fr)] min-w-[500px]">
                  <div className=""></div>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="text-center text-[9px] text-foreground-500 py-1">{i === 1 ? 'Très Faible' : i === 2 ? 'Faible' : i === 3 ? 'Modéré' : i === 4 ? 'Élevé' : 'Très Élevé'}</div>
                  ))}
                  {[5, 4, 3, 2, 1].map(prob => (
                    <>
                      <div key={`lbl-${prob}`} className="text-[9px] text-foreground-500 py-2 flex items-center">{prob === 5 ? 'Très Prob.' : prob === 4 ? 'Probable' : prob === 3 ? 'Possible' : prob === 2 ? 'Peu Prob. ' : 'Rare'}</div>
                      {[1, 2, 3, 4, 5].map(imp => {
                        const cellScore = prob * imp;
                        const cellRisks = risks.filter(r => Math.round(r.probabilite / 20) === prob && Math.round(r.impact / 20) === imp);
                        const bg = cellScore >= 15 ? 'bg-red-100/70 border-red-300/50' : cellScore >= 8 ? 'bg-amber-100/70 border-amber-300/50' : 'bg-emerald-100/50 border-emerald-300/30';
                        return (
                          <div key={`${prob}-${imp}`} className={`border rounded p-1 min-h-[40px] ${bg}`}>
                            {cellRisks.map(r => (
                              <div key={r.id} className="text-[8px] font-bold text-foreground-950 bg-background-50/80 rounded px-1 py-0.5 mb-0.5 truncate" title={`${r.domaine}: ${r.risque} (Score: ${r.score})`}>{r.domaine} — {r.score}</div>
                            ))}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk List */}
            <div className="space-y-2">
              {risks.map(r => (
                <div key={r.id} className={`bg-background-50 border rounded-lg p-4 ${r.statut === 'actif' ? 'border-red-200/60' : r.statut === 'mitige' ? 'border-amber-200/60' : 'border-emerald-200/60'}`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-foreground-400">{r.id}</span>
                        <Badge label={r.domaine} variant="default" />
                        <Badge label={r.statut} variant={r.statut} />
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

        {/* ============================================ */}
        {/* ROADMAP */}
        {/* ============================================ */}
        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            {/* Period Selector */}
            <div className="flex items-center gap-2 mb-4">
              {(['12', '24', '36'] as const).map(p => (
                <button key={p} onClick={() => setRoadmapPeriod(p)} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  roadmapPeriod === p ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                }`}>{p} Mois</button>
              ))}
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
                    <CircularGauge value={phase.score_projete} size={40} strokeWidth={4} color={phase.score_projete >= 95 ? 'emerald' : phase.score_projete >= 90 ? 'amber' : 'red'} />
                  </div>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-4">{phase.description}</p>
                <div className="space-y-2">
                  {phase.actions.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs bg-background-100 rounded-lg p-2.5">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0 text-primary-700 text-[10px] font-bold">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground-950">{a.action}</p>
                        <p className="text-[10px] text-foreground-500">{a.domaine} — KPI : {a.kpi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Trajectory Bar */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Trajectoire vers le Score Cible {kpis.score_cible_global}/100</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground-500 w-20">Actuel</span>
                  <div className="flex-1 h-4 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full flex items-center justify-end pr-2" style={{ width: '87.3%' }}>
                      <span className="text-[9px] font-bold text-background-50">87.3</span>
                    </div>
                  </div>
                </div>
                {roadmap12.map((ph, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-foreground-500 w-20">{ph.periode.split('—')[0].trim()}</span>
                    <div className="flex-1 h-4 bg-background-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full flex items-center justify-end pr-2 ${ph.score_projete >= 95 ? 'bg-emerald-500' : ph.score_projete >= 90 ? 'bg-amber-500' : 'bg-primary-500'}`} style={{ width: `${ph.score_projete}%` }}>
                        <span className="text-[9px] font-bold text-background-50">{ph.score_projete}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {roadmap24.map((ph, i) => (
                  <div key={`24-${i}`} className="flex items-center gap-3">
                    <span className="text-xs text-foreground-500 w-20">{ph.periode.split('—')[0].trim()}</span>
                    <div className="flex-1 h-4 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full flex items-center justify-end pr-2" style={{ width: `${ph.score_projete}%` }}>
                        <span className="text-[9px] font-bold text-background-50">{ph.score_projete}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {roadmap36.map((ph, i) => (
                  <div key={`36-${i}`} className="flex items-center gap-3">
                    <span className="text-xs text-foreground-500 w-20">{ph.periode.split('—')[0].trim()}</span>
                    <div className="flex-1 h-4 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full flex items-center justify-end pr-2" style={{ width: `${ph.score_projete}%` }}>
                        <span className="text-[9px] font-bold text-background-50">{ph.score_projete}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* EXÉCUTION — Pilotage des 30 Actions */}
        {/* ============================================ */}
        {activeTab === 'execution' && (
          <div className="space-y-4">
            {/* Panneau bulk */}
            <div className="bg-red-50/60 border border-red-200/60 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600"><i className="ri-rocket-2-line"></i></div>
                  <div>
                    <p className="text-xs font-bold text-red-800">Exécution en Bloc — 30 Actions Big Four</p>
                    <p className="text-[9px] text-red-600">{execKPIs.a_faire} à faire · {execKPIs.en_cours} en cours · {execKPIs.termine} terminées · {execKPIs.bloque} bloquées</p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <button onClick={bulkStartAll} disabled={execKPIs.a_faire === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] font-bold cursor-pointer whitespace-nowrap transition-colors">
                    <i className="ri-play-circle-line text-xs"></i>Tout Lancer ({execKPIs.a_faire})
                  </button>
                  <button onClick={bulkCompleteAll} disabled={execKPIs.en_cours === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] font-bold cursor-pointer whitespace-nowrap transition-colors">
                    <i className="ri-check-double-line text-xs"></i>Tout Terminer ({execKPIs.en_cours})
                  </button>
                  <button onClick={bulkResetAll} disabled={execKPIs.termine === 0 && execKPIs.bloque === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-background-200 hover:bg-background-300 text-foreground-600 text-[10px] font-medium cursor-pointer whitespace-nowrap transition-colors">
                    <i className="ri-refresh-line text-xs"></i>Reset
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[9px] text-red-700 w-16">Progression</span>
                <div className="flex-1 h-1.5 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${execKPIs.progression_globale}%` }}></div>
                </div>
                <span className="text-[10px] font-bold text-red-800 w-8 text-right">{execKPIs.progression_globale}%</span>
              </div>
            </div>

            {/* Stats rapides par statut */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-lg font-bold text-foreground-950">{execKPIs.total}</span><p className="text-[9px] text-foreground-500">Total Actions</p></div>
              <div className="bg-amber-50 rounded-lg p-3 text-center"><span className="text-lg font-bold text-amber-600">{execKPIs.a_faire}</span><p className="text-[9px] text-foreground-500">À faire</p></div>
              <div className="bg-emerald-50 rounded-lg p-3 text-center"><span className="text-lg font-bold text-emerald-600">{execKPIs.termine}</span><p className="text-[9px] text-foreground-500">Terminées</p></div>
              <div className="bg-red-50 rounded-lg p-3 text-center"><span className="text-lg font-bold text-red-600">{execKPIs.bloque}</span><p className="text-[9px] text-foreground-500">Bloquées</p></div>
            </div>

            {/* Les 30 actions groupées par domaine */}
            <div className="space-y-6">
              {domains.map(domain => {
                const domainActs = domain.actions_correctives;
                if (domainActs.length === 0) return null;
                const domExec = { a_faire: domainActs.filter(a => a.statut === 'a_faire').length, en_cours: domainActs.filter(a => a.statut === 'en_cours').length, termine: domainActs.filter(a => a.statut === 'termine').length };
                return (
                  <div key={domain.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${domain.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : domain.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                        <i className={`${domain.icon} text-xs`}></i>
                      </div>
                      <span className="text-xs font-bold text-foreground-950">{domain.acronyme}</span>
                      <span className="text-[9px] text-foreground-500">{domain.nom}</span>
                      <span className="text-[9px] text-foreground-400">— {domainActs.length} actions</span>
                      {domExec.en_cours > 0 && <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0 rounded-full">{domExec.en_cours} en cours</span>}
                      {domExec.termine === domainActs.length && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0 rounded-full">✓</span>}
                    </div>
                    <div className="space-y-2">
                      {domainActs.map(action => (
                        <ActionCard key={action.id} action={action} onStatusChange={updateActionStatus} onProgressionChange={updateActionProgression} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* READINESS REPORT */}
        {/* ============================================ */}
        {activeTab === 'readiness_report' && (
          <div className="space-y-6">
            {/* Report Header */}
            <div className="bg-foreground-950 text-background-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-background-50/60">19 Juin 2026 — Consortium PwC · Deloitte · EY · KPMG</p>
                  <h2 className="text-xl md:text-2xl font-bold">KOS Big Four Readiness Report&trade;</h2>
                  <p className="text-sm text-background-50/70 mt-1">Évaluation de maturité institutionnelle — Standards internationaux</p>
                </div>
                <div className="text-center">
                  <CircularGauge value={report.score_global} size={80} strokeWidth={6} color="primary" />
                  <p className="text-[10px] text-background-50/70 mt-1">Score Global</p>
                </div>
              </div>
            </div>

            {/* Certification Status */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-medal-line"></i>Statut de Certification</h3>
              <p className="text-sm text-foreground-600 leading-relaxed">{report.certification}</p>
            </div>

            {/* Domain Scores */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Score par Bloc</h3>
              <div className="space-y-3">
                {report.domaines_scores.map(ds => {
                  const domain = domains.find(d => d.nom.includes(ds.domaine) || d.acronyme === ds.domaine || d.id === ds.domaine.toLowerCase());
                  const status = getStatusBadge(ds.score);
                  return (
                    <div key={ds.domaine} className="flex items-center gap-3">
                      <CircularGauge value={ds.score} size={36} strokeWidth={3} color={ds.score >= 95 ? 'emerald' : ds.score >= 85 ? 'amber' : 'red'} />
                      <span className="text-xs font-medium text-foreground-800 w-32 whitespace-nowrap">{ds.domaine}</span>
                      <div className="flex-1">
                        <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${ds.score >= 95 ? 'bg-emerald-500' : ds.score >= 85 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${ds.score}%` }}></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-foreground-950 w-8 text-right">{ds.score}</span>
                      <Badge label={status.label} variant={status.variant} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-lightbulb-line"></i>Recommandations Stratégiques</h3>
              <div className="space-y-2">
                {report.recommandations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center shrink-0 text-primary-700 text-[10px] font-bold mt-0.5">{i + 1}</div>
                    <p className="text-foreground-700 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trajectoire */}
            <div className="bg-accent-100/50 border border-accent-200/40 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-accent-900 mb-2 flex items-center gap-2"><i className="ri-rocket-line"></i>Trajectoire vers un Niveau ≥ 95/100</h3>
              <p className="text-sm text-accent-800/80 leading-relaxed">{report.trajectoire}</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-accent-700">Certification cible :</span>
                  <span className="text-xs font-bold text-accent-900">{kpis.certification_cible}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-accent-700">Date projetée :</span>
                  <span className="text-xs font-bold text-accent-900">{kpis.certification_date_projetee}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher — Bottom */}
        <div className="mt-10 pt-6 border-t border-background-200/50">
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1 flex-wrap">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'
              }`}>
                <i className={`${t.icon} text-sm`}></i><span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-medal-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Big Four Maturity Assessment&trade; — 10 Domaines · Niveau Big Four</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-accent-800/70">
            <span><strong>{kpis.score_global}</strong> score global</span>
            <span><strong>{kpis.actions_correctives_total}</strong> actions</span>
            <span><strong>{kpis.budget_total_12m}</strong> budget 12m</span>
            <span><strong>{kpis.domaines_excellence} domaines</strong> en Excellence</span>
            <span><strong>{risks.length}</strong> risques</span>
          </div>
        </div>

        {/* ===== TOAST ===== */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
              <i className="ri-checkbox-circle-line text-lg" />
              <span className="text-sm font-medium">{toast}</span>
            </div>
          </div>
        )}
      </div>
    </KOSHubLayout>
  );
}