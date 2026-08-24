import { useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import {
  FCK_001_EDITORIAL_METHODOLOGY,
  FCK_003_KPI_EDITORIAUX,
} from '@/mocks/kbrFichesConnaissance';

function SectionHeader({ overline, title, description }: { overline: string; title: string; description: string }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="w-8 h-px bg-primary-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">{overline}</span>
        <div className="w-8 h-px bg-primary-500" />
      </div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">{title}</h2>
      <p className="text-body-md text-foreground-600 max-w-3xl mx-auto">{description}</p>
    </div>
  );
}

export default function KBRDashboardPage() {
  const [activeTab, setActiveTab] = useState<'methodologie' | 'qualite' | 'audiences' | 'kpi' | 'fck'>('methodologie');
  const [expandedMintoLevel, setExpandedMintoLevel] = useState<number | null>(null);
  const [expandedRetroPhase, setExpandedRetroPhase] = useState<number | null>(null);

  const methodology = FCK_001_EDITORIAL_METHODOLOGY;
  const kpis = FCK_003_KPI_EDITORIAUX;

  const tabs = [
    { key: 'methodologie' as const, label: 'Méthodologie', icon: 'ri-book-open-line' },
    { key: 'qualite' as const, label: 'Standards Qualité', icon: 'ri-shield-check-line' },
    { key: 'audiences' as const, label: 'Audiences', icon: 'ri-group-line' },
    { key: 'kpi' as const, label: 'KPIs', icon: 'ri-bar-chart-grouped-line' },
    { key: 'fck' as const, label: 'FCK', icon: 'ri-file-text-line' },
  ];

  return (
    <div className="min-h-screen bg-background-50">
      <Navigation />

      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-foreground-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-primary-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
                  Direction de Rédaction Principale
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Khepra Business{' '}
                <span className="block text-primary-400">Review</span>
              </h1>
              <p className="text-body-lg text-foreground-400 leading-relaxed mb-4 max-w-2xl">
                Standard McKinsey Quarterly × Harvard Business Review — pour l'Afrique francophone.
                Pyramide de Minto, Analyse Rétro-Prospective, Triple Ancrage ISO + Institutionnel + Local.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-400 border border-primary-500/30">
                  ISO 56002 / 31000 / 37000
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-500/20 text-accent-400 border border-accent-500/30">
                  Pyramide de Minto
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary-500/20 text-secondary-400 border border-secondary-500/30">
                  Analyse Rétro-Prospective
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground-800 text-foreground-300 border border-foreground-700">
                  Zéro Hallucination
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="sticky top-0 z-40 bg-background-50 border-b border-background-200/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 py-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary-500 text-background-50'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* ============================================================
              MÉTHODOLOGIE
          ============================================================ */}
          {activeTab === 'methodologie' && (
            <div className="space-y-16">
              {/* Pyramide de Minto */}
              <section>
                <SectionHeader
                  overline="Structure"
                  title="Pyramide de Minto"
                  description="Chaque publication KBR place la conclusion et les recommandations stratégiques en premier, puis développe les arguments structurants MECE, puis les données de preuve."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {methodology.pyramideMinto.niveaux.map((niveau) => {
                    const isExpanded = expandedMintoLevel === niveau.niveau;
                    const colorMap: Record<number, { bg: string; border: string; badge: string; iconBg: string; iconText: string }> = {
                      1: { bg: 'bg-primary-50', border: 'border-primary-300/60', badge: 'bg-primary-500 text-background-50', iconBg: 'bg-primary-100', iconText: 'text-primary-600' },
                      2: { bg: 'bg-accent-50', border: 'border-accent-300/60', badge: 'bg-accent-500 text-background-50', iconBg: 'bg-accent-100', iconText: 'text-accent-600' },
                      3: { bg: 'bg-secondary-50', border: 'border-secondary-300/60', badge: 'bg-secondary-500 text-background-50', iconBg: 'bg-secondary-100', iconText: 'text-secondary-600' },
                    };
                    const colors = colorMap[niveau.niveau] || colorMap[1];
                    return (
                      <div
                        key={niveau.niveau}
                        className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                          isExpanded ? colors.border + ' shadow-sm' : 'border-background-200/70 hover:border-primary-200/40'
                        } ${colors.bg}`}
                        onClick={() => setExpandedMintoLevel(isExpanded ? null : niveau.niveau)}
                      >
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${colors.badge}`}>
                              N{niveau.niveau}
                            </span>
                            <h3 className="font-heading text-lg font-bold text-foreground-900">{niveau.nom}</h3>
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed mb-3">{niveau.description}</p>
                          {isExpanded && (
                            <div className="pt-3 border-t border-background-200/70 animate-fade-in">
                              <ul className="space-y-2">
                                {niveau.elements.map((el) => (
                                  <li key={el} className="flex items-center gap-2 text-sm text-foreground-700">
                                    <i className={`ri-check-line text-xs ${colors.iconText}`} />
                                    {el}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Anti-patterns */}
                <div className="mt-6 p-5 rounded-xl bg-red-50 border border-red-200/60">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-error-warning-line text-red-600" />
                    <span className="text-sm font-bold text-red-800">Anti-Patterns — À Éviter</span>
                  </div>
                  <ul className="space-y-1.5">
                    {methodology.pyramideMinto.antiPatterns.map((ap) => (
                      <li key={ap} className="flex items-start gap-2 text-sm text-red-700">
                        <span className="text-red-400 mt-0.5">✕</span>
                        {ap}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Analyse Rétro-Prospective */}
              <section>
                <SectionHeader
                  overline="Analyse"
                  title="Analyse Rétro-Prospective"
                  description="Ne pas se contenter de décrire un état de fait. Structurer l'analyse en trois temps : Historique & Diagnostic → Enjeux & Goulots → Scénarios Prospectifs 5 & 10 Ans."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {methodology.analyseRetroProspective.phases.map((phase) => {
                    const isExpanded = expandedRetroPhase === phase.phase;
                    const colorMap: Record<number, { bg: string; border: string; badge: string }> = {
                      1: { bg: 'bg-accent-50', border: 'border-accent-300/60', badge: 'bg-accent-500 text-background-50' },
                      2: { bg: 'bg-primary-50', border: 'border-primary-300/60', badge: 'bg-primary-500 text-background-50' },
                      3: { bg: 'bg-secondary-50', border: 'border-secondary-300/60', badge: 'bg-secondary-500 text-background-50' },
                    };
                    const colors = colorMap[phase.phase] || colorMap[1];
                    return (
                      <div
                        key={phase.phase}
                        className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                          isExpanded ? colors.border + ' shadow-sm' : 'border-background-200/70 hover:border-primary-200/40'
                        } ${colors.bg}`}
                        onClick={() => setExpandedRetroPhase(isExpanded ? null : phase.phase)}
                      >
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${colors.badge}`}>
                              <i className={`${phase.icone} text-lg`} />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400">Phase {phase.phase}</span>
                              <h3 className="font-heading text-base font-bold text-foreground-900">{phase.titre}</h3>
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="pt-3 border-t border-background-200/70 animate-fade-in space-y-3">
                              <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-foreground-400">Questions clés :</span>
                                <ul className="mt-1.5 space-y-1">
                                  {phase.questions.map((q) => (
                                    <li key={q} className="flex items-start gap-2 text-sm text-foreground-700">
                                      <i className="ri-question-line text-xs text-foreground-400 mt-0.5" />
                                      {q}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-foreground-400">Livrables :</span>
                                <ul className="mt-1.5 space-y-1">
                                  {phase.livrables.map((l) => (
                                    <li key={l} className="flex items-center gap-2 text-sm text-foreground-700">
                                      <i className="ri-file-text-line text-xs text-foreground-400" />
                                      {l}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Triple Ancrage */}
              <section>
                <SectionHeader
                  overline="Référentiels"
                  title="Triple Ancrage"
                  description="Chaque analyse sectorielle intègre systématiquement : Normes Internationales ISO, Benchmarks Institutionnels (Banque Mondiale, BAD, OCDE, BCEAO, COBAC), et Réalités Afrique Francophone."
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* ISO Standards */}
                  <div className="rounded-xl border border-primary-200/60 bg-primary-50 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100">
                        <i className="ri-global-line text-lg text-primary-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-400">Ancrage 1</span>
                        <h3 className="font-heading text-base font-bold text-foreground-900">Normes Internationales</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {methodology.referentiel.standardsInternationaux.map((s) => (
                        <div key={s.code} className="text-sm">
                          <span className="font-semibold text-foreground-800">{s.code}</span>
                          <p className="text-foreground-600 text-xs mt-0.5">{s.titre}</p>
                          <p className="text-foreground-500 text-xs italic">Usage KBR : {s.usage}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Institutional Benchmarks */}
                  <div className="rounded-xl border border-accent-200/60 bg-accent-50 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100">
                        <i className="ri-building-2-line text-lg text-accent-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-400">Ancrage 2</span>
                        <h3 className="font-heading text-base font-bold text-foreground-900">Benchmarks Institutionnels</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {methodology.referentiel.benchmarksInstitutionnels.map((b) => (
                        <div key={b.institution} className="text-sm">
                          <span className="font-semibold text-foreground-800">{b.institution}</span>
                          <p className="text-foreground-600 text-xs mt-0.5">{b.publication}</p>
                          <p className="text-foreground-500 text-xs italic">Usage KBR : {b.usage}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Francophone Africa Realities */}
                  <div className="rounded-xl border border-secondary-200/60 bg-secondary-50 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-100">
                        <i className="ri-earth-line text-lg text-secondary-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground-400">Ancrage 3</span>
                        <h3 className="font-heading text-base font-bold text-foreground-900">Réalités Afrique Francophone</h3>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {methodology.referentiel.realitesAfriqueFrancophone.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-foreground-700">
                          <i className="ri-check-line text-xs text-secondary-500 mt-0.5 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ============================================================
              STANDARDS QUALITÉ
          ============================================================ */}
          {activeTab === 'qualite' && (
            <section>
              <SectionHeader
                overline="Contrôle Qualité"
                title="9 Critères de Qualité KBR"
                description="Chaque publication doit satisfaire ces 9 critères avant publication. Score minimum : 8.5/10. La vérification est effectuée par le KOS Regulatory Quality Assurance Engine."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {methodology.standardsQualite.criteres.map((c) => {
                  const isCritique = c.ponderation === 'Critique';
                  return (
                    <div
                      key={c.id}
                      className={`rounded-xl border p-5 transition-all hover:-translate-y-1 ${
                        isCritique ? 'border-primary-200/60 bg-primary-50' : 'border-background-200/70 bg-background-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold ${
                          isCritique ? 'bg-primary-500 text-background-50' : 'bg-foreground-100 text-foreground-600'
                        }`}>
                          {c.id}
                        </span>
                        <div>
                          <h3 className="font-heading text-sm font-bold text-foreground-900">{c.critere}</h3>
                          <span className={`text-[10px] font-bold uppercase ${isCritique ? 'text-primary-600' : 'text-foreground-400'}`}>
                            {c.ponderation}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-check-double-line text-xs text-primary-500 mt-0.5 flex-shrink-0" />
                        <span>{c.verification}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quality Score Visualization */}
              <div className="mt-10 p-6 rounded-xl border border-background-200/70 bg-background-100">
                <h3 className="font-heading text-lg font-bold text-foreground-900 mb-4">Grille de Score Qualité</h3>
                <div className="space-y-3">
                  {methodology.standardsQualite.criteres.map((c) => (
                    <div key={c.id} className="flex items-center gap-4">
                      <span className="text-xs font-bold text-foreground-500 w-16">{c.id} — {c.ponderation}</span>
                      <div className="flex-1 h-2 rounded-full bg-background-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${c.ponderation === 'Critique' ? 'bg-primary-500' : 'bg-foreground-400'}`}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <span className="text-xs font-bold text-foreground-700">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ============================================================
              AUDIENCES
          ============================================================ */}
          {activeTab === 'audiences' && (
            <section>
              <SectionHeader
                overline="Ciblage"
                title="7 Audiences de la KBR"
                description="Chaque contenu est calibré pour un profil décideur spécifique, avec un ton, une structure et un format adaptés. Pas de contenu générique."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {methodology.audiences.map((a) => (
                  <div key={a.id} className="rounded-xl border border-background-200/70 bg-background-50 p-5 hover:border-primary-200/40 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100">
                        <i className="ri-user-star-line text-lg text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-foreground-900">{a.profil}</h3>
                        <span className="text-[11px] font-semibold text-foreground-400">{a.id}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-foreground-500">Besoins :</span>
                        <span className="text-foreground-700 ml-1">{a.besoins}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground-500">Ton :</span>
                        <span className="text-foreground-700 ml-1">{a.ton}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground-500">Format privilégié :</span>
                        <span className="text-foreground-700 ml-1">{a.format}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ============================================================
              KPIs
          ============================================================ */}
          {activeTab === 'kpi' && (
            <section>
              <SectionHeader
                overline="Pilotage"
                title="KPIs Éditoriaux KBR"
                description="Indicateurs de performance de la direction éditoriale. Suivi mensuel avec seuils d'alerte et cibles Big Four."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(kpis.kpis).map(([categorie, indicateurs]) => (
                  <div key={categorie} className="rounded-xl border border-background-200/70 bg-background-50 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100">
                        <i className={`text-base text-primary-600 ${
                          categorie === 'production' ? 'ri-settings-3-line' :
                          categorie === 'qualite' ? 'ri-shield-check-line' :
                          categorie === 'impact' ? 'ri-rocket-line' :
                          'ri-database-2-line'
                        }`} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-foreground-900 capitalize">{categorie}</h3>
                    </div>
                    <div className="space-y-3">
                      {indicateurs.map((ind) => (
                        <div key={ind.indicateur} className="flex items-center justify-between text-sm">
                          <div className="flex-1 min-w-0">
                            <span className="text-foreground-700">{ind.indicateur}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-foreground-900 whitespace-nowrap">{ind.cible}</span>
                            <span className="text-xs text-foreground-400 whitespace-nowrap">
                              Alerte : {String(ind.seuilAlerte)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ============================================================
              FCK
          ============================================================ */}
          {activeTab === 'fck' && (
            <section>
              <SectionHeader
                overline="Capitalisation"
                title="Fiches de Connaissance Khepra"
                description="Système de mémoire et d'auto-apprentissage. Chaque tâche complexe génère une FCK qui enrichit la base de connaissance KOS. Format standardisé, indexable, réutilisable."
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* FCK-001 Summary */}
                <div className="rounded-xl border border-primary-200/60 bg-primary-50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500 text-background-50 text-sm font-bold">001</span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground-900">{methodology.title}</h3>
                      <span className="text-xs text-foreground-500">v{methodology.version} · {methodology.dateCreation}</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex flex-wrap gap-1.5">
                      {methodology.metaKOS.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-foreground-100 text-foreground-600">{t}</span>
                      ))}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground-500">Domaines :</span>
                      <span className="text-foreground-700 ml-1">{methodology.domaines.join(' · ')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground-500">Agents KOS concernés :</span>
                      <span className="text-foreground-700 ml-1">{methodology.metaKOS.agentsConcernes.join(' · ')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground-500">Classification :</span>
                      <span className="text-foreground-700 ml-1">{methodology.classification}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground-500">Prochaine révision :</span>
                      <span className="text-foreground-700 ml-1">{methodology.metaKOS.prochaineRevision}</span>
                    </div>
                  </div>
                </div>

                {/* FCK Structure */}
                <div className="rounded-xl border border-background-200/70 bg-background-50 p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground-900 mb-4">Structure Standard d'une FCK</h3>
                  <div className="space-y-3">
                    {Object.entries(FCK_001_EDITORIAL_METHODOLOGY.standardsQualite.criteres.length > 0 ? {
                      'En-tête': ['fckId', 'title', 'version', 'dateCreation', 'classification', 'domaines'],
                      'Référentiels': ['standardsInternationaux', 'benchmarksInstitutionnels', 'realitesAfriqueFrancophone'],
                      'Corps': ['methodologie', 'donnees', 'analyses', 'recommandations'],
                      'Méta KOS': ['tags', 'agentsConcernes', 'blocKOS', 'dependances'],
                    } : {}).map(([section, champs]) => (
                      <div key={section}>
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground-400">{section}</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {champs.map((ch) => (
                            <code key={ch} className="px-2 py-0.5 rounded text-xs font-mono bg-foreground-100 text-foreground-700">{ch}</code>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FCK Index placeholder */}
              <div className="mt-10 p-6 rounded-xl border border-dashed border-background-300/60 bg-background-100 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-background-200 mb-4">
                  <i className="ri-archive-line text-2xl text-foreground-400" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2">Index FCK — À Venir</h3>
                <p className="text-sm text-foreground-500 max-w-lg mx-auto">
                  L'index complet des Fiches de Connaissance Khepra sera généré automatiquement à mesure que les FCK sont créées lors de chaque tâche éditoriale complexe. Les métadonnées seront indexées dans le KOS Knowledge Graph pour réutilisation cross-agents.
                </p>
              </div>
            </section>
          )}
        </div>

        {/* CTA */}
        <section className="py-16 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à appliquer le standard KBR ?
            </h2>
            <p className="text-body-md text-foreground-400 max-w-2xl mx-auto mb-8">
              Chaque publication Khepra Experts peut être transformée en Lead Magnet Premium avec cette méthodologie. Contactez la Direction de Rédaction Principale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/editorial-hub/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-primary-500 text-background-50">
                <i className="ri-grid-line" />
                Centre Éditorial
              </a>
              <a href="/contact/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 border border-accent-400/50 text-accent-400 bg-accent-500/10">
                <i className="ri-calendar-line" />
                Consultation Éditoriale
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



