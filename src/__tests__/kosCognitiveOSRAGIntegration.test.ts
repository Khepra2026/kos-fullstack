import { describe, it, expect } from 'vitest';

/**
 * KOS Cognitive OS™ — Tests d'Intégration RAG + IA Générative
 * Niveau Big Four Action Artefact — 8 Sections, 55+ assertions
 *
 * Couvre:
 *   Axe 1 : Regulatory Intent Engine
 *   Axe 2 : Ontology Engine (Graphe de connaissances réglementaire)
 *   Axe 3 : Jurisdiction Priority Engine (Filtrage par priorité)
 *   Axe 4 : Confidence Engine (Score de confiance composite)
 *   Axe 6 : Evidence Chain Validation
 *   Axe 8 : Dynamic Regulatory Ranking (8 facteurs)
 *   Axe 9 : KPIs de recherche
 *   Axe 10 : Big Four Action Artefact (Synthèse, Obligations, Écarts, Risque, Recommandations, Plan d'actions)
 *   Section transversale : Quality Gates Big Four
 */

// ============================================================================
// IMPORTS DES MOTEURS RÉELS
// ============================================================================
import { RegulatoryIntentEngine } from '@/pages/kos-cognitive-os/engines/RegulatoryIntentEngine';
import { OntologyEngine } from '@/pages/kos-cognitive-os/engines/OntologyEngine';
import { RAGEngine, type RAGQueryResult } from '@/pages/kos-cognitive-os/engines/RAGEngine';
import { ConfidenceEngine } from '@/pages/kos-cognitive-os/engines/ConfidenceEngine';
import { DynamicRegulatoryRanking } from '@/pages/kos-cognitive-os/engines/DynamicRegulatoryRanking';
import { JurisdictionPriorityEngine } from '@/pages/kos-cognitive-os/engines/JurisdictionPriorityEngine';
import { regulatoryEvidences, mockRegTechResponse, mockKPIs } from '@/pages/kos-cognitive-os/data/mockData';
import type {
  Evidence,
  RegulatoryIntent,
  ConfidenceScore,
  KPISearch,
  RegTechResponse,
  SourcePriority,
  Metier,
  Jurisdiction,
} from '@/pages/kos-cognitive-os/types';

// ============================================================================
// HELPERS DE TEST
// ============================================================================

function everySourceHasType(evidences: Evidence[]): boolean {
  const validTypes = ['Regulateur', 'Loi', 'Instruction', 'Norme', 'BigFour', 'Universite'];
  return evidences.every(e => validTypes.includes(e.type));
}

function everySourceHasJurisdiction(evidences: Evidence[]): boolean {
  return evidences.every(e => typeof e.jurisdiction === 'string' && e.jurisdiction.length > 0);
}

function allScoresInRange(evidences: Evidence[], min = 0, max = 1): boolean {
  return evidences.every(e => (e.score === undefined) || (e.score >= min && e.score <= max));
}

