/**
 * KHEPRA OS — Module d'Analyse PAR & Provisions BCEAO (TypeScript)
 * ================================================================
 * Version navigateur de l'outil d'analyse de portefeuille de crédits
 * pour EMF/SFD. Conforme à la grille COBAC de provisionnement et aux normes BCEAO.
 *
 * Usage:
 *   import { analyserParEtProvisions } from '@/utils/khepraCalculParProvisions';
 *   const resultat = analyserParEtProvisions(lignesPortefeuille);
 */

// ─────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────

export interface LignePortefeuille {
  id_credit: string;
  capital_restant_du: number;
  jours_retard: number;
  nature_garantie?: string;
}

export type ClasseRisque =
  | 'Sain'
  | 'Sensible (PAR 1-30)'
  | 'Pré-douteux (PAR 31-90)'
  | 'Douteux (PAR 91-180)'
  | 'Compromis (PAR >180)';

export interface LigneAnalysee extends LignePortefeuille {
  classe_risque: ClasseRisque;
  taux_provision: number;
  garantie_reelle: boolean;
  provision_a_constituer: number;
}

export interface IndicateursPortefeuille {
  total_encours_portefeuille: number;
  nombre_credits_total: number;
  PAR_1_valeur: number;
  PAR_1_ratio: number;
  PAR_30_valeur: number;
  PAR_30_ratio: number;
  PAR_90_valeur: number;
  PAR_90_ratio: number;
  total_provisions_requises: number;
  taux_couverture_provisions: number;
  concentration_top10_pct: number;
}

export interface MatriceLigne {
  Nombre_Credits: number;
  Encours_Total: number;
  Provisions_A_Constituer: number;
}

export interface ScoreDetail {
  poids: string;
  score: number;
  valeur: number;
  statut: string;
}

export interface ScoreQualite {
  score_global: number;
  appreciation: string;
  details: Record<string, ScoreDetail>;
}

export interface ResultatAnalysePar {
  metadata: {
    outil: string;
    version: string;
    date: string;
  };
  indicateurs: IndicateursPortefeuille;
  matrice_detaillee: Record<ClasseRisque, MatriceLigne>;
  top_10_credits: Array<{
    id_credit: string;
    capital_restant_du: number;
    jours_retard: number;
    classe_risque: ClasseRisque;
  }>;
  score_qualite_portefeuille: ScoreQualite;
  recommandations: string[];
}

// ─────────────────────────────────────────────────────────────────────
// CONSTANTES RÉGLEMENTAIRES
// ─────────────────────────────────────────────────────────────────────

const CLASSES_RISQUE: ClasseRisque[] = [
  'Sain',
  'Sensible (PAR 1-30)',
  'Pré-douteux (PAR 31-90)',
  'Douteux (PAR 91-180)',
  'Compromis (PAR >180)',
];

const GRILLE_PROVISIONNEMENT: Record<string, {
  taux_avec_garantie?: number;
  taux_sans_garantie?: number;
  taux_base?: number;
}> = {
  'Sensible (PAR 1-30)': { taux_base: 0.0 },
  'Pré-douteux (PAR 31-90)': { taux_base: 0.4 },
  'Douteux (PAR 91-180)': { taux_avec_garantie: 0.5, taux_sans_garantie: 1.0 },
  'Compromis (PAR >180)': { taux_base: 1.0 },
};

const SEUILS_PAR = {
  PAR_30: { alerte: 5.0, critique: 10.0 },
  PAR_90: { alerte: 3.0, critique: 5.0 },
  Taux_Couverture: { alerte: 70.0, critique: 60.0 },
};

const GARANTIES_REELLES = [
  'reelle', 'réelle', 'hypothèque', 'hypotheque', 'nantissement',
  'hypothecaire', 'hypothécaire', 'garantie_reelle', 'garantie réelle',
  'immobiliere', 'immobilière',
];

// ─────────────────────────────────────────────────────────────────────
// FONCTIONS UTILITAIRES
// ─────────────────────────────────────────────────────────────────────

function estGarantieReelle(nature: string | undefined): boolean {
  if (!nature || nature === 'nan' || nature === 'none' || nature === '') {
    return false;
  }
  const lower = nature.toLowerCase().trim();
  return GARANTIES_REELLES.some((g) => lower.includes(g));
}

function arrondir(valeur: number, decimales: number = 2): number {
  const facteur = Math.pow(10, decimales);
  return Math.round(valeur * facteur) / facteur;
}

