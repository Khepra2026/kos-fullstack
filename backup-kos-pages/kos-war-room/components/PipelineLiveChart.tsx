
interface PipelineLiveChartProps {
  data: PipelinePoint[];
  loading: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  published: '#059669',
  processing: '#d97706',
  draft: '#6b7280',
  queued: '#2563eb',
  error: '#dc2626',
  unknown: '#9ca3af',
};

export default function PipelineLiveChart({ data, loading }: PipelineLiveChartProps) {
  const maxValue = Math.max(...data.map((d) => d.count), 1);
  const barWidth = Math.max(4, Math.min(12, 800 / Math.max(data.length, 1)));

  if (loading) {
    return (
      <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 flex items-center justify-center" style={{ minHeight: 200 }}>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-foreground-500 font-body">Chargement pipeline...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 flex items-center justify-center" style={{ minHeight: 200 }}>
        <div className="text-center">
          <i className="ri-bar-chart-line text-2xl text-foreground-300 block mb-2" />
          <p className="text-sm text-foreground-500 font-body">Aucune vidéo produite ces dernières 24h</p>
          <p className="text-xs text-foreground-400 mt-1">Le pipeline se remplira automatiquement</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-background-200/70 flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground-950 font-heading uppercase tracking-wide">
          Pipeline Live — Vidéos 24h
        </h3>
        <div className="flex items-center gap-3">
          {Object.entries(STATUS_COLORS).slice(0, 4).map(([status, color]) => (
            <div key={status} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-foreground-500 font-body capitalize">{status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 overflow-x-auto">
        <div className="flex items-end gap-0.5" style={{ minHeight: 140 }}>
          {data.map((point, i) => {
            const heightPercent = (point.count / maxValue) * 100;
            return (
              <div
                key={point.hour}
                className="group relative flex flex-col items-center flex-shrink-0"
                style={{ width: barWidth + 2 }}
              >
                <div
                  className="w-full rounded-t-sm transition-all duration-500 ease-out cursor-pointer hover:opacity-80"
                  style={{
                    height: `${Math.max(heightPercent, 4)}%`,
                    backgroundColor: STATUS_COLORS[point.status] || STATUS_COLORS.unknown,
                    minHeight: 2,
                  }}
                />
                {i % Math.max(1, Math.floor(data.length / 8)) === 0 && (
                  <span className="text-[9px] text-foreground-400 mt-1.5 font-mono rotate-45 origin-left whitespace-nowrap">
                    {new Date(point.hour).getHours()}h
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-background-100 flex items-center justify-between">
          <span className="text-[10px] text-foreground-400 font-body">
            {data.reduce((s, d) => s + d.count, 0)} vidéos au total
          </span>
          <span className="text-[10px] text-foreground-400 font-body">
            {data.slice(-1)[0]?.hour ? `Dernier: ${new Date(data.slice(-1)[0].hour).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : ''}
          </span>
        </div>
      </div>
    </div>
  );
}






