// KOS Memory Engine v1.1 — Strategic State &amp; Knowledge Persistence
// KHEPRA EXPERTS — Big Four Intelligence
// Fixed: schema alignment avec strategic_memory réel (memory_type, title, content, tags, importance_level)
// 29 Juin 2026 — Auto-Development Seeding

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

interface MemoryPayload {
  action: "store" | "retrieve" | "search" | "consolidate" | "health";
  agent_id?: string;
  domain?: string;
  memory_type?: string;
  title?: string;
  content?: Record<string, unknown>;
  query?: string;
  importance_level?: string;
  limit?: number;
  tags?: string[];
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const url = new URL(req.url);
    const payload: MemoryPayload = req.method === "GET"
      ? { action: (url.searchParams.get("action") || "health") as MemoryPayload["action"] }
      : await req.json();

    const { action, agent_id, domain, memory_type, title, content, query, importance_level, limit = 20, tags } = payload;

    switch (action) {
      case "health": {
        const { count: memoryCount } = await supabase
          .from("strategic_memory")
          .select("*", { count: "exact", head: true });

        return new Response(JSON.stringify({
          status: "operational",
          version: "1.1.0",
          deploy_date: "2026-06-29",
          memories_stored: memoryCount || 0,
          supabase_connected: true,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      case "store": {
        if (!content || !title) {
          return new Response(JSON.stringify({ error: "content and title required" }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        // Merge agent_id and domain into tags for searchability
        const allTags = [
          ...(tags || []),
          ...(agent_id ? [`agent:${agent_id}`] : []),
          ...(domain ? [`domain:${domain}`] : []),
        ];

        const { data, error } = await supabase
          .from("strategic_memory")
          .insert({
            memory_type: memory_type || "strategic",
            title,
            content: typeof content === "string" ? content : JSON.stringify(content),
            tags: allTags.join(","),
            importance_level: importance_level || "élevé",
            retrieval_count: 0,
            created_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (error) throw new Error(`Store failed: ${error.message}`);

        return new Response(JSON.stringify({
          success: true,
          memory_id: data.id,
          stored_at: new Date().toISOString(),
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      case "retrieve": {
        let queryBuilder = supabase
          .from("strategic_memory")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (memory_type) queryBuilder = queryBuilder.eq("memory_type", memory_type);
        if (importance_level) queryBuilder = queryBuilder.eq("importance_level", importance_level);
        if (agent_id) queryBuilder = queryBuilder.ilike("tags", `%agent:${agent_id}%`);
        if (domain) queryBuilder = queryBuilder.ilike("tags", `%domain:${domain}%`);
        if (tags && tags.length > 0) {
          for (const t of tags) {
            queryBuilder = queryBuilder.ilike("tags", `%${t}%`);
          }
        }

        const { data, error } = await queryBuilder;

        if (error) throw new Error(`Retrieve failed: ${error.message}`);

        // Increment retrieval_count for accessed memories
        if (data && data.length > 0) {
          const ids = data.map((m: { id: number }) => m.id);
          await supabase
            .from("strategic_memory")
            .update({ retrieval_count: supabase.rpc ? undefined : undefined, last_accessed: new Date().toISOString() })
            .in("id", ids)
            .then(() => {});

          // Simple increment
          for (const m of data) {
            supabase
              .from("strategic_memory")
              .update({ retrieval_count: (m.retrieval_count || 0) + 1, last_accessed: new Date().toISOString() })
              .eq("id", m.id)
              .then(() => {});
          }
        }

        return new Response(JSON.stringify({
          success: true,
          count: data?.length || 0,
          memories: data || [],
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      case "search": {
        if (!query) {
          return new Response(JSON.stringify({ error: "query required" }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const searchTerm = `%${query.toLowerCase()}%`;

        const { data, error } = await supabase
          .from("strategic_memory")
          .select("*")
          .or(`title.ilike.${searchTerm},tags.ilike.${searchTerm},content.ilike.${searchTerm}`)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) throw new Error(`Search failed: ${error.message}`);

        return new Response(JSON.stringify({
          success: true,
          query,
          count: data?.length || 0,
          results: data || [],
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      case "consolidate": {
        const { data: recentMemories, error: fetchErr } = await supabase
          .from("strategic_memory")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100);

        if (fetchErr) throw new Error(`Consolidate fetch failed: ${fetchErr.message}`);

        const memories = recentMemories || [];
        const byType: Record<string, number> = {};
        const byImportance: Record<string, number> = {};

        for (const m of memories) {
          const t = m.memory_type || "unknown";
          const i = m.importance_level || "unknown";
          byType[t] = (byType[t] || 0) + 1;
          byImportance[i] = (byImportance[i] || 0) + 1;
        }

        const consolidatedContent = {
          summary: `Consolidation de ${memories.length} mémoires stratégiques`,
          by_type: byType,
          by_importance: byImportance,
          consolidated_at: new Date().toISOString(),
          period: "last_100",
        };

        const { data: consolidated, error: insErr } = await supabase
          .from("strategic_memory")
          .insert({
            memory_type: "consolidation",
            title: `Consolidation mémoire — ${new Date().toISOString().split("T")[0]}`,
            content: JSON.stringify(consolidatedContent),
            tags: "meta,consolidation,auto",
            importance_level: "élevé",
            retrieval_count: 0,
            created_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (insErr) throw new Error(`Consolidation store failed: ${insErr.message}`);

        return new Response(JSON.stringify({
          success: true,
          consolidation_id: consolidated.id,
          total_memories: memories.length,
          types: Object.keys(byType).length,
          consolidated_at: new Date().toISOString(),
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }
  } catch (err) {
    console.error("KOS Memory Engine error:", err);
    return new Response(JSON.stringify({
      error: err instanceof Error ? err.message : "Internal server error",
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
