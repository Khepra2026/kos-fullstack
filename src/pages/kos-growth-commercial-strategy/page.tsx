import { useState } from 'react';
import { Link } from 'react-router-dom';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  LEAD_MAGNET_METHODOLOGY,
  leadMagnetsCatalog,
  NURTURING_METHODOLOGY,
  nurturingStoryboard,
  OFFRE_ARCHITECTURE,
  closingScripts,
  GROWTH_DATA_CAPITALIZATION,
  growthDataSynthese,
  KPI_COMMERCIAUX,
  BU_PERFORMANCE,
} from '@/mocks/kosGrowthCommercialStrategy';

type TabId = 'magnets' | 'nurturing' | 'offres' | 'closing' | 'kpi' | 'growthdata';

function formatFCFA(value: number): string {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} Md FCFA`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)} M FCFA`;
  return `${(value / 1000).toFixed(0)}K FCFA`;
}

function formatNumber(value: number): string {
  return value.toLocaleString('fr-FR');
}

const priorityBadge = (p: string) => {
  if (p === 'P0') return 'bg-red-100 text-red-700 border-red-200';
  if (p === 'P1') return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-background-100 text-foreground-600 border-background-200';
};

export default function KOSGrowthCommercialStrategyPage() {
  const [activeTab, setActiveTab] = useState<TabId>('magnets');
  const [expandedMagnet, setExpandedMagnet] = useState<string | null>(null);
  const [expandedSeq, setExpandedSeq] = useState<string | null>(null);
  const [expandedScript, setExpandedScript] = useState<string | null>(null);
  const [expandedGD, setExpandedGD] = useState<string | null>(null);

  const tabs: { id: TabId; label: string; icon: string; sub: string }[] = [
    { id: 'magnets', label: 'Lead Magnets', icon: 'ri-download-2-line', sub: `${leadMagnetsCatalog.length} actifs` },
    { id: 'nurturing', label: 'Nurturing', icon: 'ri-user-heart-line', sub: '3 séquences' },
    { id: 'offres', label: 'Architecture Offres', icon: 'ri-stack-line', sub: '3 niveaux' },
    { id: 'closing', label: 'Scripts Closing', icon: 'ri-chat-check-line', sub: `${closingScripts.length} scripts` },
    { id: 'kpi', label: 'KPIs', icon: 'ri-bar-chart-line', sub: '16 indicateurs' },
    { id: 'growthdata', label: 'GROWTH-DATA', icon: 'ri-database-2-line', sub: `${GROWTH_DATA_CAPITALIZATION.entreesCapitalisation.length} entrées` },
  ];

  const totalPipeline = BU_PERFORMANCE.reduce((sum, bu) => sum + bu.pipeline, 0);
  const totalSigne = BU_PERFORMANCE.reduce((sum, bu) => sum + bu.signe, 0);

  return (
    <KOSHubLayout hubId={141}>
      <SeoHead
        title="KOS Growth & Commercial Strategy — Lead Magnets, Nurturing, Value-Based Selling & Closing Premium | KHEPRA EXPERTS"
        description="Direction de la Stratégie Commerciale KHEPRA EXPERTS. Ingénierie Lead Magnets Big Four, séquences Nurturing High Touch Afrique, architecture offres 3 niveaux (Gold/Premium/Enterprise), scripts closing premium. Pipeline actif 847M FCFA."
        keywords="growth strategy, lead magnet, nurturing, value-based selling, closing premium, offre 3 niveaux, stratégie commerciale, Afrique francophone, Big Four, Khepra Experts"
        canonicalPath="/kos-growth-commercial-strategy"
      />

      {/* Hero */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-18 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/30 via-foreground-950/70 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-600/30 border border-accent-500/40 backdrop-blur-sm">
                  <i className="ri-funds-line text-accent-400 text-sm" />
                  <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">
                    KOS Growth & Commercial Strategy™
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <i className="ri-vip-diamond-line text-amber-400 text-sm" />
                  <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                    Value-Based Selling
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Directeur de la Stratégie Commerciale & Growth Premium
                <span className="block text-accent-400 mt-2 text-xl sm:text-2xl">Ingénierie d'Affaires · Afrique Francophone</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-2xl">
                Transformer l'audience KBR en <strong className="text-white">clients corporate réguliers</strong>.{' '}
                <strong className="text-white">{leadMagnetsCatalog.length} Lead Magnets</strong> Big Four ·{' '}
                <strong className="text-white">{NURTURING_METHODOLOGY.sequences.length} séquences</strong> Nurturing High Touch ·{' '}
                <strong className="text-white">3 niveaux d'offres</strong> (Gold/Premium/Enterprise) ·{' '}
                <strong className="text-white">{GROWTH_DATA_CAPITALIZATION.entreesCapitalisation.length} entrées GROWTH-DATA</strong> capitalisées.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-72 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Pipeline Actif</span>
              <div className="text-4xl font-bold text-accent-400 font-heading mt-3">{formatFCFA(totalPipeline)}</div>
              <span className="text-[9px] text-gray-400">Signé ce mois : {formatFCFA(totalSigne)}</span>
              <div className="mt-3 text-[10px] text-gray-400">
                <span className="text-accent-400 font-bold">{KPI_COMMERCIAUX.conversion[3].valeur} jours</span> temps closing moyen · Panier moyen {formatFCFA(31500000)}
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
              { label: 'Lead Magnets', value: String(leadMagnetsCatalog.length), icon: 'ri-download-2-line', color: '#0D7B5F' },
              { label: 'Leads/Mois', value: KPI_COMMERCIAUX.production[1].valeur, icon: 'ri-user-add-line', color: '#059669' },
              { label: 'Taux Conversion', value: KPI_COMMERCIAUX.production[2].valeur + '%', icon: 'ri-percent-line', color: '#86BC25' },
              { label: 'Pipeline', value: formatFCFA(totalPipeline), icon: 'ri-funds-line', color: '#E8C547' },
              { label: 'Signé/Mois', value: formatFCFA(totalSigne), icon: 'ri-bank-line', color: '#6366F1' },
              { label: 'Panier Moyen', value: '31.5M', icon: 'ri-shopping-bag-line', color: '#EA580C' },
              { label: 'ROI Client', value: '7.8x', icon: 'ri-line-chart-line', color: '#DC2626' },
              { label: 'NPS', value: '72', icon: 'ri-emotion-happy-line', color: '#8B5CF6' },
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

      {/* TAB 1 — Lead Magnets */}
      {activeTab === 'magnets' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Methodology */}
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                Ingénierie du Lead Magnet — Standards Big Four
              </h2>
              <p className="text-sm text-foreground-500 max-w-2xl mx-auto">
                {LEAD_MAGNET_METHODOLOGY.principe}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {LEAD_MAGNET_METHODOLOGY.etapes.map((etape, i) => (
                <div key={i} className="rounded-2xl bg-white border border-background-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent-100">
                      <i className={`${etape.icone} text-accent-700 text-lg`}></i>
                    </div>
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">Étape {etape.etape}</span>
                      <h3 className="text-sm font-bold text-foreground-950 mt-1">{etape.titre}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-500 mb-3">{etape.description}</p>

                  {etape.regles && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {etape.regles.map((r, j) => (
                        <div key={j} className="flex items-start gap-2 p-2 rounded-lg bg-accent-50 border border-accent-200/50">
                          <i className="ri-check-line text-accent-600 mt-0.5 flex-shrink-0"></i>
                          <span className="text-[10px] text-foreground-700">{r}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {etape.champsObligatoires && (
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-foreground-700 mb-2">Champs Obligatoires de Qualification</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {etape.champsObligatoires.map((c, j) => (
                          <div key={j} className="p-3 rounded-lg bg-background-50 border border-background-200/70">
                            <span className="text-[10px] font-bold text-foreground-700">{c.label}</span>
                            <span className="text-[9px] text-foreground-400 block mt-0.5">{c.justification}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {etape.antiPatterns && (
                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
                      <span className="text-[10px] font-bold text-red-700 block mb-1">Anti-Patterns</span>
                      {etape.antiPatterns.map((ap, j) => (
                        <div key={j} className="text-[10px] text-red-800 flex items-start gap-1.5">
                          <i className="ri-close-line text-red-600 mt-0.5"></i>
                          {ap}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Catalog */}
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Catalogue des {leadMagnetsCatalog.length} Lead Magnets</h3>
            <div className="space-y-4">
              {leadMagnetsCatalog.map(lm => {
                const isExpanded = expandedMagnet === lm.id;
                return (
                  <div key={lm.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedMagnet(isExpanded ? null : lm.id)} className="w-full p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${lm.couleur}18`, border: `1px solid ${lm.couleur}30` }}>
                        <i className={`${lm.icone} text-lg`} style={{ color: lm.couleur }}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${priorityBadge(lm.priorite)}`}>{lm.priorite}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 capitalize">{lm.format === 'self-assessment' ? 'Auto-Évaluation' : lm.format === 'checklist' ? 'Checklist' : 'Simulateur'}</span>
                          <span className="text-[10px] py-0.5 rounded-full bg-background-100 text-foreground-500 font-bold">{lm.tempsCompletion}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950 mb-1">{lm.titre}</h3>
                        <p className="text-xs text-foreground-500 line-clamp-1">Associé à : {lm.articleKBR}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-lg font-bold text-accent-600">{lm.tauxConversionEstime}%</div>
                        <div className="text-[9px] text-foreground-400">Taux conv.</div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg ml-2`}></i>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Impact Pipeline Estimé</span>
                            <span className="text-xs font-bold text-foreground-700">{formatFCFA(lm.impactPipelineEstime)}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Score Personnalisé</span>
                            <span className="text-xs font-bold text-emerald-700">{lm.scorePersonnalise ? 'OUI' : 'NON'}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Temps Completion</span>
                            <span className="text-xs font-bold text-foreground-700">{lm.tempsCompletion}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-background-50 text-center">
                            <span className="text-[9px] text-foreground-400 block">Statut</span>
                            <span className="text-xs font-bold text-emerald-700">{lm.statut === 'actif' ? 'Actif' : lm.statut}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-foreground-500 uppercase block mb-1">Segments Cibles</span>
                          <div className="flex flex-wrap gap-1">
                            {lm.segmentCible.map((s, j) => (
                              <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-accent-50 border border-accent-200">
                          <span className="text-[9px] font-bold text-accent-700 uppercase block mb-1">Livrable</span>
                          <p className="text-[10px] text-accent-800">{lm.livrable}</p>
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

      {/* TAB 2 — Nurturing */}
      {activeTab === 'nurturing' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                Stratégie de Nurturing High Touch — Afrique Francophone
              </h2>
              <p className="text-sm text-foreground-500 max-w-2xl mx-auto">{NURTURING_METHODOLOGY.principe}</p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              {NURTURING_METHODOLOGY.piliers.map((pil, i) => (
                <div key={i} className="rounded-2xl bg-white border border-background-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent-100">
                      <i className={`${pil.icone} text-accent-700 text-lg`}></i>
                    </div>
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">Pilier {pil.pilier}</span>
                      <h3 className="text-sm font-bold text-foreground-950 mt-1">{pil.titre}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-500 mb-3">{pil.description}</p>
                  <p className="text-[10px] italic text-foreground-600 mb-3 border-l-2 border-accent-300 pl-3">{pil.technique}</p>
                  {pil.exempleMessage && (
                    <div className="p-3 rounded-lg bg-background-50 border border-background-200/70">
                      <span className="text-[9px] font-bold text-foreground-500 uppercase block mb-1">Exemple</span>
                      <p className="text-[10px] text-foreground-700 italic">« {pil.exempleMessage} »</p>
                    </div>
                  )}
                  {pil.casReference && (
                    <div className="space-y-2 mt-3">
                      {pil.casReference.map((cas, j) => (
                        <div key={j} className="p-2 rounded-lg bg-accent-50 border border-accent-200/50">
                          <span className="text-[10px] font-bold text-foreground-700">{cas.entreprise}</span>
                          <p className="text-[9px] text-foreground-600 mt-0.5">{cas.resultat}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {pil.exemplesChiffres && (
                    <div className="space-y-1.5 mt-3">
                      {pil.exemplesChiffres.map((ex, j) => (
                        <div key={j} className="text-[10px] text-foreground-600 flex items-start gap-1.5">
                          <i className="ri-error-warning-line text-red-500 mt-0.5 flex-shrink-0"></i>
                          {ex}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sequences */}
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">3 Séquences de Nurturing</h3>
            <div className="space-y-4">
              {NURTURING_METHODOLOGY.sequences.map(seq => {
                const isExpanded = expandedSeq === seq.id;
                return (
                  <div key={seq.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedSeq(isExpanded ? null : seq.id)} className="w-full p-5 text-left flex items-center gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent-100">
                        <i className={`${seq.id === 'SEQ-001' ? 'ri-fire-line' : seq.id === 'SEQ-002' ? 'ri-building-2-line' : 'ri-restart-line'} text-accent-700`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">{seq.id}</span>
                          <h3 className="text-sm font-bold text-foreground-950">{seq.nom}</h3>
                        </div>
                        <p className="text-xs text-foreground-500">{seq.declencheur}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-xs font-bold text-foreground-700">{seq.dureeJours} jours</div>
                        <div className="text-[9px] text-foreground-400">{seq.kpiCible}</div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 ml-2`}></i>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4">
                        <div className="space-y-3">
                          {seq.etapes.map((et, j) => (
                            <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-background-50 border border-background-200/70">
                              <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-accent-700">J+{et.jour}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-[10px] font-bold text-foreground-700">{et.action}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[9px] text-foreground-500">
                                  <span><i className="ri-mail-line mr-0.5"></i>{et.canal}</span>
                                  <span className="italic">{et.ton}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Storyboard */}
            <div className="mt-8">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Storyboard Nurturing — Parcours Type (Lead Magnet → Call)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-background-200 text-left">
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">J+</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Étape</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Canal</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Action</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Taux Ouv.</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Taux Click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nurturingStoryboard.map((sb, i) => (
                      <tr key={i} className="border-b border-background-100 hover:bg-background-50">
                        <td className="py-2 px-3 font-bold text-foreground-700">J+{sb.jour}</td>
                        <td className="py-2 px-3 text-foreground-700">{sb.etape}</td>
                        <td className="py-2 px-3">
                          <span className="px-1.5 py-0.5 rounded bg-accent-50 text-accent-700 text-[9px]">{sb.canal}</span>
                        </td>
                        <td className="py-2 px-3 text-foreground-600 leading-relaxed max-w-xs">{sb.action}</td>
                        <td className="py-2 px-3 font-bold text-foreground-700">{sb.tauxOuverture}</td>
                        <td className="py-2 px-3 font-bold text-accent-700">{sb.tauxClick}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3 — Architecture Offres */}
      {activeTab === 'offres' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Architecture des Offres — 3 Niveaux</h2>
              <p className="text-sm text-foreground-500 max-w-2xl mx-auto">{OFFRE_ARCHITECTURE.principe}</p>
            </div>

            {/* 3 Niveaux */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
              {/* Gold */}
              <div className="rounded-2xl bg-white border border-background-200 p-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-bold">GOLD</span>
                </div>
                <div className="mt-3 text-center">
                  <h3 className="font-heading text-xl font-bold text-foreground-950">{OFFRE_ARCHITECTURE.niveaux.gold.nom}</h3>
                  <p className="text-[10px] text-foreground-400 mt-1">{OFFRE_ARCHITECTURE.niveaux.gold.tagline}</p>
                  <div className="text-2xl font-bold text-foreground-950 mt-4 font-heading">{OFFRE_ARCHITECTURE.niveaux.gold.prix}</div>
                  <p className="text-xs text-foreground-500 mt-1">{OFFRE_ARCHITECTURE.niveaux.gold.dureeTypique}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 mt-2 inline-block">Conv. {OFFRE_ARCHITECTURE.niveaux.gold.tauxConversionCible}</span>
                </div>
                <div className="mt-5 space-y-2">
                  {OFFRE_ARCHITECTURE.niveaux.gold.inclusions.map((inc, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-foreground-600">
                      <i className="ri-check-line text-emerald-600 mt-0.5 flex-shrink-0"></i>
                      {inc}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-background-100">
                  <span className="text-[9px] text-foreground-400">{OFFRE_ARCHITECTURE.niveaux.gold.cible}</span>
                </div>
              </div>

              {/* Premium (accentué) */}
              <div className="rounded-2xl bg-foreground-950 text-white p-6 relative ring-2 ring-accent-500 scale-105">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] px-3 py-1 rounded-full bg-accent-500 text-white font-bold">PREMIUM ★</span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-300 border border-accent-400/30">Recommandé</span>
                </div>
                <div className="mt-3 text-center">
                  <h3 className="font-heading text-xl font-bold text-white">{OFFRE_ARCHITECTURE.niveaux.premium.nom}</h3>
                  <p className="text-[10px] text-gray-400 mt-1">{OFFRE_ARCHITECTURE.niveaux.premium.tagline}</p>
                  <div className="text-2xl font-bold text-accent-400 mt-4 font-heading">{OFFRE_ARCHITECTURE.niveaux.premium.prix}</div>
                  <p className="text-xs text-gray-400 mt-1">{OFFRE_ARCHITECTURE.niveaux.premium.dureeTypique}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-300 mt-2 inline-block">Conv. {OFFRE_ARCHITECTURE.niveaux.premium.tauxConversionCible}</span>
                </div>
                <div className="mt-5 space-y-2">
                  {OFFRE_ARCHITECTURE.niveaux.premium.inclusions.map((inc, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-gray-300">
                      <i className="ri-check-double-line text-accent-400 mt-0.5 flex-shrink-0"></i>
                      {inc}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-[9px] text-gray-400">{OFFRE_ARCHITECTURE.niveaux.premium.cible}</span>
                </div>
              </div>

              {/* Enterprise */}
              <div className="rounded-2xl bg-white border border-background-200 p-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] px-3 py-1 rounded-full bg-foreground-950 text-white border border-foreground-700 font-bold">ENTERPRISE</span>
                </div>
                <div className="mt-3 text-center">
                  <h3 className="font-heading text-xl font-bold text-foreground-950">{OFFRE_ARCHITECTURE.niveaux.enterprise.nom}</h3>
                  <p className="text-[10px] text-foreground-400 mt-1">{OFFRE_ARCHITECTURE.niveaux.enterprise.tagline}</p>
                  <div className="text-2xl font-bold text-foreground-950 mt-4 font-heading">{OFFRE_ARCHITECTURE.niveaux.enterprise.prix}</div>
                  <p className="text-xs text-foreground-500 mt-1">{OFFRE_ARCHITECTURE.niveaux.enterprise.dureeTypique}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground-100 text-foreground-700 mt-2 inline-block">Conv. {OFFRE_ARCHITECTURE.niveaux.enterprise.tauxConversionCible}</span>
                </div>
                <div className="mt-5 space-y-2">
                  {OFFRE_ARCHITECTURE.niveaux.enterprise.inclusions.map((inc, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-foreground-600">
                      <i className="ri-vip-diamond-line text-foreground-700 mt-0.5 flex-shrink-0"></i>
                      {inc}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-background-100">
                  <span className="text-[9px] text-foreground-400">{OFFRE_ARCHITECTURE.niveaux.enterprise.cible}</span>
                </div>
              </div>
            </div>

            {/* Value-Based Pricing */}
            <div className="rounded-2xl bg-white border border-background-200 p-5 mb-8">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">{OFFRE_ARCHITECTURE.tarificationValeur.titre}</h3>
              <p className="text-xs text-foreground-500 mb-4">{OFFRE_ARCHITECTURE.tarificationValeur.description}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-background-200 text-left">
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Scénario</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Valeur Créée/Risque Évité</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Prix Khepra</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">ROI</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-foreground-500 uppercase">Justification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OFFRE_ARCHITECTURE.tarificationValeur.exemples.map((ex, i) => (
                      <tr key={i} className="border-b border-background-100 hover:bg-background-50">
                        <td className="py-2 px-3 font-bold text-foreground-700">{ex.scenario}</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold">{ex.valeur}</td>
                        <td className="py-2 px-3 text-foreground-700">{ex.prixKhepra}</td>
                        <td className="py-2 px-3 text-accent-700 font-bold">{ex.ratio}</td>
                        <td className="py-2 px-3 text-foreground-600 leading-relaxed max-w-xs">{ex.justification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Objections */}
            <div className="rounded-2xl bg-white border border-background-200 p-5">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">{OFFRE_ARCHITECTURE.traitementObjections.titre}</h3>
              <div className="space-y-4">
                {OFFRE_ARCHITECTURE.traitementObjections.objections.map((obj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-chat-voice-line text-red-600"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-red-800 mb-2">{obj.objection}</h4>
                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 mb-2">
                          <span className="text-[9px] font-bold text-emerald-700 uppercase block mb-1">Réponse</span>
                          <p className="text-[10px] text-emerald-800 leading-relaxed">{obj.reponse}</p>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">Technique : {obj.technique}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4 — Scripts Closing */}
      {activeTab === 'closing' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Scripts de Closing Premium</h2>
              <p className="text-sm text-foreground-500">Scripts standardisés Big Four — adaptés au cycle de décision Afrique francophone.</p>
            </div>
            <div className="space-y-5">
              {closingScripts.map(cs => {
                const isExpanded = expandedScript === cs.id;
                return (
                  <div key={cs.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedScript(isExpanded ? null : cs.id)} className="w-full p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent-100">
                        <i className={`${cs.id === 'CS-001' ? 'ri-phone-line' : cs.id === 'CS-002' ? 'ri-presentation-line' : 'ri-scales-3-line'} text-accent-700`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">{cs.id}</span>
                          <h3 className="text-sm font-bold text-foreground-950">{cs.scenario}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-500">
                          <span>{cs.dureeCible}</span>
                          <span>Conv. cible : {cs.indicateurs.tauxConversionCible}</span>
                          <span>Closing moyen : {cs.indicateurs.tempsClosingMoyen}</span>
                          <span>Panier : {cs.indicateurs.panierMoyen}</span>
                        </div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg ml-2`}></i>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4 space-y-3">
                        {cs.structure.map((et, j) => (
                          <div key={j} className="p-3 rounded-lg bg-background-50 border border-background-200/70">
                            <span className="text-[10px] font-bold text-foreground-700">{et.etape}</span>
                            <p className="text-xs text-foreground-600 leading-relaxed mt-1">« {et.contenu} »</p>
                          </div>
                        ))}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-background-100">
                          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                            <span className="text-[9px] font-bold text-emerald-700 uppercase block mb-1">Déclencheurs d'Achat</span>
                            {cs.declencheurAchat.map((d, j) => (
                              <div key={j} className="text-[10px] text-emerald-800 flex items-start gap-1.5">
                                <i className="ri-check-line mt-0.5 flex-shrink-0"></i>{d}
                              </div>
                            ))}
                          </div>
                          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                            <span className="text-[9px] font-bold text-red-700 uppercase block mb-1">Barrières de Closing</span>
                            {cs.barrieresClosing.map((b, j) => (
                              <div key={j} className="text-[10px] text-red-800 flex items-start gap-1.5">
                                <i className="ri-close-line mt-0.5 flex-shrink-0"></i>{b}
                              </div>
                            ))}
                          </div>
                          {cs.techniquesNegociation && (
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                              <span className="text-[9px] font-bold text-amber-700 uppercase block mb-1">Techniques de Négociation</span>
                              {cs.techniquesNegociation.map((t, j) => (
                                <div key={j} className="text-[10px] text-amber-800 leading-relaxed mb-1 flex items-start gap-1.5">
                                  <i className="ri-lightbulb-line mt-0.5 flex-shrink-0"></i>{t}
                                </div>
                              ))}
                            </div>
                          )}
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

      {/* TAB 5 — KPIs */}
      {activeTab === 'kpi' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Indicateurs de Performance Commerciale</h2>
            </div>

            {/* BU Performance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {BU_PERFORMANCE.map(bu => (
                <div key={bu.bu} className="rounded-2xl bg-white border border-background-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${bu.color}18` }}>
                      <i className={`${bu.icon}`} style={{ color: bu.color }}></i>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold" style={{ color: bu.color }}>{bu.bu.split('—')[0].trim()}</span>
                      <div className="text-[9px] text-foreground-400">{bu.directeur}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-lg font-bold text-foreground-950 font-heading">{formatFCFA(bu.pipeline)}</div>
                      <div className="text-[9px] text-foreground-500">Pipeline</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-emerald-700 font-heading">{formatFCFA(bu.signe)}</div>
                      <div className="text-[9px] text-foreground-500">Signé</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground-950">{bu.leads}</div>
                      <div className="text-[9px] text-foreground-500">Leads</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-accent-600">{bu.conversion}</div>
                      <div className="text-[9px] text-foreground-500">Conversion</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-background-100">
                    <span className="text-[9px] text-foreground-400">Top Magnet : {bu.topMagnet}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* KPI Grid */}
            {(['production', 'conversion', 'revenu', 'retention'] as const).map(cat => (
              <div key={cat} className="mb-6">
                <h3 className="text-sm font-bold text-foreground-700 uppercase mb-3">{cat}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {KPI_COMMERCIAUX[cat].map((kpi, i) => (
                    <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                      <i className={`${kpi.icone} text-lg`} style={{ color: kpi.couleur }}></i>
                      <div className="text-xl font-bold font-heading text-foreground-950 mt-1">{kpi.valeur} <span className="text-[10px] font-normal text-foreground-400">{kpi.unite}</span></div>
                      <div className="text-xs text-foreground-500">{kpi.indicateur}</div>
                      <div className="text-[10px] text-foreground-400 mt-0.5">Cible : {kpi.cible} {kpi.unite}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 6 — GROWTH-DATA */}
      {activeTab === 'growthdata' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Capitalisation GROWTH-DATA — Mémoire Commerciale KOS</h2>
              <p className="text-sm text-foreground-500 max-w-2xl mx-auto">{GROWTH_DATA_CAPITALIZATION.description}</p>
            </div>

            {/* Structure */}
            <div className="rounded-2xl bg-white border border-background-200 p-5 mb-8">
              <h3 className="font-heading text-sm font-bold text-foreground-950 mb-4">Structure de Capitalisation [GROWTH-DATA]</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {GROWTH_DATA_CAPITALIZATION.structure.map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background-50 border border-background-200/70">
                    <span className="text-[10px] font-bold text-accent-700">{s.champ}</span>
                    <p className="text-[9px] text-foreground-500 mt-0.5">{s.description}</p>
                    {s.exemples && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {s.exemples.slice(0, 2).map((ex, j) => (
                          <span key={j} className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200">{ex}</span>
                        ))}
                      </div>
                    )}
                    {s.options && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {s.options.slice(0, 3).map((op, j) => (
                          <span key={j} className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200">{op}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Entrées Capitalisation */}
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">{GROWTH_DATA_CAPITALIZATION.entreesCapitalisation.length} Entrées Capitalisées</h3>
            <div className="space-y-4 mb-8">
              {GROWTH_DATA_CAPITALIZATION.entreesCapitalisation.map(gd => {
                const isExpanded = expandedGD === gd.id;
                return (
                  <div key={gd.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedGD(isExpanded ? null : gd.id)} className="w-full p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent-100">
                        <span className="text-[10px] font-bold text-accent-700">{gd.id}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs text-foreground-400">{gd.date}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200">{gd.vertical}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 border border-background-200">{gd.zone}</span>
                          <span className="text-xs font-bold text-foreground-700">{formatFCFA(gd.dealSize)}</span>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed"><strong className="text-foreground-800">Leçon :</strong> {gd.lecon}</p>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg ml-2`}></i>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                          <span className="text-[9px] font-bold text-emerald-700 uppercase block mb-1">[TRIGGER]</span>
                          <p className="text-[10px] text-emerald-800">{gd.trigger}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                          <span className="text-[9px] font-bold text-red-700 uppercase block mb-1">[BARRIER]</span>
                          <p className="text-[10px] text-red-800">{gd.barrier}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                          <span className="text-[9px] font-bold text-amber-700 uppercase block mb-1">[PRICE]</span>
                          <p className="text-[10px] text-amber-800">{gd.price}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background-50 border border-background-200/70">
                          <span className="text-[9px] font-bold text-foreground-600 uppercase block mb-1">Meta</span>
                          <div className="space-y-1 text-[9px] text-foreground-700">
                            {Object.entries(gd.meta).map(([k, v]) => (
                              <div key={k}>{k} : {String(v)}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Synthèse */}
            <div className="rounded-2xl bg-white border border-background-200 p-5">
              <h3 className="font-heading text-sm font-bold text-foreground-950 mb-4">{growthDataSynthese.titre}</h3>
              <p className="text-xs text-foreground-500 mb-4">{growthDataSynthese.periode}</p>

              <div className="space-y-3 mb-6">
                {growthDataSynthese.insights.map((ins, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70">
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">{ins.categorie}</span>
                      <div>
                        <p className="text-xs text-foreground-700 leading-relaxed mb-1">{ins.insight}</p>
                        <span className="text-[9px] text-accent-600 font-bold">Impact : {ins.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold text-foreground-700 mb-3">Recommandations Prioritaires</h4>
              <div className="space-y-2">
                {growthDataSynthese.recommandations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent-50 border border-accent-200/50">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${rec.priorite === 'P0' ? 'bg-red-100 text-red-700' : rec.priorite === 'P1' ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-600'}`}>{rec.priorite}</span>
                    <div>
                      <p className="text-xs text-foreground-700 font-bold">{rec.action}</p>
                      <span className="text-[9px] text-accent-600">Impact estimé : {rec.impactEstime}</span>
                    </div>
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
          <h3 className="text-center font-heading text-xl font-bold text-foreground-950 mb-6">Écosystème Commercial & Growth KOS</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'KBR Dashboard', path: '/kbr-dashboard', icon: 'ri-book-open-line', color: '#DC2626' },
              { label: 'Closing & Growth Engine', path: '/kos-closing-growth-engine', icon: 'ri-fire-line', color: '#EA580C' },
              { label: 'Growth Orchestrator', path: '/kos-growth-orchestrator', icon: 'ri-robot-2-line', color: '#6366F1' },
              { label: 'Lead Scoring Command', path: '/kos-lead-scoring-command', icon: 'ri-bar-chart-grouped-line', color: '#059669' },
              { label: 'Khepra Growth Engine', path: '/kos-khepra-growth-engine', icon: 'ri-rocket-line', color: '#86BC25' },
              { label: 'Growth Intelligence', path: '/kos-growth-intelligence-command', icon: 'ri-brain-line', color: '#8B5CF6' },
              { label: 'Observatoire Réglementaire', path: '/observatoire-reglementaire-africain', icon: 'ri-global-line', color: '#0D7B5F' },
              { label: 'Scientific Director', path: '/kos-scientific-director', icon: 'ri-flask-line', color: '#E8C547' },
            ].map(link => (
              <Link key={link.path} to={link.path} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-background-200 bg-background-50 text-xs font-bold text-foreground-700 hover:border-foreground-300 transition-colors cursor-pointer whitespace-nowrap">
                <i className={`${link.icon} text-xs`} style={{ color: link.color }} />{link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}