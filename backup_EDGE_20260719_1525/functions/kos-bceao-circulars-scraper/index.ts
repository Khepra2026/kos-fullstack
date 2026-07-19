import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * KOS BCEAO CIRCULARS SCRAPER v1.0
 * Scrap automatique des textes réglementaires BCEAO depuis bceao.int/fr/reglementations
 * 
 * Adaptation du script Python httpx/BeautifulSoup vers TypeScript/Deno.
 * 
 * Standard : KOS REGULATORY ZERO-DEFECT PROTOCOL v3.0
 * 
 * Fonctionnalites :
 * - Scrap multi-pages (pagination automatique jusqu a epuisement)
 * - Extraction NLP des themes (controle interne, gouvernance, LBC/FT, etc.)
 * - Upsert dans public.circulars avec conflit sur circular_number
 * - Tracabilite complete dans kos_compliance_crawl_logs
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BCEAO_BASE_URL = 'https://www.bceao.int';
const BCEAO_REGULATIONS_URL = `${BCEAO_BASE_URL}/fr/reglementations`;

interface BCEAORegulation {
  type: string;
  numero: string | null;
  titre: string;
  url: string;
  date_pub: string | null;
  themes: string[];
}

interface ScraperReport {
  runId: string;
  startedAt: string;
  completedAt: string;
  totalPagesScanned: number;
  totalEntriesFound: number;
  inserted: number;
  updated: number;
  skipped: number;
  errors: string[];
  sample: BCEAORegulation[];
}

const THEME_KEYWORDS: Record<string, string[]> = {
  controle_interne: ['controle interne', 'controle interne', 'audit interne', 'cartographie risques', '3 lignes defense'],
  gouvernance: ['gouvernance', 'conseil administration', 'administrateurs', 'conformite', 'comite audit'],
  lbc_ft: ['blanchiment', 'financement du terrorisme', 'LBC/FT', 'vigilance', 'declaration soupcon', 'KYC'],
  prudentiel: ['prudentiel', 'solvabilite', 'ratio', 'fonds propres', 'Bale', 'provisionnement', 'classification credit'],
  microfinance: ['microfinance', 'SFD', 'IMF', 'systemes financiers decentralises'],
  paiement: ['systeme de paiement', 'monetique', 'paiement', 'monnaie electronique', 'transfert'],
  transformation_digitale: ['digitale', 'numerique', 'TIC', 'innovation', 'fintech', 'crypto'],
  esg: ['ESG', 'durabilite', 'climat', 'environnement', 'social', 'gouvernance durable'],
  continuite_activite: ['continuite', 'PCA', 'plan de continuite', 'resilience', 'reprise'],
  relation_exterieure: ['relations financieres exterieures', 'change', 'correspondant bancaire'],
  comptabilite: ['comptable', 'comptabilite', 'plan comptable', 'IFRS', 'SYSCOHADA'],
  credit: ['credit', 'pret', 'taux', 'conditions de banque', 'refinancement'],
};

function extractThemes(titre: string): string[] {
  const lower = titre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const themes: string[] = [];

  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    for (const kw of keywords) {
      const normalized = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (lower.includes(normalized)) {
        themes.push(theme);
        break;
      }
    }
  }

  return themes.length > 0 ? themes : ['general'];
}

function extractNumero(text: string): string | null {
  const patterns = [
    /(?:circulaire|instruction|avis|decision|directive|note)\s*n[deg]?\s*(\d+(?:[\s\-/]\d+)*)/i,
    /n[deg]?\s*(\d{2,3}[\s\-/]\d{4}(?:\/[A-Z\/]+)?)/i,
    /n°\s*(\d{2,3}[\s\-/]\d{4})/i,
    /(\d{2,3}[\s\-/]\d{4}\/[A-Z\/]+)/i,
    /(\d{2,3}[\s\-/]\d{4})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].replace(/\s+/g, '-').trim();
    }
  }
  return null;
}