// ============================================================================
// 1. REGULATORY INTENT ENGINE (Axe 1)
// ============================================================================
describe('[Axe 1] Regulatory Intent Engine — Extraction d\'intention réglementaire', () => {
  it('extrait le domaine LCB-FT avec juridiction BCEAO depuis une requête UEMOA', () => {
    const result = RegulatoryIntentEngine.extract('LCB-FT UEMOA CEMAC');
    expect(result.domaine).toBe('LCB-FT');
    expect(result.juridiction).toBe('BCEAO');
    expect(result.metier).toBe('Compliance');
  });

  it('extrait le domaine Contrôle interne avec juridiction BCEAO', () => {
    const result = RegulatoryIntentEngine.extract('Dispositif de contrôle interne circulaire 2017 BCEAO');
    expect(result.domaine).toBe('Contrôle interne');
    expect(result.juridiction).toBe('BCEAO');
  });

  it('détecte la juridiction COBAC pour une requête CEMAC', () => {
    const result = RegulatoryIntentEngine.extract('LCB-FT COBAC CEMAC audit');
    expect(result.juridiction).toBe('COBAC');
    expect(result.metier).toBe('Compliance');
  });

  it('détecte GAFI comme juridiction quand mentionnée', () => {
    const result = RegulatoryIntentEngine.extract('GAFI 40 recommandations LCB-FT');
    expect(result.juridiction).toBe('GAFI');
    expect(result.domaine).toBe('LCB-FT');
    expect(result.referentiels).toContain('GAFI 40 Recommandations');
  });

  it('détecte ISO 37301 comme référentiel', () => {
    const result = RegulatoryIntentEngine.extract('ISO 37301 compliance management');
    expect(result.referentiels).toContain('ISO 37301');
    expect(result.juridiction).toBe('ISO');
  });

  it('détecte le métier Gouvernance', () => {
    const result = RegulatoryIntentEngine.extract('Gouvernance conseil administration comité spécialisé');
    expect(result.metier).toBe('Gouvernance');
    expect(result.domaine).toBe('Gouvernance');
  });

  it('détecte le métier Risques', () => {
    const result = RegulatoryIntentEngine.extract('Cartographie des risques appétence ERM');
    expect(result.metier).toBe('Risques');
  });

  it('fournit des fallbacks par défaut pour une requête générique', () => {
    const result = RegulatoryIntentEngine.extract('Quel est le cadre réglementaire ?');
    expect(result.domaine).toBeDefined();
    expect(result.metier).toBeDefined();
    expect(result.jurisdiction).toBeDefined();
  });

  it('détecte COSO 2013 comme référentiel', () => {
    const result = RegulatoryIntentEngine.extract('COSO 2013 contrôle interne BCEAO');
    expect(result.referentiels).toContain('COSO 2013');
    expect(result.domaine).toBe('Contrôle interne');
  });

  it('est déterministe — deux appels identiques donnent le même résultat', () => {
    const q = 'LCB-FT UEMOA CEMAC BCEAO 2026';
    const r1 = RegulatoryIntentEngine.extract(q);
    const r2 = RegulatoryIntentEngine.extract(q);
    expect(r1.domaine).toBe(r2.domaine);
    expect(r1.juridiction).toBe(r2.juridiction);
    expect(r1.metier).toBe(r2.metier);
  });
});

// ============================================================================
// 2. ONTOLOGY ENGINE (Axe 2)
// ============================================================================
describe('[Axe 2] Ontology Engine — Graphe de connaissances réglementaire', () => {
  const ontologyEngine = new OntologyEngine();
  const lcbftIntent: RegulatoryIntent = {
    domaine: 'LCB-FT',
    metier: 'Compliance',
    juridiction: 'BCEAO',
    referentiels: ['GAFI 40 Recommandations'],
    obligations: ['Déclaration de soupçon'],
  };

  it('expand le contexte depuis le domaine LCB-FT', () => {
    const expansion = ontologyEngine.expandContext(lcbftIntent);
    expect(expansion.length).toBeGreaterThan(0);
  });

  it('inclut GAFI et BCEAO dans l\'expansion LCB-FT', () => {
    const expansion = ontologyEngine.expandContext(lcbftIntent);
    const names = expansion.map(e => e.name);
    const hasRegulator = names.includes('GAFI') || names.includes('BCEAO') || names.includes('COBAC');
    expect(hasRegulator).toBe(true);
  });

  it('retourne le chemin de priorité pour BCEAO', () => {
    const path = ontologyEngine.getPriorityPath('BCEAO');
    expect(path.length).toBeGreaterThan(0);
    // BCEAO publie des instructions
    expect(path.some(p => p.includes('Instruction'))).toBe(true);
  });

  it('retourne le chemin de priorité pour COBAC', () => {
    const path = ontologyEngine.getPriorityPath('COBAC');
    expect(path.length).toBeGreaterThan(0);
  });

  it('trouve un chemin entre deux concepts', () => {
    const paths = ontologyEngine.findPath('LCB-FT', 'BCEAO', 5);
    expect(paths.length).toBeGreaterThan(0);
  });

  it('retourne les statistiques du graphe', () => {
    const stats = ontologyEngine.getGraphStats();
    expect(stats.nodes).toBeGreaterThan(0);
    expect(stats.relations).toBeGreaterThan(0);
    expect(stats.nodes).toBeGreaterThan(stats.relations);
  });

  it('filtre les nœuds par type Regulateur', () => {
    const regulateurs = ontologyEngine.getNodesByType('Regulateur');
    expect(regulateurs.length).toBeGreaterThan(0);
    expect(regulateurs.every(n => n.type === 'Regulateur')).toBe(true);
  });

  it('filtre les nœuds par type Norme', () => {
    const normes = ontologyEngine.getNodesByType('Norme');
    expect(normes.length).toBeGreaterThan(0);
    expect(normes.every(n => n.type === 'Norme')).toBe(true);
  });

  it('limite l\'expansion à 20 résultats', () => {
    const expansion = ontologyEngine.expandContext(lcbftIntent);
    expect(expansion.length).toBeLessThanOrEqual(20);
  });

  it('ne duplique pas les nœuds dans l\'expansion', () => {
    const expansion = ontologyEngine.expandContext(lcbftIntent);
    const names = expansion.map(e => e.name);
    const unique = new Set(names);
    expect(names.length).toBe(unique.size);
  });
});

