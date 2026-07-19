import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface agent {
  id: string;
  name: string;
  system_prompt: string;
  model: string;
  version: number;
  accuracy: number;
  last_trained: string;
  auto_dev_enabled: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface trainingLog {
  id: number;
  agent_id: string;
  question: string;
  answer: string;
  human_score: number | null;
  sources: number[];
  embedding: number[] | null;
  created_at: string;
  used_for_retrain: boolean;
  retrain_batch_id: string | null;
}

export interface AgentsStats {
  totalAgents: number;
  autoDevEnabled: number;
  avgAccuracy: number;
  totalTrainingLogs: number;
  lowScoreLogs: number;
  pendingRetrain: number;
}

export function useKOSAgents() {
  const [agents, setAgents] = useState<agent[]>([]);
  const [logs, setLogs] = useState<trainingLog[]>([]);
  const [stats, setStats] = useState<AgentsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: agentsData, error: agentsError } = await supabase
        .from('kos_agents')
        .select('*')
        .order('name');

      if (agentsError) throw agentsError;

      const { data: logsData, error: logsError } = await supabase
        .from('kos_training_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (logsError) throw logsError;

      const typedAgents: agent[] = (agentsData || []).map((a) => ({
        ...a,
        metadata: (a.metadata as Record<string, unknown>) || {},
      }));

      const typedLogs: trainingLog[] = (logsData || []).map((l) => ({
        ...l,
        sources: l.sources || [],
        embedding: l.embedding || null,
      }));

      setAgents(typedAgents);
      setLogs(typedLogs);

      // Compute stats
      const totalAgents = typedAgents.length;
      const autoDevEnabled = typedAgents.filter((a) => a.auto_dev_enabled).length;
      const avgAccuracy = totalAgents > 0
        ? typedAgents.reduce((sum, a) => sum + (a.accuracy || 0), 0) / totalAgents
        : 0;
      const totalTrainingLogs = typedLogs.length;
      const lowScoreLogs = typedLogs.filter((l) => l.human_score !== null && l.human_score < 80).length;
      const pendingRetrain = typedLogs.filter((l) => !l.used_for_retrain).length;

      setStats({
        totalAgents,
        autoDevEnabled,
        avgAccuracy,
        totalTrainingLogs,
        lowScoreLogs,
        pendingRetrain,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement des agents KOS');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const submitTrainingLog = useCallback(async (
    agentId: string,
    question: string,
    answer: string,
    humanScore: number,
    sources: number[] = []
  ) => {
    try {
      const { data, error: insertError } = await supabase
        .from('kos_training_log')
        .insert({
          agent_id: agentId,
          question,
          answer,
          human_score: humanScore,
          sources,
          used_for_retrain: false,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Refresh
      await fetchAgents();
      return data as trainingLog;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors du log de training');
    }
  }, [fetchAgents]);

  const toggleAutoDev = useCallback(async (agentId: string, enabled: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from('kos_agents')
        .update({ auto_dev_enabled: enabled, last_trained: new Date().toISOString() })
        .eq('id', agentId);

      if (updateError) throw updateError;
      await fetchAgents();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur mise à jour agent');
    }
  }, [fetchAgents]);

  return {
    agents,
    logs,
    stats,
    loading,
    error,
    refresh: fetchAgents,
    submitTrainingLog,
    toggleAutoDev,
  };
}



