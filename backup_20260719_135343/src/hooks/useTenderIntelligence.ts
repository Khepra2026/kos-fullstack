import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { tenders as mockTenders } from '@/mocks/tenderIntelligence';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

export interface TenderItem {
  id: string;
  tender_title: string;
  source_organization: string;
  tender_type: string;
  country: string;
  region: string;
  publication_date: string;
  submission_deadline: string;
  estimated_budget_fcfa: number;
  currency: string;
  relevance_score: number;
  qualification_status: string;
  match_category: string;
  match_details: Record<string, number>;
  required_documents: string[];
  competitive_analysis: string;
  description: string;
  documents_downloaded: string[];
  alert_sent: boolean;
  alert_channels: string[];
  deadline_urgency: string;
  response_components: string[];
  metadata: Record<string, unknown> | null;
}

interface TenderAlertRow {
  id: string;
  created_at: string;
  title: string;
  description: string;
  source_name: string;
  region: string;
  source_url: string;
  published_at: string | null;
  deadline: string | null;
  relevance_score: number;
  relevance_class: 'high' | 'medium' | 'low';
  expertise_tags: string[];
  status: string;
  notified: boolean;
  notified_at: string | null;
  tender_type: string | null;
  match_category: string | null;
  country: string | null;
  estimated_budget_fcfa: number | null;
}