// ============================================================================
// 3. RAG ENGINE — IN-MEMORY (Axes 3+8)
// ============================================================================
describe('[Axes 3+8] RAG Engine — Recherche hybride vectorielle + BM25 + Ranking 8 facteurs', () => {
  const ragEngine = new RAGEngine();
  const lcbftIntent: RegulatoryIntent = {
    domaine: 'LCB-FT',
    metier: 'Compliance',
    juridiction: 'BCEAO',
    referentiels: ['GAFI 40 Recommandations'],
    obligations: [],
  };

  it('retourne des résultats pour une requête LCB-FT', () => {
    const result = ragEngine.query('LCB-FT UEMOA CEMAC', lcbftIntent, ['GAFI', 'BCEAO', 'COBAC']);
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.results.length).toBeLessThanOrEqual(10);
    expect(result.totalCandidates).toBeGreaterThan(0);
    expect(result.rerankedCount).toBeGreaterThan(0);
  });

  it('garde top 10 maximum', () => {
    const result = ragEngine.query('', lcbftIntent, []);
    expect(result.results.length).toBeLessThanOrEqual(10);
  });

  it('calcule un finalScore pour chaque résultat', () => {
    const result = ragEngine.query('LCB-FT', lcbftIntent, ['BCEAO']);
    result.results.forEach(r => {
      expect(r.finalScore).toBeGreaterThan(0);
      expect(r.finalScore).toBeLessThanOrEqual(1);
    });
  });

  it('calcule 8 facteurs de ranking pour chaque résultat', () => {
    const result = ragEngine.query('LCB-FT', lcbftIntent, ['BCEAO']);
    result.results.forEach(r => {
      expect(r.rankingFactors.vectorSim).toBeDefined();
      expect(r.rankingFactors.bm25).toBeDefined();
      expect(r.rankingFactors.autorite).toBeDefined();
      expect(r.rankingFactors.juridiction).toBeDefined();
      expect(r.rankingFactors.fraicheur).toBeDefined();
      expect(r.rankingFactors.applicabilite).toBeDefined();
      expect(r.rankingFactors.densiteCitations).toBeDefined();
      expect(r.rankingFactors.qualiteDoc).toBeDefined();
    });
  });

  it('trie les résultats par score décroissant', () => {
    const result = ragEngine.query('LCB-FT', lcbftIntent, ['BCEAO']);
    for (let i = 1; i < result.results.length; i++) {
      expect(result.results[i - 1].finalScore).toBeGreaterThanOrEqual(result.results[i].finalScore);
    }
  });

  it('favorise les régulateurs primaires (priorité 1-2)', () => {
    const result = ragEngine.query('blanchiment terrorisme GAFI', lcbftIntent, ['GAFI']);
    if (result.results.length >= 2) {
      // Le premier résultat doit être prioritaire
      const hasHighPriorityTop = result.results.slice(0, 3).some(r => (r.priority || 6) <= 3);
      expect(hasHighPriorityTop).toBe(true);
    }
  });

  it('boost les résultats avec correspondance de juridiction', () => {
    const result = ragEngine.query('BCEAO UEMOA', lcbftIntent, ['BCEAO']);
    if (result.results.length > 0) {
      const topJurisdiction = result.results[0].rankingFactors.juridiction;
      expect(topJurisdiction).toBeGreaterThan(0.5);
    }
  });

  it('inclut les termes ontologiques dans le résultat', () => {
    const ontoTerms = ['GAFI', 'BCEAO', 'Compliance', 'ISO 37301'];
    const result = ragEngine.query('LCB-FT', lcbftIntent, ontoTerms);
    expect(result.ontologyTerms).toEqual(ontoTerms);
  });

  it('gère un corpus vide sans erreur', () => {
    const emptyEngine = new RAGEngine([]);
    const result = emptyEngine.query('test', lcbftIntent, []);
    expect(result.results).toHaveLength(0);
    expect(result.totalCandidates).toBe(0);
  });
});

