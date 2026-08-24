import { useTranslation } from 'react-i18next';
import { useHeroImage } from '@/hooks/useHeroImage';

export function AboutFounder() {
  const { t } = useTranslation();
  const { src: founderSrc, onError: onFounderError } = useHeroImage('team-founder');

  return (
    <section id="founder" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 border border-gold-200 rounded-full mb-6">
            <i className="ri-award-line text-gold-600"></i>
            <span className="text-sm font-semibold text-gold-900 uppercase tracking-wide">
              {t('about.founder.badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('about.founder.title')}
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400"></div>
            <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400"></div>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            {t('about.founder.subtitle')}
          </p>
        </div>

        {/* Photo et Bio */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 mb-16">
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-200 bg-gradient-to-br from-gold-50 to-white">
              <img
                src={founderSrc}
                alt={t('about.founder.name')}
                onError={onFounderError}
                className="w-full h-auto object-cover"
                width={400}
                height={500}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gold-900/80 via-gold-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white font-bold text-lg mb-1">
                  {t('about.founder.name')}
                </h4>
                <p className="text-gold-200 text-sm font-medium">
                  {t('about.founder.title')}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                    <i className="ri-briefcase-line text-white text-sm"></i>
                  </div>
                  <span className="text-white/90 text-xs">22+ ans d'expérience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {t('about.founder.name')}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              {t('about.founder.bio')}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-gold-50 text-gold-700 rounded-lg text-sm font-medium">
                {t('about.founder.expertise.1')}
              </span>
              <span className="px-4 py-2 bg-strategic-50 text-strategic-700 rounded-lg text-sm font-medium">
                {t('about.founder.expertise.2')}
              </span>
              <span className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium">
                {t('about.founder.expertise.3')}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-graduation-cap-line text-gold-600"></i>
                <span className="text-sm font-semibold text-slate-900">Formation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                MBA Gestion des Entreprises — Université Laval (2018)<br />
                Maîtrise Sciences de Gestion — Université de Lomé (2003)
              </p>
            </div>
          </div>
        </div>

        {/* Parcours professionnel */}
        <div className="mb-16">
          <div className="text-left mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mb-4">
              <i className="ri-time-line text-slate-600"></i>
              <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Parcours professionnel
              </span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-strategic-400 to-slate-500"></div>

            <div className="space-y-8 sm:space-y-12">
              <div className="relative pl-12 sm:pl-20">
                <div className="absolute left-2 sm:left-6 top-0 w-5 h-5 bg-gold-500 rounded-full border-4 border-white"></div>
                <div className="bg-gradient-to-br from-gold-50 to-white p-6 rounded-xl border border-gold-100">
                  <div className="text-sm font-semibold text-gold-600 mb-2">2008 – 2015</div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {t('about.founder.timeline.1.title')}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('about.founder.timeline.1.description')}
                  </p>
                </div>
              </div>

              <div className="relative pl-12 sm:pl-20">
                <div className="absolute left-2 sm:left-6 top-0 w-5 h-5 bg-strategic-500 rounded-full border-4 border-white"></div>
                <div className="bg-gradient-to-br from-strategic-50 to-white p-6 rounded-xl border border-strategic-100">
                  <div className="text-sm font-semibold text-strategic-600 mb-2">2015 – 2020</div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {t('about.founder.timeline.2.title')}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('about.founder.timeline.2.description')}
                  </p>
                </div>
              </div>

              <div className="relative pl-12 sm:pl-20">
                <div className="absolute left-2 sm:left-6 top-0 w-5 h-5 bg-slate-600 rounded-full border-4 border-white"></div>
                <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-100">
                  <div className="text-sm font-semibold text-slate-600 mb-2">
                    2020 – {t('about.founder.timeline.3.present')}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {t('about.founder.timeline.3.title')}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('about.founder.timeline.3.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-gold-50 to-slate-50 rounded-2xl border-2 border-gold-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                <i className="ri-lightbulb-line text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {t('about.founder.cta.title')}
              </h3>
            </div>
            <p className="text-slate-600 max-w-2xl">
              {t('about.founder.cta.description')}
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              {t('about.founder.cta.button')}
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}



