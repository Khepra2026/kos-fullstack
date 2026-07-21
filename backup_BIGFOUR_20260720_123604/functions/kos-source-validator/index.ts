import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } }
);

interface ValidationResult {
  id: string;
  status: number;
  classification: 'valid' | 'generic' | 'dead' | 'obsolete';
  hash: string | null;
  bodyLength: number;
  linkCount: number;
  hasPdfLinks: boolean;
  hasDocLinks: boolean;
  title: string;
  reason: string;
  generic: boolean;
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function isGenericPage(url: string, body: string, title: string): { generic: boolean; reason: string } {
  const lowerUrl = url.toLowerCase();
  const lowerTitle = title.toLowerCase();
  let reason = '';
  let generic = false;

  const portalPatterns = [
    /search|recherche/, /\?q=|query=/, /index\.(html?|php|asp)/,
    /\/home\b/, /\/accueil\b/, /\/publications\/?$/, /\/documents\/?$/,
    /\/textes\/?$/, /\/bibliotheque/, /\/library/, /\/portal/, /\/portail/,
    /api\.(crossref|semanticscholar)/, /works\?rows=/
  ];
  for (const pat of portalPatterns) {
    if (pat.test(lowerUrl)) { generic = true; reason += 'URL matches portal/search pattern. '; break; }
  }

  const portalTitles = [
    'search', 'recherche', 'accueil', 'home', 'index',
    'publications', 'documents', 'textes', 'bibliotheque',
    'library', 'portal', 'portail', 'listing', 'catalogue'
  ];
  for (const pt of portalTitles) {
    if (lowerTitle.includes(pt)) { generic = true; reason += 'Title indicates portal/listing page. '; break; }
  }

  const linkMatches = body.match(/<a\s/gi) || [];
  const linkCount = linkMatches.length;
  const hasPdf = /\.(pdf|docx?|odt)\s*["\'>]/.test(body);
  const hasDoc = /(circulaire|instruction|decision|acte|arrete|directive|reglement|norme|texte|loi|code).*\.(pdf|docx?|html?)/i.test(body);

  if (linkCount > 50 && !hasDoc && !hasPdf) {
    generic = true;
    reason += `High link count (${linkCount}) without direct document links. `;
  }

  if (body.length < 3000 && linkCount > 20) {
    generic = true;
    reason += `Short content (${body.length} chars) with many links. `;
  }

  if (lowerUrl.includes('api.crossref.org') || lowerUrl.includes('api.semanticscholar.org')) {
    generic = true;
    reason += 'API feed URL — not a direct document. ';
  }

  if (/\.(edu|ac\.uk|ac\.fr)\/search\?/.test(lowerUrl)) {
    generic = true;
    reason += 'University search page — not a specific document. ';
  }

  return { generic, reason };
}

async function validateSource(id: string, url: string, lastHash: string | null): Promise<ValidationResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'KOS-Validator/2.0 (BigFour-Audit-Bot; +https://khepra.one/bot)' },
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timeout);

    const body = await response.text();
    const hash = await sha256(body);
    const titleMatch = body.match(/<title>([^<]{1,300})<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const isValid = response.status >= 200 && response.status < 400;
    const linkMatches = body.match(/<a\s/gi) || [];
    const linkCount = linkMatches.length;
    const hasPdfLinks = /\.(pdf|docx?|odt)\s*["\'>]/.test(body);
    const hasDocLinks = /(circulaire|instruction|decision|acte|arrete|directive|reglement|norme|texte|loi|code).*\.(pdf|docx?|html?)/i.test(body);

    if (!isValid) {
      return { id, status: response.status, classification: 'dead', hash, bodyLength: body.length, linkCount, hasPdfLinks, hasDocLinks, title, reason: `HTTP ${response.status} response.`, generic: false };
    }

    const isObsolete = lastHash !== null && hash !== lastHash && body.length < 500;
    if (isObsolete) {
      return { id, status: response.status, classification: 'obsolete', hash, bodyLength: body.length, linkCount, hasPdfLinks, hasDocLinks, title, reason: 'Content changed and now too short (<500 chars).', generic: false };
    }

    const { generic, reason } = isGenericPage(url, body, title);

    if (generic) {
      return { id, status: response.status, classification: 'generic', hash, bodyLength: body.length, linkCount, hasPdfLinks, hasDocLinks, title, reason: reason.trim() || 'Classified as generic portal page.', generic: true };
    }

    return { id, status: response.status, classification: 'valid', hash, bodyLength: body.length, linkCount, hasPdfLinks, hasDocLinks, title, reason: 'Source is a real document/page with direct content.', generic: false };

  } catch (err) {
    return { id, status: 0, classification: 'dead', hash: null, bodyLength: 0, linkCount: 0, hasPdfLinks: false, hasDocLinks: false, title: '', reason: err instanceof Error ? err.message : 'Fetch failed', generic: false };
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get('limit') || '50', 10);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);
  const dryRun = url.searchParams.get('dry_run') === 'true';
  const singleId = url.searchParams.get('id');

  try {
    let sources;
    if (singleId) {
      const { data } = await supabase.from('kb_sources').select('id, url, content_hash, name, bigfour_weight').eq('id', singleId).single();
      sources = data ? [data] : [];
    } else {
      const { data } = await supabase.from('kb_sources').select('id, url, content_hash, name, bigfour_weight').eq('validation_status', 'pending').order('priority', { ascending: true }).order('bigfour_weight', { ascending: false }).range(offset, offset + limit - 1);
      sources = data || [];
    }

    if (!sources.length) {
      return new Response(JSON.stringify({ message: 'No pending sources to validate', total: 0 }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const results: ValidationResult[] = [];
    let valid = 0, generic = 0, dead = 0, obsolete = 0;

    for (const src of sources) {
      const result = await validateSource(src.id, src.url, src.content_hash);
      results.push(result);

      if (result.classification === 'valid') valid++;
      else if (result.classification === 'generic') generic++;
      else if (result.classification === 'dead') dead++;
      else if (result.classification === 'obsolete') obsolete++;

      if (!dryRun) {
        const { error: updErr } = await supabase.from('kb_sources').update({
          validation_status: result.classification,
          http_status: result.status,
          content_hash: result.hash,
          validation_error: result.reason,
          last_validated_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          impact_score: result.classification === 'valid' ? (src.bigfour_weight || 50) : result.classification === 'generic' ? Math.max((src.bigfour_weight || 50) - 40, 10) : 0
        }).eq('id', src.id);
        if (updErr) console.error('Update error:', updErr);
      }
      await new Promise(r => setTimeout(r, 200));
    }

    if (!dryRun && valid > 0) {
      const validIds = results.filter(r => r.classification === 'valid').map(r => r.id);
      if (validIds.length > 0) {
        await supabase.from('kb_docs').update({ source_validated: true, updated_at: new Date().toISOString() }).in('source_id', validIds);
      }
    }

    if (!dryRun) {
      await supabase.from('kos_universal_audit_log').insert({
        event_type: 'SOURCE_VALIDATION_BATCH',
        entity_type: 'kb_sources',
        entity_id: `batch-${offset}-${limit}`,
        action: 'VALIDATE_AND_CLASSIFY',
        actor: 'kos-source-validator-v2',
        new_state: { valid, generic, dead, obsolete, total: sources.length, limit, offset },
        reason: 'KOS Final Validation — Generic detection + real source classification',
        correlation_id: `source-val-${Date.now()}`,
      });
    }

    return new Response(JSON.stringify({
      success: true,
      dry_run: dryRun,
      total_processed: sources.length,
      valid, generic, dead, obsolete,
      limit, offset,
      sources: results.map(r => ({ id: r.id, classification: r.classification, status: r.status, title: r.title, body_length: r.bodyLength, link_count: r.linkCount, has_pdf: r.hasPdfLinks, has_doc: r.hasDocLinks, reason: r.reason })),
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
