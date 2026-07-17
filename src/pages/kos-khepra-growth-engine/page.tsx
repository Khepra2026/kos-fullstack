import { useState, useEffect } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useGrowthEngine } from '@/hooks/useGrowthEngine';

type Tab = 'pipeline' | 'scoring' | 'nurturing' | 'forecasting';

export default function KOSKhepraGrowthEnginePage() {
  const {
    pipeline: commercialPipeline,
    scores: predictiveLeadScores,
    sequences: nurturingSequences,
    forecast: revenueForecast,
    actuals: revenueActuals,
    kpis: growthEngineKPIs,
    loading,
    error,
    usingLiveData,
    refresh,
  } = useGrowthEngine();

  const [activeTab, setActiveTab] = useState<Tab>('pipeline');
  const [selectedDeal, setSelectedDeal] = useState(commercialPipeline[0]);
  const [selectedScore, setSelectedScore] = useState(predictiveLeadScores[0]);
  const [selectedSequence, setSelectedSequence] = useState(nurturingSequences[0]);
  const [pipelineFilter, setPipelineFilter] = useState<'all' | 'hot' | 'active' | 'cold'>('all');
  const [scoringFilter, setScoringFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    if (commercialPipeline.length > 0) setSelectedDeal(commercialPipeline[0]);
  }, [commercialPipeline]);
  useEffect(() => {
    if (predictiveLeadScores.length > 0) setSelectedScore(predictiveLeadScores[0]);
  }, [predictiveLeadScores]);
  useEffect(() => {
    if (nurturingSequences.length > 0) setSelectedSequence(nurturingSequences[0]);
  }, [nurturingSequences]);

  const formatFCFA = (val: number) => {
    if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)} Md`;
    if (val >= 1000000) return `${(val / 1000000).toFixed(0)} M`;
    return val.toLocaleString('fr-FR');
  };

  const getStageColor = (stage: string) => {
    if (stage === 'Closing') return 'bg-red-100 text-red-700 border-red-300';
    if (stage === 'Negotiation') return 'bg-orange-100 text-orange-700 border-orange-300';
    if (stage === 'Proposal') return 'bg-amber-100 text-amber-700 border-amber-300';
    if (stage === 'Qualification') return 'bg-secondary-100 text-secondary-700 border-secondary-300';
    if (stage === 'Discovery') return 'bg-background-200/70 text-foreground-500 border-background-300/60';
    return 'bg-background-100 text-foreground-600';
  };

  const getChurnChip = (risk: string) => {
    if (risk === 'low') return 'bg-green-100 text-green-700';
    if (risk === 'medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return 'ri-arrow-up-line text-green-500';
    if (trend === 'declining') return 'ri-arrow-down-line text-red-500';
    return 'ri-arrow-right-line text-foreground-400';
  };

  const getSequenceStatusChip = (status: string) => {
    if (status === 'active') return 'bg-green-100 text-green-700';
    if (status === 'active_hot') return 'bg-red-100 text-red-700';
    if (status === 'stalled') return 'bg-yellow-100 text-yellow-700';
    if (status === 'completed') return 'bg-secondary-100 text-secondary-700';
    if (status === 'pending_close') return 'bg-background-200/70 text-foreground-500';
    return 'bg-background-100 text-foreground-500';
  };

  const renderGaugeCircle = (score: number, maxScore: number, size: number = 48, colorOverride?: string) => {
    const pct = Math.min((score / maxScore) * 100, 100);
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const color = colorOverride || (pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : pct >= 40 ? '#f97316' : '#ef4444');
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground-950">{score}</span>
        </div>
      </div>
    );
  };

  const renderScoreBar = (score: number, max: number = 100, label?: string, color?: string) => (
    <div className="w-full">
      {label && <div className="flex items-center justify-between mb-1"><span className="text-xs text-foreground-500">{label}</span><span className="text-xs font-bold text-foreground-950">{typeof score === 'number' && score % 1 !== 0 ? score.toFixed(1) : score}%</span></div>}
      <div className="w-full h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color || 'bg-accent-500'}`} style={{ width: `${Math.min(score, 100)}%` }}></div>
      </div>
    </div>
  );

  const hotDeals = commercialPipeline.filter(d => ['Closing', 'Negotiation'].includes(d.pipeline_stage));
  const warmDeals = commercialPipeline.filter(d => d.pipeline_stage === 'Proposal');
  const coldDeals = commercialPipeline.filter(d => ['Qualification', 'Discovery'].includes(d.pipeline_stage));

  const filteredDeals = pipelineFilter === 'hot' ? hotDeals
    : pipelineFilter === 'active' ? [...hotDeals, ...warmDeals]
    : pipelineFilter === 'cold' ? coldDeals
    : commercialPipeline;

  const filteredScores = scoringFilter === 'high' ? predictiveLeadScores.filter(s => s.predictive_score >= 80)
    : scoringFilter === 'medium' ? predictiveLeadScores.filter(s => s.predictive_score >= 50 && s.predictive_score < 80)
    : scoringFilter === 'low' ? predictiveLeadScores.filter(s => s.predictive_score < 50)
    : predictiveLeadScores;

  const totalPipeline = commercialPipeline.reduce((s, d) => s + d.deal_value_fcfa, 0);
  const pipelineYtd = growthEngineKPIs.deals_won_value_ytd;

  const tabs: { id: Tab; label: string; icon: string; count: number; accent: string }[] = [
    { id: 'pipeline', label: 'Pipeline Commercial', icon: 'ri-funds-line', count: commercialPipeline.length, accent: 'border-primary-300 bg-primary-50/50' },
    { id: 'scoring', label: 'Lead Scoring Prédictif', icon: 'ri-brain-line', count: predictiveLeadScores.length, accent: 'border-accent-300 bg-accent-50/50' },
    { id: 'nurturing', label: 'Séquences Nurturing', icon: 'ri-mail-send-line', count: nurturingSequences.length, accent: 'border-amber-300 bg-amber-50/50' },
    { id: 'forecasting', label: 'Revenue Forecasting', icon: 'ri-line-chart-line', count: revenueForecast.length, accent: 'border-emerald-300 bg-emerald-50/50' },
  ];

  return (
    <KOSHubLayout hubId={63}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4">
                <i className="ri-rocket-line"></i>KOS Bloc 12 — Khepra Growth Engine™
                {usingLiveData && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-bold animate-pulse">
                    LIVE
                  </span>
                )}
                {loading && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-white text-[10px] font-bold">
                    <i className="ri-loader-4-line animate-spin"></i>
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Khepra Growth Engine™</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Moteur de croissance autonome — Pipeline commercial intelligent, Lead scoring prédictif Big Four,
                Séquences nurturing automatisées et Revenue forecasting avancé.
              </p>
              {error && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center"></i>
                  Supabase indisponible — données mock affichées
                  <button onClick={refresh} className="ml-2 underline hover:text-red-900 cursor-pointer whitespace-nowrap">
                    Réessayer
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{formatFCFA(totalPipeline)} FCFA</div>
                <div className="text-xs text-foreground-500">Pipeline Total</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{growthEngineKPIs.win_rate_ytd}%</div>
                <div className="text-xs text-foreground-500">Win Rate YTD</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{formatFCFA(pipelineYtd)}</div>
                <div className="text-xs text-foreground-500">CA Gagné YTD</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                <span className="text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ===== ONGLET 1 : PIPELINE COMMERCIAL ===== */}
        {activeTab === 'pipeline' && (
          <div>
            {/* Pipeline Filters */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-xs text-foreground-500 font-medium">Filtrer :</span>
              {[
                { id: 'all' as const, label: 'Tous', count: commercialPipeline.length },
                { id: 'hot' as const, label: 'Chauds', count: hotDeals.length },
                { id: 'active' as const, label: 'Actifs', count: hotDeals.length + warmDeals.length },
                { id: 'cold' as const, label: 'Froids', count: coldDeals.length },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPipelineFilter(f.id)}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    pipelineFilter === f.id ? 'bg-foreground-950 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'
                  }`}
                >
                  {f.label} <span className="opacity-60 ml-1">{f.count}</span>
                </button>
              ))}
            </div>

            {/* Pipeline Kanban-inspired grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
              {['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closing'].map((stage) => {
                const stageDeals = filteredDeals.filter(d => d.pipeline_stage === stage);
                const stageColor = stage === 'Closing' ? 'border-l-red-400' : stage === 'Negotiation' ? 'border-l-orange-400' : stage === 'Proposal' ? 'border-l-amber-400' : stage === 'Qualification' ? 'border-l-secondary-400' : 'border-l-background-400';
                const stageValue = stageDeals.reduce((s, d) => s + d.deal_value_fcfa, 0);
                return (
                  <div key={stage} className="bg-background-50 rounded-lg border border-background-200/70">
                    <div className={`px-3 py-2 border-l-2 ${stageColor} rounded-t-lg bg-background-100`}>
                      <div className="text-xs font-bold text-foreground-950">{stage === 'Discovery' ? 'Découverte' : stage === 'Qualification' ? 'Qualification' : stage === 'Proposal' ? 'Proposition' : stage === 'Negotiation' ? 'Négociation' : 'Closing'}</div>
                      <div className="text-[10px] text-foreground-500">{stageDeals.length} deal{stageDeals.length > 1 ? 's' : ''} · {formatFCFA(stageValue)}</div>
                    </div>
                    <div className="p-2 space-y-2">
                      {stageDeals.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => setSelectedDeal(deal)}
                          className={`p-2 rounded-md cursor-pointer transition-colors text-xs ${
                            selectedDeal.id === deal.id ? 'bg-primary-50 border border-primary-200' : 'bg-white border border-background-100 hover:border-background-200/70'
                          }`}
                        >
                          <div className="font-semibold text-foreground-950 line-clamp-1 mb-1">{deal.organization}</div>
                          <div className="text-[10px] text-foreground-500 line-clamp-1 mb-1">{deal.deal_name}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-foreground-950">{formatFCFA(deal.deal_value_fcfa)}</span>
                            <span className="text-[10px] font-bold text-primary-500">{deal.win_probability}%</span>
                          </div>
                        </div>
                      ))}
                      {stageDeals.length === 0 && (
                        <div className="text-center py-4 text-[10px] text-foreground-400">Vide</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deal Detail */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getStageColor(selectedDeal.pipeline_stage)}`}>{selectedDeal.stage_label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedDeal.sector}</span>
                <span className="text-xs text-foreground-400 ml-auto">
                  Closing prévu : {new Date(selectedDeal.expected_close_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedDeal.deal_name}</h2>
              <p className="text-sm text-foreground-600 mb-4">{selectedDeal.organization} — {selectedDeal.country}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-background-100 rounded-lg text-center">
                  <div className="text-lg font-bold text-foreground-950">{formatFCFA(selectedDeal.deal_value_fcfa)} FCFA</div>
                  <div className="text-xs text-foreground-500">Valeur</div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg text-center">
                  <div className="flex justify-center">{renderGaugeCircle(selectedDeal.win_probability, 100, 44)}</div>
                  <div className="text-xs text-foreground-500">Prob. Conversion</div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg text-center">
                  <div className="text-sm font-bold text-foreground-950">{selectedDeal.days_in_pipeline} jours</div>
                  <div className="text-xs text-foreground-500">Dans le pipeline</div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg text-center">
                  <div className="text-sm font-bold text-foreground-950">{selectedDeal.lead_source.split('—')[0].trim()}</div>
                  <div className="text-xs text-foreground-500">Source</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-primary-50/50 rounded-lg border border-primary-100">
                  <h4 className="text-xs font-semibold text-foreground-950 mb-1">Prochaine action</h4>
                  <p className="text-xs text-foreground-600">{selectedDeal.next_action}</p>
                </div>
                <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                  <h4 className="text-xs font-semibold text-foreground-950 mb-1">Assigné à</h4>
                  <p className="text-xs text-foreground-600">{selectedDeal.assigned_to}</p>
                </div>
              </div>
              {selectedDeal.competitors.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs text-foreground-500 font-medium">Concurrents : </span>
                  {selectedDeal.competitors.map((c, i) => (
                    <span key={i} className="inline-block text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100 mr-1">{c}</span>
                  ))}
                </div>
              )}
              <div className="mb-4">
                <span className="text-xs text-foreground-500 font-medium">Différenciateur : </span>
                <span className="text-xs text-foreground-700">{selectedDeal.differentiator}</span>
              </div>
              {selectedDeal.risk_flags.length > 0 && (
                <div className="p-3 bg-yellow-50/50 rounded-lg border border-yellow-100">
                  <h4 className="text-xs font-semibold text-yellow-700 mb-1 flex items-center gap-1">
                    <i className="ri-alert-line text-xs w-3 h-3 flex items-center justify-center"></i>Points d'attention
                  </h4>
                  {selectedDeal.risk_flags.map((r, i) => (
                    <p key={i} className="text-xs text-yellow-700">{r}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : LEAD SCORING PRÉDICTIF ===== */}
        {activeTab === 'scoring' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-brain-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Lead Scoring™</h3>
                  <p className="text-xs text-foreground-500">{predictiveLeadScores.length} leads scorés — Score moyen {growthEngineKPIs.average_score}/100</p>
                </div>
              </div>
              {/* Score filters */}
              <div className="flex items-center gap-1 flex-wrap">
                {[
                  { id: 'all' as const, label: 'Tous', count: predictiveLeadScores.length },
                  { id: 'high' as const, label: '≥80', count: growthEngineKPIs.high_score_leads },
                  { id: 'medium' as const, label: '50-79', count: growthEngineKPIs.medium_score_leads },
                  { id: 'low' as const, label: '&lt;50', count: growthEngineKPIs.low_score_leads },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setScoringFilter(f.id)}
                    className={`whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors cursor-pointer ${
                      scoringFilter === f.id ? 'bg-foreground-950 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200/70'
                    }`}
                  >
                    {f.label} <span className="opacity-60">{f.count}</span>
                  </button>
                ))}
              </div>
              {filteredScores.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedScore(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedScore.id === s.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground-700">{s.organization}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${getChurnChip(s.churn_risk)}`}>{s.churn_risk_label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-500">{formatFCFA(s.pipeline_value_fcfa)}</span>
                    <span className="text-sm font-bold text-foreground-950 flex items-center gap-1">
                      <i className={`${getTrendIcon(s.score_trend)} text-xs`}></i>
                      {s.predictive_score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs font-semibold text-foreground-950">{selectedScore.organization}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getChurnChip(selectedScore.churn_risk)}`}>Risque churn : {selectedScore.churn_risk_label}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Scoré le {new Date(selectedScore.last_scored_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedScore.deal_name}</h2>
                <div className="grid grid-cols-5 gap-3 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="flex justify-center">{renderGaugeCircle(selectedScore.predictive_score, 100, 48, selectedScore.predictive_score >= 80 ? '#22c55e' : selectedScore.predictive_score >= 50 ? '#f59e0b' : '#ef4444')}</div>
                    <div className="text-[10px] text-foreground-500 mt-1">Score Global</div>
                  </div>
                  {[
                    { label: 'Firmographique', score: selectedScore.firmographic_score },
                    { label: 'Comportemental', score: selectedScore.behavioral_score },
                    { label: 'Engagement', score: selectedScore.engagement_score },
                    { label: 'Urgence Rég.', score: selectedScore.regulatory_urgency_score },
                  ].map((dim, i) => (
                    <div key={i} className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="flex justify-center">{renderGaugeCircle(dim.score, 100, 44)}</div>
                      <div className="text-[10px] text-foreground-500 mt-1">{dim.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-foreground-950 mb-3">Facteurs de scoring</h4>
                  <div className="space-y-2">
                    {selectedScore.scoring_factors.map((f, i) => (
                      <div key={i} className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${f.impact === 'positive' ? 'bg-green-100 text-green-700' : f.impact === 'negative' ? 'bg-red-100 text-red-700' : 'bg-background-200/70 text-foreground-500'}`}>
                              {f.impact === 'positive' ? '+' : f.impact === 'negative' ? '−' : '~'}{f.weight}%
                            </span>
                            <span className="text-xs text-foreground-700">{f.factor}</span>
                          </div>
                          <span className={`text-xs font-bold ${f.score >= 80 ? 'text-green-600' : f.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{f.score}/100</span>
                        </div>
                        {renderScoreBar(f.score, 100, undefined, f.score >= 80 ? 'bg-green-500' : f.score >= 60 ? 'bg-yellow-500' : 'bg-red-500')}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-accent-50/50 rounded-lg border border-accent-100 flex items-start gap-2">
                  <i className="ri-lightbulb-flash-line text-accent-500 text-sm mt-0.5 w-4 h-4 flex items-center justify-center"></i>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Next Best Action</h4>
                    <p className="text-xs text-foreground-600">{selectedScore.next_best_action}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : NURTURING SEQUENCES ===== */}
        {activeTab === 'nurturing' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-mail-send-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Nurturing Engine™</h3>
                  <p className="text-xs text-foreground-500">{nurturingSequences.length} séquences — {growthEngineKPIs.active_nurturing_enrollments.toLocaleString('fr-FR')} inscrits actifs</p>
                </div>
              </div>
              {/* Global performance summary */}
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 mb-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] text-foreground-500">Taux ouverture</div>
                    <div className="text-sm font-bold text-amber-700">{growthEngineKPIs.nurturing_avg_open_rate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-foreground-500">Taux clic</div>
                    <div className="text-sm font-bold text-amber-700">{growthEngineKPIs.nurturing_avg_click_rate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-foreground-500">Taux conversion</div>
                    <div className="text-sm font-bold text-amber-700">{growthEngineKPIs.nurturing_conversion_rate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-foreground-500">Inscrits actifs</div>
                    <div className="text-sm font-bold text-amber-700">{growthEngineKPIs.active_nurturing_enrollments.toLocaleString('fr-FR')}</div>
                  </div>
                </div>
              </div>
              {nurturingSequences.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSequence(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedSequence.id === s.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{s.sequence_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-500'}`}>{s.status === 'active' ? 'Active' : s.status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-1">{s.sequence_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{s.active_enrollments} actifs / {s.total_enrollments} total</span>
                    <span className="text-xs font-bold text-amber-600">{s.conversion_rate}% conv.</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedSequence.sequence_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedSequence.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-500'}`}>{selectedSequence.status === 'active' ? 'Active' : selectedSequence.status}</span>
                  <span className="text-xs text-foreground-400 ml-auto">{selectedSequence.avg_touches} touches</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedSequence.sequence_name}</h2>
                {/* Performance cards */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Ouverture', value: selectedSequence.open_rate + '%', icon: 'ri-eye-line', color: 'text-amber-600' },
                    { label: 'Clic', value: selectedSequence.click_rate + '%', icon: 'ri-cursor-line', color: 'text-accent-500' },
                    { label: 'Réponse', value: selectedSequence.response_rate + '%', icon: 'ri-chat-3-line', color: 'text-primary-500' },
                    { label: 'Conversion', value: selectedSequence.conversion_rate + '%', icon: 'ri-checkbox-circle-line', color: 'text-green-600' },
                  ].map((stat, i) => (
                    <div key={i} className="p-3 bg-background-100 rounded-lg text-center">
                      <i className={`${stat.icon} ${stat.color} text-sm mb-1`}></i>
                      <div className="text-lg font-bold text-foreground-950">{stat.value}</div>
                      <div className="text-[10px] text-foreground-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
                {/* Steps detail */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-foreground-950 mb-3">Étapes de la séquence</h4>
                  <div className="space-y-2">
                    {selectedSequence.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-background-100 rounded-lg border border-background-200/70">
                        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{step.step}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-foreground-950 truncate">{step.subject}</div>
                          <div className="text-[10px] text-foreground-500">Délai : +{step.delay_hours}h</div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] text-foreground-400">{step.open_rate}% ouv.</span>
                          <span className="text-[10px] text-foreground-400">{step.click_rate}% clic</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Enrolled leads */}
                <div>
                  <h4 className="text-xs font-semibold text-foreground-950 mb-2">Leads inscrits ({selectedSequence.enrolled_leads.length})</h4>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {selectedSequence.enrolled_leads.map((l, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-background-100 rounded border border-background-200/70">
                        <div className="min-w-0">
                          <span className="text-xs text-foreground-700 truncate block">{l.lead}</span>
                          <span className="text-[10px] text-foreground-400">{l.stage}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {l.days_since_last_action !== null && l.days_since_last_action > 7 && (
                            <span className="text-[10px] text-red-500 flex items-center gap-1">
                              <i className="ri-time-line w-3 h-3 flex items-center justify-center"></i>{l.days_since_last_action}j
                            </span>
                          )}
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getSequenceStatusChip(l.status)}`}>
                            {l.status === 'active' ? 'Actif' : l.status === 'active_hot' ? 'Chaud' : l.status === 'stalled' ? 'Stallé' : l.status === 'completed' ? 'Terminé' : l.status === 'unsubscribed' ? 'Désabonné' : l.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : REVENUE FORECASTING ===== */}
        {activeTab === 'forecasting' && (
          <div className="space-y-6">
            {/* YTD Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xs text-foreground-500 mb-2">CA Réalisé YTD</div>
                <div className="text-2xl font-bold text-foreground-950">{formatFCFA(growthEngineKPIs.revenue_actual_ytd)} FCFA</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-foreground-500">vs Objectif {formatFCFA(growthEngineKPIs.revenue_target_ytd)}</span>
                  <span className={`text-xs font-bold ${growthEngineKPIs.revenue_actual_ytd >= growthEngineKPIs.revenue_target_ytd ? 'text-green-600' : 'text-red-600'}`}>
                    {((growthEngineKPIs.revenue_actual_ytd / growthEngineKPIs.revenue_target_ytd) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xs text-foreground-500 mb-2">Pipeline Pondéré</div>
                <div className="text-2xl font-bold text-primary-500">{formatFCFA(growthEngineKPIs.weighted_pipeline)} FCFA</div>
                <div className="text-xs text-foreground-500 mt-2">{growthEngineKPIs.deals_count} deals actifs · Win rate {growthEngineKPIs.win_rate_ytd}%</div>
              </div>
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xs text-foreground-500 mb-2">CA Gagné YTD</div>
                <div className="text-2xl font-bold text-green-600">{formatFCFA(growthEngineKPIs.deals_won_value_ytd)} FCFA</div>
                <div className="text-xs text-foreground-500 mt-2">{growthEngineKPIs.deals_won_ytd} deals gagnés · Ticket moyen {formatFCFA(Math.round(growthEngineKPIs.deals_won_value_ytd / growthEngineKPIs.deals_won_ytd))}</div>
              </div>
              <div className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xs text-foreground-500 mb-2">CA Perdu YTD</div>
                <div className="text-2xl font-bold text-red-500">{formatFCFA(growthEngineKPIs.deals_lost_value_ytd)} FCFA</div>
                <div className="text-xs text-foreground-500 mt-2">{growthEngineKPIs.deals_lost_ytd} deals perdus · -{formatFCFA(growthEngineKPIs.deals_lost_value_ytd)}</div>
              </div>
            </div>

            {/* Forecast H2 Stats */}
            <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <i className="ri-line-chart-line text-emerald-600 text-lg"></i>
                </div>
                <div>
                  <div className="text-xs text-foreground-500">Prévision S2 2026</div>
                  <div className="text-xl font-bold text-emerald-700">{formatFCFA(growthEngineKPIs.revenue_forecast_h2)} FCFA</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-foreground-500">Objectif S2</div>
                <div className="text-lg font-bold text-foreground-950">{formatFCFA(growthEngineKPIs.revenue_target_h2)} FCFA</div>
                <div className="text-xs text-emerald-600 font-semibold">
                  +{((growthEngineKPIs.revenue_forecast_h2 / growthEngineKPIs.revenue_target_h2 - 1) * 100).toFixed(0)}% vs objectif
                </div>
              </div>
            </div>

            {/* Monthly actuals + forecasts chart-like view */}
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-6">Évolution Mensuelle — CA Réalisé vs Objectif vs Prévisionnel</h3>
              <div className="space-y-3">
                {revenueActuals.map((m, i) => {
                  const forecast = revenueForecast.find(f => f.month === m.month);
                  const maxVal = Math.max(m.actual || 0, m.target, forecast?.revenue_forecast || 0, 500000000);
                  const isPast = m.actual !== null;
                  const barActual = m.actual ? (m.actual / maxVal) * 100 : 0;
                  const barForecast = forecast ? (forecast.revenue_forecast / maxVal) * 100 : 0;
                  return (
                    <div key={i} className="relative">
                      <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className={`text-xs font-medium ${isPast ? 'text-foreground-700' : 'text-foreground-400'}`}>{m.month.replace(' 2026', '')}</span>
                          {forecast && !isPast && (
                            <span className={`text-[10px] ml-1 px-1.5 py-0.5 rounded-full font-medium ${
                              forecast.forecast_type === 'optimistic' ? 'bg-green-100 text-green-700' : forecast.forecast_type === 'conservative' ? 'bg-yellow-100 text-yellow-700' : 'bg-background-200/70 text-foreground-500'
                            }`}>
                              {forecast.confidence}%
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="h-6 bg-background-200/70 rounded-full overflow-hidden relative">
                            {isPast && (
                              <div className="absolute inset-y-0 left-0 bg-primary-500 rounded-full" style={{ width: `${barActual}%` }}>
                                <span className="absolute inset-0 flex items-center pl-2 text-[10px] text-white font-medium">{formatFCFA(m.actual!)}</span>
                              </div>
                            )}
                            {!isPast && forecast && (
                              <div className="absolute inset-y-0 left-0 bg-emerald-400/70 rounded-full border border-dashed border-emerald-500" style={{ width: `${barForecast}%` }}>
                                <span className="absolute inset-0 flex items-center pl-2 text-[10px] text-white font-medium">{formatFCFA(forecast.revenue_forecast)}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-[10px] text-foreground-400">Objectif : {formatFCFA(m.target)}</span>
                            {forecast && forecast.deals_expected_close > 0 && (
                              <span className="text-[10px] text-foreground-400">{forecast.deals_expected_close} deal{forecast.deals_expected_close > 1 ? 's' : ''} attendu{forecast.deals_expected_close > 1 ? 's' : ''}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Forecast detail cards for H2 */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Détail Prévisions S2 2026</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {revenueForecast.map((f) => (
                  <div key={f.id} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-foreground-950">{f.month}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        f.forecast_type === 'optimistic' ? 'bg-green-100 text-green-700' : f.forecast_type === 'conservative' ? 'bg-yellow-100 text-yellow-700' : 'bg-secondary-100 text-secondary-700'
                      }`}>
                        {f.forecast_type === 'optimistic' ? 'Optimiste' : f.forecast_type === 'conservative' ? 'Conservateur' : 'Baseline'}
                      </span>
                    </div>
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <div className="text-lg font-bold text-foreground-950">{formatFCFA(f.revenue_forecast)}</div>
                        <div className="text-[10px] text-foreground-500">vs Objectif {formatFCFA(f.revenue_target)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-foreground-950">{f.confidence}%</div>
                        <div className="text-[10px] text-foreground-500">Confiance</div>
                      </div>
                    </div>
                    <div className="mb-2">
                      {renderScoreBar(f.confidence, 100, 'Niveau de confiance', f.confidence >= 60 ? 'bg-green-500' : f.confidence >= 40 ? 'bg-yellow-500' : 'bg-red-500')}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-foreground-500">Deals attendus :</span>
                        <span className="font-bold text-foreground-950 ml-1">{f.deals_expected_close}</span>
                      </div>
                      <div>
                        <span className="text-foreground-500">Pipeline :</span>
                        <span className="font-bold text-foreground-950 ml-1">{formatFCFA(f.deals_pipeline_value)}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-foreground-500">Pondéré :</span>
                        <span className="font-bold text-primary-500 ml-1">{formatFCFA(f.weighted_pipeline)}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-foreground-400 mt-2 leading-relaxed">{f.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer KPIs */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Khepra Growth Engine™</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Pipeline Total</div>
              <div className="text-lg font-bold text-foreground-950">{formatFCFA(totalPipeline)} FCFA</div>
              <div className="text-xs text-foreground-400 mt-2">{commercialPipeline.length} deals actifs</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Taux de Win YTD</div>
              <div className="text-lg font-bold text-green-600">{growthEngineKPIs.win_rate_ytd}%</div>
              <div className="text-xs text-foreground-400 mt-2">{growthEngineKPIs.deals_won_ytd}/{growthEngineKPIs.deals_won_ytd + growthEngineKPIs.deals_lost_ytd} deals</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Score Leads Moyen</div>
              <div className="text-lg font-bold text-accent-500">{growthEngineKPIs.average_score}/100</div>
              <div className="h-1.5 mt-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${growthEngineKPIs.average_score}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Nurturing Actif</div>
              <div className="text-lg font-bold text-amber-600">{growthEngineKPIs.active_nurturing_enrollments.toLocaleString('fr-FR')}</div>
              <div className="text-xs text-foreground-400 mt-2">{growthEngineKPIs.nurturing_conversion_rate}% conversion</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">CA YTD</div>
              <div className="text-lg font-bold text-primary-500">{formatFCFA(growthEngineKPIs.revenue_actual_ytd)} FCFA</div>
              <div className="text-xs text-foreground-400 mt-2">Objectif {formatFCFA(growthEngineKPIs.revenue_target_ytd)}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Forecast S2 2026</div>
              <div className="text-lg font-bold text-emerald-600">{formatFCFA(growthEngineKPIs.revenue_forecast_h2)} FCFA</div>
              <div className="text-xs text-foreground-400 mt-2">vs Objectif {formatFCFA(growthEngineKPIs.revenue_target_h2)}</div>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}