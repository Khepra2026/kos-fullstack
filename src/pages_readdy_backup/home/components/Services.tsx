import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useHeroImage } from '@/hooks/useHeroImage';
import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';
import { HERO_IMAGES } from '@/utils/heroImages';

function ServiceImage({ imageKey, title }: { imageKey: keyof typeof HERO_IMAGES; title: string }) {
  return (
    <OptimizedHeroImage
      imageKey={imageKey}
      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
      aspectRatio="4/3"
      objectFit="cover"
      loading="lazy"
      placeholder="shimmer"
    />
  );
}

const SERVICE_DATA = [
  {
    key: 'service1',
    icon: 'ri-compass-3-line',
    slug: '/services/conseil-strategique',
    imageKey: 'service-conseil' as keyof typeof HERO_IMAGES,
    tagFr: 'Conseil',
    tagEn: 'Advisory',
    accent: '#86BC25',
  },
  {
    key: 'service2',
    icon: 'ri-search-eye-line',
    slug: '/services/diagnostic-organisationnel',
    imageKey: 'service-diagnostic' as keyof typeof HERO_IMAGES,
    tagFr: 'Diagnostic',
    tagEn: 'Diagnostic',
    accent: '#86BC25',
  },
  {
    key: 'service3',
    icon: 'ri-smartphone-line',
    slug: '/services/transformation-digitale',
    imageKey: 'service-digital' as keyof typeof HERO_IMAGES,
    tagFr: 'Digital',
    tagEn: 'Digital',
    accent: '#86BC25',
  },
  {
    key: 'service4',
    icon: 'ri-funds-line',
    slug: '/services/levee-de-fonds',
    imageKey: 'service-fonds' as keyof typeof HERO_IMAGES,
    tagFr: 'Financement',
    tagEn: 'Fundraising',
    accent: '#86BC25',
  },
];

