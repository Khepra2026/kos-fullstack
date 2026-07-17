import { useTranslation } from 'react-i18next';
import { DashboardStats, RecentLead } from '@/pages/dashboard/hooks/useDashboardData';

interface ConversionMetricsProps {
  stats: DashboardStats | null;
  recentLeads: RecentLead[];
}

export default function ConversionMetricsCard({ stats, recentLeads }: ConversionMetricsProps) {
  const { t } = useTranslation();

  if (!stats) return null;

  const emailsSent = recentLeads.filter((l) => l.email_1_sent_at || l.email_2_sent_at || l.email_3_sent_at).length;

  const metrics = [
    {
      icon: 'ri-download-2-line',
      value: stats.totalDownloads,
      title: t('dashboard.additionalMetrics.downloads.title'),
      subtitle: t('dashboard.additionalMetrics.downloads.subtitle'),
      bg: 'from-teal-500 to-teal-600',
    },
    {
      icon: 'ri-mail-send-line',
      value: emailsSent,
      title: t('dashboard.additionalMetrics.emailsSent.title'),
      subtitle: t('dashboard.additionalMetrics.emailsSent.subtitle'),
      bg: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'ri-trophy-line',
      value: stats.totalConversions,
      title: t('dashboard.additionalMetrics.conversions.title'),
      subtitle: t('dashboard.additionalMetrics.conversions.subtitle'),
      bg: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
      {metrics.map((m) => (
        <div
          key={m.title}
          className={`bg-gradient-to-br ${m.bg} rounded-xl p-5 md:p-6 text-white hover:opacity-95 transition-opacity`}
        >
          <div className="flex items-center justify-between mb-4">
            <i className={`${m.icon} text-2xl md:text-3xl opacity-80`}></i>
            <span className="text-2xl md:text-3xl font-bold">{m.value}</span>
          </div>
          <h3 className="text-xs md:text-sm font-medium opacity-90">{m.title}</h3>
          <p className="text-xs opacity-75 mt-1">{m.subtitle}</p>
        </div>
      ))}
    </div>
  );
}