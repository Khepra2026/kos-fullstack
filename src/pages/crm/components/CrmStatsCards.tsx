import { useTranslation } from 'react-i18next';
import { CrmStats } from '@/pages/crm/hooks/useCrmData';

interface CrmStatsProps {
  stats: CrmStats | null;
}

export default function CrmStatsCards({ stats }: CrmStatsProps) {
  const { t } = useTranslation();

  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: t('crm.stats.totalLeads'),
      value: stats.totalLeads,
      icon: 'ri-user-line',
      color: 'text-slate-700',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-500',
    },
    {
      label: t('crm.stats.hotLeads'),
      value: stats.hotLeads,
      icon: 'ri-fire-line',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
      badge: stats.hotLeads > 0 ? 'À contacter' : undefined,
    },
    {
      label: t('crm.stats.leadsThisWeek'),
      value: stats.leadsThisWeek,
      icon: 'ri-add-circle-line',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      label: t('crm.stats.pipelineValue'),
      value: `${Math.round(stats.pipelineValue).toLocaleString('fr-FR')} FCFA`,
      icon: 'ri-money-cny-circle-line',
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-500',
    },
    {
      label: t('crm.stats.conversionRate'),
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: 'ri-percent-line',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      label: t('crm.stats.followUpsPending'),
      value: stats.followUpsPending,
      icon: 'ri-alarm-warning-line',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      badge: stats.followUpsPending > 0 ? 'Urgent' : undefined,
    },
    {
      label: t('crm.stats.meetingsScheduled'),
      value: stats.meetingsScheduled,
      icon: 'ri-calendar-check-line',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      label: t('crm.stats.proposalsSent'),
      value: stats.proposalsSent,
      icon: 'ri-file-paper-2-line',
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
    },
    {
      label: t('crm.stats.missionsSigned'),
      value: stats.missionsSigned,
      icon: 'ri-briefcase-line',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      label: t('crm.stats.avgLeadScore'),
      value: stats.avgLeadScore.toFixed(1),
      icon: 'ri-bar-chart-grouped-line',
      color: 'text-cyan-700',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-500',
    },
    {
      label: t('crm.stats.responseRate'),
      value: `${stats.responseRate.toFixed(1)}%`,
      icon: 'ri-reply-line',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      label: t('crm.stats.avgDealValue'),
      value: `${Math.round(stats.avgDealValue).toLocaleString('fr-FR')} FCFA`,
      icon: 'ri-vip-crown-line',
      color: 'text-lime-700',
      bgColor: 'bg-lime-50',
      iconColor: 'text-lime-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-xl p-4 border border-slate-100 hover:shadow-sm transition-shadow`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${card.iconColor}`}>
              <i className={`${card.icon} w-4 h-4 flex items-center justify-center`}></i>
            </div>
            {card.badge && (
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                {card.badge}
              </span>
            )}
          </div>
          <div className={`text-2xl font-bold ${card.color} mb-0.5`}>{card.value}</div>
          <div className="text-xs text-slate-500 font-medium">{card.label}</div>
        </div>
      ))}
    </div>
  );
}