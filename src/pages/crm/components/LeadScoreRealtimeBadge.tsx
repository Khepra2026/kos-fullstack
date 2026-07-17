import { useEffect, useState } from 'react';
import { useLeadScoreRealtime } from '@/hooks/useLeadScoreRealtime';

interface LeadScoreRealtimeBadgeProps {
  leadId: string;
  initialScore: number;
  pipelineStage: string;
  onScoreChange?: (newScore: number, nextAction: string) => void;
}

export default function LeadScoreRealtimeBadge({
  leadId,
  initialScore,
  pipelineStage,
  onScoreChange,
}: LeadScoreRealtimeBadgeProps) {
  const { leadScores, updates } = useLeadScoreRealtime();
  const [displayScore, setDisplayScore] = useState(initialScore);
  const [displayAction, setDisplayAction] = useState('');
  const [showPulse, setShowPulse] = useState(false);
  const [recentUpdate, setRecentUpdate] = useState<{
    points: number;
    event: string;
    time: string;
  } | null>(null);

  const realtimeData = leadScores?.[leadId];

  useEffect(() => {
    if (realtimeData) {
      const prevScore = displayScore;
      setDisplayScore(realtimeData.lead_score);
      setDisplayAction(realtimeData.next_best_action);
      if (realtimeData.lead_score !== prevScore) {
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 2000);
        onScoreChange?.(realtimeData.lead_score, realtimeData.next_best_action);
      }
    }
  }, [realtimeData, displayScore, onScoreChange]);

  useEffect(() => {
    const update = updates.find((u) => u.leadId === leadId);
    if (update) {
      setRecentUpdate({
        points: update.pointsAdded,
        event: update.eventType,
        time: new Date(update.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      });
      setTimeout(() => setRecentUpdate(null), 5000);
    }
  }, [updates, leadId]);

  const category = displayScore >= 70 ? 'hot' : displayScore >= 45 ? 'warm' : 'cold';
  const categoryLabel = category === 'hot' ? '🔥 CHAUD' : category === 'warm' ? '☀️ TIÈDE' : '❄️ FROID';
  const categoryColor = category === 'hot' ? 'text-amber-700' : category === 'warm' ? 'text-orange-700' : 'text-slate-500';
  const categoryBg = category === 'hot' ? 'bg-amber-50' : category === 'warm' ? 'bg-orange-50' : 'bg-slate-50';
  const priority = displayScore >= 75 ? 'P0' : displayScore >= 65 ? 'P1' : displayScore >= 50 ? 'P2' : 'P3';
  const priorityColor = priority === 'P0' ? 'text-red-600' : priority === 'P1' ? 'text-orange-600' : priority === 'P2' ? 'text-amber-600' : 'text-slate-400';

  return (
    <div className={`relative inline-flex flex-col gap-1 p-3 rounded-xl border ${showPulse ? 'border-teal-300 ring-2 ring-teal-100' : 'border-slate-200'} ${categoryBg} transition-all`}>
      {/* Recent update toast */}
      {recentUpdate && (
        <div className="absolute -top-8 left-0 right-0 flex justify-center">
          <span className="px-2 py-1 bg-teal-600 text-white text-[10px] font-bold rounded-full animate-bounce">
            +{recentUpdate.points}pts ({recentUpdate.event})
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className={`text-lg font-bold ${categoryColor} ${showPulse ? 'animate-pulse' : ''}`}>
          {displayScore}
        </span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
          /100
        </span>
        <span className={`text-[10px] font-bold ${categoryColor}`}>
          {categoryLabel}
        </span>
        <span className={`text-[10px] font-bold ${priorityColor}`}>
          {priority}
        </span>
      </div>

      {displayAction && (
        <div className="flex items-center gap-1.5">
          <i className="ri-lightbulb-line text-teal-500 w-3 h-3 flex items-center justify-center"></i>
          <span className="text-[10px] text-teal-600 font-medium leading-tight">{displayAction}</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-[10px] text-slate-400">
        <span className="flex items-center gap-0.5">
          <i className="ri-route-line w-3 h-3 flex items-center justify-center"></i>
          {pipelineStage}
        </span>
        {recentUpdate && (
          <span className="text-teal-500 font-medium">
            Mis à jour {recentUpdate.time}
          </span>
        )}
      </div>
    </div>
  );
}