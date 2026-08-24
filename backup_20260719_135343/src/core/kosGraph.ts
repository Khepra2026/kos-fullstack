// ═══════════════════════════════════════════════════════════════════════════
// KOS GRAPH ENGINE™ — TypeScript Knowledge Operating System
// Remplace NetworkX pour le navigateur. Graphe orienté avec métadonnées.
// Persiste dans Supabase (kg_entities + kg_relations).
// ═══════════════════════════════════════════════════════════════════════════

export interface node {
  id: string;
  type: 'document' | 'thematique' | 'concept' | 'regulator' | 'sector' | 'cluster' | string;
  label: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
}

export interface edge {
  source: string;
  target: string;
  relation: string;
  weight?: number;
  confidence?: number;
  metadata?: Record<string, unknown>;
}

interface AdjacencyEntry {
  target: string;
  relation: string;
  weight: number;
  confidence: number;
}

export class graph {
  private nodes: Map<string, node> = new Map();
  private adjacency: Map<string, AdjacencyEntry[]> = new Map();
  private reverseAdjacency: Map<string, AdjacencyEntry[]> = new Map();

  // ─── NODE OPERATIONS ─────────────────────────────────────────────────

  addNode(node: node): void {
    this.nodes.set(node.id, { ...node });
    if (!this.adjacency.has(node.id)) this.adjacency.set(node.id, []);
    if (!this.reverseAdjacency.has(node.id)) this.reverseAdjacency.set(node.id, []);
  }

  getNode(id: string): node | undefined {
    return this.nodes.get(id);
  }

  hasNode(id: string): boolean {
    return this.nodes.has(id);
  }

  removeNode(id: string): void {
    this.nodes.delete(id);
    this.adjacency.delete(id);
    this.reverseAdjacency.delete(id);
    for (const [, edges] of this.adjacency) {
      const idx = edges.findIndex(e => e.target === id);
      if (idx !== -1) edges.splice(idx, 1);
    }
    for (const [, edges] of this.reverseAdjacency) {
      const idx = edges.findIndex(e => e.target === id);
      if (idx !== -1) edges.splice(idx, 1);
    }
  }

  getAllNodes(): node[] {
    return Array.from(this.nodes.values());
  }

  getNodesByType(type: string): node[] {
    return this.getAllNodes().filter(n => n.type === type);
  }

  get nodeCount(): number {
    return this.nodes.size;
  }

  // ─── EDGE OPERATIONS ─────────────────────────────────────────────────

  addEdge(edge: edge): void {
    if (!this.nodes.has(edge.source)) {
      this.addNode({ id: edge.source, type: 'concept', label: edge.source });
    }
    if (!this.nodes.has(edge.target)) {
      this.addNode({ id: edge.target, type: 'concept', label: edge.target });
    }

    const entry: AdjacencyEntry = {
      target: edge.target,
      relation: edge.relation,
      weight: edge.weight ?? 1.0,
      confidence: edge.confidence ?? 1.0,
    };

    // Forward adjacency
    const fwd = this.adjacency.get(edge.source) || [];
    const existingIdx = fwd.findIndex(e => e.target === edge.target && e.relation === edge.relation);
    if (existingIdx !== -1) {
      fwd[existingIdx] = entry; // replace
    } else {
      fwd.push(entry);
    }
    this.adjacency.set(edge.source, fwd);

    // Reverse adjacency (for predecessor queries)
    const rev: AdjacencyEntry = { ...entry, target: edge.source };
    const revList = this.reverseAdjacency.get(edge.target) || [];
    const revIdx = revList.findIndex(e => e.target === edge.source && e.relation === edge.relation);
    if (revIdx !== -1) {
      revList[revIdx] = rev;
    } else {
      revList.push(rev);
    }
    this.reverseAdjacency.set(edge.target, revList);
  }

  getEdges(source?: string): edge[] {
    const result: edge[] = [];
    const entries = source ? (this.adjacency.get(source) || []) : [];
    const sources = source ? [source] : Array.from(this.adjacency.keys());

    for (const src of sources) {
      for (const e of (this.adjacency.get(src) || [])) {
        result.push({
          source: src,
          target: e.target,
          relation: e.relation,
          weight: e.weight,
          confidence: e.confidence,
        });
      }
    }
    return result;
  }

  get edgeCount(): number {
    let count = 0;
    for (const [, edges] of this.adjacency) count += edges.length;
    return count;
  }

  // ─── GRAPH TRAVERSAL ─────────────────────────────────────────────────

  /** Get successors (outgoing neighbors) */
  getSuccessors(nodeId: string): node[] {
    const edges = this.adjacency.get(nodeId) || [];
    return edges
      .map(e => this.nodes.get(e.target))
      .filter((n): n is node => n !== undefined);
  }

