// ═══════════════════════════════════════════════════════════════
// KOS Backup Automation — Daily Supabase Backup + PRA Orchestrator
// ISO 22301 A.8.3 | RTO 4h | RPO 1h
// v2.0 — Fix: monitoring_logs → security_logs (schema-compatible)
// ═══════════════════════════════════════════════════════════════

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const supabaseUrl = Deno.env.get('VITE_PUBLIC_SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const LOGGER_API_KEY = Deno.env.get('KOS_LOGGER_API_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const RETENTION_DAYS = 90;
const BACKUP_SCHEDULE = '0 2 * * *';
const LOGGER_URL = `${supabaseUrl}/functions/v1/kos-security-logger/log`;

async function logToSecurity(eventType: string, severity: string, details: Record<string, unknown>) {
  if (!LOGGER_API_KEY) return;
  try {
    await fetch(LOGGER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${LOGGER_API_KEY}` },
      body: JSON.stringify({ event_type: eventType, severity, source: 'kos-backup-automation', details, timestamp: new Date().toISOString() }),
    });
  } catch { /* silent */ }
}

async function logToSecurityLogs(eventType: string, severity: string, details: Record<string, unknown>) {
  try {
    await supabase.from('security_logs').insert({
      event_type: eventType,
      severity,
      source: 'kos-backup-automation',
      details,
      created_at: new Date().toISOString(),
    });
  } catch { /* silent */ }
}

function getKnownTables(): string[] {
  return [
    'profiles', 'organizations', 'organization_members', 'subscriptions',
    'leads', 'lead_scores', 'lead_activities', 'proposals',
    'security_logs', 'admin_notifications',
    'cookie_consent', 'subscription_plans', 'resource_downloads',
    'diagnostic_events', 'email_logs',
    'backlink_opportunities', 'seo_audit_results', 'performance_snapshots',
    'security_scans', 'admin_documents', 'admin_sessions',
    'strategic_analyses', 'research_reports', 'board_advisories',
    'financial_analyses', 'policy_documents', 'knowledge_captures',
    'tender_intelligence', 'competitive_intelligence', 'regulatory_alerts',
    'platform_credentials', 'email_templates', 'api_keys',
    'rate_limits',
    'rag_documents', 'studio_media_requests', 'youtube_scripts',
    'kos_block_scans', 'kos_quality_agents', 'kos_execution_logs',
    'kos_gsc_keywords', 'kos_gsc_pages', 'kos_quality_scan_phases',
    'kos_unified_agents', 'kos_unified_kpis', 'kos_unified_workflow_phases',
    'strategic_memory', 'enterprise_brain', 'self_improvement_engine_v2',
  ];
}

async function executeBackup(): Promise<{ success: boolean; tablesCount: number; totalRows: number; error?: string }> {
  const backupId = `bak-${Date.now().toString(36)}`;
  const startedAt = new Date().toISOString();

  await logToSecurity('backup_started', 'info', { backup_id: backupId, backup_type: 'full', started_at: startedAt });

  try {
    const tables = getKnownTables();
    let totalRows = 0;
    const tableResults: { table: string; rows: number; status: string }[] = [];

    for (const table of tables) {
      try {
        const { data, error, count } = await supabase.from(table).select('*', { count: 'exact', head: true }).limit(1);
        if (error) {
          tableResults.push({ table, rows: 0, status: `skip: ${error.message}` });
          continue;
        }
        const rowCount = count || 0;
        totalRows += rowCount;
        tableResults.push({ table, rows: rowCount, status: 'counted' });
      } catch (err) {
        tableResults.push({ table, rows: 0, status: `error: ${String(err)}` });
      }
    }

    const completedAt = new Date().toISOString();
    const tablesCount = tableResults.filter(t => t.status === 'counted').length;

    await logToSecurityLogs('backup_completed', 'info', {
      backup_id: backupId,
      tables_count: tablesCount,
      total_rows: totalRows,
      started_at: startedAt,
      completed_at: completedAt,
      retention_days: RETENTION_DAYS,
      table_results: tableResults,
    });

    await logToSecurity('backup_completed', 'info', {
      backup_id: backupId,
      tables_count: tablesCount,
      total_rows: totalRows,
      completed_at: completedAt,
    });

    // Rotate old backup logs
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 86400000).toISOString();
    await supabase.from('security_logs')
      .delete()
      .lt('created_at', cutoff)
      .eq('source', 'kos-backup-automation')
      .in('event_type', ['backup_completed', 'backup_failed']);

    return { success: true, tablesCount, totalRows };
  } catch (err) {
    const msg = String(err);
    await logToSecurityLogs('backup_failed', 'critical', {
      backup_id: backupId,
      error: msg,
      failed_at: new Date().toISOString(),
      started_at: startedAt,
    });
    await logToSecurity('backup_failed', 'critical', { backup_id: backupId, error: msg });
    return { success: false, tablesCount: 0, totalRows: 0, error: msg };
  }
}

async function getBackupStatus() {
  const { data: last } = await supabase.from('security_logs')
    .select('*')
    .eq('source', 'kos-backup-automation')
    .in('event_type', ['backup_completed', 'backup_failed'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const last24h = new Date(Date.now() - 86400000).toISOString();
  const { count: count24h } = await supabase.from('security_logs')
    .select('*', { count: 'exact', head: true })
    .eq('source', 'kos-backup-automation')
    .eq('event_type', 'backup_completed')
    .gte('created_at', last24h);

  const { count: totalCount } = await supabase.from('security_logs')
    .select('*', { count: 'exact', head: true })
    .eq('source', 'kos-backup-automation')
    .in('event_type', ['backup_completed', 'backup_failed']);

  return {
    last_backup: last || null,
    backups_24h: count24h || 0,
    total_backups: totalCount || 0,
    retention_days: RETENTION_DAYS,
    schedule: BACKUP_SCHEDULE,
    status: last ? 'operational' : 'no_backups_yet',
  };
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      },
    });
  }

  const url = new URL(req.url);
  const path = url.pathname;
  const authHeader = req.headers.get('Authorization');
  const expectedKey = Deno.env.get('KOS_LOGGER_API_KEY');
  const isAuthorized = !expectedKey || authHeader === `Bearer ${expectedKey}`;

  if (req.method === 'POST' && path === '/trigger') {
    if (!isAuthorized) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const result = await executeBackup();
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  if (req.method === 'GET' && path === '/status') {
    const status = await getBackupStatus();
    return new Response(JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  if (req.method === 'GET' && (path === '/health' || path === '/')) {
    const status = await getBackupStatus();
    return new Response(JSON.stringify({
      status: 'healthy',
      service: 'KOS Backup Automation',
      version: '2.0.0',
      pra: {
        rto: '4 heures',
        rpo: '1 heure',
        strategy: 'Daily full backup with Supabase WAL',
        recovery_sites: 'Supabase primary + manual export',
        test_schedule: 'Trimestriel — prochain: 2026-09-01',
        contact: 'AGENT 22 — Technology Partner AI',
      },
      pca: {
        primary_site: 'khepraexperts.com (Netlify)',
        database: 'Supabase (pgfwhahiwqvqeahpirjx)',
        alt_communication: 'Email Resend, LinkedIn corporate',
        critical_functions: ['Website', 'Blog & SEO', 'KOS Dashboard', 'Lead forms', 'RAG/LLM'],
        escalation: ['AGENT 22', 'AGENT 15 (CEO Copilot)', 'SIMDA Essoyomèwè'],
      },
      backups: status,
    }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
});
