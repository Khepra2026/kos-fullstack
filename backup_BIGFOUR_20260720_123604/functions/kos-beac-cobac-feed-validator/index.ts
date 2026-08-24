
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * KOS BEAC/COBAC OFFICIAL FEED VALIDATOR™ v2.0
 * Validation automatique complète des textes BEAC et COBAC marqués "sous réserve"
 * en scrapant réellement les portails officiels (au-delà du simple HEAD check).
 * 
 * Nouveautés v2 :
 * - GET complet des pages HTML (plus de HEAD check superficiel)
 * - Parsing du contenu HTML pour détecter la présence des références
 * - Support multi-sources : beac.int, sgcobac.org, bceao.int
 * - Classification CONFIRMÉ / NON_TROUVÉ / EN_ATTENTE
 * - Mise à jour automatique des reliability_index dans regulations
 * - Rapport détaillé avec extraits de contenu trouvés
 * 
 * Sources officielles :
 * - BEAC : https://www.beac.int/reglementation/
 * - COBAC : https://www.beac.int/cobac/
 * - SGC OBAC : https://www.sgcobac.org/
 * - BCEAO : https://www.bceao.int/fr/reglementation/textes-en-vigueur
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Textes à valider — chaque texte avec ses URLs officielles à scraper
const TEXTS_TO_VALIDATE = [
  // BEAC — 5 textes
  { 
    reference: 'BEAC/DIR-04/2025', autorite: 'BEAC', 
    titre: 'Directive LBC/FT Harmonisée CEMAC',
    scrapeTargets: [
      { url: 'https://www.beac.int/reglementation/', searchTerms: ['DIR-04', 'DIR 04', 'LBC/FT', 'Directive 04/2025'] },
      { url: 'https://www.beac.int/category/reglementation/', searchTerms: ['DIR-04', 'LBC/FT'] },
    ]
  },
  { 
    reference: 'BEAC/DIR-08/2025', autorite: 'BEAC', 
    titre: 'Directive Finance Islamique CEMAC',
    scrapeTargets: [
      { url: 'https://www.beac.int/reglementation/', searchTerms: ['DIR-08', 'DIR 08', 'Finance Islamique', 'Directive 08/2025'] },
    ]
  },
  { 
    reference: 'BEAC/CIR-13/2025', autorite: 'BEAC', 
    titre: 'Circulaire Protection Données Clients',
    scrapeTargets: [
      { url: 'https://www.beac.int/reglementation/', searchTerms: ['CIR-13', 'CIR 13', 'Protection', 'Données', 'Circulaire 13/2025'] },
    ]
  },
  { 
    reference: 'BEAC/REG-15/2025', autorite: 'BEAC', 
    titre: 'Règlement Grands Risques et Concentration CEMAC',
    scrapeTargets: [
      { url: 'https://www.beac.int/reglementation/', searchTerms: ['REG-15', 'REG 15', 'Grands Risques', 'Concentration', 'Règlement 15/2025'] },
    ]
  },
  { 
    reference: 'BEAC/INS-02/2025', autorite: 'BEAC', 
    titre: 'Instruction Surveillance Macroprudentielle',
    scrapeTargets: [
      { url: 'https://www.beac.int/reglementation/', searchTerms: ['INS-02', 'INS 02', 'Macroprudentielle', 'Instruction 02/2025'] },
    ]
  },
  // COBAC — 4 textes
  { 
    reference: 'COBAC/INS-03/2025', autorite: 'COBAC', 
    titre: 'Instruction Supervision Bancaire — Contrôles internes',
    scrapeTargets: [
      { url: 'https://www.beac.int/cobac/', searchTerms: ['INS-03', 'INS 03', 'Supervision', 'Contrôles internes', 'Instruction 03'] },
      { url: 'https://www.sgcobac.org/', searchTerms: ['INS-03', 'INS 03', 'Supervision', 'Contrôles'] },
    ]
  },
  { 
    reference: 'COBAC/INS-05/2025', autorite: 'COBAC', 
    titre: 'Instruction Gouvernance Bancaire — Conseil d\'Administration',
    scrapeTargets: [
      { url: 'https://www.beac.int/cobac/', searchTerms: ['INS-05', 'INS 05', 'Gouvernance', 'Conseil', 'Instruction 05'] },
      { url: 'https://www.sgcobac.org/', searchTerms: ['INS-05', 'Gouvernance'] },
    ]
  },
  { 
    reference: 'COBAC/DI/2025-03', autorite: 'COBAC', 
    titre: 'Directive Digitalisation Bancaire — E-banking CEMAC',
    scrapeTargets: [
      { url: 'https://www.beac.int/cobac/', searchTerms: ['DI/2025', 'DI 2025', 'Digitalisation', 'E-banking', 'Directive 2025-03'] },
      { url: 'https://www.sgcobac.org/', searchTerms: ['DI/2025', 'Digitalisation', 'E-banking'] },
    ]
  },
  { 
    reference: 'COBAC/CIR-15/2025', autorite: 'COBAC', 
    titre: 'Circulaire Marché Monétaire — Opérations BEAC',
    scrapeTargets: [
      { url: 'https://www.beac.int/cobac/', searchTerms: ['CIR-15', 'CIR 15', 'Marché Monétaire', 'Circulaire 15'] },
    ]
  },
  // BCEAO — 1 texte
  { 
    reference: '003-03-2025', autorite: 'BCEAO', 
    titre: 'Instruction Identification et Vérification d\'Identité Électronique',
    scrapeTargets: [
      { url: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur', searchTerms: ['003-03-2025', '003/03/2025', 'Identification', 'Vérification', 'Identité Électronique'] },
      { url: 'https://www.bceao.int/fr/reglementation/instructions', searchTerms: ['003-03-2025', '003/03/2025', 'Identité'] },
    ]
  },
];

interface ScrapedEvidence {
  url: string;
  httpStatus: number;
  contentLength: number;
  foundTerms: string[];
  snippet: string;
}

interface ValidationResult {
  reference: string;
  autorite: string;
  titre: string;
  validated: boolean;
  status: 'CONFIRME' | 'NON_TROUVE' | 'EN_ATTENTE';
  foundOnSource: boolean;
  evidence: ScrapedEvidence[];
  notes: string;
  checkedAt: string;
}

async function scrapeUrl(url: string, searchTerms: string[]): Promise<ScrapedEvidence> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'KOS-Regulatory-Validator/2.0 (KHEPRA Experts; compliance; regulatory-monitoring)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'fr-FR,fr;q=0.9',
      },
    });
    clearTimeout(timeout);

    const httpStatus = response.status;
    
    if (!response.ok) {
      return {
        url,
        httpStatus,
        contentLength: 0,
        foundTerms: [],
        snippet: `HTTP ${httpStatus} — ${response.statusText}`,
      };
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('html') && !contentType.includes('text')) {
      // Non-HTML response — probablement un PDF ou binaire
      return {
        url,
        httpStatus,
        contentLength: 0,
        foundTerms: [],
        snippet: `Type de contenu non-HTML: ${contentType}. Nécessite analyse manuelle.`,
      };
    }

    const html = await response.text();
    const contentLength = html.length;
    const lowerHtml = html.toLowerCase();
    
    const foundTerms: string[] = [];
    const snippets: string[] = [];

    for (const term of searchTerms) {
      const lowerTerm = term.toLowerCase();
      if (lowerHtml.includes(lowerTerm)) {
        foundTerms.push(term);
        // Extraire un snippet de 200 caractères autour du terme
        const idx = lowerHtml.indexOf(lowerTerm);
        const start = Math.max(0, idx - 100);
        const end = Math.min(lowerHtml.length, idx + lowerTerm.length + 100);
        const rawSnippet = html.substring(start, end).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        snippets.push(`...${rawSnippet}...`);
      }
    }

    return {
      url,
      httpStatus,
      contentLength,
      foundTerms,
      snippet: snippets.length > 0 ? snippets[0].substring(0, 300) : 'Aucun terme trouvé dans le contenu',
    };
  } catch (fetchError) {
    clearTimeout(timeout);
    return {
      url,
      httpStatus: 0,
      contentLength: 0,
      foundTerms: [],
      snippet: `Erreur réseau: ${fetchError.message}`,
    };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const startedAt = new Date().toISOString();
    console.log(`[BEAC-COBAC-VALIDATOR-V2] Démarrage scraping complet ${TEXTS_TO_VALIDATE.length} textes`);

    const results: ValidationResult[] = [];

    for (const text of TEXTS_TO_VALIDATE) {
      console.log(`[BEAC-COBAC-VALIDATOR-V2] Scraping: ${text.reference} (${text.scrapeTargets.length} URLs)`);
      
      const allEvidence: ScrapedEvidence[] = [];
      
      // Scraper toutes les URLs cibles pour ce texte
      for (const target of text.scrapeTargets) {
        const evidence = await scrapeUrl(target.url, target.searchTerms);
        allEvidence.push(evidence);
        console.log(`  → ${target.url}: ${evidence.foundTerms.length}/${target.searchTerms.length} termes trouvés`);
      }

      // ═══ CLASSIFICATION ═══
      const totalTermsFound = allEvidence.reduce((sum, e) => sum + e.foundTerms.length, 0);
      const maxPossible = text.scrapeTargets.reduce((sum, t) => sum + t.searchTerms.length, 0);
      const hitRate = maxPossible > 0 ? totalTermsFound / maxPossible : 0;
      
      let validated = false;
      let status: ValidationResult['status'] = 'EN_ATTENTE';
      let notes = '';

      if (hitRate >= 0.4) {
        // 40%+ des termes de recherche trouvés → texte probablement référencé
        validated = true;
        status = 'CONFIRME';
        notes = `Référence "${text.reference}" confirmée par scraping. ${totalTermsFound}/${maxPossible} termes-clés trouvés sur ${allEvidence.filter(e => e.foundTerms.length > 0).length}/${text.scrapeTargets.length} sources.`;
      } else if (hitRate >= 0.1) {
        // 10-40% → indices partiels
        status = 'EN_ATTENTE';
        notes = `Indices partiels trouvés (${totalTermsFound}/${maxPossible} termes). Confirmation manuelle recommandée.`;
      } else if (allEvidence.some(e => e.httpStatus >= 200 && e.httpStatus < 400)) {
        // Sources accessibles mais aucun terme trouvé
        status = 'NON_TROUVE';
        notes = `Sources officielles accessibles mais référence "${text.reference}" non trouvée dans le contenu. Le texte pourrait ne pas encore être publié.`;
      } else {
        // Sources inaccessibles
        status = 'EN_ATTENTE';
        notes = `Sources officielles inaccessibles ou en erreur. Vérification manuelle requise.`;
      }

      results.push({
        reference: text.reference,
        autorite: text.autorite,
        titre: text.titre,
        validated,
        status,
        foundOnSource: totalTermsFound > 0,
        evidence: allEvidence,
        notes,
        checkedAt: new Date().toISOString(),
      });
    }

    // ═══ MISE À JOUR BASE DE DONNÉES ═══
    let updatedRegister = 0;
    let updatedRegulations = 0;

    for (const result of results) {
      // Mise à jour regulatory_register
      try {
        const { data: existing } = await supabase
          .from('regulatory_register')
          .select('id, statut_texte')
          .eq('reference', result.reference)
          .maybeSingle();

        if (existing) {
          const newStatus = result.status === 'CONFIRME'
            ? 'Vérifié — Source officielle confirmée par scraping'
            : result.status === 'NON_TROUVE'
              ? 'Non trouvé sur sources officielles — en attente de publication'
              : `En attente vérification — ${result.notes.substring(0, 150)}`;

          await supabase
            .from('regulatory_register')
            .update({ statut_texte: newStatus })
            .eq('id', (existing as any).id);
          updatedRegister++;
        }
      } catch (dbErr) {
        console.warn(`[BEAC-COBAC-VALIDATOR-V2] Register update failed for ${result.reference}`);
      }

      // Mise à jour regulations (reliability_index)
      try {
        const { data: regEntry } = await supabase
          .from('regulations')
          .select('id, reference, reliability_index')
          .eq('reference', result.reference)
          .maybeSingle();

        if (regEntry) {
          let newRi = (regEntry as any).reliability_index;
          
          if (result.status === 'CONFIRME') {
            newRi = Math.min(95, newRi + 10); // +10 points, max 95
          } else if (result.status === 'NON_TROUVE') {
            newRi = Math.max(50, newRi - 5); // -5 points, min 50
          }
          // EN_ATTENTE → inchangé

          await supabase
            .from('regulations')
            .update({ 
              reliability_index: newRi,
              last_review_date: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', (regEntry as any).id);
          updatedRegulations++;
        }
      } catch (dbErr) {
        console.warn(`[BEAC-COBAC-VALIDATOR-V2] Regulations update failed for ${result.reference}`);
      }
    }

    // ═══ RAPPORT ═══
    const confirmed = results.filter(r => r.status === 'CONFIRME');
    const pending = results.filter(r => r.status === 'EN_ATTENTE');
    const notFound = results.filter(r => r.status === 'NON_TROUVE');

    try {
      await supabase.from('verification_logs').insert({
        created_at: startedAt,
        source_url: 'kos-beac-cobac-feed-validator-v2',
        validation_status: `BEAC/COBAC Validator v2 — ${confirmed.length} confirmés, ${pending.length} en attente, ${notFound.length} non trouvés`,
        validated_by: 'KOS BEAC/COBAC Official Feed Validator v2™ (HTML Scraping)',
        last_verification_date: new Date().toISOString(),
        version_number: 2,
      } as any);
    } catch (dbErr) {
      console.warn('[BEAC-COBAC-VALIDATOR-V2] Log error:', dbErr);
    }

    const summary = {
      totalScanned: results.length,
      confirmed: confirmed.length,
      pending: pending.length,
      notFound: notFound.length,
      updatedInRegister: updatedRegister,
      updatedInRegulations: updatedRegulations,
      confirmedRefs: confirmed.map(r => ({ ref: r.reference, notes: r.notes })),
      notFoundRefs: notFound.map(r => ({ ref: r.reference, notes: r.notes })),
      methodology: 'HTML scraping complet — GET requests avec parsing de contenu sur beac.int, sgcobac.org, bceao.int',
      recommendation: notFound.length > 0 
        ? `${notFound.length} texte(s) non trouvé(s) sur les sources officielles. Vérification humaine trimestrielle recommandée.`
        : 'Tous les textes ont été confirmés ou sont en attente de publication officielle.',
    };

    console.log(`[BEAC-COBAC-VALIDATOR-V2] Terminé. ${confirmed.length} confirmés, ${pending.length} en attente, ${notFound.length} non trouvés.`);

    return new Response(JSON.stringify({
      success: true,
      results,
      summary,
      message: `BEAC/COBAC Validator v2™ — ${results.length} textes scrapés. ${confirmed.length} CONFIRMÉS, ${pending.length} en attente, ${notFound.length} NON TROUVÉS.`,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[BEAC-COBAC-VALIDATOR-V2] Erreur fatale:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
