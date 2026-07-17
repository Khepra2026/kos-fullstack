import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  trustStats,
  trustPillars,
  publicCertifications,
  publicMethodologies,
  publicQualityKPIs,
  publicReferences,
  trustFaqs,
} from '@/mocks/trustCenterPublic';

const formatNumber = (n: number) => n.toLocaleString('fr-FR');

export default function TrustCenterPage() {
  const [activePillar, setActivePillar] = useState('methodologies');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const activeData = trustPillars.find(p => p.id === activePillar);

  return (
    <>
      <SeoHead
        title="Trust Center — Méthodologies, Certifications & Références | KHEPRA EXPERTS"
        description="Centre de confiance KHEPRA EXPERTS : 10 méthodologies niveau Big Four, 12 certifications internationales (ISO 9001, ISO 37000, ISO 27001, GAFI, RGPD), 547 missions, NPS 86, 94.7% de rétention client. Transparence totale."
        keywords="Trust Center KHEPRA, certifications ISO, méthodologies Big Four, références conseil Afrique, confiance institutionnelle, qualité cabinet conseil, KHEPRA EXPERTS"
        canonicalPath="/trust-center"
      />

      {/* Hero */}
      <section className="relative min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20modern%20minimalist%20office%20space%20with%20warm%20golden%20lighting%2C%20elegant%20conference%20room%20with%20glass%20walls%2C%20subtle%20premium%20aesthetic%2C%20warm%20beige%20and%20cream%20tones%2C%20no%20people%2C%20architectural%20photography%2C%20clean%20composition%2C%20natural%20light%20streaming%20through%20large%20windows%2C%20sophisticated%20corporate%20interior&width=1600&height=800&seq=trust-hero-2026&orientation=landscape"
            alt="Trust Center KHEPRA EXPERTS"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-verified-badge-line text-accent-500"></i>
              KHEPRA Trust Center™ — Transparence Totale
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
              La Confiance se Mesure,<br />
              <span className="text-accent-400">elle ne se Déclare pas</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10">
              Méthodologies auditées, certifications vérifiées, références clients, 
              indicateurs qualité temps réel — tout ce que vous devez savoir avant 
              de nous confier votre conformité réglementaire.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: trustStats.missionsCompleted, label: 'Missions', icon: 'ri-briefcase-line' },
                { value: trustStats.clientRetentionRate + '%', label: 'Rétention', icon: 'ri-user-heart-line' },
                { value: trustStats.avgNps, label: 'NPS', icon: 'ri-star-line' },
                { value: trustStats.countriesCovered, label: 'Pays', icon: 'ri-global-line' },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-50/10 backdrop-blur-sm border border-white/10 text-white text-center">
                  <i className={`${stat.icon} text-accent-400 text-xl mb-2 block`}></i>
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pillar Navigation */}
      <nav className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {trustPillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
                  activePillar === pillar.id
                    ? 'bg-foreground-950 text-background-50 shadow-sm'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${pillar.icon} text-sm`}></i>
                {pillar.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">

          {/* Methodologies */}
          {activePillar === 'methodologies' && (
            <ScrollReveal>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3">
                  Méthodologies Propriétaires Niveau Big Four
                </h2>
                <p className="text-sm md:text-base text-foreground-600 max-w-3xl">
                  10 méthodologies documentées, auditées et certifiées. Chaque méthodologie est alignée 
                  sur les standards internationaux et adaptée au contexte réglementaire africain.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {publicMethodologies.map((meth) => (
                  <div key={meth.id} className="p-6 rounded-xl bg-background-50 border border-background-200/70 hover:border-background-300/60 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                        <i className={`${meth.icon} text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground-950">{meth.name}</h3>
                        <span className="text-xs text-foreground-500">{meth.phase}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-foreground-700 mb-2">Étapes clés</h4>
                      <div className="space-y-1.5">
                        {meth.steps.map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-foreground-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0"></div>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground-700 mb-2">Livrables</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {meth.deliverables.map((del, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary-100 text-secondary-700 border border-secondary-200">
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Methodologies List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground-950 mb-4">Les 10 Méthodologies</h3>
                {trustPillars[0].items.map((item, i) => (
                  <div key={i} className="p-5 rounded-xl bg-background-50 border border-background-200/70">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-foreground-950 mb-1">{item.name}</h4>
                        <p className="text-xs text-foreground-600 leading-relaxed mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.standards.map((std, j) => (
                            <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 border border-accent-200 font-medium">
                              {std}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Certifications */}
          {activePillar === 'certifications' && (
            <ScrollReveal>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3">
                  Certifications & Accréditations
                </h2>
                <p className="text-sm md:text-base text-foreground-600 max-w-3xl">
                  12 certifications internationales et régionales, auditées annuellement. 
                  Score moyen de conformité : 93/100.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {[
                  { label: 'Actives', value: publicCertifications.filter(c => c.status === 'active').length, color: 'text-green-600' },
                  { label: 'En Cours', value: publicCertifications.filter(c => c.status === 'in_progress').length, color: 'text-amber-600' },
                  { label: 'Score Moyen', value: Math.round(publicCertifications.reduce((a, c) => a + c.score, 0) / publicCertifications.length) + '/100', color: 'text-foreground-950' },
                  { label: 'Catégories', value: [...new Set(publicCertifications.map(c => c.category))].length, color: 'text-accent-500' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-foreground-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publicCertifications.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedCert === cert.id
                        ? 'border-accent-300 bg-accent-50/30'
                        : 'bg-background-50 border-background-200/70 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700 flex-shrink-0">
                        <i className={`${cert.issuerLogo} text-lg`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground-950">{cert.name}</h3>
                        <p className="text-xs text-foreground-500 mt-0.5 line-clamp-1">{cert.issuer}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium border whitespace-nowrap ${
                        cert.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                      }`}>
                        {cert.status === 'active' ? 'Active' : 'En Cours'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-foreground-400">Score</span>
                      <span className="text-lg font-bold text-foreground-950">{cert.score}/100</span>
                    </div>
                    <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full ${cert.score >= 90 ? 'bg-green-500' : cert.score >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${cert.score}%` }}
                      />
                    </div>

                    {selectedCert === cert.id && (
                      <div className="mt-3 pt-3 border-t border-background-200/70">
                        <p className="text-xs text-foreground-600 leading-relaxed mb-2">{cert.description}</p>
                        <div className="flex items-center gap-3 text-xs text-foreground-400">
                          <span><i className="ri-global-line mr-1"></i>{cert.scope}</span>
                          {cert.yearObtained && <span>Obtenue {cert.yearObtained}</span>}
                        </div>
                        {cert.validUntil !== '—' && (
                          <div className="text-xs text-foreground-400 mt-1">
                            <i className="ri-calendar-line mr-1"></i>Valide jusqu'au {cert.validUntil}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Quality */}
          {activePillar === 'quality' && (
            <ScrollReveal>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3">
                  Indicateurs Qualité — Temps Réel
                </h2>
                <p className="text-sm md:text-base text-foreground-600 max-w-3xl">
                  8 KPIs qualité suivis en continu. Score moyen : 94/100. 
                  Chaque mission fait l'objet d'une évaluation systématique.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {publicQualityKPIs.map((kpi) => (
                  <div key={kpi.id} className="p-5 rounded-xl bg-background-50 border border-background-200/70 text-center">
                    <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-accent-100 text-accent-700 mb-3">
                      <i className={`${kpi.icon} text-xl`}></i>
                    </div>
                    <div className="text-3xl font-bold text-foreground-950 mb-1">
                      {kpi.value}{kpi.unit}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-foreground-500">{kpi.label}</span>
                      <i className={`${kpi.trend === 'up' ? 'ri-arrow-up-line text-green-500' : kpi.trend === 'down' ? 'ri-arrow-down-line text-red-500' : 'ri-arrow-right-line text-foreground-400'} text-xs`}></i>
                    </div>
                    <div className="w-full h-1.5 bg-background-200/70 rounded-full overflow-hidden mt-3">
                      <div
                        className="h-full rounded-full bg-accent-500"
                        style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-foreground-400 mt-1">Cible: {kpi.target}{kpi.unit}</div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-2xl bg-foreground-950 text-white text-center">
                <div className="text-6xl font-bold text-accent-400 mb-3">94/100</div>
                <p className="text-lg font-semibold mb-2">Score Qualité Global KHEPRA EXPERTS</p>
                <p className="text-sm text-white/60 max-w-xl mx-auto">
                  Score composite calculé sur 6 dimensions : structure &amp; méthodologie, 
                  sources &amp; références, conformité réglementaire, clarté &amp; lisibilité, 
                  valeur client, innovation &amp; différenciation.
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* References */}
          {activePillar === 'references' && (
            <ScrollReveal>
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3">
                  Ils Nous Font Confiance
                </h2>
                <p className="text-sm md:text-base text-foreground-600 max-w-3xl">
                  {trustStats.missionsCompleted} missions réalisées dans {trustStats.countriesCovered} pays. 
                  {trustStats.clientRetentionRate}% de rétention client. NPS {trustStats.avgNps}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {publicReferences.map((ref) => (
                  <div key={ref.id} className="p-6 rounded-xl bg-background-50 border border-background-200/70">
                    <div className="flex items-start gap-2 mb-4">
                      <i className="ri-double-quotes-l text-3xl text-accent-300 flex-shrink-0"></i>
                      <p className="text-sm text-foreground-700 italic leading-relaxed">
                        « {ref.testimonial} »
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-accent-100 text-accent-700 font-medium">{ref.sector}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary-100 text-secondary-700 font-medium">{ref.country}</span>
                      <span className="text-xs text-foreground-400">{ref.year}</span>
                      {ref.verified && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
                          <i className="ri-verified-badge-line text-xs"></i>Vérifié
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{ref.clientName}</h3>
                    <p className="text-xs text-foreground-500 mb-1">{ref.contactRole}</p>
                    <p className="text-xs text-foreground-600 mb-3"><strong>Mission :</strong> {ref.mission}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                      <i className="ri-check-line text-green-600"></i>
                      <span className="text-xs font-semibold text-green-700">{ref.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* FAQ */}
        <section className="bg-background-100 border-t border-background-200/70">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-8 text-center">
              Questions Fréquentes sur Notre Approche Qualité
            </h2>
            <div className="space-y-3">
              {trustFaqs.map((faq, i) => (
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
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background-50 border-t border-background-200/70">
          <div className="max-w-3xl mx-auto text-center px-4 md:px-6 py-12 md:py-16">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-4">
              Prêt à Travailler avec un Cabinet de Confiance ?
            </h2>
            <p className="text-sm md:text-base text-foreground-600 mb-8">
              Nos méthodologies, certifications et références sont publiques. 
              Contactez-nous pour discuter de votre projet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contact"
                className="whitespace-nowrap px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer"
              >
                <i className="ri-mail-line mr-2"></i>Nous Contacter
              </Link>
              <Link
                to="/about"
                className="whitespace-nowrap px-6 py-3 rounded-full border border-background-300/60 text-foreground-950 text-sm font-semibold hover:bg-background-100 transition-colors cursor-pointer"
              >
                <i className="ri-building-line mr-2"></i>Découvrir le Cabinet
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}