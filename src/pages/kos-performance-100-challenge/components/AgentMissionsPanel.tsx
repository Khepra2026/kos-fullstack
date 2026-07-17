import type { AgentMission, PerformanceGap } from '@/hooks/usePerformance100Challenge';
import { agentMissions as mockAgentMissions } from '@/mocks/kosPerformance100Challenge';

const colorMap: Record<string, string> = {
  primary: 'bg-primary-100 text-primary-700',
  accent: 'bg-accent-100 text-accent-700',
  secondary: 'bg-secondary-100 text-secondary-700',
};

function AgentCard({ agent, gaps }: { agent: AgentMission; gaps: PerformanceGap[] }) {
  const agentGaps = gaps.filter(g => agent.assignedGaps.includes(g.id));
  const allSubtasks = agentGaps.flatMap(g => g.subtasks);
  const doneSubtasks = allSubtasks.filter(s => s.done).length;
  const totalSubtasks = allSubtasks.length;
  const taskPct = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : agent.totalTasks > 0 ? Math.round((agent.tasksCompleted / agent.totalTasks) * 100) : 0;
  const allDone = totalSubtasks > 0 && doneSubtasks === totalSubtasks;

  return (
    <div className={`bg-background-50 rounded-lg border p-5 transition-all duration-200 ${
      allDone ? 'border-emerald-300 bg-emerald-50/30' : 'border-background-200/70 hover:border-background-300/60'
    }`}>
      {/* Agent Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${allDone ? 'bg-emerald-100 text-emerald-700' : colorMap[agent.colorToken] || 'bg-primary-100 text-primary-700'}`}>
            <i className={`${agent.icon} text-xl`}></i>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground-950 font-heading">{agent.agent}</h4>
            <span className="text-[10px] text-foreground-500 font-body">{agent.streak}</span>
          </div>
        </div>
        <div className="text-center">
          <span className="text-xl font-bold text-foreground-950 font-heading">{agent.score}</span>
          <span className="text-[10px] text-foreground-400 font-body block">/100</span>
        </div>
      </div>

      {/* GAPs Assigned */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {agent.assignedGaps.map(gapId => {
          const gapData = gaps.find(g => g.id === gapId);
          return (
            <span
              key={gapId}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold font-body ${
                gapData?.status === 'closed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : gapData?.status === 'in_progress'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-background-100 text-foreground-600'
              }`}
            >
              {gapId}
            </span>
          );
        })}
      </div>

      {/* Current Focus */}
      <p className="text-[11px] text-foreground-500 mb-3 italic font-body">
        &ldquo;{agent.motivation}&rdquo;
      </p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${allDone ? 'bg-emerald-500' : 'bg-primary-500'}`}
            style={{ width: `${taskPct}%` }}
          />
        </div>
        <span className="text-[10px] font-semibold text-foreground-600 font-body">{taskPct}%</span>
      </div>
      <div className="flex items-center justify-between text-[10px] text-foreground-400 font-body">
        <span>{doneSubtasks}/{totalSubtasks} sous-tâches</span>
        <span className="flex items-center gap-1">
          <i className="ri-focus-2-line text-xs"></i>
          {allDone ? 'MISSION ACCOMPLIE' : agent.currentFocus}
        </span>
      </div>
    </div>
  );
}

interface AgentMissionsPanelProps {
  sprintActive?: boolean;
  liveGaps?: PerformanceGap[];
  agentMissions?: AgentMission[];
}

export default function AgentMissionsPanel({
  sprintActive = false,
  liveGaps,
  agentMissions: missions,
}: AgentMissionsPanelProps) {
  const gaps = liveGaps || [];
  const missionList = missions || mockAgentMissions;
  const sortedAgents = [...missionList].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      {/* Leaderboard */}
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground-950 font-heading">CLASSEMENT DES AGENTS</h3>
          {sprintActive && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white animate-pulse font-body">
              TOUS ACTIFS
            </span>
          )}
        </div>
        <div className="space-y-2">
          {sortedAgents.map((agent, idx) => {
            const agentGaps = gaps.filter(g => agent.assignedGaps.includes(g.id));
            const allSubtasks = agentGaps.flatMap(g => g.subtasks);
            const doneSubtasks = allSubtasks.filter(s => s.done).length;
            const totalSubtasks = allSubtasks.length;
            const taskPct = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : agent.totalTasks > 0 ? Math.round((agent.tasksCompleted / agent.totalTasks) * 100) : 0;
            const allDone = totalSubtasks > 0 && doneSubtasks === totalSubtasks;
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '';

            return (
              <div
                key={agent.agent}
                className={`flex items-center gap-4 p-3 rounded-md transition-colors ${
                  allDone ? 'bg-emerald-50/70' : 'bg-background-100/70 hover:bg-background-200/50'
                }`}
              >
                <div className="w-8 text-center">
                  {medal ? <span className="text-base">{medal}</span> : <span className="text-xs font-semibold text-foreground-400 font-body">#{idx + 1}</span>}
                </div>
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${allDone ? 'bg-emerald-100 text-emerald-700' : colorMap[agent.colorToken] || 'bg-primary-100 text-primary-700'}`}>
                  <i className={`${agent.icon} text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground-950 font-heading">{agent.agent}</div>
                  <div className="text-[10px] text-foreground-500 font-body">{agent.assignedGaps.join(', ')}</div>
                </div>
                <div className="w-24">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="flex-1 h-1 bg-background-200/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${allDone ? 'bg-emerald-500' : 'bg-primary-500'}`} style={{ width: `${taskPct}%` }} />
                    </div>
                  </div>
                  <div className="text-[10px] text-foreground-400 font-body">{doneSubtasks}/{totalSubtasks}</div>
                </div>
                <div className="w-12 text-right">
                  <span className="text-lg font-bold text-foreground-950 font-heading">{agent.score}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Agent Cards */}
      <h3 className="text-sm font-semibold text-foreground-950 font-heading">MISSIONS PAR AGENT</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missionList.map(agent => (
          <AgentCard key={agent.agent} agent={agent} gaps={gaps} />
        ))}
      </div>
    </div>
  );
}