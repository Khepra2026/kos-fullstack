import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  UPGRADE_GAPS,
  UPGRADE_TICKETS,
  UPGRADE_ENGINES,
  UPGRADE_WAVES,
  UPGRADE_STATS,
} from '@/mocks/kosFullUpgradeCompliance';
import type {
  UpgradeGap,
  CorrectionTicket,
  UpgradeEngine,
  UpgradeWave,
  UpgradeStats,
} from '@/mocks/kosFullUpgradeCompliance';

export function useKOSFullUpgradeCompliance() {
  const [gaps, setGaps] = useState<UpgradeGap[]>(UPGRADE_GAPS);
  const [tickets, setTickets] = useState<CorrectionTicket[]>(UPGRADE_TICKETS);
  const [engines, setEngines] = useState<UpgradeEngine[]>(UPGRADE_ENGINES);
  const [waves] = useState<UpgradeWave[]>(UPGRADE_WAVES);
  const [stats, setStats] = useState<UpgradeStats>(UPGRADE_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [activeWave, setActiveWave] = useState<number>(1);
  const [appliedTickets, setAppliedTickets] = useState<Set<string>>(new Set());
  const [appliedGaps, setAppliedGaps] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    async function fetchLive() {
      try {
        const { data: liveGaps, error: gapErr } = await supabase
          .from('kos_gap_register')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(30);
        if (gapErr) throw gapErr;

        const { data: liveTickets, error: tktErr } = await supabase
          .from('kos_correction_tickets')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(30);
        if (tktErr) throw tktErr;

        const { data: liveEngines, error: engErr } = await supabase
          .from('kos_resource_engines')
          .select('*');
        if (engErr) throw engErr;

        if (!cancelled) {
          if (liveGaps && liveGaps.length > 0) {
            const mapped: UpgradeGap[] = liveGaps.map((g: Record<string, unknown>) => ({
              id: String(g.gap_id || g.id || ''),
              componentType: String(g.component_type || ''),
              componentName: String(g.component_name || ''),
              description: String(g.description || ''),
              currentState: String(g.current_state || ''),
              targetState: String(g.target_state || ''),
              rootCause: String(g.root_cause || ''),
              impactedSystems: String(g.impacted_systems || ''),
              strategy: String(g.strategy || ''),
              status: (g.status === 'resolved' ? 'resolved' : g.status === 'in_progress' ? 'in_progress' : 'open') as UpgradeGap['status'],
              resolutionSteps: String(g.resolution_steps || ''),
              kpiImpact: String(g.kpi_impact || ''),
              category: String(g.category || ''),
              criticality: (g.criticality === 'low' ? 'low' : g.criticality === 'medium' ? 'medium' : g.criticality === 'high' ? 'high' : 'critical') as UpgradeGap['criticality'],
              vague: 1,
              eta: 'N/A',
              progress: 0,
            }));
            setGaps(mapped);
          }
          if (liveTickets && liveTickets.length > 0) {
            const mapped2: CorrectionTicket[] = liveTickets.map((t: Record<string, unknown>) => ({
              id: String(t.ticket_id || t.id || ''),
              moduleId: String(t.module_id || ''),
              title: String(t.title || ''),
              rootCause: String(t.root_cause || ''),
              impact: String(t.impact || ''),
              seoImpact: String(t.seo_impact || ''),
              businessImpact: String(t.business_impact || ''),
              status: (t.status === 'done' ? 'done' : t.status === 'in_progress' ? 'in_progress' : 'open') as CorrectionTicket['status'],
              eta: String(t.eta || ''),
              correction: String(t.correction || ''),
              validationMethod: String(t.validation_method || ''),
              estimatedGain: String(t.estimated_gain || ''),
              ticketId: String(t.ticket_id || ''),
              priority: (t.priority === 'medium' ? 'medium' : t.priority === 'high' ? 'high' : 'critical') as CorrectionTicket['priority'],
              vague: 1,
              progress: 0,
            }));
            setTickets(mapped2);
          }
          if (liveEngines && liveEngines.length > 0) {
            const mapped3: UpgradeEngine[] = liveEngines.map((e: Record<string, unknown>) => ({
              id: String(e.id || ''),
              name: String(e.name || ''),
              path: String(e.path || ''),
              icon: String(e.icon || 'ri-cpu-line'),
              color: String(e.color || '#4F46E5'),
              agentsCount: Number(e.agents_count || 0),
              activeAgents: Number(e.active_agents || 0),
              partialAgents: Number(e.partial_agents || 0),
              gapAgents: Number(e.gap_agents || 0),
              cpuUsage: Number(e.cpu_usage || 0),
              memoryUsage: Number(e.memory_usage || 0),
              status: (e.status === 'critical' ? 'critical' : e.status === 'degraded' ? 'degraded' : 'healthy') as UpgradeEngine['status'],
              upgradeTarget: '',
            }));
            setEngines(mapped3);
          }
          setIsLive(true);
        }
      } catch {
        if (!cancelled) {
          setGaps(UPGRADE_GAPS);
          setTickets(UPGRADE_TICKETS);
          setEngines(UPGRADE_ENGINES);
          setIsLive(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchLive();
    return () => { cancelled = true; };
  }, []);

  const filteredGaps = useMemo(() => {
    return gaps.filter((g) => g.vague === activeWave);
  }, [gaps, activeWave]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => t.vague === activeWave && !appliedTickets.has(t.id));
  }, [tickets, activeWave, appliedTickets]);

  const allVagueGaps = useMemo(() => gaps.filter((g) => g.vague === activeWave), [gaps, activeWave]);

  const applyTicket = useCallback((ticketId: string) => {
    setAppliedTickets((prev) => {
      const next = new Set(prev);
      next.add(ticketId);
      return next;
    });
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'done' as const, progress: 100 } : t))
    );
  }, []);

  const applyGap = useCallback((gapId: string) => {
    setAppliedGaps((prev) => {
      const next = new Set(prev);
      next.add(gapId);
      return next;
    });
    setGaps((prev) =>
      prev.map((g) => (g.id === gapId ? { ...g, status: 'resolved' as const, progress: 100 } : g))
    );
  }, []);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setGaps(UPGRADE_GAPS);
    setTickets(UPGRADE_TICKETS);
    setEngines(UPGRADE_ENGINES);
    setIsLive(false);
    setAppliedTickets(new Set());
    setAppliedGaps(new Set());
    setTimeout(() => setLoading(false), 300);
  }, []);

  return {
    gaps, tickets, engines, waves, stats,
    loading, error, isLive,
    activeWave, setActiveWave,
    filteredGaps, filteredTickets, allVagueGaps,
    appliedTickets, appliedGaps,
    applyTicket, applyGap, refetch,
  };
}