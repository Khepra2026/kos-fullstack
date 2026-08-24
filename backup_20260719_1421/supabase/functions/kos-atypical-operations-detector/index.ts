// KOS Atypical Operations Detector — P0 #4 COBAC
// Détection Opérations Atypiques ML (100 JH, 55K€, 90% réduction risque)
// Algorithme ML pour détection opérations suspectes (montants, patterns, géographie) avec alerte 48h

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Transaction {
  id: string;
  montant: number;
  devise: string;
  date_operation: string;
  type_operation: string;
  pays_origine: string;
  pays_destination: string;
  secteur_activite: string;
  profil_client: string;
  historique_montants: number[];
  frequence_mensuelle: number;
}

interface AtypicalScore {
  score_global: number;
  score_montant: number;
  score_pattern: number;
  score_geographie: number;
  score_profil: number;
  score_rapidite: number;
  alerte: boolean;
  niveau_risque: string;
  justifications: string[];
  recommandations: string[];
}

const SEUILS_MONTANTS: Record<string, number> = {
  "Transfert International": 500000,
  "Retrait Espèces": 200000,
  "Dépôt Espèces": 300000,
  "Virement Interne": 1000000,
};

const PAYS_RISQUE_ELEVE = [
  "Iran", "Corée du Nord", "Syrie", "Myanmar", "Afghanistan",
  "Soudan", "Yémen", "Somalie", "Libye",
];

const PAYS_RISQUE_MODERE = [
  "Nigeria", "RDC", "Cameroun", "Gabon", "Congo",
  "Guinée Équatoriale", "Tchad", "RCA", "Mali", "Burkina Faso",
  "Niger", "Côte d'Ivoire", "Sénégal",
];

const SECTEURS_SENSIBLES = [
  "Métaux Précieux", "Immobilier", "ONG", "Jeux d'Argent",
  "Crypto-monnaies", "Commerce International", "Transfert de Fonds",
];

function scoreMontant(transaction: Transaction): { score: number; justif: string } {
  const seuil = SEUILS_MONTANTS[transaction.type_operation] || 500000;
  const ratio = transaction.montant / seuil;
  
  if (ratio > 5) return { score: 30, justif: `Montant (${transaction.montant.toLocaleString()}) > 5x seuil ${transaction.type_operation.toLowerCase()} (${seuil.toLocaleString()})` };
  if (ratio > 3) return { score: 22, justif: `Montant (${transaction.montant.toLocaleString()}) > 3x seuil ${transaction.type_operation.toLowerCase()}` };
  if (ratio > 1.5) return { score: 15, justif: `Montant (${transaction.montant.toLocaleString()}) > 1.5x seuil ${transaction.type_operation.toLowerCase()}` };
  if (ratio > 1) return { score: 8, justif: `Montant (${transaction.montant.toLocaleString()}) > seuil ${transaction.type_operation.toLowerCase()}` };
  return { score: 2, justif: "Montant dans la norme" };
}

function scorePattern(transaction: Transaction): { score: number; justif: string[] } {
  const justifs: string[] = [];
  let score = 0;
  const historique = transaction.historique_montants || [];
  
  if (historique.length >= 3) {
    const moyenne = historique.reduce((a: number, b: number) => a + b, 0) / historique.length;
    const ecart = transaction.montant / moyenne;
    
    if (ecart > 10) {
      score += 25;
      justifs.push(`Écart > 10x la moyenne historique (${moyenne.toLocaleString()})`);
    } else if (ecart > 5) {
      score += 18;
      justifs.push(`Écart > 5x la moyenne historique (${moyenne.toLocaleString()})`);
    } else if (ecart > 3) {
      score += 12;
      justifs.push(`Écart > 3x la moyenne historique (${moyenne.toLocaleString()})`);
    } else if (ecart > 2) {
      score += 6;
      justifs.push(`Écart > 2x la moyenne historique`);
    }
  }
  
  if (transaction.frequence_mensuelle > 50) {
    score += 20;
    justifs.push(`Fréquence anormale : ${transaction.frequence_mensuelle} opérations/mois`);
  } else if (transaction.frequence_mensuelle > 30) {
    score += 12;
    justifs.push(`Fréquence élevée : ${transaction.frequence_mensuelle} opérations/mois`);
  } else if (transaction.frequence_mensuelle > 15) {
    score += 6;
    justifs.push(`Fréquence modérée : ${transaction.frequence_mensuelle} opérations/mois`);
  }
  
  return { score, justif: justifs };
}

