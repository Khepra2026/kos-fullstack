import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useEnterpriseBrain } from '@/hooks/useEnterpriseBrain';
import type {
  BrainDomain,
  DigitalTwin,
  MemoryItem,
  IntelligenceOSComponent,
  SelfImprovementCycle,
  HallucinationDetection,
} from '@/hooks/useEnterpriseBrain';

type Tab = 'brain' | 'twins' | 'memory' | 'os' | 'improvement' | 'hallucination';

export default function KOSEnterpriseBrainPage() {
  const {
    brainDomains,
    twins,
    memories,
    osComponents,
    improvementCycles,
    detections,
    stats,
    loading,
    error,
    dataSource,
    refresh,
  } = useEnterpriseBrain();

  const [activeTab, setActiveTab] = useState<Tab>('brain');
  const [selectedDomain, setSelectedDomain] = useState<BrainDomain | null>(null);
  const [selectedTwin, setSelectedTwin] = useState<DigitalTwin | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [selectedOS, setSelectedOS] = useState<IntelligenceOSComponent | null>(null);
  const [selectedImprovement, setSelectedImprovement] = useState<SelfImprovementCycle | null>(null);
  const [selectedHallucination, setSelectedHallucination] = useState<HallucinationDetection | null>(null);

  // Set initial selections once data loads
  const hasInitialized = useState(false);
  if (!hasInitialized[0] && brainDomains.length > 0 && !selectedDomain) {
    hasInitialized[0] = true;
    setTimeout(() => {
      if (!selectedDomain) setSelectedDomain(brainDomains[0]);
      if (!selectedTwin) setSelectedTwin(twins[0] || null);
      if (!selectedMemory) setSelectedMemory(memories[0] || null);
      if (!selectedOS) setSelectedOS(osComponents[0] || null);
      if (!selectedImprovement) setSelectedImprovement(improvementCycles[0] || null);
      if (!selectedHallucination) setSelectedHallucination(detections[0] || null);
    }, 0);
  }

  const getStatusChip = (status: string) => {
    if (status.includes('Optimal')) return 'bg-green-100 text-green-700';
    if (status.includes('Stable')) return 'bg-secondary-100 text-secondary-900';
    if (status.includes('En cours')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-background-100 text-foreground-600';
  };

  const getHealthColor = (score: number) => {
    if (score >= 9.0) return 'text-green-600';
    if (score >= 8.0) return 'text-secondary-600';
    if (score >= 7.0) return 'text-yellow-600';
    if (score >= 5.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthBarColor = (score: number) => {
    if (score >= 9.0) return 'bg-green-500';
    if (score >= 8.0) return 'bg-secondary-500';
    if (score >= 7.0) return 'bg-yellow-500';
    if (score >= 5.0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getVerifBadge = (status: string) => {
    if (status === 'Vérifié — Exact') return 'bg-green-100 text-green-700';
    if (status.includes('Partiellement')) return 'bg-yellow-100 text-yellow-700';
    if (status.includes('Non Vérifié')) return 'bg-red-100 text-red-700';
    return 'bg-background-100 text-foreground-600';
  };

  const renderGaugeCircle = (score: number, maxScore: number, label: string, size: number = 48, strokeColor?: string) => {
    const pct = (score / maxScore) * 100;
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const color = strokeColor || (score >= 9 ? '#22c55e' : score >= 8 ? '#3b82f6' : score >= 7 ? '#f59e0b' : '#ef4444');
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
              strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-foreground-950">{score.toFixed(1)}</span>
          </div>
        </div>
        <span className="text-[10px] text-foreground-500 text-center leading-tight">{label}</span>
      </div>
    );
  };

  const renderScoreBar = (score: number, max: number = 10) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${getHealthBarColor(score)}`} style={{ width: `${(score / max) * 100}%` }}></div>
      </div>
      <span className={`text-xs font-bold ${getHealthColor(score)}`}>{score.toFixed(1)}</span>
    </div>
  );

  const renderProgressBar = (pct: number, color: string = 'bg-accent-500') => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }}></div>
      </div>
      <span className="text-xs font-bold text-foreground-950">{pct}%</span>
    </div>
  );

  const getImportanceBadge = (level: string) => {
    if (level === 'Critique') return 'bg-red-100 text-red-700';
    if (level === 'Fondateur') return 'bg-amber-100 text-amber-700';
    if (level === 'Haute') return 'bg-orange-100 text-orange-700';
    return 'bg-background-100 text-foreground-600';
  };

  const getMemoryTypeIcon = (type: string) => {
    if (type.includes('Leçon')) return 'ri-book-open-line';
    if (type.includes('Décision')) return 'ri-scales-line';
    if (type.includes('Intelligence')) return 'ri-radar-line';
    if (type.includes('Méthodologie')) return 'ri-tools-line';
    if (type.includes('Doctrine')) return 'ri-book-2-line';
    return 'ri-file-text-line';
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'brain', label: 'Cerveau Central', icon: 'ri-brain-line', count: brainDomains.length },
    { id: 'twins', label: 'Jumeaux Numériques', icon: 'ri-shapes-line', count: twins.filter(t => t.prediction_accuracy >= 80).length },
    { id: 'memory', label: 'Mémoire Stratégique', icon: 'ri-database-2-line', count: memories.length },
    { id: 'os', label: 'Intelligence OS v2', icon: 'ri-cpu-line', count: osComponents.filter(c => c.status === 'Optimal').length },
    { id: 'improvement', label: 'Auto-Amélioration', icon: 'ri-refresh-line', count: improvementCycles.length },
    { id: 'hallucination', label: 'Anti-Hallucination', icon: 'ri-shield-check-line', count: detections.filter(h => h.verification_status.includes('Non Vérifié')).length },
  ];

  // Loading state
  if (loading) {
    return (
      <KOSHubLayout hubId={5}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-foreground-500">Chargement du Enterprise Brain OS...</p>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  // Error state
  if (error && brainDomains.length === 0) {
    return (
      <KOSHubLayout hubId={5}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl"></i>
            </div>
            <p className="text-sm text-foreground-600 mb-4">Impossible de charger les données du Enterprise Brain OS.</p>
            <button
              onClick={refresh}
              className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line mr-1"></i>Réessayer
            </button>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  if (!selectedDomain || !selectedTwin || !selectedMemory || !selectedOS || !selectedImprovement || !selectedHallucination) {
    return (
      <KOSHubLayout hubId={5}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </KOSHubLayout>
    );
  }

  return (
    <KOSHubLayout hubId={5}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-cpu-line"></i>KOS Phase 4 — Enterprise Brain & Intelligence OS v2
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">Enterprise Brain & Intelligence OS v2</h1>
                {dataSource === 'supabase' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    DONNÉES LIVE — SUPABASE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold whitespace-nowrap">
                    DONNÉES MOCK — DÉMO
                  </span>
                )}
              </div>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Cerveau central cognitif de KHEPRA OS — Domaines de connaissance interconnectés, Jumeaux numériques prédictifs,
                Mémoire stratégique capitalisée, Composants OS en temps réel, Amélioration continue autonome et Détection anti-hallucination.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{stats.totalKnowledge.toLocaleString()}</div>
                <div className="text-xs text-foreground-500">Connaissances</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{stats.avgHealthScore.toFixed(1)}/10</div>
                <div className="text-xs text-foreground-500">Santé OS</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{stats.avgPredictionAccuracy}%</div>
                <div className="text-xs text-foreground-500">Précision DT</div>
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
        {/* ===== ONGLET 1 : ENTERPRISE BRAIN ===== */}
        {activeTab === 'brain' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-brain-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Enterprise Brain™</h3>
                  <p className="text-xs text-foreground-500">8 domaines de connaissance interconnectés</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-accent-200 bg-accent-50/50 mb-3">
                <div className="text-xs text-foreground-500 mb-1">Force moyenne de connexion</div>
                <div className="text-lg font-bold text-accent-700">{(brainDomains.reduce((s, d) => s + d.connection_strength, 0) / brainDomains.length).toFixed(1)}/10</div>
                <div className="text-xs text-foreground-400 mt-1">Graphe de connaissances 8 nœuds × 28 arêtes</div>
              </div>
              {brainDomains.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDomain(d)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDomain.id === d.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">{d.access_frequency.split('—')[0].trim()}</span>
                    <span className="text-sm font-bold text-foreground-950">{d.connection_strength.toFixed(1)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{d.knowledge_domain}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-foreground-500">{d.knowledge_count} documents</span>
                    <span className="text-xs text-foreground-400">MAJ {new Date(d.last_enriched).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">
                    {selectedDomain.access_frequency.split('—')[0].trim()}
                  </span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Dernier enrichissement : {new Date(selectedDomain.last_enriched).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedDomain.knowledge_domain}</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedDomain.knowledge_count}</div>
                    <div className="text-xs text-foreground-500">Documents</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedDomain.connection_strength.toFixed(1)}/10</div>
                    <div className="text-xs text-foreground-500">Connexion</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">{selectedDomain.access_frequency.split('—')[1]?.trim() || '—'}</div>
                    <div className="text-xs text-foreground-500">Fréquence</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">
                      {new Date(selectedDomain.last_enriched).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </div>
                    <div className="text-xs text-foreground-500">MAJ</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Force de connexion au graphe de connaissances</span>
                  </div>
                  {renderScoreBar(selectedDomain.connection_strength)}
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Liens avec les autres domaines (force ≥ 6)</h4>
                  <div className="space-y-2">
                    {brainDomains
                      .filter(d => d.id !== selectedDomain.id && d.connection_strength >= 6.0)
                      .sort((a, b) => b.connection_strength - a.connection_strength)
                      .slice(0, 4)
                      .map((d) => (
                        <div key={d.id} className="flex items-center justify-between text-xs">
                          <span className="text-foreground-600">{d.knowledge_domain}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                              <div className="h-full bg-accent-400 rounded-full" style={{ width: `${d.connection_strength * 10}%` }}></div>
                            </div>
                            <span className="text-foreground-500">{d.connection_strength.toFixed(1)}</span>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-background-200/70">
                  <span className="text-xs text-foreground-500">Réseau sémantique KHEPRA OS</span>
                  <span className="text-xs font-semibold text-foreground-950">{brainDomains.length} nœuds actifs</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : JUMEAUX NUMÉRIQUES ===== */}
        {activeTab === 'twins' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                  <i className="ri-shapes-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Digital Twin Engine™</h3>
                  <p className="text-xs text-foreground-500">6 jumeaux numériques — Simulation prédictive</p>
                </div>
              </div>
              {twins.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTwin(t)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTwin.id === t.id ? 'border-cyan-300 bg-cyan-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{t.domain}</span>
                    <span className={`text-sm font-bold ${t.prediction_accuracy >= 85 ? 'text-green-600' : t.prediction_accuracy >= 75 ? 'text-yellow-600' : 'text-orange-600'}`}>
                      {t.prediction_accuracy}%
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{t.twin_name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">Dernière sim : {new Date(t.last_simulation_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-medium">{selectedTwin.domain}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">v{selectedTwin.metadata.version}</span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Prochaine sim : {new Date(selectedTwin.metadata.next_simulation_scheduled).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedTwin.twin_name}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedTwin.prediction_accuracy}%</div>
                    <div className="text-xs text-foreground-500">Précision</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">{selectedTwin.decision_impact.pending_decisions}</div>
                    <div className="text-xs text-foreground-500">Décisions en attente</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">{selectedTwin.represented_entities.length}</div>
                    <div className="text-xs text-foreground-500">Entités modélisées</div>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Entités Représentées</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTwin.represented_entities.map((e: string) => (
                      <span key={e} className="text-xs px-2 py-1 rounded-full bg-cyan-50 text-cyan-700 font-medium border border-cyan-100">{e}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Scénarios de Simulation</h4>
                  <div className="space-y-3">
                    {selectedTwin.simulation_scenarios.scenarios.map((s: { name: string; result: string; probability: string }, i: number) => (
                      <div key={i} className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-foreground-950">{s.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            s.probability.includes('Très probable') ? 'bg-green-100 text-green-700' :
                            s.probability.includes('Probable') ? 'bg-secondary-100 text-secondary-900' :
                            s.probability.includes('Possible') ? 'bg-yellow-100 text-yellow-700' :
                            'bg-background-100 text-foreground-500'
                          }`}>{s.probability}</span>
                        </div>
                        <p className="text-xs text-foreground-600">{s.result}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Métriques Clés</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedTwin.key_metrics as Record<string, string>).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between p-2 bg-background-100 rounded text-xs">
                        <span className="text-foreground-500">{key.replace(/_/g, ' ')}</span>
                        <span className="font-semibold text-foreground-950">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-cyan-50/50 rounded-lg border border-cyan-100">
                  <div className="flex items-center gap-2">
                    <i className="ri-lightbulb-flash-line text-cyan-600"></i>
                    <div>
                      <span className="text-xs text-foreground-500">Dernière décision : </span>
                      <span className="text-xs font-semibold text-foreground-950">{selectedTwin.decision_impact.last_decision}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : STRATEGIC MEMORY ===== */}
        {activeTab === 'memory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-database-2-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Strategic Memory™</h3>
                  <p className="text-xs text-foreground-500">{memories.length} mémoires capitalisées</p>
                </div>
              </div>
              {memories.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMemory(m)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedMemory.id === m.id ? 'border-amber-300 bg-amber-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getImportanceBadge(m.importance_level)}`}>{m.importance_level}</span>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-background-100 text-foreground-500">
                      <i className={`${getMemoryTypeIcon(m.memory_type)} text-xs`}></i>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{m.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">{m.memory_type}</span>
                    <span className="text-xs text-foreground-400">{m.retrieval_count} accès</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getImportanceBadge(selectedMemory.importance_level)}`}>{selectedMemory.importance_level}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{selectedMemory.memory_type}</span>
                  <span className="text-xs text-foreground-400 ml-auto">{selectedMemory.retrieval_count} consultations</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-3">{selectedMemory.title}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedMemory.retrieval_count}</div>
                    <div className="text-xs text-foreground-500">Accès cumulés</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">
                      {new Date(selectedMemory.last_accessed).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-foreground-500">Dernier accès</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">
                      {new Date(selectedMemory.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-foreground-500">Création</div>
                  </div>
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Contenu</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed whitespace-pre-line">{selectedMemory.content}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedMemory.tags.split(', ').map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700 font-medium border border-amber-100">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : INTELLIGENCE OS v2 ===== */}
        {activeTab === 'os' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-cpu-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Intelligence OS v2™</h3>
                  <p className="text-xs text-foreground-500">8 composants — Santé en temps réel</p>
                </div>
              </div>
              {osComponents.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedOS(c)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedOS.id === c.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{c.component_type}</span>
                    <div className="flex items-center gap-1">
                      {renderGaugeCircle(c.health_score, 10, '', 36)}
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{c.component_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusChip(c.status)}`}>{c.status}</span>
                    {c.alerts_active > 0 && (
                      <span className="text-xs font-bold text-red-600">{c.alerts_active} alerte{c.alerts_active > 1 ? 's' : ''}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedOS.component_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusChip(selectedOS.status)}`}>{selectedOS.status}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium ml-auto">{selectedOS.integration_status}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedOS.component_name}</h2>
                <div className="flex justify-center mb-4">
                  {renderGaugeCircle(selectedOS.health_score, 10, 'Score de Santé', 80)}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">{selectedOS.integration_status}</div>
                    <div className="text-xs text-foreground-500">Intégration</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className={`text-sm font-bold ${selectedOS.alerts_active > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedOS.alerts_active > 0 ? `${selectedOS.alerts_active} active` : 'Aucune'}
                    </div>
                    <div className="text-xs text-foreground-500">Alertes</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-sm font-bold text-foreground-950">
                      {new Date(selectedOS.last_sync).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-xs text-foreground-500">Dernière synchro</div>
                  </div>
                </div>
                <div className="p-3 bg-background-100 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Dépendances</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOS.dependencies.split(', ').map((d: string) => (
                      <span key={d} className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-600 font-medium border border-primary-100">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3">Santé des autres composants</h4>
                  <div className="space-y-2">
                    {osComponents
                      .filter(c => c.id !== selectedOS.id)
                      .sort((a, b) => b.health_score - a.health_score)
                      .map((c) => (
                        <div key={c.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${c.health_score >= 9 ? 'bg-green-500' : c.health_score >= 8 ? 'bg-secondary-500' : c.health_score >= 7 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                            <span className="text-foreground-600">{c.component_name}</span>
                          </div>
                          <span className={`font-bold ${getHealthColor(c.health_score)}`}>{c.health_score.toFixed(1)}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 5 : SELF IMPROVEMENT ===== */}
        {activeTab === 'improvement' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <i className="ri-refresh-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Self-Improvement Engine v2™</h3>
                  <p className="text-xs text-foreground-500">6 boucles d'amélioration continue</p>
                </div>
              </div>
              {improvementCycles.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedImprovement(c)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedImprovement.id === c.id ? 'border-green-300 bg-green-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{c.status}</span>
                    <span className="text-sm font-bold text-foreground-950">{c.progress_pct}%</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{c.improvement_area}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">{c.current_performance} → {c.target_performance}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedImprovement.status}</span>
                  <span className="text-xs text-foreground-400 ml-auto">Dernier cycle : {new Date(selectedImprovement.last_cycle).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-4">{selectedImprovement.improvement_area}</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">Actuel</div>
                    <div className="text-2xl font-bold text-foreground-950">{selectedImprovement.current_performance}</div>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-lg text-center border border-green-100">
                    <div className="text-xs text-foreground-500 mb-1">Cible</div>
                    <div className="text-2xl font-bold text-green-600">{selectedImprovement.target_performance}</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">Progression</div>
                    <div className="text-2xl font-bold text-foreground-950">{selectedImprovement.progress_pct}%</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-500">Progression vers la cible</span>
                  </div>
                  {renderProgressBar(selectedImprovement.progress_pct, 'bg-green-500')}
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70 mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Actions d'Amélioration</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedImprovement.improvement_actions}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-background-200/70">
                  <span className="text-xs text-foreground-500">Cycle en cours</span>
                  <span className="text-xs font-semibold text-foreground-950">{selectedImprovement.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 6 : HALLUCINATION DETECTION ===== */}
        {activeTab === 'hallucination' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <i className="ri-shield-check-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Hallucination Detection™</h3>
                  <p className="text-xs text-foreground-500">6 détections — Taux {stats.hallucinationRate}%</p>
                </div>
              </div>
              {detections.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHallucination(h)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedHallucination.id === h.id ? 'border-red-300 bg-red-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{h.content_source}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getVerifBadge(h.verification_status)}`}>
                      {h.verification_status.split('—')[0].trim()}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-2">{h.claim}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground-500">Confiance {h.confidence_score}%</span>
                    <span className="text-xs text-foreground-400">{new Date(h.detected_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedHallucination.content_source}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getVerifBadge(selectedHallucination.verification_status)}`}>
                    {selectedHallucination.verification_status}
                  </span>
                  <span className="text-xs text-foreground-400 ml-auto">
                    Détecté le {new Date(selectedHallucination.detected_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h2 className="text-base font-bold text-foreground-950 mb-4">Claim analysée : « {selectedHallucination.claim} »</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">Score de Confiance</div>
                    <div className={`text-2xl font-bold ${selectedHallucination.confidence_score >= 85 ? 'text-green-600' : selectedHallucination.confidence_score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedHallucination.confidence_score}%
                    </div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs text-foreground-500 mb-1">Statut de Vérification</div>
                    <div className={`text-sm font-bold ${selectedHallucination.verification_status.includes('Exact') ? 'text-green-600' : selectedHallucination.verification_status.includes('Partiellement') ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedHallucination.verification_status}
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Base Factuelle</h4>
                  <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedHallucination.factual_basis}</p>
                  </div>
                </div>
                {selectedHallucination.contradictory_source !== 'Aucun' && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">Source Contradictoire</h4>
                    <div className="p-3 bg-red-50/50 rounded-lg border border-red-100">
                      <p className="text-sm text-foreground-600 leading-relaxed">{selectedHallucination.contradictory_source}</p>
                    </div>
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-2">Résolution</h4>
                  <div className="p-4 bg-accent-50/50 rounded-lg border border-accent-100">
                    <p className="text-sm text-foreground-600 leading-relaxed">{selectedHallucination.resolution}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Enterprise Brain & Intelligence OS v2</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Santé OS</div>
              <div className="text-lg font-bold text-accent-500">{stats.avgHealthScore.toFixed(1)}/10</div>
              <div className="h-1.5 mt-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${stats.avgHealthScore * 10}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Précision Jumeaux</div>
              <div className="text-lg font-bold text-cyan-600">{stats.avgPredictionAccuracy}%</div>
              <div className="h-1.5 mt-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${stats.avgPredictionAccuracy}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Progression Amélioration</div>
              <div className="text-lg font-bold text-green-600">{stats.avgImprovementProgress}%</div>
              <div className="h-1.5 mt-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${stats.avgImprovementProgress}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Taux Hallucination</div>
              <div className="text-lg font-bold text-red-600">{stats.hallucinationRate}%</div>
              <div className="h-1.5 mt-2 bg-background-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${stats.hallucinationRate}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Connaissances Total</div>
              <div className="text-lg font-bold text-foreground-950">{stats.totalKnowledge.toLocaleString()}</div>
              <div className="text-xs text-foreground-400 mt-2">{brainDomains.length} domaines actifs</div>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}