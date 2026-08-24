/**
 * KHEPRA OS — Module de Stress Test Portefeuille BCEAO (TypeScript)
 * =================================================================
 * Version navigateur de l'outil de simulation de chocs sur le portefeuille
 * de crédits pour EMF/SFD. Conforme aux exigences PPR COBAC.
 *
 * Usage:
 *   import { executerStressTest } from '@/utils/khepraStressTestPortefeuille';
 *   const resultat = executerStressTest(lignes, ['par_modere', 'combine'], fp, emprunts, marge);
 */

// ─────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────

export interface LignePortefeuilleStress {
  id_credit: string;
  capital_restant_du: number;
  jours_retard: number;
  nature_garantie?: string;
  secteur?: string;
}

export type ClasseRisque =
  | 'Sain'
  | 'Sensible (PAR 1-30)'
  | 'Pré-douteux (PAR 31-90)'
  | 'Douteux (PAR 91-180)'
  | 'Compromis (PAR >180)';

export interface LigneAnalyseeStress extends LignePortefeuilleStress {
  classe_risque: ClasseRisque;
  garantie_reelle: boolean;
  taux_provision: number;
  provision: number;
}

export interface ScenarioStress {
  nom: string;
  description: string;
  intensite: number;
  migration_sain_vers_sensible: number;
  migration_sensible_vers_predouteux: number;
  migration_predouteux_vers_douteux: number;
  hausse_taux_refinancement: number;
  defaillance_sectorielle_pct: number;
  impact_garanties: number;
}

export interface IndicateursEtat {
  encours_total: number;
  provisions: number;
  PAR_30_pct: number;
  PAR_90_pct: number;
  ratio_capitalisation: number;
  fonds_propres: number;
  marge_nette?: number;
}

export interface ImpactsStress {
  hausse_provisions_fcfa: number;
  hausse_provisions_pct: number;
  erosion_fonds_propres_pct: number;
  surcout_refinancement: number;
  impact_marge_nette: number;
  resultat_net_impacte: number;
}

export interface ResultatScenario {
  scenario: string;
  intensite: number;
  avant_stress: IndicateursEtat;
  apres_stress: IndicateursEtat;
  impacts: ImpactsStress;
  seuil_rupture_atteint: boolean;
}

export interface Penalite {
  scenario: string;
  raison: string;
  penalite: number;
}

export interface ScoreResilience {
  score_global: number;
  appreciation: string;
  penalites: Penalite[];
}

export interface ResultatStressTest {
  metadata: {
    outil: string;
    version: string;
    date: string;
    fonds_propres: number;
    encours_emprunts: number;
    marge_nette: number;
  };
  scenarios_executes: string[];
  resultats: ResultatScenario[];
  score_resilience: ScoreResilience;
  recommandations: string[];
}

// ─────────────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────────────

const GARANTIES_REELLES = [
  'reelle', 'réelle', 'hypothèque', 'hypotheque', 'nantissement',
  'hypothecaire', 'hypothécaire', 'garantie_reelle', 'garantie réelle',
  'immobiliere', 'immobilière',
];

