import { useState, useMemo, useCallback } from 'react';
import KpiDashboard from '';
import RegTechResponseView from '';
import CognitiveSearchBar from '';
import { ConfidenceEngine } from '';
import { JurisdictionPriorityEngine } from '';
import { DynamicRegulatoryRanking } from '';
import { RegulatoryIntentEngine } from '';
import { OntologyEngine } from '';
import { RAGEngine } from '';
import { ResponseGenerator } from '';
import { mockKPIs } from '';
import { RegTechResponse, KPISearch } from '';
import { usePineconeRAG } from '@/hooks/usePineconeRAG';

const ontologyEngine = new OntologyEngine();
const ragEngine = new RAGEngine();

const DEFAULT_QUERY = 'LCB-FT UEMOA CEMAC';

export default function cognitiveOSPage() {
  const [activeQuery, setActiveQuery] = useState<string>(DEFAULT_QUERY);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback((query: string) => {
    setIsSearching(true);
    setActiveQuery(query);
    setTimeout(() => setIsSearching(false), 600);
    setHasSearched(true);
  }, []);

  const intent = useMemo(() => RegulatoryIntentEngine.extract(activeQuery), [activeQuery]);

  const ontologyExpansion = useMemo(() => ontologyEngine.expandContext(intent), [intent]);
  const ontologyTerms = useMemo(() =>
    ontologyExpansion.map(e => e.name).concat(intent.referentiels),
  [ontologyExpansion, intent.referentiels]);

  const ragResult = useMemo(() =>
    ragEngine.query(activeQuery, intent, ontologyTerms),
  [activeQuery, intent, ontologyTerms]);

  const pineconeRAG = usePineconeRAG(activeQuery, intent, ontologyTerms);

  const graphStats = useMemo(() => ontologyEngine.getGraphStats(), []);

  const response: RegTechResponse = useMemo(() => {
    if (pineconeRAG.data && !pineconeRAG.usingFallback) {
      const pineconeEvidences = pineconeRAG.data.results.map(r => {
        const safeMeta = r.metadata || {};
        const safePriority = typeof safeMeta.priority === 'number' && safeMeta.priority >= 1 && safeMeta.priority <= 6
          ? safeMeta.priority
          : 5;
        const safeFraicheur = typeof r.fraicheur === 'number' && !isNaN(r.fraicheur) ? r.fraicheur : 0.5;
        const safeCitations = typeof safeMeta.citations === 'number' ? safeMeta.citations : 0;
        const safeJuridiction = typeof safeMeta.juridiction === 'string' ? safeMeta.juridiction : 'BCEAO';
        const safeQualiteDoc = typeof safeMeta.qualite_doc === 'number' ? safeMeta.qualite_doc : 0.6;
        const safeScore = typeof r.score === 'number' && !isNaN(r.score) ? r.score : 0.3;
        const safeRegScore = typeof r.regScore === 'number' && !isNaN(r.regScore) ? r.regScore : 0.5;

        return {
          id: r.id || `pinecone-${Math.random().toString(36).slice(2, 8)}`,
          type: (safeMeta.type || 'BigFour') as RegTechResponse['sources'][number]['type'],
          priority: safePriority as RegTechResponse['sources'][number]['priority'],
          title: `${safeMeta.type || 'Document'} — ${safeJuridiction}`,
          url: `#${r.id || 'unknown'}`,
          jurisdiction: safeJuridiction,
          fraicheur: safeFraicheur,
          citations: safeCitations,
          extrait: safeMeta.referentiel || '',
          finalScore: safeRegScore,
          rankingFactors: {
            vectorSim: safeScore,
            bm25: 0,
            autorite: Math.max(0, 1.1 - safePriority * 0.15) / 1.1,
            juridiction: safeJuridiction === (intent?.juridiction || 'BCEAO') ? 1 : 0.5,
            fraicheur: safeFraicheur,
            applicabilite: 0.5,
            densiteCitations: Math.min(safeCitations / 20, 1),
            qualiteDoc: safeQualiteDoc,
          },
        };
      });

      const confidence = ConfidenceEngine.calculate(
        0.88,
        pineconeEvidences.map(e => ({
          id: e.id,
          type: e.type as RegTechResponse['sources'][number]['type'],
          priority: e.priority,
          title: e.title,
          url: e.url,
          jurisdiction: e.jurisdiction as RegTechResponse['sources'][number]['jurisdiction'],
          fraicheur: e.fraicheur,
          citations: e.citations,
          extrait: e.extrait,
        })),
        intent.juridiction
      );

      const chainValid = JurisdictionPriorityEngine.validateEvidenceChain(
        pineconeEvidences.map(e => ({
          id: e.id,
          type: e.type as RegTechResponse['sources'][number]['type'],
          priority: e.priority,
          title: e.title,
          url: e.url,
          jurisdiction: e.jurisdiction as RegTechResponse['sources'][number]['jurisdiction'],
          fraicheur: e.fraicheur,
          citations: e.citations,
          extrait: e.extrait,
        }))
      );

      return ResponseGenerator.generate(activeQuery, intent, pineconeEvidences, confidence, chainValid);
    }

    const rankedSources = JurisdictionPriorityEngine.rank(
      [...ragResult.results.map(r => ({
        id: r.id,
        type: r.type,
        priority: r.priority,
        title: r.title,
        url: r.url,
        jurisdiction: r.jurisdiction,
        fraicheur: r.fraicheur,
        citations: r.citations,
        extrait: r.extrait,
        score: r.finalScore,
      }))],
      intent.juridiction
    );

    const rankingFactors = DynamicRegulatoryRanking.generateFactors(
      rankedSources.map(r => ({
        id: r.id,
        type: r.type,
        priority: r.priority,
        title: r.title,
        url: r.url,
        jurisdiction: r.jurisdiction,
        fraicheur: r.fraicheur,
        citations: r.citations,
        extrait: r.extrait,
      })),
      activeQuery
    );

    const dynRanked = DynamicRegulatoryRanking.rank(rankedSources, rankingFactors);

    const confidence = ConfidenceEngine.calculate(
      0.91,
      dynRanked.map(r => ({
        id: r.id,
        type: r.type,
        priority: r.priority,
        title: r.title,
        url: r.url,
        jurisdiction: r.jurisdiction,
        fraicheur: r.fraicheur,
        citations: r.citations,
        extrait: r.extrait,
      })),
      intent.juridiction
    );

    const chainValid = JurisdictionPriorityEngine.validateEvidenceChain(dynRanked);

    const rankedInput = dynRanked.map(r => ({
      id: r.id,
      type: r.type,
      priority: r.priority,
      title: r.title,
      url: r.url,
      jurisdiction: r.jurisdiction,
      fraicheur: r.fraicheur,
      citations: r.citations,
      extrait: r.extrait,
      finalScore: r.score,
    }));

    return ResponseGenerator.generate(activeQuery, intent, rankedInput, confidence, chainValid);
  }, [activeQuery, intent, ragResult, pineconeRAG]);

  const computedKPIs: KPISearch = useMemo(() => {
    const kpis = { ...mockKPIs };
    const conf = response.confidence;

    const safeRound = (v: number): number => {
      if (typeof v !== 'number' || isNaN(v) || !isFinite(v)) return 0;
      return Math.round(Math.max(0, Math.min(1, v)) * 100);
    };

    kpis.confidence = safeRound(conf.total);
    kpis.hallucinationRisk = Math.max(0, Math.min(100, Math.round((1 - safeNum(conf.coherence)) * 100)));
    kpis.semanticPrecision = safeRound(conf.semantique);
    kpis.authorityScore = safeRound(conf.autorite);
    kpis.jurisdictionMatch = safeRound(conf.juridiction);
    kpis.evidenceCoverage = response.evidenceChainValid ? 94 : 62;

    const confidenceFields = [
      conf.semantique, conf.autorite, conf.juridiction,
      conf.fraicheur, conf.densiteCitations, conf.coherence, conf.total,
    ];
    kpis.nan = confidenceFields.some(f => typeof f !== 'number' || isNaN(f) || !isFinite(f)) ? 100 : 0;

    return kpis;
  }, [response]);

  function safeNum(v: unknown, fallback: number = 0): number {
    if (typeof v !== 'number') { const c = Number(v); return (isNaN(c) || !isFinite(c)) ? fallback : c; }
    return (isNaN(v) || !isFinite(v)) ? fallback : v;
  }

  const riskBadgeClasses: Record<string, string> = {
    'Faible': 'bg-accent-100 text-accent-800',
    'Modéré': 'bg-secondary-100 text-secondary-800',
    'Élevé': 'bg-red-100 text-red-700',
    'Critique': 'bg-red-200 text-red-900',
  };

  const confidenceLevel = useMemo(() => {
    return ConfidenceEngine.getConfidenceLevel(response.confidence.total);
  }, [response]);

  const relationTypeLabels: Record<string, string> = {
    'BASE_SUR': 'Basé sur',
    'REGULE_PAR': 'Régulé par',
    'EVALUE_PAR': 'Évalué par',
    'IMPLEMENTE': 'Implémente',
    'EXIGE': 'Exige',
    'S_INSCRIT_DANS': 'S\'inscrit dans',
    'GERE': 'Gère',
    'CADRE_PAR': 'Cadré par',
    'PUBLIE': 'Publie',
    'DELEGUE_A': 'Délègue à',
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <header className="border-b border-background-200/70 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
              <i className="ri-brain-line text-background-50 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground-950">
                KOS Cognitive OS<span className="text-primary-500">™</span>
              </h1>
              <p className="text-xs text-foreground-500 mt-0.5">RegTech AI — Big Four Action Artefact v1.0</p>
            </div>
          </div>
          <p className="text-sm text-foreground-600 max-w-2xl mb-6">
            Moteur cognitif réglementaire. Analyse, priorisation et qualification des sources selon les standards Big Four —
            BCEAO, COBAC, GAFI, OHADA, ISO, COSO. Posez votre question réglementaire et obtenez un rapport exécutif complet.
          </p>

          {/* Search Bar — active functional */}
          <CognitiveSearchBar
            onSearch={handleSearch}
            isSearching={isSearching}
            className="mb-5"
          />

          {/* Query + Confidence badge */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-100 border border-background-200/60">
              <i className="ri-search-line text-foreground-400 text-sm"></i>
              <span className="text-sm text-foreground-700 font-medium">{activeQuery}</span>
            </div>
            {confidenceLevel && (
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
                style={{ backgroundColor: `${confidenceLevel.color}18`, color: confidenceLevel.color }}
              >
                {confidenceLevel.label}
              </span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${riskBadgeClasses[response.risque]}`}>
              Risque : {response.risque}
            </span>
            {!response.evidenceChainValid && (
              <span className="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap bg-red-100 text-red-700">
                <i className="ri-error-warning-line mr-1"></i>
                Evidence Chain ✗
              </span>
            )}
          </div>

          {/* Regulatory Intent */}
          <div className="mt-5 p-4 rounded-lg bg-background-100/70 border border-background-200/60">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-accent-500/15 flex items-center justify-center">
                <i className="ri-crosshair-line text-accent-600 text-xs"></i>
              </div>
              <span className="text-xs font-semibold text-foreground-700 uppercase tracking-wide">
                Intention Réglementaire Extraite
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-foreground-400">Domaine</span>
                <span className="px-2 py-0.5 rounded-md bg-accent-100 text-accent-800 font-medium text-xs">{intent.domaine}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground-400">Métier</span>
                <span className="px-2 py-0.5 rounded-md bg-primary-100 text-primary-800 font-medium text-xs">{intent.metier}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground-400">Juridiction</span>
                <span className="px-2 py-0.5 rounded-md bg-secondary-100 text-secondary-800 font-medium text-xs">{intent.juridiction}</span>
              </div>
              {intent.referentiels.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-foreground-400">Référentiels</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {intent.referentiels.map((ref, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-background-200/80 text-foreground-600 font-medium text-xs whitespace-nowrap">
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ontology Graph Expansion */}
          <div className="mt-4 p-4 rounded-lg bg-background-100/70 border border-background-200/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary-500/15 flex items-center justify-center">
                  <i className="ri-git-branch-line text-primary-600 text-xs"></i>
                </div>
                <span className="text-xs font-semibold text-foreground-700 uppercase tracking-wide">
                  Graphe Ontologique — Expansion de Contexte
                </span>
              </div>
              <span className="text-xxs text-foreground-400">
                {graphStats.nodes} nœuds · {graphStats.relations} relations
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ontologyExpansion.slice(0, 12).map((node, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                  style={{
                    backgroundColor: node.type === 'Regulateur' ? 'oklch(var(--primary-100) / 0.8)' :
                      node.type === 'Norme' || node.type === 'Referentiel' ? 'oklch(var(--accent-100) / 0.8)' :
                      node.type === 'LigneDefense' ? 'oklch(var(--secondary-100) / 0.8)' :
                      'oklch(var(--background-200) / 0.8)',
                    color: node.type === 'Regulateur' ? 'oklch(var(--primary-800))' :
                      node.type === 'Norme' || node.type === 'Referentiel' ? 'oklch(var(--accent-800))' :
                      node.type === 'LigneDefense' ? 'oklch(var(--secondary-800))' :
                      'oklch(var(--foreground-700))',
                  }}
                  title={`${relationTypeLabels[node.relationType] || node.relationType} — Profondeur ${node.depth}`}
                >
                  {node.name}
                  <span className="text-xxs opacity-60 ml-0.5">
                    {node.type === 'Regulateur' ? '⚖' : node.type === 'Norme' || node.type === 'Referentiel' ? '📋' : node.type === 'LigneDefense' ? '🛡' : ''}
                  </span>
                </span>
              ))}
              {ontologyExpansion.length > 12 && (
                <span className="px-2.5 py-1 rounded-full text-xs text-foreground-400 bg-background-200/60 whitespace-nowrap">
                  +{ontologyExpansion.length - 12} autres
                </span>
              )}
              {ontologyExpansion.length === 0 && (
                <span className="text-xs text-foreground-400 italic">Aucune expansion trouvée pour ce contexte</span>
              )}
            </div>
          </div>

          {/* RAG Pipeline — Pinecone (prod) ou In-Memory (fallback) */}
          <div className="mt-4 p-4 rounded-lg bg-background-100/70 border border-background-200/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-secondary-500/15 flex items-center justify-center">
                  <i className="ri-stack-line text-secondary-600 text-xs"></i>
                </div>
                <span className="text-xs font-semibold text-foreground-700 uppercase tracking-wide">
                  RAG Pipeline
                  {' — '}
                  {pineconeRAG.data && !pineconeRAG.usingFallback
                    ? `Top ${pineconeRAG.data.results.length} Résultats`
                    : `Top ${ragResult.results.length} Résultats (sur ${ragResult.totalCandidates} sources)`
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xxs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                    pineconeRAG.data && !pineconeRAG.usingFallback
                      ? 'bg-accent-100 text-accent-700'
                      : pineconeRAG.loading
                        ? 'bg-secondary-100 text-secondary-600'
                        : 'bg-background-200/80 text-foreground-500'
                  }`}
                >
                  {pineconeRAG.data && !pineconeRAG.usingFallback
                    ? 'Pinecone + OpenAI'
                    : pineconeRAG.loading
                      ? 'Connexion Pinecone...'
                      : 'In-Memory'
                  }
                </span>
                {pineconeRAG.data && !pineconeRAG.usingFallback && (
                  <>
                    <span className="text-xxs text-foreground-400">
                      {pineconeRAG.data.rerankedCount} candidats · {pineconeRAG.data.results.length} retenus
                    </span>
                    {pineconeRAG.data.evidenceValid !== undefined && (
                      <span className={`text-xxs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${
                        pineconeRAG.data.evidenceValid
                          ? 'bg-accent-100 text-accent-700'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {pineconeRAG.data.evidenceValid ? 'Evidence Chain ✓' : 'Evidence Chain ✗'}
                      </span>
                    )}
                  </>
                )}
                {pineconeRAG.usingFallback && (
                  <span className="text-xxs text-foreground-400">
                    {ragResult.rerankedCount} candidats · {ragResult.results.length} retenus
                  </span>
                )}
              </div>
            </div>

            {/* Pinecone results (production) */}
            {pineconeRAG.data && !pineconeRAG.usingFallback && (
              <div className="flex flex-col gap-2">
                {pineconeRAG.data.results.slice(0, 5).map((result, i) => {
                  const safeMeta = result.metadata || {};
                  const safePriority = typeof safeMeta.priority === 'number' ? safeMeta.priority : 5;
                  const safeFraicheur = typeof result.fraicheur === 'number' && !isNaN(result.fraicheur) ? result.fraicheur : 0.5;
                  const safeCitations = typeof safeMeta.citations === 'number' ? safeMeta.citations : 0;
                  const safeJuridiction = typeof safeMeta.juridiction === 'string' ? safeMeta.juridiction : 'BCEAO';
                  const safeRegScore = typeof result.regScore === 'number' && !isNaN(result.regScore) ? result.regScore : 0.5;
                  const safeScore = typeof result.score === 'number' && !isNaN(result.score) ? result.score : 0.3;
                  const safeQualiteDoc = typeof safeMeta.qualite_doc === 'number' ? safeMeta.qualite_doc : 0.6;
                  const metierArray = Array.isArray(safeMeta.metier) ? safeMeta.metier : [];
                  const appScore = metierArray.includes(intent?.metier || '') ? 1 : 0;
                  return (
                  <div key={result.id || i} className="flex items-center gap-3 p-2 rounded-md bg-background-50/80 border border-background-200/40">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-500 flex items-center justify-center">
                      <span className="text-background-50 text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-foreground-800 truncate">{safeMeta.type || 'Document'} — {safeJuridiction}</span>
                        <span className="text-xxs px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 whitespace-nowrap font-medium">
                          P{safePriority}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xxs text-foreground-400">
                          Score: <strong className="text-accent-700">{safeRegScore.toFixed(3)}</strong>
                        </span>
                        <span className="text-xxs text-foreground-400">
                          Fraîcheur: <strong className="text-foreground-600">{(safeFraicheur * 100).toFixed(0)}%</strong>
                        </span>
                        <span className="text-xxs text-foreground-400">
                          Citations: <strong className="text-foreground-600">{safeCitations}</strong>
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1">
                        {[
                          { key: 'vec', val: safeScore, label: 'VSim' },
                          { key: 'aut', val: Math.max(0, 1.1 - safePriority * 0.15) / 1.1, label: 'Aut' },
                          { key: 'jur', val: safeJuridiction === (intent?.juridiction || 'BCEAO') ? 1 : 0.5, label: 'Jur' },
                          { key: 'fra', val: safeFraicheur, label: 'Fr' },
                          { key: 'cit', val: Math.min(safeCitations / 10, 1), label: 'Cit' },
                          { key: 'app', val: appScore, label: 'App' },
                          { key: 'qua', val: safeQualiteDoc, label: 'Qua' },
                        ].map(factor => (
                          <div
                            key={factor.key}
                            className="flex-1 h-1 rounded-full"
                            style={{
                              backgroundColor: `oklch(var(--accent-500) / ${0.15 + factor.val * 0.85})`,
                            }}
                            title={`${factor.label}: ${(factor.val * 100).toFixed(0)}%`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>
            )}

            {/* In-memory fallback results */}
            {(pineconeRAG.usingFallback || (!pineconeRAG.data && !pineconeRAG.loading)) && (
              <div className="flex flex-col gap-2">
                {ragResult.results.slice(0, 5).map((result, i) => (
                  <div key={result.id} className="flex items-center gap-3 p-2 rounded-md bg-background-50/80 border border-background-200/40">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-background-50 text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-foreground-800 truncate">{result.title}</span>
                        <span className="text-xxs px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700 whitespace-nowrap font-medium">
                          {result.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xxs text-foreground-400">
                          {result.jurisdiction}
                        </span>
                        <span className="text-xxs text-foreground-400">
                          Score: <strong className="text-foreground-700">{result.finalScore.toFixed(3)}</strong>
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1">
                        {[
                          { key: 'vec', val: result.rankingFactors.vectorSim, label: 'VSim' },
                          { key: 'bm25', val: result.rankingFactors.bm25, label: 'BM25' },
                          { key: 'aut', val: result.rankingFactors.autorite, label: 'Aut' },
                          { key: 'jur', val: result.rankingFactors.juridiction, label: 'Jur' },
                          { key: 'fra', val: result.rankingFactors.fraicheur, label: 'Fr' },
                          { key: 'app', val: result.rankingFactors.applicabilite, label: 'App' },
                          { key: 'cit', val: result.rankingFactors.densiteCitations, label: 'Cit' },
                          { key: 'qua', val: result.rankingFactors.qualiteDoc, label: 'Qua' },
                        ].map(factor => (
                          <div
                            key={factor.key}
                            className="flex-1 h-1 rounded-full"
                            style={{
                              backgroundColor: `oklch(var(--primary-500) / ${0.15 + factor.val * 0.85})`,
                            }}
                            title={`${factor.label}: ${(factor.val * 100).toFixed(0)}%`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Loading state */}
            {pineconeRAG.loading && !pineconeRAG.data && !pineconeRAG.usingFallback && (
              <div className="flex items-center justify-center py-6">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-foreground-400">Connexion à Pinecone + OpenAI...</span>
                </div>
              </div>
            )}

            {/* Empty state — search bar hint */}
            {!hasSearched && (
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <i className="ri-arrow-up-line text-foreground-300 text-2xl block mb-2"></i>
                  <p className="text-xs text-foreground-400">
                    Saisissez une requête réglementaire ci-dessus pour lancer l'analyse Big Four
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content — Grid 2/3 + 1/3 */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Big Four Artefact Report (dynamique) */}
          <div className="lg:col-span-2">
            <RegTechResponseView data={response} jurisdiction={intent.juridiction} />
          </div>

          {/* Right — KPI Dashboard (dynamique) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <KpiDashboard kpis={computedKPIs} />
            </div>
          </div>
        </div>

        {/* Footer badge */}
        <div className="mt-12 pt-6 border-t border-background-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-foreground-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span>KOS Cognitive OS™ v1.0</span>
            <span className="hidden sm:inline">·</span>
            <span>Big Four Action Artefact</span>
            <span className="hidden sm:inline">·</span>
            <span>10 Actions · 12 KPIs</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              Intent Engine
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
              Ontology Engine
            </span>
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${pineconeRAG.data && !pineconeRAG.usingFallback ? 'bg-accent-500' : 'bg-secondary-500'}`}></span>
              {pineconeRAG.data && !pineconeRAG.usingFallback ? 'Pinecone RAG' : 'RAG Engine'}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}



