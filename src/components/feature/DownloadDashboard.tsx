import { useState, useEffect, useCallback } from 'react';
import { getDownloadStats, type DownloadStats, type DownloadSource } from '@/utils/downloadTracker';
import { supabase } from '@/lib/supabase';
import { WorldMap } from './WorldMap';

const SOURCE_LABELS: Record<DownloadSource, string> = {
  hero: 'Section Hero',
  'exit-popup': 'Pop-up de sortie',
  'case-studies': 'Études de cas',
  'thank-you': 'Page de remerciement',
  other: 'Autre',
};

const SOURCE_ICONS: Record<DownloadSource, string> = {
  hero: 'ri-home-4-line',
  'exit-popup': 'ri-door-open-line',
  'case-studies': 'ri-trophy-line',
  'thank-you': 'ri-heart-line',
  other: 'ri-more-line',
};

const SOURCE_COLORS: Record<DownloadSource, string> = {
  hero: 'bg-primary-100 text-primary-700',
  'exit-popup': 'bg-accent-100 text-accent-700',
  'case-studies': 'bg-secondary-100 text-secondary-700',
  'thank-you': 'bg-emerald-100 text-emerald-700',
  other: 'bg-foreground-100 text-foreground-600',
};

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function formatDayLabel(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function getCountryFlag(countryName: string): string {
  const flags: Record<string, string> = {
    'Ivory Coast': '🇨🇮', 'Côte d\'Ivoire': '🇨🇮',
    'Senegal': '🇸🇳', 'Sénégal': '🇸🇳',
    'Mali': '🇲🇱',
    'Burkina Faso': '🇧🇫',
    'Guinea': '🇬🇳', 'Guinée': '🇬🇳',
    'Togo': '🇹🇬',
    'Benin': '🇧🇯', 'Bénin': '🇧🇯',
    'Niger': '🇳🇪',
    'Cameroon': '🇨🇲', 'Cameroun': '🇨🇲',
    'Congo': '🇨🇬',
    'Democratic Republic of the Congo': '🇨🇩',
    'Gabon': '🇬🇦',
    'Madagascar': '🇲🇬',
    'Morocco': '🇲🇦', 'Maroc': '🇲🇦',
    'Tunisia': '🇹🇳', 'Tunisie': '🇹🇳',
    'Algeria': '🇩🇿', 'Algérie': '🇩🇿',
    'France': '🇫🇷',
    'Belgium': '🇧🇪', 'Belgique': '🇧🇪',
    'Switzerland': '🇨🇭', 'Suisse': '🇨🇭',
    'Canada': '🇨🇦',
    'United States': '🇺🇸', 'États-Unis': '🇺🇸',
    'United Kingdom': '🇬🇧', 'Royaume-Uni': '🇬🇧',
    'Germany': '🇩🇪', 'Allemagne': '🇩🇪',
    'Ghana': '🇬🇭',
    'Nigeria': '🇳🇬',
    'Kenya': '🇰🇪',
    'Ethiopia': '🇪🇹', 'Éthiopie': '🇪🇹',
    'Tanzania': '🇹🇿', 'Tanzanie': '🇹🇿',
    'Rwanda': '🇷🇼',
    'Mauritius': '🇲🇺', 'Maurice': '🇲🇺',
    'Mozambique': '🇲🇿',
    'Angola': '🇦🇴',
    'Zambia': '🇿🇲', 'Zambie': '🇿🇲',
    'Zimbabwe': '🇿🇼',
    'South Africa': '🇿🇦', 'Afrique du Sud': '🇿🇦',
  };
  return flags[countryName] ?? '🌍';
}

type Period = 7 | 30 | null;

const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: '7 jours', value: 7 },
  { label: '30 jours', value: 30 },
  { label: 'Tout', value: null },
];

interface DownloadDashboardProps {
  onClose: () => void;
}

