import { useState, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { useKOSSocialMediaBoard, BOARD_LANGUAGES, type SupportedLanguage, type BoardExecutionResult } from '@/hooks/useKOSSocialMediaBoard';
import { AUTO_INSTRUCT_PROMPTS, CONTENT_CALENDAR_WEEK, type socialAgent, type ExecutionJob } from '@/mocks/socialMediaBoard';

const PLATFORM_COLORS: Record<string, string> = {
  linkedin: '#0A66C2',
  x: '#1A1A1A',
  youtube: '#FF0000',
  facebook: '#1877F2',
  instagram: '#E4405F',
};

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-500',
  idle: 'bg-amber-500',
  error: 'bg-red-500',
  paused: 'bg-gray-400',
};

const JOB_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  queued: { bg: 'bg-background-100', text: 'text-foreground-600', label: 'En attente' },
  generating: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Génération...' },
  scheduled: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Programmé' },
  published: { bg: 'bg-primary-50', text: 'text-primary-700', label: 'Publié' },
  failed: { bg: 'bg-red-50', text: 'text-red-700', label: 'Échec' },
};

const JOB_TYPE_ICONS: Record<string, string> = {
  text: 'ri-file-text-line',
  video: 'ri-film-line',
  carousel: 'ri-slideshow-3-line',
  thread: 'ri-chat-thread-line',
  short: 'ri-smartphone-line',
};

const LOG_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  queued: { bg: 'bg-background-100', text: 'text-foreground-600', label: 'En file' },
  executing: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'En cours' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Succès' },
  partial: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Partiel' },
  failed: { bg: 'bg-red-50', text: 'text-red-700', label: 'Échec' },
};

