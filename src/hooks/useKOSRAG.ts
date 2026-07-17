// ═══════════════════════════════════════════════════════════════════════════
// useKOSRAG — Hook combinant RAG Universal v9 avec enrichissement KOS Graph
// Injecte les voisins du graphe dans le contexte de la requête RAG
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KOSGraph,
  getGlobalKOSGraph,
  type KOSNode,
  type KOSEdge,
} from '@/core/kosGraph';

// ─── TYPES ──────────────────────────────────────────────────────────────

export interface KOSRAGSource {
  rank: number;
  regulator: string;
  title: string;
  title_original: string;
  type: string;
  doc_domain: string;
  doc_domain_match: boolean;
  score: number;
  v_score: number;
  f_score: number;
  jurisdiction_tier: number;
  jurisdiction_label: string;
  priority_boost: number;
  confidence: number;
  confidence_breakdown: {
    semantic: number;
    authority: number;
    citation_density: number;
    jurisdiction: number;
    freshness: number;
  };
  authority_index: number;
  risk_level: string;
  applicability: string;
  url: string;
  content_snippet: string;
  effective_date: string;
  source_tier: number;
  origin_table: string;
  cobac_reranker?: {
    active: boolean;
    is_cobac_query: boolean;
    boost_factor?: number;
    was_penalized?: boolean;
  };
}

export interface KOSRAGResult {
  answer: string;
  sources: KOSRAGSource[];
  query_domain: string;
  query_domain_label: string;
  domain_validation: {
    query_domain: string;
    query_domain_label: string;
    match_ratio: number;
    matching_sources: number;
    total_sources: number;
    verdict: string;
    threshold: number;
    domain_counts: Record<string, number>;
  };
  kos_enrichment: {
    active: boolean;
    themes_detectes: string[];
    voisins_enrichis: KOSEnrichedNeighbor[];
    nb_relations_traversees: number;
    profondeur: number;
  };
  mckinsey_memo?: {
    generated: boolean;
    risk_level: string;
    articles_extracted: number;
    sanction_exposure: string;
  } | null;
  big_four_artefact: Record<string, unknown>;
  kg_entities: unknown[];
  lang: string;
  latency_ms: number;
  engine: string;
  pipeline: string;
}

export interface KOSEnrichedNeighbor {
  nodeId: string;
  label: string;
  type: string;
  hops: number;
  path: string[];
  relation: string;
}

export interface KOSRAGQueryOptions {
  lang?: 'fr' | 'en';
  enrichKOS?: boolean;
  kosHops?: number;
  filterThematique?: string;
}

export interface KOSGraphStats {
  totalNodes: number;
  totalEdges: number;
  nodeTypes: Record<string, number>;
  relationTypes: Record<string, number>;
  avgDegree: number;
  isLive: boolean;
  loading: boolean;
  error: string | null;
}

interface UseKOSRAGReturn {
  /** Effectue une requête RAG enrichie par le KOS */
  query: (question: string, options?: KOSRAGQueryOptions) => Promise<KOSRAGResult>;
  /** Dernier résultat de requête */
  lastResult: KOSRAGResult | null;
  /** Statistiques du graphe KOS */
  graphStats: KOSGraphStats;
  /** État de chargement RAG */
  loading: boolean;
  /** Erreur éventuelle */
  error: string | null;
  /** Réinitialise le graphe KOS depuis Supabase */
  refreshGraph: () => Promise<void>;
  /** Ajoute une relation manuelle au KOS */
  addRelation: (source: string, target: string, relation: string, weight?: number) => void;
  /** Le graphe KOS lui-même (pour visualisation) */
  graph: KOSGraph;
}

// ─── DOMAIN DETECTION (aligné avec RAG v9) ─────────────────────────────

const DOMAIN_KEYWORDS: Record<string, RegExp> = {
  agrement: /agr[eé]ment|licence.*(?:microfinance|sfd|emf|établissement)|autorisation.*exercer|demande.*agr[eé]ment|conditions.*agr[eé]ment/i,
  gouvernance: /comit[eé]\s+d'?audit|conseil d'administration|gouvernance|administrateur|gouvernance|mandat/i,
  lcbft: /lcb.?ft|blanchiment|terrorisme|aml.?cft|kyc|d[eé]claration de soup[cç]on|gel des avoirs/i,
  controle_interne: /contr[oô]le(?:\s+interne)?|lignes? de d[eé]fense|coso|audit interne/i,
  risque: /cartographie des risques|app[eé]tence|stress test|risque op[eé]rationnel|risque de cr[eé]dit/i,
  finance: /ratio.*solvabilit[eé]|fonds propres|provision|cr[eé]ance|bilan|comptable|ifrs 9/i,
  digital: /digital|ia|transformation.*digitale|sig|core banking|api|open banking/i,
  esg: /esg|climat|durabilit[eé]|carbone|ifrs s[12]|issb|rse|impact/i,
};

