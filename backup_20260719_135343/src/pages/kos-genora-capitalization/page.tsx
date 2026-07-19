import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSGenoraCapitalization } from '@/hooks/useKOSGenoraCapitalization';
import type { ThinkingSpace, ReasoningMemoryItem, ContinuityDossier, VirtualKnowledgeGraph, AutoSeedingData, CrossCapitalizationData, SelfImprovementData, ThinkTankData, ObservatoryData, ExpertiseEvolutionData, OrganizationalLearningData, GenoraGlobalKPIs } from '@/hooks/useKOSGenoraCapitalization';

type Tab = 'thinking-spaces' | 'reasoning' | 'continuity' | 'knowledge-graph' | 'auto-seeding' | 'self-improvement' | 'think-tank' | 'expertise';

export default function genoraCapitalizationPage() {
  const {
    thinkingSpaces,
    reasoningMemory,
    intellectualContinuity,
    virtualKnowledgeGraph,
    autoSeeding,
    crossCapitalization,
    selfImprovement,
    thinkTank,
    intelligentObservatory,
    expertiseEvolution,
    organizationalLearning,
    globalKPIs,
    loading,
    error,
    dataSource,
    refresh,
  } = useKOSGenoraCapitalization();

  const [activeTab, setActiveTab] = useState<Tab>('thinking-spaces');
  const [selectedSpace, setSelectedSpace] = useState<ThinkingSpace | null>(null);
  const [selectedReasoning, setSelectedReasoning] = useState<ReasoningMemoryItem | null>(null);
  const [selectedDossier, setSelectedDossier] = useState<ContinuityDossier | null>(null);
  const [expandedRelation, setExpandedRelation] = useState<string | null>(null);

  // Initialize first selections
  const [initialized, setInitialized] = useState(false);
  if (!initialized && thinkingSpaces.length > 0) {
    setInitialized(true);
    setTimeout(() => {
      if (!selectedSpace) setSelectedSpace(thinkingSpaces[0]);
      if (!selectedReasoning) setSelectedReasoning(reasoningMemory[0] || null);
      if (!selectedDossier) setSelectedDossier(intellectualContinuity[0] || null);
    }, 0);
  }

  const renderGaugeCircle = (score: number, maxScore: number, label: string, size: number = 56) => {
    const pct = (score / maxScore) * 100;
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const color = score >= 90 ? '#22c55e' : score >= 80 ? '#f59e0b' : '#ef4444';
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
              strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-foreground-950">{score}</span>
          </div>
        </div>
        <span className="text-[10px] text-foreground-500 text-center leading-tight">{label}</span>
      </div>
    );
  };

  const getImpactBadge = (impact: string) => {
    if (impact === 'critique') return 'bg-red-100 text-red-700';
    if (impact === 'haut' || impact === 'élevé') return 'bg-amber-100 text-amber-700';
    return 'bg-secondary-100 text-secondary-700';
  };

  const tabs: { id: Tab; label: string; icon: string; axis: string }[] = [
    { id: 'thinking-spaces', label: 'Thinking Spaces', icon: 'ri-stack-line', axis: 'AXE 1' },
    { id: 'reasoning', label: 'Mémoire de Raisonnement', icon: 'ri-brain-line', axis: 'AXES 2,10' },
    { id: 'continuity', label: 'Continuité & Capitalisation', icon: 'ri-history-line', axis: 'AXES 3,5' },
    { id: 'knowledge-graph', label: 'Knowledge Graph Virtuel', icon: 'ri-git-branch-line', axis: 'AXE 4' },
    { id: 'auto-seeding', label: 'Auto-Seeding & Cross-Cap', icon: 'ri-seedling-line', axis: 'AXES 6,9' },
    { id: 'self-improvement', label: 'Auto-Amélioration', icon: 'ri-refresh-line', axis: 'AXES 8,15' },
    { id: 'think-tank', label: 'Think Tank & Observatoire', icon: 'ri-lightbulb-flash-line', axis: 'AXES 11,12' },
    { id: 'expertise', label: 'Expertise & Apprentissage', icon: 'ri-graduation-cap-line', axis: 'AXES 7,13,14' },
  ];

  if (loading) {
    return (
      <hubLayout hubId={121}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-foreground-500">Activation Genora Capitalization Engine...</p>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && thinkingSpaces.length === 0) {
    return (
      <hubLayout hubId={121}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl"></i>
            </div>
            <p className="text-sm text-foreground-600 mb-4">Impossible d'activer le Genora Capitalization Engine.</p>
            <button onClick={refresh} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-1"></i>Réessayer
            </button>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={121}>
      {/* Hero Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-4">
                <i className="ri-cpu-line"></i>KOS Genora Capitalization™ — Programme Big Four
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Genora Capitalization</h1>
                {dataSource === 'supabase' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    DONNÉES LIVE — SUPABASE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold whitespace-nowrap">
                    STRATEGIC MEMORY — 15 MÉMOIRES ACTIVES
                  </span>
                )}
              </div>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Transformation de KOS en mémoire cognitive persistante. 15 axes de capitalisation — Thinking Spaces virtuels, 
                mémoire de raisonnement, continuité intellectuelle, knowledge graph dynamique, auto-seeding, 
                auto-amélioration continue. Zéro nouvelle table. Zéro nouvelle Edge Function. 100% exploitation composants existants.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {globalKPIs && (
                <>
                  <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-2xl font-bold text-green-600">{globalKPIs.totalConfidenceAvg}%</div>
                    <div className="text-xs text-foreground-500">Score Confiance</div>
                  </div>
                  <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-2xl font-bold text-foreground-950">{globalKPIs.thinkingSpaces}</div>
                    <div className="text-xs text-foreground-500">Thinking Spaces</div>
                  </div>
                  <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-2xl font-bold text-amber-600">{globalKPIs.knowledgeGraphNodes.toLocaleString()}</div>
                    <div className="text-xs text-foreground-500">Nœuds KG</div>
                  </div>
                  <div className="text-center px-4 py-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">0 FCFA</div>
                    <div className="text-xs text-green-600">Coût</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
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
                <span className="text-[10px] opacity-50 ml-1">{tab.axis}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ═══ ONGLET 1: THINKING SPACES (AXE 1) ═══ */}
        {activeTab === 'thinking-spaces' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                  <i className="ri-stack-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 1 — Thinking Spaces Virtuels</h3>
                  <p className="text-xs text-foreground-500">{thinkingSpaces.length} espaces reconstruits</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-cyan-200 bg-cyan-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Reconstruction automatique sans duplication</div>
                <div className="text-sm text-foreground-700">Chaque Mission, Client, Secteur, Réglementation, Offre devient un Thinking Space. Contexte, analyses, décisions, hypothèses, sources — tout reconstruit depuis les tables existantes.</div>
              </div>
              {thinkingSpaces.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSpace(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedSpace?.id === s.id ? 'border-cyan-300 bg-cyan-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-medium">{s.spaceType}</span>
                    <span className="text-xs text-foreground-400">{s.confidenceScore}%</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{s.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">{s.sector}</span>
                    <span className="text-xs text-foreground-400">· {s.jurisdiction}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              {selectedSpace && (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-medium">{selectedSpace.spaceType}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{selectedSpace.sector}</span>
                    <span className="text-xs text-foreground-400 ml-auto">Reconstitué {new Date(selectedSpace.reconstitutionDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedSpace.name}</h2>
                  <div className="flex justify-center mb-4">{renderGaugeCircle(selectedSpace.confidenceScore, 100, 'Fiabilité Reconstitution', 64)}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1"><i className="ri-search-line text-cyan-500"></i>Analyses Passées</h4>
                      <ul className="space-y-1">
                        {selectedSpace.pastAnalyses.map((a, i) => <li key={i} className="text-xs text-foreground-600">· {a}</li>)}
                      </ul>
                    </div>
                    <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1"><i className="ri-scales-line text-amber-500"></i>Décisions</h4>
                      <ul className="space-y-1">
                        {selectedSpace.decisions.map((d, i) => <li key={i} className="text-xs text-foreground-600">· {d}</li>)}
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                      <h4 className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1"><i className="ri-check-line text-green-500"></i>Hypothèses Retenues</h4>
                      <ul className="space-y-1">
                        {selectedSpace.hypothesesRetained.map((h, i) => <li key={i} className="text-xs text-green-600">· {h}</li>)}
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50/50 rounded-lg border border-red-100">
                      <h4 className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1"><i className="ri-close-line text-red-500"></i>Hypothèses Rejetées</h4>
                      <ul className="space-y-1">
                        {selectedSpace.hypothesesRejected.map((h, i) => <li key={i} className="text-xs text-red-600">· {h}</li>)}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="p-3 bg-accent-50/50 rounded-lg border border-accent-100">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-1">Sources</h4>
                      {selectedSpace.sources.map((s, i) => <div key={i} className="text-xs text-foreground-600">· {s}</div>)}
                    </div>
                    <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-1">Arbitrages</h4>
                      {selectedSpace.arbitrages.map((a, i) => <div key={i} className="text-xs text-foreground-600">· {a}</div>)}
                    </div>
                    <div className="p-3 bg-secondary-50/50 rounded-lg border border-secondary-100">
                      <h4 className="text-xs font-semibold text-foreground-950 mb-1">Experts</h4>
                      {selectedSpace.experts.map((e, i) => <div key={i} className="text-xs text-foreground-600">· {e}</div>)}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1"><i className="ri-file-text-line text-foreground-500"></i>Documents Associés</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpace.documents.map((d, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-cyan-50 text-cyan-700 font-medium border border-cyan-100">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ ONGLET 2: REASONING MEMORY (AXES 2,10) ═══ */}
        {activeTab === 'reasoning' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-brain-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 2 — Mémoire de Raisonnement</h3>
                  <p className="text-xs text-foreground-500">{reasoningMemory.length} décisions tracées</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Pourquoi + Décisions + Risques + Experts</div>
                <div className="text-sm text-foreground-700">Capitalisation du raisonnement : pourquoi une décision a été prise, pourquoi une hypothèse a été rejetée, quels risques ont été identifiés, quels experts mobilisés, quel niveau de confiance.</div>
              </div>
              {reasoningMemory.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedReasoning(r)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedReasoning?.id === r.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-400">{r.decisionDate}</span>
                    <span className={`text-sm font-bold ${r.confidenceAtDecision >= 90 ? 'text-green-600' : r.confidenceAtDecision >= 80 ? 'text-amber-600' : 'text-red-600'}`}>{r.confidenceAtDecision}%</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{r.title}</h4>
                  <div className="text-xs text-foreground-500 mt-1">{r.decisionMaker}</div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              {selectedReasoning && (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">{selectedReasoning.decisionDate}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{selectedReasoning.decisionMaker}</span>
                    <span className="text-xs text-foreground-400 ml-auto">Confiance : {selectedReasoning.confidenceAtDecision}%</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedReasoning.title}</h2>
                  <p className="text-sm text-foreground-600 mb-6">{selectedReasoning.context}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedReasoning.options.map((opt, i) => (
                      <div key={i} className="p-4 rounded-lg border border-background-200/70 bg-background-50">
                        <h4 className="text-sm font-bold text-foreground-950 mb-2">{opt.name}</h4>
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-green-600">POUR :</span>
                          <p className="text-xs text-foreground-600">{opt.pros}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-red-600">CONTRE :</span>
                          <p className="text-xs text-foreground-600">{opt.cons}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                      <h4 className="text-xs font-semibold text-green-700 mb-2">Facteurs Décisifs</h4>
                      <ul className="space-y-1">
                        {selectedReasoning.decisiveFactors.map((f, i) => <li key={i} className="text-xs text-green-600">· {f}</li>)}
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                      <h4 className="text-xs font-semibold text-amber-700 mb-2">Risques Acceptés</h4>
                      <ul className="space-y-1">
                        {selectedReasoning.risksAccepted.map((r, i) => <li key={i} className="text-xs text-amber-600">· {r}</li>)}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100">
                    <h4 className="text-xs font-semibold text-accent-700 mb-2 flex items-center gap-1"><i className="ri-check-double-line"></i>Résultat</h4>
                    <p className="text-sm text-accent-800">{selectedReasoning.outcome}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ ONGLET 3: CONTINUITY & CAPITALIZATION (AXES 3,5) ═══ */}
        {activeTab === 'continuity' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-history-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXES 3,5 — Continuité & Capitalisation</h3>
                  <p className="text-xs text-foreground-500">{intellectualContinuity.length} dossiers reconstruits</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-primary-200 bg-primary-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Reconstruction automatique sans intervention humaine</div>
                <div className="text-sm text-foreground-700">Lorsqu'un dossier est rouvert, KOS reconstruit l'historique complet, les versions, les décisions, les modifications, les validations.</div>
              </div>
              {intellectualContinuity.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDossier(d)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDossier?.id === d.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{d.dossierRef}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.status.includes('Actif') ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-500'}`}>{d.status}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{d.title}</h4>
                  <div className="text-xs text-foreground-500 mt-1">{d.client} · {d.history.length} versions</div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              {selectedDossier && (
                <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{selectedDossier.dossierRef}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedDossier.status.includes('Actif') ? 'bg-green-100 text-green-700' : 'bg-background-100 text-foreground-500'}`}>{selectedDossier.status}</span>
                    <span className="text-xs text-foreground-400 ml-auto">Dernière modification : {new Date(selectedDossier.lastModified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedDossier.title}</h2>
                  <p className="text-sm text-foreground-500 mb-4">{selectedDossier.client}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-3">Historique des Versions</h4>
                    <div className="space-y-2">
                      {selectedDossier.history.map((h, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-background-100 rounded-lg border border-background-200/70">
                          <div className="text-xs text-foreground-400 whitespace-nowrap">{new Date(h.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                          <div className="flex-1">
                            <div className="text-sm text-foreground-700">{h.action}</div>
                            <div className="text-xs text-foreground-400">{h.version} · {h.pages} pages</div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${i === selectedDossier.history.length - 1 ? 'bg-green-500' : 'bg-background-300'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                      <h4 className="text-xs font-semibold text-amber-700 mb-2">Décisions Clés</h4>
                      <ul className="space-y-1">
                        {selectedDossier.decisions.map((d, i) => <li key={i} className="text-xs text-amber-600">· {d}</li>)}
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                      <h4 className="text-xs font-semibold text-green-700 mb-2">Validateurs</h4>
                      <ul className="space-y-1">
                        {selectedDossier.validators.map((v, i) => <li key={i} className="text-xs text-green-600">· {v}</li>)}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100">
                    <h4 className="text-xs font-semibold text-accent-700 mb-2">Connaissances Capitalisées</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDossier.knowledgeGenerated.map((k, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-accent-100 text-accent-700 font-medium">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ ONGLET 4: VIRTUAL KNOWLEDGE GRAPH (AXE 4) ═══ */}
        {activeTab === 'knowledge-graph' && virtualKnowledgeGraph && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <i className="ri-git-branch-line text-lg"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground-950">AXE 4 — Knowledge Graph Virtuel</h3>
                <p className="text-xs text-foreground-500">Sans nouvelle table — liens calculés dynamiquement</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{virtualKnowledgeGraph.nodes.toLocaleString()}</div>
                <div className="text-xs text-foreground-500">Nœuds</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-primary-600">{virtualKnowledgeGraph.categories}</div>
                <div className="text-xs text-foreground-500">Catégories</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-accent-600">{virtualKnowledgeGraph.relations.length}</div>
                <div className="text-xs text-foreground-500">Relations Cartographiées</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{(virtualKnowledgeGraph.embeddings / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-foreground-500">Embeddings</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <h4 className="text-sm font-semibold text-foreground-950 mb-4">Relations Dynamiques (24 cartographiées)</h4>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {virtualKnowledgeGraph.relations.map((rel, i) => (
                    <div
                      key={i}
                      onClick={() => setExpandedRelation(expandedRelation === `${i}` ? null : `${i}`)}
                      className="p-3 bg-background-100 rounded-lg border border-background-200/70 cursor-pointer hover:border-background-300/60 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground-950">{rel.from}</span>
                        <i className="ri-arrow-right-line text-foreground-400 text-xs"></i>
                        <span className="text-xs font-semibold text-foreground-950">{rel.to}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium ml-auto">{rel.type}</span>
                        <div className="w-12 h-1.5 bg-background-200/70 rounded-full overflow-hidden ml-2">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${rel.strength * 100}%` }}></div>
                        </div>
                      </div>
                      {expandedRelation === `${i}` && (
                        <p className="text-xs text-foreground-500 mt-2 pl-1">{rel.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <h4 className="text-sm font-semibold text-foreground-950 mb-4">Top 10 Nœuds les Plus Connectés</h4>
                <div className="space-y-3">
                  {virtualKnowledgeGraph.topNodes.map((node, i) => (
                    <div key={i} className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground-400 w-5">{i + 1}</span>
                          <span className="text-sm font-semibold text-foreground-950">{node.name}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">{node.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(node.connections / 15) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-foreground-950">{node.connections} connexions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ONGLET 5: AUTO-SEEDING & CROSS-CAPITALIZATION (AXES 6,9) ═══ */}
        {activeTab === 'auto-seeding' && autoSeeding && crossCapitalization && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <i className="ri-seedling-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 6 — Auto-Seeding</h3>
                  <p className="text-xs text-foreground-500">Chaque document enrichit KOS automatiquement</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {autoSeeding.newlyDetected.map((nd, i) => (
                  <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">{nd.domain}</span>
                      <span className="text-xs text-foreground-400">{nd.confidence}%</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1">{nd.concept}</h4>
                    <div className="text-xs text-foreground-500">{nd.sources} sources vérifiées</div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                <h4 className="text-sm font-semibold text-foreground-950 mb-3">Tendances d'Accélération</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {autoSeeding.trendAcceleration.map((t, i) => (
                    <div key={i} className="text-center p-3 bg-background-100 rounded-lg">
                      <div className="text-xs text-foreground-500 mb-1">{t.trend}</div>
                      <div className="text-lg font-bold text-green-600">{t.growth}</div>
                      <div className="text-[10px] text-foreground-400">{t.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <i className="ri-link-m text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 9 — Capitalisation Croisée</h3>
                  <p className="text-xs text-foreground-500">Éviter de recréer ce qui existe déjà</p>
                </div>
              </div>
              <div className="space-y-4">
                {crossCapitalization.similarMissions.map((sm, i) => (
                  <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground-950">{sm.missionA}</span>
                        <i className="ri-arrow-left-right-line text-foreground-400"></i>
                        <span className="text-sm font-semibold text-foreground-950">{sm.missionB}</span>
                      </div>
                      <span className="text-sm font-bold text-accent-600">{sm.similarity}%</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-semibold text-foreground-500">Domaines partagés :</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {sm.sharedDomains.map((d) => <span key={d} className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700">{d}</span>)}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-foreground-500">Actifs réutilisables :</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {sm.reusableAssets.map((a) => <span key={a} className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">{a}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-green-600 font-semibold">{sm.gainEstimate}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ ONGLET 6: SELF-IMPROVEMENT & PRODUCTION (AXES 8,15) ═══ */}
        {activeTab === 'self-improvement' && selfImprovement && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <i className="ri-refresh-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 8 — Auto-Amélioration Continue</h3>
                  <p className="text-xs text-foreground-500">{selfImprovement.evaluationCycles} cycles complétés</p>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
                {Object.entries(selfImprovement.lastCycle.scores).map(([key, val]) => (
                  <div key={key} className="text-center p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-lg font-bold text-foreground-950">{val.toFixed(1)}</div>
                    <div className="text-[10px] text-foreground-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                  <h4 className="text-xs font-semibold text-green-700 mb-2">Améliorations Proposées</h4>
                  <ul className="space-y-1">
                    {selfImprovement.lastCycle.improvements.map((imp, i) => <li key={i} className="text-xs text-green-600">· {imp}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-red-50/50 rounded-lg border border-red-100">
                  <h4 className="text-xs font-semibold text-red-700 mb-2">Angles Morts</h4>
                  <ul className="space-y-1">
                    {selfImprovement.lastCycle.blindSpots.map((bs, i) => <li key={i} className="text-xs text-red-600">· {bs}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100">
                  <h4 className="text-xs font-semibold text-accent-700 mb-2">Optimisations</h4>
                  <ul className="space-y-1">
                    {selfImprovement.lastCycle.optimizations.map((opt, i) => <li key={i} className="text-xs text-accent-600">· {opt}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <i className="ri-speed-up-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 15 — Mode Production</h3>
                  <p className="text-xs text-foreground-500">Temps de réponse minimal, coût minimal, qualité maximale</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <div className="text-2xl font-bold text-green-600">{globalKPIs?.productionLatencyMs.toFixed(1)}s</div>
                  <div className="text-xs text-foreground-500">Temps Réponse</div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <div className="text-2xl font-bold text-green-600">0 FCFA</div>
                  <div className="text-xs text-foreground-500">Coût Total</div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <div className="text-2xl font-bold text-accent-600">{globalKPIs?.queryOptimizationPct}%</div>
                  <div className="text-xs text-foreground-500">Optimisation Requêtes</div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <div className="text-2xl font-bold text-primary-600">{selfImprovement.improvementsDeployed}</div>
                  <div className="text-xs text-foreground-500">Améliorations Déployées</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ONGLET 7: THINK TANK & OBSERVATORY (AXES 11,12) ═══ */}
        {activeTab === 'think-tank' && thinkTank && intelligentObservatory && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                  <i className="ri-lightbulb-flash-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 11 — Think Tank Augmenté</h3>
                  <p className="text-xs text-foreground-500">Production automatique depuis les missions</p>
                </div>
              </div>
              <div className="space-y-4">
                {thinkTank.autoGenerated.map((item, i) => (
                  <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.status === 'Publiée' || item.status === 'Publié' ? 'bg-green-100 text-green-700' : item.status.includes('production') ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'}`}>{item.status}</span>
                      <span className="text-xs text-foreground-400">{item.targetDate}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1">{item.production}</h4>
                    <div className="flex items-center gap-4 text-xs text-foreground-500">
                      <span>Source : {item.source}</span>
                      <span>{item.citations} citations</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-rose-50/50 rounded-lg border border-rose-100">
                <h4 className="text-xs font-semibold text-rose-700 mb-2">Axes de Recherche</h4>
                <div className="flex flex-wrap gap-2">
                  {thinkTank.researchAxes.map((ra, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-medium">{ra}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-700">
                  <i className="ri-radar-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 12 — Observatoire Intelligent</h3>
                  <p className="text-xs text-foreground-500">{intelligentObservatory.detectedChanges.length} évolutions détectées</p>
                </div>
              </div>
              <div className="space-y-3">
                {intelligentObservatory.detectedChanges.map((change, i) => (
                  <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">{change.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getImpactBadge(change.impact)}`}>{change.impact}</span>
                    </div>
                    <p className="text-sm text-foreground-700 mb-1">{change.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {change.affectedMissions.map((am) => (
                        <span key={am} className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-50 text-yellow-700">{am}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ ONGLET 8: EXPERTISE & ORGANIZATIONAL LEARNING (AXES 7,13,14) ═══ */}
        {activeTab === 'expertise' && expertiseEvolution && organizationalLearning && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-tools-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXES 7,13 — Expertise Auto-Évolutive & Mémoire Long Terme</h3>
                  <p className="text-xs text-foreground-500">{expertiseEvolution.guidesCount} guides · {expertiseEvolution.totalPages} pages · {expertiseEvolution.templates} templates</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {expertiseEvolution.enrichedArtefacts.map((art, i) => (
                  <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">{art.artefact}</h4>
                    <div className="space-y-1">
                      {art.newEntries && <div className="text-xs text-green-600">+{art.newEntries} entrées (total {art.total})</div>}
                      {art.newSection && <div className="text-xs text-accent-600">+Section : {art.newSection} ({art.pages}p)</div>}
                      {art.update && <div className="text-xs text-amber-600">MàJ : {art.update}</div>}
                      {art.newDimension && <div className="text-xs text-primary-600">+Dimension : {art.newDimension}</div>}
                      <div className="text-xs text-foreground-400">Mission : {art.lastMission}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <div className="text-lg font-bold text-foreground-950">{expertiseEvolution.guidesCount}</div>
                  <div className="text-xs text-foreground-500">Guides Actifs</div>
                </div>
                <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <div className="text-lg font-bold text-foreground-950">{expertiseEvolution.totalPages}</div>
                  <div className="text-xs text-foreground-500">Pages Cumulées</div>
                </div>
                <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <div className="text-lg font-bold text-foreground-950">{expertiseEvolution.templates}</div>
                  <div className="text-xs text-foreground-500">Templates Standards</div>
                </div>
                <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <div className="text-lg font-bold text-foreground-950">{expertiseEvolution.specializedTemplates}</div>
                  <div className="text-xs text-foreground-500">Templates Spécialisés</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                  <i className="ri-loop-left-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">AXE 14 — Apprentissage Organisationnel</h3>
                  <p className="text-xs text-foreground-500">Cycle permanent Mission → Capitalisation → Réutilisation</p>
                </div>
              </div>
              <div className="relative mb-6">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-background-200/70"></div>
                <div className="space-y-4">
                  {organizationalLearning.cycles.map((cycle, i) => (
                    <div key={i} className="relative pl-10">
                      <div className={`absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 ${i === 0 ? 'bg-green-500 border-green-500' : i === organizationalLearning.cycles.length - 1 ? 'bg-accent-500 border-accent-500' : 'bg-background-50 border-background-300'}`}></div>
                      <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-foreground-950">{cycle.phase}</span>
                          <span className="text-xs text-foreground-400">{cycle.date}</span>
                        </div>
                        <p className="text-sm text-foreground-600 mb-1">{cycle.description}</p>
                        <p className="text-xs text-foreground-500">{cycle.outcomes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(organizationalLearning.metrics).map(([key, val]) => (
                  <div key={key} className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                    <div className="text-sm font-bold text-foreground-950">{val}</div>
                    <div className="text-[10px] text-foreground-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* KPI Footer */}
      {globalKPIs && (
        <section className="border-t border-background-200/70 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-bold text-foreground-950">Genora Capitalization — KPIs Consolidés</h4>
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">{globalKPIs.readiness}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-sm font-bold text-cyan-600">{globalKPIs.thinkingSpaces}</div>
                <div className="text-[10px] text-foreground-500">Thinking Spaces</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-sm font-bold text-amber-600">{globalKPIs.reasoningMemories}</div>
                <div className="text-[10px] text-foreground-500">Mémoires Raisonnement</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-sm font-bold text-purple-600">{globalKPIs.knowledgeGraphRelations}</div>
                <div className="text-[10px] text-foreground-500">Relations KG</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-sm font-bold text-green-600">{globalKPIs.autoSeededConcepts}</div>
                <div className="text-[10px] text-foreground-500">Concepts Auto-Seed</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-sm font-bold text-orange-600">{globalKPIs.crossCapitalizationMatches}</div>
                <div className="text-[10px] text-foreground-500">Cross-Matches</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-sm font-bold text-blue-600">{globalKPIs.selfImprovementCycles}</div>
                <div className="text-[10px] text-foreground-500">Cycles Auto-Amélioration</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-sm font-bold text-rose-600">{globalKPIs.thinkTankProductions}</div>
                <div className="text-[10px] text-foreground-500">Productions Think Tank</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                <div className="text-sm font-bold text-green-700">0 FCFA</div>
                <div className="text-[10px] text-green-600">Coût Total</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </hubLayout>
  );
}