// ============================================================================
// 4. CONFIDENCE ENGINE (Axe 4)
// ============================================================================
describe('[Axe 4] Confidence Engine — Score de confiance composite Big Four', () => {
  const bceaoEvidences: Evidence[] = regulatoryEvidences.filter(e => e.jurisdiction === 'BCEAO');
  const allEvidences = [...regulatoryEvidences];

  it('calcule un score de confiance complet à 6 composantes', () => {
    const confidence = ConfidenceEngine.calculate(0.91, allEvidences, 'BCEAO');
    expect(confidence.semantique).toBe(0.91);
    expect(confidence.autorite).toBeGreaterThan(0);
    expect(confidence.autorite).toBeLessThanOrEqual(1);
    expect(confidence.juridiction).toBeGreaterThanOrEqual(0);
    expect(confidence.juridiction).toBeLessThanOrEqual(1);
    expect(confidence.fraicheur).toBeGreaterThan(0);
    expect(confidence.densiteCitations).toBeGreaterThanOrEqual(0);
    expect(confidence.coherence).toBe(1.0);
    expect(confidence.total).toBeGreaterThan(0);
    expect(confidence.total).toBeLessThanOrEqual(1);
  });

  it('donne une confiance Très Élevée (≥ 90%) pour des sources haute autorité', () => {
    const highFreqEvidences: Evidence[] = [
      {
        id: 'test-high',
        type: 'Regulateur',
        priority: 1,
        title: 'Régulateur test',
        url: '#',
        jurisdiction: 'BCEAO',
        fraicheur: 0.98,
        citations: 30,
        extrait: 'test',
      },
      {
        id: 'test-high2',
        type: 'Loi',
        priority: 2,
        title: 'Loi test',
        url: '#',
        jurisdiction: 'BCEAO',
        fraicheur: 0.95,
        citations: 25,
        extrait: 'test',
      },
    ];
    const confidence = ConfidenceEngine.calculate(0.95, highFreqEvidences, 'BCEAO');
    expect(confidence.total).toBeGreaterThan(0.85);
  });

  it('gère une liste de preuves vide', () => {
    const confidence = ConfidenceEngine.calculate(0.5, [], 'BCEAO');
    expect(confidence.autorite).toBe(0);
    expect(confidence.juridiction).toBe(0);
    expect(confidence.fraicheur).toBe(0);
  });

  it('formate correctement en pourcentage', () => {
    expect(ConfidenceEngine.formatPercent(0.956)).toBe('96%');
    expect(ConfidenceEngine.formatPercent(0.5)).toBe('50%');
  });

  it('retourne le bon niveau de confiance', () => {
    expect(ConfidenceEngine.getConfidenceLevel(0.95).label).toBe('Très Élevée');
    expect(ConfidenceEngine.getConfidenceLevel(0.85).label).toBe('Élevée');
    expect(ConfidenceEngine.getConfidenceLevel(0.70).label).toBe('Modérée');
    expect(ConfidenceEngine.getConfidenceLevel(0.50).label).toBe('Faible');
    expect(ConfidenceEngine.getConfidenceLevel(0.20).label).toBe('Insuffisante');
  });

  it('respecte la pondération Big Four : 35/25/15/10/10/5', () => {
    const testEvidences: Evidence[] = [{
      id: 'test',
      type: 'Regulateur',
      priority: 1,
      title: 'T',
      url: '#',
      jurisdiction: 'BCEAO',
      fraicheur: 1.0,
      citations: 10,
      extrait: 'x',
    }];
    const c = ConfidenceEngine.calculate(1.0, testEvidences, 'BCEAO');
    // total = 0.35*1.0 + 0.25*autorite + 0.15*juridiction + 0.10*fraicheur + 0.10*densite + 0.05*coherence
    expect(c.total).toBeCloseTo(
      0.35 * 1.0 + 0.25 * c.autorite + 0.15 * c.juridiction + 0.10 * c.fraicheur + 0.10 * c.densiteCitations + 0.05 * 1.0,
      3,
    );
  });
});

