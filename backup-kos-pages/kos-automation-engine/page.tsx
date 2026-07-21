import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKAEData } from '@/hooks/useKAEData';

type TabId = 'overview' | 'rules' | 'triggers' | 'agents' | 'documents' | 'plugins' | 'configurations' | 'notifications';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { id: 'rules', label: 'Règles', icon: 'ri-scales-line' },
  { id: 'triggers', label: 'Triggers', icon: 'ri-flashlight-line' },
  { id: 'agents', label: 'Agents', icon: 'ri-robot-line' },
  { id: 'documents', label: 'Documents', icon: 'ri-file-text-line' },
  { id: 'plugins', label: 'Plugins', icon: 'ri-puzzle-line' },
  { id: 'configurations', label: 'Configurations', icon: 'ri-settings-3-line' },
  { id: 'notifications', label: 'Notifications', icon: 'ri-notification-3-line' },
];

const PRIORITY_COLORS: Record<string, string> = {
  critical: 'bg-red-100 text-red-800 border-red-300',
  high: 'bg-amber-100 text-amber-800 border-amber-300',
  medium: 'bg-secondary-100 text-secondary-800 border-secondary-300',
  low: 'bg-background-200/70 text-foreground-600 border-background-300/60',
};

const ACTION_ICONS: Record<string, string> = {
  block: 'ri-forbid-line text-red-500',
  alert: 'ri-alert-line text-amber-500',
  approve: 'ri-check-double-line text-green-500',
  notify: 'ri-notification-3-line text-blue-500',
  escalate: 'ri-arrow-up-circle-line text-orange-500',
  transform: 'ri-refresh-line text-purple-500',
  schedule: 'ri-time-line text-teal-500',
  log: 'ri-file-list-3-line text-gray-500',
};

const TRIGGER_ICONS: Record<string, string> = {
  schedule: 'ri-time-line text-primary-500',
  database_change: 'ri-database-2-line text-accent-500',
  document_received: 'ri-file-upload-line text-green-500',
  user_validation: 'ri-user-star-line text-amber-500',
  internal_event: 'ri-bubble-chart-line text-secondary-500',
  message_received: 'ri-message-2-line text-blue-500',
  manual: 'ri-user-line text-gray-500',
};

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-amber-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-400',
};

