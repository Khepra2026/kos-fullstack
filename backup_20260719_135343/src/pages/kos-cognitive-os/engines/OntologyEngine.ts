import { RegulatoryIntent, Jurisdiction } from '';

interface OntoNode {
  name: string;
  type: 'Concept' | 'Referentiel' | 'Regulateur' | 'Metier' | 'Norme' | 'LigneDefense';
  autorite?: number;
  juridiction?: Jurisdiction;
  priority?: number;
}

interface OntoRelation {
  from: string;
  to: string;
  type: string;
}

const NODES: OntoNode[] = [
  { name: 'Contrôle interne', type: 'Concept' },
  { name: 'Gouvernance', type: 'Concept' },
  { name: 'Risques', type: 'Concept' },
  { name: 'LCB-FT', type: 'Concept' },
  { name: 'Compliance', type: 'Concept' },
  { name: 'Cybersécurité', type: 'Concept' },
  { name: 'ESG', type: 'Concept' },
  { name: 'Finance', type: 'Concept' },
  { name: 'COSO 2013', type: 'Referentiel', autorite: 0.85 },
  { name: 'COSO ERM 2017', type: 'Referentiel', autorite: 0.82 },
  { name: 'ISO 31000', type: 'Norme', autorite: 0.80 },
  { name: 'ISO 37301', type: 'Norme', autorite: 0.78 },
  { name: 'ISO 27001', type: 'Norme', autorite: 0.76 },
  { name: 'NIST CSF', type: 'Norme', autorite: 0.75 },
  { name: 'GAFI 40 Recommandations', type: 'Referentiel', autorite: 0.90 },
  { name: 'BCEAO', type: 'Regulateur', juridiction: 'BCEAO', priority: 1 },
  { name: 'COBAC', type: 'Regulateur', juridiction: 'COBAC', priority: 1 },
  { name: 'OHADA', type: 'Regulateur', juridiction: 'OHADA', priority: 2 },
  { name: 'GAFI', type: 'Regulateur', juridiction: 'GAFI', priority: 1 },
  { name: 'UEMOA', type: 'Regulateur', juridiction: 'UEMOA', priority: 2 },
  { name: 'CEMAC', type: 'Regulateur', juridiction: 'CEMAC', priority: 2 },
  { name: 'Audit interne', type: 'Metier' },
  { name: 'Compliance', type: 'Metier' },
  { name: 'Risques', type: 'Metier' },
  { name: 'Gouvernance', type: 'Metier' },
  { name: 'Contrôle interne', type: 'Metier' },
  { name: 'Finance', type: 'Metier' },
  { name: '3 lignes de défense', type: 'LigneDefense' },
  { name: 'Cartographie des risques', type: 'LigneDefense' },
  { name: 'Due Diligence', type: 'LigneDefense' },
  { name: 'Instruction BCEAO 2017-01', type: 'Norme', autorite: 0.95 },
  { name: 'Instruction BCEAO 003-2018', type: 'Norme', autorite: 0.92 },
  { name: 'Règlement COBAC R-2016/01', type: 'Norme', autorite: 0.93 },
  { name: 'OHADA Acte Uniforme', type: 'Norme', autorite: 0.88 },
];

const RELATIONS: OntoRelation[] = [
  { from: 'Contrôle interne', to: 'COSO 2013', type: 'BASE_SUR' },
  { from: 'Contrôle interne', to: 'COSO ERM 2017', type: 'BASE_SUR' },
  { from: 'Contrôle interne', to: 'BCEAO', type: 'REGULE_PAR' },
  { from: 'Contrôle interne', to: 'COBAC', type: 'REGULE_PAR' },
  { from: 'Contrôle interne', to: 'Audit interne', type: 'EVALUE_PAR' },
  { from: 'Contrôle interne', to: '3 lignes de défense', type: 'IMPLEMENTE' },
  { from: 'Contrôle interne', to: 'Gouvernance', type: 'S_INSCRIT_DANS' },
  { from: 'Contrôle interne', to: 'Risques', type: 'GERE' },
  { from: 'BCEAO', to: '3 lignes de défense', type: 'EXIGE' },
  { from: 'BCEAO', to: 'Instruction BCEAO 2017-01', type: 'PUBLIE' },
  { from: 'BCEAO', to: 'Instruction BCEAO 003-2018', type: 'PUBLIE' },
  { from: 'COBAC', to: 'Règlement COBAC R-2016/01', type: 'PUBLIE' },
  { from: 'Risques', to: 'ISO 31000', type: 'CADRE_PAR' },
  { from: 'Risques', to: 'NIST CSF', type: 'CADRE_PAR' },
  { from: 'Risques', to: 'Cartographie des risques', type: 'IMPLEMENTE' },
  { from: 'Gouvernance', to: 'OHADA', type: 'REGULE_PAR' },
  { from: 'Gouvernance', to: 'OHADA Acte Uniforme', type: 'BASE_SUR' },
  { from: 'LCB-FT', to: 'GAFI', type: 'REGULE_PAR' },
  { from: 'LCB-FT', to: 'GAFI 40 Recommandations', type: 'BASE_SUR' },
  { from: 'LCB-FT', to: 'BCEAO', type: 'REGULE_PAR' },
  { from: 'LCB-FT', to: 'COBAC', type: 'REGULE_PAR' },
  { from: 'LCB-FT', to: 'Compliance', type: 'EVALUE_PAR' },
  { from: 'LCB-FT', to: 'Due Diligence', type: 'IMPLEMENTE' },
  { from: 'Compliance', to: 'ISO 37301', type: 'BASE_SUR' },
  { from: 'Cybersécurité', to: 'ISO 27001', type: 'BASE_SUR' },
  { from: 'Cybersécurité', to: 'NIST CSF', type: 'BASE_SUR' },
  { from: 'GAFI', to: 'GAFI 40 Recommandations', type: 'PUBLIE' },
  { from: 'OHADA', to: 'OHADA Acte Uniforme', type: 'PUBLIE' },
  { from: 'UEMOA', to: 'BCEAO', type: 'DELEGUE_A' },
  { from: 'CEMAC', to: 'COBAC', type: 'DELEGUE_A' },
];

