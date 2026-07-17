import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { KOSHubSwitcher } from '@/components/feature/KOSHubSwitcher';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { useKOSYoutubeInfrastructure } from '@/hooks/useKOSYoutubeInfrastructure';
import type { YoutubeWorkflow, YoutubeAgent, SecurityEvent, DbTableSchema, ContentPipelineItem } from '@/mocks/kosYoutubeAutonomousInfrastructure';

const CATEGORY_COLORS: Record<string, string> = {
  generation: '#86BC25',
  editing: '#C2410C',
  publication: '#FF0000',
  analytics: '#0A66C2',
  reporting: '#059669',
  maintenance: '#6B7280',
};

const STAGE_COLORS: Record<string, string> = {
  script: '#6B7280',
  voice_over: '#CA8A04',
  video_assembly: '#C2410C',
  thumbnail: '#D97757',
  review: '#0A66C2',
  published: '#059669',
  error: '#DC2626',
};

const LAYER_COLORS: Record<string, string> = {
  orchestration: '#86BC25',
  database: '#0A66C2',
  automation: '#C2410C',
  video_production: '#FF0000',
  ai_audio: '#CA8A04',
  storage: '#059669',
  security: '#DC2626',
};

const AGENT_STATUS_COLORS: Record<string, string> = {
  optimal: '#059669',
  stable: '#0A66C2',
  degraded: '#CA8A04',
  critical: '#DC2626',
  offline: '#6B7280',
};