const SCENARIOS: Record<string, ScenarioStress> = {
  par_leger: {
    nom: 'Détérioration légère du PAR',
    description: 'Migration progressive : 5% des crédits sains → sensibles',
    intensite: 1,
    migration_sain_vers_sensible: 0.05,
    migration_sensible_vers_predouteux: 0.02,
    migration_predouteux_vers_douteux: 0.10,
    hausse_taux_refinancement: 0,
    defaillance_sectorielle_pct: 0,
    impact_garanties: 0,
  },
  par_modere: {
    nom: 'Détérioration modérée du PAR',
    description: 'Choc de crédit : 10% sains → sensibles, 5% → pré-douteux',
    intensite: 2,
    migration_sain_vers_sensible: 0.10,
    migration_sensible_vers_predouteux: 0.05,
    migration_predouteux_vers_douteux: 0.15,
    hausse_taux_refinancement: 0,
    defaillance_sectorielle_pct: 0,
    impact_garanties: 0,
  },
  par_severe: {
    nom: 'Détérioration sévère du PAR',
    description: 'Crise de crédit : 20% sains → sensibles, 10% → pré-douteux',
    intensite: 3,
    migration_sain_vers_sensible: 0.20,
    migration_sensible_vers_predouteux: 0.10,
    migration_predouteux_vers_douteux: 0.25,
    hausse_taux_refinancement: 0,
    defaillance_sectorielle_pct: 0,
    impact_garanties: 0,
  },
  taux_hausse_moderee: {
    nom: 'Hausse modérée des taux',
    description: 'Renchérissement du refinancement : +200bps',
    intensite: 2,
    migration_sain_vers_sensible: 0.02,
    migration_sensible_vers_predouteux: 0.01,
    migration_predouteux_vers_douteux: 0.05,
    hausse_taux_refinancement: 0.02,
    defaillance_sectorielle_pct: 0,
    impact_garanties: 0,
  },
  taux_hausse_severe: {
    nom: 'Hausse sévère des taux',
    description: 'Crise de liquidité : +500bps sur les emprunts',
    intensite: 3,
    migration_sain_vers_sensible: 0.05,
    migration_sensible_vers_predouteux: 0.03,
    migration_predouteux_vers_douteux: 0.10,
    hausse_taux_refinancement: 0.05,
    defaillance_sectorielle_pct: 0,
    impact_garanties: 0,
  },
  crise_sectorielle: {
    nom: 'Crise sectorielle',
    description: 'Défaillance d\'un secteur représentant 15% du portefeuille',
    intensite: 3,
    migration_sain_vers_sensible: 0.02,
    migration_sensible_vers_predouteux: 0.02,
    migration_predouteux_vers_douteux: 0.05,
    hausse_taux_refinancement: 0.01,
    defaillance_sectorielle_pct: 0.15,
    impact_garanties: 0.30,
  },
  combine: {
    nom: 'Choc combiné (worst case)',
    description: 'Scénario catastrophe : PAR + taux + crise sectorielle simultanés',
    intensite: 4,
    migration_sain_vers_sensible: 0.15,
    migration_sensible_vers_predouteux: 0.08,
    migration_predouteux_vers_douteux: 0.20,
    hausse_taux_refinancement: 0.04,
    defaillance_sectorielle_pct: 0.10,
    impact_garanties: 0.20,
  },
};

// ─────────────────────────────────────────────────────────────────────
// FONCTIONS UTILITAIRES
// ─────────────────────────────────────────────────────────────────────

function estGarantieReelle(nature: string | undefined): boolean {
  if (!nature || nature === 'nan' || nature === 'none' || nature === '') return false;
  const lower = nature.toLowerCase().trim();
  return GARANTIES_REELLES.some((g) => lower.includes(g));
}

