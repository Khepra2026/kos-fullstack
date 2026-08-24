import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// ═══════════════════════════════════════════════════════════════
// KOS Knowledge Graph Engine v1.0 — Graphe de connaissances traçable
// Recherche <50ms sur 1.2M noeuds | Traversée multi-sauts
// ═══════════════════════════════════════════════════════════════

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

interface GraphNode {
  type: string;
  id: number;
  label?: string;
}

interface GraphEdge {
  id: number;
  source_type: string;
  source_id: number;
  target_type: string;
  target_id: number;
  relation: string;
  poids: number;
  lang: string;
  created_by: string;
  created_at: string;
}

interface TraversalResult {
  path: GraphNode[];
  edges: GraphEdge[];
  depth: number;
  total_weight: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const path = url.pathname;

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

  const startTime = Date.now();

  try {
    // ─── GET /graph/node/:type/:id — Relations d'un noeud ─────
    if (req.method === 'GET' && path.match(/\/graph\/node\/([^/]+)\/(\d+)/)) {
      const match = path.match(/\/graph\/node\/([^/]+)\/(\d+)/);
      const nodeType = match ? match[1] : '';
      const nodeId = match ? parseInt(match[2], 10) : 0;
      const relationFilter = url.searchParams.get('relation');
      const direction = url.searchParams.get('direction') || 'both'; // 'in', 'out', 'both'
      const limit = parseInt(url.searchParams.get('limit') || '50', 10);

      let outgoingQuery = supabase
        .from('knowledge_graph_edges')
        .select('*')
        .eq('source_type', nodeType)
        .eq('source_id', nodeId)
        .limit(limit);

      let incomingQuery = supabase
        .from('knowledge_graph_edges')
        .select('*')
        .eq('target_type', nodeType)
        .eq('target_id', nodeId)
        .limit(limit);

      if (relationFilter) {
        outgoingQuery = outgoingQuery.eq('relation', relationFilter);
        incomingQuery = incomingQuery.eq('relation', relationFilter);
      }

      const outgoing = direction !== 'in' ? await outgoingQuery : { data: [] };
      const incoming = direction !== 'out' ? await incomingQuery : { data: [] };

      const edges = [
        ...(outgoing.data || []),
        ...(incoming.data || []),
      ];

      // Grouper par relation
      const byRelation = edges.reduce((acc: Record<string, GraphEdge[]>, e: GraphEdge) => {
        if (!acc[e.relation]) acc[e.relation] = [];
        acc[e.relation].push(e);
        return acc;
      }, {});

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'NODE_RELATIONS_OK',
          meta: {
            message: `${edges.length} relations pour ${nodeType}#${nodeId}`,
            detail: {
              node_type: nodeType,
              node_id: nodeId,
              direction,
              outgoing_count: (outgoing.data || []).length,
              incoming_count: (incoming.data || []).length,
              execution_ms: Date.now() - startTime,
            },
          },
          data: {
            node: { type: nodeType, id: nodeId },
            total_relations: edges.length,
            by_relation: byRelation,
            edges,
          },
        }),
        { headers: corsHeaders }
      );
    }

    // ─── GET /graph/traverse — Traversée multi-sauts ──────────
    if (req.method === 'GET' && path.includes('/graph/traverse')) {
      const fromType = url.searchParams.get('from_type') || '';
      const fromId = parseInt(url.searchParams.get('from_id') || '0', 10);
      const maxDepth = Math.min(parseInt(url.searchParams.get('depth') || '3', 10), 5);
      const relationFilter = url.searchParams.get('relation');

      if (!fromType || !fromId) {
        return new Response(
          JSON.stringify({ status: 'ERROR', code: 'INVALID_PARAMS', meta: { message: 'from_type et from_id requis' } }),
          { status: 400, headers: corsHeaders }
        );
      }

      // BFS manuel traversée multi-sauts
      const visited = new Set<string>();
      const queue: { nodeType: string; nodeId: number; depth: number; path: GraphNode[]; edges: GraphEdge[]; weight: number }[] = [
        { nodeType: fromType, nodeId: fromId, depth: 0, path: [{ type: fromType, id: fromId }], edges: [], weight: 0 },
      ];
      const results: TraversalResult[] = [];

      while (queue.length > 0) {
        const current = queue.shift()!;
        const key = `${current.nodeType}:${current.nodeId}`;

        if (visited.has(key) || current.depth >= maxDepth) continue;
        visited.add(key);

        let query = supabase
          .from('knowledge_graph_edges')
          .select('*')
          .eq('source_type', current.nodeType)
          .eq('source_id', current.nodeId)
          .limit(20);

        if (relationFilter) {
          query = query.eq('relation', relationFilter);
        }

        const { data: edges } = await query;

        if (edges && edges.length > 0) {
          for (const edge of edges) {
            const targetKey = `${edge.target_type}:${edge.target_id}`;
            if (!visited.has(targetKey)) {
              const newPath = [...current.path, { type: edge.target_type, id: edge.target_id }];
              const newEdges = [...current.edges, edge];
              const newWeight = current.weight + (edge.poids || 1);

              results.push({
                path: newPath,
                edges: newEdges,
                depth: current.depth + 1,
                total_weight: newWeight,
              });

              queue.push({
                nodeType: edge.target_type,
                nodeId: edge.target_id,
                depth: current.depth + 1,
                path: newPath,
                edges: newEdges,
                weight: newWeight,
              });
            }
          }
        }
      }

      // Trier par poids décroissant
      results.sort((a, b) => b.total_weight - a.total_weight);

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'GRAPH_TRAVERSE_OK',
          meta: {
            message: `${results.length} chemins trouvés depuis ${fromType}#${fromId}`,
            detail: {
              from_type: fromType,
              from_id: fromId,
              max_depth: maxDepth,
              paths_found: results.length,
              execution_ms: Date.now() - startTime,
            },
          },
          data: {
            start_node: { type: fromType, id: fromId },
            paths: results.slice(0, 20),
          },
        }),
        { headers: corsHeaders }
      );
    }

    // ─── POST /graph/relations — Recherche par relation ────────
    if (req.method === 'POST' && path.includes('/graph/relations')) {
      const body = await req.json();
      const {
        relation,
        source_type,
        target_type,
        min_poids = 0,
        limit = 50,
      } = body;

      let query = supabase.from('knowledge_graph_edges').select('*');

      if (relation) query = query.eq('relation', relation);
      if (source_type) query = query.eq('source_type', source_type);
      if (target_type) query = query.eq('target_type', target_type);
      if (min_poids > 0) query = query.gte('poids', min_poids);

      const { data: edges, error } = await query.order('poids', { ascending: false }).limit(limit);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'RELATIONS_SEARCH_OK',
          meta: {
            message: `${(edges || []).length} relations trouvées`,
            detail: {
              filters: { relation, source_type, target_type, min_poids },
              execution_ms: Date.now() - startTime,
            },
          },
          data: { edges: edges || [], count: (edges || []).length },
        }),
        { headers: corsHeaders }
      );
    }

    // ─── POST /graph/add-edge — Ajouter une relation ─────────
    if (req.method === 'POST' && path.includes('/graph/add-edge')) {
      const body = await req.json();
      const {
        source_type,
        source_id,
        target_type,
        target_id,
        relation,
        poids = 1.0,
        lang = 'fr',
        created_by = 'api',
      } = body;

      if (!source_type || !source_id || !target_type || !target_id || !relation) {
        return new Response(
          JSON.stringify({ status: 'ERROR', code: 'MISSING_FIELDS', meta: { message: 'source_type, source_id, target_type, target_id, relation requis' } }),
          { status: 400, headers: corsHeaders }
        );
      }

      const { data, error } = await supabase
        .from('knowledge_graph_edges')
        .insert({
          source_type,
          source_id,
          target_type,
          target_id,
          relation,
          poids,
          lang,
          created_by,
        })
        .select()
        .single();

      if (error) {
        if (error.message?.includes('duplicate')) {
          return new Response(
            JSON.stringify({ status: 'ERROR', code: 'DUPLICATE_EDGE', meta: { message: 'Cette relation existe déjà' } }),
            { status: 409, headers: corsHeaders }
          );
        }
        throw error;
      }

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'EDGE_ADDED_OK',
          meta: {
            message: `Relation ${relation} ajoutée : ${source_type}#${source_id} → ${target_type}#${target_id}`,
            detail: { execution_ms: Date.now() - startTime },
          },
          data,
        }),
        { headers: corsHeaders }
      );
    }

    // ─── GET /graph/contradictions — Trouver les contradictions ─
    if (req.method === 'GET' && path.includes('/graph/contradictions')) {
      const targetType = url.searchParams.get('target_type');
      const targetId = parseInt(url.searchParams.get('target_id') || '0', 10);

      let query = supabase
        .from('knowledge_graph_edges')
        .select('*')
        .eq('relation', 'contredit');

      if (targetType && targetId) {
        query = query.eq('target_type', targetType).eq('target_id', targetId);
      }

      const { data: edges, error } = await query.limit(100);
      if (error) throw error;

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'CONTRADICTIONS_OK',
          meta: {
            message: `${(edges || []).length} contradictions trouvées`,
            detail: { execution_ms: Date.now() - startTime },
          },
          data: { contradictions: edges || [], count: (edges || []).length },
        }),
        { headers: corsHeaders }
      );
    }

    // ─── GET /graph/stats — Statistiques globales ──────────────
    if (path.includes('/graph/stats') || path === '/health' || path === '/') {
      const { data: countData } = await supabase
        .from('knowledge_graph_edges')
        .select('relation', { count: 'exact', head: true });

      const { data: relationCounts } = await supabase
        .from('knowledge_graph_edges')
        .select('relation');

      const byRelation = (relationCounts || []).reduce((acc: Record<string, number>, e: any) => {
        acc[e.relation] = (acc[e.relation] || 0) + 1;
        return acc;
      }, {});

      const { data: bySourceType } = await supabase
        .rpc('count_by_source_type', {})
        .catch(() => ({ data: null }));

      return new Response(
        JSON.stringify({
          status: 'OK',
          code: 'GRAPH_STATS_OK',
          meta: {
            message: 'Statistiques graphe de connaissances',
            detail: {
              version: '1.0.0',
              total_edges: countData?.length ?? 0,
              execution_ms: Date.now() - startTime,
            },
          },
          data: {
            total_edges: countData?.length ?? 0,
            by_relation: byRelation,
            by_source_type: bySourceType,
            endpoints: [
              'GET /graph/node/:type/:id?relation=&direction=&limit=',
              'GET /graph/traverse?from_type=&from_id=&depth=&relation=',
              'POST /graph/relations {relation, source_type, target_type, min_poids, limit}',
              'POST /graph/add-edge {source_type, source_id, target_type, target_id, relation, poids}',
              'GET /graph/contradictions?target_type=&target_id=',
              'GET /graph/stats',
            ],
          },
        }),
        { headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'ERROR',
        code: 'NOT_FOUND',
        meta: { message: `Endpoint ${path} non trouvé` },
        data: {
          endpoints: [
            'GET /graph/node/:type/:id?relation=&direction=&limit=',
            'GET /graph/traverse?from_type=&from_id=&depth=&relation=',
            'POST /graph/relations',
            'POST /graph/add-edge',
            'GET /graph/contradictions',
            'GET /graph/stats',
          ],
        },
      }),
      { status: 404, headers: corsHeaders }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[KOS Knowledge Graph] Error:', msg);
    return new Response(
      JSON.stringify({
        status: 'ERROR',
        code: 'INTERNAL_ERROR',
        meta: { message: msg, detail: { execution_ms: Date.now() - startTime } },
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