function computeDaysRemaining(deadline: string): number {
  const now = new Date();
  const dl = new Date(deadline);
  return Math.max(0, Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

function mapQualificationStatus(relevanceClass: string, score: number): string {
  if (relevanceClass === 'high') {
    if (score >= 5) return 'CRITICAL';
    return 'HIGH';
  }
  if (relevanceClass === 'medium') return 'TO_EVALUATE';
  return 'LOW';
}

function deriveMatchCategory(title: string, tags: string[]): string {
  const t = title.toLowerCase();
  const tagStr = tags.join(' ').toLowerCase();
  if (tagStr.includes('lbC') || tagStr.includes('ft') || t.includes('conformité')) return 'Conformité & LBC/FT';
  if (tagStr.includes('prix de transfert') || tagStr.includes('beps')) return 'Prix de Transfert & Fiscalité';
  if (tagStr.includes('cyber') || t.includes('sécurité')) return 'Cybersécurité & SI';
  if (tagStr.includes('esg') || t.includes('durabil')) return 'ESG & Due Diligence';
  if (tagStr.includes('gouvernance')) return 'Gouvernance & Conseil';
  if (tagStr.includes('formation') || t.includes('renforcement')) return 'Formation & Renforcement Institutionnel';
  if (t.includes('digital') || t.includes('transformation')) return 'Transformation Digitale';
  if (tagStr.includes('erm') || tagStr.includes('risque')) return 'Enterprise Risk Management';
  if (t.includes('étude') || t.includes('recherche')) return 'Études & Recherche';
  if (tagStr.includes('audit') || t.includes('inspection')) return 'Audit & Contrôle Interne';
  if (tagStr.includes('microfinance') || tagStr.includes('sfd')) return 'MicroFinance & SFD';
  if (tagStr.includes('fintech')) return 'FinTech & Innovation';
  return 'Conseil & Expertise';
}

function deriveMatchDetails(title: string, tags: string[]): Record<string, number> {
  const t = title.toLowerCase();
  const tagStr = tags.join(' ').toLowerCase();
  const details: Record<string, number> = { audit: 75, conformite: 75, gouvernance: 75 };
  if (tagStr.includes('lbC') || tagStr.includes('ft')) { details.lbc_ft = 95; details.conformite = 92; }
  if (tagStr.includes('prix de transfert')) { details.prix_transfert = 95; details.fiscalite = 90; }
  if (tagStr.includes('audit')) { details.audit = 92; }
  if (tagStr.includes('gouvernance')) { details.gouvernance = 90; }
  if (tagStr.includes('esg')) { details.esg = 88; }
  if (tagStr.includes('cyber')) { details.cybersecurite = 88; }
  if (tagStr.includes('formation')) { details.formation = 85; }
  if (tagStr.includes('erm')) { details.erm = 88; details.risque = 86; }
  if (tagStr.includes('microfinance')) { details.microfinance = 90; }
  if (tagStr.includes('bceao')) { details.bceao = 95; }
  if (tagStr.includes('cobac')) { details.cobac = 93; }
  if (tagStr.includes('fintech')) { details.fintech = 85; }
  return details;
}

function computeResponseComponents(title: string, tags: string[]): string[] {
  const base = ['Offre technique', 'Offre financière', 'Planning', 'CV experts'];
  const t = title.toLowerCase();
  const tagStr = tags.join(' ').toLowerCase();
  if (tagStr.includes('lbC') || tagStr.includes('ft')) return ['Note de compréhension', 'Méthodologie LBC/FT', 'Planning de mise en conformité', 'Matrice GAP Analysis'];
  if (tagStr.includes('prix de transfert')) return ['Note méthodologique BEPS', 'Proposition commerciale', 'CV experts BEPS'];
  if (tagStr.includes('audit')) return ['Offre technique', 'Méthodologie d\'audit', 'Planning', 'Équipe', 'Matrice des risques'];
  if (tagStr.includes('formation')) return ['Programme de formation', 'Offre pédagogique', 'CV formateurs'];
  return base;
}

function normalizeTenderAlert(row: TenderAlertRow): TenderItem {
  const title = row.title || 'Sans titre';
  const description = row.description || '';
  const sourceOrg = row.source_name || 'Source inconnue';
  const country = row.country || row.region || 'Afrique';
  const region = row.region || 'Afrique';
  const score100 = Math.min(100, Math.round((row.relevance_score || 0) * 10));
  const deadline = row.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const daysRemaining = computeDaysRemaining(deadline);
  const tags = row.expertise_tags || [];
  const pubDate = row.published_at || row.created_at?.split('T')[0] || new Date().toISOString().split('T')[0];

  return {
    id: row.id,
    tender_title: title,
    source_organization: sourceOrg,
    tender_type: row.tender_type || 'Appel d\'Offres',
    country,
    region,
    publication_date: pubDate,
    submission_deadline: deadline,
    estimated_budget_fcfa: row.estimated_budget_fcfa || 0,
    currency: 'FCFA',
    relevance_score: score100,
    qualification_status: mapQualificationStatus(row.relevance_class, row.relevance_score || 0),
    match_category: row.match_category || deriveMatchCategory(title, tags),
    match_details: deriveMatchDetails(title, tags),
    required_documents: ['Offre technique', 'Offre financière', 'Références'],
    competitive_analysis: `Source: ${sourceOrg}. Score de pertinence: ${row.relevance_class}. Tags: ${tags.slice(0, 5).join(', ')}.`,
    description: description || title,
    documents_downloaded: [],
    alert_sent: row.notified || false,
    alert_channels: row.notified ? ['Email', 'Dashboard'] : [],
    deadline_urgency: `J-${daysRemaining}`,
    response_components: computeResponseComponents(title, tags),
    metadata: { source_url: row.source_url, expertise_tags: tags, notified_at: row.notified_at },
  };
}

export function useTenderIntelligence() {
  const [tenders, setTenders] = useState<TenderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [auditEntry, setAuditEntry] = useState<HookAuditEntry | null>(null);

  const fetchTenders = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const { data, error: err } = await supabase
        .from('tender_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      const durationMs = Math.round(performance.now() - startTime);

      if (err) throw err;

      if (data && data.length > 0) {
        const normalized = (data as TenderAlertRow[]).map(normalizeTenderAlert);
        setTenders(normalized);
        setIsLive(true);
        const entry = createAuditEntry('useTenderIntelligence', 'supabase', data.length, 'tender_alerts', undefined, durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      } else {
        setTenders(mockTenders as TenderItem[]);
        setIsLive(false);
        const entry = createAuditEntry('useTenderIntelligence', 'mock_fallback', mockTenders.length, 'tender_alerts', 'Table vide — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setTenders(mockTenders as TenderItem[]);
      setIsLive(false);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useTenderIntelligence', 'error_fallback', mockTenders.length, 'tender_alerts', message, durationMs);
      logHookAudit(entry);
      setAuditEntry(entry);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenders();
  }, [fetchTenders]);

  return { tenders, loading, error, isLive, refetch: fetchTenders, auditEntry };
}



