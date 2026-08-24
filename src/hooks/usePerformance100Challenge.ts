import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  challengeManifest as mockManifest,
  performanceGaps as mockGaps,
  agentMissions as mockAgentMissions,
  challengeTimeline as mockTimeline,
  progressHistory as mockProgressHistory,
  whatIfScenarios as mockWhatIfScenarios,
} from '@/mocks/performance100Challenge';

export interface Subtask {
  id: string;
  label: string;
  done: boolean;
}

export interface PerformanceGap {
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

export interface ChallengeManifest {
  title: string;
  subtitle: string;
  currentGlobalScore: number;
  targetGlobalScore: number;
  daysRemaining: number;
  deadline: string;
  certificationTarget: string;
  totalGaps: number;
  gapsClosed: number;
  gapsInProgress: number;
  gapsOpen: number;
  agentsMobilized: number;
  agentsOnMission: number;
}

export interface AgentMission {
  agent: string;
  icon: string;
  colorToken: string;
  assignedGaps: string[];
  totalTasks: number;
  tasksCompleted: number;
  currentFocus: string;
  motivation: string;
  score: number;
  rank: number;
  streak: string;
}

export interface TimelineEvent {
  day: string;
  target: string;
  status: string;
  description: string;
}

export interface ProgressPoint {
  date: string;
  score: number | null;
  projected?: number;
}

export interface WhatIfScenario {
  scenario: string;
  impact: string;
  probability: string;
  confidence: number;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  agent: string;
  agentIcon: string;
  gapId: string;
  action: string;
  type: string;
}

function mapDbGapToPerformanceGap(dbGap: Record<string, unknown>): PerformanceGap {
  const subtasksRaw = (dbGap.subtasks as Array<Record<string, unknown>>) || [];
  const subtasks: Subtask[] = subtasksRaw.map((st: Record<string, unknown>) => ({
    id: String(st.id || ''),
    label: String(st.label || ''),
    done: Boolean(st.done),
  }));

  return {
    id: String(dbGap.gap_code || ''),
    category: String(dbGap.category || ''),
    metric: String(dbGap.metric || ''),
    current: Number(dbGap.current_value || 0),
    target: Number(dbGap.target_value || 100),
    delta: Number(dbGap.delta_value || 0),
    unit: dbGap.unit ? String(dbGap.unit) : undefined,
    severity: String(dbGap.severity || 'high'),
    assignedAgent: String(dbGap.assigned_agent || ''),
    agentAvatar: String(dbGap.agent_avatar || 'ri-tools-line'),
    rootCause: String(dbGap.root_cause || ''),
    mission: String(dbGap.mission || ''),
    estimatedImpact: String(dbGap.estimated_impact || ''),
    roi: String(dbGap.roi || ''),
    status: String(dbGap.status || 'open'),
    progress: Number(dbGap.progress || 0),
    eta: String(dbGap.eta || ''),
    subtasks,
  };
}

// Seed challenge tables if empty
async function seedChallengeTablesIfEmpty() {
  try {
    const { count: gapCount, error: gapCountErr } = await supabase
      .from('kos_challenge_gaps')
      .select('*', { count: 'exact', head: true });
    if (gapCountErr) throw gapCountErr;

    if ((gapCount || 0) === 0) {
      const gapRows = mockGaps.map((g) => ({
        gap_code: g.id,
        category: g.category,
        metric: g.metric,
        current_value: g.current,
        target_value: g.target,
        delta_value: g.delta,
        unit: g.unit || null,
        severity: g.severity,
        assigned_agent: g.assignedAgent,
        agent_avatar: g.agentAvatar,
        root_cause: g.rootCause,
        mission: g.mission,
        estimated_impact: g.estimatedImpact,
        roi: g.roi,
        status: g.status,
        progress: g.progress,
        eta: g.eta,
        subtasks: g.subtasks,
      }));
      const { error: gapInsertErr } = await supabase.from('kos_challenge_gaps').insert(gapRows);
      if (gapInsertErr) throw gapInsertErr;
    }

    const { count: chCount, error: chCountErr } = await supabase
      .from('kos_performance_challenges')
      .select('*', { count: 'exact', head: true });
    if (chCountErr) throw chCountErr;

    if ((chCount || 0) === 0) {
      const { error: chInsertErr } = await supabase.from('kos_performance_challenges').insert([
        {
          title: mockManifest.title,
          subtitle: mockManifest.subtitle,
          current_global_score: mockManifest.currentGlobalScore,
          target_global_score: mockManifest.targetGlobalScore,
          days_remaining: mockManifest.daysRemaining,
          deadline: mockManifest.deadline,
          certification_target: mockManifest.certificationTarget,
          total_gaps: mockManifest.totalGaps,
          gaps_closed: mockManifest.gapsClosed,
          gaps_in_progress: mockManifest.gapsInProgress,
          gaps_open: mockManifest.gapsOpen,
          agents_mobilized: mockManifest.agentsMobilized,
          agents_on_mission: mockManifest.agentsOnMission,
        },
      ]);
      if (chInsertErr) throw chInsertErr;
    }
  } catch (err: any) {
    console.warn('[Challenge Seed] Skipped:', err.message);
  }
}

export function usePerformance100Challenge() {
  const [manifest, setManifest] = useState<ChallengeManifest>(mockManifest);
  const [gaps, setGaps] = useState<PerformanceGap[]>(mockGaps);
  const [agentMissions, setAgentMissions] = useState<AgentMission[]>(mockAgentMissions);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(mockTimeline);
  const [progressHistory, setProgressHistory] = useState<ProgressPoint[]>(mockProgressHistory);
  const [whatIfScenarios, setWhatIfScenarios] = useState<WhatIfScenario[]>(mockWhatIfScenarios);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock'>('mock');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFromSupabase = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await seedChallengeTablesIfEmpty();

      const [challengeRes, gapsRes, logsRes] = await Promise.all([
        supabase
          .from('kos_performance_challenges')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from('kos_challenge_gaps')
          .select('*')
          .order('gap_code', { ascending: true }),
        supabase
          .from('kos_execution_logs')
          .select('*')
          .eq('block_id', 'CHALLENGE-100')
          .order('timestamp', { ascending: false })
          .limit(50),
      ]);

      if (challengeRes.error) throw challengeRes.error;
      if (gapsRes.error) throw gapsRes.error;
      if (logsRes.error) throw logsRes.error;

      const dbChallenge = challengeRes.data;
      const dbGaps = gapsRes.data || [];
      const dbLogs = logsRes.data || [];

      if (!dbChallenge || dbGaps.length === 0) {
        setDataSource('mock');
        setManifest(mockManifest);
        setGaps(mockGaps);
        setAgentMissions(mockAgentMissions);
        setTimeline(mockTimeline);
        setProgressHistory(mockProgressHistory);
        setWhatIfScenarios(mockWhatIfScenarios);
        setExecutionLogs([]);
        return;
      }

      const liveManifest: ChallengeManifest = {
        title: String(dbChallenge.title || mockManifest.title),
        subtitle: String(dbChallenge.subtitle || mockManifest.subtitle),
        currentGlobalScore: Number(dbChallenge.current_global_score || 93.5),
        targetGlobalScore: Number(dbChallenge.target_global_score || 100),
        daysRemaining: Number(dbChallenge.days_remaining || 14),
        deadline: String(dbChallenge.deadline || '2026-07-01'),
        certificationTarget: String(dbChallenge.certification_target || 'AAAA — Big Four Supreme Certified'),
        totalGaps: Number(dbChallenge.total_gaps || 12),
        gapsClosed: Number(dbChallenge.gaps_closed || 0),
        gapsInProgress: Number(dbChallenge.gaps_in_progress || 0),
        gapsOpen: Number(dbChallenge.gaps_open || 10),
        agentsMobilized: Number(dbChallenge.agents_mobilized || 12),
        agentsOnMission: Number(dbChallenge.agents_on_mission || 12),
      };

      const liveGaps = dbGaps.map(mapDbGapToPerformanceGap);
      const closedCount = liveGaps.filter(g => g.status === 'closed').length;
      const inProgressCount = liveGaps.filter(g => g.status === 'in_progress').length;
      const openCount = liveGaps.filter(g => g.status === 'open').length;

      liveManifest.gapsClosed = closedCount;
      liveManifest.gapsInProgress = inProgressCount;
      liveManifest.gapsOpen = openCount;

      const liveLogs: ExecutionLog[] = dbLogs.map((log: Record<string, unknown>) => {
        const details = (log.details as Record<string, string>) || {};
        return {
          id: String(log.id || ''),
          timestamp: log.timestamp ? new Date(log.timestamp as string).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '',
          agent: String(log.agent_name || ''),
          agentIcon: 'ri-tools-line',
          gapId: details.gap || '',
          action: String(log.action || ''),
          type: String(log.status || 'success'),
        };
      });

      const liveAgentMissions = mockAgentMissions.map(agent => {
        const agentGaps = liveGaps.filter(g => agent.assignedGaps.includes(g.id));
        const allSubtasks = agentGaps.flatMap(g => g.subtasks);
        const doneSubtasks = allSubtasks.filter(s => s.done).length;
        return {
          ...agent,
          tasksCompleted: doneSubtasks,
          totalTasks: allSubtasks.length || agent.totalTasks,
        };
      });

      setManifest(liveManifest);
      setGaps(liveGaps);
      setAgentMissions(liveAgentMissions);
      setExecutionLogs(liveLogs);
      setDataSource('supabase');
    } catch (err) {
      console.warn('[usePerformance100Challenge] Supabase fetch failed, falling back to mock:', (err as Error)?.message);
      setError((err as Error)?.message || 'Unknown error');
      setManifest(mockManifest);
      setGaps(mockGaps);
      setAgentMissions(mockAgentMissions);
      setTimeline(mockTimeline);
      setProgressHistory(mockProgressHistory);
      setWhatIfScenarios(mockWhatIfScenarios);
      setExecutionLogs([]);
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFromSupabase();
  }, [fetchFromSupabase]);

  const refresh = useCallback(() => {
    fetchFromSupabase();
  }, [fetchFromSupabase]);

  return {
    manifest,
    gaps,
    agentMissions,
    timeline,
    progressHistory,
    whatIfScenarios,
    executionLogs,
    dataSource,
    loading,
    error,
    refresh,
  };
}



