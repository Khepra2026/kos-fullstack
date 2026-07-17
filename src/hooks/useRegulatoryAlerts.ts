import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { regulatoryAlerts as mockAlerts, type RegulatoryAlert } from '@/mocks/regulatoryAlerts';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

interface RegulatoryAlertRow {
  id: number;
  title: string;
  authority: string;
  regulation_ref: string;
  alert_type: string;
  severity: string;
  effective_date: string;
  compliance_deadline: string;
  impact_assessment: string;
  affected_business_units: string[];
  required_actions: string[];
  compliance_status: string;
  summary: string;
  created_at: string;
  updated_at: string;
}

function mapSeverityToNiveau(severity: string): RegulatoryAlert['niveau'] {
  switch (severity) {
    case 'Critique': return 'ROUGE';
    case 'Élevée': return 'ORANGE';
    case 'Modérée': return 'JAUNE';
    default: return 'VERT';
  }
}

function mapAuthorityToZone(authority: string): RegulatoryAlert['zone'] {
  const uemoa = ['BCEAO', 'UEMOA', 'GIABA', 'CIMA', 'AMF-UEMOA'];
  const cemac = ['COBAC', 'CEMAC', 'BEAC', 'GABAC'];
  const ohada = ['OHADA'];
  if (uemoa.includes(authority)) return 'UEMOA';
  if (cemac.includes(authority)) return 'CEMAC';
  if (ohada.includes(authority)) return 'OHADA';
  return 'International';
}

function mapAuthorityToDomaine(authority: string, title: string): RegulatoryAlert['domaine'] {
  const t = title.toLowerCase();
  if (t.includes('lbC') || t.includes('blanchiment')) return 'LBC/FT';
  if (t.includes('gouvernance') || t.includes('conseil')) return 'Gouvernance';
  if (t.includes('fiscal') || t.includes('prix de transfert')) return 'Fiscalité';
  if (t.includes('assurance') || authority === 'CIMA') return 'Assurance';
  if (t.includes('marché') || t.includes('bourse')) return 'Marchés Financiers';
  if (t.includes('donnée') || t.includes('rgpd')) return 'Protection des Données';
  if (t.includes('microfinance') || t.includes('sfd')) return 'Microfinance';
  if (t.includes('banque') || t.includes('crédit')) return 'Bancaire';
  return 'Bancaire';
}

function normalizeAlert(row: RegulatoryAlertRow): RegulatoryAlert {
  return {
    id: String(row.id),
    titre: row.title,
    autorite: row.authority as RegulatoryAlert['autorite'],
    zone: mapAuthorityToZone(row.authority),
    domaine: mapAuthorityToDomaine(row.authority, row.title),
    niveau: mapSeverityToNiveau(row.severity),
    date: row.effective_date || row.created_at.split('T')[0],
    description: row.summary,
    articles_cles: row.required_actions || [],
    impact: row.impact_assessment,
    action_recommandee: row.required_actions?.join('. ') || '',
    statut: row.compliance_status === 'En veille' ? 'En vigueur' : 'En vigueur',
    source_url: '',
  };
}

export function useRegulatoryAlerts() {
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [auditEntry, setAuditEntry] = useState<HookAuditEntry | null>(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const { data, error: err } = await supabase
        .from('regulatory_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      const durationMs = Math.round(performance.now() - startTime);

      if (err) throw err;

      if (data && data.length > 0) {
        const normalized = (data as RegulatoryAlertRow[]).map(normalizeAlert);
        setAlerts(normalized);
        setIsLive(true);
        const entry = createAuditEntry('useRegulatoryAlerts', 'supabase', data.length, 'regulatory_alerts', undefined, durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      } else {
        setAlerts(mockAlerts);
        setIsLive(false);
        const entry = createAuditEntry('useRegulatoryAlerts', 'mock_fallback', mockAlerts.length, 'regulatory_alerts', 'Table vide — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setAlerts(mockAlerts);
      setIsLive(false);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useRegulatoryAlerts', 'error_fallback', mockAlerts.length, 'regulatory_alerts', message, durationMs);
      logHookAudit(entry);
      setAuditEntry(entry);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return { alerts, loading, error, isLive, refetch: fetchAlerts, auditEntry };
}