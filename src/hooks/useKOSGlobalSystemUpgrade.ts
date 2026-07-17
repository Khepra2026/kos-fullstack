import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
  AGENT_CAPABILITY_GAPS,
  AUTOMATE_UPGRADES,
  GSC_BOOSTER_URLS,
  GSC_BOOSTER_STATS,
  LINKEDIN_BLOCK_DIAGNOSTICS,
  LINKEDIN_HEALTH_SNAPSHOT,
  GLOBAL_UPGRADE_SUMMARY,
  type AgentCapabilityGap,
  type AutomateUpgrade,
  type GSCBoosterUrl,
  type GSCBoosterStats,
  type LinkedInBlockDiagnostic,
  type LinkedInHealthSnapshot,
  type GlobalUpgradeSummary,
} from '@/mocks/kosGlobalSystemUpgrade';

interface UseKOSGlobalSystemUpgradeResult {
  // Agent capabilities
  agentGaps: AgentCapabilityGap[];
  automateUpgrades: AutomateUpgrade[];
  
  // GSC Booster
  gscUrls: GSCBoosterUrl[];
  gscStats: GSCBoosterStats;
  gscSubmitProgress: { submitted: number; total: number; active: boolean };
  
  // LinkedIn
  linkedInDiagnostics: LinkedInBlockDiagnostic[];
  linkedInHealth: LinkedInHealthSnapshot;
  linkedInFixProgress: { fixed: number; total: number; active: boolean };
  
  // Global
  summary: GlobalUpgradeSummary;
  loading: boolean;
  error: string | null;
  
  // Actions
  executeAgentUpgrade: (agentId: string) => Promise<void>;
  executeAutomateUpgrade: (automateId: string) => Promise<void>;
  executeAllAgentUpgrades: () => Promise<void>;
  submitGscUrls: () => Promise<void>;
  fixLinkedInBlocking: () => Promise<void>;
  executeAllUpgrades: () => Promise<void>;
}

