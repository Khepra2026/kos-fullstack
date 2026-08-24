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

export default function SourcePerformanceTable() {
  const { metrics } = usePipelineAnalytics();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900">Top sources de leads</h3>
          <p className="text-sm text-slate-500 mt-0.5">Sources générant le plus de valeur</p>
        </div>
        <div className="space-y-3">
          {metrics.topSources.map((source, index) => {
            const maxValue = Math.max(...metrics.topSources.map((s) => s.value), 1);
            const width = (source.value / maxValue) * 100;
            return (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700 truncate max-w-[60%]">{source.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{source.count} leads</span>
                    <span className="text-sm font-semibold text-slate-900">{formatCurrency(source.value)}</span>
                  </div>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#c19a6b] rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(width, 2)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900">Top organisations</h3>
          <p className="text-sm text-slate-500 mt-0.5">Clients par valeur totale estimée</p>
        </div>
        <div className="space-y-3">
          {metrics.topOrganizations.map((org) => {
            const maxValue = Math.max(...metrics.topOrganizations.map((o) => o.value), 1);
            const width = (org.value / maxValue) * 100;
            return (
              <div key={org.org}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700 truncate max-w-[60%]">{org.org}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{org.count} deal{org.count > 1 ? 's' : ''}</span>
                    <span className="text-sm font-semibold text-slate-900">{formatCurrency(org.value)}</span>
                  </div>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#a47c48] rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(width, 2)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



