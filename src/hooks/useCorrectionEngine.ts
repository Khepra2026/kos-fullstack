import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  correctionEngineManifest,
  correctionLoopStatus,
  priorityQueue,
  fixHistory,
  beforeAfterMetrics,
  scanResults,
  compressionAudit,
  seoFixQueue,
  jsOptimizationPlan,
  imageCorrectionQueue,
  securityFixPlan,
  accessibilityFixQueue,
  executiveReportCorrection,
  autonomousLoopLog,
} from '@/mocks/kosCorrectionEngine';

interface CorrectionEngineState {
  manifest: typeof correctionEngineManifest;
  loopStatus: typeof correctionLoopStatus | null;
  tickets: typeof priorityQueue;
  fixHistory: typeof fixHistory;
  beforeAfter: typeof beforeAfterMetrics;
  scanResults: typeof scanResults;
  compressionAudit: typeof compressionAudit;
  seoQueue: typeof seoFixQueue;
  jsOptimization: typeof jsOptimizationPlan;
  imageQueue: typeof imageCorrectionQueue;
  securityPlan: typeof securityFixPlan;
  accessibilityQueue: typeof accessibilityFixQueue;
  executiveReport: typeof executiveReportCorrection | null;
  loopLog: typeof autonomousLoopLog;
  dataSource: 'supabase' | 'mock';
  loading: boolean;
  error: string | null;
}

const initialState: CorrectionEngineState = {
  manifest: correctionEngineManifest,
  loopStatus: correctionLoopStatus,
  tickets: priorityQueue,
  fixHistory,
  beforeAfter: beforeAfterMetrics,
  scanResults,
  compressionAudit,
  seoQueue: seoFixQueue,
  jsOptimization: jsOptimizationPlan,
  imageQueue: imageCorrectionQueue,
  securityPlan: securityFixPlan,
  accessibilityQueue: accessibilityFixQueue,
  executiveReport: executiveReportCorrection,
  loopLog: autonomousLoopLog,
  dataSource: 'mock',
  loading: true,
  error: null,
};

