import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '@/components/feature/SeoHead';
import { useDashboardData } from '';
import LoginPage from '';
import DashboardHeader from '';
import StatsCards from '';
import PipelineCard from '';
import SourcesCard from '';
import FormTypesCard from '';
import LeadTable from '';
import ConversionMetricsCard from '';
import DiagnosticsTable from '';
import DownloadsTable from '';

export default function DashboardPage() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    stats,
    leadsByStatus,
    leadsBySource,
    leadsByFormType,
    recentLeads,
    recentDownloads,
    recentDiagnostics,
    timeRange,
    setTimeRange,
    loading,
    error,
    refresh,
  } = useDashboardData();

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
        title="Dashboard — KHEPRA EXPERTS"
        description="Tableau de bord privé KHEPRA EXPERTS"
        canonicalPath="/dashboard"
        noIndex={true}
      />
      <div className="min-h-screen bg-slate-50">
        <DashboardHeader
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onRefresh={refresh}
          loading={loading}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading && !stats ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">{t('dashboard.loading')}</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <i className="ri-error-warning-line text-3xl text-red-500 mb-2 block"></i>
              <p className="text-red-700">{error}</p>
              <button
                onClick={refresh}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
                type="button"
              >
                {t('dashboard.retry')}
              </button>
            </div>
          ) : (
            <>
              <StatsCards stats={stats} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <PipelineCard leadsByStatus={leadsByStatus} stats={stats} />
                <SourcesCard leadsBySource={leadsBySource} />
              </div>

              <FormTypesCard leadsByFormType={leadsByFormType} stats={stats} />

              <div className="mt-8">
                <LeadTable leads={recentLeads} />
              </div>

              <DiagnosticsTable diagnostics={recentDiagnostics} />
              <DownloadsTable downloads={recentDownloads} />

              <ConversionMetricsCard stats={stats} recentLeads={recentLeads} />
            </>
          )}
        </div>
      </div>
    </>
  );
}