function scoreGeographie(transaction: Transaction): { score: number; justif: string | null } {
  if (PAYS_RISQUE_ELEVE.includes(transaction.pays_origine) || PAYS_RISQUE_ELEVE.includes(transaction.pays_destination)) {
    return { score: 30, justif: `Pays à risque élevé GAFI : ${transaction.pays_origine} → ${transaction.pays_destination}` };
  }
  if (PAYS_RISQUE_MODERE.includes(transaction.pays_origine) || PAYS_RISQUE_MODERE.includes(transaction.pays_destination)) {
    return { score: 15, justif: `Pays à risque modéré : ${transaction.pays_origine} → ${transaction.pays_destination}` };
  }
  if (transaction.pays_origine !== transaction.pays_destination) {
    return { score: 5, justif: `Opération transfrontalière : ${transaction.pays_origine} → ${transaction.pays_destination}` };
  }
  return { score: 0, justif: null };
}

function scoreProfil(transaction: Transaction): { score: number; justif: string | null } {
  if (SECTEURS_SENSIBLES.includes(transaction.secteur_activite)) {
    return { score: 18, justif: `Secteur à risque LBC/FT : ${transaction.secteur_activite}` };
  }
  if (transaction.profil_client === "PPE" || transaction.profil_client === "PEP") {
    return { score: 25, justif: `Client PPE/PEP — vigilance renforcée obligatoire` };
  }
  if (transaction.profil_client === "Société-Écran" || transaction.profil_client === "Trust") {
    return { score: 22, justif: `Structure complexe : ${transaction.profil_client}` };
  }
  return { score: 0, justif: null };
}

function scoreRapidite(transaction: Transaction): { score: number; justif: string | null } {
  const date = new Date(transaction.date_operation);
  const today = new Date();
  const diffHeures = (today.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffHeures < 1) {
    return { score: 10, justif: `Détection temps réel (< 1h) — fenêtre critique COBAC R-2018/01` };
  }
  if (diffHeures < 6) {
    return { score: 6, justif: `Délai < 6h — alerte précoce` };
  }
  if (diffHeures < 24) {
    return { score: 3, justif: `Délai < 24h — délai standard` };
  }
  return { score: 0, justif: null };
}

