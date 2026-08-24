import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const FASTAPI_URL = Deno.env.get("KOS_FASTAPI_URL") || "";
const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  try {
    const body = await req.json();
    const { mode, query, regulator, payload } = body;

    if (!FASTAPI_URL) {
      return new Response(
        JSON.stringify({
          error: "FASTAPI_URL not configured",
          detail: "Set KOS_FASTAPI_URL secret in Supabase Edge Function settings",
          fallback: true,
        }),
        { status: 503, headers: CORS_HEADERS }
      );
    }

    let apiUrl: string;
    let fetchOptions: RequestInit = { method: "GET" };

    switch (mode) {
      case "search": {
        if (!query) {
          return new Response(
            JSON.stringify({ error: "Missing 'query' parameter for search mode" }),
            { status: 400, headers: CORS_HEADERS }
          );
        }
        apiUrl = `${FASTAPI_URL}/search?q=${encodeURIComponent(query)}`;
        break;
      }

      case "obligations": {
        if (!regulator) {
          return new Response(
            JSON.stringify({ error: "Missing 'regulator' parameter for obligations mode" }),
            { status: 400, headers: CORS_HEADERS }
          );
        }
        apiUrl = `${FASTAPI_URL}/obligations/${encodeURIComponent(regulator)}`;
        break;
      }

      case "alerts": {
        const params = new URLSearchParams();
        if (regulator) params.append("regulator", regulator);
        if (query) params.append("since", query); // query used as 'since' date param
        apiUrl = `${FASTAPI_URL}/v1/alerts?${params.toString()}`;
        break;
      }

      case "score": {
        if (!payload) {
          return new Response(
            JSON.stringify({ error: "Missing 'payload' for score mode" }),
            { status: 400, headers: CORS_HEADERS }
          );
        }
        apiUrl = `${FASTAPI_URL}/v1/score`;
        fetchOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };
        break;
      }

      case "obligations-nlp": {
        if (!query) {
          return new Response(
            JSON.stringify({ error: "Missing 'query' (text_id) parameter for obligations-nlp mode" }),
            { status: 400, headers: CORS_HEADERS }
          );
        }
        apiUrl = `${FASTAPI_URL}/v1/obligations?text_id=${encodeURIComponent(query)}`;
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: `Unknown mode: ${mode}. Use 'search', 'obligations', 'alerts', 'score', or 'obligations-nlp'` }),
          { status: 400, headers: CORS_HEADERS }
        );
    }

    console.log(`[KOS Regulatory Chat Proxy] → ${fetchOptions.method || "GET"} ${apiUrl}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(apiUrl, { ...fetchOptions, signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[KOS Regulatory Chat Proxy] FastAPI error ${response.status}: ${errorText}`);
        return new Response(
          JSON.stringify({
            error: `FastAPI returned ${response.status}`,
            detail: errorText.slice(0, 500),
            fallback: true,
          }),
          { status: 502, headers: CORS_HEADERS }
        );
      }

      const data = await response.json();
      console.log(`[KOS Regulatory Chat Proxy] ✓ Response received (mode: ${mode})`);

      return new Response(JSON.stringify(data), { status: 200, headers: CORS_HEADERS });
    } catch (fetchErr) {
      clearTimeout(timeout);
      console.error(`[KOS Regulatory Chat Proxy] Fetch failed:`, fetchErr);
      return new Response(
        JSON.stringify({
          error: "FastAPI unreachable",
          detail: (fetchErr as Error)?.message || "Connection failed",
          fallback: true,
        }),
        { status: 502, headers: CORS_HEADERS }
      );
    }
  } catch (err) {
    console.error("[KOS Regulatory Chat Proxy] Parse error:", err);
    return new Response(
      JSON.stringify({ error: "Invalid request body", detail: (err as Error)?.message }),
      { status: 400, headers: CORS_HEADERS }
    );
  }
});
