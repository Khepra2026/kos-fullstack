import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import {
  layer1InstitutionalSources,
  layer2RegulatorySources,
  layer3EconomicData,
  layer4NationalStats,
  layer5AcademicResearch,
  layer6ThinkTanks,
  layer7BigFourConsulting,
  layer8TechnicalPartners,
  layer9EconomicMedia,
  layer10Universities,
  knowledgeLinkerRelations,
  knowledgeScoring,
  knowledgeFactoryProductions,
  ragEnterprise,
  deliverableFactory,
  knowledgeGraphKPIs,
  semanticReasoningEngine,
  crossDomainQueryEngine,
} from '@/mocks/knowledgeGraph';
import {
  nodeBCEAO,
  nodeUEMOA,
  nodeOHADA,
  nodeCOBAC,
  nodeIFRS,
  nodeISA,
  nodeESG,
  nodeSFD,
  nodeFinTech,
  nodeInclusionFinanciere,
  nodeBEAC,
  regulatoryRelations,
  regulatoryTaxonomy,
  regulatoryOntologyKPIs,
  regulatoryBenchmark,
  implementationPlan,
  ontologyControls,
} from '@/mocks/knowledgeGraphRegulatory';

type GraphTab = 'l1' | 'l2' | 'l3' | 'l4' | 'l5' | 'l6' | 'l7' | 'l8' | 'l9' | 'l10' | 'a11' | 'a12' | 'a13' | 'a14' | 'a15' | 'a16' | 'a17' | 'a18';

interface TabInfo {
  id: GraphTab;
  label: string;
  subtitle: string;
  icon: string;
  count: number;
  color: 'primary' | 'accent' | 'secondary';
  isAgent?: boolean;
}

