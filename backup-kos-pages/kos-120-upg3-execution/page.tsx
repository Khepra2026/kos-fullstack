import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOS120Upg3Execution } from '@/hooks/useKOS120Upg3Execution';

const TABS = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { id: 'agents', label: '150 Agents 2.0', icon: 'ri-robot-2-line' },
  { id: 'automations', label: 'Automations Anticipatives', icon: 'ri-flashlight-line' },
  { id: 'execution', label: 'Exécution UPG-3', icon: 'ri-play-circle-line' },
];

const STATUS_COLOR: Record<string, string> = {
  supra_optimal: 'bg-emerald-500 text-white',
  optimal: 'bg-primary-500 text-white',
  stable: 'bg-secondary-100 text-secondary-900',
  degraded: 'bg-amber-100 text-amber-900',
  critical: 'bg-red-500 text-white',
};

const STATUS_LABEL: Record<string, string> = {
  supra_optimal: 'Supra-Optimal',
  optimal: 'Optimal',
  stable: 'Stable',
  degraded: 'Dégradé',
  critical: 'Critique',
};

const AUTONOMY_COLOR: Record<string, string> = {
  L5: 'text-emerald-700 bg-emerald-100',
  L4: 'text-primary-700 bg-primary-100',
  L3: 'text-secondary-700 bg-secondary-100',
  L2: 'text-amber-700 bg-amber-100',
  L1: 'text-foreground-500 bg-background-100',
};

const CATEGORY_COLOR: Record<string, string> = {
  regulatory: 'bg-primary-100 text-primary-800',
  commercial: 'bg-accent-100 text-accent-800',
  quality: 'bg-secondary-100 text-secondary-800',
  security: 'bg-red-100 text-red-800',
  knowledge: 'bg-amber-100 text-amber-800',
  growth: 'bg-emerald-100 text-emerald-800',
};

const STATUS_EXEC: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-800',
  in_progress: 'bg-primary-100 text-primary-800',
  scheduled: 'bg-background-200 text-foreground-600',
};

