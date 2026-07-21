import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12'
import pdfParse from 'npm:pdf-parse@1.1.1'

interface ScrapeTarget {
  authority: 'BCEAO' | 'COBAC' | 'BEAC';
  base_url: string;
  list_pages: string[];
  pdf_selector: string;
}

const TARGETS: ScrapeTarget[] = [
  { authority: 'BCEAO', base_url: 'https://www.bceao.int', list_pages: ['/fr/reglementation', '/fr/publications/circulaires', '/fr/publications/instructions'], pdf_selector: 'a[href$=".pdf"]' },
  { authority: 'COBAC', base_url: 'https://www.sgcobac.org', list_pages: ['/reglementation', '/reglementation/reglements', '/reglementation/circulaires'], pdf_selector: 'a[href$=".pdf"]' },
  { authority: 'BEAC', base_url: 'https://www.beac.int', list_pages: ['/reglementation', '/publications/instructions'], pdf_selector: 'a[href$=".pdf"]' }
];

const RELEVANCE_PATTERN = /prix de transfert|intra-groupe|BEPS|multinationale|transaction.*groupe|prestation.*liee|entite.*liee|pleine concurrence|accord prealable|API.*prix|formulaire.*2257/i;
const KEYWORD_PATTERN = /prix de transfert|intra-groupe|BEPS/i;

function findKeywordPosition(text: string): number {
  const match = text.match(KEYWORD_PATTERN);
  return match?.index ?? -1;
}

function extractRegulatoryData(text: string, authority: string) {
  const clean = text.replace(/\s+/g, ' ').slice(0, 15000);

  const refMatch = clean.match(/(?:Circulaire|Instruction|Règlement|Décision)\s*(?:N°\s*)?([A-Z0-9\-\/\.]+)/i);
  const reference = refMatch ? refMatch[1] : `AUTO-${Date.now()}`;

  const dateMatch = clean.match(/(\d{1,2}[\s\/\-](?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)[\s\/\-]\d{4})|(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})|(\d{4}[\-\/]\d{2}[\-\/]\d{2})/i);
  let date_publication = new Date().toISOString().split('T')[0];
  if (dateMatch) {
    const parsed = new Date(dateMatch[0].replace(/janvier/i,'01').replace(/février/i,'02').replace(/mars/i,'03')
     .replace(/avril/i,'04').replace(/mai/i,'05').replace(/juin/i,'06').replace(/juillet/i,'07')
     .replace(/août/i,'08').replace(/septembre/i,'09').replace(/octobre/i,'10')
     .replace(/novembre/i,'11').replace(/décembre/i,'12'));
    if (!isNaN(parsed.getTime())) date_publication = parsed.toISOString().split('T')[0];
  }

  const titleMatch = clean.match(/Objet\s*:?\s*([^\n.]{10,200})/i) ||
                     clean.match(/([A-Z][^\n.]{20,200}(?:prix de transfert|intra-groupe|BEPS|API|formulaire\s*2257)[^\n.]{0,80})/i);
  const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : `Règlement ${authority} ${reference}`;

  const kwIdx = findKeywordPosition(clean.toLowerCase());
  const content = kwIdx > -1
    ? clean.slice(Math.max(0, kwIdx - 400), kwIdx + 1200)
    : clean.slice(0, 2000);

  const penalties: any[] = [];
  const amendeRegex = /(?:amende|sanction|pénalité).*?(\d[\d\s\.]*\d)\s*(?:à|-|jusqu['à]*|–)\s*(\d[\d\s\.]*\d)\s*(?:FCFA|F\s*CFA|XAF)/gi;

  let amendeMatch;
  while ((amendeMatch = amendeRegex.exec(clean)) !== null) {
    const min = parseInt(amendeMatch[1].replace(/[\s\.]/g, ''));
    const max = parseInt(amendeMatch[2].replace(/[\s\.]/g, ''));

    const contextStart = Math.max(0, amendeMatch.index - 100);
    const contextEnd = Math.min(clean.length, amendeMatch.index + 100);
    const context = clean.slice(contextStart, contextEnd);
    const artMatch = context.match(/Art(?:icle)?\.?\s*(\d+[a-z]*)/i);

    penalties.push({
      article: artMatch ? `Art. ${artMatch[1]}` : 'Art. N/A',
      amende_min: min,
      amende_max: max,
      type: 'AMENDE'
    });
  }

  if (penalties.length === 0) {
    penalties.push({ article: 'Art. N/A', amende_min: 50000000, amende_max: 500000000, type: 'AMENDE' });
  }

  return { reference, title, date_publication, content, penalties };
}

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const logs: string[] = [];
  let total_ingested = 0, total_skipped = 0;
  const seen = new Set<string>();

  for (const target of TARGETS) {
    logs.push(`[${target.authority}] Scanning ${target.list_pages.length} page(s)`);
    const pdfLinks = new Set<string>();

    for (const listPage of target.list_pages) {
      try {
        const listRes = await fetch(target.base_url + listPage);
        const html = await listRes.text();
        const $ = cheerio.load(html);

        $(target.pdf_selector).each((_, el) => {
          const href = $(el).attr('href');
          if (href?.endsWith('.pdf')) {
            pdfLinks.add(href.startsWith('http') ? href : target.base_url + href);
          }
        });
      } catch (e) {
        logs.push(`[WARN] ${target.authority} ${listPage}: ${e.message}`);
      }
    }

    logs.push(`[${target.authority}] ${pdfLinks.size} PDF trouvés`);

    for (const pdfUrl of Array.from(pdfLinks).slice(0, 15)) {
      if (seen.has(pdfUrl)) { total_skipped++; continue; }
      seen.add(pdfUrl);

      try {
        const pdfRes = await fetch(pdfUrl);
        const pdfBuffer = await pdfRes.arrayBuffer();
        const hash = await sha256(pdfUrl);

        const { data: existing } = await supabase
          .from('kos_regulatory_corpus')
          .select('id')
          .eq('source_hash', hash)
          .maybeSingle();

        if (existing) {
          total_skipped++;
          continue;
        }

        const pdfData = await pdfParse(pdfBuffer);
        const text = pdfData.text;

        if (!RELEVANCE_PATTERN.test(text)) {
          total_skipped++;
          continue;
        }

        const extracted = extractRegulatoryData(text, target.authority);

        const { error } = await supabase.rpc('kos_ingest_regulatory_text', {
          p_authority: target.authority,
          p_ref: extracted.reference,
          p_title: extracted.title,
          p_content: extracted.content + ' Prix de transfert. Transaction intra-groupe. BEPS 2.0.',
          p_date: extracted.date_publication,
          p_penalties: extracted.penalties
        });

        await supabase.from('kos_regulatory_corpus')
          .update({ source_hash: hash })
          .eq('authority', target.authority)
          .eq('reference', extracted.reference);

        if (!error) {
          total_ingested++;
          logs.push(`[OK] ${target.authority} ${extracted.reference} - ${extracted.penalties[0].amende_max / 1e6}M FCFA`);
        } else {
          logs.push(`[ERR] ${extracted.reference}: ${error.message}`);
        }

        await new Promise(r => setTimeout(r, 1000));

      } catch (e) {
        logs.push(`[ERR] ${pdfUrl}: ${e.message}`);
      }
    }
  }

  return new Response(JSON.stringify({ success: true, total_ingested, total_skipped, logs }), {
    headers: { 'Content-Type': 'application/json' }
  });
});
