import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";

const KHEPRA_DOMAIN = "https://khepraexperts.com";
const MODEL = "gpt-4o";

interface RegenSingleRequest {
  slug: string;
  dry_run?: boolean;
  model?: string;
}

interface RegenBatchRequest {
  regulator: string; // 'BCEAO' | 'COBAC' | 'OHADA'
  dry_run?: boolean;
  model?: string;
}

type RegenRequest = RegenSingleRequest | RegenBatchRequest;

function logError(context: string, err: unknown) {
  console.error(`[kos-page-regenerator] ${context}:`, err);
}

function buildSystemPrompt(): string {
  return `Tu es KOS AI v2.2, le moteur de génération de contenu réglementaire Big Four de KHEPRA Experts.

RÈGLES STRICTES:
1. Respect absolu de l'EEAT: chaque page doit prouver l'Expertise, l'Expérience, l'Autorité et la Confiance.
2. Contenu destiné aux décideurs financiers en Afrique (UEMOA/CEMAC): banques, SFD, fintechs, fonds.
3. Ton institutionnel, factuel, sourcé. Pas de jargon creux.
4. Chaque affirmation doit être vérifiable ou sourcée dans les documents fournis.
5. Structure HTML sémantique avec headings H2/H3, listes, tableaux si pertinent.
6. Meta descriptions et title intégrés dans le HTML pour SEO/AEO.
7. Langue: français institutionnel (sauf demande explicite).
8. Ajoute des balises Schema.org en JSON-LD dans un bloc <script type="application/ld+json">.
9. ISO 42001 compliance: mentionner que le contenu est revu par des experts humains KHEPRA.
10. Inclure un CTA naturel vers khepraexperts.com/contact à la fin.

FORMAT DE SORTIE: JSON avec deux clés exactes: { "html": "...", "faq": [...] }`;
}

function buildBatchPrompt(docs: Array<{ title?: string; content: string }>, slug: string, regulator: string): string {
  const sources = docs.map((d, i) => `--- Source ${i + 1}: ${d.title ?? "Document"} ---\n${d.content.substring(0, 4000)}`).join("\n\n");
  return `Mets à jour cette page Big Four avec nouvelle réglementation ${regulator}.
Sources: ${sources}.
Garde EEAT, ajoute section "Mise à jour ${new Date().toISOString()}".
Retourne JSON {html, faq}

Page à régénérer: ${KHEPRA_DOMAIN}/${slug}

SOURCES RÉGLEMENTAIRES FOURNIES:
${sources}

MISSION:
1. Rédige une page HTML complète, niveau Big Four, à jour avec les données réglementaires ${regulator} des sources.
2. Maintiens la structure EEAT: author = SIMDA Essoyomewe, 22 ans BCEAO.
3. Intègre les nouvelles données réglementaires sans perdre l'existant.
4. HTML sémantique, SEO-ready, Schema.org FAQPage si pertinent.
5. Longueur: 2000-5000 mots selon le sujet.
6. Ajoute une section visible "Mise à jour réglementaire — ${new Date().toISOString().split("T")[0]}" avec le nom du régulateur ${regulator}.

Retourne UNIQUEMENT un objet JSON avec exactement deux clés:
{
  "html": "<html complet ici>",
  "faq": [
    {"question": "...", "answer": "..."},
    ...
  ]
}`;
}

function buildSinglePrompt(docs: Array<{ title?: string; content: string }>, slug: string): string {
  const sources = docs.map((d, i) => `--- Source ${i + 1}: ${d.title ?? "Document"} ---\n${d.content.substring(0, 4000)}`).join("\n\n");
  return `Page à régénérer: ${KHEPRA_DOMAIN}/${slug}

SOURCES RÉGLEMENTAIRES FOURNIES:
${sources}

MISSION:
1. Rédige une page HTML complète, niveau Big Four, à jour avec les données BCEAO/COBAC/UEMOA des sources.
2. Maintiens la structure EEAT: author = SIMDA Essoyomewe, 22 ans BCEAO.
3. Intègre les nouvelles données réglementaires sans perdre l'existant.
4. HTML sémantique, SEO-ready, Schema.org FAQPage si pertinent.
5. Longueur: 2000-5000 mots selon le sujet.

Retourne UNIQUEMENT un objet JSON avec exactement deux clés:
{
  "html": "<html complet ici>",
  "faq": [
    {"question": "...", "answer": "..."},
    ...
  ]
}`;
}

