import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { performanceExcellenceMetrics, selfImprovementPlans, executiveCommandCenter } from '@/mocks/performanceCore';

type Tab = 'performance' | 'selfimprovement' | 'commandcenter';

export default function performanceCoreCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>('performance');
  const [selectedPE, setSelectedPE] = useState(performanceExcellenceMetrics[0]);
  const [selectedSI, setSelectedSI] = useState(selfImprovementPlans[0]);
  const [selectedECC, setSelectedECC] = useState(executiveCommandCenter[0]);

  const getScoreColor = (score: number) => score >= 9 ? 'text-green-600' : score >= 7 ? 'text-yellow-600' : 'text-red-600';
  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { planned: 'bg-secondary-100 text-secondary-900', in_progress: 'bg-yellow-100 text-yellow-700', completed: 'bg-green-100 text-green-700', 'On Track': 'bg-green-100 text-green-700', 'Watch': 'bg-yellow-100 text-yellow-700', 'Caution': 'bg-orange-100 text-orange-700', 'Good': 'bg-green-100 text-green-700', 'Low': 'bg-green-100 text-green-700' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'performance', label: 'Performance Excellence', icon: 'ri-trophy-line', count: performanceExcellenceMetrics.length },
    { id: 'selfimprovement', label: 'Self-Improvement Engine', icon: 'ri-refresh-line', count: selfImprovementPlans.length },
    { id: 'commandcenter', label: 'Executive Command Center', icon: 'ri-government-line', count: executiveCommandCenter.length },
  ];

  return (
    <hubLayout hubId={16}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4"><i className="ri-rocket-line"></i>KOS Phase 3 — Hyper-Automation</div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Performance Core Command</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">Mesure de l'excellence, auto-amélioration continue du système, tableau de bord exécutif unifié — le cœur battant de KOS Enterprise OS.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">3</div><div className="text-xs text-foreground-500">BLOCS actifs</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-primary-500">95%</div><div className="text-xs text-foreground-500">Excellence cible</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}><i className={`${tab.icon} text-sm`}></i>{tab.label}<span className="text-xs opacity-60">{tab.count}</span></button>))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-trophy-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Performance Excellence Engine™</h3><p className="text-xs text-foreground-500">BLOC 48 — Mesure & Amélioration</p></div></div>
              {performanceExcellenceMetrics.map((pe) => (
                <div key={pe.id} onClick={() => setSelectedPE(pe)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedPE.id === pe.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{pe.measurement_period}</span><span className={`text-sm font-bold ${getScoreColor(pe.overall_excellence)}`}>{pe.overall_excellence}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{pe.activity_name}</h4>
                  <div className="flex flex-wrap gap-2 mt-2"><span className="text-xs text-green-600">Satisfaction {pe.client_satisfaction}</span><span className="text-xs text-foreground-500">Productivité {pe.productivity_score}</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedPE.measurement_period}</span><span className={`text-2xl font-bold ml-auto ${getScoreColor(selectedPE.overall_excellence)}`}>{selectedPE.overall_excellence}/10</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedPE.activity_name}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                  {[{ label: 'Efficacité', val: selectedPE.efficiency_score }, { label: 'Qualité', val: selectedPE.quality_score }, { label: 'Productivité', val: selectedPE.productivity_score }, { label: 'Satisfaction', val: selectedPE.client_satisfaction }, { label: 'Rentabilité', val: selectedPE.profitability_score }].map((m) => (
                    <div key={m.label} className="p-3 bg-background-100 rounded-lg text-center"><div className={`text-lg font-bold ${getScoreColor(m.val)}`}>{m.val}</div><div className="text-xs text-foreground-500">{m.label}</div></div>
                  ))}
                </div>
                <div className="mb-4"><div className="flex items-center justify-between mb-1"><span className="text-xs text-foreground-500">Score Excellence Global</span><span className="text-xs font-bold text-foreground-950">{selectedPE.overall_excellence}/10</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: `${(selectedPE.overall_excellence || 0) * 10}%` }}></div></div></div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Actions d'Amélioration</h4>{(selectedPE.improvement_actions || []).map((a: string, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-accent-50/50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{a}</p></div>))}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'selfimprovement' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-refresh-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Self-Improvement Engine™</h3><p className="text-xs text-foreground-500">BLOC 49 — Amélioration Continue</p></div></div>
              {selfImprovementPlans.map((si) => (
                <div key={si.id} onClick={() => setSelectedSI(si)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedSI.id === si.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{si.target_system}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(si.implementation_status)}`}>{si.implementation_status}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-1">{si.expected_impact}</h4>
                  <div className="flex items-center gap-3 mt-2"><span className="text-xs text-foreground-500">Perf {si.agent_performance}/10</span><span className="text-xs text-red-500">Erreurs {si.error_rate}%</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedSI.implementation_status)}`}>{selectedSI.implementation_status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSI.target_system}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4"><div className="p-3 bg-background-100 rounded-lg text-center"><div className={`text-lg font-bold ${getScoreColor(selectedSI.agent_performance)}`}>{selectedSI.agent_performance}/10</div><div className="text-xs text-foreground-500">Performance</div></div><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-red-500">{selectedSI.error_rate}%</div><div className="text-xs text-foreground-500">Taux d'Erreurs</div></div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-orange-700 mb-2">Automatisations Inutilisées</h4>{(selectedSI.unused_automations || []).map((u: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-forbid-line text-orange-400"></i>{u}</div>))}</div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-accent-700 mb-2">Opportunités d'Optimisation</h4>{(selectedSI.optimization_opportunities || []).map((o: string, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-accent-50/50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{o}</p></div>))}</div>
                <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-200"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Impact Attendu</h4><p className="text-sm text-foreground-700">{selectedSI.expected_impact}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commandcenter' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-government-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Executive Command Center™</h3><p className="text-xs text-foreground-500">BLOC 50 — Centre de Contrôle Unifié</p></div></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {executiveCommandCenter.map((ecc) => (
                <div key={ecc.id} onClick={() => setSelectedECC(ecc)} className={`p-5 rounded-lg border cursor-pointer transition-colors ${selectedECC.id === ecc.id ? 'border-accent-300 bg-accent-50/50 ring-1 ring-accent-200' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-3"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{ecc.domain}</span><span className={`text-sm font-bold ${getScoreColor(ecc.overall_health)}`}>{ecc.overall_health}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">{ecc.dashboard_name}</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(ecc.strategy_status)}`}>Stratégie</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(ecc.operations_status)}`}>Opérations</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(ecc.finance_status)}`}>Finance</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedECC && (
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center justify-between mb-6"><div><h2 className="text-lg font-bold text-foreground-950">{selectedECC.dashboard_name}</h2><p className="text-xs text-foreground-500">{selectedECC.domain}</p></div><span className={`text-2xl font-bold ${getScoreColor(selectedECC.overall_health)}`}>{selectedECC.overall_health}/10</span></div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {Object.entries(selectedECC.consolidated_kpis || {}).slice(0, 8).map(([key, value]) => (
                    <div key={key} className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500 capitalize mb-1">{key.replace(/_/g, ' ')}</div><div className="text-sm font-bold text-foreground-950">{typeof value === 'number' ? value.toLocaleString() : String(value)}</div></div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                  {[{ label: 'Stratégie', val: selectedECC.strategy_status }, { label: 'Opérations', val: selectedECC.operations_status }, { label: 'Finance', val: selectedECC.finance_status }, { label: 'Clients', val: selectedECC.client_status }, { label: 'Innovation', val: selectedECC.innovation_status }, { label: 'Risques', val: selectedECC.risk_status }].map((item) => (
                    <div key={item.label} className="p-3 bg-background-100 rounded-lg text-center"><div className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block mb-1 ${getStatusBadge(item.val)}`}>{item.val}</div><div className="text-xs text-foreground-500">{item.label}</div></div>
                  ))}
                </div>

                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-200"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Résumé Exécutif</h4><p className="text-sm text-foreground-700">{selectedECC.executive_summary}</p></div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Cible — Performance & Core</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Excellence Opérationnelle</span><span className="text-xs font-bold text-foreground-950">100%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '100%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Auto-Amélioration</span><span className="text-xs font-bold text-foreground-950">100%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: '100%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Pilotage par KPI</span><span className="text-xs font-bold text-foreground-950">100%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-secondary-500 rounded-full" style={{ width: '100%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Expérience Client</span><span className="text-xs font-bold text-foreground-950">100%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '100%' }}></div></div></div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