function detectThemes(question: string): string[] {
  const q = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const themes: string[] = [];
  for (const [domain, regex] of Object.entries(DOMAIN_KEYWORDS)) {
    if (regex.test(q)) themes.push(domain);
  }
  return themes.length > 0 ? themes : ['general'];
}

// ─── HOOK ───────────────────────────────────────────────────────────────

export function useKOSRAG(): UseKOSRAGReturn {
  const [lastResult, setLastResult] = useState<KOSRAGResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [graphLive, setGraphLive] = useState(false);
  const [graphStats, setGraphStats] = useState<KOSGraphStats>({
    totalNodes: 0, totalEdges: 0, nodeTypes: {}, relationTypes: {}, avgDegree: 0,
    isLive: false, loading: true, error: null,
  });

  const graphRef = useRef<KOSGraph>(getGlobalKOSGraph());
  const initializedRef = useRef(false);

  // ─── Charger le graphe KOS depuis Supabase ───────────────────────────

  const loadGraphFromSupabase = useCallback(async () => {
    setGraphStats(prev => ({ ...prev, loading: true, error: null }));
    try {
      const [entitiesRes, relationsRes] = await Promise.all([
        supabase.from('kg_entities').select('*'),
        supabase.from('kg_relations').select('*'),
      ]);

      if (entitiesRes.error) throw entitiesRes.error;
      if (relationsRes.error) throw relationsRes.error;

      const graph = graphRef.current;
      graph.clear();

      // Charger les entités
      const entities = entitiesRes.data || [];
      const entityIdToCode = new Map<string, string>();

      for (const ent of entities) {
        const metadata = typeof ent.metadata === 'string' ? JSON.parse(ent.metadata) : (ent.metadata || {});
        graph.addNode({
          id: ent.id,
          type: ent.type || 'concept',
          label: ent.name || ent.code || '',
          metadata: {
            code: ent.code,
            regulator: ent.regulator,
            jurisdiction: ent.jurisdiction,
            effective_date: ent.effective_date,
            ...metadata,
          },
          created_at: ent.created_at,
        });
        if (ent.code) entityIdToCode.set(ent.id, ent.code);
      }

      // Charger les relations
      const relations = relationsRes.data || [];
      for (const rel of relations) {
        graph.addEdge({
          source: rel.from_entity_id,
          target: rel.to_entity_id,
          relation: rel.relation_type || 'relie_a',
          weight: rel.weight ?? 1.0,
          confidence: rel.confidence ?? 1.0,
        });
      }

      const stats = graph.getStats();
      setGraphStats({
        ...stats,
        isLive: entities.length > 0,
        loading: false,
        error: null,
      });
      setGraphLive(entities.length > 0);
    } catch (err) {
      setGraphStats(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Erreur chargement KOS',
        isLive: false,
      }));
      setGraphLive(false);
    }
  }, []);

  // ─── Seeder le KOS avec les 100 thématiques ──────────────────────────

  const seedKOSFromThematiques = useCallback(async () => {
    try {
      const { data: themes, error: themesErr } = await supabase
        .from('kos_content_thematiques')
        .select('*');

      if (themesErr) throw themesErr;
      if (!themes || themes.length === 0) return;

      const graph = graphRef.current;

      for (const t of themes) {
        const nodeId = `theme-${t.id}`;
        if (!graph.hasNode(nodeId)) {
          graph.addNode({
            id: nodeId,
            type: 'thematique',
            label: t.titre,
            metadata: {
              cluster: t.cluster,
              keywords: t.keywords,
              cta: t.cta,
              niveau: t.niveau,
            },
          });
        }

        // Lier au cluster
        if (t.cluster) {
          const clusterId = `cluster-${t.cluster.toLowerCase().replace(/\s+/g, '-')}`;
          if (!graph.hasNode(clusterId)) {
            graph.addNode({ id: clusterId, type: 'cluster', label: t.cluster });
          }
          if (!graph.getEdges(nodeId).some(e => e.target === clusterId)) {
            graph.addEdge({
              source: nodeId,
              target: clusterId,
              relation: 'appartient_a',
              weight: 0.9,
            });
            graph.addEdge({
              source: clusterId,
              target: nodeId,
              relation: 'contient',
              weight: 0.9,
            });
          }
        }
      }

      setGraphStats(prev => ({
        ...prev,
        ...graph.getStats(),
        isLive: true,
      }));
      setGraphLive(true);
    } catch {
      // Silencieux — le graphe fonctionne même sans seeding
    }
  }, []);

  // ─── Initialisation ──────────────────────────────────────────────────

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const init = async () => {
      await loadGraphFromSupabase();
      await seedKOSFromThematiques();
    };
    init();
  }, [loadGraphFromSupabase, seedKOSFromThematiques]);

  // ─── Fonction de requête KOS-RAG ─────────────────────────────────────

  const query = useCallback(async (
    question: string,
    options: KOSRAGQueryOptions = {},
  ): Promise<KOSRAGResult> => {
    setLoading(true);
    setError(null);

    const {
      lang = 'fr',
      enrichKOS = true,
      kosHops = 2,
      filterThematique,
    } = options;

    try {
      const graph = graphRef.current;
      const themesDetectes = detectThemes(question);
      const voisinsEnrichis: KOSEnrichedNeighbor[] = [];

      // ─── Enrichissement KOS ──────────────────────────────────────────
      if (enrichKOS) {
        const filterTheme = filterThematique || (themesDetectes.length > 0 ? themesDetectes[0] : null);

        if (filterTheme) {
          // Chercher le nœud correspondant au thème
          const themeNodes = graph.getNodesByType('cluster').filter(n =>
            n.label.toLowerCase().includes(filterTheme.toLowerCase())
          );

          // Si pas trouvé dans les clusters, chercher dans les thématiques
          const allThemeNodes = themeNodes.length > 0 ? themeNodes :
            graph.getNodesByType('thematique').filter(n =>
              n.label.toLowerCase().includes(filterTheme.toLowerCase()) ||
              (n.metadata?.cluster as string)?.toLowerCase()?.includes(filterTheme.toLowerCase())
            );

          for (const themeNode of allThemeNodes.slice(0, 3)) {
            const related = graph.findRelated(themeNode.id, kosHops);
            for (const r of related) {
              voisinsEnrichis.push({
                nodeId: r.node.id,
                label: r.node.label,
                type: r.node.type,
                hops: r.hops,
                path: r.path,
                relation: graph.getSuccessorsWithRelations(themeNode.id)
                  .find(s => s.node.id === r.node.id)?.relation || 'relie_a',
              });
            }
          }

          // Ajouter aussi les voisins inverses (prédécesseurs)
          for (const themeNode of allThemeNodes.slice(0, 1)) {
            const predecessors = graph.getPredecessors(themeNode.id);
            for (const pred of predecessors.slice(0, 5)) {
              if (!voisinsEnrichis.some(v => v.nodeId === pred.id)) {
                voisinsEnrichis.push({
                  nodeId: pred.id,
                  label: pred.label,
                  type: pred.type,
                  hops: 1,
                  path: [pred.id, themeNode.id],
                  relation: 'precede',
                });
              }
            }
          }
        }
      }

      // ─── Appel RAG v9 Edge Function ──────────────────────────────────

      const uniqueThemes = [...new Set([
        ...themesDetectes,
        ...voisinsEnrichis.map(v => v.label),
      ])];

      // Enrichir la question avec le contexte KOS
      const enrichedQuestion = uniqueThemes.length > 1
        ? `${question} [Contexte KOS: ${uniqueThemes.slice(0, 5).join(', ')}]`
        : question;

      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
      const anonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const resp = await fetch(`${supabaseUrl}/functions/v1/rag-universal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ query: enrichedQuestion, lang }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`RAG error (${resp.status}): ${text}`);
      }

      const data = await resp.json();

      // ─── Construire le résultat enrichi ──────────────────────────────
      const result: KOSRAGResult = {
        ...data,
        kos_enrichment: {
          active: enrichKOS,
          themes_detectes: themesDetectes,
          voisins_enrichis: voisinsEnrichis.slice(0, 15),
          nb_relations_traversees: voisinsEnrichis.length,
          profondeur: kosHops,
        },
      };

      setLastResult(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);

      // Résultat fallback
      const fallback: KOSRAGResult = {
        answer: `Erreur: ${msg}`,
        sources: [],
        query_domain: themesDetectes[0] || 'general',
        query_domain_label: themesDetectes[0] || 'Général',
        domain_validation: {
          query_domain: themesDetectes[0] || 'general',
          query_domain_label: themesDetectes[0] || 'Général',
          match_ratio: 0, matching_sources: 0, total_sources: 0,
          verdict: 'FAIL', threshold: 0.8, domain_counts: {},
        },
        kos_enrichment: {
          active: enrichKOS,
          themes_detectes: themesDetectes,
          voisins_enrichis,
          nb_relations_traversees: voisinsEnrichis.length,
          profondeur: kosHops,
        },
        big_four_artefact: {},
        kg_entities: [],
        lang,
        latency_ms: 0,
        engine: 'kos-rag-v1.0-fallback',
        pipeline: 'KOS Graph → RAG v9 (failed)',
      };

      setLastResult(fallback);
      return fallback;
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Ajout relation manuelle ─────────────────────────────────────────

  const addRelation = useCallback((
    source: string,
    target: string,
    relation: string,
    weight: number = 1.0,
  ) => {
    const graph = graphRef.current;
    graph.addEdge({ source, target, relation, weight });
    setGraphStats(prev => ({ ...prev, ...graph.getStats(), isLive: prev.isLive || true }));
    setGraphLive(true);
  }, []);

  // ─── Rafraîchir le graphe ────────────────────────────────────────────

  const refreshGraph = useCallback(async () => {
    await loadGraphFromSupabase();
    await seedKOSFromThematiques();
  }, [loadGraphFromSupabase, seedKOSFromThematiques]);

  return {
    query,
    lastResult,
    graphStats,
    loading,
    error,
    refreshGraph,
    addRelation,
    graph: graphRef.current,
  };
}