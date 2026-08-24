import { useState, useRef, useEffect } from 'react';
import { useKOSNotifications, criticalEvent } from '@/hooks/useKOSNotifications';

function isCrossResolutionEvent(event: criticalEvent): boolean {
  return (event.metric_name === 'cross_resolution' || (event.title && event.title.startsWith('Résolution croisée')));
}

export default function notificationBell() {
  const { events, unacknowledgedCount, criticalCount, acknowledgeEvent } = useKOSNotifications();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const crossResolutionEvents = events.filter(isCrossResolutionEvent);
  const regularEvents = events.filter((e) => !isCrossResolutionEvent(e));

  const getEventIcon = (type: string, isCross: boolean) => {
    if (isCross) return { icon: 'ri-git-merge-line', color: 'text-accent-500' };
    if (type === 'critical') return { icon: 'ri-alert-fill', color: 'text-red-500' };
    if (type === 'warning') return { icon: 'ri-error-warning-fill', color: 'text-amber-500' };
    if (type === 'resolved') return { icon: 'ri-checkbox-circle-fill', color: 'text-green-500' };
    return { icon: 'ri-information-fill', color: 'text-accent-500' };
  };

  const getEventBg = (type: string, acknowledged: boolean, isCross: boolean) => {
    if (acknowledged) return 'bg-background-50';
    if (isCross) return 'bg-accent-50/60';
    if (type === 'critical') return 'bg-red-50/60';
    if (type === 'warning') return 'bg-amber-50/60';
    return 'bg-background-50';
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Il y a ${days}j`;
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 flex items-center justify-center rounded-lg text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer"
        aria-label="Notifications KOS"
      >
        <i className="ri-notification-3-line text-lg"></i>
        {unacknowledgedCount > 0 && (
          <span className={`absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold text-white ${criticalCount > 0 ? 'bg-red-500' : 'bg-amber-500'}`}>
            {unacknowledgedCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-96 max-h-[480px] overflow-y-auto bg-background-50 border border-background-200/70 rounded-xl shadow-lg">
          <div className="sticky top-0 z-10 bg-background-50 border-b border-background-200/70 px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground-950">Notifications KOS</h3>
              <p className="text-xs text-foreground-500">
                {unacknowledgedCount > 0 ? `${unacknowledgedCount} non lue(s)` : 'Toutes lues'}
                {criticalCount > 0 && <span className="text-red-500 ml-1">· {criticalCount} critique(s)</span>}
                {crossResolutionEvents.length > 0 && (
                  <span className="text-accent-600 ml-1">· {crossResolutionEvents.length} cross-résolution</span>
                )}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-md text-foreground-400 hover:bg-background-100 cursor-pointer"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          {events.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <i className="ri-check-line text-lg"></i>
              </div>
              <p className="text-sm text-foreground-600">Aucune notification</p>
              <p className="text-xs text-foreground-400 mt-1">Tous les systèmes KOS sont opérationnels</p>
            </div>
          ) : (
            <div className="divide-y divide-background-200/50">
              {/* Cross-resolution events first */}
              {crossResolutionEvents.slice(0, 5).map((event: criticalEvent) => {
                const { icon, color } = getEventIcon(event.event_type, true);
                return (
                  <div
                    key={event.id}
                    className={`px-4 py-3 hover:bg-background-100/50 transition-colors cursor-pointer ${getEventBg(event.event_type, event.acknowledged, true)}`}
                    onClick={() => {
                      if (!event.acknowledged) acknowledgeEvent(event.id);
                    }}
                  >
                    <div className="flex gap-3">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-accent-100 text-accent-600">
                        <i className={`${icon} text-base`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-accent-100 text-accent-700 rounded text-[9px] font-medium whitespace-nowrap">
                            <i className="ri-git-merge-line text-[9px]"></i>
                            Cross-Résolution
                          </span>
                          {!event.acknowledged && <span className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0"></span>}
                        </div>
                        <p className="text-xs text-foreground-500 line-clamp-2 mb-1">{event.message}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-foreground-400">{event.hub_name}</span>
                          <span className="text-[10px] text-foreground-300">·</span>
                          <span className="text-[10px] text-foreground-400">{formatTime(event.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Regular events */}
              {regularEvents.slice(0, 20).map((event: criticalEvent) => {
                const { icon, color } = getEventIcon(event.event_type, false);
                return (
                  <div
                    key={event.id}
                    className={`px-4 py-3 hover:bg-background-100/50 transition-colors cursor-pointer ${getEventBg(event.event_type, event.acknowledged, false)}`}
                    onClick={() => {
                      if (!event.acknowledged) acknowledgeEvent(event.id);
                    }}
                  >
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg ${event.event_type === 'critical' ? 'bg-red-100' : event.event_type === 'warning' ? 'bg-amber-100' : 'bg-background-100'} ${color}`}>
                        <i className={`${icon} text-base`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-foreground-950 line-clamp-1">{event.title}</span>
                          {!event.acknowledged && <span className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0"></span>}
                        </div>
                        <p className="text-xs text-foreground-500 line-clamp-2 mb-1">{event.message}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-foreground-400">{event.hub_name}</span>
                          <span className="text-[10px] text-foreground-300">·</span>
                          <span className="text-[10px] text-foreground-400">{formatTime(event.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {events.length > 20 && (
            <div className="px-4 py-2 border-t border-background-200/70 text-center">
              <span className="text-xs text-foreground-400">{events.length - 20} notifications supplémentaires</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



