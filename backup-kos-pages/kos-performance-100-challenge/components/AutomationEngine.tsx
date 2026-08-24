import { useState, useEffect, useCallback, useRef } from 'react';

interface Subtask {
  id: string;
  label: string;
  done: boolean;
}

interface PerformanceGap {
  id: string;
  category: string;
  metric: string;
  current: number;
  target: number;
  delta: number;
  unit?: string;
  severity: string;
  assignedAgent: string;
  agentAvatar: string;
  rootCause: string;
  mission: string;
  estimatedImpact: string;
  roi: string;
  status: string;
  progress: number;
  eta: string;
  subtasks: Subtask[];
}

interface AutomationLog {
  id: number;
  timestamp: string;
  agent: string;
  agentIcon: string;
  gapId: string;
  subtaskId: string;
  action: string;
  type: 'subtask_done' | 'gap_closed' | 'agent_started' | 'milestone' | 'speed_change';
}

const SPEED_PRESETS = [
  { label: '1x', value: 1, icon: 'ri-speed-line' },
  { label: '2x', value: 2, icon: 'ri-speed-up-line' },
  { label: '5x', value: 5, icon: 'ri-flashlight-line' },
  { label: '10x', value: 10, icon: 'ri-rocket-2-line' },
] as const;

interface AutomationEngineProps {
  isActive: boolean;
  gaps: PerformanceGap[];
  onGapsUpdate: (gaps: PerformanceGap[]) => void;
}

