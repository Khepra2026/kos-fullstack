import { useState } from 'react';
import type { VideoComparisonMetric } from '@/mocks/youtubeProductionPipeline';
import { downloadCSV, downloadJSON } from '@/utils/exportUtils';

// ... existing code ...

const METRIC_CONFIG = [
  { key: 'views', label: 'Vues', icon: 'ri-eye-line', color: '#86BC25', unit: '', format: (v: number) => v.toLocaleString() },
  { key: 'ctr', label: 'CTR', icon: 'ri-cursor-line', color: '#C2410C', unit: '%', format: (v: number) => `${v}%` },
  { key: 'avgWatchTimeSeconds', label: 'Watch Time Moy.', icon: 'ri-time-line', color: '#FF0000', unit: '', format: (v: number) => `${Math.floor(v / 60)}m${v % 60}s` },
  { key: 'subscribersGained', label: 'Abonnés Gagnés', icon: 'ri-user-add-line', color: '#059669', unit: '', format: (v: number) => `+${v}` },
  { key: 'engagement', label: 'Engagement', icon: 'ri-heart-line', color: '#D97757', unit: '/10', format: (v: number) => `${v}/10` },
  { key: 'rpm', label: 'RPM', icon: 'ri-money-euro-circle-line', color: '#CA8A04', unit: '€', format: (v: number) => `${v}€` },
  { key: 'likes', label: 'Likes', icon: 'ri-thumb-up-line', color: '#0A66C2', unit: '', format: (v: number) => v.toLocaleString() },
  { key: 'comments', label: 'Commentaires', icon: 'ri-chat-1-line', color: '#6B7280', unit: '', format: (v: number) => v.toLocaleString() },
  { key: 'shares', label: 'Partages', icon: 'ri-share-forward-line', color: '#059669', unit: '', format: (v: number) => v.toLocaleString() },
  { key: 'performanceScore', label: 'Score Global', icon: 'ri-award-line', color: '#CA8A04', unit: '', format: (v: number) => `${v}/100` },
];

interface Props {
  videos: VideoComparisonMetric[];
}

