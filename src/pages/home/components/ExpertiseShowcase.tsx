import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';
import { HERO_IMAGES } from '@/utils/heroImages';

import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';

// Sub-component to handle per-expertise image with fallback + lazy loading
function ExpertiseImage({ imageKey, hovered }: { imageKey: keyof typeof HERO_IMAGES; hovered: boolean }) {
  return (
    <OptimizedHeroImage
      imageKey={imageKey}
      className={`w-full h-full transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
      aspectRatio="3/2"
      objectFit="cover"
      loading="lazy"
      placeholder="shimmer"
    />
  );
}

const EXPERTISES = [
  {
    icon: 'ri-bank-line',
    imageKey: 'expertise-microfinance' as keyof typeof HERO_IMAGES,
    titleFr: 'Microfinance & SFD',
    titleEn: 'Microfinance & MFIs',
    descFr: 'Conformité BCEAO, gouvernance institutionnelle, gestion des risques et transformation digitale pour les institutions de microfinance.',
    descEn: 'BCEAO compliance, institutional governance, risk management and digital transformation for microfinance institutions.',
    tag: 'BCEAO · COBAC',
    link: '/industries/microfinance',
    accent: '#86BC25',
    stat: '50+',
    statLabelFr: 'IMF accompagnées',
    statLabelEn: 'MFIs supported',
  },
  {
    icon: 'ri-smartphone-line',
    imageKey: 'expertise-fintech' as keyof typeof HERO_IMAGES,
    titleFr: 'Fintech & Inclusion Digitale',
    titleEn: 'Fintech & Digital Inclusion',
    descFr: 'Stratégie, conformité réglementaire, obtention d\'agréments et levée de fonds pour les startups fintech africaines.',
    descEn: 'Strategy, regulatory compliance, licensing and fundraising for African fintech startups.',
    tag: 'Mobile Money · Agrément',
    link: '/industries/fintech',
    accent: '#c0922a',
    stat: '25+',
    statLabelFr: 'Fintechs accompagnées',
    statLabelEn: 'Fintechs supported',
  },
  {
    icon: 'ri-rocket-line',
    imageKey: 'expertise-pme' as keyof typeof HERO_IMAGES,
    titleFr: 'PME & Startups',
    titleEn: 'SMEs & Startups',
    descFr: 'Conseil stratégique, gouvernance d\'entreprise, structuration financière et accompagnement à la croissance.',
    descEn: 'Strategic advisory, corporate governance, financial structuring and growth support.',
    tag: 'Stratégie · Gouvernance',
    link: '/industries/pme',
    accent: '#b87a20',
    stat: '200+',
    statLabelFr: 'PME transformées',
    statLabelEn: 'SMEs transformed',
  },
  {
    icon: 'ri-government-line',
    imageKey: 'expertise-public' as keyof typeof HERO_IMAGES,
    titleFr: 'Secteur Public',
    titleEn: 'Public Sector',
    descFr: 'Conception de stratégies nationales d\'inclusion financière et renforcement des capacités institutionnelles.',
    descEn: 'Design of national financial inclusion strategies and institutional capacity building.',
    tag: 'SNIF · Politiques publiques',
    link: '/industries/public-sector',
    accent: '#a06820',
    stat: '15+',
    statLabelFr: 'Stratégies nationales',
    statLabelEn: 'National strategies',
  },
];

export default function ExpertiseShowcase() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="expertise" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}>
              <i className="ri-focus-3-line text-xs" style={{ color: '#86BC25' }}></i>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
                {isEn ? 'Sectors of Expertise' : 'Secteurs d\'Expertise'}
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {isEn ? (
                <>Des solutions <span style={{ background: 'linear-gradient(90deg, #86BC25, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>spécialisées</span><br />pour chaque secteur</>
              ) : (
                <>Des solutions <span style={{ background: 'linear-gradient(90deg, #86BC25, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>spécialisées</span><br />pour chaque secteur</>
              )}
            </h2>
          </div>
          <Link
            to="/services/"
            className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap cursor-pointer group transition-all duration-300 px-6 py-3 rounded-full border"
            style={{ borderColor: '#86BC25', color: '#6B9B1F' }}
          >
            {isEn ? 'All services' : 'Tous les services'}
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300"></i>
          </Link>
        </div>

        {/* Grille 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {EXPERTISES.map((exp, i) => (
            <Link
              key={i}
              to={exp.link}
              className="group relative rounded-2xl overflow-hidden cursor-pointer block"
              style={{ minHeight: 340 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image de fond */}
              <div className="absolute inset-0">
                <ExpertiseImage
                  imageKey={exp.imageKey}
                  hovered={hovered === i}
                />
              </div>

              {/* Overlay dégradé permanent */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(5,15,25,0.25) 0%, rgba(5,15,25,0.75) 60%, rgba(5,15,25,0.95) 100%)' }}
              />

              {/* Overlay doré au hover */}
              <div
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${exp.accent}22 0%, transparent 60%)`,
                  opacity: hovered === i ? 1 : 0,
                }}
              />

              {/* Contenu */}
              <div className="relative z-10 h-full flex flex-col justify-between p-7 lg:p-8" style={{ minHeight: 340 }}>
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${exp.accent}22`, border: `1px solid ${exp.accent}55` }}
                  >
                    <i className={`${exp.icon} text-xl`} style={{ color: exp.accent }}></i>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.80)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    {exp.tag}
                  </span>
                </div>

                {/* Stat infographique */}
                <div
                  className="transition-all duration-300"
                  style={{ transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)' }}
                >
                  <div
                    className="font-playfair text-5xl font-bold mb-0.5"
                    style={{ color: exp.accent, textShadow: `0 0 30px ${exp.accent}60` }}
                  >
                    {exp.stat}
                  </div>
                  <div className="text-xs font-medium mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {isEn ? exp.statLabelEn : exp.statLabelFr}
                  </div>

                  <h3 className="font-playfair text-2xl font-bold text-white mb-2 leading-tight">
                    {isEn ? exp.titleEn : exp.titleFr}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5 transition-all duration-500"
                    style={{ color: 'rgba(255,255,255,0.70)', maxHeight: hovered === i ? 80 : 0, overflow: 'hidden', opacity: hovered === i ? 1 : 0 }}
                  >
                    {isEn ? exp.descEn : exp.descFr}
                  </p>

                  <div className="flex items-center gap-2" style={{ color: exp.accent }}>
                    <span className="text-sm font-semibold">
                      {isEn ? 'Discover' : 'Découvrir'}
                    </span>
                    <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
                  </div>
                </div>
              </div>

              {/* Barre déco bottom */}
              <div
                className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, ${exp.accent}, transparent)`,
                  width: hovered === i ? '100%' : '40%',
                }}
              />
            </Link>
          ))}
        </div>

        {/* Bandeau de confiance */}
        <div
          className="mt-14 rounded-2xl px-8 py-6 flex flex-wrap items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, rgba(212,168,42,0.06) 0%, rgba(212,168,42,0.02) 100%)', border: '1px solid rgba(212,168,42,0.12)' }}
        >
          {[
            { icon: 'ri-shield-check-fill', textFr: 'Certifié BCEAO', textEn: 'BCEAO Certified' },
            { icon: 'ri-global-line', textFr: '20+ pays d\'intervention', textEn: '20+ countries' },
            { icon: 'ri-award-fill', textFr: '22 ans d\'expertise terrain', textEn: '22 years field expertise' },
            { icon: 'ri-group-line', textFr: 'Équipe pluridisciplinaire', textEn: 'Multidisciplinary team' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: 'rgba(212,168,42,0.12)' }}>
                <i className={`${item.icon} text-base`} style={{ color: '#86BC25' }}></i>
              </div>
              <span className="text-sm font-medium text-gray-700">{isEn ? item.textEn : item.textFr}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
