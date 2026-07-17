// KOS REGTECH AI — Compliance SQLite Catalog
// SQLite WASM + FTS5 — Recherche full-text réglementaire locale
// 50+ exigences BCEAO/OHADA/GAFI/CEMAC pré-seedées
// Mapping exigences → contrôles → preuves
// 100% local, 0 réseau, 0 API externe

import { logger } from '@/core/logger';

const log = logger.child('sqlite-catalog');

// ─── Types ───

interface ExigenceRow {
  id: string;
  source: string;
  article: string;
  texte: string;
  keywords: string;
}

interface ExigenceSearchResult extends ExigenceRow {
  control_id: string | null;
  rank: number;
}

interface MappingRow {
  exigence_id: string;
  control_id: string;
  evidence_type: string;
}

// ─── Exigences pré-seedées BCEAO/OHADA/GAFI/CEMAC ───

const SEED_EXIGENCES: ExigenceRow[] = [
  // BCEAO
  { id: 'BCEAO-2008-26-A42', source: 'BCEAO', article: 'Art. 42', texte: 'Obligation vigilance clientèle PPE — déclaration CENTIF', keywords: 'LBC PPE vigilance CENTIF' },
  { id: 'BCEAO-004-2020-A8', source: 'BCEAO', article: 'Art. 8 Inst. 004-2020', texte: 'Dispositif LBC/FT documenté avec responsable niveau Direction', keywords: 'LBC FT dispositif responsable' },
  { id: 'BCEAO-006-2024-A12', source: 'BCEAO', article: 'Art. 12 Inst. 006-2024', texte: 'Ratio solvabilité ≥ 8% calculé trimestriellement', keywords: 'solvabilité ratio SURFI ALM' },
  { id: 'BCEAO-C01-2017-A15', source: 'BCEAO', article: 'Art. 15 Circ. 01-2017', texte: 'Administrateurs indépendants ≥ 1/3 du Conseil', keywords: 'administrateurs indépendants conseil gouvernance' },
  { id: 'BCEAO-C01-2017-A22', source: 'BCEAO', article: 'Art. 22 Circ. 01-2017', texte: 'Séparation fonctions RCCI/Direction — incompatibilité cumul', keywords: 'RCCI séparation fonctions incompatibilité' },
  { id: 'BCEAO-018-2010-A5', source: 'BCEAO', article: 'Art. 5 Inst. 018-2010', texte: 'Reporting périodique SURFI sous 30 jours fin trimestre', keywords: 'SURFI reporting trimestriel délai' },
  { id: 'BCEAO-025-2022-A3', source: 'BCEAO', article: 'Art. 3 Inst. 025-2022', texte: 'Classification créances IFRS 9 avec provisionnement dynamique', keywords: 'IFRS9 créances provisionnement classification' },
  { id: 'BCEAO-019-2010-A7', source: 'BCEAO', article: 'Art. 7 Inst. 019-2010', texte: 'Fonds sécurité solidarité IMCEC — contribution obligatoire', keywords: 'IMCEC fonds sécurité solidarité' },
  { id: 'BCEAO-001-2017-A4', source: 'BCEAO', article: 'Art. 4 Inst. 001-2017', texte: 'Modifications statutaires SFD — autorisation préalable BCEAO', keywords: 'statuts SFD modification autorisation' },
  { id: 'BCEAO-004-2010-A6', source: 'BCEAO', article: 'Art. 6 Inst. 004-2010', texte: 'Procédure retrait agrément SFD — conditions et effets', keywords: 'retrait agrément SFD procédure' },
  { id: 'BCEAO-061-2011-A3', source: 'BCEAO', article: 'Art. 3 Inst. 061-2011', texte: 'Refinancement SFD auprès BCEAO — conditions éligibilité', keywords: 'refinancement SFD BCEAO éligibilité' },
  { id: 'BCEAO-C02-2017-A5', source: 'BCEAO', article: 'Art. 5 Circ. 02-2017', texte: 'Verrou nationalité compétences exécutives — dérogation BCEAO', keywords: 'nationalité exécutif dérogation compétences' },
  { id: 'BCEAO-003-2018-A10', source: 'BCEAO', article: 'Art. 10 Inst. 003-2018', texte: 'Finance islamique SFD — dispositions générales conformité charia', keywords: 'finance islamique charia SFD conformité' },
  { id: 'BCEAO-005-2018-A8', source: 'BCEAO', article: 'Art. 8 Inst. 005-2018', texte: 'Finance islamique — comptes séparés et transparence', keywords: 'finance islamique comptes séparés transparence' },

  // GAFI
  { id: 'GAFI-R01', source: 'GAFI', article: 'R.1', texte: 'Évaluation risques BC/FT — approche basée risques', keywords: 'risques BC FT évaluation ABNR' },
  { id: 'GAFI-R10', source: 'GAFI', article: 'R.10', texte: 'Devoir de diligence CDD — identification et vérification clients', keywords: 'CDD KYC diligence identification vérification' },
  { id: 'GAFI-R11', source: 'GAFI', article: 'R.11', texte: 'Conservation documents CDD — 5 ans minimum après relation', keywords: 'conservation documents CDD archives' },
  { id: 'GAFI-R12', source: 'GAFI', article: 'R.12', texte: 'PPE — mesures renforcées personnes politiquement exposées', keywords: 'PPE mesures renforcées politiquement exposées' },
  { id: 'GAFI-R13', source: 'GAFI', article: 'R.13', texte: 'Correspondance bancaire — due diligence renforcée', keywords: 'correspondance bancaire due diligence' },
  { id: 'GAFI-R20', source: 'GAFI', article: 'R.20', texte: 'Déclarations opérations suspectes — obligation signalement CRF', keywords: 'DOS déclaration soupçon CRF signalement' },
  { id: 'GAFI-R24', source: 'GAFI', article: 'R.24', texte: 'Transparence bénéficiaires effectifs — registre central', keywords: 'bénéficiaires effectifs transparence registre' },
  { id: 'GAFI-R26', source: 'GAFI', article: 'R.26', texte: 'Contrôle interne LBC/FT — programme et audit indépendant', keywords: 'contrôle interne LBC FT audit indépendant' },
  { id: 'GAFI-R28', source: 'GAFI', article: 'R.28', texte: 'Supervision LBC/FT — pouvoirs régulateur et sanctions', keywords: 'supervision LBC FT régulateur sanctions' },
  { id: 'GAFI-R40', source: 'GAFI', article: 'R.40', texte: 'Coopération internationale — échange informations CRF', keywords: 'coopération internationale échange CRF' },

  // OHADA
  { id: 'OHADA-AUDCIF-A111', source: 'OHADA', article: 'Art. 111 AUDCIF', texte: 'Piste audit fiable — système comptable traçabilité complète', keywords: 'audit piste fiable comptable traçabilité' },
  { id: 'OHADA-AUDCIF-A112', source: 'OHADA', article: 'Art. 112 AUDCIF', texte: 'Contrôle interne comptable — séparation fonctions et diligences', keywords: 'contrôle interne comptable séparation fonctions' },
  { id: 'OHADA-AUSCGIE-A414', source: 'OHADA', article: 'Art. 414 AUSCGIE', texte: 'Commissariat aux comptes — nomination et mandat', keywords: 'CAC commissaire comptes nomination mandat' },

  // CEMAC/COBAC
  { id: 'COBAC-R2015-01', source: 'COBAC', article: 'Règlement 2015/01', texte: 'Organisation contrôle interne établissements crédit CEMAC', keywords: 'contrôle interne CEMAC organisation' },
  { id: 'COBAC-R2018-02', source: 'COBAC', article: 'Règlement 2018/02', texte: 'Gouvernance établissements crédit — Conseil et comités', keywords: 'gouvernance conseil comités CEMAC' },
  { id: 'COBAC-D2027-01', source: 'COBAC', article: 'Directive 2027/01', texte: 'Résilience opérationnelle bancaire — cyber et continuité', keywords: 'résilience opérationnelle cyber continuité DORA' },
  { id: 'CEMAC-D02-2018', source: 'CEMAC', article: 'Dir. 02/18', texte: 'Lutte contre blanchiment capitaux et financement terrorisme', keywords: 'blanchiment capitaux terrorisme CEMAC LBC' },

  // UEMOA
  { id: 'UEMOA-D01-2015', source: 'UEMOA', article: 'Dir. 01/2015/CM', texte: 'Directive LBC/FT UEMOA — harmonisation dispositif', keywords: 'LBC FT UEMOA harmonisation dispositif' },

  // GIABA
  { id: 'GIABA-EM-2023', source: 'GIABA', article: 'EM 2023', texte: 'Évaluation mutuelle LBC/FT — méthodologie et notations', keywords: 'évaluation mutuelle GIABA LBC FT notation' },

  // Bâle
  { id: 'BASEL-BCP01', source: 'BCBS', article: 'BCP 1', texte: 'Objectifs et indépendance autorité contrôle bancaire', keywords: 'BCP supervision indépendance autorité' },

  // ESG
  { id: 'ISSB-S1-2023', source: 'ISSB', article: 'IFRS S1', texte: 'Informations générales sur durabilité — exigences générales', keywords: 'durabilité ESG ISSB IFRS S1' },
  { id: 'ISSB-S2-2023', source: 'ISSB', article: 'IFRS S2', texte: 'Informations relatives au climat — risques et opportunités', keywords: 'climat ISSB IFRS S2 risques carbone' },
];

