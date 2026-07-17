import { useState } from 'react';
import { useKOSAgents } from '@/hooks/useKOSAgents';

function AgentCard({ agent, onToggle }: { agent: ReturnType<typeof useKOSAgents>['agents'][0]; onToggle: (id: string, enabled: boolean) => void }) {
  const domain = (agent.metadata?.domain as string) || 'general';
  const iso = (agent.metadata?.iso as string[]) || [];
  const regulateur = (agent.metadata?.regulateur as string) || '';

  const domainColors: Record<string, string> = {
    regulatory: 'bg-primary-100 text-primary-700 border-primary-200',
    commercial: 'bg-accent-100 text-accent-700 border-accent-200',
    growth: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  };

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 hover:border-background-300/60 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${domainColors[domain] || 'bg-background-100 text-foreground-600 border border-background-200'}`}>
            <i className="ri-robot-2-line text-lg"></i>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground-950 font-heading">{agent.name}</h3>
            <p className="text-[10px] text-foreground-500 uppercase tracking-wider font-body">{domain}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${agent.auto_dev_enabled ? 'bg-emerald-500 animate-pulse' : 'bg-foreground-300'}`}></span>
          <button
            onClick={() => onToggle(agent.id, !agent.auto_dev_enabled)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${agent.auto_dev_enabled ? 'bg-primary-500' : 'bg-background-300'}`}
          >
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${agent.auto_dev_enabled ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500 font-body">Modèle</span>
          <span className="font-mono text-foreground-700 font-body">{agent.model}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500 font-body">Version</span>
          <span className="font-bold text-foreground-700 font-body">v{agent.version}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500 font-body">Accuracy</span>
          <span className={`font-bold font-body ${agent.accuracy >= 80 ? 'text-emerald-600' : agent.accuracy >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
            {agent.accuracy.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500 font-body">Dernier entraînement</span>
          <span className="text-foreground-700 font-body">
            {new Date(agent.last_trained).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {iso.map((code) => (
          <span key={code} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-background-100 text-foreground-600 border border-background-200/70 font-body">
            ISO {code}
          </span>
        ))}
        {regulateur && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-700 border border-primary-200 font-body">
            {regulateur}
          </span>
        )}
      </div>
    </div>
  );
}

function StatsBar({ stats }: { stats: NonNullable<ReturnType<typeof useKOSAgents>['stats']> }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-3 text-center">
        <div className="text-xl font-bold text-foreground-950 font-heading">{stats.totalAgents}</div>
        <div className="text-[10px] text-foreground-500 font-body">Agents Actifs</div>
      </div>
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-3 text-center">
        <div className="text-xl font-bold text-emerald-600 font-heading">{stats.autoDevEnabled}</div>
        <div className="text-[10px] text-foreground-500 font-body">Auto-Dev ON</div>
      </div>
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-3 text-center">
        <div className="text-xl font-bold text-foreground-950 font-heading">{stats.avgAccuracy.toFixed(1)}%</div>
        <div className="text-[10px] text-foreground-500 font-body">Accuracy Moyenne</div>
      </div>
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-3 text-center">
        <div className="text-xl font-bold text-foreground-950 font-heading">{stats.totalTrainingLogs}</div>
        <div className="text-[10px] text-foreground-500 font-body">Logs Training</div>
      </div>
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-3 text-center">
        <div className="text-xl font-bold text-red-600 font-heading">{stats.lowScoreLogs}</div>
        <div className="text-[10px] text-foreground-500 font-body">Scores &lt;80 (Retrain)</div>
      </div>
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-3 text-center">
        <div className="text-xl font-bold text-amber-600 font-heading">{stats.pendingRetrain}</div>
        <div className="text-[10px] text-foreground-500 font-body">Pending Retrain</div>
      </div>
    </div>
  );
}

