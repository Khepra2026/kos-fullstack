import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export interface CatalogKpi {
  id: string;
  kpi_code: string;
  kpi_name: string;
  domain: string;
  frequency: string;
  current_value: string;
  target_threshold: string;
  unit: string;
}

export interface QuarterlyKpiData {
  name: string;
  value: number;
  target: number;
  unit: string;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
}

// ── Mapping sector ID → kos_kpi_catalog domain ──
const SECTOR_TO_DOMAIN: Record<string, string> = {
  banques: 'Banques',
  fintechs: 'FinTechs',
  esg: 'ESG',
  microfinance: 'Microfinance',
  energie: 'Énergie',
  agriculture: 'Agriculture',
  pme: 'PME',
};

// ── Fallback mock quarterly KPIs for sectors without catalog data ──
const FALLBACK_QUARTERLY: Record<string, QuarterlyKpiData[]> = {
  banques: [
    { name: 'Banking Compliance Trim.', value: 82, target: 95, unit: '/100', t1: 75, t2: 82, t3: 86, t4: 95 },
    { name: 'Bank Governance Trim.', value: 76, target: 90, unit: '/100', t1: 70, t2: 76, t3: 80, t4: 90 },
    { name: 'Credit Risk Barometer Trim.', value: 71, target: 85, unit: '/100', t1: 68, t2: 71, t3: 75, t4: 85 },
    { name: 'Stress Test Score Trim.', value: 74, target: 85, unit: '/100', t1: 70, t2: 74, t3: 78, t4: 85 },
  ],
  fintechs: [
    { name: 'FinTech Maturity Trim.', value: 68, target: 85, unit: '/100', t1: 62, t2: 68, t3: 72, t4: 85 },
    { name: 'Open Banking Readiness Trim.', value: 54, target: 75, unit: '/100', t1: 49, t2: 54, t3: 60, t4: 75 },
    { name: 'Digital Payment Tracker Trim.', value: 78, target: 90, unit: '/100', t1: 72, t2: 78, t3: 82, t4: 90 },
    { name: 'Regulatory Innovation Trim.', value: 62, target: 80, unit: '/100', t1: 57, t2: 62, t3: 68, t4: 80 },
  ],
  esg: [
    { name: 'ESG Compliance Trim.', value: 79, target: 90, unit: '/100', t1: 73, t2: 79, t3: 83, t4: 90 },
    { name: 'Green Finance Tracker Trim.', value: 64, target: 80, unit: '/100', t1: 59, t2: 64, t3: 69, t4: 80 },
    { name: 'Supply Chain ESG Trim.', value: 58, target: 75, unit: '/100', t1: 53, t2: 58, t3: 63, t4: 75 },
    { name: 'Taxonomy Alignment Trim.', value: 55, target: 75, unit: '/100', t1: 50, t2: 55, t3: 62, t4: 75 },
  ],
  microfinance: [
    { name: 'SFD Health Score Trim.', value: 74, target: 88, unit: '/100', t1: 68, t2: 74, t3: 78, t4: 88 },
    { name: 'Financial Inclusion Trim.', value: 61, target: 80, unit: '/100', t1: 56, t2: 61, t3: 66, t4: 80 },
    { name: 'Digital MFI Readiness Trim.', value: 52, target: 75, unit: '/100', t1: 47, t2: 52, t3: 58, t4: 75 },
    { name: 'Portfolio Quality Trim.', value: 68, target: 85, unit: '/100', t1: 63, t2: 68, t3: 73, t4: 85 },
  ],
  energie: [
    { name: 'Project Viability Trim.', value: 72, target: 90, unit: '/100', t1: 66, t2: 72, t3: 78, t4: 90 },
    { name: 'Extractives Compliance Trim.', value: 84, target: 95, unit: '/100', t1: 78, t2: 84, t3: 88, t4: 95 },
    { name: 'Infrastructure ESG Trim.', value: 68, target: 85, unit: '/100', t1: 62, t2: 68, t3: 74, t4: 85 },
    { name: 'PPP Pipeline Trim.', value: 47, target: 75, unit: '', t1: 35, t2: 47, t3: 55, t4: 75 },
  ],
  agriculture: [
    { name: 'Agri Value Chain Trim.', value: 64, target: 85, unit: '/100', t1: 58, t2: 64, t3: 70, t4: 85 },
    { name: 'Climate Risk Trim.', value: 58, target: 80, unit: '/100', t1: 53, t2: 58, t3: 64, t4: 80 },
    { name: 'Land Compliance Trim.', value: 71, target: 90, unit: '/100', t1: 65, t2: 71, t3: 77, t4: 90 },
    { name: 'Filières Couvertes Trim.', value: 8, target: 12, unit: '', t1: 6, t2: 8, t3: 10, t4: 12 },
  ],
  pme: [
    { name: 'SME Health Trim.', value: 68, target: 85, unit: '/100', t1: 62, t2: 68, t3: 74, t4: 85 },
    { name: 'Investment Readiness Trim.', value: 62, target: 80, unit: '/100', t1: 56, t2: 62, t3: 68, t4: 80 },
    { name: 'ESG Maturity Trim.', value: 55, target: 75, unit: '/100', t1: 50, t2: 55, t3: 62, t4: 75 },
    { name: 'PME Couvertes Trim.', value: 210, target: 500, unit: '', t1: 150, t2: 210, t3: 280, t4: 500 },
  ],
};

