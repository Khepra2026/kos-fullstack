import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '@/components/feature/SeoHead';
import { useMonitoringData } from './hooks/useMonitoringData';
import MonitoringHeader from './components/MonitoringHeader';
import MonitoringStats from './components/MonitoringStats';
import NotFoundTable from './components/NotFoundTable';
import PerformanceChart from './components/PerformanceChart';
import ErrorLog from './components/ErrorLog';
import UrlCheckerSection from './components/UrlCheckerSection';
import LoginPage from '@/pages/dashboard/components/LoginPage';

export default function MonitoringPage() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    logs,
    stats,
    top404,
    topErrors,
    timeRange,
    setTimeRange,
    loading,
    error,
    refresh,
  } = useMonitoringData();

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('dashboard_auth', 'true');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      <SeoHead
        title="Monitoring Technique — KHEPRA EXPERTS"
        description="Dashboard de monitoring des erreurs 404 et des temps de réponse"
        canonicalPath="/monitoring"
        noIndex={true}
      />
      <div className="min-h-screen bg-slate-50">
        <MonitoringHeader
          timeRange={timeRange}
          onTimeRangeChange={(r) => setTimeRange(r)}
          onRefresh={refresh}
          loading={loading}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading && !stats ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">{t('monitoring.loading') || 'Chargement…'}</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <i className="ri-error-warning-line text-3xl text-red-500 mb-2 block"></i>
              <p className="text-red-700">{error}</p>
              <button
                onClick={refresh}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
                type="button"
              >
                {t('monitoring.retry') || 'Réessayer'}
              </button>
            </div>
          ) : (
            <>
              <MonitoringStats stats={stats} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <NotFoundTable top404={top404} />
                <PerformanceChart logs={logs} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-3 p-5 border-b border-slate-100">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                      <i className="ri-bug-line text-amber-600 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {t('monitoring.topErrors.title') || 'Top erreurs'}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {t('monitoring.topErrors.subtitle') || 'Erreurs les plus fréquentes'}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody className="divide-y divide-slate-100">
                        {topErrors.length === 0 ? (
                          <tr>
                            <td className="px-5 py-6 text-sm text-slate-500 text-center">
                              {t('monitoring.topErrors.empty') || 'Aucune erreur'}
                            </td>
                          </tr>
                        ) : (
                          topErrors.map((entry) => (
                            <tr key={entry.error_message} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-3">
                                <span className="text-sm text-slate-700 block truncate max-w-xs" title={entry.error_message}>
                                  {entry.error_message}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                  {entry.count}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <i className="ri-pages-line text-indigo-600 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {t('monitoring.navigation.title') || 'Navigation'}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {t('monitoring.navigation.subtitle') || 'Temps de chargement des pages'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {logs.filter((l) => l.type === 'navigation' && l.duration_ms).slice(0, 10).map((log) => (
                      <div key={log.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <i className="ri-arrow-right-line text-slate-400 text-sm w-4 h-4 flex items-center justify-center shrink-0"></i>
                          <span className="text-sm text-slate-700 font-mono truncate max-w-xs">{log.url}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900 whitespace-nowrap">
                          {log.duration_ms}ms
                        </span>
                      </div>
                    ))}
                    {logs.filter((l) => l.type === 'navigation').length === 0 && (
                      <p className="text-sm text-slate-500 text-center py-4">
                        {t('monitoring.navigation.empty') || 'Aucune donnée de navigation'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <ErrorLog logs={logs} />

              <div className="mb-8">
                <UrlCheckerSection />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}