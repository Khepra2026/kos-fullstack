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

function FunnelBar({ label, count, value, maxCount, conversionFromPrevious, conversionFromFirst, daysInStage, index }: {
  label: string;
  count: number;
  value: number;
  maxCount: number;
  conversionFromPrevious: number;
  conversionFromFirst: number;
  daysInStage: number;
  index: number;
}) {
  const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
  const colors = [
    'bg-[#c19a6b]',
    'bg-[#a47c48]',
    'bg-[#8b6a3a]',
    'bg-[#d4a76a]',
    'bg-[#b8895a]',
    'bg-emerald-500',
    'bg-red-400',
  ];
  const color = colors[index] || 'bg-slate-400';

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">{label}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
            {count}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500">{formatCurrency(value)}</span>
          {daysInStage > 0 && (
            <span className="text-slate-400">{Math.round(daysInStage)} j</span>
          )}
        </div>
      </div>
      <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${color} rounded-lg transition-all duration-700 flex items-center justify-end pr-3`}
          style={{ width: `${Math.max(width, 2)}%` }}
        >
          {width > 15 && (
            <span className="text-white text-xs font-semibold">{formatPercent(conversionFromFirst)}</span>
          )}
        </div>
        {width <= 15 && (
          <span className="absolute left-2 top-1.5 text-xs text-slate-500 font-medium">
            {formatPercent(conversionFromFirst)}
          </span>
        )}
      </div>
      {index > 0 && (
        <div className="flex items-center gap-2 mt-1">
          <i className="ri-arrow-down-line text-slate-300 w-3 h-3 flex items-center justify-center"></i>
          <span className="text-xs text-slate-500">
            Conversion depuis étape précédente : <span className="font-semibold text-slate-700">{formatPercent(conversionFromPrevious)}</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default function PipelineFunnelChart() {
  const { funnel, metrics } = usePipelineAnalytics();
  const maxCount = Math.max(...funnel.map((f) => f.count), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Funnel de conversion</h3>
          <p className="text-sm text-slate-500 mt-0.5">Taux de conversion par étape du pipeline</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#c19a6b]"></div>
            <span className="text-slate-600">Actif</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500"></div>
            <span className="text-slate-600">Gagné</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-400"></div>
            <span className="text-slate-600">Perdu</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {funnel.map((stage, index) => (
          <FunnelBar
            key={stage.stage}
            label={stage.label}
            count={stage.count}
            value={stage.value}
            maxCount={maxCount}
            conversionFromPrevious={stage.conversionFromPrevious}
            conversionFromFirst={stage.conversionFromFirst}
            daysInStage={stage.daysInStage}
            index={index}
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-900">{formatPercent(metrics.conversionRateLeadToMeeting)}</p>
          <p className="text-xs text-slate-500 mt-0.5">Lead → RDV</p>
        </div>
        <div className="text-center border-l border-r border-slate-100">
          <p className="text-lg font-bold text-slate-900">{formatPercent(metrics.conversionRateMeetingToProposal)}</p>
          <p className="text-xs text-slate-500 mt-0.5">RDV → Proposition</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-slate-900">{formatPercent(metrics.conversionRateProposalToWon)}</p>
          <p className="text-xs text-slate-500 mt-0.5">Proposition → Gagné</p>
        </div>
      </div>
    </div>
  );
}