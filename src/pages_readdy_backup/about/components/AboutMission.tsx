import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';

export function AboutMission() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const values = [
    {
      icon: 'ri-shield-star-line',
      title: isEn ? 'Excellence' : 'Excellence',
      description: isEn
        ? 'We deliver the highest quality work in every assignment, with rigor and precision.'
        : 'Nous livrons un travail de la plus haute qualité dans chaque mission, avec rigueur et précision.',
      color: 'from-gold-400 to-gold-500',
      bg: 'bg-gold-50',
      border: 'border-gold-100',
    },
    {
      icon: 'ri-lightbulb-line',
      title: isEn ? 'Innovation' : 'Innovation',
      description: isEn
        ? 'We bring creative and adapted solutions to the specific challenges of African organizations.'
        : 'Nous apportons des solutions créatives et adaptées aux défis spécifiques des organisations africaines.',
      color: 'from-orange-400 to-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
    {
      icon: 'ri-heart-line',
      title: isEn ? 'Integrity' : 'Intégrité',
      description: isEn
        ? 'We act with transparency, ethics and total confidentiality in all our relationships.'
        : 'Nous agissons avec transparence, éthique et confidentialité totale dans toutes nos relations.',
      color: 'from-rose-400 to-rose-500',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
    {
      icon: 'ri-focus-3-line',
      title: isEn ? 'Impact' : 'Impact',
      description: isEn
        ? 'Every intervention is designed to generate measurable and lasting results for our clients.'
        : 'Chaque intervention est conçue pour générer des résultats mesurables et durables pour nos clients.',
      color: 'from-teal-400 to-teal-500',
      bg: 'bg-teal-50',
      border: 'border-teal-100',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <ScrollReveal animation="fadeSlideUp" delay={0}>
              <span className="section-label">
                <i className="ri-compass-3-line" aria-hidden="true"></i>
                {isEn ? 'Mission & Vision' : 'Mission & Vision'}
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fadeSlideUp" delay={100}>
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {isEn ? 'Driving Transformation Across Africa' : "Moteur de transformation à travers l'Afrique"}
              </h2>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal animation="fadeSlideLeft" delay={200}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-md">
                    <i className="ri-rocket-line text-white text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('about.mission')}</h3>
                    <p className="text-gray-600 leading-relaxed">{t('about.missionText')}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeSlideLeft" delay={320}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 shadow-md">
                    <i className="ri-eye-line text-white text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('about.vision')}</h3>
                    <p className="text-gray-600 leading-relaxed">{t('about.visionText')}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal animation="fadeSlideRight" delay={150}>
            <div className="relative">
              <OptimizedHeroImage
                imageKey="about-mission"
                className="w-full rounded-2xl shadow-2xl"
                aspectRatio="700/520"
                objectFit="cover"
                loading="lazy"
                placeholder="shimmer"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-gold-400 rounded-2xl -z-10"></div>

              {/* Floating badge */}
              <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-100">
                    <i className="ri-map-pin-2-fill text-gold-600 text-lg" aria-hidden="true"></i>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Lomé, Togo</div>
                    <div className="text-xs text-gray-500">{isEn ? 'Headquarters' : 'Siège social'}</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Values */}
        <div>
          <ScrollReveal animation="fadeSlideUp" delay={0}>
            <div className="text-left mb-12">
              <span className="section-label">
                <i className="ri-award-line" aria-hidden="true"></i>
                {isEn ? 'Our Values' : 'Nos Valeurs'}
              </span>

              <h2 className="section-title">
                {isEn ? 'What Drives Us Every Day' : 'Ce qui nous anime chaque jour'}
              </h2>

              <div className="section-divider">
                <span className="section-divider-dot"></span>
              </div>

              <p className="section-subtitle">
                {isEn
                  ? 'Four founding principles that guide every mission and every relationship with our clients.'
                  : 'Quatre principes fondateurs qui guident chaque mission et chaque relation avec nos clients.'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 120}>
                <div
                  className={`${val.bg} border ${val.border} rounded-2xl p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${val.color} shadow-md mb-5`}>
                    <i className={`${val.icon} text-white text-xl`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{val.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