// ─────────────────────────────────────────────────────────────────────
// CLASSIFICATION DU PORTEFEUILLE
// ─────────────────────────────────────────────────────────────────────

export function classerPortefeuille(lignes: LignePortefeuille[]): LigneAnalysee[] {
  return lignes.map((ligne) => {
    const jours = ligne.jours_retard;
    let classe_risque: ClasseRisque = 'Sain';

    if (jours >= 1 && jours <= 30) {
      classe_risque = 'Sensible (PAR 1-30)';
    } else if (jours >= 31 && jours <= 90) {
      classe_risque = 'Pré-douteux (PAR 31-90)';
    } else if (jours >= 91 && jours <= 180) {
      classe_risque = 'Douteux (PAR 91-180)';
    } else if (jours > 180) {
      classe_risque = 'Compromis (PAR >180)';
    }

    const garantie_reelle = estGarantieReelle(ligne.nature_garantie);
    let taux_provision = 0;

    const grille = GRILLE_PROVISIONNEMENT[classe_risque];
    if (grille) {
      if (grille.taux_base !== undefined) {
        taux_provision = grille.taux_base;
      } else if (classe_risque === 'Douteux (PAR 91-180)') {
        taux_provision = garantie_reelle ? (grille.taux_avec_garantie ?? 0.5) : (grille.taux_sans_garantie ?? 1.0);
      }
    }

    const provision_a_constituer = arrondir(ligne.capital_restant_du * taux_provision, 0);

    return {
      ...ligne,
      classe_risque,
      taux_provision,
      garantie_reelle,
      provision_a_constituer,
    };
  });
}

// ─────────────────────────────────────────────────────────────────────
// CALCUL DES INDICATEURS PAR
// ─────────────────────────────────────────────────────────────────────

export function calculerIndicateursPar(
  lignesAnalysees: LigneAnalysee[]
): IndicateursPortefeuille {
  const totalEncours = lignesAnalysees.reduce((acc, l) => acc + l.capital_restant_du, 0);
  const encoursRisque30 = lignesAnalysees
    .filter((l) => l.jours_retard > 30)
    .reduce((acc, l) => acc + l.capital_restant_du, 0);
  const encoursRisque90 = lignesAnalysees
    .filter((l) => l.jours_retard > 90)
    .reduce((acc, l) => acc + l.capital_restant_du, 0);
  const encoursPar1 = lignesAnalysees
    .filter((l) => l.jours_retard >= 1)
    .reduce((acc, l) => acc + l.capital_restant_du, 0);
  const totalProvisions = lignesAnalysees.reduce((acc, l) => acc + l.provision_a_constituer, 0);

  const tauxCouverture = encoursRisque30 > 0
    ? arrondir((totalProvisions / encoursRisque30) * 100)
    : 0;

  // Concentration top 10
  const sorted = [...lignesAnalysees].sort((a, b) => b.capital_restant_du - a.capital_restant_du);
  const top10 = sorted.slice(0, 10);
  const concentrationTop10 = totalEncours > 0
    ? arrondir((top10.reduce((acc, l) => acc + l.capital_restant_du, 0) / totalEncours) * 100)
    : 0;

  return {
    total_encours_portefeuille: totalEncours,
    nombre_credits_total: lignesAnalysees.length,
    PAR_1_valeur: encoursPar1,
    PAR_1_ratio: totalEncours > 0 ? arrondir((encoursPar1 / totalEncours) * 100) : 0,
    PAR_30_valeur: encoursRisque30,
    PAR_30_ratio: totalEncours > 0 ? arrondir((encoursRisque30 / totalEncours) * 100) : 0,
    PAR_90_valeur: encoursRisque90,
    PAR_90_ratio: totalEncours > 0 ? arrondir((encoursRisque90 / totalEncours) * 100) : 0,
    total_provisions_requises: totalProvisions,
    taux_couverture_provisions: tauxCouverture,
    concentration_top10_pct: concentrationTop10,
  };
}

// ─────────────────────────────────────────────────────────────────────
// MATRICE DE CLASSIFICATION
// ─────────────────────────────────────────────────────────────────────

