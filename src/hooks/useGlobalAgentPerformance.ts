import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface AgentPerformance {
  agentId: string;
  agentName: string;
  domainId: string;
  domainName: string;
  icon: string;
  color: string;
  healthScore: number;
  bigFourScore: number;
  status: 'optimal' | 'stable' | 'degraded' | 'critical';
  totalIssues: number;
  criticalIssues: number;
  majorIssues: number;
  minorIssues: number;
  fixedIssues: number;
  autoFixable: number;
  lastScan: string;
  description: string;
  hubUrl: string;
  correctiveActions: CorrectiveAction[];
}

export interface CorrectiveAction {
  actionId: string;
  title: string;
  description: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'in_progress' | 'fixed' | 'pending_block';
  autoFixAvailable: boolean;
  estimatedEffort: string;
  impactEstimate: string;
  assignedAgent: string;
}

export interface BlockCorrectiveManifest {
  blockId: string;
  blockName: string;
  description: string;
  targetDomains: string[];
  totalAgentsAffected: number;
  totalActions: number;
  criticalActions: number;
  majorActions: number;
  autoFixableActions: number;
  estimatedTotalEffort: string;
  globalImpact: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface DomainSummary {
  domainId: string;
  domainName: string;
  icon: string;
  color: string;
  agentCount: number;
  avgHealthScore: number;
  avgBigFourScore: number;
  totalIssues: number;
  criticalIssues: number;
  majorIssues: number;
  fixedIssues: number;
  autoFixable: number;
  agentsOptimal: number;
  agentsStable: number;
  agentsDegraded: number;
  agentsCritical: number;
}

export interface GlobalScanStats {
  totalAgents: number;
  agentsScanned: number;
  agentsOptimal: number;
  agentsStable: number;
  agentsDegraded: number;
  agentsCritical: number;
  totalIssues: number;
  criticalOpen: number;
  majorOpen: number;
  minorOpen: number;
  totalFixed: number;
  autoFixable: number;
  requireManual: number;
  avgHealthScore: number;
  avgBigFourScore: number;
  domainsOptimal: number;
  domainsStable: number;
  domainsDegraded: number;
  totalCorrectiveBlocks: number;
  correctiveBlocksInProgress: number;
  correctiveBlocksPending: number;
  estimatedGlobalEffort: string;
  lastFullScan: string;
  nextFullScan: string;
}

interface SupabaseAgentRow {
  agent_id: string;
  agent_name: string;
  domain_id: string;
  domain_name: string;
  icon: string;
  color: string;
  health_score: number;
  big_four_score: number;
  status: string;
  total_issues: number;
  critical_issues: number;
  major_issues: number;
  minor_issues: number;
  fixed_issues: number;
  auto_fixable: number;
  last_scan: string;
  description: string;
  hub_url: string;
  corrective_actions: CorrectiveAction[];
}

interface SupabaseBlockRow {
  block_id: string;
  block_name: string;
  description: string;
  target_domains: string[];
  total_agents_affected: number;
  total_actions: number;
  critical_actions: number;
  major_actions: number;
  auto_fixable_actions: number;
  estimated_total_effort: string;
  global_impact: string;
  status: string;
}

interface SupabaseDomainRow {
  domain_id: string;
  domain_name: string;
  icon: string;
  color: string;
  agent_count: number;
  avg_health_score: number;
  avg_big_four_score: number;
  total_issues: number;
  critical_issues: number;
  major_issues: number;
  fixed_issues: number;
  auto_fixable: number;
  agents_optimal: number;
  agents_stable: number;
  agents_degraded: number;
  agents_critical: number;
}

interface SupabaseGlobalStatsRow {
  total_agents: number;
  agents_scanned: number;
  agents_optimal: number;
  agents_stable: number;
  agents_degraded: number;
  agents_critical: number;
  total_issues: number;
  critical_open: number;
  major_open: number;
  minor_open: number;
  total_fixed: number;
  auto_fixable: number;
  require_manual: number;
  avg_health_score: number;
  avg_big_four_score: number;
  domains_optimal: number;
  domains_stable: number;
  domains_degraded: number;
  total_corrective_blocks: number;
  corrective_blocks_in_progress: number;
  corrective_blocks_pending: number;
  estimated_global_effort: string;
  last_full_scan: string;
  next_full_scan: string;
}

function mapRowToAgent(row: SupabaseAgentRow): AgentPerformance {
  return {
    agentId: row.agent_id,
    agentName: row.agent_name,
    domainId: row.domain_id,
    domainName: row.domain_name,
    icon: row.icon,
    color: row.color,
    healthScore: Number(row.health_score),
    bigFourScore: Number(row.big_four_score),
    status: row.status as AgentPerformance['status'],
    totalIssues: row.total_issues,
    criticalIssues: row.critical_issues,
    majorIssues: row.major_issues,
    minorIssues: row.minor_issues,
    fixedIssues: row.fixed_issues,
    autoFixable: row.auto_fixable,
    lastScan: row.last_scan,
    description: row.description,
    hubUrl: row.hub_url,
    correctiveActions: row.corrective_actions || [],
  };
}

function mapRowToBlock(row: SupabaseBlockRow): BlockCorrectiveManifest {
  return {
    blockId: row.block_id,
    blockName: row.block_name,
    description: row.description,
    targetDomains: row.target_domains || [],
    totalAgentsAffected: Number(row.total_agents_affected),
    totalActions: Number(row.total_actions),
    criticalActions: Number(row.critical_actions),
    majorActions: Number(row.major_actions),
    autoFixableActions: Number(row.auto_fixable_actions),
    estimatedTotalEffort: row.estimated_total_effort,
    globalImpact: row.global_impact,
    status: row.status as BlockCorrectiveManifest['status'],
  };
}

function mapRowToDomain(row: SupabaseDomainRow): DomainSummary {
  return {
    domainId: row.domain_id,
    domainName: row.domain_name,
    icon: row.icon,
    color: row.color,
    agentCount: Number(row.agent_count),
    avgHealthScore: Number(row.avg_health_score),
    avgBigFourScore: Number(row.avg_big_four_score),
    totalIssues: Number(row.total_issues),
    criticalIssues: Number(row.critical_issues),
    majorIssues: Number(row.major_issues),
    fixedIssues: Number(row.fixed_issues),
    autoFixable: Number(row.auto_fixable),
    agentsOptimal: Number(row.agents_optimal),
    agentsStable: Number(row.agents_stable),
    agentsDegraded: Number(row.agents_degraded),
    agentsCritical: Number(row.agents_critical),
  };
}

function mapRowToGlobalStats(row: SupabaseGlobalStatsRow): GlobalScanStats {
  return {
    totalAgents: Number(row.total_agents),
    agentsScanned: Number(row.agents_scanned),
    agentsOptimal: Number(row.agents_optimal),
    agentsStable: Number(row.agents_stable),
    agentsDegraded: Number(row.agents_degraded),
    agentsCritical: Number(row.agents_critical),
    totalIssues: Number(row.total_issues),
    criticalOpen: Number(row.critical_open),
    majorOpen: Number(row.major_open),
    minorOpen: Number(row.minor_open),
    totalFixed: Number(row.total_fixed),
    autoFixable: Number(row.auto_fixable),
    requireManual: Number(row.require_manual),
    avgHealthScore: Number(row.avg_health_score),
    avgBigFourScore: Number(row.avg_big_four_score),
    domainsOptimal: Number(row.domains_optimal),
    domainsStable: Number(row.domains_stable),
    domainsDegraded: Number(row.domains_degraded),
    totalCorrectiveBlocks: Number(row.total_corrective_blocks),
    correctiveBlocksInProgress: Number(row.corrective_blocks_in_progress),
    correctiveBlocksPending: Number(row.corrective_blocks_pending),
    estimatedGlobalEffort: row.estimated_global_effort,
    lastFullScan: row.last_full_scan,
    nextFullScan: row.next_full_scan,
  };
}

interface UseGlobalAgentPerformanceResult {
  agents: AgentPerformance[];
  blocks: BlockCorrectiveManifest[];
  domainSummaries: DomainSummary[];
  globalStats: GlobalScanStats | null;
  loading: boolean;
  error: string | null;
  dataSource: 'supabase' | 'mock';
  retry: () => void;
  executeBlock: (blockId: string) => Promise<void>;
  executeAllBlocks: () => Promise<void>;
}

export function useGlobalAgentPerformance(): UseGlobalAgentPerformanceResult {
  const [agents, setAgents] = useState<AgentPerformance[]>([]);
  const [blocks, setBlocks] = useState<BlockCorrectiveManifest[]>([]);
  const [domainSummaries, setDomainSummaries] = useState<DomainSummary[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalScanStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock'>('mock');

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [agentsResult, blocksResult, domainsResult, statsResult] = await Promise.all([
        supabase
          .from('kos_agent_performance')
          .select('*')
          .order('domain_id', { ascending: true })
          .order('health_score', { ascending: false }),
        supabase
          .from('kos_corrective_blocks')
          .select('*')
          .order('critical_actions', { ascending: false }),
        supabase
          .from('kos_domain_summaries')
          .select('*')
          .order('domain_id', { ascending: true }),
        supabase
          .from('kos_global_scan_stats')
          .select('*')
          .limit(1)
          .single(),
      ]);

      if (agentsResult.error) throw agentsResult.error;

      const hasAgents = agentsResult.data && agentsResult.data.length > 0;

      if (hasAgents) {
        setAgents((agentsResult.data as SupabaseAgentRow[]).map(mapRowToAgent));
        setDataSource('supabase');
      } else {
        setDataSource('mock');
        setError('no_data');
      }

      if (blocksResult.data && blocksResult.data.length > 0) {
        setBlocks((blocksResult.data as SupabaseBlockRow[]).map(mapRowToBlock));
      }

      if (domainsResult.data && domainsResult.data.length > 0) {
        setDomainSummaries((domainsResult.data as SupabaseDomainRow[]).map(mapRowToDomain));
      }

      if (statsResult.data) {
        setGlobalStats(mapRowToGlobalStats(statsResult.data as SupabaseGlobalStatsRow));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const retry = () => {
    fetchAll();
  };

  const executeBlock = async (blockId: string) => {
    const now = new Date().toISOString();

    // 1. Mark block as in_progress
    await supabase
      .from('kos_corrective_blocks')
      .update({ status: 'in_progress', updated_at: now })
      .eq('block_id', blockId);

    // Update local state immediately for UI feedback
    setBlocks((prev) =>
      prev.map((b) => (b.blockId === blockId ? { ...b, status: 'in_progress' as const } : b)),
    );

    // 2. Get the block's target domains
    const block = blocks.find((b) => b.blockId === blockId);
    if (!block || !block.targetDomains || block.targetDomains.length === 0) {
      await supabase
        .from('kos_corrective_blocks')
        .update({ status: 'completed', updated_at: now })
        .eq('block_id', blockId);
      setBlocks((prev) =>
        prev.map((b) => (b.blockId === blockId ? { ...b, status: 'completed' as const } : b)),
      );
      return;
    }

    // 3. Fetch agents in target domains
    const { data: targetAgentsData } = await supabase
      .from('kos_agent_performance')
      .select('*')
      .in('domain_id', block.targetDomains);

    const targetAgents = (targetAgentsData || []) as SupabaseAgentRow[];
    let agentsUpdated = 0;
    const executionLogs: Record<string, unknown>[] = [];

    // 4. Update each agent's corrective actions
    const updatePromises = targetAgents.map(async (agent) => {
      const actions: CorrectiveAction[] = agent.corrective_actions || [];
      if (actions.length === 0) return;

      let agentChanged = false;
      let actionsFixed = 0;

      const updatedActions: CorrectiveAction[] = actions.map((action) => {
        if (action.autoFixAvailable && action.status !== 'fixed') {
          agentChanged = true;
          actionsFixed++;
          return { ...action, status: 'fixed' as const };
        }
        return action;
      });

      if (!agentChanged) return;

      const totalActions = updatedActions.length;
      const fixedCount = updatedActions.filter((a) => a.status === 'fixed').length;
      const criticalCount = updatedActions.filter(
        (a) => a.severity === 'critical' && a.status !== 'fixed',
      ).length;
      const majorCount = updatedActions.filter(
        (a) => a.severity === 'major' && a.status !== 'fixed',
      ).length;
      const minorCount = updatedActions.filter(
        (a) => a.severity === 'minor' && a.status !== 'fixed',
      ).length;
      const autoFixableCount = updatedActions.filter(
        (a) => a.autoFixAvailable && a.status !== 'fixed',
      ).length;

      const healthScore = totalActions > 0 ? Math.round((fixedCount / totalActions) * 100) : 100;
      const bigFourScore =
        totalActions > 0
          ? Math.round(
              (fixedCount / totalActions) * 100 * 0.7 +
                (1 - criticalCount / Math.max(totalActions, 1)) * 100 * 0.3,
            )
          : 100;

      const newStatus =
        healthScore >= 90
          ? 'optimal'
          : healthScore >= 75
            ? 'stable'
            : healthScore >= 60
              ? 'degraded'
              : 'critical';

      await supabase
        .from('kos_agent_performance')
        .update({
          corrective_actions: updatedActions,
          health_score: healthScore,
          big_four_score: bigFourScore,
          status: newStatus,
          total_issues: totalActions,
          critical_issues: criticalCount,
          major_issues: majorCount,
          minor_issues: minorCount,
          fixed_issues: fixedCount,
          auto_fixable: autoFixableCount,
          last_scan: now,
          updated_at: now,
        })
        .eq('agent_id', agent.agent_id);

      agentsUpdated++;
      executionLogs.push({
        block_id: blockId,
        block_name: block.blockName,
        agent_id: agent.agent_id,
        agent_name: agent.agent_name,
        action: 'Correction auto-fixable',
        detections_fixed: actionsFixed,
        timestamp: now,
        status: 'completed',
        details: `${actionsFixed} actions auto-fixables corrigées — Score: ${healthScore}% → ${newStatus}`,
      });
    });

    await Promise.all(updatePromises);

    // 5. Mark block as completed
    await supabase
      .from('kos_corrective_blocks')
      .update({ status: 'completed', updated_at: now })
      .eq('block_id', blockId);

    // 6. Insert execution logs
    if (executionLogs.length > 0) {
      await supabase.from('kos_execution_logs').insert(executionLogs);
    }

    // 7. Refresh all data
    await fetchAll();
  };

  const executeAllBlocks = async () => {
    const pendingBlocks = blocks.filter((b) => b.status === 'pending');
    if (pendingBlocks.length === 0) return;

    // Execute blocks sequentially to avoid overwhelming the DB
    for (const block of pendingBlocks) {
      await executeBlock(block.blockId);
    }
  };

  return {
    agents,
    blocks,
    domainSummaries,
    globalStats,
    loading,
    error,
    dataSource,
    retry,
    executeBlock,
    executeAllBlocks,
  };
}



