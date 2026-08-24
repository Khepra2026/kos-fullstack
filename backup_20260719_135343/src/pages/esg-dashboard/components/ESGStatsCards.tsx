interface ESGStats {
  nb_enjeux: number;
  score_moyen_f: number;
  score_moyen_d: number;
  prioritaires: number;
  financiers: number;
  durabilite: number;
  veille: number;
}

interface ESGStatsCardsProps {
  stats: ESGStats;
}

export default function ESGStatsCards({ stats }: ESGStatsCardsProps) {
  const cards = [
    {
      label: 'Enjeux identifiés',
      value: stats.nb_enjeux,
      icon: 'ri-list-check-2',
      color: 'text-foreground-950',
      bg: 'bg-background-50',
    },
    {
      label: 'Score moyen financier',
      value: stats.score_moyen_f.toFixed(2),
      icon: 'ri-money-euro-circle-line',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Score moyen durabilité',
      value: stats.score_moyen_d.toFixed(2),
      icon: 'ri-leaf-line',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Enjeux prioritaires',
      value: stats.prioritaires,
      icon: 'ri-alarm-warning-line',
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Enjeux financiers',
      value: stats.financiers,
      icon: 'ri-bar-chart-box-line',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Enjeux durabilité',
      value: stats.durabilite,
      icon: 'ri-seedling-line',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.bg} rounded-lg border border-background-200/70 p-3 text-center hover:border-background-300/60 transition-all`}
        >
          <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-lg bg-white/80 mb-2">
            <i className={`${card.icon} text-lg ${card.color}`}></i>
          </div>
          <div className={`text-xl font-bold font-heading ${card.color}`}>{card.value}</div>
          <div className="text-[10px] text-foreground-500 font-body mt-0.5">{card.label}</div>
        </div>
      ))}
    </div>
  );
}



