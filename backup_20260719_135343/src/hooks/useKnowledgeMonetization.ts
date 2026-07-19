// KOS Knowledge Monetization Hook — Industrialisation & Vente Connaissances
// Supabase-first, fallback mock automatique
// KHEPRA EXPERTS — 25 Juin 2026

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KNOWLEDGE_PRODUCTS,
  KNOWLEDGE_SALES_PIPELINE,
  KNOWLEDGE_REVENUE_STREAMS,
  computeKnowledgeMonetizationKPIs,
  ISO_QUALITY_CRITERIA,
  type KnowledgeProduct,
  type KnowledgeSalesPipeline,
  type KnowledgeRevenueStream,
  type KnowledgeMonetizationKPIs,
  type ISOQualityCriteria,
} from '@/services/knowledgeMonetizationEngine';

export type {
  KnowledgeProduct,
  KnowledgeSalesPipeline,
  KnowledgeRevenueStream,
  KnowledgeMonetizationKPIs,
  ISOQualityCriteria,
};

export interface KnowledgeMonetizationData {
  products: KnowledgeProduct[];
  salesPipeline: KnowledgeSalesPipeline[];
  revenueStreams: KnowledgeRevenueStream[];
  kpis: KnowledgeMonetizationKPIs;
  qualityCriteria: ISOQualityCriteria[];
  isLive: boolean;
}

export function useKnowledgeMonetization() {
  const [data, setData] = useState<KnowledgeMonetizationData>({
    products: [],
    salesPipeline: [],
    revenueStreams: [],
    kpis: computeKnowledgeMonetizationKPIs(),
    qualityCriteria: ISO_QUALITY_CRITERIA,
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const productsRes = await supabase.from('kos_knowledge_products').select('*').order('date_publication', { ascending: false });

      if (productsRes.error) throw productsRes.error;

      const hasLiveData = productsRes.data && productsRes.data.length > 0;
      const liveProducts = (productsRes.data || []) as unknown as KnowledgeProduct[];
      const products = hasLiveData ? liveProducts : KNOWLEDGE_PRODUCTS;

      setData({
        products,
        salesPipeline: hasLiveData ? ([] as KnowledgeSalesPipeline[]) : KNOWLEDGE_SALES_PIPELINE,
        revenueStreams: hasLiveData ? ([] as KnowledgeRevenueStream[]) : KNOWLEDGE_REVENUE_STREAMS,
        kpis: hasLiveData ? computeKnowledgeMonetizationKPIs() : computeKnowledgeMonetizationKPIs(),
        qualityCriteria: ISO_QUALITY_CRITERIA,
        isLive: hasLiveData,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setData({
        products: KNOWLEDGE_PRODUCTS,
        salesPipeline: KNOWLEDGE_SALES_PIPELINE,
        revenueStreams: KNOWLEDGE_REVENUE_STREAMS,
        kpis: computeKnowledgeMonetizationKPIs(),
        qualityCriteria: ISO_QUALITY_CRITERIA,
        isLive: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
}



