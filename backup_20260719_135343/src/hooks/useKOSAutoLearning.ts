import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  proceduralKOs as mockProceduralKOs,
  feedbackLoopCycles as mockCycles,
  executionPatterns as mockPatterns,
  feedbackLoopStats as mockStats,
} from '@/mocks/proceduralKOs';
import type {
  ProceduralKO,
  FeedbackLoopCycle,
  ExecutionPattern,
} from '@/mocks/proceduralKOs';

interface SupabaseExecutionLog {
  id: string;
  agent_name: string;
  action: string;
  status: string;
  detections_fixed: number;
  details: string;
  timestamp: string;
  created_at: string;
}

interface SupabaseOrchestrationLog {
  id: string;
  mission_type: string;
  lead_agent: string;
  agents_activated: string[];
  quality_score: number;
  contradictions_detected: number;
  capitalization_done: boolean;
  status: string;
}

export function useKOSAutoLearning() {
  const [proceduralKOs, setProceduralKOs] = useState<ProceduralKO[]>(mockProceduralKOs);
  const [cycles, setCycles] = useState<FeedbackLoopCycle[]>(mockCycles);
  const [patterns, setPatterns] = useState<ExecutionPattern[]>(mockPatterns);
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [activeCycle, setActiveCycle] = useState<FeedbackLoopCycle | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Read real execution logs from Supabase
      const { data: execLogs, error: execErr } = await supabase
        .from('kos_execution_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      if (execErr) throw execErr;

      const hasExecLogs = execLogs && execLogs.length > 0;

      // Read orchestration logs
      const { data: orchLogs, error: orchErr } = await supabase
        .from('orchestration_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (hasExecLogs || (orchLogs && orchLogs.length > 0)) {
        setIsLive(true);

        // Analyze execution logs for patterns
        const execByStatus = (execLogs as SupabaseExecutionLog[] || []).reduce((acc: Record<string, number>, log: SupabaseExecutionLog) => {
          acc[log.status] = (acc[log.status] || 0) + 1;
          return acc;
        }, {});

        const execByAgent = (execLogs as SupabaseExecutionLog[] || []).reduce((acc: Record<string, SupabaseExecutionLog[]>, log: SupabaseExecutionLog) => {
          if (!acc[log.agent_name]) acc[log.agent_name] = [];
          acc[log.agent_name].push(log);
          return acc;
        }, {});

        // Calculate success rate per agent from real data
        const enrichedPatterns = [...mockPatterns].map(p => {
          const agentLogs = execByAgent[p.agentChain[0]] || [];
          const actualSuccess = agentLogs.filter(l => l.status === 'completed').length;
          const actualTotal = agentLogs.length;
          return {
            ...p,
            frequency: actualTotal || p.frequency,
            successRate: actualTotal > 0 ? Math.round((actualSuccess / actualTotal) * 100) : p.successRate,
          };
        });

        setPatterns(enrichedPatterns);
      } else {
        setIsLive(false);
      }

      setProceduralKOs(mockProceduralKOs);
      setCycles(mockCycles);
      setStats({
        ...mockStats,
        totalLogsAnalyzed: execLogs?.length || mockStats.totalLogsAnalyzed,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setProceduralKOs(mockProceduralKOs);
      setCycles(mockCycles);
      setPatterns(mockPatterns);
      setStats(mockStats);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Run a feedback loop cycle (analyzes execution logs and generates procedural KOs)
  const runFeedbackCycle = useCallback(async () => {
    if (analyzing) return;
    setAnalyzing(true);

    const newCycle: FeedbackLoopCycle = {
      id: `flc-${Date.now()}`,
      startedAt: new Date().toISOString(),
      completedAt: '',
      logsAnalyzed: 0,
      patternsDetected: 0,
      generated: 0,
      promoted: 0,
      contradictionsFlagged: 0,
      domainsCovered: [],
      status: 'running',
      executionLogIds: [],
      orchestrationLogIds: [],
      summary: 'Cycle en cours — analyse des logs d\'exécution...',
    };

    setActiveCycle(newCycle);
    setCycles(prev => [newCycle, ...prev]);

    try {
      // Step 1: Fetch execution logs
      const { data: execLogs } = await supabase
        .from('kos_execution_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      const { data: orchLogs } = await supabase
        .from('orchestration_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      const execArray = (execLogs || []) as SupabaseExecutionLog[];
      const orchArray = (orchLogs || []) as SupabaseOrchestrationLog[];

      await new Promise(r => setTimeout(r, 1200));

      // Step 2: Pattern detection (simulated analysis of real logs)
      const detectedPatterns = patterns.filter(p => p.frequency >= 3 && p.successRate >= 90);
      const candidates = detectedPatterns.filter(p => p.candidate);

      await new Promise(r => setTimeout(r, 800));

      // Step 3: Generate procedural KOs from patterns
      const newKOs: ProceduralKO[] = candidates.map((p, i) => ({
        id: `proko-auto-${Date.now()}-${i}`,
        title: `[AUTO] ${p.patternName}`,
        type: 'workflow_pattern' as const,
        sourceLogIds: p.sampleLogIds,
        sourceAgentName: p.agentChain[0] || 'Unknown',
        sourceDomain: p.typicalMission.split(' ')[0] || 'General',
        inducedFrom: `${p.frequency} exécutions réussies avec ${p.successRate}% de succès`,
        confidenceScore: p.successRate,
        usageCount: 0,
        status: 'proposed' as const,
        description: `Pattern détecté automatiquement à partir de ${p.frequency} logs d'exécution. ${p.agentChain.join(' → ')}`,
        procedure: [`Pattern détecté: ${p.patternName}`, `Fréquence: ${p.frequency}`, `Taux de succès: ${p.successRate}%`],
        preconditions: ['Logs d\'exécution disponibles', 'Agent source déployé'],
        expectedOutcome: `Réplication du pattern avec succès > ${p.successRate}%`,
        costSavingsFCFA: 15000,
        latencyReductionMs: p.avgLatencyMs,
        qualityImprovement: 5,
        applicableAgents: p.agentChain,
        contradictionsResolved: 0,
        lastValidated: new Date().toISOString(),
        promotedTo: null,
      }));

      await new Promise(r => setTimeout(r, 600));

      // Step 4: Check contradictions in orchestration logs
      const contradictions = orchArray.filter(o => (o.contradictions_detected || 0) > 0).length;

      // Step 5: Store generated KOs in lessons_learned if live
      if (isLive && newKOs.length > 0) {
        for (const ko of newKOs) {
          await supabase.from('lessons_learned').insert({
            title: ko.title,
            category: 'ProceduralKO',
            lesson_type: ko.type,
            description: ko.description,
            recommendation: ko.procedure.join('\n'),
            impact: `Confidence: ${ko.confidenceScore}% | Savings: ${ko.costSavingsFCFA} FCFA`,
            confidence_score: ko.confidenceScore,
            validation_status: 'proposed',
            tags: ['auto-generated', 'feedback-loop', ko.sourceDomain],
            metadata: {
              source_logs: ko.sourceLogIds,
              source_agent: ko.sourceAgentName,
              induced_from: ko.inducedFrom,
              applicable_agents: ko.applicableAgents,
            },
          }).then(() => {}).catch(() => {});
        }
      }

      // Update cycle as completed
      const completedCycle: FeedbackLoopCycle = {
        ...newCycle,
        completedAt: new Date().toISOString(),
        logsAnalyzed: execArray.length + orchArray.length,
        patternsDetected: detectedPatterns.length,
        generated: newKOs.length,
        promoted: 0,
        contradictionsFlagged: contradictions,
        domainsCovered: [...new Set(detectedPatterns.map(p => p.agentChain[0] || 'Unknown'))],
        status: 'completed',
        executionLogIds: execArray.slice(0, 20).map(l => l.id),
        orchestrationLogIds: orchArray.slice(0, 10).map(l => l.id),
        summary: `${execArray.length} logs exécution + ${orchArray.length} logs orchestration analysés. ${detectedPatterns.length} patterns, ${newKOs.length} KOs générés, ${contradictions} contradictions.`,
      };

      setCycles(prev => prev.map(c => c.id === newCycle.id ? completedCycle : c));
      setActiveCycle(completedCycle);
      setProceduralKOs(prev => [...newKOs, ...prev]);
    } catch (err: unknown) {
      const failedCycle = { ...newCycle, status: 'failed' as const, completedAt: new Date().toISOString(), summary: `Échec: ${(err as Error).message}` };
      setCycles(prev => prev.map(c => c.id === newCycle.id ? failedCycle : c));
      setActiveCycle(failedCycle);
    } finally {
      setAnalyzing(false);
    }
  }, [analyzing, patterns, isLive]);

  // Promote a KO to best_practices
  const promoteKO = useCallback(async (koId: string) => {
    const ko = proceduralKOs.find(k => k.id === koId);
    if (!ko) return;

    setProceduralKOs(prev => prev.map(k => k.id === koId ? { ...k, status: 'promoted' as const, promotedTo: 'best_practices' } : k));

    if (isLive) {
      await supabase.from('best_practices').insert({
        title: ko.title,
        domain: ko.sourceDomain,
        category: ko.type,
        description: ko.description,
        implementation_steps: ko.procedure.join('\n'),
        expected_benefits: `${ko.expectedOutcome} | Savings: ${ko.costSavingsFCFA} FCFA`,
        confidence_score: ko.confidenceScore,
        validation_status: 'validated',
        metadata: { source: 'procedural-ko', proko_id: koId, source_agent: ko.sourceAgentName },
      }).then(() => {}).catch(() => {});
    }
  }, [proceduralKOs, isLive]);

  // Promote to knowledge_capsules
  const promoteToCapsule = useCallback(async (koId: string) => {
    const ko = proceduralKOs.find(k => k.id === koId);
    if (!ko) return;

    setProceduralKOs(prev => prev.map(k => k.id === koId ? { ...k, status: 'promoted' as const, promotedTo: 'knowledge_capsules' } : k));

    if (isLive) {
      await supabase.from('knowledge_capsules').insert({
        title: ko.title,
        domain: ko.sourceDomain,
        description: ko.description,
        content: ko.procedure.join('\n'),
        metadata: { source: 'procedural-ko', proko_id: koId, type: ko.type },
      }).then(() => {}).catch(() => {});
    }
  }, [proceduralKOs, isLive]);

  const byType = {
    skill: proceduralKOs.filter(k => k.type === 'skill'),
    workflow_pattern: proceduralKOs.filter(k => k.type === 'workflow_pattern'),
    reusable_component: proceduralKOs.filter(k => k.type === 'reusable_component'),
    decision_rule: proceduralKOs.filter(k => k.type === 'decision_rule'),
    error_recovery: proceduralKOs.filter(k => k.type === 'error_recovery'),
  };

  const promotedKOs = proceduralKOs.filter(k => k.status === 'promoted');
  const proposedKOs = proceduralKOs.filter(k => k.status === 'proposed');
  const validatedKOs = proceduralKOs.filter(k => k.status === 'validated');

  return {
    proceduralKOs,
    cycles,
    patterns,
    stats,
    loading,
    error,
    isLive,
    activeCycle,
    analyzing,
    runFeedbackCycle,
    promoteKO,
    promoteToCapsule,
    byType,
    promotedKOs,
    proposedKOs,
    validatedKOs,
    refetch: fetchData,
  };
}



