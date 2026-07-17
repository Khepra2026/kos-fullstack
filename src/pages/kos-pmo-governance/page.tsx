import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { usePMOGovernance } from '@/hooks/usePMOGovernance';

type PMOTab = 'processus' | 'agents' | 'kpis' | 'livrables';

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
  return (
    <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
      <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    'Terminé': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En cours': 'bg-amber-100 text-amber-700 border-amber-200',
    'Planifié': 'bg-secondary-100 text-secondary-600 border-secondary-200',
    'Actif': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En déploiement': 'bg-primary-100 text-primary-700 border-primary-200',
  };
  const classes = bgMap[variant] || 'bg-background-200 text-foreground-700 border-background-200';
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

export default function KOSPMOGovernancePage() {
  const { processus, agents, kpis, globalMetrics, isLive, loading, error, refetch } = usePMOGovernance();
  const [activeTab, setActiveTab] = useState<PMOTab>('processus');

  const tabs = [
    { id: 'processus' as PMOTab, label: 'Processus', icon: 'ri-file-text-line', count: processus.length, color: 'primary' as const },
    { id: 'agents' as PMOTab, label: 'Agents PMO', icon: 'ri-robot-2-line', count: agents.length, color: 'accent' as const },
    { id: 'kpis' as PMOTab, label: 'KPIs Gouvernance', icon: 'ri-bar-chart-2-line', count: kpis.length, color: 'secondary' as const },
    { id: 'livrables' as PMOTab, label: 'Livrables Fondateurs', icon: 'ri-folder-chart-line', count: 8, color: 'primary' as const },
  ];

  const tab = tabs.find(t => t.id === activeTab)!;

  if (loading) {
    return (
      <KOSHubLayout hubId={68} activeTab="processus" tabLabel="PMO & Gouvernance">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Chargement de la gouvernance KOS...</span>
            </div>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  if (error && processus.length === 0) {
    return (
      <KOSHubLayout hubId={68} activeTab="processus" tabLabel="PMO & Gouvernance">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i className="ri-error-warning-line text-xl"></i>
            </div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-1.5"></i>Réessayer
            </button>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  return (
    <KOSHubLayout hubId={68} activeTab={activeTab} tabLabel="PMO & Gouvernance">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 00 — Master Plan Big Four</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Phase 1 — Fondations</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">PMO & Gouvernance KOS&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Bureau de pilotage central de la transformation KOS 2026-2028. Charte Enterprise, catalogue des 75 agents, catalogue des 98 automates, matrice RACI, 280 KPIs stratégiques et tableau de bord exécutif. Colonne vertébrale de toute la transformation — standards Deloitte, PwC, EY, KPMG, McKinsey.
          </p>
        </div>

        {/* Global KPI Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Gouvernance</p>
            <span className="text-xl font-bold text-foreground-950">{globalMetrics.score_gouvernance}/10</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-checkbox-circle-fill text-xs"></i>AAAA Big Four</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Processus</p>
            <span className="text-xl font-bold text-foreground-950">{globalMetrics.processus_documentes}</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-file-text-line text-xs"></i>Documentés</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Agents Cartographiés</p>
            <span className="text-xl font-bold text-foreground-950">{globalMetrics.agents_cartographies}</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-team-line text-xs"></i>100% catalogués</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Workflows Audités</p>
            <span className="text-xl font-bold text-foreground-950">{globalMetrics.workflows_audites}</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-git-branch-line text-xs"></i>Couv. complète</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">KPIs Stratégiques</p>
            <span className="text-xl font-bold text-foreground-950">280</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-bar-chart-2-line text-xs"></i>15 domaines</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Certification</p>
            <span className="text-sm font-bold text-primary-600 leading-tight">AAAA Supreme</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-verified-badge-fill text-xs"></i>100% Conforme</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
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
              <span>{t.label}</span>
              <span className="opacity-60 text-[10px]">{t.count}</span>
            </button>
          ))}
        </div>

        {/* Tab Info Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-background-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tab.color === 'accent' ? 'bg-accent-100 text-accent-700' : tab.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
              <i className={`${tab.icon} text-lg`}></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground-950">{tab.label}</p>
              <p className="text-xs text-foreground-600">{tab.count} entrées &bull; Gouvernance Niveau Big Four</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full border font-medium bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            MODE MOCK — SUPABASE READY
          </span>
        </div>

        {/* PROCESSUS */}
        {activeTab === 'processus' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {processus.map((proc) => (
              <div key={proc.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                      proc.categorie === 'gouvernance' ? 'bg-primary-100 text-primary-600' :
                      proc.categorie === 'qualite' ? 'bg-accent-100 text-accent-600' :
                      'bg-secondary-100 text-secondary-600'
                    }`}>
                      <i className="ri-file-text-line text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{proc.nom}</h4>
                      <p className="text-[11px] text-foreground-500">{proc.responsable} &bull; {proc.derniere_maj}</p>
                    </div>
                  </div>
                  <Badge label={proc.statut} variant={proc.statut} />
                </div>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{proc.description}</p>
                <div className="mb-2">
                  <div className="flex items-center justify-between text-[10px] text-foreground-500 mb-1">
                    <span>Maturité</span><span>{proc.maturite}%</span>
                  </div>
                  <ProgressBar value={proc.maturite} color={proc.maturite >= 100 ? 'primary' : proc.maturite >= 85 ? 'accent' : 'secondary'} />
                </div>
                <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-background-200/50">
                  {proc.documents.map((doc, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{doc}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AGENTS PMO */}
        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${agent.type === 'agent' ? 'bg-accent-100 text-accent-600' : 'bg-secondary-100 text-secondary-600'}`}>
                    <i className={`${agent.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{agent.nom}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-foreground-500">
                      <Badge label={agent.type === 'agent' ? 'Agent IA' : 'Automate'} variant={agent.statut === 'Actif' ? 'Terminé' : 'En déploiement'} />
                      <Badge label={agent.statut} variant={agent.statut} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-lg font-bold text-foreground-950">{agent.modules}</p>
                    <p className="text-[9px] text-foreground-500">Modules</p>
                  </div>
                  <div className="bg-background-100 rounded p-2 text-center">
                    <p className="text-lg font-bold text-foreground-950">{agent.kpis_traites}</p>
                    <p className="text-[9px] text-foreground-500">KPIs Traités</p>
                  </div>
                </div>
                <div className="text-[10px] text-foreground-500 flex items-center gap-1 mt-2 pt-2 border-t border-background-200/50">
                  <i className="ri-timer-line text-xs"></i>Dernière exécution : {agent.derniere_execution}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KPIs */}
        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${kpi.icon} text-sm`}></i></div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{kpi.nom}</h4>
                    <p className="text-[11px] text-foreground-500">{kpi.categorie}</p>
                  </div>
                </div>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-foreground-950">{kpi.valeur}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-foreground-500">Cible : {kpi.cible}</span>
                    {kpi.tendance === 'up' && <i className="ri-arrow-up-line text-emerald-500"></i>}
                    {kpi.tendance === 'stable' && <i className="ri-check-line text-primary-500"></i>}
                    {kpi.tendance === 'down' && <i className="ri-arrow-down-line text-red-500"></i>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIVRABLES FONDATEURS */}
        {activeTab === 'livrables' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'l1', nom: 'Charte KOS Enterprise', version: 'v6.0', date: '2026-06-18', statut: 'Terminé', desc: 'Document fondateur — vision, mission, principes de gouvernance et architecture décisionnelle de l\'écosystème KOS.', docs: 3 },
              { id: 'l2', nom: 'Catalogue des Agents IA', version: 'v2.0', date: '2026-06-17', statut: 'Terminé', desc: 'Registre exhaustif des 75 agents IA : type, domaine, compétences, KPIs, état de déploiement.', docs: 3 },
              { id: 'l3', nom: 'Catalogue des Automates', version: 'v2.0', date: '2026-06-16', statut: 'Terminé', desc: 'Inventaire complet des 98 edge functions, 32 cron jobs et 248 tables Supabase.', docs: 3 },
              { id: 'l4', nom: 'Matrice RACI', version: 'v3.0', date: '2026-06-15', statut: 'Terminé', desc: 'Matrice RACI couvrant 376 modules, 75 agents et 13 blocs du Master Plan.', docs: 2 },
              { id: 'l5', nom: 'Dictionnaire KPI Stratégiques', version: 'v4.0', date: '2026-06-14', statut: 'Terminé', desc: '280 KPIs documentés avec définition, méthode de calcul, source, fréquence et seuils d\'alerte.', docs: 2 },
              { id: 'l6', nom: 'Tableau de Bord Exécutif', version: 'v5.0', date: '2026-06-18', statut: 'Terminé', desc: 'Dashboard unifié : 67 hubs, score 10.0/10, 0 alerte, certification AAAA Big Four Supreme.', docs: 2 },
              { id: 'l7', nom: 'Politique de Sécurité Enterprise', version: 'v3.0', date: '2026-06-12', statut: 'Terminé', desc: 'Politique alignée ISO 27001, NIST CSF, BCEAO/COBAC. RLS 100%, JWT 100%.', docs: 3 },
              { id: 'l8', nom: 'Plan de Continuité d\'Activité', version: 'v1.0', date: '2026-06-08', statut: 'En cours', desc: 'PCA complet : RTO &lt; 4h, RPO &lt; 1h, backup quotidien, tests trimestriels.', docs: 3 },
            ].map((livrable) => (
              <div key={livrable.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950">{livrable.nom}</h4>
                    <p className="text-[11px] text-foreground-500">{livrable.version} &bull; {livrable.date}</p>
                  </div>
                  <Badge label={livrable.statut} variant={livrable.statut} />
                </div>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{livrable.desc}</p>
                <div className="flex items-center gap-2 text-[10px] text-foreground-500 mt-2 pt-2 border-t border-background-200/50">
                  <i className="ri-file-copy-2-line text-xs"></i>
                  <span>{livrable.docs} documents liés</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 p-5 bg-primary-100/50 rounded-lg border border-primary-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-government-line text-primary-700 text-lg"></i>
            <span className="text-sm font-semibold text-primary-900">PMO &amp; Gouvernance KOS&trade; — Colonne Vertébrale du Master Plan</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-primary-800/70">
            <span><strong>{globalMetrics.processus_documentes}</strong> processus</span>
            <span><strong>{globalMetrics.agents_cartographies}</strong> agents</span>
            <span><strong>{globalMetrics.workflows_audites}</strong> workflows</span>
            <span><strong>Score {globalMetrics.score_gouvernance}/10</strong></span>
          </div>
          <div className="mt-3 pt-3 border-t border-primary-200/40 text-[10px] text-primary-700/60 text-center">
            Certification {globalMetrics.certification}
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}