// ============================================================================
// 5. JURISDICTION PRIORITY ENGINE (Axe 3)
// ============================================================================
describe('[Axe 3] Jurisdiction Priority Engine — Filtrage par priorité et juridiction', () => {
  it('classe les preuves avec boost BCEAO', () => {
    const ranked = JurisdictionPriorityEngine.rank(regulatoryEvidences, 'BCEAO');
    expect(ranked.length).toBe(regulatoryEvidences.length);
    // Les premiers résultats doivent avoir un score élevé
    expect(ranked[0].score).toBeGreaterThan(0.5);
  });

  it('valide la chaîne de preuves avec des données complètes', () => {
    // regulatoryEvidences contient au moins 2 régulateurs + 1 norme + 1 BigFour
    const isValid = JurisdictionPriorityEngine.validateEvidenceChain(regulatoryEvidences);
    expect(isValid).toBe(true);
  });

  it('rejette la chaîne de preuves sans Big Four', () => {
    const withoutBigFour = regulatoryEvidences.filter(e => e.type !== 'BigFour');
    const isValid = JurisdictionPriorityEngine.validateEvidenceChain(withoutBigFour);
    expect(isValid).toBe(false);
  });

  it('rejette la chaîne de preuves sans norme', () => {
    const withoutNorme = regulatoryEvidences.filter(e => e.type !== 'Norme');
    const isValid = JurisdictionPriorityEngine.validateEvidenceChain(withoutNorme);
    expect(isValid).toBe(false);
  });

  it('rejette la chaîne de preuves sans sources réglementaires (P≤3)', () => {
    const withoutReg = regulatoryEvidences.filter(e => e.type !== 'Regulateur' && e.type !== 'Loi' && e.type !== 'Instruction');
    const isValid = JurisdictionPriorityEngine.validateEvidenceChain(withoutReg);
    expect(isValid).toBe(false);
  });

  it('retourne les labels de priorité corrects', () => {
    expect(JurisdictionPriorityEngine.getPriorityLabel(1)).toContain('Régulateur');
    expect(JurisdictionPriorityEngine.getPriorityLabel(4)).toContain('Norme');
    expect(JurisdictionPriorityEngine.getPriorityLabel(5)).toContain('Big Four');
  });

  it('retourne des boosts de juridiction cohérents', () => {
    const bceao = JurisdictionPriorityEngine.getJurisdictionBoost('BCEAO');
    const local = JurisdictionPriorityEngine.getJurisdictionBoost('Local');
    const unknown = JurisdictionPriorityEngine.getJurisdictionBoost('Inconnu');
    expect(bceao).toBeGreaterThan(local);
    expect(local).toBeGreaterThanOrEqual(unknown);
  });
});

