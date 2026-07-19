import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@/components/feature/Breadcrumb';

export function SFDHero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scrollToForm = () => {
    const el = document.getElementById('sfd-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { icon: 'ri-bank-line', value: '50+', label: t('sfdConformite.hero.stats.mfiSupported') },
    { icon: 'ri-shield-check-line', value: '100%', label: t('sfdConformite.hero.stats.complianceRate') },
    { icon: 'ri-time-line', value: '3–6 months', label: t('sfdConformite.hero.stats.avgTimeline') },
    { icon: 'ri-map-pin-2-line', value: '20+', label: t('sfdConformite.hero.stats.countriesCovered') },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=African%20microfinance%20institution%20office%20interior%20with%20professional%20financial%20advisors%20meeting%20clients%2C%20warm%20golden%20light%20streaming%20through%20large%20windows%2C%20modern%20minimalist%20workspace%20with%20documents%20and%20laptops%2C%20earthy%20tones%20of%20terracotta%20and%20sand%2C%20sophisticated%20and%20trustworthy%20atmosphere%2C%20high%20resolution%20editorial%20photography&width=1440&height=800&seq=sfd-hero-001&orientation=landscape"
          alt={t('sfdConformite.hero.badge')}
          className="w-full h-full object-cover object-top"
          width={1440}
          height={800}
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/75 to-brand-900/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/">
              <img
                src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png"
                alt="KHEPRA EXPERTS"
                className="h-12 w-auto object-contain"
                width={160}
                height={48}
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>

          <Breadcrumb
            variant="light"
            className="mb-6"
            items={[
              { label: t('sfdConformite.hero.breadcrumb.home'), href: '/' },
              { label: t('sfdConformite.hero.breadcrumb.services'), href: '/services' },
              { label: t('sfdConformite.hero.breadcrumb.current') },
            ]}
          />

          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 text-gold-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i className="ri-shield-check-line"></i>
            {t('sfdConformite.hero.badge')}
          </div>

          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t('sfdConformite.hero.title')}{' '}
            <span className="text-gold-400">{t('sfdConformite.hero.titleHighlight')}</span>{' '}
            {t('sfdConformite.hero.titleSuffix')}
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-10">
            {t('sfdConformite.hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToForm}
              className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-medium whitespace-nowrap cursor-pointer shadow-lg"
            >
              <i className="ri-file-list-3-line"></i>
              {t('sfdConformite.hero.cta1')}
            </button>
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all font-medium whitespace-nowrap cursor-pointer"
            >
              <i className="ri-article-line"></i>
              {t('sfdConformite.hero.cta2')}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-brand-950/80 backdrop-blur-sm border-t border-white/10">
        {/* Alerte réglementaire Loi Uniforme 2023 */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 border-b border-white/10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-gold-500/20 rounded-full shrink-0 mt-0.5">
              <i className="ri-file-info-line text-gold-400 text-sm"></i>
            </div>
            <div>
              <p className="text-white/90 text-sm font-medium">
                {t('sfdConformite.hero.alert')}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gold-500/20 rounded-full shrink-0">
                <i className={`${stat.icon} text-gold-400 text-lg`}></i>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SFDHero;



