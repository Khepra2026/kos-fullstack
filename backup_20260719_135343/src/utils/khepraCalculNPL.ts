export interface NPLResult {
  ratio: number;
  seuil: number;
  regulateur: string;
  conforme: boolean;
  ajustementPrix: number;
  statut: 'critique' | 'surveillance' | 'conforme';
  message: string;
  recommandation: string;
}

const BCEAO_SEUIL = 70;
const COBAC_SEUIL = 70;
const BCC_SEUIL = 65;
const BCRC_SEUIL = 65;
const BCCR_SEUIL = 60;
const DEFAULT_SEUIL = 70;

export function getSeuilByRegulateur(regulateur: string): number {
  if (regulateur === 'BCEAO') return BCEAO_SEUIL;
  if (regulateur === 'COBAC') return COBAC_SEUIL;
  if (regulateur === 'BCC') return BCC_SEUIL;
  if (regulateur === 'BCRG') return BCRC_SEUIL;
  if (regulateur === 'Banque Centrale des Comores') return BCCR_SEUIL;
  return DEFAULT_SEUIL;
}

export function calculAjustementPrix(nplRatio: number, seuil: number): number {
  if (nplRatio < seuil) {
    const ecart = seuil - nplRatio;
    if (ecart > 30) return -20;
    if (ecart > 20) return -15;
    if (ecart > 10) return -10;
    return -5;
  }
  return 0;
}

export function getStatutNPL(ratio: number, seuil: number): 'critique' | 'surveillance' | 'conforme' {
  const ecart = seuil - ratio;
  if (ecart > 25) return 'critique';
  if (ecart > 0) return 'surveillance';
  return 'conforme';
}

export function getMessageNPL(statut: string, ajustement: number, regulateur: string): string {
  if (statut === 'critique') {
    return `Ratio NPL critique : ${Math.abs(ajustement)}% d'ajustement de valorisation recommandé. Pertes latentes non provisionnées — red flag majeur pour ${regulateur}.`;
  }
  if (statut === 'surveillance') {
    return `Ratio NPL sous le seuil ${regulateur}. Ajustement de valorisation de ${Math.abs(ajustement)}% recommandé. Plan de provisionnement à exiger du vendeur.`;
  }
  return `Ratio NPL conforme aux exigences ${regulateur}. Aucun ajustement de valorisation requis sur le critère NPL.`;
}

export function getRecommandation(statut: string, regulateur: string): string {
  if (statut === 'critique') {
    return `KHEPRA DD™ recommande : (1) Audit approfondi du portefeuille crédit, (2) Stress test ${regulateur}, (3) Clause de garantie de passif de 24 mois minimum.`;
  }
  if (statut === 'surveillance') {
    return `KHEPRA DD™ recommande : (1) Plan de provisionnement sur 12 mois, (2) Due diligence renforcée sur les 20 plus gros crédits, (3) Négociation d'une clause d'earn-out.`;
  }
  return `KHEPRA DD™ recommande : (1) Vérification échantillonnage des créances, (2) Revue du dispositif de recouvrement, (3) Confirmation du ratio par commissaire aux comptes indépendant.`;
}

export function evaluateNPL(ratio: number, regulateur: string): NPLResult {
  const seuil = getSeuilByRegulateur(regulateur);
  const ajustementPrix = calculAjustementPrix(ratio, seuil);
  const statut = getStatutNPL(ratio, seuil);
  const conforme = statut === 'conforme';
  const message = getMessageNPL(statut, ajustementPrix, regulateur);
  const recommandation = getRecommandation(statut, regulateur);

  return {
    ratio,
    seuil,
    regulateur,
    conforme,
    ajustementPrix,
    statut,
    message,
    recommandation,
  };
}



