import { useState } from 'react';
import type { PlaylistSeries, PlaylistItem } from '@/mocks/kosYoutubeProductionPipeline';

const PRIORITY_COLORS: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: '#DC2626', bg: '#FEE2E2', label: 'Critique' },
  high: { color: '#C2410C', bg: '#FEF3C7', label: 'Haute' },
  medium: { color: '#CA8A04', bg: '#FEF9C3', label: 'Moyenne' },
  low: { color: '#6B7280', bg: '#F3F4F6', label: 'Faible' },
};

const STATUS_COLORS: Record<string, { color: string; bg: string; label: string }> = {
  active: { color: '#059669', bg: '#D1FAE5', label: 'Active' },
  archived: { color: '#6B7280', bg: '#F3F4F6', label: 'Archivée' },
  planning: { color: '#0A66C2', bg: '#DBEAFE', label: 'En planification' },
};

const STAGE_COLORS: Record<string, string> = {
  planned: '#6B7280',
  script_ready: '#CA8A04',
  voice_ready: '#C2410C',
  video_ready: '#0A66C2',
  seo_ready: '#059669',
  scheduled: '#86BC25',
  published: '#047857',
};

const STAGE_LABELS: Record<string, string> = {
  planned: 'Planifié',
  script_ready: 'Script Prêt',
  voice_ready: 'Voix Prête',
  video_ready: 'Vidéo Prête',
  seo_ready: 'SEO Prêt',
  scheduled: 'Programmé',
  published: 'Publié',
};

interface Props {
  playlists: PlaylistSeries[];
}