export default function KOS120Upg3ExecutionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    overview, agents, allAgents, domainSummaries, domains, automations, allAutomations,
    executions, kpis, selectedDomain, setSelectedDomain, selectedGeneration, setSelectedGeneration,
    selectedAutomationCategory, setSelectedAutomationCategory,
  } = useKOS120Upg3Execution();

  const gen2Count = allAgents.filter(a => a.generation === '2.0').length;
  const avgAnticipation = Math.round(allAgents.reduce((s, a) => s + a.anticipationScore, 0) / allAgents.length);
  const activeAutomations = allAutomations.filter(a => a.status === 'active').length;

  return (
    <hubLayout hubId={86}>
      {/* Header */}
      <div className="bg-background-100 border-b border-background-200/70 px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500 text-white">
                <i className="ri-robot-2-line text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground-950 font-heading">
                  KOS UPG-3 — Agents 2.0 &amp; Automatisation Anticipative
                </h1>
                <p className="text-sm text-foreground-600">150 agents · Taux anticipation 85% · Cockpit d'exécution live · Phase 3/5 du plan 120%</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">UPG-3 EN COURS</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">120% PLAN</span>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {[
            { label: 'Agents 2.0 déployés', value: `${gen2Count}/150`, icon: 'ri-robot-2-line', color: 'text-primary-600' },
            { label: 'Taux Anticipation', value: `${avgAnticipation}%`, icon: 'ri-eye-line', color: 'text-emerald-600' },
            { label: 'Automations actives', value: activeAutomations, icon: 'ri-flashlight-line', color: 'text-accent-600' },
            { label: 'Agents Autonomie L4+', value: overview.autonomyL4Plus, icon: 'ri-shield-star-line', color: 'text-secondary-600' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-lg p-3 border border-background-200/70">
              <div className="flex items-center gap-2 mb-1">
                <i className={`${k.icon} text-base ${k.color}`}></i>
                <span className="text-xs text-foreground-500">{k.label}</span>
              </div>
              <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-background-200/70 px-6">
        <div className="flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'border-primary-500 text-primary-700' : 'border-transparent text-foreground-500 hover:text-foreground-700'}`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* ======== OVERVIEW ======== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Progress Banner */}
            <div className="bg-primary-500 text-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">BLOC 10 UPG-3 — Agents 2.0 &amp; Automatisation Anticipative</h2>
                  <p className="text-sm text-white/80 mt-1">{overview.nextMilestone}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{gen2Count}/150</div>
                  <div className="text-sm text-white/80">agents Gen 2.0</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-3 rounded-full transition-all"
                  style={{ width: `${(gen2Count / 150) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-white/70 mt-1">
                <span>0</span>
                <span>50 (UPG-3.1 ✅)</span>
                <span>100 (UPG-3.2 en cours)</span>
                <span>150</span>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-4 gap-4">
              {kpis.map(kpi => (
                <div key={kpi.label} className="bg-white rounded-xl border border-background-200/70 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className={`${kpi.icon} text-base text-primary-500`}></i>
                    <span className="text-xs text-foreground-500 truncate">{kpi.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground-950 mb-1">{kpi.value}{kpi.unit}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-400">→ {kpi.target}{kpi.unit}</span>
                    <span className="text-xs text-foreground-400">{kpi.delta}</span>
                  </div>
                  <div className="mt-2 bg-background-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${kpi.status === 'at' ? 'bg-emerald-500' : kpi.status === 'above' ? 'bg-primary-500' : 'bg-amber-400'}`}
                      style={{ width: kpi.status === 'at' ? '100%' : kpi.status === 'above' ? '100%' : `${Math.min(95, (Number(kpi.value) / Number(kpi.target)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Domain Summaries */}
            <div>
              <h3 className="text-base font-semibold text-foreground-900 mb-4">Performance par Domaine — 10 Domaines × 15 Agents</h3>
              <div className="grid grid-cols-2 gap-3">
                {domainSummaries.map(d => (
                  <div key={d.domain} className="bg-white rounded-lg border border-background-200/70 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm text-foreground-900 truncate">{d.domain}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">{d.gen2Agents}/15 Gen 2.0</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-foreground-500 mb-1">Anticipation</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-background-100 rounded-full h-2">
                            <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${d.avgAnticipation}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-primary-600">{d.avgAnticipation}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-foreground-500 mb-1">Exécution</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-background-100 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${d.avgExecution}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-600">{d.avgExecution}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade phases */}
            <div>
              <h3 className="text-base font-semibold text-foreground-900 mb-4">Phases d'Upgrade UPG-3</h3>
              <div className="space-y-3">
                {executions.map(e => (
                  <div key={e.id} className="bg-white rounded-lg border border-background-200/70 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-foreground-400">{e.upgradeRef}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_EXEC[e.status]}`}>{e.status === 'completed' ? '✅ Complétée' : e.status === 'in_progress' ? '⚙️ En cours' : '⏳ Planifiée'}</span>
                        </div>
                        <h4 className="font-semibold text-foreground-900">{e.phase}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">{e.completionPercent}%</div>
                        <div className="text-xs text-foreground-400">{e.agentsUpgraded}/{e.agentsTarget} agents</div>
                      </div>
                    </div>
                    <div className="bg-background-100 rounded-full h-2 mb-3">
                      <div className={`h-2 rounded-full ${e.status === 'completed' ? 'bg-emerald-500' : 'bg-primary-500'}`} style={{ width: `${e.completionPercent}%` }}></div>
                    </div>
                    <div className="flex gap-4 text-xs text-foreground-500">
                      <span><i className="ri-calendar-line mr-1"></i>{e.startDate} → {e.expectedEnd}</span>
                      {e.blockers.length > 0 && <span className="text-amber-600"><i className="ri-alert-line mr-1"></i>{e.blockers.length} bloqueur(s)</span>}
                    </div>
                    {e.gains.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {e.gains.map(g => (
                          <span key={g} className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">{g}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======== AGENTS 2.0 ======== */}
        {activeTab === 'agents' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {/* Domain filter */}
              <select
                value={selectedDomain}
                onChange={e => setSelectedDomain(e.target.value)}
                className="text-sm border border-background-200 rounded-lg px-3 py-2 bg-white text-foreground-700 cursor-pointer"
              >
                <option value="all">Tous les domaines</option>
                {domains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {/* Generation filter */}
              <div className="flex rounded-lg border border-background-200 overflow-hidden">
                {(['all', '1.0', '2.0'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGeneration(g)}
                    className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${selectedGeneration === g ? 'bg-primary-500 text-white' : 'bg-white text-foreground-600 hover:bg-background-100'}`}
                  >
                    {g === 'all' ? 'Tous' : `Gen ${g}`}
                  </button>
                ))}
              </div>
              <span className="text-sm text-foreground-500 self-center">{agents.length} agent(s)</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {agents.slice(0, 50).map(agent => (
                <div key={agent.id} className="bg-white rounded-lg border border-background-200/70 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 ${agent.generation === '2.0' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-500'}`}>
                        <i className="ri-robot-2-line"></i>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-foreground-400 font-mono">{agent.agentCode}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_COLOR[agent.status]}`}>{STATUS_LABEL[agent.status]}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${AUTONOMY_COLOR[agent.autonomyLevel]}`}>{agent.autonomyLevel}</span>
                          {agent.generation === '2.0' && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">Gen 2.0</span>}
                        </div>
                        <h4 className="font-semibold text-foreground-900 text-sm">{agent.name}</h4>
                        <p className="text-xs text-foreground-500">{agent.domain}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-primary-600">{agent.anticipationScore}</div>
                      <div className="text-xs text-foreground-400">anticipation</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="text-foreground-400 mb-1">Anticipation</div>
                      <div className="bg-background-100 rounded-full h-1.5">
                        <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${agent.anticipationScore}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground-400 mb-1">Exécution</div>
                      <div className="bg-background-100 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${agent.executionScore}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-foreground-500"><i className="ri-pulse-line mr-1 text-foreground-400"></i>{agent.anticipativeActionsThisWeek} actions/sem</span>
                    </div>
                  </div>
                </div>
              ))}
              {agents.length > 50 && (
                <div className="text-center py-4 text-sm text-foreground-400 bg-white rounded-lg border border-background-200/70">
                  +{agents.length - 50} agents supplémentaires — utilisez les filtres pour affiner
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======== AUTOMATIONS ANTICIPATIVES ======== */}
        {activeTab === 'automations' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex rounded-lg border border-background-200 overflow-hidden">
                {['all', 'regulatory', 'commercial', 'quality', 'security', 'knowledge', 'growth'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedAutomationCategory(cat)}
                    className={`px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedAutomationCategory === cat ? 'bg-primary-500 text-white' : 'bg-white text-foreground-600 hover:bg-background-100'}`}
                  >
                    {cat === 'all' ? 'Toutes' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
              <span className="text-sm text-foreground-500 self-center">{automations.length} automation(s)</span>
            </div>

            <div className="space-y-3">
              {automations.map(auto => (
                <div key={auto.id} className="bg-white rounded-xl border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${CATEGORY_COLOR[auto.category] || 'bg-background-100 text-foreground-700'}`}>{auto.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${auto.status === 'active' ? 'bg-emerald-100 text-emerald-800' : auto.status === 'testing' ? 'bg-amber-100 text-amber-800' : 'bg-background-200 text-foreground-500'}`}>{auto.status}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-medium">⚡ {auto.anticipationWindow}</span>
                      </div>
                      <h4 className="font-semibold text-foreground-900">{auto.automationName}</h4>
                      <p className="text-xs text-foreground-500 mt-0.5">{auto.domain}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-primary-600">{auto.successRate}%</div>
                      <div className="text-xs text-foreground-400">taux succès</div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-600 bg-background-50 rounded-lg p-3 mb-3 border-l-3 border-l-primary-300 border-l border-primary-200">
                    <i className="ri-flashlight-line mr-2 text-primary-500"></i>{auto.trigger}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-foreground-500">
                    <span><i className="ri-bar-chart-line mr-1"></i>{auto.actionsCount.toLocaleString()} déclenchements</span>
                    <span><i className="ri-calendar-check-line mr-1"></i>Dernier : {auto.lastTriggered}</span>
                    <span><i className="ri-star-line mr-1"></i>Impact : {auto.impactScore}/10</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {auto.agentsInvolved.map(a => (
                      <span key={a} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== EXECUTION ======== */}
        {activeTab === 'execution' && (
          <div className="space-y-6">
            {/* System State */}
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-6 font-mono text-xs">
              <pre className="text-foreground-700 leading-relaxed whitespace-pre-wrap">{`
████████████████████████████████████████████████████████████
█                                                          █
█   KOS UPG-3 — AGENTS 2.0 & AUTOMATISATION ANTICIPATIVE  █
█   BLOC 10 DU PLAN 120% — EXÉCUTION LIVE                  █
█                                                          █
█   Agents 2.0 déployés   : 150/150 (100%) ✅               █
█   Taux Anticipation Moy : 85% ✅ CIBLE ATTEINTE          █
█   Automations Actives   : 15/20                          █
█   Phase Complétée       : UPG-3.1 ✅                     █
█   Phase Complétée       : UPG-3.2 ✅                     █
█   Phase Complétée       : UPG-3.3 ✅ (100%)               █
█                                                          █
█   Certification Cible   : AAAA+ 150% TRANSCENDANT        █
█   Date                  : 25 Juin 2026                   █
█                                                          █
████████████████████████████████████████████████████████████
`.trim()}</pre>
            </div>

            {/* UPG-3 Execution Phases detail */}
            <div className="space-y-4">
              {executions.map(e => (
                <div key={e.id} className="bg-white rounded-xl border border-background-200/70 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono font-bold text-foreground-400">{e.upgradeRef}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_EXEC[e.status]}`}>
                          {e.status === 'completed' ? '✅ Complétée' : e.status === 'in_progress' ? '⚙️ En cours' : '⏳ Planifiée'}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground-900">{e.phase}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-600">{e.completionPercent}%</div>
                      <div className="text-sm text-foreground-400">{e.agentsUpgraded}/{e.agentsTarget} agents</div>
                    </div>
                  </div>
                  <div className="bg-background-100 rounded-full h-3 mb-4">
                    <div
                      className={`h-3 rounded-full transition-all ${e.status === 'completed' ? 'bg-emerald-500' : e.status === 'in_progress' ? 'bg-primary-500' : 'bg-background-300'}`}
                      style={{ width: `${e.completionPercent}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs font-semibold text-foreground-500 mb-2">GAINS ATTENDUS</div>
                      <div className="space-y-1">
                        {e.gains.map(g => (
                          <div key={g} className="flex items-center gap-2 text-xs text-emerald-700">
                            <i className="ri-check-line flex-shrink-0"></i>{g}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground-500 mb-2">DATES</div>
                      <div className="space-y-1 text-xs text-foreground-600">
                        <div><i className="ri-play-line mr-1"></i>Début : {e.startDate}</div>
                        <div><i className="ri-flag-line mr-1"></i>Fin prévue : {e.expectedEnd}</div>
                      </div>
                      {e.blockers.length > 0 && (
                        <div className="mt-3">
                          <div className="text-xs font-semibold text-amber-600 mb-1">BLOQUEURS</div>
                          {e.blockers.map(b => (
                            <div key={b} className="text-xs text-amber-700 flex items-start gap-1">
                              <i className="ri-alert-line flex-shrink-0 mt-0.5"></i>{b}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </hubLayout>
  );
}





