import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  referentielsScores,
  indiceGlobalKPIs,
  topControlesP0,
  timelineEvenements,
  indiceFAQ,
} from '@/mocks/indiceConformiteGlobal';

export default function IndiceConformiteGlobalPage() {
  const [activeRef, setActiveRef] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const kpi = indiceGlobalKPIs;

  const filteredRefs = activeRef
    ? referentielsScores.filter((r) => r.code === activeRef)
    : referentielsScores;

  return (
    <>
      <SeoHead
        title="Indice de Conformité 2026 — 5 Référentiels Agrégés (COBAC, BCEAO, OHADA, GIABA, GABAC) | KHEPRA EXPERTS"
        description="Indice de Conformité KHEPRA Q2 2026 : 5 référentiels agrégés, 102 contrôles automatisables, score moyen 79/100. COBAC, BCEAO, OHADA, GIABA, GABAC. Benchmark réglementaire africain."
        keywords="Indice conformité, COBAC, BCEAO, OHADA, GIABA, GABAC, benchmark réglementaire, contrôles automatisables, KHEPRA EXPERTS"
        canonicalPath="/indice-conformite"
      />

      {/* Hero */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20regulatory%20compliance%20dashboard%20visualization%2C%20five%20interconnected%20geometric%20rings%20radiating%20from%20center%2C%20warm%20amber%20and%20forest%20green%20tones%20against%20deep%20charcoal%20background%2C%20clean%20data%20visualization%20aesthetic%2C%20premium%20corporate%20governance%20concept%2C%20no%20people%2C%20minimalist%20composition%20with%20glowing%20nodes&width=1600&height=700&seq=indice-global-hero&orientation=landscape"
            alt="Indice de Conformité Global"
            className="w-full h-full object-cover object-top"
            width="1600"
            height="700"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-shield-check-line text-amber-500"></i>
              Indice de Conformité — {kpi.derniereEdition}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Indice de Conformité Global
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Agrégation de {kpi.referentiels} référentiels réglementaires africains.
              Score moyen : {kpi.scoreMoyen}/100 — {kpi.progression}.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* KPI Global Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: 'Score Global', value: `${kpi.scoreMoyen}/100`, icon: 'ri-bar-chart-line', color: 'text-amber-600' },
              { label: 'Référentiels', value: kpi.referentiels, icon: 'ri-stack-line', color: 'text-emerald-600' },
              { label: 'P0 Critiques', value: kpi.totalP0, icon: 'ri-alert-line', color: 'text-red-500' },
              { label: 'Automatisables', value: kpi.totalAutomatisables, icon: 'ri-robot-line', color: 'text-violet-600' },
              { label: 'Budget Total', value: `${(kpi.budgetTotalEur / 1000).toFixed(0)}K€`, icon: 'ri-money-euro-circle-line', color: 'text-emerald-600' },
              { label: 'Gain Moyen', value: `${kpi.gainMoyenGlobal}%`, icon: 'ri-arrow-up-line', color: 'text-green-600' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} ${s.color} text-lg mb-1 block`}></i>
                <div className="text-xl font-bold text-foreground-950">{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
            {[
              { label: 'Domaines', value: kpi.totalDomaines, icon: 'ri-folder-line', color: 'text-foreground-500' },
              { label: 'Exigences', value: kpi.totalExigences, icon: 'ri-file-list-3-line', color: 'text-foreground-500' },
            ].map((s, i) => (
              <div key={i + 100} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} ${s.color} text-lg mb-1 block`}></i>
                <div className="text-xl font-bold text-foreground-950">{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* 5 Référentiels */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-2">Les 5 Référentiels</h2>
            <p className="text-sm text-foreground-600 mb-6">Cliquez pour filtrer — {kpi.totalControles} contrôles, {kpi.totalAutomatisables} automatisables</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveRef(null)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${!activeRef ? 'bg-foreground-950 text-background-50' : 'bg-background-50 border border-background-200/70 text-foreground-950 hover:bg-background-100'}`}
              >
                Tous
              </button>
              {referentielsScores.map((ref) => (
                <button
                  key={ref.code}
                  onClick={() => setActiveRef(ref.code === activeRef ? null : ref.code)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${ref.code === activeRef ? 'bg-foreground-950 text-background-50' : 'bg-background-50 border border-background-200/70 text-foreground-950 hover:bg-background-100'}`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ref.couleur }}></span>
                  {ref.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {filteredRefs.map((ref) => (
                <div key={ref.code} className="p-5 rounded-xl bg-background-50 border border-background-200/70 hover:border-background-300/60 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ref.couleur}15` }}>
                      <i className={`${ref.icon} text-lg`} style={{ color: ref.couleur }}></i>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground-950">{ref.name}</h3>
                      <p className="text-xs text-foreground-400">{ref.zone} — {ref.pays} pays</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-foreground-500">Score Conformité</span>
                    <span className="text-lg font-bold" style={{ color: ref.couleur }}>{ref.scoreConformite}/100</span>
                  </div>
                  <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden mb-3">
                    <div className="h-full rounded-full" style={{ width: `${ref.scoreConformite}%`, backgroundColor: ref.couleur }} />
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div>
                      <div className="font-bold text-foreground-950">{ref.domaines}</div>
                      <div className="text-foreground-400">Dom.</div>
                    </div>
                    <div>
                      <div className="font-bold text-foreground-950">{ref.automatisables}</div>
                      <div className="text-foreground-400">Auto</div>
                    </div>
                    <div>
                      <div className="font-bold text-foreground-950">{ref.effortTotalJH}</div>
                      <div className="text-foreground-400">JH</div>
                    </div>
                    <div>
                      <div className="font-bold text-foreground-950">{(ref.budgetTotalEur / 1000).toFixed(0)}K</div>
                      <div className="text-foreground-400">€</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {ref.p0Critiques > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">P0:{ref.p0Critiques}</span>
                    )}
                    {ref.p1Haute > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">P1:{ref.p1Haute}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Top 5 P0 */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Top 5 — Contrôles P0 Prioritaires</h2>
            <div className="space-y-3 mb-10">
              {topControlesP0.map((c, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 flex items-center gap-4 flex-wrap">
                  <div className="w-8 h-8 rounded-full bg-foreground-950 text-background-50 flex items-center justify-center text-xs font-bold">{c.rang}</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-foreground-950">{c.nom}</span>
                    <span className="text-xs text-foreground-400 ml-2">{c.referentiel}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-semibold">{c.priorite}</span>
                  <span className="text-xs text-foreground-500">{c.effortJH} JH</span>
                  <span className="text-xs text-foreground-500">{(c.coutEur / 1000).toFixed(0)}K€</span>
                  <span className="text-xs text-green-600 font-semibold">+{c.gainPct}% gain</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Chronologie des Déploiements</h2>
            <div className="relative pl-6 border-l-2 border-background-200/70 space-y-6 mb-10">
              {timelineEvenements.map((ev, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-2 border-background-50 ${
                    ev.type === 'deploiement' ? 'bg-emerald-500' :
                    ev.type === 'audit' ? 'bg-amber-500' :
                    ev.type === 'alerte' ? 'bg-red-500' : 'bg-violet-500'
                  }`}></div>
                  <p className="text-xs text-foreground-400 mb-1">{ev.date}</p>
                  <p className="text-sm font-bold text-foreground-950">{ev.titre}</p>
                  <p className="text-xs text-foreground-500">{ev.description}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 mt-1 inline-block">{ev.referentiel}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Questions Fréquentes</h2>
            <div className="space-y-3 mb-8">
              {indiceFAQ.map((faq, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-foreground-950">{faq.q}</span>
                    <i className={`ri-add-line text-foreground-400 transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`}></i>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <div className="text-center p-8 rounded-2xl bg-amber-50 border border-amber-200">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Obtenez Votre Score de Conformité</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">
              Diagnostic flash gratuit de votre exposition aux 5 référentiels. Feuille de route priorisée, estimation budgétaire et calendrier de mise en conformité.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer"
              >
                <i className="ri-mail-line"></i>Demander un Diagnostic
              </Link>
              <Link
                to="/kos-cartographie-controles-automatisables"
                className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background-50 border border-background-200/70 text-foreground-950 text-sm font-semibold hover:bg-background-100 transition-colors cursor-pointer"
              >
                <i className="ri-dashboard-line"></i>Cartographie des Contrôles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



