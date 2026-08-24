import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import {
  SEEDING_SOURCES, SEEDING_STATS, SEEDING_RECENT_DOCS,
  SEEDING_QUARANTINE, SEEDING_CRON_CONFIG, SEEDING_KPI_TARGETS,
} from '@/mocks/autoSeeding';

type Tab = 'sources' | 'docs_recents' | 'quarantaine' | 'pg_cron' | 'kpis';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'sources', label: '18 Sources', icon: 'ri-database-2-line' },
  { id: 'docs_recents', label: 'Docs Récents', icon: 'ri-file-text-line' },
  { id: 'quarantaine', label: 'Quarantaine', icon: 'ri-shield-cross-line' },
  { id: 'pg_cron', label: 'pg_cron SQL', icon: 'ri-code-s-slash-line' },
  { id: 'kpis', label: 'KPIs Cibles', icon: 'ri-bar-chart-2-line' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    indexed: 'bg-emerald-100 text-emerald-700',
    pending_validation: 'bg-amber-100 text-amber-700',
    quarantined: 'bg-red-100 text-red-700',
    pass: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    fail: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-body ${map[status] ?? 'bg-background-200 text-foreground-500'}`}>
      {status}
    </span>
  );
}

export default function autoSeedingPage() {
  const [activeTab, setActiveTab] = useState<Tab>('sources');

  const allSources = [
    ...SEEDING_SOURCES.tier1_regulateurs,
    ...SEEDING_SOURCES.tier2_universites_africaines,
    ...SEEDING_SOURCES.tier3_think_tanks,
  ];

  return (
    <hubLayout hubId={122}>
      <div>
        {/* Hero */}
        <div className="bg-background-100 border-b border-background-200/70 px-4 md:px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent-100 flex-shrink-0">
                <i className="ri-seedling-line text-2xl text-accent-600"></i>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body">P2 — Auto-Seeding</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-background-200 text-foreground-600 font-body">0 API externe</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">Gap P6+P8 — FERMÉ</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">
                  KOS Auto-Seeding Engine™
                </h1>
                <p className="text-sm text-foreground-600 font-body mt-1 max-w-2xl">
                  Seeding automatique depuis {SEEDING_STATS.total_sources} sources (Régulateurs, JO, Universités africaines, Think Tanks). 
                  100K documents, 2.78M embeddings. RAG@10 = {SEEDING_STATS.rag_precision_at_10}. 
                  0 API externe — 100% pg_cron + Supabase Storage.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mt-4 pt-4 border-t border-background-200/70">
              {[
                { v: SEEDING_STATS.total_sources, l: 'Sources' },
                { v: `${(SEEDING_STATS.total_documents/1000).toFixed(0)}K`, l: 'Documents' },
                { v: `${(SEEDING_STATS.total_embeddings/1000000).toFixed(2)}M`, l: 'Embeddings' },
                { v: SEEDING_STATS.rag_precision_at_10, l: 'RAG@10' },
                { v: `${SEEDING_STATS.freshness_under_24h_pct}%`, l: 'Fraîcheur 24h' },
                { v: `${SEEDING_STATS.indice_fiabilite_moyen}`, l: 'Indice KOS moy.' },
                { v: SEEDING_STATS.countries_covered, l: 'Pays couverts' },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-lg font-bold text-foreground-950 font-heading">{s.v}</div>
                  <div className="text-[10px] text-foreground-500 font-body">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-background-200/70 bg-background-50 px-4 md:px-6">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div className="flex gap-1 py-2 min-w-max">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-accent-100 text-accent-700 font-semibold'
                      : 'text-foreground-500 hover:text-foreground-700 hover:bg-background-200'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">

          {activeTab === 'sources' && (
            <div className="space-y-6">
              {[
                { title: 'Tier 1 — Régulateurs Officiels', sources: SEEDING_SOURCES.tier1_regulateurs, color: 'bg-emerald-100 text-emerald-700' },
                { title: 'Tier 2 — Universités Africaines', sources: SEEDING_SOURCES.tier2_universites_africaines, color: 'bg-primary-100 text-primary-700' },
                { title: 'Tier 3 — Think Tanks & Big Four', sources: SEEDING_SOURCES.tier3_think_tanks, color: 'bg-secondary-100 text-secondary-700' },
              ].map(group => (
                <div key={group.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-body ${group.color}`}>{group.title}</span>
                    <span className="text-xs text-foreground-400 font-body">{group.sources.length} sources</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-body">
                      <thead>
                        <tr className="border-b border-background-200/70">
                          {['Source', 'Pays', 'Type', 'Documents', 'Fiabilité', 'Dernier Fetch'].map(h => (
                            <th key={h} className="text-left py-2 pr-4 text-foreground-500 font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {group.sources.map(s => (
                          <tr key={s.id} className="border-b border-background-100 hover:bg-background-50">
                            <td className="py-2 pr-4 font-semibold text-foreground-800">{s.name}</td>
                            <td className="pr-4 text-foreground-500">{s.country}</td>
                            <td className="pr-4"><span className="px-1.5 py-0.5 rounded bg-background-200 text-foreground-600">{s.type}</span></td>
                            <td className="pr-4 text-foreground-700 font-semibold">{s.docs_count.toLocaleString()}</td>
                            <td className="pr-4">
                              <span className={`font-semibold ${s.reliability >= 95 ? 'text-emerald-600' : s.reliability >= 85 ? 'text-amber-600' : 'text-red-500'}`}>
                                {s.reliability}%
                              </span>
                            </td>
                            <td className="text-foreground-400">{s.last_fetch.slice(0, 10)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'docs_recents' && (
            <div className="space-y-3">
              <p className="text-xs text-foreground-500 font-body">{SEEDING_RECENT_DOCS.length} documents récemment ingérés/mis à jour</p>
              {SEEDING_RECENT_DOCS.map(doc => (
                <div key={doc.id} className="bg-background-50 rounded-lg border border-background-200/70 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-foreground-800 font-heading line-clamp-2">{doc.titre}</h3>
                    <StatusBadge status={doc.status} />
                  </div>
                  <div className="flex items-center gap-4 flex-wrap text-xs text-foreground-500 font-body">
                    <span><strong>Autorité:</strong> {doc.autorité}</span>
                    <span><strong>Pays:</strong> {doc.pays}</span>
                    <span><strong>Type:</strong> {doc.type_texte}</span>
                    <span><strong>Pub:</strong> {doc.date_pub}</span>
                    {doc.date_vigueur && <span><strong>Vigueur:</strong> {doc.date_vigueur}</span>}
                    <span><strong>Chunks:</strong> {doc.chunks}</span>
                    <span className={`font-semibold ${doc.indice_fiabilite >= 95 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      KOS: {doc.indice_fiabilite}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quarantaine' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-xs text-amber-800 font-body">
                  <i className="ri-shield-cross-line mr-1"></i>
                  <strong>{SEEDING_STATS.documents_quarantined} documents en quarantaine</strong> — En attente de vérification manuelle ou rejet définitif.
                  Indice KOS insuffisant (&lt;95/100) ou source non officielle.
                </p>
              </div>
              {SEEDING_QUARANTINE.map(q => (
                <div key={q.id} className="bg-red-50 rounded-lg border border-red-200 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-red-800 font-heading">{q.titre}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 font-body whitespace-nowrap">{q.action}</span>
                  </div>
                  <p className="text-xs text-red-600 font-body">{q.raison}</p>
                  <p className="text-xs text-red-400 font-body mt-1">Indice KOS: {q.indice_fiabilite}/100 — Seuil: 95/100</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pg_cron' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">0 API externe</span>
                <span className="px-2 py-1 rounded-md text-xs font-semibold bg-background-200 text-foreground-600 font-body">pg_cron Supabase</span>
                <span className="text-xs text-foreground-400 font-body">SOC 2 CC7.2 — Monitoring Continu</span>
              </div>
              <pre className="text-xs text-foreground-700 font-body bg-background-100 rounded-xl p-5 border border-background-200/70 overflow-auto whitespace-pre-wrap leading-relaxed">
                {SEEDING_CRON_CONFIG}
              </pre>
            </div>
          )}

          {activeTab === 'kpis' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(SEEDING_KPI_TARGETS).map(([key, kpi]) => {
                const progress = Math.min(100, Math.round((kpi.current / kpi.target) * 100));
                const isExceeded = kpi.current >= kpi.target;
                return (
                  <div key={key} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                    <h3 className="text-sm font-semibold text-foreground-800 mb-1 font-heading capitalize">{key.replace(/_/g, ' ')}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold text-foreground-950 font-heading">{kpi.current}</span>
                      <span className="text-xs text-foreground-500 font-body">/ {kpi.target} {kpi.unit}</span>
                    </div>
                    <div className="w-full bg-background-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${isExceeded ? 'bg-emerald-500' : 'bg-accent-500'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-foreground-400 font-body mt-1">{progress}% atteint{isExceeded ? ' — CIEL' : ''}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </hubLayout>
  );
}