export function DownloadDashboard({ onClose }: DownloadDashboardProps) {
  const [stats, setStats] = useState<DownloadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'countries' | 'history'>('overview');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [period, setPeriod] = useState<Period>(30);

  const loadStats = useCallback(async () => {
    setLoading(true);
    const data = await getDownloadStats(period);
    setStats(data);
    setLastRefresh(new Date());
    setLoading(false);
  }, [period]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Abonnement temps réel Supabase
  useEffect(() => {
    const channel = supabase
      .channel('downloads-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'downloads' }, () => {
        loadStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadStats]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const last7Days = getLast7Days();
  const maxDayCount = stats ? Math.max(...last7Days.map((d) => stats.byDay[d] ?? 0), 1) : 1;
  const topSource = stats
    ? (Object.entries(stats.bySource) as [DownloadSource, number][]).sort((a, b) => b[1] - a[1])[0]
    : null;
  const topCountries = stats
    ? Object.entries(stats.byCountry)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
    : [];
  const maxCountryCount = topCountries.length > 0 ? topCountries[0][1] : 1;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-foreground-950 to-foreground-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-500/20 border border-primary-400/30">
              <i className="ri-bar-chart-2-line text-primary-400 text-lg"></i>
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                Suivi des téléchargements
                <span className="flex items-center gap-1 px-2 py-0.5 bg-accent-500/20 border border-accent-400/30 rounded-full text-accent-300 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse inline-block"></span>
                  Temps réel
                </span>
              </h2>
              <p className="text-white/50 text-xs">
                KHEPRA EXPERTS — Données centralisées · Mis à jour {formatDate(lastRefresh.toISOString())}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadStats}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Actualiser"
            >
              <i className={`ri-refresh-line text-base ${loading ? 'animate-spin' : ''}`}></i>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Barre de filtres période + onglets */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 flex-shrink-0">
          {/* Onglets */}
          <div className="flex">
            {(['overview', 'countries', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-foreground-400 hover:text-foreground-600'
                }`}
              >
                {tab === 'overview' ? 'Vue d\'ensemble' : tab === 'countries' ? '🌍 Pays' : 'Historique'}
              </button>
            ))}
          </div>

          {/* Sélecteur de période */}
          <div className="flex items-center gap-1 bg-stone-100 rounded-full px-1 py-1">
            {PERIOD_OPTIONS.map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setPeriod(opt.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  period === opt.value
                    ? 'bg-foreground-950 text-primary-400 shadow-sm'
                    : 'text-foreground-500 hover:text-foreground-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          {loading && !stats ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <i className="ri-loader-4-line text-3xl text-primary-500 animate-spin"></i>
              <p className="text-foreground-400 text-sm">Chargement des données Supabase…</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && stats && (
                <div className="space-y-6">
                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-primary-200/50 rounded-xl p-4 text-center border border-secondary-200">
                      <p className="text-3xl font-bold text-foreground-950">{stats.total}</p>
                      <p className="text-white/60 text-xs mt-1">Total téléchargements</p>
                      <p className="text-white/30 text-xs mt-0.5">
                        {period ? `${period} derniers jours` : 'Toutes périodes'}
                      </p>
                    </div>
                    <div className="bg-background-100 rounded-xl p-4 text-center border border-secondary-200">
                      <p className="text-3xl font-bold text-foreground-950">
                        {last7Days.reduce((acc, d) => acc + (stats.byDay[d] ?? 0), 0)}
                      </p>
                      <p className="text-foreground-400 text-xs mt-1">7 derniers jours</p>
                    </div>
                    <div className="bg-background-100 rounded-xl p-4 text-center border border-secondary-200">
                      <p className="text-2xl mb-0.5">
                        {topCountries.length > 0 ? getCountryFlag(topCountries[0][0]) : '🌍'}
                      </p>
                      <p className="text-xs font-semibold text-foreground-950 leading-tight truncate">
                        {topCountries.length > 0 ? topCountries[0][0] : '—'}
                      </p>
                      <p className="text-foreground-400 text-xs mt-0.5">Pays principal</p>
                    </div>
                  </div>

                  {/* Graphique 7 jours */}
                  <div>
                    <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">
                      Activité — 7 derniers jours
                    </h3>
                    <div className="flex items-end gap-2 h-24">
                      {last7Days.map((day) => {
                        const count = stats.byDay[day] ?? 0;
                        const heightPct = maxDayCount > 0 ? (count / maxDayCount) * 100 : 0;
                        return (
                          <div key={day} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-xs font-medium text-foreground-950">{count > 0 ? count : ''}</span>
                            <div className="w-full rounded-t-md bg-gray-100 relative" style={{ height: '64px' }}>
                              <div
                                className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 transition-all duration-500"
                                style={{ height: `${heightPct}%`, minHeight: count > 0 ? '4px' : '0' }}
                              />
                            </div>
                            <span className="text-xs text-foreground-400 whitespace-nowrap">{formatDayLabel(day)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Par source */}
                  <div>
                    <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">
                      Répartition par source
                    </h3>
                    <div className="space-y-2">
                      {(Object.entries(stats.bySource) as [DownloadSource, number][])
                        .sort((a, b) => b[1] - a[1])
                        .map(([source, count]) => {
                          const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                          return (
                            <div key={source} className="flex items-center gap-3">
                              <div className={`w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 ${SOURCE_COLORS[source]}`}>
                                <i className={`${SOURCE_ICONS[source]} text-sm`}></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium text-foreground-700 truncate">{SOURCE_LABELS[source]}</span>
                                  <span className="text-xs text-foreground-400 ml-2 flex-shrink-0">{count} ({pct}%)</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Top 3 pays */}
                  {topCountries.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        Top pays
                        <button
                          onClick={() => setActiveTab('countries')}
                          className="text-primary-500 hover:text-primary-600 cursor-pointer font-normal normal-case tracking-normal"
                        >
                          Voir tout →
                        </button>
                      </h3>
                      <div className="flex gap-3">
                        {topCountries.slice(0, 3).map(([country, count], idx) => (
                          <div key={country} className="flex-1 bg-stone-50 border border-gray-100 rounded-xl p-3 text-center">
                            <div className="text-2xl mb-1">{getCountryFlag(country)}</div>
                            <p className="text-xs font-semibold text-foreground-950 truncate">{country}</p>
                            <p className="text-xs text-foreground-400">{count} dl</p>
                            {idx === 0 && <span className="text-xs text-primary-500">🥇</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dernier téléchargement */}
                  {stats.lastDownload && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 flex-shrink-0">
                        <i className="ri-time-line text-emerald-600 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-800">Dernier téléchargement</p>
                        <p className="text-xs text-emerald-600">
                          {formatDate(stats.lastDownload.created_at)} — via {SOURCE_LABELS[stats.lastDownload.source as DownloadSource]}
                          {stats.lastDownload.country && ` · ${getCountryFlag(stats.lastDownload.country)} ${stats.lastDownload.country}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {stats.total === 0 && (
                    <div className="text-center py-8">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-stone-100 mx-auto mb-3">
                        <i className="ri-download-line text-2xl text-foreground-300"></i>
                      </div>
                      <p className="text-foreground-400 text-sm">Aucun téléchargement sur cette période.</p>
                      <p className="text-foreground-300 text-xs mt-1">Essayez d'élargir la période de filtrage.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'countries' && stats && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider">
                      Provenance géographique
                    </h3>
                    <span className="text-xs text-foreground-400">{topCountries.length} pays détectés</span>
                  </div>

                  {topCountries.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-3">🌍</div>
                      <p className="text-foreground-400 text-sm">Aucune donnée géographique sur cette période.</p>
                      <p className="text-foreground-300 text-xs mt-1">Essayez d'élargir la période de filtrage.</p>
                    </div>
                  ) : (
                    <>
                      {/* Carte interactive */}
                      <WorldMap countryData={topCountries} totalDownloads={stats.total} />

                      {/* Podium top 3 */}
                      {topCountries.length >= 3 && (
                        <div className="flex items-end justify-center gap-3 py-4">
                          {/* 2e */}
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl">{getCountryFlag(topCountries[1][0])}</span>
                            <p className="text-xs font-medium text-foreground-700 text-center max-w-[70px] truncate">{topCountries[1][0]}</p>
                            <div className="w-16 bg-gray-200 rounded-t-lg flex items-end justify-center" style={{ height: '48px' }}>
                              <span className="text-xs font-bold text-foreground-500 pb-1">{topCountries[1][1]}</span>
                            </div>
                            <span className="text-sm">🥈</span>
                          </div>
                          {/* 1er */}
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-3xl">{getCountryFlag(topCountries[0][0])}</span>
                            <p className="text-xs font-semibold text-foreground-950 text-center max-w-[70px] truncate">{topCountries[0][0]}</p>
                            <div className="w-16 bg-primary-500 rounded-t-lg flex items-end justify-center" style={{ height: '72px' }}>
                              <span className="text-xs font-bold text-white pb-1">{topCountries[0][1]}</span>
                            </div>
                            <span className="text-sm">🥇</span>
                          </div>
                          {/* 3e */}
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl">{getCountryFlag(topCountries[2][0])}</span>
                            <p className="text-xs font-medium text-foreground-700 text-center max-w-[70px] truncate">{topCountries[2][0]}</p>
                            <div className="w-16 bg-accent-200 rounded-t-lg flex items-end justify-center" style={{ height: '36px' }}>
                              <span className="text-xs font-bold text-accent-700 pb-1">{topCountries[2][1]}</span>
                            </div>
                            <span className="text-sm">🥉</span>
                          </div>
                        </div>
                      )}

                      {/* Liste complète */}
                      <div className="space-y-2">
                        {topCountries.map(([country, count], idx) => {
                          const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                          const barPct = maxCountryCount > 0 ? Math.round((count / maxCountryCount) * 100) : 0;
                          return (
                            <div key={country} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-gray-100">
                              <span className="text-xs font-bold text-foreground-300 w-5 text-right flex-shrink-0">#{idx + 1}</span>
                              <span className="text-xl flex-shrink-0">{getCountryFlag(country)}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-semibold text-foreground-800 truncate">{country}</span>
                                  <span className="text-xs text-foreground-400 ml-2 flex-shrink-0">{count} ({pct}%)</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all duration-500"
                                    style={{ width: `${barPct}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'history' && stats && (
                <div>
                  {stats.events.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-foreground-400 text-sm">Aucun historique sur cette période.</p>
                      <p className="text-foreground-300 text-xs mt-1">Essayez d'élargir la période de filtrage.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {stats.events.slice(0, 100).map((ev) => (
                        <div key={ev.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-gray-100">
                          <div className={`w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 ${SOURCE_COLORS[ev.source as DownloadSource]}`}>
                            <i className={`${SOURCE_ICONS[ev.source as DownloadSource]} text-xs`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground-700">{SOURCE_LABELS[ev.source as DownloadSource]}</p>
                            <p className="text-xs text-foreground-400">{formatDate(ev.created_at)}</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {ev.country && (
                              <span className="text-xs bg-accent-100 text-accent-700 border border-accent-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span>{getCountryFlag(ev.country)}</span>
                                <span className="max-w-[80px] truncate">{ev.country}</span>
                              </span>
                            )}
                            <span className="text-xs text-foreground-300 truncate max-w-[80px]">{ev.page}</span>
                          </div>
                        </div>
                      ))}
                      {stats.events.length > 100 && (
                        <p className="text-center text-xs text-foreground-400 pt-2">
                          + {stats.events.length - 100} entrées supplémentaires
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Pied de panneau */}
        <div className="border-t border-secondary-200 px-6 py-3 flex items-center justify-between flex-shrink-0 bg-background-100">
          <p className="text-xs text-foreground-400 flex items-center gap-1.5">
            <i className="ri-database-2-line text-accent-500"></i>
            Données centralisées Supabase — accès via <kbd className="px-1.5 py-0.5 bg-secondary-200 rounded text-foreground-600 font-mono text-xs">Ctrl+Shift+K</kbd>
          </p>
          <button
            onClick={loadStats}
            className="text-xs px-3 py-1.5 rounded-lg bg-secondary-100 text-foreground-500 hover:bg-secondary-200 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <i className={`ri-refresh-line ${loading ? 'animate-spin' : ''}`}></i>
            Actualiser
          </button>
        </div>
      </div>
    </div>
  );
}
