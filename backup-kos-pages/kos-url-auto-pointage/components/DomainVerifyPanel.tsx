import { useState } from 'react';
import { useUrlDomainVerify, DomainViolation } from '@/hooks/useUrlDomainVerify';

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'critical':
      return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'CRITIQUE' };
    case 'high':
      return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'HAUT' };
    case 'medium':
      return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', dot: 'bg-yellow-500', label: 'MOYEN' };
    case 'low':
      return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400', label: 'BAS' };
    default:
      return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-400', label: severity };
  }
}

function getUrlTypeLabel(urlType: string): string {
  switch (urlType) {
    case 'sitemap_url': return 'Sitemap';
    case 'canonical': return 'Canonical';
    case 'og_url': return 'OG URL';
    case 'hreflang': return 'Hreflang';
    case 'internal_link': return 'Lien interne';
    case 'robots_link': return 'Robots.txt';
    case 'rss_link': return 'RSS';
    case 'llms_link': return 'LLMs.txt';
    default: return urlType;
  }
}

function getUrlTypeIcon(urlType: string): string {
  switch (urlType) {
    case 'sitemap_url': return 'ri-node-tree';
    case 'canonical': return 'ri-link';
    case 'og_url': return 'ri-share-line';
    case 'hreflang': return 'ri-global-line';
    case 'internal_link': return 'ri-link-m';
    case 'robots_link': return 'ri-robot-2-line';
    case 'rss_link': return 'ri-rss-line';
    case 'llms_link': return 'ri-file-text-line';
    default: return 'ri-question-line';
  }
}