export default function automationEnginePage() {
  const { loading, rules, triggers, agents, documents, plugins, configurations, notifications, globalStats } = useKAEData();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [expandedTrigger, setExpandedTrigger] = useState<string | null>(null);
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [expandedPlugin, setExpandedPlugin] = useState<string | null>(null);
  const [expandedNotif, setExpandedNotif] = useState<string | null>(null);

  if (loading) {
    return (
      <hubLayout hubId={121} activeTab="Vue d'Ensemble">
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-foreground-600">Chargement du KOS Automation Engine...</span>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={121} activeTab="Vue d'Ensemble">
      {/* Hero */}
      <div className="bg-background-100 border-b border-background-200/70 px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded-full border border-green-300 animate-pulse">
              LIVE DB
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold bg-accent-100 text-accent-800 rounded-full border border-accent-300">
              v{globalStats.kae_version}
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full border border-primary-300">
              {globalStats.certification}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950">
            KOS Automation Engine
          </h1>
          <p className="text-sm text-foreground-600 mt-1 max-w-3xl">
            Plateforme d&apos;orchestration centrale KOS — Remplace n8n/Zapier/Make.
            {globalStats.architecture_components} composants modulaires, souverains, auditables et extensibles.
          </p>
          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-5">
            {[
              { label: 'Règles', value: globalStats.active_rules, sub: `${globalStats.total_rules} total` },
              { label: 'Triggers', value: globalStats.active_triggers, sub: `${globalStats.total_triggers} types` },
              { label: 'Agents', value: globalStats.active_agents, sub: `${globalStats.total_agents} registrés` },
              { label: 'Documents', value: globalStats.total_documents, sub: `${globalStats.total_document_generations} générés` },
              { label: 'Plugins', value: globalStats.active_plugins, sub: `${globalStats.total_plugins} installés` },
              { label: 'Configs', value: globalStats.total_configs, sub: 'clés actives' },
              { label: 'Notifications', value: globalStats.total_notifications, sub: 'règles actives' },
              { label: 'Uptime', value: `${globalStats.uptime_pct}%`, sub: 'KAE Core' },
            ].map((stat) => (
              <div key={stat.label} className="bg-background-50 rounded-lg p-3 text-center border border-background-200/70">
                <div className="text-xl font-bold text-foreground-950">{stat.value}</div>
                <div className="text-xs text-foreground-500">{stat.label}</div>
                <div className="text-2xs text-foreground-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="border-b border-background-200/70 bg-background-50 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-1 py-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-background-50'
                  : 'text-foreground-600 hover:bg-background-200/70'
              }`}
            >
              <i className={`${tab.icon} mr-1.5`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* ─── OVERVIEW ─── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Architecture Diagram */}
              <div className="bg-background-50 rounded-xl p-6 border border-background-200/70">
                <h3 className="text-lg font-heading font-semibold text-foreground-950 mb-4">Architecture 16 Composants</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    'Workflow Engine', 'Event Bus', 'Trigger Engine', 'Scheduler',
                    'Rule Engine', 'Agent Orchestrator', 'Document Engine', 'Notification Engine',
                    'API Gateway', 'Audit Engine', 'Monitoring Engine', 'Security Engine',
                    'Configuration Engine', 'Secret Manager', 'Plugin Framework', 'State Machine',
                  ].map((comp, i) => (
                    <div key={comp} className="flex items-center gap-2 py-2 px-3 bg-background-100 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-foreground-700 text-xs whitespace-nowrap">{i + 1}. {comp}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Health Dashboard */}
              <div className="bg-background-50 rounded-xl p-6 border border-background-200/70">
                <h3 className="text-lg font-heading font-semibold text-foreground-950 mb-4">Santé Système</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Rule Engine', health: 100, sub: `${globalStats.total_rule_evaluations.toLocaleString()} évaluations` },
                    { name: 'Trigger Engine', health: 100, sub: `${globalStats.total_trigger_fires} déclenchements` },
                    { name: 'Agent Registry', health: 100, sub: '14 agents actifs, 97.8% succès' },
                    { name: 'Plugin Framework', health: 75, sub: '6/8 actifs, 2 en attente credentials' },
                    { name: 'Document Engine', health: 100, sub: '8 templates, 410 générations' },
                    { name: 'Notification Engine', health: 100, sub: '8 règles, cooldown actif' },
                    { name: 'Configuration Engine', health: 100, sub: '12 clés actives, hot-reload' },
                    { name: 'API Gateway', health: 100, sub: '342K req/j, p95 89ms' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.health === 100 ? 'bg-green-500' : item.health >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-foreground-800">{item.name}</span>
                      </div>
                      <span className="text-xs text-foreground-500">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Integration Architecture */}
            <div className="bg-background-50 rounded-xl p-6 border border-background-200/70">
              <h3 className="text-lg font-heading font-semibold text-foreground-950 mb-4">Intégration avec l&apos;Infrastructure Existante</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                {[
                  { name: 'kos-orchestrator-engine', role: 'State Machine + Recovery + Health', status: 'Intégré' },
                  { name: 'kos-automaton-engine', role: 'NLP 100% autonome, TF-IDF', status: 'Intégré' },
                  { name: 'kos-content-publication-gate', role: 'Firewall Anti-Fake Réglementaire', status: 'Intégré' },
                  { name: 'kos-regulatory-quality-assurance', role: 'QA 9 Principes, Score 100/100', status: 'Intégré' },
                  { name: 'kos-api-gateway (Nginx)', role: 'Routing 5 backends, JWT+RBAC', status: 'Intégré' },
                  { name: 'Qdrant (Docker)', role: 'Vector Intelligence 5 collections', status: 'Intégré' },
                ].map((i) => (
                  <div key={i.name} className="p-3 bg-background-100 rounded-lg">
                    <div className="font-mono text-foreground-800 mb-1 truncate">{i.name}</div>
                    <div className="text-foreground-500 mb-2">{i.role}</div>
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-2xs">{i.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── RULES ─── */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {['all', 'risk_threshold', 'regulatory_deadline', 'quality_control', 'governance', 'compliance', 'security', 'automation', 'business'].map(cat => (
                <span key={cat} className="px-3 py-1 rounded-full text-xs font-medium bg-background-200/70 text-foreground-600 capitalize cursor-pointer">
                  {cat === 'all' ? 'Toutes' : cat.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule.rule_id} className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-100/50 transition-colors"
                    onClick={() => setExpandedRule(expandedRule === rule.rule_id ? null : rule.rule_id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 text-2xs font-bold rounded border ${PRIORITY_COLORS[rule.priority]}`}>{rule.priority.toUpperCase()}</span>
                      <div>
                        <div className="text-sm font-semibold text-foreground-900">{rule.rule_name}</div>
                        <div className="text-xs text-foreground-500">{rule.rule_id} · {rule.rule_category.replace(/_/g, ' ')} · v{rule.version_number}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-foreground-500">Déclenché</div>
                        <div className="text-sm font-bold text-foreground-900">{rule.trigger_count}x</div>
                      </div>
                      <i className={`${ACTION_ICONS[rule.action_type]} text-lg`} />
                      <i className={expandedRule === rule.rule_id ? 'ri-arrow-up-s-line text-foreground-400' : 'ri-arrow-down-s-line text-foreground-400'} />
                    </div>
                  </div>
                  {expandedRule === rule.rule_id && (
                    <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                      <p className="text-sm text-foreground-600">{rule.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-background-100 p-3 rounded-lg">
                          <div className="text-foreground-500 mb-1">Condition</div>
                          <code className="text-foreground-800 text-xs">{JSON.stringify(rule.condition_json, null, 1)}</code>
                        </div>
                        <div className="bg-background-100 p-3 rounded-lg">
                          <div className="text-foreground-500 mb-1">Action</div>
                          <div className="text-foreground-800 font-medium">{rule.action_type}</div>
                          <code className="text-foreground-600 text-2xs">{JSON.stringify(rule.action_config, null, 1)}</code>
                        </div>
                        <div className="bg-background-100 p-3 rounded-lg">
                          <div className="text-foreground-500 mb-1">Tags</div>
                          <div className="flex flex-wrap gap-1">
                            {(rule.tags || []).map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 bg-background-200/70 rounded text-2xs text-foreground-600">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TRIGGERS ─── */}
        {activeTab === 'triggers' && (
          <div className="space-y-3">
            {triggers.map((trigger) => (
              <div key={trigger.trigger_id} className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-100/50 transition-colors"
                  onClick={() => setExpandedTrigger(expandedTrigger === trigger.trigger_id ? null : trigger.trigger_id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${trigger.is_active ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <i className={`${TRIGGER_ICONS[trigger.trigger_type] || 'ri-flashlight-line'} text-lg`} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground-900">{trigger.trigger_name}</div>
                      <div className="text-xs text-foreground-500">{trigger.trigger_id} · {trigger.trigger_type.replace(/_/g, ' ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-foreground-500">Déclenché</div>
                      <div className="text-sm font-bold text-foreground-900">{trigger.fire_count}x</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-2xs ${trigger.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {trigger.is_active ? 'Actif' : 'Inactif'}
                    </span>
                    <i className={expandedTrigger === trigger.trigger_id ? 'ri-arrow-up-s-line text-foreground-400' : 'ri-arrow-down-s-line text-foreground-400'} />
                  </div>
                </div>
                {expandedTrigger === trigger.trigger_id && (
                  <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                    <p className="text-sm text-foreground-600">{trigger.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-background-100 p-3 rounded-lg">
                        <div className="text-foreground-500 mb-1">Configuration</div>
                        <code className="text-foreground-800 text-xs">{JSON.stringify(trigger.config_json, null, 1)}</code>
                      </div>
                      <div className="bg-background-100 p-3 rounded-lg">
                        <div className="text-foreground-500 mb-1">Workflow Cible</div>
                        <div className="text-foreground-800 font-mono font-medium">{trigger.target_workflow_id || 'N/A (manuel)'}</div>
                        <div className="text-foreground-500 text-2xs mt-1">Règles liées: {(trigger.target_rule_ids || []).join(', ') || 'Aucune'}</div>
                      </div>
                      <div className="bg-background-100 p-3 rounded-lg">
                        <div className="text-foreground-500 mb-1">Tags</div>
                        <div className="flex flex-wrap gap-1">
                          {(trigger.tags || []).map(tag => (
                            <span key={tag} className="px-1.5 py-0.5 bg-background-200/70 rounded text-2xs text-foreground-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── AGENTS ─── */}
        {activeTab === 'agents' && (
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.agent_id} className="bg-background-50 rounded-xl border border-background-200/70 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                      <i className="ri-robot-line text-accent-600 text-lg" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground-900">{agent.agent_name}</div>
                      <div className="text-xs text-foreground-500">{agent.agent_id} · {agent.domain} · {agent.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-foreground-500">Exécutions</div>
                      <div className="text-sm font-bold text-foreground-900">{agent.execution_count.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-foreground-500">Succès</div>
                      <div className="text-sm font-bold text-green-600">{agent.success_rate}%</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-2xs bg-green-100 text-green-700">{agent.status}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {(agent.capabilities || []).map((cap: string) => (
                    <span key={cap} className="px-2 py-0.5 bg-background-200/70 rounded-full text-2xs text-foreground-600">{cap.replace(/_/g, ' ')}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── DOCUMENTS ─── */}
        {activeTab === 'documents' && (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.document_id} className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-100/50 transition-colors"
                  onClick={() => setExpandedDoc(expandedDoc === doc.document_id ? null : doc.document_id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <i className={`${doc.output_format === 'pdf' ? 'ri-file-pdf-line text-red-500' : 'ri-file-text-line text-blue-500'} text-lg`} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground-900">{doc.document_name}</div>
                      <div className="text-xs text-foreground-500">{doc.document_id} · {doc.document_type.replace(/_/g, ' ')} · {doc.output_format}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-foreground-500">Généré</div>
                      <div className="text-sm font-bold text-foreground-900">{doc.generation_count}x</div>
                    </div>
                    <i className={expandedDoc === doc.document_id ? 'ri-arrow-up-s-line text-foreground-400' : 'ri-arrow-down-s-line text-foreground-400'} />
                  </div>
                </div>
                {expandedDoc === doc.document_id && (
                  <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                    <p className="text-sm text-foreground-600">{doc.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-background-100 p-3 rounded-lg">
                        <div className="text-foreground-500 mb-1">Template & Sections</div>
                        <div className="text-foreground-800 font-mono mb-2">{doc.template_ref}</div>
                        <div className="flex flex-wrap gap-1">
                          {((doc.generation_config as any).sections || []).map((s: string) => (
                            <span key={s} className="px-1.5 py-0.5 bg-background-200/70 rounded text-2xs text-foreground-600">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-background-100 p-3 rounded-lg">
                        <div className="text-foreground-500 mb-1">Configuration</div>
                        <code className="text-foreground-600 text-2xs">{JSON.stringify(doc.generation_config, null, 1)}</code>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── PLUGINS ─── */}
        {activeTab === 'plugins' && (
          <div className="space-y-3">
            {plugins.map((plugin) => (
              <div key={plugin.plugin_id} className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-100/50 transition-colors"
                  onClick={() => setExpandedPlugin(expandedPlugin === plugin.plugin_id ? null : plugin.plugin_id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${plugin.is_active ? 'bg-accent-100' : 'bg-gray-100'}`}>
                      <i className={`ri-puzzle-line ${plugin.is_active ? 'text-accent-600' : 'text-gray-400'} text-lg`} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground-900">{plugin.plugin_name}</div>
                      <div className="text-xs text-foreground-500">{plugin.plugin_id} · v{plugin.version} · {plugin.plugin_type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-2xs ${plugin.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {plugin.is_active ? `Activé ${plugin.activation_count}x` : 'En attente credentials'}
                    </span>
                    <i className={expandedPlugin === plugin.plugin_id ? 'ri-arrow-up-s-line text-foreground-400' : 'ri-arrow-down-s-line text-foreground-400'} />
                  </div>
                </div>
                {expandedPlugin === plugin.plugin_id && (
                  <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                    <p className="text-sm text-foreground-600">{plugin.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-background-100 p-3 rounded-lg">
                        <div className="text-foreground-500 mb-1">Entry Point</div>
                        <code className="text-foreground-800 font-mono">{plugin.entry_point}</code>
                        <div className="text-foreground-500 mt-2 mb-1">Dépendances</div>
                        <div className="flex flex-wrap gap-1">
                          {(plugin.dependencies || []).map((d: string) => (
                            <span key={d} className="px-1.5 py-0.5 bg-background-200/70 rounded text-2xs text-foreground-600 font-mono">{d}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-background-100 p-3 rounded-lg">
                        <div className="text-foreground-500 mb-1">Config Schema</div>
                        <code className="text-foreground-600 text-2xs">{JSON.stringify(plugin.config_schema, null, 1)}</code>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── CONFIGURATIONS ─── */}
        {activeTab === 'configurations' && (
          <div className="space-y-3">
            {configurations.map((config) => (
              <div key={config.config_key} className="bg-background-50 rounded-xl border border-background-200/70 p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-mono font-semibold text-foreground-900">{config.config_key}</div>
                  <div className="text-xs text-foreground-500 mt-0.5">{config.description}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2 py-0.5 bg-background-200/70 rounded text-xs text-foreground-500">{config.config_category}</span>
                  <code className="bg-background-100 px-2 py-1 rounded text-sm font-mono text-foreground-800">{JSON.stringify(config.config_value.value)}</code>
                  <span className="text-xs text-foreground-400">v{config.version_number}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── NOTIFICATIONS ─── */}
        {activeTab === 'notifications' && (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.notification_id} className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-background-100/50 transition-colors"
                  onClick={() => setExpandedNotif(expandedNotif === notif.notification_id ? null : notif.notification_id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${SEVERITY_COLORS[notif.severity]}`} />
                    <div>
                      <div className="text-sm font-semibold text-foreground-900">{notif.notification_name}</div>
                      <div className="text-xs text-foreground-500">{notif.notification_id} · {notif.channel} · cooldown {notif.cooldown_minutes}min</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-2xs font-bold ${notif.severity === 'critical' ? 'bg-red-100 text-red-700' : notif.severity === 'high' ? 'bg-amber-100 text-amber-700' : notif.severity === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                      {notif.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-foreground-500">Envoyé {notif.send_count}x</span>
                    <i className={expandedNotif === notif.notification_id ? 'ri-arrow-up-s-line text-foreground-400' : 'ri-arrow-down-s-line text-foreground-400'} />
                  </div>
                </div>
                {expandedNotif === notif.notification_id && (
                  <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                    <div className="bg-background-100 p-3 rounded-lg">
                      <div className="text-xs text-foreground-500 mb-1">Template Message</div>
                      <p className="text-sm text-foreground-800 font-mono">{notif.message_template}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <div className="text-foreground-500">Hubs cibles:</div>
                      {(notif.target_hubs || []).map((h: string) => (
                        <span key={h} className="px-1.5 py-0.5 bg-accent-100 text-accent-700 rounded text-2xs">{h}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
        <div className="bg-background-50 rounded-xl p-6 border border-background-200/70 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 text-center">
          {[
            { label: 'Version KAE', value: `v${globalStats.kae_version}` },
            { label: 'Composants', value: globalStats.architecture_components },
            { label: 'Règles actives', value: globalStats.active_rules },
            { label: 'Triggers', value: globalStats.active_triggers },
            { label: 'Agents', value: globalStats.active_agents },
            { label: 'Documents générés', value: globalStats.total_document_generations },
            { label: 'Plugins actifs', value: `${globalStats.active_plugins}/${globalStats.total_plugins}` },
            { label: 'Uptime', value: `${globalStats.uptime_pct}%` },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-lg font-bold text-foreground-950">{stat.value}</div>
              <div className="text-xs text-foreground-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </hubLayout>
  );
}





