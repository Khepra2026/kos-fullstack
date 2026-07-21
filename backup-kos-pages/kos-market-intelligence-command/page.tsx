import { useState, useEffect } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useMarketIntelligence } from '@/hooks/useMarketIntelligence';
import type { TenderOpportunity, CompetitiveIntel, ExecutiveCommunication, StrategicPlan } from '@/hooks/useMarketIntelligence';

type Tab = 'tenders' | 'competitive' | 'communications' | 'strategy';

export default function marketIntelligenceCommandPage() {
  const { tenderOpportunities, competitiveLandscape, executiveCommunications, strategicPlans, isLive, loading, error, refetch } = useMarketIntelligence();

  const [activeTab, setActiveTab] = useState<Tab>('tenders');
  const [selectedTO, setSelectedTO] = useState<TenderOpportunity | null>(null);
  const [selectedCI, setSelectedCI] = useState<CompetitiveIntel | null>(null);
  const [selectedEC, setSelectedEC] = useState<ExecutiveCommunication | null>(null);
  const [selectedSP, setSelectedSP] = useState<StrategicPlan | null>(null);

  useEffect(() => {
    if (tenderOpportunities.length > 0 && !selectedTO) setSelectedTO(tenderOpportunities[0]);
    if (competitiveLandscape.length > 0 && !selectedCI) setSelectedCI(competitiveLandscape[0]);
    if (executiveCommunications.length > 0 && !selectedEC) setSelectedEC(executiveCommunications[0]);
    if (strategicPlans.length > 0 && !selectedSP) setSelectedSP(strategicPlans[0]);
  }, [tenderOpportunities, competitiveLandscape, executiveCommunications, strategicPlans, selectedTO, selectedCI, selectedEC, selectedSP]);

  const formatFCFA = (val: number) => `${(val / 1000000).toFixed(0)}M FCFA`;
  const getRelevanceColor = (score: number) => score >= 9 ? 'text-green-600' : score >= 7 ? 'text-yellow-600' : 'text-red-600';
  const getThreatColor = (level: string) => {
    const map: Record<string, string> = { 'Élevé': 'text-red-600', 'Modéré': 'text-yellow-600', 'Faible': 'text-green-600', 'Faible à Modéré': 'text-green-600' };
    return map[level] || 'text-gray-600';
  };
  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      qualified: 'bg-green-100 text-green-700', evaluation: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700', draft: 'bg-gray-100 text-gray-700',
      proposed: 'bg-secondary-100 text-secondary-900', under_review: 'bg-accent-100 text-accent-900',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'tenders', label: 'Tender Intelligence', icon: 'ri-file-search-line', count: tenderOpportunities.length },
    { id: 'competitive', label: 'Competitive Intelligence', icon: 'ri-line-chart-line', count: competitiveLandscape.length },
    { id: 'communications', label: 'Executive Communication', icon: 'ri-megaphone-line', count: executiveCommunications.length },
    { id: 'strategy', label: 'Strategic Planning', icon: 'ri-road-map-line', count: strategicPlans.length },
  ];

  const totalRecords = tenderOpportunities.length + competitiveLandscape.length + executiveCommunications.length + strategicPlans.length;

  return (
    <hubLayout hubId={13}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold"><i className="ri-radar-line"></i> KOS Phase 3 — Hyper-Automation</span>
                {isLive && (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    DONNÉES LIVE — SUPABASE
                  </span>
                )}
                {!isLive && !loading && (
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">DONNÉES MOCK — DÉMO</span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Market Intelligence Command</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">Appels d'offres, veille concurrentielle, communication exécutive, planification stratégique — l'intelligence marché automatisée.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">4</div><div className="text-xs text-foreground-500">BLOCS actifs</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-accent-500">93%</div><div className="text-xs text-foreground-500">Intelligence cible</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i>{tab.label}<span className="text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-2 border-accent-300 border-t-accent-500 rounded-full animate-spin"></div>
            <p className="text-sm text-foreground-500">Chargement des données Market Intelligence...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600"><i className="ri-error-warning-line text-2xl"></i></div>
            <p className="text-sm text-red-600 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500 max-w-md text-center">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-accent-500 text-background-50 text-sm font-medium cursor-pointer hover:bg-accent-600 transition-colors whitespace-nowrap">
              <i className="ri-refresh-line mr-1.5"></i>Réessayer
            </button>
          </div>
        )}

        {!loading && !error && activeTab === 'tenders' && selectedTO && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-file-search-line text-lg"></i></div>
                <div><h3 className="text-sm font-bold text-foreground-950">KOS Tender Intelligence Engine™</h3><p className="text-xs text-foreground-500">BLOC 37 — Appels d'Offres</p></div>
              </div>
              {tenderOpportunities.map((to) => (
                <div key={to.id} onClick={() => setSelectedTO(to)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedTO.id === to.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{to.tender_type}</span><span className={`text-sm font-bold ${getRelevanceColor(to.relevance_score)}`}>{to.relevance_score}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{to.tender_title}</h4>
                  <div className="flex items-center gap-3 mt-2"><span className="text-xs text-foreground-500">{to.source_organization}</span><span className="text-xs font-medium text-accent-600">{formatFCFA(to.estimated_budget_fcfa)}</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedTO.qualification_status)}`}>{selectedTO.qualification_status}</span><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedTO.tender_type}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedTO.tender_title}</h2>
                <div className="flex flex-wrap gap-4 mb-4"><span className="text-xs text-foreground-500">{selectedTO.source_organization}</span><span className="text-xs font-medium text-accent-600">Budget estimé : {formatFCFA(selectedTO.estimated_budget_fcfa)}</span></div>
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-200 mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-1">Recommandation KOS</h4><p className="text-sm text-foreground-700">{selectedTO.recommendation}</p></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Documents Requis</h4>{(selectedTO.required_documents || []).map((d: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-file-text-line text-foreground-400"></i>{d}</div>))}</div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Analyse Concurrentielle</h4><p className="text-sm text-foreground-600">{selectedTO.competitive_analysis}</p></div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && activeTab === 'competitive' && selectedCI && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-line-chart-line text-lg"></i></div>
                <div><h3 className="text-sm font-bold text-foreground-950">KOS Competitive Intelligence Center™</h3><p className="text-xs text-foreground-500">BLOC 38 — Veille Concurrentielle</p></div>
              </div>
              {competitiveLandscape.map((ci) => (
                <div key={ci.id} onClick={() => setSelectedCI(ci)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedCI.id === ci.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{ci.competitor_type}</span><span className={`text-xs font-medium ${getThreatColor(ci.threat_level)}`}>{ci.threat_level}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{ci.competitor_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{ci.market_segment}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedCI.competitor_type}</span><span className={`text-xs font-medium ml-auto ${getThreatColor(selectedCI.threat_level)}`}>Menace : {selectedCI.threat_level}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedCI.competitor_name}</h2>
                <p className="text-xs text-foreground-500 mb-4">{selectedCI.market_segment}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><h4 className="text-sm font-semibold text-green-700 mb-2">Forces</h4>{(selectedCI.strengths || []).map((s: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-check-line text-green-500"></i>{s}</div>))}</div>
                  <div><h4 className="text-sm font-semibold text-red-700 mb-2">Faiblesses</h4>{(selectedCI.weaknesses || []).map((w: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-close-line text-red-400"></i>{w}</div>))}</div>
                </div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Opportunités de Différenciation</h4>{(selectedCI.differentiation_opportunities || []).map((d: string, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-primary-50/50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{d}</p></div>))}</div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && activeTab === 'communications' && selectedEC && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-megaphone-line text-lg"></i></div>
                <div><h3 className="text-sm font-bold text-foreground-950">KOS Executive Communication Engine™</h3><p className="text-xs text-foreground-500">BLOC 39 — Communication DG</p></div>
              </div>
              {executiveCommunications.map((ec) => (
                <div key={ec.id} onClick={() => setSelectedEC(ec)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedEC.id === ec.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{ec.communication_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(ec.approval_status)}`}>{ec.approval_status}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{ec.title}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{ec.target_audience}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedEC.communication_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedEC.approval_status)}`}>{selectedEC.approval_status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedEC.title}</h2>
                <p className="text-xs text-foreground-500 mb-4">Audience : {selectedEC.target_audience} · Ton : {selectedEC.tone_profile}</p>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Messages Clés</h4>{(selectedEC.key_messages || []).map((m: string, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-secondary-50/50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-secondary-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{m}</p></div>))}</div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Canaux de Diffusion</h4><div className="flex flex-wrap gap-2">{(selectedEC.delivery_channel || []).map((c: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-lg bg-background-100 text-foreground-600">{c}</span>))}</div></div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && activeTab === 'strategy' && selectedSP && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-road-map-line text-lg"></i></div>
                <div><h3 className="text-sm font-bold text-foreground-950">KOS Strategic Planning Engine™</h3><p className="text-xs text-foreground-500">BLOC 40 — Plans Stratégiques</p></div>
              </div>
              {strategicPlans.map((sp) => (
                <div key={sp.id} onClick={() => setSelectedSP(sp)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedSP.id === sp.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium whitespace-nowrap">{sp.horizon}</span><span className="text-sm font-bold text-accent-600">{sp.progress_percentage}%</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{sp.plan_title}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{sp.vision_statement}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">{selectedSP.horizon}</span><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">{selectedSP.progress_percentage}% complété</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSP.plan_title}</h2>
                <p className="text-sm text-foreground-600 italic mb-4">"{selectedSP.vision_statement}"</p>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Objectifs Stratégiques</h4>{(selectedSP.strategic_objectives || []).map((o: string, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-accent-50/50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{o}</p></div>))}</div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Initiatives Clés</h4>{(selectedSP.key_initiatives || []).map((ini: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-arrow-right-line text-accent-400"></i>{ini}</div>))}</div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">KPIs</h4><div className="flex flex-wrap gap-3">{Object.entries(selectedSP.kpis || {}).map(([k, v]) => (<span key={k} className="text-xs px-3 py-1.5 rounded-lg bg-background-100 text-foreground-700 font-medium">{k.replace(/_/g, ' ')} : {String(v)}</span>))}</div></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Cible — Intelligence Marché</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Appels d'Offres</span><span className="text-xs font-bold text-foreground-950">{tenderOpportunities.length * 15}%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: `${Math.min(tenderOpportunities.length * 15, 100)}%` }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Veille Concurrentielle</span><span className="text-xs font-bold text-foreground-950">{competitiveLandscape.length * 16}%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min(competitiveLandscape.length * 16, 100)}%` }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Communication Exécutive</span><span className="text-xs font-bold text-foreground-950">{executiveCommunications.length * 15}%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-secondary-500 rounded-full" style={{ width: `${Math.min(executiveCommunications.length * 15, 100)}%` }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Planification Stratégique</span><span className="text-xs font-bold text-foreground-950">{strategicPlans.length * 18}%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: `${Math.min(strategicPlans.length * 18, 100)}%` }}></div></div></div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-xs text-foreground-500">{totalRecords} enregistrements actifs dans {isLive ? 'Supabase' : 'Mock Data'}</span>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





