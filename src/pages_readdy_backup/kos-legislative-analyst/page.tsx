import { useState } from 'react';
import { Link } from 'react-router-dom';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  RIA_METHODOLOGY,
  POSITION_PAPER_TEMPLATE,
  textesEnAnalyse,
  positionPapers,
  scenariosLegislatifs,
  clausesISO,
  KPIsLegislatifs,
} from '@/mocks/legislativeAnalyst';

type TabId = 'ria' | 'textes' | 'papers' | 'amendements' | 'scenarios' | 'kpi';

const impactScoreColor = (score: number): string => {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-red-600';
};

const statusBadge = (statut: string) => {
  if (statut === 'En analyse') return 'bg-amber-100 text-amber-700 border-amber-200';
  if (statut === 'Analyse RIA terminée') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (statut === 'Position Paper en cours') return 'bg-blue-100 text-blue-700 border-blue-200';
  return 'bg-background-100 text-foreground-600 border-background-200';
};

const classificationBadge = (c: string) => {
  if (c === 'CONFIDENTIEL') return 'bg-red-100 text-red-700 border-red-200';
  return 'bg-emerald-100 text-emerald-700 border-emerald-200';
};

export default function legislativeAnalystPage() {
  const [activeTab, setActiveTab] = useState<TabId>('ria');
  const [expandedRia, setExpandedRia] = useState<number | null>(0);
  const [expandedTexte, setExpandedTexte] = useState<string | null>(null);

  const tabs: { id: TabId; label: string; icon: string; sub: string }[] = [
    { id: 'ria', label: 'Grille RIA', icon: 'ri-scales-3-line', sub: '3 Étapes' },
    { id: 'textes', label: 'Textes en Analyse', icon: 'ri-file-text-line', sub: `${textesEnAnalyse.length} actifs` },
    { id: 'amendements', label: 'Amendements', icon: 'ri-edit-line', sub: `${KPIsLegislatifs.amendementsProposes} proposés` },
    { id: 'papers', label: 'Position Papers', icon: 'ri-draft-line', sub: `${positionPapers.length} finalisés` },
    { id: 'scenarios', label: 'Scénarios', icon: 'ri-compass-3-line', sub: '3 textes' },
    { id: 'kpi', label: 'KPIs', icon: 'ri-bar-chart-line', sub: `${KPIsLegislatifs.scoreSatisfaction}` },
  ];

  return (
    <hubLayout hubId={140}>
      <SeoHead
        title="KOS Legislative Analyst — Centre d'Analyse d'Impact Réglementaire, Amendements & Position Papers | KHEPRA EXPERTS"
        description="Centre d'analyse législative KHEPRA EXPERTS. Grille RIA 3 étapes, amendements au format Texte Actuel vs. Texte Proposé, Position Papers pour décideurs publics. 47 textes analysés, 128 amendements proposés. Standards ISO 31000, GAFI, Bâle III, OHADA."
        keywords="analyse impact réglementaire, RIA, amendements légaux, position papers, décideurs publics Afrique, UEMOA, CEMAC, OHADA, BCEAO, COBAC, régulation africaine"
        canonicalPath="/kos-legislative-analyst"
      />

      {/* Hero */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-18 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/30 via-foreground-950/70 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/30 border border-emerald-500/40 backdrop-blur-sm">
                  <i className="ri-government-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                    KOS Legislative Analyst™
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <i className="ri-scales-3-line text-amber-400 text-sm" />
                  <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                    Architecture des Textes
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Analyste Législatif & Conseil en Stratégie Réglementaire
                <span className="block text-emerald-400 mt-2 text-xl sm:text-2xl">Force de Proposition pour l'Afrique Francophone</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-2xl">
                De la veille passive à l'<strong className="text-white">architecture des textes de régulation</strong>.{' '}
                <strong className="text-white">{KPIsLegislatifs.textesAnalyses} textes</strong> analysés via grille RIA 3 étapes ·{' '}
                <strong className="text-white">{KPIsLegislatifs.amendementsProposes} amendements</strong> proposés ·{' '}
                <strong className="text-white">{KPIsLegislatifs.positionPapers} position papers</strong> finalisés.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-72 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Score Impact Global</span>
              <div className="text-4xl font-bold text-emerald-400 font-heading mt-3">{KPIsLegislatifs.scoreSatisfaction}</div>
              <span className="text-[9px] text-gray-400">Taux d'adoption des amendements : {KPIsLegislatifs.tauxAdoption}</span>
              <div className="mt-3 text-[10px] text-gray-400">
                <span className="text-emerald-400 font-bold">{KPIsLegislatifs.paysImpactes}</span> pays impactés · Délai moyen : {KPIsLegislatifs.delaiMoyenAnalyse}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'Textes Analysés', value: String(KPIsLegislatifs.textesAnalyses), icon: 'ri-file-text-line', color: '#86BC25' },
              { label: 'Amendements', value: String(KPIsLegislatifs.amendementsProposes), icon: 'ri-edit-line', color: '#0D7B5F' },
              { label: 'Position Papers', value: String(KPIsLegislatifs.positionPapers), icon: 'ri-draft-line', color: '#E8C547' },
              { label: 'Taux Adoption', value: KPIsLegislatifs.tauxAdoption, icon: 'ri-check-double-line', color: '#059669' },
              { label: 'Pays Impactés', value: String(KPIsLegislatifs.paysImpactes), icon: 'ri-map-pin-line', color: '#6366F1' },
              { label: 'Délai Analyse', value: KPIsLegislatifs.delaiMoyenAnalyse, icon: 'ri-time-line', color: '#EA580C' },
              { label: 'Citations', value: String(KPIsLegislatifs.citationsDansTextes), icon: 'ri-double-quotes-l', color: '#8B5CF6' },
              { label: 'ISO 31000', value: '92/100', icon: 'ri-award-line', color: '#DC2626' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-sm font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[9px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}>
                <i className={`${tab.icon} text-xs`} />{tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TAB 1 — Grille RIA */}
      {activeTab === 'ria' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                Grille d'Évaluation d'Impact Réglementaire (RIA)
              </h2>
              <p className="text-sm text-foreground-500 max-w-2xl mx-auto">
                {RIA_METHODOLOGY.standardApplicable}. Chaque texte analysé passe par les 3 étapes. Aucune exception.
              </p>
            </div>

            <div className="space-y-4">
              {RIA_METHODOLOGY.etapes.map((etape, i) => {
                const isExpanded = expandedRia === i;
                return (
                  <div key={i} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedRia(isExpanded ? null : i)}
                      className="w-full p-5 text-left flex items-center gap-4 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-100">
                        <i className={`${etape.icone} text-emerald-700 text-xl`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Étape {etape.etape}</span>
                          <span className="text-base font-bold text-foreground-950">{etape.titre}</span>
                        </div>
                        <p className="text-xs text-foreground-500">{etape.description}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`}></i>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4 space-y-4">
                        {etape.sousEtapes && etape.sousEtapes.map((se, j) => (
                          <div key={j} className="p-4 rounded-xl bg-background-50 border border-background-200/70">
                            <h4 className="text-sm font-bold text-foreground-950 mb-1">
                              <span className="text-emerald-700">{se.standard}</span>
                              <span className="text-xs text-foreground-400 ml-2 font-normal">— {se.applicable}</span>
                            </h4>
                            <ul className="space-y-1 mt-2">
                              {se.questions.map((q, k) => (
                                <li key={k} className="text-xs text-foreground-600 flex items-start gap-2">
                                  <i className="ri-question-line text-emerald-600 mt-0.5 flex-shrink-0"></i>
                                  {q}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {etape.dimensions && etape.dimensions.map((dim, j) => (
                          <div key={j} className="p-4 rounded-xl bg-background-50 border border-background-200/70">
                            <h4 className="text-sm font-bold text-foreground-950 mb-2">{dim.axe}</h4>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {dim.metriques.map((m, k) => (
                                <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{m}</span>
                              ))}
                            </div>
                            <ul className="space-y-1">
                              {dim.questions.map((q, k) => (
                                <li key={k} className="text-xs text-foreground-600 flex items-start gap-2">
                                  <i className="ri-question-line text-amber-600 mt-0.5 flex-shrink-0"></i>
                                  {q}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {etape.format && (
                          <div className="p-4 rounded-xl bg-background-50 border border-background-200/70">
                            <h4 className="text-sm font-bold text-foreground-950 mb-3">{etape.description}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                                <h5 className="text-[10px] font-bold text-emerald-800 uppercase mb-2">En-tête</h5>
                                <ul className="space-y-1">
                                  {etape.format.entete.map((e, k) => (
                                    <li key={k} className="text-[10px] text-emerald-700">{e}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                                <h5 className="text-[10px] font-bold text-amber-800 uppercase mb-2">Corps</h5>
                                <ul className="space-y-1">
                                  {etape.format.corps.map((e, k) => (
                                    <li key={k} className="text-[10px] text-amber-700">{e}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="p-3 rounded-lg bg-background-100 border border-background-200">
                                <h5 className="text-[10px] font-bold text-foreground-700 uppercase mb-2">Pied</h5>
                                <ul className="space-y-1">
                                  {etape.format.pied.map((e, k) => (
                                    <li key={k} className="text-[10px] text-foreground-600">{e}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ISO Clauses */}
            <div className="mt-8">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Clauses ISO & Standards Applicables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {clausesISO.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-background-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-foreground-950">{c.clause}</span>
                      <span className={`text-sm font-bold ${c.score >= 90 ? 'text-emerald-600' : c.score >= 80 ? 'text-amber-600' : 'text-red-600'}`}>{c.score}/100</span>
                    </div>
                    <p className="text-[10px] text-foreground-500 mb-2">{c.applicable}</p>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">{c.statut}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2 — Textes en Analyse */}
      {activeTab === 'textes' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">{textesEnAnalyse.length} Textes en Analyse</h2>
              <p className="text-sm text-foreground-500">Grille RIA appliquée à chaque texte. Cliquez pour voir les détails, scores et amendements.</p>
            </div>
            <div className="space-y-4">
              {textesEnAnalyse.map(texte => {
                const isExpanded = expandedTexte === texte.id;
                return (
                  <div key={texte.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedTexte(isExpanded ? null : texte.id)} className="w-full p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-background-100">
                        <span className="text-[9px] font-bold text-foreground-700">{texte.regulateur}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-foreground-500">{texte.reference}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${statusBadge(texte.statut)}`}>{texte.statut}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{texte.zone}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950 mb-1">{texte.titre}</h3>
                        <p className="text-xs text-foreground-500 line-clamp-2">{texte.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className={`text-lg font-bold ${impactScoreColor(texte.scoreRIA)}`}>{texte.scoreRIA}/100</div>
                        <div className="text-[9px] text-foreground-400">Score RIA</div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg ml-2`}></i>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4 space-y-4">
                        {/* Metadata */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Publication</span>
                            <span className="text-xs font-bold text-foreground-700">{texte.datePublication}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Entrée en vigueur</span>
                            <span className="text-xs font-bold text-foreground-700">{texte.dateEntreeVigueur}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Régulateur</span>
                            <span className="text-xs font-bold text-foreground-700">{texte.regulateur}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Étape RIA</span>
                            <span className="text-xs font-bold" style={{ color: texte.etapeActuelle === 3 ? '#059669' : '#EA580C' }}>Étape {texte.etapeActuelle}/3</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Amendements</span>
                            <span className="text-xs font-bold text-emerald-700">{texte.amendements.length}</span>
                          </div>
                        </div>

                        {/* Articles clés */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-700 uppercase mb-2">Articles Clés</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {texte.articlesCles.map((art, j) => (
                              <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200">{art}</span>
                            ))}
                          </div>
                        </div>

                        {/* Amendements */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground-700 uppercase mb-3">
                            <i className="ri-edit-line text-emerald-600 mr-1"></i>
                            Amendements Proposés — Format Texte Actuel vs. Texte Proposé
                          </h4>
                          <div className="space-y-3">
                            {texte.amendements.map(am => (
                              <div key={am.ref} className="p-4 rounded-xl bg-background-50 border border-background-200/70">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">{am.ref}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">{am.article}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-200 text-foreground-600">{am.type}</span>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                                    <span className="text-[9px] font-bold text-red-700 uppercase block mb-1">Texte Actuel</span>
                                    <p className="text-[10px] text-red-800 leading-relaxed">{am.texteActuel}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                                    <span className="text-[9px] font-bold text-emerald-700 uppercase block mb-1">Texte Proposé</span>
                                    <p className="text-[10px] text-emerald-800 leading-relaxed">{am.textePropose}</p>
                                  </div>
                                </div>
                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 mb-2">
                                  <span className="text-[9px] font-bold text-amber-700 uppercase block mb-1">Justification Économique & Sociale</span>
                                  <p className="text-[10px] text-amber-800 leading-relaxed">{am.justification}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                                  <span className="text-[9px] font-bold text-blue-700 uppercase block mb-1">Impact Projeté</span>
                                  <p className="text-[10px] text-blue-800 leading-relaxed">{am.impactProjete}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3 — Amendements */}
      {activeTab === 'amendements' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">{KPIsLegislatifs.amendementsProposes} Amendements Proposés</h2>
              <p className="text-sm text-foreground-500">Format standardisé : Texte Actuel vs. Texte Proposé avec justification économique. Prêts à soumettre.</p>
            </div>
            <div className="space-y-5">
              {textesEnAnalyse.flatMap(texte =>
                texte.amendements.map(am => ({ ...am, texteRef: texte.reference, texteTitre: texte.titre, regulateur: texte.regulateur }))
              ).map(am => (
                <div key={am.ref} className="rounded-2xl bg-white border border-background-200 p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">{am.ref}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{am.regulateur}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">{am.article}</span>
                    <span className="text-[10px] text-foreground-400">{am.texteRef}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-3">{am.texteTitre}</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <span className="text-[9px] font-bold text-red-700 uppercase block mb-1">Texte Actuel</span>
                      <p className="text-[10px] text-red-800 leading-relaxed">{am.texteActuel}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="text-[9px] font-bold text-emerald-700 uppercase block mb-1">Texte Proposé</span>
                      <p className="text-[10px] text-emerald-800 leading-relaxed">{am.textePropose}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-foreground-500 leading-relaxed">
                    <strong className="text-amber-700">Justification :</strong> {am.justification}
                  </p>
                  <p className="text-[10px] text-emerald-700 mt-1">
                    <strong>Impact :</strong> {am.impactProjete}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 4 — Position Papers */}
      {activeTab === 'papers' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Position Papers — Prêts pour Décideurs Publics</h2>
              <p className="text-sm text-foreground-500 max-w-2xl mx-auto">
                {POSITION_PAPER_TEMPLATE.description}. Ton direct, pragmatique, axé compétitivité économique et attractivité des investissements.
              </p>
            </div>

            {/* Architecture du Position Paper */}
            <div className="rounded-2xl bg-white border border-background-200 p-5 mb-8">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Architecture Standard — 9 Sections</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {POSITION_PAPER_TEMPLATE.sections.map((sec, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background-50 border border-background-200/70">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">{sec.numero}</span>
                    <h4 className="text-xs font-bold text-foreground-950 mt-1.5 mb-1">{sec.titre}</h4>
                    <p className="text-[9px] text-foreground-500">{sec.contenu}</p>
                  </div>
                ))}
              </div>
              {/* Ton */}
              <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <span className="text-[9px] font-bold text-amber-700 uppercase block mb-2">Directives de Ton — 5 Principes</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {Object.entries(POSITION_PAPER_TEMPLATE.ton).map(([k, v]) => (
                    <div key={k} className="text-center">
                      <span className="text-[10px] font-bold text-amber-800 capitalize">{k}</span>
                      <p className="text-[9px] text-amber-700 leading-relaxed mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Position Papers List */}
            <div className="space-y-4">
              {positionPapers.map(pp => (
                <div key={pp.id} className="rounded-2xl bg-white border border-background-200 p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">{pp.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${classificationBadge(pp.classification)}`}>{pp.classification}</span>
                        <span className="text-[10px] text-foreground-400">{pp.datePublication}</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{pp.titre}</h3>
                      <p className="text-[10px] text-foreground-500 mb-1">
                        <i className="ri-user-line mr-1"></i>Destinataire : {pp.destinataire}
                      </p>
                      <p className="text-xs text-foreground-600 leading-relaxed">{pp.resume}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-lg font-bold ${impactScoreColor(pp.scoreImpact)}`}>{pp.scoreImpact}/100</div>
                      <div className="text-[9px] text-foreground-400">Score Impact</div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1 inline-block">{pp.statut}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5 — Scénarios Prospectifs */}
      {activeTab === 'scenarios' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Scénarios Prospectifs 5 Ans</h2>
              <p className="text-sm text-foreground-500">3 scénarios par texte : adoption complète, adoption partielle, rejet. Projections chiffrées.</p>
            </div>
            <div className="space-y-6">
              {scenariosLegislatifs.map(sc => (
                <div key={sc.id} className="rounded-2xl bg-white border border-background-200 p-5">
                  <h3 className="text-sm font-bold text-foreground-950 mb-4">{sc.titre}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sc.scenarios.map((s, j) => (
                      <div key={j} className={`p-4 rounded-xl border ${
                        j === 0 ? 'bg-emerald-50 border-emerald-200' : j === 1 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`text-xs font-bold ${j === 0 ? 'text-emerald-800' : j === 1 ? 'text-amber-800' : 'text-red-800'}`}>{s.nom}</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full ${j === 0 ? 'bg-emerald-200 text-emerald-800' : j === 1 ? 'bg-amber-200 text-amber-800' : 'bg-red-200 text-red-800'}`}>{s.description.split('.')[0]}</span>
                        </div>
                        <p className={`text-[10px] leading-relaxed ${j === 0 ? 'text-emerald-700' : j === 1 ? 'text-amber-700' : 'text-red-700'}`}>{s.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 6 — KPIs */}
      {activeTab === 'kpi' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Indicateurs de Performance Législative</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Textes Analysés', value: KPIsLegislatifs.textesAnalyses, target: '≥ 50', icon: 'ri-file-text-line', color: '#0D7B5F' },
                { label: 'Amendements Proposés', value: KPIsLegislatifs.amendementsProposes, target: '≥ 150', icon: 'ri-edit-line', color: '#059669' },
                { label: 'Position Papers', value: KPIsLegislatifs.positionPapers, target: '≥ 15', icon: 'ri-draft-line', color: '#86BC25' },
                { label: "Taux d'Adoption", value: KPIsLegislatifs.tauxAdoption, target: '≥ 75%', icon: 'ri-check-double-line', color: '#6366F1' },
                { label: 'Pays Impactés', value: KPIsLegislatifs.paysImpactes, target: '17', icon: 'ri-map-pin-line', color: '#EA580C' },
                { label: "Délai d'Analyse", value: KPIsLegislatifs.delaiMoyenAnalyse, target: '≤ 48h', icon: 'ri-time-line', color: '#E8C547' },
                { label: 'Citations dans Textes', value: KPIsLegislatifs.citationsDansTextes, target: '≥ 30', icon: 'ri-double-quotes-l', color: '#8B5CF6' },
                { label: 'Score Satisfaction', value: KPIsLegislatifs.scoreSatisfaction, target: '≥ 95', icon: 'ri-trophy-line', color: '#DC2626' },
              ].map((kpi, i) => (
                <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <i className={`${kpi.icon} text-lg`} style={{ color: kpi.color }}></i>
                  <div className="text-2xl font-bold font-heading text-foreground-950 mt-1">{String(kpi.value)}</div>
                  <div className="text-xs text-foreground-500">{kpi.label}</div>
                  <div className="text-[10px] text-foreground-400 mt-0.5">Cible : {kpi.target}</div>
                </div>
              ))}
            </div>

            {/* Architecture Position Paper reminder */}
            <div className="rounded-2xl bg-white border border-background-200 p-5">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Cycle de Production Législative</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { step: '1. Veille', desc: 'Détection J0 du texte', icon: 'ri-radar-line', color: '#0D7B5F' },
                  { step: '2. Grille RIA', desc: 'Évaluation 3 étapes', icon: 'ri-scales-3-line', color: '#059669' },
                  { step: '3. Amendements', desc: 'Rédaction TA vs TP', icon: 'ri-edit-line', color: '#EA580C' },
                  { step: '4. Validation', desc: 'Revue ISO + Big Four', icon: 'ri-shield-check-line', color: '#6366F1' },
                  { step: '5. Position Paper', desc: 'Format décideur public', icon: 'ri-draft-line', color: '#8B5CF6' },
                  { step: '6. Soumission', desc: 'Transmission régulateur', icon: 'ri-send-plane-line', color: '#E8C547' },
                  { step: '7. Suivi', desc: 'Traçabilité adoption', icon: 'ri-line-chart-line', color: '#86BC25' },
                  { step: '8. Capitalisation', desc: 'FCK + Meta KOS', icon: 'ri-archive-line', color: '#DC2626' },
                ].map((st, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-background-50 border border-background-200">
                    <i className={`${st.icon} text-xl`} style={{ color: st.color }}></i>
                    <div className="text-xs font-bold text-foreground-950 mt-1">{st.step}</div>
                    <div className="text-[9px] text-foreground-500">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cross-Links */}
      <section className="py-10 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-heading text-xl font-bold text-foreground-950 mb-6">Écosystème Réglementaire KOS</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Observatoire Réglementaire Africain', path: '/observatoire-reglementaire-africain', icon: 'ri-global-line', color: '#0D7B5F' },
              { label: 'Regulatory Observatory Africa', path: '/kos-regulatory-observatory-africa', icon: 'ri-radar-line', color: '#6366F1' },
              { label: 'BCEAO UEMOA', path: '/kos-observatoire-bceao', icon: 'ri-bank-line', color: '#059669' },
              { label: 'COBAC CEMAC', path: '/kos-observatoire-cobac', icon: 'ri-scales-3-line', color: '#EA580C' },
              { label: 'Regulatory Compliance Engine', path: '/kos-regulatory-compliance-engine', icon: 'ri-tools-line', color: '#86BC25' },
              { label: 'Regulatory Brain', path: '/kos-regulatory-brain', icon: 'ri-brain-line', color: '#8B5CF6' },
              { label: 'KBR Dashboard', path: '/kbr-dashboard', icon: 'ri-book-open-line', color: '#DC2626' },
              { label: 'Compliance Factory', path: '/kos-compliance-factory-engine', icon: 'ri-building-4-line', color: '#E8C547' },
            ].map(link => (
              <Link key={link.path} to={link.path} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-background-200 bg-background-50 text-xs font-bold text-foreground-700 hover:border-foreground-300 transition-colors cursor-pointer whitespace-nowrap">
                <i className={`${link.icon} text-xs`} style={{ color: link.color }} />{link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



