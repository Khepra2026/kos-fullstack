import { useTranslation } from 'react-i18next';
import { DashboardStats } from '@/pages/dashboard/hooks/useDashboardData';

interface StatsCardsProps {
  stats: DashboardStats | null;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const { t } = useTranslation();

  if (!stats) return null;

  const cards = [
    {
      icon: 'ri-user-add-line',
      color: 'from-blue-500 to-blue-600',
      value: stats.totalLeads,
      title: t('dashboard.kpis.totalLeads.title'),
      subtitle: `${stats.newLeads} ${t('dashboard.kpis.totalLeads.subtitle')}`,
    },
    {
      icon: 'ri-stethoscope-line',
      color: 'from-teal-500 to-teal-600',
      value: stats.diagnosticRequests,
      title: t('dashboard.kpis.diagnosticRequests.title'),
      subtitle: t('dashboard.kpis.diagnosticRequests.subtitle'),
    },
    {
      icon: 'ri-calendar-check-line',
      color: 'from-green-500 to-green-600',
      value: stats.meetingsScheduled,
      title: t('dashboard.kpis.meetingsScheduled.title'),
      subtitle: `${stats.conversionRate.toFixed(1)}% ${t('dashboard.kpis.meetingsScheduled.subtitle')}`,
    },
    {
      icon: 'ri-star-line',
      color: 'from-amber-500 to-amber-600',
      value: Math.round(stats.avgLeadScore),
      title: t('dashboard.kpis.avgLeadScore.title'),
      subtitle: t('dashboard.kpis.avgLeadScore.subtitle'),
    },
    {
      icon: 'ri-download-2-line',
      color: 'from-indigo-500 to-indigo-600',
      value: stats.totalDownloads,
      title: t('dashboard.additionalMetrics.downloads.title'),
      subtitle: t('dashboard.additionalMetrics.downloads.subtitle'),
    },
    {
      icon: 'ri-tools-line',
      color: 'from-rose-500 to-rose-600',
      value: stats.totalToolCompletions,
      title: t('dashboard.metrics.toolCompletions.title'),
      subtitle: t('dashboard.metrics.toolCompletions.subtitle'),
    },
    {
      icon: 'ri-file-list-3-line',
      color: 'from-violet-500 to-violet-600',
      value: stats.totalDiagnostics,
      title: t('dashboard.metrics.diagnostics.title'),
      subtitle: t('dashboard.metrics.diagnostics.subtitle'),
    },
    {
      icon: 'ri-trophy-line',
      color: 'from-emerald-500 to-emerald-600',
      value: stats.totalConversions,
      title: t('dashboard.additionalMetrics.conversions.title'),
      subtitle: t('dashboard.additionalMetrics.conversions.subtitle'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl shadow-sm p-5 md:p-6 border border-slate-200 hover:border-teal-200 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shrink-0`}>
              <i className={`${card.icon} text-xl md:text-2xl text-white`}></i>
            </div>
            <span className="text-xl md:text-2xl font-bold text-slate-900">{card.value}</span>
          </div>
          <h3 className="text-xs md:text-sm font-medium text-slate-600">{card.title}</h3>
          <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}