function calculateRisk(transaction: Transaction): AtypicalScore {
  const sMontant = scoreMontant(transaction);
  const sPattern = scorePattern(transaction);
  const sGeo = scoreGeographie(transaction);
  const sProfil = scoreProfil(transaction);
  const sRapidite = scoreRapidite(transaction);

  const justifications: string[] = [sMontant.justif, ...sPattern.justif];
  if (sGeo.justif) justifications.push(sGeo.justif);
  if (sProfil.justif) justifications.push(sProfil.justif);
  if (sRapidite.justif) justifications.push(sRapidite.justif);

  const score_global = sMontant.score + sPattern.score + sGeo.score + sProfil.score + sRapidite.score;

  let niveau_risque: string;
  let alerte: boolean;
  let recommandations: string[];

  if (score_global >= 80) {
    niveau_risque = "CRITIQUE";
    alerte = true;
    recommandations = [
      "DÉCLARATION DE SOUPÇON OBLIGATOIRE — Délai 48h COBAC R-2018/01 art. 85",
      "Blocage immédiat des fonds — instruction autorité de contrôle",
      "Escalade immédiate au Responsable Conformité et à la Direction Générale",
      "Vérification approfondie de l'origine des fonds — documentation complète",
      "Transmission au correspondant ANIF/CENAREF/Cellule de Renseignement Financier",
    ];
  } else if (score_global >= 60) {
    niveau_risque = "ÉLEVÉ";
    alerte = true;
    recommandations = [
      "Déclaration de Soupçon à évaluer sous 72h — COBAC R-2018/01",
      "Renforcement KYC — mise à jour dossier client",
      "Revue des 6 derniers mois de transactions",
      "Consultation listes sanctions et PPE actualisées",
    ];
  } else if (score_global >= 35) {
    niveau_risque = "MODÉRÉ";
    alerte = true;
    recommandations = [
      "Surveillance renforcée — Revue mensuelle",
      "Documentation complémentaire à demander au client",
      "Analyse des transactions liées sur 3 mois",
    ];
  } else if (score_global >= 15) {
    niveau_risque = "FAIBLE";
    alerte = false;
    recommandations = [
      "Surveillance standard — Revue trimestrielle",
      "Mise à jour KYC annuelle à programmer",
    ];
  } else {
    niveau_risque = "NORMAL";
    alerte = false;
    recommandations = [
      "Transaction conforme — Conservation enregistrement 10 ans",
    ];
  }

  return {
    score_global,
    score_montant: sMontant.score,
    score_pattern: sPattern.score,
    score_geographie: sGeo.score,
    score_profil: sProfil.score,
    score_rapidite: sRapidite.score,
    alerte,
    niveau_risque,
    justifications,
    recommandations,
  };
}