  /** Get successors with relation info */
  getSuccessorsWithRelations(nodeId: string): Array<{ node: node; relation: string; weight: number }> {
    const edges = this.adjacency.get(nodeId) || [];
    return edges
      .map(e => ({ node: this.nodes.get(e.target), relation: e.relation, weight: e.weight }))
      .filter((r): r is { node: node; relation: string; weight: number } => r.node !== undefined);
  }

  /** Get predecessors (incoming neighbors) */
  getPredecessors(nodeId: string): node[] {
    const edges = this.reverseAdjacency.get(nodeId) || [];
    return edges
      .map(e => this.nodes.get(e.target))
      .filter((n): n is node => n !== undefined);
  }

  /** Get all neighbors (both directions) */
  getNeighbors(nodeId: string): node[] {
    const succ = this.getSuccessors(nodeId);
    const pred = this.getPredecessors(nodeId);
    const seen = new Set<string>();
    const result: node[] = [];
    for (const n of [...succ, ...pred]) {
      if (!seen.has(n.id)) {
        seen.add(n.id);
        result.push(n);
      }
    }
    return result;
  }

  /** BFS to find related nodes within maxHops */
  findRelated(nodeId: string, maxHops: number = 2, relationFilter?: string[]): Array<{ node: node; hops: number; path: string[] }> {
    const visited = new Set<string>([nodeId]);
    const queue: Array<{ id: string; hops: number; path: string[] }> = [{ id: nodeId, hops: 0, path: [nodeId] }];
    const result: Array<{ node: node; hops: number; path: string[] }> = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.hops >= maxHops) continue;

      const edges = this.adjacency.get(current.id) || [];
      for (const e of edges) {
        if (visited.has(e.target)) continue;
        if (relationFilter && !relationFilter.includes(e.relation)) continue;

        visited.add(e.target);
        const node = this.nodes.get(e.target);
        if (node) {
          const newPath = [...current.path, e.target];
          result.push({ node, hops: current.hops + 1, path: newPath });
          queue.push({ id: e.target, hops: current.hops + 1, path: newPath });
        }
      }
    }

    return result;
  }

  /** Find all themes related to a given topic (document/concept) */
  findRelatedThemes(nodeId: string, maxHops: number = 2): string[] {
    const related = this.findRelated(nodeId, maxHops);
    return related
      .filter(r => r.node.type === 'thematique' || r.node.type === 'cluster')
      .map(r => r.node.label);
  }

  /** Find all documents related to a given theme */
  findRelatedDocuments(themeId: string, maxHops: number = 2): node[] {
    const related = this.findRelated(themeId, maxHops);
    return related
      .filter(r => r.node.type === 'document')
      .map(r => r.node);
  }

  // ─── SERIALIZATION ───────────────────────────────────────────────────

  toJSON(): { nodes: node[]; edges: edge[] } {
    return {
      nodes: this.getAllNodes(),
      edges: this.getEdges(),
    };
  }

  fromJSON(data: { nodes: node[]; edges: edge[] }): void {
    this.nodes.clear();
    this.adjacency.clear();
    this.reverseAdjacency.clear();

    for (const node of data.nodes) {
      this.addNode(node);
    }
    for (const edge of data.edges) {
      this.addEdge(edge);
    }
  }

  static fromJSON(data: { nodes: node[]; edges: edge[] }): graph {
    const graph = new graph();
    graph.fromJSON(data);
    return graph;
  }

  // ─── STATISTICS ──────────────────────────────────────────────────────

  getStats(): {
    totalNodes: number;
    totalEdges: number;
    nodeTypes: Record<string, number>;
    relationTypes: Record<string, number>;
    avgDegree: number;
  } {
    const nodeTypes: Record<string, number> = {};
    const relationTypes: Record<string, number> = {};
    let totalDegree = 0;

    for (const node of this.nodes.values()) {
      nodeTypes[node.type] = (nodeTypes[node.type] || 0) + 1;
    }

    for (const [, edges] of this.adjacency) {
      totalDegree += edges.length;
      for (const e of edges) {
        relationTypes[e.relation] = (relationTypes[e.relation] || 0) + 1;
      }
    }

    return {
      totalNodes: this.nodes.size,
      totalEdges: this.edgeCount,
      nodeTypes,
      relationTypes,
      avgDegree: this.nodes.size > 0 ? Math.round((totalDegree / this.nodes.size) * 100) / 100 : 0,
    };
  }

  /** Clear all data */
  clear(): void {
    this.nodes.clear();
    this.adjacency.clear();
    this.reverseAdjacency.clear();
  }
}

// ─── SINGLETON ─────────────────────────────────────────────────────────

let globalKOSInstance: graph | null = null;

export function getGlobalKOSGraph(): graph {
  if (!globalKOSInstance) {
    globalKOSInstance = new graph();
  }
  return globalKOSInstance;
}

export function resetGlobalKOSGraph(): void {
  globalKOSInstance = new graph();
}