function formatDateTime(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) +
    ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function socialMediaBoardPage() {
  const {
    agents, networks, jobs, stats, loading, refresh,
    executeInstruction, fetchExecutionLogs,
    executionLogs, logsLoading,
    selectedLanguages, setSelectedLanguages,
    isExecuting,
  } = useKOSSocialMediaBoard();

  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'planning' | 'execution' | 'video' | 'logs'>('overview');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [executingInstruct, setExecutingInstruct] = useState<string | null>(null);
  const [instructFeedback, setInstructFeedback] = useState<{ id: string; message: string } | null>(null);
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const handleInstruct = useCallback(async (instructId: string, label: string, agentIds: string[]) => {
    setExecutingInstruct(instructId);
    setInstructFeedback(null);

    try {
      const { logId, summary } = await executeInstruction(
        instructId,
        label,
        agentIds,
        selectedLanguages,
        { source: 'kos-social-media-board', instruct_id: instructId }
      );

      setExecutingInstruct(null);
      setInstructFeedback({
        id: instructId,
        message: `${label} : ${summary}`,
      });
      setTimeout(() => setInstructFeedback(null), 6000);
    } catch {
      setExecutingInstruct(null);
      setInstructFeedback({
        id: instructId,
        message: `${label} : Erreur lors du dispatch vers les Edge Functions.`,
      });
      setTimeout(() => setInstructFeedback(null), 6000);
    }
  }, [executeInstruction, selectedLanguages]);

  const toggleAgent = useCallback((id: string) => {
    setExpandedAgent(prev => prev === id ? null : id);
  }, []);

  const toggleLanguage = useCallback((lang: SupportedLanguage) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  }, [setSelectedLanguages]);

  const connectedNetworks = networks.filter(n => n.connected);
  const activeAgents = agents.filter(a => a.status === 'active');

  if (loading) {
    return (
      <hubLayout hubId={28}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-foreground-600 text-sm">Chargement du Board Social Media...</p>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={28}>
      <SeoHead
        title="KOS Social Media Board™ — Pilotage Agents & Automates Réseaux Sociaux | KHEPRA EXPERTS"
        description="Cockpit central de pilotage des agents et automates KOS pour la planification et l'exécution automatique des contenus textes et vidéos sur LinkedIn, X, YouTube. Instructions agents, file d'exécution, calendrier éditorial."
        keywords="KOS Social Media Board, pilotage réseaux sociaux, automatisation contenu, agents IA sociaux, KHEPRA EXPERTS"
        canonicalPath="/kos-social-media-board"
        ogType="website"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-dashboard-line"></i>KOS Social Media Board™
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                Board de Pilotage — Agents & Automates Sociaux
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Instruisez les agents KOS, planifiez le contenu texte et vidéo, et suivez l'exécution automatique sur tous vos réseaux configurés.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {activeAgents.length}/{agents.length} agents actifs
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                  {connectedNetworks.length} réseaux connectés
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-100 text-secondary-700 text-xs font-semibold">
                  {stats.posts_planned_7d} posts planifiés / 7j
                </span>
                <Link
                  to="/kos-social-media-command"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground-950 text-background-50 text-xs font-bold hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-share-line" />
                  Social Media Command
                </Link>
              </div>
            </div>
            {/* Stats mini cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Taux Succès', value: `${stats.execution_success_rate}%`, icon: 'ri-check-double-line', color: '#059669' },
                { label: 'Reach 7j', value: `${(stats.cross_network_reach / 1000).toFixed(1)}K`, icon: 'ri-eye-line', color: '#7C3AED' },
                { label: 'Vidéos', value: String(stats.video_content_queued), icon: 'ri-film-line', color: '#FF0000' },
                { label: 'Textes', value: String(stats.text_content_queued), icon: 'ri-file-text-line', color: '#2563EB' },
              ].map(card => (
                <div key={card.label} className="rounded-xl bg-white border border-background-200 p-3 text-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg mx-auto mb-1.5" style={{ backgroundColor: `${card.color}15` }}>
                    <i className={`${card.icon} text-sm`} style={{ color: card.color }} />
                  </div>
                  <span className="block text-lg font-bold font-heading text-foreground-950">{card.value}</span>
                  <span className="text-[10px] text-foreground-400">{card.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Language Selector + Refresh bar */}
      <section className="py-3 bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
              <i className="ri-translate-2 mr-1" />
              Langues :
            </span>
            {BOARD_LANGUAGES.map(lang => {
              const isSelected = selectedLanguages.includes(lang.code);
              return (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-accent-500 text-white'
                      : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  {lang.label}
                  {isSelected && <i className="ri-check-line text-xs" />}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            {isExecuting && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                <span className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                Dispatch en cours...
              </span>
            )}
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-50 border border-background-200 text-foreground-700 text-sm font-bold hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line" />
              Rafraîchir
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {[
              { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: 'LIVE' },
              { id: 'agents', label: 'Agents & Automates', icon: 'ri-robot-line', count: String(agents.length) },
              { id: 'planning', label: 'Planification', icon: 'ri-calendar-todo-line', count: 'S28' },
              { id: 'execution', label: 'Exécution', icon: 'ri-play-circle-line', count: String(jobs.length) },
              { id: 'video', label: 'Contenu Vidéo', icon: 'ri-movie-line', count: String(stats.video_content_queued) },
              { id: 'logs', label: 'Logs d\'Exécution', icon: 'ri-file-list-3-line', count: String(executionLogs.length) },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TAB: VUE D'ENSEMBLE ═══════════ */}
      {activeTab === 'overview' && (
        <>
          {/* Instructions rapides */}
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-foreground-950 flex items-center gap-2">
                  <i className="ri-flashlight-line text-accent-500" />
                  Instructions Rapides — Activer les Agents
                </h2>
                {selectedLanguages.length > 1 && (
                  <span className="text-xs text-foreground-400">
                    Contenu généré en {selectedLanguages.map(l => BOARD_LANGUAGES.find(bl => bl.code === l)?.label).join(', ')}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {AUTO_INSTRUCT_PROMPTS.map(instruct => {
                  const isExecuting = executingInstruct === instruct.id;
                  const feedback = instructFeedback?.id === instruct.id;
                  return (
                    <div key={instruct.id} className="rounded-xl bg-white border border-background-200 p-4 hover:border-accent-300 transition-all group">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                          <i className={`${instruct.icon} text-lg text-accent-700`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-foreground-950">{instruct.label}</h3>
                          <p className="text-xs text-foreground-500 mt-0.5 line-clamp-2">{instruct.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {instruct.agent_ids.slice(0, 3).map(aid => (
                          <span key={aid} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-background-100 text-foreground-500">
                            {aid.split('-').slice(1, 3).join(' ')}
                          </span>
                        ))}
                        {instruct.agent_ids.length > 3 && (
                          <span className="text-[9px] text-foreground-400">+{instruct.agent_ids.length - 3}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleInstruct(instruct.id, instruct.label, instruct.agent_ids)}
                        disabled={isExecuting || !!executingInstruct}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                          feedback
                            ? 'bg-emerald-500 text-white'
                            : isExecuting
                            ? 'bg-background-100 text-foreground-400'
                            : 'bg-accent-500 text-white hover:bg-accent-600'
                        }`}
                      >
                        {isExecuting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-foreground-400 border-t-transparent animate-spin" />
                            Dispatch Edge Functions...
                          </>
                        ) : feedback ? (
                          <>
                            <i className="ri-check-line" />
                            Instructions transmises !
                          </>
                        ) : (
                          <>
                            <i className="ri-send-plane-line" />
                            Exécuter
                          </>
                        )}
                      </button>
                      {feedback && (
                        <p className="text-[10px] text-emerald-600 mt-2 leading-tight">{feedback.message}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Réseaux Status */}
          <section className="py-8 bg-background-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-global-line text-primary-500" />
                Réseaux Configurés
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {networks.map(net => {
                  const color = PLATFORM_COLORS[net.id] || '#6B7280';
                  return (
                    <div key={net.id} className={`rounded-2xl bg-white border ${net.connected ? 'border-background-200' : 'border-background-200/50 opacity-60'} overflow-hidden`}>
                      <div className="p-4 border-b border-background-100" style={{ backgroundColor: `${color}08` }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                              <i className={`${net.icon} text-lg`} style={{ color }} />
                            </div>
                            <span className="font-bold text-sm text-foreground-950">{net.name}</span>
                          </div>
                          <span className={`w-2 h-2 rounded-full ${net.connected ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        {net.connected ? (
                          <>
                            <div className="flex justify-between text-xs">
                              <span className="text-foreground-400">Programmés</span>
                              <span className="font-bold text-foreground-950">{net.posts_scheduled}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-foreground-400">Publiés 7j</span>
                              <span className="font-bold text-foreground-950">{net.posts_published_7d}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-foreground-400">Engagement</span>
                              <span className="font-bold" style={{ color }}>{net.engagement_rate}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-foreground-400">Followers</span>
                              <span className="font-bold text-foreground-950">{net.followers.toLocaleString()}</span>
                            </div>
                            <div className="pt-2 border-t border-background-100">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                net.api_status === 'operational' ? 'bg-emerald-50 text-emerald-700' :
                                net.api_status === 'degraded' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                              }`}>
                                <span className={`w-1 h-1 rounded-full ${
                                  net.api_status === 'operational' ? 'bg-emerald-500' :
                                  net.api_status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'
                                }`} />
                                API {net.api_status === 'operational' ? 'Opérationnelle' : net.api_status === 'degraded' ? 'Dégradée' : 'Down'}
                              </span>
                            </div>
                          </>
                        ) : (
                          <p className="text-xs text-foreground-400 italic text-center py-2">Non connecté</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Jobs récents */}
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-timer-line text-secondary-500" />
                Dernières Exécutions
              </h2>
              <div className="space-y-2">
                {jobs.slice(0, 6).map(job => {
                  const statusStyle = JOB_STATUS_STYLES[job.status] || JOB_STATUS_STYLES.queued;
                  const color = PLATFORM_COLORS[job.platform] || '#6B7280';
                  return (
                    <div key={job.id} className="flex items-center gap-4 p-3 rounded-xl bg-white border border-background-200 hover:border-background-300 transition-all">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                        <i className={`${JOB_TYPE_ICONS[job.type]} text-sm`} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground-950 truncate">{job.title}</p>
                        <p className="text-xs text-foreground-400">{job.agent_name}</p>
                      </div>
                      {job.status === 'generating' ? (
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                            <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${job.progress}%` }} />
                          </div>
                          <span className="text-xs font-bold text-amber-700">{job.progress}%</span>
                        </div>
                      ) : (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text}`}>
                          {statusStyle.label}
                        </span>
                      )}
                      <span className="text-[10px] text-foreground-400 min-w-[90px] text-right">
                        {job.scheduled_for ? formatDateTime(job.scheduled_for) : '—'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold text-foreground-500 bg-background-100 uppercase">
                        {job.platform}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════ TAB: AGENTS & AUTOMATES ═══════════ */}
      {activeTab === 'agents' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground-950">Agents & Automates KOS — Réseaux Sociaux</h2>
                <p className="text-sm text-foreground-500 mt-1">Instruisez, activez, ou mettez en pause les agents de génération, planification et publication.</p>
              </div>
              <button
                onClick={refresh}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-100 text-foreground-700 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line" />
                Rafraîchir
              </button>
            </div>

            <div className="space-y-3">
              {agents.map(agent => {
                const isExpanded = expandedAgent === agent.id;
                const statusColor = STATUS_STYLES[agent.status] || 'bg-gray-400';
                return (
                  <div key={agent.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                    <div
                      className="p-4 flex items-center gap-4 cursor-pointer hover:bg-background-50/50 transition-colors"
                      onClick={() => toggleAgent(agent.id)}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${agent.color}15` }}>
                        <i className={`${agent.icon} text-xl`} style={{ color: agent.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm text-foreground-950">{agent.name}</h3>
                          <span className={`w-2 h-2 rounded-full ${statusColor}`} />
                          <span className="text-xs text-foreground-400 capitalize">{agent.status === 'active' ? 'Actif' : agent.status === 'idle' ? 'Inactif' : agent.status}</span>
                        </div>
                        <p className="text-xs text-foreground-500 mt-0.5 line-clamp-1">{agent.instructions}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-center">
                        <div>
                          <span className="block text-sm font-bold font-heading text-foreground-950">{agent.tasks_completed}</span>
                          <span className="text-[10px] text-foreground-400">Tâches</span>
                        </div>
                        <div>
                          <span className="block text-sm font-bold font-heading" style={{ color: agent.success_rate >= 90 ? '#059669' : agent.success_rate >= 80 ? '#D97706' : '#DC2626' }}>{agent.success_rate}%</span>
                          <span className="text-[10px] text-foreground-400">Succès</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {agent.platform.map(p => (
                          <span key={p} className="px-2 py-0.5 rounded-full text-[9px] font-bold text-foreground-600 bg-background-100 uppercase">{p}</span>
                        ))}
                      </div>
                      <i className={`ri-${isExpanded ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400`} />
                    </div>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-background-100">
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Instructions Permanentes</h4>
                            <p className="text-sm text-foreground-700 leading-relaxed">{agent.instructions}</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Types de Contenu</h4>
                            <div className="flex flex-wrap gap-1">
                              {agent.content_types.map(ct => (
                                <span key={ct} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-background-100 text-foreground-600">{ct}</span>
                              ))}
                            </div>
                            <div className="flex gap-4 mt-3">
                              <div>
                                <span className="block text-xs text-foreground-400">Dernière exécution</span>
                                <span className="text-xs font-bold text-foreground-950">{formatDateTime(agent.last_run)}</span>
                              </div>
                              <div>
                                <span className="block text-xs text-foreground-400">Prochaine exécution</span>
                                <span className="text-xs font-bold text-foreground-950">{formatDateTime(agent.next_run)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 justify-end">
                            <button
                              onClick={() => handleInstruct(`agent-${agent.id}`, `${agent.name} — Instruction Manuelle`, [agent.id])}
                              disabled={!!executingInstruct}
                              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-bold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-send-plane-line" />
                              Donner Instruction
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-background-100 text-foreground-700 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
                              <i className="ri-history-line" />
                              Voir Historique
                            </button>
                          </div>
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

      {/* ═══════════ TAB: LOGS D'EXÉCUTION ═══════════ */}
      {activeTab === 'logs' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground-950 flex items-center gap-2">
                  <i className="ri-file-list-3-line text-accent-500" />
                  Logs d'Exécution — Traçabilité Board
                </h2>
                <p className="text-sm text-foreground-500 mt-1">
                  Chaque instruction donnée via le Board est tracée dans Supabase. Historique complet, résultats par agent, timestamps.
                </p>
              </div>
              <button
                onClick={fetchExecutionLogs}
                disabled={logsLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-100 text-foreground-700 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className={`ri-refresh-line ${logsLoading ? 'animate-spin' : ''}`} />
                Rafraîchir
              </button>
            </div>

            {executionLogs.length === 0 ? (
              <div className="rounded-2xl bg-white border border-background-200 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mx-auto mb-4">
                  <i className="ri-inbox-line text-2xl text-foreground-300" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">Aucun log d'exécution</h3>
                <p className="text-sm text-foreground-500 mb-4">Les logs apparaîtront ici dès que vous exécuterez une instruction depuis le Board.</p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent-500 text-white text-sm font-bold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-flashlight-line" />
                  Lancer une instruction
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {executionLogs.map(log => {
                  const statusStyle = LOG_STATUS_STYLES[log.status] || LOG_STATUS_STYLES.queued;
                  const isExpanded = expandedLog === log.id;
                  return (
                    <div key={log.id} className="rounded-xl bg-white border border-background-200 overflow-hidden">
                      <div
                        className="p-4 flex items-start gap-4 cursor-pointer hover:bg-background-50/50 transition-colors"
                        onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          log.status === 'completed' ? 'bg-emerald-100' :
                          log.status === 'partial' ? 'bg-amber-100' :
                          log.status === 'failed' ? 'bg-red-100' :
                          log.status === 'executing' ? 'bg-amber-100' : 'bg-background-100'
                        }`}>
                          <i className={`${
                            log.status === 'completed' ? 'ri-check-double-line text-emerald-600' :
                            log.status === 'partial' ? 'ri-alert-line text-amber-600' :
                            log.status === 'failed' ? 'ri-close-circle-line text-red-600' :
                            log.status === 'executing' ? 'ri-loader-4-line text-amber-600 animate-spin' :
                            'ri-time-line text-foreground-400'
                          } text-lg`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-sm text-foreground-950">{log.instructionLabel}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text}`}>
                              {statusStyle.label}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-500">
                              <i className="ri-robot-line text-[10px]" />
                              {log.agentsSucceeded}/{log.totalAgentsCalled} agents
                            </span>
                          </div>
                          <p className="text-xs text-foreground-500">{log.resultSummary || 'En attente...'}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs text-foreground-400 block">
                            {formatDateTime(log.createdAt)}
                          </span>
                          {log.durationMs && (
                            <span className="text-[10px] text-foreground-400">
                              {(log.durationMs / 1000).toFixed(1)}s
                            </span>
                          )}
                        </div>
                        <i className={`ri-${isExpanded ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 flex-shrink-0`} />
                      </div>
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-background-100">
                          <div className="mt-3 space-y-3">
                            {/* Languages used */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground-400">Langues :</span>
                              {log.languages.map(l => {
                                const langInfo = BOARD_LANGUAGES.find(bl => bl.code === l);
                                return (
                                  <span key={l} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-600">
                                    {langInfo?.flag} {langInfo?.label || l}
                                  </span>
                                );
                              })}
                            </div>
                            {/* Agent results */}
                            <div>
                              <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Résultats par Agent</h4>
                              <div className="space-y-1.5">
                                {log.results.map((r, i) => (
                                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg ${
                                    r.status === 'success' ? 'bg-emerald-50' : 'bg-red-50'
                                  }`}>
                                    <i className={`${r.status === 'success' ? 'ri-check-line text-emerald-600' : 'ri-close-line text-red-600'} text-sm flex-shrink-0`} />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-bold text-foreground-950">{r.agentName}</span>
                                        <span className="text-[10px] text-foreground-400 bg-white/60 px-1.5 py-0.5 rounded">{r.edgeFunction}</span>
                                      </div>
                                      <p className="text-[11px] text-foreground-600 mt-0.5">{r.message}</p>
                                    </div>
                                    <span className="text-[10px] text-foreground-400 whitespace-nowrap">{r.durationMs}ms</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════ TAB: PLANIFICATION ═══════════ */}
      {activeTab === 'planning' && (
        <>
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground-950">Calendrier Éditorial — Semaine 28 (13-17 Juillet 2026)</h2>
                  <p className="text-sm text-foreground-500 mt-1">14 créneaux planifiés automatiquement par KOS Social Scheduler™</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-100 text-foreground-700 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-arrow-left-s-line" />S27
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground-950 text-white text-sm font-bold cursor-pointer whitespace-nowrap">S28</button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-100 text-foreground-700 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">S29<i className="ri-arrow-right-s-line" /></button>
                </div>
              </div>
              <div className="space-y-3">
                {CONTENT_CALENDAR_WEEK.map(day => (
                  <div key={day.day} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                    <div className="bg-foreground-950 px-5 py-3 text-white flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold">{day.day}</h3>
                      <span className="text-xs text-white/60">{day.slots.length} créneaux</span>
                    </div>
                    <div className="p-4 space-y-3">
                      {day.slots.map((slot, si) => {
                        const color = PLATFORM_COLORS[slot.platform] || '#6B7280';
                        const statusDot = slot.status === 'planifié' ? 'bg-emerald-500' : slot.status === 'en_generation' ? 'bg-amber-500 animate-pulse' : 'bg-violet-500';
                        return (
                          <div key={si} className="flex items-center gap-3 p-3 rounded-xl border border-background-200" style={{ backgroundColor: `${color}05` }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                              <i className={`${slot.platform === 'linkedin' ? 'ri-linkedin-fill' : slot.platform === 'x' ? 'ri-twitter-x-fill' : 'ri-youtube-fill'} text-lg`} style={{ color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-foreground-950">{slot.time}</span>
                                <span className="text-xs text-foreground-400">{slot.type}</span>
                              </div>
                              <p className="text-sm text-foreground-700 mt-0.5">{slot.title}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-foreground-400">{slot.agent.split('-').slice(1, 3).join(' ')}</span>
                              <span className={`w-2 h-2 rounded-full ${statusDot}`} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-8 bg-background-50 border-t border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-magic-line text-accent-500" />
                Planification Automatique
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AUTO_INSTRUCT_PROMPTS.filter(ai => ai.id === 'instruct-weekly-plan' || ai.id === 'instruct-full-auto').map(instruct => {
                  const isExecuting = executingInstruct === instruct.id;
                  const feedback = instructFeedback?.id === instruct.id;
                  return (
                    <div key={instruct.id} className="rounded-2xl bg-white border border-background-200 p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                          <i className={`${instruct.icon} text-xl text-accent-700`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground-950">{instruct.label}</h3>
                          <p className="text-sm text-foreground-500 mt-1">{instruct.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {instruct.agent_ids.map(aid => (
                          <span key={aid} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-background-100 text-foreground-500">{aid}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleInstruct(instruct.id, instruct.label, instruct.agent_ids)}
                        disabled={isExecuting || !!executingInstruct}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                          feedback ? 'bg-emerald-500 text-white' :
                          isExecuting ? 'bg-background-100 text-foreground-400' :
                          'bg-accent-500 text-white hover:bg-accent-600'
                        }`}
                      >
                        {isExecuting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-foreground-400 border-t-transparent animate-spin" />
                            Planification en cours...
                          </>
                        ) : feedback ? (
                          <>
                            <i className="ri-check-line" />Planification lancée !
                          </>
                        ) : (
                          <>
                            <i className="ri-send-plane-line" />Lancer la Planification
                          </>
                        )}
                      </button>
                      {feedback && (
                        <p className="text-[10px] text-emerald-600 mt-2 leading-tight">{feedback.message}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════ TAB: EXÉCUTION ═══════════ */}
      {activeTab === 'execution' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground-950">Pipeline d'Exécution</h2>
                <p className="text-sm text-foreground-500 mt-1">{jobs.filter(j => j.status === 'queued' || j.status === 'generating').length} en cours · {jobs.filter(j => j.status === 'published').length} publiés · {jobs.filter(j => j.status === 'failed').length} échoués</p>
              </div>
              <div className="flex gap-2">
                <button onClick={refresh} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-100 text-foreground-700 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-refresh-line" />Rafraîchir
                </button>
              </div>
            </div>
            <div className="flex gap-2 mb-6 flex-wrap">
              {['Tous', 'En cours', 'Programmés', 'Publiés', 'Échecs'].map(f => (
                <button key={f} className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${
                  f === 'Tous' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}>{f}</button>
              ))}
            </div>
            <div className="space-y-3">
              {jobs.map(job => {
                const statusStyle = JOB_STATUS_STYLES[job.status] || JOB_STATUS_STYLES.queued;
                const color = PLATFORM_COLORS[job.platform] || '#6B7280';
                return (
                  <div key={job.id} className="rounded-xl bg-white border border-background-200 overflow-hidden hover:border-background-300 transition-all">
                    <div className="p-4 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                        <i className={`${JOB_TYPE_ICONS[job.type]} text-lg`} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-sm text-foreground-950">{job.title}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text}`}>{statusStyle.label}</span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-foreground-500 bg-background-100 uppercase">{job.platform}</span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ backgroundColor: `${color}10`, color }}>{job.type}</span>
                        </div>
                        <p className="text-xs text-foreground-500 mb-2"><i className="ri-robot-line mr-1" />{job.agent_name}</p>
                        {job.status === 'generating' && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 h-2 rounded-full bg-background-200 overflow-hidden max-w-[300px]">
                              <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${job.progress}%` }} />
                            </div>
                            <span className="text-xs font-bold text-amber-700">{job.progress}%</span>
                          </div>
                        )}
                        {job.status === 'failed' && job.error_message && (
                          <div className="rounded-lg bg-red-50 border border-red-200 p-2.5 mb-2">
                            <p className="text-xs text-red-700 flex items-start gap-1.5">
                              <i className="ri-error-warning-line flex-shrink-0 mt-0.5" />{job.error_message}
                            </p>
                          </div>
                        )}
                        <p className="text-xs text-foreground-400 italic bg-background-50 rounded-lg p-2">{job.content_preview}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-foreground-400">
                          {job.scheduled_for ? <><i className="ri-calendar-line mr-1" />{formatDateTime(job.scheduled_for)}</> : '—'}
                        </div>
                        {job.published_at && (
                          <div className="text-xs text-emerald-600 mt-1"><i className="ri-check-line mr-1" />{formatDateTime(job.published_at)}</div>
                        )}
                      </div>
                    </div>
                    <div className="px-4 pb-3 flex gap-2 border-t border-background-100 pt-3">
                      {job.status === 'failed' && (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-restart-line" />Réessayer
                        </button>
                      )}
                      {job.status === 'queued' && (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-close-line" />Annuler
                        </button>
                      )}
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-background-100 text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-information-line" />Détails
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TAB: CONTENU VIDÉO ═══════════ */}
      {activeTab === 'video' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground-950">Pipeline Contenu Vidéo</h2>
                <p className="text-sm text-foreground-500 mt-1">{stats.video_content_queued} vidéos en file · YouTube @KHEPRAEXPERTS</p>
              </div>
              <Link to="/kos-youtube-autonomous-infrastructure" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF0000] text-white text-sm font-bold hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-youtube-fill" />YouTube Infra
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Vidéos en file', value: String(stats.video_content_queued), icon: 'ri-movie-line', color: '#FF0000' },
                { label: 'En génération', value: String(jobs.filter(j => j.type === 'video' && j.status === 'generating').length), icon: 'ri-loader-4-line', color: '#D97706' },
                { label: 'Programmées', value: String(jobs.filter(j => j.type === 'video' && j.status === 'scheduled').length), icon: 'ri-calendar-check-line', color: '#059669' },
                { label: 'Publiées 7j', value: '2', icon: 'ri-check-double-line', color: '#2563EB' },
              ].map(card => (
                <div key={card.label} className="rounded-xl bg-white border border-background-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                      <i className={`${card.icon} text-sm`} style={{ color: card.color }} />
                    </div>
                    <span className="text-xs text-foreground-400">{card.label}</span>
                  </div>
                  <span className="text-2xl font-bold font-heading text-foreground-950">{card.value}</span>
                </div>
              ))}
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-youtube-fill text-[#FF0000]" />Jobs Vidéo en Cours
            </h3>
            <div className="space-y-3">
              {jobs.filter(j => j.type === 'video' || j.type === 'short').map(job => {
                const statusStyle = JOB_STATUS_STYLES[job.status] || JOB_STATUS_STYLES.queued;
                return (
                  <div key={job.id} className="rounded-xl bg-white border border-background-200 overflow-hidden hover:border-[#FF0000]/20 transition-all">
                    <div className="p-4 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#FF0000]/10 flex items-center justify-center flex-shrink-0">
                        <i className={`${job.type === 'short' ? 'ri-smartphone-line' : 'ri-film-line'} text-lg text-[#FF0000]`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-sm text-foreground-950">{job.title}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text}`}>{statusStyle.label}</span>
                          {job.type === 'short' && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700">SHORT</span>}
                        </div>
                        <p className="text-xs text-foreground-500 mb-2">{job.agent_name}</p>
                        {job.status === 'generating' && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 h-2 rounded-full bg-background-200 overflow-hidden max-w-[300px]">
                              <div className="h-full rounded-full bg-[#FF0000] transition-all duration-500" style={{ width: `${job.progress}%` }} />
                            </div>
                            <span className="text-xs font-bold text-[#FF0000]">{job.progress}%</span>
                          </div>
                        )}
                        <p className="text-xs text-foreground-400 italic bg-background-50 rounded-lg p-2">{job.content_preview}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs text-foreground-400">{job.scheduled_for ? formatDateTime(job.scheduled_for) : '—'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 bg-gradient-to-r from-[#FF0000]/5 to-[#FF0000]/10 rounded-2xl border border-[#FF0000]/20 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-magic-line text-[#FF0000]" />Instructions Vidéo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AUTO_INSTRUCT_PROMPTS.filter(ai => ai.id === 'instruct-youtube-week' || ai.id === 'instruct-full-auto').map(instruct => {
                  const isExecuting = executingInstruct === instruct.id;
                  const feedback = instructFeedback?.id === instruct.id;
                  return (
                    <button
                      key={instruct.id}
                      onClick={() => handleInstruct(instruct.id, instruct.label, instruct.agent_ids)}
                      disabled={isExecuting || !!executingInstruct}
                      className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all cursor-pointer ${
                        feedback ? 'bg-emerald-500 text-white' :
                        isExecuting ? 'bg-background-100' :
                        'bg-white border border-background-200 hover:border-[#FF0000]/30'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FF0000]/10 flex items-center justify-center flex-shrink-0">
                        <i className={`${instruct.icon} text-lg text-[#FF0000]`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm ${feedback ? 'text-white' : 'text-foreground-950'}`}>{instruct.label}</p>
                        <p className={`text-xs mt-0.5 ${feedback ? 'text-white/80' : 'text-foreground-500'}`}>{instruct.description}</p>
                      </div>
                      {isExecuting && <span className="w-4 h-4 rounded-full border-2 border-foreground-400 border-t-transparent animate-spin flex-shrink-0" />}
                      {feedback && <i className="ri-check-line text-white flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-12 sm:py-16 bg-foreground-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/90 to-foreground-950/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 backdrop-blur-sm mb-4">
                <i className="ri-robot-line text-accent-400 text-sm" />
                <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">KOS Social Media Board — Mode Full Auto</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                Pilotez tous vos réseaux sociaux depuis un seul cockpit
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Instructions agents, planification automatique, exécution texte et vidéo, audit qualité Big Four. LinkedIn, X, YouTube — tous connectés, tous pilotés par KOS.
              </p>
              <div className="flex flex-wrap gap-2">
                {['10 agents', '3 réseaux', '31 posts/sem', 'Pipeline vidéo', 'Mode FULL AUTO'].map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs">
                    <i className="ri-check-line text-emerald-400" />{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/kos-social-media-command" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 text-white font-bold text-sm hover:bg-accent-400 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-share-line" />Social Media Command
              </Link>
              <Link to="/kos-multichannel-command" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white font-bold text-sm hover:bg-white/25 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-radar-line" />Multichannel Command
              </Link>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





