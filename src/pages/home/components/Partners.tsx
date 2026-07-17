import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { partners } from '@/data/partners';

export const Partners = memo(function Partners() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

  // Filter out AWITAZI from partners list (he's in AboutPartners as partner, not here)
  const consortiumPartners = partners.filter(p => p.name !== 'AWITAZI Tchagou Rodolphe');

  return (
    <section id="partners" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 sm:mb-16">
          <span className="section-label">
            {lang === 'fr' ? 'Cabinets Partenaires' : 'Partner Firms'}
          </span>
          <h2 className="section-title">
            {lang === 'fr' ? <>Nos partenaires <span className="accent">en consortium</span></> : <>Our <span className="accent">Consortium Partners</span></>}
          </h2>
          <div className="section-divider">
            <span className="section-divider-dot"></span>
          </div>
          <p className="section-subtitle px-4">
            {lang === 'fr'
              ? "Dans le cadre de missions complexes, nous collaborons en consortium avec des cabinets spécialisés partageant nos valeurs d'excellence et d'impact."
              : 'For complex assignments, we collaborate in consortium with specialized firms sharing our values of excellence and impact.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-7">
          {consortiumPartners.map((partner, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-7 hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 shadow-md group-hover:scale-110 transition-transform shrink-0">
                  <i className="ri-shake-hands-line text-white text-xl"></i>
                </div>
                <div className="min-w-0">
                  <h3 className="font-playfair text-lg font-bold text-gray-900 leading-tight">{partner.name}</h3>
                  <p className="text-xs font-medium text-gold-700 mt-0.5 leading-snug">{partner.role[lang]}</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-5 text-sm flex-1">
                {partner.description[lang]}
              </p>

              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-700 mb-3">
                  {lang === 'fr' ? "Domaines d'expertise" : 'Areas of Expertise'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {partner.expertise.slice(0, 4).map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium border border-gold-200 text-gold-700 bg-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {partner.linkedin && (
                <a
                  href={partner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer shadow-sm mt-auto"
                  aria-label={`Voir le profil de ${partner.name}`}
                >
                  {lang === 'fr' ? 'Voir le profil' : 'View profile'}
                  <i className="ri-linkedin-line text-sm"></i>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 text-center px-4">
          <p className="text-sm text-gray-400">
            {lang === 'fr'
              ? 'Vous êtes un cabinet conseil et souhaitez collaborer avec nous ?'
              : 'Are you a consulting firm and wish to collaborate with us?'}
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors cursor-pointer min-h-[44px] py-2 rounded"
          >
            {lang === 'fr' ? 'Contactez-nous pour un partenariat' : 'Contact us for a partnership'}
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </section>
  );
});