export function construireMatrice(
  lignesAnalysees: LigneAnalysee[]
): Record<ClasseRisque, MatriceLigne> {
  const matrice: Record<string, MatriceLigne> = {};

  for (const classe of CLASSES_RISQUE) {
    const lignes = lignesAnalysees.filter((l) => l.classe_risque === classe);
    matrice[classe] = {
      Nombre_Credits: lignes.length,
      Encours_Total: lignes.reduce((acc, l) => acc + l.capital_restant_du, 0),
      Provisions_A_Constituer: arrondir(
        lignes.reduce((acc, l) => acc + l.provision_a_constituer, 0),
        0
      ),
    };
  }

  return matrice as Record<ClasseRisque, MatriceLigne>;
}

// ─────────────────────────────────────────────────────────────────────
// SCORING KHEPRA DE LA QUALITÉ
// ─────────────────────────────────────────────────────────────────────

export function calculerScoreQualite(indicateurs: IndicateursPortefeuille): ScoreQualite {
  let score = 0;
  const details: Record<string, ScoreDetail> = {};

  // PAR 30 (30%)
  const par30 = indicateurs.PAR_30_ratio;
  let scorePar30: number;
  let statutPar30: string;
  if (par30 <= SEUILS_PAR.PAR_30.alerte) {
    scorePar30 = 30;
    statutPar30 = 'EXCELLENT';
  } else if (par30 <= SEUILS_PAR.PAR_30.critique) {
    scorePar30 = 30 * (1 - (par30 - SEUILS_PAR.PAR_30.alerte) / (SEUILS_PAR.PAR_30.critique - SEUILS_PAR.PAR_30.alerte));
    statutPar30 = 'SURVEILLANCE';
  } else {
    scorePar30 = Math.max(0, 30 * (1 - par30 / 20));
    statutPar30 = 'CRITIQUE';
  }
  score += scorePar30;
  details['PAR_30'] = { poids: '30%', score: arrondir(scorePar30, 1), valeur: arrondir(par30, 2), statut: statutPar30 };

  // PAR 90 (25%)
  const par90 = indicateurs.PAR_90_ratio;
  let scorePar90: number;
  let statutPar90: string;
  if (par90 <= SEUILS_PAR.PAR_90.alerte) {
    scorePar90 = 25;
    statutPar90 = 'EXCELLENT';
  } else if (par90 <= SEUILS_PAR.PAR_90.critique) {
    scorePar90 = 25 * (1 - (par90 - SEUILS_PAR.PAR_90.alerte) / (SEUILS_PAR.PAR_90.critique - SEUILS_PAR.PAR_90.alerte));
    statutPar90 = 'SURVEILLANCE';
  } else {
    scorePar90 = Math.max(0, 25 * (1 - par90 / 10));
    statutPar90 = 'CRITIQUE';
  }
  score += scorePar90;
  details['PAR_90'] = { poids: '25%', score: arrondir(scorePar90, 1), valeur: arrondir(par90, 2), statut: statutPar90 };

  // Taux de couverture (25%)
  const couverture = indicateurs.taux_couverture_provisions;
  let scoreCouv: number;
  let statutCouv: string;
  if (couverture <= 0) {
    scoreCouv = 0;
    statutCouv = 'NON COUVERT';
  } else if (couverture >= 100) {
    scoreCouv = 25;
    statutCouv = 'EXCELLENT';
  } else if (couverture >= SEUILS_PAR.Taux_Couverture.alerte) {
    scoreCouv = 25 * (couverture / 100);
    statutCouv = 'BON';
  } else if (couverture >= SEUILS_PAR.Taux_Couverture.critique) {
    scoreCouv = 25 * (couverture / 100) * 0.7;
    statutCouv = 'INSUFFISANT';
  } else {
    scoreCouv = 25 * (couverture / 100) * 0.3;
    statutCouv = 'CRITIQUE';
  }
  score += scoreCouv;
  details['Taux_Couverture'] = { poids: '25%', score: arrondir(scoreCouv, 1), valeur: arrondir(couverture, 2), statut: statutCouv };

  // Concentration top 10 (10%)
  const concentration = indicateurs.concentration_top10_pct;
  let scoreConc: number;
  let statutConc: string;
  if (concentration <= 20) {
    scoreConc = 10;
    statutConc = 'BIEN DIVERSIFIÉ';
  } else if (concentration <= 30) {
    scoreConc = 10 * (1 - (concentration - 20) / 10);
    statutConc = 'CONCENTRATION MODÉRÉE';
  } else {
    scoreConc = Math.max(0, 10 * (1 - concentration / 50));
    statutConc = 'CONCENTRATION ÉLEVÉE';
  }
  score += scoreConc;
  details['Concentration'] = { poids: '10%', score: arrondir(scoreConc, 1), valeur: arrondir(concentration, 2), statut: statutConc };

  // PAR 1 (10%)
  const par1 = indicateurs.PAR_1_ratio;
  let scorePar1: number;
  let statutPar1: string;
  if (par1 <= 5) {
    scorePar1 = 10;
    statutPar1 = 'EXCELLENT';
  } else if (par1 <= 10) {
    scorePar1 = 10 * (1 - (par1 - 5) / 5);
    statutPar1 = 'SURVEILLANCE';
  } else {
    scorePar1 = Math.max(0, 10 * (1 - par1 / 20));
    statutPar1 = 'ALERTE';
  }
  score += scorePar1;
  details['PAR_1'] = { poids: '10%', score: arrondir(scorePar1, 1), valeur: arrondir(par1, 2), statut: statutPar1 };

  const scoreGlobal = arrondir(score, 1);

  let appreciation: string;
  if (scoreGlobal >= 85) {
    appreciation = 'EXCELLENCE — Portefeuille de qualité, provisionnement adéquat';
  } else if (scoreGlobal >= 70) {
    appreciation = 'BON — Quelques signaux faibles à surveiller';
  } else if (scoreGlobal >= 55) {
    appreciation = 'ACCEPTABLE — Renforcement du recouvrement nécessaire';
  } else if (scoreGlobal >= 40) {
    appreciation = 'INSUFFISANT — Dégradation avérée, plan d\'action urgent';
  } else {
    appreciation = 'CRITIQUE — Portefeuille en détresse, intervention immédiate requise';
  }

  return { score_global: scoreGlobal, appreciation, details };
}

