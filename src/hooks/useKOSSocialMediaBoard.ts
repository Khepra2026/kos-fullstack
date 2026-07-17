import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KOS_SOCIAL_AGENTS,
  SOCIAL_NETWORKS,
  EXECUTION_JOBS,
  BOARD_STATS,
  AUTO_INSTRUCT_PROMPTS,
  type KOSSocialAgent,
  type SocialNetworkStatus,
  type ExecutionJob,
  type BoardStats,
} from '@/mocks/kosSocialMediaBoard';

export type SupportedLanguage = 'fr' | 'en' | 'pt' | 'ar';

export const BOARD_LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export interface BoardExecutionResult {
  agentId: string;
  agentName: string;
  edgeFunction: string;
  status: 'success' | 'failed';
  message: string;
  durationMs: number;
}

export interface BoardExecutionLog {
  id: number;
  instructionId: string;
  instructionLabel: string;
  languages: string[];
  targetAgents: string[];
  status: 'queued' | 'executing' | 'completed' | 'partial' | 'failed';
  results: BoardExecutionResult[];
  resultSummary: string;
  errorMessage: string | null;
  totalAgentsCalled: number;
  agentsSucceeded: number;
  agentsFailed: number;
  durationMs: number | null;
  createdAt: string;
  completedAt: string | null;
}

interface BoardState {
  agents: KOSSocialAgent[];
  networks: SocialNetworkStatus[];
  jobs: ExecutionJob[];
  stats: BoardStats;
  loading: boolean;
  error: string | null;
  source: 'live' | 'mock';
  executionLogs: BoardExecutionLog[];
  logsLoading: boolean;
}

function mapDbLogToBoardLog(row: Record<string, unknown>): BoardExecutionLog {
  return {
    id: row.id as number,
    instructionId: (row.instruction_id as string) || '',
    instructionLabel: (row.instruction_label as string) || '',
    languages: Array.isArray(row.languages) ? row.languages as string[] : ['fr'],
    targetAgents: Array.isArray(row.target_agents) ? row.target_agents as string[] : [],
    status: (row.status as BoardExecutionLog['status']) || 'queued',
    results: Array.isArray(row.results) ? row.results as BoardExecutionResult[] : [],
    resultSummary: (row.result_summary as string) || '',
    errorMessage: (row.error_message as string) || null,
    totalAgentsCalled: (row.total_agents_called as number) || 0,
    agentsSucceeded: (row.agents_succeeded as number) || 0,
    agentsFailed: (row.agents_failed as number) || 0,
    durationMs: (row.duration_ms as number) || null,
    createdAt: (row.created_at as string) || '',
    completedAt: (row.completed_at as string) || null,
  };
}

/**
 * Maps an agent ID from the Board to the actual Supabase Edge Function name to call.
 */
function getEdgeFunctionForAgent(agentId: string): { fn: string; action: string } | null {
  const mapping: Record<string, { fn: string; action: string }> = {
    'kos-social-content-generator': { fn: 'kos-social-master', action: 'generate_copy' },
    'kos-linkedin-publisher': { fn: 'kos-linkedin-master', action: 'publish' },
    'kos-youtube-publisher': { fn: 'kos-youtube-master', action: 'publish' },
    'kos-social-copy': { fn: 'kos-social-master', action: 'generate_copy' },
    'kos-social-scheduler': { fn: 'kos-social-master', action: 'schedule' },
    'kos-x-auto-generator': { fn: 'kos-social-master', action: 'generate_copy' },
    'kos-social-quality-engine': { fn: 'kos-social-master', action: 'quality_check' },
    'kos-lead-magnet-distributor': { fn: 'kos-linkedin-master', action: 'publish' },
    'kos-linkedin-social-selling-engine': { fn: 'kos-linkedin-master', action: 'sse_publish' },
    'kos-video-brief-generator': { fn: 'kos-youtube-master', action: 'generate_brief' },
  };
  return mapping[agentId] || null;
}

