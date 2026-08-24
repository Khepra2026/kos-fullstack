import { useTranslation } from 'react-i18next';

interface MonitoringHeaderProps {
  timeRange: '24h' | '7d' | '30d';
  onTimeRangeChange: (range: '24h' | '7d' | '30d') => void;
  onRefresh: () => void;
  loading: boolean;
}

export default function MonitoringHeader({ timeRange, onTimeRangeChange, onRefresh, loading }: MonitoringHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {t('monitoring.title') || 'Monitoring Technique'}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {t('monitoring.subtitle') || 'Erreurs 404 et temps de réponse'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              {(['24h', '7d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    timeRange === range
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  type="button"
                >
                  {t(`monitoring.timeRange.${range}`) || range}
                </button>
              ))}
            </div>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              type="button"
              aria-label="Refresh"
            >
              <i className={`ri-refresh-line text-lg ${loading ? 'animate-spin' : ''}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



