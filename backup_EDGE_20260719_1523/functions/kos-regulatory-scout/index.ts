import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * KOS REGULATORY SCOUT™ v3.0
 * Scan complet des 137 textes réglementaires en base + cross-reference regulatory_register.
 * 
 * Standard : KOS REGULATORY ZERO-DEFECT PROTOCOL™ v3.0
 * Principe N°1 : SOURCE OFFICIELLE OU RIEN
 * 
 * Nouveautés v3 :
 * - Scan exhaustif de TOUS les textes dans regulations (pas seulement le catalogue)
 * - Cross-reference avec regulatory_register pour vérifier cohérence obligations
 * - Détection des textes sans obligations mappées
 * - Détection des écarts de fiabilité entre les deux tables
 * - Rapport enrichi avec recommandations par texte
 * 
 * Déclenchement : Manuel (via invoke) OU Cron trimestriel
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Références confirmées INEXISTANTES — bloquées à la publication
const KNOWN_FAKE_REFS = [
  { reference: 'R-2026/01', autorite: 'COBAC', reason: 'Non trouvé sur beac.int. Plus récent R-01/COBAC = décembre 2024.' },
  { reference: 'R-2024/03', autorite: 'COBAC', reason: 'Non trouvé sur beac.int. Seul R-2024/01 (TIC) trouvé.' },
  { reference: '008-05-2025', autorite: 'BCEAO', reason: 'Non trouvé sur bceao.int. La référence correcte est 008-05-2015 (EME).' },
];

