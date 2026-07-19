import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSAutonomousAIMedia } from '@/hooks/useKOSAutonomousAIMedia';

export default function autonomousAIMediaPage() {
  const { aiVisibilitySupremacy, youtubeAutopilot, llmApiGateway } = useKOSAutonomousAIMedia();
  const [activeTab, setActiveTab] = useState('ai-visibility');

  const tabs = [
    { key: 'ai-visibility', label: 'AI Visibility', icon: 'ri-eye-line' },
    { key: 'youtube', label: 'YouTube Autopilot', icon: 'ri-youtube-line' },
    { key: 'llm-gateway', label: 'LLM Gateway', icon: 'ri-terminal-box-line' },
  ];

  if (!aiVisibilitySupremacy) return null;

  return (
    <hubLayout hubId={90}>
      <div className="min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">AUTONOMOUS AI & MEDIA COMMAND™</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 whitespace-nowrap">GEO {aiVisibilitySupremacy.geoScore}/100</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 font-heading">Autonomous AI & Media Command</h1>
            <p className="text-foreground-600 mt-2 max-w-2xl">Visibilité IA (GEO 96), YouTube Autopilot (9 workflows, 28 vidéos), LLM API Gateway (95% autonome). Moteur média 100% indépendant.</p>
          </div>

          <div className="flex flex-wrap gap-1 mb-6 bg-background-100 rounded-full p-1">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab.key ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'}`}>
                <i className={tab.icon} />{tab.label}
              </button>
            ))}
          </div>

          {/* AI Visibility Tab */}
          {activeTab === 'ai-visibility' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Score GEO', value: `${aiVisibilitySupremacy.geoScore}/100` },
                  { label: 'Score AEO', value: `${aiVisibilitySupremacy.aeoScore}/100` },
                  { label: 'Featured Snippets', value: aiVisibilitySupremacy.featuredSnippets },
                  { label: 'Rich Results', value: aiVisibilitySupremacy.richResults },
                  { label: 'Citations/mois', value: aiVisibilitySupremacy.monthlyCitations },
                  { label: 'Schema Coverage', value: `${aiVisibilitySupremacy.schemaOrgCoverage}%` },
                ].map((k) => (
                  <div key={k.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                    <div className="text-xs text-foreground-500 mb-1">{k.label}</div>
                    <div className="text-lg font-bold text-foreground-950">{k.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiVisibilitySupremacy.aiEngines.map((engine) => (
                  <div key={engine.name} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-foreground-950">{engine.name}</span>
                      <span className={`text-xs font-bold ${engine.visibility >= 80 ? 'text-emerald-600' : engine.visibility >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{engine.visibility}/100</span>
                    </div>
                    <div className="bg-background-200 rounded-full h-2 mb-3">
                      <div className={`h-2 rounded-full ${engine.visibility >= 80 ? 'bg-emerald-500' : engine.visibility >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${engine.visibility}%` }} />
                    </div>
                    <div className="text-xs text-foreground-500 space-y-1">
                      <div className="flex justify-between"><span>Citations/30j</span><span className="font-medium text-foreground-700">{engine.citations}</span></div>
                      <div className="flex justify-between"><span>Tendance</span><span className="text-emerald-600 font-medium">▲</span></div>
                      <div className="mt-2 text-foreground-600">{engine.strategy}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Autopilot Tab */}
          {activeTab === 'youtube' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Vidéos Publiées', value: youtubeAutopilot.videosPublished },
                  { label: 'Vues Totales', value: youtubeAutopilot.totalViews },
                  { label: 'Watch Hours', value: youtubeAutopilot.watchHours },
                  { label: 'Score Qualité', value: `${youtubeAutopilot.avgQualityScore}/10` },
                  { label: 'Agents', value: youtubeAutopilot.agents },
                  { label: 'Santé Infra', value: `${youtubeAutopilot.infrastructureHealth}%` },
                ].map((k) => (
                  <div key={k.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                    <div className="text-xs text-foreground-500 mb-1">{k.label}</div>
                    <div className="text-lg font-bold text-foreground-950">{k.value}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {youtubeAutopilot.workflows.map((wf) => (
                  <div key={wf.id} className="bg-background-50 border border-background-200/70 rounded-xl p-4 flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${wf.status === 'running' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground-950 text-sm">{wf.name}</div>
                      <div className="text-xs text-foreground-500">{wf.executions} exécutions · {wf.success}% succès</div>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 capitalize">{wf.status}</span>
                  </div>
                ))}
              </div>

              <div className="bg-background-100/70 border border-background-200/70 rounded-xl p-5 text-center">
                <div className="text-sm text-foreground-600">Pipeline YouTube : <strong className="text-foreground-950">{youtubeAutopilot.pipeline}</strong></div>
                <div className="text-xs text-foreground-500 mt-1">{youtubeAutopilot.cronJobs} cron jobs · {youtubeAutopilot.edgeFunctions} edge functions · Uptime {youtubeAutopilot.infrastructureHealth}%</div>
              </div>
            </div>
          )}

          {/* LLM Gateway Tab */}
          {activeTab === 'llm-gateway' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Requêtes/jour', value: llmApiGateway.totalRequestsDay },
                  { label: 'Automaton', value: `${Math.round(llmApiGateway.automatonRequests / llmApiGateway.totalRequestsDay * 100)}% autonome` },
                  { label: 'Latence Moy.', value: llmApiGateway.averageLatency },
                  { label: 'Uptime', value: llmApiGateway.uptime },
                  { label: 'Circuit Breaker', value: llmApiGateway.circuitBreakerActive ? 'OUVERT' : 'FERMÉ' },
                  { label: 'DLQ Size', value: llmApiGateway.dlqSize },
                ].map((k) => (
                  <div key={k.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                    <div className="text-xs text-foreground-500 mb-1">{k.label}</div>
                    <div className="text-lg font-bold text-foreground-950">{k.value}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-sm font-semibold text-foreground-950 mb-3">Modèles & Routage</div>
                <div className="space-y-3">
                  {llmApiGateway.models.map((m) => (
                    <div key={m.model} className={`bg-background-50 border rounded-xl p-4 ${m.status === 'primary' ? 'border-emerald-200/70' : 'border-amber-200/70'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold text-foreground-950 text-sm">{m.provider}</span>
                          <span className="text-xs text-foreground-500 ml-2">{m.model}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${m.status === 'primary' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{m.status}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-foreground-500">
                        <div>Type: <span className="text-foreground-700">{m.type}</span></div>
                        <div>Coût: <span className="text-emerald-600 font-medium">{m.costPer1k === 0 ? '0 FCFA' : `$${m.costPer1k}`}</span></div>
                        <div>Latence: <span className="text-foreground-700">{m.latency}</span></div>
                      </div>
                      <div className="text-xs text-foreground-500 mt-1">Couverture: {m.coverage}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-foreground-950 mb-3">Fallback Chains (5 opérations)</div>
                <div className="space-y-2">
                  {llmApiGateway.fallbackChains.map((fc) => (
                    <div key={fc.name} className="bg-background-50 border border-background-200/70 rounded-lg p-3 flex items-center gap-3 text-sm">
                      <span className="font-medium text-foreground-950 whitespace-nowrap w-36">{fc.name}</span>
                      <i className="ri-arrow-right-line text-foreground-400 text-xs" />
                      <span className="text-emerald-600 font-medium whitespace-nowrap">{fc.primary}</span>
                      <i className="ri-arrow-right-line text-foreground-400 text-xs" />
                      <span className="text-amber-600 whitespace-nowrap">{fc.fallback}</span>
                      <i className="ri-arrow-right-line text-foreground-400 text-xs" />
                      <span className="text-foreground-500 whitespace-nowrap">{fc.lastResort}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200/70 rounded-xl p-5 text-center">
                <div className="font-semibold text-emerald-800">Stratégie de Routage</div>
                <div className="text-sm text-emerald-700 mt-1">{llmApiGateway.routingStrategy}</div>
                <div className="text-sm text-emerald-700 mt-1">{llmApiGateway.costOptimization}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </hubLayout>
  );
}