const tabs: TabInfo[] = [
  { id: 'l1', label: 'Couche 1 — États', subtitle: 'Sources institutionnelles gouvernementales', icon: 'ri-government-line', count: layer1InstitutionalSources.length, color: 'primary' },
  { id: 'l2', label: 'Couche 2 — Régulation', subtitle: 'BCEAO, COBAC, OHADA, autorités de supervision', icon: 'ri-shield-check-line', count: layer2RegulatorySources.length, color: 'secondary' },
  { id: 'l3', label: 'Couche 3 — Économie', subtitle: 'FMI, Banque Mondiale, BAD, OCDE, BRI', icon: 'ri-funds-line', count: layer3EconomicData.length, color: 'accent' },
  { id: 'l4', label: 'Couche 4 — Statistiques', subtitle: 'Instituts statistiques nationaux et mondiaux', icon: 'ri-bar-chart-2-line', count: layer4NationalStats.length, color: 'primary' },
  { id: 'l5', label: 'Couche 5 — Recherche', subtitle: 'SSRN, JSTOR, HAL, NBER, Springer', icon: 'ri-article-line', count: layer5AcademicResearch.length, color: 'secondary' },
  { id: 'l6', label: 'Couche 6 — Think Tanks', subtitle: 'Brookings, Chatham House, Bruegel, CSIS', icon: 'ri-lightbulb-flash-line', count: layer6ThinkTanks.length, color: 'accent' },
  { id: 'l7', label: 'Couche 7 — Big Four', subtitle: 'Deloitte, PwC, EY, KPMG, McKinsey, BCG', icon: 'ri-building-line', count: layer7BigFourConsulting.length, color: 'primary' },
  { id: 'l8', label: 'Couche 8 — PTF', subtitle: 'PNUD, AFD, Banque Mondiale, GIZ, USAID', icon: 'ri-hand-heart-line', count: layer8TechnicalPartners.length, color: 'secondary' },
  { id: 'l9', label: 'Couche 9 — Médias', subtitle: 'Reuters, Bloomberg, FT, Jeune Afrique, Ecofin', icon: 'ri-newspaper-line', count: layer9EconomicMedia.length, color: 'accent' },
  { id: 'l10', label: 'Couche 10 — Universités', subtitle: 'Harvard, LSE, Sciences Po, MIT, UCAD, HEC', icon: 'ri-graduation-cap-line', count: layer10Universities.length, color: 'primary' },
  { id: 'a11', label: 'Agent 11 — Linker', subtitle: 'Relations entre entités du graphe', icon: 'ri-link-m', count: knowledgeLinkerRelations.length, color: 'secondary', isAgent: true },
  { id: 'a12', label: 'Agent 12 — Scoring', subtitle: 'Notation importance, fiabilité, actualité, pertinence', icon: 'ri-bar-chart-grouped-line', count: knowledgeScoring.length, color: 'accent', isAgent: true },
  { id: 'a13', label: 'Agent 13 — Factory', subtitle: 'Production automatique de contenus experts', icon: 'ri-book-open-line', count: knowledgeFactoryProductions.length, color: 'primary', isAgent: true },
  { id: 'a14', label: 'Agent 14 — RAG Enterprise', subtitle: 'Indexation vectorielle et recherche sémantique', icon: 'ri-database-2-line', count: ragEnterprise.length, color: 'secondary', isAgent: true },
  { id: 'a15', label: 'Agent 15 — Deliverable Factory', subtitle: 'Génération automatique de livrables Big Four', icon: 'ri-file-text-line', count: deliverableFactory.length, color: 'accent', isAgent: true },
  { id: 'a16', label: 'Agent 16 — Ontologie Réglementaire', subtitle: 'Graphe sémantique BCEAO·OHADA·IFRS·ESG·FinTech·SFD', icon: 'ri-mind-map', count: regulatoryOntologyKPIs.totalNodes, color: 'primary', isAgent: true },
  { id: 'a17', label: 'Agent 17 — Semantic Reasoning Engine™', subtitle: 'Raisonnement multi-sauts — 5 niveaux, 95.2% précision, 1.8s', icon: 'ri-brain-2-line', count: semanticReasoningEngine.totalQueriesHandled, color: 'accent', isAgent: true },
  { id: 'a18', label: 'Agent 18 — Cross-Domain Query Engine™', subtitle: '12 domaines interconnectés, 98.4% précision NL→Query, 0.85s', icon: 'ri-search-eye-line', count: crossDomainQueryEngine.domainsConnected, color: 'secondary', isAgent: true },
];

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-xs font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function ProgressBar({ value, max = 100, color = 'primary', label }: { value: number; max?: number; color?: string; label?: string }) {
  const pct = Math.round((value / max) * 100);
  const barColor = color === 'accent' ? 'bg-accent-500' : color === 'secondary' ? 'bg-secondary-500' : 'bg-primary-500';
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs text-foreground-600 mb-1"><span>{label}</span><span>{pct}%</span></div>}
      <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    intermittent: 'bg-amber-100 text-amber-700 border-amber-200',
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-amber-100 text-amber-800 border-amber-200',
    medium: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    Published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'In Review': 'bg-purple-100 text-purple-700 border-purple-200',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
    Draft: 'bg-slate-100 text-slate-600 border-slate-200',
    Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Tier 1': 'bg-red-50 text-red-700 border-red-200',
    'Tier 2': 'bg-amber-50 text-amber-700 border-amber-200',
    'Tier 3': 'bg-secondary-50 text-secondary-600 border-secondary-200',
    Forte: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Critique: 'bg-red-50 text-red-700 border-red-200',
    Directe: 'bg-primary-100 text-primary-700 border-primary-200',
    Expert: 'bg-accent-100 text-accent-700 border-accent-200',
    Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  const classes = bgMap[variant] || 'bg-background-200 text-foreground-700 border-background-200';
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

function formatNumber(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val.toLocaleString('fr-FR');
}

// ============================================================
// AGENT 11 — Knowledge Graph Network Visualization
// ============================================================
type RelationCategory = 'Régulation' | 'Secteur' | 'Institution' | 'AO' | 'Étude' | 'Expert' | 'Statistiques' | 'Livrable' | 'ThinkTank' | 'Université' | 'Média';

const categoryConfig: Record<RelationCategory, { color: string; icon: string; label: string }> = {
  Régulation: { color: 'bg-red-500', icon: 'ri-shield-check-line', label: 'Régulation' },
  Secteur: { color: 'bg-amber-500', icon: 'ri-pie-chart-line', label: 'Secteur' },
  Institution: { color: 'bg-primary-500', icon: 'ri-bank-line', label: 'Institution' },
  AO: { color: 'bg-emerald-500', icon: 'ri-file-search-line', label: 'Appel d\'Offres' },
  Étude: { color: 'bg-violet-500', icon: 'ri-article-line', label: 'Étude' },
  Expert: { color: 'bg-accent-500', icon: 'ri-user-star-line', label: 'Expert' },
  Statistiques: { color: 'bg-cyan-500', icon: 'ri-bar-chart-2-line', label: 'Statistiques' },
  Livrable: { color: 'bg-secondary-500', icon: 'ri-file-text-line', label: 'Livrable' },
  ThinkTank: { color: 'bg-orange-500', icon: 'ri-lightbulb-flash-line', label: 'Think Tank' },
  Université: { color: 'bg-indigo-500', icon: 'ri-graduation-cap-line', label: 'Université' },
  Média: { color: 'bg-pink-500', icon: 'ri-newspaper-line', label: 'Média' },
};

function detectCategory(sourceType: string, from: string, to: string): RelationCategory {
  const combined = `${sourceType} ${from} ${to}`.toLowerCase();
  if (combined.includes('réglementation') || combined.includes('régulation')) return 'Régulation';
  if (combined.includes('secteur') || combined.includes('sectoriel')) return 'Secteur';
  if (combined.includes('institution') || combined.includes('financement')) return 'Institution';
  if (combined.includes('ao') || combined.includes('bailleur')) return 'AO';
  if (combined.includes('étude') || combined.includes('mission')) return 'Étude';
  if (combined.includes('expert') || combined.includes('advisor')) return 'Expert';
  if (combined.includes('statistique') || combined.includes('données')) return 'Statistiques';
  if (combined.includes('livrable') || combined.includes('référence')) return 'Livrable';
  if (combined.includes('think') || combined.includes('politique')) return 'ThinkTank';
  if (combined.includes('université') || combined.includes('recherche')) return 'Université';
  return 'Média';
}

function KnowledgeGraphNetwork({ relations }: { relations: typeof knowledgeLinkerRelations }) {
  const [selectedRel, setSelectedRel] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<RelationCategory | 'all'>('all');

  const categories: (RelationCategory | 'all')[] = ['all', 'Régulation', 'Secteur', 'Institution', 'AO', 'Étude', 'Expert', 'Statistiques', 'Livrable', 'ThinkTank', 'Université', 'Média'];

  const filtered = filterCategory === 'all' ? relations : relations.filter(r => detectCategory(r.source_type, r.from, r.to) === filterCategory);

  // Build unique nodes
  const nodeSet = new Map<string, { count: number; categories: Set<string> }>();
  filtered.forEach(r => {
    const cat = detectCategory(r.source_type, r.from, r.to);
    [r.from, r.to].forEach(n => {
      if (!nodeSet.has(n)) nodeSet.set(n, { count: 0, categories: new Set() });
      const entry = nodeSet.get(n)!;
      entry.count++;
      entry.categories.add(cat);
    });
  });

  const nodes = Array.from(nodeSet.entries()).sort((a, b) => b[1].count - a[1].count);

  const strengthConfig: Record<string, string> = {
    'Critique': 'border-l-red-500 bg-red-50/30',
    'Forte': 'border-l-amber-400 bg-amber-50/20',
    'Élevée': 'border-l-amber-400 bg-amber-50/20',
    'Directe': 'border-l-primary-500 bg-primary-50/20',
    'Expert': 'border-l-accent-500 bg-accent-50/20',
    'Influence': 'border-l-violet-500 bg-violet-50/20',
    'Collaboration': 'border-l-cyan-500 bg-cyan-50/20',
    'Moyenne': 'border-l-secondary-500 bg-secondary-50/20',
  };

  const nodeCatColor = (categories: Set<string>) => {
    const cats = Array.from(categories);
    if (cats.length >= 3) return 'bg-accent-500';
    const first = cats[0] as RelationCategory;
    return categoryConfig[first]?.color || 'bg-secondary-500';
  };

  return (
    <div className="space-y-5">
      {/* Network Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-primary-500">{nodes.length}</p>
          <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Nœuds Uniques</p>
        </div>
        <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-accent-500">{filtered.length}</p>
          <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Connexions</p>
        </div>
        <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-secondary-500">{categories.length - 1}</p>
          <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Catégories</p>
        </div>
        <div className="bg-background-50 border border-background-200/60 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-emerald-500">99.7%</p>
          <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Fiabilité</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium cursor-pointer transition-colors border ${
              filterCategory === cat
                ? cat === 'all' ? 'bg-foreground-950 text-background-50 border-foreground-950' : `${categoryConfig[cat].color} text-white border-transparent`
                : 'bg-background-50 text-foreground-600 border-background-200 hover:bg-background-100'
            }`}
          >
            {cat !== 'all' && <i className={`${categoryConfig[cat].icon} text-[10px]`}></i>}
            {cat === 'all' ? 'Toutes' : categoryConfig[cat].label}
          </button>
        ))}
      </div>

      {/* Network Grid — Visual Node Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filtered.map((rel, idx) => {
          const cat = detectCategory(rel.source_type, rel.from, rel.to);
          const config = categoryConfig[cat];
          const isSelected = selectedRel === idx;
          const fromHovered = hoveredNode === rel.from;
          const toHovered = hoveredNode === rel.to;

          return (
            <div
              key={rel.id}
              onClick={() => setSelectedRel(isSelected ? null : idx)}
              className={`bg-background-50 border rounded-lg p-3.5 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                isSelected ? 'border-primary-300/80 ring-1 ring-primary-200/50' : 'border-background-200/60 hover:border-background-300/60'
              } border-l-[3px]`}
              style={{ borderLeftColor: isSelected ? 'var(--primary-500)' : `var(--${cat === 'Régulation' ? 'red' : cat === 'Secteur' ? 'amber' : cat === 'Institution' ? 'primary' : cat === 'AO' ? 'emerald' : cat === 'Étude' ? 'violet' : cat === 'Expert' ? 'accent' : 'secondary'}-500)` }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${config.color} text-white`}>
                  <i className={`${config.icon} text-xs`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-600">{rel.source_type}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      rel.strength === 'Critique' ? 'bg-red-100 text-red-700' :
                      rel.strength === 'Forte' || rel.strength === 'Directe' ? 'bg-primary-100 text-primary-700' :
                      rel.strength === 'Expert' ? 'bg-accent-100 text-accent-700' :
                      'bg-secondary-100 text-secondary-700'
                    }`}>{rel.strength}</span>
                    <span className="text-[10px] text-foreground-400 ml-auto">{rel.last_verified}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-xs font-semibold px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                        fromHovered ? 'bg-primary-100 text-primary-700' : 'text-foreground-950'
                      }`}
                      onMouseEnter={() => setHoveredNode(rel.from)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {rel.from}
                    </span>
                    <span className="text-foreground-400 text-xs flex items-center">
                      <i className="ri-arrow-right-line"></i>
                    </span>
                    <span
                      className={`text-xs font-semibold px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                        toHovered ? 'bg-secondary-100 text-secondary-700' : 'text-secondary-700'
                      }`}
                      onMouseEnter={() => setHoveredNode(rel.to)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {rel.to}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="mt-2 pt-2 border-t border-background-200/50 text-[11px] text-foreground-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><i className="ri-price-tag-3-line text-xs"></i>{rel.type}</span>
                        <span className="flex items-center gap-1"><i className="ri-calendar-check-line text-xs"></i>Vérifié le {rel.last_verified}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Node Density Summary */}
      <div className="bg-background-50 border border-background-200/60 rounded-lg p-4">
        <p className="text-xs font-semibold text-foreground-950 mb-3">Nœuds les plus connectés du Graphe</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {nodes.slice(0, 10).map(([name, info]) => {
            const primaryCat = Array.from(info.categories)[0] as RelationCategory;
            const dotColor = nodeCatColor(info.categories);
            return (
              <div key={name} className="flex items-center gap-2 bg-background-100 rounded-md p-2 min-w-0">
                <div className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`}></div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium text-foreground-950 truncate">{name.length > 25 ? name.substring(0, 25) + '...' : name}</p>
                  <p className="text-[10px] text-foreground-400">{info.count} connexion{info.count > 1 ? 's' : ''}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function knowledgeGraphPage() {
  const [activeTab, setActiveTab] = useState<GraphTab>('l1');

  const kpi = knowledgeGraphKPIs;

  return (
    <hubLayout hubId={60} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">KOS Global Knowledge Graph Hub</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Mode MOCK — 60 Sources · 6 Agents</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Extraction Live — Supabase Ready
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KOS Global Knowledge Graph&trade;</h1>
          <div className="flex flex-wrap items-center gap-3 mt-3 mb-1">
            <span className="inline-flex items-center gap-1.5 text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-medium">
              <i className="ri-node-tree text-sm"></i>
              2 847 Nœuds
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs bg-accent-100 text-accent-700 px-2.5 py-1 rounded-full font-medium">
              <i className="ri-database-2-line text-sm"></i>
              1.1M Embeddings
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs bg-secondary-100 text-secondary-700 px-2.5 py-1 rounded-full font-medium">
              <i className="ri-link-m text-sm"></i>
              {formatNumber(kpi.relations_mapped)} Connexions
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
              <i className="ri-global-line text-sm"></i>
              {kpi.total_countries_covered} Pays
            </span>
          </div>
          <p className="text-foreground-600 mt-3 max-w-4xl text-sm md:text-base leading-relaxed">
            10 couches de sources institutionnelles interconnectées formant le cerveau documentaire central de Khepra Experts.
            6 agents autonomes assurent la collecte, le scoring, la mise en relation, la production de contenus, la génération de livrables et l'ontologie réglementaire.
          </p>
        </div>

        {/* Global KPI Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Nœuds</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(kpi.total_nodes)}</span>
            <div className="flex items-center gap-1 text-xs text-primary-600"><i className="ri-node-tree text-xs"></i> Entités + Relations</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Couches</p>
            <span className="text-xl font-bold text-foreground-950">{kpi.total_layers}</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-checkbox-circle-fill text-xs"></i> Complètes</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Sources</p>
            <span className="text-xl font-bold text-foreground-950">{kpi.total_sources}<span className="text-xs text-foreground-500 font-normal">/2,000</span></span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-radar-line text-xs text-emerald-600"></i> {kpi.sources_active_24h} actives/24h</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Documents</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(kpi.total_documents_indexed)}</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-arrow-up-line text-xs text-emerald-600"></i> +{formatNumber(kpi.documents_ingested_30d)}/30j</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Réglementations</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(kpi.total_regulations_monitored)}</span>
            <div className="flex items-center gap-1 text-xs text-secondary-600"><i className="ri-shield-check-line text-xs"></i> Surveillées</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Embeddings</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(kpi.total_embeddings)}</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-database-2-line text-xs"></i> Précision {kpi.avg_precision_pct}%</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Couverture</p>
            <span className="text-xl font-bold text-foreground-950">{kpi.total_countries_covered}<span className="text-xs text-foreground-500 font-normal"> pays</span></span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-global-line text-xs"></i>Afrique 100%</div>
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={kpi.bceao_coverage} size={42} strokeWidth={4} color="primary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Couverture BCEAO</p><p className="text-sm font-bold text-foreground-950">{kpi.bceao_coverage}%</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={kpi.avg_precision_pct} size={42} strokeWidth={4} color="accent" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Précision RAG</p><p className="text-sm font-bold text-foreground-950">{kpi.avg_precision_pct}%</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={kpi.knowledge_score_global} size={42} strokeWidth={4} color="secondary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Global</p><p className="text-sm font-bold text-foreground-950">{kpi.knowledge_score_global}/100</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={kpi.relations_mapped > 1000 ? 85 : 60} size={42} strokeWidth={4} color="primary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Relations</p><p className="text-sm font-bold text-foreground-950">{formatNumber(kpi.relations_mapped)}</p></div>
          </div>
        </div>

        {/* Tab Switcher — Two rows: Layers then Agents */}
        <div className="mb-2">
          <p className="text-[10px] uppercase tracking-widest text-foreground-400 mb-2">Couches de Sources</p>
          <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
            {tabs.filter(t => !t.isAgent).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                  activeTab === t.id
                    ? t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500'
                    : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'
                }`}
              >
                <i className={`${t.icon} text-sm`}></i>
                <span>{t.label.split(' — ')[0]}</span>
                <span className="opacity-60 text-[10px]">{t.count}</span>
              </button>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-widest text-foreground-400 mb-2 mt-4">Agents de Traitement</p>
          <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
            {tabs.filter(t => t.isAgent).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                  activeTab === t.id
                    ? t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500'
                    : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'
                }`}
              >
                <i className={`${t.icon} text-sm`}></i>
                <span>{t.label.split(' — ')[0]}</span>
                <span className="opacity-60 text-[10px]">{t.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Info Header */}
        {(() => {
          const tab = tabs.find(t => t.id === activeTab)!;
          return (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-background-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tab.color === 'accent' ? 'bg-accent-100 text-accent-700' : tab.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                  <i className={`${tab.icon} text-lg`}></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-950">{tab.label}</p>
                  <p className="text-xs text-foreground-600">{tab.subtitle} &bull; {tab.count} entrées</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Mode MOCK
              </span>
            </div>
          );
        })()}

        {/* ============================================ */}
        {/* COUCHE 1 : Sources Institutionnelles */}
        {/* ============================================ */}
        {activeTab === 'l1' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer1InstitutionalSources.map((src) => (
              <div key={src.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-primary-100 flex items-center justify-center text-primary-600"><i className={`${src.icon} text-sm`}></i></div>
                    <div>
                      <p className="text-sm font-semibold text-foreground-950 leading-tight line-clamp-2">{src.name}</p>
                      <p className="text-[11px] text-foreground-500">{src.country} &bull; {src.category}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">{src.reliability}%</span>
                </div>
                <div className="text-xs text-foreground-600 mb-3 line-clamp-2">{src.sector}</div>
                <div className="flex items-center justify-between text-[11px] text-foreground-500 mt-3 pt-3 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-file-copy-2-line text-xs"></i>{formatNumber(src.documents_indexed)} docs</span>
                  <span className="flex items-center gap-1"><i className="ri-file-add-line text-xs"></i>+{src.new_docs_30d}/30j</span>
                  <Badge label={src.status === 'active' ? 'Active' : 'Intermittent'} variant={src.status} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 2 : Régulation et Supervision */}
        {/* ============================================ */}
        {activeTab === 'l2' && (
          <div className="space-y-3">
            {layer2RegulatorySources.map((reg) => (
              <div key={reg.id} className={`bg-background-50 border rounded-lg p-4 ${reg.status === 'critical' ? 'border-red-200/70 bg-red-50/20' : reg.status === 'high' ? 'border-amber-200/70 bg-amber-50/20' : 'border-background-200/60'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${reg.status === 'critical' ? 'bg-red-100 text-red-700' : reg.status === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-secondary-100 text-secondary-700'}`}>
                      <i className={reg.icon}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{reg.name}</h4>
                      <p className="text-xs text-foreground-500">{reg.authority} &bull; {reg.zone} &bull; {reg.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge label={reg.status} variant={reg.status} />
                    <span className="text-[10px] text-foreground-500 font-bold">{reg.texts_monitored} textes</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-700 mt-2"><strong>Dernier texte majeur :</strong> {reg.last_major} — {reg.last_major_date}</p>
                <div className="flex items-center gap-3 text-[11px] text-foreground-500 mt-2 pt-2 border-t border-background-200/50">
                  <span className="flex items-center gap-1"><i className="ri-file-add-line text-xs"></i>+{reg.new_texts_30d} nouveaux/30j</span>
                  <span className="flex items-center gap-1 text-primary-600 font-medium"><i className="ri-shield-star-line text-xs"></i>Fiabilité : {reg.reliability}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 3 : Données Économiques */}
        {/* ============================================ */}
        {activeTab === 'l3' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer3EconomicData.map((eco) => (
              <div key={eco.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-md bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${eco.icon} text-sm`}></i></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{eco.name}</h4>
                    <p className="text-[11px] text-foreground-500">{eco.source_type}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {eco.focus_areas.map((area, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{area}</span>
                  ))}
                </div>
                <p className="text-xs text-foreground-600 mb-3 line-clamp-2 leading-relaxed"><strong>Rapport clé :</strong> {eco.key_report}</p>
                <div className="mt-auto pt-3 border-t border-background-200/50 flex items-center justify-between text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-database-2-line text-xs"></i>{formatNumber(eco.datasets_available)} datasets</span>
                  <span className="flex items-center gap-1"><i className="ri-arrow-up-line text-xs text-emerald-600"></i>+{eco.new_publications_30d}/30j</span>
                  <span className="flex items-center gap-1 text-accent-600 font-medium"><i className="ri-crosshair-line text-xs"></i>{eco.relevance_khepra}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 4 : Statistiques Nationales */}
        {/* ============================================ */}
        {activeTab === 'l4' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer4NationalStats.map((stat) => (
              <div key={stat.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-primary-100 flex items-center justify-center text-primary-600"><i className={`${stat.icon} text-sm`}></i></div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{stat.name}</h4>
                      <p className="text-[11px] text-foreground-500">{stat.country}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">{stat.completeness}%</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {stat.categories_covered.slice(0, 4).map((cat, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{cat}</span>
                  ))}
                </div>
                <p className="text-xs text-foreground-500 leading-relaxed"><strong>Dernière :</strong> {stat.last_publication}</p>
                <div className="flex items-center justify-between text-[11px] mt-3 pt-3 border-t border-background-200/50">
                  <span className="text-foreground-500 flex items-center gap-1"><i className="ri-calendar-line text-xs"></i>{stat.update_frequency}</span>
                  <span className="text-foreground-500 flex items-center gap-1"><i className="ri-database-2-line text-xs"></i>{stat.datasets} datasets</span>
                  <Badge label={stat.status === 'active' ? 'Active' : 'Intermittent'} variant={stat.status} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 5 : Recherche Scientifique */}
        {/* ============================================ */}
        {activeTab === 'l5' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer5AcademicResearch.map((acad) => (
              <div key={acad.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className={`${acad.icon} text-sm`}></i></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{acad.name}</h4>
                    <p className="text-[11px] text-foreground-500">{acad.publisher} &bull; {acad.access}</p>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed"><strong>Récent :</strong> {acad.recent_paper}</p>
                <div className="mt-auto pt-3 border-t border-background-200/50">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-background-100 rounded p-2 text-center">
                      <p className="text-sm font-bold text-foreground-950">{formatNumber(acad.papers_indexed)}</p>
                      <p className="text-[9px] text-foreground-500">Papers</p>
                    </div>
                    <div className="bg-background-100 rounded p-2 text-center">
                      <p className="text-sm font-bold text-foreground-950">{formatNumber(acad.papers_khepra_relevant)}</p>
                      <p className="text-[9px] text-foreground-500">Khepra-relevant</p>
                    </div>
                  </div>
                  <ProgressBar value={acad.relevance_score} color="secondary" label="Pertinence Khepra" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 6 : Think Tanks */}
        {/* ============================================ */}
        {activeTab === 'l6' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer6ThinkTanks.map((tt) => (
              <div key={tt.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-md bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${tt.icon} text-sm`}></i></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{tt.name}</h4>
                    <p className="text-[11px] text-foreground-500">{tt.location} &bull; {tt.focus}</p>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 mb-3 line-clamp-2 leading-relaxed"><strong>Rapport clé :</strong> {tt.key_report}</p>
                <div className="mt-auto">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-background-100 rounded p-2 text-center">
                      <p className="text-sm font-bold text-foreground-950">{tt.publications_annual}</p>
                      <p className="text-[9px] text-foreground-500">Publications/an</p>
                    </div>
                    <div className="bg-background-100 rounded p-2 text-center">
                      <p className="text-sm font-bold text-foreground-950">{tt.policy_recommendations}</p>
                      <p className="text-[9px] text-foreground-500">Recommandations</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 text-foreground-500"><i className="ri-star-line text-xs"></i>Influence : {tt.influence_score}/100</span>
                    <span className="flex items-center gap-1 text-accent-600 font-medium"><i className="ri-crosshair-line text-xs"></i>Khepra : {tt.relevance_khepra}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 7 : Big Four et Conseil */}
        {/* ============================================ */}
        {activeTab === 'l7' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer7BigFourConsulting.map((bf) => (
              <div key={bf.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-md bg-primary-100 flex items-center justify-center text-primary-600"><i className={`${bf.icon} text-sm`}></i></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{bf.name}</h4>
                    <p className="text-[11px] text-foreground-500">{bf.firm_type}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {bf.sectors.map((s, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-foreground-600 mb-3 line-clamp-2 leading-relaxed"><strong>Étude clé :</strong> {bf.key_study}</p>
                <div className="mt-auto pt-3 border-t border-background-200/50 flex items-center justify-between text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-file-copy-2-line text-xs"></i>{bf.studies_annual} études/an</span>
                  <span className="flex items-center gap-1"><i className="ri-medal-line text-xs text-accent-600"></i>Benchmark {bf.benchmark_value}</span>
                  <span className="flex items-center gap-1 text-primary-600 font-medium"><i className="ri-crosshair-line text-xs"></i>{bf.relevance_khepra}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 8 : Partenaires Techniques et Financiers */}
        {/* ============================================ */}
        {activeTab === 'l8' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer8TechnicalPartners.map((ptf) => (
              <div key={ptf.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600"><i className={`${ptf.icon} text-sm`}></i></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{ptf.name}</h4>
                    <p className="text-[11px] text-foreground-500">{ptf.donor_type}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {ptf.focus.map((f, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
                <p className="text-xs text-foreground-600 mb-3 line-clamp-2 leading-relaxed"><strong>Programme :</strong> {ptf.key_program}</p>
                <div className="mt-auto pt-3 border-t border-background-200/50">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-foreground-500 flex items-center gap-1"><i className="ri-funds-line text-xs"></i>{ptf.budget_africa_musd} MUSD</span>
                    <span className="text-foreground-500 flex items-center gap-1"><i className="ri-file-search-line text-xs"></i>{ptf.funding_opportunities} AO</span>
                    <span className="text-secondary-600 font-medium">{ptf.relevance_khepra}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 9 : Médias Économiques */}
        {/* ============================================ */}
        {activeTab === 'l9' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer9EconomicMedia.map((media) => (
              <div key={media.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-md bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${media.icon} text-sm`}></i></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{media.name}</h4>
                    <p className="text-[11px] text-foreground-500">{media.media_type}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {media.coverage.map((c, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed"><strong>Tendance :</strong> {media.last_detected_trend}</p>
                <div className="mt-auto pt-3 border-t border-background-200/50 flex items-center justify-between text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-newspaper-line text-xs"></i>{media.articles_monthly} articles/mois</span>
                  <span className="flex items-center gap-1"><i className="ri-signal-tower-line text-xs text-amber-500"></i>Signal {media.signal_strength}%</span>
                  <span className="text-accent-600 font-medium">{media.relevance_khepra}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* COUCHE 10 : Universités */}
        {/* ============================================ */}
        {activeTab === 'l10' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer10Universities.map((uni) => (
              <div key={uni.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-md bg-primary-100 flex items-center justify-center text-primary-600"><i className={`${uni.icon} text-sm`}></i></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{uni.name}</h4>
                    <p className="text-[11px] text-foreground-500">{uni.country} &bull; {uni.research_labs} labs</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {uni.relevant_programs.map((p, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{p}</span>
                  ))}
                </div>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed"><strong>Publication :</strong> {uni.key_publication}</p>
                <div className="mt-auto pt-3 border-t border-background-200/50 flex items-center justify-between text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-shake-hands-line text-xs"></i>Collab : {uni.collaboration_potential}</span>
                  <span className="text-primary-600 font-medium">{uni.relevance_khepra}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 11 : Knowledge Linker — Graphe Interactif */}
        {/* ============================================ */}
        {activeTab === 'a11' && <KnowledgeGraphNetwork relations={knowledgeLinkerRelations} />}

        {/* ============================================ */}
        {/* AGENT 12 : Knowledge Scoring */}
        {/* ============================================ */}
        {activeTab === 'a12' && (
          <div className="space-y-3">
            {knowledgeScoring.map((scr) => (
              <div key={scr.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge label={scr.tier} variant={scr.tier} />
                      <span className="text-xs font-semibold text-foreground-950">{scr.entity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-center">
                      <CircularGauge value={scr.composite} size={52} strokeWidth={4} color={scr.composite >= 95 ? 'primary' : scr.composite >= 85 ? 'accent' : 'secondary'} />
                      <p className="text-[9px] text-foreground-500 mt-0.5">Composite</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <div className="text-center p-2 bg-background-100 rounded">
                    <p className="text-sm font-bold text-primary-600">{scr.importance}</p>
                    <p className="text-[9px] text-foreground-500">Importance</p>
                  </div>
                  <div className="text-center p-2 bg-background-100 rounded">
                    <p className="text-sm font-bold text-emerald-600">{scr.fiability}</p>
                    <p className="text-[9px] text-foreground-500">Fiabilité</p>
                  </div>
                  <div className="text-center p-2 bg-background-100 rounded">
                    <p className="text-sm font-bold text-accent-600">{scr.actuality}</p>
                    <p className="text-[9px] text-foreground-500">Actualité</p>
                  </div>
                  <div className="text-center p-2 bg-background-100 rounded">
                    <p className="text-sm font-bold text-secondary-600">{scr.relevance_khepra}</p>
                    <p className="text-[9px] text-foreground-500">Pertinence</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 13 : Knowledge Factory */}
        {/* ============================================ */}
        {activeTab === 'a13' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {knowledgeFactoryProductions.map((prod) => (
              <div key={prod.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Badge label={prod.type} variant={prod.status} />
                  <Badge label={prod.status} variant={prod.status} />
                  <span className="text-[10px] text-foreground-500 ml-auto">{prod.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 leading-tight">{prod.title}</h4>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[10px] bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full border border-accent-200">{prod.domain}</span>
                  <span className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{prod.target_audience}</span>
                </div>
                <div className="mt-auto pt-3 border-t border-background-200/50 flex items-center gap-3 text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-pages-line text-xs"></i>{prod.pages}p</span>
                  {prod.citations > 0 && <span className="flex items-center gap-1"><i className="ri-quote-text text-xs"></i>{prod.citations}</span>}
                  <span className="ml-auto"><Badge label={prod.type} variant={prod.status} /></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 14 : RAG Enterprise */}
        {/* ============================================ */}
        {activeTab === 'a14' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ragEnterprise.map((rag) => (
              <div key={rag.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{rag.title}</h4>
                    <p className="text-[11px] text-foreground-500">{rag.format} &bull; {rag.documents} docs &bull; {formatNumber(rag.pages)} pages</p>
                  </div>
                  <Badge label={rag.category} variant="Active" />
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-sm font-bold text-foreground-950">{formatNumber(rag.embeddings)}</p>
                    <p className="text-[9px] text-foreground-500">Embeddings</p>
                  </div>
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-sm font-bold text-foreground-950">{rag.precision}%</p>
                    <p className="text-[9px] text-foreground-500">Précision</p>
                  </div>
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-sm font-bold text-foreground-950">{rag.avg_response_ms}ms</p>
                    <p className="text-[9px] text-foreground-500">Réponse</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <ProgressBar value={rag.precision} color="secondary" label="Précision Recherche" />
                  <div className="flex items-center justify-between text-[11px] text-foreground-500">
                    <span className="flex items-center gap-1"><i className="ri-search-line text-xs"></i>{rag.queries_30d} req/30j</span>
                    <span className="flex items-center gap-1 text-secondary-600 font-medium"><i className="ri-timer-line text-xs"></i>{rag.avg_response_ms}ms</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 15 : Deliverable Factory */}
        {/* ============================================ */}
        {activeTab === 'a15' && (
          <div className="space-y-3">
            {deliverableFactory.map((del) => (
              <div key={del.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${del.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : del.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : del.status === 'In Review' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                      <i className={del.status === 'Completed' ? 'ri-check-double-line' : del.status === 'In Progress' ? 'ri-loader-4-line animate-spin' : del.status === 'In Review' ? 'ri-eye-line' : 'ri-edit-line'}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{del.title}</h4>
                      <p className="text-xs text-foreground-500">{del.client} &bull; {del.type} &bull; {del.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-center">
                      <CircularGauge value={Math.round(del.score_quality * 10)} size={40} strokeWidth={3} color={del.score_quality >= 9.3 ? 'accent' : 'primary'} />
                      <p className="text-[9px] text-foreground-500 mt-0.5">Qualité</p>
                    </div>
                    <Badge label={del.status} variant={del.status} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {del.sections && <span className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{del.sections} sections</span>}
                  <span className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{del.pages}p</span>
                  <span className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{del.generation_time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 16 : Ontologie Réglementaire — Graphe Sémantique Big Four */}
        {/* ============================================ */}
        {activeTab === 'a16' && (
          <div className="space-y-8">
            {/* KPIs Ontologie */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Nœuds</p>
                <span className="text-xl font-bold text-foreground-950">{regulatoryOntologyKPIs.totalNodes}</span>
                <div className="flex items-center gap-1 text-xs text-primary-600"><i className="ri-node-tree text-xs"></i> Réglementaires</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Domaines</p>
                <span className="text-xl font-bold text-foreground-950">{regulatoryOntologyKPIs.totalDomains}</span>
                <div className="flex items-center gap-1 text-xs text-accent-600"><i className="ri-folder-chart-line text-xs"></i> Taxonomiques</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Relations</p>
                <span className="text-xl font-bold text-foreground-950">{regulatoryOntologyKPIs.totalRelations}</span>
                <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-link-m text-xs"></i> Cartographiées</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Textes Applicables</p>
                <span className="text-xl font-bold text-foreground-950">{regulatoryOntologyKPIs.totalApplicableTexts}</span>
                <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-file-text-line text-xs"></i> Vérifiés</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">FAQs</p>
                <span className="text-xl font-bold text-foreground-950">{regulatoryOntologyKPIs.totalFAQ}</span>
                <div className="flex items-center gap-1 text-xs text-secondary-600"><i className="ri-question-answer-line text-xs"></i> Opérationnelles</div>
              </div>
              <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Maturité</p>
                <span className="text-xl font-bold text-foreground-950">{regulatoryOntologyKPIs.averageMaturityScore}%</span>
                <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-medal-line text-xs"></i> {regulatoryOntologyKPIs.maturityGrade}</div>
              </div>
            </div>

            {/* Jauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                <CircularGauge value={regulatoryOntologyKPIs.coverageRate} size={42} strokeWidth={4} color="primary" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Couverture</p><p className="text-sm font-bold text-foreground-950">{regulatoryOntologyKPIs.coverageRate}%</p></div>
              </div>
              <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                <CircularGauge value={regulatoryOntologyKPIs.linkRate} size={42} strokeWidth={4} color="accent" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Taux de Liens</p><p className="text-sm font-bold text-foreground-950">{regulatoryOntologyKPIs.linkRate}%</p></div>
              </div>
              <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                <CircularGauge value={regulatoryOntologyKPIs.documentFreshness} size={42} strokeWidth={4} color="secondary" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Fraîcheur Documentaire</p><p className="text-sm font-bold text-foreground-950">{regulatoryOntologyKPIs.documentFreshness}%</p></div>
              </div>
              <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                <CircularGauge value={regulatoryOntologyKPIs.averageMaturityScore} size={42} strokeWidth={4} color="primary" />
                <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Maturité</p><p className="text-sm font-bold text-foreground-950">{regulatoryOntologyKPIs.averageMaturityScore}%</p></div>
              </div>
            </div>

            {/* Taxonomie Hiérarchique */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-folder-chart-line text-accent-600"></i>
                Taxonomie Hiérarchique — 6 Domaines · 30 Sous-Domaines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {regulatoryTaxonomy.domains.map((dom) => (
                  <div key={dom.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                        <i className="ri-stack-line text-xs"></i>
                      </div>
                      <span className="text-sm font-semibold text-foreground-950">{dom.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {dom.nodes.map((n) => (
                        <span key={n} className="text-[10px] bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full border border-accent-200">{n}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {dom.subdomains.map((s, i) => (
                        <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nœuds Réglementaires — Vue Détaillée */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-mind-map text-primary-600"></i>
                Nœuds du Graphe Sémantique Réglementaire — {regulatoryOntologyKPIs.totalNodes} Entités
              </h3>
              <div className="space-y-3">
                {[
                  nodeBCEAO, nodeBEAC, nodeUEMOA, nodeOHADA, nodeCOBAC,
                  nodeIFRS, nodeISA, nodeESG, nodeSFD, nodeFinTech, nodeInclusionFinanciere,
                ].map((node) => (
                  <details key={node.id} className="bg-background-50 border border-background-200/60 rounded-lg group">
                    <summary className="p-4 cursor-pointer list-none flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        node.color === 'accent' ? 'bg-accent-100 text-accent-700' : node.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'
                      }`}>
                        <i className={`${node.icon} text-lg`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-semibold text-foreground-950">{node.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-600">{node.category}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">{node.zone}</span>
                        </div>
                        <p className="text-xs text-foreground-600 line-clamp-2 leading-relaxed">{node.definition}</p>
                        <div className="flex items-center gap-3 mt-2 text-[11px]">
                          <span className="flex items-center gap-1 text-foreground-500"><i className="ri-file-text-line text-xs"></i>{node.applicableTexts.length} textes</span>
                          <span className="flex items-center gap-1 text-foreground-500"><i className="ri-question-answer-line text-xs"></i>{node.faq.length} FAQs</span>
                          <span className="flex items-center gap-1 text-foreground-500"><i className="ri-scales-line text-xs"></i>{node.jurisprudence.length} jurisprudences</span>
                          <span className="flex items-center gap-1 text-foreground-500"><i className="ri-building-line text-xs"></i>{node.caseStudies.length} études de cas</span>
                          <CircularGauge value={node.maturityScore} size={32} strokeWidth={3} color={node.maturityScore >= 95 ? 'primary' : 'accent'} />
                        </div>
                      </div>
                      <i className="ri-arrow-down-s-line text-foreground-400 group-open:rotate-180 transition-transform mt-2"></i>
                    </summary>

                    <div className="px-4 pb-4 space-y-4 border-t border-background-200/50 pt-3 ml-14">
                      {/* Définition */}
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-1">Définition</p>
                        <p className="text-xs text-foreground-600 leading-relaxed">{node.definition}</p>
                      </div>

                      {/* Obligations */}
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-2">Obligations ({node.obligations.length})</p>
                        <ul className="space-y-1">
                          {node.obligations.map((obl, i) => (
                            <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                              <span className="text-primary-500 mt-0.5"><i className="ri-checkbox-circle-fill text-xs"></i></span>
                              {obl}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Textes Applicables */}
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-2">Textes Applicables ({node.applicableTexts.length})</p>
                        <div className="space-y-1">
                          {node.applicableTexts.map((txt, i) => (
                            <div key={i} className="flex items-center justify-between text-xs bg-background-100 rounded-md px-2.5 py-1.5">
                              <span className="text-foreground-700 truncate mr-2">{txt.ref}</span>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-[10px] text-foreground-500">{txt.type}</span>
                                <span className="text-[10px] text-foreground-400">{txt.date}</span>
                                <Badge label={txt.status} variant="Active" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Jurisprudence */}
                      {node.jurisprudence.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-foreground-950 mb-2">Jurisprudence ({node.jurisprudence.length})</p>
                          <div className="space-y-2">
                            {node.jurisprudence.map((j, i) => (
                              <div key={i} className="bg-background-100 rounded-md p-2.5">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium text-foreground-950">{j.title}</span>
                                  <span className="text-[10px] text-foreground-400">{j.date}</span>
                                </div>
                                <p className="text-[11px] text-foreground-600 leading-relaxed">{j.summary}</p>
                                <p className="text-[10px] text-foreground-400 mt-1">{j.authority}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Études de Cas */}
                      {node.caseStudies.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-foreground-950 mb-2">Études de Cas Khepra ({node.caseStudies.length})</p>
                          <div className="space-y-2">
                            {node.caseStudies.map((cs, i) => (
                              <div key={i} className="bg-background-100 rounded-md p-2.5">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium text-foreground-950">{cs.title}</span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">{cs.scoreQuality}/10</span>
                                </div>
                                <p className="text-[11px] text-foreground-600 leading-relaxed">{cs.description}</p>
                                <p className="text-[10px] text-foreground-400 mt-1">Mission {cs.khepraMission}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* FAQs */}
                      {node.faq.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-foreground-950 mb-2">FAQ ({node.faq.length})</p>
                          <div className="space-y-2">
                            {node.faq.map((f, i) => (
                              <details key={i} className="bg-background-100 rounded-md">
                                <summary className="p-2.5 cursor-pointer text-xs font-medium text-foreground-950 list-none flex items-center justify-between">
                                  <span className="flex-1 mr-2">{f.q}</span>
                                  <i className="ri-arrow-down-s-line text-foreground-400 text-sm shrink-0"></i>
                                </summary>
                                <p className="px-2.5 pb-2.5 text-xs text-foreground-600 leading-relaxed">{f.a}</p>
                              </details>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Scores du Nœud */}
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-background-200/50">
                        <div className="text-center p-2 bg-background-100 rounded">
                          <p className="text-sm font-bold text-primary-600">{node.maturityScore}%</p>
                          <p className="text-[9px] text-foreground-500">Maturité</p>
                        </div>
                        <div className="text-center p-2 bg-background-100 rounded">
                          <p className="text-sm font-bold text-emerald-600">{node.coverageRate}%</p>
                          <p className="text-[9px] text-foreground-500">Couverture</p>
                        </div>
                        <div className="text-center p-2 bg-background-100 rounded">
                          <p className="text-sm font-bold text-accent-600">{node.documentFreshness}%</p>
                          <p className="text-[9px] text-foreground-500">Fraîcheur</p>
                        </div>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Matrice de Relations */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-link-m text-accent-600"></i>
                Matrice de Relations — {regulatoryOntologyKPIs.totalRelations} Connexions Inter-Nœuds
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {regulatoryRelations.map((rel, idx) => (
                  <div key={idx} className="bg-background-50 border border-background-200/60 rounded-lg p-3 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      rel.strength === 'Constitutive' ? 'bg-red-100 text-red-600' :
                      rel.strength === 'Forte' ? 'bg-primary-100 text-primary-600' :
                      'bg-accent-100 text-accent-600'
                    }`}>
                      <i className={rel.strength === 'Constitutive' ? 'ri-link-m' : rel.strength === 'Forte' ? 'ri-link' : 'ri-link-unlink'}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold text-foreground-950">{rel.from}</span>
                        <span className="text-foreground-400 text-xs">→</span>
                        <span className="text-xs font-semibold text-secondary-700">{rel.to}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          rel.strength === 'Constitutive' ? 'bg-red-100 text-red-700' :
                          rel.strength === 'Forte' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                        }`}>{rel.strength}</span>
                      </div>
                      <p className="text-[11px] text-foreground-500">{rel.type} — {rel.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benchmark International */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-bar-chart-grouped-line text-primary-600"></i>
                Benchmark International — Khepra vs Big Four
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-background-200">
                      <th className="text-left py-2 px-3 text-foreground-500 font-medium">Dimension</th>
                      <th className="text-center py-2 px-3 text-primary-600 font-bold">Khepra</th>
                      <th className="text-center py-2 px-3 text-foreground-500">Deloitte</th>
                      <th className="text-center py-2 px-3 text-foreground-500">PwC</th>
                      <th className="text-center py-2 px-3 text-foreground-500">EY</th>
                      <th className="text-center py-2 px-3 text-foreground-500">KPMG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regulatoryBenchmark.map((row, idx) => (
                      <tr key={idx} className="border-b border-background-200/50 hover:bg-background-100/50">
                        <td className="py-2 px-3 text-foreground-700">{row.dimension}</td>
                        <td className="py-2 px-3 text-center font-bold text-primary-600 bg-primary-50/30">{row.khepra}</td>
                        <td className="py-2 px-3 text-center text-foreground-600">{row.deloitte}</td>
                        <td className="py-2 px-3 text-center text-foreground-600">{row.pwc}</td>
                        <td className="py-2 px-3 text-center text-foreground-600">{row.ey}</td>
                        <td className="py-2 px-3 text-center text-foreground-600">{row.kpmg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Plan d'Implémentation */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-road-map-line text-accent-600"></i>
                Plan d'Implémentation — Montée en Maturité Big Four
              </h3>
              <div className="space-y-3">
                {implementationPlan.map((phase, idx) => (
                  <div key={idx} className={`bg-background-50 border rounded-lg p-4 ${
                    phase.status === 'completed' ? 'border-emerald-200/70 bg-emerald-50/20' : 'border-background-200/60'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        phase.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-background-200 text-foreground-500'
                      }`}>{idx + 1}</div>
                      <div>
                        <span className="text-sm font-semibold text-foreground-950">{phase.phase}</span>
                        <span className="text-xs text-foreground-500 ml-2">{phase.duration}</span>
                      </div>
                      <Badge label={phase.status === 'completed' ? 'Terminé' : 'Planifié'} variant={phase.status === 'completed' ? 'Completed' : 'Draft'} />
                    </div>
                    <ul className="space-y-1 ml-10">
                      {phase.actions.map((a, i) => (
                        <li key={i} className="text-xs text-foreground-600 flex items-start gap-1.5">
                          <span className={`mt-0.5 ${phase.status === 'completed' ? 'text-emerald-500' : 'text-foreground-400'}`}><i className={`${phase.status === 'completed' ? 'ri-check-double-line' : 'ri-time-line'} text-xs`}></i></span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Contrôles Qualité */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-shield-check-line text-secondary-600"></i>
                Contrôles Qualité — {ontologyControls.filter(c => c.status === 'pass').length}/{ontologyControls.length} Passés
              </h3>
              <div className="space-y-2">
                {ontologyControls.map((ctrl) => (
                  <div key={ctrl.id} className="bg-background-50 border border-background-200/60 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${ctrl.status === 'pass' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        <i className={`${ctrl.status === 'pass' ? 'ri-check-line' : 'ri-error-warning-line'} text-xs`}></i>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-foreground-950">{ctrl.name}</span>
                        <p className="text-[10px] text-foreground-500">{ctrl.rule}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-foreground-950">{ctrl.current}</span>
                      <span className="text-[10px] text-foreground-400 ml-1">/ {ctrl.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Ontologie */}
            <div className="p-5 bg-primary-100/50 rounded-lg border border-primary-200/40">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-mind-map text-primary-700 text-lg"></i>
                <span className="text-sm font-semibold text-primary-900">KOS Regulatory Ontology Engine&trade; — Agent 16 · Big Four Grade</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-primary-800/70">
                <span><strong>{regulatoryOntologyKPIs.totalNodes}</strong> Nœuds Réglementaires</span>
                <span><strong>{regulatoryOntologyKPIs.totalRelations}</strong> Relations</span>
                <span><strong>{regulatoryOntologyKPIs.totalApplicableTexts}</strong> Textes Applicables</span>
                <span><strong>{regulatoryOntologyKPIs.totalFAQ}</strong> FAQs</span>
                <span><strong>{regulatoryOntologyKPIs.averageMaturityScore}%</strong> Score Maturité</span>
                <span><strong>{regulatoryOntologyKPIs.coverageRate}%</strong> Couverture</span>
                <span><strong>{regulatoryOntologyKPIs.maturityGrade}</strong></span>
                <span>Audit : {regulatoryOntologyKPIs.lastAuditDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 17 : Semantic Reasoning Engine™ */}
        {/* ============================================ */}
        {activeTab === 'a17' && (
          <div className="space-y-6">
            {/* Header badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {semanticReasoningEngine.status === 'operational' ? 'Opérationnel' : semanticReasoningEngine.status}
              </span>
              <span className="text-xs bg-primary-100 text-primary-700 border border-primary-200 px-3 py-1 rounded-full font-medium">v{semanticReasoningEngine.version}</span>
              <span className="text-xs bg-accent-100 text-accent-700 border border-accent-200 px-3 py-1 rounded-full font-medium">Déployé {semanticReasoningEngine.deployedAt}</span>
              <span className="text-xs bg-secondary-100 text-secondary-700 border border-secondary-200 px-3 py-1 rounded-full font-medium">{semanticReasoningEngine.architecture}</span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary-600">{semanticReasoningEngine.maxHops}</p>
                <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Sauts max</p>
              </div>
              <div className="bg-background-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">{semanticReasoningEngine.precision}%</p>
                <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Précision</p>
              </div>
              <div className="bg-background-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground-950">{semanticReasoningEngine.avgResponseMs}ms</p>
                <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Latence moy.</p>
              </div>
              <div className="bg-background-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-accent-600">{semanticReasoningEngine.queriesPast30d.toLocaleString('fr-FR')}</p>
                <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Requêtes /30j</p>
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-background-50 border border-background-200/60 rounded-xl p-5">
              <p className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-sparkling-line text-accent-600"></i>
                Capacités du Moteur
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {semanticReasoningEngine.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2 bg-background-100 rounded-lg p-2.5">
                    <i className="ri-checkbox-circle-fill text-primary-600 text-xs mt-0.5 shrink-0"></i>
                    <span className="text-xs text-foreground-700">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Example queries */}
            <div>
              <p className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-question-answer-line text-secondary-600"></i>
                Exemples de Raisonnement Multi-Sauts
              </p>
              <div className="space-y-3">
                {semanticReasoningEngine.exampleQueries.map((q, i) => (
                  <div key={i} className="bg-background-50 border border-background-200/60 rounded-xl p-4">
                    <p className="text-xs font-semibold text-foreground-950 mb-2 leading-relaxed">
                      <i className="ri-questionnaire-line text-primary-600 mr-1.5"></i>
                      {q.question}
                    </p>
                    <div className="bg-background-100 rounded-lg p-2.5 mb-2">
                      <p className="text-[11px] text-foreground-600 font-medium mb-1">Chemin de raisonnement ({q.hops} sauts) :</p>
                      <p className="text-xs text-primary-700 font-mono">{q.path}</p>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-foreground-500">
                      <span className="flex items-center gap-1">
                        <i className="ri-timer-line text-xs text-emerald-600"></i>{q.responseTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-bar-chart-line text-xs text-accent-600"></i>{q.confidence}% confiance
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-git-branch-line text-xs text-secondary-600"></i>{q.hops} sauts logiques
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance history */}
            <div className="bg-background-50 border border-background-200/60 rounded-xl p-5">
              <p className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-line-chart-line text-primary-600"></i>
                Historique des Performances
              </p>
              <div className="space-y-2">
                {semanticReasoningEngine.performanceHistory.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-foreground-500 w-24 shrink-0">{h.date}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: `${h.precision}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-primary-600 w-14 text-right">{h.precision}%</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-foreground-400 w-20 text-right shrink-0">{h.hops} sauts · {h.latency}ms</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 18 : Cross-Domain Query Engine™ */}
        {/* ============================================ */}
        {activeTab === 'a18' && (
          <div className="space-y-6">
            {/* Header badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Opérationnel
              </span>
              <span className="text-xs bg-secondary-100 text-secondary-700 border border-secondary-200 px-3 py-1 rounded-full font-medium">v{crossDomainQueryEngine.version}</span>
              <span className="text-xs bg-accent-100 text-accent-700 border border-accent-200 px-3 py-1 rounded-full font-medium">{crossDomainQueryEngine.domainsConnected} domaines</span>
              <span className="text-xs bg-primary-100 text-primary-700 border border-primary-200 px-3 py-1 rounded-full font-medium">{crossDomainQueryEngine.nlToPrecision}% NL→Query</span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-secondary-600">{crossDomainQueryEngine.domainsConnected}</p>
                <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Domaines connectés</p>
              </div>
              <div className="bg-background-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">{crossDomainQueryEngine.nlToPrecision}%</p>
                <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Précision NL→Query</p>
              </div>
              <div className="bg-background-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground-950">{crossDomainQueryEngine.avgComplexQueryMs}ms</p>
                <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Requête complexe</p>
              </div>
              <div className="bg-background-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-accent-600">{crossDomainQueryEngine.queriesHandledPast30d.toLocaleString('fr-FR')}</p>
                <p className="text-[10px] text-foreground-500 uppercase tracking-wider">Requêtes /30j</p>
              </div>
            </div>

            {/* 12 domains grid */}
            <div className="bg-background-50 border border-background-200/60 rounded-xl p-5">
              <p className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-grid-line text-secondary-600"></i>
                12 Domaines Cross-Query
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {crossDomainQueryEngine.domains.map(dom => (
                  <div key={dom.id} className="bg-background-100 rounded-lg p-3 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                        dom.color === 'accent' ? 'bg-accent-100 text-accent-600' :
                        dom.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' : 'bg-primary-100 text-primary-600'
                      }`}>
                        <i className={`${dom.icon} text-sm`}></i>
                      </div>
                      <span className="text-xs font-semibold text-foreground-950 leading-tight">{dom.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-foreground-500">
                      <span className="flex items-center gap-1"><i className="ri-database-2-line text-[9px]"></i>{formatNumber(dom.docs)} docs</span>
                      <span className="flex items-center gap-1"><i className="ri-link-m text-[9px]"></i>{dom.sources} sources</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample queries */}
            <div>
              <p className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-search-eye-line text-accent-600"></i>
                Exemples de Requêtes Cross-Domaines
              </p>
              <div className="space-y-3">
                {crossDomainQueryEngine.sampleQueries.map((q, i) => (
                  <div key={i} className="bg-background-50 border border-background-200/60 rounded-xl p-4">
                    <p className="text-xs font-semibold text-foreground-950 mb-2 leading-relaxed">
                      <i className="ri-questionnaire-line text-secondary-600 mr-1.5"></i>
                      {q.nl}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {q.domains.map((d, j) => (
                        <span key={j} className="text-[10px] bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full border border-secondary-200">{d}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-foreground-500">
                      <span className="flex items-center gap-1"><i className="ri-timer-line text-xs text-emerald-600"></i>{q.latency}</span>
                      <span className="flex items-center gap-1"><i className="ri-bar-chart-line text-xs text-accent-600"></i>{q.confidence}% confiance</span>
                      <span className="flex items-center gap-1"><i className="ri-merge-cells-horizontal text-xs text-secondary-600"></i>{q.domains.length} domaines croisés</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Endpoints */}
            <div className="bg-background-50 border border-background-200/60 rounded-xl p-5">
              <p className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-code-s-slash-line text-primary-600"></i>
                API Endpoints — Query Engine v1.0
              </p>
              <div className="space-y-2">
                {crossDomainQueryEngine.apiEndpoints.map((ep, i) => (
                  <div key={i} className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                      ep.method === 'POST' ? 'bg-amber-100 text-amber-700' :
                      ep.method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-primary-100 text-primary-700'
                    }`}>{ep.method}</span>
                    <code className="text-xs font-mono text-foreground-950 flex-1">{ep.path}</code>
                    <span className="text-[10px] text-foreground-500 hidden sm:block">{ep.description}</span>
                    <span className="text-[10px] font-bold text-emerald-600 shrink-0">{ep.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer — Architecture Summary */}
        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-brain-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Global Knowledge Graph&trade; — 10 Couches · 6 Agents Autonomes</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-[11px] text-accent-800/70">
            {tabs.filter(t => !t.isAgent).map(t => (
              <span key={t.id} className="flex items-center gap-1">
                <i className={`${t.icon} text-xs`}></i>
                {t.label.split(' — ')[0]}
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-3 pt-3 border-t border-accent-200/40 flex-wrap text-[11px] text-accent-800/70">
            {tabs.filter(t => t.isAgent).map(t => (
              <span key={t.id} className="flex items-center gap-1">
                <i className={`${t.icon} text-xs`}></i>
                {t.label}
              </span>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-accent-200/40 grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] text-accent-800/60">
            <span><strong>{formatNumber(kpi.total_nodes)}</strong> nœuds</span>
            <span><strong>{formatNumber(kpi.total_documents_indexed)}</strong> docs</span>
            <span><strong>{formatNumber(kpi.total_embeddings)}</strong> embeddings</span>
            <span><strong>{kpi.total_countries_covered}</strong> pays</span>
            <span><strong>{formatNumber(kpi.relations_mapped)}</strong> relations</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}



