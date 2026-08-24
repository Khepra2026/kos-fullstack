import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  tenderOpportunities as mockTenderOpportunities,
  competitiveLandscape as mockCompetitiveLandscape,
  executiveCommunications as mockExecutiveCommunications,
  strategicPlans as mockStrategicPlans,
} from '@/mocks/marketIntelligence';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

export interface TenderOpportunity {
  id: string;
  tender_title: string;
  source_organization: string;
  tender_type: string;
  submission_deadline: string;
  estimated_budget_fcfa: number;
  relevance_score: number;
  qualification_status: string;
  recommendation: string;
  required_documents: string[];
  competitive_analysis: string;
  created_at: string;
}

export interface CompetitiveIntel {
  id: string;
  competitor_name: string;
  competitor_type: string;
  market_segment: string;
  strengths: string[];
  weaknesses: string[];
  service_comparison: Record<string, string>;
  differentiation_opportunities: string[];
  threat_level: string;
  last_updated: string;
  created_at: string;
}

export interface ExecutiveCommunication {
  id: string;
  communication_type: string;
  title: string;
  target_audience: string;
  key_messages: string[];
  tone_profile: string;
  delivery_channel: string[];
  approval_status: string;
  scheduled_date: string;
  created_at: string;
}

export interface StrategicPlan {
  id: string;
  plan_title: string;
  horizon: string;
  vision_statement: string;
  strategic_objectives: string[];
  key_initiatives: string[];
  kpis: Record<string, string>;
  progress_percentage: number;
  created_at: string;
}

export interface AuditTrail {
  tenders: HookAuditEntry | null;
  competitive: HookAuditEntry | null;
  communications: HookAuditEntry | null;
  strategy: HookAuditEntry | null;
}

export interface MarketIntelligenceData {
  tenderOpportunities: TenderOpportunity[];
  competitiveLandscape: CompetitiveIntel[];
  executiveCommunications: ExecutiveCommunication[];
  strategicPlans: StrategicPlan[];
  isLive: boolean;
}

export function useMarketIntelligence() {
  const [data, setData] = useState<MarketIntelligenceData>({
    tenderOpportunities: [],
    competitiveLandscape: [],
    executiveCommunications: [],
    strategicPlans: [],
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [auditTrail, setAuditTrail] = useState<AuditTrail>({
    tenders: null, competitive: null, communications: null, strategy: null,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const [tendersRes, competeRes, commsRes, strategyRes] = await Promise.all([
        supabase.from('tender_intelligence').select('*').order('created_at', { ascending: false }),
        supabase.from('competitive_intelligence').select('*').order('created_at', { ascending: false }),
        supabase.from('executive_communications').select('*').order('created_at', { ascending: false }),
        supabase.from('strategic_plans').select('*').order('created_at', { ascending: false }),
      ]);

      const durationMs = Math.round(performance.now() - startTime);

      if (tendersRes.error) throw tendersRes.error;
      if (competeRes.error) throw competeRes.error;
      if (commsRes.error) throw commsRes.error;
      if (strategyRes.error) throw strategyRes.error;

      const tendersCount = tendersRes.data ? tendersRes.data.length : 0;
      const competeCount = competeRes.data ? competeRes.data.length : 0;
      const commsCount = commsRes.data ? commsRes.data.length : 0;
      const strategyCount = strategyRes.data ? strategyRes.data.length : 0;

      const hasData = tendersCount > 0 || competeCount > 0 || commsCount > 0 || strategyCount > 0;
      const overallSource = hasData ? 'supabase' : 'mock_fallback';

      const tEntry = createAuditEntry('useMarketIntelligence', tendersCount > 0 ? 'supabase' : 'mock_fallback', tendersCount, 'tender_intelligence', undefined, durationMs);
      const cEntry = createAuditEntry('useMarketIntelligence', competeCount > 0 ? 'supabase' : 'mock_fallback', competeCount, 'competitive_intelligence', undefined, durationMs);
      const mEntry = createAuditEntry('useMarketIntelligence', commsCount > 0 ? 'supabase' : 'mock_fallback', commsCount, 'executive_communications', undefined, durationMs);
      const sEntry = createAuditEntry('useMarketIntelligence', strategyCount > 0 ? 'supabase' : 'mock_fallback', strategyCount, 'strategic_plans', undefined, durationMs);
      logHookAudit(tEntry);
      logHookAudit(cEntry);
      logHookAudit(mEntry);
      logHookAudit(sEntry);
      setAuditTrail({ tenders: tEntry, competitive: cEntry, communications: mEntry, strategy: sEntry });

      setData({
        tenderOpportunities: (tendersRes.data as TenderOpportunity[]) || [],
        competitiveLandscape: (competeRes.data as CompetitiveIntel[]) || [],
        executiveCommunications: (commsRes.data as ExecutiveCommunication[]) || [],
        strategicPlans: (strategyRes.data as StrategicPlan[]) || [],
        isLive: hasData,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useMarketIntelligence', 'error_fallback', 0, 'tender_intelligence + competitive_intelligence + executive_communications + strategic_plans', message, durationMs);
      logHookAudit(entry);
      setAuditTrail({ tenders: entry, competitive: null, communications: null, strategy: null });
      setData({
        tenderOpportunities: mockTenderOpportunities,
        competitiveLandscape: mockCompetitiveLandscape,
        executiveCommunications: mockExecutiveCommunications,
        strategicPlans: mockStrategicPlans,
        isLive: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData, auditTrail };
}



