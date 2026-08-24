import type { CrossResolutionAlert, CrossResolutionResult } from '@/hooks/useAutoCorrectionTickets';

interface CrossResolutionAlertsPanelProps {
  alerts: CrossResolutionAlert[];
  onAcknowledge: (alertId: number) => void;
  engineTitle?: string;
}

const ENGINE_LABELS: Record<string, string> = {
  url_auto_pointage: 'URL Auto-Pointage',
  corrective_execution: 'Corrective Execution',
  content_correction: 'Content Correction',
  cyber_tech: 'Cyber & Tech',
  digital_growth: 'Digital Growth',
};

const ENGINE_ICONS: Record<string, string> = {
  url_auto_pointage: 'ri-radar-line',
  corrective_execution: 'ri-settings-3-line',
  content_correction: 'ri-file-edit-line',
  cyber_tech: 'ri-shield-check-line',
  digital_growth: 'ri-rocket-line',
};

const ENGINE_COLORS: Record<string, string> = {
  url_auto_pointage: 'text-accent-600 bg-accent-100',
  corrective_execution: 'text-amber-600 bg-amber-100',
  content_correction: 'text-emerald-600 bg-emerald-100',
  cyber_tech: 'text-red-600 bg-red-100',
  digital_growth: 'text-sky-600 bg-sky-100',
};

function formatTimeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
}

export default function CrossResolutionAlertsPanel({ alerts, onAcknowledge, engineTitle }: CrossResolutionAlertsPanelProps) {
  const unacknowledged = alerts.filter((a) => !a.acknowledged);

  if (alerts.length === 0) return null;

  return (
    <div className="bg-accent-50/40 border border-accent-200/60 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-accent-200/40 bg-accent-50/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
            <i className="ri-git-merge-line text-accent-600 text-base"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground-950">
              Résolutions croisées
              {engineTitle && <span className="text-foreground-400 font-normal ml-1">— {engineTitle}</span>}
            </h3>
            <p className="text-[11px] text-foreground-500">
              {unacknowledged.length > 0
                ? `${unacknowledged.length} alerte(s) non lue(s)`
                : `${alerts.length} alerte(s)`}
            </p>
          </div>
          {unacknowledged.length > 0 && (
            <span className="px-2 py-0.5 bg-accent-500 text-white text-[10px] font-bold rounded-full">
              {unacknowledged.length}
            </span>
          )}
        </div>
      </div>

      {/* Alerts list */}
      <div className="divide-y divide-accent-200/30 max-h-[360px] overflow-y-auto">
        {alerts.map((alert) => {
          const engineLabel = ENGINE_LABELS[alert.resolving_engine] || alert.resolving_engine;
          const engineIcon = ENGINE_ICONS[alert.resolving_engine] || 'ri-settings-line';
          const engineColor = ENGINE_COLORS[alert.resolving_engine] || 'text-foreground-600 bg-background-100';

          return (
            <div
              key={alert.id}
              className={`px-4 py-3 transition-colors ${
                alert.acknowledged ? 'bg-background-50' : 'bg-accent-50/50'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Resolving engine badge */}
                <div className={`w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center ${engineColor}`}>
                  <i className={`${engineIcon} text-sm`}></i>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-foreground-900">
                      {engineLabel}
                    </span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full font-medium">
                      Résolu
                    </span>
                    {!alert.acknowledged && (
                      <span className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0"></span>
                    )}
                  </div>

                  <p className="text-xs text-foreground-600 leading-relaxed mb-1">
                    {alert.alert_message || `Ticket ${alert.resolved_ticket_id} résolu dans ${engineLabel}`}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                    <span className="font-mono">{alert.resolved_ticket_id}</span>
                    {alert.notified_ticket_ids && alert.notified_ticket_ids.length > 0 && (
                      <>
                        <span>→</span>
                        <span className="font-mono text-foreground-500">
                          {alert.notified_ticket_ids.join(', ')}
                        </span>
                      </>
                    )}
                    <span>·</span>
                    <span>{formatTimeAgo(alert.created_at)}</span>
                  </div>
                </div>

                {/* Acknowledge button */}
                {!alert.acknowledged && (
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-foreground-400 hover:bg-background-200 hover:text-foreground-600 transition-colors cursor-pointer"
                    type="button"
                    title="Marquer comme lu"
                  >
                    <i className="ri-check-line text-sm"></i>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Smaller inline component for cross-resolution result toast
export function CrossResolutionToast({ result, onClose }: { result: CrossResolutionResult; onClose: () => void }) {
  if (!result || result.notified_count === 0) return null;

  const engineLabels = result.notified_engines
    .map((e) => ENGINE_LABELS[e] || e)
    .join(', ');

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-background-50 border border-accent-200 rounded-xl shadow-lg p-4 max-w-sm animate-fade-in-up">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <i className="ri-git-merge-line text-accent-600 text-lg"></i>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-foreground-950">Résolution croisée</h4>
          <p className="text-xs text-foreground-600 mt-0.5">
            {result.notified_count} moteur(s) notifié(s) : {engineLabels}
          </p>
          <p className="text-[10px] text-foreground-400 mt-1 font-mono truncate">
            {result.target_url}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-foreground-400 hover:text-foreground-600 cursor-pointer"
          type="button"
        >
          <i className="ri-close-line text-xs"></i>
        </button>
      </div>
    </div>
  );
}



