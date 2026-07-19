import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { ALL_ENGINE_TICKETS, type MockAutoCorrectionTicket } from '@/mocks/autoCorrectionTickets';

export interface AutoCorrectionTicket {
  id: number;
  ticket_id: string;
  target_url: string;
  source_url: string | null;
  source_engine: string;
  status_code: number | null;
  error_message: string | null;
  check_type: string;
  check_run_id: string | null;
  status: 'open' | 'in_progress' | 'resolved' | 'auto_fixed' | 'closed' | 'false_positive';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assigned_to: string | null;
  resolution_type: 'manual_fix' | 'auto_redirect' | 'auto_remove_link' | 'auto_fix_success' | 'false_positive' | null;
  resolution_notes: string | null;
  auto_fix_attempted: boolean;
  auto_fix_success: boolean;
  auto_fix_strategy: string | null;
  occurrence_count: number;
  first_seen_at: string;
  last_seen_at: string;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
}

export interface CrossResolutionAlert {
  id: number;
  resolving_engine: string;
  resolved_ticket_id: string;
  resolved_target_url: string | null;
  notified_engine: string;
  notified_ticket_ids: string[];
  alert_message: string | null;
  acknowledged: boolean;
  created_at: string;
}

export interface CrossResolutionResult {
  notified_count: number;
  notified_engines: string[];
  resolving_engine: string;
  target_url: string;
}

export interface TicketStats {
  total: number;
  open: number;
  in_progress: number;
  resolved: number;
  auto_fixed: number;
  closed: number;
  critical: number;
  high: number;
}

function mockToTicket(mock: MockAutoCorrectionTicket, index: number): AutoCorrectionTicket {
  const now = new Date().toISOString();
  return {
    id: index + 1,
    ticket_id: mock.ticket_id,
    target_url: mock.target_url,
    source_url: null,
    source_engine: mock.source_engine,
    status_code: mock.status_code,
    error_message: mock.error_message,
    check_type: mock.check_type,
    check_run_id: null,
    status: mock.status,
    priority: mock.priority,
    assigned_to: mock.assigned_to,
    resolution_type: mock.resolution_type,
    resolution_notes: mock.resolution_notes,
    auto_fix_attempted: false,
    auto_fix_success: false,
    auto_fix_strategy: null,
    occurrence_count: mock.occurrence_count,
    first_seen_at: now,
    last_seen_at: now,
    created_at: now,
    updated_at: now,
    resolved_at: mock.status === 'resolved' ? now : null,
  };
}

