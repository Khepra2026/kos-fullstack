/**
 * KOS RAG KNOWLEDGE SEEDER™ v1.0 — BACKUP SOURCE
 * Extension Base 320 Sources KHEPRA — seed étendu
 * Table: kb_sources
 * Route Cloudflare: POST /api/kos/rag-knowledge-seeder
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action, jurisdiction } = await req.json();

    if (action === 'seed_extended') {
      const docs = [
        { title: "Reglement CREPMF — Marche Financier UEMOA", slug: "crepmf-marche-financier", jurisdiction: "UEMOA", sector: "financier" },
        { title: "Reglement GABAC — LCB-FT CEMAC", slug: "gabac-lcbft-cemac", jurisdiction: "CEMAC", sector: "gouvernance" },
        { title: "Directive CEMAC — Microfinance", slug: "cemac-microfinance", jurisdiction: "CEMAC", sector: "microfinance" },
        { title: "Loi Uniforme OHADA — Mediation", slug: "ohada-mediation", jurisdiction: "OHADA", sector: "juridique" },
        { title: "Norme ISA 315 — Risques d'Anomalies", slug: "isa-315-risques", jurisdiction: "international", sector: "audit" },
        { title: "IFRS 16 — Contrats de Location", slug: "ifrs-16-location", jurisdiction: "international", sector: "comptabilite" },
        { title: "ISO 22301 — Continuite d'Activite", slug: "iso-22301-bcm", jurisdiction: "international", sector: "audit" },
        { title: "IFRS S2 — Climate-related Disclosures", slug: "ifrs-s2-climate", jurisdiction: "international", sector: "comptabilite" },
        { title: "Instruction BCEAO n°061-2011 — Refinancement SFD", slug: "bceao-061-2011-refinancement", jurisdiction: "UEMOA", sector: "microfinance" },
        { title: "Circulaire COBAC n°001-2020 — Plans Redressement", slug: "cobac-001-2020-redressement", jurisdiction: "CEMAC", sector: "bancaire" },
        { title: "Instruction AMF-UMOA — Gestion Actifs", slug: "amf-umoa-gestion-actifs", jurisdiction: "UEMOA", sector: "financier" },
        { title: "Reglement BCRG — Change Guinee", slug: "bcrg-change-guinee", jurisdiction: "Guinee", sector: "bancaire" },
        { title: "Circulaire BCC — Stabilite Financiere RDC", slug: "bcc-stabilite-rdc", jurisdiction: "RDC", sector: "bancaire" },
        { title: "Instruction BCEAO n°018-2010 — Reporting SFD", slug: "bceao-018-2010-reporting", jurisdiction: "UEMOA", sector: "microfinance" },
        { title: "Circulaire BCEAO n°02-2017 — Competences Dirigeants", slug: "bceao-02-2017-competences", jurisdiction: "UEMOA", sector: "bancaire" },
      ];
      const filtered = jurisdiction ? docs.filter(d => d.jurisdiction === jurisdiction) : docs;
      const now = new Date().toISOString();
      let inserted = 0;
      for (const doc of filtered) {
        const { data: existing } = await supabase.from('kb_sources').select('id').eq('slug', doc.slug).maybeSingle();
        if (existing) continue;
        const { error } = await supabase.from('kb_sources').insert({ title: doc.title, slug: doc.slug, jurisdiction: doc.jurisdiction, sector: doc.sector, type: 'reglement', statut: 'pending_enrichment', created_at: now, updated_at: now });
        if (!error) inserted++;
      }
      return new Response(JSON.stringify({ success: true, stats: { inserted, total: filtered.length } }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});



