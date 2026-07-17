import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { sopLibraryEntries, kpiDictionaryEntries, qualityManagementControls, sreFrameworkComponents } from '@/mocks/kosArtifactsOperationalExcellence';
import { pmoFrameworkComponents } from '@/mocks/kosArtifactsArchitectureGovernance';

const pmoData = [
  { id: "pmo-001", framework_component: "Portefeuille de Projets — Vue Consolidée", component_type: "dashboard", description: "Vue consolidée du portefeuille de missions KHEPRA EXPERTS avec jalons, budgets, ressources et risques.", project_portfolio: "Portefeuille Global (25 missions actives)", version: "1.5", status: "published" },
  { id: "pmo-002", framework_component: "Gouvernance Projet — Phase Gates", component_type: "policy", description: "Système de phase gates obligatoires pour toute mission : cadrage, diagnostic, recommandations, livraison, suivi.", project_portfolio: "Standard Toutes Missions", version: "2.0", status: "published" },
  { id: "pmo-003", framework_component: "Reporting Hebdomadaire — Template Exécutif", component_type: "template", description: "Template standardisé de reporting hebdomadaire pour le COMEX : avancement, risques, budget, actions.", project_portfolio: "COMEX Dashboard", version: "1.8", status: "published" },
  { id: "pmo-004", framework_component: "Gestion des Risques Projets", component_type: "process", description: "Processus de gestion des risques projets : identification, évaluation, mitigation, suivi continu.", project_portfolio: "Tous Projets", version: "1.0", status: "draft" },
];

type Tab = 'sop' | 'kpi' | 'pmo' | 'quality' | 'sre';