function TrainingLogTable({ logs }: { logs: ReturnType<typeof useKOSAgents>['logs'] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (logs.length === 0) {
    return (
      <div className="text-center py-8 bg-background-50 rounded-lg border border-background-200/70">
        <i className="ri-database-2-line text-2xl text-foreground-400 mb-2"></i>
        <p className="text-sm text-foreground-500 font-body">Aucun log de training enregistré.</p>
      </div>
    );
  }

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-background-200/70 bg-background-100">
              <th className="text-left px-4 py-2.5 font-semibold text-foreground-600 font-body">Agent</th>
              <th className="text-left px-4 py-2.5 font-semibold text-foreground-600 font-body">Question (extrait)</th>
              <th className="text-center px-4 py-2.5 font-semibold text-foreground-600 font-body">Score</th>
              <th className="text-center px-4 py-2.5 font-semibold text-foreground-600 font-body">Retrain</th>
              <th className="text-right px-4 py-2.5 font-semibold text-foreground-600 font-body">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0, 10).map((log) => (
              <>
                <tr
                  key={log.id}
                  className="border-b border-background-200/50 hover:bg-background-100/50 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                >
                  <td className="px-4 py-2.5 font-mono text-foreground-700">{log.agent_id.slice(0, 8)}...</td>
                  <td className="px-4 py-2.5 text-foreground-700 max-w-[200px] truncate font-body">{log.question}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full font-bold ${
                      log.human_score === null ? 'bg-background-200 text-foreground-400' :
                      log.human_score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                      log.human_score >= 60 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {log.human_score ?? '—'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-block w-2 h-2 rounded-full ${log.used_for_retrain ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-foreground-500 font-body">
                    {new Date(log.created_at).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
                {expanded === log.id && (
                  <tr>
                    <td colSpan={5} className="px-4 py-3 bg-background-100">
                      <div className="text-xs text-foreground-600 font-body space-y-1">
                        <p><strong>Question complète :</strong> {log.question}</p>
                        <p><strong>Réponse :</strong> {log.answer.slice(0, 200)}{log.answer.length > 200 ? '...' : ''}</p>
                        <p><strong>Sources kb_docs :</strong> {log.sources.join(', ') || 'Aucune'}</p>
                        <p><strong>Embedding :</strong> {log.embedding ? `Vector[${log.embedding.length}]` : 'Non généré'}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      {logs.length > 10 && (
        <div className="px-4 py-2 border-t border-background-200/70 text-center">
          <span className="text-[10px] text-foreground-400 font-body">+ {logs.length - 10} logs supplémentaires</span>
        </div>
      )}
    </div>
  );
}

export default function KOSAgentsPanel() {
  const { agents, logs, stats, loading, error, refresh, toggleAutoDev } = useKOSAgents();

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
            <span className="text-sm text-foreground-500 font-body">Chargement des agents KOS REGTECH AI...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-error-warning-line text-red-500"></i>
            <span className="text-sm font-bold text-red-700 font-body">Erreur de chargement</span>
          </div>
          <p className="text-xs text-red-600 font-body">{error}</p>
          <button
            onClick={refresh}
            className="mt-2 px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors cursor-pointer font-body"
          >
            Réessayer
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
            <i className="ri-robot-2-line text-lg"></i>
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground-950 font-heading">KOS REGTECH AI Agents — Registry Big Four</h2>
            <p className="text-xs text-foreground-500 font-body">
              Agents auto-développants 100% local. Retrain nocturne 02h00. Score &lt;80 → flag automatique.
            </p>
          </div>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-background-200/70 bg-background-50 text-xs text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer font-body"
        >
          <i className="ri-refresh-line"></i>
          Actualiser
        </button>
      </div>

      {/* Cron Info Banner */}
      <div className="mb-6 p-3 rounded-lg bg-accent-50 border border-accent-200 flex items-center gap-3">
        <i className="ri-time-line text-accent-600"></i>
        <p className="text-xs text-accent-800 font-body">
          <strong>Cron nocturne actif :</strong> Retrain automatique quotidien à 02h00 via <code className="font-mono bg-accent-100 px-1 rounded">kos-embedder:8001/retrain</code>. pgvector + MiniLM local.
        </p>
      </div>

      {stats && <StatsBar stats={stats} />}

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onToggle={toggleAutoDev} />
        ))}
      </div>

      {/* Training Logs */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground-950 font-heading">Logs d&apos;apprentissage récents</h3>
        <span className="text-xs text-foreground-500 font-body">{logs.length} entrées</span>
      </div>
      <TrainingLogTable logs={logs} />
    </section>
  );
}