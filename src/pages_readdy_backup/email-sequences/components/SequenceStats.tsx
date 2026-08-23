interface SequenceStatsProps {
  stats: {
    totalEnrollments: number;
    activeEnrollments: number;
    completedEnrollments: number;
    unsubscribedEnrollments: number;
    totalEmailsSent: number;
    totalEmailsOpened: number;
    totalEmailsClicked: number;
    avgOpenRate: number;
    avgClickRate: number;
    conversionRate: number;
    sequencesByLeadMagnet: Record<string, number>;
  } | null;
}

export default function SequenceStats({ stats }: SequenceStatsProps) {
  if (!stats) return null;

  const cards = [
    {
      label: 'Inscriptions totales',
      value: stats.totalEnrollments.toString(),
      icon: 'ri-user-follow-line',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Séquences actives',
      value: stats.activeEnrollments.toString(),
      icon: 'ri-play-circle-line',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Séquences terminées',
      value: stats.completedEnrollments.toString(),
      icon: 'ri-check-double-line',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      label: 'Désinscriptions',
      value: stats.unsubscribedEnrollments.toString(),
      icon: 'ri-user-unfollow-line',
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      label: 'Emails envoyés',
      value: stats.totalEmailsSent.toString(),
      icon: 'ri-mail-send-line',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Taux d\'ouverture',
      value: `${stats.avgOpenRate.toFixed(1)}%`,
      icon: 'ri-eye-line',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Taux de clic',
      value: `${stats.avgClickRate.toFixed(1)}%`,
      icon: 'ri-cursor-line',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Taux de conversion',
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: 'ri-flashlight-line',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {cards.map((card) => (
        <div key={card.label} className={`${card.bg} rounded-xl p-4 border border-slate-200`}>
          <div className="flex items-center gap-2 mb-2">
            <i className={`${card.icon} ${card.color} w-4 h-4 flex items-center justify-center`}></i>
            <span className="text-xs text-slate-600">{card.label}</span>
          </div>
          <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
        </div>
      ))}
    </div>
  );
}