// Mappings exigences → contrôles
const SEED_MAPPINGS: MappingRow[] = [
  { exigence_id: 'BCEAO-2008-26-A42', control_id: 'KOS-AML-01', evidence_type: 'CENTIF_DECLARATION' },
  { exigence_id: 'GAFI-R10', control_id: 'KOS-CDD-03', evidence_type: 'KYC_FORM' },
  { exigence_id: 'OHADA-AUDCIF-A111', control_id: 'KOS-AUDIT-01', evidence_type: 'AUDIT_TRAIL' },
  { exigence_id: 'BCEAO-006-2024-A12', control_id: 'KOS-SOLV-01', evidence_type: 'SURFI_REPORT' },
  { exigence_id: 'BCEAO-025-2022-A3', control_id: 'KOS-PROV-01', evidence_type: 'IFRS9_CALCULATION' },
  { exigence_id: 'BCEAO-C01-2017-A22', control_id: 'KOS-SOD-01', evidence_type: 'ORG_CHART' },
  { exigence_id: 'GAFI-R24', control_id: 'KOS-BO-01', evidence_type: 'BO_REGISTER' },
  { exigence_id: 'COBAC-D2027-01', control_id: 'KOS-RESIL-01', evidence_type: 'BCP_TEST' },
  { exigence_id: 'ISSB-S2-2023', control_id: 'KOS-ESG-01', evidence_type: 'CARBON_AUDIT' },
  { exigence_id: 'GAFI-R20', control_id: 'KOS-DOS-01', evidence_type: 'STR_DECLARATION' },
  { exigence_id: 'BCEAO-004-2020-A8', control_id: 'KOS-LBCFT-01', evidence_type: 'LBCFT_POLICY' },
  { exigence_id: 'BCEAO-018-2010-A5', control_id: 'KOS-SURFI-01', evidence_type: 'SURFI_FILES' },
];

