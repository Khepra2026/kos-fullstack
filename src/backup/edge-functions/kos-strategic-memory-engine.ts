/**
 * ═══════════════════════════════════════════════════════════════
 * KOS STRATEGIC MEMORY ENGINE™ v1.0 — BACKUP SOURCE
 * Mémoire Stratégique KHEPRA — Persistence & Knowledge State
 * ═══════════════════════════════════════════════════════════════
 * ⚠️ Backup — Déploiement bloqué par limite plan Supabase
 * Tables : kos_memory_regulatory, kos_memory_operational, 
 *          kos_memory_sectoral, kos_memory_methodological
 * ═══════════════════════════════════════════════════════════════
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

interface MemorySnapshot {
  type: 'regulatory' | 'operational' | 'sectoral' | 'methodological';
  key: string;
  value: Record<string, unknown>;
  ttl_hours: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

async function persistMemory(supabase: any, snapshot: MemorySnapshot) {
  const tableMap: Record<string, string> = {
    regulatory: 'kos_memory_regulatory',
    operational: 'kos_memory_operational',
    sectoral: 'kos_memory_sectoral',
    methodological: 'kos_memory_methodological',
  };
  const table = tableMap[snapshot.type] || 'kos_memory_operational';
  const expiresAt = new Date(Date.now() + snapshot.ttl_hours * 3600000).toISOString();

  const { data: existing } = await supabase.from(table).select('id').eq('key', snapshot.key).maybeSingle();

  if (existing) {
    await supabase.from(table).update({
      value: snapshot.value,
      priority: snapshot.priority,
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    }).eq('id', existing.id);
  } else {
    await supabase.from(table).insert({
      key: snapshot.key,
      value: snapshot.value,
      priority: snapshot.priority,
      ttl_hours: snapshot.ttl_hours,
      expires_at: expiresAt,
    });
  }
}

async function retrieveMemory(supabase: any, type: string, key: string) {
  const tableMap: Record<string, string> = {
    regulatory: 'kos_memory_regulatory',
    operational: 'kos_memory_operational',
    sectoral: 'kos_memory_sectoral',
    methodological: 'kos_memory_methodological',
  };
  const table = tableMap[type] || 'kos_memory_operational';
  const { data } = await supabase.from(table).select('*').eq('key', key).maybeSingle();
  return data;
}

async function getFullState(supabase: any) {
  const tables = ['kos_memory_regulatory', 'kos_memory_operational', 'kos_memory_sectoral', 'kos_memory_methodological'];
  const state: Record<string, unknown> = {};
  for (const table of tables) {
    try {
      const { data, count } = await supabase.from(table).select('*', { count: 'exact' }).order('updated_at', { ascending: false }).limit(100);
      state[table] = { count, entries: data };
    } catch { state[table] = { count: 0, entries: [] }; }
  }
  return state;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const body = await req.json();
    const { action, snapshot, type, key } = body;

    if (action === 'persist') {
      await persistMemory(supabase, snapshot);
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (action === 'retrieve') {
      const data = await retrieveMemory(supabase, type, key);
      return new Response(JSON.stringify({ success: true, data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (action === 'state') {
      const state = await getFullState(supabase);
      return new Response(JSON.stringify({ success: true, state }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ success: false, error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});