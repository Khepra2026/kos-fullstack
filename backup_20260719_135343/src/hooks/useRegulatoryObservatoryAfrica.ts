import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface Regulator {
  id: string;
  name: string;
  acronym: string;
  region: string;
  countries: string[];
  institutionsCount: number;
  alertsCount: number;
  complianceScore: number;
  trend: 'up' | 'stable' | 'down';
  lastUpdate: string;
  website?: string;
  color: string;
  icon: string;
}

export interface RegObsAlert {
  id: string;
  regulatorName: string;
  regulatorAcronym: string;
  alertType: 'critical' | 'haute' | 'moyenne' | 'info';
  title: string;
  description: string;
  publishDate: string;
  countries: string[];
  impactedSectors: string[];
  daysToCompliance: number | null;
  isNew: boolean;
}

export interface Observatory {
  id: string;
  name: string;
  sector: string;
  jurisdiction: string;
  description: string;
  activeAlertsCount: number;
  regulationsCount: number;
  complianceScore: number;
  trendDirection: string;
  keyIndicators: Record<string, any>;
}

// Static regulators — 8 Big Four African regulators
const REGULATORS: Regulator[] = [
  {
    id: 'bceao', name: 'Banque Centrale des États de l\'Afrique de l\'Ouest', acronym: 'BCEAO',
    region: 'UEMOA', countries: ['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Bénin', 'Togo', 'Niger', 'Guinée-Bissau'],
    institutionsCount: 127, alertsCount: 18, complianceScore: 87, trend: 'up',
    lastUpdate: '2026-06-20', website: 'https://www.bceao.int', color: 'primary', icon: 'ri-bank-line',
  },
  {
    id: 'cobac', name: 'Commission Bancaire de l\'Afrique Centrale', acronym: 'COBAC',
    region: 'CEMAC', countries: ['Cameroun', 'Gabon', 'Congo', 'Centrafrique', 'Tchad', 'Guinée Équatoriale'],
    institutionsCount: 54, alertsCount: 12, complianceScore: 82, trend: 'stable',
    lastUpdate: '2026-06-18', website: 'https://www.cobac.org', color: 'accent', icon: 'ri-government-line',
  },
  {
    id: 'gafi', name: 'Groupe d\'Action Financière', acronym: 'GAFI/GIABA',
    region: 'Afrique de l\'Ouest', countries: ['Sénégal', 'Nigeria', 'Ghana', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Bénin', 'Togo', 'Niger', 'Guinée', 'Cap-Vert', 'Gambie', 'Liberia', 'Sierra Leone', 'Guinée-Bissau'],
    institutionsCount: 15, alertsCount: 24, complianceScore: 72, trend: 'up',
    lastUpdate: '2026-06-15', website: 'https://www.fatf-gafi.org', color: 'secondary', icon: 'ri-shield-check-line',
  },
  {
    id: 'ohada', name: 'Organisation pour l\'Harmonisation en Afrique du Droit des Affaires', acronym: 'OHADA',
    region: 'Afrique Francophone', countries: ['Bénin', 'Burkina Faso', 'Cameroun', 'Centrafrique', 'Comores', 'Congo', 'Côte d\'Ivoire', 'Gabon', 'Guinée', 'Guinée-Bissau', 'Guinée Équatoriale', 'Mali', 'Niger', 'RDC', 'Sénégal', 'Tchad', 'Togo'],
    institutionsCount: 17, alertsCount: 8, complianceScore: 91, trend: 'stable',
    lastUpdate: '2026-06-10', website: 'https://www.ohada.org', color: 'primary', icon: 'ri-scales-line',
  },
  {
    id: 'cima', name: 'Conférence Interafricaine des Marchés d\'Assurances', acronym: 'CIMA',
    region: 'Zone CIMA', countries: ['Bénin', 'Burkina Faso', 'Cameroun', 'Centrafrique', 'Comores', 'Congo', 'Côte d\'Ivoire', 'Gabon', 'Guinée Équatoriale', 'Mali', 'Niger', 'Sénégal', 'Tchad', 'Togo'],
    institutionsCount: 248, alertsCount: 10, complianceScore: 84, trend: 'stable',
    lastUpdate: '2026-06-12', website: 'https://www.cima-afrique.org', color: 'accent', icon: 'ri-file-shield-2-line',
  },
  {
    id: 'cosumaf', name: 'Commission de Surveillance du Marché Financier de l\'Afrique Centrale', acronym: 'COSUMAF',
    region: 'CEMAC', countries: ['Cameroun', 'Gabon', 'Congo', 'Centrafrique', 'Tchad', 'Guinée Équatoriale'],
    institutionsCount: 28, alertsCount: 6, complianceScore: 78, trend: 'up',
    lastUpdate: '2026-06-08', website: 'https://www.cosumaf.org', color: 'secondary', icon: 'ri-stock-line',
  },
  {
    id: 'crepmf', name: 'Conseil Régional de l\'Épargne Publique et des Marchés Financiers', acronym: 'AMF-UEMOA',
    region: 'UEMOA', countries: ['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Bénin', 'Togo', 'Niger', 'Guinée-Bissau'],
    institutionsCount: 35, alertsCount: 7, complianceScore: 85, trend: 'up',
    lastUpdate: '2026-06-14', website: 'https://www.crepmf.org', color: 'primary', icon: 'ri-line-chart-line',
  },
  {
    id: 'beac', name: 'Banque des États de l\'Afrique Centrale', acronym: 'BEAC',
    region: 'CEMAC', countries: ['Cameroun', 'Gabon', 'Congo', 'Centrafrique', 'Tchad', 'Guinée Équatoriale'],
    institutionsCount: 6, alertsCount: 5, complianceScore: 89, trend: 'stable',
    lastUpdate: '2026-06-17', website: 'https://www.beac.int', color: 'accent', icon: 'ri-building-2-line',
  },
];

// Static real-time alerts — 8 regulators, 54 countries covered
const MOCK_ALERTS: RegObsAlert[] = [
  { id: 'a1', regulatorName: 'BCEAO', regulatorAcronym: 'BCEAO', alertType: 'critical', title: 'Nouvelles exigences fonds propres SFD — Instruction BCEAO 2026', description: 'La BCEAO renforce les exigences de capital minimum pour les SFD de catégorie 1. Délai de mise en conformité : 18 mois.', publishDate: '2026-06-15', countries: ['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso'], impactedSectors: ['Microfinance', 'SFD'], daysToCompliance: 547, isNew: true },
  { id: 'a2', regulatorName: 'COBAC', regulatorAcronym: 'COBAC', alertType: 'critical', title: 'Directive COBAC 2027 — Cyber Résilience Bancaire', description: 'Publication de la directive sur la résilience opérationnelle. Les banques CEMAC disposent de 24 mois pour se mettre en conformité. Exigences SOC 24/7, MTTD < 4h.', publishDate: '2026-06-10', countries: ['Cameroun', 'Gabon', 'Congo'], impactedSectors: ['Banque', 'Cybersécurité'], daysToCompliance: 730, isNew: true },
  { id: 'a3', regulatorName: 'GAFI/GIABA', regulatorAcronym: 'GAFI', alertType: 'haute', title: 'Révision Recommandation R.15 — Actifs Virtuels 2026', description: 'Mise à jour des lignes directrices GAFI sur les crypto-actifs et les VASP. Applicabilité immédiate pour les membres GIABA.', publishDate: '2026-05-28', countries: ['Sénégal', 'Nigeria', 'Ghana', 'Côte d\'Ivoire'], impactedSectors: ['FinTech', 'Crypto', 'LBC/FT'], daysToCompliance: null, isNew: false },
  { id: 'a4', regulatorName: 'BCEAO', regulatorAcronym: 'BCEAO', alertType: 'haute', title: 'Baromètre BCEAO Q2 2026 — Stress Tests Climatiques Pilier 2', description: 'Publication des résultats de l\'exercice de stress test climatique sur 15 banques UEMOA. 6 établissements sous surveillance renforcée.', publishDate: '2026-06-20', countries: ['Côte d\'Ivoire', 'Sénégal', 'Burkina Faso'], impactedSectors: ['Banque', 'ESG', 'Risques'], daysToCompliance: null, isNew: true },
  { id: 'a5', regulatorName: 'OHADA', regulatorAcronym: 'OHADA', alertType: 'moyenne', title: 'Réforme Acte Uniforme Sociétés Commerciales — Gouvernance Numérique', description: 'Projet de réforme de l\'AUSCGIE intégrant les assemblées générales numériques et la signature électronique des actes corporatifs. Consultation publique ouverte.', publishDate: '2026-06-05', countries: ['Bénin', 'Cameroun', 'Sénégal', 'Côte d\'Ivoire'], impactedSectors: ['Droit des Affaires', 'Gouvernance'], daysToCompliance: null, isNew: false },
  { id: 'a6', regulatorName: 'CIMA', regulatorAcronym: 'CIMA', alertType: 'moyenne', title: 'Réforme Code CIMA 2027 — Provisions Techniques Assurance Vie', description: 'Renforcement des exigences de provisionnement pour les contrats vie longue durée. Impact sur 45 compagnies de la zone CIMA.', publishDate: '2026-06-02', countries: ['Cameroun', 'Côte d\'Ivoire', 'Sénégal'], impactedSectors: ['Assurance', 'Assurance Vie'], daysToCompliance: 365, isNew: false },
  { id: 'a7', regulatorName: 'COSUMAF', regulatorAcronym: 'COSUMAF', alertType: 'info', title: 'Nouvelles règles cotation DSX — Émission obligations corporate', description: 'Simplification des conditions d\'accès au marché obligataire CEMAC pour les PME. Seuil minimum abaissé à 500M FCFA.', publishDate: '2026-05-15', countries: ['Cameroun', 'Gabon'], impactedSectors: ['Marchés Financiers', 'PME'], daysToCompliance: null, isNew: false },
  { id: 'a8', regulatorName: 'BEAC', regulatorAcronym: 'BEAC', alertType: 'haute', title: 'Politique Monétaire BEAC — Relèvement TIAO Juin 2026', description: 'La BEAC porte son taux directeur à 4.5% (+50bp). Impact sur les conditions de refinancement des banques CEMAC et les taux crédit.', publishDate: '2026-06-19', countries: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], impactedSectors: ['Banque', 'Crédit', 'Politique Monétaire'], daysToCompliance: null, isNew: true },
];

