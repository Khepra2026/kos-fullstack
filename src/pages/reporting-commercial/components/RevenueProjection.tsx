import { usePipelineAnalytics } from '@/pages/reporting-commercial/hooks/usePipelineAnalytics';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function RevenueProjection() {
  const { revenueProjection, metrics } = usePipelineAnalytics();

  const quarters = [
    { label: 'Q1', value: revenueProjection.projectedQ1, color: 'bg-[#c19a6b]', percent: revenueProjection.projectedTotal > 0 ? (revenueProjection.projectedQ1 / revenueProjection.projectedTotal) * 100 : 0 },
    { label: 'Q2', value: revenueProjection.projectedQ2, color: 'bg-[#a47c48]', percent: revenueProjection.projectedTotal > 0 ? (revenueProjection.projectedQ2 / revenueProjection.projectedTotal) * 100 : 0 },
    { label: 'Q3', value: revenueProjection.projectedQ3, color: 'bg-[#8b6a3a]', percent: revenueProjection.projectedTotal > 0 ? (revenueProjection.projectedQ3 / revenueProjection.projectedTotal) * 100 : 0 },
    { label: 'Q4', value: revenueProjection.projectedQ4, color: 'bg-[#d4a76a]', percent: revenueProjection.projectedTotal > 0 ? (revenueProjection.projectedQ4 / revenueProjection.projectedTotal) * 100 : 0 },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Projection de chiffre d'affaires</h3>
          <p className="text-sm text-slate-500 mt-0.5">Basée sur le pipeline pondéré par probabilité de conversion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {quarters.map((q) => (
            <div key={q.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-700">{q.label} 2026</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(q.value)}</span>
              </div>
              <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full ${q.color} rounded-lg transition-all duration-700 flex items-center justify-end pr-3`}
                  style={{ width: `${Math.max(q.percent, 3)}%` }}
                >
                  <span className="text-white text-xs font-semibold">{q.percent.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-[#c19a6b]/5 rounded-lg border border-[#c19a6b]/10">
            <p className="text-xs text-slate-500 mb-1">Pipeline pondéré</p>
            <p className="text-xl font-bold text-slate-900">{formatCurrency(revenueProjection.weightedPipeline)}</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="text-xs text-slate-500 mb-1">CA déjà gagné</p>
            <p className="text-xl font-bold text-emerald-700">{formatCurrency(revenueProjection.wonRevenue)}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 mb-1">Projection annuelle</p>
            <p className="text-xl font-bold text-slate-900">{formatCurrency(revenueProjection.projectedTotal + revenueProjection.wonRevenue)}</p>
            <p className="text-xs text-slate-400 mt-1">
              Taux de conversion historique : {metrics.winRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-400 leading-relaxed">
          <i className="ri-information-line w-3 h-3 flex items-center justify-center inline-block mr-1"></i>
          La projection pondère le pipeline actuel par la probabilité historique de conversion (taux de gagné : {metrics.winRate.toFixed(1)}%).
          Répartition trimestrielle : Q1 25% · Q2 35% · Q3 25% · Q4 15%.
        </p>
      </div>
    </div>
  );
}