import { useState } from 'react';
import {
  TOP_UNIVERSITIES,
  HIGH_IMPACT_JOURNALS,
  GLOBAL_THINK_TANKS,
  SECTOR_SYNTHESES,
  INTERNAL_MEMORY_REGISTRY,
  AUDIT_CYCLES,
  SCIENTIFIC_DIRECTOR_KPIS,
  SCIENTIFIC_DIRECTOR_GLOBALS,
} from '@/mocks/kosScientificDirector';
import ScrollReveal from '@/components/feature/ScrollReveal';

const tabs = ['Sourcing Académique', 'Synthèse Cognitive', 'Auto-Apprentissage', 'Référentiel FCK', 'KPIs & Pilotage'];

const regionLabels: Record<string, { label: string; icon: string }> = {
  americas: { label: 'Amériques', icon: 'ri-earth-line' },
  europe: { label: 'Europe', icon: 'ri-building-2-line' },
  africa: { label: 'Afrique', icon: 'ri-global-line' },
  asia_pacific: { label: 'Asie-Pacifique', icon: 'ri-ship-line' },
  middle_east: { label: 'Moyen-Orient', icon: 'ri-ancient-gate-line' },
};

const impactLabels: Record<string, { label: string; color: string; bg: string }> = {
  transformateur: { label: 'Transformateur', color: 'text-foreground-50', bg: 'bg-secondary-500' },
  fort: { label: 'Fort', color: 'text-accent-700', bg: 'bg-accent-100' },
  moyen: { label: 'Moyen', color: 'text-foreground-700', bg: 'bg-background-200' },
  faible: { label: 'Faible', color: 'text-foreground-600', bg: 'bg-background-100' },
};

