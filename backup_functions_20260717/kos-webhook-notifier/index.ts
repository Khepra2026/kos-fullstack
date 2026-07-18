
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/v1\/kos-webhook-notifier/, "");

  // ── HEALTH CHECK ──
  if (req.method === "GET" && (path === "/" || path === "")) {
    const { data, error } = await supabase
      .from("webhook_endpoints")
      .select("count")
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ status: "error", message: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        status: "ok",
        version: "1.1.0",
        endpoints: ["/notify", "/send", "/regulator-update", "/health"],
        notification_log_count: data?.count || 0,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // ── POST /regulator-update — Reçoit les updates du crawler (n8n ou Edge) ──
  if (req.method === "POST" && (path === "/regulator-update" || path === "/")) {
    try {
      const body = await req.json();

      // Si c'est un event regulator_update (depuis n8n)
      if (body && body.event === "regulator_update") {
        const { data: insertData, error: insertErr } = await supabase
          .from("webhook_notification_log")
          .insert({
            event_type: "regulator_update",
            payload: {
              event: body.event,
              regulator: body.regulator,
              url: body.url,
              lang: body.lang,
              old_hash: body.old_hash,
              new_hash: body.new_hash,
              source: "n8n-kos-crawler",
            },
            pg_net_request_id: `n8n-regulator-${Date.now()}`,
          })
          .select("id")
          .single();

        if (insertErr) {
          console.error("[webhook-notifier] Insert failed:", insertErr.message);
          return new Response(
            JSON.stringify({ success: false, error: insertErr.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({
            success: true,
            id: insertData?.id,
            message: `Regulator update logged for ${body.regulator}`,
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: "Unknown event type — use event=regulator_update" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, error: err.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // ── NOTIFY (déclenche le trigger test_webhook_notify) ──
  if (req.method === "POST" && path === "/notify") {
    try {
      const { data, error } = await supabase.rpc("test_webhook_notify");

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          triggered: data.triggered,
          pages_touched: data.pages_touched,
          message: data.message,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, error: err.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // ── SEND (envoi webhook direct manuel) ──
  if (req.method === "POST" && path === "/send") {
    try {
      const body = await req.json();
      const { webhookUrl, payload, type = "generic" } = body;

      if (!webhookUrl || !payload) {
        return new Response(
          JSON.stringify({ success: false, error: "Missing webhookUrl or payload" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await webhookRes.text();

      await supabase.from("webhook_notification_log").insert({
        event_type: type,
        payload: payload,
        pg_net_request_id: `manual-${Date.now()}`,
      });

      return new Response(
        JSON.stringify({
          success: webhookRes.ok,
          status: webhookRes.status,
          response: responseText,
          type,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, error: err.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // ── 404 ──
  return new Response(
    JSON.stringify({ error: "Not found", available: ["/", "/notify", "/send", "/regulator-update"] }),
    { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
