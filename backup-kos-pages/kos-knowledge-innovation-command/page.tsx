import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { knowledgeMonetizationAssets, serviceInnovations, trainingModules } from '@/mocks/knowledgeInnovation';

type Tab = 'monetization' | 'innovation' | 'academy';

export default function knowledgeInnovationCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>('monetization');
  const [selectedKM, setSelectedKM] = useState(knowledgeMonetizationAssets[0]);
  const [selectedSI, setSelectedSI] = useState(serviceInnovations[0]);
  const [selectedTM, setSelectedTM] = useState(trainingModules[0]);

  const formatFCFA = (val: number) => `${(val / 1000000).toFixed(0)}M FCFA`;

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { active: 'bg-green-100 text-green-700', in_progress: 'bg-secondary-100 text-secondary-900', planned: 'bg-gray-100 text-gray-700', prototype: 'bg-accent-100 text-accent-900', pilot: 'bg-amber-100 text-amber-700', ideation: 'bg-gray-100 text-gray-600' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'monetization', label: 'Knowledge Monetization', icon: 'ri-money-dollar-circle-line', count: knowledgeMonetizationAssets.length },
    { id: 'innovation', label: 'Service Innovation Factory', icon: 'ri-lightbulb-flash-line', count: serviceInnovations.length },
    { id: 'academy', label: 'Training Academy', icon: 'ri-graduation-cap-line', count: trainingModules.length },
  ];

  return (
    <hubLayout hubId={12}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4"><i className="ri-brain-line"></i>KOS Phase 3 — Hyper-Automation</div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Knowledge & Innovation Command</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">Monétisation du capital intellectuel, création automatique d'offres, université interne — transformer la connaissance en actif stratégique.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">3</div><div className="text-xs text-foreground-500">BLOCS actifs</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-primary-500">95%</div><div className="text-xs text-foreground-500">Capitalisation cible</div></div>
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
        {activeTab === 'monetization' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-money-dollar-circle-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Knowledge Monetization Engine™</h3><p className="text-xs text-foreground-500">BLOC 34 — Capital Intellectuel → Actifs</p></div></div>
              {knowledgeMonetizationAssets.map((km) => (
                <div key={km.id} onClick={() => setSelectedKM(km)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedKM.id === km.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(km.monetization_status)}`}>{km.monetization_status}</span><span className="text-sm font-bold text-accent-600">{formatFCFA(km.estimated_value_fcfa)}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{km.source_study}</h4>
                  <p className="text-xs text-foreground-500 mt-1">Mission source : {km.source_mission}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedKM.monetization_status)}`}>{selectedKM.monetization_status}</span><span className="text-2xl font-bold text-accent-600 ml-auto">{formatFCFA(selectedKM.estimated_value_fcfa)}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedKM.source_study}</h2>
                <p className="text-xs text-foreground-500 mb-4">Source : {selectedKM.source_mission}</p>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Pipeline de Conversion</h4><div className="flex flex-wrap gap-2">{(selectedKM.conversion_pipeline || []).map((step: string, i: number) => (<div key={i} className="flex items-center gap-1"><span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">{step}</span>{i < (selectedKM.conversion_pipeline || []).length - 1 && <i className="ri-arrow-right-line text-foreground-400 text-xs"></i>}</div>))}</div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Actifs Dérivés</h4><div className="flex flex-wrap gap-2">{(selectedKM.derived_assets || []).map((a: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-lg bg-accent-100 text-accent-700 font-medium">{a}</span>))}</div></div>
                <div className="grid grid-cols-2 gap-4"><div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Potentiel Commercial</div><div className="text-lg font-bold text-foreground-950">{selectedKM.commercial_potential}/10</div></div><div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Canaux</div><div className="text-xs text-foreground-700 mt-1">{(selectedKM.target_channels || []).join(', ')}</div></div></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'innovation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-lightbulb-flash-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Service Innovation Factory™</h3><p className="text-xs text-foreground-500">BLOC 35 — Nouvelles Offres</p></div></div>
              {serviceInnovations.map((si) => (
                <div key={si.id} onClick={() => setSelectedSI(si)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedSI.id === si.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(si.development_status)}`}>{si.development_status}</span><span className="text-sm font-bold text-foreground-950">{si.feasibility_score}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{si.innovation_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{si.value_proposition}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedSI.development_status)}`}>{selectedSI.development_status}</span><span className="text-sm font-bold text-foreground-950 ml-auto">Faisabilité : {selectedSI.feasibility_score}/10</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSI.innovation_name}</h2>
                <p className="text-sm text-foreground-600 mb-4">{selectedSI.value_proposition}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"><div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Business Model</div><div className="text-sm font-medium text-foreground-950">{selectedSI.business_model}</div></div><div className="p-3 bg-background-100 rounded-lg"><div className="text-xs text-foreground-500">Marché Cible</div><div className="text-sm font-medium text-foreground-950">{selectedSI.target_market}</div></div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Avantage Concurrentiel</h4><p className="text-sm text-foreground-600">{selectedSI.competitive_advantage}</p></div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Stratégie Commerciale</h4><p className="text-sm text-foreground-600">{selectedSI.commercial_strategy}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academy' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-graduation-cap-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Training Academy™</h3><p className="text-xs text-foreground-500">BLOC 36 — Université Interne</p></div></div>
              {trainingModules.map((tm) => (
                <div key={tm.id} onClick={() => setSelectedTM(tm)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedTM.id === tm.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{tm.module_type}</span><span className="text-xs text-foreground-500">{tm.duration_hours}h</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{tm.module_title}</h4>
                  <div className="flex items-center gap-3 mt-2"><span className="text-xs text-foreground-500">{tm.enrollment_count} inscrits</span><span className="text-xs text-green-600">{tm.completion_rate}% complétion</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedTM.module_type}</span>{selectedTM.certification_available && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Certifiant</span>}<span className="text-xs text-foreground-500 ml-auto">{selectedTM.duration_hours}h</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedTM.module_title}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4"><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedTM.enrollment_count}</div><div className="text-xs text-foreground-500">Inscrits</div></div><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-green-600">{selectedTM.completion_rate}%</div><div className="text-xs text-foreground-500">Complétion</div></div><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedTM.difficulty_level}</div><div className="text-xs text-foreground-500">Niveau</div></div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Public Cible</h4><div className="flex flex-wrap gap-2">{(selectedTM.target_audience || []).map((a: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-background-100 text-foreground-600">{a}</span>))}</div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Parcours</h4><p className="text-sm text-foreground-600">{selectedTM.learning_path}</p></div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Évaluation</h4><div className="flex flex-wrap gap-2">{(selectedTM.assessment_method || []).map((m: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-lg bg-secondary-100 text-secondary-700 font-medium">{m}</span>))}</div></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Cible — Connaissance & Innovation</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Capitalisation Connaissances</span><span className="text-xs font-bold text-foreground-950">95%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: '58%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Monétisation Savoir</span><span className="text-xs font-bold text-foreground-950">90%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '45%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Innovation Services</span><span className="text-xs font-bold text-foreground-950">90%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-secondary-500 rounded-full" style={{ width: '40%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Académie Interne</span><span className="text-xs font-bold text-foreground-950">90%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: '52%' }}></div></div></div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





