import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUrlChecker, UrlCheckResult } from '@/pages/monitoring/hooks/useUrlChecker';

export default function UrlCheckerSection() {
  const { t } = useTranslation();
  const { results, stats, loading, crawling, error, refresh, triggerCrawl } = useUrlChecker();
  const [crawlFeedback, setCrawlFeedback] = useState<string | null>(null);
  const [showBrokenOnly, setShowBrokenOnly] = useState(false);

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

  const filteredResults = showBrokenOnly
    ? results.filter((r) => r.is_broken)
    : results;

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
    <div className="space-y-6">
      {/* Header with action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center">
              <i className="ri-link-unlink text-rose-500 text-lg"></i>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {t('monitoring.urlChecker.title') || 'Vérificateur de liens'}
              </h3>
              <p className="text-sm text-slate-500">
                {stats?.last_checked_at
                  ? `${t('monitoring.urlChecker.lastCheck') || 'Dernier check'} : ${formatDate(stats.last_checked_at)}`
                  : t('monitoring.urlChecker.noCheck') || 'Aucun check effectué'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTriggerCrawl('pages')}
            disabled={crawling}
            className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            type="button"
          >
            <i className="ri-file-list-3-line mr-1.5"></i>
            Pages
          </button>
          <button
            onClick={() => handleTriggerCrawl('full')}
            disabled={crawling}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
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
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            type="button"
            aria-label="Rafraîchir"
          >
            <i className={`ri-refresh-line text-lg ${loading ? 'animate-spin' : ''}`}></i>
          </button>
        </div>
      </div>

      {/* Feedback banner */}
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

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-2xl font-bold text-slate-900">{stats.total_checked}</div>
            <p className="text-xs text-slate-500 mt-1">URLs vérifiées</p>
          </div>
          <div className={`bg-white rounded-xl border p-4 ${stats.broken > 0 ? 'border-red-200' : 'border-slate-200'}`}>
            <div className={`text-2xl font-bold ${stats.broken > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{stats.broken}</div>
            <p className="text-xs text-slate-500 mt-1">Liens cassés</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-2xl font-bold text-amber-600">{stats.redirected}</div>
            <p className="text-xs text-slate-500 mt-1">Redirections</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-2xl font-bold text-emerald-600">{stats.ok}</div>
            <p className="text-xs text-slate-500 mt-1">OK</p>
          </div>
        </div>
      )}

      {/* Filters */}
      {results.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setShowBrokenOnly(false)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${!showBrokenOnly ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              type="button"
            >
              Tous ({results.length})
            </button>
            <button
              onClick={() => setShowBrokenOnly(true)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${showBrokenOnly ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              type="button"
            >
              <i className="ri-error-warning-line mr-1"></i>
              Cassés ({brokenResults.length})
            </button>
          </div>
          {brokenResults.length > 0 && (
            <span className="text-xs text-slate-500">
              {pageStatusResults.length} pages · {internalLinkResults.length} liens internes
            </span>
          )}
        </div>
      )}

      {/* Results table */}
      {loading && !results.length ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-slate-300 border-t-rose-500"></div>
          <p className="mt-3 text-sm text-slate-500">Chargement des résultats...</p>
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">URL</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Source</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Statut</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Erreur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.slice(0, 50).map((result) => (
                  <tr key={result.id} className={`hover:bg-slate-50 transition-colors ${result.is_broken ? 'bg-red-50/50' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 min-w-0">
                        {result.is_broken && (
                          <div className="w-5 h-5 bg-red-100 rounded flex items-center justify-center shrink-0">
                            <i className="ri-close-line text-red-500 text-xs"></i>
                          </div>
                        )}
                        <span className="text-sm text-slate-800 truncate max-w-[200px] sm:max-w-xs md:max-w-sm font-mono" title={result.target_url}>
                          {result.target_url}
                        </span>
                        {result.check_type === 'internal_link' && (
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded hidden sm:inline whitespace-nowrap">lien</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {result.source_url ? (
                        <span className="text-xs text-slate-500 truncate max-w-[150px] block" title={result.source_url}>
                          {result.source_url}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(result)}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-slate-500 truncate max-w-[200px] block">
                        {result.error_message || (result.redirect_url ? `→ ${result.redirect_url}` : '—')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredResults.length > 50 && (
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500">
                Affichage de 50 résultats sur {filteredResults.length}
              </p>
            </div>
          )}
        </div>
      ) : !loading && stats && stats.total_checked === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl border border-slate-200">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-link-unlink-m text-slate-400 text-xl"></i>
          </div>
          <p className="text-sm text-slate-600 font-medium">Aucune donnée de crawl</p>
          <p className="text-xs text-slate-500 mt-1">Lancez un premier crawl pour vérifier toutes les URLs</p>
          <button
            onClick={() => handleTriggerCrawl('full')}
            disabled={crawling}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            type="button"
          >
            <i className="ri-play-line mr-1.5"></i>
            Lancer le premier crawl
          </button>
        </div>
      ) : null}
    </div>
  );
}