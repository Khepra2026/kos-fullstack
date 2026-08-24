import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import type { ControleCartographie } from '@/mocks/cartographieControlesAutomatisables';
import { DOMAINES_MAP, CARTOGRAPHIE_META } from '@/mocks/cartographieControlesAutomatisables';

export interface UseCartographieReturn {
  controles: ControleCartographie[];
  filteredControles: ControleCartographie[];
  meta: typeof CARTOGRAPHIE_META;
  loading: boolean;
  error: string | null;
  isLive: boolean;
  refetch: () => void;
  referentielFilter: string; setReferentielFilter: (v: string) => void;
  prioriteFilter: string; setPrioriteFilter: (v: string) => void;
  domaineFilter: string; setDomaineFilter: (v: string) => void;
  searchQuery: string; setSearchQuery: (v: string) => void;
  sortBy: string; setSortBy: (v: string) => void;
  uniqueReferentiels: string[];
  uniquePriorites: string[];
  uniqueDomaines: string[];
}

const CONTROLE_FIELDS = 'identifiant_unique,code_domaine,nom_controle,description_automatisation,type_automatisation,technologie_requise,complexite,effort_jh,roi_estime,priorite,statut_implementation,cout_estime_eur,gain_efficience_pct,reduction_risque_pct,livrable_attendu,sources_donnees';

const TABLES = [
  { name: 'cobac_cartographie_controles_automatisables', ref: 'COBAC' as const },
  { name: 'bceao_cb_cartographie_controles_automatisables', ref: 'BCEAO' as const },
  { name: 'ohada_cartographie_controles_automatisables', ref: 'OHADA' as const },
  { name: 'giaba_cartographie_controles_automatisables', ref: 'GIABA' as const },
  { name: 'gabac_cartographie_controles_automatisables', ref: 'GABAC' as const },
];

function mapRow(row: Record<string, unknown>, ref: 'COBAC' | 'BCEAO' | 'OHADA' | 'GIABA' | 'GABAC'): ControleCartographie {
  return {
    identifiant_unique: row.identifiant_unique as string,
    referentiel: ref,
    code_domaine: row.code_domaine as string,
    nom_domaine: DOMAINES_MAP[ref]?.[row.code_domaine as string] || `Domaine ${row.code_domaine}`,
    nom_controle: row.nom_controle as string,
    description_automatisation: row.description_automatisation as string || '',
    type_automatisation: row.type_automatisation as string || 'N/A',
    technologie_requise: row.technologie_requise as string || 'N/A',
    complexite: row.complexite as string || 'Moyenne',
    effort_jh: row.effort_jh as number || 0,
    roi_estime: row.roi_estime as string || 'N/A',
    priorite: row.priorite as string || 'P2 - Moyenne',
    statut_implementation: row.statut_implementation as string || 'Planifié',
    cout_estime_eur: row.cout_estime_eur as number || 0,
    gain_efficience_pct: row.gain_efficience_pct as number || 0,
    reduction_risque_pct: row.reduction_risque_pct as number || 0,
    livrable_attendu: row.livrable_attendu as string || 'N/A',
    sources_donnees: row.sources_donnees as string[] || [],
  };
}

export function useCartographieControles(): UseCartographieReturn {
  const [controles, setControles] = useState<ControleCartographie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const [referentielFilter, setReferentielFilter] = useState('Tous');
  const [prioriteFilter, setPrioriteFilter] = useState('Toutes');
  const [domaineFilter, setDomaineFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('priorite');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results: ControleCartographie[] = [];
      let live = false;
      for (const table of TABLES) {
        const { data, error: err } = await supabase.from(table.name).select(CONTROLE_FIELDS).order('priorite');
        if (!err && data && data.length > 0) {
          live = true;
          data.forEach((row: Record<string, unknown>) => results.push(mapRow(row, table.ref)));
        }
      }
      setIsLive(live);
      setControles(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const uniqueReferentiels = useMemo(() => ['Tous', ...Array.from(new Set(controles.map(c => c.referentiel)))], [controles]);
  const uniquePriorites = useMemo(() => ['Toutes', ...Array.from(new Set(controles.map(c => c.priorite))).sort().reverse()], [controles]);
  const uniqueDomaines = useMemo(() => ['Tous', ...Array.from(new Set(controles.map(c => c.code_domaine))).sort()], [controles]);

  const filteredControles = useMemo(() => {
    let filtered = [...controles];
    if (referentielFilter !== 'Tous') filtered = filtered.filter(c => c.referentiel === referentielFilter);
    if (prioriteFilter !== 'Toutes') filtered = filtered.filter(c => c.priorite === prioriteFilter);
    if (domaineFilter !== 'Tous') filtered = filtered.filter(c => c.code_domaine === domaineFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(c => c.nom_controle.toLowerCase().includes(q) || c.description_automatisation.toLowerCase().includes(q) || c.identifiant_unique.toLowerCase().includes(q));
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'cout': return b.cout_estime_eur - a.cout_estime_eur;
        case 'effort': return b.effort_jh - a.effort_jh;
        case 'gain': return b.gain_efficience_pct - a.gain_efficience_pct;
        case 'risque': return b.reduction_risque_pct - a.reduction_risque_pct;
        default: { const pa = a.priorite.startsWith('P0') ? 0 : a.priorite.startsWith('P1') ? 1 : 2; const pb = b.priorite.startsWith('P0') ? 0 : b.priorite.startsWith('P1') ? 1 : 2; return pa - pb; }
      }
    });
    return filtered;
  }, [controles, referentielFilter, prioriteFilter, domaineFilter, searchQuery, sortBy]);

  return {
    controles, filteredControles, meta: CARTOGRAPHIE_META, loading, error, isLive,
    refetch: fetchData,
    referentielFilter, setReferentielFilter, prioriteFilter, setPrioriteFilter,
    domaineFilter, setDomaineFilter, searchQuery, setSearchQuery, sortBy, setSortBy,
    uniqueReferentiels, uniquePriorites, uniqueDomaines,
  };
}