export function useCorrectionEngine() {
  const [state, setState] = useState<CorrectionEngineState>(initialState);

  const fetchAll = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const results = await Promise.allSettled([
        supabase.from('kos_correction_manifest').select('*').order('id'),
        supabase.from('kos_correction_loop_status').select('*').limit(1).single(),
        supabase.from('kos_correction_tickets').select('*').order('id'),
        supabase.from('kos_correction_fix_history').select('*').order('timestamp', { ascending: false }),
        supabase.from('kos_correction_before_after').select('*').order('id'),
        supabase.from('kos_correction_scan_results').select('*').order('id'),
        supabase.from('kos_correction_compression_audit').select('*').order('id'),
        supabase.from('kos_correction_seo_queue').select('*').order('id'),
        supabase.from('kos_correction_js_optimization').select('*').order('id'),
        supabase.from('kos_correction_image_queue').select('*').order('id'),
        supabase.from('kos_correction_security_plan').select('*').order('id'),
        supabase.from('kos_correction_accessibility_queue').select('*').order('id'),
        supabase.from('kos_correction_executive_report').select('*').limit(1).single(),
        supabase.from('kos_correction_loop_log').select('*').order('timestamp', { ascending: false }),
      ]);

      const [
        manifestRes, loopStatusRes, ticketsRes, fixHistoryRes, beforeAfterRes,
        scanResultsRes, compressionAuditRes, seoQueueRes, jsOptimizationRes,
        imageQueueRes, securityPlanRes, accessibilityQueueRes, executiveReportRes, loopLogRes,
      ] = results;

      // Supabase JS v2 returns { data, error } — must access .data
      const hasSupabaseData = results.some(r => {
        if (r.status !== 'fulfilled') return false;
        const d = (r.value as Record<string, unknown>)?.data;
        if (!d) return false;
        return Array.isArray(d) ? d.length > 0 : true;
      });

      if (!hasSupabaseData) {
        setState(prev => ({ ...prev, loading: false, dataSource: 'mock' }));
        return;
      }

      // Helper to safely get data from a settled Supabase result
      const getArray = (res: PromiseSettledResult<unknown>): unknown[] | null => {
        if (res.status !== 'fulfilled') return null;
        const data = (res.value as Record<string, unknown>)?.data;
        return Array.isArray(data) && data.length > 0 ? data : null;
      };
      const getSingle = (res: PromiseSettledResult<unknown>): Record<string, unknown> | null => {
        if (res.status !== 'fulfilled') return null;
        const data = (res.value as Record<string, unknown>)?.data;
        return data && typeof data === 'object' && !Array.isArray(data) ? data as Record<string, unknown> : null;
      };

      // Build state from Supabase data with mock fallbacks
      const manifestData = getArray(manifestRes);
      const loopStatusData = getSingle(loopStatusRes);
      const ticketsData = getArray(ticketsRes);
      const fixHistoryData = getArray(fixHistoryRes);
      const beforeAfterData = getArray(beforeAfterRes);
      const scanResultsData = getArray(scanResultsRes);
      const compressionAuditData = getArray(compressionAuditRes);
      const seoQueueData = getArray(seoQueueRes);
      const jsOptimizationData = getArray(jsOptimizationRes);
      const imageQueueData = getArray(imageQueueRes);
      const securityPlanData = getArray(securityPlanRes);
      const accessibilityQueueData = getArray(accessibilityQueueRes);
      const executiveReportData = getSingle(executiveReportRes);
      const loopLogData = getArray(loopLogRes);

      setState({
        manifest: manifestData
          ? manifestData.map((r: Record<string, unknown>) => ({
              id: r.module_id as string,
              name: r.name as string,
              icon: r.icon as string,
              description: r.description as string,
              colorToken: (r.color_token as string) || 'primary',
              fixesTotal: r.fixes_total as number,
              fixesToday: r.fixes_today as number,
              healthScore: r.health_score as number,
            }))
          : correctionEngineManifest,
        loopStatus: loopStatusData
          ? {
              currentPhase: loopStatusData.current_phase as string,
              phaseIndex: loopStatusData.phase_index as number,
              lastFullScan: loopStatusData.last_full_scan as string,
              lastFixApplied: loopStatusData.last_fix_applied as string,
              lastVerification: loopStatusData.last_verification as string,
              totalIssuesDetected: loopStatusData.total_issues_detected as number,
              totalIssuesFixed: loopStatusData.total_issues_fixed as number,
              totalIssuesPending: loopStatusData.total_issues_pending as number,
              autoFixEnabled: loopStatusData.auto_fix_enabled as boolean,
              loopIntervalMinutes: loopStatusData.loop_interval_minutes as number,
              uptimePercent: Number(loopStatusData.uptime_percent),
              nextScheduledScan: loopStatusData.next_scheduled_scan as string,
            }
          : correctionLoopStatus,
        tickets: ticketsData
          ? ticketsData.map((r: Record<string, unknown>) => ({
              id: r.ticket_id as string,
              priority: r.priority as string,
              module: r.module_id as string,
              title: r.title as string,
              rootCause: r.root_cause as string,
              impact: r.impact as string,
              seoImpact: r.seo_impact as string,
              businessImpact: r.business_impact as string,
              status: r.status as string,
              eta: r.eta as string,
              correction: r.correction as string,
              validationMethod: r.validation_method as string,
              estimatedGain: r.estimated_gain as string,
            }))
          : priorityQueue,
        fixHistory: fixHistoryData
          ? fixHistoryData.map((r: Record<string, unknown>) => ({
              id: r.history_id as string,
              timestamp: r.timestamp as string,
              module: r.module_id as string,
              title: r.title as string,
              status: r.status as string,
              before: r.before_state as string,
              after: r.after_state as string,
              gain: r.gain as string,
            }))
          : fixHistory,
        beforeAfter: beforeAfterData
          ? Object.fromEntries(beforeAfterData.map((r: Record<string, unknown>) => [
              r.metric_key as string,
              { before: r.before_value, after: r.after_value, delta: r.delta },
            ]))
          : beforeAfterMetrics,
        scanResults: scanResultsData
          ? scanResultsData.map((r: Record<string, unknown>) => ({
              page: r.page as string,
              lcp: Number(r.lcp),
              fcp: Number(r.fcp),
              cls: Number(r.cls),
              tbt: Number(r.tbt),
              weightKB: r.weight_kb as number,
              status: r.status as string,
              issuesFound: r.issues_found as number,
            }))
          : scanResults,
        compressionAudit: compressionAuditData
          ? compressionAuditData.map((r: Record<string, unknown>) => ({
              assetType: r.asset_type as string,
              currentCompression: r.current_compression as string,
              ratio: r.ratio as string,
              status: r.status as string,
              sizeBeforeKB: r.size_before_kb as number,
              sizeAfterKB: r.size_after_kb as number,
            }))
          : compressionAudit,
        seoQueue: seoQueueData
          ? seoQueueData.map((r: Record<string, unknown>) => ({
              page: r.page as string,
              issue: r.issue as string,
              current: r.current_value as string,
              suggested: r.suggested_value as string,
              severity: r.severity as string,
            }))
          : seoFixQueue,
        jsOptimization: jsOptimizationData
          ? jsOptimizationData.map((r: Record<string, unknown>) => ({
              bundle: r.bundle as string,
              currentKB: r.current_kb as number,
              targetKB: r.target_kb as number,
              action: r.action as string,
              strategy: r.strategy as string,
              priority: r.priority as string,
              progress: r.progress as number,
            }))
          : jsOptimizationPlan,
        imageQueue: imageQueueData
          ? imageQueueData.map((r: Record<string, unknown>) => ({
              path: r.file_path as string,
              currentKB: r.current_kb as number,
              format: r.format as string,
              targetKB: r.target_kb as number,
              targetFormat: r.target_format as string,
              action: r.action as string,
              priority: r.priority as string,
              status: r.status as string,
            }))
          : imageCorrectionQueue,
        securityPlan: securityPlanData
          ? securityPlanData.map((r: Record<string, unknown>) => ({
              header: r.header_name as string,
              currentStatus: r.current_status as string,
              targetStatus: r.target_status as string,
              action: r.action as string,
              complexity: r.complexity as string,
              priority: r.priority as string,
              eta: r.eta as string,
            }))
          : securityFixPlan,
        accessibilityQueue: accessibilityQueueData
          ? accessibilityQueueData.map((r: Record<string, unknown>) => ({
              element: r.element as string,
              issue: r.issue as string,
              fix: r.fix_suggestion as string,
              wcagCriteria: r.wcag_criteria as string,
              severity: r.severity as string,
              status: r.status as string,
            }))
          : accessibilityFixQueue,
        executiveReport: executiveReportData
          ? {
              period: executiveReportData.period as string,
              totalFixesApplied: executiveReportData.total_fixes_applied as number,
              totalFixesVerified: executiveReportData.total_fixes_verified as number,
              fixesInProgress: executiveReportData.fixes_in_progress as number,
              fixesPending: executiveReportData.fixes_pending as number,
              avgTimeToFix: executiveReportData.avg_time_to_fix as string,
              avgTimeToVerify: executiveReportData.avg_time_to_verify as string,
              successRate: executiveReportData.success_rate as string,
              rollbackRate: executiveReportData.rollback_rate as string,
              metricsImpact: (executiveReportData.metrics_impact as Array<Record<string, unknown>>) || [],
              topGains: (executiveReportData.top_gains as Array<Record<string, unknown>>) || [],
              roiEstimate: executiveReportData.roi_estimate as string,
            }
          : executiveReportCorrection,
        loopLog: loopLogData
          ? loopLogData.map((r: Record<string, unknown>) => ({
              timestamp: r.timestamp as string,
              phase: r.phase as string,
              status: r.status as string,
              details: r.details as string,
              duration: r.duration as string,
            }))
          : autonomousLoopLog,
        dataSource: 'supabase',
        loading: false,
        error: null,
      });
    } catch {
      setState(prev => ({ ...prev, loading: false, dataSource: 'mock' }));
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const refresh = useCallback(() => {
    fetchAll();
  }, [fetchAll]);

  return { ...state, refresh };
}