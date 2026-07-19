// KOS UPG-4 Revenue Pipeline Hook — Connexion Supabase LIVE
// Agrège knowledge_monetization + pipeline_deals + revenue_data
// KHEPRA EXPERTS — 25 Juin 2026

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { computeKnowledgeMonetizationKPIs, KNOWLEDGE_REVENUE_STREAMS, KNOWLEDGE_SALES_PIPELINE } from '@/services/knowledgeMonetizationEngine';

export interface RevenueDataPoint {
  month: string;
  actual: number;
  target: number;
  forecast: number;
  confidence: number;
  deals_expected_close: number;
  deals_pipeline_value: number;
  weighted_pipeline: number;
  notes: string;
  forecast_type: 'historical' | 'forecast';
}

export interface PipelineDeal {
  id: string;
  deal_name: string;
  organization: string;
  sector: string;
  country: string;
  pipeline_stage: string;
  stage_label: string;
  deal_value_fcfa: number;
  win_probability: number;
  expected_close_date: string;
  days_in_pipeline: number;
  lead_source: string;
  assigned_to: string;
  next_action: string;
  competitors: string[];
  differentiator: string;
  risk_flags: string[];
}

export interface KMonetizationItem {
  id: string;
  source_mission: string;
  source_study: string;
  derived_assets: string[];
  estimated_value_fcfa: number;
  commercial_potential: number;
  monetization_status: string;
  target_channels: string[];
  metadata: Record<string, any>;
}

export interface UPG4RevenuePipelineData {
  revenueData: RevenueDataPoint[];
  pipelineDeals: PipelineDeal[];
  monetizationItems: KMonetizationItem[];
  kpis: {
    totalRevenueMTD: number;
    totalRevenueCumul: number;
    pipelineActiveValue: number;
    pipelineDealsCount: number;
    weightedPipeline: number;
    winRate: number;
    avgDealValue: number;
    forecastQ3: number;
    knowledgeProductsValue: number;
    revenueGrowthMoM: number;
  };
  dataSource: 'live' | 'mock';
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useUPG4RevenuePipeline(): UPG4RevenuePipelineData {
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([]);
  const [pipelineDeals, setPipelineDeals] = useState<PipelineDeal[]>([]);
  const [monetizationItems, setMonetizationItems] = useState<KMonetizationItem[]>([]);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    let hasLive = false;

    try {
      // Fetch revenue_data
      const { data: revData, error: revError } = await supabase
        .from('revenue_data')
        .select('*')
        .order('id', { ascending: true });

      if (!revError && revData && revData.length > 0) {
        setRevenueData(revData as RevenueDataPoint[]);
        hasLive = true;
      } else {
        // Map mock data
        const mockRevenue: RevenueDataPoint[] = KNOWLEDGE_REVENUE_STREAMS.map((rs, idx) => ({
          month: rs.mois,
          actual: rs.total_fcfa,
          target: rs.total_fcfa * 1.1,
          forecast: rs.total_fcfa * 1.05,
          confidence: 85 + idx,
          deals_expected_close: 8 + idx * 2,
          deals_pipeline_value: rs.total_fcfa * 0.4,
          weighted_pipeline: rs.total_fcfa * 0.32,
          notes: `Mois ${rs.mois}`,
          forecast_type: 'historical',
        }));
        setRevenueData(mockRevenue);
      }

      // Fetch pipeline_deals
      const { data: dealsData, error: dealsError } = await supabase
        .from('pipeline_deals')
        .select('*')
        .order('deal_value_fcfa', { ascending: false });

      if (!dealsError && dealsData && dealsData.length > 0) {
        setPipelineDeals(dealsData as PipelineDeal[]);
        hasLive = true;
      } else {
        // Map mock pipeline
        const mockDeals: PipelineDeal[] = KNOWLEDGE_SALES_PIPELINE
          .filter(d => !['closed_won', 'closed_lost'].includes(d.statut))
          .map(d => ({
            id: d.id,
            deal_name: d.produit_titre,
            organization: d.client_nom,
            sector: d.client_secteur,
            country: d.client_pays,
            pipeline_stage: d.statut,
            stage_label: d.statut,
            deal_value_fcfa: d.valeur_fcfa,
            win_probability: d.probabilite,
            expected_close_date: '2026-08-30',
            days_in_pipeline: 10,
            lead_source: 'Site web',
            assigned_to: 'Partner',
            next_action: 'Relance',
            competitors: ['PwC', 'Deloitte'],
            differentiator: 'Expertise BCEAO/COBAC',
            risk_flags: [],
          }));
        setPipelineDeals(mockDeals);
      }

      // Fetch knowledge_monetization
      const { data: kMonetData, error: kMonetError } = await supabase
        .from('knowledge_monetization')
        .select('id, source_mission, source_study, derived_assets, estimated_value_fcfa, commercial_potential, monetization_status, target_channels, metadata')
        .eq('monetization_status', 'published')
        .order('commercial_potential', { ascending: false });

      if (!kMonetError && kMonetData && kMonetData.length > 0) {
        setMonetizationItems(kMonetData as KMonetizationItem[]);
        hasLive = true;
      }

      setDataSource(hasLive ? 'live' : 'mock');
    } catch (err: any) {
      setError(err?.message || 'Erreur inconnue');
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime subscription on pipeline_deals
  useEffect(() => {
    const channel = supabase
      .channel('upg4_pipeline_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pipeline_deals' }, () => {
        fetchAll();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'revenue_data' }, () => {
        fetchAll();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchAll]);

  // Compute KPIs
  const historicalData = revenueData.filter(r => r.forecast_type === 'historical');
  const forecastData = revenueData.filter(r => r.forecast_type === 'forecast');
  const lastMonth = historicalData[historicalData.length - 1];
  const prevMonth = historicalData[historicalData.length - 2];
  const totalCumul = historicalData.reduce((s, r) => s + (r.actual || 0), 0);
  const activePipelineDeals = pipelineDeals.filter(d =>
    ['qualification', 'proposition', 'negociation', 'discovery'].includes(d.pipeline_stage)
  );
  const pipelineActiveValue = activePipelineDeals.reduce((s, d) => s + d.deal_value_fcfa, 0);
  const weightedPipeline = activePipelineDeals.reduce((s, d) => s + (d.deal_value_fcfa * d.win_probability / 100), 0);
  const knowledgeProductsValue = monetizationItems.reduce((s, k) => s + (k.estimated_value_fcfa || 0), 0);
  const revenueGrowthMoM = lastMonth && prevMonth && prevMonth.actual > 0
    ? Math.round(((lastMonth.actual - prevMonth.actual) / prevMonth.actual) * 100)
    : 22.7;

  const kpis = {
    totalRevenueMTD: lastMonth?.actual || 283150000,
    totalRevenueCumul: totalCumul || 1174700000,
    pipelineActiveValue,
    pipelineDealsCount: activePipelineDeals.length,
    weightedPipeline,
    winRate: pipelineDeals.length > 0
      ? Math.round((pipelineDeals.filter(d => d.pipeline_stage === 'closed_won').length / pipelineDeals.length) * 100)
      : 45,
    avgDealValue: pipelineDeals.length > 0
      ? Math.round(pipelineActiveValue / Math.max(activePipelineDeals.length, 1))
      : 5000000,
    forecastQ3: forecastData.slice(0, 3).reduce((s, r) => s + (r.forecast || 0), 0) || 945000000,
    knowledgeProductsValue,
    revenueGrowthMoM,
  };

  return {
    revenueData,
    pipelineDeals,
    monetizationItems,
    kpis,
    dataSource,
    loading,
    error,
    refresh: fetchAll,
  };
}



