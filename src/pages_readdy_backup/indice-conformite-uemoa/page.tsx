import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { indiceConformiteUEMOAKPIs, indiceDimensions, indiceTopInstitutions, indiceFaqs } from '@/mocks/observatoiresPublic';

export default function IndiceConformiteUEMOAPage() {
  const [activeDim, setActiveDim] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const kpi = indiceConformiteUEMOAKPIs;
  const dim = indiceDimensions[activeDim];

  return (
    <>
      <SeoHead
        title="Indice de Conformité UEMOA 2026 — Benchmark Institutions Financières | KHEPRA EXPERTS"
        description="Indice de Conformité UEMOA Q2 2026 : 85 institutions évaluées, score moyen 72/100, 6 dimensions (Gouvernance, Conformité, Risques, LBC/FT, Transparence, Protection Clientèle). Benchmark BCEAO."
        keywords="Indice conformité UEMOA, benchmark institutions financières, notation BCEAO, conformité bancaire UEMOA, KHEPRA EXPERTS"
        canonicalPath="/indice-conformite-uemoa"
      />

      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://readdy.ai/api/search-image?query=Abstract%20geometric%20financial%20data%20visualization%2C%20golden%20and%20amber%20charts%20and%20graphs%2C%20modern%20corporate%20dashboard%20aesthetic%2C%20clean%20minimal%20design%2C%20warm%20lighting%2C%20premium%20financial%20analytics%20concept%2C%20no%20people%2C%20abstract%20composition&width=1600&height=700&seq=indice-uemoa-hero&orientation=landscape" alt="Indice Conformité UEMOA" className="w-full h-full object-cover object-top" width="1600" height="700" loading="eager" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-medal-line text-amber-500"></i>
              Indice de Conformité UEMOA — {kpi.derniereEdition}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Indice de Conformité UEMOA
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Benchmark indépendant de {kpi.institutionsEvaluees} institutions financières dans {kpi.paysCouverts} pays. 
              Score moyen : {kpi.scoreMoyen}/100 — {kpi.progression}.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: 'Score Moyen', value: `${kpi.scoreMoyen}/100`, icon: 'ri-bar-chart-line' },
              { label: 'Score Max', value: `${kpi.scoreMax}/100`, icon: 'ri-trophy-line' },
              { label: 'Score Min', value: `${kpi.scoreMin}/100`, icon: 'ri-alert-line' },
              { label: 'Institutions', value: kpi.institutionsEvaluees, icon: 'ri-building-line' },
              { label: 'Pays UEMOA', value: kpi.paysCouverts, icon: 'ri-global-line' },
              { label: 'Progression', value: kpi.progression, icon: 'ri-arrow-up-line' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} text-amber-600 text-lg mb-1 block`}></i>
                <div className="text-xl font-bold text-foreground-950">{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Dimensions */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Les {kpi.dimensions} Dimensions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="lg:col-span-1 space-y-2">
                {indiceDimensions.map((d, i) => (
                  <button key={i} onClick={() => setActiveDim(i)} className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${i === activeDim ? 'border-amber-300 bg-amber-50/50' : 'bg-background-50 border-background-200/70 hover:border-background-300/60'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-foreground-950">{d.name}</span>
                      <span className="text-lg font-bold text-foreground-950">{d.score}</span>
                    </div>
                    <div className="w-full h-1.5 bg-background-200/70 rounded-full overflow-hidden mb-1">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: `${d.score}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-foreground-400">Poids: {d.poids}%</span>
                      <span className="text-green-600 font-semibold">{d.trend} pts</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-2">
                <div className="p-6 rounded-xl bg-background-50 border border-background-200/70 h-full">
                  <h3 className="text-lg font-bold text-foreground-950 mb-2">{dim.name} — {dim.score}/100</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-4">{dim.description}</p>
                  <div className="mb-4">
                    <div className="w-full h-3 bg-background-200/70 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: `${dim.score}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-foreground-500">
                    <span>Poids: {dim.poids}%</span>
                    <span>Progression: <span className="text-green-600 font-semibold">{dim.trend} pts</span></span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Top Institutions */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Top 5 — {kpi.derniereEdition}</h2>
            <div className="space-y-3 mb-10">
              {indiceTopInstitutions.map((inst, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-foreground-950 text-background-50 flex items-center justify-center text-xs font-bold">{inst.rang}</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-foreground-950">{inst.institution}</span>
                    <span className="text-xs text-foreground-400 ml-2">{inst.pays}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">{inst.categorie}</span>
                  <span className="text-lg font-bold text-amber-600">{inst.score}/100</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Questions Fréquentes</h2>
            <div className="space-y-3 mb-8">
              {indiceFaqs.map((faq, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full text-left p-5 flex items-center justify-between gap-3 cursor-pointer">
                    <span className="text-sm font-semibold text-foreground-950">{faq.q}</span>
                    <i className={`ri-add-line text-foreground-400 transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`}></i>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5"><p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p></div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="text-center p-8 rounded-2xl bg-amber-50 border border-amber-200">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Participez à la Prochaine Édition</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">Votre institution peut participer à l'Indice de Conformité UEMOA. Évaluation confidentielle, benchmark sectoriel, recommandations personnalisées.</p>
            <Link to="/contact" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer">
              <i className="ri-mail-line"></i>Demander une Évaluation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}



