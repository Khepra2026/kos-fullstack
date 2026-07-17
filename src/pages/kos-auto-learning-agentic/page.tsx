import { useState, useRef, useEffect } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSAutoLearning } from '@/hooks/useKOSAutoLearning';
import { useKOSTaskDecomposition } from '@/hooks/useKOSTaskDecomposition';
import type { ProceduralKO, FeedbackLoopCycle, ExecutionPattern } from '@/mocks/kosProceduralKOs';
import type { DecompositionBlueprint, ActiveDecomposition } from '@/mocks/kosAgenticDecomposition';

type ActivePillar = 'pillar2' | 'pillar3';

export default function KOSAutoLearningAgenticPage() {
  const [activePillar, setActivePillar] = useState<ActivePillar>('pillar2');
  const autoLearning = useKOSAutoLearning();
  const taskDecomp = useKOSTaskDecomposition();

  return (
    <KOSHubLayout hubId={95}>
      <SeoHead
        title="KOS Auto-Learning & Agentic Development — PILLAR 2+3 | KHEPRA EXPERTS"
        description="KOS Auto-Learning Engine : feedback loops sur logs d'exécution agents pour générer des KOs procéduraux. KOS Agentic Development : décomposition de tâches complexes en sous-agents via l'Orchestrator Engine."
        keywords="KOS Auto-Learning, KOs procéduraux, feedback loop, agentic development, task decomposition, KHEPRA EXPERTS, KOS Orchestrator"
        canonicalPath="/kos-auto-learning-agentic"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-14 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20neural%20network%20visualization%20with%20interconnected%20glowing%20nodes%20and%20flowing%20data%20streams%2C%20dark%20technological%20background%20with%20emerald%20and%20amber%20energy%20pulses%2C%20self-learning%20system%20architecture%20diagram%20rendered%20as%20holographic%20projection%2C%20futuristic%20AI%20research%20laboratory%20aesthetic%2C%20no%20text%20no%20human%20figures%2C%20cinematic%20volumetric%20lighting%2C%20ultra%20detailed%208K%20render&width=1920&height=700&seq=kos-pillar23-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/30 via-foreground-950/60 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 backdrop-blur-sm">
              <i className="ri-brain-line text-accent-400 text-sm" />
              <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">PILLAR 2 — Auto-Learning</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
              <i className="ri-git-branch-line text-emerald-400 text-sm" />
              <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">PILLAR 3 — Agentic Dev</span>
            </div>
            {autoLearning.isLive && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">LIVE — SUPABASE</span>
              </div>
            )}
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            KOS s&apos;auto-apprend.
            <span className="block text-accent-400 mt-2">Feedback Loops × Agentic Decomposition.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6 max-w-3xl">
            <strong className="text-white">PILLAR 2</strong> — Les logs d&apos;exécution des agents nourrissent le Feedback Loop qui génère des <strong className="text-accent-400">KOs procéduraux</strong> réutilisables.{' '}
            <strong className="text-white">PILLAR 3</strong> — Toute mission complexe est décomposée en sous-tâches atomiques assignées aux <strong className="text-emerald-400">agents spécialisés</strong> via l&apos;Orchestrator Engine.
          </p>
        </div>
      </section>

      {/* ===== PILLAR SWITCHER ===== */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            <button
              onClick={() => setActivePillar('pillar2')}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                activePillar === 'pillar2'
                  ? 'bg-accent-500 text-white'
                  : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-accent-300'
              }`}
            >
              <i className="ri-brain-line" />
              PILLAR 2 — Auto-Learning & KOs Procéduraux
            </button>
            <button
              onClick={() => setActivePillar('pillar3')}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                activePillar === 'pillar3'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-emerald-300'
              }`}
            >
              <i className="ri-git-branch-line" />
              PILLAR 3 — Agentic Decomposition
            </button>
          </div>
        </div>
      </section>

      {/* ===== PILLAR 2 CONTENT ===== */}
      {activePillar === 'pillar2' && <Pillar2Content engine={autoLearning} />}

      {/* ===== PILLAR 3 CONTENT ===== */}
      {activePillar === 'pillar3' && <Pillar3Content engine={taskDecomp} />}

      {/* ===== CROSS-LINKS ===== */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">KOS Intelligence — Tous les Centres</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Self-Evolution', path: '/kos-self-evolution', icon: 'ri-loop-left-line', color: '#F59E0B' },
              { label: 'Orchestrator', path: '/kos-orchestrator-engine', icon: 'ri-flow-chart', color: '#DC2626' },
              { label: 'Bloc Execution', path: '/kos-block-execution', icon: 'ri-flashlight-line', color: '#BE123C' },
              { label: 'Multi-Agent', path: '/kos-multi-agent-orchestration', icon: 'ri-robot-2-line', color: '#6366F1' },
              { label: 'Enterprise Brain', path: '/kos-enterprise-brain-os', icon: 'ri-brain-line', color: '#8B5CF6' },
              { label: 'Intelligent Orchestrator', path: '/kos-orchestrator-engine', icon: 'ri-radar-line', color: '#14B8A6' },
            ].map(link => (
              <a key={link.path} href={link.path} className="rounded-xl border border-background-200 bg-white p-3 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}

// ═══════════════════════════════════════════
// PILLAR 2 — AUTO-LEARNING & PROCEDURAL KOs
// ═══════════════════════════════════════════

function Pillar2Content({ engine }: { engine: ReturnType<typeof useKOSAutoLearning> }) {
  const [activeTab, setActiveTab] = useState<'kos' | 'patterns' | 'cycles'>('kos');
  const [expandedKO, setExpandedKO] = useState<string | null>(null);
  const cycleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cycleContainerRef.current && engine.analyzing) {
      cycleContainerRef.current.scrollTop = 0;
    }
  }, [engine.activeCycle, engine.analyzing]);

  return (
    <>
      {/* ===== STATS BAR ===== */}
      <section className="py-3 bg-accent-50 border-b border-accent-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { label: 'KOs Générés', value: engine.proceduralKOs.length, icon: 'ri-lightbulb-flash-line', color: 'text-accent-600' },
              { label: 'Promus', value: engine.promotedKOs.length, icon: 'ri-arrow-up-circle-line', color: 'text-emerald-600' },
              { label: 'Validés', value: engine.validatedKOs.length, icon: 'ri-check-double-line', color: 'text-primary-600' },
              { label: 'Proposés', value: engine.proposedKOs.length, icon: 'ri-lightbulb-line', color: 'text-secondary-600' },
              { label: 'Cycles', value: engine.cycles.length, icon: 'ri-loop-left-line', color: 'text-foreground-500' },
              { label: 'Patterns', value: engine.patterns.length, icon: 'ri-bubble-chart-line', color: 'text-foreground-500' },
              { label: 'Logs Analysés', value: engine.stats.totalLogsAnalyzed.toLocaleString(), icon: 'ri-database-2-line', color: 'text-foreground-500' },
            ].map((s, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white border border-accent-100">
                <i className={`${s.icon} ${s.color} text-xs mb-0.5 block`} />
                <span className="block text-base font-bold text-foreground-950 font-heading">{s.value}</span>
                <span className="text-[9px] text-foreground-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK LOOP COMMAND ===== */}
      <section className="py-4 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground-950 text-sm mb-1">
                <i className="ri-loop-left-line text-accent-500 mr-2" />
                Feedback Loop — Analyse des logs d&apos;exécution
              </h3>
              <p className="text-xs text-foreground-500">
                {engine.activeCycle?.status === 'running'
                  ? `Cycle en cours — ${engine.activeCycle.logsAnalyzed} logs analysés...`
                  : engine.activeCycle?.status === 'completed'
                    ? `Dernier cycle : ${engine.activeCycle.patternsDetected} patterns → ${engine.activeCycle.kosGenerated} KOs`
                    : 'Lancez un cycle pour analyser les logs et générer des KOs procéduraux'}
              </p>
            </div>
            <button
              onClick={engine.runFeedbackCycle}
              disabled={engine.analyzing}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
                engine.analyzing
                  ? 'bg-accent-300 text-white cursor-wait'
                  : 'bg-accent-500 text-white hover:bg-accent-600 hover:scale-105'
              } disabled:opacity-80`}
            >
              {engine.analyzing ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />
                  ANALYSE EN COURS...
                </>
              ) : (
                <>
                  <i className="ri-play-circle-line text-lg" />
                  LANCER FEEDBACK LOOP
                </>
              )}
            </button>
          </div>

          {/* Live cycle progress */}
          {engine.analyzing && engine.activeCycle && (
            <div className="mt-3 p-3 rounded-xl bg-accent-50 border border-accent-200/70">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-accent-400 border-t-transparent animate-spin" />
                <div>
                  <span className="text-sm font-semibold text-accent-700">Cycle actif — {engine.activeCycle.id}</span>
                  <div className="flex gap-2 mt-1 text-xs text-accent-600">
                    <span>Logs: {engine.activeCycle.logsAnalyzed}</span>
                    <span>Patterns: {engine.activeCycle.patternsDetected}</span>
                    <span>KOs: {engine.activeCycle.kosGenerated}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <div className="sticky top-[88px] z-20 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {[
              { id: 'kos' as const, label: 'KOs Procéduraux', icon: 'ri-lightbulb-flash-line' },
              { id: 'patterns' as const, label: 'Patterns Détectés', icon: 'ri-bubble-chart-line' },
              { id: 'cycles' as const, label: 'Cycles Feedback', icon: 'ri-loop-left-line' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TAB: KOs PROCÉDURAUX ===== */}
      {activeTab === 'kos' && (
        <section className="py-6 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Type summary */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(engine.kosByType).map(([type, kos]) => (
                <span key={type} className="text-xs px-3 py-1 rounded-full bg-white border border-background-200 text-foreground-600 font-medium">
                  {type.replace(/_/g, ' ')}: {kos.length}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {engine.proceduralKOs.map(ko => (
                <div
                  key={ko.id}
                  className={`rounded-xl border bg-white overflow-hidden transition-all cursor-pointer ${
                    ko.status === 'promoted' ? 'border-emerald-300 ring-1 ring-emerald-100' :
                    ko.status === 'validated' ? 'border-accent-200' :
                    'border-background-200'
                  }`}
                  onClick={() => setExpandedKO(expandedKO === ko.id ? null : ko.id)}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        ko.type === 'skill' ? 'bg-primary-100 text-primary-600' :
                        ko.type === 'workflow_pattern' ? 'bg-accent-100 text-accent-600' :
                        ko.type === 'reusable_component' ? 'bg-secondary-100 text-secondary-600' :
                        ko.type === 'decision_rule' ? 'bg-amber-100 text-amber-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <i className={`${
                          ko.type === 'skill' ? 'ri-tools-line' :
                          ko.type === 'workflow_pattern' ? 'ri-git-branch-line' :
                          ko.type === 'reusable_component' ? 'ri-puzzle-line' :
                          ko.type === 'decision_rule' ? 'ri-scales-line' :
                          'ri-shield-flash-line'
                        } text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-sm font-bold text-foreground-950">{ko.title}</h3>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                            ko.status === 'promoted' ? 'bg-emerald-100 text-emerald-700' :
                            ko.status === 'validated' ? 'bg-accent-100 text-accent-700' :
                            'bg-background-100 text-foreground-500'
                          }`}>
                            {ko.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500 mb-2 line-clamp-2">{ko.description}</p>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-foreground-400">
                          <span className="flex items-center gap-1">
                            <i className="ri-robot-2-line" />{ko.sourceAgentName}
                          </span>
                          <span>•</span>
                          <span>{ko.inducedFrom}</span>
                          <span>•</span>
                          <span className="text-accent-600 font-bold">{ko.confidenceScore}%</span>
                        </div>
                      </div>
                    </div>

                    {expandedKO === ko.id && (
                      <div className="mt-4 pt-4 border-t border-background-100 space-y-3">
                        {/* Procedure */}
                        <div>
                          <h4 className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-1.5">
                            <i className="ri-list-ordered mr-1" />Procédure
                          </h4>
                          <ol className="space-y-1">
                            {ko.procedure.map((step, i) => (
                              <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                                <span className="text-accent-500 font-bold flex-shrink-0">{i + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Preconditions */}
                        <div className="p-2.5 rounded-lg bg-background-50 border border-background-100">
                          <span className="text-[10px] font-semibold text-foreground-500">Préconditions :</span>
                          <ul className="mt-1 space-y-0.5">
                            {ko.preconditions.map((p, i) => (
                              <li key={i} className="text-[10px] text-foreground-500 flex items-start gap-1">
                                <span className="mt-0.5">•</span><span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                          <div className="p-1.5 rounded bg-emerald-50"><span className="block font-bold text-emerald-700">{ko.costSavingsFCFA.toLocaleString()} FCFA</span><span className="text-emerald-500">Économies</span></div>
                          <div className="p-1.5 rounded bg-accent-50"><span className="block font-bold text-accent-700">{ko.latencyReductionMs}ms</span><span className="text-accent-500">Latence</span></div>
                          <div className="p-1.5 rounded bg-primary-50"><span className="block font-bold text-primary-700">+{ko.qualityImprovement}%</span><span className="text-primary-500">Qualité</span></div>
                        </div>

                        {/* Promote buttons */}
                        {ko.status !== 'promoted' && (
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); engine.promoteKO(ko.id); }}
                              className="flex-1 px-3 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-arrow-up-circle-line mr-1" />Promouvoir → Best Practices
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); engine.promoteToCapsule(ko.id); }}
                              className="flex-1 px-3 py-2 rounded-lg bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-archive-line mr-1" />→ Knowledge Capsule
                            </button>
                          </div>
                        )}

                        {ko.status === 'promoted' && (
                          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 text-center">
                            <i className="ri-check-double-line mr-1" />Promu dans <strong>{ko.promotedTo?.replace(/_/g, ' ')}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB: PATTERNS ===== */}
      {activeTab === 'patterns' && (
        <section className="py-6 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-3">
              {engine.patterns.map(pat => (
                <div key={pat.id} className="rounded-xl border border-background-200 bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-foreground-950">{pat.patternName}</h3>
                        {pat.kosCandidate && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">KO Candidate</span>
                        )}
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{pat.detectedFrom}</span>
                      </div>
                      <p className="text-xs text-foreground-500 mb-2">{pat.typicalMission}</p>
                      <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                        {pat.agentChain.map((a, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <span className="px-1.5 py-0.5 rounded bg-accent-50 text-accent-700">{a}</span>
                            {i < pat.agentChain.length - 1 && <i className="ri-arrow-right-line text-[8px]" />}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-3 gap-3 text-center">
                      <div><span className="block text-lg font-bold text-foreground-950">{pat.frequency}</span><span className="text-[9px] text-foreground-400">fréquence</span></div>
                      <div><span className="block text-lg font-bold text-emerald-600">{pat.successRate}%</span><span className="text-[9px] text-foreground-400">succès</span></div>
                      <div><span className="block text-lg font-bold text-foreground-950">{pat.avgLatencyMs}ms</span><span className="text-[9px] text-foreground-400">latence</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB: CYCLES ===== */}
      {activeTab === 'cycles' && (
        <section className="py-6 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={cycleContainerRef}>
            <div className="space-y-3">
              {engine.cycles.map(cycle => (
                <div key={cycle.id} className={`rounded-xl border bg-white overflow-hidden ${
                  cycle.status === 'running' ? 'border-accent-300 ring-2 ring-accent-100' :
                  cycle.status === 'completed' ? 'border-background-200' :
                  'border-red-200'
                }`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${
                            cycle.status === 'running' ? 'bg-accent-500 animate-pulse' :
                            cycle.status === 'completed' ? 'bg-emerald-500' :
                            'bg-red-500'
                          }`} />
                          <span className="text-sm font-bold text-foreground-950">{cycle.id}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                            cycle.status === 'running' ? 'bg-accent-100 text-accent-700' :
                            cycle.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-red-100 text-red-700'
                          }`}>{cycle.status.toUpperCase()}</span>
                        </div>
                        <p className="text-xs text-foreground-500 mb-2">{cycle.summary}</p>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-foreground-400">
                          <span><i className="ri-database-2-line mr-1" />{cycle.logsAnalyzed} logs</span>
                          <span>•</span>
                          <span><i className="ri-bubble-chart-line mr-1" />{cycle.patternsDetected} patterns</span>
                          <span>•</span>
                          <span><i className="ri-lightbulb-flash-line mr-1" />{cycle.kosGenerated} KOs</span>
                          <span>•</span>
                          <span><i className="ri-error-warning-line mr-1" />{cycle.contradictionsFlagged} contradictions</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 text-xs text-foreground-400">
                        <div>{new Date(cycle.startedAt).toLocaleTimeString()}</div>
                        {cycle.completedAt && <div className="text-emerald-600">{Math.round((new Date(cycle.completedAt).getTime() - new Date(cycle.startedAt).getTime()) / 1000)}s</div>}
                      </div>
                    </div>
                    {cycle.domainsCovered.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {cycle.domainsCovered.map(d => (
                          <span key={d} className="text-[9px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200">{d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ═══════════════════════════════════════════
// PILLAR 3 — AGENTIC DECOMPOSITION
// ═══════════════════════════════════════════

function Pillar3Content({ engine }: { engine: ReturnType<typeof useKOSTaskDecomposition> }) {
  const [missionInput, setMissionInput] = useState('');
  const [urgency, setUrgency] = useState<'medium' | 'high' | 'critical'>('medium');
  const [expandedBP, setExpandedBP] = useState<string | null>(null);
  const [selectedDecomp, setSelectedDecomp] = useState<string | null>(null);

  const handleDecompose = () => {
    if (missionInput.trim()) {
      engine.decompose({
        missionDescription: missionInput.trim(),
        domain: 'General',
        urgency,
      });
    }
  };

  const handleLaunch = () => {
    if (missionInput.trim()) {
      engine.launchDecomposition({
        missionDescription: missionInput.trim(),
        domain: 'General',
        urgency,
      });
    }
  };

  const activeBP = engine.activeDecompositions.find(a => a.id === selectedDecomp);
  const bpDetail = activeBP ? engine.blueprints.find(b => b.id === activeBP.blueprintId) : null;

  return (
    <>
      {/* ===== STATS BAR ===== */}
      <section className="py-3 bg-emerald-50 border-b border-emerald-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { label: 'Blueprints', value: engine.blueprints.length, icon: 'ri-git-branch-line', color: 'text-emerald-600' },
              { label: 'Agents', value: engine.agents.length, icon: 'ri-robot-2-line', color: 'text-primary-600' },
              { label: 'Missions Décomp.', value: engine.stats.missionsDecomposed, icon: 'ri-task-line', color: 'text-accent-600' },
              { label: 'Sous-tâches/mission', value: engine.stats.avgSubTasksPerMission, icon: 'ri-puzzle-line', color: 'text-secondary-600' },
              { label: 'Parallélisme', value: `${engine.stats.parallelExecutionRate}%`, icon: 'ri-speed-up-line', color: 'text-foreground-500' },
              { label: 'Actives', value: engine.activeDecompositions.filter(a => a.status === 'running').length, icon: 'ri-play-circle-line', color: 'text-emerald-500' },
              { label: 'Santé Orchestrator', value: engine.health.status, icon: 'ri-heart-pulse-line', color: engine.health.status === 'healthy' ? 'text-emerald-500' : 'text-red-500' },
            ].map((s, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white border border-emerald-100">
                <i className={`${s.icon} ${s.color} text-xs mb-0.5 block`} />
                <span className="block text-base font-bold text-foreground-950 font-heading">{s.value}</span>
                <span className="text-[9px] text-foreground-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DECOMPOSITION ENGINE ===== */}
      <section className="py-6 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <i className="ri-git-branch-line text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground-950 text-sm">KOS Agentic Decomposer — Décomposition de mission complexe</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                value={missionInput}
                onChange={e => setMissionInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleDecompose()}
                placeholder="Ex: Due diligence réglementaire acquisition FinTech CEMAC 3 entités..."
                className="flex-1 px-4 py-3 bg-background-50 border border-background-200 rounded-xl text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-emerald-300"
              />
              <select
                value={urgency}
                onChange={e => setUrgency(e.target.value as typeof urgency)}
                className="px-3 py-3 bg-background-50 border border-background-200 rounded-xl text-sm text-foreground-950 cursor-pointer"
              >
                <option value="medium">Standard</option>
                <option value="high">Urgent</option>
                <option value="critical">Critique</option>
              </select>
              <button
                onClick={handleDecompose}
                disabled={!missionInput.trim() || engine.decomposing}
                className="px-6 py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                {engine.decomposing ? (
                  <><i className="ri-loader-4-line animate-spin mr-1.5" />Analyse...</>
                ) : (
                  <><i className="ri-search-line mr-1.5" />Décomposer</>
                )}
              </button>
              <button
                onClick={handleLaunch}
                disabled={!missionInput.trim() || engine.decomposing}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-bold hover:from-emerald-600 hover:to-teal-600 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                <i className="ri-rocket-line mr-1.5" />Lancer
              </button>
            </div>

            {/* Decomposition result */}
            {engine.lastResult && (
              <div className={`rounded-xl border p-4 ${
                engine.lastResult.matchedBlueprint ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    engine.lastResult.matchedBlueprint ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {engine.lastResult.matchedBlueprint ? 'BLUEPRINT MATCHÉ' : 'DÉCOMPOSITION CUSTOM'}
                  </span>
                  {engine.lastResult.blueprint && (
                    <span className="text-xs text-foreground-600">{engine.lastResult.blueprint.missionType}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Critical Path */}
                  <div>
                    <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <i className="ri-timer-flash-line" />Chemin Critique ({engine.lastResult.criticalPathTasks.length})
                    </h4>
                    <ul className="space-y-1">
                      {engine.lastResult.criticalPathTasks.map((t, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-foreground-700">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Parallelizable */}
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <i className="ri-speed-up-line" />Parallélisable ({engine.lastResult.parallelizableTasks.length})
                    </h4>
                    <ul className="space-y-1">
                      {engine.lastResult.parallelizableTasks.map((t, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-foreground-700">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-background-200/70 flex gap-4 text-xs">
                  <span className="text-foreground-500"><strong className="text-foreground-800">{engine.lastResult.estimatedAgents}</strong> agents</span>
                  <span className="text-foreground-500"><strong className="text-foreground-800">{engine.lastResult.estimatedDurationMin} min</strong> estimées</span>
                  <span className="text-foreground-500">Parallélisme <strong className="text-emerald-600">{engine.stats.parallelExecutionRate}%</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== BLUEPRINTS + ACTIVE DECOMPOSITIONS ===== */}
      <section className="py-6 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blueprints */}
          <div className="mb-10">
            <h3 className="font-heading text-xl font-bold text-foreground-950 mb-4">
              <i className="ri-git-branch-line text-emerald-500 mr-2" />
              {engine.blueprints.length} Blueprints de Décomposition
            </h3>
            <div className="space-y-4">
              {engine.blueprints.map(bp => (
                <div key={bp.id} className="rounded-xl border border-background-200 bg-white overflow-hidden">
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedBP(expandedBP === bp.id ? null : bp.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-sm font-bold text-foreground-950">{bp.missionType}</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                            bp.complexity === 'extreme' ? 'bg-red-100 text-red-700' :
                            bp.complexity === 'high' ? 'bg-amber-100 text-amber-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>{bp.complexity.toUpperCase()}</span>
                        </div>
                        <p className="text-xs text-foreground-500 mb-2">{bp.missionExample}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                          <span><i className="ri-stack-line mr-1" />{bp.phases.length} phases</span>
                          <span><i className="ri-timer-line mr-1" />{bp.estimatedDurationMin} min</span>
                          <span><i className="ri-check-double-line mr-1" />{bp.successRateHistorical}% succès</span>
                          <span><i className="ri-repeat-line mr-1" />{bp.totalDecompositions} missions</span>
                        </div>
                      </div>
                      {expandedBP === bp.id ? <i className="ri-arrow-up-s-line text-foreground-400 flex-shrink-0" /> : <i className="ri-arrow-down-s-line text-foreground-400 flex-shrink-0" />}
                    </div>
                  </div>

                  {expandedBP === bp.id && (
                    <div className="border-t border-background-100">
                      {bp.phases.map(phase => (
                        <div key={phase.order} className="p-5 border-b border-background-50 last:border-0">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
                              {phase.order}
                            </div>
                            <span className="text-sm font-semibold text-foreground-800">{phase.name}</span>
                            <span className="text-[10px] text-foreground-400">{phase.durationPct}%</span>
                            {phase.dependencies.length > 0 && (
                              <span className="text-[9px] text-foreground-400">← Phase {phase.dependencies.join(', ')}</span>
                            )}
                          </div>
                          <div className="grid gap-2">
                            {phase.subTasks.map(st => (
                              <div key={st.id} className={`flex items-start gap-3 p-3 rounded-lg ${
                                st.criticalPath ? 'bg-red-50 border border-red-100' : 'bg-background-50 border border-background-100'
                              }`}>
                                <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                                  st.criticalPath ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                  {st.criticalPath ? 'CP' : '||'}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs font-medium text-foreground-800">{st.title}</span>
                                  <div className="flex items-center gap-2 mt-0.5 text-[9px] text-foreground-400">
                                    <span className="px-1 py-0.5 rounded bg-primary-50 text-primary-600">{st.assignedAgentName}</span>
                                    <span>{st.estimatedDurationMin} min</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Decompositions */}
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground-950 mb-4">
              <i className="ri-play-circle-line text-emerald-500 mr-2" />
              Décompositions Actives
            </h3>
            <div className="space-y-3">
              {engine.activeDecompositions.map(ad => (
                <div
                  key={ad.id}
                  onClick={() => setSelectedDecomp(selectedDecomp === ad.id ? null : ad.id)}
                  className={`rounded-xl border bg-white p-5 cursor-pointer transition-all ${
                    ad.status === 'running' ? 'border-emerald-300 ring-1 ring-emerald-100' :
                    ad.status === 'queued' ? 'border-background-200' :
                    'border-background-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${
                          ad.status === 'running' ? 'bg-emerald-500 animate-pulse' :
                          ad.status === 'queued' ? 'bg-foreground-300' :
                          'bg-emerald-500'
                        }`} />
                        <span className="text-sm font-bold text-foreground-950">{ad.missionDescription.slice(0, 80)}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-foreground-400">
                        <span>Phase {ad.phasesCompleted}/{ad.totalPhases}</span>
                        <span>•</span>
                        <span>{ad.subTasksCompleted}/{ad.totalSubTasks} sous-tâches</span>
                        <span>•</span>
                        <span>{ad.agentsActive.length} agents actifs</span>
                        {ad.currentBottleneck && <span className="text-red-500">• Goulot: {ad.currentBottleneck}</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-2xl font-bold font-heading ${ad.status === 'running' ? 'text-emerald-600' : 'text-foreground-300'}`}>{ad.progress}%</span>
                      <div className="w-20 h-1.5 rounded-full bg-background-100 mt-1 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${ad.progress}%` }} />
                      </div>
                    </div>
                  </div>

                  {selectedDecomp === ad.id && ad.agentsActive.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-background-100">
                      <span className="text-[10px] font-semibold text-foreground-500">Agents mobilisés :</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ad.agentsActive.map(a => (
                          <span key={a} className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {engine.activeDecompositions.length === 0 && (
                <div className="text-center py-10 text-foreground-400">
                  <i className="ri-inbox-line text-3xl block mb-2" />
                  <p className="text-sm">Aucune décomposition active. Lancez-en une ci-dessus.</p>
                </div>
              )}
            </div>
          </div>

          {/* Agent Dependency Graph Summary */}
          <div className="mt-10 rounded-2xl border border-background-200 bg-white p-6">
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">
              <i className="ri-share-line text-emerald-500 mr-2" />
              Graphe de Dépendances Inter-Agents
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {engine.agentDependencyGraph.nodes.map(node => (
                <span key={node.id} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-background-200 bg-background-50 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: node.weight >= 95 ? '#059669' : node.weight >= 90 ? '#F59E0B' : '#DC2626' }} />
                  <span className="font-semibold text-foreground-800">{node.name}</span>
                  <span className="text-foreground-400">{node.weight}%</span>
                </span>
              ))}
            </div>
            <div className="mt-3 text-[10px] text-foreground-400">
              {engine.agentDependencyGraph.edges.length} dépendances inter-agents détectées sur {engine.blueprints.length} blueprints
            </div>
          </div>
        </div>
      </section>
    </>
  );
}