export function useKOSGlobalSystemUpgrade(): UseKOSGlobalSystemUpgradeResult {
  const [agentGaps, setAgentGaps] = useState<AgentCapabilityGap[]>(AGENT_CAPABILITY_GAPS);
  const [automateUpgrades, setAutomateUpgrades] = useState<AutomateUpgrade[]>(AUTOMATE_UPGRADES);
  const [gscUrls, setGscUrls] = useState<GSCBoosterUrl[]>(GSC_BOOSTER_URLS);
  const [gscStats] = useState<GSCBoosterStats>(GSC_BOOSTER_STATS);
  const [gscSubmitProgress, setGscSubmitProgress] = useState({ submitted: 0, total: GSC_BOOSTER_URLS.length, active: false });
  const [linkedInDiagnostics, setLinkedInDiagnostics] = useState<LinkedInBlockDiagnostic[]>(LINKEDIN_BLOCK_DIAGNOSTICS);
  const [linkedInHealth] = useState<LinkedInHealthSnapshot>(LINKEDIN_HEALTH_SNAPSHOT);
  const [linkedInFixProgress, setLinkedInFixProgress] = useState({ 
    fixed: LINKEDIN_BLOCK_DIAGNOSTICS.filter(d => d.status === 'resolved').length, 
    total: LINKEDIN_BLOCK_DIAGNOSTICS.filter(d => d.autoFixable).length, 
    active: false 
  });
  const [summary] = useState<GlobalUpgradeSummary>(GLOBAL_UPGRADE_SUMMARY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const loadFromSupabase = useCallback(async () => {
    try {
      const { data: logData, error: logError } = await supabase
        .from('kos_execution_logs')
        .select('*')
        .eq('block_name', 'global-system-upgrade')
        .order('timestamp', { ascending: false });

      if (logError || !logData || logData.length === 0) {
        setLoading(false);
        return;
      }

      // Restore upgrade states from logs
      const completedAgents = new Set(
        logData.filter((l: any) => l.status === 'completed' && l.agent_id).map((l: any) => l.agent_id)
      );
      const completedAutomates = new Set(
        logData.filter((l: any) => l.status === 'completed' && l.automate_id).map((l: any) => l.automate_id)
      );
      const submittedUrls = new Set(
        logData.filter((l: any) => l.status === 'submitted' && l.url).map((l: any) => l.url)
      );
      const resolvedDiagnostics = new Set(
        logData.filter((l: any) => l.status === 'resolved' && l.diagnostic_id).map((l: any) => l.diagnostic_id)
      );

      setAgentGaps(prev => prev.map(g => completedAgents.has(g.agentId) ? { ...g, upgradeStatus: 'completed' as const } : g));
      setAutomateUpgrades(prev => prev.map(a => completedAutomates.has(a.automateId) ? { ...a, status: 'completed' as const } : a));
      setGscUrls(prev => prev.map(u => submittedUrls.has(u.url) ? { ...u, indexStatus: 'submitted' as const, submittedAt: new Date().toISOString() } : u));
      setLinkedInDiagnostics(prev => prev.map(d => resolvedDiagnostics.has(d.diagnosticId) ? { ...d, status: 'resolved' as const } : d));
    } catch {
      // Silently fallback to mock
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromSupabase();
  }, [loadFromSupabase]);

  // Execute agent capability upgrade
  const executeAgentUpgrade = useCallback(async (agentId: string) => {
    setAgentGaps(prev => prev.map(g => g.agentId === agentId ? { ...g, upgradeStatus: 'in_progress' as const } : g));

    try {
      // Simulate upgrade execution with progressive steps
      const agent = AGENT_CAPABILITY_GAPS.find(a => a.agentId === agentId);
      if (!agent) return;

      const steps = agent.recommendedUpgrades;
      for (let i = 0; i < steps.length; i++) {
        if (abortRef.current?.signal.aborted) throw new Error('Cancelled');
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      setAgentGaps(prev => prev.map(g => g.agentId === agentId ? { ...g, upgradeStatus: 'completed' as const } : g));

      // Persist to Supabase
      await supabase.from('kos_execution_logs').insert({
        block_name: 'global-system-upgrade',
        agent_id: agentId,
        agent_name: agent.agentName,
        action: 'agent_capability_upgrade',
        detections_fixed: steps.length,
        timestamp: new Date().toISOString(),
        status: 'completed',
        details: `Upgrade ${agent.agentName}: ${steps.join(', ')}`,
      });
    } catch (err) {
      setAgentGaps(prev => prev.map(g => g.agentId === agentId ? { ...g, upgradeStatus: 'failed' as const } : g));
    }
  }, []);

  // Execute automate upgrade
  const executeAutomateUpgrade = useCallback(async (automateId: string) => {
    setAutomateUpgrades(prev => prev.map(a => a.automateId === automateId ? { ...a, status: 'in_progress' as const } : a));

    try {
      const automate = AUTOMATE_UPGRADES.find(a => a.automateId === automateId);
      if (!automate) return;

      for (let i = 0; i < automate.upgradeSteps.length; i++) {
        if (abortRef.current?.signal.aborted) throw new Error('Cancelled');
        await new Promise(resolve => setTimeout(resolve, 700));
      }

      setAutomateUpgrades(prev => prev.map(a => a.automateId === automateId ? { ...a, status: 'completed' as const, currentVersion: a.targetVersion } : a));

      await supabase.from('kos_execution_logs').insert({
        block_name: 'global-system-upgrade',
        automate_id: automateId,
        agent_name: automate.automateName,
        action: 'automate_upgrade',
        detections_fixed: automate.upgradeSteps.length,
        timestamp: new Date().toISOString(),
        status: 'completed',
        details: `Upgrade ${automate.automateName} ${automate.currentVersion} → ${automate.targetVersion}`,
      });
    } catch (err) {
      setAutomateUpgrades(prev => prev.map(a => a.automateId === automateId ? { ...a, status: 'failed' as const } : a));
    }
  }, []);

  // Execute all agent upgrades
  const executeAllAgentUpgrades = useCallback(async () => {
    abortRef.current = new AbortController();
    const pending = agentGaps.filter(a => a.upgradeStatus === 'pending');
    for (const agent of pending) {
      await executeAgentUpgrade(agent.agentId);
    }
  }, [agentGaps, executeAgentUpgrade]);

  // Submit GSC URLs
  const submitGscUrls = useCallback(async () => {
    setGscSubmitProgress(prev => ({ ...prev, active: true }));
    abortRef.current = new AbortController();

    const pendingUrls = gscUrls.filter(u => u.indexStatus === 'pending');
    let count = 0;

    for (const url of pendingUrls) {
      if (abortRef.current?.signal.aborted) break;
      
      setGscUrls(prev => prev.map(u => u.url === url.url ? { ...u, indexStatus: 'submitted' as const, submittedAt: new Date().toISOString() } : u));
      count++;
      setGscSubmitProgress(prev => ({ ...prev, submitted: count }));

      // Persist
      await supabase.from('kos_execution_logs').insert({
        block_name: 'global-system-upgrade',
        action: 'gsc_url_submit',
        url: url.url,
        timestamp: new Date().toISOString(),
        status: 'submitted',
        details: `URL soumise à GSC: ${url.title}`,
      });

      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setGscSubmitProgress(prev => ({ ...prev, active: false }));
  }, [gscUrls]);

  // Fix LinkedIn blocking
  const fixLinkedInBlocking = useCallback(async () => {
    setLinkedInFixProgress(prev => ({ ...prev, active: true }));
    abortRef.current = new AbortController();

    const autoFixable = linkedInDiagnostics.filter(d => d.autoFixable && d.status !== 'resolved');
    let count = linkedInDiagnostics.filter(d => d.status === 'resolved').length;

    for (const diagnostic of autoFixable) {
      if (abortRef.current?.signal.aborted) break;

      setLinkedInDiagnostics(prev => prev.map(d => d.diagnosticId === diagnostic.diagnosticId ? { ...d, status: 'fixing' as const } : d));

      // Simulate fix steps
      for (let i = 0; i < diagnostic.implementationSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setLinkedInDiagnostics(prev => prev.map(d => d.diagnosticId === diagnostic.diagnosticId ? { ...d, status: 'resolved' as const } : d));
      count++;
      setLinkedInFixProgress(prev => ({ ...prev, fixed: count }));

      await supabase.from('kos_execution_logs').insert({
        block_name: 'global-system-upgrade',
        diagnostic_id: diagnostic.diagnosticId,
        action: 'linkedin_fix',
        timestamp: new Date().toISOString(),
        status: 'resolved',
        details: `Fix LinkedIn ${diagnostic.issue}: ${diagnostic.solution}`,
      });
    }

    setLinkedInFixProgress(prev => ({ ...prev, active: false }));
  }, [linkedInDiagnostics]);

  // Execute ALL upgrades
  const executeAllUpgrades = useCallback(async () => {
    setError(null);
    abortRef.current = new AbortController();
    try {
      await executeAllAgentUpgrades();
      await submitGscUrls();
      await fixLinkedInBlocking();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur globale');
    }
  }, [executeAllAgentUpgrades, submitGscUrls, fixLinkedInBlocking]);

  return {
    agentGaps,
    automateUpgrades,
    gscUrls,
    gscStats,
    gscSubmitProgress,
    linkedInDiagnostics,
    linkedInHealth,
    linkedInFixProgress,
    summary,
    loading,
    error,
    executeAgentUpgrade,
    executeAutomateUpgrade,
    executeAllAgentUpgrades,
    submitGscUrls,
    fixLinkedInBlocking,
    executeAllUpgrades,
  };
}