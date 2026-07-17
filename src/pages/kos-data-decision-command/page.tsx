import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { dataHubConnectors, decisionIntelligence, pmoProjects } from '@/mocks/kosDataDecision';

type Tab = 'datahub' | 'decisions' | 'pmo';

export default function KOSDataDecisionCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>('datahub');
  const [selectedDH, setSelectedDH] = useState(dataHubConnectors[0]);
  const [selectedDI, setSelectedDI] = useState(decisionIntelligence[0]);
  const [selectedPMO, setSelectedPMO] = useState(pmoProjects[0]);

  const formatFCFA = (val: number) => `${(val / 1000000).toFixed(0)}M FCFA`;
  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { active: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', proposed: 'bg-secondary-100 text-secondary-900', under_review: 'bg-accent-100 text-accent-900', integrated: 'bg-green-100 text-green-700', in_progress: 'bg-secondary-100 text-secondary-900' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };
  const getConfidenceColor = (val: number) => val >= 8 ? 'text-green-600' : val >= 6 ? 'text-yellow-600' : 'text-red-600';

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'datahub', label: 'Enterprise Data Hub', icon: 'ri-database-2-line', count: dataHubConnectors.length },
    { id: 'decisions', label: 'Decision Intelligence', icon: 'ri-scales-3-line', count: decisionIntelligence.length },
    { id: 'pmo', label: 'Autonomous PMO', icon: 'ri-projector-line', count: pmoProjects.length },
  ];

  return (
    <KOSHubLayout hubId={14}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4"><i className="ri-cpu-line"></i>KOS Phase 3 — Hyper-Automation</div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Data & Decision Command</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">Centralisation des données, transformation en décisions, pilotage automatique des projets — la couche data-driven de l'Enterprise OS.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">3</div><div className="text-xs text-foreground-500">BLOCS actifs</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-primary-500">93%</div><div className="text-xs text-foreground-500">Data-Driven cible</div></div>
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
        {activeTab === 'datahub' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-database-2-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Enterprise Data Hub™</h3><p className="text-xs text-foreground-500">BLOC 41 — Source Unique de Vérité</p></div></div>
              {dataHubConnectors.map((dh) => (
                <div key={dh.id} onClick={() => setSelectedDH(dh)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedDH.id === dh.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{dh.connector_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(dh.integration_status)}`}>{dh.integration_status}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{dh.data_source}</h4>
                  <div className="flex items-center gap-3 mt-2"><span className="text-xs text-foreground-500">{dh.record_count.toLocaleString()} enregistrements</span><span className="text-xs font-medium text-accent-600">Qualité {dh.data_quality_score}/10</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedDH.integration_status)}`}>{selectedDH.integration_status}</span><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedDH.connector_type}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedDH.data_source}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4"><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedDH.record_count.toLocaleString()}</div><div className="text-xs text-foreground-500">Enregistrements</div></div><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-accent-600">{selectedDH.data_quality_score}/10</div><div className="text-xs text-foreground-500">Qualité Données</div></div><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedDH.schema_version}</div><div className="text-xs text-foreground-500">Version Schéma</div></div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Dernière Synchro</h4><p className="text-sm text-foreground-600">{selectedDH.last_sync || 'Jamais synchronisé'}</p></div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Contrôle d'Accès</h4><div className="flex flex-wrap gap-2">{(selectedDH.access_controls || []).map((a: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-background-100 text-foreground-600">{a}</span>))}</div></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'decisions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-scales-3-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Decision Intelligence Engine™</h3><p className="text-xs text-foreground-500">BLOC 42 — Données en Décisions</p></div></div>
              {decisionIntelligence.map((di) => (
                <div key={di.id} onClick={() => setSelectedDI(di)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedDI.id === di.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{di.analysis_type}</span><span className={`text-sm font-bold ${getConfidenceColor(di.confidence_level)}`}>{di.confidence_level}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{di.decision_title}</h4>
                  <div className="mt-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(di.decision_status)}`}>{di.decision_status}</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedDI.analysis_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedDI.decision_status)}`}>{selectedDI.decision_status}</span><span className={`text-sm font-bold ml-auto ${getConfidenceColor(selectedDI.confidence_level)}`}>Confiance {selectedDI.confidence_level}/10</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedDI.decision_title}</h2>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Scénarios</h4><div className="space-y-2">{(selectedDI.scenarios_generated || []).map((s: string, i: number) => (<div key={i} className="p-3 bg-background-100 rounded-lg border border-background-200/70"><p className="text-sm text-foreground-700">{s}</p></div>))}</div></div>
                <div className="p-4 bg-primary-50/50 rounded-lg border border-primary-200 mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-1">Recommandation Exécutive</h4><p className="text-sm text-foreground-700">{selectedDI.executive_recommendation}</p></div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Tendances Identifiées</h4>{(selectedDI.trends_identified || []).map((t: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-arrow-up-line text-primary-400"></i>{t}</div>))}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pmo' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-projector-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Autonomous PMO™</h3><p className="text-xs text-foreground-500">BLOC 43 — Pilotage Automatique</p></div></div>
              {pmoProjects.map((pmo) => (
                <div key={pmo.id} onClick={() => setSelectedPMO(pmo)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedPMO.id === pmo.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{pmo.phase}</span><span className="text-sm font-bold text-foreground-950">{pmo.actual_progress}%</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{pmo.project_name}</h4>
                  <div className="flex items-center gap-3 mt-2"><span className="text-xs text-foreground-500">{formatFCFA(pmo.budget_consumed_fcfa)} / {formatFCFA(pmo.budget_total_fcfa)}</span></div>
                  {pmo.risk_flags.length > 0 && <div className="flex items-center gap-1 mt-1"><i className="ri-error-warning-line text-orange-500 text-xs"></i><span className="text-xs text-orange-600">{pmo.risk_flags[0]}</span></div>}
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedPMO.phase}</span><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900 font-medium">{selectedPMO.project_type}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedPMO.project_name}</h2>
                <div className="mb-4"><div className="flex items-center justify-between mb-1"><span className="text-xs text-foreground-500">Progression</span><span className="text-xs font-bold text-foreground-950">{selectedPMO.actual_progress}%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: `${selectedPMO.actual_progress}%` }}></div></div></div>
                <div className="grid grid-cols-2 gap-4 mb-4"><div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Budget</div><div className="text-sm font-bold text-foreground-950">{formatFCFA(selectedPMO.budget_consumed_fcfa)} / {formatFCFA(selectedPMO.budget_total_fcfa)}</div></div><div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Alertes</div><div className="text-sm font-bold text-foreground-950">{selectedPMO.alerts_generated}</div></div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Jalons</h4>{(selectedPMO.milestones || []).map((m: any, i: number) => (<div key={i} className="flex items-center justify-between p-2 text-sm"><span className="text-foreground-700">{m.name}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.status === 'completed' ? 'bg-green-100 text-green-700' : m.status === 'in_progress' ? 'bg-secondary-100 text-secondary-900' : 'bg-gray-100 text-gray-600'}`}>{m.status}</span></div>))}</div>
                {selectedPMO.risk_flags.length > 0 && (<div><h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2"><i className="ri-error-warning-line text-orange-500"></i>Risques</h4>{(selectedPMO.risk_flags || []).map((r: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-orange-700 bg-orange-50 rounded-lg mb-1"><i className="ri-flag-line text-orange-400"></i>{r}</div>))}</div>)}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Cible — Data & Décision</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Data Hub</span><span className="text-xs font-bold text-foreground-950">93%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '65%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Décision Intelligence</span><span className="text-xs font-bold text-foreground-950">93%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: '42%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">PMO Autonome</span><span className="text-xs font-bold text-foreground-950">93%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-secondary-500 rounded-full" style={{ width: '35%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Qualité Données</span><span className="text-xs font-bold text-foreground-950">93%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '55%' }}></div></div></div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}