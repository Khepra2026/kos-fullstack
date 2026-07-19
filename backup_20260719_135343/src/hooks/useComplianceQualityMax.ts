import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  computeComplianceQualityMaxKPIs,
  computeCategoryOverviews,
} from '@/mocks/complianceQualityMax';
import { KOS_REGULATORY_COMPLIANCE_AUTOMATES as mockRegAutomates } from '@/mocks/regulatoryComplianceAutomates';
import { KOS_ORGANISATION_QUALITE_AUTOMATES as mockQualAutomates } from '@/mocks/organisationQualiteAutomates';
import type { ComplianceQualityUnifiedAutomate, ComplianceQualityCategoryOverview, ComplianceQualityMaxKPIs } from '@/mocks/complianceQualityMax';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

export type { ComplianceQualityUnifiedAutomate, ComplianceQualityCategoryOverview, ComplianceQualityMaxKPIs };

interface AuditMeta {
  regulatory: HookAuditEntry | null;
  quality: HookAuditEntry | null;
}

function mapRegulatoryAutomate(row: Record<string, unknown>): ComplianceQualityUnifiedAutomate {
  return {
    id: String(row.id || ''),
    name: String(row.name || ''),
    system: 'regulatory',
    category: String(row.category || ''),
    category_name: '',
    tech_stack: Array.isArray(row.tech_stack) ? row.tech_stack as string[] : [],
    status: (row.status as ComplianceQualityUnifiedAutomate['status']) || 'mock',
    version: String(row.version || ''),
    description: String(row.description || ''),
    capabilities: Array.isArray(row.capabilities) ? row.capabilities as string[] : [],
    success_rate: Number(row.success_rate) || 0,
    tasks_completed: Number(row.tasks_completed) || 0,
    auto_enabled: Boolean(row.auto_enabled),
    icon: String(row.icon || ''),
    color: String(row.color || ''),
    last_execution: String(row.last_execution || ''),
    priority: (row.priority as ComplianceQualityUnifiedAutomate['priority']) || 'medium',
    kpis: Array.isArray(row.kpis) ? row.kpis as ComplianceQualityUnifiedAutomate['kpis'] : [],
  };
}

function mapQualityAutomate(row: Record<string, unknown>): ComplianceQualityUnifiedAutomate {
  return {
    id: String(row.id || ''),
    name: String(row.name || ''),
    system: 'quality',
    category: String(row.category || ''),
    category_name: '',
    tech_stack: typeof row.tech_stack === 'string'
      ? (row.tech_stack ? row.tech_stack.split(',').map((s: string) => s.trim()) : [])
      : Array.isArray(row.tech_stack) ? row.tech_stack as string[] : [],
    status: (row.status as ComplianceQualityUnifiedAutomate['status']) || 'mock',
    version: String(row.version || ''),
    description: String(row.description || ''),
    capabilities: typeof row.capabilities === 'string'
      ? (row.capabilities ? row.capabilities.split(',').map((s: string) => s.trim()) : [])
      : Array.isArray(row.capabilities) ? row.capabilities as string[] : [],
    success_rate: Number(row.success_rate) || 0,
    tasks_completed: Number(row.tasks_completed) || 0,
    auto_enabled: Boolean(row.auto_enabled),
    icon: String(row.icon || ''),
    color: String(row.color || ''),
    last_execution: String(row.last_execution || ''),
    priority: (row.priority as ComplianceQualityUnifiedAutomate['priority']) || 'medium',
    kpis: typeof row.kpis === 'string'
      ? (row.kpis ? JSON.parse(row.kpis) : [])
      : Array.isArray(row.kpis) ? row.kpis as ComplianceQualityUnifiedAutomate['kpis'] : [],
    audits_completed: Number(row.audits_completed) || 0,
    non_conformities_detected: Number(row.non_conformities_detected) || 0,
    quality_score: Number(row.quality_score) || 0,
    certifications_maintained: Number(row.certifications_maintained) || 0,
    processes_managed: Number(row.processes_managed) || 0,
  };
}

function buildFallbackAutomates(): ComplianceQualityUnifiedAutomate[] {
  const reg = mockRegAutomates.map(a => ({
    ...a,
    system: 'regulatory' as const,
    category_name: '',
  }));
  const qual = mockQualAutomates.map(a => ({
    ...a,
    system: 'quality' as const,
    category_name: '',
  }));
  return [...reg, ...qual];
}

export function useComplianceQualityMax() {
  const [automates, setAutomates] = useState<ComplianceQualityUnifiedAutomate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [auditTrail, setAuditTrail] = useState<AuditMeta>({ regulatory: null, quality: null });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const [regRes, qualRes] = await Promise.all([
        supabase.from('kos_regulatory_compliance_automates').select('*').order('success_rate', { ascending: false }),
        supabase.from('kos_organisation_qualite_automates').select('*').order('success_rate', { ascending: false }),
      ]);

      const durationMs = Math.round(performance.now() - startTime);

      if (regRes.error) throw regRes.error;
      if (qualRes.error) throw qualRes.error;

      const regRows = (regRes.data as Record<string, unknown>[]) || [];
      const qualRows = (qualRes.data as Record<string, unknown>[]) || [];

      const regMapped = regRows.map(mapRegulatoryAutomate);
      const qualMapped = qualRows.map(mapQualityAutomate);

      const all = [...regMapped, ...qualMapped];
      const hasReg = regMapped.length > 0;
      const hasQual = qualMapped.length > 0;

      setAutomates(all);
      setIsLive(hasReg && hasQual);

      const regEntry = createAuditEntry('useComplianceQualityMax', hasReg ? 'supabase' : 'mock_fallback', regRows.length, 'kos_regulatory_compliance_automates', undefined, durationMs);
      const qualEntry = createAuditEntry('useComplianceQualityMax', hasQual ? 'supabase' : 'mock_fallback', qualRows.length, 'kos_organisation_qualite_automates', undefined, durationMs);
      logHookAudit(regEntry);
      logHookAudit(qualEntry);
      setAuditTrail({ regulatory: regEntry, quality: qualEntry });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setAutomates(buildFallbackAutomates());
      setIsLive(false);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useComplianceQualityMax', 'error_fallback', 0, 'kos_regulatory_compliance_automates + kos_organisation_qualite_automates', message, durationMs);
      logHookAudit(entry);
      setAuditTrail({ regulatory: entry, quality: null });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const kpis = useMemo(() => computeComplianceQualityMaxKPIs(automates), [automates]);
  const categoryOverviews = useMemo(() => computeCategoryOverviews(automates), [automates]);

  const regAutomates = useMemo(() => automates.filter(a => a.system === 'regulatory'), [automates]);
  const qualAutomates = useMemo(() => automates.filter(a => a.system === 'quality'), [automates]);

  const deployedAutomates = useMemo(() => automates.filter(a => a.status === 'deployed'), [automates]);
  const partialAutomates = useMemo(() => automates.filter(a => a.status === 'partial'), [automates]);
  const criticalAutomates = useMemo(() => automates.filter(a => a.priority === 'critical'), [automates]);

  return {
    automates,
    regAutomates,
    qualAutomates,
    categoryOverviews,
    kpis,
    isLive,
    loading,
    error,
    refetch: fetchData,
    deployedAutomates,
    partialAutomates,
    criticalAutomates,
    auditTrail,
  };
}



