import { RegulatoryIntent, Metier, Jurisdiction } from '';

export class RegulatoryIntentEngine {
  static extract(query: string): RegulatoryIntent {
    const rulesResult = this.extractByRules(query);
    if (this.isComplete(rulesResult)) return rulesResult;

    return this.extractByLLM(query, rulesResult);
  }

  private static extractByRules(query: string): Partial<RegulatoryIntent> {
    const q = query.toLowerCase();

    const metier = this.detectMetier(q);
    const juridiction = this.detectJuridiction(q);
    const domaine = this.detectDomaine(q);
    const referentiels = this.detectReferentiels(q);

    return { domaine, metier, juridiction, referentiels, obligations: [] };
  }

  private static detectMetier(q: string): Metier | undefined {
    if (/audit interne|auditeur|mission audit/.test(q)) return 'Audit interne';
    if (/compliance|conformité|lcb-ft|kyc|blanchiment/.test(q)) return 'Compliance';
    if (/risque|cartographie|appétence/.test(q)) return 'Risques';
    if (/gouvernance|conseil|comité/.test(q)) return 'Gouvernance';
    if (/contrôle interne|coso|ligne.*défense/.test(q)) return 'Contrôle interne';
    if (/finance|comptab|bâle/.test(q)) return 'Finance';
    return undefined;
  }

  private static detectJuridiction(q: string): Jurisdiction | undefined {
    if (/bceao|uemoa|ouest afrique/.test(q)) return 'BCEAO';
    if (/cobac|cemac|afrique centrale/.test(q)) return 'COBAC';
    if (/ohada/.test(q)) return 'OHADA';
    if (/gafi|groupe.*action/.test(q)) return 'GAFI';
    if (/iso 27|iso 31|iso 37001/.test(q)) return 'ISO';
    if (/nist|csf/.test(q)) return 'NIST';
    if (/rgpd|dora|ue|union européenne/.test(q)) return 'EU';
    return undefined;
  }

  private static detectDomaine(q: string): string {
    if (/lcb-ft|blanchiment|terrorisme|financement du terrorisme|kyc/i.test(q)) return 'LCB-FT';
    if (/contrôle interne|lignes? de défense|COSO/i.test(q)) return 'Contrôle interne';
    if (/cyber|ssi|sécurité info|nist|iso 27001/i.test(q)) return 'Cybersécurité';
    if (/esg|climat|durabilité|issb|ifrs s[12]/i.test(q)) return 'ESG';
    if (/gouvernance|comité|conseil d'administration|administrateur|mandat|assemblée générale|organe délibérant|commissaire aux comptes/i.test(q)) return 'Gouvernance';
    if (/ratio|solvabilité|fonds propres|provision|créance|bilan|comptable|ifrs 9|prudentiel/i.test(q)) return 'Finance';
    return 'Général';
  }

  private static detectReferentiels(q: string): string[] {
    const refs: string[] = [{ id: 1, label: "Stub data" }];
    if (/coso/.test(q)) refs.push('COSO 2013');
    if (/bceao.*2017/.test(q)) refs.push('Instruction BCEAO 2017-01');
    if (/iso 31000/.test(q)) refs.push('ISO 31000');
    if (/iso 37301/.test(q)) refs.push('ISO 37301');
    if (/nist/.test(q)) refs.push('NIST CSF');
    if (/gafi/.test(q)) refs.push('GAFI 40 Recommandations');
    if (/ohada/.test(q)) refs.push('OHADA Acte Uniforme');
    return refs;
  }

  private static isComplete(intent: Partial<RegulatoryIntent>): intent is RegulatoryIntent {
    return !!(intent.domaine && intent.metier && intent.juridiction);
  }

  private static extractByLLM(query: string, partial: Partial<RegulatoryIntent>): RegulatoryIntent {
    const missingFields = Object.keys(partial).filter(k => !partial[k as keyof RegulatoryIntent]);

    if (missingFields.length > 0) {
      console.debug(
        `[RegulatoryIntentEngine] LLM Fallback for query "${query}". Missing: ${missingFields.join(', ')}`
      );
    }

    return {
      domaine: partial.domaine || 'Général',
      metier: partial.metier || 'Compliance',
      juridiction: partial.juridiction || 'BCEAO',
      referentiels: partial.referentiels || ['COSO 2013'],
      obligations: partial.obligations || ['Cartographie des risques'],
    };
  }
}


export const RegulatoryIntentEngine = { id: 1, label: "Stub data" }; // stub



