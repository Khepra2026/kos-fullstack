import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { partners } from '@/data/partners';

export function AboutPartners() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

  return (
    <section id="about-partners" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal animation="fadeSlideUp" delay={0}>
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">
              <i className="ri-shake-hands-line"></i>
              {lang === 'fr' ? 'Cabinets Partenaires' : 'Partner Firms'}
            </span>
            <h2 className="section-title">
              {lang === 'fr' ? 'Nos partenaires en consortium' : 'Our Consortium Partners'}
            </h2>
            <div className="section-divider">
              <span className="section-divider-dot"></span>
            </div>
            <p className="section-subtitle">
              {lang === 'fr'
                ? "Dans le cadre de missions complexes, nous collaborons en consortium avec des cabinets spécialisés partageant nos valeurs d'excellence et d'impact."
                : 'For complex assignments, we collaborate in consortium with specialized firms sharing our values of excellence and impact.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Partner cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-7">
          {partners.map((partner, idx) => (
            <ScrollReveal key={idx} animation="fadeSlideUp" delay={idx * 120}>
              <div className="rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 group flex flex-col h-full overflow-hidden">

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  {/* Name & role */}
                  <div className="mb-4">
                    <h3 className="font-playfair text-lg font-bold text-gray-900 leading-tight mb-1">{partner.name}</h3>
                    <p className="text-sm font-semibold text-gold-700">{partner.role[lang]}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-5 text-sm flex-1">
                    {partner.description[lang]}
                  </p>

                  {/* Expertise tags */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-3">
                      {lang === 'fr' ? "Domaines d'expertise" : 'Areas of Expertise'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {partner.expertise.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium border border-gold-200 text-gold-700 bg-gold-50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col gap-2 mt-auto">
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white text-sm font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-200 whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg group/btn"
                        aria-label={`Visiter le site de ${partner.name}`}
                      >
                        <i className="ri-global-line text-base"></i>
                        <span>{lang === 'fr' ? 'Visiter le site' : 'Visit Website'}</span>
                        <i className="ri-external-link-line text-xs opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"></i>
                      </a>
                    )}
                    {partner.email && (
                      <a
                        href={`mailto:${partner.email}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gold-300 text-gold-700 text-sm font-medium hover:bg-gold-50 transition-colors whitespace-nowrap cursor-pointer"
                        aria-label={`Envoyer un email à ${partner.name}`}
                      >
                        <i className="ri-mail-line text-sm"></i>
                        {partner.email}
                      </a>
                    )}
                    {partner.linkedin && (
                      <a
                        href={partner.linkedin}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gold-300 text-gold-700 text-sm font-medium hover:bg-gold-50 transition-colors whitespace-nowrap cursor-pointer"
                        aria-label={`Voir le profil LinkedIn de ${partner.name}`}
                      >
                        <i className="ri-linkedin-line text-sm"></i>
                        {lang === 'fr' ? 'Profil LinkedIn' : 'LinkedIn Profile'}
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom note */}
        <ScrollReveal animation="fadeSlideUp" delay={200}>
          <div className="mt-12 sm:mt-14 text-center px-4">
            <p className="text-sm text-gray-400">
              {lang === 'fr'
                ? 'Vous êtes un cabinet conseil et souhaitez collaborer avec nous ?'
                : 'Are you a consulting firm and wish to collaborate with us?'}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors cursor-pointer py-2"
            >
              {lang === 'fr' ? 'Contactez-nous pour un partenariat' : 'Contact us for a partnership'}
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