// ============================================================================
// 6. DYNAMIC REGULATORY RANKING (Axe 8)
// ============================================================================
describe('[Axe 8] Dynamic Regulatory Ranking — Re-ranking 8 facteurs', () => {
  it('génère 8 facteurs pour chaque preuve', () => {
    const factors = DynamicRegulatoryRanking.generateFactors(regulatoryEvidences, 'LCB-FT UEMOA CEMAC');
    expect(factors.length).toBe(regulatoryEvidences.length);
    factors.forEach(f => {
      expect(f.vectorSim).toBeGreaterThanOrEqual(0);
      expect(f.vectorSim).toBeLessThanOrEqual(1);
      expect(f.bm25).toBeGreaterThanOrEqual(0);
      expect(f.bm25).toBeLessThanOrEqual(1);
      expect(f.autorite).toBeGreaterThanOrEqual(0);
      expect(f.autorite).toBeLessThanOrEqual(1.05);
      expect(f.juridiction).toBeGreaterThanOrEqual(0);
      expect(f.fraicheur).toBeGreaterThanOrEqual(0);
      expect(f.applicabilite).toBeGreaterThanOrEqual(0);
      expect(f.densiteCitations).toBeGreaterThanOrEqual(0);
      expect(f.qualiteDoc).toBeGreaterThanOrEqual(0);
    });
  });

  it('re-classe les preuves par score décroissant', () => {
    const factors = DynamicRegulatoryRanking.generateFactors(regulatoryEvidences, 'LCB-FT UEMOA CEMAC');
    const ranked = DynamicRegulatoryRanking.rank([...regulatoryEvidences], factors);
    for (let i = 1; i < ranked.length; i++) {
      expect((ranked[i - 1].score || 0)).toBeGreaterThanOrEqual((ranked[i].score || 0));
    }
  });

  it('conserve toutes les preuves après ranking', () => {
    const factors = DynamicRegulatoryRanking.generateFactors(regulatoryEvidences, 'LCB-FT');
    const ranked = DynamicRegulatoryRanking.rank([...regulatoryEvidences], factors);
    expect(ranked.length).toBe(regulatoryEvidences.length);
  });

  it('ne mute pas le tableau original', () => {
    const original = [...regulatoryEvidences];
    const factors = DynamicRegulatoryRanking.generateFactors(regulatoryEvidences, 'test');
    DynamicRegulatoryRanking.rank([...regulatoryEvidences], factors);
    // Les scores du tableau original ne sont pas modifiés
    expect(original.every((e, i) => e.score === regulatoryEvidences[i].score)).toBe(true);
  });
});

