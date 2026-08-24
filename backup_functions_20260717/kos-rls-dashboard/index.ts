
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "scan";
  const tableFilter = url.searchParams.get("table") || "";

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    if (action === "scan" || action === "full") {
      // Get all public tables with RLS status
      const { data: tables, error: tablesError } = await supabaseAdmin.rpc("kos_rls_full_scan");
      
      if (tablesError) {
        // Fallback: direct query
        const { data: fallbackTables, error: fbError } = await supabaseAdmin
          .from("pg_tables")
          .select("tablename")
          .eq("schemaname", "public")
          .not("tablename", "like", "pg_%")
          .not("tablename", "like", "sql_%")
          .not("tablename", "like", "v_%");

        if (fbError) throw fbError;

        // Get RLS status for each table
        const tableStatuses = [];
        for (const { tablename } of (fallbackTables || [])) {
          const { data: rlsCheck } = await supabaseAdmin.rpc("check_table_rls", {
            t_name: tablename,
          });

          // Get policies count
          const { data: policies } = await supabaseAdmin.rpc("kos_count_policies", {
            table_name: tablename,
          });

          tableStatuses.push({
            table_name: tablename,
            rls_enabled: rlsCheck || false,
            policy_count: policies || 0,
          });
        }

        // Stats
        const total = tableStatuses.length;
        const secured = tableStatuses.filter((t) => t.rls_enabled).length;
        const unsecured = total - secured;
        const withPolicies = tableStatuses.filter((t) => t.policy_count > 0).length;
        const emptyRls = tableStatuses.filter((t) => t.rls_enabled && t.policy_count === 0).length;

        return new Response(
          JSON.stringify({
            success: true,
            timestamp: new Date().toISOString(),
            summary: {
              total_tables: total,
              rls_enabled: secured,
              rls_disabled: unsecured,
              rls_coverage_pct: total > 0 ? Math.round((secured / total) * 100) : 0,
              tables_with_policies: withPolicies,
              rls_enabled_no_policies: emptyRls,
            },
            tables: tableStatuses,
            critical_tables: tableStatuses.filter(
              (t) => ["leads", "profiles", "organizations", "subscriptions", "api_keys"].includes(t.table_name)
            ),
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: tables }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "policies") {
      // Get policies for a specific table or all
      const targetTable = tableFilter || "leads";
      const { data: policies, error } = await supabaseAdmin.rpc("kos_get_table_policies", {
        target_table: targetTable,
      });

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          table: targetTable,
          policies: policies || [],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "fix-one") {
      const targetTable = tableFilter;
      if (!targetTable) {
        throw new Error("Table name required for fix-one action");
      }

      const { data, error } = await supabaseAdmin.rpc("kos_force_rls_secure", {
        table_name: targetTable,
      });

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, table: targetTable, result: data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "fix-all") {
      const { data: unsafeTables } = await supabaseAdmin.rpc("kos_get_tables_without_rls");
      
      const results = [];
      for (const { tablename } of (unsafeTables || [])) {
        const { data, error } = await supabaseAdmin.rpc("kos_force_rls_secure", {
          table_name: tablename,
        });
        results.push({
          table: tablename,
          status: error ? "failed" : "secured",
          message: error ? error.message : data,
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          fixed: results.filter((r) => r.status === "secured").length,
          total: results.length,
          details: results,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "storage") {
      // Scan storage buckets
      const { data: buckets, error: bucketsError } = await supabaseAdmin
        .from("buckets")
        .select("*")
        .eq("schema", "storage");

      if (bucketsError) throw bucketsError;

      // Get storage.objects policies
      const { data: storagePolicies, error: spError } = await supabaseAdmin.rpc("kos_get_storage_policies");

      return new Response(
        JSON.stringify({
          success: true,
          buckets: buckets || [],
          storage_policies: storagePolicies || [],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    throw new Error(`Unknown action: ${action}`);
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