export const Services = memo(function Services() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const services = SERVICE_DATA.map(({ key, icon, imageKey, slug, tagFr, tagEn, accent }) => ({
    icon,
    imageKey,
    slug,
    tagFr,
    tagEn,
    accent,
    title: t(`services.${key}Title`),
    items: [
      t(`services.${key}Item1`),
      t(`services.${key}Item2`),
      t(`services.${key}Item3`),
      t(`services.${key}Item4`),
    ],
  }));

  return (
    <section id="services" className="py-24 bg-background-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-briefcase-4-line text-xs" style={{ color: '#86BC25' }}></i>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
              {t('services.title')}
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground-950 leading-tight mb-4">
            {t('services.subtitle')}
          </h2>
          <p className="text-foreground-500 max-w-2xl mx-auto text-base">
            {isEn
              ? 'Tailored solutions to transform your organization and accelerate your growth across Africa.'
              : 'Des solutions sur mesure pour transformer votre organisation et accélérer votre croissance en Afrique.'}
          </p>
        </div>

        {/* Services — layout alterné */}
        <div className="space-y-16 lg:space-y-24">
          {services.map((svc, index) => (
            <ScrollReveal key={index} delay={index * 80}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden group" style={{ aspectRatio: '4/3' }}>
                    <ServiceImage imageKey={svc.imageKey} title={svc.title} />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, ${svc.accent}30, transparent)` }}
                    />
                    <div className="absolute top-5 left-5">
                      <span
                        className="px-4 py-1.5 rounded-full text-sm font-bold"
                        style={{ background: svc.accent, color: '#fff' }}
                      >
                        {isEn ? svc.tagEn : svc.tagFr}
                      </span>
                    </div>
                    <div
                      className="absolute bottom-5 right-5 w-14 h-14 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0"
                      style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
                    >
                      <i className={`${svc.icon} text-2xl`} style={{ color: svc.accent }}></i>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div
                    className="font-playfair text-8xl font-bold leading-none mb-4 select-none"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: `1px ${svc.accent}25`,
                    }}
                  >
                    0{index + 1}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                      style={{ background: `${svc.accent}15`, border: `1.5px solid ${svc.accent}30` }}
                    >
                      <i className={`${svc.icon} text-xl`} style={{ color: svc.accent }}></i>
                    </div>
                    <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-foreground-950 leading-tight">
                      {svc.title}
                    </h3>
                  </div>
                  <div
                    className="h-0.5 w-16 rounded-full mb-6"
                    style={{ background: `linear-gradient(90deg, ${svc.accent}, transparent)` }}
                  />
                  <ul className="space-y-3 mb-8">
                    {svc.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                          style={{ background: `${svc.accent}15` }}
                        >
                          <i className="ri-check-line text-xs" style={{ color: svc.accent }}></i>
                        </div>
                        <span className="text-foreground-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate(svc.slug)}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 group"
                    style={{
                      background: `linear-gradient(135deg, ${svc.accent}, #a5d936)`,
                      color: '#0a0a0a',
                      boxShadow: `0 4px 20px ${svc.accent}40`,
                    }}
                  >
                    {isEn ? 'Discover this service' : 'Découvrir ce service'}
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bloc 4 Business Units — Standards Internationaux Adaptés */}
        <ScrollReveal delay={150}>
          <div className="mt-16 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8f5ee 0%, #fdf9f0 100%)', border: '1.5px solid rgba(212,168,42,0.25)' }}>
            <div className="p-8 lg:p-12">
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: '#86BC25', color: '#fff' }}>
                  4 Business Units — Standards Internationaux Adaptés
                </span>
                <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground-950 leading-tight mb-4">
                  Régulation · Gouvernance · Climat ESG · KBR-Model
                </h3>
                <p className="text-foreground-600 max-w-3xl mx-auto text-base leading-relaxed">
                  Quatre Business Units reconfigurées pour transformer la complexité réglementaire, climatique et de gouvernance en avantage décisionnel. Aucun prix public — chaque mission donne lieu à un devis confidentiel.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    icon: 'ri-shield-check-line',
                    title: 'Régulation Financière & Conformité',
                    desc: 'Bouclier Réglementaire — BCEAO, COBAC, GABAC, GAFI. Inspection readiness, agrément, LBC/FT.',
                    href: '/kos-bu1-financial-regulation/',
                    accent: '#D4AF37',
                    priority: 'Priorité Absolue',
                  },
                  {
                    icon: 'ri-government-line',
                    title: 'Gouvernance & Due Diligence',
                    desc: 'Observatoire de la Gouvernance — Performance Boards, Due Diligence Investisseur, Conseil CA.',
                    href: '/kos-bu2-governance-due-diligence/',
                    accent: '#86BC25',
                    priority: 'Haute',
                  },
                  {
                    icon: 'ri-leaf-line',
                    title: 'Climat, Transition & ESG',
                    desc: 'Ingénierie de Décarbonation — Bilan carbone, stratégie ESG ISSB/GRI/CSRD, financements verts.',
                    href: '/kos-bu3-climate-esg/',
                    accent: '#2E8B57',
                    priority: 'Haute',
                  },
                  {
                    icon: 'ri-line-chart-line',
                    title: 'KBR-Model & Intelligence d\'Affaires',
                    desc: 'Monétisation PI — Études sectorielles, monographies, rapports High-Ticket. 3 niveaux KBR.',
                    href: '/kos-bu4-kbr-model/',
                    accent: '#c9a227',
                    priority: 'Stratégique',
                  },
                ].map((bu, idx) => (
                  <div
                    key={idx}
                    className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)',
                      border: `1.5px solid ${bu.accent}25`,
                    }}
                    onClick={() => navigate(bu.href)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${bu.accent}15`, border: `1.5px solid ${bu.accent}30` }}>
                        <i className={`${bu.icon} text-xl`} style={{ color: bu.accent }}></i>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${bu.accent}12`, color: bu.accent }}>
                        {bu.priority}
                      </span>
                    </div>
                    <h3 className="font-playfair text-lg font-bold text-foreground-950 mb-2 leading-tight">
                      {bu.title}
                    </h3>
                    <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                      {bu.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold" style={{ color: bu.accent }}>
                      <span>Explorer</span>
                      <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate('/offre-commerciale')}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #86BC25, #a5d936)',
                    color: '#0a0a0a',
                    boxShadow: '0 4px 20px rgba(212,168,42,0.35)',
                  }}
                >
                  Voir l&apos;offre commerciale complète
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA global */}
        <ScrollReveal delay={200}>
          <div
            className="mt-12 rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 60%, #0d0d0d 100%)' }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #86BC25, transparent)' }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-64 h-24 rounded-full opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #86BC25, transparent)' }}
            />
            <div className="relative z-10">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#86BC25' }}>
                {isEn ? 'All our services' : 'Toutes nos expertises'}
              </p>
              <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-white mb-4">
                {isEn ? '10 areas of expertise at your service' : '10 domaines d\'expertise à votre service'}
              </h3>
              <p className="text-foreground-400 mb-8 max-w-xl mx-auto text-sm">
                {isEn
                  ? 'From strategic advisory to digital transformation, discover our complete catalogue of services for African organizations.'
                  : 'Du conseil stratégique à la transformation digitale, découvrez notre catalogue complet au service des organisations africaines.'}
              </p>
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #6B9B1F, #86BC25)',
                  color: '#ffffff',
                  boxShadow: '0 4px 24px rgba(34,160,90,0.35)',
                }}
              >
                {t('services.cta')}
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
});