// ─────────────────────────────────────────────────────────────────────
// RECOMMANDATIONS
// ─────────────────────────────────────────────────────────────────────

export function genererRecommandationsPar(indicateurs: IndicateursPortefeuille): string[] {
  const recs: string[] = [];
  const { PAR_30_ratio: par30, PAR_90_ratio: par90, taux_couverture_provisions: couverture, concentration_top10_pct: concentration } = indicateurs;

  if (par30 < 5 && par90 < 3 && couverture >= 100) {
    recs.push(
      '✅ Portefeuille sain. Maintenir la discipline de crédit, le suivi régulier des impayés, et la politique de provisionnement conservatrice. Documenter les bonnes pratiques de recouvrement pour réplication.'
    );
    return recs;
  }

  if (par90 >= SEUILS_PAR.PAR_90.critique) {
    recs.push(
      '🔴 PAR 90 CRITIQUE (>5%) : Déclencher immédiatement une task force recouvrement. Revoir la politique d\'octroi de crédit. Geler les secteurs/types de crédit les plus sinistrés. Présenter un plan d\'apurement au Conseil d\'Administration.'
    );
  } else if (par90 >= SEUILS_PAR.PAR_90.alerte) {
    recs.push(
      '🟠 PAR 90 EN SURVEILLANCE (>3%) : Renforcer l\'équipe de recouvrement. Analyser les causes racines par agence, par produit, par chargé de crédit. Mettre en place un comité hebdomadaire de suivi des impayés.'
    );
  }

  if (par30 >= SEUILS_PAR.PAR_30.critique) {
    recs.push(
      '🔴 PAR 30 CRITIQUE (>10%) : Signe avant-coureur d\'une dégradation structurelle. Auditer le processus d\'octroi. Vérifier la qualité de l\'analyse crédit. Renforcer le suivi des premiers impayés (J+1, J+3, J+7).'
    );
  } else if (par30 >= SEUILS_PAR.PAR_30.alerte) {
    recs.push(
      '🟠 PAR 30 EN SURVEILLANCE (>5%) : Intensifier le recouvrement précoce. Contacter systématiquement les clients à J+1 de retard. Analyser le portefeuille sensible par ancienneté du retard.'
    );
  }

  if (couverture < SEUILS_PAR.Taux_Couverture.critique) {
    recs.push(
      '🔴 PROVISIONNEMENT INSUFFISANT (<60%) : Constituer d\'urgence les provisions manquantes conformément à la grille COBAC. L\'insuffisance de provisionnement est un motif de sanction réglementaire. Alerter le Comité d\'Audit et des Risques.'
    );
  } else if (couverture < SEUILS_PAR.Taux_Couverture.alerte) {
    recs.push(
      '🟠 PROVISIONNEMENT À RENFORCER (<70%) : Compléter les provisions pour atteindre un taux de couverture supérieur à 70%. Revoir la classification des créances douteuses avec garantie réelle.'
    );
  }

  if (concentration >= 30) {
    recs.push(
      '🟠 CONCENTRATION ÉLEVÉE (>30% sur top 10) : Diversifier le portefeuille. Identifier les secteurs/produits/clients en surpondération. Mettre en conformité avec la norme de division des risques (≤25% FP).'
    );
  }

  return recs;
}

