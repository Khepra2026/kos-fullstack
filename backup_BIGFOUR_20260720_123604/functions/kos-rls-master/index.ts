import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" }

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  const url = new URL(req.url)
  const action = url.searchParams.get("action") || "scan"
  const tableFilter = url.searchParams.get("table") || ""
  const supabaseAdmin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)

  try {
    // ─── HEALTH ───
    if (action === "health") return new Response(JSON.stringify({ status: "ok", engine: "kos-rls-master-v1", actions: ["health","scan","policies","fix_one","fix_all","storage"] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })

    // ─── SCAN ───
    if (action === "scan") {
      const { data: tables } = await supabaseAdmin.rpc("kos_get_tables_without_rls").catch(() => ({ data: [] }))
      const { data: allTables } = await supabaseAdmin.rpc("get_public_tables").catch(() => ({ data: [] }))
      return new Response(JSON.stringify({ success: true, timestamp: new Date().toISOString(), summary: { total_tables: allTables?.length ?? 0, rls_disabled: tables?.length ?? 0, rls_coverage_pct: allTables?.length ? Math.round(((allTables.length - (tables?.length ?? 0)) / allTables.length) * 100) : 0 }, unsafeTables: tables || [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    // ─── POLICIES ───
    if (action === "policies") {
      const targetTable = tableFilter || "leads"
      const { data: policies } = await supabaseAdmin.rpc("kos_get_table_policies", { target_table: targetTable }).catch(() => ({ data: [] }))
      return new Response(JSON.stringify({ success: true, table: targetTable, policies: policies || [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    // ─── FIX_ONE ───
    if (action === "fix_one") {
      if (!tableFilter) return new Response(JSON.stringify({ success: false, error: "Table name required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
      const { data, error } = await supabaseAdmin.rpc("kos_force_rls_secure", { table_name: tableFilter })
      if (error) throw error
      return new Response(JSON.stringify({ success: true, table: tableFilter, result: data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    // ─── FIX_ALL ───
    if (action === "fix_all") {
      const { data: unsafeTables } = await supabaseAdmin.rpc("kos_get_tables_without_rls").catch(() => ({ data: [] }))
      const results: Array<{ table: string; status: string; message?: string; error?: string }> = []
      for (const { tablename } of (unsafeTables || [])) {
        try { const { data: msg } = await supabaseAdmin.rpc("kos_force_rls_secure", { table_name: tablename }); results.push({ table: tablename, status: "secured", message: String(msg) }) } catch (e) { results.push({ table: tablename, status: "failed", error: String(e) }) }
      }
      return new Response(JSON.stringify({ success: true, fixed: results.filter(r => r.status === "secured").length, failed: results.filter(r => r.status === "failed").length, total: results.length, details: results }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    // ─── STORAGE ───
    if (action === "storage") {
      const { data: buckets } = await supabaseAdmin.from("buckets").select("*").eq("schema", "storage").catch(() => ({ data: [] }))
      const { data: storagePolicies } = await supabaseAdmin.rpc("kos_get_storage_policies").catch(() => ({ data: [] }))
      return new Response(JSON.stringify({ success: true, buckets: buckets || [], storage_policies: storagePolicies || [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    return new Response(JSON.stringify({ success: false, error: `Unknown action: ${action}` }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  } catch (err) { return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }) }
})