async function callOpenAI(system: string, user: string, model: string): Promise<{ html: string; faq: unknown[] } | null> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: 0.3,
        max_tokens: 16000,
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      logError("openai api", err);
      return null;
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? null;
    if (!content) return null;
    const parsed = JSON.parse(content);
    return {
      html: parsed.html ?? parsed.content_html ?? "",
      faq: Array.isArray(parsed.faq) ? parsed.faq : [],
    };
  } catch (e) {
    logError("openai fetch", e);
    return null;
  }
}

async function triggerRevalidate(slug: string): Promise<{ ok: boolean; detail: string }> {
  const revalidateUrl = `${SUPABASE_URL}/functions/v1/kos-revalidate`;
  try {
    const res = await fetch(revalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
      },
      body: JSON.stringify({ path: `/${slug}` }),
    });
    const data = await res.json().catch(() => null);
    return {
      ok: res.ok && data?.revalidated === true,
      detail: data?.provider ?? res.statusText,
    };
  } catch (e) {
    logError("revalidate trigger", e);
    return { ok: false, detail: String(e) };
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// MODE BATCH — Snippet Meta AI adapté
// Reçoit un régulateur, trouve toutes les pages impactées, regen en parallèle
// ═════════════════════════════════════════════════════════════════════════════
async function handleBatchRegen(
  req: Request,
  supabase: ReturnType<typeof createClient>,
  body: RegenBatchRequest
): Promise<Response> {
  const { regulator, dry_run = false, model = MODEL } = body;

  if (!regulator || typeof regulator !== "string") {
    return new Response(JSON.stringify({ error: "Missing or invalid regulator" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 1. Trouve toutes les pages impactées par le régulateur
  //    bigfour_metadata @> {"regulator": ["BCEAO"]}  (filtre JSONB)
  const { data: pages, error: pagesError } = await supabase
    .from("kb_pages")
    .select("id, slug, doc_ids, title, content_html, bigfour_metadata")
    .filter("bigfour_metadata", "cs", JSON.stringify({ regulator: [regulator] }));

  if (pagesError) {
    logError("kb_pages batch fetch", pagesError);
    return new Response(
      JSON.stringify({ error: "Database error fetching pages", detail: pagesError.message, regulator }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const impactedPages = pages ?? [];
  if (impactedPages.length === 0) {
    return new Response(
      JSON.stringify({ regenerated: 0, regulator, status: "no_pages_found", message: "Aucune page impactée par ce régulateur" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. KOS AI regen en parallèle — Promise.all comme dans le snippet
  const results = await Promise.all(
    impactedPages.map(async (p) => {
      // Récupérer les docs sources
      const docIds = p.doc_ids ?? [];
      let docs: Array<{ title?: string; content: string }> = [];
      if (Array.isArray(docIds) && docIds.length > 0) {
        const { data: kbDocs, error: docsError } = await supabase
          .from("kb_docs")
          .select("id, title, content")
          .in("id", docIds.slice(0, 5));
        if (!docsError && kbDocs) {
          docs = kbDocs.map((d) => ({ title: d.title, content: d.content ?? "" }));
        }
      }

      // Appeler OpenAI
      const systemPrompt = buildSystemPrompt();
      const userPrompt = buildBatchPrompt(docs, p.slug, regulator);
      const updated = await callOpenAI(systemPrompt, userPrompt, model);

      if (!updated) {
        return { slug: p.slug, status: "openai_failed", revalidated: false };
      }

      // Mode dry-run → pas de DB write
      if (dry_run) {
        return {
          slug: p.slug,
          status: "dry_run",
          html_length: updated.html.length,
          faq_count: updated.faq.length,
          docs_used: docs.length,
        };
      }

      // 3. Update DB → trigger auto purge cache (trigger SQL trg_purge_kb_pages)
      const { error: updateError } = await supabase
        .from("kb_pages")
        .update({
          content_html: updated.html,
          faq_json: updated.faq,
          last_updated: new Date().toISOString(),
        })
        .eq("id", p.id);

      if (updateError) {
        logError(`kb_pages update ${p.slug}`, updateError);
        return { slug: p.slug, status: "db_update_failed", detail: updateError.message, revalidated: false };
      }

      // 4. Revalidate ISR direct — appelle kos-revalidate
      const reval = await triggerRevalidate(p.slug);

      return {
        slug: p.slug,
        status: "regenerated",
        html_length: updated.html.length,
        faq_count: updated.faq.length,
        docs_used: docs.length,
        revalidated: reval.ok,
        revalidate_provider: reval.detail,
      };
    })
  );

  const successCount = results.filter((r) => r.status === "regenerated").length;
  const failCount = results.length - successCount;

  // Log batch dans kos_audit_log
  try {
    await supabase.from("kos_audit_log").insert({
      user_id: "system",
      prompt_hash: "batch-regen",
      response_hash: regulator,
      model_version: `kos-v2.2-${model}`,
      sources: impactedPages.map((p) => p.slug),
      iso_compliant: true,
    });
  } catch (e) {
    logError("kos_audit_log insert", e);
  }

  return new Response(
    JSON.stringify({
      regenerated: successCount,
      failed: failCount,
      regulator,
      total_pages: impactedPages.length,
      results,
      status: "completed",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MODE SINGLE — Existant (par slug)
// ═════════════════════════════════════════════════════════════════════════════
async function handleSingleRegen(
  supabase: ReturnType<typeof createClient>,
  body: RegenSingleRequest
): Promise<Response> {
  const { slug, dry_run = false, model = MODEL } = body;

  if (!slug || typeof slug !== "string") {
    return new Response(JSON.stringify({ error: "Missing or invalid slug" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "OPENAI_API_KEY not configured",
        detail: "Add OPENAI_API_KEY to Supabase Edge Function secrets to activate content generation.",
        slug,
        status: "waiting_for_key",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // 1. Récupérer kb_pages
  const { data: page, error: pageError } = await supabase
    .from("kb_pages")
    .select("id, doc_ids, content_html, title, last_updated, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (pageError) {
    logError("kb_pages fetch", pageError);
    return new Response(
      JSON.stringify({ error: "Database error fetching page", detail: pageError.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!page) {
    return new Response(JSON.stringify({ error: "Page not found", slug }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Récupérer les docs
  let docs: Array<{ title?: string; content: string }> = [];
  const docIds = page.doc_ids ?? [];
  if (Array.isArray(docIds) && docIds.length > 0) {
    const { data: kbDocs, error: docsError } = await supabase
      .from("kb_docs")
      .select("id, title, content")
      .in("id", docIds.slice(0, 5));

    if (!docsError && kbDocs) {
      docs = kbDocs.map((d) => ({ title: d.title, content: d.content ?? "" }));
    } else if (docsError) {
      logError("kb_docs fetch", docsError);
    }
  }

  // 3. Appeler OpenAI
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildSinglePrompt(docs, slug);
  const updated = await callOpenAI(systemPrompt, userPrompt, model);

  if (!updated) {
    return new Response(
      JSON.stringify({ error: "OpenAI generation failed", slug, status: "failed" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4. Mode dry-run
  if (dry_run) {
    return new Response(
      JSON.stringify({
        status: "dry_run",
        slug,
        generated_html_length: updated.html.length,
        faq_count: updated.faq.length,
        preview: updated.html.substring(0, 500) + "...",
        docs_used: docs.length,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  // 5. Update kb_pages
  const { error: updateError } = await supabase
    .from("kb_pages")
    .update({
      content_html: updated.html,
      faq_json: updated.faq,
      last_updated: new Date().toISOString(),
    })
    .eq("id", page.id);

  if (updateError) {
    logError("kb_pages update", updateError);
    return new Response(
      JSON.stringify({ error: "Failed to update kb_pages", detail: updateError.message, slug }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // 6. Trigger ISR revalidate
  const revalidateResult = await triggerRevalidate(slug);

  // 7. Log
  try {
    await supabase.from("kos_audit_log").insert({
      user_id: "system",
      prompt_hash: "regen",
      response_hash: slug,
      model_version: `kos-v2.2-${model}`,
      sources: docIds,
      iso_compliant: true,
    });
  } catch (e) {
    logError("kos_audit_log insert", e);
  }

  return new Response(
    JSON.stringify({
      status: "regenerated",
      slug,
      purged: true,
      revalidated: revalidateResult.ok,
      revalidate_provider: revalidateResult.detail,
      docs_used: docs.length,
      html_length: updated.html.length,
      faq_count: updated.faq.length,
      provider: "openai",
      model,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ENTRYPOINT
// ═════════════════════════════════════════════════════════════════════════════
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
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

  let body: RegenRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  // Routing : si "regulator" présent → mode batch (snippet Meta AI)
  //           sinon "slug" → mode single (existant)
  if ("regulator" in body && body.regulator) {
    return handleBatchRegen(req, supabase, body as RegenBatchRequest);
  }

  if ("slug" in body && body.slug) {
    return handleSingleRegen(supabase, body as RegenSingleRequest);
  }

  return new Response(
    JSON.stringify({
      error: "Missing parameter",
      detail: "Provide either 'regulator' (batch mode) or 'slug' (single mode)",
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
});
