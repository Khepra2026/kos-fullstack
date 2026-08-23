import { useTranslation } from 'react-i18next';
import { MonitoringStats as Stats } from '@/pages/monitoring/hooks/useMonitoringData';

interface MonitoringStatsProps {
  stats: Stats | null;
}

export default function MonitoringStats({ stats }: MonitoringStatsProps) {
  const { t } = useTranslation();

  if (!stats) return null;

  const cards = [
    {
      icon: 'ri-error-warning-line',
      color: 'from-red-500 to-red-600',
      value: stats.total404,
      title: t('monitoring.stats.total404') || 'Erreurs 404',
      subtitle: t('monitoring.stats.total404Sub') || 'Pages introuvables',
    },
    {
      icon: 'ri-bug-line',
      color: 'from-amber-500 to-amber-600',
      value: stats.totalErrors,
      title: t('monitoring.stats.totalErrors') || 'Erreurs HTTP/JS',
      subtitle: t('monitoring.stats.totalErrorsSub') || 'Requêtes et scripts',
    },
    {
      icon: 'ri-timer-line',
      color: 'from-teal-500 to-teal-600',
      value: stats.avgResponseTime,
      title: t('monitoring.stats.avgResponse') || 'Temps API moyen',
      subtitle: t('monitoring.stats.avgResponseSub') || 'ms',
      unit: 'ms',
    },
    {
      icon: 'ri-pages-line',
      color: 'from-indigo-500 to-indigo-600',
      value: stats.avgPageLoad,
      title: t('monitoring.stats.avgPageLoad') || 'Chargement page',
      subtitle: t('monitoring.stats.avgPageLoadSub') || 'ms',
      unit: 'ms',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
              <i className={`${card.icon} text-lg text-white`}></i>
            </div>
            <span className="text-xl font-bold text-slate-900">
              {card.value}
              {card.unit ? <span className="text-sm font-normal text-slate-500 ml-1">{card.unit}</span> : null}
            </span>
          </div>
          <h3 className="text-sm font-medium text-slate-700">{card.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}