export function useKOSSocialMediaBoard() {
  const [state, setState] = useState<BoardState>({
    agents: [],
    networks: [],
    jobs: [],
    stats: BOARD_STATS,
    loading: true,
    error: null,
    source: 'mock',
    executionLogs: [],
    logsLoading: false,
  });

  const [selectedLanguages, setSelectedLanguages] = useState<SupportedLanguage[]>(['fr']);
  const [isExecuting, setIsExecuting] = useState(false);

  const fetchExecutionLogs = useCallback(async () => {
    setState(prev => ({ ...prev, logsLoading: true }));
    try {
      const { data, error } = await supabase
        .from('board_execution_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      if (!error && data) {
        const logs = (data as Record<string, unknown>[]).map(mapDbLogToBoardLog);
        setState(prev => ({ ...prev, executionLogs: logs, logsLoading: false }));
        return;
      }
    } catch (err) {
      console.warn('[Board] Failed to fetch execution logs:', (err as Error)?.message);
    }
    setState(prev => ({ ...prev, logsLoading: false }));
  }, []);

  const refresh = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { data: jobsData, error: jobsError } = await supabase
        .from('social_automation_queue')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!jobsError && jobsData && jobsData.length > 0) {
        const liveJobs: ExecutionJob[] = (jobsData as Record<string, unknown>[]).map((row, i) => ({
          id: (row.id as string) || `LIVE-${i}`,
          agent_id: (row.agent_generated as string) || 'kos-social-content-generator',
          agent_name: 'KOS Agent Live',
          type: (row.post_type as ExecutionJob['type']) || 'text',
          platform: (row.platform as string) || 'linkedin',
          title: (row.title as string) || '',
          status: (row.status as ExecutionJob['status']) || 'queued',
          progress: (row.status === 'published' ? 100 : row.status === 'scheduled' ? 100 : 0),
          scheduled_for: (row.scheduled_for as string) || null,
          published_at: null,
          error_message: null,
          content_preview: (row.excerpt as string) || '',
          created_at: (row.created_at as string) || new Date().toISOString(),
        }));

        const mergedJobs = [...EXECUTION_JOBS.filter(j => !liveJobs.some(lj => lj.id === j.id)), ...liveJobs];

        setState(prev => ({
          ...prev,
          agents: KOS_SOCIAL_AGENTS,
          networks: SOCIAL_NETWORKS,
          jobs: mergedJobs,
          stats: BOARD_STATS,
          loading: false,
          error: null,
          source: 'live',
        }));
        fetchExecutionLogs();
        return;
      }

      if (jobsError) console.warn('[Board] Supabase fetch failed:', jobsError.message);
    } catch (err) {
      console.warn('[Board] Exception:', (err as Error)?.message);
    }

    setState(prev => ({
      ...prev,
      agents: KOS_SOCIAL_AGENTS,
      networks: SOCIAL_NETWORKS,
      jobs: EXECUTION_JOBS,
      stats: BOARD_STATS,
      loading: false,
      error: null,
      source: 'mock',
    }));
    fetchExecutionLogs();
  }, [fetchExecutionLogs]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /**
   * Execute an instruction → calls real Edge Functions for each target agent.
   * Logs the entire execution in board_execution_logs for traceability.
   */
  const executeInstruction = useCallback(async (
    instructId: string,
    instructLabel: string,
    agentIds: string[],
    languages: SupportedLanguage[],
    payload?: Record<string, unknown>
  ): Promise<{ logId: number | null; results: BoardExecutionResult[]; summary: string }> => {
    setIsExecuting(true);
    const startTime = Date.now();
    const results: BoardExecutionResult[] = [];

    const langs = languages.length > 0 ? languages : ['fr'];

    // Insert initial log entry
    let logId: number | null = null;
    try {
      const { data: inserted } = await supabase
        .from('board_execution_logs')
        .insert({
          instruction_id: instructId,
          instruction_label: instructLabel,
          source_page: 'kos-social-media-board',
          target_agents: agentIds,
          languages: langs,
          request_payload: payload || {},
          status: 'executing',
          user_initiated: true,
        })
        .select('id')
        .single();

      if (inserted) logId = (inserted as Record<string, unknown>).id as number;
    } catch (err) {
      console.warn('[Board] Failed to create execution log:', (err as Error)?.message);
    }

    // Execute each agent's edge function
    for (const agentId of agentIds) {
      const agentStart = Date.now();
      const mapping = getEdgeFunctionForAgent(agentId);
      const agent = KOS_SOCIAL_AGENTS.find(a => a.id === agentId);

      if (!mapping) {
        results.push({
          agentId,
          agentName: agent?.name || agentId,
          edgeFunction: 'none',
          status: 'failed',
          message: `Aucune Edge Function mappée pour l'agent ${agentId}`,
          durationMs: Date.now() - agentStart,
        });
        continue;
      }

      try {
        // Build payload based on agent type and instruction
        const fnPayload: Record<string, unknown> = {
          board_instruction_id: instructId,
          board_instruction_label: instructLabel,
          languages: langs,
          ...payload,
          agent_id: agentId,
          platform: agent?.platform?.[0] || 'linkedin',
        };

        // For kos-social-copy, pass a slug if available
        if (mapping.fn === 'kos-social-master') {
          fnPayload.action = 'generate_batch';
          fnPayload.count = agent?.platform?.includes('linkedin') ? 6 : 4;
        }

        // For publish functions
        if (mapping.fn === 'kos-linkedin-master') {
          fnPayload.action = 'publish';
          fnPayload.count = 3;
        }

        if (mapping.fn === 'kos-youtube-master') {
          fnPayload.action = 'publish';
          fnPayload.count = 2;
        }

        const { data, error } = await supabase.functions.invoke(mapping.fn, {
          body: fnPayload,
        });

        const duration = Date.now() - agentStart;

        if (error) {
          results.push({
            agentId,
            agentName: agent?.name || agentId,
            edgeFunction: mapping.fn,
            status: 'failed',
            message: error.message || 'Erreur Edge Function',
            durationMs: duration,
          });
        } else {
          const responseData = data as Record<string, unknown> | undefined;
          const success = responseData?.success !== false;
          results.push({
            agentId,
            agentName: agent?.name || agentId,
            edgeFunction: mapping.fn,
            status: success ? 'success' : 'failed',
            message: success
              ? `Exécuté : ${mapping.fn} (${responseData?.published_count || responseData?.count || 'ok'})`
              : (responseData?.error as string) || 'Erreur inconnue',
            durationMs: duration,
          });
        }
      } catch (err) {
        results.push({
          agentId,
          agentName: agent?.name || agentId,
          edgeFunction: mapping.fn,
          status: 'failed',
          message: (err as Error)?.message || 'Exception réseau',
          durationMs: Date.now() - agentStart,
        });
      }

      // Small delay between agents to avoid rate limits
      if (agentIds.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    // Compute summary
    const succeeded = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'failed').length;
    const totalDuration = Date.now() - startTime;
    const overallStatus = succeeded === results.length ? 'completed' : failed === results.length ? 'failed' : 'partial';

    const summary = `${succeeded}/${results.length} agents OK · ${failed} échecs · ${totalDuration}ms · Langues: ${langs.join(', ')}`;

    // Update log entry
    if (logId) {
      try {
        await supabase
          .from('board_execution_logs')
          .update({
            status: overallStatus,
            results: results,
            result_summary: summary,
            total_agents_called: results.length,
            agents_succeeded: succeeded,
            agents_failed: failed,
            duration_ms: totalDuration,
            completed_at: new Date().toISOString(),
          })
          .eq('id', logId);
      } catch (err) {
        console.warn('[Board] Failed to update execution log:', (err as Error)?.message);
      }
    }

    setIsExecuting(false);
    fetchExecutionLogs();

    return { logId, results, summary };
  }, [fetchExecutionLogs]);

  return {
    ...state,
    refresh,
    executeInstruction,
    fetchExecutionLogs,
    selectedLanguages,
    setSelectedLanguages,
    isExecuting,
  };
}