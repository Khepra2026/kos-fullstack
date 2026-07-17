import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { enterpriseArchitectureBlueprints, knowledgeArchitectureComponents, dataGovernanceAssets, aiGovernancePolicies, automationBlueprints } from '@/mocks/kosArtifactsArchitectureGovernance';

type Tab = 'architecture' | 'knowledge' | 'data' | 'ai' | 'automation';

export default function KOSArtifactsArchitectureGovernancePage() {
  const [activeTab, setActiveTab] = useState<Tab>('architecture');
  const [selectedArch, setSelectedArch] = useState(enterpriseArchitectureBlueprints[0]);
  const [selectedKA, setSelectedKA] = useState(knowledgeArchitectureComponents[0]);
  const [selectedDG, setSelectedDG] = useState(dataGovernanceAssets[0]);
  const [selectedAIG, setSelectedAIG] = useState(aiGovernancePolicies[0]);
  const [selectedAuto, setSelectedAuto] = useState(automationBlueprints[0]);

  const getMaturityColor = (level: number) => {
    if (level >= 4) return 'text-green-600 bg-green-50';
    if (level >= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { published: 'bg-green-100 text-green-700', approved: 'bg-green-100 text-green-700', review: 'bg-yellow-100 text-yellow-700', draft: 'bg-gray-100 text-gray-700', active: 'bg-green-100 text-green-700', inactive: 'bg-gray-100 text-gray-700', planned: 'bg-secondary-100 text-secondary-900' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const getClassificationBadge = (level: string) => {
    const map: Record<string, string> = { public: 'bg-green-100 text-green-700', interne: 'bg-secondary-100 text-secondary-900', internal: 'bg-secondary-100 text-secondary-900', confidentiel: 'bg-orange-100 text-orange-700', confidential: 'bg-orange-100 text-orange-700', restreint: 'bg-red-100 text-red-700', restricted: 'bg-red-100 text-red-700', secret: 'bg-accent-100 text-accent-900', board_only: 'bg-accent-100 text-accent-900' };
    return map[level] || 'bg-gray-100 text-gray-700';
  };

  const tabs: { id: Tab; label: string; icon: string; count: number; bloc: string }[] = [
    { id: 'architecture', label: 'Enterprise Architecture', icon: 'ri-building-4-line', count: enterpriseArchitectureBlueprints.length, bloc: 'BLOC 1' },
    { id: 'knowledge', label: 'Knowledge Architecture', icon: 'ri-brain-line', count: knowledgeArchitectureComponents.length, bloc: 'BLOC 5' },
    { id: 'data', label: 'Data Governance', icon: 'ri-database-2-line', count: dataGovernanceAssets.length, bloc: 'BLOC 6' },
    { id: 'ai', label: 'AI Governance', icon: 'ri-robot-line', count: aiGovernancePolicies.length, bloc: 'BLOC 7' },
    { id: 'automation', label: 'Automation Blueprint', icon: 'ri-settings-3-line', count: automationBlueprints.length, bloc: 'BLOC 8' },
  ];

  const archTypeLabels: Record<string, string> = { cible: 'Architecture Cible', logique: 'Architecture Logique', applicative: 'Architecture Applicative', donnees: 'Architecture Données', ia: 'Architecture IA', automatisation: 'Architecture Automatisation', securite: 'Architecture Sécurité', transition: 'Architecture de Transition' };

  return (
    <KOSHubLayout hubId={22}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-archive-line"></i>
                KOS Implementation Artifacts Factory™
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Architecture & Governance Factory
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Blueprints d'architecture d'entreprise, gouvernance des données, gouvernance IA alignée ISO/IEC 42001 et catalogue d'automatisations — la colonne vertébrale documentaire de KOS.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">5</div>
                <div className="text-xs text-foreground-500">BLOCS</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">20</div>
                <div className="text-xs text-foreground-500">Artefacts</div>
              </div>
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
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-building-4-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">Enterprise Architecture Generator</h3><p className="text-xs text-foreground-500">BLOC 1 — Blueprints d'Architecture</p></div></div>
              {enterpriseArchitectureBlueprints.map((ea) => (
                <div key={ea.id} onClick={() => setSelectedArch(ea)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedArch.id === ea.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{archTypeLabels[ea.architecture_type] || ea.architecture_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getMaturityColor(ea.maturity_level)}`}>Niv.{ea.maturity_level}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{ea.title}</h4>
                  <div className="flex items-center gap-2 mt-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(ea.status)}`}>{ea.status}</span><span className="text-xs text-foreground-400">v{ea.version}</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedArch.status)}`}>{selectedArch.status}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getMaturityColor(selectedArch.maturity_level)}`}>Niveau {selectedArch.maturity_level}</span><span className="text-xs text-foreground-400 ml-auto">v{selectedArch.version}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedArch.title}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedArch.vision_statement}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedArch.system_landscape?.layers || '-'}</div><div className="text-xs text-foreground-500">Couches</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedArch.system_landscape?.applications || '-'}</div><div className="text-xs text-foreground-500">Applications</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedArch.system_landscape?.agents_ia || '-'}</div><div className="text-xs text-foreground-500">Agents IA</div></div>
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Auteur</h4>
                  <p className="text-sm text-foreground-600">{selectedArch.author}</p>
                  <p className="text-xs text-foreground-400 mt-1">Dernière revue : {new Date(selectedArch.last_reviewed).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-brain-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">Knowledge Architecture Generator</h3><p className="text-xs text-foreground-500">BLOC 5 — Capitalisation Connaissances</p></div></div>
              {knowledgeArchitectureComponents.map((ka) => (
                <div key={ka.id} onClick={() => setSelectedKA(ka)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedKA.id === ka.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{ka.component_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getClassificationBadge(ka.classification_level)}`}>{ka.classification_level}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{ka.component_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{ka.description}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedKA.component_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getClassificationBadge(selectedKA.classification_level)}`}>{selectedKA.classification_level}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedKA.status)}`}>{selectedKA.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedKA.component_name}</h2>
                <p className="text-sm text-foreground-600 mb-6">{selectedKA.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Owner</span><p className="text-sm font-semibold text-foreground-950">{selectedKA.owner_role}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Steward</span><p className="text-sm font-semibold text-foreground-950">{selectedKA.steward_role}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Stockage</span><p className="text-sm font-semibold text-foreground-950">{selectedKA.storage_technology}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Version</span><p className="text-sm font-semibold text-foreground-950">v{selectedKA.version}</p></div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg border border-background-200/70"><span className="text-xs text-foreground-500">Politique de Rétention</span><p className="text-sm text-foreground-600 mt-1">{selectedKA.retention_policy}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-database-2-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">Data Governance Generator</h3><p className="text-xs text-foreground-500">BLOC 6 — Gouvernance des Données</p></div></div>
              {dataGovernanceAssets.map((dg) => (
                <div key={dg.id} onClick={() => setSelectedDG(dg)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedDG.id === dg.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{dg.asset_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getClassificationBadge(dg.classification)}`}>{dg.classification}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{dg.asset_name}</h4>
                  <div className="flex items-center gap-2 mt-2"><span className="text-xs text-foreground-400">Qualité : </span><span className="text-sm font-bold text-green-600">{dg.quality_score}%</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedDG.asset_type}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getClassificationBadge(selectedDG.classification)}`}>{selectedDG.classification}</span>{selectedDG.is_pii && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">PII</span>}{selectedDG.is_sensitive && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">Sensible</span>}</div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedDG.asset_name}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-green-600">{selectedDG.quality_score}%</div><div className="text-xs text-foreground-500">Qualité</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedDG.completeness_pct}%</div><div className="text-xs text-foreground-500">Complétude</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedDG.accuracy_pct}%</div><div className="text-xs text-foreground-500">Exactitude</div></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Data Owner</span><p className="text-sm font-semibold text-foreground-950">{selectedDG.data_owner}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Data Steward</span><p className="text-sm font-semibold text-foreground-950">{selectedDG.data_steward}</p></div>
                </div>
                {selectedDG.regulatory_framework && selectedDG.regulatory_framework.length > 0 && (
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70"><span className="text-xs text-foreground-500">Référentiels Réglementaires</span><div className="flex flex-wrap gap-1 mt-1">{(selectedDG.regulatory_framework as string[]).map((r, i) => (<span key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900 font-medium">{r}</span>))}</div></div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-robot-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">AI Governance Generator</h3><p className="text-xs text-foreground-500">BLOC 7 — ISO/IEC 42001</p></div></div>
              {aiGovernancePolicies.map((aig) => (
                <div key={aig.id} onClick={() => setSelectedAIG(aig)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedAIG.id === aig.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{aig.policy_domain}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${aig.risk_level === 'critique' ? 'bg-red-100 text-red-700' : aig.risk_level === 'eleve' ? 'bg-orange-100 text-orange-700' : aig.risk_level === 'modere' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{aig.risk_level}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{aig.policy_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{aig.iso_42001_reference}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedAIG.policy_domain}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedAIG.risk_level === 'critique' ? 'bg-red-100 text-red-700' : selectedAIG.risk_level === 'eleve' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{selectedAIG.risk_level}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedAIG.status)}`}>{selectedAIG.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedAIG.policy_name}</h2>
                <p className="text-xs text-foreground-500 mb-4">Référence : {selectedAIG.iso_42001_reference}</p>
                <p className="text-sm text-foreground-600 mb-6">{selectedAIG.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Responsable</span><p className="text-sm font-semibold text-foreground-950">{selectedAIG.responsible_role}</p></div>
                  <div className="p-3 bg-background-100 rounded-lg"><span className="text-xs text-foreground-500">Fréquence Audit</span><p className="text-sm font-semibold text-foreground-950">{selectedAIG.audit_frequency}</p></div>
                </div>
                {selectedAIG.mitigation_controls && selectedAIG.mitigation_controls.length > 0 && (
                  <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Contrôles d'Atténuation</h4>
                    {selectedAIG.mitigation_controls.map((c: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-foreground-600"><i className="ri-shield-check-line text-green-500"></i>{c}</div>))}
                  </div>
                )}
                {selectedAIG.incident_response_procedure && (
                  <div className="p-3 bg-red-50/50 rounded-lg border border-red-200/60"><span className="text-xs text-red-700 font-semibold">Procédure d'Incident</span><p className="text-sm text-foreground-600 mt-1">{selectedAIG.incident_response_procedure}</p></div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-settings-3-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">Automation Blueprint Generator</h3><p className="text-xs text-foreground-500">BLOC 8 — Registre Automatisations</p></div></div>
              {automationBlueprints.map((ab) => (
                <div key={ab.id} onClick={() => setSelectedAuto(ab)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedAuto.id === ab.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{ab.trigger_type}</span>{ab.is_critical && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Critique</span>}</div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{ab.automation_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1">Code : {ab.automation_code}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedAuto.trigger_type}</span>{selectedAuto.is_critical && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Critique</span>}<span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedAuto.status)}`}>{selectedAuto.status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedAuto.automation_name}</h2>
                <p className="text-xs text-foreground-500 mb-4">Code : {selectedAuto.automation_code} | Déclencheur : {selectedAuto.trigger_detail}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedAuto.estimated_duration_seconds}s</div><div className="text-xs text-foreground-500">Durée</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedAuto.max_retries}</div><div className="text-xs text-foreground-500">Max Retries</div></div>
                  <div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-green-600">{selectedAuto.sla_target}%</div><div className="text-xs text-foreground-500">SLA</div></div>
                </div>
                {selectedAuto.workflow_steps && selectedAuto.workflow_steps.length > 0 && (
                  <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Workflow</h4>
                    {selectedAuto.workflow_steps.map((step: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-background-100 rounded-lg mb-2">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div>
                        <p className="text-sm text-foreground-700">{step}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Architecture & Gouvernance</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Architecture', target: 95, current: 78 },
              { label: 'Knowledge', target: 95, current: 65 },
              { label: 'Data Gov', target: 90, current: 72 },
              { label: 'AI Gov', target: 95, current: 60 },
              { label: 'Automation', target: 90, current: 82 },
            ].map((m) => (
              <div key={m.label} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">{m.label}</span><span className="text-xs font-bold text-foreground-950">{m.target}%</span></div>
                <div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: `${m.current}%` }}></div></div>
                <span className="text-xs text-foreground-400 mt-1 block">{m.current}% actuel</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}