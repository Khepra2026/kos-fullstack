import { useState, useEffect, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useInnovationESG } from '@/hooks/useInnovationESG';
import { esgDashboardKPIs, innovationDashboardKPIs, methodologyDashboardKPIs } from '@/mocks/innovationESG';

type Tab = 'dashboard' | 'esg' | 'innovation' | 'methodology';

function ScoreBar({ score, max = 100, size = 'sm' }: { score: number; max?: number; size?: 'sm' | 'lg' }) {
  const pct = Math.round((score / max) * 100);
  const color = pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : pct >= 40 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className={`w-full ${size === 'lg' ? 'h-3' : 'h-2'} bg-background-200/70 rounded-full overflow-hidden`}>
      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    completed: { label: 'Terminé', cls: 'bg-green-100 text-green-700' },
    in_progress: { label: 'En cours', cls: 'bg-blue-100 text-blue-700' },
    critical: { label: 'Critique', cls: 'bg-red-100 text-red-700' },
    deployed: { label: 'Déployé', cls: 'bg-green-100 text-green-700' },
    mvp: { label: 'MVP', cls: 'bg-accent-100 text-accent-700' },
    prototype: { label: 'Prototype', cls: 'bg-secondary-100 text-secondary-700' },
    poc: { label: 'POC', cls: 'bg-orange-100 text-orange-700' },
    concept: { label: 'Concept', cls: 'bg-background-200 text-foreground-600' },
  };
  const info = map[status] || { label: status, cls: 'bg-background-100 text-foreground-600' };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${info.cls}`}>{info.label}</span>;
}

function ReadinessBadge({ level }: { level: number }) {
  const labels: Record<number, string> = { 1: 'Recherche', 2: 'Concept', 3: 'POC', 4: 'Proto V0', 5: 'Proto V1', 6: 'Pilote', 7: 'MVP', 8: 'Déployé', 9: 'Scalé' };
  const color = level >= 7 ? 'bg-green-100 text-green-700' : level >= 5 ? 'bg-accent-100 text-accent-700' : level >= 3 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700';
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>TRL {level} — {labels[level] || 'N/A'}</span>;
}

function getScoreColor(score: number) {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getReadinessLabel(level: number) {
  if (level >= 7) return 'MVP/Déployé';
  if (level >= 5) return 'Prototype';
  if (level >= 3) return 'POC';
  return 'Concept';
}

export default function innovationESGCommandPage() {
  const { esgAssessments, innovationLab, methodologies, isLive, loading, error, refetch } = useInnovationESG();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedESGId, setSelectedESGId] = useState<number | null>(null);
  const [selectedInnovationId, setSelectedInnovationId] = useState<number | null>(null);
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);

  useEffect(() => {
    if (esgAssessments.length > 0 && selectedESGId === null) setSelectedESGId(esgAssessments[0].id);
    if (innovationLab.length > 0 && selectedInnovationId === null) setSelectedInnovationId(innovationLab[0].id);
    if (methodologies.length > 0 && selectedMethodId === null) setSelectedMethodId(methodologies[0].id);
  }, [esgAssessments, innovationLab, methodologies]);

  const selectedESG = useMemo(() => esgAssessments.find(e => e.id === selectedESGId) || null, [esgAssessments, selectedESGId]);
  const selectedInnovation = useMemo(() => innovationLab.find(i => i.id === selectedInnovationId) || null, [innovationLab, selectedInnovationId]);
  const selectedMethod = useMemo(() => methodologies.find(m => m.id === selectedMethodId) || null, [methodologies, selectedMethodId]);

  // Aggregate stats
  const avgESG = esgAssessments.length > 0 ? Math.round(esgAssessments.reduce((s, e) => s + (e as any).overall_esg_score, 0) / esgAssessments.length) : 0;
  const avgInnovImpact = innovationLab.length > 0 ? Math.round(innovationLab.reduce((s, i) => s + (i as any).impact_score, 0) / innovationLab.length) : 0;
  const avgMethQuality = methodologies.length > 0 ? Math.round(methodologies.reduce((s, m) => s + (m as any).quality_score, 0) / methodologies.length) : 0;

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line', count: 0 },
    { id: 'esg', label: 'ESG & Sustainability', icon: 'ri-leaf-line', count: esgAssessments.length },
    { id: 'innovation', label: 'Innovation Lab', icon: 'ri-lightbulb-flash-line', count: innovationLab.length },
    { id: 'methodology', label: 'Methodology Factory', icon: 'ri-settings-3-line', count: methodologies.length },
  ];

  return (
    <hubLayout hubId={19}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${isLive ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  <span className={`inline-block w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></span>
                  {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Innovation & ESG Command
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Diagnostics ESG, laboratoire d'innovation, industrialisation des méthodologies — construire l'avenir du conseil africain.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{esgAssessments.length + innovationLab.length + methodologies.length}</div>
                <div className="text-xs text-foreground-500">Entités actives</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{avgESG}/{avgInnovImpact}/{avgMethQuality}</div>
                <div className="text-xs text-foreground-500">Scores ESG/Innov/Méth</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-green-600">9.5</div>
                <div className="text-xs text-foreground-500">Score cible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i>{tab.label}
                {tab.count > 0 && <span className="text-xs opacity-60">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-background-200 border-t-accent-500 rounded-full animate-spin"></div>
            <p className="text-sm text-foreground-500">Chargement des données Innovation & ESG...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
              <i className="ri-error-warning-line text-red-600 text-2xl"></i>
            </div>
            <p className="text-sm text-foreground-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500 max-w-md text-center">{error}</p>
            <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-2"></i>Réessayer
            </button>
            <p className="text-xs text-foreground-400 mt-2">Affichage des données mock en secours</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ============================== DASHBOARD OVERVIEW ============================== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Top KPIs row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-3xl font-bold text-foreground-950">{esgDashboardKPIs.total_assessments + innovationDashboardKPIs.total_projects + methodologyDashboardKPIs.total_methodologies}</div>
                    <div className="text-xs text-foreground-500 mt-1">Éléments totaux</div>
                    <div className="text-xs text-green-600 mt-2 flex items-center gap-1"><i className="ri-arrow-up-line"></i>18 au total</div>
                  </div>
                  <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-3xl font-bold text-foreground-950">{esgDashboardKPIs.countries_covered}</div>
                    <div className="text-xs text-foreground-500 mt-1">Pays couverts</div>
                    <div className="text-xs text-foreground-400 mt-2">UEMOA + CEMAC</div>
                  </div>
                  <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-3xl font-bold text-accent-500">{methodologyDashboardKPIs.total_sops + methodologyDashboardKPIs.total_checklists + methodologyDashboardKPIs.total_templates}</div>
                    <div className="text-xs text-foreground-500 mt-1">Artifacts méthode</div>
                    <div className="text-xs text-foreground-400 mt-2">SOPs + Checklists + Templates</div>
                  </div>
                  <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-3xl font-bold text-green-600">{innovationDashboardKPIs.total_investment}</div>
                    <div className="text-xs text-foreground-500 mt-1">Investissement R&D</div>
                    <div className="text-xs text-green-600 mt-2 flex items-center gap-1"><i className="ri-funds-line"></i>ROI moyen {innovationDashboardKPIs.avg_roi}</div>
                  </div>
                </div>

                {/* ESG Summary */}
                <div className="p-6 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-leaf-line text-green-600 text-lg"></i>
                    <h3 className="text-base font-bold text-foreground-950">ESG & Sustainability Engine</h3>
                    <span className="text-xs text-foreground-400 ml-auto">{esgDashboardKPIs.total_assessments} diagnostiques</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xl font-bold text-foreground-950">{Math.round(esgDashboardKPIs.avg_overall_score)}</div>
                      <div className="text-xs text-foreground-500">Score ESG moyen</div>
                    </div>
                    <div className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{esgDashboardKPIs.assessments_completed}</div>
                      <div className="text-xs text-foreground-500">Terminés</div>
                    </div>
                    <div className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{esgDashboardKPIs.assessments_in_progress}</div>
                      <div className="text-xs text-foreground-500">En cours</div>
                    </div>
                    <div className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xl font-bold text-red-600">{esgDashboardKPIs.assessments_critical}</div>
                      <div className="text-xs text-foreground-500">Critiques</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-foreground-500">Référentiels :</span>
                    {esgDashboardKPIs.frameworks_used.map((f: string) => (
                      <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200/50">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Innovation Summary */}
                <div className="p-6 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-lightbulb-flash-line text-accent-500 text-lg"></i>
                    <h3 className="text-base font-bold text-foreground-950">Innovation Lab — Pipeline</h3>
                    <span className="text-xs text-foreground-400 ml-auto">{innovationDashboardKPIs.total_projects} projets</span>
                  </div>
                  <div className="space-y-3 mb-4">
                    {innovationLab.slice(0, 6).map((inv: any) => (
                      <div key={inv.id} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-foreground-700 w-40 truncate">{inv.innovation_name}</span>
                        <div className="flex-1">
                          <div className="h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-500 rounded-full transition-all" style={{ width: `${(inv.readiness_level / 9) * 100}%` }}></div>
                          </div>
                        </div>
                        <span className="text-xs text-foreground-400 w-16 text-right">TRL {inv.readiness_level}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-foreground-500">Catégories :</span>
                    {innovationDashboardKPIs.categories.map((c: string) => (
                      <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200/50 capitalize">{c}</span>
                    ))}
                  </div>
                </div>

                {/* Methodology Summary */}
                <div className="p-6 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-settings-3-line text-secondary-700 text-lg"></i>
                    <h3 className="text-base font-bold text-foreground-950">Methodology Factory</h3>
                    <span className="text-xs text-foreground-400 ml-auto">{methodologyDashboardKPIs.total_methodologies} méthodologies</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xl font-bold text-foreground-950">{methodologyDashboardKPIs.total_sops}</div>
                      <div className="text-xs text-foreground-500">SOPs</div>
                    </div>
                    <div className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xl font-bold text-foreground-950">{methodologyDashboardKPIs.total_checklists}</div>
                      <div className="text-xs text-foreground-500">Checklists</div>
                    </div>
                    <div className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xl font-bold text-foreground-950">{methodologyDashboardKPIs.total_templates}</div>
                      <div className="text-xs text-foreground-500">Templates</div>
                    </div>
                    <div className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xl font-bold text-foreground-950">{methodologyDashboardKPIs.total_usage}</div>
                      <div className="text-xs text-foreground-500">Utilisations</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-foreground-500">Catégories :</span>
                    {methodologyDashboardKPIs.categories.map((c: string) => (
                      <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-secondary-50 text-secondary-700 border border-secondary-200/50 capitalize">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============================== ESG TAB ============================== */}
            {activeTab === 'esg' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {esgAssessments.map((esg: any) => (
                    <div key={esg.id} onClick={() => setSelectedESGId(esg.id)} className={`p-5 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${selectedESG?.id === esg.id ? 'border-green-300 bg-green-50/50 ring-1 ring-green-200/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700">{esg.framework}</span>
                        <span className="text-lg font-bold text-foreground-950">{esg.overall_esg_score}/100</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{esg.company_name}</h3>
                      <p className="text-xs text-foreground-500 mb-2">{esg.sector} · {esg.country}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <StatusBadge status={esg.status} />
                        <span className="text-xs text-foreground-400">EU Taxonomy {esg.eu_taxonomy_alignment}%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {(['environmental', 'social', 'governance'] as const).map((k) => (
                          <div key={k} className="text-center">
                            <div className={`h-1.5 rounded-full mb-1 ${getScoreColor((esg as any)[`${k}_score`])}`}></div>
                            <div className="text-xs font-bold text-foreground-950">{(esg as any)[`${k}_score`]}</div>
                            <div className="text-[10px] text-foreground-400 capitalize">{k === 'environmental' ? 'E' : k === 'social' ? 'S' : 'G'}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-foreground-600 line-clamp-2">{esg.summary}</p>
                    </div>
                  ))}
                </div>

                {/* ESG Detail Panel */}
                {selectedESG && (
                  <div className="p-6 bg-background-50 rounded-lg border border-green-200/70 space-y-6 animate-in fade-in duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-foreground-950">{selectedESG.company_name}</h3>
                          <StatusBadge status={(selectedESG as any).status} />
                        </div>
                        <p className="text-sm text-foreground-500">{(selectedESG as any).sector} · {(selectedESG as any).country} · Référentiel {(selectedESG as any).framework}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-foreground-950">{(selectedESG as any).overall_esg_score}</div>
                          <div className="text-xs text-foreground-500">Score ESG</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-foreground-950 capitalize">{(selectedESG as any).climate_risk_exposure?.replace(/_/g, ' ')}</div>
                          <div className="text-xs text-foreground-500">Risque climat</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-foreground-950">{(selectedESG as any).eu_taxonomy_alignment}%</div>
                          <div className="text-xs text-foreground-500">EU Taxonomy</div>
                        </div>
                      </div>
                    </div>

                    {/* E/S/G Score bars */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1"><span className="text-foreground-500">Environnemental</span><span className="font-bold text-foreground-950">{(selectedESG as any).environmental_score}/100</span></div>
                        <ScoreBar score={(selectedESG as any).environmental_score} size="lg" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1"><span className="text-foreground-500">Social</span><span className="font-bold text-foreground-950">{(selectedESG as any).social_score}/100</span></div>
                        <ScoreBar score={(selectedESG as any).social_score} size="lg" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1"><span className="text-foreground-500">Gouvernance</span><span className="font-bold text-foreground-950">{(selectedESG as any).governance_score}/100</span></div>
                        <ScoreBar score={(selectedESG as any).governance_score} size="lg" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Gaps */}
                      <div>
                        <h4 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2"><i className="ri-error-warning-line"></i>Gaps identifiés</h4>
                        <ul className="space-y-2">
                          {(selectedESG as any).gaps?.map((g: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5 shrink-0"><i className="ri-close-line text-[10px]"></i></span>
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Recommendations */}
                      <div>
                        <h4 className="text-sm font-bold text-green-700 mb-3 flex items-center gap-2"><i className="ri-check-double-line"></i>Recommandations</h4>
                        <ul className="space-y-2">
                          {(selectedESG as any).recommendations?.map((r: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5 shrink-0"><i className="ri-check-line text-[10px]"></i></span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Roadmap + SDG */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-road-map-line text-accent-500"></i>Feuille de route</h4>
                        <div className="space-y-3">
                          {(selectedESG as any).roadmap?.map((p: string, i: number) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 text-xs font-bold">{i + 1}</div>
                              <span className="text-xs text-foreground-700">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-global-line text-blue-500"></i>Alignement ODD</h4>
                        <div className="flex flex-wrap gap-2">
                          {(selectedESG as any).sdg_alignment?.map((sdg: string, i: number) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/50 font-medium">{sdg}</span>
                          ))}
                        </div>
                        <p className="text-xs text-foreground-400 mt-4">Assigné à : {(selectedESG as any).assignee}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================== INNOVATION TAB ============================== */}
            {activeTab === 'innovation' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {innovationLab.map((inv: any) => (
                    <div key={inv.id} onClick={() => setSelectedInnovationId(inv.id)} className={`p-5 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${selectedInnovation?.id === inv.id ? 'border-accent-300 bg-accent-50/50 ring-1 ring-accent-200/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 capitalize">{inv.category}</span>
                        <ReadinessBadge level={inv.readiness_level} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{inv.innovation_name}</h3>
                      <p className="text-xs text-foreground-500 mb-2">{inv.technology}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-50 text-secondary-900">{getReadinessLabel(inv.readiness_level)}</span>
                        <span className="text-xs text-foreground-400">{inv.implementation_time?.replace(/_/g, ' ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-foreground-500">Impact</span>
                        <span className="font-bold text-foreground-950">{inv.impact_score}/100</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">Faisabilité</span>
                        <span className="font-bold text-foreground-950">{inv.feasibility_score}/100</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Innovation Detail Panel */}
                {selectedInnovation && (
                  <div className="p-6 bg-background-50 rounded-lg border border-accent-200/70 space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-foreground-950">{selectedInnovation.innovation_name}</h3>
                          <ReadinessBadge level={(selectedInnovation as any).readiness_level} />
                        </div>
                        <p className="text-sm text-foreground-500 capitalize">{(selectedInnovation as any).category} · {(selectedInnovation as any).technology}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent-500">{(selectedInnovation as any).impact_score}</div>
                          <div className="text-xs text-foreground-500">Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground-950">{(selectedInnovation as any).feasibility_score}</div>
                          <div className="text-xs text-foreground-500">Faisabilité</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-600">{(selectedInnovation as any).projected_roi}</div>
                          <div className="text-xs text-foreground-500">ROI projeté</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-bold text-foreground-950 mb-2">Description</h4>
                        <p className="text-xs text-foreground-700 leading-relaxed">{(selectedInnovation as any).description}</p>
                        <h4 className="text-sm font-bold text-foreground-950 mt-4 mb-2">Use Case</h4>
                        <p className="text-xs text-foreground-700 leading-relaxed">{(selectedInnovation as any).use_case}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="p-3 bg-background-100 rounded-lg">
                          <div className="text-xs text-foreground-500">Team Lead</div>
                          <div className="text-sm font-medium text-foreground-950">{(selectedInnovation as any).team_lead}</div>
                        </div>
                        <div className="p-3 bg-background-100 rounded-lg">
                          <div className="text-xs text-foreground-500">Propriété Intellectuelle</div>
                          <div className="text-sm font-medium text-foreground-950">{(selectedInnovation as any).ip_status}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-background-100 rounded-lg">
                            <div className="text-xs text-foreground-500">Investissement</div>
                            <div className="text-sm font-bold text-foreground-950">{(selectedInnovation as any).investment_required}</div>
                          </div>
                          <div className="p-3 bg-background-100 rounded-lg">
                            <div className="text-xs text-foreground-500">Time to Market</div>
                            <div className="text-sm font-bold text-foreground-950">{(selectedInnovation as any).implementation_time?.replace(/_/g, ' ')}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Competitors */}
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950 mb-2">Paysage Concurrentiel</h4>
                      <div className="space-y-1.5">
                        {(selectedInnovation as any).competitors?.map((c: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-foreground-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-400"></span>
                            {c}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedInnovation as any).tags?.map((t: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200/50">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================== METHODOLOGY TAB ============================== */}
            {activeTab === 'methodology' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {methodologies.map((meth: any) => (
                    <div key={meth.id} onClick={() => setSelectedMethodId(meth.id)} className={`p-5 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${selectedMethod?.id === meth.id ? 'border-secondary-300 bg-secondary-50/50 ring-1 ring-secondary-200/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 capitalize">{meth.category}</span>
                        <span className="text-xs font-bold text-foreground-950">{meth.quality_score}/100</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{meth.methodology_name}</h3>
                      <p className="text-xs text-foreground-500 mb-3">{meth.framework}</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center p-2 bg-background-100 rounded">
                          <div className="text-sm font-bold text-foreground-950">{meth.sop_count}</div>
                          <div className="text-[10px] text-foreground-400">SOPs</div>
                        </div>
                        <div className="text-center p-2 bg-background-100 rounded">
                          <div className="text-sm font-bold text-foreground-950">{meth.checklist_count}</div>
                          <div className="text-[10px] text-foreground-400">Checklists</div>
                        </div>
                        <div className="text-center p-2 bg-background-100 rounded">
                          <div className="text-sm font-bold text-foreground-950">{meth.template_count}</div>
                          <div className="text-[10px] text-foreground-400">Templates</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-foreground-500">
                        <span>Utilisée {meth.usage_count} fois</span>
                        <span>v{meth.version}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Methodology Detail Panel */}
                {selectedMethod && (
                  <div className="p-6 bg-background-50 rounded-lg border border-secondary-200/70 space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-foreground-950">{selectedMethod.methodology_name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 capitalize">{(selectedMethod as any).category}</span>
                          <span className="text-xs text-foreground-400">v{(selectedMethod as any).version}</span>
                        </div>
                        <p className="text-sm text-foreground-500">{(selectedMethod as any).framework}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-secondary-700">{(selectedMethod as any).quality_score}/100</div>
                          <div className="text-xs text-foreground-500">Score qualité</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-foreground-950">{(selectedMethod as any).usage_count}</div>
                          <div className="text-xs text-foreground-500">Utilisations</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-foreground-950">{(selectedMethod as any).quality_checks}</div>
                          <div className="text-xs text-foreground-500">Contrôles qualité</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-bold text-foreground-950 mb-2">Description</h4>
                        <p className="text-xs text-foreground-700 leading-relaxed">{(selectedMethod as any).description}</p>
                        <h4 className="text-sm font-bold text-foreground-950 mt-4 mb-2">Mission de référence</h4>
                        <p className="text-xs text-foreground-600">{(selectedMethod as any).reference_mission}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-background-100 rounded-lg">
                            <div className="text-xs text-foreground-500">Durée estimée</div>
                            <div className="text-sm font-bold text-foreground-950">{(selectedMethod as any).estimated_duration}</div>
                          </div>
                          <div className="p-3 bg-background-100 rounded-lg">
                            <div className="text-xs text-foreground-500">Taille équipe</div>
                            <div className="text-sm font-bold text-foreground-950">{(selectedMethod as any).team_size}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center p-2 bg-background-100 rounded">
                            <div className="text-lg font-bold text-foreground-950">{(selectedMethod as any).sop_count}</div>
                            <div className="text-[10px] text-foreground-400">SOPs</div>
                          </div>
                          <div className="text-center p-2 bg-background-100 rounded">
                            <div className="text-lg font-bold text-foreground-950">{(selectedMethod as any).checklist_count}</div>
                            <div className="text-[10px] text-foreground-400">Checklists</div>
                          </div>
                          <div className="text-center p-2 bg-background-100 rounded">
                            <div className="text-lg font-bold text-foreground-950">{(selectedMethod as any).template_count}</div>
                            <div className="text-[10px] text-foreground-400">Templates</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2"><i className="ri-file-list-3-line text-secondary-700"></i>Livrables</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {(selectedMethod as any).deliverables?.map((d: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-foreground-700 p-2 bg-background-100 rounded-lg">
                            <i className="ri-file-text-line text-secondary-500"></i>
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags + Meta */}
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedMethod as any).tags?.map((t: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary-50 text-secondary-700 border border-secondary-200/50">{t}</span>
                        ))}
                      </div>
                      <span className="text-xs text-foreground-400">Dernière mise à jour : {(selectedMethod as any).last_updated}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </hubLayout>
  );
}