function extractDate(dateText: string): string | null {
  const match = dateText.match(/Publie le\s*(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];

  const matchFr = dateText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (matchFr) return `${matchFr[3]}-${matchFr[2]}-${matchFr[1]}`;

  return null;
}

async function fetchPage(pageNum: number): Promise<string> {
  const url = pageNum === 0
    ? BCEAO_REGULATIONS_URL
    : `${BCEAO_REGULATIONS_URL}?page=${pageNum}`;

  console.log(`[BCEAO-SCRAPER] Fetching page ${pageNum}: ${url}`);

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; KOS-RegulatoryBot/1.0; +https://khepra.co/bot)',
      'Accept': 'text/html',
      'Accept-Language': 'fr-FR,fr;q=0.9',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching ${url}`);
  }

  return await response.text();
}

function parsePage(html: string): BCEAORegulation[] {
  const entries: BCEAORegulation[] = [];

  const itemRegex = /<div class="itemReg views-row">(.*?)<\/div>\s*<\/div>\s*<\/div>/gs;
  const matches = html.matchAll(itemRegex);

  for (const match of matches) {
    const block = match[1];

    const typeMatch = block.match(/<span class=theme>(.*?)<\/span>/);
    const type = typeMatch ? typeMatch[1].trim() : 'Non classe';

    const descMatch = block.match(/<span class=desc>(.*?)<\/span>/s);
    const desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    const urlMatch = block.match(/<a href="(\/fr\/reglementations\/[^"]+)"/);
    const relativeUrl = urlMatch ? urlMatch[1] : '';
    const fullUrl = relativeUrl ? `${BCEAO_BASE_URL}${relativeUrl}` : '';

    const dateMatch = block.match(/<span class=date>(.*?)<\/span>/);
    const dateText = dateMatch ? dateMatch[1].trim() : '';
    const date = extractDate(dateText);

    const numero = extractNumero(desc);
    const titre = desc;
    const themes = extractThemes(titre);

    if (titre && fullUrl) {
      entries.push({
        type,
        numero,
        titre,
        url: fullUrl,
        date_pub: date,
        themes,
      });
    }
  }

  return entries;
}

function hasPagination(html: string, currentPage: number): boolean {
  const nextPageRegex = new RegExp(`href="[^"]*page=${currentPage + 1}"`, 'i');
  return nextPageRegex.test(html);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const runId = `BCEAO-SCRAPER-${Date.now()}`;
    const startedAt = new Date().toISOString();
    console.log(`[BCEAO-SCRAPER] Run ${runId} — Demarrage`);

    let currentPage = 0;
    let hasMore = true;
    const allEntries: BCEAORegulation[] = [];
    const errors: string[] = [];

    while (hasMore && currentPage < 20) {
      try {
        const html = await fetchPage(currentPage);
        const entries = parsePage(html);

        if (entries.length === 0) {
          console.log(`[BCEAO-SCRAPER] Page ${currentPage}: 0 entries, stopping.`);
          break;
        }

        allEntries.push(...entries);
        console.log(`[BCEAO-SCRAPER] Page ${currentPage}: ${entries.length} entries`);

        hasMore = hasPagination(html, currentPage);
        currentPage++;

        await new Promise(r => setTimeout(r, 800));
      } catch (err) {
        errors.push(`Page ${currentPage}: ${err.message}`);
        console.error(`[BCEAO-SCRAPER] Page ${currentPage} error:`, err);
        break;
      }
    }

    // PHASE 2 : Recuperation du regulateur BCEAO
    const { data: bceaoRegulator } = await supabase
      .from('regulators')
      .select('id')
      .eq('code', 'BCEAO')
      .single();

    const bceaoId = bceaoRegulator?.id ?? 'f8518363-2bec-4099-a297-f3f03c76b33a';

    // PHASE 3 : Upsert dans circulars
    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    const now = new Date().toISOString();

    for (const entry of allEntries) {
      const circularNumber = entry.numero || entry.titre.substring(0, 50);
      const reference = `${entry.type} ${circularNumber} — ${entry.date_pub || 'n/a'}`;
      const dateIssued = entry.date_pub || '2010-01-01';

      const { data: existing } = await supabase
        .from('circulars')
        .select('id, circular_number')
        .eq('circular_number', circularNumber)
        .maybeSingle();

      const dataPayload = {
        regulator_id: bceaoId,
        reference: reference.length > 100 ? reference.substring(0, 100) : reference,
        title: entry.titre.length > 255 ? entry.titre.substring(0, 255) : entry.titre,
        circular_number: circularNumber,
        date_issued: dateIssued,
        domain: entry.type,
        status: 'in_force',
        official_url: entry.url,
        source_authority: 'BCEAO',
        source_url: BCEAO_REGULATIONS_URL,
        keywords: entry.themes,
        metadata: JSON.stringify({
          scraped_by: 'kos-bceao-circulars-scraper',
          scraped_at: now,
          run_id: runId,
          page_type: entry.type,
        }),
        validation_status: 'auto_scraped',
        created_by: 'KOS-BCEAO-Scraper',
        confidence_score: 70,
        version_number: 1,
      };

      if (existing) {
        const { error: updateErr } = await supabase
          .from('circulars')
          .update({
            ...dataPayload,
            updated_at: now,
            version_number: (existing.version_number || 1) + 1,
          })
          .eq('id', existing.id);

        if (updateErr) {
          errors.push(`Update ${circularNumber}: ${updateErr.message}`);
        } else {
          updated++;
        }
      } else {
        const { error: insertErr } = await supabase
          .from('circulars')
          .insert(dataPayload);

        if (insertErr) {
          if (insertErr.message.includes('duplicate key') || insertErr.message.includes('circulars_reference_key')) {
            const { error: fallbackUpdateErr } = await supabase
              .from('circulars')
              .update({
                ...dataPayload,
                updated_at: now,
              })
              .eq('reference', dataPayload.reference);

            if (fallbackUpdateErr) {
              errors.push(`Insert+Update ${circularNumber}: ${fallbackUpdateErr.message}`);
            } else {
              updated++;
            }
          } else {
            errors.push(`Insert ${circularNumber}: ${insertErr.message}`);
          }
        } else {
          inserted++;
        }
      }
    }

    // PHASE 4 : Log dans kos_compliance_crawl_logs
    try {
      await supabase.from('kos_compliance_crawl_logs').insert({
        source: 'bceao.int',
        url: BCEAO_REGULATIONS_URL,
        status: errors.length === 0 ? 'success' : 'partial',
        records_count: allEntries.length,
        error_count: errors.length,
        error_message: errors.length > 0 ? errors.join(' | ') : null,
        run_id: runId,
        created_at: now,
      });
    } catch (logErr) {
      console.warn('[BCEAO-SCRAPER] Log insert error (non-blocking):', logErr);
    }

    const report: ScraperReport = {
      runId,
      startedAt,
      completedAt: new Date().toISOString(),
      totalPagesScanned: currentPage,
      totalEntriesFound: allEntries.length,
      inserted,
      updated,
      skipped,
      errors,
      sample: allEntries.slice(0, 5),
    };

    console.log(`[BCEAO-SCRAPER] Run ${runId} termine. ${allEntries.length} entrees, ${inserted} nouvelles, ${updated} mises a jour.`);

    return new Response(JSON.stringify({
      success: true,
      report,
      message: `KOS BCEAO Scraper — ${allEntries.length} textes trouves sur ${currentPage} pages. ${inserted} nouveaux, ${updated} mis a jour. ${errors.length} erreurs.`,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(`[BCEAO-SCRAPER] Erreur fatale:`, error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
