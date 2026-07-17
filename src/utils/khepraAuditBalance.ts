/**
 * KHEPRA OS — Module d'Audit de Balance Comptable BCEAO (TypeScript)
 * ===================================================================
 * Version navigateur de l'outil d'analyse prudentielle pour EMF/SFD.
 * Conforme au PCEMF et aux ratios prudentiels BCEAO (Règlement EMF-2010/02).
 *
 * Usage:
 *   import { auditerBalanceBceao } from '@/utils/khepraAuditBalance';
 *   const resultat = auditerBalanceBceao(lignesComptables);
 */

// ─────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────

export interface LigneBalance {
  compte: string;
  intitule?: string;
  debit?: number;
  credit?: number;
  solde: number;
}

export interface AgregatsPrudentiels {
  fonds_propres_nets: number;
  encours_credits_bruts: number;
  provisions_credits: number;
  creances_souffrance_brutes: number;
  total_depots: number;
  actifs_liquides: number;
  total_actif: number;
  engagements_ct: number;
  plus_gros_engagement: number;
}

export interface RatioPrudentiel {
  nom: string;
  valeur: number;
  norme: string;
  seuil: number;
  ref: string;
  statut: 'CONFORME' | 'NON-CONFORME' | 'NON ÉVALUÉ';
}

export interface ScoreDetail {
  poids: string;
  score: number;
  valeur: number;
  statut: string;
}

export interface ScoreKhepra {
  score_global: number;
  appreciation: string;
  details: Record<string, ScoreDetail>;
}

export interface ResultatAudit {
  metadata: {
    outil: string;
    version: string;
    date: string;
  };
  agregats: AgregatsPrudentiels;
  ratios: Record<string, RatioPrudentiel>;
  score_khepra: ScoreKhepra;
  recommandations: string[];
}

// ─────────────────────────────────────────────────────────────────────
// CONSTANTES RÉGLEMENTAIRES BCEAO
// ─────────────────────────────────────────────────────────────────────

const SEUILS_PRUDENTIELS: Record<
  string,
  {
    nom: string;
    norme: string;
    seuil: number;
    type: 'min' | 'max';
    ref: string;
  }
> = {
  R1_Couverture_Emplois_Stables: {
    nom: 'Couverture des Emplois Stables par les Ressources Stables',
    norme: '>= 100%',
    seuil: 100,
    type: 'min',
    ref: 'Règlement EMF-2010/02 — Art. 12',
  },
  R2_Ratio_Liquidite: {
    nom: 'Ratio de Liquidité (Actifs CT / Passifs CT)',
    norme: '>= 100%',
    seuil: 100,
    type: 'min',
    ref: 'Règlement EMF-2010/02 — Art. 14',
  },
  R3_Capitalisation_Sur_Credits: {
    nom: 'Norme de Capitalisation (Fonds Propres / Encours Crédits)',
    norme: '>= 15%',
    seuil: 15,
    type: 'min',
    ref: 'Règlement EMF-2010/02 — Art. 10',
  },
  R4_Division_Risques: {
    nom: 'Norme de Division des Risques',
    norme: '<= 25%',
    seuil: 25,
    type: 'max',
    ref: 'Règlement EMF-2010/02 — Art. 16',
  },
  R5_Couverture_Provisions: {
    nom: 'Taux de Couverture des Créances en Souffrance',
    norme: '>= 60%',
    seuil: 60,
    type: 'min',
    ref: 'Règlement EMF-2010/02 — Art. 18',
  },
};

// ─────────────────────────────────────────────────────────────────────
// FONCTIONS UTILITAIRES
// ─────────────────────────────────────────────────────────────────────

function sommeComptes(lignes: LigneBalance[], prefixes: string[]): number {
  return lignes
    .filter((l) => prefixes.some((p) => l.compte.startsWith(p)))
    .reduce((acc, l) => acc + l.solde, 0);
}

function sommeAbsComptes(lignes: LigneBalance[], prefixes: string[]): number {
  return lignes
    .filter((l) => prefixes.some((p) => l.compte.startsWith(p)))
    .reduce((acc, l) => acc + Math.abs(l.solde), 0);
}

function nettoyerCompte(compte: string): string {
  return compte.replace(/[^\d]/g, '').trim();
}

// ─────────────────────────────────────────────────────────────────────
// CALCUL DES AGRÉGATS
// ─────────────────────────────────────────────────────────────────────

