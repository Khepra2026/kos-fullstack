import { useState, useCallback, useMemo } from 'react';
import {
  contentVerificationRecords,
  agentGovernanceRecords,
  websiteAuditRecords,
  socialMediaChecks,
  knowledgeSources,
  complianceFrameworkAssessments,
  governanceAlerts,
  governanceKPIs,
  executiveSummary,
  priorityTargets,
  regleSupreme,
  type ContentVerificationRecord,
  type GovernanceAlert,
} from '@/mocks/kosTotalGovernanceRegulatoryExcellence';

export function useKOSTotalGovernanceRegulatoryExcellence() {
  const [loading, setLoading] = useState(false);
  const [dataSource] = useState<'mock'>('mock');
  const [alertFilter, setAlertFilter] = useState<'all' | 'critique' | 'haute' | 'moyenne' | 'basse'>('all');
  const [alertStatusFilter, setAlertStatusFilter] = useState<'all' | 'active' | 'en_cours' | 'resolue'>('all');
  const [contentStatusFilter, setContentStatusFilter] = useState<'all' | 'VALIDÉE' | 'À_CONFIRMER' | 'NON_VÉRIFIÉE'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = useMemo(() => {
    let items = governanceAlerts;
    if (alertFilter !== 'all') items = items.filter(a => a.severity === alertFilter);
    if (alertStatusFilter !== 'all') items = items.filter(a => a.status === alertStatusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
    }
    return items;
  }, [alertFilter, alertStatusFilter, searchQuery]);

  const filteredContent = useMemo(() => {
    let items = contentVerificationRecords;
    if (contentStatusFilter !== 'all') items = items.filter(c => c.verification_status === contentStatusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(c => c.title.toLowerCase().includes(q) || c.author.toLowerCase().includes(q));
    }
    return items;
  }, [contentStatusFilter, searchQuery]);

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  }, []);

  const markAlertResolved = useCallback((alertId: string) => {
    const alert = governanceAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'resolue';
    }
  }, []);

  const criticalAlertsCount = governanceAlerts.filter(a => a.severity === 'critique' && a.status === 'active').length;
  const activeAlertsCount = governanceAlerts.filter(a => a.status === 'active').length;
  const totalBlockedContent = contentVerificationRecords.filter(c => c.auto_blocked).length;
  const frameworksConformesCount = complianceFrameworkAssessments.filter(f => f.status === 'conforme').length;

  return {
    contentVerificationRecords,
    agentGovernanceRecords,
    websiteAuditRecords,
    socialMediaChecks,
    knowledgeSources,
    complianceFrameworkAssessments,
    governanceAlerts,
    governanceKPIs,
    executiveSummary,
    priorityTargets,
    regleSupreme,
    filteredAlerts,
    filteredContent,
    alertFilter,
    setAlertFilter,
    alertStatusFilter,
    setAlertStatusFilter,
    contentStatusFilter,
    setContentStatusFilter,
    searchQuery,
    setSearchQuery,
    criticalAlertsCount,
    activeAlertsCount,
    totalBlockedContent,
    frameworksConformesCount,
    loading,
    dataSource,
    refresh,
    markAlertResolved,
  };
}