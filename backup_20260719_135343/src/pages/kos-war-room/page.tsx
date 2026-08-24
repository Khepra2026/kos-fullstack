import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWarRoomData } from '';
import AgentStatCard from '';
import HealthCheckTable from '';
import PipelineLiveChart from '';
import LeadsCounter from '';

function formatRelativeTime(date: Date | null): string {
  if (!date) return '—';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return 'à l\'instant';
  if (seconds < 60) return `il y a ${seconds}s`;
  return `il y a ${Math.floor(seconds / 60)}min`;
}

export default function warRoomPage() {
  const data = useWarRoomData();
  const [clock, setClock] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Africa/Lome' }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background-50">
      {/* ═══════════ HERO BAR — WAR ROOM HEADER ═══════════ */}
      <section className="relative bg-foreground-950 border-b border-foreground-800">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-primary-500" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-primary-500" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-primary-500" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-primary-500" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <i className="ri-radar-line text-red-400 text-lg animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-bold text-white font-heading">
                    KOS-360° War Room
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 font-body">
                    LIVE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-500/20 text-primary-400 border border-primary-500/30 font-body">
                    {clock} GMT
                  </span>
                </div>
                <p className="text-xs text-foreground-400 mt-1 font-body">
                  Command Center — Pipeline autonome 8 agents · {formatRelativeTime(data.lastUpdated)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/kos-dashboard"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-foreground-800 text-foreground-300 text-xs font-medium hover:bg-foreground-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-dashboard-line text-sm" />
                Dashboard Central
              </Link>
              <Link
                to="/kos-ultimate-cockpit"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-500/20 text-primary-400 text-xs font-medium hover:bg-primary-500/30 transition-colors cursor-pointer whitespace-nowrap border border-primary-500/20"
              >
                <i className="ri-vip-crown-line text-sm" />
                Ultimate Cockpit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ERROR BANNER ═══════════ */}
      {data.error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <i className="ri-error-warning-line text-red-600 text-lg" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700 font-body">Erreur de chargement des métriques</p>
              <p className="text-xs text-red-500 font-body">{data.error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line mr-1" />Réessayer
            </button>
          </div>
        </div>
      )}

      {/* ═══════════ MAIN GRID ═══════════ */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* ── ROW 1: 6 Agent Stat Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <AgentStatCard
            index={1}
            title="Agent Trend Engine"
            value={data.trendTopics24h}
            unit="topics"
            thresholds={[{ value: 5, color: '#059669' }, { value: 1, color: '#d97706' }, { value: 0, color: '#dc2626' }]}
            currentValue={data.trendTopics24h}
            trend={data.trendTopics24h >= 5 ? 'up' : data.trendTopics24h >= 1 ? 'stable' : 'down'}
          />
          <AgentStatCard
            index={2}
            title="Agent Rédacteur IA"
            value={`${data.avgCtr7d}`}
            unit="% CTR"
            thresholds={[{ value: 5, color: '#059669' }, { value: 2, color: '#d97706' }, { value: 0, color: '#dc2626' }]}
            currentValue={data.avgCtr7d}
            trend={data.avgCtr7d >= 5 ? 'up' : data.avgCtr7d >= 2 ? 'stable' : 'down'}
          />
          <AgentStatCard
            index={3}
            title="Agent Traducteur"
            value={`${data.localViewsPercent}`}
            unit="% vues locales"
            thresholds={[{ value: 30, color: '#059669' }, { value: 15, color: '#d97706' }, { value: 0, color: '#dc2626' }]}
            currentValue={data.localViewsPercent}
            trend={data.localViewsPercent >= 30 ? 'up' : 'down'}
          />
          <AgentStatCard
            index={4}
            title="Agent Publisher"
            value={`${data.oauthErrorRate}`}
            unit="% erreurs"
            thresholds={[{ value: 5, color: '#dc2626' }, { value: 1, color: '#d97706' }, { value: 0, color: '#059669' }]}
            currentValue={data.oauthErrorRate > 5 ? 5 : data.oauthErrorRate}
            trend={data.oauthErrorRate === 0 ? 'up' : 'down'}
          />
          <AgentStatCard
            index={5}
            title="Agent Reply Bot"
            value={`${data.replyTimeAvg}`}
            unit="s moy."
            thresholds={[{ value: 120, color: '#dc2626' }, { value: 60, color: '#d97706' }, { value: 0, color: '#059669' }]}
            currentValue={data.replyTimeAvg > 120 ? 120 : data.replyTimeAvg}
            trend={data.replyTimeAvg <= 60 ? 'up' : 'stable'}
          />
          <AgentStatCard
            index={6}
            title="Agent Recycler"
            value={`${data.recyclerBoost}`}
            unit="% boost"
            thresholds={[{ value: 30, color: '#059669' }, { value: 10, color: '#d97706' }, { value: 0, color: '#dc2626' }]}
            currentValue={data.recyclerBoost}
            trend={data.recyclerBoost >= 30 ? 'up' : 'stable'}
          />
        </div>

        {/* ── ROW 2: Health Check + Pipeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <HealthCheckTable services={data.healthServices} loading={data.loading} />
          </div>
          <div className="lg:col-span-2">
            <PipelineLiveChart data={data.pipeline24h} loading={data.loading} />
          </div>
        </div>

        {/* ── ROW 3: Leads Counter ── */}
        <LeadsCounter value={data.leads24h} />

        {/* ── ROW 4: Quick Links ── */}
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <h3 className="text-xs font-bold text-foreground-950 uppercase tracking-wide mb-4 flex items-center gap-2 font-heading">
            <i className="ri-flashlight-line text-amber-500" />
            Accès Rapides — Pipeline KOS-360°
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'Trend Engine', path: '/kos-trend-engine', icon: 'ri-line-chart-line', color: 'bg-primary-50 text-primary-700 border-primary-200' },
              { label: 'Script Gen', path: '/kos-video-script-generator', icon: 'ri-file-text-line', color: 'bg-accent-50 text-accent-700 border-accent-200' },
              { label: 'Publisher', path: '/kos-ayrshare-publisher', icon: 'ri-send-plane-line', color: 'bg-secondary-50 text-secondary-700 border-secondary-200' },
              { label: 'Reply Bot', path: '/kos-reply-bot', icon: 'ri-chat-3-line', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { label: 'Recycler', path: '/kos-content-recycler', icon: 'ri-refresh-line', color: 'bg-amber-50 text-amber-700 border-amber-200' },
              { label: 'Social Media', path: '/kos-social-media-board', icon: 'ri-share-line', color: 'bg-primary-50 text-primary-700 border-primary-200' },
              { label: 'YouTube', path: '/kos-youtube-analytics', icon: 'ri-youtube-line', color: 'bg-accent-50 text-accent-700 border-accent-200' },
              { label: 'Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-3-line', color: 'bg-secondary-50 text-secondary-700 border-secondary-200' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer hover:opacity-80 ${link.color}`}
              >
                <i className={`${link.icon} text-xs`} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-background-200/70 bg-background-100 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-foreground-400 font-body">
            <span>KOS-360° War Room — Pipeline Autonome 8 Agents · BCEAO/COBAC/OHADA</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Rafraîchissement: 10s · Dernière mise à jour: {formatRelativeTime(data.lastUpdated)}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}



