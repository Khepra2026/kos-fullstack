import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import {
  transformationPrograms,
  esgAssessments,
  innovationLabProjects,
  enterpriseArchitectureReviews,
  publicSectorProjects,
  fintechAdvisory,
  smeTransformations,
} from '@/mocks/transformationESG';

type Tab = 'programs' | 'esg' | 'innovation' | 'architecture' | 'public' | 'fintech' | 'sme';

export default function transformationESGCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>('programs');
  const [selectedProgram, setSelectedProgram] = useState(transformationPrograms[0]);
  const [selectedESG, setSelectedESG] = useState(esgAssessments[0]);
  const [selectedInnovation, setSelectedInnovation] = useState(innovationLabProjects[0]);
  const [selectedArchitecture, setSelectedArchitecture] = useState(enterpriseArchitectureReviews[0]);
  const [selectedPublic, setSelectedPublic] = useState(publicSectorProjects[0]);
  const [selectedFintech, setSelectedFintech] = useState(fintechAdvisory[0]);
  const [selectedSME, setSelectedSME] = useState(smeTransformations[0]);

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      'En cours': 'bg-secondary-100 text-secondary-900',
      'Terminé': 'bg-green-100 text-green-700',
      'Planifié': 'bg-background-100 text-foreground-600',
      'En cours — Phase 1': 'bg-secondary-100 text-secondary-900',
      'En cours — Phase 2': 'bg-secondary-100 text-secondary-900',
      'En cours — Business plan': 'bg-secondary-100 text-secondary-900',
      'En cours — Audit financier': 'bg-secondary-100 text-secondary-900',
      'En cours — Régularisation': 'bg-orange-100 text-orange-700',
      'En cours — Diagnostic GAFI': 'bg-orange-100 text-orange-700',
      'En cours — Structuration juridique': 'bg-secondary-100 text-secondary-900',
      'En cours — Phase diagnostic': 'bg-secondary-100 text-secondary-900',
      'En cours — Recrutement DAF': 'bg-secondary-100 text-secondary-900',
      'En cours — Déploiement ERP': 'bg-secondary-100 text-secondary-900',
      'En cours — Structuration gouvernance': 'bg-secondary-100 text-secondary-900',
      'En cours — Diagnostic complet': 'bg-secondary-100 text-secondary-900',
      'Étude comparative': 'bg-yellow-100 text-yellow-700',
      'Nouveau — Cadrage': 'bg-secondary-100 text-secondary-700',
      'Planifié — Recherche financement': 'bg-background-100 text-foreground-500',
      'Publié': 'bg-green-100 text-green-700',
      'Proof-of-Concept': 'bg-yellow-100 text-yellow-700',
      'POC fonctionnel': 'bg-green-100 text-green-700',
      'MVP fonctionnel': 'bg-green-100 text-green-700',
      'Prototype early-stage': 'bg-yellow-100 text-yellow-700',
      'MVP phase 2': 'bg-green-100 text-green-700',
    };
    return map[status] || 'bg-background-100 text-foreground-600';
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'text-green-600';
    if (score >= 6.5) return 'text-yellow-600';
    if (score >= 5.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 8.0) return 'bg-green-500';
    if (score >= 6.5) return 'bg-yellow-500';
    if (score >= 5.0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const renderScoreGauge = (score: number, maxScore: number = 10) => {
    const pct = (score / maxScore) * 100;
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-background-200/70 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${getScoreBarColor(score)}`} style={{ width: `${pct}%` }}></div>
        </div>
        <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
      </div>
    );
  };

  const renderProgressBar = (pct: number, color: string = 'bg-accent-500') => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }}></div>
      </div>
      <span className="text-sm font-bold text-foreground-950">{pct}%</span>
    </div>
  );

  const renderESGGauge = (score: number, label: string, color: string) => (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={`${(score / 100) * 163.36} 163.36`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground-950">{score}</span>
        </div>
      </div>
      <span className="text-xs text-foreground-500">{label}</span>
    </div>
  );

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'programs', label: 'Programmes', icon: 'ri-rocket-line', count: transformationPrograms.filter(p => p.status === 'En cours').length },
    { id: 'esg', label: 'ESG', icon: 'ri-leaf-line', count: esgAssessments.length },
    { id: 'innovation', label: 'Innovation Lab', icon: 'ri-flask-line', count: innovationLabProjects.filter(p => p.readiness_level >= 6).length },
    { id: 'architecture', label: 'Architecture', icon: 'ri-stack-line', count: enterpriseArchitectureReviews.length },
    { id: 'public', label: 'Secteur Public', icon: 'ri-government-line', count: publicSectorProjects.filter(p => p.status.startsWith('En cours')).length },
    { id: 'fintech', label: 'FinTech Advisory', icon: 'ri-smartphone-line', count: fintechAdvisory.filter(f => f.status.startsWith('En cours')).length },
    { id: 'sme', label: 'PME', icon: 'ri-store-2-line', count: smeTransformations.filter(s => s.engagement_status.startsWith('En cours')).length },
  ];

  const avgProgramProgress = Math.round(transformationPrograms.reduce((s, p) => s + p.progress_pct, 0) / transformationPrograms.length);
  const avgESGScore = Math.round(esgAssessments.reduce((s, e) => s + e.overall_esg_score, 0) / esgAssessments.length);
  const avgInnovationTRL = (innovationLabProjects.reduce((s, p) => s + p.readiness_level, 0) / innovationLabProjects.length).toFixed(1);
  const activeSME = smeTransformations.filter(s => s.engagement_status.startsWith('En cours')).length;

  return (
    <hubLayout hubId={4}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-building-2-line"></i>KOS Phase 4 — Transformation & ESG Command
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Transformation & ESG Command</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Programmes de transformation, Évaluations ESG, Innovation Lab, Architecture d'Entreprise,
                Secteur Public, FinTech Advisory et Transformation PME — le centre de pilotage de la transformation durable.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{transformationPrograms.length}</div>
                <div className="text-xs text-foreground-500">Programmes</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{avgProgramProgress}%</div>
                <div className="text-xs text-foreground-500">Progression</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{avgESGScore}/100</div>
                <div className="text-xs text-foreground-500">Score ESG Moy.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        {/* ===== ONGLET 1 : PROGRAMMES DE TRANSFORMATION ===== */}
        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-rocket-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Transformation Office™</h3>
                  <p className="text-xs text-foreground-500">Programmes de transformation</p>
                </div>
              </div>
              {transformationPrograms.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProgram(p)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedProgram.id === p.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(p.status)}`}>{p.status}</span>
                    <span className="text-sm font-bold text-foreground-950">{p.progress_pct}%</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{p.program_name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">{p.phase}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(selectedProgram.status)}`}>{selectedProgram.status}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedProgram.phase}</span>
                  <span className="text-xs text-foreground-400 ml-auto">Budget : {(selectedProgram.budget_planned / 1000000).toFixed(0)}M / {(selectedProgram.budget_actual / 1000000).toFixed(0)}M FCFA</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedProgram.program_name}</h2>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Progression</span>
                  </div>
                  {renderProgressBar(selectedProgram.progress_pct)}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">Change Mgmt</div>
                    {renderScoreGauge(selectedProgram.change_management_score, 100)}
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">Budget Consommé</div>
                    <span className="text-sm font-bold text-foreground-950">{Math.round((selectedProgram.budget_actual / selectedProgram.budget_planned) * 100)}%</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Jalons</h4>
                  <div className="space-y-2">
                    {selectedProgram.milestones.map((m: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${m.includes('Terminé') ? 'bg-green-500' : m.includes('En cours') ? 'bg-secondary-500' : 'bg-background-300'}`}></div>
                        <span className="text-foreground-600">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedProgram.risks.length > 0 && (
                  <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-100 mb-4">
                    <h4 className="text-sm font-semibold text-orange-700 mb-2">Risques Identifiés</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProgram.risks.map((r: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">{r}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-background-200/70">
                  <span className="text-xs text-foreground-500">Début : {new Date(selectedProgram.timeline_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="text-xs text-foreground-500">Fin prévue : {new Date(selectedProgram.timeline_end).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : ÉVALUATIONS ESG ===== */}
        {activeTab === 'esg' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <i className="ri-leaf-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS ESG Assessment Center™</h3>
                  <p className="text-xs text-foreground-500">Évaluations ESG entreprises</p>
                </div>
              </div>
              {esgAssessments.map((e) => (
                <div
                  key={e.id}
                  onClick={() => setSelectedESG(e)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedESG.id === e.id ? 'border-green-300 bg-green-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{e.sector}</span>
                    <span className={`text-sm font-bold ${getScoreColor(e.overall_esg_score / 10)}`}>{e.overall_esg_score}/100</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{e.company_name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">{e.country}</span>
                    <span className="text-xs text-foreground-400">{e.framework}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedESG.sector}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">{selectedESG.country}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium ml-auto">{selectedESG.framework}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedESG.company_name}</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {renderESGGauge(selectedESG.environmental_score, 'Environnement', '#22c55e')}
                  {renderESGGauge(selectedESG.social_score, 'Social', '#3b82f6')}
                  {renderESGGauge(selectedESG.governance_score, 'Gouvernance', '#f59e0b')}
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                        <circle
                          cx="32" cy="32" r="26" fill="none" stroke={selectedESG.overall_esg_score >= 65 ? '#22c55e' : selectedESG.overall_esg_score >= 50 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="6"
                          strokeDasharray={`${(selectedESG.overall_esg_score / 100) * 163.36} 163.36`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-foreground-950">{selectedESG.overall_esg_score}</span>
                      </div>
                    </div>
                    <span className="text-xs text-foreground-500">Global</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Synthèse</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedESG.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-red-50/50 rounded-lg border border-red-100">
                    <h4 className="text-xs font-semibold text-red-700 mb-2">Gaps Identifiés ({selectedESG.gaps.length})</h4>
                    <ul className="space-y-1">
                      {selectedESG.gaps.map((g: string, i: number) => (
                        <li key={i} className="text-xs text-foreground-600">{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                    <h4 className="text-xs font-semibold text-green-700 mb-2">Recommandations ({selectedESG.recommendations.length})</h4>
                    <ul className="space-y-1">
                      {selectedESG.recommendations.map((r: string, i: number) => (
                        <li key={i} className="text-xs text-foreground-600">{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Feuille de Route</h4>
                  <div className="space-y-2">
                    {selectedESG.roadmap.map((r: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-secondary-500' : 'bg-background-300'}`}></div>
                        <span className="text-foreground-600">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedESG.sdg_alignment.map((sdg: string) => (
                    <span key={sdg} className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-600 font-medium border border-primary-100">{sdg}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : INNOVATION LAB ===== */}
        {activeTab === 'innovation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-900">
                  <i className="ri-flask-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Innovation Lab™</h3>
                  <p className="text-xs text-foreground-500">R&D — Prototypes & POC</p>
                </div>
              </div>
              {innovationLabProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedInnovation(p)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedInnovation.id === p.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{p.category}</span>
                    <span className="text-xs font-bold text-foreground-950">TRL {p.readiness_level}/9</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{p.innovation_name}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-foreground-500">Impact {p.impact_score}/100</span>
                    <span className="text-xs text-foreground-500">Faisabilité {p.feasibility_score}/100</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedInnovation.category}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-900 font-medium">{selectedInnovation.technology}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedInnovation.prototype_status)}`}>{selectedInnovation.prototype_status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedInnovation.innovation_name}</h2>
                <p className="text-sm text-foreground-600 leading-relaxed mb-4">{selectedInnovation.description}</p>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">TRL {selectedInnovation.readiness_level}</div>
                    <div className="text-xs text-foreground-500">Readiness</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">{selectedInnovation.impact_score}</div>
                    <div className="text-xs text-foreground-500">Impact</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-secondary-600">{selectedInnovation.feasibility_score}</div>
                    <div className="text-xs text-foreground-500">Faisabilité</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">{selectedInnovation.implementation_time}</div>
                    <div className="text-xs text-foreground-500">Délai</div>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Potentiel Marché</h4>
                  <p className="text-sm text-foreground-600">{selectedInnovation.market_potential}</p>
                </div>
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100 mb-4">
                  <h4 className="text-sm font-semibold text-accent-900 mb-2">Cas d'Usage</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedInnovation.use_case}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedInnovation.tags.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent-100 text-accent-900 font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : ARCHITECTURE D'ENTREPRISE ===== */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-stack-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Enterprise Architecture Office™</h3>
                  <p className="text-xs text-foreground-500">Revue architecture systèmes</p>
                </div>
              </div>
              {enterpriseArchitectureReviews.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedArchitecture(a)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedArchitecture.id === a.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{a.component_type}</span>
                    {renderScoreGauge(a.architecture_score)}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{a.system_name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.integration_status === 'Intégré' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{a.integration_status}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.security_status === 'Sécurisé' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{a.security_status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedArchitecture.component_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedArchitecture.integration_status === 'Intégré' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{selectedArchitecture.integration_status}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${selectedArchitecture.security_status === 'Sécurisé' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{selectedArchitecture.security_status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedArchitecture.system_name}</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedArchitecture.architecture_score.toFixed(1)}</div>
                    <div className="text-xs text-foreground-500">Score Archi</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className={`text-xs font-bold ${selectedArchitecture.integration_status === 'Intégré' ? 'text-green-600' : 'text-yellow-600'}`}>{selectedArchitecture.integration_status}</div>
                    <div className="text-xs text-foreground-500">Intégration</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className={`text-xs font-bold ${selectedArchitecture.security_status === 'Sécurisé' ? 'text-green-600' : 'text-orange-600'}`}>{selectedArchitecture.security_status}</div>
                    <div className="text-xs text-foreground-500">Sécurité</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className={`text-xs font-bold ${selectedArchitecture.scalability_status === 'Scalable' ? 'text-green-600' : 'text-yellow-600'}`}>{selectedArchitecture.scalability_status}</div>
                    <div className="text-xs text-foreground-500">Scalabilité</div>
                  </div>
                </div>
                <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-100 mb-4">
                  <h4 className="text-sm font-semibold text-orange-700 mb-2">Problèmes Identifiés</h4>
                  <p className="text-sm text-foreground-600">{selectedArchitecture.issues_found}</p>
                </div>
                <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                  <h4 className="text-sm font-semibold text-green-700 mb-2">Recommandations</h4>
                  <p className="text-sm text-foreground-600">{selectedArchitecture.recommendations}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-background-200/70">
                  <span className="text-xs text-foreground-500">Dernière revue</span>
                  <span className="text-xs font-semibold text-foreground-950">
                    {new Date(selectedArchitecture.last_reviewed).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : SECTEUR PUBLIC ===== */}
        {activeTab === 'public' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                  <i className="ri-government-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Public Sector Excellence™</h3>
                  <p className="text-xs text-foreground-500">Modernisation secteur public</p>
                </div>
              </div>
              {publicSectorProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPublic(p)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPublic.id === p.id ? 'border-cyan-300 bg-cyan-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{p.domain}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(p.status)}`}>{p.status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{p.institution_name}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-foreground-500">{p.country}</span>
                    {renderScoreGauge(p.digital_score)}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedPublic.domain}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-medium">{selectedPublic.country}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedPublic.status)}`}>{selectedPublic.status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedPublic.institution_name}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-foreground-500">Score Digital</span>
                      <span className={`text-sm font-bold ${getScoreColor(selectedPublic.digital_score)}`}>{selectedPublic.digital_score.toFixed(1)}/10</span>
                    </div>
                    <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getScoreBarColor(selectedPublic.digital_score)}`} style={{ width: `${selectedPublic.digital_score * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-foreground-500">Score Gouvernance</span>
                      <span className={`text-sm font-bold ${getScoreColor(selectedPublic.governance_score)}`}>{selectedPublic.governance_score.toFixed(1)}/10</span>
                    </div>
                    <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getScoreBarColor(selectedPublic.governance_score)}`} style={{ width: `${selectedPublic.governance_score * 10}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">Maturité Actuelle</div>
                    <div className="text-sm font-semibold text-foreground-950">{selectedPublic.current_maturity}</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">Maturité Cible</div>
                    <div className="text-sm font-semibold text-accent-500">{selectedPublic.target_maturity}</div>
                  </div>
                </div>
                <div className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-100">
                  <h4 className="text-sm font-semibold text-cyan-700 mb-2">Plan de Modernisation</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedPublic.modernization_plan}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : FINTECH ADVISORY ===== */}
        {activeTab === 'fintech' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-900">
                  <i className="ri-smartphone-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS FinTech Advisory Center™</h3>
                  <p className="text-xs text-foreground-500">Conseil FinTech & finance digitale</p>
                </div>
              </div>
              {fintechAdvisory.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setSelectedFintech(f)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedFintech.id === f.id ? 'border-secondary-300 bg-secondary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{f.client_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(f.status)}`}>{f.status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{f.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">{f.service_type}</span>
                    <span className="text-xs text-foreground-400">{f.market_focus}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedFintech.client_type}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900 font-medium">{selectedFintech.service_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedFintech.status)}`}>{selectedFintech.status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedFintech.title}</h2>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Diagnostic</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedFintech.diagnosis}</p>
                </div>
                <div className="p-3 bg-background-100 rounded-lg border border-background-200/70 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Benchmark</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedFintech.benchmark}</p>
                </div>
                <div className="p-4 bg-secondary-50/50 rounded-lg border border-secondary-100 mb-4">
                  <h4 className="text-sm font-semibold text-secondary-900 mb-2">Stratégie de Transformation</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedFintech.transformation_strategy}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-background-200/70">
                  <span className="text-xs text-foreground-500">Focus Marché</span>
                  <span className="text-xs font-semibold text-foreground-950">{selectedFintech.market_focus}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 7 : TRANSFORMATION PME ===== */}
        {activeTab === 'sme' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-store-2-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS SME Transformation Center™</h3>
                  <p className="text-xs text-foreground-500">Transformation PME africaines</p>
                </div>
              </div>
              {smeTransformations.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSME(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedSME.id === s.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{s.sector}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(s.engagement_status)}`}>{s.engagement_status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{s.company_name}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-foreground-500">{s.employees_count} employés</span>
                    <span className="text-xs font-bold text-foreground-950 ml-auto">{s.performance_score.toFixed(1)}/10</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedSME.sector}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">{selectedSME.employees_count} employés</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${getStatusBadge(selectedSME.engagement_status)}`}>{selectedSME.engagement_status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedSME.company_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">Gouvernance</div>
                    <div className="text-lg font-bold text-foreground-950">{selectedSME.governance_score.toFixed(1)}</div>
                    <div className="text-xs text-foreground-500">/10</div>
                    <div className="mt-2 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getScoreBarColor(selectedSME.governance_score)}`} style={{ width: `${selectedSME.governance_score * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">Maturité Digitale</div>
                    <div className="text-lg font-bold text-foreground-950">{selectedSME.digital_maturity_score.toFixed(1)}</div>
                    <div className="text-xs text-foreground-500">/10</div>
                    <div className="mt-2 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getScoreBarColor(selectedSME.digital_maturity_score)}`} style={{ width: `${selectedSME.digital_maturity_score * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">Performance</div>
                    <div className="text-lg font-bold text-foreground-950">{selectedSME.performance_score.toFixed(1)}</div>
                    <div className="text-xs text-foreground-500">/10</div>
                    <div className="mt-2 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getScoreBarColor(selectedSME.performance_score)}`} style={{ width: `${selectedSME.performance_score * 10}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                  <h4 className="text-sm font-semibold text-amber-700 mb-2">Recommandations</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedSME.recommendations}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Transformation & ESG Command</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Progression Programmes</span>
                <span className="text-xs font-bold text-foreground-950">{avgProgramProgress}%</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${avgProgramProgress}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Score ESG Moyen</span>
                <span className="text-xs font-bold text-foreground-950">{avgESGScore}/100</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${avgESGScore}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">TRL Innovation Moyen</span>
                <span className="text-xs font-bold text-foreground-950">{avgInnovationTRL}/9</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${(Number(avgInnovationTRL) / 9) * 100}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">PME en Transformation</span>
                <span className="text-xs font-bold text-foreground-950">{activeSME}/{smeTransformations.length}</span>
              </div>
              <div className="h-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(activeSME / smeTransformations.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