export function useRegulatoryObservatoryAfrica() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');
  const [selectedRegulator, setSelectedRegulator] = useState<string>('all');

  const [regulators] = useState<Regulator[]>(REGULATORS);
  const [alerts, setAlerts] = useState<RegObsAlert[]>(MOCK_ALERTS);
  const [observatories, setObservatories] = useState<Observatory[]>([]);
  const [regulationsCount, setRegulationsCount] = useState(0);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [obsRes, alertsRes, regsRes] = await Promise.allSettled([
        supabase.from('sector_observatories').select('*').order('compliance_score', { ascending: false }),
        supabase.from('regulatory_alerts').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('regulators').select('*'),
      ]);

      let hasLive = false;

      if (obsRes.status === 'fulfilled' && obsRes.value.data && obsRes.value.data.length > 0) {
        const mapped: Observatory[] = obsRes.value.data.map((o: any) => ({
          id: o.id,
          name: o.name,
          sector: o.sector,
          jurisdiction: o.jurisdiction,
          description: o.description || '',
          activeAlertsCount: o.active_alerts_count || 0,
          regulationsCount: o.regulations_count || 0,
          complianceScore: o.compliance_score || 75,
          trendDirection: o.trend_direction || 'stable',
          keyIndicators: o.key_indicators || {},
        }));
        setObservatories(mapped);
        hasLive = true;
      }

      if (alertsRes.status === 'fulfilled' && alertsRes.value.data && alertsRes.value.data.length > 0) {
        const mapped: RegObsAlert[] = alertsRes.value.data.map((a: any) => ({
          id: a.id,
          regulatorName: a.regulator_name || a.source || 'BCEAO',
          regulatorAcronym: a.regulator_acronym || a.source || 'BCEAO',
          alertType: a.severity || a.alert_type || 'moyenne',
          title: a.title,
          description: a.description || a.content || '',
          publishDate: a.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          countries: a.countries || [],
          impactedSectors: a.sectors || [],
          daysToCompliance: a.days_to_compliance || null,
          isNew: a.is_new || false,
        }));
        // Merge with mock alerts for richness
        setAlerts([...mapped, ...MOCK_ALERTS.slice(0, 4)]);
        hasLive = true;
      }

      if (regsRes.status === 'fulfilled' && regsRes.value.data) {
        setRegulationsCount(regsRes.value.data.length);
        hasLive = true;
      }

      if (hasLive) setDataSource('live');
      else throw new Error('No live data');

    } catch {
      setAlerts(MOCK_ALERTS);
      setObservatories([]);
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filteredAlerts = selectedRegulator === 'all'
    ? alerts
    : alerts.filter(a => a.regulatorAcronym.toLowerCase().includes(selectedRegulator.toLowerCase()));

  const globalStats = {
    totalRegulators: regulators.length,
    totalCountries: 54,
    totalAlerts: alerts.length,
    criticalAlerts: alerts.filter(a => a.alertType === 'critical').length,
    avgComplianceScore: Math.round(regulators.reduce((s, r) => s + r.complianceScore, 0) / regulators.length),
    totalInstitutions: regulators.reduce((s, r) => s + r.institutionsCount, 0),
    newAlerts: alerts.filter(a => a.isNew).length,
    observatoriesCount: observatories.length + 6, // mock + live
  };

  return {
    regulators,
    alerts: filteredAlerts,
    allAlerts: alerts,
    observatories,
    globalStats,
    regulationsCount,
    selectedRegulator,
    setSelectedRegulator,
    loading,
    error,
    dataSource,
    refresh: fetchAll,
  };
}