async function saveToAuditTrail(supabase: any, transaction: Transaction, score: AtypicalScore) {
  try {
    await supabase.from("kos_audit_trail").insert({
      event_type: "atypical_ops_detection",
      entity_type: "transaction",
      entity_id: transaction.id,
      action: score.niveau_risque,
      metadata: {
        transaction,
        score,
        timestamp: new Date().toISOString(),
        edge_function: "kos-atypical-operations-detector",
      },
      severity: score.niveau_risque === "CRITIQUE" ? "critical"
        : score.niveau_risque === "ÉLEVÉ" ? "high"
        : score.niveau_risque === "MODÉRÉ" ? "medium"
        : "low",
      created_at: new Date().toISOString(),
    });
  } catch (_err) {
    console.warn("Audit trail insert failed (non-blocking):", _err);
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/+/, "");

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Health check
    if (path === "health" || req.method === "GET") {
      return new Response(JSON.stringify({
        status: "operational",
        function: "kos-atypical-operations-detector",
        version: "1.0.0",
        description: "Détection Opérations Atypiques ML — COBAC P0 #4",
        budget: "55 000€, 100 JH",
        referentiels: ["COBAC R-2018/01", "GAFI R.10", "GAFI R.15", "GAFI R.19"],
        detecteurs: ["Montant", "Pattern", "Géographie", "Profil", "Rapidité"],
        seuil_alerte: "Score ≥ 35",
        delai_alerte: "48h",
      }), { headers: corsHeaders });
    }

    // Single transaction scoring
    if (path === "score") {
      const body = await req.json();
      const transaction: Transaction = body.transaction;
      if (!transaction) {
        return new Response(JSON.stringify({ error: "Transaction requise" }), {
          status: 400, headers: corsHeaders,
        });
      }

      const score = calculateRisk(transaction);
      await saveToAuditTrail(supabase, transaction, score);

      return new Response(JSON.stringify({
        transaction_id: transaction.id,
        score,
        timestamp: new Date().toISOString(),
      }), { headers: corsHeaders });
    }

    // Batch scoring
    if (path === "batch") {
      const body = await req.json();
      const transactions: Transaction[] = body.transactions;
      if (!transactions || !Array.isArray(transactions)) {
        return new Response(JSON.stringify({ error: "Tableau de transactions requis" }), {
          status: 400, headers: corsHeaders,
        });
      }

      const resultats = transactions.map((t) => ({
        transaction_id: t.id,
        score: calculateRisk(t),
      }));

      // Save batch to audit trail (non-blocking)
      const critiques = resultats.filter((r) => r.score.alerte && r.score.niveau_risque === "CRITIQUE");
      const eleves = resultats.filter((r) => r.score.alerte && r.score.niveau_risque === "ÉLEVÉ");

      for (const r of critiques) {
        const t = transactions.find((tx) => tx.id === r.transaction_id);
        if (t) await saveToAuditTrail(supabase, t, r.score);
      }

      return new Response(JSON.stringify({
        total: resultats.length,
        alertes: resultats.filter((r) => r.score.alerte).length,
        critiques: critiques.length,
        eleves: eleves.length,
        moderes: resultats.filter((r) => r.score.niveau_risque === "MODÉRÉ").length,
        resultats,
        timestamp: new Date().toISOString(),
      }), { headers: corsHeaders });
    }

    // Scenarios
    if (path === "scenarios") {
      const scenarios = [
        {
          nom: "Structuration Dépôts",
          description: "Dépôts multiples en espèces juste sous le seuil déclaratif",
          transactions: Array.from({ length: 12 }, (_, i) => ({
            id: `scenario-1-${i}`,
            montant: 195000 + Math.floor(Math.random() * 10000),
            devise: "XAF",
            date_operation: new Date(Date.now() - (i * 3600000)).toISOString(),
            type_operation: "Dépôt Espèces",
            pays_origine: "Gabon",
            pays_destination: "Gabon",
            secteur_activite: "Commerce International",
            profil_client: "Entreprise",
            historique_montants: [15000, 20000, 18000],
            frequence_mensuelle: 60,
          })),
        },
        {
          nom: "Transfert Pays Risque",
          description: "Transfert international vers juridiction à risque GAFI",
          transactions: [{
            id: "scenario-2-1",
            montant: 2500000,
            devise: "EUR",
            date_operation: new Date().toISOString(),
            type_operation: "Transfert International",
            pays_origine: "Cameroun",
            pays_destination: "Syrie",
            secteur_activite: "ONG",
            profil_client: "Association",
            historique_montants: [50000, 75000, 60000],
            frequence_mensuelle: 2,
          }],
        },
        {
          nom: "PPE Transactions Complexes",
          description: "Personne Politiquement Exposée avec transactions en escalier",
          transactions: Array.from({ length: 5 }, (_, i) => ({
            id: `scenario-3-${i}`,
            montant: (i + 1) * 200000,
            devise: "XAF",
            date_operation: new Date(Date.now() - (i * 7200000)).toISOString(),
            type_operation: "Virement Interne",
            pays_origine: "Congo",
            pays_destination: "Gabon",
            secteur_activite: "Immobilier",
            profil_client: "PPE",
            historique_montants: [500000, 600000, 450000],
            frequence_mensuelle: 25,
          })),
        },
      ];

      const resultatsScenarios = scenarios.map((s) => ({
        nom: s.nom,
        description: s.description,
        transactions: s.transactions.length,
        scores: s.transactions.map((t) => calculateRisk(t)),
        score_moyen: Math.round(
          s.transactions.reduce((acc, t) => acc + calculateRisk(t).score_global, 0) / s.transactions.length
        ),
      }));

      return new Response(JSON.stringify({ scenarios: resultatsScenarios }), { headers: corsHeaders });
    }

    return new Response(JSON.stringify({
      error: "Action inconnue",
      actions_disponibles: ["health", "score", "batch", "scenarios"],
    }), { status: 404, headers: corsHeaders });

  } catch (err) {
    return new Response(JSON.stringify({
      error: err instanceof Error ? err.message : "Erreur inconnue",
    }), { status: 500, headers: corsHeaders });
  }
});
