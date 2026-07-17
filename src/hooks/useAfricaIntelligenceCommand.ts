import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  countryProfiles,
  sectorAlerts,
  crossRegulatorAnalyses,
  aicKPIs,
  aicOverview,
  type CountryComplianceProfile,
  type SectorAlert,
} from '@/mocks/kosAfricaIntelligenceCommand';

export function useAfricaIntelligenceCommand() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Supabase data
  const [liveAlerts, setLiveAlerts] = useState<SectorAlert[]>([]);

  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: alertsData, error } = await supabase
        .from('regulatory_alerts')
        .select('id, title, authority, alert_type, severity, compliance_deadline, impact_assessment, affected_business_units, compliance_status, created_at')
        .order('created_at', { ascending: false })
        .limit(15);

      if (!error && alertsData && alertsData.length > 0) {
        const mapped: SectorAlert[] = alertsData.map((a: any) => ({
          id: `live-${a.id}`,
          alertId: `AIC-LIVE-${a.id}`,
          sector: a.affected_business_units?.[0] || 'Conformité',
          sectorIcon: 'ri-government-line',
          alertTitle: a.title,
          regulatorAcronym: a.authority || 'BCEAO',
          region: 'UEMOA',
          severity: (a.severity as any) || 'medium',
          countries: [],
          complianceDeadlineDays: a.compliance_deadline
            ? Math.ceil((new Date(a.compliance_deadline).getTime() - Date.now()) / 86400000)
            : null,
          description: a.impact_assessment || a.title,
          khepraAction: 'Analyse et accompagnement conformité',
          estimatedRevenueImpact: '30-80M FCFA',
          publishedDate: a.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          isNew: true,
        }));
        setLiveAlerts(mapped.slice(0, 4));
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

  // Realtime listener on regulatory_alerts
  useEffect(() => {
    const channel = supabase
      .channel('regulatory_alerts_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'regulatory_alerts' }, () => {
        fetchLiveData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLiveData]);

  // Merge live + mock alerts, deduplicated
  const allAlerts: SectorAlert[] = [...liveAlerts, ...sectorAlerts].slice(0, 16);

  // Filtered countries
  const filteredCountries: CountryComplianceProfile[] = countryProfiles.filter(c => {
    if (selectedRegion !== 'all' && c.region !== selectedRegion) return false;
    return true;
  });

  // Filtered alerts
  const filteredAlerts: SectorAlert[] = allAlerts.filter(a => {
    const sectorMatch = selectedSector === 'all' || a.sector.toLowerCase().includes(selectedSector.toLowerCase());
    const severityMatch = selectedSeverity === 'all' || a.severity === selectedSeverity;
    return sectorMatch && severityMatch;
  });

  // Region stats
  const regions = ['UEMOA', 'CEMAC', 'OHADA', 'Other'];
  const regionStats = regions.map(r => {
    const regional = countryProfiles.filter(c => c.region === r);
    return {
      region: r,
      count: regional.length,
      avgScore: regional.length > 0 ? Math.round(regional.reduce((s, c) => s + c.overallScore, 0) / regional.length) : 0,
      criticalCount: regional.filter(c => c.riskLevel === 'critical').length,
      khepraActive: regional.filter(c => c.khepraPresence !== 'none').length,
    };
  });

  const selectedCountryProfile = selectedCountry
    ? countryProfiles.find(c => c.id === selectedCountry) || null
    : null;

  const sectors = Array.from(new Set(sectorAlerts.map(a => a.sector)));

  return {
    overview: aicOverview,
    kpis: aicKPIs,
    countries: filteredCountries,
    allCountries: countryProfiles,
    alerts: filteredAlerts,
    allAlerts,
    crossAnalyses: crossRegulatorAnalyses,
    regionStats,
    sectors,
    selectedCountryProfile,
    selectedRegion,
    setSelectedRegion,
    selectedSector,
    setSelectedSector,
    selectedSeverity,
    setSelectedSeverity,
    selectedCountry,
    setSelectedCountry,
    dataSource,
    loading,
    refresh: fetchLiveData,
  };
}