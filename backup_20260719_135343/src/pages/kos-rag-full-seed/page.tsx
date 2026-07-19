import { useState, useMemo, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  RAG_SEED_BATCHES,
  RAG_SEED_STATS,
  RAG_SEED_INITIAL_LOGS,
  RAG_DOMAIN_DISTRIBUTION,
  RAG_ORGANISATION_MAP,
  RAG_DOCUMENT_TYPES,
  type RagSeedBatch,
  type RagSeedLog,
} from '@/mocks/ragFullSeed';

type TabId = 'batches' | 'distribution' | 'organisations' | 'logs';

const BATCH_COLORS: Record<string, string> = {
  bceao: '#D97706',
  cobac: '#DC2626',
  ohada: '#0D9488',
  gafi: '#7C3AED',
  cima: '#0891B2',
  international: '#2563EB',
  national: '#059669',
  regional: '#A855F7',
};

export default function ragFullSeedPage() {
  const [activeTab, setActiveTab] = useState<TabId>('batches');
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);
  const [logs] = useState<RagSeedLog[]>(RAG_SEED_INITIAL_LOGS);
  const [executionMode, setExecutionMode] = useState<'dry-run' | 'full' | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string>('all');

  const toggleBatch = useCallback((id: string) => {
    setExpandedBatch(prev => prev === id ? null : id);
  }, []);

  const tabs: { id: TabId; label: string; icon: string; badge: string }[] = [
    { id: 'batches', label: '8 Batchs', icon: 'ri-stack-line', badge: String(RAG_SEED_BATCHES.length) },
    { id: 'distribution', label: 'Distribution', icon: 'ri-pie-chart-line', badge: 'Domaines' },
    { id: 'organisations', label: 'Organisations', icon: 'ri-building-2-line', badge: String(RAG_ORGANISATION_MAP.length) },
    { id: 'logs', label: 'Logs Live', icon: 'ri-terminal-box-line', badge: String(logs.length) },
  ];

  const filteredLogs = useMemo(() => {
    if (activeTab === 'logs') return logs;
    return logs;
  }, [logs, activeTab]);

  const handleExecuteSeed = (mode: 'dry-run' | 'full') => {
    setExecutionMode(mode);
    // Dans un environnement réel, cela invoquerait l'Edge Function
    // supabase.functions.invoke('kos-rag-full-seed', { body: { mode, batch: selectedBatch === 'all' ? undefined : selectedBatch } })
  };

  return (
    <hubLayout hubId={1050}>
      <SeoHead
        title="KOS RAG Full Seeding Command™ — Injection Massive Documents Réglementaires | KHEPRA"
        description="Centre de commandement du Seeding RAG Réglementaire KOS. Injection massive de documents BCEAO, COBAC, OHADA, GAFI, CIMA, ISO, IFRS, Bâle dans la base vectorielle. 8 batchs, 100+ documents, 24 organisations, 28 pays."
        keywords="KOS RAG Seeding, documents réglementaires, BCEAO, COBAC, OHADA, GAFI, RAG, vector database, KHEPRA EXPERTS"
        canonicalPath="/kos-rag-full-seed"
        ogType="website"
      />

      {/* ============ HERO ============ */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20futuristic%20knowledge%20repository%20visualization%2C%20glowing%20interconnected%20data%20nodes%20forming%20a%20neural%20network%20of%20regulatory%20documents%2C%20deep%20blue%20and%20amber%20energy%20streams%20connecting%20floating%20crystalline%20codex%20structures%2C%20cosmic%20library%20with%20ethereal%20light%20beams%20illuminating%20ancient%20scrolls%20transforming%20into%20digital%20data%20streams%2C%20dark%20space%20background%20with%20binary%20constellations%2C%20ultra%20detailed%20cinematic%208K%20render%2C%20sacred%20geometry%20patterns%2C%20dramatic%20blue%20amber%20teal%20triad%20color%20scheme%2C%20no%20text%20no%20human%20figures%2C%20volumetric%20lighting&width=1920&height=700&seq=kos-rag-full-seed-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                KOS RAG FULL SEEDING — INJECTION MASSIVE DOCUMENTS RÉGLEMENTAIRES
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              RAG Full Seeding
              <span className="block text-amber-400 mt-2">Command Center™</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">8 batchs</strong> de documents réglementaires prêts pour l&apos;injection massive.{' '}
              <strong className="text-amber-300">100+ documents</strong> couvrant{' '}
              <strong className="text-teal-300">24 organisations</strong> régulatrices,{' '}
              <strong className="text-indigo-300">28 pays</strong> et juridictions.{' '}
              <span className="block mt-2 text-amber-400 font-semibold">BCEAO · COBAC · OHADA · GAFI · CIMA · ISO · IFRS · Bâle · COSO · NIST · RGPD · BEAC · CEDEAO · OCDE · BEPS · GIABA</span>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Batchs', value: String(RAG_SEED_STATS.totalBatches), icon: 'ri-stack-line', color: 'amber' },
                { label: 'Documents', value: '100+', icon: 'ri-file-text-line', color: 'teal' },
                { label: 'Organisations', value: String(RAG_SEED_STATS.organisationsCovered), icon: 'ri-building-2-line', color: 'indigo' },
                { label: 'Pays', value: String(RAG_SEED_STATS.paysCovered), icon: 'ri-global-line', color: 'violet' },
                { label: 'Domaines', value: String(RAG_SEED_STATS.domainsCovered), icon: 'ri-folder-line', color: 'emerald' },
                { label: 'Edge Function', value: 'kos-rag-full-seed', icon: 'ri-cpu-line', color: 'rose' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/8 border border-white/10 backdrop-blur-sm">
                  <i className={`${stat.icon} text-${stat.color}-400 text-sm`} />
                  <span className="text-xs text-gray-400">{stat.label}</span>
                  <span className="text-sm font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXECUTION PANEL ============ */}
      <section className="bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="rounded-2xl bg-foreground-950 p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <i className="ri-play-circle-line text-amber-400 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold">Console d&apos;Exécution — KOS RAG Full Seed Engine v1.0</h3>
                  <p className="text-xs text-gray-400">Edge Function : kos-rag-full-seed · Mode upsert intelligent (insert/update par titre)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs cursor-pointer outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="all" className="text-gray-900">Tous les batchs (100+ docs)</option>
                  {RAG_SEED_BATCHES.map(b => (
                    <option key={b.id} value={b.id} className="text-gray-900">{b.name} ({b.documentCount} docs)</option>
                  ))}
                </select>
                <button
                  onClick={() => handleExecuteSeed('dry-run')}
                  disabled={executionMode !== null}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    executionMode === 'dry-run'
                      ? 'bg-teal-500/30 text-teal-300 border border-teal-400/30'
                      : 'bg-teal-500/20 text-teal-300 border border-teal-400/30 hover:bg-teal-500/30'
                  }`}
                >
                  <i className="ri-eye-line mr-1.5" />
                  {executionMode === 'dry-run' ? 'Dry-Run en cours...' : 'Dry-Run (Simuler)'}
                </button>
                <button
                  onClick={() => handleExecuteSeed('full')}
                  disabled={executionMode !== null}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    executionMode === 'full'
                      ? 'bg-amber-500/30 text-amber-300 border border-amber-400/30'
                      : 'bg-amber-500 text-foreground-950 hover:bg-amber-400 border border-amber-500'
                  }`}
                >
                  <i className="ri-rocket-line mr-1.5" />
                  {executionMode === 'full' ? 'Exécution en cours...' : 'Lancer Full Seed'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TAB NAVIGATION ============ */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ============ TAB: BATCHES ============ */}
        {activeTab === 'batches' && (
          <div className="space-y-4">
            {RAG_SEED_BATCHES.map((batch) => {
              const isExpanded = expandedBatch === batch.id;
              const color = BATCH_COLORS[batch.id] || '#D97706';
              return (
                <div key={batch.id} className="rounded-xl bg-white border border-background-200/70 overflow-hidden">
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => toggleBatch(batch.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                          <i className={`${batch.icon} text-xl`} style={{ color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-bold text-foreground-950">{batch.name}</h3>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                              batch.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              batch.status === 'seeding' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              batch.status === 'failed' ? 'bg-red-50 text-red-700 border border-red-200' :
                              'bg-gray-50 text-gray-500 border border-gray-200'
                            }`}>
                              {batch.status === 'completed' ? '✓ Complété' : batch.status === 'seeding' ? '⏳ En cours' : batch.status === 'failed' ? '✗ Échoué' : '· En attente'}
                            </span>
                          </div>
                          <p className="text-xs text-foreground-500">{batch.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${color}15`, color }}>
                              {batch.documentCount} documents
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                              {batch.inserted} insérés
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                              {batch.updated} mis à jour
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                        <div className="hidden sm:block text-right">
                          <div className="text-lg font-bold font-heading" style={{ color }}>{batch.totalInBatch}</div>
                          <div className="text-[10px] text-foreground-400">Total</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-background-100 flex items-center justify-center">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm`} />
                        </div>
                      </div>
                    </div>

                    {/* Mini progress */}
                    <div className="mt-3 h-1.5 rounded-full bg-background-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(batch.inserted + batch.updated) / Math.max(1, batch.totalInBatch) * 100}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-background-100">
                      <div className="pt-4 space-y-2">
                        <h4 className="text-xs font-bold text-foreground-700 mb-2">Documents du batch</h4>
                        {batch.sampleTitles.map((title, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] p-2 rounded-lg bg-background-50 border border-background-100">
                            <i className="ri-file-text-line text-foreground-400 mt-0.5" />
                            <span className="text-foreground-600">{title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ============ TAB: DISTRIBUTION ============ */}
        {activeTab === 'distribution' && (
          <div className="space-y-6">
            {/* Domain distribution */}
            <div className="rounded-2xl bg-white border border-background-200/70 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <i className="ri-pie-chart-line text-amber-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950">Distribution par Domaine Réglementaire</h3>
                  <p className="text-xs text-foreground-500">{RAG_DOMAIN_DISTRIBUTION.length} domaines couverts</p>
                </div>
              </div>
              <div className="space-y-3">
                {RAG_DOMAIN_DISTRIBUTION.map((d) => (
                  <div key={d.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-foreground-700">{d.name}</span>
                      <span className="font-bold" style={{ color: d.color }}>{d.value} docs</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-background-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(d.value / Math.max(...RAG_DOMAIN_DISTRIBUTION.map(x => x.value))) * 100}%`,
                          backgroundColor: d.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document types */}
            <div className="rounded-2xl bg-white border border-background-200/70 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <i className="ri-file-list-3-line text-teal-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950">Types de Documents</h3>
                  <p className="text-xs text-foreground-500">{RAG_DOCUMENT_TYPES.length} types distincts</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {RAG_DOCUMENT_TYPES.map((t) => (
                  <span key={t.type} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-background-50 border border-background-200 text-foreground-700">
                    {t.type}
                    <span className="ml-1.5 text-foreground-400">{t.count}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: ORGANISATIONS ============ */}
        {activeTab === 'organisations' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white border border-background-200/70 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <i className="ri-building-2-line text-indigo-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950">Organisations Régulatrices Couvertes</h3>
                  <p className="text-xs text-foreground-500">{RAG_ORGANISATION_MAP.length} organisations — {RAG_SEED_STATS.paysCovered} pays & juridictions</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RAG_ORGANISATION_MAP.map((org) => (
                  <div key={org.name} className="flex items-center justify-between p-3 rounded-xl bg-background-50 border border-background-200/70">
                    <span className="text-xs font-semibold text-foreground-700">{org.name}</span>
                    <span className="text-xs font-bold text-foreground-400">{org.count} doc{org.count > 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ LOGS LIVE ============ */}
        {(activeTab === 'logs' || filteredLogs.length > 0) && (
          <div className={activeTab === 'logs' ? '' : 'mt-6'}>
            <div className="rounded-2xl bg-foreground-950 border border-gray-800 overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs text-gray-400 font-mono">KOS RAG Full Seeding — Execution Log</span>
                <span className="text-[10px] text-gray-500 ml-auto">{filteredLogs.length} entrées</span>
              </div>
              <div className="p-4 font-mono text-xs max-h-[400px] overflow-y-auto">
                <div className="space-y-1">
                  {filteredLogs.map((log, i) => (
                    <div key={i} className={`${
                      log.status === 'success' ? 'text-emerald-400' :
                      log.status === 'warning' ? 'text-amber-400' :
                      log.status === 'error' ? 'text-red-400' :
                      'text-cyan-400'
                    }`}>
                      <span className="text-gray-600">[{log.timestamp.slice(11, 19)}]</span>{' '}
                      {log.batch && <span className="text-teal-500">[{log.batch}]</span>}{' '}
                      <span>{log.status === 'success' ? '✓' : log.status === 'warning' ? '⚠' : log.status === 'error' ? '✗' : 'ℹ'}</span>{' '}
                      <span>{log.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============ CROSS-LINKS ============ */}
      <section className="py-12 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème RAG & Connaissance KOS
            </h2>
            <p className="text-foreground-600">Le RAG réglementaire alimente tous les agents KOS en données juridiques vérifiées.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Knowledge Center', path: '/kos-knowledge-center', icon: 'ri-book-2-line', color: '#0D9488' },
              { label: 'Synthèse RAG', path: '/rag-synthese', icon: 'ri-magic-line', color: '#7C3AED' },
              { label: 'Knowledge Graph', path: '/kos-knowledge-graph', icon: 'ri-git-branch-line', color: '#6366F1' },
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#DC2626' },
              { label: 'Regulatory Excellence', path: '/kos-regulatory-excellence', icon: 'ri-award-line', color: '#EA580C' },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