// ─────────────────────────────────────────────────────────────────────
// FONCTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────

export function analyserParEtProvisions(
  lignes: LignePortefeuille[]
): ResultatAnalysePar {
  const lignesAnalysees = classerPortefeuille(lignes);
  const indicateurs = calculerIndicateursPar(lignesAnalysees);
  const matrice = construireMatrice(lignesAnalysees);
  const score = calculerScoreQualite(indicateurs);
  const recommandations = genererRecommandationsPar(indicateurs);

  // Top 10 crédits
  const sorted = [...lignesAnalysees].sort(
    (a, b) => b.capital_restant_du - a.capital_restant_du
  );
  const top10 = sorted.slice(0, 10).map((l) => ({
    id_credit: l.id_credit,
    capital_restant_du: l.capital_restant_du,
    jours_retard: l.jours_retard,
    classe_risque: l.classe_risque,
  }));

  return {
    metadata: {
      outil: 'KHEPRA OS — Analyse PAR & Provisions BCEAO',
      version: '1.0.0',
      date: new Date().toISOString(),
    },
    indicateurs,
    matrice_detaillee: matrice,
    top_10_credits: top10,
    score_qualite_portefeuille: score,
    recommandations,
  };
}

// ─────────────────────────────────────────────────────────────────────
// DONNÉES DE DÉMONSTRATION
// ─────────────────────────────────────────────────────────────────────

export function genererPortefeuilleDemo(): LignePortefeuille[] {
  const nbCredits = 100; // Version réduite pour le navigateur
  const lignes: LignePortefeuille[] = [];

  const distributionCategories: Array<{
    categorie: string;
    minRetard: number;
    maxRetard: number;
  }> = [
    { categorie: 'sain', minRetard: 0, maxRetard: 0 },
    { categorie: 'sensible', minRetard: 1, maxRetard: 30 },
    { categorie: 'predouteux', minRetard: 31, maxRetard: 90 },
    { categorie: 'douteux', minRetard: 91, maxRetard: 180 },
    { categorie: 'compromis', minRetard: 181, maxRetard: 400 },
  ];

  const poids = [0.85, 0.08, 0.04, 0.02, 0.01];
  const cumulPoids = poids.reduce<number[]>((acc, p, i) => {
    acc.push((acc[i - 1] || 0) + p);
    return acc;
  }, []);

  for (let i = 0; i < nbCredits; i++) {
    const r = Math.random();
    let catIndex = 0;
    for (let j = 0; j < cumulPoids.length; j++) {
      if (r <= cumulPoids[j]) {
        catIndex = j;
        break;
      }
    }

    const cat = distributionCategories[catIndex];
    const joursRetard = cat.minRetard === cat.maxRetard
      ? 0
      : Math.floor(Math.random() * (cat.maxRetard - cat.minRetard)) + cat.minRetard;

    const montants = [150000, 500000, 1200000, 3500000, 8000000];
    const poidsMontants = [0.35, 0.30, 0.20, 0.12, 0.03];
    const r2 = Math.random();
    const cumulMontants = poidsMontants.reduce<number[]>((acc, p, idx) => {
      acc.push((acc[idx - 1] || 0) + p);
      return acc;
    }, []);
    let mIndex = 0;
    for (let j = 0; j < cumulMontants.length; j++) {
      if (r2 <= cumulMontants[j]) {
        mIndex = j;
        break;
      }
    }
    const capital = Math.max(
      50000,
      Math.round(montants[mIndex] * (0.7 + Math.random() * 0.6))
    );

    const garanties = ['reelle', 'autre/sans'];
    const natureGarantie = garanties[Math.random() < 0.3 ? 0 : 1];

    lignes.push({
      id_credit: `CRD-2026-${String(i + 1).padStart(5, '0')}`,
      capital_restant_du: capital,
      jours_retard: joursRetard,
      nature_garantie: natureGarantie,
    });
  }

  return lignes;
}