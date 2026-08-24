import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const PINECONE_API_KEY = Deno.env.get("PINECONE_API_KEY")!;
const PINECONE_INDEX_HOST = Deno.env.get("PINECONE_INDEX_HOST")!;
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;

interface RegTechMetadata {
  type: string;
  priority: number;
  juridiction: string;
  metier: string[];
  referentiel: string;
  date: string;
  citations: number;
  qualite_doc: number;
}

interface ExtractedIntent {
  domaine: string;
  metier: string;
  juridiction: string;
  referentiels: string[];
  obligations: string[];
}

interface QueryBody {
  query: string;
  intent: ExtractedIntent;
  ontologyRefs: string[];
}

interface RankedResult {
  id: string;
  score: number;
  regScore: number;
  fraicheur: number;
  metadata: RegTechMetadata;
}

// Ultra-defensive safe number helper
function safeN(v: unknown, fallback = 0): number {
  if (v === null || v === undefined) return fallback;
  const n = Number(v);
  if (isNaN(n) || !isFinite(n)) return fallback;
  return n;
}

// Safe string helper
function safeS(v: unknown, fallback = ''): string {
  if (typeof v === 'string') return v;
  if (v === null || v === undefined) return fallback;
  return String(v);
}

// Safe array helper
function safeArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter(x => typeof x === 'string') as string[] : [];
}

function dynamicRank(matches: unknown[], _query: string, intent: ExtractedIntent): Record<string, unknown>[] {
  const arr = Array.isArray(matches) ? matches : [];
  return arr.map((m) => {
    const mo = (m && typeof m === 'object' ? m : {}) as Record<string, unknown>;
    const raw_meta = (mo.metadata && typeof mo.metadata === 'object' ? mo.metadata : {}) as Record<string, unknown>;

    const meta: RegTechMetadata = {
      type: safeS(raw_meta.type, 'BigFour'),
      priority: Math.max(1, Math.min(6, safeN(raw_meta.priority, 5))),
      juridiction: safeS(raw_meta.juridiction, 'BCEAO'),
      metier: safeArr(raw_meta.metier),
      referentiel: safeS(raw_meta.referentiel, ''),
      date: safeS(raw_meta.date, ''),
      citations: safeN(raw_meta.citations, 0),
      qualite_doc: safeN(raw_meta.qualite_doc, 0.6),
    };

    // Safe freshness calculation
    let fraicheur = 0.5;
    if (meta.date) {
      try {
        const ageInDays = (Date.now() - new Date(meta.date).getTime()) / 86400000;
        if (isFinite(ageInDays)) {
          fraicheur = Math.max(0, 1 - ageInDays / 1825);
        }
      } catch {
        fraicheur = 0.5;
      }
    }

    const vectorScore = safeN(mo.score, 0.3);
    const authorityScore = Math.max(0, 1.1 - meta.priority * 0.15);
    const jurisdictionScore = meta.juridiction === safeS(intent.juridiction, 'BCEAO') ? 1.0 : 0.5;
    const freshnessScore = fraicheur;
    const citationScore = Math.min(safeN(meta.citations, 0) / 10, 1);
    const metierScore = meta.metier.includes(safeS(intent.metier, '')) ? 1.0 : 0.0;
    const qualiteScore = safeN(meta.qualite_doc, 0.6);

    const rawScore =
      0.20 * vectorScore +
      0.15 * authorityScore +
      0.15 * jurisdictionScore +
      0.10 * freshnessScore +
      0.10 * citationScore +
      0.10 * metierScore +
      0.05 * qualiteScore;

    const regScore = safeN(rawScore, 0.25);

    return {
      ...mo,
      metadata: meta,
      regScore: Math.round(Math.max(0.1, Math.min(1.0, regScore)) * 1000) / 1000,
      fraicheur: Math.round(Math.max(0, Math.min(1, fraicheur)) * 1000) / 1000,
    };
  }).sort((a, b) => safeN(b.regScore, 0) - safeN(a.regScore, 0));
}

function validateEvidenceChain(results: RankedResult[]): boolean {
  const regCount = results.filter((r) => safeN(r.metadata?.priority, 6) <= 3).length;
  const normeCount = results.filter((r) => safeS(r.metadata?.type) === "Norme").length;
  const bigFourCount = results.filter((r) => safeS(r.metadata?.type) === "BigFour").length;
  return regCount >= 2 && normeCount >= 1 && bigFourCount >= 1;
}

async function getEmbedding(text: string): Promise<number[]> {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-3-large",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI Embeddings error ${res.status}: ${err}`);
  }

  const json = await res.json();
  return json.data[0].embedding;
}

async function queryPinecone(
  vector: number[],
  intent: ExtractedIntent
): Promise<unknown[]> {
  if (!PINECONE_API_KEY || !PINECONE_INDEX_HOST) {
    throw new Error("Pinecone credentials not configured");
  }

  const res = await fetch(`https://${PINECONE_INDEX_HOST}/query`, {
    method: "POST",
    headers: {
      "Api-Key": PINECONE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vector,
      topK: 50,
      filter: {
        juridiction: { $in: [intent.juridiction, "ISO", "NIST"] },
        metier: { $in: [intent.metier] },
        priority: { $lte: 4 },
      },
      includeMetadata: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Pinecone query error ${res.status}: ${err}`);
  }

  const json = await res.json();
  return json.matches || [];
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body: QueryBody = await req.json();
    const { query, intent } = body;

    if (!query || !intent) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: query, intent" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const missingKeys: string[] = [];
    if (!OPENAI_API_KEY) missingKeys.push("OPENAI_API_KEY");
    if (!PINECONE_API_KEY) missingKeys.push("PINECONE_API_KEY");
    if (!PINECONE_INDEX_HOST) missingKeys.push("PINECONE_INDEX_HOST");

    if (missingKeys.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Configuration incomplete",
          missingKeys,
          fallback: true,
          message: `Secrets manquants: ${missingKeys.join(", ")}. Utilise le RAG in-memory en fallback.`,
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const vector = await getEmbedding(query);
    const matches = await queryPinecone(vector, intent);
    const ranked = dynamicRank(matches, query, intent) as unknown as RankedResult[];
    const evidenceValid = validateEvidenceChain(ranked);

    // Final sanitization — guarantee no NaN/Infinity in response payload
    const sanitizedResults = ranked.slice(0, 10).map((r) => ({
      id: typeof r.id === 'string' ? r.id : `result-${Math.random().toString(36).slice(2, 10)}`,
      score: safeN(r.score, 0.3),
      regScore: safeN(r.regScore, 0.25),
      fraicheur: safeN(r.fraicheur, 0.5),
      metadata: {
        type: safeS(r.metadata?.type, 'BigFour'),
        priority: Math.max(1, Math.min(6, safeN(r.metadata?.priority, 5))),
        juridiction: safeS(r.metadata?.juridiction, 'BCEAO'),
        metier: safeArr(r.metadata?.metier),
        referentiel: safeS(r.metadata?.referentiel, ''),
        date: safeS(r.metadata?.date, ''),
        citations: safeN(r.metadata?.citations, 0),
        qualite_doc: safeN(r.metadata?.qualite_doc, 0.6),
      },
    }));

    return new Response(
      JSON.stringify({
        results: sanitizedResults,
        evidenceValid,
        totalCandidates: matches.length,
        rerankedCount: ranked.length,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error("Pinecone RAG error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
        fallback: true,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
