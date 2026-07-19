import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { useUrlChecker } from '@/pages/monitoring/hooks/useUrlChecker';
import { UrlCheckResult } from '@/pages/monitoring/hooks/useUrlChecker';
import { useKOSNotifications } from '@/hooks/useKOSNotifications';
import { useAutoCorrectionTickets } from '@/hooks/useAutoCorrectionTickets';
import TicketBoard from '@/components/feature/TicketBoard';
import DomainVerifyPanel from '';

export default function urlAutoPointagePage() {
  const { t } = useTranslation();
  const { results, stats, loading, crawling, error, refresh, triggerCrawl } = useUrlChecker();
  const { events } = useKOSNotifications();
  const ticketHook = useAutoCorrectionTickets('url_auto_pointage');
  const [crawlFeedback, setCrawlFeedback] = useState<string | null>(null);
  const [showBrokenOnly, setShowBrokenOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'broken' | 'domain' | 'tickets' | 'history' | 'alerts'>('overview');

  const urlNotifications = events.filter(
    (n) => (n as Record<string, unknown>).hub_name === 'URL Auto-Pointage' || (n as Record<string, unknown>).hub_name === 'crawl-internal-links'
  );

  const ticketNotifications = events.filter(
    (n) => (n as Record<string, unknown>).title && String((n as Record<string, unknown>).title).startsWith('Ticket')
  );

  const handleTriggerCrawl = async (mode: 'full' | 'pages') => {
    setCrawlFeedback(null);
    try {
      const data = await triggerCrawl(mode);
      setCrawlFeedback(
        `Crawl terminé — ${data.stats.total_checked} URLs vérifiées, ${data.stats.broken} cassées`
      );
    } catch {
      setCrawlFeedback('Erreur lors du crawl');
    }
  };

  const filteredResults = showBrokenOnly ? results.filter((r) => r.is_broken) : results;
  const brokenResults = results.filter((r) => r.is_broken);
  const pageStatusResults = results.filter((r) => r.check_type === 'page_status' && r.is_broken);
  const internalLinkResults = results.filter((r) => r.check_type === 'internal_link' && r.is_broken);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (result: UrlCheckResult) => {
    if (result.is_broken) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
          {result.status_code || 'ERR'}
        </span>
      );
    }
    if (result.redirect_url) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
          {result.status_code}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
        {result.status_code}
      </span>
    );
  };

  return (
    <>
      <SeoHead
        title="KOS URL Auto-Pointage — KHEPRA EXPERTS"
        description="Automate de surveillance automatique des URLs khepraexperts.com — decouverte dynamique via sitemap, detection de liens casses, alertes critiques"
        canonicalPath="/kos-url-auto-pointage"
        noIndex={true}
      />
      <hubLayout hubId={49} activeTab="Auto-Pointage" tabLabel="URL Auto-Pointage">
        <div className="bg-background-50 min-h-screen">
          {/* Header Section */}
          <div className="bg-background-100 border-b border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <i className="ri-radar-line text-primary-600 text-xl"></i>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground-950">
                      {t('urlAutoPointage.title') || 'URL Auto-Pointage'}
                    </h1>
                    <p className="text-sm text-foreground-600">
                      {t('urlAutoPointage.subtitle') || 'Surveillance automatique de toutes les URLs sur khepraexperts.com'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-900">
                    <i className="ri-time-line text-accent-600"></i>
                    {t('urlAutoPointage.cron') || 'Cron quotidien 04h00'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-900">
                    <i className="ri-pages-line text-primary-600"></i>
                    {t('urlAutoPointage.sitemapMode') || 'Auto-decouverte sitemap'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tab Switcher */}
            <div className="flex items-center bg-background-100 rounded-xl p-1 mb-6 border border-background-200 w-fit">
              {(['overview', 'broken', 'domain', 'tickets', 'history', 'alerts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-primary-500 text-background-50'
                      : 'text-foreground-600 hover:text-foreground-900'
                  }`}
                  type="button"
                >
                  {tab === 'overview' && <><i className="ri-dashboard-line mr-1.5"></i>Vue d'ensemble</>}
                  {tab === 'broken' && <><i className="ri-error-warning-line mr-1.5"></i>Liens cassés</>}
                  {tab === 'domain' && <><i className="ri-shield-check-line mr-1.5"></i>Domaine</>}
                  {tab === 'tickets' && (
                    <>
                      <i className="ri-ticket-2-line mr-1.5"></i>
                      Tickets
                      {(ticketHook.stats.open + ticketHook.stats.in_progress) > 0 && (
                        <span className="ml-1.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-red-500 text-white text-[10px] rounded-full">
                          {ticketHook.stats.open + ticketHook.stats.in_progress}
                        </span>
                      )}
                    </>
                  )}
                  {tab === 'history' && <><i className="ri-history-line mr-1.5"></i>Historique</>}
                  {tab === 'alerts' && (
                    <>
                      <i className="ri-notification-3-line mr-1.5"></i>
                      Alertes
                      {urlNotifications.length > 0 && (
                        <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-[10px] rounded-full">
                          {urlNotifications.length}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                {stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                    <div className="bg-background-50 rounded-xl border border-background-200 p-4">
                      <div className="text-2xl font-bold text-foreground-950">{stats.total_checked}</div>
                      <p className="text-xs text-foreground-600 mt-1">URLs vérifiées</p>
                    </div>
                    <div className={`bg-background-50 rounded-xl border p-4 ${stats.broken > 0 ? 'border-red-200' : 'border-background-200'}`}>
                      <div className={`text-2xl font-bold ${stats.broken > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{stats.broken}</div>
                      <p className="text-xs text-foreground-600 mt-1">Liens cassés</p>
                    </div>
                    <div className="bg-background-50 rounded-xl border border-background-200 p-4">
                      <div className="text-2xl font-bold text-amber-600">{stats.redirected}</div>
                      <p className="text-xs text-foreground-600 mt-1">Redirections</p>
                    </div>
                    <div className="bg-background-50 rounded-xl border border-background-200 p-4">
                      <div className="text-2xl font-bold text-emerald-600">{stats.ok}</div>
                      <p className="text-xs text-foreground-600 mt-1">OK</p>
                    </div>
                    <div className="bg-background-50 rounded-xl border border-background-200 p-4 hidden sm:block">
                      <div className="text-2xl font-bold text-primary-600">{stats.internal_links_checked}</div>
                      <p className="text-xs text-foreground-600 mt-1">Liens internes</p>
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background-100 rounded-xl border border-background-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <i className="ri-link-unlink text-secondary-600 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground-950">Dernier check</h3>
                      <p className="text-sm text-foreground-600">
                        {stats?.last_checked_at
                          ? `Dernier check : ${formatDate(stats.last_checked_at)}`
                          : 'Aucun check effectué'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTriggerCrawl('pages')}
                      disabled={crawling}
                      className="px-3 py-2 text-sm font-medium text-foreground-700 bg-background-200 hover:bg-background-300 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                      type="button"
                    >
                      <i className="ri-file-list-3-line mr-1.5"></i>
                      Pages
                    </button>
                    <button
                      onClick={() => handleTriggerCrawl('full')}
                      disabled={crawling}
                      className="px-4 py-2 text-sm font-medium text-background-50 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                      type="button"
                    >
                      {crawling ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-1.5"></i>
                          Crawl en cours...
                        </>
                      ) : (
                        <>
                          <i className="ri-search-eye-line mr-1.5"></i>
                          Crawl complet
                        </>
                      )}
                    </button>
                    <button
                      onClick={refresh}
                      disabled={loading}
                      className="p-2 text-foreground-600 hover:text-foreground-900 hover:bg-background-200 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                      type="button"
                      aria-label="Rafraîchir"
                    >
                      <i className={`ri-refresh-line text-lg ${loading ? 'animate-spin' : ''}`}></i>
                    </button>
                  </div>
                </div>

                {crawlFeedback && (
                  <div className={`p-3 rounded-lg text-sm font-medium ${crawlFeedback.includes('Erreur') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                    <i className={`${crawlFeedback.includes('Erreur') ? 'ri-error-warning-line' : 'ri-check-line'} mr-1.5`}></i>
                    {crawlFeedback}
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-red-700 text-sm">{error}</p>
                    <button
                      onClick={refresh}
                      className="mt-2 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
                      type="button"
                    >
                      Réessayer
                    </button>
                  </div>
                )}

                {/* Results Table */}
                {results.length > 0 && (
                  <div className="bg-background-50 rounded-xl border border-background-200 overflow-hidden">
                    <div className="flex items-center gap-3 p-4 border-b border-background-200">
                      <div className="flex items-center bg-background-100 rounded-lg p-1">
                        <button
                          onClick={() => setShowBrokenOnly(false)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${!showBrokenOnly ? 'bg-background-50 text-foreground-900 shadow-sm' : 'text-foreground-600'}`}
                          type="button"
                        >
                          Tous ({results.length})
                        </button>
                        <button
                          onClick={() => setShowBrokenOnly(true)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${showBrokenOnly ? 'bg-background-50 text-red-700 shadow-sm' : 'text-foreground-600'}`}
                          type="button"
                        >
                          <i className="ri-error-warning-line mr-1"></i>
                          Cassés ({brokenResults.length})
                        </button>
                      </div>
                      {brokenResults.length > 0 && (
                        <span className="text-xs text-foreground-600">
                          {pageStatusResults.length} pages · {internalLinkResults.length} liens internes
                        </span>
                      )}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-background-200 bg-background-100">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider">URL</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider hidden md:table-cell">Source</th>
                            <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider w-24">Statut</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider hidden lg:table-cell">Erreur</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-background-100">
                          {filteredResults.slice(0, 50).map((result) => (
                            <tr key={result.id} className={`hover:bg-background-100 transition-colors ${result.is_broken ? 'bg-red-50/50' : ''}`}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2 min-w-0">
                                  {result.is_broken && (
                                    <div className="w-5 h-5 bg-red-100 rounded flex items-center justify-center shrink-0">
                                      <i className="ri-close-line text-red-500 text-xs"></i>
                                    </div>
                                  )}
                                  <span className="text-sm text-foreground-800 truncate max-w-[200px] sm:max-w-xs md:max-w-sm font-mono" title={result.target_url}>
                                    {result.target_url}
                                  </span>
                                  {result.check_type === 'internal_link' && (
                                    <span className="text-[10px] text-foreground-400 bg-background-100 px-1.5 py-0.5 rounded hidden sm:inline whitespace-nowrap">lien</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 hidden md:table-cell">
                                {result.source_url ? (
                                  <span className="text-xs text-foreground-600 truncate max-w-[150px] block" title={result.source_url}>
                                    {result.source_url}
                                  </span>
                                ) : (
                                  <span className="text-xs text-foreground-400">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">{getStatusBadge(result)}</td>
                              <td className="px-4 py-3 hidden lg:table-cell">
                                <span className="text-xs text-foreground-500 truncate max-w-[200px] block">
                                  {result.error_message || (result.redirect_url ? `→ ${result.redirect_url}` : '—')}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {filteredResults.length > 50 && (
                      <div className="px-4 py-3 bg-background-100 border-t border-background-200 text-center">
                        <p className="text-xs text-foreground-600">
                          Affichage de 50 résultats sur {filteredResults.length}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {!loading && stats && stats.total_checked === 0 && (
                  <div className="text-center py-10 bg-background-50 rounded-xl border border-background-200">
                    <div className="w-12 h-12 bg-background-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-link-unlink-m text-foreground-400 text-xl"></i>
                    </div>
                    <p className="text-sm text-foreground-700 font-medium">Aucune donnée de crawl</p>
                    <p className="text-xs text-foreground-500 mt-1">Lancez un premier crawl pour vérifier toutes les URLs</p>
                    <button
                      onClick={() => handleTriggerCrawl('full')}
                      disabled={crawling}
                      className="mt-4 px-4 py-2 text-sm font-medium text-background-50 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                      type="button"
                    >
                      <i className="ri-play-line mr-1.5"></i>
                      Lancer le premier crawl
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Broken Links Tab */}
            {activeTab === 'broken' && (
              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="ri-error-warning-line text-red-600 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-red-900">Liens cassés</h3>
                      <p className="text-sm text-red-600">{brokenResults.length} URL(s) détectée(s) comme cassées</p>
                    </div>
                  </div>
                  {brokenResults.length > 0 ? (
                    <div className="overflow-x-auto bg-white rounded-lg border border-red-100">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-red-100 bg-red-50">
                            <th className="text-left px-4 py-2 text-xs font-semibold text-red-700">URL</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold text-red-700">Source</th>
                            <th className="text-center px-4 py-2 text-xs font-semibold text-red-700">Code</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold text-red-700">Erreur</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50">
                          {brokenResults.map((result) => (
                            <tr key={result.id} className="hover:bg-red-50/50">
                              <td className="px-4 py-2">
                                <span className="text-sm text-red-800 font-mono truncate max-w-xs block">{result.target_url}</span>
                              </td>
                              <td className="px-4 py-2">
                                <span className="text-xs text-red-600">{result.source_url || '—'}</span>
                              </td>
                              <td className="px-4 py-2 text-center">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                  {result.status_code || 'ERR'}
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                <span className="text-xs text-red-600">{result.error_message || '—'}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-check-double-line text-green-600 text-xl"></i>
                      </div>
                      <p className="text-sm font-medium text-green-700">Aucun lien cassé détecté</p>
                      <p className="text-xs text-green-600 mt-1">Toutes les URLs sont fonctionnelles</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Domain Verification Tab — NOUVEAU: Auto-contrôle du pointage khepraexperts.com */}
            {activeTab === 'domain' && (
              <div className="space-y-6">
                <div className="bg-accent-50 rounded-xl border border-accent-200 p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center shrink-0">
                      <i className="ri-radar-line text-accent-600 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-accent-900">Auto-Contrôle du Pointage Domaine</h3>
                      <p className="text-sm text-accent-700 mt-1">
                        Scan en temps réel de tous les fichiers publics (sitemaps, robots.txt, RSS, LLMs.txt) et pages clés
                        pour détecter toute URL qui ne pointe PAS vers <strong>khepraexperts.com</strong>.
                        Détection automatique de <code className="bg-accent-100 px-1 rounded text-xs">example.com</code>,{' '}
                        <code className="bg-accent-100 px-1 rounded text-xs">localhost</code>, et tout autre domaine incorrect.
                      </p>
                    </div>
                  </div>
                </div>
                <DomainVerifyPanel />
              </div>
            )}

            {/* Tickets Tab — Auto-Correction System */}
            {activeTab === 'tickets' && (
              <TicketBoard
                tickets={ticketHook.tickets}
                stats={ticketHook.stats}
                loading={ticketHook.loading}
                syncing={ticketHook.syncing}
                error={ticketHook.error}
                onStatusChange={ticketHook.updateTicketStatus}
                onSync={ticketHook.syncTicketsFromCrawl}
                crossResolutionAlerts={ticketHook.crossResolutionAlerts}
                crossResolving={ticketHook.crossResolving}
                onAcknowledgeCrossAlert={ticketHook.acknowledgeCrossAlert}
              />
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="bg-background-50 rounded-xl border border-background-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <i className="ri-history-line text-secondary-600 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground-950">Historique des scans</h3>
                      <p className="text-sm text-foreground-600">Les 5 derniers runs sont conservés automatiquement</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {stats?.last_checked_at ? (
                      <div className="flex items-center justify-between p-4 bg-background-100 rounded-lg border border-background-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-100 rounded flex items-center justify-center">
                            <i className="ri-check-line text-primary-600"></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground-900">Run {stats.last_check_run_id?.slice(-6)}</p>
                            <p className="text-xs text-foreground-500">{formatDate(stats.last_checked_at)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-foreground-700">{stats.total_checked} URLs</span>
                          <span className={`${stats.broken > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {stats.broken} cassés
                          </span>
                          <span className="text-foreground-500">{stats.ok} OK</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground-500 text-center py-8">Aucun historique disponible</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Alerts Tab */}
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div className="bg-background-50 rounded-xl border border-background-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <i className="ri-notification-3-line text-accent-600 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground-950">Alertes cross-hub</h3>
                      <p className="text-sm text-foreground-600">Notifications critiques générées par le pointage auto-piloté</p>
                    </div>
                  </div>
                  {urlNotifications.length > 0 ? (
                    <div className="space-y-2">
                      {urlNotifications.map((n) => (
                        <div key={n.id} className={`flex items-start gap-3 p-4 rounded-lg border ${n.event_type === 'critical' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                          <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${n.event_type === 'critical' ? 'bg-red-100' : 'bg-amber-100'}`}>
                            <i className={`${n.event_type === 'critical' ? 'ri-error-warning-line text-red-600' : 'ri-alert-line text-amber-600'}`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground-900">{n.message}</p>
                            <p className="text-xs text-foreground-500 mt-1">{n.hub_name}</p>
                          </div>
                          <span className="text-xs text-foreground-400 whitespace-nowrap">{formatDate(n.created_at)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-check-double-line text-green-600 text-xl"></i>
                      </div>
                      <p className="text-sm font-medium text-green-700">Aucune alerte active</p>
                      <p className="text-xs text-green-600 mt-1">Tout est nominal</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </hubLayout>
    </>
  );
}



