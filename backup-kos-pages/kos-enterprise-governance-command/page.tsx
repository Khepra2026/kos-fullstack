import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { enterpriseArchitectureSystems, digitalTwinSimulations, aiGovernanceAgents, enterpriseSecurityDomains, advisoryBoardMembers, scientificCommitteeMembers, specializedCommittees, governanceKPIs } from '@/mocks/enterpriseGovernance';

type Tab = 'architecture' | 'digitaltwin' | 'aigovernance' | 'security' | 'advisory' | 'scientific' | 'committees';

export default function enterpriseGovernanceCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>('architecture');
  const [selectedEA, setSelectedEA] = useState(enterpriseArchitectureSystems[0]);
  const [selectedDT, setSelectedDT] = useState(digitalTwinSimulations[0]);
  const [selectedAG, setSelectedAG] = useState(aiGovernanceAgents[0]);
  const [selectedES, setSelectedES] = useState(enterpriseSecurityDomains[0]);

  const getScoreColor = (score: number) => score >= 9 ? 'text-green-600' : score >= 7 ? 'text-yellow-600' : 'text-red-600';
  const getRiskColor = (level: string) => ({ 'Faible': 'text-green-600', 'Modéré': 'text-yellow-600', 'Élevé': 'text-red-600' } as Record<string, string>)[level] || 'text-gray-600';
  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = { integrated: 'bg-green-100 text-green-700', in_progress: 'bg-secondary-100 text-secondary-900', active: 'bg-green-100 text-green-700', planned: 'bg-gray-100 text-gray-700', 'Conforme': 'bg-green-100 text-green-700', 'Conforme avec observations mineures': 'bg-yellow-100 text-yellow-700', 'Surveillance renforcée requise': 'bg-red-100 text-red-700' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'architecture', label: 'Enterprise Architecture', icon: 'ri-building-4-line', count: enterpriseArchitectureSystems.length },
    { id: 'digitaltwin', label: 'Digital Twin', icon: 'ri-shapes-line', count: digitalTwinSimulations.length },
    { id: 'aigovernance', label: 'AI Governance Council', icon: 'ri-shield-star-line', count: aiGovernanceAgents.length },
    { id: 'security', label: 'Enterprise Security', icon: 'ri-lock-password-line', count: enterpriseSecurityDomains.length },
    { id: 'advisory', label: 'Advisory Board', icon: 'ri-vip-crown-line', count: advisoryBoardMembers.length },
    { id: 'scientific', label: 'Comité Scientifique', icon: 'ri-microscope-line', count: scientificCommitteeMembers.length },
    { id: 'committees', label: 'Comités Spécialisés', icon: 'ri-organization-chart', count: specializedCommittees.length },
  ];

  return (
    <hubLayout hubId={15}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4"><i className="ri-government-line"></i>KOS Phase 3 — Hyper-Automation</div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Enterprise Governance Command</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">Architecture système, jumeau numérique, gouvernance IA, sécurité globale — le socle de confiance et de cohérence de KOS.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-foreground-950">4</div><div className="text-xs text-foreground-500">BLOCS actifs</div></div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70"><div className="text-2xl font-bold text-accent-500">95%</div><div className="text-xs text-foreground-500">Gouvernance cible</div></div>
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
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-building-4-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Enterprise Architecture Board™</h3><p className="text-xs text-foreground-500">BLOC 44 — Cohérence Systèmes</p></div></div>
              {enterpriseArchitectureSystems.map((ea) => (
                <div key={ea.id} onClick={() => setSelectedEA(ea)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedEA.id === ea.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{ea.architecture_layer}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(ea.integration_status)}`}>{ea.integration_status}</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{ea.system_name}</h4>
                  <div className="flex items-center gap-3 mt-2"><span className="text-xs text-foreground-500">Sécurité {ea.security_compliance_score}/10</span><span className="text-xs text-orange-500">Dette tech {ea.technical_debt_score}/10</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedEA.architecture_layer}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedEA.integration_status)}`}>{selectedEA.integration_status}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedEA.system_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4"><div className="p-3 bg-background-100 rounded-lg text-center"><div className={`text-lg font-bold ${getScoreColor(selectedEA.security_compliance_score)}`}>{selectedEA.security_compliance_score}</div><div className="text-xs text-foreground-500">Sécurité</div></div><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedEA.technical_debt_score}</div><div className="text-xs text-foreground-500">Dette Technique</div></div><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedEA.scalability_assessment?.split(' ')[0]}</div><div className="text-xs text-foreground-500">Scalabilité</div></div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Dépendances</h4><div className="flex flex-wrap gap-2">{(selectedEA.dependencies || []).map((d: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-background-100 text-foreground-600">{d}</span>))}</div></div>
                <div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Recommandations</h4>{(selectedEA.recommendations || []).map((r: string, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-accent-50/50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{r}</p></div>))}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'digitaltwin' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700"><i className="ri-shapes-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Digital Twin™</h3><p className="text-xs text-foreground-500">BLOC 45 — Jumeau Numérique</p></div></div>
              {digitalTwinSimulations.map((dt) => (
                <div key={dt.id} onClick={() => setSelectedDT(dt)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedDT.id === dt.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{dt.domain}</span><span className="text-sm font-bold text-primary-600">{dt.prediction_accuracy}%</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{dt.twin_name}</h4>
                  <p className="text-xs text-foreground-500 mt-1">{dt.decision_impact ? Object.values(dt.decision_impact)[0] : ''}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedDT.domain}</span><span className="text-sm font-bold text-primary-600 ml-auto">Précision {selectedDT.prediction_accuracy}%</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedDT.twin_name}</h2>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Entités Représentées</h4><div className="flex flex-wrap gap-2">{(selectedDT.represented_entities || []).map((e: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">{e}</span>))}</div></div>
                <div className="grid grid-cols-2 gap-4 mb-4"><div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Métriques Clés</h4>{Object.entries(selectedDT.key_metrics || {}).map(([k, v]) => (<div key={k} className="flex justify-between p-2 text-sm"><span className="text-foreground-500">{k.replace(/_/g, ' ')}</span><span className="text-foreground-950 font-medium">{String(v)}</span></div>))}</div><div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Impact Décision</h4>{Object.entries(selectedDT.decision_impact || {}).map(([k, v]) => (<div key={k} className="flex justify-between p-2 text-sm"><span className="text-foreground-500">{k.replace(/_/g, ' ')}</span><span className="text-foreground-950 font-medium">{String(v)}</span></div>))}</div></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aigovernance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700"><i className="ri-shield-star-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS AI Governance Council™</h3><p className="text-xs text-foreground-500">BLOC 46 — Gouvernance Agents IA</p></div></div>
              {aiGovernanceAgents.map((ag) => (
                <div key={ag.id} onClick={() => setSelectedAG(ag)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedAG.id === ag.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(ag.compliance_status)}`}>{ag.compliance_status.split(' ')[0]}</span><span className="text-sm font-bold text-secondary-600">{ag.quality_score}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{ag.agent_name}</h4>
                  <div className="flex items-center gap-3 mt-2"><span className="text-xs text-foreground-500">ISO 42001 : {ag.iso_42001_alignment}/10</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedAG.compliance_status)}`}>{selectedAG.compliance_status}</span><span className="text-sm font-bold text-secondary-600 ml-auto">{selectedAG.quality_score}/10</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedAG.agent_name}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">{[{ label: 'Qualité', val: selectedAG.quality_score }, { label: 'Transparence', val: selectedAG.transparency_score }, { label: 'ISO 42001', val: selectedAG.iso_42001_alignment }, { label: 'Sécurité', val: selectedAG.security_audit_result.includes('Aucune') ? 9.5 : selectedAG.security_audit_result.includes('Correct') ? 8 : 7 }].map((m) => (<div key={m.label} className="p-3 bg-background-100 rounded-lg text-center"><div className={`text-lg font-bold ${getScoreColor(m.val)}`}>{m.val}</div><div className="text-xs text-foreground-500">{m.label}</div></div>))}</div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Audit Sécurité</h4><p className="text-sm text-foreground-600">{selectedAG.security_audit_result}</p></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Framework de Responsabilité</h4><p className="text-sm text-foreground-600">{selectedAG.accountability_framework}</p></div>
                {selectedAG.required_actions.length > 0 && (<div><h4 className="text-sm font-semibold text-red-700 mb-2">Actions Requises</h4>{selectedAG.required_actions.map((a: string, i: number) => (<div key={i} className="flex items-center gap-2 p-2 text-sm text-red-700 bg-red-50 rounded-lg mb-1"><i className="ri-alert-line text-red-500"></i>{a}</div>))}</div>)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className="ri-lock-password-line text-lg"></i></div><div><h3 className="text-sm font-bold text-foreground-950">KOS Enterprise Security Engine™</h3><p className="text-xs text-foreground-500">BLOC 47 — Sécurité Globale</p></div></div>
              {enterpriseSecurityDomains.map((es) => (
                <div key={es.id} onClick={() => setSelectedES(es)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedES.id === es.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                  <div className="flex items-center justify-between mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{es.security_domain}</span><span className={`text-sm font-bold ${getScoreColor(es.security_score)}`}>{es.security_score}/10</span></div>
                  <h4 className="text-sm font-semibold text-foreground-950">{es.control_type}</h4>
                  <div className="flex items-center gap-3 mt-2"><span className={`text-xs font-medium ${getRiskColor(es.risk_level)}`}>{es.risk_level}</span><span className="text-xs text-foreground-500">{es.vulnerability_count} vulnérabilités</span></div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedES.security_domain}</span><span className={`text-xs font-medium ml-auto ${getRiskColor(selectedES.risk_level)}`}>Risque {selectedES.risk_level}</span></div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedES.control_type}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4"><div className="p-3 bg-background-100 rounded-lg text-center"><div className={`text-lg font-bold ${getScoreColor(selectedES.security_score)}`}>{selectedES.security_score}/10</div><div className="text-xs text-foreground-500">Score Sécurité</div></div><div className="p-3 bg-background-100 rounded-lg text-center"><div className="text-lg font-bold text-foreground-950">{selectedES.vulnerability_count}</div><div className="text-xs text-foreground-500">Vulnérabilités</div></div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-foreground-950 mb-2">Frameworks de Conformité</h4><div className="flex flex-wrap gap-2">{(selectedES.compliance_frameworks || []).map((f: string, i: number) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-accent-100 text-accent-700 font-medium">{f}</span>))}</div></div>
                {selectedES.remediation_plan.length > 0 && (<div><h4 className="text-sm font-semibold text-foreground-950 mb-2">Plan de Remédiation</h4>{selectedES.remediation_plan.map((r: string, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg mb-2"><div className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-500 text-background-50 flex-shrink-0"><span className="text-xs font-bold">{i + 1}</span></div><p className="text-sm text-foreground-700">{r}</p></div>))}</div>)}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: ADVISORY BOARD ============ */}
        {activeTab === 'advisory' && (
          <div className="space-y-6">
            {/* Advisory Board Hero */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <i className="ri-vip-crown-line text-amber-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">KOS Advisory Board™ — Conseil Stratégique</h3>
                  <p className="text-xs text-gray-400">{advisoryBoardMembers.length} membres · Régulateurs, Académiques, Institutionnels, Experts</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">{governanceKPIs.board_independence_pct}%</div>
                  <div className="text-[10px] text-gray-400">Indépendance</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{governanceKPIs.board_meetings_2026}</div>
                  <div className="text-[10px] text-gray-400">Réunions 2026</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-accent-400">{governanceKPIs.attendance_rate_pct}%</div>
                  <div className="text-[10px] text-gray-400">Taux Présence</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">{governanceKPIs.governance_maturity_score}/100</div>
                  <div className="text-[10px] text-gray-400">Maturité Gouvernance</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Dernière évaluation externe : {new Date(governanceKPIs.last_external_evaluation).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>Prochaine : {new Date(governanceKPIs.next_external_evaluation).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Board Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {advisoryBoardMembers.map((member) => {
                const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
                  Régulateur: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
                  Académique: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
                  Institutionnel: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
                  Exécutif: { bg: 'bg-accent-50', text: 'text-accent-700', border: 'border-accent-200' },
                  'Expert Financier': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
                  'Expert Gouvernance': { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-200' },
                };
                const cat = categoryColors[member.category] || { bg: 'bg-background-100', text: 'text-foreground-700', border: 'border-background-200' };
                return (
                  <div key={member.id} className="rounded-xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-foreground-950 text-background-50 text-lg font-bold">
                        {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${cat.bg} ${cat.text} ${cat.border}`}>{member.category}</span>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1.5">{member.name}</h4>
                        <p className="text-xs text-foreground-500">{member.title}</p>
                        <p className="text-[10px] text-foreground-400 mt-1">{member.country} · {member.tenure}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-background-200/50">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {member.expertise.map((exp, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{exp}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-foreground-400">
                        <span>Présence {member.attendance_pct}%</span>
                        <span>{member.contributions_2026} contributions</span>
                        <span className="font-bold text-foreground-600">{member.committees.join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Board Composition Chart */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-pie-chart-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Composition du Conseil</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Régulateurs', count: advisoryBoardMembers.filter(m => m.category === 'Régulateur').length, color: 'bg-amber-500' },
                  { label: 'Académiques', count: advisoryBoardMembers.filter(m => m.category === 'Académique').length, color: 'bg-emerald-500' },
                  { label: 'Institutionnels', count: advisoryBoardMembers.filter(m => m.category === 'Institutionnel').length, color: 'bg-teal-500' },
                  { label: 'Experts Financiers', count: advisoryBoardMembers.filter(m => m.category === 'Expert Financier').length, color: 'bg-rose-500' },
                  { label: 'Experts Gouvernance', count: advisoryBoardMembers.filter(m => m.category === 'Expert Gouvernance').length, color: 'bg-primary-500' },
                ].map((seg) => (
                  <div key={seg.label} className="text-center p-3 bg-background-100 rounded-lg">
                    <div className={`w-10 h-2 mx-auto mb-2 rounded-full ${seg.color}`}></div>
                    <span className="block text-lg font-bold text-foreground-950">{seg.count}</span>
                    <span className="text-[10px] text-foreground-500">{seg.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications ISO */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-award-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Certifications & Accréditations — Gouvernance</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-700 mb-2">Certifications Actives</h4>
                  <div className="flex flex-wrap gap-2">
                    {governanceKPIs.iso_certifications.map((cert, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold">{cert}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="text-xs font-bold text-amber-700 mb-2">En Cours d'Obtention</h4>
                  <div className="flex flex-wrap gap-2">
                    {governanceKPIs.iso_in_progress.map((cert, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-bold">{cert}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <h4 className="text-xs font-bold text-teal-700 mb-2">Conformité Chartes</h4>
                  <span className="text-2xl font-bold text-teal-600 block">{governanceKPIs.charter_compliance_pct}%</span>
                  <span className="text-[10px] text-teal-500">Conformité statutaire</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: COMITÉ SCIENTIFIQUE ============ */}
        {activeTab === 'scientific' && (
          <div className="space-y-6">
            {/* Scientific Committee Hero */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <i className="ri-microscope-line text-emerald-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">KOS Scientific Committee™ — Validation Académique</h3>
                  <p className="text-xs text-gray-400">{scientificCommitteeMembers.length} membres · {scientificCommitteeMembers.reduce((s, m) => s + m.publications, 0)} publications cumulées · 4 pôles d'expertise</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{scientificCommitteeMembers.length}</div>
                  <div className="text-[10px] text-gray-400">Chercheurs</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-accent-400">{scientificCommitteeMembers.reduce((s, m) => s + m.publications, 0)}</div>
                  <div className="text-[10px] text-gray-400">Publications</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">6</div>
                  <div className="text-[10px] text-gray-400">Pays Représentés</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-teal-400">4</div>
                  <div className="text-[10px] text-gray-400">Pôles d'Expertise</div>
                </div>
              </div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scientificCommitteeMembers.map((member) => (
                <div key={member.id} className="rounded-xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-700 text-base font-bold">
                      {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground-950">{member.name}</h4>
                      <p className="text-xs text-foreground-500">{member.title}</p>
                      <p className="text-[10px] text-foreground-400 mb-1">{member.institution}</p>
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">{member.role}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-background-200/50">
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400 mb-2">
                      <span className="font-bold text-foreground-600">{member.publications} publications</span>
                      <span>·</span>
                      <span>{member.country}</span>
                      <span>·</span>
                      <span>{member.tenure}</span>
                    </div>
                    <p className="text-[10px] font-bold text-foreground-500 mb-1.5">Expertise :</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {member.expertise.map((exp, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{exp}</span>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-foreground-500 mb-1">Validation :</p>
                    <div className="flex flex-wrap gap-1">
                      {member.validation_areas.map((area, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{area}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Validation Pipeline */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-check-double-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Pipeline de Validation — Production Intellectuelle 2026</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Soumises', val: 24, icon: 'ri-file-upload-line', color: 'bg-amber-100 text-amber-700' },
                  { label: 'En Revue', val: 8, icon: 'ri-file-search-line', color: 'bg-teal-100 text-teal-700' },
                  { label: 'Validées', val: 18, icon: 'ri-checkbox-circle-line', color: 'bg-emerald-100 text-emerald-700' },
                  { label: 'Rejetées/Révisées', val: 2, icon: 'ri-arrow-go-back-line', color: 'bg-rose-100 text-rose-700' },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-lg bg-background-100">
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center ${s.color}`}>
                      <i className={`${s.icon} text-lg`}></i>
                    </div>
                    <span className="block text-2xl font-bold text-foreground-950">{s.val}</span>
                    <span className="text-[10px] text-foreground-500">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1 text-xs text-foreground-500">
                  <span>Taux de validation</span>
                  <span className="font-bold text-emerald-600">{(18 / 24 * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(18 / 24) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: COMITÉS SPÉCIALISÉS ============ */}
        {activeTab === 'committees' && (
          <div className="space-y-6">
            {/* Committees Overview */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                  <i className="ri-organization-chart text-teal-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">KOS Comités Spécialisés™ — Gouvernance Opérationnelle</h3>
                  <p className="text-xs text-gray-400">{specializedCommittees.length} comités · {governanceKPIs.committee_meetings_2026} réunions en 2026 · Présence {governanceKPIs.attendance_rate_pct}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-teal-400">{specializedCommittees.length}</div>
                  <div className="text-[10px] text-gray-400">Comités</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">{governanceKPIs.committee_meetings_2026}</div>
                  <div className="text-[10px] text-gray-400">Réunions 2026</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-accent-400">{specializedCommittees.reduce((s, c) => s + c.members, 0)}</div>
                  <div className="text-[10px] text-gray-400">Membres</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">{governanceKPIs.charter_compliance_pct}%</div>
                  <div className="text-[10px] text-gray-400">Chartes Conformes</div>
                </div>
              </div>
            </div>

            {/* Committee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specializedCommittees.map((com) => (
                <div key={com.id} className="rounded-xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">{com.name}</h4>
                      <p className="text-xs text-foreground-500">Président : <strong>{com.chair}</strong></p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">{com.charter_status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <span className="block text-lg font-bold text-foreground-950">{com.members}</span>
                      <span className="text-[10px] text-foreground-500">Membres</span>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <span className="block text-lg font-bold text-foreground-950">{com.meetings_2026}</span>
                      <span className="text-[10px] text-foreground-500">Réunions 2026</span>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-foreground-500 mb-1.5">Responsabilités :</p>
                  <ul className="space-y-1 mb-3">
                    {com.responsibilities.map((resp, i) => (
                      <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                        <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0 text-xs"></i>
                        {resp}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between text-[10px] text-foreground-400 pt-3 border-t border-background-200/50">
                    <span>Dernière : {new Date(com.last_meeting).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    <span className="font-bold text-foreground-600">Prochaine : {new Date(com.next_meeting).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Meeting Calendar */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <i className="ri-calendar-schedule-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Calendrier des Comités — 2026</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Comité</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Président</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Réunions 2026</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Dernière</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Prochaine</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Charte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specializedCommittees.map((com) => (
                      <tr key={com.id} className="border-t border-background-100">
                        <td className="px-4 py-3 text-xs font-bold text-foreground-950">{com.name}</td>
                        <td className="px-4 py-3 text-xs text-foreground-600">{com.chair}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-xs font-bold text-teal-600">{com.meetings_2026}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-500 whitespace-nowrap">{new Date(com.last_meeting).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</td>
                        <td className="px-4 py-3 text-xs text-foreground-500 whitespace-nowrap">{new Date(com.next_meeting).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">{com.charter_status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Maturité Cible — Gouvernance d'Entreprise</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Architecture</span><span className="text-xs font-bold text-foreground-950">100%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '100%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Sécurité</span><span className="text-xs font-bold text-foreground-950">100%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{ width: '100%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Gouvernance IA</span><span className="text-xs font-bold text-foreground-950">100%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-secondary-500 rounded-full" style={{ width: '100%' }}></div></div></div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70"><div className="flex items-center justify-between mb-2"><span className="text-xs text-foreground-500">Conformité</span><span className="text-xs font-bold text-foreground-950">100%</span></div><div className="h-2 bg-background-200/70 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{ width: '100%' }}></div></div></div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





