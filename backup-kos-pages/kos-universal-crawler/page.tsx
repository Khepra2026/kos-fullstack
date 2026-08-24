import { useState, useEffect, useCallback } from 'react';

interface CrawlerState {
  status: string;
  crawlId: string | null;
  startedAt: string | null;
  completedAt: string | null;
  totalSources: number;
  completedSources: number;
  failedSources: number;
  totalTextsFound: number;
  currentSource: string | null;
  currentUrl: string | null;
  proxyStatus: { total: number; active: number; failures: Record<string, number> };
  layerProgress: Record<string, { total: number; done: number; texts: number }>;
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  version: string;
}

const API_BASE = 'http://localhost:3400';

const LAYER_CONFIG = {
  L1_REGULATEUR: { label: 'L1 Régulateurs', icon: 'ri-government-line', color: 'bg-amber-100 text-amber-800', barColor: '#c19a6b' },
  L2_NORMALISATEUR: { label: 'L2 Normalisateurs', icon: 'ri-file-settings-line', color: 'bg-emerald-100 text-emerald-800', barColor: '#059669' },
  L3_ACADEMIQUE: { label: 'L3 Académique QS200', icon: 'ri-graduation-cap-line', color: 'bg-sky-100 text-sky-800', barColor: '#0284c7' },
  L4_REVUE_PRO: { label: 'L4 Revues Pro', icon: 'ri-book-open-line', color: 'bg-violet-100 text-violet-800', barColor: '#7c3aed' },
};

