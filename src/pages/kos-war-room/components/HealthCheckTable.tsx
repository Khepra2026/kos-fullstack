import type { HealthService } from '../hooks/useWarRoomData';

interface HealthCheckTableProps {
  services: HealthService[];
  loading: boolean;
}

const STATUS_CONFIG: Record<string, { dot: string; label: string; textColor: string }> = {
  ok: { dot: 'bg-emerald-500', label: 'UP', textColor: 'text-emerald-600' },
  healed: { dot: 'bg-amber-500', label: 'HEALED', textColor: 'text-amber-600' },
  error: { dot: 'bg-red-500', label: 'DOWN', textColor: 'text-red-600' },
  warning: { dot: 'bg-yellow-500', label: 'WARN', textColor: 'text-yellow-600' },
};

const ALL_SERVICES = [
  'YouTube OAuth',
  'DeepL',
  'Creatomate',
  'Reply Bot',
  'Trend Engine',
  'Ayrshare Publisher',
  'Script Generator',
  'Content Recycler',
];

export default function HealthCheckTable({ services, loading }: HealthCheckTableProps) {
  const serviceMap: Record<string, HealthService | undefined> = {};
  services.forEach((s) => {
    serviceMap[s.service] = s;
  });

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-background-200/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs font-bold text-foreground-950 font-heading uppercase tracking-wide">
            Agent HealthCheck — Services
          </h3>
        </div>
        <span className="text-[10px] text-foreground-400 font-body">
          {loading ? 'Chargement...' : `${services.length} services`}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-background-200/70 bg-background-100/50">
              <th className="text-left py-2.5 px-5 text-foreground-400 font-medium font-body">Service</th>
              <th className="text-center py-2.5 px-3 text-foreground-400 font-medium font-body">Statut</th>
              <th className="text-right py-2.5 px-5 text-foreground-400 font-medium font-body">Pings</th>
            </tr>
          </thead>
          <tbody>
            {ALL_SERVICES.map((serviceName) => {
              const svc = serviceMap[serviceName];
              const statusKey = svc?.status || 'error';
              const config = STATUS_CONFIG[statusKey] || STATUS_CONFIG.error;
              return (
                <tr
                  key={serviceName}
                  className="border-b border-background-100 last:border-0 hover:bg-background-100/30 transition-colors"
                >
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                      <span className="font-medium text-foreground-900 font-body">{serviceName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${config.textColor} bg-${statusKey === 'ok' ? 'emerald' : statusKey === 'healed' ? 'amber' : 'red'}-50 border border-${statusKey === 'ok' ? 'emerald' : statusKey === 'healed' ? 'amber' : 'red'}-200`}>
                      {config.label}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <span className="font-mono text-foreground-600 tabular-nums">
                      {svc?.count || 0}
                    </span>
                  </td>
                </tr>
              );
            })}
            {!loading && services.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-foreground-400 font-body">
                  <i className="ri-signal-wifi-error-line text-lg block mb-1" />
                  Aucun ping reçu — les health checks reprendront automatiquement
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}