export default function KOSYoutubeAutonomousInfrastructurePage() {
  const data = useKOSYoutubeInfrastructure();
  const [activeTab, setActiveTab] = useState<string>('orchestration');
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const tabs = [
    { id: 'orchestration', label: 'Orchestration', icon: 'ri-git-branch-line', count: `${data.globalStats.activeWorkflows}/${data.globalStats.totalWorkflows}` },
    { id: 'database', label: 'Base de Données', icon: 'ri-database-2-line', count: `${data.dbSchemas.length}` },
    { id: 'automation', label: 'Automatisation', icon: 'ri-settings-3-line', count: `${data.automationLayer.edgeFunctions.length}` },
    { id: 'video', label: 'Production Vidéo', icon: 'ri-movie-line', count: '3' },
    { id: 'audio', label: 'IA Audio', icon: 'ri-mic-line', count: `${data.aiAudioLayer.voiceProfiles.length}` },
    { id: 'storage', label: 'Stockage', icon: 'ri-hard-drive-2-line', count: `${data.storageLayer.buckets.length}` },
    { id: 'security', label: 'Sécurité', icon: 'ri-shield-check-line', count: `${data.securityLayer.components.length}` },
  ];

  return (
    <KOSHubLayout hubId={75}>
      <SeoHead
        title="KOS YouTube Autonomous Infrastructure™ — Architecture Complète Big Four | KHEPRA EXPERTS"
        description="Infrastructure YouTube 100% autonome KHEPRA EXPERTS. 7 couches (Orchestration, Base de Données, Automatisation, Production Vidéo, IA Audio, Stockage, Sécurité). 20 agents IA, 9 workflows, 5 cron jobs, 7 tables PostgreSQL. Standards ISO 27001, COBIT, ITIL."
        keywords="KOS YouTube Infrastructure, YouTube autonome, architecture Big Four, KHEPRA EXPERTS, production vidéo automatisée"
        canonicalPath="/kos-youtube-autonomous-infrastructure"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 backdrop-blur-sm">
              <i className="ri-server-line" />KOS YouTube Autonomous Infrastructure™
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              Infrastructure YouTube 100% Autonome — Niveau Big Four
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-2xl">
              7 couches · 20 agents IA · 9 workflows · 5 cron jobs · 7 tables PostgreSQL · Standards ISO 27001, COBIT, ITIL
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Orchestration', 'PostgreSQL', 'n8n → Edge Functions', 'Remotion + FFmpeg', 'Voice AI Studio', 'S3 Storage', 'RBAC + Chiffrement'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KPI Bar */}
      <section className="bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Workflows', value: `${data.globalStats.activeWorkflows}/${data.globalStats.totalWorkflows}`, icon: 'ri-git-branch-line', color: '#86BC25' },
              { label: 'Agents', value: `${data.globalStats.optimalAgents + data.globalStats.stableAgents}/${data.globalStats.totalAgents}`, icon: 'ri-robot-line', color: '#C2410C' },
              { label: 'Uptime Global', value: data.globalStats.uptimeGlobal, icon: 'ri-timer-line', color: '#059669' },
              { label: 'Score Qualité', value: `${data.globalStats.avgQualityScore}/10`, icon: 'ri-shield-check-line', color: '#CA8A04' },
              { label: 'Sécurité', value: `${data.globalStats.securityScore}%`, icon: 'ri-lock-line', color: '#DC2626' },
              { label: 'Pipeline', value: `${data.globalStats.totalPipelineItems}`, icon: 'ri-stack-line', color: '#0A66C2' },
              { label: 'Edge Functions', value: data.globalStats.edgeFunctionsActive, icon: 'ri-cloud-line', color: '#D97757' },
              { label: 'Cron Jobs', value: data.globalStats.cronJobsActive, icon: 'ri-time-line', color: '#6B7280' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
                <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <i className={`${s.icon} text-xs`} style={{ color: s.color }} />
                </div>
                <span className="block text-base font-bold text-foreground-950">{s.value}</span>
                <span className="text-[10px] text-foreground-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />{tab.label}
                {tab.count && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ORCHESTRATION ═══════════════ */}
      {activeTab === 'orchestration' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Couche 1 — Orchestration</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                L'Orchestrateur KOS central pilote tous les workflows, distribue les tâches, gère les files d&apos;attente, contrôle les états d&apos;exécution et relance automatiquement les processus échoués.
              </p>
            </div>

            {/* Architecture Diagram */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Diagramme de Flux — Workflows</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {['Génération Sujets', 'Rédaction', 'Voice Over', 'Montage Vidéo', 'Publication YT', 'Analytics', 'Reporting', 'Maintenance', 'SEO Optimisation'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full font-bold bg-foreground-950 text-white">{step}</span>
                    {i < 8 && <i className="ri-arrow-right-line text-foreground-400" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-foreground-500">
                <i className="ri-loop-left-line mr-1" />Boucle de feedback : Analytics → Optimisation SEO → Génération Sujets (amélioration continue)
              </div>
            </div>

            {/* Workflows */}
            <div className="space-y-3">
              {data.workflows.map((wf: YoutubeWorkflow) => {
                const isExpanded = expandedWorkflow === wf.workflowId;
                return (
                  <div key={wf.workflowId} className={`rounded-xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300 shadow-sm' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedWorkflow(isExpanded ? null : wf.workflowId)}
                      className="w-full p-4 text-left flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${CATEGORY_COLORS[wf.category]}15` }}>
                        <i className={`${wf.category === 'generation' ? 'ri-lightbulb-line' : wf.category === 'editing' ? 'ri-scissors-line' : wf.category === 'publication' ? 'ri-upload-cloud-line' : wf.category === 'analytics' ? 'ri-line-chart-line' : wf.category === 'reporting' ? 'ri-file-chart-line' : 'ri-tools-line'} text-lg`} style={{ color: CATEGORY_COLORS[wf.category] }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${CATEGORY_COLORS[wf.category]}15`, color: CATEGORY_COLORS[wf.category] }}>
                            {wf.category.toUpperCase()}
                          </span>
                          <h3 className="text-sm font-bold text-foreground-950">{wf.name}</h3>
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${wf.status === 'active' ? 'bg-emerald-500 animate-pulse' : wf.status === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
                        </div>
                        <p className="text-xs text-foreground-500 mb-2">{wf.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                          <span><i className="ri-check-line text-emerald-500 mr-1" />{wf.successRate}% succès</span>
                          <span><i className="ri-time-line mr-1" />{wf.avgDuration}</span>
                          <span>{wf.trigger}</span>
                        </div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg flex-shrink-0`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 animate-fade-in">
                        <div className="mb-3">
                          <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Étapes du Workflow</span>
                          <div className="mt-2 space-y-1.5">
                            {wf.steps.map((step, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: `${CATEGORY_COLORS[wf.category]}20`, color: CATEGORY_COLORS[wf.category] }}>
                                  {i + 1}
                                </div>
                                <span className="text-foreground-700">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div><span className="text-foreground-400">Edge Function</span><p className="font-bold text-foreground-700">{wf.edgeFunction}</p></div>
                          <div><span className="text-foreground-400">Fréquence</span><p className="font-bold text-foreground-700">{wf.frequency}</p></div>
                          <div><span className="text-foreground-400">Dernière exécution</span><p className="font-bold text-foreground-700">{new Date(wf.lastExecution).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p></div>
                          <div><span className="text-foreground-400">Auto-retry</span><p className={`font-bold ${wf.autoRetry ? 'text-emerald-600' : 'text-foreground-500'}`}>{wf.autoRetry ? 'Activé' : 'Désactivé'}</p></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ DATABASE ═══════════════ */}
      {activeTab === 'database' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Couche 2 — Base de Données PostgreSQL</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                PostgreSQL comme référentiel central. 7 tables avec indexation optimisée, sauvegardes automatiques, restauration automatique et historisation complète.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {data.dbSchemas.map((schema: DbTableSchema) => (
                <div key={schema.tableName} className="rounded-xl bg-background-50 border border-background-200/70 p-4 hover:border-foreground-200 cursor-pointer transition-colors" onClick={() => setExpandedTable(expandedTable === schema.tableName ? null : schema.tableName)}>
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-database-2-line text-foreground-400 text-sm" />
                    <h3 className="font-heading text-sm font-bold text-foreground-950 font-mono">{schema.tableName}</h3>
                  </div>
                  <p className="text-xs text-foreground-500 mb-2 line-clamp-2">{schema.description}</p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-foreground-400">{schema.columns.length} colonnes</span>
                    <span className="text-foreground-400">{schema.indexes.length} index</span>
                    <span className="font-bold text-foreground-700">{schema.rowCount} lignes</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded Table Detail */}
            {expandedTable && (() => {
              const schema = data.dbSchemas.find((s) => s.tableName === expandedTable);
              if (!schema) return null;
              return (
                <div className="rounded-2xl bg-background-50 border border-foreground-300 p-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-lg font-bold text-foreground-950 font-mono">{schema.tableName}</h3>
                    <button onClick={() => setExpandedTable(null)} className="w-7 h-7 rounded-full bg-background-100 flex items-center justify-center hover:bg-background-200 cursor-pointer">
                      <i className="ri-close-line text-foreground-500" />
                    </button>
                  </div>
                  <p className="text-sm text-foreground-600 mb-4">{schema.description}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-background-200">
                          <th className="text-left py-2 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Colonne</th>
                          <th className="text-left py-2 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Type</th>
                          <th className="text-left py-2 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schema.columns.map((col) => (
                          <tr key={col.name} className="border-b border-background-100">
                            <td className="py-2 px-3 font-mono font-bold text-foreground-800">{col.name}</td>
                            <td className="py-2 px-3 font-mono text-foreground-500">{col.type}</td>
                            <td className="py-2 px-3 text-foreground-600">{col.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-foreground-400">
                    <span>Index : {schema.indexes.join(', ')}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ═══════════════ AUTOMATION ═══════════════ */}
      {activeTab === 'automation' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Couche 3 — Automatisation (n8n → Edge Functions)</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Les workflows n8n sont implémentés via Supabase Edge Functions et Cron Jobs. Chaque Edge Function est un nœud du pipeline d&apos;automatisation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {data.automationLayer.edgeFunctions.map((ef) => (
                <div key={ef.name} className="rounded-xl bg-background-50 border border-background-200/70 p-4 hover:border-foreground-200 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-cloud-line text-emerald-600 text-sm" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-foreground-950 font-mono">{ef.name}</h3>
                      <span className="text-[10px] text-emerald-600 font-bold">Uptime {ef.uptime}</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-500 mb-2">{ef.role}</p>
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Triggers :</span>
                    {ef.triggers.map((t, i) => (
                      <div key={i} className="text-[10px] text-foreground-600 pl-2">• {t}</div>
                    ))}
                    {ef.cronJob && (
                      <div className="text-[10px] text-accent-700 font-bold mt-1">
                        <i className="ri-time-line mr-1" />Cron : {ef.cronJob}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Cron Jobs */}
            <div className="mb-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Cron Jobs Actifs</h3>
              <div className="space-y-2">
                {data.automationLayer.cronJobs.map((cj) => (
                  <div key={cj.name} className="flex items-center gap-3 p-3 rounded-xl bg-background-50 border border-background-200/70">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-time-line text-amber-600 text-sm" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground-950">{cj.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{cj.status}</span>
                      </div>
                      <span className="text-xs text-foreground-500">{cj.schedule} — {cj.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ VIDEO PRODUCTION ═══════════════ */}
      {activeTab === 'video' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Couche 4 — Production Vidéo</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Chromium Headless, FFmpeg et Remotion combinés pour une production vidéo 100% automatisée.
              </p>
            </div>

            {/* 3 Engines */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {data.videoProductionLayer.components.map((comp) => (
                <div key={comp.name} className="rounded-xl bg-background-50 border border-background-200/70 p-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: comp.status === 'optimal' ? '#D1FAE5' : '#FEF3C7' }}>
                    <i className={`${comp.icon} text-lg`} style={{ color: comp.status === 'optimal' ? '#059669' : '#CA8A04' }} />
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground-950 mb-1">{comp.name}</h3>
                  <p className="text-xs text-foreground-500 mb-3">{comp.description}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${comp.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {comp.status.toUpperCase()}
                  </span>
                  <div className="mt-3 space-y-1">
                    {comp.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-foreground-600">
                        <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0" />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Templates */}
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">6 Templates Vidéo</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {data.videoProductionLayer.templates.map((tpl) => (
                <div key={tpl.name} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center hover:border-foreground-200 transition-colors">
                  <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${tpl.brandColor}20` }}>
                    <i className="ri-movie-line text-lg" style={{ color: tpl.brandColor }} />
                  </div>
                  <h4 className="text-xs font-bold text-foreground-950 mb-1">{tpl.name}</h4>
                  <span className="text-[10px] text-foreground-400">{tpl.duration} · {tpl.sections} sections</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ AI AUDIO ═══════════════ */}
      {activeTab === 'audio' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Couche 5 — IA Audio (Voice AI Studio)</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Voice AI Studio KHEPRA EXPERTS — 6 profils vocaux calibrés, génération multilingue FR/EN, optimisation du débit vocal, normalisation audio.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Voix Générées', value: data.aiAudioLayer.stats.totalVoicesGenerated, color: '#86BC25' },
                { label: 'Minutes Audio', value: data.aiAudioLayer.stats.totalMinutes, color: '#C2410C' },
                { label: 'Temps Génération', value: data.aiAudioLayer.stats.avgGenerationTime, color: '#0A66C2' },
                { label: 'Score Qualité', value: `${data.aiAudioLayer.stats.qualityScore}/100`, color: '#059669' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <span className="block text-xl font-bold text-foreground-950">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Voice Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.aiAudioLayer.voiceProfiles.map((vp) => (
                <div key={vp.id} className="rounded-xl bg-background-50 border border-background-200/70 p-5 hover:border-foreground-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${vp.color}20` }}>
                      <i className={`${vp.gender === 'féminin' ? 'ri-user-voice-line' : 'ri-user-voice-line'} text-lg`} style={{ color: vp.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{vp.name}</h3>
                      <span className="text-[10px] text-foreground-400">{vp.gender === 'masculin' ? 'Masculin' : 'Féminin'} · {vp.accent}</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-500 mb-2">{vp.useCase}</p>
                  <div className="flex flex-wrap gap-1">
                    {vp.languages.map((l) => (
                      <span key={l} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{l}</span>
                    ))}
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${vp.color}20`, color: vp.color }}>{vp.tone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ STORAGE ═══════════════ */}
      {activeTab === 'storage' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Couche 6 — Stockage (Supabase Storage / S3)</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Stockage organisé en 7 buckets logiques avec versioning, réplication, sauvegardes automatiques et politiques de rétention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {data.storageLayer.buckets.map((bucket) => (
                <div key={bucket.path} className="rounded-xl bg-background-50 border border-background-200/70 p-4 hover:border-foreground-200 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-foreground-950 flex items-center justify-center">
                      <i className="ri-folder-line text-white text-sm" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 font-mono">{bucket.path}</h3>
                  </div>
                  <p className="text-xs text-foreground-500 mb-1">{bucket.description}</p>
                  <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                    <span>{bucket.format}</span>
                    <span>· Rétention : {bucket.retentionPolicy}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-background-50 border border-background-200/70 p-5">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-3">Fonctionnalités</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.storageLayer.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-foreground-600">
                    <i className="ri-check-line text-emerald-500 flex-shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ SECURITY ═══════════════ */}
      {activeTab === 'security' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Couche 7 — Sécurité</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Chiffrement AES-256-GCM, RBAC, journalisation complète, piste d&apos;audit, rotation automatique des clés. Standards ISO 27001, OWASP Top 10.
              </p>
            </div>

            {/* Audit Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {[
                { label: 'Événements', value: data.securityLayer.auditStats.totalEvents, color: '#0A66C2' },
                { label: 'Taux Succès', value: `${data.securityLayer.auditStats.successRate}%`, color: '#059669' },
                { label: 'Tentatives Bloquées', value: data.securityLayer.auditStats.blockedAttempts, color: '#DC2626' },
                { label: 'Rotations Token', value: data.securityLayer.auditStats.tokenRotations, color: '#CA8A04' },
                { label: 'Dernier Scan', value: new Date(data.securityLayer.auditStats.lastScan).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }), color: '#6B7280' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <span className="block text-xl font-bold text-foreground-950">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Security Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {data.securityLayer.components.map((comp) => (
                <div key={comp.name} className="rounded-xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${comp.status === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <h3 className="text-sm font-bold text-foreground-950">{comp.name}</h3>
                  </div>
                  <p className="text-xs text-foreground-500">{comp.description}</p>
                </div>
              ))}
            </div>

            {/* Security Events Log */}
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Piste d&apos;Audit — Derniers Événements</h3>
            <div className="space-y-2">
              {data.securityEvents.map((evt) => (
                <div key={evt.eventId} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-200/70">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    evt.status === 'success' ? 'bg-emerald-100' : evt.status === 'blocked' ? 'bg-red-100' : 'bg-amber-100'
                  }`}>
                    <i className={`${
                      evt.type === 'auth' ? 'ri-key-line' : evt.type === 'token_rotation' ? 'ri-refresh-line' : evt.type === 'scan' ? 'ri-search-line' : evt.type === 'anomaly' ? 'ri-alert-line' : evt.type === 'blocked' ? 'ri-shield-flash-line' : 'ri-file-list-line'
                    } text-sm ${evt.status === 'success' ? 'text-emerald-600' : evt.status === 'blocked' ? 'text-red-600' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-foreground-950">{evt.action}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${evt.status === 'success' ? 'bg-emerald-100 text-emerald-700' : evt.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {evt.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-500 truncate">{evt.details}</p>
                    <span className="text-[10px] text-foreground-400">
                      {new Date(evt.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} · {evt.agent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agents Overview — Always visible at bottom */}
      <section className="py-8 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground-950">20 Agents IA — Par Couche</h2>
            <span className="text-sm text-foreground-500">{data.globalStats.optimalAgents + data.globalStats.stableAgents}/{data.globalStats.totalAgents} actifs</span>
          </div>

          {['orchestration', 'database', 'automation', 'video_production', 'ai_audio', 'storage', 'security'].map((layer) => {
            const layerAgents = data.agents.filter((a: YoutubeAgent) => a.layer === layer);
            if (layerAgents.length === 0) return null;
            const isExpanded = expandedLayer === layer;
            return (
              <div key={layer} className="mb-3">
                <button
                  onClick={() => setExpandedLayer(isExpanded ? null : layer)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-background-50 border border-background-200/70 hover:border-foreground-200 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${LAYER_COLORS[layer]}15` }}>
                    <i className={`${layer === 'orchestration' ? 'ri-git-branch-line' : layer === 'database' ? 'ri-database-2-line' : layer === 'automation' ? 'ri-settings-3-line' : layer === 'video_production' ? 'ri-movie-line' : layer === 'ai_audio' ? 'ri-mic-line' : layer === 'storage' ? 'ri-hard-drive-2-line' : 'ri-shield-check-line'} text-sm`} style={{ color: LAYER_COLORS[layer] }} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-bold text-foreground-950 capitalize">{layer.replace('_', ' ')}</span>
                    <span className="text-xs text-foreground-500 ml-2">{layerAgents.length} agents</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {layerAgents.filter((a) => a.status === 'optimal').length > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{layerAgents.filter((a) => a.status === 'optimal').length} optimaux</span>
                    )}
                    {layerAgents.filter((a) => a.status === 'stable').length > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">{layerAgents.filter((a) => a.status === 'stable').length} stables</span>
                    )}
                  </div>
                  <i className={`ri-${isExpanded ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400`} />
                </button>

                {isExpanded && (
                  <div className="mt-2 space-y-2 animate-fade-in">
                    {layerAgents.map((agent) => {
                      const isAgentExpanded = expandedAgent === agent.agentId;
                      return (
                        <div key={agent.agentId} className={`rounded-lg border bg-background-50 ${isAgentExpanded ? 'border-foreground-300' : 'border-background-200/70'}`}>
                          <button
                            onClick={() => setExpandedAgent(isAgentExpanded ? null : agent.agentId)}
                            className="w-full p-3 flex items-center gap-3 text-left cursor-pointer"
                          >
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: AGENT_STATUS_COLORS[agent.status] }} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-foreground-950">{agent.name}</span>
                                <span className="text-[10px] text-foreground-400 font-mono">{agent.agentId}</span>
                              </div>
                              <p className="text-[11px] text-foreground-500 truncate">{agent.role}</p>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                              <span title="Tâches complétées">{agent.tasksCompleted.toLocaleString()}</span>
                              <span title="Latence moyenne">{agent.avgLatencyMs}ms</span>
                            </div>
                            <i className={`ri-${isAgentExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm`} />
                          </button>
                          {isAgentExpanded && (
                            <div className="px-4 pb-4 border-t border-background-200/70 pt-3 animate-fade-in">
                              <p className="text-xs text-foreground-600 mb-2">{agent.description}</p>
                              <div className="grid grid-cols-4 gap-2 text-[10px]">
                                <div><span className="text-foreground-400">Edge Function</span><p className="font-bold text-foreground-700">{agent.edgeFunction}</p></div>
                                <div><span className="text-foreground-400">Tâches OK</span><p className="font-bold text-emerald-600">{agent.tasksCompleted.toLocaleString()}</p></div>
                                <div><span className="text-foreground-400">Échecs</span><p className="font-bold text-red-600">{agent.tasksFailed.toLocaleString()}</p></div>
                                <div><span className="text-foreground-400">Latence</span><p className="font-bold text-foreground-700">{agent.avgLatencyMs}ms</p></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Architecture Layers Summary */}
      <section className="py-8 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-6">Architecture Technique — Vue d&apos;Ensemble</h2>
          <div className="space-y-2">
            {data.architectureDiagram.layers.map((l, i) => (
              <div key={l.name} className="rounded-xl bg-background-50 border border-background-200/70 p-3 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-foreground-950 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <span className="text-sm font-bold text-foreground-950">{l.name}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {l.components.map((c) => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">Écosystème KOS YouTube — Pipeline Complet</h2>
              <p className="text-gray-400 text-sm">
                YouTube Connect → Studio Média → Voice AI Studio → YouTube Publisher → Multichannel Command → YouTube Analytics. Infrastructure documentée, agents déployés, production autonome.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/youtube-connect" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                <i className="ri-youtube-fill" />YouTube Connect
              </Link>
              <Link to="/kos-youtube-analytics" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <i className="ri-line-chart-line" />YouTube Analytics
              </Link>
              <Link to="/kos-voice-ai-studio" className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#86BC25' }}>
                <i className="ri-mic-line" />Voice AI Studio
              </Link>
              <Link to="/studio-media" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-magic-line" />Studio Média
              </Link>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}