export default function AutomationEngine({ isActive, gaps, onGapsUpdate }: AutomationEngineProps) {
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [speed, setSpeed] = useState<number>(1);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [gapsClosed, setGapsClosed] = useState(0);
  const [currentAgent, setCurrentAgent] = useState<string>('');
  const [isPaused, setIsPaused] = useState(false);
  const processedRef = useRef<Set<string>>(new Set());
  const logIdRef = useRef(0);

  const getTimestamp = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  };

  const addLog = useCallback((log: Omit<AutomationLog, 'id' | 'timestamp'>) => {
    logIdRef.current += 1;
    setLogs(prev => [{
      ...log,
      id: logIdRef.current,
      timestamp: getTimestamp(),
    }, ...prev.slice(0, 49)]);
  }, []);

  // Auto-execute subtasks
  useEffect(() => {
    if (!isActive || isPaused) return;

    const allUndoneSubtasks: { gap: PerformanceGap; subtask: Subtask }[] = [];
    gaps.forEach(gap => {
      if (gap.status === 'closed') return;
      gap.subtasks.forEach(st => {
        if (!st.done && !processedRef.current.has(st.id)) {
          allUndoneSubtasks.push({ gap, subtask: st });
        }
      });
    });

    if (allUndoneSubtasks.length === 0) return;

    const baseInterval = 1200;
    const interval = baseInterval / speed;

    const timer = setInterval(() => {
      const freshUndone: { gap: PerformanceGap; subtask: Subtask }[] = [];
      const freshGaps = [...gaps];
      freshGaps.forEach(gap => {
        if (gap.status === 'closed') return;
        gap.subtasks.forEach(st => {
          if (!st.done && !processedRef.current.has(st.id)) {
            freshUndone.push({ gap, subtask: st });
          }
        });
      });

      if (freshUndone.length === 0) {
        clearInterval(timer);
        addLog({
          agent: 'ORCHESTRATOR',
          agentIcon: 'ri-trophy-line',
          gapId: 'ALL',
          subtaskId: '',
          action: 'TOUTES LES TÂCHES AUTOMATISÉES SONT COMPLÉTÉES — VÉRIFICATION FINALE EN COURS',
          type: 'milestone',
        });
        return;
      }

      const pick = freshUndone[Math.floor(Math.random() * freshUndone.length)];
      processedRef.current.add(pick.subtask.id);

      const updatedGaps = gaps.map(gap => {
        if (gap.id !== pick.gap.id) return gap;
        const updatedSubtasks = gap.subtasks.map(st =>
          st.id === pick.subtask.id ? { ...st, done: true } : st
        );
        const doneCount = updatedSubtasks.filter(s => s.done).length;
        const totalCount = updatedSubtasks.length;
        const newProgress = Math.min(Math.round((doneCount / totalCount) * 100), 100);
        const newStatus = newProgress >= 100 ? 'closed' : 'in_progress';

        return {
          ...gap,
          subtasks: updatedSubtasks,
          progress: newProgress,
          status: newStatus,
        };
      });

      const gapBeingClosed = updatedGaps.find(g => g.id === pick.gap.id);
      setCurrentAgent(pick.gap.assignedAgent);
      setTasksCompleted(prev => prev + 1);

      if (gapBeingClosed && gapBeingClosed.status === 'closed' && pick.gap.status !== 'closed') {
        setGapsClosed(prev => prev + 1);
        addLog({
          agent: pick.gap.assignedAgent,
          agentIcon: pick.gap.agentAvatar,
          gapId: pick.gap.id,
          subtaskId: pick.subtask.id,
          action: `${pick.subtask.label} ✓ — ${pick.gap.id} FERMÉ ! ${pick.gap.metric} → ${pick.gap.target}${pick.gap.unit || ''}`,
          type: 'gap_closed',
        });
      } else {
        addLog({
          agent: pick.gap.assignedAgent,
          agentIcon: pick.gap.agentAvatar,
          gapId: pick.gap.id,
          subtaskId: pick.subtask.id,
          action: `${pick.subtask.label} ✓`,
          type: 'subtask_done',
        });
      }

      onGapsUpdate(updatedGaps);
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, isPaused, speed, gaps, onGapsUpdate, addLog]);

  if (!isActive) return null;

  const totalSubtasks = gaps.reduce((s, g) => s + g.subtasks.length, 0);
  const doneSubtasks = gaps.reduce((s, g) => s + g.subtasks.filter(st => st.done).length, 0);
  const totalGaps = gaps.length;
  const closedGapsCount = gaps.filter(g => g.status === 'closed').length;
  const overallProgress = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;

  return (
    <div className="bg-background-50 rounded-lg border-2 border-emerald-300 overflow-hidden">
      {/* Automation Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/20">
              <i className="ri-cpu-line text-xl text-white"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                KOS AUTOMATION ENGINE
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              </h3>
              <p className="text-xs text-white/80 font-body">
                {isPaused ? '⏸️ PAUSÉ' : 'Exécution automatique en cours'} — {doneSubtasks}/{totalSubtasks} sous-tâches
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Speed Controls */}
            <div className="flex items-center bg-white/15 rounded-full p-0.5">
              {SPEED_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setSpeed(preset.value);
                    addLog({
                      agent: 'ORCHESTRATOR',
                      agentIcon: 'ri-dashboard-3-line',
                      gapId: 'ALL',
                      subtaskId: '',
                      action: `Vitesse d'exécution changée à ${preset.label}`,
                      type: 'speed_change',
                    });
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    speed === preset.value
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  type="button"
                >
                  <i className={`${preset.icon} text-xs`}></i>
                  {preset.label}
                </button>
              ))}
            </div>
            {/* Pause/Resume */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
              type="button"
            >
              <i className={`${isPaused ? 'ri-play-fill' : 'ri-pause-fill'} text-sm`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4 border-b border-emerald-200 bg-emerald-50/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-700 font-heading">{doneSubtasks}<span className="text-sm text-emerald-400">/{totalSubtasks}</span></div>
          <div className="text-[10px] text-emerald-600 font-body">Sous-tâches auto</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600 font-heading">{closedGapsCount}<span className="text-sm text-primary-400">/{totalGaps}</span></div>
          <div className="text-[10px] text-primary-500 font-body">GAPs fermés</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground-950 font-heading">{overallProgress}%</div>
          <div className="text-[10px] text-foreground-500 font-body">Progression globale</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-600 font-heading">
            {speed}x
          </div>
          <div className="text-[10px] text-accent-500 font-body">Vitesse exécution</div>
        </div>
      </div>

      {/* Current Agent Indicator */}
      {currentAgent && !isPaused && (
        <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 flex items-center gap-2">
          <span className="text-[10px] text-emerald-600 font-body">Agent actif :</span>
          <span className="text-xs font-semibold text-emerald-700 font-heading">{currentAgent}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-auto"></span>
          <span className="text-[10px] text-emerald-500 font-body">En cours...</span>
        </div>
      )}

      {/* Live Log Feed */}
      <div className="max-h-[360px] overflow-y-auto scrollbar-thin">
        <div className="divide-y divide-background-200/40">
          {logs.length === 0 && (
            <div className="px-6 py-12 text-center">
              <i className="ri-cpu-line text-3xl text-emerald-300 mb-3 block"></i>
              <p className="text-sm text-foreground-400 font-body">En attente des premières exécutions automatiques...</p>
            </div>
          )}
          {logs.map((log) => (
            <div
              key={log.id}
              className={`px-6 py-3 flex items-start gap-3 transition-colors hover:bg-background-50 ${
                log.type === 'gap_closed' ? 'bg-emerald-50/60' :
                log.type === 'milestone' ? 'bg-amber-50/60' :
                log.type === 'speed_change' ? 'bg-secondary-50/40' : ''
              }`}
            >
              <span className="text-[10px] text-foreground-400 font-mono w-16 shrink-0 pt-0.5">{log.timestamp}</span>

              {log.type === 'gap_closed' ? (
                <i className="ri-check-double-fill text-emerald-500 text-sm mt-0.5 shrink-0"></i>
              ) : log.type === 'milestone' ? (
                <i className="ri-star-fill text-amber-500 text-sm mt-0.5 shrink-0"></i>
              ) : log.type === 'speed_change' ? (
                <i className="ri-dashboard-3-line text-secondary-500 text-sm mt-0.5 shrink-0"></i>
              ) : (
                <i className={`${log.agentIcon} text-primary-500 text-sm mt-0.5 shrink-0`}></i>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-semibold font-body ${
                    log.type === 'gap_closed' ? 'text-emerald-700' :
                    log.type === 'milestone' ? 'text-amber-700' :
                    log.type === 'speed_change' ? 'text-secondary-700' :
                    'text-foreground-700'
                  }`}>
                    {log.agent}
                  </span>
                  {log.gapId !== 'ALL' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-background-100 text-foreground-500 font-body">
                      {log.gapId}
                    </span>
                  )}
                  {log.type === 'gap_closed' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 font-body animate-pulse">
                      GAP FERMÉ
                    </span>
                  )}
                  {log.type === 'speed_change' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-secondary-100 text-secondary-700 font-body">
                      RÉGLAGE
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground-600 font-body">{log.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats Bar */}
      <div className="border-t border-background-200/70 bg-background-100 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] text-foreground-400 font-body">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Automatisé : {tasksCompleted} actions
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
            {isPaused ? 'En pause' : `Vitesse ${speed}x`}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            GAPs fermés : {gapsClosed}
          </span>
        </div>
        <span className="text-[10px] text-emerald-600 font-body flex items-center gap-1">
          <i className="ri-refresh-line animate-spin"></i>
          Automation Engine — Live
        </span>
      </div>
    </div>
  );
}





