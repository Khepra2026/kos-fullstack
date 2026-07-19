import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface SectorKpiData {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: string;
  change: string;
  icon: string;
  desc?: string;
}

export interface UnifiedKpi {
  id: string;
  category: string;
  label: string;
  current: string;
  target: string;
  unit: string;
  trend: string;
  icon: string;
}

// ── Fallback mock data for sectors without Supabase categories ──
const FALLBACK_KPIS: Record<string, SectorKpiData[]> = {
  banques: [
    { name: 'Banking Compliance Score™', value: 82, target: 95, unit: '/100', trend: 'up', change: '+4', icon: 'ri-bank-line', desc: 'Conformité réglementaire bancaire UEMOA/CEMAC' },
    { name: 'Bank Governance Score™', value: 76, target: 90, unit: '/100', trend: 'up', change: '+3', icon: 'ri-government-line', desc: 'Gouvernance des banques commerciales' },
    { name: 'Credit Risk Barometer™', value: 71, target: 85, unit: '/100', trend: 'down', change: '-2', icon: 'ri-alert-line', desc: 'Baromètre du risque de crédit' },
    { name: 'Banques Suivies', value: 52, target: 65, unit: '', trend: 'up', change: '+8', icon: 'ri-building-line', desc: 'Banques commerciales UEMOA + CEMAC' },
    { name: 'Pays Couverts', value: 15, target: 17, unit: '', trend: 'stable', change: '+0', icon: 'ri-global-line', desc: 'UEMOA + CEMAC + RDC' },
    { name: 'Publications/an', value: 4, target: 4, unit: '', trend: 'up', change: '+1', icon: 'ri-book-open-line', desc: 'Rapports trimestriels + benchmark' },
  ],
  fintechs: [
    { name: 'FinTech Maturity Index™', value: 68, target: 85, unit: '/100', trend: 'up', change: '+5', icon: 'ri-smartphone-line', desc: 'Maturité de l\'écosystème FinTech' },
    { name: 'Open Banking Readiness™', value: 54, target: 75, unit: '/100', trend: 'up', change: '+7', icon: 'ri-links-line', desc: 'Préparation à l\'Open Banking' },
    { name: 'Digital Payment Tracker™', value: 78, target: 90, unit: '/100', trend: 'up', change: '+6', icon: 'ri-money-dollar-circle-line', desc: 'Traçage des paiements digitaux' },
    { name: 'FinTechs Suivies', value: 34, target: 50, unit: '', trend: 'up', change: '+11', icon: 'ri-rocket-line', desc: 'FinTechs actives UEMOA + CEMAC' },
    { name: 'Pays Couverts', value: 12, target: 17, unit: '', trend: 'up', change: '+3', icon: 'ri-global-line', desc: 'UEMOA + CEMAC + Diaspora' },
    { name: 'Publications/an', value: 3, target: 4, unit: '', trend: 'up', change: '+1', icon: 'ri-book-open-line', desc: 'Rapports semestriels + benchmark' },
  ],
  esg: [
    { name: 'ESG Compliance Score™', value: 79, target: 90, unit: '/100', trend: 'up', change: '+5', icon: 'ri-leaf-line', desc: 'Conformité ESG ISSB/IFRS S1-S2' },
    { name: 'Green Finance Tracker™', value: 64, target: 80, unit: '/100', trend: 'up', change: '+7', icon: 'ri-funds-line', desc: 'Traçage de la finance durable' },
    { name: 'Supply Chain ESG™', value: 58, target: 75, unit: '/100', trend: 'up', change: '+4', icon: 'ri-git-branch-line', desc: 'ESG chaîne d\'approvisionnement' },
    { name: 'Entités Notées', value: 89, target: 120, unit: '', trend: 'up', change: '+15', icon: 'ri-building-2-line', desc: 'Entreprises notées ESG' },
    { name: 'Pays Couverts', value: 54, target: 54, unit: '', trend: 'stable', change: '+0', icon: 'ri-global-line', desc: 'Panafricain — 54 pays' },
    { name: 'Publications/an', value: 4, target: 4, unit: '', trend: 'up', change: '+1', icon: 'ri-book-open-line', desc: 'Rapports trimestriels ESG' },
  ],
  microfinance: [
    { name: 'SFD Health Score™', value: 74, target: 88, unit: '/100', trend: 'up', change: '+6', icon: 'ri-hand-heart-line', desc: 'Santé financière des SFD UEMOA' },
    { name: 'Financial Inclusion Index™', value: 61, target: 80, unit: '/100', trend: 'up', change: '+5', icon: 'ri-user-heart-line', desc: 'Indice d\'inclusion financière' },
    { name: 'Digital MFI Readiness™', value: 52, target: 75, unit: '/100', trend: 'up', change: '+8', icon: 'ri-smartphone-line', desc: 'Préparation digitale des SFD' },
    { name: 'SFD Suivis', value: 186, target: 220, unit: '', trend: 'up', change: '+23', icon: 'ri-building-3-line', desc: 'SFD agréés UEMOA' },
    { name: 'Pays Couverts', value: 8, target: 8, unit: '', trend: 'stable', change: '+0', icon: 'ri-global-line', desc: 'UEMOA — 8 pays' },
    { name: 'Publications/an', value: 4, target: 4, unit: '', trend: 'up', change: '+1', icon: 'ri-book-open-line', desc: 'Rapports trimestriels SFD' },
  ],
  energie: [
    { name: 'Projets Suivis', value: 47, target: 75, unit: '', trend: 'up', change: '+6', icon: 'ri-building-2-line', desc: 'PPP et projets énergétiques en portefeuille' },
    { name: 'Score Viability Score™', value: 72, target: 90, unit: '/100', trend: 'up', change: '+3', icon: 'ri-line-chart-line', desc: 'Indice KOS de viabilité projet' },
    { name: 'Conformité Extractives', value: 84, target: 95, unit: '/100', trend: 'up', change: '+5', icon: 'ri-shield-check-line', desc: 'Compliance Industries Extractives' },
    { name: 'Score ESG Infra', value: 68, target: 85, unit: '/100', trend: 'up', change: '+4', icon: 'ri-leaf-line', desc: 'Performance ESG des infrastructures' },
    { name: 'Pays Couverts', value: 14, target: 17, unit: '', trend: 'stable', change: '+0', icon: 'ri-global-line', desc: 'UEMOA + CEMAC + CEDEAO' },
    { name: 'Publications/an', value: 3, target: 4, unit: '', trend: 'up', change: '+1', icon: 'ri-book-open-line', desc: 'Rapports semestriels + benchmark' },
  ],
  agriculture: [
    { name: 'Chaînes de valeur couvertes', value: 8, target: 12, unit: '', trend: 'up', change: '+2', icon: 'ri-git-branch-line', desc: 'Filières agricoles suivies' },
    { name: 'Score Chaîne de Valeur™', value: 64, target: 85, unit: '/100', trend: 'up', change: '+5', icon: 'ri-line-chart-line', desc: 'Indice KOS Agri Value Chain' },
    { name: 'Risque Climatique', value: 58, target: 80, unit: '/100', trend: 'up', change: '+3', icon: 'ri-cloud-line', desc: 'KOS Climate Risk Score™' },
    { name: 'Conformité Foncière', value: 71, target: 90, unit: '/100', trend: 'up', change: '+4', icon: 'ri-landscape-line', desc: 'KOS Land Compliance Index™' },
    { name: 'Pays Couverts', value: 10, target: 17, unit: '', trend: 'stable', change: '+0', icon: 'ri-global-line', desc: 'UEMOA + CEMAC + CEDEAO' },
    { name: 'Publications/an', value: 2, target: 4, unit: '', trend: 'up', change: '+1', icon: 'ri-book-open-line', desc: 'Rapports annuels + baromètre' },
  ],
  pme: [
    { name: 'PME Suivies', value: 210, target: 500, unit: '', trend: 'up', change: '+34', icon: 'ri-store-2-line', desc: 'Entreprises en portefeuille d\'analyse' },
    { name: 'Score Santé PME™', value: 68, target: 85, unit: '/100', trend: 'up', change: '+4', icon: 'ri-heart-pulse-line', desc: 'KOS SME Health Index™' },
    { name: 'Investment Readiness™', value: 62, target: 80, unit: '/100', trend: 'up', change: '+5', icon: 'ri-funds-line', desc: 'KOS Investment Readiness Score™' },
    { name: 'Maturité ESG PME', value: 55, target: 75, unit: '/100', trend: 'up', change: '+6', icon: 'ri-leaf-line', desc: 'KOS SME ESG Maturity™' },
    { name: 'Pays Couverts', value: 12, target: 17, unit: '', trend: 'up', change: '+1', icon: 'ri-global-line', desc: 'UEMOA + CEMAC' },
    { name: 'Publications/an', value: 3, target: 4, unit: '', trend: 'up', change: '+1', icon: 'ri-book-open-line', desc: 'Rapports + benchmark + guide' },
  ],
};

