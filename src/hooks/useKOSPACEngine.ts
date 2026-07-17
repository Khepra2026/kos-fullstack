import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// ═══════════════════════════════════════════════════════════
// KOS PAC ENGINE v1.0 — Big Four Jira Ticket Generator
// Compliance: ISO 27001:2022, SOC 2 Type 2, ISAE 3000, ISA 265
// Infra: 0 nouvelle table, 0 nouvelle edge function
// ═══════════════════════════════════════════════════════════

export interface PACFinding {
  finding_id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  date_detection: string;
  standard: string;
  impact_financier_fcfa?: number;
  blocage_bceao?: boolean;
  root_cause?: string;
  evidence_link?: string;
  module_source?: string;
  detecteur?: string;
  action_immediate?: string;
  action_lt?: string;
  test_audit?: string;
}

export interface PACJiraSeed {
  fields: {
    project: { key: string };
    issuetype: { name: string };
    summary: string;
    description: Record<string, unknown>;
    priority: { name: string };
    labels: string[];
    duedate: string;
    components: Array<{ name: string }>;
    assignee?: { id: string };
    customfield_10001: string;
    customfield_10002: string;
    customfield_10003: string;
  };
  meta: {
    finding_id: string;
    transformed_by: string;
    transformed_at: string;
    format: string;
    sla_days: number;
    quality_gates: {
      iso_9001: boolean;
      iso_27001_a912: boolean;
      isae_3000_separation: boolean;
      isa_265_tracabilite: boolean;
      bceao_check: boolean;
      soc2_cc61?: boolean;
      ohada_auscgie?: boolean;
      ssae_18?: boolean;
      gsc_indexable?: boolean;
    };
    raci: {
      assignee: string;
      reporter: string;
      validator: string;
    };
  };
  execution_id?: string;
  success?: boolean;
  error?: string;
}

export interface PACEngineState {
  currentFinding: PACFinding | null;
  lastJiraSeed: PACJiraSeed | null;
  isTransforming: boolean;
  history: Array<{ finding: PACFinding; jiraSeed: PACJiraSeed; timestamp: string }>;
  error: string | null;
  viewMode: 'input' | 'result' | 'history';
  projectKey: string;
  assigneeId: string;
  webhookUrl: string;
  lastPostStatus: 'idle' | 'sending' | 'success' | 'error';
  lastPostMessage: string;
}

interface ToastFn {
  (message: string, type?: 'success' | 'error' | 'info' | 'warning'): void;
}

const DEFAULT_WEBHOOK_URL = '';

// ─── Default sample finding for quick demo ───
export const PAC_DEFAULT_FINDING: PACFinding = {
  finding_id: 'FIND-2026-001',
  title: 'Absence de politique CSP sur le site corporate',
  description: 'Le header Content-Security-Policy est absent sur toutes les pages du site khepraexperts.com, exposant le site aux attaques XSS et injection de contenu.',
  severity: 'critical',
  date_detection: new Date().toISOString().split('T')[0],
  standard: 'ISO27001-A.14',
  impact_financier_fcfa: 75000000,
  blocage_bceao: false,
  root_cause: 'Absence de configuration CSP dans le reverse proxy nginx. Le déploiement initial n\'a pas inclus les headers de sécurité.',
  evidence_link: 'https://confluence.khepraexperts.com/display/SEC/CSP-Audit-2026-06',
  module_source: 'Security Scan',
  detecteur: 'KOS Security Scan Edge Function',
  action_immediate: 'Déployer la politique CSP recommandée via le reverse proxy nginx sous 24h. Bloquer tout nouveau déploiement sans CSP.',
  action_lt: 'Intégrer la vérification CSP dans la CI/CD pipeline. Audit trimestriel des headers de sécurité.',
  test_audit: 'Vérifier via curl -I que le header CSP est présent sur toutes les pages. Scanner OWASP ZAP pour confirmer l\'absence de XSS.',
};