export default function KOSArtifactsOperationalExcellencePage() {
  const [activeTab, setActiveTab] = useState<Tab>('sop');
  const [selectedSOP, setSelectedSOP] = useState(sopLibraryEntries[0]);
  const [selectedKPI, setSelectedKPI] = useState(kpiDictionaryEntries[0]);
  const [selectedPMO, setSelectedPMO] = useState(pmoData[0]);
  const [selectedQM, setSelectedQM] = useState(qualityManagementControls[0]);
  const [selectedSRE, setSelectedSRE] = useState(sreFrameworkComponents[0]);

  const getScoreColor = (score: number) => score >= 9 ? 'text-green-600' : score >= 7 ? 'text-yellow-600' : 'text-red-600';
  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { published: 'bg-green-100 text-green-700', draft: 'bg-gray-100 text-gray-700', active: 'bg-green-100 text-green-700', testing: 'bg-yellow-100 text-yellow-700' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };
  const getTrendIcon = (trend: string) => trend === 'up' ? 'ri-arrow-up-line text-green-500' : trend === 'down' ? 'ri-arrow-down-line text-red-500' : 'ri-subtract-line text-gray-500';

  const tabs: { id: Tab; label: string; icon: string; count: number; bloc: string }[] = [
    { id: 'sop', label: 'SOP Factory', icon: 'ri-file-list-3-line', count: sopLibraryEntries.length, bloc: 'BLOC 3' },
    { id: 'kpi', label: 'KPI Dictionary', icon: 'ri-bar-chart-2-line', count: kpiDictionaryEntries.length, bloc: 'BLOC 4' },
    { id: 'pmo', label: 'PMO Framework', icon: 'ri-projector-line', count: pmoData.length, bloc: 'BLOC 9' },
    { id: 'quality', label: 'Quality Management', icon: 'ri-award-line', count: qualityManagementControls.length, bloc: 'BLOC 10' },
    { id: 'sre', label: 'SRE Framework', icon: 'ri-cloud-line', count: sreFrameworkComponents.length, bloc: 'BLOC 12' },
  ];

  return (
    <KOSHubLayout hubId={23}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4">
                <i className="ri-archive-line"></i>
                KOS Implementation Artifacts Factory™
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Operational Excellence Factory
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                SOP Factory (200+ procédures), KPI Dictionary, PMO Framework, Quality Management et SRE Handbook — l'excellence opérationnelle documentée et exécutable.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">5</div><div className="text-xs text-foreground-500">BLOCS</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-primary-500">200+</div><div className="text-xs text-foreground-500">SOPs cible</div></div>
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
        {activeTab === 'sop' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-file-list-3-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS SOP Factory™</h3><p className="text-xs text-foreground-500">BLOC 3 — 200+ Procédures Standardisées</p></div></div>
              {sopLibraryEntries.map((sop) => (
                <div key={sop.id} onClick={() => setSelectedSOP(sop)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedSOP.id === sop.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{sop.category}</span><span className="text-xs font-mono text-foreground-400">{sop.sop_code}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{sop.title}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{sop.responsible_role}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedSOP.category}</span><span className="text-xs font-mono text-foreground-400">{selectedSOP.sop_code}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedSOP.status)}`}>{selectedSOP.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSOP.title}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedSOP.objective}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Responsable</span><p className="text-sm font-semibold text-foreground-950">{selectedSOP.responsible_role}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Fréquence</span><p className="text-sm font-semibold text-foreground-950">{selectedSOP.frequency}</p></div>
                </div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Procédure Étape par Étape</h4>
                  {selectedSOP.procedure_steps.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-background-100 rounded-lg mb-2">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div>
                      <p className="text-sm text-foreground-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kpi' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-bar-chart-2-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS KPI Dictionary™</h3><p className="text-xs text-foreground-500">BLOC 4 — Dictionnaire des KPIs</p></div></div>
              {kpiDictionaryEntries.map((kpi) => (
                <div key={kpi.id} onClick={() => setSelectedKPI(kpi)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedKPI.id === kpi.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{kpi.domain}</span><i className={`${getTrendIcon(kpi.trend)} text-lg`}></i></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{kpi.kpi_name}</h4>
                  <div className="flex items-center gap-2 mt-2"><span className="text-lg font-bold">{kpi.current_value}{kpi.unit}</span><span className="text-xs text-foreground-400">/ {kpi.target_value}{kpi.unit}</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedKPI.domain}</span><span className="text-xs font-mono text-foreground-400">{selectedKPI.kpi_code}</span><i className={`${getTrendIcon(selectedKPI.trend)} text-lg ml-auto`}></i></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedKPI.kpi_name}</h2>
                <p className="text-sm text-foreground-600 mb-4"><strong>Définition :</strong> {selectedKPI.definition}</p>
                <p className="text-sm text-foreground-600 mb-4"><strong>Formule :</strong> {selectedKPI.formula}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="p-3 bg-green-50 rounded-lg text-center"><div className="text-lg font-bold text-green-600">{selectedKPI.target_value}{selectedKPI.unit}</div><div className="text-xs text-green-700">Cible</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedKPI.current_value}{selectedKPI.unit}</div><div className="text-xs text-foreground-500">Actuel</div></div>
                  <div className="p-3 bg-green-50/50 rounded-lg text-center"><div className="text-sm font-bold text-green-600">{selectedKPI.threshold_green}</div><div className="text-xs text-green-700">Vert</div></div>
                  <div className="p-3 bg-red-50/50 rounded-lg text-center"><div className="text-sm font-bold text-red-600">{selectedKPI.threshold_red}</div><div className="text-xs text-red-700">Rouge</div></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Source</span><p className="text-sm font-semibold text-foreground-950">{selectedKPI.data_source}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Fréquence</span><p className="text-sm font-semibold text-foreground-950">{selectedKPI.measurement_frequency}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pmo' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-projector-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS PMO Framework™</h3><p className="text-xs text-foreground-500">BLOC 9 — Pilotage de Projets</p></div></div>
              {pmoData.map((pmo) => (
                <div key={pmo.id} onClick={() => setSelectedPMO(pmo)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedPMO.id === pmo.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{pmo.component_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(pmo.status)}`}>{pmo.status}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{pmo.framework_component}</h4>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedPMO.component_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedPMO.status)}`}>v{selectedPMO.version}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedPMO.framework_component}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedPMO.description}</p>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70"><span className="text-xs text-foreground-500">Portefeuille</span><p className="text-sm font-semibold text-foreground-950 mt-1">{selectedPMO.project_portfolio}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-award-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Quality Management™</h3><p className="text-xs text-foreground-500">BLOC 10 — Référentiel Qualité</p></div></div>
              {qualityManagementControls.map((qm) => (
                <div key={qm.id} onClick={() => setSelectedQM(qm)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedQM.id === qm.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{qm.control_domain}</span><span className="text-sm font-bold text-green-600">{qm.acceptance_threshold}%</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{qm.control_name}</h4>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedQM.control_domain}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedQM.status)}`}>{selectedQM.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedQM.control_name}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedQM.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-green-600">{selectedQM.acceptance_threshold}%</div><div className="text-xs text-foreground-500">Seuil</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-sm font-bold text-foreground-950">{selectedQM.review_frequency}</div><div className="text-xs text-foreground-500">Fréquence</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-sm font-bold text-foreground-950">{selectedQM.quality_gate_position}</div><div className="text-xs text-foreground-500">Position</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-sm font-bold text-foreground-950">v{selectedQM.version}</div><div className="text-xs text-foreground-500">Version</div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sre' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-cloud-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS SRE Framework™</h3><p className="text-xs text-foreground-500">BLOC 12 — Site Reliability Engineering</p></div></div>
              {sreFrameworkComponents.map((sre) => (
                <div key={sre.id} onClick={() => setSelectedSRE(sre)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedSRE.id === sre.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{sre.component_type}</span><span className="text-sm font-bold text-green-600">{sre.target_slo}%</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{sre.sre_component}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{sre.description}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedSRE.component_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedSRE.status)}`}>{selectedSRE.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSRE.sre_component}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedSRE.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-green-600">{selectedSRE.target_slo}%</div><div className="text-xs text-foreground-500">SLO Cible</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-yellow-600">{selectedSRE.alert_threshold}%</div><div className="text-xs text-foreground-500">Alerte</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-red-600">{selectedSRE.critical_threshold}%</div><div className="text-xs text-foreground-500">Critique</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-sm font-bold text-foreground-950">{selectedSRE.measurement_window_days}j</div><div className="text-xs text-foreground-500">Fenêtre</div></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Excellence Opérationnelle</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'SOP Coverage', target: 200, current: 85, unit: ' SOPs' },
              { label: 'KPI Tracking', target: 95, current: 68, unit: '%' },
              { label: 'PMO Maturity', target: 95, current: 72, unit: '%' },
              { label: 'Quality Gates', target: 100, current: 88, unit: '%' },
              { label: 'SRE SLO Attain', target: 99.9, current: 97.5, unit: '%' },
            ].map((m) => (
              <div key={m.label} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">{m.label}</span><span className="text-xs font-bold text-foreground-950">{m.target}{m.unit}</span></div>
                <div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min(100, (m.current / m.target) * 100)}%` }}></div></div>
                <span className="text-xs text-foreground-400 mt-1 block">{m.current}{m.unit} actuel</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}