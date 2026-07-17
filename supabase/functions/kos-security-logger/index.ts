// ═══════════════════════════════════════════════════════════════
// KOS Security Logger — Centralized Logging & Monitoring
// ISO 27001 A.12.4 | NIST CSF DE.CM-1 | ISO 22301
// Collecte: auth events, security violations, rate limits, errors
// ═══════════════════════════════════════════════════════════════

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const supabaseUrl = Deno.env.get('VITE_PUBLIC_SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

type SecurityEventType =
  | 'auth_login' | 'auth_failed' | 'auth_logout' | 'auth_mfa_challenge'
  | 'rate_limit_exceeded' | 'waf_block' | 'injection_attempt' | 'access_denied'
  | 'suspicious_activity' | 'edge_function_error' | 'database_error'
  | 'health_check_failed' | 'backup_started' | 'backup_completed' | 'backup_failed'
  | 'system_startup' | 'system_shutdown' | 'config_change';

interface SecurityEvent {
  event_type: SecurityEventType;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  source: string;
  ip_address?: string;
  user_agent?: string;
  user_id?: string;
  details: Record<string, unknown>;
  timestamp?: string;
}

const LOGGER_RATE_MAP = new Map<string, { count: number; resetAt: number }>();

function checkLoggerRate(ip: string): boolean {
  const now = Date.now();
  const entry = LOGGER_RATE_MAP.get(ip);
  if (!entry || now > entry.resetAt) {
    LOGGER_RATE_MAP.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (entry.count > 60) return false;
  entry.count++;
  return true;
}

function validateApiKey(req: Request): boolean {
  const authHeader = req.headers.get('Authorization');
  const expectedKey = Deno.env.get('KOS_LOGGER_API_KEY');
  if (!expectedKey) return true;
  if (!authHeader) return false;
  return authHeader === `Bearer ${expectedKey}`;
}

async function logSecurityEvent(event: SecurityEvent): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('security_logs')
      .insert({
        event_type: event.event_type,
        severity: event.severity,
        source: event.source,
        ip_address: event.ip_address || null,
        user_agent: event.user_agent || null,
        user_id: event.user_id || null,
        details: event.details,
        created_at: event.timestamp || new Date().toISOString(),
      })
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('[KOS-Logger] Insert failed:', error.message);
      return { success: false, error: error.message };
    }

    if (event.severity === 'critical' || event.severity === 'high') {
      await supabase
        .from('monitoring_logs')
        .insert({
          level: event.severity,
          source: event.source,
          message: `[${event.event_type}] ${JSON.stringify(event.details).slice(0, 500)}`,
          ip_address: event.ip_address || null,
          metadata: event.details,
          created_at: new Date().toISOString(),
        })
        .maybeSingle();
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error('[KOS-Logger] Unexpected error:', err);
    return { success: false, error: String(err) };
  }
}

async function queryLogs(params: Record<string, string | number | undefined>) {
  try {
    let query = supabase
      .from('security_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (params.event_type) query = query.eq('event_type', params.event_type);
    if (params.severity) query = query.eq('severity', params.severity);
    if (params.source) query = query.eq('source', params.source);
    if (params.from_date) query = query.gte('created_at', String(params.from_date));
    if (params.to_date) query = query.lte('created_at', String(params.to_date));

    const limit = Math.min(Number(params.limit) || 100, 1000);
    const offset = Number(params.offset) || 0;
    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;
    if (error) return { success: false, error: error.message };
    return { success: true, data, total: count };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

async function getStats(): Promise<Record<string, unknown>> {
  try {
    const now = new Date();
    const last24h = new Date(now.getTime() - 86400000).toISOString();
    const last7d = new Date(now.getTime() - 604800000).toISOString();

    const [
      r1, r2, r3, r4, r5, r6,
    ] = await Promise.all([
      supabase.from('security_logs').select('*', { count: 'exact', head: true }).gte('created_at', last24h),
      supabase.from('security_logs').select('*', { count: 'exact', head: true }).gte('created_at', last24h).eq('severity', 'critical'),
      supabase.from('security_logs').select('*', { count: 'exact', head: true }).gte('created_at', last24h).eq('severity', 'high'),
      supabase.from('security_logs').select('*', { count: 'exact', head: true }).gte('created_at', last7d),
      supabase.from('security_logs').select('*', { count: 'exact', head: true }).gte('created_at', last24h).eq('event_type', 'waf_block'),
      supabase.from('security_logs').select('*', { count: 'exact', head: true }).gte('created_at', last24h).eq('event_type', 'rate_limit_exceeded'),
    ]);

    return {
      events_24h: r1.count || 0, critical_24h: r2.count || 0, high_24h: r3.count || 0,
      events_7d: r4.count || 0, waf_blocks_24h: r5.count || 0, rate_limited_24h: r6.count || 0,
    };
  } catch {
    return { error: 'Failed to fetch stats' };
  }
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

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkLoggerRate(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limited' }), {
      status: 429, headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === 'GET' && path === '/stats') {
    if (!validateApiKey(req)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const stats = await getStats();
    return new Response(JSON.stringify(stats), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }

  if (req.method === 'GET' && path === '/logs') {
    if (!validateApiKey(req)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const params = {
      event_type: url.searchParams.get('event_type') || undefined,
      severity: url.searchParams.get('severity') || undefined,
      source: url.searchParams.get('source') || undefined,
      limit: parseInt(url.searchParams.get('limit') || '100'),
      offset: parseInt(url.searchParams.get('offset') || '0'),
      from_date: url.searchParams.get('from_date') || undefined,
      to_date: url.searchParams.get('to_date') || undefined,
    };
    const result = await queryLogs(params);
    return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }

  if (req.method === 'POST' && path === '/log') {
    if (!validateApiKey(req)) {
      await logSecurityEvent({ event_type: 'access_denied', severity: 'medium', source: 'kos-security-logger', ip_address: ip, details: { reason: 'Invalid API key' } });
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    try {
      const event: SecurityEvent = await req.json();
      event.timestamp = event.timestamp || new Date().toISOString();
      event.ip_address = event.ip_address || ip;
      if (!event.event_type || !event.severity || !event.source) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
      const result = await logSecurityEvent(event);
      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
  }

  if (req.method === 'GET' && path === '/health') {
    return new Response(JSON.stringify({
      status: 'healthy', service: 'kos-security-logger', version: '1.0.0',
      timestamp: new Date().toISOString(),
    }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }

  return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
});
