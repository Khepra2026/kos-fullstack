import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  AGENTIC_COMPETENCES,
  AUTONOMOUS_AGENTS,
  MCP_SKILLS,
  TRUST_LAYER_PROTOCOLS,
  INNOVATION_AGENTIQUE_ARTIFACTS,
  AGENTIC_ARCHITECT_STATS,
  INITIAL_AGENTIC_LOGS,
  type AgenticArchitectLog,
} from '@/mocks/kosChiefAgenticArchitect';

type TabId = 'competences' | 'mcp' | 'trust' | 'innovation' | 'logs';

const SKILL_LEVEL_MAP: Record<string, { label: string; bg: string; text: string; border: string }> = {
  expert: { label: 'Expert', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  advanced: { label: 'Avancé', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  foundational: { label: 'Fondamental', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

const POSTURE_MAP: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  observe_and_act: { label: 'Observe & Act', bg: 'bg-violet-50', text: 'text-violet-700', icon: 'ri-eye-line' },
  proactive_anticipation: { label: 'Proactive', bg: 'bg-amber-50', text: 'text-amber-700', icon: 'ri-flashlight-line' },
  scenario_simulation: { label: 'Simulation', bg: 'bg-cyan-50', text: 'text-cyan-700', icon: 'ri-loop-left-line' },
};

const ISOLATION_MAP: Record<string, { label: string; hex: string }> = {
  absolute: { label: 'ABSOLU', hex: '#DC2626' },
  strict: { label: 'STRICT', hex: '#EA580C' },
  standard: { label: 'STANDARD', hex: '#86BC25' },
};

const COMPETENCE_HEX: Record<string, string> = {
  '[AUDIT-ISO]': '#DC2626',
  '[REGULATION-BCEAO]': '#0D7B5F',
  '[FINANCE-MODEL]': '#6366F1',
  '[GOV-RISK]': '#EA580C',
  '[COMPLIANCE-LCBFT]': '#7C3AED',
  '[STRATEGY-AFRICA]': '#0D9488',
  '[KNOWLEDGE-RAG]': '#2563EB',
  '[CLOSING-ENTERPRISE]': '#DB2777',
};

export default function KOSChiefAgenticArchitectPage() {
  const [activeTab, setActiveTab] = useState<TabId>('competences');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [logs] = useState<AgenticArchitectLog[]>(INITIAL_AGENTIC_LOGS);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const tabs: { id: TabId; label: string; icon: string; badge: string }[] = [
    { id: 'competences', label: 'Transition ReCognitive', icon: 'ri-brain-line', badge: '8+4' },
    { id: 'mcp', label: 'Protocole MCP Skills', icon: 'ri-puzzle-2-line', badge: String(MCP_SKILLS.length) },
    { id: 'trust', label: 'Einstein Trust Layer', icon: 'ri-shield-check-line', badge: String(TRUST_LAYER_PROTOCOLS.length) },
    { id: 'innovation', label: 'Auto-Apprentissage', icon: 'ri-loop-left-line', badge: String(INNOVATION_AGENTIQUE_ARTIFACTS.length) },
    { id: 'logs', label: 'Logs Live', icon: 'ri-terminal-box-line', badge: String(logs.length) },
  ];

  const filteredLogs = useMemo(() => {
    if (activeTab === 'logs') return logs;
    return logs.filter(l => {
      if (activeTab === 'competences') return l.pillar === 'ReCognitive';
      if (activeTab === 'mcp') return l.pillar === 'MCP';
      if (activeTab === 'trust') return l.pillar === 'Einstein Trust';
      if (activeTab === 'innovation') return l.pillar === 'Auto-Apprentissage';
      return true;
    });
  }, [logs, activeTab]);

  return (
    <KOSHubLayout hubId={1000}>
      <SeoHead
        title="KOS Chief Agentic Architect Command Center™ — Architecte Systèmes Agentiques | KHEPRA"
        description="Centre de commandement de l'Architecte en Chef des Systèmes Agentiques KOS. Transition ReCognitive 2026, Protocole MCP Skills, Einstein Trust Layer, Auto-Apprentissage [INNOVATION-AGENTIQUE]."
        keywords="KOS Chief Agentic Architect, systèmes agentiques, MCP, Einstein Trust Layer, ReCognitive, KHEPRA EXPERTS, innovation agentique"
        canonicalPath="/kos-chief-agentic-architect"
        ogType="website"
      />

      {/* ============ HERO ============ */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20futuristic%20AI%20neural%20architecture%20with%20four%20vertical%20glowing%20pillars%20each%20representing%20autonomous%20agentic%20systems%2C%20interconnected%20holographic%20data%20streams%20in%20teal%20and%20amber%2C%20transparent%20geometric%20crystalline%20nodes%20with%20pulsing%20energy%2C%20dark%20cosmic%20void%20background%20with%20sacred%20geometry%20patterns%2C%20volumetric%20lighting%2C%20cinematic%208K%20render%2C%20no%20text%20no%20human%20figures%2C%20high%20tech%20sanctuary%20aesthetic&width=1920&height=700&seq=kos-agentic-architect-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/75 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-sm font-semibold text-violet-300 uppercase tracking-wider">
                CHIEF AGENTIC SYSTEMS ARCHITECT &amp; DIRECTOR OF AI
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Chief Agentic Architect
              <span className="block text-violet-400 mt-2">Command Center™</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Mise à niveau cognitive intégrale de l'infrastructure agentique KOS.{' '}
              <strong className="text-white">{AGENTIC_ARCHITECT_STATS.totalCompetences} compétences</strong> agentiques actives,{' '}
              <strong className="text-violet-300">{AGENTIC_ARCHITECT_STATS.totalSkills} skills MCP</strong> standardisées,{' '}
              <strong className="text-teal-300">{AGENTIC_ARCHITECT_STATS.totalTrustProtocols} protocoles</strong> Einstein Trust,{' '}
              <strong className="text-amber-300">{AGENTIC_ARCHITECT_STATS.totalInnovations} innovations</strong> agentiques réinjectées.{' '}
              <span className="block mt-2 text-violet-400 font-semibold">{AGENTIC_ARCHITECT_STATS.estimatedCognitiveUplift}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Compétences', value: `${AGENTIC_ARCHITECT_STATS.activeCompetences}/${AGENTIC_ARCHITECT_STATS.totalCompetences}`, icon: 'ri-brain-line', color: 'emerald' },
                { label: 'Agents Autonomes', value: `${AGENTIC_ARCHITECT_STATS.autonomousAgents}/${AGENTIC_ARCHITECT_STATS.totalAgents}`, icon: 'ri-robot-2-line', color: 'violet' },
                { label: 'Skills MCP', value: `${AGENTIC_ARCHITECT_STATS.mcpCompliantSkills}/${AGENTIC_ARCHITECT_STATS.totalSkills}`, icon: 'ri-puzzle-2-line', color: 'teal' },
                { label: 'Einstein Compliant', value: `${AGENTIC_ARCHITECT_STATS.einsteinCompliant}/${AGENTIC_ARCHITECT_STATS.totalTrustProtocols}`, icon: 'ri-shield-check-line', color: 'amber' },
                { label: 'Innovations', value: String(AGENTIC_ARCHITECT_STATS.totalInnovations), icon: 'ri-loop-left-line', color: 'rose' },
                { label: 'Itérations', value: String(AGENTIC_ARCHITECT_STATS.totalIterations), icon: 'ri-refresh-line', color: 'indigo' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/8 border border-white/10 backdrop-blur-sm">
                  <i className={`${stat.icon} text-${stat.color}-400 text-sm`} />
                  <span className="text-xs text-gray-400">{stat.label}</span>
                  <span className="text-sm font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TAB NAVIGATION ============ */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ============ TAB: TRANSITION RECOGNITIVE ============ */}
        {activeTab === 'competences' && (
          <div className="space-y-8">
            {/* Summary Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-violet-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <i className="ri-brain-line text-violet-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950">Architecture Cognitive — "Observe and Act"</h3>
                    <p className="text-xs text-foreground-500">Posture d'autonomie agentique 2026 : planification long horizon sans instruction humaine</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-foreground-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-violet-400 flex-shrink-0" />
                    <span><strong>Observe &amp; Act</strong> — Détermination autonome du plan d'action long horizon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong>Anticipation proactive</strong> — Évaluation des données manquantes, recherche alternatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong>Scénarios de rechange</strong> — Simulation basée sur benchmarks Big Four</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-foreground-950 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <i className="ri-robot-2-line text-violet-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold">Agents Autonomes — Performance</h3>
                    <p className="text-xs text-gray-400">{AGENTIC_ARCHITECT_STATS.autonomousAgents} agents en posture autonome</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Agents Actifs', value: `${AGENTIC_ARCHITECT_STATS.autonomousAgents}/${AGENTIC_ARCHITECT_STATS.totalAgents}`, icon: 'ri-robot-2-line', color: 'violet' },
                    { label: 'Décisions', value: '8.9K', icon: 'ri-git-merge-line', color: 'teal' },
                    { label: 'Obstacles Anticipés', value: '1.5K', icon: 'ri-alert-line', color: 'amber' },
                    { label: 'Taux Succès', value: '93%', icon: 'ri-check-double-line', color: 'emerald' },
                  ].map((s) => (
                    <div key={s.label} className="p-3 rounded-xl bg-white/8 border border-white/10 text-center">
                      <i className={`${s.icon} text-${s.color}-400 text-lg mb-1 block`} />
                      <span className="block text-lg font-bold font-heading">{s.value}</span>
                      <span className="text-[10px] text-gray-400">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Autonomous Agents */}
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-robot-2-line text-violet-600" />
                Agents Autonomes — Posture "Observe &amp; Act"
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AUTONOMOUS_AGENTS.map((agent) => {
                  const posture = POSTURE_MAP[agent.posture];
                  const isExpanded = expandedItems.has(agent.id);
                  return (
                    <div key={agent.id} className="rounded-2xl bg-white border border-background-200/70 overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                              <i className={`${agent.icon} text-violet-600 text-lg`} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-foreground-950">{agent.name}</h4>
                              <p className="text-xs text-foreground-500">{agent.role}</p>
                            </div>
                          </div>
                          <button onClick={() => toggleExpand(agent.id)} className="w-7 h-7 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors flex-shrink-0">
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm`} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${posture.bg} ${posture.text} border ${posture.bg.replace('50', '200')}`}>
                            <i className={`${posture.icon} mr-0.5`} />{posture.label}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ✓ {agent.successRate}%
                          </span>
                          <span className="text-[10px] text-foreground-400">Horizon: {agent.planningHorizon}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200 font-mono">
                            {agent.edgeFunctionSlug}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[10px]">
                          <div><span className="text-foreground-400 block">Décisions</span><span className="font-bold text-foreground-700">{agent.decisionsMade.toLocaleString('fr-FR')}</span></div>
                          <div><span className="text-foreground-400 block">Anticipés</span><span className="font-bold text-foreground-700">{agent.obstaclesAnticipated}</span></div>
                          <div><span className="text-foreground-400 block">Statut</span><span className={`font-bold ${agent.status === 'active' ? 'text-emerald-600' : agent.status === 'learning' ? 'text-amber-600' : 'text-gray-500'}`}>{agent.status === 'active' ? 'Actif' : agent.status === 'learning' ? 'Apprentissage' : 'Inactif'}</span></div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {agent.competencies.map((c) => (
                            <span key={c} className="text-[9px] px-1.5 py-0.5 rounded font-bold font-mono" style={{ backgroundColor: `${COMPETENCE_HEX[c] || '#6B7280'}15`, color: COMPETENCE_HEX[c] || '#6B7280' }}>{c}</span>
                          ))}
                        </div>
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-background-200 space-y-3">
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 block mb-1">Sources Alternatives (données manquantes)</span>
                              <div className="space-y-1">
                                {agent.alternativeSources.map((src, i) => (
                                  <div key={i} className="text-[10px] text-foreground-600 flex items-start gap-1.5">
                                    <i className="ri-arrow-right-s-line text-amber-500 mt-0.5" />
                                    <span>{src}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-foreground-500 block mb-1">Dernier Plan Long Horizon</span>
                              <span className="text-[10px] text-foreground-600 italic">{agent.lastLongHorizonPlan}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Competences */}
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-stack-line text-teal-600" />
                Compétences Agentiques — Architecture MCP Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AGENTIC_COMPETENCES.map((comp) => {
                  const level = SKILL_LEVEL_MAP[comp.skillLevel];
                  const isExpanded = expandedItems.has(comp.id);
                  return (
                    <div key={comp.id} className="rounded-2xl bg-white border border-background-200/70 overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${COMPETENCE_HEX[comp.name] || '#6B7280'}15` }}>
                              <i className={`${comp.icon} text-lg`} style={{ color: COMPETENCE_HEX[comp.name] || '#6B7280' }} />
                            </div>
                            <div>
                              <span className="text-xs font-mono font-bold block" style={{ color: COMPETENCE_HEX[comp.name] || '#6B7280' }}>{comp.name}</span>
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${level.bg} ${level.text} ${level.border} border`}>{level.label}</span>
                                <span className="text-[9px] text-foreground-400">
                                  {comp.activationMode === 'autonomous' ? 'Auto' : comp.activationMode === 'on_demand' ? 'Sur Demande' : 'Déclenché'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => toggleExpand(comp.id)} className="w-6 h-6 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors flex-shrink-0">
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm`} />
                          </button>
                        </div>
                        <p className="text-[11px] text-foreground-500 leading-relaxed mb-3">{comp.description}</p>
                        <div className="grid grid-cols-3 gap-2 text-[10px] mb-3">
                          <div><span className="text-foreground-400 block">Score</span><span className="font-bold text-emerald-600">{comp.performanceScore}%</span></div>
                          <div><span className="text-foreground-400 block">Invocations</span><span className="font-bold text-foreground-700">{comp.invocationCount.toLocaleString('fr-FR')}</span></div>
                          <div><span className="text-foreground-400 block">Dernière</span><span className="font-bold text-foreground-700">{new Date(comp.lastInvoked).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span></div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {comp.edgeFunctions.map(fn => (
                            <span key={fn} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200">{fn}</span>
                          ))}
                        </div>
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-background-200 space-y-2">
                            <span className="text-[10px] font-bold text-foreground-500 block">Data Lineage — Traçabilité IBM watsonx</span>
                            {comp.dataLineage.map((dl) => (
                              <div key={dl.id} className="p-2 rounded-lg bg-background-50 border border-background-100 text-[10px]">
                                <div className="flex items-center justify-between">
                                  <span className={`font-bold ${
                                    dl.type === 'regulatory_text' ? 'text-red-700' :
                                    dl.type === 'iso_standard' ? 'text-indigo-700' :
                                    dl.type === 'world_bank_data' ? 'text-teal-700' :
                                    dl.type === 'bigfour_methodology' ? 'text-amber-700' :
                                    'text-violet-700'
                                  }`}>{dl.source}</span>
                                  <span className="text-foreground-400">Trust: {dl.trustScore}%</span>
                                </div>
                                <span className="text-foreground-500 block mt-0.5">{dl.description}</span>
                                <span className="text-foreground-400">Vérifié: {new Date(dl.lastVerified).toLocaleDateString('fr-FR')}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: MCP SKILLS ============ */}
        {activeTab === 'mcp' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white border border-teal-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <i className="ri-puzzle-2-line text-teal-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950">Protocole Cognitif Unifié — Model Context Protocol</h3>
                  <p className="text-xs text-foreground-500">Chaque agent KOS se comporte comme appelant une skill standardisée. Interopérabilité virtuelle + Traçabilité IBM watsonx.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-teal-50 border border-teal-100">
                  <i className="ri-git-branch-line text-teal-600 text-lg mb-1 block" />
                  <strong className="text-teal-700 block mb-0.5">Architecture de Skills</strong>
                  <span className="text-teal-600">Compétences atomiques appelables comme services standardisés. Input/Output Schema défini.</span>
                </div>
                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                  <i className="ri-file-search-line text-indigo-600 text-lg mb-1 block" />
                  <strong className="text-indigo-700 block mb-0.5">Data Lineage Intégral</strong>
                  <span className="text-indigo-600">Chaque recommandation inclut sa "lignée de données" : sources primaires, revues, textes juridiques fondateurs.</span>
                </div>
                <div className="p-3 rounded-lg bg-violet-50 border border-violet-100">
                  <i className="ri-checkbox-circle-line text-violet-600 text-lg mb-1 block" />
                  <strong className="text-violet-700 block mb-0.5">Quality Gates IBM watsonx</strong>
                  <span className="text-violet-600">Auto-correction à chaque étape. Gates : PASS / RETRY / ESCALATE avec boucle de rétroaction.</span>
                </div>
              </div>
            </div>

            {MCP_SKILLS.map((skill) => {
              const isExpanded = expandedItems.has(skill.id);
              return (
                <div key={skill.id} className="rounded-2xl bg-white border border-background-200/70 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                          <i className={`${skill.icon} text-teal-600 text-xl`} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground-950">{skill.name}</h3>
                          <p className="text-sm text-foreground-500">{skill.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-bold">
                              v{skill.mcpVersion}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                              skill.ibmWatsonxCompliant ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {skill.ibmWatsonxCompliant ? '✓ Watsonx Compliant' : '⚠ En cours'}
                            </span>
                            <span className="text-[10px] text-foreground-400">{skill.invocationCount.toLocaleString('fr-FR')} invocations</span>
                            <span className="text-[10px] text-emerald-600 font-bold">✓ {skill.successRate}% succès</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => toggleExpand(skill.id)} className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors flex-shrink-0">
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-500`} />
                      </button>
                    </div>

                    {/* Data Lineage Chain */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      <span className="text-[10px] font-bold text-foreground-500 mr-1">Data Lineage:</span>
                      {skill.dataLineageChain.map((link, i) => (
                        <span key={i} className="inline-flex items-center gap-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">{link}</span>
                          {i < skill.dataLineageChain.length - 1 && <i className="ri-arrow-right-s-line text-indigo-400 text-xs" />}
                        </span>
                      ))}
                    </div>

                    {/* Orchestration */}
                    <div className="text-xs text-foreground-600 mb-4 p-3 rounded-xl bg-teal-50 border border-teal-100">
                      <span className="font-bold text-teal-700">Orchestration: </span>
                      {skill.agenticOrchestration}
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-background-200 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-[10px]">
                          <div className="p-3 rounded-xl bg-background-50 border border-background-200">
                            <span className="font-bold text-foreground-700 block mb-1">Inputs</span>
                            {skill.inputs.map((inp, i) => (
                              <span key={i} className="block text-foreground-500">→ {inp}</span>
                            ))}
                          </div>
                          <div className="p-3 rounded-xl bg-background-50 border border-background-200">
                            <span className="font-bold text-foreground-700 block mb-1">Outputs</span>
                            {skill.outputs.map((out, i) => (
                              <span key={i} className="block text-foreground-500">→ {out}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-foreground-950 mb-3">Quality Gates</h5>
                          <div className="space-y-2">
                            {skill.qualityGates.map((gate) => (
                              <div key={gate.id} className="flex items-center gap-3 p-3 rounded-lg bg-background-50 border border-background-200">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  gate.action === 'pass' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  gate.action === 'retry' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  'bg-red-50 text-red-700 border border-red-200'
                                }`}>{gate.action.toUpperCase()}</span>
                                <span className="text-xs text-foreground-700 flex-1">{gate.name}</span>
                                <span className="text-[10px] text-foreground-400">{gate.metric} {gate.threshold}</span>
                                <span className={`text-[10px] ${gate.autoCorrect ? 'text-violet-600' : 'text-gray-400'}`}>
                                  {gate.autoCorrect ? 'Auto-Fix ✓' : ''}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============ TAB: EINSTEIN TRUST LAYER ============ */}
        {activeTab === 'trust' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <i className="ri-shield-check-line text-amber-400 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold">Cadre de Sécurité et Confiance Extrême — Einstein Trust Layer</h3>
                  <p className="text-xs text-gray-400">Souveraineté numérique Khepra Experts. Isolement donnéees sensibles + Alignement régulateurs locaux.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                {[
                  { label: 'Protocoles', value: AGENTIC_ARCHITECT_STATS.totalTrustProtocols, icon: 'ri-shield-line', color: 'amber' },
                  { label: 'Einstein Compliant', value: AGENTIC_ARCHITECT_STATS.einsteinCompliant, icon: 'ri-check-double-line', color: 'emerald' },
                  { label: 'Violations Total', value: '3', icon: 'ri-alert-line', color: 'rose' },
                  { label: 'Pays Couverts', value: '12', icon: 'ri-earth-line', color: 'teal' },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-white/8 border border-white/10">
                    <i className={`${s.icon} text-${s.color}-400 text-lg mb-1 block`} />
                    <span className="block text-lg font-bold font-heading">{s.value}</span>
                    <span className="text-[10px] text-gray-400">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {TRUST_LAYER_PROTOCOLS.map((protocol) => {
              const isExpanded = expandedItems.has(protocol.id);
              const isolation = ISOLATION_MAP[protocol.isolationLevel];
              return (
                <div key={protocol.id} className="rounded-2xl bg-white border border-background-200/70 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                          <i className={`${protocol.domain === 'data_isolation' ? 'ri-lock-2-line' : protocol.domain === 'financial_sovereignty' ? 'ri-money-dollar-circle-line' : protocol.domain === 'regulatory_alignment' ? 'ri-scales-3-line' : protocol.domain === 'identity_verification' ? 'ri-fingerprint-2-line' : 'ri-file-search-line'} text-amber-600 text-xl`} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground-950">{protocol.name}</h3>
                          <p className="text-sm text-foreground-500">{protocol.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-50 border border-red-200" style={{ color: isolation.hex }}>
                              {isolation.label}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              protocol.einsteinLayerCompliant ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {protocol.einsteinLayerCompliant ? '✓ Einstein' : '⚠ Adaptation'}
                            </span>
                            <span className="text-[10px] text-foreground-400 capitalize">
                              Exécution: {protocol.enforcementMode === 'automatic' ? 'Auto' : protocol.enforcementMode === 'supervised' ? 'Supervisé' : 'Conseil'}
                            </span>
                            <span className="text-[10px] text-foreground-400">
                              Violations: {protocol.violationCount}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => toggleExpand(protocol.id)} className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors flex-shrink-0">
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-500`} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {protocol.localRegulations.map((reg, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">{reg}</span>
                      ))}
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-background-200 space-y-3">
                        <h4 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
                          <i className="ri-list-settings-line text-amber-600" />
                          Contrôles de Sécurité
                        </h4>
                        {protocol.controls.map((ctrl) => (
                          <div key={ctrl.id} className="flex items-center gap-3 p-3 rounded-lg bg-background-50 border border-background-200">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              ctrl.type === 'preventive' ? 'bg-red-50 text-red-700 border border-red-200' :
                              ctrl.type === 'detective' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>{ctrl.type.toUpperCase()}</span>
                            <span className="text-xs text-foreground-700 flex-1">{ctrl.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 font-mono">{ctrl.edgeFunctionSlug}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              ctrl.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              ctrl.status === 'testing' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-gray-50 text-gray-500 border border-gray-200'
                            }`}>{ctrl.status === 'active' ? 'Actif' : ctrl.status === 'testing' ? 'Test' : 'Planifié'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============ TAB: AUTO-APPRENTISSAGE [INNOVATION-AGENTIQUE] ============ */}
        {activeTab === 'innovation' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white border border-amber-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <i className="ri-loop-left-line text-amber-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950">Reinforcement Learning Lite — Auto-Apprentissage Continu</h3>
                  <p className="text-xs text-foreground-500">
                    Format [INNOVATION-AGENTIQUE] → Enjeu Terrain Africain → Ajustement Mémoire de Contexte.{' '}
                    <strong className="text-amber-600">{AGENTIC_ARCHITECT_STATS.totalInnovations} innovations</strong> réinjectées dans le prompt de contexte.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <i className="ri-search-eye-line text-amber-600 text-lg mb-1 block" />
                  <strong className="text-amber-700 block mb-0.5">1. Analyse de l'Écart</strong>
                  <span className="text-amber-600">Résultat produit vs Standards Excellence Big Four. Scoring quantifié.</span>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <i className="ri-lightbulb-line text-amber-600 text-lg mb-1 block" />
                  <strong className="text-amber-700 block mb-0.5">2. Synthèse Leçon Apprise</strong>
                  <span className="text-amber-600">Format [INNOVATION-AGENTIQUE] → Enjeu Afrique → Ajustement Contexte.</span>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <i className="ri-inbox-archive-line text-amber-600 text-lg mb-1 block" />
                  <strong className="text-amber-700 block mb-0.5">3. Injection Contexte</strong>
                  <span className="text-amber-600">Brique de connaissance injectée dans le prompt pour l'itération suivante.</span>
                </div>
              </div>
            </div>

            {INNOVATION_AGENTIQUE_ARTIFACTS.map((artifact) => {
              const isExpanded = expandedItems.has(artifact.id);
              return (
                <div key={artifact.id} className="rounded-2xl bg-white border border-background-200/70 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                          <i className="ri-lightbulb-flash-line text-amber-600 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground-950">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 mr-2">
                              [INNOVATION-AGENTIQUE]
                            </span>
                            {artifact.domain}
                          </h3>
                          <p className="text-sm text-foreground-500 mt-1">
                            <strong className="text-amber-700">Enjeu Afrique: </strong>{artifact.africanChallenge}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[10px] text-foreground-400">v{artifact.version}</span>
                            <span className="text-[10px] text-amber-600 font-bold">{artifact.iterations} itérations</span>
                            <span className="text-[10px] text-emerald-600 font-bold">+{artifact.improvementScore}% amélioration</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                              artifact.injectedInContext ? 'bg-violet-50 text-violet-700 border border-violet-200' : 'bg-gray-50 text-gray-500 border border-gray-200'
                            }`}>
                              {artifact.injectedInContext ? 'Injecté Contexte' : 'En attente'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => toggleExpand(artifact.id)} className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors flex-shrink-0">
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-500`} />
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-background-50 border border-background-200 text-xs mb-3">
                      <span className="font-bold text-foreground-600 block mb-1">Ajustement Mémoire de Contexte</span>
                      <span className="text-foreground-500 italic">{artifact.contextMemoryAdjustment}</span>
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-background-200 space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                            <span className="text-[10px] font-bold text-indigo-700 block mb-1">Standard Big Four Référence</span>
                            <span className="text-xs text-indigo-600">{artifact.bigFourStandardReference}</span>
                          </div>
                          <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
                            <span className="text-[10px] font-bold text-violet-700 block mb-1">Gap Analysis</span>
                            <span className="text-xs text-violet-600">{artifact.gapAnalysis}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-foreground-500 block mb-1">Réutilisable par</span>
                          <div className="flex flex-wrap gap-1.5">
                            {artifact.reusableBy.map((agent) => (
                              <span key={agent} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{agent}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============ LOGS LIVE ============ */}
        {(activeTab === 'logs' || filteredLogs.length > 0) && (
          <div className={activeTab === 'logs' ? '' : 'mt-6'}>
            <div className="rounded-2xl bg-foreground-950 border border-gray-800 overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs text-gray-400 font-mono">KOS Chief Agentic Architect — Execution Log</span>
                <span className="text-[10px] text-gray-500 ml-auto">{filteredLogs.length} entrées</span>
              </div>
              <div className="p-4 font-mono text-xs max-h-[400px] overflow-y-auto">
                <div className="space-y-1">
                  {filteredLogs.map((log, i) => (
                    <div key={i} className={`${
                      log.status === 'success' ? 'text-emerald-400' :
                      log.status === 'warning' ? 'text-amber-400' :
                      log.status === 'error' ? 'text-red-400' :
                      'text-cyan-400'
                    }`}>
                      <span className="text-gray-600">[{log.timestamp.slice(11, 19)}]</span>{' '}
                      <span className="text-violet-400">[{log.pillar}]</span>{' '}
                      <span className="text-teal-500">[{log.edgeFunction}]</span>{' '}
                      <span>{log.status === 'success' ? '✓' : log.status === 'warning' ? '⚠' : log.status === 'error' ? '✗' : 'ℹ'}</span>{' '}
                      <span>{log.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============ CROSS-LINKS ============ */}
      <section className="py-12 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème Agentique — Centres Interconnectés
            </h2>
            <p className="text-foreground-600">Accès direct aux centres de commandement liés à l'architecture agentique KOS.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'CDO Innovation Command', path: '/kos-cdo-innovation-command', icon: 'ri-cpu-line', color: '#0D9488' },
              { label: 'AI Sovereignty & Ethics', path: '/kos-ai-sovereignty-ethics', icon: 'ri-scales-3-line', color: '#6366F1' },
              { label: 'Multi-Agent Orchestration', path: '/kos-multi-agent-orchestration', icon: 'ri-git-branch-line', color: '#EA580C' },
              { label: 'Mass Infra Upgrade', path: '/kos-mass-infra-upgrade', icon: 'ri-rocket-2-line', color: '#DC2626' },
              { label: 'AI Governance Council', path: '/kos-ai-governance-ethics', icon: 'ri-shield-star-line', color: '#7C3AED' },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}