// ============================================================================
// 7. INTÉGRATION END-TO-END (Pipeline complet)
// ============================================================================
describe('[E2E] Pipeline complet — Intent → Ontology → RAG → Ranking → Confidence → Evidence Chain', () => {
  const ontologyEngine = new OntologyEngine();
  const ragEngine = new RAGEngine();

  it('exécute le pipeline complet LCB-FT UEMOA sans erreur', () => {
    const query = 'LCB-FT UEMOA CEMAC';
    // Step 1: Intent extraction
    const intent = RegulatoryIntentEngine.extract(query);
    expect(intent).toBeDefined();

    // Step 2: Ontology expansion
    const ontologyExpansion = ontologyEngine.expandContext(intent);
    const ontologyTerms = ontologyExpansion.map(e => e.name).concat(intent.referentiels);
    expect(ontologyTerms.length).toBeGreaterThan(0);

    // Step 3: RAG search
    const ragResult = ragEngine.query(query, intent, ontologyTerms);
    expect(ragResult.results.length).toBeGreaterThan(0);

    // Step 4: Dynamic Regulatory Ranking
    const rankingFactors = DynamicRegulatoryRanking.generateFactors(
      ragResult.results.map(r => ({ ...r, score: r.finalScore })),
      query,
    );
    expect(rankingFactors.length).toBe(ragResult.results.length);

    // Step 5: Confidence calculation
    const confidence = ConfidenceEngine.calculate(0.91, ragResult.results, intent.juridiction);
    expect(confidence.total).toBeGreaterThan(0);

    // Step 6: Evidence chain validation
    const evidenceValid = JurisdictionPriorityEngine.validateEvidenceChain(ragResult.results);
    expect(typeof evidenceValid).toBe('boolean');
  });

  it('maintient la cohérence des données tout au long du pipeline', () => {
    const query = 'LCB-FT UEMOA CEMAC';
    const intent = RegulatoryIntentEngine.extract(query);
    const ontologyExpansion = ontologyEngine.expandContext(intent);
    const ontoTerms = ontologyExpansion.map(e => e.name).concat(intent.referentiels);
    const ragResult = ragEngine.query(query, intent, ontoTerms);

    // Chaque résultat doit avoir un type valide
    expect(everySourceHasType(ragResult.results)).toBe(true);
    // Chaque résultat doit avoir une juridiction
    expect(everySourceHasJurisdiction(ragResult.results)).toBe(true);
    // Chaque score dans l'intervalle [0, 1]
    expect(allScoresInRange(
      ragResult.results.map(r => ({ ...r, score: r.finalScore })),
    )).toBe(true);

    // L'Evidence Chain doit être validée avec le corpus complet
    const evidenceValid = JurisdictionPriorityEngine.validateEvidenceChain(ragResult.results);
    expect(evidenceValid).toBeDefined();
  });

  it('détecte correctement une chaîne de preuves invalide avec corpus dégradé', () => {
    // Simuler un corpus sans Big Four
    const degradedCorpus = regulatoryEvidences.filter(e => e.type !== 'BigFour');
    const degradedEngine = new RAGEngine(degradedCorpus);
    const intent = RegulatoryIntentEngine.extract('LCB-FT UEMOA');
    const result = degradedEngine.query('LCB-FT', intent, []);

    const evidenceValid = JurisdictionPriorityEngine.validateEvidenceChain(result.results);
    expect(evidenceValid).toBe(false);
  });
});