export default function PlaylistIntelligenceTab({ playlists }: Props) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>(playlists[0]?.playlistId || '');
  const [activeView, setActiveView] = useState<'overview' | 'optimization' | 'series'>('overview');

  const selected = playlists.find((p) => p.playlistId === selectedPlaylist);
  const activePlaylists = playlists.filter((p) => p.status === 'active');
  const planningPlaylists = playlists.filter((p) => p.status === 'planning');

  const totalPlaylistViews = playlists.reduce((acc, p) => acc + p.totalViews, 0);
  const avgRetentionGlobal = activePlaylists.length > 0
    ? Math.round(activePlaylists.reduce((acc, p) => acc + p.avgRetention, 0) / activePlaylists.length)
    : 0;
  const totalVideos = playlists.reduce((acc, p) => acc + p.totalVideos, 0);

  const getRetentionColor = (r: number) => {
    if (r >= 75) return '#059669';
    if (r >= 60) return '#CA8A04';
    return '#DC2626';
  };

  const getCTRColor = (c: number) => {
    if (c >= 10) return '#059669';
    if (c >= 8) return '#CA8A04';
    return '#DC2626';
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
            Playlist Intelligence — Analyse & Optimisation des Séries
          </h2>
          <p className="text-sm text-foreground-500 max-w-3xl">
            Analyse détaillée des playlists YouTube KHEPRA EXPERTS : rétention par position, CTR, conversion abonnés, et recommandations d'optimisation automatiques pour chaque série.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
            <span className="block text-xl font-bold text-foreground-950">{playlists.length}</span>
            <span className="text-[10px] text-foreground-400">Playlists</span>
          </div>
          <div className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
            <span className="block text-xl font-bold text-foreground-950">{totalVideos}</span>
            <span className="text-[10px] text-foreground-400">Vidéos en playlists</span>
          </div>
          <div className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
            <span className="block text-xl font-bold" style={{ color: '#86BC25' }}>{totalPlaylistViews.toLocaleString()}</span>
            <span className="text-[10px] text-foreground-400">Vues totales playlists</span>
          </div>
          <div className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
            <span className="block text-xl font-bold" style={{ color: avgRetentionGlobal >= 70 ? '#059669' : '#CA8A04' }}>{avgRetentionGlobal}%</span>
            <span className="text-[10px] text-foreground-400">Rétention moyenne</span>
          </div>
        </div>

        {/* Playlist Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {playlists.map((p) => {
            const isActive = p.playlistId === selectedPlaylist;
            return (
              <button
                key={p.playlistId}
                onClick={() => setSelectedPlaylist(p.playlistId)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all whitespace-nowrap border ${
                  isActive ? 'border-foreground-300 bg-foreground-950 text-white' : 'border-background-200/70 bg-background-50 text-foreground-600 hover:border-foreground-200'
                }`}
              >
                <i className="ri-play-list-2-line" />
                {p.name}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-background-100 text-foreground-400'}`}>
                  {p.totalVideos}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Tabs */}
        {selected && (
          <div className="flex items-center gap-2 mb-5 p-1 bg-background-100 rounded-full w-fit">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: 'ri-dashboard-line' },
              { id: 'optimization', label: 'Optimisation', icon: 'ri-lightbulb-flash-line' },
              { id: 'series', label: 'Plan Série', icon: 'ri-stack-line' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveView(v.id as 'overview' | 'optimization' | 'series')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeView === v.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:text-foreground-900'
                }`}
              >
                <i className={v.icon} />{v.label}
              </button>
            ))}
          </div>
        )}

        {/* ─── OVERVIEW ─── */}
        {selected && activeView === 'overview' && (
          <div className="space-y-6">
            {/* Playlist Header Card */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-foreground-950 flex items-center justify-center flex-shrink-0">
                  <i className="ri-play-list-2-line text-2xl text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-foreground-950">{selected.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[selected.status].bg, color: STATUS_COLORS[selected.status].color }}>
                      {STATUS_COLORS[selected.status].label}
                    </span>
                  </div>
                  <p className="text-xs text-foreground-500">{selected.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                    <span><i className="ri-folder-line mr-0.5" />{selected.category}</span>
                    <span><i className="ri-calendar-line mr-0.5" />MàJ {selected.lastUpdated}</span>
                    <span><i className="ri-video-line mr-0.5" />{selected.totalVideos} vidéos</span>
                  </div>
                </div>
                {/* KPIs */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground-950">{selected.totalViews.toLocaleString()}</div>
                    <div className="text-[9px] text-foreground-400">Vues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold" style={{ color: getRetentionColor(selected.avgRetention) }}>{selected.avgRetention}%</div>
                    <div className="text-[9px] text-foreground-400">Rétention</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold" style={{ color: getCTRColor(selected.avgCTR) }}>{selected.avgCTR}%</div>
                    <div className="text-[9px] text-foreground-400">CTR</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Playlist Items Table */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="p-4 border-b border-background-200/70">
                <h4 className="font-heading text-sm font-bold text-foreground-950">Vidéos par Position — Analyse de Rétention</h4>
                <p className="text-[10px] text-foreground-500 mt-0.5">La position dans la playlist influence directement la rétention et le CTR</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-background-100 border-b border-background-200">
                      <th className="text-left py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider w-16">Pos</th>
                      <th className="text-left py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">Vidéo</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Vues</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Rétention</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">CTR</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Engage.</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Watch Time</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Ajoutée</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.items.map((item: PlaylistItem) => (
                      <tr key={item.videoId} className="border-b border-background-100 hover:bg-background-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            item.position === 1 ? 'bg-amber-100 text-amber-700' : item.position === 2 ? 'bg-background-200 text-foreground-600' : item.position === 3 ? 'bg-orange-100 text-orange-700' : 'bg-background-100 text-foreground-400'
                          }`}>
                            {item.position}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <img src={item.thumbnail} alt={item.title} className="w-16 h-10 rounded-lg object-cover object-top flex-shrink-0" />
                            <div>
                              <div className="font-bold text-foreground-950 line-clamp-1 max-w-xs">{item.title}</div>
                              <div className="text-[10px] text-foreground-400">{item.videoId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-foreground-700">{item.views.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right">
                          <span className="font-bold" style={{ color: getRetentionColor(item.retention) }}>{item.retention}%</span>
                        </td>
                        <td className="py-3 px-3 text-right font-bold" style={{ color: getCTRColor(item.ctr) }}>{item.ctr}%</td>
                        <td className="py-3 px-3 text-right text-foreground-600">{item.engagement}/10</td>
                        <td className="py-3 px-3 text-right text-foreground-600">{item.watchTime}</td>
                        <td className="py-3 px-3 text-right text-[10px] text-foreground-400">{item.addedAt}</td>
                      </tr>
                    ))}
                    {selected.items.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-sm text-foreground-400">
                          <i className="ri-folder-open-line text-2xl mb-2 block" />
                          Aucune vidéo dans cette playlist — série en planification
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Retention Graph Visualization */}
            {selected.items.length > 0 && (
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                <h4 className="font-heading text-sm font-bold text-foreground-950 mb-4">Courbe de Rétention par Position</h4>
                <div className="flex items-end gap-3 h-40 px-2">
                  {selected.items.map((item) => {
                    const height = Math.max((item.retention / 100) * 100, 8);
                    return (
                      <div key={item.videoId} className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="text-[9px] font-bold text-foreground-500">{item.retention}%</div>
                        <div
                          className="w-full rounded-t-lg transition-all duration-700 min-w-[24px]"
                          style={{ height: `${height}%`, backgroundColor: getRetentionColor(item.retention), opacity: 0.8 }}
                        />
                        <div className="text-[9px] text-foreground-400 text-center truncate w-full">#{item.position}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-foreground-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Rétention {'>'}75% (excellent)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />Rétention 60-75% (moyen)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Rétention {'<'}60% (à optimiser)</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── OPTIMIZATION ─── */}
        {selected && activeView === 'optimization' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <i className="ri-lightbulb-flash-line text-lg text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground-950">Recommandation d'Optimisation</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: PRIORITY_COLORS[selected.optimization.priority].bg, color: PRIORITY_COLORS[selected.optimization.priority].color }}>
                    {PRIORITY_COLORS[selected.optimization.priority].label}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-red-50 border border-red-200/70 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-error-warning-line text-red-500" />
                    <span className="text-xs font-bold text-red-700">Problème Détecté</span>
                  </div>
                  <p className="text-sm text-red-800">{selected.optimization.gap}</p>
                </div>

                <div className="rounded-xl bg-emerald-50 border border-emerald-200/70 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-check-double-line text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-700">Action Recommandée</span>
                  </div>
                  <p className="text-sm text-emerald-800">{selected.optimization.recommendation}</p>
                </div>

                <div className="rounded-xl bg-[#86BC25]/10 border border-[#86BC25]/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-bar-chart-grouped-line text-[#86BC25]" />
                    <span className="text-xs font-bold text-[#86BC25]">Impact Estimé</span>
                  </div>
                  <p className="text-sm text-[#86BC25] font-bold">{selected.optimization.estimatedImpact}</p>
                </div>
              </div>
            </div>

            {/* Comparative Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-background-50 border border-background-200/70 p-4">
                <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Comparatif vs Moyenne Chaîne</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Rétention', value: selected.avgRetention, avg: avgRetentionGlobal, unit: '%', higherIsBetter: true },
                    { label: 'CTR', value: selected.avgCTR, avg: 8.7, unit: '%', higherIsBetter: true },
                    { label: 'Engagement', value: selected.avgEngagement, avg: 7.8, unit: '/10', higherIsBetter: true },
                    { label: 'Conversion Abonnés', value: selected.subscriberConversion, avg: 3.1, unit: '%', higherIsBetter: true },
                  ].map((m) => {
                    const diff = m.value - m.avg;
                    const isBetter = m.higherIsBetter ? diff > 0 : diff < 0;
                    return (
                      <div key={m.label} className="flex items-center gap-3">
                        <span className="text-xs text-foreground-600 w-28 flex-shrink-0">{m.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-background-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${Math.min((m.value / (m.avg * 1.5)) * 100, 100)}%`, backgroundColor: isBetter ? '#059669' : '#DC2626' }}
                          />
                        </div>
                        <span className="text-xs font-bold text-foreground-700 w-12 text-right">{m.value}{m.unit}</span>
                        <span className={`text-[10px] font-bold w-14 text-right ${isBetter ? 'text-emerald-600' : 'text-red-600'}`}>
                          {diff > 0 ? '+' : ''}{diff.toFixed(1)}{m.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl bg-background-50 border border-background-200/70 p-4">
                <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Performances Clés</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Vues Totales', value: selected.totalViews.toLocaleString(), icon: 'ri-eye-line', color: '#86BC25' },
                    { label: 'Watch Time Moy.', value: selected.avgWatchTime, icon: 'ri-time-line', color: '#C2410C' },
                    { label: 'Vidéos', value: selected.totalVideos.toString(), icon: 'ri-video-line', color: '#0A66C2' },
                    { label: 'Dernière MàJ', value: selected.lastUpdated, icon: 'ri-calendar-line', color: '#6B7280' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}15` }}>
                        <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-foreground-950">{s.value}</div>
                        <div className="text-[10px] text-foreground-400">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── SERIES PLAN ─── */}
        {selected && activeView === 'series' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center">
                  <i className="ri-stack-line text-lg text-[#0A66C2]" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground-950">Plan de Série — Prochaine Vidéo</h3>
                  <span className="text-[10px] text-foreground-400">Pipeline de production pour la suite</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-background-100 p-4">
                  <div className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2">Prochaine Vidéo</div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">{selected.seriesPlan.nextVideoTitle}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                    <span className="px-2 py-0.5 rounded-full bg-background-200 text-foreground-500 font-bold">{STAGE_LABELS[selected.seriesPlan.nextVideoStage] || selected.seriesPlan.nextVideoStage}</span>
                    <span style={{ color: STAGE_COLORS[selected.seriesPlan.nextVideoStage] || '#6B7280' }}>
                      <i className="ri-calendar-line mr-0.5" />{selected.seriesPlan.estimatedPublishDate}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#86BC25]/10 border border-[#86BC25]/30 p-4">
                  <div className="text-[10px] font-bold text-[#86BC25] uppercase tracking-wider mb-2">Vues Estimées</div>
                  <div className="text-2xl font-bold text-[#86BC25]">{selected.seriesPlan.estimatedViews.toLocaleString()}</div>
                  <div className="text-[10px] text-[#86BC25]/70 mt-1">Projection basée sur performance historique série</div>
                </div>
              </div>
            </div>

            {/* All Playlists Summary */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="p-4 border-b border-background-200/70">
                <h4 className="font-heading text-sm font-bold text-foreground-950">Tableau de Bord — Toutes les Séries</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-background-100 border-b border-background-200">
                      <th className="text-left py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">Série</th>
                      <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Statut</th>
                      <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Vidéos</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Vues</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Rétention</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">CTR</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Conv. Abo.</th>
                      <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Prochaine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playlists.map((p) => (
                      <tr key={p.playlistId} className={`border-b border-background-100 hover:bg-background-50 transition-colors ${p.playlistId === selectedPlaylist ? 'bg-foreground-950/5' : ''}`}>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <i className="ri-play-list-2-line text-foreground-400" />
                            <div>
                              <div className="font-bold text-foreground-950">{p.name}</div>
                              <div className="text-[10px] text-foreground-400">{p.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[p.status].bg, color: STATUS_COLORS[p.status].color }}>
                            {STATUS_COLORS[p.status].label}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-foreground-700">{p.totalVideos}</td>
                        <td className="py-3 px-3 text-right font-bold text-foreground-700">{p.totalViews.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-bold" style={{ color: getRetentionColor(p.avgRetention) }}>{p.avgRetention}%</td>
                        <td className="py-3 px-3 text-right font-bold" style={{ color: getCTRColor(p.avgCTR) }}>{p.avgCTR}%</td>
                        <td className="py-3 px-3 text-right text-foreground-600">{p.subscriberConversion}%</td>
                        <td className="py-3 px-3 text-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">
                            {p.seriesPlan.estimatedPublishDate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Planning Playlists Alert */}
        {planningPlaylists.length > 0 && (
          <div className="mt-6 rounded-xl bg-[#0A66C2]/5 border border-[#0A66C2]/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-lightbulb-line text-[#0A66C2]" />
              <span className="text-xs font-bold text-[#0A66C2]">Séries en Planification</span>
            </div>
            <div className="space-y-2">
              {planningPlaylists.map((p) => (
                <div key={p.playlistId} className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-foreground-950">{p.name}</span>
                  <span className="text-[10px] text-foreground-400">{p.description}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2]">
                    Prochaine : {p.seriesPlan.estimatedPublishDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}