import { usePipelineAnalytics } from '@/pages/reporting-commercial/hooks/usePipelineAnalytics';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatDays(value: number): string {
  return `${Math.round(value)} j`;
}

function GrowthBadge({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
      <i className={`${isPositive ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} w-3 h-3 flex items-center justify-center`}></i>
      {isPositive ? '+' : ''}{value.toFixed(1)}%
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  growth?: number;
  icon: string;
  iconColor: string;
  bgColor: string;
}

function StatCard({ label, value, subValue, growth, icon, iconColor, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-[#c19a6b]/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          <i className={`${icon} ${iconColor} text-lg w-5 h-5 flex items-center justify-center`}></i>
        </div>
        {growth !== undefined && <GrowthBadge value={growth} />}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
      {subValue && (
        <p className="text-xs text-slate-400 mt-1">{subValue}</p>
      )}
    </div>
  );
}

export default function PipelineStatsCards() {
  const { metrics } = usePipelineAnalytics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Pipeline total"
        value={formatCurrency(metrics.totalPipelineValue)}
        subValue={`${metrics.activeLeads} leads actifs`}
        growth={metrics.leadsGrowthRate}
        icon="ri-money-cny-circle-line"
        iconColor="text-[#c19a6b]"
        bgColor="bg-[#c19a6b]/10"
      />
      <StatCard
        label="Pipeline pondéré"
        value={formatCurrency(metrics.weightedPipelineValue)}
        subValue={`Proba. moy. ${formatPercent(metrics.avgProbability)}`}
        icon="ri-scales-3-line"
        iconColor="text-[#a47c48]"
        bgColor="bg-[#a47c48]/10"
      />
      <StatCard
        label="CA gagné"
        value={formatCurrency(metrics.revenueThisMonth)}
        subValue={`Ce mois-ci`}
        growth={metrics.revenueGrowthRate}
        icon="ri-trophy-line"
        iconColor="text-emerald-600"
        bgColor="bg-emerald-50"
      />
      <StatCard
        label="Taux de conversion global"
        value={formatPercent(metrics.conversionRateOverall)}
        subValue={`${metrics.dealsWonThisMonth} deals ce mois`}
        growth={metrics.dealsGrowthRate}
        icon="ri-filter-line"
        iconColor="text-[#c19a6b]"
        bgColor="bg-[#c19a6b]/10"
      />
      <StatCard
        label="Valeur moyenne deal"
        value={formatCurrency(metrics.avgDealValue)}
        subValue={`Gagné : ${formatCurrency(metrics.avgDealValueWon)}`}
        icon="ri-bar-chart-line"
        iconColor="text-[#a47c48]"
        bgColor="bg-[#a47c48]/10"
      />
      <StatCard
        label="Cycle de vente moyen"
        value={formatDays(metrics.avgSalesCycle)}
        subValue={`RDV → ${formatDays(metrics.avgTimeToMeeting)} | Propo. → ${formatDays(metrics.avgTimeToProposal)}`}
        icon="ri-time-line"
        iconColor="text-slate-600"
        bgColor="bg-slate-100"
      />
      <StatCard
        label="Propositions envoyées"
        value={`${metrics.proposalsSent}`}
        subValue={`${metrics.proposalsAccepted} acceptées · ${metrics.proposalsRejected} refusées · ${metrics.proposalsViewed} vues`}
        icon="ri-mail-send-line"
        iconColor="text-[#c19a6b]"
        bgColor="bg-[#c19a6b]/10"
      />
      <StatCard
        label="Win rate"
        value={formatPercent(metrics.winRate)}
        subValue={`${metrics.proposalsAccepted} / ${metrics.proposalsAccepted + metrics.proposalsRejected}`}
        icon="ri-percent-line"
        iconColor="text-emerald-600"
        bgColor="bg-emerald-50"
      />
    </div>
  );
}