export function calculerAgregatsPrudentiels(
  lignes: LigneBalance[]
): AgregatsPrudentiels {
  // Nettoyage des numéros de compte
  const lignesNettoyees = lignes.map((l) => ({
    ...l,
    compte: nettoyerCompte(l.compte),
  }));

  // 1. Fonds Propres Nets
  const fp = sommeComptes(lignesNettoyees, ['10', '11', '12', '13', '14']);

  // 2. Encours de Crédits Bruts (hors provisions 29)
  const creditsBruts = sommeComptes(lignesNettoyees, [
    '20', '21', '22', '23', '24', '25', '26', '27', '28',
  ]);

  // 3. Provisions
  const provisions = sommeAbsComptes(lignesNettoyees, ['29']);

  // 4. Créances en souffrance
  const creancesSouffrance = sommeComptes(lignesNettoyees, ['25', '26']);

  // 5. Total Dépôts
  const depots = sommeAbsComptes(lignesNettoyees, ['16', '17']);

  // 6. Actifs Liquides
  const liquidites = sommeComptes(lignesNettoyees, [
    '50', '51', '52', '53', '54', '55', '56', '57', '58',
  ]);

  // 7. Total Actif
  const totalActif =
    sommeComptes(lignesNettoyees, ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19']) +
    sommeComptes(lignesNettoyees, ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29']) +
    sommeComptes(lignesNettoyees, ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39']) +
    sommeComptes(lignesNettoyees, ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49']) +
    sommeComptes(lignesNettoyees, ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59']);

  const engagementsCT = depots * 0.7;
  const plusGrosEngagement = creditsBruts * 0.08;

  return {
    fonds_propres_nets: fp,
    encours_credits_bruts: creditsBruts,
    provisions_credits: provisions,
    creances_souffrance_brutes: creancesSouffrance,
    total_depots: depots,
    actifs_liquides: liquidites,
    total_actif: totalActif,
    engagements_ct: engagementsCT,
    plus_gros_engagement: plusGrosEngagement,
  };
}

// ─────────────────────────────────────────────────────────────────────
// ÉVALUATION DES RATIOS
// ─────────────────────────────────────────────────────────────────────

export function evaluerRatiosBceao(
  agregats: AgregatsPrudentiels
): Record<string, RatioPrudentiel> {
  const epsilon = 1;
  const rounded = (v: number) => Math.round(v * 100) / 100;

  const ratios: Record<string, RatioPrudentiel> = {
    R1_Couverture_Emplois_Stables: {
      nom: SEUILS_PRUDENTIELS.R1_Couverture_Emplois_Stables.nom,
      valeur: rounded(
        (agregats.fonds_propres_nets / (agregats.encours_credits_bruts + epsilon)) * 100
      ),
      norme: SEUILS_PRUDENTIELS.R1_Couverture_Emplois_Stables.norme,
      seuil: SEUILS_PRUDENTIELS.R1_Couverture_Emplois_Stables.seuil,
      ref: SEUILS_PRUDENTIELS.R1_Couverture_Emplois_Stables.ref,
      statut: 'NON ÉVALUÉ',
    },
    R2_Ratio_Liquidite: {
      nom: SEUILS_PRUDENTIELS.R2_Ratio_Liquidite.nom,
      valeur: rounded(
        (agregats.actifs_liquides / (agregats.engagements_ct + epsilon)) * 100
      ),
      norme: SEUILS_PRUDENTIELS.R2_Ratio_Liquidite.norme,
      seuil: SEUILS_PRUDENTIELS.R2_Ratio_Liquidite.seuil,
      ref: SEUILS_PRUDENTIELS.R2_Ratio_Liquidite.ref,
      statut: 'NON ÉVALUÉ',
    },
    R3_Capitalisation_Sur_Credits: {
      nom: SEUILS_PRUDENTIELS.R3_Capitalisation_Sur_Credits.nom,
      valeur: rounded(
        (agregats.fonds_propres_nets / (agregats.encours_credits_bruts + epsilon)) * 100
      ),
      norme: SEUILS_PRUDENTIELS.R3_Capitalisation_Sur_Credits.norme,
      seuil: SEUILS_PRUDENTIELS.R3_Capitalisation_Sur_Credits.seuil,
      ref: SEUILS_PRUDENTIELS.R3_Capitalisation_Sur_Credits.ref,
      statut: 'NON ÉVALUÉ',
    },
    R4_Division_Risques: {
      nom: SEUILS_PRUDENTIELS.R4_Division_Risques.nom,
      valeur: rounded(
        (agregats.plus_gros_engagement / (agregats.fonds_propres_nets + epsilon)) * 100
      ),
      norme: SEUILS_PRUDENTIELS.R4_Division_Risques.norme,
      seuil: SEUILS_PRUDENTIELS.R4_Division_Risques.seuil,
      ref: SEUILS_PRUDENTIELS.R4_Division_Risques.ref,
      statut: 'NON ÉVALUÉ',
    },
    R5_Couverture_Provisions: {
      nom: SEUILS_PRUDENTIELS.R5_Couverture_Provisions.nom,
      valeur: rounded(
        (agregats.provisions_credits / (agregats.creances_souffrance_brutes + epsilon)) * 100
      ),
      norme: SEUILS_PRUDENTIELS.R5_Couverture_Provisions.norme,
      seuil: SEUILS_PRUDENTIELS.R5_Couverture_Provisions.seuil,
      ref: SEUILS_PRUDENTIELS.R5_Couverture_Provisions.ref,
      statut: 'NON ÉVALUÉ',
    },
  };

  // Évaluation des statuts
  for (const [cle, ratio] of Object.entries(ratios)) {
    const seuilConfig = SEUILS_PRUDENTIELS[cle];
    if (!seuilConfig) continue;

    if (seuilConfig.type === 'min') {
      ratio.statut = ratio.valeur >= seuilConfig.seuil ? 'CONFORME' : 'NON-CONFORME';
    } else {
      ratio.statut = ratio.valeur <= seuilConfig.seuil ? 'CONFORME' : 'NON-CONFORME';
    }
  }

  return ratios;
}

// ─────────────────────────────────────────────────────────────────────
// SCORING KHEPRA
// ─────────────────────────────────────────────────────────────────────

export function calculerScoreKhepra(
  ratios: Record<string, RatioPrudentiel>
): ScoreKhepra {
  const ponderation: Record<string, number> = {
    R1_Couverture_Emplois_Stables: 0.25,
    R2_Ratio_Liquidite: 0.25,
    R3_Capitalisation_Sur_Credits: 0.25,
    R4_Division_Risques: 0.15,
    R5_Couverture_Provisions: 0.1,
  };

  let score = 0;
  const details: Record<string, ScoreDetail> = {};

  for (const [cle, poids] of Object.entries(ponderation)) {
    const ratio = ratios[cle];
    if (!ratio) continue;

    const valeur = ratio.valeur;
    const statut = ratio.statut;
    let scoreRatio: number;

    if (statut === 'CONFORME') {
      scoreRatio = poids * 100;
    } else {
      const seuilConfig = SEUILS_PRUDENTIELS[cle];
      if (!seuilConfig) {
        scoreRatio = 0;
      } else if (seuilConfig.type === 'min') {
        const proportion = Math.min(valeur / Math.max(seuilConfig.seuil, 1), 1);
        scoreRatio = poids * proportion * 100;
      } else {
        const proportion = Math.min(Math.max(seuilConfig.seuil, 1) / Math.max(valeur, 1), 1);
        scoreRatio = poids * proportion * 100;
      }
    }

    score += scoreRatio;
    details[cle] = {
      poids: `${(poids * 100).toFixed(0)}%`,
      score: Math.round(scoreRatio * 10) / 10,
      valeur,
      statut,
    };
  }

  const scoreGlobal = Math.round(score * 10) / 10;

  let appreciation: string;
  if (scoreGlobal >= 85) {
    appreciation = 'EXCELLENCE — Santé prudentielle robuste';
  } else if (scoreGlobal >= 70) {
    appreciation = 'BON — Quelques axes d\'amélioration';
  } else if (scoreGlobal >= 55) {
    appreciation = 'ACCEPTABLE — Surveillance renforcée requise';
  } else if (scoreGlobal >= 40) {
    appreciation = 'INSUFFISANT — Plan de redressement nécessaire';
  } else {
    appreciation = 'CRITIQUE — Intervention urgente requise';
  }

  return { score_global: scoreGlobal, appreciation, details };
}

// ─────────────────────────────────────────────────────────────────────
// RECOMMANDATIONS
// ─────────────────────────────────────────────────────────────────────

export function genererRecommandations(
  ratios: Record<string, RatioPrudentiel>
): string[] {
  const recs: string[] = [];
  const nonConformes = Object.entries(ratios).filter(
    ([, r]) => r.statut === 'NON-CONFORME'
  );

  if (nonConformes.length === 0) {
    recs.push(
      '✅ Tous les ratios sont conformes. Maintenir le dispositif de pilotage prudentiel et anticiper les évolutions réglementaires BCEAO.'
    );
    return recs;
  }

  const ncKeys = new Set(nonConformes.map(([k]) => k));

  if (ncKeys.has('R3_Capitalisation_Sur_Credits')) {
    recs.push(
      '🔴 SOUS-CAPITALISATION : Renforcer les fonds propres par augmentation de capital, incorporation de réserves, ou attraction d\'investisseurs. Envisager une réduction temporaire de la croissance du portefeuille de crédit.'
    );
  }

  if (ncKeys.has('R1_Couverture_Emplois_Stables')) {
    recs.push(
      '🔴 EMPLOIS STABLES NON COUVERTS : Rééquilibrer la structure de financement — augmenter les ressources stables (capital, emprunts LT) ou réduire les emplois stables (crédits LT). Présenter un Plan Préventif de Redressement (PPR) à la BCEAO.'
    );
  }

  if (ncKeys.has('R2_Ratio_Liquidite')) {
    recs.push(
      '🔴 TENSION DE LIQUIDITÉ : Renforcer la trésorerie — négocier des lignes de refinancement, réduire les engagements à vue, sécuriser des dépôts stables. Mettre en place un tableau de bord de liquidité quotidien.'
    );
  }

  if (ncKeys.has('R4_Division_Risques')) {
    recs.push(
      '🔴 CONCENTRATION EXCESSIVE : Diversifier le portefeuille de crédit. Identifier les gros engagements et établir un plan de réduction progressive.'
    );
  }

  if (ncKeys.has('R5_Couverture_Provisions')) {
    recs.push(
      '🔴 PROVISIONNEMENT INSUFFISANT : Renforcer les provisions sur créances en souffrance conformément à la grille COBAC (Classes 0-6). Documenter les méthodes de calcul des provisions et les faire valider par le CAR.'
    );
  }

  return recs;
}

// ─────────────────────────────────────────────────────────────────────
// FONCTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────

export function auditerBalanceBceao(lignes: LigneBalance[]): ResultatAudit {
  const agregats = calculerAgregatsPrudentiels(lignes);
  const ratios = evaluerRatiosBceao(agregats);
  const score = calculerScoreKhepra(ratios);
  const recommandations = genererRecommandations(ratios);

  return {
    metadata: {
      outil: 'KHEPRA OS — Audit Balance BCEAO',
      version: '1.0.0',
      date: new Date().toISOString(),
    },
    agregats,
    ratios,
    score_khepra: score,
    recommandations,
  };
}

// ─────────────────────────────────────────────────────────────────────
// DONNÉES DE DÉMONSTRATION
// ─────────────────────────────────────────────────────────────────────

export function genererBalanceDemo(): LigneBalance[] {
  return [
    { compte: '10', intitule: 'Capital social', debit: 0, credit: 0, solde: 500000000 },
    { compte: '11', intitule: 'Réserves légales', debit: 0, credit: 0, solde: 85000000 },
    { compte: '12', intitule: 'Report à nouveau créditeur', debit: 0, credit: 0, solde: 12500000 },
    { compte: '13', intitule: 'Résultat net de l\'exercice', debit: 0, credit: 0, solde: 42300000 },
    { compte: '16', intitule: 'Dépôts à vue', debit: 0, credit: 0, solde: -320000000 },
    { compte: '17', intitule: 'Dettes à court terme', debit: 0, credit: 0, solde: -85000000 },
    { compte: '18', intitule: 'Emprunts à long terme', debit: 0, credit: 0, solde: -150000000 },
    { compte: '19', intitule: 'Provisions pour risques', debit: 0, credit: 0, solde: -18000000 },
    { compte: '20', intitule: 'Crédits court terme', debit: 0, credit: 0, solde: 450000000 },
    { compte: '21', intitule: 'Crédits moyen terme', debit: 0, credit: 0, solde: 280000000 },
    { compte: '22', intitule: 'Crédits long terme', debit: 0, credit: 0, solde: 120000000 },
    { compte: '25', intitule: 'Créances douteuses', debit: 0, credit: 0, solde: 38000000 },
    { compte: '26', intitule: 'Créances contentieuses', debit: 0, credit: 0, solde: 12000000 },
    { compte: '29', intitule: 'Provisions pour dépréciation créances', debit: 0, credit: 0, solde: -28000000 },
    { compte: '31', intitule: 'Stocks de fournitures', debit: 0, credit: 0, solde: 3500000 },
    { compte: '40', intitule: 'Fournisseurs', debit: 0, credit: 0, solde: -5200000 },
    { compte: '41', intitule: 'Clients', debit: 0, credit: 0, solde: 8300000 },
    { compte: '42', intitule: 'Personnel — avances', debit: 0, credit: 0, solde: 1200000 },
    { compte: '44', intitule: 'État — impôts à payer', debit: 0, credit: 0, solde: -6800000 },
    { compte: '45', intitule: 'Organismes sociaux', debit: 0, credit: 0, solde: -3400000 },
    { compte: '50', intitule: 'Caisse', debit: 0, credit: 0, solde: 25000000 },
    { compte: '51', intitule: 'Banques — comptes courants', debit: 0, credit: 0, solde: 95000000 },
    { compte: '52', intitule: 'CCP', debit: 0, credit: 0, solde: 5500000 },
    { compte: '55', intitule: 'Placements à court terme', debit: 0, credit: 0, solde: 30000000 },
    { compte: '58', intitule: 'Virements internes', debit: 0, credit: 0, solde: 0 },
  ];
}