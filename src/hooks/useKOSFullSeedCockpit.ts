import { useState, useCallback } from 'react';
import { kosFullSeedCockpitData } from '@/mocks/kosFullSeedCockpit';

export function useKOSFullSeedCockpit() {
  const [data] = useState(kosFullSeedCockpitData);
  const [activeCommande, setActiveCommande] = useState<string | null>(null);
  const [resultatCommande, setResultatCommande] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDomaine, setSelectedDomaine] = useState<string | null>(null);
  const [showIsoDetails, setShowIsoDetails] = useState(false);

  const executerCommande = useCallback(async (action: string) => {
    setLoading(true);
    setActiveCommande(action);
    setResultatCommande(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/kos-full-seed-orchestrator`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ action }),
        }
      );
      const json = await res.json();
      setResultatCommande(JSON.stringify(json, null, 2));
    } catch (e) {
      setResultatCommande(`Erreur: ${e instanceof Error ? e.message : 'Inconnue'}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const scoreGlobalISO = data.domaines.reduce((a, d) => a + d.scoreISO, 0) / data.domaines.length;
  const scoreGlobalBigFour = data.domaines.reduce((a, d) => a + d.scoreBigFour, 0) / data.domaines.length;
  const domainesSeeded = data.domaines.filter(d => d.statut === 'seeded').length;
  const totalRecords = data.domaines.reduce((a, d) => a + d.records, 0);

  return {
    data,
    activeCommande,
    resultatCommande,
    loading,
    selectedDomaine,
    showIsoDetails,
    scoreGlobalISO: Math.round(scoreGlobalISO),
    scoreGlobalBigFour: Math.round(scoreGlobalBigFour),
    domainesSeeded,
    totalDomaines: data.domaines.length,
    totalRecords,
    setSelectedDomaine,
    setShowIsoDetails,
    setResultatCommande,
    executerCommande,
  };
}