// Mock cross-resolution alerts for demo
const MOCK_CROSS_ALERTS: CrossResolutionAlert[] = [
  {
    id: 1,
    resolving_engine: 'cyber_tech',
    resolved_ticket_id: 'TKT-CYBER-20260613-0005',
    resolved_target_url: 'MFA Non Obligatoire — Comptes Admin Non Protégés',
    notified_engine: 'corrective_execution',
    notified_ticket_ids: ['TKT-EXEC-20260613-0006'],
    alert_message: 'Le ticket TKT-CYBER-20260613-0005 (cyber_tech) concernant "MFA Non Obligatoire" a été résolu. Vérifiez si cela impacte votre ticket TKT-EXEC-20260613-0006.',
    acknowledged: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    resolving_engine: 'content_correction',
    resolved_ticket_id: 'TKT-CONT-20260613-0004',
    resolved_target_url: 'Aucun Framework Propriétaire KHEPRA™ Nommé',
    notified_engine: 'digital_growth',
    notified_ticket_ids: ['TKT-GROW-20260613-0005'],
    alert_message: 'Le ticket TKT-CONT-20260613-0004 (content_correction) concernant "Aucun Framework Propriétaire" a été résolu. Impact possible sur votre charte éditoriale TKT-GROW-20260613-0005.',
    acknowledged: false,
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 3,
    resolving_engine: 'digital_growth',
    resolved_ticket_id: 'TKT-GROW-20260613-0004',
    resolved_target_url: 'Formulaires Non Optimisés — 5+ Champs',
    notified_engine: 'content_correction',
    notified_ticket_ids: ['TKT-CONT-20260613-0005'],
    alert_message: 'Le ticket TKT-GROW-20260613-0004 (digital_growth) concernant "Formulaires Non Optimisés" a été résolu. Vos CTA content_correction peuvent bénéficier de ce fix.',
    acknowledged: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 4,
    resolving_engine: 'corrective_execution',
    resolved_ticket_id: 'TKT-EXEC-20260613-0005',
    resolved_target_url: 'Quality Controller Manuel — 0% Automatisé',
    notified_engine: 'content_correction',
    notified_ticket_ids: ['TKT-CONT-20260613-0003'],
    alert_message: 'Le ticket TKT-EXEC-20260613-0005 (corrective_execution) sur le Quality Controller a été résolu. Bénéfice direct pour vos scores de contenu.',
    acknowledged: false,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function useAutoCorrectionTickets(sourceEngine?: string) {
  const [tickets, setTickets] = useState<AutoCorrectionTicket[]>([]);
  const [stats, setStats] = useState<TicketStats>({ total: 0, open: 0, in_progress: 0, resolved: 0, auto_fixed: 0, closed: 0, critical: 0, high: 0 });
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crossResolutionAlerts, setCrossResolutionAlerts] = useState<CrossResolutionAlert[]>([]);
  const [crossResolving, setCrossResolving] = useState(false);

  const computeStats = useCallback((ticketList: AutoCorrectionTicket[]): TicketStats => ({
    total: ticketList.length,
    open: ticketList.filter((t) => t.status === 'open').length,
    in_progress: ticketList.filter((t) => t.status === 'in_progress').length,
    resolved: ticketList.filter((t) => t.status === 'resolved').length,
    auto_fixed: ticketList.filter((t) => t.status === 'auto_fixed').length,
    closed: ticketList.filter((t) => t.status === 'closed').length,
    critical: ticketList.filter((t) => t.priority === 'critical').length,
    high: ticketList.filter((t) => t.priority === 'high').length,
  }), []);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('kos_auto_correction_tickets')
        .select('*');

      if (sourceEngine) {
        query = query.eq('source_engine', sourceEngine);
      }

      const { data, error: fetchErr } = await query
        .order('created_at', { ascending: false })
        .limit(200);

      if (fetchErr) throw fetchErr;

      let ticketList = (data || []) as AutoCorrectionTicket[];

      if (ticketList.length === 0) {
        const filteredMocks = sourceEngine
          ? ALL_ENGINE_TICKETS.filter((t) => t.source_engine === sourceEngine)
          : ALL_ENGINE_TICKETS;
        ticketList = filteredMocks.map((m, i) => mockToTicket(m, i));
      }

      setTickets(ticketList);
      setStats(computeStats(ticketList));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur chargement tickets');
    } finally {
      setLoading(false);
    }
  }, [computeStats, sourceEngine]);

  const loadCrossResolutionAlerts = useCallback(async () => {
    try {
      let query = supabase
        .from('kos_cross_resolution_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (sourceEngine) {
        query = query.eq('notified_engine', sourceEngine);
      }

      const { data, error: fetchErr } = await query;

      if (fetchErr) throw fetchErr;

      let alerts = (data || []) as CrossResolutionAlert[];

      if (alerts.length === 0) {
        alerts = sourceEngine
          ? MOCK_CROSS_ALERTS.filter((a) => a.notified_engine === sourceEngine)
          : MOCK_CROSS_ALERTS;
      }

      setCrossResolutionAlerts(alerts);
    } catch {
      const fallback = sourceEngine
        ? MOCK_CROSS_ALERTS.filter((a) => a.notified_engine === sourceEngine)
        : MOCK_CROSS_ALERTS;
      setCrossResolutionAlerts(fallback);
    }
  }, [sourceEngine]);

  const acknowledgeCrossAlert = useCallback(async (alertId: number) => {
    setCrossResolutionAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    try {
      await supabase
        .from('kos_cross_resolution_logs')
        .update({ acknowledged: true })
        .eq('id', alertId);
    } catch {
      // silently fail
    }
  }, []);

  const crossResolveAndNotify = useCallback(async (
    ticketId: number
  ): Promise<CrossResolutionResult> => {
    setCrossResolving(true);
    try {
      const { data, error: rpcErr } = await supabase.rpc(
        'kos_cross_resolve_notify',
        { p_resolved_ticket_id: ticketId }
      );

      if (rpcErr) throw rpcErr;

      const result = data as CrossResolutionResult;

      if (result && result.notified_count > 0) {
        await loadCrossResolutionAlerts();
      }

      return result || { notified_count: 0, notified_engines: [], resolving_engine: '', target_url: '' };
    } catch {
      return { notified_count: 0, notified_engines: [], resolving_engine: '', target_url: '' };
    } finally {
      setCrossResolving(false);
    }
  }, [loadCrossResolutionAlerts]);

  const syncTicketsFromCrawl = useCallback(async (): Promise<{ created: number }> => {
    setSyncing(true);
    let created = 0;
    try {
      const { data: latestRun } = await supabase
        .from('url_check_results')
        .select('check_run_id')
        .order('checked_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!latestRun?.check_run_id) {
        setSyncing(false);
        return { created: 0 };
      }

      const { data: brokenResults } = await supabase
        .from('url_check_results')
        .select('*')
        .eq('check_run_id', latestRun.check_run_id)
        .eq('is_broken', true);

      if (!brokenResults || brokenResults.length === 0) {
        setSyncing(false);
        return { created: 0 };
      }

      const { data: existingTickets } = await supabase
        .from('kos_auto_correction_tickets')
        .select('target_url')
        .in('status', ['open', 'in_progress']);

      const existingUrls = new Set((existingTickets || []).map((t) => t.target_url));

      const { data: lastTicket } = await supabase
        .from('kos_auto_correction_tickets')
        .select('ticket_id')
        .order('id', { ascending: false })
        .limit(1)
        .maybeSingle();

      let nextSeq = 1;
      if (lastTicket?.ticket_id) {
        const match = lastTicket.ticket_id.match(/TKT-(\d{8})-(\d+)/);
        if (match) nextSeq = parseInt(match[2], 10) + 1;
      }

      const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const newTickets: Record<string, unknown>[] = [];
      const seenUrls = new Set<string>();

      for (const r of brokenResults) {
        if (seenUrls.has(r.target_url) || existingUrls.has(r.target_url)) continue;
        seenUrls.add(r.target_url);

        let priority = 'medium';
        if (r.status_code === 404 || r.status_code === 410) priority = 'critical';
        else if (r.status_code && r.status_code >= 500) priority = 'high';
        else if (!r.status_code) priority = 'high';

        const ticketId = `TKT-${today}-${String(nextSeq).padStart(4, '0')}`;
        nextSeq++;

        newTickets.push({
          ticket_id: ticketId,
          target_url: r.target_url,
          source_url: r.source_url,
          source_engine: 'url_auto_pointage',
          status_code: r.status_code,
          error_message: r.error_message,
          check_type: r.check_type,
          check_run_id: r.check_run_id,
          status: 'open',
          priority,
          occurrence_count: 1,
          auto_fix_attempted: false,
          auto_fix_success: false,
          first_seen_at: r.checked_at,
          last_seen_at: r.checked_at,
        });
      }

      if (newTickets.length > 0) {
        const { error: insertErr } = await supabase.from('kos_auto_correction_tickets').insert(newTickets);
        if (insertErr) throw insertErr;
        created = newTickets.length;
      }

      await loadTickets();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur sync tickets');
    } finally {
      setSyncing(false);
    }
    return { created };
  }, [loadTickets]);

  const updateTicketStatus = useCallback(async (
    ticketId: number,
    newStatus: AutoCorrectionTicket['status'],
    resolutionType?: AutoCorrectionTicket['resolution_type'],
    notes?: string
  ): Promise<CrossResolutionResult | null> => {
    const updateData: Record<string, unknown> = {
      status: newStatus,
      updated_at: new Date().toISOString(),
    };
    if (resolutionType) updateData.resolution_type = resolutionType;
    if (notes) updateData.resolution_notes = notes;
    if (newStatus === 'resolved' || newStatus === 'auto_fixed' || newStatus === 'closed') {
      updateData.resolved_at = new Date().toISOString();
    }

    // Optimistic UI update
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: newStatus, resolution_type: resolutionType || t.resolution_type, resolution_notes: notes || t.resolution_notes, updated_at: new Date().toISOString(), resolved_at: (newStatus === 'resolved' || newStatus === 'auto_fixed' || newStatus === 'closed') ? new Date().toISOString() : t.resolved_at }
          : t
      )
    );

    try {
      const { error: updateErr } = await supabase
        .from('kos_auto_correction_tickets')
        .update(updateData)
        .eq('id', ticketId);

      if (updateErr) throw updateErr;

      // Cross-resolution: notify other engines
      let crossResult: CrossResolutionResult | null = null;
      if (newStatus === 'resolved' || newStatus === 'auto_fixed') {
        crossResult = await crossResolveAndNotify(ticketId);
      }

      await loadTickets();
      return crossResult;
    } catch {
      await loadTickets();
      return null;
    }
  }, [loadTickets, crossResolveAndNotify]);

  useEffect(() => {
    loadTickets();
    loadCrossResolutionAlerts();
  }, [loadTickets, loadCrossResolutionAlerts]);

  return {
    tickets,
    stats,
    loading,
    syncing,
    error,
    crossResolutionAlerts,
    crossResolving,
    refresh: loadTickets,
    syncTicketsFromCrawl,
    updateTicketStatus,
    crossResolveAndNotify,
    acknowledgeCrossAlert,
  };
}



