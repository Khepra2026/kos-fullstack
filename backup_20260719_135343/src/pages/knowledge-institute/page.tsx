import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import {
  knowledgeInstituteKPIs,
  flagshipPublications,
  researchAxes,
  institutionalPartners,
  knowledgeTimeline,
  knowledgeFaqs,
} from '@/mocks/knowledgeInstitutePublic';

const formatNumber = (n: number) => n.toLocaleString('fr-FR');

export default function KnowledgeInstitutePage() {
  const [activeAxe, setActiveAxe] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const kpi = knowledgeInstituteKPIs;

  return (
    <>
      <SeoHead
        title="KHEPRA Knowledge Institute™ — Think Tank Économique & Stratégique | KHEPRA EXPERTS"
        description="Institut de recherche KHEPRA EXPERTS : 64 publications, 105k téléchargements, +1428 citations médias. Baromètres, indices, études sectorielles, livres blancs — production intellectuelle de référence en Afrique francophone."
        keywords="Knowledge Institute KHEPRA, think tank Afrique, recherche économique UEMOA, publications conseil Afrique, baromètre PME Afrique, études sectorielles, KHEPRA EXPERTS"
        canonicalPath="/knowledge-institute"
      />

      {/* Hero */}
      <section className="relative min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Elegant%20modern%20library%20with%20warm%20amber%20lighting%2C%20floor%20to%20ceiling%20bookshelves%2C%20quiet%20study%20atmosphere%2C%20leather%20armchairs%2C%20brass%20reading%20lamps%2C%20warm%20golden%20and%20deep%20brown%20tones%2C%20scholarly%20aesthetic%2C%20no%20people%2C%20architectural%20photography%2C%20premium%20academic%20interior&width=1600&height=800&seq=knowledge-hero-2026&orientation=landscape"
            alt="KHEPRA Knowledge Institute"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-lightbulb-flash-line text-amber-500"></i>
              KHEPRA Knowledge Institute™ — Think Tank Permanent
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
              L'Intelligence Économique<br />
              <span className="text-amber-400">au Service de l'Afrique</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10">
              Think tank économique et stratégique permanent. Baromètres sectoriels, 
              indices de maturité, études prospectives, livres blancs — une production 
              intellectuelle de référence pour les décideurs africains.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: kpi.totalPublications, label: 'Publications', icon: 'ri-book-open-line' },
                { value: formatNumber(kpi.totalDownloads), label: 'Téléchargements', icon: 'ri-download-line' },
                { value: '+' + kpi.totalCitationsMedias, label: 'Citations Médias', icon: 'ri-newspaper-line' },
                { value: kpi.axesCount, label: 'Axes Recherche', icon: 'ri-compass-3-line' },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-background-50/10 backdrop-blur-sm border border-white/10 text-white text-center">
                  <i className={`${stat.icon} text-amber-400 text-xl mb-2 block`}></i>
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Research Axes */}
      <section className="bg-background-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3 text-center">
              Nos Axes de Recherche
            </h2>
            <p className="text-sm md:text-base text-foreground-600 text-center max-w-2xl mx-auto mb-10">
              {kpi.axesCount} axes de recherche couvrant les enjeux critiques du développement 
              économique et financier en Afrique francophone.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {researchAxes.map((axe, i) => (
              <button
                key={axe.id}
                onClick={() => setActiveAxe(i)}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                  i === activeAxe
                    ? 'border-amber-300 bg-amber-50/50'
                    : 'bg-background-50 border-background-200/70 hover:border-background-300/60'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-3">
                  <i className={`${axe.icon} text-lg`}></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950 mb-1">{axe.name}</h3>
                <div className="text-xs text-foreground-500">{axe.publications} publications</div>
                <div className="text-[10px] text-foreground-400 mt-1">{axe.focus}</div>
              </button>
            ))}
          </div>

          {/* Active Axe Detail */}
          {researchAxes[activeAxe] && (
            <ScrollReveal>
              <div className="p-6 md:p-8 rounded-2xl bg-background-50 border border-background-200/70">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <i className={`${researchAxes[activeAxe].icon} text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground-950">{researchAxes[activeAxe].name}</h3>
                    <p className="text-xs text-foreground-500">{researchAxes[activeAxe].publications} publications · Focus: {researchAxes[activeAxe].focus}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 leading-relaxed mb-4">{researchAxes[activeAxe].description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {researchAxes[activeAxe].topics.map((topic, j) => (
                    <span key={j} className="text-xs px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 border border-secondary-200">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Flagship Publications */}
      <section className="bg-background-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3 text-center">
              Publications Phares
            </h2>
            <p className="text-sm md:text-base text-foreground-600 text-center max-w-2xl mx-auto mb-10">
              Nos baromètres, indices et études sectorielles font référence auprès 
              des institutions financières, régulateurs et bailleurs internationaux.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {flagshipPublications.map((pub) => (
              <div key={pub.id} className="rounded-xl bg-background-50 border border-background-200/70 overflow-hidden hover:border-background-300/60 transition-all">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                      pub.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                      pub.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                      pub.color === 'teal' ? 'bg-teal-100 text-teal-700' :
                      pub.color === 'violet' ? 'bg-violet-100 text-violet-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      <i className={`${pub.icon} text-lg`}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950 leading-snug">{pub.title}</h3>
                      <p className="text-[10px] text-foreground-400">{pub.editions} éditions · {pub.frequency}</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed mb-4">{pub.description}</p>
                  <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                    <span><i className="ri-download-line mr-1"></i>{formatNumber(pub.downloads)}</span>
                    <span><i className="ri-newspaper-line mr-1"></i>{pub.citations} citations</span>
                    <span>n={pub.sampleSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/publications"
              className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer"
            >
              <i className="ri-book-open-line"></i>
              Explorer Toutes les Publications
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional Partners */}
      <section className="bg-background-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3 text-center">
              Partenaires Institutionnels
            </h2>
            <p className="text-sm md:text-base text-foreground-600 text-center max-w-2xl mx-auto mb-10">
              Nos publications sont citées et utilisées par les plus grandes institutions 
              financières et organisations internationales.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {institutionalPartners.map((partner) => (
              <div key={partner.id} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-amber-100 text-amber-700 mb-3">
                  <i className={`${partner.icon} text-xl`}></i>
                </div>
                <h4 className="text-xs font-bold text-foreground-950 mb-1">{partner.name}</h4>
                <p className="text-[10px] text-foreground-500">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background-100 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-10 text-center">
              Jalons du Knowledge Institute
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {knowledgeTimeline.map((event, i) => (
              <div key={i} className="flex items-start gap-4 pb-6 relative">
                {i < knowledgeTimeline.length - 1 && (
                  <div className="absolute left-[17px] top-10 bottom-0 w-px bg-background-200/70"></div>
                )}
                <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600">{event.date}</span>
                  <h3 className="text-sm font-bold text-foreground-950 mt-0.5">{event.title}</h3>
                  <p className="text-xs text-foreground-600 mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background-50 border-t border-background-200/70">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-8 text-center">
            Questions sur le Knowledge Institute
          </h2>
          <div className="space-y-3">
            {knowledgeFaqs.map((faq, i) => (
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
      <section className="bg-foreground-950 py-12 md:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-white mb-4">
            Contribuez à la Recherche Économique Africaine
          </h2>
          <p className="text-sm md:text-base text-white/60 mb-8">
            Téléchargez nos publications, participez à nos enquêtes, proposez des partenariats de recherche.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/publications"
              className="whitespace-nowrap px-6 py-3 rounded-full bg-amber-500 text-foreground-950 text-sm font-semibold hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <i className="ri-download-line mr-2"></i>Télécharger les Publications
            </Link>
            <Link
              to="/contact"
              className="whitespace-nowrap px-6 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
            >
              <i className="ri-mail-line mr-2"></i>Proposer un Partenariat
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}



