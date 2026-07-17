import { usePipelineAnalytics } from '@/pages/reporting-commercial/hooks/usePipelineAnalytics';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function DealBar({ label, won, sent, lost, pipeline, maxValue }: {
  label: string;
  won: number;
  sent: number;
  lost: number;
  pipeline: number;
  maxValue: number;
}) {
  const wonWidth = maxValue > 0 ? (won / maxValue) * 100 : 0;
  const pipelineWidth = maxValue > 0 ? (pipeline / maxValue) * 100 : 0;
  const sentWidth = maxValue > 0 ? (sent / maxValue) * 100 : 0;
  const lostWidth = maxValue > 0 ? (lost / maxValue) * 100 : 0;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-xs text-slate-500">{formatCurrency(won + pipeline + sent + lost)}</span>
      </div>
      <div className="relative h-6 bg-slate-100 rounded-md overflow-hidden flex">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${wonWidth}%`, minWidth: won > 0 ? 2 : 0 }}
          title={`Gagné: ${formatCurrency(won)}`}
        ></div>
        <div
          className="h-full bg-[#c19a6b] transition-all duration-500"
          style={{ width: `${sentWidth}%`, minWidth: sent > 0 ? 2 : 0 }}
          title={`Envoyé: ${formatCurrency(sent)}`}
        ></div>
        <div
          className="h-full bg-blue-400 transition-all duration-500"
          style={{ width: `${pipelineWidth}%`, minWidth: pipeline > 0 ? 2 : 0 }}
          title={`Pipeline: ${formatCurrency(pipeline)}`}
        ></div>
        <div
          className="h-full bg-red-300 transition-all duration-500"
          style={{ width: `${lostWidth}%`, minWidth: lost > 0 ? 2 : 0 }}
          title={`Perdu: ${formatCurrency(lost)}`}
        ></div>
      </div>
      <div className="flex items-center gap-3 mt-1.5">
        {won > 0 && (
          <span className="text-xs text-emerald-600 font-medium">{formatCurrency(won)} gagné</span>
        )}
        {sent > 0 && (
          <span className="text-xs text-[#a47c48] font-medium">{formatCurrency(sent)} envoyé</span>
        )}
        {pipeline > 0 && (
          <span className="text-xs text-blue-500 font-medium">{formatCurrency(pipeline)} pipeline</span>
        )}
        {lost > 0 && (
          <span className="text-xs text-red-400 font-medium">{formatCurrency(lost)} perdu</span>
        )}
      </div>
    </div>
  );
}

export default function DealValueChart() {
  const { dealsByMonth } = usePipelineAnalytics();
  const maxValue = Math.max(...dealsByMonth.map((d) => d.won + d.sent + d.pipeline + d.lost), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Valeur des deals par mois</h3>
          <p className="text-sm text-slate-500 mt-0.5">Répartition des montants gagné, envoyé, pipeline et perdu</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
            <span className="text-slate-600">Gagné</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#c19a6b]"></div>
            <span className="text-slate-600">Envoyé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
            <span className="text-slate-600">Pipeline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-300"></div>
            <span className="text-slate-600">Perdu</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {dealsByMonth.map((month) => (
          <DealBar
            key={month.month}
            label={month.label}
            won={month.won}
            sent={month.sent}
            lost={month.lost}
            pipeline={month.pipeline}
            maxValue={maxValue}
          />
        ))}
      </div>
    </div>
  );
}