// ─── PAC Engine Hook ───
export function useKOSPACEngine(showToast?: ToastFn) {
  const [state, setState] = useState<PACEngineState>({
    currentFinding: null,
    lastJiraSeed: null,
    isTransforming: false,
    history: [],
    error: null,
    viewMode: 'input',
    projectKey: 'KOS',
    assigneeId: '',
    webhookUrl: '',
    lastPostStatus: 'idle',
    lastPostMessage: '',
  });

  // Load webhook URL from localStorage on init
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kos_pac_jira_webhook_url');
      if (saved) {
        setState(prev => ({ ...prev, webhookUrl: saved }));
      }
    } catch { /* noop */ }
  }, []);

  // ═══════════════════════════════════════════════════════════
  // RULE 1: Compute Big Four Priority
  // ═══════════════════════════════════════════════════════════
  const computePriority = useCallback((finding: PACFinding): { priority: string; slaDays: number } => {
    const isCritical = finding.severity === 'critical';
    const isBCEAOBlock = finding.blocage_bceao === true;
    const isHighImpact = (finding.impact_financier_fcfa || 0) > 50000000;

    if (isCritical || isBCEAOBlock || isHighImpact) {
      return { priority: 'Highest', slaDays: 15 };
    }
    if (finding.severity === 'high') {
      return { priority: 'High', slaDays: 30 };
    }
    if (finding.severity === 'medium') {
      return { priority: 'Medium', slaDays: 60 };
    }
    return { priority: 'Low', slaDays: 90 };
  }, []);

  // ═══════════════════════════════════════════════════════════
  // RULE 2: Compute due date from SLA
  // ═══════════════════════════════════════════════════════════
  const computeDueDate = useCallback((dateDetection: string, slaDays: number): string => {
    try {
      const date = new Date(dateDetection);
      date.setDate(date.getDate() + slaDays);
      return date.toISOString().split('T')[0];
    } catch {
      const date = new Date();
      date.setDate(date.getDate() + slaDays);
      return date.toISOString().split('T')[0];
    }
  }, []);

  // ═══════════════════════════════════════════════════════════
  // RULE 3: Map STANDARD to Jira labels
  // ═══════════════════════════════════════════════════════════
  const mapStandardsToLabels = useCallback((standard: string): string[] => {
    const labels: string[] = [];
    const s = standard.toLowerCase();

    if (s.includes('iso27001') || s.includes('27001')) labels.push('ISO27001-A912');
    if (s.includes('soc2') || s.includes('soc 2')) labels.push('SOC2-CC61');
    if (s.includes('bceao') || s.includes('03-2017')) labels.push('BCEAO-ART12');
    if (s.includes('ohada') || s.includes('auscgie')) labels.push('OHADA-AUSCGIE');
    if (s.includes('isae') || s.includes('3000')) labels.push('ISAE-3000');
    if (s.includes('isa') || s.includes('265')) labels.push('ISA-265');
    if (s.includes('ssae') || s.includes('18')) labels.push('SSAE-18');
    if (s.includes('gsc') || s.includes('seo')) labels.push('GSC');

    return labels;
  }, []);

  // ═══════════════════════════════════════════════════════════
  // RULE 4: Generate ADF description (Big Four format, <32KB)
  // ═══════════════════════════════════════════════════════════
  const generateADFDescription = useCallback((finding: PACFinding): Record<string, unknown> => {
    const impactFcfa = (finding.impact_financier_fcfa || 0).toLocaleString('fr-FR');
    const blocageText = finding.blocage_bceao ? 'OUI — BLOCAGE RÉGLEMENTAIRE' : 'NON';

    return {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: `Big Four Audit Finding — ${finding.finding_id}` }],
        },
        {
          type: 'panel',
          attrs: { panelType: 'error' },
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: '🔍 Root Cause Analysis (ISA 265)' }],
            },
          ],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: finding.root_cause || 'Non documenté — investigation requise.' }],
        },
        {
          type: 'panel',
          attrs: { panelType: 'warning' },
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: '💰 Impact Financier & Réglementaire' }],
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `Impact estimé: ${impactFcfa} FCFA. Blocage BCEAO: ${blocageText}. Module: ${finding.module_source || 'N/A'}. Détecteur: ${finding.detecteur || 'KHEPRA DD'}.`,
            },
          ],
        },
        {
          type: 'panel',
          attrs: { panelType: 'success' },
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: '✅ Plan d\'Action Correctif' }],
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 4 },
          content: [{ type: 'text', text: '1. Action Immédiate (< 72h)' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: finding.action_immediate || 'Escalader au COMEX Conformité. Bloquer le processus affecté.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 4 },
          content: [{ type: 'text', text: '2. Action Long Terme' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: finding.action_lt || 'Déployer le correctif permanent. Mettre à jour la documentation.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 4 },
          content: [{ type: 'text', text: '3. Test d\'Audit (ISAE 3000)' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: finding.test_audit || 'Vérifier que le correctif est effectif. Tester le scénario de récurrence.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `📎 Evidence (ISA 265): ${finding.evidence_link || 'Non fournie — doit être documentée pour les findings High/Critical.'}`,
            },
          ],
        },
      ],
    };
  }, []);

  // ═══════════════════════════════════════════════════════════
  // RULE 5: Build quality gates checklist
  // ═══════════════════════════════════════════════════════════
  const buildQualityGates = useCallback((finding: PACFinding, labels: string[]): PACJiraSeed['meta']['quality_gates'] => {
    return {
      iso_9001: true,
      iso_27001_a912: labels.includes('ISO27001-A912'),
      isae_3000_separation: true,
      isa_265_tracabilite: !!(finding.evidence_link),
      bceao_check: finding.blocage_bceao === true,
      soc2_cc61: labels.includes('SOC2-CC61') || undefined,
      ohada_auscgie: labels.includes('OHADA-AUSCGIE') || undefined,
      ssae_18: labels.includes('SSAE-18') || undefined,
      gsc_indexable: labels.includes('GSC') || undefined,
    };
  }, []);

  // ═══════════════════════════════════════════════════════════
  // MASTER: Transform FINDING → JiraSeed (Client-side Engine)
  // ═══════════════════════════════════════════════════════════
  const transformFinding = useCallback((finding: PACFinding, projectKey: string = 'KOS', assigneeId: string = ''): PACJiraSeed => {
    const { priority, slaDays } = computePriority(finding);
    const duedate = computeDueDate(finding.date_detection, slaDays);
    const labels = mapStandardsToLabels(finding.standard);
    const summary = `[${finding.standard}][${finding.severity.toUpperCase()}] ${finding.title}`;
    const description = generateADFDescription(finding);
    const qualityGates = buildQualityGates(finding, labels);

    const jiraSeed: PACJiraSeed = {
      fields: {
        project: { key: projectKey },
        issuetype: { name: 'Task' },
        summary,
        description,
        priority: { name: priority },
        labels,
        duedate,
        components: [{ name: finding.module_source || 'KOS-Audit' }],
        ...(assigneeId ? { assignee: { id: assigneeId } } : {}),
        customfield_10001: finding.standard,
        customfield_10002: finding.severity,
        customfield_10003: finding.root_cause || 'À déterminer',
      },
      meta: {
        finding_id: finding.finding_id,
        transformed_by: 'KOS PAC ENGINE v1.0',
        transformed_at: new Date().toISOString(),
        format: 'KPMG Big Four',
        sla_days: slaDays,
        quality_gates: qualityGates,
        raci: {
          assignee: 'R',
          reporter: 'system',
          validator: 'A',
        },
      },
      success: true,
    };

    return jiraSeed;
  }, [computePriority, computeDueDate, mapStandardsToLabels, generateADFDescription, buildQualityGates]);

  // ═══════════════════════════════════════════════════════════
  // RPC: Transform via SQL function (full audit trail)
  // ═══════════════════════════════════════════════════════════
  const transformFindingRPC = useCallback(async (finding: PACFinding, projectKey: string = 'KOS', assigneeId: string = ''): Promise<PACJiraSeed | null> => {
    setState(prev => ({ ...prev, isTransforming: true, error: null }));
    try {
      const { data, error: rpcErr } = await supabase.rpc('kos_pac_engine_transform', {
        p_finding_json: finding,
        p_jira_project_key: projectKey,
        p_jira_assignee_id: assigneeId || null,
        p_timezone: 'Africa/Lome',
      });

      if (rpcErr) throw new Error(rpcErr.message);

      // Check for validation error
      if (data?.error === 'FINDING_SCHEMA_INVALID') {
        const missingFields = (data.missing_fields || []).join(', ');
        const errMsg = `Schéma FINDING invalide — champs manquants: ${missingFields}`;
        setState(prev => ({ ...prev, isTransforming: false, error: errMsg }));
        if (showToast) showToast(errMsg, 'error');
        return null;
      }

      const jiraSeed = data as PACJiraSeed;

      setState(prev => ({
        ...prev,
        isTransforming: false,
        lastJiraSeed: jiraSeed,
        currentFinding: finding,
        viewMode: 'result',
        history: [{ finding, jiraSeed, timestamp: new Date().toISOString() }, ...prev.history].slice(0, 50),
        error: null,
      }));

      if (showToast) {
        showToast(
          `JiraSeed généré — ${jiraSeed.fields.priority.name} · ${jiraSeed.fields.labels.length} labels · SLA ${jiraSeed.meta.sla_days}j`,
          'success'
        );
      }

      return jiraSeed;
    } catch (err: any) {
      const errMsg = err?.message || 'Échec de la transformation PAC';
      setState(prev => ({ ...prev, isTransforming: false, error: errMsg }));
      if (showToast) showToast(errMsg, 'error');
      return null;
    }
  }, [showToast]);

  // ═══════════════════════════════════════════════════════════
  // Client-side quick transform (no RPC, instant preview)
  // ═══════════════════════════════════════════════════════════
  const previewTransform = useCallback((finding: PACFinding): PACJiraSeed => {
    const result = transformFinding(finding, state.projectKey, state.assigneeId);
    setState(prev => ({
      ...prev,
      currentFinding: finding,
      lastJiraSeed: result,
      viewMode: 'result',
      error: null,
    }));
    return result;
  }, [transformFinding, state.projectKey, state.assigneeId]);

  // ═══════════════════════════════════════════════════════════
  // Validate a FINDING JSON (client-side)
  // ═══════════════════════════════════════════════════════════
  const validateFinding = useCallback((finding: Partial<PACFinding>): { valid: boolean; missingFields: string[] } => {
    const missingFields: string[] = [];
    if (!finding.finding_id) missingFields.push('finding_id');
    if (!finding.title) missingFields.push('title');
    if (!finding.severity) missingFields.push('severity');
    if (!finding.date_detection) missingFields.push('date_detection');
    if (!finding.standard) missingFields.push('standard');

    // Validate severity enum
    if (finding.severity && !['critical', 'high', 'medium', 'low'].includes(finding.severity)) {
      missingFields.push('severity (must be: critical, high, medium, low)');
    }

    return { valid: missingFields.length === 0, missingFields };
  }, []);

  // ═══════════════════════════════════════════════════════════
  // Load finding from JSON text
  // ═══════════════════════════════════════════════════════════
  const loadFindingFromJSON = useCallback((jsonText: string): PACFinding | null => {
    try {
      const parsed = JSON.parse(jsonText);
      const validation = validateFinding(parsed);
      if (!validation.valid) {
        setState(prev => ({
          ...prev,
          error: `Champs manquants: ${validation.missingFields.join(', ')}`,
        }));
        return null;
      }
      return parsed as PACFinding;
    } catch {
      setState(prev => ({ ...prev, error: 'JSON invalide — vérifiez la syntaxe.' }));
      return null;
    }
  }, [validateFinding]);

  // ═══════════════════════════════════════════════════════════
  // History management
  // ═══════════════════════════════════════════════════════════
  const loadHistory = useCallback(async () => {
    try {
      const { data, error: dbErr } = await supabase
        .from('kos_universal_audit_log')
        .select('new_state, created_at')
        .eq('event_type', 'kos_pac_engine')
        .eq('action', 'finding_transformed')
        .order('created_at', { ascending: false })
        .limit(30);

      if (dbErr) throw new Error(dbErr.message);

      const entries = (data || []).map((row: any) => ({
        finding: row.new_state?.finding as PACFinding,
        jiraSeed: row.new_state?.jira_seed as PACJiraSeed,
        timestamp: row.created_at,
      })).filter(e => e.finding && e.jiraSeed);

      setState(prev => ({
        ...prev,
        history: entries,
      }));
    } catch {
      // non-blocking
    }
  }, []);

  const clearHistory = useCallback(() => {
    setState(prev => ({ ...prev, history: [] }));
  }, []);

  const setProjectKey = useCallback((key: string) => {
    setState(prev => ({ ...prev, projectKey: key }));
  }, []);

  const setAssigneeId = useCallback((id: string) => {
    setState(prev => ({ ...prev, assigneeId: id }));
  }, []);

  const setViewMode = useCallback((mode: PACEngineState['viewMode']) => {
    setState(prev => ({ ...prev, viewMode: mode }));
  }, []);

  // ═══════════════════════════════════════════════════════════
  // POST JiraSeed to Jira Automation Webhook
  // ═══════════════════════════════════════════════════════════
  const postToJira = useCallback(async (webhookUrl: string, jiraSeed: PACJiraSeed): Promise<boolean> => {
    if (!webhookUrl) {
      setState(prev => ({ ...prev, lastPostStatus: 'error', lastPostMessage: 'Aucune URL webhook configurée.' }));
      if (showToast) showToast('Configurez d\'abord l\'URL du webhook Jira.', 'warning');
      return false;
    }

    setState(prev => ({ ...prev, lastPostStatus: 'sending', lastPostMessage: '' }));

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jiraSeed),
      });

      if (response.ok || response.status === 200 || response.status === 201 || response.status === 204) {
        setState(prev => ({
          ...prev,
          lastPostStatus: 'success',
          lastPostMessage: `Ticket Jira créé avec succès — ${jiraSeed.fields.summary.substring(0, 60)}...`,
        }));
        if (showToast) showToast('Ticket Jira créé avec succès !', 'success');
        return true;
      }

      const errorText = await response.text().catch(() => 'Erreur inconnue');
      setState(prev => ({
        ...prev,
        lastPostStatus: 'error',
        lastPostMessage: `Jira a retourné une erreur (${response.status}): ${errorText.substring(0, 150)}`,
      }));
      if (showToast) showToast(`Erreur Jira (${response.status})`, 'error');
      return false;
    } catch (err: any) {
      const msg = err?.message || 'Échec de la connexion au webhook Jira.';
      setState(prev => ({ ...prev, lastPostStatus: 'error', lastPostMessage: msg }));
      if (showToast) showToast(msg, 'error');
      return false;
    }
  }, [showToast]);

  // ═══════════════════════════════════════════════════════════
  // Set & persist webhook URL
  // ═══════════════════════════════════════════════════════════
  const persistWebhookUrl = useCallback((url: string) => {
    setState(prev => ({ ...prev, webhookUrl: url }));
    try {
      localStorage.setItem('kos_pac_jira_webhook_url', url);
    } catch { /* noop */ }
  }, []);

  const resetEngine = useCallback(() => {
    setState({
      currentFinding: null,
      lastJiraSeed: null,
      isTransforming: false,
      history: [],
      error: null,
      viewMode: 'input',
      projectKey: 'KOS',
      assigneeId: '',
      webhookUrl: state.webhookUrl,
      lastPostStatus: 'idle',
      lastPostMessage: '',
    });
  }, [state.webhookUrl]);

  return {
    state,
    transformFindingRPC,
    previewTransform,
    validateFinding,
    loadFindingFromJSON,
    loadHistory,
    clearHistory,
    setProjectKey,
    setAssigneeId,
    setViewMode,
    resetEngine,
    transformFinding,
    postToJira,
    persistWebhookUrl,
  };
}