import { useState, useEffect, useMemo } from 'react';
import {
  TOTAL_QUALITY_BLOCK_AUDITS,
  QUALITY_AUTOMATES_AUDIT,
  SYSTEM_OPTIMIZATION_ACTIONS,
  CERTIFICATION_PROGRESS,
  TOTAL_QUALITY_AUDIT_META,
  computeTotalQualityKPIs,
  type TotalQualityBlockAudit,
  type QualityAutomateAudit,
  type SystemOptimizationAction,
  type CertificationProgress,
  type TotalQualityKPIs,
} from '@/mocks/kos120TotalQualityAudit';

interface UseTotalQualityAuditReturn {
  meta: typeof TOTAL_QUALITY_AUDIT_META;
  kpis: TotalQualityKPIs;
  blocks: TotalQualityBlockAudit[];
  automates: QualityAutomateAudit[];
  optimizations: SystemOptimizationAction[];
  certifications: CertificationProgress[];
  loading: boolean;
  error: string | null;
  activeTab: 'overview' | 'blocks' | 'automates' | 'optimization' | 'certification';
  setActiveTab: (tab: 'overview' | 'blocks' | 'automates' | 'optimization' | 'certification') => void;
  filteredOptimizations: SystemOptimizationAction[];
  optimizationFilter: string;
  setOptimizationFilter: (filter: string) => void;
  refresh: () => void;
}

export function useKOS120TotalQualityAudit(): UseTotalQualityAuditReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'blocks' | 'automates' | 'optimization' | 'certification'>('overview');
  const [optimizationFilter, setOptimizationFilter] = useState<string>('all');

  const meta = TOTAL_QUALITY_AUDIT_META;
  const kpis = useMemo(() => computeTotalQualityKPIs(), []);
  const blocks = TOTAL_QUALITY_BLOCK_AUDITS;
  const automates = QUALITY_AUTOMATES_AUDIT;
  const optimizations = SYSTEM_OPTIMIZATION_ACTIONS;
  const certifications = CERTIFICATION_PROGRESS;

  const filteredOptimizations = useMemo(() => {
    if (optimizationFilter === 'all') return optimizations;
    if (optimizationFilter === 'p0') return optimizations.filter(o => o.priority === 'P0');
    if (optimizationFilter === 'in_progress') return optimizations.filter(o => o.status === 'in_progress');
    return optimizations.filter(o => o.category === optimizationFilter);
  }, [optimizations, optimizationFilter]);

  useEffect(() => {
    // Mode MOCK — chargement instantané
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return {
    meta,
    kpis,
    blocks,
    automates,
    optimizations,
    certifications,
    loading,
    error,
    activeTab,
    setActiveTab,
    filteredOptimizations,
    optimizationFilter,
    setOptimizationFilter,
    refresh,
  };
}