function parseNumeric(value: string): number {
  const cleaned = value.replace(/[\s,%€]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function mapCatalogToQuarterly(row: CatalogKpi, quarter: number): QuarterlyKpiData {
  const baseVal = parseNumeric(row.current_value);
  const targetVal = parseNumeric(row.target_threshold);
  // Simulate quarterly progression
  const factors = [0.88, 1.0, 1.06, 1.15];
  return {
    name: row.kpi_name,
    value: Math.round(baseVal * factors[quarter]),
    target: targetVal || 100,
    unit: row.unit || '',
    t1: Math.round(baseVal * factors[0]),
    t2: Math.round(baseVal * factors[1]),
    t3: Math.round(baseVal * factors[2]),
    t4: Math.round(baseVal * factors[3]),
  };
}

interface UseSectorQuarterlyKpisReturn {
  quarterlyKpis: QuarterlyKpiData[];
  loading: boolean;
  error: string | null;
  fromSupabase: boolean;
  refresh: () => void;
}

// ── Global in-memory cache ──
const quarterlyCache = new Map<string, { kpis: QuarterlyKpiData[]; timestamp: number }>();
const QUARTERLY_CACHE_TTL_MS = 60000; // 60s

export function useSectorQuarterlyKpis(sectorId: string): UseSectorQuarterlyKpisReturn {
  const [quarterlyKpis, setQuarterlyKpis] = useState<QuarterlyKpiData[]>(() => {
    const cached = quarterlyCache.get(sectorId);
    if (cached && Date.now() - cached.timestamp < QUARTERLY_CACHE_TTL_MS) {
      return cached.kpis;
    }
    return [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromSupabase, setFromSupabase] = useState(false);
  // Track current quarter to prevent unnecessary refetches on setState
  const fetchRef = useRef<AbortController | null>(null);

  const fetchQuarterlyKpis = useCallback(async (quarter: number = 1) => {
    const domain = SECTOR_TO_DOMAIN[sectorId];

    const cacheKey = `${sectorId}-q${quarter}`;
    const cached = quarterlyCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < QUARTERLY_CACHE_TTL_MS) {
      setQuarterlyKpis(cached.kpis);
      setFromSupabase(true);
      setLoading(false);
      return;
    }

    if (!domain) {
      const fallback = FALLBACK_QUARTERLY[sectorId] || [];
      setQuarterlyKpis(fallback);
      setFromSupabase(false);
      setLoading(false);
      return;
    }

    try {
      // Cancel previous request
      if (fetchRef.current) fetchRef.current.abort();
      fetchRef.current = new AbortController();

      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('kos_kpi_catalog')
        .select('id, kpi_code, kpi_name, domain, frequency, current_value, target_threshold, unit')
        .eq('domain', domain)
        .eq('frequency', 'trimestrielle')
        .eq('is_active', true)
        .abortSignal(fetchRef.current.signal);

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        const mapped = (data as CatalogKpi[]).map(row => mapCatalogToQuarterly(row, quarter));
        setQuarterlyKpis(mapped);
        setFromSupabase(true);
        quarterlyCache.set(cacheKey, { kpis: mapped, timestamp: Date.now() });
      } else {
        setQuarterlyKpis(FALLBACK_QUARTERLY[sectorId] || []);
        setFromSupabase(false);
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Erreur chargement KPIs trimestriels');
      setQuarterlyKpis(FALLBACK_QUARTERLY[sectorId] || []);
      setFromSupabase(false);
    } finally {
      setLoading(false);
    }
  }, [sectorId]);

  useEffect(() => {
    fetchQuarterlyKpis(1);
    return () => {
      if (fetchRef.current) fetchRef.current.abort();
    };
  }, [fetchQuarterlyKpis]);

  return { quarterlyKpis, loading, error, fromSupabase, refresh: () => fetchQuarterlyKpis(1) };
}