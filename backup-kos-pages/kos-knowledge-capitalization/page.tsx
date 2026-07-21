import { useState, useEffect, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';

interface KnowledgeNode {
  id: number;
  entity_name: string;
  entity_type: string;
  domain: string;
  description: string;
  document_count: number;
  tags: string[];
  metadata: {
    score_kos: number;
    exactitude: number;
    conformite: number;
    valeur_client: number;
    reutilisabilite: number;
    innovation: number;
  } | null;
  related_entities: string[];
}

interface DomainSummary {
  domain: string;
  count: number;
  avgScore: number;
  nodes: KnowledgeNode[];
}

function ScoreBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = (value / max) * 100;
  const color = pct >= 90 ? 'bg-emerald-500' : pct >= 80 ? 'bg-amber-500' : pct >= 70 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-foreground-700 w-24 whitespace-nowrap">{label}</span>
      <div className="flex-1 h-1.5 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-foreground-600 w-8 text-right">{value}/{max}</span>
    </div>
  );
}

function NodeCard({ node }: { node: KnowledgeNode }) {
  const [expanded, setExpanded] = useState(false);
  const m = node.metadata;

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-4 hover:border-background-300/60 transition-colors cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground-950 leading-snug">{node.entity_name}</h3>
          <p className="text-xs text-foreground-600 mt-1 line-clamp-2">{node.description}</p>
        </div>
        {m && (
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.score_kos >= 90 ? 'bg-emerald-100 text-emerald-800' : m.score_kos >= 85 ? 'bg-amber-100 text-amber-800' : 'bg-orange-100 text-orange-800'}`}>
              {m.score_kos}/100
            </span>
          </div>
        )}
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-background-200/60 space-y-3">
          {m && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-foreground-700">Score KOS détaillé</p>
              <ScoreBar value={m.exactitude} max={25} label="Exactitude" />
              <ScoreBar value={m.conformite} max={25} label="Conformité" />
              <ScoreBar value={m.valeur_client} max={20} label="Valeur Client" />
              <ScoreBar value={m.reutilisabilite} max={15} label="Réutilisabilité" />
              <ScoreBar value={m.innovation} max={15} label="Innovation" />
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {node.tags.map((tag) => (
              <span key={tag} className="text-xs bg-background-100 text-foreground-700 px-2 py-0.5 rounded-md">{tag}</span>
            ))}
          </div>

          {node.related_entities.length > 0 && (
            <div>
              <p className="text-xs font-medium text-foreground-700 mb-1">Documents liés ({node.related_entities.length})</p>
              <div className="flex flex-wrap gap-1">
                {node.related_entities.slice(0, 8).map((e) => (
                  <span key={e} className="text-xs bg-secondary-100 text-secondary-800 px-1.5 py-0.5 rounded">{e}</span>
                ))}
                {node.related_entities.length > 8 && (
                  <span className="text-xs text-foreground-500">+{node.related_entities.length - 8} autres</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function knowledgeCapitalizationPage() {
  const [activeDomain, setActiveDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const mockNodes: KnowledgeNode[] = useMemo(() => [
    { id: 17, entity_name: 'BLOC Architecture Gouvernance', entity_type: 'bloc_capitalisation', domain: 'Gouvernance', description: 'Architecture de gouvernance 3 niveaux — 9 organes et comités, mandats détaillés, guide de personnalisation, 12 points de vigilance', document_count: 3, tags: ['gouvernance', 'COBAC', 'conseil administration', 'AUSCGIE', 'BCBS 328'], metadata: { score_kos: 89, exactitude: 23, conformite: 24, valeur_client: 18, reutilisabilite: 14, innovation: 10 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md', 'Circulaire COBAC 001-2017', 'Circulaire COBAC 002-2017'] },
    { id: 18, entity_name: 'BLOC Audit Balance BCEAO', entity_type: 'bloc_capitalisation', domain: 'Audit Prudentiel', description: 'Outil d\'audit prudentiel automatisé EMF/SFD — 5 ratios BCEAO, Scoring KHEPRA /100, double implémentation Python/TypeScript', document_count: 2, tags: ['BCEAO', 'audit', 'ratios prudentiels', 'EMF', 'SFD'], metadata: { score_kos: 94, exactitude: 25, conformite: 24, valeur_client: 19, reutilisabilite: 14, innovation: 12 }, related_entities: ['scripts/khepra_audit_balance.py', 'BCEAO', 'PCEMF'] },
    { id: 19, entity_name: 'BLOC CBS Microfinance', entity_type: 'bloc_capitalisation', domain: 'Core Banking System', description: 'Base de connaissance CBS & Microfinance UEMOA/CEMAC — Architecture technique, fonctionnalités métiers 40+, conformité réglementaire', document_count: 1, tags: ['CBS', 'microfinance', 'UEMOA', 'CEMAC', 'Agile'], metadata: { score_kos: 91, exactitude: 23, conformite: 24, valeur_client: 18, reutilisabilite: 14, innovation: 12 }, related_entities: ['KHEPRA_CBS_MICROFINANCE_KNOWLEDGE.md', 'Sun Telecom', 'Ynover CBS', 'WSO2'] },
    { id: 20, entity_name: 'BLOC CFO FP Partner v1', entity_type: 'bloc_capitalisation', domain: 'Finance & FP&A', description: 'Charte CFO & FP&A Partner — Business Plans, Modèles Excel 12 onglets, Plans de financement, Valorisations', document_count: 4, tags: ['CFO', 'FP&A', 'business plan', 'Excel', 'valorisation'], metadata: { score_kos: 90, exactitude: 24, conformite: 22, valeur_client: 19, reutilisabilite: 14, innovation: 11 }, related_entities: ['KHEPRA_CFO_FP_PARTNER_CHARTER.md'] },
    { id: 21, entity_name: 'BLOC CFO FP Partner v2', entity_type: 'bloc_capitalisation', domain: 'Finance & FP&A', description: 'CFO v2.1 — Règles de Croisement Inter-Modules KHEPRA OS, 3 flux automatisés, 5 classeurs départementaux', document_count: 5, tags: ['CFO', 'inter-modules', 'flux automatisés', 'P&L'], metadata: { score_kos: 93, exactitude: 24, conformite: 24, valeur_client: 19, reutilisabilite: 15, innovation: 11 }, related_entities: ['KHEPRA_CFO_FP_PARTNER_CHARTER.md', 'Marketing→Revenue'] },
    { id: 22, entity_name: 'BLOC Charte Audit Interne', entity_type: 'bloc_capitalisation', domain: 'Audit Interne', description: 'Charte de l\'Audit Interne — Template 4 chapitres, 13 points de vigilance, grille /25, Règle d\'Or', document_count: 1, tags: ['audit interne', 'COBAC', 'IIA', 'IPPF', '3 lignes défense'], metadata: { score_kos: 88, exactitude: 24, conformite: 23, valeur_client: 17, reutilisabilite: 14, innovation: 10 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md', 'Circulaire COBAC 002-2020'] },
    { id: 30, entity_name: 'BLOC LCBFT', entity_type: 'bloc_capitalisation', domain: 'LBC/FT', description: 'Base de connaissance exhaustive LBC/FT — Architecture institutionnelle, KYC/CDD/EDD, Profilage, 8 piliers, Plan 90 jours, Score 96/100 EXCELLENCE', document_count: 8, tags: ['LBC/FT', 'blanchiment', 'GAFI', 'COBAC', 'BCEAO', 'KYC'], metadata: { score_kos: 96, exactitude: 25, conformite: 24, valeur_client: 20, reutilisabilite: 14, innovation: 13 }, related_entities: ['KHEPRA_LCBFT_KNOWLEDGE.md', 'GAFI 40 Recommandations', 'COBAC R-2018/01'] },
    { id: 27, entity_name: 'BLOC FINAM PCA SI', entity_type: 'bloc_capitalisation', domain: 'Résilience & Continuité', description: 'Agrément FINAM Congo COBAC + PCA/PCI + Schémas Directeurs SI BGFIBank — Score KOS 96/100 EXCELLENCE', document_count: 2, tags: ['PCA', 'PCI', 'agrément', 'COBAC', 'BGFIBank', 'résilience'], metadata: { score_kos: 96, exactitude: 25, conformite: 25, valeur_client: 20, reutilisabilite: 14, innovation: 12 }, related_entities: ['KHEPRA_FINAM_PCA_KNOWLEDGE.md', 'COBAC R-2008/01', 'ISO 22301'] },
    { id: 32, entity_name: 'BLOC Multi-Agent', entity_type: 'bloc_capitalisation', domain: 'Intelligence Artificielle', description: 'Architecture Multi-Agent KHEPRA — 8 agents IA, Protocole Gouvernance 8 étapes, 20 types missions, Score 95/100 EXCELLENCE', document_count: 5, tags: ['multi-agent', 'IA', 'orchestration', 'Claude', 'gouvernance IA'], metadata: { score_kos: 95, exactitude: 24, conformite: 24, valeur_client: 19, reutilisabilite: 14, innovation: 14 }, related_entities: ['KHEPRA_MULTI_AGENT_SYSTEM.md', 'AGENT 1-8'] },
    { id: 29, entity_name: 'BLOC Knowledge RAG Partner', entity_type: 'bloc_capitalisation', domain: 'Knowledge Management', description: 'Charte AGENT 9 — Gouvernance documentaire, Gestion RAG 15 bibliothèques, 7 Playbooks, Capitalisation post-mission', document_count: 1, tags: ['RAG', 'knowledge', 'AGENT 9', 'playbooks', 'veille'], metadata: { score_kos: 94, exactitude: 25, conformite: 24, valeur_client: 18, reutilisabilite: 15, innovation: 12 }, related_entities: ['KHEPRA_KNOWLEDGE_RAG_PARTNER_CHARTER.md'] },
    { id: 34, entity_name: 'BLOC PAR Provisions BCEAO', entity_type: 'bloc_capitalisation', domain: 'Audit Prudentiel', description: 'Analyse PAR & Provisions — Classification COBAC 5 classes, Scoring Qualité Portefeuille /100', document_count: 2, tags: ['PAR', 'provisions', 'BCEAO', 'COBAC'], metadata: { score_kos: 93, exactitude: 25, conformite: 24, valeur_client: 18, reutilisabilite: 14, innovation: 12 }, related_entities: ['scripts/khepra_calcul_par_provisions.py'] },
    { id: 41, entity_name: 'BLOC Stress Test Portefeuille', entity_type: 'bloc_capitalisation', domain: 'Audit Prudentiel', description: 'Stress Test Portefeuille — 7 scénarios COBAC, Scoring Résilience /100', document_count: 2, tags: ['stress test', 'COBAC', 'portefeuille', 'résilience'], metadata: { score_kos: 94, exactitude: 25, conformite: 24, valeur_client: 19, reutilisabilite: 14, innovation: 12 }, related_entities: ['scripts/khepra_stress_test_portefeuille.py'] },
    { id: 37, entity_name: 'BLOC ProBoutik BGFI AMIFA', entity_type: 'bloc_capitalisation', domain: 'Crédit & Risques', description: 'ProBoutik Scoring Crédit + BGFI Cartographie Risques Bâle II + AMIFA Gap Analysis COBAC', document_count: 1, tags: ['scoring crédit', 'Bâle II', 'cartographie risques', 'COBAC'], metadata: { score_kos: 93, exactitude: 24, conformite: 25, valeur_client: 18, reutilisabilite: 14, innovation: 12 }, related_entities: ['KHEPRA_PROBOUTIK_BGFI_AMIFA_KNOWLEDGE.md'] },
    { id: 25, entity_name: 'BLOC Compliance Pack', entity_type: 'bloc_capitalisation', domain: 'Conformité', description: 'Déclarations Individuelles Obligatoires — 8 tables standardisées, guide remplissage, 10 points vigilance', document_count: 2, tags: ['conformité', 'déclaration', 'conflit intérêts', 'BCEAO'], metadata: { score_kos: 89, exactitude: 23, conformite: 23, valeur_client: 18, reutilisabilite: 14, innovation: 11 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md', 'Circulaire 02-2017/CB/C'] },
    { id: 31, entity_name: 'BLOC MFI BP UEMOA', entity_type: 'bloc_capitalisation', domain: 'Microfinance', description: 'Business Plan IMF UEMOA — 14 chapitres, Tri-Scénarios, Modèle financier 12 onglets', document_count: 1, tags: ['microfinance', 'business plan', 'UEMOA', 'TEG'], metadata: { score_kos: 92, exactitude: 24, conformite: 24, valeur_client: 19, reutilisabilite: 14, innovation: 11 }, related_entities: ['MFI_BUSINESS_PLAN_FRAMEWORK_UEMOA.md'] },
    { id: 26, entity_name: 'BLOC Cross Module Rules', entity_type: 'bloc_capitalisation', domain: 'Architecture OS', description: 'Règles de Croisement Inter-Modules KHEPRA OS — 3 flux automatisés', document_count: 5, tags: ['inter-modules', 'KHEPRA OS', 'flux', 'P&L'], metadata: { score_kos: 91, exactitude: 23, conformite: 23, valeur_client: 18, reutilisabilite: 15, innovation: 12 }, related_entities: ['KHEPRA_OS'] },
    { id: 42, entity_name: 'BLOC UEMOA CEMAC Expansion', entity_type: 'bloc_capitalisation', domain: 'Stratégie', description: 'Stratégie d\'Expansion UEMOA-CEMAC — Analyse comparative 14 pays', document_count: 8, tags: ['expansion', 'UEMOA', 'CEMAC', 'stratégie', 'panafricain'], metadata: { score_kos: 90, exactitude: 23, conformite: 23, valeur_client: 18, reutilisabilite: 14, innovation: 12 }, related_entities: ['UEMOA', 'CEMAC', 'BCEAO', 'BEAC'] },
    { id: 36, entity_name: 'BLOC PPR', entity_type: 'bloc_capitalisation', domain: 'Gestion des Risques', description: 'Plan Préventif de Redressement — Template 7 sections, 13 points vigilance', document_count: 3, tags: ['PPR', 'plan redressement', 'COBAC', 'prudentiel'], metadata: { score_kos: 89, exactitude: 24, conformite: 24, valeur_client: 17, reutilisabilite: 13, innovation: 11 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md', 'Circulaire COBAC 001-2020/CB/C'] },
    { id: 28, entity_name: 'BLOC Governance Flow v2', entity_type: 'bloc_capitalisation', domain: 'Gouvernance', description: 'Flow de gouvernance v2.0 — articulation COBAC/BCEAO/OHADA, 7 piliers', document_count: 4, tags: ['gouvernance', 'COBAC', 'BCEAO', 'OHADA'], metadata: { score_kos: 90, exactitude: 24, conformite: 24, valeur_client: 17, reutilisabilite: 14, innovation: 11 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md'] },
    { id: 33, entity_name: 'BLOC Nationality Derogation', entity_type: 'bloc_capitalisation', domain: 'Gouvernance RH', description: 'Dérogation à la Condition de Nationalité — Template Requête, Circuit', document_count: 1, tags: ['nationalité', 'dérogation', 'recrutement', 'COBAC'], metadata: { score_kos: 87, exactitude: 23, conformite: 23, valeur_client: 17, reutilisabilite: 13, innovation: 11 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md'] },
    { id: 35, entity_name: 'BLOC PMO Deployment', entity_type: 'bloc_capitalisation', domain: 'Gestion de Projet', description: 'Deployment & PMO — 5 Volets opérationnels', document_count: 5, tags: ['PMO', 'déploiement', 'projet'], metadata: { score_kos: 86, exactitude: 22, conformite: 22, valeur_client: 17, reutilisabilite: 14, innovation: 11 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md'] },
    { id: 38, entity_name: 'BLOC Rapport Annuel SCI', entity_type: 'bloc_capitalisation', domain: 'Reporting Réglementaire', description: 'Rapport Annuel Contrôle Interne & Risques — Template 4 sections, grille /25', document_count: 1, tags: ['rapport annuel', 'contrôle interne', 'COBAC'], metadata: { score_kos: 88, exactitude: 24, conformite: 23, valeur_client: 17, reutilisabilite: 14, innovation: 10 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md'] },
    { id: 39, entity_name: 'BLOC Rapport Semestriel SCI', entity_type: 'bloc_capitalisation', domain: 'Reporting Réglementaire', description: 'Rapport Semestriel Contrôle Interne — 13 points vigilance, Règle d\'Or', document_count: 1, tags: ['rapport semestriel', 'contrôle interne', 'COBAC'], metadata: { score_kos: 87, exactitude: 23, conformite: 23, valeur_client: 17, reutilisabilite: 14, innovation: 10 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md'] },
    { id: 40, entity_name: 'BLOC Resolution Notification', entity_type: 'bloc_capitalisation', domain: 'Gestion des Risques', description: 'Résolution Crises Bancaires — Template double usage Option A/B', document_count: 2, tags: ['résolution', 'crise bancaire', 'COBAC'], metadata: { score_kos: 88, exactitude: 23, conformite: 24, valeur_client: 17, reutilisabilite: 13, innovation: 11 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md'] },
    { id: 23, entity_name: 'BLOC Client Comms Template', entity_type: 'bloc_capitalisation', domain: 'Relation Client', description: 'Modèle de Communication Client standardisé — 4 sections', document_count: 1, tags: ['communication client', 'COBAC', 'réclamations'], metadata: { score_kos: 85, exactitude: 22, conformite: 23, valeur_client: 17, reutilisabilite: 13, innovation: 10 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md'] },
    { id: 24, entity_name: 'BLOC Complaints Management', entity_type: 'bloc_capitalisation', domain: 'Relation Client', description: 'Procédure Gestion des Réclamations — Réception, Traitement, Reporting', document_count: 1, tags: ['réclamations', 'COBAC', 'protection clients'], metadata: { score_kos: 86, exactitude: 23, conformite: 23, valeur_client: 17, reutilisabilite: 13, innovation: 10 }, related_entities: ['KHEPRA_AI_GOVERNANCE.md'] },
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const domains: DomainSummary[] = useMemo(() => {
    const map = new Map<string, KnowledgeNode[]>();
    mockNodes.forEach((n) => {
      const list = map.get(n.domain) || [];
      list.push(n);
      map.set(n.domain, list);
    });
    return Array.from(map.entries()).map(([domain, nodes]) => ({
      domain,
      count: nodes.length,
      avgScore: Math.round(nodes.reduce((s, n) => s + (n.metadata?.score_kos || 0), 0) / nodes.length),
      nodes,
    })).sort((a, b) => b.avgScore - a.avgScore);
  }, [mockNodes]);

  const filteredNodes = useMemo(() => {
    let nodes = mockNodes;
    if (activeDomain !== 'all') {
      nodes = nodes.filter((n) => n.domain === activeDomain);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      nodes = nodes.filter((n) =>
        n.entity_name.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q)) ||
        n.domain.toLowerCase().includes(q)
      );
    }
    return nodes;
  }, [mockNodes, activeDomain, searchQuery]);

  const totalDocs = mockNodes.reduce((s, n) => s + n.document_count, 0);
  const avgScore = Math.round(mockNodes.reduce((s, n) => s + (n.metadata?.score_kos || 0), 0) / mockNodes.length);
  const excellenceCount = mockNodes.filter((n) => (n.metadata?.score_kos || 0) >= 90).length;
  const totalTags = new Set(mockNodes.flatMap((n) => n.tags)).size;
  const totalRelations = mockNodes.reduce((s, n) => s + n.related_entities.length, 0);

  if (loading) {
    return (
      <hubLayout title="Knowledge Capitalization Hub">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <i className="ri-loader-4-line text-2xl animate-spin text-foreground-400" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            <span className="text-sm text-foreground-500">Chargement du patrimoine intellectuel...</span>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout title="KOS Knowledge Capitalization Hub™" subtitle="Capitalisation documentaire — 26 BLOCs · 67+ documents métier · Patrimoine intellectuel KHEPRA">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center animate-fade-in-up">
          <p className="text-2xl font-bold text-foreground-950">{mockNodes.length}</p>
          <p className="text-xs text-foreground-600 mt-0.5">BLOCs capitalisés</p>
        </div>
        <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center animate-fade-in-up delay-100">
          <p className="text-2xl font-bold text-foreground-950">{domains.length}</p>
          <p className="text-xs text-foreground-600 mt-0.5">Domaines métier</p>
        </div>
        <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center animate-fade-in-up delay-200">
          <p className="text-2xl font-bold text-foreground-950">{totalDocs}</p>
          <p className="text-xs text-foreground-600 mt-0.5">Documents liés</p>
        </div>
        <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center animate-fade-in-up delay-300">
          <p className="text-2xl font-bold text-emerald-700">{avgScore}</p>
          <p className="text-xs text-foreground-600 mt-0.5">Score KOS moyen</p>
        </div>
        <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center animate-fade-in-up">
          <p className="text-2xl font-bold text-amber-700">{excellenceCount}</p>
          <p className="text-xs text-foreground-600 mt-0.5">≥ 90/100</p>
        </div>
        <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center animate-fade-in-up delay-100">
          <p className="text-2xl font-bold text-foreground-950">{totalTags}</p>
          <p className="text-xs text-foreground-600 mt-0.5">Tags uniques</p>
        </div>
        <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center animate-fade-in-up delay-200">
          <p className="text-2xl font-bold text-foreground-950">{totalRelations}</p>
          <p className="text-xs text-foreground-600 mt-0.5">Relations</p>
        </div>
      </div>

      {/* Search & Domain Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400" style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          <input
            type="text"
            placeholder="Rechercher un BLOC, mot-clé, domaine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-background-50 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400"
          />
        </div>
        <select
          value={activeDomain}
          onChange={(e) => setActiveDomain(e.target.value)}
          className="px-3 py-2 text-sm bg-background-50 border border-background-200/70 rounded-lg text-foreground-950 cursor-pointer focus:outline-none focus:border-primary-400"
        >
          <option value="all">Tous les domaines ({mockNodes.length})</option>
          {domains.map((d) => (
            <option key={d.domain} value={d.domain}>{d.domain} ({d.count})</option>
          ))}
        </select>
      </div>

      {/* Domain Distribution */}
      <div className="flex flex-wrap gap-2 mb-5">
        {domains.map((d) => (
          <button
            key={d.domain}
            onClick={() => setActiveDomain(activeDomain === d.domain ? 'all' : d.domain)}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${activeDomain === d.domain ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-700 hover:bg-background-200'}`}
          >
            {d.domain} <span className="opacity-70">({d.count} · {d.avgScore}/100)</span>
          </button>
        ))}
      </div>

      {/* Nodes Grid */}
      <div className="grid gap-3">
        {filteredNodes.length === 0 ? (
          <div className="text-center py-12">
            <i className="ri-file-search-line text-3xl text-foreground-300" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }} />
            <p className="text-sm text-foreground-500 mt-3">Aucun BLOC trouvé pour "{searchQuery}"</p>
          </div>
        ) : (
          filteredNodes.map((node, idx) => (
            <div key={node.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.03}s` }}>
              <NodeCard node={node} />
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      <div className="mt-8 pt-5 border-t border-background-200/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-foreground-950">Patrimoine Intellectuel KHEPRA</h4>
            <p className="text-xs text-foreground-600 mt-0.5">
              26 blocs de capitalisation · {domains.length} domaines métier · Score KOS moyen {avgScore}/100 · {excellenceCount} blocs classés EXCELLENCE (≥ 90/100)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-foreground-600">
            <span><span className="font-medium text-foreground-950">{totalDocs}</span> documents liés</span>
            <span><span className="font-medium text-foreground-950">{totalRelations}</span> relations inter-documents</span>
            <span><span className="font-medium text-foreground-950">{totalTags}</span> tags</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





