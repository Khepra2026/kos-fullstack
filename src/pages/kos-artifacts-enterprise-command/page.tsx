import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { executiveDashboardBlueprints, transformationRoadmap, controlTowerComponents, thinkTankPublications, enterpriseManualBooks } from '@/mocks/kosArtifactsEnterpriseCommand';

type Tab = 'dashboards' | 'roadmap' | 'controltower' | 'thinktank' | 'manual';

export default function KOSArtifactsEnterpriseCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboards');
  const [selectedDash, setSelectedDash] = useState(executiveDashboardBlueprints[0]);
  const [selectedRoad, setSelectedRoad] = useState(transformationRoadmap[0]);
  const [selectedCT, setSelectedCT] = useState(controlTowerComponents[0]);
  const [selectedTT, setSelectedTT] = useState(thinkTankPublications[0]);
  const [selectedEM, setSelectedEM] = useState(enterpriseManualBooks[0]);

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { published: 'bg-green-100 text-green-700', active: 'bg-green-100 text-green-700', draft: 'bg-gray-100 text-gray-700', review: 'bg-yellow-100 text-yellow-700', planned: 'bg-secondary-100 text-secondary-900', in_progress: 'bg-secondary-100 text-secondary-900', completed: 'bg-green-100 text-green-700', on_hold: 'bg-orange-100 text-orange-700', cancelled: 'bg-red-100 text-red-700' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return 'bg-red-100 text-red-700';
    if (priority === 2) return 'bg-orange-100 text-orange-700';
    return 'bg-secondary-100 text-secondary-900';
  };

  const getAudienceLabel = (audience: string) => {
    const map: Record<string, string> = { CEO: 'CEO', PMO: 'PMO', Marketing: 'Marketing', SEO: 'SEO', Finance: 'Finance', Technology: 'Technology', AI_Governance: 'AI Governance', Operations: 'Opérations', Board: 'Conseil' };
    return map[audience] || audience;
  };

  const tabs: { id: Tab; label: string; icon: string; count: number; bloc: string }[] = [
    { id: 'dashboards', label: 'Executive Dashboards', icon: 'ri-dashboard-line', count: executiveDashboardBlueprints.length, bloc: 'BLOC 15' },
    { id: 'roadmap', label: 'Transformation Roadmap', icon: 'ri-road-map-line', count: transformationRoadmap.length, bloc: 'BLOC 16' },
    { id: 'controltower', label: 'Control Tower', icon: 'ri-radar-line', count: controlTowerComponents.length, bloc: 'BLOC 18' },
    { id: 'thinktank', label: 'Think Tank Factory', icon: 'ri-lightbulb-flash-line', count: thinkTankPublications.length, bloc: 'BLOC 19' },
    { id: 'manual', label: 'Enterprise Manual', icon: 'ri-book-3-line', count: enterpriseManualBooks.length, bloc: 'BLOC 20' },
  ];

  const phaseLabels: Record<string, string> = { fondations: 'Fondations', industrialisation: 'Industrialisation', automatisation: 'Automatisation Avancée', enterprise_os: 'Enterprise OS' };
  const bookTypeLabels: Record<string, string> = { architecture: 'Architecture Book', governance: 'Governance Book', automation: 'Automation Book', quality: 'Quality Book', pmo: 'PMO Book', sre: 'SRE Book', seo: 'SEO Book', knowledge: 'Knowledge Book', ai_governance: 'AI Governance Manual', executive_playbook: 'Executive Playbook' };

  return (
    <KOSHubLayout hubId={25}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold mb-4">
                <i className="ri-archive-line"></i>
                KOS Implementation Artifacts Factory™
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Enterprise Command Factory
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Executive Dashboards, Roadmap de Transformation, Control Tower, Think Tank Factory et Enterprise Operating Manual — l'assemblage final des artefacts KOS.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">5</div><div className="text-xs text-foreground-500">BLOCS</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-red-500">10</div><div className="text-xs text-foreground-500">Livres</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i>{tab.label}<span className="text-xs opacity-50 ml-1">{tab.bloc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === 'dashboards' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-dashboard-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Executive Dashboard Generator™</h3><p className="text-xs text-foreground-500">BLOC 15 — Blueprints Tableaux de Bord</p></div></div>
              {executiveDashboardBlueprints.map((ed) => (
                <div key={ed.id} onClick={() => setSelectedDash(ed)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedDash.id === ed.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{getAudienceLabel(ed.target_audience)}</span><span className="text-xs text-foreground-400">{ed.refresh_frequency}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{ed.dashboard_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{ed.description}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{getAudienceLabel(selectedDash.target_audience)}</span><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900 font-medium">{selectedDash.refresh_frequency}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedDash.status)}`}>{selectedDash.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedDash.dashboard_name}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedDash.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Type Visualisation</span><p className="text-sm font-semibold text-foreground-950">{selectedDash.visualization_type}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Drill-Down</span><p className="text-sm font-semibold text-green-600">{selectedDash.drill_down_capability ? 'Activé' : 'Désactivé'}</p></div>
                </div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">KPIs Clés</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDash.key_metrics.map((m: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">{m}</span>))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-road-map-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Roadmap Generator™</h3><p className="text-xs text-foreground-500">BLOC 16 — Feuille de Route Transformation</p></div></div>
              {transformationRoadmap.map((rd) => (
                <div key={rd.id} onClick={() => setSelectedRoad(rd)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedRoad.id === rd.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{phaseLabels[rd.phase] || rd.phase}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(rd.priority)}`}>P{rd.priority}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{rd.initiative_name}</h4>
                  <div className="mt-2 h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: `${rd.progress_pct}%` }}></div></div>
                  <span className="text-xs text-foreground-400 mt-1 block">{rd.progress_pct}%</span>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{phaseLabels[selectedRoad.phase] || selectedRoad.phase}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(selectedRoad.priority)}`}>Priorité {selectedRoad.priority}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedRoad.status)}`}>{selectedRoad.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedRoad.initiative_name}</h2>
                <p className="text-xs text-foreground-500 mb-4">{selectedRoad.time_horizon}</p>
                <p className="text-sm text-foreground-600 mb-6">{selectedRoad.description}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedRoad.progress_pct}%</div><div className="text-xs text-foreground-500">Progrès</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedRoad.estimated_budget_fcfa.toLocaleString()} FCFA</div><div className="text-xs text-foreground-500">Budget Estimé</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedRoad.risk_level}</div><div className="text-xs text-foreground-500">Niveau Risque</div></div>
                </div>
                {selectedRoad.roi_expected && (
                  <div className="p-3 bg-green-50/50 rounded-lg border border-green-200/60"><span className="text-xs text-green-700 font-semibold">ROI Attendu</span><p className="text-sm text-foreground-600 mt-1">{selectedRoad.roi_expected}</p></div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'controltower' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700"><i className="ri-radar-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Enterprise Control Tower™</h3><p className="text-xs text-foreground-500">BLOC 18 — Centre de Pilotage</p></div></div>
              {controlTowerComponents.map((ct) => (
                <div key={ct.id} onClick={() => setSelectedCT(ct)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedCT.id === ct.id ? 'border-red-300 bg-red-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{ct.component_type}</span><span className="text-xs text-foreground-400">{ct.review_frequency}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{ct.tower_component}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{ct.description}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedCT.component_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedCT.status)}`}>{selectedCT.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedCT.tower_component}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedCT.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Fréquence</span><p className="text-sm font-semibold text-foreground-950">{selectedCT.review_frequency}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Équipe Responsable</span><p className="text-sm font-semibold text-foreground-950">{selectedCT.responsible_team}</p></div>
                </div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Métriques Surveillées</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCT.monitoring_metrics.map((m: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">{m}</span>))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'thinktank' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-lightbulb-flash-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Think Tank Factory™</h3><p className="text-xs text-foreground-500">BLOC 19 — Production Intellectuelle</p></div></div>
              {thinkTankPublications.map((tt) => (
                <div key={tt.id} onClick={() => setSelectedTT(tt)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedTT.id === tt.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{tt.publication_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(tt.status)}`}>{tt.status}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{tt.title}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{tt.publication_frequency}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedTT.publication_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedTT.status)}`}>{selectedTT.status}</span>{selectedTT.peer_review_required && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Peer Review</span>}</div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedTT.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Méthodologie</span><p className="text-sm font-semibold text-foreground-950">{selectedTT.research_methodology}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Fréquence</span><p className="text-sm font-semibold text-foreground-950">{selectedTT.publication_frequency}</p></div>
                </div>
                {selectedTT.target_audience && (
                  <div className="p-3 bg-background-100 rounded-lg mb-4"><span className="text-xs text-foreground-500">Audience Cible</span><p className="text-sm font-semibold text-foreground-950">{selectedTT.target_audience}</p></div>
                )}
                <div className="p-3 bg-accent-50/50 rounded-lg border border-accent-200/60"><span className="text-xs text-accent-700 font-semibold">Impact Attendu</span><p className="text-sm text-foreground-600 mt-1">{selectedTT.expected_impact}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-book-3-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Enterprise Operating Manual™</h3><p className="text-xs text-foreground-500">BLOC 20 — Assemblage Final</p></div></div>
              {enterpriseManualBooks.map((em) => (
                <div key={em.id} onClick={() => setSelectedEM(em)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedEM.id === em.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{bookTypeLabels[em.book_type] || em.book_type}</span><span className="text-xs text-foreground-400">{em.total_pages}p</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{em.manual_book}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{em.description}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{bookTypeLabels[selectedEM.book_type] || selectedEM.book_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedEM.status)}`}>{selectedEM.status}</span><span className="text-xs text-foreground-400 ml-auto">v{selectedEM.version}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedEM.manual_book}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedEM.description}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedEM.total_pages}</div><div className="text-xs text-foreground-500">Pages</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedEM.review_cycle_months}m</div><div className="text-xs text-foreground-500">Cycle Revue</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-sm font-bold text-foreground-950 capitalize">{selectedEM.distribution_level}</div><div className="text-xs text-foreground-500">Distribution</div></div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Dernière Mise à Jour</span><p className="text-sm font-semibold text-foreground-950">{new Date(selectedEM.last_major_update).toLocaleDateString('fr-FR')}</p></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Enterprise Command — Vue Consolidée</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Dashboards', target: 15, current: 67, unit: '%' },
              { label: 'Roadmap Progress', target: 100, current: 59, unit: '%' },
              { label: 'Control Tower', target: 100, current: 75, unit: '%' },
              { label: 'Think Tank Output', target: 50, current: 40, unit: '%' },
              { label: 'Manual Completion', target: 10, current: 60, unit: ' livres' },
            ].map((m) => (
              <div key={m.label} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">{m.label}</span><span className="text-xs font-bold text-foreground-950">{m.target}{m.unit}</span></div>
                <div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full" style={{ width: `${m.current}%` }}></div></div>
                <span className="text-xs text-foreground-400 mt-1 block">{m.current}{m.unit} actuel</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}