export default function VideoComparisonTab({ videos }: Props) {
  const [videoA, setVideoA] = useState<string>(videos[0]?.videoId || '');
  const [videoB, setVideoB] = useState<string>(videos[2]?.videoId || '');
  const [activeMetric, setActiveMetric] = useState<string>('views');
  const [showAll, setShowAll] = useState(false);

  const selectedA = videos.find((v) => v.videoId === videoA);
  const selectedB = videos.find((v) => v.videoId === videoB);

  const getMetricValue = (video: VideoComparisonMetric, metricKey: string): number => {
    return (video as unknown as Record<string, number>)[metricKey] ?? 0;
  };

  const getWinner = (metricKey: string): 'A' | 'B' | 'tie' => {
    if (!selectedA || !selectedB) return 'tie';
    const a = getMetricValue(selectedA, metricKey);
    const b = getMetricValue(selectedB, metricKey);
    if (a > b) return 'A';
    if (b > a) return 'B';
    return 'tie';
  };

  const getBarWidth = (val: number, max: number) => Math.round((val / max) * 100);

  // Top performers
  const topViews = [...videos].sort((a, b) => b.views - a.views)[0];
  const topCTR = [...videos].sort((a, b) => b.ctr - a.ctr)[0];
  const topEngagement = [...videos].sort((a, b) => b.engagement - a.engagement)[0];
  const topRPM = [...videos].sort((a, b) => b.rpm - a.rpm)[0];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
            Dashboard Comparatif — Vidéo vs Vidéo
          </h2>
          <p className="text-sm text-foreground-500 max-w-3xl">
            Comparez les performances de n&apos;importe quelle paire de vidéos. Vues, CTR, Watch Time, RPM, Engagement, Abonnés — analyse complète avec graphiques de performance.
          </p>

          {/* Export Buttons */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider">Exporter :</span>
            <button
              onClick={() => {
                const headers = ['ID', 'Titre', 'Type', 'Date', 'Vues', 'CTR', 'Watch Time (s)', 'Avg Watch Time (s)', 'Abonnés', 'Engagement', 'RPM', 'Likes', 'Commentaires', 'Partages', 'Score'];
                const rows = videos.map((v) => [
                  v.videoId, v.title, v.videoType, v.publishDate, v.views.toString(), v.ctr.toString(),
                  v.watchTimeSeconds.toString(), v.avgWatchTimeSeconds.toString(), v.subscribersGained.toString(),
                  v.engagement.toString(), v.rpm.toString(), v.likes.toString(), v.comments.toString(),
                  v.shares.toString(), v.performanceScore.toString(),
                ]);
                downloadCSV('comparatif-videos-khepra.csv', headers, rows);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-foreground-950 text-white hover:bg-foreground-800 cursor-pointer transition-all whitespace-nowrap"
            >
              <i className="ri-file-download-line" />CSV
            </button>
            <button
              onClick={() => {
                downloadJSON('comparatif-videos-khepra.json', videos);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-600 hover:bg-background-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <i className="ri-braces-line" />JSON
            </button>
          </div>
        </div>

        {/* Top Performers Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Meilleur CTR', video: topCTR, metricKey: 'ctr', suffix: '%', color: '#C2410C' },
            { label: 'Plus de Vues', video: topViews, metricKey: 'views', suffix: '', color: '#86BC25' },
            { label: 'Engagement Max', video: topEngagement, metricKey: 'engagement', suffix: '/10', color: '#D97757' },
            { label: 'RPM le Plus Haut', video: topRPM, metricKey: 'rpm', suffix: '€', color: '#CA8A04' },
          ].map((winner, i) => (
            <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4">
              <div className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">{winner.label}</div>
              <div className="text-xl font-bold mb-1" style={{ color: winner.color }}>
                {winner.metricKey === 'views'
                  ? winner.video.views.toLocaleString()
                  : `${getMetricValue(winner.video, winner.metricKey)}${winner.suffix}`}
              </div>
              <div className="text-[11px] text-foreground-600 line-clamp-2 font-medium">{winner.video.title}</div>
            </div>
          ))}
        </div>

        {/* ─── SIDE BY SIDE COMPARISON ─── */}
        <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden mb-8">
          {/* Selectors */}
          <div className="grid grid-cols-2 border-b border-background-200/70">
            {/* Video A Selector */}
            <div className="p-4 border-r border-background-200/70">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#86BC25] text-white flex items-center justify-center text-[10px] font-bold">A</div>
                <span className="text-xs font-bold text-foreground-600 uppercase tracking-wider">Vidéo A</span>
              </div>
              <select
                value={videoA}
                onChange={(e) => setVideoA(e.target.value)}
                className="w-full text-sm font-bold text-foreground-950 bg-background-100 border border-background-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-foreground-300"
              >
                {videos.filter((v) => v.videoId !== videoB).map((v) => (
                  <option key={v.videoId} value={v.videoId}>{v.title}</option>
                ))}
              </select>
              {selectedA && (
                <div className="mt-3 flex items-center gap-2">
                  <img src={selectedA.thumbnail} alt={selectedA.title} className="w-20 h-12 rounded-lg object-cover object-top flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-foreground-400">{selectedA.videoType} · {selectedA.duration}</div>
                    <div className="text-[10px] text-foreground-400">{new Date(selectedA.publishDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: selectedA.performanceScore >= 90 ? '#D1FAE5' : selectedA.performanceScore >= 75 ? '#FEF3C7' : '#FEE2E2', color: selectedA.performanceScore >= 90 ? '#059669' : selectedA.performanceScore >= 75 ? '#CA8A04' : '#DC2626' }}>
                        Score {selectedA.performanceScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video B Selector */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-[10px] font-bold">B</div>
                <span className="text-xs font-bold text-foreground-600 uppercase tracking-wider">Vidéo B</span>
              </div>
              <select
                value={videoB}
                onChange={(e) => setVideoB(e.target.value)}
                className="w-full text-sm font-bold text-foreground-950 bg-background-100 border border-background-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-foreground-300"
              >
                {videos.filter((v) => v.videoId !== videoA).map((v) => (
                  <option key={v.videoId} value={v.videoId}>{v.title}</option>
                ))}
              </select>
              {selectedB && (
                <div className="mt-3 flex items-center gap-2">
                  <img src={selectedB.thumbnail} alt={selectedB.title} className="w-20 h-12 rounded-lg object-cover object-top flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-foreground-400">{selectedB.videoType} · {selectedB.duration}</div>
                    <div className="text-[10px] text-foreground-400">{new Date(selectedB.publishDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: selectedB.performanceScore >= 90 ? '#D1FAE5' : selectedB.performanceScore >= 75 ? '#FEF3C7' : '#FEE2E2', color: selectedB.performanceScore >= 90 ? '#059669' : selectedB.performanceScore >= 75 ? '#CA8A04' : '#DC2626' }}>
                        Score {selectedB.performanceScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Metric Selector */}
          <div className="p-4 border-b border-background-200/70 bg-background-100/50">
            <div className="flex flex-wrap gap-1.5">
              {METRIC_CONFIG.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setActiveMetric(m.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all whitespace-nowrap ${activeMetric === m.key ? 'text-white' : 'bg-background-50 text-foreground-500 hover:bg-background-200'}`}
                  style={activeMetric === m.key ? { backgroundColor: m.color } : undefined}
                >
                  <i className={`${m.icon} text-xs`} />{m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Bars */}
          {selectedA && selectedB && (() => {
            const activeCfg = METRIC_CONFIG.find((m) => m.key === activeMetric)!;
            const valA = getMetricValue(selectedA, activeMetric);
            const valB = getMetricValue(selectedB, activeMetric);
            const maxVal = Math.max(valA, valB, 1);
            const winner = getWinner(activeMetric);

            return (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-foreground-950">Comparaison : {activeCfg.label}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${winner === 'A' ? 'bg-[#86BC25]/15 text-[#86BC25]' : winner === 'B' ? 'bg-[#FF0000]/15 text-[#FF0000]' : 'bg-background-100 text-foreground-500'}`}>
                    {winner === 'tie' ? 'Égalité' : `Gagnant : Vidéo ${winner}`}
                  </span>
                </div>

                {/* Bar A */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#86BC25] text-white flex items-center justify-center text-[9px] font-bold">A</div>
                      <span className="text-xs font-bold text-foreground-700 line-clamp-1 max-w-xs">{selectedA.title}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground-950 ml-2">{activeCfg.format(valA)}</span>
                  </div>
                  <div className="h-10 bg-background-100 rounded-xl overflow-hidden">
                    <div
                      className="h-full rounded-xl flex items-center px-3 transition-all duration-700"
                      style={{ width: `${getBarWidth(valA, maxVal)}%`, backgroundColor: '#86BC25', minWidth: '2%' }}
                    >
                      <span className="text-[10px] font-bold text-white truncate">{activeCfg.format(valA)}</span>
                    </div>
                  </div>
                </div>

                {/* Bar B */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-[9px] font-bold">B</div>
                      <span className="text-xs font-bold text-foreground-700 line-clamp-1 max-w-xs">{selectedB.title}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground-950 ml-2">{activeCfg.format(valB)}</span>
                  </div>
                  <div className="h-10 bg-background-100 rounded-xl overflow-hidden">
                    <div
                      className="h-full rounded-xl flex items-center px-3 transition-all duration-700"
                      style={{ width: `${getBarWidth(valB, maxVal)}%`, backgroundColor: '#FF0000', minWidth: '2%' }}
                    >
                      <span className="text-[10px] font-bold text-white truncate">{activeCfg.format(valB)}</span>
                    </div>
                  </div>
                </div>

                {/* Delta Badge */}
                <div className="flex items-center justify-center">
                  {winner !== 'tie' && (() => {
                    const higher = winner === 'A' ? valA : valB;
                    const lower = winner === 'A' ? valB : valA;
                    const delta = lower > 0 ? ((higher - lower) / lower * 100).toFixed(1) : '∞';
                    return (
                      <div className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 ${winner === 'A' ? 'bg-[#86BC25]/15 text-[#86BC25]' : 'bg-[#FF0000]/15 text-[#FF0000]'}`}>
                        <i className="ri-arrow-up-line" />
                        Vidéo {winner} surpasse de +{delta}% sur {activeCfg.label}
                      </div>
                    );
                  })()}
                  {winner === 'tie' && (
                    <div className="px-4 py-2 rounded-full text-xs font-bold bg-background-100 text-foreground-500">
                      Performance identique
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* ─── ALL METRICS COMPARISON TABLE ─── */}
        {selectedA && selectedB && (
          <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden mb-8">
            <div className="flex items-center justify-between p-4 border-b border-background-200/70">
              <h3 className="font-heading text-base font-bold text-foreground-950">Toutes les Métriques — Comparaison Complète</h3>
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs font-bold text-foreground-500 hover:text-foreground-900 cursor-pointer flex items-center gap-1"
              >
                <i className={`${showAll ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                {showAll ? 'Réduire' : 'Tout voir'}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-background-100 border-b border-background-200">
                    <th className="text-left py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">Métrique</th>
                    <th className="text-center py-3 px-4 text-[#86BC25] font-bold">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#86BC25] text-white flex items-center justify-center text-[9px] font-bold">A</div>
                        <span className="truncate max-w-32">{selectedA.title.split(' — ')[0]}</span>
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-[#FF0000] font-bold">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-[9px] font-bold">B</div>
                        <span className="truncate max-w-32">{selectedB.title.split(' — ')[0]}</span>
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">Gagnant</th>
                    <th className="text-center py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {(showAll ? METRIC_CONFIG : METRIC_CONFIG.slice(0, 6)).map((m) => {
                    const valA = getMetricValue(selectedA, m.key);
                    const valB = getMetricValue(selectedB, m.key);
                    const w = getWinner(m.key);
                    const higher = w === 'A' ? valA : valB;
                    const lower = w === 'A' ? valB : valA;
                    const delta = w !== 'tie' && lower > 0
                      ? `+${((higher - lower) / lower * 100).toFixed(1)}%`
                      : w !== 'tie' ? '+∞' : '—';

                    return (
                      <tr key={m.key} className={`border-b border-background-100 transition-colors ${activeMetric === m.key ? 'bg-background-100/60' : 'hover:bg-background-50'}`}>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <i className={`${m.icon} text-xs`} style={{ color: m.color }} />
                            <span className="font-bold text-foreground-700">{m.label}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`font-bold ${w === 'A' ? 'text-[#86BC25]' : 'text-foreground-600'}`}>{m.format(valA)}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`font-bold ${w === 'B' ? 'text-[#FF0000]' : 'text-foreground-600'}`}>{m.format(valB)}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {w === 'tie' ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-400">Égalité</span>
                          ) : (
                            <div className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center text-[9px] font-bold text-white ${w === 'A' ? 'bg-[#86BC25]' : 'bg-[#FF0000]'}`}>{w}</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-[10px] font-bold ${w === 'A' ? 'text-[#86BC25]' : w === 'B' ? 'text-[#FF0000]' : 'text-foreground-400'}`}>{delta}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── ALL VIDEOS RANKING ─── */}
        <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
          <div className="p-4 border-b border-background-200/70">
            <h3 className="font-heading text-base font-bold text-foreground-950">Classement Global — Toutes les Vidéos</h3>
            <p className="text-xs text-foreground-500 mt-0.5">Triées par Score de Performance décroissant</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-background-100 border-b border-background-200">
                  <th className="text-left py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">#</th>
                  <th className="text-left py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">Vidéo</th>
                  <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Vues</th>
                  <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">CTR</th>
                  <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Watch Time</th>
                  <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Abonnés</th>
                  <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Engage.</th>
                  <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">RPM</th>
                  <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Score</th>
                  <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Comparer</th>
                </tr>
              </thead>
              <tbody>
                {[...videos].sort((a, b) => b.performanceScore - a.performanceScore).map((v, i) => {
                  const isA = v.videoId === videoA;
                  const isB = v.videoId === videoB;

                  return (
                    <tr key={v.videoId} className={`border-b border-background-100 transition-colors ${isA ? 'bg-[#86BC25]/5' : isB ? 'bg-[#FF0000]/5' : 'hover:bg-background-50'}`}>
                      <td className="py-3 px-4">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-background-200 text-foreground-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-background-100 text-foreground-400'}`}>
                          {i + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img src={v.thumbnail} alt={v.title} className="w-14 h-9 rounded-lg object-cover object-top flex-shrink-0" />
                          <div>
                            <div className="font-bold text-foreground-950 line-clamp-1 max-w-xs">{v.title}</div>
                            <div className="text-[10px] text-foreground-400">{v.videoType} · {v.duration}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-foreground-700">{v.views.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-bold" style={{ color: v.ctr >= 10 ? '#059669' : v.ctr >= 8 ? '#CA8A04' : '#DC2626' }}>{v.ctr}%</td>
                      <td className="py-3 px-3 text-right text-foreground-600">{Math.floor(v.avgWatchTimeSeconds / 60)}m{v.avgWatchTimeSeconds % 60}s</td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-600">+{v.subscribersGained}</td>
                      <td className="py-3 px-3 text-right text-foreground-600">{v.engagement}/10</td>
                      <td className="py-3 px-3 text-right text-foreground-600">{v.rpm}€</td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: v.performanceScore >= 90 ? '#D1FAE5' : v.performanceScore >= 75 ? '#FEF3C7' : '#FEE2E2', color: v.performanceScore >= 90 ? '#059669' : v.performanceScore >= 75 ? '#CA8A04' : '#DC2626' }}>
                          {v.performanceScore}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setVideoA(v.videoId)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold cursor-pointer transition-all ${isA ? 'bg-[#86BC25] text-white' : 'bg-background-100 text-foreground-500 hover:bg-[#86BC25]/20'}`}
                          >A</button>
                          <button
                            onClick={() => setVideoB(v.videoId)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold cursor-pointer transition-all ${isB ? 'bg-[#FF0000] text-white' : 'bg-background-100 text-foreground-500 hover:bg-[#FF0000]/20'}`}
                          >B</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}