export default function DomainVerifyPanel() {
  const { violations, stats, loading, error, scan } = useUrlDomainVerify();
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'sitemap' | 'canonical'>('all');
  const [showFixUrls, setShowFixUrls] = useState(false);

  const filteredViolations = violations.filter((v) => {
    if (filter === 'critical') return v.severity === 'critical';
    if (filter === 'high') return v.severity === 'high' || v.severity === 'critical';
    if (filter === 'sitemap') return v.url_type === 'sitemap_url';
    if (filter === 'canonical') return v.url_type === 'canonical' || v.url_type === 'og_url' || v.url_type === 'hreflang';
    return true;
  });

  const criticalCount = violations.filter((v) => v.severity === 'critical').length;
  const highCount = violations.filter((v) => v.severity === 'high').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="bg-background-50 rounded-xl border border-background-200 p-4">
          <div className="text-2xl font-bold text-foreground-950">{stats.files_scanned}</div>
          <p className="text-xs text-foreground-600 mt-1">Fichiers scannés</p>
        </div>
        <div className={`bg-background-50 rounded-xl border p-4 ${stats.violations_found > 0 ? 'border-red-200' : 'border-emerald-200'}`}>
          <div className={`text-2xl font-bold ${stats.violations_found > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            {stats.violations_found}
          </div>
          <p className="text-xs text-foreground-600 mt-1">Violations domaine</p>
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200 p-4">
          <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
          <p className="text-xs text-foreground-600 mt-1">Critiques</p>
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200 p-4">
          <div className="text-2xl font-bold text-amber-600">{highCount}</div>
          <p className="text-xs text-foreground-600 mt-1">Hautes</p>
        </div>
        <div className="bg-background-50 rounded-xl border border-background-200 p-4 hidden sm:block">
          <div className="text-2xl font-bold text-primary-600">{stats.pages_scanned}</div>
          <p className="text-xs text-foreground-600 mt-1">Pages scannées</p>
        </div>
      </div>

      {/* Sub-stats: sitemaps, robots, rss, llms, pages */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        <div className={`rounded-lg p-3 text-center ${stats.sitemap_violations > 0 ? 'bg-red-50 border border-red-100' : 'bg-emerald-50 border border-emerald-100'}`}>
          <div className={`text-lg font-bold ${stats.sitemap_violations > 0 ? 'text-red-700' : 'text-emerald-700'}`}>{stats.sitemap_violations}</div>
          <p className="text-[10px] text-foreground-500">Sitemaps ({stats.sitemaps_scanned})</p>
        </div>
        <div className={`rounded-lg p-3 text-center ${stats.robots_violations > 0 ? 'bg-red-50 border border-red-100' : 'bg-emerald-50 border border-emerald-100'}`}>
          <div className={`text-lg font-bold ${stats.robots_violations > 0 ? 'text-red-700' : 'text-emerald-700'}`}>{stats.robots_violations}</div>
          <p className="text-[10px] text-foreground-500">Robots.txt</p>
        </div>
        <div className={`rounded-lg p-3 text-center ${stats.rss_violations > 0 ? 'bg-red-50 border border-red-100' : 'bg-emerald-50 border border-emerald-100'}`}>
          <div className={`text-lg font-bold ${stats.rss_violations > 0 ? 'text-red-700' : 'text-emerald-700'}`}>{stats.rss_violations}</div>
          <p className="text-[10px] text-foreground-500">RSS</p>
        </div>
        <div className={`rounded-lg p-3 text-center ${stats.llms_violations > 0 ? 'bg-red-50 border border-red-100' : 'bg-emerald-50 border border-emerald-100'}`}>
          <div className={`text-lg font-bold ${stats.llms_violations > 0 ? 'text-red-700' : 'text-emerald-700'}`}>{stats.llms_violations}</div>
          <p className="text-[10px] text-foreground-500">LLMs.txt</p>
        </div>
        <div className={`rounded-lg p-3 text-center ${stats.page_violations > 0 ? 'bg-red-50 border border-red-100' : 'bg-emerald-50 border border-emerald-100'}`}>
          <div className={`text-lg font-bold ${stats.page_violations > 0 ? 'text-red-700' : 'text-emerald-700'}`}>{stats.page_violations}</div>
          <p className="text-[10px] text-foreground-500">Pages ({stats.pages_scanned})</p>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background-100 rounded-xl border border-background-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
            <i className="ri-shield-check-line text-accent-600 text-lg"></i>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground-950">Vérification Domaine</h3>
            <p className="text-sm text-foreground-600">
              {stats.violations_found === 0
                ? 'OK — Toutes les URLs pointent vers khepraexperts.com'
                : `${stats.violations_found} URL(s) avec domaine incorrect détectée(s)`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-foreground-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showFixUrls}
              onChange={(e) => setShowFixUrls(e.target.checked)}
              className="w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400 cursor-pointer"
            />
            Afficher corrections
          </label>
          <button
            onClick={scan}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-background-50 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            type="button"
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-1.5"></i>
                Scan en cours...
              </>
            ) : (
              <>
                <i className="ri-radar-line mr-1.5"></i>
                Scanner les domaines
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-700 text-sm">{error}</p>
          <button
            onClick={scan}
            className="mt-2 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
            type="button"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Filters */}
      {violations.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-background-100 rounded-lg p-1">
            {([
              { id: 'all' as const, label: 'Tous', count: violations.length },
              { id: 'critical' as const, label: 'Critiques', count: criticalCount, color: 'text-red-600' },
              { id: 'high' as const, label: 'Hautes', count: highCount, color: 'text-amber-600' },
              { id: 'sitemap' as const, label: 'Sitemaps', count: stats.sitemap_violations },
              { id: 'canonical' as const, label: 'SEO Head', count: violations.filter((v) => ['canonical', 'og_url', 'hreflang'].includes(v.url_type)).length },
            ]).map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filter === f.id
                    ? 'bg-background-50 text-foreground-900 shadow-sm'
                    : 'text-foreground-600 hover:text-foreground-900'
                }`}
                type="button"
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Violations Table */}
      {loading && violations.length === 0 ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-background-300 border-t-primary-500"></div>
          <p className="mt-3 text-sm text-foreground-500">Scan des fichiers publics en cours...</p>
        </div>
      ) : violations.length === 0 && !loading ? (
        <div className="text-center py-10 bg-background-50 rounded-xl border border-background-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-check-double-line text-emerald-600 text-xl"></i>
          </div>
          <p className="text-sm font-medium text-emerald-700">Aucune violation de domaine détectée</p>
          <p className="text-xs text-emerald-600 mt-1">
            Toutes les URLs pointent correctement vers {window.location.hostname || 'khepraexperts.com'}
          </p>
        </div>
      ) : (
        <div className="bg-background-50 rounded-xl border border-background-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-background-200 bg-background-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider w-8">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider">URL incorrecte</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider hidden md:table-cell">Source</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider w-24">Type</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider w-24">Sévérité</th>
                  {showFixUrls && (
                    <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider hidden lg:table-cell">Correction</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-background-100">
                {filteredViolations.map((v, i) => {
                  const sev = getSeverityBadge(v.severity);
                  return (
                    <tr key={v.id} className={`hover:bg-background-100 transition-colors ${v.severity === 'critical' ? 'bg-red-50/50' : v.severity === 'high' ? 'bg-amber-50/30' : ''}`}>
                      <td className="px-4 py-3">
                        <span className="text-xs text-foreground-400">{i + 1}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${v.severity === 'critical' ? 'bg-red-100' : 'bg-amber-100'}`}>
                            <i className={`${v.severity === 'critical' ? 'ri-close-line text-red-500' : 'ri-alert-line text-amber-500'} text-xs`}></i>
                          </div>
                          <span className="text-sm text-foreground-800 truncate max-w-[180px] sm:max-w-xs font-mono" title={v.target_url}>
                            {v.target_url}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          <i className={`${getUrlTypeIcon(v.url_type)} text-foreground-400 text-xs`}></i>
                          <span className="text-xs text-foreground-600 truncate max-w-[120px] block" title={v.source_file}>
                            {v.source_file}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-background-100 text-foreground-600">
                          {getUrlTypeLabel(v.url_type)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sev.bg} ${sev.border} ${sev.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`}></span>
                          {sev.label}
                        </span>
                      </td>
                      {showFixUrls && (
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-xs text-emerald-700 font-mono truncate max-w-[250px] block bg-emerald-50 px-2 py-1 rounded" title={v.fix_url}>
                            {v.fix_url}
                          </span>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredViolations.length > 0 && (
            <div className="px-4 py-3 bg-background-100 border-t border-background-200 flex items-center justify-between">
              <p className="text-xs text-foreground-600">
                {filteredViolations.length} violation{filteredViolations.length > 1 ? 's' : ''} — Domaine attendu : <strong className="text-foreground-900">khepraexperts.com</strong>
              </p>
              <span className="text-[10px] text-foreground-400">Scan côté client — résultats en temps réel</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}





