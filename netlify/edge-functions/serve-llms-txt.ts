// Netlify Edge Function — Dynamic llms.txt & llms-full.txt Proxy
// Serves the latest generated content from Supabase geo_visibility_logs
// This replaces the static public/llms.txt — always fresh, always autonomous

const SUPABASE_URL = "https://pgfwhahiwqvqeahpirjx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZndoYWhpd3F2cWVhaHBpcmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4NzY5MDAsImV4cCI6MjAzOTQ1MjkwMH0.7FhFxhYrWzyK4RMERJjRzRWqOBEMJKwKXgK7HDPM0KE";

// Cache: refresh from Supabase every hour, serve stale up to 24h
const CACHE_MAX_AGE = 3600;
const CACHE_STALE_WHILE_REVALIDATE = 86400;

interface CachedContent {
  content: string;
  ts: number;
}

let llmsCache: CachedContent | null = null;
let llmsFullCache: CachedContent | null = null;

async function fetchLatestFromSupabase(filePath: string): Promise<string | null> {
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/geo_visibility_logs?log_type=eq.llms_generation&target_url=eq.https://khepraexperts.com${filePath}&order=created_at.desc&limit=1`,
      {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!resp.ok) return null;

    const data = await resp.json();
    if (data && data.length > 0 && data[0].content) {
      return data[0].content as string;
    }

    return null;
  } catch {
    return null;
  }
}

function getCacheHeaders(): Record<string, string> {
  return {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": `public, max-age=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_STALE_WHILE_REVALIDATE}`,
    "access-control-allow-origin": "*",
    "x-content-source": "kos-llms-generator-dynamic",
  };
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const isLlmsFull = url.pathname === "/llms-full.txt";

  // Try cache first
  const cache = isLlmsFull ? llmsFullCache : llmsCache;
  const cacheAge = cache ? (Date.now() - cache.ts) / 1000 : Infinity;

  if (cache && cacheAge < CACHE_MAX_AGE) {
    return new Response(cache.content, { headers: getCacheHeaders() });
  }

  // Fetch fresh from Supabase
  const filePath = isLlmsFull ? "/llms-full.txt" : "/llms.txt";
  const freshContent = await fetchLatestFromSupabase(filePath);

  if (freshContent) {
    // Update cache
    const newCache: CachedContent = { content: freshContent, ts: Date.now() };
    if (isLlmsFull) {
      llmsFullCache = newCache;
    } else {
      llmsCache = newCache;
    }
    return new Response(freshContent, { headers: getCacheHeaders() });
  }

  // Fallback: serve stale cache if available
  if (cache) {
    return new Response(cache.content, { 
      headers: { ...getCacheHeaders(), "x-cache-status": "stale" } 
    });
  }

  // No content available at all
  return new Response(
    `# llms.txt — KHEPRA EXPERTS\n# Le contenu sera disponible après la première régénération automatique par KOS LLMs Generator.\n# Contact: contact@khepraexperts.com\n`,
    { status: 200, headers: getCacheHeaders() }
  );
}

export const config = {
  path: ["/llms.txt", "/llms-full.txt"],
};