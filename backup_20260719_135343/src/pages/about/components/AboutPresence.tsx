import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';

export function AboutPresence() {
  const { t } = useTranslation();

  const west = ['Togo', 'Bénin', 'Ghana', 'Sénégal', 'Mali', 'Burkina Faso', 'Niger', 'Côte d\'Ivoire'];
  const central = ['Cameroun', 'Congo', 'Gabon', 'RDC', 'Tchad', 'RCA'];

  return (
    <section id="presence" className="py-16 sm:py-20 bg-gradient-to-br from-brand-900 via-brand-950 to-navy-900 relative overflow-hidden">
      {/* Watermark AFRICA - Fixed overflow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="text-[8rem] sm:text-[12rem] lg:text-[18rem] font-bold text-white/5 opacity-30 select-none whitespace-nowrap max-w-full">
          AFRICA
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <ScrollReveal animation="fadeSlideUp" delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-400/30 mb-6">
                <i className="ri-map-2-line text-gold-400 text-sm"></i>
                <span className="text-sm font-semibold text-gold-300 uppercase tracking-wider">
                  {t('aboutPresence.badge')}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeSlideUp" delay={100}>
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t('aboutPresence.title')}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fadeSlideUp" delay={180}>
              <p className="text-white/75 text-lg leading-relaxed mb-10">
                {t('aboutPresence.description')}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <ScrollReveal animation="fadeSlideLeft" delay={260}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gold-500/20">
                      <i className="ri-map-pin-line text-gold-400 text-base"></i>
                    </div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">
                      {t('aboutPresence.westAfrica')}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {west.map((country, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-full border ${country === 'Togo' ? 'bg-gold-500/30 border-gold-400/50 text-gold-300 font-semibold' : 'bg-white/5 border-white/10 text-white/70'}`}>
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeSlideRight" delay={320}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gold-500/20">
                      <i className="ri-map-pin-line text-gold-400 text-base"></i>
                    </div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">
                      {t('aboutPresence.centralAfrica')}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {central.map((country, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal animation="fadeSlideUp" delay={400}>
              <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gold-500/20 flex-shrink-0">
                  <i className="ri-building-line text-gold-400 text-xl"></i>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t('aboutPresence.headquarters')}</div>
                  <div className="text-white/60 text-sm">{t('aboutPresence.headquartersLocation')}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — image */}
          <ScrollReveal animation="fadeSlideRight" delay={200}>
            <div className="relative">
              <OptimizedHeroImage
                imageKey="about-presence-map"
                className="w-full rounded-2xl shadow-2xl"
                aspectRatio="1/1"
                objectFit="cover"
                loading="lazy"
                placeholder="shimmer"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AboutPresence;