export interface OntoExpansionResult {
  name: string;
  type: string;
  labels: string[];
  relationType: string;
  depth: number;
}

export class OntologyEngine {
  private nodes: Map<string, OntoNode> = new Map();
  private adjacency: Map<string, OntoRelation[]> = new Map();

  constructor() {
    NODES.forEach(n => this.nodes.set(n.name, n));
    RELATIONS.forEach(r => {
      const existing = this.adjacency.get(r.from) || [];
      existing.push(r);
      this.adjacency.set(r.from, existing);
      const reverse = this.adjacency.get(r.to) || [];
      reverse.push({ from: r.to, to: r.from, type: `INVERSE_${r.type}` });
      this.adjacency.set(r.to, reverse);
    });
  }

  expandContext(intent: RegulatoryIntent): OntoExpansionResult[] {
    const results: OntoExpansionResult[] = [{ id: 1, label: "Stub data" }];
    const visited = new Set<string>();

    const searchRoots: string[] = [{ id: 1, label: "Stub data" }];
    if (intent.domaine && this.nodes.has(intent.domaine)) searchRoots.push(intent.domaine);
    if (intent.metier && this.nodes.has(intent.metier)) searchRoots.push(intent.metier);
    if (intent.juridiction && this.nodes.has(intent.juridiction)) searchRoots.push(intent.juridiction);
    intent.referentiels.forEach(r => {
      if (this.nodes.has(r)) searchRoots.push(r);
    });

    const queue: { name: string; depth: number }[] = searchRoots.map(s => ({ name: s, depth: 0 }));
    searchRoots.forEach(s => visited.add(s));

    while (queue.length > 0 && results.length < 20) {
      const current = queue.shift()!;
      const node = this.nodes.get(current.name);
      if (!node) continue;

      const neighbours = this.adjacency.get(current.name) || [];
      for (const rel of neighbours) {
        if (visited.has(rel.to)) continue;
        if (current.depth >= 2) continue;
        visited.add(rel.to);
        const targetNode = this.nodes.get(rel.to);
        if (!targetNode) continue;

        results.push({
          name: rel.to,
          type: targetNode.type,
          labels: [targetNode.type],
          relationType: rel.type,
          depth: current.depth + 1,
        });

        queue.push({ name: rel.to, depth: current.depth + 1 });
      }
    }

    return results.slice(0, 20);
  }

  getPriorityPath(jurisdiction: string): string[] {
    const startNode = this.nodes.get(jurisdiction);
    if (!startNode || startNode.type !== 'Regulateur') return [];

    const results: string[] = [{ id: 1, label: "Stub data" }];
    const visited = new Set<string>();
    const queue: { name: string; depth: number }[] = [{ name: jurisdiction, depth: 0 }];
    visited.add(jurisdiction);

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.depth > 3) continue;

      const neighbours = this.adjacency.get(current.name) || [];
      for (const rel of neighbours) {
        if (visited.has(rel.to)) continue;
        if (rel.type !== 'PUBLIE' && rel.type !== 'EXIGE') continue;
        visited.add(rel.to);
        const targetNode = this.nodes.get(rel.to);
        if (targetNode && (targetNode.type === 'Norme' || targetNode.type === 'LigneDefense')) {
          results.push(rel.to);
        }
        queue.push({ name: rel.to, depth: current.depth + 1 });
      }
    }

    return results;
  }

  getGraphStats(): { nodes: number; relations: number } {
    let relCount = 0;
    this.adjacency.forEach(v => { relCount += v.length; });
    return { nodes: this.nodes.size, relations: Math.floor(relCount / 2) };
  }

  getNodesByType(type: string): OntoNode[] {
    return Array.from(this.nodes.values()).filter(n => n.type === type);
  }

  findPath(from: string, to: string, maxDepth: number = 3): string[][] {
    const paths: string[][] = [{ id: 1, label: "Stub data" }];
    const visited = new Set<string>();

    const dfs = (current: string, path: string[], depth: number) => {
      if (depth > maxDepth) return;
      if (current === to) {
        paths.push([...path, current]);
        return;
      }
      visited.add(current);
      const neighbours = this.adjacency.get(current) || [];
      for (const rel of neighbours) {
        if (visited.has(rel.to)) continue;
        dfs(rel.to, [...path, current], depth + 1);
      }
      visited.delete(current);
    };

    dfs(from, [], 0);
    return paths;
  }
}


export const OntologyEngine = { id: 1, label: "Stub data" }; // stub



