/**
 * ═══════════════════════════════════════════════════════════════
 * KOS MASTER PROMPT v5.0 — Chief Compliance & Knowledge Engine
 * KHEPRA EXPERTS — Big Four Full Upgrade Dashboard
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from 'react';

interface MemoryStats {
  totalMemorized: number;
  totalReused: number;
  lastMemorizedAt: string | null;
  averageR1Score: number;
  averageR2Score: number;
  averageLeadMagnetScore: number;
  isae3402Compliant: boolean;
}

interface MemoryEntry {
  id: string;
  exigence: string;
  texte: string;
  article: string;
  solution: string;
  kpi: { conformite?: number; fraicheur?: number; couverture?: number; score?: number };
  source: string;
  controle4Yeux: {
    r1: { passed: boolean; score: number; verifiedBy: string };
    r2: { passed: boolean; score: number; verifiedBy: string };
  };
  leadMagnetScore: number;
  memorizedAt: string;
  reusedCount: number;
  hash: string;
}

const TAB_IDS = ['overview', 'memory', 'principes', 'commands'] as const;
type TabId = (typeof TAB_IDS)[number];

const LAYER_SOURCES = [
  { label: 'L1 — Régulateurs', count: 23, icon: 'ri-government-line', desc: 'BCEAO, COBAC, BEAC, UEMOA, CEMAC, OHADA, GAFI, BCBS, IOSCO, IAIS, FMI, BM, BAD, OCDE, AMF-UMOA, AMF-UEMOA, CIMA, GABAC...' },
  { label: 'L2 — Normalisateurs', count: 12, icon: 'ri-file-settings-line', desc: 'IFRS, ISO, IFAC, IFC, GRI, SASB, TCFD, IPSASB, IIRC, CDSB, VRF, INTOSAI' },
  { label: 'L3 — Académique', count: 200, icon: 'ri-graduation-cap-line', desc: 'QS Top 200 Business & Law Schools via Crossref + Semantic Scholar' },
  { label: 'L4 — Revues Pro', count: 50, icon: 'ri-book-open-line', desc: 'JBF, RFS, TAR, JFE, JF, MS, JAR, JFQA, JMCB, JFSR, JFR, EAR, Abacus, AOS, CAR...' },
];

const LOIS_ABSOLUES = [
  { id: 1, title: 'SOURCE PRIMAIRE OBLIGATOIRE', desc: '100% des faits = URL directe vers source officielle. Si pas d\'URL → ne pas écrire.' },
  { id: 2, title: 'CHAMP D\'APPLICATION', desc: 'Vérification zone, entité, date JO, abrogation. Si hors champ → exclusion explicite.' },
  { id: 3, title: 'ZÉRO HALLUCINATION', desc: 'Interdiction d\'inventer. Si doute → "Information non disponible dans sources officielles".' },
  { id: 4, title: 'DATA LINEAGE', desc: 'Format source+url+doi+date obligatoire sous chaque fait.' },
  { id: 5, title: 'QUADRUPLE ANCRAGE', desc: 'L1 Régulateur + L2 Norme + L3 Académique + L4 Revue. 1 couche manque → BLOCAGE.' },
  { id: 6, title: 'FRAÎCHEUR', desc: 'Version en vigueur uniquement. Affichage "En vigueur au 02/07/2026".' },
  { id: 7, title: 'CONTRÔLE 4 YEUX', desc: 'R1 IA Manager (sources+champ+vigueur) + R2 IA Partner (matérialité+risque+lead magnet). < 100% → BLOCAGE.' },
];

const COMMANDES_SYSTEME = [
  { cmd: 'KOS AUDIT : [Sujet]', desc: 'Lance protocole complet Big Four avec quadruple ancrage' },
  { cmd: 'KOS SEED', desc: 'Force full seeding 285 sources maintenant' },
  { cmd: 'KOS LEARN', desc: 'Affiche best practices mémorisées' },
  { cmd: 'KOS PATCH', desc: 'Génère mise à jour KHEPRA 3LD-Matrix™ si nouvelle norme' },
  { cmd: 'KOS DIFF', desc: 'Affiche diff réglementaire J vs J-1' },
  { cmd: 'KOS MEMORY STATS', desc: 'Statistiques du Memory Engine' },
];

const KPIS_SORTIE = [
  { label: 'Sources Primaires', target: '100%', icon: 'ri-links-line' },
  { label: 'URLs Valides', target: '100%', icon: 'ri-check-double-line' },
  { label: 'Textes en Vigueur', target: '100%', icon: 'ri-calendar-check-line' },
  { label: 'Quadruple Ancrage', target: '100%', icon: 'ri-stack-line' },
  { label: 'Lead Magnet Score', target: '≥ 90%', icon: 'ri-magic-line' },
  { label: 'ISAE 3402', target: '✓', icon: 'ri-shield-check-line' },
];

export default function KOSMasterPromptV50Page() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [memoryStats, setMemoryStats] = useState<MemoryStats | null>(null);
  const [memories, setMemories] = useState<MemoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMemoryStats();
    fetchMemories();
  }, []);

  const fetchMemoryStats = async () => {
    try {
      const res = await fetch('http://localhost:3300/api/kos/memory/stats');
      if (res.ok) setMemoryStats(await res.json());
    } catch {
      // Memory Engine not running locally — use mock data
      setMemoryStats({
        totalMemorized: 0,
        totalReused: 0,
        lastMemorizedAt: null,
        averageR1Score: 0,
        averageR2Score: 0,
        averageLeadMagnetScore: 0,
        isae3402Compliant: true,
      });
    }
  };

  const fetchMemories = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3300/api/kos/memory/all?limit=20');
      if (res.ok) {
        const data = await res.json();
        setMemories(data.results || []);
      }
    } catch {
      setMemories([]);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || searchQuery.length < 3) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3300/api/kos/memory/search?q=${encodeURIComponent(searchQuery)}&limit=10`);
      if (res.ok) {
        const data = await res.json();
        setMemories(data.results || []);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const scoreColor = (score: number) => {
    if (score >= 95) return 'text-emerald-600';
    if (score >= 85) return 'text-amber-600';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background-950 to-background-900 text-background-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(193,154,107,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {['v5.0', 'Big Four Full Upgrade', 'Contrôle 4 Yeux', 'ISAE 3402', 'ISO 27001'].map((badge) => (
              <span key={badge} className="px-3 py-1 text-xs font-semibold rounded-full bg-background-50/10 text-background-50/90 border border-background-50/15 whitespace-nowrap">
                {badge}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            KOS v5.0 — Chief Compliance &amp; Knowledge Engine
          </h1>
          <p className="text-background-50/70 max-w-3xl text-sm md:text-base leading-relaxed">
            Moteur d&apos;intelligence réglementaire au standard Big Four + ISO 9001 + ISO 27001 + ISAE 3402 + ISO 30401 Knowledge Management.
            Génération de ressources documentaires avec 0 écart réglementaire, 0 texte empirique, 100% actionnable, 100% ultra lead magnet UEMOA/CEMAC.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              { value: '285', label: 'Sources Primaires', icon: 'ri-database-2-line' },
              { value: '4', label: 'Couches RAG', icon: 'ri-stack-line' },
              { value: '4 Yeux', label: 'Contrôle Qualité', icon: 'ri-eye-2-line' },
              { value: '24/7', label: 'Crawl Automatique', icon: 'ri-timer-flash-line' },
            ].map((stat) => (
              <div key={stat.label} className="bg-background-50/5 rounded-lg p-4 border border-background-50/10 text-center">
                <i className={`${stat.icon} text-2xl text-primary-500 mb-2 block`} />
                <div className="text-xl font-bold text-background-50">{stat.value}</div>
                <div className="text-xs text-background-50/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {[
              { id: 'overview' as TabId, label: 'Vue d\'ensemble', icon: 'ri-dashboard-line' },
              { id: 'memory' as TabId, label: 'Mémoire Auto-Apprenante', icon: 'ri-brain-line' },
              { id: 'principes' as TabId, label: 'Lois Absolues', icon: 'ri-scales-3-line' },
              { id: 'commands' as TabId, label: 'Commandes Système', icon: 'ri-terminal-box-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-background-50'
                    : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                }`}
              >
                <i className={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Architecture */}
                <div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                    <i className="ri-building-4-line text-primary-500" />
                    Architecture RAG — 285 Sources
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {LAYER_SOURCES.map((layer) => (
                      <div key={layer.label} className="bg-white rounded-lg p-5 border border-background-200/70">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                            <i className={`${layer.icon} text-lg text-primary-600`} />
                          </div>
                          <div>
                            <div className="text-xs text-foreground-600">{layer.label}</div>
                            <div className="text-xl font-bold text-foreground-950">{layer.count}</div>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed">{layer.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KPIs de Sortie */}
                <div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                    <i className="ri-bar-chart-2-line text-primary-500" />
                    KPIs de Sortie — 100% Obligatoire
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {KPIS_SORTIE.map((kpi) => (
                      <div key={kpi.label} className="bg-white rounded-lg p-4 border border-background-200/70 text-center">
                        <i className={`${kpi.icon} text-xl text-primary-500 mb-2 block`} />
                        <div className="text-lg font-bold text-foreground-950">{kpi.target}</div>
                        <div className="text-xs text-foreground-600 mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Memory Quick Stats */}
                <div>
                  <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                    <i className="ri-brain-line text-accent-500" />
                    Memory Engine v5.0 — État
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Best Practices Mémorisées', value: memoryStats?.totalMemorized || 0, icon: 'ri-save-3-line' },
                      { label: 'Réutilisations', value: memoryStats?.totalReused || 0, icon: 'ri-refresh-line' },
                      { label: 'Score R1 Moyen', value: `${memoryStats?.averageR1Score || 0}%`, icon: 'ri-shield-user-line', color: scoreColor(memoryStats?.averageR1Score || 0) },
                      { label: 'Score R2 Moyen', value: `${memoryStats?.averageR2Score || 0}%`, icon: 'ri-shield-star-line', color: scoreColor(memoryStats?.averageR2Score || 0) },
                    ].map((s) => (
                      <div key={s.label} className="bg-white rounded-lg p-4 border border-background-200/70">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0">
                            <i className={`${s.icon} text-accent-600`} />
                          </div>
                          <div>
                            <div className={`text-xl font-bold ${s.color || 'text-foreground-950'}`}>{s.value}</div>
                            <div className="text-xs text-foreground-600">{s.label}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {memoryStats && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-foreground-600">
                      <i className={`${memoryStats.isae3402Compliant ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-error-warning-fill text-red-500'}`} />
                      ISAE 3402 : {memoryStats.isae3402Compliant ? 'Conforme' : 'Non conforme'}
                      {memoryStats.lastMemorizedAt && ` · Dernière mémorisation : ${new Date(memoryStats.lastMemorizedAt).toLocaleString('fr-FR')}`}
                    </div>
                  )}
                </div>

                {/* Déploiement */}
                <div className="bg-background-950 rounded-lg p-6 text-background-50">
                  <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <i className="ri-rocket-2-line text-primary-500" />
                    Déploiement v5.0
                  </h2>
                  <div className="space-y-2 text-sm font-mono bg-background-900/50 rounded-lg p-4 overflow-x-auto">
                    <div className="text-background-50/70"># Lancement complet de la stack KOS v5.0</div>
                    <div className="text-primary-400">docker-compose --env-file .env.docker up -d --build</div>
                    <div className="text-background-50/50 mt-2"># Horaires automatisés :</div>
                    <div className="text-background-50/60"><span className="text-accent-400">01:00 GMT</span> — Full seeding 285 sources</div>
                    <div className="text-background-50/60"><span className="text-accent-400">01:30 GMT</span> — Diff J-1 + Auto-patch KHEPRA tools</div>
                    <div className="text-background-50/60"><span className="text-accent-400">08:00 GMT</span> — Digest Slack/Teams + Mail</div>
                  </div>
                </div>
              </div>
            )}

            {/* MEMORY TAB */}
            {activeTab === 'memory' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground-950 flex items-center gap-2">
                    <i className="ri-brain-line text-accent-500" />
                    Mémoire Auto-Apprenante
                  </h2>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Rechercher une best practice..."
                      className="flex-1 sm:w-64 px-4 py-2 text-sm border border-background-200/70 rounded-lg bg-white text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                    <button
                      onClick={handleSearch}
                      className="px-4 py-2 bg-primary-500 text-background-50 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-search-line mr-1" />Chercher
                    </button>
                  </div>
                </div>

                {/* Memory entries */}
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : memories.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-background-200/70">
                    <i className="ri-inbox-line text-4xl text-foreground-400 block mb-3" />
                    <p className="text-foreground-600 text-sm">
                      {memoryStats?.totalMemorized ? 'Aucun résultat pour cette recherche.' : 'Aucune best practice mémorisée. Lancez un KOS AUDIT pour commencer l\'apprentissage.'}
                    </p>
                    <p className="text-xs text-foreground-400 mt-2">
                      POST /api/kos/audit-universal → Auto-mémorisation via Contrôle 4 Yeux
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {memories.map((mem) => (
                      <div key={mem.id} className="bg-white rounded-lg border border-background-200/70 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground-950">{mem.exigence}</h3>
                            <p className="text-xs text-foreground-600 mt-1">{mem.texte} · {mem.article}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className={`text-xs font-bold ${scoreColor(mem.controle4Yeux?.r1?.score || 0)}`}>
                                R1: {mem.controle4Yeux?.r1?.score || '?'}%
                              </div>
                              <div className={`text-xs font-bold ${scoreColor(mem.controle4Yeux?.r2?.score || 0)}`}>
                                R2: {mem.controle4Yeux?.r2?.score || '?'}%
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                              (mem.leadMagnetScore || 0) >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              🧲 {mem.leadMagnetScore || 0}%
                            </span>
                          </div>
                        </div>

                        <div className="bg-background-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-foreground-800 leading-relaxed">{mem.solution}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-500">
                          {mem.source && (
                            <span className="flex items-center gap-1">
                              <i className="ri-link" /> {mem.source.length > 60 ? `${mem.source.substring(0, 60)}...` : mem.source}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <i className="ri-refresh-line" /> Réutilisé {mem.reusedCount || 0}x
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-time-line" /> {new Date(mem.memorizedAt).toLocaleString('fr-FR')}
                          </span>
                          <span className="font-mono text-foreground-400">{mem.hash?.substring(0, 12)}...</span>
                        </div>

                        {/* 4 Yeux detail */}
                        <div className="mt-3 flex gap-3">
                          <div className={`flex-1 rounded p-2 text-xs ${mem.controle4Yeux?.r1?.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                            <strong>R1 — IA Manager</strong> : {mem.controle4Yeux?.r1?.passed ? '✓ Passé' : '✗ Échoué'} ({mem.controle4Yeux?.r1?.score}%)
                          </div>
                          <div className={`flex-1 rounded p-2 text-xs ${mem.controle4Yeux?.r2?.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                            <strong>R2 — IA Partner</strong> : {mem.controle4Yeux?.r2?.passed ? '✓ Passé' : '✗ Échoué'} ({mem.controle4Yeux?.r2?.score}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Memory Engine Info */}
                <div className="bg-accent-50 rounded-lg p-5 border border-accent-200/50">
                  <h3 className="font-semibold text-foreground-950 mb-2 flex items-center gap-2">
                    <i className="ri-information-line text-accent-600" />
                    Comment ça marche
                  </h3>
                  <div className="space-y-2 text-sm text-foreground-700">
                    <p><strong>1. Auto-Mémorisation</strong> — Après chaque KOS AUDIT réussi, le système extrait automatiquement : exigence, texte, article, solution, KPI → kos_memory.jsonl</p>
                    <p><strong>2. Contrôle 4 Yeux</strong> — R1 (IA Manager) vérifie 285 sources + champ + vigueur. R2 (IA Partner) vérifie matérialité + risque + lead magnet score. Si R1 ou R2 &lt; 100% → BLOCAGE.</p>
                    <p><strong>3. Réutilisation</strong> — Lors du prochain audit, le système recherche automatiquement les best practices avec citation †Source originale† et incrémente le compteur de réutilisation.</p>
                    <p><strong>4. ISAE 3402</strong> — Chaque opération est loggée avec hash SHA256 dans un fichier d&apos;audit immuable.</p>
                  </div>
                </div>
              </div>
            )}

            {/* PRINCIPES TAB */}
            {activeTab === 'principes' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-foreground-950 flex items-center gap-2">
                  <i className="ri-scales-3-line text-primary-500" />
                  Lois Absolues — Violation = Blocage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LOIS_ABSOLUES.map((loi) => (
                    <div key={loi.id} className="bg-white rounded-lg border border-background-200/70 p-5 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary-600">{loi.id}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950 mb-1">{loi.title}</h3>
                        <p className="text-xs text-foreground-600 leading-relaxed">{loi.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-red-50 rounded-lg p-5 border border-red-200/50">
                  <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <i className="ri-alert-line" />
                    Règle de Blocage
                  </h3>
                  <div className="space-y-1 text-sm text-red-700/80 font-mono">
                    <p>Si un KPI {'<'} 100% → <strong>BLOCAGE QUALITÉ</strong> : [Raison]</p>
                    <p>Sources primaires: 100% | URLs valides: 100% | Textes en vigueur: 100%</p>
                    <p>Quadruple ancrage: 100% | Lead magnet score: ≥90% | ISAE 3402: ✓</p>
                  </div>
                </div>
              </div>
            )}

            {/* COMMANDS TAB */}
            {activeTab === 'commands' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-foreground-950 flex items-center gap-2">
                  <i className="ri-terminal-box-line text-primary-500" />
                  Commandes Système v5.0
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COMMANDES_SYSTEME.map((cmd) => (
                    <div key={cmd.cmd} className="bg-white rounded-lg border border-background-200/70 p-5">
                      <div className="font-mono text-sm font-bold text-primary-600 mb-2">{cmd.cmd}</div>
                      <p className="text-xs text-foreground-600">{cmd.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-background-950 rounded-lg p-6 text-background-50">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <i className="ri-code-s-slash-line text-primary-500" />
                    API Endpoints v5.0
                  </h3>
                  <div className="space-y-3 text-sm font-mono">
                    {[
                      { method: 'POST', path: '/api/kos/audit-universal', desc: 'Lance un audit avec quadruple ancrage' },
                      { method: 'POST', path: '/api/kos/memory/memorize', desc: 'Mémorise une best practice (Contrôle 4 Yeux)' },
                      { method: 'GET', path: '/api/kos/memory/search?q=...', desc: 'Recherche les best practices mémorisées' },
                      { method: 'GET', path: '/api/kos/memory/stats', desc: 'Statistiques du Memory Engine' },
                      { method: 'GET', path: '/api/kos/memory/all', desc: 'Liste toutes les mémoires' },
                      { method: 'POST', path: '/api/kos/alert-config', desc: 'Crée une configuration d\'alerte' },
                    ].map((ep) => (
                      <div key={ep.path} className="flex items-start gap-3 bg-background-900/50 rounded-lg p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap ${
                          ep.method === 'GET' ? 'bg-emerald-600/30 text-emerald-400' : 'bg-primary-600/30 text-primary-400'
                        }`}>{ep.method}</span>
                        <span className="text-background-50/80">{ep.path}</span>
                        <span className="text-background-50/50 ml-auto hidden sm:block">{ep.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
    </div>
  );
}