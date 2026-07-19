import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
  riskResilienceOverview,
  riskRegisters as mockRisks,
  stressTestResults,
  businessContinuityPlans,
  kriDefinitions as mockKris,
  resilienceKPIs,
} from '@/mocks/enterpriseRiskResilience';

export function useEnterpriseRiskResilience() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');

  const [overview, setOverview] = useState(riskResilienceOverview);
  const [risks, setRisks] = useState(mockRisks);
  const [stressTests, setStressTests] = useState(stressTestResults);
  const [bcp, setBcp] = useState(businessContinuityPlans);
  const [kris, setKris] = useState(mockKris);
  const [kpis, setKpis] = useState(resilienceKPIs);
  const [caseStudiesList, setCaseStudiesList] = useState<any[]>([]);
  const [realtimeKriAlerts, setRealtimeKriAlerts] = useState<Array<{id: string; riskName: string; criticalityScore: number; status: string; timestamp: string}>>([]);
  const channelRef = useRef<any>(null);

  // ── Supabase Realtime subscription for KRI alerting ──
  const subscribeRealtime = useCallback(() => {
    if (channelRef.current) return;
    try {
      const channel = supabase
        .channel('risk_registers_kri_realtime')
        .on(
          'postgres_changes' as any,
          { event: '*', schema: 'public', table: 'risk_registers' },
          (payload: any) => {
            const record = payload.new || payload.old;
            if (!record) return;
            const score = Number(record.criticality_score) || 0;
            if (score >= 70) {
              setRealtimeKriAlerts(prev => [
                {
                  id: String(record.id),
                  riskName: record.risk_name || 'Risque inconnu',
                  criticalityScore: score,
                  status: record.status || 'Actif',
                  timestamp: new Date().toISOString(),
                },
                ...prev,
              ].slice(0, 20));
            }
          }
        )
        .subscribe();
      channelRef.current = channel;
    } catch {
      // Realtime not available — degrade gracefully
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch risk_registers from Supabase
      const { data: risksData, error: risksError } = await supabase
        .from('risk_registers')
        .select('*')
        .order('criticality_score', { ascending: false });

      // Fetch case_studies from Supabase
      const { data: casesData, error: casesError } = await supabase
        .from('case_studies')
        .select('id, title, client_name, sector, country, jurisdiction, challenge, solution, results, key_figures, testimonial_quote, testimonial_author, date_completed, is_featured, tags')
        .order('date_completed', { ascending: false })
        .limit(10);

      if (risksError && casesError) {
        throw new Error('Erreur Supabase');
      }

      if (risksData && risksData.length > 0) {
        // Map Supabase data to expected format
        const mappedRisks = risksData.map((r: any) => ({
          id: String(r.id),
          riskName: r.risk_name,
          riskCategory: r.risk_category,
          probability: r.probability,
          impact: r.impact,
          criticalityScore: r.criticality_score,
          mitigationPlan: r.mitigation_plan,
          owner: r.owner,
          status: r.status,
          residualRisk: r.residual_risk,
          reviewDate: r.review_date,
          tags: r.tags || [],
          kri_code: r.metadata?.kri_code || null,
          iso_standard: r.metadata?.iso_standard || null,
        }));
        setRisks(mappedRisks as any);
        setDataSource('live');

        // Build KRI monitoring from LIVE risks
        const liveKris = mappedRisks
          .filter((r: any) => r.kri_code)
          .map((r: any) => ({
            kri_code: r.kri_code,
            riskName: r.riskName,
            category: r.riskCategory,
            currentScore: r.criticalityScore,
            threshold_warning: 70,
            threshold_critical: 85,
            trend: r.criticalityScore >= 85 ? 'critical' : r.criticalityScore >= 70 ? 'warning' : 'normal',
            status: r.status,
          }));
        setKris(liveKris.length > 0 ? liveKris : mockKris);

        // Update overview KPIs dynamically from LIVE data
        const criticalCount = mappedRisks.filter((r: any) => r.criticalityScore >= 85).length;
        const highCount = mappedRisks.filter((r: any) => r.criticalityScore >= 70 && r.criticalityScore < 85).length;
        const mitigatedCount = mappedRisks.filter((r: any) => r.status === 'Mitigé').length;
        const avgScore = Math.round(
          mappedRisks.reduce((acc: number, r: any) => acc + r.criticalityScore, 0) / mappedRisks.length
        );
        setOverview({
          ...riskResilienceOverview,
          totalRisks: mappedRisks.length,
          criticalRisks: criticalCount,
          highRisks: highCount,
          mitigatedRisks: mitigatedCount,
          globalRiskScore: 100 - avgScore,
          dataSource: 'LIVE DB',
          lastScan: new Date().toISOString(),
        } as any);
      }

      if (casesData && casesData.length > 0) {
        setCaseStudiesList(casesData);
      }

    } catch (err: any) {
      // Fallback to mock
      setOverview(riskResilienceOverview);
      setRisks(mockRisks);
      setKris(mockKris);
      setCaseStudiesList([]);
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
    overview,
    risks,
    stressTests,
    bcp,
    kris,
    kpis,
    caseStudiesList,
    realtimeKriAlerts,
    loading,
    error,
    dataSource,
    refresh: fetchAll,
  };
}