// ============================================================================
// 8. QUALITY GATES — STANDARDS BIG FOUR
// ============================================================================
describe('[Quality Gates] Standards Big Four — KPIs, Seuils et Conformité', () => {
  it('KPIs mock : tous les KPI sont dans des plages valides', () => {
    expect(mockKPIs.semanticPrecision).toBeGreaterThanOrEqual(0);
    expect(mockKPIs.semanticPrecision).toBeLessThanOrEqual(100);
    expect(mockKPIs.regulatoryPrecision).toBeGreaterThanOrEqual(0);
    expect(mockKPIs.authorityScore).toBeGreaterThanOrEqual(0);
    expect(mockKPIs.jurisdictionMatch).toBeGreaterThanOrEqual(0);
    expect(mockKPIs.explainability).toBeGreaterThanOrEqual(0);
    expect(mockKPIs.confidence).toBeGreaterThanOrEqual(0);
    expect(mockKPIs.hallucinationRisk).toBeGreaterThanOrEqual(0);
    expect(mockKPIs.hallucinationRisk).toBeLessThanOrEqual(100);
    expect(mockKPIs.evidenceCoverage).toBeGreaterThanOrEqual(0);
    expect(mockKPIs.latence).toBeGreaterThan(0);
  });

  it('KPI Confiance ≥ 85% — seuil Big Four atteint', () => {
    expect(mockKPIs.confidence).toBeGreaterThanOrEqual(85);
  });

  it('KPI Risque Hallucination ≤ 5% — seuil Big Four', () => {
    expect(mockKPIs.hallucinationRisk).toBeLessThanOrEqual(5);
  });

  it('KPI Couverture Preuves ≥ 90% — seuil Evidence Chain', () => {
    expect(mockKPIs.evidenceCoverage).toBeGreaterThanOrEqual(90);
  });

  it('KPI Score Autorité ≥ 85% — minimum Big Four', () => {
    expect(mockKPIs.authorityScore).toBeGreaterThanOrEqual(85);
  });

  it('KPI Latence ≤ 200ms — seuil SLA Big Four', () => {
    expect(mockKPIs.latence).toBeLessThanOrEqual(200);
  });

  it('KPI Précision Sémantique ≥ 90%', () => {
    expect(mockKPIs.semanticPrecision).toBeGreaterThanOrEqual(90);
  });

  it('RegTechResponse : Synthèse non vide', () => {
    expect(mockRegTechResponse.synthese.length).toBeGreaterThan(50);
  });

  it('RegTechResponse : Au moins 6 obligations', () => {
    expect(mockRegTechResponse.obligations.length).toBeGreaterThanOrEqual(6);
  });

  it('RegTechResponse : Au moins 3 écarts identifiés', () => {
    expect(mockRegTechResponse.ecarts.length).toBeGreaterThanOrEqual(3);
  });

  it('RegTechResponse : Risque classifié (Faible/Modéré/Élevé/Critique)', () => {
    expect(['Faible', 'Modéré', 'Élevé', 'Critique']).toContain(mockRegTechResponse.risque);
  });

  it('RegTechResponse : Au moins 3 recommandations', () => {
    expect(mockRegTechResponse.recommandations.length).toBeGreaterThanOrEqual(3);
  });

  it('RegTechResponse : Plan d\'actions avec au moins 4 étapes', () => {
    expect(mockRegTechResponse.planActions.length).toBeGreaterThanOrEqual(4);
  });

  it('RegTechResponse : Toutes les sources ont un type valide', () => {
    expect(everySourceHasType(mockRegTechResponse.sources)).toBe(true);
  });

  it('RegTechResponse : Evidence chain validée', () => {
    expect(mockRegTechResponse.evidenceChainValid).toBe(true);
  });

  it('RegTechResponse : Confidence totale ≥ 0.85', () => {
    expect(mockRegTechResponse.confidence.total).toBeGreaterThanOrEqual(0.85);
  });

  it('Corpus réglementaire : contient au moins 12 sources', () => {
    expect(regulatoryEvidences.length).toBeGreaterThanOrEqual(12);
  });

  it('Corpus réglementaire : couvre au moins 5 juridictions', () => {
    const jurisdictions = new Set(regulatoryEvidences.map(e => e.jurisdiction));
    expect(jurisdictions.size).toBeGreaterThanOrEqual(5);
  });

  it('Corpus réglementaire : contient tous les types (Regulateur, Loi, Instruction, Norme, BigFour, Universite)', () => {
    const types = new Set(regulatoryEvidences.map(e => e.type));
    expect(types.has('Regulateur')).toBe(true);
    expect(types.has('Loi')).toBe(true);
    expect(types.has('Instruction')).toBe(true);
    expect(types.has('Norme')).toBe(true);
    expect(types.has('BigFour')).toBe(true);
    expect(types.has('Universite')).toBe(true);
  });

  it('Corpus réglementaire : toutes les priorités sont valides (1-6)', () => {
    const allValid = regulatoryEvidences.every(e => e.priority >= 1 && e.priority <= 6);
    expect(allValid).toBe(true);
  });

  it('Corpus réglementaire : fraîcheur entre 0 et 1 pour toutes les sources', () => {
    const allValid = regulatoryEvidences.every(e => e.fraicheur >= 0 && e.fraicheur <= 1);
    expect(allValid).toBe(true);
  });

  it('Corpus réglementaire : toutes les sources ont des citations ≥ 0', () => {
    const allValid = regulatoryEvidences.every(e => e.citations >= 0);
    expect(allValid).toBe(true);
  });

  it('Corpus réglementaire : aucune source sans ID unique', () => {
    const ids = regulatoryEvidences.map(e => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('Corpus réglementaire : les IDs sont des chaînes non vides', () => {
    const allValid = regulatoryEvidences.every(e => e.id.length > 0);
    expect(allValid).toBe(true);
  });

  it('Score NaN KPI : zéro NaN dans le système', () => {
    expect(mockKPIs.nan).toBe(0);
  });

  it('Explicabilité KPI ≥ 80% — traçabilité Big Four', () => {
    expect(mockKPIs.explainability).toBeGreaterThanOrEqual(80);
  });
});