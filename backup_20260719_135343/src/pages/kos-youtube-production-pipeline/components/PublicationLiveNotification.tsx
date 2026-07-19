import { useState, useEffect, useCallback } from 'react';
import type { PublicationEvent } from '@/mocks/youtubeProductionPipeline';

interface Props {
  events: PublicationEvent[];
}

export default function PublicationLiveNotification({ events }: Props) {
  const [visible, setVisible] = useState(true);
  const [latestIndex, setLatestIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const latestEvents = events.slice().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const currentEvent = latestEvents[latestIndex] || null;

  const nextEvent = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      setLatestIndex((prev) => (prev + 1) % latestEvents.length);
      setIsAnimating(true);
    }, 150);
  }, [latestEvents.length]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (!visible || latestEvents.length <= 1) return;
    const timer = setInterval(nextEvent, 6000);
    return () => clearInterval(timer);
  }, [visible, latestEvents.length, nextEvent]);

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || !currentEvent) return null;

  const typeConfig: Record<string, { icon: string; color: string; bg: string; label: string }> = {
    uploaded: { icon: 'ri-upload-cloud-line', color: '#0A66C2', bg: '#DBEAFE', label: 'Upload en cours' },
    processing: { icon: 'ri-loader-4-line', color: '#CA8A04', bg: '#FEF3C7', label: 'Traitement' },
    published: { icon: 'ri-check-double-line', color: '#059669', bg: '#D1FAE5', label: 'Publié' },
    failed: { icon: 'ri-close-circle-line', color: '#DC2626', bg: '#FEE2E2', label: 'Échec' },
    optimized: { icon: 'ri-lightbulb-flash-line', color: '#86BC25', bg: '#F0FDF4', label: 'Optimisé' },
  };

  const cfg = typeConfig[currentEvent.type] || typeConfig.processing;
  const timeAgo = (() => {
    const diff = Date.now() - new Date(currentEvent.timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'À l\'instant';
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    return `Il y a ${hours}h`;
  })();

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full">
      <div
        className={`rounded-2xl border shadow-lg overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ backgroundColor: '#fff', borderColor: `${cfg.color}30` }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ backgroundColor: cfg.bg, borderColor: `${cfg.color}20` }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
          <span className="text-[11px] font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
          <span className="text-[10px] text-foreground-400 ml-auto">{timeAgo}</span>
          <button
            onClick={() => setVisible(false)}
            className="ml-2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/5 cursor-pointer transition-colors"
          >
            <i className="ri-close-line text-xs text-foreground-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${cfg.color}15` }}>
              <i className={`${cfg.icon} text-sm`} style={{ color: cfg.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-foreground-950 line-clamp-1">{currentEvent.title}</h4>
              <p className="text-[10px] text-foreground-500 mt-0.5 line-clamp-2">{currentEvent.message}</p>
              {currentEvent.autoTrigger && (
                <div className="flex items-center gap-1 mt-1.5">
                  <i className="ri-robot-line text-[9px] text-foreground-400" />
                  <span className="text-[9px] text-foreground-400">{currentEvent.autoTrigger}</span>
                </div>
              )}
            </div>
          </div>

          {/* Playlist badge */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 flex items-center gap-1">
              <i className="ri-play-list-2-line" />{currentEvent.playlistName}
            </span>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${currentEvent.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : currentEvent.status === 'error' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
              {currentEvent.status === 'completed' ? 'Terminé' : currentEvent.status === 'error' ? 'Erreur' : 'En cours'}
            </span>
          </div>
        </div>

        {/* Footer — Dots */}
        {latestEvents.length > 1 && (
          <div className="flex items-center justify-center gap-1 pb-2">
            {latestEvents.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIsAnimating(false); setTimeout(() => { setLatestIndex(i); setIsAnimating(true); }, 150); }}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${i === latestIndex ? 'bg-foreground-950' : 'bg-background-200'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



