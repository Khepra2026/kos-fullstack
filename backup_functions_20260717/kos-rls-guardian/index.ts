
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "audit";

    if (action === "scan") {
      const result = await scanUnsafeTables();
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "fix") {
      const result = await fixAllTables();
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "fix-one") {
      const tableName = url.searchParams.get("table");
      if (!tableName) {
        return new Response(JSON.stringify({ success: false, error: "Missing table param" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const result = await fixOneTable(tableName);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default: full audit + fix
    const scanResult = await scanUnsafeTables();
    if (scanResult.unsafeTables.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: "Toutes les tables sont protégées RLS. Aucune action requise.",
        tablesChecked: scanResult.totalTables,
        unsafeTables: 0,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fixResult = await fixAllTables();
    return new Response(JSON.stringify({
      success: true,
      message: `Audit terminé. ${fixResult.fixed} tables sécurisées.`,
      scan: scanResult,
      fix: fixResult,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[KOS-RLS-GUARDIAN] Error:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function supabaseRpc(fn: string, params: Record<string, unknown> = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`RPC ${fn} failed: ${res.status} ${errText}`);
  }
  return res.json();
}

async function scanUnsafeTables() {
  const unsafeTables = await supabaseRpc("kos_get_tables_without_rls");
  const allTables = await supabaseRpc("get_public_tables");

  return {
    totalTables: allTables?.length ?? 0,
    unsafeTables: unsafeTables ?? [],
    unsafeCount: unsafeTables?.length ?? 0,
    rlsCoverage: allTables?.length
      ? `${Math.round(((allTables.length - (unsafeTables?.length ?? 0)) / allTables.length) * 100)}%`
      : "N/A",
  };
}

async function fixOneTable(tableName: string) {
  const result = await supabaseRpc("kos_force_rls_secure", { table_name: tableName });
  return { table: tableName, status: "secured", message: result };
}

async function fixAllTables() {
  const { unsafeTables } = await scanUnsafeTables();
  const results: Array<{ table: string; status: string; message?: string; error?: string }> = [];

  for (const { tablename } of unsafeTables) {
    try {
      const msg = await supabaseRpc("kos_force_rls_secure", { table_name: tablename });
      console.log(`[KOS-FIXED] ${tablename}: ${msg}`);
      results.push({ table: tablename, status: "secured", message: String(msg) });
    } catch (err) {
      console.error(`[KOS-ERROR] ${tablename}:`, err);
      results.push({
        table: tablename,
        status: "failed",
        error: err instanceof Error ? err.message : "Unknown",
      });
    }
  }

  return {
    fixed: results.filter((r) => r.status === "secured").length,
    failed: results.filter((r) => r.status === "failed").length,
    details: results,
  };
}