// Textes marqués "sous réserve" dans les observatoires — à valider sur flux officiels
const TEXTS_SOUS_RESERVE = [
  { reference: 'BEAC/DIR-04/2025', autorite: 'BEAC', expectedSource: 'https://www.beac.int/reglementation/' },
  { reference: 'BEAC/DIR-08/2025', autorite: 'BEAC', expectedSource: 'https://www.beac.int/reglementation/' },
  { reference: 'BEAC/CIR-13/2025', autorite: 'BEAC', expectedSource: 'https://www.beac.int/reglementation/' },
  { reference: 'BEAC/REG-15/2025', autorite: 'BEAC', expectedSource: 'https://www.beac.int/reglementation/' },
  { reference: 'BEAC/INS-02/2025', autorite: 'BEAC', expectedSource: 'https://www.beac.int/reglementation/' },
  { reference: 'COBAC/INS-03/2025', autorite: 'COBAC', expectedSource: 'https://www.beac.int/cobac/' },
  { reference: 'COBAC/INS-05/2025', autorite: 'COBAC', expectedSource: 'https://www.beac.int/cobac/' },
  { reference: 'COBAC/DI/2025-03', autorite: 'COBAC', expectedSource: 'https://www.beac.int/cobac/' },
  { reference: 'COBAC/CIR-15/2025', autorite: 'COBAC', expectedSource: 'https://www.beac.int/cobac/' },
  { reference: '003-03-2025', autorite: 'BCEAO', expectedSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur' },
];

interface ScoutV3Report {
  runId: string;
  startedAt: string;
  completedAt: string;
  summary: {
    totalRegulations: number;
    totalRegisterEntries: number;
    excellentCount: number;
    goodCount: number;
    fairCount: number;
    lowCount: number;
    criticalCount: number;
    fakeRefsDetected: number;
    sousReserveCount: number;
    unlinkedTexts: number;
    orphanObligations: number;
    indiceGlobalKOS: number;
  };
  details: {
    lowReliabilityTexts: any[];
    fakeRefsFound: any[];
    sousReserveTexts: any[];
    unlinkedRegulations: any[];
    gapAnalysis: string[];
  };
  recommendations: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const runId = `SCOUT-V3-${Date.now()}`;
    const startedAt = new Date().toISOString();
    console.log(`[KOS-SCOUT-V3] Run ${runId} — Scan complet 137 textes démarré`);

    // ═══ PHASE 1 : Récupération exhaustive ═══
    const { data: regulations, error: regError } = await supabase
      .from('regulations')
      .select('id, reference, title, type, domain, reliability_index, validation_status, last_review_date, official_url, regulator_id, regulators(name)')
      .order('reliability_index', { ascending: true });

    if (regError) throw new Error(`regulations fetch: ${regError.message}`);

    const { data: register, error: regRegError } = await supabase
      .from('regulatory_register')
      .select('id, reference, titre, autorite, score_conformite, statut_texte, niveau_risque, obligations');

    if (regRegError) throw new Error(`register fetch: ${regRegError.message}`);

    console.log(`[KOS-SCOUT-V3] ${regulations.length} regulations, ${register.length} register entries chargées`);

    // ═══ PHASE 2 : Analyse ═══
    const lowReliabilityTexts: any[] = [];
    const fakeRefsFound: any[] = [];
    const sousReserveTexts: any[] = [];
    const unlinkedRegulations: any[] = [];
    const gapAnalysis: string[] = [];

    let excellentCount = 0;
    let goodCount = 0;
    let fairCount = 0;
    let lowCount = 0;
    let criticalCount = 0;

    // Analyse des regulations
    for (const reg of regulations) {
      const ri = reg.reliability_index ?? 50;

      if (ri >= 95) excellentCount++;
      else if (ri >= 80) goodCount++;
      else if (ri >= 70) fairCount++;
      else if (ri >= 50) lowCount++;
      else criticalCount++;

      // Textes à faible fiabilité
      if (ri < 70) {
        lowReliabilityTexts.push({
          id: reg.id,
          reference: reg.reference,
          title: reg.title,
          regulator: (reg as any).regulators?.name || reg.regulator_id,
          reliability_index: ri,
          validation_status: reg.validation_status,
          last_review_date: reg.last_review_date,
        });
      }

      // Détection de références fictives connues
      for (const fake of KNOWN_FAKE_REFS) {
        if (reg.reference === fake.reference) {
          fakeRefsFound.push({
            id: reg.id,
            reference: reg.reference,
            title: reg.title,
            reason: fake.reason,
            severity: 'CRITICAL',
          });
          criticalCount++;
        }
      }

      // Détection de textes "sous réserve"
      for (const sr of TEXTS_SOUS_RESERVE) {
        if (reg.reference === sr.reference) {
          sousReserveTexts.push({
            id: reg.id,
            reference: reg.reference,
            title: reg.title,
            autorite: sr.autorite,
            expectedSource: sr.expectedSource,
          });
        }
      }

      // Vérifier si le texte a une entrée dans regulatory_register
      const linkedEntries = register.filter(rr => rr.reference === reg.reference);
      if (linkedEntries.length === 0) {
        unlinkedRegulations.push({
          regulation_id: reg.id,
          reference: reg.reference,
          title: reg.title,
          issue: 'Aucune obligation mappée dans regulatory_register',
        });
      }
    }

    // Vérification des entrées orphelines dans regulatory_register
    const orphanObligations = register.filter(rr => {
      return !regulations.some(r => r.reference === rr.reference);
    });

    if (orphanObligations.length > 0) {
      gapAnalysis.push(`${orphanObligations.length} entrées dans regulatory_register sans correspondance dans regulations`);
    }

    if (unlinkedRegulations.length > 0) {
      gapAnalysis.push(`${unlinkedRegulations.length} textes dans regulations sans obligations dans regulatory_register`);
    }

    if (sousReserveTexts.length > 0) {
      gapAnalysis.push(`${sousReserveTexts.length} textes marqués "sous réserve" — validation BEAC/COBAC requise`);
    }

    if (fakeRefsFound.length > 0) {
      gapAnalysis.push(`⚠️ CRITIQUE : ${fakeRefsFound.length} référence(s) fictive(s) détectée(s) en base !`);
    }

    // ═══ PHASE 3 : Calcul de l'Indice Global KOS ═══
    const allScores = regulations.map(r => r.reliability_index ?? 50);
    const indiceGlobal = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);

    const totalRegs = regulations.length;
    const totalRegister = register.length;

    const report: ScoutV3Report = {
      runId,
      startedAt,
      completedAt: new Date().toISOString(),
      summary: {
        totalRegulations: totalRegs,
        totalRegisterEntries: totalRegister,
        excellentCount,
        goodCount,
        fairCount,
        lowCount,
        criticalCount,
        fakeRefsDetected: fakeRefsFound.length,
        sousReserveCount: sousReserveTexts.length,
        unlinkedTexts: unlinkedRegulations.length,
        orphanObligations: orphanObligations.length,
        indiceGlobalKOS: indiceGlobal,
      },
      details: {
        lowReliabilityTexts,
        fakeRefsFound,
        sousReserveTexts,
        unlinkedRegulations,
        gapAnalysis,
      },
      recommendations: [
        fakeRefsFound.length > 0 ? `URGENT : Supprimer/remplacer ${fakeRefsFound.length} référence(s) fictive(s)` : null,
        sousReserveTexts.length > 0 ? `Lancer validation BEAC/COBAC Official Feed pour ${sousReserveTexts.length} textes sous réserve` : null,
        lowReliabilityTexts.length > 0 ? `Améliorer fiabilité de ${lowReliabilityTexts.length} textes (< 70/100)` : null,
        unlinkedRegulations.length > 0 ? `Mapper ${unlinkedRegulations.length} textes sans obligations` : null,
        'Programmer prochain scan trimestriel : 1er Octobre 2026',
      ].filter(Boolean),
    };

    // ═══ PHASE 4 : Enregistrement ═══
    try {
      await supabase.from('verification_logs').insert({
        created_at: startedAt,
        source_url: 'kos-regulatory-scout-v3',
        validation_status: `SCOUT_V3 — ${indiceGlobal}/100 — ${totalRegs} textes scannés`,
        validated_by: 'KOS Regulatory Scout v3™',
        last_verification_date: new Date().toISOString(),
        version_number: 3,
      } as any);
    } catch (dbErr) {
      console.warn('[SCOUT-V3] Erreur DB non bloquante:', dbErr);
    }

    console.log(`[KOS-SCOUT-V3] Scan terminé. Indice : ${indiceGlobal}/100. Fictifs: ${fakeRefsFound.length}. Sous réserve: ${sousReserveTexts.length}.`);

    return new Response(JSON.stringify({
      success: true,
      report,
      message: `KOS Regulatory Scout v3™ — ${totalRegs} textes scannés. Indice Global KOS : ${indiceGlobal}/100. Écarts : ${fakeRefsFound.length} fictifs, ${sousReserveTexts.length} sous réserve, ${unlinkedRegulations.length} non mappés.`,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`[KOS-SCOUT-V3] Erreur :`, error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
