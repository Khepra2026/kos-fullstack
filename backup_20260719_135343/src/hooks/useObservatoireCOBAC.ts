import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  cobacTexts,
  cobacCountries,
  cobacInspections,
  cobacKPIs,
  cobacOverview,
  type COBACText,
  type COBACInspection,
} from '@/mocks/observatoireCOBAC';

export function useObservatoireCOBAC() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedTextType, setSelectedTextType] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [selectedInspectionStatus, setSelectedInspectionStatus] = useState<string>('all');
  const [liveAlerts, setLiveAlerts] = useState<COBACText[]>([]);

  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: alertsData, error } = await supabase
        .from('regulatory_alerts')
        .select('id, title, authority, alert_type, severity, compliance_deadline, impact_assessment, affected_business_units, created_at')
        .eq('authority', 'COBAC')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && alertsData && alertsData.length > 0) {
        const mapped: COBACText[] = alertsData.map((a: any) => ({
          id: `live-${a.id}`,
          reference: `COBAC-${a.alert_type?.toUpperCase()}-${String(a.id).padStart(3, '0')}`,
          title: a.title,
          type: a.alert_type || 'Note',
          year: 2026,
          countryScope: a.affected_business_units || ['CEMAC'],
          verified: true,
          khepraStatus: 'veille',
          impactLevel: (a.severity === 'critical' ? 'critique' : a.severity === 'high' ? 'élevé' : 'moyen') as any,
          summary: a.impact_assessment || a.title,
          clientActions: ['Analyse KHEPRA'],
          citationCount: 0,
          lastVerified: a.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        }));
        setLiveAlerts(mapped);
        setDataSource('live');
      }
    } catch {
      setLiveAlerts([]);
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  // Realtime listener
  useEffect(() => {
    const channel = supabase
      .channel('cobac_regulatory_alerts_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'regulatory_alerts', filter: 'authority=eq.COBAC' }, () => {
        fetchLiveData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLiveData]);

  // Merge live + mock texts
  const allTexts: COBACText[] = [...liveAlerts, ...cobacTexts].slice(0, 24);

  const filteredTexts: COBACText[] = allTexts.filter(t => {
    const countryMatch = selectedCountry === 'all' || t.countryScope.includes(selectedCountry);
    const typeMatch = selectedTextType === 'all' || t.type === selectedTextType;
    const impactMatch = selectedImpact === 'all' || t.impactLevel === selectedImpact;
    return countryMatch && typeMatch && impactMatch;
  });

  const filteredInspections: COBACInspection[] = cobacInspections.filter(i => {
    const statusMatch = selectedInspectionStatus === 'all' || i.status === selectedInspectionStatus;
    const countryMatch = selectedCountry === 'all' || i.country === selectedCountry;
    return statusMatch && countryMatch;
  });

  const countries = cobacCountries.map(c => c.name);
  const textTypes = ['Circulaire', 'Directive', 'Instruction', 'Règlement', 'Note'];
  const impactLevels = ['critique', 'élevé', 'moyen', 'faible'];

  const countryStats = cobacCountries.map(c => {
    const countryTexts = allTexts.filter(t => t.countryScope.includes(c.name));
    return {
      ...c,
      textCount: countryTexts.length,
      criticalTexts: countryTexts.filter(t => t.impactLevel === 'critique').length,
    };
  });

  return {
    overview: cobacOverview,
    kpis: cobacKPIs,
    texts: filteredTexts,
    allTexts,
    countries: countryStats,
    allCountries: cobacCountries,
    inspections: filteredInspections,
    allInspections: cobacInspections,
    textTypes,
    impactLevels,
    selectedCountry,
    setSelectedCountry,
    selectedTextType,
    setSelectedTextType,
    selectedImpact,
    setSelectedImpact,
    selectedInspectionStatus,
    setSelectedInspectionStatus,
    dataSource,
    loading,
    refresh: fetchLiveData,
  };
}