// ── Mapping sector ID → kos_unified_kpis category ──
const SECTOR_TO_CATEGORY: Record<string, string> = {
  banques: 'sector_banques',
  fintechs: 'sector_fintechs',
  esg: 'sector_esg',
  microfinance: 'sector_mfi',
  energie: 'sector_energie',
  agriculture: 'sector_agriculture',
  pme: 'sector_pme',
};

function parseNumeric(value: string): number {
  const cleaned = value.replace(/[\s,%€]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function mapUnifiedToSectorKpi(row: UnifiedKpi): SectorKpiData {
  const currentVal = parseNumeric(row.current);
  const targetVal = parseNumeric(row.target);
  const changeVal = currentVal - targetVal;
  return {
    name: row.label,
    value: currentVal,
    target: targetVal || 100,
    unit: row.unit || '',
    trend: row.trend || 'stable',
    change: changeVal > 0 ? `+${Math.round(changeVal)}` : changeVal < 0 ? `${Math.round(changeVal)}` : '+0',
    icon: row.icon || 'ri-bar-chart-line',
    desc: '',
  };
}

interface UseSectorKpisReturn {
  kpis: SectorKpiData[];
  loading: boolean;
  error: string | null;
  fromSupabase: boolean;
  refresh: () => void;
  lastRefresh: Date | null;
}

const sectorCache = new Map<string, { kpis: SectorKpiData[]; timestamp: number }>();
const CACHE_TTL_MS = 30000; // 30s cache

export function useSectorKpis(sectorId: string): UseSectorKpisReturn {
  const [kpis, setKpis] = useState<SectorKpiData[]>(() => {
    const cached = sectorCache.get(sectorId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.kpis;
    }
    return [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromSupabase, setFromSupabase] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchKpis = useCallback(async () => {
    const category = SECTOR_TO_CATEGORY[sectorId];

    // Check cache first
    const cached = sectorCache.get(sectorId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      setKpis(cached.kpis);
      setFromSupabase(true);
      setLoading(false);
      setLastRefresh(new Date(cached.timestamp));
      return;
    }

    // No Supabase category → use fallback mock immediately
    if (!category) {
      const fallback = FALLBACK_KPIS[sectorId] || [];
      setKpis(fallback);
      setFromSupabase(false);
      setLoading(false);
      setLastRefresh(new Date());
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('kos_unified_kpis')
        .select('*')
        .eq('category', category)
        .order('label');

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        const mapped = (data as UnifiedKpi[]).map(mapUnifiedToSectorKpi);
        setKpis(mapped);
        setFromSupabase(true);
        sectorCache.set(sectorId, { kpis: mapped, timestamp: Date.now() });
      } else {
        // Supabase connected but no data → fallback mock
        setKpis(FALLBACK_KPIS[sectorId] || []);
        setFromSupabase(false);
      }
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur chargement KPI');
      // Fallback to mock on error
      setKpis(FALLBACK_KPIS[sectorId] || []);
      setFromSupabase(false);
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, [sectorId]);

  useEffect(() => {
    fetchKpis();
  }, [fetchKpis]);

  return { kpis, loading, error, fromSupabase, refresh: fetchKpis, lastRefresh };
}



