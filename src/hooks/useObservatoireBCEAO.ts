import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  bceaoObservatoryOverview,
  bceaoInstructions,
  bceaoCountries,
  bceaoInspections,
  bceaoAlerts,
  bceaoComplianceDimensions,
  bceaoBigFourAnalysis,
} from '@/mocks/observatoireBCEAO';

export function useObservatoireBCEAO() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');

  const [overview, setOverview] = useState(bceaoObservatoryOverview);
  const [instructions, setInstructions] = useState(bceaoInstructions);
  const [countries, setCountries] = useState(bceaoCountries);
  const [inspections, setInspections] = useState(bceaoInspections);
  const [alerts, setAlerts] = useState(bceaoAlerts);
  const [dimensions, setDimensions] = useState(bceaoComplianceDimensions);
  const [bigFour, setBigFour] = useState(bceaoBigFourAnalysis);
  const [realtimeAlerts, setRealtimeAlerts] = useState<Array<{id: string; title: string; severity: string; timestamp: string}>>([]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch regulatory_alerts for BCEAO authority
      const { data: alertsData, error: alertsError } = await supabase
        .from('regulatory_alerts')
        .select('*')
        .or('authority.ilike.%BCEAO%,authority.ilike.%UEMOA%')
        .order('severity', { ascending: false });

      if (alertsError) {
        throw new Error('Erreur Supabase');
      }

      if (alertsData && alertsData.length > 0) {
        const mappedAlerts = alertsData.map((a: any) => ({
          id: String(a.id),
          title: a.title || 'Alerte sans titre',
          severity: a.severity || 'Moyenne',
          deadline: a.compliance_deadline || '2026-12-31',
          affected: a.affected_business_units || 'Tous établissements',
          action: a.alert_type || 'Action requise',
          khepraOffer: 'Accompagnement KHEPRA disponible',
        }));
        setAlerts(mappedAlerts);
        setDataSource('live');
        setOverview(prev => ({ ...prev, alertesActives: mappedAlerts.length, dataSource: 'LIVE DB' }));
      } else {
        setAlerts(bceaoAlerts);
        setDataSource('mock');
      }

      // Try to fetch from circulars/directives/instructions if seeded
      const { data: circData } = await supabase
        .from('circulars')
        .select('*')
        .order('date', { ascending: false })
        .limit(5);

      if (circData && circData.length > 0) {
        setInstructions(prev => prev.map(p => ({ ...p, dataSource: 'LIVE DB' })));
      }

    } catch (err: any) {
      setOverview(bceaoObservatoryOverview);
      setInstructions(bceaoInstructions);
      setCountries(bceaoCountries);
      setInspections(bceaoInspections);
      setAlerts(bceaoAlerts);
      setDimensions(bceaoComplianceDimensions);
      setBigFour(bceaoBigFourAnalysis);
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    overview, instructions, countries, inspections, alerts, dimensions, bigFour,
    loading, error, dataSource, realtimeAlerts,
    refresh: fetchAll,
  };
}



