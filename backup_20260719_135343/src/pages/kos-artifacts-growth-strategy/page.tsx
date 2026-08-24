import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { agentCatalogEntries, securityFrameworkControls, seoAuthorityStandards, clientSuccessPlaybook, maturityModelAssessments } from '@/mocks/artifactsGrowthStrategy';

type Tab = 'agents' | 'security' | 'seo' | 'clientsuccess' | 'maturity';

export default function artifactsGrowthStrategyPage() {
  const [activeTab, setActiveTab] = useState<Tab>('agents');
  const [selectedAgent, setSelectedAgent] = useState(agentCatalogEntries[0]);
  const [selectedSec, setSelectedSec] = useState(securityFrameworkControls[0]);
  const [selectedSEO, setSelectedSEO] = useState(seoAuthorityStandards[0]);
  const [selectedCS, setSelectedCS] = useState(clientSuccessPlaybook[0]);
  const [selectedMM, setSelectedMM] = useState(maturityModelAssessments[0]);

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { published: 'bg-green-100 text-green-700', active: 'bg-green-100 text-green-700', draft: 'bg-gray-100 text-gray-700', in_progress: 'bg-secondary-100 text-secondary-900', completed: 'bg-green-100 text-green-700', planned: 'bg-secondary-100 text-secondary-900' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const getMaturityColor = (level: number) => {
    if (level >= 4) return 'text-green-600';
    if (level >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDomainLabel = (domain: string) => {
    const map: Record<string, string> = { strategy: 'Stratégie', compliance: 'Conformité', knowledge: 'Connaissance', growth: 'Croissance', innovation: 'Innovation', quality: 'Qualité', governance: 'Gouvernance', operations: 'Opérations', technology: 'Technologie', marketing: 'Marketing', security: 'Sécurité', finance: 'Finance' };
    return map[domain] || domain;
  };

  const tabs: { id: Tab; label: string; icon: string; count: number; bloc: string }[] = [
    { id: 'agents', label: 'Agent Catalog', icon: 'ri-robot-line', count: agentCatalogEntries.length, bloc: 'BLOC 2' },
    { id: 'security', label: 'Security Framework', icon: 'ri-shield-line', count: securityFrameworkControls.length, bloc: 'BLOC 11' },
    { id: 'seo', label: 'SEO Authority', icon: 'ri-search-line', count: seoAuthorityStandards.length, bloc: 'BLOC 13' },
    { id: 'clientsuccess', label: 'Client Success', icon: 'ri-user-heart-line', count: clientSuccessPlaybook.length, bloc: 'BLOC 14' },
    { id: 'maturity', label: 'Maturity Model', icon: 'ri-line-chart-line', count: maturityModelAssessments.length, bloc: 'BLOC 17' },
  ];

  return (
    <hubLayout hubId={24}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-semibold mb-4">
                <i className="ri-archive-line"></i>
                KOS Implementation Artifacts Factory™
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Growth & Strategy Factory
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Catalogue des agents IA, Security Framework, SEO Operating System, Client Success Playbook et Capability Maturity Model — les standards qui propulsent la croissance.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">5</div><div className="text-xs text-foreground-500">BLOCS</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-secondary-500">50</div><div className="text-xs text-foreground-500">Agents</div></div>
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
        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-robot-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Agent Catalog Generator™</h3><p className="text-xs text-foreground-500">BLOC 2 — Registre Officiel des Agents</p></div></div>
              {agentCatalogEntries.map((ag) => (
                <div key={ag.id} onClick={() => setSelectedAgent(ag)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedAgent.id === ag.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{getDomainLabel(ag.domain)}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ag.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{ag.is_active ? 'Actif' : 'Inactif'}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{ag.agent_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-1">{ag.mission}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{getDomainLabel(selectedAgent.domain)}</span><span className="text-xs font-mono text-foreground-400">{selectedAgent.agent_code}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${selectedAgent.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{selectedAgent.is_active ? 'Actif' : 'Inactif'}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedAgent.agent_name}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedAgent.mission}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Responsabilités</h4>
                    {selectedAgent.responsibilities.map((r: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-check-line text-accent-500"></i>{r}</div>))}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">KPIs</h4>
                    {selectedAgent.kpis.map((k: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-bar-chart-line text-primary-500"></i>{k}</div>))}
                  </div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Score de Maturité</span><div className="flex items-center gap-2 mt-1">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className={`w-6 h-6 rounded-full ${i < selectedAgent.maturity_score ? 'bg-accent-500' : 'bg-background-200/70'}`}></div>))}</div></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-shield-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Security Framework Generator™</h3><p className="text-xs text-foreground-500">BLOC 11 — Standards de Sécurité</p></div></div>
              {securityFrameworkControls.map((sf) => (
                <div key={sf.id} onClick={() => setSelectedSec(sf)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedSec.id === sf.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{sf.domain_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sf.risk_level === 'critique' ? 'bg-red-100 text-red-700' : sf.risk_level === 'eleve' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{sf.risk_level}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{sf.security_domain}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{sf.reference_standard}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedSec.domain_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedSec.risk_level === 'critique' ? 'bg-red-100 text-red-700' : selectedSec.risk_level === 'eleve' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{selectedSec.risk_level}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedSec.status)}`}>{selectedSec.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSec.security_domain}</h2>
                <p className="text-sm text-foreground-600 mb-4"><strong>Objectif :</strong> {selectedSec.control_objective}</p>
                <p className="text-sm text-foreground-600 mb-6">{selectedSec.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Référence</span><p className="text-sm font-semibold text-foreground-950">{selectedSec.reference_standard}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Fréquence Revue</span><p className="text-sm font-semibold text-foreground-950">{selectedSec.review_frequency}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-search-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS SEO Authority Framework™</h3><p className="text-xs text-foreground-500">BLOC 13 — SEO Operating System</p></div></div>
              {seoAuthorityStandards.map((seo) => (
                <div key={seo.id} onClick={() => setSelectedSEO(seo)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedSEO.id === seo.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{seo.component_type}</span><span className="text-xs text-foreground-400">{seo.audit_frequency}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{seo.seo_component}</h4>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedSEO.component_type}</span><span className="text-xs text-foreground-400">{selectedSEO.audit_frequency}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedSEO.seo_component}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedSEO.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">KPI Cible</span><p className="text-sm font-semibold text-foreground-950">{selectedSEO.target_kpi}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Fréquence Audit</span><p className="text-sm font-semibold text-foreground-950">{selectedSEO.audit_frequency}</p></div>
                </div>
                {selectedSEO.quality_criteria && (
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                    <span className="text-xs text-foreground-500">Critères Qualité</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(selectedSEO.quality_criteria as Record<string, any>).map(([k, v]) => (
                        <span key={k} className="text-xs px-2 py-1 rounded-full bg-secondary-100 text-secondary-900 font-medium">{k}: {String(v)}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clientsuccess' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-user-heart-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Client Success Framework™</h3><p className="text-xs text-foreground-500">BLOC 14 — Playbook Client</p></div></div>
              {clientSuccessPlaybook.map((cs) => (
                <div key={cs.id} onClick={() => setSelectedCS(cs)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedCS.id === cs.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{cs.section_type}</span><span className="text-sm font-bold text-green-600">NPS ≥ {cs.nps_target}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{cs.playbook_section}</h4>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedCS.section_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedCS.status)}`}>{selectedCS.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedCS.playbook_section}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedCS.description}</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-green-50 rounded-lg text-center"><div className="text-lg font-bold text-green-600">≥ {selectedCS.health_score_threshold_green}</div><div className="text-xs text-green-700">Health Vert</div></div>
                  <div className="p-3 bg-yellow-50 rounded-lg text-center"><div className="text-sm font-bold text-yellow-600">{selectedCS.health_score_threshold_red}-{selectedCS.health_score_threshold_green}</div><div className="text-xs text-yellow-700">Orange</div></div>
                  <div className="p-3 bg-red-50 rounded-lg text-center"><div className="text-lg font-bold text-red-600">≤ {selectedCS.health_score_threshold_red}</div><div className="text-xs text-red-700">Health Rouge</div></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">NPS Cible</span><p className="text-sm font-semibold text-foreground-950">≥ {selectedCS.nps_target}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Métriques</span><div className="text-xs text-foreground-600 mt-1">{Object.entries(selectedCS.success_metrics as Record<string, string>).map(([k, v]) => (<span key={k} className="mr-2">{k}: {v}</span>))}</div></div>
                </div>
                {selectedCS.escalation_procedure && (
                  <div className="mt-4 p-3 bg-background-100 rounded-lg border border-background-200/70"><span className="text-xs text-foreground-500">Procédure d'Escalade</span><p className="text-sm text-foreground-600 mt-1">{selectedCS.escalation_procedure}</p></div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maturity' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-line-chart-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Capability Maturity Model™</h3><p className="text-xs text-foreground-500">BLOC 17 — Évaluation de Maturité</p></div></div>
              {maturityModelAssessments.map((mm) => (
                <div key={mm.id} onClick={() => setSelectedMM(mm)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedMM.id === mm.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{mm.capability_domain}</span><span className={`text-sm font-bold ${getMaturityColor(mm.current_level)}`}>Niv.{mm.current_level} → {mm.target_level}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{mm.capability_name}</h4>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedMM.capability_domain}</span><span className="text-xs text-foreground-400">{selectedMM.assessed_by}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedMM.capability_name}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedMM.description}</p>
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`flex-1 h-3 rounded-full ${i < selectedMM.current_level ? 'bg-accent-500' : i < selectedMM.target_level ? 'bg-accent-200' : 'bg-background-200/70'}`}></div>
                  ))}
                  <span className="text-xs text-foreground-500 ml-2 whitespace-nowrap">{selectedMM.current_level}/5 → cible {selectedMM.target_level}/5</span>
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70 mb-4">
                  <h4 className="text-sm font-semibold text-orange-700 mb-2">Analyse d'Écart</h4>
                  <p className="text-sm text-foreground-600">{selectedMM.gap_analysis}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Dernière Évaluation</span><p className="text-sm font-semibold text-foreground-950">{new Date(selectedMM.assessment_date).toLocaleDateString('fr-FR')}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Prochaine Évaluation</span><p className="text-sm font-semibold text-foreground-950">{new Date(selectedMM.next_assessment_date).toLocaleDateString('fr-FR')}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Growth & Strategy</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Agent Catalog', target: 50, current: 85, unit: ' agents' },
              { label: 'Security Coverage', target: 100, current: 78, unit: '%' },
              { label: 'SEO Authority', target: 95, current: 82, unit: '%' },
              { label: 'Client NPS', target: 75, current: 62, unit: '' },
              { label: 'Maturity Score', target: 5, current: 60, unit: '%' },
            ].map((m) => (
              <div key={m.label} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">{m.label}</span><span className="text-xs font-bold text-foreground-950">{m.target}{m.unit}</span></div>
                <div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-secondary-500 rounded-full" style={{ width: `${m.current}%` }}></div></div>
                <span className="text-xs text-foreground-400 mt-1 block">{m.current}{m.unit} actuel</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



