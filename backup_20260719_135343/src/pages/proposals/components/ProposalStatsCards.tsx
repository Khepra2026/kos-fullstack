import { useState } from 'react';
import { ProposalStats } from '@/pages/proposals/hooks/useProposals';

interface ProposalStatsCardsProps {
  stats: ProposalStats | null;
}

export default function ProposalStatsCards({ stats }: ProposalStatsCardsProps) {
  if (!stats) return null;

  const cards = [
    {
      label: 'Propositions',
      value: stats.total,
      icon: 'ri-file-paper-line',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
    },
    {
      label: 'Brouillons',
      value: stats.draft,
      icon: 'ri-draft-line',
      color: 'text-slate-600',
      bg: 'bg-slate-50',
    },
    {
      label: 'Envoyées',
      value: stats.sent,
      icon: 'ri-send-plane-line',
      color: 'text-blue-700',
      bg: 'bg-blue-100',
    },
    {
      label: 'Vues',
      value: stats.viewed,
      icon: 'ri-eye-line',
      color: 'text-indigo-700',
      bg: 'bg-indigo-100',
    },
    {
      label: 'Acceptées',
      value: stats.accepted,
      icon: 'ri-check-double-line',
      color: 'text-emerald-700',
      bg: 'bg-emerald-100',
    },
    {
      label: 'Refusées',
      value: stats.rejected,
      icon: 'ri-close-circle-line',
      color: 'text-red-700',
      bg: 'bg-red-100',
    },
    {
      label: 'Valeur totale',
      value: `${stats.totalValue.toLocaleString('fr-FR')} €`,
      icon: 'ri-money-euro-circle-line',
      color: 'text-amber-700',
      bg: 'bg-amber-100',
    },
    {
      label: 'Taux conversion',
      value: `${stats.conversionRate}%`,
      icon: 'ri-bar-chart-line',
      color: 'text-teal-700',
      bg: 'bg-teal-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {cards.map((card) => (
        <div key={card.label} className={`${card.bg} rounded-xl p-3 border border-transparent`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-md flex items-center justify-center ${card.bg}`}>
              <i className={`${card.icon} ${card.color} text-xs w-3 h-3 flex items-center justify-center`}></i>
            </div>
            <span className="text-xs text-slate-500 font-medium">{card.label}</span>
          </div>
          <div className={`text-lg font-bold ${card.color}`}>{card.value}</div>
        </div>
      ))}
    </div>
  );
}



