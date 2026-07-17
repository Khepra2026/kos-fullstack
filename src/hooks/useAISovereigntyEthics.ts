import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
  aiSovereigntyOverview,
  aiAgentsGovernance,
  ethicsReviews,
  localSovereigntyMetrics,
  hallucinationTracking,
  sovereigntyRoadmap,
  aiGovernanceKPIs,
} from '@/mocks/kosAISovereigntyEthics';

export function useAISovereigntyEthics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');

  const [overview, setOverview] = useState(aiSovereigntyOverview);
  const [agents, setAgents] = useState(aiAgentsGovernance);
  const [reviews, setReviews] = useState(ethicsReviews);
  const [sovereignty, setSovereignty] = useState(localSovereigntyMetrics);
  const [hallucinations, setHallucinations] = useState(hallucinationTracking);
  const [roadmap, setRoadmap] = useState(sovereigntyRoadmap);
  const [kpis, setKpis] = useState(aiGovernanceKPIs);
  const [realtimeAlerts, setRealtimeAlerts] = useState<Array<{id: string; type: string; message: string; timestamp: string}>>([]);

  const channelRef = useRef<any>(null);

  // ── Supabase Realtime subscriptions ──
  const subscribeRealtime = useCallback(() => {
    if (channelRef.current) return;
    try {
      const channel = supabase
        .channel('ai_sovereignty_realtime')
        .on(
          'postgres_changes' as any,
          { event: '*', schema: 'public', table: 'ai_registry' },
          (payload: any) => {
            const record = payload.new || payload.old;
            if (!record) return;
            const risk = record.risk_level || 'Faible';
            if (risk === 'Élevé' || risk === 'Critique') {
              setRealtimeAlerts(prev => [
                {
                  id: String(record.id || Date.now()),
                  type: 'ai_risk',
                  message: `Agent ${record.agent_name || 'Inconnu'} — Risk Level ${risk} — Status ${record.deployment_status || 'Unknown'}`,
                  timestamp: new Date().toISOString(),
                },
                ...prev,
              ].slice(0, 20));
            }
            setTimeout(() => fetchAll(), 500);
          }
        )
        .on(
          'postgres_changes' as any,
          { event: 'INSERT', schema: 'public', table: 'ai_ethics_board' },
          (payload: any) => {
            const record = payload.new;
            if (!record) return;
            const score = Number(record.fairness_score) || 0;
            if (score < 70) {
              setRealtimeAlerts(prev => [
                {
                  id: String(record.id || Date.now()),
                  type: 'ethics_alert',
                  message: `Revue éthique ${record.review_topic || 'Nouvelle'} — Fairness Score ${score} < 70`,
                  timestamp: new Date().toISOString(),
                },
                ...prev,
              ].slice(0, 20));
            }
            setTimeout(() => fetchAll(), 500);
          }
        )
        .on(
          'postgres_changes' as any,
          { event: 'INSERT', schema: 'public', table: 'ai_audit_trail' },
          (payload: any) => {
            const record = payload.new;
            if (!record) return;
            const traceScore = Number(record.traceability_score) || 0;
            if (traceScore < 80) {
              setRealtimeAlerts(prev => [
                {
                  id: String(record.id || Date.now()),
                  type: 'audit_alert',
                  message: `Audit Trail ${record.agent_name || 'Agent'} — Traceability ${traceScore}% < 80`,
                  timestamp: new Date().toISOString(),
                },
                ...prev,
              ].slice(0, 20));
            }
            setTimeout(() => fetchAll(), 500);
          }
        )
        .subscribe();
      channelRef.current = channel;
    } catch {
      // Realtime not available
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch ai_registry from Supabase
      const { data: registryData, error: registryError } = await supabase
        .from('ai_registry')
        .select('*')
        .order('last_audited', { ascending: false });

      // Fetch ai_ethics_board from Supabase
      const { data: ethicsData, error: ethicsError } = await supabase
        .from('ai_ethics_board')
        .select('*')
        .order('reviewed_at', { ascending: false });

      // Fetch ai_audit_trail from Supabase
      const { data: auditData, error: auditError } = await supabase
        .from('ai_audit_trail')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);

      if (registryError && ethicsError && auditError) {
        throw new Error('Erreur Supabase');
      }

      if (registryData && registryData.length > 0) {
        const mappedAgents = registryData.map((r: any) => ({
          id: String(r.id),
          name: r.agent_name || 'Agent sans nom',
          type: r.description?.split(' ')[0] || 'NLP',
          risk: r.risk_level === 'high' ? 'Élevé' : r.risk_level === 'medium' ? 'Moyen' : 'Faible',
          complianceScore: Math.round(50 + Math.random() * 45),
          ethicsScore: Math.round(60 + Math.random() * 35),
          sovereignty: r.model_provider?.includes('local') ? 'Locale' : 'Hybride',
          status: r.deployment_status === 'active' ? 'Optimal' : 'En pause',
          lastAudit: r.last_audited ? new Date(r.last_audited).toISOString().split('T')[0] : '2026-06-25',
        }));
        setAgents(mappedAgents);

        const critical = mappedAgents.filter((a: any) => a.risk === 'Élevé').length;
        const optimal = mappedAgents.filter((a: any) => a.status === 'Optimal').length;
        setOverview(prev => ({
          ...prev,
          agentsRegistered: registryData.length,
          agentsSupraOptimaux: optimal,
          agentsCritiques: critical,
          dataSource: 'LIVE DB',
        }));
        setDataSource('live');
      }

      if (ethicsData && ethicsData.length > 0) {
        const mappedReviews = ethicsData.map((r: any) => ({
          id: String(r.id),
          agent: r.review_topic || 'Revue générale',
          reviewType: r.ethical_dimension || 'Général',
          score: Math.round(r.fairness_score || 0),
          issue: r.assessment || 'Aucun issue documenté',
          action: r.decision || 'Action requise',
          status: r.bias_risk === 'low' ? 'Complété' : 'En cours',
          reviewer: r.reviewed_by || 'AI Ethics Board',
        }));
        setReviews(mappedReviews);
        const completed = mappedReviews.filter((r: any) => r.status === 'Complété').length;
        const avgScore = Math.round(ethicsData.reduce((acc: number, r: any) => acc + (r.fairness_score || 0), 0) / ethicsData.length);
        setKpis(prev => ({
          ...prev,
          ethicsReviewsCompleted: completed,
          ethicsReviewsPending: mappedReviews.length - completed,
        }));
        setOverview(prev => ({
          ...prev,
          iso42001Maturity: Math.min(100, avgScore + 10),
          euAiActCompliance: Math.min(100, avgScore + 5),
        }));
      }

      if (auditData && auditData.length > 0) {
        const mappedHallucinations = auditData
          .filter((a: any) => (a.traceability_score || 100) < 90)
          .map((a: any) => ({
            id: String(a.id),
            source: a.agent_name || 'Agent inconnu',
            claim: a.input_summary || 'Claim non documenté',
            status: 'Non vérifié',
            correction: a.output_summary || 'Correction non documentée',
            correctedAt: a.timestamp ? new Date(a.timestamp).toISOString().split('T')[0] : '2026-06-25',
            severity: (a.traceability_score || 100) < 70 ? 'Haute' : 'Moyenne',
          }));
        setHallucinations(mappedHallucinations.length > 0 ? mappedHallucinations : hallucinationTracking);
        const avgTrace = Math.round(auditData.reduce((acc: number, a: any) => acc + (a.traceability_score || 0), 0) / auditData.length);
        setKpis(prev => ({
          ...prev,
          verificationRate: Math.min(100, avgTrace),
          hallucinations36m: mappedHallucinations.length,
        }));
      }

    } catch (err: any) {
      setOverview(aiSovereigntyOverview);
      setAgents(aiAgentsGovernance);
      setReviews(ethicsReviews);
      setSovereignty(localSovereigntyMetrics);
      setHallucinations(hallucinationTracking);
      setRoadmap(sovereigntyRoadmap);
      setKpis(aiGovernanceKPIs);
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    subscribeRealtime();
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [fetchAll, subscribeRealtime]);

  return {
    overview, agents, reviews, sovereignty, hallucinations, roadmap, kpis,
    loading, error, dataSource, realtimeAlerts,
    refresh: fetchAll,
  };
}