export default function universalCrawlerPage() {
  const [state, setState] = useState<CrawlerState | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [auditTrail, setAuditTrail] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'logs' | 'audit'>('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/crawler/state`);
      if (res.ok) setState(await res.json());
    } catch { /* API might not be running */ }
  }, []);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/crawler/logs`);
      if (res.ok) setLogs(await res.json());
    } catch { /* ignore */ }
  }, []);

  const fetchAuditTrail = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/crawler/audit-trail`);
      if (res.ok) setAuditTrail(await res.json());
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    fetchState();
    const interval = setInterval(() => {
      fetchState();
      if (activeTab === 'logs') fetchLogs();
      if (activeTab === 'audit') fetchAuditTrail();
    }, 3000);
    return () => clearInterval(interval);
  }, [fetchState, fetchLogs, fetchAuditTrail, activeTab]);

  useEffect(() => {
    fetchLogs();
    fetchAuditTrail();
  }, [activeTab, fetchLogs, fetchAuditTrail]);

  const handleAction = async (action: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/crawler/${action}`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');
      await fetchState();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleExportCsv = () => {
    window.open(`${API_BASE}/api/crawler/audit-trail/csv`, '_blank');
  };

  const totalDone = state ? state.completedSources + state.failedSources : 0;
  const progressPercent = state ? Math.round((totalDone / state.totalSources) * 100) : 0;
  const isRunning = state?.status === 'running';
  const isCompleted = state?.status === 'completed';
  const statusColor = isRunning ? 'text-emerald-600' : isCompleted ? 'text-sky-600' : state?.status === 'error' ? 'text-red-600' : 'text-gray-400';
  const statusLabel = state?.status === 'running' ? 'En cours' : state?.status === 'completed' ? 'Terminé' : state?.status === 'paused' ? 'En pause' : state?.status === 'error' ? 'Erreur' : 'Inactif';

  return (
    <div className="min-h-screen bg-background-50 font-sans">
      {/* Header */}
      <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-foreground-950 rounded-lg">
              <i className="ri-radar-line text-background-50 text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground-950">KOS Universal Crawler v5.2</h1>
              <p className="text-xs text-foreground-600">320 Sources — Big Four Compliant — ISAE 3402</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 text-sm font-semibold ${statusColor}`}>
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : isCompleted ? 'bg-sky-500' : 'bg-gray-300'}`}></span>
              {statusLabel}
            </span>
            {!isRunning && !isCompleted && (
              <button onClick={() => handleAction('start')} disabled={loading} className="px-4 py-2 bg-foreground-950 text-background-50 rounded-lg text-sm font-semibold hover:bg-foreground-800 whitespace-nowrap cursor-pointer transition-colors">
                <i className="ri-play-fill mr-1"></i> Lancer Crawl
              </button>
            )}
            {isRunning && (
              <button onClick={() => handleAction('pause')} disabled={loading} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-semibold hover:bg-amber-200 whitespace-nowrap cursor-pointer transition-colors">
                <i className="ri-pause-fill mr-1"></i> Pause
              </button>
            )}
            {(isRunning || state?.status === 'paused') && (
              <button onClick={() => handleAction('stop')} disabled={loading} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 whitespace-nowrap cursor-pointer transition-colors">
                <i className="ri-stop-fill mr-1"></i> Stop
              </button>
            )}
            {state?.status === 'paused' && (
              <button onClick={() => handleAction('resume')} disabled={loading} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-200 whitespace-nowrap cursor-pointer transition-colors">
                <i className="ri-play-fill mr-1"></i> Reprendre
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
            <span><i className="ri-error-warning-line mr-2"></i>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 cursor-pointer"><i className="ri-close-line"></i></button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 mt-6">
        <div className="flex gap-1 bg-background-100 rounded-lg p-1 w-fit">
          {(['overview', 'sources', 'logs', 'audit'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${activeTab === tab ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-950'}`}
            >
              {tab === 'overview' && <><i className="ri-dashboard-line mr-1.5"></i>Vue d'ensemble</>}
              {tab === 'sources' && <><i className="ri-stack-line mr-1.5"></i>Sources</>}
              {tab === 'logs' && <><i className="ri-terminal-box-line mr-1.5"></i>Logs</>}
              {tab === 'audit' && <><i className="ri-shield-check-line mr-1.5"></i>ISAE 3402</>}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                <div className="text-xs text-foreground-600 font-medium mb-1">Sources</div>
                <div className="text-2xl font-bold text-foreground-950">{state?.totalSources || 0}</div>
                <div className="text-xs text-foreground-500 mt-1">{totalDone} traités</div>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                <div className="text-xs text-foreground-600 font-medium mb-1">Textes détectés</div>
                <div className="text-2xl font-bold text-foreground-950">{state?.totalTextsFound || 0}</div>
                <div className="text-xs text-foreground-500 mt-1">cumulés</div>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                <div className="text-xs text-foreground-600 font-medium mb-1">Proxies</div>
                <div className="text-2xl font-bold text-foreground-950">{state?.proxyStatus?.active || 0}</div>
                <div className="text-xs text-foreground-500 mt-1">actifs</div>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                <div className="text-xs text-foreground-600 font-medium mb-1">Échecs</div>
                <div className="text-2xl font-bold text-red-600">{state?.failedSources || 0}</div>
                <div className="text-xs text-foreground-500 mt-1">sources</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-foreground-950">Progression globale</span>
                <span className="text-sm font-bold text-foreground-950">{progressPercent}%</span>
              </div>
              <div className="w-full bg-background-200/70 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #c19a6b, #059669, #0284c7, #7c3aed)' }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-foreground-500">
                <span>{state?.completedSources || 0} réussis</span>
                <span>{state?.failedSources || 0} échoués</span>
                <span>{(state?.totalSources || 0) - totalDone} restants</span>
              </div>
            </div>

            {/* Current Activity */}
            {isRunning && state?.currentSource && (
              <div className="bg-amber-50 border border-amber-200/70 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-loader-4-line text-amber-600 text-xl animate-spin"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-amber-900">Crawl en cours...</div>
                    <div className="text-xs text-amber-700 mt-0.5">
                      <strong>{state.currentSource}</strong> — {state.currentUrl}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layer Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(LAYER_CONFIG).map(([key, cfg]) => {
                const lp = state?.layerProgress?.[key];
                const pct = lp ? Math.round((lp.done / lp.total) * 100) : 0;
                return (
                  <div key={key} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${cfg.color}`}>
                        <i className={`${cfg.icon} text-sm`}></i>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground-950">{cfg.label}</div>
                        <div className="text-xs text-foreground-500">{lp?.done || 0}/{lp?.total || 0} — {lp?.texts || 0} textes</div>
                      </div>
                    </div>
                    <div className="w-full bg-background-200/70 rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: cfg.barColor }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Crawl Info */}
            {state?.crawlId && (
              <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                <div className="text-xs text-foreground-600 font-medium mb-2">Dernier crawl</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-foreground-500">ID :</span> <span className="text-foreground-950 font-mono text-xs">{state.crawlId}</span></div>
                  <div><span className="text-foreground-500">Début :</span> <span className="text-foreground-950">{state.startedAt ? new Date(state.startedAt).toLocaleString('fr-FR') : '-'}</span></div>
                  <div><span className="text-foreground-500">Fin :</span> <span className="text-foreground-950">{state.completedAt ? new Date(state.completedAt).toLocaleString('fr-FR') : '-'}</span></div>
                  <div>
                    <span className="text-foreground-500">Durée :</span>
                    <span className="text-foreground-950">
                      {state.startedAt && state.completedAt
                        ? `${Math.round((new Date(state.completedAt).getTime() - new Date(state.startedAt).getTime()) / 60000)} min`
                        : state.startedAt
                          ? `${Math.round((Date.now() - new Date(state.startedAt).getTime()) / 60000)} min (en cours)`
                          : '-'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Big Four Rules */}
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="text-sm font-semibold text-foreground-950 mb-3"><i className="ri-check-double-line mr-1.5"></i>Règles Big Four v5.2</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {[
                  { icon: 'ri-scales-3-line', label: 'Legal', desc: 'robots.txt + User-Agent + Rate 1req/5s' },
                  { icon: 'ri-fingerprint-line', label: 'Traçabilité', desc: 'SHA256 + timestamp chaque URL' },
                  { icon: 'ri-award-line', label: 'Qualité', desc: 'L4 = DOI Crossref peer-reviewed' },
                  { icon: 'ri-shield-check-line', label: 'ISAE 3402', desc: 'Logs immuables + export CSV' },
                  { icon: 'ri-restart-line', label: 'Résilience', desc: '3 retries + backoff expo + 10 proxies' },
                  { icon: 'ri-lock-line', label: 'RGPD', desc: '0 données perso — textes publics' },
                ].map((rule, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-background-100/70 rounded-lg">
                    <div className="w-6 h-6 flex items-center justify-center text-foreground-600 mt-0.5"><i className={rule.icon}></i></div>
                    <div>
                      <div className="font-semibold text-foreground-950">{rule.label}</div>
                      <div className="text-foreground-500 mt-0.5">{rule.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-3">
            {Object.entries(LAYER_CONFIG).map(([key, cfg]) => (
              <div key={key} className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
                <div className={`px-5 py-3 flex items-center gap-3 ${cfg.color} bg-opacity-50`}>
                  <i className={`${cfg.icon}`}></i>
                  <span className="font-semibold text-sm">{cfg.label}</span>
                  <span className="text-xs ml-auto">{state?.layerProgress?.[key]?.done || 0}/{state?.layerProgress?.[key]?.total || 0}</span>
                </div>
                <div className="p-1 max-h-[500px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-foreground-500 border-b border-background-200/70">
                        <th className="py-2 px-4 font-medium">ID</th>
                        <th className="py-2 px-4 font-medium">Nom</th>
                        <th className="py-2 px-4 font-medium">Catégorie</th>
                        <th className="py-2 px-4 font-medium">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const entries = key === 'L1_REGULATEUR' ? [] :
                          key === 'L2_NORMALISATEUR' ? [] :
                            key === 'L3_ACADEMIQUE' ? [] :
                              [];
                        const allAudit = auditTrail.filter((e: any) => e.layer === key);
                        const sourceNames = [...new Set(allAudit.map((e: any) => e.sourceName))];
                        if (sourceNames.length === 0) {
                          const count = key === 'L1_REGULATEUR' ? 45 : key === 'L2_NORMALISATEUR' ? 25 : key === 'L3_ACADEMIQUE' ? 200 : 50;
                          return (
                            <tr>
                              <td colSpan={4} className="py-4 px-4 text-center text-foreground-500">
                                {count} sources — Lancez le crawl pour voir les détails
                              </td>
                            </tr>
                          );
                        }
                        return sourceNames.map((name, i) => {
                          const entries = allAudit.filter((e: any) => e.sourceName === name);
                          const latest = entries[entries.length - 1];
                          return (
                            <tr key={i} className="border-b border-background-100/70 hover:bg-background-100/50 transition-colors">
                              <td className="py-2 px-4 font-mono text-xs text-foreground-500">{latest?.sourceId || '-'}</td>
                              <td className="py-2 px-4 font-medium text-foreground-950">{name}</td>
                              <td className="py-2 px-4 text-foreground-600">{latest?.category || '-'}</td>
                              <td className="py-2 px-4">
                                {latest ? (
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${latest.success ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                    {latest.success ? `OK ${latest.httpStatus}` : `FAIL`}
                                  </span>
                                ) : (
                                  <span className="text-xs text-foreground-500">En attente</span>
                                )}
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-background-200/70 flex items-center justify-between">
              <span className="font-semibold text-sm text-foreground-950"><i className="ri-terminal-box-line mr-1.5"></i>Logs temps réel</span>
              <button onClick={fetchLogs} className="text-xs text-foreground-500 hover:text-foreground-950 cursor-pointer"><i className="ri-refresh-line mr-1"></i>Rafraîchir</button>
            </div>
            <div className="max-h-[600px] overflow-y-auto font-mono text-xs">
              {logs.length === 0 ? (
                <div className="p-8 text-center text-foreground-500">Aucun log — Lancez le crawl</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={`px-5 py-1.5 border-b border-background-100/50 flex gap-3 ${log.level === 'error' ? 'bg-red-50/50' : log.level === 'warn' ? 'bg-amber-50/50' : ''}`}>
                    <span className="text-foreground-400 whitespace-nowrap">{new Date(log.timestamp).toLocaleTimeString('fr-FR')}</span>
                    <span className={`uppercase font-bold w-12 ${log.level === 'error' ? 'text-red-600' : log.level === 'warn' ? 'text-amber-600' : 'text-emerald-600'}`}>{log.level}</span>
                    <span className="text-foreground-800">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground-950"><i className="ri-shield-check-line mr-1.5"></i>Piste d'Audit ISAE 3402</div>
                <div className="text-xs text-foreground-500 mt-1">{auditTrail.length} entrées — Logs immuables SHA256</div>
              </div>
              <button onClick={handleExportCsv} className="px-4 py-2 bg-foreground-950 text-background-50 rounded-lg text-sm font-semibold hover:bg-foreground-800 whitespace-nowrap cursor-pointer transition-colors">
                <i className="ri-file-download-line mr-1.5"></i>Export CSV
              </button>
            </div>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
              <div className="max-h-[600px] overflow-y-auto">
                {auditTrail.length === 0 ? (
                  <div className="p-8 text-center text-foreground-500">Aucune entrée d'audit — Lancez le crawl</div>
                ) : (
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-foreground-500 border-b border-background-200/70 sticky top-0 bg-background-50">
                        <th className="py-2 px-4 font-medium">Timestamp</th>
                        <th className="py-2 px-4 font-medium">Source</th>
                        <th className="py-2 px-4 font-medium">Layer</th>
                        <th className="py-2 px-4 font-medium">HTTP</th>
                        <th className="py-2 px-4 font-medium">Textes</th>
                        <th className="py-2 px-4 font-medium">Statut</th>
                        <th className="py-2 px-4 font-medium">Hash</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditTrail.map((entry, i) => (
                        <tr key={i} className={`border-b border-background-100/50 ${entry.success ? '' : 'bg-red-50/30'}`}>
                          <td className="py-2 px-4 text-foreground-500 whitespace-nowrap">{new Date(entry.timestamp).toLocaleString('fr-FR')}</td>
                          <td className="py-2 px-4 font-medium text-foreground-950">{entry.sourceName}</td>
                          <td className="py-2 px-4"><span className="text-foreground-500">{entry.layer}</span></td>
                          <td className="py-2 px-4 text-foreground-600">{entry.httpStatus}</td>
                          <td className="py-2 px-4 text-foreground-600">{entry.textsFound}</td>
                          <td className="py-2 px-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${entry.success ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {entry.success ? 'OK' : 'FAIL'}
                            </span>
                          </td>
                          <td className="py-2 px-4 font-mono text-[10px] text-foreground-400">{entry.hash?.substring(0, 16)}...</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





