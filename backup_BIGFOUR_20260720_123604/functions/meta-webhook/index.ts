import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Hub-Signature",
      },
    });
  }

  // Meta webhook verification (GET — challenge d'abonnement)
  if (req.method === "GET") {
    const url = new URL(req.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    const verifyToken = Deno.env.get("META_WEBHOOK_VERIFY_TOKEN") || "khepra_bigfour_2026";

    if (mode === "subscribe" && token === verifyToken && challenge) {
      return new Response(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    return new Response("Verification failed", { status: 403 });
  }

  // POST — réception des métriques
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    console.log("Meta webhook received:", JSON.stringify(body).slice(0, 500));

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Structure typique Meta: { entry: [{ changes: [{ value: { post_id, ... } }] }] }
    const entries = body?.entry || [];

    for (const entry of entries) {
      const changes = entry?.changes || [];
      for (const change of changes) {
        const value = change?.value || {};
        const postId = value?.post_id || value?.id || value?.media?.id;

        if (!postId) continue;

        // Construire l'objet metrics depuis les données Meta
        const metrics: Record<string, number> = {};

        if (typeof value.likes === "number") metrics.likes = value.likes;
        if (typeof value.likes_count === "number") metrics.likes = value.likes_count;
        if (typeof value.shares === "number") metrics.shares = value.shares;
        if (typeof value.shares_count === "number") metrics.shares = value.shares_count;
        if (typeof value.comments === "number") metrics.comments = value.comments;
        if (typeof value.comments_count === "number") metrics.comments = value.comments_count;
        if (typeof value.impressions === "number") metrics.impressions = value.impressions;
        if (typeof value.reach === "number") metrics.reach = value.reach;
        if (typeof value.clicks === "number") metrics.clicks = value.clicks;
        if (typeof value.engagement === "number") metrics.engagement = value.engagement;

        // Si pas de métriques, on skip
        if (Object.keys(metrics).length === 0) continue;

        // Met à jour kos_publications où external_id correspond au post_id
        const { error: updateError } = await supabase
          .from("kos_publications")
          .update({ metrics })
          .eq("external_id", postId);

        if (updateError) {
          console.error(`Failed to update metrics for post ${postId}:`, updateError);
        } else {
          console.log(`Metrics updated for post ${postId}:`, metrics);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("meta-webhook error:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : "Erreur interne",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