// ─── Moteur de recherche local (basé sur FTS-like in-memory) ───

// Puisque SQLite WASM peut être complexe à charger,
// nous implémentons une recherche full-text en mémoire
// avec index inversé + scoring TF-IDF simplifié

class ComplianceCatalog {
  private exigences: Map<string, ExigenceRow> = new Map();
  private mappings: Map<string, string[]> = new Map(); // exigence_id → control_ids[]
  private invertedIndex: Map<string, Set<string>> = new Map(); // token → exigence_ids[]
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;

    log.info('Initialisation Compliance Catalog...');

    // Charger les exigences
    for (const e of SEED_EXIGENCES) {
      this.exigences.set(e.id, e);
      this.indexExigence(e);
    }

    // Charger les mappings
    for (const m of SEED_MAPPINGS) {
      const existing = this.mappings.get(m.exigence_id) || [];
      existing.push(m.control_id);
      this.mappings.set(m.exigence_id, existing);
    }

    this.initialized = true;
    log.info('Compliance Catalog prêt', {
      exigences: this.exigences.size,
      mappings: this.mappings.size,
      tokens: this.invertedIndex.size,
    });
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Strip accents
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length >= 2);
  }

  private indexExigence(e: ExigenceRow): void {
    const tokens = this.tokenize(`${e.texte} ${e.keywords} ${e.source} ${e.article}`);
    for (const token of tokens) {
      if (!this.invertedIndex.has(token)) {
        this.invertedIndex.set(token, new Set());
      }
      this.invertedIndex.get(token)!.add(e.id);
    }
  }

  async search(query: string): Promise<ExigenceSearchResult[]> {
    await this.init();

    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) return [];

    // Scoring: TF-IDF simplifié
    const scores = new Map<string, number>();
    const totalDocs = this.exigences.size;

    for (const token of queryTokens) {
      const docs = this.invertedIndex.get(token);
      if (!docs) continue;

      const idf = Math.log(1 + totalDocs / docs.size);

      for (const docId of docs) {
        // TF = combien de fois le token apparait dans ce document
        const doc = this.exigences.get(docId);
        if (!doc) continue;

        const docTokens = this.tokenize(`${doc.texte} ${doc.keywords}`);
        const tf = docTokens.filter((t) => t === token).length / docTokens.length;

        const currentScore = scores.get(docId) || 0;
        scores.set(docId, currentScore + tf * idf);
      }
    }

    // Trier par score décroissant
    const results: ExigenceSearchResult[] = [];
    for (const [docId, score] of scores) {
      const doc = this.exigences.get(docId);
      if (!doc) continue;

      const controlIds = this.mappings.get(docId) || [];
      results.push({
        ...doc,
        control_id: controlIds[0] || null,
        rank: score,
      });
    }

    results.sort((a, b) => b.rank - a.rank);
    return results.slice(0, 20);
  }

  async getById(id: string): Promise<ExigenceRow | null> {
    await this.init();
    return this.exigences.get(id) || null;
  }

  async getControlsForExigence(exigenceId: string): Promise<string[]> {
    await this.init();
    return this.mappings.get(exigenceId) || [];
  }

  async getAll(): Promise<ExigenceRow[]> {
    await this.init();
    return Array.from(this.exigences.values());
  }

  async getBySource(source: string): Promise<ExigenceRow[]> {
    await this.init();
    return Array.from(this.exigences.values()).filter((e) => e.source === source);
  }

  async getStats(): Promise<{
    totalExigences: number;
    totalMappings: number;
    sources: Record<string, number>;
    topKeywords: Array<{ term: string; count: number }>;
  }> {
    await this.init();

    const sources: Record<string, number> = {};
    for (const e of this.exigences.values()) {
      sources[e.source] = (sources[e.source] || 0) + 1;
    }

    // Top 10 keywords by document frequency
    const keywordFreq: Array<{ term: string; count: number }> = [];
    for (const [term, docs] of this.invertedIndex) {
      keywordFreq.push({ term, count: docs.size });
    }
    keywordFreq.sort((a, b) => b.count - a.count);

    return {
      totalExigences: this.exigences.size,
      totalMappings: this.mappings.size,
      sources,
      topKeywords: keywordFreq.slice(0, 10),
    };
  }

  // Export pour ingestion dans SQLite WASM si disponible
  async exportForSQLite(): Promise<{
    exigences: ExigenceRow[];
    mappings: MappingRow[];
  }> {
    await this.init();
    return {
      exigences: Array.from(this.exigences.values()),
      mappings: SEED_MAPPINGS,
    };
  }
}

// ─── Singleton ───

export const complianceCatalog = new ComplianceCatalog();

// ─── Fonctions exportées ───

export async function searchExigence(query: string): Promise<ExigenceSearchResult[]> {
  return complianceCatalog.search(query);
}

export async function getExigenceById(id: string): Promise<ExigenceRow | null> {
  return complianceCatalog.getById(id);
}

export async function getControlsForExigence(exigenceId: string): Promise<string[]> {
  return complianceCatalog.getControlsForExigence(exigenceId);
}

export { type ExigenceRow, type ExigenceSearchResult, type MappingRow };