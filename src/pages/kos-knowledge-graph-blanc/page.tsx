import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useKnowledgeGraph } from '@/hooks/useKnowledgeGraph';

type KGTab = 'sources' | 'agents' | 'documents' | 'kpis';

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

function ProgressBar({ value, max = 100, color = 'primary' }: { value: number; max?: number; color?: string }) {
  const pct = Math.round((value / max) * 100);
  const barColor = color === 'accent' ? 'bg-accent-500' : color === 'secondary' ? 'bg-secondary-500' : 'bg-primary-500';
  return <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden"><div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} /></div>;
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    'Actif': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En déploiement': 'bg-primary-100 text-primary-700 border-primary-200',
    'En vigueur': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Abrogé': 'bg-red-100 text-red-700 border-red-200',
    'En projet': 'bg-amber-100 text-amber-700 border-amber-200',
  };
  const classes = bgMap[variant] || 'bg-background-200 text-foreground-700 border-background-200';
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

function formatNumber(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val.toLocaleString('fr-FR');
}

export default function KOSKnowledgeGraphPage() {
  const { sources, agents, documents, globalMetrics, isLive, loading, error, refetch } = useKnowledgeGraph();
  const [activeTab, setActiveTab] = useState<KGTab>('sources');

  const tabs = [
    { id: 'sources' as KGTab, label: 'Sources', icon: 'ri-database-2-line', count: sources.length, color: 'primary' as const },
    { id: 'agents' as KGTab, label: 'Agents KG', icon: 'ri-robot-2-line', count: agents.length, color: 'accent' as const },
    { id: 'documents' as KGTab, label: 'Documents Récents', icon: 'ri-pages-line', count: documents.length, color: 'secondary' as const },
    { id: 'kpis' as KGTab, label: 'KPIs Knowledge', icon: 'ri-bar-chart-2-line', count: 6, color: 'primary' as const },
  ];

  const tab = tabs.find(t => t.id === activeTab)!;

  if (loading) {
    return (
      <KOSHubLayout hubId={69} activeTab="sources" tabLabel="Knowledge Graph">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement du Knowledge Graph...</span></div></div>
        </div>
      </KOSHubLayout>
    );
  }

  if (error && sources.length === 0) {
    return (
      <KOSHubLayout hubId={69} activeTab="sources" tabLabel="Knowledge Graph">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  const metrics = globalMetrics;

  return (
    <KOSHubLayout hubId={69} activeTab={activeTab} tabLabel="Knowledge Graph">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 01 — Master Plan Big Four</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Phase 1 — Fondations</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KHEPRA Knowledge Graph&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Cerveau documentaire central de Khepra Experts. 50 000 documents indexés depuis 10 sources officielles (BCEAO, UEMOA, OHADA, COBAC, BAD, Banque Mondiale, FMI, OCDE, GRI, ISSB). Base RAG vectorielle de 1,25M embeddings, taxonomie réglementaire de 847 catégories. Alimente tous les agents IA en données sourcées et vérifiées.
          </p>
        </div>

        {/* Global KPI Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Documents</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(metrics.total_documents)}</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-checkbox-circle-fill text-xs"></i>Indexés</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Embeddings</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(metrics.total_embeddings)}</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-cpu-line text-xs"></i>Vectoriels</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Catégories</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(metrics.total_categories)}</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-folder-chart-line text-xs"></i>Taxonomie</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Exhaustivité</p>
            <span className="text-xl font-bold text-foreground-950">{metrics.score_exhaustivite}%</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-arrow-up-line text-xs"></i>Cible 100%</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Précision</p>
            <span className="text-xl font-bold text-foreground-950">{metrics.score_precision}%</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-crosshair-line text-xs"></i>Recherche</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Sync</p>
            <span className="text-sm font-bold text-foreground-950 leading-tight">{metrics.rafraichissement_quotidien}</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-refresh-line text-xs"></i>Auto</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
              activeTab === t.id
                ? t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500'
                : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'
            }`}>
              <i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span>
            </button>
          ))}
        </div>

        {/* Tab Info Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-background-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tab.color === 'accent' ? 'bg-accent-100 text-accent-700' : tab.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
              <i className={`${tab.icon} text-lg`}></i>
            </div>
            <div><p className="text-sm font-semibold text-foreground-950">{tab.label}</p><p className="text-xs text-foreground-600">{tab.count} entrées &bull; Knowledge Graph Enterprise</p></div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full border font-medium bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>MODE MOCK — SUPABASE READY
          </span>
        </div>

        {/* SOURCES */}
        {activeTab === 'sources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sources.map((src) => (
              <div key={src.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    src.type === 'regulateur' ? 'bg-red-100 text-red-600' :
                    src.type === 'international' ? 'bg-primary-100 text-primary-600' :
                    src.type === 'developpement' ? 'bg-accent-100 text-accent-600' :
                    'bg-secondary-100 text-secondary-600'
                  }`}>
                    <i className={`${src.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground-950">{src.nom}</h4>
                    <p className="text-[11px] text-foreground-500">{src.type} &bull; {src.frequence}</p>
                  </div>
                  <CircularGauge value={src.couverture} size={42} strokeWidth={3} color={src.couverture >= 95 ? 'primary' : 'accent'} />
                </div>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{src.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-sm font-bold text-foreground-950">{formatNumber(src.documents_indexes)}</p>
                    <p className="text-[9px] text-foreground-500">Docs indexés</p>
                  </div>
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-sm font-bold text-foreground-950">{src.couverture}%</p>
                    <p className="text-[9px] text-foreground-500">Couverture</p>
                  </div>
                </div>
                <div className="text-[10px] text-foreground-500 flex items-center gap-1 pt-2 border-t border-background-200/50">
                  <i className="ri-timer-line text-xs"></i>Sync : {src.derniere_sync}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AGENTS */}
        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${agent.icon} text-lg`}></i></div>
                  <div><h4 className="text-sm font-semibold text-foreground-950">{agent.nom}</h4><Badge label={agent.statut} variant={agent.statut} /></div>
                </div>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{agent.mission}</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{formatNumber(agent.actions_24h)}</p><p className="text-[9px] text-foreground-500">Actions/24h</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{formatNumber(agent.documents_traites)}</p><p className="text-[9px] text-foreground-500">Docs traités</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{agent.precision}%</p><p className="text-[9px] text-foreground-500">Précision</p></div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {agent.taches.map((t, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-background-50 border border-background-200/60 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                    doc.type === 'Instruction' ? 'bg-red-100 text-red-600' :
                    doc.type === 'Circulaire' ? 'bg-amber-100 text-amber-600' :
                    doc.type === 'Règlement' ? 'bg-primary-100 text-primary-600' :
                    doc.type === 'Directive' ? 'bg-accent-100 text-accent-600' :
                    'bg-secondary-100 text-secondary-600'
                  }`}>
                    <i className="ri-file-text-line text-sm"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-semibold text-foreground-950 leading-tight line-clamp-1">{doc.titre}</span>
                      <Badge label={doc.type} variant={doc.statut} />
                      <Badge label={doc.statut} variant={doc.statut} />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-500">
                      <span>{doc.source}</span><span>&bull;</span><span>{doc.date}</span><span>&bull;</span><span className="text-xs font-medium">{doc.langue}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {doc.mots_cles.map((k, i) => (
                        <span key={i} className="text-[9px] bg-background-200/70 text-foreground-600 px-1.5 py-0.5 rounded-full">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <CircularGauge value={doc.pertinence} size={36} strokeWidth={3} color={doc.pertinence >= 95 ? 'primary' : 'accent'} />
                  <p className="text-[9px] text-foreground-500 mt-0.5">Pertinence</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KPIs */}
        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'kpi-kg-01', nom: 'Documents Indexés', valeur: formatNumber(metrics.total_documents), cible: '50 000', statut: 'Atteint', icon: 'ri-pages-line' },
              { id: 'kpi-kg-02', nom: 'Textes Catégorisés', valeur: '100%', cible: '100%', statut: 'Atteint', icon: 'ri-folder-chart-line' },
              { id: 'kpi-kg-03', nom: 'Sources Actives', valeur: '10/10', cible: '10', statut: 'Atteint', icon: 'ri-database-2-line' },
              { id: 'kpi-kg-04', nom: 'Couverture Régionale', valeur: '54 pays', cible: '54 pays', statut: 'Atteint', icon: 'ri-earth-line' },
              { id: 'kpi-kg-05', nom: 'Rafraîchissement', valeur: 'Quotidien 06:00', cible: 'Quotidien', statut: 'Atteint', icon: 'ri-refresh-line' },
              { id: 'kpi-kg-06', nom: 'Précision Recherche', valeur: `${metrics.score_precision}%`, cible: '99%', statut: 'En cours', icon: 'ri-crosshair-line' },
            ].map((kpi) => (
              <div key={kpi.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${kpi.icon} text-sm`}></i></div>
                  <div><h4 className="text-sm font-semibold text-foreground-950">{kpi.nom}</h4></div>
                </div>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-foreground-950">{kpi.valeur}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${kpi.statut === 'Atteint' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{kpi.statut}</span>
                </div>
                <p className="text-[10px] text-foreground-500 mt-1">Cible : {kpi.cible}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-mind-map text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KHEPRA Knowledge Graph&trade; — Cerveau Documentaire Central</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{formatNumber(metrics.total_documents)}</strong> documents</span>
            <span><strong>{formatNumber(metrics.total_categories)}</strong> catégories</span>
            <span><strong>{metrics.score_exhaustivite}%</strong> exhaustivité</span>
            <span><strong>{metrics.couverture_regions}</strong></span>
          </div>
          <div className="mt-3 pt-3 border-t border-accent-200/40 text-[10px] text-accent-700/60 text-center">
            Certification {metrics.certification}
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}