export default function KOSScientificDirectorPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedSector, setSelectedSector] = useState<string>(SECTOR_SYNTHESES[0]?.sectorId || '');
  const [universityFilter, setUniversityFilter] = useState<'all' | string>('all');
  const [expandedMemory, setExpandedMemory] = useState<string | null>(null);

  const filteredUniversities = universityFilter === 'all'
    ? TOP_UNIVERSITIES
    : TOP_UNIVERSITIES.filter(u => u.region === universityFilter);

  const selectedSectorData = SECTOR_SYNTHESES.find(s => s.sectorId === selectedSector) || SECTOR_SYNTHESES[0];

  return (
    <div className="min-h-screen bg-background-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        {/* ── HEADER ── */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-background-100 border border-background-200/70 flex items-center justify-center">
                <i className="ri-flask-line text-secondary-500 text-xl"></i>
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase text-secondary-600 bg-secondary-100 px-3 py-1 rounded-full">Think Tank Hub 99</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse"></span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950 mb-2">Directeur Scientifique — Think Tank<span className="text-secondary-500">™</span></h1>
            <p className="text-foreground-600 text-base max-w-3xl">Sourcing académique élite (Top 200 universités, revues à fort impact, Think Tanks mondiaux), synthèse cognitive sectorielle Afrique francophone, et protocole d'auto-apprentissage systémique invisible.</p>
          </div>
        </ScrollReveal>

        {/* ── STATS BAR ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { label: 'Universités Trackées', value: SCIENTIFIC_DIRECTOR_GLOBALS.universitiesTracked, icon: 'ri-building-4-line', color: 'text-accent-600', bg: 'bg-accent-100' },
            { label: 'Revues Monitorées', value: SCIENTIFIC_DIRECTOR_GLOBALS.journalsMonitored, icon: 'ri-book-open-line', color: 'text-primary-600', bg: 'bg-primary-100' },
            { label: 'Publications Auditées', value: SCIENTIFIC_DIRECTOR_GLOBALS.totalPublicationsAudited, icon: 'ri-article-line', color: 'text-secondary-600', bg: 'bg-secondary-100' },
            { label: 'FCK Indexées', value: SCIENTIFIC_DIRECTOR_GLOBALS.totalFCKsIndexed, icon: 'ri-file-code-line', color: 'text-accent-600', bg: 'bg-accent-100' },
            { label: 'Densité Mémoire', value: `${SCIENTIFIC_DIRECTOR_GLOBALS.autonomousMemoryDensity}/100`, icon: 'ri-database-2-line', color: 'text-primary-600', bg: 'bg-primary-100' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 80}>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3.5">
                <div className={`w-7 h-7 rounded-md ${stat.bg} flex items-center justify-center mb-2`}>
                  <i className={`${stat.icon} ${stat.color} text-sm`}></i>
                </div>
                <div className="text-xl font-bold text-foreground-950">{stat.value}</div>
                <div className="text-xs text-foreground-600">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── TABS ── */}
        <div className="flex flex-wrap gap-1 p-1 bg-background-100 rounded-full mb-6 w-fit">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-background-50 text-foreground-950'
                  : 'text-foreground-600 hover:text-foreground-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ═══════════ TAB 1 — SOURCING ACADÉMIQUE ═══════════ */}
        {activeTab === 'Sourcing Académique' && (
          <div className="space-y-6">
            {/* Universités */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-building-4-line text-accent-500 text-lg"></i>
                <h2 className="text-lg font-semibold text-foreground-950">Top 200 Universités Mondiales — Échantillon</h2>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <button
                  onClick={() => setUniversityFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${universityFilter === 'all' ? 'bg-accent-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:text-foreground-900'}`}
                >
                  Toutes
                </button>
                {['africa', 'americas', 'europe', 'asia_pacific', 'middle_east'].map(r => (
                  <button
                    key={r}
                    onClick={() => setUniversityFilter(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${universityFilter === r ? 'bg-accent-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:text-foreground-900'}`}
                  >
                    <i className={`${regionLabels[r]?.icon} mr-1`}></i>
                    {regionLabels[r]?.label}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredUniversities.map(uni => (
                  <div key={uni.rank} className="bg-background-50 border border-background-200/70 rounded-lg p-3.5 hover:border-accent-200/70 transition-colors group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-accent-500 bg-accent-100 px-2 py-0.5 rounded">#{uni.rank}</span>
                          <span className="text-xs text-foreground-500 flex items-center gap-1">
                            <i className={`${regionLabels[uni.region]?.icon} text-accent-400`}></i>
                            {uni.country}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-foreground-950 group-hover:text-accent-600 transition-colors">{uni.name}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {uni.strengths.slice(0, 4).map(s => (
                        <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-background-100 text-foreground-600">{s}</span>
                      ))}
                    </div>
                    <div className="text-xs text-foreground-500 border-t border-background-200/70 pt-2 mt-1">
                      <span className="text-foreground-700 font-medium">Flagship :</span> {uni.flagshipJournals.slice(0, 2).join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revues */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-book-open-line text-primary-500 text-lg"></i>
                <h2 className="text-lg font-semibold text-foreground-950">Revues Académiques à Fort Impact</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {HIGH_IMPACT_JOURNALS.map(j => (
                  <div key={j.name} className="bg-background-50 border border-background-200/70 rounded-lg p-3.5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-sm text-foreground-950">{j.name}</div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                        j.relevance === 'critique' ? 'bg-primary-100 text-primary-700' :
                        j.relevance === 'majeur' ? 'bg-accent-100 text-accent-700' : 'bg-background-200 text-foreground-700'
                      }`}>{j.relevance}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground-500 mb-1.5">
                      <span>IF : <strong className="text-foreground-900">{j.impactFactor}</strong></span>
                      <span>h-index : <strong className="text-foreground-900">{j.hIndex}</strong></span>
                      <span>{j.field}</span>
                    </div>
                    <div className="text-xs text-foreground-500 border-t border-background-200/70 pt-2 mt-1">
                      <span className="text-foreground-700 font-medium">Afrique :</span> {j.africaRelevance}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Think Tanks */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-lightbulb-line text-secondary-500 text-lg"></i>
                <h2 className="text-lg font-semibold text-foreground-950">Think Tanks Mondiaux de Référence</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {GLOBAL_THINK_TANKS.map(tt => (
                  <div key={tt.name} className="bg-background-50 border border-background-200/70 rounded-lg p-3.5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-secondary-600 bg-secondary-100 px-2 py-0.5 rounded">#{tt.globalRank}</span>
                          <span className="font-semibold text-sm text-foreground-950">{tt.name}</span>
                        </div>
                        <div className="text-xs text-foreground-500">{tt.headquarters} · {tt.annualOutput}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {tt.specialties.map(s => (
                        <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-secondary-50 text-secondary-700">{s}</span>
                      ))}
                    </div>
                    <div className="text-xs text-foreground-500 border-t border-background-200/70 pt-2 mt-1">
                      <span className="text-foreground-700 font-medium">Afrique :</span> {tt.africaRelevance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ TAB 2 — SYNTHÈSE COGNITIVE ═══════════ */}
        {activeTab === 'Synthèse Cognitive' && (
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {SECTOR_SYNTHESES.map(sector => (
                <button
                  key={sector.sectorId}
                  onClick={() => setSelectedSector(sector.sectorId)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    selectedSector === sector.sectorId
                      ? 'bg-foreground-950 text-background-50 dark:text-foreground-950 dark:bg-background-50'
                      : 'bg-background-100 text-foreground-700 hover:bg-background-200 border border-background-200/70'
                  }`}
                >
                  <i className={`${sector.sectorIcon}`}></i>
                  {sector.sectorName.split(' & ')[0]}
                </button>
              ))}
            </div>

            {selectedSectorData && (
              <div className="space-y-5">
                {/* Global Research Landscape */}
                <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-md bg-accent-100 flex items-center justify-center">
                      <i className="ri-globe-line text-accent-600"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground-950 text-sm">Recherche Mondiale — État de l'Art</h3>
                      <span className="text-xs text-foreground-500">Maturité sectorielle : {selectedSectorData.maturityScore}/100</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-4 text-justify">{selectedSectorData.globalResearchLandscape}</p>
                  <div className="h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${selectedSectorData.maturityScore}%`, backgroundColor: selectedSectorData.color }}></div>
                  </div>
                </div>

                {/* Top References */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                      <i className="ri-quote-text text-primary-500"></i>
                      Top 5 Références Scientifiques
                    </h4>
                    <div className="space-y-3">
                      {selectedSectorData.topReferences.map((ref, i) => (
                        <div key={i} className="border-l-2 border-primary-200 pl-3">
                          <div className="text-xs font-semibold text-primary-600">{ref.source} · {ref.year}</div>
                          <div className="text-xs text-foreground-700 font-medium mt-0.5">{ref.title}</div>
                          <div className="text-xs text-foreground-500 mt-0.5">{ref.keyInsight}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transposition Gaps */}
                  <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                      <i className="ri-alert-line text-accent-500"></i>
                      Écarts de Transposition — Afrique Francophone
                    </h4>
                    <div className="space-y-2.5">
                      {selectedSectorData.transpositionGaps.map((gap, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            gap.severity === 'critique' ? 'bg-foreground-950' :
                            gap.severity === 'majeur' ? 'bg-accent-500' : 'bg-background-400'
                          }`}></span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-xs font-semibold ${
                                gap.severity === 'critique' ? 'text-foreground-950' :
                                gap.severity === 'majeur' ? 'text-accent-700' : 'text-foreground-600'
                              }`}>{gap.gap}</span>
                              <span className={`text-[10px] px-1.5 py-0 rounded-full ${
                                gap.severity === 'critique' ? 'bg-foreground-100 text-foreground-700' :
                                gap.severity === 'majeur' ? 'bg-accent-100 text-accent-700' : 'bg-background-200 text-foreground-600'
                              }`}>{gap.severity}</span>
                            </div>
                            <p className="text-xs text-foreground-500">{gap.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Khepra Innovation Levers */}
                <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-rocket-line text-secondary-500"></i>
                    Leviers d'Innovation Khepra Retenus
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {selectedSectorData.khepraInnovationLevers.map((lever, i) => (
                      <div key={i} className="bg-background-100 rounded-lg p-3.5 border border-background-200/70 hover:border-accent-200/70 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-foreground-700 bg-background-50 px-2 py-0.5 rounded">Impact {lever.impact}/100</span>
                          <span className="text-xs text-foreground-500">{lever.timeline}</span>
                        </div>
                        <div className="text-sm font-semibold text-foreground-950 mb-1.5">{lever.lever}</div>
                        <p className="text-xs text-foreground-500 leading-relaxed">{lever.description}</p>
                        <div className="mt-2 h-1.5 bg-background-200 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary-500 rounded-full" style={{ width: `${lever.impact}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ TAB 3 — AUTO-APPRENTISSAGE ═══════════ */}
        {activeTab === 'Auto-Apprentissage' && (
          <div className="space-y-6">
            {/* Protocole */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center">
                  <i className="ri-brain-line text-secondary-600"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground-950">Protocole d'Auto-Apprentissage Systémique (Internal Memory)</h2>
                  <p className="text-xs text-foreground-500">Exécution invisible — densification continue de la mémoire de contexte KOS</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-3 mb-5">
                {[
                  { step: 1, title: 'Audit Continu', desc: 'Chaque réponse KOS est auditée silencieusement pour détecter : hallucinations, gaps de connaissance, citations non vérifiées', icon: 'ri-search-eye-line' },
                  { step: 2, title: 'Extraction', desc: 'Identification des [Axes Sectoriels], [Réf. Scientifiques], [Écarts de Transposition], [Leviers Innovation]', icon: 'ri-file-code-line' },
                  { step: 3, title: 'Capitalisation', desc: 'Génération automatique d\'une FCK-IM avec métadonnées structurées et indexation dans le Knowledge Graph', icon: 'ri-archive-line' },
                  { step: 4, title: 'Densification', desc: 'Mise à jour incrémentale de la densité mémoire — le contexte KOS s\'affine à chaque cycle', icon: 'ri-stack-line' },
                ].map(s => (
                  <div key={s.step} className="bg-background-100 rounded-lg p-3.5 border border-background-200/70">
                    <div className="w-7 h-7 rounded-md bg-secondary-100 flex items-center justify-center mb-2">
                      <span className="text-xs font-bold text-secondary-600">{s.step}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1">{s.title}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Memory Registry */}
            <div>
              <h3 className="text-base font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-database-2-line text-accent-500"></i>
                Registre de Mémoire Interne — {INTERNAL_MEMORY_REGISTRY.length} entrées
              </h3>
              <div className="space-y-2">
                {INTERNAL_MEMORY_REGISTRY.map(entry => (
                  <div
                    key={entry.fckId}
                    className={`bg-background-50 border rounded-lg p-3.5 cursor-pointer transition-all ${
                      expandedMemory === entry.fckId ? 'border-accent-300' : 'border-background-200/70'
                    }`}
                    onClick={() => setExpandedMemory(expandedMemory === entry.fckId ? null : entry.fckId)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-accent-600 bg-accent-100 px-2 py-0.5 rounded">{entry.fckId}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${impactLabels[entry.impactKOS]?.bg} ${impactLabels[entry.impactKOS]?.color}`}>{entry.impactKOS}</span>
                          <span className="text-xs text-foreground-500">{entry.dateCaptured}</span>
                          <span className="text-xs text-foreground-400">· {entry.triggerAgent}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-foreground-700">[{entry.axeSectoriel}]</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            entry.status === 'active' ? 'bg-primary-100 text-primary-700' :
                            entry.status === 'pending_review' ? 'bg-accent-100 text-accent-700' : 'bg-background-200 text-foreground-600'
                          }`}>{entry.status === 'active' ? 'Actif' : entry.status === 'pending_review' ? 'En revue' : 'Archivé'}</span>
                        </div>
                        {expandedMemory === entry.fckId && (
                          <div className="mt-3 space-y-2 border-t border-background-200/70 pt-3">
                            <div>
                              <span className="text-xs font-semibold text-foreground-500">Réf. Scientifique Mondiale :</span>
                              <p className="text-xs text-foreground-700 mt-0.5">{entry.refScientifiqueMondiale}</p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-foreground-500">Écart de Transposition :</span>
                              <p className="text-xs text-foreground-700 mt-0.5">{entry.ecartTransposition}</p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-foreground-500">Levier d'Innovation Retenu :</span>
                              <p className="text-xs text-foreground-700 mt-0.5">{entry.levierInnovationRetenu}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <i className={`${expandedMemory === entry.fckId ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-400`}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Cycles */}
            <div>
              <h3 className="text-base font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-history-line text-primary-500"></i>
                Audit Trail — Cycles d'Auto-Apprentissage
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-foreground-500">Cycle</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-foreground-500">Date</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-foreground-500">Type</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-foreground-500">Pub. Auditées</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-foreground-500">FCK Générées</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-foreground-500">Hallucinations</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-foreground-500">Densité Avant→Après</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AUDIT_CYCLES.map(cycle => (
                      <tr key={cycle.cycleId} className="border-b border-background-100 hover:bg-background-100 transition-colors">
                        <td className="py-2.5 px-3 text-xs font-semibold text-accent-600">{cycle.cycleId}</td>
                        <td className="py-2.5 px-3 text-xs text-foreground-600">{cycle.date}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            cycle.type === 'full' ? 'bg-primary-100 text-primary-700' :
                            cycle.type === 'incremental' ? 'bg-accent-100 text-accent-700' : 'bg-background-200 text-foreground-600'
                          }`}>{cycle.type}</span>
                        </td>
                        <td className="py-2.5 px-3 text-xs text-foreground-700 text-right">{cycle.kbrPublicationsAudited}</td>
                        <td className="py-2.5 px-3 text-xs text-foreground-700 text-right font-semibold text-secondary-600">+{cycle.newFCKsGenerated}</td>
                        <td className="py-2.5 px-3 text-xs text-right">
                          <span className="text-foreground-400">{cycle.hallucinationsDetected} détectées</span>
                          <span className="text-primary-600 ml-1">→ {cycle.hallucinationsCorrected} corrigées</span>
                        </td>
                        <td className="py-2.5 px-3 text-xs text-right">
                          <span className="text-foreground-400">{cycle.memoryDensityBefore}</span>
                          <span className="text-secondary-600 font-semibold"> → {cycle.memoryDensityAfter}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {AUDIT_CYCLES.map(cycle => (
                <div key={cycle.cycleId} className="mt-2 bg-accent-50 border border-accent-200 rounded-lg p-3">
                  <span className="text-xs font-semibold text-accent-700">{cycle.cycleId} — Top Finding :</span>
                  <span className="text-xs text-accent-600 ml-1">{cycle.topFinding}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ TAB 4 — RÉFÉRENTIEL FCK ═══════════ */}
        {activeTab === 'Référentiel FCK' && (
          <div className="space-y-4">
            <p className="text-sm text-foreground-600">Base de connaissances capitalisée — {INTERNAL_MEMORY_REGISTRY.filter(e => e.status === 'active').length} FCK actives, {INTERNAL_MEMORY_REGISTRY.length} totales.</p>
            {INTERNAL_MEMORY_REGISTRY.map(entry => (
              <div key={entry.fckId} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-accent-600 bg-accent-100 px-2 py-0.5 rounded">{entry.fckId}</span>
                      <span className="font-semibold text-sm text-foreground-950">[{entry.axeSectoriel}]</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${impactLabels[entry.impactKOS]?.bg} ${impactLabels[entry.impactKOS]?.color}`}>{entry.impactKOS}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mt-1">
                      <strong>Réf :</strong> {entry.refScientifiqueMondiale.slice(0, 120)}...
                    </p>
                  </div>
                  <span className="text-xs text-foreground-400">{entry.dateCaptured}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-2 text-xs">
                  <div className="bg-background-100 rounded p-2">
                    <span className="font-semibold text-foreground-600">Écart de Transposition :</span>
                    <span className="text-foreground-600"> {entry.ecartTransposition.slice(0, 150)}...</span>
                  </div>
                  <div className="bg-background-100 rounded p-2">
                    <span className="font-semibold text-foreground-600">Levier Innovation :</span>
                    <span className="text-foreground-600"> {entry.levierInnovationRetenu.slice(0, 150)}...</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-background-200/70">
                  <span className="text-xs text-foreground-400">Agent déclencheur : {entry.triggerAgent}</span>
                  <span className="text-xs text-foreground-300">·</span>
                  <span className={`text-xs ${
                    entry.status === 'active' ? 'text-primary-600' :
                    entry.status === 'pending_review' ? 'text-accent-600' : 'text-foreground-500'
                  }`}>{entry.status === 'active' ? 'Actif' : entry.status === 'pending_review' ? 'En revue' : 'Archivé'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════ TAB 5 — KPIs & PILOTAGE ═══════════ */}
        {activeTab === 'KPIs & Pilotage' && (
          <div className="space-y-6">
            {/* Global metrics summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Prochain Audit', value: SCIENTIFIC_DIRECTOR_GLOBALS.nextFullAudit, icon: 'ri-calendar-check-line', color: 'text-primary-600', bg: 'bg-primary-100' },
                { label: 'Taux Apprentissage', value: `${SCIENTIFIC_DIRECTOR_GLOBALS.systemLearningRate}%/sem.`, icon: 'ri-line-chart-line', color: 'text-secondary-600', bg: 'bg-secondary-100' },
                { label: 'Think Tanks Suivis', value: SCIENTIFIC_DIRECTOR_GLOBALS.thinkTanksFollowed, icon: 'ri-lightbulb-line', color: 'text-accent-600', bg: 'bg-accent-100' },
                { label: 'Secteurs Couverts', value: `${SCIENTIFIC_DIRECTOR_GLOBALS.sectorsCovered}/8`, icon: 'ri-pie-chart-line', color: 'text-primary-600', bg: 'bg-primary-100' },
              ].map((m, i) => (
                <div key={i} className="bg-background-50 border border-background-200/70 rounded-lg p-4 text-center">
                  <div className={`w-8 h-8 rounded-md ${m.bg} flex items-center justify-center mx-auto mb-2`}>
                    <i className={`${m.icon} ${m.color} text-sm`}></i>
                  </div>
                  <div className="text-xl font-bold text-foreground-950">{m.value}</div>
                  <div className="text-xs text-foreground-500">{m.label}</div>
                </div>
              ))}
            </div>

            {/* KPIs by Category */}
            {(['sourcing', 'synthesis', 'auto_learning', 'impact'] as const).map(cat => {
              const catKPIs = SCIENTIFIC_DIRECTOR_KPIS.filter(k => k.category === cat);
              const catLabels: Record<string, { label: string; icon: string }> = {
                sourcing: { label: 'Sourcing', icon: 'ri-search-line' },
                synthesis: { label: 'Synthèse Cognitive', icon: 'ri-brain-line' },
                auto_learning: { label: 'Auto-Apprentissage', icon: 'ri-refresh-line' },
                impact: { label: 'Impact', icon: 'ri-rocket-line' },
              };
              return (
                <div key={cat} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className={`${catLabels[cat].icon} text-secondary-500`}></i>
                    {catLabels[cat].label}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {catKPIs.map(kpi => (
                      <div key={kpi.id} className="bg-background-100 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-foreground-600">{kpi.name}</span>
                          <i className={`${kpi.icon} ${kpi.trend > 0 ? 'text-primary-500' : 'text-accent-500'} text-xs`}></i>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1.5">
                          <span className="text-xl font-bold text-foreground-950">{kpi.current}</span>
                          <span className="text-xs text-foreground-400">{kpi.unit}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-foreground-400">Cible : {kpi.target}{kpi.unit}</span>
                          <span className={`font-semibold ${kpi.trend > 0 ? 'text-primary-600' : 'text-accent-600'}`}>
                            {kpi.trend > 0 ? '+' : ''}{kpi.trend}{kpi.unit}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 bg-background-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(100, (kpi.current / kpi.target) * 100)}%`,
                              backgroundColor: kpi.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}