function arrondir(v: number, d: number = 2): number {
  const f = Math.pow(10, d);
  return Math.round(v * f) / f;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

// ─────────────────────────────────────────────────────────────────────
// CLASSIFICATION ET PROVISIONS
// ─────────────────────────────────────────────────────────────────────

export function classifierPortefeuille(
  lignes: LignePortefeuilleStress[]
): LigneAnalyseeStress[] {
  return lignes.map((l) => {
    const j = l.jours_retard;
    let classe_risque: ClasseRisque = 'Sain';

    if (j >= 1 && j <= 30) classe_risque = 'Sensible (PAR 1-30)';
    else if (j >= 31 && j <= 90) classe_risque = 'Pré-douteux (PAR 31-90)';
    else if (j >= 91 && j <= 180) classe_risque = 'Douteux (PAR 91-180)';
    else if (j > 180) classe_risque = 'Compromis (PAR >180)';

    const garantie_reelle = estGarantieReelle(l.nature_garantie);
    let taux_provision = 0;

    switch (classe_risque) {
      case 'Sensible (PAR 1-30)':
        taux_provision = 0;
        break;
      case 'Pré-douteux (PAR 31-90)':
        taux_provision = 0.4;
        break;
      case 'Douteux (PAR 91-180)':
        taux_provision = garantie_reelle ? 0.5 : 1.0;
        break;
      case 'Compromis (PAR >180)':
        taux_provision = 1.0;
        break;
    }

    return {
      ...l,
      classe_risque,
      garantie_reelle,
      taux_provision,
      provision: arrondir(l.capital_restant_du * taux_provision, 0),
    };
  });
}

// ─────────────────────────────────────────────────────────────────────
// CALCUL DES INDICATEURS D'ÉTAT
// ─────────────────────────────────────────────────────────────────────

export function calculerIndicateursEtat(
  lignes: LigneAnalyseeStress[],
  fonds_propres: number,
  marge_nette: number = 0
): IndicateursEtat {
  const encours_total = lignes.reduce((acc, l) => acc + l.capital_restant_du, 0);
  const provisions = lignes.reduce((acc, l) => acc + l.provision, 0);
  const par30 = lignes.filter((l) => l.jours_retard > 30).reduce((acc, l) => acc + l.capital_restant_du, 0);
  const par90 = lignes.filter((l) => l.jours_retard > 90).reduce((acc, l) => acc + l.capital_restant_du, 0);

  return {
    encours_total,
    provisions,
    PAR_30_pct: encours_total > 0 ? arrondir((par30 / encours_total) * 100) : 0,
    PAR_90_pct: encours_total > 0 ? arrondir((par90 / encours_total) * 100) : 0,
    ratio_capitalisation: encours_total > 0 ? arrondir((fonds_propres / encours_total) * 100) : 0,
    fonds_propres,
    marge_nette,
  };
}

// ─────────────────────────────────────────────────────────────────────
// APPLICATION D'UN SCÉNARIO DE STRESS
// ─────────────────────────────────────────────────────────────────────

export function appliquerScenarioStress(
  lignes: LigneAnalyseeStress[],
  scenario: ScenarioStress,
  fonds_propres: number,
  encours_emprunts: number,
  marge_nette: number
): ResultatScenario {
  // Deep clone
  const lignesStress: LigneAnalyseeStress[] = lignes.map((l) => ({ ...l, classe_initiale: l.classe_risque }));

  // Migration sain → sensible
  const sains = lignesStress.filter((l) => l.classe_risque === 'Sain');
  const nbMigrationSain = Math.floor(sains.length * scenario.migration_sain_vers_sensible);
  for (let i = 0; i < Math.min(nbMigrationSain, sains.length); i++) {
    sains[i].classe_risque = 'Sensible (PAR 1-30)';
    sains[i].jours_retard = randomInt(1, 31);
  }

  // Migration sensible → pré-douteux
  const sensibles = lignesStress.filter((l) => l.classe_risque === 'Sensible (PAR 1-30)');
  const nbMigrationSensible = Math.floor(sensibles.length * scenario.migration_sensible_vers_predouteux);
  for (let i = 0; i < Math.min(nbMigrationSensible, sensibles.length); i++) {
    sensibles[i].classe_risque = 'Pré-douteux (PAR 31-90)';
    sensibles[i].jours_retard = randomInt(31, 91);
  }

  // Migration pré-douteux → douteux
  const predouteux = lignesStress.filter((l) => l.classe_risque === 'Pré-douteux (PAR 31-90)');
  const nbMigrationPredouteux = Math.floor(predouteux.length * scenario.migration_predouteux_vers_douteux);
  for (let i = 0; i < Math.min(nbMigrationPredouteux, predouteux.length); i++) {
    predouteux[i].classe_risque = 'Douteux (PAR 91-180)';
    predouteux[i].jours_retard = randomInt(91, 181);
  }

  // Crise sectorielle
  if (scenario.defaillance_sectorielle_pct > 0) {
    const secteurs = new Map<string, number>();
    for (const l of lignesStress) {
      const s = l.secteur || 'Non spécifié';
      secteurs.set(s, (secteurs.get(s) || 0) + l.capital_restant_du);
    }
    let secteurMax = '';
    let encoursMax = 0;
    for (const [s, e] of secteurs) {
      if (e > encoursMax) { encoursMax = e; secteurMax = s; }
    }

    const totalEncours = lignesStress.reduce((acc, l) => acc + l.capital_restant_du, 0);
    const fractionDefaut = Math.min(
      (scenario.defaillance_sectorielle_pct * totalEncours) / Math.max(encoursMax, 1),
      1
    );

    const lignesSecteur = lignesStress.filter((l) => (l.secteur || 'Non spécifié') === secteurMax);
    const nbDefaillance = Math.floor(lignesSecteur.length * fractionDefaut);
    const split = Math.floor(nbDefaillance * 0.6);

    for (let i = 0; i < Math.min(nbDefaillance, lignesSecteur.length); i++) {
      if (i < split) {
        lignesSecteur[i].classe_risque = 'Douteux (PAR 91-180)';
        lignesSecteur[i].jours_retard = randomInt(91, 181);
      } else {
        lignesSecteur[i].classe_risque = 'Compromis (PAR >180)';
        lignesSecteur[i].jours_retard = randomInt(181, 400);
      }
    }
  }

  // Recalcul provisions
  for (const l of lignesStress) {
    const garantie_reelle = estGarantieReelle(l.nature_garantie);
    l.garantie_reelle = garantie_reelle;
    let taux = 0;
    switch (l.classe_risque) {
      case 'Sensible (PAR 1-30)': taux = 0; break;
      case 'Pré-douteux (PAR 31-90)': taux = 0.4; break;
      case 'Douteux (PAR 91-180)': taux = garantie_reelle ? 0.5 : 1.0; break;
      case 'Compromis (PAR >180)': taux = 1.0; break;
    }
    l.taux_provision = taux;
    l.provision = arrondir(l.capital_restant_du * taux, 0);
  }

  // État avant
  const avant = calculerIndicateursEtat(lignes, fonds_propres, marge_nette);

  // État après
  const provisionsApres = lignesStress.reduce((acc, l) => acc + l.provision, 0);
  const fpApres = fonds_propres - (provisionsApres - avant.provisions);
  const apres = calculerIndicateursEtat(lignesStress, fpApres);

  // Impacts
  const hausseProvisions = provisionsApres - avant.provisions;
  const surcoutRefinancement = encours_emprunts * scenario.hausse_taux_refinancement;
  const resultatNetImpacte = marge_nette - hausseProvisions - surcoutRefinancement;

  const impacts: ImpactsStress = {
    hausse_provisions_fcfa: arrondir(hausseProvisions, 0),
    hausse_provisions_pct: avant.provisions > 0 ? arrondir((hausseProvisions / avant.provisions) * 100) : 0,
    erosion_fonds_propres_pct: fonds_propres > 0 ? arrondir((hausseProvisions / fonds_propres) * 100) : 0,
    surcout_refinancement: arrondir(surcoutRefinancement, 0),
    impact_marge_nette: arrondir(surcoutRefinancement, 0),
    resultat_net_impacte: arrondir(resultatNetImpacte, 0),
  };

  return {
    scenario: scenario.nom,
    intensite: scenario.intensite,
    avant_stress: avant,
    apres_stress: apres,
    impacts,
    seuil_rupture_atteint: fpApres <= 0,
  };
}

// ─────────────────────────────────────────────────────────────────────
// SCORING DE RÉSILIENCE
// ─────────────────────────────────────────────────────────────────────

export function calculerScoreResilience(resultats: ResultatScenario[]): ScoreResilience {
  if (resultats.length === 0) {
    return { score_global: 100, appreciation: 'Non évalué', penalites: [] };
  }

  let score = 100;
  const penalites: Penalite[] = [];

  for (const r of resultats) {
    const poids = r.intensite / 4;
    const impacts = r.impacts;

    if (r.seuil_rupture_atteint) {
      penalites.push({
        scenario: r.scenario,
        raison: 'Rupture — Fonds propres négatifs',
        penalite: 30 * poids,
      });
      continue;
    }

    const erosion = impacts.erosion_fonds_propres_pct;
    if (erosion > 50) {
      penalites.push({ scenario: r.scenario, raison: `Érosion FP > 50% (${erosion.toFixed(1)}%)`, penalite: 25 * poids });
    } else if (erosion > 30) {
      penalites.push({ scenario: r.scenario, raison: `Érosion FP > 30% (${erosion.toFixed(1)}%)`, penalite: 15 * poids });
    } else if (erosion > 15) {
      penalites.push({ scenario: r.scenario, raison: `Érosion FP > 15% (${erosion.toFixed(1)}%)`, penalite: 8 * poids });
    }

    const par90 = r.apres_stress.PAR_90_pct;
    if (par90 > 15) {
      penalites.push({ scenario: r.scenario, raison: `PAR 90 post-stress > 15% (${par90.toFixed(1)}%)`, penalite: 15 * poids });
    } else if (par90 > 10) {
      penalites.push({ scenario: r.scenario, raison: `PAR 90 post-stress > 10% (${par90.toFixed(1)}%)`, penalite: 10 * poids });
    } else if (par90 > 5) {
      penalites.push({ scenario: r.scenario, raison: `PAR 90 post-stress > 5% (${par90.toFixed(1)}%)`, penalite: 5 * poids });
    }

    const ratioCap = r.apres_stress.ratio_capitalisation;
    if (ratioCap < 5) {
      penalites.push({ scenario: r.scenario, raison: `Ratio capitalisation < 5% (${ratioCap.toFixed(1)}%)`, penalite: 15 * poids });
    } else if (ratioCap < 10) {
      penalites.push({ scenario: r.scenario, raison: `Ratio capitalisation < 10% (${ratioCap.toFixed(1)}%)`, penalite: 8 * poids });
    }
  }

  for (const p of penalites) {
    score -= p.penalite;
  }

  score = Math.max(0, Math.min(100, arrondir(score, 1)));

  let appreciation: string;
  if (score >= 80) appreciation = 'EXCELLENTE — L\'IMF résiste bien aux chocs simulés.';
  else if (score >= 65) appreciation = 'BONNE — Résilience correcte mais des vulnérabilités apparaissent.';
  else if (score >= 50) appreciation = 'MODÉRÉE — Des mesures de renforcement sont nécessaires.';
  else if (score >= 35) appreciation = 'FAIBLE — L\'IMF est vulnérable. Un PPR doit être activé.';
  else appreciation = 'CRITIQUE — L\'IMF ne résiste à aucun choc significatif.';

  return { score_global: score, appreciation, penalites };
}

// ─────────────────────────────────────────────────────────────────────
// RECOMMANDATIONS
// ─────────────────────────────────────────────────────────────────────

export function genererRecommandationsStress(
  resultats: ResultatScenario[],
  score: ScoreResilience
): string[] {
  const recs: string[] = [];

  if (score.score_global >= 80) {
    recs.push('✅ Bonne résilience globale. Maintenir le niveau de fonds propres et actualiser le stress test annuellement.');
    return recs;
  }

  const critiques = resultats.filter((r) => r.seuil_rupture_atteint);
  if (critiques.length > 0) {
    const noms = critiques.map((r) => r.scenario).join(', ');
    recs.push(`🔴 RUPTURE DÉTECTÉE sous : ${noms}. Renforcer d'urgence les fonds propres et présenter un PPR actualisé.`);
  }

  const erosionsFortes = resultats.filter((r) => r.impacts.erosion_fonds_propres_pct > 30);
  if (erosionsFortes.length > 0) {
    recs.push('🟠 ÉROSION SIGNIFICATIVE DES FP : Renforcer le coussin de capital. Plafonner la croissance du portefeuille.');
  }

  const par90Eleves = resultats.filter((r) => r.apres_stress.PAR_90_pct > 10);
  if (par90Eleves.length > 0) {
    recs.push('🟠 PAR 90 POST-STRESS ÉLEVÉ : Renforcer le recouvrement et diversifier le portefeuille.');
  }

  const capFaible = resultats.filter((r) => r.apres_stress.ratio_capitalisation < 10);
  if (capFaible.length > 0) {
    recs.push('🟠 RATIO DE CAPITALISATION SOUS LE SEUIL POST-STRESS : Plan de recapitalisation nécessaire.');
  }

  return recs;
}

// ─────────────────────────────────────────────────────────────────────
// FONCTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────

export function executerStressTest(
  lignes: LignePortefeuilleStress[],
  scenariosNoms: string[],
  fonds_propres: number,
  encours_emprunts: number,
  marge_nette: number
): ResultatStressTest {
  const lignesAnalysees = classifierPortefeuille(lignes);
  const resultats: ResultatScenario[] = [];

  for (const nom of scenariosNoms) {
    const scenario = SCENARIOS[nom];
    if (!scenario) continue;
    resultats.push(
      appliquerScenarioStress(lignesAnalysees, scenario, fonds_propres, encours_emprunts, marge_nette)
    );
  }

  const score = calculerScoreResilience(resultats);
  const recommandations = genererRecommandationsStress(resultats, score);

  return {
    metadata: {
      outil: 'KHEPRA OS — Stress Test Portefeuille BCEAO',
      version: '1.0.0',
      date: new Date().toISOString(),
      fonds_propres,
      encours_emprunts,
      marge_nette,
    },
    scenarios_executes: scenariosNoms,
    resultats,
    score_resilience: score,
    recommandations,
  };
}

// ─────────────────────────────────────────────────────────────────────
// DONNÉES DE DÉMONSTRATION
// ─────────────────────────────────────────────────────────────────────

export function genererPortefeuilleStressDemo(): LignePortefeuilleStress[] {
  const nbCredits = 100;
  const lignes: LignePortefeuilleStress[] = [];
  const secteurs = ['Commerce', 'Agriculture', 'Services', 'Transport', 'Artisanat'];

  const poidsCategories = [0.85, 0.08, 0.04, 0.02, 0.01];
  const categories = [
    { minRetard: 0, maxRetard: 0 },
    { minRetard: 1, maxRetard: 30 },
    { minRetard: 31, maxRetard: 90 },
    { minRetard: 91, maxRetard: 180 },
    { minRetard: 181, maxRetard: 400 },
  ];

  for (let i = 0; i < nbCredits; i++) {
    const r = Math.random();
    let cumul = 0;
    let catIndex = 0;
    for (let j = 0; j < poidsCategories.length; j++) {
      cumul += poidsCategories[j];
      if (r <= cumul) { catIndex = j; break; }
    }
    const cat = categories[catIndex];
    const joursRetard = cat.minRetard === cat.maxRetard ? 0 : randomInt(cat.minRetard, cat.maxRetard);

    const montants = [150000, 500000, 1200000, 3500000, 8000000];
    const montant = montants[Math.floor(Math.random() * montants.length)];
    const capital = Math.max(50000, Math.round(montant * (0.7 + Math.random() * 0.6)));

    lignes.push({
      id_credit: `CRD-2026-${String(i + 1).padStart(5, '0')}`,
      capital_restant_du: capital,
      jours_retard: joursRetard,
      nature_garantie: Math.random() < 0.35 ? 'reelle' : 'autre/sans',
      secteur: secteurs[Math.floor(Math.random() * secteurs.length)],
    });
  }

  return lignes;
}



